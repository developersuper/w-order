using System.ComponentModel.DataAnnotations;

namespace Menubly.Application.Contracts.Dto
{
    public class UpdateCategoryDto
    {
        public string? Name { get; set; }

        [Range(0, 2)]
        public int? Status { get; set; }

        public Guid[]? MenuItemIds { get; set; }
    }
}
