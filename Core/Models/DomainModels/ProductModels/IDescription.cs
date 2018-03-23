using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Models.DomainModels.ProductModels
{
    public interface IDescription
    {
        string Name { get; set; }
        string Maker { get; set; }
        double? Price { get; set; }
        string Color { get; set; }
    }
}
