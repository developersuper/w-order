namespace Menubly.Domain.DomainModels
{
    public class AuthenticationResult
    {
        public string AccessToken { get; set; } = string.Empty;
        public int ExpiresIn { get; set; }
        public string IdToken { get; set; } = string.Empty;
        public string RefreshToken { get; set; } = string.Empty;
        public string TokenType { get; set; } = string.Empty;
    }
}
