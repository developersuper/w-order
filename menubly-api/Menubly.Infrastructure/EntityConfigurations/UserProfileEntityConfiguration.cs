using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Menubly.Domain.Entities;

namespace Menubly.Infrastructure.EntityConfigurations
{
    public class UserProfileEntityConfiguration : IEntityTypeConfiguration<UserProfile>
    {
        public void Configure(EntityTypeBuilder<UserProfile> builder)
        {
            builder.ToTable("UserProfiles");
            builder.HasKey(p => p.ProfileId);
            builder.Property(p => p.PhoneNumber)
                .IsRequired(false)
                .HasMaxLength(16);
            builder.Property(p => p.Address)
                .IsRequired(false)
                .HasMaxLength(256);
            builder.Property(p => p.BusinessName)
                .IsRequired(false);
            builder.Property(p => p.BusinessUrl)
                .IsRequired(false);

            builder.HasOne(p => p.User)
                .WithOne(s => s.UserProfile)
                .HasForeignKey<UserProfile>(ad => ad.UserId);
        }
    }
}
