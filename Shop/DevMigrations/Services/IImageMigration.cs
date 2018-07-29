using System.Threading.Tasks;

namespace Shop.DevMigrations.Services
{
    internal interface IImageMigration
    {
        Task MigrateImageAsync();
    }
}
