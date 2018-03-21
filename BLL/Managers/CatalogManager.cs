using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using Core.Models.DomainModels;
using Core.Models.DomainModels.Category;
using Microsoft.EntityFrameworkCore;
using Core.Interfaces;

namespace BLL.Managers
{
    public class CatalogManager
    {
        private readonly IRepositoryAsync<Catalog> _catalogsRepo;

        public CatalogManager(IRepositoryAsync<Catalog> catalogsRepo)
        {
            _catalogsRepo = catalogsRepo;
        }

        public bool IsStationery(string categoryName)
        {
            return _catalogsRepo
                .Table
                .Include(x => x.Stationery)
                .Where(x => x.Stationery.CategoryName == categoryName)
                .Any();
        }

        public bool IsGift(string categoryName)
        {
            return _catalogsRepo
                .Table
                .Include(x => x.Gift)
                .Where(x => x.Gift.CategoryName == categoryName)
                .Any();
        }

        public bool IsBook(string categoryName)
        {
            return _catalogsRepo
                .Table
                .Include(x => x.Book)
                .Where(x => x.Book.CategoryName == categoryName)
                .Any();
        }

    }
}
