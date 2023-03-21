using Amazon;
using Amazon.CognitoIdentity.Model;
using Amazon.CognitoIdentityProvider;
using Amazon.Extensions.CognitoAuthentication;
using Amazon.S3;
using Menubly.Domain.Settings;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace Menubly.Host.Extensions
{
    internal static class AwsServiceConfigurationExtensions
    {
        internal static IServiceCollection CustomConfigureAuthorization(this IServiceCollection services, IConfiguration config)
        {
            AwsCognitoOptions cognitoOptions = new();
            IConfigurationSection cognitoConfig = config.GetSection(AwsCognitoOptions.AwsCognito);
            cognitoConfig.Bind(cognitoOptions);
            services.Configure<AwsCognitoOptions>(cognitoConfig);

            if (!cognitoOptions.IsValid)
            {
                throw new InvalidOperationException("Failed to instantiate authorization module or policy!");
            }

            // AWS S3
            services.AddScoped<IAmazonS3>(factory =>
            {
                return new AmazonS3Client(cognitoOptions.AwsAccessKeyId, cognitoOptions.AwsSecretKey, RegionEndpoint.GetBySystemName(cognitoOptions.UserPoolRegion));
            });

            // AWS Cognito
            var credentials = new Credentials
            {
                AccessKeyId = cognitoOptions.AwsAccessKeyId,
                SecretKey = cognitoOptions.AwsSecretKey
            };
            var provider = new AmazonCognitoIdentityProviderClient(credentials, RegionEndpoint.GetBySystemName(cognitoOptions.UserPoolRegion));
            var cognitoUserPools = new CognitoUserPool
            (
                cognitoOptions.UserPoolId,
                cognitoOptions.UserPoolClientId,
                provider,
                cognitoOptions.UserPoolClientSecret
            );
            services.AddSingleton<IAmazonCognitoIdentityProvider>(provider);
            services.AddSingleton(cognitoUserPools);
            services.AddCognitoIdentity();

            // JWT 
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateAudience = false
                    };
                    options.Authority = cognitoOptions.Authority;
                    options.RequireHttpsMetadata = false;
                });

            return services;
        }
    }
}
