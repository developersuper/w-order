using Menubly.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Menubly.Infrastructure.EntityConfigurations
{
    internal sealed class CategoryEntityConfiguration : IEntityTypeConfiguration<Category>
    {
        public void Configure(EntityTypeBuilder<Category> builder)
        {
            builder.ToTable("Categories");
            builder.HasKey(r => r.Id);
            builder.Property(p => p.Name)
                .IsRequired(true)
                .HasMaxLength(256);
            builder.Property(p => p.Status)
                .IsRequired(true);
            builder.Property(p => p.Position)
                .IsRequired(true)
                .HasDefaultValue(0);

            builder.HasOne(p => p.Place)
                .WithMany(s => s.Categories)
                .HasForeignKey(p => p.PlaceId);

            builder.HasMany(p => p.MenuItems)
                .WithMany(s => s.Categories)
                .UsingEntity(j => j.ToTable("CategoryMenuItems"));
        }
    }
}
