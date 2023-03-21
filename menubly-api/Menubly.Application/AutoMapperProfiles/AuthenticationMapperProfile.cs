using AutoMapper;
using Menubly.Application.Contracts.Dto;
using Menubly.Domain.DomainModels;

namespace Menubly.Application.AutoMapperProfiles
{
    public class AuthenticationMapperProfile : Profile
    {
        public AuthenticationMapperProfile()
        {
            CreateMap<AuthenticationResult, AuthenticationResultDto>().ReverseMap();
        }
    }
}
