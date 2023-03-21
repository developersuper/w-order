using System.ComponentModel.DataAnnotations;

namespace Menubly.Application.Contracts.Dto
{
    public class CreateMenuItemDto
    {
        [Required]
        public Guid PlaceId { get; set; }

        [Required]
        public Guid CategoryId { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public decimal Price { get; set; }

        public string Description { get; set; } = string.Empty;

        public string Image { get; set; } = string.Empty;
    }
}
