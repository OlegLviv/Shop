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
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
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

            var user = await _userManager.FindByEmailAsync(model.Email);

            if (user != null)
            {
                user.IsSubscribedToMailing = true;
                await _userManager.UpdateAsync(user);
            }

            if (inserResult >= 1)
                return Ok("Success");

            return BadRequest("Can't subscribe");
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
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

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("unsubscribeUser")]
        public async Task<IActionResult> Unsubscribe()
        {
            var user = await this.GetUserByIdentityAsync(_userManager);

            if (user == null)
                return Unauthorized();

            if (!user.IsSubscribedToMailing)
                return BadRequest("User is unsubscribed");

            user.IsSubscribedToMailing = false;

            var mailing = await _mailingRepository.Table.FirstOrDefaultAsync(x => x.Email == user.Email);

            var unsubRes = await _mailingRepository.DeleteAsync(mailing) >= 1 &&
                           (await _userManager.UpdateAsync(user)).Succeeded;

            if (unsubRes)
                return Ok("Success");

            return BadRequest("Can't unsubscribe");
        }
    }
}