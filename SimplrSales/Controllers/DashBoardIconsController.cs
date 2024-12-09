using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SimplrSales.Controllers
{
    public class DashBoardIconsController : Controller
    {
        CommonRule _commonRule = new CommonRule();

        public ActionResult Index()
        {
            return View();
        }

        public string GetDashList()
        {

            var data = _commonRule.getDashList("dashboard", "MAIN");

            return data;
        }

       

    }
}
