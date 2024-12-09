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
        public static string _isLogFileWithQuery = "";

        public static string dir = System.Web.HttpContext.Current.Server.MapPath("~/ViewErrorLogFiles");
        public static string PaginationValue = string.Empty;
        public static string _YearPickerLimit = string.Empty;

        public string QueryconfigText(string screenname)
        {
            var SqlQry = "select QueryText + ' ' + GroupText + ' ' + OrderText from Queryconfig where screenname ='" + screenname + "'";
            QueryLog(SqlQry);

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
                ErrorLogWithQuery(ex, SqlQry);
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
            SqlConnection con = new SqlConnection(constr);
            var SqlQry = "select QueryText ,  OrderText ,GroupText from Queryconfig where screenname ='" + screenname + "'";
            QueryLog(SqlQry);

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
                ErrorLogWithQuery(ex, SqlQry);
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
            QueryLog(query);

            SqlConnection con = new SqlConnection(constr);
            try
            {
                con.Close();

                var SqlQry = query;
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
                ErrorLogWithQuery(ex, query);
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
                ErrorLogWithQuery(ex, query);
            }
            finally
            {
                con.Close();
            };
            return string.Empty;
        }

        public string getHeaderList(string screenName)
        {
            var query = "select * from listconfig where screenname ='" + screenName + "' and Language ='" + _Language + "' order by displayno";
            QueryLog(query);
            try
            {
                //var query = "select * from listconfig where screenname ='" + screenName + "' order by displayno";
                DataTable dtSNo = new DataTable();
                //  dtSNo = db.retsulDataTable(SqlQry);

                //DataTable dt = new DataTable();
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
                ErrorLogWithQuery(ex, query);
            }
            finally
            {
                con.Close();
            };
            return string.Empty;
        }


        public string GetFormList(string screenName)
        {
            var query = "select * from FormConfig where   screenname ='" + screenName + "' and Language = '" + _Language + "' order by displayno";
            QueryLog(query);
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
                string result = JsonConvert.SerializeObject(dt);
                return result;
            }
            catch (Exception ex)
            {
                ErrorLogWithQuery(ex, query);
            }
            finally
            {
                con.Close();
            };
            return string.Empty;
        }
        public string getValueList(string query)
        {
            QueryLog(query);
            try
            {
                // DataTable dt = new DataTable();
                DataSet ds = new DataSet();
                SqlConnection con = new SqlConnection(constr);
                con.Open();
                SqlDataAdapter sda = new SqlDataAdapter(query, con);
                ErrorLogString("query :" + query + "CommandTimeout : 600 , constr : " + constr);
                sda.SelectCommand.CommandTimeout = 3600;// 600;  //30*60=1800 // 60- seconds
                ErrorLogString("sda.Fill(ds) start");
                sda.Fill(ds);
                ErrorLogString("sda.Fill(ds) end");
                con.Close();
                if (ds.Tables.Count > 0)
                    dt = ds.Tables[0];
                string result = JsonConvert.SerializeObject(dt);
                return result;
            }
            catch (Exception ex)
            {
                ErrorLogString("sda.Fill(ds) error : " + ex.Message);
                ErrorLogWithQuery(ex, query);
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
            try
            {
                // DataTable dt = new DataTable();
                DataSet ds = new DataSet();
                SqlConnection con = new SqlConnection(constr);
                con.Open();
                SqlDataAdapter sda = new SqlDataAdapter(query, con);
                ErrorLogString("query :" + query + "CommandTimeout : 600 , constr : " + constr);
                sda.SelectCommand.CommandTimeout = 600;  //30*60=1800 // 60- seconds
                ErrorLogString("sda.Fill(ds) start");
                sda.Fill(ds);

                ErrorLogString("sda.Fill(ds) end");
                con.Close();
                dt = ds.Tables[0];
                string result = JsonConvert.SerializeObject(dt);
                return result;
            }
            catch (Exception ex)
            {
                ErrorLogString("sda.Fill(ds) error : " + ex.Message);
                ErrorLogWithQuery(ex, query);
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
                ErrorLogWithQuery(ex, query);
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
                ErrorLogWithQuery(ex, query);
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
                ErrorLogWithQuery(ex, query);
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
                ErrorLogWithQuery(ex, query);
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
            QueryLog(systemlistQry);
            try
            {
                ErrorLogString(systemlistQry);
                var systemValue = getQueryString(systemlistQry);
                ErrorLogString(systemValue);
                PaginationValue = systemValue;
                return systemValue;
            }
            catch (Exception ex)
            {
                ErrorLogWithQuery(ex, systemlistQry);
            }
            return string.Empty;
        }
        public void getYearPickerLimit(string _solutionName)
        {
            var systemlistQry = "select SystemValue from systemlist where code ='YearPickerLimit' and SolutionName='" + _solutionName + "'";
            QueryLog(systemlistQry);

            try
            {
                ErrorLogString(systemlistQry);
                var systemValue = getQueryString(systemlistQry);
                ErrorLogString(systemValue);
                _YearPickerLimit = systemValue;
            }
            catch (Exception ex)
            {
                ErrorLogWithQuery(ex, systemlistQry);
            }
        }
        public string getQueryString(string query)
        {
            QueryLog(query);

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
                string result = dt.Rows[0].ItemArray[0].ToString();
                return result;
            }
            catch (Exception ex)
            {
                ErrorLogWithQuery(ex, query);
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
                ErrorLogWithQuery(ex, query);
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
            try
            {

                //-- select * from Gridfunctions where screenname ='' and Access ='' and solutionName  --solutionName direct set query

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
                ErrorLogWithQuery(ex, query);
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
            try
            {
                if (screenName == null || screenName == "")
                    query = "select * from ModuleConfig where  AccessLevel= '1' and Visible= 1 order by displayno";
                else
                    query = "select * from ModuleConfig where screenname ='" + screenName + "' and AccessLevel= '1'  and Visible= 1 order by displayno";
                QueryLog(query);
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
                ErrorLogWithQuery(ex, query);
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
                ErrorLogWithQuery(ex, query);
            }
            finally
            {
                con.Close();
            };
            return string.Empty;
        }

        //public string GetTabGroup(string value)
        //{
        //    var query = "select * from listconfig where screenname ='" + value + "' order by displayno";
        //    DataTable dtSNo = new DataTable();
        //    //  dtSNo = db.retsulDataTable(SqlQry);

        //    DataTable dt = new DataTable();
        //    DataSet ds = new DataSet();
        //    SqlConnection con = new SqlConnection(constr);
        //    con.Open();

        //    SqlDataAdapter sda = new SqlDataAdapter(query, con);
        //    sda.Fill(ds);
        //    con.Close();
        //    dt = ds.Tables[0];
        //    string result = JsonConvert.SerializeObject(dt);
        //    return result;

        //}


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
                //result = "success";
                result = "1";
            }

            catch (Exception ex)
            {
                ErrorLogWithQuery(ex, sqlqry);
                result = ex.Message;
                try
                {
                    sqltran.Rollback();
                }
                catch (Exception ex1)
                {
                    ErrorLog(ex1);
                    // result = "failure";
                    result = "0";
                    // result = ex1.Message;
                }
                // _businessRule.ErrorLogWithQuery(ex, query);  
            }
            finally
            {
                con.Close();
            };

            return result;
        }

        public string ExecuteNonQuery(string sqlqry)
        {
            QueryLog(sqlqry);
            ErrorLogString(sqlqry);
            string result = "";
            ErrorLogString("constr : " + sqlqry);

            con = new SqlConnection(constr);
            ErrorLogString("Step 1 : ");

            con.Open();
            cmd = new SqlCommand();
            ErrorLogString("Step 2 : ");

            sqltran = con.BeginTransaction("Savepoint");
            ErrorLogString("Step 3 : ");

            cmd.Connection = con;
            cmd.Transaction = sqltran;
            ErrorLogString("Step 4 : ");

            try
            {
                dynamic sqlqryList = JsonConvert.DeserializeObject(sqlqry);
                for (int i = 0; i < sqlqryList.Count; i++)
                {
                    ErrorLogString("Step 5 : ");

                    sqlqry = sqlqryList[i].ToString();
                    ErrorLogString("Step 6 : " + sqlqry);

                    cmd.CommandText = sqlqry;
                    ErrorLogString("Step 7 : ");

                    cmd.ExecuteNonQuery();
                    ErrorLogString("Step 8 : ");

                }
                ErrorLogString("Step 9 : ");

                sqltran.Commit();
                result = "1";
            }
            catch (Exception ex)
            {
                ErrorLogString("ex 10 : ");
                ErrorLogWithQuery(ex, sqlqry);
                sqltran.Rollback();
                result = "0";
            }
            finally
            {
                ErrorLogString("finally 11 : ");
                con.Close();
            };
            return result;
        }

        public string executerQuery1(string sqlqry)
        {
            try
            {
                QueryLog(sqlqry);
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
                ErrorLogWithQuery(ex, sqlqry);
            }
            finally
            {
                con.Close();
            };
            return string.Empty;
        }

        public List<ExecuteReaderList> ExecuteReader(string sqlqry, List<ExecuteReaderList> modelList)
        {
            try
            {
                QueryLog(sqlqry);

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
                ErrorLogWithQuery(ex, sqlqry);
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
                ErrorLogWithQuery(ex, SqlQry);
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
                ErrorLogWithQuery(ex, SqlQry);
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
                ErrorLogWithQuery(ex, SqlQry);
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
            try
            {

                ErrorLogString("Common Rlue GetActionConfigList SqlQry : " + SqlQry);
                ErrorLogString("Common Rlue GetActionConfigList Connection  String : " + constr);

                DataTable dtSNo = new DataTable();
                //  dtSNo = db.retsulDataTable(SqlQry);

                DataSet ds = new DataSet();
                SqlConnection con = new SqlConnection(constr);
                ErrorLogString("Common Rlue GetActionConfigList Connection  String con: " + con);

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
                ErrorLogWithQuery(ex, SqlQry);
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
                ErrorLogWithQuery(ex, SqlQry);
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
                ErrorLogWithQuery(ex, query);
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
                ErrorLogWithQuery(ex, SqlQry);
            }
            finally
            {
                con.Close();
            };
            return string.Empty;
        }

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
            string path = System.Web.HttpContext.Current.Server.MapPath("~/ViewErrorLogFiles/ErrorLog.txt");

            using (StreamWriter writer = new StreamWriter(path, true))
            {
                writer.WriteLine(message);
                writer.Close();
            }
        }
        public static void ErrorLogWithQuery(Exception ex, string query)
        {
            if (_isLogFileWithQuery == "")
            {
                CommonRule cRule = new CommonRule();
                var qry = "select SystemValue from systemList where  code  ='weblog' and SolutionName='" + _solutionName + "'";
                DataTable dt = cRule.getDataTableList(qry);

                _isLogFileWithQuery = dt.Rows.Count == 0 ? "0" : (dt.Rows[0].ItemArray)[0].ToString();
                //groupby = dt.Rows.Count == 0 ? string.Empty : dt.Rows[0].ItemArray[2].ToString().Replace("ifnull", "isnull");
                //return dt.Rows.Count == 0 ? string.Empty : dt.Rows[0].ItemArray[0].ToString().Replace("ifnull", "isnull");
                //var dt12 = cRule.getRowList(qry);

                //_isLogFileWithQuery = "false";

            }
            if (_isLogFileWithQuery != "1")
                return;
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
            string path = System.Web.HttpContext.Current.Server.MapPath("~/ViewErrorLogFiles/ErrorLogWithQuery.txt");

            using (StreamWriter writer = new StreamWriter(path, true))
            {
                writer.WriteLine(message);
                writer.Close();
            }
        }
        public static void QueryLog( string query)
        {
            if (_isLogFileWithQuery == "")
            {
                CommonRule cRule = new CommonRule();
                var qry = "select SystemValue from systemList where  code  ='weblog' and SolutionName='" + _solutionName + "'";
                DataTable dt = cRule.getDataTableList(qry);
                _isLogFileWithQuery = dt.Rows.Count == 0 ? "0" : (dt.Rows[0].ItemArray)[0].ToString();
            }
            if (_isLogFileWithQuery != "1")
                return;
            if (!Directory.Exists(dir))  // if it doesn't exist, create
                Directory.CreateDirectory(dir);
            string message = string.Format("Time: {0}", DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss tt"));
            message += Environment.NewLine;
            message += "-----------------------------------------------------------";
            message += Environment.NewLine;
            message += string.Format("Query: {0}", query);
            message += Environment.NewLine;
            message += "-----------------------------------------------------------";
            message += Environment.NewLine;
            string path = System.Web.HttpContext.Current.Server.MapPath("~/ViewErrorLogFiles/QueryLog.txt");

            using (StreamWriter writer = new StreamWriter(path, true))
            {
                writer.WriteLine(message);
                writer.Close();
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
            string path = System.Web.HttpContext.Current.Server.MapPath("~/ViewErrorLogFiles/ErrorLogString.txt");

            using (StreamWriter writer = new StreamWriter(path, true))
            {
                writer.WriteLine(message);
                writer.Close();
            }
        }

        public string ExecuteNonQueryWithImage(string sqlqry, Byte[] ImageFileName)
        {

            string result = "";
            con = new SqlConnection(constr);
            con.Open();
            cmd = new SqlCommand();
            sqltran = con.BeginTransaction("Savepoint");
            cmd.Connection = con;
            cmd.Transaction = sqltran;
            try
            {
                //dynamic sqlqryList = JsonConvert.DeserializeObject(sqlqry);
                //for (int i = 0; i < sqlqryList.Count; i++)
                //{
                //sqlqry = sqlqryList[i].ToString();
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
            con = new SqlConnection(constr);
            con.Open();
            cmd = new SqlCommand();
            sqltran = con.BeginTransaction("Savepoint");
            cmd.Connection = con;
            cmd.Transaction = sqltran;
            try
            {
                //dynamic sqlqryList = JsonConvert.DeserializeObject(sqlqry);
                //for (int i = 0; i < sqlqryList.Count; i++)
                //{
                //sqlqry = sqlqryList[i].ToString();
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
            }
            finally
            {
                con.Close();
            };
            return result;
        }


        public string ExecuteNonQueryWithThreeImages(string sqlqry, Byte[] ImageFileName, Byte[] ImageFileName1, Byte[] ImageFileName2)        {            string result = "";            con = new SqlConnection(constr);            con.Open();            cmd = new SqlCommand();            sqltran = con.BeginTransaction("Savepoint");            cmd.Connection = con;            cmd.Transaction = sqltran;            try            {
                //dynamic sqlqryList = JsonConvert.DeserializeObject(sqlqry);
                //for (int i = 0; i < sqlqryList.Count; i++)
                //{
                //sqlqry = sqlqryList[i].ToString();
                cmd.CommandText = sqlqry;                cmd.Parameters.AddWithValue("@C1", SqlDbType.Binary).Value = ImageFileName;                cmd.Parameters.AddWithValue("@C2", SqlDbType.Binary).Value = ImageFileName1;                cmd.Parameters.AddWithValue("@C3", SqlDbType.Binary).Value = ImageFileName2;                cmd.ExecuteNonQuery();
                //}
                sqltran.Commit();                result = "1";            }            catch (Exception ex)            {                ErrorLogWithQuery(ex, sqlqry);
                sqltran.Rollback();                result = "0";            }            finally            {                con.Close();            };            return result;        }

        public string ExecuteListStoreProducture(string OrgQuery, string ListName)
        {
            try
            {
                var ResultQry = string.Empty;
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
                    // throw the exception  
                }
                finally
                {
                    conn.Close();
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

                string returnValue = string.Empty;
                // string connetionString = null;
                SqlConnection connection;
                SqlDataAdapter adapter;
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

                connection.Close();

                return returnValue;

            }
            catch (Exception ex)
            {
                ErrorLogWithQuery(ex, OrgQuery);
                return string.Empty;

            }

        }



    }
    //public class SystemModel
    //{
    //    public string fieldName { get; set; }
    //    public string fieldValue { get; set; }
    //}

    public class ExecuteReaderList
    {
        public string Name { get; set; }
        public string Type { get; set; }
        public string optional { get; set; }
    }

}