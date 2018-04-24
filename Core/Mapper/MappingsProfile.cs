using System.Collections.Generic;
using AutoMapper;
using Core.Models.DomainModels;
using Core.Models.DTO;

namespace Core.Mapper
{
    public class MappingsProfile : Profile
    {
        public MappingsProfile()
        {
            CreateMap<Product, ProductDto>();
            CreateMap<User, UserDto>();
        }
    }
}
