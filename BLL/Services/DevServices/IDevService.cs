using System;
using System.Threading.Tasks;

namespace BLL.Services.DevServices
{
    public interface IDevService
    {
        Task ExecuteAsync(IServiceProvider serviceProvider);
        bool CanExecute { get; }
    }
}
