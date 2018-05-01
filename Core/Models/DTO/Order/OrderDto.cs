using System.Collections.Generic;
using Core.Models.DomainModels;

namespace Core.Models.DTO.Order
{
    public class OrderDto
    {
        public string Id { get; set; }

        public string Email { get; set; }

        public string Phone { get; set; }

        public string NameLastName { get; set; }

        public List<BaseOrderDto> Orders { get; set; }

        public double TotalPrice { get; set; }

        public string WayOfDelivery { get; set; }

        public OrderStatus OrderStatus { get; set; }
    }
}
