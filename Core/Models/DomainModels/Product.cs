using System.ComponentModel.DataAnnotations;

namespace Core.Models.DomainModels
{
    public class Product : BaseEntity, IProduct
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
    }
}
