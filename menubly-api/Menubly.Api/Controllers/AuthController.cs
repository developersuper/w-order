using Microsoft.AspNetCore.Mvc;
using Menubly.Application.Contracts;
using Menubly.Application.Contracts.Dto;
using System.ComponentModel.DataAnnotations;

namespace Menubly.Api.Controllers
{
    /// <summary>
    /// Application authentication end-points
    /// </summary>
    [ApiController]
    [Route("api/v1/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IServiceManager _serviceManager;

        /// <summary>
        /// /// Public constructor
        /// </summary>
        public AuthController(IServiceManager serviceManager)
        {
            _serviceManager = serviceManager;
        }

        /// <summary>
        /// Public users sign-up endpoint
        /// </summary>
        /// <param name="signUpDto" cref="SignUpDto"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("sign-up")]
        public async Task<IActionResult> SignUpAsync(SignUpDto signUpDto)
        {
            await _serviceManager.AuthenticationAppService.SignUpAsync(signUpDto.Email, signUpDto.Password, signUpDto.FirstName);
            
            return Ok();
        }

        /// <summary>
        /// User sign-in with user name and password.
        /// </summary>
        /// <param name="signInDto" cref="SignInDto"></param>
        [HttpPost]
        [Route("sign-in")]
        public async Task<IActionResult> SignInAsync(SignInDto signInDto)
        {
            var authResponse = await _serviceManager.AuthenticationAppService.SignInAsync(signInDto.Username, signInDto.Password);

            return Ok(authResponse);
        }

        /// <summary>
        /// User reset password request (link with unique code will be send to user email).
        /// </summary>
        /// <param name="username" cref="string"></param>
        [HttpGet]
        [Route("reset-password")]
        public async Task<IActionResult> ResetPasswordAsync([Required][EmailAddress] string username)
        {
            await _serviceManager.AuthenticationAppService.ResetPasswordAsync(username);

            return Ok();
        }

        /// <summary>
        /// User reset password confirm (set new password)
        /// </summary>
        /// <param name="confirmResetPassword" cref="ConfirmResetPasswordDto"></param>
        [HttpPost]
        [Route("reset-password")]
        public async Task<IActionResult> ResetPasswordAsync(ConfirmResetPasswordDto confirmResetPassword)
        {
            await _serviceManager.AuthenticationAppService.ResetPasswordAsync(confirmResetPassword);

            return Ok();
        }

        /// <summary>
        ///  Use the refresh token to retrieve new access tokens.
        /// </summary>
        /// <param name="refreshToken"></param>
        [HttpGet]
        [Route("refresh-token")]
        public async Task<IActionResult> RefreshTokenAsync(string refreshToken)
        {
            var authResponse = await _serviceManager.AuthenticationAppService.RefreshTokenAsync(refreshToken);

            return Ok(authResponse);
        }

        /// <summary>
        /// Change user password
        /// </summary>
        /// <param name="changePassword"></param>
        [HttpPost]
        [Route("change-password")]
        public async Task<IActionResult> ChangePasswordAsync(ChangePasswordDto changePassword)
        {
            await _serviceManager.AuthenticationAppService.ChangePasswordAsync(changePassword);

            return Ok();
        }
    }
}
