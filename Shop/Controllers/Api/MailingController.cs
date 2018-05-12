using System.Threading.Tasks;
using AutoMapper;
using BLL.Filters.ActionFilters;
using Core.Interfaces;
using Core.Models.DomainModels;
using Core.Models.DTO.Mailing;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Shop.Controllers.Api
{
    [Produces("application/json")]
    [Route("api/Mailing")]
    [ModelStateFilter]
    public class MailingController : Controller
    {
        private readonly IRepositoryAsync<Mailing> _mailingRepository;
        private readonly IMapper _mapper;

        public MailingController(IRepositoryAsync<Mailing> mailingRepository, IMapper mapper)
        {
            _mailingRepository = mailingRepository;
            _mapper = mapper;
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
    }
}