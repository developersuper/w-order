using AutoMapper;
using Menubly.Application.Base;
using Menubly.Application.Contracts;
using Menubly.Application.Contracts.Dto;
using Menubly.Domain.Exceptions;
using Menubly.Domain.Repositories;
using Menubly.Domain.Settings;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace Menubly.Application
{
    internal sealed class UserProfileAppService : BaseAppService, IUserProfileAppService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        private readonly ILogger<ServiceManager> _logger;
        private readonly AppOptions _appOptions;

        public UserProfileAppService(IRepositoryManager repositoryManager,
            IMapper mapper,
            ILogger<ServiceManager> logger,
            IOptions<AppOptions> appOptions,
            IHttpContextAccessor httpContextAccessor)
            : base (httpContextAccessor)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
            _logger = logger;
            _appOptions = appOptions.Value;
        }

        public async Task<UserProfileDto> GetUserProfileAsync(Guid userId)
        {
            var user = await _repositoryManager.UserRepository.GetUserProfileAsync(userId, false);

            if (user is null)
            {
                throw new UserRecordNotFoundException(userId);
            }

            if (user.UserSub != CurrentUser.UserSub)
            {
                throw new UserUnauthorizedException(userId, nameof(GetUserProfileAsync));
            }

            var userProfileDto = _mapper.Map<UserProfileDto>(user.UserProfile);
            userProfileDto.FirstName = user.FirstName;
            userProfileDto.Email = user.Email;
            userProfileDto.MaxPlacePerAccountConfig = CurrentUser.UserGroup is null ? _appOptions.MaxPlacePerAccount : short.MaxValue;

            return userProfileDto;
        }

        public async Task UpdateUserProfileAsync(Guid userId, string firstName)
        {
            var user = await _repositoryManager.UserRepository.GetByIdAsync(userId);

            if (user is null)
            {
                throw new UserProfileNotFoundException(userId);
            }

            if (user.UserSub != CurrentUser.UserSub)
            {
                throw new UserUnauthorizedException(userId, nameof(UpdateUserProfileAsync));
            }

            user.UpdateProfile(firstName);
            _repositoryManager.UserRepository.Update(user);

            await _repositoryManager.UnitOfWork.SaveChangesAsync();
        }
    }
}
