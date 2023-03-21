using Amazon.CognitoIdentityProvider;
using Amazon.S3;
using Menubly.Domain.DomainServices;
using Menubly.Domain.Repositories;
using Menubly.Domain.Settings;
using Menubly.Infrastructure.DomainServices.Auths;
using Menubly.Infrastructure.DomainServices.Emails;
using Menubly.Infrastructure.DomainServices.Storage;
using Menubly.Infrastructure.ExternalProviders;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;

namespace Menubly.Infrastructure.DomainServices
{
    public class DomainManager : IDomainManager
    {
        private readonly Lazy<IAuthenticationDomainService> _authenticationDomainService;
        private readonly Lazy<IEmailDomainService> _emailDomainService;
        private readonly Lazy<IStorageManagerDomainService> _httpDomainService;
        private readonly Lazy<IQRCodeDomainService> _qrCodeDomainService;

        public DomainManager(IOptions<AwsCognitoOptions> cognitoOptions,
            IAmazonCognitoIdentityProvider amazonCognitoIdentityProvider,
            IRestSendGridApi sendGridApiClient,
            IRepositoryManager repositoryManager,
            IHttpClientFactory httpClientFactory,
            IMemoryCache memoryCache,
            IAmazonS3 amazonS3,
            IOptions<AppOptions> appOptions)
        {
            _emailDomainService = new Lazy<IEmailDomainService>(new SendGridEmailDomainHandler(sendGridApiClient));
            _authenticationDomainService = new Lazy<IAuthenticationDomainService>(new AwsCognitoAuthDomainHandler(cognitoOptions, amazonCognitoIdentityProvider, repositoryManager));
            _httpDomainService = new Lazy<IStorageManagerDomainService>(new StorageManagerHandler(httpClientFactory, memoryCache, amazonS3, appOptions));
            _qrCodeDomainService = new Lazy<IQRCodeDomainService>(new QRCoderHandler());
        }

        public IAuthenticationDomainService AuthenticationDomainService => _authenticationDomainService.Value;

        public IEmailDomainService EmailDomainService => _emailDomainService.Value;

        public IStorageManagerDomainService StorageManagerDomainService => _httpDomainService.Value;

        public IQRCodeDomainService QRCodeDomainService => _qrCodeDomainService.Value;
    }
}
