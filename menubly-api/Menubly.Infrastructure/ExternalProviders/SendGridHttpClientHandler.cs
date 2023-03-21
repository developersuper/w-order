using System.Net.Http.Headers;

namespace Menubly.Infrastructure.ExternalProviders
{
    public class SendGridHttpClientHandler : HttpClientHandler
    {
        private readonly string _sendGridApiKey;

        public SendGridHttpClientHandler(string sendGridApiKey)
        {
            _sendGridApiKey = sendGridApiKey;
        }

        protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request,
            CancellationToken cancellationToken)
        {
            // See if the request require authorization.
            var auth = request.Headers.Authorization;
            var authHeader = _sendGridApiKey;
            if (auth != null && auth.Scheme == "Bearer")
            {
                request.Headers.Authorization = new AuthenticationHeaderValue(auth.Scheme, authHeader);
            }

            return await base.SendAsync(request, cancellationToken);
        }
    }
}
