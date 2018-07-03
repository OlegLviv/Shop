using System.Collections.Generic;
using Core.Models.DomainModels;

namespace Core.Models.DTO.Order
{
    public class OrderDto
    {
        public string Id { get; set; }

        public string Email { get; set; }

        public string PhoneNumber { get; set; }

        public string Name { get; set; }

        public string LastName { get; set; }

        public List<ProductOrderContainer> ProductsContainers { get; set; }

        public string WayOfDelivery { get; set; }

        public OrderStatus OrderStatus { get; set; } = OrderStatus.New;

        public double TotalPrice { get; set; }

        public long CreateDate { get; set; }
    }
}
