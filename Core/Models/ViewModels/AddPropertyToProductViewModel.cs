using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

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
        public List<string> PropValues { get; set; }
    }
}
