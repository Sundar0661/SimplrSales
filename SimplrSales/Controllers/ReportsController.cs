using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Drawing;
using System.Text;
using System.Net;
using ZPLPrint;

namespace SimplrSales.Controllers
{
    public class ReportsController : Controller
    {
        public string _ProjectName = ConfigurationManager.AppSettings["ProjectName"];
        //
        // GET: /Reports/
        string constr = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
        string path = "";
        SqlDataReader dtr = null;
        DataTable dt;
        DataTable dtVMITrans = new DataTable();
        DataTable dtAllItems = new DataTable();
        DataTable dtInventory = new DataTable();
        DataTable dtStkReq = new DataTable();
        DataTable dtVMIWeeks = new DataTable();
        DataTable dtCategory = new DataTable();
        int flagTable = 0;

        //  public ActionResult ReportView(string InitReport, string ReportName, string LoadReport)
        public ActionResult ReportView()
        {
            try
            {

                if (Session["UserName"] != null)
                {
                    ViewBag.YearPickerLimit = CommonRule._YearPickerLimit;
                    ViewBag.isLogin = Session["isLogin"];
                    string InitReport = Session["InitReport"].ToString();
                    string ReportName = Session["ReportName"].ToString();
                    string LoadReport = Session["LoadReport"].ToString();
                    ViewBag.LoginTitle = ConfigurationManager.AppSettings["LoginTitle"] != null ? ConfigurationManager.AppSettings["LoginTitle"] : "Simplr Sales";

                    LoadReport = ReplaceSpecialCharacter(LoadReport);
                    Session["InitReport"] = InitReport;
                    Session["ReportName"] = ReportName;
                    Session["LoadReport"] = LoadReport;

                    string Query = InitReport + ";" + ReportName + ";" + LoadReport + ";";
                    //Query = " Select '2022-12-01' as Param,'Date' as ParamStr UNION Select '2022-12-04' as Param,'Date' as ParamStr union Select '' as Param,'SalesPerson' as ParamStr union Select '' as Param,'Customer' as ParamStr  ;Select 'RptIncentiveCheckNew' as ReportName  ;Exec [dbo].[Report_IncentiveDisplayCheckNew]  '2022-12-01','2022-12-04','','','','http://20.44.192.41:8080/SimplrDanoneSalesService/Photo/','http://20.44.192.41:8080/SimplrDanoneSalesService/Photo/','ADMIN'    ;";
                    CommonRule.QueryLog("Report Query Start : " + Query);
                    DataSet ds = new DataSet();
                    SqlConnection con = new SqlConnection(constr);
                    con.Open();
                    //Query = "Declare @AgentID varchar(50); if  'AZU'='ALL' Set @AgentID= '%' else Set @AgentID=concat('AZU','%') ; SELECT Item.Description as ItemName, StockOrder.StockNo, StockOrder.OrdDt as StockDt, dbo.fn_UOM_Description(StockOrderItem.ItemNo, IsNull(StockOrderItem.Qty,0)* UOM.BaseQty) as Status, StockOrder.AgentID as AgentId, StockOrderItem.ItemNo, StockOrderItem.UOM, StockOrderItem.Qty FROM StockOrder, StockOrderItem, Item, UOM,SalesManGroup Where SalesManGroup.GroupID=StockOrder.AgentID and SalesManGroup.UserID='admin' and StockOrder.StockNo = StockOrderItem.StockNo and StockOrderItem.ItemNo = Item.ItemNo  and StockOrderItem.ItemNo=UOM.ItemNo and StockOrderItem.UOM=UOM.UOM and convert(date,OrdDt) = '2018-10-26'  and StockOrder.AgentID like @AgentID  order by Item.ItemNo";
                    SqlDataAdapter da = new SqlDataAdapter(Query, con);
                    da.SelectCommand.CommandTimeout = 3600;// 600;  //30*60=1800 // 60- seconds
                    da.Fill(ds);
                    con.Close();
                    CommonRule.QueryLog("Report Query Execute done ");

                    
                  
                    Session["ReportDataset"] = ds.Copy();

                    //Added by Sundar 20/11/2022
                    if (ds.Tables[1].Rows.Count > 0)
                    {
                        ReportName = ds.Tables[1].Rows[0]["ReportName"].ToString();

                    }

                    if (ReportName == "DailyOrderDetailRepA4_2" || ReportName == "DailyOrderDetailRepDotMatrix")
                    {
                        Session["RptDailyDetDataset"] = "";
                        Session["RptDailyDetDataset"] = Session["ReportDataset"];
                        Session["RptDailyDetDataset"] = ds.Copy();
                    }
                    //Finished

                    //  Session["ReportDatasetQry"] = Query;
                    return View();
                }
                else
                {
                    return RedirectToAction("Login", "Login", new { sessionexpired = "sessionexpired" });
                }

            }
            catch (Exception ex)
            {
                CommonRule.QueryLog("Report Exception : " + ex.Message);
            }
            return View();

        }
        //public ActionResult ReportViewA(string ir, string rn, string lr)
        //{
        //    Session["InitReport"] = ir == null ? "" : ir;
        //    Session["ReportName"] = rn == null ? "" : rn;
        //    Session["LoadReport"] = lr == null ? "" : lr;
        //    return RedirectToAction("ReportView");
        //}
        [HttpPost]
        public ActionResult Store_ReportParams(string InitReport, string ReportName, string LoadReport, string Print)
        {
            Session["InitReport"] = InitReport == null ? "" : InitReport;
            Session["ReportName"] = ReportName == null ? "" : ReportName;
            Session["LoadReport"] = LoadReport == null ? "" : LoadReport;
            Session["IsPrint"] = Print == null ? "FALSE" : Print;
            return Json(1);
        }

        [HttpPost]
        public ActionResult Store_ReportParams1(string InitReport, string ReportName, string LoadReport, string Print,string lblSize)
        {
            Session["InitReport"] = InitReport == null ? "" : InitReport;
            Session["ReportName"] = ReportName == null ? "" : ReportName;
            Session["LoadReport"] = LoadReport == null ? "" : LoadReport;
            Session["IsPrint"] = Print == null ? "FALSE" : Print;
            Session["lblSize"] = lblSize;
            return Json(1);
        }
        public ActionResult ReportView2()
        {
            if (Session["UserName"] != null)
            {
               return RedirectToAction("ReportView");
            }
            else
            {
                return RedirectToAction("Login", "Login", new { sessionexpired = "sessionexpired" });
            }
        }

       

        public ActionResult ReportView1(string InitReport, string ReportName, string LoadReport,string Print)
        {
            //try
            //{
                if (Session["UserName"] != null)
                {
                    InitReport = InitReport.Replace("ampersandsymbol", "&");
                    LoadReport = LoadReport.Replace("ampersandsymbol", "&");
                    Session["InitReport"] = InitReport == null ? "" : InitReport;
                    Session["ReportName"] = ReportName == null ? "" : ReportName;
                    Session["LoadReport"] = LoadReport == null ? "" : LoadReport;
                    Session["IsPrint"] = Print == null ? "FALSE" : Print;
                    return RedirectToAction("ReportView");
                }
                else
                {
                    return RedirectToAction("Login", "Login", new { sessionexpired = "sessionexpired" });
                }
            //}
            //catch (Exception)
            //{

            //  //  throw;
            //}
        }


        //[HttpPost]
        public JsonResult GETADDRESS(string date, string SalesmanTerritory)
        {
            int i = 0;
            CommonRule cr = new CommonRule();
            string sPosition = "", sAgent = "", sAgent1 = "", str = "";
            try
            {
                if (SalesmanTerritory == "ALL")
                {
                    sAgent = " ";
                }
                else
                {
                    /*
                    sAgent = " and Customer.SalesAgent in ( Select Distinct GroupId from SalesManGroup Where GroupId= " + "'" + SalesmanTerritory + "'" + ")";
                    sAgent1 = " and NewCust.AgentID in ( Select Distinct GroupId from SalesManGroup Where GroupId=  " + "'" + SalesmanTerritory + "'" + ")";
                    */

                    sAgent = " and (Customer.SalesAgent in ( Select Distinct GroupId from SalesManGroup Where GroupId= " + "'" + SalesmanTerritory + "'" + ") or Customer.SalesAgent in (Select Distinct Code from SalesAgent Where Code = " + "'" + SalesmanTerritory + "'" + ")) ";
                    sAgent1 = " and (NewCust.AgentID in ( Select Distinct GroupId from SalesManGroup Where GroupId=  " + "'" + SalesmanTerritory + "'" + ") or NewCust.AgentID in (Select Distinct Code from SalesAgent Where Code = " + "'" + SalesmanTerritory + "'" + ")) ";

                }
                //for (i = 0; i <= 3; i++)
                for (i = 0; i < 1; i++)
                {
                    SqlConnection con = new SqlConnection(constr);
                    var qy = "Select Distinct IsNull(CustVisit.Latitude,0) as Latitude, IsNull(CustVisit.Longitude,0) as Longitude from CustVisit inner join Customer on Customer.CustNo=CustVisit.CustID where (Position='Not Found' or Position is Null) and Convert(date,TransDate) = '" + date + "' " + sAgent + " union Select Distinct IsNull(CustVisit.Latitude,0) as Latitude, IsNull(CustVisit.Longitude,0) as Longitude from CustVisit inner join NewCust on NewCust.CustID=CustVisit.CustID where (Position='Not Found' or Position is Null) and Convert(date,TransDate) ='" + date + "' " + sAgent1;
                    SqlCommand command = new SqlCommand("Select Distinct IsNull(CustVisit.Latitude,0) as Latitude, IsNull(CustVisit.Longitude,0) as Longitude from CustVisit inner join Customer on Customer.CustNo=CustVisit.CustID where (Position='Not Found' or Position is Null) and Convert(date,TransDate) = '" + date + "' " + sAgent + " union Select Distinct IsNull(CustVisit.Latitude,0) as Latitude, IsNull(CustVisit.Longitude,0) as Longitude from CustVisit inner join NewCust on NewCust.CustID=CustVisit.CustID where (Position='Not Found' or Position is Null) and Convert(date,TransDate) ='" + date + "' " + sAgent1, con);
                    con.Open();
                    dtr = command.ExecuteReader();
                    while (dtr.Read() == true)
                    {
                        sPosition = GetPoint(dtr["Latitude"].ToString(), dtr["Longitude"].ToString());
                        //SqlCommand comm = new SqlCommand("Update CustVisit Set Position=" + (sPosition) + " where Latitude=" + dtr["Latitude"].ToString() + " and Longitude=" + dtr["Longitude"].ToString(), con);
                        //comm.ExecuteNonQuery();
                        //str = " Update CustVisit Set Position='" + sPosition + "' where Latitude=" + dtr["Latitude"].ToString() + " and Longitude=" + dtr["Longitude"].ToString() + " ";
                        //todo1
                        //str = " Update CustVisit Set Position='" + sPosition + "' where Convert(real,Latitude)=convert(real," + dtr["Latitude"].ToString() + ") and convert(real,Longitude)=convert(real," + dtr["Longitude"].ToString() + ") ";
                        str = " Update CustVisit Set Position='" + sPosition + "' where Convert(real,Latitude)=convert(real," + dtr["Latitude"].ToString() + ") and convert(real,Longitude)=convert(real," + dtr["Longitude"].ToString() + ") and Convert(date,TransDate) ='" + date + "' ";

                        cr.executerQuery(str);
                    }
                    dtr.Close();
                }
                return Json(1);
            }
            catch (Exception ex)
            {
                return Json(0);
            }
            finally
            {
            }

        }

        public JsonResult GETADDRESS1(string date, string SalesmanTerritory)
        {
            CommonRule commonRule = new CommonRule();
            string str1 = "";
            try
            {
                string str2;
                if (SalesmanTerritory == "ALL")
                {
                    str2 = " ";
                }
                else
                {
                    str2 = " and (Customer.SalesAgent in ( Select Distinct GroupId from SalesManGroup Where GroupId= '" + SalesmanTerritory + "') or Customer.SalesAgent in (Select Distinct Code from SalesAgent Where Code = '" + SalesmanTerritory + "')) ";
                    str1 = " and (NewCust.AgentID in ( Select Distinct GroupId from SalesManGroup Where GroupId=  '" + SalesmanTerritory + "') or NewCust.AgentID in (Select Distinct Code from SalesAgent Where Code = '" + SalesmanTerritory + "')) ";
                }
                for (int index = 0; index <= 3; ++index)
                {
                    SqlConnection connection = new SqlConnection(this.constr);
                    var qy = "Select Distinct IsNull(CustVisit.Latitude,0) as Latitude, IsNull(CustVisit.Longitude,0) as Longitude from CustVisit inner join Customer on Customer.CustNo=CustVisit.CustID where (Position='Not Found' or Position is Null) and Convert(date,TransDate) = '" + date + "' " + str2 + " union Select Distinct IsNull(CustVisit.Latitude,0) as Latitude, IsNull(CustVisit.Longitude,0) as Longitude from CustVisit inner join NewCust on NewCust.CustID=CustVisit.CustID where (Position='Not Found' or Position is Null) and Convert(date,TransDate) ='" + date + "' " + str1;
                    SqlCommand sqlCommand = new SqlCommand("Select Distinct IsNull(CustVisit.Latitude,0) as Latitude, IsNull(CustVisit.Longitude,0) as Longitude from CustVisit inner join Customer on Customer.CustNo=CustVisit.CustID where (Position='Not Found' or Position is Null) and Convert(date,TransDate) = '" + date + "' " + str2 + " union Select Distinct IsNull(CustVisit.Latitude,0) as Latitude, IsNull(CustVisit.Longitude,0) as Longitude from CustVisit inner join NewCust on NewCust.CustID=CustVisit.CustID where (Position='Not Found' or Position is Null) and Convert(date,TransDate) ='" + date + "' " + str1, connection);
                    connection.Open();
                    this.dtr = sqlCommand.ExecuteReader();
                    while (this.dtr.Read())
                    {
                        string sqlqry = " Update CustVisit Set Position='" + this.GetPoint(this.dtr["Latitude"].ToString(), this.dtr["Longitude"].ToString()) + "' where Convert(real,Latitude)=convert(real," + this.dtr["Latitude"].ToString() + ") and convert(real,Longitude)=convert(real," + this.dtr["Longitude"].ToString() + ") ";
                        commonRule.executerQuery(sqlqry);
                        var ss = sqlqry;
                    }
                    this.dtr.Close();
                }
                return this.Json((object)1);
            }
            catch (Exception ex)
            {
                return this.Json((object)0);
            }
        }

        public JsonResult GETADDRESSOld(string date, string SalesmanTerritory)
        {
            int i = 0;
            string sPosition = "";
            try
            {
                for (i = 0; i <= 3; i++)
                {

                    SqlConnection con = new SqlConnection(constr);
                    SqlCommand command = new SqlCommand("Select Distinct IsNull(CustVisit.Latitude,0) as Latitude, IsNull(CustVisit.Longitude,0) as Longitude from CustVisit inner join Customer on Customer.CustNo=CustVisit.CustID where (Position='Not Found' or Position is Null) and Convert(date,TransDate) = '" + date + "' and Customer.SalesAgent = '" + SalesmanTerritory + "' union Select Distinct IsNull(CustVisit.Latitude,0) as Latitude, IsNull(CustVisit.Longitude,0) as Longitude from CustVisit inner join NewCust on NewCust.CustID=CustVisit.CustID where (Position='Not Found' or Position is Null) and Convert(date,TransDate) ='" + date + "' and NewCust.AgentID= '" + SalesmanTerritory + "' ; ", con);
                    con.Open();
                    dtr = command.ExecuteReader();
                    while (dtr.Read() == true)
                    {
                        sPosition = GetPoint(dtr["Latitude"].ToString(), dtr["Longitude"].ToString());
                        SqlCommand comm = new SqlCommand("Update CustVisit Set Position=" + (sPosition) + " where Latitude=" + dtr["Latitude"].ToString() + " and Longitude=" + dtr["Longitude"].ToString(), con);
                        comm.ExecuteNonQuery();
                    }
                    dtr.Close();
                }
                return Json(1);
            }
            catch (Exception ex)
            {
                return Json(0);
            }
            finally
            {
            }
        }

        public string GetPoint(string Latitude, string Longitude)
        {
            string sAddress = "Not Found";
            System.Xml.XmlDocument doc;
            System.Xml.XmlNamespaceManager ns;
            System.Xml.XmlNodeList nodes;
            // Create a new XmlDocument  
            doc = new System.Xml.XmlDocument();
            var latLongAPIKey = System.Configuration.ConfigurationManager.AppSettings["LatLongAPIKey"];
            var client_latLongAPIKey = System.Configuration.ConfigurationManager.AppSettings["Client_LatLongAPIKey"];
            // Load data  
            if (_ProjectName == "JSU" || _ProjectName == "CPF")
            {
                // var urlParameter = "https://maps.googleapis.com/maps/api/geocode/xml?key=" + latLongAPIKey + "&latlng=" + Latitude + "," + Longitude + "&sensor=false";
                doc.Load("https://maps.googleapis.com/maps/api/geocode/xml?key=" + latLongAPIKey + "&latlng=" + Latitude + "," + Longitude + "&sensor=false");
                // JSU only
                //doc.Load("https://maps.googleapis.com/maps/api/geocode/xml?key=AIzaSyCVUYSku6aiKcg39XJy8OA9sL2H2Vlt9t4&latlng=" + Latitude + "," + Longitude + "&sensor=false");// JSU only
                //doc.Load("https://maps.googleapis.com/maps/api/geocode/xml?key=AIzaSyC6hPiIQkMqR5LJ1a1ib-Tz21cEPZqnFMg&latlng=" + Latitude + "," + Longitude + "&sensor=false");// JSU only
            }
            else
            {
                doc.Load("https://maps.googleapis.com/maps/api/geocode/xml?key=" + client_latLongAPIKey + "&latlng=" + Latitude + "," + Longitude + "&sensor=false");
            }


            // Get formatted_address
            nodes = doc.SelectNodes("/GeocodeResponse/result/formatted_address");

            foreach (System.Xml.XmlNode node in nodes)
            {
                sAddress = node.InnerText;
                if (sAddress.Trim() != "")
                    break;
            }
            return sAddress;
        }


        //[HttpPost]
        public JsonResult GETDISTANCE(string date, string SalesmanTerritory)
        {
            GeoCodeCalc CalcObj = new GeoCodeCalc();
            // string sCustAdd = "";
            DateTime dStartVisit = DateTime.Now;
            DateTime dEndVisit = DateTime.Now;
            SqlConnection con = new SqlConnection(constr);
            SqlConnection con1 = new SqlConnection(constr);

            try
            {
                var query = "Select * from ActivityRep Order by CustID, TransDate ";
                CommonRule.QueryLog("GETDISTANCE step 1 : " + query);
                SqlCommand com = new SqlCommand("Select * from ActivityRep Order by CustID, TransDate ", con);
                con.Open();
                dtr = com.ExecuteReader();
                while (dtr.Read() == true)
                {
                    TimeSpan dInTimeSent;

                    // If sCustAdd <> dtr("CustID") Then
                    if (dtr["TransType"].ToString() == "CLOCK-IN")
                        dStartVisit = Convert.ToDateTime(dtr["TransDate"].ToString());
                    if (dtr["TransType"].ToString() == "CLOCK-OUT")
                    {
                        dEndVisit = Convert.ToDateTime(dtr["TransDate"].ToString());
                        try
                        {
                            dInTimeSent = dEndVisit.Subtract(dStartVisit);
                            query = "Update ActivityRep Set Amt=" + dInTimeSent + " where CustID=" + dtr["CustID"].ToString() + " and TransDate=" + dtr["TransDate"].ToString() + " and TransType='CLOCK-OUT'";
                            //CommonRule.QueryLog("GETDISTANCE step 2 : " + query);
                            SqlCommand com1 = new SqlCommand("Update ActivityRep Set Amt=" + dInTimeSent + " where CustID=" + dtr["CustID"].ToString() + " and TransDate=" + dtr["TransDate"].ToString() + " and TransType='CLOCK-OUT'", con1);
                            con1.Open();
                            com1.ExecuteNonQuery();
                            dStartVisit = default(DateTime);
                            dEndVisit = default(DateTime);
                            con1.Close();
                        }
                        catch (Exception ex)
                        {
                            con1.Close();
                            dInTimeSent = TimeSpan.Zero;
                            return Json(0);
                        }
                    }
                }
                dtr.Close();
                con.Close();


                string strSql = "Select  ISNULL(Customer.Longitude,0) as CLongitude,ISNULL(Customer.Latitude,0) as CLatitude,* from ActivityRep inner join Customer on Customer.CustNO=ActivityRep.CustID Order by TransDate";
                CommonRule.QueryLog("GETDISTANCE step 3 : " + strSql);
                SqlCommand comDistance = new SqlCommand(strSql, con);
                con.Open();
                dtr = comDistance.ExecuteReader();
                while (dtr.Read())
                {

                    double Deviation = Math.Round(CalcObj.CalcDistance(Convert.ToDouble(dtr["Latitude"].ToString()), Convert.ToDouble(dtr["longitude"].ToString()), Convert.ToDouble(dtr["CLatitude"].ToString()), Convert.ToDouble(dtr["CLongitude"].ToString())), 2);
                    //query = "Update ActivityRep set Packer=" + Deviation + " Where CustID=" + dtr["CustID"].ToString() + "  and TransNo=" + dtr["TransNo"].ToString();
                    //CommonRule.QueryLog("GETDISTANCE step 4 : " + strSql);
                    SqlCommand com1 = new SqlCommand("Update ActivityRep set Packer=" + Deviation + " Where CustID=" + dtr["CustID"].ToString() + "  and TransNo=" + dtr["TransNo"].ToString(), con1);
                    con1.Open();
                    com1.ExecuteNonQuery();
                    con1.Close();
                }
                dtr.Close();
                return Json(1);
            }
            catch (Exception ex)
            {
                return Json(0);
            }
            finally
            {
            }
        }

        //Added by Sundar 20/11/2022
        //Added by Sundar 20/11/2022
        public String updateOrderDet(string ReportName = "")
        {
            CommonRule commonRule = new CommonRule();
            string str1 = "";
            try
            {
                DataSet ds = new DataSet();
                ds = (DataSet)Session["RptDailyDetDataset"];
                string documentNo = "";
                for (int i = 0; i < ds.Tables[2].Rows.Count; i++)
                {
                    if (i == 0)
                    {
                        documentNo = "'" + ds.Tables[2].Rows[i]["InvNo"].ToString() + "'";
                    }
                    else
                    {
                        documentNo = documentNo + "," + "'" + ds.Tables[2].Rows[i]["InvNo"].ToString() + "'";
                    }

                }
                string updateQry = "";
                string rptType = "";
                SqlConnection con = new SqlConnection(constr);
                var qy = "select QueryText from queryConfig  where screenName='PRT_Update'";
                SqlCommand command = new SqlCommand(qy, con);
                con.Open();
                dtr = command.ExecuteReader();
                while (dtr.Read() == true)
                {
                    if (ReportName == "DailyOrderDetailRepA4_2")
                    {
                        rptType = "A4";
                    }
                    else
                    {
                        rptType = "Dot Matrix";
                    }
                    updateQry = dtr["QueryText"].ToString();
                    updateQry = updateQry.Replace("{SessionUser}", "'" + Session["UserName"] + "'");
                    updateQry = updateQry.Replace("{rptType}", "'" + rptType + "'");
                    updateQry = updateQry.Replace("{DocNo}", "" + documentNo + "");

                    commonRule.executerQuery(updateQry);
                }
                dtr.Close();
                //string sqlqry = " Update OrderHdr Set printDt=GETDATE() , printby = '" + Session["UserName"] + "' where OrdNo IN(" + documentNo + ") ";
                //commonRule.executerQuery(sqlqry);
                return updateQry;
            }
            catch (Exception ex)
            {
                return "Failed";
            }
        }
        //FInished
        //FInished

        public string ReplaceSpecialCharacter(string data)
        {
            data = data.Replace("plussymbol", "+");
            data = data.Replace("\"", "");
            data = data.Replace("ampersandsymbol", "&");
            return data.Replace("hashsymbol", "#");
        }

        public string GetDocumentFolder()
        {
            return ConfigurationManager.AppSettings["DocumentFolder"];
        }

        public string GetCloudFolder()
        {
            return ConfigurationManager.AppSettings["UrlRPTImageString"];
        }

        public void FTPDownloadFile(string downloadpath, string ftpuri, string Img)
        {
            System.Net.WebClient request = new System.Net.WebClient();

            // ' Confirm the Network credentials based on the user name and password passed in.
            // request.Credentials = New Net.NetworkCredential(ftpusername, ftppassword)
            // For i As Integer = 0 To arr.Count - 1
            // 'Read the file data into a Byte array
            try
            {
                //Img = "S1S00027";
                //Img = "AC2S000001";


                byte[] bytes = request.DownloadData(ftpuri + Img + "_00.png");


                // Dim bytes() As Byte = request.DownloadData(ftpuri & Img & "*")
                FileStream DownloadStream = System.IO.File.Create(downloadpath + Img + "_00.png");


                // Dim DownloadStream As FileStream = IO.File.Create(downloadpath & Img & "*")
                // Stream this data into the file
                DownloadStream.Write(bytes, 0, bytes.Length);

                // Close the FileStream
                DownloadStream.Close();

            }
            catch (Exception ex)
            {
                string path = System.Web.HttpContext.Current.Server.MapPath("~/FTPErrorLog.txt");
                //System.IO.File.AppendAllText(path, Environment.NewLine + "The following file could not be found in the FTP Path: " + Img + "_00.png");
                System.IO.File.AppendAllText(path, Environment.NewLine + ex.Message.ToString() + " : " + Img + "_00.png");
                //System.IO.File.AppendAllText(Application.StartupPath + @"\FTPErrorLog.txt", "The following file could not be found in the FTP Path: " + Img + "_00.png" + Constants.vbCrLf);
            }


            // Next
            request.Dispose();
        }

        public void FTPDownloadFile1(string downloadpath, string ftpuri, string Img)
        {
            System.Net.WebClient request = new System.Net.WebClient();

            // ' Confirm the Network credentials based on the user name and password passed in.
            // request.Credentials = New Net.NetworkCredential(ftpusername, ftppassword)
            // For i As Integer = 0 To arr.Count - 1
            // 'Read the file data into a Byte array
            try
            {
                //Img = "S1S00027";
                //Img = "AC2S000001";


                byte[] bytes = request.DownloadData(ftpuri + Img + ".png");


                // Dim bytes() As Byte = request.DownloadData(ftpuri & Img & "*")
                FileStream DownloadStream = System.IO.File.Create(downloadpath + Img + ".png");


                // Dim DownloadStream As FileStream = IO.File.Create(downloadpath & Img & "*")
                // Stream this data into the file
                DownloadStream.Write(bytes, 0, bytes.Length);

                // Close the FileStream
                DownloadStream.Close();

            }
            catch (Exception ex)
            {
                string path = System.Web.HttpContext.Current.Server.MapPath("~/FTPErrorLog.txt");
                //System.IO.File.AppendAllText(path, Environment.NewLine + "The following file could not be found in the FTP Path: " + Img + "_00.png");
                System.IO.File.AppendAllText(path, Environment.NewLine + ex.Message.ToString() + " : " + Img + "_00.png");
                //System.IO.File.AppendAllText(Application.StartupPath + @"\FTPErrorLog.txt", "The following file could not be found in the FTP Path: " + Img + "_00.png" + Constants.vbCrLf);
            }


            // Next
            request.Dispose();
        }

        public void BuildDataTable()
        {
            DataTable dt = new DataTable();

            dt.Columns.Add("SerInvNo", typeof(System.String));
            dt.Columns.Add("CustomerID", typeof(System.String));
            dt.Columns.Add("CustName", typeof(System.String));
            dt.Columns.Add("ServiceDt", typeof(System.DateTime));
            dt.Columns.Add("ServiceType", typeof(System.String));
            dt.Columns.Add("Details", typeof(System.String));
            dt.Columns.Add("AgentID", typeof(System.String));
            dt.Columns.Add("DisplayImage", typeof(System.Byte));
            dt.Columns.Add("ImageFileName", typeof(System.Byte));
        }

        public JsonResult LOADSERVICE(string fromdate, string todate, string salesmanterritory, string userid, string servicetype, string reasoncode)
        {
            //DataTable dt = new DataTable();

            //dt.Columns.Add("SerInvNo", typeof(System.String));
            //dt.Columns.Add("CustomerID", typeof(System.String));
            //dt.Columns.Add("CustName", typeof(System.String));
            //dt.Columns.Add("ServiceDt", typeof(System.DateTime));
            //dt.Columns.Add("ServiceType", typeof(System.String));
            //dt.Columns.Add("Details", typeof(System.String));
            //dt.Columns.Add("AgentID", typeof(System.String));
            //dt.Columns.Add("DisplayImage", typeof(System.Byte));
            //dt.Columns.Add("ImageFileName", typeof(System.Byte));
            //DataRow row;

            SqlCommand comstr = new SqlCommand();
            try
            {
                CommonRule cr = new CommonRule();
                SqlConnection con = new SqlConnection(constr);

                string sAgent = "", sPath = "", sServiceType = "", sReasonCode = "";
                string SerInvNo = "", CustomerID = "", CustName = "", ServiceType = "", Details = "", AgentID = "";
                DateTime ServiceDt = DateTime.Now;
                byte[] DisplayImage = new byte[0], ImageFileName = new byte[0];
                string sImg = "";
                string sqlQuery = "";

                if (salesmanterritory == "ALL")
                {
                    sAgent = " ";
                }
                else
                {
                    sAgent = " and Customer.SalesAgent= " + "'" + salesmanterritory + "'";
                }
                // COMMENTED 05.02.2021
                //if (servicetype == "")
                //{
                //    sServiceType = " ";
                //}
                //else
                //{
                //    sServiceType = " and Service.ServiceID = " + "'" + servicetype + "'";
                //}

                //if (reasoncode == "")
                //{
                //    sReasonCode = " ";
                //}
                //else
                //{
                //    sReasonCode = " and Service.ReasonCode = " + "'" + reasoncode + "'";
                //}

                if (servicetype == "" || servicetype == "ALL" || servicetype == null)
                {
                    sServiceType = " ";
                }
                else
                {
                    sServiceType = " and Service.ServiceID = " + "'" + servicetype + "'";
                }

                if (reasoncode == "" || reasoncode == "ALL" || reasoncode == null)
                {
                    sReasonCode = " ";
                }
                else
                {
                    sReasonCode = " and Service.ReasonCode = " + "'" + reasoncode + "'";
                }

                sPath = GetDocumentFolder();

                //sPath = System.IO.Path.Combine (Server.MapPath (sPath ),sPath);
                // COMMENTED 05.02.2021
                //SqlCommand com1 = new SqlCommand(" Delete from ServiceRep ; select Distinct SerInvNo, ServiceDt, CustomerId, Customer.CustName, 'Merchandising' as ServiceType, Service.Details, SalesAgent.Code as AgentID from Service, Customer, SalesAgent where   Customer.SalesAgent = SalesAgent.Code and Customer.CustNo = Service.CustomerID and convert(date,Service.ServiceDt) Between '" + fromdate + "' and '" + todate + "' " + sAgent + sServiceType + sReasonCode, con);
                SqlCommand com1 = new SqlCommand(" Delete from ServiceRep ; select Distinct SerInvNo, ServiceDt, CustomerId, Customer.CustName, 'Merchandising' as ServiceType, Service.Details, Customer.SalesAgent as AgentID from Service, Customer where (Customer.SalesAgent in (Select Code from SalesAgent) or Customer.SalesAgent in (Select GroupID from SalesManGroup Where UserID = '" + userid.ToString() + "') ) and Customer.CustNo = Service.CustomerID and convert(date,Service.ServiceDt) Between '" + fromdate + "' and '" + todate + "' " + sAgent + sServiceType + sReasonCode, con);

                con.Open();
                dtr = com1.ExecuteReader();
                while (dtr.Read() == true)
                {
                    SerInvNo = dtr["SerInvNo"].ToString();
                    FTPDownloadFile(sPath, GetCloudFolder(), dtr["SerInvNo"].ToString());
                    DirectoryInfo dir = new DirectoryInfo(sPath);
                    FileInfo[] arrFo = dir.GetFiles("*" + dtr["SerInvNo"].ToString() + "*");
                    if (arrFo.Length > 0)
                    {
                        for (int i = 0; i < arrFo.Length; i++)
                        {
                            SerInvNo = dtr["SerInvNo"].ToString();
                            ServiceDt = Convert.ToDateTime(dtr["ServiceDt"].ToString());
                            CustomerID = dtr["CustomerId"].ToString();
                            CustName = dtr["CustName"].ToString();
                            ServiceType = dtr["ServiceType"].ToString();
                            Details = dtr["Details"].ToString();
                            AgentID = dtr["AgentID"].ToString();

                            FileInfo fo = arrFo[i];
                            sImg = sPath + fo.Name;

                            if (System.IO.File.Exists(sImg))
                            { }
                            else
                            {
                                sImg = sPath + "blank.png";
                            }
                            Image imageProduct = Image.FromFile(sImg);
                            int iHeight = 120;
                            int iWidth = 160;

                            //if (imageProduct.Size.Height / iHeight > imageProduct.Size.Width / iWidth)
                            //{
                            //    iHeight = iHeight;
                            //    iWidth = (iHeight / imageProduct.Size.Height) * imageProduct.Size.Width;
                            //}
                            //else
                            //{
                            //    iHeight = (iWidth / imageProduct.Size.Width) * imageProduct.Size.Height;
                            //    iWidth = iWidth;
                            //}
                            Bitmap bm = new Bitmap(imageProduct, iWidth, iHeight);

                            MemoryStream ms = new MemoryStream();
                            bm.Save(ms, System.Drawing.Imaging.ImageFormat.Bmp);
                            byte[] bytImageData = new byte[ms.Length - 1];
                            bytImageData = ms.ToArray();

                            ImageFileName = bytImageData;

                            //row = dt.NewRow();
                            //row["SerInvNo"] = dtr ["SerInvNo"].ToString ();
                            //row["ServiceDt"] = dtr["ServiceDt"];
                            //row["CustomerId"] = dtr["CustomerId"].ToString();
                            //row["CustName"] = dtr["CustName"].ToString();
                            //row["ServiceType"] = dtr["ServiceType"].ToString();
                            //row["Details"] = dtr["Details"].ToString();
                            //row["AgentID"] = dtr["AgentID"].ToString();
                            //row["ImageFileName"] = bytImageData;
                            //dt.Rows.Add(row);

                            //for (int cnt =0; cnt < dt.Rows .Count -1 ; cnt++)
                            //{
                            //    sqlQuery += " Insert into ServiceRep (SerInvNo,CustomerID,CustName,ServiceType,Details,ServiceDt,AgentID,ImageFileName) values ( '" + dt.Rows[cnt]["SerInvNo"].ToString() + "','" + dt.Rows[cnt]["CustomerID"].ToString() + "','" + dt.Rows[cnt]["CustName"].ToString() + "','" + dt.Rows[cnt]["ServiceType"].ToString() + "','" + dt.Rows[cnt]["Details"].ToString() + "','" + dt.Rows[cnt]["ServiceDt"] + "','" + dt.Rows[cnt]["AgentID"].ToString() + "','" + dt.Rows[cnt]["ImageFileName"].ToString() + "') ; ";
                            //}

                            sqlQuery = " Insert into ServiceRep (SerInvNo,CustomerID,CustName,ServiceType,Details,ServiceDt,AgentID,ImageFileName) values ('" + SerInvNo + "','" + CustomerID + "','" + CustName + "','" + ServiceType + "','" + Details + "','" + ServiceDt + "','" + AgentID + "',@C1) ; ";

                            //comstr  = new SqlCommand(sqlQuery, con);
                            //comstr.Parameters.AddWithValue("@C3", SqlDbType.Binary).Value = ImageFileName;

                            //comstr.ExecuteNonQuery();                        //con.close();
                            cr.ExecuteNonQueryWithImage(sqlQuery, ImageFileName);
                        }
                    }
                    else
                    {
                        SerInvNo = dtr["SerInvNo"].ToString();
                        ServiceDt = Convert.ToDateTime(dtr["ServiceDt"].ToString());
                        CustomerID = dtr["CustomerId"].ToString();
                        CustName = dtr["CustName"].ToString();
                        ServiceType = dtr["ServiceType"].ToString();
                        Details = dtr["Details"].ToString();
                        AgentID = dtr["AgentID"].ToString();

                        sImg = sPath + "blank.png";

                        if (System.IO.File.Exists(sImg))
                        { }
                        else
                        {
                            sImg = sPath + "blank.png";
                        }
                        Image imageProduct = Image.FromFile(sImg);

                        int iHeight = 120;
                        int iWidth = 160;
                        //if (imageProduct.Size.Height / iHeight > imageProduct.Size.Width / iWidth)
                        //{
                        //    iHeight = iHeight;
                        //    iWidth = (iHeight / imageProduct.Size.Height) * imageProduct.Size.Width;
                        //}
                        //else
                        //{
                        //    iHeight = (iWidth / imageProduct.Size.Width) * imageProduct.Size.Height;
                        //    iWidth = iWidth;
                        //}

                        Bitmap bm = new Bitmap(imageProduct, iWidth, iHeight);
                        MemoryStream ms = new MemoryStream();
                        bm.Save(ms, System.Drawing.Imaging.ImageFormat.Bmp);
                        byte[] bytImageData = new byte[ms.Length - 1];
                        bytImageData = ms.ToArray();

                        ImageFileName = bytImageData;

                        sqlQuery = " Insert into ServiceRep (SerInvNo,CustomerID,CustName,ServiceType,Details,ServiceDt,AgentID,ImageFileName) values ('" + SerInvNo + "','" + CustomerID + "','" + CustName + "','" + ServiceType + "','" + Details + "','" + ServiceDt + "','" + AgentID + "',@C1) ; ";

                        cr.ExecuteNonQueryWithImage(sqlQuery, ImageFileName);
                        //comstr = new SqlCommand(sqlQuery, con);
                        //comstr.Parameters.AddWithValue("@C3", SqlDbType.Binary).Value = ImageFileName;

                        //con.open();
                        //cmd.ExecuteNonQuery();                        //con.close();
                        //cr.ExecuteNonQuery(sqlQuery);
                    }
                }

                dtr.Close();
                dtr.Dispose();

                //cr.ExecuteNonQuery(sqlQuery);

                //comstr.ExecuteNonQuery(); 

                return Json(1);
            }
            catch (Exception ex)
            {
                return Json(0);
            }
            finally
            {
            }
        }


        public JsonResult LOADPRICESURVEY(string fromdate, string todate, string userid)
        {
            try
            {
                CommonRule cr = new CommonRule();
                SqlConnection con = new SqlConnection(constr);

                string sPath = "", TempDocNo = "", sServiceNo = "";
                string DocNo = "", ItemID = "", mrp = "", price = "", CustID = "", Remarks = "";
                DateTime DocDate = DateTime.Now;
                Boolean OOS = false;
                byte[] imgLBL = new byte[0];
                int j = 0;
                string sImg = "", sqlQuery = "";

                sPath = GetDocumentFolder();
                SqlCommand com1 = new SqlCommand(" select Distinct PriceSurvey.* from PriceSurvey, Customer, SalesManGroup where SalesManGroup.UserID ='" + userid + "' and Customer.SalesAgent = SalesManGroup.GroupID and Customer.CustNo = PriceSurvey.CustID and convert(date,PriceSurvey.DocDate) Between '" + fromdate + "' and '" + todate + "' ", con);

                con.Open();
                dtr = com1.ExecuteReader();
                while (dtr.Read() == true)
                {
                    sServiceNo = dtr["DocNo"].ToString();
                    if (TempDocNo != sServiceNo)
                    {
                        TempDocNo = sServiceNo;
                        j = 0;
                        j = j + 1;
                    }
                    else
                    {
                        j = j + 1;
                    }

                    FTPDownloadFile(sPath, GetCloudFolder(), dtr["DocNo"].ToString() + "_ImageName_" + j.ToString() + ".png");
                    DirectoryInfo dir = new DirectoryInfo(sPath);
                    FileInfo[] arrFo = dir.GetFiles(dtr["DocNo"].ToString() + "_ImageName_" + j.ToString() + ".png");
                    if (arrFo.Length > 0)
                    {
                        for (int i = 0; i < arrFo.Length - 1; i++)
                        {
                            DocNo = dtr["DocNO"].ToString();
                            DocDate = Convert.ToDateTime(dtr["DocDate"].ToString());
                            ItemID = dtr["ItemID"].ToString();
                            mrp = dtr["mrp"].ToString();
                            price = dtr["price"].ToString();
                            OOS = Convert.ToBoolean(dtr["OOS"].ToString());
                            CustID = dtr["CustID"].ToString();

                            FileInfo fo = arrFo[i];
                            sImg = sPath + fo.Name;

                            if (System.IO.File.Exists(sImg))
                            { }
                            else
                            {
                                sImg = sPath + "blank.png";
                            }

                            Image imageProduct = Image.FromFile(sImg);
                            int iHeight = 120;
                            int iWidth = 160;

                            if (imageProduct.Size.Height / iHeight > imageProduct.Size.Width / iWidth)
                            {
                                iHeight = iHeight;
                                iWidth = (iHeight / imageProduct.Size.Height) * imageProduct.Size.Width;
                            }
                            else
                            {
                                iHeight = (iWidth / imageProduct.Size.Width) * imageProduct.Size.Height;
                                iWidth = iWidth;
                            }
                            Bitmap bm = new Bitmap(imageProduct, iWidth, iHeight);
                            MemoryStream ms = new MemoryStream();
                            bm.Save(ms, System.Drawing.Imaging.ImageFormat.Bmp);
                            byte[] bytImageData = new byte[ms.Length - 1];
                            bytImageData = ms.ToArray();

                            imgLBL = bytImageData;

                            sqlQuery = " Insert into PriceSurveyRpt (DocNo,DocDate,ItemId,Mrp,Price,OOS,CustId,Remarks,ImgLBL) Values ('" + DocNo + "','" + DocDate + "','" + ItemID + "','" + mrp + "','" + price + "','" + OOS + "','" + CustID + "','" + Remarks + "',@C1) ; ";

                            cr.ExecuteNonQueryWithImage(sqlQuery, imgLBL);
                        }
                    }
                    else
                    {
                        DocNo = dtr["DocNO"].ToString();
                        DocDate = Convert.ToDateTime(dtr["DocDate"].ToString());
                        ItemID = dtr["ItemID"].ToString();
                        mrp = dtr["mrp"].ToString();
                        price = dtr["price"].ToString();
                        OOS = Convert.ToBoolean(dtr["OOS"].ToString());
                        CustID = dtr["CustID"].ToString();

                        sImg = sPath + "blank.png";

                        if (System.IO.File.Exists(sImg))
                        { }
                        else
                        {
                            sImg = sPath + "blank.png";
                        }

                        Image imageProduct = Image.FromFile(sImg);
                        int iHeight = 120;
                        int iWidth = 160;
                        if (imageProduct.Size.Height / iHeight > imageProduct.Size.Width / iWidth)
                        {
                            iHeight = iHeight;
                            iWidth = (iHeight / imageProduct.Size.Height) * imageProduct.Size.Width;
                        }
                        else
                        {
                            iHeight = (iWidth / imageProduct.Size.Width) * imageProduct.Size.Height;
                            iWidth = iWidth;
                        }

                        Bitmap bm = new Bitmap(imageProduct, iWidth, iHeight);
                        MemoryStream ms = new MemoryStream();
                        bm.Save(ms, System.Drawing.Imaging.ImageFormat.Bmp);
                        byte[] bytImageData = new byte[ms.Length - 1];
                        bytImageData = ms.ToArray();

                        imgLBL = bytImageData;

                        sqlQuery = " Insert into PriceSurveyRpt (DocNo,DocDate,ItemId,Mrp,Price,OOS,CustId,Remarks,ImgLBL) Values ('" + DocNo + "','" + DocDate + "','" + ItemID + "','" + mrp + "','" + price + "','" + OOS + "','" + CustID + "','" + Remarks + "',@C1) ; ";
                        cr.ExecuteNonQueryWithImage(sqlQuery, imgLBL);

                    }
                }

                //cr.ExecuteNonQuery(sqlQuery);

                dtr.Close();
                dtr.Dispose();

                return Json(1);
            }
            catch (Exception ex)
            {
                return Json(0);
            }
            finally
            {
            }
        }

        public JsonResult LOADCOMPETITORTRACKING(string brand, string userid)
        {
            SqlCommand comstr = new SqlCommand();
            try
            {
                CommonRule cr = new CommonRule();
                SqlConnection con = new SqlConnection(constr);

                string sBrand = "", sPath = "";
                string SerInvNo = "", ProductType = "", ProductName = "", Equivalent = "", Price = "", NewProduct = "", Promotion = "", Shelfanddisplay = "", EventOrActivitivity = "", DocNo = "", PromotionRemarks = "", EventorActivitivityRemark = "", Brand = "";
                DateTime ServiceDt = DateTime.Now;
                byte[] DisplayImage = new byte[0], ImageFileName = new byte[0];
                string sImg = "", sImg1 = "";
                string sqlQuery = "";
                byte[] imgLBL = new byte[0], imgLBL1 = new byte[0];

                if (brand == "ALL")
                {
                    sBrand = " ";
                }
                else
                {
                    sBrand = " Where CompetitorTracking.Brand = " + "'" + brand + "'";
                }

                sPath = GetDocumentFolder();
                SqlCommand com1 = new SqlCommand(" select Distinct CompetitorTracking.* from CompetitorTracking " + sBrand + " order by Brand ", con);

                con.Open();
                dtr = com1.ExecuteReader();
                while (dtr.Read() == true)
                {
                    SerInvNo = dtr["DocNo"].ToString();
                    FTPDownloadFile(sPath, GetCloudFolder(), dtr["DocNo"].ToString() + "_PromotionPhoto.png");
                    FTPDownloadFile(sPath, GetCloudFolder(), dtr["DocNo"].ToString() + "_EventorActivitivityPhoto.png");
                    DirectoryInfo dir = new DirectoryInfo(sPath);
                    FileInfo[] arrFo = dir.GetFiles("*" + dtr["SerInvNo"].ToString() + "*");
                    if (arrFo.Length > 0)
                    {
                        for (int i = 0; i < arrFo.Length - 1; i++)
                        {
                            ProductType = dtr["ProductType"].ToString();
                            ProductName = dtr["ProductName"].ToString();
                            Equivalent = dtr["Equivalent"].ToString();
                            Price = dtr["Price"].ToString();
                            NewProduct = dtr["NewProduct"].ToString();
                            Promotion = dtr["Promotion"].ToString();
                            Shelfanddisplay = dtr["Shelfanddisplay"].ToString();
                            EventOrActivitivity = dtr["EventOrActivitivity"].ToString();
                            DocNo = dtr["DocNo"].ToString();
                            PromotionRemarks = dtr["PromotionRemarks"].ToString();
                            EventorActivitivityRemark = dtr["EventorActivitivityRemark"].ToString();
                            Brand = dtr["Brand"].ToString();

                            sImg = "";
                            sImg1 = "";

                            sImg = sPath + dtr["DocNo"].ToString() + "_PromotionPhoto.png";
                            sImg1 = sPath + dtr["DocNo"].ToString() + "_EventorActivitivityPhoto.png";

                            if (System.IO.File.Exists(sImg))
                            { }
                            else
                            {
                                sImg = sPath + "blank.png";
                            }

                            if (System.IO.File.Exists(sImg1))
                            { }
                            else
                            {
                                sImg1 = sPath + "blank.png";
                            }

                            Image imageProduct = Image.FromFile(sImg);
                            Image imageProduct1 = Image.FromFile(sImg1);

                            int iHeight = 120;
                            int iHeight1 = 120;
                            int iWidth = 160;
                            int iWidth1 = 160;


                            if (imageProduct.Size.Height / iHeight > imageProduct.Size.Width / iWidth)
                            {
                                iHeight = iHeight;
                                iWidth = (iHeight / imageProduct.Size.Height) * imageProduct.Size.Width;
                            }
                            else
                            {
                                iHeight = (iWidth / imageProduct.Size.Width) * imageProduct.Size.Height;
                                iWidth = iWidth;
                            }

                            if (imageProduct1.Size.Height / iHeight1 > imageProduct1.Size.Width / iWidth1)
                            {
                                iHeight1 = iHeight1;
                                iWidth1 = (iHeight1 / imageProduct1.Size.Height) * imageProduct1.Size.Width;
                            }
                            else
                            {
                                iHeight1 = (iWidth1 / imageProduct1.Size.Width) * imageProduct1.Size.Height;
                                iWidth1 = iWidth1;
                            }

                            Bitmap bm = new Bitmap(imageProduct, iWidth, iHeight);
                            Bitmap bm1 = new Bitmap(imageProduct1, iWidth1, iHeight1);
                            MemoryStream ms = new MemoryStream();
                            MemoryStream ms1 = new MemoryStream();
                            bm.Save(ms, System.Drawing.Imaging.ImageFormat.Bmp);
                            bm1.Save(ms1, System.Drawing.Imaging.ImageFormat.Bmp);
                            byte[] bytImageData = new byte[ms.Length - 1];
                            byte[] bytImageData1 = new byte[ms1.Length - 1];
                            bytImageData = ms.ToArray();
                            bytImageData1 = ms1.ToArray();

                            imgLBL = bytImageData;
                            imgLBL1 = bytImageData1;

                            sqlQuery = " insert into CompetitorTrackingRpt (ProductType,ProductName,Equivalent,Price,Newproduct,Promotion,shelfanddisplay,EventorActivitivity,DocNo,PromotionRemarks,EventorActivitivityRemark,Brand,imgLBL,ImgLbl1) Values ('" + ProductType + "','" + ProductName + "','" + Equivalent + "','" + Price + "','" + NewProduct + "','" + Promotion + "','" + Shelfanddisplay + "','" + EventOrActivitivity + "','" + DocNo + "','" + PromotionRemarks + "','" + EventorActivitivityRemark + "','" + Brand + "',@C1,@C2) ; ";
                            cr.ExecuteNonQueryWithTwoImages(sqlQuery, imgLBL, imgLBL1);



                        }
                    }
                    else
                    {
                        ProductType = dtr["ProductType"].ToString();
                        ProductName = dtr["ProductName"].ToString();
                        Equivalent = dtr["Equivalent"].ToString();
                        Price = dtr["Price"].ToString();
                        NewProduct = dtr["NewProduct"].ToString();
                        Promotion = dtr["Promotion"].ToString();
                        Shelfanddisplay = dtr["Shelfanddisplay"].ToString();
                        EventOrActivitivity = dtr["EventOrActivitivity"].ToString();
                        DocNo = dtr["DocNo"].ToString();
                        PromotionRemarks = dtr["PromotionRemarks"].ToString();
                        EventorActivitivityRemark = dtr["EventorActivitivityRemark"].ToString();
                        Brand = dtr["Brand"].ToString();

                        sImg = "";
                        sImg1 = "";

                        sImg = sPath + "blank.png";
                        sImg1 = sPath + "blank.png";

                        Image imageProduct = Image.FromFile(sImg);
                        Image imageProduct1 = Image.FromFile(sImg1);

                        int iHeight = 120;
                        int iHeight1 = 120;
                        int iWidth = 160;
                        int iWidth1 = 160;


                        if (imageProduct.Size.Height / iHeight > imageProduct.Size.Width / iWidth)
                        {
                            iHeight = iHeight;
                            iWidth = (iHeight / imageProduct.Size.Height) * imageProduct.Size.Width;
                        }
                        else
                        {
                            iHeight = (iWidth / imageProduct.Size.Width) * imageProduct.Size.Height;
                            iWidth = iWidth;
                        }

                        if (imageProduct1.Size.Height / iHeight1 > imageProduct1.Size.Width / iWidth1)
                        {
                            iHeight1 = iHeight1;
                            iWidth1 = (iHeight1 / imageProduct1.Size.Height) * imageProduct1.Size.Width;
                        }
                        else
                        {
                            iHeight1 = (iWidth1 / imageProduct1.Size.Width) * imageProduct1.Size.Height;
                            iWidth1 = iWidth1;
                        }

                        Bitmap bm = new Bitmap(imageProduct, iWidth, iHeight);
                        Bitmap bm1 = new Bitmap(imageProduct1, iWidth1, iHeight1);
                        MemoryStream ms = new MemoryStream();
                        MemoryStream ms1 = new MemoryStream();
                        bm.Save(ms, System.Drawing.Imaging.ImageFormat.Bmp);
                        bm1.Save(ms1, System.Drawing.Imaging.ImageFormat.Bmp);
                        byte[] bytImageData = new byte[ms.Length - 1];
                        byte[] bytImageData1 = new byte[ms1.Length - 1];
                        bytImageData = ms.ToArray();
                        bytImageData1 = ms1.ToArray();

                        imgLBL = bytImageData;
                        imgLBL1 = bytImageData1;

                        sqlQuery = " insert into CompetitorTrackingRpt (ProductType,ProductName,Equivalent,Price,Newproduct,Promotion,shelfanddisplay,EventorActivitivity,DocNo,PromotionRemarks,EventorActivitivityRemark,Brand,imgLBL,ImgLbl1) Values ('" + ProductType + "','" + ProductName + "','" + Equivalent + "','" + Price + "','" + NewProduct + "','" + Promotion + "','" + Shelfanddisplay + "','" + EventOrActivitivity + "','" + DocNo + "','" + PromotionRemarks + "','" + EventorActivitivityRemark + "','" + Brand + "',@C1,@C2) ; ";
                        cr.ExecuteNonQueryWithTwoImages(sqlQuery, imgLBL, imgLBL1);
                    }
                }

                //cr.ExecuteNonQuery(sqlQuery);

                dtr.Close();
                dtr.Dispose();

                return Json(1);
            }
            catch (Exception ex)
            {
                return Json(0);
            }
            finally
            {
            }
        }

        public JsonResult LOADVMI(string Distributor)
        {
            CommonRule cr = new CommonRule();
            SqlConnection con = new SqlConnection(constr);
            SqlCommand com1;
            string CompanyName = "", DistributorName = "";
            try
            {
                dt = new DataTable("VMIRpt");
                dt.Columns.Add("ItemNo", typeof(System.String));
                dt.Columns.Add("ItemName", typeof(System.String));
                dt.Columns.Add("ItemPrice", typeof(System.Double));
                dt.Columns.Add("ItemSkuClass", typeof(System.String));
                dt.Columns.Add("ItemCategory", typeof(System.String));
                dt.Columns.Add("InventoryVolume", typeof(System.Double));
                dt.Columns.Add("InventoryWeeksLevel", typeof(System.Double));
                dt.Columns.Add("AvgPast3MQty", typeof(System.Double));
                dt.Columns.Add("AvgPast3MWeeksQty", typeof(System.Double));
                dt.Columns.Add("InventoryOnHand", typeof(System.Double));
                dt.Columns.Add("InventoryInTransit", typeof(System.Double));
                dt.Columns.Add("TotalEndingInventory", typeof(System.Double));
                dt.Columns.Add("TotalEndingValue", typeof(System.Double));
                dt.Columns.Add("WeeksLevel", typeof(System.Double));
                dt.Columns.Add("SuggestedOrderinCS", typeof(System.Double));
                dt.Columns.Add("SuggestedOrderinPADS", typeof(System.Double));
                dt.Columns.Add("SuggestedOrderinValue", typeof(System.Double));
                dt.Columns.Add("BaseUOMQty", typeof(System.Double));
                dt.Columns.Add("DistributorID", typeof(System.String));
                dt.Columns.Add("DistributorName", typeof(System.String));
                dt.Columns.Add("ActualOrderinCS", typeof(System.String));

                SqlDataReader dtr;
                DataRow row;

                string strSql1 = " Delete from VMIRpt  ";
                com1 = new SqlCommand(strSql1, con);
                con.Open();
                com1.ExecuteNonQuery();
                con.Close();

                string strSql = " Select CompanyName from System  ";
                com1 = new SqlCommand(strSql, con);
                con.Open();
                dtr = com1.ExecuteReader();
                while (dtr.Read() == true)
                {
                    CompanyName = dtr["CompanyName"].ToString();
                }
                //con.Close();
                dtr.Close();

                strSql = " Select DistributorName from distributor Where DistributorID ='" + Distributor + "'  ";
                com1 = new SqlCommand(strSql, con);
                //con.Open();
                dtr = com1.ExecuteReader();
                while (dtr.Read() == true)
                {
                    DistributorName = dtr["DistributorName"].ToString();
                }
                //con.Close();
                dtr.Close();

                strSql = " Select  A.DistributorID, A.ItemNo, A.TotalAvgSales, A.TotalAvgQty, A.Category from (select I.ItemNo, Sum(I.SubAmt)/3 as TotalAvgSales, Sum(I.Qty*U.BaseQty)/(select BaseQty from UOm where UOM.UOM='CS' and UOM.ITEMNO=I.ITEMNO)/3 as TotalAvgQty, NodeTree.DistributorID, IT.Category from Invoice Inv inner join InvItem I On Inv.InvNo=I.InvNo inner join Item IT on I.ItemNo=IT.ItemNo inner join UOM U on U.ITEMNO=IT.ITEMNO and  U.UOM=I.UOM Inner Join Customer on Customer.CustNo=Inv.CustID inner join NodeTree on NodeTree.SalesManTerritory=Customer.SalesAgent where Inv.CustID In (select CustNo from Customer where SalesAgent in (select SalesManTerritory from NodeTree where DistributorID='" + Distributor + "') union select CustID as CustNo from NewCust where AgentID in (select SalesManTerritory from NodeTree where DistributorID='" + Distributor + "' ))  and DATEPART(m, Inv.InvDt) in (DATEPART(m, DATEADD(m, -3, GetDate())), DATEPART(m, DATEADD(m, -2, GetDate())), DATEPART(m, DATEADD(m, -1, GetDate()))) and IT.Category in (select Category from Item) group by I.ItemNo,IT.CATEGORY,IT.UNITPRICE,NodeTree.DistributorID) As A group by A.Category,A.ITemNO,A.DistributorID,A.TotalAvgSales,A.TotalAvgQty order by A.Category, A.TotalAvgSales Desc ";
                com1 = new SqlCommand(strSql, con);
                //con.Open();
                dtr = com1.ExecuteReader();
                //while (dtr.Read() == true)
                //{
                dtVMITrans.Clear();
                //}
                if (flagTable == 1)
                {
                    dtVMITrans.Columns.Remove("CumulativeSum");
                    dtVMITrans.Columns.Remove("TotalSum");
                    dtVMITrans.Columns.Remove("Percentage");
                    dtVMITrans.Columns.Remove("SKUClass");
                    dtVMITrans.Columns.Remove("SKUWeeks");
                }
                dtVMITrans.Load(dtr);
                dtr.Close();

                strSql = "select GoodsInvn.ItemNo, Sum(Qty)/BaseQty as Qty from GoodsInvn inner join UOM on UOM.ItemNo=GoodsInvn.ItemNo and UOM.UOM='CS' and UOM.BaseQty>0  where Location in (select SalesOfficeID from NodeTree Where DistributorID= '" + Distributor + "') group by Location, GoodsInvn.ItemNo,UOM.BaseQty ";
                com1 = new SqlCommand(strSql, con);
                //con.Open();
                dtr = com1.ExecuteReader();
                dtInventory.Clear();
                dtInventory.Load(dtr);
                dtr.Close();

                strSql = "select Item.ItemNo,ItemName,Category,UnitPrice,UOM.BaseQty from Item INNEr JOIN UOM ON UOM.ITEMNO=ITEM.ITEMNO and UOM.UOM='CS' ";
                com1 = new SqlCommand(strSql, con);
                //con.Open();
                dtr = com1.ExecuteReader();
                dtAllItems.Clear();
                dtAllItems.Load(dtr);
                dtr.Close();

                strSql = "select StockOrderItem.ItemNo,SUm(StockOrderItem.Qty)/BaseQty as Qty from StockOrderItem inner join UOM on UOM.ItemNo=StockOrderItem.ItemNo and UOM.UOM='CS' and UOM.BaseQty>0  where StockNo in (select StockNo from StockOrder where Location In (select SalesOfficeID from NodeTree Where DistributorID= '" + Distributor + "') and Checkin=0) group by StockOrderItem.ItemNo,UOM.BaseQTy";
                com1 = new SqlCommand(strSql, con);
                //con.Open();
                dtr = com1.ExecuteReader();
                dtStkReq.Clear();
                dtStkReq.Load(dtr);
                dtr.Close();

                strSql = "select * from VMIWeeks Where DistributorID= '" + Distributor + "' ";
                com1 = new SqlCommand(strSql, con);
                //con.Open();
                dtr = com1.ExecuteReader();
                dtVMIWeeks = new DataTable("VMIWeeks");
                dtVMIWeeks.Clear();
                dtVMIWeeks.Load(dtr);
                dtr.Close();

                strSql = "select Distinct Category from Item";
                com1 = new SqlCommand(strSql, con);
                //con.Open();
                dtr = com1.ExecuteReader();
                dtCategory.Clear();
                dtCategory.Load(dtr);
                dtr.Close();

                DataColumn dcSum = new DataColumn("CumulativeSum", typeof(System.String));
                DataColumn dcTotSum = new DataColumn("TotalSum", typeof(System.String));
                DataColumn dcPercentage = new DataColumn("Percentage", typeof(System.String));
                DataColumn dcSKUClass = new DataColumn("SKUClass", typeof(System.String));
                DataColumn dcSKUWeeks = new DataColumn("SKUWeeks", typeof(System.String));

                dtVMITrans.Columns.Add(dcSum);
                dtVMITrans.Columns.Add(dcTotSum);
                dtVMITrans.Columns.Add(dcPercentage);
                dtVMITrans.Columns.Add(dcSKUClass);
                dtVMITrans.Columns.Add(dcSKUWeeks);

                for (int iCat = 0; iCat <= dtCategory.Rows.Count - 1; iCat++)
                {
                    int Cat = 0;
                    double CumulativeSum = 0;
                    //string[] dtCumulativeSum =new string[];
                    List<int> dtCumulativeSum = new List<int>();
                    dtCumulativeSum.Clear();
                    for (int iVMI = 0; iVMI <= dtVMITrans.Rows.Count - 1; iVMI++)
                    {
                        if (dtCategory.Rows[iCat][0].ToString() == dtVMITrans.Rows[iVMI][4].ToString())
                        {
                            if (Cat == 0)
                            {
                                Cat = 1;
                                dtVMITrans.Rows[iVMI][5] = Convert.ToDouble(dtVMITrans.Rows[iVMI][2]);
                                CumulativeSum = Convert.ToDouble(dtVMITrans.Rows[iVMI][2]);
                                dtCumulativeSum.Add(iVMI);

                            }
                            else
                            {
                                if (iVMI != 0)
                                {
                                    dtVMITrans.Rows[iVMI][5] = Convert.ToDouble(dtVMITrans.Rows[iVMI - 1][5].ToString()) + Convert.ToDouble(dtVMITrans.Rows[iVMI][2].ToString());
                                    CumulativeSum = Convert.ToDouble(dtVMITrans.Rows[iVMI - 1][5].ToString()) + Convert.ToDouble(dtVMITrans.Rows[iVMI][2].ToString());
                                    dtCumulativeSum.Add(iVMI);

                                }
                            }

                            row = dt.NewRow();
                            row["ItemNo"] = dtVMITrans.Rows[iVMI][1].ToString();
                            row["ItemName"] = "";
                            row["ItemPrice"] = 0;
                            row["ItemSkuClass"] = "";
                            row["ItemCategory"] = dtVMITrans.Rows[iVMI][4].ToString();

                            //row["InventoryVolume"] = Convert.ToDouble(DBNull.Value.Equals(dtVMITrans.Rows[iVMI][5])) == 0 ? 0 : dtVMITrans.Rows[iVMI][5];
                            //row["InventoryWeeksLevel"] = Convert.ToDouble(DBNull.Value.Equals(dtVMITrans.Rows[iVMI][6])) != 0 ? dtVMITrans.Rows[iVMI][6] : 0;
                            //row["AvgPast3MQty"] = Convert.ToInt16(DBNull.Value.Equals(dtVMITrans.Rows[iVMI][3])) == 0 ? 0 : Math.Round(Convert.ToDouble(DBNull.Value.Equals(dtVMITrans.Rows[iVMI][3])), 2);
                            //row["AvgPast3MWeeksQty"] = Math.Round(Convert.ToDouble(DBNull.Value.Equals(dtVMITrans.Rows[iVMI][3])) / 4, 2);

                            row["InventoryVolume"] = Convert.ToDouble(DBNull.Value.Equals(dtVMITrans.Rows[iVMI][5]) == false ? dtVMITrans.Rows[iVMI][5] : 0) == 0 ? 0 : dtVMITrans.Rows[iVMI][5];
                            row["InventoryWeeksLevel"] = Convert.ToDouble(DBNull.Value.Equals(dtVMITrans.Rows[iVMI][6]) == false ? dtVMITrans.Rows[iVMI][6] : 0) != 0 ? dtVMITrans.Rows[iVMI][6] : 0;
                            row["AvgPast3MQty"] = Convert.ToInt16(DBNull.Value.Equals(dtVMITrans.Rows[iVMI][3]) == false ? dtVMITrans.Rows[iVMI][3] : 0) == 0 ? 0 : Math.Round(Convert.ToDouble(DBNull.Value.Equals(dtVMITrans.Rows[iVMI][3]) == false ? dtVMITrans.Rows[iVMI][3] : 0), 2);
                            row["AvgPast3MWeeksQty"] = Math.Round(Convert.ToDouble(DBNull.Value.Equals(dtVMITrans.Rows[iVMI][3]) == false ? dtVMITrans.Rows[iVMI][3] : 0) / 4, 2);


                            row["InventoryOnHand"] = 0;
                            row["InventoryInTransit"] = 0;
                            row["TotalEndingInventory"] = 0;
                            row["TotalEndingValue"] = 0;
                            row["WeeksLevel"] = 0;
                            row["SuggestedOrderinCS"] = 0;
                            row["SuggestedOrderinPADS"] = 0;
                            row["SuggestedOrderinValue"] = 0;
                            row["BaseUOMQty"] = 0;
                            row["DistributorID"] = Distributor;
                            row["DistributorName"] = DistributorName;
                            row["ActualOrderinCS"] = 0;
                            dt.Rows.Add(row);
                        }
                    }

                    for (int i = 0; i <= dtCumulativeSum.Count - 1; i++)
                    {
                        dtVMITrans.Rows[dtCumulativeSum[i]][6] = CumulativeSum;
                        dtVMITrans.Rows[dtCumulativeSum[i]][7] = Math.Round((Convert.ToDouble(dtVMITrans.Rows[dtCumulativeSum[i]][5].ToString()) / Convert.ToDouble(dtVMITrans.Rows[dtCumulativeSum[i]][6].ToString())) * 100, 0);
                        for (int j = 0; j <= dtVMIWeeks.Rows.Count - 1; j++)
                        {
                            if (Convert.ToDouble(dtVMITrans.Rows[dtCumulativeSum[i]][7].ToString()) > Convert.ToDouble(dtVMIWeeks.Rows[j][3].ToString()) && Convert.ToDouble(dtVMITrans.Rows[dtCumulativeSum[i]][7].ToString()) <= Convert.ToDouble(dtVMIWeeks.Rows[j][4].ToString()))
                            {
                                dtVMITrans.Rows[dtCumulativeSum[i]][8] = dtVMIWeeks.Rows[j][1];
                                dtVMITrans.Rows[dtCumulativeSum[i]][9] = dtVMIWeeks.Rows[j][2];

                            }
                        }
                    }
                    for (int i = 0; i <= dtCumulativeSum.Count - 1; i++)
                    {
                        for (int j = 0; j <= dt.Rows.Count - 1; j++)
                        {
                            if (dt.Rows[j][0].ToString() == dtVMITrans.Rows[dtCumulativeSum[i]][1].ToString())
                            {
                                dt.Rows[j][3] = dtVMITrans.Rows[dtCumulativeSum[i]][8];
                                dt.Rows[j][5] = dtVMITrans.Rows[dtCumulativeSum[i]][6];
                                dt.Rows[j][6] = dtVMITrans.Rows[dtCumulativeSum[i]][9];
                            }
                        }
                    }

                    for (int ItmCnt = 0; ItmCnt <= dtAllItems.Rows.Count - 1; ItmCnt++)
                    {
                        int flag = 0;
                        for (int idt = 0; idt <= dt.Rows.Count - 1; idt++)
                        {
                            if (dtAllItems.Rows[ItmCnt][2].ToString().ToUpper() == dt.Rows[idt][4].ToString().ToUpper() && dtAllItems.Rows[ItmCnt][0].ToString().ToUpper() == dt.Rows[idt][0].ToString().ToUpper() && dtCategory.Rows[iCat][0].ToString().ToUpper() == dt.Rows[idt][4].ToString().ToUpper() && dtCategory.Rows[iCat][0].ToString().ToUpper() == dtAllItems.Rows[ItmCnt][2].ToString().ToUpper())
                            {
                                flag = 1;
                                dt.Rows[idt][1] = dtAllItems.Rows[ItmCnt][1].ToString();
                                dt.Rows[idt][17] = dtAllItems.Rows[ItmCnt][4].ToString();
                                if (Convert.ToDouble(dtAllItems.Rows[ItmCnt][4].ToString()) != 0)
                                {
                                    dt.Rows[idt][2] = Math.Round(Convert.ToDouble(dtAllItems.Rows[ItmCnt][3].ToString()) * Convert.ToDouble(dtAllItems.Rows[ItmCnt][4].ToString()), 2);
                                }
                                else
                                {
                                    dt.Rows[idt][2] = 0;
                                }
                            }
                        }
                        if (flag == 0 && dtCategory.Rows[iCat][0].ToString().ToUpper() == dtAllItems.Rows[ItmCnt][2].ToString().ToUpper())
                        {
                            row = dt.NewRow();
                            row["ItemNo"] = dtAllItems.Rows[ItmCnt][0].ToString();
                            row["ItemName"] = dtAllItems.Rows[ItmCnt][1].ToString();
                            row["ItemPrice"] = Math.Round(Convert.ToDouble(dtAllItems.Rows[ItmCnt][3].ToString()) * Convert.ToDouble(dtAllItems.Rows[ItmCnt][4].ToString()), 2);
                            row["ItemSkuClass"] = "NC";
                            row["ItemCategory"] = dtAllItems.Rows[ItmCnt][2].ToString();
                            row["InventoryVolume"] = 0;
                            row["InventoryWeeksLevel"] = 0;
                            row["AvgPast3MQty"] = 0;
                            row["AvgPast3MWeeksQty"] = 0;
                            row["InventoryOnHand"] = 0;
                            row["InventoryInTransit"] = 0;
                            row["TotalEndingInventory"] = 0;
                            row["TotalEndingValue"] = 0;
                            row["WeeksLevel"] = 0;
                            row["SuggestedOrderinCS"] = 0;
                            row["SuggestedOrderinPADS"] = 0;
                            row["SuggestedOrderinValue"] = 0;
                            row["BaseUOMQty"] = Convert.ToDouble(dtAllItems.Rows[ItmCnt][4].ToString());
                            row["DistributorID"] = Distributor;
                            row["DistributorName"] = DistributorName;
                            row["ActualOrderinCS"] = 0;
                            dt.Rows.Add(row);
                        }
                    }
                }

                for (int iStkReq = 0; iStkReq <= dtStkReq.Rows.Count - 1; iStkReq++)
                {
                    for (int idt = 0; idt <= dt.Rows.Count - 1; idt++)
                    {
                        if (dt.Rows[idt][0].ToString().ToUpper() == dtStkReq.Rows[iStkReq][0].ToString().ToUpper())
                        {
                            dt.Rows[idt][10] = Math.Round(Convert.ToDouble(dtStkReq.Rows[iStkReq][1].ToString().ToUpper()), 2);
                        }
                    }

                }
                for (int iInvn = 0; iInvn <= dtInventory.Rows.Count - 1; iInvn++)
                {
                    for (int idt = 0; idt <= dt.Rows.Count - 1; idt++)
                    {
                        if (dt.Rows[idt][0].ToString().ToUpper() == dtInventory.Rows[iInvn][0].ToString().ToUpper())
                        {
                            dt.Rows[idt][9] = Math.Round(Convert.ToDouble(dtInventory.Rows[iInvn][1].ToString().ToUpper()), 2);
                        }
                    }
                }
                for (int idt = 0; idt <= dt.Rows.Count - 1; idt++)
                {
                    dt.Rows[idt][11] = Math.Round((Convert.ToDouble(DBNull.Value.Equals(dt.Rows[idt][9]) == false ? dt.Rows[idt][9] : 0) == 0 ? 0 : Convert.ToDouble(dt.Rows[idt][9])) + (Convert.ToDouble(DBNull.Value.Equals(dt.Rows[idt][10]) == false ? dt.Rows[idt][10] : 0) == 0 ? 0 : Convert.ToDouble(dt.Rows[idt][10])), 2);
                    dt.Rows[idt][12] = Math.Round((Convert.ToDouble(DBNull.Value.Equals(dt.Rows[idt][11]) == false ? dt.Rows[idt][11] : 0) == 0 ? 0 : Convert.ToDouble(DBNull.Value.Equals(dt.Rows[idt][11]) == false ? dt.Rows[idt][11] : 0)) * (Convert.ToDouble(DBNull.Value.Equals(dt.Rows[idt][2]) == false ? dt.Rows[idt][2] : 0) == 0 ? 0 : Convert.ToDouble(dt.Rows[idt][2])), 2);
                    dt.Rows[idt][5] = Math.Round((Convert.ToDouble(DBNull.Value.Equals(dt.Rows[idt][6]) == false ? dt.Rows[idt][6] : 0) == 0 ? 0 : Convert.ToDouble(DBNull.Value.Equals(dt.Rows[idt][6]) == false ? dt.Rows[idt][6] : 0)) * (Convert.ToDouble(DBNull.Value.Equals(dt.Rows[idt][8]) == false ? dt.Rows[idt][8] : 0) == 0 ? 0 : Convert.ToDouble(DBNull.Value.Equals(dt.Rows[idt][8]) == false ? dt.Rows[idt][8] : 0)));
                    if (Convert.ToDouble(dt.Rows[idt][8].ToString()) != 0)
                    {
                        dt.Rows[idt][13] = Math.Round((Convert.ToDouble(DBNull.Value.Equals(dt.Rows[idt][11]) == false ? dt.Rows[idt][11] : 0) == 0 ? 0 : Convert.ToDouble(dt.Rows[idt][11])) / (Convert.ToDouble(DBNull.Value.Equals(dt.Rows[idt][8]) == false ? dt.Rows[idt][8] : 0) == 0 ? 0 : Convert.ToDouble(dt.Rows[idt][8])), 2);
                    }
                    else
                    {
                        dt.Rows[idt][13] = 0;
                    }
                    if ((Convert.ToDouble(DBNull.Value.Equals(dt.Rows[idt][11]) == false ? dt.Rows[idt][11] : 0) == 0 ? 0 : Convert.ToDouble(dt.Rows[idt][11])) >= (Convert.ToDouble(DBNull.Value.Equals(dt.Rows[idt][5]) == false ? dt.Rows[idt][5] : 0) == 0 ? 0 : Convert.ToDouble(dt.Rows[idt][5])))
                    {
                        dt.Rows[idt][14] = 0;
                        dt.Rows[idt][15] = 0;
                        dt.Rows[idt][16] = 0;
                    }
                    else if ((Convert.ToDouble(DBNull.Value.Equals(dt.Rows[idt][11]) == false ? dt.Rows[idt][11] : 0) == 0 ? 0 : Convert.ToDouble(dt.Rows[idt][11])) < 0)
                    {
                        dt.Rows[idt][14] = 0;
                        dt.Rows[idt][15] = 0;
                        dt.Rows[idt][16] = 0;
                    }
                    else
                    {
                        dt.Rows[idt][20] = (Convert.ToDouble(DBNull.Value.Equals(dt.Rows[idt][5]) == false ? dt.Rows[idt][5] : 0) == 0 ? 0 : Convert.ToDouble(dt.Rows[idt][5])) - (Convert.ToDouble(DBNull.Value.Equals(dt.Rows[idt][11]) == false ? dt.Rows[idt][11] : 0) == 0 ? 0 : Convert.ToDouble(dt.Rows[idt][11]));
                        dt.Rows[idt][14] = Math.Ceiling(Convert.ToDouble(DBNull.Value.Equals(dt.Rows[idt][20]) == false ? dt.Rows[idt][20] : 0) == 0 ? 0 : Convert.ToDouble(dt.Rows[idt][20]));
                        dt.Rows[idt][15] = (Convert.ToDouble(DBNull.Value.Equals(dt.Rows[idt][14]) == false ? dt.Rows[idt][14] : 0) == 0 ? 0 : Convert.ToDouble(dt.Rows[idt][14])) * (Convert.ToDouble(DBNull.Value.Equals(dt.Rows[idt][17]) == false ? dt.Rows[idt][17] : 0) == 0 ? 0 : Convert.ToDouble(dt.Rows[idt][17]));
                        dt.Rows[idt][16] = (Convert.ToDouble(DBNull.Value.Equals(dt.Rows[idt][14]) == false ? dt.Rows[idt][14] : 0) == 0 ? 0 : Convert.ToDouble(dt.Rows[idt][14])) * (Convert.ToDouble(DBNull.Value.Equals(dt.Rows[idt][2]) == false ? dt.Rows[idt][2] : 0) == 0 ? 0 : Convert.ToDouble(dt.Rows[idt][2]));
                    }
                }
                flagTable = 1;
                string sql = "";
                for (int i = 0; i <= dt.Rows.Count - 1; i++)
                {
                    sql = " Insert into VMIRpt ([ItemNo] ,[ItemName],[ItemPrice] ,	[ItemSkuClass] ,	[ItemCategory] ,	[InventoryVolume] ,	[InventoryWeeksLevel],[AvgPast3MQty] ,	[AvgPast3MWeeksQty] ,	[InventoryOnHand],	[InventoryInTransit] ,	[TotalEndingInventory] ,	[TotalEndingValue] ,	[WeeksLevel] ,	[SuggestedOrderinCS] ,	[SuggestedOrderinPADS] ,	[SuggestedOrderinValue],	[DistributorID] ,	[DistributorName] ,	[ActualOrderInCs] ,	[Company]) Values ('" + dt.Rows[i]["ItemNo"].ToString() + "','" + dt.Rows[i]["ItemName"].ToString() + "','" + dt.Rows[i]["ItemPrice"].ToString() + "','" + dt.Rows[i]["ItemSkuClass"].ToString() + "','" + dt.Rows[i]["ItemCategory"].ToString() + "','" + dt.Rows[i]["InventoryVolume"].ToString() + "','" + dt.Rows[i]["InventoryWeeksLevel"].ToString() + "','" + dt.Rows[i]["AvgPast3MQty"].ToString() + "','" + dt.Rows[i]["AvgPast3MWeeksQty"].ToString() + "','" + dt.Rows[i]["InventoryOnHand"].ToString() + "','" + dt.Rows[i]["InventoryInTransit"].ToString() + "','" + dt.Rows[i]["TotalEndingInventory"].ToString() + "','" + dt.Rows[i]["TotalEndingValue"].ToString() + "','" + dt.Rows[i]["WeeksLevel"].ToString() + "','" + dt.Rows[i]["SuggestedOrderinCS"].ToString() + "','" + dt.Rows[i]["SuggestedOrderinPADS"].ToString() + "','" + dt.Rows[i]["SuggestedOrderinValue"].ToString() + "','" + dt.Rows[i]["DistributorID"].ToString() + "','" + dt.Rows[i]["DistributorName"].ToString() + "','" + dt.Rows[i]["ActualOrderinCS"].ToString() + "','" + CompanyName + "' ) ; ";
                    com1 = new SqlCommand(sql, con);
                    com1.ExecuteNonQuery();

                }

                //CommonRule cr1 = new CommonRule();
                //cr1.executerQuery(sql);




                return Json(1);
            }
            catch (Exception ex)
            {
                return Json(0);
            }
            finally
            {
            }

        }

        public JsonResult LOADTAKEPHOTO(string fromdate, string todate, string salesmanterritory, string userid)
        {
            //DataTable dt = new DataTable();

            //dt.Columns.Add("SerInvNo", typeof(System.String));
            //dt.Columns.Add("CustomerID", typeof(System.String));
            //dt.Columns.Add("CustName", typeof(System.String));
            //dt.Columns.Add("ServiceDt", typeof(System.DateTime));
            //dt.Columns.Add("ServiceType", typeof(System.String));
            //dt.Columns.Add("Details", typeof(System.String));
            //dt.Columns.Add("AgentID", typeof(System.String));
            //dt.Columns.Add("DisplayImage", typeof(System.Byte));
            //dt.Columns.Add("ImageFileName", typeof(System.Byte));
            //DataRow row;

            SqlCommand comstr = new SqlCommand();
            try
            {
                CommonRule cr = new CommonRule();
                SqlConnection con = new SqlConnection(constr);

                string sAgent = "", sPath = "", sServiceType = "", sReasonCode = "";
                string SerInvNo = "", CustomerID = "", CustName = "", ServiceType = "", Details = "", AgentID = "", DocNo = "", MDTNo = "";
                DateTime ServiceDt = DateTime.Now;
                byte[] DisplayImage = new byte[0], ImageFileName = new byte[0];
                string sImg = "";
                string sqlQuery = "";

                if (salesmanterritory == "ALL")
                {
                    sAgent = " ";
                }
                else
                {
                    sAgent = " and Customer.SalesAgent= " + "'" + salesmanterritory + "'";
                }


                sPath = GetDocumentFolder();

                //sPath = System.IO.Path.Combine (Server.MapPath (sPath ),sPath);
                // SqlCommand com1 = new SqlCommand(" Delete from TakePhotoRep ; Select Distinct DocNo, CustTakePhoto.DTG, CustTakePhoto.CustNo, Customer.CustName,  SalesAgent.Code as AgentID,[FileName],CustTakePhoto.MDTNo from CustTakePhoto,Customer, SalesAgent where Customer.SalesAgent = SalesAgent.Code and Customer.CustNo = CustTakePhoto.CustNo and convert(date,CustTakePhoto.DTG) Between '" + fromdate + "' and '" + todate + "' " + sAgent, con);
                SqlCommand com1 = new SqlCommand(" Delete from TakePhotoRep ; Select Distinct DocNo, MerchandisingVisit.DocDt as DTG, MerchandisingVisit.CustNo, Customer.CustName,  SalesAgent.Code as AgentID,MerchandisingVisit.CustNo+'_Loc1_Plan_AFTER_'+DocNo as [FileName],MerchandisingVisit.MDTNo from MerchandisingVisit,Customer, SalesAgent where Customer.SalesAgent = SalesAgent.Code and Customer.CustNo = MerchandisingVisit.CustNo and convert(date,MerchandisingVisit.DocDt) Between '" + fromdate + "' and '" + todate + "' " + sAgent, con);
                con.Open();
                dtr = com1.ExecuteReader();
                while (dtr.Read() == true)
                {
                    SerInvNo = dtr["FileName"].ToString();
                    FTPDownloadFile1(sPath, GetCloudFolder(), dtr["FileName"].ToString());
                    DirectoryInfo dir = new DirectoryInfo(sPath);
                    FileInfo[] arrFo = dir.GetFiles("*" + dtr["FileName"].ToString() + "*");
                    if (arrFo.Length > 0)
                    {
                        for (int i = 0; i < arrFo.Length; i++)
                        {
                            SerInvNo = dtr["FileName"].ToString();
                            ServiceDt = Convert.ToDateTime(dtr["DTG"].ToString());
                            CustomerID = dtr["CustNo"].ToString();
                            CustName = dtr["CustName"].ToString();
                            //ServiceType = dtr["ServiceType"].ToString();
                            //Details = dtr["Details"].ToString();
                            AgentID = dtr["AgentID"].ToString();
                            MDTNo = dtr["MDTNo"].ToString();
                            DocNo = dtr["DocNo"].ToString();

                            FileInfo fo = arrFo[i];
                            sImg = sPath + fo.Name;

                            if (System.IO.File.Exists(sImg))
                            { }
                            else
                            {
                                sImg = sPath + "blank.png";
                            }
                            Image imageProduct = Image.FromFile(sImg);
                            int iHeight = 120;
                            int iWidth = 160;

                            //if (imageProduct.Size.Height / iHeight > imageProduct.Size.Width / iWidth)
                            //{
                            //    iHeight = iHeight;
                            //    iWidth = (iHeight / imageProduct.Size.Height) * imageProduct.Size.Width;
                            //}
                            //else
                            //{
                            //    iHeight = (iWidth / imageProduct.Size.Width) * imageProduct.Size.Height;
                            //    iWidth = iWidth;
                            //}
                            Bitmap bm = new Bitmap(imageProduct, iWidth, iHeight);
                            MemoryStream ms = new MemoryStream();
                            bm.Save(ms, System.Drawing.Imaging.ImageFormat.Bmp);
                            byte[] bytImageData = new byte[ms.Length - 1];
                            bytImageData = ms.ToArray();

                            ImageFileName = bytImageData;

                            //row = dt.NewRow();
                            //row["SerInvNo"] = dtr ["SerInvNo"].ToString ();
                            //row["ServiceDt"] = dtr["ServiceDt"];
                            //row["CustomerId"] = dtr["CustomerId"].ToString();
                            //row["CustName"] = dtr["CustName"].ToString();
                            //row["ServiceType"] = dtr["ServiceType"].ToString();
                            //row["Details"] = dtr["Details"].ToString();
                            //row["AgentID"] = dtr["AgentID"].ToString();
                            //row["ImageFileName"] = bytImageData;
                            //dt.Rows.Add(row);

                            //for (int cnt =0; cnt < dt.Rows .Count -1 ; cnt++)
                            //{
                            //    sqlQuery += " Insert into ServiceRep (SerInvNo,CustomerID,CustName,ServiceType,Details,ServiceDt,AgentID,ImageFileName) values ( '" + dt.Rows[cnt]["SerInvNo"].ToString() + "','" + dt.Rows[cnt]["CustomerID"].ToString() + "','" + dt.Rows[cnt]["CustName"].ToString() + "','" + dt.Rows[cnt]["ServiceType"].ToString() + "','" + dt.Rows[cnt]["Details"].ToString() + "','" + dt.Rows[cnt]["ServiceDt"] + "','" + dt.Rows[cnt]["AgentID"].ToString() + "','" + dt.Rows[cnt]["ImageFileName"].ToString() + "') ; ";
                            //}

                            sqlQuery = " Insert into TakePhotoRep (DocNo,CustNo,CustName,Date,AgentID,MDTNo,ImageFileName) values ('" + DocNo + "','" + CustomerID + "','" + CustName + "','" + ServiceDt + "','" + AgentID + "','" + MDTNo + "',@C1) ; ";

                            //comstr  = new SqlCommand(sqlQuery, con);
                            //comstr.Parameters.AddWithValue("@C3", SqlDbType.Binary).Value = ImageFileName;

                            //comstr.ExecuteNonQuery();                        //con.close();
                            cr.ExecuteNonQueryWithImage(sqlQuery, ImageFileName);
                        }
                    }
                    else
                    {
                        SerInvNo = dtr["FileName"].ToString();
                        ServiceDt = Convert.ToDateTime(dtr["DTG"].ToString());
                        CustomerID = dtr["CustNo"].ToString();
                        CustName = dtr["CustName"].ToString();
                        //ServiceType = dtr["ServiceType"].ToString();
                        //Details = dtr["Details"].ToString();
                        AgentID = dtr["AgentID"].ToString();
                        MDTNo = dtr["MDTNo"].ToString();
                        DocNo = dtr["DocNo"].ToString();

                        sImg = sPath + "blank.png";

                        if (System.IO.File.Exists(sImg))
                        { }
                        else
                        {
                            sImg = sPath + "blank.png";
                        }
                        Image imageProduct = Image.FromFile(sImg);

                        int iHeight = 120;
                        int iWidth = 160;
                        //if (imageProduct.Size.Height / iHeight > imageProduct.Size.Width / iWidth)
                        //{
                        //    iHeight = iHeight;
                        //    iWidth = (iHeight / imageProduct.Size.Height) * imageProduct.Size.Width;
                        //}
                        //else
                        //{
                        //    iHeight = (iWidth / imageProduct.Size.Width) * imageProduct.Size.Height;
                        //    iWidth = iWidth;
                        //}

                        Bitmap bm = new Bitmap(imageProduct, iWidth, iHeight);
                        MemoryStream ms = new MemoryStream();
                        bm.Save(ms, System.Drawing.Imaging.ImageFormat.Bmp);
                        byte[] bytImageData = new byte[ms.Length - 1];
                        bytImageData = ms.ToArray();

                        ImageFileName = bytImageData;

                        sqlQuery = " Insert into TakePhotoRep (DocNo,CustNo,CustName,Date,AgentID,MDTNo,ImageFileName) values ('" + DocNo + "','" + CustomerID + "','" + CustName + "','" + ServiceDt + "','" + AgentID + "','" + MDTNo + "',@C1) ; ";

                        cr.ExecuteNonQueryWithImage(sqlQuery, ImageFileName);
                        //comstr = new SqlCommand(sqlQuery, con);
                        //comstr.Parameters.AddWithValue("@C3", SqlDbType.Binary).Value = ImageFileName;

                        //con.open();
                        //cmd.ExecuteNonQuery();                        //con.close();
                        //cr.ExecuteNonQuery(sqlQuery);
                    }
                }

                dtr.Close();
                dtr.Dispose();
                return Json(1);
            }
            catch (Exception ex)
            {
                return Json(0);
            }
            finally
            {
            }
        }

        public JsonResult LOADDAILYORDERDETAILREPORT(string fromdate, string todate, string PayTerms, string salesmanterritory, string CompanyName, string userid)
        {
            //DataTable dt = new DataTable();

            //dt.Columns.Add("SerInvNo", typeof(System.String));
            //dt.Columns.Add("CustomerID", typeof(System.String));
            //dt.Columns.Add("CustName", typeof(System.String));
            //dt.Columns.Add("ServiceDt", typeof(System.DateTime));
            //dt.Columns.Add("ServiceType", typeof(System.String));
            //dt.Columns.Add("Details", typeof(System.String));
            //dt.Columns.Add("AgentID", typeof(System.String));
            //dt.Columns.Add("DisplayImage", typeof(System.Byte));
            //dt.Columns.Add("ImageFileName", typeof(System.Byte));
            //DataRow row;

            SqlCommand comstr = new SqlCommand();
            try
            {
                CommonRule cr = new CommonRule();
                SqlConnection con = new SqlConnection(constr);

                string sAgent = "", sPath = "", sServiceType = "", sReasonCode = "", sPayTerms = "", sCompanyName = "";
                string SerInvNo = "", CustomerID = "", CustName = "", ServiceType = "", Details = "", AgentID = "", DocNo = "", MDTNo = "";
                string ServiceDt = DateTime.Now.ToString();
                DateTime InvDt = DateTime.Now;
                // DateTime ServiceDt = DateTime.Now, InvDt = DateTime.Now;
                byte[] DisplayImage = new byte[0], ImageFileName = new byte[0];
                string sImg = "";
                string sqlQuery = "";
                string PrevOrdNo = "", CurrentOrdNo = "";
                string InvNo = "", CutNo = "", PaymentTerms = "", AgentId = "", ItemNo = "", Description = "", UOM = "", Remarks = "", Category = "", Barcode = "", LineRemarks = "", LineNo = "";
                double Qty = 0, Price = 0, SubAmt = 0, Discount = 0, GSTAmt = 0, TotalAmt = 0, Field1 = 0, Field2 = 0, CSQty = 0, PKQty = 0;

                if (salesmanterritory == "ALL")
                {
                    sAgent = " ";
                }
                else
                {
                    sAgent = " and Customer.SalesAgent= " + "'" + salesmanterritory + "'";
                }


                sPath = GetDocumentFolder();

                //sPath = System.IO.Path.Combine (Server.MapPath (sPath ),sPath);
                SqlCommand com1 = new SqlCommand(" Delete from DailyOrderDetailRep ; Exec [dbo].[Report_DailyOrderDetail] " + "'" + fromdate + "'," + "'" + todate + "'," + "'" + PayTerms + "'," + "'" + salesmanterritory + "'," + "'" + CompanyName + "'," + "'" + userid + "'", con);

                con.Open();
                com1.CommandTimeout = 3600;// 180;
                dtr = com1.ExecuteReader();
                while (dtr.Read() == true)
                {
                    CurrentOrdNo = dtr["InvNo"].ToString();
                    SerInvNo = dtr["InvNo"].ToString();
                    if (PrevOrdNo != CurrentOrdNo)
                    {
                        FTPDownloadFile1(sPath, GetCloudFolder(), dtr["InvNo"].ToString());
                    }
                    DirectoryInfo dir = new DirectoryInfo(sPath);
                    FileInfo[] arrFo = dir.GetFiles("*" + dtr["InvNo"].ToString() + "*");
                    if (arrFo.Length > 0)
                    {
                        for (int i = 0; i < arrFo.Length; i++)
                        {
                            //InvNo,InvDt,CustNo,CustName,PayTerms,AgentId,ItemNo,Description,UOM,Qty,Price,SubAmt,Discount,GSTAmt,TotalAmt,Remarks,Category,CompanyName,FromDate,ToDate,Barcode,LineRemarks,LineNo,Field1,Field2,CSQty,PKQty
                            SerInvNo = dtr["InvNo"].ToString();

                            ServiceDt = dtr["InvDt"].ToString();
                            // ServiceDt = Convert.ToDateTime(dtr["InvDt"].ToString());
                            CustomerID = dtr["CustNo"].ToString();
                            CustName = dtr["CustName"].ToString();
                            PaymentTerms = dtr["PayTerms"].ToString();
                            AgentID = dtr["AgentId"].ToString();
                            ItemNo = dtr["ItemNo"].ToString();
                            Description = dtr["Description"].ToString();
                            UOM = dtr["UOM"].ToString();
                            Qty = Convert.ToDouble(dtr["Qty"]);
                            Price = Convert.ToDouble(dtr["Price"]);
                            SubAmt = Convert.ToDouble(dtr["SubAmt"]);
                            Discount = Convert.ToDouble(dtr["Discount"]);
                            GSTAmt = Convert.ToDouble(dtr["GSTAmt"]);
                            TotalAmt = Convert.ToDouble(dtr["TotalAmt"]);
                            Remarks = dtr["Remarks"].ToString();
                            Category = dtr["Category"].ToString();
                            Barcode = dtr["Barcode"].ToString();
                            LineRemarks = dtr["LineRemarks"].ToString();
                            LineNo = dtr["LineNo"].ToString();
                            Field1 = Convert.ToDouble(dtr["Field1"]);
                            Field2 = Convert.ToDouble(dtr["Field2"]);
                            CSQty = Convert.ToDouble(dtr["CSQty"]);
                            PKQty = Convert.ToDouble(dtr["PKQty"]);


                            FileInfo fo = arrFo[i];
                            sImg = sPath + fo.Name;

                            if (System.IO.File.Exists(sImg))
                            { }
                            else
                            {
                                sImg = sPath + "blank.png";
                            }
                            Image imageProduct = Image.FromFile(sImg);
                            int iHeight = 120;
                            int iWidth = 160;

                            //if (imageProduct.Size.Height / iHeight > imageProduct.Size.Width / iWidth)
                            //{
                            //    iHeight = iHeight;
                            //    iWidth = (iHeight / imageProduct.Size.Height) * imageProduct.Size.Width;
                            //}
                            //else
                            //{
                            //    iHeight = (iWidth / imageProduct.Size.Width) * imageProduct.Size.Height;
                            //    iWidth = iWidth;
                            //}
                            Bitmap bm = new Bitmap(imageProduct, iWidth, iHeight);
                            MemoryStream ms = new MemoryStream();
                            bm.Save(ms, System.Drawing.Imaging.ImageFormat.Bmp);
                            byte[] bytImageData = new byte[ms.Length - 1];
                            bytImageData = ms.ToArray();

                            ImageFileName = bytImageData;

                            //row = dt.NewRow();
                            //row["SerInvNo"] = dtr ["SerInvNo"].ToString ();
                            //row["ServiceDt"] = dtr["ServiceDt"];
                            //row["CustomerId"] = dtr["CustomerId"].ToString();
                            //row["CustName"] = dtr["CustName"].ToString();
                            //row["ServiceType"] = dtr["ServiceType"].ToString();
                            //row["Details"] = dtr["Details"].ToString();
                            //row["AgentID"] = dtr["AgentID"].ToString();
                            //row["ImageFileName"] = bytImageData;
                            //dt.Rows.Add(row);

                            //for (int cnt =0; cnt < dt.Rows .Count -1 ; cnt++)
                            //{
                            //    sqlQuery += " Insert into ServiceRep (SerInvNo,CustomerID,CustName,ServiceType,Details,ServiceDt,AgentID,ImageFileName) values ( '" + dt.Rows[cnt]["SerInvNo"].ToString() + "','" + dt.Rows[cnt]["CustomerID"].ToString() + "','" + dt.Rows[cnt]["CustName"].ToString() + "','" + dt.Rows[cnt]["ServiceType"].ToString() + "','" + dt.Rows[cnt]["Details"].ToString() + "','" + dt.Rows[cnt]["ServiceDt"] + "','" + dt.Rows[cnt]["AgentID"].ToString() + "','" + dt.Rows[cnt]["ImageFileName"].ToString() + "') ; ";
                            //}

                            sqlQuery = " Insert into DailyOrderDetailRep (InvNo,InvDt,CustNo,CustName,PayTerms,AgentId,ItemNo,Description,UOM,Qty,Price,SubAmt,Discount,GSTAmt,TotalAmt,Remarks,CompanyName,FromDate,ToDate,Barcode,LineRemarks,Field1,Field2,CSQty,PKQty,ImageFileName) values ('" + SerInvNo + "','" + ServiceDt + "','" + CustomerID + "','" + CustName.Replace("'", "''") + "','" + PaymentTerms + "','" + AgentID + "','" + ItemNo + "','" + Description.Replace("'", "''") + "','" + UOM + "','" + Qty + "','" + Price + "','" + SubAmt + "','" + Discount + "','" + GSTAmt + "','" + TotalAmt + "','" + Remarks + "','" + CompanyName + "','" + fromdate + "','" + todate + "','" + Barcode + "','" + LineRemarks + "','" + Field1 + "','" + Field2 + "','" + CSQty + "','" + PKQty + "',@C1) ; ";

                            //comstr  = new SqlCommand(sqlQuery, con);
                            //comstr.Parameters.AddWithValue("@C3", SqlDbType.Binary).Value = ImageFileName;

                            //comstr.ExecuteNonQuery();                        //con.close();
                            cr.ExecuteNonQueryWithImage(sqlQuery, ImageFileName);
                        }
                    }
                    else
                    {
                        SerInvNo = dtr["InvNo"].ToString();
                        ServiceDt = dtr["InvDt"].ToString();// Convert.ToDateTime(dtr["InvDt"].ToString());
                        CustomerID = dtr["CustNo"].ToString();
                        CustName = dtr["CustName"].ToString();
                        PaymentTerms = dtr["PayTerms"].ToString();
                        AgentID = dtr["AgentId"].ToString();
                        ItemNo = dtr["ItemNo"].ToString();
                        Description = dtr["Description"].ToString();
                        UOM = dtr["UOM"].ToString();
                        Qty = Convert.ToDouble(dtr["Qty"]);
                        Price = Convert.ToDouble(dtr["Price"]);
                        SubAmt = Convert.ToDouble(dtr["SubAmt"]);
                        Discount = Convert.ToDouble(dtr["Discount"]);
                        GSTAmt = Convert.ToDouble(dtr["GSTAmt"]);
                        TotalAmt = Convert.ToDouble(dtr["TotalAmt"]);
                        Remarks = dtr["Remarks"].ToString();
                        Category = dtr["Category"].ToString();
                        Barcode = dtr["Barcode"].ToString();
                        LineRemarks = dtr["LineRemarks"].ToString();
                        LineNo = dtr["LineNo"].ToString();
                        Field1 = Convert.ToDouble(dtr["Field1"]);
                        Field2 = Convert.ToDouble(dtr["Field2"]);
                        CSQty = Convert.ToDouble(dtr["CSQty"]);
                        PKQty = Convert.ToDouble(dtr["PKQty"]);

                        sImg = sPath + "blank.png";

                        if (System.IO.File.Exists(sImg))
                        { }
                        else
                        {
                            sImg = sPath + "blank.png";
                        }
                        Image imageProduct = Image.FromFile(sImg);

                        int iHeight = 120;
                        int iWidth = 160;
                        //if (imageProduct.Size.Height / iHeight > imageProduct.Size.Width / iWidth)
                        //{
                        //    iHeight = iHeight;
                        //    iWidth = (iHeight / imageProduct.Size.Height) * imageProduct.Size.Width;
                        //}
                        //else
                        //{
                        //    iHeight = (iWidth / imageProduct.Size.Width) * imageProduct.Size.Height;
                        //    iWidth = iWidth;
                        //}

                        Bitmap bm = new Bitmap(imageProduct, iWidth, iHeight);
                        MemoryStream ms = new MemoryStream();
                        bm.Save(ms, System.Drawing.Imaging.ImageFormat.Bmp);
                        byte[] bytImageData = new byte[ms.Length - 1];
                        bytImageData = ms.ToArray();

                        ImageFileName = bytImageData;

                        sqlQuery = " Insert into DailyOrderDetailRep (InvNo,InvDt,CustNo,CustName,PayTerms,AgentId,ItemNo,Description,UOM,Qty,Price,SubAmt,Discount,GSTAmt,TotalAmt,Remarks,CompanyName,FromDate,ToDate,Barcode,LineRemarks,Field1,Field2,CSQty,PKQty,ImageFileName) values ('" + SerInvNo + "','" + ServiceDt + "','" + CustomerID + "','" + CustName.Replace("'", "''") + "','" + PaymentTerms + "','" + AgentID + "','" + ItemNo + "','" + Description.Replace("'", "''") + "','" + UOM + "','" + Qty + "','" + Price + "','" + SubAmt + "','" + Discount + "','" + GSTAmt + "','" + TotalAmt + "','" + Remarks + "','" + CompanyName + "','" + fromdate + "','" + todate + "','" + Barcode + "','" + LineRemarks + "','" + Field1 + "','" + Field2 + "','" + CSQty + "','" + PKQty + "',@C1) ; ";

                        cr.ExecuteNonQueryWithImage(sqlQuery, ImageFileName);
                        //comstr = new SqlCommand(sqlQuery, con);
                        //comstr.Parameters.AddWithValue("@C3", SqlDbType.Binary).Value = ImageFileName;

                        //con.open();
                        //cmd.ExecuteNonQuery();                        //con.close();
                        //cr.ExecuteNonQuery(sqlQuery);
                    }
                    PrevOrdNo = dtr["InvNo"].ToString();
                }

                dtr.Close();
                dtr.Dispose();
                return Json(1);
            }
            catch (Exception ex)
            {
                return Json(0);
            }
            finally
            {
            }
        }


        public JsonResult LOADMETERREADING(string fromdate, string todate, string salesmanterritory, string userid)
        {
            //DataTable dt = new DataTable();

            //dt.Columns.Add("SerInvNo", typeof(System.String));
            //dt.Columns.Add("CustomerID", typeof(System.String));
            //dt.Columns.Add("CustName", typeof(System.String));
            //dt.Columns.Add("ServiceDt", typeof(System.DateTime));
            //dt.Columns.Add("ServiceType", typeof(System.String));
            //dt.Columns.Add("Details", typeof(System.String));
            //dt.Columns.Add("AgentID", typeof(System.String));
            //dt.Columns.Add("DisplayImage", typeof(System.Byte));
            //dt.Columns.Add("ImageFileName", typeof(System.Byte));
            //DataRow row;

            SqlCommand comstr = new SqlCommand();
            try
            {
                CommonRule cr = new CommonRule();
                SqlConnection con = new SqlConnection(constr);

                string sAgent = "", sPath = "", sServiceType = "", sReasonCode = "";
                string SerInvNo = "", CustomerID = "", CustName = "", ServiceType = "", Details = "", AgentID = "", AgentName = "", sCreateTime = "";
                DateTime ServiceDt = DateTime.Now;
                byte[] DisplayImage = new byte[0], ImageFileName = new byte[0];
                string sImg = "";
                string sqlQuery = "";

                if (salesmanterritory == "ALL")
                {
                    sAgent = " ";
                }
                else
                {
                    sAgent = " and Invoice.AgentID= " + "'" + salesmanterritory + "'";
                }


                sPath = GetDocumentFolder();

                //sPath = System.IO.Path.Combine (Server.MapPath (sPath ),sPath);
                //SqlCommand com1 = new SqlCommand(" Delete from MeterReadingRep ; Select Distinct MeterReading.InvNo as SerInvNo, MRDate as ServiceDt, CustID, Customer.CustName, 'Meter Reading' as ServiceType, MN  as Details, Invoice.AgentID, SalesAgent.Name as AgentName from MeterReading, Customer, SalesAgent, Invoice where Customer.CustNo = Invoice.CustID and SalesAgent.Code=Invoice.AgentID and Invoice.InvNo=MeterReading.InvNo  and Convert(Date,MRDate) Between  '" + fromdate + "' and '" + todate + "' " + sAgent, con);
                SqlCommand com1 = new SqlCommand(" Delete from MeterReadingRep ; Select Distinct MeterReading.InvNo + '-' + MeterReading.MN + '-' + convert(nvarchar, MeterReading.Reader) + '-_1' as SerInvNo, MRDate as ServiceDt, CustID, Customer.CustName, 'Meter Reading' as ServiceType, MN  as Details, Invoice.AgentID, SalesAgent.Name as AgentName from MeterReading, Customer, SalesAgent, Invoice where Customer.CustNo = Invoice.CustID and SalesAgent.Code=Invoice.AgentID and Invoice.InvNo=MeterReading.InvNo  and Convert(Date,MRDate) Between  '" + fromdate + "' and '" + todate + "' " + sAgent, con);

                con.Open();
                dtr = com1.ExecuteReader();
                while (dtr.Read() == true)
                {
                    SerInvNo = dtr["SerInvNo"].ToString();
                    FTPDownloadFile1(sPath, GetCloudFolder(), dtr["SerInvNo"].ToString());
                    DirectoryInfo dir = new DirectoryInfo(sPath);
                    FileInfo[] arrFo = dir.GetFiles("*" + dtr["SerInvNo"].ToString() + "*");
                    if (arrFo.Length > 0)
                    {
                        for (int i = 0; i < arrFo.Length; i++)
                        {
                            SerInvNo = dtr["SerInvNo"].ToString();
                            ServiceDt = Convert.ToDateTime(dtr["ServiceDt"].ToString());
                            CustomerID = dtr["CustID"].ToString();
                            CustName = dtr["CustName"].ToString();
                            ServiceType = dtr["ServiceType"].ToString();
                            Details = dtr["Details"].ToString();
                            AgentID = dtr["AgentID"].ToString();
                            AgentName = dtr["AgentName"].ToString();

                            FileInfo fo = arrFo[i];
                            sImg = sPath + fo.Name;

                            if (System.IO.File.Exists(sImg))
                            {
                                sCreateTime = fo.LastWriteTime.ToString("hh:mm tt");
                            }
                            else
                            {
                                sImg = sPath + "blank.png";
                            }
                            Image imageProduct = Image.FromFile(sImg);
                            int iHeight = 120;
                            int iWidth = 160;

                            //if (imageProduct.Size.Height / iHeight > imageProduct.Size.Width / iWidth)
                            //{
                            //    iHeight = iHeight;
                            //    iWidth = (iHeight / imageProduct.Size.Height) * imageProduct.Size.Width;
                            //}
                            //else
                            //{
                            //    iHeight = (iWidth / imageProduct.Size.Width) * imageProduct.Size.Height;
                            //    iWidth = iWidth;
                            //}
                            Bitmap bm = new Bitmap(imageProduct, iWidth, iHeight);
                            MemoryStream ms = new MemoryStream();
                            bm.Save(ms, System.Drawing.Imaging.ImageFormat.Bmp);
                            byte[] bytImageData = new byte[ms.Length - 1];
                            bytImageData = ms.ToArray();

                            ImageFileName = bytImageData;

                            //row = dt.NewRow();
                            //row["SerInvNo"] = dtr ["SerInvNo"].ToString ();
                            //row["ServiceDt"] = dtr["ServiceDt"];
                            //row["CustomerId"] = dtr["CustomerId"].ToString();
                            //row["CustName"] = dtr["CustName"].ToString();
                            //row["ServiceType"] = dtr["ServiceType"].ToString();
                            //row["Details"] = dtr["Details"].ToString();
                            //row["AgentID"] = dtr["AgentID"].ToString();
                            //row["ImageFileName"] = bytImageData;
                            //dt.Rows.Add(row);

                            //for (int cnt =0; cnt < dt.Rows .Count -1 ; cnt++)
                            //{
                            //    sqlQuery += " Insert into ServiceRep (SerInvNo,CustomerID,CustName,ServiceType,Details,ServiceDt,AgentID,ImageFileName) values ( '" + dt.Rows[cnt]["SerInvNo"].ToString() + "','" + dt.Rows[cnt]["CustomerID"].ToString() + "','" + dt.Rows[cnt]["CustName"].ToString() + "','" + dt.Rows[cnt]["ServiceType"].ToString() + "','" + dt.Rows[cnt]["Details"].ToString() + "','" + dt.Rows[cnt]["ServiceDt"] + "','" + dt.Rows[cnt]["AgentID"].ToString() + "','" + dt.Rows[cnt]["ImageFileName"].ToString() + "') ; ";
                            //}

                            sqlQuery = " Insert into MeterReadingRep (SerInvNo,CustID,CustName,ServiceType,Details,ServiceDt,AgentID,AgentName,ImageFileName) values ('" + SerInvNo + "','" + CustomerID + "','" + CustName + "','" + ServiceType + "','" + Details + "','" + ServiceDt + "','" + AgentID + "','" + AgentName + "',@C1) ; ";

                            //comstr  = new SqlCommand(sqlQuery, con);
                            //comstr.Parameters.AddWithValue("@C3", SqlDbType.Binary).Value = ImageFileName;

                            //comstr.ExecuteNonQuery();                        //con.close();
                            cr.ExecuteNonQueryWithImage(sqlQuery, ImageFileName);
                        }
                    }
                    else
                    {
                        SerInvNo = dtr["SerInvNo"].ToString();
                        ServiceDt = Convert.ToDateTime(dtr["ServiceDt"].ToString());
                        CustomerID = dtr["CustID"].ToString();
                        CustName = dtr["CustName"].ToString();
                        ServiceType = dtr["ServiceType"].ToString();
                        Details = dtr["Details"].ToString();
                        AgentID = dtr["AgentID"].ToString();
                        AgentName = dtr["AgentName"].ToString();

                        sImg = sPath + "blank.png";

                        if (System.IO.File.Exists(sImg))
                        { }
                        else
                        {
                            sImg = sPath + "blank.png";
                        }
                        Image imageProduct = Image.FromFile(sImg);

                        int iHeight = 120;
                        int iWidth = 160;
                        //if (imageProduct.Size.Height / iHeight > imageProduct.Size.Width / iWidth)
                        //{
                        //    iHeight = iHeight;
                        //    iWidth = (iHeight / imageProduct.Size.Height) * imageProduct.Size.Width;
                        //}
                        //else
                        //{
                        //    iHeight = (iWidth / imageProduct.Size.Width) * imageProduct.Size.Height;
                        //    iWidth = iWidth;
                        //}

                        Bitmap bm = new Bitmap(imageProduct, iWidth, iHeight);
                        MemoryStream ms = new MemoryStream();
                        bm.Save(ms, System.Drawing.Imaging.ImageFormat.Bmp);
                        byte[] bytImageData = new byte[ms.Length - 1];
                        bytImageData = ms.ToArray();

                        ImageFileName = bytImageData;

                        sqlQuery = " Insert into MeterReadingRep (SerInvNo,CustID,CustName,ServiceType,Details,ServiceDt,AgentID,AgentName,ImageFileName) values ('" + SerInvNo + "','" + CustomerID + "','" + CustName + "','" + ServiceType + "','" + Details + "','" + ServiceDt + "','" + AgentID + "','" + AgentName + "',@C1) ; ";

                        cr.ExecuteNonQueryWithImage(sqlQuery, ImageFileName);
                        //comstr = new SqlCommand(sqlQuery, con);
                        //comstr.Parameters.AddWithValue("@C3", SqlDbType.Binary).Value = ImageFileName;

                        //con.open();
                        //cmd.ExecuteNonQuery();                        //con.close();
                        //cr.ExecuteNonQuery(sqlQuery);
                    }
                }

                dtr.Close();
                dtr.Dispose();

                //cr.ExecuteNonQuery(sqlQuery);

                //comstr.ExecuteNonQuery(); 

                return Json(1);
            }
            catch (Exception ex)
            {
                return Json(0);
            }
            finally
            {
            }
        }


        public JsonResult LOADTOPUP(string fromdate, string todate, string salesmanterritory, string Machine, string userid)
        {
            //DataTable dt = new DataTable();

            //dt.Columns.Add("SerInvNo", typeof(System.String));
            //dt.Columns.Add("CustomerID", typeof(System.String));
            //dt.Columns.Add("CustName", typeof(System.String));
            //dt.Columns.Add("ServiceDt", typeof(System.DateTime));
            //dt.Columns.Add("ServiceType", typeof(System.String));
            //dt.Columns.Add("Details", typeof(System.String));
            //dt.Columns.Add("AgentID", typeof(System.String));
            //dt.Columns.Add("DisplayImage", typeof(System.Byte));
            //dt.Columns.Add("ImageFileName", typeof(System.Byte));
            //DataRow row;

            SqlCommand comstr = new SqlCommand();
            try
            {
                CommonRule cr = new CommonRule();
                SqlConnection con = new SqlConnection(constr);

                string sAgent = "", sPath = "", sServiceType = "", sReasonCode = "", sMachine = "";
                string SerInvNo = "", CustomerID = "", CustName = "", ServiceType = "", Details = "", AgentID = "", DocNo = "", MDTNo = "";
                DateTime ServiceDt = DateTime.Now;
                //byte[] DisplayImage = new byte[0], ImageFileName = new byte[0];
                string sImg = "", sImg1 = "", sImg2 = "";
                string sqlQuery = "";

                DateTime VisitedDate = DateTime.Now;
                string MachineNo = "", MachineName = "", ItemNo = "", ItemName = "", Image1 = "", Image2 = "", Image3 = "", MeterImg = "", QuantityImg = "", CashImg = "", Date = "", SalesAgent = "";
                Int32 MeterValue = 0, MeterQuantity = 0, MeterCash = 0;
                byte[] MeterImage = new byte[0], QuantityImage = new byte[0], CashImage = new byte[0], ImageFileName = new byte[0], ImageFileName1 = new byte[0], ImageFileName2 = new byte[0];
                Int16 ColumnNo = 0, Capacity = 0, InitialQuantity = 0, SoldQuantity = 0, TopupQuantity = 0, ReturnQuantity = 0, Balance = 0;
                double SoldAmount = 0, TopupAmount = 0, ReturnAmount = 0;
                string CurrentMachine = "", OldMachine = "", MeterPhotoName = "", QuantityPhotoName = "", CashPhotoName = "";



                if (salesmanterritory == "ALL")
                {
                    sAgent = " ";
                }
                else
                {
                    sAgent = " and I.AgentId= " + "'" + salesmanterritory + "'";
                }

                if (Machine == "ALL")
                {
                    sMachine = " ";
                }
                else
                {
                    sMachine = " and C.CustNo= " + "'" + Machine + "'";
                }

                if (fromdate != todate)
                {
                    if (Machine == "ALL" && salesmanterritory == "ALL")
                    {
                        Date = " convert(date,I.InvDt) = " + "'" + fromdate + "'";
                    }
                    else
                    {
                        Date = " convert(date,I.InvDt) Between " + "'" + fromdate + "'" + " and " + "'" + todate + "'";
                    }
                }
                else
                {
                    Date = " convert(date,I.InvDt) Between " + "'" + fromdate + "'" + " and " + "'" + todate + "'";
                }

                sPath = GetDocumentFolder();

                //sPath = System.IO.Path.Combine (Server.MapPath (sPath ),sPath);
                //SqlCommand com1 = new SqlCommand(" Delete from MachineTopUpRep ; Select InvDt as [VisitedDate], C.CustNo as [MachineNo], C.CustName as [MachineName], isnull(MR.MRQty,0) as [MeterValue], isnull(MRQ.MRQty,0) as [MeterQuantity], isnull(MRC.MRQty,0) as [MeterCash],I.INVNO + '-' + I.CustId + '-1-_1' as [MeterImage], I.INVNO + '-' + I.CustId + '-2-_1' as [QuantityImage], I.INVNO + '-' + I.CustId + '-3-_1' as [CashImage],CP.DisplayNo as [ColumnNo], CP.ItemNo, Item.ItemName, isnull(CP.Qty,0) as Capacity, isnull(IIS.Qty,0) as [InitialQuantity], isnull(Sold.Qty,0) as [SoldQuantity], isnull(Sold.SubAmt,0) as [SoldAmount], isnull(TUP.Qty,0) as [TopupQuantity], isnull(TUP.SubAmt,0) as [TopupAmount], isnull(R.Qty,0) as [ReturnQuantity], isnull(R.SubAmt,0) as [ReturnAmount], isnull(IIS.Qty,0) - isnull(Sold.Qty,0) + isnull(TUP.Qty,0) - isnull(R.Qty,0) as Balance, SA.Name as [SalesAgent] from Invoice I INNER JOIN CustProd CP ON CP.CustID = I.CustId INNER JOIN Customer C ON I.CustId = C.CustNo INNER JOIN SalesAgent SA ON I.AgentId = SA.Code INNER JOIN Item ON CP.ItemNo = Item.ItemNo LEFT JOIN MeterReading MR ON I.InvNo = MR.InvNo and MR.Reader = 1 LEFT JOIN MeterReading MRC ON I.InvNo = MRC.InvNo and MRC.Reader = 3 LEFT JOIN MeterReading MRQ ON I.InvNo = MRQ.InvNo and MRQ.Reader = 2 LEFT JOIN InvItem IIS ON IIS.InvNo = I.InvNo and IIS.SalesType = 'IS' and CP.DisplayNo = IIS.[LineNo] LEFT JOIN InvItem Sold ON Sold.InvNo = I.InvNo and Sold.SalesType = 'S' and CP.DisplayNo = Sold.[LineNo] LEFT JOIN InvItem TUP ON TUP.InvNo = I.InvNo and TUP.SalesType = 'TUP' and CP.DisplayNo = TUP.[LineNo] LEFT JOIN InvItem R ON R.InvNo = I.InvNo and R.SalesType = 'R' and CP.DisplayNo = R.[LineNo] Where " + Date + sAgent + sMachine + " order by [SalesAgent], I.InvNo, [ColumnNo] ", con);
                //SqlCommand com1 = new SqlCommand(" Delete from MachineTopUpRep ; Select InvDt as [VisitedDate], C.CustNo as [MachineNo], C.CustName as [MachineName], isnull(MR.MRQty,0) as [MeterValue], isnull(MRQ.MRQty,0) as [MeterQuantity], isnull(MRC.MRQty,0) as [MeterCash],I.INVNO + '-' + I.CustId + '-1-_1' as [MeterImage], I.INVNO + '-' + I.CustId + '-2-_1' as [QuantityImage], I.INVNO + '-' + I.CustId + '-3-_1' as [CashImage],CP.DisplayNo as [ColumnNo], CP.ItemNo, Item.ItemName, isnull(CP.Qty,0) as Capacity, isnull(IIS.Qty,0) as [InitialQuantity], isnull(Sold.Qty,0) as [SoldQuantity], isnull(Sold.SubAmt,0) as [SoldAmount], isnull(TUP.Qty,0) as [TopupQuantity], isnull(TUP.SubAmt,0) as [TopupAmount], isnull(R.Qty,0) as [ReturnQuantity], isnull(R.SubAmt,0) as [ReturnAmount],( isnull(IIS.Qty,0) - isnull(Sold.Qty,0) + isnull(TUP.Qty,0)-case when isnull(R.Qty,0)<0 then -(isnull(R.Qty,0)  else isnull(R.Qty,0)) end as Balance, SA.Name as [SalesAgent] from Invoice I INNER JOIN CustProd CP ON CP.CustID = I.CustId INNER JOIN Customer C ON I.CustId = C.CustNo INNER JOIN SalesAgent SA ON I.AgentId = SA.Code INNER JOIN Item ON CP.ItemNo = Item.ItemNo LEFT JOIN MeterReading MR ON I.InvNo = MR.InvNo and MR.Reader = 1 LEFT JOIN MeterReading MRC ON I.InvNo = MRC.InvNo and MRC.Reader = 3 LEFT JOIN MeterReading MRQ ON I.InvNo = MRQ.InvNo and MRQ.Reader = 2 LEFT JOIN InvItem IIS ON IIS.InvNo = I.InvNo and IIS.SalesType = 'IS' and CP.DisplayNo = IIS.[LineNo] LEFT JOIN InvItem Sold ON Sold.InvNo = I.InvNo and Sold.SalesType = 'S' and CP.DisplayNo = Sold.[LineNo] LEFT JOIN InvItem TUP ON TUP.InvNo = I.InvNo and TUP.SalesType = 'TUP' and CP.DisplayNo = TUP.[LineNo] LEFT JOIN InvItem R ON R.InvNo = I.InvNo and R.SalesType = 'R' and CP.DisplayNo = R.[LineNo] Where " + Date + sAgent + sMachine + " order by [SalesAgent], I.InvNo, [ColumnNo] ", con);
                //SqlCommand com1 = new SqlCommand(" Delete from MachineTopUpRep ; Select InvDt as [VisitedDate], C.CustNo as [MachineNo], C.CustName as [MachineName], isnull(MR.MRQty,0) as [MeterValue], isnull(MRQ.MRQty,0) as [MeterQuantity], isnull(MRC.MRQty,0) as [MeterCash],I.INVNO + '-' + I.CustId + '-1-_1' as [MeterImage], I.INVNO + '-' + I.CustId + '-2-_1' as [QuantityImage], I.INVNO + '-' + I.CustId + '-3-_1' as [CashImage],CP.DisplayNo as [ColumnNo], CP.ItemNo, Item.ItemName, isnull(CP.Qty,0) as Capacity, isnull(IIS.Qty,0) as [InitialQuantity], isnull(Sold.Qty,0) as [SoldQuantity], isnull(Sold.SubAmt,0) as [SoldAmount], isnull(TUP.Qty,0) as [TopupQuantity], isnull(TUP.SubAmt,0) as [TopupAmount], isnull(R.Qty,0) as [ReturnQuantity], isnull(R.SubAmt,0) as [ReturnAmount],( isnull(IIS.Qty,0) - isnull(Sold.Qty,0) + isnull(TUP.Qty,0) -case when isnull(R.Qty,0)<0 then isnull(- R.Qty,0) else isnull(R.Qty,0) end)  as Balance, SA.Name as [SalesAgent] from Invoice I INNER JOIN CustProd CP ON CP.CustID = I.CustId INNER JOIN Customer C ON I.CustId = C.CustNo INNER JOIN SalesAgent SA ON I.AgentId = SA.Code INNER JOIN Item ON CP.ItemNo = Item.ItemNo LEFT JOIN MeterReading MR ON I.InvNo = MR.InvNo and MR.Reader = 1 LEFT JOIN MeterReading MRC ON I.InvNo = MRC.InvNo and MRC.Reader = 3 LEFT JOIN MeterReading MRQ ON I.InvNo = MRQ.InvNo and MRQ.Reader = 2 LEFT JOIN InvItem IIS ON IIS.InvNo = I.InvNo and IIS.SalesType = 'IS' and CP.DisplayNo = IIS.[LineNo] LEFT JOIN InvItem Sold ON Sold.InvNo = I.InvNo and Sold.SalesType = 'S' and CP.DisplayNo = Sold.[LineNo] LEFT JOIN InvItem TUP ON TUP.InvNo = I.InvNo and TUP.SalesType = 'TUP' and CP.DisplayNo = TUP.[LineNo] LEFT JOIN InvItem R ON R.InvNo = I.InvNo and R.SalesType = 'R' and CP.DisplayNo = R.[LineNo] Where " + Date + sAgent + sMachine + " order by [SalesAgent], I.InvNo, [ColumnNo] ", con);
                SqlCommand com1 = new SqlCommand(" Delete from MachineTopUpRep ; Select InvDt as [VisitedDate], C.CustNo as [MachineNo], C.CustName as [MachineName], isnull(MR.MRQty,0) as [MeterValue], isnull(MRQ.MRQty,0) as [MeterQuantity], isnull(MRC.MRQty, 0) as [MeterCash], I.INVNO + '-' + I.CustId + '-1-_1' as [MeterImage], I.INVNO + '-' + I.CustId + '-2-_1' as [QuantityImage], I.INVNO + '-' + I.CustId + '-3-_1' as [CashImage], CP.DisplayNo as [ColumnNo], CP.ItemNo, Item.ItemName, isnull(CP.Qty, 0) as Capacity, isnull(IIS.Qty, 0) as [InitialQuantity], isnull(Sold.Qty, 0) as [SoldQuantity],isnull(Sold.SubAmt, 0) as [SoldAmount], isnull(TUP.Qty, 0) as [TopupQuantity], isnull(TUP.SubAmt, 0) as [TopupAmount], isnull(R.Qty, 0) as [ReturnQuantity], isnull(R.SubAmt, 0) as [ReturnAmount], (isnull(IIS.Qty, 0) - isnull(Sold.Qty, 0) + isnull(TUP.Qty, 0) -case when isnull(R.Qty, 0) < 0 then isnull(-R.Qty, 0) else isnull(R.Qty, 0) end) as Balance, SA.Name as [SalesAgent] from Invoice I INNER JOIN (Select min(DisplayNo) as DisplayNo, ItemNo, sum(qty) as Qty, CustId from CustProd group by CustID, ItemNo)  CP ON CP.CustID = I.CustId INNER JOIN Customer C ON I.CustId = C.CustNo INNER JOIN SalesAgent SA ON I.AgentId = SA.Code INNER JOIN Item ON CP.ItemNo = Item.ItemNo LEFT JOIN MeterReading MR ON I.InvNo = MR.InvNo and MR.Reader = 1 LEFT JOIN MeterReading MRC ON I.InvNo = MRC.InvNo and MRC.Reader = 3 LEFT JOIN MeterReading MRQ ON I.InvNo = MRQ.InvNo and MRQ.Reader = 2 LEFT JOIN InvItem IIS ON IIS.InvNo = I.InvNo and IIS.SalesType = 'IS' and CP.DisplayNo = IIS.[LineNo] LEFT JOIN InvItem Sold ON Sold.InvNo = I.InvNo and Sold.SalesType = 'S' and CP.DisplayNo = Sold.[LineNo] LEFT JOIN InvItem TUP ON TUP.InvNo = I.InvNo and TUP.SalesType = 'TUP' and CP.DisplayNo = TUP.[LineNo] LEFT JOIN InvItem R ON R.InvNo = I.InvNo and R.SalesType = 'R' and CP.DisplayNo = R.[LineNo] Where " + Date + sAgent + sMachine + " order by [SalesAgent], I.InvNo, [ColumnNo] ", con);

                con.Open();
                dtr = com1.ExecuteReader();
                while (dtr.Read() == true)
                {

                    CurrentMachine = dtr["MachineNo"].ToString();
                    //if (OldMachine != CurrentMachine)
                    //{
                    //    FTPDownloadFile1(sPath, GetCloudFolder(), dtr["MeterImage"].ToString());
                    //    FTPDownloadFile1(sPath, GetCloudFolder(), dtr["QuantityImage"].ToString());
                    //    FTPDownloadFile1(sPath, GetCloudFolder(), dtr["CashImage"].ToString());
                    //}
                    //DirectoryInfo dir = new DirectoryInfo(sPath);
                    //FileInfo[] arrFo = dir.GetFiles("*" + dtr["MeterImage"].ToString() + "*");
                    //FileInfo[] arrFo1 = dir.GetFiles("*" + dtr["QuantityImage"].ToString() + "*");
                    //FileInfo[] arrFo2 = dir.GetFiles("*" + dtr["CashImage"].ToString() + "*");

                    //if (arrFo.Length > 0)
                    //{
                    //    for (int i = 0; i < arrFo.Length; i++)

                    //    {
                    VisitedDate = Convert.ToDateTime(dtr["VisitedDate"].ToString());
                    MachineNo = dtr["MachineNo"].ToString();
                    MachineName = dtr["MachineName"].ToString();
                    MeterValue = Convert.ToInt32(dtr["MeterValue"].ToString());
                    MeterQuantity = Convert.ToInt32(dtr["MeterQuantity"].ToString());
                    MeterCash = Convert.ToInt32(dtr["MeterCash"].ToString());
                    //MeterImage= dtr["MachineNo"].ToString();
                    //QuantityImage= dtr["MachineNo"].ToString();
                    //CashImage= dtr["MachineNo"].ToString();
                    ColumnNo = Convert.ToInt16(dtr["ColumnNo"].ToString());
                    ItemNo = dtr["ItemNo"].ToString();
                    ItemName = dtr["ItemName"].ToString();
                    Capacity = Convert.ToInt16(dtr["Capacity"].ToString());
                    InitialQuantity = Convert.ToInt16(dtr["InitialQuantity"].ToString());
                    SoldQuantity = Convert.ToInt16(dtr["SoldQuantity"].ToString());
                    SoldAmount = Convert.ToDouble(dtr["SoldAmount"].ToString());
                    TopupQuantity = Convert.ToInt16(dtr["TopupQuantity"].ToString());
                    TopupAmount = Convert.ToDouble(dtr["TopupAmount"].ToString());
                    ReturnQuantity = Convert.ToInt16(dtr["ReturnQuantity"].ToString());
                    ReturnAmount = Convert.ToDouble(dtr["ReturnAmount"].ToString());
                    Balance = Convert.ToInt16(dtr["Balance"].ToString());
                    SalesAgent = dtr["SalesAgent"].ToString();
                    MeterImg = "http://simplrcloud.southeastasia.cloudapp.azure.com/SimplrPokkaLiveSimplrSalesService/Photo/" + dtr["MeterImage"].ToString() + ".simg";
                    QuantityImg = "http://simplrcloud.southeastasia.cloudapp.azure.com/SimplrPokkaLiveSimplrSalesService/Photo/" + dtr["QuantityImage"].ToString() + ".simg";
                    CashImg = "http://simplrcloud.southeastasia.cloudapp.azure.com/SimplrPokkaLiveSimplrSalesService/Photo/" + dtr["CashImage"].ToString() + ".simg";

                    MeterPhotoName = "View photo...";
                    QuantityPhotoName = "View photo...";
                    CashPhotoName = "View photo...";

                    //if (arrFo.Length > 0)
                    //{
                    //    FileInfo fo = arrFo[i];
                    //    sImg = sPath + fo.Name;
                    //}


                    //if (System.IO.File.Exists(sImg))
                    //{ }
                    //else
                    //{
                    //    sImg = sPath + "blank.png";
                    //}
                    //Image imageProduct = Image.FromFile(sImg);
                    //int iHeight = 120;
                    //int iWidth = 160;

                    //Bitmap bm = new Bitmap(imageProduct, iWidth, iHeight);
                    //MemoryStream ms = new MemoryStream();
                    //bm.Save(ms, System.Drawing.Imaging.ImageFormat.Bmp);
                    //byte[] bytImageData = new byte[ms.Length - 1];
                    //bytImageData = ms.ToArray();

                    //ImageFileName = bytImageData;

                    //if (arrFo1.Length > 0)
                    //{
                    //    FileInfo fo1 = arrFo1[i];
                    //    sImg1 = sPath + fo1.Name;
                    //}

                    //if (System.IO.File.Exists(sImg1))
                    //{ }
                    //else
                    //{
                    //    sImg1 = sPath + "blank.png";
                    //}
                    //Image imageProduct1 = Image.FromFile(sImg1);
                    //int iHeight1 = 120;
                    //int iWidth1 = 160;


                    //Bitmap bm1 = new Bitmap(imageProduct1, iWidth1, iHeight1);
                    //MemoryStream ms1 = new MemoryStream();
                    //bm1.Save(ms1, System.Drawing.Imaging.ImageFormat.Bmp);
                    //byte[] bytImageData1 = new byte[ms1.Length - 1];
                    //bytImageData1 = ms1.ToArray();

                    //ImageFileName1 = bytImageData1;

                    //if (arrFo2.Length > 0)
                    //{
                    //    FileInfo fo2 = arrFo2[i];
                    //    sImg2 = sPath + fo2.Name;
                    //}

                    //if (System.IO.File.Exists(sImg2))
                    //{ }
                    //else
                    //{
                    //    sImg2 = sPath + "blank.png";
                    //}
                    //Image imageProduct2 = Image.FromFile(sImg2);
                    //int iHeight2 = 120;
                    //int iWidth2 = 160;


                    //Bitmap bm2 = new Bitmap(imageProduct2, iWidth2, iHeight2);
                    //MemoryStream ms2 = new MemoryStream();
                    //bm2.Save(ms2, System.Drawing.Imaging.ImageFormat.Bmp);
                    //byte[] bytImageData2 = new byte[ms2.Length - 1];
                    //bytImageData2 = ms2.ToArray();

                    //ImageFileName2 = bytImageData2;

                    //sqlQuery = " Insert into MachineTopUpRep (FromDate,ToDate,VisitedDate,MachineNo,MachineName,MeterValue,MeterQuantity,MeterCash,ColumnNo,ItemNo,ItemName,Capacity,InitialQuantity,SoldQuantity,SoldAmount,TopupQuantity,TopupAmount,ReturnQuantity,ReturnAmount,Balance,SalesAgent,MeterImage,QuantityImage,CashImage) values ('" + fromdate + "','" + todate + "','" + VisitedDate + "','" + MachineNo + "','" + MachineName + "','" + MeterValue + "','" + MeterQuantity + "','" + MeterCash + "','" + ColumnNo + "','" + ItemNo + "','" + ItemName + "','" + Capacity + "','" + InitialQuantity + "','" + SoldQuantity + "','" + SoldAmount + "','" + TopupQuantity + "','" + TopupAmount + "','" + ReturnQuantity + "','" + ReturnAmount + "','" + Balance + "','" + SalesAgent + "',@C1,@C2,@C3) ; ";
                    //sqlQuery = " Insert into MachineTopUpRep (FromDate,ToDate,VisitedDate,MachineNo,MachineName,MeterValue,MeterQuantity,MeterCash,ColumnNo,ItemNo,ItemName,Capacity,InitialQuantity,SoldQuantity,SoldAmount,TopupQuantity,TopupAmount,ReturnQuantity,ReturnAmount,Balance,MeterImg,QuantityImg,CashImg,SalesAgent) values ('" + fromdate + "','" + todate + "','" + VisitedDate + "','" + MachineNo + "','" + MachineName + "','" + MeterValue + "','" + MeterQuantity + "','" + MeterCash + "','" + ColumnNo + "','" + ItemNo + "','" + ItemName + "','" + Capacity + "','" + InitialQuantity + "','" + SoldQuantity + "','" + SoldAmount + "','" + TopupQuantity + "','" + TopupAmount + "','" + ReturnQuantity + "','" + ReturnAmount + "','" + Balance + "','" + MeterImg + "','" + QuantityImg + "','" + CashImg + "','" + SalesAgent + "') ; ";
                    sqlQuery = " Insert into MachineTopUpRep (FromDate,ToDate,VisitedDate,MachineNo,MachineName,MeterValue,MeterQuantity,MeterCash,ColumnNo,ItemNo,ItemName,Capacity,InitialQuantity,SoldQuantity,SoldAmount,TopupQuantity,TopupAmount,ReturnQuantity,ReturnAmount,Balance,MeterImg,QuantityImg,CashImg,SalesAgent,MeterPhotoName, QuantityPhotoName, CashPhotoName ) values ('" + fromdate + "','" + todate + "','" + VisitedDate + "','" + MachineNo + "','" + MachineName + "','" + MeterValue + "','" + MeterQuantity + "','" + MeterCash + "','" + ColumnNo + "','" + ItemNo + "','" + ItemName + "','" + Capacity + "','" + InitialQuantity + "','" + SoldQuantity + "','" + SoldAmount + "','" + TopupQuantity + "','" + TopupAmount + "','" + ReturnQuantity + "','" + ReturnAmount + "','" + Balance + "','" + MeterImg + "','" + QuantityImg + "','" + CashImg + "','" + SalesAgent + "','" + MeterPhotoName + "', '" + QuantityPhotoName + "' ,'" + CashPhotoName + "' ) ; ";

                    //cr.ExecuteNonQueryWithThreeImages(sqlQuery, ImageFileName, ImageFileName1, ImageFileName2);
                    cr.executerQuery(sqlQuery);


                }
                //    }
                //    else
                //    {
                //        VisitedDate = Convert.ToDateTime(dtr["VisitedDate"].ToString());
                //        MachineNo = dtr["MachineNo"].ToString();
                //        MachineName = dtr["MachineName"].ToString();
                //        MeterValue = Convert.ToInt32(dtr["MeterValue"].ToString());
                //        MeterQuantity = Convert.ToInt32(dtr["MeterQuantity"].ToString());
                //        MeterCash = Convert.ToInt32(dtr["MeterCash"].ToString());
                //        //MeterImage= dtr["MachineNo"].ToString();
                //        //QuantityImage= dtr["MachineNo"].ToString();
                //        //CashImage= dtr["MachineNo"].ToString();
                //        ColumnNo = Convert.ToInt16(dtr["ColumnNo"].ToString());
                //        ItemNo = dtr["ItemNo"].ToString();
                //        ItemName = dtr["ItemName"].ToString();
                //        Capacity = Convert.ToInt16(dtr["Capacity"].ToString());
                //        InitialQuantity = Convert.ToInt16(dtr["InitialQuantity"].ToString());
                //        SoldQuantity = Convert.ToInt16(dtr["SoldQuantity"].ToString());
                //        SoldAmount = Convert.ToDouble(dtr["SoldAmount"].ToString());
                //        TopupQuantity = Convert.ToInt16(dtr["TopupQuantity"].ToString());
                //        TopupAmount = Convert.ToDouble(dtr["TopupAmount"].ToString());
                //        ReturnQuantity = Convert.ToInt16(dtr["ReturnQuantity"].ToString());
                //        ReturnAmount = Convert.ToDouble(dtr["ReturnAmount"].ToString());
                //        Balance = Convert.ToInt16(dtr["Balance"].ToString());
                //        SalesAgent = dtr["SalesAgent"].ToString();

                //        sImg = sPath + "blank.png";

                //        if (System.IO.File.Exists(sImg))
                //        { }
                //        else
                //        {
                //            sImg = sPath + "blank.png";
                //        }
                //        Image imageProduct = Image.FromFile(sImg);

                //        int iHeight = 120;
                //        int iWidth = 160;

                //        Bitmap bm = new Bitmap(imageProduct, iWidth, iHeight);
                //        MemoryStream ms = new MemoryStream();
                //        bm.Save(ms, System.Drawing.Imaging.ImageFormat.Bmp);
                //        byte[] bytImageData = new byte[ms.Length - 1];
                //        bytImageData = ms.ToArray();

                //        ImageFileName = bytImageData;

                //        sImg1 = sPath + "blank.png";

                //        if (System.IO.File.Exists(sImg1))
                //        { }
                //        else
                //        {
                //            sImg1 = sPath + "blank.png";
                //        }
                //        Image imageProduct1 = Image.FromFile(sImg1);
                //        int iHeight1 = 120;
                //        int iWidth1 = 160;


                //        Bitmap bm1 = new Bitmap(imageProduct1, iWidth1, iHeight1);
                //        MemoryStream ms1 = new MemoryStream();
                //        bm1.Save(ms1, System.Drawing.Imaging.ImageFormat.Bmp);
                //        byte[] bytImageData1 = new byte[ms1.Length - 1];
                //        bytImageData1 = ms1.ToArray();

                //        ImageFileName1 = bytImageData1;

                //        sImg2 = sPath + "blank.png";

                //        if (System.IO.File.Exists(sImg2))
                //        { }
                //        else
                //        {
                //            sImg2 = sPath + "blank.png";
                //        }
                //        Image imageProduct2 = Image.FromFile(sImg2);
                //        int iHeight2 = 120;
                //        int iWidth2 = 160;


                //        Bitmap bm2 = new Bitmap(imageProduct2, iWidth2, iHeight2);
                //        MemoryStream ms2 = new MemoryStream();
                //        bm2.Save(ms2, System.Drawing.Imaging.ImageFormat.Bmp);
                //        byte[] bytImageData2 = new byte[ms2.Length - 1];
                //        bytImageData2 = ms2.ToArray();

                //        ImageFileName2 = bytImageData2;

                //        sqlQuery = " Insert into MachineTopUpRep (FromDate,ToDate,VisitedDate,MachineNo,MachineName,MeterValue,MeterQuantity,MeterCash,ColumnNo,ItemNo,ItemName,Capacity,InitialQuantity,SoldQuantity,SoldAmount,TopupQuantity,TopupAmount,ReturnQuantity,ReturnAmount,Balance,SalesAgent,MeterImage,QuantityImage,CashImage) values ('" + fromdate + "','" + todate + "','" + VisitedDate + "','" + MachineNo + "','" + MachineName + "','" + MeterValue + "','" + MeterQuantity + "','" + MeterCash + "','" + ColumnNo + "','" + ItemNo + "','" + ItemName + "','" + Capacity + "','" + InitialQuantity + "','" + SoldQuantity + "','" + SoldAmount + "','" + TopupQuantity + "','" + TopupAmount + "','" + ReturnQuantity + "','" + ReturnAmount + "','" + Balance + "','" + SalesAgent + "',@C1,@C2,@C3) ; ";

                //        //comstr  = new SqlCommand(sqlQuery, con);
                //        //comstr.Parameters.AddWithValue("@C3", SqlDbType.Binary).Value = ImageFileName;

                //        //comstr.ExecuteNonQuery();                        //con.close();
                //        cr.ExecuteNonQueryWithThreeImages(sqlQuery, ImageFileName, ImageFileName1, ImageFileName2);
                //    }
                //    OldMachine = dtr["MachineNo"].ToString();
                //}

                dtr.Close();
                dtr.Dispose();
                return Json(1);
            }
            catch (Exception ex)
            {
                return Json(0);
            }
            finally
            {
            }
        }


    }
}
