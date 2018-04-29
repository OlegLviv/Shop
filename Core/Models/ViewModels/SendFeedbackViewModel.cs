using System.ComponentModel.DataAnnotations;

namespace Core.Models.ViewModels
{
    public class SendFeedbackViewModel
    {
        [Required]
        public string ProductId { get; set; }

        [Required]
        public string UserId { get; set; }

        [Required]
        [MaxLength(255)]
        public string Body { get; set; }
    }
}
