using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Models.DomainModels
{
    public class Stationery : BaseEntity
    {
        public Catalog Catalog { get; set; }
        public string CatalogId { get; set; }

        public ICollection<SchoolFolder> Categories { get; set; }
        public ICollection<OfficeFolder> OfficeFolders { get; set; }
        public ICollection<CopyBook> CopyBooks { get; set; }
        public ICollection<NoteBook> NoteBooks { get; set; }
        public ICollection<Sticker> Stickers { get; set; }
        public ICollection<Dictionary> Dictionaries { get; set; }
        public ICollection<WritingSupplies> WritingSupplies { get; set; }
        public ICollection<SchoolSupplies> SchoolSupplies { get; set; }
        public ICollection<OfficeSupplies> OfficeSupplies { get; set; }
        public ICollection<ZNO> ZNOs { get; set; }

        public Stationery()
        {
            Categories = new List<SchoolFolder>();
            OfficeFolders = new List<OfficeFolder>();
            CopyBooks = new List<CopyBook>();
            NoteBooks = new List<NoteBook>();
            Stickers = new List<Sticker>();
            Dictionaries = new List<Dictionary>();
            WritingSupplies = new List<WritingSupplies>();
            SchoolSupplies = new List<SchoolSupplies>();
            OfficeSupplies = new List<OfficeSupplies>();
            ZNOs = new List<ZNO>();
        }
    }
}
