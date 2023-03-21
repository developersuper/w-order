namespace Menubly.Application.Contracts.Dto
{
    public class AuthenticationResultDto
    {
        public Guid UserId { get; set; }
        public string AccessToken { get; set; } = string.Empty;
        public int ExpiresIn { get; set; }
        public string RefreshToken { get; set; } = string.Empty;
        public string TokenType { get; set; } = string.Empty;
        public bool HasPlace { get; set; }
    }
}
