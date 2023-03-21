using Microsoft.EntityFrameworkCore;
using Menubly.Infrastructure;

namespace Menubly.Host.Extensions
{
    internal static class DatabaseConfigurationExtensions
    {
        internal static IServiceCollection CustomConfigureDatabase(this IServiceCollection services, IConfiguration config)
        {
            // Instantiate DbContext 
            services.AddDbContextPool<MenublyDbContext>(dbContextBuilder =>
            {
                var connectionString = config.GetConnectionString("MenublyDatabase");
                if (connectionString is not null)
                {
                    dbContextBuilder.UseNpgsql(connectionString);
                }
            });
            return services;
        }
    }
}
