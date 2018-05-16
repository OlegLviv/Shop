using System.ComponentModel.DataAnnotations;

namespace Core.Models.DTO.User
{
    public class ChangePhoneDto
    {
        [Required]
        [Phone]
        public string Phone { get; set; }
    }
}
