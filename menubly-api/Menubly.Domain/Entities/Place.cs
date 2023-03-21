namespace Menubly.Domain.Entities
{
    public class Place : BaseEntity
    {
        public Place()
        {
            Categories = new HashSet<Category>();
        }

        public Place(string name, string url, string qrCode)
        {
            Name = name;
            Url = url.Trim().ToLower();
            QRCode = qrCode;
            Currency = "USD";
            TextColor = "#000000";
            BackgroundColor = "#FFFFFF";
            Categories = new HashSet<Category>
            {
                new Category("Default category", 0)
            };
        }

        public Guid Id { get; private set; }
        public Guid UserId { get; private set; }
        public string Name { get; private set; } = string.Empty;
        public string Url { get; private set; } = string.Empty;
        public string QRCode { get; private set; } = string.Empty;
        public string PhoneNumber { get; private set; } = string.Empty;
        public string Address { get; private set; } = string.Empty;
        public string HeaderImage { get; private set; } = string.Empty;
        public string HeaderColor { get; private set; } = string.Empty;
        public string Currency { get; private set; } = string.Empty;
        public string ThemeColor { get; private set; } = string.Empty;
        public string Logo { get; private set; } = string.Empty;
        public string Note { get; private set; } = string.Empty;
        public string TextColor { get; private set; } = string.Empty;
        public string BackgroundColor { get; private set; } = string.Empty;
        public string FooterNote { get; private set; } = string.Empty;

        public virtual User User { get; set; }
        public virtual ICollection<Category> Categories { get; set; }

        public Place AddCategory(string name)
        {
            foreach (var category in Categories)
            {
                category.SetPosition(category.Position + 1);
            }
            Categories.Add(new Category(name, 0));
            return this;
        }

        public Place UpdateInformation(string? name, string? phoneNumber, string? address, string? note, string? footerNote)
        {
            if (name is not null)
            {
                Name = name;
            }
            if (phoneNumber is not null)
            {
                PhoneNumber = phoneNumber;
            }
            if (address is not null)
            {
                Address = address;
            }
            if (note is not null)
            {
                Note = note;
            }
            if (footerNote is not null)
            {
                FooterNote = footerNote;
            }

            return this;
        }

        public Place UpdateBrand(string? headerImage, string? headerColor, string? currency, string? themeColor, string? logo, string? textColor, string? backgroundColor)
        {
            if (headerImage is not null)
            {
                HeaderImage = headerImage;
            }

            if (headerColor is not null)
            {
                HeaderColor = headerColor;
            }

            if (currency is not null)
            {
                Currency = currency;
            }

            if (themeColor is not null)
            {
                ThemeColor = themeColor;
            }

            if (logo is not null)
            {
                Logo = logo;
            }

            if (textColor is not null)
            {
                TextColor = textColor;
            }

            if(backgroundColor is not null)
            {
                BackgroundColor = backgroundColor;
            }

            return this;
        }

        public Place RemoveCategory(Guid categoryId)
        {
            var category = Categories.FirstOrDefault(c => c.Id == categoryId);
            
            if (category is not null)
            {
                Categories.Remove(category);
            }

            return this;
        }
    }
}
