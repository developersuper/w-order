namespace Menubly.Domain.Exceptions
{
    public class PlaceUrlAlreadyTakenException : BadRequestException
    {
        public PlaceUrlAlreadyTakenException(string url)
            : base($"This place URL ({url}) is already taken!")
        {

        }
    }
}
