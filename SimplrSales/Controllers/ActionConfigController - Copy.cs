using Newtonsoft.Json;
using SimplrSales.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SimplrSales.Controllers
{
    public class ActionConfigController : BusinessRule
    {

        //public ActionResult ActionConfig(string ScreenName, string FieldName, string ActionName, string FormView, string ListView, string obj)
        public ActionResult ActionConfig(string ScreenName, string FieldName, string ActionName, string FormView)
        {

            DataTable dataTable = new DataTable();
            if (FormView != null)
                FormView = ReplaceHashSymbol(FormView);
            var result = string.Empty;
            try
            {
                if (ActionName.ToLower() == "rowitemclicked")
                    dataTable = _commonRule.GetActionConfigList(ScreenName, "", ActionName, "ActionType");
                else
                    dataTable = _commonRule.GetActionConfigList(ScreenName, FieldName, ActionName, "ActionType");
                AssignDataTable(dataTable);
                if (ActionName.ToLower() == "menuitemclicked")
                {
                    return RedirectToAction("FormViewList", "Form", new { ScreenName = arrActionValue[0].ToString(), FieldName = FieldName, formView = FormView });
                    //return RedirectToAction("ListView", "Form", new { ScreenName = arrActionValue[0].ToString() });
                }
                else if (ActionName.ToLower() == "listitemclicked")
                {
                    return RedirectToAction("Login", "Form", new { ScreenName = arrActionValue[0].ToString() });
                }
                else if (ActionName.ToLower() == "rowitemclicked")
                {
                    DataTable dataTable1 = _commonRule.GetActionConfigListNew(arrActionValue[0].ToString());
                    AssignDataTable1(dataTable1);

                    return RedirectToAction("FormViewList", "Form", new { ScreenName = arrActionValue[0].ToString(), FieldName = FieldName, formView = FormView });
                }

            }
            catch (Exception ex)
            {
                ErrorLog(ex);
            }
            return RedirectToAction("Login", "Login");
        }

        public static List<dynamic> arrActionQuery = new List<dynamic>();
        public string[] arrActionValue = new string[0];
        public void AssignDataTable(DataTable dataTable)
        {

            arrActionValue = new string[dataTable.Rows.Count];

            for (int i = 0; i < dataTable.Rows.Count; i++)
            {
                arrActionValue[i] = dataTable.Rows[i].ItemArray[7].ToString();
            }
        }
        public void AssignDataTable1(DataTable dataTable)
        {
            arrActionQuery = new List<dynamic>();
            for (int i = 0; i < dataTable.Rows.Count; i++)
            {
                dynamic obj = new System.Dynamic.ExpandoObject();

                obj.fieldName = dataTable.Rows[i].ItemArray[1].ToString();//FieldName
                obj.DisplayNo = dataTable.Rows[i].ItemArray[2].ToString();//DisplayNo
                obj.ActionName = dataTable.Rows[i].ItemArray[3].ToString();//ActionName
                obj.ActionType = dataTable.Rows[i].ItemArray[4].ToString();//ActionType
                obj.ActionIndex = dataTable.Rows[i].ItemArray[5].ToString();//ActionIndex
                obj.Action = dataTable.Rows[i].ItemArray[6].ToString();//ActionPlan
                obj.ActionValue = dataTable.Rows[i].ItemArray[7].ToString();//ActionValue
                obj.ActionFailedValue = dataTable.Rows[i].ItemArray[8].ToString();//ActionFailedValue
                arrActionQuery.Add(obj);
            }
        }

        public string ReplaceHashSymbol(string data)
        {
            return data.Replace("hashsymbol", "#");
        }

        //        data: { objData: JSON.stringify(objData), ScreenName: scrnName, FieldName: FieldName, ActionName: sActionEvent },

        public JsonResult ActionConfig1(string data, string ScreenName, string FieldName, string sActionEvent)
        {
            /////////
            dynamic objData = string.Empty;
            data = JsonConvert.DeserializeObject(objData);
            ///////
            objData.fieldName = (objData.fieldName != null && objData.fieldName != "") ? objData.fieldName : "";

            var sActionName = string.Empty;
            var sParamsActionName = string.Empty;


            for (var i = 0; i < arrActionQuery.Count; i++)
            {
                sActionName = arrActionQuery[i].fieldName + "" + arrActionQuery[i].ActionName;
                sParamsActionName = objData.fieldName + "" + sActionEvent;
                if (sActionName.ToUpper() == sParamsActionName.ToUpper())
                {

                    var bFlag = true;
                    if (objData.Type == "ALERT")
                    {
                        if (arrActionQuery[i].ActionIndex != objData.value)
                        {
                            bFlag = false;
                        }
                    }

                    if (bFlag == true)
                    {
                        if (arrActionQuery[i].ActionType.toUpperCase() == "EXECUTE")
                        {
                            //  handleFieldAction(ScreenName, objData.fieldName, arrActionQuery[i].Action);
                        }
                        else if (arrActionQuery[i].ActionType.toUpperCase() == "NEXT")
                        {
                            //Ti.App.ARRAYOPERATION.checkWorkFlow();
                        }
                        else if (arrActionQuery[i].ActionType.toUpperCase() == "BACK")
                        {
                            //alert('ActionType BACK');
                            //Ti.App.ARRAYOPERATION.checkWorkFlow();
                            //  UI.closeWindow();
                        }

                    }

                }
            }
            return Json("test");
        }

        //dynamic FormView = string.Empty;
        public string ExecuteNonQuerys(string data)
        {
            //
            _commonRule.ExecuteNonQuery(data);
            //
            return string.Empty;
        }
        //  public string GetActionConfigData(TestModel1 model)
        public string GetActionConfigData(string query)
        {
            try
            {
                query = AESEncrytDecry.DecryptStringAES(query);//encript
                var data = _commonRule.getValueList(query);
                return data;
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                return string.Empty;
            }
        }

        public string DOWNLOADZIP(string query, string fName)
        {
            try
            {

                string startPath = @"C:\Users\DELL\Desktop\B";
                string zipPath = @"C:\Users\DELL\Desktop\B.zip";
                // string extractPath = @".\extract";

                System.IO.Compression.ZipFile.CreateFromDirectory(startPath, zipPath);
                //System.IO.Compression.ZipFile.CreateFromDirectory(dirPath, zipFile);

                query = AESEncrytDecry.DecryptStringAES(query);//encript
                var data = _commonRule.getValueList(query);
                var client = new System.Net.WebClient();
                //  string destinationFolder = @"C:\Users\DELL\Desktop\B\testA.txt";
                string destinationFile = string.Empty;
                var url = "http://13.67.95.127/KeeSongSimplrSalesService/Photo/DIS10230665200101201231_0.png";
                var uri = new Uri(url);
                var fileName = System.IO.Path.GetFileName(uri.AbsolutePath);
                var sourceURL = string.Empty;
                DataTable dt = _commonRule.getDataTableList(query);
                foreach (DataRow dr in dt.Rows)
                {
                    foreach (DataColumn col in dt.Columns)
                    {
                        if (col.ColumnName == "DocNoImg")
                        {
                            sourceURL = dr[col].ToString();
                            uri = new Uri(sourceURL);
                            fileName = System.IO.Path.GetFileName(uri.AbsolutePath);

                            destinationFile = @"C:\Users\DELL\Desktop\B\" + fileName;
                            client.DownloadFile(sourceURL, destinationFile);

                        }
                    }
                }

                //Ionic.Zip.ZipFile.CreateFromDirectory(@"C:\RootFolder", @"C:\RootFolder.zip",
                //            CompressionLevel.Optimal, true);


                for (int i = 0; i < data.Count(); i++)
                {
                    //string destinationFile = @"C:\Users\DELL\Desktop\B\testA.txt";
                    string destinationFile1 = @"C:\Users\DELL\Desktop\B\" + fileName;


                    var sourceURL1 = "http://13.67.95.127/KeeSongSimplrSalesService/Photo/DIS10230665200101201231_0.png";
                    // var client = new System.Net.WebClient();
                    //client.DownloadFile(sourceURL1, destinationFile1);

                    ////


                    ////string sourceFile = @"C:\Users\Public\public\test.txt";
                    ////string destinationFile = @"C:\Users\Public\private\test.txt";

                    //string sourceFile = @"C:\Users\DELL\Desktop\A\testA.txt";
                    //string destinationFile = @"C:\Users\DELL\Desktop\B\testA.txt";

                    ////C: \Users\DELL\Desktop
                    //// To move a file or folder to a new location:
                    //// System.IO.File.Copy(sourceFile, destinationFile);



                    ///////

                    //string fileName = "DIS10230665200101201231_0.png";
                    //string sourcePath = @"http://13.67.95.127/KeeSongSimplrSalesService/Photo";
                    //string tPath = Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData);
                    //destinationFile = "C:/Users/DELL/Desktop/B";

                    //// string targetPath = tPath + "\\IBM";
                    //string targetPath = "C:\\Users\\DELL\\Desktop\\B";
                    //string sourceFile1 = System.IO.Path.Combine(sourcePath, fileName);
                    //string destFile = System.IO.Path.Combine(targetPath, fileName);

                    //System.IO.File.Copy(sourceFile1, destFile, true);

                    ////client.DownloadFile(sourceURL, destinationFile);
                    ////sourceFile,destinationFile

                    //sourceFile = "http://13.67.95.127/KeeSongSimplrSalesService/Photo/DIS10230665200101201231_0.png";
                    //destinationFile = @"C:\Users\DELL\Desktop\B\DIS10230665200101201231_0.png";

                    ////C: \Users\DELL\Desktop
                    //// To move a file or folder to a new location:
                    //System.IO.File.Copy(sourceFile, destinationFile);

                    //// To move an entire directory. To programmatically modify or combine
                    //// path strings, use the System.IO.Path class.
                    ////System.IO.Directory.Move(@"C:\Users\Public\public\test\", @"C:\Users\Public\private");




                }
                return data;
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                return string.Empty;
            }
        }


        public string GetActionConfigData11(string query)
        {
            try
            {
                // query = AESEncrytDecry.DecryptStringAES(query);//encript
                //var data = _commonRule.getValueList("EXEC [dbo].[Report_GetDashBoardNew4] '2020-03-13','503000266'");
                var data = string.Empty;
                System.Threading.Thread.Sleep(70000);
                return data;
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                return string.Empty;
            }
        }

        public string GetSuggestedOrderQuantity(string query)
        {
            try
            {
                query = AESEncrytDecry.DecryptStringAES(query);//encript
                var data = _commonRule.SuggestedOrderQuantity(query);
                return data;
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                return string.Empty;
            }
        }
        public string getFieldList(string query)
        {
            try
            {
                query = AESEncrytDecry.DecryptStringAES(query);//encript
                var data = _commonRule.getFieldList(query);
                return data;
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                return string.Empty;
            }
        }

        public string GetMultiSeriesLineChart(string query)
        {
            try
            {
                query = AESEncrytDecry.DecryptStringAES(query);//encript
                var data = _commonRule.GetMultiSeriesLineChart(query);
                return data;
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                return string.Empty;
            }
        }
        public string GetNameValueList(string query)
        {
            try
            {
                query = AESEncrytDecry.DecryptStringAES(query);//encript
                var data = _commonRule.getNameValueList(query);
                return data;
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                return string.Empty;
            }
        }

        public string getFieldList1(string query)
        {
            try
            {
                var data = _commonRule.getFieldList(query);
                return data;
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                return string.Empty;
            }
        }


        public string GetQueryString(string query)
        {
            try
            {
                query = AESEncrytDecry.DecryptStringAES(query);//encript
                var data = _commonRule.getQueryString(query);
                return data;
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                return string.Empty;
            }
        }

        public string GetQueryString1(string query)
        {
            try
            {
                var data = _commonRule.getQueryString(query);
                return data;
            }
            catch (Exception ex)
            {
                ErrorLog(ex);
                return string.Empty;
            }
        }




        //    public void handleFieldAction(string sScreenName, string sFieldName,string sDataMember)
        //    {
        //     try {

        //        var arrayQuery = [];
        //        var arrDataMember = sDataMember.Split(',');
        //        for (var i = 0; i < arrDataMember.Length; i++) {

        //            if (arrDataMember[i] == sScreenName) {
        //                Ti.App.ARRAYOPERATION.(sScreenName);
        //                Ti.App.ARRAYOPERATION.setTablloadListConfigArreHeaderFieldNames(sScreenName);
        //                Ti.App.ARRAYOPERATION.resetRowiIndex();
        //                var qry = Ti.App.ARRAYOPERATION.getQueryConfigByScreenName(sScreenName);
        //                qry += ' ' + Titanium.App.Properties.getString('QueryConfig_' + sScreenName + '_GroupText');
        //                qry += ' ' + Titanium.App.Properties.getString('QueryConfig_' + sScreenName + '_OrderText');
        //                qry = UI.formatQueryString(qry, sScreenName);
        //                Ti.API.info('QRY --> ' + qry);
        //                var records = Ti.App.ARRAYOPERATION.loadData(sScreenName, qry, 0, false);
        //                if (Ti.App.currentTable != undefined && Ti.App.currentTable != null) {
        //                    Ti.App.currentTable.data = records;
        //                }
        //                Ti.App.currentTable.currentQuery = qry;
        //                Ti.App.currentTable.currentPage = 0;
        //                Ti.App.currentTable.pageCount = 0;
        //                //UI.updateFormListRowHeight(Ti.App.currentTable);
        //                UI.updateRowHeight();
        //            } else if (arrDataMember[i] == sScreenName + "_FORM") {

        //                Ti.App.ARRAYOPERATION.setFormConfigFieldNames(sScreenName);
        //                var arrFormFields = Ti.App.ARRAYOPERATION.getFormFieldNames();

        //                var tmpScreenName = sScreenName + "_FORM";
        //                var qry = Ti.App.ARRAYOPERATION.getQueryConfigByScreenName(tmpScreenName);
        //                qry += ' ' + Titanium.App.Properties.getString('QueryConfig_' + tmpScreenName + '_GroupText');
        //                qry += ' ' + Titanium.App.Properties.getString('QueryConfig_' + tmpScreenName + '_OrderText');
        //                qry = UI.formatQueryString(qry, tmpScreenName);

        //                var db = new dbConnection().createDataBaseConnection();
        //                Ti.API.info('FORM QRY : ' + qry);
        //                var dbDataRows = db.execute(qry);
        //                if (dbDataRows.isValidRow()) {
        //                    if ((Ti.Platform.name === 'android') || (Ti.version >= '3.3.0')) {
        //                        var length = dbDataRows.fieldCount;
        //                    } else {
        //                        var length = dbDataRows.fieldCount();
        //                    }
        //                    for (var ctr = 0; ctr < length; ctr++) {
        //                        if (arrFormFields.indexOf(dbDataRows.fieldName(ctr).toUpperCase()) > -1) {
        //                            Ti.App.ARRAYOPERATION.setFormComponentValue(dbDataRows.fieldName(ctr), dbDataRows.field(ctr));
        //                        }
        //                    }
        //                }
        //                dbDataRows.close();
        //                db.close();

        //            } else if (arrDataMember[i].indexOf(sScreenName + "_FORM_LISTVIEW_") > -1) {
        //                var arrKey = arrDataMember[i].split("_FORM_LISTVIEW_");
        //                var tmpScreenName = arrDataMember[i];
        //                Ti.App.ARRAYOPERATION.loadListConfigArr(tmpScreenName);
        //                Ti.App.ARRAYOPERATION.setTableHeaderFieldNames(tmpScreenName);
        //                Ti.App.ARRAYOPERATION.resetRowiIndex();
        //                var tblView = Ti.App.ARRAYOPERATION.getFormComponent(arrKey[1]);
        //                var _data = tblView.data;
        //                _data = (_data == null || _data == undefined || _data == '') ? [] : _data;
        //                var qry = Ti.App.ARRAYOPERATION.getQueryConfigByScreenName(tmpScreenName);
        //                qry += ' ' + Titanium.App.Properties.getString('QueryConfig_' + tmpScreenName + '_GroupText');
        //                qry += ' ' + Titanium.App.Properties.getString('QueryConfig_' + tmpScreenName + '_OrderText');
        //                qry = UI.formatQueryString(qry, tmpScreenName);
        //                Ti.API.info('QRY --> ' + qry);
        //                var tmpArrFormValues = Ti.App.ARRAYOPERATION.loadData(tmpScreenName, qry, 0, false);
        //                tblView.data = tmpArrFormValues;
        //                UI.updateFormListRowHeight(tblView);
        //            } else if (arrDataMember[i].indexOf("_EXECUTE_LISTVIEW_") > -1 || arrDataMember[i].indexOf("_EXECUTE_FORM_LISTVIEW_") > -1) {//Execute Query FORMCONFIG LISTVIEW
        //                dListRowIndex = -1;
        //                dFormListRowIndex = -1; dFormListRow = null;
        //                var tmpScreenName = arrDataMember[i];
        //                Ti.App.ARRAYOPERATION.loadListConfigArr(tmpScreenName);
        //                Ti.App.ARRAYOPERATION.setTableHeaderFieldNames(tmpScreenName);
        //                //Fomr-ads_EXECUTE_LISTVIEW__FIELD
        //                var arrTblFieldName = tmpScreenName.split("_EXECUTE_LISTVIEW_");

        //                var tblView = Ti.App.ARRAYOPERATION.getFormComponent(arrTblFieldName[1]);
        //                Ti.API.info('tblView --> ' + tblView);

        //                var _data = tblView.data;
        //                _data = (_data == null || _data == undefined || _data == '') ? [] : _data;
        //                if (_data[0].rows.length > 0) {
        //                    dFormListRow = _data;
        //                    for (var ctr = COMMON.getRowIndex() ; ctr < _data[0].rows.length; ctr++) {
        //                        dFormListRowIndex = ctr;
        //                        //var tmpScreenName = sScreenName+"_EXECUTE_LIST";
        //                        var db = new dbConnection().createDataBaseConnection();
        //                        var qry = "Select * From QueryConfig WHERE ScreenName = " + Ti.App.SQL.safeSQL(tmpScreenName);
        //                        var dbDataRows = db.execute(qry);
        //                        while (dbDataRows.isValidRow()) {
        //                            var qry = dbDataRows.fieldByName('QueryText');
        //                            qry += ' ' + dbDataRows.fieldByName('GroupText');
        //                            qry += ' ' + dbDataRows.fieldByName('OrderText');
        //                            qry = UI.formatQueryString(qry, tmpScreenName);
        //                            //Ti.App.DBCOMMON.ExecuteSQL(qry);
        //                            arrayQuery.push(qry);
        //                            dbDataRows.next();
        //                        }
        //                        dbDataRows.close();
        //                        db.close();
        //                    }
        //                    dFormListRow = null;
        //                    dFormListRowIndex = -1;
        //                }
        //            } else if (arrDataMember[i].indexOf(sScreenName + "_FORM_COMBOBOX_") > -1) {
        //                //_EXECUTE_FORM_COMBOBOX_
        //                var arrFormFields = Ti.App.ARRAYOPERATION.getFormFieldNames();

        //                var str = arrDataMember[i];
        //                var arr = str.split("_FORM_COMBOBOX_");

        //                var mScreenName = arrDataMember[i];//formdata.screenName + '_FORM_COMBOBOX_' + formdata.fieldName;
        //                var qry = Ti.App.ARRAYOPERATION.getQueryConfigByScreenName(mScreenName);
        //                qry += ' ' + Titanium.App.Properties.getString('QueryConfig_' + mScreenName + '_GroupText');
        //                qry += ' ' + Titanium.App.Properties.getString('QueryConfig_' + mScreenName + '_OrderText');
        //                qry = UI.formatQueryString(qry, mScreenName);

        //                //alert('qry --> ' + qry);

        //                if (qry != undefined) {

        //                    var field = Ti.App.ARRAYOPERATION.getFormComponent(arr[1]);
        //                    comboData = Ti.App.ARRAYOPERATION.createComboBoxData(qry);
        //                    //alert('Combo Length --> '+comboData.length);
        //                    try {
        //                        if (comboData.length > 0) {
        //                            field.ComboBoxData = comboData;
        //                            field.value = comboData[0].displayText;
        //                            field.code = comboData[0].ComboBoxCode;
        //                        } else {
        //                            field.ComboBoxData = [];
        //                            field.value = '';
        //                            field.code = '';
        //                        }
        //                    } catch (e) { }
        //                }

        //            } else if (arrDataMember[i].indexOf(sScreenName + "_FORM_MULTIPLEPHOTO_") > -1) {
        //                //_EXECUTE_FORM_COMBOBOX_
        //                var arrFormFields = Ti.App.ARRAYOPERATION.getFormFieldNames();

        //                /************************************					
        //                                    var str = arrDataMember[i];
        //                                    var arr = str.split("_FORM_MULTIPLEPHOTO_");
        //                                    var sMultiplePhotoView = Ti.App.ARRAYOPERATION.getFormComponent(arr[1]);

        //                                    try{
        //                                        var length = sMultiplePhotoView.children.length;
        //                                        for (var ctr = length-1; ctr >= 0; ctr--) {	
        //                                            var childView = sMultiplePhotoView.children[ctr];
        //                                            if (childView != undefined || childView != null) {
        //                                                sMultiplePhotoView.remove(childView);
        //                                                childView = null;
        //                                            }
        //                                        }
        //                                    }catch(e){}


        //                                    if(bIsAndroid){
        //                                        var dir = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, 'MultiplePhoto_tmp');
        //                                    }else{
        //                                        var dir =  Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'MultiplePhoto_tmp');
        //                                    }

        //                                    var dMultiplePhotoIndex = 0;
        //                                    var bImgFound = false;

        //                                    var dirItems = dir.getDirectoryListing();
        //                                    var directoryArr = dirItems.toString().split(',');

        //                                    directoryArr.push("camdisplay.simg");

        //                                    for(i=0; i < directoryArr.length; i++){

        //                                        bImgFound = false;
        //                                        if(bIsAndroid){
        //                                            file = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, 'MultiplePhoto_tmp', directoryArr[i]);
        //                                        }else{
        //                                            file =  Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'MultiplePhoto_tmp', directoryArr[i]);
        //                                        }
        //                                        if (file.exists()) {
        //                                            bImgFound = true;
        //                                            var imgPath = file.nativePath;
        //                                            file = null;
        //                                        }else{
        //                                            file = null;
        //                                            bImgFound = false;
        //                                            var imgPath = '/images/camdisplay.simg';
        //                                        }

        //                                        var ImgCtrlView = Ti.App.BasicViewObj.createBasicView(null, 'transparent', sMultiplePhotoView.height, (sMultiplePhotoView.height * 0.8), 0, 0, 0, 0, '');
        //                                        var img = new BasicImageView().createImageView(null, imgPath, 'auto', 'auto');//formdata.dValueWidth * pWidth, formdata.ValueHeight);
        //                                        img.enableZoomControls  = false;
        //                                        img.fieldControl = sMultiplePhotoView.fieldControl;
        //                                        img.fieldName = sMultiplePhotoView.fieldName;
        //                                        img.dataMember = sMultiplePhotoView.dataMember;
        //                                        img.DataMemberType = sMultiplePhotoView.DataMemberType;
        //                                        img.index = dMultiplePhotoIndex;
        //                                        img.bMultiplePhoto = true;
        //                                        img.borderWidth = 1;
        //                                        img.borderColor = '#e8e8e8';
        //                                        img.bImgFound = bImgFound;
        //                                        img.imgPath = imgPath;
        //                                        img.sFieldControlType = 'MULTIPLEPHOTO';
        //                                        img.addEventListener('click', function(e) {
        //                                            try {
        //                                                //mController.showCamera(this, e.source.fieldName);

        //                                                if(this.bImgFound == false){
        //                                                    Controller.prototype.showCamera(this, e.source.fieldName);
        //                                                }else{
        //                                                    Controller.prototype.showPreviewPopup(this, e.source.fieldName);
        //                                                }
        //                                            } catch(e) {}
        //                                        });
        //                                        sMultiplePhotoView.add(img);

        //                                        dMultiplePhotoIndex = dMultiplePhotoIndex + 1;
        //                                    }

        //                /************************************/

        //                /************************************					
        //                                    var str = arrDataMember[i];
        //                                    var arr = str.split("_FORM_MULTIPLEPHOTO_");

        //                                    var mScreenName = arrDataMember[i];//formdata.screenName + '_FORM_COMBOBOX_' + formdata.fieldName;
        //                                    var qry = Ti.App.ARRAYOPERATION.getQueryConfigByScreenName(mScreenName);
        //                                    qry += ' ' + Titanium.App.Properties.getString('QueryConfig_'+mScreenName+'_GroupText');
        //                                    qry += ' ' + Titanium.App.Properties.getString('QueryConfig_'+mScreenName+'_OrderText');
        //                                    qry = UI.formatQueryString(qry, mScreenName);

        //                                    //alert('qry --> ' + qry);

        //                                    if (qry != undefined) {

        //                                        var sMultiplePhotoView = Ti.App.ARRAYOPERATION.getFormComponent(arr[1]);


        //                                        //sMultiplePhotoView
        //                                        try{
        //                                            var length = sMultiplePhotoView.children.length;
        //                                            for (var ctr = length-1; ctr >= 0; ctr--) {	
        //                                                var childView = sMultiplePhotoView.children[ctr];
        //                                                if (childView != undefined || childView != null) {
        //                                                    sMultiplePhotoView.remove(childView);
        //                                                    childView.image = '';
        //                                                    childView.url = '';
        //                                                    childView = null;
        //                                                }
        //                                            }
        //                                        }catch(e){}


        //                                        var dMultiplePhotoIndex = 0;
        //                                        var db = new dbConnection().createDataBaseConnection();
        //                                        var dbDataRows = db.execute(qry);
        //                                        var bImgFound = false, test = '';
        //                                        while (dbDataRows.isValidRow()) {

        //                                            bImgFound = false;
        //                                            test = dbDataRows.fieldByName('ImgName');
        //                                            test =  (test == null || test == undefined || test == '') ? '' : test;
        //                                            var file = null;
        //                                            var image2 = '/images/camdisplay.simg';
        //                                            if(test != ''){	
        //                                                if(bIsAndroid){
        //                                                    file = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, 'MultiplePhoto_tmp', test);
        //                                                }else{
        //                                                    file =  Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, test);
        //                                                }

        //                                                //alert('file.exists() : ' + file.exists());

        //                                                if (file.exists()) {
        //                                                    bImgFound = true;
        //                                                    var imgPath = file.nativePath;
        //                                                    //var image2 = ImageFactory.imageAsResized(file.read(), { width: 640, height: 480 });
        //                                                    var image2 = ImageFactory.imageAsResized(file.read(), { width: sMultiplePhotoView.ImgWidth, height: sMultiplePhotoView.ImgHeight });
        //                                                    file = null;
        //                                                }else{
        //                                                    file = null;
        //                                                    bImgFound = false;
        //                                                    var imgPath = '/images/camdisplay.simg';
        //                                                    var image2 = '/images/camdisplay.simg';
        //                                                }
        //                                            }else{
        //                                                file = null;
        //                                                bImgFound = false;
        //                                                var imgPath = '/images/camdisplay.simg';
        //                                                var image2 = '/images/camdisplay.simg';
        //                                            }	

        //                                            var ImgCtrlView = Ti.App.BasicViewObj.createBasicView(null, 'transparent', sMultiplePhotoView.height, (sMultiplePhotoView.height * 0.8), 0, 0, 0, 0, '');
        //                                            var img = new BasicImageView().createImageView(null, image2, 'auto', 'auto');//formdata.dValueWidth * pWidth, formdata.ValueHeight);
        //                                            img.height = sMultiplePhotoView.ImgHeight;
        //                                            img.width = sMultiplePhotoView.ImgWidth;

        //                                            img.enableZoomControls  = false;
        //                                            img.fieldControl = sMultiplePhotoView.fieldControl;
        //                                            img.fieldName = sMultiplePhotoView.fieldName;
        //                                            img.dataMember = sMultiplePhotoView.dataMember;
        //                                            img.DataMemberType = sMultiplePhotoView.DataMemberType;
        //                                            img.index = dMultiplePhotoIndex;
        //                                            img.bMultiplePhoto = true;
        //                                            img.borderWidth = 1;
        //                                            img.borderColor = '#e8e8e8';
        //                                            img.bImgFound = bImgFound;
        //                                            img.imgPath = imgPath;
        //                                            img.imgName = test;
        //                                            img.sControlType = 'MULTIPLEPHOTO';
        //                                            img.screenName = sMultiplePhotoView.screenName;
        //                                            img.addEventListener('click', function(e) {
        //                                                try {
        //                                                    //mController.showCamera(this, e.source.fieldName);

        //                                                    if(this.bImgFound == false){
        //                                                        Controller.prototype.showCamera(this, e.source.fieldName);
        //                                                    }else{
        //                                                        Controller.prototype.showPreviewPopup(this, e.source.fieldName);
        //                                                    }
        //                                                } catch(e) {}
        //                                            });
        //                                            sMultiplePhotoView.add(img);

        //                                            dMultiplePhotoIndex = dMultiplePhotoIndex + 1;
        //                                            dbDataRows.next();
        //                                        }
        //                                        dbDataRows.close();
        //                                        db.close();
        //                                    }
        //                /************************************/
        //                var str = arrDataMember[i];
        //                var arr = str.split("_FORM_MULTIPLEPHOTO_");
        //                var sMultiplePhotoView = Ti.App.ARRAYOPERATION.getFormComponent(arr[1]);
        //                //sMultiplePhotoView
        //                try {
        //                    try {
        //                        var length = sMultiplePhotoView.children.length;
        //                    } catch (e) {
        //                        var length = 0;
        //                    }

        //                    var imgPath = '/images/camdisplay.simg';
        //                    var image2 = '/images/camdisplay.simg';

        //                    var ImgCtrlView = Ti.App.BasicViewObj.createBasicView(null, 'transparent', sMultiplePhotoView.height, (sMultiplePhotoView.height * 0.8), 0, 0, 0, 0, '');
        //                    var img = new BasicImageView().createImageView(null, image2, 'auto', 'auto');//formdata.dValueWidth * pWidth, formdata.ValueHeight);
        //                    img.height = sMultiplePhotoView.ImgHeight;
        //                    img.width = sMultiplePhotoView.ImgWidth;

        //                    img.enableZoomControls = false;
        //                    img.fieldControl = sMultiplePhotoView.fieldControl;
        //                    img.fieldName = sMultiplePhotoView.fieldName;
        //                    img.dataMember = sMultiplePhotoView.dataMember;
        //                    img.DataMemberType = sMultiplePhotoView.DataMemberType;
        //                    img.index = length;
        //                    img.bMultiplePhoto = true;
        //                    img.borderWidth = 1;
        //                    img.borderColor = '#e8e8e8';
        //                    img.bImgFound = false;//bImgFound;
        //                    img.imgPath = imgPath;
        //                    img.imgName = '';//test;
        //                    img.sControlType = 'MULTIPLEPHOTO';
        //                    img.screenName = sMultiplePhotoView.screenName;
        //                    img.addEventListener('click', function (e) {
        //                        try {
        //                            //mController.showCamera(this, e.source.fieldName);

        //                            if (this.bImgFound == false) {
        //                                Controller.prototype.showCamera(this, e.source.fieldName);
        //                            } else {
        //                                Controller.prototype.showPreviewPopup(this, e.source.fieldName);
        //                            }
        //                        } catch (e) { }
        //                    });
        //                    sMultiplePhotoView.add(img);
        //                } catch (e) { }
        //                /************************************/
        //                //Form-DisplayTrackingDetails_EXECUTE_FORM_MULTIPLEPHOTO_MultiPhoto					
        //            } else if (arrDataMember[i].indexOf(sScreenName + "_EXECUTE_FORM_MULTIPLEPHOTO_") > -1) {//Execute Query LISTCONFIG LISTVIEW
        //                var str = arrDataMember[i];
        //                var arr = str.split("_EXECUTE_FORM_MULTIPLEPHOTO_");
        //                var mScreenName = arrDataMember[i];//formdata.screenName + '_FORM_COMBOBOX_' + formdata.fieldName;
        //                var sMultiplePhotoView = Ti.App.ARRAYOPERATION.getFormComponent(arr[1]);

        //                try {

        //                    var db = new dbConnection().createDataBaseConnection();

        //                    var file = null, destFile = null, childView = null;
        //                    var length = sMultiplePhotoView.children.length;
        //                    for (var ctr = 0; ctr < length; ctr++) {
        //                        childView = sMultiplePhotoView.children[ctr];
        //                        if (childView != undefined || childView != null) {
        //                            //Ti.API.info('childView --> ' + JSON.stringify(childView));
        //                            Ti.API.info('childView.imgName --> ' + childView.imgName);
        //                            if (childView.imgName != null && childView.imgName != undefined && childView.imgName != '') {
        //                                if (bIsAndroid) {
        //                                    file = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, 'MultiplePhoto_tmp', childView.imgName);
        //                                } else {
        //                                    file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'MultiplePhoto_tmp', childView.imgName);
        //                                }
        //                                destFile = null;
        //                                if (bIsAndroid) {
        //                                    destFile = Ti.Filesystem.externalStorageDirectory + Ti.Filesystem.separator + 'Photo' + Ti.Filesystem.separator + childView.imgName;
        //                                } else {
        //                                    destFile = Ti.Filesystem.applicationDataDirectory + Ti.Filesystem.separator + childView.imgName;
        //                                }

        //                                if (file.exists()) {
        //                                    file.copy(destFile);

        //                                    sMultiImgFileName = childView.imgName;
        //                                    dOrientation = childView.dOrientation;
        //                                    dOrientation = (dOrientation == null || dOrientation == undefined || dOrientation == '') ? 1 : dOrientation;

        //                                    //Form-DisplayTrackingDetails_EXECUTE_USER_INSERTIMAGE
        //                                    var qry = Ti.App.ARRAYOPERATION.getQueryConfigByScreenName(sScreenName + '_EXECUTE_USER_INSERTIMAGE');
        //                                    qry += ' ' + Titanium.App.Properties.getString('QueryConfig_' + sScreenName + '_EXECUTE_USER_INSERTIMAGE_GroupText');
        //                                    qry += ' ' + Titanium.App.Properties.getString('QueryConfig_' + sScreenName + '_EXECUTE_USER_INSERTIMAGE_OrderText');
        //                                    qry = UI.formatQueryString(qry, sScreenName);
        //                                    db.execute(qry);
        //                                    qry = '';

        //                                }
        //                                file = null;
        //                            }
        //                        }
        //                    }

        //                    file = null; destFile = null; childView = null; length = null;

        //                    /*var dirFullPath = Ti.Filesystem.externalStorageDirectory + Ti.Filesystem.separator + 'MultiplePhoto_tmp';
        //                    var dir = Titanium.Filesystem.getFile(dirFullPath); 	 	
        //                    var dirItems = dir.getDirectoryListing();
        //                    var directoryArr = dirItems.toString().split(',');

        //                    for(var i=0; i < directoryArr.length; i++){
        //                        var del = Ti.Filesystem.getFile(Titanium.Filesystem.externalStorageDirectory + Ti.Filesystem.separator + 'MultiplePhoto_tmp' + Titanium.Filesystem.separator + directoryArr[i]);
        //                        del.deleteFile();
        //                    }*/


        //                    var dirFullPath = Ti.Filesystem.externalStorageDirectory + Ti.Filesystem.separator + 'MultiplePhoto_tmp';
        //                    var dir = Titanium.Filesystem.getFile(dirFullPath);
        //                    if (dir.exists() && dir.isDirectory()) {
        //                        dir.deleteDirectory(true); // true removes recursively the directory and its contents
        //                    }

        //                    dirFullPath = Ti.Filesystem.externalStorageDirectory + Ti.Filesystem.separator + 'MultiplePhoto_tmp';
        //                    dir = Titanium.Filesystem.getFile(dirFullPath);
        //                    if (!dir.exists()) {
        //                        dir.createDirectory();
        //                    }
        //                    dirFullPath = null;
        //                    dir = null;
        //                } catch (e) {
        //                    alert('e --> ' + e);

        //                } finally {
        //                    db.close();
        //                }

        //                str = null; arr = null;
        //                mScreenName = null; sMultiplePhotoView = null;

        //            } else if (arrDataMember[i].indexOf(sScreenName + "_EXECUTE_FORM") > -1) {//Execute Query LISTCONFIG LISTVIEW
        //                Ti.App.ARRAYOPERATION.setFormConfigFieldNames(sScreenName);
        //                dListRowIndex = -1;
        //                dFormListRowIndex = -1; dFormListRow = null;
        //                var tmpScreenName = sScreenName + "_EXECUTE_FORM";
        //                var db = new dbConnection().createDataBaseConnection();
        //                var qry = "Select * From QueryConfig WHERE ScreenName = " + Ti.App.SQL.safeSQL(tmpScreenName);
        //                var dbDataRows = db.execute(qry);
        //                while (dbDataRows.isValidRow()) {
        //                    var qry = dbDataRows.fieldByName('QueryText');
        //                    qry += ' ' + dbDataRows.fieldByName('GroupText');
        //                    qry += ' ' + dbDataRows.fieldByName('OrderText');
        //                    qry = UI.formatQueryString(qry, tmpScreenName);
        //                    //Ti.App.DBCOMMON.ExecuteSQL(qry);
        //                    arrayQuery.push(qry);
        //                    dbDataRows.next();
        //                }
        //                dbDataRows.close();
        //                db.close();
        //            } else if (arrDataMember[i].indexOf("_EXECUTE_LIST") > -1) {//Execute Query LISTCONFIG LISTVIEW
        //                dListRowIndex = -1;
        //                dFormListRowIndex = -1; dFormListRow = null;
        //                Ti.App.ARRAYOPERATION.loadListConfigArr(sScreenName);
        //                Ti.App.ARRAYOPERATION.setTableHeaderFieldNames(sScreenName);
        //                var rows = Ti.App.ARRAYOPERATION.getAllRows(0);
        //                var db = new dbConnection().createDataBaseConnection();
        //                for (var _i = COMMON.getRowIndex() ; _i < rows.length; _i++) {
        //                    UI.setselectedRowIndex(_i);
        //                    dListRowIndex = _i;
        //                    var tmpScreenName = sScreenName + "_EXECUTE_LIST";
        //                    var qry = "Select * From QueryConfig WHERE ScreenName = " + Ti.App.SQL.safeSQL(tmpScreenName);
        //                    var dbDataRows = db.execute(qry);
        //                    while (dbDataRows.isValidRow()) {
        //                        var qry = dbDataRows.fieldByName('QueryText');
        //                        qry += ' ' + dbDataRows.fieldByName('GroupText');
        //                        qry += ' ' + dbDataRows.fieldByName('OrderText');
        //                        qry = UI.formatQueryString(qry, tmpScreenName);
        //                        //Ti.App.DBCOMMON.ExecuteSQL(qry);
        //                        arrayQuery.push(qry);
        //                        dbDataRows.next();
        //                    }
        //                    dbDataRows.close();
        //                }
        //                db.close();
        //                dListRowIndex = -1;
        //            } else if (arrDataMember[i].indexOf("_EXECUTE") > -1) {//Execute Query LISTCONFIG LISTVIEW
        //                dListRowIndex = -1;
        //                dFormListRowIndex = -1; dFormListRow = null;
        //                var tmpScreenName = arrDataMember[i];
        //                var db = new dbConnection().createDataBaseConnection();
        //                var qry = "Select * From QueryConfig WHERE ScreenName = " + Ti.App.SQL.safeSQL(tmpScreenName);
        //                var dbDataRows = db.execute(qry);
        //                while (dbDataRows.isValidRow()) {
        //                    var qry = dbDataRows.fieldByName('QueryText');
        //                    qry += ' ' + dbDataRows.fieldByName('GroupText');
        //                    qry += ' ' + dbDataRows.fieldByName('OrderText');
        //                    qry = UI.formatQueryString(qry, tmpScreenName);
        //                    //Ti.App.DBCOMMON.ExecuteSQL(qry);
        //                    arrayQuery.push(qry);
        //                    dbDataRows.next();
        //                }
        //                dbDataRows.close();
        //                db.close();
        //                dListRowIndex = -1;
        //            } else {

        //                var sScreenName = arrDataMember[i];
        //                var qry = Ti.App.ARRAYOPERATION.getQueryConfigByScreenName(sScreenName);
        //                qry += ' ' + Titanium.App.Properties.getString('QueryConfig_' + sScreenName + '_GroupText');
        //                qry += ' ' + Titanium.App.Properties.getString('QueryConfig_' + sScreenName + '_OrderText');
        //                qry = UI.formatQueryString(qry, sScreenName);


        //                //var qry = arrDataMember[i];
        //                //qry = UI.formatQueryString(qry, tmpScreenName);
        //                var db = new dbConnection().createDataBaseConnection();
        //                var sActionfieldName = '', sActionfieldValue = '';

        //                var dbDataRows = db.execute(qry);

        //                var fieldCount = Ti.App.SQL.getFieldCount(dbDataRows);
        //                fieldCount = (fieldCount == null || fieldCount == undefined || fieldCount == '') ? 0 : fieldCount;
        //                for (var fieldCnt = 0; fieldCnt < fieldCount; fieldCnt++) {
        //                    sActionfieldName = dbDataRows.fieldName(fieldCnt);
        //                    if (sActionfieldName != '') {
        //                        //NEED TO DO UPDATE FORM LISTVIEW
        //                        if (sActionfieldName.indexOf('FormView.') > -1) {
        //                            var arrFieldName = sActionfieldName.split('FormView.');
        //                            Ti.App.ARRAYOPERATION.setFormComponentValue(arrFieldName[1], '');
        //                        } else if (sActionfieldName.indexOf('ListView.') > -1) {
        //                            var arrFieldName = sActionfieldName.split('ListView.');
        //                            Ti.App.ARRAYOPERATION.updateColumnData(0, Ti.App.ARRAYOPERATION.getSelectedRowIndex(), arrFieldName[1], '');
        //                        }

        //                    }
        //                }


        //                Ti.API.info('db.rowsAffected : ' + db.rowsAffected);


        //                while (dbDataRows.isValidRow()) {
        //                    //var fieldCount = Ti.App.SQL.getFieldCount(dbDataRows);
        //                    for (var fieldCnt = 0; fieldCnt < fieldCount; fieldCnt++) {

        //                        sActionfieldName = dbDataRows.fieldName(fieldCnt);
        //                        sActionfieldValue = dbDataRows.fieldByName(sActionfieldName);
        //                        if (sActionfieldName != '') {
        //                            //NEED TO DO UPDATE FORM LISTVIEW
        //                            if (sActionfieldName.indexOf('FormView.') > -1) {
        //                                var arrFieldName = sActionfieldName.split('FormView.');
        //                                Ti.App.ARRAYOPERATION.setFormComponentValue(arrFieldName[1], sActionfieldValue);
        //                            } else if (sActionfieldName.indexOf('ListView.') > -1) {
        //                                var arrFieldName = sActionfieldName.split('ListView.');
        //                                Ti.App.ARRAYOPERATION.updateColumnData(0, Ti.App.ARRAYOPERATION.getSelectedRowIndex(), arrFieldName[1], sActionfieldValue);
        //                            }
        //                        }
        //                    }

        //                    dbDataRows.next();
        //                }
        //                dbDataRows.close();
        //                db.close();


        //                /*//sDataMember -> ACTION QUERY

        //                //select custno as [formview.listview.abc] from customers  
        //                        listview.abc -> update listview 'abc' field value by selectrowindex
        //                //select custno as [formview.abc] from customers  
        //                        formview.abc -> update formview 'abc' field value
        //                //select custno as [listview.abc] from customers  
        //                        listview.abc -> update listview 'abc' field value by selectrowindex
        //                */
        //            }

        //            /*
        //SCREENNAME_INSERT  ->  
        //    SCREENNAME_INSERT_FORM -> execute( Formatstring - Select * From QueryConfig WHERE Screenname = 'SCREENNAME_INSERT_FORM') 
        //    SCREENNAME_INSERT_LISTVIEW_FieldName (Save TableData)

        //             */
        //        }


        //        if (arrayQuery.length > 0) {
        //            Ti.App.DBCOMMON.BulkInsertQueries(arrayQuery);
        //        }
        //    } catch (e) {
        //        Ti.API.info('e ---> ' + e);
        //        //alert('e ---> ' + e);
        //    }
        //}







    }

    public class TestModel1
    {
        public string qry { get; set; }
        // hidden fields for password
    }
}
