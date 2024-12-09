using SimplrSales.Models;
using SimplrSales.Repository;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using Excel1 = Microsoft.Office.Interop.Excel;

namespace SimplrSales.Controllers.Form
{
    public class ExportController : BusinessRule
    {
        private SimplrSalesEdmxEntities db = new SimplrSalesEdmxEntities();
        SqlConnection cn = new SqlConnection();
        SqlCommand cmd = new SqlCommand();

        private SqlConnection con, con1;
        public DataRow dr;
        public string constr = string.Empty;
        //To Handle connection related activities
        private void connection()
        {
            constr = ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString();
            con = new SqlConnection(constr);
            con1 = new SqlConnection(constr);
        }

        public ActionResult ExportSQLUL(string tableName, HttpPostedFileBase file)
        {

            try
            {
                _userId = Session["UserId"].ToString();
                String appPath = ConfigurationManager.AppSettings["ExportFiles"];
                String uploadpath = appPath.Replace("~", "..");
                //String uploadpath = "../ImportFiles/ExportFiles";

                var result = string.Empty;
                connection();
                string fileLocation = Server.MapPath(appPath);
                //string fileLocation = Server.MapPath("~/ImportFiles/ExportFiles/");

                //   SimplrExportUL.SimplrExportUL objExport = new SimplrExportUL.SimplrExportUL();
                SimplrExport.SimplrExportUL objExport = new SimplrExport.SimplrExportUL();
                objExport.CS = constr;
                objExport.UserID = Session["UserId"].ToString();
                objExport.FolderPath = fileLocation;

                ImportLog("FolderPath (fileLocation):" + fileLocation);
                var tableNameList = tableName.Split(',');
                var filePath = "";
                var fname = "";

                DateTime todaysDate = DateTime.Now.Date;
                var day = todaysDate.ToString("dd");
                var month = todaysDate.ToString("MM");
                var year = todaysDate.Year;
                var returnvalue = "";
                for (int i = 0; i < tableNameList.Count(); i++)
                {
                    if (result != "")
                        result = result + " , ";
                    ImportLog("Step:1 Pass parameter:" + tableNameList[i]);
                    ImportLog("Step:1 Pass parameter _userId:" + _userId);
                    // result = result + tableNameList[i] + " = " + objExport.AutoExport(tableNameList[i]);
                    returnvalue = objExport.AutoExport(tableNameList[i], _userId);
                    result = result + returnvalue;
                    //  fname = objExport.AutoExport(tableNameList[i]);
                    fname = returnvalue;
                    ImportLog("Step:2 : ReturnValue =" + result);
                    if (filePath != "")
                        filePath = filePath + ",";
                    //Item Maintenance_20190624.xlsx
                    // fname = tableNameList[i] + "_" + year + "" + month + "" + day + ".xlsx";
                    filePath = filePath + uploadpath + "/" + System.IO.Path.GetFileName(fname);
                }
                return Json(filePath, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                ImportLog("Error Message = =" + ex.Message);
                return Json("", JsonRequestBehavior.AllowGet);

            }
        }

        public ActionResult ExportSQLULCR(string tableName, HttpPostedFileBase file)
        {

            try
            {
                _userId = Session["UserId"].ToString();
                String appPath = ConfigurationManager.AppSettings["ExportFiles"];
                String uploadpath = appPath.Replace("~", "..");
                //String uploadpath = "../ImportFiles/ExportFiles";

                var result = string.Empty;
                connection();
                string fileLocation = Server.MapPath(appPath);
                //string fileLocation = Server.MapPath("~/ImportFiles/ExportFiles/");

                //   SimplrExportUL.SimplrExportUL objExport = new SimplrExportUL.SimplrExportUL();
                SimplrExport.SimplrExportUL objExport = new SimplrExport.SimplrExportUL();
                objExport.CS = constr;
                objExport.UserID = Session["UserId"].ToString();
                objExport.FolderPath = fileLocation;

                ImportLog("FolderPath (fileLocation):" + fileLocation);
                var tableNameList = tableName.Split(',');
                var filePath = "";
                var fname = "";

                DateTime todaysDate = DateTime.Now.Date;
                var day = todaysDate.ToString("dd");
                var month = todaysDate.ToString("MM");
                var year = todaysDate.Year;
                var returnvalue = "";
                for (int i = 0; i < tableNameList.Count(); i++)
                {
                    if (result != "")
                        result = result + " , ";
                    ImportLog("Step:1 Pass parameter:" + tableNameList[i]);
                    ImportLog("Step:1 Pass parameter _userId:" + _userId);
                    // result = result + tableNameList[i] + " = " + objExport.AutoExport(tableNameList[i]);
                    returnvalue = objExport.AutoExportCR1(tableNameList[i], _userId);
                    result = result + returnvalue;
                    //  fname = objExport.AutoExport(tableNameList[i]);
                    fname = returnvalue;
                    ImportLog("Step:2 : ReturnValue =" + result);
                    if (filePath != "")
                        filePath = filePath + ",";
                    //Item Maintenance_20190624.xlsx
                    // fname = tableNameList[i] + "_" + year + "" + month + "" + day + ".xlsx";
                    filePath = filePath + uploadpath + "/" + System.IO.Path.GetFileName(fname);
                }
                return Json(filePath, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                ImportLog("Error Message = =" + ex.Message);
                return Json("", JsonRequestBehavior.AllowGet);

            }
        }

        public ActionResult ExportSQL(string tableName)
        {
            string AgentID = string.Empty; DateTime FromDt = DateTime.Now; DateTime ToDt = DateTime.Now;
            //string AgentID=string.Empty;
            //DateTime FromDt = DateTime.Now; DateTime ToDt = DateTime.Now;
            //string TblName, string UserID, string AgentID, DateTime FromDt, DateTime ToDt
            try
            {
                _userId = Session["UserId"].ToString();
                String exportPath = ConfigurationManager.AppSettings["ExportFiles"];
                String uploadpath = exportPath.Replace("~", "..");
                //String uploadpath = "../ImportFiles/ExportFiles";

                var result = string.Empty;
                connection();
                string fileLocation = Server.MapPath(exportPath);
                //string fileLocation = Server.MapPath("~/ImportFiles/ExportFiles/");

                // SimplrExportUL.SimplrExportUL objExport = new SimplrExportUL.SimplrExportUL();
                SimplrExport.SimplrExportUL objExport = new SimplrExport.SimplrExportUL();
                // SimplrExport.SimplrExportNew objExport = new SimplrExport.SimplrExportNew();
                objExport.CS = constr;
                objExport.UserID = Session["UserId"].ToString();
                objExport.FolderPath = fileLocation;

                ImportLog("FolderPath (fileLocation):" + fileLocation);
                var tableNameList = tableName.Split(',');
                var filePath = "";
                var fname = "";

                DateTime todaysDate = DateTime.Now.Date;
                var day = todaysDate.ToString("dd");
                var month = todaysDate.ToString("MM");
                var year = todaysDate.Year;
                var returnvalue = "";
                for (int i = 0; i < tableNameList.Count(); i++)
                {
                    if (result != "")
                        result = result + " , ";
                    ImportLog("Step:1 Pass parameter:" + tableNameList[i]);
                    ImportLog("Step:1 Pass parameter _userId:" + _userId);
                    // result = result + tableNameList[i] + " = " + objExport.AutoExport(tableNameList[i]);
                    //returnvalue = objExport.AutoExport(tableNameList[i], _userId, AgentID, FromDt, ToDt);
                    returnvalue = objExport.AutoExport(tableNameList[i], _userId);
                    result = result + returnvalue;
                    //  fname = objExport.AutoExport(tableNameList[i]);
                    fname = returnvalue;
                    ImportLog("Step:2 : ReturnValue =" + result);
                    if (filePath != "")
                        filePath = filePath + ",";

                    //Item Maintenance_20190624.xlsx
                    // fname = tableNameList[i] + "_" + year + "" + month + "" + day + ".xlsx";

                    filePath = filePath + uploadpath + "/" + System.IO.Path.GetFileName(fname) + "$" + returnvalue;
                }
                return Json(filePath, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                ImportLog("Error Message = =" + ex.Message);
                return Json("", JsonRequestBehavior.AllowGet);

            }
        }

        public ActionResult ExportSQLFromToDateOld(string tableName, string AgentID, DateTime FromDt, DateTime ToDt)
        {
            //string AgentID=string.Empty;
            //DateTime FromDt = DateTime.Now; DateTime ToDt = DateTime.Now;
            //string TblName, string UserID, string AgentID, DateTime FromDt, DateTime ToDt
            try
            {
                _userId = Session["UserId"].ToString();
                String exportPath = ConfigurationManager.AppSettings["ExportFiles"];
                String uploadpath = exportPath.Replace("~", "..");
                //String uploadpath = "../ImportFiles/ExportFiles";

                var result = string.Empty;
                connection();
                string fileLocation = Server.MapPath(exportPath);
                //string fileLocation = Server.MapPath("~/ImportFiles/ExportFiles/");

                //   SimplrExportUL.SimplrExportUL objExport = new SimplrExportUL.SimplrExportUL();
                SimplrExport.SimplrExportNew objExport = new SimplrExport.SimplrExportNew();
                objExport.CS = constr;
                objExport.UserID = Session["UserId"].ToString();
                objExport.FolderPath = fileLocation;

                ImportLog("FolderPath (fileLocation):" + fileLocation);
                var tableNameList = tableName.Split(',');
                var filePath = "";
                var fname = "";

                DateTime todaysDate = DateTime.Now.Date;
                var day = todaysDate.ToString("dd");
                var month = todaysDate.ToString("MM");
                var year = todaysDate.Year;
                var returnvalue = "";
                for (int i = 0; i < tableNameList.Count(); i++)
                {
                    if (result != "")
                        result = result + " , ";
                    ImportLog("Step:1 Pass parameter:" + tableNameList[i]);
                    ImportLog("Step:1 Pass parameter _userId:" + _userId);
                    // result = result + tableNameList[i] + " = " + objExport.AutoExport(tableNameList[i]);
                    // FromDt = DateTime.ParseExact(FromDt.ToString(), "yyyy-MM-dd", CultureInfo.InvariantCulture);
                    //ToDt = DateTime.ParseExact(ToDt.ToString(), "yyyy-MM-dd", CultureInfo.InvariantCulture);
                    returnvalue = objExport.AutoExport(tableNameList[i], _userId, AgentID, FromDt, ToDt);
                    result = result + returnvalue;
                    //  fname = objExport.AutoExport(tableNameList[i]);
                    fname = returnvalue;
                    ImportLog("Step:2 : ReturnValue =" + result);
                    if (filePath != "")
                        filePath = filePath + ",";

                    //Item Maintenance_20190624.xlsx
                    // fname = tableNameList[i] + "_" + year + "" + month + "" + day + ".xlsx";

                    filePath = filePath + uploadpath + "/" + System.IO.Path.GetFileName(fname) + "$" + returnvalue;
                }
                return Json(filePath, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                ImportLog("Error Message = =" + ex.Message);
                return Json("", JsonRequestBehavior.AllowGet);

            }
        }
        public ActionResult ExportSQLFromToDate(string tableName, string AgentID, DateTime FromDt, DateTime ToDt, string DistributorID, string SalesOfficeID, string SalesAgent, string FileType)
        {
            try
            {
                var projectName = Session["ProjectName"].ToString();
                _userId = Session["UserId"].ToString();
                String exportPath = ConfigurationManager.AppSettings["ExportFiles"];
                String uploadpath = exportPath.Replace("~", "..");
                //String uploadpath = "../ImportFiles/ExportFiles";

                var result = string.Empty;
                connection();
                string fileLocation = Server.MapPath(exportPath);
                SimplrExport.SimplrExportNew objExport = new SimplrExport.SimplrExportNew();

                objExport.CS = constr;
                objExport.UserID = Session["UserId"].ToString();
                objExport.FolderPath = fileLocation;
                objExport.FileType = (FileType == "" || FileType == null) ? "CSV" : FileType;

                ImportLog("FolderPath (fileLocation):" + fileLocation);
                var tableNameList = tableName.Split(',');
                var filePath = "";
                var fname = "";

                DateTime todaysDate = DateTime.Now.Date;
                var day = todaysDate.ToString("dd");
                var month = todaysDate.ToString("MM");
                var year = todaysDate.Year;
                var returnvalue = "";
                for (int i = 0; i < tableNameList.Count(); i++)
                {
                    if (result != "")
                        result = result + " , ";
                    ImportLog("Step:1 Pass parameter tableNameList & user Id :" + tableNameList[i] + " & " + _userId);
                    DateTime fdate = new DateTime(FromDt.Year, FromDt.Month, FromDt.Day);
                    DateTime tdate = new DateTime(ToDt.Year, ToDt.Month, ToDt.Day);
                    System.Threading.Thread.CurrentThread.CurrentCulture = new CultureInfo("en-IN");
                    DateTime frDate = DateTime.Parse(FromDt.ToString());
                    DateTime toDate = DateTime.Parse(ToDt.ToString());

                    string params_String = String.Format("tableNameList[i]={0},_userId={1},AgentID={2},FromDt={3},ToDt={4}",
                        tableNameList[i], _userId, AgentID, frDate, toDate);
                    ImportLog("Step:1 Parameters passed:" + params_String);
                    //DataTable dt = ExportToExcel11(tableNameList[i], _userId, SalesAgent, frDate, toDate);
                    //ExportToExcel1(dt);
                    if (projectName.ToLower() == "pvm" || projectName.ToLower() == "pvmb")
                    {
                        DataTable dt = ExportToExcelPVM(tableNameList[i], _userId, SalesAgent, frDate, toDate, DistributorID, SalesOfficeID);

                        returnvalue = objExport.AutoExportPVM(tableNameList[i], _userId, SalesAgent, frDate, toDate, DistributorID, SalesOfficeID);
                    }
                    else
                        returnvalue = objExport.AutoExport(tableNameList[i], _userId, AgentID, frDate, toDate);
                    result = result + returnvalue;
                    fname = returnvalue;
                    ImportLog("Step:2 : ReturnValue =" + result);
                    if (filePath != "")
                        filePath = filePath + ",";
                    filePath = filePath + uploadpath + "/" + System.IO.Path.GetFileName(fname) + "$" + returnvalue;
                }
                return Json(filePath, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                ImportLog("Error Message = =" + ex.Message);
                return Json("", JsonRequestBehavior.AllowGet);

            }
        }

        public ActionResult ExportToExcel1()
        {
            DataTable dt = ExportToExcel11();
            DataTable originalTable = dt;
            int batchSize = 50000;
            //

            List<DataTable> tables = new List<DataTable>();
            int i = 0;
            int j = 1;
            int kk = 0;
            DataTable newDt = originalTable.Clone();
            newDt.TableName = "Table_" + j;
            newDt.Clear();
            foreach (DataRow row in originalTable.Rows)
            {
                DataRow newRow = newDt.NewRow();
                newRow.ItemArray = row.ItemArray;
                newDt.Rows.Add(newRow);
                i++;
                kk++;
                if (i == batchSize)
                {
                    tables.Add(newDt);
                    j++;
                    newDt = originalTable.Clone();
                    newDt.TableName = "Table_" + j;
                    newDt.Clear();
                    i = 0;
                }

                if (originalTable.Rows.Count == kk)
                {
                    tables.Add(newDt);
                    //j++;
                    //newDt = originalTable.Clone();
                    //newDt.TableName = "Table_" + j;
                    //newDt.Clear();
                    //i = 0;
                    //kk = 0;
                }
            }

            var data = new[]{
                new { Name = "Ram", Email = "ram@techbrij.com", Phone = "111-222-3333" },
                        new { Name = "Shyam", Email = "shyam@techbrij.com", Phone = "159-222-1596" },
                        new { Name = "Mohan", Email = "mohan@techbrij.com", Phone = "456-222-4569" },
                        new { Name = "Sohan", Email = "sohan@techbrij.com", Phone = "789-456-3333" },
                        new { Name = "Karan", Email = "karan@techbrij.com", Phone = "111-222-1234" },
                        new { Name = "Brij", Email = "brij@techbrij.com", Phone = "111-222-3333" }
                };

            OfficeOpenXml.ExcelPackage excel = new OfficeOpenXml.ExcelPackage();
            var workSheet = excel.Workbook.Worksheets.Add("Daily Outlet Report 0");
            for (int k = 0; k < tables.Count(); k++)
            {
                if (k >= 1)
                    workSheet = excel.Workbook.Worksheets.Add("Daily Outlet Report " + k);
                workSheet.Cells[1, 1].LoadFromDataTable(tables[k], true);
            }
            //workSheet.Cells[1, 1].LoadFromDataTable(dt, true);
            //workSheet.Cells[1, 1].LoadFromCollection(data, true);
            //excel.Dispose();

            return File(excel.GetAsByteArray(), "application/vnd.ms-excel", "Daily Outlet Report.xlsx");

        }

        //public ActionResult ExportToExcel1(DataTable dt)
        //public ActionResult ExportToExcel1()
        //{
        //    DataTable dt = ExportToExcel11();
        //    DataTable originalTable = dt;
        //    int batchSize = 50000;
        //    //

        //    List<DataTable> tables = new List<DataTable>();
        //    int i = 0;
        //    int j = 1;
        //    int kk = 0;
        //    DataTable newDt = originalTable.Clone();
        //    newDt.TableName = "Table_" + j;
        //    newDt.Clear();
        //    foreach (DataRow row in originalTable.Rows)
        //    {
        //        DataRow newRow = newDt.NewRow();
        //        newRow.ItemArray = row.ItemArray;
        //        newDt.Rows.Add(newRow);
        //        i++;
        //        kk++;
        //        if (i == batchSize)
        //        {
        //            tables.Add(newDt);
        //            j++;
        //            newDt = originalTable.Clone();
        //            newDt.TableName = "Table_" + j;
        //            newDt.Clear();
        //            i = 0;
        //        }

        //        if (originalTable.Rows.Count == kk)
        //        {
        //            tables.Add(newDt);
        //            j++;
        //            newDt = originalTable.Clone();
        //            newDt.TableName = "Table_" + j;
        //            newDt.Clear();
        //            i = 0;
        //            kk = 0;
        //        }
        //    }

        //    //

        //    //var ff = Newtonsoft.Json.JsonConvert.SerializeObject(dt);
        //    //var fsf = Newtonsoft.Json.JsonConvert.DeserializeObject(ff);
        //    //var fssf = Newtonsoft.Json.JsonConvert.DeserializeObject(ff);

        //    //var list = new List<dynamic>();

        //    ////var dynamicDt = new List<dynamic>();
        //    ////foreach (DataRow row in dt.Rows)
        //    ////{
        //    ////    dynamic DyObj = new System.Dynamic.ExpandoObject();
        //    ////    dynamic obj = new System.Dynamic.ExpandoObject();
        //    ////    var dict = new Dictionary<string, string>();
        //    ////    List<string> list1 = new List<string>();

        //    ////    dynamic dyn = new System.Dynamic.ExpandoObject();
        //    ////    dynamicDt.Add(dyn);
        //    ////    foreach (DataColumn column in dt.Columns)
        //    ////    {
        //    ////        var dic = (IDictionary<string, string>)dyn;
        //    ////        //dic[column.ColumnName] = row[column];

        //    ////    }
        //    ////    list.Add(dict);
        //    ////}

        //    //System.Collections.ArrayList rows1 = new System.Collections.ArrayList();
        //    //var rows2 = new List<object>();
        //    //var rows3 = new List<string>();
        //    //var rows4 = new List<dynamic>();

        //    //foreach (DataRow row in dt.Rows)
        //    //{
        //    //    var dd = "{";
        //    //    foreach (DataColumn column in dt.Columns)
        //    //    {
        //    //        dd += column.ColumnName + " : " + row[column] + ",";
        //    //        //dic[column.ColumnName] = row[column];

        //    //    }
        //    //    dd += "}";
        //    //    dd = dd.Replace(",}", "}");
        //    //    rows1.Add(dd);
        //    //    rows2.Add(dd);
        //    //    rows3.Add(dd);
        //    //    rows4.Add(dd);
        //    //}


        //    //System.Collections.ArrayList rows = new System.Collections.ArrayList();

        //    //foreach (DataRow dataRow in dt.Rows)
        //    //    rows.Add(string.Join(";", dataRow.ItemArray.Select(item => item.ToString())));

        //    var data = new[]{
        //        new { Name = "Ram", Email = "ram@techbrij.com", Phone = "111-222-3333" },
        //                new { Name = "Shyam", Email = "shyam@techbrij.com", Phone = "159-222-1596" },
        //                new { Name = "Mohan", Email = "mohan@techbrij.com", Phone = "456-222-4569" },
        //                new { Name = "Sohan", Email = "sohan@techbrij.com", Phone = "789-456-3333" },
        //                new { Name = "Karan", Email = "karan@techbrij.com", Phone = "111-222-1234" },
        //                new { Name = "Brij", Email = "brij@techbrij.com", Phone = "111-222-3333" }
        //        };

        //    OfficeOpenXml.ExcelPackage excel = new OfficeOpenXml.ExcelPackage();
        //    var workSheet = excel.Workbook.Worksheets.Add("Daily Outlet Report");
        //    for (int k = 0; k < tables.Count(); k++)
        //    {
        //        if (k >= 1)
        //            workSheet = excel.Workbook.Worksheets.Add("Daily Outlet Report" + k);
        //        workSheet.Cells[1, (1 + k)].LoadFromDataTable(tables[k], true);
        //    }
        //    //workSheet.Cells[1, 1].LoadFromDataTable(dt, true);
        //    //workSheet.Cells[1, 1].LoadFromCollection(data, true);


        //    ////
        //    //var memoryStream = new MemoryStream(excel.GetAsByteArray());

        //    //Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        //    //Response.Headers.Add("content-disposition", "attachment;  filename=Contact.xlsx");
        //    //excel.SaveAs(memoryStream);
        //    //memoryStream.WriteTo(Response.OutputStream);
        //    //Response.Flush();
        //    //Response.End();

        //    return File(excel.GetAsByteArray(), "application/vnd.ms-excel", "Daily Outlet Report.xlsx");
        //    ///
        //    //var products = new System.Data.DataTable("teste");
        //    //products.Columns.Add("col1", typeof(int));
        //    //products.Columns.Add("col2", typeof(string));

        //    //products.Rows.Add(1, "product 1");
        //    //products.Rows.Add(2, "product 2");
        //    //products.Rows.Add(3, "product 3");
        //    //products.Rows.Add(4, "product 4");
        //    //products.Rows.Add(5, "product 5");
        //    //products.Rows.Add(6, "product 6");
        //    //products.Rows.Add(7, "product 7");


        //    //var grid = new System.Web.UI.WebControls.GridView();
        //    //grid.DataSource = products;
        //    //grid.DataBind();
        //    ////String exportPath = ConfigurationManager.AppSettings["ExportFiles"];
        //    ////string filePath = Server.MapPath("~/ImportFiles/ExportFiles/MyExcelFile.xlsx");

        //    //Response.ClearContent();
        //    //Response.Buffer = true;
        //    //Response.AddHeader("content-disposition", "attachment; filename=MyExcelFile.xls");
        //    //Response.ContentType = "application/ms-excel";
        //    ////Response.WriteFile(filePath);
        //    ////string Path = @"E:\documents\MyExcelFile.xlsx";

        //    ////Response.TransmitFile(Path);

        //    //Response.Charset = "";
        //    //StringWriter sw = new StringWriter();
        //    //System.Web.UI.HtmlTextWriter htw = new System.Web.UI.HtmlTextWriter(sw);

        //    //grid.RenderControl(htw);

        //    //Response.Output.Write(sw.ToString());
        //    //Response.Flush();
        //    //Response.End();
        //    //return View();



        //    // return View("MyView");
        //}
        //public void OnExportExcel(object sender, EventArgs e)
        //{
        //    using (XLWorkbook wb = new XLWorkbook())
        //    {
        //        for (int i = 0; i < gvCustomers.PageCount; i++)
        //        {
        //            gvCustomers.PageIndex = i;
        //            this.BindCustomers();
        //            DataTable dt = new DataTable("Page_" + (i + 1));
        //            foreach (TableCell cell in gvCustomers.HeaderRow.Cells)
        //            {
        //                dt.Columns.Add(cell.Text);
        //            }
        //            foreach (GridViewRow row in gvCustomers.Rows)
        //            {
        //                dt.Rows.Add();
        //                for (int j = 0; j < row.Cells.Count - 1; j++)
        //                {
        //                    if (row.Cells[j].Controls.Count > 0)
        //                    {
        //                        dt.Rows[dt.Rows.Count - 1][j] = (row.Cells[j].Controls[1] as Label).Text;
        //                    }
        //                    else
        //                    {
        //                        dt.Rows[dt.Rows.Count - 1][j] = row.Cells[j].Text;
        //                    }
        //                }
        //            }
        //            wb.Worksheets.Add(dt);
        //        }
        //        Response.Clear();
        //        Response.Buffer = true;
        //        Response.Charset = "";
        //        Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        //        Response.AddHeader("content-disposition", "attachment;filename=GridView.xlsx");
        //        using (MemoryStream MyMemoryStream = new MemoryStream())
        //        {
        //            wb.SaveAs(MyMemoryStream);
        //            MyMemoryStream.WriteTo(Response.OutputStream);
        //            Response.Flush();
        //            Response.End();
        //        }
        //    }
        //}


        public ActionResult ExportSQLFromToDateNew(string tableName, string AgentID, DateTime FromDt, DateTime ToDt, string DistributorID, string SalesOfficeID, string SalesAgent, string FileType)
        {
            try
            {
                var projectName = Session["ProjectName"].ToString();
                _userId = Session["UserId"].ToString();
                String exportPath = ConfigurationManager.AppSettings["ExportFiles"];
                String uploadpath = exportPath.Replace("~", "..");
                //String uploadpath = "../ImportFiles/ExportFiles";

                var result = string.Empty;
                connection();
                string fileLocation = Server.MapPath(exportPath);
                SimplrExport.SimplrExportNew objExport = new SimplrExport.SimplrExportNew();

                objExport.CS = constr;
                objExport.UserID = Session["UserId"].ToString();
                objExport.FolderPath = fileLocation;
                objExport.FileType = (FileType == "" || FileType == null) ? "CSV" : FileType;

                ImportLog("FolderPath (fileLocation):" + fileLocation);
                var tableNameList = tableName.Split(',');
                var filePath = "";
                var fname = "";

                DateTime todaysDate = DateTime.Now.Date;
                var day = todaysDate.ToString("dd");
                var month = todaysDate.ToString("MM");
                var year = todaysDate.Year;
                var returnvalue = "";
                for (int i = 0; i < tableNameList.Count(); i++)
                {
                    if (result != "")
                        result = result + " , ";
                    ImportLog("Step:1 Pass parameter tableNameList & user Id :" + tableNameList[i] + " & " + _userId);
                    DateTime fdate = new DateTime(FromDt.Year, FromDt.Month, FromDt.Day);
                    DateTime tdate = new DateTime(ToDt.Year, ToDt.Month, ToDt.Day);
                    System.Threading.Thread.CurrentThread.CurrentCulture = new CultureInfo("en-IN");
                    DateTime frDate = DateTime.Parse(FromDt.ToString());
                    DateTime toDate = DateTime.Parse(ToDt.ToString());

                    string params_String = String.Format("tableNameList[i]={0},_userId={1},AgentID={2},FromDt={3},ToDt={4}",
                        tableNameList[i], _userId, AgentID, frDate, toDate);
                    ImportLog("Step:1 Parameters passed:" + params_String);


                    var ret = ExportToExcel(tableNameList[i], _userId, AgentID, frDate, toDate);
                    return Json(ret);
                    result = result + returnvalue;
                    fname = returnvalue;
                    ImportLog("Step:2 : ReturnValue =" + result);
                    if (filePath != "")
                        filePath = filePath + ",";
                    filePath = filePath + uploadpath + "/" + System.IO.Path.GetFileName(fname) + "$" + returnvalue;
                }
                return Json(filePath, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                ImportLog("Error Message = =" + ex.Message);
                return Json("", JsonRequestBehavior.AllowGet);

            }
        }

        public string ExportToExcel(string TblName, string UserID, string AgentID, DateTime FromDt, DateTime ToDt)
        {
            DataTable dt = new DataTable();
            DataTable dtResult = new DataTable();
            int flag = 0;
            string connection = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
            if (AgentID == "ALL")
            {
                dt = ReadRecord("select * from SalesAgent where UserID='" + UserID + "'", connection);
                if (dt.Rows.Count > 0)
                {
                    AgentID = dt.Rows[0]["Code"].ToString();
                }
            }

            var TableName = "";
            var Query = "";
            var AliasName = "";
            var FileType = "";
            dt = ReadRecord("select * from ExportQueryConfig where AliasName='" + TblName + "'", connection);
            //While rs.Read
            if (dt.Rows.Count > 0)
            {
                TableName = dt.Rows[0]["TableName"].ToString();
                Query = dt.Rows[0]["Query"].ToString();
                AliasName = dt.Rows[0]["AliasName"].ToString();
                FileType = dt.Rows[0]["FileType"].ToString();
                flag = 1;
            }


            string FromDate = FromDt.ToString("yyyy-MM-dd 00:00:00.000");
            string ToDate = ToDt.ToString("yyyy-MM-dd 23:59:59.000");
            Query = Query.Replace("{FromDate}", "'" + FromDate + "'");
            Query = Query.Replace("{ToDate}", "'" + ToDate + "'");
            Query = Query.Replace("{AgentID}", "'" + AgentID + "'");
            Query = Query.Replace("{UserID}", "'" + UserID + "'");
            dt = ReadRecord(Query, connection);
            if (flag == 1)
            {
                dtResult = ReadRecord(Query, connection);
                //if (dtResult.Rows.Count > 0)
                //{
                //    dtResult = new DataTable();

                //}
            }
            var ff = Newtonsoft.Json.JsonConvert.SerializeObject(dt);
            return ff;

        }

        public DataTable ExportToExcelPVM(string TblName, string UserID, string AgentID, DateTime FromDt, DateTime ToDt, string DistributorID, string SalesOfficeID)
        {
            DataTable dt = new DataTable();
            DataTable dtResult = new DataTable();
            int flag = 0;
            string connection = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
            if (AgentID == "ALL")
            {
                dt = ReadRecord("select * from SalesAgent where UserID='" + UserID + "'", connection);
                if (dt.Rows.Count > 0)
                {
                    AgentID = dt.Rows[0]["Code"].ToString();
                }
            }

            var TableName = "";
            var Query = "";
            var AliasName = "";
            var FileType = "";
            dt = ReadRecord("select * from ExportQueryConfig where AliasName='" + TblName + "'", connection);
            //While rs.Read
            if (dt.Rows.Count > 0)
            {
                TableName = dt.Rows[0]["TableName"].ToString();
                Query = dt.Rows[0]["Query"].ToString();
                AliasName = dt.Rows[0]["AliasName"].ToString();
                FileType = dt.Rows[0]["FileType"].ToString();
                flag = 1;
            }


            string FromDate = FromDt.ToString("yyyy-MM-dd 00:00:00.000");
            string ToDate = ToDt.ToString("yyyy-MM-dd 23:59:59.000");
            Query = Query.Replace("{FromDate}", "'" + FromDate + "'");
            Query = Query.Replace("{ToDate}", "'" + ToDate + "'");
            Query = Query.Replace("{AgentID}", "'" + AgentID + "'");
            Query = Query.Replace("{UserID}", "'" + UserID + "'");
            Query = Query.Replace("{DistributorID}", "'" + DistributorID + "'");
            Query = Query.Replace("{SalesOfficeID}", "'" + SalesOfficeID + "'");
            dt = ReadRecord(Query, connection);
            if (flag == 1)
            {
                dtResult = ReadRecord(Query, connection);
                //if (dtResult.Rows.Count > 0)
                //{
                //    dtResult = new DataTable();

                //}
            }
            //var dt_json = Newtonsoft.Json.JsonConvert.SerializeObject(dt);
            return dt;

        }


        //public DataTable ExportToExcel11(string TblName, string UserID, string AgentID, DateTime FromDt, DateTime ToDt)
        public DataTable ExportToExcel11()
        {
            DataTable dt = new DataTable();
            DataTable dtResult = new DataTable();
            int flag = 0;
            string connection = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
            string AgentID = "ALL";
            string UserID = "ALL";
            string TblName = "ItemALL";
            if (AgentID == "ALL")
            {
                dt = ReadRecord("select * from SalesAgent where UserID='" + UserID + "'", connection);
                if (dt.Rows.Count > 0)
                {
                    AgentID = dt.Rows[0]["Code"].ToString();
                }
            }

            var TableName = "";
            var Query = "";
            var AliasName = "";
            var FileType = "";
            dt = ReadRecord("select * from ExportQueryConfig where AliasName='" + TblName + "'", connection);
            //While rs.Read
            if (dt.Rows.Count > 0)
            {
                TableName = dt.Rows[0]["TableName"].ToString();
                Query = dt.Rows[0]["Query"].ToString();
                AliasName = dt.Rows[0]["AliasName"].ToString();
                FileType = dt.Rows[0]["FileType"].ToString();
                flag = 1;
            }


            //string FromDate = FromDt.ToString("yyyy-MM-dd 00:00:00.000");
            //string ToDate = ToDt.ToString("yyyy-MM-dd 23:59:59.000");
            //Query = Query.Replace("{FromDate}", "'" + FromDate + "'");
            //Query = Query.Replace("{ToDate}", "'" + ToDate + "'");
            Query = Query.Replace("{AgentID}", "'" + AgentID + "'");
            Query = Query.Replace("{UserID}", "'" + UserID + "'");

            Query = "exec ExportDump '[Export_DailyOutlet]',  '2022-04-08 00:00:00.000','2022-04-24 23:59:59.000','ADMIN','ALL','ALL','ALL'";
            //Query = "select * from salesagent";
            dt = ReadRecord(Query, connection);

            //var ff = Newtonsoft.Json.JsonConvert.SerializeObject(dt);
            return dt;

        }


        public DataTable ReadRecord(string query, string constr)
        {
            DataTable dt = new DataTable();
            DataSet ds = new DataSet();
            SqlConnection con = new SqlConnection(constr);
            con.Open();
            try
            {

                SqlDataAdapter sda = new SqlDataAdapter(query, con);
                sda.SelectCommand.CommandTimeout = 3600;// 600;  //30*60=1800 // 60- seconds
                sda.Fill(ds);
                con.Close();
                if (ds.Tables.Count > 0)
                    dt = ds.Tables[0];

                return dt;
            }
            catch (Exception ex)
            {
                //ErrorLogString("sda.Fill(ds) error : " + ex.Message);
                //ErrorLogWithQuery(ex, query);
            }
            finally
            {
                con.Close();
            };
            return dt;
        }
        public ActionResult ExportSQLFromToDateJSU(string tableName, string AgentID, DateTime FromDt, DateTime ToDt, string FileType)
        {
            try
            {
                _userId = Session["UserId"].ToString();
                String exportPath = ConfigurationManager.AppSettings["ExportFiles"];
                String uploadpath = exportPath.Replace("~", "..");
                var result = string.Empty;
                connection();
                string fileLocation = Server.MapPath(exportPath);
                SimplrExport.SimplrExportJSU objExport = new SimplrExport.SimplrExportJSU();
                objExport.CS = constr;
                objExport.UserID = Session["UserId"].ToString();
                objExport.FolderPath = fileLocation;
                objExport.FileType = (FileType == "" || FileType == null) ? "CSV" : FileType;

                ImportLog("FolderPath (fileLocation):" + fileLocation);
                var tableNameList = tableName.Split(',');
                var filePath = "";
                var fname = "";

                DateTime todaysDate = DateTime.Now.Date;
                var day = todaysDate.ToString("dd");
                var month = todaysDate.ToString("MM");
                var year = todaysDate.Year;
                var returnvalue = "";
                for (int i = 0; i < tableNameList.Count(); i++)
                {
                    if (result != "")
                        result = result + " , ";
                    ImportLog("Step:1 Pass parameter tableNameList & user Id :" + tableNameList[i] + " & " + _userId);
                    returnvalue = objExport.AutoExport(tableNameList[i], _userId, AgentID, FromDt, ToDt);
                    result = result + returnvalue;
                    fname = returnvalue;
                    ImportLog("Step:2 : ReturnValue =" + result);
                    if (filePath != "")
                        filePath = filePath + ",";
                    filePath = filePath + uploadpath + "/" + System.IO.Path.GetFileName(fname) + "$" + returnvalue;
                }
                return Json(filePath, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                ImportLog("Error Message = =" + ex.Message);
                return Json("", JsonRequestBehavior.AllowGet);
            }
        }



        public ActionResult ExportSQLFromToDateCSV(string tableName, string AgentID, DateTime FromDt, DateTime ToDt)
        {
            try
            {
                _userId = Session["UserId"].ToString();
                String exportPath = ConfigurationManager.AppSettings["ExportFiles"];
                String uploadpath = exportPath.Replace("~", "..");
                //String uploadpath = "../ImportFiles/ExportFiles";

                var result = string.Empty;
                connection();
                string fileLocation = Server.MapPath(exportPath);
                //string fileLocation = Server.MapPath("~/ImportFiles/ExportFiles/");

                //   SimplrExportUL.SimplrExportUL objExport = new SimplrExportUL.SimplrExportUL();

                SimplrExport.SimplrExportNew objExport = new SimplrExport.SimplrExportNew();
                objExport.CS = constr;
                objExport.UserID = Session["UserId"].ToString();
                objExport.FolderPath = fileLocation;

                ImportLog("FolderPath (fileLocation):" + fileLocation);
                var tableNameList = tableName.Split(',');
                var filePath = "";
                var fname = "";

                DateTime todaysDate = DateTime.Now.Date;
                var day = todaysDate.ToString("dd");
                var month = todaysDate.ToString("MM");
                var year = todaysDate.Year;
                var returnvalue = "";
                for (int i = 0; i < tableNameList.Count(); i++)
                {
                    if (result != "")
                        result = result + " , ";
                    ImportLog("Step:1 Pass parameter:" + tableNameList[i]);
                    ImportLog("Step:1 Pass parameter _userId:" + _userId);
                    // result = result + tableNameList[i] + " = " + objExport.AutoExport(tableNameList[i]);

                    try
                    {
                        returnvalue = objExport.AutoExportCsv(tableNameList[i], _userId, AgentID, FromDt, ToDt);
                    }
                    catch (Exception ex)
                    {
                        ImportLog("Error Message = =" + ex.StackTrace.ToString());
                        ImportLog("Error Message = =" + ex.InnerException.ToString());
                        ImportLog("Error Message = =" + ex.Message.ToString());
                    }

                    result = result + returnvalue;
                    //  fname = objExport.AutoExport(tableNameList[i]);
                    fname = returnvalue;
                    ImportLog("Step:2 : ReturnValue =" + result);
                    if (filePath != "")
                        filePath = filePath + ",";

                    //Item Maintenance_20190624.xlsx
                    // fname = tableNameList[i] + "_" + year + "" + month + "" + day + ".xlsx";

                    filePath = filePath + uploadpath + "/" + System.IO.Path.GetFileName(fname) + "$" + returnvalue;
                }
                return Json(filePath, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                ImportLog("Error Message = =" + ex.Message);
                return Json("", JsonRequestBehavior.AllowGet);

            }
        }

        //export to Csv
        public ActionResult ExportCSV(string tableName, string AgentID, DateTime FromDt, DateTime ToDt, HttpPostedFileBase file)
        {
            //string TblName, string UserID, string AgentID, DateTime FromDt, DateTime ToDt
            try
            {
                _userId = Session["UserId"].ToString();
                //  ExportSQL11(tableName, AgentID, FromDt, ToDt, file);
                var MDTNo = string.Empty;
                IList<SalesOfficeProc_Result> _salesOfficeProc = db.SalesOfficeProc().ToList();

                String exportPath = ConfigurationManager.AppSettings["ExportFiles"];
                String uploadpath = exportPath.Replace("~", "..");
                //String uploadpath = "../ImportFiles/ExportFiles";
                var result = string.Empty;
                connection();
                string fileLocation = Server.MapPath(exportPath);
                // string fileLocation = Server.MapPath("~/ImportFiles/ExportFiles/");

                ImportLog("FolderPath (fileLocation):" + fileLocation);
                var tableNameList = tableName.Split(',');
                var filePath = "";

                string path = fileLocation;
                string fullPath = string.Empty;
                string tbl = string.Empty;

                DateTime todaysDate = DateTime.Now.Date;
                var day = todaysDate.ToString("dd");
                var month = todaysDate.ToString("MM");
                var year = todaysDate.Year;
                string tempquery = string.Empty;
                string query = string.Empty;
                //var excelApp = new Excel1.Application();

                cn.ConnectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
                cn.Open();
                ImportLog("tableNameList.Count():" + tableNameList.Count());

                for (int i = 0; i < tableNameList.Count(); i++)
                {
                    //  excelApp = new Excel1.Application();
                    tbl = tableNameList[i];
                    query = db.ExportQueryConfigProc().FirstOrDefault(x => x.AliasName == tbl).Query;
                    fullPath = path + tbl + DateTime.Now.ToString("yyyyMMddhhmmss") + ".csv";
                    //FileInfo srcfileInfo = new FileInfo(path + tbl + DateTime.Now.ToString("yyyyMMddhhmmss") + ".XLSX");
                    FileInfo srcfileInfo = new FileInfo(fullPath);
                    object obj = System.Reflection.Missing.Value;
                    // var wb = excelApp.Workbooks.Add(obj);
                    var cnt = 0;
                    foreach (var s in _salesOfficeProc)
                    {
                        if (cnt == 0)
                        {
                            cnt++;
                            tempquery = query;
                            tempquery = tempquery.Replace("{FromDate}", "'" + FromDt.ToString("yyyy-MM-dd 00:00:00") + "'");
                            tempquery = tempquery.Replace("{ToDate}", "'" + ToDt.ToString("yyyy-MM-dd 23:59:59") + "'");
                            tempquery = tempquery.Replace("{MDTNO}", "'" + MDTNo.ToString() + "'");
                            tempquery = tempquery.Replace("{UserID}", "'" + _userId.ToString() + "'");
                            tempquery = tempquery.Replace("{AgentID}", "'" + AgentID.ToString() + "'");//add
                            tempquery = tempquery.Replace("{SalesOffice}", "'" + s.Code.ToString() + "'");
                            tempquery = tempquery.Replace("{", "");
                            tempquery = tempquery.Replace("}", "");
                            tempquery = tempquery.Replace("Query = ", "");
                            tempquery = tempquery.Replace("\r\n", "");

                            cmd.Connection = cn;
                            cmd.CommandText = tempquery;
                            SqlDataReader reader = cmd.ExecuteReader();
                            DataTable dt = new DataTable();
                            dt.Load(reader);

                            // Excel1._Worksheet workSheet = (Excel1.Worksheet)wb.Worksheets.Add();
                            //workSheet.Name = s.Code;

                            string createText = string.Empty;
                            string delimiter = ", ";
                            // for (int j = 0; dt.Columns.Count > j; j++)
                            for (int j = 0; j < dt.Columns.Count; j++)
                            {
                                if ((dt.Columns.Count - 1) == j)
                                    //createText += ConvertCSVString(dt.Columns[j].ColumnName) + delimiter + Environment.NewLine;
                                    // createText += (dt.Columns[j].ColumnName) + delimiter + Environment.NewLine;
                                    createText += (dt.Columns[j].ColumnName) + Environment.NewLine;
                                else
                                    createText += (dt.Columns[j].ColumnName) + delimiter;
                                // createText += ConvertCSVString(dt.Columns[j].ColumnName) + delimiter;
                                //  workSheet.Cells[1, j + 1] = dt.Columns[j].ColumnName;
                            }

                            System.IO.File.WriteAllText(fullPath, createText);

                            string appendText = string.Empty;
                            //  string[,] ranges = new string[dt.Rows.Count, dt.Columns.Count];
                            for (int j = 0; dt.Rows.Count > j; j++)
                            {
                                appendText = string.Empty;
                                for (int k = 0; dt.Columns.Count > k; k++)
                                {
                                    if ((dt.Columns.Count - 1) == k)
                                        // appendText += (dt.Rows[j][k].ToString()) + delimiter + Environment.NewLine;
                                        appendText += (dt.Rows[j][k].ToString()) + Environment.NewLine;
                                    // appendText += ConvertCSVString(dt.Rows[j][k].ToString()) + delimiter + Environment.NewLine;
                                    else
                                        appendText += (dt.Rows[j][k].ToString()) + delimiter;
                                    // appendText += ConvertCSVString(dt.Rows[j][k].ToString()) + delimiter;
                                    // ranges[j, k] = dt.Rows[j][k].ToString();
                                }
                                System.IO.File.AppendAllText(fullPath, appendText);
                            }
                        }
                    }


                    if (filePath != "")
                        filePath = filePath + ",";
                    filePath = filePath + uploadpath + "/" + System.IO.Path.GetFileName(fullPath) + "$" + fullPath;
                }
                cn.Close();

                return Json(filePath, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                ImportLog("Error Message = =" + ex.Message);
                return Json("", JsonRequestBehavior.AllowGet);

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

        private string ConvertCSVString(string str)
        {
            // return  char(34) + str + char(34);
            return (34) + str + (34);
        }

        public JsonResult ExportWithOutPagination(string qry, string searchOption, string SortOption, string TableName)
        {
            try
            {
                //qry = AESEncrytDecry.DecryptStringAES(qry);//encript
                qry = AESEncrytDecry.DecryptStringAES(qry);//encript
                String uploadpath = "../ImportFiles/ExportFiles/";
                string fileLocation = Server.MapPath("~/ImportFiles/ExportFiles/");
                SimplrExport.SimplrExportUL objExport = new SimplrExport.SimplrExportUL();
                connection();
                objExport.CS = constr;
                objExport.UserID = Session["UserId"].ToString();
                objExport.FolderPath = fileLocation;
                var screenName = string.Empty;

                var query = string.Empty;
                var queryText = string.Empty;
                string orderby = string.Empty;
                string groupby = string.Empty;
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
                ImportLog("objExport.AutoExportCR : start TableName, query, UserId : " + TableName + " , " + query + " , " + Session["UserId"].ToString());
                var result = objExport.AutoExportCR(TableName, query, Session["UserId"].ToString());
                ImportLog("objExport.AutoExportCR : End ");
                ImportLog("objExport.AutoExportCR : end result &  uploadpath " + result + "&" + uploadpath);

                return Json(result + "&" + uploadpath);
            }
            catch (Exception ex)
            {
                ImportLog("Ex :  " + ex.Message);
                ErrorLog(ex);
                return Json(ex);
            }
        }

    }
}
