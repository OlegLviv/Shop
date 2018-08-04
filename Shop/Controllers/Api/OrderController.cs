using System;
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
using Microsoft.Extensions.Configuration;

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
        private readonly IRepositoryAsync<CallMe> _callMeRepository;
        private readonly IEmailSender _emailSender;

        public OrderController(IMapper mapper,
            IRepositoryAsync<Order> orderRepository,
            UserManager<User> userManager,
            IRepositoryAsync<Product> productRepository,
            IOrderService orderService,
            IRepositoryAsync<CallMe> callMeRepository,
            IEmailSender emailSender)
        {
            _mapper = mapper;
            _orderRepository = orderRepository;
            _userManager = userManager;
            _productRepository = productRepository;
            _orderService = orderService;
            _callMeRepository = callMeRepository;
            _emailSender = emailSender;
        }

        #region GET

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
        [HttpGet("GetOrder/{id}")]
        public async Task<IActionResult> GetOrder(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
                return BadRequest("Incorrect id");

            var order = await _orderRepository
                .Table
                .Include(x => x.ProductsContainers)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (order == null)
                return BadRequest("Order don't exist or incorrect id");

            foreach (var container in order.ProductsContainers)
            {
                container.Product = await _productRepository.GetByIdAsync(container.ProductId);
            }

            return this.JsonResult(_mapper.Map<OrderDto>(order));
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
        [HttpGet("GetOrders/{pageNumber:int?}/{pageSize:int?}/{orderStatus:int?}")]
        public async Task<IActionResult> GetOrders(int pageNumber = 1, int pageSize = 16, OrderStatus orderStatus = OrderStatus.New)
        {
            var orders = _orderRepository
                .Table
                .Where(x => x.OrderStatus == orderStatus);

            var page = orders
                .Page(pageNumber, pageSize)
                .Include(x => x.User)
                .Include(x => x.ProductsContainers);

            foreach (var order in page)
            {
                foreach (var container in order.ProductsContainers)
                {
                    container.Product = await _productRepository.GetByIdAsync(container.ProductId);
                }
            }

            var paginator = new Paginator<OrderDto>
            {
                Data = _mapper.Map<IEnumerable<OrderDto>>(page),
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
                .Where(x => x.UserId == user.Id);

            var page = orders.Page(pageNumber, pageSize).Include(x => x.ProductsContainers);

            foreach (var order in page)
            {
                foreach (var container in order.ProductsContainers)
                {
                    container.Product = await _productRepository.GetByIdAsync(container.ProductId);
                }
            }

            return this.JsonResult(new Paginator<OrderDto>
            {
                PageNumber = pageNumber,
                PageSize = pageSize,
                Data = _mapper.Map<IEnumerable<OrderDto>>(page),
                TotalCount = orders.Count()
            });
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
        [HttpGet("GetCallMe/{status:int}/{pageNumber}/{pageSize}")]
        public IActionResult GetCallMe(CallMeStatus status, int pageNumber = 1, int pageSize = 16)
        {
            var callMeList = _callMeRepository
                .Table
                .Where(x => x.CallMeStatus == status);

            var callMePagination = new Paginator<CallMeDto>
            {
                Data = _mapper.Map<IEnumerable<CallMeDto>>(callMeList).Page(pageNumber, pageSize),
                TotalCount = callMeList.Count(),
                PageSize = pageSize,
                PageNumber = pageNumber
            };

            return this.JsonResult(callMePagination);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
        [HttpGet("GetCallMe/{id}")]
        public async Task<IActionResult> GetCallMe(string id)
        {
            var callMe = await _callMeRepository.GetByIdAsync(id);

            if (callMe == null)
                return BadRequest("Incorrect id or call me not found");

            return this.JsonResult(_mapper.Map<CallMeDto>(callMe));
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

            foreach (var container in order.ProductsContainers)
            {
                container.OrderId = order.Id;
                container.Order = order;
                container.Product = await _productRepository.GetByIdAsync(container.ProductId);
            }

            order.TotalPrice = _orderService.CalculateTotalPrice(order);

            var insertResult = await _orderRepository.InsertAsync(order);

            await _emailSender.SendEmailAsync(
                (HttpContext.RequestServices.GetService(typeof(IConfiguration)) as IConfiguration)?["EmailCredential:Email"],
                order.Email,
                "Info",
                MailsContainer.GetMailForCreateOrder(order));

            if (insertResult >= 1)
                return Ok("Success");

            return BadRequest("Can't insert order");
        }

        [HttpPost("CreateOrder")]
        public async Task<IActionResult> CreateOrder([FromBody] CreateOrderDto model)
        {
            var order = _mapper.Map<Order>(model);

            foreach (var container in order.ProductsContainers)
            {
                container.OrderId = order.Id;
                container.Order = order;
                container.Product = await _productRepository.GetByIdAsync(container.ProductId);
            }

            order.TotalPrice = _orderService.CalculateTotalPrice(order);

            var insertResult = await _orderRepository.InsertAsync(order);

            await _emailSender.SendEmailAsync(
                (HttpContext.RequestServices.GetService(typeof(IConfiguration)) as IConfiguration)?["EmailCredential:Email"],
                order.Email,
                "Info",
                MailsContainer.GetMailForCreateOrder(order));

            if (insertResult >= 1)
                return Ok("Success");

            return BadRequest("Can't insert order");
        }

        [HttpPost("CreateCallMe")]
        public async Task<IActionResult> CallMe([FromBody] CreateCallMeDto model)
        {
            var callMe = _mapper.Map<CallMe>(model);

            var insertedResult = await _callMeRepository.InsertAsync(callMe);

            if (insertedResult >= 1)
                return Ok("Success");

            return BadRequest("Can't insert call me request");
        }
        #endregion

        #region PUT

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
        [HttpPut("ChangeCallMeStatus/{id}/{callMeStatus:int}")]
        public async Task<IActionResult> ChangeCallMeStatus(string id, CallMeStatus callMeStatus)
        {
            if (string.IsNullOrWhiteSpace(id))
                return BadRequest("Incorrect id");

            var callMe = await _callMeRepository.GetByIdAsync(id);

            if (callMe == null)
                return BadRequest("Call me don't exist or incorrect id");

            if (callMe.CallMeStatus == callMeStatus)
                return BadRequest($"Call me allready have status {callMe.CallMeStatus.ToString()}");

            callMe.CallMeStatus = callMeStatus;

            var updateRes = await _callMeRepository.UpdateAsync(callMe);

            if (updateRes >= 1)
                return Ok(_mapper.Map<CallMeDto>(callMe));

            return BadRequest("Can't update call me");
        }

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

        #region DELETE

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
        [HttpDelete("DeleteCallMe/{id}")]
        public async Task<IActionResult> DeleteCallMe(string id)
        {
            if (string.IsNullOrEmpty(id))
                return BadRequest("Incorrect id");

            var callMe = await _callMeRepository.GetByIdAsync(id);

            if (callMe == null)
                return BadRequest("Icorrect id or call me not found");

            var deleteResult = await _callMeRepository.DeleteAsync(callMe);

            if (deleteResult >= 1)
                return Ok("Success");

            return BadRequest("Can't delete call me");
        }
        #endregion

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
        [HttpDelete("DeleteOrder/{id}")]
        public async Task<IActionResult> DeleteOrder(string id)
        {
            if (string.IsNullOrEmpty(id))
                return BadRequest("Incorrect Id");

            var order = await _orderRepository.Table.Include(pc => pc.ProductsContainers)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (order == null)
                return NotFound("Order not found");

            var deleteResult = await _orderRepository.DeleteAsync(order);

            if (deleteResult >= 1)
                return NoContent();

            throw new ApplicationException("Can't delete order");
        }
    }
}