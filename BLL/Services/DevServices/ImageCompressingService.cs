using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Core.Interfaces;
using Core.Models.DomainModels;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace BLL.Services.DevServices
{
    internal class ImageCompressingService : IDevService
    {
        private IRepositoryAsync<Product> _repository;
        private IHostingEnvironment _environment;
        private IConfiguration _configuration;

        public async Task ExecuteAsync(IServiceProvider serviceProvider)
        {
            await Task.Run(() => Execute(serviceProvider));
        }

        public bool CanExecute => bool.Parse(_configuration["DevServices:CompressImages"]);

        private void Execute(IServiceProvider serviceProvider)
        {
            IniVariables(serviceProvider);

            if (!CanExecute)
                return;

            var products = _repository.Table.Include(p => p.ProductImages);

            foreach (var product in products)
            {
                var filesPath = Directory.GetFiles($"{_environment.WebRootPath}/Product Images/{product.Id}");

                foreach (var path in filesPath)
                {
                    try
                    {
                        var imageStream = new FileStream(path, FileMode.Open);
                        var fImage = new ImageMagick.MagickImageCollection(imageStream).First();

                        if (imageStream.Length > 1000000L && imageStream.Length < 1500000L)
                        {
                            fImage.Quality = 80;
                            imageStream.Close();
                            fImage.Write(path);
                        }

                        if (imageStream.Length > 1500000L && imageStream.Length < 2000000L)
                        {
                            fImage.Quality = 70;
                            imageStream.Close();
                            fImage.Write(path);
                        }

                        if (imageStream.Length > 2000000L)
                        {
                            fImage.Quality = 60;
                            imageStream.Close();
                            fImage.Write(path);
                        }

                        imageStream.Close();
                    }
                    catch
                    {
                        // ignored
                    }
                }
            }
        }

        private void IniVariables(IServiceProvider serviceProvider)
        {
            _repository = serviceProvider.GetRequiredService<IRepositoryAsync<Product>>();
            _configuration = serviceProvider.GetRequiredService<IConfiguration>();
            _environment = serviceProvider.GetRequiredService<IHostingEnvironment>();
        }
    }
}
