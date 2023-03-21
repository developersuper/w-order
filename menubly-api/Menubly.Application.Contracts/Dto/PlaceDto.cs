namespace Menubly.Application.Contracts.Dto
{
    public class PlaceDto
    {
        public Guid Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public string Url { get; set; } = string.Empty;

        public string ShortUrl => Url.Replace("https://", "");

        public string QRCode { get; set; } = string.Empty;

        public DateTime? CreatedDate { get; set; }

        public short CategoryCount { get; set; }

        public short MenuItemCount { get; set; }
    }
}
