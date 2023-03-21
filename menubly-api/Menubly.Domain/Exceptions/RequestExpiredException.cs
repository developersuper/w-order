namespace Menubly.Domain.Exceptions
{
    public class RequestExpiredException : BadRequestException
    {
        public RequestExpiredException(string code)
        : base(($"Request with code {code} expired!"))
        {

        }
    }
}
