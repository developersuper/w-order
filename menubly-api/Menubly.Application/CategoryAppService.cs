using AutoMapper;
using Menubly.Application.Base;
using Menubly.Application.Contracts;
using Menubly.Application.Contracts.Dto;
using Menubly.Domain.Enums;
using Menubly.Domain.Exceptions;
using Menubly.Domain.Repositories;
using Microsoft.AspNetCore.Http;

namespace Menubly.Application
{
    internal sealed class CategoryAppService : BaseAppService, ICategoryAppService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;

        public CategoryAppService(IRepositoryManager repositoryManager, 
            IMapper mapper,
            IHttpContextAccessor httpContextAccessor)
            : base (httpContextAccessor)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public async Task<CategoryDto> CreateAsync(Guid userId, Guid placeId, string categoryName)
        {
            var user = await _repositoryManager.UserRepository.GetUserPlacesAsync(userId);
            var place = user.Places.FirstOrDefault(p => p.Id == placeId);

            if (place == null)
            {
                throw new PlaceNotFoundException(placeId);
            }

            place.AddCategory(categoryName);
            _repositoryManager.UserRepository.Update(user);
            await _repositoryManager.UnitOfWork.SaveChangesAsync();

            return _mapper.Map<CategoryDto>(place.Categories.FirstOrDefault(c => c.Name == categoryName));
        }

        public async Task DeleteAsync(Guid userId, Guid placeId, Guid categoryId)
        {
            var user = await _repositoryManager.UserRepository.GetUserPlacesAsync(userId);

            if (user.UserSub != CurrentUser.UserSub)
            {
                throw new UserUnauthorizedException(userId, nameof(DeleteAsync));
            }

            var place = user.Places.FirstOrDefault(p => p.Id == placeId);

            if (place == null)
            {
                throw new PlaceNotFoundException(placeId);
            }

            place.RemoveCategory(categoryId);

            _repositoryManager.UserRepository.Update(user);
            await _repositoryManager.UnitOfWork.SaveChangesAsync();
        }

        public async Task<CategoryDto> UpdateAsync(Guid userId, Guid placeId, Guid categoryId, UpdateCategoryDto categoryDto)
        {
            var user = await _repositoryManager.UserRepository.GetUserPlacesAsync(userId);
            var place = user.Places.FirstOrDefault(p => p.Id == placeId);

            if (place == null)
            {
                throw new PlaceNotFoundException(placeId);
            }

            var category = place.Categories.FirstOrDefault(a => a.Id == categoryId);

            if (category == null)
            {
                throw new CategoryNotFoundException(categoryId);
            }

            category.Update(categoryDto.Name, (MenuStatus?)categoryDto.Status);

            if (categoryDto.MenuItemIds is not null)
            {
                var menuItemDict = category.MenuItems.ToDictionary(keySelector: c => c.Id);
                foreach (var item in categoryDto.MenuItemIds)
                {
                    if (!menuItemDict.ContainsKey(item)){
                        continue;
                    }
                    menuItemDict[item].SetPosition(Array.IndexOf(categoryDto.MenuItemIds, item));
                }
            }

            _repositoryManager.UserRepository.Update(user);
            await _repositoryManager.UnitOfWork.SaveChangesAsync();
            category.MenuItems = category.MenuItems.OrderBy(a => a.Position).ToList();
            return _mapper.Map<CategoryDto>(category);
        }
    }
}
