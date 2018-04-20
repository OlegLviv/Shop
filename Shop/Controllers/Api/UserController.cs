using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BLL.Filters.ActionFilters;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Common.Extensions;
using Microsoft.AspNetCore.Identity;
using Core.Models.DomainModels;
using Core.Models.ViewModels;
using Microsoft.Extensions.Configuration;
using BLL.Services;
using Common.Helpers;
using Core.Models.DTO;

namespace Shop.Controllers.Api
{
    [Produces("application/json")]
    [Route("api/User")]
    [ModelStateFilter]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class UserController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IEmailSender _sender;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;

        public UserController(UserManager<User> userManager,
            RoleManager<IdentityRole> roleManager,
            IConfiguration configuration,
            IEmailSender sender,
            IMapper mapper)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
            _sender = sender;
            _mapper = mapper;
        }
        #region GET
        [HttpGet("userInfo")]
        public async Task<IActionResult> GetUserInfo()
        {
            var user = await this.GetUserByIdentityAsync(_userManager);
            if (user == null)
                return BadRequest("User don't exist");
            return this.JsonResult(_mapper.Map<UserDto>(user));
        }

        [AllowAnonymous]
        [HttpGet("GetUserById/{id}")]
        public async Task<IActionResult> GetUserById(string id)
        {
            if (string.IsNullOrEmpty(id))
                return BadRequest("Incorrect user id");
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
                return BadRequest("Incorrent user id or user don't found");
            return this.JsonResult(_mapper.Map<UserDto>(user));
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme,Roles = "Admin")]
        [HttpGet("GetUserByName/{nameOrLastName}/{pageNumber:int?}/{pageSize:int?}")]
        public IActionResult GetUserByName(string nameOrLastName, int pageNumber = 1, int pageSize = 16)
        {
            var user = _userManager
                .Users
                .Where(x => x.Name.ToLower().Contains(nameOrLastName)
                            || x.LastName.ToLower().Contains(nameOrLastName));

            // todo need add automapper
            var paginator = new Paginator<User>
            {
                Data = user.Page(pageNumber, pageSize),
                TotalCount = user.Count(),
                PageSize = pageSize,
                PageNumber = pageNumber
            };
            return this.JsonResult(paginator);
        }

        [AllowAnonymous]
        [HttpGet("IfUserExist/{userNameOrEmail}")]
        public async Task<IActionResult> IfUserExist(string userNameOrEmail)
        {
            var user = await _userManager.FindByEmailAsync(userNameOrEmail) ?? await _userManager.FindByNameAsync(userNameOrEmail);
            return Ok(user != null);
        }

        [HttpGet("role")]
        public async Task<IActionResult> GetUserRole()
        {
            var user = await this.GetUserByIdentityAsync(_userManager);
            if (user == null)
                return BadRequest("User don't exist");
            var roles = _roleManager.Roles.ToList();
            string roleName = null;
            foreach (var role in roles)
            {
                if (await _userManager.IsInRoleAsync(user, role.Name))
                {
                    roleName = role.Name;
                    break;
                }
            }
            if (roleName == null)
                return BadRequest("User don't exist");
            return Ok(new { Role = roleName });
        }

        [AllowAnonymous]
        [HttpGet("ConfirmEmail")]
        public async Task<IActionResult> ConfirmEmail(string userId, string code)
        {
            if (string.IsNullOrEmpty(userId) || string.IsNullOrEmpty(code))
            {
                return BadRequest("Can't confirm email. Userid or code is null");
            }
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return BadRequest("User with this email don't exist");
            }
            var result = await _userManager.ConfirmEmailAsync(user, code);
            return Ok(result.Succeeded ? "Email confirmed" : "Error: can't confirm email");
        }
        #endregion
        #region POST
        [AllowAnonymous]
        [HttpPost("Registration")]
        public async Task<IActionResult> Registration([FromBody]RegistrationViewModel model)
        {
            var user = new User
            {
                Email = model.Email,
                UserName = model.UserName,
                LastName = model.LastName,
                Name = model.Name,
            };
            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
                return BadRequest(new { Message = "Can't create user", result.Errors });
            var resultAddToRole = await _userManager.AddToRoleAsync(user, _configuration["Roles:Client"]);
            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            var callbackUrl = Url.EmailConfirmationLink(nameof(UserController.ConfirmEmail), "User", user.Id, token, Request.Scheme);
            var sendRes = await _sender.SendEmailAsync(_configuration["EmailCredential:Email"], model.Email, "Your register confirm link", callbackUrl);
            if (!sendRes)
                return BadRequest("Ups, we can't to send message to your email");
            return Ok(new { IsSuccess = true });
        }
        #endregion
    }
}