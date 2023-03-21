using Menubly.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Menubly.Infrastructure.EntityConfigurations
{
    internal sealed class MenuItemEntityConfiguration : IEntityTypeConfiguration<MenuItem>
    {
        public void Configure(EntityTypeBuilder<MenuItem> builder)
        {
            builder.ToTable("MenuItems");
            builder.HasKey(r => r.Id);
            builder.Property(p => p.Name)
                .IsRequired(true)
                .HasMaxLength(256);
            builder.Property(p => p.Status)
                .IsRequired(true);
            builder.Property(p => p.Description)
                .IsRequired(false)
                .HasMaxLength(4000);
            builder.Property(p => p.Image)
                .IsRequired(false)
                .HasMaxLength(256);
            builder.Property(p => p.Position)
                .IsRequired(true)
                .HasDefaultValue(0);

            builder.HasMany(p => p.Categories)
                .WithMany(s => s.MenuItems)
                .UsingEntity(j => j.ToTable("CategoryMenuItems"));

            builder.HasOne(p => p.Owner)
                .WithMany(s => s.MenuItems)
                .HasForeignKey(p => p.UserId);
        }
    }
}
