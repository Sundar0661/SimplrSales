using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace ZPLPrint
{
    public class ZPLPrinting
    {
        public string FolderPath;
        public string ZebraLabelPrinting(DataSet ds, string lblSize)
        {
            var colname = "";
            var repname = "";
            repname = ds.Tables[1].Rows[0]["ReportName"].ToString();

            string zplcode = System.IO.File.ReadAllText(FolderPath + repname + ".txt");

            for (int z = 0; z < ds.Tables[2].Columns.Count; z++)
            {

                colname = ds.Tables[2].Columns[z].ColumnName.ToString();

                                Console.WriteLine(colname);
                if (zplcode.Contains("\" + " + colname + " + \""))
                {
                    if(colname == "EANCode" && ds.Tables[2].Rows[0][colname].ToString().Length == 14)
                        zplcode = zplcode.Replace("\" + " + colname + " + \"", ">;>8" + ds.Tables[2].Rows[0][colname].ToString());
                    else if (colname == "EANCode" && ds.Tables[2].Rows[0][colname].ToString() == "00000000")
                        zplcode = zplcode.Replace("\" + " + colname + " + \"", "");
                    else
                        zplcode = zplcode.Replace("\" + " + colname + " + \"", ds.Tables[2].Rows[0][colname].ToString());
                }
                if (repname == "LabelDesignRep" && colname == "EANCode")
                {
                    if(ds.Tables[2].Rows[0][colname].ToString() == "00000000" || ds.Tables[2].Rows[0][colname].ToString() == "")
                    {
                        zplcode = zplcode.Replace("^BEN,60,Y,N", "^FX^FS");
                    }
                    else if (CheckEAN13(ds.Tables[2].Rows[0][colname].ToString()) == true)
                    {
                       // zplcode = zplcode.Replace("^BCN,60,Y,N", "^BEN,60,Y,N");
                        //zplcode = zplcode.Replace("^FT25,160^BY1", "^FT25,160^BY2");
                       
                        //zplcode = zplcode.Replace("^B8N,60,Y,N", "^BEN,60,Y,N");
                        //zplcode = zplcode.Replace("^FT25,160^BY3", "^FT25,160^BY2");
                    }
                    else if (CheckEAN8(ds.Tables[2].Rows[0][colname].ToString()) == true)
                    {
                        zplcode = zplcode.Replace("^BEN,60,Y,N", "^B8N,60,Y,N");
                        zplcode = zplcode.Replace("^FT25,160^BY2", "^FT25,160^BY3");
                       // zplcode = zplcode.Replace("^BCN,60,Y,N", "^B8N,60,Y,N");
                        //zplcode = zplcode.Replace("^FT25,160^BY1", "^FT25,160^BY3");
                    }
                    else
                    {

                        //if (ds.Tables[2].Rows[0][colname].ToString().Length > 10)
                        //{
                        //    zplcode = zplcode.Replace("^BEN,60,Y,N", "^BCN,60,Y,N");
                        //    zplcode = zplcode.Replace("^FT25,160^BY2", "^FT25,160^BY1");
                        //    zplcode = zplcode.Replace("^B8N,60,Y,N", "^BCN,60,Y,N");
                        //    zplcode = zplcode.Replace("^FT25,160^BY3", "^FT25,160^BY1");
                        //}
                        //else
                        //{
                       // zplcode = zplcode.Replace("^BCN,60,Y,N", "^BEN,60,Y,N");
                        zplcode = zplcode.Replace("^BEN,60,Y,N", "^BCN,60,Y,N");
                           
                           // zplcode = zplcode.Replace("^B8N,60,Y,N", "^BCN,60,Y,N");
                           // zplcode = zplcode.Replace("^FT25,160^BY3", "^FT25,160^BY2");
                        //}
                    }

                }
            }

            byte[] zpl = Encoding.UTF8.GetBytes(zplcode);
            //  byte[] zpl = Encoding.UTF8.GetBytes("^xa^cfa,50^fo100,100^fdHello World^fs^xz");

            // adjust print density (8dpmm), label width (4 inches), label height (6 inches), and label index (0) as necessary/////1.96x1.18
            var request = (HttpWebRequest)WebRequest.Create("http://api.labelary.com/v1/printers/8dpmm/labels/" + lblSize + "/0/"); ////1.96x1.18
            request.Method = "POST";
            request.Accept = "application/pdf"; // omit this line to get PNG images back
            request.ContentType = "application/x-www-form-urlencoded";
            request.ContentLength = zpl.Length;


            var requestStream = request.GetRequestStream();
            requestStream.Write(zpl, 0, zpl.Length);
            requestStream.Close();

            try
            {
                var response = (HttpWebResponse)request.GetResponse();
                var responseStream = response.GetResponseStream();
                var fileStream = System.IO.File.Create(FolderPath + repname + ".pdf"); // change file name for PNG images

                responseStream.CopyTo(fileStream);

                responseStream.Close();
                fileStream.Close();
            }
            catch (WebException e)
            {
                Console.WriteLine("Error: {0}", e.Status);
                return "";
            }
            return FolderPath + repname + ".pdf";
        }

        public bool CheckEAN13(string val)
        {
            bool res = false;
            if (val.Length == 13)// || (val.Length == 14 && val.Substring(0,1) == "0"))
            {
                int sumOdd, sumEven;
                sumOdd = 0; sumEven = 0;
             
                    
                for (int i = 0; i < val.Length; i++)
                {
                    if (i != (val.Length - 1))
                    {
                        if (((i + 1) % 2) == 1)
                            sumOdd = sumOdd + Convert.ToInt32(val.Substring(i, 1));
                        else
                            sumEven = sumEven + Convert.ToInt32(val.Substring(i, 1));
                    }

                }
                int tempVal = 10 - (((sumEven * 3) + sumOdd) % 10);
                if(Convert.ToInt32(val.Substring((val.Length - 1), 1)) == tempVal)
                {
                    res = true;
                }
            }
            return res;
                
        }

        public bool CheckEAN8(string val)
        {
            bool res = false;
            if (val.Length == 8)
            {
                int sumOdd, sumEven;
                sumOdd = 0; sumEven = 0;


                for (int i = 0; i < val.Length; i++)
                {
                    if (i != (val.Length - 1))
                    {
                        if (((i + 1) % 2) == 1)
                            sumOdd = sumOdd + Convert.ToInt32(val.Substring(i, 1));
                        else
                            sumEven = sumEven + Convert.ToInt32(val.Substring(i, 1));
                    }

                }
                int tempVal = 10 - (((sumEven * 1) + (sumOdd * 3)) % 10);
                if (Convert.ToInt32(val.Substring((val.Length - 1), 1)) == tempVal)
                {
                    res = true;
                }
            }
            return res;

        }
    }
}


