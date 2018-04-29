using System.ComponentModel.DataAnnotations;

namespace Core.Models.ViewModels
{
    public class UserAddProductToShopingCard
    {
        [Required]
        public string UserId { get; set; }

        [Required]
        public string ProductId { get; set; }
    }
}
