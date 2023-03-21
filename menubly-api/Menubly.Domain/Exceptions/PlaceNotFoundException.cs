namespace Menubly.Domain.Exceptions
{
    public class PlaceNotFoundException : NotFoundException
    {
        public PlaceNotFoundException(Guid id) 
            : base($"Place with ID {id} was not found!")
        {

        }

        public PlaceNotFoundException(string name)
            : base($"Place {name} was not found!")
        {

        }
    }
}
