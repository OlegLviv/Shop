using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Models.DomainModels.ProductModels
{
    public interface IProduct
    {
        string Category { get; set; }
        string SubCategory { get; set; }
        Description Description { get; set; }
    }
}
