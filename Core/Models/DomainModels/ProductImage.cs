using System.ComponentModel.DataAnnotations;
using Core.Models.DomainModels.Base;

namespace Core.Models.DomainModels
{
    public class ProductImage : BaseEntity
    {
        public string ProductId { get; set; }

        public Product Product { get; set; }

        [Required]
        public byte[] Image { get; set; }

        [Required]
        public string ContentType { get; set; }
    }
}
