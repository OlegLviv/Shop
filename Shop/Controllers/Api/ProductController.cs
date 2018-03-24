using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Models.DomainModels;
using DAL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Common.Extensions;
using Microsoft.AspNetCore.Http.Extensions;
using Core.Interfaces;
using Core.Models.DomainModels.ProductModels;
using Core.Models.ViewModels.RequestViewModels;
using BLL.Filters.ActionFilters;
using BLL.Managers;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Shop.Controllers.Api
{
    [Produces("application/json")]
    [Route("api/Product")]
    [ModelStateFilter]
    public class ProductController : Controller
    {
        AppDbContext _context;
        private readonly IRepositoryAsync<Product> _productsRepository;
        private readonly ProductManager _productManager;
        const string GetProductRoute = @"GetProduct/{category}/{subCategory}/q=makers={makers};colors={colors};priceF={priceF};priceT={priceT};folderTypes={folderTypes};copyBookTypes={copyBookTypes};penTypes={penTypes};pageSizes={pageSizes}";

        public ProductController(AppDbContext context, IRepositoryAsync<Product> productsRepository, ProductManager productManager)
        {
            _context = context;
            _productsRepository = productsRepository;
            _productManager = productManager;
        }
        [HttpGet(GetProductRoute)]
        public IActionResult GetProduct(string category,
            string subCategory,
            string[] makers,
            string[] colors,
            string[] folderTypes,
            string[] copyBookTypes,
            string[] penTypes,
            string[] pageSizes,
            double? priceF = 0,
            double? priceT = 0)
        {
            var possibleProducts = _productManager.CreatePossibleProductsByParams(category,
                subCategory,
                this.ArrayParamsToNormalArray(makers),
                this.ArrayParamsToNormalArray(colors),
                priceF,
                priceT,
                this.ArrayParamsToNormalArray(folderTypes),
                this.ArrayParamsToNormalArray(copyBookTypes),
                this.ArrayParamsToNormalArray(penTypes),
                this.ArrayParamsToNormalArray(pageSizes));
            var products = _productsRepository
                .Table
                .Include(x => x.Description);
            var result = _productManager.Select(products, possibleProducts);
            return this.JsonResult(result);
        }
        [HttpGet("GetProduct/{category}/{subCategory}")]
        public IActionResult GetProduct(string category,string subCategory)
        {
            var products = _productsRepository
                .Table
                .Include(x => x.Description)
                .Where(x => x.Category.Equals(category, StringComparison.InvariantCultureIgnoreCase) && x.SubCategory.Equals(subCategory, StringComparison.InvariantCultureIgnoreCase));
            //var result = _productManager.Select(products, posiibleProduct);
            return this.JsonResult(products);
        }
    }
}
