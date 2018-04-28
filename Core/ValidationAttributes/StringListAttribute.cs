using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace Core.ValidationAttributes
{
    internal class StringListAttribute : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            return !string.IsNullOrWhiteSpace((string)value) && Regex.IsMatch((string)value, "([a-zA-Z];[a-zA-Z])|[a-zA-z]$");
        }
    }
}
