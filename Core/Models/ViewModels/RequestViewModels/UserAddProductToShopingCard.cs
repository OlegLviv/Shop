using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Core.Models.ViewModels.RequestViewModels
{
    public class UserAddProductToShopingCard
    {
        public string UserId { get; set; }
        [Required]
        public string ProductId { get; set; }
    }
}
