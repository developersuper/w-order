using System.Runtime.Serialization;

namespace Menubly.Domain.Exceptions
{
    /// <summary>
    /// All authorization exceptions must extend this class
    /// </summary>
    public abstract class AuthorizationException : Exception
    {
        public AuthorizationException()
        {
        }

        public AuthorizationException(string? message) : base(message)
        {
        }

        public AuthorizationException(string? message, Exception? innerException) : base(message, innerException)
        {
        }

        protected AuthorizationException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}
