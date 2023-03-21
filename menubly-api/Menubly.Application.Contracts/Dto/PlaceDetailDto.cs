namespace Menubly.Application.Contracts.Dto
{
    public class PlaceDetailDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Url { get; set; } = string.Empty;
        public string ShortUrl => Url.Replace("https://", "");
        public string QRCode { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string HeaderColor { get; set; } = string.Empty;
        public string HeaderImage { get; set; } = string.Empty;
        public string Currency { get; set; } = string.Empty;
        public string ThemeColor { get; set; } = string.Empty;
        public string Logo { get; set; } = string.Empty;
        public string Note { get; set; } = string.Empty;
        public string TextColor { get; set; } = string.Empty;
        public string BackgroundColor { get; set; } = string.Empty;
        public string FooterNote { get; set; } = string.Empty;
        public DateTime? CreatedDate { get; set; }

        public IEnumerable<CategoryDto> Categories { get; set; }
    }
}
