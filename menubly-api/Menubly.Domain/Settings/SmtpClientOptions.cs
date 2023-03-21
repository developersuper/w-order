namespace Menubly.Domain.Settings
{
    public class SmtpClientOptions
    {
        public const string SmtpClient = "SmtpClient";
        public bool IsValid => !string.IsNullOrEmpty(Host)
            && !string.IsNullOrEmpty(UserName)
            && !string.IsNullOrEmpty(Password)
            && Port > 0;
        public string Host { get; set; }
        public int Port { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
