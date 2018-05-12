using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BLL.Filters.ActionFilters;
using BLL.Services.Interfaces;
using Common.Extensions;
using Core.Interfaces;
using Core.Models.DomainModels;
using Core.Models.DTO.Mailing;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Shop.Controllers.Api
{
    [Produces("application/json")]
    [Route("api/Mailing")]
    [ModelStateFilter]
    public class MailingController : Controller
    {
        private readonly IRepositoryAsync<Mailing> _mailingRepository;
        private readonly IMapper _mapper;
        private readonly IEmailSender _emailSender;
        private readonly IConfiguration _configuration;
        private readonly UserManager<User> _userManager;

        public MailingController(IRepositoryAsync<Mailing> mailingRepository,
            IMapper mapper,
            IEmailSender emailSender,
            IConfiguration configuration,
            UserManager<User> userManager)
        {
            _mailingRepository = mailingRepository;
            _mapper = mapper;
            _emailSender = emailSender;
            _configuration = configuration;
            _userManager = userManager;
        }

        [HttpPost("subscribeMail")]
        public async Task<IActionResult> SubscribeMail([FromBody] SubscribeMailDto model)
        {
            var existed = await _mailingRepository.Table.FirstOrDefaultAsync(x => x.Email == model.Email);

            if (existed != null)
                return BadRequest("This email is subscribed");

            var inserResult = await _mailingRepository.InsertAsync(_mapper.Map<Mailing>(model));

            if (inserResult >= 1)
                return Ok("Success");

            return BadRequest("Can't subscribe");
        }

        [HttpPost("send")]
        public async Task<IActionResult> Send([FromBody] SendMailDto model)
        {
            var emailes = _mailingRepository.Table.Select(x => x.Email);

            if (model.IsForOnlyRegisterUsers)
            {
                var usersSubscribedEmails = _userManager.Users.Select(x => x.Email).Intersect(emailes);

                foreach (var email in usersSubscribedEmails)
                {
                    await _emailSender.SendEmailAsync(_configuration["EmailCredential:Email"], email, model.Subject, model.Body);
                }

                return Ok("Success");
            }

            foreach (var email in emailes)
            {
                await _emailSender.SendEmailAsync(_configuration["EmailCredential:Email"], email, model.Subject, model.Body);
            }

            return Ok("Success");
        }
    }
}