using Menubly.Domain.Settings;

namespace Menubly.Host.Extensions
{
    internal static class AppSettingsExtensions
    {
        internal static IServiceCollection ConfigureAppSettings(this IServiceCollection services, IConfiguration config)
        {
            // General app settings
            IConfigurationSection appOptions = config.GetSection(AppOptions.App);
            services.Configure<AppOptions>(appOptions);

            return services;
        }
    }
}
