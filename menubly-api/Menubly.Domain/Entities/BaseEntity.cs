namespace Menubly.Domain.Entities
{
    public abstract class BaseEntity
    {
        public DateTime? CreatedDate { get; set; }

        public DateTime? ModifiedDate { get; set; }

        public Guid? CreatedBy { get; set; }

        public Guid? ModifiedBy { get; set; }
    }
}
