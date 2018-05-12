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
using Microsoft.AspNetCore.Identity;
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
        private readonly UserManager<User> _userManager;

        public OrderController(IMapper mapper,
            IRepositoryAsync<AnonimOrder> anonimOrderRepositoryAsync,
            IRepositoryAsync<UserOrder> userOrderRepositoryAsync,
            IOrderService orderService,
            UserManager<User> userManager)
        {
            _mapper = mapper;
            _anonimOrderRepositoryAsync = anonimOrderRepositoryAsync;
            _userOrderRepositoryAsync = userOrderRepositoryAsync;
            _orderService = orderService;
            _userManager = userManager;
        }

        #region GET

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
        [HttpGet("GetOrder/{id}")]
        public async Task<IActionResult> GetOrder(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
                return BadRequest("Incorrect id");

            var anonimOrder = await _anonimOrderRepositoryAsync.Table.Include(x => x.Orders)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (anonimOrder != null)
                return this.JsonResult(_mapper.Map<OrderDto>(anonimOrder));

            var userOrder = await _userOrderRepositoryAsync
                .Table
                .Include(u => u.User)
                .Include(x => x.Orders)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (userOrder == null)
                return BadRequest("Incorrect id or can't find order");

            return this.JsonResult(_mapper.Map<OrderDto>(userOrder));
        }

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
                .Include(x => x.Orders)
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
        public async Task<IActionResult> CreateOrder([FromBody] CreateOrderDto model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                var anonimOrder = _mapper.Map<AnonimOrder>(model);
                anonimOrder.Orders.ForEach(c => c.OrderId = anonimOrder.Id);
                anonimOrder.TotalPrice = await _orderService.CalculateTotalPriceAsync(anonimOrder.Orders);
                var inserResult = await _anonimOrderRepositoryAsync.InsertAsync(anonimOrder);

                if (inserResult <= 1)
                    return BadRequest("Can't create order");
            }
            else
            {
                var userOrder = _mapper.Map<UserOrder>(model);
                userOrder.User = user;
                userOrder.UserId = user.Id;
                userOrder.Orders.ForEach(c => c.OrderId = userOrder.Id);
                userOrder.TotalPrice = await _orderService.CalculateTotalPriceAsync(userOrder.Orders);
                var inserResult = await _userOrderRepositoryAsync.InsertAsync(userOrder);

                if (inserResult <= 1)
                    return BadRequest("Can't create order");
            }

            return Ok("Success");
        }
        #endregion

        #region PUT

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
        [HttpPut("ChangeOrderStatus/{id}/{orderStatus:int}")]
        public async Task<IActionResult> ChangeOrderStatus(string id, OrderStatus orderStatus)
        {
            if (string.IsNullOrWhiteSpace(id))
                return BadRequest("Incorrect id");

            var anonimOrder = await _anonimOrderRepositoryAsync.Table.Include(x => x.Orders)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (anonimOrder != null)
            {
                anonimOrder.OrderStatus = orderStatus;
                await _anonimOrderRepositoryAsync.UpdateAsync(anonimOrder);
                return this.JsonResult(_mapper.Map<OrderDto>(anonimOrder));
            }

            var userOrder = await _userOrderRepositoryAsync
                .Table
                .Include(u => u.User)
                .Include(x => x.Orders)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (userOrder == null)
                return BadRequest("Incorrect id or can't find order");

            userOrder.OrderStatus = orderStatus;
            await _userOrderRepositoryAsync.UpdateAsync(userOrder);

            return Ok(_mapper.Map<OrderDto>(userOrder));
        }

        #endregion
    }
}