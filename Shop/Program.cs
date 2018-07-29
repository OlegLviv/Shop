using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using BLL.Services.DevServices;
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
using Shop.DevMigrations.Services;

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
                    var devServicesExecutor = services.GetService<IDevServicesExecutor>();
                    var dbInitializerLogger = services.GetRequiredService<ILogger<UsersDbInitializer>>();
                    UsersDbInitializer.InitializeAsync(context, userManager, roleManager, dbInitializerLogger, configuration).Wait();
                    ProductDbInitializaer.Initialize(context).Wait();
                    PropsInitializator.InitializeAsync(context).Wait();
                    devServicesExecutor.ExecuteAllAsync().Wait();
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
    }
}
