using System.ComponentModel.DataAnnotations;

namespace Core.Models.ViewModels
{
    public class EditProductViewModel
    {
        [Required]
        public string ProductId { get; set; }

        [Required]
        [MinLength(2)]
        public string Name { get; set; }

        [Required]
        [Range(0.1, double.MaxValue)]
        public double Price { get; set; }
    }
}
