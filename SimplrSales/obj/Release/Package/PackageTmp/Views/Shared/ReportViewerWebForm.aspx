<%@ Page Language="C#" AutoEventWireup="true" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<%@ Register Assembly="Microsoft.ReportViewer.WebForms, Version=15.0.0.0, Culture=neutral, PublicKeyToken=89845dcd8080cc91" Namespace="Microsoft.Reporting.WebForms" TagPrefix="rsweb" %>

<!DOCTYPE html>
<%@ Import Namespace="System" %>
<%@ Import Namespace="System.Data" %>
<%@ Import Namespace="System.Data.SqlClient" %>
<%@ Import Namespace="System.IO" %>
<%@ Import Namespace="System.Text" %>
<%@ Import Namespace="System.Drawing.Printing" %>
<%@ Import Namespace="System.Collections.Generic" %>
<%@ Import Namespace="System.Drawing.Imaging" %>
<%@ Import Namespace="Newtonsoft.Json" %>
<%@ Import Namespace="System.Web.Mvc" %>
<%@ Import Namespace="System.Web" %>
<%@ Import Namespace="System.Web.Services" %>
<%@ Import Namespace="System.Globalization" %>
<%@ Import Namespace="System.Collections.Specialized" %>
<%@ Import Namespace="iTextSharp.text" %>
<%@ Import Namespace="iTextSharp.text.pdf" %>
<%@ Import Namespace="System.Drawing" %>
<%@ Import Namespace="System.IO" %>
<%@ Import Namespace="ZPLPrint" %>


<%-- <%@ Import Namespace ="System.Windows.Forms" %>--%>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Report</title>
     <script type="text/javascript">
         function Print() {
             alert("ok1");
             //var opts = 'width=700,height=500,toolbar=0,menubar=0,location=1,status=1,scrollbars=1,resizable=1,left=0,top=0';
             // var newWindow = window.open("E:\27032024\SimplrSales\SimplrSales\Reports\Test_InvoiceRep.pdf", 'name', opts);
             // newWindow.print();
             return false;
         }
     </script>
    <script runat="server">
        private int m_currentPageIndex;
        private IList<Stream> m_streams;
        public string FileName;

        void Page_Init(object sender, System.EventArgs e)
        {
            Context.Handler = this.Page;
        }
        void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                try
                {

                    if (Session["IsPrint"].ToString() == "true")//HttpContext.Current.Session["Print"] == "true")
                    {
                        AutoPrintLoadReport();
                    }
                    else if (Session["IsPrint"].ToString() == "autoprint")
                    {
                        AutoPrintReport();
                    }
                    else if (Session["IsPrint"].ToString() == "ZPL_PRINT")
                    {
                        ZPLPrintReport();
                    }
                    else
                    {
                        LoadReport();
                    }
                }
                catch (Exception ex)
                {

                    SendErrorToText(ex);
                }
                //Session["ProjectName"] = ConfigurationManager.AppSettings["ProjectName"];
                //Session["ScreenName"].ToString();

                //LoadReport1();
                //LoadReport();

                //AutoPrintLoadReport();

            }
        }


        private void Export(LocalReport report)
        {
            string deviceInfo =
              @"<DeviceInfo>
                <OutputFormat>EMF</OutputFormat>
                <PageWidth>8.5in</PageWidth>
                <PageHeight>11in</PageHeight>
                <MarginTop>0.2in</MarginTop>
                <MarginLeft>0.7in</MarginLeft>
                <MarginRight>0.2in</MarginRight>
                <MarginBottom>0.2in</MarginBottom>
            </DeviceInfo>";
            Warning[] warnings;
            m_streams = new List<Stream>();
            report.Render("Image", deviceInfo, (name, fileNameExtension, encoding, mimeType, willSeek) =>
            {
                var stream = new MemoryStream();
                m_streams.Add(stream);
                return stream;
            },
               out warnings);
            foreach (Stream stream in m_streams)
                stream.Position = 0;
        }

        private void PrintPage(object sender, PrintPageEventArgs ev)
        {
            Metafile pageImage = new
               Metafile(m_streams[m_currentPageIndex]);

            // Adjust rectangular area with printer margins.
            System.Drawing.Rectangle adjustedRect = new System.Drawing.Rectangle(
                ev.PageBounds.Left - (int)ev.PageSettings.HardMarginX,
                ev.PageBounds.Top - (int)ev.PageSettings.HardMarginY,
                ev.PageBounds.Width,
                ev.PageBounds.Height);

            // Draw a white background for the report
            ev.Graphics.FillRectangle(Brushes.White, adjustedRect);

            // Draw the report content
            ev.Graphics.DrawImage(pageImage, adjustedRect);

            // Prepare for the next page. Make sure we haven't hit the end.
            m_currentPageIndex++;
            ev.HasMorePages = (m_currentPageIndex < m_streams.Count);
        }

        private void Print(string printername)
        {
            if (m_streams == null || m_streams.Count == 0)
                throw new Exception("Error: no stream to print.");
            PrintDocument printDoc = new PrintDocument();


            if (!printDoc.PrinterSettings.IsValid)
            {
                throw new Exception("Error: cannot find the default printer.");
            }
            else
            {
                printDoc.PrintPage += new PrintPageEventHandler(PrintPage);
                printDoc.PrinterSettings.PrinterName = printername;
                m_currentPageIndex = 0;
                printDoc.Print();
            }
        }

        private void ZPLPrintReport()
        {
            DataSet ds = new DataSet();
            ds = (DataSet)Session["ReportDataset"];

            var objZPLPrnt = new ZPLPrinting();
            objZPLPrnt.FolderPath = Server.MapPath("~/Reports/");
            var returnvalue = "";
            returnvalue = objZPLPrnt.ZebraLabelPrinting(ds, Session["lblSize"].ToString());

            string ReportName = "";

            if (ds.Tables[1].Rows.Count > 0)
            {
                ReportName = ds.Tables[1].Rows[0]["ReportName"].ToString();
            }

            Response.Redirect(Request.Url.AbsoluteUri.Replace("ReportView", "") + ReportName + ".pdf");
        }

        private void AutoPrintReport()
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
            ReportViewer1.LocalReport.EnableHyperlinks = true;
            ReportViewer1.LocalReport.EnableExternalImages = true;
            // ADDTIONALLY ADDED 16.10.2020 ==============================
            ReportViewer1.KeepSessionAlive = true;
            // ADDTIONALLY ADDED 16.10.2020 ==============================
            ReportViewer1.HyperlinkTarget = "_blank";
            ReportViewer1.LocalReport.DataSources.Add(reportDataSource);

            Warning[] warnings;
            string[] streamids;
            string mimeType, encoding, filenameExtension;

            byte[] bytes = ReportViewer1.LocalReport.Render("Pdf", null, out mimeType, out encoding, out filenameExtension, out streamids, out warnings);

            //File  
            FileName = "Test_" + ReportName + ".pdf";
            Session["PrintFileUrl"] = "http://13.67.95.127/SimplrSengChoon/Reports/" + FileName + ".pdf";
            string FilePath = Server.MapPath(@"~\Reports\") + FileName;




            //create and set PdfReader  
            iTextSharp.text.pdf.PdfReader reader = new iTextSharp.text.pdf.PdfReader(bytes);
            FileStream output = new FileStream(FilePath, FileMode.Create);

            // string Agent = HttpContext.Request.Headers["User-Agent"].ToString();  

            //create and set PdfStamper  
            iTextSharp.text.pdf.PdfStamper pdfStamper = new iTextSharp.text.pdf.PdfStamper(reader, output, '0', true);

            //if (Agent.Contains("Firefox"))  
            //  pdfStamper.JavaScript = "var res = app.loaded('var pp = this.getPrintParams();pp.interactive = pp.constants.interactionLevel.full;this.print(pp);');";  
            //else  
            pdfStamper.JavaScript = "var res = app.setTimeOut('var pp = this.getPrintParams();pp.interactive = pp.constants.interactionLevel.full;this.print(pp);', 200);";

            pdfStamper.FormFlattening = false;
            pdfStamper.Close();
            reader.Close();

            //LocalReport lr = ReportViewer1.LocalReport;

            //Export(lr);
            //string printername = "";
            //try
            //{
            //    printername =   ConfigurationManager.AppSettings["printername"];

            //}
            //catch(Exception ) { }

            //Print(printername);
            //ClientScript.RegisterStartupScript(typeof(Page), "closePage", "window.close();", true);
        }

        private void AutoPrintLoadReport()
        {
            try
            {
                Page.Response.Write("<script>console.log('" + "msg" + "');<//script>");
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
                ReportViewer1.LocalReport.EnableHyperlinks = true;
                ReportViewer1.LocalReport.EnableExternalImages = true;
                // ADDTIONALLY ADDED 16.10.2020 ==============================
                ReportViewer1.KeepSessionAlive = true;
                // ADDTIONALLY ADDED 16.10.2020 ==============================
                ReportViewer1.HyperlinkTarget = "_blank";
                ReportViewer1.LocalReport.DataSources.Add(reportDataSource);

                //    LocalReport lr = ReportViewer1.LocalReport;

                //    Export(lr);
                //    string printername = ConfigurationManager.AppSettings["printername"];
                //Print(printername);



                //ReportViewer1.Cle


                // ReportViewer1.LocalReport.Refresh();
                //ReportViewer1.DataBind();

                //ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reports/" + ReportName + ".rdlc");
                //ReportViewer1.LocalReport.EnableHyperlinks = true;
                //ReportViewer1.LocalReport.EnableExternalImages = true;
                //ReportViewer1.KeepSessionAlive = true;
                //ReportViewer1.HyperlinkTarget = "_blank";
                //ReportViewer1.LocalReport.DataSources.Clear();
                //ReportDataSource rdc = new ReportDataSource("DataSet1", ds.Tables[2]);
                //ReportViewer1.LocalReport.DataSources.Add(rdc);
                //ReportViewer1.LocalReport.Refresh();
                //ReportViewer1.DataBind();

                //Byte  
                Warning[] warnings;
                string[] streamids;
                string mimeType, encoding, filenameExtension;

                byte[] bytes = ReportViewer1.LocalReport.Render("Pdf", null, out mimeType, out encoding, out filenameExtension, out streamids, out warnings);

                //File  
                FileName = "Test_" + ReportName + ".pdf";
                string FilePath = Server.MapPath(@"~\Reports\") + FileName;




                //create and set PdfReader  
                iTextSharp.text.pdf.PdfReader reader = new iTextSharp.text.pdf.PdfReader(bytes);
                FileStream output = new FileStream(FilePath, FileMode.Create);

                // string Agent = HttpContext.Request.Headers["User-Agent"].ToString();  

                //create and set PdfStamper  
                iTextSharp.text.pdf.PdfStamper pdfStamper = new iTextSharp.text.pdf.PdfStamper(reader, output, '0', true);

                //if (Agent.Contains("Firefox"))  
                //  pdfStamper.JavaScript = "var res = app.loaded('var pp = this.getPrintParams();pp.interactive = pp.constants.interactionLevel.full;this.print(pp);');";  
                //else  
                pdfStamper.JavaScript = "var res = app.setTimeOut('var pp = this.getPrintParams();pp.interactive = pp.constants.interactionLevel.full;this.print(pp);', 200);";

                pdfStamper.FormFlattening = false;
                pdfStamper.Close();
                pdfStamper.Dispose();
                reader.Dispose();

                reader.Close();

                if (Session["ProjectName"].ToString() == "SEJ" && ReportName == "CheckListRepNew")
                {
                    string filePath = FilePath;
                    var abd = new FileStream(filePath, FileMode.Open, FileAccess.Read);


                    var streamArray = System.IO.File.ReadAllBytes(filePath);

                    var streamFile = AddPageNumbers(streamArray);




                    // Response.End();
                    // string contentType = "application/pdf";
                    filePath = Server.MapPath(@"~\Reports\CheckListRepNew.pdf");
                    System.IO.File.WriteAllBytes(filePath, streamFile);
                    Response.Redirect(Request.Url.AbsoluteUri.Replace("ReportView", "") + "CheckListRepNew.pdf");
                    abd.Close(); abd.Dispose();

                }
                else
                {
                    Response.Redirect(Request.Url.AbsoluteUri.Replace("ReportView", "") + FileName);
                }
            }
            catch(Exception Ex)
            {

                SendErrorToText(Ex);

            }
            // return File(streamFile, contentType, "CheckListRep.pdf");

            // string FilePath = Server.MapPath("javascript1-sample.pdf");  
            //WebClient User = new WebClient();  
            //Byte[] FileBuffer = User.DownloadData(FilePath);  
            //if (FileBuffer != null)  
            //{  
            //    Response.ContentType = "application/pdf";  
            //    Response.AddHeader("content-length", FileBuffer.Length.ToString());  
            //    Response.BinaryWrite(FileBuffer);  
            //}


            // Page.ClientScript.RegisterStartupScript(this.GetType(),"CallMyFunction","Print()",true);

            // ClientScript.RegisterStartupScript(typeof(Page), "closePage", "window.close();", true);

            //return file path  
            // string FilePathReturn = @"TempFiles/" + FileName;  
            //return Content(FilePathReturn);  


        }


        public static byte[] AddPageNumbers(byte[] pdf)
        {
            MemoryStream ms = new MemoryStream();
            ms.Write(pdf, 0, pdf.Length);
            // we create a reader for a certain document
            PdfReader reader = new PdfReader(pdf);
            // we retrieve the total number of pages
            int n = reader.NumberOfPages;
            // we retrieve the size of the first page
            iTextSharp.text.Rectangle psize = reader.GetPageSize(1);

            // step 1: creation of a document-object
            Document document = new Document(psize, 50, 50, 50, 50);
            // step 2: we create a writer that listens to the document
            PdfWriter writer = PdfWriter.GetInstance(document, ms);
            // step 3: we open the document

            document.Open();
            // step 4: we add content
            PdfContentByte cb = writer.DirectContent;



            int p = 0;
            Console.WriteLine("There are " + n + " pages in the document.");

            for (int page = 1; page <= reader.NumberOfPages; page++)
            {

                document.NewPage();
                p++;
                PdfImportedPage importedPage = writer.GetImportedPage(reader, page);

                cb.AddTemplate(importedPage, 0, 0);
                if (page == reader.NumberOfPages)
                {
                    BaseFont bf = BaseFont.CreateFont(BaseFont.HELVETICA, BaseFont.CP1252, BaseFont.NOT_EMBEDDED);
                    cb.BeginText();
                    cb.SetFontAndSize(bf, 8);

                    cb.ShowTextAligned(PdfContents.STRING, "comments _________________________________________________________________________________________________________________ ", 20, 100, 0);
                    cb.ShowTextAligned(PdfContents.STRING, "SFA Approvals etc.", 20,90, 0);
                    cb.ShowTextAligned(PdfContents.STRING, "________________________________                                                                                  _________________________________________________", 20, 70, 0);
                    cb.ShowTextAligned(PdfContents.STRING, "Approved & Acknowledged By SEJ                                                                                                HalMQ Representative Verification", 20, 60, 0);
                    cb.ShowTextAligned(PdfContents.STRING, "(Name & Signature) / Date", 20, 45, 0);
                    cb.ShowTextAligned(PdfContents.STRING, "Version: 2023.11.1                                                                                                                                      Prepared by : Yvonne Teo", 20, 30, 0);
                    cb.ShowTextAligned(PdfContents.STRING, "Date : " + DateTime.Now.ToString("dd MMM yyyy") + "                                                                                                                                      Authorized by : Charlie Seo", 20, 20, 0);

                    cb.EndText();

                }
            }
            // step 5: we close the document

            document.Close();
            document.Dispose();
            ms.Close();
            ms.Flush();
            ms.Dispose();
            return ms.ToArray();
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
            ReportViewer1.LocalReport.EnableHyperlinks = true;
            ReportViewer1.LocalReport.EnableExternalImages = true;
            // ADDTIONALLY ADDED 16.10.2020 ==============================
            ReportViewer1.KeepSessionAlive = true;
            // ADDTIONALLY ADDED 16.10.2020 ==============================
            ReportViewer1.HyperlinkTarget = "_blank";
            ReportViewer1.LocalReport.DataSources.Add(reportDataSource);

            try
            {
                if (ds.Tables[3].TableName == "Table3")
                {
                    var reportDataSource1 = new ReportDataSource
                    {
                        // Must match the DataSource in the RDLC
                        Name = "DataSet2",
                        Value = ds.Tables[3]
                    };

                    ReportViewer1.LocalReport.DataSources.Add(reportDataSource1);
                }
            }
            catch { }
            // ReportViewer1.LocalReport.Refresh();
            ReportViewer1.DataBind();

            //ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reports/" + ReportName + ".rdlc");
            //ReportViewer1.LocalReport.EnableHyperlinks = true;
            //ReportViewer1.LocalReport.EnableExternalImages = true;
            //ReportViewer1.KeepSessionAlive = true;
            //ReportViewer1.HyperlinkTarget = "_blank";
            //ReportViewer1.LocalReport.DataSources.Clear();
            //ReportDataSource rdc = new ReportDataSource("DataSet1", ds.Tables[2]);
            //ReportViewer1.LocalReport.DataSources.Add(rdc);
            //ReportViewer1.LocalReport.Refresh();
            //ReportViewer1.DataBind();



        }
        private void LoadReport1()
        {
            try
            {

            }
            catch (Exception ex)
            {

                throw ex;
            }
            string constr = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
            var qry = Session["ReportDatasetQry"].ToString();
            DataSet ds = new DataSet();
            SqlConnection con = new SqlConnection(constr);
            con.Open();
            //Query = "Declare @AgentID varchar(50); if  'AZU'='ALL' Set @AgentID= '%' else Set @AgentID=concat('AZU','%') ; SELECT Item.Description as ItemName, StockOrder.StockNo, StockOrder.OrdDt as StockDt, dbo.fn_UOM_Description(StockOrderItem.ItemNo, IsNull(StockOrderItem.Qty,0)* UOM.BaseQty) as Status, StockOrder.AgentID as AgentId, StockOrderItem.ItemNo, StockOrderItem.UOM, StockOrderItem.Qty FROM StockOrder, StockOrderItem, Item, UOM,SalesManGroup Where SalesManGroup.GroupID=StockOrder.AgentID and SalesManGroup.UserID='admin' and StockOrder.StockNo = StockOrderItem.StockNo and StockOrderItem.ItemNo = Item.ItemNo  and StockOrderItem.ItemNo=UOM.ItemNo and StockOrderItem.UOM=UOM.UOM and convert(date,OrdDt) = '2018-10-26'  and StockOrder.AgentID like @AgentID  order by Item.ItemNo";
            SqlDataAdapter da = new SqlDataAdapter(qry, con);
            da.SelectCommand.CommandTimeout = 3600;// 600;  //30*60=1800 // 60- seconds
            da.Fill(ds);
            con.Close();

            //Session["ReportDataset"] = ds.Copy();
            //DataSet ds = new DataSet();
            //ds =  Session["ReportDatasetQry"];

            string ReportName = "";

            if (ds.Tables[1].Rows.Count > 0)
            {
                //ReportName = ds.Tables[1].Rows[0]["ReportName"].ToString();
            }

            var reportDataSource = new ReportDataSource
            {
                // Must match the DataSource in the RDLC
                Name = "DataSet1",
                Value = ds.Tables[2]
            };

            ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "alertMessage", "alert('Record Inserted Successfully')", true);

            ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/Reports/" + ReportName + ".rdlc");
            ReportViewer1.LocalReport.EnableHyperlinks = true;
            ReportViewer1.LocalReport.EnableExternalImages = true;
            // ADDTIONALLY ADDED 16.10.2020 ==============================
            ReportViewer1.KeepSessionAlive = true;
            // ADDTIONALLY ADDED 16.10.2020 ==============================
            ReportViewer1.HyperlinkTarget = "_blank";
            ReportViewer1.LocalReport.DataSources.Add(reportDataSource);

            ReportViewer1.DataBind();
        }
        protected void ReportViewer1_PageNavigation(object sender, PageNavigationEventArgs e)
        {

        }



        protected void Page_Unload(object sender, EventArgs e)
        {
            ReportViewer1.Dispose();
            ReportViewer1 = null;
            //string FilePath = Server.MapPath(@"~\Reports\") + FileName;
            //File.Delete(FilePath);
        }


        public  void SendErrorToText(Exception ex)
        {
            var line = Environment.NewLine + Environment.NewLine;
            String ErrorlineNo, Errormsg, extype, exurl, hostIp,ErrorLocation;

            ErrorlineNo = ex.StackTrace.Substring(ex.StackTrace.Length - 7, 7);
            Errormsg = ex.GetType().Name.ToString();
            extype = ex.GetType().ToString();
            exurl = Request.Url.ToString();
            ErrorLocation = ex.Message.ToString();

            try
            {
                string filepath = Server.MapPath("~/ViewErrorLogFiles/");  //Text File Path

                if (!Directory.Exists(filepath))
                {
                    Directory.CreateDirectory(filepath);

                }
                filepath = filepath + DateTime.Today.ToString("dd-MM-yy") + ".txt";   //Text File Name
                if (!File.Exists(filepath))
                {


                    File.Create(filepath).Dispose();

                }
                using (StreamWriter sw = File.AppendText(filepath))
                {
                    string error = "Log Written Date:" + " " + DateTime.Now.ToString() + line + "Error Line No :" + " " + ErrorlineNo + line + "Error Message:" + " " + Errormsg + line + "Exception Type:" + " " + extype + line + "Error Location :" + " " + ErrorLocation + line + " Error Page Url:" + " " + exurl + line;
                    sw.WriteLine("-----------Exception Details on " + " " + DateTime.Now.ToString() + "-----------------");
                    sw.WriteLine("-------------------------------------------------------------------------------------");
                    sw.WriteLine(line);
                    sw.WriteLine(error);
                    sw.WriteLine("--------------------------------*End*------------------------------------------");
                    sw.WriteLine(line);
                    sw.Flush();
                    sw.Close();

                }

            }
            catch (Exception e)
            {
                e.ToString();

            }
        }

    </script>

</head>
<body>
    <form id="form1" runat="server">
        
        <div style="width: 99%; overflow-x: scroll">
            <asp:ScriptManager ID="ScriptManager1" runat="server" EnablePageMethods="true"></asp:ScriptManager>
            <rsweb:ReportViewer ID="ReportViewer1" runat="server" KeepSessionAlive="true" AsyncRendering="False" SizeToReportContent="true" PageCountMode="Actual" OnPageNavigation="ReportViewer1_PageNavigation" InteractivityPostBackMode="AlwaysSynchronous" Width="644px"></rsweb:ReportViewer>

            <%--<rsweb:ReportViewer ID="ReportViewer1" runat="server" AsyncRendering="False" SizeToReportContent="true" PageCountMode="Actual" OnPageNavigation="ReportViewer1_PageNavigation" InteractivityPostBackMode="AlwaysSynchronous" Width="644px"></rsweb:ReportViewer>--%>
        </div>
    </form>
   

</body>
</html>
