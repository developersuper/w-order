namespace Menubly.Domain.Exceptions
{
    public class PasswordDupplicationException : BadRequestException
    {
        public PasswordDupplicationException()
            : base($"new password should be different than the current password!")
        {

        }
    }
}
