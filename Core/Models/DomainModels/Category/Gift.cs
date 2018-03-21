using Core.Models.DomainModels.Category.SubCategoty;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Models.DomainModels.Category
{
    public class Gift : BaseEntity
    {
        public string CategoryName { get; } = "Gift";

        public Catalog Catalog { get; set; }
        public string CatalogId { get; set; }

        public Casket Caskets { get; set; }
        public DecorativeBox DecorativeBoxs { get; set; }
    }
}
