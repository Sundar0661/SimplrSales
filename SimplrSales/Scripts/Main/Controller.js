const { geoProjection } = require('d3-geo');

var arrActionQuery = [];
var params = null;
var objParams = {};
var selectedListColumnName = '';
var selectedListColumnNo = 0;
var sumofColumn = 0;
var sumofRowCount = 0;
var AllOfList = '';

var SumOfActive = 0;
var ListActiveIDs = new Array();
var isValidateList = false;
var _dataLenctr = 0;
var FieldName = '';
var logstr = '';
var isPOPUPIMAGECONTAINER = false;
var SQL_JAVASCRIPTRESULT = "RESULT";
var isVehicleAssignment = false;
var _isDefault;



var TempLogwrite = getSystemValue('TempLogwrite');//ArrayOperations
TempLogwrite = (TempLogwrite != null && TempLogwrite != undefined && (TempLogwrite == 1 || TempLogwrite == '1' || TempLogwrite == true || TempLogwrite == 'true')) ? true : false;


var setIntervaltimer = null;

function windowPreparingToOpen(currentScreenName) {
    sTransDocNo = getSystemValue("PDAID");//ArrayOperations//+ "" + Ti.App.SQL.getTransDocNo();
    try {
        _varObj = {};
        sSearchText = ''; sBarcodeValue = '';
        arrActionQuery = [];
        var BaseQty = 0;
        var dbDataRows = "";
        
        //var qry = "SELECT * FROM ActionConfig WHERE ScreenName='" + currentScreenName + "'  ORDER By ActionName, DisplayNo";
        var qry = "SELECT * FROM ActionConfig WHERE ScreenName='" + currentScreenName + "' and solutionname like '" + SolutionName + "'  ORDER By  DisplayNo";
        if (currentScreenName == "ItemPromotionForm" || currentScreenName == "InvoicePromotionForm")
            qry = "SELECT * FROM ActionConfig WHERE ScreenName like '%" + currentScreenName + "%' and solutionname like '" + SolutionName + "' ORDER By ActionName, DisplayNo";

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
                dbDataRows = results;

            },
            error: function (results, q, a) {
                if (results.responseText == "sessionexpired") {
                    PageLogOut("sessionexpired");
                }
                else
                    alert(results);
            }
        });

        if (dbDataRows == null) {
            //alert('Your Session is expired.');
            //PageLogOut();
        }
        else {

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
    } catch (e) {
        alert('Set ActionConfig Error : ' + e);
    }
}

var executeQry = '';
var executeStringQry = '';
function execute(qry) {
    var qqq = qry;
    if (qry != "") {
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
               
                executeStringQry = results;
                executeQry = $.parseJSON(results);
                return results;
            },
            error: function (results, q, a) {
                // alert("test : : " + results);
              
                    PageLogOut("sessionexpired");
              
            }

        });
    }
}


function execute1(qry) {
    var qqq = qry;
    if (qry != "") {
        qry = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(qry), encryptkey, { keySize: 128 / 8, iv: encryptiv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
        var params = "{'query':'" + qry + "'}";
        $.ajax({
            type: "POST",
            url: url_GetActionConfigData1,
            data: params,
            contentType: "application/json;charset=utf-8",
            // dataType: "json",
            async: false,
            success: function (results) {

                executeStringQry = results;
                executeQry = $.parseJSON(results);
                return results;
            },
            error: function (results, q, a) {
                // alert("test : : " + results);

                PageLogOut("sessionexpired");

            }

        });
    }
}


function executeQueryConfig(qry) {
    var qqq = qry;
    if (qry != "") {
        qry = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(qry), encryptkey, { keySize: 128 / 8, iv: encryptiv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
        var params = "{'query':'" + qry + "'}";
        $.ajax({
            type: "POST",
            url: url_GetActionConfigData,
            data: params,
            contentType: "application/json;charset=utf-8",
            // dataType: "json",
            async: true,
            success: function (results) {
                executeStringQry = results;
                executeQry = $.parseJSON(results);
                var dbDataRows = executeQry;
                var scrName = "";
                if (dbDataRows != null && dbDataRows.length > 0) {
                    for (var i = 0; i < dbDataRows.length; i++) {
                        //setgetString
                        if (dbDataRows[i].QueryText != null && dbDataRows[i].QueryText != "") {
                            getString["QueryConfig_" + dbDataRows[i].ScreenName + ""] = dbDataRows[i].QueryText.toString().trim(); //.toString().trim() newly addedby.M 10.01.2023
                            getString["QueryConfig_" + dbDataRows[i].ScreenName + "_GroupText"] = dbDataRows[i].GroupText.toString().trim();
                            getString["QueryConfig_" + dbDataRows[i].ScreenName + "_OrderText"] = dbDataRows[i].OrderText.toString().trim();
                        }
                    }
                }
                //return results;
            },
            error: function (results, q, a) {
                // alert("test : : " + results);
            }

        });
    }
}


function CheckSessionExpired() {
    try {
        $.ajax({
            type: 'POST',
            url: url_CheckSessionExpired,
            dataType: "json",
            async: false,
            success: function (data) {
                if (data == "sessionexpired") {
                    PageLogOut("sessionexpired");
                }
            },
            error: function (results, q, a) {
                PageLogOut("sessionexpired");
            }
        });
    } catch (e) {

    }

}

function executeA(qry) {
    if (qry != "") {
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
                // alert("test : : " + results);
            }

        });
    }
}

function executeSuggestedOrderQuantity(qry) {
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
            executeStringQry = results;
            executeQry = $.parseJSON(results);
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

    CheckSessionExpired();

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
            PageLogOut("sessionexpired");
            //alert(results);
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

// PerformAction('rowItemClicked',_obj);
function PerformAction(sActionEvent, objData, tempPAiCnt) {
    //debugger;
    //LoadingImagePopUpOpen();
    

    //setTimeout(function () {
    if (sActionEvent == " " || isExecute == true)
        return;
    tempsActionEvent = sActionEvent;
    tempobjData = objData;

    if (objData.value == "execute")
        _isDefault = "yes";

    try {
        objData.fieldName = (objData.fieldName != null && objData.fieldName != undefined && objData.fieldName != '') ? objData.fieldName : '';
    } catch (e) { }

    try {
        var sActionName = "", sParamsActionName = "";
        var isAction = true;
        if (tempPAiCnt == undefined) {
            tempPAi = 0;
            isExecute = false;
        }
        else {
            tempPAi = parseInt(tempPAiCnt);
        }

        if (arrActionQuery.length == 0)
            windowPreparingToOpen(objData.currentScreenName)

        //try {
        //    if (ProjectName.toLowerCase() == "jsu" && _screenName.toLowerCase() == "paymentsform" && arrActionQuery[0].ScreenName == "AddPaymentForm") {
        //        console.log("entered");
        //        windowPreparingToOpen(_screenName)
        //    }
        //} catch (errr) {

        //}
       // else if (_screenName != arrActionQuery[0].screenName)
           

        for (var i = tempPAi ; i < arrActionQuery.length; i++) {
            if (isExecute == true) {
                i = arrActionQuery.length + 1;
                return;
            }
            tempPAi = i;
            isAction = true;
            sActionName = arrActionQuery[i].fieldName + "" + arrActionQuery[i].ActionName;
            sParamsActionName = objData.fieldName + "" + sActionEvent;

            currentScreenName = currentScreenName == undefined ? _screenName : currentScreenName;
            if (currentScreenName == "ItemPromotionForm" || currentScreenName == "InvoicePromotionForm" ) {
                if (arrActionQuery[i].ScreenName == "ItemPromotionForm_Offer" || arrActionQuery[i].ScreenName == "ItemPromotionForm_Appliesto" || arrActionQuery[i].ScreenName == "ItemPromotionForm_Condition" || arrActionQuery[i].ScreenName == "InvoicePromotionForm_Category" || arrActionQuery[i].ScreenName == "InvoicePromotionForm_Offer" || arrActionQuery[i].ScreenName == "InvoicePromotionForm_Item" || arrActionQuery[i].ScreenName == "InvoicePromotionForm_Appliesto") {
                    if (arrActionQuery[i].ScreenName != CurrentScreen_TabScreen_Name) {
                        isAction = false
                    }
                }
            }

            if (sActionName.toUpperCase() == sParamsActionName.toUpperCase() && isAction == true) {
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
               
                var bFlag = true;

                if (arrActionQuery[i].ActionName == "rowItemClicked") {
                    isEditScreen = "yes";
                }

                if (objData.Type == 'ALERT') {
                    if (arrActionQuery[i].ActionIndex != objData.value) {
                        bFlag = false;
                    }
                }

                if (bFlag == true) {
                    // PerformActioninfo("ActionType  : " + arrActionQuery[i].ActionType); //enable

                    if (arrActionQuery[i].ActionType.toUpperCase() == "EXECUTE") {
                        // debugger;
                        try {
                            if (ProjectName.toLowerCase() == "frostfood" && (CurrentScreen_TabScreen_Name.toLowerCase() == "presentationform" || CurrentScreen_TabScreen_Name.toLowerCase() == "presentationnewform")) {
                                if (objData.fieldName == "DeleteBtn") {

                                    _ttbody = "ListBodyDivId_" + arrActionQuery[i].ScreenName + "_Media";
                                    var tblbody = document.getElementById(_ttbody);
                                    var fName = "";
                                    for (var i = 0; i < (tblbody.rows.length - 1); i++) {
                                        if (fName == "")
                                            fName = tblbody.rows[i].cells[3].childNodes[0].innerText;
                                        else
                                            fName = "," + tblbody.rows[i].cells[3].childNodes[0].innerText;
                                        //fNames[0] = fName;
                                        
                                    }
                                    deleteImage(fName);
                                }
                            }
                        } catch (err1) {
                                
                        }
                        //if (ProjectName == "FFB" && currentScreenName == "ReAlloactionItemForm")
                     //       handleFieldAction(currentScreenName, objData.fieldName, arrActionQuery[i].Action);
                      //  else
                        handleFieldAction(CurrentScreen_TabScreen_Name, objData.fieldName, arrActionQuery[i].Action);
                    }
                    else if (arrActionQuery[i].ActionType.toUpperCase() == "HIDE_CONTROLS") {
                        //PageLogOut("");
                        //PageLogOut("sessionexpired");

                        try {

                            //var tmpp = "SaveBtn-Button,Foc-Tab";
                            var arr = [];

                            arr = arrActionQuery[i].ActionFailedValue.split(",");//tmpp.split(",");

                            for (var ab = 0; ab < arr.length; ab++) {
                                if (arr[ab].split("-")[1].toLowerCase() == "button") {
                                    try {
                                        document.getElementById('Button_' + arr[ab].split("-")[0]).hidden = true;
                                    } catch (er) {

                                    }
                                }
                                else if (arr[ab].split("-")[1].toLowerCase() == "tab") {
                                    try {
                                        document.getElementById('tab_' + arr[ab].split("-")[0]).hidden = true;
                                        document.getElementById('con_' + arr[ab].split("-")[0]).hidden = true;
                                    } catch (er) {

                                    }
                                }
                                //$('#Button_' + arr[ab]).attr("disabled", "disabled");
                                //  document.getElementById('Button_' + arr[ab]).style.cursor = 'not-allowed';
                            }
                        } catch (e) {

                        }

                    }
                    else if (arrActionQuery[i].ActionType.toUpperCase() == "UNHIDE_CONTROLS") {
                        //PageLogOut("");
                        //PageLogOut("sessionexpired");

                        try {

                            //var tmpp = "SaveBtn-Button,Foc-Tab";
                            var arr = [];

                            arr = arrActionQuery[i].ActionFailedValue.split(",");//tmpp.split(",");

                            for (var ab = 0; ab < arr.length; ab++) {
                                if (arr[ab].split("-")[1].toLowerCase() == "button") {
                                    try {
                                        document.getElementById('Button_' + arr[ab].split("-")[0]).hidden = false;
                                    } catch (er) {

                                    }
                                }
                                else if (arr[ab].split("-")[1].toLowerCase() == "tab") {
                                    try {
                                        document.getElementById('tab_' + arr[ab].split("-")[0]).hidden = false;
                                        document.getElementById('con_' + arr[ab].split("-")[0]).hidden = false;
                                        document.getElementById('tab_' + arr[ab].split("-")[0]).click();

                                    } catch (er) {

                                    }
                                    //if (arr[ab].split("-")[0] == 'Foc') {
                                    //    try {
                                    //        document.getElementById('tab_Sales').className = "tablinks";
                                    //        document.getElementById('con_Sales').style = "display:none;";
                                    //    }
                                    //    catch { }
                                    //    try {
                                    //        document.getElementById('tab_' + arr[ab].split("-")[0]).className = "tablinks active";
                                    //        document.getElementById('con_' + arr[ab].split("-")[0]).style = "display:block;";
                                    //    }
                                    //    catch { }



                                    //}
                                }

                                //$('#Button_' + arr[ab]).attr("disabled", "disabled");
                                //  document.getElementById('Button_' + arr[ab]).style.cursor = 'not-allowed';
                            }
                        } catch (e) {

                        }

                    }
                    else if (arrActionQuery[i].ActionType.toUpperCase() == "HIDDEN_CHECK") {
                        // alert("hidden_check");
                        var _qry = "Select * from hiddenconfig where screenname like '" + arrActionQuery[i].ScreenName + "' and solutionname='" + SolutionName + "' order by priorityseq";
                        execute(_qry);
                        dbDataRows = executeQry;
                        //dbDataRows = dbDataRows;

                        for (var j = 0; j <= dbDataRows.length - 1; j++) {
                            var obj = dbDataRows[j];
                            if (obj["FIELDCONTROL"] == "TABGROUP") {
                                var fName = obj["ConditionField"];
                                if (fName !== null && fName !== "") {
                                    try {

                                        var condValue;

                                        if (obj["ConditionFieldcontrol"].toUpperCase() == "CHECKBOX")
                                            condValue = document.getElementById(fName).checked;// $('#' + fName).val();
                                        else if (obj["ConditionFieldcontrol"].toUpperCase() == "FORMATQUERY") {
                                            qry1 = formatQueryString(obj["ConditionField"], screenName);
                                            condValue = qry1;
                                            condValue = condValue.replace(new RegExp("'", "g"), "");
                                            //  condValue = condValue.replace("'", "");
                                        }
                                        else if (obj["ConditionFieldcontrol"].toUpperCase() == "EXECUTEQUERY") {
                                            qry1 = formatQueryString(obj["ConditionField"], screenName);
                                            execute(qry1);
                                            condValue = executeQry[0]["Response"];
                                            //condValue = condValue.replace(new RegExp("'", "g"), "");
                                            //  condValue = condValue.replace("'", "");
                                        }
                                        else {
                                            condValue = $('#' + fName).val();
                                        }

                                       // var condValue = document.getElementById(fName).value;//objData.value;

                                        // condValue = "Holiday";
                                        if (obj["ConditionValue"] == condValue) {
                                            if (obj["IsHidden"] == true) {

                                                try {
                                                    document.getElementById('tab_' + obj["FieldName"]).hidden = true;
                                                } catch (er) {

                                                }
                                                document.getElementById(obj["FieldName"]).hidden = true;
                                                // $('#' + obj["FieldName"]).hidden
                                            }
                                            else {

                                                try {
                                                    document.getElementById('tab_' + obj["FieldName"]).hidden = false;
                                                } catch (er) {

                                                }
                                                document.getElementById(obj["FieldName"]).hidden = false;
                                                document.getElementById('tab_' + obj["FieldName"]).click();
                                            }

                                        }
                                    } catch (err) {

                                    }
                                }
                            }
                            else {
                                var fName = obj["ConditionField"];
                                if (fName !== null && fName !== "") {
                                    try {
                                        var condValue;

                                        if (obj["ConditionFieldcontrol"].toUpperCase() == "CHECKBOX")
                                            condValue = document.getElementById(fName).checked;// $('#' + fName).val();
                                        else if (obj["ConditionFieldcontrol"].toUpperCase() == "FORMATQUERY") {
                                            qry1 = formatQueryString(obj["ConditionField"], screenName);
                                            condValue = qry1;
                                            condValue = condValue.replace(new RegExp("'", "g"), "");
                                            //  condValue = condValue.replace("'", "");
                                        }
                                        else if (obj["ConditionFieldcontrol"].toUpperCase() == "EXECUTEQUERY") {
                                            qry1 = formatQueryString(obj["ConditionField"], screenName);
                                            execute(qry1);
                                            condValue = executeQry[0]["Response"];
                                            //condValue = condValue.replace(new RegExp("'", "g"), "");
                                            //  condValue = condValue.replace("'", "");
                                        }
                                        else {
                                            condValue = objData.value;//$('#' + fName).val();
                                        }

                                       // var condValue = objData.value;
                                        if (obj["ConditionValue"] == condValue) {
                                            if (obj["IsHidden"] == true) {

                                                if (obj["Fieldcontrol"] == "BUTTON") {
                                                    try {
                                                        document.getElementById('Button_' + obj["FieldName"]).hidden = true;
                                                    } catch (er) {

                                                    }
                                                   
                                                }
                                                else {
                                                    try {
                                                        document.getElementById('lbl_' + obj["FieldName"]).hidden = true;
                                                    } catch (er) {

                                                    }
                                                    document.getElementById(obj["FieldName"]).hidden = true;
                                                }
                                                // $('#' + obj["FieldName"]).hidden
                                            }
                                            else {
                                                if (obj["Fieldcontrol"] == "BUTTON") {
                                                    try {
                                                        document.getElementById('Button_' + obj["FieldName"]).hidden = false;
                                                    } catch (er) {

                                                    }
                                                }
                                                else {
                                                    try {
                                                        document.getElementById('lbl_' + obj["FieldName"]).hidden = false;
                                                    } catch (er) {

                                                    }
                                                    document.getElementById(obj["FieldName"]).hidden = false;
                                                }
                                            }

                                        }
                                    } catch (err) {

                                    }
                                }
                            }
                        }

                    }
                    else if (arrActionQuery[i].ActionType.toUpperCase() == "READONLY") {

                        var fName = arrActionQuery[i].Action;

                        var condValue = document.getElementById(fName).value;

                        var value = arrActionQuery[i].ActionValue.split(",");

                        for (var j = 0; j < value.length; j++) {
                           
                            if (value[j] == condValue) {
                                //FormConfig_POReceivingNewForm
                                $("input, select, option, textarea", "#FormConfig_" + CurrentScreen_TabScreen_Name).prop('disabled', true);
                                $("#FormConfig_" + CurrentScreen_TabScreen_Name + " :input").prop('disabled', true);
                                var _qry = "Select * from formconfig where screenname like '" + arrActionQuery[i].ScreenName + "' and fieldcontrol like 'button' order by displayno";
                                execute(_qry);
                                dbDataRows = executeQry;
                                for (var j = 0; j <= dbDataRows.length - 1; j++) {
                                    var obj = dbDataRows[j];
                                    if (obj["FieldName"] != "CancelBtn") 
                                        document.getElementById("Button_" + obj["FieldName"]).style.display = "none";
                                    else
                                        document.getElementById("Button_" + obj["FieldName"]).removeAttribute('disabled');
                                }
                                
                            }
                        }
                           

                    }
                    //else if (arrActionQuery[i].ActionType.toUpperCase() == "HIDDEN_CHECK") {
                    //    var _qry = "Select * from hiddenconfig where screenname like '" + arrActionQuery[i].ScreenName + "' and solutionname='" + SolutionName  + "' order by priorityseq";
                    //    execute(_qry);
                    //    dbDataRows = executeQry;

                    //    try {
                    //        for (var j = 0; j <= dbDataRows.length - 1; j++) {
                    //            var obj = dbDataRows[j];
                    //            var fName = obj["ConditionField"];
                    //            if (fName !== null && fName !== "") {
                    //                try {
                    //                    var condValue;

                    //                    if (obj["ConditionFieldcontrol"].toUpperCase() == "CHECKBOX")
                    //                        condValue = document.getElementById(fName).checked;// $('#' + fName).val();
                    //                    else if (obj["ConditionFieldcontrol"].toUpperCase() == "FORMATQUERY") {
                    //                        qry1 = formatQueryString(obj["ConditionField"], screenName);
                    //                        condValue = qry1;
                    //                        condValue = condValue.replace(new RegExp("'", "g"), "");
                    //                        //  condValue = condValue.replace("'", "");
                    //                    }
                    //                    else if (obj["ConditionFieldcontrol"].toUpperCase() == "EXECUTEQUERY") {
                    //                        qry1 = formatQueryString(obj["ConditionField"], screenName);
                    //                        execute(qry1);
                    //                        condValue = executeQry[0]["Response"];
                    //                        //condValue = condValue.replace(new RegExp("'", "g"), "");
                    //                        //  condValue = condValue.replace("'", "");
                    //                    }
                    //                    else {
                    //                        condValue = $('#' + fName).val();
                    //                    }

                    //                    if (obj["ConditionValue"].toLowerCase().indexOf(",") > -1) {
                    //                        var condV = obj["ConditionValue"].toLowerCase().split(",");
                    //                        //var tmpCond = condValue.toLowerCase();

                    //                        for (var z = 0; z < condV.length; z++) {
                    //                            try {
                    //                                if (condValue.toLowerCase().indexOf(condV[z]) > -1) {

                    //                                        if (obj["IsHidden"] == true) {
                    //                                            try {

                    //                                                document.getElementById(obj["FieldName"]).style.display = "none";
                                                                  
                    //                                            } catch (e) {

                    //                                            }
                    //                                        }
                    //                                        else {
                    //                                            try {

                    //                                                document.getElementById(obj["FieldName"]).style.display = "block";

                    //                                            } catch (e) {

                    //                                            }

                    //                                        }

                    //                                    }
                    //                            }
                    //                            catch { }
                    //                        }

                    //                    }
                    //                    else {
                    //                        if (obj["ConditionValue"] == condValue) {
                                                
                    //                                if (obj["IsHidden"] == true) {
                    //                                    try {

                    //                                        document.getElementById(obj["FieldName"]).style.display = "none";

                    //                                    } catch (e) {

                    //                                    }
                    //                                }
                    //                                else {
                    //                                    try {

                    //                                        document.getElementById(obj["FieldName"]).style.display = "block";

                    //                                    } catch (e) {

                    //                                    }

                    //                                }

                                                
                    //                        }
                    //                    }

                    //                }
                    //                catch (err) {

                    //                }
                    //            }
                    //        }
                    //    }
                    //    catch { }

                    //}
                    else if (arrActionQuery[i].ActionType.toUpperCase() == "READONLY_CHECK") {
                        indx = 0; roFields = [];
                        var dbDataRows1, dbDataRows2;
                        //  if (objData.fieldName == "form") {
                        var _qry = "Select * from readonlyconfig where screenname like '" + arrActionQuery[i].ScreenName + "' order by priorityseq";
                        execute(_qry);
                        dbDataRows = executeQry;
                        _qry = "Select * from readonlylistconfig where screenname like '" + arrActionQuery[i].ScreenName + "%' order by priorityseq";
                        execute(_qry);
                        dbDataRows1 = executeQry;

                        if ((ProjectName == "CPF" || ProjectName == "FGV") && currentScreenName == "PaymentsCollectionNewForm" && objData.fieldName !== "form") {
                            dbDataRows = dbDataRows.filter(x => x.ConditionField == objData.fieldName);
                        }

                        for (var j = 0; j <= dbDataRows.length - 1; j++) {
                            var obj = dbDataRows[j];
                            var fName = obj["ConditionField"];
                            if (fName !== null && fName !== "") {
                                try {
                                    var condValue;

                                    if (obj["ConditionFieldcontrol"].toUpperCase() == "CHECKBOX")
                                        condValue = document.getElementById(fName).checked;// $('#' + fName).val();
                                    else if (obj["ConditionFieldcontrol"].toUpperCase() == "FORMATQUERY") {
                                        qry1 = formatQueryString(obj["ConditionField"], screenName);
                                        condValue = qry1;
                                        condValue = condValue.replace(new RegExp("'", "g"), "");
                                      //  condValue = condValue.replace("'", "");
                                    }
                                    else if (obj["ConditionFieldcontrol"].toUpperCase() == "EXECUTEQUERY") {
                                        qry1 = formatQueryString(obj["ConditionField"], screenName);
                                        execute(qry1);
                                        condValue = executeQry[0]["Response"];
                                        //condValue = condValue.replace(new RegExp("'", "g"), "");
                                        //  condValue = condValue.replace("'", "");
                                    }
                                    else {
                                        condValue = $('#' + fName).val();
                                    }

                                    if (obj["ConditionValue"].toLowerCase().indexOf(",") > -1) {
                                        var condV = obj["ConditionValue"].toLowerCase().split(",");
                                       //var tmpCond = condValue.toLowerCase();

                                        for (var z = 0; z < condV.length; z++) {
                                            try {
                                                if (condValue.toLowerCase().indexOf(condV[z]) > -1) {

                                                    if (obj["Fieldcontrol"] == "LISTVIEW") {
                                                        try {
                                                            var condValue2 = arrActionQuery[i].ScreenName + "_LISTVIEW_" + dbDataRows[j].FieldName; //$('#' + fName1).val();
                                                            dbDataRows2 = dbDataRows1.filter(x => x.ScreenName === condValue2 && x.ConditionValue == condValue);
                                                        } catch (err) {

                                                        }
                                                        for (var h = 0; h <= dbDataRows2.length - 1; h++) {
                                                            var obj2 = dbDataRows2[h];
                                                            if (obj2["IsReadOnly"] == true) {

                                                                roFields[indx] = obj2["FieldName"];
                                                                indx = indx + 1;

                                                                try {
                                                                    // if (obj["FieldName"] == "ExpiryDate" || obj["FieldName"] == "Qty" || obj["FieldName"] == "LotNo") {
                                                                    var cells = document.getElementsByName(obj2["FieldName"]);
                                                                    for (var k = 0; k < cells.length; k++) {
                                                                        cells[k].disabled = true; //.style.cursor = 'not-allowed';
                                                                        cells[k].style.cursor = 'not-allowed';
                                                                    }
                                                                    // }
                                                                } catch (ex2) {

                                                                }

                                                                try {
                                                                    if (obj2["FieldControl"] == "MULTISELECTLOOKUP" || obj2["FieldControl"] == "LOOKUPTEXTBOX") {
                                                                        var cells = document.getElementsByClassName("LookUp_" + obj2["FieldName"]);
                                                                        for (var k = 0; k < cells.length; k++) {
                                                                            cells[k].disabled = true; //.style.cursor = 'not-allowed';
                                                                            cells[k].style.cursor = 'not-allowed';
                                                                        }
                                                                    }
                                                                } catch (ex2) {

                                                                }

                                                            }
                                                            else {


                                                                try {
                                                                    if (obj2["FieldControl"] == "MULTISELECTLOOKUP" || obj2["FieldControl"] == "LOOKUPTEXTBOX") {
                                                                        var cells = document.getElementsByClassName("LookUp_" + obj2["FieldName"]);
                                                                        for (var k = 0; k < cells.length; k++) {
                                                                            cells[k].disabled = false; //.style.cursor = 'not-allowed';
                                                                            cells[k].style.cursor = 'pointer';
                                                                        }
                                                                    }
                                                                } catch (ex2) {

                                                                }
                                                                try {
                                                                    // if (obj["FieldName"] == "ExpiryDate" || obj["FieldName"] == "Qty" || obj["FieldName"] == "LotNo") {
                                                                    var cells = document.getElementsByName(obj2["FieldName"]);
                                                                    for (var k = 0; k < cells.length; k++) {
                                                                        cells[k].disabled = false; //.style.cursor = 'not-allowed';
                                                                        cells[k].style.cursor = 'pointer';
                                                                    }
                                                                    //}
                                                                } catch (ex2) {

                                                                }

                                                            }
                                                        }

                                                    }
                                                    else {
                                                        if (obj["IsReadOnly"] == true) {
                                                            try {
                                                                $("#" + obj["FieldName"]).prop('disabled', true);

                                                                $("#" + obj["FieldName"]).attr('placeholder', '');
                                                            } catch (e) {

                                                            }

                                                            //  document.getElementsByClassName(obj["FieldName"])[0].style.cursor = 'not-allowed';
                                                            try {
                                                                document.getElementById(obj["FieldName"]).readOnly = true;
                                                                $("#" + obj["FieldName"]).prop('readonly', true);
                                                            }
                                                            catch (hdn) { }

                                                            document.getElementById(obj["FieldName"]).style.cursor = 'not-allowed';
                                                            try {
                                                                document.getElementById('div_' + obj["FieldName"]).style.cursor = 'not-allowed';
                                                            } catch (e) {

                                                            }
                                                            try {
                                                                if (obj["Fieldcontrol"] == "RADIOBUTTON") {
                                                                    document.getElementById('radio_' + obj["FieldName"]).style.cursor = 'not-allowed';
                                                                    document.getElementById('radio_' + obj["FieldName"]).readOnly = true;
                                                                    document.getElementsByName(obj["FieldName"]).forEach(e => {
                                                                        e.disabled = true;
                                                                    });
                                                                    document.getElementsByName(obj["FieldName"]).forEach(e => {
                                                                        e.style.cursor = 'not-allowed';
                                                                    });
                                                                    // document.getElementsByName(obj["FieldName"]).readOnly = true;
                                                                    // document.getElementsByName(obj["FieldName"]).style.cursor = 'not-allowed';
                                                                }
                                                            } catch (e) {

                                                            }
                                                        }
                                                        else {
                                                            try {
                                                                $("#" + obj["FieldName"]).prop('disabled', false);
                                                                $("#" + obj["FieldName"]).attr('placeholder', 'Enter the ' + obj["FieldName"]);
                                                                document.getElementById(obj["FieldName"]).style.cursor = 'text';
                                                            } catch (e) {

                                                            }

                                                            try {
                                                                document.getElementById(obj["FieldName"]).readOnly = false;
                                                                $("#" + obj["FieldName"]).prop('readonly', false);
                                                            }
                                                            catch (hdn) { }

                                                            document.getElementById(obj["FieldName"]).style.cursor = 'pointer';
                                                            try {
                                                                document.getElementById('div_' + obj["FieldName"]).style.cursor = 'pointer';
                                                            } catch (e) {

                                                            }

                                                            try {
                                                                if (obj["Fieldcontrol"] == "RADIOBUTTON") {
                                                                    document.getElementById('radio_' + obj["FieldName"]).style.cursor = 'pointer';
                                                                    document.getElementById('radio_' + obj["FieldName"]).readOnly = false;
                                                                    document.getElementsByName(obj["FieldName"]).forEach(e => {
                                                                        e.disabled = false;
                                                                    });
                                                                    document.getElementsByName(obj["FieldName"]).forEach(e => {
                                                                        e.style.cursor = 'pointer';
                                                                    });
                                                                    // document.getElementsByName(obj["FieldName"]).readOnly = true;
                                                                    // document.getElementsByName(obj["FieldName"]).style.cursor = 'not-allowed';
                                                                }
                                                            } catch (e) {

                                                            }

                                                        }

                                                    }


                                                }
                                            }
                                            catch { }
                                        }

                                    }
                                    else {
                                        if (obj["ConditionValue"] == condValue) {
                                            if (obj["Fieldcontrol"] == "LISTVIEW") {
                                                try {
                                                    var condValue2 = arrActionQuery[i].ScreenName + "_LISTVIEW_" + dbDataRows[j].FieldName; //$('#' + fName1).val();
                                                    dbDataRows2 = dbDataRows1.filter(x => x.ScreenName === condValue2 && x.ConditionValue == condValue);
                                                } catch (err) {

                                                }
                                                for (var h = 0; h <= dbDataRows2.length - 1; h++) {
                                                    var obj2 = dbDataRows2[h];
                                                    if (obj2["IsReadOnly"] == true) {

                                                        roFields[indx] = obj2["FieldName"];
                                                        indx = indx + 1;

                                                        try {
                                                            // if (obj["FieldName"] == "ExpiryDate" || obj["FieldName"] == "Qty" || obj["FieldName"] == "LotNo") {
                                                            var cells = document.getElementsByName(obj2["FieldName"]);
                                                            for (var k = 0; k < cells.length; k++) {
                                                                cells[k].disabled = true; //.style.cursor = 'not-allowed';
                                                                cells[k].style.cursor = 'not-allowed';
                                                            }
                                                            // }
                                                        } catch (ex2) {

                                                        }

                                                        try {
                                                            if (obj2["FieldControl"] == "MULTISELECTLOOKUP" || obj2["FieldControl"] == "LOOKUPTEXTBOX") {
                                                                var cells = document.getElementsByClassName("LookUp_" + obj2["FieldName"]);
                                                                for (var k = 0; k < cells.length; k++) {
                                                                    cells[k].disabled = true; //.style.cursor = 'not-allowed';
                                                                    cells[k].style.cursor = 'not-allowed';
                                                                }
                                                            }
                                                        } catch (ex2) {

                                                        }

                                                    }
                                                    else {


                                                        try {
                                                            if (obj2["FieldControl"] == "MULTISELECTLOOKUP" || obj2["FieldControl"] == "LOOKUPTEXTBOX") {
                                                                var cells = document.getElementsByClassName("LookUp_" + obj2["FieldName"]);
                                                                for (var k = 0; k < cells.length; k++) {
                                                                    cells[k].disabled = false; //.style.cursor = 'not-allowed';
                                                                    cells[k].style.cursor = 'pointer';
                                                                }
                                                            }
                                                        } catch (ex2) {

                                                        }
                                                        try {
                                                            // if (obj["FieldName"] == "ExpiryDate" || obj["FieldName"] == "Qty" || obj["FieldName"] == "LotNo") {
                                                            var cells = document.getElementsByName(obj2["FieldName"]);
                                                            for (var k = 0; k < cells.length; k++) {
                                                                cells[k].disabled = false; //.style.cursor = 'not-allowed';
                                                                cells[k].style.cursor = 'pointer';
                                                            }
                                                            //}
                                                        } catch (ex2) {

                                                        }

                                                    }
                                                }

                                            }
                                            else {
                                                if (obj["IsReadOnly"] == true) {
                                                    try {
                                                        $("#" + obj["FieldName"]).prop('disabled', true);

                                                        $("#" + obj["FieldName"]).attr('placeholder', '');
                                                    } catch (e) {

                                                    }

                                                    //  document.getElementsByClassName(obj["FieldName"])[0].style.cursor = 'not-allowed';
                                                    try {
                                                        document.getElementById(obj["FieldName"]).readOnly = true;
                                                        $("#" + obj["FieldName"]).prop('readonly', true);
                                                    }
                                                    catch (hdn) { }

                                                    document.getElementById(obj["FieldName"]).style.cursor = 'not-allowed';
                                                    try {
                                                        document.getElementById('div_' + obj["FieldName"]).style.cursor = 'not-allowed';
                                                    } catch (e) {

                                                    }
                                                    try {
                                                        if (obj["Fieldcontrol"] == "RADIOBUTTON") {
                                                            document.getElementById('radio_' + obj["FieldName"]).style.cursor = 'not-allowed';
                                                            document.getElementById('radio_' + obj["FieldName"]).readOnly = true;
                                                            document.getElementsByName(obj["FieldName"]).forEach(e => {
                                                                e.disabled = true;
                                                            });
                                                            document.getElementsByName(obj["FieldName"]).forEach(e => {
                                                                e.style.cursor = 'not-allowed';
                                                            });
                                                            // document.getElementsByName(obj["FieldName"]).readOnly = true;
                                                            // document.getElementsByName(obj["FieldName"]).style.cursor = 'not-allowed';
                                                        }
                                                    } catch (e) {

                                                    }
                                                }
                                                else {
                                                    try {
                                                        $("#" + obj["FieldName"]).prop('disabled', false);
                                                        $("#" + obj["FieldName"]).attr('placeholder', 'Enter the ' + obj["FieldName"]);
                                                        document.getElementById(obj["FieldName"]).style.cursor = 'text';
                                                    } catch (e) {

                                                    }

                                                    try {
                                                        document.getElementById(obj["FieldName"]).readOnly = false;
                                                        $("#" + obj["FieldName"]).prop('readonly', false);
                                                    }
                                                    catch (hdn) { }

                                                    document.getElementById(obj["FieldName"]).style.cursor = 'pointer';
                                                    try {
                                                        document.getElementById('div_' + obj["FieldName"]).style.cursor = 'pointer';
                                                    } catch (e) {

                                                    }

                                                    try {
                                                        if (obj["Fieldcontrol"] == "RADIOBUTTON") {
                                                            document.getElementById('radio_' + obj["FieldName"]).style.cursor = 'pointer';
                                                            document.getElementById('radio_' + obj["FieldName"]).readOnly = false;
                                                            document.getElementsByName(obj["FieldName"]).forEach(e => {
                                                                e.disabled = false;
                                                            });
                                                            document.getElementsByName(obj["FieldName"]).forEach(e => {
                                                                e.style.cursor = 'pointer';
                                                            });
                                                            // document.getElementsByName(obj["FieldName"]).readOnly = true;
                                                            // document.getElementsByName(obj["FieldName"]).style.cursor = 'not-allowed';
                                                        }
                                                    } catch (e) {

                                                    }

                                                }

                                            }
                                        }
                                    }

                                }
                                catch (err) {

                                }
                            }
                            else {
                                if (obj["FieldControl"] == "LISTVIEW") {
                                    try {
                                        var condValue2 = arrActionQuery[i].ScreenName + "_LISTVIEW_" + dbDataRows[j].FieldName; //$('#' + fName1).val();
                                        dbDataRows2 = dbDataRows1.filter(x => x.FieldName === condValue2);
                                    } catch (err) {

                                    }
                                    for (var h = 0; h <= dbDataRows2.length - 1; h++) {
                                        var obj2 = dbDataRows2[h];
                                        if (obj2["IsReadOnly"] == true) {
                                         

                                                roFields[indx] = obj2["FieldName"];
                                                indx = indx + 1;

                                                try {
                                                    // if (obj["FieldName"] == "ExpiryDate" || obj["FieldName"] == "Qty" || obj["FieldName"] == "LotNo") {
                                                    var cells = document.getElementsByName(obj2["FieldName"]);
                                                    if (obj["ConditionFieldcontrol"] == "ROWCHECK") {
                                                        cells[chkRowIndex].disabled = true; //.style.cursor = 'not-allowed';
                                                        cells[chkRowIndex].style.cursor = 'not-allowed';
                                                    }
                                                    else {
                                                        for (var k = 0; k < cells.length; k++) {
                                                                cells[k].disabled = true; //.style.cursor = 'not-allowed';
                                                                cells[k].style.cursor = 'not-allowed';
                                                            
                                                        }
                                                    }
                                                    // }
                                                } catch (ex2) {

                                                }

                                                try {
                                                    if (obj2["FieldControl"] == "MULTISELECTLOOKUP" || obj2["FieldControl"] == "LOOKUPTEXTBOX") {
                                                        var cells = document.getElementsByClassName("LookUp_" + obj2["FieldName"]);
                                                        for (var k = 0; k < cells.length; k++) {
                                                            cells[k].disabled = true; //.style.cursor = 'not-allowed';
                                                            cells[k].style.cursor = 'not-allowed';
                                                        }
                                                    }
                                                } catch (ex2) {

                                                }
                                           

                                        }
                                        else {
                                            try {
                                                if (obj2["FieldControl"] == "MULTISELECTLOOKUP" || obj2["FieldControl"] == "LOOKUPTEXTBOX") {
                                                    var cells = document.getElementsByClassName("LookUp_" + obj2["FieldName"]);
                                                    for (var k = 0; k < cells.length; k++) {
                                                        cells[k].disabled = false; //.style.cursor = 'not-allowed';
                                                        cells[k].style.cursor = 'pointer';
                                                    }
                                                }
                                            } catch (ex2) {

                                            }
                                            try {
                                                // if (obj["FieldName"] == "ExpiryDate" || obj["FieldName"] == "Qty" || obj["FieldName"] == "LotNo") {
                                                var cells = document.getElementsByName(obj2["FieldName"]);
                                                if (obj["ConditionFieldcontrol"] == "ROWCHECK") {
                                                    cells[chkRowIndex].disabled = false; //.style.cursor = 'not-allowed';
                                                    cells[chkRowIndex].style.cursor = 'pointer';
                                                }
                                                else {
                                                    for (var k = 0; k < cells.length; i++) {
                                                        cells[k].disabled = false; //.style.cursor = 'not-allowed';
                                                        cells[k].style.cursor = 'pointer';
                                                    }
                                                }
                                                //}
                                            } catch (ex2) {

                                            }

                                        }
                                    }

                                }
                                else {
                                    if (obj["IsReadOnly"] == true) {
                                        try {
                                            $("#" + obj["FieldName"]).prop('disabled', true);

                                            $("#" + obj["FieldName"]).attr('placeholder', '');
                                        } catch (e) {

                                        }

                                        //  document.getElementsByClassName(obj["FieldName"])[0].style.cursor = 'not-allowed';
                                        try {
                                            document.getElementById(obj["FieldName"]).readOnly = true;
                                            $("#" + obj["FieldName"]).prop('readonly', true);
                                        }
                                        catch (hdn) { }

                                        document.getElementById(obj["FieldName"]).style.cursor = 'not-allowed';
                                        try {
                                            document.getElementById('div_' + obj["FieldName"]).style.cursor = 'not-allowed';
                                        } catch (e) {

                                        }
                                        try {
                                            if (obj["Fieldcontrol"] == "RADIOBUTTON") {
                                                document.getElementById('radio_' + obj["FieldName"]).style.cursor = 'not-allowed';
                                                document.getElementById('radio_' + obj["FieldName"]).readOnly = true;
                                                document.getElementsByName(obj["FieldName"]).forEach(e => {
                                                    e.disabled = true;
                                                });
                                                document.getElementsByName(obj["FieldName"]).forEach(e => {
                                                    e.style.cursor = 'not-allowed';
                                                });
                                                // document.getElementsByName(obj["FieldName"]).readOnly = true;
                                                // document.getElementsByName(obj["FieldName"]).style.cursor = 'not-allowed';
                                            }
                                        } catch (e) {

                                        }
                                    }
                                    else {
                                        try {
                                            $("#" + obj["FieldName"]).prop('disabled', false);
                                            $("#" + obj["FieldName"]).attr('placeholder', 'Enter the ' + obj["FieldName"]);
                                            document.getElementById(obj["FieldName"]).style.cursor = 'text';
                                        } catch (e) {

                                        }

                                        try {
                                            document.getElementById(obj["FieldName"]).readOnly = false;
                                            $("#" + obj["FieldName"]).prop('readonly', false);
                                        }
                                        catch (hdn) { }

                                        document.getElementById(obj["FieldName"]).style.cursor = 'pointer';
                                        try {
                                            document.getElementById('div_' + obj["FieldName"]).style.cursor = 'pointer';
                                        } catch (e) {

                                        }

                                        try {
                                            if (obj["Fieldcontrol"] == "RADIOBUTTON") {
                                                document.getElementById('radio_' + obj["FieldName"]).style.cursor = 'pointer';
                                                document.getElementById('radio_' + obj["FieldName"]).readOnly = false;
                                                document.getElementsByName(obj["FieldName"]).forEach(e => {
                                                    e.disabled = false;
                                                });
                                                document.getElementsByName(obj["FieldName"]).forEach(e => {
                                                    e.style.cursor = 'pointer';
                                                });
                                                // document.getElementsByName(obj["FieldName"]).readOnly = true;
                                                // document.getElementsByName(obj["FieldName"]).style.cursor = 'not-allowed';
                                            }
                                        } catch (e) {

                                        }

                                    }

                                }
                            }

                        }


                        var _obj = {};
                        _obj.value = arrActionQuery[i].fieldName;
                        _obj.fieldName = arrActionQuery[i].fieldName;
                        PerformAction(arrActionQuery[i].ActionFailedValue, _obj);

                    }
                    else if (arrActionQuery[i].ActionType.toUpperCase() == "SHOW_MANDATORY") {
                        try {
                            var dbDataRows1, dbDataRows2;
                            //  if (objData.fieldName == "form") {
                            var _qry = "Select * from mandatoryconfig where (screenname like '" + arrActionQuery[i].ScreenName + "' or screenname like '" + arrActionQuery[i].ScreenName + "_%') and ismandatory=1 order by priorityseq";
                            execute(_qry);
                            dbDataRows = executeQry;
                            _qry = "Select * from mandatorylistconfig where screenname like '" + arrActionQuery[i].ScreenName + "%' and ismandatory=1 order by priorityseq";
                            execute(_qry);
                            dbDataRows1 = executeQry;
                            //dbDataRows = dbDataRows;

                            const elements = document.getElementsByTagName('label');

                            for (var z = 0; z < elements.length; z++) {
                                elements[z].innerHTML = elements[z].innerHTML.replace('<span style="color:red">*</span>', "");
                            }

                            //try {
                            //    var obj1 = dbDataRows[0];
                            //    var fName1 = obj1["ConditionField"];
                            //    if (fName1 == null)
                            //        dbDataRows = dbDataRows.filter(x => x.ConditionField === fName1);
                            //    else {
                            //        var condValue1 = $('#' + fName1).val();
                            //        dbDataRows = dbDataRows.filter(x => x.ConditionValue === condValue1);
                            //    }
                            //} catch (err) {

                            //}

                            for (var j = 0; j <= dbDataRows.length - 1; j++) {
                                var obj = dbDataRows[j];
                                var fName = obj["ConditionField"];
                                if (fName !== null && fName !== "") {
                                    try {
                                        var condValue;

                                        if (obj["FieldControl"] == "CHECKBOX")
                                            condValue = document.getElementById(fName).checked;// $('#' + fName).val();
                                        else
                                            condValue = $('#' + fName).val();

                                        if (obj["ConditionValue"] == condValue) {
                                            if (obj["FieldControl"] == "LISTVIEW") {
                                                try {
                                                 //  var condValue2 = arrActionQuery[i].ScreenName + "_LISTVIEW_" + dbDataRows[j].FieldName; //$('#' + fName1).val();
                                                    var condValue2 = obj["ScreenName"] + "_LISTVIEW_" + dbDataRows[j].FieldName;
                                                    dbDataRows2 = dbDataRows1.filter(x => x.FieldName === condValue2);
                                                } catch (err) {

                                                }
                                                for (var h = 0; h <= dbDataRows2.length - 1; h++) {
                                                    var obj2 = dbDataRows2[h];
                                                    var span = $(obj2["FieldName"] + " &nbsp;<span style='color:red'>*</span>");
                                                    $('#lbl_' + obj2["FieldName"]).append(span);
                                                }
                                            }
                                            else {
                                                var span = $(obj["FieldName"] + " &nbsp;<span style='color:red'>*</span>");
                                                $('#lbl_' + obj["FieldName"]).append(span);
                                            }
                                        }

                                    } catch (err) {

                                    }
                                }
                                else {
                                    if (obj["FieldControl"] == "LISTVIEW") {
                                        try {
                                            //arrActionQuery[i].ScreenName + "_LISTVIEW_" + dbDataRows[j].FieldName; //$('#' + fName1).val();

                                           // var condValue2 = CurrentScreen_TabScreen_Name + "_LISTVIEW_" + dbDataRows[j].FieldName; //$('#' + fName1).val();
                                            var condValue2 = obj["ScreenName"] + "_LISTVIEW_" + dbDataRows[j].FieldName;
                                            dbDataRows2 = dbDataRows1.filter(x => x.ScreenName === condValue2);
                                        } catch (err) {

                                        }
                                        for (var h = 0; h <= dbDataRows2.length - 1; h++) {
                                            var obj2 = dbDataRows2[h];
                                            //var span = $(obj2["FieldName"] + " &nbsp;<span style='color:red'>*</span>");
                                            try {
                                                var span = "<span style='color:red'>*</span>";
                                                var txt1 = 'th_' + obj["ScreenName"] + "_" + obj["FieldName"] + "_" + obj2["FieldName"];
                                                var txt = document.getElementById(txt1);
                                                if (txt == null) {
                                                    txt1 = 'th_' + obj["ScreenName"] + "_" + obj["FieldName"] + "_" + obj["FieldName"] + "_" + obj2["FieldName"];
                                                    txt = document.getElementById('th_' + obj["ScreenName"] + "_" + obj["FieldName"] + "_" + obj["FieldName"] + "_" + obj2["FieldName"]).innerHTML;
                                                    document.getElementById('th_' + obj["ScreenName"] + "_" + obj["FieldName"] + "_" + obj["FieldName"] + "_" + obj2["FieldName"]).innerHTML = document.getElementById('th_' + obj["ScreenName"] + "_" + obj["FieldName"] + "_" + obj["FieldName"] + "_" + obj2["FieldName"]).innerHTML + span;
                                                }
                                                else
                                                    document.getElementById('th_' + obj["ScreenName"] + "_" + obj["FieldName"] + "_" + obj2["FieldName"]).innerHTML = document.getElementById('th_' + obj["ScreenName"] + "_" + obj["FieldName"] + "_" + obj2["FieldName"]).innerHTML + span;
                                               // document.getElementById('th_' + obj["ScreenName"] + "_" + obj["FieldName"] + "_" + obj2["FieldName"]).innerHTML = span;
                                            } catch (e) {
                                               // alert(e);
                                            }
                                          //  $('#th_' + obj2["ScreenName"] + "_" + obj2["FieldName"]).append(span);
                                        }
                                    }
                                    else {
                                        var span = $(obj["FieldName"] + " <span style='color:red'>*</span>");
                                        $('#lbl_' + obj["FieldName"]).append(span);
                                    }
                                }

                            }
                            //}
                            //else {

                            //}
                            // LoadingImagePopUpOpen();

                        }
                        catch (err) {

                        }

                        var _obj = {};
                        _obj.value = arrActionQuery[i].fieldName;
                        _obj.fieldName = arrActionQuery[i].fieldName;
                        PerformAction(arrActionQuery[i].ActionFailedValue, _obj);
                        //try {
                        //    if (ProjectName.toLowerCase() == "cpf" && currentScreenName.toLowerCase() == "customerform") {
                        //        var _qry = "select nodetreetype from salesagent where UserID={FormView.UserID};";
                        //        _qry = formatQueryString(_qry, currentScreenName);
                        //        execute(_qry);

                        //        var obj = executeQry[0];
                        //        if (obj["nodetreetype"].toLowerCase() == "admin" || obj["nodetreetype"].toLowerCase() == "financial administrator") {
                        //            //document.getElementById("Channel").
                        //           try {
                        //               $("#Channel").prop('disabled', false);
                        //               $("#SubChannel").prop('disabled', false);

                        //            } catch (e) {

                        //            }

                        //            try {
                        //                document.getElementById("Channel").readOnly = false;
                        //                document.getElementById("SubChannel").readOnly = false;

                        //                $("#Channel").prop('readonly', false);
                        //                $("#SubChannel").prop('readonly', false);
                        //            }
                        //            catch (hdn) { }

                        //            document.getElementById("Channel").style.cursor = 'pointer';
                        //            document.getElementById("SubChannel").style.cursor = 'pointer';

                        //        }
                        //        else {
                        //            try {
                        //                $("#Channel").prop('disabled', true);
                        //                $("#SubChannel").prop('disabled', true);

                        //            } catch (e) {

                        //            }

                        //            try {
                        //                document.getElementById("Channel").readOnly = true;
                        //                document.getElementById("SubChannel").readOnly = true;

                        //                $("#Channel").prop('readonly', true);
                        //                $("#SubChannel").prop('readonly', true);
                        //            }
                        //            catch (hdn) { }

                        //            document.getElementById("Channel").style.cursor = 'not-allowed';
                        //            document.getElementById("SubChannel").style.cursor = 'not-allowed';

                        //        }

                        //    }
                        //}
                        //catch { }

                    }
                    else if (arrActionQuery[i].ActionType.toUpperCase() == "VALIDATE_MANDATORY") {
                        var dbDataRows1, dbDataRows2;
                        var row_count = 0;
                        var unhide_count = 0;
                        var _qry = "select mc.ScreenName,mc.FieldName,fc.FieldControl,mc.ConditionField,mc.ConditionValue from mandatoryconfig mc,formconfig fc where   mc.fieldname like fc.fieldname and mc.ismandatory=1 and mc.solutionname like '" + SolutionName + "' and (fc.screenname like (mc.screenname + '%')) and (mc.screenname like '" + arrActionQuery[i].ScreenName + "' OR mc.screenname like '" + arrActionQuery[i].ScreenName + "_%') order by mc.priorityseq;";
                        // Select * from mandatoryconfig where screenname like '" + arrActionQuery[i].ScreenName + "'";
                        execute(_qry);
                        dbDataRows = executeQry;

                        _qry = "select mc.ScreenName,mc.FieldName,fc.FieldControl,mc.fieldcontrol as fcontrol,mc.ConditionField,mc.ConditionValue,mc.Condition from mandatorylistconfig mc,listconfig fc where   mc.fieldname like fc.fieldname and mc.ismandatory=1 and mc.solutionname like '" + SolutionName + "' and (fc.screenname like (mc.screenname + '%')) and mc.screenname like '" + arrActionQuery[i].ScreenName + "%' order by mc.priorityseq;";
                        execute(_qry);
                        dbDataRows1 = executeQry;
                        //dbDataRows = dbDataRows;
                        var tmpFlag = false;

                        try {
                            for (var j = 0; j <= dbDataRows.length - 1; j++) {
                                var obj = dbDataRows[j];
                                try {
                                    var fName = obj["ConditionField"];
                                    if (fName !== null && fName !== "") {
                                        try {
                                            var condValue;

                                            if (obj["fcontrol"] == "CHECKBOX")
                                                condValue = document.getElementById(fName).checked;// $('#' + fName).val();
                                            else
                                                condValue = $('#' + fName).val();

                                            if (obj["ConditionValue"] == condValue) {

                                                var chk = "";
                                                chk = $('#' + obj["FieldName"]).val();

                                                //try {
                                                //    if (obj["FieldControl"] == "COMBOBOX") {
                                                //        //  var tmpval = $('#' + fName);
                                                //        var tmpval = document.getElementById(obj["FieldName"]);
                                                //        if (tmpval.options[0].innerText.toLowerCase().indexOf('select') && chk == '0')
                                                //            chk = '';
                                                //        // if (chk.toLowerCase().indexOf('select') > -1)
                                                //        //   chk = '';
                                                //    }
                                                //} catch (e) {

                                                //}
                                                try {
                                                    if (obj["FieldControl"] == "COMBOBOX" || obj["FieldControl"] == "COMBOBOXSEARCH") {
                                                        //  var tmpval = $('#' + fName);
                                                        //var tmpval = document.getElementById(obj["FieldName"]);
                                                        if (chk.toLowerCase().indexOf('select') > -1)
                                                            chk = '';
                                                        // if (chk.toLowerCase().indexOf('select') > -1)
                                                        //   chk = '';
                                                    }
                                                } catch (e) {

                                                }

                                                if (chk == "" || chk == null) {
                                                    tmpFlag = true;
                                                    document.getElementById(obj["FieldName"]).style.border = "2px solid red";
                                                    document.getElementById(obj["FieldName"]).setAttribute("title", "Enter " + obj["FieldName"]);
                                                    //ADDED BY SUNDAR ON 02-12-2024
                                                    try {
                                                        var el = document.getElementById(obj["FieldName"]);
                                                        var closestParent = el.parentNode.closest('.labeltext');
                                                        let toolt = document.createElement("div");
                                                        toolt.className = "invalid-tooltip";
                                                        toolt.id = "tooltip_" + obj["FieldName"];
                                                        toolt.innerHTML = "Please fill the detail.";
                                                        toolt.style.cssText = 'background-color: #c83434;color: #fff;margin-left: 0px;padding: 6px;position: absolute;text-align: center;text-decoration: none;text-shadow: none;z-index: 4;-webkit-border-radius: 3px;-moz-border-radius: 3px;-o-border-radius: 3px;border-radius: 3px;';

                                                        closestParent.append(toolt);
                                                    } catch (e) {

                                                    }


                                                    if (obj["FieldControl"] == "COMBOBOXSEARCH") {
                                                        const element = document.querySelector('[aria-labelledby="select2-' + obj["FieldName"] + '-container"]');
                                                        element.style.border = "2px solid red";
                                                    }
                                                }
                                                else {
                                                    //ADDED BY SUNDAR ON 02-12-2024
                                                    try {
                                                        var el = document.getElementById("tooltip_" + obj["FieldName"]);
                                                        el.remove();
                                                    } catch (e) {

                                                    }

                                                    document.getElementById(obj["FieldName"]).style.border = "1px solid Lightgrey";
                                                    if (obj["FieldControl"] == "COMBOBOXSEARCH") {
                                                        const element = document.querySelector('[aria-labelledby="select2-' + obj["FieldName"] + '-container"]');
                                                        element.style.border = "1px solid Lightgrey";
                                                    }

                                                }

                                            }
                                            //else {
                                            //    document.getElementById(obj["FieldName"]).style.border = "1px solid Lightgrey";
                                            //}

                                        } catch (err) {

                                        }

                                    }
                                    else {
                                        if (obj["FieldControl"] == "LISTVIEW") {
                                            try {
                                                // var condValue2 = arrActionQuery[i].ScreenName + "_LISTVIEW_" + dbDataRows[j].FieldName; //$('#' + fName1).val();
                                                var condValue2 = obj["ScreenName"] + "_LISTVIEW_" + dbDataRows[j].FieldName;
                                                dbDataRows2 = dbDataRows1.filter(x => x.ScreenName === condValue2);
                                            } catch (err) {

                                            }
                                            //  var tblbody = document.getElementById("ListBodyDivId_" + arrActionQuery[i].ScreenName + "_" + dbDataRows[j].FieldName);
                                            var tblbody = document.getElementById("ListBodyDivId_" + obj["ScreenName"] + "_" + dbDataRows[j].FieldName);
                                            //  tblbody.rows[z].cells.namedItem(cellname).innerText
                                            for (var h = 0; h <= dbDataRows2.length - 1; h++) {
                                                var obj2 = dbDataRows2[h];

                                                row_count = tblbody.rows.length;

                                                
                                                for (var k = 0; k <= row_count - 1; k++) {
                                                    if (tblbody.rows[k].style.display == '')
                                                        unhide_count = unhide_count + 1;
                                                }

                                                if (tblbody.rows.length > 1)
                                                    row_count = tblbody.rows.length - 1;

                                                if (unhide_count == 1)
                                                    row_count = tblbody.rows.length;


                                                var fName = obj2["ConditionField"];
                                                if (fName !== null && fName !== "") {
                                                    if (obj2["fcontrol"] == "CHECKBOX")
                                                        condValue = document.getElementById(fName).checked;// $('#' + fName).val();
                                                    else
                                                        condValue = $('#' + fName).val();

                                                    try {
                                                        if (obj2["ConditionValue"] == condValue) {
                                                            for (var k = 0; k <= row_count - 1; k++) {
                                                                if (tblbody.rows[k].style.display == '') {
                                                                var chk = "";

                                                                chk = tblbody.rows[k].cells.namedItem(obj2["FieldName"]).childNodes['0'].value;//$('#' + obj["FieldName"]).val();
                                                                if (chk == "" || chk == null) {
                                                                    tmpFlag = true;
                                                                    tblbody.rows[k].cells.namedItem(obj2["FieldName"]).childNodes['0'].style.border = "2px solid red";

                                                                    var eleme = document.getElementById("tooltip_" + obj2["FieldName"]);
                                                                    if (eleme != null)
                                                                        eleme.remove();

                                                                    try {
                                                                        var el = document.getElementById(tblbody.rows[k].cells.namedItem(obj2["FieldName"]).childNodes['0']);
                                                                        //var closestParent = el.parentNode.closest('.fa fa-plus');
                                                                        var closestParent = el.closest('tr').find('."' + obj2["FieldName"] + '"').text();
                                                                        let toolt = document.createElement("div");
                                                                        toolt.className = "invalid-tooltip";
                                                                        toolt.id = "tooltip_" + obj2["FieldName"];
                                                                        toolt.innerHTML = "Please fill the detail.";
                                                                        toolt.style.cssText = 'background-color: #c83434;color: #fff;margin-left: 0px;padding: 6px;position: absolute;text-align: center;text-decoration: none;text-shadow: none;z-index: 4;-webkit-border-radius: 3px;-moz-border-radius: 3px;-o-border-radius: 3px;border-radius: 3px;';
                                                                        tblbody.rows[k].cells.namedItem(obj2["FieldName"]).childNodes['0'].append(toolt);

                                                                    } catch (e) {

                                                                    }

                                                                }
                                                                else
                                                                    tblbody.rows[k].cells.namedItem(obj2["FieldName"]).childNodes['0'].style.border = "1px solid Lightgrey";
                                                                }
                                                            }

                                                        }
                                                        else {
                                                            for (var k = 0; k <= row_count - 1; k++) {

                                                                tblbody.rows[k].cells.namedItem(obj2["FieldName"]).childNodes['0'].style.border = "1px solid Lightgrey";
                                                            }
                                                        }
                                                    } catch (e) {

                                                    }



                                                }
                                                else if (obj2["Condition"] != null) {
                                                    var tmpqry = obj2["Condition"];
                                                    var startPos, endPos, keyVal;

                                                    for (var k = 0; k <= row_count - 1; k++) {

                                                        try {
                                                            startPos = tmpqry.indexOf('{');
                                                            endPos = 0; keyVal = '';
                                                            while (startPos > -1) {
                                                                endPos = tmpqry.indexOf('}', startPos + 1);
                                                                keyVal = tmpqry.substr(startPos + 1, (endPos - startPos - 1));

                                                                var val1 = 'null';

                                                                if (keyVal.indexOf('FormView.') > -1) {
                                                                    val1 = formatQueryString('{' + keyVal + '}', sScreenName);
                                                                }
                                                                else {


                                                                    val1 = tblbody.rows[k].cells.namedItem(keyVal).childNodes['0'].value;

                                                                    if (val1 == '' || val1 == undefined)
                                                                        val1 = "null";

                                                                }
                                                                tmpqry = tmpqry.replace('{' + keyVal + '}', val1);
                                                                startPos = tmpqry.indexOf('{');
                                                            }

                                                            //for (var l = 0; l < tblbody.cells.length; l++) {

                                                            //    if (tmpqry.indexOf(tblbody.cells[l].name) > -1)
                                                            //    {
                                                            //        tmpqry = tmpqry.replace('{' + tblbody.cells[l].name + '}', tblbody.rows[k].cells.namedItem(tblbody.cells[l].name).childNodes['0'].value);
                                                            //    }
                                                            //}
                                                            execute(tmpqry);
                                                            var res = executeQry;
                                                            var obj3 = res[0];

                                                            try {
                                                                if (obj3["Response"] == "1") {
                                                                    tmpFlag = true;
                                                                    tblbody.rows[k].cells.namedItem(obj2["FieldName"]).childNodes['0'].style.border = "2px solid red";

                                                                    //ADDED BY SUNDAR ON 02-12-2024
                                                                    try {
                                                                        var el = document.getElementById(tblbody.rows[k].cells.namedItem(obj2["FieldName"]).childNodes['0']);
                                                                        var closestParent = el.closest('tr').find('."' + obj2["FieldName"] + '"').text();

                                                                        var eleme = document.getElementById("tooltip_" + obj2["FieldName"]);
                                                                        if (eleme != null)
                                                                            eleme.remove();

                                                                        let toolt = document.createElement("div");
                                                                        toolt.className = "invalid-tooltip";
                                                                        toolt.id = "tooltip_" + obj2["FieldName"];
                                                                        toolt.innerHTML = "Please fill the detail.";
                                                                        toolt.style.cssText = 'background-color: #c83434;color: #fff;margin-left: 0px;padding: 6px;position: absolute;text-align: center;text-decoration: none;text-shadow: none;z-index: 4;-webkit-border-radius: 3px;-moz-border-radius: 3px;-o-border-radius: 3px;border-radius: 3px;';
                                                                        tblbody.rows[k].cells.namedItem(obj2["FieldName"]).childNodes['0'].append(toolt);
                                                                    } catch (e) {

                                                                    }
                                                                }
                                                                else
                                                                    tblbody.rows[k].cells.namedItem(obj2["FieldName"]).childNodes['0'].style.border = "1px solid Lightgrey";
                                                            } catch (e) {

                                                            }
                                                        } catch (e) {

                                                        }

                                                    }
                                                    //  var tmpqry;
                                                    //tmpqry = formatQueryString(obj2["ConditionField"], sScreenName);//ScreenView

                                                }
                                                else {


                                                    for (var k = 0; k <= row_count - 1; k++) {
                                                        if (tblbody.rows[k].style.display == '') {
                                                        try {
                                                            var chk = "";

                                                            chk = tblbody.rows[k].cells.namedItem(obj2["FieldName"]).childNodes['0'].value;//$('#' + obj["FieldName"]).val();

                                                            try {
                                                                if (chk == undefined)
                                                                    chk = tblbody.rows[k].cells.namedItem(obj2["FieldName"]).childNodes['0'].nodeValue;
                                                            } catch (e) {

                                                            }

                                                            try {
                                                                if (chk == undefined)
                                                                    chk = tblbody.rows[k].cells.namedItem(obj2["FieldName"]).childNodes['0'].innerText;
                                                            } catch (e) {

                                                            }

                                                            try {
                                                                if (obj2["FieldControl"] == "COMBOBOX" || obj2["FieldControl"] == "COMBOBOXSEARCH") {
                                                                    //  var tmpval = $('#' + fName);
                                                                    //var tmpval = document.getElementById(obj["FieldName"]);
                                                                    if (chk.toLowerCase().indexOf('select') > -1)
                                                                        chk = '';
                                                                    // if (chk.toLowerCase().indexOf('select') > -1)
                                                                    //   chk = '';
                                                                }
                                                            } catch (e) {

                                                            }

                                                            try {
                                                                if (chk == "" || chk == null) {
                                                                    tmpFlag = true;
                                                                    tblbody.rows[k].cells.namedItem(obj2["FieldName"]).childNodes['0'].style.border = "2px solid red";
                                                                    //document.getElementById(obj2["FieldName"]).setAttribute("title", "Enter " + obj2["FieldName"]);

                                                                    var eleme = document.getElementById("tooltip_" + obj2["FieldName"]);
                                                                    if (eleme != null)
                                                                        eleme.remove();

                                                                    //ADDED BY SUNDAR ON 02-12-2024
                                                                    try {
                                                                        let toolt = document.createElement("span");
                                                                        toolt.className = "invalid-tooltip";
                                                                        toolt.id = "tooltip_" + obj2["FieldName"];
                                                                        toolt.innerHTML = "Please fill the detail.";
                                                                        toolt.style.cssText = 'background-color: #c83434;color: #fff;margin-left: 0px;padding:3px;position: relative;text-align: center;text-decoration: none;text-shadow: none;z-index: 4;-webkit-border-radius: 3px;-moz-border-radius: 3px;-o-border-radius: 3px;border-radius:10px;font-size:9px;';
                                                                        //tblbody.rows[k].cells.namedItem(obj2["FieldName"]).childNodes['0'].append(toolt);
                                                                        tblbody.rows[k].cells.namedItem(obj2["FieldName"]).appendChild(toolt);

                                                                    } catch (e) {
                                                                       // alert(e);
                                                                    }

                                                                    if (obj2["FieldControl"] == "COMBOBOXSEARCH") {
                                                                        const element = document.querySelector('[aria-labelledby="select2-' + obj2["FieldName"] + k + '-container"]');
                                                                        element.style.border = "2px solid red";
                                                                    }

                                                                }
                                                                else {
                                                                    tblbody.rows[k].cells.namedItem(obj2["FieldName"]).childNodes['0'].style.border = "1px solid Lightgrey";
                                                                    if (obj2["FieldControl"] == "COMBOBOXSEARCH") {
                                                                        const element = document.querySelector('[aria-labelledby="select2-' + obj2["FieldName"] + k + '-container"]');
                                                                        element.style.border = "1px solid Lightgrey";
                                                                    }
                                                                }
                                                            } catch (e) {

                                                            }
                                                        } catch (e) {

                                                        }
                                                      }
                                                    }
                                                }

                                            }
                                        }
                                        else {
                                            var chk = "";

                                            chk = $('#' + obj["FieldName"]).val();

                                            try {
                                                if (obj["FieldControl"] == "COMBOBOX" || obj["FieldControl"] == "COMBOBOXSEARCH") {
                                                    //  var tmpval = $('#' + fName);
                                                    //var tmpval = document.getElementById(obj["FieldName"]);
                                                    if (chk.toLowerCase().indexOf('select') > -1)
                                                        chk = '';
                                                    // if (chk.toLowerCase().indexOf('select') > -1)
                                                    //   chk = '';
                                                }
                                            } catch (e) {

                                            }
                                            //try {
                                            //    if (obj["FieldControl"] == "COMBOBOX") {
                                            //        //  var tmpval = $('#' + fName);
                                            //        var tmpval = document.getElementById(obj["FieldName"]);
                                            //        if (tmpval.options[0].innerText.toLowerCase().indexOf('select') && chk == '0')
                                            //            chk = '';
                                            //        // if (chk.toLowerCase().indexOf('select') > -1)
                                            //        //   chk = '';
                                            //    }
                                            //} catch (e) {

                                            //}

                                            try {
                                                if (chk == "" || chk == null) {
                                                    tmpFlag = true;
                                                    document.getElementById(obj["FieldName"]).style.border = "2px solid red";
                                                    document.getElementById(obj["FieldName"]).setAttribute("title", "Enter " + obj["FieldName"]);

                                                    //ADDED BY SUNDAR ON 02-12-2024
                                                    try {
                                                        var el = document.getElementById(obj["FieldName"]);
                                                        var closestParent = el.parentNode.closest('.labeltext');
                                                        let toolt = document.createElement("div");
                                                        toolt.className = "invalid-tooltip";
                                                        toolt.id = "tooltip_" + obj["FieldName"];
                                                        toolt.innerHTML = "Please fill out the detail.";
                                                        toolt.style.cssText = 'background-color: #c83434;color: #fff;margin-left: 0px;padding:3px;position: absolute;text-align: center;text-decoration: none;text-shadow: none;z-index: 4;-webkit-border-radius: 3px;-moz-border-radius: 3px;-o-border-radius: 3px;border-radius:10px;font-size:9px;';

                                                        closestParent.append(toolt);
                                                    } catch (e) {

                                                    }

                                                    if (obj["FieldControl"] == "COMBOBOXSEARCH") {
                                                        const element = document.querySelector('[aria-labelledby="select2-' + obj["FieldName"] + '-container"]');
                                                        element.style.border = "2px solid red";
                                                    }
                                                }
                                                else {
                                                    //ADDED BY SUNDAR ON 02-12-2024
                                                    try {
                                                        var el = document.getElementById("tooltip_" + obj["FieldName"]);
                                                        el.remove();
                                                    } catch (e) {

                                                    }

                                                    document.getElementById(obj["FieldName"]).style.border = "1px solid Lightgrey";
                                                    if (obj["FieldControl"] == "COMBOBOXSEARCH") {
                                                        const element = document.querySelector('[aria-labelledby="select2-' + obj["FieldName"] + '-container"]');
                                                        element.style.border = "1px solid Lightgrey";
                                                    }
                                                }
                                            } catch (e) {

                                            }
                                        }
                                    }
                                } catch (e) {

                                }

                            }
                        } catch (e) {

                        }

                        if (tmpFlag == true) {
                            tmpFlag = false;

                            LoadingImagePopUpClose();

                            obj = {};
                            obj.title = "Alert!";
                            obj.message = arrActionQuery[i].ActionFailedValue;
                            showAlertMessage(obj);
                            try {
                                LoadingImagePopUpClose();
                                LoadingImageClose();
                            }
                            catch {

                            }
                            break;
                            // alert(arrActionQuery[i].ActionFailedValue);
                        }

                        var _obj = {};
                        _obj.value = arrActionQuery[i].fieldName;
                        _obj.fieldName = arrActionQuery[i].fieldName;
                        PerformAction(arrActionQuery[i].ActionFailedValue, _obj);

                        // LoadingImagePopUpClose();
                    }
                    else if (arrActionQuery[i].ActionType.toUpperCase() == "AUTOCOMPLETE_SUGGEST") {
                        var countries = [];
                        var actionPlan = arrActionQuery[i].Action;
                        var res = GetQueryString(actionPlan);
                        var i = 0;
                        for (i = 0; i < res.length; i++)
                            countries[i] = res[i].Text;

                        autocomplete(document.getElementById(objData.fieldName), countries);
                    }
                    else if (arrActionQuery[i].ActionType.toUpperCase() == "ZPL_PRINT") {

                        LoadingImagePopUpOpen();
                        // LoadingImageOpen();
                        isExecute = true;
                        setTimeout(function () {
                            isExecute = false;
                            PerformAction(tempsActionEvent, tempobjData, (tempPAi + 1));
                        }, 200);


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

                        PerformActioninfo("REPORT  : " + qry + " " + qry1 + " " + qry2);
                        // NORMAL SITE
                        //Sessionstorage["Print"] = "true";
                        //sessionStorage.setItem("Print", "true");
                        var pnt = "ZPL_PRINT";
                        var lblSize = arrActionQuery[i].Action;

                            $.ajax({
                                type: 'POST',
                                url: url_ReportsViewStoreParams1,
                                data: { InitReport: qry, ReportName: qry1, LoadReport: qry2, Print: pnt, lblSize: lblSize },
                                dataType: 'text',
                                async: false,
                                success: function (data) {
                                    ;
                                }
                            });
                        LoadingImagePopUpClose();
                            window.open(url_ReportsView2);
                                                 //  window.open(url_ReportsView + "?InitReport=" + qry + "&ReportName=" + qry1 + "&LoadReport=" + ReplaceSpecialCharacter(JSON.stringify(qry2)) + "&Print=ZPL_PRINT");
                        
                    }
                    else if (arrActionQuery[i].ActionType.toUpperCase() == "PRINT") {
                        
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

                            PerformActioninfo("REPORT  : " + qry + " " + qry1 + " " + qry2);
                            // NORMAL SITE
                            //Sessionstorage["Print"] = "true";
                            //sessionStorage.setItem("Print", "true");
                        var pnt = "true";
                        if (ProjectName == "SEJ") {

                            $.ajax({
                                type: 'POST',
                                url: url_ReportsViewStoreParams,
                                data: { InitReport: qry, ReportName: qry1, LoadReport: qry2, Print: pnt },
                                dataType: 'text',
                                async: false,
                                success: function (data) {
                                    ;
                                }
                            });
                            window.open(url_ReportsView2);
                        }
                        else {
                            window.open(url_ReportsView1 + "?InitReport=" + qry + "&ReportName=" + qry1 + "&LoadReport=" + ReplaceSpecialCharacter(JSON.stringify(qry2)) + "&Print=true");
                        }
                    }
                    else if (arrActionQuery[i].ActionType.toUpperCase() == "AUTO_PRINT") {

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

                        PerformActioninfo("REPORT  : " + qry + " " + qry1 + " " + qry2);
                        // NORMAL SITE
                        //Sessionstorage["Print"] = "true";
                        //sessionStorage.setItem("Print", "true");
                        window.open(url_ReportsView1 + "?InitReport=" + qry + "&ReportName=" + qry1 + "&LoadReport=" + ReplaceSpecialCharacter(JSON.stringify(qry2)) + "&Print=autoprint");

                    }
                    else if (arrActionQuery[i].ActionType.toUpperCase() == "REPORT") {
                        //sessionStorage.setItem("Print", "false");
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

                        PerformActioninfo("REPORT  : " + qry + " " + qry1 + " " + qry2);
                        if (ProjectName == "SEJ" || ProjectName == "OFII") {

                            $.ajax({
                                type: 'POST',
                                url: url_ReportsViewStoreParams,
                                data: { InitReport: qry, ReportName: qry1, LoadReport: qry2 },
                                dataType: 'text',
                                async: false,
                                success: function (data) {
                                    ;
                                }
                            });
                            window.open(url_ReportsView2);
                        }
                        else {
                            // NORMAL SITE
                            window.open(url_ReportsView1 + "?InitReport=" + ReplaceSpecialCharacter(qry) + "&ReportName=" + qry1 + "&LoadReport=" + ReplaceSpecialCharacter(JSON.stringify(qry2)));
                            //// MOBILE SITE
                            //window.open(url_ReportsView1 + "?InitReport=" + qry + "&ReportName=" + qry1 + "&LoadReport=" + ReplaceSpecialCharacter(JSON.stringify(qry2)), '_self');
                        }
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
                        PerformActioninfo("REPORT New : " + qry + " " + qry1 + " " + qry2);
                        //window.location = url_ReportsView + "?InitReport=" + qry + "&ReportName=" + qry1 + "&LoadReport=" + qry2;//single parameter
                        //Newly added by.M 29.11.2021
                        window.open(url_ReportsView1 + "?InitReport=" + qry.toString().trim() + "&ReportName=" + qry1.toString().trim() + "&LoadReport=" + ReplaceSpecialCharacter(JSON.stringify(qry2.toString().trim())));
                        //29.11.2021 - sandltest-Stock Take With Snapshot
                        //window.location = url_ReportsView1 + "?InitReport=" + qry + "&ReportName=" + qry1 + "&LoadReport=" + ReplaceSpecialCharacter(JSON.stringify(qry2));//single parameter

                    }
                    else if (arrActionQuery[i].ActionType.toUpperCase() == "LOGOUT") {
                        PageLogOut("");
                        //PageLogOut("sessionexpired");
                    }
                    else if (arrActionQuery[i].ActionType.toUpperCase() == "INDICATOR") {
                        if (arrActionQuery[i].Action == "PLEASEWAIT_CLOSE") {//ListView please wait loading image  close
                           // LoadingImagePopUpClose();
                            //$("#formContainer").children().removeAttr("disabled");
                            //$("#formContainer").find("checkbox,button").removeAttr("disabled");
                            //$("body").find("*").removeAttr("disabled");
                            //$("#formContainer").find("*").removeAttr("disabled");
                            //$("body").find("a").unbind("click");
                            LoadingImageClose();

                            try {
                                var arr = [];

                                arr = arrActionQuery[i].ActionValue.split(",");

                                for (var ab = 0; ab < arr.length; ab++) {
                                    $('#Button_' + arr[ab]).removeAttr("disabled");
                                    document.getElementById('Button_' + arr[ab]).style.cursor = 'pointer';
                                }
                            } catch (e) {

                            }

                            //document.querySelector("body").style.visibility = "visible";
                            //document.querySelector("#formContainer").style.visibility = "visible";
                            //document.querySelector(".tab").style.visibility = "visible";
                        }
                        else if (arrActionQuery[i].Action == "PLEASEWAIT_OPEN") {//ListView please wait loading image  
                            //$("#formContainer").find("*").attr("disabled", "disabled");
                             //$("body").find("*").attr("disabled", "disabled");
                            //$("#formContainer").find("checkbox,button").prop("disabled", true);
                            //document.querySelector("body").style.visibility = "hidden";
                            //document.querySelector("#formContainer").style.visibility = "hidden";
                            //document.querySelector(".tab").style.visibility = "hidden";

                            //$("#formContainer").children().attr("disabled", "disabled");
                            
                            //$("body").find("a").click(function (e) { e.preventDefault(); });
                            LoadingImageOpen();

                            try {
                                var arr = [];

                                arr = arrActionQuery[i].ActionFailedValue.split(",");

                                for (var ab = 0; ab < arr.length; ab++) {
                                    $('#Button_' + arr[ab]).attr("disabled", "disabled");
                                    document.getElementById('Button_' + arr[ab]).style.cursor = 'not-allowed';
                                }
                            } catch (e) {

                            }
                                

                            //LoadingImagePopUpOpen();
                            // LoadingImageOpen();
                            isExecute = true;
                            setTimeout(function () {
                                isExecute = false;
                                PerformAction(tempsActionEvent, tempobjData, (tempPAi + 1));

                                
                            }, 200);
                        }

                        //or
                        if (arrActionQuery[i].Action == "HIDEINDICATOR") {//ListView please wait loading image  close
                            LoadingImagePopUpClose();
                            //LoadingImageClose();
                        }
                        else if (arrActionQuery[i].Action == "SHOWINDICATOR") {//ListView please wait loading image  
                            LoadingImagePopUpOpen();
                            // LoadingImageOpen();
                            isExecute = true;
                            setTimeout(function () {
                                isExecute = false;
                                PerformAction(tempsActionEvent, tempobjData, (tempPAi + 1));
                            }, 200);
                        }
                        //var dd = 0;
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
                    else if (arrActionQuery[i].ActionType.toUpperCase() == "EXPORT") {
                        //Newly added by.M 07.02.2023
                        try {
                            var actionPlan = arrActionQuery[i].Action;
                            var qry = getString['QueryConfig_' + actionPlan];
                            var groupBy = getString['QueryConfig_' + actionPlan + '_GroupText'];
                            var orderBy = getString['QueryConfig_' + actionPlan + '_OrderText'];
                            qry = formatQueryString(qry, actionPlan);
                            ExportFormListConfig(arrActionQuery[i].ScreenName, qry, groupBy, orderBy);
                        } catch (e) {
                            alert(e.message);
                        }
                    }
                    else if (arrActionQuery[i].ActionType.toUpperCase() == "EXECUTE_ROW_JAVASCRIPT") {
                        try {
                            
                            var jsFieldname = objData.fieldName;
                            //CheckItemPromotion({FormView.ListView.ItemNo},{FormView.UserID},{FormView.CustId},{SYSTEM.PriceGroup},{FormView.ListView.Qty},{FormView.ListView.Amount})
                            //CheckItemPromotion({FormView.itemid},{FormView.UserID},{FormView.CustId},{SYSTEM.PriceGroup},{ListView.Qty},{FormView.TotalAmt})
                            var start = arrActionQuery[i].Action.indexOf("{");
                            var end;
                            var key;
                            var trial = 0;
                            var actionvalue = null; 
                            //  while (start > -1 && trial < 100) {
                            end = arrActionQuery[i].Action.indexOf("}");
                            key = arrActionQuery[i].Action.substring(start + 1, end);

                            var split = arrActionQuery[i].Action.split("(", 2);
                            var valueSplit = split[1].split(",");
                            var listView = [];
                            for (var j = 0; j < valueSplit.length; j++) {
                                var value = valueSplit[j].substring(1, valueSplit[j].length - 1);
                                listView.push(value);
                            }
                            var parameternums = [];
                            var finalvalue = "";
                            var tempName = "";
                            for (var b = 0; b < listView.length; b++) {
                                var tempName = listView[b].replace("}", "");
                                tempName = "{" + tempName + "}";
                                value = formatQueryString(tempName, "");

                                if (finalvalue == "") {
                                    finalvalue = value;
                                } else {
                                    finalvalue = finalvalue + "," + value;
                                }
                                parameternums.push(value);
                            }

                            var functionName = split[0];
                            ////

                            var queryParameter = arrActionQuery[i].Action.split('(')[1].replace(')', "");
                            //queryParameter = queryParameter.replace('{SYSTEM.PriceGroup}', "'RETAIL'")
                            //queryParameter = queryParameter.replace('{FormView.ListView.Category}', "'CAT01'")
                            var replacequeryParameter = "";

                            _ttbody = "ListBodyDivId_" + arrActionQuery[i].ScreenName + "_Item";
                            _ttbody = "ListBodyDivId_" + CurrentScreen_TabScreen_Name + "_Item"; //FGV

                            var tblbody = document.getElementById(_ttbody);
                            var _data = tblbody.rows;
                            var ListName = _ttbody.split('_')[_ttbody.split('_').length - 1]
                            if (_data.length > 0) {
                                for (var ctr = 0; ctr < (_data.length - 1); ctr++) {
                                    if (ctr == currentRowClickCount) {
                                        if (tblbody.childNodes[ctr].childElementCount == 0);
                                        else {
                                            setListValue("", ListName, ctr, _ttbody);
                                            replacequeryParameter = formatQueryString(queryParameter, '');
                                            LoadingImagePopUpOpen();
                                            eval(SQL_JAVASCRIPTRESULT + "= " + functionName + '("' + replacequeryParameter + '");'); //eval("RESULT = " + functionName + '("' + finalvalue + '");'); //getItemPrice(finalvalue); // setStringValue("RESULT", '43')
                                            //alert(JSON.stringify(RESULT));
                                            LoadingImagePopUpClose();

                                        }
                                    }
                                }
                            }


                            ////


                            //var nums = [1, 2];
                            //getItemPrice1.apply(null, parameternums);


                            //eval(SQL_JAVASCRIPTRESULT + "= " + functionName + '("' + finalvalue + '");'); //eval("RESULT = " + functionName + '("' + finalvalue + '");'); //getItemPrice(finalvalue); // setStringValue("RESULT", '43')

                            var result = RESULT;
                            alert(result);
                        } catch (e) {

                        }
                    }
                    else if (arrActionQuery[i].ActionType.toUpperCase() == "EXECUTE_JAVASCRIPT") {

                        try {
                            itemsss = '';
                            var jsFieldname = objData.fieldName;
                            //CheckItemPromotion({FormView.ListView.ItemNo},{FormView.UserID},{FormView.CustId},{SYSTEM.PriceGroup},{FormView.ListView.Qty},{FormView.ListView.Amount})
                            //CheckItemPromotion({FormView.itemid},{FormView.UserID},{FormView.CustId},{SYSTEM.PriceGroup},{ListView.Qty},{FormView.TotalAmt})
                            var start = arrActionQuery[i].Action.indexOf("{");
                            var end;
                            var key;
                            var trial = 0;
                            var actionvalue = null;
                            //  while (start > -1 && trial < 100) {
                            end = arrActionQuery[i].Action.indexOf("}");
                            key = arrActionQuery[i].Action.substring(start + 1, end);

                            var split = arrActionQuery[i].Action.split("(", 2);
                            var valueSplit = split[1].split(",");
                            var listView = [];
                            for (var j = 0; j < valueSplit.length; j++) {
                                var value = valueSplit[j].substring(1, valueSplit[j].length - 1);
                                listView.push(value);
                            }
                            var parameternums = [];
                            var finalvalue = "";
                            var tempName = "";
                            for (var b = 0; b < listView.length; b++) {
                                var tempName = listView[b].replace("}", "");
                                tempName = "{" + tempName + "}";
                                value = formatQueryString(tempName, "");

                                if (finalvalue == "") {
                                    finalvalue = value;
                                } else {
                                    finalvalue = finalvalue + "," + value;
                                }
                                parameternums.push(value);
                            }

                            var functionName = split[0];
                            ////

                            var queryParameter = arrActionQuery[i].Action.split('(')[1].replace(')', "");
                            //queryParameter = queryParameter.replace('{SYSTEM.PriceGroup}', "'RETAIL'")
                            //queryParameter = queryParameter.replace('{FormView.ListView.Category}', "'CAT01'")
                            var replacequeryParameter = "";

                            if (arrActionQuery[i].ScreenName == "PrintPickingReportForm") {
                                replacequeryParameter = formatQueryString(queryParameter, '');

                                eval(SQL_JAVASCRIPTRESULT + "= " + functionName + '("' + replacequeryParameter + '");');
                            }
                            else if (arrActionQuery[i].ScreenName.toLowerCase() == "mappickerformnew") {
                                replacequeryParameter = formatQueryString(queryParameter, '');
                                replacequeryParameter = "'" + arrActionQuery[i].ScreenName + "'," + replacequeryParameter;
                                eval(SQL_JAVASCRIPTRESULT + "= " + functionName + '(' + replacequeryParameter + ');');
                            }
                            else if (arrActionQuery[i].ScreenName == "OTPForm") {
                                replacequeryParameter = formatQueryString(queryParameter, '');
                                replacequeryParameter = "'" + arrActionQuery[i].ScreenName + "'," + replacequeryParameter;
                                eval(SQL_JAVASCRIPTRESULT + "= " + functionName + '(' + replacequeryParameter + ');');
                            }
                            else if (arrActionQuery[i].ScreenName == "OptimizedRoutes") {
                                replacequeryParameter = formatQueryString(queryParameter, '');
                                replacequeryParameter = replacequeryParameter;
                                eval(SQL_JAVASCRIPTRESULT + "= " + functionName + '(' + replacequeryParameter + ');');
                            }
                            else if (arrActionQuery[i].ScreenName == "AdjustInventorytoLotForm") {
                                replacequeryParameter = formatQueryString(queryParameter, '');
                                replacequeryParameter = "'" + arrActionQuery[i].ScreenName + "'," + replacequeryParameter;
                                eval(SQL_JAVASCRIPTRESULT + "= " + functionName + '(' + replacequeryParameter + ');');



                            }
                            else if (arrActionQuery[i].ScreenName == "CustomerFeedbackList") {
                                //replacequeryParameter = formatQueryString(queryParameter, '');
                                console.log("java: 1");
                               // eval(SQL_JAVASCRIPTRESULT + "= " + functionName + '(' + replacequeryParameter + ');');
                                _ttbody = "ListBodyDivId_" + arrActionQuery[i].ScreenName + "_Lstcustfeedback";
                                var tblbody = document.getElementById(_ttbody);
                                var _data = tblbody.rows;
                                var ListName = _ttbody.split('_')[_ttbody.split('_').length - 1]
                                if (_data.length > 0) {
                                    for (var ctr = 0; ctr < (_data.length-1); ctr++) {
                                        if (tblbody.childNodes[ctr].childElementCount == 0);
                                        else {
                                            setListValue("", ListName, ctr, _ttbody);
                                           // var tst = '';
                                           // tst = formatQueryString('{FormView.Lstcustfeedback.AssignTo}', '');

                                            //if (tst.replace(/'/g, "") != '') {
                                                replacequeryParameter = formatQueryString(queryParameter, '');
                                                replacequeryParameter = "'" + arrActionQuery[i].ScreenName + "'," + replacequeryParameter;
                                                console.log("java: 2" + replacequeryParameter);
                                                LoadingImagePopUpOpen();
                                                eval(SQL_JAVASCRIPTRESULT + "= " + functionName + '(' + replacequeryParameter + ');'); //eval("RESULT = " + functionName + '("' + finalvalue + '");'); //getItemPrice(finalvalue); // setStringValue("RESULT", '43')
                                                //alert(JSON.stringify(RESULT));
                                                LoadingImagePopUpClose();
                                            //}

                                        }
                                    }
                                }

                            }
                            else if (arrActionQuery[i].ScreenName == "PONewDistributorForm") {
                                //var qry = "select * from (select Distinct ItemNo,ItemName,UOM,UOM as UOMC,Qty,Qty as HQty,SuggestedQty,FORMAT(Price,'N4') as HUnitPrice,isnull(Price,0) as UnitPrice,isnull(SubAmt,0) as TotalAmt,FORMAT(isnull(SubAmt,0),'N2') as HTotalAmt,Reason,Location as LocationCode,UserID,'' as ItemImage from dbo.PONewDistributorFormTemp WITH(NOLOCK) where UserID={FormView.UserID} and PONo={FormView.PONo}) A WHERE 1=1  and Qty>0";

                                var qry = "select ItemNo,UOM,Qty,'' as Category,SubAmt as TotalAmt from podet where PONo='" + document.getElementById("PONo").value + "'";

                                //qry = formatQueryString(qry, sScreenName);

                                execute(qry);

                                var _data = executeQry;

                                for (var ctr = 0; ctr < _data.length; ctr++) {

                                    //queryParameter = "CheckItemPromotion({FormView.ListView.ItemNo},{FormView.ListView.UOM},{FormView.Distributor},{FormView.ListView.ItemName},{FormView.ListView.Qty},{FormView.ListView.TotalAmt},{FormView.PODt},{FormView.PODt})";

                                    queryParameter = queryParameter.replace('{FormView.ListView.ItemNo}', "'" + _data[ctr]["ItemNo"] + "'");
                                    queryParameter = queryParameter.replace('{FormView.ListView.UOM}', "'" + _data[ctr]["UOM"] + "'");
                                    queryParameter = queryParameter.replace('{FormView.Distributor}', "'" + document.getElementById("Distributor").value + "'");
                                    queryParameter = queryParameter.replace('{FormView.ListView.ItemName}', "'" + _data[ctr]["Category"] + "'");
                                    queryParameter = queryParameter.replace('{FormView.ListView.Qty}', "'" + _data[ctr]["Qty"] + "'");
                                    queryParameter = queryParameter.replace('{FormView.ListView.TotalAmt}', "'" + _data[ctr]["TotalAmt"] + "'");
                                    var tmpp = formatQueryString('{FormView.PODt}', '');
                                    queryParameter = queryParameter.replace('{FormView.PODt}', "'" + document.getElementById("PODt").value + "'");
                                    queryParameter = queryParameter.replace('{FormView.PODt}', "'" + document.getElementById("PODt").value + "'");


                                    replacequeryParameter = formatQueryString(queryParameter, '');
                                    //LoadingImagePopUpOpen();
                                    eval(SQL_JAVASCRIPTRESULT + "= " + functionName + '("' + replacequeryParameter + '");'); //eval("RESULT = " + functionName + '("' + finalvalue + '");'); //getItemPrice(finalvalue); // setStringValue("RESULT", '43')
                                    //alert(JSON.stringify(RESULT));
                                    // LoadingImagePopUpClose();


                                }
                            }
                            else {
                                _ttbody = "ListBodyDivId_" + arrActionQuery[i].ScreenName + "_Item";
                                _ttbody = "ListBodyDivId_" + CurrentScreen_TabScreen_Name + "_Item"; //FGV
                                
                                var tblbody = document.getElementById(_ttbody);
                                var _data = tblbody.rows;
                                var ListName = _ttbody.split('_')[_ttbody.split('_').length - 1]
                                if (_data.length > 0) {
                                    for (var ctr = 0 ; ctr < (_data.length-1); ctr++) {
                                        if (tblbody.childNodes[ctr].childElementCount == 0);
                                        else {
                                            setListValue("", ListName, ctr, _ttbody);
                                            replacequeryParameter = formatQueryString(queryParameter, '');
                                            LoadingImagePopUpOpen();
                                            eval(SQL_JAVASCRIPTRESULT + "= " + functionName + '("' + replacequeryParameter + '");'); //eval("RESULT = " + functionName + '("' + finalvalue + '");'); //getItemPrice(finalvalue); // setStringValue("RESULT", '43')
                                            //alert(JSON.stringify(RESULT));
                                            LoadingImagePopUpClose();

                                        }
                                    }
                                }


                                ////


                                //var nums = [1, 2];
                                //getItemPrice1.apply(null, parameternums);


                                //eval(SQL_JAVASCRIPTRESULT + "= " + functionName + '("' + finalvalue + '");'); //eval("RESULT = " + functionName + '("' + finalvalue + '");'); //getItemPrice(finalvalue); // setStringValue("RESULT", '43')
                                
                                var result = RESULT;
                                alert(result);
                                
                                //alert(result.PromoId + ' - ' + result.DisAmt);
                                
                                

                              
                                //alert(RESULT);
                                //var _obj = {};
                                //_obj.value = jsFieldname;
                                //_obj.fieldName = arrActionQuery[i].fieldName;
                                //var actionValue = arrActionQuery[i].ActionValue.trim() == "" ? "JavaScriptFinished" : arrActionQuery[i].ActionValue;
                                //PerformAction(actionValue, _obj);
                            }

                        } catch (e) {
                            alert(e.message);
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
                    }
                    else if (arrActionQuery[i].ActionType.toUpperCase() == "BACK") {
                        LoadingImageClose();
                        var screenName = arrActionQuery[i].ScreenName;
                        var actionValue = (screenName.split('NewForm').length == 2) ? screenName.replace("NewForm", "List") : screenName.replace("Form", "List");
                        var fieldName = (screenName.split('NewForm').length == 2) ? "sm" + screenName.replace("NewForm", "") : "sm" + screenName.replace("Form", "");
                        setCookie('ClickEvent', arrActionQuery[i].ActionName);
                        window.location = url_FormViewList + "?ScreenName=" + actionValue + "";//single parameter
                    }
                    else if (arrActionQuery[i].ActionType.toUpperCase() == "NOTIFICATION_ALERT") {
                        var sActionVal = arrActionQuery[i].ActionValue;
                        var arrBtn = sActionVal == null ? "" : sActionVal.split(",");
                        var _obj = {};
                        _obj.Type = "ALERT";
                        _obj.fieldName = objData.fieldName;
                        PerformActioninfo("Action : " + arrActionQuery[i].Action + " , ActionValue: -" + sActionVal);
                        showAlert(arrActionQuery[i].Action, arrBtn, _obj);

                        try {
                            LogQry = baseLogQry;

                            if (executeLog == true) {

                                webAuditLog('Alert', Screen_NewText, alertMsg);

                            }

                        } catch (e) {

                        }

                        isDynamicValidate = false;
                        if (ProjectName.toLowerCase() == "selasihaman" && currentScreenName == "ItemMasterLabelPrintingForm" && arrActionQuery[i].Action == "PRINTALERT")
                            document.getElementById("HeaderCheckBox_1").checked = false;
                        //  break;
                    }
                    else if (arrActionQuery[i].ActionType.toUpperCase() == "ALERT") {
                        var sActionVal = arrActionQuery[i].ActionValue;
                        var arrBtn = sActionVal == null ? "" : sActionVal.split(",");
                        var _obj = {};
                        _obj.Type = "ALERT";
                        _obj.fieldName = objData.fieldName;
                        PerformActioninfo("Action : " + arrActionQuery[i].Action + " , ActionValue: -" + sActionVal);
                        var len = 0;

                        try {
                            if (arrActionQuery[i].ActionFailedValue != null && arrActionQuery[i].ActionFailedValue != '')
                            len = arrActionQuery[i].ActionFailedValue;
                        }
                        catch { }

                        showAlert(arrActionQuery[i].Action, arrBtn, _obj,len);

                        try {
                            LogQry = baseLogQry;
                            if (executeLog == true) {

                                webAuditLog('Alert', Screen_NewText, alertMsg);

                            }

                        } catch (e) {

                        }

                        isDynamicValidate = false;

                        if (ProjectName.toLowerCase() == "selasihaman" && currentScreenName == "ItemMasterLabelPrintingForm" && arrActionQuery[i].Action == "PRINTALERT")
                            document.getElementById("HeaderCheckBox_1").checked = false;

                        LoadingImageClose();

                        //if (ProjectName.toLowerCase() == "fgv" || ProjectName.toLowerCase() == "ebff")
                          //  break;

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
                        //debugger;
                        if (arrActionQuery[i].Action.indexOf("_Check_DrawCircle") > -1) {
                            MapMarkerDrawCircle();
                        }
                        else if (arrActionQuery[i].Action.indexOf("_MapRoute") > -1) {
                            initialize("MAPROUTE");//mapRoute.js
                            //initMapWaypointsDirections("MAPROUTE");
                            // calcRoute("MAPROUTE");
                            // initMapWaypointsDirections("MAPROUTE");
                        }
                        else {
                            SetMapMarker();
                        }
                        //MapPickerForm_MAPMARKER_DrawCircle
                    }
                    else if (arrActionQuery[i].ActionType.toUpperCase() == "EXECUTETIMER") {

                        if (isTimerEvent == false) {
                            isTimerEvent = true;
                            mapTimer = mapTimer == "" ? "30" : mapTimer;
                            setIntervaltimer = setInterval(function () {
                                if (TimerIdList.length > 0) {
                                    for (var iz = 0; iz < TimerIdList.length; iz++) {
                                        _obj = {};
                                        //_obj.fieldName = "Timer";//arrActionQuery[i].fieldName;
                                        _obj.fieldName = TimerIdList[iz].DataMember;
                                        CurrentScreen_TabScreen_Name = TimerIdList[iz].ScreenName;
                                        //PerformAction('formButtonClicked', _obj);
                                        PerformAction('timerEventRun', _obj);
                                    }
                                }
                                //}, mapTimer * 60 * 1000);
                            }, mapTimer * 1000);
                        }

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
                                //  alert("test : : " + results);
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
                        var field = arrActionQuery[i].ActionValue;//getFormComponent(arrActionQuery[i].ActionValue);
                        TiAPIinfo('field ' + field);
                        if (field != null && field != undefined && field != '') {
                            $("#" + field).focus();
                            // $("#ToteBox").focus();

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
                    }
                    else if (arrActionQuery[i].ActionType.toUpperCase() == "DROPDOWN") {
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

                    }
                    //else if ((arrActionQuery[i].ActionType.toUpperCase() == "VALIDATE") || (arrActionQuery[i].ActionType.toUpperCase() == "VALIDATELIST")) {
                    else if ((arrActionQuery[i].ActionType.toUpperCase() == "VALIDATE")) {
                    var qry = getQueryConfigByScreenName(arrActionQuery[i].Action);//ArrayOperations

                        //qry = "Select 1 as Response";
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
                            //debugger;
                            qry = formatQueryString(qry, currentScreenName);//screenView
                            PerformActioninfo("ValidateQry : " + qry);
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
                                            //newly added.By.M.22.06.2023
                                            if (_isdynamic == true)
                                                _ispagination = _previousispagination;
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
                            PerformActioninfo("Table Id : " + tblId);
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
                        else if (arrActionQuery[i].Action.indexOf("_LIST_SUM_") > -1) {//Execute Query FORMCONFIG _LIST_Check_

                            var sScreenName = arrActionQuery[i].Action;
                            qry = getString['QueryConfig_' + sScreenName];
                            qry += ' ' + getString['QueryConfig_' + sScreenName + '_GroupText'];
                            qry += ' ' + getString['QueryConfig_' + sScreenName + '_OrderText'];

                            var cellname = null;
                            var totValue = 0;
                            var tmpScreenName = arrActionQuery[i].Action;
                            dynamicFieldName = dynamicFieldName == "" ? tmpScreenName.split('_LIST_SUM_')[1].split('_')[0] : dynamicFieldName;

                            try {
                                var tmpVal = tmpScreenName.split("_LIST_SUM_")[1];
                                cellname = tmpVal.split('_')[1];
                            } catch (err2) {

                            }

                            //cellname = cellname == "" ? tmpScreenName.split('_LIST_SUM_')[1].split('_')[1] : cellname;

                            var scrName = tmpScreenName.split("_LIST_SUM_")[0];
                            var tblbody = document.getElementById("ListBodyDivId_" + scrName + "_" + dynamicFieldName);
                            var listData = tblbody.rows;
                            var listCount = 0;
                            if (listData.length > 1) {
                                for (var z = 0; z < (listData.length - 1); z++) {
                                    try {
                                        totValue = totValue + parseInt(tblbody.rows[z].cells.namedItem(cellname).innerText);
                                    } catch (err2) {

                                    }
                                                                      
                                }
                            }

                            if (qry.indexOf("SUM({FormView.ListView." + cellname + "}) ") > -1)
                                qry = qry.replace("SUM({FormView.ListView." + cellname + "}) ", totValue);
                            else if (qry.indexOf("SUM({FormView.Item." + cellname + "}) ") > -1)
                                qry = qry.replace("SUM({FormView.Item." + cellname + "}) ", totValue);

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
                                        break;
                                    }
                                }
                            }
                        }
                        else if (arrActionQuery[i].Action.toLowerCase() == "validatetrue") {
                            isValidateList = true;
                            var _obj = {};
                            _obj.value = arrActionQuery[i].fieldName;
                            _obj.fieldName = arrActionQuery[i].fieldName;
                            PerformAction(arrActionQuery[i].ActionValue, _obj);
                        }
                        else {
                            var sScreenName = arrActionQuery[i].Action;
                            var tblId = arrActionQuery[i].Action.split('_')[0] + "_" + arrActionQuery[i].Action.split('_')[1];
                            var listViewName = arrActionQuery[i].Action.split('_')[1];

                            if (isMultiClose == false) {
                                isMultiSelect = false;
                                isMultiClose = true;
                            }


                            if (isAutoSelect == true)
                                isMultiSelect = false;

                             //Removed for selasihaman by Nisha on 19-04-2024
                            if (!isMultiSelect) {
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

                                var qrys = '';

                                for (var iIndex = 0; iIndex < tblrowCount; iIndex++) {
                                    try {
                                        if ((tblbody.rows[iIndex].cells.length) || (deletedrows == tblrowCount)) {
                                            // newly Added by.M09.12.2021-etika salesorder multiselect ============
                                            FieldName = listViewName;
                                            setListValue("", fieldName, iIndex, ttbodyId);
                                            if (isRowDeleted == false || iIndex == 0) {
                                                var test = FormView[listViewName];
                                                // Added 12.08.2020 ============
                                                FieldName = listViewName;
                                                qry = getString['QueryConfig_' + sScreenName];
                                                qry += ' ' + getString['QueryConfig_' + sScreenName + '_GroupText'];
                                                qry += ' ' + getString['QueryConfig_' + sScreenName + '_OrderText'];
                                                qry = formatQueryString(qry, sScreenName);
                                                PerformActioninfo("ValidateListQuery : " + qry);
                                                if (arrActionQuery[i].ActionName.toLowerCase() == "autocompleteentered" && iIndex == currentRowIndex) {
                                                    qry = "Select 1 as Response";
                                                }

                                                if (ProjectName.toLowerCase() == "fgv" && currentScreenName == 'PhysicalCountForm') {
                                                    if (qrys == '')
                                                        qrys = qry;
                                                    else
                                                        qrys = qrys + ";" + qry;
                                                }
                                                else {
                                                execute(qry);
                                                dbDataRows = executeQry;

                                                if (dbDataRows != null && dbDataRows.length > 0) {
                                                    if (dbDataRows[0].response == true || dbDataRows[0].response == 1 || dbDataRows[0].Response == true || dbDataRows[0].Response == 1 || dbDataRows[0].RESPONSE == true || dbDataRows[0].RESPONSE == 1) {
                                                        isSuccess = true;
                                                    }
                                                    else if (dbDataRows[0].response == false || dbDataRows[0].response == 0 || dbDataRows[0].Response == false || dbDataRows[0].Response == 0 || dbDataRows[0].RESPONSE == false || dbDataRows[0].RESPONSE == 0) {
                                                        isSuccess = false;
                                                        try {
                                                            $('#' + arrActionQuery[i].fieldName + iIndex).val(""); //added by nisha 20-01-2024 to clear wrong data 
                                                        }
                                                        catch (err1) {

                                                        }
                                                        if (arrActionQuery[i].ActionFailedValue != '') {
                                                            var _obj = {};
                                                            _obj.value = arrActionQuery[i].fieldName;
                                                            _obj.fieldName = arrActionQuery[i].fieldName;
                                                            PerformAction(arrActionQuery[i].ActionFailedValue, _obj);
                                                            isDynamicValidate = false;   // Menu Locked & show alert message only dtd 10.01.2024
                                                            return false;                // Menu Locked & show alert message only dtd 10.01.2024
                                                        }
                                                        iIndex = tblbody.rows.length + 1;
                                                      }
                                                    }
                                                }

                                            }
                                        }
                                    } catch (err) {

                                    }

                                }  // ROW ITERATION ====

                                if (ProjectName.toLowerCase() == "fgv" && currentScreenName == 'PhysicalCountForm') {
                                    execute1(qrys);


                                    dbDataRows = executeQry;

                                    var tmp = dbDataRows.length;

                                    try {
                                        tmp = Object.keys(dbDataRows).length;
                                    }
                                    catch { }

                                    try {
                                        for (var ab = 0; ab < tmp; ab++) {
                                            if (dbDataRows != null && tmp > 0) {
                                                if (dbDataRows[ab].response == true || dbDataRows[ab].response == 1 || dbDataRows[ab].Response == true || dbDataRows[ab].Response == 1 || dbDataRows[ab].RESPONSE == true || dbDataRows[ab].RESPONSE == 1) {
                                                    isSuccess = true;
                                                }
                                                else if (dbDataRows[ab].response == false || dbDataRows[ab].response == 0 || dbDataRows[ab].Response == false || dbDataRows[ab].Response == 0 || dbDataRows[ab].RESPONSE == false || dbDataRows[ab].RESPONSE == 0) {
                                                    isSuccess = false;
                                                    break;
                                                    // iIndex = tblbody.rows.length + 1;
                                                }
                                            }
                                        }

                                        if (isSuccess == false) {
                                            //try {
                                            //    $('#' + arrActionQuery[i].fieldName + iIndex).val(""); //added by nisha 20-01-2024 to clear wrong data 
                                            //}
                                            //catch (err1) {

                                            //}
                                            if (arrActionQuery[i].ActionFailedValue != '') {
                                                var _obj = {};
                                                _obj.value = arrActionQuery[i].fieldName;
                                                _obj.fieldName = arrActionQuery[i].fieldName;
                                                PerformAction(arrActionQuery[i].ActionFailedValue, _obj);
                                                isDynamicValidate = false;   // Menu Locked & show alert message only dtd 10.01.2024
                                                return false;
                                                //break;// Menu Locked & show alert message only dtd 10.01.2024
                                            }
                                        }

                                    } catch (e) {

                                    }
                                }

                                FormView[listViewName] = listViewValues;

                            }
                            else
                               isSuccess = true;
                            if (isSuccess == true) {
                                if (arrActionQuery[i].ActionValue != '') {
                                    isValidateList = true;
                                    var _obj = {};
                                    _obj.value = arrActionQuery[i].fieldName;
                                    _obj.fieldName = arrActionQuery[i].fieldName;
                                    PerformAction(arrActionQuery[i].ActionValue, _obj);
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
                            console.log(e);
                            //alert(e);
                        }

                    }


                    else if (arrActionQuery[i].ActionType.toUpperCase() == "POPUP_CONTAINER") {
                        //debugger;
                        //var sDashScreenName = arrActionQuery[i].ActionValue;
                        //var arrFormFields = [];
                        //var arrFields = [];//ARRAYOPERATION
                        //var _obj1 = {};
                     //   PopupContainderClose1();

                        var _obj = {};
                        _obj.currentScreenName = arrActionQuery[i].ActionValue;

                        try {
                            //newly added by.M 19.10.2022 - danone popup container - popup close page reresh avoid
                            var arrayfrm = _objArray.arrForm;
                            if (arrayfrm != undefined) {
                                var val = "";
                                var fieldComponent = '', fieldControl = '';
                                for (var k = 0; k < arrayfrm.length; k++) {
                                    val = getFormComponentValue(arrayfrm[k].fieldName);
                                    if (val != "LISTVIEW")
                                        FormView[arrayfrm[k].fieldName] = val;
                                    else if (val == "LISTVIEW" && arrActionQuery[i].fieldName == "CreateBtn")
                                        FormView[arrayfrm[k].fieldName] = "";
                                }
                            }

                            var tmpp_scrname = arrActionQuery[i].ActionValue;

                            var qry = "";
                            var _FieldName = "";
                            setCookie('FormView', JSON.stringify(""));
                            setCookie('FormView', "");
                            // COMMENTED 22.03.2021
                            setCookie('FormView', (JSON.stringify(FormView)));

                            previousScreenName = arrActionQuery[i].ScreenName;
                            if (ProjectName == "PVMIGT" && (previousScreenName == "PjpapprovalDSEForm" || previousScreenName == "PJPapprovalASMForm" || previousScreenName == "PJPapprovalBSMForm" || previousScreenName == "PJPapprovalBMForm" || previousScreenName == "PjpapprovalForm" || previousScreenName == "DeviationapprovalDSEForm" || previousScreenName == "DeviationapprovalASMForm" || previousScreenName == "DeviationapprovalBSMForm" || previousScreenName == "DeviationapprovalBMForm" || previousScreenName == "DeviationapprovalForm") && objData.value.toLowerCase() == "market work")
                                ExecuteQryConfig_PopupContainder('PjpapprovalDSEMarketWorkForm');
                            else if (ProjectName == "PVMIGT" && (previousScreenName == "PjpapprovalDSEForm" || previousScreenName == "PJPapprovalASMForm" || previousScreenName == "PJPapprovalBSMForm" || previousScreenName == "PJPapprovalBMForm" || previousScreenName == "PjpapprovalForm" || previousScreenName == "DeviationapprovalDSEForm" || previousScreenName == "DeviationapprovalASMForm" || previousScreenName == "DeviationapprovalBSMForm" || previousScreenName == "DeviationapprovalBMForm" || previousScreenName == "DeviationapprovalForm") && objData.value.toLowerCase() == "in transit")//arrActionQuery[i].ActionValue);
                                ExecuteQryConfig_PopupContainder('PjpapprovalDSEInTransitForm');
                            else if (ProjectName == "PVMIGT" && (previousScreenName == "PjpapprovalDSEForm" || previousScreenName == "PJPapprovalASMForm" || previousScreenName == "PJPapprovalBSMForm" || previousScreenName == "PJPapprovalBMForm" || previousScreenName == "PjpapprovalForm" || previousScreenName == "DeviationapprovalDSEForm" || previousScreenName == "DeviationapprovalASMForm" || previousScreenName == "DeviationapprovalBSMForm" || previousScreenName == "DeviationapprovalBMForm" || previousScreenName == "DeviationapprovalForm") && objData.value.toLowerCase() == "meeting")//arrActionQuery[i].ActionValue);
                                ExecuteQryConfig_PopupContainder('PjpapprovalDSEMeetingForm');
                            else if (ProjectName == "PVMIGT" && (previousScreenName == "PjpapprovalDSEForm" || previousScreenName == "PJPapprovalASMForm" || previousScreenName == "PJPapprovalBSMForm" || previousScreenName == "PJPapprovalBMForm" || previousScreenName == "PjpapprovalForm" || previousScreenName == "DeviationapprovalDSEForm" || previousScreenName == "DeviationapprovalASMForm" || previousScreenName == "DeviationapprovalBSMForm" || previousScreenName == "DeviationapprovalBMForm" || previousScreenName == "DeviationapprovalForm"))//arrActionQuery[i].ActionValue);
                                return;
                            else
                                ExecuteQryConfig_PopupContainder(arrActionQuery[i].ActionValue);



                            if (ProjectName == "CPF" && arrActionQuery[i].ScreenName == "InvoiceListAssignForm") {
                                var div = document.getElementById("popupdialog_Container_ThirdLevel");
                                div.style.height = "210px";

                               
                                //div.style.top = ((window.innerHeight / 2) - (div.offsetHeight / 2)) + 'px';
                               // div.style.left = ((window.innerWidth / 2) - (div.offsetWidth / 2)) + 'px';
                            }
                            else if (ProjectName == "Motul Sales" && tmpp_scrname == "WebDashBoardNewDetailForm") {
                                var div = document.getElementById("popupdialog_Container_ThirdLevel");
                                div.style.height = "400px";
                               // div.style.width = "500px";

                                //div.style.top = ((window.innerHeight / 2) - (div.offsetHeight / 2)) + 'px';
                                // div.style.left = ((window.innerWidth / 2) - (div.offsetWidth / 2)) + 'px';
                            }
                            
                            _obj.fieldName = "form";
                            //_obj.value = $('#' + dataMember).val();
                            PerformAction('formLoad', _obj/*, dataMember*/);
                            // window.open(url_FormClickEvent + "?ScreenName=" + arrActionQuery[i].ActionValue + "&FieldName=" + _FieldName + "", '_blank');

                            //return;
                        } catch (e) {
                            //alert(e);
                        }

                    }
                    else if (arrActionQuery[i].ActionType.toUpperCase() == "POPUP_IMAGE_CONTAINER") {
                        try {
                            setCookie('FormView', JSON.stringify(""));
                            setCookie('FormView', "");
                            // COMMENTED 22.03.2021
                            setCookie('FormView', (JSON.stringify(FormView)));
                            isPOPUPIMAGECONTAINER = true;
                            previousScreenName = arrActionQuery[i].ScreenName;
                            ExecuteQryConfig_PopupContainder(arrActionQuery[i].ActionValue);
                        } catch (e) {
                            //alert(e);
                        }
                    }
                    else if (arrActionQuery[i].ActionType.toUpperCase() == "POPUP_CONTAINER_CLOSE") {
                        PopupContainderClose(); //Newly added by.M 08.03.2023 - limtraders - packer assignmet form


                        try {
                           // if (ProjectName == "FGV" && currentScreenName == "PONewDistributorForm") {
                                var _obj = {};
                                _obj.fieldName = "RefreshBtn";
                                //_obj.value = $('#' + dataMember).val();
                                PerformAction('formButtonClicked', _obj/*, dataMember*/);
                           // }
                        } catch (e) {

                        }
                        

                           if (currentScreenName == "CustomerForm")
                            manualShowMandatory('CustomerForm')
                    }
                    else if (arrActionQuery[i].ActionType.toUpperCase() == "FORMNEWTAB") {
                        //Newly added by.M28.01.2022 - SandLTest SO- row click form goto new tab
                        var sDashScreenName = arrActionQuery[i].ActionValue;
                        var arrFormFields = [];
                        var arrFields = [];//ARRAYOPERATION
                        var _obj1 = {};

                        try {
                            var arrayfrm = _objArray.arrForm;
                            if (arrayfrm != undefined) {
                                var val = "";
                                var fieldComponent = '', fieldControl = '';
                                for (var k = 0; k < arrayfrm.length; k++) {
                                    val = getFormComponentValue(arrayfrm[k].fieldName);
                                    if (val != "LISTVIEW")
                                        FormView[arrayfrm[k].fieldName] = val;
                                    else if (val == "LISTVIEW" && arrActionQuery[i].fieldName == "CreateBtn")
                                        FormView[arrayfrm[k].fieldName] = "";
                                }
                            }
                            var qry = "";
                            var _FieldName = "";
                            setCookie('FormView', JSON.stringify(""));
                            setCookie('FormView', "");
                            setCookie('ScreenName', JSON.stringify(""));
                            setCookie('ScreenName', "");
                            setCookie('ClickEvent', JSON.stringify(""));
                            setCookie('ClickEvent', "");

                            // COMMENTED 22.03.2021
                            setCookie('FormView', (JSON.stringify(FormView)));
                            //setCookie('FormView' + arrActionQuery[i].ActionValue, (JSON.stringify(FormView)));

                            //Newly added by.M 01.09.2021
                            if (getCookie('FormView') == "") {
                                $.ajax({
                                    type: 'POST',
                                    url: url_TempStoreFormView,
                                    data: { data: JSON.stringify(FormView) },
                                    async: false,
                                    success: function (result) {
                                    }
                                });
                            }

                            //setCookie('FormView', ReplaceSpecialCharacter(JSON.stringify(FormView)));

                            //  return;
                            setCookie('ScreenName', arrActionQuery[i].ActionValue);
                            setCookie('ClickEvent', arrActionQuery[i].ActionName);
                            window.open(url_FormClickEvent + "?ScreenName=" + arrActionQuery[i].ActionValue + "&FieldName=" + _FieldName + "");
                            return;
                        } catch (e) {

                        }
                    }
                    else if (arrActionQuery[i].ActionType.toUpperCase() == "FORMNEWTABCLOSE") {
                        this.window.open('', '_self', '');
                        this.window.close();
                    }
                        // COMMENTED 29.12.2020 THIRD LEVEL FORM ================================================
                    else if (arrActionQuery[i].ActionType.toUpperCase() == "FORMNEW") {
                      
                        var sDashScreenName = arrActionQuery[i].ActionValue;
                        var arrFormFields = [];
                        var arrFields = [];//ARRAYOPERATION
                        var _obj1 = {};

                        try {
                            var arrayfrm = _objArray.arrForm;
                            if (arrayfrm != undefined) {
                                var val = "";
                                var fieldComponent = '', fieldControl = '';
                                for (var k = 0; k < arrayfrm.length; k++) {
                                    val = getFormComponentValue(arrayfrm[k].fieldName);
                                    if (val != "LISTVIEW")
                                        FormView[arrayfrm[k].fieldName] = val;
                                    else if (val == "LISTVIEW" && arrActionQuery[i].fieldName == "CreateBtn")
                                        FormView[arrayfrm[k].fieldName] = "";
                                }
                            }
                            var qry = "";
                            var _FieldName = "";
                            setCookie('FormView', JSON.stringify(""));
                            setCookie('FormView', "");
                            setCookie('ScreenName', JSON.stringify(""));
                            setCookie('ScreenName', "");
                            setCookie('ClickEvent', JSON.stringify(""));
                            setCookie('ClickEvent', "");

                            // COMMENTED 22.03.2021
                            setCookie('FormView', (JSON.stringify(FormView)));
                            //setCookie('FormView' + arrActionQuery[i].ActionValue, (JSON.stringify(FormView)));

                            //Newly added by.M 01.09.2021
                            if (getCookie('FormView') == "") {
                                $.ajax({
                                    type: 'POST',
                                    url: url_TempStoreFormView,
                                    data: { data: JSON.stringify(FormView) },
                                    async: false,
                                    success: function (result) {
                                    }
                                });
                            }

                            //setCookie('FormView', ReplaceSpecialCharacter(JSON.stringify(FormView)));

                            //  return;
                            setCookie('ScreenName', arrActionQuery[i].ActionValue);
                            setCookie('ClickEvent', arrActionQuery[i].ActionName);
                            window.open(url_FormClickEvent + "?ScreenName=" + arrActionQuery[i].ActionValue + "&FieldName=" + _FieldName + "");
                            return;
                        } catch (e) {

                        }
                        
                    }
                    else if (arrActionQuery[i].ActionType.toUpperCase() == "FORM") {
                        itemsss = '';
                        isColorLegend = false;
                      //  if (ProjectName == "CPF") {
                        try {
                            document.getElementById("formContainer").removeAttribute('style');
                            document.getElementById("FormListDivId").removeAttribute('style');
                        } catch (e) {

                        }
                       // }

                        localStorage.setItem('isEdit', 'no');
                      //

                        if (arrActionQuery[i].ActionName == "rowItemClicked" || arrActionQuery[i].ActionName == "PONewFormEdit")
                        {
                            localStorage.setItem('isEdit', 'yes'); isEditScreen = "yes";
                        }
                        else if (ProjectName == "FrostFood" && arrActionQuery[i].ActionValue == "FunctionsSettingsForm")
                            localStorage.setItem('isEdit', 'yes');

                        var sDashScreenName = arrActionQuery[i].ActionValue;
                        var arrFormFields = [];
                        var arrFields = [];//ARRAYOPERATION
                        var _obj1 = {};

                        try {
                            var arrayfrm = _objArray.arrForm;
                            try {
                                if (arrayfrm != undefined) {
                                    var val = "";
                                    var fieldComponent = '', fieldControl = '';
                                    for (var k = 0; k < arrayfrm.length; k++) {
                                        val = getFormComponentValue(arrayfrm[k].fieldName);
                                        if (val != "LISTVIEW")
                                            FormView[arrayfrm[k].fieldName] = val;
                                        else if (val == "LISTVIEW" && arrActionQuery[i].fieldName == "CreateBtn")
                                            FormView[arrayfrm[k].fieldName] = "";
                                    }
                                }
                            } catch (e) {

                            }

                            var qry = "";
                            var _FieldName = "";
                            setCookie('FormView', JSON.stringify(""));
                            setCookie('FormView', "");
                            setCookie('ScreenName', JSON.stringify(""));
                            setCookie('ScreenName', "");
                            setCookie('ClickEvent', JSON.stringify(""));
                            setCookie('ClickEvent', "");

                            // COMMENTED 22.03.2021
                            if (arrActionQuery[i].ActionValue == "VehicleAssignmentForm" && (ProjectName == "POC" || ProjectName == "WSA")) { }
                            else {
                                setCookie('FormView', (JSON.stringify(FormView)));
                                //Newly added by.M 01.09.2021
                                if (getCookie('FormView') == "") {
                                    $.ajax({
                                        type: 'POST',
                                        url: url_TempStoreFormView,
                                        data: { data: JSON.stringify(FormView) },
                                        async: false,
                                        success: function (result) {
                                        }
                                    });
                                }
                            }
                            setCookie('ScreenName', arrActionQuery[i].ActionValue);
                            setCookie('ClickEvent', arrActionQuery[i].ActionName);
                            PageLoadinginfo("PerformAction('menuItemClicked', _obj) End : => Call to Redirect Action Controller");
                            // window.location = url_FormViewList1 + "?ScreenName=" + arrActionQuery[i].ActionValue + "&FieldName=" + FieldName + "&FormView=" + "" + "" + "&query=" + ReplaceSpecialCharacter(qry) + "&obj1=";//single parameter
                            //// window.location = url_FormViewList1 + "?ScreenName=" + arrActionQuery[i].ActionValue + "&FieldName=" + FieldName + "&FormView=" + ReplaceSpecialCharacter(JSON.stringify(FormView)) + "" + "&query=" + ReplaceSpecialCharacter(qry) + "&obj1=" + ReplaceSpecialCharacter(JSON.stringify(_obj1));//single parameter

                            //todo
                            //DashboardForm - pvm
                            if ((arrActionQuery[i].ActionValue == "VehicleAssignmentForm" || arrActionQuery[i].ActionValue == "VehicleAssignmentList" || arrActionQuery[i].ActionValue == "DashboardForm" || arrActionQuery[i].ActionValue == "PrePackForm" ||
                                arrActionQuery[i].ActionValue == "SurveyList" || arrActionQuery[i].ActionValue == "SurveyForm" ||
                                arrActionQuery[i].ActionValue == "ViewSurvey" || arrActionQuery[i].ActionValue == "ViewSurveyForm" ||
                                arrActionQuery[i].ActionValue == "BarcodeConfigPage" || arrActionQuery[i].ActionValue == "Chats" || isVehicleAssignment == true || currentScreenName == "SurveyList" || currentScreenName == "Web_DashBoard") && (arrActionQuery[i].ActionValue != "SalesOrderForm")){
                                window.location = url_FormViewList + "?ScreenName=" + arrActionQuery[i].ActionValue + "";//single parameter
                              //  MenuConfig();
                            }
                            else {
                                window.history.pushState('', '', url_FormViewList + "?ScreenName=" + arrActionQuery[i].ActionValue + "");
                                $("#FormListDivId").empty();

                                var tempArr = [];
                                tempArr = arrActionQuery;

                                PopupContainderClose1();
                                LoadingImageOpen();
                                setTimeout(function () {
                                    if (arrActionQuery.length > 0)
                                        NewWindowOpen(qry, arrActionQuery[i].ActionValue.trim());
                                    else
                                        NewWindowOpen(qry, tempArr[i].ActionValue.trim());
                                    LoadingImageClose();

                                    var _obj = {};
                                    _obj.fieldName = "form";
                                    //_obj.value = $('#' + dataMember).val();
                                    PerformAction('formLoad', _obj/*, dataMember*/);
                                    isEditScreen = "no";
                                }, 350);

                                if (arrActionQuery[i].ActionFailedValue.toLowerCase() == "colorlegend")
                                    isColorLegend = true;

                                if (arrActionQuery[i].ActionName == "ChangePasswordForm")
                                    RandomPwd = '';

                                isAutoSelect = false;

                            }


                            //todo
                            //Newly added by.M 03.11.2021
                            //window.location = url_FormViewList + "?ScreenName=" + arrActionQuery[i].ActionValue + "";//single parameter

                            //todo //
                            // window.location = url_FormClickEvent + "?ScreenName=" + arrActionQuery[i].ActionValue + "&FieldName=" + _FieldName + "";//single parameter
                            //window.open(url_FormClickEvent + "?ScreenName=" + arrActionQuery[i].ActionValue + "&FieldName=" + _FieldName + ""); 
                           // isEditScreen = "no";
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
                    }
                        //else if (arrActionQuery[i].ActionType.toUpperCase() == "FORM") {

                        //    var sDashScreenName = arrActionQuery[i].ActionValue;
                        //    var arrFormFields = [];
                        //    var arrFields = [];//ARRAYOPERATION
                        //    var _obj1 = {};

                        //    try {
                        //        var arrayfrm = _objArray.arrForm;
                        //        //if (arrayfrm != undefined) {
                        //        //    var fieldComponent = '', fieldControl = '';
                        //        //    for (var k = 0; k < arrayfrm.length; k++) {
                        //        //        arrFields.push(arrayfrm[k].fieldName);
                        //        //        arrFormFields.push(getFormComponentValue(arrayfrm[k].fieldName)); //ARRAYOPERATION
                        //        //    }

                        //        if (arrayfrm != undefined) {
                        //            var val = "";
                        //            var fieldComponent = '', fieldControl = '';
                        //            for (var k = 0; k < arrayfrm.length; k++) {
                        //                val = getFormComponentValue(arrayfrm[k].fieldName);
                        //                if (val != "LISTVIEW")
                        //                    FormView[arrayfrm[k].fieldName] = val;
                        //                else if (val == "LISTVIEW" && arrActionQuery[i].fieldName == "CreateBtn")
                        //                    FormView[arrayfrm[k].fieldName] = "";
                        //                //arrFields.push(arrayfrm[k].fieldName);
                        //                //arrFormFields.push(getFormComponentValue(arrayfrm[k].fieldName)); //ARRAYOPERATION
                        //            }
                        //        }



                        //        var qry = "";
                        //        var _FieldName = "";
                        //        setCookie('FormView', JSON.stringify(""));
                        //        setCookie('FormView', "");
                        //        setCookie('ScreenName', JSON.stringify(""));
                        //        setCookie('ScreenName', "");
                        //        setCookie('ClickEvent', JSON.stringify(""));
                        //        setCookie('ClickEvent', "");


                        //        // COMMENTED 22.03.2021
                        //        setCookie('FormView', (JSON.stringify(FormView)));
                        //        //setCookie('FormView' + arrActionQuery[i].ActionValue, (JSON.stringify(FormView)));

                        //        //Newly added by.M 01.09.2021
                        //        if (getCookie('FormView') == "") {
                        //            $.ajax({
                        //                type: 'POST',
                        //                url: url_TempStoreFormView,
                        //                data: { data: JSON.stringify(FormView) },
                        //                async: false,
                        //                success: function (result) {
                        //                }
                        //            });
                        //        }

                        //        //setCookie('FormView', ReplaceSpecialCharacter(JSON.stringify(FormView)));

                        //        //  return;
                        //        setCookie('ScreenName', arrActionQuery[i].ActionValue);
                        //        setCookie('ClickEvent', arrActionQuery[i].ActionName);
                        //        PageLoadinginfo("PerformAction('menuItemClicked', _obj) End : => Call to Redirect Action Controller");
                        //        // window.location = url_FormViewList1 + "?ScreenName=" + arrActionQuery[i].ActionValue + "&FieldName=" + FieldName + "&FormView=" + "" + "" + "&query=" + ReplaceSpecialCharacter(qry) + "&obj1=";//single parameter
                        //        //// window.location = url_FormViewList1 + "?ScreenName=" + arrActionQuery[i].ActionValue + "&FieldName=" + FieldName + "&FormView=" + ReplaceSpecialCharacter(JSON.stringify(FormView)) + "" + "&query=" + ReplaceSpecialCharacter(qry) + "&obj1=" + ReplaceSpecialCharacter(JSON.stringify(_obj1));//single parameter
                        //        //todo

                        //        // LoadingImageOpen();
                        //        //// alert("test");
                        //        //  NewWindowOpen(qry, arrActionQuery[i].ActionValue);
                        //        // LoadingImageClose();

                        //        //todo
                        //        //Newly added by.M 03.11.2021
                        //        window.location = url_FormViewList + "?ScreenName=" + arrActionQuery[i].ActionValue + "";//single parameter

                        //        //todo //
                        //        // window.location = url_FormClickEvent + "?ScreenName=" + arrActionQuery[i].ActionValue + "&FieldName=" + _FieldName + "";//single parameter
                        //        //window.open(url_FormClickEvent + "?ScreenName=" + arrActionQuery[i].ActionValue + "&FieldName=" + _FieldName + ""); 
                        //        //info(pageLoadingLog, "PageLoadinginfo");

                        //        return;
                        //    } catch (e) {

                        //    }

                        //    try {

                        //        TiAPIinfo('*******************************');
                        //        TiAPIinfo('');
                        //        TiAPIinfo('FORMVIEW PARAMS');
                        //        TiAPIinfo('');
                        //        //var arrFields = Ti.App.ARRAYOPERATION.getFormFieldNames();
                        //        //alert(arrFields.length);

                        //        var fieldComponent = '', fieldControl = '';
                        //        for (var i = 0; i < arrFields.length; i++) {
                        //            // 
                        //            TiAPIinfo(arrFields[i] + ' - ' + Ti.App.ARRAYOPERATION.getFormComponentValue(arrFields[i]));
                        //            //arrFormFields[arrFields[i]] = Ti.App.ARRAYOPERATION.getFormComponentValue(arrFields[i]);
                        //            ////  arrFormFields.push(Ti.App.ARRAYOPERATION.getFormComponentValue(arrFields[i]));
                        //            arrFormFields.push(getFormComponentValue(arrFields[i])); //ARRAYOPERATION
                        //            /*////*******************************
                        //            //Checking FormListView
                        //            fieldComponent = Ti.App.ARRAYOPERATION.getFormComponent(arrFields[i]);

                        //            Ti.API.info('fieldComponent --> ' + fieldComponent);
                        //            if (fieldComponent != null && fieldComponent != undefined) {
                        //                fieldControl = fieldComponent.fieldControl;
                        //                if(fieldControl != null && fieldControl != undefined){
                        //                    if (fieldControl == 'LISTVIEW'){
                        //                        arrFormListViewField.push(arrFields[i]);
                        //                    }
                        //                }
                        //            }
                        //            ///*//////
                        //            if (fieldComponent != null && fieldComponent != undefined) {
                        //                fieldControl = fieldComponent.fieldControl;
                        //                if (fieldControl != null && fieldControl != undefined) {
                        //                    if (fieldControl == 'LISTVIEW') {
                        //                        arrFormListViewField.push(arrFields[i]);
                        //                    }
                        //                }
                        //            }
                        //        }

                        //        _obj1.arrFormFields = arrFields;
                        //        _obj1.arrFormFieldsValue = arrFormFields;
                        //        var arrTblFormFields = [];

                        //        var rowIndex = getSelectedRowIndex();//ArrayOperations

                        //        //var rowIndex = Ti.App.ARRAYOPERATION.getSelectedRowIndex();
                        //        TiAPIinfo('*******************************');
                        //        TiAPIinfo('');
                        //        TiAPIinfo('LISTVIEW PARAMS');
                        //        TiAPIinfo('');

                        //        TiAPIinfo('Ti.App.ARRAYOPERATION.getSelectedRowIndex() --> ' + Ti.App.ARRAYOPERATION.getSelectedRowIndex());

                        //        // var arrFields = Ti.App.ARRAYOPERATION.getTableHeaderFieldNames();
                        //        var arrFields = getTableHeaderFieldNames();//ArrayOperations
                        //        //alert(arrFields.length);

                        //        for (var i = 0; i < arrFields.length; i++) {

                        //            TiAPIinfo(arrFields[i] + ' - ' + Ti.App.ARRAYOPERATION.getColumnData(0, rowIndex, arrFields[i]));
                        //            //arrTblFormFields[arrFields[i]] = Ti.App.ARRAYOPERATION.getColumnData(0, rowIndex, arrFields[i]);
                        //            // arrTblFormFields.push(Ti.App.ARRAYOPERATION.getColumnData(0, rowIndex, arrFields[i]));
                        //            arrTblFormFields.push(getColumnData(0, rowIndex, arrFields[i], i, arrFields));//ARRAYOPERATION.
                        //        }
                        //        _obj1.arrTblFields = arrFields;
                        //        _obj1.arrTblFormFields = arrTblFormFields;

                        //        /*******************************
                        //                arrFormListViewField = [];
                        //                var arrFormListViewTblFields = [];
                        //                var arrFormListViewTblFieldsValue = [];
                        //                if(arrFormListViewField.length > 0){
                        //                    Ti.API.info('*******************************');
                        //                    Ti.API.info('');
                        //                    Ti.API.info('FORM LISTVIEW PARAMS');
                        //                    Ti.API.info('');
                        //                    //selectedTblRowIndex
                        //                    //var arrFormListViewTblFields = [];
                        //                    //var arrFormListViewTblFieldsValue = []; 

                        //                    //Ti.App.ARRAYOPERATION.setTableHeaderFieldNames("Collection_FORM_LISTVIEW_CollectionList");
                        //                    //Ti.App.ARRAYOPERATION.loadListConfigArr("Collection_FORM_LISTVIEW_CollectionList");

                        //                    var tblView = null, _data = null;
                        //                    var selectedTblRowIndex = -1;
                        //                    for(var j = 0; j < arrFormListViewField.length; j++){
                        //                        //Params.FormListView.List1.ItemNo
                        //                        Ti.API.info(currentScreenName+"_FORM_LISTVIEW_"+arrFormListViewField[j]);


                        //                        tblView = Ti.App.ARRAYOPERATION.getFormComponent(arrFormListViewField[j]);
                        //                        _data = tblView.data;
                        //                        Ti.App.ARRAYOPERATION.setTableHeaderFieldNames(tblView.tblScreenName);//currentScreenName+"_FORM_LISTVIEW_"+arrFormListViewField[j]);
                        //                        Ti.App.ARRAYOPERATION.loadListConfigArr(tblView.tblScreenName);//currentScreenName+"_FORM_LISTVIEW_"+arrFormListViewField[j]);

                        //                        selectedTblRowIndex = tblView.selectedTblRowIndex;

                        //                        if(selectedTblRowIndex > -1){

                        //                            Ti.API.info('Ti.App.ARRAYOPERATION.getTableHeaderFieldNames() ---> ' + JSON.stringify(Ti.App.ARRAYOPERATION.getTableHeaderFieldNames()));

                        //                            arrFormListViewTblFields[arrFormListViewField[j]] = Ti.App.ARRAYOPERATION.getTableHeaderFieldNames();
                        //                            //getGivenDataRowComponentData
                        //                            alert(arrFormListViewField[j] + ' - ' + tblView.selectedTblRowIndex);
                        //                            //Ti.App.ARRAYOPERATION.getGivenDataRowComponentData(_data,0,ctr,'InvNo')
                        //                            var arrFrmListViewFields = Ti.App.ARRAYOPERATION.getTableHeaderFieldNames();//arrFormListViewField[j];
                        //                            var arrTblFormListFieldsValue = [];
                        //                            for(var i = 0; i<arrFrmListViewFields.length; i++){
                        //                                Ti.API.info(arrFrmListViewFields[i] + ' - ' + Ti.App.ARRAYOPERATION.getGivenDataRowComponentData(_data, 0, selectedTblRowIndex, arrFrmListViewFields[i]));
                        //                                arrTblFormListFieldsValue.push(Ti.App.ARRAYOPERATION.getGivenDataRowComponentData(_data, 0, selectedTblRowIndex, arrFrmListViewFields[i]));
                        //                            }
                        //                            //arrFormListViewTblFieldsValue[j].push(arrTblFormListFieldsValue);

                        //                            arrFormListViewTblFieldsValue[j] = arrTblFormListFieldsValue;


                        //                        }

                        //                    }

                        //                }
                        //                _obj1.arrFormListViewTblFields = arrFormListViewTblFields;
                        //                _obj1.arrFormListViewTblFieldsValue = arrFormListViewTblFieldsValue;

                        //        /*******************************/

                        //        TiAPIinfo('*******************************');
                        //        TiAPIinfo('');
                        //        TiAPIinfo('');
                        //        TiAPIinfo('');
                        //        TiAPIinfo('*******************************');
                        //        TiAPIinfo('CALL PARAMS OBJ1 -> ' + JSON.stringify(_obj1));
                        //        //alert('CALL PARAMS OBJ1 -> ' + JSON.stringify(_obj1));
                        //        //Ti.App.objParams = _obj1;
                        //        objParams = _obj1;
                        //    } catch (e) {
                        //        //alert(e);	
                        //    }
                        //    //var sDashScreenName = arrActionQuery[i].ActionValue;

                        //    if (sDashScreenName != null && sDashScreenName != '') {

                        //        Ti.App.dashBoardItemClicked = true;
                        //        var db = new dbConnection().createDataBaseConnection();

                        //        var sWFScreenName = sDashScreenName;
                        //        var _qry = "Select * from Functions WHERE lower(ScreenName) = lower(" + Ti.App.SQL.safeSQL(sDashScreenName) + ") limit 0,1";
                        //        var _dbDataRows = db.execute(_qry);
                        //        if (_dbDataRows.isValidRow()) {
                        //            sWFScreenName = _dbDataRows.fieldByName('Code');
                        //        }
                        //        _dbDataRows.close();

                        //        try {
                        //            var _dbDataRows1 = db.execute("select * From WorkFlowConfig WHERE lower(FunctionName) = lower(" + Ti.App.SQL.safeSQL(sWFScreenName) + ") and Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel) + " and CompletedON < Date('now')");
                        //            if (_dbDataRows1.isValidRow()) {
                        //                var _dt = new Date();
                        //                _dt = DATE.dbDateFormatSQLite(_dt);
                        //                db.execute("Update WorkFlowConfig SET Status = 0, CompletedOn = " + Ti.App.SQL.safeSQL(_dt) + " WHERE lower(FlowType) = 'main' and Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel));
                        //            }
                        //        } catch (e) { }

                        //        var qry = "Select * from WorkFlowConfig WHERE (status = 0  or status is null) and MustComplete = 1 and lower(NextFunctionName) = lower(" + Ti.App.SQL.safeSQL(sWFScreenName) + ") and  Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel) + " Order By OrderNo";
                        //        Ti.API.info('1.qry1 ---> ' + qry);
                        //        var dbDataRows = db.execute(qry);
                        //        if (dbDataRows.isValidRow()) {
                        //            var _qry = "Select * from WorkFlowConfig WHERE (status = 0  or status is null) and MustComplete = 0 and lower(FunctionName) = lower(" + Ti.App.SQL.safeSQL(sWFScreenName) + ") and  Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel) + " Order By OrderNo";
                        //            var _dbDataRows = db.execute(_qry);
                        //            if (!_dbDataRows.isValidRow()) {
                        //                COMMON.showAlert("You Must Complete " + dbDataRows.fieldByName('FunctionName') + ".", ["OK"], null);
                        //                _dbDataRows.close();
                        //                dbDataRows.close();
                        //                db.close();
                        //                Ti.App.dashBoardItemClicked = false;
                        //                return false;
                        //            }
                        //            _dbDataRows.close();
                        //        }
                        //        dbDataRows.close();

                        //        //STATUS = 1 COMPLETED
                        //        var qry = "Select * from WorkFlowConfig WHERE status = 1 and lower(FunctionName) = lower(" + Ti.App.SQL.safeSQL(sWFScreenName) + ") and  Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel) + " Order By OrderNo";
                        //        Ti.API.info('1.qry2 ---> ' + qry);
                        //        var dbDataRows = db.execute(qry);

                        //        if (dbDataRows.isValidRow()) {
                        //            var _dbDataRows = db.execute("Select * from WorkFlowConfig  WHERE lower(FlowId) = lower(" + Ti.App.SQL.safeSQL(sWFScreenName) + ") and Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel));
                        //            if (_dbDataRows.isValidRow()) {
                        //                var params = {};
                        //                params.FlowId = _dbDataRows.fieldByName('FlowId');//this.ScreenName;
                        //                params.sFunctionName = sDashScreenName;
                        //                params.dWorkFlowLevel = _dbDataRows.fieldByName('Level');
                        //                dbDataRows.close();
                        //                db.close();

                        //                object = require('/Screens/WorkFlow/Controller');
                        //                new object('WorkFlow', params);

                        //                //dash.clicked = false;
                        //                Ti.App.dashBoardItemClicked = false;
                        //                return false;
                        //            }
                        //            _dbDataRows.close();

                        //        }

                        //        //STATUS = 0
                        //        var qry = "Select * from WorkFlowConfig WHERE (status = 0  or status is null) and lower(FunctionName) = lower(" + Ti.App.SQL.safeSQL(sWFScreenName) + ") and  Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel) + " Order By OrderNo";
                        //        Ti.API.info('1.qry3 ---> ' + qry);
                        //        var dbDataRows = db.execute(qry);
                        //        var sDashScreenName = sDashScreenName;
                        //        if (dbDataRows.isValidRow()) {
                        //            var _dbDataRows = db.execute("Select * from WorkFlowConfig  WHERE lower(FlowId) = lower(" + Ti.App.SQL.safeSQL(sWFScreenName) + ") and  Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel));
                        //            if (_dbDataRows.isValidRow()) {
                        //                var params = {};
                        //                params.FlowId = _dbDataRows.fieldByName('FlowId');//this.ScreenName;
                        //                params.dWorkFlowLevel = _dbDataRows.fieldByName('Level');
                        //                params.sFunctionName = sDashScreenName;
                        //                _dbDataRows.close(); dbDataRows.close();
                        //                db.close();

                        //                object = require('/Screens/WorkFlow/Controller');
                        //                new object('WorkFlow', params);

                        //                //dash.clicked = false;
                        //                Ti.App.dashBoardItemClicked = false;
                        //                return false;
                        //            }
                        //            _dbDataRows.close();
                        //        }
                        //        dbDataRows.close();

                        //        var _qry = "Select * from Functions WHERE lower(Code) = lower(" + Ti.App.SQL.safeSQL(sDashScreenName) + ") limit 0,1";
                        //        Ti.API.info('1.qry4 ---> ' + qry);
                        //        var _dbDataRows = db.execute(_qry);
                        //        if (_dbDataRows.isValidRow()) {
                        //            sDashScreenName = _dbDataRows.fieldByName('ScreenName');
                        //        }
                        //        _dbDataRows.close();
                        //        db.close();

                        //        COMMON.showIndicator("Please Wait...");

                        //        try {
                        //            Ti.App.currentWin.currentRow = null;//Ti.App.currentRow;
                        //            Ti.App.currentWin.activatedWindow = true;
                        //            Ti.App.currentWin.lastSelectedRow = null;//lastSelectedRow;
                        //            Ti.App.currentRow = null;
                        //            Ti.App.currentScreenName = sDashScreenName;
                        //            var object = null;
                        //            if (!bIsAndroid) {
                        //                sDashScreenName = sDashScreenName.replace(/ /g, "%20");
                        //            }

                        //            if (sDashScreenName.indexOf('Form-') > -1) {
                        //                object = require('/Screens/Form-/Controller');
                        //            } else {
                        //                object = require('/Screens/' + sDashScreenName + '/Controller');
                        //            }
                        //            if (!bIsAndroid) {
                        //                sDashScreenName = sDashScreenName.replace(/%20/g, ' ');
                        //            }

                        //            var remarks = "Open " + sDashScreenName + " Screen";
                        //            var params = {};
                        //            params.sFunctionName = sDashScreenName;
                        //            setTimeout(function () {
                        //                new object(sDashScreenName, params);
                        //                Ti.App.bEnableAndroidBackButton = true;
                        //                Ti.App.isDashboardScreen = false;
                        //                COMMON.hideIndicator();
                        //            }, 100);

                        //        } catch (e) {

                        //            // COMMON.hideIndicator();

                        //        }
                        //        //dash.clicked = false;
                        //        return true;
                        //    }
                        //}
                    else if (arrActionQuery[i].ActionType.toUpperCase() == "CHANGELIST") {
                        //alert('CHANGELIST');
                        UI.setScrollViewPageByScreenName(arrActionQuery[i].ActionValue);//tableViewArr[dViewCount].tblScreenName
                    }
                    else if (arrActionQuery[i].ActionType.toUpperCase() == "CANCEL") {
                        bCancel = true;
                    }
                    else if (arrActionQuery[i].ActionType.toUpperCase() == "UPDATEDOCNO") {
                        sTransDocNo = Ti.App.ARRAYOPERATION.getSystemValue("PDAID") + "" + Ti.App.SQL.getTransDocNo();
                    }
                    else if (arrActionQuery[i].ActionType.toUpperCase() == "HOME") {
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
                    }
                    else if (arrActionQuery[i].ActionType.toUpperCase() == "REFRESHSYSTEM") {
                        // Ti.App.ARRAYOPERATION.setSystemTableConfig();
                        setSystemTableConfig();//ARRAYOPERATION
                        //alert('CHANGELIST');
                        //UI.setScrollViewPageByScreenName(arrActionQuery[i].ActionValue);//tableViewArr[dViewCount].tblScreenName
                    }
                    else if (arrActionQuery[i].ActionType.toUpperCase() == "CLEARSIGN") {
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
                    }
                    else if (arrActionQuery[i].ActionType.toUpperCase() == "READONLYENABLE" || arrActionQuery[i].ActionType.toUpperCase() == "READONLYDISABLE") {
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
                    }
                    else if (arrActionQuery[i].ActionType.toUpperCase() == "POST") {
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
                    }
                    else if (arrActionQuery[i].ActionType.toUpperCase() == "GET") {

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
                    }
                    else if (arrActionQuery[i].ActionType.toUpperCase() == "POPUPWINDOW") {

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
                    }
                    else if (arrActionQuery[i].ActionType.toUpperCase() == "HIDEPOPUPWINDOW") {

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

                    }
                    else if (arrActionQuery[i].ActionType.toUpperCase() == "ADDFORMLISTVIEWROW") {
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
        if (performActioninformation != "")
            PerformActioninfo('PerformAction completed');
        info_ALT(performActioninformation, "PerformActionInfo");
    } catch (e) {
        TiAPIinfo('PERFORM ACTION ---> ' + e);
        PerformActioninfo('PerformAction catch error : ' + e);
        info_ALT(performActioninformation, "PerformActionInfo");
        // alert('PERFORM ACTION ---> ' + e);
    }
    //    LoadingImagePopUpClose();
      

    //}, 500);

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

// handleFieldAction(CurrentScreen_TabScreen_Name, objData.fieldName, arrActionQuery[i].Action);
function handleFieldAction(sScreenName, sFieldName, sDataMember, temphFAi) {
    //debugger;
    tempsScreenName = sScreenName;
    tempsFieldName = sFieldName;
    tempsDataMember = sDataMember;
    try {
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
            }
            else if (arrDataMember[i] == sScreenName + "_FORM1") {

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

            }
            else if (arrDataMember[i].indexOf(sScreenName + "_FORM_LISTVIEW_") > -1) {
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
                    //else if (rwCount >= parseInt(executeQry[0].Response)) {
                    //    //rwCount=10;
                    //    //Response=5;
                    //    for (var n = rwCount; n > parseInt(executeQry[0].Response) ; n--) {
                    //        //  CreateList(ttbody, tfoot, scrName, 1, "", dynamicFieldName, "", 0);
                    //        //DynamicRowItemRemove(objthis, dataMember, rowIndex, value, fieldName, cnt, ttbody) {

                    //        //isDynamicRowItemDelete = true;
                    //        obj = {};
                    //        currentRowClickCount = n - 1
                    //        ///not need five lines
                    //        obj.objthis = "";
                    //        obj.dataMember = "Delete";
                    //        obj.rowIndex = n - 1;
                    //        obj.value = "Delete";
                    //        obj.fieldName = dynamicFieldName;//"Item"
                    //        obj.ttbody = ttbody;
                    //        // ConfirmMessage(obj);
                    //        DynamicRowItemRemoveConfirmNew(obj.objthis, obj.dataMember, obj.rowIndex, obj.value, obj.fieldName, obj.cnt, obj.ttbody, 0);

                    //    }
                    //}
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
            else if (arrDataMember[i].indexOf("_LISTVIEW_ROW_DELETE") > -1) {//ListView row delete //Are you sure want to delete
                //
                //ConfirmMessage(objDynamicRowItemRemove);
                DynamicRowItemRemoveConfirmNew(objDynamicRowItemRemove.objthis, objDynamicRowItemRemove.dataMember, objDynamicRowItemRemove.rowIndex, objDynamicRowItemRemove.value, objDynamicRowItemRemove.fieldName, objDynamicRowItemRemove.cnt, objDynamicRowItemRemove.ttbody, 0);
                objDynamicRowItemRemove = {};
            }
            else if (arrDataMember[i].indexOf("_LISTVIEW_PLEASEWAIT_CLOSE") > -1) {//ListView please wait loading image  
                LoadingImagePopUpClose();
            }
            else if (arrDataMember[i].indexOf("_LISTVIEW_PLEASEWAIT") > -1) {//ListView please wait loading image  
                LoadingImagePopUpOpen();
                isExecute = true;
                setTimeout(function () {
                    isExecute = false;
                    //LoadingImagePopUpOpen();
                    handleFieldAction(tempsScreenName, tempsFieldName, tempsDataMember, (temphFAi + 1));
                    PerformAction(tempsActionEvent, tempobjData, (tempPAi + 1));
                }, 1000);
            }
            else if (arrDataMember[i].indexOf("_EXECUTE_TEXTCOLORCHANGE") > -1) {
                var mScreenName = arrDataMember[i];//formdata.screenName + '_FORM_COMBOBOX_' + formdata.fieldName;
                var qry = getString['QueryConfig_' + mScreenName];
                qry += ' ' + getString['QueryConfig_' + mScreenName + '_GroupText'];
                qry += ' ' + getString['QueryConfig_' + mScreenName + '_OrderText'];
                qry = formatQueryString(qry, mScreenName);
                execute(qry);
                for (var g = 0; g < executeQry.length; g++) {
                    for (var key in executeQry[g]) {
                        if (key.indexOf("FormView.") > -1) {
                            var txtFieldId = key.split('.')[1];
                            if (executeQry[g][txtFieldId] != "0")
                                $('#' + txtFieldId).css({ 'color': executeQry[g][key] })
                        }
                    }
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
            else if (arrDataMember[i].indexOf("_EXECUTE_WITH_SEARCH") > -1) {//Execute OSG Internael _ newly added by.M 17.02.2023
                setListValue("", _fieldName, parseInt(currentRowClickCount), _ttbody);//listconfig.js
                var mScreenName = arrDataMember[i];//formdata.screenName + '_FORM_COMBOBOX_' + formdata.fieldName;
                var queryText = getString['QueryConfig_' + mScreenName];
                var groupby = getString['QueryConfig_' + mScreenName + '_GroupText'];
                var orderby = getString['QueryConfig_' + mScreenName + '_OrderText'];

                var searchOption = "";
                for (var i = 0; i < searchOptionArray.length; i++) {
                    searchOption = searchOption + searchOptionArray[i].SearchQuery + " ";
                }

                //if (qry.indexOf("exec ") >= 0)
                //    qry = qry + ", '" + searchOption.replace("'%", "''%").replace("%'", "%''") + " " + groupby + " " + orderby + "'";
                //else
                //    qry = qry + " " + searchOption + " " + groupby + " " + orderby;



                sortOption = " ";
                for (var i = 0; i < sortOptionArray.length; i++) {
                    if (sortOption != " ")
                        sortOption = sortOption + " , ";
                    sortOption = sortOption + sortOptionArray[i].OrderByQuery
                }
                if (sortOptionArray.length == 0)
                    sortOption = "";

                if (sortOption == "") {
                    if (queryText.indexOf("exec ") >= 0)
                        query = queryText + ', "' + searchOption + ' ' + groupby + ' ' + orderby + '"';
                        //query = queryText + ", '" + searchOption.replace("'%", "''%").replace("%'", "%''") + " " + groupby + " " + orderby + "',''";
                    else
                        query = queryText + " " + searchOption + " " + groupby + " " + orderby;
                }
                else {
                    if (queryText.indexOf("exec ") >= 0)
                        query = queryText + ", '" + searchOption.replace("'%", "''%").Replace("%'", "%''") + " " + groupby + " order by" + sortOption + "'";
                    else
                        query = queryText + " " + searchOption + " " + groupby + " order by" + sortOption;
                }
                var qry = formatQueryString(query, mScreenName);


                execute(qry);
            }
            else if (arrDataMember[i].indexOf("_EXECUTE_LISTVIEW_SEARCH") > -1) {//Execute OSG Internael _ newly added by.M 17.02.2023
                setListValue("", _fieldName, parseInt(currentRowClickCount), _ttbody);//listconfig.js
                var mScreenName = arrDataMember[i];//formdata.screenName + '_FORM_COMBOBOX_' + formdata.fieldName;
                var queryText = getString['QueryConfig_' + mScreenName];
                var groupby = getString['QueryConfig_' + mScreenName + '_GroupText'];
                var orderby = getString['QueryConfig_' + mScreenName + '_OrderText'];

                var searchOption = "";
                for (var i = 0; i < searchOptionArray.length; i++) {
                    searchOption = searchOption + searchOptionArray[i].SearchQuery
                }

                //if (qry.indexOf("exec ") >= 0)
                //    qry = qry + ", '" + searchOption.replace("'%", "''%").replace("%'", "%''") + " " + groupby + " " + orderby + "'";
                //else
                //    qry = qry + " " + searchOption + " " + groupby + " " + orderby;



                sortOption = " ";
                for (var i = 0; i < sortOptionArray.length; i++) {
                    if (sortOption != " ")
                        sortOption = sortOption + " , ";
                    sortOption = sortOption + sortOptionArray[i].OrderByQuery
                }
                if (sortOptionArray.length == 0)
                    sortOption = "";

                if (sortOption == "") {
                    if (queryText.indexOf("exec ") >= 0)
                        query = queryText + ", '" + searchOption.replace("'%", "''%").replace("%'", "%''") + " " + groupby + " " + orderby + "'";
                    else
                        query = queryText + " " + searchOption + " " + groupby + " " + orderby;
                }
                else {
                    if (queryText.indexOf("exec ") >= 0)
                        query = queryText + ", '" + searchOption.replace("'%", "''%").Replace("%'", "%''") + " " + groupby + " order by" + sortOption + "'";
                    else
                        query = queryText + " " + searchOption + " " + groupby + " order by" + sortOption;
                }
                var qry = formatQueryString(query, mScreenName);


                execute(qry);
            }

                // else if (arrDataMember[i].indexOf(sScreenName + "_LISTVIEW_") > -1 || arrDataMember[i].indexOf(sScreenName + "_ListView_") > -1) {
            // IMPORTANT - TO FILL THE LISTVIEW
            else if (arrDataMember[i].indexOf(sScreenName + "_LISTVIEW_") > -1 || (arrDataMember[i].indexOf(currentScreenName) > -1 && arrDataMember[i].indexOf("_LISTVIEW_") > -1 && arrDataMember[i].indexOf("_EXECUTE_") <= 0)
                || arrDataMember[i].indexOf(currentScreenName + "_LISTVIEW_") > -1) {

                setColorConfig("English");
              //  Ti.App.ARRAYOPERATION
                //setFormConfigFieldNames(sScreenName);

                var arrKey = arrDataMember[i].split("_LISTVIEW_");
                var tblId = arrKey[1].split('_')[0];

                

                var listParameter = objListParameter['ListParameter_ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + tblId];

                if (arrKey[0].indexOf('_') > -1)
                    listParameter = objListParameter['ListParameter_ListBodyDivId_' + arrKey[0] + '_' + tblId];

                if (arrDataMember[i].indexOf(currentScreenName + "_LISTVIEW_") > -1 == true && listParameter == undefined)
                    listParameter = objListParameter['ListParameter_ListBodyDivId_' + currentScreenName + '_' + tblId];

                if (listParameter != undefined) {
                    //Newly added by.M 03.02.2022 - CheckAll - sandltest SNAPSHOT new screen
                    if (sFieldName != "CheckAll") {
                        searchOptionArray = [];
                        sortOptionArray = [];
                        ListSelectedId = [];
                        //Newly added by.M 01.09.2022
                        LookUpMultiSelected = [];
                        //searchDivData[0].id
                        //Newly added by.M 03.11.2021
                        //comment   by.M 08.11.2021
                        var searchDiv = listParameter.ttbody.replace("ListBodyDivId_", "SearchMultiListAdd_");
                        var searchDivData = $('#' + searchDiv);
                        var searchDivId = "";
                        if (searchDivData[0] != undefined)
                            for (var r = searchDivData[0].childNodes.length - 1; r >= 0; r--) {
                                searchDivId = searchDivData[0].childNodes[r].id == "" ? searchDivData[0].childNodes[r].firstChild.id == undefined ? "" : searchDivData[0].childNodes[r].firstChild.id : searchDivData[0].childNodes[r].id;
                                $("#Search_" + listParameter.scrName + "_" + searchDivId.split("_")[searchDivId.split("_").length - 1]).val('');
                                $('#' + searchDivId).remove();
                            }
                        //
                    }
                    //$('#SearchMultiListAdd_POList_LstPO').remove();
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
            else if (arrDataMember[i].indexOf("_EXECUTE_LISTVIEW_CHECK_ACTIVE_") > -1) {//Newly added By.M 07.09.2021 sandlTest
                var tmpScreenName = arrDataMember[i];
                var listId = tmpScreenName.split('_')[tmpScreenName.split('_').length - 1];
                ListActiveIDs = new Array();
                ListActiveIDs.push(listId);
            }
            else if (arrDataMember[i].indexOf("_EXECUTE_LISTVIEW_") > -1 || arrDataMember[i].indexOf("_EXECUTE_FORM_LISTVIEW_") > -1) {//Execute Query FORMCONFIG LISTVIEW
                if (ProjectName == "PVMB" && currentScreenName == "POReceivingViewForm")
                POReceivingViewFormLogString("Entered into condition.....");

                try {
                    dListRowIndex = -1;
                    dFormListRowIndex = -1; dFormListRow = null;
                    var tmpScreenName = arrDataMember[i];
                    loadListConfigArr(tmpScreenName);
                    setTableHeaderFieldNames(tmpScreenName);
                    //Fomr-ads_EXECUTE_LISTVIEW_ _FIELD
                    var arrTblFieldName = tmpScreenName.split("_EXECUTE_LISTVIEW_");
                    var scrName = arrTblFieldName[0];

                    dynamicFieldName = arrTblFieldName[1].split('_').length == 2 ? arrTblFieldName[1].split('_')[0] : tmpScreenName.split('_')[tmpScreenName.split('_').length - 1];
                    var tblbody = document.getElementById("ListBodyDivId_" + scrName + "_" + dynamicFieldName);
                    PerformActioninfo("Table Id : " + "ListBodyDivId_" + scrName + "_" + dynamicFieldName + " & UserID : " + _UserID);

                    if (ProjectName == "PVMB" && currentScreenName == "POReceivingViewForm")
                        POReceivingViewFormLogString("Table Id : " + "ListBodyDivId_" + scrName + "_" + dynamicFieldName + " & UserID : " + _UserID);


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
                        var _dataLen = _data.length;
                        if (_isdynamic == true) {
                            _dataLen = _data.length - 1;
                        }

                        PerformActioninfo("_dataLen : " + _dataLen);
                        if (ProjectName == "PVMB" && currentScreenName == "POReceivingViewForm")
                            POReceivingViewFormLogString("_dataLen : " + _dataLen);


                        var ListActiveIdInc = 1;
                        var isListActiveId = true;
                        var tblRowColIdandVal = "";
                        var alternetQry = "";
                        for (var ctr = 0; ctr < _dataLen; ctr++) {
                            if (tblbody.rows[ctr].cells.length == 0);
                            else {
                                lineNo++;
                                obj = {};
                                isListActiveId = true;
                                for (var r = 0; r < listConfig.length; r++) {
                                    id = listConfig[r].FieldName;

                                    if (id.toString().toLowerCase() == "isupdown") {
                                        // COLUMN FOR INDICATING UP AND DOWN FUNCTIONALITY 
                                        continue;
                                    }
                                    try {
                                        //Newly added By.M 07.09.2021 sandlTest
                                        if (ListActiveIDs.length > 0) {
                                            if (ListActiveIDs[0] == id && tblbody.rows[ctr].cells.namedItem(id).childNodes['0'].checked == false) {
                                                isListActiveId = false;
                                            }
                                            else
                                                isListActiveId = true;
                                        }
                                    } catch (e) {

                                    }

                                    if (tblbody.rows[ctr].cells.namedItem(id) != null && isListActiveId == true) {
                                        try {

                                            isRowNull = false;
                                            tdType = tblbody.rows[ctr] == undefined ? "" : getTableRowTDType(tblbody.rows[ctr].cells.namedItem(id).innerHTML);
                                            if (tdType == "text" || tdType == "select") {
                                                value = tblbody.rows[ctr].cells.namedItem(id).childNodes['0'].value;
                                            }
                                            else if (tdType == "datepicker") {
                                                value = tblbody.rows[ctr].cells.namedItem(id).childNodes['0'].getAttribute("data-act");
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
                                                ///Frostfood - storeaudit
                                                if (value.indexOf("&amp;") > -1)
                                                    value = value.replace("&amp;", "&");
                                            }
                                            obj[id] = value;
                                            //tblRowColIdandVal = tblRowColIdandVal + "" + id + " - " + value + " || ";
                                        } catch (e) {
                                            obj[id] = "";
                                            //tblRowColIdandVal = tblRowColIdandVal + "" + id + " - " + value + " || ";
                                            PerformActioninfo("EXECUTE_LISTVIEW catch error &  ctr & tdType & id : " + e + " & " + ctr + " & " + tdType + " & " + id);
                                            if (ProjectName == "PVMB" && currentScreenName == "POReceivingViewForm")
                                                POReceivingViewFormLogString("EXECUTE_LISTVIEW catch error &  ctr & tdType & id : " + e + " & " + ctr + " & " + tdType + " & " + id);
                                        }
                                    }
                                    else {
                                        isRowNull = true;
                                        r = listConfig.length + 1;
                                    }
                                }

                                //PerformActioninfo("tblRowColIdandVal : " + tblRowColIdandVal);
                                //tblRowColIdandVal = ""

                                if (isRowNull == false) {
                                    if (FieldName != dynamicFieldName)
                                        FieldName = dynamicFieldName;
                                    obj['LineNo'] = lineNo;
                                    FormView.FieldName = FieldName;
                                    FormView[FieldName] = obj;

                                    dFormListRowIndex = ctr;


                                    //
                                    //Newly added by.M 30.06.2022
                                    var qry = getString['QueryConfig_' + tmpScreenName];
                                    qry += ' ' + getString['QueryConfig_' + tmpScreenName + '_GroupText'];
                                    qry += ' ' + getString['QueryConfig_' + tmpScreenName + '_OrderText'];

                                    if (qry == "undefined undefined undefined" && alternetQry != "")
                                        qry = alternetQry;

                                    if (qry != "undefined undefined undefined") {
                                        qry = formatQueryString(qry, tmpScreenName);
                                        arrayQuery.push(qry);

                                        PerformActioninfo("EXECUTE_LISTVIEW Query : " + qry);

                                        if (ProjectName == "PVMB" && currentScreenName == "POReceivingViewForm")
                                            POReceivingViewFormLogString("EXECUTE_LISTVIEW Query : " + qry);
                                    }
                                    }
                                    //
                                    if (qry == "undefined undefined undefined") {
                                        PerformActioninfo("EXECUTE_LISTVIEW Query &  ScreenName : " + qry + " & " + tmpScreenName);

                                        if (ProjectName == "PVMB" && currentScreenName == "POReceivingViewForm")
                                            POReceivingViewFormLogString("EXECUTE_LISTVIEW Query &  ScreenName : " + qry + " & " + tmpScreenName);

                                        //commant by.M 30.06.2022
                                        alternetQry = "Select * From QueryConfig WHERE  solutionName='" + SolutionName + "'  and ScreenName = " + safeSQL(tmpScreenName);

                                        PerformActioninfo("QueryConfig Query - ctr :" + alternetQry + " - " + ctr);
                                        if (ProjectName == "PVMB" && currentScreenName == "POReceivingViewForm")
                                            POReceivingViewFormLogString("QueryConfig Query - ctr :" + alternetQry + " - " + ctr);

                                        execute(alternetQry);
                                        var dbDataRows = executeQry;
                                        for (var t = 0; t < dbDataRows.length; t++) {
                                            alternetQry = dbDataRows[t]['QueryText'];
                                            alternetQry += ' ' + dbDataRows[t]['GroupText'];
                                            alternetQry += ' ' + dbDataRows[t]['OrderText'];

                                            try {
                                                qry = formatQueryString(alternetQry, tmpScreenName);
                                                arrayQuery.push(qry.toString().trim());

                                                PerformActioninfo("EXECUTE_LISTVIEW Query : " + qry);
                                                if (ProjectName == "PVMB" && currentScreenName == "POReceivingViewForm")
                                                    POReceivingViewFormLogString("EXECUTE_LISTVIEW Query : " + qry);

                                            } catch (e) {
                                                PerformActioninfo("EXECUTE_LISTVIEW FormatQueryString  catch error -&- qry :" + e + " -&- " + qry);
                                                if (ProjectName == "PVMB" && currentScreenName == "POReceivingViewForm")
                                                    POReceivingViewFormLogString("EXECUTE_LISTVIEW FormatQueryString  catch error -&- qry :" + e + " -&- " + qry);
                                            }
                                        }
                                    }
                                }
                            }

                        } // end of DATA ROWS - for (var ctr = 0 ; ctr < _dataLen ; ctr++) {
                        LoadingImageClose();

                        dFormListRow = null;
                        dFormListRowIndex = -1;
                    }
                
                catch (errr) {
                    if (ProjectName == "PVMB" && currentScreenName == "POReceivingViewForm")
                        POReceivingViewFormLogString("Error: " + errr + ", Query: " + qry);
                }
            }

            else if (arrDataMember[i].indexOf("_EXECUTE_VALIDATE_LISTVIEW_") > -1) {//Execute Query FORMCONFIG LISTVIEW
                dListRowIndex = -1;
                dFormListRowIndex = -1; dFormListRow = null;
                var tmpScreenName = arrDataMember[i];
                loadListConfigArr(tmpScreenName);
                setTableHeaderFieldNames(tmpScreenName);
                var arrTblFieldName = tmpScreenName.split("_EXECUTE_VALIDATE_LISTVIEW_");
                var scrName = arrTblFieldName[0];
                dynamicFieldName = arrTblFieldName[1].split('_').length == 2 ? arrTblFieldName[1].split('_')[0] : tmpScreenName.split('_')[tmpScreenName.split('_').length - 1];
                var tblbody = document.getElementById("ListBodyDivId_" + scrName + "_" + dynamicFieldName);
                PerformActioninfo("Table Id : " + "ListBodyDivId_" + scrName + "_" + dynamicFieldName);

                var _data = tblbody.rows;
                var tdType = '';
                var id = '';
                var obj = {};

                var isRowNull = false;
                var listConfig = ListHeaderList['ListConfig_ListBodyDivId_' + scrName + '_' + dynamicFieldName];
                if (_data.length > 0) {
                    dFormListRow = _data;
                    var lineNo = 0;
                    var _dataLen = _data.length;
                    if (_isdynamic == true) {
                        _dataLen = _data.length - 1;
                    }
                    var ListActiveIdInc = 1;
                    var isListActiveId = true;
                    for (var ctr = 0 ; ctr < _dataLen ; ctr++) {

                        if (tblbody.rows[ctr].cells.length == 0);
                        else {
                            lineNo++;
                            obj = {};
                            isListActiveId = true;
                            for (var r = 0; r < listConfig.length; r++) {
                                id = listConfig[r].FieldName;

                                if (id.toString().toLowerCase() == "isupdown") {
                                    continue;
                                }
                                //Newly added By.M 07.09.2021 sandlTest
                                if (ListActiveIDs.length > 0) {
                                    if (ListActiveIDs[0] == id && tblbody.rows[ctr].cells.namedItem(id).childNodes['0'].checked == false) {
                                        isListActiveId = false;
                                    }
                                    else
                                        isListActiveId = true;
                                }

                                if (tblbody.rows[ctr].cells.namedItem(id) != null && isListActiveId == true) {
                                    isRowNull = false;
                                    tdType = tblbody.rows[ctr] == undefined ? "" : getTableRowTDType(tblbody.rows[ctr].cells.namedItem(id).innerHTML);
                                    if (tdType == "text" || tdType == "select") {
                                        value = tblbody.rows[ctr].cells.namedItem(id).childNodes['0'].value;
                                    }
                                    else if (tdType == "datepicker") {
                                        value = tblbody.rows[ctr].cells.namedItem(id).childNodes['0'].getAttribute("data-act");
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
                                if (ctr == 0)
                                    PerformActioninfo("QueryConfig Query : " + qry);
                                //var dbDataRows = db.execute(qry);
                                execute(qry);
                                var dbDataRows = executeQry;
                                for (var t = 0; t < dbDataRows.length; t++) {
                                    var qry = dbDataRows[t]['QueryText'];
                                    qry += ' ' + dbDataRows[t]['GroupText'];
                                    qry += ' ' + dbDataRows[t]['OrderText'];
                                    qry = formatQueryString(qry, tmpScreenName);

                                    arrayQuery.push(qry.toString().trim());
                                    PerformActioninfo("EXECUTE_LISTVIEW Query : " + qry);
                                }
                            }
                        }
                    } // end of DATA ROWS - for (var ctr = 0 ; ctr < _dataLen ; ctr++) {
                    LoadingImageClose();

                    dFormListRow = null;
                    dFormListRowIndex = -1;
                }
            }
            else if (arrDataMember[i].indexOf("_LIST_SUM_ROWCOUNT_EXECUTE_") > -1) {//Execute Query FORMCONFIG _LIST_SUM_EXECUTE_
                sumofRowCount = 0;
                var tmpScreenName = arrDataMember[i];
                var arrTblFieldName = tmpScreenName.split("_LIST_SUM_ROWCOUNT_EXECUTE_");
                var scrName = arrTblFieldName[0];
                dynamicFieldName = dynamicFieldName == "" ? tmpScreenName.split('_')[tmpScreenName.split('_').length - 2] : dynamicFieldName;
                var tblbody = document.getElementById("ListBodyDivId_" + scrName + "_" + dynamicFieldName);
                var sumrowcnt = 0
                if (tblbody != null) {
                    for (var i = 0; i < (tblbody.rows.length - 1) ; i++) {
                        if (tblbody.children[i].innerHTML != "") {
                            sumrowcnt++;
                        }
                    }
                }
                // sumofRowCount = tblbody == null ? 0 : parseInt(tblbody.rows.length - 1);
                sumofRowCount = parseInt(sumrowcnt);
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
                    if (_isdynamic == true) {
                        //_dataLen =  _data.length - 1;
                        //newly added by.M 15.12.2021   
                        _dataLen = _data.length == 1 ? _data.length : _data.length - 1;
                    }
                    var lineNo = 0;
                    //for (var ctr = 0 ; ctr < _data.length - 1; ctr++) {
                    for (var ctr = 0 ; ctr < _dataLen; ctr++) {
                        if (tblbody.rows[ctr].cells.length == 0);
                        else {
                            tdType = tblbody.rows[ctr] == undefined ? "" : tblbody.rows[ctr].cells.length == 0 ? "" : getTableRowTDType(tblbody.rows[ctr].cells[listId].innerHTML);
                            if (tdType == "text") {
                                var txtVal = tblbody.rows[ctr].cells[listId].children[listId].value.replace(/,/g, '') == "" ? 0 : parseFloat(tblbody.rows[ctr].cells[listId].children[listId].value.replace(/,/g, ''));
                                sumTotal = sumTotal + txtVal;
                            }
                            else {

                                // =============================================================
                                // COMMENTED 17.03.2021
                                if (tblbody.rows[ctr].cells[listId].innerText == "" || typeof tblbody.rows[ctr].cells[listId].innerText === "undefined" ||
                                    tblbody.rows[ctr].cells[listId].innerText == null) {
                                    //changes done by vignesh on 24/10/2024
                                   // sumTotal = sumTotal + 1;
                                    sumTotal = sumTotal + 0;
                                    //alert(0)
                                }
                                else {
                                    if (isNaN(parseFloat(tblbody.rows[ctr].cells[listId].innerText.replace(/,/g, '')))) {
                                        //changes done by vignesh on 24/10/2024
                                        //sumTotal = sumTotal + 1;
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
                PerformActioninfo("EXECUTE LIST_SUM  sumofColumn: " + sumofColumn);
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
            else if (arrDataMember[i].indexOf(sScreenName + "_FORM_COMBOBOX_") > -1 || arrDataMember[i].indexOf("_FORM_COMBOBOX_") > -1) {
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
            else if (arrDataMember[i].indexOf(sScreenName + "_LIST_COMBOBOXES_") > -1
                || arrDataMember[i].indexOf("_LIST_COMBOBOXES_") > -1) {

                // SalesOrderForm_LIST_COMBOBOX_Warehouse
                //OrderUOMEditNewForm_LIST_COMBOBOX_UOM
                // "MaintainLeadSKUList", "LstMLSKU", "ListBodyDivId_MaintainLeadSKUList_LstMLSKU", 0
                ///
                //newly added 04.02.2020 //jsu
                var tmpScreenName = arrDataMember[i];
                sScreenName = tmpScreenName.split("_LIST_COMBOBOXES_")[0];
                ///
                DropDownIdList = [];
                comboboxdata = {};

                var lstNam = tmpScreenName.split("_LIST_COMBOBOXES_")[1];//FormView[dataMember] == undefined ? "" : FormView[dataMember].FieldName.split('_')[0];



                var cnt = 0;

                var dataMember = lstNam.split("_")[1];
                lstNam = lstNam.split("_")[0];

                comboboxdata.DataMember = dataMember;
                comboboxdata.ScreenName = sScreenName;
                comboboxdata.FormListType = "List";
                if (ProjectName == "FGV") {
                    comboboxdata.AutoSearch = "Yes";
                    comboboxdata.RowIndex = cnt;
                }
                DropDownIdList.push(comboboxdata);

                var ttbody = _listLookUpttbody == "" ? "ListBodyDivId_" + sScreenName + "_" + lstNam : _listLookUpttbody;

                var tblbody = document.getElementById(ttbody);

                for (var z = 0; z < tblbody.rows.length; z++) {
                    GetListDropDownListValue1(sScreenName, dataMember, ttbody, z);
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
                var lstNam = FormView[dataMember] == undefined ? "" : FormView[dataMember].FieldName.split('_')[0];
                var cnt = _listLookUpIndex == "" ? 0 : _listLookUpIndex == -1 ? 0 : _listLookUpIndex;

                var dataMember = arrDataMember[i].split('_')[arrDataMember[i].split('_').length - 1];
                comboboxdata.DataMember = arrDataMember[i].split('_')[arrDataMember[i].split('_').length - 1];
                comboboxdata.ScreenName = sScreenName;
                comboboxdata.FormListType = "List";
                if (ProjectName == "FGV") {
                    comboboxdata.AutoSearch = "Yes";
                    comboboxdata.RowIndex = cnt;
                }
                DropDownIdList.push(comboboxdata);

                
                //   var ttbody = _listLookUpttbody == "" ? "ListBodyDivId_" + sScreenName.split('_')[0] + "_" + dataMember : _listLookUpttbody;
                if (FieldName == lstNam || lstNam == "" || lstNam == undefined) {
                   // var ttbody = _listLookUpttbody == "" ? "ListBodyDivId_" + sScreenName.split('_')[0] + "_" + FieldName : _listLookUpttbody;
                    var ttbody = _listLookUpttbody == "" ? "ListBodyDivId_" + sScreenName + "_" + FieldName : _listLookUpttbody;
                    GetListDropDownListValue(sScreenName, FieldName, ttbody, cnt);
                }
                else {
                    //var ttbody = _listLookUpttbody == "" ? "ListBodyDivId_" + sScreenName.split('_')[0] + "_" + lstNam : _listLookUpttbody;
                    var ttbody = _listLookUpttbody == "" ? "ListBodyDivId_" + sScreenName + "_" + lstNam : _listLookUpttbody;
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
                    qry2 = formatQueryString(qry1.toString().trim(), mScreenName);
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
                        arrayQuery.push(qry.toString().trim());
                    }
                }

                str = null; arr = null;
                mScreenName = null; sMultiplePhotoView = null;

            }
            else if (arrDataMember[i].indexOf(sScreenName + "_EXECUTE_FORM") > -1) {//Execute Query LISTCONFIG LISTVIEW
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
                        arrayQuery.push(qry.toString().trim());
                        //   dbDataRows.next();
                    }
                }
                //dbDataRows.close();
                //db.close();
            }
            else if (arrDataMember[i].indexOf("_EXECUTE_LIST") > -1) {//Execute Query LISTCONFIG LISTVIEW
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
            }
            else if (arrDataMember[i].indexOf("_EXECUTE") > -1) {//Execute Query LISTCONFIG LISTVIEW
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
            }
            else {
                //Newly created By M.01.06.2021
                if (arrDataMember[i].indexOf("_LIST_Contains_") > -1 || arrDataMember[i].indexOf("_LIST_Contains_") > -1) {//Execute Query FORMCONFIG _LIST_Check_
                    var tmpScreenName = arrDataMember[i];
                    dynamicFieldName = dynamicFieldName == "" ? tmpScreenName.split('_LIST_Contains_')[1].split('_')[0] : dynamicFieldName;
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
                        if (_dataLen >= 1)
                            allOfList = "";
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
                }

                var fLock = null;

                if (arrDataMember[i] == "UserSettingsForm_SaveBtn")
                {
                    try {
                        var _qry = "SELECT * FROM salesagent WHERE CODE like '" + document.getElementById("Code").value + "'";
                        execute(_qry);
                        dbDataRows = executeQry;

                        var obj = dbDataRows[0];
                        fLock = obj["Locked"];
                    } catch (err2) {

                    }
                }
               

                var sScreenName = arrDataMember[i];
                qry = getString['QueryConfig_' + sScreenName];
                PerformActioninfo("query text : " + sScreenName + " > " + qry);

                qry += ' ' + getString['QueryConfig_' + sScreenName + '_GroupText'];
                PerformActioninfo("query group text : " + sScreenName + " > " + qry);

                qry += ' ' + getString['QueryConfig_' + sScreenName + '_OrderText'];
                PerformActioninfo("query order text : " + sScreenName + " > " + qry);

                if (sScreenName.indexOf("_MapRoute") > -1) {
                    routemap_query = qry;
                    initialize();
                    return;
                }

                qry = formatQueryString(qry, sScreenName);
                PerformActioninfo("query format text : " + sScreenName + " > " + qry);

                if (arrDataMember[i] == "UserSettingsForm_SaveBtn") {
                    try {
                        if (fLock !== null && fLock !== 0) {
                            if (qry.indexOf("Locked='false'") > -1) {
                                qry = qry + ";update salesagent set loginattempts=0 where code like '" + document.getElementById("Code").value + "';"
                            }
                        }
                    } catch (err2) {

                    }
                }

                //if (qry == "undefined undefined undefined") 
                //   PerformActioninfo("undefined screenname : " + sScreenName);

                //if (tempsScreenName == "POReceivingNewForm")
                //qry = "undefined undefined undefined";

                if (qry == "undefined undefined undefined") {
                    PerformActioninfo("undefined screenname : " + sScreenName);
                
                    var qry = "select ScreenName, QueryText, ISNULL(GroupText,'') as GroupText, ISNULL(OrderText, '' ) as OrderText from QueryConfig where solutionName='" + SolutionName + "' and screenname like '" + sScreenName + "'";
                    //if (type == 1)
                    //    executeQueryConfig(qry);
                    //else
                        execute(qry);

                    var dbDataRows1 = executeQry;
                    var getString1 = {};
                    //var scrName = "";
                    if (dbDataRows1 != null && dbDataRows1.length > 0) {
                        for (var i = 0; i < dbDataRows1.length; i++) {
                            //setgetString
                            if (dbDataRows1[i].QueryText != null && dbDataRows1[i].QueryText != "") {
                                getString1["QueryConfig_" + dbDataRows1[i].ScreenName + ""] = dbDataRows1[i].QueryText.toString().trim(); //.toString().trim() newly addedby.M 10.01.2023
                                getString1["QueryConfig_" + dbDataRows1[i].ScreenName + "_GroupText"] = dbDataRows1[i].GroupText.toString().trim();
                                getString1["QueryConfig_" + dbDataRows1[i].ScreenName + "_OrderText"] = dbDataRows1[i].OrderText.toString().trim();
                            }
                        }
                    }
                    qry = getString1['QueryConfig_' + sScreenName];
                    PerformActioninfo("query text attempt2 : " + sScreenName + " > " + qry);

                    qry += ' ' + getString1['QueryConfig_' + sScreenName + '_GroupText'];
                    PerformActioninfo("query group text attempt2 : " + sScreenName + " > " + qry);

                    qry += ' ' + getString1['QueryConfig_' + sScreenName + '_OrderText'];
                    PerformActioninfo("query order text attempt2 : " + sScreenName + " > " + qry);

                    qry = formatQueryString(qry, sScreenName);
                    PerformActioninfo("query format text attempt2 : " + sScreenName + " > " + qry);

                    if (qry == "undefined undefined undefined") 
                        PerformActioninfo("undefined screenname attempt2 : " + sScreenName);
                }

                    

                PerformActioninfo("EXECUTE Query : " + qry);
                var sActionfieldName = '', sActionfieldValue = '';

                var isasync = (qry.toLowerCase().indexOf("exec ") > -1) ? true : false;
                isasync = false;//pvmb purchase order new click - please wait loading image show - not need
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
                        //PerformActioninfo("EXECUTE Query results : " + results);
                        logstr = "1";
                        if (isasync == true)
                            LoadingImageClose();
                        executeStringQry = results;
                        executeQry = $.parseJSON(results);
                        logstr = "2 : " + results;

                        //------

                        var dbDataRows = executeQry;
                        var fieldCount = getFieldCount(dbDataRows);//sql
                        logstr = logstr + " 3 : " + fieldCount;

                        // return resultSet.length; [OR] return 0;
                        fieldCount = (fieldCount == null || fieldCount == undefined || fieldCount == '') ? 0 : fieldCount;
                        logstr = logstr + " : 4 : " + fieldCount;


                        if ((fieldCount > 1 || isListLookUpClicked == false) && _listLookUpIndex == -1) {//text  and button onchange event
                            _listLookUpIndex++;
                            var ttbody = "ListBodyDivId_" + sScreenName.split('_')[0] + "_" + sScreenName.split('_')[2];
                            var tfoot = "ListfootDivId_" + sScreenName.split('_')[0] + "_" + sScreenName.split('_')[2];
                            $("#" + ttbody).empty();
                            $('#' + tfoot).empty();
                            objAddDynamicListCount['ListConfig_' + ttbody] = -1;
                            CreateList(ttbody, tfoot, currentScreenName, 1, "", FieldName, '', '', 1);
                        }
                        logstr = logstr + " : 5 : ";

                        var isLstView = false;

                        if (isMultiselectRowClear == true) {
                            // COMMENTED
                            $("#" + _listLookUpttbody).empty();
                            _listLookUpIndex = 0;
                            objAddDynamicListCount['ListConfig_' + _listLookUpttbody] = -1;
                            CreateList(_listLookUpttbody, _listLookUpttbody.replace('ListBodyDivId_', 'ListfootDivId_'), currentScreenName, 1, "", FieldName.split('_')[0], '', '', 1);
                            isMultiselectRowClear = false;
                        }

                        for (var fieldCnt = 0; fieldCnt < fieldCount; fieldCnt++) {

                            if (sScreenName.indexOf("_FORM_LOOKUP_") > -1) {
                                try {
                                    var tmpScreen = sScreenName.split('_')[0] + "_" + sScreenName.split('_')[1];
                                    isColorLegend = false;

                                    var obj = dbDataRows[fieldCnt];

                                    var itmchk = obj["FormView." + FieldName + ".Itemcheck"];

                                    var tmpcolorLegend = colorLegend.filter(x => x.ScreenName == tmpScreen && x.ConditionValue == itmchk);

                                    var tmpForeColor = argbToRGB(tmpcolorLegend[0].CForeColor);
                                    var tmpBackColor = argbToRGB(tmpcolorLegend[0].CBackColor);

                                    if (sScreenName.split('_')[2] == undefined)
                                        _listLookUpttbody = _listLookUpttbody == "" ? "ListBodyDivId_" + sScreenName.split('_')[0] + "_" + FieldName : _listLookUpttbody;
                                    else
                                        _listLookUpttbody = _listLookUpttbody == "" ? "ListBodyDivId_" + sScreenName.split('_')[0] + "_" + sScreenName.split('_')[2] : _listLookUpttbody;

                                    try {
                                        if (ProjectName == "FGV" && sScreenName == "SalesOrderNewForm_Sales_Item_Reason2")
                                            _listLookUpttbody = "ListBodyDivId_SalesOrderNewForm_Sales_Item";
                                        else if (ProjectName == "FGV" && sScreenName == "SalesOrderForm_Sales_Item_Reason2")
                                            _listLookUpttbody = "ListBodyDivId_SalesOrderForm_Sales_Item";
                                    } catch (e) {

                                    }

                                    var tblbody = document.getElementById(_listLookUpttbody);

                                    for (var p = 0; p < tblbody.rows[_listLookUpIndex].cells.length; p++) {
                                        tblbody.rows[_listLookUpIndex].cells[p].style.backgroundColor = tmpBackColor;
                                        if(p != 0)
                                        tblbody.rows[_listLookUpIndex].cells[p].style.color = tmpForeColor;
                                    }
                                    
                                    //tblbody.rows[_listLookUpIndex].style.backgroundColor = tmpBackColor;
                                    //tblbody.rows[_listLookUpIndex].style.color = tmpForeColor;
                                        //document.getElementById(id).style.backgroundColor = '#003F87';
                                        //document.getElementById("Item0").style.color = 'white';


                                   

                                }
                                catch { }
                            }

                            ////FGV - sales order - popup - reason setting - start
                            try {
                                if (ProjectName == "FGV" && (sScreenName == "SalesOrderNewForm_Sales_Item_Reason2" || sScreenName == "SalesOrderForm_Sales_Item_Reason2")) {

                                    var tblbody1 = document.getElementById("ListBodyDivId_SalesOrderSpecialForm_LstItemSpecial");
                                    var tblbody2;

                                    if (previousScreenName == "SalesOrderNewForm")
                                        tblbody2 = document.getElementById("ListBodyDivId_SalesOrderNewForm_Sales_Item");
                                    else
                                        tblbody2 = document.getElementById("ListBodyDivId_SalesOrderForm_Sales_Item");

                                    try {
                                        for (r = 0; r < tblbody1.rows.length; r++) {
                                            var tmp_itemno = tblbody1.rows[r].cells.namedItem("ItemNo1").innerText;
                                            var tmp_reason = tblbody1.rows[r].cells.namedItem("Reason1").childNodes['0'].value;

                                            for (s = 0; s < tblbody2.rows.length; s++) {
                                                if (tblbody2.rows[s].cells.namedItem("ItemID2").childNodes['0'].value == tmp_itemno) {
                                                    if (tmp_reason != "--Select--")
                                                        tblbody2.rows[s].cells.namedItem("Reason2").innerText = tmp_reason;
                                                    break;
                                                }
                                            }

                                        }
                                    } catch (e) {

                                    }


                                    break;
                                }

                            }
                            catch { }
                            ////FGV - sales order - popup - reason setting - end

                                                        //// COMMENTED 26.03.2021 FILLING
                            //=================================================================================================
                            for (var key in dbDataRows[fieldCnt]) {
                                if (key.indexOf("FormView.") > -1 && key.indexOf(".", 9) > -1) {
                                    isLstView = true;
                                    var value = dbDataRows[fieldCnt][key];
                                    var id = key.split('.')[2];

                                    try {
                                        for (var n = 0; n < DropDownIdList.length; n++) {
                                            if (DropDownIdList.length > 0 && DropDownIdList[n].DataMember == id) {
                                                // DropDownIdList = [];
                                                comboboxdata = {};
                                                comboboxdata.DataMember = id;
                                                comboboxdata.Value = value;
                                                DropDownIdValueList.push(comboboxdata);
                                                //  GetListDropDownListValue(scrName, FieldName, ttbody, addCount);
                                            }
                                        }
                                    } catch (e) {

                                    }

                                    //newly added by.M 13.07.2023 - pvmng - inv adjs
                                    if (id.toLowerCase() == "lineno" && value.toString().toLowerCase() == "lineno")
                                        value = _listLookUpIndex + 1;

                                    _listLookUpIndex = _listLookUpIndex == "" ? 0 : _listLookUpIndex == -1 ? 0 : _listLookUpIndex;
                                    if (sScreenName.split('_')[2] == undefined)
                                        _listLookUpttbody = _listLookUpttbody == "" ? "ListBodyDivId_" + sScreenName.split('_')[0] + "_" + FieldName : _listLookUpttbody;
                                    else
                                        _listLookUpttbody = _listLookUpttbody == "" ? "ListBodyDivId_" + sScreenName.split('_')[0] + "_" + sScreenName.split('_')[2] : _listLookUpttbody;
                                    var tblbody = document.getElementById(_listLookUpttbody);

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
                                            var tmppFlg = false;

                                            for (var p = 0; p < DropDownIdList.length;p++)
                                            {
                                                if (DropDownIdList[p].DataMember == id) {
                                                    DropDownIdList[p].RowIndex = _listLookUpIndex;
                                                    tmppFlg = true;
                                                }
                                            }

                                            if (tmppFlg == false) {
                                                comboboxdata = {};
                                                comboboxdata.DataMember = id;
                                                comboboxdata.Value = value;
                                                comboboxdata.RowIndex = _listLookUpIndex;
                                                DropDownIdList.push(comboboxdata);
                                            }


                                            try {
                                                if (sScreenName.indexOf('_FORM_LOOKUP_') > -1) {
                                                    GetListDropDownListValue(CurrentScreen_TabScreen_Name, FieldName, _listLookUpttbody, _listLookUpIndex);
                                                    DropDownIdValueList = [];
                                                }
                                            } catch (e) {

                                            }

                                            if(value != '' && value != null)
                                                tblbody.rows[_listLookUpIndex].cells.namedItem(id).childNodes['0'].value = value;

                                            multiSelectListLookUpChanged(id, _listLookUpIndex);
                                        }
                                        else {
                                            tblbody.rows[_listLookUpIndex].cells.namedItem(id).childNodes['0'].value = value;
                                            PageLoadinginfo_ALT_UOM("id :- " + id + " index : " + _listLookUpIndex + " Value : " + value, "");
                                        }
                                    }
                                    else if (tdType == "checkbox") {
                                        if (value == "false" || value == "0")
                                            tblbody.rows[_listLookUpIndex].cells.namedItem(id).childNodes['0'].checked = false;
                                        else
                                            tblbody.rows[_listLookUpIndex].cells.namedItem(id).childNodes['0'].checked = true;

                                    }
                                    else if (tdType == "linktab") {
                                        var linkId = tblbody.rows[_listLookUpIndex].cells.namedItem(id).childNodes['0'].id;
                                        $("a#" + linkId).attr('href', value);
                                        $("a#" + linkId).text(value);
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
                                        //alert(tblbody.rows[_listLookUpIndex].cells.namedItem(id).innerText);
                                        tblbody.rows[_listLookUpIndex].cells.namedItem(id).innerText = value;
                                    }
                                    else if (tdType == "image") {
                                        var imgPath = SaveImagePath + "/" + value;
                                        tblbody.rows[_listLookUpIndex].cells.namedItem(id).innerHTML = "<img src='" + imgPath + "' width='80' height='80'>";
                                    }
                                    else {
                                        tblbody.rows[_listLookUpIndex].cells.namedItem(id).innerText = value;
                                        
                                    }

                                    // COMMENTED 09.11.2020 ======================
                                    if (ProjectName == "PVMNG" && currentScreenName == "PONewDistributorForm" && _isDefault == "yes")
                                        _isDefault = _isDefault;
                                        else
                                    setListValue("", id, _listLookUpIndex, _listLookUpttbody);
                                }
                                else {
                                    logstr = logstr + " : 6 : ";

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
                                                g = arrfrm.length + 1;
                                            }
                                        }
                                    }
                                    logstr = logstr + " : 7 : ";

                                    if ($('#' + arrFieldName[1]).attr('type') == 'image') {
                                        $('#' + arrFieldName[1]).removeAttr("src", "");
                                        $('#' + arrFieldName[1]).removeAttr("src");
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
                                        isDateModified = true;

                                        $('#' + arrFieldName[1]).val(fieldValue);
                                        if (fieldValue != "") {
                                            var returnDate = '';
                                            var dat = fieldValue;

                                            var tim = '';
                                            if (fieldValue == 2) {
                                                dat = data[j][formConfig[i].DataMember].split(' ')[0];
                                                tim = data[j][formConfig[i].DataMember].split(' ')[1];
                                            }

                                            if (_format.toLowerCase().indexOf("dd") == 0) {
                                                returnDate = DateFormateChangeDDMM("dd/mm/yyyy", dat);
                                            }
                                            else if (_format.toLowerCase().indexOf("mm") == 0) {
                                                returnDate = DateFormateChangeDDMM("mm/dd/yyyy", dat);
                                            }
                                            if (fieldValue == 2) {
                                                returnDate = returnDate + " " + tim;
                                            }

                                            $('#' + arrFieldName[1]).data("DateTimePicker").date(moment(new Date(returnDate)).format(_format));
                                            //$('#' + arrFieldName[1]).data("DateTimePicker").date(moment(new Date(fieldValue)).format(_format));
                                        }
                                        isDateModified = false;
                                    }
                                    else if ($('#' + arrFieldName[1]).attr('type') == "radio") {
                                        $("input[name=" + arrFieldName[1] + "][value='" + fieldValue + "']").attr('checked', 'checked');
                                    }
                                    else if ($('#' + arrFieldName[1]).attr('type') == "checkbox") {
                                        if (fieldValue == 0 || fieldValue == "0")
                                            $('#' + arrFieldName[1]).attr("Checked", false);
                                        else
                                            $('#' + arrFieldName[1]).attr("Checked", true);
                                    }
                                    else if ($('#' + arrFieldName[1])[0] != undefined && $('#' + arrFieldName[1])[0].tagName == "svg") {
                                        if (fieldValue != "") {
                                            JsBarcode('#' + arrFieldName[1], fieldValue);
                                            $('#' + arrFieldName[1]).show();
                                        }
                                        else
                                            $('#' + arrFieldName[1]).hide();
                                    }
                                    else {
                                        if ($('#' + arrFieldName[1])[0] != undefined && $('#' + arrFieldName[1])[0].localName == "a") {
                                            var link = SaveImagePath + "/" + fieldValue;
                                            $("a#" + arrFieldName[1]).attr('href', link);
                                            $("a#" + arrFieldName[1]).text(fieldValue);
                                        }
                                        else {
                                            logstr = logstr + " : 8 : ";

                                            try {
                                                if (arrFieldName.length > 1) {
                                                    var itm = document.getElementById(arrFieldName[1]);// $('#' + arrFieldName[0]).attr('type');
                                                    if (itm.className.toLowerCase() == "select2-hidden-accessible") {
                                                        comboboxdata = {};
                                                        comboboxdata.DataMember = arrFieldName[1];
                                                        comboboxdata.ScreenName = currentScreenName;
                                                        comboboxdata.FormListType = "Form";
                                                        comboboxdata.AutoSearch == "Yes";
                                                        DropDownIdList.push(comboboxdata);
                                                        // DropDownIdList.push(formConfig[i].DataMember);
                                                        GetDropDownListValue(currentScreenName, "Form");
                                                        //GetDropDownListValue(currentScreenName, "Form");
                                                        DropDownIdList = [];

                                                        $('#' + arrFieldName[1]).val(fieldValue);

                                                        //ADDED BY SUNDAR ON 02-12-2024
                                                        if (fieldValue != "" || fieldValue != null) {
                                                            /*document.getElementById(arrFieldName[1]).style.border = "1px solid Lightgrey";*/
                                                            const element = document.querySelector('[aria-labelledby="select2-' + arrFieldName[1] + '-container"]');
                                                            element.style.border = "1px solid Lightgrey";

                                                        }

                                                    }

                                                }
                                                else {
                                                    var itm = document.getElementById(arrFieldName[0]);// $('#' + arrFieldName[0]).attr('type');
                                                    if (itm.className.toLowerCase() == "select2-hidden-accessible") {
                                                        comboboxdata = {};
                                                        comboboxdata.DataMember = arrFieldName[0];
                                                        comboboxdata.ScreenName = currentScreenName;
                                                        comboboxdata.FormListType = "Form";
                                                        comboboxdata.AutoSearch == "Yes";
                                                        DropDownIdList.push(comboboxdata);
                                                        // DropDownIdList.push(formConfig[i].DataMember);
                                                        GetDropDownListValue(currentScreenName, "Form");
                                                        //GetDropDownListValue(currentScreenName, "Form");
                                                        DropDownIdList = [];

                                                        $('#' + arrFieldName[0]).val(fieldValue);

                                                        //ADDED BY SUNDAR ON 02-12-2024
                                                        if (fieldValue != "" || fieldValue != null) {

                                                            const element = document.querySelector('[aria-labelledby="select2-' + arrFieldName[0] + '-container"]');
                                                            element.style.border = "1px solid Lightgrey";

                                                            //document.getElementById(arrFieldName[0]).style.border = "1px solid Lightgrey";
                                                        }

                                                    }
                                                }

                                            } catch (e) {

                                            }

                                            try {
                                                $('#' + arrFieldName[1]).val(fieldValue);
                                                //ADDED BY SUNDAR ON 02-12-2024
                                                if (fieldValue != "" || fieldValue != null) {
                                                    var el = document.getElementById("tooltip_" + arrFieldName[1]);
                                                    if (el != null)
                                                        el.remove();
                                                    document.getElementById(arrFieldName[1]).style.border = "1px solid Lightgrey";
                                                    //if (obj["FieldControl"] == "COMBOBOXSEARCH") {
                                                    //    const element = document.querySelector('[aria-labelledby="select2-' + obj["FieldName"] + '-container"]');
                                                    //    element.style.border = "1px solid Lightgrey";
                                                    //    alert(document.getElementById(obj["FieldName"]).closest("div"));
                                                    //}
                                                }

                                            } catch (e) {

                                            }

                                            

                                            //$('#' + arrFieldName[1]).onblur();
                                            // $('#' + arrFieldName[1]).text(fieldValue);
                                            logstr = logstr + " : 9 : ";

                                        }
                                    }
                                }
                            }

                           
                            //=================================================================================================
                            // COMMENTED 26.03.2021 FILLING
                            if ((fieldCount > 1) && _listLookUpttbody != "" && isLstView == true) {//text  and button onchange event
                                
                                var tfoot = "ListfootDivId_" + sScreenName.split('_')[0] + "_" + sScreenName.split('_')[2];
                                //If added by Sundar Condition Checking 13/11/2024
                                if (fieldCnt != fieldCount - 1) {
                                    _listLookUpIndex++;
                                    CreateList(_listLookUpttbody, tfoot, currentScreenName, 1, "", FieldName, '', '', 1);
                                }
                                try {
                                   // if (ttbody == swap_ttbody)
                                        rowRefresh(swap_ttbody);
                                } catch (err) {

                                }
                            }

                            if (_isdynamic == true && isValidateList == true) {
                                lookUpPopUpClose();
                                if (isValidateList == true) {
                                    
                                    // COMMENTED 15.02.2021 ==========================================
                                    //dynamicNewRowAdd();
                                    //newly added.By.M.22.06.2023
                                    _ispagination = _previousispagination;

                                    console.log(key);

                                    if (key.indexOf("FormView.") > -1)
                                        console.log("1- " + key);
                                    if (key.indexOf(".", 9) > -1)
                                        console.log("2- " + key);

                                    if (key.indexOf("FormView.") > -1 && key.indexOf(".", 9) > -1) {
                                        try {
                                            dynamicNewRowAdd();
                                        } catch (errr) {

                                        }
                                    }
                                    // COMMENTED 15.02.2021 ==========================================

                                    isValidateList = false;
                                }
                                //  isValidateList = false;
                            }
                            else if (isFormLookUpClicked == true) {
                                //if (isFormLookUpClicked == true) {
                                //newly added.By.M.27.06.2023
                                _objArray.arrList = Params.arrList;

                                lookUpPopUpClose();
                            }
                            else if (isListLookUpClicked == true && isValidateList == true) {
                                lookUpPopUpClose();
                                isValidateList = false;
                            }

                        }

                        if (fieldCount > 0)
                        _isDefault = "no";

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

                                //isExecute = true;
                                //setTimeout(function () {
                                $.ajax({
                                    url: _url,
                                    type: 'POST',
                                    async: false,
                                    dataType: 'json',
                                    data: { fromdate: addrFromDate, todate: addrToDate, salesmanterritory: addrSalesmanTerritory, userid: userid, servicetype: servicetype, reasoncode: reasoncode },                            //data: { query: qry },
                                    success: function (results) {
                                        var ddfsf = results;

                                        //isExecute = false;
                                        //PerformAction(tempsActionEvent, tempobjData, (tempPAi + 1));
                                    },
                                    error: function (results, q, a) {
                                        alert(results);
                                    }
                                });

                                //}, 200);

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
                                //LoadingImageOpen();
                                //setTimeout(function () {
                                $.ajax({
                                    url: _url,
                                    type: 'POST',
                                    dataType: 'json',
                                    async: false,
                                    data: { fromdate: addrFromDate, todate: addrToDate, PayTerms: addrTerms, salesmanterritory: addrSalesmanTerritory, CompanyName: company, userid: userid },                            //data: { query: qry },
                                    success: function (results) {
                                        var ddfsf = results;
                                    },
                                    //beforeSend: function () {
                                    //    $(".modalA").show();
                                    //},
                                    //complete: function () {
                                    //    setTimeout(function () {
                                    //        $(".modalA").hide();
                                    //    }, 1000);
                                    //},
                                    error: function (results, q, a) {
                                        alert(results);
                                    }
                                });
                                //}, 100);

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
                                //if (_url != "/Reports/GETDISTANCE/") {
                                isExecute = true;
                                //LoadingImagePopUpOpen();
                                setTimeout(function () {
                                    $.ajax({
                                        url: _url,
                                        type: 'POST',
                                        dataType: 'json',
                                        //async: false,
                                        async: true,
                                        data: { date: addrDate, SalesmanTerritory: addrSalesmanTerritory },
                                        //data: { query: qry },
                                        beforeSend: function () {
                                            LoadingImagePopUpOpen();
                                        },
                                        success: function (results) {
                                            var ddfsf = results;
                                            LoadingImagePopUpClose();
                                            isExecute = false;
                                            PerformAction(tempsActionEvent, tempobjData, (tempPAi + 1));
                                        },
                                        error: function (results, q, a) {
                                            alert(results);
                                        }
                                    });

                                }, 50);

                                return;
                                // }
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
                        if (isAdressDistance != true)
                            isExecute = false;
                        if (isasync == true) {
                            handleFieldAction(tempsScreenName, tempsFieldName, tempsDataMember, (temphFAi + 1));
                            PerformAction(tempsActionEvent, tempobjData, (tempPAi + 1));
                        }
                    },
                    error: function (results, q, a) {
                        isExecute = false;
                        PerformActioninfo("EXECUTE ajax function error : " + results + "  ==> logstr : " + logstr);
                        info_ALT(performActioninformation, "PerformActionInfo");
                        // alert("test : : " + results);
                    }

                });


                //Newly added by.M 13.10.2021
                //$.wait(1, function () {
                //});


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
            if (arrayQuery[0].trim().toLowerCase().indexOf('select') == 0) {
                try {
                    if (ProjectName == "PVMB")
                        POReceivingViewFormLogString("currentScreenName :" + currentScreenName + "Bulk insert query : " + arrayQuery[0] + " & UserID : " + _UserID);
                } catch (e) {

                }
            }
            else
            {
                BulkInsertQueries(arrayQuery);
            }

        }
    } catch (e) {

        isExecute = false;
        TiAPIinfo('e ---> ' + e);
        //alert('e ---> ' + e);
        PerformActioninfo("handleFieldAction catch error : " + e);
        info_ALT(performActioninformation, "PerformActionInfo");
    }
}

function getValueFromTempTable(key, dbDataRows) {
    /*
    ?dbDataRows[0]["FormView.Item.ItemNo"]
"499009"
?dbDataRows[0]["FormView.Item.UOM"]
"TIN"

?salesOrderListView[0].ItemNo
"499009"
?salesOrderListView[0].UOM
"TIN"*/
    var getvalue = "";
    var getkey = key.split(".")[2].toString();
    var i, ij;
    try {
        var itmno = dbDataRows[0]["FormView.Item.ItemNo"].toString().toLowerCase();

        for (i = 0; i < salesOrderListView.length; i++) {
            if (salesOrderListView[i].ItemNo.toString().toLowerCase() == itmno) {
                getvalue = salesOrderListView[i][getkey];
            }
        }

        return getvalue;

    }
    catch (e) {
        return "";
    }

    return "";
}


function getDateFormat(strValue, FieldName) {
    var i;
    if (systemTableConfig["DATEFORMATSTRING"] != undefined) {
        var _format = systemTableConfig["DATEFORMATSTRING"] == undefined ? "" : systemTableConfig["DATEFORMATSTRING"].toString().toLowerCase();
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
    }
    return strValue;

}

function zerofill(i) {
    return (i < 10 ? '0' : '') + i;
}
function getClientSideDateTime() {
    var dt = new Date();
    var dat = zerofill(dt.getDate()) + "-" + zerofill((dt.getMonth() + 1)) + "-" + dt.getFullYear();
    var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
    return dat + " " + time;
}

function replaceQueryString(key, queryName) {
    try {
        if (key.toUpperCase() == 'CUSTNO') {
            return Ti.App.SQL.safeSQL(Ti.App.CustNo);
        }
        else if (key.toUpperCase() == 'SUMOFCOLUMN') {
            return (sumofColumn);
        }
        else if (key.toUpperCase() == 'RESULT') {
            return (RESULT);
        }
        else if (key.toUpperCase() == 'GETDATE') {
            var _format = systemTableConfig["DATEFORMATSTRING"].toString().toLowerCase();
            var dateTime = getClientSideDateTime();
            var splitDate = dateTime.split(' ')[0];
            if (_format.toLowerCase().indexOf("dd") == 0) {
                var retDate = DateFormateChangeDDMM("dd/mm/yyyy", splitDate);
                return (retDate);
            }
            else {
                var retDate = DateFormateChangeDDMM("mm/dd/yyyy", splitDate);
                return (retDate);
            }
        }
        else if (key.toUpperCase() == 'GETDATETIME') {
            var _format = systemTableConfig["DATEFORMATSTRING"].toString().toLowerCase();
            var dateTime = getClientSideDateTime();
            var splitDate = dateTime.split(' ')[0];
            var splitTime = dateTime.split(' ')[1];
            if (_format.toLowerCase().indexOf("dd") == 0) {
                var retDate = DateFormateChangeDDMM("dd/mm/yyyy", splitDate);
                return (retDate + " " + splitTime);
            }
            else {
                var retDate = DateFormateChangeDDMM("mm/dd/yyyy", splitDate);
                return (retDate + " " + splitTime);
            }

        }
        else if (key.toUpperCase() == 'SUMOFROWCOUNT') {
            return (sumofRowCount);
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
        else if (key.toUpperCase() == "FORMVIEW.URL1") {
            return (_URL1);
        }
        else if (key.toUpperCase() == "FORMVIEW.SEARCHOPTION") {
            var searchOption = "";
            for (var i = 0; i < searchOptionArray.length; i++) {
                searchOption = searchOption + searchOptionArray[i].SearchQuery
            }
            return (searchOption);
        }
        else if (key.toUpperCase() == "FORMVIEW.SORTOPTION") {
            var sortOption = "";
            for (var i = 0; i < sortOptionArray.length; i++) {
                if (sortOption != " ")
                    sortOption = sortOption + " , ";
                sortOption = sortOption + sortOptionArray[i].OrderByQuery
            }
            return (sortOption);
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
                var sValue = Params.FormView["" + arrFields[2] + ""] == undefined ? "" : Params.FormView["" + arrFields[2] + ""].toString();

                return (sValue);


            }

            else if (key.indexOf("Params.") > -1 || key.indexOf("Param.") > -1) {//{Params.fieldName
                var arrKey = key.split(".");
                return Ti.App.SQL.safeSQL(objParams[arrKey[1]]);
            } else if (key.indexOf("FormView.ListView.") > -1) {
                try {
                    var arrFields = key.split('ListView.');
                    var keyValue = arrFields[1];
                    var sValue = '';
                    if (keyValue == "UserNo") {
                        sValue = tempUserNo;
                    }
                    else if (FieldName == undefined) {
                        sValue = FormView["" + arrFields[1] + ""]["" + keyValue + ""].toString();
                    }
                    else {
                        try {
                            sValue = FormView["" + FieldName + ""]["" + keyValue + ""].toString();
                            // TiAPIinfo('=>sValue : ' + sValue);
                            // COMMENTED 12.04.2021 ==============================================
                            // IF IT IS DATEPICKER THEN CONVERT DATA AS DATEFORMAT IN SYSTEM TABLE
                            sValue = getDateFormat(FormView["" + FieldName + ""]["" + keyValue + ""].toString(), keyValue);
                            // COMMENTED 12.04.2021 ==============================================
                        }
                        catch (e) {
                            // COMMENTED 12.11.2020 ===
                            //  TiAPIinfo('=>FieldName : ' + FieldName);
                            sValue = FormView["" + FieldName.split('_')[0] + ""]["" + keyValue + ""].toString();
                        }

                    }
                    // TiAPIinfo(' =>arrFields[1] : ' + arrFields[1] + ' - sValue : ' + sValue);
                    sValue = (sValue == '' || sValue == undefined || sValue == null) ? '' : sValue;
                    return (sValue);
                }
                catch (e) {
                    return ("''");
                }
            }

            else if (key.indexOf("FormView.") > -1 && key.indexOf(".", 9) > -1) {
                try {
                    var arrFields = key.split('.');
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
                                    if (ProjectName.toLowerCase() == "mm") {
                                        if (ids == "''") {
                                            ids = FormView["ListViewSub"]["" + arrFields2 + ""].toString();
                                        }
                                        else {
                                            ids = ids + "," + FormView["ListViewSub"]["" + arrFields2 + ""].toString();
                                        }
                                    }
                                    else {
                                        if (ids == "''") {
                                            ids = "'" + FormView["ListViewSub"]["" + arrFields2 + ""].toString() + "'";
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
                    }
                    var sValue = FormView["" + arrFields[1] + ""]["" + arrFields[2] + ""] == undefined ? "" : FormView["" + arrFields[1] + ""]["" + arrFields[2] + ""].toString();
                    sValue = getDateFormat(sValue, arrFields[2]);
                    return (sValue);

                } catch (e) {
                    return ("''");
                }
            }
            else if (key.indexOf("FormView.") > -1) {
                try {
                    var arrFields = key.split('FormView.');
                    var sValue = getFormComponentValue(arrFields[1]);//ArrayOperations
                    if ((sValue == false || sValue == true));
                    else {
                        sValue = (sValue == '' || sValue == undefined || sValue == null) ? '' : sValue;
                        sValue = sValue != "" ? sValue : arrFields[1] == "UserID" ? FormView["" + arrFields[1] + ""] != undefined ? FormView["" + arrFields[1] + ""].toString() : dataFieldIdList.UserID : "";

                        if (sValue == '')
                            sValue = FormView[arrFields[1]];

                    }
                    return (sValue);//SQL
                } catch (e) {
                    return ("''");
                }
            } else if (key.indexOf("ListView.") > -1) {
                try {
                    var arrFields = key.split('ListView.');
                    var keyValue = arrFields[1];
                    var sValue = FormView["" + FieldName + ""]["" + keyValue + ""].toString();

                    TiAPIinfo('LISTVIEW -> ' + sValue);
                    sValue = (sValue == '' || sValue == undefined || sValue == null) ? '' : sValue;
                    return (sValue);
                } catch (e) {
                    return ("''");
                }
            }
            else if (key.indexOf("ParamJS.") > -1 || key.indexOf("Paramjs.") > -1) {
                try {
                    var arrFields = key.split('ParamJS.').length == 1 ? key.split('Paramjs.') : key.split('ParamJS.');
                    var keyValue = arrFields[1];
                    var sValue = ParamJS["" + keyValue + ""] == undefined ? '' : ParamJS["" + keyValue + ""].toString();
                    sValue = (sValue == '' || sValue == undefined || sValue == null) ? '' : sValue;
                    return (sValue);
                } catch (e) {
                    return ("''");
                }
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
            TiAPIinfo(' REPLACE QUERY STRING ERROR : e ---> ' + e);
            return '';
        }

    } catch (e) {
        return ("''");
    }
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

function sendEmail(screen,code, otp) {
   // alert(otp);
    console.log("java: 3");
    if (code == '')
        code = code;
    else {
        $.ajax({
            type: "POST",
            url: url_SendEmail, ///Login/SendOTPEmail/
            data: JSON.stringify({ 'sAgentScreen': screen, 'sAgentID': code, 'sAgentOTP': otp }),
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            async: false,
            success: function (results) {
                alert(results);
                try {
                    $('#OTP').val('');
                    $('#AgentID').val('');
                }
                catch (err) {
                }


            },
            error: function (results, q, a) {

                alert(results);
            }
        });
    }
}

function POReceivingViewFormLogString(errorStr) {

    try {
        $.ajax({
            type: 'POST',
            //url: url_WriteItemPromoLog,
            // url: url_WriteSearchLog,
            url: url_POReceivingViewFormLogString,
            dataType: 'json',
            data: { msg: errorStr },
            async: false,
            success: function (data) {
                //alert(data);
            }
        });

    }
    catch (err) {
        //alert(JSON.stringify(err));
    }
}

function PONewSkuDistributorLogString(errorStr) {

    try {
        $.ajax({
            type: 'POST',
            //url: url_WriteItemPromoLog,
            // url: url_WriteSearchLog,
            url: url_PONewSKUDistributorLog,
            dataType: 'json',
            data: { msg: errorStr },
            async: false,
            success: function (data) {
                //alert(data);
            }
        });

    }
    catch (err) {
        //alert(JSON.stringify(err));
    }
}

//------------------------------------------Auto Complete------------------------------------------------
function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        a.set
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}


function OptimizedRoutes(processId,fieldName) {
    try {
        var resultId = processId,
            key = '1AkdFFMFx09rNvWiwaiv75FoIjaTKDxK',
            frame = document.getElementById(fieldName);
            //console.log(resultId.value);
           frame.src = "https://portal.optiways.io/Optimizer/CustomerView/" + resultId + "?key=" + key;
 }
    catch { }

}

function deleteImage(filename) {

    try {
        $.ajax({
            type: 'POST',
            //url: url_WriteItemPromoLog,
            // url: url_WriteSearchLog,
            url: url_ImageDelete,
            dataType: 'json',
            data: { imgname: filename },
            async: false,
            success: function (data) {
                //alert(data);
            }
        });

    }
    catch (err) {
        alert(JSON.stringify(err));
    }
}


function manualShowMandatory(scrName) {
    try {
        var dbDataRows1, dbDataRows2;
        //  if (objData.fieldName == "form") {
        var _qry = "Select * from mandatoryconfig where screenname like '" + scrName + "' and ismandatory=1 order by priorityseq";
        execute(_qry);
        dbDataRows = executeQry;
        _qry = "Select * from mandatorylistconfig where screenname like '" + scrName + "%' and ismandatory=1 order by priorityseq";
        execute(_qry);
        dbDataRows1 = executeQry;
        //dbDataRows = dbDataRows;

        const elements = document.getElementsByTagName('label');

        for (var z = 0; z < elements.length; z++) {
            elements[z].innerHTML = elements[z].innerHTML.replace('<span style="color:red">*</span>', "");
        }

        //try {
        //    var obj1 = dbDataRows[0];
        //    var fName1 = obj1["ConditionField"];
        //    if (fName1 == null)
        //        dbDataRows = dbDataRows.filter(x => x.ConditionField === fName1);
        //    else {
        //        var condValue1 = $('#' + fName1).val();
        //        dbDataRows = dbDataRows.filter(x => x.ConditionValue === condValue1);
        //    }
        //} catch (err) {

        //}

        for (var j = 0; j <= dbDataRows.length - 1; j++) {
            var obj = dbDataRows[j];
            var fName = obj["ConditionField"];
            if (fName !== null && fName !== "") {
                try {
                    var condValue;

                    if (obj["FieldControl"] == "CHECKBOX")
                        condValue = document.getElementById(fName).checked;// $('#' + fName).val();
                    else
                        condValue = $('#' + fName).val();

                    if (obj["ConditionValue"] == condValue) {
                        if (obj["FieldControl"] == "LISTVIEW") {
                            try {
                                var condValue2 = arrActionQuery[i].ScreenName + "_LISTVIEW_" + dbDataRows[j].FieldName; //$('#' + fName1).val();
                                dbDataRows2 = dbDataRows1.filter(x => x.FieldName === condValue2);
                            } catch (err) {

                            }
                            for (var h = 0; h <= dbDataRows2.length - 1; h++) {
                                var obj2 = dbDataRows2[h];
                                var span = $(obj2["FieldName"] + " &nbsp;<span style='color:red'>*</span>");
                                $('#lbl_' + obj2["FieldName"]).append(span);
                            }
                        }
                        else {
                            var span = $(obj["FieldName"] + " &nbsp;<span style='color:red'>*</span>");
                            $('#lbl_' + obj["FieldName"]).append(span);
                        }
                    }

                } catch (err) {

                }
            }
            else {
                if (obj["FieldControl"] == "LISTVIEW") {
                    try {
                        //arrActionQuery[i].ScreenName + "_LISTVIEW_" + dbDataRows[j].FieldName; //$('#' + fName1).val();
                        var condValue2 = CurrentScreen_TabScreen_Name + "_LISTVIEW_" + dbDataRows[j].FieldName; //$('#' + fName1).val();
                        dbDataRows2 = dbDataRows1.filter(x => x.ScreenName === condValue2);
                    } catch (err) {

                    }
                    for (var h = 0; h <= dbDataRows2.length - 1; h++) {
                        var obj2 = dbDataRows2[h];
                        var span = $(obj2["FieldName"] + " &nbsp;<span style='color:red'>*</span>");
                        $('#th_' + obj2["FieldName"]).append(span);
                    }
                }
                else {
                    var span = $(obj["FieldName"] + " <span style='color:red'>*</span>");
                    $('#lbl_' + obj["FieldName"]).append(span);
                }
            }

        }
        //}
        //else {

        //}
        // LoadingImagePopUpOpen();

    }
    catch (err) {

    }
}

//-------------------------------------------Auto Complete-------------------------------------

//function NewWindowOpen(qry, screenName) {
//     debugger;
//    if (setIntervaltimer != null) {
//        clearInterval(setIntervaltimer);
//        setIntervaltimer = null;
//    }

//    PageLoadinginfo("New Window open");
//    setColorConfig();
//    setCookie('LogInType', JSON.stringify(""));
//    setCookie('LogInType', "");

//    var previewsMainMenuId = getCookie('PreviewsMainMenuId')
//    var previewsSubMenuId = getCookie('PreviewsSubMenuId');

//    if (previewsMainMenuId != null && previewsMainMenuId != "") {
//        try {
//            document.getElementById(previewsMainMenuId).style.backgroundColor = "";
//        }
//        catch (e) {
//        }
//    }
//    if (previewsSubMenuId != null && previewsSubMenuId != "" && document.getElementById(previewsSubMenuId) != null) {
//        document.getElementById(previewsSubMenuId).style.backgroundColor = "";
//    }

//    var mainMenuId = getCookie('MainMenuId')
//    var subMenuId = getCookie('SubMenuId');
//    if (mainMenuId != null && mainMenuId != "") {
//        try {
//            document.getElementById(mainMenuId).style.backgroundColor = "darkblue";
//        }
//        catch (e) {
//        }
//    }
//    if (subMenuId != null && subMenuId != "" && document.getElementById(subMenuId) != null) {
//        document.getElementById(subMenuId).style.backgroundColor = "darkblue";
//    }


//    currentScreenName;
//    PageLoadinginfo("Step 1");
//    NewWindowClearVariableField();
//    _screenName = screenName;
//    pageLoadingLog = "";

//    var clickEvent = getCookie('ClickEvent');
//    //var formView = getCookie('FormView')
//    //formView = ReplaceStringtoSpecialCharacter(formView);
//    //Params.FormView = $.parseJSON(formView);
//    //LastParams.FormView = $.parseJSON(formView);
//    Params.FormView = FormView;
//    LastParams.FormView = FormView;

//    //newly Commented by.M 18.01.2023 //todo
//    var query = "select QueryText + ' ' + GroupText + ' ' + OrderText from Queryconfig where screenname ='" + _screenName + "_FORM'";
//    PageLoadinginfo("Form query " + query);
//    getExecute(query);
//    var qry = executeQry;

//    //newly added by.M 18.01.2023
//    //var sScreenName = _screenName + "_FORM";
//    //var query = getString['QueryConfig_' + sScreenName];
//    //if (query != undefined) {
//    //    query = getString['QueryConfig_' + sScreenName];
//    //    query += ' ' + getString['QueryConfig_' + sScreenName + '_GroupText'];
//    //    query += ' ' + getString['QueryConfig_' + sScreenName + '_OrderText'];
//    //}
//    //else {
//    //    sScreenName = _screenName + "_Form";
//    //    query = getString['QueryConfig_' + sScreenName];
//    //    query += ' ' + getString['QueryConfig_' + sScreenName + '_GroupText'];
//    //    query += ' ' + getString['QueryConfig_' + sScreenName + '_OrderText'];
//    //}
//    sScreenName = "";
//    qry = formatQueryString(qry, sScreenName);
//    PageLoadinginfo("formatQueryString query done ");
//    execute(qry);
//    var executeData = executeQry;
//    ///

//    _rowItemData = quoteReplace(_rowItemData);
//    $("#FormListDivId").empty();

//    var htm = '<div id="FormConfig_' + _screenName + '"></div>';
//    $("#FormListDivId").append(htm);
//    var _divId = "FormConfig_" + _screenName;
//    var pageCount = 0;

//    var _action = 'create';
//    isActionCreate = "create";
//    if (executeData != "" && executeData != null) {
//        _action = 'edit';
//        isActionCreate = "edit";
//    }

//    agentID = _UserID;
//    FormView.UserID = _UserID;
//    FormView.URL = _URL;
//    FormView.PlanoGramURL = _PlanoGramURL;
//    dataFieldIdList.UserID = _UserID;
//    getdocNo();
//    currentScreenName = _screenName;
//    CurrentScreen_TabScreen_Name = _screenName;
//    if (currentScreenName == "AssetForm" || currentScreenName == "FocusSKUForm")
//        _action = 'edit';

//    windowPreparingToOpen(_screenName);
//    //todo1
//    //setSystemTableConfig();
//    if (ProjectName == "MM") {
//        sLanguage = mmLanguage;
//    }
//    PageLoadinginfo("Form Open ");
//    GetFormConfig("FormConfig_" + _screenName, _screenName);

//    if (executeData != "" && executeData != null && currentScreenName != "AssetForm") {
//        AssignFormData(executeData);
//        if (currentScreenName == "SalesOfficeStockRequestForm") {
//            if (ProjectName.toString().toLowerCase() != "pvm") {
//                $('#Button_SaveBtn').attr('disabled', 'disabled');
//                $('#Button_SaveBtn').css("cursor", "not-allowed");
//            }
//            $('#LookUp_Name').hide();
//            $('#DynamicButtonId_SalesOfficeStockRequestForm').hide();
//        }
//        if (currentScreenName == "CustomerProductForm") {
//            $('#LookUp_CustID').hide();
//        }
//        $('#TransNo,#RouteNo').attr("readonly", true);
//    }

//    setFormConfig(sLanguage);
//    // setListConfig(sLanguage);

//    if (currentScreenName == "AssetForm") {
//        var qScrreenName = currentScreenName + '_FORM';
//        var qry = getString['QueryConfig_' + qScrreenName];
//        qry += ' ' + getString['QueryConfig_' + qScrreenName + '_GroupText'];
//        qry += ' ' + getString['QueryConfig_' + qScrreenName + '_OrderText'];
//        qry = formatQueryString(qry, qScrreenName);
//        execute(qry);
//        AssetFormAssignFormData(executeQry);
//    }
//    if (currentScreenName == "ImportDataForm")
//        $('#Template').html('<z><a href="../ImportFiles/DownloadFiles/Template.xlsx" style="color: blue" download>Template.xlsx</a></z>');
//        //$('#Template').html('<z><a href="../ImportFiles/DownloadFiles/Template.xlsm" style="color: blue" download>Template.xlsm</a></z>');
//    else if (currentScreenName == "POSDataUploadForm") {
//        $('#Template').html('<z><a href="../ImportFiles/DownloadFiles/POSTemplate.xlsx" style="color: blue" download>POSTemplate.xlsx</a></z>');
//    }
//    if ($('#Template').html() != undefined && currentScreenName == "SerialNoUpdateNewForm") {
//        $('#Template').html('<z><a href="../ImportFiles/DownloadFiles/SerialNoUpdateTemplate.xlsx" style="color: blue" download>Template.xlsx</a></z>');
//    }
//    if (currentScreenName.toString().toLowerCase() == "todayinvoicelist") {
//        if (mapTimer != "") {
//            setInterval(function () {
//                //alert('calling');
//                GetFormConfig("FormConfig_" + _screenName, _screenName);
//                //alert('ok');
//            }, mapTimer * 1000);
//        }
//    }
//    $('#FormListDivId').show();
//    PageLoadinginfo("Page Load end");
//    //info(pageLoadingLog, "PageLoadinginfo");
//    pageLoadingLog = "";

//    SaveWebtoolAuditlog(screenName);
//}


//function NewWindowClearVariableField() {
//    formFieldIdList = {};
//    searchOptionArray = [];
//    sortOptionArray = [];
//    objSearch = {};

//    dataFieldIdList = {};
//    formFieldIdList = {};

//    formdata = {};
//    formItems = [];
//    arrfrm = [];
//    _objArray = {};
//    fieldNames = []; formFieldNames = []; formDataMember = [];

//    //01.06.2023
//    dynamicFieldName = ""; _listLookUpttbody = "";
//    isMultiSelect = false;
//    LookUpMultiSelected = [];

//    isDynamicValidate = true;
//    ispopupContainerThirdLevel = false;
//    $('.ui-dialog-titlebar-close').show();
//}

//$(document).ready(function () {
//    //$('.timepicker').timepicki();
//    $('.monthyearpicker').Monthpicker();
//    //$(".datepicker").datepicker({
//    //    //timeFormat:  "hh:mm:ss",
//    //    dateFormat: "mm/dd/yy",
//    //    // dateFormat: "h:mm",
//    //    changeMonth: true,
//    //    changeYear: true,
//    //    yearRange: "-60:+60",
//    //    setDate: new Date()
//    //});
//    $(".datepickerList").datepicker({
//        //timeFormat:  "hh:mm:ss",
//        dateFormat: "mm/dd/yy",
//        // dateFormat: "h:mm",
//        changeMonth: true,
//        changeYear: true,
//        yearRange: "-60:+60",
//        setDate: new Date()
//    });


//    $(".searchdatepicker").datepicker({
//        //timeFormat:  "hh:mm:ss",
//        dateFormat: "mm/dd/yy",
//        // dateFormat: "h:mm",
//        changeMonth: true,
//        changeYear: true,
//        yearRange: "-60:+60",
//        setDate: new Date()
//    });

//});



