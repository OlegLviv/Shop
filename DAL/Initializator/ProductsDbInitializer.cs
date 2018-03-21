using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using Core.Models.DomainModels;
using Core.Models.DomainModels.Category;
using Core.Models.DomainModels.Category.SubCategoty;
using Core.Models.DomainModels.Products;

namespace DAL.Initializator
{
    public class ProductsDbInitializer
    {
        public static void Initialize(AppDbContext context)
        {
            if (context.Catalog.Any())
            {
                return;
            }
            AddProducts(context);
        }
        public static void AddProducts(AppDbContext context)
        {
            var catalog = new Catalog
            {
                CatalogName = "Goods"
            };
            var giftCategory = new Gift
            {
                Catalog = catalog,
                CatalogId = catalog.Id
            };
            var cascetSubCategory = new Casket
            {
                Gift = giftCategory,
                GiftId = giftCategory.Id,
            };
            var decorativeBox = new DecorativeBox
            {
                Gift = giftCategory,
                GiftId = giftCategory.Id
            };
            var giftProductsCasketSubC = GenerateGiftProductCasketSubC(cascetSubCategory);
            var giftProductsCasketDecorativeBoxSubC = GenerateGiftProductCasketSubC(cascetSubCategory);
            cascetSubCategory.GiftProducts = giftProductsCasketSubC;
            decorativeBox.GiftProducts = giftProductsCasketDecorativeBoxSubC;
            giftCategory.Caskets = cascetSubCategory;
            giftCategory.DecorativeBoxs = decorativeBox;
            catalog.Gift = giftCategory;
            context.Catalog.Add(catalog);
            var result = context.SaveChanges();
        }

        public static List<GiftProduct> GenerateGiftProductCasketSubC(Casket casket)
        {
            return new List<GiftProduct>
            {
                new GiftProduct
                {
                    OwnerId = casket.Id,
                    Maker = "maker1",
                    Name = "gift1",
                    Price = 100
                },
                new GiftProduct
                {
                    OwnerId = casket.Id,
                    Maker = "maker2",
                    Name = "gift2",
                    Price = 104
                },
                new GiftProduct
                {
                    OwnerId = casket.Id,
                    Maker = "maker3",
                    Name = "gif51",
                    Price = 123
                },
                new GiftProduct
                {
                    OwnerId = casket.Id,
                    Maker = "maker4",
                    Name = "gift4",
                    Price = 1120
                },
                new GiftProduct
                {
                    OwnerId = casket.Id,
                    Maker = "maker5",
                    Name = "gift5",
                    Price = 500
                },
            };
        }
        public static List<GiftProduct> GenerateGiftProductDecorativeBoxSubC(DecorativeBox decorativeBox)
        {
            return new List<GiftProduct>
            {
                new GiftProduct
                {
                    OwnerId = decorativeBox.Id,
                    Maker = "maker1",
                    Name = "gift1",
                    Price = 100
                },
                new GiftProduct
                {
                    OwnerId = decorativeBox.Id,
                    Maker = "maker2",
                    Name = "gift2",
                    Price = 104
                },
                new GiftProduct
                {
                    OwnerId = decorativeBox.Id,
                    Maker = "maker3",
                    Name = "gif51",
                    Price = 123
                },
                new GiftProduct
                {
                    OwnerId = decorativeBox.Id,
                    Maker = "maker4",
                    Name = "gift4",
                    Price = 1120
                },
                new GiftProduct
                {
                    OwnerId = decorativeBox.Id,
                    Maker = "maker5",
                    Name = "gift5",
                    Price = 500
                },
            };
        }
    }
}
