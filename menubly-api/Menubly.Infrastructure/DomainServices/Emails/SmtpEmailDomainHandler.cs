using System.Net.Mail;
using Menubly.Domain.DomainServices;

namespace Menubly.Infrastructure.DomainServices.Emails
{
    internal sealed class SmtpEmailDomainHandler : IEmailDomainService
    {
        private readonly SmtpClient _smtpClient;

        public SmtpEmailDomainHandler(SmtpClient smtpClient)
        {
            _smtpClient = smtpClient;
        }

        public async Task SendEmailAsync(string subject, string from, string to, string message)
        {
            var mailMessage = new MailMessage
            {
                IsBodyHtml = true,
                From = new MailAddress(from),
                Subject = subject,
                Body = message
            };
            mailMessage.To.Add(to);

            await _smtpClient.SendMailAsync(mailMessage);
        }
    }
}
