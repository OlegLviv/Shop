using Core.Models.DomainModels;

namespace BLL.Services.Interfaces
{
    public interface IOrderService
    {
        double CalculateTotalPriceAsync(Order orders);
    }
}
