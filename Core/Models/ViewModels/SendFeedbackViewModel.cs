using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

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
