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
        public IEnumerable<Product> Select(IQueryable<Product> products, IEnumerable<ProductViewModel> productsModel)
        {
            foreach(var product in productsModel)
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
        public List<ProductViewModel> CreatePossibleProductsByParams(string category, string subCategory, string name, string[] makers, string[] colors, double price)
        {
            var productModels = new List<ProductViewModel>(makers.Length * colors.Length);
            for (int i = 0; i < makers.Length; i++)
            {
                for (int j = 0; j < colors.Length; j++)
                {
                    productModels.Add(new ProductViewModel
                    {
                        Category = category,
                        SubCategory = subCategory,
                        Description = new Description
                        {
                            Maker = makers[i],
                            Name = name,
                            Price = price,
                            Color = colors[j]
                        }
                    });
                }
            }
            return productModels;
        }
    }
}
