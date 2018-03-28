using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Core.Models.DomainModels.ProductModels
{
    public class Product : BaseEntity, IProduct
    {
        [Required]
        public string Category { get; set; }
        [Required]
        public string SubCategory { get; set; }
        [Required]
        public string Query { get; set; }
        public Description Description { get; set; }
    }
}
