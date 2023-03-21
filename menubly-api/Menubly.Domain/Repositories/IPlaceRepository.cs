using Menubly.Domain.Entities;

namespace Menubly.Domain.Repositories
{
    public interface IPlaceRepository
    {
        Task<Place> GetAsync(string placeName);

        Task<Category> GetCategoryAsync(Guid id);
    }
}
