using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Models.DomainModels.Products
{
    public interface IProduct
    {
        string Name { get; set; }
        string Maker { get; set; }
        double Price { get; set; }
    }
}
