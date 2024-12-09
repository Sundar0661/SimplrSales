var agentID = '';
var _URL1 = '';
var RandomPwd = '';
var currentScreenName = '';
var _divId = '';
var setIntervaltimer = null;
var screeninfo = '';
var SessionExpiredTime = 0;
SessionExpiredTime = getSessionExpiredTime();

function getSessionExpiredTime() {
    var dt = new Date();
    var time = dt.getMinutes();// dt.getHours() + ":" + dt.getMinutes();//+ ":" + dt.getSeconds();
    return time;
}
function ExecuteQryConfig() {
    LoadingImageOpen();
    setTimeout(function () {
        ExecuteQryConfigfun();
        LoadingImageClose();

        //setTimeout(function () {
        setQueryConfig(1);

        //}, 3000);
    }, 300);
}

var isActionCreate = "create";
function ExecuteQryConfigfun() {
   // alert("TestVishnu");
    setCookie('LogInType', JSON.stringify(""));
    setCookie('LogInType', "");
    var formView = getCookie('FormView');
    //var formView = getCookie('FormView' + _screenName);
    if (formView == "" || formView == null) {
        $.ajax({
            type: 'POST',
            url: url_TempStoreFormView,
            //url: "../Common/TempStoreFormView",
            data: { data: "" },
            async: false,
            success: function (result) {
                formView = result;
            }
        });
    }

    var clickEvent = getCookie('ClickEvent');
    formView = ReplaceStringtoSpecialCharacter(formView);
    Params.FormView = $.parseJSON(formView);
    LastParams.FormView = $.parseJSON(formView);

    setSystemTableConfig();
    //if (_screenName == "Web_DashBoard" && ProjectName.toString().toLowerCase() != "pokka")
    if (_screenName == "Web_DashBoard")
        _screenName = "Web_DashBoard_01";//not show
    var query = "select QueryText + ' ' + GroupText + ' ' + OrderText from Queryconfig where screenname ='" + _screenName + "_FORM'";
    FormListConfiginfo("Queryconfig  : " + query);

    getExecute(query);

    var qry = executeQry;
    var sScreenName = "";
    qry = formatQueryString(qry, sScreenName);
    FormListConfiginfo("QueryConfig Text : " + qry);
    execute(qry);

    var executeData = executeQry;

    ///

    try {
        if (ProjectName == "CPF" && _screenName == "Web_DashBoard_01") {

            var htmm = '<div style="position:relative;height:100%;width:100%;">';
            htmm += '<img src="../Images/cpfscreen.png" style="position:absolute;top:0;bottom:0;left:0;right:0;margin:auto;" />';
            htmm += '</div>';

            $("#FormListDivId").append(htmm)

            //document.getElementById("FormListDivId").append(htmm);
            document.getElementById("formContainer").style = "height:100%;background-color:#e0ffff;";
            document.getElementById("FormListDivId").style = "display:none;height:100%";

            var dbDataRows1;
            dbDataRows1 = executeQry;
            var str = '';
            var sActionVal = 'OK';
            var arrBtn = sActionVal.split(",");

            for (var j = 0; j <= dbDataRows1.length - 1; j++) {
                var obj = dbDataRows1[j];

                if (str == '')
                    str = obj["OrdNo"];
                else
                    str = str + ', ' + obj["OrdNo"];

            }

            var dt = new Date();
            console.log(dt);
            var endofMonth = new Date(dt.getFullYear(), dt.getMonth() + 1, 0);
            console.log(endofMonth);

            var last = new Date(endofMonth.getTime() - (7 * 24 * 60 * 60 * 1000));
           // var last = new Date(endofMonth.getTime() - (19 * 24 * 60 * 60 * 1000));

            if (dt <= endofMonth && dt > last) {
                if (str != '') {
                    var _obj = {};
                    _obj.Type = "ALERT";
                    // _obj.fieldName = objData.fieldName;
                    //  PerformActioninfo("Action : " + arrActionQuery[i].Action + " , ActionValue: -" + sActionVal);
                    showAlert('These orders are not confirmed yet : <br/><b>' + str + '</b>', arrBtn, _obj);
                    // isDynamicValidate = false;
                }
            }

        }
        else if (ProjectName == "FGV" && _screenName == "Web_DashBoard_01") 
        {
            var htmm = '<div style="position:relative;height:100%;width:100%;">';
            htmm += '<img src="../Images/Logo.png" style="position:absolute;top:0;bottom:0;left:0;right:0;margin:auto;opacity:0.5;width:700px;" />';
            //htmm += '<img src="../Images/FGVScreen.png" style="position:absolute;top:0;bottom:0;left:0;right:0;margin:auto;" />';
            htmm += '</div>';

            $("#FormListDivId").append(htmm)

            //document.getElementById("FormListDivId").append(htmm);
            document.getElementById("formContainer").style = "height:100%;background-color:lightyellow;";
            document.getElementById("FormListDivId").style = "display:none;height:100%";
        }
        else if (ProjectName == "EONMETALL" && _screenName == "Web_DashBoard_01") {
            var htmm = '<div style="position:relative;height:100%;width:100%;">';
            htmm += '<img src="../Images/EonMetall.png" height="250px;" style="position:absolute;top:0;bottom:0;left:0;right:0;margin:auto;opacity:0.5;" />';
            //htmm += '<img src="../Images/FGVScreen.png" style="position:absolute;top:0;bottom:0;left:0;right:0;margin:auto;" />';
            htmm += '</div>';

            $("#FormListDivId").append(htmm)

            //document.getElementById("FormListDivId").append(htmm);
            document.getElementById("formContainer").style = "height:100%;background-color:#fdf5e6;";
            document.getElementById("FormListDivId").style = "display:none;height:100%";
        }
        else if (ProjectName == "STANDARD" && _screenName == "Web_DashBoard_01") {
            var htmm = '<div style="position:relative;height:100%;width:100%;">';
            htmm += '<img src="../Images/SimplrLogo1.png" style="position:absolute;top:0;bottom:0;left:0;right:0;margin:auto;" />';
            //htmm += '<img src="../Images/FGVScreen.png" style="position:absolute;top:0;bottom:0;left:0;right:0;margin:auto;" />';
            htmm += '</div>';

            $("#FormListDivId").append(htmm)

            //document.getElementById("FormListDivId").append(htmm);
            document.getElementById("formContainer").style = "height:100%;background-color:#fdf5e6;";
            document.getElementById("FormListDivId").style = "display:none;height:100%";
        }
        else if (ProjectName == "EBFF" && _screenName == "Web_DashBoard_01") {
            var htmm = '<div style="position:relative;height:100%;width:100%;">';
            htmm += '<img src="../Images/EBFF_Logo.png" style="position:absolute;top:0;bottom:0;left:0;right:0;margin:auto;opacity:0.5;width:700px;" />';
            //htmm += '<img src="../Images/FGVScreen.png" style="position:absolute;top:0;bottom:0;left:0;right:0;margin:auto;" />';
            htmm += '</div>';

            $("#FormListDivId").append(htmm)

            //document.getElementById("FormListDivId").append(htmm);
            document.getElementById("formContainer").style = "height:100%;background-color:white;";
            document.getElementById("FormListDivId").style = "display:none;height:100%";
        }
    } catch (err1) {

    }
    /////

    var htm = '<div id="FormConfig_' + _screenName + '"></div>';
    $("#FormListDivId").append(htm);
    _divId = "FormConfig_" + _screenName;
    var pageCount = 0;

    //-----------------------------------------------
    isActionCreate = "create";
    var _action = 'create';
    if (executeData != "" && executeData != null) {
        _action = 'edit';
        isActionCreate = "edit";
    }


    
    getdocNo();

    currentScreenName = _screenName;
    CurrentScreen_TabScreen_Name = _screenName;
    if (currentScreenName == "AssetForm" || currentScreenName == "FocusSKUForm")
        _action = 'edit';

    windowPreparingToOpen(_screenName);
    //setSystemTableConfig();
    if (ProjectName == "MM") {
        sLanguage = mmLanguage;
    }

    GetFormConfig("FormConfig_" + _screenName, _screenName);
    // setTimeout(function () {
    if (executeData != "" && executeData != null && currentScreenName != "AssetForm") {

        AssignFormData(executeData, "", clickEvent);

        if (currentScreenName == "SalesOfficeStockRequestForm") {
            //Changes Made by Nisha/Vishnu on 13.12.2023
            //if (ProjectName.toString().toLowerCase() != "pvm") {
            if ((ProjectName.toString().toLowerCase() != "pvm") && (ProjectName.toString().toLowerCase() != "pvmng") && (ProjectName.toString().toLowerCase() != "ffb")) {
                $('#Button_SaveBtn').attr('disabled', 'disabled');
                $('#Button_SaveBtn').css("cursor", "not-allowed");
            }
            $('#LookUp_Name').hide();
            $('#DynamicButtonId_SalesOfficeStockRequestForm').hide();
        }
        if (currentScreenName == "CustomerProductForm") {
            $('#LookUp_CustID').hide();
        }
        $('#TransNo,#RouteNo').attr("readonly", true);

        //if (currentScreenName == "ConfirmPerfInvForm")
        //    CheckInvoicePromotion(10);
    }

    setFormConfig(sLanguage);
    //todo 07.05.2020
    //setListConfig(sLanguage);

    if (currentScreenName == "AssetForm") { //not need
        var qScrreenName = currentScreenName + '_FORM';
        var qry = getString['QueryConfig_' + qScrreenName];
        qry += ' ' + getString['QueryConfig_' + qScrreenName + '_GroupText'];
        qry += ' ' + getString['QueryConfig_' + qScrreenName + '_OrderText'];
        qry = formatQueryString(qry, qScrreenName);
        execute(qry);
        AssetFormAssignFormData(executeQry);
    }
    if (currentScreenName == "ImportDataForm") {
        $('#Template').html('<z><a href="../ImportFiles/DownloadFiles/Template.xlsx" style="color: blue" download>Template.xlsx</a></z>');
    }
    //else if (currentScreenName == "ImportMDFForm")
    //{
    //   // var result
    //    //result = "<a href='Test'>" + text + "</a>";
    //    //$('#Template').html = "<a href='Test'>" + text + "</a>";
    //    //href = window.URL.createObjectURL(file.getBlob('text/plain'));
    //    $('#Template').html('<z><a href="../ImportFiles/DownloadFiles/Template.xlsx" style="color: blue" download>Template.xlsx</a></z>');
    //}
    else if (currentScreenName == "POSDataUploadForm") {
        $('#Template').html('<z><a href="../ImportFiles/DownloadFiles/POSTemplate.xlsx" style="color: blue" download>POSTemplate.xlsx</a></z>');
    }
    if ($('#Template').html() != undefined && currentScreenName == "SerialNoUpdateNewForm") {
        $('#Template').html('<z><a href="../ImportFiles/DownloadFiles/SerialNoUpdateTemplate.xlsx" style="color: blue" download>Template.xlsx</a></z>');
    }

    if (currentScreenName.toString().toLowerCase() == "todayinvoicelist") {
        if (mapTimer != "") {
            setInterval(function () {
                //alert('calling');
                GetFormConfig("FormConfig_" + _screenName, _screenName);
                //alert('ok');
            }, mapTimer * 1000);
        }
    }


    //setInterval(function () {
    //    //alert('calling');
    //    test_session(_screenName);
    //    //alert('ok');
    //}, 1000);

    $('#FormListDivId').show();
    pageLoadingLog = "";

    try {
        //  if (ProjectName == "CPF" || ProjectName == "FGV" || ProjectName == "EBFF") {
        var _obj = {};
        _obj.fieldName = 'form';
        PerformAction('formload', _obj);
        //  }
    } catch (e) {

    }

    //alert(FirstTextBoxautofocus);
    //$("#" + FirstTextBoxautofocus).focus();

}

function PrintPickingReport(ordNo) {
    ordNo = ordNo.replace(/,/g, "','")
    window.open(url_WMSLoadPickingReport + "?strPrintPickingInvNo=" + ordNo + "&sRptName=PickingReport&type=report");
}

function NewWindowOpen(qry, screenName) {
   // debugger;
    if (setIntervaltimer != null) {
        clearInterval(setIntervaltimer);
        setIntervaltimer = null;
    }

    PageLoadinginfo("New Window open");
    setColorConfig();
    setCookie('LogInType', JSON.stringify(""));
    setCookie('LogInType', "");

    var previewsMainMenuId = getCookie('PreviewsMainMenuId')
    var previewsSubMenuId = getCookie('PreviewsSubMenuId');

    if (previewsMainMenuId != null && previewsMainMenuId != "") {
        try {
            document.getElementById(previewsMainMenuId).style.backgroundColor = "";
        }
        catch (e) {
        }
    }
    if (previewsSubMenuId != null && previewsSubMenuId != "" && document.getElementById(previewsSubMenuId) != null) {
        document.getElementById(previewsSubMenuId).style.backgroundColor = "";
    }

    var mainMenuId = getCookie('MainMenuId')
    var subMenuId = getCookie('SubMenuId');
    if (mainMenuId != null && mainMenuId != "") {
        try {
            document.getElementById(mainMenuId).style.backgroundColor = "darkblue";
        }
        catch (e) {
        }
    }
    if (subMenuId != null && subMenuId != "" && document.getElementById(subMenuId) != null) {
        document.getElementById(subMenuId).style.backgroundColor = "darkblue";
    }


    currentScreenName;
    PageLoadinginfo("Step 1");
    NewWindowClearVariableField();
    _screenName = screenName;
    setColorConfig();
    pageLoadingLog = "";

    var clickEvent = getCookie('ClickEvent');
    //var formView = getCookie('FormView')
    //formView = ReplaceStringtoSpecialCharacter(formView);
    //Params.FormView = $.parseJSON(formView);
    //LastParams.FormView = $.parseJSON(formView);
    Params.FormView = FormView;
    LastParams.FormView = FormView;

    var loadQry = '';
    //newly Commented by.M 18.01.2023 //todo
    var query = "select QueryText + ' ' + GroupText + ' ' + OrderText from Queryconfig where screenname ='" + _screenName + "_FORM'";
    PageLoadinginfo("Form query " + query);
    getExecute(query);
    var qry = executeQry;


    

    //newly added by.M 18.01.2023
    //var sScreenName = _screenName + "_FORM";
    //var query = getString['QueryConfig_' + sScreenName];
    //if (query != undefined) {
    //    query = getString['QueryConfig_' + sScreenName];
    //    query += ' ' + getString['QueryConfig_' + sScreenName + '_GroupText'];
    //    query += ' ' + getString['QueryConfig_' + sScreenName + '_OrderText'];
    //}
    //else {
    //    sScreenName = _screenName + "_Form";
    //    query = getString['QueryConfig_' + sScreenName];
    //    query += ' ' + getString['QueryConfig_' + sScreenName + '_GroupText'];
    //    query += ' ' + getString['QueryConfig_' + sScreenName + '_OrderText'];
    //}
    sScreenName = "";
    loadQry = qry;

    qry = formatQueryString(qry, sScreenName);

    try {
        if (isEditScreen == "yes") {
            LogQry = baseLogQry;
            if (executeLog == true) {



                // loadQry = loadQry.replace('', '');

                var fldsname = '';

                var fldds = loadQry.split('{');

                var arr = [];

                var inx = 0;

                for (var s = 1; s < fldds.length; s++) {
                    if (fldds[s].indexOf('}') > -1) {
                        arr[inx] = fldds[s].split('}')[0];
                        inx = inx + 1;
                    }

                }

                for (var s = 0; s < arr.length; s++) {
                    var qryy = formatQueryString('{' + arr[s] + '}', sScreenName);
                    var tmps = arr[s].split('.');
                    if (fldsname == '')
                        fldsname = tmps[tmps.length - 1];
                    else
                        fldsname = fldsname + ',' + tmps[tmps.length - 1];

                    fldsname = fldsname + ':' + qryy.replace(new RegExp("'", 'g'), "");
                }

                screeninfo = fldsname;

                //var tmpp = loadQry.split(' where ');

                //loadQry = tmpp[tmpp.length - 1];

                //try {

                //    try {
                //        loadQry = loadQry.replace(' Union ', ' union ');
                //        loadQry = loadQry.replace(' UNION ', ' union ');
                //    }
                //    catch { }

                //    if (loadQry.toLowerCase().indexOf('group by') > -1) {
                //        var test1 = loadQry.toLowerCase();
                //        var test2 = test1.split('group by');
                //        loadQry = test2[0];

                //    }

                //    if (loadQry.toLowerCase().indexOf('order by') > -1) {
                //        //  loadQry = loadQry.toLowerCase().split('order by')[0];
                //        var test1 = loadQry.toLowerCase();
                //        var test2 = test1.split('order by');
                //        loadQry = test2[0];
                //    }



                //    if (loadQry.toLowerCase().indexOf('union') > -1) {
                //        var test1 = loadQry.toLowerCase();
                //        var test2 = test1.split(' union ');
                //        loadQry = test2[0];
                //        // loadQry = loadQry.toLowerCase().split(' union ')[0];
                //    }

                //    if (loadQry.toLowerCase().indexOf(')') > -1) {
                //        var test1 = loadQry.toLowerCase();
                //        var test2 = test1.split(')');
                //        loadQry = test2[0];
                //        // loadQry = loadQry.toLowerCase().split(' union ')[0];
                //    }

                //    loadQry = loadQry.replace(new RegExp("'", 'g'), "");

                //} catch (e) {

                //}

                //var flds = loadQry.split(' and ');




                //for (var z = 0; z < flds.length; z++) {
                //    if (screeninfo == '') {
                //        screeninfo = screeninfo + flds[z].split('=')[0] + ':';
                //        screeninfo = screeninfo + flds[z].split('=')[1].replace(new RegExp("'", 'g'), "");
                //    }
                //    else {
                //        screeninfo = screeninfo + " , " + flds[z].split('=')[0] + ':';
                //        screeninfo = screeninfo + flds[z].split('=')[1].replace(new RegExp("'", 'g'), "");
                //    }
                //}

                // webAuditLog('Load', _screenName, screeninfo);

            }
        }
    }
    catch { }

    PageLoadinginfo("formatQueryString query done ");
    execute(qry);
    var executeData = executeQry;
    ///

    _rowItemData = quoteReplace(_rowItemData);
    $("#FormListDivId").empty();

    if (ProjectName == "EBFF" && _screenName == "Web_Dashboard") {
        var htmm = '<div style="position:relative;height:100%;width:100%;">';
        htmm += '<img src="../Images/EBFF_Logo.png" style="position:absolute;top:0;bottom:0;left:0;right:0;margin:auto;opacity:0.5;width:700px;" />';
        //htmm += '<img src="../Images/FGVScreen.png" style="position:absolute;top:0;bottom:0;left:0;right:0;margin:auto;" />';
        htmm += '</div>';

        $("#FormListDivId").append(htmm)

        //document.getElementById("FormListDivId").append(htmm);
        document.getElementById("formContainer").style = "height:100%;background-color:white;";
        document.getElementById("FormListDivId").style = "display:none;height:100%";
    }

    var htm = '<div id="FormConfig_' + _screenName + '"></div>';
    $("#FormListDivId").append(htm);
    var _divId = "FormConfig_" + _screenName;
    var pageCount = 0;

    var _action = 'create';
    isActionCreate = "create";
    if (executeData != "" && executeData != null) {
        _action = 'edit';
        isActionCreate = "edit";
    }


   
    agentID = _UserID;
    FormView.UserID = _UserID;
    FormView.LastLogin = _LastLogin;
    FormView.URL = _URL;
    FormView.PlanoGramURL = _PlanoGramURL;
    dataFieldIdList.UserID = _UserID;
    getdocNo();
    currentScreenName = _screenName;
    CurrentScreen_TabScreen_Name = _screenName;
    if (currentScreenName == "AssetForm" || currentScreenName == "FocusSKUForm")
        _action = 'edit';

    windowPreparingToOpen(_screenName);
    //todo1
    //setSystemTableConfig();
    if (ProjectName == "MM") {
        sLanguage = mmLanguage;
    }
    PageLoadinginfo("Form Open ");
    GetFormConfig("FormConfig_" + _screenName, _screenName);

    try {
        if (currentScreenName == "ChangePasswordForm") {

            if (RandomPwd != '') {
                document.getElementById('OldPassword').value = RandomPwd;
                document.getElementById('lbl_OldPassword').innerText = 'Current Password';
                //document.getElementById('OldPassword')
                try {
                    $("#OldPassword").prop('disabled', true);

                    //$("#" + obj["FieldName"]).attr('placeholder', '');
                } catch (e) {

                }

                //  document.getElementsByClassName(obj["FieldName"])[0].style.cursor = 'not-allowed';
                try {
                    document.getElementById('OldPassword').readOnly = true;
                    $("#OldPassword").prop('readonly', true);
                }
                catch (hdn) { }

                document.getElementById('OldPassword').style.cursor = 'not-allowed';
            }
        }
    }
    catch { }

    if (executeData != "" && executeData != null && currentScreenName != "AssetForm") {
        AssignFormData(executeData);
        if (currentScreenName == "SalesOfficeStockRequestForm") {
            //Changes Made by Nisha/Vishnu on 13.12.2023
            //if (ProjectName.toString().toLowerCase() != "pvm") {
            if ((ProjectName.toString().toLowerCase() != "pvm") && (ProjectName.toString().toLowerCase() != "pvmng") && (ProjectName.toString().toLowerCase() != "ffb")) {
                $('#Button_SaveBtn').attr('disabled', 'disabled');
                $('#Button_SaveBtn').css("cursor", "not-allowed");
            }
            $('#LookUp_Name').hide();
            $('#DynamicButtonId_SalesOfficeStockRequestForm').hide();
        }
        if (currentScreenName == "CustomerProductForm") {
            $('#LookUp_CustID').hide();
        }
        $('#TransNo,#RouteNo').attr("readonly", true);
    }

    setFormConfig(sLanguage);
    // setListConfig(sLanguage);

    if (currentScreenName == "AssetForm") {
        var qScrreenName = currentScreenName + '_FORM';
        var qry = getString['QueryConfig_' + qScrreenName];
        qry += ' ' + getString['QueryConfig_' + qScrreenName + '_GroupText'];
        qry += ' ' + getString['QueryConfig_' + qScrreenName + '_OrderText'];
        qry = formatQueryString(qry, qScrreenName);
        execute(qry);
        AssetFormAssignFormData(executeQry);
    }
    if (currentScreenName == "ImportDataForm")
        $('#Template').html('<z><a href="../ImportFiles/DownloadFiles/Template.xlsx" style="color: blue" download>Template.xlsx</a></z>');
        //$('#Template').html('<z><a href="../ImportFiles/DownloadFiles/Template.xlsm" style="color: blue" download>Template.xlsm</a></z>');
    else if (currentScreenName == "ImportMDFForm") {
        $('#Template').html('<z><a href="../ImportFiles/CSV/MDF.csv" style="display:none" style="color: blue" download>MDF.csv</a></z>');
    }
    else if (currentScreenName == "POSDataUploadForm") {
        $('#Template').html('<z><a href="../ImportFiles/DownloadFiles/POSTemplate.xlsx" style="color: blue" download>POSTemplate.xlsx</a></z>');
    }
    if ($('#Template').html() != undefined && currentScreenName == "SerialNoUpdateNewForm") {
        $('#Template').html('<z><a href="../ImportFiles/DownloadFiles/SerialNoUpdateTemplate.xlsx" style="color: blue" download>Template.xlsx</a></z>');
    }
    if (currentScreenName.toString().toLowerCase() == "todayinvoicelist") {
        if (mapTimer != "") {
            setInterval(function () {
                //alert('calling');
                GetFormConfig("FormConfig_" + _screenName, _screenName);
                //alert('ok');
            }, mapTimer * 1000);
        }
    }
    $('#FormListDivId').show();
    PageLoadinginfo("Page Load end");
    //info(pageLoadingLog, "PageLoadinginfo");
    pageLoadingLog = "";

    SaveWebtoolAuditlog(screenName);

   
}

function SaveWebtoolAuditlog(screenName) {
    $.ajax({
        type: 'POST',
        url: url_SaveWebtoolAuditlog,
        data: { screenName: screenName },
        dataType: 'json',
        async: true,
        success: function (data) {

        }
    });

}
function delay() {
    // `delay` returns a promise
    return new Promise(function (resolve, reject) {
        // Only `delay` is able to resolve or reject the promise
        setTimeout(function () {
            resolve(42); // After 3 seconds, resolve the promise with value 42
        }, 3000);
    });
}

function NewWindowClearVariableField() {
    formFieldIdList = {};
    searchOptionArray = [];
    sortOptionArray = [];
    objSearch = {};

    dataFieldIdList = {};
    formFieldIdList = {};

    formdata = {};
    formItems = [];
    arrfrm = [];
    _objArray = {};
    fieldNames = []; formFieldNames = []; formDataMember = [];

    //01.06.2023
    dynamicFieldName = ""; _listLookUpttbody = "";
    isMultiSelect = false;
    LookUpMultiSelected = [];

    isDynamicValidate = true;
    ispopupContainerThirdLevel = false;
    $('.ui-dialog-titlebar-close').show();
}

$(document).ready(function () {

       //$('.timepicker').timepicki();
    $('.monthyearpicker').Monthpicker();
    //$(".datepicker").datepicker({
    //    //timeFormat:  "hh:mm:ss",
    //    dateFormat: "mm/dd/yy",
    //    // dateFormat: "h:mm",
    //    changeMonth: true,
    //    changeYear: true,
    //    yearRange: "-60:+60",
    //    setDate: new Date()
    //});
    $(".datepickerList").datepicker({
        //timeFormat:  "hh:mm:ss",
        dateFormat: "mm/dd/yy",
        // dateFormat: "h:mm",
        changeMonth: true,
        changeYear: true,
        yearRange: "-60:+60",
        setDate: new Date()
               
    });

    //$(".datepickerList").datepicker({
    //    onSelect: function (dateText, inst) {
    //        alert(dateText);
    //    }
    //});

    //$(".datepickerList").datepicker('option', 'onSelect', function () {
    //    alert("OK");//alert(dateText);
    //});

    $(".searchdatepicker").datepicker({
        //timeFormat:  "hh:mm:ss",
        dateFormat: "mm/dd/yy",
        // dateFormat: "h:mm",
        changeMonth: true,
        changeYear: true,
        yearRange: "-60:+60",
        setDate: new Date()
    });

});


$(function () {
    $('#dialog').dialog({
        autoOpen: false,
        width: "50%",
        resizable: false,
        title: 'Details',
        modal: true,
        closeOnEscape: true,
        open: function (event, ui) {
        },
        beforeClose: function (event, ui) {
            $('#dialogHiddenId').show();
        },
        buttons: {
            "Close": function () {
                $('#dialog').dialog('close');
            }
        }
    });
});

$('#messageDialog').dialog({
    autoOpen: false,
    width: "30%",
    resizable: false,
    title: 'Message',
    modal: true,
    //closeOnEscape: true,
    open: function (event, ui) {
    },
    buttons: {
        "Ok": function () {
            $(this).dialog('close');
        }
    }
});
$('#imgLoadingdialog').dialog({
    autoOpen: false,
    width: "30%",
    resizable: false,
    title: 'Message',
    modal: true,
    //closeOnEscape: true,
    open: function (event, ui) {
    },
});


function ExecuteQryConfig_Mobile(passed_screenname) {

    windowPreparingToOpen("Main");
    var qry = "select FunctionName from Gridfunctions where FunctionText='" + passed_screenname +
                "'  and Access ='" + AccessLevel +
                "' and solutionName='" + SolutionName + "'  Order by ColNo"
    execute(qry);
    // PageLoadinginfo("Sub menu  Query execute End");
    var funcName = executeQry;
    //alert(funcName[0].FunctionName);
    var _obj = {};
    _obj.screenName = "Main";
    _obj.fieldName = funcName[0].FunctionName;
    PerformAction('menuItemClicked', _obj);
}

function Export() {
    $("#table").table2excel({
        filename: "file.xls"
    });
}

//SEJAdjustItem();
function SEJAdjustItem() {
    $.ajax({
        type: 'POST',
        url: url_SEJAdjustItem,
        dataType: 'json',
        async: false,
        success: function (data) {

            
            var p1 = data.split('@')[0];
            var p2 = data.split('@')[1];
            var p3 = data.split('@')[2];
           // alert(p1);
          //  alert(p2);

            var btns = {};
            btns["Ok"] = function (e) {
                $(this).dialog("close");
            }
           // result = result + '.xlsx';
            $('<div></div>').appendTo('body')
                .html('<div>' + p1 + '<br><h6><a href="' + p2 + '"    style="color: blue;" download  >' + p3 + '</a></h6></div>').dialog({
                    modal: true, title: "Export file(s) Generated", zIndex: 10000, autoOpen: true,
                    width: '35%', resizable: false,
                    buttons: btns
                });

            //obj = {};
            //obj.title = "Message!";
            //obj.message = data;
            //showAlertMessage(obj);
        }
    });
}

//CallAPIMethod();
function CallAPIMethod() {
    $.ajax({
        //url: 'http://localhost:1030/api/PayloadNotification/TestN',
        url: 'http://localhost:1030/api/Test',
        data: { "id": 1 },
        //type: 'GET',
        dataType: 'text',
        //contentType: 'application/json; charset=utf-8',
        // data: person,
        success: function (data) {
            alert(data);
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log('Error in Operation');
        }
    });
}

function webAuditLog(TransType,ScreenName, ScreenInfo)
{
    try {
        
            if (LogQry.indexOf('Log.TransDate') > -1)
            LogQry = LogQry.replace('{Log.TransDate}', "convert(date,getdate())");
       // LogQry = LogQry.replace('{Log.TransDate}', "convert(date,'" + new Date().toJSON().slice(0, 10).replace(/-/g, '/') + "')");

            //var currentdate = new Date();
            //var datetime1 = currentdate.getFullYear() + "/"
            //    + (currentdate.getMonth() + 1) + "/"
            //    + currentdate.getDate() + " "
            //    + currentdate.getHours() + ":"
            //    + currentdate.getMinutes() + ":"
            //    + currentdate.getSeconds();

        if (LogQry.indexOf('Log.DTG') > -1)
            LogQry = LogQry.replace('{Log.DTG}', "getdate()"); //"convert(Datetime,'" + datetime1 + "')");

            if (LogQry.indexOf('Log.UserID') > -1)
                LogQry = LogQry.replace('{Log.UserID}', "'" + _UserID + "'");

            if (LogQry.indexOf('Log.TransType') > -1)
                LogQry = LogQry.replace('{Log.TransType}', "'" + TransType + "'");

            if (LogQry.indexOf('Log.ScreenName') > -1)
                LogQry = LogQry.replace('{Log.ScreenName}', "'" + ScreenName + "'");

            if (LogQry.indexOf('Log.ScreenInfo') > -1)
                LogQry = LogQry.replace('{Log.ScreenInfo}', "'" + ScreenInfo + "'");

            if (LogQry.indexOf('Log.Remarks') > -1)
                LogQry = LogQry.replace('{Log.Remarks}', "''");

            execute(LogQry);
        screeninfo = '';
    }
    catch {

    }
}


