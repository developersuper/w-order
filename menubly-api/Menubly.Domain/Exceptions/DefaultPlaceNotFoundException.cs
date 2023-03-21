namespace Menubly.Domain.Exceptions
{
    public class DefaultPlaceNotFoundException : NotFoundException
    {
        public DefaultPlaceNotFoundException()
            : base($"Default place was not found!")
        {

        }
    }
}
