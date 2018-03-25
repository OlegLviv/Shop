using Core.Models.DomainModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Initializator
{
    public class UsersDbInitializer
    {
        public static async Task Initialize(AppDbContext context, UserManager<User> userManager,
    RoleManager<IdentityRole> roleManager, ILogger<UsersDbInitializer> logger, IConfiguration configuration)
        {
            context.Database.EnsureCreated();

            // Look for any users.
            if (context.Users.Any())
            {
                return; // DB has been seeded
            }

            await CreateDefaultRolesAndAdmin(userManager, roleManager, logger, configuration);
            await CreateDefaultUser(userManager, configuration);
        }
        private static async Task CreateDefaultRolesAndAdmin(UserManager<User> um, RoleManager<IdentityRole> rm, ILogger<UsersDbInitializer> logger, IConfiguration configuration)
        {
            var administratorRole = configuration["Roles:Admin"];
            var anonimRole = configuration["Roles:Anonim"];
            var clientRole = configuration["Roles:Client"];
            var emailAdmin = configuration["Admin:Email"];
            var usernameAdmin = configuration["Admin:Username"];
            var passAdmin = configuration["Admin:Password"];
            var resAdminRole = await rm.CreateAsync(new Role { Name = administratorRole });
            if (resAdminRole.Succeeded)
                logger.LogInformation($"Role {administratorRole} created success");
            var resAuthorRole = await rm.CreateAsync(new Role { Name = anonimRole });
            if (resAuthorRole.Succeeded)
                logger.LogInformation($"Role {anonimRole} created success");
            var resCustomerRole = await rm.CreateAsync(new Role { Name = clientRole });
            if (resCustomerRole.Succeeded)
                logger.LogInformation($"Role {clientRole} created success");
            var resAdminCreate = await um.CreateAsync(new User { Email = emailAdmin, UserName = usernameAdmin }, passAdmin);
            if (resAdminCreate.Succeeded)
                logger.LogInformation($"Admin created success");
            var user = await um.FindByEmailAsync(emailAdmin);
            var resAddToRole = await um.AddToRoleAsync(user, administratorRole);
            if (resAddToRole.Succeeded)
                logger.LogInformation("Admin added to role suceessfuly");
        }

        private static async Task CreateDefaultUser(UserManager<User> userManager, IConfiguration configuration)
        {
            var user = new User
            {
                Email = "olehspidey2@mail.ru",
                UserName = "olehspidey",
                Name = "Oleh",
                LastName = "Kokhan",
                PhoneNumber = "0680538860",
                EmailConfirmed = true
            };
            await userManager.CreateAsync(user, "30Spudi30");
            await userManager.AddToRoleAsync(user, configuration["Roles:Client"]);
        }
    }
}
