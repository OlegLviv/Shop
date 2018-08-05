using System;
using System.Diagnostics;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using BLL.Services.Interfaces;
using Microsoft.Extensions.Configuration;

namespace BLL.Services
{
    public class EmailSender : IEmailSender
    {
        private readonly IConfiguration _configuration;

        public SmtpClient SmtpClient { get; set; }

        public EmailSender(IConfiguration configuration)
        {
            SmtpClient = new SmtpClient(configuration["SmtpData:Host"], int.Parse(configuration["SmtpData:Port"]))
            {
                EnableSsl = true,
                Credentials = new NetworkCredential
                {
                    UserName = configuration["EmailCredential:UserName"],
                    Password = configuration["EmailCredential:Password"]
                }
            };
            _configuration = configuration;
        }

        public async Task<bool> SendEmailAsync(string email, string subject, string message)
        {
            try
            {
                await SmtpClient.SendMailAsync(new MailMessage(_configuration["EmailCredential:Email"], email, subject, message));

                return true;
            }
            catch (Exception e)
            {
                Debug.WriteLine(e);
                return false;
            }
        }
    }
}
