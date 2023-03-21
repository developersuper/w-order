using System.Runtime.Serialization;

namespace Menubly.Domain.Exceptions
{
    /// <summary>
    /// All not found exceptions must extend this class
    /// </summary>
    public abstract class NotFoundException : Exception
    {
        public NotFoundException()
        {
        }

        public NotFoundException(string? message) : base(message)
        {
        }

        public NotFoundException(string? message, Exception? innerException) : base(message, innerException)
        {
        }

        protected NotFoundException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}
