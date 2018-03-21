using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Models.DomainModels.Products
{
    public class BookProduct : BaseEntity, IProduct
    {
        public string Name { get; set; }
        public string Maker { get; set; }
        public double Price { get; set; }
    }
}
