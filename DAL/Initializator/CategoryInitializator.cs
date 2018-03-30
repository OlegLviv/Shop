using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Models.DomainModels;

namespace DAL.Initializator
{
    public static class CategoryInitializator
    {
        public static void Initialize(AppDbContext context)
        {
            context.Database.EnsureCreated();

            // Look for any users.
            if (context.Categories.Any())
            {
                return; // DB has been seeded
            }
            //GenerateCategories(context);
        }

        //private static Task GenerateCategories(AppDbContext context)
        //{
        //    var categories = new List<Category>
        //    {
        //        new Category
        //        {
        //            Name = "Stationery",
        //            SubCategory = "SchoolFolders"
        //        }
        //    }
        //}
    }
}
