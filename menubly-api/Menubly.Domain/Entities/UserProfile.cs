using System.ComponentModel.DataAnnotations.Schema;

namespace Menubly.Domain.Entities
{
    public class UserProfile : BaseEntity
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid ProfileId { get; private set; }
        
        public string BusinessName { get; private set; }
        
        public string BusinessUrl { get; private set; }
        
        public string PhoneNumber { get; private set; }
        
        public string Address { get; private set; }
        
        public Guid UserId { get; private set; }

        public virtual User User { get; set; }
    }
}
