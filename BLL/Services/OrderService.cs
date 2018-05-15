using System;
using System.Linq;
using BLL.Services.Interfaces;
using Core.Models.DomainModels;

namespace BLL.Services
{
    public class OrderService : IOrderService
    {
        public double CalculateTotalPriceAsync(Order order)
        {
            if (order == null)
                throw new ArgumentNullException();

            return order.ProductsContainers.Sum(container => container.Product.Price);
        }
    }
}
