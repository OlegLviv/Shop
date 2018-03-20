using Core.Models.DomainModels.Category;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Models.DomainModels.Category.SubCategoty
{
    public class Dictionary : BaseEntity
    {
        public string SubCategoryName { get; } = "Dictionary";

        public Stationery Stationery { get; set; }
        public string StationeryId { get; set; }
    }
}
