using Menubly.Domain.Entities;
using Menubly.Domain.Exceptions;
using Menubly.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using Menubly.Domain.Enums;

namespace Menubly.Infrastructure.Repositories
{
    internal sealed class PlaceRepository : IPlaceRepository
    {
        private readonly MenublyDbContext _dbContext;

        public PlaceRepository(MenublyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Place> GetAsync(string placeName)
        {
            var place = await _dbContext.Places
                .Include(p => p.Categories.OrderBy(p => p.Position))
                .ThenInclude(c => c.MenuItems.Where(c => c.Status != MenuStatus.Hidden).OrderBy(c => c.Position))
                .AsNoTracking()
                .FirstOrDefaultAsync(p => p.Url == placeName);

            if (place == null)
            {
                throw new PlaceNotFoundException(placeName);
            }

            return place;
        }

        public async Task<Category> GetCategoryAsync(Guid id)
        {
            var category = await _dbContext.Categories
                .FirstOrDefaultAsync(c => c.Id == id);

            if (category is null)
            {
                throw new CategoryNotFoundException(id);
            }

            return category;
        }
    }
}
