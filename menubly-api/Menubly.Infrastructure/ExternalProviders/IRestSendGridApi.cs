using Refit;

namespace Menubly.Infrastructure.ExternalProviders
{
    [Headers("Authorization: Bearer", "Content-Type: application/json")]
    public interface IRestSendGridApi
    {
        [Post("/v3/mail/send")]
        Task SendEmailAsync([Body(BodySerializationMethod.Serialized)] object sendEmailRequestBody);
    }
}
