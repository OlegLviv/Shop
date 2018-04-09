using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Core.Models.ViewModels
{
    public class AddProductViewModel
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
    }
}
