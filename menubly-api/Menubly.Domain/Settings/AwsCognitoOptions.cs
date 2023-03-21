namespace Menubly.Domain.Settings
{
    public class AwsCognitoOptions
    {
        public const string AwsCognito = "AwsCognito";
        public bool IsValid => !string.IsNullOrEmpty(AwsAccessKeyId)
            && !string.IsNullOrEmpty(AwsSecretKey)
            && !string.IsNullOrEmpty(UserPoolId)
            && !string.IsNullOrEmpty(UserPoolClientId)
            && !string.IsNullOrEmpty(UserPoolRegion);
        public string AwsAccessKeyId { get; set; } = string.Empty;
        public string AwsSecretKey { get; set; } = string.Empty;
        public string UserPoolId { get; set; } = string.Empty;
        public string UserPoolClientId { get; set; } = string.Empty;
        public string UserPoolClientSecret { get; set; } = string.Empty;
        public string Authority { get; set; } = string.Empty;
        public string UserPoolRegion { get; set; } = string.Empty;
    }
}
