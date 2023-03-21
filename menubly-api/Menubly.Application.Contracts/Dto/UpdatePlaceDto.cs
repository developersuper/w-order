using System.ComponentModel.DataAnnotations;

namespace Menubly.Application.Contracts.Dto
{
    public class UpdatePlaceDto
    {
        [MaxLength(256)]
        public string? Name { get; set; }

        [MaxLength(24)]
        public string? PhoneNumber { get; set; }

        [MaxLength(256)]
        public string? Address { get; set; }

        [MaxLength(16)]
        public string? HeaderColor { get; set; }

        [MaxLength(256)]
        public string? HeaderImage { get; set; }

        [MaxLength(24)]
        public string? Currency { get; set; }

        [MaxLength(16)]
        public string? ThemeColor { get; set; }

        [MaxLength(256)]
        public string? Logo { get; set; }

        [MaxLength(4000)]
        public string? Note { get; set; }

        [MaxLength(16)]
        public string? TextColor { get; set; }

        [MaxLength(16)]
        public string? BackgroundColor { get; set; }

        [MaxLength(4000)]
        public string? FooterNote { get; set; }

        public Guid[]? CategoryIds { get; set; }
    }
}
