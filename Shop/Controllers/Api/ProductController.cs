using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Core.Models.DomainModels;
using DAL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Common.Extensions;
using Core.Interfaces;
using BLL.Filters.ActionFilters;
using Microsoft.AspNetCore.Identity;
using AutoMapper;
using BLL.Services;
using Core.Models.DTO;
using Core.Models.DTO.Product;
using Core.Models.DTO.User;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Shop.Controllers.Api
{
    [Produces("application/json")]
    [Route("api/Product")]
    [ModelStateFilter]
    // ReSharper disable once HollowTypeName
    public class ProductController : Controller
    {
        private readonly AppDbContext _context;
        private readonly IRepositoryAsync<Product> _productsRepository;
        private readonly IRepositoryAsync<ProductImage> _imageRepository;
        private readonly IRepositoryAsync<Feedback> _feedbackRepository;
        private readonly ProductService _productService;
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;

        // ReSharper disable once TooManyDependencies
        public ProductController(AppDbContext context,
            IRepositoryAsync<Product> productsRepository,
            ProductService productService,
            UserManager<User> userManager, IMapper mapper,
            IRepositoryAsync<ProductImage> imageRepository,
            IRepositoryAsync<Feedback> feedbackRepository)
        {
            _context = context;
            _productsRepository = productsRepository;
            _productService = productService;
            _userManager = userManager;
            _mapper = mapper;
            _imageRepository = imageRepository;
            _feedbackRepository = feedbackRepository;
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
                return NotFound("Product with this id not found");

            product.Review += 1;
            await _productsRepository.UpdateAsync(product);

            return this.JsonResult(_mapper.Map<ProductDto>(product));
        }

        [ResponseCache(Duration = 60, Location = ResponseCacheLocation.Any)]
        [HttpGet("GetMostPopularProducts/{count:int?}")]
        public IActionResult GetMostPopularProducts(int count = 16)
        {
            var products = _productsRepository
                .Table
                .Include(x => x.ProductImages)
                .OrderBy(x => x.Review)
                .Skip(_productsRepository.Table.Count() - count)
                .AsEnumerable()
                .Reverse();

            return this.JsonResult(_mapper.Map<IEnumerable<ProductDto>>(products));
        }

        [HttpGet("GetWithDiscount/{pageNumber:int?}/{pageSize:int?}")]
        public IActionResult GetWithDiscount(int pageNumber = 1, int pageSize = 16)
        {
            var products = _productsRepository
                .Table
                .Where(x => x.Discount > 0);

            return this.JsonResult(new Paginator<ProductDto>
            {
                Data = _mapper.Map<IEnumerable<ProductDto>>(products.Page(pageNumber, pageSize)),
                TotalCount = products.Count(),
                PageSize = pageSize,
                PageNumber = pageNumber
            });
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

        [ResponseCache(Duration = 60, Location = ResponseCacheLocation.Any)]
        [HttpGet("GetProducts/{category}/{subCategory}/{priceFrom:int}/{priceTo:int}/{query?}/{pageNumber:int?}/{pageSize:int?}/{sortingType:int?}")]
        public IActionResult GetProducts(string category, string subCategory, int priceFrom, int priceTo, string query = null, int pageNumber = 1, int pageSize = 16, SortingType sortingType = SortingType.NoSort)
        {
            var products = _productsRepository
                .Table
                .Where(x => x.Category.Equals(category, StringComparison.InvariantCultureIgnoreCase) &&
                            x.SubCategory.Equals(subCategory, StringComparison.InvariantCultureIgnoreCase) &&
                            x.Price >= priceFrom && x.Price <= priceTo);
            var paginator = new Paginator<Product>
            {
                PageNumber = pageNumber,
                PageSize = pageSize
            };

            switch (sortingType)
            {
                //  todo need remove this cast in future. Now throw exception becouse IQueryble.Reverse() is not implemented
                case SortingType.MosteExpensive:
                    products = products
                        .OrderBy(x => x.Price)
                        .AsEnumerable()
                        .Reverse()
                        .AsQueryable();
                    break;
                case SortingType.Cheapest:
                    products = products
                        .OrderBy(x => x.Price);
                    break;
            }


            if (string.IsNullOrEmpty(query))
            {
                paginator.Data = products.Page(pageNumber, pageSize);
                paginator.TotalCount = products.Count();

                return this.JsonResult(paginator);
            }

            var selectProducts = _productService
                .SelectProducts(query, products)
                .ToList();

            paginator.Data = selectProducts.Page(pageNumber, pageSize);
            paginator.TotalCount = selectProducts.Count();
            //var mapProduct = _mapper.Map<IEnumerable<ProductDto>>(result);

            return this.JsonResult(paginator);
        }

        [HttpGet("GetProductsByIds/{productIds}")]
        public IActionResult GetProductsByIds(string[] productIds)
        {
            var products = _productService
                .Select(_productsRepository.Table.Include(x => x.ProductImages),
                    this.ArrayParamsToNormalArray(productIds));

            return this.JsonResult(_mapper.Map<IEnumerable<ProductDto>>(products));
        }

        [HttpGet("GetProducts/{name}/{pageNumber:int?}/{pageSize:int?}")]
        public IActionResult GetProducts(string name, int pageNumber = 1, int pageSize = 16)
        {
            if (string.IsNullOrEmpty(name))
                return BadRequest("Incorrect name");

            var products = _productsRepository
                .Table
                .Where(x => x.Name.ToLower().Contains(name.ToLower()));
            var paginator = new Paginator<Product>
            {
                PageNumber = pageNumber,
                PageSize = pageSize,
                Data = products.Page(pageNumber, pageSize),
                TotalCount = products.Count()
            };

            return this.JsonResult(paginator);
        }

        [HttpGet("GetProductFeedback/{productId}")]
        public async Task<IActionResult> GetProductFeedback(string productId)
        {
            if (string.IsNullOrEmpty(productId))
                return BadRequest("Incorrent id");

            var productFeedbacks = _feedbackRepository
                .Table
                .Include(f => f.SubFeedbacks)
                .Where(f => f.ProductId == productId);

            var feedbacks = new List<FeedbackDto>(productFeedbacks.Count());

            foreach (var productFeedback in productFeedbacks)
            {
                var user = await _userManager.FindByIdAsync(productFeedback.UserId);
                var subFeedbacksDto = new List<SubFeedbackDto>(productFeedback.SubFeedbacks.Count);

                foreach (var sf in productFeedback.SubFeedbacks)
                {
                    var userSf = await _userManager.FindByIdAsync(sf.UserId);

                    subFeedbacksDto.Add(new SubFeedbackDto
                    {
                        Body = sf.Body,
                        Id = sf.Id,
                        Date = sf.Date,
                        UserId = userSf.Id,
                        UserName = userSf.Name,
                        UserLastName = userSf.LastName
                    });
                }

                if (user == null)
                    return BadRequest("Incorrent user id");

                feedbacks.Add(new FeedbackDto
                {
                    Id = productFeedback.Id,
                    UserName = user.Name,
                    UserLastName = user.LastName,
                    SubFeedbacks = subFeedbacksDto,
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

        [ResponseCache(Duration = 60, Location = ResponseCacheLocation.Any)]
        [HttpGet("GetProductImage/{productId}/{number:int}")]
        public async Task<IActionResult> GetProductImage(string productId, int number)
        {
            var product = await _productsRepository
                .Table
                .Include(i => i.ProductImages)
                .FirstOrDefaultAsync(x => x.Id == productId);

            if (product == null)
                return BadRequest("Product don't exist. Or Incorrect product id");

            var hostingEnvironment = Request
                .HttpContext
                .RequestServices
                .GetService<IHostingEnvironment>();
            var filesPath = Directory.GetFiles($"{hostingEnvironment.WebRootPath}/Product Images/{productId}");

            if (filesPath.Length == 0)
                return NotFound();

            return File(await System.IO.File.ReadAllBytesAsync(filesPath[number]), product.ProductImages[number].ContentType);
        }

        [HttpGet("GetProductImageCount/{productId}")]
        public async Task<IActionResult> GetProductImageCount(string productId)
        {
            var product = await _productsRepository
                .Table
                .Include(x => x.ProductImages)
                .FirstOrDefaultAsync(x => x.Id == productId);

            if (product == null)
                return BadRequest("Product don't exist. Or Incorrect product id");

            return Ok(product
                .ProductImages
                .Count);
        }

        #endregion

        #region POST

        [HttpPost("AddProduct")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
        public async Task<IActionResult> AddProduct([FromForm] AddProductDto model)
        {
            var product = _mapper.Map<Product>(model);
            var productImages = new List<ProductImage>();
            var hostingEnvironment = Request
                .HttpContext
                .RequestServices
                .GetService<IHostingEnvironment>();

            product.PriceWithDiscount = _productService.CalculatePriceDiscount(product.Price, product.Discount);

            if (model.Images != null)
            {
                foreach (var im in model.Images)
                {
                    if (im.Length > 3000000)
                        return BadRequest("The image can't be larger than 3MB");

                    var mainPath = $"{hostingEnvironment.WebRootPath}/Product Images/{product.Id}";
                    var productImage = new ProductImage
                    {
                        Product = product,
                        ProductId = product.Id,
                        ContentType = im.ContentType
                    };
                    var fullPath = $"{mainPath}/{productImage.Id}";

                    if (!Directory.Exists(mainPath))
                        Directory.CreateDirectory(mainPath);

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        await im.CopyToAsync(stream);
                        productImage.Path = fullPath;
                        productImages.Add(productImage);
                    }
                }
            }

            product.ProductImages = productImages;

            var insertRes = await _productsRepository.InsertAsync(product);

            return Ok(insertRes);
        }

        // todo maybe it's no need
        [HttpPost("AddProductToShopingCard")]
        public async Task<IActionResult> AddProductToShopingCard([FromBody] AddProductToShopingCardUserDto model)
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

        [HttpPost("SendFeedback")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> SendFeeback([FromBody] SendProductFeedbackDto model)
        {
            var product = await _productsRepository
                .GetByIdAsync(model.ProductId);

            if (product == null)
                return BadRequest("Product don't exist");

            var user = await this.GetUserByIdentityAsync(_userManager);

            if (user == null)
                return BadRequest("User with this id don't exist");

            var feedback = _mapper.Map<Feedback>(model);
            feedback.Product = product;

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

            var feedbackDto = _mapper.Map<FeedbackDto>(feedback);
            feedbackDto.UserName = user.Name;
            feedbackDto.UserLastName = user.LastName;

            return this.JsonResult(feedbackDto);
        }

        [HttpPost("SendSubFeedback")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> SendSubFeedback([FromBody] SendProductSubFeedbackDto model)
        {
            var feedback = await _feedbackRepository
                .Table
                .Include(x => x.SubFeedbacks)
                .FirstOrDefaultAsync(x => x.Id == model.FeedbackId);

            if (feedback == null)
                return BadRequest("Incorrect feedback id or feedback don't found");

            var user = await this.GetUserByIdentityAsync(_userManager);

            if (user == null)
                return Unauthorized();

            var subFeedback = new SubFeedback
            {
                Feedback = feedback,
                Body = model.Body,
                FeedbackId = feedback.Id,
                UserId = user.Id
            };

            if (feedback.SubFeedbacks.Count > 0)
                feedback.SubFeedbacks.Add(subFeedback);
            else
                feedback.SubFeedbacks = new List<SubFeedback> { subFeedback };
            var updateResult = await _feedbackRepository.UpdateAsync(feedback);

            if (updateResult <= 0)
                throw new Exception("Can't update product");

            var subFeedbackDto = _mapper.Map<SubFeedbackDto>(subFeedback);
            subFeedbackDto.UserName = user.Name;
            subFeedbackDto.UserLastName = user.LastName;

            return this.JsonResult(subFeedbackDto);
        }

        [HttpPost("AddProperty")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
        public async Task<IActionResult> AddProperty([FromBody] AddPropertyToProductDto model)
        {
            var addPropertyRes = await _productService.AddNewPropertyAsync(model.SubCategory, model.PropName);

            if (!addPropertyRes)
                return BadRequest("Can't add new property");

            var addPossiblePropsRes =
                await _productService.AddNewPossiblePropertiesAsync(model.SubCategory, model.PropName,
                    model.PropValues);

            if (!addPossiblePropsRes)
                return BadRequest("Cant add possible property");

            return Ok("Success");
        }

        [HttpPost("AddPossibleProperty")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
        public async Task<IActionResult> AddPossibleProperty([FromBody] AddPossiblePropertyToProductDto model)
        {
            var addPossiblePropRes = await _productService
                .AddNewPossiblePropertiesAsync(model.SubCategory,
                    model.PropName,
                    new List<string> { model.PossibleProperty });

            if (!addPossiblePropRes)
                return BadRequest("Can't add possible property");

            return Ok("Success");
        }

        #endregion

        #region PUT

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
        [HttpPut("EditProduct")]
        public async Task<IActionResult> EditProduct([FromForm] EditProductDto model)
        {
            var product = await _productsRepository.GetByIdAsync(model.ProductId);
            var hostingEnvironment = Request
                .HttpContext
                .RequestServices
                .GetService<IHostingEnvironment>();

            if (product == null)
                return BadRequest("Product not found or incorrent product id");

            product.Price = model.Price;
            product.Name = model.Name;
            product.Discount = model.Discount;
            product.Description = model.Description;
            product.PriceWithDiscount = _productService.CalculatePriceDiscount(product.Price, product.Discount);
            product.IsAvailable = model.IsAvailable;

            if (!model.Images?.Any() ?? model.Images != null)
            {
                var filesPath = Directory.GetFiles($"{hostingEnvironment.WebRootPath}/Product Images/{product.Id}");

                for (var i = 0; i < model.Images.Length; i++)
                {
                    if (model.Images[i].Length == 0 || model.Images[i].FileName == "not file")
                        continue;

                    using (var stream = new FileStream(filesPath[i], FileMode.OpenOrCreate))
                    {
                        await model.Images[i].CopyToAsync(stream);
                    }
                }
            }


            return this.JsonResult(new
            {
                product,
                Result = await _productsRepository.UpdateAsync(product)
            });
        }

        #endregion

        #region DELETE

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
        [HttpDelete("DeleteProduct/{productId}")]
        public async Task<IActionResult> DeleteProduct(string productId)
        {
            var product = await _productsRepository
                .Table
                .Include(x => x.ProductImages)
                .FirstOrDefaultAsync(x => x.Id == productId);
            var hostingEnvironment = Request
                .HttpContext
                .RequestServices
                .GetService<IHostingEnvironment>();

            if (product == null)
                return BadRequest("Product not found or incorrent product id");

            if (product.ProductImages.Any())
                await _imageRepository.DeleteAsync(product.ProductImages);

            Directory.Delete($"{hostingEnvironment.WebRootPath}/Product Images/{product.Id}", true);

            return Ok(await _productsRepository.DeleteAsync(product));
        }
        //  TODO Need delete from folder
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
        [HttpDelete("DeleteProductImage/{productId}/{number:int}")]
        public async Task<IActionResult> DeleteProductImage(string productId, int number)
        {
            var product = await _productsRepository
                .Table
                .Include(x => x.ProductImages)
                .FirstOrDefaultAsync(x => x.Id == productId);

            if (product == null)
                return BadRequest("Incorrect product id or product not found");

            var images = product.ProductImages;

            if (!images.Any())
                return BadRequest("This product have't images");

            ProductImage image;
            try
            {
                image = images[number];
            }
            catch (IndexOutOfRangeException)
            {
                return BadRequest("Image don't exist");
            }

            return Ok(await _imageRepository.DeleteAsync(image));
        }

        [HttpDelete("DeleteProperty/{subCategory}/{propName}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
        public async Task<IActionResult> DeleteProperty(string subCategory, string propName)
        {
            if (!await _productService.DeletePropertyAsync(subCategory, propName))
                return BadRequest("Can't delete property");

            return Ok("Success");
        }
        #endregion
    }
}