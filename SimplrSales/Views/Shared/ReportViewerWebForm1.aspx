<%@ Page Language="C#" AutoEventWireup="true" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<%@ Register Assembly="Microsoft.ReportViewer.WebForms, Version=11.0.0.0, Culture=neutral, PublicKeyToken=89845dcd8080cc91" Namespace="Microsoft.Reporting.WebForms" TagPrefix="rsweb" %>

<!DOCTYPE html>
<%@ Import Namespace="System.Data" %>
<%@ Import Namespace="System.Data.SqlClient" %>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Report</title>
    <script runat="server">
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

        [System.Web.Services.WebMethod]
        public string ShowPrint()
        {
            return "";
        }
    </script>
</head>
<body>
    <form id="form1" runat="server">
        <div style="width: 99%; overflow-x: scroll;">
            <%--<input id="btnGetTime" type="button" value="Show Current Time" onclick="ShowPrint()" />--%>
            <asp:ScriptManager ID="ScriptManager1" runat="server"></asp:ScriptManager>
                        <%--<asp:Button ID="Button1" runat="server" Text="Button" OnClick="ShowPrint()" />--%>
            <rsweb:ReportViewer ID="ReportViewer1" runat="server" AsyncRendering="False" SizeToReportContent="true" Height="100%" PageCountMode="Actual" Width="100%" ShowPrintButton="True" OnPageNavigation="ReportViewer1_PageNavigation" InteractivityPostBackMode="AlwaysSynchronous"></rsweb:ReportViewer>
        </div>
    </form>

    <script lang="javascript" type="text/javascript">
        function showPrintButton() {
            var table = $("table[title='Refresh']");
            var parentTable = $(table).parents('table');
            var parentDiv = $(parentTable).parents('div').parents('div').first();
            var btnPrint = $("<input type='buttons' id='btnPrint' name='btnPrint' value='Print' style=\"font-family:Verdana;font-size:8pt;width:86px\"/>");

            btnPrint.click(function () {
                alert('1');
                Export(this);
            });


            if (parentDiv.find("input[value='Print']").length == 0) {
                parentDiv.append('<table cellpadding="0" cellspacing="0" toolbarspacer="true" style="display:inline-block;width:6px;"><tbody><tr><td></td></tr></tbody></table>');
                parentDiv.append('<div id="customDiv" class=" " style="display:inline-block;font-family:Verdana;font-size:8pt;vertical-align:inherit;"><table cellpadding="0" cellspacing="0"><tbody><tr><td><span style="cursor:pointer;" class="HighlightDiv glyphicon glyphicon-print" onclick="printPDF(this);" ></span></td></tr></tbody></table></div>');

            }
        }
      //  GetData();
        function GetData() {
            debugger;

            var url = '/Shared/ReportViewerWebForm.aspx/ReportViewerWebForm?ID=1';
            // window.open(url)

            //window.location = url;
            $.ajax({
                //url: '../Shared/ReportViewerWebForm.aspx/GetReport',
                url: '../ReportViewerWebForm.aspx.cs/GetReport',
                //url: '../ITS/Reports.aspx/GetReport',
                type: 'post',
                contentType: 'application/json; charset=utf-8',
                data: { ID: 1 },
                dataType: 'json',
                async: true,
                cache: false,
                success: function (data) {
                    debugger;

                    alert(data);
                }
                ,
                error: function (results, q, a) {
                    debugger;

                    alert(JSON.stringify(results.responseText));
                }
            });
        }

        function printPDF(btn) {
            //debugger;
            //alert('1');

            var report = 'ReportViewer1';
            $.ajax({
                //url: "../Views/Shared/ReportViewerWebForm.aspx/ShowPrint",
                url: '<%=ResolveUrl("../Views/Shared/ReportViewerWebForm.aspx/ShowPrint")%>',
                //url: "ReportViewerWebForm.aspx/ShowPrint",
                type: 'POST',
                // contentType: "application/json; charset=utf-8",
                dataType: 'text',
                async: true,
                cache: false,
                //data: { fromdate: addrFromDate, todate: addrToDate, salesmanterritory: addrSalesmanTerritory, userid: userid },
                //data: { },
                success: function (results) {

                    var ddfsf = results;
                },
                error: function (results, q, a) {
                    debugger;

                    alert(JSON.stringify(resultss));
                }
            });
        }



    </script>

</body>
</html>
