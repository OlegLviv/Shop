﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Models.DomainModels.ProductModels
{
    public class Description : BaseEntity, IDescription
    {
        public string ProductId { get; set; }
        public Product Product { get; set; }

        public string Name { get; set; }
        public string Maker { get; set; }
        public double? Price { get; set; }

        public override bool Equals(object obj)
        {
            var description = obj as IDescription;
            if (description == null)
                return false;
            var res = (description.Name == Name || description.Name == null && Name == "null" || Name == "null")
            && (description.Maker == Maker || description.Maker == null && Maker == "null" || Maker == "null")
            && (description.Price == Price || Price == 0 || Price == null);
            return res;
        }
    }
}