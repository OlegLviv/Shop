using Core.Models.DomainModels.ProductModels;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Core.Models.ViewModels.RequestViewModels
{
    public class ProductViewModel : IProduct
    {
        [Required]
        public string Category { get; set; }
        [Required]
        public string SubCategory { get; set; }
        public double? PriceFrom { get; set; }
        public double? PriceTo { get; set; }
        public Description Description { get; set; }
    }
}
