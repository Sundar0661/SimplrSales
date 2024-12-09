<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="KeepSessionAlive.aspx.cs" Inherits="SimplrSales.Views.Shared.KeepSessionAlive" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <meta id="MetaRefresh" http-equiv="refresh" content="21600;url=KeepSessionAlive.aspx" runat="server" />
    <script type="text/javascript">
        window.status = "<%=WindowStatusText%>";
        alert('okchange here.');
    </script>

     <script runat="server">
         string WindowStatusText = "";
         void Page_Load(object sender, EventArgs e)
         {
             if (User.Identity.IsAuthenticated)
             {
                 // Refresh this page 60 seconds before session timeout, effectively resetting the session timeout counter.
                 MetaRefresh.Attributes["content"] = Convert.ToString((Session.Timeout * 60) - 60) + ";url=KeepSessionAlive.aspx?q=" + DateTime.Now.Ticks;
                 WindowStatusText = "Last refresh " + DateTime.Now.ToShortDateString() + " " + DateTime.Now.ToShortTimeString();
             }
         }
    </script>

</head>
<body>
    <form id="form1" runat="server">
    <div>
   
    </div>
    </form>
</body>
</html>
