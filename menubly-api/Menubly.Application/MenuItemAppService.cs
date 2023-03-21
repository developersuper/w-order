using AutoMapper;
using Menubly.Application.Base;
using Menubly.Application.Contracts;
using Menubly.Application.Contracts.Dto;
using Menubly.Domain.Enums;
using Menubly.Domain.Exceptions;
using Menubly.Domain.Repositories;
using Menubly.Domain.Settings;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace Menubly.Application
{
    internal sealed class MenuItemAppService : BaseAppService, IMenuItemAppService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        private readonly AppOptions _appOptions;

        public MenuItemAppService(IRepositoryManager repositoryManager,
            IMapper mapper,
            IOptions<AppOptions> appOptions,
            IHttpContextAccessor httpContextAccessor)
            : base(httpContextAccessor)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
            _appOptions = appOptions.Value;
        }

        public async Task<MenuItemDto> CreateMenuItemAsync(Guid userId, CreateMenuItemDto menuItemDto)
        {
            var user = await _repositoryManager.UserRepository.GetUserPlacesAsync(userId);

            var place = user.Places.FirstOrDefault(a => a.Id == menuItemDto.PlaceId);

            if (place == null)
            {
                throw new PlaceNotFoundException(menuItemDto.PlaceId);
            }

            var totalMenuItem = place.Categories.Sum(c => c.MenuItems.Count);
            if (totalMenuItem >= _appOptions.MaxItemPerPlace && CurrentUser.UserGroup is null)
            {
                throw new MaximumItemPerPlaceExceedException(_appOptions.MaxItemPerPlace, place.Id);
            }

            var category = place.Categories.FirstOrDefault(a => a.Id == menuItemDto.CategoryId);

            if (category == null)
            {
                throw new CategoryNotFoundException(menuItemDto.CategoryId);
            }

            var menuItem = user.AddMenuItem(menuItemDto.Name, menuItemDto.Price, menuItemDto.Description, menuItemDto.Image);
            menuItem.SetPosition(category.MenuItems.Any() ? category.MenuItems.Min(i => i.Position) - 1 : 0);
            category.AddMenuItem(menuItem);

            _repositoryManager.UserRepository.Update(user);

            await _repositoryManager.UnitOfWork.SaveChangesAsync();

            return _mapper.Map<MenuItemDto>(menuItem);
        }

        public async Task<MenuItemDto> UpdateMenuItemAsync(Guid userId, Guid menuItemId, UpdateMenuItemDto menuItemDto)
        {
            var user = await _repositoryManager.UserRepository.GetUserMenuItemsAsync(userId);

            var menuItem = user.MenuItems.FirstOrDefault(a => a.Id == menuItemId);

            if (menuItem == null)
            {
                throw new MenuItemNotFoundException(menuItemId);
            }

            menuItem.Update(menuItemDto.Name, menuItemDto.Price, menuItemDto.Description, menuItemDto.Image, (MenuStatus?)menuItemDto.Status);

            if (menuItemDto.CategoryId.HasValue && !menuItem.Categories.Any(c => c.Id == menuItemDto.CategoryId.Value))
            {
                var category = await _repositoryManager.PlaceRepository.GetCategoryAsync(menuItemDto.CategoryId.Value);
                menuItem.ChangeCategory(category);
                menuItem.SetPosition(category.MenuItems.Any() ? category.MenuItems.Min(i => i.Position) - 1 : 0);
            }

            _repositoryManager.UserRepository.Update(user);

            await _repositoryManager.UnitOfWork.SaveChangesAsync();
            var menuItemResponse = _mapper.Map<MenuItemDto>(menuItem);
            menuItemResponse.CategoryId = menuItem.Categories.FirstOrDefault()?.Id;

            return menuItemResponse;
        }

        public async Task DeleteMenuItemAsync(Guid userId, Guid menuItemId)
        {
            var user = await _repositoryManager.UserRepository.GetUserMenuItemsAsync(userId);

            if (user.UserSub != CurrentUser.UserSub)
            {
                throw new UserUnauthorizedException(userId, nameof(DeleteMenuItemAsync));
            }

            var menuItem = user.MenuItems.FirstOrDefault(a => a.Id == menuItemId);

            if (menuItem == null)
            {
                throw new MenuItemNotFoundException(menuItemId);
            }

            user.MenuItems.Remove(menuItem);

            _repositoryManager.UserRepository.Update(user);

            await _repositoryManager.UnitOfWork.SaveChangesAsync();
        }

        public async Task<MenuItemDto> GetMenuItemAsync(Guid userId, Guid menuItemId)
        {
            var user = await _repositoryManager.UserRepository.GetUserMenuItemsAsync(userId, tracking: false);

            var menuItem = user.MenuItems.FirstOrDefault(a => a.Id == menuItemId);

            if (menuItem == null)
            {
                throw new MenuItemNotFoundException(menuItemId);
            }
            var menuItemdto = _mapper.Map<MenuItemDto>(menuItem);
            menuItemdto.CategoryId = menuItem.Categories.FirstOrDefault()?.Id;
            return menuItemdto;
        }
    }
}
