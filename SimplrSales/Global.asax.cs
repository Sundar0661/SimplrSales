using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
//using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace SimplrSales
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801

    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            WebApiConfig.Register(System.Web.Http.GlobalConfiguration.Configuration);
            //System.Web.Http.GlobalConfiguration.Configure(WebApiConfig.Register);

            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            AuthConfig.RegisterAuth();

        }

        protected void Session_Start(object sender, EventArgs e)
        {
            var SessionTimeOut = System.Configuration.ConfigurationManager.AppSettings["SessionTimeOut"];
            //wsa & poc -- need 4 hours
            if (SessionTimeOut == null)
                SessionTimeOut = "20";
            Session.Timeout = Convert.ToInt16(SessionTimeOut);// 240;// 4 hours
            //Session.Timeout = 30;
        }


        protected void Session_End(object sender, EventArgs e)
        {
            try
            {
                System.Diagnostics.Debug.WriteLine("Session_End");

            }
            catch (Exception ex)
            {
                string exMsg = ex.ToString();
            }
        }

        protected void Application_BeginRequest()
        {
            Response.Cache.SetCacheability(HttpCacheability.NoCache);
            Response.Cache.SetExpires(DateTime.UtcNow.AddHours(5));
            Response.Cache.SetNoStore();
        }
    }
}