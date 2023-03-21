using AutoMapper;
using Menubly.Application.Contracts.Dto;
using Menubly.Domain.Entities;

namespace Menubly.Application.AutoMapperProfiles
{
    public class UserMapperProfile : Profile
    {
        public UserMapperProfile()
        {
            CreateMap<User, UserDto>().ReverseMap();

            CreateMap<UserProfile, UserProfileDto>().ReverseMap();

            CreateMap<Place, PlaceDto>()
                .ForMember(dest => dest.CategoryCount, opt => opt.MapFrom(b => b.Categories.Count))
                .ForMember(dest => dest.MenuItemCount, opt => opt.MapFrom(b => b.Categories.Sum(c => c.MenuItems.Count)));

            CreateMap<PlaceDto, Place>();

            CreateMap<Place, PlaceDetailDto>().ReverseMap();

            CreateMap<Category, CategoryDto>().ReverseMap();

            CreateMap<MenuItem, MenuItemDto>().ReverseMap();
        }
    }
}
