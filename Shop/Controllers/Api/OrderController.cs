using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BLL.Filters.ActionFilters;
using BLL.Services.Interfaces;
using Common.Extensions;
using Core.Interfaces;
using Core.Models.DomainModels;
using Core.Models.DTO;
using Core.Models.DTO.Order;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Shop.Controllers.Api
{
    [Produces("application/json")]
    [Route("api/Order")]
    [ModelStateFilter]
    public class OrderController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IRepositoryAsync<AnonimOrder> _anonimOrderRepositoryAsync;
        private readonly IRepositoryAsync<UserOrder> _userOrderRepositoryAsync;
        private readonly IOrderService _orderService;

        public OrderController(IMapper mapper,
            IRepositoryAsync<AnonimOrder> anonimOrderRepositoryAsync,
            IRepositoryAsync<UserOrder> userOrderRepositoryAsync,
            IOrderService orderService)
        {
            _mapper = mapper;
            _anonimOrderRepositoryAsync = anonimOrderRepositoryAsync;
            _userOrderRepositoryAsync = userOrderRepositoryAsync;
            _orderService = orderService;
        }

        #region GET

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
        [HttpGet("GetOrders/{pageNumber:int?}/{pageSize:int?}/{orderStatus:int?}")]
        public IActionResult GetOrders(int pageNumber = 1, int pageSize = 16, OrderStatus orderStatus = OrderStatus.New)
        {
            var paginator = new Paginator<OrderDto>
            {
                PageNumber = pageNumber,
                PageSize = pageSize
            };

            var anonOrders = _anonimOrderRepositoryAsync
                .Table
                .Include(x=>x.Orders)
                .Where(x => x.OrderStatus == orderStatus);

            var userOrders = _userOrderRepositoryAsync
                .Table
                .Where(x => x.OrderStatus == orderStatus);

            paginator.TotalCount = anonOrders.Count() + userOrders.Count();
            paginator.Data = _mapper.Map<IEnumerable<OrderDto>>(anonOrders)
                .Concat(_mapper.Map<IEnumerable<OrderDto>>(userOrders))
                .Page(pageNumber, pageSize);

            return this.JsonResult(paginator);
        }

        #endregion

        #region POST

        [HttpPost("CreateOrder")]
        public async Task<IActionResult> CreateOrder([FromBody] CreateAnonimOrderDto model)
        {

            var anonimOrder = _mapper.Map<AnonimOrder>(model);
            anonimOrder.Orders.ForEach(c => c.OrderId = anonimOrder.Id);
            anonimOrder.TotalPrice = await _orderService.CalculateTotalPriceAsync(anonimOrder.Orders);
            var inserResult = await _anonimOrderRepositoryAsync.InsertAsync(anonimOrder);

            if (inserResult <= 1)
                return BadRequest("Can't create order");

            return Ok("Success");
        }
        #endregion
    }
}