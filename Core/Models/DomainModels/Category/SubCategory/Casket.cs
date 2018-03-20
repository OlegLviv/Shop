using Core.Models.DomainModels.Products;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Models.DomainModels.Category.SubCategoty
{
    public class Casket : BaseEntity
    {
        public Gift Gift { get; set; }
        public string GiftId { get; set; }

        public virtual ICollection<GiftProduct> GiftProducts { get; set; }
        public Casket()
        {
            GiftProducts = new List<GiftProduct>();
        }
    }
}
