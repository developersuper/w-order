namespace Menubly.Domain.Exceptions
{
    public class UserRecordNotFoundException : NotFoundException
    {
        public UserRecordNotFoundException(Guid userId)
            : base($"User with ID {userId} was not found!")
        {

        }

        public UserRecordNotFoundException(string username)
            : base($"User with user name {username} was not found!")
        {

        }
    }
}
