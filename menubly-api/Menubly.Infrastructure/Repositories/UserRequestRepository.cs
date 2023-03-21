using Menubly.Domain.Entities;
using Menubly.Domain.Exceptions;
using Menubly.Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Menubly.Infrastructure.Repositories
{
    internal sealed class UserRequestRepository : IUserRequestRepository
    {
        private readonly MenublyDbContext _dbContext;

        public UserRequestRepository(MenublyDbContext dbContext)
        {
            _dbContext = dbContext; 
        }

        public void Create(UserRequest userRequest)
        {
            _dbContext.UserRequests.Add(userRequest);
        }

        public async Task<UserRequest> GetByIdAsync(Guid requestId, CancellationToken cancellationToken = default)
        {
            var request = await _dbContext.UserRequests.FirstOrDefaultAsync(x => x.Id == requestId, cancellationToken);
            
            if (request is null)
            {
                throw new RequestNotFoundException(requestId);
            }

            return request;
        }

        public async Task<UserRequest> GetByCodeAsync(string code, CancellationToken cancellationToken = default)
        {
            var request = await _dbContext.UserRequests.FirstOrDefaultAsync(x => x.Code == code, cancellationToken);

            if (request is null)
            {
                throw new RequestNotFoundException(code);
            }

            return request;
        }

        public void UpdateRequest(UserRequest userRequest)
        {
            _dbContext.UserRequests.Update(userRequest);
        }
    }
}
