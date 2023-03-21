using Amazon.S3;
using Amazon.S3.Transfer;
using Menubly.Domain.DomainServices;
using Menubly.Domain.Settings;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;

namespace Menubly.Infrastructure.DomainServices.Storage
{
    internal sealed class StorageManagerHandler : IStorageManagerDomainService
    {
        private readonly IHttpClientFactory _clientFactory;
        private readonly IMemoryCache _memoryCache;
        private readonly IAmazonS3 _amazonS3;
        private readonly AppOptions _appOptions;

        public StorageManagerHandler(IHttpClientFactory clientFactory, 
            IMemoryCache memoryCache, 
            IAmazonS3 amazonS3,
            IOptions<AppOptions> appOptions)
        {
            _clientFactory = clientFactory;
            _memoryCache = memoryCache;
            _amazonS3 = amazonS3;
            _appOptions = appOptions.Value;
        }

        public async Task<string> DownloadContentAsync(string resourceUrl, int cacheHour = 0)
        {
            if (!_memoryCache.TryGetValue(resourceUrl, out string cachedContent))
            {
                var httpClient = _clientFactory.CreateClient(nameof(StorageManagerHandler));
                cachedContent = await httpClient.GetStringAsync(resourceUrl);

                var cacheEntryOptions = new MemoryCacheEntryOptions()
                    .SetSlidingExpiration(TimeSpan.FromHours(cacheHour));

                _memoryCache.Set(resourceUrl, cachedContent, cacheEntryOptions);
            }
            return cachedContent;
        }

        public async Task<string> UploadAsync(byte[] data, string key)
        {
            try
            {
                var fileTransferUtility = new TransferUtility(_amazonS3);
                using var memoryStream = new MemoryStream(data);
                TransferUtilityUploadRequest fileTransferUtilityRequest = new()
                {
                    BucketName = _appOptions.PublicBucketName,
                    InputStream = memoryStream,
                    AutoCloseStream = true,
                    Key = key,
                    StorageClass = S3StorageClass.ReducedRedundancy,
                    CannedACL = S3CannedACL.PublicRead
                };
                await fileTransferUtility.UploadAsync(fileTransferUtilityRequest);

                return $"{_appOptions.PublicStorageServerUrl}/{key}";
            }
            catch (AmazonS3Exception)
            {
                throw;
            }
        }
    }
}
