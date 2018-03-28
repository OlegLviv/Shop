using System.ComponentModel.DataAnnotations;
using Core.Models.DomainModels.ProductModels;

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
    }
}
