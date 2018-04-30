using System.ComponentModel.DataAnnotations;

namespace Core.Models.DTO.User
{
    public class ChangeEmailDto
    {
        [Required]
        public string EmailToken { get; set; }

        [Required]
        public string NewEmail { get; set; }
    }
}
