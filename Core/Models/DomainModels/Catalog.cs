using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Models.DomainModels
{
    public class Catalog : BaseEntity
    {
        public ICollection<Stationery> Stationeries { get; set; }
        public ICollection<Gift> Gifts { get; set; }
        public ICollection<Book> Books { get; set; }

        public Catalog()
        {
            Stationeries = new List<Stationery>();
            Gifts = new List<Gift>();
            Books = new List<Book>();
        }
    }
}
