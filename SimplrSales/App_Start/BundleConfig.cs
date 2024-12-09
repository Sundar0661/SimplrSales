using System.Web;
using System.Web.Optimization;

namespace SimplrSales
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {

            //bundles.UseCdn = true;
            //bundles.Add(new ScriptBundle("~/bundles/scripts", "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.js")
            //      .Include("~/Scripts/Main/*.js"));

            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include(
                        "~/Scripts/jquery-ui-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jquery-ui").Include(
                        "~/Scripts/jquery-ui-1.8.24.js",
                        "~/Scripts/jquery-ui-1.8.24.min.js"));


            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.unobtrusive*",
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new StyleBundle("~/Content/css").Include("~/Content/site.css"));

            bundles.Add(new StyleBundle("~/Content/themes/base/css").Include(
                        "~/Content/themes/base/jquery.ui.core.css",
                        "~/Content/themes/base/jquery.ui.resizable.css",
                        "~/Content/themes/base/jquery.ui.selectable.css",
                        "~/Content/themes/base/jquery.ui.accordion.css",
                        "~/Content/themes/base/jquery.ui.autocomplete.css",
                        "~/Content/themes/base/jquery.ui.button.css",
                        "~/Content/themes/base/jquery.ui.dialog.css",
                        "~/Content/themes/base/jquery.ui.slider.css",
                        "~/Content/themes/base/jquery.ui.tabs.css",
                        "~/Content/themes/base/jquery.ui.datepicker.css",
                        "~/Content/themes/base/jquery.ui.progressbar.css",
                        "~/Content/themes/base/jquery.ui.theme.css"));

            ///
            bundles.Add(new StyleBundle("~/Style/css").Include(
                                "~/Content/tabMenu.css",
                                "~/Content/Popupdraggable.css",
                                "~/Content/ColumnWidth.css"));

            bundles.Add(new ScriptBundle("~/jquery/Main").Include(
                        "~/Scripts/jquery-1.8.2.js",
                        "~/Scripts/jquery-1.8.2.min.js",
                        "~/Scripts/jqueryui-1.12.1.jquery-ui.min.js"
                        ));


            ///

            //added by vignesh on 21/08/2024
            bundles.Add(new ScriptBundle("~/bundles/scripts")
                  .Include("~/Scripts/Main/*.js"));

            BundleTable.EnableOptimizations = true;
        }
    }
}