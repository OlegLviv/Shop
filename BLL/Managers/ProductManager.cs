using Core.Models.DomainModels.ProductModels;
using Core.Models.ViewModels.RequestViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BLL.Managers
{
    public class ProductManager
    {
        public IEnumerable<Product> Select(IQueryable<Product> products, ProductViewModel product)
        {
            foreach (var productF in products)
            {
                var catecoryEq = productF.Category == product.Category && productF.SubCategory == product.SubCategory;
                var descEq = (productF.Description.Name == product.Category || productF.Description.Name == null && product.Description.Name == "null" || product.Description.Name == "null")
                            && (productF.Description.Maker == product.Description.Maker || productF.Description.Maker == null && product.Description.Maker == "null" || product.Description.Maker == "null")
                            && (productF.Description.Price == product.Description.Price || product.Description.Price == 0 || product.Description.Price == null);
                if (catecoryEq && descEq)
                    yield return productF;
            }
        }
    }
}
