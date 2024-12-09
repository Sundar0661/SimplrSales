var arrActionQuery = [];
var params = null;
var objParams = {};
var selectedListColumnName = '';
var selectedListColumnNo = 0;
var sumofColumn = 0;
var AllOfList = '';

var SumOfActive = 0;
var isValidateList = false;
var _dataLenctr = 0;
var FieldName = '';


var TempLogwrite = getSystemValue('TempLogwrite');//ArrayOperations
TempLogwrite = (TempLogwrite != null && TempLogwrite != undefined && (TempLogwrite == 1 || TempLogwrite == '1' || TempLogwrite == true || TempLogwrite == 'true')) ? true : false;

function windowPreparingToOpen(currentScreenName) {
    PageLoadinginfo("getSystemValue(PDAID) Function Start");
    sTransDocNo = getSystemValue("PDAID");//ArrayOperations//+ "" + Ti.App.SQL.getTransDocNo();
    PageLoadinginfo("getSystemValue(PDAID) Function End");
    try {
        _varObj = {};
        sSearchText = ''; sBarcodeValue = '';
        //objParams = objParams;
        arrActionQuery = [];
        // var db = new dbConnection().createDataBaseConnection();
        var BaseQty = 0;
        var dbDataRows = "";
        //var qry = "SELECT * FROM ActionConfig WHERE ScreenName=" + currentScreenName + " and Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel) + " ORDER By ActionName, DisplayNo";
        var qry = "SELECT * FROM ActionConfig WHERE ScreenName='" + currentScreenName + "'  ORDER By ActionName, DisplayNo";
        if (currentScreenName == "ItemPromotionForm" || currentScreenName == "InvoicePromotionForm")
            qry = "SELECT * FROM ActionConfig WHERE ScreenName like '%" + currentScreenName + "%'  ORDER By ActionName, DisplayNo";

        PageLoadinginfo("windowPreparingToOpen function Select ActionConfig query and Execute =" + qry);

        // TiAPIinfo('qry ---> ' + qry);
        // dbDataRows = db.execute(qry);
        ///

        //var key = CryptoJS.enc.Utf8.parse('simplr8080808080');
        //var iv = CryptoJS.enc.Utf8.parse('simplr8080808080');
        qry = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(qry), encryptkey, { keySize: 128 / 8, iv: encryptiv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
        var params = "{'query':'" + qry + "'}";

        PageLoadinginfo("ActionConfig query Execute start");
        $.ajax({
            type: "POST",
            url: url_GetActionConfigData,
            data: params,
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            async: false,

            //url: url_GetActionConfigData,
            //// url: "/ActionConfig/GetActionConfigData",
            //type: 'POST',
            //dataType: 'json',
            //async: false,
            //data: { query: qry },
            success: function (results) {
                dbDataRows = results;
                PageLoadinginfo("ActionConfig query Executed end :: and dbDataRows value =" + (results == null) ? 0 : results.length);

            },
            error: function (results, q, a) {
                alert(results);
            }
        });
        ///
        if (dbDataRows == null) {
            alert('Invalid object name ActionConfig or ActionConfig row value is null');
        }
        else {
            PageLoadinginfo("windowPreparingToOpen dbDataRows forloop start: " + dbDataRows.length);
            for (var i = 0; i < dbDataRows.length; i++) {
                //while (dbDataRows.isValidRow()) {
                var obj = {};
                obj.ScreenName = dbDataRows[i].ScreenName;
                obj.ActionName = dbDataRows[i].ActionName;
                obj.DisplayNo = dbDataRows[i].DisplayNo;
                obj.Action = dbDataRows[i].ActionPlan;
                obj.ActionValue = dbDataRows[i].ActionValue;
                obj.ActionFailedValue = dbDataRows[i].ActionFailedValue;
                obj.ActionType = dbDataRows[i].ActionType;
                obj.ActionIndex = dbDataRows[i].ActionIndex;
                obj.fieldName = dbDataRows[i].FieldName;
                arrActionQuery.push(obj);
                // dbDataRows.next();
            }
        }
        PageLoadinginfo("windowPreparingToOpen dbDataRows forloop end");

        //dbDataRows.close();
        //db.close();
    } catch (e) {
        alert('Set ActionConfig Error : ' + e);
    }
    // PerformAction('windowPreparingToOpen', {});//Controllers
    //Controller.prototype.handleFieldAction

    //Ti.App.ARRAYOPERATION.debug('Test Tag', 'windowPreparingToOpen');
}

var executeQry = '';
var executeStringQry = '';
function execute1(qry) {

    $.ajax({
        url: url_GetActionConfigData,
        // url: "/ActionConfig/GetActionConfigData",
        type: 'POST',
        //dataType: 'json',
        async: false,
        data: { query: qry },
        success: function (results) {
            executeStringQry = results;
            executeQry = $.parseJSON(results);
            //executeQry = results;
            return results;
        },
        error: function (results, q, a) {
            alert(results);
        }
    });

}
function execute(qry) {
    if (qry != "") {
        //var key = CryptoJS.enc.Utf8.parse('simplr8080808080');
        //var iv = CryptoJS.enc.Utf8.parse('simplr8080808080');
        qry = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(qry), encryptkey, { keySize: 128 / 8, iv: encryptiv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
        var params = "{'query':'" + qry + "'}";
        $.ajax({
            type: "POST",
            url: url_GetActionConfigData,
            data: params,
            contentType: "application/json;charset=utf-8",
            // dataType: "json",
            async: false,
            success: function (results) {

                //if (_isFormList == true && currentScreenName == "re-calculatesuggestedorderquantity") {
                //    alert(results.length);
                //    fieldcount = 0;
                //    debugger;
                //}

                //if (_isFormList == true)
                //    LoadingImageClose();
                //  alert();
                //if ("RouteplanProcessForm" == currentScreenName)
                //    alert(results);
                executeStringQry = results;
                executeQry = $.parseJSON(results);
                //executeQry = results;
                return results;
            },
            error: function (results, q, a) {
                alert("test : : " + results);
            }

        });
    }
}


function executeA(qry) {
    if (qry != "") {
        //var key = CryptoJS.enc.Utf8.parse('simplr8080808080');
        //var iv = CryptoJS.enc.Utf8.parse('simplr8080808080');
        qry = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(qry), encryptkey, { keySize: 128 / 8, iv: encryptiv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
        var params = "{'query':'" + qry + "'}";
        $.ajax({
            type: "POST",
            url: url_GetActionConfigData,
            data: params,
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            async: false,
            success: function (results) {

                executeStringQry = results;
                executeQry = $.parseJSON(results);
                //executeQry = results;
                return results;
            },
            error: function (results, q, a) {
                alert("test : : " + results);
            }

        });
    }
}

function executeSuggestedOrderQuantity(qry) {
    //var key = CryptoJS.enc.Utf8.parse('simplr8080808080');
    //var iv = CryptoJS.enc.Utf8.parse('simplr8080808080');
    qry = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(qry), encryptkey, { keySize: 128 / 8, iv: encryptiv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    var params = "{'query':'" + qry + "'}";
    LoadingImageOpen();
    $.ajax({
        type: "POST",
        url: url_GetActionConfigData,
        data: params,
        contentType: "application/json;charset=utf-8",
        // dataType: "json",
        async: true,
        success: function (results) {
            LoadingImageClose();
            //if (_isFormList == true && currentScreenName == "re-calculatesuggestedorderquantity") {
            //    alert(results.length);
            //    fieldcount = 0;
            //    debugger;
            //}

            //if (_isFormList == true)
            //    LoadingImageClose();
            //  alert();
            //if ("RouteplanProcessForm" == currentScreenName)
            //    alert(results);
            executeStringQry = results;
            executeQry = $.parseJSON(results);
            //executeQry = results;

            var btns = {};
            btns["Ok"] = function (e) {
                $(this).dialog("close");
            }
            $('<div></div>').appendTo('body')
                              .html('<div><h6>Created Successfully</h6></div>').dialog({
                                  modal: true, title: "Process Execution", zIndex: 10000, autoOpen: true,
                                  width: '20%', resizable: false,
                                  buttons: btns
                              });

            return results;
        },
        error: function (results, q, a) {
            LoadingImageClose();
            // alert("test : : " + results);
        }

    });

}



function executeFieldList(qry) {

    //var key = CryptoJS.enc.Utf8.parse('simplr8080808080');
    //var iv = CryptoJS.enc.Utf8.parse('simplr8080808080');
    qry = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(qry), encryptkey, { keySize: 128 / 8, iv: encryptiv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    var params = "{'query':'" + qry + "'}";
    $.ajax({
        type: "POST",
        url: url_getFieldList,
        data: params,
        contentType: "application/json;charset=utf-8",
        // dataType: "json",
        async: false,
        success: function (results) {
            executeQry = $.parseJSON(results);
            return results;
        },
        error: function (results, q, a) {
            alert(results);
        }
    });

}


function executeFieldList1(qry) {
    $.ajax({
        url: url_getFieldList,
        // url: "/ActionConfig/getFieldList",
        type: 'POST',
        dataType: 'json',
        async: false,
        data: { query: qry },
        success: function (results) {
            executeQry = results;
            return results;
        },
        error: function (results, q, a) {
            alert(results);
        }
    });
}


function getExecute(qry) {

    //var key = CryptoJS.enc.Utf8.parse('simplr8080808080');
    //var iv = CryptoJS.enc.Utf8.parse('simplr8080808080');
    qry = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(qry), encryptkey, { keySize: 128 / 8, iv: encryptiv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    var params = "{'query':'" + qry + "'}";
    $.ajax({
        type: "POST",
        url: url_GetQueryString,
        data: params,
        contentType: "application/json;charset=utf-8",
        // dataType: "json",
        async: false,
        success: function (results) {
            executeQry = results;
            return results;
        },
        error: function (results, q, a) {
            alert(results);
        }
    });

}


function getExecute1(qry) {
    $.ajax({
        url: url_GetQueryString,
        //  url: "/ActionConfig/GetQueryString",
        type: 'POST',
        async: false,
        data: { query: qry },
        success: function (results) {
            executeQry = results;
            return results;
        },
        error: function (results, q, a) {
            executeQry = "";
            //alert(results);
        }
    });
}


var tempsActionEvent = '';
var tempobjData = '';
var tempPAi = '';
function PerformAction(sActionEvent, objData, tempPAiCnt) {


    //if (sActionEvent == "mapclicked_Customer")
    //{
    //    alert(Clicked_Map_CustomerNo);
    //    return;
    //}


    if (sActionEvent == " ")
        return;

    tempsActionEvent = sActionEvent;
    tempobjData = objData;
    //  info('sActionEvent - ' + sActionEvent + ' : objData - ' + JSON.stringify(objData));
    // TiAPIinfo('sActionEvent - ' + sActionEvent + ' : objData - ' + JSON.stringify(objData));
    PageLoadinginfo('sActionEvent - ' + sActionEvent + ' : objData - ' + JSON.stringify(objData));

    //alert('sActionEvent - ' + sActionEvent + ' : objData - ' + JSON.stringify(objData));

    /*
     * 
     * var obj = {};
                obj.ActionName = dbDataRows.fieldByName('ActionName');
                obj.FieldName = dbDataRows.fieldByName('FieldName');
                obj.DisplayNo = dbDataRows.fieldByName('DisplayNo');
                obj.Action = dbDataRows.fieldByName('Action');
                obj.ActionValue = dbDataRows.fieldByName('ActionValue');
                
                obj.ActionType = dbDataRows.fieldByName('ActionType');
                arrActionQuery.
                
                
    UploadTABLES
    Tablename  Fields               Uploaded
    - - - - - - - - - - - - - - - - - - - - - - - 
    Orders    OrderNo, OrdDt, Amt       0
    Invoice   InvNo, InvDt, Amt         0 
     
                
                
    
    ACTIONTYPE : VALIDATE
    select true as response, ActionCode (ActionCode may be USERDEFINED)
        PerformAction : function(ActionCode, {}){
    select false as response
                
                
     */
    try {
        objData.fieldName = (objData.fieldName != null && objData.fieldName != undefined && objData.fieldName != '') ? objData.fieldName : '';
        //objData.value = (objData.value != null && objData.value != undefined && objData.value != '') ? objData.value : -1;
        //objData.rowIndex = (objData.rowIndex != null && objData.rowIndex != undefined && objData.rowIndex != '') ? objData.rowIndex : '';
    } catch (e) { }

    //objData.fieldName = (objData.fieldName == null )  
    try {
        var sActionName = "", sParamsActionName = "";
        var isAction = true;
        // info('arrActionQuery.length ---> ' + arrActionQuery.length);
        TiAPIinfo('arrActionQuery.length ---> ' + arrActionQuery.length);
        PageLoadinginfo('arrActionQuery.length ---> ' + arrActionQuery.length);

        //newAdd ----
        if (tempPAiCnt == undefined) {
            tempPAi = 0;
            isExecute = false;
        }
        else {
            tempPAi = parseInt(tempPAiCnt);
        }

        for (var i = tempPAi ; i < arrActionQuery.length; i++) {
            if (isExecute == true) {
                i = arrActionQuery.length + 1;
                return;
            }
            tempPAi = i;

            // for (var i = 0; i < arrActionQuery.length; i++) {

            isAction = true;
            sActionName = arrActionQuery[i].fieldName + "" + arrActionQuery[i].ActionName;
            sParamsActionName = objData.fieldName + "" + sActionEvent;

            currentScreenName = currentScreenName == undefined ? _screenName : currentScreenName;
            if (currentScreenName == "ItemPromotionForm" || currentScreenName == "InvoicePromotionForm") {
                if (arrActionQuery[i].ScreenName == "ItemPromotionForm_Offer" || arrActionQuery[i].ScreenName == "ItemPromotionForm_Appliesto" || arrActionQuery[i].ScreenName == "ItemPromotionForm_Condition" || arrActionQuery[i].ScreenName == "InvoicePromotionForm_Category" || arrActionQuery[i].ScreenName == "InvoicePromotionForm_Offer" || arrActionQuery[i].ScreenName == "InvoicePromotionForm_Item" || arrActionQuery[i].ScreenName == "InvoicePromotionForm_Appliesto") {
                    if (arrActionQuery[i].ScreenName != CurrentScreen_TabScreen_Name) {
                        isAction = false
                    }
                }
            }


            // info(sActionName.toUpperCase() + ' == ' + sParamsActionName.toUpperCase());
            TiAPIinfo(sActionName.toUpperCase() + ' == ' + sParamsActionName.toUpperCase());
            //  PageLoadinginfo(sActionName.toUpperCase() + ' == ' + sParamsActionName.toUpperCase());

            if (sActionName.toUpperCase() == sParamsActionName.toUpperCase() && isAction == true) {
                //objData.fieldName + "" + sActionEvent
                //  info('arrActionQuery[i] --> ' + JSON.stringify(arrActionQuery[i]));

                TiAPIinfo('arrActionQuery[i] --> ' + JSON.stringify(arrActionQuery[i]));
                PageLoadinginfo('arrActionQuery[i] If--> ' + JSON.stringify(arrActionQuery[i]));

                /*
                 * ACTION
                 * 
                 * EXECUTE
                 * NEXT
                 * BACK
                 * ALERT
                 * QRCODE
                 * VALIDATE
                 * FORM
                 * 
                 * 25 OCT 2016
                 * POST
                 * GET
                 *  
                 */

                //_obj.Type = 'ALERT';
                // info('arrActionQuery[i].ActionIndex --> ' + arrActionQuery[i].ActionIndex + ' : objData.value --> ' + objData.value);
                TiAPIinfo('arrActionQuery[i].ActionIndex --> ' + arrActionQuery[i].ActionIndex + ' : objData.value --> ' + objData.value);

                var bFlag = true;
                if (objData.Type == 'ALERT') {
                    if (arrActionQuery[i].ActionIndex != objData.value) {
                        bFlag = false;
                    }
                }
                //info('bFlag ---> ' + bFlag);
                TiAPIinfo('bFlag ---> ' + bFlag);
                if (bFlag == true) {
                    if (arrActionQuery[i].ActionType.toUpperCase() == "EXECUTE") {
                        handleFieldAction(CurrentScreen_TabScreen_Name, objData.fieldName, arrActionQuery[i].Action);
                    }
                    else if (arrActionQuery[i].ActionType.toUpperCase() == "REPORT") {

                        //
                        var fieldControl = '';
                        if (_objArray.arrForm != undefined) {
                            for (var j = 0; j < _objArray.arrForm.length; j++) {
                                fieldControl = _objArray.arrForm[j].FieldControl;
                                id = _objArray.arrForm[j].DataMember;
                                if (fieldControl != "LISTVIEW" && id != "") {
                                    textvalue = fieldControl == "LABEL" ? $('#' + id).val() : $('#' + id).val();
                                    FormView[id] = textvalue;
                                }
                            }
                        }
                        //
                        currentScreenName = currentScreenName == undefined ? _screenName : currentScreenName;
                        var scrName = currentScreenName + "_Init_Report";
                        //var qry = getQueryConfigByScreenName(scrName);//ARRAYOPERATION
                        var qry = getString['QueryConfig_' + scrName];
                        qry += ' ' + getString['QueryConfig_' + scrName + '_GroupText'];
                        qry += ' ' + getString['QueryConfig_' + scrName + '_OrderText'];
                        qry = formatQueryString(qry, scrName);//ScreenView

                        scrName = currentScreenName + "_ReportName";
                        var qry1 = getString['QueryConfig_' + scrName];
                        qry1 += ' ' + getString['QueryConfig_' + scrName + '_GroupText'];
                        qry1 += ' ' + getString['QueryConfig_' + scrName + '_OrderText'];
                        qry1 = formatQueryString(qry1, scrName);//ScreenView

                        scrName = currentScreenName + "_Load_Report";
                        var qry2 = getString['QueryConfig_' + scrName];
                        qry2 += ' ' + getString['QueryConfig_' + scrName + '_GroupText'];
                        qry2 += ' ' + getString['QueryConfig_' + scrName + '_OrderText'];
                        qry2 = formatQueryString(qry2, scrName);//ScreenView
                        //debugger;

                        // NORMAL SITE
                        window.open(url_ReportsView1 + "?InitReport=" + qry + "&ReportName=" + qry1 + "&LoadReport=" + ReplaceSpecialCharacter(JSON.stringify(qry2)));
                        //// MOBILE SITE
                        //window.open(url_ReportsView1 + "?InitReport=" + qry + "&ReportName=" + qry1 + "&LoadReport=" + ReplaceSpecialCharacter(JSON.stringify(qry2)), '_self');


                    }
                    else if (arrActionQuery[i].ActionType.toUpperCase() == "NEWREPORT") {

                        //
                        var fieldControl = '';
                        if (_objArray.arrForm != undefined) {
                            for (var j = 0; j < _objArray.arrForm.length; j++) {
                                fieldControl = _objArray.arrForm[j].FieldControl;
                                id = _objArray.arrForm[j].DataMember;
                                if (fieldControl != "LISTVIEW" && id != "") {
                                    textvalue = fieldControl == "LABEL" ? $('#' + id).val() : $('#' + id).val();
                                    FormView[id] = textvalue;
                                }
                            }
                        }
                        //
                        var currentScreenName = arrActionQuery[i].Action;
                        var scrName = currentScreenName + "_Init_Report";
                        //var qry = getQueryConfigByScreenName(scrName);//ARRAYOPERATION
                        var qry = getString['QueryConfig_' + scrName];
                        qry += ' ' + getString['QueryConfig_' + scrName + '_GroupText'];
                        qry += ' ' + getString['QueryConfig_' + scrName + '_OrderText'];
                        qry = formatQueryString(qry, scrName);//ScreenView

                        scrName = currentScreenName + "_ReportName";
                        var qry1 = getString['QueryConfig_' + scrName];
                        qry1 += ' ' + getString['QueryConfig_' + scrName + '_GroupText'];
                        qry1 += ' ' + getString['QueryConfig_' + scrName + '_OrderText'];
                        qry1 = formatQueryString(qry1, scrName);//ScreenView

                        scrName = currentScreenName + "_Load_Report";
                        var qry2 = getString['QueryConfig_' + scrName];
                        qry2 += ' ' + getString['QueryConfig_' + scrName + '_GroupText'];
                        qry2 += ' ' + getString['QueryConfig_' + scrName + '_OrderText'];
                        qry2 = formatQueryString(qry2, scrName);//ScreenView
                        //window.location = url_ReportsView + "?InitReport=" + qry + "&ReportName=" + qry1 + "&LoadReport=" + qry2;//single parameter
                        window.location = url_ReportsView1 + "?InitReport=" + qry + "&ReportName=" + qry1 + "&LoadReport=" + ReplaceSpecialCharacter(JSON.stringify(qry2));//single parameter

                    }
                    else if (arrActionQuery[i].ActionType.toUpperCase() == "RUNEXE") {
                        var actionPlan = arrActionQuery[i].Action;
                        // actionPlan = "E:\\rept\\Gopal\\2019\\dec\\19.12.2019\\Debug\\SyncByInstance.exe";
                        if (actionPlan != "") {
                            $.ajax({
                                type: 'POST',
                                url: url_RunexeExecute,
                                data: { ExePath: actionPlan },
                                dataType: 'text',
                                async: false,
                                success: function (data) {
                                    ;
                                }
                            });
                        }
                    }
                    else if (arrActionQuery[i].ActionType.toUpperCase() == "JAVASCRIPT") {
                        var actionPlan = arrActionQuery[i].Action; //functionName
                        var actionValue = arrActionQuery[i].ActionValue; //query (parameter) 
                        actionValue = formatQueryString(actionValue, scrName);//ScreenView
                        execute(actionValue); //--call to queryConfig get query text
                        var parameter = '';
                        $.each(executeQry[0], function (id, value) {
                            if (parameter != '') {
                                // parameter = parameter + "@";
                                parameter = parameter + ",";
                            }
                            parameter = parameter + safeSQL(value);
                        });

                        eval("result = " + actionPlan + '("' + parameter + '");');
                        //eval("result = " + actionPlan + "(" + parameter + ");");
                        //  eval('result = ' + actionPlan + '(' + parameter + ');');
                    }
                    else if (arrActionQuery[i].ActionType.toUpperCase() == "NEXT") {
                        Ti.App.ARRAYOPERATION.checkWorkFlow();
                    } else if (arrActionQuery[i].ActionType.toUpperCase() == "BACK") {
                        //alert('ActionType BACK');
                        //Ti.App.ARRAYOPERATION.checkWorkFlow();
                        LoadingImageClose();
                        var screenName = arrActionQuery[i].ScreenName;
                        //   if (arrActionQuery[i].ScreenName != "StockTransferForm") {

                        //var actionValue = screenName.replace("Form", "List");
                        //var fieldName = "sm" + screenName.replace("Form", "");
                        var actionValue = (screenName.split('NewForm').length == 2) ? screenName.replace("NewForm", "List") : screenName.replace("Form", "List");
                        var fieldName = (screenName.split('NewForm').length == 2) ? "sm" + screenName.replace("NewForm", "") : "sm" + screenName.replace("Form", "");

                        //  window.location = "/Form/FormViewList" + "?ScreenName=" + actionValue + "&FieldName=" + fieldName;
                        //window.location = url_FormViewList1 + "?ScreenName=" + actionValue + "&FieldName=" + fieldName; 
                        //todo
                        window.location = url_FormClickEvent + "?ScreenName=" + actionValue + "&FieldName=" + fieldName;
                        //todo
                        //  NewWindowOpen('', actionValue);
                        //UI.closeWindow();
                        //  }
                    } else if (arrActionQuery[i].ActionType.toUpperCase() == "ALERT") {
                        var sActionVal = arrActionQuery[i].ActionValue;
                        var arrBtn = sActionVal == null ? "" : sActionVal.split(",");
                        var _obj = {};
                        _obj.Type = "ALERT";
                        //  _obj.controller = Controller.prototype;
                        _obj.fieldName = objData.fieldName;
                        //COMMON.showAlert(objData.fieldName, arrBtn, _obj);
                        showAlert(arrActionQuery[i].Action, arrBtn, _obj);
                        isDynamicValidate = false;
                        // return false;
                    }
                    else if (arrActionQuery[i].ActionType.toUpperCase() == "EXECUTEMAP") {
                        //  var sScreenName = "MapPickerForm_MapPicker";
                        var sScreenName = arrActionQuery[i].Action;
                        if (arrActionQuery[i].Action.indexOf("_Check_DrawCircle") > -1) {
                            if (sScreenName.toString().toLowerCase() == "customerroutingctrform_check_drawcircle") {
                                sScreenName = 'CustomerRoutingCTRForm_MAPMARKER_DrawCircle';
                            }
                            else if (sScreenName.toString().toLowerCase() != "customerroutingctrform_check_drawcircle") {
                                sScreenName = 'MapPickerForm_MAPMARKER_DrawCircle';
                            }
                        }

                        var qry = getString['QueryConfig_' + sScreenName];
                        qry += ' ' + getString['QueryConfig_' + sScreenName + '_GroupText'];
                        qry += ' ' + getString['QueryConfig_' + sScreenName + '_OrderText'];
                        // var qry = "SELECT 'green' as Color,'14.8474867' as Latitude,'120.8238718' as Longitude , 'Test1' as Remarks,'1' as MarkerNo, 'AAA' as MarkerName Union SELECT 'red' as Color,'14.2952706' as Latitude,'120.9176947' as Longitude , 'Test2' as Remarks,'2' as MarkerNo, 'bbb' as MarkerName Union SELECT 'yellow' as Color,'14.9692139' as Latitude,'120.9188296' as Longitude , 'Test3' as Remarks,'3' as MarkerNo, 'ccc' as MarkerName  Union SELECT 'green' as Color,'13.936684' as Latitude,'121.1564816' as Longitude , 'Test4' as Remarks,'4' as MarkerNo, 'ddd' as MarkerName Union SELECT 'red' as Color,'14.5860298' as Latitude,'121.0641453' as Longitude , 'Test5' as Remarks,'5' as MarkerNo, 'eee' as MarkerName Union SELECT 'yellow' as Color,'14.9924004' as Latitude,'120.6326731' as Longitude , 'Test6' as Remarks,'6' as MarkerNo, 'fff' as MarkerName Union SELECT 'green' as Color,'1.2851138' as Latitude,'103.8113694' as Longitude , 'Test7' as Remarks,'7' as MarkerNo, 'ggg' as MarkerName ";
                        qry = formatQueryString(qry, sScreenName);
                        execute(qry);
                        if (arrActionQuery[i].Action.indexOf("_Check_DrawCircle") > -1) {
                            MapMarkerDrawCircle();
                        }
                        else {
                            SetMapMarker();
                        }
                        //MapPickerForm_MAPMARKER_DrawCircle
                    }
                    else if (arrActionQuery[i].ActionType.toUpperCase() == "DOWNLOADZIP") {
                        var sActionVal = arrActionQuery[i].ActionValue;
                        var sScreenName = arrActionQuery[i].Action;
                        var qry = getString['QueryConfig_' + sScreenName];
                        qry += ' ' + getString['QueryConfig_' + sScreenName + '_GroupText'];
                        qry += ' ' + getString['QueryConfig_' + sScreenName + '_OrderText'];
                        qry = formatQueryString(qry, sScreenName);

                        qry = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(qry), encryptkey, { keySize: 128 / 8, iv: encryptiv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
                        var params = "{'query':'" + qry + "'}";
                        //  var params = "{'query':'" + qry + "','fName:'" + sActionVal + "'}";
                        $.ajax({
                            type: "POST",
                            // url: "/ActionConfig/DOWNLOADZIP",
                            url: url_DOWNLOADZIP,
                            data: params,
                            contentType: "application/json;charset=utf-8",
                            // dataType: "json",
                            async: false,
                            success: function (results) {
                                if (results != "")
                                    window.location.href = results;
                                else {
                                    //alert("File not availacle");

                                    var btns = {};
                                    btns["Ok"] = function (e) {
                                        $(this).dialog("close");
                                    }
                                    $('<div></div>').appendTo('body')
                                                       .html('<div><h6>No files(s) available</h6></div>').dialog({
                                                           modal: true, title: "zip file(s) Download", zIndex: 10000, autoOpen: true,
                                                           width: '20%', resizable: false,
                                                           buttons: btns
                                                       });

                                }
                            },
                            error: function (results, q, a) {
                                alert("test : : " + results);
                            }

                        });

                        //execute(qry);
                        executeQry;
                        //executeReader(sActionVal);
                    }
                    else if (arrActionQuery[i].ActionType.toUpperCase() == "EXPORTDATA") {
                        var sActionVal = arrActionQuery[i].ActionValue;
                        // var tablename = FormView.LstExportData.TableName;
                        // var tablename = FormView.LstExportData.AliasName;
                        executeReader(sActionVal);
                    }
                    else if (arrActionQuery[i].ActionType.toUpperCase() == "FOCUS") {
                        //Ti.API.info('arrActionQuery[i].ActionValue '+arrActionQuery[i].ActionValue);
                        //return "";//testing
                        //var field = Ti.App.ARRAYOPERATION.getFormComponent(arrActionQuery[i].ActionValue);
                        var field = getFormComponent(arrActionQuery[i].ActionValue);
                        TiAPIinfo('field ' + field);
                        if (field != null && field != undefined && field != '') {
                            $("#" + field).focus();
                            // TiAPIinfo('field ' + field);
                            //field.focus();
                            //try {
                            //    if (Ti.Platform.name == 'android') {
                            //        field.softKeyboardOnFocus = Titanium.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS;
                            //    }
                            //} catch (e) { }
                        }

                    }
                    else if (arrActionQuery[i].ActionType.toUpperCase() == "LOOKUP") {
                        if (arrActionQuery[i].ActionName == "formLookUpClicked") {

                            //var htm = '<div id="dialog" title="view" style="overflow: hidden;">';
                            //htm = '<div class="tableDiv" style="width: 100%; overflow-x: auto; height: auto; overflow-y: auto;">';
                            var htm = '<table id="table_' + objData.fieldName + '" class="table table-striped table-bordered tableId">';
                            htm += '<thead id="ListPopUpHeadDivId">';
                            htm += '</thead>';
                            htm += '<tbody id="ListPopUpBodyDivId">';
                            htm += '</tbody>';
                            htm += '<tfoot id="ListPopUpfootDivId">';
                            htm += '</tfoot>';
                            htm += '</table>';
                            //htm += '</div>';
                            //htm += '</div>';

                            $('#popupdialog').html(htm);

                            FormListConfigHeader("ListPopUpHeadDivId", "ListPopUpBodyDivId", "ListPopUpfootDivId", currentScreenName, objData.fieldName, url_GetLookUpListConfig, 'LOOKUP');
                            //  $('#dialog').dialog({ title: "" + currentScreenName + " Details" }).dialog('open');
                            //$('#popupdialog').dialog();
                            $('#popupdialog').dialog({
                                //autoOpen: false,
                                width: "50%",
                                //resizable: false,
                                title: 'Details',
                                modal: true,
                                //closeOnEscape: true,
                            });


                        }
                        else if (arrActionQuery[i].ActionName == "rowItemClicked") {

                            var sScreenName = currentScreenName + "_FORM_LOOKUP_Update" + FieldName;
                            var qry = getString['QueryConfig_' + sScreenName + '']
                            qry += ' ' + getString['QueryConfig_' + sScreenName + '_GroupText'];
                            qry += ' ' + getString['QueryConfig_' + sScreenName + '_OrderText'];
                            qry = formatQueryString(qry, sScreenName);//ScreenView
                        }
                    }
                    else if (arrActionQuery[i].ActionType.toUpperCase() == "POPUP") {
                        //var sActionVal = arrActionQuery[i].ActionValue;
                        var arrBtn = ["OK", "CANCEL"];//sActionVal.split(",");
                        var _obj = {};
                        _obj.Type = "POPUP";
                        _obj.Action = arrActionQuery[i].Action;
                        _obj.ActionValue = arrActionQuery[i].ActionValue;
                        _obj.controller = Controller.prototype;
                        _obj.fieldName = objData.fieldName;
                        //COMMON.showAlert(objData.fieldName, arrBtn, _obj);
                        Ti.API.info('Before POPUP WINDOW ---> ' + _obj);
                        //new PopUpField().show(objData.fieldName, arrBtn, _obj);
                        new PopUpField().show(arrActionQuery[i].Action, arrBtn, _obj);
                        return false;
                    } else if (arrActionQuery[i].ActionType.toUpperCase() == "DROPDOWN") {
                        //var sActionVal = arrActionQuery[i].ActionValue;
                        //var _obj = {};
                        //_obj.Type = "POPUP";
                        //_obj.Action = arrActionQuery[i].Action;
                        //_obj.ActionValue = arrActionQuery[i].ActionValue;
                        //_obj.controller = Controller.prototype;
                        //_obj.fieldName = objData.fieldName;
                        //COMMON.showAlert(objData.fieldName, arrBtn, _obj);
                        TiAPIinfo('Before POPUP WINDOW ---> ' + _obj);
                        //new PopUpField().show(objData.fieldName, arrBtn, _obj);
                        //new PopUpField().show(arrActionQuery[i].Action, arrBtn, _obj);

                        var sField = null, sFieldName = '';
                        var ActionValue = arrActionQuery[i].ActionValue;
                        if (ActionValue.indexOf('FormView.') > -1) {
                            var arrFieldName = ActionValue.split('FormView.');
                            sFieldName = arrFieldName[1];
                            sField = Ti.App.ARRAYOPERATION.getFormComponent(arrFieldName[1]);
                        }
                        if (sField != null && sField != undefined && sField != '') {

                            var qry = Ti.App.ARRAYOPERATION.getQueryConfigByScreenName(arrActionQuery[i].Action);
                            qry = UI.formatQueryString(qry, Ti.App.currentScreenName);
                            ComboBoxData = Ti.App.ARRAYOPERATION.createComboBoxData(qry);

                            var sAppName = Ti.App.ARRAYOPERATION.getSystemValue('AppName');
                            sAppName = (sAppName == '' || sAppName == null || sAppName == undefined) ? 'Simplr Solutions' : sAppName;
                            //title, controller, ComboBoxItems, button, screenName, fieldName, searchType, dataMember
                            //new ComboBoxForm().show(sAppName, sField, ComboBoxData, Controller.prototype, Ti.App.currentScreenName, sFieldName, '', sFieldName);
                            new ComboBoxForm().show(sAppName, Controller.prototype, ComboBoxData, sField, Ti.App.currentScreenName, sFieldName, '', sFieldName);
                        }
                        return false;
                    }

                    else if (arrActionQuery[i].ActionType.toUpperCase() == "QRCODE") {
                        try {
                            var sActionValue = arrActionQuery[i].ActionValue;


                            var Barcode = require('ti.barcode');

                            Barcode.addEventListener('success', function (e) {
                                //alert('scan data ' + e.result);
                                Ti.API.info('scan data' + e.result);
                                sBarcodeValue = e.result;
                                try {
                                    if (sBarcodeValue != null && sBarcodeValue != undefined && sBarcodeValue != '') {


                                        //USED FOR GOODPACK
                                        try {
                                            if (Ti.App.bBarcodeLength != '') {
                                                sBarcodeValue = sBarcodeValue.toString();
                                                if (sBarcodeValue.length > Ti.App.bBarcodeLength) {
                                                    COMMON.showAlert("Invalid Barcode!", ['OK'], null);
                                                    return false;
                                                }
                                            }
                                        } catch (e) { }

                                        if (sActionValue.indexOf('FormView.') > -1) {
                                            var arrActionValue = sActionValue.split('FormView.');
                                            //var frmField = Ti.App.ARRAYOPERATION.getFormComponent(arrActionValue[1]);
                                            TiAPIinfo('frmField ---> ' + frmField);
                                            //frmField.value = data.barcode;
                                            Ti.App.ARRAYOPERATION.setFormComponentValue(arrActionValue[1], sBarcodeValue);

                                        } else if (sActionValue.indexOf('ListView.') > -1) {
                                            if (Ti.App.ARRAYOPERATION.getSelectedRowIndex() > -1) {
                                                var arrActionValue = sActionValue.split('ListView.');
                                                Ti.App.ARRAYOPERATION.updateColumnData(0, Ti.App.ARRAYOPERATION.getSelectedRowIndex(), arrActionValue[1], sBarcodeValue);
                                            }
                                        }

                                        Controller.prototype.handleData(sBarcodeValue);
                                    } else {
                                        COMMON.showAlert("Invalid Barcode!", ['OK'], null);
                                        return false;
                                    }
                                } catch (e) {
                                    COMMON.showAlert("Invalid Barcode!", ['OK'], null);
                                    return false;
                                }

                            });

                            Barcode.capture({});

                            /************************************************************************************************************************************************
                                                        var titaniumBarcode = require('com.mwaysolutions.barcode');
                                                        
                                                        titaniumBarcode.scan({
                                                            success:function(data) {
                                                                
                                                                Ti.API.info('data.barcode -> ' + JSON.stringify(data));
                                                                
                                                                Ti.API.info('data.barcode -> ' + data.barcode);
                                                                
                                                                //alert('data.barcode -> ' + JSON.stringify(data));
                                                                
                                                                try{
                                                                    if(data && data.barcode) {
                                                                        if(sActionValue.indexOf('FormView.') > -1){
                                                                            var arrActionValue = sActionValue.split('FormView.');
                                                                            //var frmField = Ti.App.ARRAYOPERATION.getFormComponent(arrActionValue[1]);
                                                                            TiAPIinfo('frmField ---> ' + frmField);
                                                                            //frmField.value = data.barcode;
                                                                            Ti.App.ARRAYOPERATION.setFormComponentValue(arrActionValue[1], data.barcode);
                                                                                
                                                                        }else if(sActionValue.indexOf('ListView.') > -1){
                                                                            if(Ti.App.ARRAYOPERATION.getSelectedRowIndex() > -1){
                                                                                var arrActionValue = sActionValue.split('ListView.');
                                                                                Ti.App.ARRAYOPERATION.updateColumnData(0, Ti.App.ARRAYOPERATION.getSelectedRowIndex(), arrActionValue[1], data.barcode);
                                                                            }
                                                                        }
                                                                        
                                                                        //alert("Barcode =>"+data.barcode);
                                                                        Controller.prototype.handleData(data.barcode);
                                                                    }
                                                                    else {
                                                                       //alert(JSON.stringify(data));
                                                                    }
                                                                }catch(e){
                                                                    COMMON.showAlert("Invalid Barcode!", ['OK'], null);
                                                                    return false;	
                                                                }
                                                            },
                                                            
                                                            error:function(err) { 
                                                                 alert("Error!! " + err); 
                                                            },
                                                            
                                                            cancel:function() { 
                                                                //alert("cancel"); 
                                                            }
                                                        });
                            /************************************************************************************************************************************************/
                        } catch (e) { }

                    } else if (arrActionQuery[i].ActionType.toUpperCase() == "VALIDATE") {

                        //

                        var qry = getQueryConfigByScreenName(arrActionQuery[i].Action);//ArrayOperations

                        //  var db = new dbConnection().createDataBaseConnection();
                        var BaseQty = 0;
                        var dbDataRows = "";

                        if (qry != null && qry != undefined && qry != '') {
                            //
                            TiAPIinfo('ValidateQry -> ' + qry);
                            /*ACTIONTYPE : VALIDATE
                            select true as response, ActionCode (ActionCode may be USERDEFINED)
                                PerformAction : function(ActionCode, {}){
                            select false as response
                            
                            
                            08-21 16:52:57.007: I/TiAPI(29587):  ValidateQry -> Select  CASE WHEN '00000307' = 'SR2' THEN 1 Else 0 END as Response
                            08-21 16:52:57.007: I/TiAPI(29587):  sActionEvent - undefined : objData - {"value":"BtnC","fieldName":"BtnC"}
                            
                            slect custno from customer where custno ={custno}
                            slect custno from customer where custno ='0001'
                            */
                            qry = formatQueryString(qry, currentScreenName);//screenView

                            //     dbDataRows = db.execute(qry);
                            execute(qry);
                            dbDataRows = executeQry;

                            if (dbDataRows.length > 0) {
                                // if (dbDataRows.isValidRow()) {
                                if (dbDataRows[0].response == true || dbDataRows[0].response == 1 || dbDataRows[0].Response == true || dbDataRows[0].Response == 1 || dbDataRows[0].RESPONSE == true || dbDataRows[0].RESPONSE == 1) {
                                    //  if (dbDataRows.fieldByName('response') == true || dbDataRows.fieldByName('response') == 1) {
                                    //if(dbDataRows.fieldByName('ActionValue') != ''){
                                    //Controller.prototype.PerformAction(dbDataRows.fieldByName('ActionValue'), {});
                                    //}	
                                    if (arrActionQuery[i].ActionValue != '') {
                                        // dbDataRows.close();
                                        //db.close();
                                        var _obj = {};
                                        _obj.value = arrActionQuery[i].fieldName;
                                        _obj.fieldName = arrActionQuery[i].fieldName;
                                        PerformAction(arrActionQuery[i].ActionValue, _obj);
                                        // Controller.prototype.PerformAction(arrActionQuery[i].ActionValue, _obj);
                                    }
                                } else if (dbDataRows[0].response == false || dbDataRows[0].response == 0 || dbDataRows[0].Response == false || dbDataRows[0].Response == 0 || dbDataRows[0].RESPONSE == false || dbDataRows[0].RESPONSE == 0) {
                                    //} else if (dbDataRows.fieldByName('response') == false || dbDataRows.fieldByName('response') == 0) {
                                    if (arrActionQuery[i].ActionFailedValue != '') {

                                        if (isListLookUpClicked == true) {
                                            lookUpPopUpClose();
                                        }
                                        //  dbDataRows.close();
                                        // db.close();
                                        var _obj = {};
                                        _obj.value = arrActionQuery[i].fieldName;
                                        _obj.fieldName = arrActionQuery[i].fieldName;
                                        PerformAction(arrActionQuery[i].ActionFailedValue, _obj);
                                        //Controller.prototype.PerformAction(arrActionQuery[i].ActionFailedValue, _obj);
                                    }
                                    else {
                                        // COMMENTED 12.11.2020 
                                        if (isListLookUpClicked == true) {
                                            lookUpPopUpClose();
                                        }
                                    }
                                }
                            }
                            //dbDataRows.close();
                        }
                        //db.close();

                    }
                    else if (arrActionQuery[i].ActionType.toUpperCase() == "VALIDATELIST") {
                        if (arrActionQuery[i].Action.indexOf("_LIST_Check_") > -1 || arrActionQuery[i].Action.indexOf("_LIST_Check_") > -1) {//Execute Query FORMCONFIG _LIST_Check_
                            var tmpScreenName = arrActionQuery[i].Action;
                            //  dynamicFieldName = dynamicFieldName == "" ? tmpScreenName.split('_')[tmpScreenName.split('_').length - 2] : dynamicFieldName;
                            dynamicFieldName = dynamicFieldName == "" ? tmpScreenName.split('_LIST_Check_')[1].split('_')[0] : dynamicFieldName;
                            //  var fieldName = listViewName;
                            var fieldName = dynamicFieldName;

                            var fieldIds = [];

                            var fieldLst = tmpScreenName.split('_LIST_Check_')[1].split('_');
                            ifcase = "";
                            var query = "";
                            for (var q = 1; q < fieldLst.length; q++) {
                                fieldIds[(q - 1)] = fieldLst[q];
                            }
                            //return;
                            var tmpScrName = tmpScreenName.split('_LIST_Check_')[0];
                            var tblId = "ListBodyDivId_" + tmpScrName + "_" + dynamicFieldName;
                            var tblbody = document.getElementById("ListBodyDivId_" + tmpScrName + "_" + dynamicFieldName);
                            //var tblId = "ListBodyDivId_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName;
                            //var tblbody = document.getElementById("ListBodyDivId_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName);
                            var ttbodyId = tblId;
                            var _data = tblbody.rows;
                            var isSuccess = true;
                            var listViewValues = FormView[fieldName];
                            var multiValidateCnt = 0;
                            if (_data.length > 0) {
                                for (var ctr = 0 ; ctr < _data.length - 1; ctr++) {
                                    if (tblbody.childNodes[ctr].childElementCount == 0);
                                    else {
                                        multiValidateCnt = 0;
                                        setListValue("", fieldName, ctr, ttbodyId);
                                        qry = formatQueryString(query, '');
                                        for (var f = 0; f < _data.length - 1; f++) {
                                            if (tblbody.childNodes[f].childElementCount == 0);
                                            else {
                                                multiValidateCnt = 0;
                                                if (ctr != f) {
                                                    SubSetListValue("", "ListViewSub", f, ttbodyId);
                                                    for (var j = 0; j < fieldIds.length; j++) {

                                                        // if (FormView.LstUCB[fieldIds[j]] == FormView["ListViewSub"][fieldIds[j]]) {
                                                        if (FormView[fieldName][fieldIds[j]] == FormView["ListViewSub"][fieldIds[j]]) {
                                                            multiValidateCnt++;
                                                        }
                                                    }
                                                    var response = true;
                                                    if (multiValidateCnt == fieldIds.length)
                                                        response = false;

                                                    if (response == true) {
                                                        isSuccess = true;
                                                    } else if (response == false) {
                                                        isSuccess = false;
                                                        if (arrActionQuery[i].ActionFailedValue != '') {
                                                            var _obj = {};
                                                            _obj.value = arrActionQuery[i].fieldName;
                                                            _obj.fieldName = arrActionQuery[i].fieldName;
                                                            PerformAction(arrActionQuery[i].ActionFailedValue, _obj);
                                                        }
                                                        ctr = tblbody.rows.length + 1;
                                                        f = tblbody.rows.length + 1;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            //return;
                            FormView[listViewName] = listViewValues;

                            ///
                            if (isSuccess == true) {
                                if (arrActionQuery[i].ActionValue != '') {
                                    isValidateList = true;
                                    // dynamicNewRowAdd();
                                    // dbDataRows.close();
                                    //db.close();
                                    var _obj = {};
                                    _obj.value = arrActionQuery[i].fieldName;
                                    _obj.fieldName = arrActionQuery[i].fieldName;
                                    PerformAction(arrActionQuery[i].ActionValue, _obj);
                                    // Controller.prototype.PerformAction(arrActionQuery[i].ActionValue, _obj);
                                }
                            }
                            else {
                                lookUpPopUpClose();
                            }


                            ///////////////////////////////
                        }
                        else if (arrActionQuery[i].Action.indexOf("_LIST_Contains_") > -1 || arrActionQuery[i].Action.indexOf("_LIST_Contains_") > -1) {//Execute Query FORMCONFIG _LIST_Check_
                            var tmpScreenName = arrActionQuery[i].Action;
                            dynamicFieldName = dynamicFieldName == "" ? tmpScreenName.split('_LIST_Contains_')[1].split('_')[0] : dynamicFieldName;
                            //  var fieldName = dynamicFieldName;

                            //var fieldLst = tmpScreenName.split('_LIST_Contains_')[1].split('_');
                            //var fieldIds = tmpScreenName.split('_LIST_Contains_')[1].split('_')[1];

                            var arrTblFieldName = tmpScreenName.split("_LIST_Contains_");
                            var scrName = arrTblFieldName[0];

                            //  dynamicFieldName = dynamicFieldName == "" ? tmpScreenName.split('_')[tmpScreenName.split('_').length - 2] : dynamicFieldName;
                            var tblbody = document.getElementById("ListBodyDivId_" + scrName + "_" + dynamicFieldName);
                            var _data = tblbody.rows;
                            var tdType = '';
                            var listConfig = ListHeaderList['ListConfig_' + scrName + '_' + dynamicFieldName];
                            listId = tmpScreenName.split('_')[tmpScreenName.split('_').length - 1];
                            var allOfList = "''";
                            if (_data.length > 0) {
                                dFormListRow = _data;

                                var _dataLen = _data.length;
                                if (_isdynamic == true)
                                    _dataLen = _data.length - 1;

                                for (var ctr = 0 ; ctr < _dataLen; ctr++) {
                                    if (tblbody.rows[ctr].cells.length == 0);
                                    else {
                                        tdType = tblbody.rows[ctr] == undefined ? "" : tblbody.rows[ctr].cells.length == 0 ? "" : getTableRowTDType(tblbody.rows[ctr].cells[listId].innerHTML);
                                        if (tdType == "text")
                                            allOfList = allOfList == "" ? safeSQL(tblbody.rows[ctr].cells[listId].children[listId].value) : allOfList + "," + safeSQL(tblbody.rows[ctr].cells[listId].children[listId].value);
                                        else
                                            allOfList = allOfList == "" ? safeSQL(tblbody.rows[ctr].cells[listId].innerText) : allOfList + "," + safeSQL(tblbody.rows[ctr].cells[listId].innerText);
                                    }
                                }
                            }
                            AllOfList = allOfList;
                            var sScreenName = arrActionQuery[i].Action;
                            qry = getString['QueryConfig_' + sScreenName];
                            qry += ' ' + getString['QueryConfig_' + sScreenName + '_GroupText'];
                            qry += ' ' + getString['QueryConfig_' + sScreenName + '_OrderText'];
                            qry = formatQueryString(qry, sScreenName);
                            execute(qry);
                            dbDataRows = executeQry;

                            if (dbDataRows != null && dbDataRows.length > 0) {
                                if (dbDataRows[0].response == true || dbDataRows[0].response == 1 || dbDataRows[0].Response == true || dbDataRows[0].Response == 1 || dbDataRows[0].RESPONSE == true || dbDataRows[0].RESPONSE == 1) {
                                    isSuccess = true;
                                    if (arrActionQuery[i].ActionValue != '') {
                                        isValidateList = true;
                                        var _obj = {};
                                        _obj.value = arrActionQuery[i].fieldName;
                                        _obj.fieldName = arrActionQuery[i].fieldName;
                                        PerformAction(arrActionQuery[i].ActionValue, _obj);
                                    }
                                } else if (dbDataRows[0].response == false || dbDataRows[0].response == 0 || dbDataRows[0].Response == false || dbDataRows[0].Response == 0 || dbDataRows[0].RESPONSE == false || dbDataRows[0].RESPONSE == 0) {
                                    isSuccess = false;
                                    if (arrActionQuery[i].ActionFailedValue != '') {
                                        var _obj = {};
                                        _obj.value = arrActionQuery[i].fieldName;
                                        _obj.fieldName = arrActionQuery[i].fieldName;
                                        PerformAction(arrActionQuery[i].ActionFailedValue, _obj);
                                    }
                                }
                            }
                        }
                        else if (arrActionQuery[i].Action.indexOf("_LIST_COUNT_") > -1 || arrActionQuery[i].Action.indexOf("_LIST_COUNT_") > -1) {//Execute Query FORMCONFIG _LIST_Check_
                            var tmpScreenName = arrActionQuery[i].Action;
                            dynamicFieldName = dynamicFieldName == "" ? tmpScreenName.split('_LIST_COUNT_')[1].split('_')[0] : dynamicFieldName;
                            var scrName = tmpScreenName.split("_LIST_COUNT_")[0];
                            var tblbody = document.getElementById("ListBodyDivId_" + scrName + "_" + dynamicFieldName);
                            var listData = tblbody.rows;
                            var listCount = 0;
                            if (listData.length > 1) {
                                for (var z = 0; z < (listData.length - 1) ; z++) {
                                    if (tblbody.rows[z].cells.length >= 1) {
                                        listCount = 1;
                                    }
                                }
                            }

                            if (listCount == 1) {
                                isSuccess = true;
                                if (arrActionQuery[i].ActionValue != '') {
                                    isValidateList = true;
                                    var _obj = {};
                                    _obj.value = arrActionQuery[i].fieldName;
                                    _obj.fieldName = arrActionQuery[i].fieldName;
                                    PerformAction(arrActionQuery[i].ActionValue, _obj);
                                }
                            } else if (listCount == 0) {
                                isSuccess = false;
                                if (arrActionQuery[i].ActionFailedValue != '') {
                                    var _obj = {};
                                    _obj.value = arrActionQuery[i].fieldName;
                                    _obj.fieldName = arrActionQuery[i].fieldName;
                                    PerformAction(arrActionQuery[i].ActionFailedValue, _obj);
                                }
                            }
                        }
                        else {

                            //var sScreenName = arrActionQuery[i].Action.split('_')[0] + "_" + arrActionQuery[i].Action.split('_')[1];
                            var sScreenName = arrActionQuery[i].Action;
                            var tblId = arrActionQuery[i].Action.split('_')[0] + "_" + arrActionQuery[i].Action.split('_')[1];
                            var listViewName = arrActionQuery[i].Action.split('_')[1];
                            //todo
                            //if (TabScreenName != '') {
                            //    tblId = arrActionQuery[i].Action;
                            //    if (arrActionQuery[i].Action.split('_').length == 3) {
                            //        listViewName = arrActionQuery[i].Action.split('_')[2];
                            //        sScreenName = arrActionQuery[i].Action.split('_')[0] + "_" + arrActionQuery[i].Action.split('_')[2];
                            //    }
                            //}
                            //  var ttbodyId = "ListBodyDivId_" + arrActionQuery[i].Action;
                            var ttbodyId = "ListBodyDivId_" + tblId; //ListBodyDivId_SalesOrderForm_Item
                            var tblbody = document.getElementById(ttbodyId);

                            if (tblbody == null) {
                                if (TabScreenName != "") {
                                    tblId = arrActionQuery[i].Action.split('_')[0] + "_" + arrActionQuery[i].Action.split('_')[1] + "_" + arrActionQuery[i].Action.split('_')[2];
                                    ttbodyId = "ListBodyDivId_" + tblId;
                                    tblbody = document.getElementById(ttbodyId);
                                    listViewName = arrActionQuery[i].Action.split('_')[2];
                                }
                            }
                            if (tblbody == null) {
                                if (arrActionQuery[i].Action.indexOf("_LIST_") > -1) {
                                    var tmpScreenName = arrActionQuery[i].Action;

                                    // COMMENTED 04.02.2021 
                                    dynamicFieldName = dynamicFieldName == "" || typeof dynamicFieldName === "undefined" ? tmpScreenName.split('_LIST_')[1].split('_')[0] : dynamicFieldName;
                                    // dynamicFieldName = dynamicFieldName == ""  ? tmpScreenName.split('_LIST_')[1].split('_')[0] : dynamicFieldName;
                                    var scrName = tmpScreenName.split("_LIST_")[0];
                                    ttbodyId = "ListBodyDivId_" + scrName + "_" + dynamicFieldName;
                                    tblbody = document.getElementById(ttbodyId);
                                    listViewName = dynamicFieldName;
                                }

                            }

                            var fieldName = listViewName;
                            var listViewValues = FormView[listViewName];
                            // isValidateList = true;
                            var isSuccess = false;
                            // COMMENTED 05.11.2020
                            //var tblrowCount = tblbody.rows.length == 1 ? 1 : tblbody.rows.length - 1;
                            var tblrowCount = 0;
                            if (!_isdynamic) {
                                tblrowCount = tblbody.rows.length;
                            }
                            else {
                                tblrowCount = tblbody.rows.length == 1 ? 1 : tblbody.rows.length - 1;
                            }

                            var deletedrows = 0;

                            for (var iIndex = 0; iIndex < tblrowCount; iIndex++) {
                                if (!tblbody.rows[iIndex].cells.length) {
                                    deletedrows += 1;
                                }
                            }


                            for (var iIndex = 0; iIndex < tblrowCount; iIndex++) {
                                // COMMENTED
                                //if ((tblbody.rows[iIndex].cells.length) || (tblrowCount == 1 && !tblbody.rows[iIndex].cells.length)
                                //    || (iIndex == 0 && !tblbody.rows[iIndex].cells.length))
                                if ((tblbody.rows[iIndex].cells.length) || (deletedrows == tblrowCount)) {
                                    //if (!tblbody.rows[iIndex].cells.length)
                                    //{
                                    //    continue;
                                    //}
                                    setListValue("", fieldName, iIndex, ttbodyId);
                                    //if (isRowDeleted)
                                    //{
                                    //    setListValue("", fieldName, iIndex, ttbodyId);
                                    //}

                                    if (isRowDeleted == false || iIndex == 0) {
                                        var test = FormView[listViewName];
                                        // Added 12.08.2020 ============
                                        FieldName = listViewName;
                                        qry = getString['QueryConfig_' + sScreenName];
                                        qry += ' ' + getString['QueryConfig_' + sScreenName + '_GroupText'];
                                        qry += ' ' + getString['QueryConfig_' + sScreenName + '_OrderText'];
                                        qry = formatQueryString(qry, sScreenName);

                                        if (arrActionQuery[i].ActionName.toLowerCase() == "autocompleteentered" && iIndex == currentRowIndex) {
                                            qry = "Select 1 as Response";
                                        }
                                        execute(qry);
                                        dbDataRows = executeQry;


                                        if (dbDataRows != null && dbDataRows.length > 0) {
                                            // if (dbDataRows.isValidRow()) {
                                            if (dbDataRows[0].response == true || dbDataRows[0].response == 1 || dbDataRows[0].Response == true || dbDataRows[0].Response == 1 || dbDataRows[0].RESPONSE == true || dbDataRows[0].RESPONSE == 1) {
                                                //  if (dbDataRows.fieldByName('response') == true || dbDataRows.fieldByName('response') == 1) {
                                                //if(dbDataRows.fieldByName('ActionValue') != ''){
                                                //Controller.prototype.PerformAction(dbDataRows.fieldByName('ActionValue'), {});
                                                //}	
                                                isSuccess = true;
                                            } else if (dbDataRows[0].response == false || dbDataRows[0].response == 0 || dbDataRows[0].Response == false || dbDataRows[0].Response == 0 || dbDataRows[0].RESPONSE == false || dbDataRows[0].RESPONSE == 0) {
                                                //} else if (dbDataRows.fieldByName('response') == false || dbDataRows.fieldByName('response') == 0) {
                                                isSuccess = false;
                                                if (arrActionQuery[i].ActionFailedValue != '') {
                                                    //  dbDataRows.close();
                                                    // db.close();
                                                    var _obj = {};
                                                    _obj.value = arrActionQuery[i].fieldName;
                                                    _obj.fieldName = arrActionQuery[i].fieldName;
                                                    PerformAction(arrActionQuery[i].ActionFailedValue, _obj);
                                                    //Controller.prototype.PerformAction(arrActionQuery[i].ActionFailedValue, _obj);
                                                }
                                                iIndex = tblbody.rows.length + 1;
                                            }
                                        }

                                    }
                                }
                                //else if (tblbody.rows[iIndex].cells.length && tblrowCount==1)
                                //{
                                //    // EMPTY GRID 
                                //}


                            }  // ROW ITERATION ====

                            FormView[listViewName] = listViewValues;

                            ///
                            if (isSuccess == true) {
                                if (arrActionQuery[i].ActionValue != '') {
                                    isValidateList = true;
                                    // dynamicNewRowAdd();
                                    // dbDataRows.close();
                                    //db.close();
                                    var _obj = {};
                                    _obj.value = arrActionQuery[i].fieldName;
                                    _obj.fieldName = arrActionQuery[i].fieldName;
                                    PerformAction(arrActionQuery[i].ActionValue, _obj);
                                    // Controller.prototype.PerformAction(arrActionQuery[i].ActionValue, _obj);
                                }
                            }
                            else {
                                lookUpPopUpClose();
                            }
                        }

                    }
                        // validate list ===================================
                    else if (arrActionQuery[i].ActionType.toUpperCase() == "FORMold") {
                        //arrActionQuery;
                        if (arrActionQuery[i].ActionName == "rowItemClicked") {
                            var query = "select QueryText + ' ' + GroupText + ' ' + OrderText from Queryconfig where screenname ='" + arrActionQuery[i].ActionValue + "_FORM'";
                            getExecute(query);
                            qry = executeQry;
                            var sScreenName = arrActionQuery[i].Action;
                            qry = formatQueryString(qry, sScreenName);
                            if (qry != "")
                                window.location = url_FormViewList1 + "?ScreenName=" + arrActionQuery[i].ActionValue + "&FieldName=" + FieldName + "&FormView=" + "" + "&query=" + ReplaceSpecialCharacter(qry);//single parameter
                            //NewWindowOpen(qry, arrActionQuery[i].ActionValue);

                            // window.location = url_FormViewList + "?ScreenName=" + arrActionQuery[i].ActionValue + "&FieldName=" + FieldName + "&FormView=" + ReplaceSpecialCharacter(JSON.stringify(FormView)) + "&query=" + ReplaceSpecialCharacter(qry);//single parameter
                            // window.location = "/Form/FormViewList" + "?ScreenName=" + arrActionQuery[i].ActionValue + "&FieldName=" + FieldName + "&FormView=" + replaceHashSymbol(JSON.stringify(FormView)) + "&query=" + qry;//single parameter
                        }
                            //else if (arrActionQuery[i].ActionName == "menuItemClicked") {
                            //    window.location = url_FormViewList + "?ScreenName=" + arrActionQuery[i].ActionValue + "&FieldName=" + arrActionQuery[i].fieldName;//single parameter
                            //    //window.location = "/Form/FormViewList" + "?ScreenName=" + arrActionQuery[i].ActionValue + "&FieldName=" + arrActionQuery[i].fieldName;//single parameter
                            //}
                        else if (arrActionQuery[i].ActionName == "menuItemClicked") {

                            var query = "select QueryText + ' ' + GroupText + ' ' + OrderText from Queryconfig where screenname ='" + arrActionQuery[i].ActionValue + "_FORM'";
                            getExecute(query);
                            qry = executeQry;
                            if (arrActionQuery[i].ActionValue == "MustCarryItemForm");
                            else
                                qry = qry.split("where")[0];
                            //NewWindowOpen(qry, arrActionQuery[i].ActionValue);
                            //
                            //FIRST LINE Todo
                            window.location = url_FormViewList1 + "?ScreenName=" + arrActionQuery[i].ActionValue + "&FieldName=" + arrActionQuery[i].fieldName + "&FormView=" + "" + "&query=" + qry;//single parameter

                            //window.location = url_FormViewList + "?ScreenName=" + arrActionQuery[i].ActionValue + "&FieldName=" + arrActionQuery[i].fieldName + "&FormView=" + replaceHashSymbol(JSON.stringify(FormView)) + "&query=" + qry;//single parameter
                            //window.location = "/Form/FormViewList" + "?ScreenName=" + arrActionQuery[i].ActionValue + "&FieldName=" + arrActionQuery[i].fieldName;//single parameter
                        }
                        else if (arrActionQuery[i].ActionName == "listAddClicked") {
                            return arrActionQuery[i].Action;
                        }
                        else if (arrActionQuery[i].ActionName == "formButtonClicked") {
                            var __FieldName = '';
                            if (arrActionQuery[i].fieldName == "CreateBtn")
                                window.location = url_FormViewList1 + "?ScreenName=" + arrActionQuery[i].ActionValue + "&FieldName=" + __FieldName + "&FormView=" + "" + "&query=" + "";//single parameter
                        }
                    }

                        // COMMENTED 29.12.2020 THIRD LEVEL FORM ================================================

                    else if (arrActionQuery[i].ActionType.toUpperCase() == "MAP_BUTTON_CLICKED") {
                        //debugger;
                        var sScreenName = arrActionQuery[i].ActionValue;

                        try {
                            Handle_Clicked_Map_Customer(arrActionQuery[i].ActionValue)

                        } catch (e) {
                            console.log(e);
                            //alert(e);
                        }

                    }

                    else if (arrActionQuery[i].ActionType.toUpperCase() == "CLOSE_MAP_BUTTON_CLICKED") {
                        //debugger;
                        var sScreenName = arrActionQuery[i].ScreenName.toString();

                        try {
                            Handle_Close_Clicked_Map_Customer(sScreenName)

                        } catch (e) {
                            alert(e);
                        }

                    }


                    else if (arrActionQuery[i].ActionType.toUpperCase() == "POPUP_CONTAINER") {
                        //debugger;
                        var sDashScreenName = arrActionQuery[i].ActionValue;
                        var arrFormFields = [];
                        var arrFields = [];//ARRAYOPERATION
                        var _obj1 = {};

                        try {
                            //// COMMENTED 08.02.2021 ======================================
                            //var arrayfrm = _objArray.arrForm;

                            //if (arrayfrm != undefined) {
                            //    var val = "";
                            //    var fieldComponent = '', fieldControl = '';
                            //    for (var k = 0; k < arrayfrm.length; k++) {
                            //        val = getFormComponentValue(arrayfrm[k].fieldName);
                            //        if (val != "LISTVIEW")
                            //            FormView[arrayfrm[k].fieldName] = val;
                            //    }
                            //}

                            //var qry = "";
                            //var _FieldName = "";
                            //setCookie('FormView', JSON.stringify(""));
                            //setCookie('FormView', "");
                            //setCookie('ScreenName', JSON.stringify(""));
                            //setCookie('ScreenName', "");
                            //PageLoadinginfo("PerformAction 1071");
                            //setCookie('FormView', ReplaceSpecialCharacter(JSON.stringify(FormView)));
                            //setCookie('ScreenName', arrActionQuery[i].ActionValue);
                            //// COMMENTED 08.02.2021 ======================================


                            ExecuteQryConfig_PopupContainder(arrActionQuery[i].ActionValue);

                            // window.open(url_FormClickEvent + "?ScreenName=" + arrActionQuery[i].ActionValue + "&FieldName=" + _FieldName + "", '_blank');

                            //return;
                        } catch (e) {
                            alert(e);
                        }

                    }
                        // COMMENTED 29.12.2020 THIRD LEVEL FORM ================================================

                    else if (arrActionQuery[i].ActionType.toUpperCase() == "FORM") {
                        PageLoadinginfo("arrActionQuery[i].ActionType.toUpperCase() == FORM)");

                        //  _objArray.arrForm
                        //alert('arrActionQuery[i].ActionValue ---> ' + arrActionQuery[i].ActionValue);

                        var sDashScreenName = arrActionQuery[i].ActionValue;
                        var arrFormFields = [];
                        var arrFields = [];//ARRAYOPERATION
                        var _obj1 = {};

                        try {
                            var arrayfrm = _objArray.arrForm;
                            //if (arrayfrm != undefined) {
                            //    var fieldComponent = '', fieldControl = '';
                            //    for (var k = 0; k < arrayfrm.length; k++) {
                            //        arrFields.push(arrayfrm[k].fieldName);
                            //        arrFormFields.push(getFormComponentValue(arrayfrm[k].fieldName)); //ARRAYOPERATION
                            //    }

                            if (arrayfrm != undefined) {
                                var val = "";
                                var fieldComponent = '', fieldControl = '';
                                for (var k = 0; k < arrayfrm.length; k++) {
                                    val = getFormComponentValue(arrayfrm[k].fieldName);
                                    if (val != "LISTVIEW")
                                        FormView[arrayfrm[k].fieldName] = val;
                                    //arrFields.push(arrayfrm[k].fieldName);
                                    //arrFormFields.push(getFormComponentValue(arrayfrm[k].fieldName)); //ARRAYOPERATION
                                }
                            }



                            var qry = "";
                            var _FieldName = "";
                            setCookie('FormView', JSON.stringify(""));
                            setCookie('FormView', "");
                            setCookie('ScreenName', JSON.stringify(""));
                            setCookie('ScreenName', "");
                            PageLoadinginfo("PerformAction 1071");

                            // COMMENTED 22.03.2021
                            setCookie('FormView', (JSON.stringify(FormView)));

                            //setCookie('FormView', ReplaceSpecialCharacter(JSON.stringify(FormView)));

                            //  return;
                            setCookie('ScreenName', arrActionQuery[i].ActionValue);
                            PageLoadinginfo("PerformAction 1073");
                            PageLoadinginfo("PerformAction('menuItemClicked', _obj) End : => Call to Redirect Action Controller");
                            // window.location = url_FormViewList1 + "?ScreenName=" + arrActionQuery[i].ActionValue + "&FieldName=" + FieldName + "&FormView=" + "" + "" + "&query=" + ReplaceSpecialCharacter(qry) + "&obj1=";//single parameter
                            //// window.location = url_FormViewList1 + "?ScreenName=" + arrActionQuery[i].ActionValue + "&FieldName=" + FieldName + "&FormView=" + ReplaceSpecialCharacter(JSON.stringify(FormView)) + "" + "&query=" + ReplaceSpecialCharacter(qry) + "&obj1=" + ReplaceSpecialCharacter(JSON.stringify(_obj1));//single parameter
                            //todo
                            //NewWindowOpen(qry, arrActionQuery[i].ActionValue);
                            //todo
                            window.location = url_FormClickEvent + "?ScreenName=" + arrActionQuery[i].ActionValue + "&FieldName=" + _FieldName + "";//single parameter
                            //alert(window.location);
                            info(pageLoadingLog, "PageLoadinginfo");

                            return;
                        } catch (e) {

                        }

                        try {

                            TiAPIinfo('*******************************');
                            TiAPIinfo('');
                            TiAPIinfo('FORMVIEW PARAMS');
                            TiAPIinfo('');
                            //var arrFields = Ti.App.ARRAYOPERATION.getFormFieldNames();
                            //alert(arrFields.length);

                            var fieldComponent = '', fieldControl = '';
                            for (var i = 0; i < arrFields.length; i++) {
                                // 
                                TiAPIinfo(arrFields[i] + ' - ' + Ti.App.ARRAYOPERATION.getFormComponentValue(arrFields[i]));
                                //arrFormFields[arrFields[i]] = Ti.App.ARRAYOPERATION.getFormComponentValue(arrFields[i]);
                                ////  arrFormFields.push(Ti.App.ARRAYOPERATION.getFormComponentValue(arrFields[i]));
                                arrFormFields.push(getFormComponentValue(arrFields[i])); //ARRAYOPERATION
                                /*////*******************************
                                //Checking FormListView
                                fieldComponent = Ti.App.ARRAYOPERATION.getFormComponent(arrFields[i]);
                                
                                Ti.API.info('fieldComponent --> ' + fieldComponent);
                                if (fieldComponent != null && fieldComponent != undefined) {
                                    fieldControl = fieldComponent.fieldControl;
                                    if(fieldControl != null && fieldControl != undefined){
                                        if (fieldControl == 'LISTVIEW'){
                                            arrFormListViewField.push(arrFields[i]);
                                        }
                                    }
                                }
                                ///*//////
                                if (fieldComponent != null && fieldComponent != undefined) {
                                    fieldControl = fieldComponent.fieldControl;
                                    if (fieldControl != null && fieldControl != undefined) {
                                        if (fieldControl == 'LISTVIEW') {
                                            arrFormListViewField.push(arrFields[i]);
                                        }
                                    }
                                }
                            }

                            _obj1.arrFormFields = arrFields;
                            _obj1.arrFormFieldsValue = arrFormFields;
                            var arrTblFormFields = [];

                            var rowIndex = getSelectedRowIndex();//ArrayOperations

                            //var rowIndex = Ti.App.ARRAYOPERATION.getSelectedRowIndex();
                            TiAPIinfo('*******************************');
                            TiAPIinfo('');
                            TiAPIinfo('LISTVIEW PARAMS');
                            TiAPIinfo('');

                            TiAPIinfo('Ti.App.ARRAYOPERATION.getSelectedRowIndex() --> ' + Ti.App.ARRAYOPERATION.getSelectedRowIndex());

                            // var arrFields = Ti.App.ARRAYOPERATION.getTableHeaderFieldNames();
                            var arrFields = getTableHeaderFieldNames();//ArrayOperations
                            //alert(arrFields.length);

                            for (var i = 0; i < arrFields.length; i++) {

                                TiAPIinfo(arrFields[i] + ' - ' + Ti.App.ARRAYOPERATION.getColumnData(0, rowIndex, arrFields[i]));
                                //arrTblFormFields[arrFields[i]] = Ti.App.ARRAYOPERATION.getColumnData(0, rowIndex, arrFields[i]);
                                // arrTblFormFields.push(Ti.App.ARRAYOPERATION.getColumnData(0, rowIndex, arrFields[i]));
                                arrTblFormFields.push(getColumnData(0, rowIndex, arrFields[i], i, arrFields));//ARRAYOPERATION.
                            }
                            _obj1.arrTblFields = arrFields;
                            _obj1.arrTblFormFields = arrTblFormFields;

                            /*******************************
                                    arrFormListViewField = [];
                                    var arrFormListViewTblFields = [];
                                    var arrFormListViewTblFieldsValue = [];
                                    if(arrFormListViewField.length > 0){
                                        Ti.API.info('*******************************');
                                        Ti.API.info('');
                                        Ti.API.info('FORM LISTVIEW PARAMS');
                                        Ti.API.info('');
                                        //selectedTblRowIndex
                                        //var arrFormListViewTblFields = [];
                                        //var arrFormListViewTblFieldsValue = []; 
                                        
                                        //Ti.App.ARRAYOPERATION.setTableHeaderFieldNames("Collection_FORM_LISTVIEW_CollectionList");
                                        //Ti.App.ARRAYOPERATION.loadListConfigArr("Collection_FORM_LISTVIEW_CollectionList");
                                        
                                        var tblView = null, _data = null;
                                        var selectedTblRowIndex = -1;
                                        for(var j = 0; j < arrFormListViewField.length; j++){
                                            //Params.FormListView.List1.ItemNo
                                            Ti.API.info(currentScreenName+"_FORM_LISTVIEW_"+arrFormListViewField[j]);
                                            
                                            
                                            tblView = Ti.App.ARRAYOPERATION.getFormComponent(arrFormListViewField[j]);
                                            _data = tblView.data;
                                            Ti.App.ARRAYOPERATION.setTableHeaderFieldNames(tblView.tblScreenName);//currentScreenName+"_FORM_LISTVIEW_"+arrFormListViewField[j]);
                                            Ti.App.ARRAYOPERATION.loadListConfigArr(tblView.tblScreenName);//currentScreenName+"_FORM_LISTVIEW_"+arrFormListViewField[j]);
                                        
                                            selectedTblRowIndex = tblView.selectedTblRowIndex;
                                            
                                            if(selectedTblRowIndex > -1){
                                                
                                                Ti.API.info('Ti.App.ARRAYOPERATION.getTableHeaderFieldNames() ---> ' + JSON.stringify(Ti.App.ARRAYOPERATION.getTableHeaderFieldNames()));
                                                
                                                arrFormListViewTblFields[arrFormListViewField[j]] = Ti.App.ARRAYOPERATION.getTableHeaderFieldNames();
                                                //getGivenDataRowComponentData
                                                alert(arrFormListViewField[j] + ' - ' + tblView.selectedTblRowIndex);
                                                //Ti.App.ARRAYOPERATION.getGivenDataRowComponentData(_data,0,ctr,'InvNo')
                                                var arrFrmListViewFields = Ti.App.ARRAYOPERATION.getTableHeaderFieldNames();//arrFormListViewField[j];
                                                var arrTblFormListFieldsValue = [];
                                                for(var i = 0; i<arrFrmListViewFields.length; i++){
                                                    Ti.API.info(arrFrmListViewFields[i] + ' - ' + Ti.App.ARRAYOPERATION.getGivenDataRowComponentData(_data, 0, selectedTblRowIndex, arrFrmListViewFields[i]));
                                                    arrTblFormListFieldsValue.push(Ti.App.ARRAYOPERATION.getGivenDataRowComponentData(_data, 0, selectedTblRowIndex, arrFrmListViewFields[i]));
                                                }
                                                //arrFormListViewTblFieldsValue[j].push(arrTblFormListFieldsValue);
                                                
                                                arrFormListViewTblFieldsValue[j] = arrTblFormListFieldsValue;
                                                
                                                
                                            }
                                            
                                        }
                                        
                                    }
                                    _obj1.arrFormListViewTblFields = arrFormListViewTblFields;
                                    _obj1.arrFormListViewTblFieldsValue = arrFormListViewTblFieldsValue;
                            
                            /*******************************/

                            TiAPIinfo('*******************************');
                            TiAPIinfo('');
                            TiAPIinfo('');
                            TiAPIinfo('');
                            TiAPIinfo('*******************************');
                            TiAPIinfo('CALL PARAMS OBJ1 -> ' + JSON.stringify(_obj1));
                            //alert('CALL PARAMS OBJ1 -> ' + JSON.stringify(_obj1));
                            //Ti.App.objParams = _obj1;
                            objParams = _obj1;
                        } catch (e) {
                            //alert(e);	
                        }
                        //var sDashScreenName = arrActionQuery[i].ActionValue;

                        if (sDashScreenName != null && sDashScreenName != '') {

                            Ti.App.dashBoardItemClicked = true;
                            var db = new dbConnection().createDataBaseConnection();

                            var sWFScreenName = sDashScreenName;
                            var _qry = "Select * from Functions WHERE lower(ScreenName) = lower(" + Ti.App.SQL.safeSQL(sDashScreenName) + ") limit 0,1";
                            var _dbDataRows = db.execute(_qry);
                            if (_dbDataRows.isValidRow()) {
                                sWFScreenName = _dbDataRows.fieldByName('Code');
                            }
                            _dbDataRows.close();

                            try {
                                var _dbDataRows1 = db.execute("select * From WorkFlowConfig WHERE lower(FunctionName) = lower(" + Ti.App.SQL.safeSQL(sWFScreenName) + ") and Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel) + " and CompletedON < Date('now')");
                                if (_dbDataRows1.isValidRow()) {
                                    var _dt = new Date();
                                    _dt = DATE.dbDateFormatSQLite(_dt);
                                    db.execute("Update WorkFlowConfig SET Status = 0, CompletedOn = " + Ti.App.SQL.safeSQL(_dt) + " WHERE lower(FlowType) = 'main' and Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel));
                                }
                            } catch (e) { }

                            var qry = "Select * from WorkFlowConfig WHERE (status = 0  or status is null) and MustComplete = 1 and lower(NextFunctionName) = lower(" + Ti.App.SQL.safeSQL(sWFScreenName) + ") and  Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel) + " Order By OrderNo";
                            Ti.API.info('1.qry1 ---> ' + qry);
                            var dbDataRows = db.execute(qry);
                            if (dbDataRows.isValidRow()) {
                                var _qry = "Select * from WorkFlowConfig WHERE (status = 0  or status is null) and MustComplete = 0 and lower(FunctionName) = lower(" + Ti.App.SQL.safeSQL(sWFScreenName) + ") and  Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel) + " Order By OrderNo";
                                var _dbDataRows = db.execute(_qry);
                                if (!_dbDataRows.isValidRow()) {
                                    COMMON.showAlert("You Must Complete " + dbDataRows.fieldByName('FunctionName') + ".", ["OK"], null);
                                    _dbDataRows.close();
                                    dbDataRows.close();
                                    db.close();
                                    Ti.App.dashBoardItemClicked = false;
                                    return false;
                                }
                                _dbDataRows.close();
                            }
                            dbDataRows.close();

                            //STATUS = 1 COMPLETED
                            var qry = "Select * from WorkFlowConfig WHERE status = 1 and lower(FunctionName) = lower(" + Ti.App.SQL.safeSQL(sWFScreenName) + ") and  Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel) + " Order By OrderNo";
                            Ti.API.info('1.qry2 ---> ' + qry);
                            var dbDataRows = db.execute(qry);

                            if (dbDataRows.isValidRow()) {
                                var _dbDataRows = db.execute("Select * from WorkFlowConfig  WHERE lower(FlowId) = lower(" + Ti.App.SQL.safeSQL(sWFScreenName) + ") and Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel));
                                if (_dbDataRows.isValidRow()) {
                                    var params = {};
                                    params.FlowId = _dbDataRows.fieldByName('FlowId');//this.ScreenName;
                                    params.sFunctionName = sDashScreenName;
                                    params.dWorkFlowLevel = _dbDataRows.fieldByName('Level');
                                    dbDataRows.close();
                                    db.close();

                                    object = require('/Screens/WorkFlow/Controller');
                                    new object('WorkFlow', params);

                                    //dash.clicked = false;
                                    Ti.App.dashBoardItemClicked = false;
                                    return false;
                                }
                                _dbDataRows.close();

                            }

                            //STATUS = 0
                            var qry = "Select * from WorkFlowConfig WHERE (status = 0  or status is null) and lower(FunctionName) = lower(" + Ti.App.SQL.safeSQL(sWFScreenName) + ") and  Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel) + " Order By OrderNo";
                            Ti.API.info('1.qry3 ---> ' + qry);
                            var dbDataRows = db.execute(qry);
                            var sDashScreenName = sDashScreenName;
                            if (dbDataRows.isValidRow()) {
                                var _dbDataRows = db.execute("Select * from WorkFlowConfig  WHERE lower(FlowId) = lower(" + Ti.App.SQL.safeSQL(sWFScreenName) + ") and  Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel));
                                if (_dbDataRows.isValidRow()) {
                                    var params = {};
                                    params.FlowId = _dbDataRows.fieldByName('FlowId');//this.ScreenName;
                                    params.dWorkFlowLevel = _dbDataRows.fieldByName('Level');
                                    params.sFunctionName = sDashScreenName;
                                    _dbDataRows.close(); dbDataRows.close();
                                    db.close();

                                    object = require('/Screens/WorkFlow/Controller');
                                    new object('WorkFlow', params);

                                    //dash.clicked = false;
                                    Ti.App.dashBoardItemClicked = false;
                                    return false;
                                }
                                _dbDataRows.close();
                            }
                            dbDataRows.close();

                            var _qry = "Select * from Functions WHERE lower(Code) = lower(" + Ti.App.SQL.safeSQL(sDashScreenName) + ") limit 0,1";
                            Ti.API.info('1.qry4 ---> ' + qry);
                            var _dbDataRows = db.execute(_qry);
                            if (_dbDataRows.isValidRow()) {
                                sDashScreenName = _dbDataRows.fieldByName('ScreenName');
                            }
                            _dbDataRows.close();
                            db.close();

                            COMMON.showIndicator("Please Wait...");

                            try {
                                Ti.App.currentWin.currentRow = null;//Ti.App.currentRow;
                                Ti.App.currentWin.activatedWindow = true;
                                Ti.App.currentWin.lastSelectedRow = null;//lastSelectedRow;
                                Ti.App.currentRow = null;
                                Ti.App.currentScreenName = sDashScreenName;
                                var object = null;
                                if (!bIsAndroid) {
                                    sDashScreenName = sDashScreenName.replace(/ /g, "%20");
                                }

                                if (sDashScreenName.indexOf('Form-') > -1) {
                                    object = require('/Screens/Form-/Controller');
                                } else {
                                    object = require('/Screens/' + sDashScreenName + '/Controller');
                                }
                                if (!bIsAndroid) {
                                    sDashScreenName = sDashScreenName.replace(/%20/g, ' ');
                                }

                                var remarks = "Open " + sDashScreenName + " Screen";
                                var params = {};
                                params.sFunctionName = sDashScreenName;
                                setTimeout(function () {
                                    new object(sDashScreenName, params);
                                    Ti.App.bEnableAndroidBackButton = true;
                                    Ti.App.isDashboardScreen = false;
                                    COMMON.hideIndicator();
                                }, 100);

                            } catch (e) {

                                // COMMON.hideIndicator();

                            }
                            //dash.clicked = false;
                            return true;
                        }
                    } else if (arrActionQuery[i].ActionType.toUpperCase() == "CHANGELIST") {
                        //alert('CHANGELIST');
                        UI.setScrollViewPageByScreenName(arrActionQuery[i].ActionValue);//tableViewArr[dViewCount].tblScreenName
                    } else if (arrActionQuery[i].ActionType.toUpperCase() == "CANCEL") {
                        bCancel = true;
                    } else if (arrActionQuery[i].ActionType.toUpperCase() == "UPDATEDOCNO") {
                        sTransDocNo = Ti.App.ARRAYOPERATION.getSystemValue("PDAID") + "" + Ti.App.SQL.getTransDocNo();
                    } else if (arrActionQuery[i].ActionType.toUpperCase() == "HOME") {
                        COMMON.showIndicator('Please Wait...');
                        Ti.App.bHomeButtonPressed = true;
                        var arr = Ti.App.winsStack;
                        var length = (parseInt(Ti.App.winsStack.length));
                        if (length > 0) {
                            Ti.App.CustNo = '';
                            Ti.App.CustName = '';
                            Titanium.App.Properties.setList('CUST_FIELDS', []);
                            for (var ctr = 1; ctr < length; ctr++) {
                                var lastWin = arr[1];
                                arr.splice(1, 1);
                                Ti.App.winsStack = arr;
                                lastWin.close();
                            }
                        };
                        Ti.App.bEnableAndroidBackButton = true;
                        Ti.App.dashBoardItemClicked = false;
                        Ti.App.bHomeButtonPressed = false;
                        COMMON.hideIndicator();
                    } else if (arrActionQuery[i].ActionType.toUpperCase() == "REFRESHSYSTEM") {
                        // Ti.App.ARRAYOPERATION.setSystemTableConfig();
                        setSystemTableConfig();//ARRAYOPERATION
                        //alert('CHANGELIST');
                        //UI.setScrollViewPageByScreenName(arrActionQuery[i].ActionValue);//tableViewArr[dViewCount].tblScreenName
                    } else if (arrActionQuery[i].ActionType.toUpperCase() == "CLEARSIGN") {
                        var sActionValue = arrActionQuery[i].ActionValue;
                        if (sActionValue.indexOf('FormView.') > -1) {
                            var arrActionValue = sActionValue.split('FormView.');
                            //Ti.App.ARRAYOPERATION.setFormComponentValue(arrActionValue[1], data.barcode);
                            var SignView = Ti.App.ARRAYOPERATION.getFormComponent(arrActionValue[1]);
                            if (SignView != null && SignView != undefined && SignView != '') {
                                SignView.clear();
                            }
                        } else if (sActionValue.indexOf('ListView.') > -1) {
                            /*if(Ti.App.ARRAYOPERATION.getSelectedRowIndex() > -1){
                                var arrActionValue = sActionValue.split('ListView.');
                                Ti.App.ARRAYOPERATION.updateColumnData(0, Ti.App.ARRAYOPERATION.getSelectedRowIndex(), arrActionValue[1], data.barcode);
                            }*/
                        }
                    } else if (arrActionQuery[i].ActionType.toUpperCase() == "READONLYENABLE" || arrActionQuery[i].ActionType.toUpperCase() == "READONLYDISABLE") {
                        var bReadOnly = (arrActionQuery[i].ActionType.toUpperCase() == "READONLYENABLE") ? true : false;
                        var sActionValue = arrActionQuery[i].ActionValue;
                        if (sActionValue.indexOf('FormView.') > -1) {
                            var arrActionValue = sActionValue.split('FormView.');
                            var frmField = Ti.App.ARRAYOPERATION.getFormComponent(arrActionValue[1]);
                            if (frmField != null && frmField != undefined) {
                                Ti.API.info('frmField ---> ' + frmField);
                                frmField.bReadOnly = bReadOnly;
                            }
                        } else if (sActionValue.indexOf('ListView.') > -1) {
                            if (Ti.App.ARRAYOPERATION.getSelectedRowIndex() > -1) {
                                var arrActionValue = sActionValue.split('ListView.');
                                var listViewField = Ti.App.ARRAYOPERATION.getRowComponent(0, Ti.App.ARRAYOPERATION.getSelectedRowIndex(), arrActionValue[1]);
                                if (listViewField != null && listViewField != undefined) {
                                    listViewField.bReadOnly = bReadOnly;
                                }
                            }
                        }
                    } else if (arrActionQuery[i].ActionType.toUpperCase() == "POST") {
                        /**- - - - - - — - - - 
                        POST URL
                        - - - - - - — - - - */

                        if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
                            COMMON.showAlert("Please check your network connection.", ['OK'], null);
                            return false;
                        }

                        var xhrpost = Ti.Network.createHTTPClient();
                        xhrpost.onload = function (e) {
                            //Type -> JSON
                            //var resObj = JSON.parse(this.responseText);
                            WSResponse = {};
                            WSResponse = JSON.parse(this.responseText);
                            Controller.prototype.PerformAction('HandlePOSTResponse', objData);
                        };

                        xhrpost.onerror = function (e) {
                            Ti.API.info(JSON.stringify(e));
                        };
                        var posturl = Ti.App.ARRAYOPERATION.getSystemValue('CustomAPI') + Ti.App.ARRAYOPERATION.getQueryConfigByScreenName(arrActionQuery[i].Action);//Ti.App.currentScreenName+'_CustomAPI_Action_POST');// 'http://klog.uat.api.scmprofit.com:83/token';//SYSTEMLIST
                        xhrpost.open('POST', posturl);

                        var tmpScreenName = arrActionQuery[i].Action + "_HEADER";//"Form-SampleScreen_POST";
                        Ti.API.info("currentScreenName " + tmpScreenName);
                        var qry = Ti.App.ARRAYOPERATION.getQueryConfigByScreenName(tmpScreenName);
                        qry += ' ' + Titanium.App.Properties.getString('QueryConfig_' + tmpScreenName + '_GroupText');
                        qry += ' ' + Titanium.App.Properties.getString('QueryConfig_' + tmpScreenName + '_OrderText');
                        qry = UI.formatQueryString(qry, tmpScreenName);

                        var db = new dbConnection().createDataBaseConnection();
                        Ti.API.info('FORM QRY : ' + qry);
                        var dbDataRows = db.execute(qry);
                        while (dbDataRows.isValidRow()) {
                            xhrpost.setRequestHeader(dbDataRows.fieldByName('header'), dbDataRows.fieldByName('value'));
                            dbDataRows.next();
                        }
                        dbDataRows.close();
                        db.close();
                        //xhrpost.setRequestHeader("Content-Type", "application/xml");//CONTENT-TYPE
                        //xhrpost.setRequestHeader('Cache-Control','no-cache');
                        //xhrpost.setRequestHeader('Cache-Control','no-store');
                        //var params = {//————QueryConfig 
                        //	grant_type : 'password',
                        //	username : 'Admin',
                        //	password : 'aurionpro@2013'
                        //};

                        //grant_type : 'password',username : 'Admin',password : 'aurionpro@2013'
                        try {
                            var queryName1 = arrActionQuery[i].Action + '_PARAMS';//Form-SampleScreen_CustomAPI_POST_Params
                            Ti.API.info("queryName1 : " + queryName1);

                            var params = eval("({" + UI.formatQueryString(Titanium.App.Properties.getString('QueryConfig_' + queryName1)) + "})");
                            Ti.API.info("params Json : " + params);
                            //var params = {};
                            xhrpost.send(params);
                            Ti.API.info("POST SEND");
                        } catch (e) {
                            alert('WS POST ---> ' + e);
                        }
                    } else if (arrActionQuery[i].ActionType.toUpperCase() == "GET") {

                        if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
                            COMMON.showAlert("Please check your network connection.", ['OK'], null);
                            return false;
                        }

                        var sTmpActionValue = arrActionQuery[i].ActionValue;
                        Ti.App.DETAILS.set('SYNC_SCREEN', 'APICALL');

                        COMMON.showIndicator("Please Wait...");
                        var xhrpost = Ti.Network.createHTTPClient();
                        xhrpost.onload = function (e) {
                            //var resObj = JSON.parse(this.responseText);
                            TiAPIinfo('resObj -> ' + resObj);

                            var sResponseText = JSON.parse(this.responseText);

                            if (sResponseText != null && sResponseText != undefined && sResponseText != 'null' && sResponseText != '') {
                                //Form-SampleScreen_USER_ClearTempManifest; Form-SampleScreen_USER_InsertTempManifest;

                                if (sTmpActionValue != '' && sTmpActionValue != null && sTmpActionValue != undefined) {

                                    var arrActionValue = sTmpActionValue.split(";");
                                    var arrQry = [];
                                    /*for(var iCtr = 0; iCtr < arrActionValue.length; iCtr++){
                                        if(arrActionValue[iCtr].indexOf("{") < 0){
                                            arrQry.push(arrActionValue[iCtr]);
                                        }
                                    }*/

                                    var tmpScreenName = '', qry = '';
                                    if (sResponseText.length > 0) {
                                        for (var iCtr = 0; iCtr < sResponseText.length; iCtr++) {
                                            WSResponse = sResponseText[iCtr];
                                            Ti.API.info('WSResponse -> ' + JSON.stringify(WSResponse));
                                            for (var iCtr1 = 0; iCtr1 < arrActionValue.length; iCtr1++) {
                                                //if(arrActionValue[iCtr1].indexOf("{") > -1){

                                                tmpScreenName = arrActionValue[iCtr1];

                                                Ti.API.info('tmpScreenName -> ' + tmpScreenName);

                                                qry = Ti.App.ARRAYOPERATION.getQueryConfigByScreenName(tmpScreenName);
                                                qry += ' ' + Titanium.App.Properties.getString('QueryConfig_' + tmpScreenName + '_GroupText');
                                                qry += ' ' + Titanium.App.Properties.getString('QueryConfig_' + tmpScreenName + '_OrderText');
                                                qry = UI.formatQueryString(qry, tmpScreenName);
                                                arrQry.push(qry);
                                                //}

                                                if (tmpScreenName == 'Form-ActivityTracking_USER_InsertTempTbl' || tmpScreenName == 'Form-JobTracking_USER_InsertTempTbl') {
                                                    var ActivityAllocationArr = sResponseText[iCtr].ActivityAllocations;
                                                    for (var iCtr2 = 0; iCtr2 < ActivityAllocationArr.length; iCtr2++) {
                                                        WSResponse = ActivityAllocationArr[iCtr2];
                                                        WSResponse.ActivityId = sResponseText[iCtr].ActivityId;
                                                        WSResponse.ProcessNumber = sResponseText[iCtr].ProcessNumber;
                                                        WSResponse.BookingNumber = sResponseText[iCtr].BookingNumber;
                                                        WSResponse.ActivityCode = sResponseText[iCtr].ActivityCode;
                                                        WSResponse.ActivityName = sResponseText[iCtr].ActivityName;
                                                        tmpScreenName = 'Form-ActivityTracking_USER_InsertActivityAllocation';
                                                        qry = Ti.App.ARRAYOPERATION.getQueryConfigByScreenName(tmpScreenName);
                                                        qry += ' ' + Titanium.App.Properties.getString('QueryConfig_' + tmpScreenName + '_GroupText');
                                                        qry += ' ' + Titanium.App.Properties.getString('QueryConfig_' + tmpScreenName + '_OrderText');
                                                        qry = UI.formatQueryString(qry, tmpScreenName);
                                                        arrQry.push(qry);
                                                    }
                                                    WSResponse = sResponseText[iCtr];
                                                }
                                            }
                                        }
                                    }
                                    if (arrQry.length > 0) {
                                        Ti.App.DBCOMMON.BulkInsertQueries(arrQry);
                                    }
                                }
                            }


                            COMMON.hideIndicator();
                            Ti.App.DETAILS.set('SYNC_SCREEN', '');


                            Controller.prototype.PerformAction('HandleGETResponse', objData);


                            //QueryConfig
                            //Insert Activity (ActivityId) Value ({Respose.ActivityId})
                        };
                        xhrpost.onerror = function (e) {
                            COMMON.hideIndicator();
                            Ti.App.DETAILS.set('SYNC_SCREEN', '');
                        };
                        try {
                            //api/v1/Activity/GetActivities?searchText={FormView.Searchtext}&service={FormView.Service}&process={FormView.Process}
                            var posturl = Ti.App.ARRAYOPERATION.getSystemValue('CustomAPI') + Ti.App.ARRAYOPERATION.getQueryConfigByScreenName(arrActionQuery[i].Action);//'Form-SampleScreen_CustomAPI_Action_GET');// 'http://klog.uat.api.scmprofit.com:83/token';//SYSTEMLIST
                            //var posturl = 'http://klog.uat.api.scmprofit.com:83/api/v1/Activity/GetActivities?searchText=cargo&service=&process=';

                            posturl = posturl.replace(/\'/g, '');//Remove SingleQuote from URL

                            xhrpost.open('GET', posturl);

                            var tmpScreenName = arrActionQuery[i].Action + "_HEADER";//"Form-SampleScreen_GET";
                            Ti.API.info("currentScreenName " + tmpScreenName);
                            var qry = Ti.App.ARRAYOPERATION.getQueryConfigByScreenName(tmpScreenName);
                            qry += ' ' + Titanium.App.Properties.getString('QueryConfig_' + tmpScreenName + '_GroupText');
                            qry += ' ' + Titanium.App.Properties.getString('QueryConfig_' + tmpScreenName + '_OrderText');
                            qry = UI.formatQueryString(qry, tmpScreenName);

                            var db = new dbConnection().createDataBaseConnection();
                            Ti.API.info('FORM QRY : ' + qry);
                            var dbDataRows = db.execute(qry);
                            while (dbDataRows.isValidRow()) {
                                xhrpost.setRequestHeader(dbDataRows.fieldByName('header'), dbDataRows.fieldByName('value'));
                                dbDataRows.next();
                            }
                            dbDataRows.close();
                            db.close();

                            //xhrpost.setRequestHeader("Content-Type", "application/json");//CONTENT-TYPE
                            //xhrpost.setRequestHeader("Authorization", "Bearer " + sToken);//HEADER
                            //xhrpost.setRequestHeader("SystemID", "SIMPLR_SI");//HEADER
                            Ti.API.info('GET DATA');
                            xhrpost.send();
                        } catch (e) {
                            alert('WS get ---> ' + e);
                        }
                    } else if (arrActionQuery[i].ActionType.toUpperCase() == "POPUPWINDOW") {

                        //returnBasicPopup

                        //Ti.App.formItems
                        //setFormConfigFieldNames

                        sPrevScrFormItems = Ti.App.formItems;

                        //setFormConfigFieldNames
                        Ti.App.ARRAYOPERATION.setFormConfigFieldNames(Ti.App.currentScreenName + '_POPUPWINDOW_' + objData.fieldName);

                        var ConfigObj = {};
                        ConfigObj.formValueQry = Ti.App.ARRAYOPERATION.getQueryConfigByScreenName(Ti.App.currentScreenName + '_POPUPWINDOW_' + objData.fieldName + '_FORM');
                        Ti.API.info('*** Form Value Query  --> ' + ConfigObj.formValueQry);
                        ConfigObj.valueFormArray = [];
                        ConfigObj.valueTestFormArray = Ti.App.ARRAYOPERATION.loadFormValueData(ConfigObj.formValueQry, ConfigObj.valueFormArray);
                        var formview = Ti.App.ARRAYOPERATION.loadFormConfig(Ti.App.currentScreenName + '_POPUPWINDOW_' + objData.fieldName, ConfigObj.valueTestFormArray);//this.screenName, valueTestFormArray);
                        //Ti.App.formItems = formview;
                        sActiveScrFormItems = Ti.App.formItems;
                        Ti.API.info('Ti.App.formItems --> ' + JSON.stringify(Ti.App.formItems));

                        PopupView = new BasicPopupWithView().createBasicPopupWithView(Controller.prototype, formview);
                        Ti.App.currentWin.add(PopupView);
                    } else if (arrActionQuery[i].ActionType.toUpperCase() == "HIDEPOPUPWINDOW") {

                        if (COMMON.isPlatformAndroid()) {
                            Ti.UI.Android.hideSoftKeyboard();
                        }
                        Ti.App.formItems = sActiveScrFormItems;
                        //returnBasicPopup
                        Controller.prototype.PerformAction('returnBasicPopupWindow', {});
                        if (PopupView != null && PopupView != undefined && PopupView != '') {
                            Ti.App.currentWin.remove(PopupView);
                            PopupView = null;
                            Ti.App.formItems = sPrevScrFormItems;
                            Ti.App.ARRAYOPERATION.setFormConfigFieldNames(Ti.App.currentScreenName);
                            sPrevScrFormItems = null;

                        }

                    } else if (arrActionQuery[i].ActionType.toUpperCase() == "ADDFORMLISTVIEWROW") {
                        //Ti.App.ARRAYOPERATION.getSelectedRowIndex()

                        var key = arrActionQuery[i].ActionValue;
                        var arrFields = key.split('FormView.ListView.');
                        //var dListViewSelectedRowIndex = Ti.App.ARRAYOPERATION.getFormListViewSelectedRowIndex(arrFields[1]);
                        var tbl = Ti.App.ARRAYOPERATION.getFormListView(arrFields[1]);
                        if (tbl != null && tbl != undefined && tbl != '') {

                            var dListViewSelectedRowIndex = tbl.selectedTblRowIndex;
                            dListViewSelectedRowIndex = -1;//DELETEROW not working
                            if (dListViewSelectedRowIndex == null || dListViewSelectedRowIndex == undefined || dListViewSelectedRowIndex == '') {
                                dListViewSelectedRowIndex = -1;
                            }

                            if (dListViewSelectedRowIndex > -1) {
                                Ti.App.ARRAYOPERATION.loadListConfigArr(arrActionQuery[i].Action);
                                Ti.App.ARRAYOPERATION.setTableHeaderFieldNames(arrActionQuery[i].Action);

                                var db = new dbConnection().createDataBaseConnection();
                                var qry = Ti.App.ARRAYOPERATION.getQueryConfigByScreenName(arrActionQuery[i].Action + "_USER_ADDROW");
                                qry = Ti.App.ARRAYOPERATION.formatQueryString(qry, '');
                                var dbDataRows = db.execute(qry);
                                var row = "";
                                while (dbDataRows.isValidRow()) {
                                    row = Ti.App.ARRAYOPERATION.createUI(arrActionQuery[i].Action, dListViewSelectedRowIndex, dbDataRows);
                                    //tbl.appendRow(row);
                                    tbl.insertRowAfter(dListViewSelectedRowIndex, row);
                                    dbDataRows.next();
                                }
                                dbDataRows.close();
                                db.close();

                                Ti.App.ARRAYOPERATION.updateTableRowIndexByTableView(tbl);

                                Ti.App.ARRAYOPERATION.loadListConfigArr(Ti.App.currentScreenName);
                                Ti.App.ARRAYOPERATION.setTableHeaderFieldNames(Ti.App.currentScreenName);

                            } else {
                                try {
                                    //tbl.data[sectionIndex].rows
                                    var tblData = tbl;//tbl.data[0].rows;
                                    if (tblData != null && tblData != undefined && tblData != '') {

                                        Ti.App.ARRAYOPERATION.loadListConfigArr(arrActionQuery[i].Action);
                                        Ti.App.ARRAYOPERATION.setTableHeaderFieldNames(arrActionQuery[i].Action);

                                        var db = new dbConnection().createDataBaseConnection();

                                        Ti.API.info('Action : ' + arrActionQuery[i].Action);


                                        var qry = Ti.App.ARRAYOPERATION.getQueryConfigByScreenName(arrActionQuery[i].Action + "_USER_ADDROW");
                                        qry = Ti.App.ARRAYOPERATION.formatQueryString(qry, '');
                                        var dbDataRows = db.execute(qry);
                                        var row = "";
                                        while (dbDataRows.isValidRow()) {

                                            if (tblData.length == 0) {
                                                row = Ti.App.ARRAYOPERATION.createUI(arrActionQuery[i].Action, tblData.length, dbDataRows);
                                                row.height = 0.1;
                                                tbl.appendRow(row);
                                            }
                                            row = Ti.App.ARRAYOPERATION.createUI(arrActionQuery[i].Action, tblData.length, dbDataRows);
                                            tbl.appendRow(row);
                                            dbDataRows.next();
                                        }
                                        dbDataRows.close();
                                        db.close();

                                        Ti.App.ARRAYOPERATION.updateTableRowIndexByTableView(tbl);

                                        Ti.App.ARRAYOPERATION.loadListConfigArr(Ti.App.currentScreenName);
                                        Ti.App.ARRAYOPERATION.setTableHeaderFieldNames(Ti.App.currentScreenName);


                                    }


                                } catch (e) { }
                            }
                        }

                        //Ti.App.ARRAYOPERATION.getFormListViewSelectedRowIndex(
                    }
                }

            }
        }

        //if(arrActionQuery.indexOf())

    } catch (e) {
        TiAPIinfo('PERFORM ACTION ---> ' + e);
        alert('PERFORM ACTION ---> ' + e);
    }


}

var tempsScreenName = '';
var tempsFieldName = '';
var tempsDataMember = '';
var isExecute = false;
var temphFAi = '';


// COMMENTED 03.11.2020
//function setSelectedValue(selectObj, valueToSet) {
//    if (selectObj!=null && selectObj.options != undefined && selectObj.options.length == 1)
//    {
//        for (var i = 0; i < selectObj.options.length; i++) {
//            if (selectObj.options[i].text == valueToSet) {
//                selectObj.options[i].selected = true;
//                return;
//            }
//        }
//    }
//}

function handleFieldAction(sScreenName, sFieldName, sDataMember, temphFAi) {

    tempsScreenName = sScreenName;
    tempsFieldName = sFieldName;
    tempsDataMember = sDataMember;
    try {
        //info('sDataMember ---> ' + sDataMember);
        TiAPIinfo('sDataMember ---> ' + sDataMember);
        TiAPIinfo('sScreenName ---> ' + sScreenName);
        var arrayQuery = [];
        var arrDataMember = sDataMember.split(",");

        ///newadd 5 lines

        if (temphFAi == undefined)
            temphFAi = 0;
        for (var i = temphFAi; i < arrDataMember.length; i++) {
            if (isExecute == true) {
                i = arrDataMember.length + 1;
                return;
            }
            temphFAi = i;

            // for (var i = 0; i < arrDataMember.length; i++) {
            TiAPIinfo('arrDataMember[' + i + '] ---> ' + arrDataMember[i]);

            if (arrDataMember[i] == sScreenName) {
                loadListConfigArr(sScreenName);//ArrayOperations
                // Ti.App.ARRAYOPERATION.setTableHeaderFieldNames(sScreenName);
                //Ti.App.ARRAYOPERATION.resetRowiIndex();
                setTableHeaderFieldNames(sScreenName);//ARRAYOPERATION
                resetRowiIndex();//ARRAYOPERATION
                var qry = getQueryConfigByScreenName(sScreenName);//ARRAYOPERATION
                qry += ' ' + getString['QueryConfig_' + sScreenName + '_GroupText'];
                qry += ' ' + getString['QueryConfig_' + sScreenName + '_OrderText'];
                qry = formatQueryString(qry, sScreenName);//ScreenView
                // info('QRY --> ' + qry);
                TiAPIinfo('QRY --> ' + qry);
                var records = loadData(sScreenName, qry, 0, false);//ARRAYOPERATION
                if (Ti.App.currentTable != undefined && Ti.App.currentTable != null) {
                    Ti.App.currentTable.data = records;
                }
                Ti.App.currentTable.currentQuery = qry;
                Ti.App.currentTable.currentPage = 0;
                Ti.App.currentTable.pageCount = 0;
                //UI.updateFormListRowHeight(Ti.App.currentTable);
                UI.updateRowHeight();
            } else if (arrDataMember[i] == sScreenName + "_FORM") {

                Ti.App.ARRAYOPERATION.setFormConfigFieldNames(sScreenName);
                var arrFormFields = Ti.App.ARRAYOPERATION.getFormFieldNames();

                var tmpScreenName = sScreenName + "_FORM";
                var qry = Ti.App.ARRAYOPERATION.getQueryConfigByScreenName(tmpScreenName);
                qry += ' ' + Titanium.App.Properties.getString('QueryConfig_' + tmpScreenName + '_GroupText');
                qry += ' ' + Titanium.App.Properties.getString('QueryConfig_' + tmpScreenName + '_OrderText');
                qry = UI.formatQueryString(qry, tmpScreenName);

                var db = new dbConnection().createDataBaseConnection();
                Ti.API.info('FORM QRY : ' + qry);
                var dbDataRows = db.execute(qry);
                if (dbDataRows.isValidRow()) {
                    if ((Ti.Platform.name === 'android') || (Ti.version >= '3.3.0')) {
                        var length = dbDataRows.fieldCount;
                    } else {
                        var length = dbDataRows.fieldCount();
                    }
                    for (var ctr = 0; ctr < length; ctr++) {
                        if (arrFormFields.indexOf(dbDataRows.fieldName(ctr).toUpperCase()) > -1) {
                            Ti.App.ARRAYOPERATION.setFormComponentValue(dbDataRows.fieldName(ctr), dbDataRows.field(ctr));
                        }
                    }
                }
                dbDataRows.close();
                db.close();

            } else if (arrDataMember[i].indexOf(sScreenName + "_FORM_LISTVIEW_") > -1) {
                var arrKey = arrDataMember[i].split("_FORM_LISTVIEW_");
                var tmpScreenName = arrDataMember[i];
                Ti.App.ARRAYOPERATION.loadListConfigArr(tmpScreenName);
                Ti.App.ARRAYOPERATION.setTableHeaderFieldNames(tmpScreenName);
                Ti.App.ARRAYOPERATION.resetRowiIndex();
                var tblView = Ti.App.ARRAYOPERATION.getFormComponent(arrKey[1]);
                var _data = tblView.data;
                _data = (_data == null || _data == undefined || _data == '') ? [] : _data;
                var qry = Ti.App.ARRAYOPERATION.getQueryConfigByScreenName(tmpScreenName);
                qry += ' ' + Titanium.App.Properties.getString('QueryConfig_' + tmpScreenName + '_GroupText');
                qry += ' ' + Titanium.App.Properties.getString('QueryConfig_' + tmpScreenName + '_OrderText');
                qry = UI.formatQueryString(qry, tmpScreenName);
                Ti.API.info('QRY --> ' + qry);
                var tmpArrFormValues = Ti.App.ARRAYOPERATION.loadData(tmpScreenName, qry, 0, false);
                tblView.data = tmpArrFormValues;
                UI.updateFormListRowHeight(tblView);
            }
            else if (arrDataMember[i].indexOf("_EXECUTE_ADDROW") > -1) {//Execute Query FORMCONFIG LISTVIEW

                var mScreenName = arrDataMember[i];//formdata.screenName + '_FORM_COMBOBOX_' + formdata.fieldName;
                var qry = getString['QueryConfig_' + mScreenName];
                qry += ' ' + getString['QueryConfig_' + mScreenName + '_GroupText'];
                qry += ' ' + getString['QueryConfig_' + mScreenName + '_OrderText'];
                qry = formatQueryString(qry, mScreenName);
                execute(qry);
                var tmpScreenName = arrDataMember[i];
                var arrTblFieldName = tmpScreenName.split("_EXECUTE_ADDROW");
                var scrName = arrTblFieldName[0];
                dynamicFieldName = tmpScreenName.split('_')[tmpScreenName.split('_').length - 1];

                var ttbody = "ListBodyDivId_" + scrName + "_" + dynamicFieldName;
                var tfoot = "ListfootDivId_" + scrName + "_" + dynamicFieldName;
                //New
                var rwCount = objAddDynamicListCount['ListConfig_' + ttbody] + 1;
                if (rwCount <= parseInt(executeQry[0].Response)) {
                    for (var n = rwCount; n < parseInt(executeQry[0].Response) ; n++) {
                        CreateList(ttbody, tfoot, scrName, 1, "", dynamicFieldName, "", 0);
                    }
                }
                else if (executeQry[0].Response == undefined) {
                    $("#" + ttbody).empty();
                    // $('#' + tfoot).empty();
                    FormListConfigRow(ttbody, tfoot, scrName, 1, "", dynamicFieldName, "", "")
                    // CreateList(ttbody, tfoot, scrName, 1, "", dynamicFieldName, "", 0);
                }
                else {
                    var _obj = {};
                    _obj.ttbody = ttbody;
                    _obj.tfoot = tfoot;
                    _obj.scrName = scrName;
                    _obj.rowCount = parseInt(executeQry[0].Response);
                    _obj.dynamicFieldName = dynamicFieldName;
                    _obj.message = "Machine Column Number should be greater than list count";
                    //_obj.message = "Are you sure want to romove all records?";
                    _obj.title = "List Item";

                    // ttbody, tfoot, scrName, 1, "", dynamicFieldName, "", 0
                    ListRemoveConfirmMessage(_obj);
                }
                ////old
                //$("#" + ttbody).empty();
                //$('#' + tfoot).empty();
                //objAddDynamicListCount['ListConfig_' + ttbody] = -1;
                //for (var n = 0; n < parseInt(executeQry[0].Response) ; n++) {
                //    CreateList(ttbody, tfoot, scrName, 1, "", dynamicFieldName, "", 0);
                //}

            }

            else if (arrDataMember[i].indexOf(sScreenName + "_LISTVIEW_EXECUTE_LINENO") > -1) {//Execute Query FORMCONFIG LISTVIEW

                var mScreenName = arrDataMember[i];//formdata.screenName + '_FORM_COMBOBOX_' + formdata.fieldName;
                var qry = getString['QueryConfig_' + mScreenName];
                qry += ' ' + getString['QueryConfig_' + mScreenName + '_GroupText'];
                qry += ' ' + getString['QueryConfig_' + mScreenName + '_OrderText'];

                // var tmpScreenName = arrDataMember[i];
                var arrTblFieldName = mScreenName.split("_LISTVIEW_EXECUTE_LINENO");
                var scrName = arrTblFieldName[0];
                dynamicFieldName = mScreenName.split('_')[mScreenName.split('_').length - 1];

                var ttbody = "ListBodyDivId_" + scrName + "_" + dynamicFieldName;

                var id = "";
                var value = '';
                var tblbody = document.getElementById(ttbody);
                var rwCount = objAddDynamicListCount['ListConfig_' + ttbody] + 1;
                var formatqry = '';
                for (var n = 0; n < rwCount ; n++) {
                    value = n + 1;
                    obj = {};
                    obj['LineNo'] = value;
                    FormView[dynamicFieldName] = obj;
                    FormView["ListView"] = obj;

                    formatqry = formatQueryString(qry, mScreenName);
                    execute(formatqry);

                    for (var key in executeQry[0]) {
                        if (key.indexOf("FormView.") > -1 && key.indexOf(".", 9) > -1) {
                            value = executeQry[0][key]
                            id = key.split('.')[2];

                            var tdType = tblbody.rows[n] == undefined ? "" : getTableRowTDType(tblbody.rows[n].cells.namedItem(id).innerHTML);
                            if (tdType == "text" || tdType == "select" || tdType == "hidden") {
                                tblbody.rows[n].cells.namedItem(id).childNodes['0'].value = value;
                            }
                            else if (tdType == "checkbox") {
                                tblbody.rows[n].cells.namedItem(id).childNodes['0'].checked = value;
                            }
                            else if (tdType == "button");
                            else if (tdType == "lookup") {
                                tblbody.rows[n].cells.namedItem(id).childNodes['0'].children[id].value = value;
                            }
                            else if (tdType == "label") {
                                tblbody.rows[n].cells.namedItem(id).innerText = value;
                            }
                            else {
                                tblbody.rows[n].cells.namedItem(id).innerText = value;
                            }

                            ///
                        }
                    }
                    ///
                }

            }

            else if (arrDataMember[i].indexOf("_LISTVIEW_EXECUTE_DELETE") > -1) {//Execute Query FORMCONFIG LISTVIEW
                setListValue("", _fieldName, parseInt(currentRowClickCount), _ttbody);//listconfig.js
                var mScreenName = arrDataMember[i];//formdata.screenName + '_FORM_COMBOBOX_' + formdata.fieldName;
                var qry = getString['QueryConfig_' + mScreenName];
                qry += ' ' + getString['QueryConfig_' + mScreenName + '_GroupText'];
                qry += ' ' + getString['QueryConfig_' + mScreenName + '_OrderText'];
                qry = formatQueryString(qry, mScreenName);
                execute(qry);
                //executeQry;
            }

                // else if (arrDataMember[i].indexOf(sScreenName + "_LISTVIEW_") > -1 || arrDataMember[i].indexOf(sScreenName + "_ListView_") > -1) {
                // IMPORTANT - TO FILL THE LISTVIEW
            else if (arrDataMember[i].indexOf(sScreenName + "_LISTVIEW_") > -1
                || arrDataMember[i].indexOf(currentScreenName + "_LISTVIEW_") > -1) {
                var arrKey = arrDataMember[i].split("_LISTVIEW_");
                var tblId = arrKey[1].split('_')[0];
                //if (tblId == undefined) {
                //    arrKey = arrDataMember[i].split("_ListView_");
                //    tblId = arrKey[1];
                //}
                //var sScreenName = arrDataMember[i];
                //qry = getString['QueryConfig_' + sScreenName];
                //qry += ' ' + getString['QueryConfig_' + sScreenName + '_GroupText'];
                //qry += ' ' + getString['QueryConfig_' + sScreenName + '_OrderText'];

                //qry = formatQueryString(qry, sScreenName);
                //execute(qry);
                //executeQry;
                //executeQry;
                // if (arrDataMember[i].indexOf(sScreenName + "_LISTVIEW_") > -1 == true)
                var listParameter = objListParameter['ListParameter_ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + tblId];
                if (arrDataMember[i].indexOf(currentScreenName + "_LISTVIEW_") > -1 == true && listParameter == undefined)
                    listParameter = objListParameter['ListParameter_ListBodyDivId_' + currentScreenName + '_' + tblId];

                // COMMENTED 02.02.2021 TESTING PURPOSE =========
                //if (listParameter != undefined && currentScreenName.toString().toLowerCase() == "customerroutingctrform"
                //    || CurrentScreen_TabScreen_Name.toString().toLowerCase() == "customerroutingctrform")
                //{
                //    listParameter = objListParameter['ListParameter_ListBodyDivId_CustomerRoutingForm_' + tblId];
                //}
                // COMMENTED 02.02.2021 TESTING PURPOSE =========

                if (listParameter != undefined) {
                    searchOptionArray = [];
                    sortOptionArray = [];
                    ListSelectedId = [];
                    if (arrKey[1].split('_').length == 2) {
                        _isList_FieldName = true;
                        FormListConfigRow(listParameter.ttbody, listParameter.tfoot, listParameter.scrName, 1, '', listParameter.fieldName + "_" + arrKey[1].split('_')[1], listParameter.actionType, '');
                    }
                    else {
                        FormListConfigRow(listParameter.ttbody, listParameter.tfoot, listParameter.scrName, 1, '', listParameter.fieldName, listParameter.actionType, '');
                    }
                }

            }

                // HANDLER FOR CustomerRoutingCTRForm
                // AS OF NOW IT IS USED and LATER IT WOULD CHANGED
            else if (arrDataMember[i].toString().toLowerCase() == "customerroutingform_listview_customer") {

                var arrKey = arrDataMember[i].split("_LISTVIEW_");
                var tblId = arrKey[1].split('_')[0];
                //customerroutingform_listview_customer

                var listParameter = objListParameter['ListParameter_ListBodyDivId_CustomerRoutingForm_' + tblId];

                if (listParameter != undefined) {
                    searchOptionArray = [];
                    sortOptionArray = [];
                    ListSelectedId = [];
                    if (arrKey[1].split('_').length == 2) {
                        _isList_FieldName = true;
                        FormListConfigRow(listParameter.ttbody, listParameter.tfoot, listParameter.scrName, 1, '', listParameter.fieldName + "_" + arrKey[1].split('_')[1], listParameter.actionType, '');
                    }
                    else {
                        FormListConfigRow(listParameter.ttbody, listParameter.tfoot, listParameter.scrName, 1, '', listParameter.fieldName, listParameter.actionType, '');
                        currentScreenName = "CustomerRoutingForm";
                        CurrentScreen_TabScreen_Name = "CustomerRoutingForm";
                    }
                }
            }

            else if (arrDataMember[i].indexOf("_EXECUTE_LISTVIEW_") > -1 || arrDataMember[i].indexOf("_EXECUTE_FORM_LISTVIEW_") > -1) {//Execute Query FORMCONFIG LISTVIEW
                dListRowIndex = -1;
                dFormListRowIndex = -1; dFormListRow = null;
                var tmpScreenName = arrDataMember[i];
                loadListConfigArr(tmpScreenName);
                setTableHeaderFieldNames(tmpScreenName);
                //Ti.App.ARRAYOPERATION.loadListConfigArr(tmpScreenName);
                //Ti.App.ARRAYOPERATION.setTableHeaderFieldNames(tmpScreenName);
                //Fomr-ads_EXECUTE_LISTVIEW_ _FIELD
                var arrTblFieldName = tmpScreenName.split("_EXECUTE_LISTVIEW_");

                // var tblView = Ti.App.ARRAYOPERATION.getFormComponent(arrTblFieldName[1]);
                //var tblView = getFormComponent(arrTblFieldName[1]);
                //TiAPIinfo('tblView --> ' + tblView);
                var scrName = arrTblFieldName[0];

                // dynamicFieldName = dynamicFieldName == "" ? tmpScreenName.split('_')[tmpScreenName.split('_').length - 1] : dynamicFieldName
                // var tblbody = document.getElementById("ListBodyDivId_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName);

                dynamicFieldName = arrTblFieldName[1].split('_').length == 2 ? arrTblFieldName[1].split('_')[0] : tmpScreenName.split('_')[tmpScreenName.split('_').length - 1];
                var tblbody = document.getElementById("ListBodyDivId_" + scrName + "_" + dynamicFieldName);
                var _data = tblbody.rows;
                var tdType = '';
                var id = '';
                var obj = {};

                var isRowNull = false;
                //  var listConfig = ListHeaderList['ListConfig_' + scrName + '_' + dynamicFieldName];
                var listConfig = ListHeaderList['ListConfig_ListBodyDivId_' + scrName + '_' + dynamicFieldName];
                if (_data.length > 0) {
                    dFormListRow = _data;
                    var lineNo = 0;
                    //var _dataLen = _data.length - 1;
                    //if (scrName == "SearchConfiguratorForm" || scrName == "ListConfiguratorForm" || scrName == "FormConfiguratorForm")
                    //    _dataLen = _data.length;

                    //if (_dataLen == 0) {
                    var _dataLen = _data.length;

                    // COMMENTED 18.08.2020 =====================================
                    //if (_isdynamic == true && scrName != "MessageConfigNewForm")
                    //    _dataLen = _data.length - 1;
                    // HERE INCLUDING  -- "MessageConfigNewForm"
                    //if (_isdynamic == true && scrName != "MessageConfigNewForm")
                    //{
                    //    _dataLen = _data.length - 1;
                    //}
                    if (_isdynamic == true) {
                        _dataLen = _data.length - 1;
                    }

                    LoadingImageOpen();
                    // }
                    for (var ctr = 0 ; ctr < _dataLen ; ctr++) {
                        //for (; _dataLenctr < _dataLen ; _dataLenctr++) {
                        //    ctr = _dataLenctr;
                        if (tblbody.rows[ctr].cells.length == 0);
                        else {
                            lineNo++;
                            obj = {};
                            for (var r = 0; r < listConfig.length; r++) {
                                id = listConfig[r].FieldName;

                                if (id.toString().toLowerCase() == "isupdown") {
                                    // COLUMN FOR INDICATING UP AND DOWN FUNCTIONALITY 
                                    continue;
                                }

                                if (tblbody.rows[ctr].cells.namedItem(id) != null) {
                                    isRowNull = false;
                                    tdType = tblbody.rows[ctr] == undefined ? "" : getTableRowTDType(tblbody.rows[ctr].cells.namedItem(id).innerHTML);
                                    if (tdType == "text" || tdType == "select") {
                                        value = tblbody.rows[ctr].cells.namedItem(id).childNodes['0'].value;
                                    }
                                    else if (tdType == "checkbox") {
                                        value = tblbody.rows[ctr].cells.namedItem(id).childNodes['0'].checked;
                                    }
                                    else if (tdType == "button")
                                        value = '';
                                    else if (tdType == "label" || tdType == "link")
                                        value = tblbody.rows[ctr].cells.namedItem(id).innerText;
                                    else if (tdType == "lookup") {
                                        value = tblbody.rows[ctr].cells.namedItem(id).childNodes['0'].children[id].value;
                                    }
                                    else if (tdType == "file") {
                                        var imgname = tblbody.rows[ctr].cells.namedItem(id).childNodes['0'].value.split('\\')[tblbody.rows[ctr].cells.namedItem(id).childNodes['0'].value.split('\\').length - 1]
                                        trChildId = tblbody.rows[ctr].cells.namedItem(id).childNodes['1'].id;
                                        if (imgname == "")
                                            imgname = tblbody.rows[ctr].cells.namedItem(id).childNodes['1'].value.split('/')[tblbody.rows[ctr].cells.namedItem(id).childNodes['1'].value.split('/').length - 1];
                                        //newly added
                                        SaveListFileToMain(id + "_" + ctr, imgname)
                                        imgname = $("#" + id + "_" + ctr).val();
                                        //todo one line
                                        // SaveListViewFileUpload(trChildId, imgname);
                                        // tblbody.rows[ctr].cells.MediaFileUpload.children.MediaFileUpload_0.value
                                        // value = tblbody.rows[ctr].cells[id].children[trChildId].value;
                                        value = imgname;
                                    }
                                    else {
                                        value = tblbody.rows[ctr].cells.namedItem(id).innerText == "" ? "" : tblbody.rows[ctr].cells.namedItem(id).innerHTML;
                                    }
                                    obj[id] = value;
                                }
                                else {
                                    isRowNull = true;
                                    r = listConfig.length + 1;
                                }
                            }
                            if (isRowNull == false) {
                                if (FieldName != dynamicFieldName)
                                    FieldName = dynamicFieldName;
                                obj['LineNo'] = lineNo;
                                FormView.FieldName = FieldName;
                                FormView[FieldName] = obj;

                                dFormListRowIndex = ctr;
                                var qry = "Select * From QueryConfig WHERE ScreenName = " + safeSQL(tmpScreenName);
                                //var dbDataRows = db.execute(qry);
                                execute(qry);
                                var dbDataRows = executeQry;
                                for (var t = 0; t < dbDataRows.length; t++) {
                                    var qry = dbDataRows[t]['QueryText'];
                                    qry += ' ' + dbDataRows[t]['GroupText'];
                                    qry += ' ' + dbDataRows[t]['OrderText'];
                                    qry = formatQueryString(qry, tmpScreenName);
                                    arrayQuery.push(qry);
                                }
                            }
                            // }
                        }

                        //if (ctr > 0 && ctr % 98 == 0) {
                        //    //window.setTimeout(function () {   // <YOUR TIME CONSUMING OPERATION GOES HERE> 
                        //    //}, 0);
                        //    window.sleep(2000);
                        //    ////  ctr++;
                        //    //_dataLenctr++;
                        //    //// alert("ddddd   " + ctr);
                        //    //// setInterval(function () { alert(" dvdvd  " +ctr); }, 1000);
                        //    ////window.setTimeout(function () { alert(ctr); }, 500);
                        //    //window.setTimeout(arguments.callee);
                        //    //break;
                        //}

                    } // end of DATA ROWS - for (var ctr = 0 ; ctr < _dataLen ; ctr++) {
                    LoadingImageClose();

                    dFormListRow = null;
                    dFormListRowIndex = -1;
                    //debugger;
                    //alert(arrayQuery);
                }

                ///////////////////////////////
            }
                //CreditNoteNewForm_LIST_SUM_EXECUTE_Item_Amount
            else if (arrDataMember[i].indexOf("_LIST_SUM_EXECUTE_") > -1 || arrDataMember[i].indexOf("_LIST_SUM_EXECUTE_") > -1) {//Execute Query FORMCONFIG _LIST_SUM_EXECUTE_
                //else if (arrDataMember[i].indexOf("_EXECUTE_LISTVIEW_") > -1 || arrDataMember[i].indexOf("_EXECUTE_FORM_LISTVIEW_") > -1) {//Execute Query FORMCONFIG LISTVIEW
                var tmpScreenName = arrDataMember[i];
                //
                //newly added 04.02.2020
                var arrTblFieldName = tmpScreenName.split("_LIST_SUM_EXECUTE_");
                var scrName = arrTblFieldName[0];
                //CurrentScreen_TabScreen_Name = arrTblFieldName[0];
                //dynamicFieldName = arrTblFieldName[1].split('_').length == 2 ? arrTblFieldName[1].split('_')[0] : tmpScreenName.split('_')[tmpScreenName.split('_').length - 1];
                //

                dynamicFieldName = dynamicFieldName == "" ? tmpScreenName.split('_')[tmpScreenName.split('_').length - 2] : dynamicFieldName;
                var tblbody = document.getElementById("ListBodyDivId_" + scrName + "_" + dynamicFieldName);
                //var tblbody = document.getElementById("ListBodyDivId_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName);
                var _data = tblbody.rows;
                var tdType = '';
                var id = '';
                var obj = {};
                var listConfig = ListHeaderList['ListConfig_' + scrName + '_' + dynamicFieldName];
                //var listConfig = ListHeaderList['ListConfig_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName];
                listId = tmpScreenName.split('_')[tmpScreenName.split('_').length - 1];
                var sumTotal = 0;
                if (_data.length > 0) {
                    dFormListRow = _data;

                    var _dataLen = _data.length;
                    if (_isdynamic == true)
                        _dataLen = _data.length - 1;

                    var lineNo = 0;
                    //for (var ctr = 0 ; ctr < _data.length - 1; ctr++) {
                    for (var ctr = 0 ; ctr < _dataLen; ctr++) {
                        if (tblbody.rows[ctr].cells.length == 0);
                        else {
                            tdType = tblbody.rows[ctr] == undefined ? "" : tblbody.rows[ctr].cells.length == 0 ? "" : getTableRowTDType(tblbody.rows[ctr].cells[listId].innerHTML);
                            if (tdType == "text") {
                                sumTotal = sumTotal + parseFloat(tblbody.rows[ctr].cells[listId].children[listId].value.replace(/,/g, ''));
                            }
                            else {

                                // =============================================================
                                // COMMENTED 17.03.2021
                                if (tblbody.rows[ctr].cells[listId].innerText == "" || typeof tblbody.rows[ctr].cells[listId].innerText === "undefined" ||
                                    tblbody.rows[ctr].cells[listId].innerText == null) {
                                    sumTotal = sumTotal + 0;
                                    //alert(0)
                                }
                                else {
                                    if (isNaN(parseFloat(tblbody.rows[ctr].cells[listId].innerText.replace(/,/g, '')))) {
                                        sumTotal = sumTotal + 0;
                                    }
                                    else {
                                        sumTotal = sumTotal + parseFloat(tblbody.rows[ctr].cells[listId].innerText.replace(/,/g, ''));
                                    }
                                    //sumTotal = sumTotal + parseFloat(tblbody.rows[ctr].cells[listId].innerText.replace(/,/g, ''));
                                    //alert(sumTotal);
                                }
                                // COMMENTED 17.03.2021
                                // =============================================================

                                //sumTotal = sumTotal + (tblbody.rows[ctr].cells[listId].innerText == "" ? 0 : parseFloat(tblbody.rows[ctr].cells[listId].innerText.replace(/,/g, '')));
                            }
                            //sumTotal = sumTotal + parseFloat(tblbody.rows[ctr].cells.namedItem(listId).childNodes['0'].value);
                        }
                    }
                }
                //alert(sumTotal);
                sumofColumn = sumTotal;

                ///////////////////////////////
            }

            else if (arrDataMember[i].indexOf("_LIST_CHECK_ACTIVE_") > -1 || arrDataMember[i].indexOf("_LIST_CHECK_ACTIVE_") > -1) {//Execute Query FORMCONFIG _LIST_SUM_EXECUTE_
                var tmpScreenName = arrDataMember[i];
                dynamicFieldName = dynamicFieldName == "" ? tmpScreenName.split('_')[tmpScreenName.split('_').length - 2] : dynamicFieldName;
                var tblbody = document.getElementById("ListBodyDivId_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName);
                var _data = tblbody.rows;
                var tdType = '';
                var id = '';
                var obj = {};
                var listConfig = ListHeaderList['ListConfig_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName];
                listId = tmpScreenName.split('_')[tmpScreenName.split('_').length - 1];
                var checkedCount = 0;
                if (_data.length > 0) {
                    for (var ctr = 0 ; ctr < _data.length - 1; ctr++) {
                        if (tblbody.rows[ctr].cells.length == 0);
                        else {
                            // value = tblbody.rows[iIndex].cells.namedItem(id).childNodes['0'].checked;
                            if (tblbody.rows[ctr].cells[listId].childNodes['0'].checked == true)
                                checkedCount++;
                        }
                    }
                }
                SumOfActive = checkedCount;
                //  alert("SumOfActive => " + SumOfActive);
                ///////////////////////////////
            }

            else if (arrDataMember[i].indexOf(sScreenName + "_MULTIPLEPHOTO_REMOVE_IMAGE") > -1) {
                var mScreenName = arrDataMember[i];//formdata.screenName + '_FORM_COMBOBOX_' + formdata.fieldName;
                var qry = getString['QueryConfig_' + mScreenName];
                qry += ' ' + getString['QueryConfig_' + mScreenName + '_GroupText'];
                qry += ' ' + getString['QueryConfig_' + mScreenName + '_OrderText'];
                qry = formatQueryString(qry, mScreenName);
                execute(qry);
                if (executeQry != null) {
                    for (var x = 0; x < executeQry.length; x++) {
                        var imgName = executeQry[x].ImgUrlString.split('/')[executeQry[x].ImgUrlString.split('/').length - 1];
                        RemoveMultiPhoto(imgName)
                    }
                }
            }
            else if (arrDataMember[i].indexOf(sScreenName + "_RemoveFile_") > -1) {
                var showImage = arrDataMember[i].split('_')[arrDataMember[i].split('_').length - 1];
                var fileId = arrDataMember[i].split('_')[arrDataMember[i].split('_').length - 2];

                var imgName = $('#' + fileId).val().split('/')[$('#' + fileId).val().split('/').length - 1];
                RemovePhoto(imgName);
                if ($('#' + showImage).attr('type') == 'image') {
                    $('#' + showImage).removeAttr("src", "");
                }
                if ($('#' + fileId).attr('type') == 'hidden')
                    $('#' + fileId).val("");
                if ($('#' + fileId + '_1').attr('type') == 'file')
                    $('#' + fileId + '_1').val(null);


                var ded = arrDataMember[i].split('_')[arrDataMember[i].split('_').length - 2];
                //RemoveMultiPhoto(imgname);

            }
            else if (arrDataMember[i].indexOf(sScreenName + "_FORM_COMBOBOX_") > -1) {
                //_EXECUTE_FORM_COMBOBOX_
                var arrFormFields = getFormFieldNames();

                var str = arrDataMember[i];
                var arr = str.split("_FORM_COMBOBOX_");

                var mScreenName = arrDataMember[i];//formdata.screenName + '_FORM_COMBOBOX_' + formdata.fieldName;
                // var qry = getQueryConfigByScreenName(mScreenName);
                var qry = getString['QueryConfig_' + mScreenName];
                qry += ' ' + getString['QueryConfig_' + mScreenName + '_GroupText'];
                qry += ' ' + getString['QueryConfig_' + mScreenName + '_OrderText'];
                qry = formatQueryString(qry, mScreenName);

                //var qry = Ti.App.ARRAYOPERATION.getQueryConfigByScreenName(mScreenName);
                //qry += ' ' + Titanium.App.Properties.getString('QueryConfig_' + mScreenName + '_GroupText');
                //qry += ' ' + Titanium.App.Properties.getString('QueryConfig_' + mScreenName + '_OrderText');
                // qry = UI.formatQueryString(qry, mScreenName);

                //alert('qry --> ' + qry);

                if (qry != undefined) {

                    //var field = getFormComponent(arr[1]);
                    var field = getFormComponentArrayOperations(arr[1]);

                    execute(qry);
                    if (executeQry != null)
                        populateDropDown(executeQry, field.fieldName);

                    //future TODO
                    //comboData = createComboBoxData(qry);

                    ////var field = Ti.App.ARRAYOPERATION.getFormComponent(arr[1]);
                    ////comboData = Ti.App.ARRAYOPERATION.createComboBoxData(qry);
                    ////alert('Combo Length --> '+comboData.length);
                    //try {
                    //    if (comboData.length > 0) {
                    //        field.ComboBoxData = comboData;

                    //        field.value = comboData[0].displayText;
                    //        field.code = comboData[0].ComboBoxCode;
                    //    } else {
                    //        field.ComboBoxData = [];
                    //        field.value = '';
                    //        field.code = '';
                    //    }
                    //} catch (e) { }
                }

            }
            else if (arrDataMember[i].indexOf(sScreenName + "_LIST_COMBOBOX_") > -1
                    || arrDataMember[i].indexOf("_LIST_COMBOBOX_") > -1) {

                // SalesOrderForm_LIST_COMBOBOX_Warehouse
                //OrderUOMEditNewForm_LIST_COMBOBOX_UOM
                // "MaintainLeadSKUList", "LstMLSKU", "ListBodyDivId_MaintainLeadSKUList_LstMLSKU", 0
                ///
                //newly added 04.02.2020 //jsu
                var tmpScreenName = arrDataMember[i];
                sScreenName = tmpScreenName.split("_LIST_COMBOBOX_")[0];
                ///
                DropDownIdList = [];
                comboboxdata = {};
                var dataMember = arrDataMember[i].split('_')[arrDataMember[i].split('_').length - 1];
                comboboxdata.DataMember = arrDataMember[i].split('_')[arrDataMember[i].split('_').length - 1];
                comboboxdata.ScreenName = sScreenName;
                comboboxdata.FormListType = "List";
                DropDownIdList.push(comboboxdata);
                var lstNam = FormView[dataMember] == undefined ? "" : FormView[dataMember].FieldName.split('_')[0];
                var cnt = _listLookUpIndex == "" ? 0 : _listLookUpIndex == -1 ? 0 : _listLookUpIndex;
                //   var ttbody = _listLookUpttbody == "" ? "ListBodyDivId_" + sScreenName.split('_')[0] + "_" + dataMember : _listLookUpttbody;
                if (FieldName == lstNam || lstNam == "" || lstNam == undefined) {
                    var ttbody = _listLookUpttbody == "" ? "ListBodyDivId_" + sScreenName.split('_')[0] + "_" + FieldName : _listLookUpttbody;
                    GetListDropDownListValue(sScreenName, FieldName, ttbody, cnt);
                }
                else {
                    var ttbody = _listLookUpttbody == "" ? "ListBodyDivId_" + sScreenName.split('_')[0] + "_" + lstNam : _listLookUpttbody;
                    GetListDropDownListValue(sScreenName, lstNam, ttbody, cnt);
                }
            }
            else if (arrDataMember[i].indexOf(sScreenName + "_LIST_SETFILETYPE_") > -1) {
                var mScreenName = arrDataMember[i];//formdata.screenName + '_FORM_COMBOBOX_' + formdata.fieldName;
                var qry = getString['QueryConfig_' + mScreenName];
                qry += ' ' + getString['QueryConfig_' + mScreenName + '_GroupText'];
                qry += ' ' + getString['QueryConfig_' + mScreenName + '_OrderText'];
                qry = formatQueryString(qry, mScreenName);
                execute(qry);

                var tblbody = document.getElementById(_ttbody);
                var id = '';
                var value = '';

                for (var key in executeQry[0]) {
                    // COMMENTED 22.02.2021 ============
                    // value = executeQry[currentRowIndex][key]

                    // REMEADY HERE ===============
                    value = executeQry[0][key]
                    // COMMENTED 22.02.2021 ============

                    id = key.split('.')[2];

                    // COMMENTED 22.02.2021 ==================
                    // tblbody.rows[iIndex].cells.namedItem(id).childNodes['0'].value = '';
                    // tblbody.rows[iIndex].cells.namedItem(id).childNodes['0'].accept = value;
                    tblbody.rows[currentRowIndex].cells.namedItem(id).childNodes['0'].value = '';
                    tblbody.rows[currentRowIndex].cells.namedItem(id).childNodes['0'].accept = value;
                }
            }

            else if (arrDataMember[i].indexOf(sScreenName + "_FORM_MULTIPLEPHOTO_") > -1) {
                //_EXECUTE_FORM_COMBOBOX_
                var arrFormFields = Ti.App.ARRAYOPERATION.getFormFieldNames();

                /************************************					
                                    var str = arrDataMember[i];
                                    var arr = str.split("_FORM_MULTIPLEPHOTO_");
                                    var sMultiplePhotoView = Ti.App.ARRAYOPERATION.getFormComponent(arr[1]);
                                    
                                    try{
                                        var length = sMultiplePhotoView.children.length;
                                        for (var ctr = length-1; ctr >= 0; ctr--) {	
                                            var childView = sMultiplePhotoView.children[ctr];
                                            if (childView != undefined || childView != null) {
                                                sMultiplePhotoView.remove(childView);
                                                childView = null;
                                            }
                                        }
                                    }catch(e){}
                                    
                                    
                                    if(bIsAndroid){
                                        var dir = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, 'MultiplePhoto_tmp');
                                    }else{
                                        var dir =  Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'MultiplePhoto_tmp');
                                    }
                                    
                                    var dMultiplePhotoIndex = 0;
                                    var bImgFound = false;
                                    
                                    var dirItems = dir.getDirectoryListing();
                                    var directoryArr = dirItems.toString().split(',');
                                    
                                    directoryArr.push("camdisplay.simg");
                                    
                                    for(i=0; i < directoryArr.length; i++){
                                        
                                        bImgFound = false;
                                        if(bIsAndroid){
                                            file = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, 'MultiplePhoto_tmp', directoryArr[i]);
                                        }else{
                                            file =  Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'MultiplePhoto_tmp', directoryArr[i]);
                                        }
                                        if (file.exists()) {
                                            bImgFound = true;
                                            var imgPath = file.nativePath;
                                            file = null;
                                        }else{
                                            file = null;
                                            bImgFound = false;
                                            var imgPath = '/images/camdisplay.simg';
                                        }
                                        
                                        var ImgCtrlView = Ti.App.BasicViewObj.createBasicView(null, 'transparent', sMultiplePhotoView.height, (sMultiplePhotoView.height * 0.8), 0, 0, 0, 0, '');
                                        var img = new BasicImageView().createImageView(null, imgPath, 'auto', 'auto');//formdata.dValueWidth * pWidth, formdata.ValueHeight);
                                        img.enableZoomControls  = false;
                                        img.fieldControl = sMultiplePhotoView.fieldControl;
                                        img.fieldName = sMultiplePhotoView.fieldName;
                                        img.dataMember = sMultiplePhotoView.dataMember;
                                        img.DataMemberType = sMultiplePhotoView.DataMemberType;
                                        img.index = dMultiplePhotoIndex;
                                        img.bMultiplePhoto = true;
                                        img.borderWidth = 1;
                                        img.borderColor = '#e8e8e8';
                                        img.bImgFound = bImgFound;
                                        img.imgPath = imgPath;
                                        img.sFieldControlType = 'MULTIPLEPHOTO';
                                        img.addEventListener('click', function(e) {
                                            try {
                                                //mController.showCamera(this, e.source.fieldName);
                                                
                                                if(this.bImgFound == false){
                                                    Controller.prototype.showCamera(this, e.source.fieldName);
                                                }else{
                                                    Controller.prototype.showPreviewPopup(this, e.source.fieldName);
                                                }
                                            } catch(e) {}
                                        });
                                        sMultiplePhotoView.add(img);
                                        
                                        dMultiplePhotoIndex = dMultiplePhotoIndex + 1;
                                    }
                                    
                /************************************/

                /************************************					
                                    var str = arrDataMember[i];
                                    var arr = str.split("_FORM_MULTIPLEPHOTO_");
                                    
                                    var mScreenName = arrDataMember[i];//formdata.screenName + '_FORM_COMBOBOX_' + formdata.fieldName;
                                    var qry = Ti.App.ARRAYOPERATION.getQueryConfigByScreenName(mScreenName);
                                    qry += ' ' + Titanium.App.Properties.getString('QueryConfig_'+mScreenName+'_GroupText');
                                    qry += ' ' + Titanium.App.Properties.getString('QueryConfig_'+mScreenName+'_OrderText');
                                    qry = UI.formatQueryString(qry, mScreenName);
                                    
                                    //alert('qry --> ' + qry);
                                    
                                    if (qry != undefined) {
                                        
                                        var sMultiplePhotoView = Ti.App.ARRAYOPERATION.getFormComponent(arr[1]);
                                        
                                        
                                        //sMultiplePhotoView
                                        try{
                                            var length = sMultiplePhotoView.children.length;
                                            for (var ctr = length-1; ctr >= 0; ctr--) {	
                                                var childView = sMultiplePhotoView.children[ctr];
                                                if (childView != undefined || childView != null) {
                                                    sMultiplePhotoView.remove(childView);
                                                    childView.image = '';
                                                    childView.url = '';
                                                    childView = null;
                                                }
                                            }
                                        }catch(e){}
                                        
                                        
                                        var dMultiplePhotoIndex = 0;
                                        var db = new dbConnection().createDataBaseConnection();
                                        var dbDataRows = db.execute(qry);
                                        var bImgFound = false, test = '';
                                        while (dbDataRows.isValidRow()) {
                                            
                                            bImgFound = false;
                                            test = dbDataRows.fieldByName('ImgName');
                                            test =  (test == null || test == undefined || test == '') ? '' : test;
                                            var file = null;
                                            var image2 = '/images/camdisplay.simg';
                                            if(test != ''){	
                                                if(bIsAndroid){
                                                    file = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, 'MultiplePhoto_tmp', test);
                                                }else{
                                                    file =  Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, test);
                                                }
                                                
                                                //alert('file.exists() : ' + file.exists());
                                                
                                                if (file.exists()) {
                                                    bImgFound = true;
                                                    var imgPath = file.nativePath;
                                                    //var image2 = ImageFactory.imageAsResized(file.read(), { width: 640, height: 480 });
                                                    var image2 = ImageFactory.imageAsResized(file.read(), { width: sMultiplePhotoView.ImgWidth, height: sMultiplePhotoView.ImgHeight });
                                                    file = null;
                                                }else{
                                                    file = null;
                                                    bImgFound = false;
                                                    var imgPath = '/images/camdisplay.simg';
                                                    var image2 = '/images/camdisplay.simg';
                                                }
                                            }else{
                                                file = null;
                                                bImgFound = false;
                                                var imgPath = '/images/camdisplay.simg';
                                                var image2 = '/images/camdisplay.simg';
                                            }	
                                            
                                            var ImgCtrlView = Ti.App.BasicViewObj.createBasicView(null, 'transparent', sMultiplePhotoView.height, (sMultiplePhotoView.height * 0.8), 0, 0, 0, 0, '');
                                            var img = new BasicImageView().createImageView(null, image2, 'auto', 'auto');//formdata.dValueWidth * pWidth, formdata.ValueHeight);
                                            img.height = sMultiplePhotoView.ImgHeight;
                                            img.width = sMultiplePhotoView.ImgWidth;
                                            
                                            img.enableZoomControls  = false;
                                            img.fieldControl = sMultiplePhotoView.fieldControl;
                                            img.fieldName = sMultiplePhotoView.fieldName;
                                            img.dataMember = sMultiplePhotoView.dataMember;
                                            img.DataMemberType = sMultiplePhotoView.DataMemberType;
                                            img.index = dMultiplePhotoIndex;
                                            img.bMultiplePhoto = true;
                                            img.borderWidth = 1;
                                            img.borderColor = '#e8e8e8';
                                            img.bImgFound = bImgFound;
                                            img.imgPath = imgPath;
                                            img.imgName = test;
                                            img.sControlType = 'MULTIPLEPHOTO';
                                            img.screenName = sMultiplePhotoView.screenName;
                                            img.addEventListener('click', function(e) {
                                                try {
                                                    //mController.showCamera(this, e.source.fieldName);
                                                    
                                                    if(this.bImgFound == false){
                                                        Controller.prototype.showCamera(this, e.source.fieldName);
                                                    }else{
                                                        Controller.prototype.showPreviewPopup(this, e.source.fieldName);
                                                    }
                                                } catch(e) {}
                                            });
                                            sMultiplePhotoView.add(img);
                                            
                                            dMultiplePhotoIndex = dMultiplePhotoIndex + 1;
                                            dbDataRows.next();
                                        }
                                        dbDataRows.close();
                                        db.close();
                                    }
                /************************************/
                var str = arrDataMember[i];
                var arr = str.split("_FORM_MULTIPLEPHOTO_");
                var sMultiplePhotoView = Ti.App.ARRAYOPERATION.getFormComponent(arr[1]);
                //sMultiplePhotoView
                try {
                    try {
                        var length = sMultiplePhotoView.children.length;
                    } catch (e) {
                        var length = 0;
                    }

                    var imgPath = '/images/camdisplay.simg';
                    var image2 = '/images/camdisplay.simg';

                    var ImgCtrlView = Ti.App.BasicViewObj.createBasicView(null, 'transparent', sMultiplePhotoView.height, (sMultiplePhotoView.height * 0.8), 0, 0, 0, 0, '');
                    var img = new BasicImageView().createImageView(null, image2, 'auto', 'auto');//formdata.dValueWidth * pWidth, formdata.ValueHeight);
                    img.height = sMultiplePhotoView.ImgHeight;
                    img.width = sMultiplePhotoView.ImgWidth;

                    img.enableZoomControls = false;
                    img.fieldControl = sMultiplePhotoView.fieldControl;
                    img.fieldName = sMultiplePhotoView.fieldName;
                    img.dataMember = sMultiplePhotoView.dataMember;
                    img.DataMemberType = sMultiplePhotoView.DataMemberType;
                    img.index = length;
                    img.bMultiplePhoto = true;
                    img.borderWidth = 1;
                    img.borderColor = '#e8e8e8';
                    img.bImgFound = false;//bImgFound;
                    img.imgPath = imgPath;
                    img.imgName = '';//test;
                    img.sControlType = 'MULTIPLEPHOTO';
                    img.screenName = sMultiplePhotoView.screenName;
                    img.addEventListener('click', function (e) {
                        try {
                            //mController.showCamera(this, e.source.fieldName);

                            if (this.bImgFound == false) {
                                Controller.prototype.showCamera(this, e.source.fieldName);
                            } else {
                                Controller.prototype.showPreviewPopup(this, e.source.fieldName);
                            }
                        } catch (e) { }
                    });
                    sMultiplePhotoView.add(img);
                } catch (e) { }
                /************************************/
                //Form-DisplayTrackingDetails_EXECUTE_FORM_MULTIPLEPHOTO_MultiPhoto					
            }
            else if (arrDataMember[i].indexOf(sScreenName + "_EXECUTE_FORM_MULTIPLEPHOTO_") > -1) {//Execute Query LISTCONFIG LISTVIEW
                var str = arrDataMember[i];
                var arr = str.split("_EXECUTE_FORM_MULTIPLEPHOTO_");
                var mScreenName = arrDataMember[i];//formdata.screenName + '_FORM_COMBOBOX_' + formdata.fieldName;

                var element = document.getElementById(arr[1] + "_Div");
                var numberOfChildren = element.children.length;
                //lect * from queryconfig where screenname  like '%CustomerProductForm_MultiPhoto_SAVEPHOTO%'  

                //CustomerProductForm_EXECUTE_FORM_MULTIPLEPHOTO_MultiPhoto
                var scrName = currentScreenName + "_" + arr[1] + "_SAVEPHOTO";
                var qry = "Select * From QueryConfig WHERE ScreenName = " + safeSQL(scrName);
                execute(qry);
                var qry1 = executeQry[0].QueryText;
                qry1 += ' ' + executeQry[0].GroupText;
                qry1 += ' ' + executeQry[0].OrderText;

                var qry2 = '';

                var imgname = '';
                var filesId = '';
                for (var z = 0; z < (numberOfChildren - 1) ; z++) {
                    FormView.ImgCount = (z + 1);
                    $('#ImgCount').val(z + 1);
                    qry2 = formatQueryString(qry1, mScreenName);
                    execute(qry2);
                    imgname = executeQry[0].imgname;
                    filesId = element.children[z].children.files.id;
                    SaveMultiPhotoImageUpload(filesId, imgname);
                    //SAVEPHOTO(fieldNameId);

                    qry = "Select * From QueryConfig WHERE ScreenName = " + safeSQL(arrDataMember[i]);
                    execute(qry);
                    var dbDataRows = executeQry;
                    for (var t = 0; t < dbDataRows.length; t++) {
                        qry = dbDataRows[t]['QueryText'];
                        qry += ' ' + dbDataRows[t]['GroupText'];
                        qry += ' ' + dbDataRows[t]['OrderText'];
                        qry = formatQueryString(qry, tmpScreenName);
                        arrayQuery.push(qry);
                    }
                }

                str = null; arr = null;
                mScreenName = null; sMultiplePhotoView = null;

            } else if (arrDataMember[i].indexOf(sScreenName + "_EXECUTE_FORM") > -1) {//Execute Query LISTCONFIG LISTVIEW
                //Ti.App.ARRAYOPERATION.setFormConfigFieldNames(sScreenName);
                setFormConfigFieldNames(sScreenName);//ARRAYOPERATION
                dListRowIndex = -1;
                dFormListRowIndex = -1; dFormListRow = null;
                var tmpScreenName = sScreenName + "_EXECUTE_FORM";
                //  var db = new dbConnection().createDataBaseConnection();
                // var qry = "Select * From QueryConfig WHERE ScreenName = " + Ti.App.SQL.safeSQL(tmpScreenName);
                var qry = "Select * From QueryConfig WHERE ScreenName = " + safeSQL(tmpScreenName);
                // var dbDataRows = db.execute(qry);
                execute(qry);
                var dbDataRows = executeQry;
                //while (dbDataRows.isValidRow()) {
                if (dbDataRows.length > 0) {
                    for (var i = 0; i < dbDataRows.length; i++) {
                        var qry = dbDataRows[i].QueryText;
                        qry += ' ' + dbDataRows[i].GroupText;
                        qry += ' ' + dbDataRows[i].OrderText;
                        qry = formatQueryString(qry, tmpScreenName);
                        //Ti.App.DBCOMMON.ExecuteSQL(qry);
                        arrayQuery.push(qry);
                        //   dbDataRows.next();
                    }
                }
                //dbDataRows.close();
                //db.close();
            } else if (arrDataMember[i].indexOf("_EXECUTE_LIST") > -1) {//Execute Query LISTCONFIG LISTVIEW
                dListRowIndex = -1;
                dFormListRowIndex = -1; dFormListRow = null;
                Ti.App.ARRAYOPERATION.loadListConfigArr(sScreenName);
                Ti.App.ARRAYOPERATION.setTableHeaderFieldNames(sScreenName);
                var rows = Ti.App.ARRAYOPERATION.getAllRows(0);
                var db = new dbConnection().createDataBaseConnection();
                for (var _i = COMMON.getRowIndex() ; _i < rows.length; _i++) {
                    UI.setselectedRowIndex(_i);
                    dListRowIndex = _i;
                    var tmpScreenName = sScreenName + "_EXECUTE_LIST";
                    var qry = "Select * From QueryConfig WHERE ScreenName = " + Ti.App.SQL.safeSQL(tmpScreenName);
                    var dbDataRows = db.execute(qry);
                    while (dbDataRows.isValidRow()) {
                        var qry = dbDataRows.fieldByName('QueryText');
                        qry += ' ' + dbDataRows.fieldByName('GroupText');
                        qry += ' ' + dbDataRows.fieldByName('OrderText');
                        qry = UI.formatQueryString(qry, tmpScreenName);
                        //Ti.App.DBCOMMON.ExecuteSQL(qry);
                        arrayQuery.push(qry);
                        dbDataRows.next();
                    }
                    dbDataRows.close();
                }
                db.close();
                dListRowIndex = -1;
            } else if (arrDataMember[i].indexOf("_EXECUTE") > -1) {//Execute Query LISTCONFIG LISTVIEW
                dListRowIndex = -1;
                dFormListRowIndex = -1; dFormListRow = null;
                var tmpScreenName = arrDataMember[i];
                var db = new dbConnection().createDataBaseConnection();
                var qry = "Select * From QueryConfig WHERE ScreenName = " + Ti.App.SQL.safeSQL(tmpScreenName);
                var dbDataRows = db.execute(qry);
                while (dbDataRows.isValidRow()) {
                    var qry = dbDataRows.fieldByName('QueryText');
                    qry += ' ' + dbDataRows.fieldByName('GroupText');
                    qry += ' ' + dbDataRows.fieldByName('OrderText');
                    qry = UI.formatQueryString(qry, tmpScreenName);
                    //Ti.App.DBCOMMON.ExecuteSQL(qry);
                    arrayQuery.push(qry);
                    dbDataRows.next();
                }
                dbDataRows.close();
                db.close();
                dListRowIndex = -1;
            } else {

                var sScreenName = arrDataMember[i];
                //var qry = Ti.App.ARRAYOPERATION.getQueryConfigByScreenName(sScreenName);
                //setgetString
                //var qry = getQueryConfigByScreenName(sScreenName); //ArrayOperations
                qry = getString['QueryConfig_' + sScreenName];
                qry += ' ' + getString['QueryConfig_' + sScreenName + '_GroupText'];
                qry += ' ' + getString['QueryConfig_' + sScreenName + '_OrderText'];
                //qry += ' ' + Titanium.App.Properties.getString('QueryConfig_' + sScreenName + '_GroupText');
                //qry += ' ' + Titanium.App.Properties.getString('QueryConfig_' + sScreenName + '_OrderText');
                // qry = UI.formatQueryString(qry, sScreenName);
                //debugger;
                qry = formatQueryString(qry, sScreenName);


                //arrayQuery.push(qry);
                // return;
                //var qry = arrDataMember[i];
                //qry = UI.formatQueryString(qry, tmpScreenName);
                //  var db = new dbConnection().createDataBaseConnection();
                var sActionfieldName = '', sActionfieldValue = '';

                // var dbDataRows = db.execute(qry);
                //if (qry.toLowerCase().split('update mdt set').length == 2 && _action == 'edit');
                //else {

                //newAdd after command----
                //if (sScreenName == "Re-CalculateSuggestedOrderQuantity") {
                //    executeSuggestedOrderQuantity(qry);
                //    return;
                //}
                //else
                //    execute(qry);

                //newAdd ----
                var isasync = (qry.toLowerCase().indexOf("exec ") > -1) ? true : false;
                isExecute = true;
                qry = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(qry), encryptkey, { keySize: 128 / 8, iv: encryptiv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
                var params = "{'query':'" + qry + "'}";
                if (isasync == true)
                    LoadingImageOpen();


                $.ajax({
                    type: "POST",
                    url: url_GetActionConfigData,
                    data: params,
                    contentType: "application/json;charset=utf-8",
                    // dataType: "json",
                    async: isasync,
                    success: function (results) {
                        if (isasync == true)
                            LoadingImageClose();
                        executeStringQry = results;
                        executeQry = $.parseJSON(results);

                        //------

                        var dbDataRows = executeQry;
                        var fieldCount = getFieldCount(dbDataRows);//sql
                        fieldCount = (fieldCount == null || fieldCount == undefined || fieldCount == '') ? 0 : fieldCount;


                        if ((fieldCount > 1 || isListLookUpClicked == false) && _listLookUpIndex == -1) {//text  and button onchange event
                            _listLookUpIndex++;
                            var ttbody = "ListBodyDivId_" + sScreenName.split('_')[0] + "_" + sScreenName.split('_')[2];
                            var tfoot = "ListfootDivId_" + sScreenName.split('_')[0] + "_" + sScreenName.split('_')[2];
                            $("#" + ttbody).empty();
                            $('#' + tfoot).empty();
                            objAddDynamicListCount['ListConfig_' + ttbody] = -1;
                            CreateList(ttbody, tfoot, currentScreenName, 1, "", FieldName, '', '', 1);
                        }
                        //
                        var isLstView = false;

                        if (isMultiselectRowClear == true) {
                            $("#" + _listLookUpttbody).empty();
                            _listLookUpIndex = 0;
                            objAddDynamicListCount['ListConfig_' + _listLookUpttbody] = -1;
                            CreateList(_listLookUpttbody, _listLookUpttbody.replace('ListBodyDivId_', 'ListfootDivId_'), currentScreenName, 1, "", FieldName.split('_')[0], '', '', 1);
                            isMultiselectRowClear = false;
                        }
                        for (var fieldCnt = 0; fieldCnt < fieldCount; fieldCnt++) {
                            for (var key in dbDataRows[fieldCnt]) {
                                if (key.indexOf("FormView.") > -1 && key.indexOf(".", 9) > -1) {
                                    isLstView = true;

                                    var value = dbDataRows[fieldCnt][key]
                                    var id = key.split('.')[2];
                                    _listLookUpIndex = _listLookUpIndex == "" ? 0 : _listLookUpIndex == -1 ? 0 : _listLookUpIndex;
                                    _listLookUpttbody = _listLookUpttbody == "" ? "ListBodyDivId_" + sScreenName.split('_')[0] + "_" + sScreenName.split('_')[2] : _listLookUpttbody;
                                    var tblbody = document.getElementById(_listLookUpttbody);



                                    // if (tblbody.rows[_listLookUpIndex].cells.namedItem(id).childNodes['0'].childNodes.length == 1) {
                                    var tdType = tblbody.rows[_listLookUpIndex] == undefined ? "" : getTableRowTDType(tblbody.rows[_listLookUpIndex].cells.namedItem(id).innerHTML);
                                    //newly added JSU and cmmon
                                    //var tddataMemberType = tblbody.rows[_listLookUpIndex] == undefined ? "" : getTableDataMemberType(tblbody.rows[_listLookUpIndex].cells.namedItem(id).innerHTML);

                                    for (var e = 0; e < arrList.length; e++) {
                                        if (arrList[e].DataMember == id) {
                                            dataMemberType = arrList[e].DataMemberType;
                                            if (dataMemberType == 'NUMBERFORMAT' || dataMemberType == 'AMOUNTNUMBERFORMAT') {
                                                value = GetNumberAndAmountNumberFormat(value, dataMemberType);
                                            }
                                            e = arrList.length + 1;
                                        }
                                    }

                                    if (tdType == "text" || tdType == "select" || tdType == "hidden") {
                                        if (tdType == "select") {
                                            //alert(value);
                                            tblbody.rows[_listLookUpIndex].cells.namedItem(id).childNodes['0'].value = value;
                                        }
                                        else {
                                            tblbody.rows[_listLookUpIndex].cells.namedItem(id).childNodes['0'].value = value;
                                        }
                                    }
                                    else if (tdType == "checkbox") {
                                        tblbody.rows[_listLookUpIndex].cells.namedItem(id).childNodes['0'].checked = value;
                                    }
                                    else if (tdType == "link") {
                                        var linkId = tblbody.rows[_listLookUpIndex].cells.namedItem(id).childNodes['0'].id;
                                        $("a#" + linkId).attr('href', value);
                                        $("a#" + linkId).text(value.split('\\')[value.split('\\').length - 1]);
                                        $("a#" + linkId).text(value.split('/')[value.split('/').length - 1]);
                                    }
                                    else if (tdType == "button");
                                    else if (tdType == "lookup") {
                                        tblbody.rows[_listLookUpIndex].cells.namedItem(id).childNodes['0'].children[id].value = value;
                                    }
                                    else if (tdType == "label") {
                                        tblbody.rows[_listLookUpIndex].cells.namedItem(id).innerText = value;
                                    }
                                    else {
                                        tblbody.rows[_listLookUpIndex].cells.namedItem(id).innerText = value;
                                        //alert(tblbody.rows[_listLookUpIndex].cells.namedItem(id).innerText);
                                        //setListValue("", id, _listLookUpIndex, _listLookUpttbody);
                                        //tblbody.rows[_listLookUpIndex].cells.namedItem(id).innerText = value;
                                        //  tblbody.rows[_listLookUpIndex-1)].cells[id].innerHTML = value;
                                    }

                                    // COMMENTED 09.11.2020 ======================
                                    setListValue("", id, _listLookUpIndex, _listLookUpttbody);
                                }
                                else {
                                    isLstView = false;
                                    var fieldValue = dbDataRows[0][key]
                                    var arrFieldName = key.split('FormView.');
                                    if (fieldValue == "") isValidateList = false;
                                    if (fieldValue != "") {
                                        for (var g = 0; g < arrfrm.length; g++) {
                                            if (arrfrm[g].DataMember == arrFieldName[1]) {
                                                dataMemberType = arrfrm[g].DataMemberType;
                                                if (dataMemberType == 'NUMBERFORMAT' || dataMemberType == 'AMOUNTNUMBERFORMAT') {
                                                    fieldValue = GetNumberAndAmountNumberFormat(fieldValue, dataMemberType);
                                                    g = arrfrm.length + 1;
                                                }
                                            }
                                        }
                                    }

                                    if ($('#' + arrFieldName[1]).attr('type') == 'image') {
                                        //if (fieldValue == "") {
                                        $('#' + arrFieldName[1]).removeAttr("src", "");
                                        $('#' + arrFieldName[1]).removeAttr("src");
                                        //}
                                        //else
                                        if (fieldValue != "No files selected." && fieldValue != null && fieldValue.indexOf('.simg') > 0)
                                            GetBase64Image(arrFieldName[1], fieldValue)
                                        else {
                                            if (isFileAcceptType == 'mp4' || isFileAcceptType == 'mov' || isFileAcceptType == 'mkv' || isFileAcceptType == 'webm' || isFileAcceptType == 'avi' || isFileAcceptType == 'mov' || isFileAcceptType == '3gp') {
                                                $('#' + arrFieldName[1]).attr("src", "../ImportFiles/Images/video.png");
                                            }
                                            else if (isFileAcceptType == 'pdf') {
                                                $('#' + arrFieldName[1]).attr("src", "../Images/pdf.jpg");
                                            }
                                            else if (isFileAcceptType == 'pptx' || isFileAcceptType == 'ppt' || isFileAcceptType == 'pptm' || isFileAcceptType == 'ppsx') {
                                                $('#' + arrFieldName[1]).attr("src", "../Images/Powerpoint.png");
                                            }
                                            else {
                                                if (fieldValue.split('/').length > 1)
                                                    $('#' + arrFieldName[1]).attr("src", fieldValue);
                                                else
                                                    $('#' + arrFieldName[1]).attr("src", SaveImagePath + "/" + fieldValue);
                                            }
                                        }

                                    }
                                    else if ($('#' + arrFieldName[1])[0] != undefined && $('#' + arrFieldName[1])[0].className == "datepicker") {
                                        $('#' + arrFieldName[1]).val(fieldValue);
                                        $('#' + arrFieldName[1]).data("DateTimePicker").date(moment(new Date(fieldValue)).format(_format));
                                    }
                                    else {
                                        $('#' + arrFieldName[1]).val(fieldValue);
                                        // $('#' + arrFieldName[1]).text(fieldValue);
                                    }
                                }
                            }

                            if ((fieldCount > 1) && _listLookUpttbody != "" && isLstView == true) {//text  and button onchange event
                                _listLookUpIndex++;
                                var tfoot = "ListfootDivId_" + sScreenName.split('_')[0] + "_" + sScreenName.split('_')[2];
                                CreateList(_listLookUpttbody, tfoot, currentScreenName, 1, "", FieldName, '', '', 1);
                            }

                            if (_isdynamic == true && isValidateList == true) {
                                lookUpPopUpClose();
                                if (isValidateList == true) {

                                    // COMMENTED 15.02.2021 ==========================================
                                    //dynamicNewRowAdd();

                                    if (key.indexOf("FormView.") > -1 && key.indexOf(".", 9) > -1) {
                                        dynamicNewRowAdd();
                                    }
                                    // COMMENTED 15.02.2021 ==========================================

                                    isValidateList = false;
                                }
                                //  isValidateList = false;
                            }
                            else if (isFormLookUpClicked == true) {
                                //if (isFormLookUpClicked == true) {
                                lookUpPopUpClose();
                            }
                            else if (isListLookUpClicked == true && isValidateList == true) {
                                lookUpPopUpClose();
                                isValidateList = false;
                            }

                        }
                        if (fieldCount == 1) {
                            var _url = '';
                            var isAdressDistance = false;
                            //var addrDate='';
                            var addrSalesmanTerritory = $('#SalesmanTerritory').val();


                            // COMMENTED 04.12.2020 
                            // var addrDate = DateFormateChange($('#Date').val());
                            // BELOW METHOD IS CHANGED 
                            var addrDate = DateFormateChange_Format(systemTableConfig['DATEFORMATSTRING'], $('#Date').val());



                            if (dbDataRows[0].GETADDRESS == "GETADDRESS") {
                                //url = "../Reports/GETADDRESS/?date=" + $('#Date').val() + "&SalesmanTerritory=" + $('#SalesmanTerritory').val() + "";
                                //_url = "/Reports/GETADDRESS";
                                //  url = "../Reports/GETADDRESS/?date=" + addrDate + "&SalesmanTerritory=" + $('#SalesmanTerritory').val() + "";
                                _url = url_GETADDRESS;
                                isAdressDistance = true;
                            }
                            else if (dbDataRows[0].GETDISTANCE == "GETDISTANCE") {
                                //_url = "/Reports/GETDISTANCE";
                                _url = url_GETDISTANCE;
                                isAdressDistance = true;
                                addrDate = '';
                                addrSalesmanTerritory = '';
                            }
                            else if (dbDataRows[0].LOADSERVICE == "LOADSERVICE") {
                                var addrSalesmanTerritory = $('#SalesmanTerritory').val();
                                var addrFromDate = DateFormateChange($('#FromDate').val());
                                var addrToDate = DateFormateChange($('#ToDate').val());
                                var userid = _UserID;
                                var servicetype = $('#ServiceType').val();
                                var reasoncode = $('#Reason').val();
                                //_url = "/Reports/LOADSERVICE";
                                _url = url_LOADSERVICE;
                                isAdressDistance = false;

                                $.ajax({
                                    url: _url,
                                    type: 'POST',
                                    dataType: 'json',
                                    async: false,
                                    data: { fromdate: addrFromDate, todate: addrToDate, salesmanterritory: addrSalesmanTerritory, userid: userid, servicetype: servicetype, reasoncode: reasoncode },                            //data: { query: qry },
                                    success: function (results) {
                                        var ddfsf = results;
                                    },
                                    error: function (results, q, a) {
                                        alert(results);
                                    }
                                });

                            }
                            else if (dbDataRows[0].LOADTOPUP == "LOADTOPUP") {
                                var addrSalesmanTerritory = $('#SalesmanTerritory').val();
                                var addrFromDate = DateFormateChange($('#FromDate').val());
                                var addrToDate = DateFormateChange($('#ToDate').val());
                                var addrmachine = $('#Machine').val();
                                var userid = _UserID;
                                //var servicetype = $('#ServiceType').val();
                                //var reasoncode = $('#Reason').val();
                                //_url = "/Reports/LOADSERVICE";
                                _url = url_LOADTOPUP;
                                isAdressDistance = false;

                                $.ajax({
                                    url: _url,
                                    type: 'POST',
                                    dataType: 'json',
                                    async: false,
                                    data: { fromdate: addrFromDate, todate: addrToDate, salesmanterritory: addrSalesmanTerritory, machine: addrmachine, userid: userid },                            //data: { query: qry },
                                    success: function (results) {
                                        var ddfsf = results;
                                    },
                                    error: function (results, q, a) {
                                        alert(results);
                                    }
                                });

                            }
                            else if (dbDataRows[0].LOADTAKEPHOTO == "LOADTAKEPHOTO") {
                                var addrSalesmanTerritory = $('#SalesmanTerritory').val();
                                var addrFromDate = DateFormateChange($('#FromDate').val());
                                var addrToDate = DateFormateChange($('#ToDate').val());
                                var userid = _UserID;
                                //var servicetype = $('#ServiceType').val();
                                //var reasoncode = $('#Reason').val();
                                //_url = "/Reports/LOADSERVICE";
                                _url = url_LOADTAKEPHOTO;
                                isAdressDistance = false;

                                $.ajax({
                                    url: _url,
                                    type: 'POST',
                                    dataType: 'json',
                                    async: false,
                                    data: { fromdate: addrFromDate, todate: addrToDate, salesmanterritory: addrSalesmanTerritory, userid: userid },                            //data: { query: qry },
                                    success: function (results) {
                                        var ddfsf = results;
                                    },
                                    error: function (results, q, a) {
                                        alert(results);
                                    }
                                });

                            }
                            else if (dbDataRows[0].LOADDAILYORDERDETAILREPORT == "LOADDAILYORDERDETAILREPORT") {
                                var addrTerms = $('#Terms').val();
                                var addrSalesmanTerritory = $('#SalesmanTerritory').val();
                                var addrFromDate = DateFormateChange($('#FromDate').val());
                                var addrToDate = DateFormateChange($('#ToDate').val());
                                var company = "";
                                var userid = _UserID;
                                //var servicetype = $('#ServiceType').val();
                                //var reasoncode = $('#Reason').val();
                                //_url = "/Reports/LOADSERVICE";
                                _url = url_LOADDAILYORDERDETAILREPORT;
                                isAdressDistance = false;

                                $.ajax({
                                    url: _url,
                                    type: 'POST',
                                    dataType: 'json',
                                    async: false,
                                    data: { fromdate: addrFromDate, todate: addrToDate, PayTerms: addrTerms, salesmanterritory: addrSalesmanTerritory, CompanyName: company, userid: userid },                            //data: { query: qry },
                                    success: function (results) {
                                        var ddfsf = results;
                                    },
                                    error: function (results, q, a) {
                                        alert(results);
                                    }
                                });

                            }
                            else if (dbDataRows[0].LOADMETERREADING == "LOADMETERREADING") {
                                // string fromdate, string todate, string salesmanterritory, string userid
                                var addrSalesmanTerritory = $('#SalesmanTerritory').val();
                                var addrFromDate = DateFormateChange($('#FromDate').val());
                                var addrToDate = DateFormateChange($('#ToDate').val());
                                var userid = _UserID;
                                _url = url_LOADMETERREADING;
                                isAdressDistance = false;

                                $.ajax({
                                    url: _url,
                                    type: 'POST',
                                    dataType: 'json',
                                    async: false,
                                    data: { fromdate: addrFromDate, todate: addrToDate, salesmanterritory: addrSalesmanTerritory, userid: userid },                            //data: { query: qry },
                                    success: function (results) {
                                        var ddfsf = results;
                                    },
                                    error: function (results, q, a) {
                                        alert(results);
                                    }
                                });

                            }
                            else if (dbDataRows[0].LOADPRICESURVEY == "LOADPRICESURVEY") {
                                //var addrSalesmanTerritory = $('#SalesmanTerritory').val();
                                var addrFromDate = DateFormateChange($('#FromDate').val());
                                var addrToDate = DateFormateChange($('#ToDate').val());
                                var userid = _UserID;
                                //_url = "/Reports/LOADPRICESURVEY";
                                _url = url_LOADPRICESURVEY;
                                isAdressDistance = false;

                                $.ajax({
                                    url: _url,
                                    type: 'POST',
                                    dataType: 'json',
                                    async: false,
                                    data: { fromdate: addrFromDate, todate: addrToDate, userid: userid },
                                    //data: { query: qry },
                                    success: function (results) {
                                        var ddfsf = results;
                                    },
                                    error: function (results, q, a) {
                                        alert(results);
                                    }
                                });

                            }
                            else if (dbDataRows[0].LOADCOMPETITORTRACKING == "LOADCOMPETITORTRACKING") {
                                //var addrSalesmanTerritory = $('#SalesmanTerritory').val();
                                //var addrFromDate = DateFormateChange($('#FromDate').val());
                                //var addrToDate = DateFormateChange($('#ToDate').val());
                                var brand = $('#Brand').val();
                                var userid = _UserID;
                                //_url = "/Reports/LOADCOMPETITORTRACKING";
                                _url = url_LOADCOMPETITORTRACKING;
                                isAdressDistance = false;

                                $.ajax({
                                    url: _url,
                                    type: 'POST',
                                    dataType: 'json',
                                    async: false,
                                    data: { brand: brand, userid: userid },
                                    //data: { query: qry },
                                    success: function (results) {
                                        var ddfsf = results;
                                    },
                                    error: function (results, q, a) {
                                        alert(results);
                                    }
                                });

                            }

                            else if (dbDataRows[0].LOADVMI == "LOADVMI") {
                                //var addrSalesmanTerritory = $('#SalesmanTerritory').val();
                                //var addrFromDate = DateFormateChange($('#FromDate').val());
                                //var addrToDate = DateFormateChange($('#ToDate').val());
                                var Distributor = $('#Distributor').val();
                                var userid = _UserID;
                                //_url = "/Reports/LOADVMIREPORT";
                                _url = url_LOADVMI;
                                isAdressDistance = false;

                                $.ajax({
                                    url: _url,
                                    type: 'POST',
                                    dataType: 'json',
                                    async: false,
                                    data: { Distributor: Distributor },
                                    //data: { query: qry },
                                    success: function (results) {
                                        var ddfsf = results;
                                    },
                                    error: function (results, q, a) {
                                        alert(results);
                                    }
                                });

                            }
                            if (isAdressDistance) {
                                $.ajax({
                                    url: _url,
                                    type: 'POST',
                                    dataType: 'json',
                                    async: false,
                                    data: { date: addrDate, SalesmanTerritory: addrSalesmanTerritory },
                                    //data: { query: qry },
                                    success: function (results) {
                                        var ddfsf = results;
                                    },
                                    error: function (results, q, a) {
                                        alert(results);
                                    }
                                });
                            }
                        }

                        // TiAPIinfo('db.rowsAffected : ' + db.rowsAffected);
                        TiAPIinfo('db.rowsAffected : ' + db);

                        //Now not need this condition. future will be need
                        if (dbDataRows != null && false) {
                            // while (dbDataRows.isValidRow()) {
                            //var fieldCount = Ti.App.SQL.getFieldCount(dbDataRows);
                            for (var fieldCnt = 0; fieldCnt < fieldCount; fieldCnt++) {

                                sActionfieldName = dbDataRows.fieldName(fieldCnt);
                                sActionfieldValue = dbDataRows.fieldByName(sActionfieldName);
                                if (sActionfieldName != '') {
                                    //NEED TO DO UPDATE FORM LISTVIEW
                                    if (sActionfieldName.indexOf('FormView.') > -1) {
                                        var arrFieldName = sActionfieldName.split('FormView.');
                                        Ti.App.ARRAYOPERATION.setFormComponentValue(arrFieldName[1], sActionfieldValue);
                                    } else if (sActionfieldName.indexOf('ListView.') > -1) {
                                        var arrFieldName = sActionfieldName.split('ListView.');
                                        Ti.App.ARRAYOPERATION.updateColumnData(0, Ti.App.ARRAYOPERATION.getSelectedRowIndex(), arrFieldName[1], sActionfieldValue);
                                    }
                                }
                            }
                            dbDataRows.next();
                        }
                        //dbDataRows.close();
                        //db.close();


                        /*//sDataMember -> ACTION QUERY
                        
                        //select custno as [formview.listview.abc] from customers  
                                listview.abc -> update listview 'abc' field value by selectrowindex
                        //select custno as [formview.abc] from customers  
                                formview.abc -> update formview 'abc' field value
                        //select custno as [listview.abc] from customers  
                                listview.abc -> update listview 'abc' field value by selectrowindex
                        */

                        //newAdd ----
                        isExecute = false;
                        if (isasync == true) {
                            handleFieldAction(tempsScreenName, tempsFieldName, tempsDataMember, (temphFAi + 1));
                            PerformAction(tempsActionEvent, tempobjData, (tempPAi + 1));
                        }
                    },
                    error: function (results, q, a) {
                        alert("test : : " + results);
                    }

                });
                //------
            }


            //endexec
            /*
        SCREENNAME_INSERT  ->  
        SCREENNAME_INSERT_FORM -> execute( Formatstring - Select * From QueryConfig WHERE Screenname = 'SCREENNAME_INSERT_FORM') 
        SCREENNAME_INSERT_LISTVIEW_FieldName (Save TableData)
        
             */
        }


        if (arrayQuery.length > 0) {
            // Ti.App.DBCOMMON.BulkInsertQueries(arrayQuery);
            if (arrayQuery[0].trim().toLowerCase().indexOf('select') == 0) { }
            else
            {
                BulkInsertQueries(arrayQuery);
            }

        }
    } catch (e) {
        TiAPIinfo('e ---> ' + e);
        //alert('e ---> ' + e);
    }
}

function getDateFormat(strValue, FieldName) {
    var i;
    var _format = systemTableConfig["DATEFORMATSTRING"].toString().toLowerCase();

    for (i = 0; i < arrList.length; i++) {
        if (arrList[i].FieldControl.toString().toUpperCase() == "DATEPICKER" && FieldName == arrList[i].DataMember) {
            if (_format.toLowerCase().indexOf("dd") == 0) {
                returnDate = DateFormateChangeDDMM("dd/mm/yyyy", strValue);
            }
            else if (_format.toLowerCase().indexOf("mm") == 0) {
                returnDate = DateFormateChangeDDMM("mm/dd/yyyy", strValue);
            }
            return returnDate;
        }
    }

    return strValue;

}

function replaceQueryString(key, queryName) {

    TiAPIinfo('key -> ' + key);

    if (key.toUpperCase() == 'CUSTNO') {
        return Ti.App.SQL.safeSQL(Ti.App.CustNo);
    }
    else if (key.toUpperCase() == 'SUMOFCOLUMN') {
        return (sumofColumn);
    }
    else if (key.toUpperCase() == 'ALLOFLIST') {
        return (AllOfList);
    }
    else if (key.toUpperCase() == 'SUMOFACTIVE') {
        return (SumOfActive);
    }
    else if (key.toUpperCase() == "FORMVIEW.USERID") {
        return (agentID);
    }
    else if (key.toUpperCase() == "FORMVIEW.AUTOLISTSELECT") {
        return (FormView.AUTOLISTSELECT);
    }
    else if (key.toUpperCase() == "AUTOLISTSELECT") {
        return (AUTOLISTSELECT);
    }
    else if (key.toUpperCase() == 'AGENTID') {
        return (agentID);
        //return Ti.App.SQL.safeSQL(Ti.App.agentID);
    } else if (key.toUpperCase() == "ORIENTATION") {
        return Ti.App.SQL.safeSQL(dOrientation);
    } else if (key.toUpperCase() == "MULTIIMGFILENAME") {
        return Ti.App.SQL.safeSQL(sMultiImgFileName);
    } else if (key.toUpperCase() == 'SEARCHTEXT') {
        sSearchText = (sSearchText == null || sSearchText == '') ? '' : sSearchText;
        if (sSearchText == '') {
            return Ti.App.SQL.safeSQL(sSearchText);
        }
        return Ti.App.SQL.handleSingleQuote(sSearchText);//this.handleSingleQuote(value); //'SEARACHTEXT'
    } else if (key.toUpperCase() == 'SEARCHTEXTVAL' || key.toUpperCase() == 'SEARCHTEXTVALUE') {
        sSearchText = (sSearchText == null || sSearchText == '') ? '' : sSearchText;
        return Ti.App.SQL.safeSQL(sSearchText);//this.handleSingleQuote(value); //'SEARACHTEXT'
    }


    else if (key.toUpperCase() == 'ITEMID' || key.toUpperCase() == 'ITEMNO') {
        return Ti.App.SQL.safeSQL(sItemNo);
    } else if (key.toUpperCase() == 'CUSTOMERID') {
        return Ti.App.SQL.safeSQL(Ti.App.CustNo);
    } else if (key.toUpperCase() == 'UOM') {
        return Ti.App.SQL.safeSQL(sUOM);
    }


    else if (key.toUpperCase() == 'BARCODEVALUE') {//sBarcodeValue
        return Ti.App.SQL.safeSQL(sBarcodeValue);
    }


    else if (key.toUpperCase() == 'TRANSDOCNO') {//TransDocNo
        return Ti.App.SQL.safeSQL(sTransDocNo);
    }



    //{WSResponse.access_token}
    if (key.indexOf("WSResponse.") > -1) {
        TiAPIinfo('WSResponse : ' + JSON.stringify(WSResponse));
        return Ti.App.SQL.safeSQL(eval(key));
    }

    //Select CASE WHEN ifnull({RESULTSET.AllotTo},'') = '' THEN 1 ELSE 0 END as ResetColumnWidth
    if (key.indexOf("RESULTSET.") > -1) {
        var arrKey = key.split("RESULTSET.");
        var arrKeyVal = arrKey[1];
        return Ti.App.SQL.safeSQL(ResultSet.fieldByName(arrKeyVal));
    }

    try {

        if (key.indexOf("Params.FormView.") > -1 && key.indexOf(".", 16) > -1) {
            var arrFields = key.split('.');
            var sValue = Params.FormView["" + arrFields[2] + ""]["" + arrFields[3] + ""].toString()

            return (sValue);
        }
        else if (key.indexOf("Params.FormView.") > -1 || key.indexOf("Param.FormView.") > -1) {
            var arrFields = key.split('.');
            //var sValue = Params.FormView["" + arrFields[2] + ""].toString()
            var sValue = Params.FormView["" + arrFields[2] + ""] == undefined ? "" : Params.FormView["" + arrFields[2] + ""].toString()
            return (sValue);


        }

        else if (key.indexOf("Params.") > -1 || key.indexOf("Param.") > -1) {//{Params.fieldName
            var arrKey = key.split(".");
            return Ti.App.SQL.safeSQL(objParams[arrKey[1]]);
        } else if (key.indexOf("FormView.ListView.") > -1) {
            var arrFields = key.split('ListView.');
            var keyValue = arrFields[1];
            //if (keyValue == "DiscountPrice")
            //    debugger;
            var sValue = '';
            if (keyValue == "UserNo") {
                sValue = tempUserNo;
            }
                //else {
                //    sValue = FormView["" + FieldName + ""]["" + keyValue + ""].toString();
                //}
            else if (FieldName == undefined) {
                sValue = FormView["" + arrFields[1] + ""]["" + keyValue + ""].toString();
            }
            else {
                try {
                    sValue = FormView["" + FieldName + ""]["" + keyValue + ""].toString();

                    // COMMENTED 12.04.2021 ==============================================
                    // IF IT IS DATEPICKER THEN CONVERT DATA AS DATEFORMAT IN SYSTEM TABLE

                    sValue = getDateFormat(FormView["" + FieldName + ""]["" + keyValue + ""].toString(), keyValue);


                    // COMMENTED 12.04.2021 ==============================================


                }
                catch (e) {
                    // COMMENTED 12.11.2020 ===
                    sValue = FormView["" + FieldName.split('_')[0] + ""]["" + keyValue + ""].toString();
                }

            }

            //info('arrFields[1] : ' + arrFields[1] + ' - sValue : ' + sValue);
            TiAPIinfo('arrFields[1] : ' + arrFields[1] + ' - sValue : ' + sValue);

            sValue = (sValue == '' || sValue == undefined || sValue == null) ? '' : sValue;
            //FieldName = '';
            //qry = qry.Replace("{" + key + "}", "'" + objKeyValue + "'");
            return (sValue);

            ////Formview.ListView  Formview.CustNo
            //var arrFields = key.split('FormView.ListView.');
            //var sValue = Ti.App.ARRAYOPERATION.getFormListViewComponentValue(arrFields[1]);
            TiAPIinfo('arrFields[1] : ' + arrFields[1] + ' - sValue : ' + sValue);

            //sValue = (sValue == '' || sValue == undefined || sValue == null) ? '' : sValue;
            //return Ti.App.SQL.safeSQL(sValue);

        }
        else if (key.indexOf("FormView.") > -1 && key.indexOf(".", 9) > -1) {
            var arrFields = key.split('.');

            //// COMMENTED 07.09.2020 ====
            //if (FormView["" + arrFields[1] + ""] == undefined)
            //{
            //    return ("''");
            //}

            //var sValue = FormView["" + arrFields[1] + ""]["" + arrFields[2] + ""] == undefined ? "''" : FormView["" + arrFields[1] + ""]["" + arrFields[2] + ""].toString();

            if (key.split('.').length == 4 && key.split('.')[3] == "ALL") {
                var fldName = arrFields[1];
                var arrFields1 = arrFields[1];
                var arrFields2 = arrFields[2];
                var tblId = "ListBodyDivId_" + currentScreenName + "_" + arrFields[1];
                var tblbody = document.getElementById(tblId);
                var ttbodyId = tblId;
                var _data = tblbody.rows;
                var isSuccess = true;
                var ids = "''";
                if (_data.length > 0) {
                    for (var ctr = 0 ; ctr < _data.length - 1 ; ctr++) {
                        if (tblbody.rows[ctr].cells.length > 0) {
                            SubSetListValue("", "ListViewSub", ctr, ttbodyId);
                            // COMMENTED 11.01.2021 ==================
                            //if (ids == '')
                            if (ProjectName.toLowerCase() == "mm") {
                                if (ids == "''") {
                                    //ids =  FormView["ListViewSub"]["" + arrFields2 + ""].toString() + "'";
                                    ids = FormView["ListViewSub"]["" + arrFields2 + ""].toString();
                                    //else if (ctr == _data.length - 2)
                                    //    ids = ids + "," + "'" + FormView["ListViewSub"]["" + arrFields2 + ""].toString();
                                }
                                else {
                                    ids = ids + "," + FormView["ListViewSub"]["" + arrFields2 + ""].toString();
                                }
                            }
                            else {
                                if (ids == "''") {
                                    //ids =  FormView["ListViewSub"]["" + arrFields2 + ""].toString() + "'";
                                    ids = "'" + FormView["ListViewSub"]["" + arrFields2 + ""].toString() + "'";
                                    //else if (ctr == _data.length - 2)
                                    //    ids = ids + "," + "'" + FormView["ListViewSub"]["" + arrFields2 + ""].toString();
                                }
                                else {
                                    ids = ids + "," + "'" + FormView["ListViewSub"]["" + arrFields2 + ""].toString() + "'";
                                }
                            }
                        }
                    }
                    if (ProjectName.toLowerCase() == "mm") {
                        if (ids.length > 0) {
                            ids = "'" + ids + "'";
                        }
                    }
                }
                sValue = ids;

                return sValue;
            }

            if (FormView["" + arrFields[1] + ""] == undefined) {
                return ("''");
                //return "";
            }

            var sValue = FormView["" + arrFields[1] + ""]["" + arrFields[2] + ""] == undefined ? "" : FormView["" + arrFields[1] + ""]["" + arrFields[2] + ""].toString();



            return (sValue);
        }
            // COMMENTED 11.01.2021 =======================================
            //else if (key.indexOf("FormView.") > -1 && key.indexOf(".", 9) > -1) {
            //    var arrFields = key.split('.');

            //    //// COMMENTED 07.09.2020 ====
            //    //if (FormView["" + arrFields[1] + ""] == undefined)
            //    //{
            //    //    return ("''");
            //    //}

            //    //var sValue = FormView["" + arrFields[1] + ""]["" + arrFields[2] + ""] == undefined ? "''" : FormView["" + arrFields[1] + ""]["" + arrFields[2] + ""].toString();

            //    if (FormView["" + arrFields[1] + ""] == undefined) {
            //        return ("''");
            //        //return "";
            //    }

            //    var sValue = FormView["" + arrFields[1] + ""]["" + arrFields[2] + ""] == undefined ? "" : FormView["" + arrFields[1] + ""]["" + arrFields[2] + ""].toString();


            //    if (key.split('.').length == 4 && key.split('.')[3] == "ALL") {
            //        var fldName = arrFields[1];
            //        var arrFields1 = arrFields[1];
            //        var arrFields2 = arrFields[2];
            //        var tblId = "ListBodyDivId_" + currentScreenName + "_" + arrFields[1];
            //        var tblbody = document.getElementById(tblId);
            //        var ttbodyId = tblId;
            //        var _data = tblbody.rows;
            //        var isSuccess = true;
            //        var ids = "''";
            //        if (_data.length > 0) {
            //            for (var ctr = 0 ; ctr < _data.length - 1 ; ctr++) {
            //                if (tblbody.rows[ctr].cells.length > 0) {
            //                    SubSetListValue("", "ListViewSub", ctr, ttbodyId);
            //                    if (ids == '')
            //                        //ids =  FormView["ListViewSub"]["" + arrFields2 + ""].toString() + "'";
            //                        ids = "'" + FormView["ListViewSub"]["" + arrFields2 + ""].toString() + "'";
            //                        //else if (ctr == _data.length - 2)
            //                        //    ids = ids + "," + "'" + FormView["ListViewSub"]["" + arrFields2 + ""].toString();
            //                    else
            //                        ids = ids + "," + "'" + FormView["ListViewSub"]["" + arrFields2 + ""].toString() + "'";
            //                }
            //            }
            //        }
            //        sValue = ids;
            //    }
            //    return (sValue);
            //}
        else if (key.indexOf("FormView.") > -1) {

            //Formview.ListView  Formview.CustNo
            var arrFields = key.split('FormView.');
            var sValue = getFormComponentValue(arrFields[1]);//ArrayOperations
            //info('arrFields[1] : ' + arrFields[1] + ' - sValue : ' + sValue);
            TiAPIinfo('arrFields[1] : ' + arrFields[1] + ' - sValue : ' + sValue);

            if ((sValue == false || sValue == true));
            else {
                sValue = (sValue == '' || sValue == undefined || sValue == null) ? '' : sValue;
                sValue = sValue != "" ? sValue : arrFields[1] == "UserID" ? FormView["" + arrFields[1] + ""] != undefined ? FormView["" + arrFields[1] + ""].toString() : dataFieldIdList.UserID : "";
            }
            return (sValue);//SQL

        } else if (key.indexOf("ListView.") > -1) {
            var arrFields = key.split('ListView.');
            //info('arrFields -> ' + JSON.stringify(arrFields));
            TiAPIinfo('arrFields -> ' + JSON.stringify(arrFields));
            var keyValue = arrFields[1];
            var sValue = FormView["" + FieldName + ""]["" + keyValue + ""].toString();
            //info('LISTVIEW - ' + Ti.App.ARRAYOPERATION.getColumnData(0, rowIndex, arrFields[1]));
            //info('LISTVIEW - ' + sValue);
            TiAPIinfo('LISTVIEW -> ' + sValue);
            sValue = (sValue == '' || sValue == undefined || sValue == null) ? '' : sValue;
            //qry = qry.Replace("{" + key + "}", "'" + objKeyValue + "'");
            return (sValue);

            //Old Code
            //var arrFields = key.split('ListView.');
            //TiAPIinfo('arrFields -> ' + JSON.stringify(arrFields));
            //var rowIndex = Ti.App.ARRAYOPERATION.getSelectedRowIndex();
            TiAPIinfo('rowIndex -> ' + rowIndex);
            //if (rowIndex > -1) {
            //    Ti.API.info('LISTVIEW - ' + Ti.App.ARRAYOPERATION.getColumnData(0, rowIndex, arrFields[1]));
            //    var sValue = Ti.App.ARRAYOPERATION.getColumnData(0, rowIndex, arrFields[1]);
            //    sValue = (sValue == '' || sValue == undefined || sValue == null) ? '' : sValue;
            //    return Ti.App.SQL.safeSQL(sValue);
            //}
        }



        //FORMCONFIG FIELDS
        try {
            var arrFormFields = [];
            var arrFields = Ti.App.ARRAYOPERATION.getFormFieldNames();
            for (var i = 0; i < arrFields.length; i++) {
                if (key.toUpperCase() == arrFields[i]) {
                    //alert(arrFields[i] + ' - ' + Ti.App.ARRAYOPERATION.getFormComponentValue(arrFields[i]));
                    Ti.API.info(arrFields[i] + ' - ' + Ti.App.ARRAYOPERATION.getFormComponentValue(arrFields[i]));
                    var sValue = Ti.App.ARRAYOPERATION.getFormComponentValue(arrFields[i]);
                    sValue = (sValue == '' || sValue == undefined || sValue == null) ? '' : sValue;
                    i = arrFields.length;
                    return Ti.App.SQL.safeSQL(sValue);
                }
            }
        } catch (e) {
            //info('REPALCE QUERY STRING ERROR  -> ' + e);
            //info('REPALCE QUERY STRING ERROR  -> ' + JSON.stringify(e));
            TiAPIinfo('REPALCE QUERY STRING ERROR  -> ' + e);
            TiAPIinfo('REPALCE QUERY STRING ERROR  -> ' + JSON.stringify(e));

            var sTmp = '';
            return Ti.App.SQL.safeSQL(sTmp);//key;
        }

        //LISTCONFIG FIELDS
        try {
            if (dListRowIndex > -1) {
                var arrFormFields = [];
                var arrFields = Ti.App.ARRAYOPERATION.getTableHeaderFieldNames();
                for (var i = 0; i < arrFields.length; i++) {
                    if (key.toUpperCase() == arrFields[i]) {
                        Ti.API.info(arrFields[i] + ' - ' + Ti.App.ARRAYOPERATION.getColumnData(0, dListRowIndex, arrFields[i]));
                        var sValue = Ti.App.ARRAYOPERATION.getColumnData(0, dListRowIndex, arrFields[i]);
                        sValue = (sValue == '' || sValue == undefined || sValue == null) ? '' : sValue;
                        i = arrFields.length;
                        return Ti.App.SQL.safeSQL(sValue);
                    }
                }
            }
        } catch (e) {
        }

        //FORMCONFIG LISTVIEW
        try {
            if (dFormListRowIndex > -1 && dFormListRow != null) {
                var arrFormFields = [];
                var arrFields = Ti.App.ARRAYOPERATION.getTableHeaderFieldNames();
                for (var i = 0; i < arrFields.length; i++) {
                    if (key.toUpperCase() == arrFields[i]) {
                        Ti.API.info(arrFields[i] + ' - ' + Ti.App.ARRAYOPERATION.getGivenDataRowComponent(dFormListRow, 0, dFormListRowIndex, arrFields[i]));
                        var sValue = Ti.App.ARRAYOPERATION.getGivenDataRowComponent(dFormListRow, 0, dFormListRowIndex, arrFields[i]);
                        sValue = (sValue == '' || sValue == undefined || sValue == null) ? '' : sValue;
                        i = arrFields.length;
                        return Ti.App.SQL.safeSQL(sValue);
                    }
                }
            }
        } catch (e) {
        }

    } catch (e) {

        //alert('e ---> ' + e);
        // info(' REPLACE QUERY STRING ERROR : e ---> ' + e);
        TiAPIinfo(' REPLACE QUERY STRING ERROR : e ---> ' + e);
        return '';
    }

    /*obj.arrFormFields = arrFields;
    obj.arrFormFieldsValue = arrFormFields;
    
    
    obj.arrTblFields = arrFields;
    obj.arrTblFormFields = arrTblFormFields;
    */
    var sTmp = '';
    return Ti.App.SQL.safeSQL(sTmp);//key;
}

function alertDialogClick(obj) {
    var _obj = {};
    _obj.fieldName = obj.messageCode;
    // _obj.fieldName = obj.fieldName;
    _obj.value = obj.index;
    _obj.Type = 'ALERT';
    PerformAction('alertDialogClick', _obj);
}

function alertDialogClickOld(obj) {

    if (obj.index == 1) {
        bCancel = true;
    } else {
        bCancel = false;
    }

    TiAPIinfo('alert bCancel ' + bCancel);
    var sType = obj.type;
    sType = (sType == null || sType == undefined) ? '' : sType;
    if (sType.toUpperCase() == 'Synchronization'.toUpperCase()) {
        try {


            if (obj.index == 0) {
                //ADMIN SYNC
                var MDT = Titanium.App.Properties.getString('MDT_NO');//DETAILS.get('MDT_NO');
                Titanium.App.Properties.setString('SYNC_SCREEN', 'USER');

                COMMON.showIndicator('Loading Please Wait...');
                Ti.App.SendAllDataObj = {};
                COMMON.resetXML();
                Ti.App.isDashboardScreen = false;
                Ti.App.dashBoardItemClicked = false;
                //obj.controller = ArrayOperations.prototype;
                Ti.App.bEnableAndroidBackButton = false;
                Ti.App.SendAllDataObj = {};//obj;
                //sending all data to sever 
                var SendData = require('/utils/SendData');
                var SENDDATAOBJ = new SendData();
                SENDDATAOBJ.SendAllDatatoServer();
                return true;
            } else {
                Ti.App.dashBoardItemClicked = false;
                Ti.App.bEnableAndroidBackButton = true;
                return "";
            }

        } catch (e) {
            COMMON.showAlert("Sync failed | Please try again.", ['OK'], null);
            return false;
        }

    }

    if (sType.toUpperCase() == 'LOGOUT') {
        if (obj.index == 0) {
            var url = Ti.App.ARRAYOPERATION.getSystemValue('CustomAPI') + "/api/accountapi/logout";//"http://115.111.51.209:85/api/accountapi/Login";
            var client = Ti.Network.createHTTPClient({
                onload: function (e) {
                    TiAPIinfo("Received text1: " + this.responseText);
                    //var sResponseText = JSON.parse(this.responseText);  
                    TiAPIinfo("sResponseText " + sResponseText);

                    Ti.App.sLoginUserName = '';
                    Ti.App.sLoginPassword = '';
                    Ti.App.DBCOMMON.ExecuteSQL("DELETE FROM WMS_UserLogin");
                    UI.closeWindow();
                },

                onerror: function (e) {
                    TiAPIinfo("error " + e.error);
                    //Ti.App.DBCOMMON.ExecuteSQL("DELETE FROM WMS_UserLogin");
                    UI.closeWindow();
                },
            });
            client.open("GET", url);
            client.setRequestHeader('ApiResponseType', 'application/json');
            //client.setRequestHeader('username', 'admin');//'admin');
            //client.setRequestHeader('password', 'abc');//'abc');
            client.setRequestHeader('username', Ti.App.sLoginUserName);//'admin');
            client.setRequestHeader('password', Ti.App.sLoginPassword);//'abc');
            client.send();
        }
        return false;
    }

    //obj.type = "ProceedIgnoreButton"
    if (sType.toUpperCase() == 'PROCEEDIGNOREBUTTON') {
        if (obj.index != 0) {
            Ti.App.DBCOMMON.ExecuteSQL("DELETE From WMS_MessageList WHERE rowId in (Select rowId from WMS_MessageList Order by rowId DESC limit 0,1)");
            return "";
        }

        obj.ActualfieldName = (obj.ActualfieldName == null || obj.ActualfieldName == undefined) ? '' : obj.ActualfieldName;
        TiAPIinfo('obj.ActualfieldName' + obj.ActualfieldName);
        if (obj.ActualfieldName == 'IgnoreBtn' || obj.ActualfieldName == 'NextBtn' || obj.ActualfieldName == 'UpdateBtn' || obj.ActualfieldName == 'DisBinType') {
            Ti.App.sformButtonClickaaPA = true;
            Controller.prototype.formButtonClicked("IgnoreBtn");
        } else if (obj.ActualfieldName.toUpperCase() == 'Save'.toUpperCase() || obj.ActualfieldName.toUpperCase() == 'Confirm'.toUpperCase()) {
            var iobjData = {};
            iobjData.fieldName = obj.ActualfieldName;
            Ti.API.info('iobjData.fieldName ' + iobjData.fieldName);
            //Controller.prototype.PerformAction('HandlePOSTResponse', iobjData);
            Controller.prototype.PerformAction('menuItemClicked', iobjData);

        }
        return "";
    }

    if (TempLogwrite == true) {
        Ti.App.ARRAYOPERATION.debug('ALERT DIALOG CLICK ', Ti.App.currentScreenName);
    }
    var _obj = {};
    _obj.fieldName = obj.fieldName;//obj.messageCode;
    _obj.value = obj.index;
    _obj.Type = 'ALERT';
    PerformAction('alertDialogClick', _obj);
}




