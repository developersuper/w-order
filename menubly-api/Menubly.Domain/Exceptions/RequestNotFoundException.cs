namespace Menubly.Domain.Exceptions
{
    public class RequestNotFoundException : NotFoundException
    {
        public RequestNotFoundException(Guid requestId)
            : base($"User request with ID {requestId} was not found!")
        {

        }

        public RequestNotFoundException(string code)
            : base($"User request with code {code} was not found!")
        {

        }
    }
}
