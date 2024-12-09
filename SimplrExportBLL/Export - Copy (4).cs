using System;
using System.Collections;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Runtime.InteropServices;
using System.Text;
//using Excel = Microsoft.Office.Interop.Excel;


namespace SimplrExportBLL
{
    public class Export
    {
        public string CS;
        public string FileType;
        public string FolderPath;
        public string UserID;
        public string exceptionMsg;
        public string ProjectName;

        /// <summary>
        /// Export function without JSU and PVM
        /// </summary>
        public string ExportToExcelandCSV(string TblName, string UserID, string AgentID, DateTime FromDt, DateTime ToDt, string DistributorID, string SalesOfficeID)
        {
            var strSteps = "";
            DataTable dt = new DataTable();
            try
            {
                strSteps = "1";
                DataTable dtResult = new DataTable();
                if (AgentID == "ALL")
                {
                    dt = ReadRecord("select * from SalesAgent where UserID='" + UserID + "'", CS);
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
                dt = ReadRecord("select * from ExportQueryConfig where AliasName='" + TblName + "'", CS);
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
                if (DistributorID != null && DistributorID != "")
                    Query = Query.Replace("{DistributorID}", "'" + DistributorID + "'");
                if (SalesOfficeID != null && SalesOfficeID != "")
                    Query = Query.Replace("{SalesOfficeID}", "'" + SalesOfficeID + "'");

                strSteps = "4";

                dt = ReadRecord(Query, CS);
                strSteps = "done";

                ExportErrorLog("strSteps : " + strSteps);
                if (FileType.ToLower() == "xlsx")
                {
                    //System.Threading.Tasks.Task<string> dd2 = AutoExportXL1(dt, FolderPath, TblName + "_" + UserID + "_" + DateTime.Now.ToString("yyyyMMddHHmmssfff"), TblName);

                    return AutoExportXL(dt, FolderPath, TblName + "_" + UserID + "_" + DateTime.Now.ToString("yyyyMMddHHmmssfff"), TblName);

                }
                else
                {
                    if (ProjectName.ToLower() == "danone")
                        return ToCSV(dt, FolderPath, TblName + "_" + UserID + "_" + DateTime.Now.ToString("yyyyMMddHHmmssfff"));
                    else
                        return AutoExportCSV(dt, FolderPath, TblName + "_" + UserID + "_" + DateTime.Now.ToString("yyyyMMddHHmmssfff"));
                }
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
        public string ExportToExcelandCSVPVM(string TblName, string UserID, string AgentID, DateTime FromDt, DateTime ToDt, string DistributorID, string SalesOfficeID)
        {
            DataTable dt = new DataTable();
            DataTable dt1 = new DataTable();
            var strSteps = "1";
            try
            {
                DataTable dtResult = new DataTable();
                var TableName = "";
                var Query = "";
                var Query1 = "";
                var AliasName = "";

                dt = ReadRecord("select * from ExportQueryConfig where AliasName='" + TblName + "'", CS);
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

                Query1 = Query;
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
                int dividedDays = 1;
                if (TblName == "Daily Outlet Report1")
                {
                    int totalDays = (int)(ToDt - FromDt).TotalDays;
                    if (totalDays > dividedDays)
                    {
                        int dayCnt = totalDays / dividedDays;
                        int lstdaycnt = (totalDays - dayCnt * dividedDays) + 1;
                        int fromAddDays = 0;
                        int toAddDays = 0;
                        for (int i = 0; i < dayCnt; i++)
                        {
                            Query = Query1;
                            fromAddDays = i * dividedDays;
                            toAddDays = ((dayCnt - (i + 1)) * dividedDays);
                            FromDate = FromDt.AddDays(fromAddDays).ToString("yyyy-MM-dd 00:00:00.000");
                            ToDate = ToDt.AddDays(-(toAddDays + lstdaycnt)).ToString("yyyy-MM-dd 23:59:59.000");
                            if (i == (dayCnt - 1))
                                ToDate = ToDt.AddDays(-toAddDays).ToString("yyyy-MM-dd 23:59:59.000");
                            Query = Query.Replace("{FromDate}", "'" + FromDate + "'");
                            Query = Query.Replace("{ToDate}", "'" + ToDate + "'");
                            Query = Query.Replace("{AgentID}", "'" + AgentID + "'");
                            Query = Query.Replace("{UserID}", "'" + UserID + "'");
                            Query = Query.Replace("{DistributorID}", "'" + DistributorID + "'");
                            Query = Query.Replace("{SalesOfficeID}", "'" + SalesOfficeID + "'");

                            dt = ReadRecord(Query, CS);
                            if (dt.Rows.Count == 0 && exceptionMsg.IndexOf("OutOfMemoryException") >= 0)
                            {
                                System.Threading.Thread.Sleep(5000); // 5 second
                                dt = ReadRecord1(Query, CS);
                                ExportErrorLog("ReadRecord :  cnt" + dt.Rows.Count);

                            }
                            else
                            {
                                dt1.Merge(dt);
                                dt1.AcceptChanges();
                            }
                        }
                        dt = dt1;
                    }
                    else
                        dt = ReadRecord(Query, CS);
                }
                else
                    dt = ReadRecord(Query, CS);
                strSteps = "done";
                ExportErrorLog("strSteps  =" + strSteps);

                if (FileType.ToLower() == "xlsx")
                    return AutoExportXL(dt, FolderPath, TblName + "_" + UserID + "_" + DateTime.Now.ToString("yyyyMMddHHmmssfff"), TblName);
                else
                    return AutoExportCSV(dt, FolderPath, TblName + "_" + UserID + "_" + DateTime.Now.ToString("yyyyMMddHHmmssfff"));

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
        public string ExportToExcelCSVJSU(string TblName, string UserID, string AgentID, DateTime FromDt, DateTime ToDt)
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
                    dt = ReadRecord("select * from SalesAgent where UserID='" + UserID + "'", CS);
                    strSteps = "1.2";
                    if (dt.Rows.Count > 0)
                    {
                        for (int n = 0; n < dt.Rows.Count; n++)
                        {
                            AgentID = dt.Rows[n]["Code"].ToString();
                        }
                    }
                    strSteps = "1.3";
                    dt = ReadRecord("select Distinct AgentID from SalesManGroup where SalesMangroup.UserId ='" + UserID + "'", CS);
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

                dt = ReadRecord("select * from ExportQueryConfig where AliasName='" + TblName + "'", CS);
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
                dt = ReadRecord("select distinct SalesOfficeID from NodeTree where Salesmanterritory in (select groupid from Salesmangroup Where UserID='" + TblName + "')", CS);
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
                dt = ReadRecord(Query, CS);
                strSteps = "done";
                ExportErrorLog("strSteps  = " + strSteps);



                if (FileType.ToLower() == "xlsx")
                    return AutoExportXL(dt, FolderPath, TblName + "_" + UserID + "_" + DateTime.Now.ToString("yyyyMMddHHmmssfff"), TblName);
                else
                    return AutoExportCSV(dt, FolderPath, TblName + "_" + UserID + "_" + DateTime.Now.ToString("yyyyMMddHHmmssfff"));

            }
            catch (Exception ex)
            {
                ExportErrorLog(" ExportToExcelPVMError Message  = " + ex.Message + " - strSteps  = " + strSteps);
                return "";
            }
        }

        private string AutoExportXL_1(DataTable dt, string fileLocation, string fileName, string TblName)
        {
            //var ret = ExportExcelNew(dt, fileLocation, fileName, TblName);
            //if (ret.ToString() != "")
            //{
            //    return ret.ToString();
            //}
            var drr = "";
            var strSteps = "AutoExport 1";
            string tempdir = FolderPath + fileName;
            var tempfileName = TblName;

            try
            {

                if (!Directory.Exists(tempdir))
                    Directory.CreateDirectory(tempdir);

                var fileNamePath = fileName;

                // Bind table data to Stream Writer to export data to respective folder
                //StreamWriter wr = new StreamWriter(@"D:\temp\Book11.xls", true);
                StreamWriter wr = new StreamWriter(FolderPath + fileNamePath + "\\" + tempfileName + ".xls", true, System.Text.Encoding.UTF7);// Encoding.Unicode);// System.Text.Encoding.UTF32);

                // Write Columns to excel file
                strSteps = "AutoExport 2";
                if (dt.Rows.Count > 0)
                {
                    for (int i = 0; i < dt.Columns.Count; i++)
                    {
                        //wr.Write(String.Format(System.Globalization.CultureInfo.InvariantCulture, "{0:#}", dt.Columns[i].ToString()) + "\t");

                        //wr.Write(dt.Columns[i].ToString() + "\t");
                        if (i == 0)
                            wr.Write(String.Format(System.Globalization.CultureInfo.InvariantCulture, "{0:#},", "SNo") + "\t");

                        wr.Write(String.Format(System.Globalization.CultureInfo.InvariantCulture,
                               "{0:#},", dt.Columns[i].ToString()) + "\t");

                    }
                }
                if (dt.Rows.Count == 0)
                    wr.Write("No Records Found" + "\t");
                wr.WriteLine();
                strSteps = "AutoExport 3" + "row : " + dt.Rows.Count + " Col : " + dt.Columns.Count;
                //write rows to excel file

                var fieldValue = string.Empty;
                for (int i = 0; i < (dt.Rows.Count); i++)
                {
                    for (int j = 0; j < dt.Columns.Count; j++)
                    {
                        drr = i + " - " + j;
                        if (dt.Rows[i][j] != null)
                        {
                            if (dt.Rows[i][j].ToString().Split('/').Length == 33)//3)// && dt.Rows[i][j].ToString().Split('/')[2].Length == 4)
                            {
                                //wr.Write(" " + dt.Rows[i][j].ToString().Replace("\"", "").Replace("\r\n", "").Replace("\n", "").Replace("\n", "").Replace("\t", "") + "\t");

                                DateTime date = DateTime.ParseExact(dt.Rows[i][j].ToString(), "dd/MM/yyyy", null);
                                wr.Write(" " + date.ToString("dd-MM-yyyy", System.Globalization.CultureInfo.InvariantCulture) + "\t");
                            }
                            else if (dt.Rows[i][j].ToString().Contains("http"))
                            {
                                var SiteLink = dt.Rows[i][j].ToString().Replace("\"", "").Replace("\r\n", "").Replace("\n", "").Replace("\n", "").Replace("\t", "");
                                var link1 = "=HYPERLINK(\"" + SiteLink + "\", \"" + SiteLink + "\")";
                                //wr.Write(link1 + "\t");

                                wr.Write(String.Format(System.Globalization.CultureInfo.InvariantCulture, "{0:#},", link1) + "\t");

                            }
                            else
                            {
                                fieldValue = dt.Rows[i][j].ToString().Replace("\"", "").Replace("\r\n", "").Replace("\n", "").Replace("\n", "").Replace("\t", "");
                                //if (i == 0)
                                //    wr.Write(dt.Rows[i][j].ToString().Replace("\"", "").Replace("\r\n", "").Replace("\n", "").Replace("\n", "").Replace("\t", "").ToString(new System.Globalization.CultureInfo("de-DE")) + "\t");
                                //else if (i == 1)

                                //    wr.Write(String.Format(System.Globalization.CultureInfo.InvariantCulture,
                                //                                " ", dt.Rows[i][j].ToString().Replace("\"", "").Replace("\r\n", "").Replace("\n", "").Replace("\n", "").Replace("\t", "")) + "\t");

                                ////else if (i == 2)
                                ////    //string.Format("{0:n}", float.Parse(dt.Rows[i][j].ToString(), System.Globalization.CultureInfo.InvariantCulture)).ToString();
                                //else if (i == 3)
                                //    wr.Write(dt.Rows[i][j].ToString().Replace("\"", "").Replace("\r\n", "").Replace("\n", "").Replace("\n", "").Replace("\t", "").ToString(System.Globalization.CultureInfo.InvariantCulture) + "\t");
                                //else if (i == 4)
                                //    wr.Write(dt.Rows[i][j].ToString().Replace("\"", "").Replace("\r\n", "").Replace("\n", "").Replace("\n", "").Replace("\t", "").ToString(new System.Globalization.CultureInfo("fa-IR")) + "\t");
                                //else if (i == 5)
                                //    wr.Write(String.Format(System.Globalization.CultureInfo.CurrentCulture,
                                //                                                                    "{0:#}", dt.Rows[i][j].ToString().Replace("\"", "").Replace("\r\n", "").Replace("\n", "").Replace("\n", "").Replace("\t", "")) + "\t");

                                //else
                                //wr.Write(String.Format(System.Globalization.CultureInfo.InvariantCulture,
                                //"{0:#} ", dt.Rows[i][j].ToString().Replace("\"", "").Replace("\r\n", "").Replace("\n", "").Replace("\n", "").Replace("\t", "")) + "\t");

                                //long value = 9555487800038;

                                //String result = value.ToString("D20");
                                //var s = String.Format("{0:D20}", value);
                                ////var s = String.Format("{0:D20}", 50};
                                //if (j == 1)
                                //{
                                //    string sw = value + ";";
                                //    sw = sw.TrimEnd((char)';');
                                //    wr.Write(sw + "\t");
                                //}
                                //else if (j == 1)
                                //{
                                //    wr.WriteLine(value.ToString().PadLeft(20, '0')); // <- 20 is desired string length, '0' - padding

                                //}
                                //else if (j == 2)
                                //{
                                //    wr.WriteLine(string.Format("{0,-30}", value));

                                //}
                                //else if (j == 3)
                                //{
                                //    //(i == 3 ? "" : "|") +

                                //    wr.Write(
                                //                                          "" + value.ToString().Replace(@"<me> ", "")
                                //                                                .Replace(@"</me>", "|").Replace(@"</me>", ";")
                                //                                                .Replace('\n', ' ').Replace('\r', ' ')
                                //                                        );
                                //    //wr.WriteLine(string.Format("{0,-30}", value));
                                //    //wr.WriteLine(value.ToString().PadLeft(20, '0')); // <- 20 is desired string length, '0' - padding

                                //}
                                ////else if (j == 4)
                                ////{
                                ////    wr.Write(
                                ////                        (i == 3 ? "" : "|") +
                                ////                        value.ToString().Replace(@"<me> ", "")
                                ////                            .Replace(@"</me>", "|").Replace(@"</me>", ";")
                                ////                            .Replace('\n', ' ').Replace('\r', ' ')
                                ////                    );
                                ////    //wr.WriteLine(string.Format("{0,-30}", value));
                                ////    //wr.WriteLine(value.ToString().PadLeft(20, '0')); // <- 20 is desired string length, '0' - padding

                                ////}
                                //else
                                //wr.Write(s + "\t");

                                //int n;
                                //bool isNumeric = int.TryParse(dt.Rows[i][j].ToString(), out n);
                                //var  isNumeric2 = System.Text.RegularExpressions.Regex.Replace(dt.Rows[i][j].ToString(), "[^0-9 _]", "");


                                //long value = 9555487800038;
                                //if (j == 1)
                                //    wr.Write(" " + value + "\t");
                                //else if (j == 2)
                                //{
                                //    var value2 = String.Format("\"{0}\"", value);
                                //    wr.Write(value2 + "\t");
                                //}
                                //else
                                //    wr.Write("'" + value + "\t");

                                //  wr.Write(String.Format(System.Globalization.CultureInfo.InvariantCulture,
                                //"{0:#},", dt.Rows[i][j].ToString().Replace("\"", "").Replace("\r\n", "").Replace("\n", "").Replace("\n", "").Replace("\t", "")) + "\t");

                                //wr.Write(dt.Rows[i][j].ToString().Replace("\"", "").Replace("\r\n", "").Replace("\n", "").Replace("\n", "").Replace("\t", "") + "\t");




                                if (j == 0)
                                    wr.Write(String.Format(System.Globalization.CultureInfo.InvariantCulture, "{0:#},", (i + 1)) + "\t");
                                int n;
                                bool isNumeric = int.TryParse(fieldValue, out n);
                                if (isNumeric)
                                    wr.Write(String.Format(System.Globalization.CultureInfo.InvariantCulture, "{0:#}", fieldValue) + "\t");
                                else
                                    wr.Write(fieldValue + "\t");



                            }
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
                wb.SaveAs(FolderPath + fileName + ".xlsx", Microsoft.Office.Interop.Excel.XlFileFormat.xlOpenXMLWorkbook, Type.Missing, Type.Missing, Type.Missing, Type.Missing, Microsoft.Office.Interop.Excel.XlSaveAsAccessMode.xlExclusive, Type.Missing, Type.Missing, Type.Missing, Type.Missing, Type.Missing);
                strSteps = "AutoExport 7";
                wb.Close();
                app.Quit();
                strSteps = "AutoExport delete xls";
                //System.IO.File.Delete(fileLocation + fileName + ".xls");
                System.IO.File.Delete(FolderPath + fileNamePath + "\\" + tempfileName + ".xls");
                Directory.Delete(tempdir);
                strSteps = "AutoExport done";
                ExportErrorLog("strSteps  =" + strSteps);
                return FolderPath + fileName + ".xlsx";
            }
            catch (Exception ex)
            {
                var d = drr;
                ExportErrorLog("AutoExport =" + ex.Message + " - strSteps  = " + strSteps + " -- " + FolderPath + tempdir + tempfileName + ".xls");
                return FolderPath + tempdir + "\\" + tempfileName + ".xls";
            }

        }

     
        private string AutoExportXL(DataTable dt, string fileLocation, string fileName, string TblName)
        {
            //var ret = ExportExcelNew(dt, fileLocation, fileName, TblName);
            //if (ret.ToString() != "")
            //{
            //    return ret.ToString();
            //}
            var drr = "";
            var strSteps = "AutoExport 1";
            string tempdir = FolderPath + fileName;
            var tempfileName = TblName;

            try
            {

                if (!Directory.Exists(tempdir))
                    Directory.CreateDirectory(tempdir);

                var fileNamePath = fileName;

                // Bind table data to Stream Writer to export data to respective folder
                //StreamWriter wr = new StreamWriter(@"D:\temp\Book11.xls", true);
                StreamWriter wr = new StreamWriter(FolderPath + fileNamePath + "\\" + tempfileName + ".xls", true, System.Text.Encoding.UTF7, 4096);// Encoding.Unicode);// System.Text.Encoding.UTF32);

                // Write Columns to excel file
                strSteps = "AutoExport 2";
                if (dt.Rows.Count > 0)
                {
                    for (int i = 0; i < dt.Columns.Count; i++)
                    {
                        if (i == 0)
                            wr.Write("SNo" + "\t");

                        wr.Write(dt.Columns[i].ToString() + "\t");

                    }
                }
                if (dt.Rows.Count == 0)
                    wr.Write("No Records Found" + "\t");
                wr.WriteLine();
                strSteps = "AutoExport 3" + "row : " + dt.Rows.Count + " Col : " + dt.Columns.Count;
                //write rows to excel file

                var fieldValue = string.Empty;
                for (int i = 0; i < (dt.Rows.Count); i++)
                {
                    for (int j = 0; j < dt.Columns.Count; j++)
                    {
                        drr = i + " - " + j;
                        if (dt.Rows[i][j] != null)
                        {
                            if (dt.Rows[i][j].ToString().Split('/').Length == 33)//3)// && dt.Rows[i][j].ToString().Split('/')[2].Length == 4)
                            {
                                //wr.Write(" " + dt.Rows[i][j].ToString().Replace("\"", "").Replace("\r\n", "").Replace("\n", "").Replace("\n", "").Replace("\t", "") + "\t");

                                DateTime date = DateTime.ParseExact(dt.Rows[i][j].ToString(), "dd/MM/yyyy", null);
                                wr.Write(" " + date.ToString("dd-MM-yyyy", System.Globalization.CultureInfo.InvariantCulture) + "\t");
                            }
                            else if (dt.Rows[i][j].ToString().Contains("http"))
                            {
                                var SiteLink = dt.Rows[i][j].ToString().Replace("\"", "").Replace("\r\n", "").Replace("\n", "").Replace("\n", "").Replace("\t", "");
                                var link1 = "=HYPERLINK(\"" + SiteLink + "\", \"" + SiteLink + "\")";
                                //wr.Write(link1 + "\t");

                                wr.Write(String.Format(System.Globalization.CultureInfo.InvariantCulture, "{0:#},", link1) + "\t");

                            }
                            else
                            {
                                fieldValue = dt.Rows[i][j].ToString().Replace("\"", "").Replace("\r\n", "").Replace("\n", "").Replace("\n", "").Replace("\t", "");

                                long number = 9555487800038; //Int32.MaxValue;

                                if (j == 0)
                                    wr.Write(number + "\t");
                                else if (j == 1)
                                    wr.Write("  " + number + "\t");
                                else if (j == 2)
                                    wr.Write("  " + number.ToString(System.Globalization.CultureInfo.InvariantCulture) + "\t");
                                else if (j == 3)
                                    wr.Write("  " + number.ToString() + "\t");

                                wr.Write(" " + number.ToString(System.Globalization.CultureInfo.InvariantCulture) + "\t");



                            }
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

                wb.SaveAs(FolderPath + fileName + ".xlsx", Microsoft.Office.Interop.Excel.XlFileFormat.xlOpenXMLWorkbook, Type.Missing, Type.Missing, Type.Missing, Type.Missing, Microsoft.Office.Interop.Excel.XlSaveAsAccessMode.xlExclusive, Type.Missing, Type.Missing, Type.Missing, Type.Missing, Type.Missing);
                strSteps = "AutoExport 7";
                wb.Close();
                app.Quit();
                strSteps = "AutoExport delete xls";
                //System.IO.File.Delete(fileLocation + fileName + ".xls");
                System.IO.File.Delete(FolderPath + fileNamePath + "\\" + tempfileName + ".xls");
                Directory.Delete(tempdir);
                strSteps = "AutoExport done";
                ExportErrorLog("strSteps  =" + strSteps);
                return FolderPath + fileName + ".xlsx";
            }
            catch (Exception ex)
            {
                var d = drr;
                ExportErrorLog("AutoExport =" + ex.Message + " - strSteps  = " + strSteps + " -- " + FolderPath + tempdir + tempfileName + ".xls");
                return FolderPath + tempdir + "\\" + tempfileName + ".xls";
            }

        }

        private string AutoExportXL_2notneed(DataTable dt, string fileLocation, string fileName, string TblName)
        {
            //var ret = ExportExcelNew(dt, fileLocation, fileName, TblName);
            //if (ret.ToString() != "")
            //{
            //    return ret.ToString();
            //}
            var drr = "";
            var strSteps = "AutoExport 1";
            string tempdir = FolderPath + fileName;
            var tempfileName = TblName;

            try
            {

                if (!Directory.Exists(tempdir))
                    Directory.CreateDirectory(tempdir);

                var fileNamePath = fileName;

                // Bind table data to Stream Writer to export data to respective folder
                //StreamWriter wr = new StreamWriter(@"D:\temp\Book11.xls", true);

                var fName = FolderPath + fileNamePath + "\\" + tempfileName + ".xls";
                //FileStream stream = new FileStream(FolderPath + fileNamePath + "\\" + tempfileName + "12.xls", FileMode.OpenOrCreate);

                //StreamWriter wr;//=  new StreamWriter(FolderPath + fileNamePath + "\\" + tempfileName + ".xls", true, System.Text.Encoding.UTF7);// Encoding.Unicode);// System.Text.Encoding.UTF32);
                //                //wr.Close();

                var encod = System.Text.Encoding.UTF7;
                encod = System.Text.Encoding.UTF8;
                encod = System.Text.Encoding.UTF32;
                encod = System.Text.Encoding.Unicode;
                encod = System.Text.Encoding.ASCII;
                encod = System.Text.Encoding.BigEndianUnicode;
                encod = System.Text.Encoding.Default;

                StreamWriter wr = new StreamWriter(fName, true, encod);

                var ss = "110";
                //if (ss == "0")
                //    wr = new StreamWriter(stream, Encoding.UTF8);// Encoding.Unicode);// System.Text.Encoding.UTF32);
                //else if (ss == "1")
                //    wr = new StreamWriter(stream);
                if (ss == "2")
                    wr = new StreamWriter(fName, true, System.Text.Encoding.UTF7);
                else if (ss == "3")
                    wr = new StreamWriter(fName, true, Encoding.UTF8);
                else if (ss == "4")
                    wr = new StreamWriter(fName, true, Encoding.UTF32);
                else if (ss == "5")
                    wr = new StreamWriter(fName, true, Encoding.Unicode);
                else if (ss == "6")
                    wr = new StreamWriter(fName, true, Encoding.ASCII);
                else if (ss == "7")
                    wr = new StreamWriter(fName, true, Encoding.BigEndianUnicode);
                else if (ss == "8")
                    wr = new StreamWriter(fName, true, Encoding.Default);
                else if (ss == "")
                    wr = new StreamWriter(fName);

                //else if (ss == "10")
                //    wr = new StreamWriter(stream, Encoding.UTF8, 4096);
                //else if (ss == "11")
                //    wr = new StreamWriter(stream);
                else if (ss == "12")
                    wr = new StreamWriter(fName, true, System.Text.Encoding.UTF7, 4096);
                else if (ss == "13")
                    wr = new StreamWriter(fName, true, Encoding.UTF8, 4096);
                else if (ss == "14")
                    wr = new StreamWriter(fName, true, Encoding.UTF32, 4096);
                else if (ss == "15")
                    wr = new StreamWriter(fName, true, Encoding.Unicode, 4096);
                else if (ss == "16")
                    wr = new StreamWriter(fName, true, Encoding.ASCII, 4096);
                else if (ss == "17")
                    wr = new StreamWriter(fName, true, Encoding.BigEndianUnicode, 4096);
                else if (ss == "18")
                    wr = new StreamWriter(fName, true, Encoding.Default, 4096);

                else wr = new StreamWriter(fName, true, System.Text.Encoding.UTF7);



                // Write Columns to excel file
                strSteps = "AutoExport 2";
                if (dt.Rows.Count > 0)
                {
                    for (int i = 0; i < dt.Columns.Count; i++)
                    {
                        //wr.Write(String.Format(System.Globalization.CultureInfo.InvariantCulture, "{0:#}", dt.Columns[i].ToString()) + "\t");

                        if (i == 0)
                            wr.Write("SNo" + "\t");



                        wr.Write(dt.Columns[i].ToString() + "\t");
                        //if (i == 0)
                        //    wr.Write(String.Format(System.Globalization.CultureInfo.InvariantCulture, "{0:#},", "SNo") + "\t");

                        //wr.Write(String.Format(System.Globalization.CultureInfo.InvariantCulture,
                        //       "{0:#},", dt.Columns[i].ToString()) + "\t");

                    }
                }
                if (dt.Rows.Count == 0)
                    wr.Write("No Records Found" + "\t");
                wr.WriteLine();
                strSteps = "AutoExport 3" + "row : " + dt.Rows.Count + " Col : " + dt.Columns.Count;
                //write rows to excel file

                var fieldValue = string.Empty;
                for (int i = 0; i < (dt.Rows.Count); i++)
                {
                    for (int j = 0; j < dt.Columns.Count; j++)
                    {
                        drr = i + " - " + j;
                        if (dt.Rows[i][j] != null)
                        {
                            if (dt.Rows[i][j].ToString().Split('/').Length == 33)//3)// && dt.Rows[i][j].ToString().Split('/')[2].Length == 4)
                            {
                                //wr.Write(" " + dt.Rows[i][j].ToString().Replace("\"", "").Replace("\r\n", "").Replace("\n", "").Replace("\n", "").Replace("\t", "") + "\t");

                                DateTime date = DateTime.ParseExact(dt.Rows[i][j].ToString(), "dd/MM/yyyy", null);
                                wr.Write(" " + date.ToString("dd-MM-yyyy", System.Globalization.CultureInfo.InvariantCulture) + "\t");
                            }
                            else if (dt.Rows[i][j].ToString().Contains("http"))
                            {
                                var SiteLink = dt.Rows[i][j].ToString().Replace("\"", "").Replace("\r\n", "").Replace("\n", "").Replace("\n", "").Replace("\t", "");
                                var link1 = "=HYPERLINK(\"" + SiteLink + "\", \"" + SiteLink + "\")";
                                //wr.Write(link1 + "\t");

                                wr.Write(String.Format(System.Globalization.CultureInfo.InvariantCulture, "{0:#},", link1) + "\t");

                            }
                            else
                            {
                                fieldValue = dt.Rows[i][j].ToString().Replace("\"", "").Replace("\r\n", "").Replace("\n", "").Replace("\n", "").Replace("\t", "");

                                long number = 9555487800038; //Int32.MaxValue;

                                if (j == 0)
                                    wr.Write(number + "\t");
                                else if (j == 1)
                                    wr.Write("  " + number + "\t");
                                else if (j == 2)
                                    wr.Write("  " + number.ToString(System.Globalization.CultureInfo.InvariantCulture) + "\t");
                                else if (j == 3)
                                    wr.Write("  " + number.ToString() + "\t");

                                wr.Write(" " + number.ToString(System.Globalization.CultureInfo.InvariantCulture) + "\t");





                                //wr.Write(fieldValue + "\t");



                            }
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
                wb.SaveAs(FolderPath + fileName + ".xlsx", Microsoft.Office.Interop.Excel.XlFileFormat.xlOpenXMLWorkbook, Type.Missing, Type.Missing, Type.Missing, Type.Missing, Microsoft.Office.Interop.Excel.XlSaveAsAccessMode.xlExclusive, Type.Missing, Type.Missing, Type.Missing, Type.Missing, Type.Missing);
                strSteps = "AutoExport 7";
                wb.Close();
                app.Quit();
                strSteps = "AutoExport delete xls";
                //System.IO.File.Delete(fileLocation + fileName + ".xls");
                System.IO.File.Delete(FolderPath + fileNamePath + "\\" + tempfileName + ".xls");
                Directory.Delete(tempdir);
                strSteps = "AutoExport done";
                ExportErrorLog("strSteps  =" + strSteps);
                return FolderPath + fileName + ".xlsx";
            }
            catch (Exception ex)
            {
                var d = drr;
                ExportErrorLog("AutoExport =" + ex.Message + " - strSteps  = " + strSteps + " -- " + FolderPath + tempdir + tempfileName + ".xls");
                return FolderPath + tempdir + "\\" + tempfileName + ".xls";
            }

        }
        private async System.Threading.Tasks.Task<string> AutoExportXL1(DataTable dt, string fileLocation, string fileName, string TblName)
        {
            //var ret = await ExportExcelNew(dt, fileLocation, fileName, TblName);
            //if (ret.ToString() != "")
            //{
            //    return ret.ToString();
            //}
            var drr = "";
            var strSteps = "AutoExport 1";
            string tempdir = FolderPath + fileName;
            var tempfileName = TblName;

            try
            {

                if (!Directory.Exists(tempdir))
                    Directory.CreateDirectory(tempdir);

                var fileNamePath = fileName;

                // Bind table data to Stream Writer to export data to respective folder
                //StreamWriter wr = new StreamWriter(@"D:\temp\Book11.xls", true);
                StreamWriter wr = new StreamWriter(FolderPath + fileNamePath + "\\" + tempfileName + ".xls", true, System.Text.Encoding.Unicode);// Encoding.Unicode);// System.Text.Encoding.UTF32);

                // Write Columns to excel file
                strSteps = "AutoExport 2";
                if (dt.Rows.Count > 0)
                {
                    for (int i = 0; i < dt.Columns.Count; i++)
                    {
                        wr.Write(dt.Columns[i].ToString() + "\t");
                        //wr.Write(String.Format(System.Globalization.CultureInfo.InvariantCulture,
                        //       "{0:#},", dt.Columns[i].ToString()) + "\t");
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
                        drr = i + " - " + j;
                        if (dt.Rows[i][j] != null)
                        {
                            if (dt.Rows[i][j].ToString().Split('/').Length == 3)// && dt.Rows[i][j].ToString().Split('/')[2].Length == 4)
                            {
                                wr.Write(" " + dt.Rows[i][j].ToString().Replace("\"", "").Replace("\r\n", "").Replace("\n", "").Replace("\n", "").Replace("\t", "") + "\t");

                                //DateTime date = DateTime.ParseExact(dt.Rows[i][j].ToString(), "dd/MM/yyyy", null);
                                //wr.Write(" " + date.ToString("dd-MM-yyyy", System.Globalization.CultureInfo.InvariantCulture) + "\t");
                            }
                            else if (dt.Rows[i][j].ToString().Contains("http"))
                            {
                                var SiteLink = dt.Rows[i][j].ToString().Replace("\"", "").Replace("\r\n", "").Replace("\n", "").Replace("\n", "").Replace("\t", "");
                                var link1 = "=HYPERLINK(\"" + SiteLink + "\", \"" + SiteLink + "\")";
                                wr.Write(link1 + "\t");
                            }
                            else
                            {
                                //wr.Write(String.Format(System.Globalization.CultureInfo.InvariantCulture,
                                //"{0:#} ", dt.Rows[i][j].ToString().Replace("\"", "").Replace("\r\n", "").Replace("\n", "").Replace("\n", "").Replace("\t", "")) + "\t");

                                wr.Write(dt.Rows[i][j].ToString().Replace("\"", "").Replace("\r\n", "").Replace("\n", "").Replace("\n", "").Replace("\t", "") + "\t");

                            }
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
                wb.SaveAs(FolderPath + fileName + ".xlsx", Microsoft.Office.Interop.Excel.XlFileFormat.xlOpenXMLWorkbook, Type.Missing, Type.Missing, Type.Missing, Type.Missing, Microsoft.Office.Interop.Excel.XlSaveAsAccessMode.xlExclusive, Type.Missing, Type.Missing, Type.Missing, Type.Missing, Type.Missing);
                strSteps = "AutoExport 7";
                wb.Close();
                app.Quit();
                strSteps = "AutoExport delete xls";
                //System.IO.File.Delete(fileLocation + fileName + ".xls");
                System.IO.File.Delete(FolderPath + fileNamePath + "\\" + tempfileName + ".xls");
                Directory.Delete(tempdir);
                strSteps = "AutoExport done";
                ExportErrorLog("strSteps  =" + strSteps);
                return FolderPath + fileName + ".xlsx";
            }
            catch (Exception ex)
            {
                var d = drr;
                ExportErrorLog("AutoExport =" + ex.Message + " - strSteps  = " + strSteps + " -- " + FolderPath + tempdir + tempfileName + ".xls");
                return FolderPath + tempdir + "\\" + tempfileName + ".xls";
            }

        }

        //private async System.Threading.Tasks.Task<string> ExportExcelNew(DataTable dt, string fileLocation, string fileName, string TblName)
        private string ExportExcelNew(DataTable dt, string fileLocation, string fileName, string TblName)
        {
            var returnvalue = "";
            try
            {
                //await System.Threading.Tasks.Task.Run(() =>
                //{
                Microsoft.Office.Interop.Excel.Application xlApp = new Microsoft.Office.Interop.Excel.Application();
                if (xlApp == null)
                {
                    return "";
                }

                Microsoft.Office.Interop.Excel.Workbook xlWorkBook;
                Microsoft.Office.Interop.Excel.Worksheet xlWorkSheet;
                object misValue = System.Reflection.Missing.Value;

                xlWorkBook = xlApp.Workbooks.Add(misValue);
                xlWorkSheet = (Microsoft.Office.Interop.Excel.Worksheet)xlWorkBook.Worksheets.get_Item(1);
                xlWorkSheet.Name = TblName;
                if (dt.Rows.Count > 0)
                {
                    for (int i = 0; i < dt.Columns.Count; i++)
                    {
                        xlWorkSheet.Cells[1, (i + 1)] = dt.Columns[i].ToString();
                    }
                }
                if (dt.Rows.Count == 0)
                    xlWorkSheet.Cells[1, 1] = "No Records Found";

                for (int i = 0; i < (dt.Rows.Count); i++)
                {
                    for (int j = 0; j < dt.Columns.Count; j++)
                    {

                        if (dt.Rows[i][j] != null)
                        {
                            xlWorkSheet.Cells[(i + 2), (j + 1)] = "'" + dt.Rows[i][j].ToString().Replace("\"", "").Replace("\r\n", "").Replace("\n", "").Replace("\n", "").Replace("\t", "");
                        }
                        else
                        {
                            xlWorkSheet.Cells[(i + 2), (j + 1)] = "";
                        }
                    }
                }
                //wb.SaveAs(FolderPath + fileName + ".xlsx", Microsoft.Office.Interop.Excel.XlFileFormat.xlOpenXMLWorkbook, Type.Missing, Type.Missing, Type.Missing, Type.Missing, Microsoft.Office.Interop.Excel.XlSaveAsAccessMode.xlExclusive, Type.Missing, Type.Missing, Type.Missing, Type.Missing, Type.Missing);
                xlWorkBook.SaveAs(FolderPath + fileName + ".xlsx", Microsoft.Office.Interop.Excel.XlFileFormat.xlOpenXMLWorkbook, misValue, misValue, misValue, misValue, Microsoft.Office.Interop.Excel.XlSaveAsAccessMode.xlExclusive, misValue, misValue, misValue, misValue, misValue);
                xlWorkBook.Close(true, misValue, misValue);
                xlApp.Quit();

                Marshal.ReleaseComObject(xlWorkSheet);
                Marshal.ReleaseComObject(xlWorkBook);
                Marshal.ReleaseComObject(xlApp);
                returnvalue = FolderPath + fileName + ".xlsx";
                return FolderPath + fileName + ".xlsx";
                //});
            }
            catch (Exception)
            {
                return "";
            }
            return returnvalue;
        }
        private void button1_Click1(DataTable dt, string fileLocation, string fileName, string TblName)
        {
            Microsoft.Office.Interop.Excel.Application xlApp = new Microsoft.Office.Interop.Excel.Application();

            if (xlApp == null)
            {
                //MessageBox.Show("Excel is not properly installed!!");
                return;
            }


            Microsoft.Office.Interop.Excel.Workbook xlWorkBook;
            Microsoft.Office.Interop.Excel.Worksheet xlWorkSheet;
            object misValue = System.Reflection.Missing.Value;

            xlWorkBook = xlApp.Workbooks.Add(misValue);
            xlWorkSheet = (Microsoft.Office.Interop.Excel.Worksheet)xlWorkBook.Worksheets.get_Item(1);

            xlWorkSheet.Cells[1, 1] = "ID";
            xlWorkSheet.Cells[1, 2] = "Name";
            xlWorkSheet.Cells[2, 1] = "1";
            xlWorkSheet.Cells[2, 2] = "One";
            xlWorkSheet.Cells[3, 1] = "2";
            xlWorkSheet.Cells[3, 2] = "Two";


            xlWorkBook.SaveAs("d:\\csharp-Excel.xlsx", Microsoft.Office.Interop.Excel.XlFileFormat.xlOpenXMLWorkbook, misValue, misValue, misValue, misValue, Microsoft.Office.Interop.Excel.XlSaveAsAccessMode.xlExclusive, misValue, misValue, misValue, misValue, misValue);
            xlWorkBook.Close(true, misValue, misValue);
            xlApp.Quit();

            Marshal.ReleaseComObject(xlWorkSheet);
            Marshal.ReleaseComObject(xlWorkBook);
            Marshal.ReleaseComObject(xlApp);

            //MessageBox.Show("Excel file created , you can find the file d:\\csharp-Excel.xls");
        }

        private string AutoExportXLOld(DataTable dt, string fileLocation, string fileName)
        {
            var strSteps = "AutoExport 1";
            try
            {
                fileName = "ActivityLog";

                // Bind table data to Stream Writer to export data to respective folder
                //StreamWriter wr = new StreamWriter(@"D:\temp\Book11.xls", true);
                StreamWriter wr = new StreamWriter(FolderPath + fileName + ".xls", true, Encoding.Unicode);// System.Text.Encoding.UTF32);

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
                Microsoft.Office.Interop.Excel.Workbook wb = app.Workbooks.Open(FolderPath + fileName + ".xls", Type.Missing, Type.Missing, Type.Missing, Type.Missing, Type.Missing, Type.Missing, Type.Missing, Type.Missing, Type.Missing, Type.Missing, Type.Missing, Type.Missing, Type.Missing, Type.Missing);
                strSteps = "AutoExport 6";
                wb.SaveAs(FolderPath + fileName + ".xlsx", Microsoft.Office.Interop.Excel.XlFileFormat.xlOpenXMLWorkbook, Type.Missing, Type.Missing, Type.Missing, Type.Missing, Microsoft.Office.Interop.Excel.XlSaveAsAccessMode.xlExclusive, Type.Missing, Type.Missing, Type.Missing, Type.Missing, Type.Missing);
                strSteps = "AutoExport 7";
                wb.Close();
                app.Quit();
                strSteps = "AutoExport delete xls";
                System.IO.File.Delete(FolderPath + fileName + ".xls");

                strSteps = "AutoExport done";
                ExportErrorLog("strSteps  =" + strSteps);
                return FolderPath + fileName + ".xlsx";
            }
            catch (Exception ex)
            {
                ExportErrorLog("AutoExport =" + ex.Message + " - strSteps  = " + strSteps);
                return FolderPath + fileName + ".xls";
            }

        }

        private string AutoExportCSV(DataTable dt, string fileLocation, string fileName)
        {
            var strSteps = "AutoExport 1";
            try
            {
                // Bind table data to Stream Writer to export data to respective folder
                //StreamWriter wr = new StreamWriter(@"D:\temp\Book11.xls", true);
                StreamWriter wr = new StreamWriter(FolderPath + fileName + ".csv", true, Encoding.Unicode);// System.Text.Encoding.UTF32);

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
                return FolderPath + fileName + ".csv";
            }
            catch (Exception ex)
            {
                ExportErrorLog("AutoExport =" + ex.Message + " - strSteps  = " + strSteps);
                return FolderPath + fileName + ".csv";
            }

        }
        private string ToCSV(DataTable dt, string fileLocation, string fileName)
        {
            var strSteps = "AutoExport 1";
            try
            {

                StreamWriter sw = new StreamWriter(FolderPath + fileName + ".csv", false);
                //headers    
                for (int i = 0; i < dt.Columns.Count; i++)
                {
                    sw.Write(dt.Columns[i]);
                    if (i < dt.Columns.Count - 1)
                    {
                        sw.Write(",");
                    }
                }
                sw.Write(sw.NewLine);
                foreach (DataRow dr in dt.Rows)
                {
                    for (int i = 0; i < dt.Columns.Count; i++)
                    {
                        if (!Convert.IsDBNull(dr[i]))
                        {
                            string value = dr[i].ToString();
                            if (value.Contains(","))
                            {
                                value = String.Format("\"{0}\"", value);
                                sw.Write(value);
                            }
                            else
                            {
                                sw.Write(dr[i].ToString());
                            }
                        }
                        if (i < dt.Columns.Count - 1)
                        {
                            sw.Write(",");
                        }
                    }
                    sw.Write(sw.NewLine);
                }
                sw.Close();
                strSteps = "AutoExport done csv";
                ExportErrorLog("strSteps  =" + strSteps);
                return FolderPath + fileName + ".csv";
            }
            catch (Exception ex)
            {
                ExportErrorLog("AutoExport =" + ex.Message + " - strSteps  = " + strSteps);
                return FolderPath + fileName + ".csv";
            }
        }



        /// <summary>
        /// ReadRecord
        /// </summary>
        /// <param name="query">Execute from query</param>
        /// <param name="constr">CS string</param>
        /// <returns>datatable record</returns>
        private DataTable ReadRecord(string query, string constr)
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
                con.Dispose();
                if (ds.Tables.Count > 0)
                    dt = ds.Tables[0];

                return dt;
            }
            catch (Exception ex)
            {
                exceptionMsg = ex.Message;
                ExportErrorLog("ReadRecord Exception : " + ex.Message);
            }
            finally
            {
                con.Close();
            };
            return dt;
        }

        public DataTable ReadRecord1(string query, string constr)
        {
            ExportErrorLog("ReadRecord : " + query);

            SqlConnection conn = new SqlConnection(constr);
            DataTable dt = new DataTable();
            try
            {
                SqlCommand cmd = new SqlCommand(query, conn);
                conn.Open();
                cmd.CommandTimeout = 3600;// 600;  //30*60=1800 // 60- seconds
                SqlDataReader reader = cmd.ExecuteReader();
                dt.Load(reader);
                reader.Close();
                conn.Close();
                return dt;
            }
            catch (Exception ex)
            {
                ExportErrorLog("ReadRecord Exception 1: " + ex.Message);
            }
            finally
            {
                conn.Close();
            };
            return dt;

        }

        private void ExportErrorLog(string ex)
        {
            //if (!Directory.Exists(dir))  // if it doesn't exist, create
            //    Directory.CreateDirectory(dir);
            string message = string.Format("Time: {0}", DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss tt"));
            message += Environment.NewLine;
            message += "-----------------------------------------------------------";
            message += Environment.NewLine;
            message += string.Format("Message: {0}", ex);
            message += Environment.NewLine;
            message += "-----------------------------------------------------------";
            message += Environment.NewLine;
            string dteinfo = UserID + "_" + DateTime.Now.ToString("dd/MM/yyyy").Replace("/", "_");
            //string path = System.Web.HttpContext.Current.Server.MapPath("~/ViewErrorLogFiles/ExportErrorLog_" + dteinfo + ".txt");
            string path = FolderPath + "ExportErrorLog_" + dteinfo + ".txt";// System.AppDomain.CurrentDomain.BaseDirectory;

            using (StreamWriter writer = new StreamWriter(path, true))
            {
                writer.WriteLine(message);
                writer.Close();
            }
        }


        public string AutoExportExcel(string TblName, string UserID, string AgentID, string CustID, DateTime FromDt, DateTime ToDt)
        {
            var strSteps = "";
            DataTable dt = new DataTable();
            try
            {
                strSteps = "1";
                DataTable dtResult = new DataTable();
                if (AgentID == "ALL")
                {
                    dt = ReadRecord("select * from SalesAgent where UserID='" + UserID + "'", CS);
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

                dt = ReadRecord("select * from ExportQueryConfig where AliasName='" + TblName + "' and Documentfields='EMail'", CS);
                if (dt.Rows.Count > 0)
                {
                    for (int n = 0; n < dt.Rows.Count; n++)
                    {
                        TableName = dt.Rows[n]["TableName"].ToString();
                        Query = dt.Rows[n]["Query"].ToString();
                        AliasName = dt.Rows[n]["AliasName"].ToString();
                    }
                }
                strSteps = "3";

                string FromDate = FromDt.ToString("yyyy-MM-dd 00:00:00.000");
                string ToDate = ToDt.ToString("yyyy-MM-dd 23:59:59.000");
                Query = Query.Replace("{FromDate}", "'" + FromDate + "'");
                Query = Query.Replace("{ToDate}", "'" + ToDate + "'");
                Query = Query.Replace("{AgentID}", "'" + AgentID + "'");
                Query = Query.Replace("{UserID}", "'" + UserID + "'");
                Query = Query.Replace("{CustID}", "'" + CustID + "'");

                strSteps = "4";
                dt = ReadRecord(Query, CS);
                strSteps = "done";
                ExportErrorLog("strSteps : " + strSteps);
                if (dt.Rows.Count == 0)
                {
                    ExportErrorLog("No Records Found");
                    return "No Records Found";
                }
                if (FileType.ToLower() == "xlsx")
                    return AutoExportXL(dt, FolderPath, TblName + "_" + UserID + "_" + DateTime.Now.ToString("yyyyMMddHHmmssfff"), TblName);
                else
                    return AutoExportCSV(dt, FolderPath, TblName + "_" + UserID + "_" + DateTime.Now.ToString("yyyyMMddHHmmssfff"));


            }
            catch (Exception ex)
            {
                ExportErrorLog("Exception : " + ex.Message + " strSteps : " + strSteps);
                return "";
            }
        }

        //Public Function GetSimplrDataManual(ByVal FolderPath As String, ByVal UserID As String, ByVal Dt As System.Data.DataTable, ByVal TableName As String, ByVal AliasName As String) As String
        //AutoExportXL(dt, FolderPath, TblName + "_" + UserID + "_" + DateTime.Now.ToString("yyyyMMddHHmmssfff"), TblName);

        public string GetSimplrDataManual(string fileLocation, string UserID, DataTable dt, string TblName, string AliasName)
        {
            FolderPath = fileLocation;
            var add1 = "_" + DateTime.Now.ToString("yyyyMMddHHmmssfff");
            var drr = "";
            var strSteps = "AutoExport 1";
            string tempdir = FolderPath + AliasName + add1;
            var tempfileName = TblName;

            try
            {

                if (!Directory.Exists(tempdir))
                    Directory.CreateDirectory(tempdir);

                var fileNamePath = AliasName + add1;

                // Bind table data to Stream Writer to export data to respective folder
                //StreamWriter wr = new StreamWriter(@"D:\temp\Book11.xls", true);
                StreamWriter wr = new StreamWriter(FolderPath + fileNamePath + "\\" + tempfileName + ".xls", true, Encoding.Unicode);// System.Text.Encoding.UTF32);

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
                        drr = i + " - " + j;
                        if (dt.Rows[i][j] != null)
                        {
                            if (dt.Rows[i][j].ToString().Split('/').Length == 3)// && dt.Rows[i][j].ToString().Split('/')[2].Length == 4)
                            {
                                wr.Write(" " + dt.Rows[i][j].ToString().Replace("\"", "").Replace("\r\n", "").Replace("\n", "").Replace("\n", "").Replace("\t", "") + "\t");

                                //DateTime date = DateTime.ParseExact(dt.Rows[i][j].ToString(), "dd/MM/yyyy", null);
                                //wr.Write(" " + date.ToString("dd-MM-yyyy", System.Globalization.CultureInfo.InvariantCulture) + "\t");
                            }
                            else if (dt.Rows[i][j].ToString().Contains("http"))
                            {
                                var SiteLink = dt.Rows[i][j].ToString().Replace("\"", "").Replace("\r\n", "").Replace("\n", "").Replace("\n", "").Replace("\t", "");
                                var link1 = "=HYPERLINK(\"" + SiteLink + "\", \"" + SiteLink + "\")";
                                wr.Write(link1 + "\t");
                            }
                            else
                            {
                                wr.Write(dt.Rows[i][j].ToString().Replace("\"", "").Replace("\r\n", "").Replace("\n", "").Replace("\n", "").Replace("\t", "") + "\t");
                            }
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
                wb.SaveAs(FolderPath + AliasName + add1 + ".xlsx", Microsoft.Office.Interop.Excel.XlFileFormat.xlOpenXMLWorkbook, Type.Missing, Type.Missing, Type.Missing, Type.Missing, Microsoft.Office.Interop.Excel.XlSaveAsAccessMode.xlExclusive, Type.Missing, Type.Missing, Type.Missing, Type.Missing, Type.Missing);
                strSteps = "AutoExport 7";
                wb.Close();
                app.Quit();
                strSteps = "AutoExport delete xls";
                //System.IO.File.Delete(fileLocation + fileName + ".xls");
                System.IO.File.Delete(FolderPath + fileNamePath + "\\" + tempfileName + ".xls");
                Directory.Delete(tempdir);
                strSteps = "AutoExport done";
                ExportErrorLog("strSteps  =" + strSteps);
                return FolderPath + AliasName + add1 + ".xlsx";
            }
            catch (Exception ex)
            {
                var d = drr;
                ExportErrorLog("AutoExport =" + ex.Message + " - strSteps  = " + strSteps + " -- " + FolderPath + tempdir + tempfileName + ".xls");
                return FolderPath + tempdir + "\\" + tempfileName + ".xls";
            }

        }




    }
}
