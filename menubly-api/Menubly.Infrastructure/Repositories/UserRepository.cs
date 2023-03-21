using Menubly.Domain.Entities;
using Menubly.Domain.Exceptions;
using Menubly.Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Menubly.Infrastructure.Repositories
{
    internal sealed class UserRepository : IUserRepository
    {
        private readonly MenublyDbContext _dbContext;

        public UserRepository(MenublyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void Create(User user)
        {
            _dbContext.Users.Add(user);
        }

        public void Update(User user)
        {
            _dbContext.Users.Update(user);
        }

        public async Task<User> GetByIdAsync(Guid userId, bool tracking = true, CancellationToken cancellationToken = default)
        {
            IQueryable<User> query = _dbContext.Users.AsQueryable();

            if (!tracking)
            {
                query = query.AsNoTracking();
            }

            var user = await query.FirstOrDefaultAsync(u => u.Id == userId);

            if (user is null)
            {
                throw new UserRecordNotFoundException(userId);
            }

            return user;
        }


        public async Task<User> GetByEmailAsync(string email, CancellationToken cancellationToken = default)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.Email.ToLower() == email, cancellationToken);
            
            if (user is null)
            {
                throw new UserRecordNotFoundException(email);
            }

            return user;
        }

        public async Task<IEnumerable<User>> GetListAsync(CancellationToken cancellationToken = default)
        {
            return await _dbContext.Users.ToListAsync();
        }

        public async Task<User> GetUserProfileAsync(Guid userId, bool tracking = true, CancellationToken cancellationToken = default)
        {
            IQueryable<User> query = _dbContext.Users.Include(a => a.UserProfile).Include(a => a.Places);
            
            if (!tracking)
            {
                query = query.AsNoTracking();
            }

            var user = await query.FirstOrDefaultAsync(a => a.Id == userId, cancellationToken);
            
            if (user is null || user.UserProfile is null)
            {
                throw new UserRecordNotFoundException(userId);

            }
            return user;
        }

        public async Task<User> GetUserProfileAsync(string userName, bool tracking = true, CancellationToken cancellationToken = default)
        {
            IQueryable<User> query = _dbContext.Users.Include(a => a.UserProfile);

            if (!tracking)
            {
                query = query.AsNoTracking();
            }

            var user = await query.FirstOrDefaultAsync(a => a.Email == userName, cancellationToken);

            if (user is null || user.UserProfile is null)
            {
                throw new UserRecordNotFoundException(userName);

            }
            return user;
        }

        public async Task<User> GetUserPlacesAsync(Guid userId, bool tracking = true, CancellationToken cancellationToken = default)
        {
            IQueryable<User> query = _dbContext.Users.Include(a => a.Places).ThenInclude(a => a.Categories.OrderBy(c => c.Position)).ThenInclude(a => a.MenuItems.OrderBy(a=>a.Position)).AsQueryable();

            if (!tracking)
            {
                query = query.AsNoTracking();
            }

            var user = await query.FirstOrDefaultAsync(a => a.Id == userId, cancellationToken);

            if (user is null)
            {
                throw new UserRecordNotFoundException(userId);
            }

            return user;
        }

        public async Task<User> GetUserPlacesAsync(string username, bool tracking = true, CancellationToken cancellationToken = default)
        {
            IQueryable<User> query = _dbContext.Users.Include(a => a.Places).AsQueryable();

            if (!tracking)
            {
                query = query.AsNoTracking();
            }

            var user = await query.FirstOrDefaultAsync(a => a.Email == username, cancellationToken);

            if (user is null)
            {
                throw new UserRecordNotFoundException(username);
            }

            return user;
        }

        public async Task<User> GetUserPlacesBySubAsync(string usersub, bool tracking = true, CancellationToken cancellationToken = default)
        {
            IQueryable<User> query = _dbContext.Users.Include(a => a.Places).AsQueryable();

            if (!tracking)
            {
                query = query.AsNoTracking();
            }

            var user = await query.FirstOrDefaultAsync(a => a.UserSub == usersub, cancellationToken);

            if (user is null)
            {
                throw new UserRecordNotFoundException(usersub);
            }

            return user;
        }

        public async Task<bool> IsPlaceUrlTakenAsync(string placeUrl, CancellationToken cancellationToken = default)
        {
            return await _dbContext.Places.AsNoTracking().AnyAsync(a => a.Url == placeUrl.ToLower());
        }


        public async Task<User> GetUserMenuItemsAsync(Guid userId, bool tracking = true, CancellationToken cancellationToken = default)
        {
            IQueryable<User> query = _dbContext.Users.Include(a => a.MenuItems).ThenInclude(m=>m.Categories).AsQueryable();

            if (!tracking)
            {
                query = query.AsNoTracking();
            }

            var user = await query.FirstOrDefaultAsync(a => a.Id == userId, cancellationToken);

            if (user is null)
            {
                throw new UserRecordNotFoundException(userId);
            }

            return user;
        }
    }
}
