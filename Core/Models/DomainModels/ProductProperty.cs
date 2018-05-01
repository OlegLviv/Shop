using System.ComponentModel.DataAnnotations;
using Core.Models.DomainModels.Base;
using Core.ValidationAttributes;

namespace Core.Models.DomainModels
{
    public class ProductProperty : BaseEntity
    {
        [Required]
        public string SubCategory { get; set; }

        [Required]
        [StringList]
        public string Properties { get; set; }
    }
}
