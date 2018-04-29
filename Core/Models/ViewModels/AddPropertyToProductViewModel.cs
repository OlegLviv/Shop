using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Core.ValidationAttributes;

namespace Core.Models.ViewModels
{
    public class AddPropertyToProductViewModel
    {
        [Required]
        public string SubCategory { get; set; }

        [Required]
        public string PropName { get; set; }

        [Required]
        [MinLength(1)]
        [UnincalValues]
        [PropertyValues]
        public List<string> PropValues { get; set; }
    }
}
