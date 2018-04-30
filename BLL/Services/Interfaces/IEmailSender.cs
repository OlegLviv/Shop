using System.Threading.Tasks;

namespace BLL.Services.Interfaces
{
    public interface IEmailSender
    {
        Task<bool> SendEmailAsync(string from, string email, string subject, string messagee);
    }
}
