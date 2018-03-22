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

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Shop.Controllers.Api
{
    [Produces("application/json")]
    [Route("api/Product")]
    [ModelStateFilter]
    public class ProductController : Controller
    {
        AppDbContext _context;
        private readonly IRepositoryAsync<Product> _catalogRepository;

        public ProductController(AppDbContext context, IRepositoryAsync<Product> catalogRepository)
        {
            _context = context;
            _catalogRepository = catalogRepository;
        }
        [HttpGet("GetProduct/{category}/{subCategory}/q=name={name};maker={maker};price={price}")]
        //[HttpGet("GetProduct")]
        public IActionResult GetProduct(string category, string subCategory, string name = null, string maker = null, double? price = 0)
        {
            var model = new ProductViewModel
            {
                Category = category,
                SubCategory = subCategory,
            };
            var description = new Description
            {
                Maker = maker,
                Name = name,
                Price = price
            };
            model.Description = description;
            var result = _catalogRepository
                .Table
                .Include(x => x.Description);
            var returnValue = Select(result, model);
            return this.JsonResult(returnValue.ToArray());
        }
        private IEnumerable<Product> Select(IQueryable<Product> products, ProductViewModel product)
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
