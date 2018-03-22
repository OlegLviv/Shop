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
        public Description Description { get; set; }

        public override bool Equals(object obj)
        {
            var product = obj as IProduct;
            if (product == null)
                return false;
            var result = product.Category == Category
                && product.SubCategory == SubCategory
                && product.Description.Equals(Description);
            return result;
        }
    }
}
