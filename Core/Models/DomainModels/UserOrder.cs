using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Core.Models.DomainModels.Base;

namespace Core.Models.DomainModels
{
    public class UserOrder : BaseEntity
    {
        public List<Product> Products { get; set; }
        public User User { get; set; }
        public string UserId { get; set; }

        [Required]
        [Range(0.1, double.MaxValue)]
        public double TotalPrice { get; set; }

        [Required]
        public string WayOfDelivery { get; set; }

        public OrderStatus OrderStatus { get; set; } = OrderStatus.New;
    }
}
