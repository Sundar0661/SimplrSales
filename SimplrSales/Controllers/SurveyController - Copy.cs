using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data;
using System.Data.SqlClient;
using Newtonsoft.Json;
using System.Configuration;

namespace SimplrSales.Controllers
{
    public class SurveyController : Controller
    {
        public SqlConnection con = new SqlConnection();
        public SqlCommand cmd = new SqlCommand();
        public SqlTransaction sqltran;
        private string constr = ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString();

        public ActionResult Survey()
        {
            return View();
        }
        public ActionResult SurveyList()
        {
            if (Session["UserName"] != null)
            {
                return View();
            }
            else
                return RedirectToAction("Login", "Login");
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

        public string GetCheckList()
        {
            string result = "";
            try
            {
                var query = " " +
                    " Select distinct ThemeName, max(FormId) + 1 as FormId, Device from POSTheme " +
                    " group by ThemeName, Device order by ThemeName, Device ";

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
                        result = string.Empty;
                    }
                }
                return result;
            }
            catch (Exception ex)
            {
                result = string.Empty;
            }
            finally
            {
                con.Close();
            };
            return result;
        }
        public string GetCheckListDetails(string checkListName)
        {
            string result = "";
            try
            {
                var query = "select * from postheme where themename = '" + checkListName + "'  ORDER BY FormId,SeqNo;" +
                    " select * from possubtheme where themename = '" + checkListName + "'; " +
                    " select * from poslinedata where themename = '" + checkListName + "' order by FormId, ControlName, SerialNo;";

                DataSet ds = new DataSet();
                using (SqlConnection con = new SqlConnection(constr))
                {
                    con.Open();
                    SqlDataAdapter sda = new SqlDataAdapter(query, con);

                    sda.Fill(ds);

                    ds.Tables[0].TableName = "Theme";
                    ds.Tables[1].TableName = "subTheme";
                    ds.Tables[2].TableName = "Linedata";


                    if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                    {
                        result = JsonConvert.SerializeObject(ds);
                    }
                    else
                    {
                        result = string.Empty;
                    }
                }
                return result;
            }
            catch (Exception ex)
            {
                result = string.Empty;
            }
            finally
            {
                con.Close();
            };
            return result;
        }
    }
}
