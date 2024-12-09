using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SimplrSales.Models.Chat
{
    public class ChatModel
    {
        public string UserID { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Department { get; set; }
    }
    public class ChatHistoryModel
    {
        public string MsgNo { get; set; }
        public string Msg { get; set; }
        public string MessageType { get; set; }
        public string ReadStatus { get; set; }
        public string FromDt { get; set; }
        public string ToDt { get; set; }
        public string CustNo { get; set; }
        public string AgentId { get; set; }
    }
}