namespace Menubly.Domain.Repositories
{
    public interface IRepositoryManager
    {
        IUserRepository UserRepository { get; }

        IUserRequestRepository UserRequestRepository { get; }

        IPlaceRepository PlaceRepository { get; }

        IUnitOfWork UnitOfWork { get; } 
    }
}
