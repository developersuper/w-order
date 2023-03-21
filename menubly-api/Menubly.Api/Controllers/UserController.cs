using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Menubly.Application.Contracts;
using Menubly.Application.Contracts.Dto;

namespace Menubly.Api.Controllers
{
    /// <summary>
    /// User management endpoints (not in-use)
    /// </summary>
    [ApiController]
    [Route("api/v1/users")]
    [Authorize]
    internal class UserController : ControllerBase
    {
        private readonly IServiceManager _serviceManager;

        /// <summary>
        /// Public constructor
        /// </summary>
        public UserController(IServiceManager serviceManager)
        {
            _serviceManager = serviceManager;
        }

        /// <summary>
        /// Get user by ID
        /// </summary>
        /// <param name="userId"></param>
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetAsync(Guid userId)
        {
            var user = await _serviceManager.UserAppService.GetUserByIdAsync(userId);
            return Ok(user);
        }

        /// <summary>
        /// Create new user
        /// </summary>
        /// <param name="userDto"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> CreateAsync(UserDto userDto)
        {
            await _serviceManager.UserAppService.Create(userDto);
            return Ok();
        }

        /// <summary>
        /// Get list user
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetListAsync()
        {
            var users = await _serviceManager.UserAppService.GetListAsync();
            return Ok(users);
        }
    }
}
