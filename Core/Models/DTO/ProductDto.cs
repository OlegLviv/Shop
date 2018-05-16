using Core.Models.DomainModels.Base;

namespace Core.Models.DTO
{
    public class ProductDto : IProduct
    {
        public string Id { get; set; }

        public string Category { get; set; }

        public string SubCategory { get; set; }

        public string Query { get; set; }

        public double Price { get; set; }

        public string Name { get; set; }

        public long Review { get; set; }

        public string Description { get; set; }

        public int Discount { get; set; }

        //  todo maybe need delete
        public int ProductCount { get; set; }
    }
}
