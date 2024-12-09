using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Sockets;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using SimplrSales.Models;
using System.Globalization;
using System.Net.Mail;
using System.Security.Claims;

namespace SimplrSales.Controllers
{
    public class LoginController : BusinessRule
    {
        string tmpMsg = "";
        string constr = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
        public static int bufferTimeVaule = 0;
        public static int attemptVaule = 0;
        public object[] array = new object[] { };
        object MyDynamic1 = new object();
        Dictionary<string, string> dictionary = new Dictionary<string, string>();
        string ipaddress = "";
        //string login_lat = "";
        //string login_lon = "";

        static string GenerateRandomPassword(PasswordOptions opts = null)
        {
            if (opts == null) opts = new PasswordOptions()
            {
                RequiredLength = 8,
                RequiredUniqueChars = 4,
                RequireDigit = true,
                RequireLowercase = true,
                RequireNonAlphanumeric = true,
                RequireUppercase = true
            };

            string[] randomChars = new[] {
            "ABCDEFGHJKLMNOPQRSTUVWXYZ",    // uppercase 
            "abcdefghijkmnopqrstuvwxyz",    // lowercase
            "0123456789",                   // digits
            "!@$?_-"                        // non-alphanumeric
        };

            Random rand = new Random(Environment.TickCount);
            List<char> chars = new List<char>();

            if (opts.RequireUppercase)
                chars.Insert(rand.Next(0, chars.Count),
                    randomChars[0][rand.Next(0, randomChars[0].Length)]);

            if (opts.RequireLowercase)
                chars.Insert(rand.Next(0, chars.Count),
                    randomChars[1][rand.Next(0, randomChars[1].Length)]);

            if (opts.RequireDigit)
                chars.Insert(rand.Next(0, chars.Count),
                    randomChars[2][rand.Next(0, randomChars[2].Length)]);

            if (opts.RequireNonAlphanumeric)
                chars.Insert(rand.Next(0, chars.Count),
                    randomChars[3][rand.Next(0, randomChars[3].Length)]);

            for (int i = chars.Count; i < opts.RequiredLength
                || chars.Distinct().Count() < opts.RequiredUniqueChars; i++)
            {
                string rcs = randomChars[rand.Next(0, randomChars.Length)];
                chars.Insert(rand.Next(0, chars.Count),
                    rcs[rand.Next(0, rcs.Length)]);
            }

            return new string(chars.ToArray());
        }




        public ActionResult Login(string sessionexpired)
        {
            try
            {
                var query = "";
                try
                {
                    Session["sysMaint"] = "0";

                    query = "select SystemMaintanence from system";

                    DataTable systemData = GetQueryData(query);

                    bool bl = false;
                    
                    bl = Convert.ToBoolean(systemData.Rows[0][0]);
                    if (bl == true)
                        Session["sysMaint"] = "1";
                    else
                        Session["sysMaint"] = "0";
                }
                catch (Exception)
                {

                   // throw;
                }

                Session["mfa"] = "0";
                ErrorLogString("LogIn Page Start \nUser.Identity Name-Value-IsUser: " + User.Identity.Name + "-" + (User.Identity as System.Security.Claims.ClaimsIdentity)?.FindFirst("name")?.Value + "-" + (User.Identity as System.Security.Claims.ClaimsIdentity)?.FindFirst("name")?.Issuer);
                ViewBag.LoginTitle = ConfigurationManager.AppSettings["LoginTitle"] != null ? ConfigurationManager.AppSettings["LoginTitle"] : "Simplr Sales";
                ViewBag.LoginLogo = ConfigurationManager.AppSettings["LoginLogo"] != null ? ConfigurationManager.AppSettings["LoginLogo"] : "/Images/SimplrLogo.png";
                Session["ProjectName"] = ConfigurationManager.AppSettings["ProjectName"];
                Session["SessionTimeOut"] = ConfigurationManager.AppSettings["SessionTimeOut"];
                Session["URL"] = ConfigurationManager.AppSettings["UrlRPTImageString"];
                Session["PlanoGramURL"] = ConfigurationManager.AppSettings["PlanoGramURL"].ToString();
                ViewBag.Identity = User.Identity.Name;
                ViewBag.Identity1 = (User.Identity as System.Security.Claims.ClaimsIdentity)?.FindFirst("name")?.Value;
                ViewBag.Message = TempData["Message"];
                if (sessionexpired == "sessionexpired")
                    ViewBag.Message = "Session time expired!";
                if (Session["UserId"] != null)
                    SaveWebtoolAuditlog("Logout");
                TempData["Message"] = "";
                Session["UserName"] = null;
                Session["Password"] = null;
                Session["ScreenName"] = null;
                Session["IsShowMenu"] = null;
                Session["loopExit"] = false;
                Session["HtmlMenu"] = null;
                Session["UserId"] = null;
                Session["Password"] = null;
                Session["isLogin"] = false;
                Session["PaginationValue"] = null;
                ErrorLogString("LogIn Page End" + BusinessRule._LogInType);

                if (Session["LogInType"] == BusinessRule.LogInType.MFA.ToString())
                    return RedirectToAction("SignOut", "Home");

                 query = " select Isnull(CompanyName,'') as CompanyName  from system";
                DataTable td = GetQueryData(query);

                if (td.Rows.Count >= 1)
                    Session["CompanyName"] = td.Rows[0].ItemArray[0].ToString();
                else
                    Session["CompanyName"] = "";
                return View();
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
            }
            return View();
        }



        [HttpPost]
        public ActionResult loginform(FormCollection collection)
        {
            Session["fpswd"] = "no";
            Boolean is_locked = false;
            string userIPAddress = "";

            bool resetPass = false;
            //To get local ip address
            try
            {
                var Lan = false;
                 userIPAddress = Request.ServerVariables["HTTP_X_FORWARDED_FOR"];
                if (String.IsNullOrEmpty(userIPAddress))
                    userIPAddress = Request.ServerVariables["REMOTE_ADDR"];

                if (string.IsNullOrEmpty(userIPAddress))
                    userIPAddress = Request.UserHostAddress;

                if(string.IsNullOrEmpty(userIPAddress) || userIPAddress.Trim() == "::1")
                {
                    Lan = true;
                    userIPAddress = string.Empty;
                }
                if(Lan)
                {
                    if(string.IsNullOrEmpty(userIPAddress))
                    {
                        string stringHostName = Dns.GetHostName();
                        IPHostEntry ipHostEntries = Dns.GetHostEntry(stringHostName);
                        System.Net.IPAddress[] arrIpAddress = ipHostEntries.AddressList;

                        try
                        {
                            foreach (IPAddress ipAddress in arrIpAddress)
                            {
                                if (ipAddress.AddressFamily == System.Net.Sockets.AddressFamily.InterNetwork)
                                {
                                    userIPAddress = ipAddress.ToString();
                                }
                            }

                            if (string.IsNullOrEmpty(userIPAddress))
                                userIPAddress = arrIpAddress[arrIpAddress.Length - 1].ToString();
                        }
                        catch(Exception)
                        {
                            try
                            {
                                userIPAddress = arrIpAddress[0].ToString();
                            }
                            catch(Exception)
                            {
                                try
                                {
                                    arrIpAddress = Dns.GetHostAddresses(stringHostName);
                                    userIPAddress = arrIpAddress[0].ToString();
                                }
                                catch(Exception)
                                {
                                    userIPAddress = "127.0.0.1";
                                }
                            }
                        }
                    }
                }

               
            }
            catch (Exception)
            {

                //throw;
            }

            var logStr = "";
            try
            {
                ipaddress = userIPAddress;

                Session["LogInType"] = BusinessRule.LogInType.Normal.ToString();
                string uname = collection.Get("uname");
                string psw = collection.Get("psw");

                                if (string.IsNullOrEmpty(ipaddress))
                    ipaddress = collection.Get("ipaddress");

                try
                {
                    if (string.IsNullOrEmpty(ipaddress))
                    {
                        string publicIpAddress;
                        WebRequest request = WebRequest.Create("http://jsonip.com/");    ///https://api.ipify.org
                        

                        using (WebResponse response = request.GetResponse())
                        using (StreamReader streamReader = new StreamReader(response.GetResponseStream()))
                        {
                            publicIpAddress = streamReader.ReadToEnd();
                        }

                        if (string.IsNullOrEmpty(ipaddress))
                        {
                            // ipaddress = publicIpAddress; //  ///https://api.ipify.org >> assigned IP address
                            // jsonip.com output >> //{\"ip\":\"203.223.190.172\",\"geo-ip\":\"Unlimited IP geolocation https://getjsonip.com/#plus\",\"API Help\":\"https://getjsonip.com/#docs\"}"
                            string[] parts = publicIpAddress.Split('\"');
                            ipaddress = parts[3];
                        }
                    }
                }
                catch (Exception)
                {

                    // throw;
                }
                try
                {
                    ErrorLogString("LogIn function Start \nUser Name : " + uname + " ; Password : " + psw);
                }
                catch (Exception)
                {

                   // throw;
                }
                try
                {
                    Session["SolutionName"] = ConfigurationManager.AppSettings["SolutionName"];
                }
                catch (Exception)
                {

                  //  throw;
                }
                try
                {
                    Session["ULCR"] = ConfigurationManager.AppSettings["ULCR"];
                }
                catch (Exception)
                {

                   // throw;
                }
                try
                {
                    Session["SaveImagePath"] = ConfigurationManager.AppSettings["configFile"].Replace("~", "..");
                }
                catch (Exception)
                {

                    //throw;
                }
                try
                {
                    Session["ServiceSaveImagePath"] = ConfigurationManager.AppSettings["ServiceFile"].Replace("~", "..");
                }
                catch { }
                try
                {
                    Session["PresentationSaveImagePath"] = ConfigurationManager.AppSettings["presentationFile"].Replace("~", "..");
                }
                catch (Exception)
                {

                    //throw;
                }

                try
                {
                    ErrorLogString("BusinessRule._solutionName : " + BusinessRule._solutionName);
                }
                catch (Exception)
                {

                    // throw;
                }

                var query = string.Empty;

                //if (BusinessRule._solutionName == "SALES-WEB-UL")
                if (Session["SolutionName"].ToString() == "SALES-WEB-UL")
                        query = "select * from SalesAgent where UserID='" + uname + "'  COLLATE Latin1_General_CS_AS and PassWord = '" + psw + "' COLLATE Latin1_General_CS_AS and Active=1 and hierarchy > 20";
                else if (Session["ProjectName"].ToString().ToUpper() == "PVMIGT" || Session["ProjectName"].ToString().ToUpper() == "FGV" || Session["ProjectName"].ToString().ToUpper() == "EBFF" || Session["ProjectName"].ToString().ToUpper() == "EONMETALL")
                {
                    query = "select Code, SystemValue from systemlist where (code like 'IncorrectLogInBufferTime' or code like 'FailedLoginMaxCount') order by code";
                    DataTable dt_1 = GetQueryData(query);
                    if (dt_1.Rows.Count >= 1)
                    {
                        bufferTimeVaule = Convert.ToInt32(dt_1.Rows[1]["SystemValue"].ToString()); //IncorrectLogInBufferTime
                        attemptVaule = Convert.ToInt32(dt_1.Rows[0]["SystemValue"].ToString()); //FailedLoginMaxCount
                    }
                     query = "select * from SalesAgent where UserID='" + uname + "'  COLLATE Latin1_General_CS_AS and PassWord = '" + psw + "' COLLATE Latin1_General_CS_AS  and Active=1 ";
                    DataTable dt_2 = GetQueryData(query);
                    if (dt_2.Rows.Count >= 1)
                    {
                        var isLocked = dt_2.Rows[0]["Locked"].ToString();
                        if (isLocked.ToLower() == "true" || isLocked == "1")
                        {
                            is_locked = true;
                           // ErrorLogString(uname + " This user is locked");
                            //TempData["Message"] = "Your Account has been Locked! Please contact administrator!";
                            //return RedirectToAction("Login");
                        }
                        
                    }
                    query = "select * from SalesAgent where UserID='" + uname + "' COLLATE Latin1_General_CS_AS and PassWord = '" + psw + "' COLLATE Latin1_General_CS_AS   and Active=1 and isnull(Locked,0) <> 1 ";

                }
                else if (Session["ProjectName"].ToString().ToUpper() == "PVMB" || Session["ProjectName"].ToString().ToUpper() == "BANGALA")
                {
                    query = "select Code, SystemValue from systemlist where solutionname = 'sales-web' and code like '%IncorrectLogIn%'";
                    DataTable dt_1 = GetQueryData(query);
                    if (dt_1.Rows.Count >= 1)
                    {
                        bufferTimeVaule = Convert.ToInt32(dt_1.Rows[0].ItemArray[1].ToString());
                        attemptVaule = Convert.ToInt32(dt_1.Rows[1].ItemArray[1].ToString());
                    }

                    query = "select * from SalesAgent where UserID='" + uname + "'  COLLATE Latin1_General_CS_AS and PassWord = '" + psw + "' COLLATE Latin1_General_CS_AS  and Active=1 ";
                    DataTable dt_2 = GetQueryData(query);
                    if (dt_2.Rows.Count >= 1)
                    {
                        var isLocked = dt_2.Rows[0].ItemArray[32].ToString();
                        if (isLocked.ToLower() == "true" || isLocked == "1")
                        {
                            query = "select top " + attemptVaule + " LoginStatus from WebLoginLog where UserID='" + uname + "'  COLLATE Latin1_General_CS_AS and dtg >= DATEADD(MINUTE, -" + bufferTimeVaule + ",getdate()) order by dtg desc";
                            dt_2 = GetQueryData(query);
                            if (dt_2.Rows.Count != Convert.ToInt32(attemptVaule))
                            {
                                var updatequery = "Update SalesAgent set Locked = '0' where UserID = '" + uname + "'  COLLATE Latin1_General_CS_AS and Active=1 ";
                                ExecuteNonQuery(updatequery);
                            }
                        }
                    }
                    query = "select * from SalesAgent where UserID='" + uname + "' COLLATE Latin1_General_CS_AS and PassWord = '" + psw + "' COLLATE Latin1_General_CS_AS   and Active=1 and isnull(Locked,0) <> 1 ";
                }
                else
                    query = "select * from SalesAgent where UserID='" + uname + "' COLLATE Latin1_General_CS_AS and PassWord = '" + psw + "' COLLATE Latin1_General_CS_AS   and Active=1 ";

                DataTable salesAgentData = GetQueryData(query);
                ErrorLogString("Execute row Count : " + salesAgentData.Rows.Count);
                logStr = "1";
                if (salesAgentData.Rows.Count >= 1)
                {
                    try
                    {
                        Session["Image"] = salesAgentData.Rows[0]["Image"].ToString();
                    }
                    catch {  }
                    try
                    {
                        Session["LastLogin"] = "";
                        //if (salesAgentData.Rows[0]["LastLogin"] == DBNull.Value)
                        //    Session["LastLogin"] = "Last Login: ----- ";
                        //else
                        //    Session["LastLogin"] = "Last Login: " + salesAgentData.Rows[0]["LastLogin"].ToString();
                       
                        Session["LastLogin"] = DateTime.Parse(salesAgentData.Rows[0]["LastLogin"].ToString()).ToString("dd-MM-yyyy HH:mm:ss");
                    }
                    catch { }

                    try
                    {
                        //if (Session["ProjectName"].ToString().ToUpper() == "CPF")
                        //{
                        query = "select description from usergroup where groupid=" + salesAgentData.Rows[0]["access"].ToString();
                        DataTable accessData = GetQueryData(query);
                        Session["UserGroup"] = accessData.Rows[0]["description"].ToString();

                        //}

                    }
                    catch { }

                   // if (Session["ProjectName"].ToString().ToUpper() == "PVMNG" || Session["ProjectName"].ToString().ToUpper() == "FGV" || Session["ProjectName"].ToString().ToUpper() == "EBFF" || Session["ProjectName"].ToString().ToUpper() == "STANDARD" || Session["ProjectName"].ToString().ToUpper() == "FFB")
                   // {
                        try
                        {
                            var updatequery = "Update SalesAgent set LastLogin=getdate()  where UserID='" + uname + "' COLLATE Latin1_General_CS_AS and PassWord = '" + psw + "' COLLATE Latin1_General_CS_AS   and Active=1 and isnull(Locked,0) <> 1";
                            ExecuteNonQuery(updatequery);
                        }
                        catch { }
                    //}

                    try
                    {
                        resetPass = Convert.ToBoolean(salesAgentData.Rows[0]["ResetPass"]);
                    }
                    catch (Exception ex)
                    {

                    }

                    Session["isLogin"] = true;
                    CommonRule._AccessLevel = salesAgentData.Rows[0].ItemArray[5] == null ? "" : salesAgentData.Rows[0].ItemArray[5].ToString();
                    Session["SalesAgentCode"] = salesAgentData.Rows[0].ItemArray[0];

                    if (Session["ProjectName"].ToString().ToUpper() == "SENGCHOON")
                        Session["Department"] = "";
                    else
                        Session["Department"] = salesAgentData.Rows[0].ItemArray[27].ToString();
                    
                    Session["UserName"] = salesAgentData.Rows[0]["Name"].ToString(); //salesAgentData.Rows[0].ItemArray[1];
                    if (Session["ProjectName"].ToString().ToUpper() == "PVMB" || Session["ProjectName"].ToString().ToUpper() == "BANGALA" || Session["ProjectName"].ToString().ToUpper() == "PVMIGT")
                        Session["Password"] = psw;
                    Session["AccessLevel"] = salesAgentData.Rows[0].ItemArray[5];
                    Session["AgentId"] = uname;
                    Session["UserId"] = uname;


                    try

                    {
                        if (Session["ProjectName"].ToString().ToUpper() == "EBFF")
                            Session["UserId"] = salesAgentData.Rows[0]["Code"].ToString();
                    }
                    catch { }

                    logStr += " & 2 Lang";

                    var lang = "";
                    if (Session["ProjectName"].ToString().ToUpper() == "SENGCHOON")
                        lang = "";
                    else
                        lang = salesAgentData.Rows[0]["Language"].ToString();


                    Session["Language"] = (lang == null || lang == "") ? "English" : lang;
                    CommonRule._Language = (lang == null || lang == "") ? "English" : lang;
                    _userId = uname;
                    Session["IsShowMenu"] = true;
                    // COMMENTED NEW SESSION VARIABLE
                    Session["IsFromMobile"] = false;
                    Session["UserAccessLevelQuery"] = "in (select groupid from salesmangroup where userid='" + uname + "')";

                    query = "select * from System where MDTNo='" + uname + "'";
                    logStr += " &  3 Qry  -" + query;
                    DataTable systemData = GetQueryData(query);
                    if (systemData.Rows.Count >= 1)
                    {
                        var jsonData = JsonConvert.SerializeObject(systemData);
                        jsonData = jsonData.Replace("[", "").Replace("]", "");
                        SystemConfig = JsonConvert.DeserializeObject(jsonData);
                    }

                    try
                    {
                        query = "select IsAccessLevel from system";
                        logStr += " &  4 access Qry  -" + query;
                        DataTable td = GetQueryData(query);
                        if (td.Rows.Count >= 1)
                            Session["IsAccessLevel"] = td.Rows[0].ItemArray[0].ToString() == "True" ? "1" : "0";

                        else
                            Session["IsAccessLevel"] = "0";
                    }
                    catch (Exception)
                    {

                        //throw;
                    }

                    //GetYearLimit from SystemList Table
                    logStr += " &  5 ";
                    _commonRule.getYearPickerLimit(BusinessRule._solutionName);
                    logStr += " &  6";

                    if (Session["ProjectName"].ToString().ToUpper() == "FGV" || Session["ProjectName"].ToString().ToUpper() == "EBFF" || Session["ProjectName"].ToString().ToUpper() == "EONMETALL")
                    {
                        var updatequery = "Update SalesAgent set LastLoginAttemptDTG='" + DateTime.Now.ToString("dd-MM-yyyy HH:mm:ss") + "',LoginAttempts = '0' where UserID = '" + uname + "'  COLLATE Latin1_General_CS_AS and PassWord = '" + psw + "' COLLATE Latin1_General_CS_AS and Active=1 ";
                        ExecuteNonQuery(updatequery);
                    }
                    else if (Session["ProjectName"].ToString().ToUpper() == "PVMIGT")
                    {
                        var updatequery = "Update SalesAgent set LastLoginAttemptDTG='" + DateTime.Now.ToString ("dd-MM-yyyy HH:mm:ss") + "',LoginAttempts = '0' where UserID = '" + uname + "'  COLLATE Latin1_General_CS_AS and PassWord = '" + psw + "' COLLATE Latin1_General_CS_AS and Active=1 ";
                        ExecuteNonQuery(updatequery);
                        try
                        {
                            query = "select * from systemlist  where Code = 'MFA WebTool' and SystemValue='Yes'";
                            DataTable dt = GetQueryData(query);
                            if (dt.Rows.Count >= 1)
                                 query = "select SystemValue from systemlist where solutionname = 'sales-web' and code = 'LoginExpireDaysMaximumMFA'";
                            else
                                 query = "select SystemValue from systemlist where solutionname = 'sales-web' and code = 'LoginExpireDaysMaximumNonMFA'";
                            
                            dt = GetQueryData(query);
                            var expireDays = 0;
                            if (dt.Rows.Count >= 1)
                            {
                                expireDays = Convert.ToInt32(dt.Rows[0].ItemArray[0].ToString());
                            }
                            var lastpasswordChangedDate = salesAgentData.Rows[0].ItemArray[43];

                            Session["Password1"] = "";

                            if (lastpasswordChangedDate.ToString() != "" && DateTime.Parse(lastpasswordChangedDate.ToString()).AddDays(expireDays) < DateTime.Now)
                            {
                                // Session["cpswd"] = "yes";
                                  Session["Password"] = "You need to change your password every " + expireDays + " Days.";
                                Session["Password1"] = "You need to change your password every " + expireDays + " Days.";

                            }

                        }
                        catch (Exception ex)
                        {

                            // throw;
                        }

                    }
                       
                     else   if (Session["ProjectName"].ToString().ToUpper() == "PVMB" || Session["ProjectName"].ToString().ToUpper() == "BANGALA")
                    {
                        var code = salesAgentData.Rows[0].ItemArray[0];
                        var nodetreeType = salesAgentData.Rows[0].ItemArray[33];
                        var nodetreeValue = salesAgentData.Rows[0].ItemArray[34];
                        string latitude = collection.Get("latitude");
                        string longitude = collection.Get("longitude");

                   //     latitude = "0";
                        //if (string.IsNullOrEmpty(latitude))
                        //    latitude = login_lat;
                        //if (string.IsNullOrEmpty(longitude))
                        //    longitude = login_lon;
                        try
                        {
                                if (string.IsNullOrEmpty(latitude) || latitude == "0")
                                {
                                    var apiUrl1 = "https://ipapi.co/" + ipaddress + "/json";
                                    using (HttpClient client1 = new HttpClient())
                                    {
                                        client1.DefaultRequestHeaders.Add("User-Agent", "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/14.0.835.202 Safari/535.1");
                                        var response1 = client1.GetAsync(apiUrl1).GetAwaiter().GetResult();
                                        var result = response1.Content.ReadAsStringAsync().GetAwaiter().GetResult();


                                        var obj = JObject.Parse(result);

                                        if (obj["latitude"] != null && obj["longitude"] != null)
                                        {
                                            latitude = (string)obj["latitude"];
                                            longitude = (string)obj["longitude"];
                                        }
                                        

                                    }

                                }
                            
                        }
                        catch (Exception)
                        {

                            // throw;
                        }
                        System.Threading.Thread.Sleep(5000);
                        var insertQry = "Insert Into WebLoginLog (DTG,Code,UserID,NodetreeType,NodetreeValue,IPAddress,Latitude,Longitude,LoginStatus)";
                        insertQry += "values(GETDATE(),'" + code + "', '" + uname + "', '" + nodetreeType + "', '" + nodetreeValue + "', '" + ipaddress + "', '" + latitude + "', '" + longitude + "', 'Success')";
                        var reslt = ExecuteNonQuery(insertQry);
                        ErrorLogString("WebLoginLog Table Insert query : " + insertQry + " - Return :" + reslt);

                        var qryUserGrp = "select ISNULL(IsPassValidate,0) as IsPassValidate from usergroup where groupid like '" + salesAgentData.Rows[0]["access"].ToString() + "';";
                        DataTable dtUserGrooup = GetQueryData(qryUserGrp);
                        if (Convert.ToBoolean(dtUserGrooup.Rows[0]["IsPassValidate"]) == true)
                        {
                            try
                            {
                                query = "select SystemValue from systemlist where solutionname = 'sales-web' and code = 'LoginExpireDays'";
                                DataTable dt = GetQueryData(query);
                                var expireDays = 0;
                                if (dt.Rows.Count >= 1)
                                {
                                    expireDays = Convert.ToInt32(dt.Rows[0].ItemArray[0].ToString());
                                }
                                var lastpasswordChangedDate = salesAgentData.Rows[0].ItemArray[39];

                                if (lastpasswordChangedDate.ToString() != "" && DateTime.Parse(lastpasswordChangedDate.ToString()).AddDays(expireDays) < DateTime.Now)
                                {
                                    // Session["cpswd"] = "yes";
                                    Session["Password"] = "You need to change your password every " + expireDays + " Days.";

                                }
                            }
                            catch (Exception ex)
                            {

                                // throw;
                            }
                       }
                        
                    }

                    ///
                    ErrorLogString("LogIn function End - logSteps -" + logStr);
                    SaveWebtoolAuditlog("LogIn");
                    Session["fpswd"] = "no"; 
                    System.Threading.Thread.Sleep(1000);
                    if (resetPass == true)
                    {
                        Session["fpswd"] = "yes";
                        Session["RandomPwd"] = psw;
                    }
                    if (Session["ProjectName"].ToString().ToUpper() == "FROSTFOOD" && salesAgentData.Rows[0]["Access"].ToString() == "3")
                        return RedirectToAction("FormClickEvent", "Form", new { ScreenName = "AuditUserList", FieldName = "", FormView = "", query = "" });
                    else
                        return RedirectToAction("FormClickEvent", "Form", new { ScreenName = "Web_DashBoard", FieldName = "", FormView = "", query = "" });
                }
                else
                {
                    if(Session["ProjectName"].ToString().ToUpper() == "PVMIGT" || Session["ProjectName"].ToString().ToUpper() == "FGV" || Session["ProjectName"].ToString().ToUpper() == "EBFF" || Session["ProjectName"].ToString().ToUpper() == "EONMETALL")
                    {
                        query = "select * from SalesAgent where UserID='" + uname + "'  COLLATE Latin1_General_CS_AS and Active=1 ";
                        DataTable dt = GetQueryData(query);
                        if (dt.Rows.Count >= 1)
                        {

                            var log_attempt = 0;

                            var isLocked = dt.Rows[0]["Locked"].ToString();



                            DateTime dt1 = DateTime.ParseExact(DateTime.Now.AddDays(-1).ToString("dd-MM-yyyy HH:mm:ss"), "dd-MM-yyyy HH:mm:ss", CultureInfo.InvariantCulture);

                            try
                            {
                                dt1 = DateTime.ParseExact(dt.Rows[0]["LastLoginAttemptDTG"].ToString(), "dd-MM-yyyy HH:mm:ss", CultureInfo.InvariantCulture);
                            }
                            catch (Exception)
                            {

                               // throw;
                            }
                           
                            DateTime dt2 = DateTime.ParseExact(DateTime.Now.ToString("dd-MM-yyyy HH:mm:ss"), "dd-MM-yyyy HH:mm:ss", CultureInfo.InvariantCulture);

                                if (Math.Abs((dt1 - dt2).TotalSeconds) <= (bufferTimeVaule * 60))
                                {
                                try
                                {
                                    log_attempt = Convert.ToInt32(dt.Rows[0]["LoginAttempts"]);
                                }
                                catch (Exception ex1)
                                {

                                }
                                }

                                if (isLocked.ToLower() == "true" || isLocked == "1")
                                {
                                try
                                {
                                    log_attempt = Convert.ToInt32(dt.Rows[0]["LoginAttempts"]);
                                }
                                catch (Exception ex1)
                                {

                                }
                                }

                                log_attempt = log_attempt + 1;
                                var updatequery = "Update SalesAgent set LastLoginAttemptDTG='" + DateTime.Now.ToString("dd-MM-yyyy HH:mm:ss") + "',LoginAttempts = " + log_attempt.ToString() + " where UserID = '" + uname + "'  COLLATE Latin1_General_CS_AS and Active=1 ";
                                ExecuteNonQuery(updatequery);

                            if (isLocked.ToLower() == "true" || isLocked == "1")
                            {
                                ErrorLogString(uname + " This user is locked");
                                TempData["Message"] = "Your Account has been Locked.Please Contact Administrator!";
                                return RedirectToAction("Login");
                            }
                            else
                            {
                                if(attemptVaule > 0 && log_attempt >= attemptVaule)
                                {
                                    updatequery = "Update SalesAgent set Locked = 1 where UserID = '" + uname + "'  COLLATE Latin1_General_CS_AS and Active=1 ";
                                    ExecuteNonQuery(updatequery);

                                    ErrorLogString(uname + " This user is locked");
                                    TempData["Message"] = "Your Account has been Locked.Please Contact Administrator!";
                                    return RedirectToAction("Login");

                                }
                                else
                                {
                                    ErrorLogString("Log In Faild : Invalid Username/Password, Please Try Again" + " - logSteps - " + logStr);
                                    TempData["Message"] = "Wrong Password - " + (attemptVaule - log_attempt).ToString() + " attempt(s) remaining";//Invalid Username/Password, Please Try Again";
                                    return RedirectToAction("Login");
                                }

                            }
                            
                        }
                        else
                        {
                            ErrorLogString("Log In Faild : Invalid Username/Password, Please Try Again" + " - logSteps - " + logStr);
                            TempData["Message"] = "Invalid Username/Password, Please Try Again";
                            return RedirectToAction("Login");
                        }
                    }
                    else if (Session["ProjectName"].ToString().ToUpper() == "PVMB" || Session["ProjectName"].ToString().ToUpper() == "BANGALA")
                    {
                        query = "select * from SalesAgent where UserID='" + uname + "'  COLLATE Latin1_General_CS_AS and Active=1 ";
                        DataTable dt = GetQueryData(query);
                        if (dt.Rows.Count >= 1)
                        {
                            var code = dt.Rows[0].ItemArray[0];
                            var isLocked = dt.Rows[0].ItemArray[32].ToString();
                            var nodetreeType = dt.Rows[0].ItemArray[33];
                            var nodetreeValue = dt.Rows[0].ItemArray[34];
                            if (isLocked.ToLower() == "true" || isLocked == "1")
                            {
                                ErrorLogString(uname + " This user is locked");
                                TempData["Message"] = "Your Account has been Locked.Please try after " + bufferTimeVaule + " mins";
                                return RedirectToAction("Login");
                            }
                            string latitude = collection.Get("latitude");
                            string longitude = collection.Get("longitude");

                         //   latitude = "0";
                            //if (string.IsNullOrEmpty(latitude))
                            //    latitude = login_lat;
                            //if (string.IsNullOrEmpty(longitude))
                            //    longitude = login_lon;
                            try
                            {
                                if (string.IsNullOrEmpty(latitude) || latitude == "0")
                                {
                                    var apiUrl1 = "https://ipapi.co/" + ipaddress + "/json";
                                    using (HttpClient client1 = new HttpClient())
                                    {

                                        client1.DefaultRequestHeaders.Add("User-Agent", "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/14.0.835.202 Safari/535.1");
                                        var response1 = client1.GetAsync(apiUrl1).GetAwaiter().GetResult();
                                        var result = response1.Content.ReadAsStringAsync().GetAwaiter().GetResult();


                                        var obj = JObject.Parse(result);

                                        if (obj["latitude"] != null && obj["longitude"] != null)
                                        {
                                            latitude = (string)obj["latitude"];
                                            longitude = (string)obj["longitude"];
                                        }

                                        


                                    }

                                }
                            }
                            catch (Exception)
                            {

                                // throw;
                            }
                            System.Threading.Thread.Sleep(5000);
                            var insertQry = "Insert Into WebLoginLog (DTG,Code,UserID,NodetreeType,NodetreeValue,IPAddress,Latitude,Longitude,LoginStatus)";
                            insertQry += "values(GETDATE(),'" + code + "', '" + uname + "', '" + nodetreeType + "', '" + nodetreeValue + "', '" + ipaddress + "', '" + latitude + "', '" + longitude + "', 'Fail')";
                            var reslt = ExecuteNonQuery(insertQry);
                            ErrorLogString("WebLoginLog Table Insert query : " + insertQry + " - Return :" + reslt);

                        }

                        query = "select top " + attemptVaule + " LoginStatus from WebLoginLog where UserID='" + uname + "'  COLLATE Latin1_General_CS_AS and dtg >= DATEADD(MINUTE, -" + bufferTimeVaule + ",getdate()) order by dtg desc";
                        dt = GetQueryData(query);
                        int loginStatusCnt = 0;
                        if (dt.Rows.Count >= 1)
                        {
                            for (int i = 0; i < dt.Rows.Count; i++)
                            {
                                if (dt.Rows[i].ItemArray[0].ToString() == "Fail")
                                    loginStatusCnt++;
                            }
                        }
                        if (Convert.ToInt32(attemptVaule) <= loginStatusCnt)
                        {
                            if (Convert.ToInt32(attemptVaule) == loginStatusCnt)
                            {
                                var updatequery = "Update SalesAgent set Locked = '1' where UserID = '" + uname + "'  COLLATE Latin1_General_CS_AS and Active=1 ";
                                ExecuteNonQuery(updatequery);
                            }
                            ErrorLogString(uname + " This user is locked");
                               TempData["Message"] = "Your Account has been Locked.Please try after " + bufferTimeVaule + " mins";
                            return RedirectToAction("Login");
                        }
                    }
                    ErrorLogString("Log In Faild : Invalid Username/Password, Please Try Again" + " - logSteps - " + logStr);
                    TempData["Message"] = "Invalid Username/Password, Please Try Again";
                    return RedirectToAction("Login");
                }
            }
            catch (Exception ex)
            {
                SendErrorToText(ex);
                ErrorLogString(ex.Message + " - logSteps - " + logStr);
                TempData["Message"] = "Invalid Username/Password, Please Try Again";
                return RedirectToAction("Login");
            }
        }


        public void SendErrorToText(Exception ex)
        {
            var line = Environment.NewLine + Environment.NewLine;
            String ErrorlineNo, Errormsg, extype, exurl, hostIp, ErrorLocation;

            ErrorlineNo = ex.StackTrace.Substring(ex.StackTrace.Length - 7, 7);
            Errormsg = ex.GetType().Name.ToString();
            extype = ex.GetType().ToString();
            exurl = Request.Url.ToString();
            ErrorLocation = ex.Message.ToString();

            try
            {
                string error = "Log Written Date:" + " " + DateTime.Now.ToString() + line + "Error Line No :" + " " + ErrorlineNo + line + "Error Message:" + " " + Errormsg + line + "Exception Type:" + " " + extype + line + "Error Location :" + " " + ErrorLocation + line + " Error Page Url:" + " " + exurl + line;
                ErrorLogString("-----------Exception Details on " + " " + DateTime.Now.ToString() + "-----------------");
                ErrorLogString("-------------------------------------------------------------------------------------");
                ErrorLogString(line);
                ErrorLogString(error);
                ErrorLogString("--------------------------------*End*------------------------------------------");
                ErrorLogString(line);

               // ErrorLogString(ex.Message + " - logSteps - " + logStr);

                //string filepath = Server.MapPath("~/ViewErrorLogFiles/");  //Text File Path

                //if (!Directory.Exists(filepath))
                //{
                //    Directory.CreateDirectory(filepath);

                //}
                //filepath = filepath + DateTime.Today.ToString("dd-MM-yy") + ".txt";   //Text File Name
                //if (!File.Exists(filepath))
                //{


                //    File.Create(filepath).Dispose();

                //}
                //using (StreamWriter sw = File.AppendText(filepath))
                //{
                //    string error = "Log Written Date:" + " " + DateTime.Now.ToString() + line + "Error Line No :" + " " + ErrorlineNo + line + "Error Message:" + " " + Errormsg + line + "Exception Type:" + " " + extype + line + "Error Location :" + " " + ErrorLocation + line + " Error Page Url:" + " " + exurl + line;
                //    sw.WriteLine("-----------Exception Details on " + " " + DateTime.Now.ToString() + "-----------------");
                //    sw.WriteLine("-------------------------------------------------------------------------------------");
                //    sw.WriteLine(line);
                //    sw.WriteLine(error);
                //    sw.WriteLine("--------------------------------*End*------------------------------------------");
                //    sw.WriteLine(line);
                //    sw.Flush();
                //    sw.Close();

                //}

            }
            catch (Exception e)
            {
               // e.ToString();

            }
        }

        /// <summary>
        /// MFAloginform
        /// </summary>
        /// <returns></returns>
        public ActionResult MFAloginform()
        {
            try
            {
                var query1 = "select Isnull(CompanyName,'') as CompanyName  from system";
                DataTable td1 = GetQueryData(query1);
                if (td1.Rows.Count >= 1)
                    Session["CompanyName"] = td1.Rows[0].ItemArray[0].ToString();

                else
                    Session["CompanyName"] = "";

                Session["LogInType"] = BusinessRule.LogInType.MFA.ToString();
                ErrorLogString("MFAloginform function start");

                string uname = "";

                if (ConfigurationManager.AppSettings["ProjectName"] == "PVMIGT" || ConfigurationManager.AppSettings["ProjectName"] == "PVMB")
                {

                    var userClaims = User.Identity as System.Security.Claims.ClaimsIdentity;
                    ErrorLogString("Given Name : " + userClaims?.FindFirst("givenname")?.Value);
                    ErrorLogString("Sur Name : " + userClaims?.FindFirst("surname")?.Value);
                    ErrorLogString("Email : " + userClaims?.FindFirst("mail")?.Value);
                    ErrorLogString("User Principal Name : " + userClaims?.FindFirst("userprincipalname")?.Value);


                    ViewBag.Name = userClaims?.FindFirst("givenname")?.Value;

                    ViewBag.Username = userClaims?.FindFirst("givenname")?.Value;
                    ErrorLogString("SurName : " + userClaims?.FindFirst("surname")?.Value);
                    uname = userClaims?.FindFirst("mail")?.Value;
                    uname = uname.Replace("live.com#", "");


                }
                else
                {
                    var userClaims = User.Identity as System.Security.Claims.ClaimsIdentity;

                    try
                    {
                        var identity = (ClaimsIdentity)User.Identity;
                        var NAM = identity.FindFirst(ClaimTypes.Name).Value;
                        ErrorLogString("Name n : " + NAM);
                    }
                    catch (Exception ex)
                    {
                        ErrorLogString("exception n : " + ex.ToString());
                        //throw;
                    }

                    ErrorLogString("Name : " + userClaims?.FindFirst("name")?.Value);
                    ////

                    ViewBag.Name = userClaims?.FindFirst("name")?.Value;
                    ErrorLogString("Name : " + userClaims?.FindFirst("name")?.Value);
                    // The 'preferred_username' claim can be used for showing the username
                    ViewBag.Username = userClaims?.FindFirst("preferred_username")?.Value;
                    ErrorLogString("Username : " + userClaims?.FindFirst("preferred_username")?.Value);

                    // The subject/ NameIdentifier claim can be used to uniquely identify the user across the web
                    ViewBag.Subject = userClaims?.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
                    ErrorLogString("Subject : " + userClaims?.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value);

                    // TenantId is the unique Tenant Id - which represents an organization in Azure AD
                    ViewBag.TenantId = userClaims?.FindFirst("http://schemas.microsoft.com/identity/claims/tenantid")?.Value;
                    ErrorLogString("TenantId : " + userClaims?.FindFirst("http://schemas.microsoft.com/identity/claims/tenantid")?.Value);
                    uname = userClaims?.FindFirst("preferred_username")?.Value;
                    uname = uname.Replace("live.com#", "");
                }


                /////////
                if (System.Text.RegularExpressions.Regex.IsMatch(HttpContext.Request.UserAgent, @"Edge\/\d+"))
                {
                    Session["WebBrowserName"] = "Edge";
                }
                else
                {
                    Session["WebBrowserName"] = Request.Browser.Browser;
                }

                // ErrorLogString("MFAloginform function start");
                ErrorLogString("Session[SolutionName] : " + ConfigurationManager.AppSettings["SolutionName"]);

                Session["SolutionName"] = ConfigurationManager.AppSettings["SolutionName"];
                Session["SaveImagePath"] = ConfigurationManager.AppSettings["configFile"].Replace("~", "..");

                Session["ProjectName"] = ConfigurationManager.AppSettings["ProjectName"];
                Session["URL"] = ConfigurationManager.AppSettings["UrlRPTImageString"];
                Session["URL1"] = ConfigurationManager.AppSettings["UrlRPTImageString1"];
                Session["PlanoGramURL"] = ConfigurationManager.AppSettings["PlanoGramURL"].ToString();

                //  var userClaims = User.Identity as System.Security.Claims.ClaimsIdentity;
                // string uname = User.Identity.Name;
                // string uname = userClaims?.FindFirst(System.IdentityModel.Claims.ClaimTypes.Name)?.Value;


                // string psw = collection.Get("psw");
                ErrorLogString("User Name : " + uname + " ; Password : ");
                ErrorLogString("Connection String : " + constr);



                var query = string.Empty;
                // uname = "ADMIN";
                if (BusinessRule._solutionName == "SALES-WEB-UL")
                    query = "select * from SalesAgent where UserID='" + uname + "'  and Active=1 and hierarchy > 20";
                else
                    query = "select * from SalesAgent where UserID='" + uname + "'  and Active=1  ";

                ErrorLogString("query : " + query);

                DataTable salesAgentData = GetQueryData(query);
                ErrorLogString("Execute row Count : " + salesAgentData.Rows.Count);

                if (salesAgentData.Rows.Count >= 1)
                {

                    Session["isLogin"] = true;
                    // CommonRule objCommonLevel = new CommonRule();
                    CommonRule._AccessLevel = salesAgentData.Rows[0].ItemArray[5] == null ? "" : salesAgentData.Rows[0].ItemArray[5].ToString();
                    Session["UserName"] = salesAgentData.Rows[0]["Name"].ToString(); //salesAgentData.Rows[0].ItemArray[1];
                    Session["AccessLevel"] = salesAgentData.Rows[0].ItemArray[5];
                    Session["AgentId"] = uname;

                    //Session["AgentId"] = salesAgentData.Rows[0].ItemArray[0]; 
                    //Session["UserName"] = uname;
                    Session["UserId"] = uname;

                    try

                    {
                        if (Session["ProjectName"].ToString().ToUpper() == "EBFF")
                            Session["UserId"] = salesAgentData.Rows[0]["Code"].ToString();
                    }
                    catch { }

                    Session["Language"] = "English";
                    CommonRule._Language = "English";

                    Session["SalesAgentCode"] = salesAgentData.Rows[0].ItemArray[0];
                    Session["Department"] = salesAgentData.Rows[0].ItemArray[27].ToString();


                    //if (Session["ProjectName"].ToString().ToUpper() == "BANGALA")
                    //{
                    //    var lang = salesAgentData.Rows[0]["Language"].ToString();
                    //    Session["Language"] = (lang == null || lang == "") ? "English" : lang;
                    //    CommonRule._Language = (lang == null || lang == "") ? "English" : lang;
                    //}

                    if (Session["ProjectName"].ToString().ToUpper() == "MM" || Session["ProjectName"].ToString().ToUpper() == "BANGALA" || Session["ProjectName"].ToString().ToUpper() == "PVMB"
                        || Session["ProjectName"].ToString().ToUpper() == "SMILINGFISH")
                    {
                        var lang = salesAgentData.Rows[0]["Language"].ToString();
                        Session["Language"] = (lang == null || lang == "") ? "English" : lang;
                        CommonRule._Language = (lang == null || lang == "") ? "English" : lang;
                    }
                    _userId = uname;
                    Session["IsShowMenu"] = true;
                    // COMMENTED NEW SESSION VARIABLE
                    Session["IsFromMobile"] = false;
                    Session["UserAccessLevelQuery"] = "in (select groupid from salesmangroup where userid='" + uname + "')";

                    query = "select * from System where MDTNo='" + uname + "'";
                    DataTable systemData = GetQueryData(query);
                    if (systemData.Rows.Count >= 1)
                    {
                        var jsonData = JsonConvert.SerializeObject(systemData);
                        jsonData = jsonData.Replace("[", "").Replace("]", "");
                        SystemConfig = JsonConvert.DeserializeObject(jsonData);
                    }

                    query = "select IsAccessLevel from system";
                    DataTable td = GetQueryData(query);
                    if (td.Rows.Count >= 1)
                        Session["IsAccessLevel"] = td.Rows[0].ItemArray[0].ToString() == "True" ? "1" : "0";

                    else
                        Session["IsAccessLevel"] = "0";


                    //GetYearLimit from SystemList Table
                    _commonRule.getYearPickerLimit(BusinessRule._solutionName);
                    ErrorLogString("LogIn function End");

                    //return RedirectToAction("FormClickEvent", "Form", new { ScreenName = "", FieldName = "", FormView = "", query = "" });
                    return RedirectToAction("FormClickEvent", "Form", new { ScreenName = "Web_DashBoard", FieldName = "", FormView = "", query = "" });
                    //return RedirectToAction("FormClickEvent", "Form", new { ScreenName = "LineChart_DashBoard", FieldName = "LineChart", FormView = "", query = "" });
                    // return RedirectToAction("DashBoard", "DashBoard");
                }
                else
                {
                    ErrorLogString("Log In Faild : Invalid Username/Password, Please Try Again");
                    TempData["Message"] = "Invalid Username/Password, Please Try Again";
                    return RedirectToAction("SignOut", "Home");
                }

            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                TempData["Message"] = "Invalid Username/Password, Please Try Again";
                //return RedirectToAction("SignOut", "Home");
                return RedirectToAction("SignIn", "Home");
            }
        }

        public bool CheckPassword(string password)
        {
            Regex regex = new Regex("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@$!%*?&+=#]) [A-Za-z\\d$@$!%*?&+=#]{8,50}$");
            Match match = regex.Match(password);

            if (match.Success)
                return false;
            else return false;
        }

        public string GetSystemList()
        {
            var query = "select * from SystemList";
            var dataList = _commonRule.getValueList(query);
            return dataList;
        }
        public string GetDeviceSystemList()
        {
            var query = "select * from DeviceSystemList";
            var dataList = _commonRule.getValueList(query);
            return dataList;
        }
        public string AssignSLandDSL(string ObjData)
        {
            if (ObjData != "" && ObjData != null)
            {
                systemTableConfig = JsonConvert.DeserializeObject(ObjData);
                Session["systemTableConfig"] = ObjData;
            }
            return string.Empty;
        }
        public DataTable GetQueryData(string query)
        {
            DataTable dt = new DataTable();
            SqlConnection con = new SqlConnection(constr);
            con.Close();
            ErrorLogString("Connection String: " + constr + "\nQuery: " + query);
            try
            {
                DataTable dtSNo = new DataTable();
                //  dtSNo = db.retsulDataTable(SqlQry);
                DataSet ds = new DataSet();
                con.Open();
                SqlDataAdapter sda = new SqlDataAdapter(query, con);
                sda.SelectCommand.CommandTimeout = 60;// 600;  //30*60=1800 // 60- seconds
                sda.Fill(ds);
                con.Close();
                dt = ds.Tables[0];
                return dt;
            }
            catch (Exception ex)
            {
                ErrorLogString("Connection String Exception: " + ex.Message);
                ErrorLog(ex);
            }
            finally
            {
                con.Close();
            };
            return dt;
        }
        public string ExecuteNonQuery(string sqlqry)
        {
            string result = "";
            SqlConnection con = new SqlConnection(constr);
            con.Open();
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = con;
            try
            {
                cmd.CommandText = sqlqry;
                cmd.CommandTimeout = 1800;
                cmd.ExecuteNonQuery();
                result = "1";
            }
            catch (Exception ex)
            {
                result = ex.Message;
            }
            finally
            {
                con.Close();
            };
            return result;
        }
        public void SaveWebtoolAuditlog(string activityType)
        {
            try
            {
                var projectName = ConfigurationManager.AppSettings["ProjectName"];
                if (projectName.ToString() == "jsu")
                {
                    var currentDateTime = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss.fff");
                    var userId = Session["UserId"];
                    var query = "insert into webtoolAuditlog(TableName, UserID, DTG, ActivityType, RefNo, TransNo, AgentCode, ScreenName)";
                    query += " select '" + activityType + "',UserID,'" + currentDateTime + "','" + activityType + "','','',code,'' from salesagent where UserID = '" + userId + "'";
                    var dataList = _commonRule.getValueList(query);
                }
            }
            catch (Exception ex)
            {
            }
        }

        public ActionResult ForgotPassword(string userId)
        {
            ViewBag.userId = userId;
            return View();
        }

        private string SendSMSPH(string source,string cName,string mobileNo, string message)
        {
            var otp = message;
            string msgSMS = "";
            string apiKey = "71c7810bcf974da7835f20604ca39b6d";
            //message = message + " is your One - Time Password to complete your registration and it is valid for 180 seconds. - ";//{ { SPECIAL_CODE} }
            //message = message + " is your One - Time Password to complete your registration and it is valid for 180 seconds.If you did not request for an OTP, kindly ignore this SMS.";
            //var otpMsg = "720505 is your One - Time Password to complete your registration and it is valid for 180 seconds.If you did not request for an OTP, kindly ignore this SMS.";
            if (source == "FP")
            {
                msgSMS = "Simplr - Temporary Password";

                msgSMS = msgSMS  + "  Hi " + cName + " " + ", \n\n";
                msgSMS = msgSMS + " To authenticate, please use the following Temporary Password: \n\n";
                msgSMS = msgSMS + " " + message + " \n\n";
                msgSMS = msgSMS + " Don't share this Temporary Password with anyone.  \n";
                msgSMS = msgSMS + " \n \n ";
                msgSMS = msgSMS + " Thanks,  \n";
                msgSMS = msgSMS + " Team Simplr  \n";
            }
            else if(source=="MFA")
            {
                msgSMS = "Simplr - Multifactor Authentication";

                msgSMS = msgSMS + "  Hi " + cName + " " + ", \n\n";
                msgSMS = msgSMS + " Enter this code in your Simplr app to log in to your account : \n\n";
                msgSMS = msgSMS + " " + message + " \n\n";
                msgSMS = msgSMS + " Please don’t share this code with anyone.  \n";
                msgSMS = msgSMS + " \n \n ";
                msgSMS = msgSMS + " Thanks,  \n";
                msgSMS = msgSMS + " Team Simplr  \n";

            }

            try
            {
                var sysValue = "";
                var qry = "select SystemValue from SystemList where Code = 'SMS_ANDROID' ";

                DataTable dt = GetQueryData(qry);
                if (dt.Rows.Count > 0)
                {
                    sysValue = dt.Rows[0].ItemArray[0].ToString();
                }
                //DataTable _dataTable = SqlHelper.ExecuteDatatable(CommandType.Text, qry);

                //if (dataTable != null && dataTable.Rows.Count > 0)
                //{
                //    sysValue = _dataTable.Rows[0]["SystemValue"].ToString();
                //}
                message = message + sysValue;

                using (System.Net.WebClient client = new System.Net.WebClient())
                {
                    byte[] response =
                    client.UploadValues("https://semaphore.co/api/v4/messages", new System.Collections.Specialized.NameValueCollection()
                    {
               { "apikey",apiKey  },
               { "number", mobileNo },
               { "message", message },
               //{ "sendername", "SEMAPHORE" },
               { "sendername", "MyKitaa" },
                    });
                    string result = System.Text.Encoding.UTF8.GetString(response);


                    if (tmpMsg == "")
                        tmpMsg = "OTP is sent via SMS";
                    else
                        tmpMsg = tmpMsg + " & SMS";


                    if (ViewBag.MFAMsg == "")
                        ViewBag.MFAMsg = "OTP is sent via SMS";
                    else
                        ViewBag.MFAMsg = ViewBag.MFAMsg + " & SMS";

                    
                    try
                    {
                        var updateQuery = "Update OTPStorage set response_return_time = GETDATE() where ID = '" + mobileNo.Remove(0, 3) + "' and OTP='" + otp + "'";
                        ExecuteNonQuery(updateQuery);
                        //SqlHelper.ExecuteScalar(CommandType.Text, updateQuery);
                    }
                    catch (Exception ex)
                    {
                        // InsertLog("SendSMSPH : updateQuery Exception" + ex.Message);
                    }
                    // InsertLog("SendSMSPH : Response " + result);
                    return "0";
                }
            }
            catch (Exception ex)
            {
                //InsertLog("SendSMSPH : Exception " + ex.Message);
                return "1";
            }
            return string.Empty;
        }
        public JsonResult UpdateForgetPassword(int otp, string userId, string password, string type)
        {
            bool isveryfy = false;
            try
            {

                //var query = " select UserID from ForgotPassword where  UserID = '" + userId + "' and OTP='" + otp + "' ";
                //DataTable dt = GetQueryData(query);
                //if (dt.Rows.Count > 0)
                //{
                //    isveryfy = true;
                //}
                //else
                //    return Json(2);

                //if (type == "1")
                //{
                //    if (isveryfy)
                //        return Json(1);
                //    else
                //        return Json(0);
                //}

                var qry = " update a set Password = '" + password + "' from salesagent a where UserID = '" + userId + "'; Update OtpMFA set Verify=1,ChangedPassword ='" + password + "', PasswordUpdatedOn =GETDATE() where UserID ='" + userId + "' ";
                ExecuteNonQuery(qry);
                return Json(1);

            }
            catch (Exception)
            {
                return Json(0);
            }
        }

        public JsonResult UpdateForgetPasswordSendMail(string sAgentid)
        {
            //SqlConnection sqlConn = new SqlConnection(constr);
            //SqlCommand sqlComm = new SqlCommand();
            //SqlTransaction sqlTran;
            
            string sSql;
            string email = "";
            string pwd = "";
            String phone = "";
            string cName = "";
            //sqlConn.Open();
            ////sqlTran = sqlConn.BeginTransaction
            //sqlComm.Connection = sqlConn;
            //sqlComm.Transaction = sqlTran;
            DataTable dt = new DataTable();
            try
            {
                //SqlDataReader dtrRead;
                // sSql = "Select top 1 password,email from salesagent where UserID = " & SafeSQL(sAgentid)
                // 'Chnaged on 7 July 2023 from UserID to Code by Jenietta
                sSql = "Select top 1 email,phone,name from salesagent where userid = '" + sAgentid + "'";

                dt = GetQueryData(sSql);
                //InsertErrorMessage("", DateTime.Now, "Update Forget Password", sSql);

                //sqlComm.CommandText = sSql;
                //dtrRead = sqlComm.ExecuteReader;
                email = ""; phone = ""; cName = "";

                if (dt.Rows.Count > 0)
                {
                    email = dt.Rows[0].ItemArray[0].ToString();//dtrRead("email").ToString;
                    phone = dt.Rows[0].ItemArray[1].ToString();// dtrRead("password").ToString;
                    cName = dt.Rows[0].ItemArray[2].ToString();

                }

                Session["Msg"] = "No Registered Email ID & Contact no.";
                tmpMsg = "No Registered Email ID";
                //InsertErrorMessage("", DateTime.Now, "Update Forget Password", "Email :" + email + ", Password: " + pwd);
                //dtrRead.Close();
                // 'credentials changed and hence Gmail password changed by Jenietta on Feb 20,2023 from Simplr@123 to oilixdmdnatpvugi

                string otpMethod = "";

                var query = "select SystemValue from systemlist  where Code = 'ForgetPassword WebTool Method'";
                DataTable dt1 = GetQueryData(query);
                if (dt1.Rows.Count > 0)
                {
                    otpMethod = dt1.Rows[0].ItemArray[0].ToString();
                }

                // pwd = GenerateRandomPassword();

                Random rnd = new Random();
                pwd = rnd.Next(1000, 9999).ToString();

                Session["RandomPwd"] = pwd;

                if (email != "" && otpMethod != "")
                {

                    if ((otpMethod.ToUpper() == "MAIL" || otpMethod.ToUpper() == "BOTH") && email != "")
                    {


                        // Random rnd = new Random();
                        // pwd = rnd.Next(1000, 9999).ToString();

                        // ' sSql = "update Salesagent set Password=" & SafeSQL(pwd) & ",LockUser=0,Locked=0 Where UserID=" & SafeSQL(sAgentid)
                        //sSql = "update Salesagent set Password=" + (pwd) + ",LockUser=0,Locked=0 Where Code=" + SafeSQL(sAgentid);
                        //InsertErrorMessage("", DateTime.Now, "Update Forget Password", sSql);
                        //sqlComm.CommandText = sSql;
                        //sqlComm.ExecuteNonQuery();

                        System.Net.Mail.SmtpClient Smtp_Server = new System.Net.Mail.SmtpClient();
                        System.Net.Mail.MailMessage e_mail = new System.Net.Mail.MailMessage();
                        try
                        {
                            Smtp_Server.UseDefaultCredentials = false;

                            if (Session["ProjectName"].ToString().ToUpper() == "SELASIHAMAN")
                                Smtp_Server.Credentials = new System.Net.NetworkCredential("noreply.simplrselasihaman@gmail.com", "abycbvehjhpayzhj");
                            else if (Session["ProjectName"].ToString().ToUpper() == "PVMB")
                                Smtp_Server.Credentials = new System.Net.NetworkCredential("noreplysimplrpvmb@gmail.com", "cpxnozlcdnxplytp");
                            else if (Session["ProjectName"].ToString().ToUpper() == "FGV") 

                                Smtp_Server.Credentials = new System.Net.NetworkCredential("simplrfgv@gmail.com", "fhpydflvkxjjlyvo");
                            else if (Session["ProjectName"].ToString().ToUpper() == "EBFF")

                                Smtp_Server.Credentials = new System.Net.NetworkCredential("noreply.simplrebfrozenfood@gmail.com", "zdpqacrrjplqiaao");
                            else if (Session["ProjectName"].ToString().ToUpper() == "EONMETALL")

                                Smtp_Server.Credentials = new System.Net.NetworkCredential("simplreonmetalluat@gmail.com", "jihddfkyfvpeeieh");
                            else if (Session["ProjectName"].ToString().ToUpper() == "FFB")
                                Smtp_Server.Credentials = new System.Net.NetworkCredential("simplrstandard@gmail.com", "oxjf emwt meyq njui");
                            else if (Session["ProjectName"].ToString().ToUpper() == "STANDARD")
                                Smtp_Server.Credentials = new System.Net.NetworkCredential("simplrstandard@gmail.com", "oxjf emwt meyq njui");
                            else
                                Smtp_Server.Credentials = new System.Net.NetworkCredential("noreplysimplr@gmail.com", "oilixdmdnatpvugi");

                            Smtp_Server.Port = 587; // "587"
                            Smtp_Server.EnableSsl = true;
                            Smtp_Server.Host = "smtp.gmail.com";
                            e_mail = new System.Net.Mail.MailMessage();

                            if (Session["ProjectName"].ToString().ToUpper() == "SELASIHAMAN")
                                e_mail.From = new System.Net.Mail.MailAddress("noreply.simplrselasihaman@gmail.com");
                            else if (Session["ProjectName"].ToString().ToUpper() == "PVMB")
                                e_mail.From = new System.Net.Mail.MailAddress("noreplysimplrpvmb@gmail.com");
                            else if (Session["ProjectName"].ToString().ToUpper() == "FGV")
                                e_mail.From = new System.Net.Mail.MailAddress("simplrfgv@gmail.com");
                            else if (Session["ProjectName"].ToString().ToUpper() == "EBFF")
                                e_mail.From = new System.Net.Mail.MailAddress("noreply.simplrebfrozenfood@gmail.com");
                            else if (Session["ProjectName"].ToString().ToUpper() == "EONMETALL")
                                e_mail.From = new System.Net.Mail.MailAddress("simplreonmetalluat@gmail.com");
                            else if (Session["ProjectName"].ToString().ToUpper() == "FFB")
                                e_mail.From = new System.Net.Mail.MailAddress("simplrstandard@gmail.com");
                            else if (Session["ProjectName"].ToString().ToUpper() == "STADARD")
                                e_mail.From = new System.Net.Mail.MailAddress("simplrstandard@gmail.com");
                            else
                                e_mail.From = new System.Net.Mail.MailAddress("noreplysimplr@gmail.com");

                            e_mail.To.Add(email);
                            e_mail.Subject = "Simplr - Temporary Password";
                            e_mail.IsBodyHtml = false;

                            e_mail.DeliveryNotificationOptions = DeliveryNotificationOptions.OnFailure;

                            e_mail.Body = "  Hi " + cName + " " + ", \n\n";
                            e_mail.Body += " To authenticate, please use the following Temporary Password: \n\n";
                            e_mail.Body += " " + pwd + " \n\n";
                            e_mail.Body += " Don't share this Temporary Password with anyone.  \n";
                            e_mail.Body += " \n \n";
                            e_mail.Body += " Thank you,  \n";

                            if (Session["ProjectName"].ToString().ToUpper() == "EBFF")
                                e_mail.Body += " EB Frozen Food Sdn. Bhd \n";
                            else if (Session["ProjectName"].ToString().ToUpper() == "FGV" || Session["ProjectName"].ToString().ToUpper() == "EONMETALL")
                                e_mail.Body = e_mail.Body;
                            else
                                e_mail.Body += " Team Simplr  \n";

                            Smtp_Server.SendCompleted += new SendCompletedEventHandler(smtp_SendCompleted);
                            System.Threading.Thread.Sleep(1000);

                            Smtp_Server.Send(e_mail);

                            e_mail.Dispose();
                            Smtp_Server.Dispose();
                            tmpMsg = "Temporary Password is sent via Email";

                        }
                        catch (Exception exx)
                        {
                            tmpMsg = "Failed to send Email";
                            e_mail.Dispose(); Smtp_Server.Dispose();
                        }

                        ////////System.Net.Mail.SmtpClient Smtp_Server = new System.Net.Mail.SmtpClient();
                        ////////System.Net.Mail.MailMessage e_mail = new System.Net.Mail.MailMessage();
                        ////////Smtp_Server.UseDefaultCredentials = false;
                        ////////Smtp_Server.Credentials = new System.Net.NetworkCredential("noreplysimplr@gmail.com", "oilixdmdnatpvugi");
                        ////////Smtp_Server.Port = 587; // "587"
                        ////////Smtp_Server.EnableSsl = true;
                        ////////Smtp_Server.Host = "smtp.gmail.com";
                        ////////e_mail = new System.Net.Mail.MailMessage();
                        ////////e_mail.From = new System.Net.Mail.MailAddress("noreplysimplr@gmail.com");
                        ////////e_mail.To.Add(email);
                        ////////e_mail.Subject = "Simplr - Forgot Password";

                        ////////e_mail.Body = "  Hi " + cName + " " + ", \n\n";
                        ////////e_mail.Body += " To authenticate, please use the following One Time Password (OTP): \n\n";
                        ////////e_mail.Body += " " + pwd + " \n\n";
                        ////////e_mail.Body += " Don't share this OTP with anyone.  \n";
                        ////////e_mail.Body += " \n \n ";
                        ////////e_mail.Body += " Thanks,  \n";
                        ////////e_mail.Body += " Team Simplr  \n";
                        ////////Smtp_Server.Send(e_mail);

                        ////////tmpMsg = "OTP is sent via Email";
                        //SendSMSPH(phone, pwd);

                        // var qry = "Delete from ForgotPassword where UserID='" + sAgentid + "' ; Insert into ForgotPassword (UserID, OTP,Verify,VerifiedDate ) values ('" + sAgentid + "','" + pwd + "',0,GETDATE())";


                        // Session["Msg"] = tmpMsg;
                        // return Json(tmpMsg);
                    }

                    if ((otpMethod.ToUpper() == "SMS" || otpMethod.ToUpper() == "BOTH") && phone != "")
                        SendSMSPH("FP", cName, phone, pwd);


                    var qry = "  update a set Password = '" + pwd + "',Resetpass=1 from salesagent a where UserID = '" + sAgentid + "' ";
                    // Update ForgotPassword set ChangedPassword ='" + pwd + "', PasswordUpdatedOn =GETDATE() where UserID ='" + sAgentid + "' ";
                    ExecuteNonQuery(qry);
                }
                //else
                //{
                //sqlTran.Rollback();
                //InsertErrorMessage("", DateTime.Now, "Update Forget Password", "Email ID is not provided for the Agent");
                // return Json(false);
                //}
                // sSql = "Update SalesAgent Set ForgetPassword=1 where Code=" & SafeSQL(sAgentid)
                // sqlComm.CommandText = sSql
                // sqlComm.ExecuteNonQuery()

                // INSERT INTO WEBLOG
                // sSql = "Insert into WebLog(TableName,MdtNo,LogDt,ActivityType,RecValue) values('SalesAgent'," & SafeSQL("") & ",getdate(),'UpdateLoginCount'," & SafeSQL(sAgentid) & ")"
                // InsertErrorMessage("", Date.Now, "Update Forget Password", sSql)
                // sqlComm.CommandText = sSql
                // sqlComm.ExecuteNonQuery()
                //sqlTran.Commit();
                // return Json(true);
                //  Session["Msg"] = tmpMsg;
                // return Json(tmpMsg);
            }
            catch (Exception ex)
            {
                ErrorLogString("Update Forget Password: " + ex.Message);
                ErrorLog(ex);
                //Session["Msg"] = tmpMsg;
                //return Json(tmpMsg);
                //InsertErrorMessage("", DateTime.Now, "Error in Update Forget Password", sSql + ex.Message);
                //return Json(false);
            }

            //Session["Msg"] = tmpMsg;
            return Json(tmpMsg);

        }

        [HttpPost]
        public JsonResult SendOTPEmail(string sAgentScreen,string sAgentID, string sAgentOTP)
        {
            string returnMsg = ""; string email = ""; string cName = "";

            if (sAgentScreen == "OTPForm")
            {
                try
                {
                    string query;
                    query = "select * from salesagent where code like '" + sAgentID + "'";
                    DataTable dt = GetQueryData(query);
                    if (dt.Rows[0]["Email"].ToString() == "")
                        returnMsg = "No Registered Email";
                    else
                    {
                        email = dt.Rows[0]["Email"].ToString();
                        cName = dt.Rows[0]["Name"].ToString();
                        System.Net.Mail.SmtpClient Smtp_Server = new System.Net.Mail.SmtpClient();
                        System.Net.Mail.MailMessage e_mail = new System.Net.Mail.MailMessage();
                        try
                        {
                           
                            Smtp_Server.UseDefaultCredentials = false;
                            Smtp_Server.Credentials = new System.Net.NetworkCredential("noreplysimplrfrostfood@gmail.com", "mgzbscmwoyymcjii");
                            Smtp_Server.Port = 587; // "587"
                            Smtp_Server.EnableSsl = true;
                            Smtp_Server.Host = "smtp.gmail.com";
                            e_mail = new System.Net.Mail.MailMessage();
                            e_mail.From = new System.Net.Mail.MailAddress("noreplysimplrfrostfood@gmail.com");
                            e_mail.To.Add(email);

                            e_mail.Subject = "Simplr - One Time Password";
                            e_mail.IsBodyHtml = false;

                            e_mail.DeliveryNotificationOptions = DeliveryNotificationOptions.OnFailure;
                            e_mail.Body = "  Hi " + cName + " " + ", \n\n";
                            e_mail.Body += " Your One Time Password (OTP) is : \n\n";
                            e_mail.Body += " " + sAgentOTP + " \n\n";
                            e_mail.Body += " Please don’t share this OTP with anyone.  \n";
                            e_mail.Body += " \n \n ";
                            e_mail.Body += " Thanks,  \n";
                            e_mail.Body += " Team Simplr  \n";

                            System.Threading.Thread.Sleep(1000);
                            Smtp_Server.Send(e_mail);
                            e_mail.Dispose();
                            Smtp_Server.Dispose();
                            returnMsg = "OTP is sent via Email";
                            try
                            {
                                ExecuteNonQuery("update onetimepassword set IsUsed=1 where AgentId like '" + sAgentID + "' and OneTimePassword like '" + sAgentOTP + "'");
                            }
                            catch (Exception err)
                            {

                            }
                        }
                        catch (Exception exx)
                        {
                            returnMsg = "Failed to send Email";
                            e_mail.Dispose(); Smtp_Server.Dispose();
                        }

                    }
                }
                catch (Exception ex)
                {
                    returnMsg = "Failed to get Agent Email - " + sAgentID;
                }
            }
            else if(sAgentScreen == "CustomerFeedbackList")
            {
                try
                {
                    string query;
                    query = "select * from AssignEmail where Name like '" + sAgentID + "'";
                    DataTable dt = GetQueryData(query);
                    if (dt.Rows[0]["Email"].ToString() == "")
                        returnMsg = "No Registered Email";
                    else
                    {
                        email = dt.Rows[0]["Email"].ToString();
                        cName = dt.Rows[0]["Name"].ToString();
                        System.Net.Mail.SmtpClient Smtp_Server = new System.Net.Mail.SmtpClient();
                        System.Net.Mail.MailMessage e_mail = new System.Net.Mail.MailMessage();
                        try
                        {
                            Smtp_Server.UseDefaultCredentials = false;
                            // Smtp_Server.Credentials = new System.Net.NetworkCredential("noreplysimplr@gmail.com", "oilixdmdnatpvugi");
                            Smtp_Server.Credentials = new System.Net.NetworkCredential("noreply@simplrscm.com", "EYNMw,ndMx[Q");
                            // Smtp_Server.Port = 465;
                            Smtp_Server.Port = 587; // "587"
                            Smtp_Server.EnableSsl = true;
                            //Smtp_Server.Host = "smtp.gmail.com";
                            Smtp_Server.Host = "mail.simplrscm.com";
                            Smtp_Server.DeliveryMethod = SmtpDeliveryMethod.Network;

                            e_mail = new System.Net.Mail.MailMessage();
                            //e_mail.From = new System.Net.Mail.MailAddress("noreplysimplr@gmail.com");
                            e_mail.From = new System.Net.Mail.MailAddress("noreply@simplrscm.com");
                            e_mail.To.Add(email);

                            e_mail.Subject = "Simplr - Customer Feedback";
                            e_mail.IsBodyHtml = true;

                            string emailBody = "";
                            try
                            {
                                query = "select * from CUSTOMERFEEDBACK WHERE TRANSNO LIKE '" + sAgentOTP + "'";
                                DataTable dt1 = GetQueryData(query);
                                if (dt1.Rows.Count > 0)
                                {
                                    emailBody = "<html><head></head><body><div style=\"border-style:solid\"><h2 style=\"background-color:DarkTurquoise;color:white;text-align:center;font-family:Calibri;\">FEEDBACK</h2>";
                                    emailBody += "<table style=\"width:100%;font-family:Calibri;font-weight:bold\">";
                                    emailBody += "<tr><td>Transaction No:<br><span style=\"color: blue; \">" + dt1.Rows[0]["TransNo"].ToString() + "</span></td><td>Transaction Date:<br><span style=\"color: blue; \">" + dt1.Rows[0]["TransDate"].ToString() + "</span></td></tr>";
                                    emailBody += "<tr><td>Customer No:<br><span style = \"color:blue;\">" + dt1.Rows[0]["CustNo"].ToString() + "</span></td><td>Concern:<br><span style=\"color: blue; \">" + dt1.Rows[0]["Concern"].ToString() + "</span></td></tr>";
                                    emailBody += "<tr><td>Brand:<br><span style = \"color:blue;\">" + dt1.Rows[0]["Brand"].ToString() + "</span></td><td>Manufactured Date:<br><span style=\"color: blue; \">" + dt1.Rows[0]["ManufacturedDate"].ToString()  + "</span></td></tr>";
                                    emailBody += "<tr><td>Flavor:<br><span style = \"color:blue;\">" + dt1.Rows[0]["Flavor"].ToString() + "</span></td><td>Batch No:<br><span style=\"color: blue; \">" + dt1.Rows[0]["BatchNo"].ToString() + " </span></td></tr>";
                                    emailBody += "<tr><td>Pack:<br><span style = \"color:blue;\">" + dt1.Rows[0]["Pack"].ToString() + " </span></td><td>Manufacturing location:<br><span style=\"color: blue; \">" + dt1.Rows[0]["ManufacturedLocation"].ToString() + " </span></td></tr>";
                                    emailBody += "<tr><td>Content:<br><span style = \"color:blue;\">" + dt1.Rows[0]["Content"].ToString() + " </span></td><td>Feedback:<br><span style=\"color: blue; \">" + dt1.Rows[0]["Feedback"].ToString() + " </span></td></tr>";
                                    emailBody += "<tr><td>Category:<br><span style = \"color:blue;\">" + dt1.Rows[0]["Category"].ToString() + "</span></td><td>No. Of Unit:<br><span style=\"color: blue; \">" + dt1.Rows[0]["NoOfUnit"].ToString() + " </span></td></tr>";
                                    emailBody += "<tr><td>Product Name:<br><span style = \"color:blue;\">" + dt1.Rows[0]["ProductName"].ToString() + "</span></td><td>Brand:<br><span style=\"color: blue; \">" + dt1.Rows[0]["Brand"].ToString() + " </span></td></tr>";
                                    emailBody += "<tr><td>Comments:<br><span style = \"color:blue;\">" + dt1.Rows[0]["Comments"].ToString() + " </span></td><td>Remarks:<br><span style=\"color: blue; \">" + dt1.Rows[0]["Remarks"].ToString() + " </span></td></tr>";
                                    emailBody += "<tr><td>SalesMan:<br><span style = \"color:blue;\">" + dt1.Rows[0]["AgentId"].ToString() + " </span></td><td>Name:<br><span style=\"color: blue; \">" + dt1.Rows[0]["Name"].ToString() + " </span></td></tr>";
                                    emailBody += "<tr><td>Created By:<br><span style = \"color:blue;\">" + dt1.Rows[0]["CreatedBy"].ToString() + " </span></td><td>Created Date:<br><span style=\"color: blue; \">" + dt1.Rows[0]["CreatedDate"].ToString() + " </span></td></tr>";
                                    emailBody += "<tr><td>Mail Id:<br><span style = \"color:blue;\">" + dt1.Rows[0]["MailId"].ToString() + " </span></td><td>Phone No.:<br><span style=\"color: blue; \">" + dt1.Rows[0]["PhoneNo"].ToString() + " </span></td></tr>";
                                   // emailBody += "<tr><td>Customer No:<br><span style = \"color:blue;\">C05065C00002 </span></td><td>Concern:< br >< span style = \"color:blue;\" > Sample </span></td></tr>";
                                    emailBody += "</div><br><br>Thanks,  <br><b>Team Simplr</b></body></html>";
                                }
                                else
                                {
                                    returnMsg = "Transaction No is not valid!";
                                    goto lbl;
                                }
                            }
                            catch(Exception ex1)
                            {
                                returnMsg = "Transaction No is not valid!";
                                goto lbl;
                            }

                            e_mail.DeliveryNotificationOptions = DeliveryNotificationOptions.OnFailure;
                            e_mail.Body = emailBody;

                            System.Threading.Thread.Sleep(1000);
                            Smtp_Server.Send(e_mail);
                            e_mail.Dispose();
                            Smtp_Server.Dispose();
                            returnMsg = "OTP is sent to the " + cName + " via Email";
                            try
                            {
                                ExecuteNonQuery("insert into onetimepassword (AgentId,OneTimePassword,DTG,IsUsed) values('" + sAgentID + "','" + sAgentOTP + "',GetDate(),1)");
                            }
                            catch (Exception err)
                            {

                            }
                        }
                        catch (Exception exx)
                        {
                            returnMsg = "Failed to send Email to " + cName;
                            e_mail.Dispose(); Smtp_Server.Dispose();
                        }
                    }
                }
                catch(Exception ex)
                {

                }
            }
   lbl:        
            return Json(returnMsg);
        }

        void smtp_SendCompleted(object sender, System.ComponentModel.AsyncCompletedEventArgs e)
        {
            if (e.Cancelled == true || e.Error != null)
            {
                throw new Exception(e.Cancelled ? "EMail sedning was canceled." : "Error: " + e.Error.ToString());
            }
        }


        [HttpPost]
        public JsonResult MFAVerified(string userId)
        {

            if (Session["mfa"].ToString() == "0")
            {
                try
                {

                    var query = "select code from systemlist  where Code = 'MFA WebTool' and SystemValue='Yes'";
                    DataTable dt = GetQueryData(query);
                    if (dt.Rows.Count > 0)
                    {
                        //mail
                        var email = "";
                        var phone = "";
                        var pwd = "";
                        var cName = "";
                        var sSql = "Select top 1 email,phone,name from salesagent where Code = '" + userId + "'";
                        dt = GetQueryData(sSql);

                        if (dt.Rows.Count > 0)
                        {
                            email = dt.Rows[0].ItemArray[0].ToString();//dtrRead("email").ToString;
                            phone = dt.Rows[0].ItemArray[1].ToString();// dtrRead("password").ToString;
                            cName = dt.Rows[0].ItemArray[2].ToString();
                        }

                        string otpMethod = "";

                        query = "select SystemValue from systemlist  where Code = 'MFA WebTool Method'";
                        DataTable dt1 = GetQueryData(query);
                        if (dt1.Rows.Count > 0)
                        {
                            otpMethod = dt1.Rows[0].ItemArray[0].ToString();
                        }

                        Random rnd = new Random();
                        pwd = rnd.Next(1000, 9999).ToString();




                        ViewBag.MFAMsg = "No Registered Email ID & Contact no.";

                        if ((otpMethod.ToUpper() == "MAIL" || otpMethod.ToUpper() == "BOTH") && email != "")
                        {
                            //pwd = GenerateRandomPassword();
                          

                            System.Net.Mail.SmtpClient Smtp_Server = new System.Net.Mail.SmtpClient();
                            System.Net.Mail.MailMessage e_mail = new System.Net.Mail.MailMessage();
                            Smtp_Server.UseDefaultCredentials = false;
                            Smtp_Server.Credentials = new System.Net.NetworkCredential("noreplysimplr@gmail.com", "oilixdmdnatpvugi");
                            Smtp_Server.Port = 587; // "587"
                            Smtp_Server.EnableSsl = true;
                            Smtp_Server.Host = "smtp.gmail.com";
                            e_mail = new System.Net.Mail.MailMessage();
                            e_mail.From = new System.Net.Mail.MailAddress("noreplysimplr@gmail.com");
                            e_mail.To.Add(email);

                            e_mail.Subject = "Simplr - Multifactor Authentication";

                            e_mail.Body = "  Hi " + cName + " " + ", \n\n";
                            e_mail.Body += " Enter this code in your Simplr app to log in to your account : \n\n";
                            e_mail.Body += " " + pwd + " \n\n";
                            e_mail.Body += " Please don’t share this code with anyone.  \n";
                            e_mail.Body += " \n \n ";
                            e_mail.Body += " Thanks,  \n";
                            e_mail.Body += " Team Simplr  \n";

                            Smtp_Server.Send(e_mail);
                           
                            ViewBag.MFAMsg = "OTP is sent via EMail";
                            //Session["mfa"] = "1";

                           
                        }

                        Session["mfa"] = "1";

                        if ((otpMethod.ToUpper() == "SMS" || otpMethod.ToUpper() == "BOTH") && phone != "")
                            SendSMSPH("MFA",cName,phone,pwd);

                            var qry = "Delete from OtpMFA where UserID='" + userId + "' ; Insert into OtpMFA (UserID, OTP,Verify,VerifiedDate ) values ('" + userId + "','" + pwd + "',0,GETDATE())";
                        ExecuteNonQuery(qry);

                        return Json(ViewBag.MFAMsg);
                    }
                    else
                        return Json(0);

                }
                catch (Exception ex)
                {
                    ex = ex;
                    return Json(0);
                }
            }
            else
                return Json(0);
        }

        public JsonResult MFAVerifiedDB(string otp, string userId)
        {
            try
            {
                System.Threading.Thread.Sleep(1000);
                //return Json(1);
                var query = "select OTP from OtpMFA  where OTP = '" + otp + "' and UserID='" + userId + "'";
                DataTable dt = GetQueryData(query);
                if (dt.Rows.Count > 0)
                {
                    return Json(1);
                }
                else
                    return Json(0);

            }
            catch (Exception)
            {
                return Json(0);
            }
        }

        public JsonResult CheckValidUser1(string sAgentId)
        {
            try
            {
                var query = "";
                query = "select * from SalesAgent where UserID='" + sAgentId + "'  COLLATE Latin1_General_CS_AS and Active=1 ";
                DataTable dt_1 = GetQueryData(query);
                if(dt_1.Rows.Count > 0)
                {
                    return Json(1);
                }
                else
                {
                    TempData["Message"] = "Invalid Username, Please Try Again";
                    return Json("Invalid Username, Please Try Again");
                }
            }
            catch { }
            TempData["Message"] = "Invalid Username, Please Try Again";
            return Json("Invalid Username, Please Try Again");
        }

            public JsonResult CheckValidUser(string sAgentId, string sAgentPswd)
        {
            try
            {
                Boolean is_Locked = false;
                var query = "";
                if (BusinessRule._solutionName == "SALES-WEB-UL")
                    query = "select * from SalesAgent where UserID='" + sAgentId + "'  COLLATE Latin1_General_CS_AS and PassWord = '" + sAgentPswd + "' COLLATE Latin1_General_CS_AS and Active=1 and hierarchy > 20";
                else if (Session["ProjectName"].ToString().ToUpper() == "PVMB" || Session["ProjectName"].ToString().ToUpper() == "BANGALA")
                {
                    query = "select Code, SystemValue from systemlist where solutionname = 'sales-web' and code like '%IncorrectLogIn%'";
                    DataTable dt_1 = GetQueryData(query);
                    if (dt_1.Rows.Count >= 1)
                    {
                        bufferTimeVaule = Convert.ToInt32(dt_1.Rows[0].ItemArray[1].ToString());
                        attemptVaule = Convert.ToInt32(dt_1.Rows[1].ItemArray[1].ToString());
                    }

                    query = "select * from SalesAgent where UserID='" + sAgentId + "'  COLLATE Latin1_General_CS_AS and PassWord = '" + sAgentPswd + "' COLLATE Latin1_General_CS_AS  and Active=1 ";
                    DataTable dt_2 = GetQueryData(query);
                    if (dt_2.Rows.Count >= 1)
                    {
                        var isLocked = dt_2.Rows[0].ItemArray[32].ToString();
                        if (isLocked.ToLower() == "true" || isLocked == "1")
                        {
                            is_Locked = true;
                            query = "select top " + attemptVaule + " LoginStatus from WebLoginLog where UserID='" + sAgentId + "'  COLLATE Latin1_General_CS_AS and dtg >= DATEADD(MINUTE, -" + bufferTimeVaule + ",getdate()) order by dtg desc";
                            dt_2 = GetQueryData(query);
                            if (dt_2.Rows.Count != Convert.ToInt32(attemptVaule))
                            {
                                is_Locked = false;
                                var updatequery = "Update SalesAgent set Locked = '0' where UserID = '" + sAgentId + "'  COLLATE Latin1_General_CS_AS and Active=1 ";
                                ExecuteNonQuery(updatequery);
                            }
                        }
                        
                    }
                    query = "select * from SalesAgent where UserID='" + sAgentId + "' COLLATE Latin1_General_CS_AS and PassWord = '" + sAgentPswd + "' COLLATE Latin1_General_CS_AS   and Active=1 and isnull(Locked,0) <> 1 ";
                }
                //Added by Nisha 23-01-2024
                else if (Session["ProjectName"].ToString().ToUpper() == "PVMIGT" || Session["ProjectName"].ToString().ToUpper() == "FGV" || Session["ProjectName"].ToString().ToUpper() == "EBFF" || Session["ProjectName"].ToString().ToUpper() == "EONMETALL")
                {
                    query = "select Code, SystemValue from systemlist where (code like 'FailedLoginMaxCount' or code like 'IncorrectLogInBufferTime') order by code";
                    DataTable dt_1 = GetQueryData(query);
                    if (dt_1.Rows.Count >= 1)
                    {
                        bufferTimeVaule = Convert.ToInt32(dt_1.Rows[1]["SystemValue"].ToString()); //IncorrectLogInBufferTime
                        attemptVaule = Convert.ToInt32(dt_1.Rows[0]["SystemValue"].ToString()); //FailedLoginMaxCount
                    }

                    query = "select * from SalesAgent where UserID='" + sAgentId + "'  COLLATE Latin1_General_CS_AS and PassWord = '" + sAgentPswd + "' COLLATE Latin1_General_CS_AS  and Active=1 ";
                    DataTable dt_2 = GetQueryData(query);
                    if (dt_2.Rows.Count >= 1)
                    {
                        var isLocked = dt_2.Rows[0]["Locked"].ToString();
                        if (isLocked.ToLower() == "true" || isLocked == "1")
                        {
                            //query = "select top " + attemptVaule + " LoginStatus from WebLoginLog where UserID='" + sAgentId + "'  COLLATE Latin1_General_CS_AS and dtg >= DATEADD(MINUTE, -" + bufferTimeVaule + ",getdate()) order by dtg desc";
                            // dt_2 = GetQueryData(query);
                            //if (Convert.ToInt32(dt_2.Rows[0]["LoginAttempt"]) >= Convert.ToInt32(attemptVaule))
                            //{
                            //    var updatequery = "Update SalesAgent set Locked = '0' where UserID = '" + sAgentId + "'  COLLATE Latin1_General_CS_AS and Active=1 ";
                            //    ExecuteNonQuery(updatequery);
                            //}
                            is_Locked = true;
                            TempData["Message"] = "User is Locked! Please try after " + bufferTimeVaule + " Minutes!";
                            return Json("User is Locked! Please Contact Administrator!");
                        }
                        else
                        {
                            is_Locked = false;
                        }
                    }
                   
                    query = "select * from SalesAgent where UserID='" + sAgentId + "' COLLATE Latin1_General_CS_AS and PassWord = '" + sAgentPswd + "' COLLATE Latin1_General_CS_AS   and Active=1 and isnull(Locked,0) <> 1 ";
                }
                else
                    query = "select * from SalesAgent where UserID='" + sAgentId + "' COLLATE Latin1_General_CS_AS and PassWord = '" + sAgentPswd + "' COLLATE Latin1_General_CS_AS   and Active=1 ";

                DataTable salesAgentData = GetQueryData(query);
               
                if (salesAgentData.Rows.Count >= 1)
                {
                    if(is_Locked==true)
                    {
                        if (Session["ProjectName"].ToString().ToUpper() == "PVMB" || Session["ProjectName"].ToString().ToUpper() == "BANGALA")
                        {
                            TempData["Message"] = "User is Locked! Please try after " + bufferTimeVaule + " Minutes!";
                            return Json("User is Locked! Please try after " + bufferTimeVaule + " Minutes!");
                        }
                        else
                        {
                            TempData["Message"] = "User is Locked! Please Contact Administrator!";
                            return Json("User is Locked! Please Contact Administrator!");
                        }
                    }
                    else
                    return Json(1);
                }
                else
                {
                    TempData["Message"] = "Invalid Username/Password, Please Try Again";
                    return Json("Invalid Username/Password, Please Try Again");
                }
             }
            catch(Exception)
            {
                TempData["Message"] = "Invalid Username/Password, Please Try Again";
                return Json("Invalid Username/Password, Please Try Again");
            }
            
        }


    }


}
