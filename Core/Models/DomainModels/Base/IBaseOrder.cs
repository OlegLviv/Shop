namespace Core.Models.DomainModels.Base
{
    public interface IBaseOrder
    {
        string ProductId { get; set; }
        int Count { get; set; }
    }
}
