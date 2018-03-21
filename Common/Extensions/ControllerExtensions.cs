using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Common.Extensions
{
    public static class ControllerExtensions
    {
        public async static Task<TIdentityUser> GetUserByIdentityAsync<TIdentityUser>(this ControllerBase controller, UserManager<TIdentityUser> userManager) where TIdentityUser : IdentityUser
        {
            var identityName = controller.User.Identity.Name;
            if (identityName == null)
                return null;
            var user = await userManager.FindByNameAsync(identityName);
            if (user == null)
                user = await userManager.FindByEmailAsync(identityName);
            if (user == null)
                return null;
            return user;
        }
        public static JsonResult JsonResult(this Controller controller, object data)
        {
            return controller.Json(data, new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            });
        }
    }
}
