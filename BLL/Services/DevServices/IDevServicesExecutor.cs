using System.Collections.Generic;
using System.Threading.Tasks;

namespace BLL.Services.DevServices
{
    public interface IDevServicesExecutor
    {
        Task ExecuteAllAsync();

        IReadOnlyCollection<IDevService> DevServices { get; }
    }
}
