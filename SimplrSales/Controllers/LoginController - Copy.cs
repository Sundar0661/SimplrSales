using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SimplrSales.Controllers
{
    public class LoginController : BusinessRule
    {
        string constr = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;

        public ActionResult Login()
        {
            Session["UserName"] = null;
            Session["Password"] = null;
            Session["ScreenName"] = null;
            Session["IsShowMenu"] = null;
            Session["loopExit"] = false;
            Session["HtmlMenu"] = null;

            return View();
        }
        public object[] array = new object[] { };
        //   dynamic MyDynamic = new System.Dynamic.ExpandoObject();
        object MyDynamic1 = new object();
        Dictionary<string, string> dictionary = new Dictionary<string, string>();
        //dictionary["key_name"] = "value1";

        [HttpPost]
        public ActionResult loginform(FormCollection collection)
        {
            string uname = collection.Get("uname");
            string psw = collection.Get("psw");
            var query = "select * from SalesAgent where code='" + uname + "' and PassWord = '" + psw + "'";
            DataTable salesAgentData = GetQueryData(query);
            if (salesAgentData.Rows.Count >= 1)
            {
                query = "select * from System where MDTNo='" + uname + "'";
                DataTable systemData = GetQueryData(query);
                if (systemData.Rows.Count >= 1)
                {
                    var jsonData = JsonConvert.SerializeObject(systemData);
                    jsonData = jsonData.Replace("[", "").Replace("]", "");
                    System = JsonConvert.DeserializeObject(jsonData);
                    //var MDTNo = systemData.Rows[0].ItemArray[0];//MDTNo
                    //var GST = systemData.Rows[0].ItemArray[1];//GST
                }
                Session["AgentId"] = uname;


                ///////////
                query = "select * from SystemList";
                DataTable systemListData = GetQueryData(query);


                foreach (DataRow dr in systemListData.Rows)
                {

                    //dictionary['"' + dr["Code"].ToString() + '"'] = dr["SystemValue"].ToString();

                    // MyDynamic['"' + dr["Code"].ToString() + '"'] = dr["SystemValue"].ToString();
                    //  MyDynamic1['"' + dr["Code"].ToString() + '"'] = dr["SystemValue"].ToString();
                    //   MyDynamic.a = dr["SystemValue"].ToString();
                    //  MyDynamic["a"] = dr["SystemValue"].ToString();

                }
                /////////////////////////
            }

            if (uname == "admin" && psw == "1234")
            {
                Session["UserName"] = uname;
                Session["IsShowMenu"] = true;
                // Response.Redirect("Index");
                //  return RedirectToAction("Index", "DashBoardIcons");
                return RedirectToAction("DashBoard", "DashBoard");

                // return RedirectToAction("Form", "Form");

            }
            else
            {
                return RedirectToAction("Login");
                //Response.Redirect("Login");

            }
            //  return RedirectToAction("Index");
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
            }
            return string.Empty;
        }

        public DataTable GetQueryData(string query)
        {

            DataTable dtSNo = new DataTable();
            //  dtSNo = db.retsulDataTable(SqlQry);
            DataTable dt = new DataTable();
            DataSet ds = new DataSet();
            SqlConnection con = new SqlConnection(constr);
            con.Open();
            SqlDataAdapter sda = new SqlDataAdapter(query, con);
            sda.Fill(ds);
            con.Close();
            dt = ds.Tables[0];
            return dt;
        }

        //}


    }


}
