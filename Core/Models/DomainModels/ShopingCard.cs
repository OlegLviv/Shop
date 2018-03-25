using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Models.DomainModels
{
    public class ShopingCard : BaseEntity
    {
        public User User { get; set; }
        public string UserId { get; set; }

        public string ProductId { get; set; }
    }
}
