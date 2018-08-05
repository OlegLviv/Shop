using System.Net.Mail;
using System.Threading.Tasks;

namespace BLL.Services.Interfaces
{
    public interface IEmailSender
    {
        SmtpClient SmtpClient { get; set; }

        Task<bool> SendEmailAsync(string email, string subject, string messagee);
    }
}
