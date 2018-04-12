namespace Core.Models.DomainModels
{
    public interface IProduct
    {
        string Id { get; set; }
        string Category { get; set; }
        string SubCategory { get; set; }
        string Query { get; set; }
        double Price { get; set; }
        string Name { get; set; }
    }
}
