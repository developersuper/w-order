using Menubly.Application.Contracts;
using Menubly.Application.Contracts.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Menubly.Api.Controllers
{
    /// <summary>
    /// Menu item endpoint
    /// </summary>
    [Authorize]
    [ApiController]
    [Route("/api/v1/users/{userId}/menu-items")]
    public class MenuItemController : ControllerBase
    {
        private readonly IServiceManager _serviceManager;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="serviceManager"></param>
        public MenuItemController(IServiceManager serviceManager)
        {
            _serviceManager = serviceManager;
        }

        /// <summary>
        /// Create menu item endpoint
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="menu"></param>
        [HttpPost]
        public async Task<IActionResult> CreateAsync(Guid userId, CreateMenuItemDto menu)
        {
            var menuItem = await _serviceManager.MenuItemAppService.CreateMenuItemAsync(userId, menu);

            return Ok(menuItem);
        }

        /// <summary>
        /// Update specific menu item endpoint
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="menuItemId"></param>
        /// <param name="menu"></param>
        [HttpPut("{menuItemId}")]
        public async Task<IActionResult> UpdateAsync(Guid userId, Guid menuItemId, UpdateMenuItemDto menu)
        {
            var menuItem = await _serviceManager.MenuItemAppService.UpdateMenuItemAsync(userId, menuItemId, menu);

            return Ok(menuItem);
        }

        /// <summary>
        /// Delete specific menu item by ID
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="menuItemId"></param>
        /// <returns></returns>
        [HttpDelete("{menuItemId}")]
        public async Task<IActionResult> DeleteAsync(Guid userId, Guid menuItemId)
        {
            await _serviceManager.MenuItemAppService.DeleteMenuItemAsync(userId, menuItemId);

            return Ok();
        }

        /// <summary>
        /// Get menu item by ID
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="menuItemId"></param>
        /// <returns></returns>
        [HttpGet("{menuItemId}")]
        public async Task<IActionResult> GetAsync(Guid userId, Guid menuItemId)
        {
            var menuItem = await _serviceManager.MenuItemAppService.GetMenuItemAsync(userId, menuItemId);

            return Ok(menuItem);
        }
    }
}
