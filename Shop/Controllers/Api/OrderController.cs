using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Core.Interfaces;
using Core.Models.DomainModels;
using Core.Models.DTO.Order;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Shop.Controllers.Api
{
    [Produces("application/json")]
    [Route("api/Orders")]
    public class OrderController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IRepositoryAsync<AnonimOrder> _anonimOrderRepositoryAsync;
        private readonly IRepositoryAsync<UserOrder> _userOrderRepositoryAsync;

        public OrderController(IMapper mapper,
            IRepositoryAsync<AnonimOrder> anonimOrderRepositoryAsync,
            IRepositoryAsync<UserOrder> userOrderRepositoryAsync)
        {
            _mapper = mapper;
            _anonimOrderRepositoryAsync = anonimOrderRepositoryAsync;
            _userOrderRepositoryAsync = userOrderRepositoryAsync;
        }
        #region POST

        //[HttpPost("CreateOrder")]
        //public async Task<IActionResult> CreateOrder(CreateAnonimOrderDto model)
        //{
        //    var anonimOrder = _mapper.Map<AnonimOrder>(model);
        //}
#endregion
    }
}