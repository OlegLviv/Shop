using AutoMapper;
using Core.Models.DomainModels;
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

            CreateMap<CreateOrderDto, Order>();
            CreateMap<Order, OrderDto>();

            CreateMap<SubscribeMailDto, Mailing>();
            CreateMap<Mailing, SubscribeMailDto>();
        }
    }
}
