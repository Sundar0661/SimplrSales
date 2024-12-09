using Newtonsoft.Json;
using System;
using System.Collections.Generic;
//using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Text;
using SimplrSales.Models;


namespace SimplrSales.Controllers.Form
{
    public class FormController : BusinessRule
    {
        /// </summary>
        public dynamic FormView = string.Empty;
        public dynamic arrFormView = string.Empty;
        private dynamic arrListView = string.Empty;
        private dynamic arrObj = string.Empty;

        // GET: /Form/
        public CommonRule _commonRule = new CommonRule();
        public ActionResult FormViewList()
        {
            //double slat = 23.70698; double slon = 90.448567;
            //double elat = 23.707478; double elon = 90.45174;
            ////var dddw = DistanceTo(slat, slon, elat, elon);
            //RouteMaster(); 
            try
            {
                if (Session["UserName"] != null)
                {
                    if (Session["ProjectName"] == null || Session["ProjectName"] == "")
                    {
                        Session["ProjectName"] = ConfigurationManager.AppSettings["ProjectName"];
                        Session["URL"] = ConfigurationManager.AppSettings["UrlRPTImageString"];
                        Session["PlanoGramURL"] = ConfigurationManager.AppSettings["PlanoGramURL"].ToString();
                        Session["SolutionName"] = ConfigurationManager.AppSettings["SolutionName"];
                        Session["ULCR"] = ConfigurationManager.AppSettings["ULCR"];
                        Session["SaveImagePath"] = ConfigurationManager.AppSettings["configFile"].Replace("~", "..");
                    }

                    var ScreenName = Session["ScreenName"].ToString();
                    string FieldName = Session["FieldName"].ToString();
                    ErrorLog_whenMenuClick_strMessage("ScreenName " + ScreenName + "FieldName " + FieldName + " .");
                    Params = new System.Dynamic.ExpandoObject();
                    TempData["ScreenName"] = ScreenName;
                    ViewBag.Google_APIKey = ConfigurationManager.AppSettings["Google_APIKey"] != null ? ConfigurationManager.AppSettings["Google_APIKey"] : "AIzaSyDI9hx4Xgpd5p5p_H_7Uu0vQTCX4nIiyJk";
                    ViewBag.LoginTitle = ConfigurationManager.AppSettings["LoginTitle"] != null ? ConfigurationManager.AppSettings["LoginTitle"] : "Simplr Sales";
                    ViewBag.HomePageLogo = ConfigurationManager.AppSettings["HomePageLogo"] != null ? ConfigurationManager.AppSettings["HomePageLogo"] : "";
                    ViewBag.ScreenName = ScreenName;
                    ViewBag.YearPickerLimit = CommonRule._YearPickerLimit;
                    ViewBag.isLogin = Session["isLogin"];
                    //ViewBag.Password = TempData["Password"];
                    ViewBag.Password = Session["Password1"];
                    Session["isLogin"] = false;
                    return View();
                }
                else
                {
                    // COMMENTED 07.10.2020
                    // NOTE THIS POINT
                    //ErrorLog_whenMenuClick_strMessage("Session is cleared please check Session Item.");
                    // COMMENTED 07.10.2020
                    //ViewBag.SessionTimeOut = "1";
                    //return RedirectToAction("Login", "Login");
                    if (Session["ScreenName"] != null)
                        TempData["SessionTimeOut"] = "1";
                    return RedirectToAction("Login", "Login", new { sessionexpired = "sessionexpired" });
                }

            }
            catch (Exception ex)
            {
                // COMMENTED 07.10.2020
                //ErrorLog_whenMenuClick(ex);
                // COMMENTED 07.10.2020
                ErrorLog(ex);
            }
            return View();
        }
        public ActionResult FormClickEvent(string ScreenName, string FieldName)
        {
            try
            {
                ErrorLogString("ScreenName = " + ScreenName);
                Session["ScreenName"] = ScreenName == null ? "" : ScreenName;
                Session["FieldName"] = FieldName == null ? "" : FieldName;
                TempData["Password"] = Session["Password"];
                Session["Password"] = null;
                if (ScreenName == "VehicleAssignmentList" || ScreenName == "VehicleAssignmentForm")
                    return RedirectToAction("Index", "VehicleAssignment");
                else if (ScreenName == "SurveyList" || ScreenName == "SurveyForm")
                    return RedirectToAction("SurveyList", "Survey");
                else if (ScreenName == "ViewSurvey" || ScreenName == "ViewSurveyForm")
                    //                       ActionName, ControllerName
                    return RedirectToAction("ViewSurvey", "Survey");
                else if (ScreenName == "BarcodeConfigPage")
                    return RedirectToAction("BarcodeConfigPage", "BarcodeConfig");
                else
                {
                    return RedirectToAction("FormViewList");
                }

            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                return RedirectToAction("Login", "Login", new { sessionexpired = "sessionexpired" });
            }

        }
        public ActionResult Form(string screenName)
        {
            ViewBag.ScreenName = screenName;
            ViewBag.Message = TempData["Message"];
            TempData["Message"] = null;
            return View();
        }

        [HttpGet]
        public ActionResult FirstAjax()
        {
            return Json("chamara", JsonRequestBehavior.AllowGet);
        }
        public ActionResult FormList(string ScreenName)
        {
            try
            {
                if (Session["UserName"] != null)
                {
                    if (Session["ProjectName"] == null)
                    {
                        Session["ProjectName"] = ConfigurationManager.AppSettings["ProjectName"];
                        Session["URL"] = ConfigurationManager.AppSettings["UrlRPTImageString"];
                        Session["PlanoGramURL"] = ConfigurationManager.AppSettings["PlanoGramURL"].ToString();
                        Session["SolutionName"] = ConfigurationManager.AppSettings["SolutionName"];
                        Session["ULCR"] = ConfigurationManager.AppSettings["ULCR"];
                        Session["SaveImagePath"] = ConfigurationManager.AppSettings["configFile"].Replace("~", "..");
                    }
                    Session["ScreenName"] = ScreenName == null ? "" : ScreenName;
                    if (ScreenName == "VehicleAssignmentList" || ScreenName == "VehicleAssignmentForm")
                    {
                        if (Session["ProjectName"].ToString().ToLower() == "poc")
                            return RedirectToAction("Index", "OrderAssignment");
                        else
                            return RedirectToAction("Index", "VehicleAssignment");
                    }
                    else if (ScreenName == "SurveyList" || ScreenName == "SurveyForm")
                        return RedirectToAction("SurveyList", "Survey");
                    else if (ScreenName == "ViewSurvey" || ScreenName == "ViewSurveyForm")
                        return RedirectToAction("ViewSurvey", "Survey");
                    else if (ScreenName == "BarcodeConfigPage")
                        return RedirectToAction("BarcodeConfigPage", "BarcodeConfig");
                    else if (ScreenName == "Chats")
                        return RedirectToAction("Index", "Chat");
                    else
                    {
                        TempData["ScreenName"] = ScreenName;
                        ViewBag.Google_APIKey = ConfigurationManager.AppSettings["Google_APIKey"] != null ? ConfigurationManager.AppSettings["Google_APIKey"] : "AIzaSyDI9hx4Xgpd5p5p_H_7Uu0vQTCX4nIiyJk";
                        ViewBag.LoginTitle = ConfigurationManager.AppSettings["LoginTitle"] != null ? ConfigurationManager.AppSettings["LoginTitle"] : "Simplr Sales";
                        ViewBag.HomePageLogo = ConfigurationManager.AppSettings["HomePageLogo"] != null ? ConfigurationManager.AppSettings["HomePageLogo"] : "";
                        ViewBag.ScreenName = ScreenName;
                        ViewBag.YearPickerLimit = CommonRule._YearPickerLimit;
                        ViewBag.isLogin = Session["isLogin"];
                        Session["isLogin"] = false;
                        return View("FormViewList");
                    }
                }
                else
                {
                    if (Session["ScreenName"] != null)
                        TempData["SessionTimeOut"] = "1";
                    return RedirectToAction("Login", "Login", new { sessionexpired = "sessionexpired" });
                }

            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                return RedirectToAction("Login", "Login", new { sessionexpired = "sessionexpired" });
            }
        }

        // FOR MOBILE ACCESS PURPOSE ====================================================================
        public ActionResult FormViewList_Mobile(string UserId, string PWD, string ScreenName)
        {
            try
            {
                //if (Session["UserName"] != null)
                //{

                Validate_Credential(UserId, PWD);


                if (Session["UserName"] != null)
                {

                    string _ScreenName = ScreenName;
                    string _FieldName = "";

                    byte[] bytes_screenName = Encoding.Default.GetBytes(_ScreenName);

                    string decrypted_screenName = AESEncrytDecry.DecryptStringFromBytes(bytes_screenName, Encoding.UTF8.GetBytes("simplr8080808080"), Encoding.UTF8.GetBytes("simplr8080808080"));

                    // COMMENTED AND THEN RUN IT IS FOR TESTING PURPOSE
                    //decrypted_screenName = "Activity Report";

                    Session["ScreenName"] = decrypted_screenName;
                    Session["FieldName"] = _FieldName;

                    Params = new System.Dynamic.ExpandoObject();
                    TempData["ScreenName"] = decrypted_screenName;
                    ViewBag.Google_APIKey = ConfigurationManager.AppSettings["Google_APIKey"] != null ? ConfigurationManager.AppSettings["Google_APIKey"] : "AIzaSyDI9hx4Xgpd5p5p_H_7Uu0vQTCX4nIiyJk";
                    ViewBag.LoginTitle = ConfigurationManager.AppSettings["LoginTitle"] != null ? ConfigurationManager.AppSettings["LoginTitle"] : "Simplr Sales";
                    ViewBag.HomePageLogo = ConfigurationManager.AppSettings["HomePageLogo"] != null ? ConfigurationManager.AppSettings["HomePageLogo"] : "";
                    ViewBag.ScreenName = decrypted_screenName;

                    ViewBag.YearPickerLimit = CommonRule._YearPickerLimit;
                    ViewBag.isLogin = Session["isLogin"];
                    Session["isLogin"] = false;
                    return View();
                }
                else
                {
                    TempData["Message"] = "Invalid Username/Password, Please Try Again";
                    return RedirectToAction("Login", "Login", new { sessionexpired = "sessionexpired" });
                }

            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                return RedirectToAction("Login", "Login", new { sessionexpired = "sessionexpired" });
            }
            return View();
        }
        public void Validate_Credential(string UserId, string PWD)
        {
            try
            {
                // PWD COME AS ENCRYPTED STRING
                // HERE WE HAVE DECRYPT IT 
                Session["SolutionName"] = ConfigurationManager.AppSettings["SolutionName"];
                Session["ULCR"] = ConfigurationManager.AppSettings["ULCR"];
                Session["SaveImagePath"] = ConfigurationManager.AppSettings["configFile"].Replace("~", "..");
                string uname = UserId;
                string psw = PWD;

                byte[] bytes_userid = Encoding.Default.GetBytes(uname);

                string decrypted_userid = AESEncrytDecry.DecryptStringFromBytes(bytes_userid, Encoding.UTF8.GetBytes("simplr8080808080"), Encoding.UTF8.GetBytes("simplr8080808080"));
                uname = decrypted_userid;

                byte[] bytes_pwd = Encoding.Default.GetBytes(psw);

                string decrypted_pwd = AESEncrytDecry.DecryptStringFromBytes(bytes_pwd, Encoding.UTF8.GetBytes("simplr8080808080"), Encoding.UTF8.GetBytes("simplr8080808080"));

                var query = string.Empty;
                if (BusinessRule._solutionName == "SALES-WEB-UL")
                {
                    query = "select * from SalesAgent where UserID='" + decrypted_userid + "'  COLLATE Latin1_General_CS_AS and PassWord = '" + decrypted_pwd + "' COLLATE Latin1_General_CS_AS and Active=1 and hierarchy > 20";
                }
                else
                {
                    query = "select * from SalesAgent where UserID='" + decrypted_userid + "' COLLATE Latin1_General_CS_AS and PassWord = '" + decrypted_pwd + "' COLLATE Latin1_General_CS_AS  ";
                }

                DataTable salesAgentData = GetQueryData(query);
                ErrorLogString("Execute row Count : " + salesAgentData.Rows.Count);

                if (salesAgentData.Rows.Count >= 1)
                {
                    Session["isLogin"] = true;

                    // CommonRule objCommonLevel = new CommonRule();
                    CommonRule._AccessLevel = salesAgentData.Rows[0].ItemArray[5] == null ? "" : salesAgentData.Rows[0].ItemArray[5].ToString();
                    Session["UserName"] = salesAgentData.Rows[0]["Name"].ToString();//.ItemArray[1];
                    Session["AccessLevel"] = salesAgentData.Rows[0].ItemArray[5];
                    Session["AgentId"] = uname;

                    //Session["AgentId"] = salesAgentData.Rows[0].ItemArray[0]; 
                    //Session["UserName"] = uname;
                    Session["UserId"] = uname;
                    Session["Language"] = "English";
                    CommonRule._Language = "English";
                    if (Session["ProjectName"] == "MM")
                    {
                        var lang = salesAgentData.Rows[0]["Language"].ToString();
                        Session["Language"] = (lang == null || lang == "") ? "English" : lang;
                        CommonRule._Language = (lang == null || lang == "") ? "English" : lang;
                    }
                    _userId = uname;
                    Session["IsShowMenu"] = true;
                    // COMMENTED NEW SESSION VARIABLE
                    Session["IsFromMobile"] = true;
                    Session["UserAccessLevelQuery"] = "in (select groupid from salesmangroup where userid='" + uname + "')";

                    query = "select * from System where MDTNo='" + uname + "'";
                    DataTable systemData = GetQueryData(query);
                    if (systemData.Rows.Count >= 1)
                    {
                        var jsonData = JsonConvert.SerializeObject(systemData);
                        jsonData = jsonData.Replace("[", "").Replace("]", "");
                        SystemConfig = JsonConvert.DeserializeObject(jsonData);
                    }

                    //GetYearLimit from SystemList Table
                    _commonRule.getYearPickerLimit(BusinessRule._solutionName);

                    //return RedirectToAction("FormClickEvent", "Form", new { ScreenName = "Web_DashBoard", FieldName = "", FormView = "", query = "" });
                }
                else
                {
                    Session.Clear();

                    //TempData["Message"] = "Invalid Username/Password, Please Try Again";
                    //return RedirectToAction("Login");
                }
            }
            catch (Exception ex)
            {


            }
        }
        // FOR MOBILE ACCESS PURPOSE ====================================================================
        /// <summary>
        public static double DistanceTo(double lat1, double lon1, double lat2, double lon2, char unit = 'K')
        {
            double rlat1 = Math.PI * lat1 / 180;
            double rlat2 = Math.PI * lat2 / 180;
            double theta = lon1 - lon2;
            double rtheta = Math.PI * theta / 180;
            double dist =
                Math.Sin(rlat1) * Math.Sin(rlat2) + Math.Cos(rlat1) *
                Math.Cos(rlat2) * Math.Cos(rtheta);
            dist = Math.Acos(dist);
            dist = dist * 180 / Math.PI;
            dist = dist * 60 * 1.1515;

            switch (unit)
            {
                case 'K': //Kilometers -> default
                    return dist * 1.609344;
                case 'N': //Nautical Miles 
                    return dist * 0.8684;
                case 'M': //Miles
                    return dist;
            }

            return dist;
        }

        public ActionResult UpdateForgetPassword(string sAgentid)
        //public string UpdateForgetPassword(string sAgentid)
        {
           //return View();
            //return RedirectToAction("ViewSurvey", "Survey");
            //SqlConnection sqlConn = new SqlConnection(constr);
            //SqlCommand sqlComm = new SqlCommand();
            //SqlTransaction sqlTran;
            string sSql;
            string email = "";
            string pwd = "";
           sAgentid = "ITADMIN";
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

                sSql = "Select top 1 email,password from salesagent where Code = '" + sAgentid + "' ";
               
                dt = GetQueryData(sSql);
                //InsertErrorMessage("", DateTime.Now, "Update Forget Password", sSql);

                //sqlComm.CommandText = sSql;
                //dtrRead = sqlComm.ExecuteReader;

                if (dt.Rows.Count > 0)
                {
                    email = dt.Rows[0].ItemArray[0].ToString();//dtrRead("email").ToString;
                    pwd = dt.Rows[0].ItemArray[1].ToString();// dtrRead("password").ToString;
                }
                //InsertErrorMessage("", DateTime.Now, "Update Forget Password", "Email :" + email + ", Password: " + pwd);
                //dtrRead.Close();
                // 'credentials changed and hence Gmail password changed by Jenietta on Feb 20,2023 from Simplr@123 to oilixdmdnatpvugi
                if (email != "")
                {
                    Random rnd = new Random();
                    pwd = rnd.Next(1000, 9999).ToString();
                    //sSql = "update Salesagent set Password=" & SafeSQL(pwd) & ",LockUser=0,Locked=0 Where UserID=" & SafeSQL(sAgentid)
                    //sSql = "update Salesagent set Password=" + (pwd) + ",LockUser=0,Locked=0 Where Code=" + SafeSQL(sAgentid);
                    //InsertErrorMessage("", DateTime.Now, "Update Forget Password", sSql);
                    //sqlComm.CommandText = sSql;
                    //sqlComm.ExecuteNonQuery();

                    var query = " Insert into [sampleTest].dbo.tblforgetpwddetails(UserID,MobOTP,MailOTP,Createddate,bVerified)";
                    query += " select '" + sAgentid + "','" + pwd + "','" + pwd + "',getdate(),0 ";
                    var dataList = _commonRule.getValueList(query);

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
                    e_mail.Subject = "Simplr - Forgot Password";
                    e_mail.Body = "New Password - " + pwd;
                    Smtp_Server.Send(e_mail);
                }
                else
                {
                    //sqlTran.Rollback();
                    //InsertErrorMessage("", DateTime.Now, "Update Forget Password", "Email ID is not provided for the Agent");
                    //return false;
                }
                // sSql = "Update SalesAgent Set ForgetPassword=1 where Code=" & SafeSQL(sAgentid)
                // sqlComm.CommandText = sSql
                // sqlComm.ExecuteNonQuery()

                // INSERT INTO WEBLOG
                // sSql = "Insert into WebLog(TableName,MdtNo,LogDt,ActivityType,RecValue) values('SalesAgent'," & SafeSQL("") & ",getdate(),'UpdateLoginCount'," & SafeSQL(sAgentid) & ")"
                // InsertErrorMessage("", Date.Now, "Update Forget Password", sSql)
                // sqlComm.CommandText = sSql
                // sqlComm.ExecuteNonQuery()
                //sqlTran.Commit();
                //return true;
            }
            catch (Exception ex)
            {
                ErrorLogString("Update Forget Password: " + ex.Message);
                ErrorLog(ex);
                //InsertErrorMessage("", DateTime.Now, "Error in Update Forget Password", sSql + ex.Message);
                //return false;
            }
            //return RedirectToAction("ForgotPassword");
           // return View("ForgotPassword");
            return View();
        }

        public void RouteMaster()
        {
            var qry = "select RouteNo,VehicleNo from routeMaster Where RouteNo='T16R00007102'";
            System.Data.DataTable routeMasterData = _commonRule.getDataTableList(qry);
            //var routeMasterData = executeQry;
            for (var m = 0; m < routeMasterData.Rows.Count; m++)
            {

                qry = "select Latitude,Longitude from salesoffice where code in (select SalesOfficeId from Nodetree where SalesmanTerritory ='" + routeMasterData.Rows[m].ItemArray[1].ToString() + "')";//veh no
                System.Data.DataTable salesOfficeData = _commonRule.getDataTableList(qry);
                //  var salesOfficeData = /*executeQry*/;
                var slat = "";
                var slon = "";
                //var elat = "";
                //var elon = "";
                slat = salesOfficeData.Rows[0].ItemArray[0].ToString();
                slon = salesOfficeData.Rows[0].ItemArray[1].ToString();
                //slat = salesOfficeData[0].Latitude;
                //slon = salesOfficeData[0].Longitude;

                qry = "select Latitude,Longitude,CustNo from Customer where CustNo in ( select CustNo from routedet  Where RouteNo='" + routeMasterData.Rows[m].ItemArray[0].ToString() + "')";
                System.Data.DataTable customerData = _commonRule.getDataTableList(qry);
                //var customerData = executeQry;
                var tcnt = customerData.Rows.Count;
                //var arrLocDis = [];
                //var updateStopNo = [];
                var arrLocDis = new List<RouteDetails>();
                var updateStopNo = new List<RouteDetails>();
                var arrObj = new RouteDetails();

                for (var f = 0; f < tcnt; f++)
                {
                    arrLocDis = new List<RouteDetails>();
                    for (var ff = 0; ff < customerData.Rows.Count; ff++)
                    {
                        if (slat != customerData.Rows[ff].ItemArray[0].ToString() && slon != customerData.Rows[ff].ItemArray[1].ToString())
                        {
                            var dis = DistanceTo(Convert.ToDouble(slat), Convert.ToDouble(slon), Convert.ToDouble(customerData.Rows[ff].ItemArray[0]), Convert.ToDouble(customerData.Rows[ff].ItemArray[1]));

                            arrObj = new RouteDetails();
                            arrObj.Latitude = Convert.ToDouble(customerData.Rows[ff].ItemArray[0]);
                            arrObj.Longitude = Convert.ToDouble(customerData.Rows[ff].ItemArray[1]);
                            arrObj.Distance = dis;
                            arrObj.CustNo = customerData.Rows[ff].ItemArray[2].ToString();
                            arrLocDis.Add(arrObj);
                        }
                    }
                    arrLocDis = arrLocDis.AsEnumerable().OrderBy(p => p.Distance).ToList();

                    //arrLocDis = arrLocDis.sort(function(a, b) {
                    //    return parseFloat(a.dis) - parseFloat(b.dis);
                    //});

                    //executeQry = executeQry.filter(function(item) {
                    //    return item.Latitude !== slat
                    //});

                    for (int i = customerData.Rows.Count - 1; i >= 0; i--)
                    {
                        DataRow dr = customerData.Rows[i];
                        if (dr["Latitude"].ToString() == slat)
                            dr.Delete();
                    }
                    customerData.AcceptChanges();


                    if (customerData.Rows.Count > 0)
                    {
                        for (var ii = 0; ii < 1; ii++)
                        {
                            arrObj = new RouteDetails();
                            // obj = { };
                            arrObj.Latitude = arrLocDis[ii].Latitude;
                            arrObj.Longitude = arrLocDis[ii].Longitude;
                            arrObj.MarkerNo = f + 1;
                            arrObj.CustNo = arrLocDis[ii].CustNo;
                            arrObj.Distance = arrLocDis[ii].Distance;
                            slat = arrLocDis[ii].Latitude.ToString();
                            slon = arrLocDis[ii].Longitude.ToString();
                            updateStopNo.Add(arrObj);
                        }
                    }
                }
                //var arrayQuery = [];
                if (updateStopNo.Count > 0)
                {
                    for (var k = 0; k < updateStopNo.Count; k++)
                    {
                        qry = "update routedet  StopNo='" + updateStopNo[k].MarkerNo + "' where CustNo='" + updateStopNo[k].CustNo + "' and RouteNo ='" + routeMasterData.Rows[m].ItemArray[0].ToString() + "'";
                        // arrayQuery.push(qry);
                    }
                    // BulkInsertQueries(arrayQuery);
                    // var ddd = arrayQuery;
                }
            }


        }
        public DataTable GetQueryData(string query)
        {
            DataTable dt = new DataTable();
            string constr = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
            SqlConnection con = new SqlConnection(constr);
            con.Close();
            //ErrorLogString("Connection String constr: " + constr);
            //ErrorLogString("Connection String con: " + con);

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
                ErrorLog(ex);

            }
            finally
            {
                con.Close();
            };
            return dt;
        }
        public ActionResult FormViewList1(string ScreenName, string FieldName, string FormView, string query, string obj1)
        {
            try
            {
                ErrorLogString("ScreenName = " + ScreenName);

                dynamic _obj1 = string.Empty;
                dynamic _FormView = string.Empty;

                if (obj1 != "" && obj1 != null)
                {
                    obj1 = ReplaceSpecialCharacter(obj1);
                    _obj1 = JsonConvert.DeserializeObject(obj1);
                }
                if (FormView != "" && FormView != null)
                {
                    FormView = ReplaceSpecialCharacter(FormView);
                    _FormView = JsonConvert.DeserializeObject(FormView);
                }

                Session["_obj1"] = ScreenName == null ? "" : _obj1;
                Session["_FormView"] = ScreenName == null ? "" : _FormView;

                Session["ScreenName"] = ScreenName == null ? "" : ScreenName;
                Session["FieldName"] = FieldName == null ? "" : FieldName;
                Session["query"] = query == null ? "" : query;

                if (ScreenName == "VehicleAssignmentList" || ScreenName == "VehicleAssignmentForm")
                    return RedirectToAction("Index", "VehicleAssignment");
                else
                    return RedirectToAction("FormViewList");

            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                return RedirectToAction("Login", new { sessionexpired = "sessionexpired" });
            }

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
                return "";

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

    public class RouteDetails
    {
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public int MarkerNo { get; set; }
        public string CustNo { get; set; }
        public double Distance { get; set; }

    }
}
