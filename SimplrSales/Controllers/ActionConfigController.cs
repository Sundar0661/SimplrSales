using Newtonsoft.Json;
using SimplrSales.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SimplrSales.Controllers
{
    public class ActionConfigController : BusinessRule
    {
        public ActionResult ActionConfig(string ScreenName, string FieldName, string ActionName, string FormView)
        {
            DataTable dataTable = new DataTable();
            if (FormView != null)
                FormView = ReplaceHashSymbol(FormView);
            var result = string.Empty;
            try
            {
                if (ActionName.ToLower() == "rowitemclicked")
                    dataTable = _commonRule.GetActionConfigList(ScreenName, "", ActionName, "ActionType");
                else
                    dataTable = _commonRule.GetActionConfigList(ScreenName, FieldName, ActionName, "ActionType");
                AssignDataTable(dataTable);
                if (ActionName.ToLower() == "menuitemclicked")
                {
                    return RedirectToAction("FormViewList", "Form", new { ScreenName = arrActionValue[0].ToString(), FieldName = FieldName, formView = FormView });
                    //return RedirectToAction("ListView", "Form", new { ScreenName = arrActionValue[0].ToString() });
                }
                else if (ActionName.ToLower() == "listitemclicked")
                {
                    return RedirectToAction("Login", "Form", new { ScreenName = arrActionValue[0].ToString() });
                }
                else if (ActionName.ToLower() == "rowitemclicked")
                {
                    DataTable dataTable1 = _commonRule.GetActionConfigListNew(arrActionValue[0].ToString());
                    AssignDataTable1(dataTable1);
                    return RedirectToAction("FormViewList", "Form", new { ScreenName = arrActionValue[0].ToString(), FieldName = FieldName, formView = FormView });
                }
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
            }
            return RedirectToAction("Login", "Login");
        }
        public static List<dynamic> arrActionQuery = new List<dynamic>();
        public string[] arrActionValue = new string[0];
        public void AssignDataTable(DataTable dataTable)
        {
            arrActionValue = new string[dataTable.Rows.Count];
            for (int i = 0; i < dataTable.Rows.Count; i++)
            {
                arrActionValue[i] = dataTable.Rows[i].ItemArray[7].ToString();
            }
        }
        public void AssignDataTable1(DataTable dataTable)
        {
            arrActionQuery = new List<dynamic>();
            for (int i = 0; i < dataTable.Rows.Count; i++)
            {
                dynamic obj = new System.Dynamic.ExpandoObject();

                obj.fieldName = dataTable.Rows[i].ItemArray[1].ToString();//FieldName
                obj.DisplayNo = dataTable.Rows[i].ItemArray[2].ToString();//DisplayNo
                obj.ActionName = dataTable.Rows[i].ItemArray[3].ToString();//ActionName
                obj.ActionType = dataTable.Rows[i].ItemArray[4].ToString();//ActionType
                obj.ActionIndex = dataTable.Rows[i].ItemArray[5].ToString();//ActionIndex
                obj.Action = dataTable.Rows[i].ItemArray[6].ToString();//ActionPlan
                obj.ActionValue = dataTable.Rows[i].ItemArray[7].ToString();//ActionValue
                obj.ActionFailedValue = dataTable.Rows[i].ItemArray[8].ToString();//ActionFailedValue
                arrActionQuery.Add(obj);
            }
        }


        public String GetActionConfigData2(string query)
        //  public JsonResult GetActionConfigData(string query)
        {
            // Session["UserName"] = null;
            //  testSession();
            try
            {
                if (Session["UserName"] != null)
                {
                    query = AESEncrytDecry.DecryptStringAES(query);//encript
                    var data = _commonRule.getValueList1(query);
                    return data;
                }
                else
                {
                    // return RedirectToAction("Login", "Login", new { sessionexpired = "sessionexpired" });
                    var data = "sessionexpired";
                    return data;
                }
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                var data = "";
                return data;
            }
        }

        public string ReplaceHashSymbol(string data)
        {
            return data.Replace("hashsymbol", "#");
        }

        public JsonResult ActionConfig1(string data, string ScreenName, string FieldName, string sActionEvent)
        {
            dynamic objData = string.Empty;
            data = JsonConvert.DeserializeObject(objData);
            objData.fieldName = (objData.fieldName != null && objData.fieldName != "") ? objData.fieldName : "";
            var sActionName = string.Empty;
            var sParamsActionName = string.Empty;

            for (var i = 0; i < arrActionQuery.Count; i++)
            {
                sActionName = arrActionQuery[i].fieldName + "" + arrActionQuery[i].ActionName;
                sParamsActionName = objData.fieldName + "" + sActionEvent;
                if (sActionName.ToUpper() == sParamsActionName.ToUpper())
                {
                    var bFlag = true;
                    if (objData.Type == "ALERT")
                    {
                        if (arrActionQuery[i].ActionIndex != objData.value)
                        {
                            bFlag = false;
                        }
                    }

                    if (bFlag == true)
                    {
                        if (arrActionQuery[i].ActionType.toUpperCase() == "EXECUTE")
                        {
                            //  handleFieldAction(ScreenName, objData.fieldName, arrActionQuery[i].Action);
                        }
                        else if (arrActionQuery[i].ActionType.toUpperCase() == "NEXT")
                        {
                            //Ti.App.ARRAYOPERATION.checkWorkFlow();
                        }
                        else if (arrActionQuery[i].ActionType.toUpperCase() == "BACK")
                        {
                            //alert('ActionType BACK');
                            //Ti.App.ARRAYOPERATION.checkWorkFlow();
                            //  UI.closeWindow();
                        }

                    }

                }
            }
            return Json("test");
        }

        //dynamic FormView = string.Empty;
        public string ExecuteNonQuerys(string data)
        {
            // // FOR THAI LANGUAGE PURPOSE
            //data = System.Web.HttpUtility.UrlDecode(data);
            data = System.Net.WebUtility.UrlDecode(data);
            _commonRule.ExecuteNonQuery(data);
            return string.Empty;
        }
        public string BulkInsertQueries(string data)
        {
            data = AESEncrytDecry.DecryptStringAES(data);//encript
            _commonRule.ExecuteNonQuery(data);
            return string.Empty;
        }



        public String GetActionConfigData(string query)
      //  public JsonResult GetActionConfigData(string query)
        {
           // Session["UserName"] = null;
          //  testSession();
            try
            {
                if (Session["UserName"] != null)
                {
                    query = AESEncrytDecry.DecryptStringAES(query);//encript
                    var data = _commonRule.getValueList(query);
                    return data;
                }
                else
                {
                    // return RedirectToAction("Login", "Login", new { sessionexpired = "sessionexpired" });
                    var data = "sessionexpired";
                    return data;
                }
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                var data = "";
                return data;
            }
        }


        public String GetActionConfigData1(string query)
        //  public JsonResult GetActionConfigData(string query)
        {
            // Session["UserName"] = null;
            //  testSession();
            try
            {
                if (Session["UserName"] != null)
                {
                    query = AESEncrytDecry.DecryptStringAES(query);//encript
                    var data = _commonRule.getValueList(query);
                    return data;
                }
                else
                {
                    var data = "sessionexpired";
                    return data;
                }
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                var data = "";
                return data;
            }
        }

        public string DOWNLOADZIP(string query, string fName)
        {
            query = AESEncrytDecry.DecryptStringAES(query);//encript
            var client = new System.Net.WebClient();
            //  string destinationFolder = @"C:\Users\DELL\Desktop\B\testA.txt";
            string destinationFile = string.Empty;
            var url = "http://13.67.95.127/KeeSongSimplrSalesService/Photo/DIS10230665200101201231_0.png";
            var uri = new Uri(url);
            var fileName = System.IO.Path.GetFileName(uri.AbsolutePath);
            var sourceURL = string.Empty;
            DataTable dt = _commonRule.getDataTableList(query);

            String path = ConfigurationManager.AppSettings["FileDownloadFolder"];

            string directoryPath = Server.MapPath(path).ToString();
            // string filePath = directoryPath;
            if (!Directory.Exists(directoryPath))
            {
                Directory.CreateDirectory(directoryPath);
            }
            var dat = DateTime.Now;
            var day = dat.ToString("dd");
            var month = dat.ToString("MM");
            var year = dat.Year;

            var hrs = dat.ToString("HH");
            var mins = dat.ToString("mm");
            var sec = dat.ToString("ss");
            // "~/ImportFiles/FileDownloadFolder"
            var userId = Session["UserId"].ToString();
            var newFolder = userId + "_" + year + month + day + hrs + mins + sec;
            var zipFolder = directoryPath + "\\" + newFolder;

            var isRow = false;
            try
            {
                foreach (DataRow dr in dt.Rows)
                {
                    foreach (DataColumn col in dt.Columns)
                    {
                        if (col.ColumnName == "DocNoImg")
                        {
                            if (!Directory.Exists(zipFolder))
                            {
                                Directory.CreateDirectory(zipFolder);
                            }
                            isRow = true;
                            sourceURL = dr[col].ToString();
                            // COMMENTED 13.04.2021 ==========================
                            //if (sourceURL.Split(' ').Count() <= 1)
                            //{
                            uri = new Uri(sourceURL);
                            fileName = System.IO.Path.GetFileName(uri.AbsolutePath);
                            // destinationFile = @"C:\Users\DELL\Desktop\B\" + fileName;
                            destinationFile = zipFolder + "\\" + fileName;
                            // COMMENTED 23.02.2021 =================================
                            try
                            {
                                client.DownloadFile(sourceURL, destinationFile);
                            }
                            catch (Exception e)
                            {
                                continue;
                            }
                            // COMMENTED 23.02.2021 =================================
                            //client.DownloadFile(sourceURL, destinationFile);
                            //}
                            // COMMENTED 13.04.2021 ==========================
                        }
                    }
                }
                //string startPath = @"C:\Users\DELL\Desktop\B";
                //string zipPath = @"C:\Users\DELL\Desktop\B.zip";
                // string extractPath = @".\extract";
                string startPath = zipFolder;
                string zipPath = zipFolder + ".zip";
                System.IO.Compression.ZipFile.CreateFromDirectory(startPath, zipPath);
                //System.IO.Compression.ZipFile.CreateFromDirectory(dirPath, zipFile);
                if (isRow == true)
                    return path.Replace("~", "..") + "/" + newFolder + ".zip";
                else
                    return string.Empty;
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                if (isRow == false)
                    return string.Empty;
                string startPath = zipFolder;
                string zipPath = zipFolder + ".zip";
                System.IO.Compression.ZipFile.CreateFromDirectory(startPath, zipPath);
                //System.IO.Compression.ZipFile.CreateFromDirectory(dirPath, zipFile);
                return path.Replace("~", "..") + "/" + newFolder + ".zip";
            }
        }

        public string GetActionConfigData11(string query)
        {
            try
            {
                // query = AESEncrytDecry.DecryptStringAES(query);//encript
                //var data = _commonRule.getValueList("EXEC [dbo].[Report_GetDashBoardNew4] '2020-03-13','503000266'");
                var data = string.Empty;
                System.Threading.Thread.Sleep(70000);
                return data;
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                return string.Empty;
            }
        }

        public string GetSuggestedOrderQuantity(string query)
        {
            try
            {
                query = AESEncrytDecry.DecryptStringAES(query);//encript
                var data = _commonRule.SuggestedOrderQuantity(query);
                return data;
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                return string.Empty;
            }
        }
        public string getFieldList(string query)
        {
            try
            {
                query = AESEncrytDecry.DecryptStringAES(query);//encript
                var data = _commonRule.getFieldList(query);
                return data;
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                return string.Empty;
            }
        }
        public string GetMultiSeriesLineChart(string query)
        {
            try
            {
                query = AESEncrytDecry.DecryptStringAES(query);//encript
                var data = _commonRule.GetMultiSeriesLineChart(query);
                return data;
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                return string.Empty;
            }
        }
        public string GetNameValueList(string query)
        {
            try
            {
                query = AESEncrytDecry.DecryptStringAES(query);//encript
                var data = _commonRule.getNameValueList(query);
                return data;
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                return string.Empty;
            }
        }
        public string getFieldList1(string query)
        {
            try
            {
                var data = _commonRule.getFieldList(query);
                return data;
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                return string.Empty;
            }
        }
        public string GetQueryString(string query)
        {
            try
            {
                if (Session["UserName"] != null)
                {
                    query = AESEncrytDecry.DecryptStringAES(query);//encript
                    var data = _commonRule.getQueryString(query);
                    return data;
                }
                else
                {
                    var data = "sessionexpired";
                    return data;
                }
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                var data = "";
                return data;
            }

            //try
            //{
            //    query = AESEncrytDecry.DecryptStringAES(query);//encript
            //    var data = _commonRule.getQueryString(query);
            //    return data;
            //}
            //catch (Exception ex)
            //{
            //    ErrorLog(ex);
            //    return string.Empty;
            //}
        }
        public string GetQueryString1(string query)
        {
            try
            {
                var data = _commonRule.getQueryString(query);
                return data;
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                return string.Empty;
            }
        }
    }
}
