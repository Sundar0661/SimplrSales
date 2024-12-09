using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
//using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SimplrSales.Views.Shared
{
    public partial class ReportViewerWebForm : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        //[System.Web.Services.WebMethod]
        [System.Web.Services.WebMethod, System.Web.Script.Services.ScriptMethod]

        public bool GetReport(int ID)
        {
            return true;
        }
    }
}