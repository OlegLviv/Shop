﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Core.Models.DomainModels.Base;

namespace Core.Models.DomainModels
{
    public class UserOrder : BaseEntity
    {
        public User User { get; set; }
        public string UserId { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [Phone]
        public string Phone { get; set; }

        [Required]
        [RegularExpression("^(([A-zА-яёЁіІ]+(\\\'|\\-)?[A-zА-яёЁіІ]+)((\\s?)([A-zА-яёЁіІ]+(\\\'|\\-)?[A-zА-яёЁіІ]+))?){1,20}$")]
        public string NameLastName { get; set; }

        [Required]
        public List<BaseOrder> Orders { get; set; }

        [Required]
        [Range(0.1, double.MaxValue)]
        public double TotalPrice { get; set; }

        [Required]
        public string WayOfDelivery { get; set; }

        public OrderStatus OrderStatus { get; set; } = OrderStatus.New;
    }
}
