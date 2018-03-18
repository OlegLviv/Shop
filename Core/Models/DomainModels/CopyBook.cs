using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Models.DomainModels
{
    public class CopyBook: BaseEntity
    {
        public Stationery Stationery { get; set; }
        public string StationeryId { get; set; }
    }
}
