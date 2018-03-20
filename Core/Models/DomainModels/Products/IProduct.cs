using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Models.DomainModels.Products
{
    public interface IProduct
    {
        string Name { get; set; }
        string Maker { get; set; }
        string Price { get; set; }
    }
}
