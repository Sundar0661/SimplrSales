using Newtonsoft.Json;
using SimplrSales.Models;
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
    public class DashBoardController : Controller
    {
        string constr = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
        //
        // GET: /DashBoard/

        public ActionResult Index()
        {
            return View();
        }
        public ActionResult DashBoard()
        {
            Barchart model = new Barchart();
            DataTable dt = model.GetList();
            return View("DashBoard", dt);
        }

        public string Queryconfig(string screenname)
        {
            var query = QueryconfigText(screenname);
            var data = getValueList(query);
            return data;

        }

        public string QueryconfigText(string screenname)
        {

            var SqlQry = "select QueryText + ' ' + GroupText + ' ' + OrderText from Queryconfig where screenname ='" + screenname + "_FORM_CHART_SalesChart'";
            DataTable dtSNo = new DataTable();
            //  dtSNo = db.retsulDataTable(SqlQry);

            DataTable dt = new DataTable();
            DataSet ds = new DataSet();
            SqlConnection con = new SqlConnection(constr);
            con.Open();
            SqlDataAdapter sda = new SqlDataAdapter(SqlQry, con);
            sda.Fill(ds);
            con.Close();

            dt = ds.Tables[0];
            return dt.Rows[0].ItemArray[0].ToString().Replace("ifnull", "isnull");
            // string result = JsonConvert.SerializeObject(dt);
        }

        public string getValueList(string query)
        {
            DataTable dtSNo = new DataTable();
            //dtSNo = db.retsulDataTable(SqlQry);

            DataTable dt = new DataTable();
            DataSet ds = new DataSet();
            SqlConnection con = new SqlConnection(constr);
            con.Open();
            SqlDataAdapter sda = new SqlDataAdapter(query, con);
            sda.Fill(ds);
            con.Close();
            dt = ds.Tables[0];
            string result = JsonConvert.SerializeObject(dt);
            return result;
        }

    }
}
