namespace Menubly.Domain.DomainServices
{
    public interface IEmailDomainService
    {
        Task SendEmailAsync(string subject, string from, string to, string message);
    }
}
