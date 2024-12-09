using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data;
using System.Data.SqlClient;
using Newtonsoft.Json;
using System.Configuration;
using System.IO;
using System.Configuration;

namespace SimplrSales.Controllers
{
    public class SurveyController : Controller
    {
        public SqlConnection con = new SqlConnection();
        public SqlCommand cmd = new SqlCommand();
        public SqlTransaction sqltran;
        private string constr = ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString();

        public ActionResult Survey(string screenType = "")
        {
            if (Session["UserName"] != null)
            {
                Session["screenType"] = screenType;
                // ViewBag.Survey_Upload_Image_Location = ConfigurationManager.AppSettings["SurveyUploadedImageLocation"].ToString() ;
                return View();
            }
            else
                return RedirectToAction("Login", "Login", new { sessionexpired = "sessionexpired" });
        }
        public ActionResult SurveyList()
        {
            if (Session["UserName"] != null)
            {
                return View();
            }
            else
                return RedirectToAction("Login", "Login", new { sessionexpired = "sessionexpired" });
        }


        public ActionResult ViewSurvey()
        {
            if (Session["UserName"] != null)
            {
                return View();
            }
            else
                return RedirectToAction("Login", "Login", new { sessionexpired = "sessionexpired" });
        }

        [HttpPost]
        public string ExecuteNonQuerys(string data)
        {
            string result = "";
            result = ExecuteNonQuery(data);
            return result;
        }
        public string ExecuteNonQuery(string sqlqry)
        {
            string result = "";

            con = new SqlConnection(constr);

            con.Open();
            cmd = new SqlCommand();

            sqltran = con.BeginTransaction("Savepoint");

            cmd.Connection = con;
            cmd.Transaction = sqltran;

            try
            {
                dynamic sqlqryList = JsonConvert.DeserializeObject(sqlqry);
                for (int i = 0; i < sqlqryList.Count; i++)
                {
                    sqlqry = sqlqryList[i].ToString();
                    cmd.CommandText = sqlqry;
                    cmd.ExecuteNonQuery();
                }

                sqltran.Commit();
                result = "1";
            }
            catch (Exception ex)
            {
                sqltran.Rollback();
                result = "0";
            }
            finally
            {
                con.Close();
            };
            return result;
        }

        public string GetCheckList(string SearchOption = "")
        {
            string result = "";
            var query = "";
            try
            {
                if (SearchOption == "")
                {
                   if(Session["ProjectName"].ToString() == "Danone" || Session["ProjectName"].ToString() == "FGV" || Session["ProjectName"].ToString() == "FFB")
                    {
                        query = " " +
                      " Select ThemeName, max(FormId) + 1 as FormId, Device,Active=(case when Active=1 then 'Yes' else 'No' end),Description from POSTheme " +
                      " group by ThemeName, Device,Active,Description order by ThemeName, Device,Active ";
                    }
                    else
                    {
                        query = " " +
                   " Select ThemeName, max(FormId) + 1 as FormId, Device,Description from POSTheme " +
                   " group by ThemeName, Device,Description order by ThemeName, Device ";

                    }

                      
                }
                else
                {
                    if (Session["ProjectName"].ToString() == "Danone" || Session["ProjectName"].ToString() == "FGV" || Session["ProjectName"].ToString() == "FFB")
                    {
                        query = " " +
                        " Select ThemeName, max(FormId) + 1 as FormId, Device,Active=(case when Active=1 then 'Yes' else 'No' end),Description from POSTheme " +
                        " Where ThemeName like '%" + SearchOption + "%'" +
                        " group by ThemeName, Device,Active,Description order by ThemeName, Device,Active ";
                    }
                    else
                    {
                        query = " " +
                        " Select ThemeName, max(FormId) + 1 as FormId, Device,Description from POSTheme " +
                        " Where ThemeName like '%" + SearchOption + "%'" +
                        " group by ThemeName, Device,Description order by ThemeName, Device ";
                    }
                }
                DataSet ds = new DataSet();
                using (SqlConnection con = new SqlConnection(constr))
                {
                    con.Open();
                    SqlDataAdapter sda = new SqlDataAdapter(query, con);

                    sda.Fill(ds);

                    if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                    {
                        result = JsonConvert.SerializeObject(ds);
                    }
                    else
                    {
                        //result = string.Empty;
                        result = JsonConvert.SerializeObject(string.Empty);
                    }
                }
                return result;
            }
            catch (Exception ex)
            {
                string s = ex.ToString();
                s = s;
                //result = string.Empty;
                result = JsonConvert.SerializeObject(string.Empty);
            }
            finally
            {
                con.Close();
            };
            return result;
        }

        public string GetQuerConfig(string SearchType = "CustomerGroup")
        {
            string result = "";
            var query = "";
            try
            {

                if (SearchType.ToString().ToLower() == "group")
                {
                    query = " " +
                    " select QueryText from queryconfig where screenName = 'ViewSurvey_FORM_COMBOBOX_CustomerGroup' ";
                }
                else
                {
                    query = " " +
                    " select QueryText from queryconfig where screenName = 'ViewSurvey_FORM_COMBOBOX_CustomerName' ";
                }

                DataSet ds = new DataSet();
                using (SqlConnection con = new SqlConnection(constr))
                {
                    con.Open();
                    SqlDataAdapter sda = new SqlDataAdapter(query, con);

                    sda.Fill(ds);

                    if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                    {
                        result = ds.Tables[0].Rows[0]["QueryText"].ToString();
                    }
                    else
                    {
                        //result = string.Empty;
                        result = "";
                    }
                }
                return result;
            }
            catch (Exception ex)
            {
                //result = string.Empty;
                result = "";
            }
            finally
            {
                con.Close();
            };
            return result;


        }

        public string GetCustomerListDetails(string SearchType = "CustomerGroup")
        {
            string result = "";
            var query = "";
            try
            {
                // Added by Sundar 19/11/2024
                string queryFromConfig = GetQuerConfig(SearchType);


                queryFromConfig = queryFromConfig.Replace("{FormView.UserID}", "'" + Session["UserId"].ToString() + "'");
                query = queryFromConfig;
                //string queryFromConfig = GetQuerConfig(SearchType);

                //if (SearchType.ToString().ToLower() == "group")
                //{
                //    // Commented by Sundar 19/11/2024

                //    //query = " " +

                //    //" select Code code,Description text from CustClass ";

                //    query = " " + queryFromConfig;
                //}
                //else
                //{
                //    // Commented by Sundar 19/11/2024

                //    //query = " " +

                //    //" select CustNo code,CustName text from customer  ";

                //    query = " " + queryFromConfig;
                //}

                DataSet ds = new DataSet();
                using (SqlConnection con = new SqlConnection(constr))
                {
                    con.Open();
                    SqlDataAdapter sda = new SqlDataAdapter(query, con);

                    sda.Fill(ds);

                    if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                    {
                        result = JsonConvert.SerializeObject(ds);
                    }
                    else
                    {
                        //result = string.Empty;
                        result = JsonConvert.SerializeObject(string.Empty);
                    }
                }
                return result;
            }
            catch (Exception ex)
            {
                //result = string.Empty;
                result = JsonConvert.SerializeObject(string.Empty);
            }
            finally
            {
                con.Close();
            };
            return result;
        }



        public string GetSurveyThemeDetails(string fromDate, string toDate, string custType, string custCode)
        {
            string result = "";
            var query = "";
            try
            {
                if (custType.ToString().ToLower() == "group")
                {
                    // BY CUSTOMER GROUP SEARCH
                    query = " " +
                        " select Distinct AnsNo + ' - ' + ThemeName + ' - (Survey Taken : ' + Format(AnsDate,'dd/MM/yyyy hh:mm') + ')' as ThemeName " +
                        " from " +
                        " answer ans inner join customer cus " +
                        " on ans.customerid = cus.custno " +
                        " where convert(datetime, CONVERT(varchar, ansdate, 111)) " +
                        " between convert(datetime, CONVERT(varchar,  '" + fromDate + "', 111))  and " +
                        " convert(datetime, CONVERT(varchar, '" + toDate + "', 111)) " +
                        " and cus.custclass = '" + custCode + "' ";
                }
                else
                {
                    // BY CUSTOMER NAME SEARCH
                    query = " " +
                    " select Distinct AnsNo + ' - ' + ThemeName + ' - (Survey Taken : ' + Format(AnsDate,'dd/MM/yyyy hh:mm') + ')' as ThemeName " +
                    " from answer " +
                    " where  CustomerId = '" + custCode + "' and " +
                    " convert(datetime, CONVERT(varchar, ansdate, 111)) " +
                    " between " +
                    " convert(datetime, CONVERT(varchar, '" + fromDate + "', 111))  and " +
                    " convert(datetime, CONVERT(varchar, '" + toDate + "', 111)) ";

                }

                DataSet ds = new DataSet();
                using (SqlConnection con = new SqlConnection(constr))
                {
                    con.Open();
                    SqlDataAdapter sda = new SqlDataAdapter(query, con);

                    sda.Fill(ds);

                    if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                    {
                        result = JsonConvert.SerializeObject(ds);
                    }
                    else
                    {
                        //result = string.Empty;
                        result = JsonConvert.SerializeObject(string.Empty);
                    }
                }
                return result;
            }
            catch (Exception ex)
            {
                //result = string.Empty;
                result = JsonConvert.SerializeObject(string.Empty);
            }
            finally
            {
                con.Close();
            };
            return result;
        }


        public string GetPosDataMapDetails()
        {
            string result = null;
            try
            {
                //var query = "Select * From PosDataMap  where FieldCode='1';";
                var query = "Select LineValue=FieldName From PosDataMap ";
               // var query = "select LineValue from POSLineData";

                DataSet ds = new DataSet();
                using (SqlConnection con = new SqlConnection(constr))
                {
                    con.Open();
                    SqlDataAdapter sda = new SqlDataAdapter(query, con);

                    sda.Fill(ds);

                    if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                    {
                        result = JsonConvert.SerializeObject(ds);
                    }
                    else
                    {
                        //result = string.Empty;
                        result = JsonConvert.SerializeObject(string.Empty);
                    }
                }
                return result;
            }
            catch (Exception ex)
            {
                //result = string.Empty;
                result = JsonConvert.SerializeObject(string.Empty);
            }
            finally
            {
                con.Close();
            };
            return result;
        }



        public string GetCheckListDetails(string AnsNo, string checkListName, string description, bool active)
        {
            string result = null;
            AnsNo = AnsNo.ToString().Trim();
            checkListName = checkListName.ToString().Trim();

            try
            {
                //newly added by.M 16.02,2022
                var posthemequery = "select ThemeName, FormId, FormName, PanelName, ControlName, ControlType, XPos, YPos, ControlWidth, ControlHeight, ControlText, BackColor, ForeColor, ThemeColor, FontName, FontSize, FontStyle, Parent, Visible, ButtonTheme, ";
                posthemequery += "ToolTip, IsDB, DBFieldCode, ThemeNo, ts, Device, SeqNo, ParentQuestion, '" + description + "' as Description, '" + active + "' as Active from (select  CONCAT(ControlName, '1') as 'OrderColumn', ThemeName, FormId, FormName, PanelName, ControlName, ControlType, XPos, YPos, ControlWidth, ControlHeight, ControlText, BackColor, ForeColor, ThemeColor, FontName, FontSize, FontStyle, Parent, Visible, ButtonTheme, ";
                posthemequery += "ToolTip, IsDB, DBFieldCode, ThemeNo, ts, Device, SeqNo, ParentQuestion, Description from postheme where themename = '" + checkListName + "'  and ControlType = 'question' union ";
                posthemequery += "select  CONCAT(ParentQuestion, '2') as 'OrderColumn', ThemeName, FormId, FormName, PanelName, ControlName, ControlType, XPos, YPos, ControlWidth, ControlHeight, ControlText, BackColor, ForeColor, ThemeColor, FontName, FontSize, FontStyle, Parent, Visible, ButtonTheme,";
                posthemequery += "ToolTip, IsDB, DBFieldCode, ThemeNo, ts, Device, SeqNo, ParentQuestion, Description from postheme where themename = '" + checkListName + "'  and ControlType != 'question') as A order by OrderColumn ; ";
                //todo
                //var query = "select * from postheme where themename = '" + checkListName + "'  ORDER BY FormId,SeqNo;" +
                var query = posthemequery +
                    " select * from possubtheme where themename = '" + checkListName + "' order by controlNo; " +
                    " select * from poslinedata where themename = '" + checkListName + "' order by FormId, ControlName,subControlName, SerialNo;" +
                    " select * from answer where " +
                    " themename = '" + checkListName + "' AND ANSNo = '" + AnsNo + "'" +
                    " order by FormId, ControlName; " +
                    " select * from subanswer where " +
                    " themename = '" + checkListName + "' AND ANSNo = '" + AnsNo + "'" +
                    " order by FormId, ControlNo, SerialNo; ";

                DataSet ds = new DataSet();
                using (SqlConnection con = new SqlConnection(constr))
                {
                    con.Open();
                    SqlDataAdapter sda = new SqlDataAdapter(query, con);

                    sda.Fill(ds);

                    ds.Tables[0].TableName = "Theme";
                    ds.Tables[1].TableName = "subTheme";
                    ds.Tables[2].TableName = "Linedata";
                    ds.Tables[3].TableName = "Answer";
                    ds.Tables[4].TableName = "SubAnswer";

                    if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                    {
                        result = JsonConvert.SerializeObject(ds);
                    }
                    else
                    {
                        //result = string.Empty;
                        result = JsonConvert.SerializeObject(string.Empty);
                    }
                }
                return result;
            }
            catch (Exception ex)
            {
                //result = string.Empty;
                result = JsonConvert.SerializeObject(string.Empty);
            }
            finally
            {
                con.Close();
            };
            return result;
        }

        [HttpPost]
        public ActionResult ImageFileUpload(string val)
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


        //not use this function  -- Survey_ImageFile_Upload functionk chaged to ImageFileUpload function
        [HttpPost]
        public ActionResult Survey_ImageFile_Upload()
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

       
       
    }
}
