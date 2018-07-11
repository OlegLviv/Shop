using System;
using System.ComponentModel.DataAnnotations;
using Core.Models.DomainModels.Base;

namespace Core.Models.DomainModels
{
    public class SubFeedback : BaseEntity
    {
        [Required]
        public string UserId { get; set; }

        [Required]
        public Feedback Feedback { get; set; }

        [Required]
        public string FeedbackId { get; set; }

        [Required]
        [MaxLength(255)]
        public string Body { get; set; }

        public long Date { get; set; } = DateTimeOffset.UtcNow.ToUnixTimeSeconds();
    }
}
