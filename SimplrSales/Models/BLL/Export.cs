using Microsoft.IdentityModel.Protocols;
using SimplrSales.Controllers;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;

namespace SimplrSales.Models.BLL
{
    public class Export : BusinessRule
    {
        private string connection = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;

        //ExportSQLFromToDateJSU

        /// <summary>
        /// Export function without JSU and PVM
        /// </summary>
        /// <param name="TblName"></param>
        /// <param name="UserID"></param>
        /// <param name="AgentID"></param>
        /// <param name="FromDt"></param>
        /// <param name="ToDt"></param>
        /// <returns></returns>
        public string ExportToExcelandCSV(string TblName, string UserID, string AgentID, DateTime FromDt, DateTime ToDt, string FileLocation, string FileType, string Location)
        {
            var strSteps = "";
            DataTable dt = new DataTable();
            try
            {
                strSteps = "1";
                DataTable dtResult = new DataTable();
                //string connection = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
                if (AgentID == "ALL")
                {
                    dt = ReadRecord("select * from SalesAgent where UserID='" + UserID + "'", connection);
                    if (dt.Rows.Count > 0)
                    {
                        for (int n = 0; n < dt.Rows.Count; n++)
                        {
                            AgentID = dt.Rows[n]["Code"].ToString();
                        }
                    }
                }
                strSteps = "2";

                var TableName = "";
                var Query = "";
                var AliasName = "";
                //var FileType = "";
                dt = ReadRecord("select * from ExportQueryConfig where AliasName='" + TblName + "'", connection);
                if (dt.Rows.Count > 0)
                {
                    for (int n = 0; n < dt.Rows.Count; n++)
                    {
                        TableName = dt.Rows[n]["TableName"].ToString();
                        Query = dt.Rows[n]["Query"].ToString();
                        AliasName = dt.Rows[n]["AliasName"].ToString();
                        //FileType = dt.Rows[n]["FileType"].ToString();
                    }
                }
                strSteps = "3";

                string FromDate = FromDt.ToString("yyyy-MM-dd 00:00:00.000");
                string ToDate = ToDt.ToString("yyyy-MM-dd 23:59:59.000");
                Query = Query.Replace("{FromDate}", "'" + FromDate + "'");
                Query = Query.Replace("{ToDate}", "'" + ToDate + "'");
                Query = Query.Replace("{AgentID}", "'" + AgentID + "'");
                Query = Query.Replace("{UserID}", "'" + UserID + "'");
                Query = Query.Replace("{Location}", "'" + Location + "'");

                strSteps = "4";
                dt = ReadRecord(Query, connection);
                strSteps = "done";

                ExportErrorLog("strSteps : " + strSteps);
                if (FileType.ToLower() == "xlsx")
                    return AutoExportXL(dt, FileLocation, TblName + "_" + UserID + "_" + DateTime.Now.ToString("yyyyMMddHHmmssfff"), TblName);
                else
                    return AutoExportCSV(dt, FileLocation, TblName + "_" + UserID + "_" + DateTime.Now.ToString("yyyyMMddHHmmssfff"));


            }
            catch (Exception ex)
            {
                ExportErrorLog("Exception : " + ex.Message + " strSteps : " + strSteps);
                return "";
            }
        }

        /// <summary>
        /// ExportToExcelPVM
        /// </summary>
        public string ExportToExcelandCSVPVM(string TblName, string UserID, string AgentID, DateTime FromDt, DateTime ToDt, string DistributorID, string SalesOfficeID, string FileLocation, string FileType)
        {
            DataTable dt = new DataTable();
            var strSteps = "1";
            try
            {
                DataTable dtResult = new DataTable();
                var TableName = "";
                var Query = "";
                var AliasName = "";

                dt = ReadRecord("select * from ExportQueryConfig where AliasName='" + TblName + "'", connection);
                strSteps = "2";
                if (dt.Rows.Count > 0)
                {
                    for (int n = 0; n < dt.Rows.Count; n++)
                    {
                        TableName = dt.Rows[n]["TableName"].ToString();
                        Query = dt.Rows[n]["Query"].ToString();
                        AliasName = dt.Rows[n]["AliasName"].ToString();
                        //FileType = dt.Rows[n]["FileType"].ToString();
                    }
                }

                strSteps = "3";
                string FromDate = FromDt.ToString("yyyy-MM-dd 00:00:00.000");
                string ToDate = ToDt.ToString("yyyy-MM-dd 23:59:59.000");
                Query = Query.Replace("{FromDate}", "'" + FromDate + "'");
                Query = Query.Replace("{ToDate}", "'" + ToDate + "'");
                Query = Query.Replace("{AgentID}", "'" + AgentID + "'");
                Query = Query.Replace("{UserID}", "'" + UserID + "'");
                Query = Query.Replace("{DistributorID}", "'" + DistributorID + "'");
                Query = Query.Replace("{SalesOfficeID}", "'" + SalesOfficeID + "'");
                strSteps = "4";
                dt = ReadRecord(Query, connection);
                strSteps = "done";
                ExportErrorLog("strSteps  =" + strSteps);

                if (FileType.ToLower() == "xlsx")
                    return AutoExportXL(dt, FileLocation, TblName + "_" + UserID + "_" + DateTime.Now.ToString("yyyyMMddHHmmssfff"), TblName);
                else
                    return AutoExportCSV(dt, FileLocation, TblName + "_" + UserID + "_" + DateTime.Now.ToString("yyyyMMddHHmmssfff"));

            }
            catch (Exception ex)
            {
                ExportErrorLog(" ExportToExcelPVMError Message  =" + ex.Message + " - strSteps  =" + strSteps);
                return "";
            }
        }

        /// <summary>
        /// ExportToExcelJSU function
        /// </summary>
        /// <returns>Created folderlocation with file</returns>
        public string ExportToExcelCSVJSU(string TblName, string UserID, string AgentID, DateTime FromDt, DateTime ToDt, string FileLocation, string FileType)
        {
            DataTable dt = new DataTable();
            var strSteps = "1";
            try
            {
                DataTable dtResult = new DataTable();
                var TableName = string.Empty;
                var DF = string.Empty;
                var Query = string.Empty;
                var AliasName = string.Empty;
                var GAgentID = string.Empty;

                if (AgentID == "ALL" || AgentID == "")
                {
                    strSteps = "1.1";
                    dt = ReadRecord("select * from SalesAgent where UserID='" + UserID + "'", connection);
                    strSteps = "1.2";
                    if (dt.Rows.Count > 0)
                    {
                        for (int n = 0; n < dt.Rows.Count; n++)
                        {
                            AgentID = dt.Rows[n]["Code"].ToString();
                        }
                    }
                    strSteps = "1.3";
                    dt = ReadRecord("select Distinct AgentID from SalesManGroup where SalesMangroup.UserId ='" + UserID + "'", connection);
                    strSteps = "1.4";
                    if (dt.Rows.Count > 0)
                    {
                        for (int n = 0; n < dt.Rows.Count; n++)
                        {
                            GAgentID = dt.Rows[n]["AgentID"].ToString();
                        }
                    }
                }
                else
                    GAgentID = AgentID;
                strSteps = "1.5";

                dt = ReadRecord("select * from ExportQueryConfig where AliasName='" + TblName + "'", connection);
                strSteps = "2";
                if (dt.Rows.Count > 0)
                {
                    for (int n = 0; n < dt.Rows.Count; n++)
                    {
                        TableName = dt.Rows[n]["TableName"].ToString();
                        DF = dt.Rows[n]["DocumentFields"].ToString();
                        Query = dt.Rows[n]["Query"].ToString();
                        AliasName = dt.Rows[n]["AliasName"].ToString();
                    }
                }
                strSteps = "2.1";
                ArrayList arrLoc = new ArrayList();
                dt = ReadRecord("select distinct SalesOfficeID from NodeTree where Salesmanterritory in (select groupid from Salesmangroup Where UserID='" + TblName + "')", connection);
                if (dt.Rows.Count > 0)
                {
                    for (int n = 0; n < dt.Rows.Count; n++)
                    {
                        arrLoc.Add(dt.Rows[n]["SalesOfficeID"].ToString());
                    }
                }

                strSteps = "3";
                string FromDate = FromDt.ToString("yyyy-MM-dd 00:00:00.000");
                string ToDate = ToDt.ToString("yyyy-MM-dd 23:59:59.000");

                if (arrLoc.Count > 0)
                {
                    Query = Query.Replace("{SalesOffice}", "'" + arrLoc[0] + "'");
                }

                Query = Query.Replace("{FromDate}", "'" + FromDate + "'");
                Query = Query.Replace("{ToDate}", "'" + ToDate + "'");
                Query = Query.Replace("{AgentID}", "'" + AgentID + "'");
                Query = Query.Replace("{UserID}", "'" + UserID + "'");

                strSteps = "4";
                dt = ReadRecord(Query, connection);
                strSteps = "done";
                ExportErrorLog("strSteps  = " + strSteps);

                if (FileType.ToLower() == "xlsx")
                    return AutoExportXL(dt, FileLocation, TblName + "_" + UserID + "_" + DateTime.Now.ToString("yyyyMMddHHmmssfff"), TblName);
                else
                    return AutoExportCSV(dt, FileLocation, TblName + "_" + UserID + "_" + DateTime.Now.ToString("yyyyMMddHHmmssfff"));

            }
            catch (Exception ex)
            {
                ExportErrorLog(" ExportToExcelPVMError Message  = " + ex.Message + " - strSteps  = " + strSteps);
                return "";
            }
        }

        private string AutoExportXL(DataTable dt, string fileLocation, string fileName, string TblName)
        {
            var strSteps = "AutoExport 1";
            try
            {

                string tempdir = fileLocation + fileName;

                if (!Directory.Exists(tempdir))
                    Directory.CreateDirectory(tempdir);

                var fileNamePath = fileName;
                var tempfileName = TblName;

                // Bind table data to Stream Writer to export data to respective folder
                //StreamWriter wr = new StreamWriter(@"D:\temp\Book11.xls", true);
                StreamWriter wr = new StreamWriter(fileLocation + fileNamePath + "\\" + tempfileName + ".xls", true, Encoding.Unicode);// System.Text.Encoding.UTF32);

                // Write Columns to excel file
                strSteps = "AutoExport 2";
                if (dt.Rows.Count > 0)
                {
                    for (int i = 0; i < dt.Columns.Count; i++)
                    {
                        wr.Write(dt.Columns[i].ToString() + "\t");
                    }
                }
                if (dt.Rows.Count == 0)
                    wr.Write("No Records Found" + "\t");
                wr.WriteLine();
                strSteps = "AutoExport 3" + "row : " + dt.Rows.Count + " Col : " + dt.Columns.Count;
                //write rows to excel file
                for (int i = 0; i < (dt.Rows.Count); i++)
                {
                    for (int j = 0; j < dt.Columns.Count; j++)
                    {
                        if (dt.Rows[i][j] != null)
                        {
                            if (dt.Rows[i][j].ToString().Split('/').Length == 3 && dt.Rows[i][j].ToString().Split('/')[2].Length == 4)
                            {
                                DateTime date = DateTime.ParseExact(dt.Rows[i][j].ToString(), "dd/MM/yyyy", null);
                                wr.Write(" " + date.ToString("dd-MM-yyyy", System.Globalization.CultureInfo.InvariantCulture) + "\t");
                            }
                            else
                                wr.Write(dt.Rows[i][j].ToString().Replace("\"", "").Replace("\r\n", "").Replace("\n", "").Replace("\n", "").Replace("\t", "") + "\t");
                        }
                        else
                        {
                            wr.Write("\t");
                        }
                    }
                    wr.WriteLine();
                }
                wr.Close();
                strSteps = "AutoExport 4";

                //


                Microsoft.Office.Interop.Excel.Application app = new Microsoft.Office.Interop.Excel.Application();
                strSteps = "AutoExport 5";
                Microsoft.Office.Interop.Excel.Workbook wb = app.Workbooks.Open(fileLocation + fileNamePath + "\\" + tempfileName + ".xls", Type.Missing, Type.Missing, Type.Missing, Type.Missing, Type.Missing, Type.Missing, Type.Missing, Type.Missing, Type.Missing, Type.Missing, Type.Missing, Type.Missing, Type.Missing, Type.Missing);
                strSteps = "AutoExport 6";
                wb.SaveAs(fileLocation + fileName + ".xlsx", Microsoft.Office.Interop.Excel.XlFileFormat.xlOpenXMLWorkbook, Type.Missing, Type.Missing, Type.Missing, Type.Missing, Microsoft.Office.Interop.Excel.XlSaveAsAccessMode.xlExclusive, Type.Missing, Type.Missing, Type.Missing, Type.Missing, Type.Missing);
                strSteps = "AutoExport 7";
                wb.Close();
                app.Quit();
                strSteps = "AutoExport delete xls";
                //System.IO.File.Delete(fileLocation + fileName + ".xls");
                System.IO.File.Delete(fileLocation + fileNamePath + "\\" + tempfileName + ".xls");
                Directory.Delete(tempdir);
                strSteps = "AutoExport done";
                ExportErrorLog("strSteps  =" + strSteps);
                return fileLocation + fileName + ".xlsx";
            }
            catch (Exception ex)
            {
                ExportErrorLog("AutoExport =" + ex.Message + " - strSteps  = " + strSteps);
                return fileLocation + fileName + ".xls";
            }

        }


        private string AutoExportXLOld(DataTable dt, string fileLocation, string fileName)
        {
            var strSteps = "AutoExport 1";
            try
            {
                fileName = "ActivityLog";

                // Bind table data to Stream Writer to export data to respective folder
                //StreamWriter wr = new StreamWriter(@"D:\temp\Book11.xls", true);
                StreamWriter wr = new StreamWriter(fileLocation + fileName + ".xls", true, Encoding.Unicode);// System.Text.Encoding.UTF32);

                // Write Columns to excel file
                strSteps = "AutoExport 2";
                var diff = "\t";
                if (dt.Rows.Count > 0)
                {
                    for (int i = 0; i < dt.Columns.Count; i++)
                    {
                        wr.Write(dt.Columns[i].ToString() + diff);
                    }
                }
                if (dt.Rows.Count == 0)
                    wr.Write("No Records Found" + "\t");
                wr.WriteLine();
                strSteps = "AutoExport 3" + "row : " + dt.Rows.Count + " Col : " + dt.Columns.Count;
                //write rows to excel file
                for (int i = 0; i < (dt.Rows.Count); i++)
                {
                    for (int j = 0; j < dt.Columns.Count; j++)
                    {
                        if (dt.Rows[i][j] != null)
                        {
                            wr.Write(dt.Rows[i][j].ToString().Replace("\"", "") + diff);
                            //wr.Write(Convert.ToString(dt.Rows[i][j]) + "\t");
                        }
                        else
                        {
                            wr.Write("\t");
                        }
                    }
                    wr.WriteLine();
                }
                wr.Close();
                strSteps = "AutoExport 4";

                //


                Microsoft.Office.Interop.Excel.Application app = new Microsoft.Office.Interop.Excel.Application();
                strSteps = "AutoExport 5";
                Microsoft.Office.Interop.Excel.Workbook wb = app.Workbooks.Open(fileLocation + fileName + ".xls", Type.Missing, Type.Missing, Type.Missing, Type.Missing, Type.Missing, Type.Missing, Type.Missing, Type.Missing, Type.Missing, Type.Missing, Type.Missing, Type.Missing, Type.Missing, Type.Missing);
                strSteps = "AutoExport 6";
                wb.SaveAs(fileLocation + fileName + ".xlsx", Microsoft.Office.Interop.Excel.XlFileFormat.xlOpenXMLWorkbook, Type.Missing, Type.Missing, Type.Missing, Type.Missing, Microsoft.Office.Interop.Excel.XlSaveAsAccessMode.xlExclusive, Type.Missing, Type.Missing, Type.Missing, Type.Missing, Type.Missing);
                strSteps = "AutoExport 7";
                wb.Close();
                app.Quit();
                strSteps = "AutoExport delete xls";
                System.IO.File.Delete(fileLocation + fileName + ".xls");

                strSteps = "AutoExport done";
                ExportErrorLog("strSteps  =" + strSteps);
                return fileLocation + fileName + ".xlsx";
            }
            catch (Exception ex)
            {
                ExportErrorLog("AutoExport =" + ex.Message + " - strSteps  = " + strSteps);
                return fileLocation + fileName + ".xls";
            }

        }

        private string AutoExportCSV(DataTable dt, string fileLocation, string fileName)
        {
            var strSteps = "AutoExport 1";
            try
            {
                // Bind table data to Stream Writer to export data to respective folder
                //StreamWriter wr = new StreamWriter(@"D:\temp\Book11.xls", true);
                StreamWriter wr = new StreamWriter(fileLocation + fileName + ".csv", true, Encoding.Unicode);// System.Text.Encoding.UTF32);

                // Write Columns to excel file
                strSteps = "AutoExport 2";

                var diff = "\t";
                if (dt.Rows.Count > 0)
                {
                    for (int i = 0; i < dt.Columns.Count; i++)
                    {
                        wr.Write(dt.Columns[i].ToString() + diff);
                        //wr.Write(dt.Columns[i].ToString() + "\t");
                    }
                }
                if (dt.Rows.Count == 0)
                    wr.Write("No Records Found" + "\t");
                wr.WriteLine();
                strSteps = "AutoExport 3" + "row : " + dt.Rows.Count + " Col : " + dt.Columns.Count;
                //write rows to excel file
                for (int i = 0; i < (dt.Rows.Count); i++)
                {
                    if(i==20809)
                    {
                        var f = i;
                    }
                    for (int j = 0; j < dt.Columns.Count; j++)
                    {
                        if (dt.Rows[i][j] != null)
                        {
                            //wr.Write(dt.Rows[i][j].ToString().Replace("\"", "")  + diff);
                            //wr.Write(dt.Rows[i][j].ToString().Replace("\"", "").Replace("\r\n", "") + diff);
                            wr.Write(dt.Rows[i][j].ToString().Replace("\"", "").Replace("\r\n", "").Replace("\n", "").Replace("\n", "").Replace("\t", "") + diff);
                            //wr.Write(Convert.ToString(dt.Rows[i][j]) + "\t");
                        }
                        else
                        {
                            wr.Write("\t");
                        }
                    }
                    wr.WriteLine();
                }
                wr.Close();
                strSteps = "AutoExport done csv";
                ExportErrorLog("strSteps  =" + strSteps);
                return fileLocation + fileName + ".csv";
            }
            catch (Exception ex)
            {
                ExportErrorLog("AutoExport =" + ex.Message + " - strSteps  = " + strSteps);
                return fileLocation + fileName + ".csv";
            }

        }


        /// <summary>
        /// ReadRecord
        /// </summary>
        /// <param name="query">Execute from query</param>
        /// <param name="constr">connection string</param>
        /// <returns>datatable record</returns>
        public DataTable ReadRecord(string query, string constr)
        {
            ExportErrorLog("ReadRecord : " + query);

            DataTable dt = new DataTable();
            DataSet ds = new DataSet();
            SqlConnection con = new SqlConnection(constr);
            con.Open();
            try
            {
                SqlDataAdapter sda = new SqlDataAdapter(query, con);
                sda.SelectCommand.CommandTimeout = 3600; //30*60=1800 // 60- seconds
                sda.Fill(ds);
                con.Close();
                if (ds.Tables.Count > 0)
                    dt = ds.Tables[0];

                return dt;
            }
            catch (Exception ex)
            {
                ExportErrorLog("ReadRecord Exception : " + ex.Message);
            }
            finally
            {
                con.Close();
            };
            return dt;
        }
    }
}