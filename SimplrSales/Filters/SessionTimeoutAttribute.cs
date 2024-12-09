using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace SimplrSales.Filters
{
   
    public class SessionTimeoutAttribute : ActionFilterAttribute
    {

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            HttpContext ctx = HttpContext.Current;
            if (HttpContext.Current.Session["UserName"] == null)
            {

                var values = new RouteValueDictionary(new
                {
                    action = "Login",
                    controller = "Login",
                    code = "0"
                });
                filterContext.Result = new RedirectToRouteResult(values);
                
                return;
               
            }
            base.OnActionExecuting(filterContext);

        }

        
    }
}