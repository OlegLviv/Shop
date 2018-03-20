using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Models.DomainModels;
using Core.Models.DomainModels.Products;
using DAL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Shop.Controllers.Api
{
    [Route("api/Product")]
    public class ProductController : Controller
    {
        AppDbContext _context;

        public ProductController(AppDbContext context)
        {
            _context = context;
        }
        [HttpGet("GetProduct/{category}")]
        public IActionResult GetProduct(string category)
        {
            var catalogWithBooks = _context
                 .Catalog
                 .Where(c => c.Book.Name == category);
            var catalogWithGifts = _context
                 .Catalog
                 .Where(c => c.Gift.Name == category);
            var catalogWithStationery = _context
                 .Catalog
                 .Where(c => c.Stationery.Name == category);
            if (catalogWithBooks.Count() > 0)
                return Ok(catalogWithBooks);
            if (catalogWithGifts.Count() > 0)
                return Ok(catalogWithGifts);
            if (catalogWithStationery.Count() > 0)
                return Ok(catalogWithStationery);
            return Ok("UPS");
        }
        [HttpGet("set")]
        public IActionResult SetValues()
        {
            Catalog catalog = null;
            _context.Catalog.Add(catalog = new Catalog
            {
                CatalogName = "Goods",
                Gift = new Core.Models.DomainModels.Category.Gift
                {
                    Catalog = catalog,
                    CatalogId = catalog.Id,
                    Caskets = new Core.Models.DomainModels.Category.SubCategoty.Casket
                    {
                        GiftProducts = new List<GiftProduct>
                        {
                            new GiftProduct
                            {
                                Name = "Simple",
                                Maker="simple maker",
                                Price = "100"
                            }
                        }
                    }
                }
            });
            return Ok(_context.SaveChanges());
        }
        [HttpGet("clear")]
        public IActionResult Clear(string id,string name)
        {
            var catalog = new Core.Models.DomainModels.Catalog
            {
                Id = id,
                CatalogName = name
            };
            _context.Entry(catalog).State = EntityState.Deleted;
            return Ok(_context.SaveChanges());
        }
    }
}
