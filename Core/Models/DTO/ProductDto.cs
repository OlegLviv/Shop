using System.ComponentModel.DataAnnotations;
using Core.Models.DomainModels.Base;

namespace Core.Models.DTO
{
    public class ProductDto : IProduct
    {
        public string Id { get; set; }

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

        public long Review { get; set; }

        //  todo maybe need delete
        public int ProductCount { get; set; }
    }
}
