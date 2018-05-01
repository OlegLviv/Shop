using System.ComponentModel.DataAnnotations;

namespace Core.Models.DTO.User
{
    public class SendChangeUserEmailTokenDto
    {
        [Required]
        public string NewEmail { get; set; }
    }
}
