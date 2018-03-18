using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;

namespace Common.Helpers
{
    public static class UrlHelperExtensions
    {
        public static string EmailConfirmationLink(this IUrlHelper urlHelper, string action, string controller, string userId, string code, string scheme)
        {
            return urlHelper.Action(
                action: action,
                controller: controller,
                values: new { userId, code },
                protocol: scheme);
        }
        //  For reset
        public static string ResetPasswordCallbackLink(this IUrlHelper urlHelper, string action, string controller, string userId, string code, string scheme)
        {
            return urlHelper.Action(
                action: action,
                controller: controller,
                values: new { userId, code },
                protocol: scheme);
        }
    }
}
