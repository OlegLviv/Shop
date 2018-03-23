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
                            && (productF.Description.Color == product.Description.Color || productF.Description.Color == null && product.Description.Color == "null" || product.Description.Color == "null")
                            && (productF.Description.CopyBookType == product.Description.CopyBookType || productF.Description.CopyBookType == null && product.Description.CopyBookType == null || product.Description.CopyBookType == null)
                            && (productF.Description.FolderType == product.Description.FolderType || productF.Description.FolderType == null && product.Description.FolderType == null || product.Description.FolderType == null)
                            && (productF.Description.PenType == product.Description.PenType || productF.Description.PenType == null && product.Description.PenType == null || product.Description.PenType == null)
                            && (productF.Description.PageSize == product.Description.PageSize || productF.Description.PageSize == null && product.Description.PageSize == null || product.Description.PageSize == null)
                            && ((productF.Description.Price >= product.PriceFrom && productF.Description.Price <= product.PriceTo) || product.Description.Price == 0 || product.Description.Price == 0);
                if (catecoryEq && descEq)
                    yield return productF;
            }
        }
        public IEnumerable<Product> Select(IQueryable<Product> products, IEnumerable<ProductViewModel> productsModel)
        {
            foreach (var product in productsModel)
            {
                foreach (var productF in products)
                {
                    var catecoryEq = productF.Category == product.Category && productF.SubCategory == product.SubCategory;
                    var descEq = 
                                (productF.Description.Maker == product.Description.Maker || productF.Description.Maker == null && product.Description.Maker == "null" || product.Description.Maker == "null")
                                && (productF.Description.Color == product.Description.Color || productF.Description.Color == null && product.Description.Color == "null" || product.Description.Color == "null")
                                && (productF.Description.CopyBookType == product.Description.CopyBookType || productF.Description.CopyBookType == null && product.Description.CopyBookType == null || product.Description.CopyBookType == null)
                                && (productF.Description.FolderType == product.Description.FolderType || productF.Description.FolderType == null && product.Description.FolderType == null || product.Description.FolderType == null)
                                && (productF.Description.PenType == product.Description.PenType || productF.Description.PenType == null && product.Description.PenType == null || product.Description.PenType == null)
                                && (productF.Description.PageSize == product.Description.PageSize || productF.Description.PageSize == null && product.Description.PageSize == null || product.Description.PageSize == null);
                    //&& ((productF.Description.Price >= product.PriceFrom && productF.Description.Price <= product.PriceTo) || product.Description.Price == 0 || product.Description.Price == 0);
                    if (catecoryEq && descEq)
                        yield return productF;
                }
            }
        }
        public List<ProductViewModel> CreatePossibleProductsByParams(string category,
            string subCategory,
            string[] makers,
            string[] colors,
            double? priceF,
            double? priceT,
            string[] folderTypes,
            string[] copyBookTypes,
            string[] penTypes,
            int? pageSize = null)
        {
            var productModels = new List<ProductViewModel>(makers.Length * colors.Length);
            for (int i = 0; i < makers.Length; i++)
            {
                for (int j = 0; j < colors.Length; j++)
                {
                    for (int k = 0; k < folderTypes.Length; k++)
                    {
                        for (int l = 0; l < copyBookTypes.Length; l++)
                        {
                            for (int z = 0; z < penTypes.Length; z++)
                            {
                                productModels.Add(new ProductViewModel
                                {
                                    Category = category,
                                    SubCategory = subCategory,
                                    PriceFrom = priceF,
                                    PriceTo = priceT,
                                    Description = new Description
                                    {
                                        Maker = makers[i],
                                        Color = colors[j],
                                        FolderType = folderTypes[k],
                                        CopyBookType = copyBookTypes[l],
                                        PenType = penTypes[z],
                                        PageSize = pageSize
                                    }
                                });
                            }
                        }
                    }
                }
            }
            return productModels;
        }
    }
}
