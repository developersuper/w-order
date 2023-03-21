namespace Menubly.Domain.Settings
{
    public class SendGridOptions
    {
        public const string SendGrid = "SendGrid";
        public bool IsValid => !string.IsNullOrEmpty(BaseUrl) 
            && !string.IsNullOrEmpty(ApiKey);
        public string BaseUrl { get; set; } = string.Empty;
        public string ApiKey { get; set; } = string.Empty;
        public string SendFrom { get; set; } = string.Empty;
        public string ResetPasswordEmailSubject { get; set; } = string.Empty;
        public string ResetPasswordClientUrl { get; set; } = string.Empty;
        public string ResetPasswordEmailTemplate { get; set; } = string.Empty;
        public int TemplateCacheDurationInHour { get; set; }
    }
}
