namespace Menubly.Domain.DomainServices
{
    public interface IQRCodeDomainService
    {
        byte[] GenerateQRCode(string input);
    }
}
