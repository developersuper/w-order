using Menubly.Domain.Repositories;

namespace Menubly.Infrastructure.Repositories
{
    internal sealed class UnitOfWork : IUnitOfWork
    {
        private readonly MenublyDbContext _context;

        public UnitOfWork(MenublyDbContext context) => _context = context;  

        public async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            return await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
