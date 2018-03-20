using Core.Models.DomainModels.Category.SubCategoty;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Models.DomainModels.Category
{
    public class Stationery : BaseEntity
    {
        public string CategoryName { get; } = "Stationery";

        public Catalog Catalog { get; set; }
        public string CatalogId { get; set; }

        public SchoolFolder SchoolFolder { get; set; }
        public OfficeFolder OfficeFolder { get; set; }
        public CopyBook CopyBook { get; set; }
        public NoteBook NoteBook { get; set; }
        public Sticker Sticker { get; set; }
        public Dictionary Dictionarie { get; set; }
        public WritingSupplies WritingSupplie { get; set; }
        public SchoolSupplies SchoolSupplie { get; set; }
        public OfficeSupplies OfficeSupplie { get; set; }
        public ZNO ZNO { get; set; }
    }
}
