using Menubly.Domain.Entities;

namespace Menubly.Domain.Repositories
{
    public interface IUserRepository
    {
        Task<User> GetByIdAsync(Guid userId, bool tracking = true, CancellationToken cancellationToken = default);

        Task<User> GetByEmailAsync(string email, CancellationToken cancellationToken = default);

        Task<IEnumerable<User>> GetListAsync(CancellationToken cancellationToken = default);

        void Create(User user);

        void Update(User user);

        Task<User> GetUserProfileAsync(Guid userId, bool tracking = true, CancellationToken cancellationToken = default);

        Task<User> GetUserProfileAsync(string userName, bool tracking = true, CancellationToken cancellationToken = default);

        Task<User> GetUserPlacesAsync(Guid userId, bool tracking = true, CancellationToken cancellationToken = default);

        Task<User> GetUserPlacesAsync(string username, bool tracking = true, CancellationToken cancellationToken = default);

        Task<User> GetUserPlacesBySubAsync(string usersub, bool tracking = true, CancellationToken cancellationToken = default);

        Task<bool> IsPlaceUrlTakenAsync(string placeUrl, CancellationToken cancellationToken = default);

        Task<User> GetUserMenuItemsAsync(Guid userId, bool tracking = true, CancellationToken cancellationToken = default);
    }
}
