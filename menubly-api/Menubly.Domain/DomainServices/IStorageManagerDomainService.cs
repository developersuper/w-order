namespace Menubly.Domain.DomainServices
{
    public interface IStorageManagerDomainService
    {
        Task<string> DownloadContentAsync(string resourceUrl, int cacheHour = 0);
        Task<string> UploadAsync(byte[] data, string key);
    }
}
