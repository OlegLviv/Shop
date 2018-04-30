using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BLL.Services.Interfaces;
using Core.Interfaces;
using Core.Models.DomainModels;
using Core.Models.DomainModels.Base;

namespace BLL.Services
{
    public class OrderService : IOrderService
    {
        private readonly IRepositoryAsync<Product> _productRepositoryAsync;

        public OrderService(IRepositoryAsync<Product> productRepositoryAsync)
        {
            _productRepositoryAsync = productRepositoryAsync;
        }
        public async Task<double> CalculateTotalPriceAsync(IEnumerable<IBaseOrder> orders)
        {
            if(orders == null)
                throw new ArgumentNullException();

            var totalPrice = 0.0d;

            foreach (var order in orders)
            {
                var product = await _productRepositoryAsync.GetByIdAsync(order.ProductId);

                if(product == null)
                    throw new Exception($"Can't find product with this id: {order.ProductId}");

                totalPrice += order.Count * product.Price;
            }

            return totalPrice;
        }
    }
}
