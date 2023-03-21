using Menubly.Domain.Enums;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.RegularExpressions;

namespace Menubly.Domain.Entities
{
    public class UserRequest : BaseEntity
    {
        public UserRequest(string userName, RequestType requestType)
        {
            UserName = userName;
            RequestType = requestType;
            Code = Regex.Replace(Convert.ToBase64String(Guid.NewGuid().ToByteArray()), "[/+=]", "a").Remove(22);
            // Request will be expired after 7 days.
            ExpiredDate = DateTime.UtcNow.AddDays(7);
        }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; private set; }

        public string UserName { get; private set; }

        public DateTime? ExpiredDate { get; private set; }

        public RequestType RequestType { get; private set; }

        public string Code { get; private set; }

        public UserRequest Use()
        {
            ExpiredDate = DateTime.MinValue;

            return this;
        }

        public bool IsExpired()
        {
            return ExpiredDate < DateTime.UtcNow;
        }
    }
}
