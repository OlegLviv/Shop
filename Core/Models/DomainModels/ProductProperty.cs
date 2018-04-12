using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Models.DomainModels
{
    public class ProductProperty : BaseEntity
    {
        public string SubCategory { get; set; }
        public string Properties { get; set; }
    }
}
