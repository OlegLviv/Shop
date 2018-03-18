using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services
{
    public interface IEmailSender
    {
        Task<bool> SendEmailAsync(string from, string email, string subject, string messagee);
    }
}
