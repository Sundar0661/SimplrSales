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
using System.Net.Mail;
using System.Net;
using SEJAdjustItemLot;
using System.Text;

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

         private void connection()
        {
            constr = ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString();
            con = new SqlConnection(constr);
        }

        public JsonResult CheckSessionExpired()
        {
            if (Session["ScreenName"] == null)
                return Json("sessionexpired");
            else
                return Json("");
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
                return RedirectToAction("Login", "Login", new { sessionexpired = "sessionexpired" });
            }
        }
       
        public ActionResult FormConfig(string screenName)
        {
            ViewBag.ScreenName = screenName;
            return View();
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

        public string GetTabGroupMenuList1(string query)
        {
            try
            {
                query = AESEncrytDecry.DecryptStringAES(query);//encript

                //var textQuery = _commonRule.QueryconfigText("" + ScreenName + "_FORM_TABGROUP");
                var data = _commonRule.getRowList(query);
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

        public ActionResult ExecuteReader1(string query)
        {
            try
            {
                query = AESEncrytDecry.DecryptStringAES(query);//encript

                var modelList = new List<ExecuteReaderList>();
                // query = "select Distinct  VM.TransNo as [Transaction No],Format(VM.TransDate,'dd/MM/yyyy') as [Transaction Date],VM.CustNO as [Customer No],ISNULL(C.CustName,N.StoreName) as [Customer Name],VM.AgentID as [Agent ID],ISNULL(VM.ActivityCode,'') as [Activity Code],ISNULL(A.ActivityName,'') as [Activity Name],ISNULL(VM.SchemeCode,'') as [Scheme Code] ,ISNULL(VM.Atype,'') as [Activity Type],ISNULL(U.[FileName],'') as [File Name] from V5_ActivityMonitoringHeader VM Left join Customer C on C.CustNo=VM.CustNo Left join V5_NewCustomer N on N.CustNo=VM.CustNo Left Join V5_TEPActivity A on A.ActivityCode =VM.ActivityCode Left join uploadphoto U on U.FileName Like '%' + VM.TransNo + '%' Order by TransNo";
                var data = _commonRule.getRowList(query);
                return Json(data);
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                return Json(string.Empty);
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

        //[HttpPost]
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
               // object obj = System.Reflection.Missing.Value;

                var excelApp = new Excel1.Application();
                var wb = excelApp.Workbooks.Add();

                ///
                var colCount = 1;
                var rowCount = 2;
                Excel1._Worksheet workSheet = (Excel1.Worksheet)wb.Worksheets.Add();
                if (defaultValue != "" && defaultValue != null)
                    workSheet.Name = defaultValue;
                try
                {
                    foreach (DataColumn col in dt.Columns)
                    {
                        workSheet.Cells[1, colCount] = col.ColumnName;
                        colCount++;
                    }
                }
                catch (Exception)
                {

                    throw;
                }

                string[,] ranges = new string[dt.Rows.Count, dt.Columns.Count];
                rowCount = 0;
                try
                {
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
                }
                catch (Exception)
                {

                    throw;
                }

                ErrorLogString("filename - " + srcfileInfo.FullName);

                
                    wb.SaveAs(srcfileInfo.FullName, Microsoft.Office.Interop.Excel.XlFileFormat.xlOpenXMLWorkbook, Type.Missing, Type.Missing, Type.Missing, Type.Missing, Microsoft.Office.Interop.Excel.XlSaveAsAccessMode.xlExclusive, Type.Missing, Type.Missing, Type.Missing, Type.Missing, Type.Missing);

               
               // wb.SaveAs(srcfileInfo.FullName);
                wb.Close();
                excelApp.Quit();
                System.Runtime.InteropServices.Marshal.ReleaseComObject(excelApp);

                return Json(downloadListReplace + "" + sheetName, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                return Json(ex, JsonRequestBehavior.AllowGet);
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
                var ScreenName1 = string.Empty;

                if (FieldName != null && FieldName != "")
                   ScreenName1 = _screenName;
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

                //Start-Changes only for MassMarketing, Item Promotion Applies To Tab. Changed on 12.10.2023 by Vishnu Kumar.
                if (ConfigurationManager.AppSettings["ProjectName"].ToString().ToUpper() == "MM" && ScreenName1 == "ItemPromotionEdit_Appliesto")
                {
                    systemValue = "0";
                }
                //End-Changes only for MassMarketing, Item Promotion Applies To Tab. Changed on 12.10.2023 by Vishnu Kumar.

                int PageSize = systemValue == "" ? 10 : Convert.ToInt32(systemValue);
                _PageSize = PageSize;

                //try
                //{
                //    var projectName = ConfigurationManager.AppSettings["ProjectName"];
                //    if (projectName.ToString() == "jsu" && screenName.StartsWith("InventoryForm") == true)
                //    {
                //        _PageSize = 20;
                //        PageSize = 20;
                //    }
                   
                //}
                //catch (Exception ex)
                //{
                   
                //}

                var PageNumber = (pageNumber == null ? 1 : Convert.ToInt32(pageNumber));

                var query = string.Empty;
                var cntQuery = string.Empty;
                var queryText = string.Empty;
                string orderby = string.Empty;
                string groupby = string.Empty;
                queryText = _commonRule.QueryconfigForList(ScreenName, ref orderby, ref groupby);

                if (ActionType == "LOOKUP")
                {
                    if (searchOption != "")
                    {
                        if (queryText.Contains("<HugeData>,") == true || queryText.Contains("<HugeData> ,") == true)
                        {
                            queryText = queryText.Replace("<HugeData>,", "");
                            queryText = queryText.Replace("<HugeData> ,", "");
                        }
                    }
                }

                if (SortOption == "")
                {
                    //Newly addded by.M 02.09.2021 - if logic only
                    if (queryText.IndexOf("exec ") >= 0)
                    {
                        //  searchOption.Replace("'",""")
                        //query = queryText + ", '" + searchOption.Replace("'%", "''%").Replace("%'", "%''") + " " + groupby + " " + orderby + "'";

                       // if (searchOption.IndexOf("date") >= 0)
                            query = queryText + ", \"" + searchOption + " " + groupby + " " + orderby + "\"";
                        //else
                           // query = queryText + ", '" + searchOption.Replace("'%", "''%").Replace("%'", "%''") + " " + groupby + " " + orderby + "'";
                        
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

                //var cnt1 = ScreenName.Split(new string[] { "Form_LISTVIEW" }, StringSplitOptions.None).Count();
                //var cnt2 = ScreenName.Split(new string[] { "LISTVIEW" }, StringSplitOptions.None)[0].Split('_').Count();

                //queryText = queryText + cnt1;

                //queryText = queryText + cnt2;

                //var cntt1 = cnt1;
                //var cntt2 = cnt2;
                // cnt1 = cnt1;
                // cnt2 = cnt2;



                if (ScreenName.Split(new string[] { "Form_LISTVIEW" }, StringSplitOptions.None).Count() > 1 || ScreenName.Split(new string[] { "LISTVIEW" }, StringSplitOptions.None)[0].Split('_').Count() == 3)
                {
                    if (ispagination == true && queryText.IndexOf("exec ") >= 0)
                    {
                        query = query + "," + "' offset  " + ((PageNumber - 1) * PageSize) + "  rows Fetch next " + PageSize + " rows only'"; //' limit 0, 100';
                        cntQuery = cntQuery + ",''";
                    }
                    else if (ispagination == false && queryText.IndexOf("exec ") >= 0)
                    {
                        query = query + ",''";//+ "' offset  " + ((PageNumber - 1) * PageSize) + "  rows Fetch next " + PageSize + " rows only'"; //' limit 0, 100';
                        cntQuery = cntQuery + ",''";
                    }
                    else if (ispagination == true)
                        query = query + " offset  " + ((PageNumber - 1) * PageSize) + "  rows Fetch next " + PageSize + " rows only"; //' limit 0, 100';
                }
                else if (_screenName.ToLower().Contains("list") == true)
                {
                    if (queryText.IndexOf("exec ") >= 0)
                    {
                        query = query + "," + "' offset  " + ((PageNumber - 1) * PageSize) + "  rows Fetch next " + PageSize + " rows only'"; //' limit 0, 100';
                        cntQuery = cntQuery + ",''";
                    }
                    else
                    {
                        query = query + " offset  " + ((PageNumber - 1) * PageSize) + "  rows Fetch next " + PageSize + " rows only";
                    }
                }
                else
                {
                    if (ScreenName.Split(new string[] { "LISTVIEW" }, StringSplitOptions.None)[0].Split('_').Count() == 2 && queryText.IndexOf("exec ") >= 0)
                    {
                        query = query + "," + "' offset  " + ((PageNumber - 1) * PageSize) + "  rows Fetch next " + PageSize + " rows only'"; //' limit 0, 100';
                        cntQuery = cntQuery + ",''";
                    }
                    else if(queryText.IndexOf("exec ") >= 0)
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

                string _prjectname = "";

                var PaginationValue = Session["PaginationValue"].ToString();

                Boolean _hugedata = false;


                try
                {
                    _prjectname = Session["ProjectName"].ToString();
                }
                catch (Exception)
                {

                    //throw;
                }

                query = AESEncrytDecry.DecryptStringAES(query);//encript
                countQuery = AESEncrytDecry.DecryptStringAES(countQuery);//encript
                cntQuery = AESEncrytDecry.DecryptStringAES(cntQuery);//encript
                countQuery = "select floor(count(*) /" + _PageSize + ") + case when (count(*) %" + _PageSize + ") = 0 then 0 else 1 end  as cnt, count(*) as totalrows," + _PageSize + " as pagesize from (" + countQuery + ") rs";
                var _screenName = ScreenName;
                var screenName = string.Empty;

                if (FieldName != null && FieldName != "")
                    screenName = ScreenName + "_LISTVIEW_" + FieldName;
                if (ActionType == "LOOKUP") //temp
                    screenName = ScreenName + "_FORM_LOOKUP_LISTVIEW_" + FieldName;
                screenName = screenName == "" ? ScreenName : screenName;
                ScreenName = screenName;


                if (ActionType == "LOOKUP")
                {
                    if (query.ToLower().Contains("<hugedata>,") == true || query.ToLower().Contains("<hugedata> ,") == true)
                    {
                        query = query.Replace("<HugeData>,", "");
                        query = query.Replace("<HugeData> ,", "");
                        _hugedata = true;

                    }

                }

                var dataList = _commonRule.getValueList(query);
                var countRows = _commonRule.getValueList(countQuery);

                //if (countRows == "")
                //    countRows = "[{\"cnt\":0}]";

                if (ScreenName.Split(new string[] { "Form_LISTVIEW" }, StringSplitOptions.None).Count() > 1 || cntQuery.IndexOf("exec ") >= 0)
                {
                    ////
                    if (ispagination == true || cntQuery.IndexOf("exec ") >= 0)
                    {
                     //   var PaginationValue = Session["PaginationValue"];
                        if (cntQuery.IndexOf("exec ") >= 0)
                        {
                            query = query.Split(new string[] { "offset" }, StringSplitOptions.None)[0] + "'";
                            // query = query.Replace("offset  0  rows Fetch next 10 rows only", "");

                            var dataList1 = _commonRule.getDataTableList(query);

                            var tTotal = dataList1.Rows.Count;



                            int tCnt = 0;

                            if ((tTotal % _PageSize) > 0)
                                tCnt = (tTotal / _PageSize) + 1;
                            else
                                tCnt = (tTotal / _PageSize);


                            countRows = "[{ \"cnt\":" + tCnt + ",\"totalrows\":" + tTotal + ",\"pagesize\":" + PaginationValue + "}]";
                        }
                        else
                        {
                           
                            DataTable dt = new DataTable();
                            dt = _commonRule.getDataTableList(cntQuery);
                            var paginationCnt = dt.Rows.Count;
                            //countQuery = "select floor(" + paginationCnt + " / 10) + case when(" + paginationCnt + " % 10) = 0 then 0 else 1 end as cnt";
                            //commented by Vignesh 26/06/2024
                            countQuery = "select floor(" + paginationCnt + " / " + PaginationValue + ") + case when(" + paginationCnt + " %  " + PaginationValue + ") = 0 then 0 else 1 end as cnt, " + paginationCnt + " as totalrows, " + PaginationValue + " as pagesize";
                            countRows = _commonRule.getValueList(countQuery);
                        }
                        
                    }
                    
                    else
                    {
                        countRows = "[{\"cnt\":0}]";
                    }
                }

                if (_prjectname == "EBFF")
                {
                    if (ActionType != "LOOKUP" && _screenName.ToLower().Contains("list") == false && ispagination == false)
                        countRows = "[{\"cnt\":0}]";
                }


                if (_hugedata == true)
                {
                    countRows = "[{ \"cnt\":100,\"totalrows\":1000,\"pagesize\":" + PaginationValue.ToString() + "}]";
                }

                var result = (new
                {
                    List = dataList,
                    countRows = countRows,
                    MaxJsonLength = int.MaxValue
                });

                //Changes done by Vignesh 26/06/2024
                //return Json(result);
                return new JsonResult()
                {
                    ContentEncoding = Encoding.Default,
                    ContentType = "application/json",
                    Data = result,
                    JsonRequestBehavior = JsonRequestBehavior.AllowGet,
                    MaxJsonLength = int.MaxValue
                };

               // return Json(result, JsonRequestBehavior.AllowGet);
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

        //Newly added by.M 07.02.2023
        //[HttpGet]
        public JsonResult ExportListData(string query, string ScreenName)
        {
            try
            {
                var UserID = Session["UserName"];
                query = AESEncrytDecry.DecryptStringAES(query);

                String exportPath = ConfigurationManager.AppSettings["ExportFiles"];
                String uploadpath = exportPath.Replace("~", "..");
                string fileLocation = Server.MapPath(exportPath);

                var objExp = new SimplrExportBLL.Export();
                objExp.CS = constr;
                objExp.UserID = Session["UserId"].ToString();
                var modelList = new List<ExecuteReaderList>();
                var dt = _commonRule.getDataTableList(query);

                string fileName = ScreenName + "_" + UserID + "_" + DateTime.Now.ToString("yyyyMMddHHmmssfff");
                var fname = objExp.dttoexcelCR(dt, fileLocation, fileName, ScreenName);
                var returnFile = uploadpath + "/" + fileName;

                return Json(returnFile, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex.ToString(), JsonRequestBehavior.AllowGet);
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
                return RedirectToAction("Login", "Login", new { sessionexpired = "sessionexpired" });
            }
            //ViewBag.ScreenName = screenName;
            //return View();
        }

        public ActionResult GetReport(string screenName)
        {
            Session["ScreenName"] = screenName;
            return RedirectToAction("Create");
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
                    if (true)
                    {
                        // ExePath = @"D:\Applicaton\oopsConsoleApp.exe";
                        Process process = Process.Start(ExePath);
                        //if need wait and return use this two line
                        //Process tempProc = Process.GetProcessById(process.Id);
                        //tempProc.WaitForExit();
                    }
                    else
                    {
                        //unilever
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

        public void LaunchCommandLineApp()
        {

            try
            {

            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
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

        [HttpPost]
        public JsonResult SaveWebtoolAuditlog(string screenName)
        {
            try
            {
                var projectName = ConfigurationManager.AppSettings["ProjectName"];
                if (projectName.ToString() == "jsu")
                {
                    var userId = Session["UserId"];
                    var query = "insert into webtoolAuditlog(TableName, UserID, DTG, ActivityType, RefNo, TransNo, AgentCode, ScreenName)";
                    query += " select 'Menu',UserID,GETDATE(),'MenuClick','','',code,'" + screenName + "' from salesagent where UserID = '" + userId + "'";
                    var dataList = _commonRule.getValueList(query);
                }
                return Json("Success");
            }
            catch (Exception ex)
            {
                return Json("error");
            }
        }

        [HttpPost]
        public JsonResult SEJAdjustItem()
        {
            try
            {
                var cs = ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString();
                String exportPath = ConfigurationManager.AppSettings["ExportFiles"];
                String uploadpath = exportPath.Replace("~", "..");

                //var p = Path.GetFullPath(uploadpath);

               
                var responsePath = ConfigurationManager.AppSettings["SEJInventoryItemPath"];
                AdjustInvLotWiseSimplrClass.connString = cs;
                AdjustInvLotWiseSimplrClass.path = responsePath;

                // var returnFile = uploadpath + "/" + fileName;
                

                var response = AdjustInvLotWiseSimplrClass.AdjustInvLotWiseSimplr();

                var sentPath = AdjustInvLotWiseSimplrClass.sendPath; // uploadpath + "/" + Path.GetFileName(AdjustInvLotWiseSimplrClass.sendPath);

               var fname = Path.GetFileName(AdjustInvLotWiseSimplrClass.sendPath);


               


                var returnFile = uploadpath + fname;
                // Move the file.


                return Json(response + '@' + returnFile + '@' + fname);
            }
            catch (Exception ex)
            {
                return Json("Error - " + ex.ToString());
            }
        }


        [HttpPost]
        public JsonResult VehicleAssignmentLogString(string msg)
        {
            //if (_isLogFile == "False")
            // return Json(0);
            if (!Directory.Exists(dir))  // if it doesn't exist, create
                Directory.CreateDirectory(dir);
            string message = string.Format("Time: {0}", DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss tt"));
            message += Environment.NewLine;
            message += "-----------------------------------------------------------";
            message += Environment.NewLine;
            message += string.Format("Message: {0}", msg);
            message += Environment.NewLine;
            message += "-----------------------------------------------------------";
            message += Environment.NewLine;

            // COMMENTED 21.04.2021 =================
            string dteinfo = DateTime.Now.ToString("dd/MM/yyyy").Replace("/", "_");
            string strUserId = HttpContext.Session["UserId"].ToString();// HttpContext.Current.Session["UserName"].ToString().Replace("/", "_").Replace("&", "_");
            string path = System.Web.HttpContext.Current.Server.MapPath("~/ViewErrorLogFiles/VehicleAssignmentLogString_" + strUserId + "_" + dteinfo + ".txt");

            //string path = System.Web.HttpContext.Current.Server.MapPath("~/ViewErrorLogFiles/ErrorLogString.txt");

            using (StreamWriter writer = new StreamWriter(path, true))
            {
                writer.WriteLine(message);
                writer.Close();
                writer.Dispose();
            }
            return Json(1);
        }


        [HttpPost]
        public JsonResult PONewSKUDistributorLogString(string msg)
        {
            //if (_isLogFile == "False")
               // return Json(0);
            if (!Directory.Exists(dir))  // if it doesn't exist, create
                Directory.CreateDirectory(dir);
            string message = string.Format("Time: {0}", DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss tt"));
            message += Environment.NewLine;
            message += "-----------------------------------------------------------";
            message += Environment.NewLine;
            message += string.Format("Message: {0}", msg);
            message += Environment.NewLine;
            message += "-----------------------------------------------------------";
            message += Environment.NewLine;

            // COMMENTED 21.04.2021 =================
            string dteinfo = DateTime.Now.ToString("dd/MM/yyyy").Replace("/", "_");
            string strUserId = HttpContext.Session["UserId"].ToString();// HttpContext.Current.Session["UserName"].ToString().Replace("/", "_").Replace("&", "_");
            string path = System.Web.HttpContext.Current.Server.MapPath("~/ViewErrorLogFiles/PONewSKUDistributorLogString_" + strUserId + "_" + dteinfo + ".txt");

            //string path = System.Web.HttpContext.Current.Server.MapPath("~/ViewErrorLogFiles/ErrorLogString.txt");

            using (StreamWriter writer = new StreamWriter(path, true))
            {
                writer.WriteLine(message);
                writer.Close();
                writer.Dispose();
            }
            return Json(1);
        }

        [HttpPost]
        public JsonResult POReceivingViewFormLogString(string msg)
        {
            //if (_isLogFile == "False")
            // return Json(0);
            if (!Directory.Exists(dir))  // if it doesn't exist, create
                Directory.CreateDirectory(dir);
            string message = string.Format("Time: {0}", DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss tt"));
            message += Environment.NewLine;
            message += "-----------------------------------------------------------";
            message += Environment.NewLine;
            message += string.Format("Message: {0}", msg);
            message += Environment.NewLine;
            message += "-----------------------------------------------------------";
            message += Environment.NewLine;

            // COMMENTED 21.04.2021 =================
            string dteinfo = DateTime.Now.ToString("dd/MM/yyyy").Replace("/", "_");
            string strUserId = HttpContext.Session["UserId"].ToString();// HttpContext.Current.Session["UserName"].ToString().Replace("/", "_").Replace("&", "_");
            string path = System.Web.HttpContext.Current.Server.MapPath("~/ViewErrorLogFiles/POReceivingViewFormLogString_" + strUserId + "_" + dteinfo + ".txt");

            //string path = System.Web.HttpContext.Current.Server.MapPath("~/ViewErrorLogFiles/ErrorLogString.txt");

            using (StreamWriter writer = new StreamWriter(path, true))
            {
                writer.WriteLine(message);
                writer.Close();
                writer.Dispose();
            }
            return Json(1);
        }

        [HttpPost]
        public JsonResult SearchLogString(string msg)
        {
            if (_isLogFile == "False")
                return Json(0);
            if (!Directory.Exists(dir))  // if it doesn't exist, create
                Directory.CreateDirectory(dir);
            string message = string.Format("Time: {0}", DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss tt"));
            message += Environment.NewLine;
            message += "-----------------------------------------------------------";
            message += Environment.NewLine;
            message += string.Format("Message: {0}", msg);
            message += Environment.NewLine;
            message += "-----------------------------------------------------------";
            message += Environment.NewLine;

            // COMMENTED 21.04.2021 =================
            string dteinfo = DateTime.Now.ToString("dd/MM/yyyy").Replace("/", "_");
            string strUserId = HttpContext.Session["UserId"].ToString();// HttpContext.Current.Session["UserName"].ToString().Replace("/", "_").Replace("&", "_");
            string path = System.Web.HttpContext.Current.Server.MapPath("~/ViewErrorLogFiles/SearchLogString_" + strUserId + "_" + dteinfo + ".txt");

            //string path = System.Web.HttpContext.Current.Server.MapPath("~/ViewErrorLogFiles/ErrorLogString.txt");

            using (StreamWriter writer = new StreamWriter(path, true))
            {
                writer.WriteLine(message);
                writer.Close();
                writer.Dispose();
            }
            return Json(1);
        }

        [HttpPost]
        public JsonResult PaginationLogString(string msg)
        {
           // if (_isLogFile == "False")
              //  return Json(0);
            if (!Directory.Exists(dir))  // if it doesn't exist, create
                Directory.CreateDirectory(dir);
            string message = string.Format("Time: {0}", DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss tt"));
            message += Environment.NewLine;
            message += "-----------------------------------------------------------";
            message += Environment.NewLine;
            message += string.Format("Message: {0}", msg);
            message += Environment.NewLine;
            message += "-----------------------------------------------------------";
            message += Environment.NewLine;

            // COMMENTED 21.04.2021 =================
            string dteinfo = DateTime.Now.ToString("dd/MM/yyyy").Replace("/", "_");
            string strUserId = HttpContext.Session["UserId"].ToString();// HttpContext.Current.Session["UserName"].ToString().Replace("/", "_").Replace("&", "_");
            string path = System.Web.HttpContext.Current.Server.MapPath("~/ViewErrorLogFiles/PaginationLogString_" + strUserId + "_" + dteinfo + ".txt");

            //string path = System.Web.HttpContext.Current.Server.MapPath("~/ViewErrorLogFiles/ErrorLogString.txt");

            using (StreamWriter writer = new StreamWriter(path, true))
            {
                writer.WriteLine(message);
                writer.Close();
                writer.Dispose();
            }
            return Json(1);
        }

        [HttpPost]

        public JsonResult ItemPromoLogString(string msg)
        {
            if (_isLogFile == "False")
                return Json(0);
            if (!Directory.Exists(dir))  // if it doesn't exist, create
                Directory.CreateDirectory(dir);
            string message = string.Format("Time: {0}", DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss tt"));
            message += Environment.NewLine;
            message += "-----------------------------------------------------------";
            message += Environment.NewLine;
            message += string.Format("Message: {0}", msg);
            message += Environment.NewLine;
            message += "-----------------------------------------------------------";
            message += Environment.NewLine;

            // COMMENTED 21.04.2021 =================
            string dteinfo = DateTime.Now.ToString("dd/MM/yyyy").Replace("/", "_");
            string strUserId = HttpContext.Session["UserId"].ToString();// HttpContext.Current.Session["UserName"].ToString().Replace("/", "_").Replace("&", "_");
            string path = System.Web.HttpContext.Current.Server.MapPath("~/ViewErrorLogFiles/ItemPromotion_LogString_" + strUserId + "_" + dteinfo + ".txt");

            //string path = System.Web.HttpContext.Current.Server.MapPath("~/ViewErrorLogFiles/ErrorLogString.txt");

            using (StreamWriter writer = new StreamWriter(path, true))
            {
                writer.WriteLine(message);
                writer.Close();
                writer.Dispose();
            }
            return Json(1);
        }

        [HttpPost]
        public JsonResult ItemPromoLogCalculation(string msg)
        {
            if (_isLogFile == "False")
                return Json(0);
            if (!Directory.Exists(dir))  // if it doesn't exist, create
                Directory.CreateDirectory(dir);
            string message = string.Format("Time: {0}", DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss tt"));
            message += Environment.NewLine;
            message += "-----------------------------------------------------------";
            message += Environment.NewLine;
            message += string.Format("Message: {0}", msg);
            message += Environment.NewLine;
            message += "-----------------------------------------------------------";
            message += Environment.NewLine;

            // COMMENTED 21.04.2021 =================
            string dteinfo = DateTime.Now.ToString("dd/MM/yyyy").Replace("/", "_");
            string strUserId = HttpContext.Session["UserId"].ToString();// HttpContext.Current.Session["UserName"].ToString().Replace("/", "_").Replace("&", "_");
            string path = System.Web.HttpContext.Current.Server.MapPath("~/ViewErrorLogFiles/ItemPromotion_LogCalculation_" + strUserId + "_" + dteinfo + ".txt");

            //string path = System.Web.HttpContext.Current.Server.MapPath("~/ViewErrorLogFiles/ErrorLogString.txt");

            using (StreamWriter writer = new StreamWriter(path, true))
            {
                writer.WriteLine(message);
                writer.Close();
                writer.Dispose();
            }
            return Json(1);
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
