﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLL.Filters.ActionFilters;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Common.Extensions;
using Microsoft.AspNetCore.Identity;
using Core.Models.DomainModels;
using RUser = Core.Models.ViewModels.ReturnViewModels;
using Core.Models.ViewModels;
using Microsoft.Extensions.Configuration;
using BLL.Services;
using Common.Helpers;

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

        public UserController(UserManager<User> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration, IEmailSender sender)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
            _sender = sender;
        }
        #region GET
        [HttpGet("userInfo")]
        public async Task<IActionResult> GetUserInfo()
        {
            var user = await this.GetUserByIdentityAsync(_userManager);
            if (user == null)
                return Unauthorized();
            var rUser = new RUser.User
            {
                Id = user.Id,
                UserName = user.UserName
            };
            return Ok(new { User = rUser });
        }

        [HttpGet("role")]
        public async Task<IActionResult> GetUserRole()
        {
            var user = await this.GetUserByIdentityAsync(_userManager);
            if (user == null)
                return Unauthorized();
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
                return Unauthorized();
            return Ok(new { Role = roleName });
        }

        [HttpGet("ConfirmEmail")]
        public async Task<IActionResult> ConfirmEmail(string userId, string code)
        {
            if (userId == null || code == null)
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
            return Ok(new { IsSuccess = true, IsMailSent = sendRes });
        }
        #endregion
    }
}