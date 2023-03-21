using Menubly.Application.Contracts;
using Menubly.Application.Contracts.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Menubly.Api.Controllers
{
    /// <summary>
    /// Place's categories endpoint
    /// </summary>
    [Authorize]
    [ApiController]
    [Route("api/v1/users/{userId}/places/{placeId}")]
    public class CategoryController : ControllerBase
    {
        private readonly IServiceManager _serviceManager;

        /// <summary>
        /// CTO
        /// </summary>
        /// <param name="serviceManager"></param>
        public CategoryController(IServiceManager serviceManager)
        {
            _serviceManager = serviceManager;
        }

        /// <summary>
        /// Create a new place's category
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="placeId"></param>
        /// <param name="categoryDto"></param>
        [HttpPost("categories")]
        public async Task<IActionResult> CreateAsync(Guid userId, Guid placeId, CreateCategoryDto categoryDto)
        {
            var category = await _serviceManager.CategoryAppService.CreateAsync(userId, placeId, categoryDto.Name);

            return Ok(category);
        }

        /// <summary>
        /// Update specific category
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="placeId"></param>
        /// <param name="categoryId"></param>
        /// <param name="categoryDto"></param>
        /// <returns></returns>
        [HttpPut("categories/{categoryId}")]
        public async Task<IActionResult> UpdateAsync(Guid userId, Guid placeId, Guid categoryId, UpdateCategoryDto categoryDto)
        {
            var category = await _serviceManager.CategoryAppService.UpdateAsync(userId, placeId, categoryId, categoryDto);

            return Ok(category);
        }

        /// <summary>
        /// Remove category from place
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="placeId"></param>
        /// <param name="categoryId"></param>
        /// <returns></returns>
        [HttpDelete("categories/{categoryId}")]
        public async Task<IActionResult> DeleteAsync(Guid userId, Guid placeId, Guid categoryId)
        {
            await _serviceManager.CategoryAppService.DeleteAsync(userId, placeId, categoryId);

            return Ok();
        }
    }
}
