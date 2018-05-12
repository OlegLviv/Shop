using System.ComponentModel.DataAnnotations;

namespace Core.Models.DTO.Mailing
{
    public class SubscribeMailDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
