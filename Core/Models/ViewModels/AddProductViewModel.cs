using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

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
        public IFormFile[] Images { get; set; }
    }
}
