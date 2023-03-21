using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Menubly.Domain.Entities;

namespace Menubly.Infrastructure.EntityConfigurations
{
    internal sealed class UserEntityConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable("Users");
            builder.HasKey(user => user.Id);
            builder.HasIndex(user => user.Email);
            builder.Property(user => user.Id).ValueGeneratedOnAdd();
            builder.Property(owner => owner.FirstName).HasMaxLength(64);
            builder.Property(owner => owner.FirstName).IsRequired();
            builder.Property(owner => owner.Email).IsRequired();
            
            builder.HasOne(p => p.UserProfile)
                .WithOne(s => s.User)
                .HasForeignKey<UserProfile>(ad => ad.UserId);

            builder.HasMany(p => p.Places)
                .WithOne(s => s.User)
                .HasForeignKey(ad => ad.UserId);

            builder.HasMany(p => p.MenuItems)
                .WithOne(s => s.Owner)
                .HasForeignKey(ad => ad.UserId);
        }
    }
}
