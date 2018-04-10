using System.ComponentModel.DataAnnotations;
using Core.Models.DomainModels;

namespace Core.Models.DTO
{
    public class ProductDto : IProduct
    {
        [Required]
        public string Category { get; set; }
        [Required]
        public string SubCategory { get; set; }
        [Required]
        public string Query { get; set; }
        [Required]
        public double Price { get; set; }
        [Required]
        public string Name { get; set; }
        public int ProductCount { get; set; }
    }
}
