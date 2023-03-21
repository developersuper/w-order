using System.ComponentModel.DataAnnotations;

namespace Menubly.Application.Contracts.Dto
{
    public class CreatePlaceDto
    {
        [Required]
        public string PlaceName { get; set; } = string.Empty;

        [Required]
        public string PlaceUrl { get; set; } = string.Empty;
    }
}
