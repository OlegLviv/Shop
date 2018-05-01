using System.ComponentModel.DataAnnotations;

namespace Core.Models.DTO.User
{
    public class AddProductToShopingCardUserDto
    {
        [Required]
        public string UserId { get; set; }

        [Required]
        public string ProductId { get; set; }
    }
}
