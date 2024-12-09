using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using System.IO;
using System.Drawing;
//using Microsoft.Reporting.WinForms;
using Microsoft.Reporting.WebForms;
using System.Drawing.Printing;
using System.Drawing.Imaging;
using System.Text.RegularExpressions;

namespace SimplrSales.Controllers.Inventory
{

    public class VehicleAssignmentController : BusinessRule
    {
        private List<Metafile> pages = new List<Metafile>();
        private int pageIndex = 0;
        private PrintDocument doc = new PrintDocument();
        public static string InvNoWithUserName = "";
        public static string strOrderNo = "";
        public static string _strInvNo = "";
        
        //private ReportViewer ReportViewer_obj = new ReportViewer();
        public ActionResult Index()
        {
            if (Session["UserName"] != null)
            {
                TempData["ScreenName"] = Session["ScreenName"].ToString(); ;

                // FOR POC VEHICLE ASSIGNMENT ORDER REFRESHING PURPOSE ==========================================
                ViewBag.IntervalTime = ConfigurationManager.AppSettings["IntervalTime_POC_VEHICLE_ASSIGNMENT"] != null ? ConfigurationManager.AppSettings["IntervalTime_POC_VEHICLE_ASSIGNMENT"] : "30000";
                // FOR POC VEHICLE ASSIGNMENT ORDER REFRESHING PURPOSE ==========================================

                ViewBag.ScreenName = Session["ScreenName"].ToString();
                ViewBag.Google_APIKey = ConfigurationManager.AppSettings["Google_APIKey"] != null ? ConfigurationManager.AppSettings["Google_APIKey"] : "AIzaSyDI9hx4Xgpd5p5p_H_7Uu0vQTCX4nIiyJk";
                return View();
            }
            else
                return RedirectToAction("Login", "Login", new { sessionexpired = "sessionexpired" });
        }


        string constr = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
        public CommonRule _commonRule = new CommonRule();
        private SqlConnection conn;
        public DataTable dtInvReport = new DataTable();
        public DataTable dtInvReport1 = new DataTable();
        public ActionResult LoadPickingReport(string strPrintPickingInvNo, string sRptName)
        {
            try
            {
                var UserId = Session["UserId"];
                var projectName = Session["ProjectName"].ToString();
                conn = new SqlConnection(constr);
                var query = "Delete from InvReport";
                var result = _commonRule.executerQuery(query);
                string strSql = "";
                string sAgentID = "";
                strSql = "SELECT '' as BinNo, [LineNo],OrdItem.Description, OrderHdr.AgentID, OrdItem.UOM, OrdItem.[LineNo] as Line, OrdItem.ItemNo as ItemNo,Customer.CustNo, Customer.CustName, Customer.Address, Customer.Address2, Customer.Address3,CASE WHEN Customer.City IS NULL THEN '' ELSE Customer.City + ' - ' END + isnull(Customer.PostCode,'') as Address4,Customer.Phone, Customer.ContactPerson, Customer.FaxNo, OrderHdr.Remarks, OrdItem.Remarks as LineRemarks, OrderHdr.ConfirmedBy,OrderHdr.PoNo as DoNo, OrderHdr.OrdNo AS Expr1, OrderHdr.OrdDt as InvDt, OrderHdr.SalesCoord, OrderHdr.PoNo, OrderHdr.AgentId, '' as CustRefNo,OrderHdr.PayTerms, OrdItem.Qty, OrdItem.Price, IsNull(OrdItem.SubAmt,0) as SubAmt , OrderHdr.SubTotal, OrderHdr.GST, OrderHdr.GstAmt,OrderHdr.TotalAmt, Item.Brand as PickingList, Item.AssemblyBOM, '' as LotNo, convert(varchar,GetDate(),112) as ExpiryDate, OrdItem.Qty as LotQty,UOM.PackingSize as Attn, Item.ChineseDesc, 0 as AddQty, '' as AddUOM, Location.Name as DefLocation, Item.DefBin, Customer.ShipName,OrderHdr.ShipAdd, OrderHdr.ShipAdd2, OrderHdr.ShipAdd3, OrderHdr.ShipAdd4, OrderHdr.ShipCity, OrderHdr.ShipPin,ISNULL((select BaseQty From UOM Where UOM.UOM='CS' and UOM.ITemNo=OrdItem.ItemNO),0) as OrdBulkQty,(select BaseQty From UOM Where UOM.UOM=Item.BaseUOM and UOM.ITemNo=OrdItem.ItemNO) as OrdLooseQty,(select ISNULL(Sum(GoodsInvn.Qty),0) from GoodsInvn where GoodsInvn.ItemNo=OrdItem.ItemNo and GoodsInvn.Location=OrdItem.Location Group by ITemNo) as INVQty,'PD' as InvUOM,0 as VarQty,'PD' as VarUOM FROM Customer INNER JOIN OrderHdr ON Customer.CustNo = OrderHdr.CustId INNER JOIN OrdItem ON OrderHdr.OrdNo = OrdItem.OrdNo INNER JOIN Item ON OrdItem.ItemNo = Item.ItemNo INNER JOIN UOM ON OrdItem.ItemNo = UOM.ItemNo and OrdItem.UOM = UOM.UOM inner join Location on Location.Code=OrdItem.Location WHERE OrderHdr.OrdNo In (" + strPrintPickingInvNo + ")";

                if (projectName.ToLower() == "pvm" || projectName.ToLower() == "dms" || projectName.ToLower() == "frostfood" || projectName.ToLower() == "ffb"  || projectName.ToLower() == "ofii" || projectName.ToLower() == "eonmetall")
                { 
                    strSql = " SELECT 	'' as BinNo, 	[LineNo], 	OrdItem.Description,	OrderHdr.AgentID, Item.BaseUOM as UOM,  OrdItem.[LineNo] as Line, OrdItem.ItemNo as ItemNo,	Customer.CustNo, Customer.CustName, 	Customer.Address, 	Customer.Address2, Customer.Address3,CASE WHEN Customer.City IS NULL THEN '' ELSE Customer.City + ' - ' END + isnull(Customer.PostCode,'') as Address4, Customer.Phone, Customer.ContactPerson, Customer.FaxNo, 	OrderHdr.Remarks, OrdItem.Remarks as LineRemarks, OrderHdr.ConfirmedBy, OrderHdr.PoNo as DoNo, 	OrderHdr.OrdNo AS Expr1, OrderHdr.OrdDt as InvDt, OrderHdr.SalesCoord, OrderHdr.PoNo, OrderHdr.AgentId, '' as CustRefNo, OrderHdr.PayTerms, OrdItem.Qty*UOM.BaseQty as Qty, OrdItem.Price,IsNull(OrdItem.SubAmt,0) as SubAmt, OrderHdr.SubTotal, 	OrderHdr.GST, ISNULL(OrderHdr.GstAmt,0) as GstAmt, OrderHdr.TotalAmt, 	Item.Brand as PickingList, Item.AssemblyBOM, 	'' as LotNo,	 convert(varchar,GetDate(),112) as ExpiryDate,  OrdItem.Qty as LotQty, UOM.PackingSize as Attn,  Item.ChineseDesc, 0 as AddQty, 	  '' as AddUOM, 	  Location.Name as DefLocation,   Item.DefBin,  Customer.ShipName,  OrderHdr.ShipAdd,  OrderHdr.ShipAdd2,OrderHdr.ShipAdd3, OrderHdr.ShipAdd4, OrderHdr.ShipCity, OrderHdr.ShipPin, OrdItem.Qty*UOM.BaseQty as OrdQty,	 Item.BaseUOM as OrdUOM, Isnull(goodsinvn.Qty,0) as INVQty,	 goodsinvn.Uom as InvUOM,		(IsNull(goodsinvn.Qty,0)-IsNull(OrdItem.Qty*UOM.BaseQty,0)) as VarQty,	Item.BaseUOM as VarUOM, 0 OrdBulkQty,0  OrdLooseQty FROM Customer INNER JOIN OrderHdr ON Customer.CustNo = OrderHdr.CustId INNER JOIN OrdItem ON OrderHdr.OrdNo = OrdItem.OrdNo INNER JOIN Item ON OrdItem.ItemNo = Item.ItemNo INNER JOIN UOM ON OrdItem.ItemNo = UOM.ItemNo and OrdItem.UOM = UOM.UOM inner join Location on OrdItem.Location = Location.Code left join  goodsinvn on OrdItem.ItemNo= goodsinvn.ItemNo and goodsinvn.Location=OrdItem.Location WHERE OrderHdr.OrdNo In (" + strPrintPickingInvNo + ")";
                }
                else if (projectName.ToLower() == "etika")
                {
                    strSql = " SELECT 	'' as BinNo, 	[LineNo], 	OrdItem.Description,	OrderHdr.AgentID, Item.BaseUOM as UOM,  OrdItem.[LineNo] as Line, OrdItem.ItemNo as ItemNo,	Customer.CustNo, Customer.CustName, 	Customer.Address, 	Customer.Address2, Customer.Address3,CASE WHEN Customer.City IS NULL THEN '' ELSE Customer.City + ' - ' END + isnull(Customer.PostCode,'') as Address4, Customer.Phone, Customer.ContactPerson, Customer.FaxNo, 	OrderHdr.Remarks, OrdItem.Remarks as LineRemarks, OrderHdr.ConfirmedBy, OrderHdr.PoNo as DoNo, 	OrderHdr.OrdNo AS Expr1, OrderHdr.OrdDt as InvDt, OrderHdr.SalesCoord, OrderHdr.PoNo, OrderHdr.AgentId, '' as CustRefNo, OrderHdr.PayTerms, OrdItem.Qty*UOM.BaseQty as Qty, OrdItem.Price,IsNull(OrdItem.SubAmt,0) as SubAmt, OrderHdr.SubTotal, 	OrderHdr.GST, OrderHdr.GstAmt, OrderHdr.TotalAmt, 	Item.Brand as PickingList, Item.AssemblyBOM, 	'' as LotNo,	 convert(varchar,GetDate(),112) as ExpiryDate,  OrdItem.Qty as LotQty, UOM.PackingSize as Attn,  Item.ChineseDesc, 0 as AddQty, 	  '' as AddUOM, 	  Location.Name as DefLocation,   Item.DefBin,  Customer.ShipName,  OrderHdr.ShipAdd,  OrderHdr.ShipAdd2,OrderHdr.ShipAdd3, OrderHdr.ShipAdd4, OrderHdr.ShipCity, OrderHdr.ShipPin, OrdItem.Qty*UOM.BaseQty as OrdQty,	 Item.BaseUOM as OrdUOM,goodsinvn.Qty as INVQty,	 goodsinvn.Uom as InvUOM,		(IsNull(goodsinvn.Qty,0)-IsNull(OrdItem.Qty*UOM.BaseQty,0)) as VarQty,	Item.BaseUOM as VarUOM, 0 OrdBulkQty,0  OrdLooseQty FROM Customer INNER JOIN OrderHdr ON Customer.CustNo = OrderHdr.CustId INNER JOIN OrdItem ON OrderHdr.OrdNo = OrdItem.OrdNo INNER JOIN Item ON OrdItem.ItemNo = Item.ItemNo INNER JOIN UOM ON OrdItem.ItemNo = UOM.ItemNo and OrdItem.UOM = UOM.UOM inner join Location on OrdItem.Location = Location.Code inner join  goodsinvn on OrdItem.ItemNo= goodsinvn.ItemNo and goodsinvn.Location=OrdItem.Location WHERE OrderHdr.OrdNo In (" + strPrintPickingInvNo + ")";
                }

                if (projectName.ToLower() == "jsu")
                {

                    if (UserId.ToString().ToUpper() == "SYCUSER")
                    {

                        strSql = "SELECT distinct SAA.Name as UserName,'' as BinNo, [LineNo],OrdItem.Description, OrderHdr.AgentID, OrdItem.UOM, OrdItem.[LineNo] as Line, OrdItem.ItemNo as ItemNo,  Customer.CustNo, Customer.CustName, Customer.Address, Customer.Address2, Customer.Address3,  CASE WHEN Customer.City IS NULL THEN '' ELSE Customer.City + ' - ' END + isnull(Customer.PostCode,'') as Address4 ,";
                        strSql += " b.BarangayName as Province,  Customer.Phone, Customer.ContactPerson, Customer.FaxNo, OrderHdr.Remarks, OrdItem.Remarks as LineRemarks, OrderHdr.ConfirmedBy,   OrderHdr.PoNo as DoNo, OrderHdr.OrdNo AS Expr1, OrderHdr.OrdDt as InvDt, OrderHdr.SalesCoord, OrderHdr.PoNo,  OrderHdr.AgentId, '' as CustRefNo, OrderHdr.PayTerms, (OrdItem.Qty / (SELECT BaseQty FROM UOM WHERE UOM.UOM = 'PK' AND UOM.ItemNo = OrdItem.ItemNo)) AS Qty, OrdItem.Price, IsNull(OrdItem.SubAmt,0) as SubAmt,   OrderHdr.SubTotal, OrderHdr.GST, OrderHdr.GstAmt, OrderHdr.TotalAmt, Item.Brand as PickingList,  Item.AssemblyBOM, '' as LotNo, convert(varchar, GetDate(),112) as ExpiryDate, OrdItem.Qty as LotQty, UOM.PackingSize as Attn, Item.ChineseDesc, 0 as AddQty,   '' as AddUOM,";
                        strSql += " Location.Name as DefLocation, Item.DefBin, Customer.ShipName, OrderHdr.ShipAdd, OrderHdr.ShipAdd2, OrderHdr.ShipAdd3,   OrderHdr.ShipAdd4, OrderHdr.ShipCity, OrderHdr.ShipPin,Location.Address as DistributorAddress,location.Address2 as DistributorAddress2,location.Address3 as DistributorAddress3,Location.Address4 as DistributorAddress4,	 (select BaseQty From UOM Where UOM.UOM='CS' and UOM.ITemNo= OrdItem.ItemNO) as OrdBulkQty,    (select BaseQty From UOM Where UOM.UOM='PK' and UOM.ITemNo= OrdItem.ItemNO) as OrdLooseQty,   (select Sum(ISNULL(GoodsInvn.Qty,0)) from GoodsInvn  ";
                        strSql += " where GoodsInvn.ItemNo=OrdItem.ItemNo and GoodsInvn.Location= OrdItem.Location) as INVQty,'PD' as InvUOM,0 as VarQty, 'PD' as VarUOM  FROM Customer     INNER JOIN OrderHdr ON Customer.CustNo = OrderHdr.CustId     INNER JOIN OrdItem ON OrderHdr.OrdNo = OrdItem.OrdNo     INNER JOIN Item ON OrdItem.ItemNo = Item.ItemNo     INNER JOIN UOM ON OrdItem.ItemNo = UOM.ItemNo and OrdItem.UOM = UOM.UOM     inner join salesagent SA on customer.salesagent = SA.nodetreeValue  Inner Join salesagent SAA on SAA.Code=OrderHdr.agentid   inner join distributor DI on DI.distributorId = SA.distributorId     Inner Join NodeTree ND On DI.distributorId = ND.distributorId     inner join Location on Location.Code= OrdItem.Location  inner join barangay B on Customer.Address3 = B.Code WHERE OrderHdr.OrdNo In (" + strPrintPickingInvNo + ")";
                    }
                    else
                    {
                        strSql = "SELECT distinct Location.ChineseName as UserName,'' as BinNo, [LineNo],OrdItem.Description, OrderHdr.AgentID, OrdItem.UOM, OrdItem.[LineNo] as Line, OrdItem.ItemNo as ItemNo,  Customer.CustNo, Customer.CustName, Customer.Address, Customer.Address2, Customer.Address3,  CASE WHEN Customer.City IS NULL THEN '' ELSE Customer.City + ' - ' END + isnull(Customer.PostCode,'') as Address4 ,";
                        strSql += " b.BarangayName as Province,  Customer.Phone, Customer.ContactPerson, Customer.FaxNo, OrderHdr.Remarks, OrdItem.Remarks as LineRemarks, OrderHdr.ConfirmedBy,   OrderHdr.PoNo as DoNo, OrderHdr.OrdNo AS Expr1, OrderHdr.OrdDt as InvDt, OrderHdr.SalesCoord, OrderHdr.PoNo,  OrderHdr.AgentId, '' as CustRefNo, OrderHdr.PayTerms, OrdItem.Qty, OrdItem.Price, IsNull(OrdItem.SubAmt,0) as SubAmt,   OrderHdr.SubTotal, OrderHdr.GST, OrderHdr.GstAmt, OrderHdr.TotalAmt, Item.Brand as PickingList,  Item.AssemblyBOM, '' as LotNo,                          convert(varchar, GetDate(),112) as ExpiryDate, OrdItem.Qty as LotQty, UOM.PackingSize as Attn, Item.ChineseDesc, 0 as AddQty,   '' as AddUOM,";
                        strSql += " Location.Name as DefLocation, Item.DefBin, Customer.ShipName, OrderHdr.ShipAdd, OrderHdr.ShipAdd2, OrderHdr.ShipAdd3,   OrderHdr.ShipAdd4, OrderHdr.ShipCity, OrderHdr.ShipPin,Location.Address as DistributorAddress,location.Address2 as DistributorAddress2,location.Address3 as DistributorAddress3,Location.Address4 as DistributorAddress4,	 (select BaseQty From UOM Where UOM.UOM='CS' and UOM.ITemNo= OrdItem.ItemNO) as OrdBulkQty,    (select BaseQty From UOM Where UOM.UOM='PK' and UOM.ITemNo= OrdItem.ItemNO) as OrdLooseQty,   (select Sum(ISNULL(GoodsInvn.Qty,0)) from GoodsInvn  ";
                        strSql += " where GoodsInvn.ItemNo=OrdItem.ItemNo and GoodsInvn.Location= OrdItem.Location) as INVQty,'PD' as InvUOM,0 as VarQty, 'PD' as VarUOM  FROM Customer     INNER JOIN OrderHdr ON Customer.CustNo = OrderHdr.CustId     INNER JOIN OrdItem ON OrderHdr.OrdNo = OrdItem.OrdNo     INNER JOIN Item ON OrdItem.ItemNo = Item.ItemNo     INNER JOIN UOM ON OrdItem.ItemNo = UOM.ItemNo and OrdItem.UOM = UOM.UOM     inner join salesagent SA on customer.salesagent = SA.nodetreeValue     inner join distributor DI on DI.distributorId = SA.distributorId     Inner Join NodeTree ND On DI.distributorId = ND.distributorId     inner join Location on Location.Code= OrdItem.Location  inner join barangay B on Customer.Address3 = B.Code WHERE OrderHdr.OrdNo In (" + strPrintPickingInvNo + ")";

                   }
                    //strSql = "SELECT " + userName + " as UserName, '' as BinNo, [LineNo],OrdItem.Description, OrderHdr.AgentID, OrdItem.UOM, OrdItem.[LineNo] as Line, OrdItem.ItemNo as ItemNo, Customer.CustNo, Customer.CustName, Customer.Address, Customer.Address2, Customer.Address3, CASE WHEN Customer.City IS NULL THEN '' ELSE Customer.City + ' - ' END + isnull(Customer.PostCode,'') as Address4, Customer.Phone, Customer.ContactPerson, Customer.FaxNo, OrderHdr.Remarks, OrdItem.Remarks as LineRemarks, OrderHdr.ConfirmedBy, OrderHdr.PoNo as DoNo, OrderHdr.OrdNo AS Expr1, OrderHdr.OrdDt as InvDt, OrderHdr.SalesCoord, OrderHdr.PoNo, OrderHdr.AgentId, '' as CustRefNo, OrderHdr.PayTerms, OrdItem.Qty, OrdItem.Price, IsNull(OrdItem.SubAmt,0) as SubAmt, OrderHdr.SubTotal, OrderHdr.GST, OrderHdr.GstAmt, OrderHdr.TotalAmt, Item.Brand as PickingList,  Item.AssemblyBOM, '' as LotNo, convert(varchar,GetDate(),112) as ExpiryDate, OrdItem.Qty as LotQty, UOM.PackingSize as Attn, Item.ChineseDesc, 0 as AddQty, '' as AddUOM, Location.Name as DefLocation, Item.DefBin, Customer.ShipName, OrderHdr.ShipAdd, OrderHdr.ShipAdd2, OrderHdr.ShipAdd3, OrderHdr.ShipAdd4, OrderHdr.ShipCity, OrderHdr.ShipPin,(select BaseQty From UOM Where UOM.UOM='CS' and UOM.ITemNo=OrdItem.ItemNO) as OrdBulkQty, (select BaseQty From UOM Where UOM.UOM='PK' and UOM.ITemNo=OrdItem.ItemNO) as OrdLooseQty,(select Sum(ISNULL(GoodsInvn.Qty,0)) from GoodsInvn where GoodsInvn.ItemNo=OrdItem.ItemNo and GoodsInvn.Location= OrdItem.Location) as INVQty,'PD' as InvUOM,0 as VarQty, 'PD' as VarUOM FROM Customer INNER JOIN OrderHdr ON Customer.CustNo = OrderHdr.CustId INNER JOIN OrdItem ON OrderHdr.OrdNo = OrdItem.OrdNo INNER JOIN Item ON OrdItem.ItemNo = Item.ItemNo INNER JOIN UOM ON OrdItem.ItemNo = UOM.ItemNo and OrdItem.UOM = UOM.UOM inner join Location on Location.Code= OrdItem.Location WHERE OrderHdr.OrdNo In (" + strPrintPickingInvNo + ") ";
                }
                else if (projectName.ToLower() == "eastocean")
                {
                    strSql = " SELECT '' as BinNo, [LineNo],OrdItem.Description, OrderHdr.AgentID, OrdItem.UOM, OrdItem.[LineNo] as Line, OrdItem.ItemNo as ItemNo,Customer.CustNo, Customer.CustName, Customer.Address, Customer.Address2, Customer.Address3,CASE WHEN Customer.City IS NULL THEN '' ELSE Customer.City + ' - ' END + isnull(Customer.PostCode,'') as Address4,Customer.Phone, Customer.ContactPerson, Customer.FaxNo, OrderHdr.Remarks, OrdItem.Remarks as LineRemarks, OrderHdr.ConfirmedBy,OrderHdr.PoNo as DoNo, OrderHdr.OrdNo AS Expr1, OrderHdr.OrdDt as InvDt, OrderHdr.SalesCoord, OrderHdr.PoNo, OrderHdr.AgentId, '' as CustRefNo,OrderHdr.PayTerms, OrdItem.Qty, IsNull(OrdItem.Price,0) as Price, IsNull(OrdItem.SubAmt,0) as SubAmt, IsNull(OrderHdr.SubTotal,0) as SubTotal, IsNull(OrderHdr.GST,0) as GST, ISNULL(OrderHdr.GstAmt,0) as GstAmt,IsNull(OrderHdr.TotalAmt,0) as TotalAmt, Item.Brand as PickingList, Item.AssemblyBOM, '' as LotNo, convert(varchar, GetDate(),112) as ExpiryDate,OrdItem.Qty as LotQty,UOM.PackingSize as Attn, Item.ChineseDesc, 0 as AddQty, '' as AddUOM, Location.Name as DefLocation, Item.DefBin, Customer.ShipName,OrderHdr.ShipAdd, OrderHdr.ShipAdd2, OrderHdr.ShipAdd3, OrderHdr.ShipAdd4, OrderHdr.ShipCity, OrderHdr.ShipPin, ISNULL((select top 1 BaseQty From UOM Where UOM.ITemNo = OrdItem.ItemNO order by BaseQty Desc),0) as OrdBulkQty, (select BaseQty From UOM Where UOM.UOM = Item.BaseUOM and UOM.ITemNo = OrdItem.ItemNO) as OrdLooseQty,(select ISNULL(Sum(GoodsInvn.Qty), 0) from GoodsInvn where GoodsInvn.ItemNo = OrdItem.ItemNo and GoodsInvn.Location = OrdItem.Location Group by ITemNo ) as INVQty,Item.BaseUOM as InvUOM,0 as VarQty,Item.BaseUOM as VarUOM FROM Customer INNER JOIN OrderHdr ON Customer.CustNo = OrderHdr.CustId INNER JOIN OrdItem ON OrderHdr.OrdNo = OrdItem.OrdNo INNER JOIN Item ON OrdItem.ItemNo = Item.ItemNo INNER JOIN UOM ON OrdItem.ItemNo = UOM.ItemNo and OrdItem.UOM = UOM.UOM Inner join Location on Location.Code = OrdItem.Location WHERE OrderHdr.OrdNo In (" + strPrintPickingInvNo + ")";
                }



                try
                {
                    VehicleAssignmentLog(strSql);
                }
                catch (Exception)
                {

                   // throw;
                }
                // string sPUOM = "";
                try
                {
                    conn.Open();
                    SqlCommand cmd = new SqlCommand(strSql, conn);

                    using (SqlDataReader rs = cmd.ExecuteReader())
                    {
                        var qry = string.Empty;
                        while ((rs.Read() == true))
                        // if (rs.Read())
                        {
                            sAgentID = ((string.IsNullOrEmpty(rs["AgentID"].ToString())) ? "" : rs["AgentID"].ToString());
                            if (projectName.ToLower() == "jsu")
                            {
                                qry = "Insert into InvReport(UserName,DistributorAddress,DistributorAddress2,DistributorAddress3,DistributorAddress4,InvNo, InvDate, CustNo, AgentID, CustName, Add1, Add2, Add3, Add4,Province, Phone, Fax, Remarks, DoNo, RefNo, PONo, Terms, Line, ItemNo, Description, Qty, price, SubAmt, SubTotal, GSTAmt, TotalAmt, BaseUOM, ConfirmedBy, SalesCoOrd, PickingList, Attn, ChineseDesc, OthersQty, Location, LineRemarks, ShipName, ShipAdd1, ShipAdd2, ShipAdd3, ShipAdd4, ShipCity, ShipPost, PrintedBy,OrdBulkQty,OrdLooseQty,InvUOM,InvQty,VarUOM,VarQty) values (" +
                                              "'" + rs["UserName"].ToString() + "'," +
                                              "'" + rs["DistributorAddress"].ToString() + "'," +
                                              "'" + rs["DistributorAddress2"].ToString() + "'," +
                                              "'" + rs["DistributorAddress3"].ToString() + "'," +
                                              "'" + rs["DistributorAddress4"].ToString() + "'," +
                                              "'" + rs["Expr1"].ToString() + "'," +
                                              "'" + Convert.ToDateTime(rs["InvDt"]).ToString("yyyy/MM/dd") + "'," +
                                              "'" + rs["CustNo"].ToString() + "'," +
                                              "'" + rs["AgentID"].ToString() + "'," +
                                              "'" + rs["CustName"].ToString().Replace("'", "''") + "'," +
                                              "'" + rs["Address"].ToString() + "'," +
                                              "'" + rs["Address2"].ToString() + "'," +
                                              "'" + rs["Address3"].ToString() + "'," +
                                              "'" + rs["Address4"].ToString() + "'," +
                                              "'" + rs["Province"].ToString() + "'," +
                                              "'" + rs["Phone"].ToString() + "'," +
                                              "'" + rs["FaxNo"].ToString() + "'," +
                                              "'" + rs["Remarks"].ToString().Replace("'", "''") + "'," +
                                              "'" + rs["DONo"].ToString() + "'," +
                                              "'" + rs["CustRefNo"].ToString() + "'," +
                                              "'" + rs["PONo"].ToString() + "'," +
                                              "'" + rs["PayTerms"].ToString() + "'," +
                                              "'" + rs["Line"].ToString() + "'," +
                                              "'" + rs["ItemNo"].ToString() + "'," +
                                              "'" + rs["Description"].ToString().Replace("'", "''") + "'," +
                                              "'" + rs["Qty"].ToString() + "'," +
                                              "'" + Convert.ToDecimal(rs["Price"]).ToString("0.000") + "'," +
                                              "'" + Convert.ToDecimal(rs["SubAmt"]).ToString("0.00") + "'," +
                                              "'" + Convert.ToDecimal(rs["SubTotal"]).ToString("0.00") + "'," +
                                              "'" + Convert.ToDecimal(rs["GstAmt"]).ToString("0.00") + "'," +
                                              "'" + Convert.ToDecimal(rs["TotalAmt"]).ToString("0.00") + "'," +
                                              "'" + rs["UOM"].ToString() + "'," +
                                              "'" + rs["ConfirmedBy"].ToString() + "'," +
                                              "'" + rs["SalesCoOrd"].ToString() + "'," +
                                              "'" + rs["PickingList"].ToString() + "'," +
                                              "'" + rs["Attn"].ToString() + "'," +
                                              "'" + (string.IsNullOrEmpty(rs["ChineseDesc"].ToString()) ? "" : rs["ChineseDesc"].ToString().Replace("'", "''")) + "'," +
                                              "'" + ((string.IsNullOrEmpty(rs["AddQty"].ToString()) ? "0" : rs["AddQty"]) + "'," +
                                              "'" + rs["DefLocation"].ToString() + "'," +
                                              "'" + (string.IsNullOrEmpty(rs["LineRemarks"].ToString()) ? "" : rs["LineRemarks"]) + "'," +
                                              "'" + (string.IsNullOrEmpty(rs["ShipName"].ToString()) ? "" : rs["ShipName"]) + "'," +
                                              "'" + (string.IsNullOrEmpty(rs["ShipAdd"].ToString()) ? "" : rs["ShipAdd"]) + "'," +
                                              "'" + (string.IsNullOrEmpty(rs["ShipAdd2"].ToString()) ? "" : rs["ShipAdd2"]) + "'," +
                                              "'" + (string.IsNullOrEmpty(rs["ShipAdd3"].ToString()) ? "" : rs["ShipAdd3"]) + "'," +
                                              "'" + (string.IsNullOrEmpty(rs["ShipAdd4"].ToString()) ? "" : rs["ShipAdd4"]) + "'," +
                                              "'" + (string.IsNullOrEmpty(rs["ShipCity"].ToString()) ? "" : rs["ShipCity"]) + "'," +
                                              "'" + (string.IsNullOrEmpty(rs["ShipPin"].ToString()) ? "" : rs["ShipPin"]) + "'," +
                                              "'" + sAgentID.ToString() + "'," +
                                              "'" + (string.IsNullOrEmpty(rs["OrdBulkQty"].ToString()) ? "0" : rs["OrdBulkQty"]) + "'," +
                                              "'" + (string.IsNullOrEmpty(rs["OrdLooseQty"].ToString()) ? "0" : rs["OrdLooseQty"]) + "'," +
                                              "'" + (string.IsNullOrEmpty(rs["InvUOM"].ToString()) ? "PD" : rs["InvUOM"]) + "'," +
                                              "'" + (string.IsNullOrEmpty(rs["InvQty"].ToString()) ? "0" : rs["InvQty"]) + "'," +
                                              "'" + (string.IsNullOrEmpty(rs["VarUOM"].ToString()) ? "PD" : rs["VarUOM"]) + "'," +
                                              "'" + (string.IsNullOrEmpty(rs["VarQty"].ToString()) ? "0" : rs["VarQty"])) + "')";
                            }
                            else
                            {
                                string qInvNo = rs["Expr1"].ToString();
                                string qInvDate = Convert.ToDateTime(rs["InvDt"]).ToString("yyyy/MM/dd");
                                string qCustNo = rs["CustNo"].ToString();
                                string qAgentID = rs["AgentID"].ToString();
                                string qCustName = rs["CustName"].ToString().Replace("'", "''");
                                string qAdd1 = rs["Address"].ToString();
                                string qAdd2 = rs["Address2"].ToString();
                                string qAdd3 = rs["Address3"].ToString();
                                string qAdd4 = rs["Address4"].ToString();
                                string qPhone = rs["Phone"].ToString();
                                string qFax = rs["FaxNo"].ToString();
                                string qRemarks = rs["Remarks"].ToString().Replace("'", "''");
                                string qDoNo = rs["DONo"].ToString();
                                string qRefNo = rs["CustRefNo"].ToString();
                                string qPONo = rs["PONo"].ToString();
                                string qTerms = rs["PayTerms"].ToString();
                                string qLine = rs["Line"].ToString();
                                string qItemNo = rs["ItemNo"].ToString();
                                string qDescription = rs["Description"].ToString().Replace("'", "''");
                                string qQty = rs["Qty"].ToString();
                                string qprice = Convert.ToDecimal(rs["Price"]).ToString("0.000");
                                string qSubAmt = Convert.ToDecimal(rs["SubAmt"]).ToString("0.00");
                                string qSubTotal = Convert.ToDecimal(rs["SubTotal"]).ToString("0.00");
                                string qGSTAmt = Convert.ToDecimal(rs["GstAmt"]).ToString("0.00");
                                string qTotalAmt = Convert.ToDecimal(rs["TotalAmt"]).ToString("0.00");
                                string qBaseUOM = rs["UOM"].ToString();
                                string qConfirmedBy = rs["ConfirmedBy"].ToString();
                                string qSalesCoOrd = rs["SalesCoOrd"].ToString();
                                string qPickingList = rs["PickingList"].ToString();
                                string qAttn = rs["Attn"].ToString();
                                string qChineseDesc = (string.IsNullOrEmpty(rs["ChineseDesc"].ToString()) ? "" : rs["ChineseDesc"].ToString().Replace("'", "''"));
                                string qOthersQty = (string.IsNullOrEmpty(rs["AddQty"].ToString()) ? "0" : rs["AddQty"].ToString());
                                string qLocation = rs["DefLocation"].ToString();
                                string qLineRemarks = (string.IsNullOrEmpty(rs["LineRemarks"].ToString()) ? "" : rs["LineRemarks"].ToString());
                                string qShipName = (string.IsNullOrEmpty(rs["ShipName"].ToString()) ? "" : rs["ShipName"].ToString());
                                string qShipAdd1 = (string.IsNullOrEmpty(rs["ShipAdd"].ToString()) ? "" : rs["ShipAdd"].ToString());
                                string qShipAdd2 = (string.IsNullOrEmpty(rs["ShipAdd2"].ToString()) ? "" : rs["ShipAdd2"].ToString());
                                string qShipAdd3 = (string.IsNullOrEmpty(rs["ShipAdd3"].ToString()) ? "" : rs["ShipAdd3"].ToString());
                                string qShipAdd4 = (string.IsNullOrEmpty(rs["ShipAdd4"].ToString()) ? "" : rs["ShipAdd4"].ToString());
                                string qShipCity = (string.IsNullOrEmpty(rs["ShipCity"].ToString()) ? "" : rs["ShipCity"].ToString());
                                string qShipPost = (string.IsNullOrEmpty(rs["ShipPin"].ToString()) ? "" : rs["ShipPin"].ToString());
                                string qPrintedBy = sAgentID.ToString();
                                string qOrdBulkQty = (string.IsNullOrEmpty(rs["OrdBulkQty"].ToString()) ? "0" : rs["OrdBulkQty"].ToString());
                                string qOrdLooseQty = (string.IsNullOrEmpty(rs["OrdLooseQty"].ToString()) ? "0" : rs["OrdLooseQty"].ToString());
                                string qInvUOM = (string.IsNullOrEmpty(rs["InvUOM"].ToString()) ? "PD" : rs["InvUOM"].ToString());
                                string qInvQty = (string.IsNullOrEmpty(rs["InvQty"].ToString()) ? "0" : rs["InvQty"].ToString());
                                string qVarUOM = (string.IsNullOrEmpty(rs["VarUOM"].ToString()) ? "PD" : rs["VarUOM"].ToString());
                                string qVarQty = (string.IsNullOrEmpty(rs["VarQty"].ToString()) ? "0" : rs["VarQty"].ToString());

                                qry = "Insert into InvReport(InvNo, InvDate, CustNo, AgentID, CustName, Add1, Add2, Add3, Add4, Phone, Fax, Remarks, DoNo, RefNo, PONo, Terms, Line, ItemNo, Description, Qty, price, SubAmt, SubTotal, GSTAmt, TotalAmt, BaseUOM, ConfirmedBy, SalesCoOrd, PickingList, Attn, ChineseDesc, OthersQty, Location, LineRemarks, ShipName, ShipAdd1, ShipAdd2, ShipAdd3, ShipAdd4, ShipCity, ShipPost, PrintedBy,OrdBulkQty,OrdLooseQty,InvUOM,InvQty,VarUOM,VarQty) values ('" + qInvNo + "','" + qInvDate + "','" + qCustNo + "','" + qAgentID + "','" + qCustName + "','" + qAdd1 + "','" + qAdd2 + "','" + qAdd3 + "','" + qAdd4 + "','" + qPhone + "','" + qFax + "','" + qRemarks + "','" + qDoNo + "','" + qRefNo + "','" + qPONo + "','" + qTerms + "','" + qLine + "','" + qItemNo + "','" + qDescription + "','" + qQty + "','" + qprice + "','" + qSubAmt + "','" + qSubTotal + "','" + qGSTAmt + "','" + qTotalAmt + "','" + qBaseUOM + "','" + qConfirmedBy + "','" + qSalesCoOrd + "','" + qPickingList + "','" + qAttn + "','" + qChineseDesc + "','" + qOthersQty + "','" + qLocation + "','" + qLineRemarks + "','" + qShipName + "','" + qShipAdd1 + "','" + qShipAdd2 + "','" + qShipAdd3 + "','" + qShipAdd4 + "','" + qShipCity + "','" + qShipPost + "','" + qPrintedBy + "','" + qOrdBulkQty + "','" + qOrdLooseQty + "','" + qInvUOM + "','" + qInvQty + "','" + qVarUOM + "','" + qVarQty + "')";
                            }
                            try
                            {
                                VehicleAssignmentLog(qry);
                            }
                            catch (Exception)
                            {

                                // throw;
                            }
                            _commonRule.executerQuery(qry);

                        }

                    }
                    conn.Close();
                }
                catch (Exception)
                {

                    //throw;
                }

                string strSQL;

                try
                {
                    if (projectName.ToLower() != "pvm" && projectName.ToLower() != "etika" && projectName.ToLower() != "frostfood" && projectName.ToLower() != "ffb" && projectName.ToLower() != "ofii" && projectName.ToLower() != "eonmetall")
                    {
                        strSQL = "update InvReport set OrdBulkUOm = Item.BulkUOM, OrdLooseUOM = Item.LooseUOM, InvBulkUOM = Item.BulkUOM, InvLooseUOM = Item.LooseUOM, VarBulkUOM = Item.BulkUOM, VarLooseUOM = Item.LooseUOM from Item where Item.ITemNo = InvReport.ItemNo";

                        VehicleAssignmentLog(strSQL);
                        result = _commonRule.executerQuery(strSQL);

                        strSQL = "update InvReport Set OrdBulkQty = Round(Cast(Qty as int) / Cast(UCS.BaseQty as Int), 0), OrdLooseQty = round(Cast(Qty as int) % Cast(UCS.BaseQty as Int) / UPK.BaseQty, 0) from UOM UCS,UOM UPK Where UCS.ItemNO = InvReport.ItemNO and InvReport.InvBulKUOM = UCS.UOM and UPK.ItemNo = InvReport.ItemNo and UPK.UOM = InvReport.InvLooseUOM";
                        VehicleAssignmentLog(strSQL);
                        result = _commonRule.executerQuery(strSQL);

                        strSQL = "update InvReport Set InvBulkQty = Round(Cast(InvQty as int) / Cast(UCS.BaseQty as Int) , 0), InvLooseQty = round(Cast(InvQty as int) % Cast(UCS.BaseQty as Int) / UPK.BaseQty, 0) from UOM UCS,UOM UPK Where UCS.ItemNO = InvReport.ItemNO and InvReport.InvBulKUOM = UCS.UOM and UPK.ItemNo = InvReport.ItemNo and UPK.UOM = InvReport.InvLooseUOM";
                        VehicleAssignmentLog(strSQL);
                        result = _commonRule.executerQuery(strSQL);

                        strSQL = "update InvReport set VarQty = Case when Qty> InvQty then Abs(Qty - InvQty)Else 0 End";
                        VehicleAssignmentLog(strSQL);
                        result = _commonRule.executerQuery(strSQL);

                        strSQL = "update InvReport Set VarBulkQty = Round(Cast(VarQty as int) / Cast(UCS.BaseQty as Int), 0), VarLooseQty = round(Cast(VarQty as int) % Cast(UCS.BaseQty as Int) / UPK.BaseQty, 0) from UOM UCS, UOM UPK Where UCS.ItemNO = InvReport.ItemNO and InvReport.InvBulKUOM = UCS.UOM and UPK.ItemNo = InvReport.ItemNo and UPK.UOM = InvReport.InvLooseUOM";
                        VehicleAssignmentLog(strSQL);
                        result = _commonRule.executerQuery(strSQL);

                    }
                }
                catch (Exception)
                {

                   // throw;
                }
                try
                {
                    if (projectName.ToLower() == "dms")
                    {
                        strSQL = "update InvReport set BaseUOM = OrdItem.UOM, InvUOM = OrdItem.UOM, VarUOM = OrdItem.UOM, Qty = InvReport.Qty / cast(UOM.BaseQty as float), InvQty = floor(InvReport.InvQty / cast(UOM.BaseQty as float)), VarQty = InvReport.VarQty / cast(UOM.BaseQty as float) from Orditem, UOM where orditem.ordno = InvReport.InvNo and UOM.ItemNo = OrdItem.ItemNo and UOM.UOM = OrdItem.UOM and InvReport.ItemNo=OrdItem.ItemNo ";
                        VehicleAssignmentLog(strSQL);
                        result = _commonRule.executerQuery(strSQL);
                    }
                }
                catch (Exception)
                {

                //    throw;
                }
              //  if(projectName.ToLower() == "ffb")
                //    return RedirectToAction("ReportView1", "Reports", new { InitReport = "select 1 as A", ReportName = "Select 'PickingListRep' as ReportName ", LoadReport = "select InvNo,InvDate,CustNo,AgentID,CustName,Add1,Add2,Add3,Add4,      ItemNo   ,  Description  ,SUM(Qty) Qty      , BaseUOM  , Location     ,        InvUOM  ,  InvQty ,   VarUOM     ,Case when (InvQty-sum(Qty))>= 0 then Convert(varchar,InvQty-sum(Qty)) else ' ' end VarQty from invreport GROUP BY InvNo,InvDate,CustNo,AgentID,CustName,Add1,Add2,Add3,Add4,      ItemNo   ,  Description  ,BaseUOM  , Location     ,        InvUOM  ,  InvQty ,   VarUOM" });
                 if (projectName.ToLower() == "pvm" || projectName.ToLower() == "etika" || projectName.ToLower() == "frostfood" || projectName.ToLower() == "ofii" || projectName.ToLower() == "ffb" || projectName.ToLower() == "eonmetall")
                {
                    return RedirectToAction("ReportView1", "Reports", new { InitReport = "select 1 as A", ReportName = "Select 'PickingListRep' as ReportName ", LoadReport = "select InvNo,InvDate,CustNo,AgentID,CustName,Add1,Add2,Add3,Add4,      ItemNo   ,  Description  ,SUM(Qty) Qty      , BaseUOM  , Location     ,        InvUOM  ,  InvQty ,   VarUOM     ,InvQty-sum(Qty) VarQty from invreport GROUP BY InvNo,InvDate,CustNo,AgentID,CustName,Add1,Add2,Add3,Add4,      ItemNo   ,  Description  ,BaseUOM  , Location     ,        InvUOM  ,  InvQty ,   VarUOM" });
                }
                //else if (projectName.ToLower() == "jsu")
                //{
                //    return RedirectToAction("ReportView1", "Reports", new { InitReport = "select 1 as A", ReportName = "Select 'PickingListRep' as ReportName ", LoadReport = "select * from InvReport  where ordbulkqty >0" });
                //}
                else
                {
                    if (projectName.ToLower() == "jsu" && UserId.ToString().ToUpper() == "SYCUSER")
                   
                        return RedirectToAction("ReportView1", "Reports", new { InitReport = "select 1 as A", ReportName = "Select 'PickingListRep_SYC' as ReportName ", LoadReport = "select * from InvReport" });
                   else if (projectName.ToLower() == "jsu" && (UserId.ToString().ToUpper() == "CPDUSER" || UserId.ToString().ToUpper() == "CPDAUUSER"))
                        return RedirectToAction("ReportView1", "Reports", new { InitReport = "select 1 as A", ReportName = "Select 'PickingListRepCPD' as ReportName ", LoadReport = "EXEC [dbo].[Report_LoadPicking_CPD]" });
                    else
                    return RedirectToAction("ReportView1", "Reports", new { InitReport = "select 1 as A", ReportName = "Select 'PickingListRep' as ReportName ", LoadReport = "select * from InvReport" });
                }
            }
            catch (Exception ex)
            {
                var str = ex.ToString();
                var tmp = str;
                Console.WriteLine(tmp);
               
            }
            return View();
        }

        public ActionResult WMSLoadPickingReport(string strPrintPickingInvNo, string sRptName, string type)
        {
            try
            {
                var UserId = Session["UserId"];
                conn = new SqlConnection(constr);
                var query = "Delete from InvReport";
                var result = _commonRule.executerQuery(query);
                string strSql = "";
                string sAgentID = "";
                var projectName = Session["ProjectName"].ToString();

                if (projectName.ToLower() == "sej")
                    //Given by Jessica 20-09-2024
                    //strSql = "SELECT '' as BinNo,OrdItem.[LineNo],Item.Description,OrderHdr.AgentID,OrdItem.UOM,OrdItem.[LineNo] as Line,OrdItem.ItemNo as ItemNo,Customer.CustNo,Customer.CustName,Customer.Address,Customer.Address2,Customer.Address3,ISNULL(Customer.City, '') + CASE WHEN Customer.City IS NOT NULL THEN ' - ' ELSE '' END + ISNULL(Customer.PostCode, '') as Address4,Customer.Phone,Customer.ContactPerson,Customer.FaxNo,OrderHdr.Remarks,OrdItem.Remarks as LineRemarks,OrderHdr.ConfirmedBy,OrderHdr.PoNo as DoNo,OrderHdr.OrdNo AS Expr1,OrderHdr.OrdDt as InvDt,OrderHdr.SalesCoord,OrderHdr.PoNo,OrderHdr.AgentId,'' as CustRefNo,OrderHdr.PayTerms,OrdItem.Qty,OrdItem.Price,OrdItem.SubAmt,OrderHdr.SubTotal,OrderHdr.GST,OrderHdr.GstAmt,OrderHdr.TotalAmt,Item.Brand as PickingList,Item.AssemblyBOM,'' as LotNo,CONVERT(varchar, GETDATE(), 112) as ExpiryDate,OrdItem.Qty as LotQty,UOM.PackingSize as Attn,Item.ChineseDesc,0 as AddQty,'' as AddUOM,Location.Name as DefLocation,Item.DefBin,Customer.ShipName,OrderHdr.ShipAdd,OrderHdr.ShipAdd2,OrderHdr.ShipAdd3,OrderHdr.ShipAdd4,OrderHdr.ShipCity,OrderHdr.ShipPin,ISNULL((SELECT BaseQty FROM UOM WHERE UOM.UOM = Item.BulkUOM AND UOM.ItemNo = OrdItem.ItemNo), 0) as OrdBulkQty, CASE WHEN OrdItem.UOM<> Item.BaseUOM THEN (SELECT CAST(ISNULL(OrdItem.Qty* UOM.BaseQty, 0) AS Integer) FROM UOM WHERE UOM.ItemNo = OrdItem.ItemNo AND UOM.UOM = OrdItem.UOM) ELSE OrdItem.Qty END as OrdLooseQty,ISNULL((SELECT SUM(GoodsInvn.Qty) FROM GoodsInvn WHERE GoodsInvn.ItemNo = OrdItem.ItemNo AND GoodsInvn.Location = OrdItem.Location GROUP BY Location), 0) as INVQty,Item.BaseUOM as InvUOM,ISNULL((SELECT SUM(GoodsInvn.Qty) FROM GoodsInvn WHERE GoodsInvn.ItemNo = OrdItem.ItemNo AND GoodsInvn.Location = OrdItem.Location GROUP BY Location), 0) - CASE WHEN OrdItem.UOM<> Item.BaseUOM THEN (SELECT CAST(ISNULL(OrdItem.Qty* UOM.BaseQty, 0) AS INTEGER) FROM UOM WHERE UOM.ItemNo = OrdItem.ItemNo AND UOM.UOM = OrdItem.UOM) ELSE OrdItem.Qty END as VarQty,Item.BaseUOM as VarUOM FROM Customer INNER JOIN OrderHdr ON Customer.CustNo = OrderHdr.CustId INNER JOIN OrdItem ON OrderHdr.OrdNo = OrdItem.OrdNo INNER JOIN Item ON OrdItem.ItemNo = Item.ItemNo INNER JOIN UOM ON OrdItem.ItemNo = UOM.ItemNo AND OrdItem.UOM = UOM.UOM INNER JOIN Location ON Location.Code = OrdItem.Location WHERE OrderHdr.OrdNo IN(" + strPrintPickingInvNo + ");";
                    //strSql = "SELECT '' as BinNo, OrdItem.[LineNo],Item.Description,OrderHdr.AgentID,OrdItem.UOM,OrdItem.[LineNo] as Line, OrdItem.ItemNo as ItemNo,Customer.CustNo,Customer.CustName,Customer.Address,Customer.Address2,Customer.Address3,ISNULL(Customer.City, '') + CASE WHEN Customer.City IS NOT NULL THEN ' - ' ELSE '' END + ISNULL(Customer.PostCode, '') as Address4,Customer.Phone,Customer.ContactPerson,Customer.FaxNo,OrderHdr.Remarks,OrdItem.Remarks as LineRemarks,OrderHdr.ConfirmedBy,OrderHdr.PoNo as DoNo,OrderHdr.OrdNo AS Expr1,OrderHdr.OrdDt as InvDt,OrderHdr.SalesCoord,OrderHdr.PoNo,OrderHdr.AgentId,'' as CustRefNo,OrderHdr.PayTerms,OrdItem.Qty,OrdItem.Price,OrdItem.SubAmt,OrderHdr.SubTotal,OrderHdr.GST,OrderHdr.GstAmt,OrderHdr.TotalAmt,Item.Brand as PickingList,Item.AssemblyBOM,'' as LotNo,CONVERT(varchar, GETDATE(), 112) as ExpiryDate,OrdItem.Qty as LotQty,UOM.PackingSize as Attn,Item.ChineseDesc,0 as AddQty,'' as AddUOM,Location.Name as DefLocation,Item.DefBin,Customer.ShipName,OrderHdr.ShipAdd,OrderHdr.ShipAdd2,OrderHdr.ShipAdd3,OrderHdr.ShipAdd4,OrderHdr.ShipCity,OrderHdr.ShipPin,ISNULL((SELECT BaseQty FROM UOM WHERE UOM.UOM = Item.BulkUOM AND UOM.ItemNo = OrdItem.ItemNo), 0) as OrdBulkQty,CASE WHEN OrdItem.UOM <> Item.BaseUOM THEN (SELECT CAST(ISNULL(OrdItem.Qty * UOM.BaseQty, 0) AS Integer) FROM UOM WHERE UOM.ItemNo = OrdItem.ItemNo AND UOM.UOM = OrdItem.UOM) ELSE OrdItem.Qty END as OrdLooseQty,ISNULL((SELECT SUM(expiryitem.Qty) FROM expiryitem WHERE expiryitem.ItemNo = OrdItem.ItemNo AND expiryitem.Location = OrdItem.Location GROUP BY Location), 0) as INVQty,Item.BaseUOM as InvUOM,ISNULL((SELECT SUM(expiryitem.Qty) FROM expiryitem WHERE expiryitem.ItemNo = OrdItem.ItemNo AND expiryitem.Location = OrdItem.Location GROUP BY Location), 0) - CASE WHEN OrdItem.UOM <> Item.BaseUOM THEN (SELECT CAST(ISNULL(OrdItem.Qty * UOM.BaseQty, 0) AS INTEGER) FROM UOM WHERE UOM.ItemNo = OrdItem.ItemNo AND UOM.UOM = OrdItem.UOM) ELSE OrdItem.Qty END as VarQty,Item.BaseUOM as VarUOM FROM Customer INNER JOIN OrderHdr ON Customer.CustNo = OrderHdr.CustId INNER JOIN OrdItem ON OrderHdr.OrdNo = OrdItem.OrdNo INNER JOIN Item ON OrdItem.ItemNo = Item.ItemNo INNER JOIN UOM ON OrdItem.ItemNo = UOM.ItemNo AND OrdItem.UOM = UOM.UOM INNER JOIN Location ON Location.Code = OrdItem.Location WHERE OrderHdr.OrdNo IN (" + strPrintPickingInvNo + "); ";
                    strSql = "exec [PickingList] " + '"' + strPrintPickingInvNo + '"' + ",'" + UserId + "'";
                else
                    strSql = "SELECT '' as BinNo, [LineNo],Item.Description, OrderHdr.AgentID, OrdItem.UOM, OrdItem.[LineNo] as Line, OrdItem.ItemNo as ItemNo,Customer.CustNo, Customer.CustName, Customer.Address, Customer.Address2, Customer.Address3, CASE WHEN Customer.City IS NULL THEN '' ELSE Customer.City + ' - ' END + isnull(Customer.PostCode,'') as Address4, Customer.Phone, Customer.ContactPerson, Customer.FaxNo, OrderHdr.Remarks, OrdItem.Remarks as LineRemarks, OrderHdr.ConfirmedBy, OrderHdr.PoNo as DoNo, OrderHdr.OrdNo AS Expr1, OrderHdr.OrdDt as InvDt, OrderHdr.SalesCoord, OrderHdr.PoNo, OrderHdr.AgentId, '' as CustRefNo,OrderHdr.PayTerms, OrdItem.Qty, OrdItem.Price, OrdItem.SubAmt, OrderHdr.SubTotal, OrderHdr.GST, OrderHdr.GstAmt, OrderHdr.TotalAmt, Item.Brand as PickingList,  Item.AssemblyBOM, '' as LotNo, convert(varchar, GetDate(),112) as ExpiryDate, OrdItem.Qty as LotQty,UOM.PackingSize as Attn, Item.ChineseDesc, 0 as AddQty, '' as AddUOM, Location.Name as DefLocation, Item.DefBin, Customer.ShipName, OrderHdr.ShipAdd, OrderHdr.ShipAdd2, OrderHdr.ShipAdd3, OrderHdr.ShipAdd4, OrderHdr.ShipCity, OrderHdr.ShipPin,ISNULL((select BaseQty From UOM Where UOM.UOM= Item.BulkUOM and UOM.ITemNo= OrdItem.ItemNO),0) as OrdBulkQty,ISNULL((select BaseQty From UOM Where UOM.UOM= Item.LooseUOM and UOM.ITemNo= OrdItem.ItemNO),0) as OrdLooseQty,(select ISNULL(Sum(GoodsInvn.Qty),0) from GoodsInvn where GoodsInvn.ItemNo=OrdItem.ItemNo and GoodsInvn.Location= OrdItem.Location group by Location) as INVQty,Item.BaseUOM as InvUOM,0 as VarQty, Item.BaseUOM as VarUOM FROM Customer INNER JOIN OrderHdr ON Customer.CustNo = OrderHdr.CustId INNER JOIN OrdItem ON OrderHdr.OrdNo = OrdItem.OrdNo INNER JOIN Item ON OrdItem.ItemNo = Item.ItemNo  INNER JOIN UOM ON OrdItem.ItemNo = UOM.ItemNo and OrdItem.UOM = UOM.UOM inner join Location on Location.Code= OrdItem.Location WHERE OrderHdr.OrdNo In (" + strPrintPickingInvNo + ") ";

                //Query given by Sudhakar on 29/08/2024
                
               // strSql = "SELECT '' as BinNo, [LineNo],Item.Description, OrderHdr.AgentID, OrdItem.UOM, OrdItem.[LineNo] as Line, OrdItem.ItemNo as ItemNo,Customer.CustNo, Customer.CustName, Customer.Address, Customer.Address2, Customer.Address3, CASE WHEN Customer.City IS NULL THEN '' ELSE Customer.City + ' - ' END + isnull(Customer.PostCode,'') as Address4, Customer.Phone, Customer.ContactPerson, Customer.FaxNo, OrderHdr.Remarks, OrdItem.Remarks as LineRemarks, OrderHdr.ConfirmedBy, OrderHdr.PoNo as DoNo, OrderHdr.OrdNo AS Expr1, OrderHdr.OrdDt as InvDt, OrderHdr.SalesCoord, OrderHdr.PoNo, OrderHdr.AgentId, '' as CustRefNo,OrderHdr.PayTerms, OrdItem.Qty, OrdItem.Price, OrdItem.SubAmt, OrderHdr.SubTotal, OrderHdr.GST, OrderHdr.GstAmt, OrderHdr.TotalAmt, Item.Brand as PickingList,  Item.AssemblyBOM, '' as LotNo, convert(varchar, GetDate(),112) as ExpiryDate, OrdItem.Qty as LotQty,UOM.PackingSize as Attn, Item.ChineseDesc, 0 as AddQty, '' as AddUOM, Location.Name as DefLocation, Item.DefBin, Customer.ShipName, OrderHdr.ShipAdd, OrderHdr.ShipAdd2, OrderHdr.ShipAdd3, OrderHdr.ShipAdd4, OrderHdr.ShipCity, OrderHdr.ShipPin,ISNULL((select BaseQty From UOM Where UOM.UOM= Item.BulkUOM and UOM.ITemNo= OrdItem.ItemNO),0) as OrdBulkQty,Case when orditem.uom<> item.BaseUOM then (select CAST(ISNULL(OrdItem.Qty* UOM.BaseQty,0) As Integer) from UOM where UOM.ItemNO = OrdItem.ItemNO and UOM.UOM = 'CTN') Else OrdItem.Qty End as OrdLooseQty,(select ISNULL(Sum(GoodsInvn.Qty), 0) from GoodsInvn where GoodsInvn.ItemNo = OrdItem.ItemNo and GoodsInvn.Location = OrdItem.Location group by Location) as INVQty,Item.BaseUOM as InvUOM,(SELECT ISNULL(SUM(GoodsInvn.Qty), 0) FROM GoodsInvn WHERE GoodsInvn.ItemNo = OrdItem.ItemNo AND GoodsInvn.Location = OrdItem.Location GROUP BY Location ) -(CASE WHEN OrdItem.UOM<> Item.BaseUOM THEN(SELECT CAST(ISNULL(OrdItem.Qty* UOM.BaseQty, 0) AS INTEGER) FROM UOM WHERE UOM.ItemNo = OrdItem.ItemNo AND UOM.UOM = 'CTN' ) ELSE OrdItem.Qty END) as VarQty,Item.BaseUOM as VarUOM FROM Customer INNER JOIN OrderHdr ON Customer.CustNo = OrderHdr.CustId INNER JOIN OrdItem ON OrderHdr.OrdNo = OrdItem.OrdNo INNER JOIN Item ON OrdItem.ItemNo = Item.ItemNo  INNER JOIN UOM ON OrdItem.ItemNo = UOM.ItemNo and OrdItem.UOM = UOM.UOM inner join Location on Location.Code = OrdItem.Location WHERE OrderHdr.OrdNo In (" + strPrintPickingInvNo + ") and ((select ISNULL(Sum(GoodsInvn.Qty), 0) from GoodsInvn where GoodsInvn.ItemNo = OrdItem.ItemNo and GoodsInvn.Location = OrdItem.Location group by Location) - OrdItem.Qty)<> 0";

                VehicleAssignmentLog(strSql);

                conn.Open();
                SqlCommand cmd = new SqlCommand(strSql, conn);
                using (SqlDataReader rs = cmd.ExecuteReader())
                {
                    var qry = string.Empty;
                    while ((rs.Read() == true))
                    {
                        sAgentID = ((string.IsNullOrEmpty(rs["AgentID"].ToString())) ? "" : rs["AgentID"].ToString());
                        qry = "Insert into InvReport(InvNo, InvDate, CustNo, AgentID, CustName, Add1, Add2, Add3, Add4, Phone, Fax, Remarks, DoNo, RefNo, PONo, Terms, Line, ItemNo, Description, Qty, price, SubAmt, SubTotal, GSTAmt, TotalAmt, BaseUOM, ConfirmedBy, SalesCoOrd, PickingList, Attn, ChineseDesc, OthersQty, Location, LineRemarks, ShipName, ShipAdd1, ShipAdd2, ShipAdd3, ShipAdd4, ShipCity, ShipPost, PrintedBy,OrdBulkQty,OrdLooseQty,InvUOM,InvQty,VarUOM,VarQty) values (" +
                                           "'" + rs["Expr1"].ToString() + "'," +
                                           "'" + Convert.ToDateTime(rs["InvDt"]).ToString("yyyy/MM/dd") + "'," +
                                           "'" + rs["CustNo"].ToString() + "'," +
                                           "'" + rs["AgentID"].ToString() + "'," +
                                           "'" + rs["CustName"].ToString() + "'," +
                                           "'" + rs["Address"].ToString() + "'," +
                                           "'" + rs["Address2"].ToString() + "'," +
                                           "'" + rs["Address3"].ToString() + "'," +
                                           "'" + rs["Address4"].ToString() + "'," +
                                           "'" + rs["Phone"].ToString() + "'," +
                                           "'" + rs["FaxNo"].ToString() + "'," +
                                           "'" + rs["Remarks"].ToString() + "'," +
                                           "'" + rs["DONo"].ToString() + "'," +
                                           "'" + rs["CustRefNo"].ToString() + "'," +
                                           "'" + rs["PONo"].ToString() + "'," +
                                           "'" + rs["PayTerms"].ToString() + "'," +
                                           "'" + rs["Line"].ToString() + "'," +
                                           "'" + rs["ItemNo"].ToString() + "'," +
                                           "'" + rs["Description"].ToString().Replace("'","''") + "'," +
                                           "'" + rs["Qty"].ToString() + "'," +
                                           "'" + Convert.ToDecimal(rs["Price"]).ToString("0.000") + "'," +
                                           "'" + Convert.ToDecimal(rs["SubAmt"]).ToString("0.00") + "'," +
                                           "'" + Convert.ToDecimal(rs["SubTotal"]).ToString("0.00") + "'," +
                                           "'" + Convert.ToDecimal(rs["GstAmt"]).ToString("0.00") + "'," +
                                           "'" + Convert.ToDecimal(rs["TotalAmt"]).ToString("0.00") + "'," +
                                           "'" + rs["UOM"].ToString() + "'," +
                                           "'" + rs["ConfirmedBy"].ToString() + "'," +
                                           "'" + rs["SalesCoOrd"].ToString() + "'," +
                                           "'" + rs["PickingList"].ToString() + "'," +
                                           "'" + rs["Attn"].ToString() + "'," +
                                           "'" + (string.IsNullOrEmpty(rs["ChineseDesc"].ToString()) ? "" : rs["ChineseDesc"]) + "'," +
                                           "'" + ((string.IsNullOrEmpty(rs["AddQty"].ToString()) ? "0" : rs["AddQty"]) + "'," +
                                           "'" + rs["DefLocation"].ToString() + "'," +
                                           "'" + (string.IsNullOrEmpty(rs["LineRemarks"].ToString()) ? "" : rs["LineRemarks"]) + "'," +
                                           "'" + (string.IsNullOrEmpty(rs["ShipName"].ToString()) ? "" : rs["ShipName"]) + "'," +
                                           "'" + (string.IsNullOrEmpty(rs["ShipAdd"].ToString()) ? "" : rs["ShipAdd"]) + "'," +
                                           "'" + (string.IsNullOrEmpty(rs["ShipAdd2"].ToString()) ? "" : rs["ShipAdd2"]) + "'," +
                                           "'" + (string.IsNullOrEmpty(rs["ShipAdd3"].ToString()) ? "" : rs["ShipAdd3"]) + "'," +
                                           "'" + (string.IsNullOrEmpty(rs["ShipAdd4"].ToString()) ? "" : rs["ShipAdd4"]) + "'," +
                                           "'" + (string.IsNullOrEmpty(rs["ShipCity"].ToString()) ? "" : rs["ShipCity"]) + "'," +
                                           "'" + (string.IsNullOrEmpty(rs["ShipPin"].ToString()) ? "" : rs["ShipPin"]) + "'," +
                                           "'" + sAgentID.ToString() + "'," +
                                           "'" + (string.IsNullOrEmpty(rs["OrdBulkQty"].ToString()) ? "0" : rs["OrdBulkQty"]) + "'," +
                                           "'" + (string.IsNullOrEmpty(rs["OrdLooseQty"].ToString()) ? "0" : rs["OrdLooseQty"]) + "'," +
                                           "'" + (string.IsNullOrEmpty(rs["InvUOM"].ToString()) ? "PD" : rs["InvUOM"]) + "'," +
                                           "'" + (string.IsNullOrEmpty(rs["InvQty"].ToString()) ? "0" : rs["InvQty"]) + "'," +
                                           "'" + (string.IsNullOrEmpty(rs["VarUOM"].ToString()) ? "PD" : rs["VarUOM"]) + "'," +
                                           "'" + (string.IsNullOrEmpty(rs["VarQty"].ToString()) ? "0" : rs["VarQty"])) + "')";
                        VehicleAssignmentLog(qry);
                        _commonRule.executerQuery(qry);

                    }

                }
                conn.Close();
                strSql = "update InvReport set OrdBulkUOM ='CS',OrdLooseUOM='PK',InvBulkUOM='CS',InvLooseUOM='PK',VarBulkUOM='CS',VarLooseUOM='PK'";
                VehicleAssignmentLog(strSql);
                result = _commonRule.executerQuery(strSql);

                var res = "";

                strSql = "Select * from InvReport where InvNo In ( " + strPrintPickingInvNo + ") order by InvNo";
                VehicleAssignmentLog(strSql);
                conn.Open();
                cmd = new SqlCommand(strSql, conn);
                using (SqlDataReader rs = cmd.ExecuteReader())
                {
                    var qry = string.Empty;
                    while ((rs.Read() == true))
                    {
                        string ItemNo = rs["ItemNo"].ToString();
                        string LooseUOM = "PK";
                        string BulkUOM = "CS";
                        double LooseQty = 0;
                        double BulkQty = 0;
                        BulkQty = Convert.ToDouble(rs["OrdBulkQty"]);
                        LooseQty = Convert.ToDouble(rs["OrdLooseQty"]);
                        double TempInvQty = 0;
                        double TempVarQty = 0;
                        double TempQty = 0;
                        double TempBulkQty = 0;
                        double TempLooseQty = 0;

                        if (rs["Qty"] != "")
                        {
                            TempQty = double.Parse(rs["Qty"].ToString());
                        }
                        else
                        {
                            TempQty = 0;
                        }

                        if (rs["InvQty"] != "")
                        {
                            TempInvQty = double.Parse(rs["InvQty"].ToString());
                        }
                        else
                        {
                            TempInvQty = 0;
                        }

                        if (((TempQty > TempInvQty) && (TempInvQty >= 0)))
                        {
                            TempVarQty = (TempQty - TempInvQty);
                        }
                        else if ((TempInvQty < 0))
                        {
                            TempVarQty = TempQty;
                        }
                        else
                        {
                            TempVarQty = 0;
                        }
                        if ((TempQty >= BulkQty))
                        {
                            try
                            {
                                TempBulkQty = double.IsInfinity((TempQty / BulkQty)) == true ? 0 : (TempQty / BulkQty);
                                //  dtInvReport.Rows[j][55] = int(TempBulkQty);
                                TempLooseQty = double.IsNaN((TempQty % BulkQty)) == true ? 0 : (TempQty % BulkQty); ;
                                // --TempBulkQty = BulkQty * CDbl(dtInvReport.Rows(j)(55).ToString)
                                //-- TempLooseQty = CDbl(dtInvReport.Rows(j)(19).ToString) - TempBulkQty
                                // dtInvReport.Rows[j][57] = (TempLooseQty / LooseQty);
                                var ordLseQty = double.IsNaN((TempLooseQty / LooseQty)) == true ? 0 : (TempLooseQty / LooseQty);
                                strSql = "update InvReport set OrdBulkQty ='" + Convert.ToInt64(TempBulkQty) + "',OrdLooseQty='" + ordLseQty + "' where ItemNo='" + rs["ItemNo"] + "' ";
                                //strSql = "update InvReport set OrdBulkQty ='" + Convert.ToInt64(TempBulkQty) + "',OrdLooseQty='" + (TempLooseQty / LooseQty) + "' where ItemNo='" + rs["ItemNo"] + "' ";
                                VehicleAssignmentLog(strSql);
                                result = _commonRule.executerQuery(strSql);
                            }
                            catch (Exception ex)
                            {
                                res = ex.ToString();
                               
                            }
                        }
                        else
                        {
                            try
                            {
                                // dtInvReport.Rows[j][55] = 0;
                                //  dtInvReport.Rows[j][57] = (TempQty / LooseQty);
                                //var ordLseQty = double.IsNaN((TempQty / LooseQty)) == true ? 0 : (TempQty / LooseQty);
                                var ordLseQty = 0.0;
                                if (LooseQty != 0) ordLseQty = (TempQty / LooseQty);
                                strSql = "update InvReport set OrdBulkQty ='0',OrdLooseQty='" + ordLseQty + "' where ItemNo='" + rs["ItemNo"] + "' ";
                                VehicleAssignmentLog(strSql); 
                                result = _commonRule.executerQuery(strSql);
                            }
                            catch (Exception ex)
                            {

                                res = ex.ToString();
                            }
                        }

                        if ((TempInvQty >= BulkQty))
                        {
                            try
                            {
                                //TempBulkQty = double.IsInfinity((TempInvQty / BulkQty)) == true ? 0 : (TempInvQty / BulkQty);

                                if (BulkQty != 0) TempBulkQty = TempInvQty / BulkQty;

                                TempLooseQty = 0;
                                // dtInvReport.Rows[j][61] = int(TempBulkQty);
                                //TempLooseQty = double.IsNaN((TempInvQty % BulkQty)) == true ? 0 : (TempInvQty % BulkQty);
                                if (BulkQty != 0) TempLooseQty = TempInvQty % BulkQty;

                                //-- TempBulkQty = BulkQty * CDbl(dtInvReport.Rows(j)(61).ToString)
                                //-- TempLooseQty = CDbl(dtInvReport.Rows(j)(59).ToString) - TempBulkQty
                                // dtInvReport.Rows[j][63] = (TempLooseQty / LooseQty);

                                //    var invLseQty = double.IsNaN((TempLooseQty / LooseQty)) == true ? 0 : (TempLooseQty / LooseQty);
                                var invLseQty = 0.0;

                                if (LooseQty != 0) invLseQty = TempLooseQty / LooseQty;


                                strSql = "update InvReport set InvBulkQty ='" + Convert.ToInt64(TempBulkQty) + "',InvLooseQty='" + invLseQty + "' where ItemNo='" + rs["ItemNo"] + "' ";
                                VehicleAssignmentLog(strSql); 
                                result = _commonRule.executerQuery(strSql);
                            }
                            catch (Exception ex)
                            {

                                res = ex.ToString();
                            }
                        }
                        else
                        {
                            try
                            {
                                //dtInvReport.Rows[j][61] = 0;
                                //dtInvReport.Rows[j][63] = (TempInvQty / LooseQty);
                                //var OrdLseQty = double.IsNaN((TempQty / LooseQty)) == true ? 0 : (TempQty / LooseQty);
                                var OrdLseQty = 0.0;
                                if (LooseQty != 0) OrdLseQty = (TempQty / LooseQty);
                                strSql = "update InvReport set OrdBulkQty ='0',OrdLooseQty='" + OrdLseQty + "' where ItemNo='" + rs["ItemNo"] + "' ";
                                VehicleAssignmentLog(strSql); 
                                result = _commonRule.executerQuery(strSql);
                            }
                            catch (Exception ex)
                            {

                                res = ex.ToString();
                            }
                        }

                        if ((TempVarQty >= BulkQty))
                        {

                            try
                            {
                                TempBulkQty = double.IsInfinity((TempVarQty / BulkQty)) == true || double.IsNaN((TempVarQty / BulkQty)) == true ? 0 : (TempVarQty / BulkQty);
                                TempLooseQty = 0;
                                // dtInvReport.Rows[j][67] = int(TempBulkQty);
                                TempLooseQty = double.IsNaN((TempVarQty % BulkQty)) == true || double.IsInfinity((TempVarQty % BulkQty)) == true ? 0 : (TempVarQty % BulkQty);
                                //-- TempBulkQty = BulkQty * CDbl(dtInvReport.Rows(j)(67).ToString)
                                //-- TempLooseQty = CDbl(dtInvReport.Rows(j)(65).ToString) - TempBulkQty
                                //dtInvReport.Rows[j][69] = (TempLooseQty / LooseQty);
                                var varLseQty = double.IsNaN((TempLooseQty / LooseQty)) ? 0 : (TempLooseQty / LooseQty);
                                strSql = "update InvReport set VarBulkQty ='" + Convert.ToInt64(TempBulkQty) + "',VarLooseQty='" + varLseQty + "' where ItemNo='" + rs["ItemNo"] + "' ";
                                VehicleAssignmentLog(strSql); 
                                result = _commonRule.executerQuery(strSql);
                            }
                            catch (Exception ex)
                            {

                                res = ex.ToString();
                            }
                        }
                        else
                        {
                            //dtInvReport.Rows[j][67] = 0;
                            //dtInvReport.Rows[j][69] = (TempVarQty / LooseQty);
                            //var varLseQty = double.IsNaN((TempVarQty / LooseQty)) ? 0 : (TempVarQty / LooseQty);
                            try
                            {
                                var varLseQty = 0.0;
                                if (LooseQty != 0) varLseQty = (TempVarQty / LooseQty);

                                strSql = "update InvReport set VarBulkQty ='0',VarLooseQty='" + varLseQty + "' where ItemNo='" + rs["ItemNo"] + "' ";
                                VehicleAssignmentLog(strSql); 
                                result = _commonRule.executerQuery(strSql);
                            }
                            catch (Exception ex1)
                            {

                                res = ex1.ToString();
                            }

                        }
                    }
                }

                conn.Close();
                if (type == "report")
                    return RedirectToAction("ReportView1", "Reports", new { InitReport = "select 1 as A", ReportName = "Select 'ReportPickingListRep' as ReportName ", LoadReport = "select * from InvReport" });
                else
                    return RedirectToAction("ReportView1", "Reports", new { InitReport = "select 1 as A", ReportName = "Select 'PickingListRep' as ReportName ", LoadReport = "select * from InvReport" });

            }
            catch (Exception ex)
            {
                //MsgBox("Load Report Failed! Please re-try again.");
                //MsgBox(ex.Message.ToString);
                var dd = ex;
            }

            return View();

        }

        public ActionResult LoadPickingReport1(string strPrintPickingInvNo, string sRptName)
        {
            try
            {
                conn = new SqlConnection(constr);
                var query = "Delete from InvReport";
                var result = _commonRule.executerQuery(query);
                // objDo.ExecuteSQL("Delete from InvReport");
                string strSql = "";
                //   SqlDataReader rs;
                //int iIndex = 0;
                //int i = 0;
                string sAgentID = "";
                strSql = "SELECT '' as BinNo, [LineNo],OrdItem.Description, OrderHdr.AgentID, OrdItem.UOM, OrdItem.[LineNo] as Line, OrdItem.ItemNo as ItemNo, Customer.CustNo, Customer.CustName, Customer.Address, Customer.Address2, Customer.Address3, CASE WHEN Customer.City IS NULL THEN '' ELSE Customer.City + ' - ' END + isnull(Customer.PostCode,'') as Address4, Customer.Phone, Customer.ContactPerson, Customer.FaxNo, OrderHdr.Remarks, OrdItem.Remarks as LineRemarks, OrderHdr.ConfirmedBy, OrderHdr.PoNo as DoNo, OrderHdr.OrdNo AS Expr1, OrderHdr.OrdDt as InvDt, OrderHdr.SalesCoord, OrderHdr.PoNo, OrderHdr.AgentId, '' as CustRefNo, OrderHdr.PayTerms, OrdItem.Qty, OrdItem.Price, OrdItem.SubAmt, OrderHdr.SubTotal, OrderHdr.GST, OrderHdr.GstAmt, OrderHdr.TotalAmt, Item.Brand as PickingList,  Item.AssemblyBOM, '' as LotNo, convert(varchar,GetDate(),112) as ExpiryDate, OrdItem.Qty as LotQty, UOM.PackingSize as Attn, Item.ChineseDesc, 0 as AddQty, '' as AddUOM, Location.Name as DefLocation, Item.DefBin, Customer.ShipName, OrderHdr.ShipAdd, OrderHdr.ShipAdd2, OrderHdr.ShipAdd3, OrderHdr.ShipAdd4, OrderHdr.ShipCity, OrderHdr.ShipPin,(select BaseQty From UOM Where UOM.UOM='CS' and UOM.ITemNo=OrdItem.ItemNO) as OrdBulkQty, (select BaseQty From UOM Where UOM.UOM='PK' and UOM.ITemNo=OrdItem.ItemNO) as OrdLooseQty,(select ISNULL(GoodsInvn.Qty,0) from GoodsInvn where GoodsInvn.ItemNo=OrdItem.ItemNo and GoodsInvn.Location=OrdItem.Location) as INVQty,'PD' as InvUOM,0 as VarQty, 'PD' as VarUOM FROM Customer INNER JOIN OrderHdr ON Customer.CustNo = OrderHdr.CustId INNER JOIN OrdItem ON OrderHdr.OrdNo = OrdItem.OrdNo INNER JOIN Item ON OrdItem.ItemNo = Item.ItemNo INNER JOIN UOM ON OrdItem.ItemNo = UOM.ItemNo and OrdItem.UOM = UOM.UOM inner join Location on Location.Code=OrdItem.Location WHERE OrderHdr.OrdNo In (" + strPrintPickingInvNo + ") ";

                VehicleAssignmentLog(strSql);
                // string sPUOM = "";
                conn.Open();
                SqlCommand cmd = new SqlCommand(strSql, conn);
                //drr = cmd.ExecuteReader();
                //isExists = drr.Read();
                // using (SqlDataReader reader = cmd.ExecuteReader())
                using (SqlDataReader rs = cmd.ExecuteReader())
                {
                    var qry = string.Empty;
                    while ((rs.Read() == true))
                    // if (rs.Read())
                    {
                        sAgentID = ((string.IsNullOrEmpty(rs["AgentID"].ToString())) ? "" : rs["AgentID"].ToString());
                        qry = "Insert into InvReport(InvNo, InvDate, CustNo, AgentID, CustName, Add1, Add2, Add3, Add4, Phone, Fax, Remarks, DoNo, RefNo, PONo, Terms, Line, ItemNo, Description, Qty, price, SubAmt, SubTotal, GSTAmt, TotalAmt, BaseUOM, ConfirmedBy, SalesCoOrd, PickingList, Attn, ChineseDesc, OthersQty, Location, LineRemarks, ShipName, ShipAdd1, ShipAdd2, ShipAdd3, ShipAdd4, ShipCity, ShipPost, PrintedBy ) values (" +
                                           "'" + rs["Expr1"].ToString() + "'," +
                                           "'" + Convert.ToDateTime(rs["InvDt"]).ToString("yyyy/MM/dd") + "'," +
                                           "'" + rs["CustNo"].ToString() + "'," +
                                           "'" + rs["AgentID"].ToString() + "'," +
                                           "'" + rs["CustName"].ToString() + "'," +
                                           "'" + rs["Address"].ToString() + "'," +
                                           "'" + rs["Address2"].ToString() + "'," +
                                           "'" + rs["Address3"].ToString() + "'," +
                                           "'" + rs["Address4"].ToString() + "'," +
                                           "'" + rs["Phone"].ToString() + "'," +
                                           "'" + rs["FaxNo"].ToString() + "'," +
                                           "'" + rs["Remarks"].ToString() + "'," +
                                           "'" + rs["DONo"].ToString() + "'," +
                                           "'" + rs["CustRefNo"].ToString() + "'," +
                                           "'" + rs["PONo"].ToString() + "'," +
                                           "'" + rs["PayTerms"].ToString() + "'," +
                                           "'" + rs["Line"].ToString() + "'," +
                                           "'" + rs["ItemNo"].ToString() + "'," +
                                           "'" + rs["Description"].ToString() + "'," +
                                           "'" + rs["Qty"].ToString() + "'," +
                                           "'" + Convert.ToDecimal(rs["Price"]).ToString("0.000") + "'," +
                                           "'" + Convert.ToDecimal(rs["SubAmt"]).ToString("0.00") + "'," +
                                           "'" + Convert.ToDecimal(rs["SubTotal"]).ToString("0.00") + "'," +
                                           "'" + Convert.ToDecimal(rs["GstAmt"]).ToString("0.00") + "'," +
                                           "'" + Convert.ToDecimal(rs["TotalAmt"]).ToString("0.00") + "'," +
                                           "'" + rs["UOM"].ToString() + "'," +
                                           "'" + rs["ConfirmedBy"].ToString() + "'," +
                                           "'" + rs["SalesCoOrd"].ToString() + "'," +
                                           "'" + rs["PickingList"].ToString() + "'," +
                                           "'" + rs["Attn"].ToString() + "'," +
                                           "'" + (string.IsNullOrEmpty(rs["ChineseDesc"].ToString()) ? "" : rs["ChineseDesc"]) + "'," +
                                           "'" + ((string.IsNullOrEmpty(rs["AddQty"].ToString()) ? "0" : rs["AddQty"]) + "'," +
                                           "'" + rs["DefLocation"].ToString() + "'," +
                                           "'" + (string.IsNullOrEmpty(rs["LineRemarks"].ToString()) ? "" : rs["LineRemarks"]) + "'," +
                                           "'" + (string.IsNullOrEmpty(rs["ShipName"].ToString()) ? "" : rs["ShipName"]) + "'," +
                                           "'" + (string.IsNullOrEmpty(rs["ShipAdd"].ToString()) ? "" : rs["ShipAdd"]) + "'," +
                                           "'" + (string.IsNullOrEmpty(rs["ShipAdd2"].ToString()) ? "" : rs["ShipAdd2"]) + "'," +
                                           "'" + (string.IsNullOrEmpty(rs["ShipAdd3"].ToString()) ? "" : rs["ShipAdd3"]) + "'," +
                                           "'" + (string.IsNullOrEmpty(rs["ShipAdd4"].ToString()) ? "" : rs["ShipAdd4"]) + "'," +
                                           "'" + (string.IsNullOrEmpty(rs["ShipCity"].ToString()) ? "" : rs["ShipCity"]) + "'," +
                                           "'" + (string.IsNullOrEmpty(rs["ShipPin"].ToString()) ? "" : rs["ShipPin"]) + "'," +
                                           "'" + sAgentID.ToString()) + "')";
                        //  "'" + (string.IsNullOrEmpty(rs["VarQty"].ToString()) ? "0" : rs["VarQty"])) + "')";
                        VehicleAssignmentLog(qry);
                        _commonRule.executerQuery(qry);

                    }

                }
                conn.Close();

                return RedirectToAction("ReportView1", "Reports", new { InitReport = "select 1 as A", ReportName = "Select 'PickingListRep' as ReportName ", LoadReport = "select * from InvReport" });

            }
            catch (Exception ex)
            {
                //MsgBox("Load Report Failed! Please re-try again.");
                //MsgBox(ex.Message.ToString);
                var dd = ex;
            }

            return View();

        }

        //string strPrintPickingInvNo, string sRptName --strInvNo
        //public void LoadConsolidatedReport(System.Collections.ArrayList arr, string sRptName)
        public ActionResult LoadConsolidatedReport(string strInvNo, string sRptName)
        {
            var UserId = Session["UserId"];
            var projectName = Session["ProjectName"].ToString();
            try
            {
                conn = new SqlConnection(constr);

                var query = "Delete from InvReport";
                var result = _commonRule.executerQuery(query);
                // objDo.ExecuteSQL("Delete from InvReport");

                //   SqlDataReader rs;
                int iIndex = 0;
                // int i = 0;
                string sAgentID = "";


                //objDo.ExecuteSQL("Delete from InvReport");
                string strSQL = "";
                SqlDataReader dtr;
                string oldShipAgent = "";


                if ((strInvNo != ""))
                {
                    //  strSQL = ("insert into InvReport(InvNo,CustName,ItemNo,Description,Location,BaseUOM,Qty,OrdBulkQty,OrdLooseQty,InvQty," +
                    //"InvUOM,VarQty,VarUOM) " + (@"select '' as InvNo,'' as ShipAgent, A.ItemNO,A.ItemName as Description,A.Name as Location,UOM as BaseUOM,A.Qty,0 as BulkOrdQty,0 as LooseOrdQty, (select ISNULL(Sum(GoodsInvn.Qty),0) from GoodsInvn Where GoodsInvn.ItemNO=A.ItemNO and GoodsInvn.Location=A.Location) As INVQTY,UOM as INVUOM, 0 as VarQty,UOM as VarUOM from (select OrdItem.ItemNo,Item.ItemName, Item.BaseUOM as UOM,sum(Qty*UOM.BaseQty) as Qty,OrdItem.Location, Location.Name from OrdItem Inner Join OrderHDR  on OrderHDr.OrdNo=OrdItem.OrdNO inner join Item On OrdItem.ItemNo=Item.ItemNo inner join UOM On OrdItem.ItemNo=UOM.ItemNo and UOM.UOM=OrdItem.UOM inner join Location on Location.Code=OrdItem.Location where OrderHdr.OrdNo in ("
                    //            + (strInvNo + ") group by OrdItem.ItemNO,Item.BaseUOM,Item.ItemName,OrdItem.Location,Location.Name) as A ")));

                    if (projectName.ToLower() == "pvm"  || projectName.ToLower() == "dms" || projectName.ToLower() == "etika")
                    {
                        strSQL = ("insert into InvReport(InvNo,CustName,ItemNo,Description,Location,BaseUOM,Qty,InvQty," +
                        "InvUOM,VarQty,VarUOM) " + (@"select  '', '' as ShipAgent, Item.ItemNO, Item.ItemName as Description, Location.Name as Location, Item.BaseUOM as BaseUOM, sum(OrdItem.Qty*UOM.BaseQty) as Qty, (goodsinvn.Qty) as  INVQTY, goodsinvn.Uom as INVUOM, (IsNull(goodsinvn.Qty,0)-IsNull(sum(OrdItem.Qty*UOM.BaseQty),0)) as  VarQty,Item.BaseUOM as VarUOM	FROM Customer INNER JOIN OrderHdr ON Customer.CustNo = OrderHdr.CustId INNER JOIN OrdItem ON OrderHdr.OrdNo = OrdItem.OrdNo  INNER JOIN Item ON OrdItem.ItemNo = Item.ItemNo  INNER JOIN UOM ON OrdItem.ItemNo = UOM.ItemNo and OrdItem.UOM = UOM.UOM   inner join Location on OrdItem.Location = Location.Code  inner join  goodsinvn on OrdItem.ItemNo= goodsinvn.ItemNo and goodsinvn.Location=OrdItem.Location where OrderHdr.OrdNo in ("
                        + (strInvNo + ") group by Item.ItemNO, Item.ItemName, Location.Name ,  goodsinvn.Qty,goodsinvn.Uom, Item.BaseUOM order by Item.Itemno  ")));
                        // objDo.ExecuteSQL(strSQL);
                    }
                    //else if(projectName.ToLower() == "ffb")
                    //{
                    //   strSQL = ("insert into InvReport(InvNo,CustName,ItemNo,Description,Location,BaseUOM,Qty,InvQty," +
                    //                            "InvUOM,VarQty,VarUOM,LineRemarks,SalesCoOrd) " + (@"select  '', '' as ShipAgent, Item.ItemNO, Item.ItemName as Description, Location.Name as Location, Item.BaseUOM as BaseUOM, sum(OrdItem.Qty*UOM.BaseQty) as Qty, (goodsinvn.Qty) as  INVQTY, goodsinvn.Uom as INVUOM, case when (IsNull(goodsinvn.Qty,0)-IsNull(sum(OrdItem.Qty*UOM.BaseQty),0)) >= 0 then (IsNull(goodsinvn.Qty,0)-IsNull(sum(OrdItem.Qty*UOM.BaseQty),0)) else 0 end  VarQty,Item.BaseUOM as VarUOM,OrderHdr.DeliveryDate as LineRemarks,OrderHdr.VehicleID as SalesCoOrd	FROM Customer INNER JOIN OrderHdr ON Customer.CustNo = OrderHdr.CustId INNER JOIN OrdItem ON OrderHdr.OrdNo = OrdItem.OrdNo  INNER JOIN Item ON OrdItem.ItemNo = Item.ItemNo  INNER JOIN UOM ON OrdItem.ItemNo = UOM.ItemNo and OrdItem.UOM = UOM.UOM   inner join Location on OrdItem.Location = Location.Code  left outer join  goodsinvn on OrdItem.ItemNo= goodsinvn.ItemNo and goodsinvn.Location=OrdItem.Location where OrderHdr.OrdNo in ("
                    //                            + (strInvNo + ") group by Item.ItemNO, Item.ItemName, Location.Name ,  goodsinvn.Qty,goodsinvn.Uom, Item.BaseUOM,OrderHdr.DeliveryDate,OrderHdr.VehicleID order by Item.Itemno  ")));
                    //}
                    else if ( projectName.ToLower() == "frostfood" || projectName.ToLower() == "ofii" || projectName.ToLower() == "ffb" || projectName.ToLower() == "eonmetall")
                    {
                        strSQL = ("insert into InvReport(InvNo,CustName,ItemNo,Description,Location,BaseUOM,Qty,InvQty," +
                        "InvUOM,VarQty,VarUOM,LineRemarks,SalesCoOrd) " + (@"select  '', '' as ShipAgent, Item.ItemNO, Item.ItemName as Description, Location.Name as Location, Item.BaseUOM as BaseUOM, sum(OrdItem.Qty*UOM.BaseQty) as Qty, (goodsinvn.Qty) as  INVQTY, goodsinvn.Uom as INVUOM, (IsNull(goodsinvn.Qty,0)-IsNull(sum(OrdItem.Qty*UOM.BaseQty),0)) as  VarQty,Item.BaseUOM as VarUOM,OrderHdr.DeliveryDate as LineRemarks,OrderHdr.VehicleID as SalesCoOrd	FROM Customer INNER JOIN OrderHdr ON Customer.CustNo = OrderHdr.CustId INNER JOIN OrdItem ON OrderHdr.OrdNo = OrdItem.OrdNo  INNER JOIN Item ON OrdItem.ItemNo = Item.ItemNo  INNER JOIN UOM ON OrdItem.ItemNo = UOM.ItemNo and OrdItem.UOM = UOM.UOM   inner join Location on OrdItem.Location = Location.Code  left outer join  goodsinvn on OrdItem.ItemNo= goodsinvn.ItemNo and goodsinvn.Location=OrdItem.Location where OrderHdr.OrdNo in ("
                        + (strInvNo + ") group by Item.ItemNO, Item.ItemName, Location.Name ,  goodsinvn.Qty,goodsinvn.Uom, Item.BaseUOM,OrderHdr.DeliveryDate,OrderHdr.VehicleID order by Item.Itemno  ")));
                        // objDo.ExecuteSQL(strSQL);
                        
                    }
                    else if (projectName.ToLower() == "eastocean")
                    {
                        strSQL = ("insert into InvReport(InvNo, CustName, ItemNo, Description, Location, BaseUOM, Qty, OrdBulkQty, OrdLooseQty, InvQty," +
                        "InvUOM, VarQty, VarUOM) " + (@"select '','' as ShipAgent, A.ItemNO,A.ItemName as Description,A.Name as Location,BaseUOM as BaseUOM,A.Qty,(select  top 1 ISNULL(BaseQty, 0) from UOM Where UOM.ItemNO = A.ItemNO   order by BaseQty Desc ) as BulkOrdQty,(select top 1 ISNULL(BaseQty, 0) from UOM Where UOM.ItemNO = A.ItemNO and UOM.UOM = BaseUOM  ) as LooseOrdQty, (select ISNULL(Sum(GoodsInvn.Qty), 0) from GoodsInvn Where GoodsInvn.ItemNO = A.ItemNO and GoodsInvn.Location = A.Location) As INVQTY, BaseUOM as INVUOM, 0 as VarQty,BaseUOM as VarUOM  from(select OrdItem.ItemNo, Item.ItemName, sum(Qty) as Qty, OrdItem.Location, Location.Name, BaseUOM  from OrdItem Inner Join OrderHDR  on OrderHDr.OrdNo = OrdItem.OrdNO inner join Item On OrdItem.ItemNo = Item.ItemNo inner join Location on Location.Code = OrdItem.Location where OrderHdr.OrdNo in ("
                         + (strInvNo + ") group by OrdItem.ItemNO,Item.ItemName,OrdItem.Location,Location.Name,BaseUOM) as A ")));
                    }
                    else if (projectName.ToLower() == "sej" || projectName.ToLower() == "wms")
                    {
                        strSQL = ("insert into InvReport(InvNo, CustName, ItemNo, Description, Location, BaseUOM, Qty, OrdBulkQty, OrdLooseQty, InvQty," +
                         "InvUOM, VarQty, VarUOM) " + (@"select '','' as ShipAgent, A.ItemNO,A.ItemName as Description,A.Name as Location,BaseUOM,A.Qty,(select ISNULL(BaseQty, 0) from UOM Where UOM.ItemNO = A.ItemNO and UOM = 'CS' ) as BulkOrdQty,(select ISNULL(BaseQty, 0) from UOM Where UOM.ItemNO = A.ItemNO and UOM = 'PK' ) as LooseOrdQty, (select ISNULL(Sum(GoodsInvn.Qty), 0) from GoodsInvn Where GoodsInvn.ItemNO = A.ItemNO and GoodsInvn.Location = A.Location) As INVQTY, A.baseuom as INVUOM, 0 as VarQty,A.baseuom as VarUOM from(select OrdItem.ItemNo, Item.ItemName, sum(Qty) as Qty, OrdItem.Location, Location.Name, Item.baseuom as BaseUOM from OrdItem Inner Join OrderHDR  on OrderHDr.OrdNo = OrdItem.OrdNO inner join Item On OrdItem.ItemNo = Item.ItemNo inner join Location on Location.Code = OrdItem.Location where OrderHdr.OrdNo in ("
                        + (strInvNo + ") group by OrdItem.ItemNO,Item.ItemName,OrdItem.Location,Location.Name,Item.baseuom) as A")));
                    }
                    else if (projectName.ToLower() == "selasihaman")
                    {
                        strSQL = ("insert into InvReport(InvNo, CustName, ItemNo, Description, Location, BaseUOM, Qty, OrdBulkQty, OrdLooseQty, InvQty," +
                         "InvUOM, VarQty, VarUOM) " + (@"select '','' as ShipAgent, A.ItemNO,A.ItemName as Description,A.Name as Location,BaseUOM,A.Qty,(select ISNULL(BaseQty, 0) from UOM Where UOM.ItemNO = A.ItemNO and UOM = 'CS' ) as BulkOrdQty,(select ISNULL(BaseQty, 0) from UOM Where UOM.ItemNO = A.ItemNO and UOM = 'PK' ) as LooseOrdQty, (select ISNULL(Sum(GoodsInvn.Qty), 0) from GoodsInvn Where GoodsInvn.ItemNO = A.ItemNO and GoodsInvn.Location = A.Location) As INVQTY, A.baseuom as INVUOM, 0 as VarQty,A.baseuom as VarUOM from(select OrdItem.ItemNo, Item.ItemName, sum(Qty) as Qty, OrdItem.Location, Location.Name, Item.baseuom as BaseUOM from OrdItem Inner Join OrderHDR  on OrderHDr.OrdNo = OrdItem.OrdNO inner join Item On OrdItem.ItemNo = Item.ItemNo inner join Location on Location.Code = OrdItem.Location where OrderHdr.OrdNo in ("
                        + (strInvNo + ") group by OrdItem.ItemNO,Item.ItemName,OrdItem.Location,Location.Name,Item.baseuom) as A")));
                    }
                   
                    else if (projectName.ToLower() == "jsu")
                    {
                        //strSQL = ("insert into InvReport(InvNo,CustName,ItemNo,Description,Location,BaseUOM,Qty,OrdBulkQty,OrdLooseQty,InvQty," +
                        //"InvUOM,VarQty,VarUOM) " + (@"select '','' as ShipAgent, A.ItemNO,A.ItemName as Description,A.Name as Location,'PD' as BaseUOM,A.Qty,(select ISNULL(BaseQty,0) from UOM Where UOM.ItemNO=A.ItemNO and UOM='CS' ) as BulkOrdQty,(select ISNULL(BaseQty,0) from UOM Where UOM.ItemNO=A.ItemNO and UOM='PK' ) as LooseOrdQty, (select ISNULL(Sum(GoodsInvn.Qty),0) from GoodsInvn Where GoodsInvn.ItemNO=A.ItemNO and GoodsInvn.Location=A.Location) As INVQTY,'PD' as INVUOM, 0 as VarQty,'PD' as VarUOM from (select OrdItem.ItemNo,Item.ItemName, sum(Qty) as Qty,OrdItem.Location, Location.Name from OrdItem Inner Join OrderHDR  on OrderHDr.OrdNo=OrdItem.OrdNO inner join Item On OrdItem.ItemNo=Item.ItemNo inner join Location on Location.Code=OrdItem.Location where OrderHdr.OrdNo in ("
                        //+ (strInvNo + ") group by OrdItem.ItemNO,Item.ItemName,OrdItem.Location,Location.Name) as A ")));

                        strSQL = ("insert into InvReport(InvNo,CustName,ItemNo,Description,Location,BaseUOM,Qty,OrdBulkQty,OrdLooseQty,InvQty," +
                            " InvUOM,VarQty,VarUOM ,Username, distributorAddress,distributorAddress2,distributorAddress3,distributorAddress4) " + (@"select '','' as ShipAgent, A.ItemNO,A.ItemName as Description,A.Name as Location,'PD' as BaseUOM,A.Qty,(select ISNULL(BaseQty,0) from UOM Where UOM.ItemNO=A.ItemNO and UOM='CS' ) as BulkOrdQty,(select ISNULL(BaseQty,0) from UOM Where UOM.ItemNO=A.ItemNO and UOM='PK' ) as LooseOrdQty, (select ISNULL(Sum(GoodsInvn.Qty),0) from GoodsInvn Where GoodsInvn.ItemNO=A.ItemNO and GoodsInvn.Location=A.Location) As INVQTY,'PD' as INVUOM, 0 as VarQty,'PD' as VarUOM, distributor as Username,distributorAddress,distributorAddress2,distributorAddress3,distributorAddress4 from (select OrdItem.ItemNo,Item.ItemName, sum(Qty) as Qty,OrdItem.Location," +
                            " Location.Name ,Location.ChineseName as distributor, Location.Address as distributorAddress,location.Address2 as distributorAddress2,location.Address3 as distributorAddress3, 		Location.Address4 as distributorAddress4 from OrdItem Inner Join OrderHDR  on OrderHDr.OrdNo=OrdItem.OrdNO inner join Item On OrdItem.ItemNo=Item.ItemNo inner join Location on Location.Code=OrdItem.Location where OrderHdr.OrdNo in ("
                            + (strInvNo + ") group by OrdItem.ItemNO,Item.ItemName,OrdItem.Location,Location.Name ,Location.ChineseName,location.address,location.Address2,location.Address3,Location.Address4) as A ")));

                    }

                    else
                    {
                        strSQL = ("insert into InvReport(InvNo,CustName,ItemNo,Description,Location,BaseUOM,Qty,OrdBulkQty,OrdLooseQty,InvQty," +
                        "InvUOM,VarQty,VarUOM) " + (@"select '','' as ShipAgent, A.ItemNO,A.ItemName as Description,A.Name as Location,'PD' as BaseUOM,A.Qty,(select ISNULL(BaseQty,0) from UOM Where UOM.ItemNO=A.ItemNO and UOM='CS' ) as BulkOrdQty,(select ISNULL(BaseQty,0) from UOM Where UOM.ItemNO=A.ItemNO and UOM='PK' ) as LooseOrdQty, (select ISNULL(Sum(GoodsInvn.Qty),0) from GoodsInvn Where GoodsInvn.ItemNO=A.ItemNO and GoodsInvn.Location=A.Location) As INVQTY,'PD' as INVUOM, 0 as VarQty,'PD' as VarUOM from (select OrdItem.ItemNo,Item.ItemName, sum(Qty) as Qty,OrdItem.Location, Location.Name from OrdItem Inner Join OrderHDR  on OrderHDr.OrdNo=OrdItem.OrdNO inner join Item On OrdItem.ItemNo=Item.ItemNo inner join Location on Location.Code=OrdItem.Location where OrderHdr.OrdNo in ("
                        + (strInvNo + ") group by OrdItem.ItemNO,Item.ItemName,OrdItem.Location,Location.Name) as A ")));
                        // objDo.ExecuteSQL(strSQL);

                    }
                    VehicleAssignmentLog(strSQL);
                    result = _commonRule.executerQuery(strSQL);

                }


                if (projectName.ToLower() != "pvm" && projectName.ToLower() != "etika" && projectName.ToLower() != "frostfood" && projectName.ToLower() != "ffb"  && projectName.ToLower() != "ofii" && projectName.ToLower() != "eonmetall")
                {
                    //new code
                    //strSQL = "update InvReport set OrdBulkUOm ='CS',OrdLooseUOM='PK',InvBulkUOM='CS',InvLooseUOM='PK',VarBulkUOM='CS',VarLooseUOM='PK'";
                    //strSQL = "update InvReport set OrdBulkUOm ='CS',OrdLooseUOM='PK',InvBulkUOM='CS',InvLooseUOM='PK',VarBulkUOM='CS',VarLooseUOM='PK'";

                    strSQL = "update InvReport set OrdBulkUOm = Item.BulkUOM, OrdLooseUOM = Item.LooseUOM, InvBulkUOM = Item.BulkUOM, InvLooseUOM = Item.LooseUOM, VarBulkUOM = Item.BulkUOM, VarLooseUOM = Item.LooseUOM from Item where Item.ITemNo = InvReport.ItemNo";
                    VehicleAssignmentLog(strSQL); 
                    result = _commonRule.executerQuery(strSQL);

                    //strSQL = "update InvReport Set OrdBulkQty = Round(Qty / UCS.BaseQty, 0), OrdLooseQty = round(Cast(Qty as int) % Cast(UCS.BaseQty as Int) / UPK.BaseQty, 0) from UOM UCS,UOM UPK Where UCS.ItemNO = InvReport.ItemNO and InvReport.InvBulKUOM = UCS.UOM and UPK.ItemNo = InvReport.ItemNo and UPK.UOM = InvReport.InvLooseUOM";
                    strSQL = "update InvReport Set OrdBulkQty = Round(Cast(Qty as int) / Cast(UCS.BaseQty as Int), 0), OrdLooseQty = round(Cast(Qty as int) % Cast(UCS.BaseQty as Int) / UPK.BaseQty, 0) from UOM UCS,UOM UPK Where UCS.ItemNO = InvReport.ItemNO and InvReport.InvBulKUOM = UCS.UOM and UPK.ItemNo = InvReport.ItemNo and UPK.UOM = InvReport.InvLooseUOM";
                    VehicleAssignmentLog(strSQL); 
                    result = _commonRule.executerQuery(strSQL);

                    //strSQL = "update InvReport Set InvBulkQty = Round(InvQty / UCS.BaseQty, 0), InvLooseQty = round(Cast(InvQty as int) % Cast(UCS.BaseQty as Int) / UPK.BaseQty, 0) from UOM UCS,UOM UPK Where UCS.ItemNO = InvReport.ItemNO and InvReport.InvBulKUOM = UCS.UOM and UPK.ItemNo = InvReport.ItemNo and UPK.UOM = InvReport.InvLooseUOM";
                    strSQL = "update InvReport Set InvBulkQty = Round(Cast(InvQty as int) / Cast(UCS.BaseQty as Int), 0), InvLooseQty = round(Cast(InvQty as int) % Cast(UCS.BaseQty as Int) / UPK.BaseQty, 0) from UOM UCS,UOM UPK Where UCS.ItemNO = InvReport.ItemNO and InvReport.InvBulKUOM = UCS.UOM and UPK.ItemNo = InvReport.ItemNo and UPK.UOM = InvReport.InvLooseUOM";
                    VehicleAssignmentLog(strSQL); 
                    result = _commonRule.executerQuery(strSQL);

                    strSQL = "update InvReport set VarQty = Case when Qty> InvQty then Abs(Qty - InvQty)Else 0 End";
                    VehicleAssignmentLog(strSQL); 
                    result = _commonRule.executerQuery(strSQL);

                    //strSQL = "update InvReport Set VarBulkQty = Round(VarQty / UCS.BaseQty, 0), VarLooseQty = round(Cast(VarQty as int) % Cast(UCS.BaseQty as Int) / UPK.BaseQty, 0) from UOM UCS, UOM UPK Where UCS.ItemNO = InvReport.ItemNO and InvReport.InvBulKUOM = UCS.UOM and UPK.ItemNo = InvReport.ItemNo and UPK.UOM = InvReport.InvLooseUOM";
                    strSQL = "update InvReport Set VarBulkQty = Round(Cast(VarQty as int) / Cast(UCS.BaseQty as Int), 0), VarLooseQty = round(Cast(VarQty as int) % Cast(UCS.BaseQty as Int) / UPK.BaseQty, 0) from UOM UCS, UOM UPK Where UCS.ItemNO = InvReport.ItemNO and InvReport.InvBulKUOM = UCS.UOM and UPK.ItemNo = InvReport.ItemNo and UPK.UOM = InvReport.InvLooseUOM";
                    VehicleAssignmentLog(strSQL); 
                    result = _commonRule.executerQuery(strSQL);
                }

               if (projectName.ToLower() == "jsu" && (UserId.ToString().ToUpper() == "CPDUSER" || UserId.ToString().ToUpper() == "CPDAUUSER"))
                    return RedirectToAction("ReportView1", "Reports", new { InitReport = "select 1 as A", ReportName = "Select 'LoadConsolidatedReportCPD' as ReportName ", LoadReport = "EXEC [dbo].[Report_LoadPicking_CPD]" });
                else
                    return RedirectToAction("ReportView1", "Reports", new { InitReport = "select 1 as A", ReportName = "Select 'LoadConsolidatedReport' as ReportName ", LoadReport = "select * from InvReport" });


            }
            catch (Exception ex)
            {

            }
            return View();

        }

        public ActionResult LoadConsolidatedReport1(string strInvNo, string sRptName)
        {
            try
            {

                conn = new SqlConnection(constr);

                var query = " Delete from InvReport ";
                VehicleAssignmentLog(query);
                var result = _commonRule.executerQuery(query);
                // objDo.ExecuteSQL("Delete from InvReport");

                //   SqlDataReader rs;
                int iIndex = 0;
                // int i = 0;
                string sAgentID = "";


                //objDo.ExecuteSQL("Delete from InvReport");
                string strSQL = "";
                SqlDataReader dtr;
                string oldShipAgent = "";

                if ((strInvNo != ""))
                {
                    strSQL = ("insert into InvReport(InvNo,CustName,ItemNo,Description,Location,BaseUOM,Qty" +
                  ") " + (@"select '','' as ShipAgent, A.ItemNO,A.ItemName as Description,A.Name as Location,'PD' as BaseUOM,A.Qty from (select OrdItem.ItemNo,Item.ItemName, sum(Qty) as Qty,OrdItem.Location, Location.Name from OrdItem Inner Join OrderHDR  on OrderHDr.OrdNo=OrdItem.OrdNO inner join Item On OrdItem.ItemNo=Item.ItemNo inner join Location on Location.Code=OrdItem.Location where OrderHdr.OrdNo in ("
                              + (strInvNo + ") group by OrdItem.ItemNO,Item.ItemName,OrdItem.Location,Location.Name) as A ")));
                    // objDo.ExecuteSQL(strSQL);
                    VehicleAssignmentLog(strSQL);
                    result = _commonRule.executerQuery(strSQL);
                }

                return RedirectToAction("ReportView1", "Reports", new { InitReport = "select 1 as A", ReportName = "Select 'LoadConsolidatedReport' as ReportName ", LoadReport = "select * from InvReport" });

                //ExecuteReport1(dtInvReport1, sRptName, "", "", objDo);
            }
            catch (Exception ex)
            {
                //System.IO.File.AppendAllText((Application.StartupPath + "\\Vehicle_Assignment_Log.txt"), ("LoadConsolidateReport: "
                //                + (ex.Message + "\r\n")));
            }
            return View();

        }


        public ActionResult LoadStockVarianceReport()
        {
            try
            {
                var userId = Session["UserId"];
               
                return RedirectToAction("ReportView1", "Reports", new { InitReport = "select 1 as A", ReportName = "Select 'StockVarianceRep' as ReportName ", LoadReport = " select ItemNo,Description,BaseUOM,Qty,OrdBulkUOm,OrdBulkQty,OrdLooseUOM,OrdLooseQty,InvUOM,InvQty,InvBulkUOM,InvBulkQty,InvLooseUOM,InvLooseQty,VarUOM,VarQty,VarBulkUOM,VarBulkQty,VarLooseUOM,VarLooseQty,Location from InvReport  where Qty > InvQty and  Qty<> 0  order by CustName " });
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
            }
            return View();
        }


        public ActionResult LoadStockVarianceReport_PVM()
        {
            try
            {
                return RedirectToAction("ReportView1", "Reports", new { InitReport = "select 1 as A", ReportName = "Select 'StockVarianceRep' as ReportName ", LoadReport = "select * from ( select ItemNo,Description,BaseUOM,SUM(Qty) Qty,InvUOM,InvQty,VarUOM,(InvQty-SUM(Qty)) as varqty,Location from InvReport  GROUP BY ItemNo,Description,BaseUOM,InvUOM,InvQty,VarUOM,Location,CustName  ) A where varqty <0  " });
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
            }
            return View();
        }



        //public void LoadInvoiceReport(string strInvNo, string sRptName)
        public ActionResult LoadInvoiceReport(string strInvNo, string sRptName, string typeNo)
        {
            try
            {
                object dInvTotalAmt = 0;
                //double dLineGSTAmt = 0;
                //double dInvHdrDisPer = 0;
                //string sAmountInWords = "";
                string sAgentID = "";
                string NodeTreeType = "";
                string NodeTreeValue = "";
                string strSql = "SELECT NodeTreeType,NodeTreeValue from SalesAgent Where SalesAgent.UserID='" + Session["UserId"] + "'";

                VehicleAssignmentLog(strSql);

                conn = new SqlConnection(constr);
                conn.Open();
                SqlCommand cmd = new SqlCommand(strSql, conn);

                using (SqlDataReader rs = cmd.ExecuteReader())
                {
                    while ((rs.Read() == true))
                    {
                        //       NodeTreeType = (IsDBNull(rs["NodeTreeType"]) ? "" : rs["NodeTreeType"]);
                        //NodeTreeValue = (IsDBNull(rs["NodeTreeValue"]) ? "" : rs["NodeTreeValue"]);
                        NodeTreeType = rs["NodeTreeType"] == null ? "" : rs["NodeTreeType"].ToString();
                        NodeTreeValue = rs["NodeTreeValue"] == null ? "" : rs["NodeTreeValue"].ToString();
                    }
                }
                conn.Close();


                strSql = "";
                if ((NodeTreeType == "SALES TERRITORY"))
                {
                    strSql = "SELECT Distinct Name from Location inner join NodeTree on NodeTree.SalesOfficeID=Location.Code Where " +
                    "NodeTree.SalesManTerritory= '" + NodeTreeValue + "'";
                }
                else if ((NodeTreeType == "SALES OFFICE"))
                {
                    strSql = "SELECT Distinct Name from Location Where Code='" + NodeTreeValue + "'";
                }
                else if ((NodeTreeType == "DISTRIBUTOR"))
                {
                    strSql = "SELECT Distinct DistributorName as Name from Distributor Where DistributorID='" + NodeTreeValue + "'";
                }
                else
                {
                    sAgentID = NodeTreeValue;
                }

                if ((strSql != ""))
                {
                    VehicleAssignmentLog(strSql);

                    conn.Open();
                    cmd = new SqlCommand(strSql, conn);
                    using (SqlDataReader rs = cmd.ExecuteReader())
                    {
                        while ((rs.Read() == true))
                        {
                            NodeTreeType = rs["Name"] == null ? "" : rs["Name"].ToString();
                        }
                    }
                    conn.Close();


                }

                var query = "Delete from InvoiceReport";
                VehicleAssignmentLog(query);
                var result = _commonRule.executerQuery(query);

                strSql = "drop table if exists InvoiceReport  \n";
                strSql += "SELECT Invoice.SalesCoord, CASE WHEN isnull(InvItem.Remarks,'') <> '' THEN InvItem.[Description] + char(13) + InvItem.Remarks ELSE InvItem.[Description] END as Description, \n";
                strSql += "InvItem.[LineNo] as Line, InvItem.ItemNo, Customer.CustNo, Customer.CustName, Customer.Address as Add1, Customer.Address2 as Add2, Customer.Address3 as Add3, \n";
                strSql += "Customer.City  as Add4, Customer.Phone, \n";
                strSql += "Customer.ContactPerson as Attn, isnull(Customer.FaxNo,'') as Fax, isnull(Invoice.Remarks,'') as Remarks, '*' + Invoice.InvNo + '*' AS InvNo, Invoice.InvDt as InvDate, Invoice.PoNo, \n";
                strSql += "Customer.SalesAgent as AgentId, (select Description From PayTerms Where Code=Customer.PaymentTerms) as Terms, InvItem.Qty/UOM.BASEQTY AS QTY, InvItem.Price*UOM.BASEQTY AS Price,0 as SpecialQty, InvItem.SubAmt, \n";
                strSql += "Invoice.SubTotal, Invoice.GST, Invoice.GstAmt, Invoice.TotalAmt, Item.AssemblyBOM, InvItem.CustItemNo as ChineseDesc, \n";
                strSql += "InvItem.AddQty, InvItem.AddUOM as Location, UOM.UOM as BaseUOM, '' as AmountinWords, isnull(InvItem.Remarks,'') as LineRemarks, \n";
                strSql += "Customer.ShipName, InvItem.Qty as DryQty, \n";
                strSql += "InvItem.Qty As ChillQty, InvItem.UOM as ShipAdd3, InvItem.UOM as ShipAdd4, \n";
                strSql += "isnull(Invoice.ShipCity,'') as ShipCity, isnull(Invoice.ShipPin,'') as ShipPost, isnull(Invoice.Discount,0) as OthersQty, isnull(InvItem.PackingSize,'') as PickingList, isnull(Invoice.PoNo,'') as LotNo, \n";
                strSql += "isnull(Invoice.ConfirmedBy,'') as ConfirmedBy, isnull(Invoice.CurCode,'') as CurCode, isnull(Invoice.DisPer,0) as DisPer, '" + sAgentID + "' as PrintedBy,OrderHDR.ORDDT as ExpiryDate,Customer.PaymentMethod as RefNo,CUSTOMER.GSTNO as DONO   into InvoiceReport  FROM Customer INNER JOIN \n";
                strSql += "Invoice ON Customer.CustNo = Invoice.CustId INNER JOIN ORDERHDR on ORDERHDR.ORDNO=INVOICE.ORDNO INNER JOIN InvItem ON Invoice.InvNo = InvItem.InvNo INNER JOIN UOM ON UOM.ITEMNO=INVITEM.ITEMNO and UOM.UOM=INVITEM.UOM inner join Item ON \n";
                // strSql += "InvItem.ItemNo = Item.ItemNo where Invoice.OrdNo IN ( " + strInvNo + ") \n";
                if (typeNo == "order")
                    strSql += "InvItem.ItemNo = Item.ItemNo where Invoice.OrdNo IN ( " + strInvNo + ") \n";
                else
                    strSql += "InvItem.ItemNo = Item.ItemNo where Invoice.InvNo IN ( " + strInvNo + ") \n";
                //strSql += "Union SELECT Invoice.SalesCoord, CASE WHEN isnull(InvItem.Remarks,'') <> '' THEN InvItem.[Description] + char(13) + InvItem.Remarks ELSE InvItem.[Description] END as Description, \n";
                //strSql += "InvItem.[LineNo] as Line, InvItem.ItemNo, NewCust.CustID as CustNO, NewCust.CustName, NewCust.Address as Add1, NewCust.Address2 as Add2, Barangay.BarangayName as Add3, \n";
                //strSql += "CASE WHEN NewCust.City IS NULL THEN '' ELSE ISNULL(COUNTRY.NAME,'') +', '+ B1.CityName + ' - ' END + isnull(NewCust.Pin,'') as Add4, NewCust.Phone, \n";
                //strSql += "NewCust.Contact as Attn, '' as Fax, isnull(Invoice.Remarks,'') as Remarks, '*' + Invoice.InvNo + '*' AS InvNo, Invoice.InvDt as InvDate, Invoice.PoNo, \n";
                //strSql += "NewCust.AgentId,(select Description From PayTerms Where Code=NewCust.PaymentTerms) as Terms, InvItem.Qty/UOM.BASEQTY AS QTY, InvItem.Price*UOM.BASEQTY AS Price,Invoice.EwtAmt as SpecialQty, InvItem.SubAmt, \n";
                //strSql += "Invoice.SubTotal, Invoice.GST, Invoice.GstAmt, Invoice.TotalAmt, Item.AssemblyBOM, InvItem.CustItemNo as ChineseDesc, \n";
                //strSql += "InvItem.AddQty, InvItem.AddUOM as Location, UOM.UOM as BaseUOM, '' as AmountinWords, isnull(InvItem.Remarks,'') as LineRemarks, \n";
                //strSql += "'' as ShipName, (select CAST(ISNULL(InvItem.Qty/UOM.BaseQty,0) As Integer) from UOM where UOM.ItemNO=InvItem.ItemNO and UOM.UOM='CS') as DryQty, \n";
                //strSql += "(select round((select ISNULL((CAST(InvItem.Qty As Integer) % CAST(UOM.BaseQty AS Integer)),0) from UOM Where UOM.UOM='CS' and UOM.ItemNO=InvItem.ItemNO)/UOM.BaseQty,0) from UOM where UOM.ItemNO=InvItem.ItemNO and UOM.UOM='PK') As ChillQty, 'CS' as ShipAdd3, 'PK' as ShipAdd4, \n";
                //strSql += "isnull(Invoice.ShipCity,'') as ShipCity, isnull(Invoice.ShipPin,'') as ShipPost, isnull(Invoice.Discount,0) as OthersQty, isnull(InvItem.PackingSize,'') as PickingList, isnull(Invoice.PoNo,'') as LotNo, \n";
                //strSql += "isnull(Invoice.ConfirmedBy,'') as ConfirmedBy, isnull(Invoice.CurCode,'') as CurCode, isnull(Invoice.DisPer,0) as DisPer,  '" + sAgentID + "' as PrintedBy,OrderHDR.ORDDT as ExpiryDate,'' as RefNo,'' as DONO  FROM NewCust INNER JOIN \n";
                //strSql += "Invoice ON NewCust.CustID = Invoice.CustId INNER JOIN ORDERHDR on ORDERHDR.ORDNO=INVOICE.ORDNO INNER JOIN InvItem ON Invoice.InvNo = InvItem.InvNo INNER JOIN UOM ON UOM.ITEMNO=INVITEM.ITEMNO and UOM.UOM='CS' Left JOIN BARANGAY ON BARANGAY.CODE=NewCust.Barangay inner join BARANGAY B1 on B1.CityCode=NewCust.City inner join Country on Country.Code=NewCust.Province inner join Item ON \n";
                //if (typeNo == "order")
                //    strSql += "InvItem.ItemNo = Item.ItemNo where Invoice.OrdNo IN ( " + strInvNo + ") \n";
                //else
                //    strSql += "InvItem.ItemNo = Item.ItemNo where Invoice.InvNo IN ( " + strInvNo + ") \n";
                strSql += " order by [LineNo]";

                VehicleAssignmentLog(strSql);
                _commonRule.executerQuery(strSql);
                return RedirectToAction("ReportView1", "Reports", new { InitReport = "select 1 as A", ReportName = "Select 'LoadInvoiceRep' as ReportName ", LoadReport = "select * from InvoiceReport" });

            }


            catch (Exception ex)
            {
                /// MsgBox(ex.Message);
                return View();
                /// 
            }

            // frmStatus.Close()
        }
        public ActionResult LoadInvoiceReport_POC(string strInvNo, string sRptName, string typeNo)
        {
            try
            {
                object dInvTotalAmt = 0;
                //double dLineGSTAmt = 0;
                //double dInvHdrDisPer = 0;
                //string sAmountInWords = "";
                string sAgentID = "";
                string NodeTreeType = "";
                string NodeTreeValue = "";
                string strSql = "SELECT Code from SalesAgent Where SalesAgent.UserID='" + Session["UserId"] + "'";

                VehicleAssignmentLog(strSql);

                conn = new SqlConnection(constr);
                conn.Open();
                SqlCommand cmd = new SqlCommand(strSql, conn);

                using (SqlDataReader rs = cmd.ExecuteReader())
                {
                    while ((rs.Read() == true))
                    {
                        //       NodeTreeType = (IsDBNull(rs["NodeTreeType"]) ? "" : rs["NodeTreeType"]);
                        //NodeTreeValue = (IsDBNull(rs["NodeTreeValue"]) ? "" : rs["NodeTreeValue"]);
                        NodeTreeValue = rs["Code"] == null ? "" : rs["Code"].ToString();
                    }
                }
                conn.Close();


                strSql = "";

                sAgentID = NodeTreeValue;

                if ((strSql != ""))
                {
                    conn.Open();
                    cmd = new SqlCommand(strSql, conn);
                    using (SqlDataReader rs = cmd.ExecuteReader())
                    {
                        while ((rs.Read() == true))
                        {
                            NodeTreeType = rs["Name"] == null ? "" : rs["Name"].ToString();
                        }
                    }
                    conn.Close();


                }

                var query = "Delete from InvoiceReport";
                VehicleAssignmentLog(query);
                var result = _commonRule.executerQuery(query);

                strSql = "drop table InvoiceReport \n";
                strSql += "SELECT Invoice.SalesCoord, CASE WHEN isnull(InvItem.Remarks,'') <> '' THEN InvItem.[Description] + char(13) + InvItem.Remarks ELSE InvItem.[Description] END as Description, \n";
                strSql += "InvItem.[LineNo] as Line, InvItem.ItemNo, Customer.CustNo, Customer.CustName, Customer.Address as Add1, Customer.Address2 as Add2, Customer.Address3 as Add3, \n";
                strSql += "Customer.City  as Add4, Customer.Phone, \n";
                strSql += "Customer.ContactPerson as Attn, isnull(Customer.FaxNo,'') as Fax, isnull(Invoice.Remarks,'') as Remarks, '*' + Invoice.InvNo + '*' AS InvNo, Invoice.InvDt as InvDate, Invoice.PoNo, \n";
                strSql += "Customer.SalesAgent as AgentId, (select Description From PayTerms Where Code=Customer.PaymentTerms) as Terms, InvItem.Qty/UOM.BASEQTY AS QTY, InvItem.Price*UOM.BASEQTY AS Price,0 as SpecialQty, InvItem.SubAmt, \n";
                strSql += "Invoice.SubTotal, Invoice.GST, Invoice.GstAmt, Invoice.TotalAmt, Item.AssemblyBOM, InvItem.CustItemNo as ChineseDesc, \n";
                strSql += "InvItem.AddQty, InvItem.AddUOM as Location, UOM.UOM as BaseUOM, '' as AmountinWords, isnull(InvItem.Remarks,'') as LineRemarks, \n";
                strSql += "Customer.ShipName, InvItem.Qty as DryQty, \n";
                strSql += "InvItem.Qty As ChillQty, InvItem.UOM as ShipAdd3, InvItem.UOM as ShipAdd4, \n";
                strSql += "isnull(Invoice.ShipCity,'') as ShipCity, isnull(Invoice.ShipPin,'') as ShipPost, isnull(Invoice.Discount,0) as OthersQty, isnull(InvItem.PackingSize,'') as PickingList, isnull(Invoice.PoNo,'') as LotNo, \n";
                strSql += "isnull(Invoice.ConfirmedBy,'') as ConfirmedBy, isnull(Invoice.CurCode,'') as CurCode, isnull(Invoice.DisPer,0) as DisPer, '" + sAgentID + "' as PrintedBy,OrderHDR.ORDDT as ExpiryDate,Customer.PaymentMethod as RefNo,CUSTOMER.GSTNO as DONO   into InvoiceReport  FROM Customer INNER JOIN \n";
                strSql += "Invoice ON Customer.CustNo = Invoice.CustId INNER JOIN ORDERHDR on ORDERHDR.ORDNO=INVOICE.ORDNO INNER JOIN InvItem ON Invoice.InvNo = InvItem.InvNo INNER JOIN UOM ON UOM.ITEMNO=INVITEM.ITEMNO and UOM.UOM=INVITEM.UOM inner join Item ON \n";
                // strSql += "InvItem.ItemNo = Item.ItemNo where Invoice.OrdNo IN ( " + strInvNo + ") \n";
                if (typeNo == "order")
                    strSql += "InvItem.ItemNo = Item.ItemNo where Invoice.OrdNo IN ( " + strInvNo + ") \n";
                else
                    strSql += "InvItem.ItemNo = Item.ItemNo where Invoice.InvNo IN ( " + strInvNo + ") \n";
                //strSql += "Union SELECT Invoice.SalesCoord, CASE WHEN isnull(InvItem.Remarks,'') <> '' THEN InvItem.[Description] + char(13) + InvItem.Remarks ELSE InvItem.[Description] END as Description, \n";
                //strSql += "InvItem.[LineNo] as Line, InvItem.ItemNo, NewCust.CustID as CustNO, NewCust.CustName, NewCust.Address as Add1, NewCust.Address2 as Add2, Barangay.BarangayName as Add3, \n";
                //strSql += "CASE WHEN NewCust.City IS NULL THEN '' ELSE ISNULL(COUNTRY.NAME,'') +', '+ B1.CityName + ' - ' END + isnull(NewCust.Pin,'') as Add4, NewCust.Phone, \n";
                //strSql += "NewCust.Contact as Attn, '' as Fax, isnull(Invoice.Remarks,'') as Remarks, '*' + Invoice.InvNo + '*' AS InvNo, Invoice.InvDt as InvDate, Invoice.PoNo, \n";
                //strSql += "NewCust.AgentId,(select Description From PayTerms Where Code=NewCust.PaymentTerms) as Terms, InvItem.Qty/UOM.BASEQTY AS QTY, InvItem.Price*UOM.BASEQTY AS Price,Invoice.EwtAmt as SpecialQty, InvItem.SubAmt, \n";
                //strSql += "Invoice.SubTotal, Invoice.GST, Invoice.GstAmt, Invoice.TotalAmt, Item.AssemblyBOM, InvItem.CustItemNo as ChineseDesc, \n";
                //strSql += "InvItem.AddQty, InvItem.AddUOM as Location, UOM.UOM as BaseUOM, '' as AmountinWords, isnull(InvItem.Remarks,'') as LineRemarks, \n";
                //strSql += "'' as ShipName, (select CAST(ISNULL(InvItem.Qty/UOM.BaseQty,0) As Integer) from UOM where UOM.ItemNO=InvItem.ItemNO and UOM.UOM='CS') as DryQty, \n";
                //strSql += "(select round((select ISNULL((CAST(InvItem.Qty As Integer) % CAST(UOM.BaseQty AS Integer)),0) from UOM Where UOM.UOM='CS' and UOM.ItemNO=InvItem.ItemNO)/UOM.BaseQty,0) from UOM where UOM.ItemNO=InvItem.ItemNO and UOM.UOM='PK') As ChillQty, 'CS' as ShipAdd3, 'PK' as ShipAdd4, \n";
                //strSql += "isnull(Invoice.ShipCity,'') as ShipCity, isnull(Invoice.ShipPin,'') as ShipPost, isnull(Invoice.Discount,0) as OthersQty, isnull(InvItem.PackingSize,'') as PickingList, isnull(Invoice.PoNo,'') as LotNo, \n";
                //strSql += "isnull(Invoice.ConfirmedBy,'') as ConfirmedBy, isnull(Invoice.CurCode,'') as CurCode, isnull(Invoice.DisPer,0) as DisPer,  '" + sAgentID + "' as PrintedBy,OrderHDR.ORDDT as ExpiryDate,'' as RefNo,'' as DONO  FROM NewCust INNER JOIN \n";
                //strSql += "Invoice ON NewCust.CustID = Invoice.CustId INNER JOIN ORDERHDR on ORDERHDR.ORDNO=INVOICE.ORDNO INNER JOIN InvItem ON Invoice.InvNo = InvItem.InvNo INNER JOIN UOM ON UOM.ITEMNO=INVITEM.ITEMNO and UOM.UOM='CS' Left JOIN BARANGAY ON BARANGAY.CODE=NewCust.Barangay inner join BARANGAY B1 on B1.CityCode=NewCust.City inner join Country on Country.Code=NewCust.Province inner join Item ON \n";
                //if (typeNo == "order")
                //    strSql += "InvItem.ItemNo = Item.ItemNo where Invoice.OrdNo IN ( " + strInvNo + ") \n";
                //else
                //    strSql += "InvItem.ItemNo = Item.ItemNo where Invoice.InvNo IN ( " + strInvNo + ") \n";
                strSql += " order by [LineNo]";

                VehicleAssignmentLog(strSql);
                _commonRule.executerQuery(strSql);
                return RedirectToAction("ReportView1", "Reports", new { InitReport = "select 1 as A", ReportName = "Select 'LoadInvoiceRep' as ReportName ", LoadReport = "select * from InvoiceReport" });

            }


            catch (Exception ex)
            {
                /// MsgBox(ex.Message);
                return View();
                /// 
            }

            // frmStatus.Close()
        }
        public ActionResult LoadInvoiceReportJSU(string strInvNo, string sRptName, string typeNo)
        {
            try
            {
                strInvNo = ReplaceSpecialCharacter(strInvNo);
                object dInvTotalAmt = 0;
                //double dLineGSTAmt = 0;
                //double dInvHdrDisPer = 0;
                //string sAmountInWords = "";
                string sAgentID = "";
                string NodeTreeType = "";
                string NodeTreeValue = "";
                var userId = Session["UserId"];
                string strSql = "SELECT NodeTreeType,NodeTreeValue from SalesAgent Where SalesAgent.UserID='" + Session["UserId"] + "'";

                VehicleAssignmentLog(strSql);

                conn = new SqlConnection(constr);
                conn.Open();
                SqlCommand cmd = new SqlCommand(strSql, conn);

                using (SqlDataReader rs = cmd.ExecuteReader())
                {
                    while ((rs.Read() == true))
                    {
                        //       NodeTreeType = (IsDBNull(rs["NodeTreeType"]) ? "" : rs["NodeTreeType"]);
                        //NodeTreeValue = (IsDBNull(rs["NodeTreeValue"]) ? "" : rs["NodeTreeValue"]);
                        NodeTreeType = rs["NodeTreeType"] == null ? "" : rs["NodeTreeType"].ToString();
                        NodeTreeValue = rs["NodeTreeValue"] == null ? "" : rs["NodeTreeValue"].ToString();
                    }
                }
                conn.Close();


                strSql = "";
                if ((NodeTreeType == "SALES TERRITORY"))
                {
                    strSql = "SELECT Distinct Name from Location inner join NodeTree on NodeTree.SalesOfficeID=Location.Code Where " +
                    "NodeTree.SalesManTerritory= '" + NodeTreeValue + "'";
                }
                else if ((NodeTreeType == "SALES OFFICE"))
                {
                    strSql = "SELECT Distinct Name from Location Where Code='" + NodeTreeValue + "'";
                }
                else if ((NodeTreeType == "DISTRIBUTOR"))
                {
                    strSql = "SELECT Distinct DistributorName as Name from Distributor Where DistributorID='" + NodeTreeValue + "'";
                }
                else
                {
                    sAgentID = NodeTreeValue;
                }

                if ((strSql != ""))
                {
                    VehicleAssignmentLog(strSql);

                    conn.Open();
                    cmd = new SqlCommand(strSql, conn);
                    using (SqlDataReader rs = cmd.ExecuteReader())
                    {
                        while ((rs.Read() == true))
                        {
                            NodeTreeType = rs["Name"] == null ? "" : rs["Name"].ToString();
                        }
                    }
                    conn.Close();


                }

                var query = "Delete from InvoiceReport_" + userId + "";
                VehicleAssignmentLog(query);
                var result = _commonRule.executerQuery(query);

                strSql = "DROP TABLE IF EXISTS   InvoiceReport_" + userId + " \n";
                // strSql = "drop table InvoiceReport_" + userId + " \n";
                strSql += " Select  ROW_NUMBER() OVER (Order BY InvNo) as SNo,A.* into InvoiceReport_" + userId + " from (";
                strSql += "SELECT Invoice.SalesCoord, CASE WHEN isnull(InvItem.Remarks,'') <> '' THEN InvItem.[Description] + char(13) + InvItem.Remarks ELSE InvItem.[Description] END as Description, \n";
                strSql += "InvItem.[LineNo] as Line, InvItem.ItemNo, Customer.CustNo, Customer.CustName, Customer.Address as Add1, Customer.Address2 as Add2, Barangay.BarangayName as Add3, \n";
                strSql += "CASE WHEN Customer.City IS NULL THEN '' ELSE ISNULL(COUNTRY.NAME,'') +', '+ Barangay.CityName + ' - ' END + isnull(Customer.PostCode,'') as Add4, Customer.Phone, \n";
                strSql += "Customer.ContactPerson as Attn, isnull(Customer.FaxNo,'') as Fax, isnull(Invoice.Remarks,'') as Remarks, '*' + Invoice.InvNo + '*' AS InvNo, Invoice.InvDt as InvDate, Invoice.PoNo, \n";
                strSql += "Customer.SalesAgent as AgentId, (select Description From PayTerms Where Code=Customer.PaymentTerms) as Terms, InvItem.Qty/UOM.BASEQTY AS QTY, InvItem.Price*UOM.BASEQTY AS Price,Invoice.EwtAmt as SpecialQty, InvItem.SubAmt, \n";
                strSql += "Invoice.SubTotal, Invoice.GST, Invoice.GstAmt, Invoice.TotalAmt, Item.AssemblyBOM, InvItem.CustItemNo as ChineseDesc, \n";
                strSql += "InvItem.AddQty, InvItem.AddUOM as Location, UOM.UOM as BaseUOM, '' as AmountinWords, isnull(InvItem.Remarks,'') as LineRemarks, \n";
                strSql += " Customer.ShipName, \n";
                //As per Sudhakar Instruction changes made 05.12.2023
                //strSql += " CONVERT(INT,(select [dbo].[fn_UOM_BULKQTY](InvItem.ItemNo,InvItem.Qty))) as DryQty, \n";

                strSql += " CONVERT(INT, FLOOR(CAST(Invitem.Qty AS DECIMAL) / (SELECT UOM.BaseQty FROM UOM WHERE UOM.UOM = Item.bulkuom AND UOM.ITemNo = InvItem.ItemNO))) As DryQty,\n";

                //Old ChillQty Changed as per Sudhakar Instruction on 05.12.2023
                strSql += " CAST(ROUND(CAST(InvItem.Qty AS DECIMAL) / (SELECT UOM.BaseQty FROM UOM WHERE UOM.UOM = Item.bulkuom AND UOM.ITemNo = InvItem.ItemNO) % 1 * \n";
                strSql += " (SELECT UOM.BaseQty FROM UOM WHERE UOM.UOM = Item.Bulkuom AND UOM.ITemNo = InvItem.ItemNO) / (SELECT UOM.BaseQty FROM UOM WHERE UOM.UOM = Item.looseuom AND UOM.ITemNo = InvItem.ItemNO),  0) AS INT) as ChillQty, \n";

                //strSql += "CONVERT(INT,(select [dbo].[fn_UOM_LOOSEQTY](InvItem.ItemNo,InvItem.Qty))) As ChillQty, \n";

                strSql += " 'CS' as ShipAdd3, 'PK' as ShipAdd4, \n";

                strSql += "isnull(Invoice.ShipCity,'') as ShipCity, isnull(Invoice.ShipPin,'') as ShipPost, isnull(Invoice.Discount,0) as OthersQty, isnull(InvItem.PackingSize,'') as PickingList, isnull(Invoice.PoNo,'') as LotNo, \n";
                strSql += "isnull(Invoice.ConfirmedBy,'') as ConfirmedBy, isnull(Invoice.CurCode,'') as CurCode, isnull(Invoice.DisPer,0) as DisPer, '" + sAgentID + "' as PrintedBy,OrderHDR.ORDDT as ExpiryDate,Customer.PaymentMethod as RefNo,CUSTOMER.GSTNO as DONO,Invoice.TxnType,Invoice.BIRNo,Invoice.BIRNoDamaged FROM Customer INNER JOIN \n";
                strSql += "Invoice ON Customer.CustNo = Invoice.CustId INNER JOIN ORDERHDR on ORDERHDR.ORDNO=INVOICE.ORDNO INNER JOIN InvItem ON Invoice.InvNo = InvItem.InvNo INNER JOIN UOM ON UOM.ITEMNO=INVITEM.ITEMNO and UOM.UOM='CS' INNER JOIN BARANGAY ON BARANGAY.CODE=CUSTOMER.ADDRESS3 inner join Country on Country.Code=Customer.Address4 inner join Item ON \n";
                // strSql += "InvItem.ItemNo = Item.ItemNo where Invoice.OrdNo IN ( " + strInvNo + ") \n";
                if (typeNo == "order")
                    strSql += "InvItem.ItemNo = Item.ItemNo where Invoice.OrdNo IN ( " + strInvNo + ") \n";
                else
                    strSql += "InvItem.ItemNo = Item.ItemNo where Invoice.InvNo IN ( " + strInvNo + ") \n";
                strSql += "Union SELECT Invoice.SalesCoord, CASE WHEN isnull(InvItem.Remarks,'') <> '' THEN InvItem.[Description] + char(13) + InvItem.Remarks ELSE InvItem.[Description] END as Description, \n";
                strSql += "InvItem.[LineNo] as Line, InvItem.ItemNo, NewCust.CustID as CustNO, NewCust.CustName, NewCust.Address as Add1, NewCust.Address2 as Add2, Barangay.BarangayName as Add3, \n";
                strSql += "CASE WHEN NewCust.City IS NULL THEN '' ELSE ISNULL(COUNTRY.NAME,'') +', '+ B1.CityName + ' - ' END + isnull(NewCust.Pin,'') as Add4, NewCust.Phone, \n";
                strSql += "NewCust.Contact as Attn, '' as Fax, isnull(Invoice.Remarks,'') as Remarks, '*' + Invoice.InvNo + '*' AS InvNo, Invoice.InvDt as InvDate, Invoice.PoNo, \n";
                strSql += "NewCust.AgentId,(select Description From PayTerms Where Code=NewCust.PaymentTerms) as Terms, InvItem.Qty/UOM.BASEQTY AS QTY, InvItem.Price*UOM.BASEQTY AS Price,Invoice.EwtAmt as SpecialQty, InvItem.SubAmt, \n";
                strSql += "Invoice.SubTotal, Invoice.GST, Invoice.GstAmt, Invoice.TotalAmt, Item.AssemblyBOM, InvItem.CustItemNo as ChineseDesc, \n";
                strSql += "InvItem.AddQty, InvItem.AddUOM as Location, UOM.UOM as BaseUOM, '' as AmountinWords, isnull(InvItem.Remarks,'') as LineRemarks, \n";
                strSql += "'' as ShipName, \n";

                //As per Sudhakar Instruction changes made 05.12.2023
                //strSql += " CONVERT(INT,(select [dbo].[fn_UOM_BULKQTY](InvItem.ItemNo,InvItem.Qty))) as DryQty, \n";
                strSql += " CONVERT(INT, FLOOR(CAST(Invitem.Qty AS DECIMAL) / (SELECT UOM.BaseQty FROM UOM WHERE UOM.UOM = Item.bulkuom AND UOM.ITemNo = InvItem.ItemNO))) As DryQty,\n";

                //Old ChillQty Changed as per Sudhakar Instruction on 05.12.2023
                //strSql += "CONVERT(INT,(select [dbo].[fn_UOM_LOOSEQTY](InvItem.ItemNo,InvItem.Qty))) As ChillQty, \n";
                strSql += " CAST(ROUND(CAST(InvItem.Qty AS DECIMAL) / (SELECT UOM.BaseQty FROM UOM WHERE UOM.UOM = Item.bulkuom AND UOM.ITemNo = InvItem.ItemNO) % 1 * \n";
                strSql += " (SELECT UOM.BaseQty FROM UOM WHERE UOM.UOM = Item.Bulkuom AND UOM.ITemNo = InvItem.ItemNO) / (SELECT UOM.BaseQty FROM UOM WHERE UOM.UOM = Item.looseuom AND UOM.ITemNo = InvItem.ItemNO),  0) AS INT) as ChillQty, \n";

                strSql += " 'CS' as ShipAdd3, 'PK' as ShipAdd4, \n";
                strSql += "isnull(Invoice.ShipCity,'') as ShipCity, isnull(Invoice.ShipPin,'') as ShipPost, isnull(Invoice.Discount,0) as OthersQty, isnull(InvItem.PackingSize,'') as PickingList, isnull(Invoice.PoNo,'') as LotNo, \n";
                strSql += "isnull(Invoice.ConfirmedBy,'') as ConfirmedBy, isnull(Invoice.CurCode,'') as CurCode, isnull(Invoice.DisPer,0) as DisPer,  '" + sAgentID + "' as PrintedBy,OrderHDR.ORDDT as ExpiryDate,'' as RefNo,'' as DONO,Invoice.TxnType,Invoice.BIRNo,Invoice.BIRNoDamaged  FROM NewCust INNER JOIN \n";
                strSql += "Invoice ON NewCust.CustID = Invoice.CustId INNER JOIN ORDERHDR on ORDERHDR.ORDNO=INVOICE.ORDNO INNER JOIN InvItem ON Invoice.InvNo = InvItem.InvNo INNER JOIN UOM ON UOM.ITEMNO=INVITEM.ITEMNO and UOM.UOM='CS' Left JOIN BARANGAY ON BARANGAY.CODE=NewCust.Barangay inner join BARANGAY B1 on B1.CityCode=NewCust.City inner join Country on Country.Code=NewCust.Province inner join Item ON \n";
                if (typeNo == "order")
                    strSql += "InvItem.ItemNo = Item.ItemNo where Invoice.OrdNo IN ( " + strInvNo + ") \n";
                else
                    strSql += "InvItem.ItemNo = Item.ItemNo where Invoice.InvNo IN ( " + strInvNo + ") \n";
                strSql += " ) A";



                //strSql = "DROP TABLE IF EXISTS   InvoiceReport_" + userId + " \n";
                //// strSql = "drop table InvoiceReport_" + userId + " \n";
                //strSql += " Select  ROW_NUMBER() OVER (Order BY InvNo) as SNo,A.* into InvoiceReport_" + userId + " from (";
                //strSql += "SELECT Invoice.SalesCoord, CASE WHEN isnull(InvItem.Remarks,'') <> '' THEN InvItem.[Description] + char(13) + InvItem.Remarks ELSE InvItem.[Description] END as Description, \n";
                //strSql += "InvItem.[LineNo] as Line, InvItem.ItemNo, Customer.CustNo, Customer.CustName, Customer.Address as Add1, Customer.Address2 as Add2, Barangay.BarangayName as Add3, \n";
                //strSql += "CASE WHEN Customer.City IS NULL THEN '' ELSE ISNULL(COUNTRY.NAME,'') +', '+ Barangay.CityName + ' - ' END + isnull(Customer.PostCode,'') as Add4, Customer.Phone, \n";
                //strSql += "Customer.ContactPerson as Attn, isnull(Customer.FaxNo,'') as Fax, isnull(Invoice.Remarks,'') as Remarks, '*' + Invoice.InvNo + '*' AS InvNo, Invoice.InvDt as InvDate, Invoice.PoNo, \n";
                //strSql += "Customer.SalesAgent as AgentId, (select Description From PayTerms Where Code=Customer.PaymentTerms) as Terms, InvItem.Qty/UOM.BASEQTY AS QTY, InvItem.Price*UOM.BASEQTY AS Price,Invoice.EwtAmt as SpecialQty, InvItem.SubAmt, \n";
                //strSql += "Invoice.SubTotal, Invoice.GST, Invoice.GstAmt, Invoice.TotalAmt, Item.AssemblyBOM, InvItem.CustItemNo as ChineseDesc, \n";
                //strSql += "InvItem.AddQty, InvItem.AddUOM as Location, UOM.UOM as BaseUOM, '' as AmountinWords, isnull(InvItem.Remarks,'') as LineRemarks, \n";
                //strSql += "Customer.ShipName, (select CAST(ISNULL(InvItem.Qty/UOM.BaseQty,0) As Integer) from UOM where UOM.ItemNO=InvItem.ItemNO and UOM.UOM='CS') as DryQty, \n";
                //strSql += "(select round((select ISNULL((CAST(InvItem.Qty As Integer) % CAST(UOM.BaseQty AS Integer)),0) from UOM Where UOM.UOM='CS' and UOM.ItemNO=InvItem.ItemNO)/UOM.BaseQty,0) from UOM where UOM.ItemNO=InvItem.ItemNO and UOM.UOM='PK') As ChillQty, 'CS' as ShipAdd3, 'PK' as ShipAdd4, \n";
                //strSql += "isnull(Invoice.ShipCity,'') as ShipCity, isnull(Invoice.ShipPin,'') as ShipPost, isnull(Invoice.Discount,0) as OthersQty, isnull(InvItem.PackingSize,'') as PickingList, isnull(Invoice.PoNo,'') as LotNo, \n";
                //strSql += "isnull(Invoice.ConfirmedBy,'') as ConfirmedBy, isnull(Invoice.CurCode,'') as CurCode, isnull(Invoice.DisPer,0) as DisPer, '" + sAgentID + "' as PrintedBy,OrderHDR.ORDDT as ExpiryDate,Customer.PaymentMethod as RefNo,CUSTOMER.GSTNO as DONO,Invoice.TxnType,Invoice.BIRNo,Invoice.BIRNoDamaged FROM Customer INNER JOIN \n";
                //strSql += "Invoice ON Customer.CustNo = Invoice.CustId INNER JOIN ORDERHDR on ORDERHDR.ORDNO=INVOICE.ORDNO INNER JOIN InvItem ON Invoice.InvNo = InvItem.InvNo INNER JOIN UOM ON UOM.ITEMNO=INVITEM.ITEMNO and UOM.UOM='CS' INNER JOIN BARANGAY ON BARANGAY.CODE=CUSTOMER.ADDRESS3 inner join Country on Country.Code=Customer.Address4 inner join Item ON \n";
                //// strSql += "InvItem.ItemNo = Item.ItemNo where Invoice.OrdNo IN ( " + strInvNo + ") \n";
                //if (typeNo == "order")
                //    strSql += "InvItem.ItemNo = Item.ItemNo where Invoice.OrdNo IN ( " + strInvNo + ") \n";
                //else
                //    strSql += "InvItem.ItemNo = Item.ItemNo where Invoice.InvNo IN ( " + strInvNo + ") \n";
                //strSql += "Union SELECT Invoice.SalesCoord, CASE WHEN isnull(InvItem.Remarks,'') <> '' THEN InvItem.[Description] + char(13) + InvItem.Remarks ELSE InvItem.[Description] END as Description, \n";
                //strSql += "InvItem.[LineNo] as Line, InvItem.ItemNo, NewCust.CustID as CustNO, NewCust.CustName, NewCust.Address as Add1, NewCust.Address2 as Add2, Barangay.BarangayName as Add3, \n";
                //strSql += "CASE WHEN NewCust.City IS NULL THEN '' ELSE ISNULL(COUNTRY.NAME,'') +', '+ B1.CityName + ' - ' END + isnull(NewCust.Pin,'') as Add4, NewCust.Phone, \n";
                //strSql += "NewCust.Contact as Attn, '' as Fax, isnull(Invoice.Remarks,'') as Remarks, '*' + Invoice.InvNo + '*' AS InvNo, Invoice.InvDt as InvDate, Invoice.PoNo, \n";
                //strSql += "NewCust.AgentId,(select Description From PayTerms Where Code=NewCust.PaymentTerms) as Terms, InvItem.Qty/UOM.BASEQTY AS QTY, InvItem.Price*UOM.BASEQTY AS Price,Invoice.EwtAmt as SpecialQty, InvItem.SubAmt, \n";
                //strSql += "Invoice.SubTotal, Invoice.GST, Invoice.GstAmt, Invoice.TotalAmt, Item.AssemblyBOM, InvItem.CustItemNo as ChineseDesc, \n";
                //strSql += "InvItem.AddQty, InvItem.AddUOM as Location, UOM.UOM as BaseUOM, '' as AmountinWords, isnull(InvItem.Remarks,'') as LineRemarks, \n";
                //strSql += "'' as ShipName, (select CAST(ISNULL(InvItem.Qty/UOM.BaseQty,0) As Integer) from UOM where UOM.ItemNO=InvItem.ItemNO and UOM.UOM='CS') as DryQty, \n";
                //strSql += "(select round((select ISNULL((CAST(InvItem.Qty As Integer) % CAST(UOM.BaseQty AS Integer)),0) from UOM Where UOM.UOM='CS' and UOM.ItemNO=InvItem.ItemNO)/UOM.BaseQty,0) from UOM where UOM.ItemNO=InvItem.ItemNO and UOM.UOM='PK') As ChillQty, 'CS' as ShipAdd3, 'PK' as ShipAdd4, \n";
                //strSql += "isnull(Invoice.ShipCity,'') as ShipCity, isnull(Invoice.ShipPin,'') as ShipPost, isnull(Invoice.Discount,0) as OthersQty, isnull(InvItem.PackingSize,'') as PickingList, isnull(Invoice.PoNo,'') as LotNo, \n";
                //strSql += "isnull(Invoice.ConfirmedBy,'') as ConfirmedBy, isnull(Invoice.CurCode,'') as CurCode, isnull(Invoice.DisPer,0) as DisPer,  '" + sAgentID + "' as PrintedBy,OrderHDR.ORDDT as ExpiryDate,'' as RefNo,'' as DONO,Invoice.TxnType,Invoice.BIRNo,Invoice.BIRNoDamaged  FROM NewCust INNER JOIN \n";
                //strSql += "Invoice ON NewCust.CustID = Invoice.CustId INNER JOIN ORDERHDR on ORDERHDR.ORDNO=INVOICE.ORDNO INNER JOIN InvItem ON Invoice.InvNo = InvItem.InvNo INNER JOIN UOM ON UOM.ITEMNO=INVITEM.ITEMNO and UOM.UOM='CS' Left JOIN BARANGAY ON BARANGAY.CODE=NewCust.Barangay inner join BARANGAY B1 on B1.CityCode=NewCust.City inner join Country on Country.Code=NewCust.Province inner join Item ON \n";
                //if (typeNo == "order")
                //    strSql += "InvItem.ItemNo = Item.ItemNo where Invoice.OrdNo IN ( " + strInvNo + ") \n";
                //else
                //    strSql += "InvItem.ItemNo = Item.ItemNo where Invoice.InvNo IN ( " + strInvNo + ") \n";
                //strSql += " ) A";

                VehicleAssignmentLog(strSql);
                _commonRule.executerQuery(strSql);


                //return RedirectToAction("ReportView1", "Reports", new { InitReport = "select 1 as A", ReportName = "Select 'LoadInvoiceRep' as ReportName ", LoadReport = "select * from InvoiceReport_" + userId + " as InvoiceReport " });
                if (sRptName == "EverHomeInvoiceRep")
                {
                    if(Session["ProjectName"].ToString() == "JSU" && (userId.ToString().Contains("tkm") || userId.ToString().Contains("TKM")))
                    {
                        strInvNo = strInvNo.Replace("','", ",");
                        return RedirectToAction("ReportView1", "Reports", new { InitReport = "select 1 as A", ReportName = "Select 'INVOICETKMREP' as ReportName ", LoadReport = "exec [dbo].[InvoicePrintTKM] " + strInvNo + ",'" + userId + "'" });
                    }
                    //else if (userId.ToString().Contains("opc") || userId.ToString().Contains("OPC"))
                    //{
                    //    strInvNo = strInvNo.Replace("','", ",");
                    //    return RedirectToAction("ReportView1", "Reports", new { InitReport = "select 1 as A", ReportName = "Select 'InvoiceRepOPC' as ReportName ", LoadReport = "exec [dbo].[InvoicePrintOPCUSer] " + strInvNo + ",'" + userId + "'" });
                    //}
                    else
                        return RedirectToAction("ReportView1", "Reports", new { InitReport = "select 1 as A", ReportName = "Select 'LoadInvoiceRep' as ReportName ", LoadReport = "exec [dbo].[Report_LoadInvoice] 'InvoiceReport_" + userId + " '" });
                }
                else
                    return RedirectToAction("ReportView1", "Reports", new { InitReport = "select 1 as A", ReportName = "Select 'LoadInvoiceRep' as ReportName ", LoadReport = "exec [dbo].[Report_LoadInvoice] 'InvoiceReport_" + userId + " '" });

               


            }


            catch (Exception ex)
            {
                /// MsgBox(ex.Message);
                return View();
                /// 
            }

            // frmStatus.Close()
        }


        public ActionResult LoadCreateInvoiceReportPVM(string strInvNo, string sRptName, string typeNo)
        {
            try
            {
                object dInvTotalAmt = 0;
                //double dLineGSTAmt = 0;
                //double dInvHdrDisPer = 0;
                //string sAmountInWords = "";
                string sAgentID = "";
                string NodeTreeType = "";
                string NodeTreeValue = "";
                var userId = Session["UserId"];
                string strSql = "SELECT NodeTreeType,NodeTreeValue from SalesAgent Where SalesAgent.UserID='" + Session["UserId"] + "'";

                VehicleAssignmentLog(strSql);

                conn = new SqlConnection(constr);
                conn.Open();
                SqlCommand cmd = new SqlCommand(strSql, conn);

                using (SqlDataReader rs = cmd.ExecuteReader())
                {
                    while ((rs.Read() == true))
                    {
                        //       NodeTreeType = (IsDBNull(rs["NodeTreeType"]) ? "" : rs["NodeTreeType"]);
                        //NodeTreeValue = (IsDBNull(rs["NodeTreeValue"]) ? "" : rs["NodeTreeValue"]);
                        NodeTreeType = rs["NodeTreeType"] == null ? "" : rs["NodeTreeType"].ToString();
                        NodeTreeValue = rs["NodeTreeValue"] == null ? "" : rs["NodeTreeValue"].ToString();
                    }
                }
                conn.Close();


                strSql = "";
                if ((NodeTreeType == "SALES TERRITORY"))
                {
                    strSql = "SELECT Distinct Name from Location inner join NodeTree on NodeTree.SalesOfficeID=Location.Code Where " +
                    "NodeTree.SalesManTerritory= '" + NodeTreeValue + "'";
                }
                else if ((NodeTreeType == "SALES OFFICE"))
                {
                    strSql = "SELECT Distinct Name from Location Where Code='" + NodeTreeValue + "'";
                }
                else if ((NodeTreeType == "DISTRIBUTOR"))
                {
                    strSql = "SELECT Distinct DistributorName as Name from Distributor Where DistributorID='" + NodeTreeValue + "'";
                }
                else
                {
                    sAgentID = NodeTreeValue;
                }

                if ((strSql != ""))
                {
                    VehicleAssignmentLog(strSql);

                    conn.Open();
                    cmd = new SqlCommand(strSql, conn);
                    using (SqlDataReader rs = cmd.ExecuteReader())
                    {
                        while ((rs.Read() == true))
                        {
                            NodeTreeType = rs["Name"] == null ? "" : rs["Name"].ToString();
                        }
                    }
                    conn.Close();


                }

                var query = "Delete from InvoiceReport_" + userId + "";
                VehicleAssignmentLog(query);
                var result = _commonRule.executerQuery(query);


                //strSql = "DROP TABLE IF EXISTS   InvoiceReport_" + userId + " \n";
                //// strSql = "drop table InvoiceReport_" + userId + " \n";
                //strSql += " Select  ROW_NUMBER() OVER (Order BY InvNo) as SNo,A.* into InvoiceReport_" + userId + " from (";
                //strSql += "SELECT Invoice.SalesCoord, CASE WHEN isnull(InvItem.Remarks,'') <> '' THEN InvItem.[Description] + char(13) + InvItem.Remarks ELSE InvItem.[Description] END as Description, \n";
                //strSql += "InvItem.[LineNo] as Line, InvItem.ItemNo, Customer.CustNo, Customer.CustName, Customer.Address as Add1, Customer.Address2 as Add2, Barangay.BarangayName as Add3, \n";
                //strSql += "CASE WHEN Customer.City IS NULL THEN '' ELSE ISNULL(COUNTRY.NAME,'') +', '+ Barangay.CityName + ' - ' END + isnull(Customer.PostCode,'') as Add4, Customer.Phone, \n";
                //strSql += "Customer.ContactPerson as Attn, isnull(Customer.FaxNo,'') as Fax, isnull(Invoice.Remarks,'') as Remarks, '*' + Invoice.InvNo + '*' AS InvNo, Invoice.InvDt as InvDate, Invoice.PoNo, \n";
                //strSql += "Customer.SalesAgent as AgentId, (select Description From PayTerms Where Code=Customer.PaymentTerms) as Terms, InvItem.Qty/UOM.BASEQTY AS QTY, InvItem.Price*UOM.BASEQTY AS Price,Invoice.EwtAmt as SpecialQty, InvItem.SubAmt, \n";
                //strSql += "Invoice.SubTotal, Invoice.GST, Invoice.GstAmt, Invoice.TotalAmt, Item.AssemblyBOM, InvItem.CustItemNo as ChineseDesc, \n";
                //strSql += "InvItem.AddQty, InvItem.AddUOM as Location, UOM.UOM as BaseUOM, '' as AmountinWords, isnull(InvItem.Remarks,'') as LineRemarks, \n";
                //strSql += "Customer.ShipName, 0 as DryQty, \n";
                //strSql += "0 As ChillQty, 'CS' as ShipAdd3, 'PK' as ShipAdd4, \n";
                //strSql += "isnull(Invoice.ShipCity,'') as ShipCity, isnull(Invoice.ShipPin,'') as ShipPost, isnull(Invoice.Discount,0) as OthersQty, isnull(InvItem.PackingSize,'') as PickingList, isnull(Invoice.PoNo,'') as LotNo, \n";
                //strSql += "isnull(Invoice.ConfirmedBy,'') as ConfirmedBy, isnull(Invoice.CurCode,'') as CurCode, isnull(Invoice.DisPer,0) as DisPer, '" + sAgentID + "' as PrintedBy,OrderHDR.ORDDT as ExpiryDate,Customer.PaymentMethod as RefNo,CUSTOMER.GSTNO as DONO,'' as TxnType,'' as  BIRNo,'' as  BIRNoDamaged FROM Customer INNER JOIN \n";
                //strSql += "Invoice ON Customer.CustNo = Invoice.CustId INNER JOIN ORDERHDR on ORDERHDR.ORDNO=INVOICE.ORDNO INNER JOIN ORDITEM on ORDERHDR.ORDNO=ORDITEM.ORDNO INNER JOIN InvItem ON Invoice.InvNo = InvItem.InvNo INNER JOIN UOM ON UOM.ITEMNO=INVITEM.ITEMNO and ORDITEM.UOM=UOM.UOM LEFT OUTER JOIN BARANGAY ON BARANGAY.CODE=CUSTOMER.ADDRESS3 LEFT OUTER join Country on Country.Code=Customer.Address4 inner join Item ON \n";
                //if (typeNo == "order")
                //    strSql += "InvItem.ItemNo = Item.ItemNo where Invoice.OrdNo IN ( " + strInvNo + ") \n";
                //else
                //    strSql += "InvItem.ItemNo = Item.ItemNo where Invoice.InvNo IN ( " + strInvNo + ") \n";
                //strSql += " ) A";


                // COMMENTED 11.03.2021  
                strSql = "DROP TABLE IF EXISTS   InvoiceReport_" + userId + " \n";
                // strSql = "drop table InvoiceReport_" + userId + " \n";
                strSql += " Select  ROW_NUMBER() OVER (Order BY InvNo) as SNo,A.* into InvoiceReport_" + userId + " from (";
                strSql += "SELECT Invoice.SalesCoord, CASE WHEN isnull(InvItem.Remarks,'') <> '' THEN InvItem.[Description] + char(13) + InvItem.Remarks ELSE InvItem.[Description] END as Description, \n";
                strSql += "InvItem.[LineNo] as Line, InvItem.ItemNo, Customer.CustNo, Customer.CustName, Customer.Address as Add1, Customer.Address2 as Add2, Barangay.BarangayName as Add3, \n";
                strSql += "CASE WHEN Customer.City IS NULL THEN '' ELSE ISNULL(COUNTRY.NAME,'') +', '+ Barangay.CityName + ' - ' END + isnull(Customer.PostCode,'') as Add4, Customer.Phone, \n";
                strSql += "Customer.ContactPerson as Attn, isnull(Customer.FaxNo,'') as Fax, isnull(Invoice.Remarks,'') as Remarks, '*' + Invoice.InvNo + '*' AS InvNo, Invoice.InvDt as InvDate, Invoice.PoNo, \n";
                strSql += "Customer.SalesAgent as AgentId, (select Description From PayTerms Where Code=Customer.PaymentTerms) as Terms, InvItem.Qty AS QTY, InvItem.Price AS Price,CAST(Invoice.EwtAmt AS INT) as SpecialQty, InvItem.SubAmt, \n";
                //strSql += "Customer.SalesAgent as AgentId, (select Description From PayTerms Where Code=Customer.PaymentTerms) as Terms, InvItem.Qty/UOM.BASEQTY AS QTY, InvItem.Price*UOM.BASEQTY AS Price,CAST(Invoice.EwtAmt AS INT) as SpecialQty, InvItem.SubAmt, \n";
                strSql += "Invoice.SubTotal, Invoice.GST, Invoice.GstAmt, Invoice.TotalAmt, Item.AssemblyBOM, InvItem.CustItemNo as ChineseDesc, \n";
                strSql += "InvItem.AddQty, InvItem.AddUOM as Location, UOM.UOM as BaseUOM, '' as AmountinWords, isnull(InvItem.Remarks,'') as LineRemarks, \n";
                strSql += "Customer.ShipName, 0 as DryQty, \n";
                strSql += "0 As ChillQty, 'CS' as ShipAdd3, 'PK' as ShipAdd4, \n";
                strSql += "isnull(Invoice.ShipCity,'') as ShipCity, isnull(Invoice.ShipPin,'') as ShipPost, isnull(Invoice.Discount,0) as OthersQty, isnull(InvItem.PackingSize,'') as PickingList, isnull(Invoice.PoNo,'') as LotNo, \n";
                strSql += "isnull(Invoice.ConfirmedBy,'') as ConfirmedBy, isnull(Invoice.CurCode,'') as CurCode, isnull(Invoice.DisPer,0) as DisPer, '" + sAgentID + "' as PrintedBy,OrderHDR.ORDDT as ExpiryDate,Customer.PaymentMethod as RefNo,CUSTOMER.GSTNO as DONO,'' as TxnType,'' as  BIRNo,'' as  BIRNoDamaged FROM Customer INNER JOIN \n";
                strSql += "Invoice ON Customer.CustNo = Invoice.CustId INNER JOIN ORDERHDR on ORDERHDR.ORDNO=INVOICE.ORDNO INNER JOIN ORDITEM on ORDERHDR.ORDNO=ORDITEM.ORDNO INNER JOIN InvItem ON Invoice.InvNo = InvItem.InvNo  and invitem.itemno=orditem.itemno    and  invitem.UOM=orditem.UOM  INNER JOIN UOM ON UOM.ITEMNO=INVITEM.ITEMNO and ORDITEM.UOM=UOM.UOM LEFT OUTER JOIN BARANGAY ON BARANGAY.CODE=CUSTOMER.ADDRESS3 LEFT OUTER join Country on Country.Code=Customer.Address4 inner join Item ON \n";
                if (typeNo == "order")
                    strSql += "InvItem.ItemNo = Item.ItemNo where Invoice.OrdNo IN ( " + strInvNo + ") \n";
                else
                    strSql += "InvItem.ItemNo = Item.ItemNo where Invoice.InvNo IN ( " + strInvNo + ") \n";
                strSql += " ) A";

                //strSql += "Union SELECT Invoice.SalesCoord, CASE WHEN isnull(InvItem.Remarks,'') <> '' THEN InvItem.[Description] + char(13) + InvItem.Remarks ELSE InvItem.[Description] END as Description, \n";
                //strSql += "InvItem.[LineNo] as Line, InvItem.ItemNo, NewCust.CustID as CustNO, NewCust.CustName, NewCust.Address as Add1, NewCust.Address2 as Add2, Barangay.BarangayName as Add3, \n";
                //strSql += "CASE WHEN NewCust.City IS NULL THEN '' ELSE ISNULL(COUNTRY.NAME,'') +', '+ B1.CityName + ' - ' END + isnull(NewCust.Pin,'') as Add4, NewCust.Phone, \n";
                //strSql += "NewCust.Contact as Attn, '' as Fax, isnull(Invoice.Remarks,'') as Remarks, '*' + Invoice.InvNo + '*' AS InvNo, Invoice.InvDt as InvDate, Invoice.PoNo, \n";
                //strSql += "NewCust.AgentId,(select Description From PayTerms Where Code=NewCust.PaymentTerms) as Terms, InvItem.Qty/UOM.BASEQTY AS QTY, InvItem.Price*UOM.BASEQTY AS Price,Invoice.EwtAmt as SpecialQty, InvItem.SubAmt, \n";
                //strSql += "Invoice.SubTotal, Invoice.GST, Invoice.GstAmt, Invoice.TotalAmt, Item.AssemblyBOM, InvItem.CustItemNo as ChineseDesc, \n";
                //strSql += "InvItem.AddQty, InvItem.AddUOM as Location, UOM.UOM as BaseUOM, '' as AmountinWords, isnull(InvItem.Remarks,'') as LineRemarks, \n";
                //strSql += "'' as ShipName, 0 as DryQty, \n";
                //strSql += "0 As ChillQty, 'CS' as ShipAdd3, 'PK' as ShipAdd4, \n";
                //strSql += "isnull(Invoice.ShipCity,'') as ShipCity, isnull(Invoice.ShipPin,'') as ShipPost, isnull(Invoice.Discount,0) as OthersQty, isnull(InvItem.PackingSize,'') as PickingList, isnull(Invoice.PoNo,'') as LotNo, \n";
                //strSql += "isnull(Invoice.ConfirmedBy,'') as ConfirmedBy, isnull(Invoice.CurCode,'') as CurCode, isnull(Invoice.DisPer,0) as DisPer,  '" + sAgentID + "' as PrintedBy,OrderHDR.ORDDT as ExpiryDate,'' as RefNo,'' as DONO,'' as  TxnType,'' as  BIRNo,'' as BIRNoDamaged  FROM NewCust INNER JOIN \n";
                //strSql += "Invoice ON NewCust.CustID = Invoice.CustId INNER JOIN ORDERHDR on ORDERHDR.ORDNO=INVOICE.ORDNO INNER JOIN InvItem ON Invoice.InvNo = InvItem.InvNo INNER JOIN UOM ON UOM.ITEMNO=INVITEM.ITEMNO and UOM.UOM='CS' Left JOIN BARANGAY ON BARANGAY.CODE=NewCust.Barangay inner join BARANGAY B1 on B1.CityCode=NewCust.City inner join Country on Country.Code=NewCust.Province inner join Item ON \n";
                //if (typeNo == "order")
                //    strSql += "InvItem.ItemNo = Item.ItemNo where Invoice.OrdNo IN ( " + strInvNo + ") \n";
                //else
                //    strSql += "InvItem.ItemNo = Item.ItemNo where Invoice.InvNo IN ( " + strInvNo + ") \n";
                //strSql += " ) A";

                VehicleAssignmentLog(strSql);
                _commonRule.executerQuery(strSql);
                return RedirectToAction("ReportView1", "Reports", new { InitReport = "select 1 as A", ReportName = "Select 'LoadInvoiceRep' as ReportName ", LoadReport = "select * from InvoiceReport_" + userId + " as InvoiceReport " });

            }


            catch (Exception ex)
            {
                /// MsgBox(ex.Message);
                return View();
                /// 
            }

            // frmStatus.Close()
        }

        public ActionResult LoadCreateInvoiceReportEtika(string strInvNo, string sRptName, string typeNo)
        {
            try
            {
                object dInvTotalAmt = 0;
                //double dLineGSTAmt = 0;
                //double dInvHdrDisPer = 0;
                //string sAmountInWords = "";
                string sAgentID = "";
                string NodeTreeType = "";
                string NodeTreeValue = "";
                var userId = Session["UserId"];
                string strSql = "SELECT NodeTreeType,NodeTreeValue from SalesAgent Where SalesAgent.UserID='" + Session["UserId"] + "'";

                VehicleAssignmentLog(strSql);

                conn = new SqlConnection(constr);
                conn.Open();
                SqlCommand cmd = new SqlCommand(strSql, conn);

                using (SqlDataReader rs = cmd.ExecuteReader())
                {
                    while ((rs.Read() == true))
                    {
                        //       NodeTreeType = (IsDBNull(rs["NodeTreeType"]) ? "" : rs["NodeTreeType"]);
                        //NodeTreeValue = (IsDBNull(rs["NodeTreeValue"]) ? "" : rs["NodeTreeValue"]);
                        NodeTreeType = rs["NodeTreeType"] == null ? "" : rs["NodeTreeType"].ToString();
                        NodeTreeValue = rs["NodeTreeValue"] == null ? "" : rs["NodeTreeValue"].ToString();
                    }
                }
                conn.Close();


                strSql = "";
                if ((NodeTreeType == "SALES TERRITORY"))
                {
                    strSql = "SELECT Distinct Name from Location inner join NodeTree on NodeTree.SalesOfficeID=Location.Code Where " +
                    "NodeTree.SalesManTerritory= '" + NodeTreeValue + "'";
                }
                else if ((NodeTreeType == "SALES OFFICE"))
                {
                    strSql = "SELECT Distinct Name from Location Where Code='" + NodeTreeValue + "'";
                }
                else if ((NodeTreeType == "DISTRIBUTOR"))
                {
                    strSql = "SELECT Distinct DistributorName as Name from Distributor Where DistributorID='" + NodeTreeValue + "'";
                }
                else
                {
                    sAgentID = NodeTreeValue;
                }

                if ((strSql != ""))
                {
                    VehicleAssignmentLog(strSql);

                    conn.Open();
                    cmd = new SqlCommand(strSql, conn);
                    using (SqlDataReader rs = cmd.ExecuteReader())
                    {
                        while ((rs.Read() == true))
                        {
                            NodeTreeType = rs["Name"] == null ? "" : rs["Name"].ToString();
                        }
                    }
                    conn.Close();


                }

                var query = "Delete from InvoiceReport_" + userId + "";
                VehicleAssignmentLog(query);
                var result = _commonRule.executerQuery(query);


                //strSql = "DROP TABLE IF EXISTS   InvoiceReport_" + userId + " \n";
                //// strSql = "drop table InvoiceReport_" + userId + " \n";
                //strSql += " Select  ROW_NUMBER() OVER (Order BY InvNo) as SNo,A.* into InvoiceReport_" + userId + " from (";
                //strSql += "SELECT Invoice.SalesCoord, CASE WHEN isnull(InvItem.Remarks,'') <> '' THEN InvItem.[Description] + char(13) + InvItem.Remarks ELSE InvItem.[Description] END as Description, \n";
                //strSql += "InvItem.[LineNo] as Line, InvItem.ItemNo, Customer.CustNo, Customer.CustName, Customer.Address as Add1, Customer.Address2 as Add2, Barangay.BarangayName as Add3, \n";
                //strSql += "CASE WHEN Customer.City IS NULL THEN '' ELSE ISNULL(COUNTRY.NAME,'') +', '+ Barangay.CityName + ' - ' END + isnull(Customer.PostCode,'') as Add4, Customer.Phone, \n";
                //strSql += "Customer.ContactPerson as Attn, isnull(Customer.FaxNo,'') as Fax, isnull(Invoice.Remarks,'') as Remarks, '*' + Invoice.InvNo + '*' AS InvNo, Invoice.InvDt as InvDate, Invoice.PoNo, \n";
                //strSql += "Customer.SalesAgent as AgentId, (select Description From PayTerms Where Code=Customer.PaymentTerms) as Terms, InvItem.Qty/UOM.BASEQTY AS QTY, InvItem.Price*UOM.BASEQTY AS Price,Invoice.EwtAmt as SpecialQty, InvItem.SubAmt, \n";
                //strSql += "Invoice.SubTotal, Invoice.GST, Invoice.GstAmt, Invoice.TotalAmt, Item.AssemblyBOM, InvItem.CustItemNo as ChineseDesc, \n";
                //strSql += "InvItem.AddQty, InvItem.AddUOM as Location, UOM.UOM as BaseUOM, '' as AmountinWords, isnull(InvItem.Remarks,'') as LineRemarks, \n";
                //strSql += "Customer.ShipName, 0 as DryQty, \n";
                //strSql += "0 As ChillQty, 'CS' as ShipAdd3, 'PK' as ShipAdd4, \n";
                //strSql += "isnull(Invoice.ShipCity,'') as ShipCity, isnull(Invoice.ShipPin,'') as ShipPost, isnull(Invoice.Discount,0) as OthersQty, isnull(InvItem.PackingSize,'') as PickingList, isnull(Invoice.PoNo,'') as LotNo, \n";
                //strSql += "isnull(Invoice.ConfirmedBy,'') as ConfirmedBy, isnull(Invoice.CurCode,'') as CurCode, isnull(Invoice.DisPer,0) as DisPer, '" + sAgentID + "' as PrintedBy,OrderHDR.ORDDT as ExpiryDate,Customer.PaymentMethod as RefNo,CUSTOMER.GSTNO as DONO,'' as TxnType,'' as  BIRNo,'' as  BIRNoDamaged FROM Customer INNER JOIN \n";
                //strSql += "Invoice ON Customer.CustNo = Invoice.CustId INNER JOIN ORDERHDR on ORDERHDR.ORDNO=INVOICE.ORDNO INNER JOIN ORDITEM on ORDERHDR.ORDNO=ORDITEM.ORDNO INNER JOIN InvItem ON Invoice.InvNo = InvItem.InvNo INNER JOIN UOM ON UOM.ITEMNO=INVITEM.ITEMNO and ORDITEM.UOM=UOM.UOM LEFT OUTER JOIN BARANGAY ON BARANGAY.CODE=CUSTOMER.ADDRESS3 LEFT OUTER join Country on Country.Code=Customer.Address4 inner join Item ON \n";
                //if (typeNo == "order")
                //    strSql += "InvItem.ItemNo = Item.ItemNo where Invoice.OrdNo IN ( " + strInvNo + ") \n";
                //else
                //    strSql += "InvItem.ItemNo = Item.ItemNo where Invoice.InvNo IN ( " + strInvNo + ") \n";
                //strSql += " ) A";


                // COMMENTED 11.03.2021  
                strSql = "DROP TABLE IF EXISTS   InvoiceReport_" + userId + " \n";
                // strSql = "drop table InvoiceReport_" + userId + " \n";
                strSql += " Select  ROW_NUMBER() OVER (Order BY InvNo) as SNo,A.* into InvoiceReport_" + userId + " from (";
                strSql += "SELECT Invoice.SalesCoord, CASE WHEN isnull(InvItem.Remarks,'') <> '' THEN InvItem.[Description] + char(13) + InvItem.Remarks ELSE InvItem.[Description] END as Description, \n";
                strSql += "InvItem.[LineNo] as Line, InvItem.ItemNo, Customer.CustNo, Customer.CustName, Customer.Address as Add1, Customer.Address2 as Add2, Barangay.BarangayName as Add3, \n";
                strSql += "CASE WHEN Customer.City IS NULL THEN '' ELSE ISNULL(COUNTRY.NAME,'') +', '+ Barangay.CityName + ' - ' END + isnull(Customer.PostCode,'') as Add4, Customer.Phone, \n";
                strSql += "Customer.ContactPerson as Attn, isnull(Customer.FaxNo,'') as Fax, isnull(Invoice.Remarks,'') as Remarks, '*' + Invoice.InvNo + '*' AS InvNo, Invoice.InvDt as InvDate, Invoice.PoNo, \n";
                strSql += "Customer.SalesAgent as AgentId, (select Description From PayTerms Where Code=Customer.PaymentTerms) as Terms, InvItem.Qty AS QTY, InvItem.Price AS Price,CAST(Invoice.EwtAmt AS INT) as SpecialQty, InvItem.SubAmt, \n";
                //strSql += "Customer.SalesAgent as AgentId, (select Description From PayTerms Where Code=Customer.PaymentTerms) as Terms, InvItem.Qty/UOM.BASEQTY AS QTY, InvItem.Price*UOM.BASEQTY AS Price,CAST(Invoice.EwtAmt AS INT) as SpecialQty, InvItem.SubAmt, \n";
                strSql += "Invoice.SubTotal, Invoice.GST, Invoice.GstAmt, Invoice.TotalAmt, Item.AssemblyBOM, InvItem.CustItemNo as ChineseDesc, \n";
                strSql += "InvItem.AddQty, InvItem.AddUOM as Location, UOM.UOM as BaseUOM, '' as AmountinWords, isnull(InvItem.Remarks,'') as LineRemarks, \n";
                strSql += "Customer.ShipName, 0 as DryQty, \n";
                strSql += "0 As ChillQty, 'CS' as ShipAdd3, 'PK' as ShipAdd4, \n";
                strSql += "isnull(Invoice.ShipCity,'') as ShipCity, isnull(Invoice.ShipPin,'') as ShipPost, isnull(Invoice.Discount,0) as OthersQty, isnull(InvItem.PackingSize,'') as PickingList, isnull(Invoice.PoNo,'') as LotNo, \n";
                strSql += "isnull(Invoice.ConfirmedBy,'') as ConfirmedBy, isnull(Invoice.CurCode,'') as CurCode, isnull(Invoice.DisPer,0) as DisPer, '" + sAgentID + "' as PrintedBy,OrderHDR.ORDDT as ExpiryDate,Customer.PaymentMethod as RefNo,CUSTOMER.GSTNO as DONO,'' as TxnType,'' as  BIRNo,'' as  BIRNoDamaged FROM Customer INNER JOIN \n";
                strSql += "Invoice ON Customer.CustNo = Invoice.CustId INNER JOIN ORDERHDR on ORDERHDR.ORDNO=INVOICE.ORDNO INNER JOIN ORDITEM on ORDERHDR.ORDNO=ORDITEM.ORDNO INNER JOIN InvItem ON Invoice.InvNo = InvItem.InvNo  and invitem.itemno=orditem.itemno    and  invitem.UOM=orditem.UOM  INNER JOIN UOM ON UOM.ITEMNO=INVITEM.ITEMNO and ORDITEM.UOM=UOM.UOM LEFT OUTER JOIN BARANGAY ON BARANGAY.CODE=CUSTOMER.ADDRESS3 LEFT OUTER join Country on Country.Code=Customer.Address4 inner join Item ON \n";
                if (typeNo == "order")
                    strSql += "InvItem.ItemNo = Item.ItemNo where Invoice.OrdNo IN ( " + strInvNo + ") \n";
                else
                    strSql += "InvItem.ItemNo = Item.ItemNo where Invoice.InvNo IN ( " + strInvNo + ") \n";
                strSql += " ) A";

                //strSql += "Union SELECT Invoice.SalesCoord, CASE WHEN isnull(InvItem.Remarks,'') <> '' THEN InvItem.[Description] + char(13) + InvItem.Remarks ELSE InvItem.[Description] END as Description, \n";
                //strSql += "InvItem.[LineNo] as Line, InvItem.ItemNo, NewCust.CustID as CustNO, NewCust.CustName, NewCust.Address as Add1, NewCust.Address2 as Add2, Barangay.BarangayName as Add3, \n";
                //strSql += "CASE WHEN NewCust.City IS NULL THEN '' ELSE ISNULL(COUNTRY.NAME,'') +', '+ B1.CityName + ' - ' END + isnull(NewCust.Pin,'') as Add4, NewCust.Phone, \n";
                //strSql += "NewCust.Contact as Attn, '' as Fax, isnull(Invoice.Remarks,'') as Remarks, '*' + Invoice.InvNo + '*' AS InvNo, Invoice.InvDt as InvDate, Invoice.PoNo, \n";
                //strSql += "NewCust.AgentId,(select Description From PayTerms Where Code=NewCust.PaymentTerms) as Terms, InvItem.Qty/UOM.BASEQTY AS QTY, InvItem.Price*UOM.BASEQTY AS Price,Invoice.EwtAmt as SpecialQty, InvItem.SubAmt, \n";
                //strSql += "Invoice.SubTotal, Invoice.GST, Invoice.GstAmt, Invoice.TotalAmt, Item.AssemblyBOM, InvItem.CustItemNo as ChineseDesc, \n";
                //strSql += "InvItem.AddQty, InvItem.AddUOM as Location, UOM.UOM as BaseUOM, '' as AmountinWords, isnull(InvItem.Remarks,'') as LineRemarks, \n";
                //strSql += "'' as ShipName, 0 as DryQty, \n";
                //strSql += "0 As ChillQty, 'CS' as ShipAdd3, 'PK' as ShipAdd4, \n";
                //strSql += "isnull(Invoice.ShipCity,'') as ShipCity, isnull(Invoice.ShipPin,'') as ShipPost, isnull(Invoice.Discount,0) as OthersQty, isnull(InvItem.PackingSize,'') as PickingList, isnull(Invoice.PoNo,'') as LotNo, \n";
                //strSql += "isnull(Invoice.ConfirmedBy,'') as ConfirmedBy, isnull(Invoice.CurCode,'') as CurCode, isnull(Invoice.DisPer,0) as DisPer,  '" + sAgentID + "' as PrintedBy,OrderHDR.ORDDT as ExpiryDate,'' as RefNo,'' as DONO,'' as  TxnType,'' as  BIRNo,'' as BIRNoDamaged  FROM NewCust INNER JOIN \n";
                //strSql += "Invoice ON NewCust.CustID = Invoice.CustId INNER JOIN ORDERHDR on ORDERHDR.ORDNO=INVOICE.ORDNO INNER JOIN InvItem ON Invoice.InvNo = InvItem.InvNo INNER JOIN UOM ON UOM.ITEMNO=INVITEM.ITEMNO and UOM.UOM='CS' Left JOIN BARANGAY ON BARANGAY.CODE=NewCust.Barangay inner join BARANGAY B1 on B1.CityCode=NewCust.City inner join Country on Country.Code=NewCust.Province inner join Item ON \n";
                //if (typeNo == "order")
                //    strSql += "InvItem.ItemNo = Item.ItemNo where Invoice.OrdNo IN ( " + strInvNo + ") \n";
                //else
                //    strSql += "InvItem.ItemNo = Item.ItemNo where Invoice.InvNo IN ( " + strInvNo + ") \n";
                //strSql += " ) A";

                VehicleAssignmentLog(strSql);
                _commonRule.executerQuery(strSql);
                return RedirectToAction("ReportView1", "Reports", new { InitReport = "select 1 as A", ReportName = "Select 'LoadInvoiceRep' as ReportName ", LoadReport = "select * from InvoiceReport_" + userId + " as InvoiceReport " });

            }


            catch (Exception ex)
            {
                /// MsgBox(ex.Message);
                return View();
                /// 
            }

            // frmStatus.Close()
        }

        public ActionResult LoadCreateInvoiceReportJSU(string strInvNo, string sRptName, string typeNo)
        {
            try
            {
                object dInvTotalAmt = 0;
                //double dLineGSTAmt = 0;
                //double dInvHdrDisPer = 0;
                //string sAmountInWords = "";
                string sAgentID = "";
                string NodeTreeType = "";
                string NodeTreeValue = "";
                var userId = Session["UserId"];
                string strSql = "SELECT NodeTreeType,NodeTreeValue from SalesAgent Where SalesAgent.UserID='" + Session["UserId"] + "'";

                VehicleAssignmentLog(strSql);

                conn = new SqlConnection(constr);
                conn.Open();
                SqlCommand cmd = new SqlCommand(strSql, conn);

                using (SqlDataReader rs = cmd.ExecuteReader())
                {
                    while ((rs.Read() == true))
                    {
                        //       NodeTreeType = (IsDBNull(rs["NodeTreeType"]) ? "" : rs["NodeTreeType"]);
                        //NodeTreeValue = (IsDBNull(rs["NodeTreeValue"]) ? "" : rs["NodeTreeValue"]);
                        NodeTreeType = rs["NodeTreeType"] == null ? "" : rs["NodeTreeType"].ToString();
                        NodeTreeValue = rs["NodeTreeValue"] == null ? "" : rs["NodeTreeValue"].ToString();
                    }
                }
                conn.Close();


                strSql = "";
                if ((NodeTreeType == "SALES TERRITORY"))
                {
                    strSql = "SELECT Distinct Name from Location inner join NodeTree on NodeTree.SalesOfficeID=Location.Code Where " +
                    "NodeTree.SalesManTerritory= '" + NodeTreeValue + "'";
                }
                else if ((NodeTreeType == "SALES OFFICE"))
                {
                    strSql = "SELECT Distinct Name from Location Where Code='" + NodeTreeValue + "'";
                }
                else if ((NodeTreeType == "DISTRIBUTOR"))
                {
                    strSql = "SELECT Distinct DistributorName as Name from Distributor Where DistributorID='" + NodeTreeValue + "'";
                }
                else
                {
                    sAgentID = NodeTreeValue;
                }

                if ((strSql != ""))
                {
                    VehicleAssignmentLog(strSql);

                    conn.Open();
                    cmd = new SqlCommand(strSql, conn);
                    using (SqlDataReader rs = cmd.ExecuteReader())
                    {
                        while ((rs.Read() == true))
                        {
                            NodeTreeType = rs["Name"] == null ? "" : rs["Name"].ToString();
                        }
                    }
                    conn.Close();
                }

                var query = "Delete from InvoiceReport_" + userId + "";
                VehicleAssignmentLog(query);
                var result = _commonRule.executerQuery(query);

                strSql = "DROP TABLE IF EXISTS   InvoiceReport_" + userId + " \n";
                // strSql = "drop table InvoiceReport_" + userId + " \n";
                strSql += " Select  ROW_NUMBER() OVER (Order BY InvNo) as SNo,A.* into InvoiceReport_" + userId + " from (";
                strSql += " SELECT Invoice.SalesCoord, CASE WHEN isnull(InvItem.Remarks,'') <> '' THEN InvItem.[Description] + char(13) + InvItem.Remarks ELSE InvItem.[Description] END as Description, \n";
                strSql += " InvItem.[LineNo] as Line, InvItem.ItemNo, Customer.CustNo, Customer.CustName, Customer.Address as Add1, Customer.Address2 as Add2, Barangay.BarangayName as Add3, \n";
                strSql += " CASE WHEN Customer.City IS NULL THEN '' ELSE ISNULL(COUNTRY.NAME,'') +', '+ Barangay.CityName + ' - ' END + isnull(Customer.PostCode,'') as Add4, Customer.Phone, \n";
                strSql += " Customer.ContactPerson as Attn, isnull(Customer.FaxNo,'') as Fax, isnull(Invoice.Remarks,'') as Remarks, '*' + Invoice.InvNo + '*' AS InvNo, Invoice.InvDt as InvDate, Invoice.PoNo, \n";
                strSql += " Customer.SalesAgent as AgentId, (select Description From PayTerms Where Code=Customer.PaymentTerms) as Terms, InvItem.Qty/UOM.BASEQTY AS QTY, InvItem.Price*UOM.BASEQTY AS Price,Invoice.EwtAmt as SpecialQty, InvItem.SubAmt, \n";
                strSql += " Invoice.SubTotal, Invoice.GST, Invoice.GstAmt, Invoice.TotalAmt, Item.AssemblyBOM, InvItem.CustItemNo as ChineseDesc, \n";
                strSql += " InvItem.AddQty, InvItem.AddUOM as Location, UOM.UOM as BaseUOM, '' as AmountinWords, isnull(InvItem.Remarks,'') as LineRemarks, \n";
                strSql += " Customer.ShipName, \n";
                //Old DryQty Changed as per Sudhakar Instruction on 01.12.2023
                //strSql += " CONVERT(INT,(select [dbo].[fn_UOM_BULKQTY](InvItem.ItemNo,InvItem.Qty))) as DryQty, \n";

                strSql += " CONVERT(INT, FLOOR(CAST(Invitem.Qty AS DECIMAL) / (SELECT UOM.BaseQty FROM UOM WHERE UOM.UOM = Item.bulkuom AND UOM.ITemNo = InvItem.ItemNO))) As DryQty,\n";

                //Old ChillQty Changed as per Sudhakar Instruction on 01.12.2023
                //strSql += "CONVERT(INT,(select [dbo].[fn_UOM_LOOSEQTY](InvItem.ItemNo,InvItem.Qty))) As ChillQty, \n";
                strSql += " CAST(ROUND(CAST(InvItem.Qty AS DECIMAL) / (SELECT UOM.BaseQty FROM UOM WHERE UOM.UOM = Item.bulkuom AND UOM.ITemNo = InvItem.ItemNO) % 1 * \n";
                strSql += " (SELECT UOM.BaseQty FROM UOM WHERE UOM.UOM = Item.Bulkuom AND UOM.ITemNo = InvItem.ItemNO) / (SELECT UOM.BaseQty FROM UOM WHERE UOM.UOM = Item.looseuom AND UOM.ITemNo = InvItem.ItemNO),  0) AS INT) as ChillQty, \n";

                strSql += " 'CS' as ShipAdd3, 'PK' as ShipAdd4, \n";
                strSql += " isnull(Invoice.ShipCity,'') as ShipCity, isnull(Invoice.ShipPin,'') as ShipPost, isnull(Invoice.Discount,0) as OthersQty, isnull(InvItem.PackingSize,'') as PickingList, isnull(Invoice.PoNo,'') as LotNo, \n";
                strSql += " isnull(Invoice.ConfirmedBy,'') as ConfirmedBy, isnull(Invoice.CurCode,'') as CurCode, isnull(Invoice.DisPer,0) as DisPer, '" + sAgentID + "' as PrintedBy,OrderHDR.ORDDT as ExpiryDate,Customer.PaymentMethod as RefNo,CUSTOMER.GSTNO as DONO,Invoice.TxnType,Invoice.BIRNo,Invoice.BIRNoDamaged FROM Customer INNER JOIN \n";
                strSql += " Invoice ON Customer.CustNo = Invoice.CustId INNER JOIN ORDERHDR on ORDERHDR.ORDNO=INVOICE.ORDNO INNER JOIN InvItem ON Invoice.InvNo = InvItem.InvNo INNER JOIN UOM ON UOM.ITEMNO=INVITEM.ITEMNO and UOM.UOM='CS' INNER JOIN BARANGAY ON BARANGAY.CODE=CUSTOMER.ADDRESS3 inner join Country on Country.Code=Customer.Address4 inner join Item ON \n";
                // strSql += "InvItem.ItemNo = Item.ItemNo where Invoice.OrdNo IN ( " + strInvNo + ") \n";
                if (typeNo == "order")
                    strSql += " InvItem.ItemNo = Item.ItemNo where Invoice.OrdNo IN ( " + strInvNo + ") \n";
                else
                    strSql += " InvItem.ItemNo = Item.ItemNo where Invoice.InvNo IN ( " + strInvNo + ") \n";
                strSql += " Union SELECT Invoice.SalesCoord, CASE WHEN isnull(InvItem.Remarks,'') <> '' THEN InvItem.[Description] + char(13) + InvItem.Remarks ELSE InvItem.[Description] END as Description, \n";
                strSql += " InvItem.[LineNo] as Line, InvItem.ItemNo, NewCust.CustID as CustNO, NewCust.CustName, NewCust.Address as Add1, NewCust.Address2 as Add2, Barangay.BarangayName as Add3, \n";
                strSql += " CASE WHEN NewCust.City IS NULL THEN '' ELSE ISNULL(COUNTRY.NAME,'') +', '+ B1.CityName + ' - ' END + isnull(NewCust.Pin,'') as Add4, NewCust.Phone, \n";
                strSql += " NewCust.Contact as Attn, '' as Fax, isnull(Invoice.Remarks,'') as Remarks, '*' + Invoice.InvNo + '*' AS InvNo, Invoice.InvDt as InvDate, Invoice.PoNo, \n";
                strSql += " NewCust.AgentId,(select Description From PayTerms Where Code=NewCust.PaymentTerms) as Terms, InvItem.Qty/UOM.BASEQTY AS QTY, InvItem.Price*UOM.BASEQTY AS Price,Invoice.EwtAmt as SpecialQty, InvItem.SubAmt, \n";
                strSql += " Invoice.SubTotal, Invoice.GST, Invoice.GstAmt, Invoice.TotalAmt, Item.AssemblyBOM, InvItem.CustItemNo as ChineseDesc, \n";
                strSql += " InvItem.AddQty, InvItem.AddUOM as Location, UOM.UOM as BaseUOM, '' as AmountinWords, isnull(InvItem.Remarks,'') as LineRemarks, \n";
                strSql += " '' as ShipName, \n";
                
                //Old DryQty Changed as per Sudhakar Instruction on 01.12.2023
                //strSql += " CONVERT(INT,(select [dbo].[fn_UOM_BULKQTY](InvItem.ItemNo,InvItem.Qty))) as DryQty, \n";
                strSql += " CONVERT(INT, FLOOR(CAST(Invitem.Qty AS DECIMAL) / (SELECT UOM.BaseQty FROM UOM WHERE UOM.UOM = Item.bulkuom AND UOM.ITemNo = InvItem.ItemNO))) As DryQty,\n";

                //strSql += " CONVERT(INT,(select [dbo].[fn_UOM_LOOSEQTY](InvItem.ItemNo,InvItem.Qty))) As ChillQty, \n";

                //Old ChillQty Changed as per Sudhakar Instruction on 01.12.2023
                strSql += " CAST(ROUND(CAST(InvItem.Qty AS DECIMAL) / (SELECT UOM.BaseQty FROM UOM WHERE UOM.UOM = Item.bulkuom AND UOM.ITemNo = InvItem.ItemNO) % 1 * \n";
                strSql += " (SELECT UOM.BaseQty FROM UOM WHERE UOM.UOM = Item.Bulkuom AND UOM.ITemNo = InvItem.ItemNO) / (SELECT UOM.BaseQty FROM UOM WHERE UOM.UOM = Item.looseuom AND UOM.ITemNo = InvItem.ItemNO),  0) AS INT) as ChillQty, \n";

                strSql += " 'CS' as ShipAdd3, 'PK' as ShipAdd4, \n";
                strSql += " isnull(Invoice.ShipCity,'') as ShipCity, isnull(Invoice.ShipPin,'') as ShipPost, isnull(Invoice.Discount,0) as OthersQty, isnull(InvItem.PackingSize,'') as PickingList, isnull(Invoice.PoNo,'') as LotNo, \n";
                strSql += " isnull(Invoice.ConfirmedBy,'') as ConfirmedBy, isnull(Invoice.CurCode,'') as CurCode, isnull(Invoice.DisPer,0) as DisPer,  '" + sAgentID + "' as PrintedBy,OrderHDR.ORDDT as ExpiryDate,'' as RefNo,'' as DONO,Invoice.TxnType,Invoice.BIRNo,Invoice.BIRNoDamaged  FROM NewCust INNER JOIN \n";
                strSql += " Invoice ON NewCust.CustID = Invoice.CustId INNER JOIN ORDERHDR on ORDERHDR.ORDNO=INVOICE.ORDNO INNER JOIN InvItem ON Invoice.InvNo = InvItem.InvNo INNER JOIN UOM ON UOM.ITEMNO=INVITEM.ITEMNO and UOM.UOM='CS' Left JOIN BARANGAY ON BARANGAY.CODE=NewCust.Barangay inner join BARANGAY B1 on B1.CityCode=NewCust.City inner join Country on Country.Code=NewCust.Province inner join Item ON \n";
                if (typeNo == "order")
                    strSql += " InvItem.ItemNo = Item.ItemNo where Invoice.OrdNo IN ( " + strInvNo + ") \n";
                else
                    strSql += " InvItem.ItemNo = Item.ItemNo where Invoice.InvNo IN ( " + strInvNo + ") \n";
                strSql += " ) A";

                //strSql = "DROP TABLE IF EXISTS   InvoiceReport_" + userId + " \n";
                //// strSql = "drop table InvoiceReport_" + userId + " \n";
                //strSql += " Select  ROW_NUMBER() OVER (Order BY InvNo) as SNo,A.* into InvoiceReport_" + userId + " from (";
                //strSql += "SELECT Invoice.SalesCoord, CASE WHEN isnull(InvItem.Remarks,'') <> '' THEN InvItem.[Description] + char(13) + InvItem.Remarks ELSE InvItem.[Description] END as Description, \n";
                //strSql += "InvItem.[LineNo] as Line, InvItem.ItemNo, Customer.CustNo, Customer.CustName, Customer.Address as Add1, Customer.Address2 as Add2, Barangay.BarangayName as Add3, \n";
                //strSql += "CASE WHEN Customer.City IS NULL THEN '' ELSE ISNULL(COUNTRY.NAME,'') +', '+ Barangay.CityName + ' - ' END + isnull(Customer.PostCode,'') as Add4, Customer.Phone, \n";
                //strSql += "Customer.ContactPerson as Attn, isnull(Customer.FaxNo,'') as Fax, isnull(Invoice.Remarks,'') as Remarks, '*' + Invoice.InvNo + '*' AS InvNo, Invoice.InvDt as InvDate, Invoice.PoNo, \n";
                //strSql += "Customer.SalesAgent as AgentId, (select Description From PayTerms Where Code=Customer.PaymentTerms) as Terms, InvItem.Qty/UOM.BASEQTY AS QTY, InvItem.Price*UOM.BASEQTY AS Price,Invoice.EwtAmt as SpecialQty, InvItem.SubAmt, \n";
                //strSql += "Invoice.SubTotal, Invoice.GST, Invoice.GstAmt, Invoice.TotalAmt, Item.AssemblyBOM, InvItem.CustItemNo as ChineseDesc, \n";
                //strSql += "InvItem.AddQty, InvItem.AddUOM as Location, UOM.UOM as BaseUOM, '' as AmountinWords, isnull(InvItem.Remarks,'') as LineRemarks, \n";
                //strSql += "Customer.ShipName, (select CAST(ISNULL(InvItem.Qty/UOM.BaseQty,0) As Integer) from UOM where UOM.ItemNO=InvItem.ItemNO and UOM.UOM='CS') as DryQty, \n";
                //strSql += "(select round((select ISNULL((CAST(InvItem.Qty As Integer) % CAST(UOM.BaseQty AS Integer)),0) from UOM Where UOM.UOM='CS' and UOM.ItemNO=InvItem.ItemNO)/UOM.BaseQty,0) from UOM where UOM.ItemNO=InvItem.ItemNO and UOM.UOM='PK') As ChillQty, 'CS' as ShipAdd3, 'PK' as ShipAdd4, \n";
                //strSql += "isnull(Invoice.ShipCity,'') as ShipCity, isnull(Invoice.ShipPin,'') as ShipPost, isnull(Invoice.Discount,0) as OthersQty, isnull(InvItem.PackingSize,'') as PickingList, isnull(Invoice.PoNo,'') as LotNo, \n";
                //strSql += "isnull(Invoice.ConfirmedBy,'') as ConfirmedBy, isnull(Invoice.CurCode,'') as CurCode, isnull(Invoice.DisPer,0) as DisPer, '" + sAgentID + "' as PrintedBy,OrderHDR.ORDDT as ExpiryDate,Customer.PaymentMethod as RefNo,CUSTOMER.GSTNO as DONO,Invoice.TxnType,Invoice.BIRNo,Invoice.BIRNoDamaged FROM Customer INNER JOIN \n";
                //strSql += "Invoice ON Customer.CustNo = Invoice.CustId INNER JOIN ORDERHDR on ORDERHDR.ORDNO=INVOICE.ORDNO INNER JOIN InvItem ON Invoice.InvNo = InvItem.InvNo INNER JOIN UOM ON UOM.ITEMNO=INVITEM.ITEMNO and UOM.UOM='CS' INNER JOIN BARANGAY ON BARANGAY.CODE=CUSTOMER.ADDRESS3 inner join Country on Country.Code=Customer.Address4 inner join Item ON \n";
                //// strSql += "InvItem.ItemNo = Item.ItemNo where Invoice.OrdNo IN ( " + strInvNo + ") \n";
                //if (typeNo == "order")
                //    strSql += "InvItem.ItemNo = Item.ItemNo where Invoice.OrdNo IN ( " + strInvNo + ") \n";
                //else
                //    strSql += "InvItem.ItemNo = Item.ItemNo where Invoice.InvNo IN ( " + strInvNo + ") \n";
                //strSql += "Union SELECT Invoice.SalesCoord, CASE WHEN isnull(InvItem.Remarks,'') <> '' THEN InvItem.[Description] + char(13) + InvItem.Remarks ELSE InvItem.[Description] END as Description, \n";
                //strSql += "InvItem.[LineNo] as Line, InvItem.ItemNo, NewCust.CustID as CustNO, NewCust.CustName, NewCust.Address as Add1, NewCust.Address2 as Add2, Barangay.BarangayName as Add3, \n";
                //strSql += "CASE WHEN NewCust.City IS NULL THEN '' ELSE ISNULL(COUNTRY.NAME,'') +', '+ B1.CityName + ' - ' END + isnull(NewCust.Pin,'') as Add4, NewCust.Phone, \n";
                //strSql += "NewCust.Contact as Attn, '' as Fax, isnull(Invoice.Remarks,'') as Remarks, '*' + Invoice.InvNo + '*' AS InvNo, Invoice.InvDt as InvDate, Invoice.PoNo, \n";
                //strSql += "NewCust.AgentId,(select Description From PayTerms Where Code=NewCust.PaymentTerms) as Terms, InvItem.Qty/UOM.BASEQTY AS QTY, InvItem.Price*UOM.BASEQTY AS Price,Invoice.EwtAmt as SpecialQty, InvItem.SubAmt, \n";
                //strSql += "Invoice.SubTotal, Invoice.GST, Invoice.GstAmt, Invoice.TotalAmt, Item.AssemblyBOM, InvItem.CustItemNo as ChineseDesc, \n";
                //strSql += "InvItem.AddQty, InvItem.AddUOM as Location, UOM.UOM as BaseUOM, '' as AmountinWords, isnull(InvItem.Remarks,'') as LineRemarks, \n";
                //strSql += "'' as ShipName, (select CAST(ISNULL(InvItem.Qty/UOM.BaseQty,0) As Integer) from UOM where UOM.ItemNO=InvItem.ItemNO and UOM.UOM='CS') as DryQty, \n";
                //strSql += "(select round((select ISNULL((CAST(InvItem.Qty As Integer) % CAST(UOM.BaseQty AS Integer)),0) from UOM Where UOM.UOM='CS' and UOM.ItemNO=InvItem.ItemNO)/UOM.BaseQty,0) from UOM where UOM.ItemNO=InvItem.ItemNO and UOM.UOM='PK') As ChillQty, 'CS' as ShipAdd3, 'PK' as ShipAdd4, \n";
                //strSql += "isnull(Invoice.ShipCity,'') as ShipCity, isnull(Invoice.ShipPin,'') as ShipPost, isnull(Invoice.Discount,0) as OthersQty, isnull(InvItem.PackingSize,'') as PickingList, isnull(Invoice.PoNo,'') as LotNo, \n";
                //strSql += "isnull(Invoice.ConfirmedBy,'') as ConfirmedBy, isnull(Invoice.CurCode,'') as CurCode, isnull(Invoice.DisPer,0) as DisPer,  '" + sAgentID + "' as PrintedBy,OrderHDR.ORDDT as ExpiryDate,'' as RefNo,'' as DONO,Invoice.TxnType,Invoice.BIRNo,Invoice.BIRNoDamaged  FROM NewCust INNER JOIN \n";
                //strSql += "Invoice ON NewCust.CustID = Invoice.CustId INNER JOIN ORDERHDR on ORDERHDR.ORDNO=INVOICE.ORDNO INNER JOIN InvItem ON Invoice.InvNo = InvItem.InvNo INNER JOIN UOM ON UOM.ITEMNO=INVITEM.ITEMNO and UOM.UOM='CS' Left JOIN BARANGAY ON BARANGAY.CODE=NewCust.Barangay inner join BARANGAY B1 on B1.CityCode=NewCust.City inner join Country on Country.Code=NewCust.Province inner join Item ON \n";
                //if (typeNo == "order")
                //    strSql += "InvItem.ItemNo = Item.ItemNo where Invoice.OrdNo IN ( " + strInvNo + ") \n";
                //else
                //    strSql += "InvItem.ItemNo = Item.ItemNo where Invoice.InvNo IN ( " + strInvNo + ") \n";
                //strSql += " ) A";
                VehicleAssignmentLog(strSql);
                _commonRule.executerQuery(strSql);
               
                return RedirectToAction("ReportView1", "Reports", new { InitReport = "select 1 as A", ReportName = "Select 'LoadInvoiceRep' as ReportName ", LoadReport = "select * from InvoiceReport_" + userId + " as InvoiceReport " });
            }


            catch (Exception ex)
            {
                /// MsgBox(ex.Message);
                return View();
                /// 
            }

            // frmStatus.Close()
        }



        public ActionResult LoadInvoiceReport1(string strInvNo, string sRptName)
        {
            try
            {
                object dInvTotalAmt = 0;
                //double dLineGSTAmt = 0;
                //double dInvHdrDisPer = 0;
                //string sAmountInWords = "";
                string sAgentID = "";
                string NodeTreeType = "";
                string NodeTreeValue = "";
                string strSql = "SELECT NodeTreeType,NodeTreeValue from SalesAgent Where SalesAgent.UserID='" + Session["UserId"] + "'";

                VehicleAssignmentLog(strSql);

                conn = new SqlConnection(constr);
                conn.Open();
                SqlCommand cmd = new SqlCommand(strSql, conn);

                using (SqlDataReader rs = cmd.ExecuteReader())
                {
                    while ((rs.Read() == true))
                    {
                        //       NodeTreeType = (IsDBNull(rs["NodeTreeType"]) ? "" : rs["NodeTreeType"]);
                        //NodeTreeValue = (IsDBNull(rs["NodeTreeValue"]) ? "" : rs["NodeTreeValue"]);
                        NodeTreeType = rs["NodeTreeType"] == null ? "" : rs["NodeTreeType"].ToString();
                        NodeTreeValue = rs["NodeTreeValue"] == null ? "" : rs["NodeTreeValue"].ToString();
                    }
                }
                conn.Close();


                strSql = "";
                if ((NodeTreeType == "SALES TERRITORY"))
                {
                    strSql = "SELECT Distinct Name from Location inner join NodeTree on NodeTree.SalesOfficeID=Location.Code Where " +
                    "NodeTree.SalesManTerritory= '" + NodeTreeValue + "'";
                }
                else if ((NodeTreeType == "SALES OFFICE"))
                {
                    strSql = "SELECT Distinct Name from Location Where Code='" + NodeTreeValue + "'";
                }
                else if ((NodeTreeType == "DISTRIBUTOR"))
                {
                    strSql = "SELECT Distinct DistributorName as Name from Distributor Where DistributorID='" + NodeTreeValue + "'";
                }
                else
                {
                    sAgentID = NodeTreeValue;
                }

                if ((strSql != ""))
                {
                    VehicleAssignmentLog(strSql);

                    conn.Open();
                    cmd = new SqlCommand(strSql, conn);
                    using (SqlDataReader rs = cmd.ExecuteReader())
                    {
                        while ((rs.Read() == true))
                        {
                            NodeTreeType = rs["Name"] == null ? "" : rs["Name"].ToString();
                        }
                    }
                    conn.Close();


                }

                var query = "Delete from InvoiceReport";
                VehicleAssignmentLog(query);
                var result = _commonRule.executerQuery(query);

                strSql = "drop table InvoiceReport \n";
                strSql += "SELECT Invoice.SalesCoord, CASE WHEN isnull(InvItem.Remarks,'') <> '' THEN InvItem.[Description] + char(13) + InvItem.Remarks ELSE InvItem.[Description] END as Description, \n";
                strSql += "InvItem.[LineNo] as Line, InvItem.ItemNo, Customer.CustNo, Customer.CustName, Customer.Address as Add1, Customer.Address2 as Add2, Barangay.BarangayName as Add3, \n";
                strSql += "CASE WHEN Customer.City IS NULL THEN '' ELSE ISNULL(COUNTRY.NAME,'') +', '+ Barangay.CityName + ' - ' END + isnull(Customer.PostCode,'') as Add4, Customer.Phone, \n";
                strSql += "Customer.ContactPerson as Attn, isnull(Customer.FaxNo,'') as Fax, isnull(Invoice.Remarks,'') as Remarks, '*' + Invoice.InvNo + '*' AS InvNo, Invoice.InvDt as InvDate, Invoice.PoNo, \n";
                strSql += "Customer.SalesAgent as AgentId, (select Description From PayTerms Where Code=Customer.PaymentTerms) as Terms, InvItem.Qty/UOM.BASEQTY AS QTY, InvItem.Price*UOM.BASEQTY AS Price,Invoice.EwtAmt as SpecialQty, InvItem.SubAmt, \n";
                strSql += "Invoice.SubTotal, Invoice.GST, Invoice.GstAmt, Invoice.TotalAmt, Item.AssemblyBOM, InvItem.CustItemNo as ChineseDesc, \n";
                strSql += "InvItem.AddQty, InvItem.AddUOM as Location, UOM.UOM as BaseUOM, '' as AmountinWords, isnull(InvItem.Remarks,'') as LineRemarks, \n";
                strSql += "Customer.ShipName, (select CAST(ISNULL(InvItem.Qty/UOM.BaseQty,0) As Integer) from UOM where UOM.ItemNO=InvItem.ItemNO and UOM.UOM='CS') as DryQty, \n";
                strSql += "(select round((select ISNULL((CAST(InvItem.Qty As Integer) % CAST(UOM.BaseQty AS Integer)),0) from UOM Where UOM.UOM='CS' and UOM.ItemNO=InvItem.ItemNO)/UOM.BaseQty,0) from UOM where UOM.ItemNO=InvItem.ItemNO and UOM.UOM='PK') As ChillQty, 'CS' as ShipAdd3, 'PK' as ShipAdd4, \n";
                strSql += "isnull(Invoice.ShipCity,'') as ShipCity, isnull(Invoice.ShipPin,'') as ShipPost, isnull(Invoice.Discount,0) as OthersQty, isnull(InvItem.PackingSize,'') as PickingList, isnull(Invoice.PoNo,'') as LotNo, \n";
                strSql += "isnull(Invoice.ConfirmedBy,'') as ConfirmedBy, isnull(Invoice.CurCode,'') as CurCode, isnull(Invoice.DisPer,0) as DisPer, '" + sAgentID + "' as PrintedBy,OrderHDR.ORDDT as ExpiryDate,Customer.PaymentMethod as RefNo,CUSTOMER.GSTNO as DONO  into InvoiceReport  FROM Customer INNER JOIN \n";
                strSql += "Invoice ON Customer.CustNo = Invoice.CustId INNER JOIN ORDERHDR on ORDERHDR.ORDNO=INVOICE.ORDNO INNER JOIN InvItem ON Invoice.InvNo = InvItem.InvNo INNER JOIN UOM ON UOM.ITEMNO=INVITEM.ITEMNO and UOM.UOM='CS' INNER JOIN BARANGAY ON BARANGAY.CODE=CUSTOMER.ADDRESS3 inner join Country on Country.Code=Customer.Address4 inner join Item ON \n";
                // strSql += "InvItem.ItemNo = Item.ItemNo where Invoice.OrdNo IN ( " + strInvNo + ") \n";
                strSql += "InvItem.ItemNo = Item.ItemNo where Invoice.InvNo IN ( " + strInvNo + ") \n";
                strSql += "Union SELECT Invoice.SalesCoord, CASE WHEN isnull(InvItem.Remarks,'') <> '' THEN InvItem.[Description] + char(13) + InvItem.Remarks ELSE InvItem.[Description] END as Description, \n";
                strSql += "InvItem.[LineNo] as Line, InvItem.ItemNo, NewCust.CustID as CustNO, NewCust.CustName, NewCust.Address as Add1, NewCust.Address2 as Add2, Barangay.BarangayName as Add3, \n";
                strSql += "CASE WHEN NewCust.City IS NULL THEN '' ELSE ISNULL(COUNTRY.NAME,'') +', '+ B1.CityName + ' - ' END + isnull(NewCust.Pin,'') as Add4, NewCust.Phone, \n";
                strSql += "NewCust.Contact as Attn, '' as Fax, isnull(Invoice.Remarks,'') as Remarks, '*' + Invoice.InvNo + '*' AS InvNo, Invoice.InvDt as InvDate, Invoice.PoNo, \n";
                strSql += "NewCust.AgentId,(select Description From PayTerms Where Code=NewCust.PaymentTerms) as Terms, InvItem.Qty/UOM.BASEQTY AS QTY, InvItem.Price*UOM.BASEQTY AS Price,Invoice.EwtAmt as SpecialQty, InvItem.SubAmt, \n";
                strSql += "Invoice.SubTotal, Invoice.GST, Invoice.GstAmt, Invoice.TotalAmt, Item.AssemblyBOM, InvItem.CustItemNo as ChineseDesc, \n";
                strSql += "InvItem.AddQty, InvItem.AddUOM as Location, UOM.UOM as BaseUOM, '' as AmountinWords, isnull(InvItem.Remarks,'') as LineRemarks, \n";
                strSql += "'' as ShipName, (select CAST(ISNULL(InvItem.Qty/UOM.BaseQty,0) As Integer) from UOM where UOM.ItemNO=InvItem.ItemNO and UOM.UOM='CS') as DryQty, \n";
                strSql += "(select round((select ISNULL((CAST(InvItem.Qty As Integer) % CAST(UOM.BaseQty AS Integer)),0) from UOM Where UOM.UOM='CS' and UOM.ItemNO=InvItem.ItemNO)/UOM.BaseQty,0) from UOM where UOM.ItemNO=InvItem.ItemNO and UOM.UOM='PK') As ChillQty, 'CS' as ShipAdd3, 'PK' as ShipAdd4, \n";
                strSql += "isnull(Invoice.ShipCity,'') as ShipCity, isnull(Invoice.ShipPin,'') as ShipPost, isnull(Invoice.Discount,0) as OthersQty, isnull(InvItem.PackingSize,'') as PickingList, isnull(Invoice.PoNo,'') as LotNo, \n";
                strSql += "isnull(Invoice.ConfirmedBy,'') as ConfirmedBy, isnull(Invoice.CurCode,'') as CurCode, isnull(Invoice.DisPer,0) as DisPer,  '" + sAgentID + "' as PrintedBy,OrderHDR.ORDDT as ExpiryDate,'' as RefNo,'' as DONO  FROM NewCust INNER JOIN \n";
                strSql += "Invoice ON NewCust.CustID = Invoice.CustId INNER JOIN ORDERHDR on ORDERHDR.ORDNO=INVOICE.ORDNO INNER JOIN InvItem ON Invoice.InvNo = InvItem.InvNo INNER JOIN UOM ON UOM.ITEMNO=INVITEM.ITEMNO and UOM.UOM='CS' Left JOIN BARANGAY ON BARANGAY.CODE=NewCust.Barangay inner join BARANGAY B1 on B1.CityCode=NewCust.City inner join Country on Country.Code=NewCust.Province inner join Item ON \n";
                strSql += "InvItem.ItemNo = Item.ItemNo where Invoice.InvNo IN ( " + strInvNo + ") \n";
                strSql += " order by [LineNo]";

                VehicleAssignmentLog(strSql);
                _commonRule.executerQuery(strSql);
                return RedirectToAction("ReportView1", "Reports", new { InitReport = "select 1 as A", ReportName = "Select 'LoadInvoiceRep' as ReportName ", LoadReport = "select * from InvoiceReport" });

            }


            catch (Exception ex)
            {
                /// MsgBox(ex.Message);
                /// 
                return View();
            }

            // frmStatus.Close()
        }



        public ActionResult CreateInvoiceReport(string strInvNo, string sRptName)
        {
            return RedirectToAction("ReportView1", "Reports", new { InitReport = "select 1 as A", ReportName = "Select 'LoadInvoiceRep' as ReportName ", LoadReport = "select * from InvoiceReport" });
            // return RedirectToAction("ReportView", "Reports", new { InitReport = "select 1 as A", ReportName = "Select 'LoadInvoiceRep' as ReportName ", LoadReport = "select * from InvoiceReport" });
        }
        public ActionResult CreateInvoiceReportJSU(string strInvNo, string sRptName)
        {
            var userId = Session["UserId"];
            //return RedirectToAction("ReportView1", "Reports", new { InitReport = "select 1 as A", ReportName = "Select 'LoadInvoiceRep' as ReportName ", LoadReport = "select * from InvoiceReport_" + userId + "  as InvoiceReport " });
            if (Session["ProjectName"].ToString() == "JSU" && (userId.ToString().Contains("tkm") || userId.ToString().Contains("TKM")))
            {
                strInvNo = strInvNo.Replace("','", ",");
                return RedirectToAction("ReportView1", "Reports", new { InitReport = "select 1 as A", ReportName = "Select 'INVOICETKMREP' as ReportName ", LoadReport = "exec [dbo].[InvoicePrintTKM] " + strInvNo + ",'" + userId + "'" });
            }
            //else if (userId.ToString().Contains("opc") || userId.ToString().Contains("OPC"))
            //{
            //    strInvNo = strInvNo.Replace("','", ",");
            //    return RedirectToAction("ReportView1", "Reports", new { InitReport = "select 1 as A", ReportName = "Select 'InvoiceRepOPC' as ReportName ", LoadReport = "exec [dbo].[InvoicePrintOPCUSer] " + strInvNo + ",'" + userId + "'" });
            //}
            else
                return RedirectToAction("ReportView1", "Reports", new { InitReport = "select 1 as A", ReportName = "Select 'LoadInvoiceRep' as ReportName ", LoadReport = "select * from InvoiceReport_" + userId + "  as InvoiceReport " });
        }

        public ActionResult CreateInvoiceReportPVM(string strInvNo, string sRptName)
        {
            var userId = Session["UserId"];
            return RedirectToAction("ReportView1", "Reports", new { InitReport = "select 1 as A", ReportName = "Select 'LoadInvoiceRep' as ReportName ", LoadReport = "select * from InvoiceReport_" + userId + "  as InvoiceReport " });
        }


        public JsonResult GetInvoiceReportCountOne(string strInvNo, string sRptName)
        {
            try
            {
                ErrorLogString1("Start GetInvoiceReportCount");
                var userId = Session["UserId"];
                string InitReport = "select 1 as A";
                string ReportName = "Select 'CreateInvoiceRep' as ReportName ";
                string LoadReport = " Exec [dbo].[Report_CreateInvoice] 'select * from InvoiceReport_" + userId + " where invno =''*" + strInvNo + "*''' ";

                //  string LoadReport = "select * from InvoiceReport_" + userId + " where invno ='*" + strInvNo + "*' ";
                LoadReport = ReplaceSpecialCharacter(LoadReport);
                string Query = InitReport + ";" + ReportName + ";" + LoadReport + ";";
                ErrorLogString1("Query = " + Query);
                VehicleAssignmentLog(Query);
                DataSet ds = new DataSet();
                SqlConnection con = new SqlConnection(constr);
                con.Open();
                //Query = "Declare @AgentID varchar(50); if  'AZU'='ALL' Set @AgentID= '%' else Set @AgentID=concat('AZU','%') ; SELECT Item.Description as ItemName, StockOrder.StockNo, StockOrder.OrdDt as StockDt, dbo.fn_UOM_Description(StockOrderItem.ItemNo, IsNull(StockOrderItem.Qty,0)* UOM.BaseQty) as Status, StockOrder.AgentID as AgentId, StockOrderItem.ItemNo, StockOrderItem.UOM, StockOrderItem.Qty FROM StockOrder, StockOrderItem, Item, UOM,SalesManGroup Where SalesManGroup.GroupID=StockOrder.AgentID and SalesManGroup.UserID='admin' and StockOrder.StockNo = StockOrderItem.StockNo and StockOrderItem.ItemNo = Item.ItemNo  and StockOrderItem.ItemNo=UOM.ItemNo and StockOrderItem.UOM=UOM.UOM and convert(date,OrdDt) = '2018-10-26'  and StockOrder.AgentID like @AgentID  order by Item.ItemNo";
                SqlDataAdapter da = new SqlDataAdapter(Query, con);
                da.SelectCommand.CommandTimeout = 3600;// 600;  //30*60=1800 // 60- seconds
                da.Fill(ds);
                con.Close();
                Session["ReportDataset"] = ds.Copy();
                //Print();
                GetPageCount();
            }
            catch (Exception ex)
            {
                ErrorLogString1(ex.Message);
            }
            ErrorLogString1("End GetInvoiceReportCount");
            return Json(Session["PageCount"]);
        }
        public ActionResult GetReportCount()
        {
            return Json(Session["counta"]);
            // return RedirectToAction("ReportView", "Reports", new { InitReport = "select 1 as A", ReportName = "Select 'LoadInvoiceRep' as ReportName ", LoadReport = "select * from InvoiceReport" });
        }
        public string LoadVariancePanel(List<ArrDoc> arr)
        {
            try
            {
                conn = new SqlConnection(constr);
                var query = "Delete from InvReport";
                VehicleAssignmentLog(query);
                var result = _commonRule.executerQuery(query);

                string strSQL = "";
                string Message = "";
                SqlDataReader dtr;
                string oldShipAgent = "";
                string strInvNo = "";
                for (int i = 0; (i <= (arr.Count - 1)); i++)
                {
                    var obj = arr[i];
                    if ((oldShipAgent == ""))
                    {
                        oldShipAgent = obj.Code;
                    }

                    if ((strInvNo == ""))
                    {
                        strInvNo = obj.Desc;
                        //strInvNo = "'" + obj.Desc + "'";
                    }
                    else
                    {
                        strInvNo = (strInvNo + ("," + obj.Desc));
                        // strInvNo = (strInvNo + ("," + "'" + obj.Desc + "'"));
                    }

                    if ((i == (arr.Count - 1)))
                    {
                        if ((strInvNo != ""))
                        {
                            strSQL = ("insert into InvReport(CustName,ItemNo,Description,Location,BaseUOM,Qty,OrdBulkQty,OrdLooseQty,InvQty," +
                            "InvUOM,VarQty,VarUOM) " + (@"select '' as ShipAgent, A.ItemNO,A.ItemName as Description,A.Name as Location,'PD' as BaseUOM,A.Qty,(select ISNULL(BaseQty,0) from UOM Where UOM.ItemNO=A.ItemNO and UOM='CS' ) as BulkOrdQty,(select ISNULL(BaseQty,0) from UOM Where UOM.ItemNO=A.ItemNO and UOM='PK' ) as LooseOrdQty, (select ISNULL(Sum(GoodsInvn.Qty),0) from GoodsInvn Where GoodsInvn.ItemNO=A.ItemNO and GoodsInvn.Location=A.Location) As INVQTY,'PD' as INVUOM, 0 as VarQty,'PD' as VarUOM from (select OrdItem.ItemNo,Item.ItemName, sum(Qty) as Qty,OrdItem.Location, Location.Name from OrdItem Inner Join OrderHDR  on OrderHDr.OrdNo=OrdItem.OrdNO inner join Item On OrdItem.ItemNo=Item.ItemNo inner join Location on Location.Code=OrdItem.Location where OrderHdr.OrdNo in ("
                                        + (strInvNo + ") group by OrdItem.ItemNO,Item.ItemName,OrdItem.Location,Location.Name) as A ")));
                            VehicleAssignmentLog(strSQL);
                            result = _commonRule.executerQuery(strSQL);
                            // objDo.ExecuteSQL(strSQL);
                        }

                    }

                }

                //new code
                strSQL = @"select ItemNo,Description,BaseUOM AS UOM,Qty,OrdBulkUOm as BulkUOM,OrdBulkQty as BulkQty,OrdLooseUOM as LooseUOM,OrdLooseQty as LooseQty,InvUOM,InvQty,InvBulkUOM,InvBulkQty,InvLooseUOM,InvLooseQty,VarUOM,VarQty,VarBulkUOM,VarBulkQty,VarLooseUOM,VarLooseQty,Location from InvReport order by CustName";

                VehicleAssignmentLog(strSQL);

                conn.Open();
                SqlCommand cmd = new SqlCommand(strSQL, conn);

                using (SqlDataReader rs = cmd.ExecuteReader())
                {
                    var qry = string.Empty;
                    while ((rs.Read() == true))
                    {
                        if (double.Parse(rs["Qty"].ToString()) > double.Parse(rs["InvQty"].ToString()))
                        {
                            Message = "1";
                            break;
                        }

                    }
                }

                if ((Message == "1"))
                {
                    LoadItems();
                    //open dialog popup
                    //StockVarFrm Frm = new StockVarFrm();
                    //Frm.LoadItems(dtInvReport1);
                    //if ((Frm.ShowDialog == Windows.Forms.DialogResult.OK))
                    //{

                    //}

                }

                return Message;
            }
            catch (Exception ex)
            {
                //System.IO.File.AppendAllText((Application.StartupPath + "\\Vehicle_Assignment_Log.txt"), ("StockVariancePanel: "
                //                + (ex.Message + "\r\n")));
                return "1";
            }

        }


        public string LoadVariancePanelJSU(List<ArrDoc> arr)
        {
            try
            {
                conn = new SqlConnection(constr);
                var query = "Delete from InvReport";
                VehicleAssignmentLog(query);
                var result = _commonRule.executerQuery(query);

                string strSQL = "";
                string Message = "";
                SqlDataReader dtr;
                string oldShipAgent = "";
                string strInvNo = "";
                for (int i = 0; (i <= (arr.Count - 1)); i++)
                {
                    var obj = arr[i];
                    if ((oldShipAgent == ""))
                    {
                        oldShipAgent = obj.Code;
                    }

                    if ((strInvNo == ""))
                    {
                        strInvNo = obj.Desc;
                        //strInvNo = "'" + obj.Desc + "'";
                    }
                    else
                    {
                        strInvNo = (strInvNo + ("," + obj.Desc));
                        // strInvNo = (strInvNo + ("," + "'" + obj.Desc + "'"));
                    }

                    if ((i == (arr.Count - 1)))
                    {
                        if ((strInvNo != ""))
                        {
                            strSQL = ("insert into InvReport(CustName,ItemNo,Description,Location,BaseUOM,Qty,OrdBulkQty,OrdLooseQty,InvQty," +
                            "InvUOM,VarQty,VarUOM) " + (@"select '' as ShipAgent, A.ItemNO,A.ItemName as Description,A.Name as Location,'PD' as BaseUOM,A.Qty,(select ISNULL(BaseQty,0) from UOM Where UOM.ItemNO=A.ItemNO and UOM='CS' ) as BulkOrdQty,(select ISNULL(BaseQty,0) from UOM Where UOM.ItemNO=A.ItemNO and UOM='PK' ) as LooseOrdQty, (select ISNULL(Sum(GoodsInvn.Qty),0) from GoodsInvn Where GoodsInvn.ItemNO=A.ItemNO and GoodsInvn.Location=A.Location) As INVQTY,'PD' as INVUOM, 0 as VarQty,'PD' as VarUOM from (select OrdItem.ItemNo,Item.ItemName, sum(Qty) as Qty,OrdItem.Location, Location.Name from OrdItem Inner Join OrderHDR  on OrderHDr.OrdNo=OrdItem.OrdNO inner join Item On OrdItem.ItemNo=Item.ItemNo inner join Location on Location.Code=OrdItem.Location where OrderHdr.OrdNo in ("
                                        + (strInvNo + ") group by OrdItem.ItemNO,Item.ItemName,OrdItem.Location,Location.Name) as A ")));
                            VehicleAssignmentLog("InvReport Insert qry : " + strSQL);
                            VehicleAssignmentLog(strSQL);
                            result = _commonRule.executerQuery(strSQL);
                            // objDo.ExecuteSQL(strSQL);
                        }

                    }

                }

                //new code
                strSQL = @"select ItemNo,Description,BaseUOM AS UOM,Qty,OrdBulkUOm as BulkUOM,OrdBulkQty as BulkQty,OrdLooseUOM as LooseUOM,OrdLooseQty as LooseQty,InvUOM,InvQty,InvBulkUOM,InvBulkQty,InvLooseUOM,InvLooseQty,VarUOM,VarQty,VarBulkUOM,VarBulkQty,VarLooseUOM,VarLooseQty,Location from InvReport order by CustName";

                VehicleAssignmentLog(strSQL);

               // VehicleAssignmentLog("Qty>InvQty check qry : " + strSQL);
                conn.Open();
                SqlCommand cmd = new SqlCommand(strSQL, conn);

                using (SqlDataReader rs = cmd.ExecuteReader())
                {
                    var qry = string.Empty;
                    while ((rs.Read() == true))
                    {
                        var projectName = Session["ProjectName"].ToString();
                        if (projectName.ToLower() == "jsu")
                        {
                            if (double.Parse(rs["Qty"].ToString()) > double.Parse(rs["InvQty"].ToString()) && double.Parse(rs["Qty"].ToString()) != 0) // request by Sudhakar on 07.11.2023
                            //if (double.Parse(rs["Qty"].ToString()) > double.Parse(rs["InvQty"].ToString()) && double.Parse(rs["Qty"].ToString()) == 0)  //request by sudhakar
                            //if (double.Parse(rs["Qty"].ToString()) > double.Parse(rs["InvQty"].ToString()) || double.Parse(rs["Qty"].ToString()) == 0)  //request by sudhakar on 06.11.2023 due to Stock Variance Report Empty
                            {
                                Message = "1";
                                break;
                            }
                        }
                        else
                        {
                            if (double.Parse(rs["Qty"].ToString()) > double.Parse(rs["InvQty"].ToString()) && double.Parse(rs["Qty"].ToString()) != 0)
                            {
                                Message = "1";
                                break;
                            }
                        }

                    }
                }

                if ((Message == "1"))
                {
                    LoadItems();
                    //open dialog popup
                    //StockVarFrm Frm = new StockVarFrm();
                    //Frm.LoadItems(dtInvReport1);
                    //if ((Frm.ShowDialog == Windows.Forms.DialogResult.OK))
                    //{

                    //}

                }

                return Message;
            }
            catch (Exception ex)
            {
                //System.IO.File.AppendAllText((Application.StartupPath + "\\Vehicle_Assignment_Log.txt"), ("StockVariancePanel: "
                //                + (ex.Message + "\r\n")));
                return "1";
            }

        }


        public string LoadVariancePanelPVM(List<ArrDoc> arr)
        {
            try
            {
                conn = new SqlConnection(constr);
                var query = "Delete from InvReport";
                var result = _commonRule.executerQuery(query);

                string strSQL = "";
                string Message = "";
                SqlDataReader dtr;
                string oldShipAgent = "";
                string strInvNo = "";
                for (int i = 0; (i <= (arr.Count - 1)); i++)
                {
                    var obj = arr[i];
                    if ((oldShipAgent == ""))
                    {
                        oldShipAgent = obj.Code;
                    }

                    if ((strInvNo == ""))
                    {
                        strInvNo = obj.Desc;
                        //strInvNo = "'" + obj.Desc + "'";
                    }
                    else
                    {
                        strInvNo = (strInvNo + ("," + obj.Desc));
                        // strInvNo = (strInvNo + ("," + "'" + obj.Desc + "'"));
                    }

                    if ((i == (arr.Count - 1)))
                    {
                        if ((strInvNo != ""))
                        {
                            //strSQL = ("insert into InvReport(CustName,ItemNo,Description,Location,BaseUOM,Qty,OrdBulkQty,OrdLooseQty,InvQty," +
                            //"InvUOM,VarQty,VarUOM) " + (@"select '' as ShipAgent, A.ItemNO,A.ItemName as Description,A.Name as Location,'PD' as BaseUOM,A.Qty,(select ISNULL(BaseQty,0) from UOM Where UOM.ItemNO=A.ItemNO and UOM='CS' ) as BulkOrdQty,(select ISNULL(BaseQty,0) from UOM Where UOM.ItemNO=A.ItemNO and UOM='PK' ) as LooseOrdQty, (select ISNULL(Sum(GoodsInvn.Qty),0) from GoodsInvn Where GoodsInvn.ItemNO=A.ItemNO and GoodsInvn.Location=A.Location) As INVQTY,'PD' as INVUOM, 0 as VarQty,'PD' as VarUOM from (select OrdItem.ItemNo,Item.ItemName, sum(Qty) as Qty,OrdItem.Location, Location.Name from OrdItem Inner Join OrderHDR  on OrderHDr.OrdNo=OrdItem.OrdNO inner join Item On OrdItem.ItemNo=Item.ItemNo inner join Location on Location.Code=OrdItem.Location where OrderHdr.OrdNo in ("
                            //            + (strInvNo + ") group by OrdItem.ItemNO,Item.ItemName,OrdItem.Location,Location.Name) as A ")));

                            strSQL = ("insert into InvReport(InvNo,CustName,ItemNo,Description,Location,BaseUOM,Qty,InvQty," +
                            "InvUOM,VarQty,VarUOM) " + (@"select  '', '' as ShipAgent, Item.ItemNO, Item.ItemName as Description, Location.Name as Location, Item.BaseUOM as BaseUOM,OrdItem.Qty*UOM.BaseQty as Qty, Isnull(goodsinvn.Qty,0) as  INVQTY, goodsinvn.Uom as INVUOM,  	(IsNull(goodsinvn.Qty,0)-IsNull(OrdItem.Qty*UOM.BaseQty,0)) as  VarQty,Item.BaseUOM as VarUOM 	FROM Customer INNER JOIN OrderHdr ON Customer.CustNo = OrderHdr.CustId INNER JOIN OrdItem ON OrderHdr.OrdNo = OrdItem.OrdNo  INNER JOIN Item ON OrdItem.ItemNo = Item.ItemNo  INNER JOIN UOM ON OrdItem.ItemNo = UOM.ItemNo and OrdItem.UOM = UOM.UOM   inner join Location on OrdItem.Location = Location.Code  Left join  goodsinvn on OrdItem.ItemNo= goodsinvn.ItemNo and goodsinvn.Location=OrdItem.Location where OrderHdr.OrdNo in ("
                            + (strInvNo + ") and OrdItem.Qty > 0 order by Item.Itemno ")));// As instructed by Kaja/Sudhakar - 26.09.2023

                            // objDo.ExecuteSQL(strSQL);
                            VehicleAssignmentLog(strSQL);
                            result = _commonRule.executerQuery(strSQL);
                            // objDo.ExecuteSQL(strSQL);
                        }

                    }

                }

                //new code
                strSQL = @"select ItemNo,Description,BaseUOM AS UOM,Qty, InvUOM,InvQty,VarUOM,VarQty,Location from InvReport order by CustName";

                VehicleAssignmentLog(strSQL);

                conn.Open();
                SqlCommand cmd = new SqlCommand(strSQL, conn);

                using (SqlDataReader rs = cmd.ExecuteReader())
                {
                    var qry = string.Empty;
                    while ((rs.Read() == true))
                    {
                        //if (double.Parse(rs["Qty"].ToString()) > double.Parse(rs["InvQty"].ToString()) && double.Parse(rs["Qty"].ToString()) != 0)
                        if (double.Parse(rs["Qty"].ToString()) > double.Parse(rs["InvQty"].ToString()) || double.Parse(rs["Qty"].ToString()) == 0)  //request by sudhakar
                        {
                            Message = "1";
                            break;
                        }

                    }
                }

                if ((Message == "1"))
                {
                    // AS OF NOW IT IS COMMENTED 05.03.2021 ==============================================
                    // LoadItems();
                }

                return Message;
            }
            catch (Exception ex)
            {
                return "1";
            }

        }
        public string LoadVariancePanelEtika(List<ArrDoc> arr)
        {
            try
            {
                conn = new SqlConnection(constr);
                var query = "Delete from InvReport";
                VehicleAssignmentLog(query);
                var result = _commonRule.executerQuery(query);

                string strSQL = "";
                string Message = "";
                SqlDataReader dtr;
                string oldShipAgent = "";
                string strInvNo = "";
                for (int i = 0; (i <= (arr.Count - 1)); i++)
                {
                    var obj = arr[i];
                    if ((oldShipAgent == ""))
                    {
                        oldShipAgent = obj.Code;
                    }

                    if ((strInvNo == ""))
                    {
                        strInvNo = obj.Desc;
                        //strInvNo = "'" + obj.Desc + "'";
                    }
                    else
                    {
                        strInvNo = (strInvNo + ("," + obj.Desc));
                        // strInvNo = (strInvNo + ("," + "'" + obj.Desc + "'"));
                    }

                    if ((i == (arr.Count - 1)))
                    {
                        if ((strInvNo != ""))
                        {
                            //strSQL = ("insert into InvReport(InvNo,CustName,ItemNo,Description,Location,BaseUOM,Qty,InvQty," +
                            //"InvUOM,VarQty,VarUOM) " + (@"select  '', '' as ShipAgent, Item.ItemNO, Item.ItemName as Description, Location.Name as Location, Item.BaseUOM as BaseUOM,OrdItem.Qty*UOM.BaseQty as Qty, goodsinvn.Qty as  INVQTY, goodsinvn.Uom as INVUOM,  	(IsNull(goodsinvn.Qty,0)-IsNull(OrdItem.Qty*UOM.BaseQty,0)) as  VarQty,Item.BaseUOM as VarUOM 	FROM Customer INNER JOIN OrderHdr ON Customer.CustNo = OrderHdr.CustId INNER JOIN OrdItem ON OrderHdr.OrdNo = OrdItem.OrdNo  INNER JOIN Item ON OrdItem.ItemNo = Item.ItemNo  INNER JOIN UOM ON OrdItem.ItemNo = UOM.ItemNo and OrdItem.UOM = UOM.UOM   inner join Location on OrdItem.Location = Location.Code  inner join  goodsinvn on OrdItem.ItemNo= goodsinvn.ItemNo and goodsinvn.Location=OrdItem.Location where OrderHdr.OrdNo in ("
                            //+ (strInvNo + ") order by Item.Itemno ")));
                            strSQL = ("insert into InvReport(InvNo,CustName,ItemNo,Description,Location,BaseUOM,Qty,InvQty," +
                           "InvUOM,VarQty,VarUOM) " + (@"select DISTINCT  '', '' as ShipAgent, Item.ItemNO, Item.ItemName as Description, Location.Name as Location, Item.BaseUOM as BaseUOM,OrdItem.Qty*UOM.BaseQty as Qty, SUM(goodsinvn.Qty) as  INVQTY, goodsinvn.Uom as INVUOM,  	(IsNull(SUM(goodsinvn.Qty),0)-IsNull(OrdItem.Qty*UOM.BaseQty,0)) as  VarQty,Item.BaseUOM as VarUOM 	FROM Customer INNER JOIN OrderHdr ON Customer.CustNo = OrderHdr.CustId INNER JOIN OrdItem ON OrderHdr.OrdNo = OrdItem.OrdNo  INNER JOIN Item ON OrdItem.ItemNo = Item.ItemNo INNER JOIN UOM ON OrdItem.ItemNo = UOM.ItemNo and OrdItem.UOM = UOM.UOM   inner join Location on OrdItem.Location = Location.Code inner join  goodsinvn on OrdItem.ItemNo= goodsinvn.ItemNo and goodsinvn.Location=OrdItem.Location where OrderHdr.OrdNo in ("
                           + (strInvNo + ") Group by  Item.ItemNO,Item.ItemName,Location.Name,Item.BaseUOM,OrdItem.Qty*UOM.BaseQty,goodsinvn.Uom,Item.BaseUOM order by Item.Itemno  ")));
                            VehicleAssignmentLog(strSQL);
                            result = _commonRule.executerQuery(strSQL);
                        }

                    }

                }

                //new code
                strSQL = @"select ItemNo,Description,BaseUOM AS UOM,Qty, InvUOM,InvQty,VarUOM,VarQty,Location from InvReport order by CustName";
                VehicleAssignmentLog(strSQL);
                conn.Open();
                SqlCommand cmd = new SqlCommand(strSQL, conn);

                using (SqlDataReader rs = cmd.ExecuteReader())
                {
                    var qry = string.Empty;
                    while ((rs.Read() == true))
                    {
                        if (double.Parse(rs["Qty"].ToString()) > double.Parse(rs["InvQty"].ToString()) && double.Parse(rs["Qty"].ToString()) != 0)
                        {
                            Message = "1";
                            break;
                        }

                    }
                }

                if ((Message == "1"))
                {
                    // AS OF NOW IT IS COMMENTED 05.03.2021 ==============================================
                    // LoadItems();
                }

                return Message;
            }
            catch (Exception ex)
            {
                return "1";
            }

        }

        //public void LoadItems(DataTable dtInvReport1)
        public void LoadItems()
        {

            var strSql = "update InvReport set OrdBulkUOm ='CS',OrdLooseUOM='PK',InvBulkUOM='CS',InvLooseUOM='PK',VarBulkUOM='CS',VarLooseUOM='PK'";
            VehicleAssignmentLog(strSql);
            _commonRule.executerQuery(strSql);

            var strSQL = "select ItemNo,Description,BaseUOM AS UOM,Qty,OrdBulkUOm as BulkUOM,OrdBulkQty as BulkQty,OrdLooseUOM as LooseUOM,OrdLooseQty as LooseQty,InvUOM,InvQty,InvBulkUOM,InvBulkQty,InvLooseUOM,InvLooseQty,VarUOM,VarQty,VarBulkUOM,VarBulkQty,VarLooseUOM,VarLooseQty,Location from InvReport where ItemNo='CHTOTAL' order by CustName";

            //string strSql = "SELECT NodeTreeType,NodeTreeValue from SalesAgent Where SalesAgent.UserID='" + Session["UserId"] + "'";
            VehicleAssignmentLog(strSQL);
            conn = new SqlConnection(constr);
            conn.Open();
            SqlCommand cmd = new SqlCommand(strSQL, conn);

            using (SqlDataReader rs = cmd.ExecuteReader())
            {
                while ((rs.Read() == true))
                {
                    string LooseUOM = "PK";
                    string BulkUOM = "CS";
                    double LooseQty = 0;
                    double BulkQty = 0;

                    BulkQty = Convert.ToDouble(rs["BulkQty"]);
                    LooseQty = Convert.ToDouble(rs["LooseQty"]);
                    double TempQty = 0;
                    double TempInvQty = 0;
                    double TempVarQty = 0;
                    double TempBulkQty = 0;
                    double TempLooseQty = 0;

                    if (rs["Qty"].ToString() != "")
                        TempQty = System.Convert.ToDouble(rs["Qty"].ToString());
                    else
                        TempQty = 0;

                    if (rs["InvQty"].ToString().ToString() != "")
                        TempInvQty = System.Convert.ToDouble(rs["InvQty"].ToString());
                    else
                        TempInvQty = 0;

                    if (TempQty > TempInvQty & TempInvQty >= 0)
                        TempVarQty = TempQty - TempInvQty;
                    else if (TempInvQty < 0)
                        TempVarQty = TempQty;
                    else
                        TempVarQty = 0;



                    if (TempQty >= BulkQty)
                    {
                        TempBulkQty = TempQty / BulkQty;
                        //  dtInvReport1.Rows(j)(5) = Conversion.Int(TempBulkQty);
                        TempLooseQty = TempQty % BulkQty;
                        // dtInvReport1.Rows(j)(7) = TempLooseQty / LooseQty;

                        strSQL = "update InvReport set OrdBulkQty ='" + Convert.ToInt64(TempBulkQty) + "',OrdLooseQty='" + (TempLooseQty / LooseQty) + "' where ItemNo='" + rs["ItemNo"] + "' ";
                        VehicleAssignmentLog(strSQL);
                        _commonRule.executerQuery(strSQL);

                    }
                    else
                    {
                        //dtInvReport1.Rows(j)(5) = 0;
                        //dtInvReport1.Rows(j)(7) = TempQty / LooseQty;

                        strSQL = "update InvReport set OrdBulkQty ='0',OrdLooseQty='" + (TempQty / LooseQty) + "' where ItemNo='" + rs["ItemNo"] + "' ";
                        VehicleAssignmentLog(strSQL); 
                        _commonRule.executerQuery(strSQL);
                    }

                    if (TempInvQty >= BulkQty)
                    {
                        TempBulkQty = TempInvQty / BulkQty;
                        TempLooseQty = 0;
                        // dtInvReport1.Rows(j)(11) = Conversion.Int(TempBulkQty);
                        TempLooseQty = TempInvQty % BulkQty;
                        // dtInvReport1.Rows(j)(13) = TempLooseQty / LooseQty;

                        strSQL = "update InvReport set InvBulkQty ='" + Convert.ToInt64(TempBulkQty) + "',InvLooseQty='" + (TempLooseQty / LooseQty) + "' where ItemNo='" + rs["ItemNo"] + "' ";
                        VehicleAssignmentLog(strSQL); 
                        _commonRule.executerQuery(strSQL);
                    }
                    else
                    {
                        //dtInvReport1.Rows(j)(11) = 0;
                        //dtInvReport1.Rows(j)(13) = TempInvQty / LooseQty;

                        strSQL = "update InvReport set InvBulkQty ='0',InvLooseQty='" + (TempInvQty / LooseQty) + "' where ItemNo='" + rs["ItemNo"] + "' ";
                        VehicleAssignmentLog(strSQL);
                        _commonRule.executerQuery(strSQL);
                    }

                    if (TempVarQty >= BulkQty)
                    {
                        TempBulkQty = TempVarQty / BulkQty;
                        TempLooseQty = 0;
                        // dtInvReport1.Rows(j)(17) = Conversion.Int(TempBulkQty);
                        TempLooseQty = TempVarQty % BulkQty;
                        //dtInvReport1.Rows(j)(19) = TempLooseQty / LooseQty;
                        strSQL = "update InvReport set VarBulkQty ='" + Convert.ToInt64(TempBulkQty) + "',VarLooseQty='" + (TempLooseQty / LooseQty) + "' where ItemNo='" + rs["ItemNo"] + "' ";
                        VehicleAssignmentLog(strSQL); 
                        _commonRule.executerQuery(strSQL);
                    }
                    else
                    {
                        //dtInvReport1.Rows(j)(17) = 0;
                        //dtInvReport1.Rows(j)(19) = TempVarQty / LooseQty;
                        strSQL = "update InvReport set VarBulkQty ='0',VarLooseQty='" + (TempVarQty / LooseQty) + "' where ItemNo='" + rs["ItemNo"] + "' ";
                        VehicleAssignmentLog(strSQL); 
                        _commonRule.executerQuery(strSQL);
                    }


                    if (TempVarQty > 0)
                    {
                    }

                    else
                    {
                       // strSQL = "delete from InvReport where ItemNo='" + rs["ItemNo"] + "' ";
                       // _commonRule.executerQuery(strSQL);
                    }
                }
            }
            conn.Close();


        }

        public class ArrDoc
        {
            public string Desc { get; set; }
            public string Code { get; set; }
            public DateTime delidt { get; set; }
            public string sType { get; set; }
            public string ordNo { get; set; }
        }

        public class ArrDoc1
        {
            public string Desc { get; set; }
            public string Code { get; set; }
            public DateTime delidt { get; set; }
            public DateTime delidtfrom { get; set; }

            public DateTime delidtto { get; set; }
            public DateTime manifestdt { get; set; }
            public string sType { get; set; }
            public string ordNo { get; set; }
        }

        //public void printReport(List<Thing> things,List<ArrDoc> arrDoc, string sType, DateTime delidt, string strInvNo)
        //public void printReport(string VehicleId, string sType, DateTime delidt, string strInvNo)
        public JsonResult printReport(List<ArrDoc> arrDoc)
        {
            try
            {
                string sType = string.Empty; DateTime delidt = DateTime.Now; string strInvNo = string.Empty; string VehicleId = string.Empty;
                if (arrDoc.Count > 0)
                {
                    VehicleId = arrDoc[0].Code;
                    delidt = arrDoc[0].delidt;
                    sType = arrDoc[0].sType;
                    strInvNo = arrDoc[(arrDoc.Count - 1)].ordNo;
                }


                //else if ((sType.ToUpper() == "Create Invoice".ToUpper()))
                if ((sType.ToUpper() == "Create Invoice".ToUpper()))
                {
                    string Message = "";
                    if ((strInvNo != ""))
                    {
                        //  LoadVariancePanel1
                        Message = LoadVariancePanel(arrDoc);
                        if ((Message == ""))
                        {
                            var strInvNoList = strInvNo.Split(',');
                            for (int i = 0; i < strInvNoList.Count(); i++)
                            {
                                string docNo = strInvNoList[i].Replace("'", "");//obj.Desc;
                                string VehicleID = VehicleId;// obj.Code;
                                //string Docdt = delidt.ToString("yyyy-MM-dd 00:00:00");
                                DateTime Docdt = delidt;
                                CreateInvoice(docNo, VehicleID, Docdt);
                            }
                            LoadInvoiceReport(strInvNo, "EverHomeInvoiceRep", "order");

                        }
                        else if ((Message == "1"))
                        {
                            return Json(1);
                        }
                        //LoadOrders();
                    }

                }

            }
            catch (Exception ex)
            {

            }
            return Json("");

        }

        public JsonResult printReport_POC(List<ArrDoc> arrDoc)
        {
            try
            {
                string sType = string.Empty; DateTime delidt = DateTime.Now; string strInvNo = string.Empty; string VehicleId = string.Empty;
                if (arrDoc.Count > 0)
                {
                    VehicleId = arrDoc[0].Code;
                    delidt = arrDoc[0].delidt;
                    sType = arrDoc[0].sType;
                    strInvNo = arrDoc[(arrDoc.Count - 1)].ordNo;
                }


                //else if ((sType.ToUpper() == "Create Invoice".ToUpper()))
                if ((sType.ToUpper() == "Create Invoice".ToUpper()))
                {
                    string Message = "";
                    if ((strInvNo != ""))
                    {
                        //  LoadVariancePanel1
                        Message = "";//LoadVariancePanel(arrDoc);
                        if ((Message == ""))
                        {
                            var strInvNoList = strInvNo.Split(',');
                            for (int i = 0; i < strInvNoList.Count(); i++)
                            {
                                string docNo = strInvNoList[i].Replace("'", "");//obj.Desc;
                                string VehicleID = VehicleId;// obj.Code;
                                //string Docdt = delidt.ToString("yyyy-MM-dd 00:00:00");
                                DateTime Docdt = delidt;
                                CreateInvoice(docNo, VehicleID, Docdt);
                            }
                            LoadInvoiceReport_POC(strInvNo, "EverHomeInvoiceRep", "order");

                        }
                        else if ((Message == "1"))
                        {
                            return Json(1);
                        }
                        //LoadOrders();
                    }

                }

            }
            catch (Exception ex)
            {

            }
            return Json("");

        }


        public JsonResult printReportJSU(List<ArrDoc> arrDoc)
        {
            try
            {

                VehicleAssignmentLog("Start");
                string sType = string.Empty; DateTime delidt = DateTime.Now; string strInvNo = string.Empty; string VehicleId = string.Empty;
                if (arrDoc.Count > 0)
                {
                    VehicleId = arrDoc[0].Code;
                    delidt = arrDoc[0].delidt;
                    sType = arrDoc[0].sType;
                    strInvNo = arrDoc[(arrDoc.Count - 1)].ordNo;
                }
                _strInvNo = strInvNo.Replace("'","");
                VehicleAssignmentLog("Ord No : " + strInvNo);

                //else if ((sType.ToUpper() == "Create Invoice".ToUpper()))
                if ((sType.ToUpper() == "Create Invoice".ToUpper()))
                {
                    string Message = "";
                    if ((strInvNo != ""))
                    {
                        //  LoadVariancePanel1
                        Message = LoadVariancePanelJSU(arrDoc);
                        VehicleAssignmentLog("LoadVariancePanelJSU return : " + Message);

                        if ((Message == ""))
                        {
                            var strInvNoList = strInvNo.Split(',');
                            for (int i = 0; i < strInvNoList.Count(); i++)
                            {
                                if (strInvNoList[i] == InvNoWithUserName.Split('-')[0])
                                {
                                    var query = "Insert into DuplicateInvoiceLog(OrdNo,OgInvNo,DTG,SourceDoc)valies('" + InvNoWithUserName.Split('-')[0] + "','" + InvNoWithUserName.Split('-')[1] + "','" + DateTime.Now.ToString("yyyy-MM-dd hh:mm:ss fff") + "','CreateInvoiceFromOrderJSUWeb')";
                                    VehicleAssignmentLog(query);
                                    var objexec = new CommonRule();
                                    objexec.executerQuery(query);
                                }
                                else
                                {
                                    //Commented by Nisha 18-04-2024
                                 //   InvNoWithUserName = strInvNoList[i] + "-" + Session["UserId"];

                                    string docNo = strInvNoList[i].Replace("'", "");//obj.Desc;
                                    string VehicleID = VehicleId;// obj.Code;
                                                                 //string Docdt = delidt.ToString("yyyy-MM-dd 00:00:00");
                                    DateTime Docdt = delidt;
                                    if (strOrderNo == docNo)
                                        System.Threading.Thread.Sleep(20000);
                                    else
                                        strOrderNo = docNo;
                                    VehicleAssignmentLog("CreateInvoice : docNo : " + docNo + " , VehicleID : " + VehicleID + " , Docdt:" + Docdt);
                                    CreateInvoice(docNo, VehicleID, Docdt);
                                }
                            }
                           
                            //  LoadInvoiceReportJSU(strInvNo, "EverHomeInvoiceRep", "order");
                            LoadCreateInvoiceReportJSU(strInvNo, "EverHomeInvoiceRep", "order");
                        }
                        else if ((Message == "1"))
                        {
                            return Json(1);
                        }
                        //LoadOrders();
                    }

                }

            }
            catch (Exception ex)
            {

            }
            return Json("");

        }



        public JsonResult printReportPVM(List<ArrDoc> arrDoc)
        {
            try
            {
                string sType = string.Empty; DateTime delidt = DateTime.Now; string strInvNo = string.Empty; string VehicleId = string.Empty;
                if (arrDoc.Count > 0)
                {
                    VehicleId = arrDoc[0].Code;
                    delidt = arrDoc[0].delidt;
                    sType = arrDoc[0].sType;
                    strInvNo = arrDoc[(arrDoc.Count - 1)].ordNo;
                }

                //else if ((sType.ToUpper() == "Create Invoice".ToUpper()))
                if ((sType.ToUpper() == "Create Invoice".ToUpper()))
                {
                    string Message = "";
                    if ((strInvNo != ""))
                    {
                        //  LoadVariancePanel1
                        Message = LoadVariancePanelPVM(arrDoc);
                        if ((Message == ""))
                        {
                            var strInvNoList = strInvNo.Split(',');
                            for (int i = 0; i < strInvNoList.Count(); i++)
                            {
                                string docNo = strInvNoList[i].Replace("'", "");//obj.Desc;
                                string VehicleID = VehicleId;// obj.Code;
                                //string Docdt = delidt.ToString("yyyy-MM-dd 00:00:00");
                                DateTime Docdt = delidt;
                                CreateInvoice(docNo, VehicleID, Docdt);
                            }
                            //  LoadInvoiceReportJSU(strInvNo, "EverHomeInvoiceRep", "order");
                            LoadCreateInvoiceReportPVM(strInvNo, "EverHomeInvoiceRep", "order");
                        }
                        else if ((Message == "1"))
                        {
                            return Json(1);
                        }
                        //LoadOrders();
                    }

                }

            }
            catch (Exception ex)
            {

            }
            return Json("");

        }

        public JsonResult printReportEtika(List<ArrDoc> arrDoc)
        {
            try
            {
                string sType = string.Empty; DateTime delidt = DateTime.Now; string strInvNo = string.Empty; string VehicleId = string.Empty;
                if (arrDoc.Count > 0)
                {
                    VehicleId = arrDoc[0].Code;
                    delidt = arrDoc[0].delidt;
                    sType = arrDoc[0].sType;
                    strInvNo = arrDoc[(arrDoc.Count - 1)].ordNo;
                }

                //else if ((sType.ToUpper() == "Create Invoice".ToUpper()))
                if ((sType.ToUpper() == "Create Invoice".ToUpper()))
                {
                    string Message = "";
                    if ((strInvNo != ""))
                    {
                        //  LoadVariancePanel1
                        Message = LoadVariancePanelEtika(arrDoc);
                        if ((Message == ""))
                        {
                            var strInvNoList = strInvNo.Split(',');
                            for (int i = 0; i < strInvNoList.Count(); i++)
                            {
                                string docNo = strInvNoList[i].Replace("'", "");//obj.Desc;
                                string VehicleID = VehicleId;// obj.Code;
                                //string Docdt = delidt.ToString("yyyy-MM-dd 00:00:00");
                                DateTime Docdt = delidt;
                                CreateInvoice(docNo, VehicleID, Docdt);
                            }
                            //  LoadInvoiceReportJSU(strInvNo, "EverHomeInvoiceRep", "order");
                            LoadCreateInvoiceReportEtika(strInvNo, "EverHomeInvoiceRep", "order");
                        }
                        else if ((Message == "1"))
                        {
                            return Json(1);
                        }
                        //LoadOrders();
                    }

                }

            }
            catch (Exception ex)
            {

            }
            return Json("");

        }

        public JsonResult GetCreateManifestFrostfood(List<ArrDoc1> arrDoc)
        {
            try
            {
                var projectName = Session["ProjectName"].ToString();

                string sType = string.Empty; string strInvNo = string.Empty; string VehicleId = string.Empty;
                DateTime delidt = DateTime.Now;
                DateTime DeliDateFrom = DateTime.Now;
                DateTime DeliDateTo = DateTime.Now;
                DateTime ManifestDt = DateTime.Now;

                if (arrDoc.Count > 0)
                {
                    VehicleId = arrDoc[0].Code;
                    delidt = arrDoc[0].delidt;
                    sType = arrDoc[0].sType;
                    strInvNo = arrDoc[(arrDoc.Count - 1)].ordNo;
                    try
                    {
                        DeliDateFrom = arrDoc[0].delidtfrom;
                        DeliDateTo = arrDoc[0].delidtto;
                        ManifestDt = arrDoc[0].manifestdt;
                    }
                    catch { }
                }


                //else if ((sType.ToUpper() == "Create Invoice".ToUpper()))
                if ((sType.ToUpper() == "Create Manifest".ToUpper()))
                {
                    string Message = "";
                    if ((strInvNo != ""))
                    {
                        //  LoadVariancePanel1
                        //Message = LoadVariancePanel(arrDoc);
                        //if ((Message == ""))
                        //{
                        var strInvNoList = strInvNo.Split(',');
                        var ManifestNo = GetManifestNo();
                        for (int i = 0; i < strInvNoList.Count(); i++)
                        {
                            string docNo = strInvNoList[i].Replace("'", "");//obj.Desc;
                            string VehicleID = VehicleId;// obj.Code;
                            string Docdt = delidt.ToString("yyyy-MM-dd 00:00:00");
                            string Docdtfrom = DeliDateFrom.ToString("yyyy-MM-dd 00:00:00");
                            string Docdtto = DeliDateTo.ToString("yyyy-MM-dd 00:00:00");
                            string DocManifestDt = ManifestDt.ToString("yyyy-MM-dd 00:00:00");
                            // DateTime Docdt = delidt;
                            //CreateInvoice(docNo, VehicleID, Docdt);
                            CreateManifestFrostFood(docNo, VehicleID, Docdt, Docdtfrom, Docdtto, DocManifestDt, ManifestNo);
                        }

                    }

                }

            }
            catch (Exception ex)
            {

            }
            return Json("");

        }

        public JsonResult GetCreateManifest(List<ArrDoc> arrDoc)
        {
            try
            {
                string sType = string.Empty; DateTime delidt = DateTime.Now; string strInvNo = string.Empty; string VehicleId = string.Empty;
                if (arrDoc.Count > 0)
                {
                    VehicleId = arrDoc[0].Code;
                    delidt = arrDoc[0].delidt;
                    sType = arrDoc[0].sType;
                    strInvNo = arrDoc[(arrDoc.Count - 1)].ordNo;
                }


                //else if ((sType.ToUpper() == "Create Invoice".ToUpper()))
                if ((sType.ToUpper() == "Create Manifest".ToUpper()))
                {
                    string Message = "";
                    if ((strInvNo != ""))
                    {
                        //  LoadVariancePanel1
                        //Message = LoadVariancePanel(arrDoc);
                        //if ((Message == ""))
                        //{
                        var strInvNoList = strInvNo.Split(',');
                        var ManifestNo = GetManifestNo();
                        for (int i = 0; i < strInvNoList.Count(); i++)
                        {
                            string docNo = strInvNoList[i].Replace("'", "");//obj.Desc;
                            string VehicleID = VehicleId;// obj.Code;
                            string Docdt = delidt.ToString("yyyy-MM-dd 00:00:00");
                            // DateTime Docdt = delidt;
                            //CreateInvoice(docNo, VehicleID, Docdt);
                            CreateManifest(docNo, VehicleID, Docdt, ManifestNo);
                        }

                    }

                }

            }
            catch (Exception ex)
            {

            }
            return Json("");

        }


        public void CreateManifest(string strOrdNo, string strVehicleNo, string strOrdDate, string ManifestNo)
        {
            try
            {
                //objDo.ExecuteSQL("Exec InsertManifest @OrderNo = " + objDo.SafeSQL(strOrdNo) + ",@VehicleNo = " + objDo.SafeSQL(strVehicleNo) + ",@OrderDate = " + objDo.SafeSQL(strOrdDate) + ",@ManifestNo = " + objDo.SafeSQL(ManifestNo));

                var query = "Exec InsertManifest @OrderNo = '" + strOrdNo + "',@VehicleNo = '" + strVehicleNo + "',@OrderDate = '" + strOrdDate + "',@ManifestNo = '" + ManifestNo + "'";
                VehicleAssignmentLog(query);
                var result = _commonRule.executerQuery(query);

                //SqlDataReader rs;
                string strSql = "";
                strSql = "Update OrderHdr Set PickingStatus=8,VehicleId='" + strVehicleNo + "' where OrdNo = '" + strOrdNo + "' ";
                //objDo.ExecuteSQL(strSql);
                VehicleAssignmentLog(strSql);
                result = _commonRule.executerQuery(strSql);
                string sLastVehicleID = "";


                strSql = "Update Transferhdr Set IsCompleted=1 where TransNo = '" + strOrdNo + "' ";
                VehicleAssignmentLog(strSql);
                result = _commonRule.executerQuery(strSql);
            }

            catch (Exception ex)
            {
                ErrorLog(ex);
                // Interaction.MsgBox(ex.Message);
            }
        }


        public void CreateManifestFrostFood(string strOrdNo, string strVehicleNo, string strOrdDate, string strOrdDateFrom, string strOrdDateTo, string strManifestDate, string ManifestNo)
        {
            try
            {
                //objDo.ExecuteSQL("Exec InsertManifest @OrderNo = " + objDo.SafeSQL(strOrdNo) + ",@VehicleNo = " + objDo.SafeSQL(strVehicleNo) + ",@OrderDate = " + objDo.SafeSQL(strOrdDate) + ",@ManifestNo = " + objDo.SafeSQL(ManifestNo));

                var query = "Exec InsertManifest @OrderNo = '" + strOrdNo + "',@VehicleNo = '" + strVehicleNo + "',@OrderDate = '" + strOrdDate + "',@OrderDateFrom = '" + strOrdDateFrom + "',@OrderDateTo = '" + strOrdDateTo + "',@ManifestDate = '" + strManifestDate + "',@ManifestNo = '" + ManifestNo + "'";
                VehicleAssignmentLog(query);
                var result = _commonRule.executerQuery(query);

                //SqlDataReader rs;
                string strSql = "";
                strSql = "Update OrderHdr Set PickingStatus=8,VehicleId='" + strVehicleNo + "' where OrdNo = '" + strOrdNo + "' ";
                //objDo.ExecuteSQL(strSql);
                VehicleAssignmentLog(strSql);
                result = _commonRule.executerQuery(strSql);
                string sLastVehicleID = "";


                strSql = "Update Transferhdr Set IsCompleted=1 where TransNo = '" + strOrdNo + "' ";
                VehicleAssignmentLog(strSql);
                result = _commonRule.executerQuery(strSql);
            }

            catch (Exception ex)
            {
                ErrorLog(ex);
                // Interaction.MsgBox(ex.Message);
            }
        }

        public string GetManifestNo()
        {
            try
            {
                //var query = "Delete from InvReport";
                //var result = _commonRule.executerQuery(query);

                string sMDT = "POD1";
                string sManifestNo = "";
                int iManifestNo;


                var strSql = "Update NoSeries Set LastNumber = LastNumber + 1 WHere DocType = 'MANIFEST' and MDTNo = 'ADMIN'";
                VehicleAssignmentLog(strSql);
                _commonRule.executerQuery(strSql);

                strSql = "SELECT Prefix +REPLICATE('0', NoLength - Len(Prefix) - Len(cast(LastNumber as nvarchar(50)))) + cast(LastNumber as nvarchar(50)) as DocNo from NoSeries WHere DocType = 'MANIFEST' and MDTNo = 'ADMIN'";
                //strSql = "Select MDT.MDTNo,LenManifestNo,PreManifestNo, LastManifestNo  from MDT, System where MDT.MDTNo=System.MdtNo";

                VehicleAssignmentLog(strSql);
                conn = new SqlConnection(constr);
                conn.Open();
                SqlCommand cmd = new SqlCommand(strSql, conn);

                using (SqlDataReader rs = cmd.ExecuteReader())
                {
                    while ((rs.Read() == true))
                    {
                        sManifestNo = rs["DocNo"] == null ? "" : rs["DocNo"].ToString();
                    }
                }
                conn.Close();
                return sManifestNo;
            }
            catch (Exception ex)
            {
                return "";
            }
        }

        public void CreateInvoice(string strOrdNo, string strVehicleNo, DateTime strOrdDate)
        {
            try
            {
                var projectName = Session["ProjectName"].ToString();
                //  string constr = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;

                using (SqlConnection con = new SqlConnection(constr))
                {
                    var sp_CreateInvoice = "CreateInvoiceFromOrderJSU";
                    if (projectName.ToLower() == "jsu")
                    {
                        sp_CreateInvoice = "CreateInvoiceFromOrderJSUWeb";
                    }
                    else if (projectName.ToLower() == "pvm" || projectName.ToLower() == "dms" || projectName.ToLower() == "etika" || projectName.ToLower() == "ffb")
                    {
                        sp_CreateInvoice = "CreateInvoiceFromOrderPVMWeb";
                    }
                    else if (projectName.ToLower() == "poc")
                    {
                        sp_CreateInvoice = "ReassignOrderHDrAgentID";
                    }

                    VehicleAssignmentLog("sp_CreateInvoice  : " + sp_CreateInvoice);

                   

                    using (SqlCommand cmd = new SqlCommand(sp_CreateInvoice, con))
                    //using (SqlCommand cmd = new SqlCommand("CreateInvoiceFromOrderJSU", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        //cmd.Parameters.AddWithValue("@OrdNo", strOrdNo);

                        if (projectName.ToLower() == "poc")
                        {
                            cmd.Parameters.AddWithValue("@OldAgentID", strVehicleNo);

                        }
                        else
                        {
                            cmd.Parameters.AddWithValue("@OrdNo", strOrdNo);
                            if (projectName.ToLower() == "pvm" || projectName.ToLower() == "dms" || projectName.ToLower() == "etika")
                                cmd.Parameters.AddWithValue("@UserID", Session["UserId"]);
                        }
                        VehicleAssignmentLog("OrdNo  : " + strOrdNo + " => Pvm and Etika only UserID  : " + strOrdNo);

                        con.Open();
                        cmd.CommandTimeout = 1800;
                        cmd.ExecuteNonQuery();
                        con.Close();

                    }
                }


                string strSql = "";
                SqlDataReader rs;
                var result = "";
                if (projectName.ToLower() != "poc")
                {
                    strSql = "Update OrderHdr Set PickingStatus=8 where OrdNo = '" + strOrdNo + "' ";
                    VehicleAssignmentLog("Update qry   : " + strSql);
                    result = _commonRule.executerQuery(strSql);
                }


                //  objDo.ExecuteSQL(strSql);

                string sLastVehicleID = "";

                //new code
                // Dim rs As SqlDataReader
                conn = new SqlConnection(constr);
                strSql = "SELECT Distinct VehicleID from OrderHdr where OrdNo = '" + strOrdNo + "'";
                VehicleAssignmentLog(strSql);
                //VehicleAssignmentLog("Update qry   : " + strSql);
                conn.Open();
                SqlCommand cmd1 = new SqlCommand(strSql, conn);

                using (SqlDataReader rs1 = cmd1.ExecuteReader())
                {
                    while ((rs1.Read() == true))
                    {
                        sLastVehicleID = rs1["VehicleID"].ToString() == "" ? "" : rs1["VehicleID"].ToString();
                    }
                }
                conn.Close();
                strSql = "Update OrderHdr Set VehicleID=LastVehicleID  where LastVehicleID='" + sLastVehicleID + "' ";
                VehicleAssignmentLog("Update qry   : " + strSql);
                result = _commonRule.executerQuery(strSql);

                strSql = "SELECT Distinct VehicleID from Transferhdr where TransNo = '" + strOrdNo + "'";
                VehicleAssignmentLog("Qry   : " + strSql);
                conn.Open();
                cmd1 = new SqlCommand(strSql, conn);

                using (SqlDataReader rs1 = cmd1.ExecuteReader())
                {

                    while ((rs1.Read() == true))
                    {
                        sLastVehicleID = rs1["VehicleID"].ToString() == "" ? "" : rs1["VehicleID"].ToString();
                    }
                }
                conn.Close();
                strSql = "Update Transferhdr Set VehicleID=LastVehicleID  where LastVehicleID= '" + sLastVehicleID + "' ";
                VehicleAssignmentLog("Update qry   : " + strSql);

                result = _commonRule.executerQuery(strSql);
                strSql = "Update Transferhdr Set IsCompleted=1 where TransNo = '" + strOrdNo + "' ";
                VehicleAssignmentLog("Update qry   : " + strSql);

                result = _commonRule.executerQuery(strSql);

            }
            // End If

            catch (Exception ex)
            {
                VehicleAssignmentLog("Exception   : " + ex.Message);
                ErrorLog(ex);
                // Interaction.MsgBox(ex.Message);
            }
        }


        public double fullStartPercentage = 90;
        public int fullEndPercentage = 100;
        public string lowLevelColor = "Green";
        public string mediumLevelColor = "Yellow";
        public string highLevelColor = "Red";


        public JsonResult CalculateVehicles(string sOrderNos, double vehLength, double vehWidth, double vehHeight)
        {
            var backColor = string.Empty;
            try
            {

                //double dVehicleVolume = (((Dimensions1)(ctrl.Tag)).Length
                //            * (((Dimensions1)(ctrl.Tag)).Width * ((Dimensions1)(ctrl.Tag)).Height));
                double dVehicleVolume = (vehLength * (vehWidth * vehHeight));

                double dVehicleTonnage = vehWidth;
                double dOrderItemsVolume = 0;
                double dOrderItemsWeight = 0;
                //sOrderNosstring sOrderNos = "\'\'";


                if ((sOrderNos != "\'\'"))
                {
                    SqlDataReader dtr;

                    //var strSql = "Select OrdItem.ItemNo,OrdItem.UOM,OrdItem.Qty, (UOM.Cubage/UOM.BaseQty) * OrdItem.Qty as Cubage,ISNULL(UOM.Weight,0)/UOM.BaseQty as Weight, " +
                    //    "ISNULL(UOM.[Length],0)/UOM.BaseQty as [Length], ISNULL(UOM.Width,0)/UOM.BaseQty as Width, ISNULL(UOM.Height,0)/UOM.BaseQty as Height " +
                    //    "from OrdItem, UOM ,Item where OrdItem.ItemNo=Item.ItemNO and OrdItem.ItemNo = UOM.ItemNo and Item.BulkUOM = UOM.UOM and " +
                    //    "OrdItem.OrdNo in (" + sOrderNos + ")";

                    //var strSql = "Select OrdItem.ItemNo,OrdItem.UOM,OrdItem.Qty, " +
                    //    " (UOM.Cubage/UOM.BaseQty) * OrdItem.Qty as Cubage, " + 
                    //    " ISNULL(UOM.Weight,0)/UOM.BaseQty as Weight, " +
                    //    "ISNULL(UOM.[Length],0)/UOM.BaseQty as [Length],  " +
                    //    " ISNULL(UOM.Width,0)/UOM.BaseQty as Width,  " + 
                    //    " ISNULL(UOM.Height,0)/UOM.BaseQty as Height " +
                    //    "from OrdItem, UOM ,Item where OrdItem.ItemNo=Item.ItemNO and OrdItem.ItemNo = UOM.ItemNo and Item.BulkUOM = UOM.UOM and " +
                    //    "OrdItem.OrdNo in (" + sOrderNos + ")";

                    //var strSql = "Select OrdItem.ItemNo,OrdItem.UOM,SUM(OrdItem.Qty) as Qty, " +
                    //    " (UOM.Cubage/UOM.BaseQty) * OrdItem.Qty as Cubage, " +
                    //    " ISNULL(UOM.Weight,0)/UOM.BaseQty as Weight, " +
                    //    " ISNULL(UOM.[Length],0)/UOM.BaseQty as [Length],  " +
                    //    " ISNULL(UOM.Width,0)/UOM.BaseQty as Width,  " +
                    //    " ISNULL(UOM.Height,0)/UOM.BaseQty as Height " +
                    //    " from OrdItem, UOM ,Item where OrdItem.ItemNo=Item.ItemNO and OrdItem.ItemNo = UOM.ItemNo and Item.BulkUOM = UOM.UOM and " +
                    //    " OrdItem.OrdNo in (" + sOrderNos + ") group by Item.ItemNo,OrdItem.UOM,UOM.Cubage,OrdItem.Qty,UOM.BaseQty,UOM.Weight, " +
                    //    " UOM.[Length],UOM.Width,UOM.Height";




                    var strSql = "Select OrdItem.ItemNo,OrdItem.UOM,OrdItem.Qty, " +
                        " case when UOM.BaseQty=0 then'0' else (ISNULL(UOM.Cubage,0)/UOM.BaseQty) * OrdItem.Qty end as Cubage,  " +
                        " case when UOM.BaseQty=0 then'0' else ISNULL(UOM.Weight,0)/UOM.BaseQty end as Weight,  " +
                        " case when UOM.BaseQty=0 then'0' else ISNULL(UOM.[Length],0)/UOM.BaseQty  end as [Length],  " +
                        " case when UOM.BaseQty=0 then'0' else ISNULL(UOM.Width,0)/UOM.BaseQty  end as Width,  " +
                        " case when UOM.BaseQty=0 then'0' else ISNULL(UOM.Height,0)/UOM.BaseQty  end as Height " +
                        "from OrdItem, UOM ,Item where OrdItem.ItemNo=Item.ItemNO and OrdItem.ItemNo = UOM.ItemNo and Item.BulkUOM = UOM.UOM and " +
                        "OrdItem.OrdNo in (" + sOrderNos + ")";

                    VehicleAssignmentLog(strSql);

                    conn = new SqlConnection(constr);
                    //strSql = "SELECT Distinct VehicleID from OrderHdr where OrdNo = '" + strOrdNo + "'";
                    conn.Open();
                    SqlCommand cmd1 = new SqlCommand(strSql, conn);
                    using (SqlDataReader rs = cmd1.ExecuteReader())
                    {
                        while ((rs.Read() == true))
                        {
                            //dOrderItemsVolume += (rs["Qty"].ToString() == "" ? 0 : (double.Parse(rs["Qty"].ToString())))
                            //     * (double.Parse(rs["Length"].ToString())) * (double.Parse(rs["Width"].ToString())) * double.Parse(rs["Height"].ToString());
                            dOrderItemsVolume += double.Parse(rs["Cubage"].ToString());
                            dOrderItemsWeight += (rs["Qty"].ToString() == "" ? 0 : (double.Parse(rs["Qty"].ToString()))) * double.Parse(rs["Weight"].ToString());

                        }
                    }
                    conn.Close();
                }

                if ((sOrderNos != "\'\'"))
                {
                    //var strSql = @"Select TransferDet.Qty, ISNULL(UOM.Weight,0) as Weight, ISNULL(UOM.[Length],0) as [Length], ISNULL(UOM.Width,0) as Width, ISNULL(UOM.Height,0) as Height from TransferDet, UOM where TransferDet.ItemNo = UOM.ItemNo and TransferDet.UOM = UOM.UOM and TransferDet.TransNo in ("
                     //                 + sOrderNos + ")";
                     //Changes done by surya 11-04-2024
                    var strSql = @"Select OrdItem.Qty, ISNULL(UOM.Weight,0) as Weight, ISNULL(UOM.[Length],0) as [Length], ISNULL(UOM.Width,0) as Width, ISNULL(UOM.Height,0) as Height from OrdItem, UOM where OrdItem.ItemNo = UOM.ItemNo and OrdItem.UOM = UOM.UOM and OrdItem.OrdNo in ("
                                      + sOrderNos + ")";

                    VehicleAssignmentLog(strSql);

                    conn = new SqlConnection(constr);
                    conn.Open();
                    SqlCommand cmd1 = new SqlCommand(strSql, conn);

                    using (SqlDataReader rs = cmd1.ExecuteReader())
                    {
                        while ((rs.Read() == true))
                        {
                            dOrderItemsVolume += (rs["Qty"].ToString() == "" ? 0 : double.Parse(rs["Qty"].ToString())) * double.Parse(rs["Length"].ToString())
                                   * double.Parse(rs["Width"].ToString()) * double.Parse(rs["Height"].ToString());

                            //dOrderItemsWeight += (dOrderItemsWeight
                                        //+ (rs["Qty"].ToString() == "" ? 0 : (double.Parse(rs["Qty"].ToString())) * double.Parse(rs["Weight"].ToString())));
                            dOrderItemsWeight += (rs["Qty"].ToString() == "" ? 0 : (double.Parse(rs["Qty"].ToString())) * double.Parse(rs["Weight"].ToString()));
                        }
                    }
                    conn.Close();
                }
                if ((dOrderItemsVolume >= (dVehicleVolume * (fullEndPercentage / 100))))
                {
                    // 'HIGH
                    //ctrl.BackColor = highLevelColor;
                    backColor = highLevelColor;



                }
                else if ((dOrderItemsWeight >= (dVehicleTonnage * (fullEndPercentage / 100))))
                {
                    // 'HIGH
                    backColor = highLevelColor;


                }
                else if ((dOrderItemsVolume >= (dVehicleVolume * (fullStartPercentage / 100))))
                {
                    // 'MEDIUM
                    backColor = mediumLevelColor;

                }
                else if ((dOrderItemsWeight >= (dVehicleTonnage * (fullStartPercentage / 100))))
                {
                    // 'MEDIUM
                    backColor = mediumLevelColor;

                }
                else
                {
                    // 'LOW
                    backColor = lowLevelColor;

                }


            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                //System.IO.File.AppendAllText((Application.StartupPath + "\\Vehicle_Assignment_Log.txt"), ("Calculate Vehicles: "
                //                + (ex.Message + "\r\n")));
            }

            return Json(backColor);
        }



        public ActionResult StockVarianceCreateExcel(string path)
        {
            try
            {
                //return Json("test");

                Microsoft.Office.Interop.Excel.Application xlApp = new Microsoft.Office.Interop.Excel.Application();
                // return Json("test");
                if (xlApp == null)
                {
                    // MessageBox.Show("Excel is not properly installed!!");
                    return Json("Excel is not properly installed!!");
                }

                Microsoft.Office.Interop.Excel.Workbook xlWorkBook;
                Microsoft.Office.Interop.Excel.Worksheet xlWorkSheet;
                object misValue = System.Reflection.Missing.Value;

                xlWorkBook = xlApp.Workbooks.Add(misValue);
                xlWorkSheet = (Microsoft.Office.Interop.Excel.Worksheet)xlWorkBook.Worksheets.get_Item(1);

                xlWorkSheet.Cells[1, 1] = "Location";
                xlWorkSheet.Cells[1, 2] = "ItemNo";
                xlWorkSheet.Cells[1, 3] = "Item Name";
                xlWorkSheet.Cells[1, 4] = "Ordered Qty (Bulk)";
                xlWorkSheet.Cells[1, 5] = "Ordered Qty (Loose)";
                xlWorkSheet.Cells[1, 6] = "Inventory (Bulk)";
                xlWorkSheet.Cells[1, 7] = "Inventory (Loose)";
                xlWorkSheet.Cells[1, 8] = "Variance (Bulk)";
                xlWorkSheet.Cells[1, 9] = "Variance (Loose)";

                conn = new SqlConnection(constr);
                conn.Open();
                var strSql = "select ItemNo,Description,BaseUOM AS UOM,Qty,OrdBulkUOm as BulkUOM,OrdBulkQty as BulkQty,OrdLooseUOM as LooseUOM,OrdLooseQty as LooseQty,InvUOM,InvQty,InvBulkUOM,InvBulkQty,InvLooseUOM,InvLooseQty,VarUOM,VarQty,VarBulkUOM,VarBulkQty,VarLooseUOM,VarLooseQty,Location from InvReport order by CustName";

                VehicleAssignmentLog(strSql);

                SqlCommand cmd1 = new SqlCommand(strSql, conn);

                using (SqlDataReader rs = cmd1.ExecuteReader())
                {
                    var z = 2;
                    while ((rs.Read() == true))
                    {
                        xlWorkSheet.Cells[z, 1] = rs["Location"];
                        xlWorkSheet.Cells[z, 2] = rs["ItemNo"];
                        xlWorkSheet.Cells[z, 3] = rs["Description"];
                        xlWorkSheet.Cells[z, 4] = rs["BulkQty"];
                        xlWorkSheet.Cells[z, 5] = rs["LooseQty"];
                        xlWorkSheet.Cells[z, 6] = rs["InvBulkQty"];
                        xlWorkSheet.Cells[z, 7] = rs["InvLooseQty"];
                        xlWorkSheet.Cells[z, 8] = rs["VarBulkQty"];
                        xlWorkSheet.Cells[z, 9] = rs["VarLooseQty"];

                        z++;

                    }
                }
                conn.Close();

                //E:\Source\JSU\SimplrSales\SimplrSales\Files\StockVarince
                //Here saving the file in xlsx
                path = System.IO.Path.Combine(Server.MapPath("~/ImportFiles/StockVarince/"), "stockVarince.xlsx");
                //  path = Server.MapPath("~/Files/StockVarince/") + "stockVarince.xlsx";

                if (System.IO.File.Exists(path))
                {
                    System.GC.Collect();
                    System.GC.WaitForPendingFinalizers();
                    System.IO.File.Delete(path);
                }

                var path1 = path + "\\stockVarince.xlsx";
                //  xlWorkBook.SaveAs("e:\\stockVarince.xlsx", Microsoft.Office.Interop.Excel.XlFileFormat.xlOpenXMLWorkbook, misValue,

                //xlWorkBook.SaveAs(path, Microsoft.Office.Interop.Excel.XlFileFormat.xlOpenXMLWorkbook, misValue, misValue, misValue, misValue, Microsoft.Office.Interop.Excel.XlSaveAsAccessMode.xlExclusive, misValue, misValue, misValue, misValue, misValue);
                xlWorkBook.SaveAs(path, Microsoft.Office.Interop.Excel.XlFileFormat.xlWorkbookNormal, misValue, misValue, misValue, misValue, Microsoft.Office.Interop.Excel.XlSaveAsAccessMode.xlExclusive, misValue, misValue, misValue, misValue, misValue);


                xlWorkBook.Close(true, misValue, misValue);
                xlApp.Quit();

                //  string fileLocation = Server.MapPath("~/Files/StockVarince/") + "stockVarince.xlsx";
                string fileLocation = System.IO.Path.Combine(Server.MapPath("~/ImportFiles/StockVarince/"), "stockVarince.xlsx");

                Microsoft.Office.Interop.Excel.Application excelApp = new Microsoft.Office.Interop.Excel.Application();
                //  string myPath = (@"C:\Users\User\Desktop\data.xlsx");
                //string myPath = (@"C:\Users\DELL\Desktop\Import Files\SimplrMasterData.xlsx");
                string myPath = (fileLocation);
                excelApp.Workbooks.Open(myPath);
                excelApp.Visible = true;

                //Marshal.ReleaseComObject(xlWorkSheet);
                //Marshal.ReleaseComObject(xlWorkBook);
                //Marshal.ReleaseComObject(xlApp);

                //MessageBox.Show("Excel file created , you can find the file d:\\csharp-Excel.xlsx");
                return Json("Success");

            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                return Json(ex.Message);
            }
        }

        private void PrintPageHandler(object sender, PrintPageEventArgs e)
        {
            Metafile page = pages[pageIndex];
            pageIndex += 1;
            int pWidth = 827;
            int pHeight = 1100;

            System.Drawing.Rectangle adjustedRect = new System.Drawing.Rectangle(
                e.PageBounds.Left - (int)e.PageSettings.HardMarginX,
                e.PageBounds.Top - (int)e.PageSettings.HardMarginY,
                e.PageBounds.Width,
                e.PageBounds.Height);

            // Draw a white background for the report
            e.Graphics.FillRectangle(System.Drawing.Brushes.White, adjustedRect);
            e.Graphics.DrawImage(page, adjustedRect);

            //e.Graphics.DrawImage(page, 0, 0, pWidth, pHeight);
            e.HasMorePages = pageIndex < pages.Count;
            Session["PageCount"] = pages.Count;
        }

        private void GetPageCount()
        {
            FileStream Fs = null;
            FileStream fs = null;
            ReportViewer ReportViewer_obj = null;

            try
            {
                ReportViewer_obj = new ReportViewer();
                ErrorLogString1("Start GetPageCount");
                DataSet ds = new DataSet();
                ds = (DataSet)Session["ReportDataset"];

                string ReportName = "";
                int P = 0;

                if (ds.Tables[1].Rows.Count > 0)
                {
                    ReportName = ds.Tables[1].Rows[0]["ReportName"].ToString();
                }

                var reportDataSource = new ReportDataSource
                {
                    // Must match the DataSource in the RDLC
                    Name = "DataSet1",
                    Value = ds.Tables[2]
                };

                ReportViewer_obj.LocalReport.ReportPath = Server.MapPath("~/Reports/" + ReportName + ".rdlc");

                ReportViewer_obj.LocalReport.EnableHyperlinks = true;
                //ReportViewer_obj.HyperlinkTarget = "_blank";
                ReportViewer_obj.LocalReport.DataSources.Clear();
                ReportViewer_obj.LocalReport.DataSources.Add(reportDataSource);
                ReportViewer_obj.LocalReport.EnableExternalImages = true;

                string deviceInfo = "<DeviceInfo>" + "<OutputFormat>emf</OutputFormat>" + "  <PageWidth>15in</PageWidth>" + "  <PageHeight>8.25in</PageHeight>" + "  <MarginTop>0.25in</MarginTop>" + "  <MarginLeft>0.25in</MarginLeft>" + "  <MarginRight>0.25in</MarginRight>" + "  <MarginBottom>0.25in</MarginBottom>" + "</DeviceInfo>";
                //string deviceInfo = "";
                //Microsoft.Reporting.WinForms.Warning[] warnings;
                Microsoft.Reporting.WebForms.Warning[] warnings;
                string[] streamids;
                string mimeType, encoding, filenameExtension, path;
                mimeType = ""; encoding = ""; filenameExtension = "";

                ErrorLogString1("Create pdf : 1");
                Fs = new FileStream(System.Web.HttpContext.Current.Server.MapPath("~/1.pdf"), FileMode.Create, FileAccess.Write);
                ErrorLogString1("Create pdf : 1.2");
                Byte[] bytes = ReportViewer_obj.LocalReport.Render("PDF", deviceInfo, out mimeType, out encoding, out filenameExtension, out streamids, out warnings);
                ErrorLogString1("Create pdf : 2");

                Fs.Write(bytes, 0, bytes.Length);
                Fs.Close();
                fs = new FileStream(System.Web.HttpContext.Current.Server.MapPath("~/1.pdf"), FileMode.Open, FileAccess.Read);
                ErrorLogString1("Create pdf : 3");

                StreamReader r = new StreamReader(fs);
                string pdfText = r.ReadToEnd();
                ErrorLogString1("Create pdf : 4");

                System.Text.RegularExpressions.Regex regx = new Regex(@"/Type\s*/Page[^s]");
                System.Text.RegularExpressions.MatchCollection matches = regx.Matches(pdfText);
                ErrorLogString1("Create pdf : 5");

                //ObjCpro.UpdateCProStatusQuantityRowsByRowno(cprorow, "Terminado", "", matches.Count);
                Session["PageCount"] = matches.Count;
                ErrorLogString1("Count :" + matches.Count);
                fs.Close();
                ErrorLogString1("End GetPageCount");


            }
            catch (Exception ex)
            {
                ErrorLogString("Exception GetPageCount : " + ex);
                ErrorLogString1("Exception GetPageCount : " + ex.Message);
            }
            finally
            {
                Fs.Close();
                fs.Close();

                // INCLUDED =========
                Fs.Dispose();
                fs.Dispose();

                ReportViewer_obj.Dispose();
                ReportViewer_obj = null;
            }

        }


    }
}
