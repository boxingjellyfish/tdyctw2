using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace tdyctw.Server.Sandbox
{
    public class SandboxHub : Hub
    {
        public void JoinGame(string player)
        {
            var version = SandboxStorage.GetParameter("appversion");
            var message = string.Format("Player {0} joined server with version {1}", player, version);
            Clients.All.broadcastJoinGame(message);
        }
    }
}