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
        private readonly IRepositoryAsync<Product> _catalogRepository;
        private readonly ProductManager _productManager;

        public ProductController(AppDbContext context, IRepositoryAsync<Product> catalogRepository, ProductManager productManager)
        {
            _context = context;
            _catalogRepository = catalogRepository;
            _productManager = productManager;
        }
        [HttpGet("GetProduct/{category}/{subCategory}/q=name={name};maker={maker};price={price}")]
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
            var products = _catalogRepository
                .Table
                .Include(x => x.Description);
            return this.JsonResult(_productManager.Select(products, model));
        }
    }
}
