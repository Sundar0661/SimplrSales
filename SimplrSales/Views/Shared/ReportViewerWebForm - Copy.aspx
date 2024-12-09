<%@ Page Language="C#" AutoEventWireup="true" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<%@ Register Assembly="Microsoft.ReportViewer.WebForms, Version=15.0.0.0, Culture=neutral, PublicKeyToken=89845dcd8080cc91" Namespace="Microsoft.Reporting.WebForms" TagPrefix="rsweb" %>

<!DOCTYPE html>
<%@ Import Namespace="System" %>
<%@ Import Namespace="System.Data" %>
<%@ Import Namespace="System.Data.SqlClient" %>
<%@ Import Namespace="System.IO" %>
<%@ Import Namespace="System.Text" %>
<%@ Import Namespace="System.Drawing.Printing" %>
<%@ Import Namespace="System.Collections.Generic" %>
<%@ Import Namespace="System.Drawing.Imaging" %>
<%@ Import Namespace="Newtonsoft.Json" %>
<%@ Import Namespace="System.Web.Mvc" %>
<%@ Import Namespace="System.Web" %>
<%@ Import Namespace="System.Web.Services" %>
<%@ Import Namespace="System.Globalization" %>
<%@ Import Namespace="System.Collections.Specialized" %>
<%-- <%@ Import Namespace ="System.Windows.Forms" %>--%>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Report</title>
    <script runat="server">
        private int m_currentPageIndex;
        private IList<Stream> m_streams;
        void Page_Init(object sender, System.EventArgs e)
        {
            Context.Handler = this.Page;
        }
        void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                // LoadReport1();
                LoadReport();
            }
        }
        private void LoadReport()
        {
            DataSet ds = new DataSet();
            ds = (DataSet)Session["ReportDataset"];

            string ReportName = "";
            if (ds != null)
            {
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



                ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reports/" + ReportName + ".rdlc");
                ReportViewer1.LocalReport.EnableHyperlinks = true;
                ReportViewer1.LocalReport.EnableExternalImages = true;
                // ADDTIONALLY ADDED 16.10.2020 ==============================
                ReportViewer1.KeepSessionAlive = true;
                // ADDTIONALLY ADDED 16.10.2020 ==============================
                ReportViewer1.HyperlinkTarget = "_blank";
                ReportViewer1.LocalReport.DataSources.Add(reportDataSource);
                // ReportViewer1.LocalReport.Refresh();
                ReportViewer1.DataBind();

                //ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reports/" + ReportName + ".rdlc");
                //ReportViewer1.LocalReport.EnableHyperlinks = true;
                //ReportViewer1.LocalReport.EnableExternalImages = true;
                //ReportViewer1.KeepSessionAlive = true;
                //ReportViewer1.HyperlinkTarget = "_blank";
                //ReportViewer1.LocalReport.DataSources.Clear();
                //ReportDataSource rdc = new ReportDataSource("DataSet1", ds.Tables[2]);
                //ReportViewer1.LocalReport.DataSources.Add(rdc);
                //ReportViewer1.LocalReport.Refresh();
                //ReportViewer1.DataBind();
            }


        }
        private void LoadReport1()
        {
            try
            {

            }
            catch (Exception ex)
            {

                throw ex;
            }
            string constr = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
            var qry = Session["ReportDatasetQry"].ToString();
            DataSet ds = new DataSet();
            SqlConnection con = new SqlConnection(constr);
            con.Open();
            //Query = "Declare @AgentID varchar(50); if  'AZU'='ALL' Set @AgentID= '%' else Set @AgentID=concat('AZU','%') ; SELECT Item.Description as ItemName, StockOrder.StockNo, StockOrder.OrdDt as StockDt, dbo.fn_UOM_Description(StockOrderItem.ItemNo, IsNull(StockOrderItem.Qty,0)* UOM.BaseQty) as Status, StockOrder.AgentID as AgentId, StockOrderItem.ItemNo, StockOrderItem.UOM, StockOrderItem.Qty FROM StockOrder, StockOrderItem, Item, UOM,SalesManGroup Where SalesManGroup.GroupID=StockOrder.AgentID and SalesManGroup.UserID='admin' and StockOrder.StockNo = StockOrderItem.StockNo and StockOrderItem.ItemNo = Item.ItemNo  and StockOrderItem.ItemNo=UOM.ItemNo and StockOrderItem.UOM=UOM.UOM and convert(date,OrdDt) = '2018-10-26'  and StockOrder.AgentID like @AgentID  order by Item.ItemNo";
            SqlDataAdapter da = new SqlDataAdapter(qry, con);
            da.SelectCommand.CommandTimeout = 3600;// 600;  //30*60=1800 // 60- seconds
            da.Fill(ds);
            con.Close();

            //Session["ReportDataset"] = ds.Copy();
            //DataSet ds = new DataSet();
            //ds =  Session["ReportDatasetQry"];

            string ReportName = "";

            if (ds.Tables[1].Rows.Count > 0)
            {
                //ReportName = ds.Tables[1].Rows[0]["ReportName"].ToString();
            }

            var reportDataSource = new ReportDataSource
            {
                // Must match the DataSource in the RDLC
                Name = "DataSet1",
                Value = ds.Tables[2]
            };

            ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "alertMessage", "alert('Record Inserted Successfully')", true);


            ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reports/" + ReportName + ".rdlc");
            ReportViewer1.LocalReport.EnableHyperlinks = true;
            ReportViewer1.LocalReport.EnableExternalImages = true;
            // ADDTIONALLY ADDED 16.10.2020 ==============================
            ReportViewer1.KeepSessionAlive = true;
            // ADDTIONALLY ADDED 16.10.2020 ==============================
            ReportViewer1.HyperlinkTarget = "_blank";
            ReportViewer1.LocalReport.DataSources.Add(reportDataSource);

            ReportViewer1.DataBind();


        }
        protected void ReportViewer1_PageNavigation(object sender, PageNavigationEventArgs e)
        {

        }



        protected void Page_Unload(object sender, EventArgs e)
        {
            ReportViewer1.Dispose();
            ReportViewer1 = null;

        }

    </script>

</head>
<body>
    <form id="form1" runat="server">
        <div style="width: 99%; overflow-x: scroll">
            <asp:ScriptManager ID="ScriptManager1" runat="server" EnablePageMethods="true"></asp:ScriptManager>
            <rsweb:ReportViewer ID="ReportViewer1" runat="server" KeepSessionAlive="true" AsyncRendering="False" SizeToReportContent="true" PageCountMode="Actual" OnPageNavigation="ReportViewer1_PageNavigation" InteractivityPostBackMode="AlwaysSynchronous" Width="644px"></rsweb:ReportViewer>

            <%--<rsweb:ReportViewer ID="ReportViewer1" runat="server" AsyncRendering="False" SizeToReportContent="true" PageCountMode="Actual" OnPageNavigation="ReportViewer1_PageNavigation" InteractivityPostBackMode="AlwaysSynchronous" Width="644px"></rsweb:ReportViewer>--%>
        </div>
    </form>


</body>
</html>
