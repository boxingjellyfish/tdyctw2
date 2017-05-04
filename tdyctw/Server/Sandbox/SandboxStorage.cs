using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Dapper;
using System.Data.SqlClient;
using System.Configuration;

namespace tdyctw.Server.Sandbox
{
    public static class SandboxStorage
    {
        public static string GetParameter(string key)
        {
            using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["tdyctwdb"].ConnectionString))
            {
                conn.Open();
                var result = conn.Query<dynamic>("select paramkey, paramvalue from parameter where paramkey = @ParamKey", new { ParamKey = key });
                return result.FirstOrDefault().paramvalue;
            }
        }
    }
}