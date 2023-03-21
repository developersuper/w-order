using System.ComponentModel.DataAnnotations;

namespace Menubly.Application.Contracts.Dto
{
    public class ChangePasswordDto
    {
        [Required]
        [EmailAddress]
        public string Username { get; set; } = string.Empty;

        [Required]
        [MinLength(8)]
        public string CurrentPassword { get; set; } = string.Empty;

        [Required]
        [MinLength(8)]
        public string NewPassword { get; set; } = string.Empty;
    }
}
