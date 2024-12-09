using SimplrExportBLL;
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
        private DataTable ReadRecord(string query, string constr)
        {
            ExportErrorLog("ReadRecord : " + query);

            DataTable dt = new DataTable();
            DataSet ds = new DataSet();
            SqlConnection con = new SqlConnection(constr);
            con.Open();
            try
            {
                SqlDataAdapter sda = new SqlDataAdapter(query, con);
                sda.SelectCommand.CommandTimeout = 3600; //30*60=1800 // 60- seconds
                sda.Fill(ds);
                con.Close();
                con.Dispose();
                if (ds.Tables.Count > 0)
                    dt = ds.Tables[0];

                return dt;
            }
            catch (Exception ex)
            {
                //exceptionMsg = ex.Message;
                ExportErrorLog("ReadRecord Exception : " + ex.Message);
            }
            finally
            {
                con.Close();
            };
            return dt;
        }
        public ActionResult ExportSQLFromToDate1(string tableName, string AgentID, DateTime FromDt, DateTime ToDt, string DistributorID, string SalesOfficeID, string SalesAgent, string FileType)
        {
            connection();
            var Query = "exec [Export_Posummary] '2022-12-01 00:00:00.000','2022-12-30 23:59:59.000','ADMIN','ALL','ALL','ADMIN'";// "select * from   promotionmapping";//"select promotionmapping.PromotionCode as [Promotion Code], CustNo as [Cust Type], format(StartDate, 'dd/MMM/yyyy') as [Start Date], format(EndDate,'dd/MM/yyyy') as [End Date] from promotionmapping inner join promotionmaster on promotionmapping.promotioncode = promotionmaster.promotioncode order by custno, promotionmapping.promotioncode, startdate";
            DataTable dt = ReadRecord(Query, constr);

            StringBuilder sb = new StringBuilder();
            sb.Append("<table border='" + "2px" + "'b>");
            //write column headings
            sb.Append("<tr>");
            sb.Append("<td colspan=\"7\" scope=\"col\" align=\"center\"><b><font face=Arial size=2>Driver Ledger report </font></b></td>");
            sb.Append("</tr>");
            sb.Append("<tr>");


            foreach (System.Data.DataColumn dc in dt.Columns)
            {
                //if (dc.ToString() == "Name")
                //{ }
                //else
                //{
                sb.Append("<td><b><font face=Arial size=2>" + dc.ColumnName + "</font></b></td>");
                //}
            }
            sb.Append("</tr>");

            string gid = "";
            string lid = "";
            //write table data
            foreach (System.Data.DataRow dr in dt.Rows)
            {
                sb.Append("<tr>");
                foreach (System.Data.DataColumn dc in dt.Columns)
                {
                    //if (dc.ToString() == "Name")
                    //{ }
                    //else 
                    if (dc.ToString() == "Date")
                    { sb.Append("<td><font face=Arial size=" + "14px" + ">" + Convert.ToDateTime(dr[dc]).ToString("dd/MM/yyyy") + "</font></td>"); }
                    else
                    { sb.Append("<td><font face=Arial size=" + "14px" + ">" + dr[dc].ToString() + "</font></td>"); }
                }
                sb.Append("</tr>");

                //lid = dr["Name"].ToString();
            }
            sb.Append("</table>");

            DateTime dt1 = DateTime.Now;
            string fileNameout = @"D:\temp\export\test.xlsx";// "DriverLedger-" + dt1.Year.ToString() + dt1.Month.ToString() + dt1.Day.ToString() + dt1.Hour.ToString() + dt1.Minute.ToString() + dt1.Second.ToString() + ".xls"; ;
            fileNameout = @"D:\temp\export\test.xls";
            fileNameout = "test.xlsx";
            fileNameout = "test.xls";
            Response.AddHeader("Content-Disposition", String.Format("attachment; filename={0}", fileNameout));
            this.Response.ContentType = "application/vnd.ms-excel";
            byte[] buffer = System.Text.Encoding.UTF8.GetBytes(sb.ToString());

            //            Severity Code    Description Project File Line    Suppression State
            //Error CS1955  Non - invocable member 'File' cannot be used like a method.	SimplrExportBLL D:\Source\SimplrSales\SimplrExportBLL\Export.cs 185 Active


            //Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

            //Response.AddHeader("Content-Disposition", "attachment; filename=yourExcelFileName.xlsx;");

            //System.Web.HttpContext.Current.Response.BinaryWrite(buffer);

            //System.Web.HttpContext.Current.Response.Write(sb.ToString());

            //System.IO.File.WriteAllText(@"D:\abc.xls", sb.ToString());


            return File(buffer, "application/vnd.ms-excel");


        }

        public ActionResult AExportSQLFromToDate(string tableName, string AgentID, DateTime FromDt, DateTime ToDt, string DistributorID, string SalesOfficeID, string SalesAgent, string FileType)
        {
            connection();
            var Query = "select * from   promotionmapping";//"select promotionmapping.PromotionCode as [Promotion Code], CustNo as [Cust Type], format(StartDate, 'dd/MMM/yyyy') as [Start Date], format(EndDate,'dd/MM/yyyy') as [End Date] from promotionmapping inner join promotionmaster on promotionmapping.promotioncode = promotionmaster.promotioncode order by custno, promotionmapping.promotioncode, startdate";
            DataTable dt = ReadRecord(Query, constr);



            StringBuilder sb = new StringBuilder();
            sb.Append("<table border='" + "2px" + "'b>");
            //write column headings
            sb.Append("<tr>");
            foreach (System.Data.DataColumn dc in dt.Columns)
            {
                sb.Append("<td><b><font face=Arial size=2>" + dc.ColumnName + "</font></b></td>");
            }
            sb.Append("</tr>");

            //write table data
            foreach (System.Data.DataRow dr in dt.Rows)
            {
                sb.Append("<tr>");
                foreach (System.Data.DataColumn dc in dt.Columns)
                {
                    sb.Append("<td><font face=Arial size=" + "14px" + ">" + dr[dc].ToString() + "</font></td>");
                }
                sb.Append("</tr>");
            }
            sb.Append("</table>");

            //Response.AddHeader("Content-Disposition", String.Format("attachment; filename={0}", "Employees.xlsx"));
            //this.Response.ContentType = "application/vnd.ms-excel";
            this.Response.AddHeader("Content-Disposition", "Employees.xlsx");
            this.Response.ContentType = "application/vnd.ms-excel";
            byte[] buffer = System.Text.Encoding.UTF8.GetBytes(sb.ToString());
            return File(buffer, "application/vnd.ms-excel");
        }

        public ActionResult ExportSQLFromToDate(string tableName, string AgentID, DateTime? FromDt, DateTime? ToDt, string DistributorID, string SalesOfficeID, string SalesAgent, string FileType,string Branch, string Location)
        {
             try
            {
                if (Session["UserName"] != null)
                {
                    var projectName = Session["ProjectName"].ToString();
                    string userId = Session["UserId"].ToString();
                    String exportPath = ConfigurationManager.AppSettings["ExportFiles"];
                    String uploadpath = exportPath.Replace("~", "..");
                    //String uploadpath = "../ImportFiles/ExportFiles";

                    var result = string.Empty;
                    connection();
                    string fileLocation = Server.MapPath(exportPath);
                    SimplrExport.SimplrExportNew objExport = new SimplrExport.SimplrExportNew();
                    var objExp = new Export();

                    //objExport.CS = constr;
                    objExp.CS = constr;
                    objExp.UserID = Session["UserId"].ToString();
                    objExp.FolderPath = fileLocation;
                    objExp.FileType = (FileType == "" || FileType == null) ? "XLSX" : FileType;
                    objExp.ProjectName = projectName;

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
                        ImportLog("Step:1 Pass parameter tableNameList & user Id :" + tableNameList[i] + " & " + userId);
                        DateTime fdate = FromDt.HasValue ? new DateTime(FromDt.Value.Year, FromDt.Value.Month, FromDt.Value.Day) : DateTime.Now;
                        DateTime tdate = ToDt.HasValue ? new DateTime(ToDt.Value.Year, ToDt.Value.Month, ToDt.Value.Day) : DateTime.Now;
                        System.Threading.Thread.CurrentThread.CurrentCulture = new CultureInfo("en-IN");
                        DateTime frDate = FromDt.HasValue ? DateTime.Parse(FromDt.ToString()) : DateTime.Now;
                        DateTime toDate = ToDt.HasValue ? DateTime.Parse(ToDt.ToString()) : DateTime.Now;

                        string params_String = String.Format("tableNameList[i]={0},_userId={1},AgentID={2},FromDt={3},ToDt={4}",
                            tableNameList[i], userId, AgentID, frDate, toDate);
                        ImportLog("Step:1 Parameters passed:" + params_String);
                        //DataTable dt = ExportToExcel11(tableNameList[i], _userId, SalesAgent, frDate, toDate);
                        //ExportToExcel1(dt);
                        if (projectName.ToLower() == "pvm" || projectName.ToLower() == "pvmb" || projectName.ToLower() == "pvmng" || projectName.ToLower() == "motul sales" || projectName.ToLower() == "cpf" || projectName.ToLower() == "prifood" || projectName.ToLower() == "pvmigt")
                        {
                            //Newly added by.M 20.05.2022
                            returnvalue = objExp.ExportToExcelandCSVPVM(tableNameList[i], userId, SalesAgent, frDate, toDate, DistributorID, SalesOfficeID, Branch);

                            //todo - dll functionallity
                            //returnvalue = objExport.AutoExportPVM(tableNameList[i], userId, SalesAgent, frDate, toDate, DistributorID, SalesOfficeID);
                        }
                       
                        else
                        {
                            //Newly added by.M 20.05.2022
                            returnvalue = objExp.ExportToExcelandCSV(tableNameList[i], userId, AgentID, frDate, toDate, DistributorID, SalesOfficeID, Location);
                            //todo - dll functionallity
                            //returnvalue = objExport.AutoExport(tableNameList[i], userId, AgentID, frDate, toDate);
                        }
                        result = result + returnvalue;
                        fname = returnvalue;
                        ImportLog("Step:2 : ReturnValue =" + result);
                        if (filePath != "")
                            filePath = filePath + ",";
                        filePath = filePath + uploadpath + "/" + System.IO.Path.GetFileName(fname) + "$" + returnvalue;
                    }
                    return Json(filePath, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return RedirectToAction("Login", "Login",new { sessionexpired = "sessionexpired" });
                }
            }
            catch (Exception ex)
            {
                ImportLog("Error Message = =" + ex.Message);
                return Json("", JsonRequestBehavior.AllowGet);

            }
        }

        public ActionResult ExportSQLFromToDateJSU(string tableName, string AgentID, DateTime FromDt, DateTime ToDt, string FileType)
        {
            try
            {
                string userId = Session["UserId"].ToString();
                String exportPath = ConfigurationManager.AppSettings["ExportFiles"];
                String uploadpath = exportPath.Replace("~", "..");
                var result = string.Empty;
                connection();
                string fileLocation = Server.MapPath(exportPath);
                SimplrExport.SimplrExportJSU objExport = new SimplrExport.SimplrExportJSU();
                var objExp = new Export();
                //objExport.CS = constr;
                objExp.CS = constr;
                objExp.UserID = Session["UserId"].ToString();
                objExp.FolderPath = fileLocation;
                objExp.FileType = (FileType == "" || FileType == null) ? "xlsx" : FileType;

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
                    ImportLog("Step:1 Pass parameter tableNameList & user Id :" + tableNameList[i] + " & " + userId);

                    //Newly added by.M 27.04.2022
                    //var objExp = new Models.BLL.Export();
                    returnvalue = objExp.ExportToExcelCSVJSU(tableNameList[i], userId, AgentID, FromDt, ToDt);

                    //todo - dll functionallity
                    //returnvalue = objExport.AutoExport(tableNameList[i], userId, AgentID, FromDt, ToDt);

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
                string userId = Session["UserId"].ToString();
                String exportPath = ConfigurationManager.AppSettings["ExportFiles"];
                String uploadpath = exportPath.Replace("~", "..");
                var result = string.Empty;
                connection();
                string fileLocation = Server.MapPath(exportPath);
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

                    try
                    {
                        //newly added by.M 03.06.2022
                        var objExp = new Models.BLL.Export();
                        returnvalue = objExp.ExportToExcelandCSV(tableNameList[i], userId, AgentID, FromDt, ToDt, fileLocation, "CSV","");

                        //todo - old
                        //returnvalue = objExport.AutoExportCsv(tableNameList[i], _userId, AgentID, FromDt, ToDt);
                    }
                    catch (Exception ex)
                    {
                        ImportLog("Error Message = =" + ex.StackTrace.ToString());
                        ImportLog("Error Message = =" + ex.InnerException.ToString());
                        ImportLog("Error Message = =" + ex.Message.ToString());
                    }

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
