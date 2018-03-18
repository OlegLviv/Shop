using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Models.DomainModels
{
    public class Book : BaseEntity
    {
        public Catalog Catalog { get; set; }
        public string CatalogId { get; set; }
    }
}
