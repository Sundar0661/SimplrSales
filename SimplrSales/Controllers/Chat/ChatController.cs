using SimplrSales.Models.Chat;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SimplrSales.Controllers.Chat
{
    public class ChatController : Controller
    {
        string constr = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
        public ActionResult Index()
        {
            if (Session["UserName"] != null)
            {
                ViewBag.UserId = Session["UserId"];
                ViewBag.UserName = Session["UserName"];
                ViewBag.Email = Session["UserId"];
                ViewBag.SalesAgentCode = Session["SalesAgentCode"];
                ViewBag.Department = Session["Department"];
                var objChatList = new List<ChatModel>();
                var userId = Session["UserId"];
                //var query = "select Code,Name,UserID,Department from SalesAgent where code in (select distinct AgentId from Messages)";
                var query = "  select Code,Name,UserID,Department from vw_ChatCustomerList where UserID1='" + Session["UserId"] +"' Order by Name ";
                DataTable dt = ReadRecord(query);
                if (dt.Rows.Count > 0)
                {
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        if (dt.Rows[i]["UserID"].ToString() == userId.ToString())
                        {
                            ViewBag.Department = dt.Rows[i]["Department"].ToString();
                            ViewBag.SalesAgentCode = dt.Rows[i]["Code"].ToString();
                        }
                        else
                        {
                            var ChatModel = new ChatModel();
                            ChatModel.UserID = dt.Rows[i]["UserID"].ToString();
                            ChatModel.Code = dt.Rows[i]["Code"].ToString();
                            ChatModel.Name = dt.Rows[i]["Name"].ToString();
                            ChatModel.Department = dt.Rows[i]["Department"].ToString();
                            objChatList.Add(ChatModel);
                        }
                    }
                }
                return View(objChatList);
            }
            else
            {
                if (Session["ScreenName"] != null)
                    TempData["SessionTimeOut"] = "1";
                return RedirectToAction("Login", "Login", new { sessionexpired = "sessionexpired" });
            }
        }

        public JsonResult GetChatHistory(string AgentId, string CustNo, string autoRefresh)
        {
            try
            {
                //var query = "select Msg,MessageType,ReadStatus,CONVERT(NVARCHAR,FromDt, 105) as FromDt, CONVERT(NVARCHAR,ToDt, 105) as ToDt from Messages where AgentId = '66554433' and CustNo = '1'";
                var query = "select Msg,MessageType,ReadStatus, FromDt as orderFromDt,CONVERT(NVARCHAR, FromDt, 105) as FromDt, CONVERT(NVARCHAR, ToDt, 105) as ToDt  from Messages where AgentId = '" + AgentId + "' and CustNo = '" + CustNo + "' order by orderFromDt";
                //var query = "select Msg,MessageType,ReadStatus, FromDt as orderFromDt,FORMAT( FromDt,'dd-MM-yyyy hh:mm') as FromDt, FORMAT( ToDt,'dd-MM-yyyy hh:mm') as ToDt  from Messages where AgentId = '" + AgentId + "' and CustNo = '" + CustNo + "' order by orderFromDt";
                //if (autoRefresh == "yes")
                //    query = "select Msg,MessageType,ReadStatus, FromDt as orderFromDt,FORMAT( FromDt,'dd-MM-yyyy hh:mm') as FromDt, FORMAT( ToDt,'dd-MM-yyyy hh:mm') as ToDt  from Messages where AgentId = '" + AgentId + "' and CustNo = '" + CustNo + "'and ReadStatus ='0' order by orderFromDt";

                var objChatList = new List<ChatHistoryModel>();
                var ChatModel = new ChatHistoryModel();
                DataTable dt = ReadRecord(query);
                if (dt.Rows.Count > 0)
                {
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        ChatModel = new ChatHistoryModel();
                        ChatModel.Msg = dt.Rows[i]["Msg"].ToString();
                        ChatModel.MessageType = dt.Rows[i]["MessageType"].ToString();
                        ChatModel.ReadStatus = dt.Rows[i]["ReadStatus"].ToString();
                        ChatModel.FromDt = dt.Rows[i]["FromDt"].ToString();
                        ChatModel.ToDt = dt.Rows[i]["ToDt"].ToString();
                        objChatList.Add(ChatModel);
                    }
                }

                query = "update Messages set ReadStatus = '1'  where   AgentId = '" + AgentId + "' and CustNo = '" + CustNo + "'  and messageType='Customer' and ReadStatus ='0'";
                executerQuery(query);
                return Json(objChatList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                //ErrorLog(ex);
            }

            return Json(string.Empty, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SaveChatHistory(ChatHistoryModel model)
        {
            try
            {
                var query = "insert into Messages(MsgNo,Msg,FromDt,ToDt,Active,CustNo,AgentId,MessageType,ReadStatus,Assignto)";
                query += "values((select top 1 CONCAT('ADM', REPLACE(MsgNo, 'ADM', '') + 1)   from Messages order by MsgNo desc), '" + model.Msg + "', GETDATE(), '9999-12-31 00:00:00.000', '0', '" + model.CustNo + "', '" + model.AgentId + "', '" + model.MessageType + "', '0', 'All')";
                executerQuery(query);
                return Json("true", JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(string.Empty, JsonRequestBehavior.AllowGet);
            }
        }

        public DataTable ReadRecord(string query)
        {

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
                int c = ds.Tables.Count;
                if (ds.Tables.Count > 0)
                    dt = ds.Tables[c - 1];

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

        public string executerQuery(string sqlqry)
        {
            SqlConnection sqlConnection1 = new SqlConnection(constr);
            try
            {
                SqlCommand cmd = new SqlCommand();
                SqlDataReader reader;

                cmd.CommandText = sqlqry;
                cmd.CommandType = CommandType.Text;
                cmd.Connection = sqlConnection1;

                sqlConnection1.Open();

                reader = cmd.ExecuteReader();

                sqlConnection1.Close();
                return "";
            }
            catch (Exception ex)
            {
            }
            finally
            {
                sqlConnection1.Close();
            };
            return string.Empty;
        }

    }


}
