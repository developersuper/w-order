using AutoMapper;
using Menubly.Application.Base;
using Menubly.Application.Contracts;
using Menubly.Application.Contracts.Dto;
using Menubly.Domain.DomainServices;
using Menubly.Domain.Entities;
using Menubly.Domain.Exceptions;
using Menubly.Domain.Repositories;
using Menubly.Domain.Settings;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System.Text.Json;

namespace Menubly.Application
{
    internal sealed class UserPlaceAppService : BaseAppService, IUserPlaceAppService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        private readonly IDomainManager _domainManager;
        private readonly AppOptions _appOptions;

        public UserPlaceAppService(IRepositoryManager repositoryManager,
            IMapper mapper,
            IDomainManager domainManager,
            IOptions<AppOptions> appOptions, 
            IHttpContextAccessor httpContextAccessor)
            : base(httpContextAccessor)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
            _domainManager = domainManager;
            _appOptions = appOptions.Value;
        }

        public async Task<PlaceDetailDto> CreateAsync(Guid userId, string placeName, string placeUrl)
        {
            var url = $"{_appOptions.BaseUrl}/{_appOptions.PlacePrefix}/{placeUrl}";
            var isPlaceUrlTaken = await _repositoryManager.UserRepository.IsPlaceUrlTakenAsync(url);

            if (isPlaceUrlTaken)
            {
                throw new PlaceUrlAlreadyTakenException(url);
            }

            var user = await _repositoryManager.UserRepository.GetUserPlacesAsync(userId);
            var totalPlace = user.Places.Count;

            if (totalPlace >= _appOptions.MaxPlacePerAccount && CurrentUser.UserGroup is null)
            {
                throw new MaximumPlaceExceedException(_appOptions.MaxPlacePerAccount, userId);
            }

            var qrCodeByteArray = _domainManager.QRCodeDomainService.GenerateQRCode(url);
            var persistentQrUrl = await _domainManager.StorageManagerDomainService
                .UploadAsync(qrCodeByteArray, $"qr/{placeUrl}-{DateTime.Now.Ticks}.png");
            var place = user.AddPlace(placeName, url, persistentQrUrl);
            var menuItem = user.AddMenuItem(_appOptions.DefaultMenuItemName, _appOptions.DefaultMenuItemPrice);
            menuItem.Categories = place.Categories;
            _repositoryManager.UserRepository.Update(user);

            await _repositoryManager.UnitOfWork.SaveChangesAsync();

            return _mapper.Map<PlaceDetailDto>(place);
        }

        public async Task<PlaceDetailDto> CreateFirstPlaceAsync(Guid userId, string placeName, string placeUrl)
        {
            var url = $"{_appOptions.BaseUrl}/{_appOptions.PlacePrefix}/{placeUrl}";
            var isPlaceUrlTaken = await _repositoryManager.UserRepository.IsPlaceUrlTakenAsync(url);

            if (isPlaceUrlTaken)
            {
                throw new PlaceUrlAlreadyTakenException(url);
            }

            var user = await _repositoryManager.UserRepository.GetUserPlacesAsync(userId);
            var qrCodeByteArray = _domainManager.QRCodeDomainService.GenerateQRCode(url);
            var persistentQrUrl = await _domainManager.StorageManagerDomainService
                .UploadAsync(qrCodeByteArray, $"qr/{placeUrl}-{DateTime.Now.Ticks}.png");
            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };

            var defaultPlace = JsonSerializer.Deserialize<PlaceDetailDto>(_appOptions.DefaultPlace.Replace("'", "\""), options);
            if (defaultPlace is null)
            {
                throw new DefaultPlaceNotFoundException();
            }
            var place = user.AddPlace(placeName, url, persistentQrUrl);
            place.UpdateBrand(defaultPlace?.HeaderImage, null, null, null, defaultPlace?.Logo, null, null);
            place.Categories = _mapper.Map<List<Category>>(defaultPlace.Categories);
            foreach (var category in place.Categories)
            {
                foreach (var item in category.MenuItems)
                {
                    item.SetOwner(user.Id);
                }
            }
            _repositoryManager.UserRepository.Update(user);
            await _repositoryManager.UnitOfWork.SaveChangesAsync();

            return _mapper.Map<PlaceDetailDto>(place);
        }

        public async Task<IEnumerable<PlaceDto>> GetListAsync(Guid userId)
        {
            var user = await _repositoryManager.UserRepository.GetUserPlacesAsync(userId, tracking: false);

            return _mapper.Map<IEnumerable<PlaceDto>>(user.Places);
        }

        public async Task<PlaceDetailDto> GetAsync(Guid userId, Guid placeId)
        {
            var user = await _repositoryManager.UserRepository.GetUserPlacesAsync(userId, tracking: false);
            var place = user.Places.FirstOrDefault(p => p.Id == placeId);

            if (place is null)
            {
                throw new PlaceNotFoundException(placeId);
            }

            return _mapper.Map<PlaceDetailDto>(place);
        }

        public async Task DeleteAsync(Guid userId, Guid placeId)
        {
            var user = await _repositoryManager.UserRepository.GetUserPlacesAsync(userId);
            user.DeletePlace(placeId);
            _repositoryManager.UserRepository.Update(user);

            await _repositoryManager.UnitOfWork.SaveChangesAsync();
        }

        public async Task<PlaceDetailDto> UpdateAsync(Guid userId, Guid placeId, UpdatePlaceDto placeDto)
        {
            var user = await _repositoryManager.UserRepository.GetUserPlacesAsync(userId);
            var place = user.Places.FirstOrDefault(p => p.Id == placeId);

            if (place is null)
            {
                throw new PlaceNotFoundException(placeId);
            }

            place.UpdateInformation(placeDto.Name, placeDto.PhoneNumber, placeDto.Address, placeDto.Note, placeDto.FooterNote);
            place.UpdateBrand(placeDto.HeaderImage, placeDto.HeaderColor, placeDto.Currency, placeDto.ThemeColor, placeDto.Logo, placeDto.TextColor, placeDto.BackgroundColor);

            if (placeDto.CategoryIds is not null)
            {
                var categoryDict = place.Categories.ToDictionary(keySelector: c => c.Id);
                foreach (var item in placeDto.CategoryIds)
                {
                    if (!categoryDict.ContainsKey(item))
                    {
                        continue;
                    }
                    categoryDict[item].SetPosition(Array.IndexOf(placeDto.CategoryIds, item));
                }
            }

            _repositoryManager.UserRepository.Update(user);
            await _repositoryManager.UnitOfWork.SaveChangesAsync();
            place.Categories = place.Categories.OrderBy(c => c.Position).ToList();
            return _mapper.Map<PlaceDetailDto>(place);
        }
    }
}
