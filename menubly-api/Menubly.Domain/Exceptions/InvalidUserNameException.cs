namespace Menubly.Domain.Exceptions
{
    public class InvalidUserNameException : BadRequestException
    {
        public InvalidUserNameException(string username)
            : base($"The provided user name {username} is invalid!")
        {

        }
    }
}
