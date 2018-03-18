using Core.Models.DomainModels.Category.SubCategory;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Models.DomainModels.Category
{
    public class Book : BaseEntity
    {
        public Catalog Catalog { get; set; }
        public string CatalogId { get; set; }

        public ICollection<Encyclopedia> Encyclopedias { get; set; }

        public Book()
        {
            Encyclopedias = new List<Encyclopedia>();
        }
    }
}
