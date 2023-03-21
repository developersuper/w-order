namespace Menubly.Domain.Exceptions
{
    public class UserUnauthorizedException : AuthorizationException
    {
        public UserUnauthorizedException(Guid userId, string action)
            : base($"User {userId} don't have permission to perform this action {action}!")
        {
        }
    }
}
