using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Menubly.Application.Contracts;
using Menubly.Application.Contracts.Dto;

namespace Menubly.Api.Controllers
{
    /// <summary>
    /// User's places endpoint
    /// </summary>
    [ApiController]
    [Route("api/v1/users")]
    [Authorize]
    public class UserPlaceController : ControllerBase
    {
        private readonly IServiceManager _serviceManager;

        /// <summary>
        /// Public constructor
        /// </summary>
        public UserPlaceController(IServiceManager serviceManager)
        {
            _serviceManager = serviceManager;
        }

        /// <summary>
        /// Create user place
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="place"></param>
        [HttpPost("{userId}/places")]
        public async Task<IActionResult> CreateAsync(Guid userId, CreatePlaceDto place)
        {
            var newPlace = await _serviceManager.UserPlaceAppService.CreateAsync(userId, place.PlaceName, place.PlaceUrl);

            return Ok(newPlace);
        }

        /// <summary>
        /// Create first place when user sign-up
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="place"></param>
        /// <returns></returns>
        [HttpPost("{userId}/first_place")]
        public async Task<IActionResult> CreateFirstPlaceAsync(Guid userId, CreatePlaceDto place)
        {
            var newPlace = await _serviceManager.UserPlaceAppService.CreateFirstPlaceAsync(userId, place.PlaceName, place.PlaceUrl);

            return Ok(newPlace);
        }

        /// <summary>
        /// Get user's places
        /// </summary>
        /// <param name="userId"></param>
        [HttpGet("{userId}/places")]
        public async Task<IActionResult> GetListAsync(Guid userId)
        {
            var places = await _serviceManager.UserPlaceAppService.GetListAsync(userId);

            return Ok(places);
        }

        /// <summary>
        /// Get single place by ID 
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="placeId"></param>
        [HttpGet("{userId}/places/{placeId}")]
        public async Task<IActionResult> GetAsync(Guid userId, Guid placeId)
        {
            var place = await _serviceManager.UserPlaceAppService.GetAsync(userId, placeId);

            return Ok(place);
        }

        /// <summary>
        /// Delete single place by ID
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="placeId"></param>
        [HttpDelete("{userId}/places/{placeId}")]
        public async Task<IActionResult> DeleteAsync(Guid userId, Guid placeId)
        {
            await _serviceManager.UserPlaceAppService.DeleteAsync(userId, placeId);

            return NoContent();
        }

        /// <summary>
        /// Update place information and branding endpoint
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="placeId"></param>
        /// <param name="placeDto"></param>
        /// <returns></returns>
        [HttpPut("{userId}/places/{placeId}")]
        public async Task<IActionResult> UpdateAsync(Guid userId, Guid placeId, UpdatePlaceDto placeDto)
        {
            var place = await _serviceManager.UserPlaceAppService.UpdateAsync(userId, placeId, placeDto);

            return Ok(place);
        }
    }
}
