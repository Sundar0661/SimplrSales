using Microsoft.IdentityModel.Protocols;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SimplrSales.Controllers.Inventory
{
    public class OrderAssignmentController : Controller
    {
        //
        // GET: /OrderAssignment/
 
        public ActionResult Index()
        {
            //  CreateExcel();
            if (Session["UserName"] != null)
            {
                TempData["ScreenName"] = Session["ScreenName"].ToString(); ;

                // FOR POC VEHICLE ASSIGNMENT ORDER REFRESHING PURPOSE ==========================================
                ViewBag.IntervalTime = ConfigurationManager.AppSettings["IntervalTime_POC_VEHICLE_ASSIGNMENT"] != null ? ConfigurationManager.AppSettings["IntervalTime_POC_VEHICLE_ASSIGNMENT"] : "30000";
                // FOR POC VEHICLE ASSIGNMENT ORDER REFRESHING PURPOSE ==========================================

                ViewBag.ScreenName = Session["ScreenName"].ToString();
                ViewBag.Google_APIKey = ConfigurationManager.AppSettings["Google_APIKey"] != null ? ConfigurationManager.AppSettings["Google_APIKey"] : "AIzaSyDI9hx4Xgpd5p5p_H_7Uu0vQTCX4nIiyJk";
                return View();
            }
            else
                return RedirectToAction("Login", "Login", new { sessionexpired = "sessionexpired" });
        }
    }
}
