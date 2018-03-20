using Core.Models.DomainModels.Category;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Models.DomainModels
{
    public class Catalog : BaseEntity
    {
        public string CatalogName { get; set; }
        public Stationery Stationery { get; set; }
        public Gift Gift { get; set; }
        public Book Book { get; set; }
    }
}
