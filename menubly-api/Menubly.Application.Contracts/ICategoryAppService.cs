using Menubly.Application.Contracts.Dto;

namespace Menubly.Application.Contracts
{
    public interface ICategoryAppService
    {
        Task<CategoryDto> CreateAsync(Guid userId, Guid placeId, string categoryName);

        Task<CategoryDto> UpdateAsync(Guid userId, Guid placeId, Guid categoryId, UpdateCategoryDto categoryDto);

        Task DeleteAsync(Guid userId, Guid placeId, Guid categoryId);

    }
}
