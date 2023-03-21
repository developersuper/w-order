using Menubly.Domain.DomainServices;
using QRCoder;

namespace Menubly.Infrastructure.DomainServices.Storage
{
    internal sealed class QRCoderHandler : IQRCodeDomainService
    {
        public byte[] GenerateQRCode(string input)
        {
            QRCodeGenerator qrGenerator = new();
            QRCodeData qrCodeData = qrGenerator.CreateQrCode(input, QRCodeGenerator.ECCLevel.Q);
            PngByteQRCode qrCode = new(qrCodeData);
            return qrCode.GetGraphic(10);
        }
    }
}
