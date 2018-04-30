using System;
using System.ComponentModel.DataAnnotations;
using Core.Models.DomainModels.Base;

namespace Core.Models.DomainModels
{
    public class Feedback : BaseEntity
    {
        [Required]
        public string UserId { get; set; }

        [Required]
        public string ProductId { get; set; }

        public Product Product { get; set; }

        [Required]
        [MaxLength(255)]
        public string Body { get; set; }

        public DateTime Date { get; set; } = DateTime.Now;
    }
}
