using AutoMapper;
using Menubly.Application.Contracts;
using Menubly.Application.Contracts.Dto;
using Menubly.Domain.DomainServices;
using Menubly.Domain.Entities;
using Menubly.Domain.Enums;
using Menubly.Domain.Exceptions;
using Menubly.Domain.Repositories;
using Menubly.Domain.Settings;
using Microsoft.Extensions.Options;
using System.IdentityModel.Tokens.Jwt;

namespace Menubly.Application
{
    internal sealed class AuthenticationAppService : IAuthenticationAppService
    {
        private readonly IDomainManager _domainManager;
        private readonly IMapper _mapper;
        private readonly IRepositoryManager _repositoryManager;
        private readonly SendGridOptions _emailOptions;

        public AuthenticationAppService(IDomainManager domainManager,
            IMapper mapper,
            IRepositoryManager repositoryManager,
            IOptions<SendGridOptions> emailOptions)
        {
            _domainManager = domainManager;
            _mapper = mapper;
            _repositoryManager = repositoryManager;
            _emailOptions = emailOptions.Value;
        }

        public async Task ResetPasswordAsync(string username)
        {
            if (string.IsNullOrWhiteSpace(username))
            {
                throw new InvalidUserNameException(username);
            }

            var user = await _repositoryManager.UserRepository.GetByEmailAsync(username);

            var request = new UserRequest(username, RequestType.ResetPassword);
            var emailSubject = _emailOptions.ResetPasswordEmailSubject;
            var sendFrom = _emailOptions.SendFrom;
            var sendTo = user.Email;
            var emailTemplate = await _domainManager.StorageManagerDomainService
                .DownloadContentAsync(_emailOptions.ResetPasswordEmailTemplate, _emailOptions.TemplateCacheDurationInHour);
            var resetPasswordUrl = string.Format(_emailOptions.ResetPasswordClientUrl, request.Code);
            var content = string.Format(emailTemplate, user.FirstName, resetPasswordUrl);

            await _domainManager.EmailDomainService.SendEmailAsync(emailSubject, sendFrom, sendTo, content);

            _repositoryManager.UserRequestRepository.Create(request);
            await _repositoryManager.UnitOfWork.SaveChangesAsync();
        }

        public async Task ResetPasswordAsync(ConfirmResetPasswordDto confirmResetPassword)
        {
            var resetPassRequest = await _repositoryManager.UserRequestRepository.GetByCodeAsync(confirmResetPassword.Code);

            if (resetPassRequest.IsExpired())
            {
                throw new RequestExpiredException(confirmResetPassword.Code);
            }

            await _domainManager.AuthenticationDomainService.ResetPasswordAsync(resetPassRequest.UserName, confirmResetPassword.Password);

            resetPassRequest.Use();
            _repositoryManager.UserRequestRepository.UpdateRequest(resetPassRequest);
            await _repositoryManager.UnitOfWork.SaveChangesAsync();
        }

        public async Task<AuthenticationResultDto> SignInAsync(string username, string password)
        {
            var authenticationResult = await _domainManager.AuthenticationDomainService.SignInAsync(username, password);
            var user = await _repositoryManager.UserRepository.GetUserPlacesAsync(username, tracking: false);
            var authenticationResponse = _mapper.Map<AuthenticationResultDto>(authenticationResult);
            authenticationResponse.UserId = user.Id;
            authenticationResponse.HasPlace = user.Places.Any();

            return authenticationResponse;
        }

        public async Task ChangePasswordAsync(ChangePasswordDto changePassword)
        {
            await _domainManager.AuthenticationDomainService
                .ChangePasswordAsync(changePassword.Username, changePassword.CurrentPassword, changePassword.NewPassword);
        }

        public async Task SignUpAsync(string username, string password, string firstName)
        {
            await _domainManager.AuthenticationDomainService.SignUpAsync(username, password, firstName);
        }

        public async Task<AuthenticationResultDto> RefreshTokenAsync(string refreshToken)
        {
            var authenticationResult = await _domainManager.AuthenticationDomainService.RefreshTokenAsync(refreshToken);
            var token = new JwtSecurityToken(jwtEncodedString: authenticationResult.AccessToken);
            var username = token.Claims.First(c => c.Type == "username").Value;
            var user = await _repositoryManager.UserRepository.GetUserPlacesBySubAsync(username, tracking: false);
            var authenticationResponse = _mapper.Map<AuthenticationResultDto>(authenticationResult);
            authenticationResponse.UserId = user.Id;
            authenticationResponse.HasPlace = user.Places.Any();

            return authenticationResponse;
        }
    }
}
