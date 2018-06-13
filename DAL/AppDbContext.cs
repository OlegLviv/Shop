using Core.Models.DomainModels;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;

namespace DAL
{
    public sealed class AppDbContext : IdentityDbContext
    {   
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
            Database.MigrateAsync().Wait();
        }

        public DbSet<User> User { get; set; }
        public DbSet<Role> Role { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductProperty> ProductProperties { get; set; }
        public DbSet<PossibleProductProperty> PossibleProductProperties { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Mailing> Mailings { get; set; }
        public DbSet<CallMe> CallMe { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);
        }
    }
}
