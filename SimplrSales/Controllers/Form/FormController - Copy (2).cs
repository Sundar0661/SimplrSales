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

        public dynamic FormView = string.Empty;
        public dynamic arrFormView = string.Empty;
        private dynamic arrListView = string.Empty;
        private dynamic arrObj = string.Empty;

        public ActionResult FormViewList(string ScreenName, string FieldName, string ObjData)
        {
            try
            {
                if (ObjData != "" && ObjData != null)
                {
                    FormView = JsonConvert.DeserializeObject(ObjData);
                    // FormView = arrObj;
                    // arrListView = arrObj["" + FieldName + ""];
                    //arrFormView = JsonConvert.DeserializeObject(FormView);
                    //  arrListView = JsonConvert.DeserializeObject(ListView);

                    var query = _commonRule.QueryconfigText(ScreenName + "_FORM");
                    query = formatQueryString(query, FieldName);
                    var result = _commonRule.getValueList(query);
                    ViewBag.FormData = result;
                    Params.FormView = FormView;
                }
                else
                {
                    Params = string.Empty;
                }

                ViewBag.ScreenName = ScreenName;
                //  ViewBag.RowItemData = ListView;
                return View();
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
            }
            return View();
        }


        //  public ActionResult FormView(string ScreenName, string FieldName, string FormView, string ListView, string ObjData)
        public ActionResult FormViewOld(string ScreenName, string FieldName, string ObjData)
        {
            try
            {
                if (ObjData != "" && ObjData != null)
                {
                    arrObj = JsonConvert.DeserializeObject(ObjData);
                    arrFormView = arrObj;
                    arrListView = arrObj["" + FieldName + ""];
                    //arrFormView = JsonConvert.DeserializeObject(FormView);
                    //  arrListView = JsonConvert.DeserializeObject(ListView);

                    var query = _commonRule.QueryconfigText(ScreenName + "_FORM");
                    query = formatQueryString(query, FieldName);
                    var result = _commonRule.getValueList(query);
                    ViewBag.FormData = result;
                }

                Params.FormView = arrFormView;
                ViewBag.ScreenName = ScreenName;
                //  ViewBag.RowItemData = ListView;
                return View();
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
            }
            return View();
        }



        public string replaceQuery(string key, string qry, string FieldName)
        {
            try
            {
                if (key.ToUpper().IndexOf("SYSTEM.") > -1)
                {
                    var keyValue = key.Split('.')[1];
                    string objKeyValue = SystemConfig["" + keyValue + ""].ToString();
                    qry = qry.Replace("{" + key + "}", "'" + objKeyValue + "'");
                    return qry;
                }
                else if (key.ToUpper().IndexOf("FORMVIEW.") > -1)
                {
                    var keyValue = key.Split('.')[1];
                    string objKeyValue = FormView["" + keyValue + ""].ToString();
                    qry = qry.Replace("{" + key + "}", "'" + objKeyValue + "'");
                    return qry;
                }
                else if (key.ToUpper().IndexOf("LISTVIEW.") > -1)
                {
                    var keyValue = key.Split('.')[1];
                    // string objKeyValue = arrListView["" + keyValue + ""].ToString();
                    string objKeyValue = FormView["" + FieldName + ""]["" + keyValue + ""].ToString();
                    qry = qry.Replace("{" + key + "}", "'" + objKeyValue + "'");
                    return qry;
                }
                else if (key.ToUpper().IndexOf("PARAMS.FORMVIEW") > -1)
                {
                    var keyValue = key.Split('.')[1];
                    // string objKeyValue = arrListView["" + keyValue + ""].ToString();
                    string objKeyValue = Params.FormView["" + keyValue + ""].ToString();
                    qry = qry.Replace("{" + key + "}", "'" + objKeyValue + "'");
                    return qry;
                }
                else if (key.ToUpper().IndexOf("PARAMS.LISTVIEW") > -1)
                {
                    var keyValue = key.Split('.')[1];
                    // string objKeyValue = arrListView["" + keyValue + ""].ToString();
                    string objKeyValue = Params.FormView["" + FieldName + ""]["" + keyValue + ""].ToString();
                    qry = qry.Replace("{" + key + "}", "'" + objKeyValue + "'");
                    return qry;
                }
                else
                {
                    string objKeyValue = arrListView["" + key + ""].ToString();
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
        public string formatQueryString(string qry, string FieldName)
        {
            if (qry == null)
            {
                return "";
            }
            var startPos = qry.IndexOf('{');
            startPos = qry.IndexOf('{');
            var endPos = 0;
            var keyVal = string.Empty;

            while (startPos > -1)
            {
                if (lastStartPos == startPos)
                    startPos = -1;
                else
                {
                    lastStartPos = startPos;
                    endPos = qry.IndexOf('}', startPos + 1);
                    keyVal = qry.Substring(startPos + 1, (endPos - startPos - 1));
                    qry = replaceQuery(keyVal, qry, FieldName);
                    startPos = qry.IndexOf('{');
                }
            }
            return qry;
        }





    }
}
