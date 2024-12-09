using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Web;

namespace SimplrSales.Models
{
    public class DistanceCalculation
    {
        private DataTable dt = new DataTable();
        private SqlConnection con = new SqlConnection();
        //private  string constr = "Data Source=13.67.95.127;Initial Catalog=SimplrPVMBLive;user ID=sa; password=Simplr12345@; ";
        //private  string constr = "Data Source=13.67.95.127;Initial Catalog=SimplrPVMB;user ID=sa; password=Simplr12345@; ";
        public string constr = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
        private SqlTransaction sqltran;

        public void SetRouteSequence()
        {
            //var qry = "select RouteNo,VehicleNo from routeMaster  Where RouteNo='T16R00002404' ";
            var qry = "select Distinct R.RouteNo,R.VehicleNo from routeMaster R inner join NodeTree N on N.SalesmanTerritory=R.VehicleNo Where N.DistributorID in (select DistributorID from RouteSequenceImplementation Where ImplyDate<="+ DateTime.Now.ToString("yyyy/MM/dd") + ") ";
            UpdateLog("Start : routeMaster : " + qry);

            try
            {

                System.Data.DataTable routeMasterData = getDataTableList(qry);
                for (var m = 0; m < routeMasterData.Rows.Count; m++)
                {
                    qry = "select Latitude,Longitude from salesoffice where code in (select SalesOfficeId from Nodetree where SalesmanTerritory ='" + routeMasterData.Rows[m].ItemArray[1].ToString() + "')";//veh no
                    UpdateLog(" salesoffice : " + qry);
                    System.Data.DataTable salesOfficeData = getDataTableList(qry);
                    var slat = "";
                    var slon = "";
                    var custNo = "";
                    //var elat = "";
                    //var elon = "";
                    slat = salesOfficeData.Rows[0].ItemArray[0].ToString();
                    slon = salesOfficeData.Rows[0].ItemArray[1].ToString();

                    qry = "select Latitude,Longitude,CustNo from Customer where CustNo in ( select CustNo from routedet  Where RouteNo='" + routeMasterData.Rows[m].ItemArray[0].ToString() + "')";
                    UpdateLog(" Customer : " + qry);

                    System.Data.DataTable customerData = getDataTableList(qry);
                    var tcnt = customerData.Rows.Count;
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
                        for (int i = customerData.Rows.Count - 1; i >= 0; i--)
                        {
                            DataRow dr = customerData.Rows[i];
                            if (dr["Latitude"].ToString() == slat && dr["Longitude"].ToString() == slon && dr["CustNo"].ToString() == custNo)
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
                                custNo = arrLocDis[ii].CustNo;

                                updateStopNo.Add(arrObj);
                            }
                        }
                    }
                    var qry1 = "";
                    if (updateStopNo.Count > 0)
                    {
                        for (var k = 0; k < updateStopNo.Count; k++)
                        {
                            qry = "update routedet set StopNo='" + updateStopNo[k].MarkerNo + "' where CustNo='" + updateStopNo[k].CustNo + "' and RouteNo ='" + routeMasterData.Rows[m].ItemArray[0].ToString() + "'";
                            qry1 = (qry1 == "") ? qry : qry1 + " ; " + qry;
                            // executerQuery(qry);
                        }
                    }
                    executerQuery(qry1);
                    UpdateLog(qry1);
                }
            }
            catch (Exception ex)
            {
                UpdateLog(ex.Message);
            }

            UpdateLog("Completed");

        }

        public static string dir = System.Web.HttpContext.Current.Server.MapPath("~/ViewErrorLogFiles");
        public static string _isRouteLogFile = System.Configuration.ConfigurationManager.AppSettings["_isRouteLogFile"];

        public static void UpdateLog(string query)
        {
            if (_isRouteLogFile == "False")
                return;
            if (!Directory.Exists(dir))  // if it doesn't exist, create
                Directory.CreateDirectory(dir);
            string message = string.Format("Time: {0}", DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss tt"));
            message += Environment.NewLine;
            message += "-----------------------------------------------------------";
            message += Environment.NewLine;
            message += string.Format("Query: {0}", query);
            message += Environment.NewLine;
            message += "-----------------------------------------------------------";
            message += Environment.NewLine;

            // COMMENTED 21.04.2021 =================
            string strUserId = HttpContext.Current.Session["UserName"].ToString();
            string dteinfo = DateTime.Now.ToString("dd/MM/yyyy").Replace("/", "_");
            string path = System.Web.HttpContext.Current.Server.MapPath("~/ViewErrorLogFiles/SetRouteSequence_" + strUserId + "_" + dteinfo + ".txt");

            using (StreamWriter writer = new StreamWriter(path, true))
            {
                writer.WriteLine(message);
                writer.Close();
                writer.Dispose();
            }
        }
        private double DistanceTo(double lat1, double lon1, double lat2, double lon2, char unit = 'K')
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


        private DataTable getDataTableList(string query)
        {
            try
            {
                DataSet ds = new DataSet();
                SqlConnection con = new SqlConnection(constr);
                con.Open();
                SqlDataAdapter sda = new SqlDataAdapter(query, con);
                sda.SelectCommand.CommandTimeout = 100;  //60- seconds
                sda.Fill(ds);
                con.Close();
                dt = ds.Tables[0];
                return dt;
            }
            catch (Exception ex)
            {
                // ErrorLogWithQuery(ex, query);
            }
            finally
            {
                con.Close();
            };
            return dt;
        }

        private string executerQuery(string sqlqry)
        {
            string result = "";
            con = new SqlConnection(constr);
            con.Open();

            SqlCommand cmd = new SqlCommand();

            sqltran = con.BeginTransaction("s1");

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
                result = ex.Message;
                try
                {
                    sqltran.Rollback();
                }
                catch (Exception ex1)
                {
                    result = "0";
                }
            }
            finally
            {
                con.Close();
            };

            return result;
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