using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OpenIdConnect;
using System.Configuration;

namespace SimplrSales.Controllers
{
    public class HomeController : Controller
    {
        CommonRule _commonRule = new CommonRule();
        BusinessRule _businessRule = new BusinessRule();
        public ActionResult Index()
        {
            BusinessRule.ErrorLogString("MFA SignIn After Redirect URL: Home/Index");
            BusinessRule.ErrorLogString("check  Request.IsAuthenticated : " + Request.IsAuthenticated);
            if (!Request.IsAuthenticated)
            {
                BusinessRule.ErrorLogString("!Request.IsAuthenticated : " + Request.IsAuthenticated);
                return RedirectToAction("SignIn");
            }
            else
            {
                BusinessRule.ErrorLogString("Request.IsAuthenticated : " + Request.IsAuthenticated);
                return RedirectToAction("MFAloginform", "Login");
            }
        }

        public ActionResult SignIndex()
        {
            return View();
        }

        /// <summary>
        /// Send an OpenID Connect sign-in request.
        /// Alternatively, you can just decorate the SignIn method with the [Authorize] attribute
        /// </summary>
        public void SignIn()
        {
            Session["ProjectName"] = ConfigurationManager.AppSettings["ProjectName"];
            BusinessRule.ErrorLogString("MFA SignIn Function");
            TempData["Message"] = "";
            BusinessRule._LogInType = BusinessRule.LogInType.MFA.ToString();
            Session["UserName"] = null;
            Session["Password"] = null;
            Session["ScreenName"] = null;
            Session["IsShowMenu"] = null;
            Session["loopExit"] = false;
            Session["HtmlMenu"] = null;
            Session["UserId"] = null;

            HttpContext.GetOwinContext().Authentication.Challenge(
               new AuthenticationProperties { RedirectUri = "/" },
               OpenIdConnectAuthenticationDefaults.AuthenticationType);
        }

        /// <summary>
        /// Send an OpenID Connect sign-out request.
        /// </summary>
        /// 
        public void SignOut()
        {
            try
            {
                BusinessRule.ErrorLogString("MFA SignOut Function");
                TempData["Message"] = "";
                Session["UserName"] = null;
                Session["Password"] = null;
                Session["ScreenName"] = null;
                Session["IsShowMenu"] = null;
                Session["loopExit"] = false;
                Session["HtmlMenu"] = null;
                Session["UserId"] = null;

                Session.Clear();
                Session.Abandon();
                Response.Cookies.Add(new HttpCookie("ASP.NET_SessionId", ""));
                //
                System.Web.Security.FormsAuthentication.SignOut();
                System.Web.HttpContext.Current.User = new System.Security.Principal.GenericPrincipal(new System.Security.Principal.GenericIdentity(string.Empty), null);

                HttpContext.GetOwinContext().Authentication.SignOut(
                    OpenIdConnectAuthenticationDefaults.AuthenticationType,
                    CookieAuthenticationDefaults.AuthenticationType);

                BusinessRule.ErrorLogString("MFA SignOut Function end");
            }
            catch (Exception ex)
            {
                BusinessRule.ErrorLogString("ex: " + ex.Message);
            }
        }

        public void EndSession()
        {
            Request.GetOwinContext().Authentication.SignOut();
            this.HttpContext.GetOwinContext().Authentication.SignOut(CookieAuthenticationDefaults.AuthenticationType);
        }



        [HttpPost]
        public JsonResult Index1(string Prefix)
        {
            //Note : you can bind same list from database  
            List<City> ObjList = new List<City>()
            {

                new City {Id=1,ItemNo="Latur" },
                new City {Id=2,ItemNo="Mumbai" },
                new City {Id=3,ItemNo="Pune" },
                new City {Id=4,ItemNo="Delhi" },
                new City {Id=5,ItemNo="Dehradun" },
                new City {Id=6,ItemNo="Noida" },
                new City {Id=7,ItemNo="New Delhi" }

        };
            //Searching records from list using LINQ query  
            var CityList = (from N in ObjList
                            where N.ItemNo.StartsWith(Prefix)
                            select new { N.ItemNo });
            return Json(CityList, JsonRequestBehavior.AllowGet);
        }
        public ActionResult About()
        {
            ViewBag.Message = "Your app description page.";
            return View();
        }
        public ActionResult Map()
        {
            return View();
        }
        public ActionResult MapRoute()
        {
            return View();
        }
        public ActionResult SpeedLimits()
        {
            return View();
        }
        public ActionResult MapDirections()
        {
            return View();
        }
        public ActionResult RoadsInspector()
        {
            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        public ActionResult Form()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }


    public class TestModel
    {
        public int CustId { get; set; }
        public int CustName { get; set; }
        public int CustAddress { get; set; }
        public int PhoneNumber { get; set; }
    }

    public class City
    {

        public int Id { get; set; }
        public string ItemNo { get; set; }
    }
}
