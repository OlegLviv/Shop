using Core.Models.DomainModels.Category;
using Core.Models.DomainModels.Products;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Models.DomainModels.Category.SubCategoty
{
    public class DecorativeBox : BaseEntity
    {
        public string SubCategoryName { get; } = "DecorativeBox";

        public Gift Gift { get; set; }
        public string GiftId { get; set; }

        public virtual ICollection<GiftProduct> GiftProducts { get; set; }
        public DecorativeBox()
        {
            GiftProducts = new List<GiftProduct>();
        }
    }
}
