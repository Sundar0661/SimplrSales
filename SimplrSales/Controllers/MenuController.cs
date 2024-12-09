using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SimplrSales.Controllers
{
    public class MenuController : Controller
    {
        CommonRule _commonRule = new CommonRule();

        public ActionResult Index()
        {
            return View();
        }

        public string GetMenuHeader()
        {
            Session["IsShowMenu"] = false;
            //var data = _commonRule.getMenuList("CustomerInfo");
            var data = _commonRule.GetMenuConfigList(string.Empty);
            return data;
        }

        public string AssignHtmlMenu(string html)
        {
            Session["HtmlMenu"] = html;
            return string.Empty;
        }
        public JsonResult AssignHtmlMenu1(string html)
        {
            Session["HtmlMenu"] = html;
            return Json(string.Empty);
        }


        public string GetMenuConfig(string screenName)
        {
            var data = _commonRule.GetMenuConfigList(screenName);
            return data;
        }

    }
}