using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data;
using System.Data.SqlClient;


namespace SimplrSales.Controllers
{
    public class ItemController : Controller
    {
        CommonRule _commonRule = new CommonRule();
        public ActionResult Index()
        {
            return View();
        }

        public string GetItemHeader()
        {
            //var query = "select FieldName,DataMember,NewText,IsHidden,FieldControl,DisplayNo,Columnwidth from listconfig where screenname ='AddItem' order by displayno";
            //var data = _commonRule.getItemList(query);
            var data = _commonRule.getHeaderList("AddItem");

            return data;
        }
        public string GetItem2()
        {
            var textQuery = _commonRule.QueryconfigText("AddItem");
            string query = textQuery;// "select top 10 1 as Selected, ItemNo as ItemNo, ItemName as ItemName,'' as UOM   from Item where 1=1";
            var data = _commonRule.getRowList("select  1 as Selected, ItemNo as ItemNo, ItemName as ItemName,'' as UOM   from Item where 1=1");
            return data;
        }

        public string GetItemFormlist()
        {
            var data = _commonRule.GetFormList("ItemDetails");

            return data;

        }


        public string GetItem1(int? pageNumber)
        {
            int SelectedPage = 1;
            int PageSize = 5;
             
            var ds = "SELECT * FROM (SELECT ROW_NUMBER() OVER (ORDER BY  Code) AS rownum, * FROM PriceGroup ) AS tmp WHERE rownum >= " + ((SelectedPage - 1) * PageSize + 1).ToString() + " AND rownum <= " + (SelectedPage * PageSize).ToString();
            var data1w = _commonRule.getValueList(ds);


            ////////////////////////////////////////////
            // int page = 1;
            // int limit = 5;
            // DataTable dt = new DataTable();
            //// string constr = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;

            // using (SqlConnection cnn = new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            // {
            //     using (SqlCommand cmd = cnn.CreateCommand())
            //     {
            //         cmd.CommandType = CommandType.Text;
            //         cmd.CommandText = "SELECT * FROM PriceGroup";
            //         using (SqlDataAdapter da = new SqlDataAdapter(cmd))
            //         {
            //             da.Fill(dt);
            //         }
            //     }
            // }
            // int start = (page * limit) - limit;
            //var items = (from DataRow row in dt.Rows
            //                      select new 
            //                      {
            //                            row["State"].ToString(),
            //                            row["Capital"].ToString()
            //                      }).Skip(start - 1).Take(limit).ToList();

            ////////////////////////////////////////////////////////////////


            // ProductModel model = new ProductModel();
            var PageNumber = (pageNumber == null ? 1 : Convert.ToInt32(pageNumber));
            PageSize = 5;
            var query = _commonRule.QueryconfigText("PriceGroup");

            var totalCountQuery = query.Replace("*", "Count(*)");
            ////
            int startpageNo = (PageNumber - 1) * PageSize;
            int endpageNo = PageNumber * PageSize;
            // String SQL = "SELECT * FROM PriceGroup";
            String SQL = query;
            String SQLOrderBy = "ORDER BY Code ASC "; //GetOrderByClause(Object someInputParams);

            String limitedSQL = GetPaginatedSQL(startpageNo, endpageNo, SQL, SQLOrderBy, totalCountQuery);

            var data1 = _commonRule.getValueList(limitedSQL);
            return data1;

            ////

        }

        public static string GetPaginatedSQL(int startRow, int numberOfRows, string sql, string orderingClause, string totalCountQuery)
        {
            // Ordering clause is mandatory!
            if (String.IsNullOrEmpty(orderingClause))
                throw new ArgumentNullException("orderingClause");

            // numberOfRows here is checked of disable building paginated/limited query
            // in case is not greater than 0. In this case we simply return the
            // query with its ordering clause appended to it. 
            // If ordering is not spe
            if (numberOfRows <= 0)
            {
                return String.Format("{0} {1}", sql, orderingClause);
            }
            // Extract the SELECT from the beginning.
            String partialSQL = sql.Remove(0, "SELECT ".Length);

            // Build the limited query...
            return String.Format(
                //"SELECT * FROM ( SELECT ROW_NUMBER() OVER ({0}) AS rn,(select COUNT(*) FROM PriceGroup) as TotalCount , {1} ) AS SUB WHERE rn > {2} AND rn <= {3}",
                "SELECT * FROM ( SELECT ROW_NUMBER() OVER ({0}) AS rn,(" + totalCountQuery + ") as TotalCount , {1} ) AS SUB WHERE rn > {2} AND rn <= {3}",
                orderingClause,
                partialSQL,
                startRow.ToString(),
                (startRow + numberOfRows).ToString()
            );
        }



    }
}
