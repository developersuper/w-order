namespace Menubly.Domain.Exceptions
{
    public sealed class AuthenticationFailedException : AuthorizationException
    {
        public AuthenticationFailedException(string username)
        : base($"User ${username} failed to sign-in!")
        {
        }
    }
}
