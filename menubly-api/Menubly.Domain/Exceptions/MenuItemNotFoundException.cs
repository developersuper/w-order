namespace Menubly.Domain.Exceptions
{
    public class MenuItemNotFoundException : NotFoundException
    {
        public MenuItemNotFoundException(Guid menuItemId)
            : base($"Menu item with ID {menuItemId} was not found!")
        {
            //
        }
    }
}
