using Menubly.Application.Contracts.Dto;

namespace Menubly.Application.Contracts
{
    public interface IMenuItemAppService
    {
        Task<MenuItemDto> CreateMenuItemAsync(Guid userId, CreateMenuItemDto menuItem);

        Task<MenuItemDto> UpdateMenuItemAsync(Guid userId, Guid menuItemId, UpdateMenuItemDto menuItemDto);

        Task DeleteMenuItemAsync(Guid userId, Guid menuItemId);

        Task<MenuItemDto> GetMenuItemAsync(Guid userId, Guid menuItemId);
    }
}
