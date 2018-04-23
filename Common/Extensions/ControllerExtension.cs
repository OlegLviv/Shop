using Microsoft.AspNetCore.Identity;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Linq;
using Newtonsoft.Json.Serialization;

namespace Common.Extensions
{
    public static class ControllerExtension
    {
        public static async Task<TIdentityUser> GetUserByIdentityAsync<TIdentityUser>(this ControllerBase controller, UserManager<TIdentityUser> userManager) where TIdentityUser : IdentityUser
        {
            var identityName = controller.User.Identity.Name;
            if (identityName == null)
                return null;
            return await userManager.FindByNameAsync(identityName) ?? await userManager.FindByEmailAsync(identityName);
        }

        public static JsonResult JsonResult(this Controller controller, object data)
        {
            return controller.Json(data, new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            });
        }

        public static string[] ArrayParamsToNormalArray(this ControllerBase controller, string[] @params)
        {
            if (@params == null)
                throw new ArgumentNullException(nameof(@params));
            if (@params.Any())
            {
                return @params[0].Split(',');
            }
            return null;
        }
    }
}
