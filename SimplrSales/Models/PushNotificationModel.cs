using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


using Newtonsoft.Json;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

//using FCMPushNotification.Models;

using System.IO;
using System.Net;
using System.Web.Script.Serialization;


namespace SimplrSales.Models
{
    public class PushNotificationModel
    {
        //pvmB
        //private string serverKey = "AAAAYykxG2Y:APA91bFzg9nnjf-4b06VEbI1vmUOtbBMnwC_UYocPJhHN76HFqMOauMooLkfhwud7x_Jteyxwz6XKFHVIWBwbz9lPZPbb8iJLxcF-yMXz8TVjPH46HK5eJqlsvvGAo-B8LY0wgbjWzEE";
        //private string senderId = "425892846438";

        //private string serverKey = System.Configuration.ConfigurationManager.AppSettings["ServerKey"];
        //private string senderId = System.Configuration.ConfigurationManager.AppSettings["SenderId"];


        private string serverKey = "AAAATYu5tI8:APA91bEbgnPIZq3DDVQoS8Jgkn0Fglu9eJC_QNBSMiUgrlJjKJH7HdQJT7VmM4nkwtvWmCTNOqnun4wEsJ6LnsFnilNZAZDQBkZyTA0GtKOtNiC2zbxYzov8AIPRu7mozSCeXqxXcVvE";
        private string senderId = "333056685199";

        private string webAddr = "https://fcm.googleapis.com/fcm/send";
        private ExecuteModel model = new ExecuteModel();
 
        public ResponseModel SendNotification(NotificationModel notificationModel)
        {
            ResponseModel response = new ResponseModel();
            var dateString = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss tt");
            var mdtNo = notificationModel.MDTNo;
            string msg = string.Empty;
            try
            {
                //if (notificationModel.IsAndroiodDevice)
                //{
                //string DeviceToken = "dw-QpLUcSIuan7JWJxeUl1:APA91bGVE8oniHGbtGtzudw5TkOh3KBb1Od609W4sYA4WUNPOd6p8ObgvLzmMFMK3hTihUOh7sfh0B3kyFTwl54Ve_EwWz1s__jGNV21YihInAdehj8zSpWfs0jyiZCLqeFLjCc8xXYv";
                //string title = "SendNotification2"; 
                //string msg = "SendNotification2";
                string DeviceToken = notificationModel.DeviceId;
                string title = mdtNo;// notificationModel.Title;
                                     // string msg = notificationModel.Message;
                var result = "-1";
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(webAddr);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Headers.Add(string.Format("Authorization: key={0}", serverKey));
                httpWebRequest.Headers.Add(string.Format("Sender: id={0}", senderId));
                httpWebRequest.Method = "POST";

                var payload = new
                {
                    to = DeviceToken,
                    priority = "high",
                    content_available = true,
                    notification = new
                    {
                        body = msg,
                        title = title
                    },
                };
                var serializer = new JavaScriptSerializer();
                using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
                {
                    string json = serializer.Serialize(payload);
                    streamWriter.Write(json);
                    streamWriter.Flush();
                }

                var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
                using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                {
                    result = streamReader.ReadToEnd();
                }
                string jsonData = Newtonsoft.Json.JsonConvert.SerializeObject(result);
                Root myDeserializedClass = Newtonsoft.Json.JsonConvert.DeserializeObject<Root>(result);

                //myDeserializedClass.results[0].error;
                if (httpResponse.StatusCode.ToString() == "OK")
                {
                    response.IsSuccess = true;
                    response.Message = msg + " - Notification sent successfully";
                    return response;
                }
                else
                {
                   
                    response.IsSuccess = false;
                    response.Message = msg + "Error";
                    return response;
                }


                return response;
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = msg + "Something went wrong";
                return response;
            }
        }

        //  [HttpPost]
        public string Get()
        {
            var dateString = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss tt");
            var mdtNo = "";
            string DeviceToken = "";
            string msg = string.Empty;
            //string recepient = string.Empty;
            string responseMessage = string.Empty;
            System.Data.DataTable dt1 = new System.Data.DataTable();

            //var httpWebRequest = (HttpWebRequest)WebRequest.Create(webAddr);
            //httpWebRequest.ContentType = "application/json";
            //httpWebRequest.Headers.Add(string.Format("Authorization: key={0}", serverKey));
            //httpWebRequest.Headers.Add(string.Format("Sender: id={0}", senderId));
            //httpWebRequest.Method = "POST";
            var result = "-1";
            ResponseModel response = new ResponseModel();
            try
            {
                var qry = "select * from Notifications where IsSent='0' ";
                System.Data.DataTable dt = model.executerQuery(qry);
                if (dt.Rows.Count > 0)
                {
                    for (int n = 0; n < dt.Rows.Count; n++)
                    {
                        mdtNo = dt.Rows[n].ItemArray[0].ToString();
                        msg = dt.Rows[n].ItemArray[1].ToString();
                        var query1 = "select MDTNO, SystemValue  from DeviceSystemList where mdtno = '" + mdtNo + "'  and code = 'FireBaseToken'";
                        dt1 = model.executerQuery(query1);
                        if (dt1.Rows.Count > 0)
                        {
                            DeviceToken = dt1.Rows[0].ItemArray[1].ToString();
                            var payload = new
                            {
                                to = DeviceToken,
                                priority = "high",
                                content_available = true,
                                notification = new
                                {
                                    body = msg,
                                    title = mdtNo
                                },
                            };

                            var httpWebRequest = (HttpWebRequest)WebRequest.Create(webAddr);
                            httpWebRequest.ContentType = "application/json";
                            httpWebRequest.Headers.Add(string.Format("Authorization: key={0}", serverKey));
                            httpWebRequest.Headers.Add(string.Format("Sender: id={0}", senderId));
                            httpWebRequest.Method = "POST";

                            var serializer = new JavaScriptSerializer();
                            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
                            {
                                string json = serializer.Serialize(payload);
                                streamWriter.Write(json);
                                streamWriter.Flush();
                                streamWriter.Close();
                            }

                            var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
                            using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                            {
                                result = streamReader.ReadToEnd();
                                streamReader.Close();
                            }


                        }
                    }

                }
            }
            catch (Exception ex)
            {

                response.IsSuccess = false;
                response.Message = msg + "Something went wrong";
                return response.Message.ToString();
            }
            return response.Message.ToString();

        }



    }


    public class ExecuteModel
    {
        string constr = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
        private DataTable dt = new DataTable();
        public SqlConnection con = new SqlConnection();
        //public string executerQuery(string query)
        public DataTable executerQuery(string query)
        {

            try
            {
                DataTable dtSNo = new DataTable();
                // DataTable dt = new DataTable();
                DataSet ds = new DataSet();
                SqlConnection con = new SqlConnection(constr);
                con.Open();
                SqlDataAdapter sda = new SqlDataAdapter(query, con);
                sda.Fill(ds);
                con.Close();
                dt = ds.Tables[0];
                string result2 = JsonConvert.SerializeObject(dt);
                return dt;
            }
            catch (Exception ex)
            {

            }
            finally
            {
                con.Close();
            };
            return dt;
        }

        public string UpdatedQuery(string query)
        {
            var message = string.Empty;
            try
            {
                DataTable dtSNo = new DataTable();
                DataSet ds = new DataSet();
                SqlConnection con = new SqlConnection(constr);
                con.Open();
                SqlDataAdapter sda = new SqlDataAdapter(query, con);
                sda.Fill(ds);
                con.Close();
                message = "Updates succesfully!";
            }
            catch (Exception ex)
            {
                message = "Updates error!";
            }
            finally
            {
                con.Close();
            };
            return message;

        }


    }

    public class ResponseModel
    {
        //[JsonProperty("isSuccess")]
        public bool IsSuccess { get; set; }

        //[JsonProperty("message")]
        public string Message { get; set; }
    }

    public class NotificationModel
    {
        //[JsonPropert`y("deviceId")]
        public string DeviceId { get; set; }

        //[JsonProperty("isAndroiodDevice")]
        public bool IsAndroiodDevice { get; set; }

        //[JsonProperty("title")]
        public string Title { get; set; }

        //[JsonProperty("body")]
        public string Body { get; set; }
        public string Message { get; set; }
        public string MDTNo { get; set; }

    }

    public class Result
    {
        public string error { get; set; }
    }

    public class Root
    {
        public long multicast_id { get; set; }
        public int success { get; set; }
        public int failure { get; set; }
        public int canonical_ids { get; set; }
        public List<Result> results { get; set; }
    }
}
