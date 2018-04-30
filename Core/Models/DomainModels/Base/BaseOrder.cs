using System.ComponentModel.DataAnnotations;

namespace Core.Models.DomainModels.Base
{
    public class BaseOrder : BaseEntity
    {
        [Required]
        public Product Product { get; set; }

        [Required]
        public string ProductId { get; set; }

        [Range(1, int.MaxValue)]
        public int Count { get; set; }

        public string OrderId { get; set; }
    }
}
