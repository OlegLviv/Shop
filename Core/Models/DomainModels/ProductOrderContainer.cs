using System.ComponentModel.DataAnnotations;
using Core.Models.DomainModels.Base;

namespace Core.Models.DomainModels
{
    public class ProductOrderContainer : BaseEntity
    {
        public string ProductId { get; set; }

        public Product Product { get; set; }

        public string OrderId { get; set; }

        public Order Order { get; set; }

        [Range(1, int.MaxValue)]
        public int Count { get; set; }
    }
}
