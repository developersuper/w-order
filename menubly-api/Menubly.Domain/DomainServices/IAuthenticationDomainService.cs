using Menubly.Domain.DomainModels;

namespace Menubly.Domain.DomainServices
{
    public interface IAuthenticationDomainService
    {
        Task SignUpAsync(string username, string password, string firstName);
        Task<AuthenticationResult> SignInAsync(string username, string password);
        Task ResetPasswordAsync(string username, string password);
        Task ChangePasswordAsync(string username, string oldPassword, string password);
        Task<AuthenticationResult> RefreshTokenAsync(string refreshToken);
    }
}
