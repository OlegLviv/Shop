using System;
using System.ComponentModel.DataAnnotations;
using Core.Models.DomainModels;

namespace Core.Models.DTO.Order
{
    public class CallMeDto
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string Phone { get; set; }

        public CallMeStatus CallMeStatus { get; set; } = CallMeStatus.New;

        public long Date { get; set; } = DateTimeOffset.UtcNow.ToUnixTimeSeconds();
    }
}
