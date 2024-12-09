using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
//using CrystalDecisions.Shared;
//using CrystalDecisions.Reporting;
//using CrystalDecisions.Web;
//using CrystalDecisions.ReportSource;
using System.Data;
using System.Data.SqlClient;


namespace SimplrSales.Views.Shared
{
    public partial class CrystalRptViewerWebForm : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
 //           CrystalDecisions.CrystalReports.Engine.ReportDocument report =
 //new CrystalDecisions.CrystalReports.Engine.ReportDocument();
 //           report.Load(Server.MapPath("~/Reports/CrystalReport1.rpt"));
 //           //report.SetDataSource(Session["ReportSource"]);
 //           crViewer.ReportSource = report; 

            //LoadReport();
        }
        private void LoadReport()
        {
                    
                    DataSet ds = new DataSet();
                    ds = (DataSet)Session["ReportDataset"];

                    CrystalDecisions.Shared.ParameterFields pFields = new CrystalDecisions.Shared.ParameterFields();
                    CrystalDecisions.Shared.ParameterDiscreteValue  disval= new  CrystalDecisions.Shared.ParameterDiscreteValue();
                    CrystalDecisions.Shared.ParameterField pField = new CrystalDecisions.Shared.ParameterField();

                    string ReportName = "";
                    string LoadQuery = "";
                    
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                        {
                            pField = new CrystalDecisions.Shared.ParameterField();
                            disval = new CrystalDecisions.Shared.ParameterDiscreteValue();

                            pField.Name = ds.Tables[0].Rows[i]["ParamStr"].ToString();
                            disval.Value = ds.Tables[0].Rows[i]["Param"].ToString();
                            pField.CurrentValues.Add(disval);
                            pFields.Add(pField); 
                            
                            //string datatype = ds.Tables[0].Rows [i]["DataType"].ToString ();
                            //switch (datatype.ToLower ())
                            //{
                            //    case "string":
                            //        pField.Name = ds.Tables[0].Rows[i]["ParamStr"].ToString();  
                            //        disval .Value =ds.Tables[0].Rows[i]["Param"].ToString(); 
                            //        pField .CurrentValues .Add (disval );
                            //        pFields.Add(pField); 
                            //        break;
                            //    case "int":
                            //        pField.Name = ds.Tables[0].Rows[i]["ParamStr"].ToString();
                            //        disval.Value = ds.Tables[0].Rows[i]["Param"].ToString();
                            //        pField.CurrentValues.Add(disval);
                            //        pFields.Add(pField);
                            //        break;
                            //    case "datetime":
                            //        pField.Name = ds.Tables[0].Rows[i]["ParamStr"].ToString();
                            //        disval.Value = ds.Tables[0].Rows[i]["Param"].ToString();
                            //        pField.CurrentValues.Add(disval);
                            //        pFields.Add(pField);
                            //        break;
                            //    case "date":
                            //        pField.Name = ds.Tables[0].Rows[i]["ParamStr"].ToString();
                            //        disval.Value = ds.Tables[0].Rows[i]["Param"].ToString();
                            //        pField.CurrentValues.Add(disval);
                            //        pFields.Add(pField);
                            //        break;
                            //    case "bit":
                            //        pField.Name = ds.Tables[0].Rows[i]["ParamStr"].ToString();
                            //        disval.Value = ds.Tables[0].Rows[i]["Param"].ToString();
                            //        pField.CurrentValues.Add(disval);
                            //        pFields.Add(pField);
                            //        break;
                                    
                            //}
                        }

                    }
                    
                    if (ds.Tables[1].Rows.Count > 0)
                    {
                        ReportName = ds.Tables[1].Rows[0]["ReportName"].ToString();
                    }
                    CrystalDecisions.CrystalReports.Engine.ReportDocument report = new CrystalDecisions.CrystalReports.Engine.ReportDocument();
                    report.Load(Server.MapPath("~/Reports/" + ReportName + ".rpt"));
                    report.SetDataSource(ds.Tables[2]);
                    //crViewer .ParameterFieldInfo = pFields ;
                    crViewer.ReportSource = report;
                    crViewer.RefreshReport();
                    
                   
                    
                    //crViewer.DataBind();
                    

                }

    }
}