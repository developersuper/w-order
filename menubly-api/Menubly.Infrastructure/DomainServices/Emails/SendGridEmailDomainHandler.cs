using System.Dynamic;
using Menubly.Domain.DomainServices;
using Menubly.Infrastructure.ExternalProviders;

namespace Menubly.Infrastructure.DomainServices.Emails
{
    internal sealed class SendGridEmailDomainHandler : IEmailDomainService
    {
        private readonly IRestSendGridApi _sendGridApiClient;
        const string CONTENT_TYPE = "text/html";

        public SendGridEmailDomainHandler(IRestSendGridApi sendGridApiClient)
        {
            _sendGridApiClient = sendGridApiClient;
        }

        public async Task SendEmailAsync(string subject, string from, string to, string message)
        {
            dynamic sendEmailRequest = new ExpandoObject();
            sendEmailRequest.Subject = subject;
            sendEmailRequest.From = new
            {
                email = from
            };
            sendEmailRequest.Content = new object[]
                {
                    new {
                        type = CONTENT_TYPE,
                        value = message
                    }
                };
            sendEmailRequest.Personalizations = new object[]
                {
                    new
                    {
                        to = new object[]
                            {
                                new {
                                    email = to
                                }
                            }
                    }
                };
            
            await _sendGridApiClient.SendEmailAsync(sendEmailRequest);
        }
    }
}
