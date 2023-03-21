namespace Menubly.Application.Base
{
    internal sealed class CurrentUser
    {
        internal CurrentUser(string? userSub, string? userGroup)
        {
            UserSub = userSub;
            UserGroup = userGroup;
        }

        internal string? UserSub { get; private set; }

        internal string? UserGroup { get; private set; }
    }
}
