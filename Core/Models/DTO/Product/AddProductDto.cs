using System.ComponentModel.DataAnnotations;
using Core.ValidationAttributes;
using Microsoft.AspNetCore.Http;

namespace Core.Models.DTO.Product
{
    public class AddProductDto
    {
        [Required]
        [MaxLength(128)]
        public string Name { get; set; }

        [JSEmpty]
        [Required]
        public string Category { get; set; }

        [JSEmpty]
        [Required]
        public string SubCategory { get; set; }

        [Required]
        public string Query { get; set; }

        [Required]
        [Range(0.1, 9999)]
        public double Price { get; set; }

        public int Discount { get; set; }

        public string Description { get; set; }

        public IFormFile[] Images { get; set; }
    }
}
