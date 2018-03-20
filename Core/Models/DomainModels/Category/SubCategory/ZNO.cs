using Core.Models.DomainModels.Category;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Models.DomainModels
{
    public class ZNO : BaseEntity
    {
        public string SubCategoryName { get; } = "ZNO";

        public Stationery Stationery { get; set; }
        public string StationeryId { get; set; }
    }
}
