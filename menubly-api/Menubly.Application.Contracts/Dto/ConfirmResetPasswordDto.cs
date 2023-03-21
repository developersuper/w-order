using System.ComponentModel.DataAnnotations;

namespace Menubly.Application.Contracts.Dto
{
    public class ConfirmResetPasswordDto
    {
        [Required]
        public string Code { get; set; } = string.Empty;
        
        [Required]
        [MinLength(8)]
        public string Password { get; set; } = string.Empty;
    }
}
