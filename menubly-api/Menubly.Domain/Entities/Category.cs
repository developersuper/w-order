using Menubly.Domain.Enums;

namespace Menubly.Domain.Entities
{
    public class Category : BaseEntity
    {
        public Category()
        {
            MenuItems = new HashSet<MenuItem>();
        }

        public Category(string name, short postion)
        {
            Name = name;
            Status = MenuStatus.Active;
            MenuItems = new HashSet<MenuItem>();
            Position = postion;
        }

        public Guid Id { get; private set; }
        public string Name { get; private set; }
        public MenuStatus Status { get; private set; }
        public int Position { get; private set; }
        public Guid PlaceId { get; private set; }

        public virtual Place Place { get; set; }
        public virtual ICollection<MenuItem> MenuItems { get; set; }

        public Category Update(string? name, MenuStatus? status)
        {
            if (name is not null)
            {
                Name = name;
            }

            if (status.HasValue)
            {
                Status = status.Value;
            }

            return this;
        }

        public Category SetPosition(int position)
        {
            if (position != Position &&  position >= 0)
            {
                Position = position;
            }

            return this;
        }

        public Category AddMenuItem(MenuItem menuItem)
        {
            MenuItems.Add(menuItem);
            return this;
        }
    }
}
