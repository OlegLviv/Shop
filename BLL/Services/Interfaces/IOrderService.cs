using Core.Models.DomainModels;

namespace BLL.Services.Interfaces
{
    public interface IOrderService
    {
        double CalculateTotalPrice(Order orders);
    }
}
