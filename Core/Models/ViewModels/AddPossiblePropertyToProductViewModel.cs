using System.ComponentModel.DataAnnotations;

namespace Core.Models.ViewModels
{
    public class AddPossiblePropertyToProductViewModel
    {
        [Required]
        [RegularExpression("^[A-zА-яёЁ0-9]{2,20}$")]
        public string PossibleProperty { get; set; }

        [Required]
        public string SubCategory { get; set; }

        [Required]
        public string PropName { get; set; }
    }
}
