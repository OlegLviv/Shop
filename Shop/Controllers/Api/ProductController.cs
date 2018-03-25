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
using Microsoft.AspNetCore.Identity;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Shop.Controllers.Api
{
    [Produces("application/json")]
    [Route("api/Product")]
    [ModelStateFilter]
    public class ProductController : Controller
    {
        private readonly AppDbContext _context;
        private readonly IRepositoryAsync<Product> _productsRepository;
        private readonly ProductManager _productManager;
        private readonly UserManager<User> _userManager;

        private const string GetProductRoute = @"GetProduct/{category}/{subCategory}/q=makers={makers};colors={colors};priceF={priceF};priceT={priceT};folderTypes={folderTypes};copyBookTypes={copyBookTypes};penTypes={penTypes};pageSizes={pageSizes}";

        public ProductController(AppDbContext context, IRepositoryAsync<Product> productsRepository, ProductManager productManager, UserManager<User> userManager)
        {
            _context = context;
            _productsRepository = productsRepository;
            _productManager = productManager;
            _userManager = userManager;
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
        public IActionResult GetProduct(string category, string subCategory)
        {
            var products = _productsRepository
                .Table
                .Include(x => x.Description)
                .Where(x => x.Category.Equals(category, StringComparison.InvariantCultureIgnoreCase) && x.SubCategory.Equals(subCategory, StringComparison.InvariantCultureIgnoreCase));
            return this.JsonResult(products);
        }

        public async Task<IActionResult> AddProductToShopingCard([FromBody] UserAddProductToShopingCard model)
        {
            var user = await _userManager.FindByIdAsync(model.UserId) ?? await this.GetUserByIdentityAsync(_userManager);
            if (user == null)
                return BadRequest("User don't exist");
            user.ShopingCard = new ShopingCard
            {
                User = user,
                UserId = user.Id,
                ProductId = model.ProductId
            };
            var result = await _userManager.UpdateAsync(user);
            return Ok(user.ShopingCard);
        }
    }
}
