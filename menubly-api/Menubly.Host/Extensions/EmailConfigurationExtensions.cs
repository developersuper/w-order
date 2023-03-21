using Menubly.Domain.Settings;
using Menubly.Infrastructure.ExternalProviders;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Refit;

namespace Menubly.Host.Extensions
{
    internal static class EmailConfigurationExtensions
    {
        const string SENDGRID_CLIENT = "SendGridRestClient";
        const string EXCEPTION_MESSAGE = "Failed to instantiate send email module!";

        internal static IServiceCollection CustomConfigureEmail(this IServiceCollection services, IConfiguration config)
        {
            // Configure SendGrid email client
            ConfigureSendGridClient(services, config);

            return services;
        }

        private static void ConfigureSendGridClient(IServiceCollection services, IConfiguration config)
        {
            SendGridOptions sendGridOptions = new();
            IConfigurationSection sendGridConfig = config.GetSection(SendGridOptions.SendGrid);
            sendGridConfig.Bind(sendGridOptions);
            services.Configure<SendGridOptions>(sendGridConfig);

            if (!sendGridOptions.IsValid)
            {
                throw new InvalidOperationException(EXCEPTION_MESSAGE);
            }

            services.AddHttpClient(SENDGRID_CLIENT)
                .ConfigureHttpClient((serviceProvider, conf) =>
                {
                    conf.BaseAddress = new Uri(sendGridOptions.BaseUrl);
                })
                .ConfigurePrimaryHttpMessageHandler((serviceProvider) =>
                {
                    return new SendGridHttpClientHandler(sendGridOptions.ApiKey);
                });

            services.AddTransient(factory =>
            {
                var httpFactory = factory.GetService<IHttpClientFactory>();
                if (httpFactory is null)
                {
                    throw new InvalidOperationException(EXCEPTION_MESSAGE);
                }
                var sendGridApiClient = RestService.For<IRestSendGridApi>(httpFactory.CreateClient(SENDGRID_CLIENT),
                    new RefitSettings
                    {
                        ContentSerializer = new NewtonsoftJsonContentSerializer(
                            new JsonSerializerSettings
                            {
                                ContractResolver = new CamelCasePropertyNamesContractResolver(),
                                ReferenceLoopHandling = ReferenceLoopHandling.Serialize,
                                NullValueHandling = NullValueHandling.Ignore,
                                
                            })
                    });
                return sendGridApiClient;
            });
        }
    }
}
