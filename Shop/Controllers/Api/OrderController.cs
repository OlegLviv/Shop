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
        private readonly IRepositoryAsync<Order> _orderRepository;
        private readonly IOrderService _orderService;
        private readonly UserManager<User> _userManager;
        private readonly IRepositoryAsync<Product> _productRepository;

        public OrderController(IMapper mapper,
            IRepositoryAsync<Order> orderRepository,
            IOrderService orderService,
            UserManager<User> userManager,
            IRepositoryAsync<Product> productRepository)
        {
            _mapper = mapper;
            _orderRepository = orderRepository;
            _orderService = orderService;
            _userManager = userManager;
            _productRepository = productRepository;
        }

        #region GET

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
        [HttpGet("GetOrder/{id}")]
        public async Task<IActionResult> GetOrder(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
                return BadRequest("Incorrect id");

            var order = await _orderRepository.GetByIdAsync(id);

            if (order == null)
                return BadRequest("Order don't exist or incorrect id");

            return this.JsonResult(_mapper.Map<OrderDto>(order));
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
        [HttpGet("GetOrders/{pageNumber:int?}/{pageSize:int?}/{orderStatus:int?}")]
        public IActionResult GetOrders(int pageNumber = 1, int pageSize = 16, OrderStatus orderStatus = OrderStatus.New)
        {
            var orders = _orderRepository.Table.Where(x => x.OrderStatus == orderStatus);

            var paginator = new Paginator<OrderDto>
            {
                Data = _mapper.Map<IEnumerable<OrderDto>>(orders.Page(pageNumber, pageSize)),
                PageNumber = pageNumber,
                PageSize = pageSize,
                TotalCount = orders.Count()
            };

            return this.JsonResult(paginator);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("GetOwnOrders/{pageNumber:int?}/{pageSize:int?}/{orderStatus:int?}")]
        public async Task<IActionResult> GetOwnOrders(int pageNumber = 1, int pageSize = 16, OrderStatus orderStatus = OrderStatus.New)
        {
            var user = await this.GetUserByIdentityAsync(_userManager);

            if (user == null)
                return Unauthorized();

            var orders = _orderRepository
                .Table
                .Include(x => x.ProductsContainers)
                .Where(x => x.UserId == user.Id);

            return this.JsonResult(new Paginator<OrderDto>
            {
                PageNumber = pageNumber,
                PageSize = pageSize,
                Data = _mapper.Map<IEnumerable<OrderDto>>(orders.Page(pageNumber, pageSize)),
                TotalCount = orders.Count()
            });
        }

        #endregion

        #region POST

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("CreateUserOrder")]
        public async Task<IActionResult> CreateUserOrder([FromBody] CreateOrderDto model)
        {
            var order = _mapper.Map<Order>(model);
            var user = await this.GetUserByIdentityAsync(_userManager);

            if (user == null)
                return Unauthorized();

            order.User = user;
            order.UserId = user.Id;
            order.ProductsContainers.ForEach(async x =>
            {
                x.OrderId = order.Id;
                x.Order = order;
                x.Product = await _productRepository.GetByIdAsync(x.ProductId);
            });
            order.TotalPrice = _orderService.CalculateTotalPriceAsync(order);

            var insertResult = await _orderRepository.InsertAsync(order);

            if (insertResult >= 1)
                return Ok("Success");

            return BadRequest("Can't insert order");
        }

        [HttpPost("CreateOrder")]
        public async Task<IActionResult> CreateOrder([FromBody] CreateOrderDto model)
        {
            var order = _mapper.Map<Order>(model);

            order.ProductsContainers.ForEach(async x =>
            {
                x.OrderId = order.Id;
                x.Order = order;
                x.Product = await _productRepository.GetByIdAsync(x.ProductId);
            });
            order.TotalPrice = _orderService.CalculateTotalPriceAsync(order);

            var insertResult = await _orderRepository.InsertAsync(order);

            if (insertResult >= 1)
                return Ok("Success");

            return BadRequest("Can't insert order");
        }
        #endregion

        #region PUT

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
        [HttpPut("ChangeOrderStatus/{id}/{orderStatus:int}")]
        public async Task<IActionResult> ChangeOrderStatus(string id, OrderStatus orderStatus)
        {
            if (string.IsNullOrWhiteSpace(id))
                return BadRequest("Incorrect id");

            var order = await _orderRepository.GetByIdAsync(id);

            if (order == null)
                return BadRequest("Order don't exist or incorrect id");

            if (order.OrderStatus == orderStatus)
                return BadRequest($"Order allready have status {order.OrderStatus.ToString()}");

            order.OrderStatus = orderStatus;

            var updateRes = await _orderRepository.UpdateAsync(order);

            if (updateRes >= 1)
                return Ok(_mapper.Map<OrderDto>(order));

            return BadRequest("Can't update order");
        }

        #endregion
    }
}