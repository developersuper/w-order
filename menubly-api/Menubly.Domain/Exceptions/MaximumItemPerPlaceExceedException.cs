namespace Menubly.Domain.Exceptions
{
    public class MaximumItemPerPlaceExceedException : BadRequestException
    {
        public MaximumItemPerPlaceExceedException(int max, Guid placeId)
            : base($"Maximum {max} menu item(s) allowed for this place {placeId}!")
        {
            //
        }
    }
}
