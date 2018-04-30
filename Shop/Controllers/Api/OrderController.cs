using System.Threading.Tasks;
using AutoMapper;
using BLL.Filters.ActionFilters;
using Core.Interfaces;
using Core.Models.DomainModels;
using Core.Models.DTO.Order;
using Microsoft.AspNetCore.Mvc;

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

        public OrderController(IMapper mapper,
            IRepositoryAsync<AnonimOrder> anonimOrderRepositoryAsync,
            IRepositoryAsync<UserOrder> userOrderRepositoryAsync)
        {
            _mapper = mapper;
            _anonimOrderRepositoryAsync = anonimOrderRepositoryAsync;
            _userOrderRepositoryAsync = userOrderRepositoryAsync;
        }
        #region POST

        [HttpPost("CreateOrder")]
        public async Task<IActionResult> CreateOrder([FromBody] CreateAnonimOrderDto model)
        {

            var anonimOrder = _mapper.Map<AnonimOrder>(model);
            anonimOrder.Orders.ForEach(c => c.OrderId = anonimOrder.Id);
            var inserResult = await _anonimOrderRepositoryAsync.InsertAsync(anonimOrder);

            if (inserResult <= 1)
                return BadRequest("Can't create order");

            return Ok("Success");
        }
        #endregion
    }
}