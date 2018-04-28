using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.RegularExpressions;

namespace Core.ValidationAttributes
{
    internal class NoWhiteSpaceAttribute:ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            var values = ((IEnumerable<string>) value);

            return values.All(val => Regex.IsMatch(val, "^\\S+$"));
        }
    }
}
