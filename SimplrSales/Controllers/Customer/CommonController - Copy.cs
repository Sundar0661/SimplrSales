using Newtonsoft.Json;
//using Rotativa;
//using Rotativa.Options;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Configuration;
using System.Data.SqlClient;
using SimplrSales.Models;
using System.IO;
using System.Diagnostics;
using Excel1 = Microsoft.Office.Interop.Excel;

namespace SimplrSales.Controllers.Customer
{
    [Filters.SessionTimeout]
    public class CommonController : BusinessRule
    {
        public dynamic jsonObj = string.Empty;
        private dynamic arrItems = string.Empty;
        private dynamic Params = string.Empty;
        public static string formReplacedDatas = string.Empty;
        public string message = string.Empty;

        public string constr = string.Empty;
        private SqlConnection con;

        //To Handle connection related activities
        private void connection()
        {
            constr = ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString();
            con = new SqlConnection(constr);
        }


        // COMMENTED PURPOSE OF AUTO LOGOUT 21.10.2020 ===================================
        //public ActionResult KeepSessionAlive()
        //{
        //    Session["init"] = "session start";
        //    //Convert.ToString((Session.Timeout * 60) - 60)
        //    //// Refresh this page 60 seconds before session timeout, effectively resetting the session timeout counter.
        //    string sContent = Convert.ToString((Session.Timeout * 60) - 60); 
        //    Response.AddHeader("Refresh", sContent);
        //    return View();

        //}

        // COMMENTED PURPOSE OF AUTO LOGOUT 21.10.2020 ===================================


        public JsonResult CheckSessionExpired()
        {
            if (Session["ScreenName"] == null)
                return Json("sessionexpired");
            else
                return Json("");
        }
        public ActionResult Index(string screenName)
        {

            if (Session["ScreenName"] != null)
            {
                ViewBag.ScreenName = Session["ScreenName"];
                ViewBag.Message = TempData["Message"];
                TempData["Message"] = null;
                return View();
            }
            else
            {
                return RedirectToAction("Login", "Login");
            }
        }
        public ActionResult ListConfig(string screenName)
        {

            if (screenName != null)
            {
                ViewBag.ScreenName = screenName;
                ViewBag.Message = null;
                return View("Index");
            }
            else
            {
                return RedirectToAction("Login", "Login");
            }
        }


        public ActionResult GetIndex(string screenName, string InsertUpdateMessage, string MenuId, string Count)
        {

            Session["ScreenName"] = screenName;
            Session["ActiveMenu"] = screenName + "$" + MenuId + "$" + Count;
            TempData["Message"] = InsertUpdateMessage;
            if (MenuId.Split('_')[0] == "Reports")
                return RedirectToAction("Report");
            else
                return RedirectToAction("Index");
        }

        public ActionResult Create()
        {
            if (Session["ScreenName"] != null)
            {
                ViewBag.ScreenName = Session["ScreenName"];
                return View();
            }
            else
            {
                return RedirectToAction("Login", "Login");
            }
            //ViewBag.ScreenName = screenName;
            //return View();
        }
        public ActionResult FormConfig(string screenName)
        {

            ViewBag.ScreenName = screenName;
            return View();
        }



        public ActionResult GetCreate(string screenName)
        {
            Session["ScreenName"] = screenName;
            return RedirectToAction("Create");
        }

        public ActionResult Edit()
        {
            if (Session["ScreenName"] != null)
            {
                ViewBag.ScreenName = Session["ScreenName"];
                ViewBag.EditId = Session["EditId"];
                ViewBag.RowItemData = Session["data"];
                return View();
            }
            else
            {
                return RedirectToAction("Login", "Login");
            }
        }
        public ActionResult GetEdit(string screenName, string Id)
        //public ActionResult GetEdit(string screenName, string data)
        {
            Session["ScreenName"] = screenName;
            Session["EditId"] = Id;
            Session["data"] = formReplacedDatas;
            return RedirectToAction("Edit");
        }

        public ActionResult Details()
        {
            if (Session["ScreenName"] != null)
            {
                ViewBag.ScreenName = Session["ScreenName"];
                ViewBag.ViewId = Session["ViewId"];
                return View();
            }
            else
            {
                return RedirectToAction("Login", "Login");
            }
        }
        public ActionResult GetDetails(string screenName, string Id)
        {
            Session["ScreenName"] = screenName;
            Session["ViewId"] = Id;
            return RedirectToAction("Details");
        }

        public JsonResult GetQueryConfigByScreenName(string ScreenName)
        {
            try
            {
                if (Session["UserName"] != null)
                {
                    var textQuery = _commonRule.QueryconfigText(ScreenName);
                    return Json(textQuery);
                }
                else
                {
                    return Json("sessionexpired");
                }
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                return Json("");
            }
        }

        public string GetTabGroupMenuList(string ScreenName)
        {

            try
            {
                var textQuery = _commonRule.QueryconfigText("" + ScreenName + "_FORM_TABGROUP");
                var data = _commonRule.getRowList(textQuery);
                return data;
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                return string.Empty;
            }
        }

        public string GetTabGroupFormList(string ScreenName, string id)
        {

            try
            {
                var data = _commonRule.GetFormList("" + ScreenName + "_" + id, Session["AccessLevel"].ToString());
                return data;
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                return string.Empty;
            }
        }

        public string GetFormConfigList(string ScreenName)
        {

            try
            {

                var data = _commonRule.GetFormList(ScreenName, Session["AccessLevel"].ToString());
                return data;
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                return string.Empty;
            }
        }


        public string SearchConfig(string ScreenName)
        {

            try
            {
                var query = "select * from SearchConfig where  ScreenName = '" + ScreenName + "'   order by displayno";
                var data = _commonRule.getValueList(query);
                return data;
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                return string.Empty;
            }
        }

        public string GetDropDownListValue(string data, string ScreenName, string id, string FormList)
        {

            try
            {
                var query = string.Empty;
                //var query = _commonRule.QueryconfigText("NewCustomer_FORM_COMBOBOX_DeptCode");
                if (FormList == "List")
                    query = _commonRule.QueryconfigText("" + ScreenName + "_COMBOBOX_" + id);
                else
                    query = _commonRule.QueryconfigText("" + ScreenName + "_FORM_COMBOBOX_" + id);
                if (data != "")
                    arrItems = JsonConvert.DeserializeObject(data);
                query = formatQueryString(query);
                return _commonRule.getValueList(query.Replace("||", "+"));
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                return string.Empty;
            }
        }

        public string GetListConfigDropDownValue(string ScreenName, string id)
        {

            try
            {
                //var query = _commonRule.QueryconfigText("NewCustomer_FORM_COMBOBOX_DeptCode");
                var query = _commonRule.QueryconfigText("" + ScreenName + "_LIST_COMBOBOX_" + id);
                var data = _commonRule.getValueList(query.Replace("||", "+"));
                return data;
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                return string.Empty;
            }
        }
        public string GetSearchDropDownListValue(string ScreenName, string id)
        {

            try
            {
                var query = _commonRule.QueryconfigText("" + ScreenName + "_SEARCH_COMBOBOX_" + id);
                var data = _commonRule.getValueList(query.Replace("||", "+"));
                return data;
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                return string.Empty;
            }
        }

        public string GetRadioButtonListValue(string ScreenName, string id)
        {
            try
            {
                //CustomerPrice_FORM_RADIOBUTTON_Salestype
                var query = _commonRule.QueryconfigText("" + ScreenName + "_FORM_RADIOBUTTON_" + id);
                var data = _commonRule.getValueList(query.Replace("||", "+"));
                return data;
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                return string.Empty;
            }
        }

        public ActionResult ExecuteReader(string query)
        {
            try
            {
                query = AESEncrytDecry.DecryptStringAES(query);//encript

                var modelList = new List<ExecuteReaderList>();
                // query = "select Distinct  VM.TransNo as [Transaction No],Format(VM.TransDate,'dd/MM/yyyy') as [Transaction Date],VM.CustNO as [Customer No],ISNULL(C.CustName,N.StoreName) as [Customer Name],VM.AgentID as [Agent ID],ISNULL(VM.ActivityCode,'') as [Activity Code],ISNULL(A.ActivityName,'') as [Activity Name],ISNULL(VM.SchemeCode,'') as [Scheme Code] ,ISNULL(VM.Atype,'') as [Activity Type],ISNULL(U.[FileName],'') as [File Name] from V5_ActivityMonitoringHeader VM Left join Customer C on C.CustNo=VM.CustNo Left join V5_NewCustomer N on N.CustNo=VM.CustNo Left Join V5_TEPActivity A on A.ActivityCode =VM.ActivityCode Left join uploadphoto U on U.FileName Like '%' + VM.TransNo + '%' Order by TransNo";
                var data = _commonRule.ExecuteReader(query, modelList);
                return Json(data);
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                return Json(string.Empty);
            }
        }
        public string GetFormToCopyFields(string ScreenName, string id)
        {
            try
            {
                var query = _commonRule.QueryconfigText("" + ScreenName + "_FORM_OPTION_" + id);
                var data = _commonRule.getValueList(query.Replace("||", "+"));
                return data;
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                return string.Empty;
            }
        }

        public string GetListConfig(string ScreenName, string FieldName, string Qry)
        {
            try
            {

                if (FieldName != null && FieldName != "")
                    ScreenName = ScreenName + "_LISTVIEW_" + FieldName;
                var data = _commonRule.getHeaderList(ScreenName, Session["AccessLevel"].ToString(), Qry);
                return data;
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                return string.Empty;
            }
        }

        public string GetLookUpListConfig(string ScreenName, string FieldName)
        {
            try
            {
                if (FieldName != null && FieldName != "")
                    ScreenName = ScreenName + "_FORM_LOOKUP_LISTVIEW_" + FieldName;
                var data = _commonRule.getHeaderList(ScreenName, Session["AccessLevel"].ToString(), "");
                return data;
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                return string.Empty;
            }
        }
        public JsonResult ListExport(string data, string Param, string ScreenName, string searchOption, string FieldName, string ActionType, string SortOption, string defaultValue, string newText)
        {
            try
            {
                _userId = Session["UserId"].ToString();
                var _screenName = ScreenName;
                var screenName = string.Empty;
                if (FieldName != null && FieldName != "")
                    screenName = ScreenName + "_LISTVIEW_" + FieldName;
                if (ActionType == "LOOKUP") //temp
                    screenName = ScreenName + "_FORM_LOOKUP_LISTVIEW_" + FieldName;
                screenName = screenName == "" ? ScreenName : screenName;
                ScreenName = screenName;

                if (data != "")
                    arrItems = JsonConvert.DeserializeObject(data);
                if (Param != "")
                    Params = JsonConvert.DeserializeObject(Param);
                //////////////

                var query = string.Empty;
                var queryText = string.Empty;
                string orderby = string.Empty;
                string groupby = string.Empty;
                queryText = _commonRule.QueryconfigForList(ScreenName, ref orderby, ref groupby);
                if (SortOption == "")
                    query = queryText + " " + searchOption + " " + groupby + " " + orderby;
                else
                {
                    query = queryText + " " + searchOption + "  order by" + SortOption;
                }

                JavaScriptErrorLog("Get List Query----->" + query, "");
                query = formatQueryString(query);
                JavaScriptErrorLog("Get List Query----->" + query, "");

                query = _commonRule.ExecuteListStoreProducture(query, _screenName);

                var dataList = _commonRule.getDataTableList(query);
                JavaScriptErrorLog("getDataTableList----->" + dataList, "");

                DataTable dt = new DataTable();
                dt = dataList;

                String downloadList = ConfigurationManager.AppSettings["DownloadList"];
                String downloadListReplace = downloadList.Replace("~", "..");
                string fileLocation = Server.MapPath(downloadList);
                if (!Directory.Exists(fileLocation))  // if it doesn't exist, create
                    Directory.CreateDirectory(fileLocation);
                newText = newText == "" ? _screenName : newText;
                var sheetName = newText + "_" + _userId + "_" + DateTime.Now.ToString("ddMMyyyyHHmmss") + ".XLSX";
                var fullPath = fileLocation + "" + sheetName;
                FileInfo srcfileInfo = new FileInfo(fullPath);
                object obj = System.Reflection.Missing.Value;

                var excelApp = new Excel1.Application();
                var wb = excelApp.Workbooks.Add(obj);

                ///
                var colCount = 1;
                var rowCount = 2;
                Excel1._Worksheet workSheet = (Excel1.Worksheet)wb.Worksheets.Add();
                if (defaultValue != "" && defaultValue != null)
                    workSheet.Name = defaultValue;
                foreach (DataColumn col in dt.Columns)
                {
                    workSheet.Cells[1, colCount] = col.ColumnName;
                    colCount++;
                }

                string[,] ranges = new string[dt.Rows.Count, dt.Columns.Count];
                rowCount = 0;
                foreach (DataRow dr in dt.Rows)
                {
                    // colCount = 1;
                    colCount = 0;
                    foreach (DataColumn col in dt.Columns)
                    {
                        // workSheet.Cells[rowCount, colCount] = dr[col].ToString();
                        //ranges[rowCount, colCount] = dr[col].ToString();
                        ranges[rowCount, colCount] = dr[col].ToString();
                        colCount++;
                    }
                    rowCount++;
                }
                workSheet.Range["A2:" + GetExcelColumnName(dt.Columns.Count) + (dt.Rows.Count + 1)].Value = ranges;

                wb.SaveAs(srcfileInfo.FullName);
                wb.Close();
                excelApp.Quit();
                System.Runtime.InteropServices.Marshal.ReleaseComObject(excelApp);

                return Json(downloadListReplace + "" + sheetName);
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                return Json(ex);
            }
        }

        private string GetExcelColumnName(int columnNumber)
        {
            int dividend = columnNumber;
            var columnName = String.Empty;
            int modulo;
            while (dividend > 0)
            {
                modulo = (dividend - 1) % 26;
                columnName = Convert.ToChar(65 + modulo).ToString() + columnName;
                dividend = ((dividend - modulo) / 26);
            }
            return columnName;
        }

        public JsonResult ExportGetListValue(string qry, int? pageNumber, string searchOption, string SortOption)
        {
            try
            {
                qry = AESEncrytDecry.DecryptStringAES(qry);//encript
                var screenName = string.Empty;
                //////////////
                var systemlistQry = "select SystemValue from systemlist where code ='PaginationLimit' and SolutionName='" + _solutionName + "'";
                var systemValue = _commonRule.getQueryString(systemlistQry);
                int PageSize = Convert.ToInt32(systemValue);

                var PageNumber = (pageNumber == null ? 1 : Convert.ToInt32(pageNumber));

                var query = string.Empty;
                var queryText = string.Empty;
                string orderby = string.Empty;
                string groupby = string.Empty;
                //queryText = _commonRule.ExportQueryconfigForList(qry, ref orderby, ref groupby);
                queryText = qry;
                if (SortOption == "")
                    query = queryText + " " + searchOption;
                else
                {
                    if (SortOption.ToLower().Split(new[] { "order by" }, StringSplitOptions.None).Count() == 2)
                        query = queryText + " " + searchOption + " " + SortOption;
                    else
                        query = queryText + " " + searchOption + "  order by" + SortOption;
                }

                query = query + " offset  " + ((PageNumber - 1) * PageSize) + "  rows Fetch next " + PageSize + " rows only"; //' limit 0, 100';


                JavaScriptErrorLog("Get List Query----->" + query, "");
                // query = formatQueryString(query);
                var dataList = _commonRule.getValueList(query);
                JavaScriptErrorLog("Get List Value----->" + query, "");
                var qrytext = queryText.Split(new string[] { "order by" }, StringSplitOptions.None)[0];
                var countQuery = formatQueryString("select floor(count(*) /" + PageSize + ") + case when (count(*) %" + PageSize + ") = 0 then 0 else 1 end  as cnt from (" + qrytext + " " + searchOption + ") rs");
                var countRows = _commonRule.getValueList(countQuery);
                JavaScriptErrorLog("Get List   Count rows----->" + countRows, "");

                var result = (new
                {
                    List = dataList,
                    countRows = countRows,
                });

                //
                // return dataList;
                return Json(result);
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                return Json(ex);
            }
        }


        public JsonResult TempStoreFormView(string data)
        {
            CommonRule.QueryLog("TempStoreFormView : " + data);
            try
            {
                if (data != "")
                {
                    Session["TempStoreFormView"] = data;
                    return Json("");
                }
                else
                {
                    var tempFormView = Session["TempStoreFormView"];
                    Session["TempStoreFormView"] = "";
                    return Json(tempFormView);
                }
            }
            catch (Exception ex)
            {
                CommonRule.QueryLog("TempStoreFormView error: " + ex.Message);
                return Json("error $ " + ex.Message);
            }
        }
        public JsonResult TestLoopFun(int a, int b, int y)
        {
            int x = 0;
            for (int i = 0; i < a; i++)
            {
                x = i;
                for (int j = 0; j < b; j++)
                {
                    x = x + j;
                }
            }
            return Json(y);
        }

        public JsonResult GetPaginationValue()
        {
            var systemValue = _commonRule.getPaginationValue(_solutionName);
            return Json(systemValue);
        }
        public static int _PageSize = 10;
        public JsonResult GetListQuery(string ScreenName, int? pageNumber, string searchOption, string id, string FieldName, string ActionType, string SortOption, bool isdynamic, bool ispagination)
        {
            try
            {
                var _screenName = ScreenName;
                var screenName = string.Empty;

                if (FieldName != null && FieldName != "")
                    screenName = ScreenName + "_LISTVIEW_" + FieldName;
                if (ActionType == "LOOKUP") //temp
                    screenName = ScreenName + "_FORM_LOOKUP_LISTVIEW_" + FieldName;
                screenName = screenName == "" ? ScreenName : screenName;
                ScreenName = screenName;

                var systemValue = "10";// _commonRule.getPaginationValue(_solutionName);
                if (Session["PaginationValue"] == null)
                {
                    systemValue = _commonRule.getPaginationValue(_solutionName);
                    Session["PaginationValue"] = systemValue;
                }
                else
                    systemValue = Session["PaginationValue"].ToString();

                int PageSize = systemValue == "" ? 10 : Convert.ToInt32(systemValue);
                _PageSize = PageSize;
                var PageNumber = (pageNumber == null ? 1 : Convert.ToInt32(pageNumber));

                var query = string.Empty;
                var cntQuery = string.Empty;
                var queryText = string.Empty;
                string orderby = string.Empty;
                string groupby = string.Empty;
                queryText = _commonRule.QueryconfigForList(ScreenName, ref orderby, ref groupby);
                if (SortOption == "")
                {
                    //Newly addded by.M 02.09.2021 - if logic only
                    if (queryText.IndexOf("exec ") >= 0)
                    {
                        query = queryText + ", '" + searchOption.Replace("'%", "''%").Replace("%'", "%''") + " " + groupby + " " + orderby + "'";
                        if (query.Split('{').Count() == 1)
                            query = query.Replace(",", "");
                    }
                    else
                        query = queryText + " " + searchOption + " " + groupby + " " + orderby;
                }
                else
                {
                    if (queryText.IndexOf("exec ") >= 0)
                    {
                        query = queryText + ", '" + searchOption.Replace("'%", "''%").Replace("%'", "%''") + " " + groupby + " order by" + SortOption + "'";
                    }
                    else
                        query = queryText + " " + searchOption + " " + groupby + " order by" + SortOption;
                }
                cntQuery = query;
                //select  * from  customer order by custNo offset 10 rows Fetch next 10 rows only


                if (ScreenName.Split(new string[] { "Form_LISTVIEW" }, StringSplitOptions.None).Count() > 1 || ScreenName.Split(new string[] { "LISTVIEW" }, StringSplitOptions.None)[0].Split('_').Count() == 3)
                {
                    if (ispagination == true && queryText.IndexOf("exec ") >= 0)
                    {
                        query = query + "," + "' offset  " + ((PageNumber - 1) * PageSize) + "  rows Fetch next " + PageSize + " rows only'"; //' limit 0, 100';
                        cntQuery = cntQuery + ",''";
                    }
                    else if (ispagination == false && queryText.IndexOf("exec ") >= 0)
                    {
                        query = query + "," + "' offset  " + ((PageNumber - 1) * PageSize) + "  rows Fetch next " + PageSize + " rows only'"; //' limit 0, 100';
                        cntQuery = cntQuery + ",''";
                    }
                    else if (ispagination == true)
                        query = query + " offset  " + ((PageNumber - 1) * PageSize) + "  rows Fetch next " + PageSize + " rows only"; //' limit 0, 100';
                }
                else
                {
                    if (ScreenName.Split(new string[] { "LISTVIEW" }, StringSplitOptions.None)[0].Split('_').Count() == 2 && queryText.IndexOf("exec ") >= 0)
                    {
                        query = query + "," + "' offset  " + ((PageNumber - 1) * PageSize) + "  rows Fetch next " + PageSize + " rows only'"; //' limit 0, 100';
                        cntQuery = cntQuery + ",''";
                    }
                    else
                        query = query + " offset  " + ((PageNumber - 1) * PageSize) + "  rows Fetch next " + PageSize + " rows only"; //' limit 0, 100';

                }
                //var countQuery = "select floor(count(*) /" + PageSize + ") + case when (count(*) %" + PageSize + ") = 0 then 0 else 1 end  as cnt from (" + queryText + " " + searchOption + " " + groupby + ") rs";
                var countQuery = queryText + " " + searchOption + " " + groupby;
                var result = (new
                {
                    query = query,
                    countQuery = countQuery,
                    cntQuery = cntQuery
                });
                return Json(result);
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                return Json(ex);
            }
        }


        public JsonResult GetListValue(string query, string countQuery, string cntQuery, string ScreenName, string FieldName, string ActionType, bool ispagination)
        {
            try
            {
                //var isFil = false;
                //if (isFil)
                //{
                //    exportxlfie(AESEncrytDecry.DecryptStringAES(query));
                //}


                query = AESEncrytDecry.DecryptStringAES(query);//encript
                countQuery = AESEncrytDecry.DecryptStringAES(countQuery);//encript
                cntQuery = AESEncrytDecry.DecryptStringAES(cntQuery);//encript
                countQuery = "select floor(count(*) /" + _PageSize + ") + case when (count(*) %" + _PageSize + ") = 0 then 0 else 1 end  as cnt from (" + countQuery + ") rs";
                var _screenName = ScreenName;
                var screenName = string.Empty;

                if (FieldName != null && FieldName != "")
                    screenName = ScreenName + "_LISTVIEW_" + FieldName;
                if (ActionType == "LOOKUP") //temp
                    screenName = ScreenName + "_FORM_LOOKUP_LISTVIEW_" + FieldName;
                screenName = screenName == "" ? ScreenName : screenName;
                ScreenName = screenName;

                var dataList = _commonRule.getValueList(query);
                var countRows = _commonRule.getValueList(countQuery);

                if (ScreenName.Split(new string[] { "Form_LISTVIEW" }, StringSplitOptions.None).Count() > 1 || cntQuery.IndexOf("exec ") >= 0)
                {
                    ////
                    if (ispagination == true || cntQuery.IndexOf("exec ") >= 0)
                    {
                        var PaginationValue = Session["PaginationValue"];
                        DataTable dt = new DataTable();
                        dt = _commonRule.getDataTableList(cntQuery);
                        var paginationCnt = dt.Rows.Count;
                        //countQuery = "select floor(" + paginationCnt + " / 10) + case when(" + paginationCnt + " % 10) = 0 then 0 else 1 end as cnt";
                        countQuery = "select floor(" + paginationCnt + " / " + PaginationValue + ") + case when(" + paginationCnt + " %  " + PaginationValue + ") = 0 then 0 else 1 end as cnt";
                        countRows = _commonRule.getValueList(countQuery);
                    }
                    else
                    {
                        countRows = "[{\"cnt\":0}]";
                    }
                }

                var result = (new
                {
                    List = dataList,
                    countRows = countRows,
                });

                return Json(result);
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                return Json(ex);
            }
        }
        public JsonResult GetListValue_05052022(string data, string Param, string ScreenName, int? pageNumber, string searchOption, string id, string FieldName, string ActionType, string SortOption, bool isdynamic, bool ispagination)
        {
            try
            {
                data = System.Net.WebUtility.UrlDecode(data);
                Param = System.Net.WebUtility.UrlDecode(Param);
                var _screenName = ScreenName;
                var screenName = string.Empty;

                // FOR THAI LANGUAGE PURPOSE
                //Param = System.Web.HttpUtility.UrlDecode(Param);
                //data = System.Web.HttpUtility.UrlDecode(data);


                if (FieldName != null && FieldName != "")
                    screenName = ScreenName + "_LISTVIEW_" + FieldName;
                if (ActionType == "LOOKUP") //temp
                    screenName = ScreenName + "_FORM_LOOKUP_LISTVIEW_" + FieldName;
                screenName = screenName == "" ? ScreenName : screenName;
                ScreenName = screenName;

                if (data != "")
                    arrItems = JsonConvert.DeserializeObject(data);
                if (Param != "")
                    Params = JsonConvert.DeserializeObject(Param);

                var systemValue = "10";// _commonRule.getPaginationValue(_solutionName);
                if (Session["PaginationValue"] == null)
                {
                    systemValue = _commonRule.getPaginationValue(_solutionName);
                    Session["PaginationValue"] = systemValue;
                }
                else
                    systemValue = Session["PaginationValue"].ToString();

                int PageSize = systemValue == "" ? 10 : Convert.ToInt32(systemValue);
                var PageNumber = (pageNumber == null ? 1 : Convert.ToInt32(pageNumber));

                var query = string.Empty;
                var cntQuery = string.Empty;
                var queryText = string.Empty;
                string orderby = string.Empty;
                string groupby = string.Empty;
                queryText = _commonRule.QueryconfigForList(ScreenName, ref orderby, ref groupby);
                if (SortOption == "")
                {
                    //Newly addded by.M 02.09.2021 - if logic only
                    if (queryText.IndexOf("exec ") >= 0)
                    {
                        query = queryText + ", '" + searchOption.Replace("'%", "''%").Replace("%'", "%''") + " " + groupby + " " + orderby + "'";
                    }
                    else
                        query = queryText + " " + searchOption + " " + groupby + " " + orderby;
                }
                else
                {
                    if (queryText.IndexOf("exec ") >= 0)
                    {
                        query = queryText + ", '" + searchOption.Replace("'%", "''%").Replace("%'", "%''") + " " + groupby + " order by" + SortOption + "'";
                    }
                    else
                        query = queryText + " " + searchOption + " " + groupby + " order by" + SortOption;
                }
                cntQuery = query;
                //select  * from  customer order by custNo offset 10 rows Fetch next 10 rows only


                if (ScreenName.Split(new string[] { "Form_LISTVIEW" }, StringSplitOptions.None).Count() > 1 || ScreenName.Split(new string[] { "LISTVIEW" }, StringSplitOptions.None)[0].Split('_').Count() == 3)
                {
                    if (ispagination == true && queryText.IndexOf("exec ") >= 0)
                    {
                        query = query + "," + "' offset  " + ((PageNumber - 1) * PageSize) + "  rows Fetch next " + PageSize + " rows only'"; //' limit 0, 100';
                        cntQuery = cntQuery + ",''";
                    }
                    else if (ispagination == true)
                        query = query + " offset  " + ((PageNumber - 1) * PageSize) + "  rows Fetch next " + PageSize + " rows only"; //' limit 0, 100';

                    //if (isdynamic == false)
                    //    query = query + " offset  " + ((PageNumber - 1) * PageSize) + "  rows Fetch next " + PageSize + " rows only"; //' limit 0, 100';
                }
                else
                    query = query + " offset  " + ((PageNumber - 1) * PageSize) + "  rows Fetch next " + PageSize + " rows only"; //' limit 0, 100';


                JavaScriptErrorLog("Get List Query----->" + query, "");

                query = formatQueryString(query);
                var dataList = _commonRule.getValueList(query);
                JavaScriptErrorLog("Get List Value----->" + query, "");

                var countQuery = formatQueryString("select floor(count(*) /" + PageSize + ") + case when (count(*) %" + PageSize + ") = 0 then 0 else 1 end  as cnt from (" + queryText + " " + searchOption + " " + groupby + ") rs");
                var countRows = _commonRule.getValueList(countQuery);
                if (ScreenName.Split(new string[] { "Form_LISTVIEW" }, StringSplitOptions.None).Count() > 1)
                {
                    ////
                    if (ispagination == true)
                    {
                        DataTable dt = new DataTable();
                        cntQuery = formatQueryString(cntQuery);
                        dt = _commonRule.getDataTableList(cntQuery);
                        var paginationCnt = dt.Rows.Count;
                        countQuery = "select floor(" + paginationCnt + " / 10) + case when(" + paginationCnt + " % 10) = 0 then 0 else 1 end as cnt";
                        countRows = _commonRule.getValueList(countQuery);
                    }
                    else
                    {
                        //if (isdynamic == true)
                        countRows = "[{\"cnt\":0}]";
                    }
                }
                JavaScriptErrorLog("Get List   Count rows----->" + countRows, "");

                var result = (new
                {
                    List = dataList,
                    countRows = countRows,
                });

                //
                // return dataList;
                return Json(result);
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                return Json(ex);
            }
        }

        public JsonResult GetListValueN(string query1, string query2, string screenName, bool ispagination)
        {
            try
            {
                query1 = AESEncrytDecry.DecryptStringAES(query1);//encript
                query2 = AESEncrytDecry.DecryptStringAES(query2);//encript
                var dataList = _commonRule.getValueList(query1);
                JavaScriptErrorLog("Get List Value----->" + query1, "");
                var countRows = _commonRule.getValueList(query2);
                if (screenName.Split(new string[] { "Form_LISTVIEW" }, StringSplitOptions.None).Count() > 1)
                {
                    if (ispagination == true)
                    {
                        DataTable dt = new DataTable();
                        // var cntQuery = formatQueryString(query2);
                        var cntQuery = query2;
                        dt = _commonRule.getDataTableList(cntQuery);
                        var paginationCnt = dt.Rows.Count;
                        var countQuery = "select floor(" + paginationCnt + " / 10) + case when(" + paginationCnt + " % 10) = 0 then 0 else 1 end as cnt";
                        countRows = _commonRule.getValueList(countQuery);
                    }
                    else
                    {
                        //if (isdynamic == true)
                        countRows = "[{\"cnt\":0}]";
                    }
                }
                JavaScriptErrorLog("Get List   Count rows----->" + countRows, "");

                var result = (new
                {
                    List = dataList,
                    countRows = countRows,
                });

                //
                // return dataList;
                return Json(result);
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                return Json(ex);
            }
        }

        public JsonResult GetExportListQuery(string ScreenName, string FieldName, string searchOption, string SortOption, string ActionType)
        {
            try
            {
                var _screenName = ScreenName;
                var screenName = string.Empty;

                if (FieldName != null && FieldName != "")
                    screenName = ScreenName + "_LISTVIEW_" + FieldName;
                if (ActionType == "LOOKUP") //temp
                    screenName = ScreenName + "_FORM_LOOKUP_LISTVIEW_" + FieldName;
                screenName = screenName == "" ? ScreenName : screenName;
                ScreenName = screenName;

                var query = string.Empty;

                var queryText = string.Empty;
                string orderby = string.Empty;
                string groupby = string.Empty;
                queryText = _commonRule.QueryconfigForList(ScreenName, ref orderby, ref groupby);
                if (SortOption == "")
                {
                    //Newly addded by.M 02.09.2021 - if logic only
                    if (queryText.IndexOf("exec ") >= 0)
                    {
                        query = queryText + ", '" + searchOption.Replace("'%", "''%").Replace("%'", "%''") + " " + groupby + " " + orderby + "'";
                        if (query.Split('{').Count() == 1)
                            query = query.Replace(",", "");
                    }
                    else
                        query = queryText + " " + searchOption + " " + groupby + " " + orderby;
                }
                else
                {
                    if (queryText.IndexOf("exec ") >= 0)
                    {
                        query = queryText + ", '" + searchOption.Replace("'%", "''%").Replace("%'", "%''") + " " + groupby + " order by" + SortOption + "'";
                    }
                    else
                        query = queryText + " " + searchOption + " " + groupby + " order by" + SortOption;
                }

                var result = (new
                {
                    query = query,
                });
                return Json(result);
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                return Json(ex);
            }
        }

        public JsonResult exportxlfie(string query, string ScreenName)
        {
            try
            {
                var UserID = Session["UserName"];
                query = AESEncrytDecry.DecryptStringAES(query);
                var objExp = new SimplrExportBLL.Export();

                String exportPath = ConfigurationManager.AppSettings["ExportFiles"];
                String uploadpath = exportPath.Replace("~", "..");
                string fileLocation = Server.MapPath(exportPath);

                //objExport.CS = constr;
                objExp.CS = constr;
                objExp.UserID = Session["UserId"].ToString();
                //ExecuteReader(query);
                var modelList = new List<ExecuteReaderList>();
                var dt = _commonRule.getDataTableList(query);

                string message1 = string.Format("{0}", DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss tt"));

                string fileName = ScreenName + "_" + UserID + "_" + DateTime.Now.ToString("yyyyMMddHHmmssfff");

                var fname = objExp.dttoexcelCR(dt, fileLocation, fileName, ScreenName);

                var returnFile = uploadpath + "/" + fileName;// System.IO.Path.GetFileName(fname)  ;

                return Json(returnFile);
            }
            catch (Exception)
            {
                return Json("");
            }
        }

        //public string GetListValue (string data, string ScreenName, int? pageNumber, string searchOption, string id, string FieldName, string ActionType)
        //{
        //    try
        //    {
        //        var _screenName = ScreenName;
        //        var screenName = string.Empty;
        //        if (FieldName != null && FieldName != "")
        //            screenName = ScreenName + "_LISTVIEW_" + FieldName;
        //        if (ActionType == "LOOKUP") //temp
        //            screenName = ScreenName + "_FORM_LOOKUP_LISTVIEW_" + FieldName;


        //        ScreenName = screenName;
        //        ////Todo
        //        //var query = _commonRule.QueryconfigText(ScreenName);
        //        //var data = _commonRule.getValueList(query);
        //        ////


        //        if (data != "")
        //            arrItems = JsonConvert.DeserializeObject(data);


        //        //////////////
        //        int PageSize = 10;
        //        var PageNumber = (pageNumber == null ? 1 : Convert.ToInt32(pageNumber));

        //        var query = string.Empty;
        //        //if (id != null && id != "")
        //        //    query = _commonRule.QueryconfigQueryText("" + ScreenName + "_FORM_LOOKUP_" + id);
        //        //else
        //        query = _commonRule.QueryconfigQueryText(ScreenName);


        //        if (query.Split(new string[] { "where" }, StringSplitOptions.None).Length >= 2 || query.Split(new string[] { "Where" }, StringSplitOptions.None).Length >= 2 || query.Split(new string[] { "WHERE" }, StringSplitOptions.None).Length >= 2)
        //        {
        //            //query.Split(new string[] { "where" }, StringSplitOptions.None)[1].Split(' ').Length >=2S
        //            // query = query + " " + Session["UserAccessLevelQuery"];
        //            query = query + searchOption.ToLower().Replace("where", " and");
        //        }
        //        // else if (searchOption != null && searchOption != "")
        //        else
        //            query = query + searchOption;

        //        var totalCountQuery = query.Replace("*", "Count(*)");
        //        ////
        //        int startpageNo = (PageNumber - 1) * PageSize;
        //        int endpageNo = PageSize;
        //        String SQL = query;
        //        //String SQLOrderBy = "ORDER BY Code ASC "; //GetOrderByClause(Object someInputParams);
        //        //String SQLOrderBy = _commonRule.QueryconfigOrderText(ScreenName);
        //        string SQLOrderBy = string.Empty;

        //        //if (id != null && id != "")
        //        //    SQLOrderBy = _commonRule.QueryconfigOrderText("" + ScreenName + "_FORM_LOOKUP_" + id);
        //        //else

        //        if (ScreenName.ToLower().Split(new string[] { "list_listview_lst" }, StringSplitOptions.None).Count() > 1 || ScreenName.Split(new string[] { "FORM_LOOKUP_LISTVIEW" }, StringSplitOptions.None).Count() > 1)
        //            SQLOrderBy = _commonRule.QueryconfigOrderText(ScreenName);
        //        //String limitedSQL = GetPaginatedSQL(startpageNo, endpageNo, SQL, SQLOrderBy, PageSize, totalCountQuery);
        //        //limitedSQL = formatQueryString(limitedSQL, ScreenName);
        //        //var data = _commonRule.getValueList(limitedSQL);

        //        //Todo paging
        //        //if (_screenName == "MustCarryItemForm")
        //        //{
        //        //    query = SQL;
        //        //}
        //        if (SQLOrderBy != "" && SQL.ToLower().IndexOf("join") == -1 && SQL.ToLower().IndexOf("select *") != -1)
        //            query = GetPaginatedSQL(startpageNo, endpageNo, SQL, SQLOrderBy, PageSize, totalCountQuery);
        //        else if ((SQL.ToLower().IndexOf("join") > -1 || SQL.ToLower().IndexOf("distinct") >= 0 || SQL.ToLower().IndexOf("select *") == -1) && SQLOrderBy != "")
        //        {
        //            //var startpos = SQL.IndexOf('s');
        //            //var endpos = SQL.IndexOf('t') + 1;
        //            //var qry = SQL.Remove(startpos, endpos);

        //            //var tblName = SQL.Split(new string[] { "from" }, StringSplitOptions.None)[1];
        //            //tblName = tblName.Split(new string[] { " " }, StringSplitOptions.None).ToString();
        //            //var tblTotalCountQry = "select count(*) " + tblName;

        //            //                   ((( select count(*)from OrderHdr OH inner join Customer C on C.CustNO=OH.CustID 
        //            //where C.SalesAgent   in (select groupid from salesmangroup where userid='DAZJBULAGNER'))/10)+(case(( select count(*)from OrderHdr OH inner join Customer C on C.CustNO=OH.CustID 
        //            //where C.SalesAgent   in (select groupid from salesmangroup where userid='DAZJBULAGNER'))%10) when 0 then 0 else 1 end))  as TotalCount 

        //            var startpos = SQL.IndexOf("from");
        //            var endpos = 4;

        //            var tblTotalCountQry = string.Empty;
        //            if (SQL.ToLower().IndexOf("distinct") >= 0 && _screenName == "StockTransferList")
        //            {
        //                tblTotalCountQry = SQL.Split(new string[] { "Distinct" }, StringSplitOptions.None).Count() >= 2 ? SQL.Split(new string[] { "Distinct" }, StringSplitOptions.None)[1].Split(' ')[1] : SQL.Split(new string[] { "DISTINCT" }, StringSplitOptions.None)[1].Split(' ')[1];
        //                tblTotalCountQry = tblTotalCountQry.Split(',').Count() > 1 ? tblTotalCountQry.Split(',')[0] : tblTotalCountQry;
        //                //  tblTotalCountQry = SQL.Remove(0, SQL.IndexOf("from")).Insert(0, " select count(DISTINCT " + tblTotalCountQry + ")");
        //                tblTotalCountQry = SQL.Remove(0, SQL.IndexOf("FROM TransferHdr")).Insert(0, " select count(DISTINCT " + tblTotalCountQry + ")").Replace("order by TransNo", "");
        //                SQL = SQL.Replace("order by TransNo", "");
        //                startpos = SQL.IndexOf("FROM ");

        //            }
        //            else if (SQL.ToLower().IndexOf("distinct") >= 0 && _screenName != "SalesOrderList")
        //            {
        //                tblTotalCountQry = SQL.Split(new string[] { "distinct" }, StringSplitOptions.None).Count() >= 2 ? SQL.Split(new string[] { "distinct" }, StringSplitOptions.None)[1].Split(' ')[1] :
        //                    SQL.Split(new string[] { "Distinct" }, StringSplitOptions.None).Count() >= 2 ? SQL.Split(new string[] { "Distinct" }, StringSplitOptions.None)[1].Split(' ')[1] : SQL.Split(new string[] { "DISTINCT" }, StringSplitOptions.None)[1].Split(' ')[1];
        //                tblTotalCountQry = tblTotalCountQry.Split(',').Count() > 1 ? tblTotalCountQry.Split(',')[0] : tblTotalCountQry;
        //                tblTotalCountQry = SQL.Remove(0, SQL.IndexOf("from")).Insert(0, " select count(DISTINCT " + tblTotalCountQry + ")");
        //            }
        //            else
        //                tblTotalCountQry = SQL.Remove(0, SQL.IndexOf("from")).Insert(0, " select count(*)");

        //            //var tblTotalCountQry = SQL.Remove(0, SQL.IndexOf("from")).Insert(0, " select count(*)");
        //            //tblTotalCountQry = "((( " + tblTotalCountQry + "))/10)+(case(( " + tblTotalCountQry + "))%10) when 0 then 0 else 1 end))  as TotalCount ";
        //            tblTotalCountQry = "((( " + tblTotalCountQry + ")/" + PageSize + ")+(case(( " + tblTotalCountQry + ")%" + PageSize + ") when 0 then 0 else 1 end)) ";


        //            var qry = "";
        //            if (SQL.ToLower().IndexOf("distinct") >= 0)// distinct true
        //                qry = SQL.Remove(startpos, endpos).Insert(startpos, " , DENSE_RANK() OVER (" + SQLOrderBy + ") AS Seq, (" + tblTotalCountQry + ") as TotalCount  from");
        //            else
        //                qry = SQL.Remove(startpos, endpos).Insert(startpos, " , ROW_NUMBER() OVER (" + SQLOrderBy + ") AS Seq, (" + tblTotalCountQry + ") as TotalCount  from");

        //            var qr = "SELECT * FROM";
        //            qr += " (";
        //            // qr += " select ROW_NUMBER() OVER (" + SQLOrderBy + ") AS Seq, " + qry + "  ";
        //            qr += qry;
        //            qr += " )t";
        //            qr += " WHERE Seq BETWEEN " + (startpageNo + 1) + " AND " + (startpageNo + endpageNo) + ""; ;
        //            query = qr;
        //        }
        //        else
        //            query = SQL;

        //        if (ScreenName.Split(new string[] { "Form_LISTVIEW" }, StringSplitOptions.None).Count() > 1)
        //        {
        //            SQLOrderBy = _commonRule.QueryconfigOrderText(ScreenName);
        //            query += SQLOrderBy;
        //        }
        //        //if (ScreenName.Split('_')[0] == "ImportConfigForm" && query == "")
        //        //{
        //        //    //query = "exec sp_columns {FormView.TargetAttributes}";
        //        //    query = "SELECT COLUMN_NAME as TargetAttributes,DATA_TYPE as DataType FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = {FormView.TargetAttributes} ORDER BY ORDINAL_POSITION";
        //        //}
        //        query = formatQueryString(query);
        //        var dataList = _commonRule.getValueList(query);

        //        //
        //        return dataList;
        //    }
        //    catch (Exception ex)
        //    {
        //        ErrorLog(ex);
        //        return string.Empty;
        //    }
        //}

        public static string GetPaginatedSQL1(int startRow, int numberOfRows, string sql, string orderingClause, int PageSize, string totalCountQuery)
        {
            var columnFields = sql.Split(new string[] { "distinct" }, StringSplitOptions.None)[1].Split(new string[] { "from" }, StringSplitOptions.None)[0];
            var tableName = sql.Split(new string[] { "distinct" }, StringSplitOptions.None)[1].Split(new string[] { "from" }, StringSplitOptions.None)[1];
            var orderByFields = columnFields.Split(',')[0];

            //  var dd = sql.Split("distinct")[0].Split("from");
            var qry = "SELECT distinct  " + columnFields + ",  COUNT(*) OVER() as TotalCount FROM";
            qry += " ( SELECT     ROW_NUMBER() OVER ( ORDER BY " + orderByFields + " ) AS RowNum, *";
            qry += " FROM  " + tableName + " ";
            qry += " ) AS RowConstrainedResult";
            qry += " WHERE   RowNum >= " + startRow + "";
            qry += " AND RowNum <= " + numberOfRows + "";
            // qry += "ORDER BY CustNo DESC ";
            return qry;
        }

        public static string GetPaginatedSQL(int startRow, int numberOfRows, string sql, string orderingClause, int PageSize, string totalCountQuery)
        {
            // Ordering clause is mandatory!
            if (String.IsNullOrEmpty(orderingClause))
                throw new ArgumentNullException("orderingClause");

            // numberOfRows here is checked of disable building paginated/limited query
            // in case is not greater than 0. In this case we simply return the
            // query with its ordering clause appended to it. 
            // If ordering is not spe
            if (numberOfRows <= 0)
            {
                return String.Format("{0} {1}", sql, orderingClause);
            }
            // Extract the SELECT from the beginning.
            String partialSQL = sql.Remove(0, "SELECT ".Length);

            // Build the limited query...
            return String.Format(
                "SELECT * FROM ( SELECT ROW_NUMBER() OVER ({0}) AS rn,(((" + totalCountQuery + ")/" + PageSize + ") + (case ((" + totalCountQuery + ")%" + PageSize + " ) when 0 then 0 else 1 end)) as TotalCount , {1} ) AS SUB WHERE rn > {2} AND rn <= {3}",
                orderingClause,
                partialSQL,
                startRow.ToString(),
                (startRow + numberOfRows).ToString()
            );
        }

        public ActionResult SaveForm(string data, string ScreenName)
        {
            try
            {
                var queryInsert = _commonRule.QueryconfigText(ScreenName);
                string[] dataList = data.Split(new string[] { "$*&" }, StringSplitOptions.None);
                for (int i = 0; i < dataList.Count(); i++)
                {
                    var fieldName = dataList[i].Split(new string[] { "$=&" }, StringSplitOptions.None)[0];
                    var value = dataList[i].Split(new string[] { "$=&" }, StringSplitOptions.None)[1];
                    queryInsert = queryInsert.Replace("{FormView." + fieldName + "}", "'" + value + "'");
                }
                var result = _commonRule.executerQuery(queryInsert);
                message = result == "success" ? "" + ScreenName.Split('_')[0] + " created successfully!" : "Error occurred during " + ScreenName.Split('_')[0] + " created!";

            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                message = "Error occurred during " + ScreenName.Split('_')[0] + " created!";
                //  return Json("Error occurred during " + ScreenName + " created!");
            }
            return Json(message);
        }

        public string GetEditFormData1(string ScreenName, string Code)
        {
            try
            {
                var query = _commonRule.QueryconfigText(ScreenName) + "'" + Code + "'";
                // query = query + "'" + Code + "'";
                // var query = "Select * from priceGroup where Code='" + Code + "'";
                var data = _commonRule.getValueList(query);
                return data;
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                return string.Empty;
            }
        }

        public string GetEditFormData(string ScreenName, string data)
        {
            try
            {

                if (data != "")
                {
                    jsonObj = JsonConvert.DeserializeObject(data);
                    arrItems = JsonConvert.DeserializeObject(data);
                }

                //var query = _commonRule.QueryconfigText(ScreenName);
                //query = formatQueryString(query);
                //message = _commonRule.getValueList(query)  

                var query = _commonRule.QueryconfigText(ScreenName);
                query = formatQueryString(query);
                var result = _commonRule.getValueList(query);
                return result;
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                return string.Empty;
            }
        }
        public ActionResult UpdateForm(string data, string Code, string ScreenName)
        {
            try
            {
                var queryUpdate = _commonRule.QueryconfigText(ScreenName);
                string[] dataList = data.Split(new string[] { "$*&" }, StringSplitOptions.None);
                for (int i = 0; i < dataList.Count(); i++)
                {
                    var fieldName = dataList[i].Split(new string[] { "$=&" }, StringSplitOptions.None)[0];
                    var value = dataList[i].Split(new string[] { "$=&" }, StringSplitOptions.None)[1];
                    queryUpdate = queryUpdate.Replace("{FormView." + fieldName + "}", "'" + value + "'");
                }
                queryUpdate = queryUpdate + "'" + Code + "'";
                var result = _commonRule.executerQuery(queryUpdate);
                message = result == "success" ? "" + ScreenName.Split('_')[0] + " updated successfully!" : "Error occurred during " + ScreenName.Split('_')[0] + " updated!";
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                message = "Error occurred during " + ScreenName.Split('_')[0] + " updated!";
            }
            return Json(message);
        }

        public string DeleteForm(string ScreenName, string Code)
        {
            try
            {
                var query = _commonRule.QueryconfigText(ScreenName) + "'" + Code + "'";
                var data = _commonRule.DeleteQuery(query);
                return data;
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                return "Error occurred during " + ScreenName + " deleted!";
            }
        }

        public string GetFormConfigHidden(string ScreenName)
        {
            try
            {
                // var data = _commonRule.FormConfig(ScreenName);
                var query = _commonRule.QueryconfigQueryText("" + ScreenName + "_FORM") + "and IsHidden=0";
                var data = _commonRule.getValueList(query);
                return data;
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                return string.Empty;
            }
        }

        public ActionResult Report()
        {
            if (Session["ScreenName"] != null)
            {
                ViewBag.ScreenName = Session["ScreenName"];
                return View();
            }
            else
            {
                return RedirectToAction("Login", "Login");
            }
            //ViewBag.ScreenName = screenName;
            //return View();
        }

        public ActionResult GetReport(string screenName)
        {
            Session["ScreenName"] = screenName;
            return RedirectToAction("Create");
        }

        //public ActionResult PrintReport(string data, string ScreenName)
        //{
        //    var query = _commonRule.QueryconfigText("" + ScreenName + "_FORM_REPORT");
        //    // var data1 = _commonRule.getValueList(query);
        //    // var query = "select H.OrdNo,H.OrdDt,I.UOM,I.Qty,I.Price from OrderHdr H   inner join OrdItem I on H.OrdNo = I.OrdNo  where H.AgentId={AgentID} and OrdDt={Date}";
        //    string[] dataList = data.Split(new string[] { "$*$" }, StringSplitOptions.None);
        //    for (int i = 0; i < dataList.Count(); i++)
        //    {
        //        var fieldName = dataList[i].Split(new string[] { "$=$" }, StringSplitOptions.None)[0];
        //        var value = dataList[i].Split(new string[] { "$=$" }, StringSplitOptions.None)[1];
        //        query = query.Replace("{" + fieldName + "}", "'" + value + "'");
        //    }
        //    var result = _commonRule.getRowList(query);
        //    Session["ListData"] = result;
        //    Session["ListConfigFields"] = _commonRule.getHeaderList(ScreenName);

        //    ViewBag.ScreenName = "PriceGroup";

        //    string footer1 = "--footer-center \"Printed on: " + DateTime.Now.Date.ToString("dd/MM/yyyy") + "  Page: [page]/[toPage]\"" + " --footer-line --footer-font-size \"9\" --footer-spacing 6 --footer-font-name \"calibri light\"";
        //    string header1 = "--footer-center \"Printed on: " + DateTime.Now.Date.ToString("dd/MM/yyyy") + "  Page: [page]/[toPage]\"" + " --footer-line --header-font-size \"9\" --footer-spacing 6 --header-font-name \"calibri light\"";

        //    // return View();
        //    return new ViewAsPdf("PrintReport")
        //    {
        //        FileName = "Test.pdf",
        //        PageSize = Size.A4,
        //        PageOrientation = Orientation.Portrait,
        //        // PageMargins = { Left = 10, Right = 10, Top = 20, Bottom = 20 },
        //        PageMargins = new Margins(12, 12, 12, 12),// it’s in millimeters

        //        CustomSwitches = header1,

        //        PageWidth = 180,
        //        PageHeight = 297,
        //        //CustomSwitches ="–outline –print - media - type –footer - center "Confidential"  –footer - right[page] /[toPage]  –footer - left[date]",   

        //    };
        //}

        public ActionResult ActionConfig1(string data, string ScreenName, string FieldName)
        {
            var message = string.Empty;

            try
            {
                var ActionName = "formButtonClicked";


                var actionType = _commonRule.GetActionConfig(ScreenName, FieldName, ActionName, "ActionType");

                if (actionType == "VALIDATE")
                {
                    var actionPlan = _commonRule.GetActionConfig(ScreenName, FieldName, ActionName, "ActionPlan");
                    var validateQuery = _commonRule.QueryconfigQueryText(actionPlan);

                    string[] dataList = data.Split(new string[] { "$*&" }, StringSplitOptions.None);
                    for (int i = 0; i < dataList.Count(); i++)
                    {
                        var fieldName = dataList[i].Split(new string[] { "$=&" }, StringSplitOptions.None)[0];
                        var value = dataList[i].Split(new string[] { "$=&" }, StringSplitOptions.None)[1];
                        validateQuery = validateQuery.Replace("{FormView." + fieldName + "}", "'" + value + "'");
                    }

                    var result = _commonRule.ValidateQuery(validateQuery);
                    if (result == "1")
                    {
                        var actionValue = _commonRule.GetActionConfig(ScreenName, FieldName, ActionName, "ActionValue");
                        actionType = _commonRule.GetActionConfig(ScreenName, FieldName, actionValue, "ActionType");

                        if (actionType == "EXECUTE")
                        {
                            actionPlan = _commonRule.GetActionConfig(ScreenName, FieldName, actionValue, "ActionPlan");
                            var queryInsert = _commonRule.QueryconfigText(actionPlan);
                            dataList = data.Split(new string[] { "$*&" }, StringSplitOptions.None);
                            for (int i = 0; i < dataList.Count(); i++)
                            {
                                var fieldName = dataList[i].Split(new string[] { "$=&" }, StringSplitOptions.None)[0];
                                var value = dataList[i].Split(new string[] { "$=&" }, StringSplitOptions.None)[1];
                                queryInsert = queryInsert.Replace("{FormView." + fieldName + "}", "'" + value + "'");
                            }
                            result = _commonRule.executerQuery(queryInsert);
                            if (result == "1")
                            {
                                actionValue = _commonRule.GetActionConfig(ScreenName, FieldName, ActionName, "ActionValue");
                                actionType = _commonRule.GetActionConfig(ScreenName, FieldName, actionValue, "ActionType");
                                if (actionType == "ALERT")
                                {
                                    actionPlan = _commonRule.GetActionConfig(ScreenName, FieldName, actionValue, "ActionPlan");
                                    message = _commonRule.MessageConfig(ScreenName, actionPlan);
                                }
                            }
                            else
                            {
                                var actionFailedValue = _commonRule.GetActionConfig(ScreenName, FieldName, ActionName, "ActionFailedValue");
                                actionType = _commonRule.GetActionConfig(ScreenName, FieldName, actionFailedValue, "ActionType");
                                if (actionType == "ALERT")
                                {
                                    actionPlan = _commonRule.GetActionConfig(ScreenName, FieldName, actionFailedValue, "ActionPlan");
                                    message = _commonRule.MessageConfig(ScreenName, actionPlan);
                                }
                            }
                        }
                    }
                    else
                    {
                        var actionFailedValue = _commonRule.GetActionConfig(ScreenName, FieldName, ActionName, "ActionFailedValue");
                        actionType = _commonRule.GetActionConfig(ScreenName, FieldName, actionFailedValue, "ActionType");
                        if (actionType == "ALERT")
                        {
                            actionPlan = _commonRule.GetActionConfig(ScreenName, FieldName, actionFailedValue, "ActionPlan");
                            message = _commonRule.MessageConfig(ScreenName, actionPlan);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
            }
            return Json(message);
        }

        //Todo
        public ActionResult ActionConfig1(string data, string ScreenName, string FieldName, string ActionName)
        {
            var message = string.Empty;
            try
            {
                var actionPlan = string.Empty;
                var result = string.Empty;
                var actionandFaildValue = string.Empty;

                var loopExit = true;
                var actionType = _commonRule.GetActionConfig(ScreenName, FieldName, ActionName, "ActionType");
                actionType = actionType.Replace(" ", "");
                while (loopExit)
                {
                    if (actionType == "Home")
                    {
                        message = "Home";
                        loopExit = false;
                    }
                    else if (actionType == "FORM")
                    {
                        ActionName = _commonRule.GetActionConfig(ScreenName, FieldName, ActionName, "ActionValue");
                        var query = _commonRule.QueryconfigText("" + ScreenName + "_FORM");
                        message = _commonRule.getValueList(query) + "$" + "FORM";
                        actionType = "";
                    }
                    else if (actionType == "POPUPWINDOW")
                    {
                        ActionName = _commonRule.GetActionConfig(ScreenName, FieldName, ActionName, "ActionValue");
                        var query = _commonRule.QueryconfigText("" + ScreenName + "_FORM");
                        message = _commonRule.getValueList(query) + "$" + "POPUPWINDOW";
                        actionType = "";
                    }
                    else if (actionType == "HIDEPOPUPWINDOW")
                    {
                        message = "HIDEPOPUPWINDOW";
                        actionType = "";
                    }
                    else if (actionType == "VALIDATE")
                    {
                        actionPlan = _commonRule.GetActionConfig(ScreenName, FieldName, ActionName, "ActionPlan");
                        var validateQuery = _commonRule.QueryconfigQueryText(actionPlan);

                        string[] dataList = data.Split(new string[] { "$*&" }, StringSplitOptions.None);
                        for (int i = 0; i < dataList.Count(); i++)
                        {
                            var fieldName = dataList[i].Split(new string[] { "$=&" }, StringSplitOptions.None)[0];
                            var value = dataList[i].Split(new string[] { "$=&" }, StringSplitOptions.None)[1];
                            validateQuery = validateQuery.Replace("{FormView." + fieldName + "}", "'" + value + "'");
                        }
                        result = _commonRule.ValidateQuery(validateQuery);
                        if (result == "1")
                        {
                            ActionName = _commonRule.GetActionConfig(ScreenName, FieldName, ActionName, "ActionValue");
                            actionType = _commonRule.GetActionConfig(ScreenName, FieldName, ActionName, "ActionType");
                        }
                        else
                        {
                            ActionName = _commonRule.GetActionConfig(ScreenName, FieldName, ActionName, "ActionFailedValue");
                            actionType = _commonRule.GetActionConfig(ScreenName, FieldName, ActionName, "ActionType");
                            message = "FAILURE";
                        }
                    }

                    else if (actionType == "EXECUTE")
                    {
                        actionPlan = _commonRule.GetActionConfig(ScreenName, FieldName, ActionName, "ActionPlan");
                        var queryInsert = _commonRule.QueryconfigText(actionPlan);
                        string[] dataList = data.Split(new string[] { "$*&" }, StringSplitOptions.None);
                        for (int i = 0; i < dataList.Count(); i++)
                        {
                            var fieldName = dataList[i].Split(new string[] { "$=&" }, StringSplitOptions.None)[0];
                            var value = dataList[i].Split(new string[] { "$=&" }, StringSplitOptions.None)[1];
                            queryInsert = queryInsert.Replace("{FormView." + fieldName + "}", "'" + value + "'");
                        }
                        result = _commonRule.executerQuery(queryInsert);
                        if (result == "1")
                        {
                            ActionName = _commonRule.GetActionConfig(ScreenName, FieldName, ActionName, "ActionValue");
                            actionType = _commonRule.GetActionConfig(ScreenName, FieldName, ActionName, "ActionType");
                        }
                        else
                        {
                            ActionName = _commonRule.GetActionConfig(ScreenName, FieldName, ActionName, "ActionFailedValue");
                            actionType = _commonRule.GetActionConfig(ScreenName, FieldName, ActionName, "ActionType");
                        }
                    }

                    else if (actionType == "ALERT")
                    {
                        actionPlan = _commonRule.GetActionConfig(ScreenName, FieldName, ActionName, "ActionPlan");
                        if (message == "FAILURE")
                            message = _commonRule.MessageConfig(ScreenName, actionPlan) + "$" + message;
                        else
                            message = _commonRule.MessageConfig(ScreenName, actionPlan);
                        actionType = "";
                    }
                    else if (actionType == "BACK")
                    {
                        message = "BACK";
                        actionType = "";
                    }
                    else if (actionType == "CANCEL")
                    {
                        message = "CANCEL";
                        actionType = "";
                    }
                    else if (actionType == "FOCUS")
                    {
                        message = _commonRule.GetActionConfig(ScreenName, FieldName, ActionName, "ActionPlan");
                        actionType = "";
                    }
                    else if (actionType == "CLEARFORMFIELDS")
                    {
                        message = _commonRule.GetActionConfig(ScreenName, FieldName, ActionName, "ActionPlan");
                        actionType = "";
                    }
                    else
                        loopExit = false;

                }

            }
            catch (Exception ex)
            {
                ErrorLog(ex);
            }
            return Json(message);
        }

        public ActionResult Delete(string[] selectedIDs)
        {
            {
                if (selectedIDs != null)
                {
                    foreach (string customerID in selectedIDs)
                    {
                        //here enyter your logic
                        //Customer obj = db.Customers.Find(customerID);
                        //db.Customers.Remove(obj);
                    }

                    return Json("All the customers   deleted successfully!");
                }
                else
                    return Json("Plese select any one delete checkbox option!");
            }
        }


        //public string SelectedCustNo = "100";
        //public string Location = "Sg";
        //public string StartDate = "10-10-2017";
        //public string EndDate = "10-10-2018";
        //public string Loaded = "TestLoaded";

        public ActionResult ActionConfig2(string data, string ScreenName, string FieldName, string ActionName)
        {
            //var dictionary = new Dictionary<string, object>();
            //dictionary.Add("SelectedCustNo", "100");
            //arrItems = dictionary;

            if (data != "")
            {
                jsonObj = JsonConvert.DeserializeObject(data);
                arrItems = JsonConvert.DeserializeObject(data);
                if (arrItems.ToString() != "" && arrItems.ToString() != "{}")
                {
                    if (arrItems["value"] != null)
                    {
                        string objKeyValue = arrItems["value"].ToString();
                        LogFile(objKeyValue, ScreenName, FieldName, ActionName);
                    }
                }
            }
            try
            {
                var actionPlan = string.Empty;
                var actionValue = string.Empty;
                var result = string.Empty;
                var actionandFaildValue = string.Empty;
                var key = string.Empty;
                var value = string.Empty;
                var loopExit = true;


                //DataTable dataTable = _commonRule.GetActionConfigList(ScreenName, FieldName, "", "ActionType");
                //string[] arrActionType = new string[dataTable.Rows.Count];

                //for (int i = 0; i < dataTable.Rows.Count; i++)
                //{
                //    arrActionType[i]= dataTable.Rows[i].ItemArray[0].ToString();
                //}
                var actionType = _commonRule.GetActionConfig(ScreenName, FieldName, ActionName, "ActionType");
                actionType = actionType.Replace(" ", "");
                while (loopExit)
                {
                    if (actionType == "Home")
                    {
                        message = "Home";
                        loopExit = false;
                    }
                    else if (actionType == "FORM")
                    {
                        if (FieldName == "CreateBtn")
                        {
                            message = "" + "$" + "FORM";
                        }
                        else
                        {
                            actionValue = _commonRule.GetActionConfig(ScreenName, FieldName, ActionName, "ActionValue");
                            //var query = _commonRule.QueryconfigText("" + ScreenName + "_FORM");
                            var query = _commonRule.QueryconfigText(actionValue);
                            query = formatQueryString(query);
                            message = _commonRule.getValueList(query) + "$" + "FORM";
                            formReplacedDatas = _commonRule.getValueList(query);
                        }
                        actionType = "";
                    }
                    else if (actionType == "POPUPWINDOW")
                    {
                        actionValue = _commonRule.GetActionConfig(ScreenName, FieldName, ActionName, "ActionValue");
                        //var query = _commonRule.QueryconfigText("" + ScreenName + "_FORM");
                        var query = _commonRule.QueryconfigText(actionValue);
                        query = formatQueryString(query);
                        message = _commonRule.getValueList(query) + "$" + "POPUPWINDOW";
                        actionType = "";
                    }
                    else if (actionType == "HIDEPOPUPWINDOW")
                    {
                        message = "HIDEPOPUPWINDOW";
                        actionType = "";
                    }
                    else if (actionType == "VALIDATE")
                    {
                        actionPlan = _commonRule.GetActionConfig(ScreenName, FieldName, ActionName, "ActionPlan");
                        var query = _commonRule.QueryconfigQueryText(actionPlan);

                        query = formatQueryString(query);
                        var response = _commonRule.ValidateQuery(query);
                        if (response == "1")
                        {
                            ActionName = _commonRule.GetActionConfig(ScreenName, FieldName, ActionName, "ActionValue");
                            actionType = _commonRule.GetActionConfig(ScreenName, FieldName, ActionName, "ActionType");
                        }
                        else
                        {
                            ActionName = _commonRule.GetActionConfig(ScreenName, FieldName, ActionName, "ActionFailedValue");
                            actionType = _commonRule.GetActionConfig(ScreenName, FieldName, ActionName, "ActionType");
                            message = "FAILURE";
                        }
                    }
                    else if (actionType == "VALIDATE1")
                    {
                        actionPlan = _commonRule.GetActionConfig(ScreenName, FieldName, ActionName, "ActionPlan");
                        var validateQuery = _commonRule.QueryconfigQueryText(actionPlan);
                        dynamic jsonObj1 = JsonConvert.DeserializeObject(data);
                        foreach (var obj in jsonObj1)
                        {
                            var key1 = obj.Name;
                            var value1 = obj.Value.Value;
                            //validateQuery = validateQuery.Replace("{FormView." + key + "}", "'" + value + "'");
                            validateQuery = validateQuery.Replace("{FormView." + obj.Name + "}", "'" + obj.Value.Value + "'");
                        }

                        result = _commonRule.ValidateQuery(validateQuery);
                        if (result == "1")
                        {
                            ActionName = _commonRule.GetActionConfig(ScreenName, FieldName, ActionName, "ActionValue");
                            actionType = _commonRule.GetActionConfig(ScreenName, FieldName, ActionName, "ActionType");
                        }
                        else
                        {
                            ActionName = _commonRule.GetActionConfig(ScreenName, FieldName, ActionName, "ActionFailedValue");
                            actionType = _commonRule.GetActionConfig(ScreenName, FieldName, ActionName, "ActionType");
                            message = "FAILURE";
                        }
                    }
                    else if (actionType == "EXECUTE")
                    {
                        actionPlan = _commonRule.GetActionConfig(ScreenName, FieldName, ActionName, "ActionPlan");
                        var queryInsert = _commonRule.QueryconfigText(actionPlan);

                        dynamic jsonObj1 = JsonConvert.DeserializeObject(data);
                        foreach (var obj in jsonObj1)
                        {
                            //key = obj.Name;
                            //value = obj.Value.Value;
                            queryInsert = queryInsert.Replace("{FormView." + obj.Name + "}", "'" + obj.Value.Value + "'");
                        }
                        result = _commonRule.executerQuery(queryInsert);
                        if (result == "1")
                        {
                            ActionName = _commonRule.GetActionConfig(ScreenName, FieldName, ActionName, "ActionValue");
                            actionType = _commonRule.GetActionConfig(ScreenName, FieldName, ActionName, "ActionType");
                        }
                        else
                        {
                            ActionName = _commonRule.GetActionConfig(ScreenName, FieldName, ActionName, "ActionFailedValue");
                            actionType = _commonRule.GetActionConfig(ScreenName, FieldName, ActionName, "ActionType");
                        }
                    }

                    else if (actionType == "ALERT")
                    {
                        //actionPlan = _commonRule.GetActionConfig(ScreenName, FieldName, ActionName, "ActionPlan");
                        //if (message == "FAILURE")
                        //    message = _commonRule.MessageConfig(ScreenName, actionPlan) + "$" + message;
                        //else
                        //    message = _commonRule.MessageConfig(ScreenName, actionPlan);
                        message = _commonRule.GetActionConfig(ScreenName, FieldName, ActionName, "ActionPlan");
                        actionType = "";
                    }
                    else if (actionType == "BACK")
                    {
                        message = "BACK";
                        actionType = "";
                    }
                    else if (actionType == "CANCEL")
                    {
                        message = "CANCEL";
                        actionType = "";
                    }
                    else if (actionType == "FOCUS")
                    {
                        message = _commonRule.GetActionConfig(ScreenName, FieldName, ActionName, "ActionPlan");
                        actionType = "";
                    }
                    else if (actionType == "CLEARFORMFIELDS")
                    {
                        message = _commonRule.GetActionConfig(ScreenName, FieldName, ActionName, "ActionPlan");
                        actionType = "";
                    }
                    else
                        loopExit = false;
                }
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
            }
            return Json(message);
        }


        public string[] arrScreenName = new string[0];
        public string[] arrFieldName = new string[0];
        public string[] arrDisplayNo = new string[0];
        public string[] arrActionName = new string[0];
        public string[] arrActionType = new string[0];
        public string[] arrActionIndex = new string[0];
        public string[] arrActionPlan = new string[0];
        public string[] arrActionValue = new string[0];
        public string[] arrActionFailedValue = new string[0];

        public void AssignDataTable(DataTable dataTable)
        {
            arrScreenName = new string[dataTable.Rows.Count];
            arrFieldName = new string[dataTable.Rows.Count];
            arrDisplayNo = new string[dataTable.Rows.Count];
            arrActionName = new string[dataTable.Rows.Count];
            arrActionType = new string[dataTable.Rows.Count];
            arrActionIndex = new string[dataTable.Rows.Count];
            arrActionPlan = new string[dataTable.Rows.Count];
            arrActionValue = new string[dataTable.Rows.Count];
            arrActionFailedValue = new string[dataTable.Rows.Count];

            for (int i = 0; i < dataTable.Rows.Count; i++)
            {
                arrScreenName[i] = dataTable.Rows[i].ItemArray[0].ToString();
                arrFieldName[i] = dataTable.Rows[i].ItemArray[1].ToString();
                arrDisplayNo[i] = dataTable.Rows[i].ItemArray[2].ToString();
                arrActionName[i] = dataTable.Rows[i].ItemArray[3].ToString();
                arrActionType[i] = dataTable.Rows[i].ItemArray[4].ToString();
                arrActionIndex[i] = dataTable.Rows[i].ItemArray[5].ToString();
                arrActionPlan[i] = dataTable.Rows[i].ItemArray[6].ToString();
                arrActionValue[i] = dataTable.Rows[i].ItemArray[7].ToString();
                arrActionFailedValue[i] = dataTable.Rows[i].ItemArray[8].ToString();
            }
        }

        public bool loopExit = false;

        public ActionResult ActionConfig(string data,
            string ScreenName, string FieldName, string ActionName)
        {
            //var dictionary = new Dictionary<string, object>();
            //dictionary.Add("SelectedCustNo", "100");
            //arrItems = dictionary;

            if (data != "")
            {
                jsonObj = JsonConvert.DeserializeObject(data);
                arrItems = JsonConvert.DeserializeObject(data);
                if (arrItems.ToString() != "" && arrItems.ToString() != "{}")
                {
                    if (arrItems["value"] != null)
                    {
                        string objKeyValue = arrItems["value"].ToString();
                        LogFile(objKeyValue, ScreenName, FieldName, ActionName);
                    }
                }
            }
            try
            {
                var actionType = string.Empty;
                var actionPlan = string.Empty;
                var actionValue = string.Empty;
                var result = string.Empty;
                var actionandFaildValue = string.Empty;
                var key = string.Empty;
                var value = string.Empty;
                loopExit = true;
                //if (Session["loopExit"].ToString() == "False")
                //    Session["loopExit"] = true;

                DataTable dataTable = _commonRule.GetActionConfigList(ScreenName, FieldName, ActionName, "ActionType");
                AssignDataTable(dataTable);

                while (loopExit)
                {
                    //if (Session["loopExit"].ToString() == "False")
                    //{
                    //    Session["loopExit"] = true;
                    //    loopExit = false;
                    //    dataTable = new DataTable();
                    //}

                    var query = string.Empty;
                    for (int i = 0; i < dataTable.Rows.Count; i++)
                    {
                        actionType = arrActionType[i].ToString();
                        switch (actionType)
                        {
                            case "Home":
                                break;
                            case "FORM":
                                if (FieldName == "CreateBtn")
                                {
                                    message = "" + "$" + "FORM";
                                }
                                else
                                {
                                    actionValue = arrActionValue[i];
                                    query = _commonRule.QueryconfigText(actionValue);
                                    query = formatQueryString(query);
                                    formReplacedDatas = _commonRule.getValueList(query);
                                    message = formReplacedDatas;
                                    // message = formReplacedDatas + "$" + "FORM";
                                }
                                loopExit = false;
                                break;
                            case "POPUPWINDOW":
                                actionValue = arrActionValue[i];
                                actionValue = actionValue.Replace(" ", "");
                                if (actionValue.Replace(" ", "") == "")
                                    message = "" + "$" + "POPUPWINDOW";
                                else
                                {
                                    query = _commonRule.QueryconfigText(actionValue);
                                    query = formatQueryString(query);
                                    message = _commonRule.getValueList(query) + "$" + "POPUPWINDOW";
                                }
                                break;

                            case "HIDEPOPUPWINDOW":
                                message = "HIDEPOPUPWINDOW";
                                loopExit = false;
                                break;

                            case "VALIDATE":
                                //if (arrActionName[i] == ActionName)
                                //{
                                actionPlan = arrActionPlan[i];
                                query = _commonRule.QueryconfigQueryText(actionPlan);
                                query = formatQueryString(query);
                                var response = _commonRule.ValidateQuery(query);
                                if (response == "1")
                                {
                                    actionValue = arrActionValue[i];
                                    dataTable = _commonRule.GetActionConfigList(ScreenName, FieldName, actionValue, "ActionType");
                                    AssignDataTable(dataTable);
                                    i = -1;
                                    message = "SUCCESS";
                                }
                                else
                                {
                                    actionValue = arrActionFailedValue[i];
                                    dataTable = _commonRule.GetActionConfigList(ScreenName, FieldName, actionValue, "ActionType");
                                    AssignDataTable(dataTable);
                                    i = -1;
                                    message = "FAILURE";
                                }
                                //}
                                break;
                            case "EXECUTE":
                                actionPlan = arrActionPlan[i];
                                query = _commonRule.QueryconfigText(actionPlan);
                                query = formatQueryString(query);

                                if (query.ToLower().IndexOf("insert") == 0 || query.ToLower().IndexOf("update") == 0 || query.ToLower().IndexOf("delete") == 0)
                                {
                                    result = _commonRule.executerQuery(query);
                                }
                                //change
                                else if (query.ToLower().IndexOf("formview") != -1)
                                {

                                    // query = query.Replace("Formview.", "");
                                    message = _commonRule.getRowList(query);
                                    message = message.Replace("Formview.", "");
                                }
                                //change
                                else
                                {
                                    message = _commonRule.getRowList(query);
                                    loopExit = false;
                                }

                                //if (ActionName == "rowItemClicked")
                                //    query = "Insert into pricegroup(Code,Description) values('zz','zz')";
                                //result = _commonRule.getRowList(query);
                                break;

                            case "ALERT":
                                actionPlan = arrActionPlan[i];
                                message = actionPlan;
                                loopExit = false;
                                break;

                            case "BACK":
                                message = "BACK";
                                loopExit = false;
                                break;
                            case "CANCEL":
                                message = "CANCEL";
                                loopExit = false;
                                break;

                            case "FOCUS":
                                message = arrActionPlan[i];
                                loopExit = false;
                                break;
                            case "CLEARFORMFIELDS":
                                actionPlan = arrActionPlan[i];
                                actionType = "";
                                loopExit = false;
                                break;

                        }
                    }
                    if (dataTable.Rows.Count == 0)
                        loopExit = false;
                    loopExit = false;


                }


            }
            catch (Exception ex)
            {
                ErrorLog(ex);
            }
            return Json(message);
        }


        public string replaceQuery(string key, string qry)
        {
            try
            {
                if (key.ToUpper() == "AGENTID")
                {
                    var agentID = Session["AgentId"];
                    //return agentID.ToString();
                    qry = qry.Replace("{" + key + "}", "'" + agentID + "'");
                    return qry;

                }
                if (key.ToUpper().IndexOf("SYSTEM.") > -1)
                {
                    // var keyValue = key.Split(new[] { "SYSTEM." }, StringSplitOptions.RemoveEmptyEntries)[0];
                    var keyValue = key.Split('.')[1];
                    string objKeyValue = arrItems["" + keyValue + ""].ToString();
                    qry = qry.Replace("{" + key + "}", "'" + objKeyValue + "'");
                    return qry;
                }
                else if (key.ToUpper().IndexOf("PARAMS.FORMVIEW.LISTVIEW") > -1)
                {
                    var arrFields = key.Split('.');
                    // qry = qry.Replace("{" + key + "}", "'" + Params.FormView.ListView["" + arrFields[3] + ""] + "'");
                    qry = qry.Replace("{" + key + "}", "'" + Params.FormView["" + arrFields[2] + ""]["" + arrFields[3] + ""] + "'");
                    return qry;

                }
                else if (key.ToUpper().IndexOf("PARAMS.FORMVIEW") > -1)
                {
                    //Params.FormView.ListName.LineType
                    var arrFields = key.Split('.');

                    if (arrFields.Count() == 3)
                    {
                        if (Params["" + arrFields[1] + ""]["" + arrFields[2] + ""] == null)
                            qry = qry.Replace("{" + key + "}", "''");
                        else
                            qry = qry.Replace("{" + key + "}", "'" + Params["" + arrFields[1] + ""]["" + arrFields[2] + ""].ToString() + "'");
                    }
                    else
                    {
                        string s = Params["" + arrFields[1] + ""]["" + arrFields[2] + ""]["" + arrFields[3] + ""].ToString();
                        s = s.Replace("'", "''");
                        qry = qry.Replace("{" + key + "}", "'" + s.ToString() + "'");
                        // COMMENTED 29.04.2021
                        // qry = qry.Replace("{" + key + "}", "'" + Params["" + arrFields[1] + ""]["" + arrFields[2] + ""]["" + arrFields[3] + ""].ToString() + "'");
                    }

                    return qry;
                }
                else if (key.ToUpper().IndexOf("FORMVIEW.") > -1)
                {
                    string objKeyValue = string.Empty;
                    if (key.Split('.').Length == 2)
                    {
                        var keyValue = key.Split('.')[1];
                        objKeyValue = arrItems["" + keyValue + ""].ToString();
                        if (objKeyValue == "False" && arrItems["" + keyValue + ""].Value == false)
                            objKeyValue = "false";
                        if (objKeyValue == "True" && arrItems["" + keyValue + ""].Value == true)
                            objKeyValue = "true";
                    }
                    else
                    {
                        var listName = key.Split('.')[1];
                        var keyId = key.Split('.')[2];
                        objKeyValue = arrItems["" + listName + ""]["" + keyId + ""].ToString();
                        if (objKeyValue == "False" && arrItems["" + listName + ""]["" + keyId + ""].Value == false)
                            objKeyValue = "false";
                        if (objKeyValue == "True" && arrItems["" + listName + ""]["" + keyId + ""].Value == true)
                            objKeyValue = "true";
                    }
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


        public string ExecuteInsertUpdateQuery(string query)
        {
            query = AESEncrytDecry.DecryptStringAES(query);//encript
            var result = _commonRule.executerQuery(query);
            return result;
        }


        public JsonResult RunexeExecute(string ExePath)
        {
            try
            {
                RunExeLog("Start RunExe function : path : " + ExePath);
                if (System.IO.File.Exists(ExePath))
                {
                    //Process process = new Process();
                    //// process.StartInfo.FileName = @"C:\Simplr_Unilever\Debug UAT\IMEXUL.exe";
                    //RunExeLog("process.StartInfo.FileName");
                    //process.StartInfo.FileName = ExePath;
                    //process.StartInfo.Arguments = "-n";
                    //process.StartInfo.WindowStyle = ProcessWindowStyle.Maximized;
                    //RunExeLog("process.Start()");
                    //process.Start();
                    //RunExeLog("process.Start() end & process.WaitForExit() start");
                    //process.WaitForExit();
                    //RunExeLog("End process.WaitForExit()");

                    //SyncFolderPath
                    string syncFolderPath = ConfigurationManager.AppSettings.Get("SyncFolderPath").ToString();
                    string constr = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;

                    SyncConfig.SyncConfig sync = new SyncConfig.SyncConfig();
                    sync.sSyncFolderPath = syncFolderPath;
                    sync.ConnectionString = constr;
                    var result = sync.Main();
                    RunExeLog("Main Functin result : " + result);
                }
                RunExeLog("End RunExe function");
                return Json("success");
            }
            catch (Exception ex)
            {
                RunExeLog("Catch exception ex: " + ex.Message);
                return Json(ex.Message);

            }

        }
        public JsonResult JavaScriptErrorData(string error, string logType)
        {
            try
            {
                JavaScriptErrorLog(error, logType);
                return Json("");
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                return Json("javascript error");

            }

        }


        public JsonResult JavaScriptErrorData_TestPurpose(string error, string logType)
        {
            try
            {
                error = AESEncrytDecry.DecryptStringAES(error);//encript
                JavaScriptErrorLog_TestPurpose(error, logType);
                return Json("");
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                return Json("javascript error");

            }

        }
        public JsonResult JavaScriptErrorDataTestPurpose(string error, string txtfileName)
        {
            try
            {
                error = AESEncrytDecry.DecryptStringAES(error);//encript
                JavaScriptErrorLogTestPurpose(error, txtfileName);
                return Json("");
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                return Json("javascript error");

            }

        }

        [HttpPost]
        public JsonResult AutoCompleteNew(string prefix)
        {
            // CustomerDetails entities = new CustomerDetails();

            List<CustomerDetails> entities = new List<CustomerDetails> {
                    new CustomerDetails { CustomerID=111,ContactName="MahalingaM"},
                    new CustomerDetails { CustomerID = 112, ContactName = "Ravi" },
                    new CustomerDetails { CustomerID = 113, ContactName =  "Balu" },
                    new CustomerDetails { CustomerID = 114, ContactName =  "Bala" }
                };

            //CustomerDetails entitiesLisr = new List<CustomerDetails>();
            //NorthwindEntities entities = new NorthwindEntities();
            var customers = (from customer in entities
                             where customer.ContactName.StartsWith(prefix)
                             select new
                             {
                                 label = customer.ContactName,
                                 val = customer.CustomerID
                             }).ToList();

            var textQuery = "select Code as Id,Name as Name from salesagent where Name like '%" + prefix + "%'";
            DataTable dt = new DataTable();

            dt = _commonRule.getDataTableList(textQuery);
            var modelList = new List<CustomerDetails>();
            var model = new CustomerDetails();
            foreach (DataRow dr in dt.Rows)
            {
                model = new CustomerDetails();

                model.Code = dr["Id"].ToString();
                model.Text = dr["Name"].ToString();
                modelList.Add(model);
            }
            var customers1 = (from customer in modelList
                              select new
                              {
                                  label = customer.Text,
                                  val = customer.Code
                              }).ToList();

            return Json(customers1);
        }

        [HttpPost]
        public JsonResult AutoComplete(string qry)
        {
            DataTable dt = new DataTable();
            dt = _commonRule.getDataTableList(qry);
            var modelList = new List<AutoCompleteModel>();
            var model = new AutoCompleteModel();
            foreach (DataRow dr in dt.Rows)
            {
                model = new AutoCompleteModel();
                model.Code = dr["Code"].ToString();
                model.Text = dr["Text"].ToString();
                modelList.Add(model);
            }
            var customers1 = (from m in modelList
                              select new
                              {
                                  //label = m.Text,
                                  label = m.Code,
                                  val = m.Code
                              }).ToList();

            return Json(customers1);
        }

        public JsonResult TestFun(int loop1, int loop2)
        {
            DateTime now = DateTime.Now;
            while (DateTime.Now.Subtract(now).Seconds < loop1)//60  sec
            {
                // wait for 60 seconds
            }
            return Json(0);
        }

    }
    public class CustomerDetails
    {
        public int CustomerID { get; set; }
        public string Code { get; set; }
        public string Text { get; set; }
        public string ContactName { get; set; }
    }
    public class AutoCompleteModel
    {
        public string Code { get; set; }
        public string Text { get; set; }
    }
}
