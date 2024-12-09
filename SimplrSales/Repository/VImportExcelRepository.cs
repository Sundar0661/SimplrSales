using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;

namespace SimplrSales.Repository
{
    public class VImportExcelRepository
    {
        private SqlConnection conn;
        public DataRow dr;
        public SqlDataReader drr;
        public Boolean isExists = false;
        //To Handle connection related activities
        private void connection1()
        {
            string constr = ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString();
            conn = new SqlConnection(constr);
        }

        public Boolean IsCategoryExists(string code)
        {
            connection1();
            string query = "Select * from Category where Code = '" + code + "'";
            conn.Open();
            SqlCommand cmd = new SqlCommand(query, conn);
            drr = cmd.ExecuteReader();
            isExists = drr.Read();
            conn.Close();
            return isExists;
        }
        public Boolean IsSubCategoryExists(string cat, string subcat)
        {
            connection1();
            string query = "Select * from SubCategory where CategoryCode = '" + cat + "' and SubCategoryCode ='" + subcat + "' ";
            conn.Open();
            SqlCommand cmd = new SqlCommand(query, conn);
            drr = cmd.ExecuteReader();
            isExists = drr.Read();
            conn.Close();
            return isExists;
        }
        public Boolean IsPromotionMasterExists(string procode, string protype, string cat, string subcat)
        {
            connection1();
            string query = "Select * from PromotionMaster where PromotionCode='" + procode + "' and PromotionType='" + protype + "' and SubcategoryCode='" + cat + "' and BrandCode ='" + subcat + "' ";
            conn.Open();
            SqlCommand cmd = new SqlCommand(query, conn);
            drr = cmd.ExecuteReader();
            isExists = drr.Read();
            conn.Close();
            return isExists;
        }
        public Boolean IsSalesAgentExists(string code)
        {
            connection1();
            string query = "Select Code from SalesAgent where Code ='" + code + "' ";
            conn.Open();
            SqlCommand cmd = new SqlCommand(query, conn);
            drr = cmd.ExecuteReader();
            isExists = drr.Read();
            conn.Close();
            return isExists;
        }
        public Boolean IsDisplayMasterExists(string dispcode, string disptype, string cat, string subcat)
        {
            connection1();
            string query = " Select * from DisplayMaster where DisplayCode='" + dispcode + "' and DisplayType='" + disptype + "' and SubcategoryCode='" + cat + "' and BrandCode ='" + subcat + "' ";
            conn.Open();
            SqlCommand cmd = new SqlCommand(query, conn);
            drr = cmd.ExecuteReader();
            isExists = drr.Read();
            conn.Close();
            return isExists;
        }
        public Boolean IsReasonExists(string code)
        {
            connection1();
            string query = " Select Code from Reason where Code ='" + code + "' ";
            conn.Open();
            SqlCommand cmd = new SqlCommand(query, conn);
            drr = cmd.ExecuteReader();
            isExists = drr.Read();
            conn.Close();
            return isExists;
        }
        public Boolean IsDisplayMappingExists(string dispcode, string custno, string target, DateTime startdate, DateTime enddate)
        {
            connection1();
            string query = " Select * from DisplayMapping where DisplayCode='" + dispcode + "' and CustNo='" + custno + "' and TargetValue='" + target + "' and StartDate ='" + startdate + "' and EndDate='" + enddate + "' ";
            conn.Open();
            SqlCommand cmd = new SqlCommand(query, conn);
            drr = cmd.ExecuteReader();
            isExists = drr.Read();
            conn.Close();
            return isExists;
        }
        public Boolean IsPromotionMappingExists(string procode, string custno, string target, DateTime startdate, DateTime enddate)
        {
            connection1();
            string query = " Select * from PromotionMapping where PromotionCode='" + procode + "' and CustNo='" + custno + "' and PromotionType='" + target + "' and StartDate ='" + startdate + "' and EndDate='" + enddate + "' ";
            conn.Open();
            SqlCommand cmd = new SqlCommand(query, conn);
            drr = cmd.ExecuteReader();
            isExists = drr.Read();
            conn.Close();
            return isExists;
        }
        public Boolean IsCustomerExists(string custno)
        {
            connection1();
            string query = " Select CustNo from Customer where custNo ='" + custno + "' ";
            conn.Open();
            SqlCommand cmd = new SqlCommand(query, conn);
            drr = cmd.ExecuteReader();
            isExists = drr.Read();
            conn.Close();
            return isExists;
        }
        public Boolean IsPriceGroupExists(string code)
        {
            connection1();
            string query = " Select Code from PriceGroup where Code ='" + code + "' ";
            conn.Open();
            SqlCommand cmd = new SqlCommand(query, conn);
            drr = cmd.ExecuteReader();
            isExists = drr.Read();
            conn.Close();
            return isExists;
        }

        public bool isFocusSKUExists(string sYear, string sMonth, string sChannelCode, string sItemCode)
        {
            connection1();
            string query = "Select ItemID from IOM where Channel='" + sChannelCode + "' and ItemID = '" + sItemCode + "' and IOM_Year = '" + sYear + "' and IOM_Month='" + sMonth + "'";
            conn.Open();
            SqlCommand cmd = new SqlCommand(query, conn);
            drr = cmd.ExecuteReader();
            isExists = drr.Read();
            conn.Close();
            return isExists;
        }

        public bool IsOutletTypeExists(string sCode)
        {
            connection1();
            string query = "Select Code from OutletType where Code = '" + sCode + "'";
            conn.Open();
            SqlCommand cmd = new SqlCommand(query, conn);
            drr = cmd.ExecuteReader();
            isExists = drr.Read();
            conn.Close();
            return isExists;
        }

        public bool IsSubChannelExists(string sCode)
        {
            connection1();
            string query = "Select Code from SubChannel where Code = '" + sCode + "'";
            conn.Open();
            SqlCommand cmd = new SqlCommand(query, conn);
            drr = cmd.ExecuteReader();
            isExists = drr.Read();
            conn.Close();
            return isExists;
        }
        public bool IsSalesTerritoryTgtExists(string TgtMonth, string BrandName, string Territory)
        {
            connection1();
            //string query = "Select TerritoryCode from SalesTerritoryTarget where TargetMonth='" + TgtMonth + "' and Brand='" + BrandName + "' and TerritoryCode='" + Territory + "'";
            string query = "Select TerritoryCode from SalesTerritoryTarget where TargetMonth='" + TgtMonth + "' and   TerritoryCode='" + Territory + "'";
            conn.Open();
            SqlCommand cmd = new SqlCommand(query, conn);
            drr = cmd.ExecuteReader();
            isExists = drr.Read();
            conn.Close();
            return isExists;
        }

        public bool IsVehicleExists(string sCode)
        {
            connection1();
            string query = "Select Code from Vehicle where Code = '" + sCode + "'";
            conn.Open();
            SqlCommand cmd = new SqlCommand(query, conn);
            drr = cmd.ExecuteReader();
            isExists = drr.Read();
            conn.Close();
            return isExists;

        }

        public bool IsDistrItemExists(string sDistrCode, string sItemNo)
        {
            connection1();
            string query = "Select DistributorID from DistributorItem where DistributorID = '" + sDistrCode + "'  and ItemNo='" + sItemNo + "'";
            conn.Open();
            SqlCommand cmd = new SqlCommand(query, conn);
            drr = cmd.ExecuteReader();
            isExists = drr.Read();
            conn.Close();
            return isExists;
        }

        public bool IsDistributorExists(string DistrCode)
        {
            connection1();
            string query = "Select * from Distributor where DistributorID ='" + DistrCode + "' ";
            conn.Open();
            SqlCommand cmd = new SqlCommand(query, conn);
            drr = cmd.ExecuteReader();
            isExists = drr.Read();
            conn.Close();
            return isExists;

        }

        public bool IsRoutePlanExists(string sRouteNo)
        {
            connection1();
            string query = "Select RouteNo from RouteMaster where RouteNo ='" + sRouteNo + "'";
            conn.Open();
            SqlCommand cmd = new SqlCommand(query, conn);
            drr = cmd.ExecuteReader();
            isExists = drr.Read();
            conn.Close();
            return isExists;
        }

        public bool IsAgentExists(string sCode)
        {
            connection1();
            string query = "Select code from SalesAgent where code  ='" + sCode + "'";
            conn.Open();
            SqlCommand cmd = new SqlCommand(query, conn);
            drr = cmd.ExecuteReader();
            isExists = drr.Read();
            conn.Close();
            return isExists;
        }

        public bool IsPriceGroupItemExists(string sPriceGroup, string sItemNo)
        {
            connection1();
            string query = "Select PriceGroup from ItemPr where PriceGroup ='" + sPriceGroup + "' and ItemNo ='" + sItemNo + "' ";
            conn.Open();
            SqlCommand cmd = new SqlCommand(query, conn);
            drr = cmd.ExecuteReader();
            isExists = drr.Read();
            conn.Close();
            return isExists;
        }

        public Boolean IsChannelExists(string code)
        {
            connection1();
            string query = " Select * from Channel where Code ='" + code + "' ";
            conn.Open();
            SqlCommand cmd = new SqlCommand(query, conn);
            drr = cmd.ExecuteReader();
            isExists = drr.Read();
            conn.Close();
            return isExists;

        }



        public void insertErrorLog(string query)
        {
            connection1();
            conn.Open();
            SqlCommand cmd = new SqlCommand(query, conn);
            cmd.ExecuteNonQuery();

            conn.Close();
        }
        public void executeSQL(string query)
        {
            connection1();
            conn.Open();
            SqlCommand cmd = new SqlCommand(query, conn);
            cmd.ExecuteNonQuery();
            conn.Close();
        }


        public string GetGeoCoords(string inString, int inType)
        {
            try
            {
                //Explanation of function:
                //Use inType=0 and feed in a specific Google Maps URL to parse out the GeoCoords from the URL
                //e.g. http://maps.google.com/maps?f=q&source=s_q&hl=en&geocode=&q=53154&sll=37.0625,-95.677068&sspn=52.505328,80.507812&ie=UTF8&ll=42.858224,-88.000832&spn=0.047943,0.078621&t=h&z=14
                //Function returns a string of geocoords (e.g. "-87.9010610,42.8864960")

                // Use inType=1 and feed in a zip code, address, or business name
                //Function returns a string of geocoords (e.g. "-87.9010610,42.8864960")
                //If an invalid address, zip code or location was entered, the function will return "0,0"
                string skey = "AIzaSyAWGgnZ_D8LFHVDJI6dyvh7OqiKcDbKhPg";
                string outString = "";
                string[] Chunks;


                if (inType == 0)
                {
                    Chunks = Regex.Split(inString, "&");
                    foreach (string match in Chunks)
                    {
                        if (match.IndexOf("ll", 1) > 0)
                        {
                            outString = match;
                        }
                    }
                    outString = outString.Replace("sll=", "");
                    outString = outString.Replace("ll=", "");
                }
                else
                {
                    //Dim xmlString As String = GetHTML("http://maps.google.com/maps/geo?output=xml&key=abcdefg&q=" & inString, 1)
                    string xmlString = GetHTML("https://maps.googleapis.com/maps/api/geocode/xml?address=" + inString + "&sensor=true_or_false&key=" + skey, 1);
                    int pos1 = 0;
                    int pos2 = 0;
                    pos1 = xmlString.IndexOf("<location>");
                    pos2 = xmlString.IndexOf("</location>");
                    string stmp = "";
                    if (pos1 > 0 && pos2 > pos1)
                    {
                        stmp = xmlString.Substring(pos1, pos2 - pos1);
                        pos1 = 0;
                        pos2 = 0;
                        pos1 = stmp.IndexOf("<lat>");
                        pos2 = stmp.IndexOf("</lat>");
                        outString = stmp.Substring(pos1, pos2 - pos1).Replace("<lat>", "");
                        pos1 = stmp.IndexOf("<lng>");
                        pos2 = stmp.IndexOf("</lng>");
                        outString = outString + "," + stmp.Substring(pos1, pos2 - pos1).Replace("<lng>", "");
                    }

                }

                return outString;
            }
            catch (Exception ex)
            {
                return "0,0";
            }

        }

        public string GetHTML(string sURL, int e)
        {
            System.Net.WebRequest oHttpWebRequest;
            System.IO.Stream oStream;
            string sChunk;
            oHttpWebRequest = System.Net.HttpWebRequest.Create(sURL);

            System.Net.WebResponse oHttpWebResponse = oHttpWebRequest.GetResponse();
            oStream = oHttpWebResponse.GetResponseStream();

            sChunk = new System.IO.StreamReader(oStream).ReadToEnd();

            oStream.Close();
            oHttpWebResponse.Close();
            if (e == 0)
            {
                //Return Server.HtmlEncode(sChunk)
                return System.Web.HttpUtility.HtmlEncode(sChunk);
            }
            else
            {
                //Return Server.HtmlDecode(sChunk)
                return System.Web.HttpUtility.HtmlDecode(sChunk);
            }

        }


        public string getAccessLevel(string sEmployeeType)
        {

            SqlDataReader dtr;
            string sSql = "";
            string MaxNo = "0";
            string MaxNo2 = "0";

            connection1();
            string query = "Select ISNULL(Max(GroupID),0) AS GROUPID from UserGroup";
            conn.Open();
            SqlCommand cmd = new SqlCommand(query, conn);
            //drr = cmd.ExecuteReader();
            //isExists = drr.Read();
            using (SqlDataReader reader = cmd.ExecuteReader())
            {
                if (reader.Read())
                {
                    MaxNo = reader["GroupID"].ToString(); ;
                }
            }
            conn.Close();
            query = "Select GroupID from UserGroup Where DEscription = '" + sEmployeeType + "'";
            conn.Open();
            cmd = new SqlCommand(query, conn);
            //drr = cmd.ExecuteReader();
            //isExists = drr.Read();
            using (SqlDataReader reader = cmd.ExecuteReader())
            {
                if (reader.Read())
                {
                    MaxNo2 = reader["GroupID"].ToString(); ;
                }
            }


            conn.Close();

            if ((MaxNo2 != "0"))
            {
                return MaxNo2;
            }
            else if ((MaxNo != "0"))
            {
                query = "Insert into UserGroup(GroupID,Description, SolutionName) values('" + (int.Parse(MaxNo) + 1) + "','" + sEmployeeType + "','Sales')";
                //System.IO.File.AppendAllText((Application.StartupPath + "\\ErrorLog.txt"), ("Import User Group Type: "
                //                + (sSql + "\r\n")));
                conn.Open();
                cmd = new SqlCommand(query, conn);
                cmd.ExecuteNonQuery();
                conn.Close();

                return (int.Parse(MaxNo) + 1).ToString();
            }
            else
            {
                query = "Insert into UserGroup(GroupID,Description, SolutionName) values('1','" + sEmployeeType + "','Sales')";
                //System.IO.File.AppendAllText((Application.StartupPath + "\\ErrorLog.txt"), ("Import User Group Type: "
                //                + (sSql + "\r\n")));
                return "1";
                conn.Open();
                cmd = new SqlCommand(query, conn);
                cmd.ExecuteNonQuery();
                conn.Close();

            }

        }

        public double getBaseQty(string sItemNo, string sUOM)
        {
            double bAns = 0;
            connection1();
            string query = "Select top 1 BaseQty from UOM where ItemNO= '" + sItemNo + "' and UOM='" + sUOM + "'";
            conn.Open();
            SqlCommand cmd = new SqlCommand(query, conn);
            //drr = cmd.ExecuteReader();
            //isExists = drr.Read();
            using (SqlDataReader reader = cmd.ExecuteReader())
            {
                if (reader.Read())
                {
                    bAns = double.Parse(reader["BaseQty"].ToString());
                }
            }
            conn.Close();
            return bAns;
        }


        public bool IsNodeTreeExists(string sCode, string sSalesOfficeID)
        {
            //bool bAns = false;
            connection1();
            string query = "Select * from NodeTree where SalesManTerritory ='" + sCode + "' and SalesOfficeID = '" + sSalesOfficeID + "'";

            conn.Open();
            SqlCommand cmd = new SqlCommand(query, conn);
            drr = cmd.ExecuteReader();
            isExists = drr.Read();
            conn.Close();
            return isExists;

            //conn.Open();
            //SqlCommand cmd = new SqlCommand(query, conn);
            ////drr = cmd.ExecuteReader();
            ////isExists = drr.Read();
            //using (SqlDataReader reader = cmd.ExecuteReader())
            //{
            //    if (reader.Read())
            //    {
            //        //  bAns = double.Parse(reader["BaseQty"].ToString());
            //        bAns = true;
            //    }
            //}
            //conn.Close();
            //return bAns;
        }


        public bool IsCrossReferenceExists(string sDistrCode, string sItemNO, string sRefType)
        {
            connection1();
            string query = "Select * from CrossReference where ThirdParty='" + sDistrCode + "' and SimplrCode='" + sItemNO + "' and CrossReferenceType='" + sRefType + "'";

            conn.Open();
            SqlCommand cmd = new SqlCommand(query, conn);
            drr = cmd.ExecuteReader();
            isExists = drr.Read();
            conn.Close();
            return isExists;

            //SqlDataReader dtr;
            //bool bAns;
            //dtr = objDO.ReadRecord(("Select * from CrossReference where ThirdParty="
            //                + (objDO.SafeSQL(sDistrCode) + (" and SimplrCode="
            //                + (objDO.SafeSQL(sItemNO) + (" and CrossReferenceType=" + objDO.SafeSQL(sRefType)))))));
            //bAns = dtr.Read;
            //dtr.Close();
            //return bAns;
        }

        public bool IsDBNull(string value)
        {
            return true;
        }
        public bool IsNumeric(string value)
        {
            return true;
        }

    }
}