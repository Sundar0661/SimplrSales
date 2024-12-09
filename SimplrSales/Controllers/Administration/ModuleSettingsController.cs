using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SimplrSales.Controllers.Administration
{
    public class ModuleSettingsController : Controller
    {
        CommonRule _commonRule = new CommonRule();

        //
        // GET: /ModuleSettins/

        public ActionResult Index()
        {
            if (Session["UserName"] != null)
            {
                TempData["ScreenName"] = Session["ScreenName"].ToString(); ;
                ViewBag.ScreenName = Session["ScreenName"].ToString(); ;
                return View();
            }
            else
                return RedirectToAction("Login", "Login", new { sessionexpired = "sessionexpired" });
        }

        public string GetModuleConfig(string screenName)
        {
            var data = _commonRule.GetModuleConfigList(screenName);
            return data;
        }

        public string GetUserAccessList(string UserId)
        {
            var qry = "select * from useraccess where userId='" + UserId + "'";
            var data = _commonRule.getRowList(qry);
            return data;
        }


        public ActionResult SaveModuleSettingsForm(string[] selected, string UserId)
        {
            try
            {
                var qry = "Delete from  UserAccess where UserID='" + UserId + "' \n";
                for (int i = 0; i < selected.Count(); i++)
                {
                    qry += "insert into UserAccess (UserID,ModuleName) values('" + UserId + "','" + selected[i] + "') \n";
                }
                _commonRule.executerQuery(qry);
                return Json("Module Settings saved successfully!");
            }
            catch (Exception)
            {
                return Json("Module Settings saved error!");
            }
        }


    }
}
