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
using Core.Models.ViewModels.RequestViewModels;
using BLL.Filters.ActionFilters;
using BLL.Managers;
using Microsoft.AspNetCore.Identity;
using System.Dynamic;
using AutoMapper;
using Core.Models.DTO;

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
        private readonly IMapper _mapper;

        public ProductController(AppDbContext context,
            IRepositoryAsync<Product> productsRepository,
            ProductManager productManager,
            UserManager<User> userManager, IMapper mapper)
        {
            _context = context;
            _productsRepository = productsRepository;
            _productManager = productManager;
            _userManager = userManager;
            _mapper = mapper;
        }

        [HttpGet("GetProduct/{productId}")]
        public async Task<IActionResult> GetProduct(string productId)
        {
            if (string.IsNullOrEmpty(productId))
                return BadRequest("Incorrect productId");
            var product = await _productsRepository
                .GetByIdAsync(productId);
            if (product == null)
                NotFound("Product with this id not found");
            return this.JsonResult(product);
        }

        [HttpGet("GetProducts/{category}/{subCategory}")]
        public IActionResult GetProducts(string category, string subCategory)
        {
            var products = _productsRepository
                .Table
                .Where(x => x.Category.Equals(category, StringComparison.InvariantCultureIgnoreCase) &&
                            x.SubCategory.Equals(subCategory, StringComparison.InvariantCultureIgnoreCase));
            return this.JsonResult(products);
        }

        [HttpGet("GetProducts/{category}/{subCategory}/{priceFrom:int}/{priceTo:int}/{query?}")]
        public IActionResult GetProducts(string category, string subCategory, int priceFrom, int priceTo, string query)
        {
            var products = _productsRepository
                .Table
                .Where(x => x.Category.Equals(category, StringComparison.InvariantCultureIgnoreCase) &&
                            x.SubCategory.Equals(subCategory, StringComparison.InvariantCultureIgnoreCase) &&
                            x.Price >= priceFrom && x.Price <= priceTo);
            if (string.IsNullOrEmpty(query))
                return this.JsonResult(products);
            var result = _productManager.SelectProducts(query, products);
            //var mapProduct = _mapper.Map<IEnumerable<ProductDto>>(result);
            return this.JsonResult(result);
        }

        [HttpGet("GetProducts/{productIds}")]
        public IActionResult GetProducts(string[] productIds)
        {
            var products = _productManager
                .Select(_productsRepository.Table,
                    this.ArrayParamsToNormalArray(productIds));
            return this.JsonResult(products);
        }

        #region POST

        // todo maybe it's no need
        [HttpPost("AddProductToShopingCard")]
        public async Task<IActionResult> AddProductToShopingCard([FromBody] UserAddProductToShopingCard model)
        {
            var user = await _userManager.FindByIdAsync(model.UserId) ??
                       await this.GetUserByIdentityAsync(_userManager);
            if (user == null)
                return BadRequest("User don't exist");
            user.ShopingCard = new ShopingCard
            {
                User = user,
                UserId = user.Id,
                ProductId = model.ProductId
            };
            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
                return BadRequest("Can't update user");
            return Ok(user.ShopingCard);
        }

        #endregion
    }
}