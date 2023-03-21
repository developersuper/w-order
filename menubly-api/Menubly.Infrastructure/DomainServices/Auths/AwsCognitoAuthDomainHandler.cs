using Amazon.CognitoIdentityProvider;
using Amazon.CognitoIdentityProvider.Model;
using Menubly.Domain.DomainModels;
using Menubly.Domain.DomainServices;
using Menubly.Domain.Entities;
using Menubly.Domain.Exceptions;
using Menubly.Domain.Repositories;
using Menubly.Domain.Settings;
using Microsoft.Extensions.Options;
using System.Net;

namespace Menubly.Infrastructure.DomainServices.Auths
{
    internal sealed class AwsCognitoAuthDomainHandler : IAuthenticationDomainService
    {
        private readonly AwsCognitoOptions _cognitoOptions;
        private readonly IAmazonCognitoIdentityProvider _cognitoProvider;
        private readonly IRepositoryManager _repositoryManager;

        public AwsCognitoAuthDomainHandler(IOptions<AwsCognitoOptions> cognitoOptions,
            IAmazonCognitoIdentityProvider amazonCognitoIdentityProvider,
            IRepositoryManager repositoryManager)
        {
            _cognitoOptions = cognitoOptions.Value;
            _cognitoProvider = amazonCognitoIdentityProvider;
            _repositoryManager = repositoryManager;
        }

        public async Task ResetPasswordAsync(string username, string password)
        {
            await _cognitoProvider.AdminSetUserPasswordAsync(new AdminSetUserPasswordRequest
            {
                Password = password,
                Permanent = true,
                Username = username,
                UserPoolId = _cognitoOptions.UserPoolId
            });
        }

        public async Task<AuthenticationResult> SignInAsync(string username, string password)
        {
            AdminInitiateAuthResponse response = await InitiateAuthAsync(username, password);

            return new AuthenticationResult
            {
                AccessToken = response.AuthenticationResult.AccessToken,
                ExpiresIn = response.AuthenticationResult.ExpiresIn,
                IdToken = response.AuthenticationResult.IdToken,
                RefreshToken = response.AuthenticationResult.RefreshToken,
                TokenType = response.AuthenticationResult.TokenType
            };
        }

        public async Task ChangePasswordAsync(string username, string currentPassword, string newPassword)
        {
            if (currentPassword == newPassword)
            {
                throw new PasswordDupplicationException();
            }

            AdminInitiateAuthResponse response = await InitiateAuthAsync(username, currentPassword);

            await _cognitoProvider.ChangePasswordAsync(new ChangePasswordRequest
            {
                AccessToken = response.AuthenticationResult.AccessToken,
                PreviousPassword = currentPassword,
                ProposedPassword = newPassword
            });
        }

        private async Task<AdminInitiateAuthResponse> InitiateAuthAsync(string username, string password)
        {
            var authRequest = new AdminInitiateAuthRequest
            {
                UserPoolId = _cognitoOptions.UserPoolId,
                ClientId = _cognitoOptions.UserPoolClientId,
                AuthFlow = AuthFlowType.ADMIN_NO_SRP_AUTH
            };
            authRequest.AuthParameters.Add("USERNAME", username);
            authRequest.AuthParameters.Add("PASSWORD", password);

            AdminInitiateAuthResponse response = await _cognitoProvider.AdminInitiateAuthAsync(authRequest);
            if (response.HttpStatusCode != HttpStatusCode.OK || response.AuthenticationResult is null)
            {
                throw new AuthenticationFailedException(username);
            }

            return response;
        }

        public async Task SignUpAsync(string username, string password, string firstName)
        {
            var userAttribute = new AttributeType
            {
                Name = "given_name",
                Value = firstName
            };

            var userAttrsList = new List<AttributeType>
            {
                userAttribute
            };

            var signUpRequest = new SignUpRequest
            {
                UserAttributes = userAttrsList,
                Username = username.ToLower(),
                ClientId = _cognitoOptions.UserPoolClientId,
                Password = password                
            };
            
            var signUpResponse = await _cognitoProvider.SignUpAsync(signUpRequest);
            
            if (signUpResponse.HttpStatusCode == HttpStatusCode.OK)
            {
                // Confirm the account so that user can sign-in (consider move to lambda)
                var confirmRequest = new AdminConfirmSignUpRequest
                {
                    Username = username,
                    UserPoolId = _cognitoOptions.UserPoolId
                };
                await _cognitoProvider.AdminConfirmSignUpAsync(confirmRequest);

                // Save user information to database
                var user = new User(firstName, username, signUpResponse.UserSub);
                _repositoryManager.UserRepository.Create(user);
                await _repositoryManager.UnitOfWork.SaveChangesAsync();
            }
        }

        public async Task<AuthenticationResult> RefreshTokenAsync(string refreshToken)
        {
            var authRequest = new AdminInitiateAuthRequest
            {
                UserPoolId = _cognitoOptions.UserPoolId,
                ClientId = _cognitoOptions.UserPoolClientId,
                AuthFlow = AuthFlowType.REFRESH_TOKEN_AUTH
            };
            authRequest.AuthParameters.Add("REFRESH_TOKEN", refreshToken);

            AdminInitiateAuthResponse response = await _cognitoProvider.AdminInitiateAuthAsync(authRequest);

            if (response.HttpStatusCode != HttpStatusCode.OK || response.AuthenticationResult is null)
            {
                throw new AuthenticationFailedException(refreshToken);
            }

            return new AuthenticationResult
            {
                AccessToken = response.AuthenticationResult.AccessToken,
                ExpiresIn = response.AuthenticationResult.ExpiresIn,
                IdToken = response.AuthenticationResult.IdToken,
                RefreshToken = response.AuthenticationResult.RefreshToken,
                TokenType = response.AuthenticationResult.TokenType
            };
        }
    }
}
