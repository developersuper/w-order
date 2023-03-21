using Menubly.Application.Contracts;
using Menubly.Domain.DomainServices;
using Menubly.Domain.Exceptions;
using Menubly.Domain.Settings;
using Microsoft.Extensions.Options;

namespace Menubly.Application
{
    internal sealed class FileAppService : IFileAppService
    {
        private readonly IDomainManager _domainManager;
        private readonly AppOptions _appOptions;

        public FileAppService(IDomainManager domainManager, IOptions<AppOptions> appOptions)
        {
            _domainManager = domainManager;
            _appOptions = appOptions.Value;
        }

        public async Task<string> UploadAsync(string filePath, byte[] fileContent)
        {
            var fileName = Path.GetFileNameWithoutExtension(filePath);
            var fileExtension = Path.GetExtension(filePath);

            if (fileContent.Length > _appOptions.MaxFileSize)
            {
                throw new FileTooBigException($"{fileName}{fileExtension}");
            }
            var fileKey = $"{DateTime.UtcNow:yyyy}/{DateTime.UtcNow:MM}/{DateTime.UtcNow:dd}/{fileName}-{DateTime.Now.Ticks}{fileExtension}".ToLower();
            var fileUrl = await _domainManager.StorageManagerDomainService.UploadAsync(fileContent, fileKey);

            return fileUrl;
        }
    }
}
