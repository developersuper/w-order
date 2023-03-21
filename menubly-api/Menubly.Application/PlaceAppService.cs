using AutoMapper;
using Menubly.Application.Contracts;
using Menubly.Application.Contracts.Dto;
using Menubly.Domain.Repositories;
using Menubly.Domain.Settings;
using Microsoft.Extensions.Options;

namespace Menubly.Application
{
    internal sealed class PlaceAppService : IPlaceAppService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        private readonly AppOptions _appOptions;

        public PlaceAppService(IRepositoryManager repositoryManager,
            IMapper mapper,
            IOptions<AppOptions> appOptions)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
            _appOptions = appOptions.Value;
        }

        public async Task<PlaceDetailDto> GetAsync(string placeName)
        {
            var url = $"{_appOptions.BaseUrl}/{_appOptions.PlacePrefix}/{placeName}";
            var place = await _repositoryManager.PlaceRepository.GetAsync(url);

            return _mapper.Map<PlaceDetailDto>(place);
        }
    }
}
