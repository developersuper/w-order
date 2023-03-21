namespace Menubly.Application.Contracts
{
    public interface IServiceManager
    {
        IUserAppService UserAppService { get; }

        IAuthenticationAppService AuthenticationAppService { get; }

        IUserProfileAppService UserProfileAppService { get; }

        IUserPlaceAppService UserPlaceAppService { get; }

        ICategoryAppService CategoryAppService { get; }

        IFileAppService FileAppService { get; }

        IPlaceAppService PlaceAppService { get; }

        IMenuItemAppService MenuItemAppService { get; }
    }
}
