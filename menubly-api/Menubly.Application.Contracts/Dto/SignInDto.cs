using System.ComponentModel.DataAnnotations;

namespace Menubly.Application.Contracts.Dto
{
    public class SignInDto
    {
        [Required]
        [EmailAddress]
        public string Username { get; set; } = string.Empty;

        [Required]
        [MinLength(8)]
        public string Password { get; set; } = string.Empty;
    }
}
