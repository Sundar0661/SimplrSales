using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using System.Collections.Concurrent;

namespace SimplrSales.Hubs
{
    public class ChatHub : Hub
    {
        static ConcurrentDictionary<string, string> dic = new ConcurrentDictionary<string, string>();

        public void Send(string name, string message)
        {
            // Call the addNewMessageToPage method to update clients.
            Clients.All.addNewMessageToPage(name, message);
        }

        public void SendToSpecific(string name, string message, string to, string notificationId)
        {
            Clients.Caller.broadcastMessage(name, message, to, notificationId);
            var dicStatus = dic.Where(x => x.Key == to).Any();
            if (dicStatus)
                Clients.Client(dic[to]).broadcastMessage(name, message, to, notificationId);
        }
        public void Notify(string name, string id)
        {
            if (dic.ContainsKey(name))
            {
                var dicStatus = dic.Where(x => x.Key == name).ToList();
                if (dicStatus.Any())
                    dic.TryUpdate(name, id, dicStatus[0].Value);
                Clients.Caller.differentName();
            }
            else
            {
                dic.TryAdd(name, id);
                foreach (KeyValuePair<String, String> entry in dic)
                {
                    Clients.Caller.online(entry.Key);
                    //_emailIdList.Add(entry.Key);
                }

                //t = new Thread(NewThread);
                //t.Start();
                //NewThread();
                Clients.Others.enters(name);
            }
        }
    }
}