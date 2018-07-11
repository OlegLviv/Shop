using System.ComponentModel.DataAnnotations;

namespace Core.ValidationAttributes
{
    public class JSEmpty : ValidationAttribute
    {
        public override bool IsValid(object value) => (string)value != "undefined".ToLower() && (string)value != "null";
    }
}
