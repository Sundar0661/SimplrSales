using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SimplrSales.Controllers.Form
{
    public class FormController : BusinessRule
    {
        //
        // GET: /Form/

        public ActionResult Form(string screenName)
        {
            ViewBag.ScreenName = screenName;
            ViewBag.Message = TempData["Message"];
            TempData["Message"] = null;
            return View();
        }

        public dynamic arrFormView = string.Empty;
        private dynamic arrListView = string.Empty;

        public ActionResult FormView(string ScreenName, string FormViewData, string ListViewData)
        {
            try
            {
                if (FormViewData != "" && FormViewData != null)
                {
                    arrFormView = JsonConvert.DeserializeObject(FormViewData);
                    arrListView = JsonConvert.DeserializeObject(ListViewData);

                    var query = _commonRule.QueryconfigText(ScreenName);
                    query = formatQueryString(query);
                    var result = _commonRule.getValueList(query);
                      result;

                }

                ViewBag.ScreenName = ScreenName;
                ViewBag.RowItemData = FormViewData;
                return View();
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
            }
            return View();
        }

        public ActionResult ListView(string ScreenName)
        {
            try
            {
                ViewBag.ScreenName = ScreenName;
                return View();
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
            }
            return View();
        }


        public string replaceQuery(string key, string qry)
        {
            try
            {
                if (key.ToUpper().IndexOf("SYSTEM.") > -1)
                {
                    // var keyValue = key.Split(new[] { "SYSTEM." }, StringSplitOptions.RemoveEmptyEntries)[0];
                    var keyValue = key.Split('.')[1];
                    string objKeyValue = arrItems["" + keyValue + ""].ToString();
                    qry = qry.Replace("{" + key + "}", "'" + objKeyValue + "'");
                    return qry;
                }
                else if (key.ToUpper().IndexOf("FORMVIEW.") > -1)
                {
                    var keyValue = key.Split('.')[1];
                    string objKeyValue = arrItems["" + keyValue + ""].ToString();
                    qry = qry.Replace("{" + key + "}", "'" + objKeyValue + "'");
                    return qry;
                }
                else if (key.ToUpper().IndexOf("LISTVIEW.") > -1)
                {
                    var keyValue = key.Split('.')[1];
                    string objKeyValue = arrItems["" + keyValue + ""].ToString();
                    qry = qry.Replace("{" + key + "}", "'" + objKeyValue + "'");
                    return qry;
                }
                else if (key.ToUpper().IndexOf("PARAMS.FORMVIEW.") > -1)
                {
                    var keyValue = key.Split('.')[2];
                    string objKeyValue = arrItems["" + keyValue + ""].ToString();
                    qry = qry.Replace("{" + key + "}", "'" + objKeyValue + "'");
                    return qry;
                }
                else if (key.ToUpper().IndexOf("PARAMS.LISTVIEW.") > -1)
                {
                    var keyValue = key.Split('.')[2];
                    string objKeyValue = arrItems["" + keyValue + ""].ToString();
                    qry = qry.Replace("{" + key + "}", "'" + objKeyValue + "'");
                    return qry;
                }
                else if (key.ToUpper() == "AGENTID")
                {
                    var keyValue = key;
                    string objKeyValue = arrItems["" + keyValue + ""].ToString();
                    qry = qry.Replace("{" + key + "}", "'" + objKeyValue + "'");
                    return qry;
                }
                else
                {
                    string objKeyValue = arrItems["" + key + ""].ToString();
                    qry = qry.Replace("{" + key + "}", "'" + objKeyValue + "'");
                    return qry;
                }
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
            }
            return qry;
        }
        public int lastStartPos = 0;
        public string formatQueryString(string qry)
        {
            if (qry == null)
            {
                return "";
            }
            var startPos = qry.IndexOf('{');
            startPos = qry.IndexOf('{');
            var endPos = 0;
            var keyVal = string.Empty;
            //if (Session["loopExit"].ToString() == "False")
            //    Session["loopExit"] = true;

            while (startPos > -1)
            {
                if (lastStartPos == startPos)
                    startPos = -1;
                else
                {
                    lastStartPos = startPos;
                    endPos = qry.IndexOf('}', startPos + 1);
                    keyVal = qry.Substring(startPos + 1, (endPos - startPos - 1));
                    qry = replaceQuery(keyVal, qry);
                    startPos = qry.IndexOf('{');
                }
            }
            return qry;
        }





    }
}
