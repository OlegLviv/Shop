﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Models.DomainModels;
using Common.Extensions;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BLL.Managers
{
    public class ProductManager
    {
        private readonly IRepositoryAsync<ProductProperty> _repositoryPP;
        private readonly IRepositoryAsync<PossibleProductProperty> _repositoryPosiblePP;

        public ProductManager(IRepositoryAsync<ProductProperty> repositoryPP, IRepositoryAsync<PossibleProductProperty> repositoryPosiblePP)
        {
            _repositoryPP = repositoryPP;
            _repositoryPosiblePP = repositoryPosiblePP;
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
                var isReturn = true;

                if (IsEqualsKeys(query, product.Query, out var parsedQ, out var parsedProductQ, out var intersectKeys))
                {
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
                }
                else isReturn = false;

                if (isReturn)
                    yield return product;
            }
        }

        public async Task<bool> AddNewPropertyAsync(string subCategory, string newProp)
        {
            if (string.IsNullOrWhiteSpace(subCategory) || string.IsNullOrWhiteSpace(newProp))
                throw new ArgumentException();

            var prodProperty = await _repositoryPP.Table.FirstOrDefaultAsync(x =>
                x.SubCategory.Equals(subCategory, StringComparison.OrdinalIgnoreCase));

            if (prodProperty == null)
                return false;

            if (prodProperty.Properties.Split(';').Contains(newProp))
                return false;

            prodProperty.Properties = prodProperty.Properties == string.Empty ? newProp : $"{prodProperty.Properties};{newProp}";

            var updateResult = await _repositoryPP.UpdateAsync(prodProperty);

            var inserResult = await _repositoryPosiblePP.InsertAsync(new PossibleProductProperty
            {
                Values = "",
                PropertyName = newProp,
                SubCategory = subCategory
            });

            return updateResult >= 1 && inserResult >= 1;
        }

        public async Task<bool> AddNewPossiblePropertiesAsync(string subCategory, string propName, IEnumerable<string> possibleProdProps)
        {
            var posiibleProdPropsList = possibleProdProps?.ToList();

            if (string.IsNullOrWhiteSpace(subCategory) ||
               string.IsNullOrWhiteSpace(subCategory) ||
               possibleProdProps == null ||
               !posiibleProdPropsList.Any())
                throw new ArgumentException();

            var possibleProps = await _repositoryPosiblePP.Table.FirstOrDefaultAsync(x =>
                x.SubCategory.Equals(subCategory, StringComparison.OrdinalIgnoreCase) &&
                x.PropertyName.Equals(propName, StringComparison.OrdinalIgnoreCase));

            if (possibleProps == null)
                return false;

            if (possibleProps.Values.Split(';').Intersect(posiibleProdPropsList).Any())
                return false;

            var sb = new StringBuilder(possibleProps.Values.Length);
            posiibleProdPropsList.ForEach(x => { sb.Append($"{x};"); });
            var possiblePropsRes = new string(sb.ToString().SkipLast(1).ToArray());

            possibleProps.Values = possibleProps.Values == string.Empty
                ? possiblePropsRes
                : $"{possibleProps.Values};{possiblePropsRes}";

            return await _repositoryPosiblePP.UpdateAsync(possibleProps) >= 1;
        }

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
    }
}
