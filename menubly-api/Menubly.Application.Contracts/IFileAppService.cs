namespace Menubly.Application.Contracts
{
    public interface IFileAppService
    {
        Task<string> UploadAsync(string filePath, byte[] fileContent);
    }
}
