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
using Microsoft.AspNetCore.Http.Extensions;
using Core.Interfaces;
using BLL.Managers;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Shop.Controllers.Api
{
    [Produces("application/json")]
    [Route("api/Product")]
    public class ProductController : Controller
    {
        AppDbContext _context;
        private readonly IRepositoryAsync<Catalog> _catalogRepository;
        private readonly CatalogManager _catalogManager;

        public ProductController(AppDbContext context, IRepositoryAsync<Catalog> catalogRepository)
        {
            _context = context;
            _catalogRepository = catalogRepository;
            _catalogManager = new CatalogManager(_catalogRepository);
        }
        [HttpGet("GetProduct/{category}/{subCategory}")]
        public IActionResult GetProduct(string category, string subCategory)
        {
            var isGift = _catalogManager.IsGift(category);
            var isBook = _catalogManager.IsBook(category);
            var isStationary = _catalogManager.IsStationery(category);
            //if (catalogwithgifts.any())
            //{
            //    var result = catalogwithgifts
            //        .include(x => x.gift.caskets)
            //        .include(x => x.gift.decorativeboxs);
            //    if (result.firstordefault().gift.caskets.subcategoryname == subcategory)
            //        return this.jsonresult(result
            //            .include(x => x.gift.caskets.giftproducts));
            //    if (result.firstordefault().gift.decorativeboxs.subcategoryname == subcategory)
            //        return this.jsonresult(result
            //            .include(x => x.gift.caskets.giftproducts));
            //}

            //if (catalogWithStationery.Count() > 0)
            //    return Ok(catalogWithStationery);
            if (isStationary)
            {
                var r = _catalogRepository
                    .Table
                    .Include(x => x.Stationery.SchoolFolder)
                    .Include(x => x.Stationery.OfficeSupplie)
                    .Include(x => x.Stationery.CopyBook)
                    .Include(x => x.Stationery.NoteBook)
                    .Include(x => x.Stationery.Sticker)
                    .Include(x => x.Stationery.Dictionary)
                    .Include(x => x.Stationery.WritingSupplie)
                    .Include(x => x.Stationery.SchoolSupplie)
                    .Include(x => x.Stationery.OfficeSupplie)
                    .Include(x => x.Stationery.ZNO)
                    .Where(x => x.Stationery.SchoolFolder.SubCategoryName == subCategory
                    || x.Stationery.OfficeFolder.SubCategoryName == subCategory
                    || x.Stationery.CopyBook.SubCategoryName == subCategory
                    || x.Stationery.NoteBook.SubCategoryName == subCategory
                    || x.Stationery.Sticker.SubCategoryName == subCategory
                    || x.Stationery.Dictionary.SubCategoryName == subCategory
                    || x.Stationery.WritingSupplie.SubCategoryName == subCategory
                    || x.Stationery.SchoolSupplie.SubCategoryName == subCategory
                    || x.Stationery.OfficeSupplie.SubCategoryName == subCategory
                    || x.Stationery.ZNO.SubCategoryName == subCategory);
            }
            return Ok("UPS");
        }
    }
}
