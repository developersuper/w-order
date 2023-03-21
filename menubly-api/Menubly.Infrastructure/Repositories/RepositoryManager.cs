using Menubly.Domain.Repositories;

namespace Menubly.Infrastructure.Repositories
{
    public class RepositoryManager : IRepositoryManager
    {
        private readonly Lazy<IUnitOfWork> _unitOfWork;
        private readonly Lazy<IUserRepository> _userRepository;
        private readonly Lazy<IUserRequestRepository> _userRequestRepository;
        private readonly Lazy<IPlaceRepository> _placeRepository;

        public RepositoryManager(MenublyDbContext dbContext)
        {
            _unitOfWork = new Lazy<IUnitOfWork>(new UnitOfWork(dbContext));
            _userRepository = new Lazy<IUserRepository>(new UserRepository(dbContext));
            _userRequestRepository = new Lazy<IUserRequestRepository>(new UserRequestRepository(dbContext));
            _placeRepository = new Lazy<IPlaceRepository>(new PlaceRepository(dbContext));
        }

        public IUnitOfWork UnitOfWork => _unitOfWork.Value;

        public IUserRepository UserRepository => _userRepository.Value;

        public IUserRequestRepository UserRequestRepository => _userRequestRepository.Value;

        public IPlaceRepository PlaceRepository => _placeRepository.Value;
    }
}
