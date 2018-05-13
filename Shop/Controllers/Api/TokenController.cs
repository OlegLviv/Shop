using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Core.Models.DomainModels;
using Core.Models.DTO.Token;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Shop.Controllers.Api
{
    [Produces("application/json")]
    [Route("api/Token")]
    public class TokenController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly string _tokenIssuer,
                                _tokenAudience,
                                _tokenLifetime,
                                _tokenKey;

        public TokenController(IConfiguration configuration,
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _tokenIssuer = configuration["Token:Issuer"];
            _tokenAudience = configuration["Token:Audience"];
            _tokenLifetime = configuration["Token:Lifetime"];
            _tokenKey = configuration["Token:Key"];
        }

        [HttpPost]
        [Route("getToken")]
        public async Task<IActionResult> GetToken([FromBody]LoginDto model)
        {
            var user = await _userManager.FindByEmailAsync(model.UserName) ?? await _userManager.FindByNameAsync(model.UserName);

            if (user == null)
                return BadRequest("Incorrect user name or email");

            var singInRes = await _signInManager.CheckPasswordSignInAsync(user, model.Password, false);

            if (!singInRes.Succeeded)
                return BadRequest("Incorrect password");

            string roleName = null;
            var roles = _roleManager.Roles.ToList();

            foreach (var role in roles)
            {
                if (await _userManager.IsInRoleAsync(user, role.Name))
                    roleName = role.Name;
            }

            if (roleName == null)
                return StatusCode(400, "User havn't role");

            var jwt = new JwtSecurityToken(
                    issuer: _tokenIssuer,
                    audience: _tokenAudience,
                    notBefore: DateTime.UtcNow,
                    claims: GetIdentity(model.UserName, roleName).Claims,
                    expires: DateTime.UtcNow.Add(TimeSpan.FromMinutes(double.Parse(_tokenLifetime))),
                    signingCredentials: new SigningCredentials(
                        new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_tokenKey)), SecurityAlgorithms.HmacSha256));

            return Ok(new { Token = new JwtSecurityTokenHandler().WriteToken(jwt) });
        }

        /// <summary>
        /// Return identity by user name and role name
        /// </summary>
        /// <param name="userName">name of user</param>
        /// <param name="roleName">role of user</param>
        /// <returns>New ClaimsIdentity by user name and role name of user</returns>
        private static ClaimsIdentity GetIdentity(string userName, string roleName)
        {
            var claims = new[]
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, userName),
                new Claim(ClaimsIdentity.DefaultRoleClaimType,roleName )
            };
            var claimsIdentity =
                new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                ClaimsIdentity.DefaultRoleClaimType);

            return claimsIdentity;
        }
    }
}