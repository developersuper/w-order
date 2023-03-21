namespace Menubly.Domain.Exceptions
{
    public class UserProfileNotFoundException : NotFoundException
    {
        public UserProfileNotFoundException(Guid userId)
            : base($"UserProfile of User {userId} is not available!")
        {

        }
    }
}
