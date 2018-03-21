using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Models.DomainModels.Products
{
    public class FolderProduct :BaseEntity, IProduct
    {
        public string OwnerId { get; set; }

        public string Name { get; set; }
        public string Maker { get; set; }
        public double Price { get; set; }
    }
}
