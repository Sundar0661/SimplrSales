<%@ Page Language="C#" AutoEventWireup="true"   Inherits="System.Web.Mvc.ViewPage<dynamic>"  %>

<%--<%@ Page Language="C#" AutoEventWireup="true"  CodeBehind ="~/Views/Shared/CrystalRptViewerWebForm.aspx.cs" Inherits="SimplrSales.Views.Shared.CrystalRptViewerWebForm" %>--%>

<%--<%@ Register Assembly="CrystalDecisions.Web, Version=13.0.2000.0, Culture=neutral, PublicKeyToken=692fbea5521e1304" Namespace="CrystalDecisions.Web" TagPrefix="CR" %>--%>

<%@ Register Assembly="CrystalDecisions.Web, Version=13.0.2000.0, Culture=neutral, PublicKeyToken=692fbea5521e1304" Namespace="CrystalDecisions.Web" TagPrefix="CR" %>


<!DOCTYPE html>
 <%@ Import Namespace ="System.Data" %>
 <%@ Import Namespace ="System.Data.SqlClient" %>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Report</title>
    <script src='<%=ResolveUrl("~/crystalreportviewers13/js/crviewer/crv.js")%>' type="text/javascript"></script>
    <script runat="server" >
                
                
                void Page_Init(object sender, EventArgs e)
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
                private void  LoadReport()
                {
                    
                    DataSet ds = new DataSet();
                    ds = (DataSet)Session["ReportDataset"];

                    CrystalDecisions.Shared.ParameterFields pFields = new CrystalDecisions.Shared.ParameterFields();
                    CrystalDecisions.Shared.ParameterDiscreteValue  disval= new  CrystalDecisions.Shared.ParameterDiscreteValue();
                    CrystalDecisions.Shared.ParameterField pField = new CrystalDecisions.Shared.ParameterField();

                    string ReportName = "";
                    //string LoadQuery = "";
                    
                    //if (ds.Tables[0].Rows.Count > 0)
                    //{
                    //    for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                    //    {
                    //        pField = new CrystalDecisions.Shared.ParameterField();
                    //        disval = new CrystalDecisions.Shared.ParameterDiscreteValue();

                    //        pField.Name = ds.Tables[0].Rows[i]["ParamStr"].ToString();
                    //        disval.Value = ds.Tables[0].Rows[i]["Param"].ToString();
                    //        pField.CurrentValues.Add(disval);
                    //        pFields.Add(pField);                             
                         
                    //    }

                    //}
                    
                    if (ds.Tables[1].Rows.Count > 0)
                    {
                        ReportName = ds.Tables[1].Rows[0]["ReportName"].ToString();
                    }
                    CrystalDecisions.CrystalReports.Engine.ReportDocument report = new CrystalDecisions.CrystalReports.Engine.ReportDocument();
                    report.Load(Server.MapPath("~/Reports/" + ReportName + ".rpt"));
                    report.SetDataSource(ds.Tables[2]);


                    //CrystalDecisions.Shared.TableLogOnInfos crtableLogoninfos = new CrystalDecisions.Shared.TableLogOnInfos();
                    //CrystalDecisions.Shared.TableLogOnInfo crtableLogoninfo = new CrystalDecisions.Shared.TableLogOnInfo();
                    //CrystalDecisions.Shared.ConnectionInfo crConnectionInfo = new CrystalDecisions.Shared.ConnectionInfo();

                    //crConnectionInfo.ServerName = "123.255.250.6";
                    //crConnectionInfo.DatabaseName = "SimplrSalesDev";
                    //crConnectionInfo.UserID = "sa";
                    //crConnectionInfo.Password = "Comgen123";
                    //crtableLogoninfo.ConnectionInfo = crConnectionInfo;
                    //crtableLogoninfos.Add(crtableLogoninfo);
                    //crViewer.LogOnInfo = crtableLogoninfos;
                    //crViewer.EnableParameterPrompt = true ;


                    //crViewer .ParameterFieldInfo = pFields ;
                    //Session["reportDocument"] = report;
                    crViewer.ReportSource = report;
                    //crViewer.DataBind();
                    crViewer.RefreshReport();
                    
                    

                }
                

                protected void crViewer_Navigate(object sender, NavigateEventArgs e)
                {
                    //crViewer.ShowNextPage();
                    
                }


                
</script>
</head>
<body>
    <form id="form1" runat="server">
        <asp:ScriptManager ID="ScriptManager1" runat="server"></asp:ScriptManager>
        <%--<asp:UpdatePanel ID="updatePanel2" runat="server">
            <ContentTemplate >
              <div>--%>
              <CR:CrystalReportViewer ID="crViewer" runat="server" AutoDataBind="true" OnNavigate ="crViewer_Navigate"      />
       
             <%-- </div>  
                </ContentTemplate>
            </asp:UpdatePanel> --%>
   </form>
    
</body>
</html>
