using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Models.DomainModels;
using Core.Models.DomainModels.Products;
using DAL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Common.Extensions;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Shop.Controllers.Api
{
    [Produces("application/json")]
    [Route("api/Product")]
    public class ProductController : Controller
    {
        AppDbContext _context;

        public ProductController(AppDbContext context)
        {
            _context = context;
        }
        [HttpGet("GetProduct/{category}/{subCategory}")]
        public IActionResult GetProduct(string category, string subCategory)
        {
            var catalogWithBooks = _context
                 .Catalog
                 .Where(c => c.Book.CategoryName == category);
            var catalogWithGifts = _context
                 .Catalog
                 .Include(c => c.Gift)
                 .Where(c => c.Gift.CategoryName == category);
            var catalogWithStationery = _context
                 .Catalog
                 .Where(c => c.Stationery.CategoryName == category);
            if (catalogWithBooks.Count() > 0)
                return Ok(catalogWithBooks);
            if (catalogWithGifts.Any())
            {
                var result = catalogWithGifts
                    .Include(x => x.Gift.Caskets)
                    .Include(x => x.Gift.DecorativeBoxs);
                if (result.FirstOrDefault().Gift.Caskets.SubCategoryName == subCategory)
                    return this.JsonResult(result
                        .Include(x => x.Gift.Caskets.GiftProducts));
                if (result.FirstOrDefault().Gift.DecorativeBoxs.SubCategoryName == subCategory)
                    return this.JsonResult(result
                        .Include(x => x.Gift.Caskets.GiftProducts));
            }

            if (catalogWithStationery.Count() > 0)
                return Ok(catalogWithStationery);
            return Ok("UPS");
        }
    }
}
