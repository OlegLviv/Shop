﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Models.DomainModels;

namespace DAL.Initializator
{
    public class ProductDbInitializaer
    {
        private static Random _random;

        public static async Task Initialize(AppDbContext context)
        {
            _random = new Random();
            context.Database.EnsureCreated();
            // Look for any users.
            if (context.Products.Any())
            {
                return; // DB has been seeded
            }
            await GenerateProductsAsync(context);
        }
        public static async Task GenerateProductsAsync(AppDbContext context)
        {
            var products = new List<Product>();
            var product1 = new Product
            {
                Category = "Stationery",
                SubCategory = "schoolFolders",
                Query = "color=white;height=30",
                Price = 30,
                Name = "Simple folder1"
            };
            var product2 = new Product
            {
                Category = "Stationery",
                SubCategory = "schoolFolders",
                Query = "color=white;width=40",
                Price = 54,
                Name = "Simple folder2"
            };
            var product3 = new Product
            {
                Category = "Stationery",
                SubCategory = "ForSchool",
                Query = "color=red;type=30",
                Price = 543,
                Name = "Simple folder2"
            };
            var product4 = new Product
            {
                Category = "Stationery",
                SubCategory = "copyBooks",
                Query = "type=1;color=red",
                Price = 545,
                Name = "Simple cbb"
            };
            var product5 = new Product
            {
                Category = "Stationery",
                SubCategory = "copyBooks",
                Query = "type=typ1;color=red",
                Price = 534,
                Name = "Simple cb3"
            };
            var product6 = new Product
            {
                Category = "Stationery",
                SubCategory = "copyBooks",
                Query = "type=1;color=green",
                Price = 23,
                Name = "Simple cb"
            };
            var product7 = new Product
            {
                Category = "Stationery",
                SubCategory = "copyBooks",
                Query = "color=white;type=1",
                Price = 546,
                Name = "Simple cb"
            };
            var product8 = new Product
            {
                Category = "Stationery",
                SubCategory = "copyBooks",
                Query = "typ=2;color=black",
                Price = 54,
                Name = "Simple cb"
            };

            for (var i = 0; i < 300; i++)
            {
                var randColors = new string[]
                {
                    "black",
                    "red",
                    "green",
                    "white"
                };
                products.Add(new Product
                {
                    Category = "Stationery",
                    SubCategory = "copyBooks",
                    Query = $"typ={_random.Next(0, 5)};color={randColors[_random.Next(0, 3)]}",
                    Price = _random.Next(1, 10000),
                    Name = "Simple cb"
                });
            }

            products.Add(product1);
            products.Add(product2);
            products.Add(product3);
            products.Add(product4);
            products.Add(product5);
            products.Add(product6);
            products.Add(product7);
            products.Add(product8);

            await context.AddRangeAsync(products);
            await context.SaveChangesAsync();
        }
    }
}
