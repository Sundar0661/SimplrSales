<%@ Page Language="C#" AutoEventWireup="true"   Inherits="System.Web.Mvc.ViewPage<dynamic>"  %>

<%@ Register Assembly="Microsoft.ReportViewer.WebForms, Version=11.0.0.0, Culture=neutral, PublicKeyToken=89845dcd8080cc91" Namespace="Microsoft.Reporting.WebForms" TagPrefix="rsweb" %>

<!DOCTYPE html>
 <%@ Import Namespace ="System.Data" %>
 <%@ Import Namespace ="System.Data.SqlClient" %>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Report</title>
    <script runat="server" >
                void Page_Init(object sender, System.EventArgs e)
                {
                    Context.Handler = this.Page;
                }
                void Page_Load(object sender, EventArgs e)
                {
                    if (!IsPostBack)
                    {
                        LoadReport();
                    }
                }
                private void LoadReport()
                {
                    DataSet ds = new DataSet();
                    ds = (DataSet)Session["ReportDataset"];

                    string ReportName = "";

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

                    //string pfromdate = Convert.ToString(Session["fromdate"]);
                    //string ptodate = Convert.ToString(Session["todate"]);
                    //string pbrand = Convert.ToString(Session["brand"]);
                    //string pcategory = Convert.ToString(Session["category"]);
                    //string pusername = Convert.ToString(Session["username"]);
                    //ReportParameter p1 = new ReportParameter("fromdate", pfromdate);
                    //ReportParameter p2 = new ReportParameter("todate", ptodate);
                    //ReportParameter p3 = new ReportParameter("brand", pbrand);
                    //ReportParameter p4 = new ReportParameter("category", pcategory);
                    //ReportParameter p5 = new ReportParameter("username", pusername);
                    //this.ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { p1, p2, p3, p4, p5 });
                    ReportViewer1.LocalReport.DataSources.Add(reportDataSource);
                    ReportViewer1.DataBind();
                }
                protected void ReportViewer1_PageNavigation(object sender, PageNavigationEventArgs e)
                {
                   
                }
    </script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <asp:ScriptManager ID="ScriptManager1" runat="server"></asp:ScriptManager>
        <rsweb:ReportViewer ID="ReportViewer1" runat="server" AsyncRendering="False" SizeToReportContent="true" Height="100%" PageCountMode="Actual" Width="100%" ShowPrintButton="True" OnPageNavigation="ReportViewer1_PageNavigation" InteractivityPostBackMode="AlwaysSynchronous"></rsweb:ReportViewer>
    </div>
    </form>
</body>
</html>
