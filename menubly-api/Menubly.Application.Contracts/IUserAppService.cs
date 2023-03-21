using Menubly.Application.Contracts.Dto;

namespace Menubly.Application.Contracts
{
    public interface IUserAppService
    {
        Task<UserDto> GetUserByIdAsync(Guid userId, CancellationToken cancellationToken = default);

        Task<IEnumerable<UserDto>> GetListAsync();

        Task Create(UserDto userDto);
    }
}
