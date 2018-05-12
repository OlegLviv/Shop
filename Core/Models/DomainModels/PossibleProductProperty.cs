using System.ComponentModel.DataAnnotations;
using Core.Models.DomainModels.Base;
using Core.ValidationAttributes;

namespace Core.Models.DomainModels
{
    public class PossibleProductProperty : BaseEntity
    {
        [Required]
        public string SubCategory { get; set; }

        [Required]
        public string PropertyName { get; set; }

        //  todo maybe not need Stringlist
        [Required]
        [MinLength(2)]
        [StringList]
        public string Values { get; set; }

        public static PossibleProductProperty Empty(string subCat, string propName) => new PossibleProductProperty
        {
            SubCategory = subCat,
            PropertyName = propName,
            Values = string.Empty
        };
    }
}
