//using GemBox.Spreadsheet;
using ClosedXML.Excel;
using OfficeOpenXml;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using System.IO;
using System.Runtime.InteropServices;
using System.Text;
using System.Text.RegularExpressions;
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
        public string ExpFileName;
        public DateTime frmdate, todate;
        public String Title = "";

        /// <summary>
        /// Export function without JSU and PVM
        /// </summary>
        public string ExportToExcelandCSV(string TblName, string UserID, string AgentID, DateTime FromDt, DateTime ToDt, string DistributorID, string SalesOfficeID, string Location)
        {
            frmdate = FromDt; todate = ToDt;
            var strSteps = "";
            DataTable dt = new DataTable();
            try
            {
                strSteps = "1";
                DataTable dtResult = new DataTable();
                //if (AgentID == "ALL")
                //{
                //    dt = ReadRecord("select * from SalesAgent where UserID='" + UserID + "' and Active ='1'", CS);
                //    if (dt.Rows.Count > 0)
                //    {
                //        for (int n = 0; n < dt.Rows.Count; n++)
                //        {
                //            AgentID = dt.Rows[n]["Code"].ToString();
                //        }
                //    }

                //}
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
                        try
                        {
                            Title = dt.Rows[n]["Title"].ToString();
                        }
                        catch (Exception)
                        {

                          //  throw;
                        }
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
                    //if (ProjectName.ToLower() == "danone" || ProjectName.ToLower() == "uic")
                    //    return AutoExportXL(dt, FolderPath, TblName + "_" + UserID + "_" + DateTime.Now.ToString("yyyyMMddHHmmssfff"), TblName);
                    //else
                    //{
                    //newly added By.M 28.12.2022
                    //   return AutoExportXL(dt, FolderPath, TblName + "_" + UserID + "_" + DateTime.Now.ToString("yyyyMMddHHmmssfff"), TblName);

                    if (ProjectName.ToLower() == "dancom")
                        return dttoexcel(dt, FolderPath, TblName + "-" + DateTime.Now.ToString("yyyyMMdd"), TblName);
                    //return dttoexcel(dt, FolderPath, TblName + " " + DateTime.Now.ToString("yyyy-MM-dd HH.mm.ss"), TblName);
                    else
                        return dttoexcel(dt, FolderPath, TblName + "_" + UserID + "_" + DateTime.Now.ToString("yyyyMMddHHmmssfff"), TblName);
                    // }
                    //Coment By.M 28.12.2022 -- senthilsir
                    //return AutoExportXLNew(dt, FolderPath, TblName + "_" + UserID + "_" + DateTime.Now.ToString("yyyyMMddHHmmssfff"), TblName);

                }
                else
                {
                    if (ProjectName.ToLower() == "danone")
                        return ToCSV(dt, FolderPath, TblName + "_" + UserID + "_" + DateTime.Now.ToString("yyyyMMddHHmmssfff"));
                    else if (ProjectName.ToLower() == "dancom")
                        return ToCSV(dt, FolderPath, TblName + "-" + DateTime.Now.ToString("yyyyMMdd"));
                    //return ToCSV(dt, FolderPath, TblName + " " + DateTime.Now.ToString("yyyy-MM-dd HH.mm.ss"));
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
        public string ExportToExcelandCSVPVM(string TblName, string UserID, string AgentID, DateTime FromDt, DateTime ToDt, string DistributorID, string SalesOfficeID, string Branch)
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
                Query = Query.Replace("{Branch}", "'" + Branch + "'");
                strSteps = "4";

                dt = ReadRecord(Query, CS);
                strSteps = "done";
                ExportErrorLog("strSteps  =" + strSteps);

                if (FileType.ToLower() == "xlsx")
                {
                    //newly added By.M 28.12.2022
                    return dttoexcel(dt, FolderPath, TblName + "_" + UserID + "_" + DateTime.Now.ToString("yyyyMMddHHmmssfff"), TblName);

                    //Coment By.M 28.12.2022
                    //return AutoExportXL(dt, FolderPath, TblName + "_" + UserID + "_" + DateTime.Now.ToString("yyyyMMddHHmmssfff"), TblName);
                }
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
                    dt = ReadRecord("select * from SalesAgent where UserID='" + UserID + "'  and Active ='1'", CS);
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
                {
                    //newly added By.M 28.12.2022
                    return dttoexcel(dt, FolderPath, TblName + "_" + UserID + "_" + DateTime.Now.ToString("yyyyMMddHHmmssfff"), TblName);
                    //Coment By.M 28.12.2022
                    // return AutoExportXL(dt, FolderPath, TblName + "_" + UserID + "_" + DateTime.Now.ToString("yyyyMMddHHmmssfff"), TblName);
                }
                else
                    return AutoExportCSV(dt, FolderPath, TblName + "_" + UserID + "_" + DateTime.Now.ToString("yyyyMMddHHmmssfff"));

            }
            catch (Exception ex)
            {
                ExportErrorLog(" ExportToExcelPVMError Message  = " + ex.Message + " - strSteps  = " + strSteps);
                return "";
            }
        }

      
        private string dttoexcel(DataTable dt, string fileLocation, string fileName, string TblName)
        {
            try
            {
                var wb = new XLWorkbook();


                string tablName = TblName;
                try
                {
                    tablName = TblName.Substring(0, 30);

                }
                catch (Exception ex) { ExportErrorLog("AutoExport Table Name = " + ex.Message); }

                var ws = wb.Worksheets.Add(dt, tablName);

                ws.Table(0).ShowAutoFilter = false;// Disable AutoFilter.
                ws.Table(0).Theme = XLTableTheme.None;// Remove Theme.

                // if (dt.Rows.Count <= 50000)
                // {

                if (TblName == "Modify Outlet Report")
                {
                    // List<IXLRow> rows = (List<IXLRow>) wb.Worksheet(tablName).RowsUsed();
                    foreach (IXLRow row in wb.Worksheet(tablName).RowsUsed())
                    {
                        //Setting the default background color for the row.
                        row.CellsUsed().Style.Fill.BackgroundColor = XLColor.FromHtml("#FFFFFF");

                        // int cellno = 0;
                        foreach (IXLCell cell in row.CellsUsed())
                        {

                            try
                            {
                                string tempp = cell.Value.ToString().Replace("@1", "");
                                tempp = tempp.Replace("@0", "");

                                if (Regex.IsMatch(tempp, @"^\d+$") == true && tempp.Length > 10)
                                {
                                    cell.Style.NumberFormat.Format = "0";
                                    cell.Value = "'" + cell.Value;

                                }
                            }
                            catch (Exception)
                            {

                                //  throw;
                            }
                            string tt = cell.Value.ToString();
                            if (tt.EndsWith("@1") == true)
                            {
                                cell.Value = tt.Replace("@1", "");
                                //Setting the background color for the row.
                                cell.Style.Fill.BackgroundColor = XLColor.FromHtml("#fcd5b4");
                                //Setting the font color for the row.
                                cell.Style.Font.FontColor = XLColor.FromHtml("#000000");
                            }
                            else
                            {
                                cell.Value = tt.Replace("@0", "");
                            }

                        }
                    }
                }

                try
                {
                    ws.Columns().AdjustToContents();// Resize all columns.
                }
                catch (Exception ex)
                {
                    ExportErrorLog("AutoExport dttoexcel = " + ex.Message);
                }
                //  }

                wb.SaveAs(FolderPath + fileName + ".xlsx");

                //wb.SaveAs(@"D:\temp\Test\MyDataTable.xlsx");
                return FolderPath + fileName + ".xlsx";
            }
            catch (Exception ex)
            {
                ExportErrorLog("AutoExport dttoexcel = " + ex.Message);
                return "";
            }
            //try
            //{
            //    var wb = new XLWorkbook();
            //    wb.Worksheets.Add();
            //    wb.Worksheet(1).Cell(1, 1).Value = "From Date: ";
            //    wb.Worksheet(1).Cell(1, 1).Style.Font.SetBold(true);
            //    wb.Worksheet(1).Cell(1, 2).Value = frmdate.ToString("dd/MM/yyyy");
            //    wb.Worksheet(1).Cell(1, 2).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Left;

            //    wb.Worksheet(1).Cell(2, 1).Value = "To Date: ";
            //    wb.Worksheet(1).Cell(2, 1).Style.Font.SetBold(true);
            //    wb.Worksheet(1).Cell(2, 2).Value = todate.ToString("dd/MM/yyyy");
            //    wb.Worksheet(1).Cell(2, 2).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Left;

            //    wb.Worksheet(1).Cell(3, 1).Value = "Title: ";
            //    wb.Worksheet(1).Cell(3, 1).Style.Font.SetBold(true);

            //    if (Title == "")
            //        wb.Worksheet(1).Cell(3, 2).Value = TblName;
            //    else
            //        wb.Worksheet(1).Cell(3, 2).Value = Title;

            //    wb.Worksheet(1).Cell(3, 2).RichText.SetFontColor(XLColor.Blue);
            //    wb.Worksheet(1).Cell(3, 2).RichText.FontSize = 12;
            //  // wb.Worksheet(1).Cell(3, 2).RichText.FontName = "Arial";
            //    //wb.Worksheet(1).Cell(3, 2).RichText.SetUnderline(XLFontUnderlineValues.Single);


            //    // wb.Worksheet(1).Cell(3, 1).Style.Alignment.WrapText = true;
            //    wb.Worksheet(1).Range("B3:F3").Merge();
            //    // var ws = wb.Worksheets.Add(dt, TblName);
            //    var ws = wb.Worksheet(1).Cell(5, 1).InsertTable(dt, TblName);
            //    //var ws = wb.Worksheets.Add(dt, TblName);

            //    //if (TblName == "Service Report")
            //    //{
            //    //    for (int i = 6; i <= dt.Rows.Count + 6; i++)
            //    //    {
            //    //        //wb.Worksheet(1).Hyperlinks.Add(wb.Worksheet(1).Cell(i, 7));
            //    //        wb.Worksheet(1).Cell(i, 7).GetHyperlink();
            //    //    }
            //    //}

            //    wb.Worksheet(1).SheetView.FreezeRows(5);

            //   // ws.Row(5).Style.Border.OutsideBorder = XLBorderStyleValues.Thick;

            //    if(TblName.Length > 30)
            //        wb.Worksheet(1).Name = TblName.Substring(0,30);
            //    else
            //        wb.Worksheet(1).Name = TblName;

            //    //ws.Table(0).ShowAutoFilter = false;// Disable AutoFilter.
            //    //ws.Table(0).Theme = XLTableTheme.None;// Remove Theme.

            //    ws.ShowAutoFilter = false;// Disable AutoFilter.
            //    ws.Theme = XLTableTheme.None;// Remove Theme.
            //    wb.Worksheet(1).Row(5).Style.Font.SetBold(true);
            //    wb.Worksheet(1).Row(5).Style.Fill.BackgroundColor = XLColor.LightGray;
            //    wb.Worksheet(1).Row(5).Style.Border.OutsideBorder = XLBorderStyleValues.Thick;

            //    try
            //    {
            //        wb.Worksheet(1).Columns("A:Z").AdjustToContents();
            //        //foreach (var item in wb.Worksheet(1).ColumnsUsed())
            //        //{
            //        //    item.AdjustToContents();
            //        //}

            //     //   wb.Worksheet(1).Columns().AdjustToContents();
            //        // ws.Columns().AdjustToContents();// Resize all columns.
            //       // ws.Column..addAdjustToContents();// Resize all columns.
            //    }
            //    catch (Exception ex)
            //    {
            //        ExportErrorLog("AutoExport dttoexcel = " + ex.Message);
            //    }

            //    wb.SaveAs(FolderPath + fileName + ".xlsx");

            //    //wb.SaveAs(@"D:\temp\Test\MyDataTable.xlsx");
            //    return FolderPath + fileName + ".xlsx";
            //}
            //catch (Exception ex)
            //{
            //    ExportErrorLog("AutoExport dttoexcel = " + ex.Message);
            //    return "";
            //}
        }
        public string dttoexcelCR(DataTable dt, string fileLocation, string fileName, string TblName)
        {
            try
            {
                var wb = new XLWorkbook();

                string tablName = TblName;
                try
                {
                    tablName = TblName.Substring(0, 30);

                }
                catch (Exception ex) { ExportErrorLog("AutoExport Table Name = " + ex.Message); }

                var ws = wb.Worksheets.Add(dt, tablName);

                ws.Table(0).ShowAutoFilter = false;// Disable AutoFilter.
                ws.Table(0).Theme = XLTableTheme.None;// Remove Theme.
                ws.Columns().AdjustToContents();// Resize all columns.

                wb.SaveAs(fileLocation + fileName + ".xlsx");

                //wb.SaveAs(@"D:\temp\Test\MyDataTable.xlsx");
                return fileLocation + fileName + ".xlsx";
            }
            catch (Exception ex)
            {
                ExportErrorLog("AutoExport dttoexcel = " + ex.Message);
                return "";
            }
        }

        private string AutoExportXL(DataTable dt, string fileLocation, string fileName, string TblName)
        {
            var drr = "";
            var strSteps = "AutoExport 1";
            string tempdir = FolderPath + fileName;
            var tempfileName = TblName;// + "1";

            try
            {

                if (!Directory.Exists(tempdir))
                    Directory.CreateDirectory(tempdir);

                var fileNamePath = fileName;

                // Bind table data to Stream Writer to export data to respective folder
                //StreamWriter wr = new StreamWriter(@"D:\temp\Book11.xls", true);
                //StreamWriter wr = new StreamWriter(FolderPath + fileNamePath + "\\" + tempfileName + ".xls", true, System.Text.Encoding.UTF7, 4096);// Encoding.Unicode);// System.Text.Encoding.UTF32);
                StreamWriter wr = new StreamWriter(FolderPath + fileNamePath + "\\" + tempfileName + ".xls", true, System.Text.Encoding.UTF32);// Encoding.Unicode);// System.Text.Encoding.UTF32);

                // Write Columns to excel file
                strSteps = "AutoExport 2";
                if (dt.Rows.Count > 0)
                {
                    for (int i = 0; i < dt.Columns.Count; i++)
                    {

                        wr.Write(dt.Columns[i].ToString() + "\t");

                        //System.Text.Encoding.UTF8
                        //if (i == 0)
                        //    wr.Write(String.Format(System.Globalization.CultureInfo.InvariantCulture, "{0:#},", "SNo") + "\t");
                        //wr.Write(String.Format(System.Globalization.CultureInfo.InvariantCulture, "{0:#},", dt.Columns[i].ToString()) + "\t");
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
                            fieldValue = dt.Rows[i][j].ToString().Replace("\"", "").Replace("\r\n", "").Replace("\n", "").Replace("\n", "").Replace("\t", "");


                            if (dt.Rows[i][j].ToString().Split('/').Length == 3 && ProjectName.ToLower() != "danone")//3)// && dt.Rows[i][j].ToString().Split('/')[2].Length == 4)
                            {
                                var charLen = fieldValue.Split('/')[0].Trim().Length + fieldValue.Split('/')[1].Trim().Length + fieldValue.Split('/')[1].Trim().Length;
                                int number;
                                var isNum = true;
                                var isNum0 = int.TryParse(fieldValue.Split('/')[0], out number);
                                var isNum1 = int.TryParse(fieldValue.Split('/')[1], out number);
                                var isNum2 = int.TryParse(fieldValue.Split('/')[2], out number);
                                isNum = (isNum0 == true && isNum1 == true && isNum2 == true) ? true : false;

                                strSteps = "Date : " + "row : " + i + " Col : " + j + " , Value : " + fieldValue;
                                if (!isNum || charLen != 8) { wr.Write(fieldValue + "\t"); }
                                else
                                {
                                    //wr.Write(" " + dt.Rows[i][j].ToString().Replace("\"", "").Replace("\r\n", "").Replace("\n", "").Replace("\n", "").Replace("\t", "") + "\t");
                                    DateTime date;
                                    if (dt.Rows[i][j].ToString().Split(' ').Length == 2)
                                        date = DateTime.ParseExact(dt.Rows[i][j].ToString(), "dd/MM/yyyy HH:mm:ss", null);
                                    else
                                        date = DateTime.ParseExact(dt.Rows[i][j].ToString(), "dd/MM/yyyy", null);
                                    wr.Write(" " + date.ToString("dd-MM-yyyy", System.Globalization.CultureInfo.InvariantCulture) + "\t");
                                }
                            }
                            else if (dt.Rows[i][j].ToString().Contains("http"))
                            {
                                var SiteLink = dt.Rows[i][j].ToString().Replace("\"", "").Replace("\r\n", "").Replace("\n", "").Replace("\n", "").Replace("\t", "");
                                var link1 = "=HYPERLINK(\"" + SiteLink + "\", \"" + SiteLink + "\")";
                                wr.Write(link1 + "\t");

                                //wr.Write(String.Format(System.Globalization.CultureInfo.InvariantCulture, "{0:#},", link1) + "\t");

                            }
                            else
                            {
                                // System.Text.Encoding.UTF8
                                //if (j == 0)
                                //    wr.Write(String.Format(System.Globalization.CultureInfo.InvariantCulture, "{0:#},", " " + (i + 1).ToString()) + "\t");
                                //wr.Write(String.Format(System.Globalization.CultureInfo.InvariantCulture, "{0:#},", fieldValue) + "\t");

                                //System.Text.Encoding.UTF32
                                long n;
                                var isNumeric = long.TryParse(fieldValue, out n);
                                if (isNumeric && +fieldValue.Length >= 10)
                                {
                                    wr.Write("'" + fieldValue + "\t");
                                }
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
                return tempdir + "\\" + tempfileName + ".xls";
                //return FolderPath + tempdir + "\\" + tempfileName + ".xls";
            }

        }

        public static bool IsDigitsOnly(string s)
        {
            if (s == null || s == "") return false;

            for (int i = 0; i < s.Length; i++)
                if ((s[i] ^ '0') > 9)
                    return false;

            return true;
        }
        private string AutoExportCSV(DataTable dt, string fileLocation, string fileName)
        {
            var strSteps = "AutoExport 1";
            try
            {
                // Bind table data to Stream Writer to export data to respective folder
                //StreamWriter wr = new StreamWriter(@"D:\temp\Book11.xls", true);
                //nisha
                StreamWriter wr = new StreamWriter(FolderPath + fileName + ".csv", true, Encoding.Unicode); //System.Text.Encoding.UTF32);
               

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
                {
                    for (int j = 0; j < dt.Columns.Count; j++)
                    {
                        wr.Write(dt.Columns[j].ToString().Replace("\"", "").Replace("\r\n", "").Replace("\n", "").Replace("\n", "").Replace("\t", "") + diff);
                    }
                    wr.WriteLine();
                    wr.Write("No Records Found" + "\t");
                }
                wr.WriteLine();
                strSteps = "AutoExport 3" + "row : " + dt.Rows.Count + " Col : " + dt.Columns.Count;
                bool flg = false;
                //write rows to excel file
                for (int i = 0; i < (dt.Rows.Count); i++)
                {
                    for (int j = 0; j < dt.Columns.Count; j++)
                    {
                        if (dt.Rows[i][j] != null)
                        {
                            //wr.Write(dt.Rows[i][j].ToString().Replace("\"", "")  + diff);
                            //wr.Write(dt.Rows[i][j].ToString().Replace("\"", "").Replace("\r\n", "") + diff);
                            var tmp = dt.Rows[i][j].ToString().Replace("\"", "").Replace("\r\n", "").Replace("\n", "").Replace("\n", "").Replace("\t", "");

                            if (IsDigitsOnly(tmp) && tmp.Length > 13)
                                flg = true;
                                

                            
                            //wr.Write(dt.Rows[i][j].ToString().Replace("\"", "")  + diff);
                            //wr.Write(dt.Rows[i][j].ToString().Replace("\"", "").Replace("\r\n", "") + diff);

                            if ((fileName.Contains("StockAdjustmentDetails") && dt.Columns[j].ColumnName == "AdjType") || dt.Rows[i][j].ToString().Contains(","))
                                wr.Write(String.Format("=\"{0}\"", tmp) + diff);
                            else if (flg==true)
                                wr.Write(String.Format("=\"{0}\"", tmp) + diff);
                            else if (fileName.Contains("Modify Outlet Report") == true)
                            {
                                string tempp = dt.Rows[i][j].ToString().Replace("@1", "");
                                tempp = tempp.Replace("@0", "");
                                
                                if(dt.Columns[j].ColumnName == "GSTN")
                                    wr.Write(String.Format("=\"{0}\"", tempp.Replace("\"", "").Replace("\r\n", "").Replace("\n", "").Replace("\n", "").Replace("\t", "")) + diff);
                                else
                                    wr.Write(tempp.Replace("\"", "").Replace("\r\n", "").Replace("\n", "").Replace("\n", "").Replace("\t", "") + diff);
                                //wr.Write(String.Format("=\"{0}\"", tmp) + diff);
                            }
                            else
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
                    //Existing Function commented by Nisha/Vishnu on 08/12/2023
                    if (ProjectName.ToLower() == "danone")
                        return AutoExportXL(dt, FolderPath, TblName + "_" + UserID + "_" + DateTime.Now.ToString("yyyyMMddHHmmssfff"), TblName);
                    else
                    {
                        if (ProjectName.ToLower() == "pvmigt")
                            return dttoexcel(dt, FolderPath, ExpFileName + "_" + DateTime.Now.ToString("yyyyMMdd"), TblName);
                        else
                            return dttoexcel(dt, FolderPath, TblName + "_" + UserID + "_" + DateTime.Now.ToString("yyyyMMddHHmmssfff"), TblName);
                    }
                else
                {
                    if (ProjectName.ToLower() == "pvmigt")
                        return AutoExportCSV(dt, FolderPath, ExpFileName + "_" + DateTime.Now.ToString("yyyyMMdd"));
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
        public string StringBuilderExport(DataTable dt, string fileLocation, string fileName, string TblName)
        {
            try
            {


                // CreateExcelFile(dt, fileLocation, fileName, TblName);
                StringBuilder sb = new StringBuilder();
                //static file name, can be changes as per requirement
                //wb.SaveAs(@"D:\temp\Test\MyDataTable.xlsx");
                string sFileName = @"D:\temp\Test\MyDataTable.xls"; //"filename.xls";
                                                                    //Bind data list from edmx
                                                                    //var Data = objEntities.citymaster.Take(10).ToList();
                                                                    //sFileName = FolderPath + fileName + ".xlsx";

                sb.Append("<table style='1px solid black; font-size:12px;'>");
                sb.Append("<tr>");
                foreach (DataColumn dc in dt.Columns)
                {
                    sb.Append("<td><b>" + dc.ColumnName + "</b></td>");
                }

                sb.Append("</tr>");
                foreach (DataRow dr in dt.Rows)
                {
                    sb.Append("<tr>");
                    foreach (DataColumn dc in dt.Columns)
                    {

                        if (dc.ToString() == "Date")
                        {
                            sb.Append("<td><font face=Arial size=" + "14px" + ">" + Convert.ToDateTime(dr[dc]).ToString("dd/MM/yyyy") + "</font></td>");
                        }
                        else
                        {
                            sb.Append("<td><font face=Arial size=" + "14px" + ">" + dr[dc].ToString() + "</font></td>");
                        }
                    }
                    sb.Append("</tr>");
                }

                System.Web.HttpContext.Current.Response.AddHeader("content-disposition", "attachment; filename=" + "MyDataTable.xls");
                System.Web.HttpContext.Current.Response.ContentType = "application/vnd.ms-excel";
                byte[] buffer = System.Text.Encoding.UTF8.GetBytes(sb.ToString());

                System.IO.File.WriteAllText(sFileName, sb.ToString());
                //System.IO.File.WriteAllText(@"D:\abc.xls", sb.ToString());

                //return File(buffer, "application/vnd.ms-excel");
                //System.Web.HttpContext.Current.Response.BinaryWrite(buffer);
                return sFileName;

            }
            catch (Exception ex)
            {

                //throw;
            }
            return "";
        }
        public void CreateExcelFile(DataTable Excel, string fileLocation, string fileName, string TblName)
        {
            try
            {

                var sFileName = FolderPath + fileName + ".xlsx";
                //Clears all content output from the buffer stream.  
                System.Web.HttpContext.Current.Response.ClearContent();
                //Adds HTTP header to the output stream  
                //System.Web.HttpContext.Current.Response.AddHeader("content-disposition", string.Format("attachment; filename=C#cornerVithalWadje.xls"));

                //// Gets or sets the HTTP MIME type of the output stream  
                //System.Web.HttpContext.Current.Response.ContentType = "application/vnd.ms-excel";
                System.Web.HttpContext.Current.Response.AddHeader("content-disposition", "attachment; filename=" + sFileName);
                System.Web.HttpContext.Current.Response.ContentType = "application/vnd.ms-excel";

                string space = "";

                foreach (DataColumn dcolumn in Excel.Columns)
                {

                    System.Web.HttpContext.Current.Response.Write(space + dcolumn.ColumnName);
                    space = "\t";
                }
                System.Web.HttpContext.Current.Response.Write("\n");
                int countcolumn;
                foreach (DataRow dr in Excel.Rows)
                {
                    space = "";
                    for (countcolumn = 0; countcolumn < Excel.Columns.Count; countcolumn++)
                    {

                        System.Web.HttpContext.Current.Response.Write(space + dr[countcolumn].ToString());
                        space = "\t";

                    }

                    System.Web.HttpContext.Current.Response.Write("\n");
                }
                System.Web.HttpContext.Current.Response.End();

            }
            catch (Exception ex)
            {

                //throw;
            }
        }

    }
}
