using Menubly.Application.Contracts.Dto;

namespace Menubly.Application.Contracts
{
    public interface IUserProfileAppService
    {
        Task<UserProfileDto> GetUserProfileAsync(Guid userId);

        Task UpdateUserProfileAsync(Guid userId, string firstName);
    }
}
