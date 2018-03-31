using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using Core.Models.DomainModels;
using Core.Models.DTO;

namespace Core.Mapper
{
    public class MappingsProfile : Profile
    {
        public MappingsProfile()
        {
            CreateMap<ProductDto, Product>()
                .ForAllMembers(c => c.Ignore());
        }
    }
}
