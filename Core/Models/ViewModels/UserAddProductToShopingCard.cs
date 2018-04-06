using System.ComponentModel.DataAnnotations;

namespace Core.Models.ViewModels
{
    public class UserAddProductToShopingCard
    {
        public string UserId { get; set; }
        [Required]
        public string ProductId { get; set; }
    }
}
