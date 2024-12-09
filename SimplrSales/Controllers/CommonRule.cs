using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using Newtonsoft.Json;
//using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Web.Mvc;
using System.IO;
using SimplrSales.Models;

namespace SimplrSales.Controllers
{
    public class CommonRule
    {
        public static string _AccessLevel = string.Empty;
        public static string _Language = string.Empty;
        private DataTable dt = new DataTable();
        string constr = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
        public static string _solutionName = System.Configuration.ConfigurationManager.AppSettings["SolutionName"];
        public static string _isLogFile = System.Configuration.ConfigurationManager.AppSettings["IsLogFile"];
        //public static string _isLogFileLocal = System.Configuration.ConfigurationManager.AppSettings["IsLogFileLocal"];
        public static string _isLogFileWithQuery = "";

        public static string dir = System.Web.HttpContext.Current.Server.MapPath("~/ViewErrorLogFiles");
        public static string PaginationValue = string.Empty;
        public static string _YearPickerLimit = string.Empty;
        //public static string userId = HttpContext.Current.Session["UserName"].ToString();


        public CommonRule()
        {

        }
        public string QueryconfigText(string screenname)
        {
                        int tryCount = 0;
                  var SqlQry = "select QueryText + ' ' + isnull(GroupText,'') + ' ' + isnull(OrderText,'') from Queryconfig where screenname ='" + screenname + "'";
            QueryLog(SqlQry);
            var gotoLoopsqlqry = SqlQry;
        gotoLoop:
            SqlConnection con = new SqlConnection(constr);
            try
            {
                con.Close();

                DataTable dtSNo = new DataTable();
                //  dtSNo = db.retsulDataTable(SqlQry);

                //  DataTable dt = new DataTable();
                DataSet ds = new DataSet();
                con.Open();
                SqlDataAdapter sda = new SqlDataAdapter(SqlQry, con);
                sda.Fill(ds);
                // con.Close();

                dt = ds.Tables[0];
                //return dt.Rows[0].ItemArray[0].ToString().Replace("ifnull", "isnull");
                // string result = JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                QueryLog(SqlQry + System.Environment.NewLine + "=========================================================== " + System.Environment.NewLine + "Exception : " + ex.Message + System.Environment.NewLine + "=========================================================== ");
                //ErrorLogWithQuery(ex, SqlQry);
                if ((ex.Message.IndexOf("was deadlocked on lock | communication buffer resources with another process and has been chosen as the deadlock victim") > -1 || ex.Message.IndexOf("resources with another process and has been chosen as the deadlock victim") > -1) && gotoLoopsqlqry != "")
                {
                    System.Threading.Thread.Sleep(5000); // 5 second
                    tryCount = tryCount + 1;
                    if (tryCount <= 5)
                    {
                        SqlQry = gotoLoopsqlqry;
                        goto gotoLoop;
                    }
                    else
                        gotoLoopsqlqry = "";
                }
            }
            finally
            {
                con.Close();
                //con.Dispose();
                // SqlConnection.ClearPool();
            };
            return dt.Rows[0].ItemArray[0].ToString().Replace("ifnull", "isnull");

            //return string.Empty;
        }

        public string QueryconfigForList(string screenname, ref string orderby, ref string groupby)
        {

            int tryCount = 0;
         
            var SqlQry = "select QueryText ,  OrderText ,GroupText from Queryconfig where screenname ='" + screenname + "' and SolutionName = '" + _solutionName + "'";
            QueryLog(SqlQry);
            var gotoLoopsqlqry = SqlQry;
        gotoLoop:
            SqlConnection con = new SqlConnection(constr);
            try
            {
                con.Close();

                DataTable dtSNo = new DataTable();
                //  dtSNo = db.retsulDataTable(SqlQry);

                //  DataTable dt = new DataTable();
                DataSet ds = new DataSet();
                con.Open();
                SqlDataAdapter sda = new SqlDataAdapter(SqlQry, con);
                sda.Fill(ds);
                // con.Close();

                dt = ds.Tables[0];
                //return dt.Rows[0].ItemArray[0].ToString().Replace("ifnull", "isnull");
                // string result = JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                if ((ex.Message.IndexOf("was deadlocked on lock | communication buffer resources with another process and has been chosen as the deadlock victim") > -1 || ex.Message.IndexOf("resources with another process and has been chosen as the deadlock victim") > -1) && gotoLoopsqlqry != "")
                {
                    System.Threading.Thread.Sleep(5000); // 5 second
                    tryCount = tryCount + 1;
                    if (tryCount <= 5)
                    {
                        SqlQry = gotoLoopsqlqry;
                        goto gotoLoop;
                    }
                    else
                        gotoLoopsqlqry = "";
                }
            }
            finally
            {
                con.Close();
                //con.Dispose();
                // SqlConnection.ClearPool();
            };
            orderby = dt.Rows.Count == 0 ? string.Empty : dt.Rows[0].ItemArray[1].ToString().Replace("ifnull", "isnull");
            groupby = dt.Rows.Count == 0 ? string.Empty : dt.Rows[0].ItemArray[2].ToString().Replace("ifnull", "isnull");
            return dt.Rows.Count == 0 ? string.Empty : dt.Rows[0].ItemArray[0].ToString().Replace("ifnull", "isnull");


            //return string.Empty;
        }
        public string ExportQueryconfigForList(string query, ref string orderby, ref string groupby)
        {
            int tryCount = 0;
            QueryLog(query);
            var SqlQry = query;
            var gotoLoopsqlqry = SqlQry;
        gotoLoop:
            SqlConnection con = new SqlConnection(constr);
            try
            {
                con.Close();
                              
                DataTable dtSNo = new DataTable();
                //  dtSNo = db.retsulDataTable(SqlQry);

                //  DataTable dt = new DataTable();
                DataSet ds = new DataSet();
                con.Open();
                SqlDataAdapter sda = new SqlDataAdapter(SqlQry, con);
                sda.Fill(ds);
                // con.Close();

                dt = ds.Tables[0];
                //return dt.Rows[0].ItemArray[0].ToString().Replace("ifnull", "isnull");
                // string result = JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                QueryLog(query + System.Environment.NewLine + "=========================================================== " + System.Environment.NewLine + "Exception : " + ex.Message + System.Environment.NewLine + "=========================================================== ");
                //ErrorLogWithQuery(ex, query);
                if ((ex.Message.IndexOf("was deadlocked on lock | communication buffer resources with another process and has been chosen as the deadlock victim") > -1 || ex.Message.IndexOf("resources with another process and has been chosen as the deadlock victim") > -1) && gotoLoopsqlqry != "")
                {
                    System.Threading.Thread.Sleep(5000); // 5 second
                    tryCount = tryCount + 1;
                    if (tryCount <= 5)
                    {
                        SqlQry = gotoLoopsqlqry;
                        goto gotoLoop;
                    }
                    else
                        gotoLoopsqlqry = "";
                }
            }
            finally
            {
                con.Close();
                //con.Dispose();
                // SqlConnection.ClearPool();
            };
            orderby = dt.Rows.Count == 0 ? string.Empty : dt.Rows[0].ItemArray[1].ToString().Replace("ifnull", "isnull");
            groupby = dt.Rows.Count == 0 ? string.Empty : dt.Rows[0].ItemArray[2].ToString().Replace("ifnull", "isnull");
            return dt.Rows.Count == 0 ? string.Empty : dt.Rows[0].ItemArray[0].ToString().Replace("ifnull", "isnull");


            //return string.Empty;
        }



        public string getRowList(string query)
        {
            QueryLog(query);
            int tryCount = 0;
           var gotoLoopsqlqry = query;
            string result = string.Empty;
        gotoLoop:
            try
            {

                DataTable dtSNo = new DataTable();
                //  dtSNo = db.retsulDataTable(SqlQry);

                // DataTable dt = new DataTable();
                DataSet ds = new DataSet();
                SqlConnection con = new SqlConnection(constr);
                con.Open();
                SqlDataAdapter sda = new SqlDataAdapter(query, con);
                sda.Fill(ds);
                con.Close();
                dt = ds.Tables[0];
                result = JsonConvert.SerializeObject(dt);
                
            }
            catch (Exception ex)
            {
                QueryLog(query + System.Environment.NewLine + "=========================================================== " + System.Environment.NewLine + "Exception : " + ex.Message + System.Environment.NewLine + "=========================================================== ");
                //ErrorLogWithQuery(ex, query);
                if ((ex.Message.IndexOf("was deadlocked on lock | communication buffer resources with another process and has been chosen as the deadlock victim") > -1 || ex.Message.IndexOf("resources with another process and has been chosen as the deadlock victim") > -1) && gotoLoopsqlqry != "")
                {
                    System.Threading.Thread.Sleep(5000); // 5 second
                    tryCount = tryCount + 1;
                    if (tryCount <= 5)
                    {
                        query = gotoLoopsqlqry;
                        goto gotoLoop;
                    }
                    else
                        gotoLoopsqlqry = "";
                }
            }
            finally
            {
                con.Close();
            };
            return result;
        }

        public string getHeaderList(string screenName, string accessLevel, string Qry)
        {
            //bool isqueryText = false;
            //var query = "select * from listconfig where screenname ='" + screenName + "' and Language ='" + _Language + "' order by displayno";
            var query = "select * from listconfig where  solutionname='" + _solutionName + "' and  screenname ='" + screenName + "' and Language ='" + _Language + "' and (AccessLevel is null or AccessLevel ='" + accessLevel + "') order by displayno";
            if (Qry != null && Qry != "")
                query = Qry + " and Language = '" + _Language + "' and(AccessLevel is null or AccessLevel = '" + accessLevel + "') order by displayno";

            //First://goto loop logic
            //if (isqueryText == true)
            //    query = query + " and Language = '" + _Language + "' and(AccessLevel is null or AccessLevel = '" + accessLevel + "') order by displayno";
            QueryLog(query);

            int tryCount = 0;
            var gotoLoopsqlqry = query;
        gotoLoop:
            try
            {
                DataTable dtSNo = new DataTable();

                DataSet ds = new DataSet();
                SqlConnection con = new SqlConnection(constr);
                con.Open();

                SqlDataAdapter sda = new SqlDataAdapter(query, con);
                sda.Fill(ds);
                con.Close();
                dt = ds.Tables[0];
                string result = JsonConvert.SerializeObject(dt);

                return result;
            }
            catch (Exception ex)
            {
                QueryLog(query + System.Environment.NewLine + "=========================================================== " + System.Environment.NewLine + "Exception : " + ex.Message + System.Environment.NewLine + "=========================================================== ");
                //ErrorLogWithQuery(ex, query);
                if ((ex.Message.IndexOf("was deadlocked on lock | communication buffer resources with another process and has been chosen as the deadlock victim") > -1 || ex.Message.IndexOf("resources with another process and has been chosen as the deadlock victim") > -1) && gotoLoopsqlqry != "")
                {
                    System.Threading.Thread.Sleep(5000); // 5 second
                    tryCount = tryCount + 1;
                    if (tryCount <= 5)
                    {
                        query = gotoLoopsqlqry;
                        goto gotoLoop;
                    }
                    else
                        gotoLoopsqlqry = "";
                }
            }
            finally
            {
                con.Close();
            };
            return string.Empty;
        }


        public string GetFormList(string screenName, string accessLevel)
        {
            string result = string.Empty;
            var isAccessLevel = HttpContext.Current.Session["IsAccessLevel"].ToString();
            string strprojectName = ConfigurationManager.AppSettings["ProjectName"].ToString().ToUpper().Trim();
            //string straccessLevel = Session["AccessLevel"].ToString();

            var query = "";

            strprojectName = (strprojectName == null ? "" : strprojectName);
            if (isAccessLevel == "1" || strprojectName == "ETIKA" || strprojectName == "PVM" || strprojectName == "JSU" || strprojectName == "SANDL" || strprojectName == "TRADEPROIMPEX" || strprojectName == "FFB" || strprojectName == "CPF" || strprojectName == "WMS" || strprojectName == "SEJ" || strprojectName == "FGV" || strprojectName == "EBFF")
            {
               // _Language = "";
                if (_Language == "")
                {
                    _Language = HttpContext.Current.Session["Language"].ToString();
                   // _Language = "";
                    if (_Language == "")
                    {
                        DataTable salesAgentData = getDataTableList("select * from SalesAgent where UserID='" + HttpContext.Current.Session["UserId"].ToString() + "' COLLATE Latin1_General_CS_AS");
                        _Language = salesAgentData.Rows[0]["Language"].ToString();
                    }
                }
                query = "select * from FormConfig where  solutionname='" + _solutionName + "' and  screenname ='" + screenName + "' and Language = '" + _Language + "'"
                                + " and (AccessLevel is null or AccessLevel ='" + accessLevel + "') "
                                + " order by displayno";
            }
            else
            {
                query = "select * from FormConfig where solutionname='" + _solutionName + "' and   screenname ='" + screenName + "' and Language = '" + _Language + "' order by displayno";
            }

            QueryLog(query);

            int tryCount = 0;
            var gotoLoopsqlqry = query;
        gotoLoop:
            try
            {
                //var query = "select * from FormConfig where   screenname ='" + value + "' and IsHidden = 'False' order by displayno";
                // var query = "select * from FormConfig where   screenname ='" + screenName + "'  order by displayno";

                DataTable dtSNo = new DataTable();
                //dtSNo = db.retsulDataTable(SqlQry);

                // DataTable dt = new DataTable();
                DataSet ds = new DataSet();
                SqlConnection con = new SqlConnection(constr);
                con.Open();
                SqlDataAdapter sda = new SqlDataAdapter(query, con);
                sda.Fill(ds);
                con.Close();
                dt = ds.Tables[0];
                result = JsonConvert.SerializeObject(dt);
                return result;
            }
            catch (Exception ex)
            {
                QueryLog(query + System.Environment.NewLine + "=========================================================== " + System.Environment.NewLine + "Exception : " + ex.Message + System.Environment.NewLine + "=========================================================== ");
                //ErrorLogWithQuery(ex, query);
                if ((ex.Message.IndexOf("was deadlocked on lock | communication buffer resources with another process and has been chosen as the deadlock victim") > -1 || ex.Message.IndexOf("resources with another process and has been chosen as the deadlock victim") > -1) && gotoLoopsqlqry != "")
                {
                    System.Threading.Thread.Sleep(5000); // 5 second
                    tryCount = tryCount + 1;
                    if (tryCount <= 5)
                    {
                        query = gotoLoopsqlqry;
                        goto gotoLoop;
                    }
                    else
                        gotoLoopsqlqry = "";
                }
            }
            finally
            {
                con.Close();
            };
            return result;
        }
        public string getValueListOld(string query)
        {
            QueryLog(query);
            int tryCount = 0;
            var gotoLoopsqlqry = query;
        gotoLoop:
            try
            {
                
                DataSet ds = new DataSet();
                SqlConnection con = new SqlConnection(constr);
                con.Open();
                SqlDataAdapter sda = new SqlDataAdapter(query, con);
                sda.SelectCommand.CommandTimeout = 3600;// 600;  //30*60=1800 // 60- seconds
                sda.Fill(ds);
                //ErrorLogString("sda.Fill(ds) end");
                con.Close();
                if (ds.Tables.Count > 0)
                    dt = ds.Tables[0];
                string result = JsonConvert.SerializeObject(dt);
                return result;
            }
            catch (Exception ex)
            {
                QueryLog(query + System.Environment.NewLine + "=========================================================== " + System.Environment.NewLine + "Exception : " + ex.Message + System.Environment.NewLine + "=========================================================== ");
                //ErrorLogWithQuery(ex, query);
                if ((ex.Message.IndexOf("was deadlocked on lock | communication buffer resources with another process and has been chosen as the deadlock victim") > -1 || ex.Message.IndexOf("resources with another process and has been chosen as the deadlock victim") > -1) && gotoLoopsqlqry != "")
                {
                    System.Threading.Thread.Sleep(5000); // 5 second
                    tryCount = tryCount + 1;
                    if (tryCount <= 5)
                    {
                        query = gotoLoopsqlqry;
                        goto gotoLoop;
                    }
                    else
                        gotoLoopsqlqry = "";
                }
            }
            finally
            {
                con.Close();
            };
            return string.Empty;
        }

        public string executerQueryxyz(string sqlqry)
        {
            var gotoLoopsqlqry = sqlqry;
            var tryCount = 0;
            gotoLoop:

            QueryLog(sqlqry);
            string result = "";
            // con = new SqlConnection(dtConString());
            con = new SqlConnection(constr);
            con.Open();

            cmd = new SqlCommand();

            sqltran = con.BeginTransaction("s1");

            cmd.Connection = con;
            cmd.Transaction = sqltran;

            try
            {
                cmd.CommandText = sqlqry;
                cmd.ExecuteNonQuery();
                sqltran.Commit();
                result = "1";
            }

            catch (Exception ex)
            {
                QueryLog(sqlqry + System.Environment.NewLine + "=========================================================== " + System.Environment.NewLine + "Exception : " + ex.Message + System.Environment.NewLine + "=========================================================== ");
                //ErrorLogWithQuery(ex, sqlqry);
                result = ex.Message;
                try
                {
                    sqltran.Rollback();
                }
                catch (Exception ex1)
                {
                    ErrorLog(ex1);
                    result = "0";
                }

                if ((ex.Message.IndexOf("was deadlocked on lock | communication buffer resources with another process and has been chosen as the deadlock victim") > -1 || ex.Message.IndexOf("resources with another process and has been chosen as the deadlock victim") > -1) && gotoLoopsqlqry != "")
                {
                    System.Threading.Thread.Sleep(5000); // 5 second
                    
                    tryCount = tryCount + 1;
                    if (tryCount <= 5)
                    {
                        sqlqry = gotoLoopsqlqry;
                        goto gotoLoop;
                    }
                    else
                    gotoLoopsqlqry = "";
       
                    
                }
            }
            finally
            {
                con.Close();
            };

            return result;
        }

        public string getValueList(string query)
        {
            var gotoLoopsqlqry = query;
            int deadlockCnt = 0;
            gotoLoop:
            QueryLog(query);

            SqlConnection conn = new SqlConnection(constr);
            try
            {
                // Create a Conenction object  
                // Create a command object  
                SqlCommand cmd = new SqlCommand(query, conn);
                //Changed by Nisha/Vishnu on 11.12.2023 
                conn.Close();


                conn.Open();
                cmd.CommandTimeout = 3600;// 600;  //30*60=1800 // 60- seconds
                // Call ExecuteReader to return a DataReader  
                SqlDataReader reader = cmd.ExecuteReader();

                DataTable dt = new DataTable();
                dt.Load(reader);
                // Release resources  
                reader.Close();
                conn.Close();

                string result = JsonConvert.SerializeObject(dt);
                return result;

            }
            catch (Exception ex)
            {
                //QueryLog(query + System.Environment.NewLine + "=========================================================== " + System.Environment.NewLine);
                QueryLog("Exception : " + ex.Message);
                conn.Close();
                if ((ex.Message.IndexOf("was deadlocked on lock | communication buffer resources with another process and has been chosen as the deadlock victim") > -1 || ex.Message.IndexOf("resources with another process and has been chosen as the deadlock victim") > -1) && gotoLoopsqlqry != "")
                {
                    deadlockCnt++;
                    System.Threading.Thread.Sleep(deadlockCnt * 1000); // 1000 is 1 second
                    query = gotoLoopsqlqry;
                    //Changes Made by Nisha/Vishnu on 11/12/2023
                    //if (deadlockCnt <= 5)
                    //    gotoLoopsqlqry = "";
                    ////con.Close();
                    //goto gotoLoop;

                    if (deadlockCnt >= 5)
                    {
                        gotoLoopsqlqry = "";
                        con.Close();
                    }
                    else
                        goto gotoLoop;
                }
            }
            finally
            {
                con.Close();
            };
            return string.Empty;

        }

        public string SuggestedOrderQuantity(string query)
        {
            QueryLog(query);
            int tryCount = 0;
            var gotoLoopsqlqry = query;
        gotoLoop:
            try
            {
               // DataTable dt = new DataTable();
                DataSet ds = new DataSet();
                SqlConnection con = new SqlConnection(constr);
                con.Open();
                SqlDataAdapter sda = new SqlDataAdapter(query, con);
                sda.SelectCommand.CommandTimeout = 3600;  //30*60=1800 // 60- seconds
                sda.Fill(ds);
                //ErrorLogString("sda.Fill(ds) end");
                con.Close();
                dt = ds.Tables[0];
                string result = JsonConvert.SerializeObject(dt);
                return result;
            }
            catch (Exception ex)
            {
                QueryLog(query + System.Environment.NewLine + "=========================================================== " + System.Environment.NewLine + "Exception : " + ex.Message + System.Environment.NewLine + "=========================================================== ");
                //ErrorLogWithQuery(ex, query);
                if ((ex.Message.IndexOf("was deadlocked on lock | communication buffer resources with another process and has been chosen as the deadlock victim") > -1 || ex.Message.IndexOf("resources with another process and has been chosen as the deadlock victim") > -1) && gotoLoopsqlqry != "")
                {
                    System.Threading.Thread.Sleep(5000); // 5 second

                    tryCount = tryCount + 1;
                    if (tryCount <= 5)
                    {
                        query = gotoLoopsqlqry;
                        goto gotoLoop;
                    }
                    else
                        gotoLoopsqlqry = "";


                }
            }
            finally
            {
                con.Close();
            };
            return string.Empty;
        }


        public DataTable getDataTableList(string query)
        {
            QueryLog(query);
            int tryCount = 0;
            var gotoLoopsqlqry = query;
        gotoLoop:
            try
            {
                // DataTable dt = new DataTable();
                DataSet ds = new DataSet();
                SqlConnection con = new SqlConnection(constr);
                con.Open();
                SqlDataAdapter sda = new SqlDataAdapter(query, con);
                sda.SelectCommand.CommandTimeout = 100;  //60- seconds
                sda.Fill(ds);
                con.Close();
                dt = ds.Tables[0];
                return dt;
            }
            catch (Exception ex)
            {
                QueryLog(query + System.Environment.NewLine + "=========================================================== " + System.Environment.NewLine + "Exception : " + ex.Message + System.Environment.NewLine + "=========================================================== ");
                //ErrorLogWithQuery(ex, query);
                if ((ex.Message.IndexOf("was deadlocked on lock | communication buffer resources with another process and has been chosen as the deadlock victim") > -1 || ex.Message.IndexOf("resources with another process and has been chosen as the deadlock victim") > -1) && gotoLoopsqlqry != "")
                {
                    System.Threading.Thread.Sleep(5000); // 5 second

                    tryCount = tryCount + 1;
                    if (tryCount <= 5)
                    {
                        query = gotoLoopsqlqry;
                        goto gotoLoop;
                    }
                    else
                        gotoLoopsqlqry = "";


                }
            }
            finally
            {
                con.Close();
            };
            return dt;
        }

        public string getValueList1(string query)
        {
            var gotoLoopsqlqry = query;
            int deadlockCnt = 0;
            gotoLoop:
            QueryLog(query);

            SqlConnection conn = new SqlConnection(constr);
            try
            {
                // Create a Conenction object  
                // Create a command object  
                SqlCommand cmd = new SqlCommand(query, conn);
                //Changed by Nisha/Vishnu on 11.12.2023 
                conn.Close();


                conn.Open();
                cmd.CommandTimeout = 3600;// 600;  //30*60=1800 // 60- seconds
                // Call ExecuteReader to return a DataReader  

                SqlDataAdapter da = new SqlDataAdapter();
                DataSet ds = new DataSet();
                da.SelectCommand = cmd;

                da.Fill(ds);

                conn.Close();

                dt = new DataTable();
                dt = ds.Tables[0];


                try
                {
                    for (int z = 1; z < ds.Tables.Count; z++)
                    {
                        dt.Rows.Add(ds.Tables[z].Rows[0].ItemArray[0]);
                    }

                }
                catch (Exception)
                {

                    // throw;
                }

                string result = JsonConvert.SerializeObject(dt);
                return result;

            }
            catch (Exception ex)
            {
                //QueryLog(query + System.Environment.NewLine + "=========================================================== " + System.Environment.NewLine);
                QueryLog("Exception : " + ex.Message);
                conn.Close();
                if ((ex.Message.IndexOf("was deadlocked on lock | communication buffer resources with another process and has been chosen as the deadlock victim") > -1 || ex.Message.IndexOf("resources with another process and has been chosen as the deadlock victim") > -1) && gotoLoopsqlqry != "")
                {
                    deadlockCnt++;
                    System.Threading.Thread.Sleep(deadlockCnt * 1000); // 1000 is 1 second
                    query = gotoLoopsqlqry;
                    //Changes Made by Nisha/Vishnu on 11/12/2023
                    //if (deadlockCnt <= 5)
                    //    gotoLoopsqlqry = "";
                    ////con.Close();
                    //goto gotoLoop;

                    if (deadlockCnt >= 5)
                    {
                        gotoLoopsqlqry = "";
                        con.Close();
                    }
                    else
                        goto gotoLoop;
                }
            }
            finally
            {
                con.Close();
            };
            return string.Empty;

        }

        public DataTable getDataTableLst(string query)
        {
            QueryLog(query);
            int tryCount = 0;
            var gotoLoopsqlqry = query;
        gotoLoop:
            try
            {
                // DataTable dt = new DataTable();
                DataSet ds = new DataSet();
                SqlConnection con = new SqlConnection(constr);
                con.Open();
                SqlDataAdapter sda = new SqlDataAdapter(query, con);
                sda.SelectCommand.CommandTimeout = 100;  //60- seconds
                sda.Fill(ds);
                con.Close();
                dt = ds.Tables[0];
                return dt;
            }
            catch (Exception ex)
            {
                QueryLog(query + System.Environment.NewLine + "=========================================================== " + System.Environment.NewLine + "Exception : " + ex.Message + System.Environment.NewLine + "=========================================================== ");
                //ErrorLogWithQuery(ex, query);
                if ((ex.Message.IndexOf("was deadlocked on lock | communication buffer resources with another process and has been chosen as the deadlock victim") > -1 || ex.Message.IndexOf("resources with another process and has been chosen as the deadlock victim") > -1) && gotoLoopsqlqry != "")
                {
                    System.Threading.Thread.Sleep(5000); // 5 second

                    tryCount = tryCount + 1;
                    if (tryCount <= 5)
                    {
                        query = gotoLoopsqlqry;
                        goto gotoLoop;
                    }
                    else
                        gotoLoopsqlqry = "";


                }
            }
            finally
            {
                con.Close();
            };
            return dt;
        }
        public string getFieldList(string query)
        {
            QueryLog(query);
            int tryCount = 0;
            var gotoLoopsqlqry = query;
        gotoLoop:
            try
            {
                //DataTable dt = new DataTable();
                DataSet ds = new DataSet();
                SqlConnection con = new SqlConnection(constr);
                con.Open();
                SqlDataAdapter sda = new SqlDataAdapter(query, con);
                sda.Fill(ds);
                con.Close();
                dt = ds.Tables[0];

                ///

                System.Web.Script.Serialization.JavaScriptSerializer serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
                //List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
                //Dictionary<string, object> row;
                var modelList = new List<SystemModel>();
                var model = new SystemModel();
                foreach (DataRow dr in dt.Rows)
                {
                    //row = new Dictionary<string, object>();
                    foreach (DataColumn col in dt.Columns)
                    {
                        model = new SystemModel();
                        model.FieldName = col.ColumnName;
                        model.Field = dr[col].ToString();
                        modelList.Add(model);
                        //  row.Add(col.ColumnName, dr[col]);
                    }
                    // rows.Add(row);
                }
                /// 
                return serializer.Serialize(modelList);
            }
            catch (Exception ex)
            {
                QueryLog(query + System.Environment.NewLine + "=========================================================== " + System.Environment.NewLine + "Exception : " + ex.Message + System.Environment.NewLine + "=========================================================== ");
                //ErrorLogWithQuery(ex, query);
                if ((ex.Message.IndexOf("was deadlocked on lock | communication buffer resources with another process and has been chosen as the deadlock victim") > -1 || ex.Message.IndexOf("resources with another process and has been chosen as the deadlock victim") > -1) && gotoLoopsqlqry != "")
                {
                    System.Threading.Thread.Sleep(5000); // 5 second

                    tryCount = tryCount + 1;
                    if (tryCount <= 5)
                    {
                        query = gotoLoopsqlqry;
                        goto gotoLoop;
                    }
                    else
                        gotoLoopsqlqry = "";


                }
            }
            finally
            {
                con.Close();
            };
            return string.Empty;
        }

        public string getNameValueList(string query)
        {
            QueryLog(query);
            int tryCount = 0;
            var gotoLoopsqlqry = query;
        gotoLoop:
            try
            {
                //DataTable dt = new DataTable();
                DataSet ds = new DataSet();
                SqlConnection con = new SqlConnection(constr);
                con.Open();
                SqlDataAdapter sda = new SqlDataAdapter(query, con);
                sda.Fill(ds);
                con.Close();
                dt = ds.Tables[0];

                ///

                System.Web.Script.Serialization.JavaScriptSerializer serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
                //List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
                //Dictionary<string, object> row;
                var modelList = new List<NameValue>();
                var model = new NameValue();
                foreach (DataRow dr in dt.Rows)
                {
                    //row = new Dictionary<string, object>();
                    foreach (DataColumn col in dt.Columns)
                    {
                        model = new NameValue();
                        model.name = col.ColumnName;
                        model.value = dr[col].ToString();
                        modelList.Add(model);
                        //  row.Add(col.ColumnName, dr[col]);
                    }
                    // rows.Add(row);
                }
                /// 
                return serializer.Serialize(modelList);
            }
            catch (Exception ex)
            {
                QueryLog(query + System.Environment.NewLine + "=========================================================== " + System.Environment.NewLine + "Exception : " + ex.Message + System.Environment.NewLine + "=========================================================== ");
                //ErrorLogWithQuery(ex, query);
                if ((ex.Message.IndexOf("was deadlocked on lock | communication buffer resources with another process and has been chosen as the deadlock victim") > -1 || ex.Message.IndexOf("resources with another process and has been chosen as the deadlock victim") > -1) && gotoLoopsqlqry != "")
                {
                    System.Threading.Thread.Sleep(5000); // 5 second

                    tryCount = tryCount + 1;
                    if (tryCount <= 5)
                    {
                        query = gotoLoopsqlqry;
                        goto gotoLoop;
                    }
                    else
                        gotoLoopsqlqry = "";


                }
            }
            finally
            {
                con.Close();
            };
            return string.Empty;
        }


        public string GetMultiSeriesLineChart(string query)
        {
            QueryLog(query);
            int tryCount = 0;
            var gotoLoopsqlqry = query;
        gotoLoop:
            try
            {
               //DataTable dt = new DataTable();
                DataSet ds = new DataSet();
                SqlConnection con = new SqlConnection(constr);
                con.Open();
                SqlDataAdapter sda = new SqlDataAdapter(query, con);
                sda.Fill(ds);
                con.Close();
                dt = ds.Tables[0];

                ///

                System.Web.Script.Serialization.JavaScriptSerializer serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
                //List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
                //Dictionary<string, object> row;
                var modelList = new List<SystemModel>();
                var model = new SystemModel();
                var date = string.Empty;
                foreach (DataRow dr in dt.Rows)
                {
                    //row = new Dictionary<string, object>();
                    date = string.Empty;
                    foreach (DataColumn col in dt.Columns)
                    {
                        model = new SystemModel();
                        if (col.ColumnName == "date")
                        {
                            //model.date = dr[col].ToString();
                            date = dr[col].ToString();
                        }
                        else
                        {
                            model.date = date;
                            model.Label = col.ColumnName;
                            model.Value = dr[col].ToString();
                            modelList.Add(model);
                        }
                        //modelList.Add(model);
                        //  row.Add(col.ColumnName, dr[col]);
                    }
                    // rows.Add(row);
                }
                /// 
                return serializer.Serialize(modelList);
            }
            catch (Exception ex)
            {
                QueryLog(query + System.Environment.NewLine + "=========================================================== " + System.Environment.NewLine + "Exception : " + ex.Message + System.Environment.NewLine + "=========================================================== ");
                //ErrorLogWithQuery(ex, query);
                if ((ex.Message.IndexOf("was deadlocked on lock | communication buffer resources with another process and has been chosen as the deadlock victim") > -1 || ex.Message.IndexOf("resources with another process and has been chosen as the deadlock victim") > -1) && gotoLoopsqlqry != "")
                {
                    System.Threading.Thread.Sleep(5000); // 5 second

                    tryCount = tryCount + 1;
                    if (tryCount <= 5)
                    {
                        query = gotoLoopsqlqry;
                        goto gotoLoop;
                    }
                    else
                        gotoLoopsqlqry = "";


                }
            }
            finally
            {
                con.Close();
            };
            return string.Empty;
        }
        public string getPaginationValue(string _solutionName)
        {
            var systemlistQry = "select SystemValue from systemlist where code ='PaginationLimit' and SolutionName='" + _solutionName + "'";
                       
            try
            {
                var systemValue = getQueryString(systemlistQry);
                PaginationValue = systemValue;
                return systemValue;
            }
            catch (Exception ex)
            {
                QueryLog(systemlistQry + System.Environment.NewLine + "=========================================================== " + System.Environment.NewLine + "Exception : " + ex.Message + System.Environment.NewLine + "=========================================================== ");
                //ErrorLogWithQuery(ex, systemlistQry);
                
            }
            return string.Empty;
        }
        public void getYearPickerLimit(string _solutionName)
        {
            var systemlistQry = "select SystemValue from systemlist where code ='YearPickerLimit' and SolutionName='" + _solutionName + "'";
            try
            {
                var systemValue = getQueryString(systemlistQry);
                _YearPickerLimit = systemValue;
            }
            catch (Exception ex)
            {
                QueryLog(systemlistQry + System.Environment.NewLine + "=========================================================== " + System.Environment.NewLine + "Exception : " + ex.Message + System.Environment.NewLine + "=========================================================== ");
                //ErrorLogWithQuery(ex, systemlistQry);
            }
        }
        public string getQueryString(string query)
        {
            QueryLog(query);
            int tryCount = 0;
            var gotoLoopsqlqry = query;
        gotoLoop:
            try
            {
                DataTable dtSNo = new DataTable();
                //dtSNo = db.retsulDataTable(SqlQry);

                // DataTable dt = new DataTable();
                DataSet ds = new DataSet();
                SqlConnection con = new SqlConnection(constr);
                con.Open();
                SqlDataAdapter sda = new SqlDataAdapter(query, con);
                // sda.SelectCommand.CommandTimeout = 60;  // seconds
                sda.Fill(ds);
                con.Close();
                dt = ds.Tables[0];
                string result = dt.Rows.Count == 0 ? "" : dt.Rows[0].ItemArray[0].ToString();
                return result;
            }
            catch (Exception ex)
            {
                QueryLog(query + System.Environment.NewLine + "=========================================================== " + System.Environment.NewLine + "Exception : " + ex.Message + System.Environment.NewLine + "=========================================================== ");
                //ErrorLogWithQuery(ex, query);
                if ((ex.Message.IndexOf("was deadlocked on lock | communication buffer resources with another process and has been chosen as the deadlock victim") > -1 || ex.Message.IndexOf("resources with another process and has been chosen as the deadlock victim") > -1) && gotoLoopsqlqry != "")
                {
                    System.Threading.Thread.Sleep(5000); // 5 second

                    tryCount = tryCount + 1;
                    if (tryCount <= 5)
                    {
                        query = gotoLoopsqlqry;
                        goto gotoLoop;
                    }
                    else
                        gotoLoopsqlqry = "";
                }
            }
            finally
            {
                con.Close();
            };
            return string.Empty;
        }

        public string DeleteQuery(string query)
        {
            QueryLog(query);
            int tryCount = 0;
            var gotoLoopsqlqry = query;
        gotoLoop:
            var message = string.Empty;
            try
            {
                DataTable dtSNo = new DataTable();
                //dtSNo = db.retsulDataTable(SqlQry);

                //DataTable dt = new DataTable();
                DataSet ds = new DataSet();
                SqlConnection con = new SqlConnection(constr);
                con.Open();
                SqlDataAdapter sda = new SqlDataAdapter(query, con);
                sda.Fill(ds);
                con.Close();
                if (ds.ExtendedProperties.Count == 0)
                {
                    message = "Deleted succesfully!";
                }
            }
            catch (Exception ex)
            {
                QueryLog(query + System.Environment.NewLine + "=========================================================== " + System.Environment.NewLine + "Exception : " + ex.Message + System.Environment.NewLine + "=========================================================== ");
                //ErrorLogWithQuery(ex, query);
                if ((ex.Message.IndexOf("was deadlocked on lock | communication buffer resources with another process and has been chosen as the deadlock victim") > -1 || ex.Message.IndexOf("resources with another process and has been chosen as the deadlock victim") > -1) && gotoLoopsqlqry != "")
                {
                    System.Threading.Thread.Sleep(5000); // 5 second

                    tryCount = tryCount + 1;
                    if (tryCount <= 5)
                    {
                        query = gotoLoopsqlqry;
                        goto gotoLoop;
                    }
                    else
                        gotoLoopsqlqry = "";
                }
            }
            finally
            {
                con.Close();
            };
            return string.Empty;

        }

        public string GetMenuConfigList(string screenName)
        {
            var query = string.Empty;
            if (BusinessRule._solutionName == "SALES-WEB-UL")
            {
                if (screenName == null || screenName == "")
                    query = "select * from menuconfig where  AccessLevel= '" + _AccessLevel + "' and Visible= 1 order by displayno";
                else
                    query = "select * from menuconfig where screenname ='" + screenName + "' and AccessLevel= '" + _AccessLevel + "'  and Visible= 1 order by displayno";
            }
            else
            {
                if (screenName == null || screenName == "")
                    query = "select * from menuconfig where  AccessLevel= '1' and Visible= 1 order by displayno";
                else
                    query = "select * from menuconfig where screenname ='" + screenName + "' and AccessLevel= '1'  and Visible= 1 order by displayno";
            }
            QueryLog(query);

            int tryCount = 0;
            var gotoLoopsqlqry = query;
        gotoLoop:
            try
            {

                //-- select * from Gridfunctions where screenname ='' and Access ='' and solutionName  --solutionName direct set query

                
                DataTable dtSNo = new DataTable();
                //  dtSNo = db.retsulDataTable(SqlQry);

                // DataTable dt = new DataTable();
                DataSet ds = new DataSet();
                SqlConnection con = new SqlConnection(constr);
                con.Open();

                SqlDataAdapter sda = new SqlDataAdapter(query, con);
                sda.Fill(ds);
                con.Close();
                dt = ds.Tables[0];
                string result = JsonConvert.SerializeObject(dt);
                return result;
            }
            catch (Exception ex)
            {
                QueryLog(query + System.Environment.NewLine + "=========================================================== " + System.Environment.NewLine + "Exception : " + ex.Message + System.Environment.NewLine + "=========================================================== ");
                //ErrorLogWithQuery(ex, query);
                if ((ex.Message.IndexOf("was deadlocked on lock | communication buffer resources with another process and has been chosen as the deadlock victim") > -1 || ex.Message.IndexOf("resources with another process and has been chosen as the deadlock victim") > -1) && gotoLoopsqlqry != "")
                {
                    System.Threading.Thread.Sleep(5000); // 5 second

                    tryCount = tryCount + 1;
                    if (tryCount <= 5)
                    {
                        query = gotoLoopsqlqry;
                        goto gotoLoop;
                    }
                    else
                        gotoLoopsqlqry = "";
                }
            }
            finally
            {
                con.Close();
            };
            return string.Empty;

        }

        public string GetModuleConfigList(string screenName)
        {
            var query = string.Empty;
            if (screenName == null || screenName == "")
                query = "select * from ModuleConfig where  AccessLevel= '1' and Visible= 1 order by displayno";
            else
                query = "select * from ModuleConfig where screenname ='" + screenName + "' and AccessLevel= '1'  and Visible= 1 order by displayno";
            QueryLog(query);

            int tryCount = 0;
            var gotoLoopsqlqry = query;
        gotoLoop:
            try
            {
                
                DataTable dtSNo = new DataTable();
                //  dtSNo = db.retsulDataTable(SqlQry);

                // DataTable dt = new DataTable();
                DataSet ds = new DataSet();
                SqlConnection con = new SqlConnection(constr);
                con.Open();

                SqlDataAdapter sda = new SqlDataAdapter(query, con);
                sda.Fill(ds);
                con.Close();
                dt = ds.Tables[0];
                string result = JsonConvert.SerializeObject(dt);
                return result;
            }
            catch (Exception ex)
            {
                QueryLog(query + System.Environment.NewLine + "=========================================================== " + System.Environment.NewLine + "Exception : " + ex.Message + System.Environment.NewLine + "=========================================================== ");
                //ErrorLogWithQuery(ex, query);
                if ((ex.Message.IndexOf("was deadlocked on lock | communication buffer resources with another process and has been chosen as the deadlock victim") > -1 || ex.Message.IndexOf("resources with another process and has been chosen as the deadlock victim") > -1) && gotoLoopsqlqry != "")
                {
                    System.Threading.Thread.Sleep(5000); // 5 second

                    tryCount = tryCount + 1;
                    if (tryCount <= 5)
                    {
                        query = gotoLoopsqlqry;
                        goto gotoLoop;
                    }
                    else
                        gotoLoopsqlqry = "";
                }
            }
            finally
            {
                con.Close();
            };
            return string.Empty;

        }

        public string getDashList(string value1, string value2)
        {
            var query = "select FunctionText,RowNo,ColNo,HeaderHeight,HeaderWidth,ValueHeight,ValueWidth,HAlignment,GridFunctions.HForeColor,GridFunctions.HBackColor,GridFunctions.VForeColor,GridFunctions.VBackColor,VAlignment,HFont,HFontSize,HFontStyle,VFont,VFontSize,VFontStyle,IconImage from [GridFunctions] join formConfig on [GridFunctions].solutionname= FormConfig.SolutionName where FormConfig.ScreenName ='" + value1 + "' and GridFunctions.ScreenName = '" + value2 + "' and FormConfig.FieldControl = '" + value1 + "'";
            QueryLog(query);
            int tryCount = 0;
            var gotoLoopsqlqry = query;
        gotoLoop:
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
                return result2;
            }
            catch (Exception ex)
            {
                QueryLog(query + System.Environment.NewLine + "=========================================================== " + System.Environment.NewLine + "Exception : " + ex.Message + System.Environment.NewLine + "=========================================================== ");
                //ErrorLogWithQuery(ex, query);
                if ((ex.Message.IndexOf("was deadlocked on lock | communication buffer resources with another process and has been chosen as the deadlock victim") > -1 || ex.Message.IndexOf("resources with another process and has been chosen as the deadlock victim") > -1) && gotoLoopsqlqry != "")
                {
                    System.Threading.Thread.Sleep(5000); // 5 second

                    tryCount = tryCount + 1;
                    if (tryCount <= 5)
                    {
                        query = gotoLoopsqlqry;
                        goto gotoLoop;
                    }
                    else
                        gotoLoopsqlqry = "";
                }
            }
            finally
            {
                con.Close();
            };
            return string.Empty;
        }

        public SqlConnection con = new SqlConnection();
        public SqlCommand cmd = new SqlCommand();
        public SqlTransaction sqltran;

        public string dtConString()
        {
            // string sql = ConfigurationManager.ConnectionStrings["constr"].ToString();
            string sql = constr;
            return sql;
        }

        public string executerQuery(string sqlqry)
        {
            var gotoLoopsqlqry = sqlqry;

            gotoLoop:

            QueryLog(sqlqry);
            string result = "";
            // con = new SqlConnection(dtConString());
            con = new SqlConnection(constr);
            con.Open();

            cmd = new SqlCommand();

            sqltran = con.BeginTransaction("s1");

            cmd.Connection = con;
            cmd.Transaction = sqltran;

            try
            {
                cmd.CommandText = sqlqry;
                cmd.CommandTimeout = 1800;
                cmd.ExecuteNonQuery();
                sqltran.Commit();
                result = "1";
            }

            catch (Exception ex)
            {
                QueryLog(sqlqry + System.Environment.NewLine + "=========================================================== " + System.Environment.NewLine + "Exception : " + ex.Message + System.Environment.NewLine + "=========================================================== ");
                //ErrorLogWithQuery(ex, sqlqry);
                result = ex.Message;
                try
                {
                    sqltran.Rollback();
                }
                catch (Exception ex1)
                {
                    ErrorLog(ex1);
                    result = "0";
                }

                if ((ex.Message.IndexOf("was deadlocked on lock | communication buffer resources with another process and has been chosen as the deadlock victim") > -1 || ex.Message.IndexOf("resources with another process and has been chosen as the deadlock victim") > -1) && gotoLoopsqlqry != "")
                {
                    System.Threading.Thread.Sleep(5000); // 5 second
                    sqlqry = gotoLoopsqlqry;
                    gotoLoopsqlqry = "";
                    con.Close();
                    goto gotoLoop;
                }
            }
            finally
            {
                con.Close();
            };

            return result;
        }

        public string ExecuteNonQuery(string sqlqry)
        {
            //Changes made by Nisha/Vishnu on 11/12/2023
            int deadlockcnt = 0;
            var gotoLoopsqlqry = sqlqry;

            gotoLoop:
            QueryLog(sqlqry);
            string result = "";
            con = new SqlConnection(constr);
            //Changes Made by Nisha/Vishnu on 11/12/2023
            con.Close();

            con.Open();
            cmd = new SqlCommand();
            sqltran = con.BeginTransaction("Savepoint");
            cmd.Connection = con;
            cmd.Transaction = sqltran;

            try
            {
                dynamic sqlqryList = JsonConvert.DeserializeObject(sqlqry);

                for (int i = 0; i < sqlqryList.Count; i++)
                {
                    sqlqry = sqlqryList[i].ToString();
                    cmd.CommandText = sqlqry;
                    cmd.CommandTimeout = 3600;
                    cmd.ExecuteNonQuery();
                }
                sqltran.Commit();
                result = "1";
            }
            catch (Exception ex)
            {
                QueryLog(sqlqry + System.Environment.NewLine + "=========================================================== " + System.Environment.NewLine + "Exception : " + ex.Message + System.Environment.NewLine + "=========================================================== ");
                sqltran.Rollback();
                result = "0";
                if ((ex.Message.IndexOf("was deadlocked on lock | communication buffer resources with another process and has been chosen as the deadlock victim") > -1 || ex.Message.IndexOf("resources with another process and has been chosen as the deadlock victim") > -1) && gotoLoopsqlqry != "")
                {
                    //Changes made by nisha/Vishnu on 11/12/2023
                    deadlockcnt = deadlockcnt + 1;

                    System.Threading.Thread.Sleep(5000); // 5 second
                    sqlqry = gotoLoopsqlqry;

                    //Changes made by nisha/Vishnu on 11/12/2023
                    //gotoLoopsqlqry = "";
                    //con.Close();
                    //goto gotoLoop;

                    if (deadlockcnt >= 5)
                        gotoLoopsqlqry = "";
                    else
                        goto gotoLoop;

                    con.Close();
                }
            }
            finally
            {
                con.Close();
            };
            return result;
        }

        public string executerQuery1(string sqlqry)
        {
            QueryLog(sqlqry);
            int tryCount = 0;
            var gotoLoopsqlqry = sqlqry;
        gotoLoop:
            try
            {
                SqlConnection sqlConnection1 = new SqlConnection(constr);

                SqlCommand cmd = new SqlCommand();
                SqlDataReader reader;

                //cmd.CommandText = "SELECT * FROM Customers";
                cmd.CommandText = sqlqry;
                cmd.CommandType = CommandType.Text;
                cmd.Connection = sqlConnection1;

                sqlConnection1.Open();

                reader = cmd.ExecuteReader();
                // Data is accessible through the DataReader object here.

                sqlConnection1.Close();
                return "";
            }
            catch (Exception ex)
            {
                QueryLog(sqlqry + System.Environment.NewLine + "=========================================================== " + System.Environment.NewLine + "Exception : " + ex.Message + System.Environment.NewLine + "=========================================================== ");
                //ErrorLogWithQuery(ex, sqlqry);
                if ((ex.Message.IndexOf("was deadlocked on lock | communication buffer resources with another process and has been chosen as the deadlock victim") > -1 || ex.Message.IndexOf("resources with another process and has been chosen as the deadlock victim") > -1) && gotoLoopsqlqry != "")
                {
                    System.Threading.Thread.Sleep(5000); // 5 second

                    tryCount = tryCount + 1;
                    if (tryCount <= 5)
                    {
                        sqlqry = gotoLoopsqlqry;
                        goto gotoLoop;
                    }
                    else
                        gotoLoopsqlqry = "";
                }
            }
            finally
            {
                con.Close();
            };
            return string.Empty;
        }

        public List<ExecuteReaderList> ExecuteReader(string sqlqry, List<ExecuteReaderList> modelList)
        {
            QueryLog(sqlqry);
            int tryCount = 0;
            var gotoLoopsqlqry = sqlqry;
        gotoLoop:
            try
            {
                SqlConnection cn = new SqlConnection(constr);
                SqlCommand cmd = new SqlCommand(sqlqry);

                //  cmd.CommandText = sqlqry;
                //  cmd.CommandType = CommandType.Text;
                cmd.Connection = cn;
                cn.Open();

                SqlDataReader rdr = cmd.ExecuteReader();
                // Data is accessible through the DataReader object here.
                var model = new ExecuteReaderList();
                // var modelList = new List<ExecuteReaderList>();
                var modelList1 = new List<ExecuteReaderList>();
                if (rdr.Read() == true)
                {

                    for (int c = 0; c < rdr.VisibleFieldCount; c++)
                    {

                        model = new ExecuteReaderList();
                        model.Name = rdr.GetName(c);
                        // string fieldName = rdr.GetName(c);
                        System.Type type = rdr.GetFieldType(c);

                        switch (Type.GetTypeCode(type))
                        {
                            case TypeCode.DateTime:
                                model.Type = "Date";
                                break;
                            case TypeCode.String:
                                model.Type = "String";
                                break;
                            case TypeCode.Int16:
                                model.Type = "int";
                                break;
                            case TypeCode.Int32:
                                model.Type = "int";
                                break;
                            case TypeCode.UInt64:
                                model.Type = "int";
                                break;
                            case TypeCode.Boolean:
                                model.Type = "bool";
                                break;
                            default:
                                model.Type = rdr.GetFieldType(c).Name.ToString();
                                break;
                        }
                        modelList.Add(model);


                    }
                }
                else
                {
                    model = new ExecuteReaderList();
                    model.optional = "no data available";
                    modelList.Add(model);
                }

                //cn.Close();
                return modelList;
            }
            catch (Exception ex)
            {
                QueryLog(sqlqry + System.Environment.NewLine + "=========================================================== " + System.Environment.NewLine + "Exception : " + ex.Message + System.Environment.NewLine + "=========================================================== ");
                //ErrorLogWithQuery(ex, sqlqry);
                if ((ex.Message.IndexOf("was deadlocked on lock | communication buffer resources with another process and has been chosen as the deadlock victim") > -1 || ex.Message.IndexOf("resources with another process and has been chosen as the deadlock victim") > -1) && gotoLoopsqlqry != "")
                {
                    System.Threading.Thread.Sleep(5000); // 5 second

                    tryCount = tryCount + 1;
                    if (tryCount <= 5)
                    {
                        sqlqry = gotoLoopsqlqry;
                        goto gotoLoop;
                    }
                    else
                        gotoLoopsqlqry = "";
                }
            }
            finally
            {
                con.Close();
            };
            return modelList;
        }

        public string QueryconfigQueryText(string screenname)
        {
            var SqlQry = "select QueryText   from Queryconfig where screenname ='" + screenname + "'";
            QueryLog(SqlQry);
            int tryCount = 0;
            var gotoLoopsqlqry = SqlQry;
        gotoLoop:
            try
            {
                DataTable dtSNo = new DataTable();
                //  dtSNo = db.retsulDataTable(SqlQry);

                // DataTable dt = new DataTable();
                DataSet ds = new DataSet();
                SqlConnection con = new SqlConnection(constr);
                con.Open();
                SqlDataAdapter sda = new SqlDataAdapter(SqlQry, con);
                sda.Fill(ds);
                con.Close();

                dt = ds.Tables[0];
                return dt.Rows[0].ItemArray[0].ToString().Replace("ifnull", "isnull");
                // string result = JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                QueryLog(SqlQry + System.Environment.NewLine + "=========================================================== " + System.Environment.NewLine + "Exception : " + ex.Message + System.Environment.NewLine + "=========================================================== ");
                //ErrorLogWithQuery(ex, SqlQry);
                if ((ex.Message.IndexOf("was deadlocked on lock | communication buffer resources with another process and has been chosen as the deadlock victim") > -1 || ex.Message.IndexOf("resources with another process and has been chosen as the deadlock victim") > -1) && gotoLoopsqlqry != "")
                {
                    System.Threading.Thread.Sleep(5000); // 5 second

                    tryCount = tryCount + 1;
                    if (tryCount <= 5)
                    {
                        SqlQry = gotoLoopsqlqry;
                        goto gotoLoop;
                    }
                    else
                        gotoLoopsqlqry = "";
                }
            }
            finally
            {
                con.Close();
            };
            return string.Empty;
        }

        public string QueryconfigOrderText(string screenname)
        {
            var SqlQry = "select OrderText   from Queryconfig where screenname ='" + screenname + "'";
            QueryLog(SqlQry);
            int tryCount = 0;
            var gotoLoopsqlqry = SqlQry;
        gotoLoop:
            try
            {
                DataTable dtSNo = new DataTable();
                //  dtSNo = db.retsulDataTable(SqlQry);

                // DataTable dt = new DataTable();
                DataSet ds = new DataSet();
                SqlConnection con = new SqlConnection(constr);
                con.Open();
                SqlDataAdapter sda = new SqlDataAdapter(SqlQry, con);
                sda.Fill(ds);
                con.Close();

                dt = ds.Tables[0];
                return dt.Rows[0].ItemArray[0].ToString().Replace("ifnull", "isnull");
                // string result = JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                QueryLog(SqlQry + System.Environment.NewLine + "=========================================================== " + System.Environment.NewLine + "Exception : " + ex.Message + System.Environment.NewLine + "=========================================================== ");
                //ErrorLogWithQuery(ex, SqlQry);
                if ((ex.Message.IndexOf("was deadlocked on lock | communication buffer resources with another process and has been chosen as the deadlock victim") > -1 || ex.Message.IndexOf("resources with another process and has been chosen as the deadlock victim") > -1) && gotoLoopsqlqry != "")
                {
                    System.Threading.Thread.Sleep(5000); // 5 second

                    tryCount = tryCount + 1;
                    if (tryCount <= 5)
                    {
                        SqlQry = gotoLoopsqlqry;
                        goto gotoLoop;
                    }
                    else
                        gotoLoopsqlqry = "";
                }
            }
            finally
            {
                con.Close();
            };
            return string.Empty;
        }

        public string GetActionConfig(string screenname, string FieldName, string ActionName, string SelectFieldName)
        {
            var SqlQry = "select " + SelectFieldName + " from ActionConfig where ScreenName ='" + screenname + "' and FieldName ='" + FieldName + "' and ActionName ='" + ActionName + "' order by DisplayNo";
            if (FieldName == "")
            {
                SqlQry = "select " + SelectFieldName + " from ActionConfig where ScreenName ='" + screenname + "' and  ActionName ='" + ActionName + "' order by DisplayNo";
            }
            QueryLog(SqlQry);
            int tryCount = 0;
            var gotoLoopsqlqry = SqlQry;
        gotoLoop:
            try
            {

                DataTable dtSNo = new DataTable();
                //  dtSNo = db.retsulDataTable(SqlQry);

                // DataTable dt = new DataTable();
                DataSet ds = new DataSet();
                SqlConnection con = new SqlConnection(constr);
                con.Open();
                SqlDataAdapter sda = new SqlDataAdapter(SqlQry, con);
                sda.Fill(ds);
                con.Close();

                dt = ds.Tables[0];
                return dt.Rows[0].ItemArray[0].ToString().Replace("ifnull", "isnull");
            }
            catch (Exception ex)
            {
                QueryLog(SqlQry + System.Environment.NewLine + "=========================================================== " + System.Environment.NewLine + "Exception : " + ex.Message + System.Environment.NewLine + "=========================================================== ");
                //ErrorLogWithQuery(ex, SqlQry);
                if ((ex.Message.IndexOf("was deadlocked on lock | communication buffer resources with another process and has been chosen as the deadlock victim") > -1 || ex.Message.IndexOf("resources with another process and has been chosen as the deadlock victim") > -1) && gotoLoopsqlqry != "")
                {
                    System.Threading.Thread.Sleep(5000); // 5 second

                    tryCount = tryCount + 1;
                    if (tryCount <= 5)
                    {
                        SqlQry = gotoLoopsqlqry;
                        goto gotoLoop;
                    }
                    else
                        gotoLoopsqlqry = "";
                }
            }
            finally
            {
                con.Close();
            };
            return string.Empty;
        }

        public DataTable GetActionConfigList(string screenname, string FieldName, string ActionName, string SelectFieldName)
        {
            var SqlQry = "select * from ActionConfig where ScreenName ='" + screenname + "' and FieldName ='" + FieldName + "' and ActionName ='" + ActionName + "' order by DisplayNo";
            if (FieldName == "" && ActionName == "")
                SqlQry = "select * from ActionConfig where ScreenName ='" + screenname + "'  order by DisplayNo";
            else if (FieldName == "")
                SqlQry = "select * from ActionConfig where ScreenName ='" + screenname + "' and  ActionName ='" + ActionName + "' order by DisplayNo";
            else if (ActionName == "")
                SqlQry = "select * from ActionConfig where ScreenName ='" + screenname + "' and  FieldName ='" + FieldName + "' order by DisplayNo";
            QueryLog(SqlQry);
            int tryCount = 0;
            var gotoLoopsqlqry = SqlQry;
        gotoLoop:
            try
            {

                DataTable dtSNo = new DataTable();
                DataSet ds = new DataSet();
                SqlConnection con = new SqlConnection(constr);
                con.Open();
                SqlDataAdapter sda = new SqlDataAdapter(SqlQry, con);
                sda.Fill(ds);
                con.Close();

                dt = ds.Tables[0];
                return dt;
            }
            catch (Exception ex)
            {
                QueryLog(SqlQry + System.Environment.NewLine + "=========================================================== " + System.Environment.NewLine + "Exception : " + ex.Message + System.Environment.NewLine + "=========================================================== ");
                //ErrorLogWithQuery(ex, SqlQry);
                if ((ex.Message.IndexOf("was deadlocked on lock | communication buffer resources with another process and has been chosen as the deadlock victim") > -1 || ex.Message.IndexOf("resources with another process and has been chosen as the deadlock victim") > -1) && gotoLoopsqlqry != "")
                {
                    System.Threading.Thread.Sleep(5000); // 5 second

                    tryCount = tryCount + 1;
                    if (tryCount <= 5)
                    {
                        SqlQry = gotoLoopsqlqry;
                        goto gotoLoop;
                    }
                    else
                        gotoLoopsqlqry = "";
                }
            }
            finally
            {
                con.Close();
            };
            return dt;
        }

        public DataTable GetActionConfigListNew(string screenname)
        {
            var SqlQry = "select * from ActionConfig where ScreenName ='" + screenname + "'   order by ActionName, DisplayNo";
            QueryLog(SqlQry);
            int tryCount = 0;
            var gotoLoopsqlqry = SqlQry;
        gotoLoop:
            try
            {

                DataTable dtSNo = new DataTable();
                //  dtSNo = db.retsulDataTable(SqlQry);

                //  DataTable dt = new DataTable();
                DataSet ds = new DataSet();
                SqlConnection con = new SqlConnection(constr);
                con.Open();
                SqlDataAdapter sda = new SqlDataAdapter(SqlQry, con);
                sda.Fill(ds);
                con.Close();

                dt = ds.Tables[0];
                //  dt.Rows[1].ItemArray[0]
                return dt;
            }
            catch (Exception ex)
            {
                QueryLog(SqlQry + System.Environment.NewLine + "=========================================================== " + System.Environment.NewLine + "Exception : " + ex.Message + System.Environment.NewLine + "=========================================================== ");
                //ErrorLogWithQuery(ex, SqlQry);
                if ((ex.Message.IndexOf("was deadlocked on lock | communication buffer resources with another process and has been chosen as the deadlock victim") > -1 || ex.Message.IndexOf("resources with another process and has been chosen as the deadlock victim") > -1) && gotoLoopsqlqry != "")
                {
                    System.Threading.Thread.Sleep(5000); // 5 second

                    tryCount = tryCount + 1;
                    if (tryCount <= 5)
                    {
                        SqlQry = gotoLoopsqlqry;
                        goto gotoLoop;
                    }
                    else
                        gotoLoopsqlqry = "";
                }
            }
            finally
            {
                con.Close();
            };
            return dt;
        }

        public string ValidateQuery(string query)
        {
            QueryLog(query);
            int tryCount = 0;
            var gotoLoopsqlqry = query;
        gotoLoop:
            try
            {
                DataTable dtSNo = new DataTable();
                //  DataTable dt = new DataTable();
                DataSet ds = new DataSet();
                SqlConnection con = new SqlConnection(constr);
                con.Open();
                SqlDataAdapter sda = new SqlDataAdapter(query, con);
                sda.Fill(ds);
                con.Close();
                dt = ds.Tables[0];
                return dt.Rows[0].ItemArray[0].ToString();
                // return dt.Rows[0]["response"].ToString();
            }
            catch (Exception ex)
            {
                QueryLog(query + System.Environment.NewLine + "=========================================================== " + System.Environment.NewLine + "Exception : " + ex.Message + System.Environment.NewLine + "=========================================================== ");
                //ErrorLogWithQuery(ex, query);
                if ((ex.Message.IndexOf("was deadlocked on lock | communication buffer resources with another process and has been chosen as the deadlock victim") > -1 || ex.Message.IndexOf("resources with another process and has been chosen as the deadlock victim") > -1) && gotoLoopsqlqry != "")
                {
                    System.Threading.Thread.Sleep(5000); // 5 second

                    tryCount = tryCount + 1;
                    if (tryCount <= 5)
                    {
                        query = gotoLoopsqlqry;
                        goto gotoLoop;
                    }
                    else
                        gotoLoopsqlqry = "";
                }
            }
            finally
            {
                con.Close();
            };
            return string.Empty;
        }

        public string MessageConfig(string screenname, string MenuCode)
        {
            var SqlQry = "select  MenuDisplayText from MessageConfig where screenname ='" + screenname + "' and MenuCode= '" + MenuCode + "'";
            QueryLog(SqlQry);
            int tryCount = 0;
            var gotoLoopsqlqry = SqlQry;
        gotoLoop:
            try
            {
                DataTable dtSNo = new DataTable();
                //   DataTable dt = new DataTable();
                DataSet ds = new DataSet();
                SqlConnection con = new SqlConnection(constr);
                con.Open();
                SqlDataAdapter sda = new SqlDataAdapter(SqlQry, con);
                sda.Fill(ds);
                con.Close();
                dt = ds.Tables[0];
                return dt.Rows[0].ItemArray[0].ToString();
            }
            catch (Exception ex)
            {
                QueryLog(SqlQry + System.Environment.NewLine + "=========================================================== " + System.Environment.NewLine + "Exception : " + ex.Message + System.Environment.NewLine + "=========================================================== ");
                //ErrorLogWithQuery(ex, SqlQry);
                if ((ex.Message.IndexOf("was deadlocked on lock | communication buffer resources with another process and has been chosen as the deadlock victim") > -1 || ex.Message.IndexOf("resources with another process and has been chosen as the deadlock victim") > -1) && gotoLoopsqlqry != "")
                {
                    System.Threading.Thread.Sleep(5000); // 5 second

                    tryCount = tryCount + 1;
                    if (tryCount <= 5)
                    {
                        SqlQry = gotoLoopsqlqry;
                        goto gotoLoop;
                    }
                    else
                        gotoLoopsqlqry = "";
                }
            }
            finally
            {
                con.Close();
            };
            return string.Empty;
        }
        //  STARTED LOG ROUTINES 21.04.2021  ============================================
        public static void ErrorLog(Exception ex)
        {
            if (_isLogFile == "False")
                return;
            if (!Directory.Exists(dir))  // if it doesn't exist, create
                Directory.CreateDirectory(dir);
            string message = string.Format("Time: {0}", DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss tt"));
            message += Environment.NewLine;
            message += "-----------------------------------------------------------";
            message += Environment.NewLine;
            message += string.Format("Message: {0}", ex.Message);
            message += Environment.NewLine;
            message += string.Format("StackTrace: {0}", ex.StackTrace);
            message += Environment.NewLine;
            message += string.Format("Source: {0}", ex.Source);
            message += Environment.NewLine;
            message += string.Format("TargetSite: {0}", ex.TargetSite.ToString());
            message += Environment.NewLine;
            message += "-----------------------------------------------------------";
            message += Environment.NewLine;


            // COMMENTED 21.04.2021 =================
            string dteinfo = DateTime.Now.ToString("dd/MM/yyyy").Replace("/", "_");
            string strUserId = HttpContext.Current.Session["UserId"].ToString();// HttpContext.Current.Session["UserName"].ToString().Replace("/", "_").Replace("&", "_");
            string path = System.Web.HttpContext.Current.Server.MapPath("~/ViewErrorLogFiles/ErrorLog_" + strUserId + "_" + dteinfo + ".txt");

            //string path = System.Web.HttpContext.Current.Server.MapPath("~/ViewErrorLogFiles/ErrorLog.txt");

            using (StreamWriter writer = new StreamWriter(path, true))
            {
                writer.WriteLine(message);
                writer.Close();
                writer.Dispose();
            }
        }

        public static void ErrorLogString(string error)
        {
            if (_isLogFile == "False")
                return;
            if (!Directory.Exists(dir))  // if it doesn't exist, create
                Directory.CreateDirectory(dir);
            string message = string.Format("Time: {0}", DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss tt"));
            message += Environment.NewLine;
            message += "-----------------------------------------------------------";
            message += Environment.NewLine;
            message += string.Format("Message: {0}", error);
            message += Environment.NewLine;
            message += "-----------------------------------------------------------";
            message += Environment.NewLine;

            // COMMENTED 21.04.2021 =================
            string dteinfo = DateTime.Now.ToString("dd/MM/yyyy").Replace("/", "_");
            string strUserId = HttpContext.Current.Session["UserId"].ToString();// HttpContext.Current.Session["UserName"].ToString().Replace("/", "_").Replace("&", "_");
            string path = System.Web.HttpContext.Current.Server.MapPath("~/ViewErrorLogFiles/ErrorLogString_" + strUserId + "_" + dteinfo + ".txt");

            //string path = System.Web.HttpContext.Current.Server.MapPath("~/ViewErrorLogFiles/ErrorLogString.txt");

            using (StreamWriter writer = new StreamWriter(path, true))
            {
                writer.WriteLine(message);
                writer.Close();
                writer.Dispose();
            }
        }
        public static void ErrorLogWithQuery(Exception ex, string query)
        {
            QueryLog(query + System.Environment.NewLine + " ================================= " + System.Environment.NewLine + "Exception : " + ex.Message + System.Environment.NewLine + " ================================= ");

            if (_isLogFile == "False")
                return;
            //if (_isLogFileWithQuery == "")
            //{
            //    CommonRule cRule = new CommonRule();
            //    var qry = "select SystemValue from systemList where  code  ='weblog' and SolutionName='" + _solutionName + "'";
            //    //QueryLog(SqlQry);
            //    DataTable dt = cRule.getDataTableLst(qry);

            //    _isLogFileWithQuery = dt.Rows.Count == 0 ? "0" : (dt.Rows[0].ItemArray)[0].ToString();


            //}
            //if (_isLogFileWithQuery != "1")
            //    return;
            if (!Directory.Exists(dir))  // if it doesn't exist, create
                Directory.CreateDirectory(dir);
            string message = string.Format("Time: {0}", DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss tt"));
            message += Environment.NewLine;
            message += "-----------------------------------------------------------";
            message += Environment.NewLine;
            message += string.Format("Query: {0}", query);
            message += Environment.NewLine;
            message += "=========================";
            message += Environment.NewLine;
            message += string.Format("Message: {0}", ex.Message);
            message += Environment.NewLine;
            message += "-----------------------------------------------------------";
            message += Environment.NewLine;


            // COMMENTED 21.04.2021 =================
            string strUserId = HttpContext.Current.Session["UserId"].ToString();//HttpContext.Current.Session["UserName"].ToString().Replace("/", "_").Replace("&", "_");
            string dteinfo = DateTime.Now.ToString("dd/MM/yyyy").Replace("/", "_");
            string path = System.Web.HttpContext.Current.Server.MapPath("~/ViewErrorLogFiles/ErrorLogWithQuery_" + strUserId + "_" + dteinfo + ".txt");
            //string path = System.Web.HttpContext.Current.Server.MapPath("~/ViewErrorLogFiles/ErrorLogWithQuery.txt");

            using (StreamWriter writer = new StreamWriter(path, true))
            {
                writer.WriteLine(message);
                writer.Close();
                writer.Dispose();
            }
        }


        public static void QueryLog(string query)
        {
           // if (_isLogFile == "False") return;
            var gotoLoopsqlqry = query;
            gotoLoop:
            try
            {
                if (!Directory.Exists(dir))  // if it doesn't exist, create
                    Directory.CreateDirectory(dir);
                string message1 = string.Format("{0}", DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss tt"));
                var message = string.Format("" + message1 + ": {0}", query);
                message += Environment.NewLine;
                string strUserId = HttpContext.Current.Session["UserId"].ToString();
                string dteinfo = DateTime.Now.ToString("dd/MM/yyyy").Replace("/", "_");
                string path = System.Web.HttpContext.Current.Server.MapPath("~/ViewErrorLogFiles/QueryLog_" + strUserId + "_" + dteinfo + ".txt");
                using (StreamWriter writer = new StreamWriter(path, true))
                {
                    writer.WriteLine(message);
                    writer.Close();
                    writer.Dispose();
                }
            }
            catch (Exception ex)
            {
                if (ex.Message.IndexOf("because it is being used by another process") > -1)
                {
                    System.Threading.Thread.Sleep(2000); // 2 second
                    query = gotoLoopsqlqry;
                    gotoLoopsqlqry = "";
                    goto gotoLoop;
                }
            }
        }

        //  STARTED LOG ROUTINES 21.04.2021  ============================================




        public static void get_Testing_Query(string strqrytype, string strmessage)
        {
            try
            {
                if (_isLogFile == "False")
                {
                    return;
                }


                if (!Directory.Exists(dir))  // if it doesn't exist, create
                {
                    Directory.CreateDirectory(dir);
                }

                string message = string.Format("Time: {0}", DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss tt"));
                message += Environment.NewLine;
                message += Environment.NewLine;
                message += string.Format("{0} - {1}", strqrytype, strmessage);
                message += Environment.NewLine;
                string path = System.Web.HttpContext.Current.Server.MapPath("~/ViewErrorLogFiles/Testing_Query.txt");

                using (StreamWriter writer = new StreamWriter(path, true))
                {
                    writer.WriteLine(message);
                    writer.Close();
                }
            }
            catch (Exception e)
            {
            }
        }


        public static void ErrorLog1(Exception ex)
        {
            if (_isLogFile == "False")
                return;
            if (!Directory.Exists(dir))  // if it doesn't exist, create
                Directory.CreateDirectory(dir);
            string message = string.Format("Time: {0}", DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss tt"));
            message += Environment.NewLine;
            message += "-----------------------------------------------------------";
            message += Environment.NewLine;
            message += string.Format("Message: {0}", ex.Message);
            message += Environment.NewLine;
            message += string.Format("StackTrace: {0}", ex.StackTrace);
            message += Environment.NewLine;
            message += string.Format("Source: {0}", ex.Source);
            message += Environment.NewLine;
            message += string.Format("TargetSite: {0}", ex.TargetSite.ToString());
            message += Environment.NewLine;
            message += "-----------------------------------------------------------";
            message += Environment.NewLine;
            string path = System.Web.HttpContext.Current.Server.MapPath("~/ViewErrorLogFiles/ErrorLog1.txt");

            using (StreamWriter writer = new StreamWriter(path, true))
            {
                writer.WriteLine(message);
                writer.Close();
            }
        }


        public string ExecuteNonQueryWithImage(string sqlqry, Byte[] ImageFileName)
        {
            string result = "";
            int tryCount = 0;
            var gotoLoopsqlqry = sqlqry;
        gotoLoop:
            try
            {
                con = new SqlConnection(constr);
            con.Open();
            cmd = new SqlCommand();
            sqltran = con.BeginTransaction("Savepoint");
            cmd.Connection = con;
            cmd.Transaction = sqltran;
           

                cmd.CommandText = sqlqry;
                cmd.Parameters.AddWithValue("@C1", SqlDbType.Binary).Value = ImageFileName;
                cmd.ExecuteNonQuery();
                //}
                sqltran.Commit();
                result = "1";
            }
            catch (Exception ex)
            {
                ErrorLogWithQuery(ex, sqlqry);
                sqltran.Rollback();
                result = "0";
                if ((ex.Message.IndexOf("was deadlocked on lock | communication buffer resources with another process and has been chosen as the deadlock victim") > -1 || ex.Message.IndexOf("resources with another process and has been chosen as the deadlock victim") > -1) && gotoLoopsqlqry != "")
                {
                    System.Threading.Thread.Sleep(5000); // 5 second

                    tryCount = tryCount + 1;
                    if (tryCount <= 5)
                    {
                        sqlqry = gotoLoopsqlqry;
                        goto gotoLoop;
                    }
                    else
                        gotoLoopsqlqry = "";
                }
            }
            finally
            {
                con.Close();
            };
            return result;
        }

        public string ExecuteNonQueryWithTwoImages(string sqlqry, Byte[] ImageFileName, Byte[] ImageFileName1)
        {
            string result = "";
            int tryCount = 0;
            var gotoLoopsqlqry = sqlqry;
        gotoLoop:
            try
            {
                con = new SqlConnection(constr);
            con.Open();
            cmd = new SqlCommand();
            sqltran = con.BeginTransaction("Savepoint");
            cmd.Connection = con;
            cmd.Transaction = sqltran;
           

                cmd.CommandText = sqlqry;
                cmd.Parameters.AddWithValue("@C1", SqlDbType.Binary).Value = ImageFileName;
                cmd.Parameters.AddWithValue("@C2", SqlDbType.Binary).Value = ImageFileName1;
                cmd.ExecuteNonQuery();
                //}
                sqltran.Commit();
                result = "1";
            }
            catch (Exception ex)
            {
                ErrorLogWithQuery(ex, sqlqry);
                sqltran.Rollback();
                result = "0";
                if ((ex.Message.IndexOf("was deadlocked on lock | communication buffer resources with another process and has been chosen as the deadlock victim") > -1 || ex.Message.IndexOf("resources with another process and has been chosen as the deadlock victim") > -1) && gotoLoopsqlqry != "")
                {
                    System.Threading.Thread.Sleep(5000); // 5 second

                    tryCount = tryCount + 1;
                    if (tryCount <= 5)
                    {
                        sqlqry = gotoLoopsqlqry;
                        goto gotoLoop;
                    }
                    else
                        gotoLoopsqlqry = "";
                }
            }
            finally
            {
                con.Close();
            };
            return result;
        }


        public string ExecuteNonQueryWithThreeImages(string sqlqry, Byte[] ImageFileName, Byte[] ImageFileName1, Byte[] ImageFileName2)
        {
            string result = "";
            int tryCount = 0;
            var gotoLoopsqlqry = sqlqry;
        gotoLoop:
            try
            {
                con = new SqlConnection(constr);
            con.Open();
            cmd = new SqlCommand();
            sqltran = con.BeginTransaction("Savepoint");
            cmd.Connection = con;
            cmd.Transaction = sqltran;
           
                //dynamic sqlqryList = JsonConvert.DeserializeObject(sqlqry);
                //for (int i = 0; i < sqlqryList.Count; i++)
                //{
                //sqlqry = sqlqryList[i].ToString();
                cmd.CommandText = sqlqry;
                cmd.Parameters.AddWithValue("@C1", SqlDbType.Binary).Value = ImageFileName;
                cmd.Parameters.AddWithValue("@C2", SqlDbType.Binary).Value = ImageFileName1;
                cmd.Parameters.AddWithValue("@C3", SqlDbType.Binary).Value = ImageFileName2;
                cmd.ExecuteNonQuery();
                //}
                sqltran.Commit();
                result = "1";
            }
            catch (Exception ex)
            {
                ErrorLogWithQuery(ex, sqlqry);
                sqltran.Rollback();
                result = "0";
                if ((ex.Message.IndexOf("was deadlocked on lock | communication buffer resources with another process and has been chosen as the deadlock victim") > -1 || ex.Message.IndexOf("resources with another process and has been chosen as the deadlock victim") > -1) && gotoLoopsqlqry != "")
                {
                    System.Threading.Thread.Sleep(5000); // 5 second

                    tryCount = tryCount + 1;
                    if (tryCount <= 5)
                    {
                        sqlqry = gotoLoopsqlqry;
                        goto gotoLoop;
                    }
                    else
                        gotoLoopsqlqry = "";
                }
            }
            finally
            {
                con.Close();
            };
            return result;
        }

        public string ExecuteListStoreProducture(string OrgQuery, string ListName)
        {
            var ResultQry = string.Empty;
            int tryCount = 0;
            var gotoLoopsqlqry = OrgQuery;
        gotoLoop:
            try
            {
                
                SqlConnection conn = new SqlConnection();
                SqlCommand cmd = new SqlCommand();
                //conn.ConnectionString = ConfigurationManager.ConnectionStrings["CS"].ConnectionString;
                conn.ConnectionString = constr;
                cmd.Connection = conn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "ChangeQuery";
                cmd.Parameters.AddWithValue("@OrgQuery", OrgQuery);
                cmd.Parameters.AddWithValue("@ListName", ListName);

                cmd.Parameters.Add("@ResultQry", SqlDbType.NVarChar, -1);
                cmd.Parameters["@ResultQry"].Direction = ParameterDirection.Output;
                try
                {
                    //Changed Made by Nisha/Vishnu on 11/12/2023
                    conn.Close();

                    conn.Open();
                    int i = cmd.ExecuteNonQuery();
                    //Storing the output parameters value in 3 different variables.  
                    ResultQry = Convert.ToString(cmd.Parameters["@ResultQry"].Value);

                    // Here we get all three values from database in above three variables.  
                }
                catch (Exception ex)
                {
                    ErrorLogWithQuery(ex, OrgQuery);
                    ResultQry = string.Empty;
                    if ((ex.Message.IndexOf("was deadlocked on lock | communication buffer resources with another process and has been chosen as the deadlock victim") > -1 || ex.Message.IndexOf("resources with another process and has been chosen as the deadlock victim") > -1) && gotoLoopsqlqry != "")
                    {
                        System.Threading.Thread.Sleep(5000); // 5 second

                        tryCount = tryCount + 1;
                        if (tryCount <= 5)
                        {
                            OrgQuery = gotoLoopsqlqry;
                            goto gotoLoop;
                        }
                        else
                            gotoLoopsqlqry = "";
                    }
                    // throw the exception  
                }
                finally
                {
                    conn.Close();
                }

                if(ListName == "InventoryForm")
                {
                    ResultQry = ResultQry.Replace("CasesGoodQty as [Cases Good Qty]", "cast(CasesGoodQty as int) as [Cases Good Qty]");
                    ResultQry = ResultQry.Replace("PacksGoodQty as [Packs Good Qty]", "cast(PacksGoodQty as int) as [Packs Good Qty]");
                    ResultQry = ResultQry.Replace("PadsGoodQty as [Pads Good Qty]", "cast(PadsGoodQty as int) as [Pads Good Qty]");
                    ResultQry = ResultQry.Replace("CasesBadQty as [Cases Bad Qty]", "cast(CasesBadQty as int) as [Cases Bad Qty]");
                    ResultQry = ResultQry.Replace("PacksBadQty as [Packs Bad Qty]", "cast(PacksBadQty as int) as [Packs Bad Qty]");
                    ResultQry = ResultQry.Replace("PadsBadQty as [Pads Bad Qty]", "cast(PadsBadQty as int) as [Pads Bad Qty]");

                }
                return ResultQry;

            }
            catch (Exception ex)
            {
                ErrorLogWithQuery(ex, OrgQuery);
                return string.Empty;

            }

        }
        public string ExecuteListStoreProducture1(string OrgQuery, string ListName)
        {
           
            try
            {
                int tryCount = 0;
                var gotoLoopsqlqry = OrgQuery;
            gotoLoop:
                try
                {
                    
                    using (SqlConnection conn = new SqlConnection(constr))
                    using (SqlCommand cmd = new SqlCommand("dbo.ChangeQuery", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        // set up the parameters
                        cmd.Parameters.Add("@OrgQuery", SqlDbType.NVarChar, -1);
                        cmd.Parameters.Add("@ListName", SqlDbType.NVarChar, 200);
                        cmd.Parameters.Add("@ResultQry", SqlDbType.NVarChar).Direction = ParameterDirection.Output;

                        // set parameter values
                        cmd.Parameters["@OrgQuery"].Value = OrgQuery;
                        cmd.Parameters["@ListName"].Value = ListName;

                        // open connection and execute stored procedure
                        conn.Open();
                        cmd.ExecuteNonQuery();

                        // read output value from @NewId
                        string ResultQry = cmd.Parameters["@ResultQry"].Value.ToString(); ;
                        conn.Close();
                        return ResultQry;
                    }

                }
                catch (Exception ex)
                {
                    if ((ex.Message.IndexOf("was deadlocked on lock | communication buffer resources with another process and has been chosen as the deadlock victim") > -1 || ex.Message.IndexOf("resources with another process and has been chosen as the deadlock victim") > -1) && gotoLoopsqlqry != "")
                    {
                        System.Threading.Thread.Sleep(5000); // 5 second

                        tryCount = tryCount + 1;
                        if (tryCount <= 5)
                        {
                            OrgQuery = gotoLoopsqlqry;
                            goto gotoLoop;
                        }
                        else
                            gotoLoopsqlqry = "";
                    }
                    //throw;
                }
                string returnValue = string.Empty;
                // string connetionString = null;
                SqlConnection connection = new SqlConnection(constr); ;
                SqlDataAdapter adapter;
                tryCount = 0;
                 gotoLoopsqlqry = OrgQuery;
            gotoLoop1:

                try
                {

                    SqlCommand command = new SqlCommand();
                    SqlParameter param;
                    DataSet ds = new DataSet();

                    //  int i = 0;

                    /// connetionString = "Data Source=servername;Initial Catalog=PUBS;User ID=sa;Password=yourpassword";
                    connection = new SqlConnection(constr);

                    connection.Open();
                    command.Connection = connection;
                    command.CommandType = CommandType.StoredProcedure;
                    command.CommandText = "ChangeQuery";
                    param = new SqlParameter("@OrgQuery", OrgQuery);
                    param = new SqlParameter("@ListName", ListName);
                    param = new SqlParameter("@ResultQry", "");

                    param.Direction = ParameterDirection.Input;
                    param.DbType = DbType.String;
                    command.Parameters.Add(param);

                    adapter = new SqlDataAdapter(command);
                    adapter.Fill(ds);
                    returnValue = ds.Tables[0].Rows[0][0].ToString();
                    //for (i = 0; i <= ds.Tables[0].Rows.Count - 1; i++)
                    //{
                    //    MessageBox.Show(ds.Tables[0].Rows[i][0].ToString());
                    //}

                }
                catch (Exception ex)
                {
                    if ((ex.Message.IndexOf("was deadlocked on lock | communication buffer resources with another process and has been chosen as the deadlock victim") > -1 || ex.Message.IndexOf("resources with another process and has been chosen as the deadlock victim") > -1) && gotoLoopsqlqry != "")
                    {
                        System.Threading.Thread.Sleep(5000); // 5 second

                        tryCount = tryCount + 1;
                        if (tryCount <= 5)
                        {
                            OrgQuery = gotoLoopsqlqry;
                            goto gotoLoop1;
                        }
                        else
                            gotoLoopsqlqry = "";
                    }
                    //throw;
                }
                finally
                {
                    connection.Close();
                }

                return returnValue;

            }
            catch (Exception ex)
            {
                ErrorLogWithQuery(ex, OrgQuery);
                return string.Empty;

            }
        }
    }

    public class ExecuteReaderList
    {
        public string Name { get; set; }
        public string Type { get; set; }
        public string optional { get; set; }
    }

}