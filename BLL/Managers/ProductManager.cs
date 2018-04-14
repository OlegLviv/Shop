using System.Collections.Generic;
using System.Linq;
using Core.Models.DomainModels;
using Common.Extensions;

namespace BLL.Managers
{
    public class ProductManager
    {

        public IEnumerable<Product> Select(IQueryable<Product> products, string[] ids)
        {
            return ids.Select(id => products
                .FirstOrDefault(x => x.Id == id));
        }

        // todo need catch splic exception
        public IDictionary<string, string> ParseQuery(string s)
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

        private string[] GetValuesByString(string value)
        {
            return value.Split(',');
        }
    }
}
