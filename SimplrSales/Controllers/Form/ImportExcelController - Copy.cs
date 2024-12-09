using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.OleDb;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;

using OfficeOpenXml;
using SimplrSales.Repository;
using System.Data.SqlClient;


namespace SimplrSales.Controllers.Form
{
    public class ImportExcelController : Controller
    {
        //
        // GET: /ImportExcel/

        private SqlConnection con, con1;
        public DataRow dr;

        //To Handle connection related activities
        private void connection()
        {
            string constr = ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString();
            con = new SqlConnection(constr);
            con1 = new SqlConnection(constr);
        }

        public ActionResult Index()
        {
            return View();
        }


        private DataSet ConvertExcelToDataset(string fileLocation, string tableName)
        {
            var ds = new DataSet();
            FileInfo f = new FileInfo(fileLocation);
            var excelPackage = new ExcelPackage(f);
            string[] splitValue = tableName.Split(',');

            for (int count = 0; count < splitValue.Length; count++)
            {
                tableName = splitValue[count].Replace("'", string.Empty).Trim();
                System.Diagnostics.Debug.WriteLine(tableName);
                var dt = new DataTable(tableName);
                var ws = excelPackage.Workbook.Worksheets[tableName];
                var lastrow = ws.Dimension.End.Row;
                var lastcol = ws.Dimension.End.Column;
                for (var row = 1; row <= lastrow; row++)
                {
                    string s = row.ToString() + "\t";
                    var val = "";
                    var dr = dt.NewRow();
                    for (var col = 1; col <= lastcol; col++)
                    {

                        if (ws.Cells[row, col].Text != null)
                        {
                            s += ws.Cells[row, col].Text.Trim() + "\t";
                            val = ws.Cells[row, col].Text.Trim();
                        }
                        else
                        {
                            s += "NULL\t";
                            val = "";
                        }
                        if (row == 1)
                        {
                            if (val != "")
                            {
                                dt.Columns.Add(new DataColumn(val, System.Type.GetType("System.String")));
                            }
                        }
                        else
                        {
                            if (col <= dt.Columns.Count)
                            {
                                dr[col - 1] = val;
                            }
                        }


                    }
                    if (row > 1)
                    {
                        dt.Rows.Add(dr);
                    }
                    System.Diagnostics.Debug.WriteLine(s);
                }
                ds.Tables.Add(dt);
            }

            return ds;
        }


        [HttpPost]
        public ActionResult ExportSQL(HttpPostedFileBase file, string tableName)
        {

            string provider = ConfigurationManager.AppSettings["ExcelProvider"];
            DataSet ds = new DataSet();
            VImportExcelRepository VImportObj = new VImportExcelRepository();
            //var fsr;
            if (tableName == "" || file == null)
            {
                return null;
            }
            if (Request.Files["file"].ContentLength > 0)
            {
                string fileExtension =
                                     System.IO.Path.GetExtension(Request.Files["file"].FileName);

                if (fileExtension == ".xls" || fileExtension == ".xlsx")
                {

                    string FileName = Path.GetFileName(file.FileName);
                    //if (FileName.LastIndexOf("/")>0)
                    //{
                    //    FileName = FileName.Substring(FileName.LastIndexOf("/") + 1);
                    //}
                    //string fileLocation = Server.MapPath("~/") + Request.Files["file"].FileName;
                    string fileLocation = Server.MapPath("~/ImportFiles/") + FileName;


                    byte[] arrayOfMyString = Encoding.UTF8.GetBytes(Request.Files["file"].FileName.ToString());
                    MemoryStream stream = new MemoryStream(arrayOfMyString);
                    var contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                    var fsr = new FileStreamResult(stream, contentType);
                    fsr.FileStream.Dispose();
                    fsr.FileStream.Close();


                    if (System.IO.File.Exists(fileLocation))
                    {
                        System.IO.File.Delete(fileLocation);
                    }

                    Request.Files["file"].SaveAs(fileLocation);



                    string excelConnectionString = string.Empty;
                    //excelConnectionString = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" +
                    //fileLocation + ";Extended Properties=\"Excel 12.0;HDR=Yes;IMEX=2\"";
                    ////connection String for xls file format.
                    //if (fileExtension == ".xls")
                    //{
                    //    excelConnectionString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" +
                    //    fileLocation + ";Extended Properties=\"Excel 8.0;HDR=Yes;IMEX=2\"";
                    //}
                    ////connection String for xlsx file format.
                    //else 
                    //if (fileExtension == ".xlsx")
                    //{
                    if (provider == "OLEDB 12.0")
                    {
                        excelConnectionString = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" +
                        fileLocation + ";Extended Properties=\"Excel 12.0;HDR=Yes;IMEX=2\"";
                    }
                    else if (provider == "OLEDB 16.0")
                    {
                        excelConnectionString = "Provider=Microsoft.ACE.OLEDB.16.0;Data Source=" +
                        fileLocation + ";Extended Properties=\"Excel 16.0;HDR=Yes;IMEX=2\"";
                    }

                    //}

                    //Create Connection to Excel work book and add oledb namespace
                    if (provider == "Epplus")
                    {
                        ds = ConvertExcelToDataset(fileLocation, tableName);
                    }
                    else
                    {
                        OleDbConnection excelConnection = new OleDbConnection(excelConnectionString);
                        excelConnection.Open();
                        DataTable dt = new DataTable();

                        dt = excelConnection.GetOleDbSchemaTable(OleDbSchemaGuid.Tables, null);
                        if (dt == null)
                        {
                            return null;
                        }
                        String[] excelSheets = new String[dt.Rows.Count];
                        int t = 0;
                        //excel data saves in temp file here.
                        foreach (DataRow row in dt.Rows)
                        {
                            excelSheets[t] = row["TABLE_NAME"].ToString();
                            t++;
                        }
                        OleDbConnection excelConnection1 = new OleDbConnection(excelConnectionString);
                        string[] splitValue = tableName.Split(',');

                        for (int count = 0; count < splitValue.Length; count++)
                        {

                            tableName = splitValue[count].Replace("'", string.Empty);
                            var dtTemp = new DataTable(tableName);
                            string table = "Select * from [" + tableName + "$]";
                            //string query = string.Format("Select * from [{0}]", excelSheets[0]);
                            string query = string.Format(table, excelSheets[0]);
                            using (OleDbDataAdapter dataAdapter = new OleDbDataAdapter(query, excelConnection1))
                            {
                                dataAdapter.Fill(dtTemp);
                                ds.Tables.Add(dtTemp);
                            }
                            excelConnection1.Close();
                            excelConnection.Close();

                        }
                    }

                    VImportObj.executeSQL(" Update System set Status='Not Completed' ");
                    VImportObj.insertErrorLog(" Insert into ErrorLog(DTG, FunctionName, CompanyName, ErrorText) values (GetDate(),'Import - DB Connected','','' ) ");

                    //string[] splitValue = tableName.Split(',');
                    var sStartDate = DateTime.Now;
                    var sEndDate = DateTime.Now;

                    foreach (DataTable dt in ds.Tables)
                    {

                        //tableName = tableName.Replace("'", string.Empty);
                        //tableName = splitValue[count].Replace("'", string.Empty);
                        //string table = "Select * from [" + tableName + "$]";
                        ////string query = string.Format("Select * from [{0}]", excelSheets[0]);
                        //string query = string.Format(table, excelSheets[0]);
                        //using (OleDbDataAdapter dataAdapter = new OleDbDataAdapter(query, excelConnection1))
                        //{
                        //    dataAdapter.Fill(ds);
                        //}
                        //excelConnection1.Close();
                        //excelConnection.Close();
                        tableName = dt.TableName;
                        string query = "";
                        VImportExcelRepository ImportObj = new VImportExcelRepository();

                        if (tableName.ToLower() == "pricelistgroup")
                        {
                            // query = " Update Customer set Active = 0 where custNo='aqwe' ";
                            connection();
                            //con.Open();
                            //SqlCommand cmd = new SqlCommand(query, con);
                            //cmd.ExecuteNonQuery();
                            //con.Close();
                            query = "";
                            for (int i = 0; i < ds.Tables[tableName].Rows.Count; i++)
                            {

                                //if (ImportObj.IsCustomerExists(ds.Tables[tableName].Rows[i][0].ToString()) == false)
                                if (ImportObj.IsPriceGroupExists(ds.Tables[tableName].Rows[i][0].ToString()) == false)
                                {
                                    query += "insert into PriceGroup(Code,Description) values('" + ds.Tables[tableName].Rows[i][0].ToString().Replace("'", string.Empty) + "','" + ds.Tables[tableName].Rows[i][1].ToString().Replace("'", string.Empty) + "') \n";
                                }

                                else
                                {
                                    query += " update PriceGroup set Code='" + ds.Tables[tableName].Rows[i][0].ToString().Replace("'", string.Empty) + "' , Description='" + ds.Tables[tableName].Rows[i][1].ToString().Replace("'", string.Empty) + "' where  Code='" + ds.Tables[tableName].Rows[i][0].ToString().Replace("'", string.Empty) + "'  \n";
                                    //  query += " Update Customer Set CustName='" + ds.Tables[tableName].Rows[i][4].ToString().Replace("'", string.Empty) + "',ChineseName = '" + ds.Tables[tableName].Rows[i][4].ToString().Replace("'", string.Empty) + "',SearchName = '" + ds.Tables[tableName].Rows[i][4].ToString().Replace("'", string.Empty) + "', Address = '" + ds.Tables[tableName].Rows[i][5].ToString().Replace("'", string.Empty) + "',PostCode = '" + ds.Tables[tableName].Rows[i][6].ToString() + "',SupplierCode='" + ds.Tables[tableName].Rows[i][2].ToString().Replace("'", string.Empty) + "',ShipName ='" + ds.Tables[tableName].Rows[i][4].ToString().Replace("'", string.Empty) + "', ShipAddr ='',Active = '" + iActive + "', ToPDA=1, CustType ='" + ds.Tables[tableName].Rows[i][3].ToString().Replace("'", string.Empty) + "', Location ='" + ds.Tables[tableName].Rows[i][1].ToString().Replace("'", string.Empty) + "' Where CustNo= '" + ds.Tables[tableName].Rows[i][0].ToString() + "' ;  ";
                                }

                            }
                            con.Open();
                            SqlCommand cmd = new SqlCommand(query, con);
                            cmd.ExecuteNonQuery();
                            con.Close();

                            ImportObj.insertErrorLog(" Insert into ErrorLog(DTG, FunctionName, CompanyName, ErrorText) values (GetDate(),'Store Master Imported','','' ) ");
                        }

                        else if (tableName.ToLower() == "channel")
                        {
                            query = "";
                            for (int i = 0; i < ds.Tables[tableName].Rows.Count; i++)
                            {
                                if (ImportObj.IsChannelExists(ds.Tables[tableName].Rows[i][0].ToString()) == false)
                                {
                                    query += "Insert into Channel(Code, Description, StartDate, EndDate ) Values ('" + ds.Tables[tableName].Rows[i][0].ToString().Replace("'", string.Empty) + "','" + ds.Tables[tableName].Rows[i][1].ToString().Replace("'", string.Empty) + "','" + sStartDate.ToString("yyyy-MM-dd hh:mm:ss") + "' ,'" + sEndDate.ToString("yyyy-MM-dd hh:mm:ss") + "')  \n";
                                }
                                else
                                {
                                    query += "update Channel set Code='" + ds.Tables[tableName].Rows[i][0].ToString().Replace("'", string.Empty) + "', Description='" + ds.Tables[tableName].Rows[i][1].ToString().Replace("'", string.Empty) + "', StartDate='" + sStartDate.ToString("yyyy-MM-dd hh:mm:ss") + "', EndDate ='" + sEndDate.ToString("yyyy-MM-dd hh:mm:ss") + "' where  Code='" + ds.Tables[tableName].Rows[i][0].ToString().Replace("'", string.Empty) + "' \n";
                                }
                            }

                            connection();
                            con.Open();
                            SqlCommand cmd = new SqlCommand(query, con);
                            cmd.ExecuteNonQuery();
                            con.Close();

                        }

                        else if (tableName.ToLower() == "pricelistgroup")
                        {
                            connection();
                            query = "";
                            for (int i = 0; i < ds.Tables[tableName].Rows.Count; i++)
                            {

                                if (ImportObj.IsCustomerExists(ds.Tables[tableName].Rows[i][0].ToString()) == false)
                                {
                                    query += " insert into Customer(CustNo, CustName, ChineseName, Address, Address2, Address3,";
                                    query += " Address4, PostCode, City, CountryCode,GSTType, Phone,";
                                    query += "ContactPerson, Balance, CreditLimit, PriceGroup, PaymentTerms, ";
                                    query += "OutletType,Channel,SubChannel,ParentCode,JSUSalesOffice,IsParent,EWT,";
                                    query += "AllowCash,AllowMaxDtdChk,AllowPDC,AllowFT,";
                                    query += "PaymentMethod, SalesAgent, Active, ToPDA, DTG,StockTakeRequired,GSTNO,DiscountGroup,Latitude,Longitude)values('" + ds.Tables[tableName].Rows[i][1].ToString().Replace("'", string.Empty) + "',";
                                    query += "'" + ds.Tables[tableName].Rows[i][2].ToString().Replace("'", string.Empty) + "',";
                                    query += "'" + ds.Tables[tableName].Rows[i][3].ToString().Replace("'", string.Empty) + "',";
                                    query += "'" + ds.Tables[tableName].Rows[i][4].ToString().Replace("'", string.Empty) + "',";
                                    query += "'',";
                                    query += "'" + ds.Tables[tableName].Rows[i][5].ToString().Replace("'", string.Empty) + "',";
                                    query += "'" + ds.Tables[tableName].Rows[i][9].ToString().Replace("'", string.Empty) + "',";
                                    query += "'" + ds.Tables[tableName].Rows[i][11].ToString().Replace("'", string.Empty) + "',";
                                    query += "'" + ds.Tables[tableName].Rows[i][7].ToString().Replace("'", string.Empty) + "',";
                                    query += "'Philippines',";
                                    query += "'Inclusive',";
                                    query += "'" + ds.Tables[tableName].Rows[i][17].ToString().Replace("'", string.Empty) + "',";
                                    //query += "CONCAT('" + ds.Tables[tableName].Rows[i][14].ToString().Replace("'", string.Empty) + "','',";
                                    //query += "'" + ds.Tables[tableName].Rows[i][15].ToString().Replace("'", string.Empty) + "'),";
                                    query += "'" + ds.Tables[tableName].Rows[i][14].ToString().Replace("'", string.Empty) + " " + ds.Tables[tableName].Rows[i][15].ToString().Replace("'", string.Empty) + "',";
                                    query += "'0',";
                                    query += "'" + ds.Tables[tableName].Rows[i][32].ToString().Replace("'", string.Empty) + "' ,";
                                    query += "'" + ds.Tables[tableName].Rows[i][39].ToString().Replace("'", string.Empty) + "' ,";
                                    query += "'" + ds.Tables[tableName].Rows[i][31].ToString().Replace("'", string.Empty) + "' ,";
                                    query += "'" + ds.Tables[tableName].Rows[i][23].ToString().Replace("'", string.Empty) + "' ,";
                                    query += "'" + ds.Tables[tableName].Rows[i][21].ToString().Replace("'", string.Empty) + "' ,";
                                    query += "'" + ds.Tables[tableName].Rows[i][22].ToString().Replace("'", string.Empty) + "' ,";
                                    query += "'" + ds.Tables[tableName].Rows[i][20].ToString().Replace("'", string.Empty) + "' ,";
                                    query += "'" + ds.Tables[tableName].Rows[i][49].ToString().Replace("'", string.Empty) + "' ,";
                                    query += "'" + ds.Tables[tableName].Rows[i][19].ToString().Replace("'", string.Empty) + "' ,";
                                    query += "'" + ds.Tables[tableName].Rows[i][34].ToString().Replace("'", string.Empty) + "' ,";
                                    query += "'" + ds.Tables[tableName].Rows[i][24].ToString().Replace("'", string.Empty) + "' ,";
                                    query += "'" + ds.Tables[tableName].Rows[i][26].ToString().Replace("'", string.Empty) + "' ,";
                                    query += "'" + ds.Tables[tableName].Rows[i][27].ToString().Replace("'", string.Empty) + "' ,";
                                    query += "'" + ds.Tables[tableName].Rows[i][28].ToString().Replace("'", string.Empty) + "' ,";
                                    query += "'" + ds.Tables[tableName].Rows[i][29].ToString().Replace("'", string.Empty) + "' ,";
                                    query += "'" + ds.Tables[tableName].Rows[i][45].ToString().Replace("'", string.Empty) + "' ,";
                                    query += "'1',	";
                                    query += "'1',";
                                    query += "'getdate()',";
                                    query += "'1',";
                                    query += "'" + ds.Tables[tableName].Rows[i][30].ToString().Replace("'", string.Empty) + "',";
                                    //query += "'" + ds.Tables[tableName].Rows[i][35].ToString().Replace("'", string.Empty) + "'),'+''" + ds.Tables[tableName].Rows[i][36].ToString().Replace("'", string.Empty) + "'),";
                                    query += "'" + ds.Tables[tableName].Rows[i][35].ToString().Replace("'", string.Empty) + " " + ds.Tables[tableName].Rows[i][36].ToString().Replace("'", string.Empty) + "',";
                                    query += "'" + ds.Tables[tableName].Rows[i][13].ToString().Replace("'", string.Empty) + "',";
                                    query += "'" + ds.Tables[tableName].Rows[i][12].ToString().Replace("'", string.Empty) + "') \n";
                                }

                                else
                                {
                                    query += " update PriceGroup set Code='" + ds.Tables[tableName].Rows[i][0].ToString().Replace("'", string.Empty) + "' , Description='" + ds.Tables[tableName].Rows[i][1].ToString().Replace("'", string.Empty) + "' where  Code='" + ds.Tables[tableName].Rows[i][0].ToString().Replace("'", string.Empty) + "'  \n";
                                    //  query += " Update Customer Set CustName='" + ds.Tables[tableName].Rows[i][4].ToString().Replace("'", string.Empty) + "',ChineseName = '" + ds.Tables[tableName].Rows[i][4].ToString().Replace("'", string.Empty) + "',SearchName = '" + ds.Tables[tableName].Rows[i][4].ToString().Replace("'", string.Empty) + "', Address = '" + ds.Tables[tableName].Rows[i][5].ToString().Replace("'", string.Empty) + "',PostCode = '" + ds.Tables[tableName].Rows[i][6].ToString() + "',SupplierCode='" + ds.Tables[tableName].Rows[i][2].ToString().Replace("'", string.Empty) + "',ShipName ='" + ds.Tables[tableName].Rows[i][4].ToString().Replace("'", string.Empty) + "', ShipAddr ='',Active = '" + iActive + "', ToPDA=1, CustType ='" + ds.Tables[tableName].Rows[i][3].ToString().Replace("'", string.Empty) + "', Location ='" + ds.Tables[tableName].Rows[i][1].ToString().Replace("'", string.Empty) + "' Where CustNo= '" + ds.Tables[tableName].Rows[i][0].ToString() + "' ;  ";
                                }

                            }
                            con.Open();
                            SqlCommand cmd = new SqlCommand(query, con);
                            cmd.ExecuteNonQuery();
                            con.Close();

                            ImportObj.insertErrorLog(" Insert into ErrorLog(DTG, FunctionName, CompanyName, ErrorText) values (GetDate(),'Store Master Imported','','' ) ");
                        }

                        else if (tableName.ToLower() == "focussku")
                        {
                            connection();
                            query = "";
                            for (int i = 0; i < ds.Tables[tableName].Rows.Count; i++)
                            {
                                //sYear, strMonth, sChannelCode, sItemCode
                                if (ImportObj.isFocusSKUExists(ds.Tables[tableName].Rows[i][1].ToString().Replace("'", string.Empty), ds.Tables[tableName].Rows[i][2].ToString().Replace("'", string.Empty), ds.Tables[tableName].Rows[i][3].ToString().Replace("'", string.Empty), ds.Tables[tableName].Rows[i][4].ToString().Replace("'", string.Empty)) == false)
                                {
                                    query += "into IOM(Channel, ItemID,IOM_Month,IOM_Year)";
                                    query += "Values ('" + ds.Tables[tableName].Rows[i][3].ToString().Replace("'", string.Empty) + "',";
                                    query += "'" + ds.Tables[tableName].Rows[i][4].ToString().Replace("'", string.Empty) + "',";
                                    query += "'" + ds.Tables[tableName].Rows[i][2].ToString().Replace("'", string.Empty) + "',";
                                    query += "'" + ds.Tables[tableName].Rows[i][1].ToString().Replace("'", string.Empty) + "') \n";
                                }
                                else
                                {
                                    //query += " update PriceGroup set Code='" + ds.Tables[tableName].Rows[i][0].ToString().Replace("'", string.Empty) + "' , Description='" + ds.Tables[tableName].Rows[i][1].ToString().Replace("'", string.Empty) + "' where  Code='" + ds.Tables[tableName].Rows[i][0].ToString().Replace("'", string.Empty) + "'  \n";
                                }

                            }
                            con.Open();
                            SqlCommand cmd = new SqlCommand(query, con);
                            cmd.ExecuteNonQuery();
                            con.Close();

                            ImportObj.insertErrorLog(" Insert into ErrorLog(DTG, FunctionName, CompanyName, ErrorText) values (GetDate(),'Store Master Imported','','' ) ");
                        }
                        else if (tableName.ToLower() == "mustcarryitem")
                        {
                            connection();
                            query = "";
                            for (int i = 0; i < ds.Tables[tableName].Rows.Count; i++)
                            {
                                if (ImportObj.isFocusSKUExists(ds.Tables[tableName].Rows[i][1].ToString().Replace("'", string.Empty), ds.Tables[tableName].Rows[i][2].ToString().Replace("'", string.Empty), ds.Tables[tableName].Rows[i][3].ToString().Replace("'", string.Empty), ds.Tables[tableName].Rows[i][4].ToString().Replace("'", string.Empty)) == false)
                                {
                                    query += "Inser into DistributorSpecialItems(DistributorID, ChannelCode,ItemNo) ";
                                    query += "Values ('" + ds.Tables[tableName].Rows[i][0].ToString().Replace("'", string.Empty) + "',";
                                    query += "'" + ds.Tables[tableName].Rows[i][1].ToString().Replace("'", string.Empty) + "',";
                                    query += "'" + ds.Tables[tableName].Rows[i][2].ToString().Replace("'", string.Empty) + "'\n";
                                }
                                else
                                {
                                    //query += " update PriceGroup set Code='" + ds.Tables[tableName].Rows[i][0].ToString().Replace("'", string.Empty) + "' , Description='" + ds.Tables[tableName].Rows[i][1].ToString().Replace("'", string.Empty) + "' where  Code='" + ds.Tables[tableName].Rows[i][0].ToString().Replace("'", string.Empty) + "'  \n";
                                }

                            }
                            con.Open();
                            SqlCommand cmd = new SqlCommand(query, con);
                            cmd.ExecuteNonQuery();
                            con.Close();

                            ImportObj.insertErrorLog(" Insert into ErrorLog(DTG, FunctionName, CompanyName, ErrorText) values (GetDate(),'Store Master Imported','','' ) ");
                        }
                        else if (tableName.ToLower() == "outlettype")
                        {
                            connection();
                            query = "";
                            for (int i = 0; i < ds.Tables[tableName].Rows.Count; i++)
                            {
                                if (ImportObj.IsOutletTypeExists(ds.Tables[tableName].Rows[i][0].ToString().Replace("'", string.Empty)) == false)
                                {
                                    query += "Insert into OutletType(Code, Description) ";
                                    query += "Values ('" + ds.Tables[tableName].Rows[i][0].ToString().Replace("'", string.Empty) + "',";
                                    query += "'" + ds.Tables[tableName].Rows[i][1].ToString().Replace("'", string.Empty) + "')\n";
                                }
                                else
                                {
                                    //query += " update PriceGroup set Code='" + ds.Tables[tableName].Rows[i][0].ToString().Replace("'", string.Empty) + "' , Description='" + ds.Tables[tableName].Rows[i][1].ToString().Replace("'", string.Empty) + "' where  Code='" + ds.Tables[tableName].Rows[i][0].ToString().Replace("'", string.Empty) + "'  \n";
                                }

                            }
                            con.Open();
                            SqlCommand cmd = new SqlCommand(query, con);
                            cmd.ExecuteNonQuery();
                            con.Close();

                            ImportObj.insertErrorLog(" Insert into ErrorLog(DTG, FunctionName, CompanyName, ErrorText) values (GetDate(),'Store Master Imported','','' ) ");
                        }

                        else if (tableName.ToLower() == "subchannel")
                        {
                            connection();
                            query = "";
                            for (int i = 0; i < ds.Tables[tableName].Rows.Count; i++)
                            {
                                if (ImportObj.IsSubChannelExists(ds.Tables[tableName].Rows[i][0].ToString().Replace("'", string.Empty)) == false)
                                {
                                    query += "Insert into SubChannel(Code, Description, ChCode,DisplayNo ) ";
                                    query += "Values ('" + ds.Tables[tableName].Rows[i][0].ToString().Replace("'", string.Empty) + "',";
                                    query += "'" + ds.Tables[tableName].Rows[i][1].ToString().Replace("'", string.Empty) + "',";
                                    query += "'" + ds.Tables[tableName].Rows[i][2].ToString().Replace("'", string.Empty) + "',";
                                    query += "'" + ds.Tables[tableName].Rows[i][3].ToString().Replace("'", string.Empty) + "') \n ";

                                }
                                else
                                {
                                    //query += " update PriceGroup set Code='" + ds.Tables[tableName].Rows[i][0].ToString().Replace("'", string.Empty) + "' , Description='" + ds.Tables[tableName].Rows[i][1].ToString().Replace("'", string.Empty) + "' where  Code='" + ds.Tables[tableName].Rows[i][0].ToString().Replace("'", string.Empty) + "'  \n";
                                }

                            }
                            con.Open();
                            SqlCommand cmd = new SqlCommand(query, con);
                            cmd.ExecuteNonQuery();
                            con.Close();

                            ImportObj.insertErrorLog(" Insert into ErrorLog(DTG, FunctionName, CompanyName, ErrorText) values (GetDate(),'Store Master Imported','','' ) ");
                        }
                        else if (tableName.ToLower() == "salesterritory")
                        {
                            connection();
                            query = "";
                            for (int i = 0; i < ds.Tables[tableName].Rows.Count; i++)
                            {
                                //string TgtMonth, string BrandName, string Territory
                                if (ImportObj.IsSalesTerritoryTgtExists(ds.Tables[tableName].Rows[i][0].ToString().Replace("'", string.Empty), ds.Tables[tableName].Rows[i][1].ToString().Replace("'", string.Empty), ds.Tables[tableName].Rows[i][1].ToString().Replace("'", string.Empty)) == false)
                                {
                                    query += "Insert into SalesTerritoryTarget(TargetMonth,TerritoryCode,Category,Brand,TargetQty,Pricefactor)";
                                    query += "values('" + ds.Tables[tableName].Rows[i][0].ToString().Replace("'", string.Empty) + "',";
                                    query += "'" + ds.Tables[tableName].Rows[i][1].ToString().Replace("'", string.Empty) + "',";
                                    query += "'" + ds.Tables[tableName].Rows[i][2].ToString().Replace("'", string.Empty) + "',";
                                    query += "'',";
                                    query += "'" + ds.Tables[tableName].Rows[i][3].ToString().Replace("'", string.Empty) + "',";
                                    query += "'" + ds.Tables[tableName].Rows[i][4].ToString().Replace("'", string.Empty) + "') \n";
                                }
                                else
                                {
                                    //query += " update PriceGroup set Code='" + ds.Tables[tableName].Rows[i][0].ToString().Replace("'", string.Empty) + "' , Description='" + ds.Tables[tableName].Rows[i][1].ToString().Replace("'", string.Empty) + "' where  Code='" + ds.Tables[tableName].Rows[i][0].ToString().Replace("'", string.Empty) + "'  \n";
                                }

                            }
                            con.Open();
                            SqlCommand cmd = new SqlCommand(query, con);
                            cmd.ExecuteNonQuery();
                            con.Close();

                            ImportObj.insertErrorLog(" Insert into ErrorLog(DTG, FunctionName, CompanyName, ErrorText) values (GetDate(),'Store Master Imported','','' ) ");
                        }

                        else if (tableName.ToLower() == "routeplan")
                        {
                            connection();
                            query = "";
                            for (int i = 0; i < ds.Tables[tableName].Rows.Count; i++)
                            {
                                if (ImportObj.IsRoutePlanExists(ds.Tables[tableName].Rows[i][0].ToString().Replace("'", string.Empty)) == false)
                                {
                                    query += "Insert into RouteMaster(RouteNo, RouteName, VehicleNo, RouteDay, RouteWeek, DTG)";
                                    query += "values('" + ds.Tables[tableName].Rows[i][0].ToString().Replace("'", string.Empty) + "',";
                                    query += "'" + ds.Tables[tableName].Rows[i][1].ToString().Replace("'", string.Empty) + "',";
                                    query += "'',";
                                    query += "'" + ds.Tables[tableName].Rows[i][3].ToString().Replace("'", string.Empty) + "',";
                                    query += "'" + ds.Tables[tableName].Rows[i][4].ToString().Replace("'", string.Empty) + "',";
                                    query += "getdate()) \n";
                                }

                                //if (((IsDBNull(dgvData.Item[6, icnt].Value) == false)      && (dgvData.Item[6, icnt].Value.ToString != "")))
                                //{
                                //    string StopNo = dgvData.Item[6, icnt].Value.ToString.Trim;
                                //    StopNo = StopNo.Replace('\0', "");
                                //    if ((sSimplrCustNO != ""))
                                //    {
                                //        if (IsRouteDetExists(routeNo, sSimplrCustNO))
                                //        {
                                //            sSql = ("Update RouteDet set StopNo ="
                                //                        + (objDO.SafeSQL(StopNo) + (" where RouteNo = "
                                //                        + (objDO.SafeSQL(routeNo) + (" and CustNo=" + objDO.SafeSQL(sSimplrCustNO))))));
                                //            System.IO.File.AppendAllText((Application.StartupPath + "\\ErrorLog.txt"), ("Import RouteDet: "
                                //                            + (sSql + "\r\n")));
                                //            objDO.ExecuteSQL(sSql);
                                //        }
                                //        else
                                //        {
                                //            sSql = ("Insert into RouteDet(RouteNo, CustNO, StopNo, DTG) Values ("
                                //                        + (objDO.SafeSQL(routeNo) + (","
                                //                        + (objDO.SafeSQL(sSimplrCustNO) + (","
                                //                        + (objDO.SafeSQL(StopNo) + ",getdate())"))))));
                                //            System.IO.File.AppendAllText((Application.StartupPath + "\\ErrorLog.txt"), ("Import RouteDet: "
                                //                            + (sSql + "\r\n")));
                                //            objDO.ExecuteSQL(sSql);
                                //        }
                                //    }
                                //}


                                else
                                {
                                    //query += " update PriceGroup set Code='" + ds.Tables[tableName].Rows[i][0].ToString().Replace("'", string.Empty) + "' , Description='" + ds.Tables[tableName].Rows[i][1].ToString().Replace("'", string.Empty) + "' where  Code='" + ds.Tables[tableName].Rows[i][0].ToString().Replace("'", string.Empty) + "'  \n";
                                }

                            }
                            con.Open();
                            SqlCommand cmd = new SqlCommand(query, con);
                            cmd.ExecuteNonQuery();
                            con.Close();

                            ImportObj.insertErrorLog(" Insert into ErrorLog(DTG, FunctionName, CompanyName, ErrorText) values (GetDate(),'Store Master Imported','','' ) ");
                        }

                        else if (tableName.ToLower() == "vehicle")
                        {
                            connection();
                            query = "";
                            for (int i = 0; i < ds.Tables[tableName].Rows.Count; i++)
                            {
                                if (ImportObj.IsVehicleExists(ds.Tables[tableName].Rows[i][0].ToString().Replace("'", string.Empty)) == false)
                                {
                                    query += "Insert into Vehicle(Code, Description, Branch,Tonnage,Length,Width,Height,IsBuffer )";
                                    query += "Values ('" + ds.Tables[tableName].Rows[i][0].ToString().Replace("'", string.Empty) + "',";
                                    query += "'" + ds.Tables[tableName].Rows[i][1].ToString().Replace("'", string.Empty) + "',";
                                    query += "'',";
                                    query += "'" + ds.Tables[tableName].Rows[i][3].ToString().Replace("'", string.Empty) + "',";
                                    query += "'" + ds.Tables[tableName].Rows[i][4].ToString().Replace("'", string.Empty) + "',";
                                    query += "'" + ds.Tables[tableName].Rows[i][5].ToString().Replace("'", string.Empty) + "',";
                                    query += "'" + ds.Tables[tableName].Rows[i][6].ToString().Replace("'", string.Empty) + "',";
                                    query += "'" + ds.Tables[tableName].Rows[i][7].ToString().Replace("'", string.Empty) + "')\n";
                                }
                                else
                                {
                                    //query += " update PriceGroup set Code='" + ds.Tables[tableName].Rows[i][0].ToString().Replace("'", string.Empty) + "' , Description='" + ds.Tables[tableName].Rows[i][1].ToString().Replace("'", string.Empty) + "' where  Code='" + ds.Tables[tableName].Rows[i][0].ToString().Replace("'", string.Empty) + "'  \n";
                                }

                            }
                            con.Open();
                            SqlCommand cmd = new SqlCommand(query, con);
                            cmd.ExecuteNonQuery();
                            con.Close();

                            ImportObj.insertErrorLog(" Insert into ErrorLog(DTG, FunctionName, CompanyName, ErrorText) values (GetDate(),'Store Master Imported','','' ) ");
                        }

                        else if (tableName.ToLower() == "distributorItem")
                        {
                            connection();
                            query = "";
                            for (int i = 0; i < ds.Tables[tableName].Rows.Count; i++)
                            {
                                if (ImportObj.IsDistrItemExists(ds.Tables[tableName].Rows[i][2].ToString().Replace("'", string.Empty), ds.Tables[tableName].Rows[i][0].ToString().Replace("'", string.Empty)) == false)
                                {
                                    query += "Insert into DistributorItem(ItemNo, DisplayNo, DistributorID , Active, DTG)";
                                    query += "values('" + ds.Tables[tableName].Rows[i][1].ToString().Replace("'", string.Empty) + "',";
                                    query += "'" + ds.Tables[tableName].Rows[i][2].ToString().Replace("'", string.Empty) + "',";
                                    query += "'" + ds.Tables[tableName].Rows[i][0].ToString().Replace("'", string.Empty) + "',";
                                    query += "'1',";
                                    query += "getdate()) \n";
                                }
                                else
                                {
                                    //query += " update PriceGroup set Code='" + ds.Tables[tableName].Rows[i][0].ToString().Replace("'", string.Empty) + "' , Description='" + ds.Tables[tableName].Rows[i][1].ToString().Replace("'", string.Empty) + "' where  Code='" + ds.Tables[tableName].Rows[i][0].ToString().Replace("'", string.Empty) + "'  \n";
                                }

                            }
                            con.Open();
                            SqlCommand cmd = new SqlCommand(query, con);
                            cmd.ExecuteNonQuery();
                            con.Close();

                            ImportObj.insertErrorLog(" Insert into ErrorLog(DTG, FunctionName, CompanyName, ErrorText) values (GetDate(),'Store Master Imported','','' ) ");
                        }

                        else if (tableName.ToLower() == "distributor")
                        {
                            connection();
                            query = "";
                            for (int i = 0; i < ds.Tables[tableName].Rows.Count; i++)
                            {
                                if (ImportObj.IsDistributorExists(ds.Tables[tableName].Rows[i][0].ToString().Replace("'", string.Empty)) == false)
                                {
                                    query += "Insert into Distributor(DistributorID,DistributorName, DisplayNo,Active,DTG)";
                                    query += "values('" + ds.Tables[tableName].Rows[i][3].ToString().Replace("'", string.Empty) + "',";
                                    query += "'" + ds.Tables[tableName].Rows[i][6].ToString().Replace("'", string.Empty) + "',";
                                    query += "'" + ds.Tables[tableName].Rows[i][5].ToString().Replace("'", string.Empty) + "',";
                                    query += "'1',"; query += "Insert into CrossReference(ThirdParty,CrossReferenceType, SimplrCode,ThirdPartyCode)";
                                    query += "values('JSU',";
                                    query += "'DISTRIBUTOR',";
                                    query += "'" + ds.Tables[tableName].Rows[i][3].ToString().Replace("'", string.Empty) + "',";
                                    query += "'" + ds.Tables[tableName].Rows[i][4].ToString().Replace("'", string.Empty) + "'S ";
                                    query += "getdate()) \n";
                                }
                                else
                                {
                                    //query += " update PriceGroup set Code='" + ds.Tables[tableName].Rows[i][0].ToString().Replace("'", string.Empty) + "' , Description='" + ds.Tables[tableName].Rows[i][1].ToString().Replace("'", string.Empty) + "' where  Code='" + ds.Tables[tableName].Rows[i][0].ToString().Replace("'", string.Empty) + "'  \n";
                                }

                            }
                            con.Open();
                            SqlCommand cmd = new SqlCommand(query, con);
                            cmd.ExecuteNonQuery();
                            con.Close();

                            ImportObj.insertErrorLog(" Insert into ErrorLog(DTG, FunctionName, CompanyName, ErrorText) values (GetDate(),'Store Master Imported','','' ) ");
                        }
                        else if (tableName.ToLower() == "employee")
                        {
                            connection();
                            query = "";
                            for (int i = 0; i < ds.Tables[tableName].Rows.Count; i++)
                            {
                                var sEmployeeType = ds.Tables[tableName].Rows[i][7].ToString().Replace("'", string.Empty);
                                var sAccessLevel = ImportObj.getAccessLevel(sEmployeeType);
                                var IsSupervisor = 0;

                                var sGeoTreeType = ds.Tables[tableName].Rows[i][4].ToString().Replace("'", string.Empty);
                                sGeoTreeType = sGeoTreeType.Replace(" ", "");
                                if ((sGeoTreeType == "SALES TERRITORY"))
                                {
                                    IsSupervisor = 0;
                                }
                                else
                                {
                                    IsSupervisor = 1;
                                }

                                if (ImportObj.IsAgentExists(ds.Tables[tableName].Rows[i][0].ToString().Replace("'", string.Empty)) == false)
                                {
                                    query += "Insert into SalesAgent(Code, Name, Access, Password,CustNo,Email,phone,Active, USERID, SalesSupervisor,IsSupervisor,NodeTreeType,NodeTreeValue)";
                                    query += "values('" + ds.Tables[tableName].Rows[i][0].ToString().Replace("'", string.Empty) + "',";
                                    query += "'" + ds.Tables[tableName].Rows[i][1].ToString().Replace("'", string.Empty) + "',";
                                    query += "'" + sAccessLevel + "',";
                                    query += "'1234',";
                                    query += "'" + ds.Tables[tableName].Rows[i][8].ToString().Replace("'", string.Empty) + "',";
                                    query += "'" + ds.Tables[tableName].Rows[i][9].ToString().Replace("'", string.Empty) + "',";
                                    query += "'" + ds.Tables[tableName].Rows[i][10].ToString().Replace("'", string.Empty) + "',";
                                    query += "'1',";
                                    query += "'" + ds.Tables[tableName].Rows[i][3].ToString().Replace("'", string.Empty) + "',";
                                    query += "'" + ds.Tables[tableName].Rows[i][2].ToString().Replace("'", string.Empty) + "',";
                                    query += "'" + IsSupervisor + "',";
                                    query += "'" + ds.Tables[tableName].Rows[i][4].ToString().Replace("'", string.Empty) + "',";
                                    query += "'" + ds.Tables[tableName].Rows[i][5].ToString().Replace("'", string.Empty) + "')\n";
                                }
                                else
                                {
                                    //query += " update PriceGroup set Code='" + ds.Tables[tableName].Rows[i][0].ToString().Replace("'", string.Empty) + "' , Description='" + ds.Tables[tableName].Rows[i][1].ToString().Replace("'", string.Empty) + "' where  Code='" + ds.Tables[tableName].Rows[i][0].ToString().Replace("'", string.Empty) + "'  \n";
                                }

                            }
                            con.Open();
                            SqlCommand cmd = new SqlCommand(query, con);
                            cmd.ExecuteNonQuery();
                            con.Close();

                            ImportObj.insertErrorLog(" Insert into ErrorLog(DTG, FunctionName, CompanyName, ErrorText) values (GetDate(),'Store Master Imported','','' ) ");
                        }

                        else if (tableName.ToLower() == "pricelistgrouping")
                        {
                            connection();
                            query = "";
                            for (int i = 0; i < ds.Tables[tableName].Rows.Count; i++)
                            {
                                var sItemCode = "";
                                if (ds.Tables[tableName].Rows[i][3].ToString().Replace("'", string.Empty) == null)
                                {
                                    sItemCode = "";
                                }
                                else
                                {
                                    sItemCode = ds.Tables[tableName].Rows[i][3].ToString().Replace("'", string.Empty);
                                    sItemCode = sItemCode.Replace(" ", "");
                                    //sItemCode = sItemCode.Replace('\"', "");
                                }


                                var sPrice = ds.Tables[tableName].Rows[i][3].ToString().Replace("'", string.Empty);
                                sPrice = sPrice.Replace(" ", "");
                                //sPrice = sPrice.Replace(Strings.Chr(34), "");
                                var dPrice = System.Convert.ToDouble(sPrice);
                                var toReturn = 0;
                                var sUOM = "";
                                if (ds.Tables[tableName].Rows[i][2].ToString().Replace("'", string.Empty) == null)
                                {
                                    //MsgBox(("UOM should be either of the three: PD/PK/CS" + ("\r\n" + (" Line No : "
                                    //                + (icnt + 1)))), MsgBoxStyle.Critical, "Price List Group");
                                    toReturn = 2;
                                    // // return toReturn;
                                }
                                else
                                {
                                    sUOM = ds.Tables[tableName].Rows[i][2].ToString().Replace("'", string.Empty);
                                    sUOM = sUOM.Replace(" ", "");
                                    //sUOM = sUOM.Replace('\"', "");
                                }

                                var sBaseQty = ImportObj.getBaseQty(sItemCode, sUOM);
                                dPrice = (dPrice / sBaseQty);

                                if (ImportObj.IsPriceGroupItemExists(ds.Tables[tableName].Rows[i][0].ToString().Replace("'", string.Empty), ds.Tables[tableName].Rows[i][1].ToString().Replace("'", string.Empty)) == false)
                                {
                                    query += "Insert into ItemPr(PriceGroup, ItemNo,UnitPrice,SalesType,MinQty,FromDate,ToDate,UOM,MinPrice)";
                                    query += "values('" + ds.Tables[tableName].Rows[i][0].ToString().Replace("'", string.Empty) + "',";
                                    query += "'" + ds.Tables[tableName].Rows[i][1].ToString().Replace("'", string.Empty) + "',";
                                    query += "'" + dPrice + "',";
                                    query += "'Customer Price Group',";
                                    query += "'1',";
                                    query += "'2013-01-01 00:00:00.000',";
                                    query += "'2019-12-31 23:59:59.000',";
                                    query += "'PD',";
                                    query += "'dPrice')\n";
                                }
                                else
                                {
                                    //query += " update PriceGroup set Code='" + ds.Tables[tableName].Rows[i][0].ToString().Replace("'", string.Empty) + "' , Description='" + ds.Tables[tableName].Rows[i][1].ToString().Replace("'", string.Empty) + "' where  Code='" + ds.Tables[tableName].Rows[i][0].ToString().Replace("'", string.Empty) + "'  \n";
                                }

                            }
                        //        if ((IsDBNull(ds.Tables[tableName].Rows[icnt][1]) == true))

                            
                            con.Open();
                            SqlCommand cmd = new SqlCommand(query, con);
                            cmd.ExecuteNonQuery();
                            con.Close();

                            ImportObj.insertErrorLog(" Insert into ErrorLog(DTG, FunctionName, CompanyName, ErrorText) values (GetDate(),'Store Master Imported','','' ) ");
                        }
                        //else if (tableName.ToLower() == "customer")
                        //{
                        //    //private int ImportCustomer(string file) {
                        //    int toReturn = 1;
                        //    int icnt;
                        //    //string path = GetImportFolder();
                        //    //try
                        //    //{
                        //    //    if (System.IO.File.Exists((path + file)))
                        //    //    {
                        //    //        ExcelConnection.ExcelConnection objExcel = new ExcelConnection.ExcelConnection();
                        //    //        objExcel.ImportAttendence((path + file), dgvData, "CUSTOMER MASTERLIST");
                        //    //        objExcel = null;
                        //    //    }
                        //    //    else if ((MessageBox.Show(("Customer File Not Exists" + ("\r\n" + "Do you want to Continue?")), "Error", MessageBoxButtons.YesNo, MessageBoxIcon.Error) == Windows.Forms.DialogResult.No))
                        //    //    {
                        //    //        MsgBox("Import not successful", MsgBoxStyle.Critical, "Error..!!");
                        //    //        toReturn = 3;
                        //    //       // return toReturn;
                        //    //    }
                        //    //    else
                        //    //    {
                        //    //        toReturn = 2;
                        //    //       // return toReturn;
                        //    //    }

                        //    //}
                        //    //catch (Exception ex)
                        //    //{
                        //    //    MessageBox.Show(ex.ToString());
                        //    //}

                        //    string sSql;
                        //    string sCustNo;
                        //    string sCName;
                        //    string sShortName;
                        //    string sAdd;
                        //    string sAdd3;
                        //    string sAdd4;
                        //    string sPostCode;
                        //    string sBarangay;
                        //    string sCityName;
                        //    string sCity;
                        //    string sPhone;
                        //    string sProvince;
                        //    string sLongitude;
                        //    string sLatitude;
                        //    string sIsParent;
                        //    string sPrGroup;
                        //    string sPayTerms;
                        //    string sParentCode;
                        //    string sAgentID;
                        //    string sChannel;
                        //    string sSubChannel;
                        //    string SDistrCode;
                        //    string sCustType;
                        //    string sAllowCash;
                        //    string sAllowCheque;
                        //    string sAllowPDC;
                        //    string sAllowFT;
                        //    string sPayMode;
                        //    string sEWT;
                        //    string sJSUSalesOffice;
                        //    string sOutletType;
                        //    string sTinNo;

                        //  //--  List<String> DistrCodeList = new List<String>();
                        //    //ArrayList CFNameList = new ArrayList();
                        //    List<String>  CFNameList = new List<String>();
                        //    List<String>  CLNameList = new List<String>();
                        //    List<String>  CRoleList = new List<String>();
                        //    List<String>  CPhoneList = new List<String>();
                        //    List<String>  CMobileList = new List<String>();
                        //    List<String>  CustCodeList = new List<String>();
                        //    List<String>  ProvinceCodeList = new List<String>();
                        //    List<String>  ProvinceList = new List<String>();
                        //    double dCrLimit;
                        //    double dDis1;
                        //    double dDis2;
                        //    int iActive;
                        //    for (icnt = 6; (icnt  <= (ds.Tables[tableName].Rows.Count - 2)); icnt++)
                        //    {
                        //        // ds.Tables[tableName].Rows[icnt][1].ToString() 
                        //        if ((IsDBNull(ds.Tables[tableName].Rows[icnt][1]) == true))
                        //        //if ((IsDBNull(ds.Tables[tableName].Rows[icnt][1]) == true))
                        //        {
                        //            sCustNo = "";
                        //        }
                        //        else
                        //        {
                        //            if ((ds.Tables[tableName].Rows[icnt][1].ToString().Length > 20))
                        //            {
                        //               //MsgBox(("Customer No exceeds 20 characters" + ("\r\n" + ("Line No : "
                        //                              //  + (icnt + 1)))), MsgBoxStyle.Critical, "Customer");
                        //                toReturn = 2;
                        //            }

                        //            sCustNo = ds.Tables[tableName].Rows[icnt][1].ToString().Trim;
                        //        }

                        //        if ((sCustNo == ""))
                        //        {
                        //            break;
                        //        }

                        //        if ((ds.Tables[tableName].Rows[icnt][2].ToString().Length > 100))
                        //        {
                        //           //MsgBox(("Customer Name exceeds 100 characters" + ("\r\n" + ("for customer : " + sCustNo))), MsgBoxStyle.Critical, "Customer");
                        //            toReturn = 2;
                        //           // return toReturn;
                        //        }

                        //        if ((ds.Tables[tableName].Rows[icnt][3].ToString().Length > 100))
                        //        {
                        //           //MsgBox(("Customer Short Name exceeds 100 characters" + ("\r\n" + ("for customer : " + sCustNo))), MsgBoxStyle.Critical, "Customer");
                        //            toReturn = 2;
                        //           // return toReturn;
                        //        }

                        //        if ((ds.Tables[tableName].Rows[icnt][4].ToString().Length > 100))
                        //        {
                        //           //MsgBox(("Address1 exceeds 100 characters" + ("\r\n" + ("for customer : " + sCustNo))), MsgBoxStyle.Critical, "Customer");
                        //            toReturn = 2;
                        //           // return toReturn;
                        //        }

                        //        if ((ds.Tables[tableName].Rows[icnt][5].ToString().Length > 100))
                        //        {
                        //           //MsgBox(("Barangay code exceeds 100 characters" + ("\r\n" + ("for customer : " + sCustNo))), MsgBoxStyle.Critical, "Customer");
                        //            toReturn = 2;
                        //           // return toReturn;
                        //        }

                        //        if ((ds.Tables[tableName].Rows[icnt][9].ToString().Length > 100))
                        //        {
                        //           //MsgBox(("Province Code exceeds 20 characters" + ("\r\n" + ("for customer : " + sCustNo))), MsgBoxStyle.Critical, "Customer");
                        //            toReturn = 2;
                        //           // return toReturn;
                        //        }

                        //        if ((ds.Tables[tableName].Rows[icnt][10].ToString().Length > 100))
                        //        {
                        //           //MsgBox(("Province Code exceeds 100 characters" + ("\r\n" + ("for customer : " + sCustNo))), MsgBoxStyle.Critical, "Customer");
                        //            toReturn = 2;
                        //           // return toReturn;
                        //        }

                        //        if ((ds.Tables[tableName].Rows[icnt][11].ToString().Length > 20))
                        //        {
                        //           //MsgBox(("Post Code exceeds 20 characters" + ("\r\n" + ("for customer : " + sCustNo))), MsgBoxStyle.Critical, "Customer");
                        //            toReturn = 2;
                        //           // return toReturn;
                        //        }

                        //        if ((ds.Tables[tableName].Rows[icnt][7].ToString().Length > 30))
                        //        {
                        //           //MsgBox(("City Code exceeds 30 characters" + ("\r\n" + ("for customer : " + sCustNo))), MsgBoxStyle.Critical, "Customer");
                        //            toReturn = 2;
                        //           // return toReturn;
                        //        }

                        //        if ((dgvData.Item[17, icnt].Value.ToString().Length > 50))
                        //        {
                        //           //MsgBox(("Phone exceeds 50 characters" + ("\r\n" + ("for customer : " + sCustNo))), MsgBoxStyle.Critical, "Customer");
                        //            toReturn = 2;
                        //           // return toReturn;
                        //        }

                        //        if ((dgvData.Item[21, icnt].Value.ToString().Length > 20))
                        //        {
                        //           //MsgBox(("Channel Code exceeds 20 characters" + ("\r\n" + ("for customer : " + sCustNo))), MsgBoxStyle.Critical, "Customer");
                        //            toReturn = 2;
                        //           // return toReturn;
                        //        }

                        //        if ((dgvData.Item[22, icnt].Value.ToString().Length > 30))
                        //        {
                        //           //MsgBox(("Sub Channel Code exceeds 20 characters" + ("\r\n" + ("for customer : " + sCustNo))), MsgBoxStyle.Critical, "Customer");
                        //            toReturn = 2;
                        //           // return toReturn;
                        //        }

                        //        if ((ds.Tables[tableName].Rows[icnt][20].ToString().Length > 30))
                        //        {
                        //           //MsgBox(("Parent Account Code exceeds 20 characters" + ("\r\n" + ("for customer : " + sCustNo))), MsgBoxStyle.Critical, "Customer");
                        //            toReturn = 2;
                        //           // return toReturn;
                        //        }

                        //        if ((ds.Tables[tableName].Rows[icnt][23].ToString().Length > 20))
                        //        {
                        //           //MsgBox(("Outlet Type Code exceeds 20 characters" + ("\r\n" + ("for customer : " + sCustNo))), MsgBoxStyle.Critical, "Customer");
                        //            toReturn = 2;
                        //           // return toReturn;
                        //        }

                        //        if (((ds.Tables[tableName].Rows[icnt][19].ToString() != "0")
                        //                    && (ds.Tables[tableName].Rows[icnt][19].ToString() != "1")))
                        //        {
                        //           //MsgBox(("IsParent should hold either 1 or 0" + ("\r\n" + ("for customer : " + sCustNo))), MsgBoxStyle.Critical, "Customer");
                        //            toReturn = 2;
                        //           // return toReturn;
                        //        }

                        //        if (((dgvData.Item[24, icnt].Value.ToString() != "0")
                        //                    && (dgvData.Item[24, icnt].Value.ToString() != "1")))
                        //        {
                        //           //MsgBox(("Cash Field should hold either 1 or 0" + ("\r\n" + ("for customer : " + sCustNo))), MsgBoxStyle.Critical, "Customer");
                        //            toReturn = 2;
                        //           // return toReturn;
                        //        }

                        //        if (((dgvData.Item[26, icnt].Value.ToString() != "0")
                        //                    && (dgvData.Item[26, icnt].Value.ToString() != "1")))
                        //        {
                        //           //MsgBox(("Dated Check Field should hold either 1 or 0" + ("\r\n" + ("for customer : " + sCustNo))), MsgBoxStyle.Critical, "Customer");
                        //            toReturn = 2;
                        //           // return toReturn;
                        //        }

                        //        if (((dgvData.Item[27, icnt].Value.ToString() != "0")
                        //                    && (dgvData.Item[27, icnt].Value.ToString() != "1")))
                        //        {
                        //           //MsgBox(("PDC Field should hold either 1 or 0" + ("\r\n" + ("for customer : " + sCustNo))), MsgBoxStyle.Critical, "Customer");
                        //            toReturn = 2;
                        //           // return toReturn;
                        //        }

                        //        if (((dgvData.Item[28, icnt].Value.ToString() != "0")
                        //                    && (dgvData.Item[28, icnt].Value.ToString() != "1")))
                        //        {
                        //           //MsgBox(("PDC Field should hold either 1 or 0" + ("\r\n" + ("for customer : " + sCustNo))), MsgBoxStyle.Critical, "Customer");
                        //            toReturn = 2;
                        //           // return toReturn;
                        //        }

                        //        if ((dgvData.Item[31, icnt].Value.ToString().Length > 20))
                        //        {
                        //           //MsgBox(("Payment Terms exceeds 20 characters" + ("\r\n" + ("for customer : " + sCustNo))), MsgBoxStyle.Critical, "Customer");
                        //            toReturn = 2;
                        //           // return toReturn;
                        //        }

                        //        if ((dgvData.Item[29, icnt].Value.ToString().Length > 20))
                        //        {
                        //           //MsgBox(("Payment Mode exceeds 20 characters" + ("\r\n" + ("for customer : " + sCustNo))), MsgBoxStyle.Critical, "Customer");
                        //            toReturn = 2;
                        //           // return toReturn;
                        //        }

                        //        if ((dgvData.Item[30, icnt].Value.ToString().Length > 20))
                        //        {
                        //           //MsgBox(("TIN No. exceeds 20 characters" + ("\r\n" + ("for customer : " + sCustNo))), MsgBoxStyle.Critical, "Customer");
                        //            toReturn = 2;
                        //           // return toReturn;
                        //        }

                        //        if ((dgvData.Item[39, icnt].Value.ToString().Length > 20))
                        //        {
                        //           //MsgBox(("Price Group exceeds 20 characters" + ("\r\n" + ("for customer : " + sCustNo))), MsgBoxStyle.Critical, "Customer");
                        //            toReturn = 2;
                        //           // return toReturn;
                        //        }

                        //        if ((IsNumeric(dgvData.Item[35, icnt].Value.ToString()) == false))
                        //        {
                        //           //MsgBox(("Customer Discount Level 1 Should be Numeric" + ("\r\n" + ("for customer : " + sCustNo))), MsgBoxStyle.Critical, "Customer");
                        //            toReturn = 2;
                        //           // return toReturn;
                        //        }

                        //        if ((IsNumeric(dgvData.Item[36, icnt].Value.ToString()) == false))
                        //        {
                        //           //MsgBox(("Customer Discount Level 2 Should be Numeric" + ("\r\n" + ("for customer : " + sCustNo))), MsgBoxStyle.Critical, "Customer");
                        //            toReturn = 2;
                        //           // return toReturn;
                        //        }

                        //        if ((dgvData.Item[45, icnt].Value.ToString().Length > 50))
                        //        {
                        //           //MsgBox(("Simplr Territory Code exceeds 50 characters" + ("\r\n" + ("for customer : " + sCustNo))), MsgBoxStyle.Critical, "Customer");
                        //            toReturn = 2;
                        //           // return toReturn;
                        //        }

                        //        if (((dgvData.Item[34, icnt].Value.ToString() != "0")
                        //                    && (dgvData.Item[34, icnt].Value.ToString() != "1")))
                        //        {
                        //           //MsgBox(("EWT Field should hold either 1 or 0" + ("\r\n" + ("for customer : " + sCustNo))), MsgBoxStyle.Critical, "Customer");
                        //            toReturn = 2;
                        //           // return toReturn;
                        //        }

                        //        if ((dgvData.Item[49, icnt].Value.ToString().Length > 50))
                        //        {
                        //           //MsgBox(("JSU Sales Office exceeds 50 characters" + ("\r\n" + ("for customer : " + sCustNo))), MsgBoxStyle.Critical, "Customer");
                        //            toReturn = 2;
                        //           // return toReturn;
                        //        }

                        //        if ((IsNumeric(dgvData.Item[32, icnt].Value.ToString().Trim) == false))
                        //        {
                        //           //MsgBox(("dCrLimit should be numeric" + ("\r\n" + ("for customer : " + sCustNo))), MsgBoxStyle.Critical, "Customer");
                        //            toReturn = 2;
                        //           // return toReturn;
                        //        }

                        //    }

                        //    for (icnt = 6; (icnt
                        //                <= (dgvData.Rows.Count - 2)); icnt++)
                        //    {
                        //        if ((IsDBNull(ds.Tables[tableName].Rows[icnt][1]) == true))
                        //        {
                        //            sCustNo = "";
                        //        }
                        //        else
                        //        {
                        //            sCustNo = ds.Tables[tableName].Rows[icnt][1].ToString().Trim;
                        //        }

                        //        if ((sCustNo == ""))
                        //        {
                        //            break;
                        //        }

                        //        if ((IsDBNull(ds.Tables[tableName].Rows[icnt][2]) == true))
                        //        {
                        //            sCName = "";
                        //        }
                        //        else
                        //        {
                        //            sCName = ds.Tables[tableName].Rows[icnt][2].ToString();
                        //            sCName = sCName.Replace('\0', "");
                        //        }

                        //        if ((IsDBNull(ds.Tables[tableName].Rows[icnt][3]) == true))
                        //        {
                        //            sShortName = "";
                        //        }
                        //        else
                        //        {
                        //            sShortName = ds.Tables[tableName].Rows[icnt][3].ToString();
                        //            sShortName = sShortName.Replace('\0', "");
                        //        }

                        //        if ((IsDBNull(ds.Tables[tableName].Rows[icnt][4]) == true))
                        //        {
                        //            sAdd = "";
                        //        }
                        //        else
                        //        {
                        //            sAdd = ds.Tables[tableName].Rows[icnt][4].ToString();
                        //            sAdd = sAdd.Replace('\0', "");
                        //        }

                        //        if ((IsDBNull(ds.Tables[tableName].Rows[icnt][5]) == true))
                        //        {
                        //            sAdd3 = "";
                        //        }
                        //        else
                        //        {
                        //            sAdd3 = ds.Tables[tableName].Rows[icnt][5].ToString();
                        //            sAdd3 = sAdd3.Replace('\0', "");
                        //        }

                        //        if ((IsDBNull(ds.Tables[tableName].Rows[icnt][9]) == true))
                        //        {
                        //            sAdd4 = "";
                        //        }
                        //        else
                        //        {
                        //            sAdd4 = ds.Tables[tableName].Rows[icnt][9].ToString();
                        //            sAdd4 = sAdd4.Replace('\0', "");
                        //        }

                        //        if ((IsDBNull(ds.Tables[tableName].Rows[icnt][10]) == true))
                        //        {
                        //            sProvince = "";
                        //        }
                        //        else
                        //        {
                        //            sProvince = ds.Tables[tableName].Rows[icnt][10].ToString();
                        //            sProvince = sProvince.Replace('\0', "");
                        //        }

                        //        if ((IsDBNull(ds.Tables[tableName].Rows[icnt][11]) == true))
                        //        {
                        //            sPostCode = "";
                        //        }
                        //        else
                        //        {
                        //            sPostCode = ds.Tables[tableName].Rows[icnt][11].ToString();
                        //            sPostCode = sPostCode.Replace('\0', "");
                        //        }

                        //        if ((IsDBNull(ds.Tables[tableName].Rows[icnt][6]) == true))
                        //        {
                        //            sBarangay = "";
                        //        }
                        //        else
                        //        {
                        //            sBarangay = ds.Tables[tableName].Rows[icnt][6].ToString();
                        //        }

                        //        if ((IsDBNull(ds.Tables[tableName].Rows[icnt][7]) == true))
                        //        {
                        //            sCity = "";
                        //        }
                        //        else
                        //        {
                        //            sCity = ds.Tables[tableName].Rows[icnt][7].ToString();
                        //            sCity = sCity.Replace('\0', "");
                        //        }

                        //        if ((IsDBNull(ds.Tables[tableName].Rows[icnt][8]) == true))
                        //        {
                        //            sCityName = "";
                        //        }
                        //        else
                        //        {
                        //            sCityName = ds.Tables[tableName].Rows[icnt][8].ToString();
                        //        }

                        //        if ((IsDBNull(dgvData.Item[17, icnt].Value) == true))
                        //        {
                        //            sPhone = "";
                        //        }
                        //        else
                        //        {
                        //            sPhone = dgvData.Item[17, icnt].Value.ToString();
                        //            sPhone = sPhone.Replace('\0', "");
                        //        }

                        //        // ''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                        //        string inString = "";
                        //        string outString = "";
                        //        inString = (sAdd + (", "
                        //                    + (sBarangay + (", "
                        //                    + (sCityName + (", "
                        //                    + (sProvince + (" "
                        //                    + (sPostCode + ", Philppines")))))))));
                        //        outString = GetGeoCoords(inString);
                        //        if ((outString == "0,0"))
                        //        {
                        //            inString = (sBarangay + (", "
                        //                        + (sCityName + (", "
                        //                        + (sPostCode + (" "
                        //                        + (sProvince + ", Philppines")))))));
                        //            outString = GetGeoCoords(inString);
                        //        }

                        //        string[] str2 = outString.Split(",");
                        //        sLatitude = str2[0];
                        //        sLongitude = str2[1];
                        //        int flg = 0;
                        //        if ((CustCodeList.Count > 0))
                        //        {
                        //            for (int i = 0; (i
                        //                        <= (CustCodeList.Count - 1)); i++)
                        //            {
                        //                if ((CustCodeList[i] == sCustNo))
                        //                {
                        //                    flg = 1;
                        //                }

                        //            }

                        //        }
                        //        else
                        //        {
                        //            flg = 1;
                        //            CustCodeList.Add(sCustNo);
                        //            CFNameList.Add(dgvData.Item[15, icnt].Value.ToString());
                        //            CLNameList.Add(dgvData.Item[14, icnt].Value.ToString());
                        //            CRoleList.Add(dgvData.Item[16, icnt].Value.ToString());
                        //            CPhoneList.Add(ds.Tables[tableName].Rows[icnt][18].ToString());
                        //            CMobileList.Add(dgvData.Item[17, icnt].Value.ToString());
                        //        }

                        //        if ((flg == 0))
                        //        {
                        //            CustCodeList.Add(sCustNo);
                        //            CFNameList.Add(dgvData.Item[15, icnt].Value.ToString());
                        //            CLNameList.Add(dgvData.Item[14, icnt].Value.ToString());
                        //            CRoleList.Add(dgvData.Item[16, icnt].Value.ToString());
                        //            CPhoneList.Add(ds.Tables[tableName].Rows[icnt][18].ToString());
                        //            CMobileList.Add(dgvData.Item[17, icnt].Value.ToString());
                        //        }

                        //        flg = 0;
                        //        if ((ProvinceCodeList.Count > 0))
                        //        {
                        //            for (int i = 0; (i
                        //                        <= (ProvinceCodeList.Count - 1)); i++)
                        //            {
                        //                if ((ProvinceCodeList[i] == sAdd4))
                        //                {
                        //                    flg = 1;
                        //                }

                        //            }

                        //        }
                        //        else
                        //        {
                        //            flg = 1;
                        //            ProvinceCodeList.Add(sAdd4);
                        //            ProvinceList.Add(sProvince);
                        //        }

                        //        if ((flg == 0))
                        //        {
                        //            ProvinceCodeList.Add(sAdd4);
                        //            ProvinceList.Add(sProvince);
                        //        }

                        //        if ((IsDBNull(dgvData.Item[21, icnt].Value) == true))
                        //        {
                        //            sChannel = "";
                        //        }
                        //        else
                        //        {
                        //            sChannel = dgvData.Item[21, icnt].Value.ToString();
                        //            sChannel = sChannel.Replace('\0', "");
                        //        }

                        //        if ((IsDBNull(dgvData.Item[22, icnt].Value) == true))
                        //        {
                        //            sSubChannel = "";
                        //        }
                        //        else
                        //        {
                        //            sSubChannel = dgvData.Item[22, icnt].Value.ToString();
                        //            sSubChannel = sSubChannel.Replace('\0', "");
                        //        }

                        //        if ((IsDBNull(ds.Tables[tableName].Rows[icnt][20]) == true))
                        //        {
                        //            sParentCode = "";
                        //        }
                        //        else
                        //        {
                        //            sParentCode = ds.Tables[tableName].Rows[icnt][20].ToString();
                        //            sParentCode = sParentCode.Replace('\0', "");
                        //        }

                        //        if ((IsDBNull(ds.Tables[tableName].Rows[icnt][23]) == true))
                        //        {
                        //            sOutletType = "";
                        //        }
                        //        else
                        //        {
                        //            sOutletType = ds.Tables[tableName].Rows[icnt][23].ToString();
                        //            sOutletType = sOutletType.Replace('\0', "");
                        //        }

                        //        try
                        //        {
                        //            if ((IsDBNull(ds.Tables[tableName].Rows[icnt][19]) == true))
                        //            {
                        //                sIsParent = "0";
                        //            }
                        //            else
                        //            {
                        //                sIsParent = ds.Tables[tableName].Rows[icnt][19].ToString().Trim;
                        //                sIsParent = sIsParent.Replace('\0', "");
                        //            }

                        //        }
                        //        catch (Exception ex)
                        //        {
                        //            sIsParent = "0";
                        //        }

                        //        try
                        //        {
                        //            if ((IsDBNull(dgvData.Item[24, icnt].Value) == true))
                        //            {
                        //                sAllowCash = "0";
                        //            }
                        //            else
                        //            {
                        //                sAllowCash = dgvData.Item[24, icnt].Value.ToString().Trim;
                        //                sAllowCash = sAllowCash.Replace('\0', "");
                        //            }

                        //        }
                        //        catch (Exception ex)
                        //        {
                        //            sAllowCash = "0";
                        //        }

                        //        try
                        //        {
                        //            if ((IsDBNull(dgvData.Item[26, icnt].Value) == true))
                        //            {
                        //                sAllowCheque = "0";
                        //            }
                        //            else
                        //            {
                        //                sAllowCheque = dgvData.Item[26, icnt].Value.ToString().Trim;
                        //                sAllowCheque = sAllowCheque.Replace('\0', "");
                        //            }

                        //        }
                        //        catch (Exception ex)
                        //        {
                        //            sAllowCheque = "0";
                        //        }

                        //        try
                        //        {
                        //            if ((IsDBNull(dgvData.Item[27, icnt].Value) == true))
                        //            {
                        //                sAllowPDC = "0";
                        //            }
                        //            else
                        //            {
                        //                sAllowPDC = dgvData.Item[27, icnt].Value.ToString().Trim;
                        //                sAllowPDC = sAllowPDC.Replace('\0', "");
                        //            }

                        //        }
                        //        catch (Exception ex)
                        //        {
                        //            sAllowPDC = "0";
                        //        }

                        //        try
                        //        {
                        //            if ((IsDBNull(dgvData.Item[28, icnt].Value) == true))
                        //            {
                        //                sAllowFT = "0";
                        //            }
                        //            else
                        //            {
                        //                sAllowFT = dgvData.Item[28, icnt].Value.ToString().Trim;
                        //                sAllowFT = sAllowFT.Replace('\0', "");
                        //            }

                        //        }
                        //        catch (Exception ex)
                        //        {
                        //            sAllowFT = "0";
                        //        }

                        //        try
                        //        {
                        //            if ((IsDBNull(dgvData.Item[31, icnt].Value) == true))
                        //            {
                        //                sPayTerms = "0";
                        //            }
                        //            else
                        //            {
                        //                sPayTerms = dgvData.Item[31, icnt].Value.ToString().Trim;
                        //                sPayTerms = sPayTerms.Replace('\0', "");
                        //            }

                        //        }
                        //        catch (Exception ex)
                        //        {
                        //            sPayTerms = "0";
                        //        }

                        //        try
                        //        {
                        //            if ((IsDBNull(dgvData.Item[29, icnt].Value) == true))
                        //            {
                        //                sPayMode = "";
                        //            }
                        //            else
                        //            {
                        //                sPayMode = dgvData.Item[29, icnt].Value.ToString().Trim;
                        //                sPayMode = sPayMode.Replace('\0', "");
                        //            }

                        //        }
                        //        catch (Exception ex)
                        //        {
                        //            sPayMode = "";
                        //        }

                        //        try
                        //        {
                        //            if ((IsDBNull(dgvData.Item[30, icnt].Value) == true))
                        //            {
                        //                sTinNo = "";
                        //            }
                        //            else
                        //            {
                        //                sTinNo = dgvData.Item[30, icnt].Value.ToString().Trim;
                        //                sTinNo = sTinNo.Replace('\0', "");
                        //            }

                        //        }
                        //        catch (Exception ex)
                        //        {
                        //            sTinNo = "";
                        //        }

                        //        try
                        //        {
                        //            if ((IsDBNull(dgvData.Item[39, icnt].Value) == true))
                        //            {
                        //                sPrGroup = "";
                        //            }
                        //            else
                        //            {
                        //                sPrGroup = dgvData.Item[39, icnt].Value.ToString().Trim;
                        //                sPrGroup = sPrGroup.Replace('\0', "");
                        //            }

                        //        }
                        //        catch (Exception ex)
                        //        {
                        //            sPrGroup = "";
                        //        }

                        //        try
                        //        {
                        //            if ((IsDBNull(dgvData.Item[35, icnt].Value) == true))
                        //            {
                        //                dDis1 = 0;
                        //            }
                        //            else
                        //            {
                        //                dDis1 = double.Parse(dgvData.Item[35, icnt].Value.ToString().Trim);
                        //            }

                        //        }
                        //        catch (Exception ex)
                        //        {
                        //            sPrGroup = "";
                        //        }

                        //        try
                        //        {
                        //            if ((IsDBNull(dgvData.Item[36, icnt].Value) == true))
                        //            {
                        //                dDis2 = "";
                        //            }
                        //            else
                        //            {
                        //                dDis2 = double.Parse(dgvData.Item[36, icnt].Value.ToString().Trim);
                        //            }

                        //        }
                        //        catch (Exception ex)
                        //        {
                        //            dDis2 = 0;
                        //        }

                        //        try
                        //        {
                        //            if ((IsDBNull(dgvData.Item[45, icnt].Value) == true))
                        //            {
                        //                sAgentID = "";
                        //            }
                        //            else
                        //            {
                        //                sAgentID = dgvData.Item[45, icnt].Value.ToString().Trim;
                        //                sAgentID = sAgentID.Replace('\0', "");
                        //            }

                        //        }
                        //        catch (Exception ex)
                        //        {
                        //            sAgentID = "";
                        //        }

                        //        try
                        //        {
                        //            if ((IsDBNull(dgvData.Item[34, icnt].Value) == true))
                        //            {
                        //                sEWT = "0";
                        //            }
                        //            else
                        //            {
                        //                sEWT = dgvData.Item[34, icnt].Value.ToString().Trim;
                        //                sEWT = sEWT.Replace('\0', "");
                        //            }

                        //        }
                        //        catch (Exception ex)
                        //        {
                        //            sEWT = "0";
                        //        }

                        //        try
                        //        {
                        //            if ((IsDBNull(dgvData.Item[49, icnt].Value) == true))
                        //            {
                        //                sJSUSalesOffice = "";
                        //            }
                        //            else
                        //            {
                        //                sJSUSalesOffice = dgvData.Item[49, icnt].Value.ToString().Trim;
                        //                sJSUSalesOffice = sJSUSalesOffice.Replace('\0', "");
                        //            }

                        //        }
                        //        catch (Exception ex)
                        //        {
                        //            sJSUSalesOffice = "";
                        //        }

                        //        try
                        //        {
                        //            if ((IsDBNull(dgvData.Item[32, icnt].Value) == true))
                        //            {
                        //                dCrLimit = 0;
                        //            }
                        //            else
                        //            {
                        //                dCrLimit = double.Parse(dgvData.Item[32, icnt].Value.ToString().Trim);
                        //            }

                        //        }
                        //        catch (Exception ex)
                        //        {
                        //            dCrLimit = 0;
                        //        }

                        //        iActive = 1;
                        //        string sDiscGroup = "";
                        //        if ((dDis1.ToString() + ("+"
                        //                    + (dDis2.ToString() != "0+0"))))
                        //        {
                        //            sDiscGroup = (dDis1.ToString() + ("+" + dDis2.ToString()));
                        //        }
                        //        else
                        //        {
                        //            sDiscGroup = "";
                        //        }

                        //        try
                        //        {
                        //            sCustNo = IsCustomerCrossReferenceExists(sCustNo);
                        //            if (IsCustomerExists(sCustNo))
                        //            {
                        //                sSql = ("Update Customer Set CustName="
                        //                            + (objDO.SafeSQL(sCName) + (", " + ("ChineseName = "
                        //                            + (objDO.SafeSQL(((sCName.Trim == "") ? sCName : sCName)) + (", " + ("SearchName = "
                        //                            + (objDO.SafeSQL(sCName) + (", Address = "
                        //                            + (objDO.SafeSQL(sAdd) + (", " + ("Address2 = "
                        //                            + (objDO.SafeSQL("") + (", Address3 = "
                        //                            + (objDO.SafeSQL(sAdd3) + (", " + ("Address4 = "
                        //                            + (objDO.SafeSQL(sAdd4) + (", PostCode = "
                        //                            + (objDO.SafeSQL(sPostCode) + (", " + ("City = "
                        //                            + (objDO.SafeSQL(sCity) + (", CountryCode = \'PHILIPPINES\' ," + ("Phone = "
                        //                            + (objDO.SafeSQL(sPhone) + (", ContactPerson = "
                        //                            + (objDO.SafeSQL("") + (", " + ("ZoneCode = "
                        //                            + (objDO.SafeSQL("STD") + (",GSTType=\'Inclusive\', Balance =0 , " + ("CreditLimit = "
                        //                            + (dCrLimit + (", FaxNo = "
                        //                            + (objDO.SafeSQL("") + (", " + ("Latitude = "
                        //                            + (objDO.SafeSQL(sLatitude) + (", Longitude = "
                        //                            + (objDO.SafeSQL(sLongitude) + (", " + ("Email = "
                        //                            + (objDO.SafeSQL("") + (", Website = "
                        //                            + (objDO.SafeSQL("") + (",StockTakeRequired=1, " + ("PriceGroup ="
                        //                            + (objDO.SafeSQL(sPrGroup) + (", PaymentTerms ="
                        //                            + (objDO.SafeSQL(sPayTerms) + (", " + ("Channel ="
                        //                            + (objDO.SafeSQL(sChannel) + (", SubChannel ="
                        //                            + (objDO.SafeSQL(sSubChannel) + (", OutLetType="
                        //                            + (objDO.SafeSQL(sOutletType) + (", " + ("ParentCode ="
                        //                            + (objDO.SafeSQL(sParentCode) + (", JSUSalesOffice ="
                        //                            + (objDO.SafeSQL(sJSUSalesOffice) + (", " + ("EWT ="
                        //                            + (objDO.SafeSQL(sEWT) + (", IsParent ="
                        //                            + (objDO.SafeSQL(sIsParent) + (", " + ("AllowCash ="
                        //                            + (objDO.SafeSQL(sAllowCash) + (", AllowMaxDtdChk ="
                        //                            + (objDO.SafeSQL(sAllowCheque) + (", " + ("AllowPDC ="
                        //                            + (objDO.SafeSQL(sAllowPDC) + (", AllowFT ="
                        //                            + (objDO.SafeSQL(sAllowFT) + (", " + ("PaymentMethod ="
                        //                            + (objDO.SafeSQL(sPayMode) + (", GSTNO="
                        //                            + (objDO.SafeSQL(sTinNo) + (", " + ("ShipmentMethod =\'\', SalesAgent = "
                        //                            + (objDO.SafeSQL(sAgentID) + (", " + ("Active = "
                        //                            + (iActive + (", ToPDA=1,DiscountGroup="
                        //                            + (objDO.SafeSQL(sDiscGroup) + (" Where CustNo= " + objDO.SafeSQL(sCustNo)))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))));
                        //                System.IO.File.AppendAllText((Application.StartupPath + "\\ErrorLog.txt"), ("ImportCust: "
                        //                                + (sSql + "\r\n")));
                        //                objDO.ExecuteSQL(sSql);
                        //            }
                        //            else
                        //            {
                        //                sSql = ("Insert into Customer(CustNo, CustName, ChineseName, Address, Address2, Address3," + (" Address4, PostCode, City, CountryCode,GSTType, Phone," + ("ContactPerson, Balance, CreditLimit, PriceGroup, PaymentTerms, " + ("OutletType,Channel,SubChannel,ParentCode,JSUSalesOffice,IsParent,EWT," + ("AllowCash,AllowMaxDtdChk,AllowPDC,AllowFT," + ("PaymentMethod, SalesAgent, Active, ToPDA, DTG,StockTakeRequired,GSTNO,DiscountGroup,Latitude,Longitud" +
                        //                "e) Values ("
                        //                            + (objDO.SafeSQL(sCustNo) + (","
                        //                            + (objDO.SafeSQL(sCName) + (","
                        //                            + (objDO.SafeSQL(sCName) + (","
                        //                            + (objDO.SafeSQL(sAdd) + (","
                        //                            + (objDO.SafeSQL("") + (", "
                        //                            + (objDO.SafeSQL(sAdd3) + (", "
                        //                            + (objDO.SafeSQL(sAdd4) + (","
                        //                            + (objDO.SafeSQL(sPostCode) + (","
                        //                            + (objDO.SafeSQL(sCity) + (","
                        //                            + (objDO.SafeSQL("Philippines") + (",\'Inclusive\',"
                        //                            + (objDO.SafeSQL(sPhone) + (","
                        //                            + (objDO.SafeSQL("") + (", 0, "
                        //                            + (dCrLimit + (","
                        //                            + (objDO.SafeSQL(sPrGroup) + (", "
                        //                            + (objDO.SafeSQL(sPayTerms) + (","
                        //                            + (objDO.SafeSQL(sOutletType) + (","
                        //                            + (objDO.SafeSQL(sChannel) + (","
                        //                            + (objDO.SafeSQL(sSubChannel) + (", "
                        //                            + (objDO.SafeSQL(sParentCode) + (","
                        //                            + (objDO.SafeSQL(sJSUSalesOffice) + (","
                        //                            + (objDO.SafeSQL(sIsParent) + (","
                        //                            + (objDO.SafeSQL(sEWT) + (","
                        //                            + (objDO.SafeSQL(sAllowCash) + (","
                        //                            + (objDO.SafeSQL(sAllowCheque) + (","
                        //                            + (objDO.SafeSQL(sAllowPDC) + (","
                        //                            + (objDO.SafeSQL(sAllowFT) + (","
                        //                            + (objDO.SafeSQL(sPayMode) + (", "
                        //                            + (objDO.SafeSQL(sAgentID) + (",1, 1,getdate(),1,"
                        //                            + (objDO.SafeSQL(sTinNo) + (","
                        //                            + (objDO.SafeSQL(sDiscGroup) + (","
                        //                            + (objDO.SafeSQL(sLatitude) + (","
                        //                            + (objDO.SafeSQL(sLongitude) + ")")))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))));
                        //                System.IO.File.AppendAllText((Application.StartupPath + "\\ErrorLog.txt"), ("ImportCust: "
                        //                                + (sSql + "\r\n")));
                        //                objDO.ExecuteSQL(sSql);
                        //            }

                        //            if (((IsDiscountPromotionExists((dDis1.ToString() + ("+" + dDis2.ToString()))) == false)
                        //                        && (dDis1.ToString() + ("+"
                        //                        + (dDis2.ToString() != "0+0")))))
                        //            {
                        //                sSql = ("insert into Promotion(PromoID, PromoName,ApType,FromDate,ToDate,PromoType,Multiply,Priority,MinAmt,Ma" +
                        //                "xAmt, DisAmt," + ("DisPer,Entitle,EntitleType,CATBased,ItemCondition,DisCalc) " + ("Values(\'"
                        //                            + (dDis1.ToString() + ("+"
                        //                            + (dDis2.ToString() + ("\',\'"
                        //                            + (dDis1.ToString() + ("+"
                        //                            + (dDis2.ToString() + (" Promotion\',\'Discount Group\',GetDate(),\'2049-12-31 00:00:00.000\',\'Invoice Promotion\'," + ("\'Standard\',\'1\',0,999999,0,0,999999,\'Per Invoice\',0,0,\'"
                        //                            + (dDis1.ToString() + ("%+"
                        //                            + (dDis2.ToString() + ("%" + "\')"))))))))))))))));
                        //                System.IO.File.AppendAllText((Application.StartupPath + "\\ErrorLog.txt"), ("Import Promotion: "
                        //                                + (sSql + "\r\n")));
                        //                objDO.ExecuteSQL(sSql);
                        //                sSql = ("insert into PromoApply(PromoID,ID) Values(\'"
                        //                            + (dDis1.ToString() + ("+"
                        //                            + (dDis2.ToString() + ("\',\'"
                        //                            + (dDis1.ToString() + ("+"
                        //                            + (dDis2.ToString() + "\')"))))))));
                        //                System.IO.File.AppendAllText((Application.StartupPath + "\\ErrorLog.txt"), ("Import Promotion: "
                        //                                + (sSql + "\r\n")));
                        //                objDO.ExecuteSQL(sSql);
                        //            }

                        //            if (IsPayTermsExists(sPayTerms))
                        //            {
                        //                if ((sPayTerms == "0"))
                        //                {
                        //                    sSql = ("Update PayTerms Set Code="
                        //                                + (objDO.SafeSQL(sPayTerms) + (", " + ("Description = "
                        //                                + (objDO.SafeSQL("CASH") + (", " + ("DueDateCalc = "
                        //                                + (objDO.SafeSQL("0D") + (", Active = 1 Where Code= " + objDO.SafeSQL(sPayTerms))))))))));
                        //                    System.IO.File.AppendAllText((Application.StartupPath + "\\ErrorLog.txt"), ("Import Payment Terms: "
                        //                                    + (sSql + "\r\n")));
                        //                    objDO.ExecuteSQL(sSql);
                        //                }
                        //                else
                        //                {
                        //                    sSql = ("Update PayTerms Set Code="
                        //                                + (objDO.SafeSQL(sPayTerms) + (", " + ("Description = "
                        //                                + (objDO.SafeSQL((sPayTerms + " Days")) + (", " + ("DueDateCalc = "
                        //                                + (objDO.SafeSQL((sPayTerms + "D")) + (", Active = 1 Where Code= " + objDO.SafeSQL(sPayTerms))))))))));
                        //                    System.IO.File.AppendAllText((Application.StartupPath + "\\ErrorLog.txt"), ("Import Payment Terms: "
                        //                                    + (sSql + "\r\n")));
                        //                    objDO.ExecuteSQL(sSql);
                        //                }

                        //            }
                        //            else
                        //            {
                        //                sSql = ("Insert into PayTerms(Code, Description, DueDateCalc, Active) Values ("
                        //                            + (objDO.SafeSQL(sPayTerms) + (","
                        //                            + (objDO.SafeSQL((sPayTerms + " Days")) + (","
                        //                            + (objDO.SafeSQL((sPayTerms + "D")) + ",1)"))))));
                        //                System.IO.File.AppendAllText((Application.StartupPath + "\\ErrorLog.txt"), ("Import Payment Terms: "
                        //                                + (sSql + "\r\n")));
                        //                objDO.ExecuteSQL(sSql);
                        //            }

                        //            if (((IsPriceGroupExists(sPrGroup) == false)
                        //                        && (sPrGroup != "")))
                        //            {
                        //                sSql = ("Insert into PriceGroup(Code, Description, DTG) Values ("
                        //                            + (objDO.SafeSQL(sPrGroup) + (","
                        //                            + (objDO.SafeSQL(sPrGroup) + ",GetDate())"))));
                        //                System.IO.File.AppendAllText((Application.StartupPath + "\\ErrorLog.txt"), ("Import Price Group: "
                        //                                + (sSql + "\r\n")));
                        //                objDO.ExecuteSQL(sSql);
                        //            }

                        //        }
                        //        catch (Exception ex)
                        //        {
                        //            System.IO.File.AppendAllText((Application.StartupPath + "\\ErrorLog.txt"), ("Import Payment Terms: "
                        //                            + (ex.Message + "\r\n")));
                        //        }

                        //    }

                        //    for (int i = 0; (i
                        //                <= (CustCodeList.Count - 1)); i++)
                        //    {
                        //        sCustNo = "";
                        //        sCustNo = IsCustomerCrossReferenceExists(CustCodeList[i]);
                        //        if ((sCustNo != ""))
                        //        {
                        //            try
                        //            {
                        //                if (IsCustomerContactExists(sCustNo))
                        //                {
                        //                    sSql = ("Update Contacts Set Designation="
                        //                                + (objDO.SafeSQL(CRoleList[i]) + (", " + ("Name = "
                        //                                + (objDO.SafeSQL((CFNameList[i] + (" " + CLNameList[i]))) + (", " + ("MobileNo = "
                        //                                + (objDO.SafeSQL(CMobileList[i]) + (", PhoneNo = "
                        //                                + (objDO.SafeSQL(CPhoneList[i]) + (" Where CustNo= " + objDO.SafeSQL(sCustNo))))))))))));
                        //                    System.IO.File.AppendAllText((Application.StartupPath + "\\ErrorLog.txt"), ("ImportContacts: "
                        //                                    + (sSql + "\r\n")));
                        //                    objDO.ExecuteSQL(sSql);
                        //                }
                        //                else
                        //                {
                        //                    sSql = ("Insert into Contacts(CustNo, Designation, Name, MobileNo, PhoneNO, DTG) Values ("
                        //                                + (objDO.SafeSQL(sCustNo) + (","
                        //                                + (objDO.SafeSQL(CRoleList[i]) + (","
                        //                                + (objDO.SafeSQL((CFNameList[i] + (" " + CLNameList[i]))) + (","
                        //                                + (objDO.SafeSQL(CMobileList[i]) + (","
                        //                                + (objDO.SafeSQL(CPhoneList[i]) + ", getdate())"))))))))));
                        //                    System.IO.File.AppendAllText((Application.StartupPath + "\\ErrorLog.txt"), ("ImportContacts: "
                        //                                    + (sSql + "\r\n")));
                        //                    objDO.ExecuteSQL(sSql);
                        //                }

                        //            }
                        //            catch (Exception ex)
                        //            {
                        //                System.IO.File.AppendAllText((Application.StartupPath + "\\ErrorLog.txt"), ("Import Contacts: "
                        //                                + (ex.Message + "\r\n")));
                        //            }

                        //        }

                        //    }

                        //    for (int i = 0; (i
                        //                <= (ProvinceCodeList.Count - 1)); i++)
                        //    {
                        //        if ((ProvinceCodeList[i] != ""))
                        //        {
                        //            try
                        //            {
                        //                if (IsProvinceExists(ProvinceCodeList[i]))
                        //                {
                        //                    sSql = ("Update Country Set Name = "
                        //                                + (objDO.SafeSQL(ProvinceList[i]) + (" Where Code= " + objDO.SafeSQL(ProvinceCodeList[i]))));
                        //                    System.IO.File.AppendAllText((Application.StartupPath + "\\ErrorLog.txt"), ("Import Province: "
                        //                                    + (sSql + "\r\n")));
                        //                    objDO.ExecuteSQL(sSql);
                        //                }
                        //                else
                        //                {
                        //                    sSql = ("Insert into Country(Code, Name) Values ("
                        //                                + (objDO.SafeSQL(ProvinceCodeList[i]) + (","
                        //                                + (objDO.SafeSQL(ProvinceList[i]) + ")"))));
                        //                    System.IO.File.AppendAllText((Application.StartupPath + "\\ErrorLog.txt"), ("Import Province: "
                        //                                    + (sSql + "\r\n")));
                        //                    objDO.ExecuteSQL(sSql);
                        //                }

                        //            }
                        //            catch (Exception ex)
                        //            {
                        //                System.IO.File.AppendAllText((Application.StartupPath + "\\ErrorLog.txt"), ("Import Province: "
                        //                                + (ex.Message + "\r\n")));
                        //            }

                        //        }

                        //    }

                        //    // // return toReturn;
                        //    //}

                        //}
                        else if (tableName.ToLower() == "distributor")
                        {
                            int toReturn = 1;
                            int icnt;

                            string sSql = string.Empty;
                            string sNation = string.Empty; string sSalesRegion = string.Empty; string sTerritory = string.Empty; string sDistrCode = string.Empty; string sOracleCustID = string.Empty; string sDistr = string.Empty; string sSalesOfficeID = string.Empty; string sSalesOffice = string.Empty; string sSalesmanTerritory = string.Empty;

                            int sSalesmanTerritorySort = 0;
                            int sDistrSort = 0;

                            List<String> DistrCodeList = new List<String>();
                            List<String> OracleCustIDList = new List<String>();
                            List<String> DistrNameList = new List<String>();
                            List<int> DistrSortList = new List<int>();
                            // Dim SalesOfficeIDList As New ArrayList
                            // Dim SalesOfficeNameList As New ArrayList
                            for (icnt = 1; (icnt <= (ds.Tables[tableName].Rows.Count - 2)); icnt++)
                            {
                                try
                                {
                                    if (ds.Tables[tableName].Rows[icnt][0].ToString().Replace("'", string.Empty) == null)
                                    //  if ((IsDBNull(dgvData.Item[0, icnt].Value) == true))
                                    {
                                        sNation = "";
                                        //string sNation;
                                        //string sSalesRegion;
                                        //string sTerritory;
                                        //string sDistrCode;
                                        //string sOracleCustID;
                                        //string sDistr;
                                        //string sSalesOfficeID;
                                        //string sSalesOffice;
                                        //string sSalesmanTerritory;
                                    }
                                    else
                                    {
                                        if (ds.Tables[tableName].Rows[icnt][0].ToString().Length > 50)
                                        {
                                            //MsgBox(("Nation exceeds 50 characters" + ("\r\n" + (" Line No : "
                                            //                + (icnt + 1)))), MsgBoxStyle.Critical, "Node Tree");
                                            toReturn = 2;
                                            //return toReturn;
                                        }

                                        sNation = ds.Tables[tableName].Rows[icnt][0].ToString();
                                        sNation = sNation.Replace("\"", "");
                                        sNation = sNation.Replace("\0", "");
                                    }

                                    if (ds.Tables[tableName].Rows[icnt][1].ToString().Replace("'", string.Empty) == null)
                                    {
                                        sSalesRegion = "";
                                    }
                                    else
                                    {
                                        if ((ds.Tables[tableName].Rows[icnt][1].ToString().Length > 50))
                                        {
                                            //MsgBox(("Sales Region exceeds 50 characters" + ("\r\n" + (" Line No : "
                                            //                + (icnt + 1)))), MsgBoxStyle.Critical, "Node Tree");
                                            toReturn = 2;
                                            //return toReturn;
                                        }

                                        sSalesRegion = ds.Tables[tableName].Rows[icnt][1].ToString();
                                        sSalesRegion = sSalesRegion.Replace("\"", "");
                                        sSalesRegion = sSalesRegion.Replace("\0", "");
                                    }

                                    if (ds.Tables[tableName].Rows[icnt][2].ToString().Replace("'", string.Empty) == null)
                                    {
                                        sTerritory = "";
                                    }
                                    else
                                    {
                                        if ((ds.Tables[tableName].Rows[icnt][2].ToString().Length > 50))
                                        {
                                            //MsgBox(("Territory exceeds 50 characters" + ("\r\n" + (" Line No : "
                                            //                + (icnt + 1)))), MsgBoxStyle.Critical, "Node Tree");
                                            toReturn = 2;
                                            //// return toReturn;
                                        }

                                        sTerritory = ds.Tables[tableName].Rows[icnt][2].ToString();
                                        sTerritory = sTerritory.Replace("\"", "");
                                        sTerritory = sTerritory.Replace("\0", "");
                                    }

                                    if (ds.Tables[tableName].Rows[icnt][3].ToString().Replace("'", string.Empty) == null)
                                    {
                                        sDistrCode = "";
                                    }
                                    else
                                    {
                                        if ((ds.Tables[tableName].Rows[icnt][3].ToString().Length > 50))
                                        {
                                            //MsgBox(("Distributor Code exceeds 50 characters" + ("\r\n" + (" Line No : "
                                            //                + (icnt + 1)))), MsgBoxStyle.Critical, "Node Tree");
                                            toReturn = 2;
                                            //return toReturn;
                                        }

                                        sDistrCode = ds.Tables[tableName].Rows[icnt][3].ToString();
                                        sDistrCode = sDistrCode.Replace("\"", "");
                                        sDistrCode = sDistrCode.Replace("\0", "");
                                    }

                                    int flg = 0;
                                    DistrCodeList.Add(sDistrCode);
                                    if (ds.Tables[tableName].Rows[icnt][4].ToString().Replace("'", string.Empty) == null)
                                    {
                                        sOracleCustID = "";
                                    }
                                    else
                                    {
                                        if ((ds.Tables[tableName].Rows[icnt][4].ToString().Length > 50))
                                        {
                                            //MsgBox(("Oracle Customer ID Code exceeds 50 characters" + ("\r\n" + (" Line No : "
                                            //                + (icnt + 1)))), MsgBoxStyle.Critical, "Node Tree");
                                            toReturn = 2;
                                            //// return toReturn;
                                        }

                                        sOracleCustID = ds.Tables[tableName].Rows[icnt][4].ToString();
                                        sOracleCustID = sOracleCustID.Replace("\"", "");
                                        sOracleCustID = sOracleCustID.Replace("\0", "");
                                    }

                                    OracleCustIDList.Add(sOracleCustID);

                                    // if (((IsDBNull(dgvData.Item[5, icnt].Value) == true) || (dgvData.Item[5, icnt].Value.ToString == "")))
                                    if (ds.Tables[tableName].Rows[icnt][5].ToString().Replace("'", string.Empty) == null || ds.Tables[tableName].Rows[icnt][5].ToString().Replace("'", string.Empty) == "")
                                    {
                                        sDistrSort = 0;
                                    }
                                    //else if ((IsNumeric(dgvData.Item[5, icnt].Value.ToString) == false))
                                    else if (ds.Tables[tableName].Rows[icnt][5].ToString().Replace("'", string.Empty) == null)
                                    {
                                        sDistrSort = 0;
                                    }
                                    else
                                    {
                                        sDistrSort = int.Parse(ds.Tables[tableName].Rows[icnt][5].ToString());
                                    }

                                    DistrSortList.Add(sDistrSort);
                                    if (ds.Tables[tableName].Rows[icnt][6].ToString().Replace("'", string.Empty) == null)
                                    {
                                        sDistr = "";
                                    }
                                    else
                                    {
                                        if ((ds.Tables[tableName].Rows[icnt][6].ToString().Length > 50))
                                        {
                                            //MsgBox(("Distributor exceeds 50 characters" + ("\r\n" + (" Line No : "
                                            //                + (icnt + 1)))), MsgBoxStyle.Critical, "Node Tree");
                                            toReturn = 2;
                                            //// return toReturn;
                                        }

                                        sDistr = ds.Tables[tableName].Rows[icnt][6].ToString();
                                        sDistr = sDistr.Replace("\"", "");
                                        sDistr = sDistr.Replace("\0", "");
                                    }

                                    DistrNameList.Add(sDistr);
                                    if (ds.Tables[tableName].Rows[icnt][7].ToString().Replace("'", string.Empty) == null)
                                    {
                                        sSalesOfficeID = "";
                                    }
                                    else
                                    {
                                        if ((ds.Tables[tableName].Rows[icnt][7].ToString().Length > 50))
                                        {
                                            //   //MsgBox(("SalesOffice ID exceeds 50 characters" + ("\r\n" + (" Line No : "
                                            //                    + (icnt + 1)))), MsgBoxStyle.Critical, "Node Tree");
                                            toReturn = 2;
                                            //return toReturn;
                                        }

                                        sSalesOfficeID = ds.Tables[tableName].Rows[icnt][7].ToString();
                                        sSalesOfficeID = sSalesOfficeID.Replace("\"", "");
                                        sSalesOfficeID = sSalesOfficeID.Replace("\0", "");
                                    }

                                    // SalesOfficeIDList.Add(sSalesOfficeID)
                                    if (ds.Tables[tableName].Rows[icnt][8].ToString().Replace("'", string.Empty) == null)
                                    {
                                        sSalesOffice = "";
                                    }
                                    else
                                    {
                                        if ((ds.Tables[tableName].Rows[icnt][8].ToString().Length > 50))
                                        {
                                            //MsgBox(("SalesOffice exceeds 50 characters" + ("\r\n" + (" Line No : "
                                            //                + (icnt + 1)))), MsgBoxStyle.Critical, "Node Tree");
                                            toReturn = 2;
                                            //return toReturn;
                                        }

                                        sSalesOffice = ds.Tables[tableName].Rows[icnt][8].ToString();
                                        sSalesOffice = sSalesOffice.Replace("\"", "");
                                        sSalesOffice = sSalesOffice.Replace("\0", "");
                                    }

                                    // SalesOfficeNameList.Add(sSalesOffice)
                                    if ((ds.Tables[tableName].Rows[icnt][9].ToString().Replace("'", string.Empty) == null || ds.Tables[tableName].Rows[icnt][9].ToString().Replace("'", string.Empty) == ""))
                                    {
                                        sSalesmanTerritorySort = 0;
                                    }
                                    else if ((ds.Tables[tableName].Rows[icnt][9].ToString().Replace("'", string.Empty) == null))
                                    {
                                        sSalesmanTerritorySort = 0;
                                    }
                                    else
                                    {
                                        sSalesmanTerritorySort = int.Parse(ds.Tables[tableName].Rows[icnt][9].ToString());
                                    }

                                    if (ds.Tables[tableName].Rows[icnt][10].ToString().Replace("'", string.Empty) == null)
                                    {
                                        sSalesmanTerritory = "";
                                    }
                                    else
                                    {
                                        if ((ds.Tables[tableName].Rows[icnt][10].ToString().Length > 50))
                                        {
                                            //MsgBox(("Salesman Territory exceeds 50 characters" + ("\r\n" + (" Line No : "
                                            //                + (icnt + 1)))), MsgBoxStyle.Critical, "Node Tree");
                                            toReturn = 2;
                                            //return toReturn;
                                        }

                                        sSalesmanTerritory = ds.Tables[tableName].Rows[icnt][10].ToString();
                                        sSalesmanTerritory = sSalesmanTerritory.Replace("\"", "");
                                        sSalesmanTerritory = sSalesmanTerritory.Replace("\0", "");
                                    }

                                    if (((sSalesmanTerritory == "") || (sSalesOfficeID == "")))
                                    {
                                        // TODO: Continue For... Warning!!! not translated
                                    }


                                    if (ImportObj.IsNodeTreeExists(sSalesmanTerritory, sSalesOfficeID))
                                    {
                                        connection();

                                        sSql = "Update NodeTree Set  DistributorID='"
                                                    + sDistrCode + "', Territory='"
                                                    + sTerritory + "', SalesRegion='"
                                                    + sSalesRegion + "' ,Nation='"
                                                    + sNation + "',DisplayNo='"
                                                    + sSalesmanTerritorySort + " Where SalesManTerritory= "
                                                    + sSalesmanTerritory + "' and SalesOfficeID='" + sSalesOfficeID + "'";
                                        //System.IO.File.AppendAllText((Application.StartupPath + "\\ErrorLog.txt"), ("Import Node Tree:: "
                                        //                + (sSql + "\r\n")));
                                        //objDO.ExecuteSQL(sSql);

                                        con.Open();
                                        SqlCommand cmd = new SqlCommand(sSql, con);
                                        cmd.ExecuteNonQuery();
                                        con.Close();



                                    }
                                    else
                                    {
                                        connection();
                                        sSql = "Insert into NodeTree(SalesManTerritory, SalesOfficeID, DistributorID, Territory,SalesRegion, Nation, " +
                                        "DisplayNo) Values ('"
                                                    + sSalesmanTerritory + "','"
                                                    + sSalesOfficeID + "','"
                                                    + sDistrCode + "','"
                                                    + sTerritory + "','"
                                                    + sSalesRegion + "','"
                                                    + sNation + "','"
                                                    + sSalesmanTerritorySort + "')";
                                        //System.IO.File.AppendAllText((Application.StartupPath + "\\ErrorLog.txt"), ("Import Node Tree: "
                                        //                + (sSql + "\r\n")));
                                        //  objDO.ExecuteSQL(sSql);

                                        con.Open();
                                        SqlCommand cmd = new SqlCommand(sSql, con);
                                        cmd.ExecuteNonQuery();
                                        con.Close();
                                    }


                                }
                                catch (Exception ex)
                                {
                                    //System.IO.File.AppendAllText((Application.StartupPath + "\\ErrorLog.txt"), ("Import Node Tree: "
                                    //                + (ex.Message + "\r\n")));
                                }

                            }


                            for (int i = 0; (i <= (DistrCodeList.Count - 1)); i++)
                            {
                                try
                                {
                                    if ((DistrCodeList[i] != ""))
                                    {
                                        connection();
                                        query = "";
                                        if (ImportObj.IsDistributorExists(DistrCodeList[i]))
                                        {


                                            query = ("Update Distributor Set DistributorName='"
                                                        + DistrNameList[i] + "', DisplayNo='"
                                                        + DistrSortList[i] + "', DTG=GetDate(), Active=1 Where DistributorID='" + DistrCodeList[i]);
                                        }
                                        else
                                        {

                                            query = "Insert into Distributor(DistributorID,DistributorName, DisplayNo,DTG,Active) values('"
                                                        + DistrCodeList[i] + "','"
                                                        + DistrNameList[i] + "','"
                                                        + DistrSortList[i] + ",GetDate(),1)";

                                        }

                                        con.Open();
                                        SqlCommand cmd = new SqlCommand(query, con);
                                        cmd.ExecuteNonQuery();
                                        con.Close();
                                        query = "";


                                        if (ImportObj.IsCrossReferenceExists("JSU", DistrCodeList[i], "DISTRIBUTOR"))
                                        {
                                            query = ("Update CrossReference Set ThirdParty=\'JSU\' Where ThirdPartyCode='"
                                                        + OracleCustIDList[i] + "' and SimplrCode='"
                                                        + DistrCodeList[i] + "' and CrossReferenceType=\'DISTRIBUTOR\'");
                                        }
                                        else
                                        {
                                            connection();
                                            query = "";
                                            query = "Insert into CrossReference(ThirdParty,CrossReferenceType, SimplrCode,ThirdPartyCode) values(\'JSU\',\'DI" +
                                                       "STRIBUTOR\','"
                                                       + DistrCodeList[i] + "','"
                                                       + OracleCustIDList[i] + "')";
                                        }

                                        con.Open();
                                        cmd = new SqlCommand(query, con);
                                        cmd.ExecuteNonQuery();
                                        con.Close();
                                    }

                                }
                                catch (Exception ex)
                                {
                                    //System.IO.File.AppendAllText((Application.StartupPath + "\\ErrorLog.txt"), ("Import Node Tree Subsidaries: "
                                    //                + (ex.Message + "\r\n")));
                                }

                            }


                            ImportObj.insertErrorLog(" Insert into ErrorLog(DTG, FunctionName, CompanyName, ErrorText) values (GetDate(),'Store Master Imported','','' ) ");
                        }



                    }

                    //////OleDbConnection excelConnection = new OleDbConnection(excelConnectionString);
                    //////excelConnection.Open();
                    //////DataTable dt = new DataTable();

                    //////dt = excelConnection.GetOleDbSchemaTable(OleDbSchemaGuid.Tables, null);
                    //////if (dt == null)
                    //////{
                    //////    return null;
                    //////}

                    //////String[] excelSheets = new String[dt.Rows.Count];
                    //////int t = 0;
                    ////////excel data saves in temp file here.
                    //////foreach (DataRow row in dt.Rows)
                    //////{
                    //////    excelSheets[t] = row["TABLE_NAME"].ToString();
                    //////    t++;
                    //////}
                    //////OleDbConnection excelConnection1 = new OleDbConnection(excelConnectionString);
                    ////VImportObj.executeSQL(" Update System set Status='Not Completed' ");
                    ////VImportObj.insertErrorLog(" Insert into ErrorLog(DTG, FunctionName, CompanyName, ErrorText) values (GetDate(),'Import - DB Connected','','' ) ");

                    //////string[] splitValue = tableName.Split(',');

                    ////foreach (DataTable dt in ds.Tables)
                    ////{

                    ////    //tableName = tableName.Replace("'", string.Empty);
                    ////    //tableName = splitValue[count].Replace("'", string.Empty);
                    ////    //string table = "Select * from [" + tableName + "$]";
                    ////    ////string query = string.Format("Select * from [{0}]", excelSheets[0]);
                    ////    //string query = string.Format(table, excelSheets[0]);
                    ////    //using (OleDbDataAdapter dataAdapter = new OleDbDataAdapter(query, excelConnection1))
                    ////    //{
                    ////    //    dataAdapter.Fill(ds);
                    ////    //}
                    ////    //excelConnection1.Close();
                    ////    //excelConnection.Close();
                    ////    tableName = dt.TableName;
                    ////    string query = "";
                    ////    if (tableName.ToLower() == "store master")
                    ////    {
                    ////        int iActive = 0;
                    ////        string[] postCode;
                    ////        query = " Update Customer set Active = 0 ";
                    ////        connection();
                    ////        con.Open();
                    ////        SqlCommand cmd = new SqlCommand(query, con);
                    ////        cmd.ExecuteNonQuery();
                    ////        con.Close();
                    ////        query = "";
                    ////        VImportExcelRepository ImportObj = new VImportExcelRepository();
                    ////        for (int i = 0; i < ds.Tables[tableName].Rows.Count; i++)
                    ////        {
                    ////            if (ds.Tables[tableName].Rows[i][7].ToString() == "Active")
                    ////            {
                    ////                iActive = 1;
                    ////            }
                    ////            else
                    ////            {
                    ////                iActive = 0;
                    ////            }
                    ////            if (ImportObj.IsCustomerExists(ds.Tables[tableName].Rows[i][0].ToString()) == false)
                    ////            {
                    ////                query += " Insert into Customer(CustNo, CustName, ChineseName, Address, Address2, Address3, Address4, PostCode, City, CountryCode, Phone, ContactPerson, Balance, CreditLimit, ProvisionalBalance, ZoneCode, FaxNo, Email, Website, ICPartner, PriceGroup, PaymentTerms, PaymentMethod, ShipmentMethod, SalesAgent, ShipAgent, Category, Dimension1, Dimension2, [Bill-toNo], InvDisGroup, Location, CurrencyCode, Active, CustPostGroup, DisplayNo, CustType, Photo, MemberType, GSTCustGroup, Exported, SearchName, SupplierCode, ShipName, ShipAddr, ShipAddr2, ShipAddr3, ShipAddr4, ShipPost, ShipCity, [Print],GSTType, Basket, MDTNo, ExportExclude, AcCustCode, AcBranchRef, Remarks, CommissionCode, Rebate, CustDiscGroup, BillMultiple, NoGST, ToPDA, CompanyName, Blocked, PrintPayTerms, Zones, SalesCoordinator, CustClass, MobileNo, GSTNo, Longitude, Latitude, StockTakeRequired, ScanRequired, DTG, CustSince, Ranking, PaymentStatus, IsConfirmed, ConfirmedBy, CustRouteNo, RouteFrequency, Remarks2) Values  ('" + ds.Tables[tableName].Rows[i][0].ToString() + "','" + ds.Tables[tableName].Rows[i][4].ToString().Replace("'", string.Empty) + "','" + ds.Tables[tableName].Rows[i][4].ToString().Replace("'", string.Empty) + "','" + ds.Tables[tableName].Rows[i][5].ToString().Replace("'", string.Empty) + "','','','','" + ds.Tables[tableName].Rows[i][6].ToString().Replace("'", string.Empty) + "','','','','',0,0,0,'STD','','','','','STD','COD','CASH','','ADMIN','','','','','','','" + ds.Tables[tableName].Rows[i][1].ToString().Replace("'", string.Empty) + "','','" + iActive + "','','" + i + "','" + ds.Tables[tableName].Rows[i][3].ToString() + "','','','',1,'" + ds.Tables[tableName].Rows[i][4].ToString().Replace("'", string.Empty) + "','" + ds.Tables[tableName].Rows[i][2].ToString() + "','" + ds.Tables[tableName].Rows[i][4].ToString().Replace("'", string.Empty) + "','','','','','" + ds.Tables[tableName].Rows[i][6].ToString() + "','','Invoice','Exclusive',0,'',0,'" + ds.Tables[tableName].Rows[i][0].ToString() + "','','','',0,'',0,0,1,'','','COD','','','','','',0,0,0,0,GETDATE(),GETDATE(),'','',2,'','',1,'') ;  ";
                    ////                //con.Open();
                    ////                //cmd = new SqlCommand(query, con);
                    ////                //cmd.ExecuteNonQuery();
                    ////                //con.Close();
                    ////            }

                    ////            else
                    ////            {
                    ////                query += " Update Customer Set CustName='" + ds.Tables[tableName].Rows[i][4].ToString().Replace("'", string.Empty) + "',ChineseName = '" + ds.Tables[tableName].Rows[i][4].ToString().Replace("'", string.Empty) + "',SearchName = '" + ds.Tables[tableName].Rows[i][4].ToString().Replace("'", string.Empty) + "', Address = '" + ds.Tables[tableName].Rows[i][5].ToString().Replace("'", string.Empty) + "',PostCode = '" + ds.Tables[tableName].Rows[i][6].ToString() + "',SupplierCode='" + ds.Tables[tableName].Rows[i][2].ToString().Replace("'", string.Empty) + "',ShipName ='" + ds.Tables[tableName].Rows[i][4].ToString().Replace("'", string.Empty) + "', ShipAddr ='',Active = '" + iActive + "', ToPDA=1, CustType ='" + ds.Tables[tableName].Rows[i][3].ToString().Replace("'", string.Empty) + "', Location ='" + ds.Tables[tableName].Rows[i][1].ToString().Replace("'", string.Empty) + "' Where CustNo= '" + ds.Tables[tableName].Rows[i][0].ToString() + "' ;  ";
                    ////                //con.Open();
                    ////                //cmd = new SqlCommand(query, con);
                    ////                //cmd.ExecuteNonQuery();
                    ////                //con.Close();
                    ////            }

                    ////        }
                    ////        con.Open();
                    ////        cmd = new SqlCommand(query, con);
                    ////        cmd.ExecuteNonQuery();
                    ////        con.Close();

                    ////        query = " Select Distinct PostCode from Customer where Active=1 and (Latitude=0 or Longitude=0 or Latitude is Null or Longitude is Null) and PostCode<>'' order by PostCode ";
                    ////        connection();
                    ////        con1.Open();
                    ////        cmd = new SqlCommand(query, con1);
                    ////        SqlDataReader drr = cmd.ExecuteReader();
                    ////        while (drr.Read())
                    ////        {
                    ////            postCode = new string[drr.FieldCount];
                    ////            for (int i = 0; i < drr.FieldCount; i++)
                    ////            {
                    ////                postCode[i] = drr[i].ToString();
                    ////            }
                    ////            //con.Close();
                    ////            for (int j = 0; j < postCode.Length; j++)
                    ////            {
                    ////                string sLoc = ImportObj.GetGeoCoords("Singapore " + postCode[j].ToString(), 1);
                    ////                if (sLoc != "")
                    ////                {

                    ////                    string[] S = sLoc.Split(',');
                    ////                    query = " UPDATE Customer SET Longitude= '" + S[1].ToString() + "' , Latitude='" + S[0].ToString() + "' Where PostCode='" + postCode[j].ToString() + "' ";

                    ////                    con.Open();
                    ////                    cmd = new SqlCommand(query, con);
                    ////                    cmd.ExecuteNonQuery();
                    ////                    con.Close();
                    ////                }

                    ////            }
                    ////        }
                    ////        con1.Close();
                    ////        ImportObj.insertErrorLog(" Insert into ErrorLog(DTG, FunctionName, CompanyName, ErrorText) values (GetDate(),'Store Master Imported','','' ) ");
                    ////    }
                    ////    else if (tableName.ToLower() == "product list")
                    ////    {
                    ////        query = " Delete from Category ; Delete from SubCategory ";
                    ////        connection();
                    ////        con.Open();
                    ////        SqlCommand cmd = new SqlCommand(query, con);
                    ////        cmd.ExecuteNonQuery();
                    ////        con.Close();
                    ////        query = "";
                    ////        VImportExcelRepository ImportObj = new VImportExcelRepository();
                    ////        for (int i = 0; i < ds.Tables[tableName].Rows.Count; i++)
                    ////        {
                    ////            if (ImportObj.IsCategoryExists(ds.Tables[tableName].Rows[i][0].ToString()) == false)
                    ////            {
                    ////                query += " Insert into Category(Code, Description) values ('" + ds.Tables[tableName].Rows[i][0].ToString() + "','" + ds.Tables[tableName].Rows[i][1].ToString() + "') ; ";
                    ////                //con.Open();
                    ////                //cmd = new SqlCommand(query, con);
                    ////                //cmd.ExecuteNonQuery();
                    ////                //con.Close();
                    ////            }

                    ////            if (ImportObj.IsSubCategoryExists(ds.Tables[tableName].Rows[i][0].ToString(), ds.Tables[tableName].Rows[i][2].ToString()) == false)
                    ////            {
                    ////                query += "Insert into SubCategory(SubCategoryCode, CategoryCode, Description) values ('" + ds.Tables[tableName].Rows[i][2].ToString() + "','" + ds.Tables[tableName].Rows[i][0].ToString() + "','" + ds.Tables[tableName].Rows[i][1].ToString() + "' ) ;  ";
                    ////                //con.Open();
                    ////                //cmd = new SqlCommand(query, con);
                    ////                //cmd.ExecuteNonQuery();
                    ////                //con.Close();
                    ////            }

                    ////        }
                    ////        con.Open();
                    ////        cmd = new SqlCommand(query, con);
                    ////        cmd.ExecuteNonQuery();
                    ////        con.Close();

                    ////        ImportObj.insertErrorLog(" Insert into ErrorLog(DTG, FunctionName, CompanyName, ErrorText) values (GetDate(),'Product List Imported','','' ) ");

                    ////    }
                    ////    else if (tableName.ToLower() == "route plan")
                    ////    {
                    ////        string rWeek = "";
                    ////        query = " Delete from CustomerSchedule ";
                    ////        connection();
                    ////        con.Open();
                    ////        SqlCommand cmd = new SqlCommand(query, con);
                    ////        cmd.ExecuteNonQuery();
                    ////        con.Close();
                    ////        query = "";
                    ////        VImportExcelRepository ImportObj = new VImportExcelRepository();
                    ////        for (int i = 0; i < ds.Tables[tableName].Rows.Count; i++)
                    ////        {
                    ////            if (ds.Tables[tableName].Rows[i][3].ToString() == "")
                    ////            {
                    ////                rWeek = "W1, W2, W3, W4";
                    ////            }
                    ////            else
                    ////            {
                    ////                rWeek = ds.Tables[tableName].Rows[i][3].ToString();
                    ////            }
                    ////            query += " Insert into CustomerSchedule(RouteName, CUSTNO, SALESAGENT, RDAY, RWeek) values  ('" + ds.Tables[tableName].Rows[i][0].ToString() + "','" + ds.Tables[tableName].Rows[i][4].ToString() + "','" + ds.Tables[tableName].Rows[i][1].ToString() + "','" + ds.Tables[tableName].Rows[i][2].ToString() + "','" + rWeek + "' ) ; ";
                    ////            //con.Open();
                    ////            //cmd = new SqlCommand(query, con);
                    ////            //cmd.ExecuteNonQuery();
                    ////            //con.Close();
                    ////        }
                    ////        con.Open();
                    ////        cmd = new SqlCommand(query, con);
                    ////        cmd.ExecuteNonQuery();
                    ////        con.Close();

                    ////        ImportObj.insertErrorLog(" Insert into ErrorLog(DTG, FunctionName, CompanyName, ErrorText) values (GetDate(),'Route Plan Imported','','' ) ");
                    ////    }
                    ////    else if (tableName.ToLower() == "user list")
                    ////    {
                    ////        int iAccess = 0, iActive = 0;
                    ////        string Name = "";
                    ////        query = " Update SalesAgent Set Active=0 where Code<>'ADMIN' ";
                    ////        connection();
                    ////        con.Open();
                    ////        SqlCommand cmd = new SqlCommand(query, con);
                    ////        cmd.ExecuteNonQuery();
                    ////        con.Close();
                    ////        query = "";
                    ////        VImportExcelRepository ImportObj = new VImportExcelRepository();
                    ////        for (int i = 0; i < ds.Tables[tableName].Rows.Count; i++)
                    ////        {
                    ////            Name = ds.Tables[tableName].Rows[i][1].ToString() + " " + ds.Tables[tableName].Rows[i][2].ToString();
                    ////            if (ds.Tables[tableName].Rows[i][9].ToString() == "SG Retail Assistant")
                    ////            {
                    ////                iAccess = 1;
                    ////            }
                    ////            else if (ds.Tables[tableName].Rows[i][9].ToString() == "SG PE Ops")
                    ////            {
                    ////                iAccess = 3;
                    ////            }
                    ////            else
                    ////            {
                    ////                iAccess = 2;
                    ////            }
                    ////            if (ds.Tables[tableName].Rows[i][6].ToString() == "Active")
                    ////            {
                    ////                iActive = 1;
                    ////            }
                    ////            else
                    ////            {
                    ////                iActive = 0;
                    ////            }
                    ////            if (ImportObj.IsSalesAgentExists(ds.Tables[tableName].Rows[i][3].ToString()) == false)
                    ////            {
                    ////                query += " Insert into SalesAgent(Code, Name, Phone, Email, Password, UserID, Access, Active, SalesTarget, IsDriver, IsSupervisor, SalesSupervisor, Department, SupervisorCode,CommissionCode, SolutionName) Values ('" + ds.Tables[tableName].Rows[i][3].ToString() + "','" + Name + "','" + ds.Tables[tableName].Rows[i][5].ToString() + "','" + ds.Tables[tableName].Rows[i][7].ToString() + "','" + ds.Tables[tableName].Rows[i][4].ToString() + "','" + ds.Tables[tableName].Rows[i][3].ToString() + "','" + iAccess + "','" + iActive + "',0,0,0,0,'" + ds.Tables[tableName].Rows[i][9].ToString() + "','" + ds.Tables[tableName].Rows[i][10].ToString() + "','" + ds.Tables[tableName].Rows[i][8].ToString() + "','SALES') ;  ";
                    ////                //con.Open();
                    ////                //cmd = new SqlCommand(query, con);
                    ////                //cmd.ExecuteNonQuery();
                    ////                //con.Close();
                    ////            }
                    ////            else
                    ////            {
                    ////                query += " Update SalesAgent Set Name='" + Name + "', Phone='" + ds.Tables[tableName].Rows[i][5].ToString() + "', Email='" + ds.Tables[tableName].Rows[i][7].ToString() + "', Password='" + ds.Tables[tableName].Rows[i][4].ToString() + "', UserID='" + ds.Tables[tableName].Rows[i][3].ToString() + "', Access='" + iAccess + "', Active='" + iActive + "', Department='" + ds.Tables[tableName].Rows[i][9].ToString() + "', SupervisorCode='" + ds.Tables[tableName].Rows[i][10].ToString() + "',CommissionCode='" + ds.Tables[tableName].Rows[i][8].ToString() + "' where Code='" + ds.Tables[tableName].Rows[i][3].ToString() + "' ;  ";
                    ////                //con.Open();
                    ////                //cmd = new SqlCommand(query, con);
                    ////                //cmd.ExecuteNonQuery();
                    ////                //con.Close();
                    ////            }
                    ////        }
                    ////        con.Open();
                    ////        cmd = new SqlCommand(query, con);
                    ////        cmd.ExecuteNonQuery();
                    ////        con.Close();

                    ////        ImportObj.insertErrorLog(" Insert into ErrorLog(DTG, FunctionName, CompanyName, ErrorText) values (GetDate(),'User List Imported','','' ) ");
                    ////    }
                    ////    else if (tableName.ToLower() == "display master")
                    ////    {
                    ////        query = " Delete from DisplayMaster ";
                    ////        connection();
                    ////        con.Open();
                    ////        SqlCommand cmd = new SqlCommand(query, con);
                    ////        cmd.ExecuteNonQuery();
                    ////        con.Close();
                    ////        query = "";
                    ////        VImportExcelRepository ImportObj = new VImportExcelRepository();
                    ////        for (int i = 0; i < ds.Tables[tableName].Rows.Count; i++)
                    ////        {
                    ////            if (ImportObj.IsDisplayMasterExists(ds.Tables[tableName].Rows[i][0].ToString(), ds.Tables[tableName].Rows[i][6].ToString(), ds.Tables[tableName].Rows[i][2].ToString(), ds.Tables[tableName].Rows[i][4].ToString()) == false)
                    ////            {
                    ////                query += " Insert into DisplayMaster(DisplayCode, DisplayDesc, SubcategoryCode, BrandCode, DisplayType) values ('" + ds.Tables[tableName].Rows[i][0].ToString() + "','" + ds.Tables[tableName].Rows[i][1].ToString().Replace("'", string.Empty) + "','" + ds.Tables[tableName].Rows[i][2].ToString() + "','" + ds.Tables[tableName].Rows[i][4].ToString() + "','" + ds.Tables[tableName].Rows[i][6].ToString() + "' ) ;  ";
                    ////                //con.Open();
                    ////                //cmd = new SqlCommand(query, con);
                    ////                //cmd.ExecuteNonQuery();
                    ////                //con.Close();
                    ////            }
                    ////        }
                    ////        con.Open();
                    ////        cmd = new SqlCommand(query, con);
                    ////        cmd.ExecuteNonQuery();
                    ////        con.Close();

                    ////        ImportObj.insertErrorLog(" Insert into ErrorLog(DTG, FunctionName, CompanyName, ErrorText) values (GetDate(),'Display Master Imported','','' ) ");
                    ////    }
                    ////    else if (tableName.ToLower() == "display mapping")
                    ////    {
                    ////        query = " Delete from DisplayMapping ";
                    ////        connection();
                    ////        con.Open();
                    ////        SqlCommand cmd = new SqlCommand(query, con);
                    ////        cmd.ExecuteNonQuery();
                    ////        con.Close();
                    ////        query = "";
                    ////        VImportExcelRepository ImportObj = new VImportExcelRepository();
                    ////        for (int i = 0; i < ds.Tables[tableName].Rows.Count; i++)
                    ////        {
                    ////            if (ImportObj.IsDisplayMappingExists(ds.Tables[tableName].Rows[i][0].ToString(), ds.Tables[tableName].Rows[i][2].ToString(), ds.Tables[tableName].Rows[i][4].ToString(), Convert.ToDateTime(DateTime.ParseExact(ds.Tables[tableName].Rows[i][5].ToString(), "dd/MM/yyyy", CultureInfo.InvariantCulture)), Convert.ToDateTime(DateTime.ParseExact(ds.Tables[tableName].Rows[i][6].ToString(), "dd/MM/yyyy", CultureInfo.InvariantCulture))) == false)
                    ////            {
                    ////                query += " Insert into DisplayMapping(DisplayCode, CustNo, TargetValue, StartDate, EndDate) values ('" + ds.Tables[tableName].Rows[i][0].ToString() + "','" + ds.Tables[tableName].Rows[i][2].ToString() + "','" + ds.Tables[tableName].Rows[i][4].ToString() + "','" + Convert.ToDateTime(DateTime.ParseExact(ds.Tables[tableName].Rows[i][5].ToString(), "dd/MM/yyyy", CultureInfo.InvariantCulture)).ToString() + "','" + Convert.ToDateTime(DateTime.ParseExact(ds.Tables[tableName].Rows[i][6].ToString(), "dd/MM/yyyy", CultureInfo.InvariantCulture)).ToString() + "' ) ;  ";
                    ////                //con.Open();
                    ////                //cmd = new SqlCommand(query, con);
                    ////                //cmd.ExecuteNonQuery();
                    ////                //con.Close();
                    ////            }
                    ////        }
                    ////        con.Open();
                    ////        cmd = new SqlCommand(query, con);
                    ////        cmd.ExecuteNonQuery();
                    ////        con.Close();

                    ////        ImportObj.insertErrorLog(" Insert into ErrorLog(DTG, FunctionName, CompanyName, ErrorText) values (GetDate(),'Display Mapping Imported','','' ) ");
                    ////    }
                    ////    else if (tableName.ToLower() == "promotion master")
                    ////    {
                    ////        query = " Delete from PromotionMaster ";
                    ////        connection();
                    ////        con.Open();
                    ////        SqlCommand cmd = new SqlCommand(query, con);
                    ////        cmd.ExecuteNonQuery();
                    ////        con.Close();
                    ////        query = "";
                    ////        VImportExcelRepository ImportObj = new VImportExcelRepository();
                    ////        for (int i = 0; i < ds.Tables[tableName].Rows.Count; i++)
                    ////        {
                    ////            if (ImportObj.IsDisplayMasterExists(ds.Tables[tableName].Rows[i][0].ToString(), ds.Tables[tableName].Rows[i][6].ToString(), ds.Tables[tableName].Rows[i][2].ToString(), ds.Tables[tableName].Rows[i][4].ToString()) == false)
                    ////            {
                    ////                query += " Insert into PromotionMaster(PromotionCode, PromotionDesc, SubcategoryCode, BrandCode, PromotionType) values ('" + ds.Tables[tableName].Rows[i][0].ToString() + "','" + ds.Tables[tableName].Rows[i][1].ToString().Replace("'", string.Empty) + "','" + ds.Tables[tableName].Rows[i][2].ToString() + "','" + ds.Tables[tableName].Rows[i][4].ToString() + "','" + ds.Tables[tableName].Rows[i][6].ToString() + "' ) ;  ";
                    ////                //con.Open();
                    ////                //cmd = new SqlCommand(query, con);
                    ////                //cmd.ExecuteNonQuery();
                    ////                //con.Close();
                    ////            }
                    ////        }
                    ////        con.Open();
                    ////        cmd = new SqlCommand(query, con);
                    ////        cmd.ExecuteNonQuery();
                    ////        con.Close();

                    ////        ImportObj.insertErrorLog(" Insert into ErrorLog(DTG, FunctionName, CompanyName, ErrorText) values (GetDate(),'Promotion Master Imported','','' ) ");
                    ////    }
                    ////    else if (tableName.ToLower() == "promotion mapping")
                    ////    {
                    ////        query = " Delete from PromotionMapping ";
                    ////        connection();
                    ////        con.Open();
                    ////        SqlCommand cmd = new SqlCommand(query, con);
                    ////        cmd.ExecuteNonQuery();
                    ////        con.Close();
                    ////        query = "";
                    ////        VImportExcelRepository ImportObj = new VImportExcelRepository();
                    ////        for (int i = 0; i < ds.Tables[tableName].Rows.Count; i++)
                    ////        {
                    ////            if (ImportObj.IsPromotionMappingExists(ds.Tables[tableName].Rows[i][0].ToString(), ds.Tables[tableName].Rows[i][2].ToString(), ds.Tables[tableName].Rows[i][6].ToString(), Convert.ToDateTime(DateTime.ParseExact(ds.Tables[tableName].Rows[i][4].ToString(), "dd/MM/yyyy", CultureInfo.InvariantCulture)), Convert.ToDateTime(DateTime.ParseExact(ds.Tables[tableName].Rows[i][5].ToString(), "dd/MM/yyyy", CultureInfo.InvariantCulture))) == false)
                    ////            {
                    ////                query += " Insert into PromotionMapping(PromotionCode, CustNo, PromotionType, StartDate, EndDate) values  ('" + ds.Tables[tableName].Rows[i][0].ToString() + "','" + ds.Tables[tableName].Rows[i][2].ToString() + "','" + ds.Tables[tableName].Rows[i][6].ToString() + "','" + Convert.ToDateTime(DateTime.ParseExact(ds.Tables[tableName].Rows[i][4].ToString(), "dd/MM/yyyy", CultureInfo.InvariantCulture)).ToString() + "','" + Convert.ToDateTime(DateTime.ParseExact(ds.Tables[tableName].Rows[i][5].ToString(), "dd/MM/yyyy", CultureInfo.InvariantCulture)).ToString() + "' ) ;  ";
                    ////                //con.Open();
                    ////                //cmd = new SqlCommand(query, con);
                    ////                //cmd.ExecuteNonQuery();
                    ////                //con.Close();
                    ////            }
                    ////        }
                    ////        con.Open();
                    ////        cmd = new SqlCommand(query, con);
                    ////        cmd.ExecuteNonQuery();
                    ////        con.Close();

                    ////        ImportObj.insertErrorLog(" Insert into ErrorLog(DTG, FunctionName, CompanyName, ErrorText) values (GetDate(),'Promotion Mapping Imported','','' ) ");
                    ////    }
                    ////    else if (tableName.ToLower() == "reason")
                    ////    {
                    ////        query = " Delete from Reason ";
                    ////        connection();
                    ////        con.Open();
                    ////        SqlCommand cmd = new SqlCommand(query, con);
                    ////        cmd.ExecuteNonQuery();
                    ////        con.Close();
                    ////        query = "";
                    ////        VImportExcelRepository ImportObj = new VImportExcelRepository();
                    ////        for (int i = 0; i < ds.Tables[tableName].Rows.Count; i++)
                    ////        {
                    ////            if (ImportObj.IsReasonExists(ds.Tables[tableName].Rows[i][0].ToString()) == false)
                    ////            {
                    ////                query += " Insert into Reason(Code, Description, ReasonType, Active) values  ('" + ds.Tables[tableName].Rows[i][0].ToString() + "','" + ds.Tables[tableName].Rows[i][1].ToString().Replace("'", string.Empty) + "','" + ds.Tables[tableName].Rows[i][2].ToString() + "',1) ;  ";
                    ////                //con.Open();
                    ////                //cmd = new SqlCommand(query, con);
                    ////                //cmd.ExecuteNonQuery();
                    ////                //con.Close();
                    ////            }
                    ////        }
                    ////        con.Open();
                    ////        cmd = new SqlCommand(query, con);
                    ////        cmd.ExecuteNonQuery();
                    ////        con.Close();

                    ////        ImportObj.insertErrorLog(" Insert into ErrorLog(DTG, FunctionName, CompanyName, ErrorText) values (GetDate(),'Store Master Imported','','' ) ");
                    ////    }

                    ////    ds.Dispose();
                    ////}
                    ////VImportObj.insertErrorLog(" Insert into ErrorLog(DTG, FunctionName, CompanyName, ErrorText) values (GetDate(),'Import Completed','','' ) ");
                    ////VImportObj.executeSQL(" Update System set Status='Completed' ");
                }
            }

            return Json("", JsonRequestBehavior.AllowGet);
        }



    }
}
