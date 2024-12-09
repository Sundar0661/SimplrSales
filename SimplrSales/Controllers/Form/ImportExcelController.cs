using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.OleDb;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;

using OfficeOpenXml;
using SimplrSales.Repository;
using System.Data.SqlClient;
using IMEX;
using System.Web.Script.Serialization;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using Excel1 = Microsoft.Office.Interop.Excel;
using System.Diagnostics;
using SimplrSales.Models;
using System.Text.RegularExpressions;

namespace SimplrSales.Controllers.Form
{
    public class ImportExcelController : BusinessRule
    {
        //
        // GET: /ImportExcel/
        public IMEXUL.IMEXConfigPOS ImExPosObj = new IMEXUL.IMEXConfigPOS();
        private SqlConnection con, con1;
        public DataRow dr;
        public string constr = string.Empty;
        public static string _fileLocation = string.Empty;
        public static string _ControlNo = string.Empty;
        public static string _CustomerNo = string.Empty;
        public static string _ExportFolder = string.Empty;
        public static string exportFolder = string.Empty;
        public static string _tableName = "V5_POSStaging";
        public static string _tableAliasName = "POS Upload";
        public static int _FStartRow = 1;
        public static DataTable dtTable;
        public static string srcFolder = string.Empty;
        public static string destFolder = string.Empty;
        public static string filepath = "~/CSV";
        public static string filepath2 = "~/ImportFiles";

        //To Handle connection related activities
        private void connection()
        {
            constr = ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString();
            con = new SqlConnection(constr);
            con1 = new SqlConnection(constr);
        }

        public ActionResult Index()
        {
            return View();
        }






        private DataSet ConvertExcelToDataset(string fileLocation, string tableName)
        {
            var ds = new DataSet();
            FileInfo f = new FileInfo(fileLocation);
            var excelPackage = new ExcelPackage(f);
            string[] splitValue = tableName.Split(',');

            for (int count = 0; count < splitValue.Length; count++)
            {
                tableName = splitValue[count].Replace("'", string.Empty).Trim();
                System.Diagnostics.Debug.WriteLine(tableName);
                var dt = new DataTable(tableName);
                var ws = excelPackage.Workbook.Worksheets[tableName];
                var lastrow = ws.Dimension.End.Row;
                var lastcol = ws.Dimension.End.Column;
                for (var row = 1; row <= lastrow; row++)
                {
                    string s = row.ToString() + "\t";
                    var val = "";
                    var dr = dt.NewRow();
                    for (var col = 1; col <= lastcol; col++)
                    {

                        if (ws.Cells[row, col].Text != null)
                        {
                            s += ws.Cells[row, col].Text.Trim() + "\t";
                            val = ws.Cells[row, col].Text.Trim();
                        }
                        else
                        {
                            s += "NULL\t";
                            val = "";
                        }
                        if (row == 1)
                        {
                            if (val != "")
                            {
                                dt.Columns.Add(new DataColumn(val, System.Type.GetType("System.String")));
                            }
                        }
                        else
                        {
                            if (col <= dt.Columns.Count)
                            {
                                dr[col - 1] = val;
                            }
                        }


                    }
                    if (row > 1)
                    {
                        dt.Rows.Add(dr);
                    }
                    System.Diagnostics.Debug.WriteLine(s);
                }
                ds.Tables.Add(dt);
            }

            return ds;
        }



        [HttpPost]
        public ActionResult Peppol_Invoice_Outbound(string invoiceNo)
        {

            string result = string.Empty;
            string errMsg = "";
            string path_Details_Peppol_XML = ConfigurationManager.AppSettings["Peppol_Invoice_XMLFiles"];
            string Peppol_Xml_Location = System.Web.HttpContext.Current.Server.MapPath(path_Details_Peppol_XML);

            try
            {
                if (!Directory.Exists(Peppol_Xml_Location))  // if it doesn't exist, create
                {
                    Directory.CreateDirectory(Peppol_Xml_Location);
                }

                //Function = CRUD.InvoiceCrud.Outbound

                //Parameter = Invoiceno,path

                //using (Font font1 = new Font("Arial", 10.0f))
                //{
                //    byte charset = font1.GdiCharSet;
                //}


                result = SimplrXMLSFTP.CRUD.InvoiceCrud.Outbound(invoiceNo, Peppol_Xml_Location);


                return Json(result, JsonRequestBehavior.AllowGet);


            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                errMsg = ex.ToString();
            }
            return Json(errMsg, JsonRequestBehavior.AllowGet);

        }


        [HttpPost]
        public ActionResult Peppol_Invoice_UpdateStatus(string invoiceNo)
        {

            string result = string.Empty;
            string errMsg = "";


            try
            {


                //Function = CRUD.InvoiceCrud.UpdateOutboundStatus

                //Parameter = InvoiceNo

                result = SimplrXMLSFTP.CRUD.InvoiceCrud.UpdateOutboundStatus(invoiceNo);


                return Json(result, JsonRequestBehavior.AllowGet);


            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                errMsg = ex.ToString();
            }
            return Json(errMsg, JsonRequestBehavior.AllowGet);

        }



        public void Store_and_Retrieve_Base64(string code, string imgname, out string base64data, out string _imagePath)
        {
            base64data = "";
            _imagePath = "";
            try
            {
                String targpath = ConfigurationManager.AppSettings["peppolImages"];
                String sourPath = ConfigurationManager.AppSettings["tempConfigFile"];

                string directoryPath = Server.MapPath(targpath).ToString();
                // string filePath = directoryPath;
                if (!Directory.Exists(directoryPath))
                {
                    Directory.CreateDirectory(directoryPath);
                }


                string fileName = imgname;
                string sourcePath = Server.MapPath(sourPath).ToString();
                string targetPath = Server.MapPath(targpath).ToString();

                string sourceFile = System.IO.Path.Combine(sourcePath, fileName);
                string destFile = System.IO.Path.Combine(targetPath, code + "." + fileName.Split('.')[fileName.Split('.').Length - 1]);

                _imagePath = destFile;

                // To copy a file to another location and
                // overwrite the destination file if it already exists.
                System.IO.File.Copy(sourceFile, destFile, true);

                base64data = ImageToBase64(destFile);


            }
            catch (Exception ex)
            {

            }

        }

        public string ImageToBase64(string path)
        {
            //string path = "D:\\SampleImage.jpg";
            using (System.Drawing.Image image = System.Drawing.Image.FromFile(path))
            {
                using (MemoryStream m = new MemoryStream())
                {
                    image.Save(m, image.RawFormat);
                    byte[] imageBytes = m.ToArray();
                    return Convert.ToBase64String(imageBytes);

                }
            }
        }


        [HttpPost]
        public ActionResult Peppol_Register_FormData(string CompanyName, string UEN, string CountryCode, string ContactNumber,
             string ContactEmail, string Address, string PostCode, string AuthorizationLetter,
             string CompanyCode, string RegistrationNotification,
             string imgName)
        {

            string result = string.Empty;
            string errMsg = "";
            string _imagepath = "";
            string base64data = "";


            try
            {
                // Function = CRUD.InvoiceCrud.Register 

                // Parameter List
                /*CompanyName
                UEN
                CountryCode
                ContactNo
                ContactEmail
                Address
                PostCode
                AuthorizationLetter
                CompanyCode*/


                if (imgName == "")
                {
                    AuthorizationLetter = "";
                    _imagepath = "";
                }
                else
                {

                    Store_and_Retrieve_Base64(CompanyCode, imgName, out AuthorizationLetter, out _imagepath);

                }

                result = SimplrXMLSFTP.CRUD.InvoiceCrud.Register(CompanyName, UEN, CountryCode, ContactNumber,
                                                          ContactEmail, Address, PostCode,
                                                          AuthorizationLetter, CompanyCode, RegistrationNotification, _imagepath);

                //result = CompanyName + " => " + "Registration Success";
                return Json(result, JsonRequestBehavior.AllowGet);


            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                errMsg = ex.ToString();
            }
            return Json(errMsg, JsonRequestBehavior.AllowGet);
        }



        [HttpPost]
        public ActionResult Peppol_Receive_Invoice_InBound()
        {

            string result = string.Empty;
            string errMsg = "";
            string path_Details_Peppol_XML = ConfigurationManager.AppSettings["Peppol_Invoice_XMLFiles_Inbound"];
            string Peppol_Xml_Location = System.Web.HttpContext.Current.Server.MapPath(path_Details_Peppol_XML);

            try
            {
                if (!Directory.Exists(Peppol_Xml_Location))  // if it doesn't exist, create
                {
                    Directory.CreateDirectory(Peppol_Xml_Location);
                }

                // Function = CRUD.InvoiceCrud.InBound 

                // Parameter List
                // Path for storing XML files

                //CRUD.InvoiceCrud.Inbound
                //result = InvoiceCrud.Inbound(Peppol_Xml_Location);
                //todo
                result = SimplrXMLSFTP.CRUD.InvoiceCrud.Inbound(Peppol_Xml_Location);

                return Json(result, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                errMsg = ex.ToString();
            }
            return Json(errMsg, JsonRequestBehavior.AllowGet);

        }





        [HttpPost]
        // public ActionResult ExportSQL(HttpPostedFileBase file, string tableName)
        public ActionResult ExportSQL(string tableName, HttpPostedFileBase file)
        {
            connection();
            string provider = ConfigurationManager.AppSettings["ExcelProvider"];
            DataSet ds = new DataSet();
            VImportExcelRepository VImportObj = new VImportExcelRepository();
            //var fsr;
            try
            {

                if (tableName == "" || file == null)
                {
                    return null;
                }
                if (Request.Files["file"].ContentLength > 0)
                {
                    string fileExtension =
                    System.IO.Path.GetExtension(Request.Files["file"].FileName);

                    //if (fileExtension == ".xls" || fileExtension == ".xlsx")
                    //{

                    string FileName = Path.GetFileName(file.FileName);
                    //if (FileName.LastIndexOf("/")>0)
                    //{
                    //    FileName = FileName.Substring(FileName.LastIndexOf("/") + 1);
                    //}
                    //string fileLocation = Server.MapPath("~/") + Request.Files["file"].FileName;
                    string fileLocation = Server.MapPath("~/ImportFiles/") + FileName;


                    byte[] arrayOfMyString = Encoding.UTF8.GetBytes(Request.Files["file"].FileName.ToString());
                    MemoryStream stream = new MemoryStream(arrayOfMyString);
                    var contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                    var fsr = new FileStreamResult(stream, contentType);
                    fsr.FileStream.Dispose();
                    fsr.FileStream.Close();

                    stream.Dispose();
                    stream.Close();

                    if (System.IO.File.Exists(fileLocation))
                    {
                        System.GC.Collect();
                        System.GC.WaitForPendingFinalizers();

                        System.IO.File.Delete(fileLocation);
                    }

                    Request.Files["file"].SaveAs(fileLocation);
                    //  stream.Close();

                    IMEX.IMEX_Web objIMEX_Web = new IMEX.IMEX_Web();
                    objIMEX_Web.CS = constr;
                    var result = string.Empty;
                    var tableNameList = tableName.Split(',');
                    for (int i = 0; i < tableNameList.Count(); i++)
                    {
                        switch (tableNameList[i])
                        {
                            case "ItemJSU":
                                result = objIMEX_Web.ImportProductNew(fileLocation);
                                break;
                            case "ItemDistributor":
                                // result = objIMEX_Web.ImportDistributorTargetNew(fileLocation);
                                break;
                            case "SalesTerritoryTarget":
                                result = objIMEX_Web.ImportSalesTerritoryTarget(fileLocation);
                                break;
                            case "DistributorTarget":
                                result = objIMEX_Web.ImportDistributorTargetNew(fileLocation);
                                break;
                            case "Channel":
                                ImportLog("Step:1 :fileLocation =" + fileLocation);
                                result = objIMEX_Web.ImportChannelNew(fileLocation);
                                ImportLog("Step:2 : =" + result);
                                break;
                            case "SubChannel":
                                result = objIMEX_Web.ImportSubChannel(fileLocation);
                                break;
                            case "OutletType":
                                result = objIMEX_Web.ImportOutletType(fileLocation);
                                break;
                            case "DistributorTree":
                                result = objIMEX_Web.ImportNodeTree(fileLocation);
                                break;
                            case "Employee":
                                result = objIMEX_Web.ImportEmployee(fileLocation);
                                break;
                            case "SalesOffice":
                                result = objIMEX_Web.ImportLocation(fileLocation);
                                break;
                            case "DistributorItem":
                                // result = objIMEX_Web.ImportDistributorItem(fileLocation);
                                break;
                            case "SalesManTarget":
                                // result = objIMEX_Web.ImportSalesmanTarget(fileLocation);
                                break;
                            case "Vehicle":
                                result = objIMEX_Web.ImportVehicleMaster(fileLocation);
                                break;
                            case "FocusSKU":
                                result = objIMEX_Web.ImportFocusSKU(fileLocation);
                                break;
                            case "Customer":
                                ImportLog("Step:1 dll function call before - Table Name:" + tableNameList[i] + "File Location : " + fileLocation);
                                result = objIMEX_Web.ImportCustomer(fileLocation);
                                ImportLog("Step:2 Return Value from Dll:" + result);
                                break;
                            case "PriceListGroup":
                                result = objIMEX_Web.ImportPriceGroupItemList(fileLocation);
                                break;
                            case "RoutePlan":
                                result = objIMEX_Web.ImportRoutePlanSimple(fileLocation);
                                break;
                            case "MustCarryItem":
                                result = objIMEX_Web.ImportMustCarryItem(fileLocation);
                                break;
                        }

                    }
                    return Json(result, JsonRequestBehavior.AllowGet);
                }

            }
            catch (Exception ex)
            {
                ImportLog("Step:3 :Exception =" + ex.Message);
                ErrorLog(ex);
            }
            return Json("", JsonRequestBehavior.AllowGet);

        }

        //[HttpGet]

        public string ImportFileToSQLUL1(string tableName, HttpPostedFileBase file)
        // public string ExportSQLUL1(string tableName, HttpPostedFileBase file)
        {
            try
            {
                _userId = Session["UserId"].ToString();
                ImportLog("Session[UserName]  : " + Session["UserName"]);
                //if (Session["UserName"] != null)
                //{
                var dat = DateTime.Now;
                var day = dat.ToString("dd");
                var month = dat.ToString("MM");
                var year = dat.Year;

                var hrs = dat.ToString("HH");
                var mins = dat.ToString("mm");
                var sec = dat.ToString("ss");

                var result = string.Empty;
                connection();
                string provider = ConfigurationManager.AppSettings["ExcelProvider"];
                string importFileFolder = ConfigurationManager.AppSettings["ImportFiles"];
                DataSet ds = new DataSet();
                VImportExcelRepository VImportObj = new VImportExcelRepository();
                //var fsr;
                if (tableName == "" || file == null)
                {
                    return null;
                }
                if (Request.Files["file"].ContentLength > 0)
                {
                    string fileExtension = System.IO.Path.GetExtension(Request.Files["file"].FileName);

                    //if (fileExtension == ".xls" || fileExtension == ".xlsx")
                    //{

                    string FileName = Path.GetFileName(file.FileName);
                    //if (FileName.LastIndexOf("/")>0)
                    //{
                    //    FileName = FileName.Substring(FileName.LastIndexOf("/") + 1);
                    //}
                    //string fileLocation = Server.MapPath("~/") + Request.Files["file"].FileName;
                    // string fileLocation = Server.MapPath("~/ImportFiles/") + FileName;

                    //Item Maintenance_FMS_20190624164037
                    // string fileLocation = importFileFolder + FileName.Split('.')[0] + "_" + _userId + "_" + year + month + day + hrs + mins + sec + "." + FileName.Split('.')[1];
                    string fileLocation = Server.MapPath(importFileFolder) + FileName.Split('.')[0] + "_" + _userId + "_" + year + month + day + hrs + mins + sec + "." + FileName.Split('.')[1]; ;
                    ImportLog("fileLocation =" + fileLocation);

                    byte[] arrayOfMyString = Encoding.UTF8.GetBytes(Request.Files["file"].FileName.ToString());
                    ImportLog("arrayOfMyString =" + arrayOfMyString);
                    MemoryStream stream = new MemoryStream(arrayOfMyString);
                    ImportLog("stream =" + stream);

                    var contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                    var fsr = new FileStreamResult(stream, contentType);
                    fsr.FileStream.Dispose();
                    fsr.FileStream.Close();

                    stream.Dispose();
                    stream.Close();
                    if (System.IO.File.Exists(fileLocation))
                    {
                        ImportLog("System.IO.File.Exists(fileLocation)");
                        System.GC.Collect();
                        System.GC.WaitForPendingFinalizers();
                        ImportLog("1: fileLocation, FileAttributes.Normal");
                        System.IO.File.SetAttributes(fileLocation, FileAttributes.Normal);
                        // System.IO.File.Delete(fileLocation);
                        ImportLog("System.IO.File.Delete(fileLocation) : start");

                        System.IO.File.Delete(fileLocation);
                        ImportLog("System.IO.File.Delete(fileLocation) = completed");
                    }
                    ImportLog("Request.Files[file].SaveAs(fileLocation) : start");
                    Request.Files["file"].SaveAs(fileLocation);
                    ImportLog("Request.Files[file].SaveAs(fileLocation) : saved");

                    //  stream.Close();

                    // ImExObj 
                    IMEXUL.IMEXCONFIG ImExObj = new IMEXUL.IMEXCONFIG();
                    // IMEX_Web objIMEX_Web = new IMEX_Web();
                    ImExObj.CS = constr;
                    ImportLog("ImExObj.CS = constr :" + ImExObj.CS);
                    var tableNameList = tableName.Split(',');
                    var returnValue = string.Empty;
                    for (int i = 0; i < tableNameList.Count(); i++)
                    {
                        if (result != "")
                            result = result + " $ ";
                        ImportLog("Step:1 Pass parameter:" + tableNameList[i] + " : User : " + Session["UserName"]);
                        //result = result + tableNameList[i] + " = " + ImExObj.GetImportXLSXFile(tableNameList[i], fileLocation);
                        returnValue = ImExObj.GetImportXLSXFile(tableNameList[i], fileLocation);
                        if (returnValue != "Completed")
                        {
                            ImportErrorLog(tableNameList[i] + "_" + _userId + "_" + year + month + day + hrs + mins + sec, returnValue);
                            returnValue = "../ImportFiles/ImportErrorLog/" + tableNameList[i] + "_" + _userId + "_" + year + month + day + hrs + mins + sec + ".txt";
                        }
                        //~/ImportErrorLog/" + logName + ".txt
                        result = result + returnValue;
                        ImportLog("Step:2 : ReturnValue =" + result + " : User : " + Session["UserName"]);
                    }
                    ImportLog("Step:3:Return JSON result =" + result + "  : User : " + Session["UserName"]);
                    return result;
                }

                return result;
                // }
                //else
                //{
                //    ImportLog("Session nULL : " + Session["UserName"]);
                //    return Json("SessionLogOut", JsonRequestBehavior.AllowGet);
                //}
            }
            catch (Exception ex)
            {
                ImportLog("Error Message = =" + ex.Message);
                return ex.Message.ToString();

            }
        }

        public string ImportFileToSQL1(string tableName, HttpPostedFileBase file)
        {
            try
            {
                _userId = Session["UserId"].ToString();
                ImportLog("Session[UserName]  : " + Session["UserName"]);
                //if (Session["UserName"] != null)
                //{
                var dat = DateTime.Now;
                var day = dat.ToString("dd");
                var month = dat.ToString("MM");
                var year = dat.Year;

                var hrs = dat.ToString("HH");
                var mins = dat.ToString("mm");
                var sec = dat.ToString("ss");

                var result = string.Empty;
                connection();
                string provider = ConfigurationManager.AppSettings["ExcelProvider"];
                string importFileFolder = ConfigurationManager.AppSettings["ImportFiles"];
                DataSet ds = new DataSet();
                VImportExcelRepository VImportObj = new VImportExcelRepository();
                //var fsr;
                if (tableName == "" || file == null)
                {
                    return null;
                }
                if (Request.Files["file"].ContentLength > 0)
                {
                    string fileExtension = System.IO.Path.GetExtension(Request.Files["file"].FileName);

                    //if (fileExtension == ".xls" || fileExtension == ".xlsx")
                    //{

                    string FileName = Path.GetFileName(file.FileName);
                    //if (FileName.LastIndexOf("/")>0)
                    //{
                    //    FileName = FileName.Substring(FileName.LastIndexOf("/") + 1);
                    //}
                    //string fileLocation = Server.MapPath("~/") + Request.Files["file"].FileName;
                    // string fileLocation = Server.MapPath("~/ImportFiles/") + FileName;

                    //Item Maintenance_FMS_20190624164037
                    // string fileLocation = importFileFolder + FileName.Split('.')[0] + "_" + _userId + "_" + year + month + day + hrs + mins + sec + "." + FileName.Split('.')[1];
                    string fileLocation = Server.MapPath(importFileFolder) + FileName.Split('.')[0] + "_" + _userId + "_" + year + month + day + hrs + mins + sec + "." + FileName.Split('.')[1]; ;
                    ImportLog("fileLocation =" + fileLocation);

                    byte[] arrayOfMyString = Encoding.UTF8.GetBytes(Request.Files["file"].FileName.ToString());
                    ImportLog("arrayOfMyString =" + arrayOfMyString);
                    MemoryStream stream = new MemoryStream(arrayOfMyString);
                    ImportLog("stream =" + stream);

                    var contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                    var fsr = new FileStreamResult(stream, contentType);
                    fsr.FileStream.Dispose();
                    fsr.FileStream.Close();

                    stream.Dispose();
                    stream.Close();
                    if (System.IO.File.Exists(fileLocation))
                    {
                        ImportLog("System.IO.File.Exists(fileLocation)");
                        System.GC.Collect();
                        System.GC.WaitForPendingFinalizers();
                        ImportLog("1: fileLocation, FileAttributes.Normal");
                        System.IO.File.SetAttributes(fileLocation, FileAttributes.Normal);
                        // System.IO.File.Delete(fileLocation);
                        ImportLog("System.IO.File.Delete(fileLocation) : start");

                        System.IO.File.Delete(fileLocation);
                        ImportLog("System.IO.File.Delete(fileLocation) = completed");
                    }
                    ImportLog("Request.Files[file].SaveAs(fileLocation) : start");
                    Request.Files["file"].SaveAs(fileLocation);
                    ImportLog("Request.Files[file].SaveAs(fileLocation) : saved");

                    //  stream.Close();

                    // ImExObj 
                    IMEXUL.IMEXCONFIG ImExObj = new IMEXUL.IMEXCONFIG();
                    // IMEX_Web objIMEX_Web = new IMEX_Web();
                    ImExObj.CS = constr;
                    ImportLog("ImExObj.CS = constr :" + ImExObj.CS);
                    var tableNameList = tableName.Split(',');
                    var returnValue = string.Empty;
                    for (int i = 0; i < tableNameList.Count(); i++)
                    {
                        if (result != "")
                            result = result + " $ ";
                        ImportLog("Step:1 Pass parameter:" + tableNameList[i] + " : User : " + Session["UserName"]);
                        //result = result + tableNameList[i] + " = " + ImExObj.GetImportXLSXFile(tableNameList[i], fileLocation);
                        returnValue = ImExObj.GetImportXLSXFile(tableNameList[i], fileLocation);
                        if (returnValue != "Completed")
                        {
                            ImportErrorLog(tableNameList[i] + "_" + _userId + "_" + year + month + day + hrs + mins + sec, returnValue);
                            returnValue = "../ImportFiles/ImportErrorLog/" + tableNameList[i] + "_" + _userId + "_" + year + month + day + hrs + mins + sec + ".txt";
                        }
                        //~/ImportErrorLog/" + logName + ".txt
                        result = result + returnValue;
                        ImportLog("Step:2 : ReturnValue =" + result + " : User : " + Session["UserName"]);
                    }
                    ImportLog("Step:3:Return JSON result =" + result + "  : User : " + Session["UserName"]);
                    return result;
                }

                return result;
                // }
                //else
                //{
                //    ImportLog("Session nULL : " + Session["UserName"]);
                //    return Json("SessionLogOut", JsonRequestBehavior.AllowGet);
                //}
            }
            catch (Exception ex)
            {
                ImportLog("Error Message = =" + ex.Message);
                return ex.Message.ToString();

            }
        }
        public JsonResult ImportFileToSQL(string tableName, HttpPostedFileBase file)
        {
            try
            {
                var projectName = ConfigurationManager.AppSettings["ProjectName"].ToString().ToUpper();
                var userId = Session["UserId"].ToString();
                ImportLog("Session[UserName]  : " + Session["UserName"]);
                var dat = DateTime.Now;
                var day = dat.ToString("dd");
                var month = dat.ToString("MM");
                var year = dat.Year;

                var hrs = dat.ToString("HH");
                var mins = dat.ToString("mm");
                var sec = dat.ToString("ss");

                var result = string.Empty;
                connection();
                string provider = ConfigurationManager.AppSettings["ExcelProvider"];
                //todo
                string importFileFolder = ConfigurationManager.AppSettings["ImportFiles"];
                //string importFileFolder = ConfigurationManager.AppSettings["ImportErrorLog"];

                srcFolder = ConfigurationManager.AppSettings["srcFolder"];
                destFolder = ConfigurationManager.AppSettings["destFolder"];
                // var destFolderWebConfig = ConfigurationManager.AppSettings["destFolder"];
                //   destFolder = Server.MapPath(destFolderWebConfig).Substring(0, Server.MapPath(destFolderWebConfig).LastIndexOf('\\'));
                DataSet ds = new DataSet();
                VImportExcelRepository VImportObj = new VImportExcelRepository();
                //var fsr;
                if (tableName == "" || file == null)
                {
                    return null;
                }
                if (Request.Files["file"].ContentLength > 0)
                {
                    string fileExtension = System.IO.Path.GetExtension(Request.Files["file"].FileName);


                    string FileName = Path.GetFileName(file.FileName);

                    //Item Maintenance_FMS_20190624164037
                    // string fileLocation = importFileFolder + FileName.Split('.')[0] + "_" + _userId + "_" + year + month + day + hrs + mins + sec + "." + FileName.Split('.')[1];
                    string fileLocation = Server.MapPath(importFileFolder) + FileName.Split('.')[0] + "_" + userId + "_" + year + month + day + hrs + mins + sec + "." + FileName.Split('.')[1]; ;
                    ImportLog("fileLocation =" + fileLocation);

                    byte[] arrayOfMyString = Encoding.UTF8.GetBytes(Request.Files["file"].FileName.ToString());
                    ImportLog("arrayOfMyString =" + arrayOfMyString);
                    MemoryStream stream = new MemoryStream(arrayOfMyString);
                    ImportLog("stream =" + stream);

                    var contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                    var fsr = new FileStreamResult(stream, contentType);
                    fsr.FileStream.Dispose();
                    fsr.FileStream.Close();

                    stream.Dispose();
                    stream.Close();
                    if (System.IO.File.Exists(fileLocation))
                    {
                        ImportLog("System.IO.File.Exists(fileLocation)");
                        System.GC.Collect();
                        System.GC.WaitForPendingFinalizers();
                        ImportLog("1: fileLocation, FileAttributes.Normal");
                        System.IO.File.SetAttributes(fileLocation, FileAttributes.Normal);
                        // System.IO.File.Delete(fileLocation);
                        ImportLog("System.IO.File.Delete(fileLocation) : start");

                        System.IO.File.Delete(fileLocation);
                        ImportLog("System.IO.File.Delete(fileLocation) = completed");
                    }
                    ImportLog("Request.Files[file].SaveAs(fileLocation) : start");
                    Request.Files["file"].SaveAs(fileLocation);
                    ImportLog("Request.Files[file].SaveAs(fileLocation) : saved");

                    //  stream.Close();

                    // ImExObj 
                    IMEXUL.IMEXCONFIG ImExObj = new IMEXUL.IMEXCONFIG();
                    // IMEX_Web objIMEX_Web = new IMEX_Web();
                    ImExObj.CS = constr;
                    ImExObj.UserID = Session["UserId"].ToString();
                    ImExObj.srcFolder = srcFolder;
                    ImExObj.destFolder = destFolder;
                    ImportLog("ImExObj.CS = constr :" + ImExObj.CS);
                    var tableNameList = tableName.Split(',');
                    var returnValue = string.Empty;
                    //for (int i = 0; i < tableNameList.Count(); i++)
                    //{
                    //    if (result != "")
                    //        result = result + " $ ";
                    //    ImportLog("Step:1 Pass parameter:" + tableNameList[i] + " : User : " + Session["UserName"]);
                    //    //result = result + tableNameList[i] + " = " + ImExObj.GetImportXLSXFile(tableNameList[i], fileLocation);
                    //    returnValue = ImExObj.GetImportXLSXFile(tableNameList[i], fileLocation);
                    //    if (returnValue != "Completed")
                    //    {
                    //        ImportErrorLog(tableNameList[i] + "_" + _userId + "_" + year + month + day + hrs + mins + sec, returnValue);
                    //        returnValue = "../ImportFiles/ImportErrorLog/" + tableNameList[i] + "_" + _userId + "_" + year + month + day + hrs + mins + sec + ".txt";
                    //        result = result + returnValue;

                    //    }
                    //    else
                    //    {
                    //        //~/ImportErrorLog/" + logName + ".txt
                    //        result = result + returnValue;
                    //    }
                    //    ImportLog("Step:2 : ReturnValue =" + result + " : User : " + Session["UserName"]);
                    //}

                    for (int i = 0; i < tableNameList.Count(); i++)
                    {
                        try
                        {
                            if (result != "")
                                result = result + " $ ";
                            ImportLog("Step:1 Pass parameter:" + tableNameList[i] + " : User : " + Session["UserName"]);
                            //result = result + tableNameList[i] + " = " + ImExObj.GetImportXLSXFile(tableNameList[i], fileLocation);

                            if (ConfigurationManager.AppSettings["ProjectName"].ToString().ToUpper() == "JSU")
                            {
                                returnValue = ImExObj.GetImportXLSXFileJSU(tableNameList[i], fileLocation);
                            }
                            else if (ConfigurationManager.AppSettings["ProjectName"].ToString().ToUpper() == "POC")
                            {
                                //xlsx - newly added by.M 12.09.2022
                                if (fileExtension.ToLower() == ".xlsx")
                                    returnValue = ImExObj.GetImportXLSXFile(tableNameList[i], fileLocation);
                                else
                                    returnValue = ImExObj.GetImportCSVFile(tableNameList[i], fileLocation);
                            }
                            else
                            {
                                returnValue = ImExObj.GetImportXLSXFile(tableNameList[i], fileLocation);
                            }

                            try
                            {
                                if (returnValue.Trim() == "")
                                    returnValue = "Completed";
                            }
                            catch (Exception)
                            {

                               // throw;
                            }

                            if (returnValue != "Completed")
                            {
                                ImportErrorLog(tableNameList[i] + "_" + userId + "_" + year + month + day + hrs + mins + sec, returnValue);
                                returnValue = "../ImportFiles/ImportErrorLog/" + tableNameList[i] + "_" + userId + "_" + year + month + day + hrs + mins + sec + ".txt";
                            }
                            if (tableNameList[i].ToUpper() == "CUSTOMER" && projectName == "PVMB" && returnValue == "Completed")
                            {
                                Models.DistanceCalculation objDisCal = new Models.DistanceCalculation();
                                objDisCal.SetRouteSequence();
                            }
                            //~/ImportErrorLog/" + logName + ".txt
                            result = result + returnValue;
                            ImportLog("Step:2 : ReturnValue =" + result + " : User : " + Session["UserName"]);
                        }
                        catch (Exception ex)
                        {
                            ImportLog("First catch Error Message = =" + ex.Message);
                            return Json(ex.Message);
                        }
                    }

                    ImportLog("Step:3:Return JSON result =" + result + "  : User : " + Session["UserName"]);
                    return Json(result);
                }
                return Json(result);
            }
            catch (Exception ex)
            {
                ImportLog("Secound catch Error Message = =" + ex.Message);
                return Json(ex.Message);

            }
        }

        // public JsonResult ExportSQLUL(string tableName, HttpPostedFileBase file)
        public JsonResult ImportFileToSQLULOld(string tableName, HttpPostedFileBase file)
        {
            try
            {
                _userId = Session["UserId"].ToString();
                ImportLog("Session[UserName]  : " + Session["UserName"]);
                //if (Session["UserName"] != null)
                //{
                var dat = DateTime.Now;
                var day = dat.ToString("dd");
                var month = dat.ToString("MM");
                var year = dat.Year;

                var hrs = dat.ToString("HH");
                var mins = dat.ToString("mm");
                var sec = dat.ToString("ss");

                var result = string.Empty;
                connection();
                string provider = ConfigurationManager.AppSettings["ExcelProvider"];
                string importFileFolder = ConfigurationManager.AppSettings["ImportFiles"];

                srcFolder = ConfigurationManager.AppSettings["srcFolder"];
                destFolder = ConfigurationManager.AppSettings["destFolder"];
                // var destFolderWebConfig = ConfigurationManager.AppSettings["destFolder"];
                //   destFolder = Server.MapPath(destFolderWebConfig).Substring(0, Server.MapPath(destFolderWebConfig).LastIndexOf('\\'));
                DataSet ds = new DataSet();
                VImportExcelRepository VImportObj = new VImportExcelRepository();
                //var fsr;
                if (tableName == "" || file == null)
                {
                    return null;
                }
                if (Request.Files["file"].ContentLength > 0)
                {
                    string fileExtension = System.IO.Path.GetExtension(Request.Files["file"].FileName);

                    //if (fileExtension == ".xls" || fileExtension == ".xlsx")
                    //{

                    string FileName = Path.GetFileName(file.FileName);
                    //if (FileName.LastIndexOf("/")>0)
                    //{
                    //    FileName = FileName.Substring(FileName.LastIndexOf("/") + 1);
                    //}
                    //string fileLocation = Server.MapPath("~/") + Request.Files["file"].FileName;
                    // string fileLocation = Server.MapPath("~/ImportFiles/") + FileName;

                    //Item Maintenance_FMS_20190624164037
                    // string fileLocation = importFileFolder + FileName.Split('.')[0] + "_" + _userId + "_" + year + month + day + hrs + mins + sec + "." + FileName.Split('.')[1];
                    string fileLocation = Server.MapPath(importFileFolder) + FileName.Split('.')[0] + "_" + _userId + "_" + year + month + day + hrs + mins + sec + "." + FileName.Split('.')[1]; ;
                    ImportLog("fileLocation =" + fileLocation);

                    byte[] arrayOfMyString = Encoding.UTF8.GetBytes(Request.Files["file"].FileName.ToString());
                    ImportLog("arrayOfMyString =" + arrayOfMyString);
                    MemoryStream stream = new MemoryStream(arrayOfMyString);
                    ImportLog("stream =" + stream);

                    var contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                    var fsr = new FileStreamResult(stream, contentType);
                    fsr.FileStream.Dispose();
                    fsr.FileStream.Close();

                    stream.Dispose();
                    stream.Close();
                    if (System.IO.File.Exists(fileLocation))
                    {
                        ImportLog("System.IO.File.Exists(fileLocation)");
                        System.GC.Collect();
                        System.GC.WaitForPendingFinalizers();
                        ImportLog("1: fileLocation, FileAttributes.Normal");
                        System.IO.File.SetAttributes(fileLocation, FileAttributes.Normal);
                        // System.IO.File.Delete(fileLocation);
                        ImportLog("System.IO.File.Delete(fileLocation) : start");

                        System.IO.File.Delete(fileLocation);
                        ImportLog("System.IO.File.Delete(fileLocation) = completed");
                    }
                    ImportLog("Request.Files[file].SaveAs(fileLocation) : start");
                    Request.Files["file"].SaveAs(fileLocation);
                    ImportLog("Request.Files[file].SaveAs(fileLocation) : saved");

                    //  stream.Close();

                    // ImExObj 
                    // IMEXUL.IMEXCONFIG ImExObj = new IMEXUL.IMEXCONFIG();
                    IMEXUL.IMEXCONFIGNEW ImExObj = new IMEXUL.IMEXCONFIGNEW();
                    // IMEX_Web objIMEX_Web = new IMEX_Web();
                    ImExObj.CS = constr;
                    ImExObj.UserID = Session["UserName"].ToString();
                    ImExObj.srcFolder = srcFolder;
                    ImExObj.destFolder = destFolder;
                    exportFolder = ConfigurationManager.AppSettings["ExportFiles"];
                    _ExportFolder = Server.MapPath(exportFolder);
                    ImExObj.ExportFolder = _ExportFolder;
                    ImportLog("ImExObj.CS = constr :" + ImExObj.CS);
                    var tableNameList = tableName.Split(',');
                    var returnValue = string.Empty;
                    for (int i = 0; i < tableNameList.Count(); i++)
                    {
                        if (result != "")
                            result = result + " $ ";
                        ImportLog("Step:1 Pass parameter:" + tableNameList[i] + " : User : " + Session["UserName"]);
                        //result = result + tableNameList[i] + " = " + ImExObj.GetImportXLSXFile(tableNameList[i], fileLocation);
                        returnValue = ImExObj.GetImportXLSXFile(tableNameList[i], fileLocation);
                        if (returnValue != "Completed")
                        {
                            if (System.IO.File.Exists(returnValue))
                            {
                                result = result + returnValue + "&" + "link" + "&" + exportFolder.Replace("~", "..");
                                //result =   returnValue + "&" + "link" + "&" + exportFolder.Replace("~", "..");
                                ImportLog("Step:8 : result =  " + result);
                                //return Json(result, JsonRequestBehavior.AllowGet);
                            }
                            else
                            {
                                //~/ImportErrorLog/" + logName + ".txt
                                result = result + returnValue;
                            }
                            //ImportErrorLog(tableNameList[i] + "_" + _userId + "_" + year + month + day + hrs + mins + sec, returnValue);
                            //returnValue = "../ImportFiles/ImportErrorLog/" + tableNameList[i] + "_" + _userId + "_" + year + month + day + hrs + mins + sec + ".txt";
                        }
                        else
                        {
                            //~/ImportErrorLog/" + logName + ".txt
                            result = result + returnValue;
                        }


                        ImportLog("Step:2 : ReturnValue =" + result + " : User : " + Session["UserName"]);
                    }
                    ImportLog("Step:3:Return JSON result =" + result + "  : User : " + Session["UserName"]);
                    return Json(result);
                }

                return Json(result);
                // }
                //else
                //{
                //    ImportLog("Session nULL : " + Session["UserName"]);
                //    return Json("SessionLogOut", JsonRequestBehavior.AllowGet);
                //}
            }
            catch (Exception ex)
            {
                ImportLog("Error Message = =" + ex.Message);
                return Json(ex.Message);

            }
        }

        public JsonResult ImportFileUpload(HttpPostedFileBase file)
        {
            try
            {
                _userId = Session["UserId"].ToString();
                ImportLog("Session[UserName]  : " + Session["UserName"]);

                var dat = DateTime.Now;
                var day = dat.ToString("dd");
                var month = dat.ToString("MM");
                var year = dat.Year;

                var hrs = dat.ToString("HH");
                var mins = dat.ToString("mm");
                var sec = dat.ToString("ss");

                connection();
                string importFileFolder = ConfigurationManager.AppSettings["ImportFiles"];
                if (Request.Files["file"].ContentLength > 0)
                {
                    string fileExtension = System.IO.Path.GetExtension(Request.Files["file"].FileName);
                    string FileName = Path.GetFileName(file.FileName);

                    string fileLocation = Server.MapPath(importFileFolder) + FileName.Split('.')[0] + "_" + _userId + "_" + year + month + day + hrs + mins + sec + "." + FileName.Split('.')[1]; ;
                    ImportLog("fileLocation =" + fileLocation);

                    byte[] arrayOfMyString = Encoding.UTF8.GetBytes(Request.Files["file"].FileName.ToString());
                    ImportLog("arrayOfMyString =" + arrayOfMyString);
                    MemoryStream stream = new MemoryStream(arrayOfMyString);
                    ImportLog("stream =" + stream);

                    var contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                    var fsr = new FileStreamResult(stream, contentType);
                    fsr.FileStream.Dispose();
                    fsr.FileStream.Close();

                    stream.Dispose();
                    stream.Close();
                    if (System.IO.File.Exists(fileLocation))
                    {
                        ImportLog("System.IO.File.Exists(fileLocation)");
                        System.GC.Collect();
                        System.GC.WaitForPendingFinalizers();
                        ImportLog("1: fileLocation, FileAttributes.Normal");
                        System.IO.File.SetAttributes(fileLocation, FileAttributes.Normal);
                        // System.IO.File.Delete(fileLocation);
                        ImportLog("System.IO.File.Delete(fileLocation) : start");

                        System.IO.File.Delete(fileLocation);
                        ImportLog("System.IO.File.Delete(fileLocation) = completed");
                    }
                    ImportLog("Request.Files[file].SaveAs(fileLocation) : start");
                    Request.Files["file"].SaveAs(fileLocation);
                    ImportLog("Request.Files[file].SaveAs(fileLocation) : saved");

                    return Json(fileLocation);
                }
                return Json(string.Empty);
            }
            catch (Exception ex)
            {
                ImportLog("Error Message = =" + ex.Message);
                return Json(ex.Message);
            }
        }

        public JsonResult ImportFileToSQLUL(string tableName, string fileLocation)
        {
            try
            {
                ImportLog("Session[UserName]  : " + Session["UserName"]);
                var result = string.Empty;
                connection();
                string provider = ConfigurationManager.AppSettings["ExcelProvider"];
                string importFileFolder = ConfigurationManager.AppSettings["ImportFiles"];
                srcFolder = ConfigurationManager.AppSettings["srcFolder"];
                destFolder = ConfigurationManager.AppSettings["destFolder"];
                DataSet ds = new DataSet();
                VImportExcelRepository VImportObj = new VImportExcelRepository();

                // ImExObj 
                // IMEXUL.IMEXCONFIG ImExObj = new IMEXUL.IMEXCONFIG();
                IMEXUL.IMEXCONFIGNEW ImExObj = new IMEXUL.IMEXCONFIGNEW();

                // IMEX_Web objIMEX_Web = new IMEX_Web();
                ImExObj.CS = constr;
                ImExObj.UserID = Session["UserName"].ToString();
                ImExObj.srcFolder = srcFolder;
                ImExObj.destFolder = destFolder;
                exportFolder = ConfigurationManager.AppSettings["ExportFiles"];
                _ExportFolder = Server.MapPath(exportFolder);
                ImExObj.ExportFolder = _ExportFolder;
                ImportLog("ImExObj.CS = constr :" + ImExObj.CS);
                var tableNameList = tableName.Split(',');
                var returnValue = string.Empty;
                for (int i = 0; i < tableNameList.Count(); i++)
                {
                    if (result != "")
                        result = result + " $ ";
                    ImportLog("Step:1 Pass parameter:" + tableNameList[i] + " : User : " + Session["UserName"]);
                    //result = result + tableNameList[i] + " = " + ImExObj.GetImportXLSXFile(tableNameList[i], fileLocation);

                    returnValue = ImExObj.GetImportXLSXFile(tableNameList[i], fileLocation);


                    if (returnValue != "Completed")
                    {
                        if (System.IO.File.Exists(returnValue))
                        {
                            result = result + returnValue + "&" + "link" + "&" + exportFolder.Replace("~", "..");
                            //result =   returnValue + "&" + "link" + "&" + exportFolder.Replace("~", "..");
                            ImportLog("Step:8 : result =  " + result);
                            //return Json(result, JsonRequestBehavior.AllowGet);
                        }
                        else
                        {
                            //~/ImportErrorLog/" + logName + ".txt
                            result = result + returnValue;
                        }
                        //ImportErrorLog(tableNameList[i] + "_" + _userId + "_" + year + month + day + hrs + mins + sec, returnValue);
                        //returnValue = "../ImportFiles/ImportErrorLog/" + tableNameList[i] + "_" + _userId + "_" + year + month + day + hrs + mins + sec + ".txt";
                    }
                    else
                    {
                        //~/ImportErrorLog/" + logName + ".txt
                        result = result + returnValue;
                    }
                    ImportLog("Step:2 : ReturnValue =" + result + " : User : " + Session["UserName"]);
                }
                ImportLog("Step:3:Return JSON result =" + result + "  : User : " + Session["UserName"]);
                return Json(result);
            }
            catch (Exception ex)
            {
                ImportLog("Error Message = =" + ex.Message);
                return Json(ex.Message);
            }
        }


        public ActionResult POSDataUploadUL1(string CustNo, HttpPostedFileBase file)
        {
            try
            {
                Microsoft.Office.Interop.Excel.Application xlApp = new Microsoft.Office.Interop.Excel.Application();
                // return Json("test");
                if (xlApp == null)
                {
                    // MessageBox.Show("Excel is not properly installed!!");
                    return Json("Excel is not properly installed!!");
                }

                Microsoft.Office.Interop.Excel.Workbook xlWorkBook;
                Microsoft.Office.Interop.Excel.Worksheet xlWorkSheet;
                object misValue = System.Reflection.Missing.Value;

                xlWorkBook = xlApp.Workbooks.Add(misValue);
                xlWorkSheet = (Microsoft.Office.Interop.Excel.Worksheet)xlWorkBook.Worksheets.get_Item(1);

                xlWorkSheet.Cells[1, 1] = "ID";
                xlWorkSheet.Cells[1, 2] = "Name";
                xlWorkSheet.Cells[2, 1] = "1";
                xlWorkSheet.Cells[2, 2] = "One";
                xlWorkSheet.Cells[3, 1] = "2";
                xlWorkSheet.Cells[3, 2] = "Two";


                //E:\Source\JSU\SimplrSales\SimplrSales\Files\StockVarince
                //Here saving the file in xlsx
                var path = System.IO.Path.Combine(Server.MapPath("~/ImportFiles/StockVarince/"), "stockVarince1.xlsx");
                //  path = Server.MapPath("~/Files/StockVarince/") + "stockVarince.xlsx";

                if (System.IO.File.Exists(path))
                {
                    System.GC.Collect();
                    System.GC.WaitForPendingFinalizers();
                    System.IO.File.Delete(path);
                }

                var path1 = path + "\\stockVarince1.xlsx";
                //  xlWorkBook.SaveAs("e:\\stockVarince.xlsx", Microsoft.Office.Interop.Excel.XlFileFormat.xlOpenXMLWorkbook, misValue,

                //xlWorkBook.SaveAs(path, Microsoft.Office.Interop.Excel.XlFileFormat.xlOpenXMLWorkbook, misValue, misValue, misValue, misValue, Microsoft.Office.Interop.Excel.XlSaveAsAccessMode.xlExclusive, misValue, misValue, misValue, misValue, misValue);
                xlWorkBook.SaveAs(path, Microsoft.Office.Interop.Excel.XlFileFormat.xlWorkbookNormal, misValue, misValue, misValue, misValue, Microsoft.Office.Interop.Excel.XlSaveAsAccessMode.xlExclusive, misValue, misValue, misValue, misValue, misValue);


                xlWorkBook.Close(true, misValue, misValue);
                xlApp.Quit();

                //  string fileLocation = Server.MapPath("~/Files/StockVarince/") + "stockVarince.xlsx";
                string fileLocation = System.IO.Path.Combine(Server.MapPath("~/ImportFiles/StockVarince/"), "stockVarince1.xlsx");

                Microsoft.Office.Interop.Excel.Application excelApp = new Microsoft.Office.Interop.Excel.Application();
                //  string myPath = (@"C:\Users\User\Desktop\data.xlsx");
                //string myPath = (@"C:\Users\DELL\Desktop\Import Files\SimplrMasterData.xlsx");
                string myPath = (fileLocation);
                excelApp.Workbooks.Open(myPath);
                excelApp.Visible = true;

                //Marshal.ReleaseComObject(xlWorkSheet);
                //Marshal.ReleaseComObject(xlWorkBook);
                //Marshal.ReleaseComObject(xlApp);

                //MessageBox.Show("Excel file created , you can find the file d:\\csharp-Excel.xlsx");
                return Json("Success");

            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                return Json(ex.Message);
            }
        }

        public ActionResult POSDataUploadUL(string CustNo, HttpPostedFileBase file)
        {
            try
            {
                var result = string.Empty;
                connection();
                string provider = ConfigurationManager.AppSettings["ExcelProvider"];
                string importFileFolder = ConfigurationManager.AppSettings["ImportFiles"];
                DataSet ds = new DataSet();
                VImportExcelRepository VImportObj = new VImportExcelRepository();

                if (Request.Files["file"].ContentLength > 0)
                {
                    string fileExtension = System.IO.Path.GetExtension(Request.Files["file"].FileName);
                    string FileName = Path.GetFileName(file.FileName);

                    string fileLocation = Server.MapPath(importFileFolder) + FileName;
                    ImportLog("fileLocation =" + fileLocation);

                    byte[] arrayOfMyString = Encoding.UTF8.GetBytes(Request.Files["file"].FileName.ToString());
                    ImportLog("arrayOfMyString =" + arrayOfMyString);
                    MemoryStream stream = new MemoryStream(arrayOfMyString);
                    ImportLog("stream =" + stream);

                    var contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                    var fsr = new FileStreamResult(stream, contentType);
                    fsr.FileStream.Dispose();
                    fsr.FileStream.Close();

                    stream.Dispose();
                    stream.Close();
                    if (System.IO.File.Exists(fileLocation))
                    {
                        ImportLog("System.IO.File.Exists(fileLocation)");
                        System.GC.Collect();
                        System.GC.WaitForPendingFinalizers();
                        ImportLog("1: fileLocation, FileAttributes.Normal");
                        System.IO.File.SetAttributes(fileLocation, FileAttributes.Normal);
                        // System.IO.File.Delete(fileLocation);
                        ImportLog("System.IO.File.Delete(fileLocation) : start");

                        System.IO.File.Delete(fileLocation);
                        ImportLog("System.IO.File.Delete(fileLocation) = completed");
                    }
                    ImportLog("Request.Files[file].SaveAs(fileLocation) : start");
                    Request.Files["file"].SaveAs(fileLocation);
                    ImportLog("Request.Files[file].SaveAs(fileLocation) : saved");

                    //  IMEXUL.IMEXConfigPOS ImExPosObj = new IMEXUL.IMEXConfigPOS();
                    ImExPosObj.CS = constr;
                    ImExPosObj.CustomerNo = CustNo;

                    //ImExPosObj.AddDelete = false;
                    ImportLog("Step:1 Pass parameter:" + fileLocation);
                    _fileLocation = fileLocation;
                    var returnValue = ImExPosObj.GetImportXLSXFileCN("POS Upload", fileLocation);
                    _ControlNo = ImExPosObj.ControlNo;
                    _CustomerNo = (ImExPosObj.AccountCode != "") ? ImExPosObj.AccountCode : "STANDARD";
                    ImportLog("Step:2 : ReturnValue =" + returnValue);


                    exportFolder = ConfigurationManager.AppSettings["ExportFiles"];
                    _ExportFolder = Server.MapPath(exportFolder);
                    if (returnValue == "False")
                    {
                        ImExPosObj.TableName = _tableName;
                        ImExPosObj.CustomerNo = _CustomerNo;
                        ImExPosObj.ExportFolder = _ExportFolder;
                        ImportLog("Step:3 : ReturnValue = False" + returnValue);
                        returnValue = ImExPosObj.GetImportXLSXFile("POS Upload", fileLocation);
                        dtTable = ImExPosObj.dtTable.Copy();
                        _FStartRow = ImExPosObj.FStartRow;
                        ImportLog("Step:4 : ReturnValue =  " + returnValue);
                        //  returnValue = ImExPosObj.ImportFilePOS();
                        if (System.IO.File.Exists(returnValue))
                        {
                            result = returnValue + "&" + "link" + "&" + exportFolder.Replace("~", "..");
                            ImportLog("Step:8 : result =  " + result);
                            return Json(result, JsonRequestBehavior.AllowGet);
                        }
                        else if (returnValue == "Completed")
                        {
                            ImportLog("Step:5 : ImExPosObj.ImportFilePOSUpload() ");
                            returnValue = ImExPosObj.ImportFilePOSUpload();
                            ImportLog("Step:6 : ReturnValue =  " + returnValue);
                            if (returnValue == "Completed")
                            {
                                ImportLog("Step:7 : ImExPosObj.ImportFilePOSProcess() ");
                                returnValue = ImExPosObj.ImportFilePOSProcess();
                                ImportLog("Step:8 : ReturnValue =  " + returnValue);
                            }
                        }
                        else
                        {
                            result = returnValue + "&" + "alert";
                            ImportLog("Step:8 : result =  " + result);
                            return Json(result, JsonRequestBehavior.AllowGet);
                        }
                        result = returnValue + "&" + "False";
                        ImportLog("Step:8 : result =  " + result);

                    }
                    else
                        result = returnValue;
                    ImportLog("Step:9 : result =  " + result);

                    //new
                    // result = returnValue;
                }
                ImportLog("Step:10 : Json(result) =  ");
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                ImportLog("Error Message = =" + ex.Message);
                return Json("", JsonRequestBehavior.AllowGet);

            }
        }

        public ActionResult POSDataUploadAddDelete(string CustNo, string value, string returnVal)
        {
            try
            {
                connection();
                ImExPosObj.CS = constr;
                var result = string.Empty;
                var returnValue = string.Empty;
                if (returnVal == "False")
                {
                    //ImExPosObj.CustomerNo = _CustomerNo;
                    //returnValue = ImExPosObj.GetImportXLSXFile("POS Upload", _fileLocation);
                    //dtTable = ImExPosObj.dtTable.Copy();
                    //_FStartRow = ImExPosObj.FStartRow;

                    ////  returnValue = ImExPosObj.ImportFilePOS();
                    //if (returnValue == "Completed")
                    //{
                    //    returnValue = ImExPosObj.ImportFilePOSUpload();
                    //    if (returnValue == "Completed")
                    //        returnValue = ImExPosObj.ImportFilePOSProcess();
                    //}
                }
                else
                {

                    // connection();
                    // IMEXUL.IMEXConfigPOS ImExPosObj = new IMEXUL.IMEXConfigPOS();
                    // ImExPosObj.CS = constr;
                    // ImExPosObj.AddDelete = false;
                    ImportLog("Step:1 Pass parameter:" + _fileLocation);
                    ImExPosObj.ControlNo = _ControlNo;
                    ImExPosObj.ImportTableName.Add(_tableName);
                    ImExPosObj.ImportTableAliasName.Add(_tableAliasName);
                    ImExPosObj.ImportSequence.Add("0");
                    //ImExPosObj.dtTable = dtTable.Copy();

                    //ImExPosObj.CustomerNo = CustNo;
                    if (value == "Add")
                        ImExPosObj.AddDelete = true;
                    else
                        ImExPosObj.AddDelete = false;

                    ImExPosObj.TableName = _tableName;
                    ImExPosObj.CustomerNo = _CustomerNo;
                    ImExPosObj.ExportFolder = _ExportFolder;
                    returnValue = ImExPosObj.GetImportXLSXFile("POS Upload", _fileLocation);
                    dtTable = ImExPosObj.dtTable.Copy();
                    _FStartRow = ImExPosObj.FStartRow;

                    if (System.IO.File.Exists(returnValue))
                    {
                        result = returnValue + "&" + "link" + "&" + exportFolder.Replace("~", "..");
                        ImportLog("Step:8 : result =  " + result);
                        return Json(result, JsonRequestBehavior.AllowGet);
                    }
                    else if (returnValue == "Completed")
                    {
                        ImportLog("Step:5 : ImExPosObj.ImportFilePOSUpload() ");
                        returnValue = ImExPosObj.ImportFilePOSUpload();
                        ImportLog("Step:6 : ReturnValue =  " + returnValue);
                        if (returnValue == "Completed")
                        {
                            ImportLog("Step:7 : ImExPosObj.ImportFilePOSProcess() ");
                            returnValue = ImExPosObj.ImportFilePOSProcess();
                            ImportLog("Step:8 : ReturnValue =  " + returnValue);
                        }
                    }
                    else
                    {
                        result = returnValue + "&" + "alert";
                        ImportLog("Step:8 : result =  " + result);
                        return Json(result, JsonRequestBehavior.AllowGet);
                    }
                    //else if (returnValue == "Warning : Duplicate rows are found. should you want to proceed?")
                    //{
                    //    return Json(returnValue, JsonRequestBehavior.AllowGet);
                    //}
                }
                return Json(returnValue, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                ImportLog("Error Message = =" + ex.Message);
                return Json("", JsonRequestBehavior.AllowGet);

            }
        }

        public ActionResult POSDataUploadError(string CustNo, string value, string returnVal)
        {
            try
            {
                ImExPosObj.ControlNo = _ControlNo;
                ImExPosObj.CustomerNo = CustNo;
                ImExPosObj.ExportFolder = _ExportFolder;
                ImExPosObj.ImportTableName.Add(_tableName);
                ImExPosObj.ImportTableAliasName.Add(_tableAliasName);
                ImExPosObj.ImportSequence.Add("0");

                if (dtTable != null)
                    ImExPosObj.dtTable = dtTable.Copy();
                ImExPosObj.FStartRow = _FStartRow;

                var result = string.Empty;
                //connection();
                //  IMEXUL.IMEXConfigPOS ImExPosObj = new IMEXUL.IMEXConfigPOS();
                // ImExObj.CS = constr;
                // ImExObj.AddDelete = false;
                //if (value == "Add")
                //    ImExObj.AddDelete = true;
                //else
                //    ImExObj.AddDelete = false;

                var returnValue = ImExPosObj.ImportFilePOSUpload();
                if (returnValue == "Completed")
                    returnValue = ImExPosObj.ImportFilePOSProcess();
                return Json(returnValue, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                ImportLog("Error Message = =" + ex.Message);
                return Json("", JsonRequestBehavior.AllowGet);

            }
        }


        //  [HttpPost]
        //  public JsonResult ImportConfigMaping(HttpPostedFileBase file, string WORKSHEETNAME)
        public ActionResult ImportConfigMaping(string WORKSHEETNAME, HttpPostedFileBase file)
        {
            try
            {

                connection();
                string provider = ConfigurationManager.AppSettings["ExcelProvider"];
                DataSet ds = new DataSet();
                VImportExcelRepository VImportObj = new VImportExcelRepository();
                //var fsr;
                if (file == null)
                {
                    return null;
                }
                if (Request.Files["file"].ContentLength > 0)
                {
                    string fileExtension = System.IO.Path.GetExtension(Request.Files["file"].FileName);

                    //if (fileExtension == ".xls" || fileExtension == ".xlsx")
                    //{

                    string FileName = Path.GetFileName(file.FileName);
                    //if (FileName.LastIndexOf("/")>0)
                    //{
                    //    FileName = FileName.Substring(FileName.LastIndexOf("/") + 1);
                    //}
                    //string fileLocation = Server.MapPath("~/") + Request.Files["file"].FileName;
                    string fileLocation = Server.MapPath("~/ImportFiles/") + FileName;


                    byte[] arrayOfMyString = Encoding.UTF8.GetBytes(Request.Files["file"].FileName.ToString());
                    MemoryStream stream = new MemoryStream(arrayOfMyString);
                    var contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                    var fsr = new FileStreamResult(stream, contentType);
                    fsr.FileStream.Dispose();
                    fsr.FileStream.Close();

                    stream.Dispose();
                    stream.Close();

                    if (System.IO.File.Exists(fileLocation))
                    {
                        System.GC.Collect();
                        System.GC.WaitForPendingFinalizers();

                        System.IO.File.Delete(fileLocation);
                    }

                    Request.Files["file"].SaveAs(fileLocation);
                    //  stream.Close();

                    IMEXUL.IMEXCONFIG objIMEXCofig = new IMEXUL.IMEXCONFIG();
                    //  objIMEXCofig.CS = constr;

                    if (fileExtension == ".csv")
                        objIMEXCofig.GetImportCSV(fileLocation);
                    else if (fileExtension == ".xml")
                        objIMEXCofig.GetImportXML(fileLocation);
                    else if (fileExtension == ".xls" || fileExtension == ".xlsx")
                        objIMEXCofig.GetImportXLSX(WORKSHEETNAME, fileLocation);

                    // objIMEXCofig.GetImportXML(fileLocation);
                    var importFileHeaderName = objIMEXCofig.ImportFileHeaderName;
                    var importFileDataField = objIMEXCofig.ImportFileDataField;

                    var data = new
                    {
                        importFileHeaderName,
                        importFileDataField,
                    };
                    return Json(data, JsonRequestBehavior.AllowGet);
                    // return Json(importFileHeaderName + "$" + importFileDataField, JsonRequestBehavior.AllowGet);

                }
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
            }

            return Json("", JsonRequestBehavior.AllowGet);
        }

        public ActionResult ImportConfigMaping1(string WORKSHEETNAME, HttpPostedFileBase file)
        {
            try
            {

                connection();
                string provider = ConfigurationManager.AppSettings["ExcelProvider"];
                DataSet ds = new DataSet();
                VImportExcelRepository VImportObj = new VImportExcelRepository();
                //var fsr;
                if (file == null)
                {
                    return null;
                }
                if (Request.Files["file"].ContentLength > 0)
                {
                    string fileExtension = System.IO.Path.GetExtension(Request.Files["file"].FileName);

                    //if (fileExtension == ".xls" || fileExtension == ".xlsx")
                    //{

                    string FileName = Path.GetFileName(file.FileName);
                    //if (FileName.LastIndexOf("/")>0)
                    //{
                    //    FileName = FileName.Substring(FileName.LastIndexOf("/") + 1);
                    //}
                    //string fileLocation = Server.MapPath("~/") + Request.Files["file"].FileName;
                    string fileLocation = Server.MapPath("~/ImportFiles/") + FileName;


                    byte[] arrayOfMyString = Encoding.UTF8.GetBytes(Request.Files["file"].FileName.ToString());
                    MemoryStream stream = new MemoryStream(arrayOfMyString);
                    var contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                    var fsr = new FileStreamResult(stream, contentType);
                    fsr.FileStream.Dispose();
                    fsr.FileStream.Close();

                    stream.Dispose();
                    stream.Close();

                    if (System.IO.File.Exists(fileLocation))
                    {
                        System.GC.Collect();
                        System.GC.WaitForPendingFinalizers();

                        System.IO.File.Delete(fileLocation);
                    }

                    Request.Files["file"].SaveAs(fileLocation);
                    //  stream.Close();

                    IMEXUL.IMEXCONFIG objIMEXCofig = new IMEXUL.IMEXCONFIG();
                    objIMEXCofig.CS = constr;
                    var result = string.Empty;
                    if (fileExtension == ".csv")
                        result = objIMEXCofig.GetImportCSVFile(WORKSHEETNAME, fileLocation);
                    else if (fileExtension == ".xml")
                        result = objIMEXCofig.GetImportXMLFile(WORKSHEETNAME, fileLocation);
                    else if (fileExtension == ".xls" || fileExtension == ".xlsx")
                        result = objIMEXCofig.GetImportXLSXFile(WORKSHEETNAME, fileLocation);
                    var table = objIMEXCofig.dtTable;

                    dynamic DyObj = new System.Dynamic.ExpandoObject();
                    var HeaderList = new List<dynamic>();


                    JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
                    List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
                    Dictionary<string, object> childRow;

                    var iscolumn = true;
                    foreach (DataRow row in table.Rows)
                    {
                        childRow = new Dictionary<string, object>();
                        foreach (DataColumn col in table.Columns)
                        {
                            childRow.Add(col.ColumnName, row[col]);
                            if (iscolumn)
                                HeaderList.Add(col.ColumnName);
                        }
                        parentRow.Add(childRow);
                        iscolumn = false;
                    }

                    var data = new
                    {
                        HeaderList,
                        parentRow,
                    };
                    jsSerializer.MaxJsonLength = 2147483644;
                    //var obj = jsSerializer.Deserialize<MyClass>(json_object);

                    // return jsSerializer.Serialize(data);  
                    JsonResult json = Json(data, JsonRequestBehavior.AllowGet);
                    json.MaxJsonLength = int.MaxValue;
                    return json;


                    //  return Json(data, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                return Json("error", JsonRequestBehavior.AllowGet);
            }

            return Json("", JsonRequestBehavior.AllowGet);
        }

        public ActionResult ImportFile()
        {
            IMEXUL.IMEXCONFIG objIMEXCofig = new IMEXUL.IMEXCONFIG();
            var result = objIMEXCofig.ImportFile();
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult UploadFiles1(string Code, System.Collections.IEnumerable files1)
        {
            String path1 = ConfigurationManager.AppSettings["configFile"];

            ///
            //IEnumerable files
            foreach (HttpPostedFileBase file in files1)
            {
                var uniqueName = Code;

                var fileNameWithoutExt = Path.GetFileNameWithoutExtension(file.FileName) ?? "";
                var fileName = Path.GetFileName(file.FileName) ?? "";
                var newFileName = fileName.Replace(fileNameWithoutExt, uniqueName);

                var physicalPath = Path.Combine(Server.MapPath(path1 + "2018000008_3.png"),
                                                newFileName);

                //   ../DeviceImages/Images/Items/2018000008_3.png
                var pattern = uniqueName + ".*";
                var matches = Directory.GetFiles(Server.MapPath(path1 + "2018000008_3.png"), pattern);

                if (matches.Length > 0)
                {
                    //db.Entry(physicalPath).State = EntityState.Modified;
                    foreach (var record in matches)
                        System.IO.File.Delete(record);

                }

                file.SaveAs(physicalPath);
            }
            ///


            String path = ConfigurationManager.AppSettings["configFile"];

            //  string uploadpath = "../ImportFiles/images";
            string uploadpath = path.Replace("~", "..");
            var filePath = string.Empty;
            // Checking no of files injected in Request object  
            if (Request.Files.Count > 0)
            {
                try
                {
                    //  Get all files from Request object  
                    HttpFileCollectionBase files = Request.Files;
                    for (int i = 0; i < files.Count; i++)
                    {
                        //string path = AppDomain.CurrentDomain.BaseDirectory + "Uploads/";  
                        //string filename = Path.GetFileName(Request.Files[i].FileName);  

                        HttpPostedFileBase file = files[i];
                        string fname;

                        // Checking for Internet Explorer  
                        if (Request.Browser.Browser.ToUpper() == "IE" || Request.Browser.Browser.ToUpper() == "INTERNETEXPLORER")
                        {
                            string[] testfiles = file.FileName.Split(new char[] { '\\' });
                            fname = testfiles[testfiles.Length - 1];
                        }
                        else
                        {
                            fname = file.FileName;
                        }

                        // Get the complete folder path and store the file inside it.  
                        //fname = System.IO.Path.Combine(Server.MapPath("~/Uploads/"), fname);
                        //fname = System.IO.Path.Combine(Server.MapPath("~/ImportFiles/Images/"), fname.Split('.')[0] + ".simg");

                        fname = System.IO.Path.Combine(Server.MapPath(path), Code + ".simg");
                        // fname = System.IO.Path.Combine(Server.MapPath("~/ImportFiles/Images/"), Code + ".simg");

                        filePath = uploadpath + "/" + System.IO.Path.GetFileName(Code + ".simg");
                        // filePath = fname;
                        file.SaveAs(fname);
                    }
                    // Returns message that successfully uploaded  
                    return Json(filePath);
                }
                catch (Exception ex)
                {
                    ErrorLog(ex);
                    return Json("Error occurred. Error details: " + ex.Message);
                }
            }
            else
            {
                return Json("No files selected.");
            }
        }


        //private void UploadFiles_Duplicate(string imgname, string filepathsource)
        //{
        //    if (imgname == "") return;

        //    ErrorLogString("file details source : " + imgname + " - " + filepathsource);
        //    String path = ConfigurationManager.AppSettings["salesServicePath"];

        //    string directoryPath = path.ToString();

        //    try
        //    {

        //        string sourcePath = filepathsource;
        //        string targetPath = path;

        //        // Use Path class to manipulate file and directory paths.
        //        string sourceFile = filepathsource;
        //        string destFile = System.IO.Path.Combine(targetPath, imgname);

        //        if (!Directory.Exists(directoryPath))
        //        {
        //            Directory.CreateDirectory(directoryPath);
        //        }

        //        ErrorLogString("sourceFile : " + sourceFile);
        //        ErrorLogString("destFile : " + destFile);

        //        // To copy a file to another location and
        //        // overwrite the destination file if it already exists.
        //        System.IO.File.Copy(sourceFile, destFile, true);


        //    }
        //    catch (Exception ex)
        //    {
        //        ErrorLogString("ex : " + ex.Message);
        //    }

        //}

        [HttpPost]
        public ActionResult SurveyUploadFiles(string imgname, string oldImageName)
        {
            string result = "1";
            string path = "";
            string path_with_filename = "";
            try
            {

                path = ConfigurationManager.AppSettings["SurveyUploadedImageLocation"];

                string directoryPath = Server.MapPath(path).ToString();
                if (!Directory.Exists(directoryPath))
                {
                    Directory.CreateDirectory(directoryPath);
                }



                if (Request.Files.Count != 0)
                {

                    for (int i = 0; i < Request.Files.Count; i++)
                    {
                        var file = Request.Files[i];

                        var fileName = Path.GetFileName(file.FileName);

                        path_with_filename = Path.Combine(Server.MapPath(path), fileName);
                        file.SaveAs(path_with_filename);

                        result = Path.Combine(path.Substring(1), fileName) + "|" + fileName;
                    }
                }
            }
            catch (Exception ex)
            {
                result = "-1";
            }
            return Json(result);
        }

        [HttpPost]
        public ActionResult deleteFiles(string imgname)
        {
            String path = ConfigurationManager.AppSettings["tempConfigFile"];
            String devicepath = "";
            try
            {
                devicepath = ConfigurationManager.AppSettings["deviceFile"];
            }
            catch (Exception)
            {

                // throw;
            }

            var delFileName = "";
            string[] imgnames = imgname.Split(',');
            for (int i =0; i<imgnames.Length;i++)
            {
               
                try
                {
                    delFileName = System.IO.Path.Combine(Server.MapPath(path), imgnames[i]);
                    if (System.IO.File.Exists(delFileName))
                        System.IO.File.Delete(delFileName);
                }
                catch (Exception)
                {

                   // throw;
                }
                try
                {
                    delFileName = System.IO.Path.Combine(Server.MapPath(devicepath), imgnames[i]);
                    if (System.IO.File.Exists(delFileName))
                        System.IO.File.Delete(delFileName);
                }
                catch (Exception)
                {

                    // throw;
                }
            }
            
            return Json(1);
        }

        [HttpPost]
        public ActionResult CheckFile(string imgName)
        {
            bool isExist = false;

            try
            {
                String path = ConfigurationManager.AppSettings["configFile"];
                var oldfname1 = System.IO.Path.Combine(Server.MapPath(path), imgName);
                //imgPath = imgPath.Replace("..", "~");
                //Console.WriteLine(imgPath);
                //var absolutePath = HttpContext.Server.MapPath(relativePath);
               // System.Diagnostics.Debug.WriteLine(imgPath);
                if (System.IO.File.Exists(oldfname1))
                    isExist = true;
            }
            catch (Exception)
            {

              //  throw;
            }

            return Json(isExist);
        }


            [HttpPost]
        public ActionResult UploadFiles(string imgname, string oldImageName, string imgPath,string screenName)
        {
            //if (Session["ProjectName"].ToString().ToLower() == "b2b")
            //{
            //    var ret = UploadFilesSaveDirectPath(imgname, oldImageName);
            //    //directoryPath = @"G:\SimplrB2B\JSONSimplrServiceB2B\Img";
            //    return Json(ret);
            //}
            

            imgname = ReplaceSpecialCharacter(imgname);

            //try
            //{
            //    if (Session["ProjectName"].ToString().ToLower() == "pvmb" && screenName == "MessageConfigNewForm")
            //    {
            //        imgname = imgname.Split('.')[0] + '_' + Session["UserName"] + '.' + imgname.Split('.')[1];
            //    }
            //}
            //catch { }

            ErrorLogString("UploadFiles : " + imgname + " - " + oldImageName);
            String path = ConfigurationManager.AppSettings["configFile"];
            
            String devicepath = "";

           

            try
            {
                devicepath = ConfigurationManager.AppSettings["deviceFile"];
            }
            catch (Exception)
            {

               // throw;
            }
            

            //imgPath = "http://simplrdb.southeastasia.cloudapp.azure.com/SimplrB2BSG/DeviceImages/Images/Banner/";
            if (imgPath != "" && imgPath != null && imgPath != "undefined")
            {
                var splitimgPath = imgPath.Split('/');
                var splitimgPathCnt = splitimgPath != null && splitimgPath.Count() >= 4 ? splitimgPath.Count() : 0;
                if (splitimgPathCnt > 0 && splitimgPath[splitimgPathCnt - 1] == "")
                    path = "~/" + splitimgPath[splitimgPathCnt - 4] + "/" + splitimgPath[splitimgPathCnt - 3] + "/" + splitimgPath[splitimgPathCnt - 2];
                else
                    path = "~/" + splitimgPath[splitimgPathCnt - 3] + "/" + splitimgPath[splitimgPathCnt - 2] + "/" + splitimgPath[splitimgPathCnt - 1];
            }

            string directoryPath = Server.MapPath(path).ToString();

            //string directoryPath = path;

            // string filePath = directoryPath;
            if (!Directory.Exists(directoryPath))
            {
                Directory.CreateDirectory(directoryPath);
            }

            if (imgname == "")
            {
                path = ConfigurationManager.AppSettings["tempConfigFile"];
                try
                {
                    if (Session["ProjectName"].ToString().ToLower() == "pvmng" && screenName == "PresentationForm")
                    {
                        path = ConfigurationManager.AppSettings["presentationFile"];
                    }
                }
                catch { }
            }

            ErrorLogString("path : " + path);


            //  string uploadpath = "../ImportFiles/images";
            string uploadpath = path.Replace("~", "..");
            var filePath = string.Empty;

            if (oldImageName != "")
            {
                //
                if (oldImageName.Split('/').Length > 1)
                {
                    string path1 = ConfigurationManager.AppSettings["tempConfigFile"];

                    try
                    {
                        if (Session["ProjectName"].ToString().ToLower() == "pvmng" && screenName == "PresentationForm")
                        {
                            path1 = ConfigurationManager.AppSettings["presentationFile"];
                        }
                    }
                    catch { }

                    String path2 = ConfigurationManager.AppSettings["configFile"];
                    oldImageName = oldImageName.Split('/')[oldImageName.Split('/').Length - 1];
                    var oldfname1 = System.IO.Path.Combine(Server.MapPath(path1), oldImageName);
                    var newfname1 = System.IO.Path.Combine(Server.MapPath(path2), oldImageName);

                    //string path1 = @"E:\Source\SimplrSales\VS-2015\SimplrSales\SimplrSales\ImportFiles\Images\TempItems\SalesPerson1.png";
                    //string path2 = @"E:\Source\SimplrSales\VS-2015\SimplrSales\SimplrSales\ImportFiles\Images\Items\SalesPerson1.png";

                    if (System.IO.File.Exists(path2))
                        System.IO.File.Delete(path2);

                    // Move the file.
                    System.IO.File.Move(path1, path2);
                }
                //


                var oldfname = System.IO.Path.Combine(Server.MapPath(path), oldImageName);
                var newfname = System.IO.Path.Combine(Server.MapPath(path), imgname);
                // filePath = uploadpath + "/" + System.IO.Path.GetFileName(imgname);
                filePath = imgname;
                ErrorLogString("filePath : " + filePath);

                if (imgname != oldImageName)
                {
                    ErrorLogString("System.IO.File.Exists(newfname) : " + newfname);

                    if (System.IO.File.Exists(newfname))
                    {
                        System.GC.Collect();
                        System.GC.WaitForPendingFinalizers();

                        System.IO.File.Delete(newfname);
                    }
                    ErrorLogString(" Delete End & System.IO.File.Move(oldfname, newfname) : " + oldfname + " , " + newfname);

                    FileInfo file = new FileInfo(oldfname);
                    if (file.Exists)
                    {
                        if (IsFileLocked(oldfname) == false)
                        {
                            System.IO.File.Move(oldfname, newfname);
                        }
                        else
                            filePath = oldImageName;
                    }

                }
                ErrorLogString("imgname != oldImageName : " + imgname + " != " + oldImageName);

                //System.IO.File.Move("D:\\myFile.txt", "D:\\myRenamedFile.txt");  
                ErrorLogString("FILE PATH RETURNED =>>> " + filePath);
                return Json(filePath);
            }

            // Checking no of files injected in Request object  
            if (Request.Files.Count > 0)
            {
                try
                {
                    string fname = "";
                    string fname1 = "";
                    //  Get all files from Request object  
                    HttpFileCollectionBase files = Request.Files;
                    for (int i = 0; i < files.Count; i++)
                    {
                        //string path = AppDomain.CurrentDomain.BaseDirectory + "Uploads/";  
                        //string filename = Path.GetFileName(Request.Files[i].FileName);  

                        HttpPostedFileBase file = files[i];
                        

                        // Checking for Internet Explorer  
                        if (Request.Browser.Browser.ToUpper() == "IE" || Request.Browser.Browser.ToUpper() == "INTERNETEXPLORER")
                        {
                            string[] testfiles = file.FileName.Split(new char[] { '\\' });
                            fname = testfiles[testfiles.Length - 1];
                        }
                        else
                        {
                            fname = file.FileName;

                            //try
                            //{
                            //    if (Session["ProjectName"].ToString().ToLower() == "pvmb" && screenName == "MessageConfigNewForm")
                            //    {
                            //        fname = fname.Split('.')[0] + '_' + Session["UserName"] + '.' + fname.Split('.')[1];
                            //        //fname = fname + '_' + Session["UserName"];
                            //    }
                            //}
                            //catch { }
                        }


                        // Get the complete folder path and store the file inside it.  
                        //fname = System.IO.Path.Combine(Server.MapPath("~/Uploads/"), fname);
                        //fname = System.IO.Path.Combine(Server.MapPath("~/ImportFiles/Images/"), fname.Split('.')[0] + ".simg");
                        if (imgname == "")
                        {
                            ErrorLogString("imgname == string.empty : " + fname);
                            try
                            {
                                fname1 = System.IO.Path.Combine(Server.MapPath(devicepath), fname);
                            }
                            catch (Exception)
                            {

                              //  throw;
                            }
                            fname = System.IO.Path.Combine(Server.MapPath(path), fname);
                            filePath = uploadpath + "/" + System.IO.Path.GetFileName(fname);

                            

                            // filePath = System.IO.Path.GetFileName(fname);
                            ErrorLogString("fname & filePath : " + fname + " & " + filePath);

                        }
                        else
                        {
                            ErrorLogString("fname & filePath : " + fname + " & " + filePath);

                            //fname = System.IO.Path.Combine(path, imgname);
                           //---------------------for PVM distributor claims---------------------------------------
                            //imgname = Regex.Replace(imgname, "[^a-zA-Z0-9_.]+", "", RegexOptions.Compiled);

                            fname = System.IO.Path.Combine(Server.MapPath(path), imgname);
                            // fname = System.IO.Path.Combine(Server.MapPath("~/ImportFiles/Images/"), Code + ".simg");
                            // filePath = uploadpath + "/" + System.IO.Path.GetFileName(imgname);
                            filePath = imgname;

                            fname1 = System.IO.Path.Combine(Server.MapPath(devicepath), imgname);
                            // fname = System.IO.Path.Combine(Server.MapPath("~/ImportFiles/Images/"), Code + ".simg");
                            // filePath = uploadpath + "/" + System.IO.Path.GetFileName(imgname);
                            //filePath = imgname;
                        }


                        ErrorLogString("System.IO.File.Exists(fname) Start : " + fname);

                        if (System.IO.File.Exists(fname))
                        {
                            System.GC.Collect();
                            System.GC.WaitForPendingFinalizers();
                            ErrorLogString("System.IO.File.SetAttributes(fname, FileAttributes.Normal); ");
                            System.IO.File.SetAttributes(fname, FileAttributes.Normal);
                            ErrorLogString("System.IO.File.Delete(fname); ");
                            System.IO.File.Delete(fname);
                            ErrorLogString("Deleted file fname" + fname);
                        }
                        ErrorLogString("System.IO.File.Exists(fname) End : " + fname);


                        file.SaveAs(fname);
                        try
                        {
                            if (System.IO.File.Exists(fname1))
                            {
                                System.GC.Collect();
                                System.GC.WaitForPendingFinalizers();
                               // ErrorLogString("System.IO.File.SetAttributes(fname, FileAttributes.Normal); ");
                                System.IO.File.SetAttributes(fname1, FileAttributes.Normal);
                                //ErrorLogString("System.IO.File.Delete(fname); ");
                                System.IO.File.Delete(fname1);
                                //ErrorLogString("Deleted file fname" + fname);
                            }
                            file.SaveAs(fname1);
                        }
                        catch(Exception exx)
                        {

                        }
                        ////UploadFiles_Duplicate(imgname, fname);
                        ErrorLogString("file.SaveAs(fname) : " + fname);

                    }
                    // Returns message that successfully uploaded  
                    ErrorLogString("FILE PATH RETURNED =>>> " + filePath);
                    return Json(filePath);
                    //return Json(fname);
                }
                catch (Exception ex)
                {
                    ErrorLogString("ex : " + ex.Message);

                    ErrorLog(ex);
                    ErrorLogString("FILE PATH RETURNED =>>> " + oldImageName);
                    return Json(oldImageName);
                    //return Json("Error occurred. Error details: " + ex.Message);
                }
            }
            else
            {
                ErrorLogString("FILE PATH RETURNED =>>> " + "No files selected.");
                return Json("No files selected.");
            }
        }

        public string UploadFilesSaveDirectPath(string imgname, string oldImageName)
        {
            imgname = ReplaceSpecialCharacter(imgname);
            String path = ConfigurationManager.AppSettings["directFilePath"];
            string directoryPath = path;
            //directoryPath = @"G:\SimplrB2B\JSONSimplrServiceB2B\Img";

            if (!Directory.Exists(directoryPath))
            {
                Directory.CreateDirectory(directoryPath);
            }
            //if (imgname == "")
            //{
            //    path = ConfigurationManager.AppSettings["tempConfigFile"];
            //}
            ErrorLogString("path : " + path);

            //  string uploadpath = "../ImportFiles/images";
            string uploadpath = path.Replace("~", "..");
            var filePath = string.Empty;

            if (oldImageName != "")
            {
                //
                //if (oldImageName.Split('/').Length > 1)
                //{
                //    string path1 = ConfigurationManager.AppSettings["tempConfigFile"];
                //    String path2 = ConfigurationManager.AppSettings["configFile"];
                //    oldImageName = oldImageName.Split('/')[oldImageName.Split('/').Length - 1];
                //    var oldfname1 = System.IO.Path.Combine(Server.MapPath(path1), oldImageName);
                //    var newfname1 = System.IO.Path.Combine(Server.MapPath(path2), oldImageName);

                //    //string path1 = @"E:\Source\SimplrSales\VS-2015\SimplrSales\SimplrSales\ImportFiles\Images\TempItems\SalesPerson1.png";
                //    //string path2 = @"E:\Source\SimplrSales\VS-2015\SimplrSales\SimplrSales\ImportFiles\Images\Items\SalesPerson1.png";

                //    if (System.IO.File.Exists(path2))
                //        System.IO.File.Delete(path2);

                //    // Move the file.
                //    System.IO.File.Move(path1, path2);
                //}
                //


                var oldfname = System.IO.Path.Combine(path, oldImageName);
                var newfname = System.IO.Path.Combine(path, imgname);
                // filePath = uploadpath + "/" + System.IO.Path.GetFileName(imgname);
                filePath = imgname;
                ErrorLogString("filePath : " + filePath);

                if (imgname != oldImageName)
                {
                    ErrorLogString("System.IO.File.Exists(newfname) : " + newfname);

                    if (System.IO.File.Exists(newfname))
                    {
                        System.GC.Collect();
                        System.GC.WaitForPendingFinalizers();

                        System.IO.File.Delete(newfname);
                    }
                    ErrorLogString(" Delete End & System.IO.File.Move(oldfname, newfname) : " + oldfname + " , " + newfname);

                    FileInfo file = new FileInfo(oldfname);
                    if (file.Exists)
                    {
                        if (IsFileLocked(oldfname) == false)
                        {
                            System.IO.File.Move(oldfname, newfname);
                        }
                        else
                            filePath = oldImageName;
                    }

                }
                ErrorLogString("imgname != oldImageName : " + imgname + " != " + oldImageName);

                //System.IO.File.Move("D:\\myFile.txt", "D:\\myRenamedFile.txt");  
                ErrorLogString("FILE PATH RETURNED =>>> " + filePath);
                return filePath;
            }

            // Checking no of files injected in Request object  
            if (Request.Files.Count > 0)
            {
                try
                {
                    //  Get all files from Request object  
                    HttpFileCollectionBase files = Request.Files;
                    for (int i = 0; i < files.Count; i++)
                    {
                        //string path = AppDomain.CurrentDomain.BaseDirectory + "Uploads/";  
                        //string filename = Path.GetFileName(Request.Files[i].FileName);  

                        HttpPostedFileBase file = files[i];
                        string fname;

                        // Checking for Internet Explorer  
                        if (Request.Browser.Browser.ToUpper() == "IE" || Request.Browser.Browser.ToUpper() == "INTERNETEXPLORER")
                        {
                            string[] testfiles = file.FileName.Split(new char[] { '\\' });
                            fname = testfiles[testfiles.Length - 1];
                        }
                        else
                        {
                            fname = file.FileName;
                        }

                        //if (imgname == "")
                        //{
                        ErrorLogString("imgname == string.empty : " + fname);
                        fname = System.IO.Path.Combine(path, fname);
                        filePath = uploadpath + "/" + System.IO.Path.GetFileName(fname);
                        ErrorLogString("fname & filePath : " + fname + " & " + filePath);

                        //}
                        //else
                        //{
                        //    ErrorLogString("fname & filePath : " + fname + " & " + filePath);
                        //    fname = System.IO.Path.Combine(path, imgname);
                        //    filePath = imgname;
                        //}


                        ErrorLogString("System.IO.File.Exists(fname) Start : " + fname);

                        if (System.IO.File.Exists(fname))
                        {
                            System.GC.Collect();
                            System.GC.WaitForPendingFinalizers();
                            ErrorLogString("System.IO.File.SetAttributes(fname, FileAttributes.Normal); ");
                            System.IO.File.SetAttributes(fname, FileAttributes.Normal);
                            ErrorLogString("System.IO.File.Delete(fname); ");
                            System.IO.File.Delete(fname);
                            ErrorLogString("Deleted file fname" + fname);
                        }
                        ErrorLogString("System.IO.File.Exists(fname) End : " + fname);
                        file.SaveAs(fname);
                        ErrorLogString("file.SaveAs(fname) : " + fname);

                    }
                    // Returns message that successfully uploaded  
                    ErrorLogString("FILE PATH RETURNED =>>> " + filePath);
                    return filePath;
                }
                catch (Exception ex)
                {
                    ErrorLogString("ex : " + ex.Message);
                    return oldImageName;
                }
            }
            else
            {
                ErrorLogString("FILE PATH RETURNED =>>> " + "No files selected.");
                return "No files selected.";
            }
        }
        private bool IsFileLocked(string filename)
        {
            FileInfo file = new FileInfo(filename);
            FileStream stream = null;

            try
            {
                stream = file.Open(FileMode.Open, FileAccess.ReadWrite, FileShare.None);
            }
            catch (IOException ex)
            {
                return true;
            }
            finally
            {
                if (stream != null)
                    stream.Close();
            }
            //file is not locked
            return false;
        }


        public ActionResult RemoveMultiPhoto(string imgname)
        {
            try
            {
                String path = ConfigurationManager.AppSettings["configFile"];
                var deleteImg = System.IO.Path.Combine(Server.MapPath(path), imgname);
                if (System.IO.File.Exists(deleteImg))
                {
                    System.GC.Collect();
                    System.GC.WaitForPendingFinalizers();
                    System.IO.File.Delete(deleteImg);
                }
                return Json(true);
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                return Json(false);
            }
        }
        public ActionResult RemovePhoto(string imgname)
        {
            try
            {
                String path = ConfigurationManager.AppSettings["configFile"];
                String tempPath = ConfigurationManager.AppSettings["tempConfigFile"];
                var deleteImg = System.IO.Path.Combine(Server.MapPath(path), imgname);
                if (System.IO.File.Exists(deleteImg))
                {
                    System.GC.Collect();
                    System.GC.WaitForPendingFinalizers();
                    System.IO.File.Delete(deleteImg);
                }
                deleteImg = System.IO.Path.Combine(Server.MapPath(tempPath), imgname);
                if (System.IO.File.Exists(deleteImg))
                {
                    System.GC.Collect();
                    System.GC.WaitForPendingFinalizers();
                    System.IO.File.Delete(deleteImg);
                }
                return Json(true);
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                return Json(false);
            }
        }

        public ActionResult DownloadBlobe()
        {
            try
            {
                // string filePath = ConfigurationManager.AppSettings.Get("downloadirectory").ToString();
                string folderName = ConfigurationManager.AppSettings["downloadirectory"];
                CloudStorageAccount storageAccount = CloudStorageAccount.Parse(ConfigurationManager.AppSettings.Get("BlobeCon").ToString());
                CloudBlobContainer blobContainer = storageAccount.CreateCloudBlobClient().GetContainerReference(ConfigurationManager.AppSettings.Get("BlobeContainer").ToString());


                var blobs = blobContainer.ListBlobs(null, true, BlobListingDetails.All).Cast<CloudBlockBlob>();
                //  var excelApp = new Excel1.Application();
                string directoryPath = Server.MapPath(folderName).ToString();
                string filePath = directoryPath;
                if (!Directory.Exists(directoryPath))
                {
                    Directory.CreateDirectory(directoryPath);
                }
                var blobsCount = 0;
                foreach (var blockBlob in blobs)
                {
                    blobsCount++;
                    // if (blockBlob.Name.Contains(tblname))
                    //{
                    try
                    {
                        string filePat = filePath + blockBlob.Name;
                        blockBlob.DownloadToFile(filePat, FileMode.OpenOrCreate, null);
                    }
                    catch (Exception ex)
                    {
                        ViewBag.Message = ex.Message;
                        return Json(ex.Message, JsonRequestBehavior.AllowGet);
                        // return View(db.ImportConfigTemps.GroupBy(i => i.TableName).Select(group => group.FirstOrDefault()));
                    }
                    //  }
                }
                string blobeDownload = ConfigurationManager.AppSettings.Get("BlobeDownload").ToString();
                //string blobeExport = ConfigurationManager.AppSettings.Get("BlobeExport").ToString();
                //string blobeError = ConfigurationManager.AppSettings.Get("BlobeError").ToString();

                string blobeExportPath = ConfigurationManager.AppSettings["BlobeExport"];
                string blobeErrorPath = ConfigurationManager.AppSettings["BlobeError"];

                string blobeExport = Server.MapPath(blobeExportPath).ToString();
                string blobeError = Server.MapPath(blobeErrorPath).ToString();

                connection();
                IMEXUL.IMEXPOSAUTOCLS objPosAutoCLS = new IMEXUL.IMEXPOSAUTOCLS();
                objPosAutoCLS.Path = blobeDownload;
                objPosAutoCLS.ErrPath = blobeError;
                objPosAutoCLS.sFolderArch = blobeExport;
                objPosAutoCLS.CS = constr;
                objPosAutoCLS.ImExObjPOS.ErrPath = blobeError;
                var result = objPosAutoCLS.ExecutePOS();
                List<string> myList = objPosAutoCLS.myList;
                List<string> myListErrorLog = objPosAutoCLS.myListErrorLog;
                List<string> myListStatus = objPosAutoCLS.myListStatus;

                var retStatus = string.Empty;
                var returnStatus = string.Empty;

                for (int x = 0; x < myList.Count(); x++)
                {
                    retStatus = myListStatus[x];
                    if (retStatus == "Completed")
                    {
                        returnStatus = returnStatus + blobeExportPath.Replace("~", "..") + myList[x].ToString() + " $ " + retStatus + " & ";
                    }
                    else if (retStatus == "Not Completed")
                    {
                        returnStatus = returnStatus + blobeErrorPath.Replace("~", "..") + myListErrorLog[x].ToString() + " $ " + retStatus + " & ";
                    }
                }

                ///

                //Create Reference to Azure Blob
                CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
                //The next 2 lines create if not exists a container named "democontainer"
                CloudBlobContainer container = blobClient.GetContainerReference(ConfigurationManager.AppSettings.Get("BlobeContainerError").ToString());
                container.CreateIfNotExists();
                ///
                CloudBlobContainer containersuccess = blobClient.GetContainerReference(ConfigurationManager.AppSettings.Get("BlobeContainerSuccess").ToString());
                containersuccess.CreateIfNotExists();
                ///

                var blobeErrorUploadPath = string.Empty;
                for (int z = 0; z < myListErrorLog.Count(); z++)
                {
                    CloudBlockBlob blockBlob = container.GetBlockBlobReference(myListErrorLog[z]);
                    blobeErrorUploadPath = blobeError + myListErrorLog[z];
                    //blockBlob.UploadFromFileAsync(blobeErrorUploadPath);
                    blockBlob.UploadFromFile(blobeErrorUploadPath);
                }

                var filename = string.Empty;
                foreach (var blockBlob in blobs)
                {
                    for (int i = 0; i < myList.Count(); i++)
                    {
                        filename = myList[i].ToString();
                        if (blockBlob.Name == filename)
                        {
                            blockBlob.DeleteIfExists();
                        }
                    }
                }


                if (result != "")
                {
                    var blobReturn = result.Split(',');
                    var blobeSuccessUploadPath = string.Empty;
                    for (int z = 0; z < blobReturn.Count(); z++)
                    {
                        CloudBlockBlob blockBlob = containersuccess.GetBlockBlobReference(blobReturn[z]);
                        blobeSuccessUploadPath = blobeExport + blobReturn[z];
                        blockBlob.UploadFromFileAsync(blobeSuccessUploadPath);
                    }

                    //foreach (var blockBlob in blobs)
                    //{
                    //    for (int i = 0; i < blobReturn.Count(); i++)
                    //    {
                    //        filename = blobReturn[i].ToString();
                    //        if (blockBlob.Name == filename)
                    //        {
                    //            blockBlob.DeleteIfExists();
                    //        }
                    //    }
                    //}
                    if (blobsCount > blobReturn.Count())
                        return Json("Downloaded files from Blob : " + blobsCount + " , Uploaded files : " + blobReturn.Count() + ". Please check the log files #" + returnStatus + "", JsonRequestBehavior.AllowGet);
                    else
                        return Json("Completed! #" + returnStatus + "", JsonRequestBehavior.AllowGet);

                    //string exeFolderPath = ConfigurationManager.AppSettings.Get("ExeFolderPath").ToString();
                    //Process process = new Process();
                    //// Configure the process using the StartInfo properties.
                    //// process.StartInfo.FileName = @"C:\Simplr_Unilever\Debug UAT\IMEXUL.exe";
                    //process.StartInfo.FileName = exeFolderPath;
                    //process.StartInfo.Arguments = "-n";
                    //process.StartInfo.WindowStyle = ProcessWindowStyle.Maximized;
                    //process.Start();
                    //process.WaitForExit();

                    //return Json("Completed!", JsonRequestBehavior.AllowGet);
                }
                else
                    return Json("Downloaded files from Blob : " + blobsCount + " , Uploaded files : 0. Please check the log files #" + returnStatus + "", JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public ActionResult GetBase64Image(string path1, string screenname)
        {
            try
            {
                var projectName = ConfigurationManager.AppSettings["ProjectName"].ToString().ToUpper();
                String defaultpath = ConfigurationManager.AppSettings["DeviceBase64Image"];
                //string path = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Images")
                //     + "\\" + "Tiger.jpg";
                //  string path = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "ImportFiles\\Images") + "\\" + path1.Split('/')[3];
               
                if((projectName == "FGV" || projectName == "EBFF") && screenname.ToLower() == "newcustomerform")
                    defaultpath = ConfigurationManager.AppSettings["ServiceFile"];

                string path = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, defaultpath) + "\\" + path1.Split('/')[path1.Split('/').Count() - 1];
                FileStream fileStream = new FileStream(path, FileMode.Open, FileAccess.Read);
                byte[] data = new byte[(int)fileStream.Length];
                fileStream.Read(data, 0, data.Length);
                return Json(new { base64imgage = Convert.ToBase64String(data) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                return Json(string.Empty, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult TestUpload(FormCollection formCollection)
        {
            if (Request != null)
            {
                HttpPostedFileBase file = Request.Files["UploadedFile"];
                if ((file != null))//&& (file.ContentLength & gt; 0) && !string.IsNullOrEmpty(file.FileName))   
                {
                    string fileName = file.FileName;
                    string fileContentType = file.ContentType;
                    byte[] fileBytes = new byte[file.ContentLength];
                    var data = file.InputStream.Read(fileBytes, 0, Convert.ToInt32(file.ContentLength));
                    var usersList = new List<HeatDetails>();
                    using (var package = new ExcelPackage(file.InputStream))
                    {
                        var currentSheet = package.Workbook.Worksheets;
                        var workSheet = currentSheet.First();
                        var noOfCol = workSheet.Dimension.End.Column;
                        var noOfRow = workSheet.Dimension.End.Row;
                        for (int rowIterator = 2; rowIterator <= noOfRow; rowIterator++)
                        {
                            var user = new HeatDetails();
                            user.HeatNo = workSheet.Cells[rowIterator, 1].Value.ToString();
                            //user.LastName = workSheet.Cells[rowIterator, 2].Value.ToString();
                            usersList.Add(user);
                        }
                    }
                }
            }
            return View("TestUpload");
        }

        [HttpPost]
        public ActionResult ImportFromExcelToList(HttpPostedFileBase file)
        {
            var heatDetailsList = new List<HeatDetails>();
            var heatDetails = new HeatDetails();

            try
            {
                if ((file != null))
                {
                    string fileName = file.FileName;
                    string fileType = fileName.Split('.')[fileName.Split('.').Count() - 1];

                    List<string> listA = new List<string>();
                    List<string> listB = new List<string>();

                    if (fileType == "csv")
                    {
                        using (var reader = new StreamReader(fileName))
                        {
                            var line = reader.ReadLine();
                            var values = line.Split(',');
                            if (values[0] == "Serial (Manufacturer SN/Asset No./SIM No.)")//&& values[1] == "Serial (Device SN/IMSI)")
                            {
                                while (!reader.EndOfStream)
                                {
                                    line = reader.ReadLine();
                                    values = line.Split(',');
                                    //if (values[0] != null && values[0] != "")
                                    //{
                                    heatDetails = new HeatDetails();
                                    heatDetails.HeatNo = values[0] == null ? "" : values[0].ToString().Replace("'", "").Replace("\"", "");
                                    if (values[1] == "Serial (Device SN/IMSI)")
                                        heatDetails.Column2 = values[1] == null ? "" : values[1].ToString().Replace("'", "").Replace("\"", "");
                                    else
                                        heatDetails.Column2 = "";

                                    // heatDetails.IsExists = "0";
                                    if (heatDetails.HeatNo != "" || heatDetails.Column2 != "")
                                        heatDetailsList.Add(heatDetails);
                                    // }

                                }
                            }
                        }
                    }
                    else if (fileType == "xlsx" || fileType == "xls")
                    {
                        string fileContentType = file.ContentType;
                        byte[] fileBytes = new byte[file.ContentLength];
                        var data = file.InputStream.Read(fileBytes, 0, Convert.ToInt32(file.ContentLength));
                        using (var package = new ExcelPackage(file.InputStream))
                        {
                            var currentSheet = package.Workbook.Worksheets;
                            var workSheet = currentSheet.First();
                            var noOfCol = workSheet.Dimension.End.Column;
                            var noOfRow = workSheet.Dimension.End.Row;
                            //if (workSheet.Cells[1, 1].Value.ToString().ToLower().IndexOf("heat") >= 0 || workSheet.Cells[1, 2].Value.ToString().ToLower().IndexOf("serial") >= 0)
                            //if (workSheet.Cells[1, 1].Value.ToString().ToLower().IndexOf("device serial no") >= 0)
                            //if (workSheet.Cells[1, 1].Value.ToString().ToLower() == "manufacturing s/n")//"device serial no")//Serial (Device SN/Asset No./SIM No.)
                            //update by.M 01.9.2021
                            //if (workSheet.Cells[1, 1].Value.ToString() == "Serial (Manufacturer SN/Asset No./SIM No.)")//&& workSheet.Cells[1, 2].Value.ToString() == "Serial (Device SN/IMSI)")
                            //update by.M 08.9.2021
                            //if (workSheet.Cells[1, 1].Value.ToString() == "Serial (Device SN/IMSI)")
                            //update by.M 11.10.2021
                            if (workSheet.Cells[1, 1].Value.ToString() == "Serial (Manufacturer SN/Asset No./SIM No.)")
                            {
                                for (int rowIterator = 2; rowIterator <= noOfRow; rowIterator++)
                                {
                                    //if (workSheet.Cells[rowIterator, 1].Value != null )
                                    //{
                                    heatDetails = new HeatDetails();
                                    //workSheet.Cells[rowIterator, 1].Value.ToString().Replace("\"","")
                                    heatDetails.HeatNo = workSheet.Cells[rowIterator, 1].Value == null ? "" : workSheet.Cells[rowIterator, 1].Value.ToString().Replace("'", "").Replace("\"", "");
                                    // if (workSheet.Cells[1, 2].Value.ToString() == "Serial (Manufacturer SN/Asset No./SIM No.)")//"Serial (Device SN/IMSI)")-update by.M 08.9.2021
                                    if (workSheet.Cells[1, 2].Value.ToString() == "Serial (Device SN/IMSI)") //-update by.M 11.10.2021
                                        heatDetails.Column2 = workSheet.Cells[rowIterator, 2].Value == null ? "" : workSheet.Cells[rowIterator, 2].Value.ToString().Replace("'", "").Replace("\"", "");
                                    else
                                        heatDetails.Column2 = "";
                                    // heatDetails.IsExists = "0";
                                    if (heatDetails.HeatNo != "" || heatDetails.Column2 != "")
                                        heatDetailsList.Add(heatDetails);
                                    // }
                                }
                            }
                        }
                    }

                }
            }
            catch (Exception ex)
            {
                ImportLog("Step:3 :Exception =" + ex.Message);
                ErrorLog(ex);
            }
            return Json(heatDetailsList, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult ImportFromExcelToListDancom(HttpPostedFileBase file)
        {
            var heatDetailsList = new List<HeatDetails>();
            var heatDetails = new HeatDetails();

            //var colName = "";
            //var colValue = "";
            try
            {
                if ((file != null))
                {
                    string fileName = file.FileName;
                    string fileType = fileName.Split('.')[fileName.Split('.').Count() - 1];

                    List<string> listA = new List<string>();
                    List<string> listB = new List<string>();

                    if (fileType == "csv")
                    {
                        using (var reader = new StreamReader(fileName))
                        {
                            var line = reader.ReadLine();
                            var values = line.Split(',');
                            if (values[0] == "IMEI 1")//&& values[1] == "Serial (Device SN/IMSI)")
                            {
                                while (!reader.EndOfStream)
                                {
                                    line = reader.ReadLine();
                                    values = line.Split(',');

                                    heatDetails = new HeatDetails();
                                    heatDetails.IMEI1 = values[0] == null ? "" : values[0].ToString().Replace("'", "").Replace("\"", "");
                                    if (values[1] == "IMEI 2")
                                        heatDetails.IMEI2 = values[1] == null ? "" : values[1].ToString().Replace("'", "").Replace("\"", "");
                                    else
                                        heatDetails.IMEI2 = "";
                                    if (values[2] == "Serial No")
                                        heatDetails.SerialNo = values[2] == null ? "" : values[2].ToString().Replace("'", "").Replace("\"", "");
                                    else
                                        heatDetails.SerialNo = "";

                                    //if (heatDetails.HeatNo != "" || heatDetails.Column2 != "")
                                    heatDetailsList.Add(heatDetails);

                                }
                            }
                        }
                    }
                    else if (fileType == "xlsx" || fileType == "xls")
                    {
                        // IMEI 1  IMEI 2  Serial No

                        string fileContentType = file.ContentType;
                        byte[] fileBytes = new byte[file.ContentLength];
                        var data = file.InputStream.Read(fileBytes, 0, Convert.ToInt32(file.ContentLength));
                        using (var package = new ExcelPackage(file.InputStream))
                        {
                            var currentSheet = package.Workbook.Worksheets;
                            var workSheet = currentSheet.First();
                            var noOfCol = workSheet.Dimension.End.Column;
                            var noOfRow = workSheet.Dimension.End.Row;

                            //if (workSheet.Cells[1, 1].Value.ToString() == "IMEI 1")
                            //{
                            for (int rowIterator = 2; rowIterator <= noOfRow; rowIterator++)
                            {

                                //for (int col = 1; col <= noOfCol; col++)
                                //{
                                //    colName = workSheet.Cells[1, col].Value.ToString().Replace(" ", "");
                                //    colValue = workSheet.Cells[rowIterator, col].Value == null ? "" : workSheet.Cells[rowIterator, col].Value.ToString().Replace("'", "").Replace("\"", "");
                                //}

                                heatDetails = new HeatDetails();
                                heatDetails.SerialNo = workSheet.Cells[rowIterator, 1].Value == null ? "" : workSheet.Cells[rowIterator, 1].Value.ToString().Replace("'", "").Replace("\"", "");
                                // if (workSheet.Cells[1, 2].Value.ToString() == "IMEI 2")
                                heatDetails.IMEI1 = workSheet.Cells[rowIterator, 2].Value == null ? "" : workSheet.Cells[rowIterator, 2].Value.ToString().Replace("'", "").Replace("\"", "");
                                //else
                                //    heatDetails.IMEI2 = "";

                                //  if (workSheet.Cells[1, 3].Value.ToString() == "Serial No")
                                heatDetails.IMEI2 = workSheet.Cells[rowIterator, 3].Value == null ? "" : workSheet.Cells[rowIterator, 3].Value.ToString().Replace("'", "").Replace("\"", "");
                                //else
                                //    heatDetails.SerialNo = "";
                                //if (heatDetails.IMEI1 != "" && heatDetails.IMEI2 != "" && heatDetails.SerialNo != "")
                                heatDetailsList.Add(heatDetails);
                            }
                            //}
                        }
                    }

                }
            }
            catch (Exception ex)
            {
                ImportLog("Step:3 :Exception =" + ex.Message);
                ErrorLog(ex);
            }
            return Json(heatDetailsList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult MDFImportListDancom(HttpPostedFileBase file)
        {
            //var heatDetailsList = new List<HeatDetails>();
            //var heatDetails = new HeatDetails();

            List<int> numberNames = new List<int>();
            numberNames.Add(10);
            numberNames.Add(18);
            numberNames.Add(35);
            numberNames.Add(35);
            numberNames.Add(35);
            numberNames.Add(40);
            numberNames.Add(15);
            numberNames.Add(11);
            numberNames.Add(15);
            numberNames.Add(10);
            numberNames.Add(9);
            numberNames.Add(10);
            numberNames.Add(15);
            numberNames.Add(15);
            numberNames.Add(15);
            numberNames.Add(15);
            numberNames.Add(18);
            numberNames.Add(20);
            numberNames.Add(40);
            List<string> original_name = new List<string>();
            //get_filepath();

            string importFileFolder = ConfigurationManager.AppSettings["ImportFiles"];
            string importFileFolderCSV = ConfigurationManager.AppSettings["ImportFilesCSV"];

            string FileName = Path.GetFileName(file.FileName);

            string fileLocation = Server.MapPath(importFileFolder) + FileName;
            Request.Files["file"].SaveAs(fileLocation);

            //string file2 = Server.MapPath(Url.Content(filepath2));
            //string file2 = Server.MapPath(Server.MapPath(importFileFolder));
            //string file2 = filepath;
            string fileLocation1 = Server.MapPath(importFileFolderCSV) + "MDF.csv";
            //string fileLocation1 = Server.MapPath(importFileFolderCSV) + "MDF_"+ DateTime.Now.ToString("yyyyMMdd_HHmmss")+ ".csv";
            //string fileLocation1 = "C:\\Users\\Comgen01\\Desktop\\ShortCuts\\MDF.csv";
            if (System.IO.File.Exists(fileLocation1)) System.IO.File.WriteAllText(fileLocation1, "");
            //MemoryStream NewMS = new MemoryStream ();
            //StreamWriter writer = new StreamWriter(NewMS);

            List<string> cloumn = new List<string>();
            if (System.IO.File.Exists(fileLocation))
            {
               
            using (StreamReader read = new StreamReader(fileLocation))
                {
                    string line;
                    while ((line = read.ReadLine()) != null)
                    {
                        int val = 0;
                        string extractedValue = "";
                        string extractedValue1 = "";
                        for (int i = 0; i < numberNames.Count; i++)
                        {
                            int va1l = Convert.ToInt32(numberNames[i]);
                            if (i == 0)
                            {
                                int row_lenth = Convert.ToInt32(line.Length);
                                extractedValue = line.Substring(0, va1l).ToString();
                                val += va1l;
                            }
                            else if (i == numberNames.Count - 1)
                            {
                                int row_lenth = Convert.ToInt32(line.Length);
                                extractedValue = line.Substring(val).ToString();
                            }
                            else
                            {
                                int row_lenth = Convert.ToInt32(line.Length);
                                extractedValue = line.Substring(val, va1l).ToString();
                                val += va1l;
                            }
                            if (Regex.IsMatch(extractedValue.Trim(), @"^\d+$") == true && extractedValue.Trim().Length > 9)
                            {
                                //if (i == 16)
                                //    extractedValue = "''" + "745883702015";
                                //else
                                    extractedValue = "''" + extractedValue.Trim();
                            }
                                        extractedValue1 += Regex.Replace(extractedValue.Trim(), @"\t|\n|\r", "") + ",".ToString();
                        }
                        extractedValue1 = extractedValue1.TrimStart(',').ToString();
                        extractedValue1 = extractedValue1.TrimEnd(',').ToString();
                        original_name.Add(extractedValue1);

                        using (System.IO.StreamWriter writer = new System.IO.StreamWriter(fileLocation1,true))
                            {
                                writer.Write(string.Join(" ", extractedValue1.ToString(), Environment.NewLine));
                            }
  
                    }

                    //using (StreamWriter writer = new StreamWriter(fileLocation1, true))
                    //{
                    //    foreach (string data in original_name)
                    //    {
                    //        writer.WriteLine(data);
                    //    }


                    //}
                }
            }
            //catch (Exception ex)
            //{
            //    ImportLog("Step:3 :Exception =" + ex.Message);
            //    ErrorLog(ex);
            //}
           return Json(numberNames, JsonRequestBehavior.AllowGet);
        }

    }


    public class HeatDetails
    {
        public string HeatNo { get; set; }
        public string Column2 { get; set; }
        public string SerialNo { get; set; }
        public string IsExists { get; set; }
        public string IMEI1 { get; set; }
        public string IMEI2 { get; set; }

    }



}
