using Core.Models.DomainModels.ProductModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Initializator
{
    public class ProductDbInitializaer
    {
        public static void Initialize(AppDbContext context)
        {
            context.Database.EnsureCreated();

            // Look for any users.
            if (context.Products.Any())
            {
                return; // DB has been seeded
            }
            GenerateProducts(context);
        }
        public static void GenerateProducts(AppDbContext context)
        {
            var products = new List<Product>();
            var product1 = new Product
            {
                Category = "Stationary",
                SubCategory = "ForShcoll"
            };
            var product2 = new Product
            {
                Category = "Stationary",
                SubCategory = "ForShcoll"
            };
            var product3 = new Product
            {
                Category = "Stationary",
                SubCategory = "ForShcoll"
            };
            var product4 = new Product
            {
                Category = "Stationary",
                SubCategory = "CopyBook"
            };
            var description1 = new Description
            {
                Maker = "Maker1",
                Price = 300,
                Product = product1,
                ProductId = product1.Id,
                Color = "black"
            };
            var description2 = new Description
            {
                Maker = "Maker2",
                Price = 340,
                Product = product2,
                ProductId = product2.Id,
                Color = "red"
            };
            var description3 = new Description
            {
                Maker = "Maker3",
                Price = 234,
                Product = product3,
                ProductId = product3.Id,
                Color = "black"
            };
            var description4 = new Description
            {
                Maker = "Maker4",
                Price = 4134,
                Product = product4,
                ProductId = product4.Id,
                Color = "green"
            };
            product1.Description = description1;
            product2.Description = description2;
            product3.Description = description3;
            product4.Description = description4;
            products.Add(product1);
            products.Add(product2);
            products.Add(product3);
            products.Add(product4);
            context.AddRange(products);
            context.SaveChanges();
        }
    }
}
