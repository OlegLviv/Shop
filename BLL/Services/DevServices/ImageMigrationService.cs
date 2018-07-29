using System;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Core.Interfaces;
using Core.Models.DomainModels;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace BLL.Services.DevServices
{
    public class ImageMigrationService : IDevService
    {
        private IRepositoryAsync<Product> _repository;
        private IHostingEnvironment _environment;
        private ILogger<ImageMigrationService> _logger;
        private IConfiguration _configuration;
        private HttpClient _httpClient;

        public bool CanExecute => bool.Parse(_configuration["DevServices:MigrateImage"]);

        public async Task ExecuteAsync(IServiceProvider serviceProvider)
        {
            InitVariables(serviceProvider);

            if (!CanExecute)
                return;

            _logger.LogInformation("Starting migration....");

            var mainCounter = 0;

            foreach (var product in ProductsWithImages)
            {
                var images = product.ProductImages;
                var count = 0;
                var basePath = $"{_environment.WebRootPath}/Product Images/{product.Id}";

                if (!Directory.Exists(basePath))
                    Directory.CreateDirectory(basePath);

                foreach (var productImage in images)
                {
                    HttpResponseMessage response;
                    try
                    {
                        response = await _httpClient.GetAsync($"/api/product/GetProductImage/{product.Id}/{count}");
                    }
                    catch (Exception)
                    {
                        try
                        {
                            response = await _httpClient.GetAsync($"/api/product/GetProductImage/{product.Id}/{count}");
                        }
                        catch (Exception) { continue; }
                    }

                    if (response.StatusCode != HttpStatusCode.OK)
                        continue;

                    var resultBuffer = await response.Content.ReadAsByteArrayAsync();
                    var pathToSave = $"{basePath}/{productImage.Id}";

                    using (var stream = new FileStream(pathToSave, FileMode.OpenOrCreate))
                    {
                        await stream.WriteAsync(resultBuffer, 0, resultBuffer.Length);
                        _logger.LogInformation($"Product {product.Id}[{mainCounter}] from {ProductsWithImages.Count()}, product image id: {productImage.Id}");
                    }
                    count++;
                }

                mainCounter++;
            }
            _logger.LogInformation("Success!");
        }

        private IQueryable<Product> ProductsWithImages => _repository.Table.Include(i => i.ProductImages);

        private void InitVariables(IServiceProvider serviceProvider)
        {
            _repository = serviceProvider.GetRequiredService<IRepositoryAsync<Product>>();
            _environment = serviceProvider.GetRequiredService<IHostingEnvironment>();
            _logger = serviceProvider.GetRequiredService<ILogger<ImageMigrationService>>();
            _configuration = serviceProvider.GetRequiredService<IConfiguration>();
            _httpClient = _httpClient = new HttpClient
            {
                BaseAddress = new Uri(_configuration["DevServices:BaseUrl"])
            };
        }
    }
}
