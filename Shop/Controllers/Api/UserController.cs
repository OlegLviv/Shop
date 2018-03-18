using System;
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

        public UserController(UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

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
    }
}