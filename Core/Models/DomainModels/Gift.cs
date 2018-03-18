using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Models.DomainModels
{
    public class Gift : BaseEntity
    {
        public Catalog Catalog { get; set; }
        public string CatalogId { get; set; }

        public ICollection<Casket> Caskets { get; set; }
        public ICollection<DecorativeProducts> DecorativeProducts { get; set; }
        public Gift()
        {
            Caskets = new List<Casket>();
            DecorativeProducts = new List<DecorativeProducts>();
        }
    }
}
