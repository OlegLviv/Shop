using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Models.DomainModels
{
    public class DecorativeProducts:BaseEntity
    {
        public Gift Gift { get; set; }
        public string GiftId { get; set; }
    }
}
