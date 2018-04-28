using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace Core.ValidationAttributes
{
    public class UnincalValuesAttribute : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            var unicValues = ((IEnumerable<string>)value).Distinct();
            return ((IEnumerable<string>)value).Count() == unicValues.Count();
        }
    }
}
