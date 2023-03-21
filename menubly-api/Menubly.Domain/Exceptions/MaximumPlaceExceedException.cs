namespace Menubly.Domain.Exceptions
{
    public class MaximumPlaceExceedException : BadRequestException
    {
        public MaximumPlaceExceedException(int max, Guid userId)
            : base($"Maximum {max} place(s) allowed for this user {userId}!")
        {
            //
        }
    }
}
