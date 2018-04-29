using System.ComponentModel.DataAnnotations;
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
    }
}
