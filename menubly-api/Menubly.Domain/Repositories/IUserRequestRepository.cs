using Menubly.Domain.Entities;

namespace Menubly.Domain.Repositories
{
    public interface IUserRequestRepository
    {
        void Create(UserRequest userRequest);

        Task<UserRequest> GetByIdAsync(Guid requestId, CancellationToken cancellationToken = default);

        Task<UserRequest> GetByCodeAsync(string code, CancellationToken cancellationToken = default);

        void UpdateRequest(UserRequest userRequest);
    }
}
