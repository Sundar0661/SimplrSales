using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;

namespace SimplrSales.Controllers
{
    public class LoginController : BusinessRule
    {
        string constr = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
        public static int bufferTimeVaule = 0;
        public static int attemptVaule = 0;
        public object[] array = new object[] { };
        object MyDynamic1 = new object();
        Dictionary<string, string> dictionary = new Dictionary<string, string>();
        public ActionResult Login(string sessionexpired)
        {
            try
            {
                ErrorLogString("LogIn Page Start \nUser.Identity Name-Value-IsUser: " + User.Identity.Name + "-" + (User.Identity as System.Security.Claims.ClaimsIdentity)?.FindFirst("name")?.Value + "-" + (User.Identity as System.Security.Claims.ClaimsIdentity)?.FindFirst("name")?.Issuer);
                ViewBag.LoginTitle = ConfigurationManager.AppSettings["LoginTitle"] != null ? ConfigurationManager.AppSettings["LoginTitle"] : "Simplr Sales";
                ViewBag.LoginLogo = ConfigurationManager.AppSettings["LoginLogo"] != null ? ConfigurationManager.AppSettings["LoginLogo"] : "/Images/SimplrLogo.png";
                Session["ProjectName"] = ConfigurationManager.AppSettings["ProjectName"];
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
                var query = "select Isnull(CompanyName,'') as CompanyName  from system";
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
            var logStr = "";
            try
            {
                Session["LogInType"] = BusinessRule.LogInType.Normal.ToString();
                string uname = collection.Get("uname");
                string psw = collection.Get("psw");
                string ipaddress = collection.Get("ipaddress");
                ErrorLogString("LogIn function Start \nUser Name : " + uname + " ; Password : " + psw);
                Session["SolutionName"] = ConfigurationManager.AppSettings["SolutionName"];
                Session["ULCR"] = ConfigurationManager.AppSettings["ULCR"];
                Session["SaveImagePath"] = ConfigurationManager.AppSettings["configFile"].Replace("~", "..");
                var query = string.Empty;
                if (BusinessRule._solutionName == "SALES-WEB-UL")
                    query = "select * from SalesAgent where UserID='" + uname + "'  COLLATE Latin1_General_CS_AS and PassWord = '" + psw + "' COLLATE Latin1_General_CS_AS and Active=1 and hierarchy > 20";
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
                    Session["isLogin"] = true;
                    CommonRule._AccessLevel = salesAgentData.Rows[0].ItemArray[5] == null ? "" : salesAgentData.Rows[0].ItemArray[5].ToString();
                    Session["SalesAgentCode"] = salesAgentData.Rows[0].ItemArray[0];
                    Session["Department"] = salesAgentData.Rows[0].ItemArray[27].ToString();
                    Session["UserName"] = salesAgentData.Rows[0].ItemArray[1];
                    if (Session["ProjectName"].ToString().ToUpper() == "PVMB" || Session["ProjectName"].ToString().ToUpper() == "BANGALA")
                        Session["Password"] = psw;
                    Session["AccessLevel"] = salesAgentData.Rows[0].ItemArray[5];
                    Session["AgentId"] = uname;
                    Session["UserId"] = uname;
                    logStr += " & 2 Lang";
                    var lang = salesAgentData.Rows[0]["Language"].ToString();
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

                    query = "select IsAccessLevel from system";
                    logStr += " &  4 access Qry  -" + query;
                    DataTable td = GetQueryData(query);
                    if (td.Rows.Count >= 1)
                        Session["IsAccessLevel"] = td.Rows[0].ItemArray[0].ToString() == "True" ? "1" : "0";

                    else
                        Session["IsAccessLevel"] = "0";

                    //GetYearLimit from SystemList Table
                    logStr += " &  5 ";
                    _commonRule.getYearPickerLimit(BusinessRule._solutionName);
                    logStr += " &  6";
                    ///
                    if (Session["ProjectName"].ToString().ToUpper() == "PVMB" || Session["ProjectName"].ToString().ToUpper() == "BANGALA")
                    {
                        var code = salesAgentData.Rows[0].ItemArray[0];
                        var nodetreeType = salesAgentData.Rows[0].ItemArray[33];
                        var nodetreeValue = salesAgentData.Rows[0].ItemArray[34];
                        string latitude = collection.Get("latitude");
                        string longitude = collection.Get("longitude");
                        var insertQry = "Insert Into WebLoginLog (DTG,Code,UserID,NodetreeType,NodetreeValue,IPAddress,Latitude,Longitude,LoginStatus)";
                        insertQry += "values(GETDATE(),'" + code + "', '" + uname + "', '" + nodetreeType + "', '" + nodetreeValue + "', '" + ipaddress + "', '" + latitude + "', '" + longitude + "', 'Success')";
                        var reslt = ExecuteNonQuery(insertQry);
                        ErrorLogString("WebLoginLog Table Insert query : " + insertQry + " - Return :" + reslt);

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
                            Session["Password"] = "You need to change your password every " + expireDays + " Days.";
                        }
                    }
                    ///
                    ErrorLogString("LogIn function End - logSteps -" + logStr);
                    SaveWebtoolAuditlog("LogIn");
                    return RedirectToAction("FormClickEvent", "Form", new { ScreenName = "Web_DashBoard", FieldName = "", FormView = "", query = "" });
                }
                else
                {
                    if (Session["ProjectName"].ToString().ToUpper() == "PVMB" || Session["ProjectName"].ToString().ToUpper() == "BANGALA")
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
                ErrorLogString(ex.Message + " - logSteps - " + logStr);
                TempData["Message"] = "Invalid Username/Password, Please Try Again";
                return RedirectToAction("Login");
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
                var userClaims = User.Identity as System.Security.Claims.ClaimsIdentity;
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
                Session["PlanoGramURL"] = ConfigurationManager.AppSettings["PlanoGramURL"].ToString();

                //  var userClaims = User.Identity as System.Security.Claims.ClaimsIdentity;
                // string uname = User.Identity.Name;
                // string uname = userClaims?.FindFirst(System.IdentityModel.Claims.ClaimTypes.Name)?.Value;
                string uname = userClaims?.FindFirst("preferred_username")?.Value;
                uname = uname.Replace("live.com#", "");

                // string psw = collection.Get("psw");
                ErrorLogString("User Name : " + uname + " ; Password : ");
                ErrorLogString("Connection String : " + constr);



                var query = string.Empty;
                // uname = "ADMIN";
                if (BusinessRule._solutionName == "SALES-WEB-UL")
                    query = "select * from SalesAgent where UserID='" + uname + "'  and Active=1 and hierarchy > 20";
                else
                    query = "select * from SalesAgent where UserID='" + uname + "'   ";

                ErrorLogString("query : " + query);

                DataTable salesAgentData = GetQueryData(query);
                ErrorLogString("Execute row Count : " + salesAgentData.Rows.Count);

                if (salesAgentData.Rows.Count >= 1)
                {

                    Session["isLogin"] = true;
                    // CommonRule objCommonLevel = new CommonRule();
                    CommonRule._AccessLevel = salesAgentData.Rows[0].ItemArray[5] == null ? "" : salesAgentData.Rows[0].ItemArray[5].ToString();
                    Session["UserName"] = salesAgentData.Rows[0].ItemArray[1];
                    Session["AccessLevel"] = salesAgentData.Rows[0].ItemArray[5];
                    Session["AgentId"] = uname;

                    //Session["AgentId"] = salesAgentData.Rows[0].ItemArray[0]; 
                    //Session["UserName"] = uname;
                    Session["UserId"] = uname;
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

        public bool CheckPassword(string password)        {            Regex regex = new Regex("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@$!%*?&+=#]) [A-Za-z\\d$@$!%*?&+=#]{8,50}$");            Match match = regex.Match(password);            if (match.Success)                return false;            else return false;        }
        public string ForgotPassword()
        {
            return "true";
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
        //public bool UpdateForgetPassword(string sAgentid)
        //{
        //    //SqlConnection sqlConn = new SqlConnection(constr);
        //    //SqlCommand sqlComm = new SqlCommand();
        //    //SqlTransaction sqlTran;
        //    string sSql;
        //    string email = "";
        //    string pwd = "";
        //    //sqlConn.Open();
        //    ////sqlTran = sqlConn.BeginTransaction
        //    //sqlComm.Connection = sqlConn;
        //    //sqlComm.Transaction = sqlTran;
        //    DataTable dt = new DataTable();
        //    try
        //    {
        //        //SqlDataReader dtrRead;
        //        // sSql = "Select top 1 password,email from salesagent where UserID = " & SafeSQL(sAgentid)
        //        // 'Chnaged on 7 July 2023 from UserID to Code by Jenietta
        //        sSql = "Select top 1 password,email from salesagent where Code = " + sAgentid;
        //        dt = GetQueryData(sSql);
        //        //InsertErrorMessage("", DateTime.Now, "Update Forget Password", sSql);

        //        //sqlComm.CommandText = sSql;
        //        //dtrRead = sqlComm.ExecuteReader;

        //        if (dt.Rows.Count > 0)
        //        {
        //            email = dt.Rows[0].ItemArray[0].ToString();//dtrRead("email").ToString;
        //            pwd = dt.Rows[0].ItemArray[1].ToString();// dtrRead("password").ToString;
        //        }
        //        //InsertErrorMessage("", DateTime.Now, "Update Forget Password", "Email :" + email + ", Password: " + pwd);
        //        //dtrRead.Close();
        //        // 'credentials changed and hence Gmail password changed by Jenietta on Feb 20,2023 from Simplr@123 to oilixdmdnatpvugi
        //        if (email != "")
        //        {
        //            Random rnd = new Random();
        //            pwd = rnd.Next(1000, 9999).ToString();
        //            // ' sSql = "update Salesagent set Password=" & SafeSQL(pwd) & ",LockUser=0,Locked=0 Where UserID=" & SafeSQL(sAgentid)
        //            //sSql = "update Salesagent set Password=" + (pwd) + ",LockUser=0,Locked=0 Where Code=" + SafeSQL(sAgentid);
        //            //InsertErrorMessage("", DateTime.Now, "Update Forget Password", sSql);
        //            //sqlComm.CommandText = sSql;
        //            //sqlComm.ExecuteNonQuery();

        //            System.Net.Mail.SmtpClient Smtp_Server = new System.Net.Mail.SmtpClient();
        //            System.Net.Mail.MailMessage e_mail = new System.Net.Mail.MailMessage();
        //            Smtp_Server.UseDefaultCredentials = false;
        //            Smtp_Server.Credentials = new System.Net.NetworkCredential("noreplysimplr@gmail.com", "oilixdmdnatpvugi");
        //            Smtp_Server.Port = 587; // "587"
        //            Smtp_Server.EnableSsl = true;
        //            Smtp_Server.Host = "smtp.gmail.com";
        //            e_mail = new System.Net.Mail.MailMessage();
        //            e_mail.From = new System.Net.Mail.MailAddress("noreplysimplr@gmail.com");
        //            e_mail.To.Add(email);
        //            e_mail.Subject = "Simplr - Forgot Password";
        //            e_mail.Body = "New Password - " + pwd;
        //            Smtp_Server.Send(e_mail);
        //        }
        //        else
        //        {
        //            //sqlTran.Rollback();
        //            //InsertErrorMessage("", DateTime.Now, "Update Forget Password", "Email ID is not provided for the Agent");
        //            return false;
        //        }
        //        // sSql = "Update SalesAgent Set ForgetPassword=1 where Code=" & SafeSQL(sAgentid)
        //        // sqlComm.CommandText = sSql
        //        // sqlComm.ExecuteNonQuery()

        //        // INSERT INTO WEBLOG
        //        // sSql = "Insert into WebLog(TableName,MdtNo,LogDt,ActivityType,RecValue) values('SalesAgent'," & SafeSQL("") & ",getdate(),'UpdateLoginCount'," & SafeSQL(sAgentid) & ")"
        //        // InsertErrorMessage("", Date.Now, "Update Forget Password", sSql)
        //        // sqlComm.CommandText = sSql
        //        // sqlComm.ExecuteNonQuery()
        //        //sqlTran.Commit();
        //        return true;
        //    }
        //    catch (Exception ex)
        //    {
        //        ErrorLogString("Update Forget Password: " + ex.Message);
        //        ErrorLog(ex);
        //        //InsertErrorMessage("", DateTime.Now, "Error in Update Forget Password", sSql + ex.Message);
        //        return false;
        //    }

        //}
    }


}
