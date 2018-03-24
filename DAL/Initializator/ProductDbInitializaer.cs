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
                Category = "Stationery",
                SubCategory = "schoolFolders"
            };
            var product2 = new Product
            {
                Category = "Stationery",
                SubCategory = "schoolFolders"
            };
            var product3 = new Product
            {
                Category = "Stationery",
                SubCategory = "ForSchool"
            };
            var product4 = new Product
            {
                Category = "Stationery",
                SubCategory = "copyBooks"
            };
            var product5 = new Product
            {
                Category = "Stationery",
                SubCategory = "copyBooks"
            };
            var product6 = new Product
            {
                Category = "Stationery",
                SubCategory = "copyBooks"
            };
            var product7 = new Product
            {
                Category = "Stationery",
                SubCategory = "copyBooks"
            };
            var product8 = new Product
            {
                Category = "Stationery",
                SubCategory = "copyBooks"
            };
            var description1 = new Description
            {
                Maker = "Maker1",
                Price = 300,
                Product = product1,
                ProductId = product1.Id,
                Color = "black",
                Name = "Folder",
                FolderType = "ForWork",
                Descriptions = "asdasasd"
            };
            var description2 = new Description
            {
                Maker = "Maker2",
                Price = 340,
                Product = product2,
                ProductId = product2.Id,
                Color = "red",
                Name = "Folder smth",
                FolderType = "ForWork",
                Descriptions = "asdasdfafdf afsa "
            };
            var description3 = new Description
            {
                Maker = "Maker3",
                Price = 234,
                Name = "Folder",
                Product = product3,
                ProductId = product3.Id,
                Color = "black",
                FolderType = "ForCopyBook",
                Descriptions = "asda asd asd"
            };
            var description4 = new Description
            {
                Maker = "Maker3",
                Name ="copy book",
                Price = 234,
                Product = product4,
                ProductId = product4.Id,
                Color = "black",
                CopyBookType = "Зошити шкільні",
                PageSize = "24",
                Descriptions = "asda asd asd"
            };
            var description5 = new Description
            {
                Maker = "Maker3",
                Name = "copy book",
                Price = 24,
                Product = product5,
                ProductId = product5.Id,
                Color = "black",
                CopyBookType = "Зошити шкільні asd",
                PageSize = "24",
                Descriptions = "asda asd asd"
            };
            var description6 = new Description
            {
                Maker = "Maker3",
                Name = "copy book",
                Price = 44,
                Product = product6,
                ProductId = product6.Id,
                Color = "green",
                CopyBookType = "Зошити шкільні asd",
                PageSize = "24",
                Descriptions = "asda asd asd"
            };
            var description7 = new Description
            {
                Maker = "Maker4",
                Name = "copy book asd",
                Price = 45,
                Product = product7,
                ProductId = product7.Id,
                Color = "white",
                CopyBookType = "Зошити шкільні asd",
                PageSize = "24",
                Descriptions = "asda asd asd"
            };
            var description8 = new Description
            {
                Maker = "Maker4",
                Name = "copy book c",
                Price = 56,
                Product = product8,
                ProductId = product8.Id,
                Color = "yellow",
                CopyBookType = "Зошити шкільні asd",
                PageSize = "24",
                Descriptions = "asda asd asd"
            };
            product1.Description = description1;
            product2.Description = description2;
            product3.Description = description3;
            product4.Description = description4;
            product5.Description = description5;
            product6.Description = description6;
            product7.Description = description7;
            product8.Description = description8;

            products.Add(product1);
            products.Add(product2);
            products.Add(product3);
            products.Add(product4);
            products.Add(product5);
            products.Add(product6);
            products.Add(product7);
            products.Add(product8);

            context.AddRange(products);
            context.SaveChanges();
        }
    }
}
