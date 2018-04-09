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
using BLL.Filters.ActionFilters;
using BLL.Managers;
using Microsoft.AspNetCore.Identity;
using System.Dynamic;
using AutoMapper;
using Core.Models.DTO;
using Core.Models.ViewModels;

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

        #region GET

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

        [HttpGet("GetProducts/{category}/{subCategory}/{size:int?}")]
        public IActionResult GetProducts(string category, string subCategory, int size = 16)
        {
            var products = _productsRepository
                .Table
                .Where(x => x.Category.Equals(category, StringComparison.InvariantCultureIgnoreCase) &&
                            x.SubCategory.Equals(subCategory, StringComparison.InvariantCultureIgnoreCase));
            return this.JsonResult(new Paginator<Product>
            {
                Data = products.Take(size),
                PageNumber = 1,
                PageSize = size,
                TotalCount = products.Count()
            });
        }

        [ResponseCache(Duration = 60, Location = ResponseCacheLocation.Client)]
        [HttpGet("GetProducts/{category}/{subCategory}/{priceFrom:int}/{priceTo:int}/{query?}/{pageNumber:int?}/{pageSize:int?}/{sortingType:int?}")]
        public IActionResult GetProducts(string category, string subCategory, int priceFrom, int priceTo, string query = null, int pageNumber = 1, int pageSize = 16, SortingType sortingType = SortingType.NoSort)
        {
            var products = _productsRepository
                .Table
                .Where(x => x.Category.Equals(category, StringComparison.InvariantCultureIgnoreCase) &&
                            x.SubCategory.Equals(subCategory, StringComparison.InvariantCultureIgnoreCase) &&
                            x.Price >= priceFrom && x.Price <= priceTo);
            switch (sortingType)
            {
                case SortingType.MosteExpensive:
                    products = products
                        .OrderBy(x => x.Price)
                        .Reverse();
                    break;
                case SortingType.Cheapest:
                    products = products
                        .OrderBy(x => x.Price);
                    break;
                case SortingType.Name:
                    products = products
                        .OrderBy(x => x.Name);
                    break;
            }

            var paginator = new Paginator<Product>
            {
                PageNumber = pageNumber,
                PageSize = pageSize,
                Data = products.Page(pageNumber, pageSize),
                TotalCount = products.Count()
            };

            if (string.IsNullOrEmpty(query))
                return this.JsonResult(paginator);
            var result = _productManager
                .SelectProducts(query, products)
                .Page(pageNumber, pageSize);
            paginator.Data = result;
            paginator.TotalCount = result.Count();
            //var mapProduct = _mapper.Map<IEnumerable<ProductDto>>(result);

            return this.JsonResult(paginator);
        }

        [HttpGet("GetProductsByIds/{productIds}")]
        public IActionResult GetProductsByIds(string[] productIds)
        {
            var products = _productManager
                .Select(_productsRepository.Table,
                    this.ArrayParamsToNormalArray(productIds));
            return this.JsonResult(products);
        }

        [HttpGet("GetProducts/{name}")]
        public IActionResult GetProducts(string name)
        {
            if (string.IsNullOrEmpty(name))
                return BadRequest("Incorrect name");
            var products = _productsRepository
                .Table
                .Where(x => x.Name.ToLower().Contains(name.ToLower()));
            return this.JsonResult(products);
        }

        [HttpGet("GetProductFeedback/{productId}")]
        public async Task<IActionResult> GetProductFeedback(string productId)
        {
            if (string.IsNullOrEmpty(productId))
                return BadRequest("Incorrent id");
            var product = _productsRepository
                .Table
                .Include(x => x.Feedbacks)
                .FirstOrDefault(x => x.Id == productId);

            if (product == null)
                return BadRequest("Product don't exist");

            var productFeedbacks = product.Feedbacks;
            var feedbacks = new List<FeedbackDto>(productFeedbacks.Count);
            foreach (var productFeedback in productFeedbacks)
            {
                var user = await _userManager.FindByIdAsync(productFeedback.UserId);
                if (user == null)
                    return BadRequest("Incorrent user id");
                feedbacks.Add(new FeedbackDto
                {
                    UserName = user.Name,
                    UserLastName = user.LastName,
                    UserId = user.Id,
                    Body = productFeedback.Body,
                    Date = ((DateTimeOffset)productFeedback.Date).ToUnixTimeSeconds()
                });
            }
            return this.JsonResult(feedbacks.OrderBy(x => x.Date));
        }

        [HttpGet("GetProductProperties/{subCategory}")]
        public async Task<IActionResult> GetProductProperties(string subCategory)
        {
            var properties = await _context
                .ProductProperties
                .FirstOrDefaultAsync(x => x.SubCategory.Equals(subCategory, StringComparison.OrdinalIgnoreCase));

            if (properties == null)
                return BadRequest("Icorrect sub category or properties not found");

            var propsArr = properties.Properties.Split(';');

            var posibleProductProperties = new List<dynamic>(propsArr.Length);

            foreach (var prop in propsArr)
            {
                if (string.IsNullOrEmpty(prop))
                {
                    continue;
                }
                posibleProductProperties.Add(new
                {
                    PropValue = prop,
                    PossiblePropsValues = (await _context
                    .PossibleProductProperties
                    .FirstOrDefaultAsync(x => x.SubCategory == subCategory && x.PropertyName.Equals(prop, StringComparison.OrdinalIgnoreCase)))
                    .Values
                    .Split(';')

                });
            }
            return this.JsonResult(posibleProductProperties);
        }

        #endregion

        #region POST

        [HttpPost("AddProduct")]
        public async Task<IActionResult> AddProduct([FromForm] AddProductViewModel model)
        {
            var product = new Product
            {
                Category = model.Category,
                SubCategory = model.SubCategory,
                Name = model.Name,
                Price = model.Price,
                Description = model.Description,
                Query = model.Query
            };

            var productImages = new List<ProductImage>();

            foreach (var im in model.Images)
            {
                if (im.Length > 3000000)
                    return BadRequest("Еhe image can't be larger than 3MB");

                using (var stream = im.OpenReadStream())
                {
                    var imgBuff = new byte[(int)stream.Length];
                    await stream.ReadAsync(imgBuff, 0, (int)stream.Length);
                    productImages.Add(new ProductImage
                    {
                        Product = product,
                        ProductId = product.Id,
                        Image = imgBuff
                    });
                }
            }

            if (productImages.Count != 0)
                product.ProductImages = productImages;

            var insertRes = await _productsRepository.InsertAsync(product);
            return Ok(insertRes);
        }

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

        #region PUT

        [HttpPut("SendFeedback")]
        public async Task<IActionResult> SendFeeback([FromBody] SendFeedbackViewModel model)
        {
            var product = await _productsRepository
                .GetByIdAsync(model.ProductId);
            if (product == null)
                return BadRequest("Product don't exist");
            var user = await _userManager.FindByIdAsync(model.UserId);
            if (user == null)
                return BadRequest("User with this id don't exist");
            var feedback = new Feedback
            {
                Product = product,
                ProductId = product.Id,
                Body = model.Body,
                Date = DateTime.Now,
                UserId = model.UserId
            };
            if (product.Feedbacks == null)
                product.Feedbacks = new List<Feedback>
                {
                    feedback
                };
            product
                .Feedbacks
                .Add(feedback);
            var updateResult = await _productsRepository
                .UpdateAsync(product);
            if (updateResult <= 0)
                throw new Exception("Can't update product");
            return this.JsonResult(new FeedbackDto
            {
                UserName = user.Name,
                UserLastName = user.LastName,
                UserId = user.Id,
                Date = ((DateTimeOffset)feedback.Date).ToUnixTimeSeconds(),
                Body = feedback.Body
            });
        }

        #endregion
    }
}