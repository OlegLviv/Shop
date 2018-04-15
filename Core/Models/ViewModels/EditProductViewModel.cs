using System.ComponentModel.DataAnnotations;

namespace Core.Models.ViewModels
{
    public class EditProductViewModel
    {
        [Required]
        public string ProductId { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
    }
}
