using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace SimplrSales.Models
{
    public class CSVtoExcel
    {
        public string CSVtoXL(string filePath, string tblName)
        {
            try
            {
                //filePath = @"C:\Users\Comgen01\Desktop\log\shelf1.csv";

                //            fileName.Split('\\')[fileName.Split('\\').Count() - 1]
                //fileName.Split('\\')[fileName.Split('\\').Count() - 1].Split('.')[1] == "xlsx"
                //fileName.Split('\\')[fileName.Split('\\').Count() - 1].Replace("xlsx", "csv")
                //        fileName.Split('\\')[fileName.Split('\\').Count() - 1].Replace("xlsx", "csv")  "Bin_ADMIN_20220324212247.csv"  string
                //        fileName.Replace("Bin_ADMIN_20220324212247.xlsx", "Bin_ADMIN_20220324212247.csv")

                if (filePath.Split('\\')[filePath.Split('\\').Count() - 1].Split('.')[1].ToLower() == "csv")
                {
                    var csvfileName = filePath.Split('\\')[filePath.Split('\\').Count() - 1];
                    var xlfileName = filePath.Split('\\')[filePath.Split('\\').Count() - 1].Replace("csv", "xlsx").Replace("CSV", "xlsx").Replace("Csv", "xlsx");
                    var excelFilePath = filePath.Replace(csvfileName, xlfileName);

                    string worksheetsName = tblName;
                    bool firstRowIsHeader = false;

                    var excelTextFormat = new ExcelTextFormat();
                    excelTextFormat.Delimiter = ',';
                    excelTextFormat.EOL = "\r";

                    var excelFileInfo = new FileInfo(excelFilePath);
                    var csvFileInfo = new FileInfo(filePath);

                    using (ExcelPackage package = new ExcelPackage(excelFileInfo))
                    {
                        ExcelWorksheet worksheet = package.Workbook.Worksheets.Add(worksheetsName);
                        worksheet.Cells["A1"].LoadFromText(csvFileInfo, excelTextFormat, OfficeOpenXml.Table.TableStyles.Medium25, firstRowIsHeader);
                        package.Save();
                    }
                    return excelFilePath;
                }

                //string csvFilePath = @"D:\sample.csv";
                //string excelFilePath = @"D:\sample.xls";
                //string csvFilePath = @"C:\Users\Comgen01\Desktop\log\shelf1.csv";
                //string excelFilePath = @"C:\Users\Comgen01\Desktop\log\shelf1.xlsx";
                //string worksheetsName = "TEST";
                //bool firstRowIsHeader = false;

                //var excelTextFormat = new ExcelTextFormat();
                //excelTextFormat.Delimiter = ',';
                //excelTextFormat.EOL = "\r";

                //var excelFileInfo = new FileInfo(excelFilePath);
                //var csvFileInfo = new FileInfo(csvFilePath);

                //using (ExcelPackage package = new ExcelPackage(excelFileInfo))
                //{
                //    ExcelWorksheet worksheet = package.Workbook.Worksheets.Add(worksheetsName);
                //    worksheet.Cells["A1"].LoadFromText(csvFileInfo, excelTextFormat, OfficeOpenXml.Table.TableStyles.Medium25, firstRowIsHeader);
                //    package.Save();
                //}

            }
            catch (Exception ex)
            {
                return ex.Message;
            }
            return filePath;
        }
    }
}