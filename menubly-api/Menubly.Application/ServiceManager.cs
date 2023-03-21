using AutoMapper;
using Menubly.Application.Contracts;
using Menubly.Domain.DomainServices;
using Menubly.Domain.Repositories;
using Menubly.Domain.Settings;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace Menubly.Application
{
    public class ServiceManager : IServiceManager
    {
        private readonly Lazy<IUserAppService> _userService;
        private readonly Lazy<IAuthenticationAppService> _authenticationAppService;
        private readonly Lazy<IUserProfileAppService> _userProfileAppService;
        private readonly Lazy<IUserPlaceAppService> _userPlaceAppService;
        private readonly Lazy<ICategoryAppService> _categoryAppService;
        private readonly Lazy<IFileAppService> _fileAppService;
        private readonly Lazy<IPlaceAppService> _placeAppService;
        private readonly Lazy<IMenuItemAppService> _menuItemAppService;

        public ServiceManager(IRepositoryManager repositoryManager,
            IMapper mapper,
            IDomainManager domainManager,
            ILogger<ServiceManager> logger,
            IOptions<SendGridOptions> emailOptions,
            IOptions<AppOptions> appOptions,
            IHttpContextAccessor httpContextAccessor)
        {
            _userService = new Lazy<IUserAppService>(new UserAppService(repositoryManager, mapper));
            _authenticationAppService = new Lazy<IAuthenticationAppService>(new AuthenticationAppService(domainManager, mapper, repositoryManager, emailOptions));
            _userProfileAppService = new Lazy<IUserProfileAppService>(new UserProfileAppService(repositoryManager, mapper, logger, appOptions, httpContextAccessor));
            _userPlaceAppService = new Lazy<IUserPlaceAppService>(new UserPlaceAppService(repositoryManager, mapper, domainManager, appOptions, httpContextAccessor));
            _categoryAppService = new Lazy<ICategoryAppService>(new CategoryAppService(repositoryManager, mapper, httpContextAccessor));
            _fileAppService = new Lazy<IFileAppService>(new FileAppService(domainManager, appOptions));
            _placeAppService = new Lazy<IPlaceAppService>(new PlaceAppService(repositoryManager, mapper, appOptions));
            _menuItemAppService = new Lazy<IMenuItemAppService>(new MenuItemAppService(repositoryManager, mapper, appOptions, httpContextAccessor));
        }

        public IUserAppService UserAppService => _userService.Value;

        public IAuthenticationAppService AuthenticationAppService => _authenticationAppService.Value;

        public IUserProfileAppService UserProfileAppService => _userProfileAppService.Value;

        public IUserPlaceAppService UserPlaceAppService => _userPlaceAppService.Value;

        public ICategoryAppService CategoryAppService => _categoryAppService.Value;

        public IFileAppService FileAppService => _fileAppService.Value;

        public IPlaceAppService PlaceAppService => _placeAppService.Value;

        public IMenuItemAppService MenuItemAppService => _menuItemAppService.Value;
    }
}
