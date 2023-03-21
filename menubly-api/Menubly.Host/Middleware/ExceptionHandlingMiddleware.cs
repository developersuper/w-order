using System.Text.Json;
using Menubly.Domain.Exceptions;
using Sentry;

namespace Menubly.Host.Middleware
{
    public class ExceptionHandlingMiddleware : IMiddleware
    {
        private readonly ILogger<ExceptionHandlingMiddleware> _logger;
        private readonly IWebHostEnvironment _environment;

        public ExceptionHandlingMiddleware(ILogger<ExceptionHandlingMiddleware> logger, 
            IWebHostEnvironment environment)
        {
            _logger = logger;
            _environment = environment;
        }

        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                context.Response.Headers.Add("TraceId", context.TraceIdentifier);
                await next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                SentrySdk.ConfigureScope(scope =>
                {
                    context.Request.Headers.TryGetValue("X-Forwarded-For", out var clientIpAddress);
                    var user = new User
                    {
                        IpAddress = $"{clientIpAddress}"
                    };

                    if (context.User?.Identity?.IsAuthenticated == true)
                    {
                        user.Id = context.User.FindFirst("username")?.Value ?? string.Empty;
                    }
                    scope.User = user;
                });
                SentrySdk.CaptureException(ex);
                await HandleExceptionAsync(context, ex);
            }
        }

        private async Task HandleExceptionAsync(HttpContext httpContext, Exception exception)
        {
            httpContext.Response.ContentType = "application/json";

            httpContext.Response.StatusCode = exception switch
            {
                AuthorizationException => StatusCodes.Status401Unauthorized,
                BadRequestException => StatusCodes.Status400BadRequest,
                NotFoundException => StatusCodes.Status404NotFound,
                _ => StatusCodes.Status500InternalServerError,
            };

            var response = new
            {
                error = new
                {
                    message = exception.Message,
                    stackTrace = _environment.IsDevelopment() ? exception.StackTrace : string.Empty
                }
            };

            await httpContext.Response.WriteAsync(JsonSerializer.Serialize(response));
        }
    }
}
