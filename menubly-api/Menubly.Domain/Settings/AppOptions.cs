namespace Menubly.Domain.Settings
{
    public class AppOptions
    {
        public const string App = "App";
        public string BaseUrl { get; set; } = string.Empty;
        public string PlacePrefix { get; set; } = string.Empty;
        public string PublicBucketName { get; set; } = string.Empty;
        public string PublicStorageServerUrl { get; set; } = string.Empty;
        public string DefaultMenuItemName { get; set; } = string.Empty;
        public decimal DefaultMenuItemPrice { get; set; }
        public long MaxFileSize { get; set; }
        public int MaxItemPerPlace { get; set; }
        public int MaxPlacePerAccount { get; set; }
        public string DefaultPlace { get; set; } = string.Empty;
    }
}
