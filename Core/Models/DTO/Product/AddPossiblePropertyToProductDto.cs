using System.ComponentModel.DataAnnotations;

namespace Core.Models.DTO.Product
{
    public class AddPossiblePropertyToProductDto
    {
        [Required]
        [RegularExpression("^[A-zА-яёЁіІ0-9]{2,20}$")]
        public string PossibleProperty { get; set; }

        [Required]
        public string SubCategory { get; set; }

        [Required]
        public string PropName { get; set; }
    }
}
