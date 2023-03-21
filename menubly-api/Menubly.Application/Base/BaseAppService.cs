using Microsoft.AspNetCore.Http;

namespace Menubly.Application.Base
{
    internal abstract class BaseAppService
    {
        protected CurrentUser CurrentUser { get; private set; }

        protected BaseAppService(IHttpContextAccessor contextAccessor)
        {
            var sub = contextAccessor?.HttpContext?.User?.FindFirst("username")?.Value;
            var group = contextAccessor?.HttpContext?.User?.FindFirst("cognito:groups")?.Value;
            CurrentUser = new CurrentUser(sub, group);
        }
    }
}
