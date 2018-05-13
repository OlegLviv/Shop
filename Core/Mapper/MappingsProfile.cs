using AutoMapper;
using Core.Models.DomainModels;
using Core.Models.DomainModels.Base;
using Core.Models.DTO;
using Core.Models.DTO.Mailing;
using Core.Models.DTO.Order;
using Core.Models.DTO.Product;

namespace Core.Mapper
{
    public class MappingsProfile : Profile
    {
        public MappingsProfile()
        {
            CreateMap<Product, ProductDto>();
            CreateMap<AddProductDto, Product>();

            CreateMap<User, UserDto>();

            CreateMap<BaseOrderDto, BaseOrder>();
            CreateMap<BaseOrder, BaseOrderDto>();
            CreateMap<CreateOrderDto, AnonimOrder>();
            CreateMap<CreateOrderDto, UserOrder>();
            CreateMap<AnonimOrder, OrderDto>();
            CreateMap<UserOrder, OrderDto>();

            CreateMap<SubscribeMailDto, Mailing>();
            CreateMap<Mailing, SubscribeMailDto>();
        }
    }
}
