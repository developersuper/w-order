using Menubly.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Menubly.Infrastructure.EntityConfigurations
{
    internal sealed class PlaceEntityConfiguration : IEntityTypeConfiguration<Place>
    {
        public void Configure(EntityTypeBuilder<Place> builder)
        {
            builder.ToTable("Places");
            builder.HasKey(r => r.Id);
            builder.HasIndex(r => r.Url);
            builder.Property(p => p.Name)
                .IsRequired(true)
                .HasMaxLength(256);
            builder.Property(p => p.Url)
                .IsRequired(true)
                .HasMaxLength(256);
            builder.Property(p => p.QRCode)
                .IsRequired(true)
                .HasMaxLength(256);
            builder.Property(p => p.PhoneNumber)
                .IsRequired(false)
                .HasMaxLength(24);
            builder.Property(p => p.Address)
                .IsRequired(false)
                .HasMaxLength(256);
            builder.Property(p => p.HeaderImage)
                .IsRequired(false)
                .HasMaxLength(256);
            builder.Property(p => p.HeaderColor)
                .IsRequired(false)
                .HasMaxLength(256);
            builder.Property(p => p.Currency)
                .IsRequired(false)
                .HasMaxLength(24).
                HasDefaultValue("USD");
            builder.Property(p => p.ThemeColor)
                .IsRequired(false)
                .HasMaxLength(16);
            builder.Property(p => p.Logo)
                .IsRequired(false)
                .HasMaxLength(256);
            builder.Property(p => p.Note)
                .IsRequired(false)
                .HasMaxLength(4000);
            builder.Property(p => p.BackgroundColor)
                .IsRequired(false)
                .HasMaxLength(256)
                .HasDefaultValue("#FFFFFF");
            builder.Property(p => p.TextColor)
                .IsRequired(false)
                .HasMaxLength(256)
                .HasDefaultValue("#000000");
            builder.Property(p => p.FooterNote)
                .IsRequired(false)
                .HasMaxLength(4000);

            builder.HasOne(p => p.User)
                .WithMany(s => s.Places)
                .HasForeignKey(p => p.UserId);

            builder.HasMany(p => p.Categories)
                .WithOne(s => s.Place)
                .HasForeignKey(p => p.PlaceId);
        }
    }
}
