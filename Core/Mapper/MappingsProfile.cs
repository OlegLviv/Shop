using System;
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

            CreateMap<CreateCallMeDto, CallMe>();
            CreateMap<CallMe, CallMeDto>();

            CreateMap<SubscribeMailDto, Mailing>();
            CreateMap<Mailing, SubscribeMailDto>();

            CreateMap<SendProductFeedbackDto, Feedback>();
            CreateMap<Feedback, FeedbackDto>().ForMember(d => d.Date,
                m => m.MapFrom(nd => ((DateTimeOffset)nd.Date).ToUnixTimeSeconds()));
            CreateMap<SubFeedback, SubFeedbackDto>();
        }
    }
}
