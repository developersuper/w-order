using Menubly.Domain.Enums;

namespace Menubly.Domain.Entities
{
    public class MenuItem : BaseEntity
    {
        public MenuItem(string name, decimal price)
        {
            Name= name;
            Price= price;
            Status = MenuStatus.Active;
            Position = 0;
            Categories = new HashSet<Category>();
        }

        public MenuItem(string name, decimal price, string description, string image)
        {
            Name = name;
            Price = price;
            Description = description;
            Image = image;
            Status = MenuStatus.Active;
            Position = 0;
            Categories = new HashSet<Category>();
        }

        public Guid Id { get; private set; }
        public string Name { get; private set; }
        public decimal Price { get; private set; }
        public MenuStatus Status { get; private set; }
        public string Description { get; private set; }
        public string Image { get; private set; }
        public Guid UserId { get; private set; }
        public int Position { get; private set; }

        public virtual ICollection<Category> Categories { get; set; }
        public virtual User Owner { get; set; }

        public MenuItem Update(string? name, decimal? price, string? description, string? image, MenuStatus? status)
        {
            if (name is not null)
            {
                Name = name;
            }
            if (price is not null)
            {
                Price = price.Value;
            }
            if (description is not null)
            {
                Description = description;
            }
            if (image is not null)
            {
                Image = image;
            }
            if (status is not null)
            {
                Status = status.Value;
            }

            return this;
        }

        public MenuItem SetPosition(int position)
        {
            if (position != Position)
            {
                Position = position;
            }
            return this;
        }

        public MenuItem ChangeCategory(Category category)
        {
            if (!Categories.Any(c => c.Id == category.Id))
            {
                Categories.Clear();
                Categories.Add(category);
            }

            return this;
        }

        public MenuItem SetOwner(Guid ownerId)
        {
            if (UserId == Guid.Empty)

            {
                UserId = ownerId;
            }
            return this;
        }
    }
}
