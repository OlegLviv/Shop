using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace BLL.Services.DevServices
{
    public class DevServicesExecutor : IDevServicesExecutor
    {
        private readonly IServiceProvider _serviceProvider;

        public DevServicesExecutor(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public async Task ExecuteAllAsync()
        {
            foreach (var devService in DevServices)
            {
                await devService.ExecuteAsync(_serviceProvider);
            }
        }

        public IReadOnlyCollection<IDevService> DevServices => Assembly
            .GetAssembly(GetType())
            .GetTypes()
            .Where(t => typeof(IDevService).IsAssignableFrom(t) && !t.IsAbstract)
            .Select(t => (IDevService)Activator.CreateInstance(t))
            .ToList();
    }
}
