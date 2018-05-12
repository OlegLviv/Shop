using System.ComponentModel.DataAnnotations;

namespace Core.Models.DTO.Mailing
{
    public class SendMailDto
    {
        [Required]
        [MinLength(4)]
        [MaxLength(16)]
        public string Subject { get; set; }

        [Required]
        [MinLength(16)]
        [MaxLength(512)]
        public string Body { get; set; }

        [Required]
        public bool IsForOnlyRegisterUsers { get; set; }
    }
}
