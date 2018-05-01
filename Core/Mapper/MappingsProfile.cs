using System.Collections.Generic;
using AutoMapper;
using Core.Models.DomainModels;
using Core.Models.DomainModels.Base;
using Core.Models.DTO;
using Core.Models.DTO.Order;

namespace Core.Mapper
{
    public class MappingsProfile : Profile
    {
        public MappingsProfile()
        {
            CreateMap<Product, ProductDto>();
            CreateMap<User, UserDto>();
            CreateMap<BaseOrderDto, BaseOrder>();
            CreateMap<BaseOrder, BaseOrderDto>();
            CreateMap<CreateAnonimOrderDto, AnonimOrder>();
            CreateMap<AnonimOrder, OrderDto>();
            CreateMap<UserOrder, OrderDto>();
        }
    }
}
