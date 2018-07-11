using System;
using System.ComponentModel.DataAnnotations;
using Core.Models.DomainModels.Base;

namespace Core.Models.DomainModels
{
    public class CallMe : BaseEntity
    {
        [Required]
        public string Name { get; set; }

        [Required]
        [Phone]
        public string Phone { get; set; }

        public CallMeStatus CallMeStatus { get; set; } = CallMeStatus.New;

        public long Date { get; set; } = DateTimeOffset.UtcNow.ToUnixTimeSeconds();
    }

    public enum CallMeStatus
    {
        New,
        Called
    }
}
