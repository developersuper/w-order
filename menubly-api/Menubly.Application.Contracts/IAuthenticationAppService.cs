using Menubly.Application.Contracts.Dto;

namespace Menubly.Application.Contracts
{
    public interface IAuthenticationAppService
    {
        Task SignUpAsync(string username, string password, string firstName);
        Task<AuthenticationResultDto> SignInAsync(string username, string password);
        Task ResetPasswordAsync(string username);
        Task ResetPasswordAsync(ConfirmResetPasswordDto confirmResetPassword);
        Task ChangePasswordAsync(ChangePasswordDto changePassword);
        Task<AuthenticationResultDto> RefreshTokenAsync(string refreshToken);
    }
}
