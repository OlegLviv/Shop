using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.RegularExpressions;

namespace Core.ValidationAttributes
{
    public class PropertyValuesAttribute : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            var values = ((IEnumerable<string>)value);

            return values.All(val => Regex.IsMatch(val, "^[A-zА-яёЁіІ0-9]{2,20}$"));
        }

        public override string FormatErrorMessage(string name)
        {
            return $"Field {name} can contain values with letters and numbers";
        }
    }
}
