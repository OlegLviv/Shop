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
        [Range(0.1, double.MaxValue)]
        public double Price { get; set; }
    }
}
