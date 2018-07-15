using System;
using System.IO;
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
                    Migrate(context, appEnvironment).Wait();
                }
                catch (Exception ex)
                {
                    var logger = services.GetRequiredService<ILogger<Program>>();
                    logger.LogError(ex, "An error occurred while seeding the database.");
                }
            }
            host.Run();
        }

        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .Build();

        private static async Task Migrate(AppDbContext context, IHostingEnvironment environment)
        {
            var products = context.Products.Include(i => i.ProductImages);
            var path = $"{environment.WebRootPath}/Product Images";

            if (!Directory.Exists(path))
                Directory.CreateDirectory(path);

            foreach (var product in products)
            {
                var productPath = $"{path}/${product.Id}";
                if (!Directory.Exists(productPath))
                    Directory.CreateDirectory(productPath);

                foreach (var image in product.ProductImages)
                {
                    using (var fileStream = new FileStream(productPath, FileMode.Create))
                    {
                        await fileStream.WriteAsync(image.Image, 0, image.Image.Length);
                    }
                }
            }
        }
    }
}
