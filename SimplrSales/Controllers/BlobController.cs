using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;


using OfficeOpenXml;
using SimplrSales.Repository;
using System.Data.SqlClient;
//using IMEX;
using System.Web.Script.Serialization;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using Excel1 = Microsoft.Office.Interop.Excel;
using System.Diagnostics;
using Microsoft.IdentityModel.Protocols;
using System.Configuration;
using System.IO;

namespace SimplrSales.Controllers
{
    public class BlobController : BusinessRule
    {
        //
        // GET: /Blob/
        public string constr = string.Empty;
        private SqlConnection con, con1;

        private void connection()
        {

            constr = ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString();
            con = new SqlConnection(constr);
            con1 = new SqlConnection(constr);
        }
        public ActionResult Download()
        {
            try
            {
                // string filePath = ConfigurationManager.AppSettings.Get("downloadirectory").ToString();
                string folderName = ConfigurationManager.AppSettings["downloadirectory"];
                CloudStorageAccount storageAccount = CloudStorageAccount.Parse(ConfigurationManager.AppSettings.Get("BlobeCon").ToString());
                CloudBlobContainer blobContainer = storageAccount.CreateCloudBlobClient().GetContainerReference(ConfigurationManager.AppSettings.Get("BlobeContainer").ToString());
                BlobDownloadLog("1. folderName =" + folderName + " : 2. storageAccount" + storageAccount + " : 3. blobContainer" + blobContainer);

                var blobs = blobContainer.ListBlobs(null, true, BlobListingDetails.All).Cast<CloudBlockBlob>();
                //  var excelApp = new Excel1.Application();
                string directoryPath = Server.MapPath(folderName).ToString();
                string filePath = directoryPath;
                if (!Directory.Exists(directoryPath))
                {
                    Directory.CreateDirectory(directoryPath);
                }
                var blobsCount = 0;
                BlobDownloadLog("blobs foreach start : " + blobs);
                foreach (var blockBlob in blobs)
                {
                    blobsCount++;
                    // if (blockBlob.Name.Contains(tblname))
                    //{
                    try
                    {

                        string filePat = filePath + blockBlob.Name;
                        BlobDownloadLog("blobsCount : " + blobsCount + " , filePat : " + filePat);
                        blockBlob.DownloadToFile(filePat, FileMode.OpenOrCreate, null);
                    }
                    catch (Exception ex)
                    {
                        ViewBag.Message = ex.Message;
                        return Json(ex.Message, JsonRequestBehavior.AllowGet);
                        // return View(db.ImportConfigTemps.GroupBy(i => i.TableName).Select(group => group.FirstOrDefault()));
                    }
                    //  }
                }
                BlobDownloadLog("blobs foreach end : ");

                if (blobsCount == 0)
                {
                    ViewBag.Message = "Downloaded files from Blob : " + blobsCount + " , Uploaded files : 0. ";
                    BlobDownloadLog("blobsCount 0, ViewBag.Message   : " + ViewBag.Message);
                    return View();
                }

                string blobeDownload = ConfigurationManager.AppSettings.Get("BlobeDownload").ToString();
                //string blobeExport = ConfigurationManager.AppSettings.Get("BlobeExport").ToString();
                //string blobeError = ConfigurationManager.AppSettings.Get("BlobeError").ToString();

                string blobeExportPath = ConfigurationManager.AppSettings["BlobeExport"];
                string blobeErrorPath = ConfigurationManager.AppSettings["BlobeError"];

                string blobeExport = Server.MapPath(blobeExportPath).ToString();
                string blobeError = Server.MapPath(blobeErrorPath).ToString();

                BlobDownloadLog("blobeExport folder: " + blobeExport + " , blobeError folder: " + blobeError);
                connection();
                IMEXUL.IMEXPOSAUTOCLS objPosAutoCLS = new IMEXUL.IMEXPOSAUTOCLS();
                objPosAutoCLS.Path = blobeDownload;
                objPosAutoCLS.ErrPath = blobeError;
                objPosAutoCLS.sFolderArch = blobeExport;
                objPosAutoCLS.CS = constr;
                objPosAutoCLS.ImExObjPOS.ErrPath = blobeError;
                BlobDownloadLog("objPosAutoCLS.ExecutePOS start: ");

                var result = objPosAutoCLS.ExecutePOS();
                BlobDownloadLog("objPosAutoCLS.ExecutePOS End , result: " + result);

                List<string> myList = objPosAutoCLS.myList;
                List<string> myListErrorLog = objPosAutoCLS.myListErrorLog;
                List<string> myListStatus = objPosAutoCLS.myListStatus;
                BlobDownloadLog("myList: " + myList.Count() + " , myListErrorLog : " + myListErrorLog.Count() + " , myListStatus" + myListStatus);
                ///

                var filename = string.Empty;
                foreach (var blockBlob in blobs)
                {
                    BlobDownloadLog("blockBlob Delete: " + blockBlob);
                    blockBlob.DeleteIfExists();
                }

                //Create Reference to Azure Blob
                CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
                //The next 2 lines create if not exists a container named "democontainer"
                CloudBlobContainer container = blobClient.GetContainerReference(ConfigurationManager.AppSettings.Get("BlobeContainerError").ToString());
                container.CreateIfNotExists();
                ///
                CloudBlobContainer containersuccess = blobClient.GetContainerReference(ConfigurationManager.AppSettings.Get("BlobeContainerSuccess").ToString());
                containersuccess.CreateIfNotExists();
                ///

                var blobeErrorUploadPath = string.Empty;
                for (int z = 0; z < myListErrorLog.Count(); z++)
                {
                    BlobDownloadLog("Error  path and file name : " + blobeError + " - " + myListErrorLog[z]);
                    if (myListErrorLog[z] != "")
                    {
                        CloudBlockBlob blockBlob = container.GetBlockBlobReference(myListErrorLog[z]);
                        blobeErrorUploadPath = blobeError + myListErrorLog[z];
                        BlobDownloadLog("blobeErrorUploadPath : " + blobeErrorUploadPath);
                        blockBlob.UploadFromFile(blobeErrorUploadPath);

                        //
                        blobeErrorUploadPath = blobeDownload + myListErrorLog[z];
                        System.IO.File.Delete(blobeErrorUploadPath);
                    }
                    else if (myList[z] != "" && myListStatus[z] == "Not Completed")
                    {
                        CloudBlockBlob blockBlob = container.GetBlockBlobReference(myList[z]);
                        blobeErrorUploadPath = blobeDownload + myList[z];
                        BlobDownloadLog("blobeErrorUploadPath : " + blobeErrorUploadPath);
                        blockBlob.UploadFromFile(blobeErrorUploadPath);

                        //
                        System.IO.File.Delete(blobeErrorUploadPath);

                    }
                }
                var retStatus = string.Empty;
                var returnStatus = string.Empty;
                for (int x = 0; x < myList.Count(); x++)
                {
                    retStatus = myListStatus[x];
                    if (retStatus == "Completed")
                    {
                        returnStatus = returnStatus + blobeExportPath.Replace("~", "..") + myList[x].ToString() + " $ " + retStatus + " & ";
                    }
                    else if (retStatus == "Not Completed")
                    {
                        returnStatus = returnStatus + blobeErrorPath.Replace("~", "..") + myListErrorLog[x].ToString() + " $ " + retStatus + " & ";
                    }
                    BlobDownloadLog("returnStatus : " + returnStatus);
                }
                BlobDownloadLog("if (result != ) : " + result);

                if (result != "")
                {
                    var blobReturn = result.Split(',');
                    var blobeSuccessUploadPath = string.Empty;
                    for (int z = 0; z < blobReturn.Count(); z++)
                    {
                        BlobDownloadLog("success path and file name  : " + blobeExport + " - " + blobReturn[z]);
                        if (blobReturn[z] != "")
                        {
                            CloudBlockBlob blockBlob = containersuccess.GetBlockBlobReference(blobReturn[z]);
                            blobeSuccessUploadPath = blobeExport + blobReturn[z];
                            BlobDownloadLog("blobeSuccessUploadPath : " + blobeSuccessUploadPath);
                            blockBlob.UploadFromFileAsync(blobeSuccessUploadPath);

                            //delete 
                            blobeErrorUploadPath = blobeDownload + blobReturn[z];
                            System.IO.File.Delete(blobeErrorUploadPath);
                        }
                    }

                    BlobDownloadLog("blobsCount > blobReturn.Count() : ");
                    if (blobsCount > blobReturn.Count())
                    {
                        ViewBag.Message = "Downloaded files from Blob : " + blobsCount + " , Uploaded files : " + blobReturn.Count() + ". Please check the log files #" + returnStatus;
                        BlobDownloadLog("1. ViewBag.Message   : " + ViewBag.Message);
                        return View();
                    }
                    else
                    {
                        ViewBag.Message = "Completed! #" + returnStatus;
                        BlobDownloadLog("2. ViewBag.Message   : " + ViewBag.Message);
                        return View();
                    }

                }
                else
                {
                    ViewBag.Message = "Downloaded files from Blob : " + blobsCount + " , Uploaded files : 0. Please check the log files #" + returnStatus;
                    BlobDownloadLog("3. ViewBag.Message   : " + ViewBag.Message);
                    return View();
                }
            }
            catch (Exception ex)
            {
                ViewBag.Message = ex.Message;
                BlobDownloadLog("4. ViewBag.Message   : " + ViewBag.Message);
                // ErrorLog(ex);
                return View();
            }
        }

    }
}
