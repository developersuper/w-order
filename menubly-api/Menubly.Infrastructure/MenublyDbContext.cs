using Microsoft.EntityFrameworkCore;
using Menubly.Domain.Entities;

namespace Menubly.Infrastructure
{
    public sealed class MenublyDbContext : DbContext
    {
        public MenublyDbContext(DbContextOptions options)
            : base(options)
        {

        }

        public DbSet<User> Users { get; set; }

        public DbSet<UserProfile> UserProfiles { get; set; }

        public DbSet<UserRequest> UserRequests { get; set; }

        public DbSet<Place> Places { get; set; }

        public DbSet<Category> Categories { get; set; }

        public DbSet<MenuItem> MenuItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder) =>
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(MenublyDbContext).Assembly);

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            // Set value for creationDate and modifiedDate automatically.
            var entries = ChangeTracker.Entries()
                .Where(e => e.Entity is BaseEntity
                && (e.State == EntityState.Added
                        || e.State == EntityState.Modified));

            foreach (var entityEntry in entries)
            {
                if (entityEntry.State == EntityState.Added)
                {
                    ((BaseEntity)entityEntry.Entity).CreatedDate = DateTime.UtcNow;
                }
                else
                {
                    ((BaseEntity)entityEntry.Entity).ModifiedDate = DateTime.UtcNow;
                }
            }

            return await base.SaveChangesAsync(cancellationToken);
        }
    }
}
