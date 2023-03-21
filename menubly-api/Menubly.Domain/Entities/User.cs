using System.ComponentModel.DataAnnotations.Schema;

namespace Menubly.Domain.Entities
{
    public class User : BaseEntity
    {
        public User(string firstName, string email, string userSub)
        {
            FirstName = firstName;
            Email = email;
            UserSub = userSub;
            UserProfile = new UserProfile();
            Places = new HashSet<Place>();
            MenuItems = new HashSet<MenuItem>();
        }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; private set; }

        public string FirstName { get; private set; }

        public string Email { get; private set; }

        /// <summary>
        /// The UUID of the authenticated user. This isn't the same as user name
        /// </summary>
        public string UserSub { get; private set; }

        public virtual UserProfile UserProfile { get; set; }

        public virtual ICollection<Place> Places { get; set; }

        public virtual ICollection<MenuItem> MenuItems { get; set; }

        public Place AddPlace(string placeName, string url, string qrCode)
        {
            var place = new Place(placeName, url, qrCode);
            Places.Add(place);

            return place;
        }

        public User DeletePlace(Guid placeId)
        {
            var place = Places.FirstOrDefault(p => p.Id == placeId);

            if (place != null)
            {
                Places.Remove(place);
            }

            return this;
        }

        public MenuItem AddMenuItem(string name, decimal price)
        {
            var menuItem = new MenuItem(name, price);
            MenuItems.Add(menuItem);

            return menuItem;
        }

        public MenuItem AddMenuItem(string name, decimal price, string description, string image)
        {
            var menuItem = new MenuItem(name, price, description, image);
            MenuItems.Add(menuItem);

            return menuItem;
        }

        public User UpdateProfile(string firstName)
        {
            FirstName= firstName;

            return this;
        }
    }
}
