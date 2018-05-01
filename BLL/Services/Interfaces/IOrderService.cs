using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Models.DomainModels.Base;

namespace BLL.Services.Interfaces
{
    public interface IOrderService
    {
        Task<double> CalculateTotalPriceAsync(IEnumerable<IBaseOrder> orders);
    }
}
