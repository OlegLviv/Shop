using System.ComponentModel.DataAnnotations;

namespace Core.Models.DTO.Order
{
    public class BaseOrderDto
    {
        [Required]
        public string ProductId { get; set; }

        [Range(1, int.MaxValue)]
        public int Count { get; set; }
    }
}
