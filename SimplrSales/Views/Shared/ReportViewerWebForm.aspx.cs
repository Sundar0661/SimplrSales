using Microsoft.Reporting.WinForms;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
//using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;



namespace SimplrSales.Views.Shared
{
    public partial class ReportViewerWebForm : System.Web.UI.Page
    {
        string constr = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
        public SqlTransaction sqltran;
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        //private void ReportViewer1_Print(object sender, ReportPrintEventArgs e)
        //{
        //    try
        //    {
        //        executerQuery("update orderhdr set createdby='1' where ordno='M16O00000016'");
        //    }
        //    catch { }
        //}

        //[System.Web.Services.WebMethod]
        [System.Web.Services.WebMethod, System.Web.Script.Services.ScriptMethod]

        public bool GetReport(int ID)
        {
            return true;
        }

        //public string executerQuery(string sqlqry)
        //{
        //    var gotoLoopsqlqry = sqlqry;
        //    var tryCount = 0;
        //gotoLoop:

        //    string result = "";
        //    // con = new SqlConnection(dtConString());
        //    SqlConnection con = new SqlConnection(constr);
        //    con.Open();

        //    SqlCommand cmd = new SqlCommand();

        //    sqltran = con.BeginTransaction("s1");

        //    cmd.Connection = con;
        //    cmd.Transaction = sqltran;

        //    try
        //    {
        //        cmd.CommandText = sqlqry;
        //        cmd.ExecuteNonQuery();
        //        sqltran.Commit();
        //        result = "1";
        //    }

        //    catch (Exception ex)
        //    {
        //       // QueryLog(sqlqry + System.Environment.NewLine + "=========================================================== " + System.Environment.NewLine + "Exception : " + ex.Message + System.Environment.NewLine + "=========================================================== ");
        //        //ErrorLogWithQuery(ex, sqlqry);
        //        result = ex.Message;
        //        try
        //        {
        //            sqltran.Rollback();
        //        }
        //        catch (Exception ex1)
        //        {
        //           // ErrorLog(ex1);
        //            result = "0";
        //        }

        //        if ((ex.Message.IndexOf("was deadlocked on lock | communication buffer resources with another process and has been chosen as the deadlock victim") > -1 || ex.Message.IndexOf("resources with another process and has been chosen as the deadlock victim") > -1) && gotoLoopsqlqry != "")
        //        {
        //            System.Threading.Thread.Sleep(5000); // 5 second

        //            tryCount = tryCount + 1;
        //            if (tryCount <= 5)
        //            {
        //                sqlqry = gotoLoopsqlqry;
        //                goto gotoLoop;
        //            }
        //            else
        //                gotoLoopsqlqry = "";


        //        }
        //    }
        //    finally
        //    {
        //        con.Close();
        //    };

        //    return result;
        //}

    }
}