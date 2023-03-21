using System.ComponentModel.DataAnnotations;

namespace Menubly.Application.Contracts.Dto
{
    public class UpdateMenuItemDto
    {
        [MaxLength(256)]
        public string? Name { get; set; }

        [Range(0, double.MaxValue)]
        public decimal? Price { get; set; }

        [MaxLength(4000)]
        public string? Description { get; set; }

        [MaxLength(256)]
        public string? Image { get; set; }

        [Range(0,2)]
        public int? Status { get; set; }

        public Guid? CategoryId { get; set; }
    }
}
