﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Common.Extensions;
using Core.Interfaces;
using Core.Models.DomainModels;
using Microsoft.EntityFrameworkCore;

namespace BLL.Services
{
    public class ProductService
    {
        private readonly IRepositoryAsync<ProductProperty> _repositoryProdProp;
        private readonly IRepositoryAsync<PossibleProductProperty> _repositoryPosibleProductProp;

        public ProductService(IRepositoryAsync<ProductProperty> repositoryProdProp,
            IRepositoryAsync<PossibleProductProperty> repositoryPosibleProductProp)
        {
            _repositoryProdProp = repositoryProdProp;
            _repositoryPosibleProductProp = repositoryPosibleProductProp;
        }

        public IEnumerable<Product> Select(IQueryable<Product> products, string[] ids)
        {
            return ids.Select(id => products
                .FirstOrDefault(x => x.Id == id))
                .Where(product => product != null);
        }

        public IEnumerable<Product> SelectProducts(string query, IQueryable<Product> products)
        {
            foreach (var product in products)
            {
                bool isReturn;

                isReturn = IsEqualsKeys(query, product.Query, out var parsedQ, out var parsedProductQ, out var intersectKeys) && CanReturn(parsedQ, parsedProductQ, intersectKeys);

                if (isReturn)
                    yield return product;
            }
        }

        public async Task<bool> AddNewPropertyAsync(string subCategory, string newProp)
        {
            if (string.IsNullOrWhiteSpace(subCategory) || string.IsNullOrWhiteSpace(newProp))
                throw new ArgumentException();

            var prodProperty = await SelectProductPropertyAsync(subCategory);

            if (prodProperty == null)
            {
                prodProperty = new ProductProperty
                {
                    Id = Guid.NewGuid().ToString(),
                    Properties = newProp,
                    SubCategory = subCategory
                };
                return await _repositoryProdProp.InsertAsync(prodProperty) >= 1 && await _repositoryPosibleProductProp
                    .InsertAsync(PossibleProductProperty.Empty(subCategory, newProp)) >= 1;
            }

            if (prodProperty.Properties.Split(';').Contains(newProp))
                return false;

            prodProperty.Properties = prodProperty.Properties == string.Empty ? newProp : $"{prodProperty.Properties};{newProp}";

            var updateResult = await _repositoryProdProp.UpdateAsync(prodProperty);

            var inserResult = await _repositoryPosibleProductProp.InsertAsync(PossibleProductProperty.Empty(subCategory, newProp));

            return updateResult >= 1 && inserResult >= 1;
        }

        public async Task<bool> AddNewPossiblePropertiesAsync(string subCategory, string propName, IEnumerable<string> possibleProdProps)
        {
            var posiibleProdPropsList = possibleProdProps?.ToList();

            if (string.IsNullOrWhiteSpace(subCategory) ||
               string.IsNullOrWhiteSpace(propName))
                throw new ArgumentException();

            if (posiibleProdPropsList == null || !posiibleProdPropsList.Any())
                throw new ArgumentException();

            var possibleProps = await SelectPossibleProductPropertyAsync(subCategory, propName);

            if (possibleProps == null)
                return false;

            if (possibleProps.Values.Split(';').Intersect(posiibleProdPropsList).Any())
                return false;

            possibleProps.Values = possibleProps.Values == string.Empty ? string.Join(";", posiibleProdPropsList) : string.Join(";", possibleProps.Values.Split(';').Concat(posiibleProdPropsList));

            return await _repositoryPosibleProductProp.UpdateAsync(possibleProps) >= 1;
        }

        public async Task<bool> DeletePropertyAsync(string subCategory, string propName)
        {
            if (string.IsNullOrWhiteSpace(subCategory) || string.IsNullOrWhiteSpace(propName))
                throw new ArgumentException();

            var prodProperty = await SelectProductPropertyAsync(subCategory);

            if (!prodProperty.Properties.Split(';').Contains(propName))
                return false;

            var arrayProps = prodProperty.Properties.Split(';').Where(x => x != propName);

            prodProperty.Properties = string.Join(";", arrayProps);

            var possibleProps = await SelectPossibleProductPropertyAsync(subCategory, propName);

            return await _repositoryPosibleProductProp.DeleteAsync(possibleProps) >= 1 &&
                   await _repositoryProdProp.UpdateAsync(prodProperty) >= 1;
        }

        public double CalculatePriceDiscount(double price, double discount) => discount > 0 ? price - discount / 100 * price : 0;

        //  todo need remove out
        private bool IsEqualsKeys(string query, string productQuery, out IDictionary<string, string> parsedQ, out IDictionary<string, string> parsedProductQ, out IEnumerable<string> intersectKeys)
        {
            parsedQ = ParseQuery(query);
            var qKeys = parsedQ.Keys;
            parsedProductQ = ParseQuery(productQuery);
            var pqKeys = parsedProductQ.Keys;
            intersectKeys = qKeys.Intersect(pqKeys);
            var except = qKeys.Except(intersectKeys);
            return !except.Any();
        }

        // todo need catch splic exception
        private static IDictionary<string, string> ParseQuery(string s)
        {
            var length = s.Split(';').Length;
            var dictionary = new Dictionary<string, string>(length);

            foreach (var item in s.Split(';'))
            {
                var key = item.Split('=')[0];
                var value = item.Split('=')[1];
                dictionary[key] = value;
            }

            return dictionary;
        }

        private static string[] GetValuesByString(string value) => value.Split(',');

        private async Task<PossibleProductProperty> SelectPossibleProductPropertyAsync(string subCategory, string propName) => await _repositoryPosibleProductProp.Table.FirstOrDefaultAsync(x =>
             x.SubCategory.Equals(subCategory, StringComparison.OrdinalIgnoreCase) &&
             x.PropertyName.Equals(propName, StringComparison.OrdinalIgnoreCase));

        private async Task<ProductProperty> SelectProductPropertyAsync(string subCategory) => await _repositoryProdProp.Table.FirstOrDefaultAsync(x =>
             x.SubCategory.Equals(subCategory, StringComparison.OrdinalIgnoreCase));

        private static bool CanReturn(IDictionary<string, string> parsedQ, IDictionary<string, string> parsedProductQ, IEnumerable<string> intersectKeys)
        {
            var isReturn = true;
            foreach (var pKey in intersectKeys)
            {
                var parsedQValues = GetValuesByString(parsedQ[pKey]);

                if (parsedQValues.Length > 1)
                {
                    if (!parsedQValues.Intersect(parsedProductQ[pKey]).Any())
                        isReturn = false;
                }
                else if (parsedProductQ[pKey] != parsedQ[pKey])
                    isReturn = false;
            }

            return isReturn;
        }
    }
}
