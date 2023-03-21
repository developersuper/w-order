using Menubly.Application.Contracts.Dto;

namespace Menubly.Application.Contracts
{
    public interface IUserPlaceAppService
    {
        Task<PlaceDetailDto> CreateAsync(Guid userId, string placeName, string placeUrl);

        Task<PlaceDetailDto> CreateFirstPlaceAsync(Guid userId, string placeName, string placeUrl);

        Task<IEnumerable<PlaceDto>> GetListAsync(Guid userId);

        Task DeleteAsync(Guid userId, Guid placeId);

        Task<PlaceDetailDto> GetAsync(Guid userId, Guid placeId);

        Task<PlaceDetailDto> UpdateAsync(Guid userId, Guid placeId, UpdatePlaceDto placeDto);
    }
}
