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
    public class BarcodeConfigController : Controller
    {
        //
        // GET: /BarcodeConfig/
        public SqlConnection con = new SqlConnection();
        public SqlCommand cmd = new SqlCommand();
        public SqlTransaction sqltran;
        private string constr = ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString();
        public ActionResult BarcodeConfigPage()
        {
            if (Session["UserName"] != null)
            {
                string ScreenName = Session["ScreenName"].ToString();
                string FieldName = Session["FieldName"].ToString();
                ViewBag.PageParams = Session["FieldName"].ToString();
                return View();
            }
            else
            {
                return RedirectToAction("Login", "Login", new { sessionexpired = "sessionexpired" });
            }
        }



        [HttpPost]
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
                cmd.CommandText = sqlqry;

                cmd.ExecuteNonQuery();

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


        public string GetBarcodeDetails(string Barcode)
        {
            string result = "";
            var query = "";
            try
            {

                query = " Select  " +
                    " ItemNo, Barcode, isnull(ItemID_Start, 0) ItemID_Start,isnull(ItemID_Length, 0) ItemID_Length, " +
                    " isnull(LotNo_Start, 0) LotNo_Start, isnull(LotNo_Length, 0) LotNo_Length,  " +
                    " isnull(ExpiryDate_Start, 0) ExpiryDate_Start, isnull(ExpiryDate_Length, 0) ExpiryDate_Length, " +
                    " isnull(Weight_Start, 0) Weight_Start, isnull(Weight_Length, 0) Weight_Length,  " +
                    " isnull(ExpiryDate_Format, 0) ExpiryDate_Format, isnull(Weight_Format, 0) Weight_Format  , " +
                    " isnull(ExpiryDate_CalcPeriod, '') ExpiryDate_CalcPeriod, isnull(ExpiryDate_Calc, 0) ExpiryDate_Calc " +
                    " from barcodeconfig where barcode='" + Barcode + "'";

                DataSet ds = new DataSet();
                using (SqlConnection con = new SqlConnection(constr))
                {
                    con.Open();
                    SqlDataAdapter sda = new SqlDataAdapter(query, con);

                    sda.Fill(ds);
                    if (ds.Tables.Count > 0)
                    {
                        ds.Tables[0].TableName = "BarcodeData";
                    }
                    

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
    }
}
