using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SimplrSales.Controllers
{
    public class BusinessRule : Controller
    {
        public BusinessRule()
        {

        }
        public CommonRule _commonRule = new CommonRule();
        //public static string _solutionName= "UL";
        public bool _isMFALogIn = false;

        public static string _LogInType = string.Empty;
        public static string _userId = string.Empty;
        public static dynamic SystemConfig = string.Empty;
        public static dynamic systemTableConfig = string.Empty;
        public static dynamic Params = new System.Dynamic.ExpandoObject();
        public static string _solutionName = System.Configuration.ConfigurationManager.AppSettings["SolutionName"];
        public static string _isLogFile = System.Configuration.ConfigurationManager.AppSettings["IsLogFile"];
        // public static HttpRequestBase baseRequest = ((HttpContextWrapper)Request.Properties["MS_HttpContext"]).Request as HttpRequestBase;
        public static string dir = System.Web.HttpContext.Current.Server.MapPath("~/ViewErrorLogFiles");


        public static void ErrorLog(Exception ex)
        {
            try
            {

                //if (_isLogFile == "False")
                //    return;
                if (!Directory.Exists(dir))  // if it doesn't exist, create
                    Directory.CreateDirectory(dir);

                // var    WebBrowserName = HttpContext.Current.Request.Browser.Browser;
                //   Request.ServerVariables["HTTP_USER_AGENT"];
                // HttpRequestBase baseRequest = ((HttpContextWrapper)Request.Properties["MS_HttpContext"]).Request as HttpRequestBase;

                string message = string.Format("Time: {0}", DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss tt"));
                message += Environment.NewLine;
                message += "-----------------------------------------------------------";
                message += Environment.NewLine;
                message += string.Format("Message: {0}", ex.Message);
                message += Environment.NewLine;
                message += string.Format("StackTrace: {0}", ex.StackTrace);
                message += Environment.NewLine;
                message += string.Format("Source: {0}", ex.Source);
                message += Environment.NewLine;
                message += string.Format("TargetSite: {0}", ex.TargetSite.ToString());
                message += Environment.NewLine;
                message += "-----------------------------------------------------------";
                message += Environment.NewLine;
                //string path = System.Web.HttpContext.Current.Server.MapPath("~/ViewErrorLogFiles/ErrorLog.txt");

                // COMMENTED 21.04.2021 =================
                string dteinfo = DateTime.Now.ToString("dd/MM/yyyy").Replace("/", "_");
                //string strUserId = 
                //    HttpContext.Current.Session["UserName"].ToString().Replace("/", "_").Replace("&", "_");
                string path = System.Web.HttpContext.Current.Server.MapPath("~/ViewErrorLogFiles/ErrorLog_" + dteinfo + ".txt");

                using (StreamWriter writer = new StreamWriter(path, true))
                {
                    writer.WriteLine(message);
                    writer.Close();
                }

            }
            catch (Exception)
            {

                ;
            }
        }

        // 07.10.2020 - FOR IMMEDIATE LOGOUT PURPOSE ===================================================================




        public static void ErrorLog_whenMenuClick_strMessage(string strmessage)
        {
            try
            {
                if (_isLogFile == "False")
                    return;
                if (!Directory.Exists(dir))  // if it doesn't exist, create
                    Directory.CreateDirectory(dir);

                // var    WebBrowserName = HttpContext.Current.Request.Browser.Browser;
                //   Request.ServerVariables["HTTP_USER_AGENT"];
                // HttpRequestBase baseRequest = ((HttpContextWrapper)Request.Properties["MS_HttpContext"]).Request as HttpRequestBase;

                string message = string.Format("Time: {0}", DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss tt"));
                message += Environment.NewLine;
                message += "-----------------------------------------------------------";
                message += Environment.NewLine;
                message += string.Format("Message: {0}", "====== INFORMATION WHILE MENU CLICK ======");
                message += Environment.NewLine;
                message += string.Format("Message: {0}", strmessage);
                message += Environment.NewLine;
                message += "-----------------------------------------------------------";
                message += Environment.NewLine;
                string path = System.Web.HttpContext.Current.Server.MapPath("~/ViewErrorLogFiles/ErrorLog_MNUCLICK.txt");

                using (StreamWriter writer = new StreamWriter(path, true))
                {
                    writer.WriteLine(message);
                    writer.Close();
                }
            }
            catch (Exception e)
            {
            }
        }

        public static void ErrorLog_whenMenuClick(Exception ex)
        {
            try
            {
                if (!Directory.Exists(dir))  // if it doesn't exist, create
                    Directory.CreateDirectory(dir);

                // var    WebBrowserName = HttpContext.Current.Request.Browser.Browser;
                //   Request.ServerVariables["HTTP_USER_AGENT"];
                // HttpRequestBase baseRequest = ((HttpContextWrapper)Request.Properties["MS_HttpContext"]).Request as HttpRequestBase;

                string message = string.Format("Time: {0}", DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss tt"));
                message += Environment.NewLine;
                message += "-----------------------------------------------------------";
                message += Environment.NewLine;
                message += string.Format("Message: {0}", "====== ERROR WHILE MENU CLICK ======");
                message += Environment.NewLine;
                message += string.Format("Message: {0}", ex.Message);
                message += Environment.NewLine;
                message += string.Format("StackTrace: {0}", ex.StackTrace);
                message += Environment.NewLine;
                message += string.Format("Source: {0}", ex.Source);
                message += Environment.NewLine;
                message += string.Format("TargetSite: {0}", ex.TargetSite.ToString());
                message += Environment.NewLine;
                message += "-----------------------------------------------------------";
                message += Environment.NewLine;
                string path = System.Web.HttpContext.Current.Server.MapPath("~/ViewErrorLogFiles/ErrorLog_MNUCLICK.txt");

                using (StreamWriter writer = new StreamWriter(path, true))
                {
                    writer.WriteLine(message);
                    writer.Close();
                }
            }
            catch (Exception e)
            {

            }
        }

        // 07.10.2020 - FOR IMMEDIATE LOGOUT PURPOSE ===================================================================

        public static void ErrorLogString1(string error)
        {
            try
            {

                if (_isLogFile == "False")
                    return;
                if (!Directory.Exists(dir))  // if it doesn't exist, create
                    Directory.CreateDirectory(dir);
                string message = string.Format("Time: {0}", DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss tt"));
                message += Environment.NewLine;
                message += "-----------------------------------------------------------";
                message += Environment.NewLine;
                message += string.Format("Message: {0}", error);
                message += Environment.NewLine;
                message += "-----------------------------------------------------------";
                message += Environment.NewLine;
                string path = System.Web.HttpContext.Current.Server.MapPath("~/ViewErrorLogFiles/ErrorLogz1.txt");

                using (StreamWriter writer = new StreamWriter(path, true))
                {
                    writer.WriteLine(message);
                    writer.Close();
                }

            }
            catch (Exception)
            {

                ;
            }
        }
        public static void ErrorLogStringCount(string error)
        {
            try
            {

                if (_isLogFile == "False")
                    return;
                if (!Directory.Exists(dir))  // if it doesn't exist, create
                    Directory.CreateDirectory(dir);
                string message = string.Format("Time: {0}", DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss tt"));
                message += Environment.NewLine;
                message += "-----------------------------------------------------------";
                message += Environment.NewLine;
                message += string.Format("Message: {0}", error);
                message += Environment.NewLine;
                message += "-----------------------------------------------------------";
                message += Environment.NewLine;
                string path = System.Web.HttpContext.Current.Server.MapPath("~/ViewErrorLogFiles/ErrorLogz1.txt");

                using (StreamWriter writer = new StreamWriter(path, true))
                {
                    writer.WriteLine(message);
                    writer.Close();
                }

            }
            catch (Exception)
            {

                ;
            }
        }


        public static void QueryLogString(string query)
        {
            try
            {

                if (_isLogFile == "False")
                    return;
                if (!Directory.Exists(dir))  // if it doesn't exist, create
                    Directory.CreateDirectory(dir);
                string message = string.Format("Time: {0}", DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss tt"));
                message += Environment.NewLine;
                message += "-----------------------------------------------------------";
                message += Environment.NewLine;
                message += string.Format("Message: {0}", query);
                message += Environment.NewLine;
                message += "-----------------------------------------------------------";
                message += Environment.NewLine;
                string path = System.Web.HttpContext.Current.Server.MapPath("~/ViewErrorLogFiles/QueryLogString.txt");

                //string dir = System.Web.HttpContext.Current.Server.MapPath("~/ErrorLogString");
                //var dir = @"~/ErrorLogString";  // folder location

                if (!Directory.Exists(dir))  // if it doesn't exist, create
                    Directory.CreateDirectory(dir);

                using (StreamWriter writer = new StreamWriter(path, true))
                {
                    writer.WriteLine(message);
                    writer.Close();
                }

            }
            catch (Exception)
            {

                ;
            }
        }


        public static void ErrorLogString(string error)
        {
            try
            {

                if (_isLogFile == "False")
                    return;
                if (!Directory.Exists(dir))  // if it doesn't exist, create
                    Directory.CreateDirectory(dir);
                string message = string.Format("Time: {0}", DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss.fff tt"));
                message += Environment.NewLine;
                message += "-----------------------------------------------------------";
                message += Environment.NewLine;
                message += string.Format("Message: {0}", error);
                message += Environment.NewLine;
                message += "-----------------------------------------------------------";
                message += Environment.NewLine;

                //dteinfo newly added by.M 02.09.2021
                string dteinfo = DateTime.Now.ToString("dd/MM/yyyy").Replace("/", "_");
                string path = System.Web.HttpContext.Current.Server.MapPath("~/ViewErrorLogFiles/ErrorLogString_" + dteinfo + ".txt");


                //string dir = System.Web.HttpContext.Current.Server.MapPath("~/ErrorLogString");
                //var dir = @"~/ErrorLogString";  // folder location

                if (!Directory.Exists(dir))  // if it doesn't exist, create
                    Directory.CreateDirectory(dir);

                using (StreamWriter writer = new StreamWriter(path, true))
                {
                    writer.WriteLine(message);
                    writer.Close();
                }

            }
            catch (Exception)
            {

                ;
            }
        }

        public static void JavaScriptErrorLog_TestPurpose(string error, string logType)
        {
            try
            {

                if (!Directory.Exists(dir))  // if it doesn't exist, create
                    Directory.CreateDirectory(dir);

                string dteinfo = DateTime.Now.ToString("dd/MM/yyyy").Replace("/", "_");

                string message = string.Format("Time: {0}", DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss tt"));
                message += Environment.NewLine;
                message += string.Format("{0}", error);
                message += Environment.NewLine;
                string path = System.Web.HttpContext.Current.Server.MapPath("~/ViewErrorLogFiles/JavaScriptErrorLog_" + dteinfo + ".txt");
                //string path = System.Web.HttpContext.Current.Server.MapPath("~/ViewErrorLogFiles/JavaScriptErrorLog.txt");
                if (logType == "PageLoadinginfo")
                    path = System.Web.HttpContext.Current.Server.MapPath("~/ViewErrorLogFiles/PageLoadinginfo_" + dteinfo + ".txt");
                else if (logType == "uom")
                    path = System.Web.HttpContext.Current.Server.MapPath("~/ViewErrorLogFiles/uom_" + dteinfo + ".txt");
                else if (logType == "PerformActionInfo")
                {
                    var filePath = System.Web.HttpContext.Current.Server.MapPath("~/ViewErrorLogFiles/PerformActionInfo_" + dteinfo + ".txt"); // Do not pass byte array here
                    if (System.IO.File.Exists(filePath))
                    {
                        System.IO.File.Delete(filePath);
                    }
                    path = System.Web.HttpContext.Current.Server.MapPath("~/ViewErrorLogFiles/PerformActionInfo_" + dteinfo + ".txt");
                }
                else if (logType != "")
                {
                    var filePath = System.Web.HttpContext.Current.Server.MapPath("~/ViewErrorLogFiles/" + logType + "_" + dteinfo + ".txt"); // Do not pass byte array here
                    if (System.IO.File.Exists(filePath))
                    {
                        System.IO.File.Delete(filePath);
                    }
                    path = System.Web.HttpContext.Current.Server.MapPath("~/ViewErrorLogFiles/" + logType + "_" + dteinfo + ".txt");
                }


                using (StreamWriter writer = new StreamWriter(path, true))
                {
                    writer.WriteLine(message);
                    writer.Close();
                }

            }
            catch (Exception)
            {

                ;
            }
        }
        public static void JavaScriptErrorLogTestPurpose(string error, string txtfileName)
        {
            try
            {

                if (!Directory.Exists(dir))  // if it doesn't exist, create
                    Directory.CreateDirectory(dir);

                string dteinfo = DateTime.Now.ToString("dd/MM/yyyy").Replace("/", "_");

                string message = string.Format("Time: {0}", DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss tt"));
                message += Environment.NewLine;
                message += string.Format("{0}", error);
                message += Environment.NewLine;
                string path = System.Web.HttpContext.Current.Server.MapPath("~/ViewErrorLogFiles/JSQuery" + dteinfo + ".txt");
                //string path = System.Web.HttpContext.Current.Server.MapPath("~/ViewErrorLogFiles/JavaScriptErrorLog.txt");
                if (txtfileName != "" && txtfileName != null)
                {
                    path = System.Web.HttpContext.Current.Server.MapPath("~/ViewErrorLogFiles/" + txtfileName + "_" + dteinfo + ".txt");
                }

                using (StreamWriter writer = new StreamWriter(path, true))
                {
                    writer.WriteLine(message);
                    writer.Close();
                }

            }
            catch (Exception)
            {

                ;
            }
        }

        public static void JavaScriptErrorLog(string error, string logType)
        {
            try
            {


                if (_isLogFile == "False")
                    return;
                //try
                //{
                if (!Directory.Exists(dir))  // if it doesn't exist, create
                    Directory.CreateDirectory(dir);
                string message = string.Format("Time: {0}", DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss.fff tt"));
                message += Environment.NewLine;
                message += "-----------------------------------------------------------";
                message += Environment.NewLine;
                message += string.Format("Message: {0}", error);
                message += Environment.NewLine;
                message += "-----------------------------------------------------------";
                message += Environment.NewLine;

                // COMMENTED 21.04.2021 =================
                string dteinfo = DateTime.Now.ToString("dd/MM/yyyy").Replace("/", "_");
                //string strUserId = 
                //    HttpContext.Current.Session["UserName"].ToString();
                string path = System.Web.HttpContext.Current.Server.MapPath("~/ViewErrorLogFiles/JavaScriptErrorLog_" + dteinfo + ".txt");


                //string path = System.Web.HttpContext.Current.Server.MapPath("~/ViewErrorLogFiles/JavaScriptErrorLog.txt");
                //string path = System.Web.HttpContext.Current.Server.MapPath("~/ViewErrorLogFiles/JavaScriptErrorLog.txt");
                if (logType == "PageLoadinginfo")
                    path = System.Web.HttpContext.Current.Server.MapPath("~/ViewErrorLogFiles/PageLoadinginfo.txt");

                using (StreamWriter writer = new StreamWriter(path, true))
                {
                    writer.WriteLine(message);
                    writer.Close();
                }

            }
            catch (Exception)
            {

                ;
            }
        }

        public static void ImportLog(string ex)
        {
            try
            {

                if (_isLogFile == "False")
                    return;
                if (!Directory.Exists(dir))  // if it doesn't exist, create
                    Directory.CreateDirectory(dir);
                string message = string.Format("Time: {0}", DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss tt"));
                message += Environment.NewLine;
                message += "-----------------------------------------------------------";
                message += Environment.NewLine;
                message += string.Format("Message: {0}", ex);
                message += Environment.NewLine;
                message += "-----------------------------------------------------------";
                message += Environment.NewLine;
                string path = System.Web.HttpContext.Current.Server.MapPath("~/ViewErrorLogFiles/ImportLog.txt");

                using (StreamWriter writer = new StreamWriter(path, true))
                {
                    writer.WriteLine(message);
                    writer.Close();
                }

            }
            catch (Exception)
            {

                ;
            }
        }
        public static void VehicleAssignmentLog(string ex)
        {
            try
            {

                if (_isLogFile == "False")
                    return;
                if (!Directory.Exists(dir))  // if it doesn't exist, create
                    Directory.CreateDirectory(dir);
                string message = string.Format("Time: {0}", DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss tt"));
                message += Environment.NewLine;
                message += "-----------------------------------------------------------";
                message += Environment.NewLine;
                message += string.Format("Message: {0}", ex);
                message += Environment.NewLine;
                message += "-----------------------------------------------------------";
                message += Environment.NewLine;
                string dteinfo = _userId + "_" + DateTime.Now.ToString("dd/MM/yyyy").Replace("/", "_");
                string path = System.Web.HttpContext.Current.Server.MapPath("~/ViewErrorLogFiles/VehicleAssignment_" + dteinfo + "_.txt");

                using (StreamWriter writer = new StreamWriter(path, true))
                {
                    writer.WriteLine(message);
                    writer.Close();
                }

            }
            catch (Exception)
            {
                ;
            }
        }
        public static void RunExeLog(string ex)
        {
            try
            {

                if (_isLogFile == "False")
                    return;
                if (!Directory.Exists(dir))  // if it doesn't exist, create
                    Directory.CreateDirectory(dir);
                string message = string.Format("Time: {0}", DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss tt"));
                message += Environment.NewLine;
                message += "-----------------------------------------------------------";
                message += Environment.NewLine;
                message += string.Format("Message: {0}", ex);
                message += Environment.NewLine;
                message += "-----------------------------------------------------------";
                message += Environment.NewLine;
                string path = System.Web.HttpContext.Current.Server.MapPath("~/ViewErrorLogFiles/RunExeLog.txt");

                using (StreamWriter writer = new StreamWriter(path, true))
                {
                    writer.WriteLine(message);
                    writer.Close();
                }

            }
            catch (Exception)
            {

                ;
            }
        }
        public static void BlobDownloadLog(string ex)
        {
            try
            {

                if (_isLogFile == "False")
                    return;
                if (!Directory.Exists(dir))  // if it doesn't exist, create
                    Directory.CreateDirectory(dir);
                string message = string.Format("Time: {0}", DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss tt"));
                message += Environment.NewLine;
                message += "-----------------------------------------------------------";
                message += Environment.NewLine;
                message += string.Format("Message: {0}", ex);
                message += Environment.NewLine;
                message += "-----------------------------------------------------------";
                message += Environment.NewLine;
                string path = System.Web.HttpContext.Current.Server.MapPath("~/ViewErrorLogFiles/BlobDownloadLog.txt");

                using (StreamWriter writer = new StreamWriter(path, true))
                {
                    writer.WriteLine(message);
                    writer.Close();
                }

            }
            catch (Exception)
            {

                ;
            }
        }
        public static void ImportErrorLog(string logName, string ex)
        {
            try
            {

                //if (_isLogFile == "False")
                //    return;
                if (!Directory.Exists(dir))  // if it doesn't exist, create
                    Directory.CreateDirectory(dir);
                string message = string.Format("Time: {0}", DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss tt"));
                message += Environment.NewLine;
                message += "-----------------------------------------------------------";
                message += Environment.NewLine;
                message += string.Format("Message: {0}", ex);
                message += Environment.NewLine;
                message += "-----------------------------------------------------------";
                message += Environment.NewLine;
                string path = System.Web.HttpContext.Current.Server.MapPath("~/ImportFiles/ImportErrorLog/" + logName + ".txt");

                using (StreamWriter writer = new StreamWriter(path, true))
                {
                    writer.WriteLine(message);
                    writer.Close();
                }

            }
            catch (Exception)
            {
                ;
            }
        }

        public static void ExportErrorLog(string ex)
        {
            try
            {

                //if (_isLogFile == "False")
                //    return;
                if (!Directory.Exists(dir))  // if it doesn't exist, create
                    Directory.CreateDirectory(dir);
                string message = string.Format("Time: {0}", DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss tt"));
                message += Environment.NewLine;
                message += "-----------------------------------------------------------";
                message += Environment.NewLine;
                message += string.Format("Message: {0}", ex);
                message += Environment.NewLine;
                message += "-----------------------------------------------------------";
                message += Environment.NewLine;
                string dteinfo = _userId + "_" + DateTime.Now.ToString("dd/MM/yyyy").Replace("/", "_");
                string path = System.Web.HttpContext.Current.Server.MapPath("~/ViewErrorLogFiles/ExportErrorLog_" + dteinfo + ".txt");

                using (StreamWriter writer = new StreamWriter(path, true))
                {
                    writer.WriteLine(message);
                    writer.Close();
                }

            }
            catch (Exception)
            {

                ;
            }
        }
        public static void LogFile(string KeyValue, string ScreenName, string FieldName, string ActionName)
        {
            try
            {


                if (_isLogFile == "False")
                    return;
                if (!Directory.Exists(dir))  // if it doesn't exist, create
                    Directory.CreateDirectory(dir);
                string message = string.Format("Time: {0}", DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss tt"));
                message += Environment.NewLine;
                message += "-----------------------------------------------------------";
                message += Environment.NewLine;
                message += string.Format("ScreenName: {0}", ScreenName);
                message += Environment.NewLine;
                message += string.Format("ActionName: {0}", ActionName);
                message += Environment.NewLine;
                message += string.Format("FieldName: {0}", FieldName);
                message += Environment.NewLine;
                message += string.Format("FieldValue: {0}", KeyValue);
                message += Environment.NewLine;
                message += "-----------------------------------------------------------";
                message += Environment.NewLine;
                string path = System.Web.HttpContext.Current.Server.MapPath("~/ViewErrorLogFiles/LogFile.txt");

                using (StreamWriter writer = new StreamWriter(path, true))
                {
                    writer.WriteLine(message);
                    writer.Close();
                }
            }
            catch (Exception)
            {

                ;
            }
        }

        public string ReplaceHashSymbol(string data)
        {
            data = data.Replace("hashsymbol", "#");
            return data.Replace("hashsymbol", "#");
        }
        public string ReplaceSpecialCharacter(string data)
        {
            data = data.Replace("ampersandsymbol", "&");
            data = data.Replace("plussymbol", "+");
            data = data.Replace("hashsymbol", "#");
            data = data.Replace("null", "'c'");
            return data;
        }


        public enum LogInType
        {
            Normal = 1,
            MFA = 2
        }
    }
}