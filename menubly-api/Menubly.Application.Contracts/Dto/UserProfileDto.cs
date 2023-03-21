namespace Menubly.Application.Contracts.Dto
{
    public class UserProfileDto
    {
        public Guid UserId { get; set; }
        public string? Email { get; set; }
        public string? FirstName { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int MaxPlacePerAccountConfig { get; set; }
    }
}
