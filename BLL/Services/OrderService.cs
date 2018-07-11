﻿using System;
using BLL.Services.Interfaces;
using Core.Models.DomainModels;

namespace BLL.Services
{
    public class OrderService : IOrderService
    {
        public double CalculateTotalPrice(Order order)
        {
            if (order == null)
                throw new ArgumentNullException();

            var totalPrice = 0.0d;
            var productContainers = order.ProductsContainers;

            foreach (var container in productContainers)
            {
                totalPrice += (container.Product.Discount == 0 ? container.Product.Price : container.Product.PriceWithDiscount) * container.Count;
            }

            return totalPrice;
        }
    }
}
