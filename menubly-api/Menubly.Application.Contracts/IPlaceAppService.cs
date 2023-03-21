using Menubly.Application.Contracts.Dto;

namespace Menubly.Application.Contracts
{
    public interface IPlaceAppService
    {
        Task<PlaceDetailDto> GetAsync(string placeName);
    }
}
