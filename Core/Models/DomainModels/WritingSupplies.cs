using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Models.DomainModels
{
    public class WritingSupplies : BaseEntity
    {
        public Stationery Stationery { get; set; }
        public string StationeryId { get; set; }
    }
}
