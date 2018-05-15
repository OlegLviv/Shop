using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Core.Models.DomainModels.Base;

namespace Core.Models.DomainModels
{
    public class Order : BaseEntity
    {
        public string UserId { get; set; }

        public User User { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [Phone]
        public string PhoneNumber { get; set; }
        
        [Required]
        public string Name { get; set; }

        [Required]
        public string LastName { get; set; }

        public List<ProductOrderContainer> ProductsContainers { get; set; }

        [Required]
        public string WayOfDelivery { get; set; }

        public OrderStatus OrderStatus { get; set; } = OrderStatus.New;

        public double TotalPrice { get; set; }
    }
}
