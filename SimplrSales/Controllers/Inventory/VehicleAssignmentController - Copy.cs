using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SimplrSales.Controllers.Inventory
{
    public class VehicleAssignmentController : Controller
    {
        //
        // GET: /VehicleAssignment/

        public ActionResult Index()
        {
            if (Session["UserName"] != null)
            {
                TempData["ScreenName"] = Session["ScreenName"].ToString(); ;
                ViewBag.ScreenName = Session["ScreenName"].ToString(); ;
                return View();
            }
            else
                return RedirectToAction("Login", "Login");
        }
        //public void LoadPickingReport(string strPrintPickingInvNo, string sRptName)
        //{
        //    var dd = strPrintPickingInvNo;
        //    var ddd = sRptName;
        //}

        string constr = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
        public CommonRule _commonRule = new CommonRule();
        private SqlConnection conn;

        public void LoadPickingReport(string strPrintPickingInvNo, string sRptName)
        {
            try
            {

                conn = new SqlConnection(constr);

                var query = "Delete from InvReport";
                var result = _commonRule.executerQuery(query);
                // objDo.ExecuteSQL("Delete from InvReport");
                string strSql = "";
                //   SqlDataReader rs;
                int iIndex = 0;
                int i = 0;
                string sAgentID = "";
                strSql = "SELECT '' as BinNo, [LineNo],OrdItem.Description, OrderHdr.AgentID, OrdItem.UOM, OrdItem.[LineNo] as Line, OrdItem.ItemNo as ItemNo, Customer.CustNo, Customer.CustName, Customer.Address, Customer.Address2, Customer.Address3, CASE WHEN Customer.City IS NULL THEN '' ELSE Customer.City + ' - ' END + isnull(Customer.PostCode,'') as Address4, Customer.Phone, Customer.ContactPerson, Customer.FaxNo, OrderHdr.Remarks, OrdItem.Remarks as LineRemarks, OrderHdr.ConfirmedBy, OrderHdr.PoNo as DoNo, OrderHdr.OrdNo AS Expr1, OrderHdr.OrdDt as InvDt, OrderHdr.SalesCoord, OrderHdr.PoNo, OrderHdr.AgentId, '' as CustRefNo, OrderHdr.PayTerms, OrdItem.Qty, OrdItem.Price, OrdItem.SubAmt, OrderHdr.SubTotal, OrderHdr.GST, OrderHdr.GstAmt, OrderHdr.TotalAmt, Item.Brand as PickingList,  Item.AssemblyBOM, '' as LotNo, convert(varchar,GetDate(),112) as ExpiryDate, OrdItem.Qty as LotQty, UOM.PackingSize as Attn, Item.ChineseDesc, 0 as AddQty, '' as AddUOM, Location.Name as DefLocation, Item.DefBin, Customer.ShipName, OrderHdr.ShipAdd, OrderHdr.ShipAdd2, OrderHdr.ShipAdd3, OrderHdr.ShipAdd4, OrderHdr.ShipCity, OrderHdr.ShipPin,(select BaseQty From UOM Where UOM.UOM='CS' and UOM.ITemNo=OrdItem.ItemNO) as OrdBulkQty, (select BaseQty From UOM Where UOM.UOM='PK' and UOM.ITemNo=OrdItem.ItemNO) as OrdLooseQty,(select ISNULL(GoodsInvn.Qty,0) from GoodsInvn where GoodsInvn.ItemNo=OrdItem.ItemNo and GoodsInvn.Location=OrdItem.Location) as INVQty,'PD' as InvUOM,0 as VarQty, 'PD' as VarUOM FROM Customer INNER JOIN OrderHdr ON Customer.CustNo = OrderHdr.CustId INNER JOIN OrdItem ON OrderHdr.OrdNo = OrdItem.OrdNo INNER JOIN Item ON OrdItem.ItemNo = Item.ItemNo INNER JOIN UOM ON OrdItem.ItemNo = UOM.ItemNo and OrdItem.UOM = UOM.UOM inner join Location on Location.Code=OrdItem.Location WHERE OrderHdr.OrdNo In (" + strPrintPickingInvNo + ") ";


                string sPUOM = "";


                conn.Open();
                SqlCommand cmd = new SqlCommand(strSql, conn);
                //drr = cmd.ExecuteReader();
                //isExists = drr.Read();
                // using (SqlDataReader reader = cmd.ExecuteReader())
                using (SqlDataReader rs = cmd.ExecuteReader())
                {
                    if (rs.Read())
                    {

                        var ff = rs["InvDt"];
                        var fgg = rs["Price"];
                        var fgg1 = rs["SubAmt"];
                        var fgg3 = rs["SubTotal"];
                        var fgg4 = rs["GstAmt"];
                        var fgg5 = rs["TotalAmt"];


                        DateTime date = DateTime.ParseExact("2010-01-01 23:00:00", "yyyy-MM-dd HH:mm:ss", CultureInfo.InvariantCulture);
                        string formattedDate = date.ToString("yyyy-MM-dd HH:mm:ss");

                        date = DateTime.ParseExact(ff.ToString(), "yyyy-MM-dd HH:mm:ss", CultureInfo.InvariantCulture);
                        formattedDate = date.ToString("yyyy-MM-dd HH:mm:ss");
                        // sAgentID = ((string.IsNullOrEmpty( rs["AgentID"].ToString())) ? "" : rs["AgentID"]);
                        sAgentID = rs["AgentID"].ToString();
                        var qry = "Insert into InvReport(InvNo, InvDate, CustNo, AgentID, CustName, Add1, Add2, Add3, Add4, Phone, Fax, Remarks, DoNo, RefNo, PONo, Terms, Line, ItemNo, Description, Qty, price, SubAmt, SubTotal, GSTAmt, TotalAmt, BaseUOM, ConfirmedBy, SalesCoOrd, PickingList, Attn, ChineseDesc, OthersQty, Location, LineRemarks, ShipName, ShipAdd1, ShipAdd2, ShipAdd3, ShipAdd4, ShipCity, ShipPost, PrintedBy,OrdBulkQty,OrdLooseQty,InvUOM,InvQty,VarUOM,VarQty) values (" +
                                             " ' " + rs["Expr1"].ToString() + " ' " +
                                             " ' " + Convert.ToDateTime(rs["InvDt"]).ToString("yyyy/MM/dd") + " ' " +
                            //  " ' " + Format(rs["InvDt"], "yyyyMMdd HH:mm:ss") + " ' " +
                                             " ' " + rs["CustNo"].ToString() + " ' " +
                                             " ' " + rs["AgentID"].ToString() + " ' " +
                                             " ' " + rs["CustName"].ToString() + " ' " +
                                             " ' " + rs["Address"].ToString() + " ' " +
                                             " ' " + rs["Address2"].ToString() + " ' " +
                                             " ' " + rs["Address3"].ToString() + " ' " +
                                             " ' " + rs["Address4"].ToString() + " ' " +
                                             " ' " + rs["Phone"].ToString() + " ' " +
                                             " ' " + rs["FaxNo"].ToString() + " ' " +
                                             " ' " + rs["Remarks"].ToString() + " ' " +
                                             " ' " + rs["DONo"].ToString() + " ' " +
                                             " ' " + rs["CustRefNo"].ToString() + " ' " +
                                             " ' " + rs["PONo"].ToString() + " ' " +
                                             " ' " + rs["PayTerms"].ToString() + " ' " +
                                             " ' " + rs["Line"].ToString() + " ' " +
                                             " ' " + rs["ItemNo"].ToString() + " ' " +
                                             " ' " + rs["Description"].ToString() + " ' " +
                                             " ' " + rs["Qty"].ToString() + " ' " +

                                            " ' " + Convert.ToDecimal(rs["Price"]).ToString("#.000") + " ' " +
                                            " ' " + Convert.ToDecimal(rs["SubAmt"]).ToString("#.00") + " ' " +
                                            " ' " + Convert.ToDecimal(rs["SubTotal"]).ToString("#.00") + " ' " +
                                            " ' " + Convert.ToDecimal(rs["GstAmt"]).ToString("#.00") + " ' " +
                                            " ' " + Convert.ToDecimal(rs["TotalAmt"]).ToString("#.00") + " ' " +

                            //" ' " + Microsoft.VisualBasic.Strings.Format(rs["Price"], "0.000") + " ' " +
                            //" ' " + Microsoft.VisualBasic.Strings.Format(rs["SubAmt"], "0.00") + " ' " +
                            //" ' " + Microsoft.VisualBasic.Strings.Format(rs["SubTotal"], "0.00") + " ' " +
                            //" ' " + Microsoft.VisualBasic.Strings.Format(rs["GstAmt"], "0.00") + " ' " +
                            //" ' " + Microsoft.VisualBasic.Strings.Format(rs["TotalAmt"], "0.00") + " ' " +
                                             " ' " + rs["UOM"].ToString() + " ' " +
                                             " ' " + rs["ConfirmedBy"].ToString() + " ' " +
                                             " ' " + rs["SalesCoOrd"].ToString() + " ' " +
                                             " ' " + rs["PickingList"].ToString() + " ' " +
                                             " ' " + rs["Attn"].ToString() + " '  " +

                            // " ' " + rs["Attn"].ToString() + " ' )";
                                             " ' " + (string.IsNullOrEmpty(rs["ChineseDesc"].ToString()) ? "" : rs["ChineseDesc"]) + " ' " +
                            // " ' " + (string.IsNullOrEmpty(rs["ChineseDesc"].ToString()) ? "" : rs["ChineseDesc"]) + " ' " +
                                             " ' " + ((string.IsNullOrEmpty(rs["AddQty"].ToString()) ? "0" : rs["AddQty"]) + " ' " +
                                             " ' " + rs["DefLocation"].ToString() + " ' " +
                                             " ' " + (string.IsNullOrEmpty(rs["LineRemarks"].ToString()) ? "" : rs["LineRemarks"]) + " ' " +
                                             " ' " + (string.IsNullOrEmpty(rs["ShipName"].ToString()) ? "" : rs["ShipName"]) + " ' " +
                                             " ' " + (string.IsNullOrEmpty(rs["ShipAdd"].ToString()) ? "" : rs["ShipAdd"]) + " ' " +
                                             " ' " + (string.IsNullOrEmpty(rs["ShipAdd2"].ToString()) ? "" : rs["ShipAdd2"]) + " ' " +
                                             " ' " + (string.IsNullOrEmpty(rs["ShipAdd3"].ToString()) ? "" : rs["ShipAdd3"]) + " ' " +
                                             " ' " + (string.IsNullOrEmpty(rs["ShipAdd4"].ToString()) ? "" : rs["ShipAdd4"]) + " ' " +
                                             " ' " + (string.IsNullOrEmpty(rs["ShipCity"].ToString()) ? "" : rs["ShipCity"]) + " ' " +
                                             " ' " + (string.IsNullOrEmpty(rs["ShipPin"].ToString()) ? "" : rs["ShipPin"]) + " ' " +
                                             " ' " + sAgentID.ToArray() + " ' " +
                                             " ' " + (string.IsNullOrEmpty(rs["OrdBulkQty"].ToString()) ? "0" : rs["OrdBulkQty"]) + " ' " +
                                             " ' " + (string.IsNullOrEmpty(rs["OrdLooseQty"].ToString()) ? "0" : rs["OrdLooseQty"]) + " ' " +
                                             " ' " + (string.IsNullOrEmpty(rs["InvUOM"].ToString()) ? "PD" : rs["InvUOM"]) + " ' " +
                                             " ' " + (string.IsNullOrEmpty(rs["InvQty"].ToString()) ? "0" : rs["InvQty"]) + " ' " +
                                             " ' " + (string.IsNullOrEmpty(rs["VarUOM"].ToString()) ? "PD" : rs["VarUOM"]) + " ' " +
                                             " ' " + (string.IsNullOrEmpty(rs["VarQty"].ToString()) ? "0" : rs["VarQty"])) + "')";

 
                        //" ' " + (IsDBNull(rs["ChineseDesc"]) ? "" : rs["ChineseDesc"]) + " ' " +
                        //+ ((IsDBNull(rs["AddQty"]) ? "0" : rs["AddQty"]() + " ' " +
                        //" ' " + rs["DefLocation"]() + " ' " +
                        //" ' " + (IsDBNull(rs["LineRemarks"]) ? "" : rs["LineRemarks"]) + " ' " +
                        //" ' " + (IsDBNull(rs["ShipName"]) ? "" : rs["ShipName"]) + " ' " +
                        //" ' " + (IsDBNull(rs["ShipAdd"]) ? "" : rs["ShipAdd"]) + " ' " +
                        //" ' " + (IsDBNull(rs["ShipAdd2"]) ? "" : rs["ShipAdd2"]) + " ' " +
                        //" ' " + (IsDBNull(rs["ShipAdd3"]) ? "" : rs["ShipAdd3"]) + " ' " +
                        //" ' " + (IsDBNull(rs["ShipAdd4"]) ? "" : rs["ShipAdd4"]) + " ' " +
                        //" ' " + (IsDBNull(rs["ShipCity"]) ? "" : rs["ShipCity"]) + " ' " +
                        //" ' " + (IsDBNull(rs["ShipPin"]) ? "" : rs["ShipPin"]) + " ' " +
                        //" ' " + sAgentID() + " ' " +
                        //" ' " + (IsDBNull(rs["OrdBulkQty"]) ? "0" : rs["OrdBulkQty"]) + " ' " +
                        //" ' " + (IsDBNull(rs["OrdLooseQty"]) ? "0" : rs["OrdLooseQty"]) + " ' " +
                        //" ' " + (IsDBNull(rs["InvUOM"]) ? "PD" : rs["InvUOM"]) + " ' " +
                        //" ' " + (IsDBNull(rs["InvQty"]) ? "0" : rs["InvQty"]) + " ' " +
                        //" ' " + (IsDBNull(rs["VarUOM"]) ? "PD" : rs["VarUOM"]) + " ' " +
                        //" ' " + (IsDBNull(rs["VarQty"]) ? "0" : rs["VarQty"])) + ")";
                    }
                }
                conn.Close();


                //rs = objDo.ReadRecord(strSql);
                //while ((rs.Read == true))
                //{
                //    try
                //    {
                //        sAgentID = (IsDBNull(rs["AgentID"]) ? "" : rs["AgentID"]);
                //        // If rs("LotNo").ToString = "" Then
                //        objDo.ExecuteSQLAnother((@"Insert into InvReport(InvNo, InvDate, CustNo, AgentID, CustName, Add1, Add2, Add3, Add4, Phone, Fax, Remarks, DoNo, RefNo, PONo, Terms, Line, ItemNo, Description, Qty, price, SubAmt, SubTotal, GSTAmt, TotalAmt, BaseUOM, ConfirmedBy, SalesCoOrd, PickingList, Attn, ChineseDesc, OthersQty, Location, LineRemarks, ShipName, ShipAdd1, ShipAdd2, ShipAdd3, ShipAdd4, ShipCity, ShipPost, PrintedBy,OrdBulkQty,OrdLooseQty,InvUOM,InvQty,VarUOM,VarQty) values ("
                //                        + (objDo.SafeSQL(rs["Expr1"].ToString) + (","
                //                        + (objDo.SafeSQL(Format(rs["InvDt"], "yyyyMMdd HH:mm:ss")) + (","
                //                        + (objDo.SafeSQL(rs["CustNo"].ToString) + (","
                //                        + (objDo.SafeSQL(rs["AgentID"].ToString) + (","
                //                        + (objDo.SafeSQL(rs["CustName"].ToString) + (","
                //                        + (objDo.SafeSQL(rs["Address"].ToString) + (","
                //                        + (objDo.SafeSQL(rs["Address2"].ToString) + (","
                //                        + (objDo.SafeSQL(rs["Address3"].ToString) + (","
                //                        + (objDo.SafeSQL(rs["Address4"].ToString) + (","
                //                        + (objDo.SafeSQL(rs["Phone"].ToString) + (","
                //                        + (objDo.SafeSQL(rs["FaxNo"].ToString) + (","
                //                        + (objDo.SafeSQL(rs["Remarks"].ToString) + (","
                //                        + (objDo.SafeSQL(rs["DONo"].ToString) + (","
                //                        + (objDo.SafeSQL(rs["CustRefNo"].ToString) + (","
                //                        + (objDo.SafeSQL(rs["PONo"].ToString) + (","
                //                        + (objDo.SafeSQL(rs["PayTerms"].ToString) + (","
                //                        + (objDo.SafeSQL(rs["Line"].ToString) + (","
                //                        + (objDo.SafeSQL(rs["ItemNo"].ToString) + (","
                //                        + (objDo.SafeSQL(rs["Description"].ToString) + (","
                //                        + (objDo.SafeSQL(rs["Qty"].ToString) + (","
                //                        + (objDo.SafeSQL(Microsoft.VisualBasic.Strings.Format(rs["Price"], "0.000")) + (","
                //                        + (objDo.SafeSQL(Microsoft.VisualBasic.Strings.Format(rs["SubAmt"], "0.00")) + (","
                //                        + (objDo.SafeSQL(Microsoft.VisualBasic.Strings.Format(rs["SubTotal"], "0.00")) + (","
                //                        + (objDo.SafeSQL(Microsoft.VisualBasic.Strings.Format(rs["GstAmt"], "0.00")) + (","
                //                        + (objDo.SafeSQL(Microsoft.VisualBasic.Strings.Format(rs["TotalAmt"], "0.00")) + (","
                //                        + (objDo.SafeSQL(rs["UOM"]) + (","
                //                        + (objDo.SafeSQL(rs["ConfirmedBy"].ToString) + (","
                //                        + (objDo.SafeSQL(rs["SalesCoOrd"].ToString) + (","
                //                        + (objDo.SafeSQL(rs["PickingList"].ToString) + (","
                //                        + (objDo.SafeSQL(rs["Attn"].ToString) + (","
                //                        + (objDo.SafeSQL((IsDBNull(rs["ChineseDesc"]) ? "" : rs["ChineseDesc"])) + (","
                //                        + ((IsDBNull(rs["AddQty"]) ? "0" : rs["AddQty"]) + (","
                //                        + (objDo.SafeSQL(rs["DefLocation"]) + (","
                //                        + (objDo.SafeSQL((IsDBNull(rs["LineRemarks"]) ? "" : rs["LineRemarks"])) + (","
                //                        + (objDo.SafeSQL((IsDBNull(rs["ShipName"]) ? "" : rs["ShipName"])) + (","
                //                        + (objDo.SafeSQL((IsDBNull(rs["ShipAdd"]) ? "" : rs["ShipAdd"])) + (","
                //                        + (objDo.SafeSQL((IsDBNull(rs["ShipAdd2"]) ? "" : rs["ShipAdd2"])) + (","
                //                        + (objDo.SafeSQL((IsDBNull(rs["ShipAdd3"]) ? "" : rs["ShipAdd3"])) + (","
                //                        + (objDo.SafeSQL((IsDBNull(rs["ShipAdd4"]) ? "" : rs["ShipAdd4"])) + (","
                //                        + (objDo.SafeSQL((IsDBNull(rs["ShipCity"]) ? "" : rs["ShipCity"])) + (","
                //                        + (objDo.SafeSQL((IsDBNull(rs["ShipPin"]) ? "" : rs["ShipPin"])) + (","
                //                        + (objDo.SafeSQL(sAgentID) + (","
                //                        + (objDo.SafeSQL((IsDBNull(rs["OrdBulkQty"]) ? "0" : rs["OrdBulkQty"])) + (","
                //                        + (objDo.SafeSQL((IsDBNull(rs["OrdLooseQty"]) ? "0" : rs["OrdLooseQty"])) + (","
                //                        + (objDo.SafeSQL((IsDBNull(rs["InvUOM"]) ? "PD" : rs["InvUOM"])) + (","
                //                        + (objDo.SafeSQL((IsDBNull(rs["InvQty"]) ? "0" : rs["InvQty"])) + (","
                //                        + (objDo.SafeSQL((IsDBNull(rs["VarUOM"]) ? "PD" : rs["VarUOM"])) + (","
                //                        + (objDo.SafeSQL((IsDBNull(rs["VarQty"]) ? "0" : rs["VarQty"])) + ")")))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))));
                //        // Else
                //        // objDo.ExecuteSQLAnother("Insert into InvReport(InvNo, InvDate, CustNo, AgentID, CustName, Add1, Add2, Add3, Add4, Phone, Fax, Remarks, DoNo, RefNo, PONo, Terms, Line, ItemNo, Description, Qty, price, SubAmt, SubTotal, GSTAmt, TotalAmt, BaseUOM, LotNo, ExpiryDate, LotQty, ConfirmedBy, SalesCoOrd, PickingList, Attn, ChineseDesc, OthersQty, Location, LineRemarks, ShipName, ShipAdd1, ShipAdd2, ShipAdd3, ShipAdd4, ShipCity, ShipPost, PrintedBy,InvUOM,InvQty,VarUOM,VarQty) values (" & objDo.SafeSQL(rs("Expr1").ToString) & "," & objDo.SafeSQL(Format(rs("InvDt"), "yyyyMMdd HH:mm:ss")) & "," & objDo.SafeSQL(rs("CustNo").ToString) & "," & objDo.SafeSQL(rs("AgentID").ToString) & "," & objDo.SafeSQL(rs("CustName").ToString) & "," & objDo.SafeSQL(rs("Address").ToString) & "," & objDo.SafeSQL(rs("Address2").ToString) & "," & objDo.SafeSQL(rs("Address3").ToString) & "," & objDo.SafeSQL(rs("Address4").ToString) & "," & objDo.SafeSQL(rs("Phone").ToString) & "," & objDo.SafeSQL(rs("FaxNo").ToString) & "," & objDo.SafeSQL(rs("Remarks").ToString) & "," & objDo.SafeSQL(rs("DONo").ToString) & "," & objDo.SafeSQL(rs("CustRefNo").ToString) & "," & objDo.SafeSQL(rs("PONo").ToString) & "," & objDo.SafeSQL(rs("PayTerms").ToString) & "," & rs("Line").ToString & "," & objDo.SafeSQL(rs("ItemNo").ToString) & "," & objDo.SafeSQL(rs("Description").ToString) & "," & objDo.SafeSQL(rs("Qty").ToString) & "," & objDo.SafeSQL(Microsoft.VisualBasic.Strings.Format(rs("Price"), "0.000")) & "," & objDo.SafeSQL(Microsoft.VisualBasic.Strings.Format(rs("SubAmt"), "0.00")) & "," & objDo.SafeSQL(Microsoft.VisualBasic.Strings.Format(rs("SubTotal"), "0.00")) & "," & objDo.SafeSQL(Microsoft.VisualBasic.Strings.Format(rs("GstAmt"), "0.00")) & "," & objDo.SafeSQL(Microsoft.VisualBasic.Strings.Format(rs("TotalAmt"), "0.00")) & "," & objDo.SafeSQL(rs("UOM")) & "," & Microsoft.VisualBasic.Interaction.IIf(IsDBNull(rs("LotNo")) = True, "", objDo.SafeSQL(rs("LotNo").ToString)) & "," & Microsoft.VisualBasic.Interaction.IIf(IsDBNull(rs("ExpiryDate")) = True, objDo.SafeSQL("20100101"), objDo.SafeSQL(rs("ExpiryDate").ToString)) & "," & Microsoft.VisualBasic.Interaction.IIf(IsDBNull(rs("LotQty")) = True, "0", objDo.SafeSQL(rs("LotQty"))) & "," & objDo.SafeSQL(rs("ConfirmedBy").ToString) & "," & objDo.SafeSQL(rs("SalesCoOrd").ToString) & "," & objDo.SafeSQL(rs("PickingList").ToString) & "," & objDo.SafeSQL(rs("Attn").ToString) & "," & objDo.SafeSQL(IIf(IsDBNull(rs("ChineseDesc")), "", rs("ChineseDesc"))) & "," & IIf(IsDBNull(rs("AddQty")), "0", rs("AddQty")) & "," & objDo.SafeSQL(rs("DefLocation")) & "," & objDo.SafeSQL(IIf(IsDBNull(rs("LineRemarks")), "", rs("LineRemarks"))) & "," & objDo.SafeSQL(IIf(IsDBNull(rs("ShipName")), "", rs("ShipName"))) & "," & objDo.SafeSQL(IIf(IsDBNull(rs("ShipAdd")), "", rs("ShipAdd"))) & "," & objDo.SafeSQL(IIf(IsDBNull(rs("ShipAdd2")), "", rs("ShipAdd2"))) & "," & objDo.SafeSQL(IIf(IsDBNull(rs("ShipAdd3")), "", rs("ShipAdd3"))) & "," & objDo.SafeSQL(IIf(IsDBNull(rs("ShipAdd4")), "", rs("ShipAdd4"))) & "," & objDo.SafeSQL(IIf(IsDBNull(rs("ShipCity")), "", rs("ShipCity"))) & "," & objDo.SafeSQL(IIf(IsDBNull(rs("ShipPin")), "", rs("ShipPin"))) & "," & objDo.SafeSQL(IIf(IsDBNull(rs("AgentID")), "", rs("AgentID"))) & "," & objDo.SafeSQL(IIf(IsDBNull(rs("InvUOM")), "PD", rs("InvUOM"))) & "," & objDo.SafeSQL(IIf(IsDBNull(rs("InvQty")), "0", rs("InvQty"))) & "," & objDo.SafeSQL(IIf(IsDBNull(rs("VarUOM")), "PD", rs("VarUOM"))) & "," & objDo.SafeSQL(IIf(IsDBNull(rs("VarQty")), "0", rs("VarQty"))) & ")")
                //        // End If
                //    }
                //    catch (Exception ex)
                //    {
                //        MsgBox("Load Report Failed! Please re-try again.");
                //        MsgBox(ex.Message.ToString);
                //    }

                //}

                //rs.Close();
                //rs.Dispose();


                //strSql = ("Select * from InvReport where InvNo In ( "
                //            + (strPrintPickingInvNo + ") order by InvNo"));
                //SqlDataReader dtr = objDo.ReadRecord(strSql);
                //dtInvReport.Clear();
                //dtInvReport.Load(dtr);
                //dtr.Close();
                //for (int j = 0; (j
                //            <= (dtInvReport.Rows.Count - 1)); j++)
                //{
                //    string ItemNo = dtInvReport.Rows[j][17].ToString;
                //    // Dim sSql As String = " select (select BaseQty From UOM Where UOM.UOM='CS' and UOM.ITemNo=Item.ItemNO) as BulkQty, (select BaseQty From UOM Where UOM.UOM='PK' and UOM.ITemNo=Item.ItemNO) as LooseQty from Item Where ItemNo=" & objDo.SafeSQL(ItemNo)
                //    string LooseUOM = "PK";
                //    string BulkUOM = "CS";
                //    double LooseQty = 0;
                //    double BulkQty = 0;
                //    BulkQty = double.Parse((IsNumeric(dtInvReport.Rows[j][55].ToString) ? dtInvReport.Rows[j][55].ToString : 0));
                //    LooseQty = double.Parse((IsNumeric(dtInvReport.Rows[j][57].ToString) ? dtInvReport.Rows[j][57].ToString : 0));
                //    double TempInvQty = 0;
                //    double TempVarQty = 0;
                //    double TempQty = 0;
                //    double TempBulkQty = 0;
                //    double TempLooseQty = 0;
                //    dtInvReport.Rows[j][54] = "CS";
                //    dtInvReport.Rows[j][56] = "PK";
                //    dtInvReport.Rows[j][60] = "CS";
                //    dtInvReport.Rows[j][62] = "PK";
                //    dtInvReport.Rows[j][66] = "CS";
                //    dtInvReport.Rows[j][68] = "PK";
                //    if ((dtInvReport.Rows[j][19].ToString != ""))
                //    {
                //        TempQty = double.Parse(dtInvReport.Rows[j][19].ToString);
                //    }
                //    else
                //    {
                //        TempQty = 0;
                //    }

                //    if ((dtInvReport.Rows[j][59].ToString != ""))
                //    {
                //        TempInvQty = double.Parse(dtInvReport.Rows[j][59].ToString);
                //    }
                //    else
                //    {
                //        TempInvQty = 0;
                //    }

                //    // If dtInvReport.Rows(j)(65).ToString <> "" Then
                //    if (((TempQty > TempInvQty)
                //                && (TempInvQty >= 0)))
                //    {
                //        TempVarQty = (TempQty - TempInvQty);
                //    }
                //    else if ((TempInvQty < 0))
                //    {
                //        TempVarQty = TempQty;
                //    }
                //    else
                //    {
                //        TempVarQty = 0;
                //    }

                //    // Else
                //    // TempVarQty = 0
                //    // End If
                //    if ((TempQty >= BulkQty))
                //    {
                //        TempBulkQty = (TempQty / BulkQty);
                //        dtInvReport.Rows[j][55] = Int(TempBulkQty);
                //        TempLooseQty = (TempQty % BulkQty);
                //        // TempBulkQty = BulkQty * CDbl(dtInvReport.Rows(j)(55).ToString)
                //        // TempLooseQty = CDbl(dtInvReport.Rows(j)(19).ToString) - TempBulkQty
                //        dtInvReport.Rows[j][57] = (TempLooseQty / LooseQty);
                //    }
                //    else
                //    {
                //        dtInvReport.Rows[j][55] = 0;
                //        dtInvReport.Rows[j][57] = (TempQty / LooseQty);
                //    }

                //    if ((TempInvQty >= BulkQty))
                //    {
                //        TempBulkQty = (TempInvQty / BulkQty);
                //        TempLooseQty = 0;
                //        dtInvReport.Rows[j][61] = Int(TempBulkQty);
                //        TempLooseQty = (TempInvQty % BulkQty);
                //        // TempBulkQty = BulkQty * CDbl(dtInvReport.Rows(j)(61).ToString)
                //        // TempLooseQty = CDbl(dtInvReport.Rows(j)(59).ToString) - TempBulkQty
                //        dtInvReport.Rows[j][63] = (TempLooseQty / LooseQty);
                //    }
                //    else
                //    {
                //        dtInvReport.Rows[j][61] = 0;
                //        dtInvReport.Rows[j][63] = (TempInvQty / LooseQty);
                //    }

                //    if ((TempVarQty >= BulkQty))
                //    {
                //        TempBulkQty = (TempVarQty / BulkQty);
                //        TempLooseQty = 0;
                //        dtInvReport.Rows[j][67] = Int(TempBulkQty);
                //        TempLooseQty = (TempVarQty % BulkQty);
                //        // TempBulkQty = BulkQty * CDbl(dtInvReport.Rows(j)(67).ToString)
                //        // TempLooseQty = CDbl(dtInvReport.Rows(j)(65).ToString) - TempBulkQty
                //        dtInvReport.Rows[j][69] = (TempLooseQty / LooseQty);
                //    }
                //    else
                //    {
                //        dtInvReport.Rows[j][67] = 0;
                //        dtInvReport.Rows[j][69] = (TempVarQty / LooseQty);
                //    }

                //}

                //// ExecuteReport(strSql, sRptName, strPrintPickingInvNo, sAgentID, objDo)
                //ExecuteReport1(dtInvReport, sRptName, strPrintPickingInvNo, sAgentID, objDo);
                //}
                //catch (Exception ex)
                //{
                //System.IO.File.AppendAllText((Application.StartupPath + "\\Vehicle_Assignment_Log.txt"), ("LoadPickingReport: "
                //                + (ex.Message + "\r\n")));
                //}

                //}
            }
            catch (Exception ex)
            {
                //MsgBox("Load Report Failed! Please re-try again.");
                //MsgBox(ex.Message.ToString);
            }



        }

    }
}
