using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SimplrSales.Models;
using System.Configuration;

namespace SimplrSales.Controllers
{
    public class CustomerMapController : BusinessRule
    {
        //
        // GET: /CustomerMap/

        public ActionResult Index()
        {
            return View();
        }


        public ActionResult Index_test()
        {
            return View();
        }

        public string time_Taken_Reach_Path(string orginPlace, string inputDestinations)
        {
            string sResult = "";
            try
            {
                System.Xml.XmlDocument doc;
                System.Xml.XmlNodeList nodes;
                System.Xml.XmlNodeList xmlnode;
                float min_distance = 0;
                float temp = 0;
                int idx = 0;
                string sTemp = "";

                string Google_APIKey = ConfigurationManager.AppSettings["Google_APIKey"] != null ? ConfigurationManager.AppSettings["Google_APIKey"] : "AIzaSyDI9hx4Xgpd5p5p_H_7Uu0vQTCX4nIiyJk";

                // Create a new XmlDocument  
                doc = new System.Xml.XmlDocument();

                ErrorLog_whenMenuClick_strMessage("orginPlace " + orginPlace + "inputDestinations " + inputDestinations + ".");

                // Load data  
                //doc.Load("https://maps.googleapis.com/maps/api/distancematrix/xml?origins=" + orginPlace + "&destinations=" + inputDestinations + "&key=AIzaSyC5XH-ALvr81IiuEDWekI2k91ujPeZL864");
                doc.Load("https://maps.googleapis.com/maps/api/distancematrix/xml?origins=" + orginPlace + "&destinations=" + inputDestinations + "&sensor=false&mode=DRIVING&key=" + Google_APIKey + "");

                ErrorLog_whenMenuClick_strMessage("doc.OuterXml " + doc.OuterXml.ToString());

                if (doc.GetElementsByTagName("DistanceMatrixResponse")[0].ChildNodes.Item(0).InnerText.Trim().ToUpper() == "OK")
                {
                    xmlnode = doc.GetElementsByTagName("element");

                    sResult += inputDestinations.Split('|')[idx].Split(',')[0] + "$";
                    sResult += inputDestinations.Split('|')[idx].Split(',')[1] + "$";

                    // address
                    xmlnode = doc.GetElementsByTagName("destination_address");
                    sTemp = xmlnode[idx].InnerText.ToString();
                    sResult += sTemp + "$";

                    // distance 
                    xmlnode = doc.GetElementsByTagName("element");
                    sTemp = xmlnode[idx].ChildNodes.Item(2).ChildNodes.Item(1).InnerText.ToString();
                    sResult += sTemp + "$";

                    //time
                    xmlnode = doc.GetElementsByTagName("element");
                    sTemp = xmlnode[idx].ChildNodes.Item(1).ChildNodes.Item(1).InnerText.ToString();
                    sResult += sTemp + "$";

                    // OUTPUT FORMAT =====
                    // "lati$longi$address$distance$time";

                    return sResult;

                } // valid data 


            }
            catch (Exception ex)
            {
                return "1";

            }

            return sResult;
        }

    }
}
