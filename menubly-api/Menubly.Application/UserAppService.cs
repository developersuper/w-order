using AutoMapper;
using Menubly.Application.Contracts;
using Menubly.Application.Contracts.Dto;
using Menubly.Domain.Entities;
using Menubly.Domain.Exceptions;
using Menubly.Domain.Repositories;

namespace Menubly.Application
{
    internal sealed class UserAppService : IUserAppService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;

        public UserAppService(IRepositoryManager repositoryManager,
            IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public async Task Create(UserDto userDto)
        {
            var user = _mapper.Map<User>(userDto);
            _repositoryManager.UserRepository.Create(user);

            await _repositoryManager.UnitOfWork.SaveChangesAsync();
        }

        public async Task<IEnumerable<UserDto>> GetListAsync()
        {
            var users = await _repositoryManager.UserRepository.GetListAsync();

            if (users is null)
            {
                return Array.Empty<UserDto>();
            }

            return _mapper.Map<IEnumerable<UserDto>>(users);
        }

        public async Task<UserDto> GetUserByIdAsync(Guid userId, CancellationToken cancellationToken = default)
        {
            var user = await _repositoryManager.UserRepository.GetByIdAsync(userId, tracking: false, cancellationToken);

            if (user is null)
            {
                throw new UserRecordNotFoundException(userId);
            }

            return _mapper.Map<UserDto>(user);
        }
    }
}
