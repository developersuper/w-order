namespace Menubly.Domain.DomainServices
{
    public interface IDomainManager
    {
        public IAuthenticationDomainService AuthenticationDomainService { get; }
        public IEmailDomainService EmailDomainService { get; }
        public IStorageManagerDomainService StorageManagerDomainService { get; }
        public IQRCodeDomainService QRCodeDomainService { get; }
    }
}
