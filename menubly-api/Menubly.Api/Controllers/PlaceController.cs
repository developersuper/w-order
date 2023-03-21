using Menubly.Application.Contracts;
using Microsoft.AspNetCore.Mvc;

namespace Menubly.Api.Controllers
{
    /// <summary>
    /// Unauthorized place endpoints
    /// </summary>
    [ApiController]
    [Route("api/v1/places")]
    public class PlaceController : ControllerBase
    {
        private readonly IServiceManager _serviceManager;

        /// <summary>
        /// Public constructor
        /// </summary>
        public PlaceController(IServiceManager serviceManager)
        {
            _serviceManager = serviceManager;
        }

        /// <summary>
        /// Place public view endpoint
        /// </summary>
        /// <param name="placeName"></param>
        [HttpGet("{placeName}")]
        public async Task<IActionResult> GetAsync(string placeName)
        {
            var place = await _serviceManager.PlaceAppService.GetAsync(placeName);

            return Ok(place);
        }
    }
}
