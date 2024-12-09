
// COMMENTED 29.12.2020 THIRD LEVEL FORM ================================================
var ThirdLevel_Popup_ScrName = "";
var isForthLevel = false;
var previousScreenName = "";
var previousFieldName = "";
var previousttbody = "";
var previousLookUpIndex = "";
var pre_previousScreenName = "";

function ExecuteQryConfig_PopupContainder(popup_scrName) {
    isForthLevel = false;
    isThirdLevelpopupclose = false;
    //debugger;
    //if (popup_scrName.toString().toLowerCase() == "customerroutingctrform" || popup_scrName.toString().toLowerCase() == "packingstationform" || popup_scrName.toString().toLowerCase() == "prepackingstationform" || popup_scrName.toString().toLowerCase() == "inventoryheatpopform" || popup_scrName.toString().toLowerCase() == "secondarydisplayapprovalform" ||
    //    popup_scrName.toString().toLowerCase() == "picturereportform" || popup_scrName.toString().toLowerCase() == "picturereportimage" || popup_scrName.toString().toLowerCase() == "distributorclaimform" ||
    //    popup_scrName.toString().toLowerCase() == "pickingassignform" || popup_scrName.toString().toLowerCase() == "itempromotiondetailform"
    //    || popup_scrName.toString().toLowerCase() == "invoicepromotiondetailform" || popup_scrName.toString().toLowerCase() == "salesorderresform"
    //    || popup_scrName.toString().toLowerCase() == "itempromotiondetailform" || popup_scrName.toString().toLowerCase() == "creditnoteresform"
    //    || popup_scrName.toString().toLowerCase() == "sotopoeditform" || popup_scrName.toString().toLowerCase() == "printperformainvoicelisteditform") {

    //    ThirdLevel_Popup_Calling(popup_scrName);
    //    ThirdLevel_Popup_ScrName = popup_scrName;
    //}
    //else
    if (popup_scrName.toString().toLowerCase() == "customerroutingctranalysisform" || popup_scrName.toString().toLowerCase() == "inventoryheatpopdevform") {
        //ThirdLevel_Popup_Close_Functionality();
        isForthLevel = true;
        ThirdLevel_popupdialog_RemoveId(popup_scrName);
        FourthLevel_Popup_Calling(popup_scrName);
        ThirdLevel_popupdialog_Container_Close(popup_scrName);

        // TESTING PURPOSE
        //FourthLevel_Popup_Calling("CustomerRoutingMapPickerForm");
    }
    else {
        pre_previousScreenName = CurrentScreen_TabScreen_Name;
        ThirdLevel_Popup_Calling(popup_scrName);
        ThirdLevel_Popup_ScrName = popup_scrName;
    }
}

function ThirdLevel_popupdialog_Container_Close(popup_scrName) {
    if (popup_scrName.toLowerCase() == "inventoryheatpopdevform") {
        $('#popupdialog_Container_ThirdLevel').dialog("close");
        $("#popupdialog_Container_ThirdLevel").remove();
        //$("#popupdialog_Container_ThirdLevel").empty();
    }
}

function ThirdLevel_popupdialog_RemoveId(popup_scrName) {
    if (popup_scrName.toLowerCase() == "inventoryheatpopdevform") {
        $("#DSerialNo").remove();
    }
}





function ThirdLevel_Popup_Calling(popup_scrName) {
    // COMMENTED 08.02.2021 ================================================
    //var formView = getCookie('FormView');
    //formView = ReplaceStringtoSpecialCharacter(formView);
    //Params.FormView = $.parseJSON(formView);
    //LastParams.FormView = $.parseJSON(formView);

    //// THIRD LEVEL PAGE =======
    //_previousScreenName = _currentScreenName;
    //_currentScreenName = popup_scrName;
    //// THIRD LEVEL PAGE =======
    // COMMENTED 08.02.2021 ================================================

    // COMMENTED 04.02.2021 CUSTOMER ROUTING PURPOSE
    subCurrentScreenName = popup_scrName;
    Params.FormView = FormView;
    Params.POPUPFormView = FormView;
    previousFieldName = FieldName;
    previousttbody = _listLookUpttbody == "" ? _ttbody : _listLookUpttbody;
    previousLookUpIndex = _listLookUpIndex;

    // debugger;
    var query = "select QueryText + ' ' + GroupText + ' ' + OrderText from Queryconfig where screenname ='" + popup_scrName + "_FORM'";

    getExecute(query);

    var qry = executeQry;
    var sScreenName = "";

    qry = formatQueryString(qry, sScreenName);
    execute(qry);

    var executeData = executeQry;
    $("#popupdialog_Container_ThirdLevel").empty();
    //<div id="popupdialog_Container"></div>
    var htm = '<div id="FormConfig_' + popup_scrName + '"></div>';
    //<div id="popupdialog_Container" title=""></div>

    
        if ($('#popupdialog_Container_ThirdLevel').val() == undefined) {
            $("#FormConfig_" + previousScreenName).append('<div id="popupdialog_Container_ThirdLevel" class="class_popupdialog_Container_ThirdLevel"></div>');
        }
    

    
    $("#popupdialog_Container_ThirdLevel").append(htm);
    //_divId = "FormConfig_" + _screenName;
    var pageCount = 0;

    //-----------------------------------------------
    var _action = 'create';
    isActionCreate = "create";
    if (executeData != "" && executeData != null) {
        _action = 'edit';
        isActionCreate = "edit";
    }

    getdocNo();

    //currentScreenName = _screenName;
    //CurrentScreen_TabScreen_Name = _screenName;
    currentScreenName = popup_scrName;
    CurrentScreen_TabScreen_Name = popup_scrName;

    if (currentScreenName == "AssetForm" || currentScreenName == "FocusSKUForm")
        _action = 'edit';

    windowPreparingToOpen(popup_scrName);
    PageLoadinginfo("setSystemTableConfig()  start :");
    setSystemTableConfig();
    if (ProjectName == "MM") {
        sLanguage = mmLanguage;
    }

    //GetFormConfig("FormConfig_" + _screenName, _screenName);
    GetFormConfig("FormConfig_" + popup_scrName, popup_scrName);

    if (executeData != "" && executeData != null && currentScreenName != "AssetForm") {
        AssignFormData(executeData, popup_scrName);

        $('#TransNo,#RouteNo').attr("readonly", true);
    }

    setFormConfig(sLanguage);

    if (isPOPUPIMAGECONTAINER == true)
        PopUpOpen_Image_ThirdLevel();
    else
        PopUpOpen_ThirdLevel();
    return false;

}

var isThirdLevelpopupclose = false;

function PopUpOpen_ThirdLevel() {
        // $('#popupdialog_Container_ThirdLevel').dialog("close");
    if (currentScreenName == "InvoiceListAssignForm") {
        $('#popupdialog_Container_ThirdLevel').dialog({
            //$('.class_popupdialog_Container_ThirdLevel').dialog({
            //width: "100%",
           // autoOpen: false,
           
            width: '40%',
           
            position: { my: "center center", at: "center center", of: window },
            modal: true,
            title: "",
            closeOnEscape: false,
            buttons: {
                Close: function () {
                    $(this).dialog("close");
                    PopupContainderClose();
                }
            },
            close: function (e) {
                e.preventDefault();
                if (isThirdLevelpopupclose == false) {
                    PopupContainderClose();
                    //windowPreparingToOpen(previousScreenName);//"PickingInvoiceForm");
                    ////setSystemTableConfig();
                    //isThirdLevelpopupclose = true;
                    //previousScreenName = "";
                }


                //ThirdLevel_Popup_Close_Functionality();
                //// $("#popupdialog_Container_ThirdLevel").remove();
                //if (isForthLevel == false) {
                //    $('#popupdialog_Container_ThirdLevel').dialog("close");
                //    $("#popupdialog_Container_ThirdLevel").remove();
                //}
                if (isForthLevel == false) {
                    $(this).dialog("close");
                }

            },
            beforeClose: function (e, a, b) {
                if (e.cancelable == true)
                    uiIconCloseThick();

            }
        });

        $('.ui-dialog-titlebar-close').hide();
        //$(".ui-dialog").style.height = "200px";
       // $('.ui-dialog').style.height = "200px";
      //document.getElementsByClassName('ui-dialog').style.height = "200px";
    }
    else if (currentScreenName == "CustomerRoutingCTRForm") {
        $('#popupdialog_Container_ThirdLevel').dialog({
            //$('.class_popupdialog_Container_ThirdLevel').dialog({
            //width: "100%",

            width: "65%",
            position: { my: "center center", at: "center center", of: window },
            modal: true,
            title: "",
            closeOnEscape: false

        });
    }
    else {
        $('#popupdialog_Container_ThirdLevel').dialog({
            //$('.class_popupdialog_Container_ThirdLevel').dialog({
            //width: "100%",

            width: "65%",
            position: { my: "center center", at: "center center", of: window },
            modal: true,
            title: "",
            closeOnEscape: false,
            buttons: {
                Close: function () {
                    //$(this).dialog("close");
                    PopupContainderClose();
                }
            },
            close: function (e) {
                e.preventDefault();
                if (isThirdLevelpopupclose == false) {
                    PopupContainderClose();
                    //windowPreparingToOpen(previousScreenName);//"PickingInvoiceForm");
                    ////setSystemTableConfig();
                    //isThirdLevelpopupclose = true;
                    //previousScreenName = "";
                }


                //ThirdLevel_Popup_Close_Functionality();
                //// $("#popupdialog_Container_ThirdLevel").remove();
                //if (isForthLevel == false) {
                //    $('#popupdialog_Container_ThirdLevel').dialog("close");
                //    $("#popupdialog_Container_ThirdLevel").remove();
                //}
                if (isForthLevel == false) {
                    $(this).dialog("close");
                }

            },
            beforeClose: function (e, a, b) {
                if (e.cancelable == true)
                    uiIconCloseThick();

            }
        });

       // $('.ui-dialog-titlebar-close').hide();
    }
    
   //$('#popupdialog_Container_ThirdLevel').dialog("option", "maxHeight", 100);
}

function PopupContainderClose() {
    if (ThirdLevel_Popup_ScrName != "") {
        $("#popupdialog_Container_ThirdLevel").remove();
        $('#popupdialog_Container_ThirdLevel').dialog("close");
        ThirdLevel_Popup_ScrName = "";


        if (ProjectName == "JSU" && previousScreenName == "AddPaymentForm" && (currentScreenName == "PaymentsCashForm" || currentScreenName == "PaymentsCreditForm" || currentScreenName == "PaymentsPDCForm" || currentScreenName == "PaymentsChequeForm" || currentScreenName == "PaymentsOnlinePaymentForm"))
            windowPreparingToOpen("PaymentsNewForm");
        else
            windowPreparingToOpen(pre_previousScreenName);

        CurrentScreen_TabScreen_Name = pre_previousScreenName;

        currentScreenName = previousScreenName;

        isThirdLevelpopupclose = true;
        previousScreenName = "";
        _listLookUpttbody = "";
        FormView = Params.POPUPFormView;
        FieldName = previousFieldName;
        _listLookUpttbody = previousttbody;
        _listLookUpIndex = previousLookUpIndex;

        previousttbody = "";
        previousFieldName = "";
        previousLookUpIndex = "";
    }
}



function PopupContainderClose1() {
    if (ThirdLevel_Popup_ScrName != "") {
        $("#popupdialog_Container_ThirdLevel").remove();
        $('#popupdialog_Container_ThirdLevel').dialog("close");
        isThirdLevelpopupclose = true;
        ////$('.class_popupdialog_Container_ThirdLevel').remove();
        //$('.class_popupdialog_Container_ThirdLevel').dialog("close");
        ////$('#popupdialog_Container_ThirdLevel').closest('.ui-dialog-content').dialog('close');
        //$(".ui-dialog-content").dialog().dialog("close");
        ////$(".ui-dialog-content").dialog().dialog("open");

        //$(".ui-dialog").dialog().dialog("close");


        //ui-dialog ui-widget ui-widget-content ui-corner-all ui-draggable
        //$("#popupdialog_Container_ThirdLevel").remove();
        ThirdLevel_Popup_ScrName = "";
    }
}


function FourthLevel_PopupContainderClose() {
    windowPreparingToOpen(previousScreenName);
    CurrentScreen_TabScreen_Name = previousScreenName;
}

function PopUpOpen_Image_ThirdLevel() {
    //alert($(window).height() +" : "+$(document).height());

    // $('#popupdialog_Container_ThirdLevel').dialog("close");
    $('#popupdialog_Container_ThirdLevel').dialog({
        //$('.class_popupdialog_Container_ThirdLevel').dialog({
        //width: "100%",
        width: "70%",
        height: $(window).height(),

        modal: true,
        title: "",
        closeOnEscape: false,
        //buttons: {
        //    Close: function () {
        //        isPOPUPIMAGECONTAINER = false;
        //        $(this).dialog("close");
        //    }
        //},
        close: function (e) {
            isPOPUPIMAGECONTAINER = false;
            //newly added by.M 01.03.2023
            e.preventDefault();
            if (isThirdLevelpopupclose == false) {
                currentScreenName = previousScreenName;
                CurrentScreen_TabScreen_Name = previousScreenName;
                windowPreparingToOpen(previousScreenName);
                isThirdLevelpopupclose = true;
                previousScreenName = "";
            }

            //ThirdLevel_Popup_Close_Functionality();
            //// $("#popupdialog_Container_ThirdLevel").remove();
            //if (isForthLevel == false) {
            //    $('#popupdialog_Container_ThirdLevel').dialog("close");
            //    $("#popupdialog_Container_ThirdLevel").remove();
            //}
        },
        beforeClose: function (e, a, b) {
            if (e.cancelable == true)
                uiIconCloseThick();
        }
    });
}





function ThirdLevel_Popup_Close_Functionality() {
    //alert('close ok');
    // HERE WE HAVE FUNCTIONALITY FOR CLOSE POPUP  =======================================

    // COMMENTED 08.02.2021 ================================================
    //FormView = Params.FormView;
    //Params.FormView = LastParams.FormView;
    // COMMENTED 08.02.2021 ================================================

    // HERE WE HAVE TO MAKE REFRESH THE PAGE.===================
    // 2nd LEVEL PAGE
    //windowPreparingToOpen(_screenName);

    ExecuteQryConfig_Refresh(_screenName);

    // HERE WE HAVE TO MAKE REFRESH THE PAGE.===================

    // COMMENTED 04.02.2021 CUSTOMER ROUTING PURPOSE
    subCurrentScreenName = '';

    // HERE WE HAVE FUNCTIONALITY FOR CLOSE POPUP  =======================================
}




function ExecuteQryConfig_Refresh(_screenName) {
    var formView = getCookie('FormView');
    PageLoadinginfo("ReplaceStringtoSpecialCharacter(formView)");
    formView = ReplaceStringtoSpecialCharacter(formView);
    Params.FormView = $.parseJSON(formView);
    LastParams.FormView = $.parseJSON(formView);

    // debugger;
    var query = "select QueryText + ' ' + GroupText + ' ' + OrderText from Queryconfig where screenname ='" + _screenName + "_FORM'";

    getExecute(query);

    var qry = executeQry;
    var sScreenName = "";

    qry = formatQueryString(qry, sScreenName);
    execute(qry);

    var executeData = executeQry;

    ///

    var htm = '<div id="FormConfig_' + _screenName + '"></div>';
    $("#FormListDivId").append(htm);
    _divId = "FormConfig_" + _screenName;
    var pageCount = 0;

    //-----------------------------------------------
    var _action = 'create';
    if (executeData != "" && executeData != null) {
        _action = 'edit';
    }

    getdocNo();

    currentScreenName = _screenName;
    CurrentScreen_TabScreen_Name = _screenName;
    if (currentScreenName == "AssetForm" || currentScreenName == "FocusSKUForm")
        _action = 'edit';

    windowPreparingToOpen(_screenName);
    setSystemTableConfig();
    if (ProjectName == "MM") {
        sLanguage = mmLanguage;
    }

    GetFormConfig("FormConfig_" + _screenName, _screenName);

    if (executeData != "" && executeData != null && currentScreenName != "AssetForm") {
        AssignFormData(executeData);
        $('#TransNo,#RouteNo').attr("readonly", true);
    }

    setFormConfig(sLanguage);


    $('#FormListDivId').show();

}


function FourthLevel_Popup_Calling(popup_scrName) {
    // COMMENTED 08.02.2021 ================================================
    //var formView = getCookie('FormView');
    //formView = ReplaceStringtoSpecialCharacter(formView);
    //Params.FormView = $.parseJSON(formView);
    //LastParams.FormView = $.parseJSON(formView);

    //// THIRD LEVEL PAGE =======
    //_previousScreenName = _currentScreenName;
    //_currentScreenName = popup_scrName;
    //// THIRD LEVEL PAGE =======
    // COMMENTED 08.02.2021 ================================================


    // COMMENTED 04.02.2021 CUSTOMER ROUTING PURPOSE
    subCurrentScreenName = popup_scrName;

    // debugger;
    var query = "select QueryText + ' ' + GroupText + ' ' + OrderText from Queryconfig where screenname ='" + popup_scrName + "_FORM'";

    getExecute(query);

    var qry = executeQry;
    var sScreenName = "";

    qry = formatQueryString(qry, sScreenName);
    execute(qry);

    var executeData = executeQry;
    //<div id="popupdialog_Container"></div>
    var htm = '<div id="FormConfig_' + popup_scrName + '"></div>';
    //<div id="popupdialog_Container" title=""></div>
    $("#popupdialog_Container_FourthLevel").append(htm);
    //_divId = "FormConfig_" + _screenName;
    var pageCount = 0;

    //-----------------------------------------------
    var _action = 'create';
    if (executeData != "" && executeData != null) {
        _action = 'edit';
    }

    getdocNo();

    //currentScreenName = _screenName;
    //CurrentScreen_TabScreen_Name = _screenName;
    currentScreenName = popup_scrName;
    CurrentScreen_TabScreen_Name = popup_scrName;

    if (currentScreenName == "AssetForm" || currentScreenName == "FocusSKUForm")
        _action = 'edit';

    windowPreparingToOpen(popup_scrName);
    PageLoadinginfo("setSystemTableConfig()  start :");
    setSystemTableConfig();
    if (ProjectName == "MM") {
        sLanguage = mmLanguage;
    }

    //GetFormConfig("FormConfig_" + _screenName, _screenName);
    GetFormConfig("FormConfig_" + popup_scrName, popup_scrName);

    if (executeData != "" && executeData != null && currentScreenName != "AssetForm") {
        AssignFormData(executeData, popup_scrName);

        $('#TransNo,#RouteNo').attr("readonly", true);
    }

    setFormConfig(sLanguage);

    PopUpOpen_FourthLevel();
    return false;

}




function PopUpOpen_FourthLevel() {

    $('#popupdialog_Container_FourthLevel').dialog({
        width: "98%",
        modal: true,
        title: "",
        closeOnEscape: false,
        buttons: {
            Close: function () {
                FourthLevel_PopupContainderClose();
                $(this).dialog("close");
            }
        },
        close: function () {
            // ExecuteQryConfig_PopupContainder(ThirdLevel_Popup_ScrName);

            //FourthLevel_Popup_Close_Functionality();
            //$('#popupdialog_Container_ThirdLevel').dialog("close");
            //$("#popupdialog_Container_ThirdLevel").remove();
            //$("#popupdialog_Container_ThirdLevel").empty();
            //$("#popupdialog_Container_FourthLevel").empty();

            // $("#DSerialNo").remove();

            //$('#popupdialog_Container_FourthLevel').dialog("close");
            //$("#popupdialog_Container_FourthLevel").remove();

            //if (popup_scrName.toString().toLowerCase() == "inventoryheatpopdevform") {
            //_screenName = ThirdLevel_Popup_ScrName;
            //ThirdLevel_Popup_Close_Functionality();
            // _screenName = ThirdLevel_Popup_ScrName;
            //   ExecuteQryConfig_PopupContainder(ThirdLevel_Popup_ScrName);
            // }
        },
        beforeClose: function (e, a, b) {
            if (e.cancelable == true)
                uiIconCloseThick();
        }
    });

    $('.ui-dialog-titlebar-close').hide();
}

function FourthLevel_Popup_Close_Functionality() {


    // HERE WE HAVE TO MAKE REFRESH THE PAGE.===================
    windowPreparingToOpen("CustomerRoutingCTRForm");
    // HERE WE HAVE TO MAKE REFRESH THE PAGE.===================

    // COMMENTED 04.02.2021 CUSTOMER ROUTING PURPOSE
    subCurrentScreenName = '';

    // HERE WE HAVE FUNCTIONALITY FOR CLOSE POPUP  =======================================
}

// COMMENTED 29.12.2020 THIRD LEVEL FORM  ================================================
