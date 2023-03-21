using Menubly.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Menubly.Infrastructure.EntityConfigurations
{
    internal sealed class RequestEntityConfiguration : IEntityTypeConfiguration<UserRequest>
    {
        public void Configure(EntityTypeBuilder<UserRequest> builder)
        {
            builder.ToTable("UserRequests");
            builder.HasKey(r => r.Id);
            builder.HasIndex(r => r.Code);
            builder.Property(r => r.UserName).IsRequired();
            builder.Property(r => r.ExpiredDate).IsRequired();
            builder.Property(r => r.RequestType).IsRequired();
            builder.Property(r => r.Code).IsRequired().HasMaxLength(22);
        }
    }
}
