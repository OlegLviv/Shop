using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace BLL.Filters.ActionFilters
{
    public class ModelStateFilter : ActionFilterAttribute
    {
        public string Message { get; set; } = "Invalid model";

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if (!context.ModelState.IsValid)
            {
                context.Result = new BadRequestObjectResult(new { Message = Message, State = context.ModelState });
            }
        }
    }
}
