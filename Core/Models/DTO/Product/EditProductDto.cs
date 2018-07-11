using System.ComponentModel.DataAnnotations;

namespace Core.Models.DTO.Product
{
    public class EditProductDto
    {
        [Required]
        public string ProductId { get; set; }

        [Required]
        [MinLength(2)]
        public string Name { get; set; }

        [Required]
        [Range(0.1, 99999)]
        public double Price { get; set; }

        [Range(0, 100)]
        public int Discount { get; set; }

        public string Description { get; set; }

        public bool IsAvailable { get; set; }
    }
}
