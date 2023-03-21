using Menubly.Application.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace Menubly.Api.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [ApiController]
    [Authorize]
    [Route("api/v1/users/{userId}/files")]
    public class FileController : ControllerBase
    {
        private readonly IServiceManager _serviceManager;

        /// <summary>
        /// 
        /// </summary>
        public FileController(IServiceManager serviceManager)
        {
            _serviceManager = serviceManager;
        }

        /// <summary>
        /// Upload file endpoint
        /// </summary>
        /// <param name="file"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> UploadAsync([Required] IFormFile file)
        {
            // TODO validate file size and file name
            using var memorySteam = new MemoryStream();
            await file.CopyToAsync(memorySteam);
            var fileBytes = memorySteam.ToArray();
            var fileUrl = await _serviceManager.FileAppService.UploadAsync(file.FileName, fileBytes);

            return Ok(fileUrl);
        }
    }
}
