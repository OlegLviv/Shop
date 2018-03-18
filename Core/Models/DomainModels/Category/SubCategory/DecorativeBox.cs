using Core.Models.DomainModels.Category;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Models.DomainModels.Category.SubCategoty
{
    public class DecorativeBox : BaseEntity
    {
        public Gift Gift { get; set; }
        public string GiftId { get; set; }
    }
}
