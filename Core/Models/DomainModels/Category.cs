using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Core.Models.DomainModels
{
    public class Category
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string SubCategory { get; set; }
        [Required]
        public string ViewName { get; set; }
        [Required]
        public string ViewSubCategoryName { get; set; }
    }
}
