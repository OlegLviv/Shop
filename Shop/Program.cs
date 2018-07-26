using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Core.Models.DomainModels;
using DAL;
using DAL.Initializator;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace Shop
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = BuildWebHost(args);
            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                var logger = services.GetRequiredService<ILogger<Program>>();
                try
                {
                    var context = services.GetRequiredService<AppDbContext>();
                    var userManager = services.GetRequiredService<UserManager<User>>();
                    var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();
                    var configuration = services.GetRequiredService<IConfiguration>();
                    var appEnvironment = services.GetService<IHostingEnvironment>();

                    var dbInitializerLogger = services.GetRequiredService<ILogger<UsersDbInitializer>>();
                    UsersDbInitializer.InitializeAsync(context, userManager, roleManager, dbInitializerLogger, configuration).Wait();
                    ProductDbInitializaer.Initialize(context).Wait();
                    PropsInitializator.InitializeAsync(context).Wait();
                    //Migrate(context, appEnvironment,logger).Wait();
                    FixedImageSize(context, appEnvironment);
                }
                catch (Exception ex)
                {
                    logger.LogError(ex, "An error occurred while seeding the database.");
                }
            }
            host.Run();
        }

        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .Build();

        //private static async Task Migrate(AppDbContext context, IHostingEnvironment environment,ILogger logger)
        //{
        //    var products = context.Products.Include(i => i.ProductImages);
        //    var path = $"{environment.WebRootPath}/Product Images";

        //    if (!Directory.Exists(path))
        //        Directory.CreateDirectory(path);

        //    foreach (var product in products)
        //    {
        //        var productPath = $"{path}/{product.Id}";
        //        if (!Directory.Exists(productPath))
        //            Directory.CreateDirectory(productPath);

        //        foreach (var image in product.ProductImages)
        //        {
        //            using (var fileStream = new FileStream($"{productPath}/{image.Id}", FileMode.Create))
        //            {
        //                await fileStream.WriteAsync(image.Image, 0, image.Image.Length);
        //                logger.LogInformation($"Saving image of product ${product.Id}");
        //            }
        //        }
        //    }
        //}
        //private static void MigratePath(AppDbContext context, IHostingEnvironment environment)
        //{
        //    var products = context.Products.Include(x => x.ProductImages);

        //    foreach (var product in products)
        //    {
        //        var productPath = $"{environment.WebRootPath}/Product Images/{product.Id}";
        //        var productImages = product.ProductImages;

        //        foreach (var productImage in productImages)
        //        {
        //            productImage.Path = $"{productPath}/{productImage.Id}";
        //            Console.WriteLine($"Saving path: {productPath}/{productImage.Id}");
        //        }
        //    }

        //    context.SaveChanges();
        //}

        private static void FixedImageSize(AppDbContext context, IHostingEnvironment environment)
        {
            var products = context.Products.Include(p => p.ProductImages);

            foreach (var product in products)
            {
                var filesPath = Directory.GetFiles($"{environment.WebRootPath}/Product Images/{product.Id}");

                foreach (var path in filesPath)
                {
                    try
                    {
                        var imageStream = new FileStream(path, FileMode.Open);
                        var magickCollection = new ImageMagick.MagickImageCollection(imageStream);
                        var fImage = magickCollection.First();

                        //if (fImage == null)
                        //    continue;

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
                        continue;
                    }

                }
            }
        }
    }
}
