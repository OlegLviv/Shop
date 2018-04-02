using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Core.Models.DomainModels
{
    public class Product : BaseEntity, IProduct
    {
        [Required]
        [MaxLength(128)]
        public string Name { get; set; }
        [Required]
        public string Category { get; set; }
        [Required]
        public string SubCategory { get; set; }
        [Required]
        public string Query { get; set; }
        [Required]
        public double Price { get; set; }
        public string Description { get; set; }
        public List<Feedback> Feedbacks { get; set; }
    }
}
