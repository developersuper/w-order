using Menubly.Application;
using Menubly.Application.Contracts;
using Menubly.Domain.DomainServices;
using Menubly.Domain.Repositories;
using Menubly.Host.Middleware;
using Menubly.Infrastructure.DomainServices;
using Menubly.Infrastructure.Repositories;

namespace Menubly.Host.Extensions
{
    internal static class DependencyInjectionExtentions
    {
        internal static IServiceCollection CustomConfigureDependencies(this IServiceCollection services, IConfiguration config)
        {
            services.AddScoped<IServiceManager, ServiceManager>();
            services.AddScoped<IRepositoryManager, RepositoryManager>();
            services.AddScoped<IDomainManager, DomainManager>();
            services.AddTransient<ExceptionHandlingMiddleware>();
            return services;
        }
    }
}
