using Menubly.Application.Contracts;
using Menubly.Application.Contracts.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Menubly.Api.Controllers
{
    /// <summary>
    /// User Profile management endpoints
    /// </summary>
    [ApiController]
    [Route("api/v1/users/{userId}/profiles")]
    [Authorize]
    public class UserProfileController : ControllerBase
    {
        private readonly IServiceManager _serviceManager;

        /// <summary>
        /// Public constructor
        /// </summary>
        /// <param name="serviceManager"></param>
        public UserProfileController(IServiceManager serviceManager)
        {
            _serviceManager = serviceManager;
        }

        /// <summary>
        /// Get user profile by user ID
        /// </summary>
        /// <param name="userId"></param>
        [HttpGet]
        public async Task<IActionResult> GetAsync(Guid userId)
        {
            var userProfile = await _serviceManager.UserProfileAppService.GetUserProfileAsync(userId);

            return Ok(userProfile);
        }

        /// <summary>
        /// Update user profile (account information)
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="request" cref="UpdateUserProfileDto"></param>
        [HttpPut]
        public async Task<IActionResult> UpdateUserProfileAsync(Guid userId, UpdateUserProfileDto request)
        {
            await _serviceManager.UserProfileAppService.UpdateUserProfileAsync(userId, request.FirstName);

            return Ok();
        }
    }
}
