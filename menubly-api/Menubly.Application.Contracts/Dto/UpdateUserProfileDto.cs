using System.ComponentModel.DataAnnotations;

namespace Menubly.Application.Contracts.Dto
{
    public class UpdateUserProfileDto
    {
        [Required]
        public string FirstName { get; set; }
    }
}
