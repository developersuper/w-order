using System.ComponentModel.DataAnnotations;

namespace Menubly.Application.Contracts.Dto
{
    public class CreateCategoryDto
    {
        [Required]
        public string Name { get; set; } = string.Empty;
    }
}
