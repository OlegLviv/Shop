using System.ComponentModel.DataAnnotations;

namespace Core.Models.DTO.Order
{
    public class CreateCallMeDto
    {
        [Required]
        public string Name { get; set; }

        [Required]
        [Phone]
        public string Phone { get; set; }
    }
}

