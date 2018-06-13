using System;
using System.ComponentModel.DataAnnotations;
using Core.Models.DomainModels;

namespace Core.Models.DTO.Order
{
    public class CallMeDto
    {
        [Required]
        public string Name { get; set; }

        [Required]
        [Phone]
        public string Phone { get; set; }

        public CallMeStatus CallMeStatus { get; set; } = CallMeStatus.New;

        public long Date { get; set; } = DateTimeOffset.UtcNow.ToUnixTimeSeconds();
    }
}
