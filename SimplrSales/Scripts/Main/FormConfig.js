
function targetFunction() {
}

var FirstTextBoxautofocus = "";
var lastDate = "";
var swap_ttbody = "";
var routemap_query = "";
var isEditScreen = "no";
var chkRowIndex = 0;
var baseLogQry = '';
var colorLegend;
var isColorLegend;
var itemsss;
var multiLookup_tblBody;
var isAutoSelect;
var autoID;

var roFields = [];
var indx = 0;

var mapTimer = "";
var MapMarkerIdList = [];
var DropDownIdList = [];
var AutoCompleteList = [];
//var AutoCompleteWithText = [];
var AutoCompleteWithTextList = [];
var autoCompletedata = {};
var DateTimeIdList = [];
var DateTimeCheckId = [];
var tableList = [];
var radioValue = "";
var nextFocus = "";
var flg = false;
var ev = "no";
var runData = "";
var shiptocountryData = "";
var alertMsg = '';
// COMMENTED 01.04.2021
var tableList_Filled = [];
var listView_WithinTab = false;

var RadioButtonIdList = [];
var FormListViewList = [];
var FormListViewFieldName = [];
var FormListViewTabGroupName = [];
var TabGroupList = [];
var FieldIdList = [];
var DynamcFieldIdList = [];
var ReadOnlyFieldList = [];
var DataMemberType = [];
var IsMandatoryList = [];
var FieldNameFormArrayList = [];
var TabGroupIdList = [];

var TabScreenName = '';
var CurrentScreen_TabScreen_Name = '';

// COMMENTED 04.02.2021 CUSTOMER ROUTING PURPOSE
var subCurrentScreenName = '';

var DynamicScreenName = '';
var isFormListView = false;
var isMultiSelect = false;
var isMultiClose = false;
var DiscountGroup = 0;
var isModuleSettings = false;
var _lookUphtm = '';
var AUTOLISTSELECT = "";
var ispopupContainerThirdLevel = false;

// COMMENTED 26.03.2021 ==================================
var salesOrderListView = null;
// COMMENTED 26.03.2021 ==================================


// THIRD LEVEL PAGE ======= 07.01.2021
var _previousScreenName = '';
var _currentScreenName = '';
var Screen_NewText;
// THIRD LEVEL PAGE ======= 07.01.2021


function ClearFormConfigArrayList() {
    tableList = [];
    // COMMENTED 01.04.2021
    tableList_Filled = [];
    listView_WithinTab = false;
    MapMarkerIdList = [];
    DropDownIdList = [];
    TabGroupIdList = [];
    RadioButtonIdList = [];
    TabGroupList = [];
    FieldIdList = [];
    DynamcFieldIdList = [];
    ReadOnlyFieldList = [];
    DataMemberType = [];
    IsMandatoryList = [];
    FieldNameFormArrayList = [];
    FormListViewList = [];
    FormListViewFieldName = [];
    FormListViewTabGroupName = [];
}


function GetFormConfig(id, screenName) {
    //debugger;
    if (commonObj.DateFormatString == null || commonObj.DateFormatString == undefined || commonObj.DateFormatString == '') {
        commonObj.DateFormatString = systemTableConfig['DATEFORMATSTRING'];
        commonObj.DateTimeFormatString = systemTableConfig['DATETIMEFORMATSTRING'];
        commonObj.TimeFormatString = systemTableConfig['TIMEFORMATSTRING'];
        commonObj.QtyRoundingDigits = systemTableConfig['QTYROUNDINGDIGITS'];
        commonObj.AmountRoundingDigits = systemTableConfig['AMOUNTROUNDINGDIGITS'];
        commonObj.PriceRoundingDigits = systemTableConfig['PRICEROUNDINGDIGITS'];
        commonObj.Currency = systemTableConfig['CURRENCY'];
    }
    var query = "select * from FormConfig where   screenname ='" + screenName + "' and Language = '" + Language + "' order by displayno";
    if (ProjectName.toUpperCase() == "WMS" || ProjectName.toUpperCase() == "CPF" || ProjectName.toUpperCase() == "WMS" || ProjectName.toUpperCase() == "ETIKA" || ProjectName.toUpperCase() == "PVM" || ProjectName.toUpperCase() == "JSU" || ProjectName.toUpperCase() == "SANDL" || ProjectName.toUpperCase() == "TRADEPROIMPEX" || ProjectName.toUpperCase() == "FGV" || ProjectName.toUpperCase() == "EBFF") {
        query = "select * from FormConfig where screenname ='" + screenName + "' and Language = '" + Language + "'"
                        + " and (AccessLevel is null or AccessLevel ='" + AccessLevel + "') "
                        + " order by displayno";
    }
    FormListConfiginfo("FormConfig : " + query);

    $.ajax({
        type: 'POST',
        url: url_GetFormConfigList,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        data: { ScreenName: screenName },
        async: false,
        success: function (data) {
            //data = $.parseJSON(data);
            //  ClearArrayList();
            ClearFormConfigArrayList();
            if (data != null && data.toString() != "") {
                $('.formContainer').show()
                $("#tabMenuId,#" + id).empty();
                showFormConfigList(id, data, 0, screenName);

                //if (ProjectName == "CPF" || ProjectName == "FGV" || ProjectName == "EBFF") {
                //    var _obj = {};
                //    _obj.fieldName = 'form';
                //    PerformAction('formload', _obj);
                //}


            }
        }
    });
}

function GetTabGroupMenuList(id, screenName) {
    $.ajax({
        type: 'POST',
        url: url_GetTabGroupMenuList,
        dataType: 'json',
        data: { ScreenName: screenName },
        async: false,
        success: function (data) {
            if (data != null) {
                var htm = '';
                // htm += '<div style="width: 100%">';
                htm += '<div class="tab">';
                for (var i = 0; i < data.length; i++) {
                    TabGroupList.push(data[i].Value);
                    if (i == 0)
                        htm += '<button id="defaultOpen" class="tablinks" onclick="formTabGroupclicked(\'' + data[i].Value + '\');openTabMenu(event, \'' + data[i].Value + '\')">' + data[i].Descriptions + '</button>';
                    else
                        htm += '<button class="tablinks" onclick="formTabGroupclicked(\'' + data[i].Value + '\');openTabMenu(event, \'' + data[i].Value + '\')">' + data[i].Descriptions + '</button>';
                }

                htm += '</div>';
                //   htm += '</div>';
                $("#tabMenuId").append(htm);
                if (TabGroupList.length > 0) {
                    //if (ProjectName.toLowerCase() == "fgv")
                    //    GetTabGroupFormListFGV(id, screenName);
                    //else
                        GetTabGroupFormList(id, screenName);
                }
                document.getElementById("defaultOpen").click();
            }
        }
    });
}

function GetTabGroupMenuListFGV(id, screenName) {

    var Qury1 = "select QueryText + ' ' + isnull(GroupText,'') + ' ' + isnull(OrderText,'') from Queryconfig where screenname ='" + currentScreenName + "_FORM_TABGROUP'";

    execute(Qury1);

    Qury1 = executeQry[0].Column1;

    Qury1 = formatQueryString(Qury1, currentScreenName + "_FORM_TABGROUP");

    var query1 = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(Qury1), encryptkey, { keySize: 128 / 8, iv: encryptiv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    var params = "{'query':'" + query1 + "'}";

    $.ajax({
        type: 'POST',
        url: url_GetTabGroupMenuList1,
        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        data:  params ,
        async: false,
        success: function (data) {
            if (data != null) {
                var htm = '';
                // htm += '<div style="width: 100%">';
                htm += '<div class="tab">';
                for (var i = 0; i < data.length; i++) {
                    TabGroupList.push(data[i].Value);
                    if (i == 0)
                        htm += '<button id="defaultOpen" class="tablinks" onclick="formTabGroupclicked(\'' + data[i].Value + '\');openTabMenu(event, \'' + data[i].Value + '\')">' + data[i].Descriptions + '</button>';
                    else
                        htm += '<button class="tablinks" onclick="formTabGroupclicked(\'' + data[i].Value + '\');openTabMenu(event, \'' + data[i].Value + '\')">' + data[i].Descriptions + '</button>';
                }

                htm += '</div>';
                //   htm += '</div>';
                $("#tabMenuId").append(htm);
                if (TabGroupList.length > 0) {
                    //if (ProjectName.toLowerCase() == "fgv")
                    //    GetTabGroupFormListFGV(id, screenName);
                    //else
                        GetTabGroupFormList(id, screenName);
                }
                document.getElementById("defaultOpen").click();
            }
        }
    });
}


function ClearFormArrayList() {
    FieldNameFormArrayList = [];
}

function GetTabGroupFormList(id, screenName) {
    for (var i = 0; i < TabGroupList.length; i++) {
        TabScreenName = TabGroupList[i].toString();
        $.ajax({
            type: 'POST',
            url: url_GetTabGroupFormList,
            data: { ScreenName: screenName, id: TabGroupList[i].toString().replace(" ", "") },
            dataType: 'json',
            async: false,
            success: function (data) {
                DropDownIdList = [];
                ReadOnlyFieldList = [];
                RadioButtonIdList = [];
                CurrentScreen_TabScreen_Name = screenName + "_" + TabGroupList[i].replace(" ", "");

                showFormConfigList(id, data, i, screenName);

            }
        });
    }
}



var tabGroupData = '';
function GetTabGroupMenuList1(id, screenName) {
    $.ajax({
        type: 'POST',
        url: url_GetTabGroupMenuList,
        dataType: 'json',
        data: { ScreenName: screenName },
        async: false,
        success: function (data) {
            tabGroupData = data;
            return data;
        }
    });
}

function GetTabGroupMenuList1FGV(id, screenName) {
    var Qury1 = "select QueryText + ' ' + isnull(GroupText,'') + ' ' + isnull(OrderText,'') from Queryconfig where screenname ='" + currentScreenName + "_FORM_TABGROUP'";

    execute(Qury1);

    Qury1 = executeQry[0].Column1;

    Qury1 = formatQueryString(Qury1, currentScreenName + "_FORM_TABGROUP");

    var query1 = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(Qury1), encryptkey, { keySize: 128 / 8, iv: encryptiv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    var params = "{'query':'" + query1 + "'}";

    $.ajax({
        type: 'POST',
        url: url_GetTabGroupMenuList1,
        contentType: "application/json;charset=utf-8",
       // GetTabGroupMenuList1
        dataType: 'json',
        data: params,
        async: false,
        success: function (data) {
            tabGroupData = data;
            return data;
        }
    });
}



function openTabMenu(evt, name) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    if (name == "Export")
        $('#' + name).show();

    var tmp = document.getElementById(name);
    document.getElementById("con_" + name).style.display = "block";
    evt.currentTarget.className += " active";

    TabScreenName = name.replace(" ", "");
    CurrentScreen_TabScreen_Name = currentScreenName + "_" + TabScreenName;
}

var dataFieldIdListInv = '';
function GetDropDownListValue(screenName, formList, comboboxChange) {
    var scrName = TabScreenName == '' ? screenName : screenName + "_" + TabScreenName;
    for (var i = 0; i < DropDownIdList.length; i++) {

        // COMMENTED AS OF NOW IT RETURNS IF ALREADY FILLED COMBOBOX
        try {
            if (document.getElementById(DropDownIdList[i].DataMember).options.length > 0) {
                //Newly added By M.04.06.2021 -line 210
                // i++;
                if (DropDownIdList.length == i)
                    break;
            }
        }
        catch (e)
        { }



        //uniliver
        DropDownOnchangeFunction(DropDownIdList[i].DataMember, "No");
        formList = DropDownIdList[i].FormListType;
        scrName = DropDownIdList[i].ScreenName;
        if (currentScreenName == "InventoryAdjustmentForm") {
            if (dataFieldIdListInv == '')
                dataFieldIdListInv = dataFieldIdList;
            else
                dataFieldIdList = dataFieldIdListInv;
        }

        ///
        //this logic added by.M 01.11.2022 - insted of ajax
        var queryconfigScrName = "";
        if (formList == "List")
            queryconfigScrName = screenName + "_COMBOBOX_" + DropDownIdList[i].DataMember;
        else
            queryconfigScrName = screenName + "_FORM_COMBOBOX_" + DropDownIdList[i].DataMember;

        // var qry = getQueryConfigByScreenName(mScreenName);
        var qry = getString['QueryConfig_' + queryconfigScrName];
        qry += ' ' + getString['QueryConfig_' + queryconfigScrName + '_GroupText'];
        qry += ' ' + getString['QueryConfig_' + queryconfigScrName + '_OrderText'];

        if (qry == "undefined undefined undefined")
            qry = GetQueryConfigvalue(queryconfigScrName);
        qry = formatQueryString(qry, queryconfigScrName);
        //qry = "Select top 10 CustNo as Code,CustNo+' - '+CustName as Text From Customer inner join SalesmanGroup on SalesmanGroup.GroupID=Customer.Salesagent Where Customer.Active =1 and SalesmanGroup.UserID='ADMIN'  Order By Code";
        execute(qry);

        var data = executeQry;
        if (data != null) {
            if (formList == 'List') {
                //this line added itempromotion
                var sName = DropDownIdList[i].ScreenName.split('_').length >= 2 ? DropDownIdList[i].ScreenName.split('_')[0] + "_" + DropDownIdList[i].ScreenName.split('_')[1] : DropDownIdList[i].ScreenName.split('_')[0];
                populateDropDownList(data, DropDownIdList[i].DataMember, i, sName);
            }
            else {
                populateDropDown(data, DropDownIdList[i].DataMember);
                //Newly added by.M 13.07.2021
                if (DropDownIdList[i].AutoSearch == "Yes")
                    $("#" + DropDownIdList[i].DataMember).select2();

                if (DropDownIdList.length == (i + 1) && (DropDownIdList[i].ScreenName == "AssetForm" || DropDownIdList[i].ScreenName == "FocusSKUForm" || DropDownIdList[i].ScreenName == "MustCarryItemForm" || DropDownIdList[i].ScreenName == "InventoryForm")) {
                    var dataMember = DropDownIdList[i].DataMember;
                    DropDownIdList = [];
                    DropDownOnchangeFunction(dataMember);
                    // DropDownOnchangeFunction(DropDownIdList[i].DataMember);
                }
            }
        }

    }
    DropDownIdList = [];
}

function GetMapMarker() {
    for (var i = 0; i < MapMarkerIdList.length; i++) {
        initMapMarker("map_" + MapMarkerIdList[i].DataMember);
    }
    MapMarkerIdList = [];
}

function GetAutoCompleteFormValue(screenName, formList) {
    var scrName = TabScreenName == '' ? screenName : screenName + "_" + TabScreenName;
    var sName = "";
    for (var i = 0; i < AutoCompleteList.length; i++) {
        autoID = AutoCompleteList[i].DataMember;
        try {
            $('#' + autoID).autocomplete({
                source: function (request, response) {
                    var myLength = $('#' + autoID).val().length;
                    //if (myLength <= 2)
                    //    return;
                    // sName = scrName + "_AUTOCOMPLETE_" + id;
                    try {
                        FormView[autoID] = document.getElementById(autoID).value;
                    } catch (e) {

                    }

                    sName = CurrentScreen_TabScreen_Name + "_AUTOCOMPLETE_" + autoID;
                    var qry = getString['QueryConfig_' + sName];
                    qry += ' ' + getString['QueryConfig_' + sName + '_GroupText'];
                    qry += ' ' + getString['QueryConfig_' + sName + '_OrderText'];
                    qry = formatQueryString(qry, sName);//ScreenView

                    $.ajax({
                        url: '../Common/AutoComplete/',
                        data: { qry: qry },
                        dataType: "json",
                        type: "POST",
                        // contentType: "application/json; charset=utf-8",
                        success: function (data) {
                            response($.map(data, function (item) {
                                return item;
                            }))
                        },
                        error: function (response) {
                            alert(response.responseText);
                        },
                        failure: function (response) {
                            alert(response.responseText);
                        }
                    });
                },
                select: function (e, i) {
                    $('#' + autoID).val(i.item.val)
                    // $("#hfCustomer").val(i.item.val);
                    FormView.AUTOLISTSELECT = i.item.val;
                    AUTOLISTSELECT = i.item.val;

                    var _obj = {};
                    _obj.fieldName = autoID;
                    _obj.value = i.item.val;

                    try {
                        FormView[autoID] = i.item.val;
                    } catch (e) {

                    }

                    //  PerformAction('autoLookupEntered', _obj);
                    PerformAction('autoCompleteEntered', _obj);

                },
                minLength: 1
            });
        } catch (e) {
            alert(e);
        }
    }

}


function GetAutoCompleteListValue(screenName, formList) {
    var Temp = FieldName;
    var scrName = TabScreenName == '' ? screenName : screenName + "_" + TabScreenName;
    var sName = "";
    var id = "CustNo";
    var rowIndex = "CustNo";
    for (var i = 0; i < AutoCompleteList.length; i++) {
        id = AutoCompleteList[i].DataMember;
        rowIndex = AutoCompleteList[i].rowIndex;
      //  $('.Id_' + id + '_' + rowIndex).autocomplete({
            $('.Id_' + id).autocomplete({
            source: function (request, response) {

                //FormView.AUTOLISTSELECT = "151565";
                //var _obj = {};
                //_obj.fieldName = id;
                //_obj.value = "151565";
                //PerformAction('autoLookupEntered', _obj);

                //var tblbody = document.getElementById(_ttbody);
                //tblbody.rows[currentRowIndex].cells.namedItem(id).childNodes['0'].innerText = "ddd";
                // var tblbody = document.getElementById(_ttbody);
                //tblbody.rows[currentRowIndex].cells.namedItem(id).childNodes['0'].innerText = i.item.val;
                //todo
                //id = this.element[0].id

                //  var myLength = $('.Id_' + id + '_' + currentRowIndex).val().length;

              //  tblbody

                var tblbody = document.getElementById(_ttbody);
               var tmlval = tblbody.rows[currentRowIndex].cells.namedItem(id).childNodes['0'].value;

                //if ($('.Id_' + id + '_' + currentRowIndex) == null || $('.Id_' + id + '_' + currentRowIndex) == undefined) return;
                if (tmlval == null || tmlval == undefined) return;
                //var myLength = $('.Id_' + id + '_' + currentRowIndex).val().length;
                var myLength = tmlval.length;
                //if (myLength <= 3)
                //    return;
                setListValue(this, id, currentRowIndex, _ttbody);

                //if (id == "ItemNo" && runData != "") {
                //    try {
                //        var runData1;

                //        var condValue1 = $('#' + id).val();
                //        runData1 = runData.filter(x => x.label.indexOf(condValue1.toUpperCase()) > -1);

                //        response($.map(runData1, function (item) {
                //            return item;
                //        }))
                //    } catch (err) {

                //    }

                //}
                //else {

                sName = CurrentScreen_TabScreen_Name + "_LISTVIEW_AUTOCOMPLETE_" + id;
                    var qry = getString['QueryConfig_' + sName];
                    qry += ' ' + getString['QueryConfig_' + sName + '_GroupText'];
                    qry += ' ' + getString['QueryConfig_' + sName + '_OrderText'];
                    PageLoadinginfo_ALT("AUTO LIST AUTO LIST AUTO LIST:BEFORE " + qry);
                    qry = formatQueryString(qry, sName);//ScreenView

                    PageLoadinginfo_ALT("AUTO LIST AUTO LIST AUTO LIST: " + qry);

                    $.ajax({
                        url: '../Common/AutoComplete/',
                        data: { qry: qry },
                        dataType: "json",
                        type: "POST",
                        // contentType: "application/json; charset=utf-8",
                        success: function (data) {
                            if (id == "ItemNo") {
                                runData = data;

                                try {
                                    var runData1;

                                    var condValue1 = $('#' + id).val();
                                    runData1 = runData.filter(x => x.label.indexOf(condValue1.toUpperCase()) > -1);
                                    response($.map(runData1, function (item) {
                                        return item;
                                    }))
                                } catch (err) {

                                }


                            }
                            else {
                                response($.map(data, function (item) {
                                    return item;
                                }))
                            }
                        },
                        error: function (response) {
                            alert(response.responseText);
                        },
                        failure: function (response) {
                            alert(response.responseText);
                        }
                    });
                //}
            },
            select: function (e, i) {
                //$('#' + id).val(i.item.val)
                // $("#hfCustomer").val(i.item.val);
                //alert(id);
                //debugger;
                //  $('.Id_' + id).val(i.item.val);
                // var tblbody = document.getElementById(_ttbody);
                //tblbody.rows[currentRowIndex].cells.namedItem(id).childNodes['0'].innerText = i.item.val;

                // _ttbody=  _ttableId.replace('table_', 'ListBodyDivId_');
                setListValue("", id, currentRowIndex, _ttbody);

                //CreateList(_ttbody, _ttbody.replace("ListBodyDivId_", "ListfootDivId_"), currentScreenName, 1, "", _ttbody.split('_')[_ttbody.split('_') - 1], "", "");
                //        table_CustomerRoutingForm_Customer
                //ListBodyDivId_CustomerRoutingForm_Customer
                FormView.AUTOLISTSELECT = i.item.val;
                AUTOLISTSELECT = i.item.val;
                _listLookUpttbody = _ttbody;
                _listLookUpIndex = currentRowIndex;
                var _obj = {};
                _obj.fieldName = id;
                _obj.value = i.item.val;
                //  PerformAction('autoLookupEntered', _obj);
                PerformAction('autoCompleteEntered', _obj);

            },
            minLength: 1
        });

    }
    FieldName = Temp;
}
function GetAutoCompleteListWithTextValue(screenName, formList) {
    var Temp = FieldName;
    var scrName = TabScreenName == '' ? screenName : screenName + "_" + TabScreenName;
    var sName = "";
    var id = "CustNo";
    var rowIndex = "CustNo";
    for (var i = 0; i < AutoCompleteWithTextList.length; i++) {
        id = AutoCompleteWithTextList[i].DataMember;
        rowIndex = AutoCompleteWithTextList[i].rowIndex;
        $('.Id_' + id + '_' + rowIndex).autocomplete({
            //$('.Id_' + id).autocomplete({
            source: function (request, response) {
                //todo
                //id = this.element[0].id
                //  var myLength = $('.Id_' + id + '_' + currentRowIndex).val().length;
                if ($('.Id_' + id + '_' + currentRowIndex) == null || $('.Id_' + id + '_' + currentRowIndex) == undefined) return;
                var myLength = $('.Id_' + id + '_' + currentRowIndex).val().length;

                setListValue(this, id, currentRowIndex, _ttbody);
                sName = scrName + "_LISTVIEW_AUTOCOMPLETE_" + id;
                var qry = getString['QueryConfig_' + sName];
                qry += ' ' + getString['QueryConfig_' + sName + '_GroupText'];
                qry += ' ' + getString['QueryConfig_' + sName + '_OrderText'];
                PageLoadinginfo_ALT("AUTO LIST AUTO LIST AUTO LIST:BEFORE " + qry);
                qry = formatQueryString(qry, sName);//ScreenView

                PageLoadinginfo_ALT("AUTO LIST AUTO LIST AUTO LIST: " + qry);

                $.ajax({
                    url: '../Common/AutoComplete/',
                    data: { qry: qry },
                    dataType: "json",
                    type: "POST",
                    // contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        response($.map(data, function (item) {
                            return item;
                        }))
                    },
                    error: function (response) {
                        alert(response.responseText);
                    },
                    failure: function (response) {
                        alert(response.responseText);
                    }
                });
            },
            select: function (e, i) {
                setListValue("", id, currentRowIndex, _ttbody);
                FormView.AUTOLISTSELECT = i.item.val;
                AUTOLISTSELECT = i.item.val;
                _listLookUpttbody = _ttbody;
                var _obj = {};
                _obj.fieldName = id;
                _obj.value = i.item.val;

                FormView[FieldName][id] = i.item.val;
                //  PerformAction('autoLookupEntered', _obj);
                PerformAction('autoCompleteEntered', _obj);

            },
            minLength: 1
        });

    }
    FieldName = Temp;
}

function autoCompleteLostFocus(obj, dataMember, rowIndex, value, fieldName, ttbodyId, tfoot) {
    try {

        isAutoSelect = true;

        var tmpp = '';

        try {
            tmpp = document.getElementById(ttbodyId).rows[rowIndex].cells.namedItem(dataMember).childNodes['0'].value;


        } catch (e) {

        }

        setListValue(obj, dataMember, rowIndex, ttbodyId);

        FormView.AUTOLISTSELECT = tmpp;
        AUTOLISTSELECT = tmpp;

        objAutoSelect = obj;

        var t = document.activeElement;

        // var focused = targt;
        // setTimeout(function () {
        var _obj = {};
        _obj.fieldName = dataMember;
        _obj.rowIndex = rowIndex;
        _listLookUpIndex = rowIndex;
        _obj.value = value;
        PerformAction('autoCompleteEntered', _obj);

        //}, 5);


    }
    catch {

    }
}

function GetAutoCompleteListWithText(screenName, formList) {
    var Temp = FieldName;
    var scrName = TabScreenName == '' ? screenName : screenName + "_" + TabScreenName;
    var sName = "";
    var id = "CustNo";
    var rowIndex = "CustNo";
    for (var i = 0; i < AutoCompleteWithTextList.length; i++) {
        id = AutoCompleteWithTextList[i].DataMember;
        rowIndex = AutoCompleteWithTextList[i].rowIndex;
        $('.Id_' + id + '_' + rowIndex).autocomplete({
            //$('.Id_' + id).autocomplete({
            source: function (request, response) {
                //todo
                //id = this.element[0].id
                //  var myLength = $('.Id_' + id + '_' + currentRowIndex).val().length;
                if ($('.Id_' + id + '_' + currentRowIndex) == null || $('.Id_' + id + '_' + currentRowIndex) == undefined) return;
                var myLength = $('.Id_' + id + '_' + currentRowIndex).val().length;

                sName = scrName + "_AUTOCOMPLETE_" + id;
                var qry = getString['QueryConfig_' + sName];
                qry += ' ' + getString['QueryConfig_' + sName + '_GroupText'];
                qry += ' ' + getString['QueryConfig_' + sName + '_OrderText'];
                PageLoadinginfo_ALT("AUTO LIST AUTO LIST AUTO LIST:BEFORE " + qry);
                qry = formatQueryString(qry, sName);//ScreenView

                PageLoadinginfo_ALT("AUTO LIST AUTO LIST AUTO LIST: " + qry);

                $.ajax({
                    url: '../Common/AutoComplete/',
                    data: { qry: qry },
                    dataType: "json",
                    type: "POST",
                    // contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        response($.map(data, function (item) {
                            return item;
                        }))
                    },
                    error: function (response) {
                        alert(response.responseText);
                    },
                    failure: function (response) {
                        alert(response.responseText);
                    }
                });
            },
            select: function (e, i) {
                setListValue("", id, currentRowIndex, _ttbody);
                FormView.AUTOLISTSELECT = i.item.val;
                AUTOLISTSELECT = i.item.val;
                _listLookUpttbody = _ttbody;
                var _obj = {};
                _obj.fieldName = id;
                _obj.value = i.item.val;

                FormView[FieldName][id] = i.item.val;
                //  PerformAction('autoLookupEntered', _obj);
                PerformAction('autoCompleteEntered', _obj);

            },
            minLength: 1
        });

    }
    FieldName = Temp;
}


function GetRadioButtonListValue(screenName) {
    var scrName = TabScreenName == '' ? CurrentScreen_TabScreen_Name.split('_').length >= 2 ? CurrentScreen_TabScreen_Name : screenName : screenName + "_" + TabScreenName;

    scrName = CurrentScreen_TabScreen_Name;

    for (var i = 0; i < RadioButtonIdList.length; i++) {
        $.ajax({
            type: 'POST',
            url: url_GetRadioButtonListValue,
            data: { ScreenName: scrName, id: RadioButtonIdList[i] },
            dataType: 'json',
            async: false,
            success: function (data) {
                if (data != null) {
                    var html = '';
                    for (var j = 0; j < data.length; j++) {
                        //if (screenName == "UserSettingsForm")
                        //    html += '<input type="radio" id="' + RadioButtonIdList[i] + '" name="' + RadioButtonIdList[i] + '" value="' + data[j].Text + '" style="width:5%" >' + data[j].Code;
                        //else
                        html += '<input type="radio" id="' + RadioButtonIdList[i] + '" name="' + RadioButtonIdList[i] + '" value="' + data[j].Code + '" style="width:5%" >' + data[j].Text;
                    }//
                    $("#radio_" + RadioButtonIdList[i]).append(html);
                }
            }
        });
    }
}

function GetFormListViewList(screenName) {

    for (var i = 0; i < FormListViewFieldName.length; i++) {
        isFormListView = true;
        var fieldName = FormListViewFieldName[i];
        TabScreenName = FormListViewTabGroupName[i];
        // var scrName = TabScreenName == '' ? screenName : screenName + "_" + TabScreenName;
        var scrName = screenName;
        //scrName = scrName + "_FORM_LISTVIEW_" + fieldName;
        //scrName = scrName + "_LISTVIEW_" + fieldName;
        //  GetGridHeaderDetails(url_GetListConfig, url_GetListValue, "ListHeadDivId_" + fieldName + "", "ListBodyDivId_" + fieldName + "", "ListfootDivId_" + fieldName + "", scrName); 
        FormListConfigHeader("ListHeadDivId_" + CurrentScreen_TabScreen_Name + "_" + fieldName + "", "ListBodyDivId_" + CurrentScreen_TabScreen_Name + "_" + fieldName + "", "ListfootDivId_" + CurrentScreen_TabScreen_Name + "_" + fieldName + "", scrName, fieldName, '', url_GetListConfig, scrName + "_LISTVIEW_" + fieldName);
        isFormListView = false;
    }
}



function populateDropDown(data, id) {
    $('#' + id).empty();
    //var valueText = "<option value=" + -1 + ">  </option>";
    //$(valueText).appendTo('#' + id);

    valueText = '<option selected="selected" disabled="true">--Select--</option>';
    //var str = "<option value='" + fnum + "'>" + fname + "</option>";

    $(valueText).appendTo('#' + id);

    $.each(data, function (i, data) {
        data.Code = data.Code == null ? "" : data.Code;
        data.Text = data.Text == null ? "" : data.Text;
        //valueText = "<option value=" + data.Code.toString().replace(/ /g, "-space-") + ">" + data.Text + "</option>";
        valueText = "<option value='" + data.Code + "'>" + data.Text + "</option>";
        //var str = "<option value='" + fnum + "'>" + fname + "</option>";

        $(valueText).appendTo('#' + id);
    });
   // document.getElementById(id).selectedIndex = "-1";
    // $('#' + id).val(-1);
}


var isDataMemberTypeInt = false;
var isDataMemberTypeFloat = false;
var isDataMemberTypeDecimal = false;
var isDataMemberTypeEmail = false;

// UP DOWN FUNCTIONALITY =================
var isUpDown = false;
var listview_current_Row_Reference = null;
var listview_prev_current_Row_Reference = null;
// UP DOWN FUNCTIONALITY =================

var isDateTimePicker = false;
var isTimePicker = false;
var isMonthPicker = false;
var isMultiSelectCombobox = false;

var isYearPicker = false;
var isMapMarker = false;
var isMapRoute = false;
var isTabGroupExit = false;
var requiredMessage = '';
var dataFieldIdList = {};
var formFieldIdList = {};

var formdata = {};
var formItems = [];
var arrfrm = [];
var _objArray = {};
var _ImgCtrlWidth = 80, _ImgCtrlHeight = 100;

var fieldNames = [], formFieldNames = [], formDataMember = [];

function isFuncSearchorSort(scrn, fldname) {
    var result = 1;

    var qry = "select ISNULL(COUNT(FieldName),0) cnt from SEARCHConfig where  ScreenName = '" + scrn + "_LISTVIEW_" + fldname + "'";
    execute(qry);
    var data11 = executeQry;
    if (data11[0].cnt.toString() == "0") {
        result = 0;
    }
    return result;
}

function isFuncUpDown(scrn, fldname) {
    var result = 1;

    var qry = "select ISNULL(COUNT(FieldName),0) cnt from ListConfig where  ScreenName = '" + scrn + "_LISTVIEW_" + fldname + "' and fieldname = 'isUpDown'";
    execute(qry);
    var data11 = executeQry;
    if (data11[0].cnt.toString() == "0") {
        result = 0;
    }
    return result;
}



function ListView_DownRow_func() {
    //alert('down');
    //listview_current_Row_Reference
    var current_down = $(listview_current_Row_Reference).closest('tr')
    var next = current_down.next('tr');
    if (next.length !== 0) {
        current_down.insertAfter(next);
    }
    //Update_Order_Number();
    return false;
}


function ListView_UpRow_func() {
    //alert('up');
    var current_up = $(listview_current_Row_Reference).closest('tr');
    var Something = $(listview_current_Row_Reference).closest('tr').prev('tr').find('td:eq(0)').text();
    if (Something != null && Something != undefined && Something != '') {
        var previous = current_up.prev('tr');
        if (previous.length !== 0) {
            current_up.insertBefore(previous);
        }
    }
    //Update_Order_Number();
    return false;
}

function showFormConfigList(id, data, cnt, scrn) {

    // INITIALIZE
    isUpDown = false;
    var isAlreadyFilled = false;

    FormListViewList = [];
    FormListViewTabGroupName = [];
    var htm = '';
    htm += '<div style="width: 100%">';
    if (TabGroupList.length >= 1)
        htm += '<div id="con_' + TabGroupList[cnt] + '" class="tabcontent">';

    var maxCharLength = '';
    var DatePickerdata = {};
    for (var i = 0; i < data.length; i++) {
        if (true) {
            var fontWeight = data[i].HFontStyle;
            var fontWeightt = data[i].VFontStyle;
            var hForeColor = '';
            var hBackColor = '';
            var vForeColor = argbToRGB(data[i].VForeColor);
            var vBackColor = argbToRGB(data[i].VBackColor);

            var isDisable = false;
            try {
                if (data[i].isDisable == null)
                    isDisable = false;
                else
                    isDisable = data[i].isDisable;

            }

            catch { }

            var displayNo = data[i].DisplayNo.toString().split('.');
            if (displayNo.length == 1) {
                formdata = {};

                formdata.screenName = data[i].ScreenName;
                formdata.fieldName = data[i].FieldName;
                formdata.fieldControl = data[i].FieldControl;
                formdata.FieldControl = data[i].FieldControl;
                formdata.DataMember = data[i].DataMember;
                formdata.DataMemberType = data[i].DataMemberType;
                formdata.DefaultText = data[i].DefaultText;
                formdata.DefaultValue = data[i].DefaultValue;
                formdata.NewText = data[i].NewText;
                formDataList.push(formdata);
                formItems.push(formdata);
                arrfrm.push(formdata);
                formFieldNames.push(data[i].FieldName.toUpperCase());

                FieldNameFormArrayList.push(data[i].DataMember);
                var dataMemberType = data[i].DataMemberType.toLowerCase();
                if (dataMemberType != "int" && dataMemberType != "float" && dataMemberType != "decimal")
                    dataMemberType = '';

                dataFieldIdList[data[i].DataMember] = '';
                formDataMember.push(data[i].DataMember);

                if (data[i].FieldControl == "TEXTBOX" || data[i].FieldControl == "PASSWORD")
                    requiredMessage = "Enter the " + data[i].NewText.replace('*', '');
                    // textBox1.ForeColor = SystemColors.GrayText;
                   
                else if (data[i].FieldControl == "LOOKUP" || data[i].FieldControl == "AUTOLOOKUP")
                    requiredMessage = "Select the " + data[i].NewText.replace('*', '');
                else
                    requiredMessage = "";
                //requiredMessage = "";

                if (data[i].IsHidden == true) {
                    if (data[i].FieldControl.toLowerCase() == "timer")
                        mapTimer = data[i].DefaultValue == "" ? 30 : data[i].DefaultValue;
                    FieldIdList.push(data[i].DataMember + "$" + data[i].FieldControl.toLowerCase() + "$" + dataMemberType);
                    //newly added if condition 25-05-2021 M
                    if (data[i].FieldControl.toLowerCase() == "datepicker") {
                        isDateTimePicker = true;
                        DatePickerdata = {};
                        DatePickerdata.FieldControl = data[i].FieldControl;
                        DatePickerdata.DataMember = data[i].DataMember;
                        DatePickerdata.ScreenName = data[i].ScreenName;
                        DatePickerdata.DataMemberType = data[i].DataMemberType;
                        DatePickerdata.FormListType = "Form";
                        DateTimeIdList.push(DatePickerdata);
                        htm += '<input type="hidden" id="' + data[i].DataMember + '" data-act="2020-03-20 00:00:01" class="datepicker"  style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                    }
                    else if (data[i].FieldControl.toLowerCase() == "combobox") {
                        comboboxdata = {};
                        comboboxdata.DataMember = data[i].DataMember;
                        comboboxdata.ScreenName = data[i].ScreenName;
                        comboboxdata.FormListType = "Form";
                        DropDownIdList.push(comboboxdata);
                        //DropDownIdList.push(data[i].DataMember);
                        htm += '<div class="row" style="margin-right: 0px; margin-left: 0px;display:none;">';
                        htm += '<div  class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';

                        //htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                        //Modified by Nisha/Vishnu on 13/12/2023
                        //if (data[i].NewText.slice(0, 1) == "*")
                        //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';"><span style="color:red;">*</span>' + data[i].NewText.replace("*", "") + '</label>';
                        //else if (data[i].NewText.slice(-1) == "*")
                        //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText.replace("*", "") + '<span style="color:red;">*</span></label>';
                        //else
                        htm += '<label id="lbl_' + data[i].DataMember + '" style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';


                        htm += '</div>';

                        htm += '<div  class="labeltext" style="width:' + data[i].ValueWidth + "%" + ';">';
                        //sundar added tooltip condition on 04/12/24
                        //htm += '<select id="' + data[i].DataMember + '" onchange="formComboChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\'); DropDownOnchangeFunction(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onclick="comboBoxFormItemClicked(\'' + "" + '\',0,\'' + $('#' + data[i].DataMember).val() + '\',\'' + $('#' + data[i].DataMember).val() + '\',\'' + data[i].ScreenName + '\',\'' + data[i].FieldName + '\',\'' + "" + '\', \'' + data[i].DataMember + '\');" style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" >';
                        htm += '<select id="' + data[i].DataMember + '" onchange="formComboChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');DropDownChangeToolTip(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\'); DropDownOnchangeFunction(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onclick="comboBoxFormItemClicked(\'' + "" + '\',0,\'' + $('#' + data[i].DataMember).val() + '\',\'' + $('#' + data[i].DataMember).val() + '\',\'' + data[i].ScreenName + '\',\'' + data[i].FieldName + '\',\'' + "" + '\', \'' + data[i].DataMember + '\');" style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" >';
                        htm += '</select>';
                        htm += '</div>';
                        htm += '</div>';

                    }
                    else
                        htm += '<input type="hidden" id="' + data[i].DataMember + '"   style=" height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                }
                else {
                    var defaultOpen = "";
                    FieldIdList.push(data[i].DataMember + "$" + data[i].FieldControl.toLowerCase() + "$" + dataMemberType);
                    switch (data[i].FieldControl.toLowerCase()) {
                        case "imagebutton":
                            htm += '<div class="row" style="margin-right: 0px; margin-left: 0px">';
                            htm += '<div  class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';
                            htm += '</div>';
                       
                            //htm += '<div  class="labeltext" style="width:60px;height:60px;background-color:yellow;">';
                            htm += '<button type="submit" onclick="formButtonClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"id="' + data[i].DataMember + '"><img src="../Images/printbtn.jpg" width="60" height="60" alt="submit" /></button>';
                            //htm += '<input id="Button_' + data[i].DataMember + '" type="button"     style="Background:url("~/Images/printbtn.jpg")no-repeat;cursor: pointer;width:100px; height:100px;font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';line-height:none;" />';
                            //htm += '</div>';
                            htm += '</div>';
                            isBtnFormPopUpTable = true;
                            break;
                            //htm += '<div class="row" style="margin-right: 0px; margin-left: 0px">';
                            //htm += '<input id="Button_' + data[i].DataMember + '" type="button"    onclick="formButtonClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"id="' + data[i].DataMember + '" style="Background:url("../Images/printbtn.jpg")no-repeat;cursor: pointer;width:100%; height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';line-height:none;"  />';
                            //htm += '</div>';
                            //isBtnFormPopUpTable = true;
                            //break;
                        case "tabgroup":
                            $("#" + id).append(htm);
                            htm = '';

                            if (ProjectName.toLowerCase() == "fgv")
                                GetTabGroupMenuList1FGV(id, scrn);
                            else
                                GetTabGroupMenuList1(id, scrn);

                            if (tabGroupData != null) {
                                htm += '<div class="tab">';
                                for (var m = 0; m < tabGroupData.length; m++) {
                                    TabGroupList.push(tabGroupData[m].Value);
                                    if (m == 0) {
                                        htm += '<button id="tab_' + tabGroupData[m].Descriptions.split(" ").join("") + '" class="tablinks" onclick="formTabGroupclicked(\'' + tabGroupData[m].Value + '\');openTabMenu(event, \'' + tabGroupData[m].Value + '\')">' + tabGroupData[m].Descriptions + '</button>';
                                        defaultOpen = 'tab_' + tabGroupData[m].Descriptions.split(" ").join("");
                                    }
                                    //htm += '<button id="defaultOpen" class="tablinks" onclick="formTabGroupclicked(\'' + tabGroupData[m].Value + '\');openTabMenu(event, \'' + tabGroupData[m].Value + '\')">' + tabGroupData[m].Descriptions + '</button>';
                                    else
                                        htm += '<button class="tablinks" id="tab_' + tabGroupData[m].Descriptions.split(" ").join("") + '" onclick="formTabGroupclicked(\'' + tabGroupData[m].Value + '\');openTabMenu(event, \'' + tabGroupData[m].Value + '\')">' + tabGroupData[m].Descriptions + '</button>';
                                    //  htm += '<button class="tablinks" onclick="formTabGroupclicked(\'' + tabGroupData[m].Value + '\');openTabMenu(event, \'' + tabGroupData[m].Value + '\')">' + tabGroupData[m].Descriptions + '</button>';
                                }
                                htm += '</div>';
                            }
                            $("#" + id).append(htm);
                            if (DropDownIdList.length > 0) {
                                GetDropDownListValue(CurrentScreen_TabScreen_Name, "Form");
                                DropDownIdList = [];
                            }
                            htm = '';


                            if (TabGroupList.length > 0) {
                                listView_WithinTab = true;

                                //if (ProjectName.toLowerCase() == "fgv")
                                //    GetTabGroupFormListFGV(id, scrn);
                                //else
                                    GetTabGroupFormList(id, scrn);

                                isAlreadyFilled = true;
                            }
                            if (tabGroupData != null)
                                document.getElementById(defaultOpen).click();
                               // document.getElementById("defaultOpen").click();
                            TabGroupList = [];
                            isTabGroupExit = true;

                            ////Working
                            //isTabGroupExit = false;
                            //i = (data.length + 1);
                            //GetTabGroupMenuList(id, scrn);
                            //isTabGroupExit = true;
                            break;
                         case "autosuggest_textbox":

                            htm += '<div class="row" style="margin-right: 0px; margin-left: 0px">';
                            htm += '<div class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';

                            //htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                            //Modified by Nisha/Vishnu on 13/12/2023
                            //if (data[i].NewText.slice(0, 1) == "*")
                            //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';"><span style="color:red;">*</span>' + data[i].NewText.replace("*", "") + '</label>';
                            //else if (data[i].NewText.slice(-1) == "*")
                            //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';"><' + data[i].NewText.replace("*", "") + '<span style="color:red;">*</span></label>';
                            //else
                            htm += '<label id="lbl_' + data[i].DataMember + '" style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';

                            htm += '</div>';
                            htm += '<div class="labeltext" style="width:' + data[i].ValueWidth + "%" + ';">';
                            htm += '<div class="input-group" style="width:100%" >';
                            htm += '<input type="text"    id="' + data[i].DataMember + '"  onfocus="formAutoCompleteClicked(this,\'' + data[i].DataMember + '\',\'' + $('#' + data[i].DataMember).val() + '\');"  style="width:100%;height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';   "      placeholder="' + requiredMessage + '" class="form-control"  />';
                            // htm += '<input type="text" readonly="true"  id="' + data[i].DataMember + '"  onclick="formReadonlyClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"  style="height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';background-color:lightgrey"    disabled="true" placeholder="' + requiredMessage + '" class="form-control"  />';
                            /* htm += '<span href="#" id="LookUp_' + data[i].DataMember + '"  onchnge="formLookUpChanged(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"  onclick="formLookUpClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\',\'' + data[i].NewText + '\',\'' + data[i].ScreenName + '\'); " class="input-group-addon"> <i class="fa fa-plus"></i>  </span>';*/
                            //htm += '<span href="#" id="LookUp_' + data[i].DataMember + '"  onclick="formLookUpClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\',\'' + data[i].NewText + '\');GetLookUpData(\'' + data[i].DataMember + '\',\'' + data[i].DataMember + '\',\'' + "" + '\');" class="input-group-addon"> <i class="fa fa-plus"></i>  </span>';
                            htm += '</div>';
                            htm += '</div>';
                            htm += '</div>';

                            break;
                        case "datepicker":
                            isDateTimePicker = true;
                            DatePickerdata = {};
                            DatePickerdata.FieldControl = data[i].FieldControl;
                            DatePickerdata.DataMember = data[i].DataMember;
                            DatePickerdata.ScreenName = data[i].ScreenName;
                            DatePickerdata.DataMemberType = data[i].DataMemberType;
                            DatePickerdata.FormListType = "Form";
                            DateTimeIdList.push(DatePickerdata);

                            htm += '<div class="row" style="margin-right: 0px; margin-left: 0px">';
                            htm += '<div class="labeltext"  style="width:' + data[i].HeaderWidth + "%" + ';">';

                           
                            //htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                            //Modified by Nisha/Vishnu on 13/12/2023
                            //if (data[i].NewText.slice(0, 1) == "*")
                              //  htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';"><span style="color:red;">*</span>' + data[i].NewText.replace("*", "") + '</label>';
                           // else if (data[i].NewText.slice(-1) == "*")
                              //  htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText.replace("*", "") + '<span style="color:red;">*</span></label>';
                           // else
                            htm += '<label  id="lbl_' + data[i].DataMember + '" style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';


                            //if (data[i].IsMandatory == true) htm += '<span id="m_' + data[i].DataMember + '" style="color:red">*</span>';
                            htm += '</div>';
                            // <div style="position:relative">
                            htm += '<div  class="labeltext"  style="position:relative;width:' + data[i].ValueWidth + "%" + ';">';
                            //htm += '<input type="text" autocomplete="off" data-act="2020-03-20 00:00:01" id="' + data[i].DataMember + '" class="datepicker"  onclick="FormDatePickerClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" style="width:100%;height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                            //htm += '<input type="text"  data-act="2020-03-20 00:00:01" id="' + data[i].DataMember + '" class="datepicker" onchange="FormDatePickerChanged(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" onclick="FormDatePickerClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" style="width:100%;height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                            if (ProjectName == "CPF") {
                                if (isDisable == false) {
                                    if (data[i].TabIndex == null)
                                        htm += '<input type="text" autocomplete="off" data-act="2020-03-20 00:00:01" id="' + data[i].DataMember + '" class="datepicker"  onblur="FormDatePickerClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" style="width:100%;height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';background: url(../Images/cal3.png)no-repeat right;padding-right:20px;background-size:20px;border-radius:5px;" />';
                                    else
                                        htm += '<input type="text" autocomplete="off" data-act="2020-03-20 00:00:01" id="' + data[i].DataMember + '" TabIndex=' + data[i].TabIndex + ' class="datepicker"  onblur = "FormDatePickerClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" style = "width:100%;height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';background: url(../Images/cal3.png)no-repeat right;padding-right:20px;background-size:20px;border-radius:5px;" />';
                                }
                                else {
                                    if (data[i].TabIndex == null)
                                        htm += '<input type="text" autocomplete="off" data-act="2020-03-20 00:00:01" id="' + data[i].DataMember + '" class="datepicker"  onblur="FormDatePickerClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" style="width:100%;height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';background: url(../Images/cal3.png)no-repeat right, #f0f0f0;padding-right:20px;background-size:20px;border-radius:5px;" disabled />';
                                    else
                                        htm += '<input type="text" autocomplete="off" data-act="2020-03-20 00:00:01" id="' + data[i].DataMember + '" TabIndex=' + data[i].TabIndex + ' class="datepicker"  onblur = "FormDatePickerClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" style = "width:100%;height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';background: url(../Images/cal3.png)no-repeat right, #f0f0f0;padding-right:20px;background-size:20px;border-radius:5px;" disabled />';

                                }
                            }
                            else {
                                if (isDisable == false)
                                    htm += '<input type="text" autocomplete="off" data-act="2020-03-20 00:00:01" id="' + data[i].DataMember + '" class="datepicker"  onblur="FormDatePickerClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" onclick="FormDatePickerClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" style="width:100%;height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';background: url(../Images/cal3.png)no-repeat right;padding-right:20px;background-size:20px;border-radius:5px;" />';
                                else
                                    htm += '<input type="text" autocomplete="off" data-act="2020-03-20 00:00:01" id="' + data[i].DataMember + '" class="datepicker"  onblur="FormDatePickerClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" style="width:100%;height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';background: url(../Images/cal3.png)no-repeat right, #f0f0f0;padding-right:20px;background-size:20px;border-radius:5px;" disabled />';
                            }

                            htm += '</div>';
                            htm += '</div>';
                            break;
                        case "frame":
                            htm += '<br/>';
                            htm += '<iframe id="' + data[i].DataMember + '" style="width:100%;height:1000px;"></iframe>';
                            break;
                        case "timepicker":
                            isTimePicker = true;
                            htm += '<div class="row" style="margin-right: 0px; margin-left: 0px">';

                            htm += '<div class="labeltext"  style="width:' + data[i].HeaderWidth + "%" + ';">';

                           // htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                            //Modified by Nisha/Vishnu on 13/12/2023
                            //if (data[i].NewText.slice(0, 1) == "*")
                             //   htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';"><span style="color:red;">*</span>' + data[i].NewText.replace("*", "") + '</label>';
                           // else if (data[i].NewText.slice(-1) == "*")
                             //   htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText.replace("*", "") + '<span style="color:red;">*</span></label>';
                           // else
                            htm += '<label id="lbl_' + data[i].DataMember + '"  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';

                            //if (data[i].IsMandatory == true) htm += '<span id="m_' + data[i].DataMember + '" style="color:red">*</span>';
                            htm += '</div>';
                            htm += '<div  class="labeltext"  style="position:relative;width:' + data[i].ValueWidth + "%" + ';">';
                            htm += '<input type="text" id="' + data[i].DataMember + '" class="timepicker" onclick="FormDatePickerClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" style="width:100%;height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                            htm += '</div>';
                            htm += '</div>';
                            break;
                        case "monthyearpicker":
                            htm += '<div class="row" style="margin-right: 0px; margin-left: 0px">';
                            htm += '<div class="labeltext"  style="width:' + data[i].HeaderWidth + "%" + ';">';

                           // htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                            //Modified by Nisha/Vishnu on 13/12/2023
                           // if (data[i].NewText.slice(0, 1) == "*")
                             //   htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';"><span style="color:red;">*</span>' + data[i].NewText.replace("*", "") + '</label>';
                           // else if (data[i].NewText.slice(-1) == "*")
                            //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText.replace("*", "") + '<span style="color:red;">*</span></label>';
                           // else
                            htm += '<label  id="lbl_' + data[i].DataMember + '" style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';

                            htm += '</div>';
                            htm += '<div  class="labeltext"  style="width:' + data[i].ValueWidth + "%" + ';">';
                            htm += '<input type="text" id="' + data[i].DataMember + '" class="monthyearpicker"   style="width:100%;height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                            htm += '</div>';
                            htm += '</div>';
                            break;
                        case "yearpicker":
                            isYearPicker = true;
                            htm += '<div class="row" style="margin-right: 0px; margin-left: 0px">';
                            htm += '<div class="labeltext"  style="width:' + data[i].HeaderWidth + "%" + ';">';

                            //htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                            //Modified by Nisha/Vishnu on 13/12/2023
                            //if (data[i].NewText.slice(0, 1) == "*")
                            //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';"><span style="color:red;">*</span>' + data[i].NewText.replace("*", "") + '</label>';
                           // else if (data[i].NewText.slice(-1) == "*")
                            //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText.replace("*", "") + '<span style="color:red;">*</span></label>';
                           // else
                            htm += '<label id="lbl_' + data[i].DataMember + '" style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';

                            htm += '</div>';
                            htm += '<div  class="labeltext"  style="width:' + data[i].ValueWidth + "%" + ';">';

                            //sundar added tooltip condition on 04/12/24
                            /* htm += '<select  id="' + data[i].DataMember + '" class="yearpicker" onchange="formComboChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"    style="width:100%;height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" >';*/
                            htm += '<select  id="' + data[i].DataMember + '" class="yearpicker" onchange="formComboChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');DropDownChangeToolTip(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"    style="width:100%;height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" >';

                            htm += '</select>';
                            htm += '</div>';
                            htm += '</div>';
                            break;
                        case "monthpicker":
                            isMonthPicker = true;
                            htm += '<div class="row" style="margin-right: 0px; margin-left: 0px">';
                            htm += '<div class="labeltext"  style="width:' + data[i].HeaderWidth + "%" + ';">';

                            //htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                            //Modified by Nisha/Vishnu on 13/12/2023
                            //if (data[i].NewText.slice(0, 1) == "*")
                             //   htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';"><span style="color:red;">*</span>' + data[i].NewText.replace("*", "") + '</label>';
                            //else if (data[i].NewText.slice(-1) == "*")
                            //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText.replace("*", "") + '<span style="color:red;">*</span></label>';
                           // else
                            htm += '<label id="lbl_' + data[i].DataMember + '" style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';

                            htm += '</div>';
                            htm += '<div  class="labeltext"  style="width:' + data[i].ValueWidth + "%" + ';">';
                            //sundar added tooltip condition on 04/12/24
                            //htm += '<select id="' + data[i].DataMember + '" class="monthpicker" onchange="formComboChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\'); "   style="  height: ' + data[i].ValueHeight + "px" + ';          font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" >';
                            htm += '<select id="' + data[i].DataMember + '" class="monthpicker" onchange="formComboChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');DropDownChangeToolTip(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\'); "   style="  height: ' + data[i].ValueHeight + "px" + ';          font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" >';
                            htm += '</select>';
                            //htm += '<input type="text" id="' + data[i].DataMember + '" class="monthpicker"  onclick="clickMonthPicker();"  style="width:100%;height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                            htm += '</div>';
                            htm += '</div>';
                            break;
                        case "textbox":
                            //  FieldIdList.push(data[i].DataMember + "$" + data[i].FieldControl.toLowerCase());
                            // FieldIdList.push(data[i].DataMember);

                            maxCharLength = data[i].MaxCharLength == undefined || data[i].MaxCharLength == null ? "" : data[i].MaxCharLength;
                            htm += '<div class="row" style="margin-right: 0px; margin-left: 0px">';
                            htm += '<div class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';

                            //htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                            //Modified by Nisha/Vishnu on 13/12/2023
                            //if (data[i].NewText.slice(0, 1) == "*")
                             //   htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';"><span style="color:red;">*</span>' + data[i].NewText.replace("*", "") + '</label>';
                           // else if (data[i].NewText.slice(-1) == "*")
                            //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText.replace("*", "") + '<span style="color:red;">*</span></label>';
                           // else
                            htm += '<label id="lbl_' + data[i].DataMember + '" style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';

                            htm += '</div>';
                            htm += '<div  class="labeltext"  style="width:' + data[i].ValueWidth + "%" + ';">';
                            if (data[i].DataMemberType == "NUMBER") {
                                if (ProjectName == "CPF") {
                                   // if (data[i].AutoFocus == null || data[i].AutoFocus == 0) {
                                    if (data[i].TabIndex == null)
                                            //sundar added tooltip condition on 04/12/24
                                            //htm += '<input maxlength="' + maxCharLength + '" type="text" id="' + data[i].DataMember + '"  onkeypress="restrictMinus(event);" onclick="formTextFieldFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="enterformTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" placeholder="' + requiredMessage + '"  color:grey ; font-size: 12px; style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                                            htm += '<input maxlength="' + maxCharLength + '" type="text" id="' + data[i].DataMember + '"  onkeypress="restrictMinus(event);" onclick="formTextFieldFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="enterformTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');TextFieldChangeTooltip(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" placeholder="' + requiredMessage + '"  color:grey ; font-size: 12px; style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                                    else
                                        //sundar added tooltip condition on 04/12/24
                                        //htm += '<input maxlength="' + maxCharLength + '" TabIndex=' + data[i].TabIndex + ' type="text" id="' + data[i].DataMember + '"  onkeypress="restrictMinus(event);" onclick="formTextFieldFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="enterformTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" placeholder="' + requiredMessage + '"  color:grey ; font-size: 12px; style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                                        htm += '<input maxlength="' + maxCharLength + '" TabIndex=' + data[i].TabIndex + ' type="text" id="' + data[i].DataMember + '"  onkeypress="restrictMinus(event);" onclick="formTextFieldFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="enterformTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');TextFieldChangeTooltip(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" placeholder="' + requiredMessage + '"  color:grey ; font-size: 12px; style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                                    //}
                                    //else
                                      //  htm += '<input maxlength="' + maxCharLength + '" type="text" id="' + data[i].DataMember + '" autofocus onkeypress="restrictMinus(event);" onclick="formTextFieldFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="enterformTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" placeholder="' + requiredMessage + '"  color:grey ; font-size: 12px; style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                                }
                                else
                                    //sundar added tooltip condition on 04/12/24
                                    //htm += '<input maxlength="' + maxCharLength + '" type="text" id="' + data[i].DataMember + '"  onkeypress="restrictMinus(event);" onclick="formTextFieldFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="enterformTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" placeholder="' + requiredMessage + '"  color:grey ; font-size: 12px; style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                                    htm += '<input maxlength="' + maxCharLength + '" type="text" id="' + data[i].DataMember + '"  onkeypress="restrictMinus(event);" onclick="formTextFieldFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="enterformTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');TextFieldChangeTooltip(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" placeholder="' + requiredMessage + '"  color:grey ; font-size: 12px; style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';

                                //htm += '<input   type="text" style="z-index: 99;" id="' + listConfig[j].DataMember + '" value="" onkeypress="restrictMinus(event);" onfocus="listTextFieldFocus(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',' + $(this).parent().index('td') + ',\'' + fieldName + '\',\'' + ttbody + '\',\'' + tfoot + '\');"onblur="listTextFieldLostFocus(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',' + $(this).parent().index('td') + ',\'' + fieldName + '\',\'' + ttbody + '\',\'' + tfoot + '\');"onkeyup="listTextFieldChange(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',' + $(this).parent().index('td') + ',\'' + fieldName + '\',\'' + ttbody + '\',\'' + tfoot + '\');" />';
                            }
                            else if (data[i].DataMemberType == "INTEGER") {
                                isDataMemberTypeInt = true;
                                //sundar added tooltip condition on 04/12/24
                                //htm += '<input class="int"  maxlength="' + maxCharLength + '" type="text" id="' + data[i].DataMember + '"  onkeypress="restrictMinus(event);" onclick="formTextFieldFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="enterformTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" placeholder="' + requiredMessage + '"  color:grey ;font-size: 12px; style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                                htm += '<input class="int"  maxlength="' + maxCharLength + '" type="text" id="' + data[i].DataMember + '"  onkeypress="restrictMinus(event);" onclick="formTextFieldFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="enterformTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');TextFieldChangeTooltip(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" placeholder="' + requiredMessage + '"  color:grey ;font-size: 12px; style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                            }
                            else {
                                if (ProjectName == "VIDA") {
                                    if (FirstTextBoxautofocus == "")
                                        //sundar added tooltip condition on 04/12/24
                                        //htm += '<input maxlength="' + maxCharLength + '" oninput="this.value = this.value.toUpperCase()"  type="text" id="' + data[i].DataMember + '" autofocus onclick="formTextFieldFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="enterformTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" placeholder="' + requiredMessage + '"  color:grey ; font-size: 12px; style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                                        htm += '<input maxlength="' + maxCharLength + '" oninput="this.value = this.value.toUpperCase()"  type="text" id="' + data[i].DataMember + '" autofocus onclick="formTextFieldFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="enterformTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');TextFieldChangeTooltip(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" placeholder="' + requiredMessage + '"  color:grey ; font-size: 12px; style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                                    else
                                        //sundar added tooltip condition on 04/12/24
                                        //htm += '<input maxlength="' + maxCharLength + '" oninput="this.value = this.value.toUpperCase()"  type="text" id="' + data[i].DataMember + '" onclick="formTextFieldFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="enterformTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" placeholder="' + requiredMessage + '"  color:grey ; font-size: 12px;style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                                        htm += '<input maxlength="' + maxCharLength + '" oninput="this.value = this.value.toUpperCase()"  type="text" id="' + data[i].DataMember + '" onclick="formTextFieldFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="enterformTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');TextFieldChangeTooltip(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" placeholder="' + requiredMessage + '"  color:grey ; font-size: 12px;style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';

                                }
                                else {
                                    if (FirstTextBoxautofocus == "") {
                                        if (ProjectName == "CPF") {
                                           // if (data[i].AutoFocus == null || data[i].AutoFocus == 0) {
                                            if (data[i].TabIndex == null)
                                                    //sundar added tooltip condition on 04/12/24
                                                    //htm += '<input maxlength="' + maxCharLength + '" type="text" id="' + data[i].DataMember + '" name="' + data[i].DataMember + '" autofocus onclick="formTextFieldFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="enterformTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" placeholder="' + requiredMessage + '" color:grey ;font-size: 12px; style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                                                    htm += '<input maxlength="' + maxCharLength + '" type="text" id="' + data[i].DataMember + '" name="' + data[i].DataMember + '" autofocus onclick="formTextFieldFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="enterformTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');TextFieldChangeTooltip(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" placeholder="' + requiredMessage + '" color:grey ;font-size: 12px; style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                                            else
                                                //sundar added tooltip condition on 04/12/24
                                                //htm += '<input maxlength="' + maxCharLength + '" type="text" id="' + data[i].DataMember + '" TabIndex=' + data[i].TabIndex + ' name="' + data[i].DataMember + '" onclick="formTextFieldFocus(this, \'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="enterformTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" placeholder="' + requiredMessage + '" color:grey ;font-size: 12px; style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                                                htm += '<input maxlength="' + maxCharLength + '" type="text" id="' + data[i].DataMember + '" TabIndex=' + data[i].TabIndex + ' name="' + data[i].DataMember + '" onclick="formTextFieldFocus(this, \'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="enterformTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');TextFieldChangeTooltip(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');    " placeholder="' + requiredMessage + '" color:grey ;font-size: 12px; style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                                            //}
                                            //else
                                              //  htm += '<input maxlength="' + maxCharLength + '" type="text" id="' + data[i].DataMember + '" name="' + data[i].DataMember + '" autofocus onclick="formTextFieldFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="enterformTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" placeholder="' + requiredMessage + '" color:grey ;font-size: 12px; style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                                        }
                                        else
                                            //sundar added tooltip condition on 04/12/24
                                            //htm += '<input maxlength="' + maxCharLength + '" type="text" id="' + data[i].DataMember + '" name="' + data[i].DataMember + '" autofocus onclick="formTextFieldFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="enterformTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" placeholder="' + requiredMessage + '" color:grey ;font-size: 12px; style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                                            htm += '<input maxlength="' + maxCharLength + '" type="text" id="' + data[i].DataMember + '" name="' + data[i].DataMember + '" autofocus onclick="formTextFieldFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="enterformTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');TextFieldChangeTooltip(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" placeholder="' + requiredMessage + '" color:grey ;font-size: 12px; style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                                    }
                                    else {

                                        if (ProjectName == "CPF") {
                                           // if (data[i].AutoFocus == null || data[i].AutoFocus == 0) {
                                            if (data[i].TabIndex == null)
                                                //sundar added tooltip condition on 04/12/24
                                                //htm += '<input maxlength="' + maxCharLength + '" type="text" id="' + data[i].DataMember + '"  name="' + data[i].DataMember + '" onclick="formTextFieldFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="enterformTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" placeholder="' + requiredMessage + '"  color:grey ;font-size: 12px; style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                                                htm += '<input maxlength="' + maxCharLength + '" type="text" id="' + data[i].DataMember + '"  name="' + data[i].DataMember + '" onclick="formTextFieldFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="enterformTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');TextFieldChangeTooltip(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" placeholder="' + requiredMessage + '"  color:grey ;font-size: 12px; style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                                            else
                                                //sundar added tooltip condition on 04/12/24
                                                //htm += '<input maxlength="' + maxCharLength + '" type="text" id="' + data[i].DataMember + '" TabIndex=' + data[i].TabIndex + ' name="' + data[i].DataMember + '" onclick="formTextFieldFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="enterformTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');TextFieldChangeTooltip(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" placeholder="' + requiredMessage + '"  color:grey ;font-size: 12px; style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                                                htm += '<input maxlength="' + maxCharLength + '" type="text" id="' + data[i].DataMember + '" TabIndex=' + data[i].TabIndex + ' name="' + data[i].DataMember + '" onclick="formTextFieldFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="enterformTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');TextFieldChangeTooltip(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" placeholder="' + requiredMessage + '"  color:grey ;font-size: 12px; style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                                            //}
                                            //else
                                              //  htm += '<input maxlength="' + maxCharLength + '" type="text" id="' + data[i].DataMember + '"  name="' + data[i].DataMember + '" autofocus onclick="formTextFieldFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="enterformTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" placeholder="' + requiredMessage + '"  color:grey ;font-size: 12px; style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                                        }
                                        else
                                            //sundar added tooltip condition on 04/12/24
                                            //htm += '<input maxlength="' + maxCharLength + '" type="text" id="' + data[i].DataMember + '"  name="' + data[i].DataMember + '" onclick="formTextFieldFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="enterformTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" placeholder="' + requiredMessage + '"  color:grey ;font-size: 12px; style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                                            htm += '<input maxlength="' + maxCharLength + '" type="text" id="' + data[i].DataMember + '"  name="' + data[i].DataMember + '" onclick="formTextFieldFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="enterformTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');TextFieldChangeTooltip(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" placeholder="' + requiredMessage + '"  color:grey ;font-size: 12px; style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                                    }
                                }
                            }
                            htm += '</div>';
                            htm += '</div>';
                            if (FirstTextBoxautofocus == "")
                                FirstTextBoxautofocus = data[i].DataMember;
                            break;
                        case "password":
                            htm += '<div class="row" style="margin-right: 0px; margin-left: 0px">';
                            htm += '<div class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';

                            //htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                            //Modified by Nisha/Vishnu on 13/12/2023
                           // if (data[i].NewText.slice(0, 1) == "*")
                             //   htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';"><span style="color:red;">*</span>' + data[i].NewText.replace("*", "") + '</label>';
                           // else if (data[i].NewText.slice(-1) == "*")
                            //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText.replace("*", "") + '<span style="color:red;">*</span></label>';
                           // else
                            htm += '<label id="lbl_' + data[i].DataMember + '" style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';

                            htm += '</div>';
                            htm += '<div  class="labeltext"  style="width:' + data[i].ValueWidth + "%" + ';">';
                            //old
                            //if (WebBrowserName == "InternetExplorer") {
                            //    htm += '<input type="password" id="' + data[i].DataMember + '" onclick="formTextFieldFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" placeholder="' + requiredMessage + '"  style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';width:100%" />';
                            //    // //htm += '<span toggle="#password-field" class="fa fa-fw fa-eye field_icon toggle-password"></span>';
                            //}
                            //else {
                            htm += '<div style="background-color: rgb(232, 240, 254) !important;">';
                            //sundar added tooltip condition on 04/12/24
                            //htm += '<input type="password" id="' + data[i].DataMember + '" onclick="formTextFieldFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" placeholder="' + requiredMessage + '"  color:grey ;  style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';width:94%" />';
                            htm += '<input type="password" id="' + data[i].DataMember + '" onclick="formTextFieldFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');TextFieldChangeTooltip(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" placeholder="' + requiredMessage + '"  color:grey ;  style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';width:94%" />';
                            htm += '<i id="pass-status_' + data[i].DataMember + '" class="fa fa-eye-slash" aria-hidden="true" style="width:6%" onclick="viewPassword(\'' + data[i].DataMember + '\')"></i>';
                            htm += '</div>';
                            // }
                            htm += '</div>';
                            htm += '</div>';

                            break;
                        case "link":
                            htm += '<div class="row" style="margin-right: 0px; margin-left: 0px">';
                            htm += '<div class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';

                            //htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                            //Modified by Nisha/Vishnu on 13/12/2023
                            //if (data[i].NewText.slice(0, 1) == "*")
                           //     htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';"><span style="color:red;">*</span>' + data[i].NewText.replace("*", "") + '</label>';
                           // else if (data[i].NewText.slice(-1) == "*")
                           //     htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText.replace("*", "") + '<span style="color:red;">*</span></label>';
                           // else
                            htm += '<label id="lbl_' + data[i].DataMember + '" style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';

                            htm += '</div>';
                            htm += '<div  class="labeltext"  style="width:' + data[i].ValueWidth + "%" + ';margin-top: 1.5%;">';

                            if (currentScreenName.toLowerCase() == "importdataform")
                                htm += '<a href="../ImportFiles/DownloadFiles/' + data[i].NewText + '.xlsx" style="color: blue" download="">' + data[i].NewText + '.xlsx</a>';
                                //htm += '<a id="' + data[i].DataMember + '"  download style="color: ' + hForeColor + '"> </a>';
                            else
                                htm += '<a id="' + data[i].DataMember + '"  download style="color: ' + hForeColor + '"> </a>';

                            htm += '</div>';
                            htm += '</div>';
                            break;

                        case "lookup":

                            htm += '<div class="row" style="margin-right: 0px; margin-left: 0px">';
                            htm += '<div class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';

                            //htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                            //Modified by Nisha/Vishnu on 13/12/2023
                            //if (data[i].NewText.slice(0, 1) == "*")
                            //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';"><span style="color:red;">*</span>' + data[i].NewText.replace("*", "") + '</label>';
                           // else if (data[i].NewText.slice(-1) == "*")
                             //   htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText.replace("*", "") + '<span style="color:red;">*</span></label>';
                           // else
                            htm += '<label id="lbl_' + data[i].DataMember + '" style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';

                            htm += '</div>';
                            htm += '<div class="labeltext" style="width:' + data[i].ValueWidth + "%" + ';">';
                            htm += '<div class="input-group" id="div_' + data[i].DataMember + '">';
                            //htm += '<input type="text"    id="' + data[i].DataMember + '"  onclick="formReadonlyClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"  style="height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';   "      placeholder="' + requiredMessage + '" class="form-control"  />';
                            htm += '<input type="text" readonly="true"  id="' + data[i].DataMember + '"  onclick="formReadonlyClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"  style="width:100%;height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';background-color:lightgrey"    disabled="true" placeholder="' + requiredMessage + '" class="form-control"  />';
                            //htm += '<span href="#" id="LookUp_' + data[i].DataMember + '"  onclick="formLookUpClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\',\'' + data[i].NewText + '\');GetLookUpData(\'' + data[i].DataMember + '\',\'' + data[i].DataMember + '\',\'' + "" + '\');" class="input-group-addon"> <i class="fa fa-plus"></i>  </span>';

                            if (ProjectName == "CPF") {
                                if (data[i].TabIndex == null)
                                    htm += '<span href="#" id="LookUp_' + data[i].DataMember + '"  onchange="formLookUpChanged(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"  onclick="formLookUpClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\',\'' + data[i].NewText + '\',\'' + data[i].ScreenName + '\'); " class="input-group-addon"> <i class="fa fa-plus"></i>  </span>';
                                else
                                    htm += '<span href="#" id="LookUp_' + data[i].DataMember + '" TabIndex=' + data[i].TabIndex + ' onchange="formLookUpChanged(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"  onclick="formLookUpClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\',\'' + data[i].NewText + '\',\'' + data[i].ScreenName + '\'); " class="input-group-addon"> <i class="fa fa-plus"></i>  </span>';
                            }
                            else
                                htm += '<span href="#" id="LookUp_' + data[i].DataMember + '"  onchange="formLookUpChanged(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"  onclick="formLookUpClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\',\'' + data[i].NewText + '\',\'' + data[i].ScreenName + '\'); " class="input-group-addon"> <i class="fa fa-plus"></i>  </span>';

                            //htm += '<span href="#" id="LookUp_' + data[i].DataMember + '"  onclick="formLookUpClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\',\'' + data[i].NewText + '\');GetLookUpData(\'' + data[i].DataMember + '\',\'' + data[i].DataMember + '\',\'' + "" + '\');" class="input-group-addon"> <i class="fa fa-plus"></i>  </span>';
                            htm += '</div>';
                            htm += '</div>';
                            htm += '</div>';

                            break;
                        case "autolookup":
                            //  case "lookup":
                            autoCompletedata = {};
                            autoCompletedata.DataMember = data[i].DataMember;
                            autoCompletedata.ScreenName = data[i].ScreenName;
                            autoCompletedata.FormListType = "Form";
                            AutoCompleteList.push(autoCompletedata);

                            htm += '<div class="row" style="margin-right: 0px; margin-left: 0px">';
                            htm += '<div class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';

                            //htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                            //Modified by Nisha/Vishnu on 13/12/2023
                            //if (data[i].NewText.slice(0, 1) == "*")
                             //   htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';"><span style="color:red;">*</span>' + data[i].NewText.replace("*", "") + '</label>';
                           // else if (data[i].NewText.slice(-1) == "*")
                             //   htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText.replace("*", "") + '<span style="color:red;">*</span></label>';
                           // else
                            htm += '<label id="lbl_' + data[i].DataMember + '" style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';

                            htm += '</div>';
                            htm += '<div class="labeltext" style="width:' + data[i].ValueWidth + "%" + ';">';
                            htm += '<div class="input-group" >';
                            htm += '<input type="text"    id="' + data[i].DataMember + '" onfocus = "formLookUpChanged(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" onkeyup="enterformTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" onclick="formReadonlyClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"  style="height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';   "      placeholder="' + requiredMessage + '" class="form-control"  />';
                            // htm += '<input type="text" readonly="true"  id="' + data[i].DataMember + '"  onclick="formReadonlyClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"  style="height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';background-color:lightgrey"    disabled="true" placeholder="' + requiredMessage + '" class="form-control"  />';
                            htm += '<span href="#" id="LookUp_' + data[i].DataMember + '"  onchange="formLookUpChanged(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"  onclick="formLookUpClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\',\'' + data[i].NewText + '\',\'' + data[i].ScreenName + '\'); " class="input-group-addon"> <i class="fa fa-plus"></i>  </span>';
                            //htm += '<span href="#" id="LookUp_' + data[i].DataMember + '"  onclick="formLookUpClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\',\'' + data[i].NewText + '\');GetLookUpData(\'' + data[i].DataMember + '\',\'' + data[i].DataMember + '\',\'' + "" + '\');" class="input-group-addon"> <i class="fa fa-plus"></i>  </span>';
                            htm += '</div>';
                            htm += '</div>';
                            htm += '</div>';

                            break;
                            //case "lookuptextbox":
                        case "autosuggest":
                            //  case "lookup":
                            autoCompletedata = {};
                            autoCompletedata.DataMember = data[i].DataMember;
                            autoCompletedata.ScreenName = data[i].ScreenName;
                            autoCompletedata.FormListType = "Form";
                            AutoCompleteList.push(autoCompletedata);

                            htm += '<div class="row" style="margin-right: 0px; margin-left: 0px">';
                            htm += '<div class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';

                            //htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                            //Modified by Nisha/Vishnu on 13/12/2023
                            //if (data[i].NewText.slice(0, 1) == "*")
                            //   htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';"><span style="color:red;">*</span>' + data[i].NewText.replace("*", "") + '</label>';
                            // else if (data[i].NewText.slice(-1) == "*")
                            //   htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText.replace("*", "") + '<span style="color:red;">*</span></label>';
                            // else
                            htm += '<label id="lbl_' + data[i].DataMember + '" style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';

                            htm += '</div>';
                            htm += '<div class="labeltext" style="width:' + data[i].ValueWidth + "%" + ';">';
                            htm += '<div class="input-group" style="width:100%;" >';
                            htm += '<input type="text"    id="' + data[i].DataMember + '" onfocus = "formLookUpChanged(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" onkeyup="enterformTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" onclick="formReadonlyClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"  style="width:100%;height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';   "      placeholder="' + requiredMessage + '" class="form-control"  />';
                            // htm += '<input type="text" readonly="true"  id="' + data[i].DataMember + '"  onclick="formReadonlyClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"  style="height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';background-color:lightgrey"    disabled="true" placeholder="' + requiredMessage + '" class="form-control"  />';
                            //htm += '<span href="#" id="LookUp_' + data[i].DataMember + '"  onchange="formLookUpChanged(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"  onclick="formLookUpClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\',\'' + data[i].NewText + '\',\'' + data[i].ScreenName + '\'); " class="input-group-addon"> <i class="fa fa-plus"></i>  </span>';
                            //htm += '<span href="#" id="LookUp_' + data[i].DataMember + '"  onclick="formLookUpClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\',\'' + data[i].NewText + '\');GetLookUpData(\'' + data[i].DataMember + '\',\'' + data[i].DataMember + '\',\'' + "" + '\');" class="input-group-addon"> <i class="fa fa-plus"></i>  </span>';
                            htm += '</div>';
                            htm += '</div>';
                            htm += '</div>';

                            break;
                        case "lookup1":
                            //autoCompletedata = {};
                            //autoCompletedata.DataMember = data[i].DataMember;
                            //autoCompletedata.ScreenName = data[i].ScreenName;
                            //autoCompletedata.FormListType = "Form";
                            //AutoCompleteList.push(autoCompletedata);
                            ////AutoCompleteWithText.push(autoCompletedata);
                            //AutoCompleteWithTextList.push(autoCompletedata);

                            htm += '<div class="row" style="margin-right: 0px; margin-left: 0px">';
                            htm += '<div class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';

                            //htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                            //Modified by Nisha/Vishnu on 13/12/2023
                            //if (data[i].NewText.slice(0, 1) == "*")
                            //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';"><span style="color:red;">*</span>' + data[i].NewText.replace("*", "") + '</label>';
                            //else if (data[i].NewText.slice(-1) == "*")
                            //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText.replace("*", "") + '<span style="color:red;">*</span></label>';
                            //else
                            htm += '<label id="lbl_' + data[i].DataMember + '" style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';

                            htm += '</div>';
                            htm += '<div class="labeltext" style="width:' + data[i].ValueWidth + "%" + ';">';
                            htm += '<div class="input-group" >';
                            if (ProjectName == "VIDA") {
                                //htm += '<input   type="text" />';
                                htm += '<input type="text" readonly id="' + data[i].DataMember + '" onclick="formTextFieldFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"   style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                                //htm += '<input maxlength="' + maxCharLength + '" oninput="this.value = this.value.toUpperCase()"  type="text" id="' + data[i].DataMember + '" onclick="formTextFieldFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="enterformTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" placeholder="' + requiredMessage + '"  style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                            }
                            else {
                                //htm += '<input type="text" id="' + listConfig[j].DataMember + '" placeholder="' + requiredMessage + '"   style="width:84%;float:left;border-radius:0px;" class="form-control Id_' + listConfig[j].DataMember + '_' + addCount + '"  />';
                                htm += '<input type="text" id="' + data[i].DataMember + '"  onclick="formReadonlyClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"  style="height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';   "      placeholder="' + requiredMessage + '" class="form-control"  />';
                                // htm += '<input type="text" readonly="true"  id="' + data[i].DataMember + '"  onclick="formReadonlyClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"  style="height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';background-color:lightgrey"    disabled="true" placeholder="' + requiredMessage + '" class="form-control"  />';

                            }
                            //htm += '<span href="#" id="LookUp_' + data[i].DataMember + '"  onchnge="formLookUpChanged(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"  onclick="formLookUpClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\',\'' + data[i].NewText + '\',\'' + data[i].ScreenName + '\'); " class="input-group-addon"> <i class="fa fa-plus"></i>  </span>';
                            htm += '</div>';
                            htm += '</div>';
                            htm += '</div>';

                            break;
                        case "autosearch":
                            autoCompletedata = {};
                            autoCompletedata.DataMember = data[i].DataMember;
                            autoCompletedata.ScreenName = data[i].ScreenName;
                            autoCompletedata.FormListType = "Form";
                            AutoCompleteList.push(autoCompletedata);

                            htm += '<div class="row" style="margin-right: 0px; margin-left: 0px">';
                            htm += '<div class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';

                            //htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                            //Modified by Nisha/Vishnu on 13/12/2023
                            //if (data[i].NewText.slice(0, 1) == "*")
                             //   htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';"><span style="color:red;">*</span>' + data[i].NewText.replace("*", "") + '</label>';
                          //  else if (data[i].NewText.slice(-1) == "*")
                             //   htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText.replace("*", "") + '<span style="color:red;">*</span></label>';
                            //else
                            htm += '<label id="lbl_' + data[i].DataMember + '" style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';

                            htm += '</div>';
                            htm += '<div class="labeltext" style="width:' + data[i].ValueWidth + "%" + ';">';
                            htm += '<input  type="text" id="' + data[i].DataMember + '"  onclick="formReadonlyClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"   placeholder="' + requiredMessage + '"  style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';

                            htm += '</div>';
                            htm += '</div>';


                            break;

                        case "textarea":
                            htm += '<div class="row" style="margin-right: 0px; margin-left: 0px">';
                            htm += '<div class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';

                            //htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                            //Modified by Nisha/Vishnu on 13/12/2023
                            //if (data[i].NewText.slice(0, 1) == "*")
                             //   htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';"><span style="color:red;">*</span>' + data[i].NewText.replace("*", "") + '</label>';
                           // else if (data[i].NewText.slice(-1) == "*")
                            //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText.replace("*", "") + '<span style="color:red;">*</span></label>';
                           // else
                            htm += '<label id="lbl_' + data[i].DataMember + '" style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';

                            //if (data[i].IsMandatory == true) htm += '<span id="m_' + data[i].DataMember + '" style="color:red">*</span>';
                            htm += '</div>';
                            htm += '<div class="labeltext"style="width:' + data[i].ValueWidth + "%" + ';">';
                            htm += '<textarea id="' + data[i].DataMember + '" onclick="formTextAreaFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur="formTextAreaLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="formTextAreaChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"  style="padding-top:10px;height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';line-height: 130%; background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';"></textarea>';
                            htm += '</div>';
                            htm += '</div>';
                            break;
                        case "barcode":
                            htm += '<div class="row" style="margin-right: 0px; margin-left: 0px">';
                            htm += '<div class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';

                            //htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                            //Modified by Nisha/Vishnu on 13/12/2023
                            //if (data[i].NewText.slice(0, 1) == "*")
                            //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';"><span style="color:red;">*</span>' + data[i].NewText.replace("*", "") + '</label>';
                            //else if (data[i].NewText.slice(-1) == "*")
                            //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText.replace("*", "") + '<span style="color:red;">*</span></label>';
                            //else
                            htm += '<label id="lbl_' + data[i].DataMember + '" style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';

                            htm += '</div>';
                            htm += '<div class="labeltext"style="width:' + data[i].ValueWidth + "%" + ';">';
                            htm += '<svg id="' + data[i].DataMember + '" style="padding-top:10px;height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';line-height: 130%; background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';"></svg>';
                            htm += '</div>';
                            htm += '</div>';
                            break;
                        case "labelarea":
                            var fontWeight = GetFontStyle(data[i].VFontStyle);

                            htm += '<div class="row" style="margin-right: 0px; margin-left: 0px">';
                            htm += '<div class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';

                            //htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                            //Modified by Nisha/Vishnu on 13/12/2023
                            //if (data[i].NewText.slice(0, 1) == "*")
                            //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';"><span style="color:red;">*</span>' + data[i].NewText.replace("*", "") + '</label>';
                            //else if (data[i].NewText.slice(-1) == "*")
                            //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText.replace("*", "") + '<span style="color:red;">*</span></label>';
                            //else
                            htm += '<label id="lbl_' + data[i].DataMember + '" style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';

                            htm += '</div>';
                            htm += '<div class="labeltext"style="width:' + data[i].ValueWidth + "%" + ';">';
                            htm += '<textarea readonly id="' + data[i].DataMember + '" onclick="formTextAreaFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur="formTextAreaLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="formTextAreaChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"  style="padding-top:10px;height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';line-height: 130%; background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';' + fontWeight + '"></textarea>';
                            htm += '</div>';
                            htm += '</div>';
                            break;

                        case "label":
                            htm += '<div class="row" style="margin-right: 0px; margin-left: 0px">';
                            htm += '<div  class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';
                            if (data[i].HeaderWidth != 0) {
                                // htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                                htm += '<label id="' + data[i].DataMember + '" style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                            }
                            htm += '</div>';

                            try {
                                LogQry = baseLogQry;
                                //  if (isEditScreen == "yes") {
                                if (executeLog == true) {
                                    if (data[i].DataMember.toLowerCase() == "title") {
                                        if (data[i].ScreenName == currentScreenName) {
                                            Screen_NewText = data[i].NewText;
                                            webAuditLog('Load', data[i].NewText, screeninfo);
                                        }
                                    }
                                }
                                //  }
                            } catch (e) {

                            }

                            htm += '<div  class="labeltext"  style="width:' + data[i].ValueWidth + "%" + ';">';

                            if (data[i].DataMemberType == "DATE") {
                                if (data[i].ShowBorder == "0") {
                                    if (vBackColor == '#ffffff')
                                        htm += '<input type="text" readonly id="' + data[i].DataMember + '" onclick="formTextFieldFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');TextFieldChangeTooltip(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"   style="border:0px;  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:#f0f0f0;font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';background: url(../Images/cal3.png)no-repeat right, #f0f0f0;padding-right:20px;background-size:20px;" />';
                                    else
                                        htm += '<input type="text" readonly id="' + data[i].DataMember + '" onclick="formTextFieldFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');TextFieldChangeTooltip(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"   style="border:0px;  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';background: url(../Images/cal3.png)no-repeat right, #f0f0f0;padding-right:20px;background-size:20px;" />';
                                }
                                else {
                                    if (vBackColor == '#ffffff')
                                        htm += '<input type="text" readonly id="' + data[i].DataMember + '" name="' + data[i].DataMember + '" onclick="formTextFieldFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');TextFieldChangeTooltip(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"   style="background-color:#f0f0f0;height:' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';background: url(../Images/cal3.png)no-repeat right, #f0f0f0;padding-right:20px;background-size:20px;" />';
                                    else
                                        htm += '<input type="text" readonly id="' + data[i].DataMember + '" name="' + data[i].DataMember + '" onclick="formTextFieldFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');TextFieldChangeTooltip(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"   style="background-color:' + vBackColor + ';height:' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';background: url(../Images/cal3.png)no-repeat right, #f0f0f0;padding-right:20px;background-size:20px;" />';
                                }
                            }
                            else {
                                if (data[i].ShowBorder == "0") {
                                    if (vBackColor == '#ffffff')
                                        htm += '<input type="text" readonly id="' + data[i].DataMember + '" onclick="formTextFieldFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');TextFieldChangeTooltip(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"   style="border:0px;  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:#f0f0f0;font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                                    else
                                        htm += '<input type="text" readonly id="' + data[i].DataMember + '" onclick="formTextFieldFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');TextFieldChangeTooltip(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"   style="border:0px;  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                                }
                                else {
                                    if (vBackColor == '#ffffff')
                                        htm += '<input type="text" readonly id="' + data[i].DataMember + '" name="' + data[i].DataMember + '" onclick="formTextFieldFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');TextFieldChangeTooltip(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"   style="background-color:#f0f0f0;height:' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                                    else
                                        htm += '<input type="text" readonly id="' + data[i].DataMember + '" name="' + data[i].DataMember + '" onclick="formTextFieldFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');TextFieldChangeTooltip(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"   style="background-color:' + vBackColor + ';height:' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                                }
                            }

                            htm += '</div>';
                            htm += '</div>';
                            try {
                                if (flg == true && data[i].IsHidden == false) {
                                    flg = false;
                                    nextFocus = data[i].DataMember;
                                }
                            }
                            catch (err) {

                            }
                            break;

                        case "fileupload":
                            htm += '<div class="row" style="margin-right: 0px; margin-left: 0px">';
                            htm += '<div  class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';

                            //htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                            //Modified by Nisha/Vishnu on 13/12/2023
                            //if (data[i].NewText.slice(0, 1) == "*")
                            //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';"><span style="color:red;">*</span>' + data[i].NewText.replace("*", "") + '</label>';
                            //else if (data[i].NewText.slice(-1) == "*")
                            //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText.replace("*", "") + '<span style="color:red;">*</span></label>';
                            //else
                            htm += '<label id="lbl_' + data[i].DataMember + '" style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';

                            htm += '</div>';
                            htm += '<div  class="labeltext" style="width:' + data[i].ValueWidth + "%" + ';">';
                            //htm += '<input id="fileupload" name="myfile" type="file" onblur="formFileUploadLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\')" onchange="formFileUploadLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\')"   accept=".xlsx, .xls, .csv, text/xml,image"  />';
                            htm += '<input id="fileupload" name="myfile" type="file" onclick="formFileUploadFocus(this,\'' + data[i].DataMember + '\',' + i + ')"   onblur="formFileUploadLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\')" onchange="formFileUploadChangeCheck(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"   accept=".xlsx, .xls, .csv, text/xml,image"  />';
                            htm += '<input   id="' + data[i].DataMember + '"  type="hidden"   />';
                            //    htm += '<input id="fileupload" name="myfile" type="file"  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>';
                            //htm += '<input type="submit" value="submit" id="submit" />';
                            htm += '</div>';
                            htm += '</div>';
                            break;

                        case "imageupload":
                            // <input type="file" name="upload" accept="application/pdf,application/vnd.ms-excel" />

                            var acceptType = data[i].DefaultValue == "" || data[i].DefaultValue == null ? 'image/*' : data[i].DefaultValue;
                            // acceptType = "application/pdf";
                            htm += '<div class="row" style="margin-right: 0px; margin-left: 0px">';
                            htm += '<div  class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';

                            //htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                            //Modified by Nisha/Vishnu on 13/12/2023
                            //if (data[i].NewText.slice(0, 1) == "*")
                            //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';"><span style="color:red;">*</span>' + data[i].NewText.replace("*", "") + '</label>';
                            //else if (data[i].NewText.slice(-1) == "*")
                            //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText.replace("*", "") + '<span style="color:red;">*</span></label>';
                            //else
                            htm += '<label id="lbl_' + data[i].DataMember + '" style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';

                            htm += '</div>';
                            htm += '<div  class="labeltext" style="width:' + data[i].ValueWidth + "%" + ';">';
                            // htm += '<input id="fileupload" name="myfile" type="file"   onblur="formFileUploadLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onchange="readURL(this);"   accept="image"  />';

                            htm += '<input style="width: 100%;" id="' + data[i].DataMember + '_1" name="' + data[i].DataMember + '_1" type="file"   onchange="formFileUploadChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"    accept="' + acceptType + '"  />';
                            //  htm += '<input id="' + data[i].DataMember + '" name="' + data[i].DataMember + '" type="file"   onchange="formFileUploadChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"    accept="image/*"  />';
                            htm += '<input    id="' + data[i].DataMember + '"  type="hidden"   />';

                            // htm += '<img id="showImage" src="http://placehold.it/80" alt="" style="max-width: 80px;" />';
                            // htm += '<img id="blah" src="C:\Users\DELL\Desktop\IMG_20180424_203412.jpg" alt="your image" />';
                            // htm += '<input    id="' + data[i].DataMember + '"  type="hidden"   />';
                            htm += '</div>';
                            htm += '</div>';
                            break;
                        case "image":
                            htm += '<div class="row" style="margin-right: 0px; margin-left: 0px">';
                            htm += '<div class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';

                            //htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                            //Modified by Nisha/Vishnu on 13/12/2023
                            //if (data[i].NewText.slice(0, 1) == "*")
                            //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';"><span style="color:red;">*</span>' + data[i].NewText.replace("*", "") + '</label>';
                            //else if (data[i].NewText.slice(-1) == "*")
                            //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText.replace("*", "") + '<span style="color:red;">*</span></label>';
                            //else
                            htm += '<label id="lbl_' + data[i].DataMember + '" style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';

                            htm += '</div>';
                            htm += '<div class="labeltext"style="width:' + data[i].ValueWidth + "%" + ';">';
                            htm += '<img type="image"  src="../Images/noimage.png"  id="' + data[i].DataMember + '" onclick="formImageClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"  style="width:' + data[i].ValueWidth + "%" + ';height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';"></img>';
                            //htm += '<img type="image"  src=""  id="' + data[i].DataMember + '" onclick="formImageClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"  style="height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';"></img>';
                            // htm += '<img id="blah" src="" alt="your image" />';
                            htm += '</div>';
                            htm += '</div>';
                            break;
                        case "timer":
                            mapTimer = data[i].DefaultValue;
                            //htm += '<div class="row" style="margin-right: 0px; margin-left: 0px">';
                            //htm += '<div class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';
                            //htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                            //htm += '</div>';
                            //htm += '<div class="labeltext"style="width:' + data[i].ValueWidth + "%" + ';">';
                            //htm += '<input type="text"   id="' + data[i].DataMember + '"  onclick="formReadonlyClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"  style="height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';background-color:lightgrey"    disabled="true" placeholder="' + requiredMessage + '" class="form-control"  />';
                            //htm += '</div>';
                            //htm += '</div>';
                            break;
                        case "line":
                            htm += '<div class="row" style="margin-right: 0px; margin-left: 0px">';
                            htm += '<div  class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';
                            htm += '</div>';
                            htm += '<div  class="labeltext" style="width:' + data[i].ValueWidth + "%" + ';">';
                            htm += '<hr >';
                            htm += '</div>';
                            htm += '</div>';
                            break;
                        case "option":
                            htm += '<div class="row" style="margin-right: 0px; margin-left: 0px">';
                            htm += '<div  class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';

                            //htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                            //Modified by Nisha/Vishnu on 13/12/2023
                            //if (data[i].NewText.slice(0, 1) == "*")
                            //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';"><span style="color:red;">*</span>' + data[i].NewText.replace("*", "") + '</label>';
                            //else if (data[i].NewText.slice(-1) == "*")
                            //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText.replace("*", "") + '<span style="color:red;">*</span></label>';
                            //else
                            htm += '<label id="lbl_' + data[i].DataMember + '" style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';

                            //if (data[i].IsMandatory == true) htm += '<span id="m_' + data[i].DataMember + '" style="color:red">*</span>';
                            htm += '</div>';
                            htm += '<div  class="labeltext" style="width:' + data[i].ValueWidth + "%" + ';margin-top:5px;">';
                            if (data[i].DataMemberType == "") {
                                htm += '<input type="checkbox" onclick="formCheckBoxValueChanged(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');ClickCheckBoxFunction(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" id="' + data[i].DataMember + '"   style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                            }
                            else {
                                htm += '<input type="checkbox" id="' + data[i].DataMember + '" onclick="formCheckBoxValueChanged(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');ClickCheckBoxFunction(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"  style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                            }
                            htm += '</div>';
                            htm += '</div>';
                            break;
                        case "optionview":
                            htm += '<div class="row" style="margin-right: 0px; margin-left: 0px">';
                            htm += '<div  class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';

                            //htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                            //Modified by Nisha/Vishnu on 13/12/2023
                            //if (data[i].NewText.slice(0, 1) == "*")
                            //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';"><span style="color:red;">*</span>' + data[i].NewText.replace("*", "") + '</label>';
                            //else if (data[i].NewText.slice(-1) == "*")
                            //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText.replace("*", "") + '<span style="color:red;">*</span></label>';
                            //else
                            htm += '<label id="lbl_' + data[i].DataMember + '" style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';

                            //if (data[i].IsMandatory == true) htm += '<span id="m_' + data[i].DataMember + '" style="color:red">*</span>';
                            htm += '</div>';
                            htm += '<div  class="labeltext" style="width:' + data[i].ValueWidth + "%" + ';margin-top:5px;">';
                            if (data[i].DataMemberType == "") {
                                htm += '<input type="checkbox" disabled onclick="formCheckBoxValueChanged(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');ClickCheckBoxFunction(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" id="' + data[i].DataMember + '"   style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                            }
                            else {
                                htm += '<input type="checkbox" disabled id="' + data[i].DataMember + '" onclick="formCheckBoxValueChanged(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');ClickCheckBoxFunction(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"  style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                            }
                            htm += '</div>';
                            htm += '</div>';
                            break;
                        case "combobox":
                            comboboxdata = {};
                            comboboxdata.DataMember = data[i].DataMember;
                            comboboxdata.ScreenName = data[i].ScreenName;
                            comboboxdata.FormListType = "Form";
                            DropDownIdList.push(comboboxdata);
                            //DropDownIdList.push(data[i].DataMember);
                            htm += '<div class="row" style="margin-right: 0px; margin-left: 0px">';
                            htm += '<div  class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';

                            //htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                            //Modified by Nisha/Vishnu on 13/12/2023
                            //if (data[i].NewText.slice(0, 1) == "*")
                            //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';"><span style="color:red;">*</span>' + data[i].NewText.replace("*", "") + '</label>';
                            //else if (data[i].NewText.slice(-1) == "*")
                            //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText.replace("*", "") + '<span style="color:red;">*</span></label>';
                            //else
                            htm += '<label id="lbl_' + data[i].DataMember + '" style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';


                            htm += '</div>';

                            htm += '<div  class="labeltext" style="width:' + data[i].ValueWidth + "%" + ';">';

                            if (ProjectName == "CPF") {
                               // if (data[i].AutoFocus == null || data[i].AutoFocus == 0) {
                                if (vBackColor == '#ffffff') {

                                    if (data[i].TabIndex == null)
                                        htm += '<select id="' + data[i].DataMember + '" onchange="formComboChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\'); DropDownOnchangeFunction(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');DropDownChangeToolTip(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\'); " onclick="comboBoxFormItemClicked(\'' + "" + '\',0,\'' + $('#' + data[i].DataMember).val() + '\',\'' + $('#' + data[i].DataMember).val() + '\',\'' + data[i].ScreenName + '\',\'' + data[i].FieldName + '\',\'' + "" + '\', \'' + data[i].DataMember + '\');" style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:#f0f0f0;font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" >';
                                    else
                                        htm += '<select id="' + data[i].DataMember + '" TabIndex=' + data[i].TabIndex + ' onchange="formComboChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\'); DropDownOnchangeFunction(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');DropDownChangeToolTip(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\'); " onclick="comboBoxFormItemClicked(\'' + "" + '\',0,\'' + $('#' + data[i].DataMember).val() + '\',\'' + $('#' + data[i].DataMember).val() + '\',\'' + data[i].ScreenName + '\',\'' + data[i].FieldName + '\',\'' + "" + '\', \'' + data[i].DataMember + '\');" style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:#f0f0f0;font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" >';

                                }
                                else {
                                    if (data[i].TabIndex == null)
                                        htm += '<select id="' + data[i].DataMember + '" onchange="formComboChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\'); DropDownOnchangeFunction(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');DropDownChangeToolTip(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" onclick="comboBoxFormItemClicked(\'' + "" + '\',0,\'' + $('#' + data[i].DataMember).val() + '\',\'' + $('#' + data[i].DataMember).val() + '\',\'' + data[i].ScreenName + '\',\'' + data[i].FieldName + '\',\'' + "" + '\', \'' + data[i].DataMember + '\');" style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" >';
                                    else
                                        htm += '<select id="' + data[i].DataMember + '" TabIndex=' + data[i].TabIndex + ' onchange="formComboChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\'); DropDownOnchangeFunction(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');DropDownChangeToolTip(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" onclick="comboBoxFormItemClicked(\'' + "" + '\',0,\'' + $('#' + data[i].DataMember).val() + '\',\'' + $('#' + data[i].DataMember).val() + '\',\'' + data[i].ScreenName + '\',\'' + data[i].FieldName + '\',\'' + "" + '\', \'' + data[i].DataMember + '\');" style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" >';

                                }
                                //}
                               // else
                                 //   htm += '<select id="' + data[i].DataMember + '" autofocus onchange="formComboChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\'); DropDownOnchangeFunction(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onclick="comboBoxFormItemClicked(\'' + "" + '\',0,\'' + $('#' + data[i].DataMember).val() + '\',\'' + $('#' + data[i].DataMember).val() + '\',\'' + data[i].ScreenName + '\',\'' + data[i].FieldName + '\',\'' + "" + '\', \'' + data[i].DataMember + '\');" style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" >';
                            }
                            else
                                htm += '<select id="' + data[i].DataMember + '" onchange="formComboChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\'); DropDownOnchangeFunction(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');DropDownChangeToolTip(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" onclick="comboBoxFormItemClicked(\'' + "" + '\',0,\'' + $('#' + data[i].DataMember).val() + '\',\'' + $('#' + data[i].DataMember).val() + '\',\'' + data[i].ScreenName + '\',\'' + data[i].FieldName + '\',\'' + "" + '\', \'' + data[i].DataMember + '\');" style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" >';

                            htm += '</select>';
                            htm += '</div>';
                            htm += '</div>';
                            break;
                        case "comboboxsearch":
                            comboboxdata = {};
                            comboboxdata.DataMember = data[i].DataMember;
                            comboboxdata.ScreenName = data[i].ScreenName;
                            comboboxdata.AutoSearch = "Yes";
                            comboboxdata.FormListType = "Form";
                            DropDownIdList.push(comboboxdata);
                            //DropDownIdList.push(data[i].DataMember);
                            htm += '<div class="row" style="margin-right: 0px; margin-left: 0px">';
                            htm += '<div  class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';

                            //htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                            //Modified by Nisha/Vishnu on 13/12/2023
                            //if (data[i].NewText.slice(0, 1) == "*")
                            //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';"><span style="color:red;">*</span>' + data[i].NewText.replace("*", "") + '</label>';
                            //else if (data[i].NewText.slice(-1) == "*")
                            //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText.replace("*", "") + '<span style="color:red;">*</span></label>';
                            //else
                            htm += '<label id="lbl_' + data[i].DataMember + '" style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';

                            htm += '</div>';

                            htm += '<div  class="labeltext" style="width:' + data[i].ValueWidth + "%" + ';">';
                            htm += '<select id="' + data[i].DataMember + '" onchange="formComboChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\'); DropDownOnchangeFunction(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');DropDownChangeToolTip(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" onclick="comboBoxFormItemClicked(\'' + "" + '\',0,\'' + $('#' + data[i].DataMember).val() + '\',\'' + $('#' + data[i].DataMember).val() + '\',\'' + data[i].ScreenName + '\',\'' + data[i].FieldName + '\',\'' + "" + '\', \'' + data[i].DataMember + '\');" style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" >';
                            htm += '</select>';
                            htm += '</div>';
                            htm += '</div>';

                            
                            break;

                        case "radiobutton":
                            RadioButtonIdList.push(data[i].DataMember);
                            htm += '<div class="row" style="margin-right: 0px; margin-left: 0px">';
                            htm += '<div  class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';

                            //htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                            //Modified by Nisha/Vishnu on 13/12/2023
                            //if (data[i].NewText.slice(0, 1) == "*")
                            //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';"><span style="color:red;">*</span>' + data[i].NewText.replace("*", "") + '</label>';
                            //else if (data[i].NewText.slice(-1) == "*")
                            //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText.replace("*", "") + '<span style="color:red;">*</span></label>';
                            //else
                            htm += '<label id="lbl_' + data[i].DataMember + '" style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                            htm += '</div>';

                            htm += '<div  class="labeltext" style="width:' + data[i].ValueWidth + "%" + ';">';
                            // htm += '<div  id="radio_"' + data[i].DataMember + '"" onclick="formradioButtonValueChanged(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');">';
                            htm += '<div  id="radio_' + data[i].DataMember + '"   onclick="formradioButtonValueChanged(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');">';
                            htm += '</div>';
                            htm += '</div>';
                            htm += '</div>';
                            break;
                        case "listview":
                            CurrentScreen_TabScreen_Name = data[i].ScreenName;
                            //if (TabScreenName != '')
                            //    CurrentScreen_TabScreen_Name = data[i].ScreenName + "_" + TabScreenName;
                            FormListViewFieldName.push(data[i].FieldName);
                            FormListViewTabGroupName.push(TabScreenName);
                            // FormListViewList.push(data[i].FieldName + "$" + TabScreenName);
                            var obj = {};
                            obj.tableId = 'table_' + CurrentScreen_TabScreen_Name + '_' + data[i].FieldName + '';
                            obj.theadId = 'ListHeadDivId_' + CurrentScreen_TabScreen_Name + '_' + data[i].FieldName + '';
                            obj.ttbody = 'ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + data[i].FieldName + '';
                            obj.tfoot = 'ListfootDivId_' + CurrentScreen_TabScreen_Name + '_' + data[i].FieldName + '';
                            obj.screenName = data[i].ScreenName;
                            obj.fieldName = data[i].FieldName;

                            tableList.push(obj);

                            // COMMENTED 01.04.2021
                            var obj1 = {};
                            obj1.tableId = 'table_' + CurrentScreen_TabScreen_Name + '_' + data[i].FieldName + '';
                            obj1.filled = "0"
                            tableList_Filled.push(obj1);


                            // htm += '<div class="row" style="margin-right: 0px; margin-left: 0px">';
                            htm += '<div class="row">';
                            // commented 25.08.2020 ====
                            //htm += '</br>';

                            isUpDown = isFuncUpDown(data[i].ScreenName, data[i].FieldName);

                            if (isUpDown != 0) {
                                htm += '<div style="float: left;width:100%" id="SortMultiListAdd_' + data[i].ScreenName + '_' + data[i].FieldName + '" >';
                                htm += '<a href="#" onclick="return ListView_DownRow_func()" style="float: right; color: red;"><span class="glyphicon glyphicon-download"></span></a>';
                                htm += '<a href="#" onclick="return ListView_UpRow_func()" style="float: right; color: red;"><span class="glyphicon glyphicon-upload"></span></a>';
                                htm += '</div>';
                                htm += '<br />';
                            }


                            var isSearchorSort = isFuncSearchorSort(data[i].ScreenName, data[i].FieldName);
                            if (isSearchorSort != 0) {
                                htm += '</br>';
                                // =================================================================

                                //SortSearchDiv_TodayInvoiceList_LstInvoice

                                //SortDiv_TodayInvoiceList_LstInvoice

                                //SearchDiv_TodayInvoiceList_LstInvoice

                                htm += '<div id="container">';
                                htm += '<div class="sortLeft">';
                                //htm += '<div id="SortSearchDiv_' + data[i].ScreenName + '_' + data[i].FieldName + '" style=" width: 100%;display:none">';
                                //htm += '<div id="SortSearchDiv_' + data[i].ScreenName + '_' + data[i].FieldName + '" class="form-group mx-sm-3 mb-2" style="width: 100%;">';
                                //////////////////new
                                htm += '<div id="SortDiv_' + data[i].ScreenName + '_' + data[i].FieldName + '" style="display: inline-block">';
                                //htm += '<div id="SortDiv_' + data[i].ScreenName + '_' + data[i].FieldName + '" style="width: 50%; display: inline-block; float: left; margin-top: 0px; margin-right: 0px;">';
                                htm += '<div style="display:inline-block;">';
                                htm += 'Sort : ';
                                htm += '</div>';

                                htm += '<div style="display:inline-block;">';

                                //Changes done by vignesh on 10/09/2024
                                //htm += '<select id="SortFieldId_' + data[i].ScreenName + '" onchange="SortControl(\'' + data[i].ScreenName + '\',\'' + obj.ttbody + '\',\'' + obj.tfoot + '\');"></select>';
                                htm += '<select id="SortFieldId_' + data[i].ScreenName + '_' + data[i].FieldName + '" onchange="SortControl(\'' + data[i].ScreenName + '_' + data[i].FieldName + '\',\'' + obj.ttbody + '\',\'' + obj.tfoot + '\');"></select>';

                                htm += '</div>';
                                htm += '<div style="display:inline-block;">';
                                htm += '</div>';
                                htm += '<div id="SortId1_' + data[i].ScreenName + '" style="display:inline-block;">';

                                //Changes done by vignesh on 10/09/2024
                                //htm += '<select id="SortId_' + data[i].ScreenName + '" onchange="SortControl(\'' + data[i].ScreenName + '\',\'' + obj.ttbody + '\',\'' + obj.tfoot + '\');">';
                                htm += '<select id="SortId_' + data[i].ScreenName + '_' + data[i].FieldName + '" onchange="SortControl(\'' + data[i].ScreenName + '_' + data[i].FieldName + '\',\'' + obj.ttbody + '\',\'' + obj.tfoot + '\');">';

                                htm += '<option selected="selected" disabled="true">--Select--</option>';
                                htm += '<option value="ASC">ASC</option>';
                                htm += '<option value="DESC">DESC</option>';
                                htm += '</select>';
                                htm += '</div>';

                                htm += '</div>';
                                htm += '</div>';
                                ///////////////////

                                htm += '<div class="searchRight">';
                                htm += '<div  style="display:inline-block;">';
                                //htm += '<div id="SearchDiv_' + data[i].ScreenName + '_' + data[i].FieldName + '" style="width: 50%; display: inline-block; float: right; margin-top: 0px; margin-right: 0px;display:none">';
                                htm += '<div id="SearchDiv_' + data[i].ScreenName + '_' + data[i].FieldName + '" style="display:inline-block;">';
                                htm += '<div style="display:inline-block;">';
                                htm += 'Search : ';
                                htm += '</div>';

                                htm += '<div style="display:inline-block;">';
                                //htm += '<select id="SearchFieldId_' + data[i].ScreenName + '_' + data[i].FieldName + '" onchange="SetSearchControl(\'' + data[i].ScreenName + '\',\'' + obj.ttbody + '\',\'' + obj.tfoot + '\');"></select>';

                                //Changes done by vignesh on 10/09/2024
                                //htm += '<select id="SearchFieldId_' + data[i].ScreenName + '" onchange="SetSearchControl(\'' + data[i].ScreenName + '\',\'' + obj.ttbody + '\',\'' + obj.tfoot + '\');"></select>';
                                htm += '<select id="SearchFieldId_' + data[i].ScreenName + '_' + data[i].FieldName + '" onchange="SetSearchControl(\'' + data[i].ScreenName + '_' + data[i].FieldName + '\',\'' + obj.ttbody + '\',\'' + obj.tfoot + '\');"></select>';

                                htm += '</div>';

                                //Changes done by Vignesh on 10/09/2024
                                //htm += '<div id="SearchFieldControlTypeDiv_' + data[i].ScreenName + '" style="display:inline-block;">';
                                //htm += '<select id="SearchFieldControlType_' + data[i].ScreenName + '"   style="display:none;">';
                                htm += '<div id="SearchFieldControlTypeDiv_' + data[i].ScreenName + '_' + data[i].FieldName + '" style="display:inline-block;">';
                                htm += '<select id="SearchFieldControlType_' + data[i].ScreenName + '_' + data[i].FieldName + '"   style="display:none;">';

                                //htm += '<option value="=">Equals</option>';
                                //htm += '<option value=">">Greater than</option>';
                                //htm += '<option value=">=">Greater than or equal</option>';
                                //htm += '<option value="<">Less than</option>';
                                //htm += '<option value="<=">Less than or equal</option>';
                                //htm += '<option value="<>">Not equals</option>';
                                htm += '<option selected="selected" disabled="true">--Select--</option>';
                                htm += '<option value="=">=</option>';
                                htm += '<option value=">">></option>';
                                htm += '<option value=">=">>=</option>';
                                htm += '<option value="<"><</option>';
                                htm += '<option value="<="><=</option>';
                                htm += '<option value="<>"><></option>';
                                htm += '</select>';
                                htm += '</div>';

                                //htm += '<div id="SearchOptionId_' + data[i].ScreenName + '" style="width: 40%; display: inline-block; float: right;">';

                                //Changes done by vignesh on 10/09/2024
                                //htm += '<div id="SearchOptionId_' + data[i].ScreenName + '" style="display:inline-block;">';
                                htm += '<div id="SearchOptionId_' + data[i].ScreenName + '_' + data[i].FieldName + '" style="display:inline-block;">';

                                //htm += '<input type="text" id="" />';
                                htm += '<input type="text" id="" placeholder="&#xf002; Search" style="font-family: FontAwesome, Arial; font-style: normal" />';
                                htm += '</div>';

                                htm += '</div>';
                                htm += '</div>';
                                htm += '</div>';
                                htm += '</div>';
                                // =================================================================
                            }

                            // commented 25.08.2020 ====
                            //htm += '<br />';
                            //htm += '<br />';
                            //htm += '<br />';

                            //htm += '<div style="width: 100%">';
                            htm += '<div style="width: 99%;margin:auto">';

                            if (isSearchorSort != 0) {
                                htm += '<div style="float: left;width:100%" id="SortMultiListAdd_' + data[i].ScreenName + '_' + data[i].FieldName + '" >';
                                htm += '<div style="float: right;width:50%" id="SearchMultiListAdd_' + data[i].ScreenName + '_' + data[i].FieldName + '" >';
                                htm += '</div>';
                                htm += '</div>';
                                htm += '<br />';
                            }
                            ///
                            //         <div class="table-responsive table--no-card m-b-30">
                            //<table class="table table-borderless table-striped table-earning">
                            //htm += '<div class="tableDiv_' + CurrentScreen_TabScreen_Name + '_' + data[i].FieldName + '  table-responsive table--no-card m-b-30" style="width: ' + data[i].ValueWidth + "%" + '; overflow-x: auto; height: ' + data[i].ValueHeight + "px" + '; overflow-y: auto;">';
                            //htm += '<table id="table_' + CurrentScreen_TabScreen_Name + '_' + data[i].FieldName + '" class="table table-borderless table-striped table-earning tableId">';
                            //htm += '<div class="tableDiv_' + CurrentScreen_TabScreen_Name + '_' + data[i].FieldName + '" style="width: ' + data[i].ValueWidth + "%" + '; overflow-x: auto; height: ' + data[i].ValueHeight + "px" + '; overflow-y: auto;">';

                            try {
                                var legends = '';
                               // isColorLegend = false;

                                try {
                                    var tmpcolorLegend = colorLegend.filter(x => x.ScreenName == data[i].ScreenName);

                                    for (var p = 0; p < tmpcolorLegend.length; p++) {
                                     //   isColorLegend = true;
                                        var tmpForeColor = argbToRGB(tmpcolorLegend[p].CForeColor);
                                        var tmpBackColor = argbToRGB(tmpcolorLegend[p].CBackColor);
                                        legends += '<td style="color:' + tmpForeColor + ';background-color:' + tmpBackColor + ';border-style:solid;text-align:center;padding:0px 0px 0px 0px;">' + tmpcolorLegend[p].Category + '</td>';
                                    }

                                    console.log('isColorLegend: ' + isColorLegend);
                                }
                                catch (e) {
                                    console.log('isColorLegend error: ' + e);
                                }


                                if (isColorLegend == true)
                                    htm += '<table style="float:right;display:items;border:none;font-size:12px;width:320px;"><tr>' + legends + '</tr></table><br/>';
                            }
                            catch { }

                            htm += '<div id="tableDiv_' + CurrentScreen_TabScreen_Name + '_' + data[i].FieldName + '" class="tableDiv_' + CurrentScreen_TabScreen_Name + '_' + data[i].FieldName + '" style="width: ' + data[i].ValueWidth + "%" + '; margin:auto;overflow:auto; height:300px; ">';
                            htm += '<table id="table_' + CurrentScreen_TabScreen_Name + '_' + data[i].FieldName + '" class="table table-striped table-bordered tableId">';
                            //  htm += '<table id="table_' + data[i].FieldName + '" class="table table-striped table-bordered tableId">';
                            htm += '<thead id="ListHeadDivId_' + CurrentScreen_TabScreen_Name + '_' + data[i].FieldName + '">';
                            htm += '</thead>';
                            htm += '<tbody id="ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + data[i].FieldName + '" >';
                            htm += '</tbody>';
                            htm += '<tfoot id="ListfootDivId_' + CurrentScreen_TabScreen_Name + '_' + data[i].FieldName + '">';
                            htm += '</tfoot>';
                            htm += '</table>';
                            htm += '</div>';
                            htm += '</div>';
                            htm += '</div>';
                            break;
                        case "treeview":
                            htm += '<div class="row" style="margin-right: 0px; margin-left: 0px">';
                            htm += '<div  class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';
                            htm += '</div>';
                            htm += '<div  class="labeltext" style="width:' + data[i].ValueWidth + "%" + ';">';
                            htm += '<div id="ModuleSettingsId"></div>';
                            // htm += '<div id = "' + data[i].DataMember + '" ></div>';
                            htm += '</div>';
                            htm += '</div>';
                            isModuleSettings = true;
                            break;
                            //MULTIPLEPHOTO
                        case "multiplephoto":
                            var acceptType = 'image/*';
                            data[i].DefaultValue
                            _ImgCtrlWidth = 20, _ImgCtrlHeight = 100;
                            if (data[i].DefaultValue != '' && data[i].DefaultValue != null) {
                                var arrImgCtrl = data[i].DefaultValue;
                                if (arrImgCtrl.indexOf('X') > -1) {
                                    arrImgCtrl = arrImgCtrl.split('X');
                                    _ImgCtrlWidth = arrImgCtrl[1];
                                    _ImgCtrlHeight = arrImgCtrl[0];
                                }
                            }

                            htm += '<div class="row" style="margin-right: 0px; margin-left: 0px">';
                            htm += '<div  class="labeltext" style="height: ' + data[i].HeaderHeight + "px" + ';width:' + data[i].HeaderWidth + "%" + ';">';
                            htm += '</div>';
                            htm += '<input type="hidden" id=' + data[i].DataMember + '  />';
                            //  htm += '<input type="hidden" id="ImgCount"  />';
                            htm += '<div  style="overflow: auto; height: ' + data[i].ValueHeight + "px" + ';width:' + data[i].ValueWidth + "%" + '; background:lightgray"   id="' + data[i].DataMember + '_Div">';

                            htm += '<div class="multiplephotoDiv_' + multiPhotoCount + '">';
                            htm += '<input type="file" id=' + data[i].DataMember + '_' + multiPhotoCount + ' name="files" onchange="multiPhotoFileOnChane(this,0,\'' + data[i].DefaultValue.split('X')[0] + '\',\'' + data[i].DefaultValue.split('X')[1] + '\',\'' + data[i].DataMember + '\');"  style="display:none" title="Load File"  accept="' + acceptType + '"/>';
                            htm += '<i class="fa fa-camera" id=' + data[i].DataMember + '_CameraId_' + multiPhotoCount + '  style="font-size:100px;color:black" onclick="cameraButtonClick(\'' + multiPhotoCount + '\',\'' + data[i].DataMember + '\',0);"></i>';
                            htm += '<img   type="image" id="' + data[i].DataMember + '_ImageId_' + multiPhotoCount + '" onclick="multiplephotoclicked(this,\'' + data[i].DataMember + '\',\'' + data[i].DataMember + "_ImageId_" + multiPhotoCount + '\',\'' + "multiplephotoDiv_" + multiPhotoCount + '\',\'' + multiPhotoCount + '\');" style="width:' + data[i].DefaultValue.split('X')[1] + '%;height:' + data[i].DefaultValue.split('X')[0] + 'px; float: left;  padding: 10px; display:none"  src=""   ></img>';
                            htm += '</div>';
                            htm += '</div>';
                            htm += '</div>';
                            break;
                            //case "combobox":
                        case "slider":
                            htm += '<div class="row" style="margin-right: 0px; margin-left: 0px">';
                            htm += '<div class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';

                            //htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                            //Modified by Nisha/Vishnu on 13/12/2023
                            //if (data[i].NewText.slice(0, 1) == "*")
                            //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';"><span style="color:red;">*</span>' + data[i].NewText.replace("*", "") + '</label>';
                            //else if (data[i].NewText.slice(-1) == "*")
                            //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText.replace("*", "") + '<span style="color:red;">*</span></label>';
                            //else
                            htm += '<label id="lbl_' + data[i].DataMember + '" style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';

                            htm += '</div>';
                            htm += '<div  class="labeltext"  style="width:' + data[i].ValueWidth + "%" + ';">';
                            htm += '<div id="slider"></div>';
                            htm += '</div>';
                            htm += '</div>';
                            break;
                        case "mapmarker":
                            isMapMarker = true;
                            mapmarkerdata = {};
                            mapmarkerdata.DataMember = data[i].DataMember;
                            mapmarkerdata.ScreenName = data[i].ScreenName;
                            mapmarkerdata.FormListType = "Form";
                            MapMarkerIdList.push(mapmarkerdata);
                            htm += '<div class="row" style="margin-right: 0px; margin-left: 0px;z-index: 99;" >';
                            htm += '<div  class="labeltext"  style="width:' + data[i].ValueWidth + "%;height:" + data[i].ValueHeight + "px" + ';">';
                            htm += '<div style="z-index: 99;" id="map"></div>';
                            //htm += '<div style="z-index: 99;border:1px solid red;" id="map_' + data[i].DataMember + '" ></div>';

                            //id = "' + data[i].DataMember + '_ImageId_' + multiPhotoCount + '"
                            htm += '</div>';
                            htm += '</div>';
                            //htm += '<div class="row"  >';
                            //htm += '<div  class="labeltext"  style="width:' + data[i].ValueWidth + "%;height:" + data[i].HeaderHeight + "px" + ';">';
                            //htm += '<div   id="map"></div>';
                            //htm += '</div>';
                            //htm += '</div>';
                            break;
                            // case "mapmarker":
                        case "maproute":
                            isMapRoute = true;

                            htm += '<div class="row" style="margin-right: 0px; margin-left: 0px;z-index: 99;" >';
                            htm += '<div  class="labeltext"  style="width:' + data[i].ValueWidth + "%;height:" + data[i].ValueHeight + "px" + ';">';
                            // htm += '<div id="mapRoute"></div>';
                            //todo
                            //htm += '<div id="map"></div>';
                            htm += '<div id="map_canvas" style="width:100%;height:100%;"></div>';
                            //htm += '<div id="map"></div>';
                            htm += '</div>';
                            htm += '</div>';
                            break;
                        case "chart":
                            //  case "label":
                            //htm += '<div class="row" style="margin-right: 0px; margin-left: 0px">';
                            //htm += '<div  class="labeltext" style="width:100%;">';
                            //htm += '<label  style="height:"30px";">' + data[i].NewText + '</label>';
                            //htm += '</div>';
                            //htm += '</div>';
                            //=======================
                            htm += '<div class="row" style="margin-right: 0px; margin-left: 0px">';
                            // htm += '<div  class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';
                            htm += '<div  class="labeltext" style="width:10%;">';
                            htm += '</div>';
                            // htm += '<div  class="labeltext" style="width:' + data[i].ValueWidth + "%" + ';">';
                            htm += '<div  class="labeltext" style="width:10%">';
                            //htm += '<hr >';
                            htm += '</div>';
                            htm += '</div>';
                            var scrName = currentScreenName + '_CHART_' + data[i].FieldName;

                            htm += '<div class="row" style="margin-right: 0px; margin-left: 0px">';
                            // htm += '<div  class="labeltext" style="width:' + data[i].ValueWidth + "%" + ';">';
                            htm += '<div  class="labeltext" style="width:' + data[i].ValueWidth + "%" + ';">';

                            // htm += '<iframe id="iframeId"   src="../Charts' + data[i].DefaultValue + '/index.html"  style="width: ' + data[i].ValueWidth + "%" + '; overflow-x: auto; height: ' + data[i].ValueHeight + "px" + '; "></iframe>';
                            //alert(scrName);
                            //htm += '<iframe id="iframeId"   src="../Charts' + data[i].DefaultValue + '/index.html?' + scrName + '&' + formView1 + '&' + params1 + '"  style="width: ' + data[i].ValueWidth + "%" + '; overflow-x: auto; height: ' + data[i].ValueHeight + "px" + '; "></iframe>';

                            htm += '</div>';
                            htm += '</div>';

                            break;

                        case "button":
                            htm += '<div class="row" style="margin-right: 0px; margin-left: 0px">';
                            htm += '<div  class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';
                            htm += '</div>';
                            htm += '<div  class="labeltext" style="width:' + data[i].ValueWidth + "%" + ';">';


                            if (data[i].NewText.replace(/\s/g, "") == "") {
                                if (ProjectName == "CPF") {
                                    if (data[i].TabIndex == null)
                                        htm += '<input id="Button_' + data[i].DataMember + '" type="button"  value="' + data[i].DefaultText + '"   onclick="formButtonClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"id="' + data[i].DataMember + '" style="width:100%; height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';line-height:none;" />';
                                    else
                                        htm += '<input id="Button_' + data[i].DataMember + '" TabIndex=' + data[i].TabIndex + ' type="button"  value="' + data[i].DefaultText + '"   onclick="formButtonClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"id="' + data[i].DataMember + '" style="width:100%; height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';line-height:none;" />';
                                }
                                else if (ProjectName.toLowerCase() == "pvmb" && currentScreenName.toLowerCase() == "mappickerformnew" && data[i].DataMember == "SubmitBtn") {
                                    htm += '<div class="row"></div><input id="Button_' + data[i].DataMember + '" type="button"  value="' + data[i].DefaultText + '"   onclick="formButtonClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"id="' + data[i].DataMember + '" style="width:100%; height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';line-height:none;" />';

                                }
                                else {
                                    if (data[i].btnIcon == null)
                                        htm += '<Button id="Button_' + data[i].DataMember + '" value="' + data[i].DefaultText + '"   onclick="formButtonClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" style="width:100%; height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';line-height:none;border-radius:5px;" >' + data[i].DefaultText + '</Button>';
                                    else
                                        htm += '<Button id="Button_' + data[i].DataMember + '" value="' + data[i].DefaultText + '"   onclick="formButtonClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" style="width:100%; height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';line-height:none;border-radius:5px;" ><i class="fa fa-' + data[i].btnIcon + '"></i> | ' + data[i].DefaultText + '</Button>';
                                }
                                  //  htm += '<input id="Button_' + data[i].DataMember + '" type="button"  value="' + data[i].DefaultText + '"   onclick="formButtonClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"id="' + data[i].DataMember + '" style="width:100%; height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';line-height:none;" />';
                            }
                            else {
                                if (ProjectName == "CPF") {
                                    if (data[i].TabIndex == null)
                                        htm += '<input id="Button_' + data[i].DataMember + '" type="button"  value="' + data[i].NewText + '"   onclick="formButtonClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"id="' + data[i].DataMember + '" style="width:100%; height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';line-height:none;" />';
                                    else
                                        htm += '<input id="Button_' + data[i].DataMember + '" TabIndex=' + data[i].TabIndex + ' type="button"  value="' + data[i].NewText + '"   onclick="formButtonClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"id="' + data[i].DataMember + '" style="width:100%; height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';line-height:none;" />';
                                }
                                else if (ProjectName.toLowerCase() == "pvmb" && currentScreenName.toLowerCase() == "mappickerformnew" && data[i].DataMember == "SubmitBtn") {
                                    htm += '<div class="row"></div><input id="Button_' + data[i].DataMember + '" type="button"  value="' + data[i].NewText + '"   onclick="formButtonClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"id="' + data[i].DataMember + '" style="width:100%; height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';line-height:none;" />';

                                }
                                else {
                                    if (data[i].btnIcon == null)
                                        htm += '<Button id="Button_' + data[i].DataMember + '" value="' + data[i].DefaultText + '"   onclick="formButtonClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" style="width:100%; height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';line-height:none;border-radius:5px;" >' + data[i].DefaultText + '</Button>';
                                    else
                                    htm += '<Button id="Button_' + data[i].DataMember + '" value="' + data[i].DefaultText + '"   onclick="formButtonClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" style="width:100%; height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';line-height:none;border-radius:5px;" ><i class="fa fa-' + data[i].btnIcon + '"></i> | ' + data[i].DefaultText + '</Button>';
                                    //htm += '<input id="Button_' + data[i].DataMember + '" type="button"  value="' + data[i].NewText + '"   onclick="formButtonClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"id="' + data[i].DataMember + '" style="width:100%; height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';line-height:none;" />';

                                }

                            }

                           

                            //if (ProjectName.toLowerCase() == "pvmb" && currentScreenName.toLowerCase() == "mappickerformnew" && data[i].DataMember == "SubmitBtn") {
                            //    htm += '<input type="button" id="Button_1" value="Screenshot"   onclick="printMap();" id="' + data[i].DataMember + '" style="width:200px; height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';line-height:none;" />';
                               
                            //}

                            htm += '</div>';
                            htm += '</div>';
                            isBtnFormPopUpTable = true;

                            if (ProjectName.toLowerCase() == "pvmb" && currentScreenName.toLowerCase() == "mappickerformnew" && data[i].DataMember == "SubmitBtn") {
                               // htm += '<input type="button" id="Button_1" value="Screenshot"   onclick="printMap();" id="' + data[i].DataMember + '" style="width:200px; height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';line-height:none;" />';
                                htm += '<a id="link" style="display:none;">download</a>';
                                htm += '<div class="row"></div><div class="row" style="margin-right: 0px; margin-left: 0px;height:100px;padding:5px 5px;font-size:13px;" id="dvImg">';
                                htm += '<table><tr><td><center><img src="../Images/Startm.png" height="40px" width="30px"/><br>Start Location</center></td>';
                                htm += '<td><center><img src="../Images/redm.png" height="40px" width="30px"/><br>NonVisited Outlets</center></td>';
                                htm += '<td><center><img src="../Images/greenm.png" height="40px" width="30px"/><br>Outlet Visited & Order within Location</center></td>';
                                htm += '<td><center><img src="../Images/bluem.png" height="40px" width="30px"/><br>Outlet Visited & Order Beyond Location</center></td>';
                                htm += '<td><center><img src="../Images/pinkm.png" height="40px" width="30px"/><br>No Order & Give Exception within Location</center></td>';
                                htm += '<td><center><img src="../Images/yellowm.png" height="40px" width="30px"/><br>No Order & Give Exception Beyond Location</center></td>';
                                htm += '<td><center><img src="../Images/blackm.png" height="40px" width="30px"/><br>GPS OFF</center></td>';
                                //htm += '<td><center><img src="../Images/aquam.png" height="40px" width="30px"/><br>Current Location</center></td>';
                               htm += '<td><center><img src="../Images/Endm.png" height="40px" width="30px"/><br>Current/End Location</center></td>';
                                htm += '</tr></table></div><br/>';
                            }
                            break;
                    }
                }
            }
            else {
                if (data[i].FieldControl.toLowerCase() == "button")
                    htm += '<div  class="row" style="text-align: right;padding-top: 10PX;">';
                else
                    htm += '<div class="row" style="margin-right: 0px; margin-left: 0px">';
                var displayNoCount = 1;
                for (var j = 0; j < displayNoCount; j++) {
                    if (data[i].IsMandatory == true) {
                        IsMandatoryList.push(data[i].DataMember);
                        //  requiredMessage = "Please enter the " + data[i].NewText;
                    }
                    else
                        requiredMessage = '';
                    if (data[i].FieldControl == "TEXTBOX" || data[i].FieldControl == "PASSWORD")
                        requiredMessage = "Enter the " + data[i].NewText.replace('*', '');
                    else if (data[i].FieldControl == "LOOKUP")
                        requiredMessage = "Select the " + data[i].NewText.replace('*', '');
                    else
                        requiredMessage = ""
                    //requiredMessage = ""
                    formdata = {};

                    formdata.screenName = data[i].ScreenName;
                    formdata.fieldName = data[i].FieldName;
                    // formdata.FieldControl = data[i].FieldControl;
                    formdata.fieldControl = data[i].FieldControl;
                    formdata.FieldControl = data[i].FieldControl;
                    formdata.DataMember = data[i].DataMember;
                    formdata.DataMemberType = data[i].DataMemberType;
                    formdata.DefaultText = data[i].DefaultText;
                    formdata.DefaultValue = data[i].DefaultValue;
                    formdata.NewText = data[i].NewText;
                    formDataList.push(formdata);
                    formItems.push(formdata);

                    arrfrm.push(formdata);
                    // formFieldNames.push(data[i].FieldName);
                    formFieldNames.push(data[i].FieldName.toUpperCase());
                    ///

                    dataFieldIdList[data[i].DataMember] = '';
                    FieldNameFormArrayList.push(data[i].DataMember);

                    hForeColor = argbToRGB(data[i].HForeColor);
                    hBackColor = argbToRGB(data[i].HBackColor);
                    hForeColor = '';
                    hBackColor = '';
                    vForeColor = argbToRGB(data[i].VForeColor);
                    vBackColor = argbToRGB(data[i].VBackColor);
                    var dataMemberType = data[i].DataMemberType.toLowerCase();
                    if (dataMemberType != "int" && dataMemberType != "float" && dataMemberType != "decimal" && dataMemberType != "email")
                        dataMemberType = '';
                    else {
                        if (dataMemberType == "int")
                            isDataMemberTypeInt = true;
                        if (dataMemberType == "float")
                            isDataMemberTypeFloat = true;
                        if (dataMemberType == "decimal")
                            isDataMemberTypeDecimal = true;
                        if (dataMemberType == "email")
                            isDataMemberTypeEmail = true;
                    }
                    if (data.length == (i + 1))
                        displayNoCount = 0;
                    else if (data[(i + 1)].DisplayNo.toString().split('.').length >= 1 && data[(i + 1)].DisplayNo.toString().split('.')[0] == displayNo[0])
                        displayNoCount++;
                    else
                        displayNoCount = 0;

                    formDataMember.push(data[i].DataMember);
                    if (data[i].IsHidden == true) {
                        if (data[i].FieldControl.toLowerCase() == "timer")
                            mapTimer = data[i].DefaultValue == "" ? 30 : data[i].DefaultValue;
                        FieldIdList.push(data[i].DataMember + "$" + data[i].FieldControl.toLowerCase() + "$" + dataMemberType + "$" + data[i].IsMandatory);
                        if (data[i].FieldControl.toLowerCase() == "datepicker") {
                            isDateTimePicker = true;
                            DatePickerdata = {};
                            DatePickerdata.FieldControl = data[i].FieldControl;
                            DatePickerdata.DataMember = data[i].DataMember;
                            DatePickerdata.ScreenName = data[i].ScreenName;
                            DatePickerdata.DataMemberType = data[i].DataMemberType;
                            DatePickerdata.FormListType = "Form";
                            DateTimeIdList.push(DatePickerdata);
                            htm += '<input type="hidden" id="' + data[i].DataMember + '" data-act="2020-03-20 00:00:01" class="datepicker"  style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                        }
                        else {
                            //htm += '<div class="labeltext"  style="width:' + data[i].HeaderWidth + "%" + ';">';
                            //htm += '<label></label>';
                            //htm += '</div>';
                            //htm += '<div  class="labeltext"  style="width:' + data[i].ValueWidth + "%" + ';">';
                            htm += '<input type="hidden" id="' + data[i].DataMember + '"   style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                            // htm += '</div>';
                        }

                    }
                    else {
                        FieldIdList.push(data[i].DataMember + "$" + data[i].FieldControl.toLowerCase() + "$" + dataMemberType + "$" + data[i].IsMandatory);

                        switch (data[i].FieldControl.toLowerCase()) {
                            case "tabgroup":
                                isTabGroupExit = false;
                                i = (data.length + 1);
                                GetTabGroupMenuList(id);
                                isTabGroupExit = true;
                                break;
                            case "datepicker":
                                isDateTimePicker = true;
                                DatePickerdata = {};
                                DatePickerdata.FieldControl = data[i].FieldControl;
                                DatePickerdata.DataMember = data[i].DataMember;
                                DatePickerdata.ScreenName = data[i].ScreenName;
                                DatePickerdata.DataMemberType = data[i].DataMemberType;
                                DatePickerdata.FormListType = "Form";
                                DateTimeIdList.push(DatePickerdata);
                                htm += '<div class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';

                                //htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                                //Modified by Nisha/Vishnu on 13/12/2023
                                //if (data[i].NewText.slice(0, 1) == "*")
                                //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';"><span style="color:red;">*</span>' + data[i].NewText.replace("*", "") + '</label>';
                                //else if (data[i].NewText.slice(-1) == "*")
                                //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText.replace("*", "") + '<span style="color:red;">*</span></label>';
                                //else
                                htm += '<label id="lbl_' + data[i].DataMember + '" style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';

                                htm += '</div>';
                                htm += '<div  class="labeltext" style="position:relative;width:' + data[i].ValueWidth + "%" + ';">';

                                if (ProjectName == "CPF") {
                                    if (isDisable == false) {
                                        if (data[i].TabIndex == null)
                                            htm += '<input type="text" autocomplete="off" data-act="2020-03-20 00:00:01" id="' + data[i].DataMember + '" class="datepicker"  onclick="FormDatePickerClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"  style="width:100%;height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';background: url(../Images/cal3.png)no-repeat right;padding-right:20px;background-size:20px;border-radius:5px;"  />';
                                        else
                                            htm += '<input type="text" autocomplete="off" data-act="2020-03-20 00:00:01" id="' + data[i].DataMember + '" TabIndex=' + data[i].TabIndex + ' class="datepicker"  onclick = "FormDatePickerClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"  style = "width:100%;height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';background: url(../Images/cal3.png)no-repeat right;padding-right:20px;background-size:20px;border-radius:5px;" />';
                                    }
                                    else {
                                        if (data[i].TabIndex == null)
                                            htm += '<input type="text" autocomplete="off" data-act="2020-03-20 00:00:01" id="' + data[i].DataMember + '" class="datepicker"  onclick="FormDatePickerClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"  style="width:100%;height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';background: url(../Images/cal3.png)no-repeat right, #f0f0f0;padding-right:20px;background-size:20px;border-radius:5px;" disabled  />';
                                        else
                                            htm += '<input type="text" autocomplete="off" data-act="2020-03-20 00:00:01" id="' + data[i].DataMember + '" TabIndex=' + data[i].TabIndex + ' class="datepicker"  onclick = "FormDatePickerClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"  style = "width:100%;height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';background: url(../Images/cal3.png)no-repeat right, #f0f0f0;padding-right:20px;background-size:20px;border-radius:5px;" disabled />';

                                    }
                                }
                                else {
                                    if (isDisable == false) 
                                        htm += '<input type="text" autocomplete="off" data-act="2020-03-20 00:00:01" id="' + data[i].DataMember + '" class="datepicker"  onclick="FormDatePickerClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"  style="width:100%;height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';background: url(../Images/cal3.png)no-repeat right;padding-right:20px;background-size:20px;border-radius:5px;"  />';
                                    else
                                        htm += '<input type="text" autocomplete="off" data-act="2020-03-20 00:00:01" id="' + data[i].DataMember + '" class="datepicker"  onclick="FormDatePickerClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"  style="width:100%;height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';background: url(../Images/cal3.png)no-repeat right, #f0f0f0;padding-right:20px;background-size:20px;border-radius:5px;" disabled />';
                                    }

                                //htm += '<input type="text"  data-act="2020-03-20 00:00:01" id="' + data[i].DataMember + '" class="datepicker" onchange="FormDatePickerChanged(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" onclick="FormDatePickerClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"  style="width:100%;height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';"  />';
                                htm += '</div>';
                                break;
                            case "timepicker":
                                isTimePicker = true;
                                htm += '<div class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';

                                //htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                                //Modified by Nisha/Vishnu on 13/12/2023
                                //if (data[i].NewText.slice(0, 1) == "*")
                                //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';"><span style="color:red;">*</span>' + data[i].NewText.replace("*", "") + '</label>';
                                //else if (data[i].NewText.slice(-1) == "*")
                                //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText.replace("*", "") + '<span style="color:red;">*</span></label>';
                                //else
                                htm += '<label id="lbl_' + data[i].DataMember + '" style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';

                                htm += '</div>';
                                htm += '<div  class="labeltext" style="position:relative;width:' + data[i].ValueWidth + "%" + ';">';
                                htm += '<input type="text" id="' + data[i].DataMember + '" class="timepicker" onclick="FormDatePickerClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"  style="width:100%;height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';"  />';
                                htm += '</div>';
                                break;
                            case "monthyearpicker":
                                htm += '<div class="labeltext"  style="width:' + data[i].HeaderWidth + "%" + ';">';

                                //htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                                //Modified by Nisha/Vishnu on 13/12/2023
                                //if (data[i].NewText.slice(0, 1) == "*")
                                //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';"><span style="color:red;">*</span>' + data[i].NewText.replace("*", "") + '</label>';
                                //else if (data[i].NewText.slice(-1) == "*")
                                //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText.replace("*", "") + '<span style="color:red;">*</span></label>';
                                //else
                                htm += '<label id="lbl_' + data[i].DataMember + '" style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';

                                htm += '</div>';
                                htm += '<div  class="labeltext"  style="width:' + data[i].ValueWidth + "%" + ';">';
                                htm += '<input type="text" id="' + data[i].DataMember + '" class="monthyearpicker"   style="width:100%;height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                                htm += '</div>';
                                break;
                            case "yearpicker":
                                isYearPicker = true;
                                htm += '<div class="labeltext"  style="width:' + data[i].HeaderWidth + "%" + ';">';

                                //htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                                //Modified by Nisha/Vishnu on 13/12/2023
                                //if (data[i].NewText.slice(0, 1) == "*")
                                //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';"><span style="color:red;">*</span>' + data[i].NewText.replace("*", "") + '</label>';
                                //else if (data[i].NewText.slice(-1) == "*")
                                //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText.replace("*", "") + '<span style="color:red;">*</span></label>';
                                //else
                                htm += '<label id="lbl_' + data[i].DataMember + '" style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';

                                htm += '</div>';
                                htm += '<div  class="labeltext"  style="width:' + data[i].ValueWidth + "%" + ';">';
                                htm += '<select  id="' + data[i].DataMember + '" class="yearpicker" onchange="formComboChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');DropDownChangeToolTip(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"    style="width:100%;height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" >';
                                htm += '</select>';
                                htm += '</div>';
                                break;
                            case "monthpicker":
                                isMonthPicker = true;
                                htm += '<div class="labeltext"  style="width:' + data[i].HeaderWidth + "%" + ';">';

                                //htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                                //Modified by Nisha/Vishnu on 13/12/2023
                                //if (data[i].NewText.slice(0, 1) == "*")
                                //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';"><span style="color:red;">*</span>' + data[i].NewText.replace("*", "") + '</label>';
                                //else if (data[i].NewText.slice(-1) == "*")
                                //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText.replace("*", "") + '<span style="color:red;">*</span></label>';
                                //else
                                htm += '<label id="lbl_' + data[i].DataMember + '" style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';

                                htm += '</div>';
                                htm += '<div  class="labeltext"  style="width:' + data[i].ValueWidth + "%" + ';">';
                                htm += '<select id="' + data[i].DataMember + '" class="monthpicker" onchange="formComboChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');DropDownChangeToolTip(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"   style="  height: ' + data[i].ValueHeight + "px" + ';          font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" >';
                                htm += '</select>';
                                htm += '</div>';
                                break;
                            case "space":
                                htm += '<div class="labeltext"  style="width:' + data[i].HeaderWidth + "%" + ';">';
                                htm += '</div>';
                                htm += '<div  class="labeltext"  style="width:' + data[i].ValueWidth + "%" + ';">';
                                htm += '</div>';
                                break;
                            case "autosuggest_textbox":

                                htm += '<div class="row" style="margin-right: 0px; margin-left: 0px">';
                                htm += '<div class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';

                                //htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                                //Modified by Nisha/Vishnu on 13/12/2023
                                //if (data[i].NewText.slice(0, 1) == "*")
                                //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';"><span style="color:red;">*</span>' + data[i].NewText.replace("*", "") + '</label>';
                                //else if (data[i].NewText.slice(-1) == "*")
                                //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';"><' + data[i].NewText.replace("*", "") + '<span style="color:red;">*</span></label>';
                                //else
                                htm += '<label id="lbl_' + data[i].DataMember + '" style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';

                                htm += '</div>';
                                htm += '<div class="labeltext" style="width:' + data[i].ValueWidth + "%" + ';">';
                                htm += '<div class="input-group" style="width:100%" >';
                                htm += '<input type="text"    id="' + data[i].DataMember + '"  onclick="formAutoCompleteClicked(this,\'' + data[i].DataMember + '\',\'' + $('#' + data[i].DataMember).val() + '\');"  style="width:100%;height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';   "      placeholder="' + requiredMessage + '" class="form-control"  />';
                                // htm += '<input type="text" readonly="true"  id="' + data[i].DataMember + '"  onclick="formReadonlyClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"  style="height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';background-color:lightgrey"    disabled="true" placeholder="' + requiredMessage + '" class="form-control"  />';
                                /* htm += '<span href="#" id="LookUp_' + data[i].DataMember + '"  onchnge="formLookUpChanged(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"  onclick="formLookUpClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\',\'' + data[i].NewText + '\',\'' + data[i].ScreenName + '\'); " class="input-group-addon"> <i class="fa fa-plus"></i>  </span>';*/
                                //htm += '<span href="#" id="LookUp_' + data[i].DataMember + '"  onclick="formLookUpClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\',\'' + data[i].NewText + '\');GetLookUpData(\'' + data[i].DataMember + '\',\'' + data[i].DataMember + '\',\'' + "" + '\');" class="input-group-addon"> <i class="fa fa-plus"></i>  </span>';
                                htm += '</div>';
                                htm += '</div>';
                                htm += '</div>';

                                break;
                            case "textbox":

                                maxCharLength = data[i].MaxCharLength == undefined || data[i].MaxCharLength == null ? "" : data[i].MaxCharLength;
                                htm += '<div class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';

                                //htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                                //Modified by Nisha/Vishnu on 13/12/2023
                                //if (data[i].NewText.slice(0, 1) == "*")
                                //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';"><span style="color:red;">*</span>' + data[i].NewText.replace("*", "") + '</label>';
                                //else if (data[i].NewText.slice(-1) == "*")
                                //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText.replace("*", "") + '<span style="color:red;">*</span></label>';
                                //else
                                htm += '<label id="lbl_' + data[i].DataMember + '" style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';

                                htm += '</div>';
                                htm += '<div class="labeltext"style="width:' + data[i].ValueWidth + "%" + ';">';
                                if (data[i].DataMemberType == "NUMBER") {
                                    if (ProjectName == "CPF") {
                                       // if (data[i].AutoFocus == null || data[i].AutoFocus == 0) {
                                            if (data[i].TabIndex == null)
                                                htm += '<input type="text" maxlength="' + maxCharLength + '" id="' + data[i].DataMember + '"  onkeypress="restrictMinus(event);" onclick="formTextFieldFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="enterformTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');TextFieldChangeTooltip(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" placeholder="' + requiredMessage + '" color:grey ;  style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                                            else
                                                htm += '<input type="text" maxlength="' + maxCharLength + '" TabIndex=' + data[i].TabIndex + ' id = "' + data[i].DataMember + '"  onkeypress = "restrictMinus(event);" onclick = "formTextFieldFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur = "formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup = "enterformTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');TextFieldChangeTooltip(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" placeholder = "' + requiredMessage + '" color: grey; style = "  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" /> ';
                                        //}
                                        //else
                                          //  htm += '<input type="text" maxlength="' + maxCharLength + '" id="' + data[i].DataMember + '" autofocus onkeypress="restrictMinus(event);" onclick="formTextFieldFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="enterformTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" placeholder="' + requiredMessage + '" color:grey ;  style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                                    }
                                    else 
                                        htm += '<input type="text" maxlength="' + maxCharLength + '" id="' + data[i].DataMember + '"  onkeypress="restrictMinus(event);" onclick="formTextFieldFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="enterformTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');TextFieldChangeTooltip(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" placeholder="' + requiredMessage + '" color:grey ;  style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';

                                }
                                else if (data[i].DataMemberType == "INTEGER") {
                                    isDataMemberTypeInt = true;
                                    htm += '<input class="int" type="text" maxlength="' + maxCharLength + '" id="' + data[i].DataMember + '"  onclick="formTextFieldFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="enterformTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');TextFieldChangeTooltip(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" placeholder="' + requiredMessage + '" color:grey ;  style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                                }
                                else {
                                    if (ProjectName == "VIDA") {
                                        if (FirstTextBoxautofocus == "")
                                            htm += '<input type="text" oninput="this.value = this.value.toUpperCase()"  maxlength="' + maxCharLength + '" autofocus id="' + data[i].DataMember + '" onclick="formTextFieldFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="enterformTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');TextFieldChangeTooltip(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" placeholder="' + requiredMessage + '" color:grey ;  style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                                        else
                                            htm += '<input type="text" oninput="this.value = this.value.toUpperCase()"  maxlength="' + maxCharLength + '"  id="' + data[i].DataMember + '" onclick="formTextFieldFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="enterformTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');TextFieldChangeTooltip(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" placeholder="' + requiredMessage + '" color:grey ; style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                                    }
                                    else {
                                        if (FirstTextBoxautofocus == "") {
                                            if (data[i].ScreenName.toLowerCase() == "packerform") {
                                                htm += '<input type="text" maxlength="' + maxCharLength + '" autofocus id="' + data[i].DataMember + '" onclick="formTextFieldFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="enterformTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" placeholder="' + requiredMessage + '" color:grey ; style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                                                if (data[i].FieldName.toLowerCase() == "totebox")
                                                    flg = true;
                                                // nextFocus  = data[i + 1].DataMember;
                                            }
                                            else {
                                                if (ProjectName == "CPF") {
                                                   // if (data[i].AutoFocus == null || data[i].AutoFocus == 0) {
                                                        if (data[i].TabIndex == null)
                                                            htm += '<input type="text" maxlength="' + maxCharLength + '" name="' + data[i].DataMember + '" autofocus id="' + data[i].DataMember + '" onclick="formTextFieldFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="enterformTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');TextFieldChangeTooltip(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" placeholder="' + requiredMessage + '" color:grey ; style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                                                        else
                                                            htm += '<input type="text" maxlength="' + maxCharLength + '" name="' + data[i].DataMember + '" id="' + data[i].DataMember + '" TabIndex=' + data[i].TabIndex + ' onclick="formTextFieldFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="enterformTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');TextFieldChangeTooltip(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" placeholder="' + requiredMessage + '" color:grey ; style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                                                    //}
                                                    //else
                                                      //  htm += '<input type="text" maxlength="' + maxCharLength + '" name="' + data[i].DataMember + '" id="' + data[i].DataMember + '" autofocus onclick="formTextFieldFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="enterformTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" placeholder="' + requiredMessage + '" color:grey ; style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                                                }
                                                else
                                                    htm += '<input type="text" maxlength="' + maxCharLength + '" name="' + data[i].DataMember + '" autofocus id="' + data[i].DataMember + '" onclick="formTextFieldFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="enterformTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');TextFieldChangeTooltip(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" placeholder="' + requiredMessage + '" color:grey ; style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                                            }
                                            //  htm += '<input type="text" maxlength="' + maxCharLength + '" autofocus id="' + data[i].DataMember + '" onclick="formTextFieldFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="enterformTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" placeholder="' + requiredMessage + '" color:grey ; style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                                        }
                                        else {
                                            //htm += '<input type="text" maxlength="' + maxCharLength + '"  id="' + data[i].DataMember + '" onclick="formTextFieldFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="enterformTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" placeholder="' + requiredMessage + '" color:grey ; style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                                            if (ProjectName == "CPF") {
                                                //if (data[i].AutoFocus == null || data[i].AutoFocus == 0) {
                                                    if (data[i].TabIndex == null)
                                                        htm += '<input type="text" maxlength="' + maxCharLength + '"  id="' + data[i].DataMember + '" name="' + data[i].DataMember + '" onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="enterformTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');TextFieldChangeTooltip(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" placeholder="' + requiredMessage + '" color:grey ; style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                                                    else
                                                        htm += '<input type="text" maxlength="' + maxCharLength + '"  id="' + data[i].DataMember + '" TabIndex=' + data[i].TabIndex + ' name="' + data[i].DataMember + '" onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="enterformTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');TextFieldChangeTooltip(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" placeholder="' + requiredMessage + '" color:grey ; style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                                                //}
                                                //else
                                                  //  htm += '<input type="text" maxlength="' + maxCharLength + '"  id="' + data[i].DataMember + '" name="' + data[i].DataMember + '" autofocus onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="enterformTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" placeholder="' + requiredMessage + '" color:grey ; style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                                            }
                                            else
                                                htm += '<input type="text" maxlength="' + maxCharLength + '"  id="' + data[i].DataMember + '" name="' + data[i].DataMember + '" onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="enterformTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');TextFieldChangeTooltip(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" placeholder="' + requiredMessage + '" color:grey ; style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';

                                            if (data[i].FieldName.toLowerCase() == "totebox")
                                                flg = true;
                                        }
                                    }
                                }
                                htm += '</div>';

                                if (FirstTextBoxautofocus == "")
                                    FirstTextBoxautofocus = data[i].DataMember;
                                break;

                            case "password":
                                htm += '<div class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';

                                //htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';width:100%">' + data[i].NewText + '</label>';
                                //Modified by Nisha/Vishnu on 13/12/2023
                                //if (data[i].NewText.slice(0, 1) == "*")
                                //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';"><span style="color:red;">*</span>' + data[i].NewText.replace("*", "") + '</label>';
                                //else if (data[i].NewText.slice(-1) == "*")
                                //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText.replace("*", "") + '<span style="color:red;">*</span></label>';
                                //else
                                htm += '<label id="lbl_' + data[i].DataMember + '" style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';

                                htm += '</div>';
                                //if (WebBrowserName == "InternetExplorer") {
                                //    htm += '<input type="password" id="' + data[i].DataMember + '" onclick="formTextFieldFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" placeholder="' + requiredMessage + '"  style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';width:100%" />';
                                //    // //htm += '<span toggle="#password-field" class="fa fa-fw fa-eye field_icon toggle-password"></span>';
                                //}
                                //else {
                                htm += '<div class="labeltext"style="width:' + data[i].ValueWidth + "%" + ';">';
                                htm += '<input type="password" id="' + data[i].DataMember + '" onclick="formTextFieldFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" placeholder="' + requiredMessage + '"  style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                                htm += '</div>';
                                // }
                                //$("#" + id).append(htm);
                                //htm = '';
                                break;

                            case "link":
                                htm += '<div class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';

                                //htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';width:100%">' + data[i].NewText + '</label>';
                                //Modified by Nisha/Vishnu on 13/12/2023
                                //if (data[i].NewText.slice(0, 1) == "*")
                                //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';"><span style="color:red;">*</span>' + data[i].NewText.replace("*", "") + '</label>';
                                //else if (data[i].NewText.slice(-1) == "*")
                                //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText.replace("*", "") + '<span style="color:red;">*</span></label>';
                                //else
                                htm += '<label id="lbl_' + data[i].DataMember + '" style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';

                                htm += '</div>';
                                htm += '<div class="labeltext"style="width:' + data[i].ValueWidth + "%" + ';margin-top: 1.5%;">';

                                if (currentScreenName.toLowerCase() == "importdataform")
                                    htm += '<a href="../ImportFiles/DownloadFiles/' + data[i].NewText + '.xlsx" style="color: blue" download="">' + data[i].NewText + '.xlsx</a>';
                                //htm += '<a id="' + data[i].DataMember + '"  download style="color: ' + hForeColor + '"> </a>';
                                else
                                    htm += '<a id="' + data[i].DataMember + '"  download ></a>';

                                htm += '</div>';
                                break;
                            case "lookup":

                                htm += '<div class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';

                                //htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                                //Modified by Nisha/Vishnu on 13/12/2023
                                //if (data[i].NewText.slice(0, 1) == "*")
                                //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';"><span style="color:red;">*</span>' + data[i].NewText.replace("*", "") + '</label>';
                                //else if (data[i].NewText.slice(-1) == "*")
                                //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText.replace("*", "") + '<span style="color:red;">*</span></label>';
                                //else
                                htm += '<label id="lbl_' + data[i].DataMember + '" style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                                //htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + MandatoryStarColorChange(data[i].NewText) + '</label>';
                                htm += '</div>';
                                htm += '<div class="labeltext" style="width:' + data[i].ValueWidth + "%" + ';">';

                                htm += '<div class="input-group" id="div_' + data[i].DataMember + '" style="width:100%;">';
                                htm += '<input type="text" readonly="true"  id="' + data[i].DataMember + '" onblur = "formLookUpChanged(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" onfocus = "formLookUpChanged(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"  style="width:100%;height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';background-color:lightgrey"     placeholder="' + requiredMessage + '" class="form-control"  />';

                                if (ProjectName == "CPF") {
                                    if (data[i].TabIndex == null)
                                        htm += '<span href="#" id="LookUp_' + data[i].DataMember + '"  onblur = "formLookUpChanged(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"  onclick="formLookUpClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\',\'' + data[i].NewText + '\',\'' + data[i].ScreenName + '\');" class="input-group-addon"> <i class="fa fa-plus"></i>  </span>';
                                    else
                                        htm += '<span href="#" id="LookUp_' + data[i].DataMember + '" TabIndex=' + data[i].TabIndex + ' onblur = "formLookUpChanged(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"  onclick="formLookUpClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\',\'' + data[i].NewText + '\',\'' + data[i].ScreenName + '\');" class="input-group-addon"> <i class="fa fa-plus"></i>  </span>';
                                }
                                else
                                    htm += '<span href="#" id="LookUp_' + data[i].DataMember + '"  onblur = "formLookUpChanged(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"  onclick="formLookUpClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\',\'' + data[i].NewText + '\',\'' + data[i].ScreenName + '\');" class="input-group-addon"> <i class="fa fa-plus"></i>  </span>';

                                htm += '</div>';
                                htm += '</div>';
                                break;
                            case "autolookup":
                                //case "lookup":
                                autoCompletedata = {};
                                autoCompletedata.DataMember = data[i].DataMember;
                                autoCompletedata.ScreenName = data[i].ScreenName;
                                autoCompletedata.FormListType = "Form";
                                AutoCompleteList.push(autoCompletedata);

                                htm += '<div class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';

                                //htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                                //Modified by Nisha/Vishnu on 13/12/2023
                                //if (data[i].NewText.slice(0, 1) == "*")
                                //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';"><span style="color:red;">*</span>' + data[i].NewText.replace("*", "") + '</label>';
                                //else if (data[i].NewText.slice(-1) == "*")
                                //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText.replace("*", "") + '<span style="color:red;">*</span></label>';
                                //else
                                htm += '<label id="lbl_' + data[i].DataMember + '" style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';

                                htm += '</div>';
                                htm += '<div class="labeltext" style="width:' + data[i].ValueWidth + "%" + ';">';

                                htm += '<div class="input-group" >';
                                //htm += '<input type="text"   id="' + data[i].DataMember + '" onfocus = "formLookUpChanged(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"  style="height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + '; "     class="form-control"  />';
                                htm += '<input type="text"    id="' + data[i].DataMember + '" onfocus = "formLookUpChanged(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" onkeyup="enterformTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" onclick="formReadonlyClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"  style="height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';   "      placeholder="' + requiredMessage + '" class="form-control"  />';
                                htm += '<span href="#" id="LookUp_' + data[i].DataMember + '"  onchange = "formLookUpChanged(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"  onclick="formLookUpClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\',\'' + data[i].NewText + '\',\'' + data[i].ScreenName + '\'); " class="input-group-addon"> <i class="fa fa-plus"></i>  </span>';
                                //htm += '<span href="#" id="LookUp_' + data[i].DataMember + '"  onchnge = "formLookUpChanged(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"  onclick="formLookUpClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\',\'' + data[i].NewText + '\'); " class="input-group-addon"> <i class="fa fa-plus"></i>  </span>';
                                htm += '</div>';
                                htm += '</div>';
                                break;
                            case "autosuggest":
                                //case "lookup":
                                autoCompletedata = {};
                                autoCompletedata.DataMember = data[i].DataMember;
                                autoCompletedata.ScreenName = data[i].ScreenName;
                                autoCompletedata.FormListType = "Form";
                                AutoCompleteList.push(autoCompletedata);

                                htm += '<div class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';

                                //htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                                //Modified by Nisha/Vishnu on 13/12/2023
                                //if (data[i].NewText.slice(0, 1) == "*")
                                //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';"><span style="color:red;">*</span>' + data[i].NewText.replace("*", "") + '</label>';
                                //else if (data[i].NewText.slice(-1) == "*")
                                //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText.replace("*", "") + '<span style="color:red;">*</span></label>';
                                //else
                                htm += '<label id="lbl_' + data[i].DataMember + '" style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';

                                htm += '</div>';
                                htm += '<div class="labeltext" style="width:' + data[i].ValueWidth + "%" + ';">';

                                htm += '<div class="input-group" style="width:100%;" >';
                                //htm += '<input type="text"   id="' + data[i].DataMember + '" onfocus = "formLookUpChanged(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"  style="height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + '; "     class="form-control"  />';
                                htm += '<input type="text"    id="' + data[i].DataMember + '" onfocus = "formLookUpChanged(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" onkeyup="enterformTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" onclick="formReadonlyClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"  style="width:100%;height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';   "      placeholder="' + requiredMessage + '" class="form-control"  />';
                                //htm += '<span href="#" id="LookUp_' + data[i].DataMember + '"  onchange = "formLookUpChanged(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"  onclick="formLookUpClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\',\'' + data[i].NewText + '\',\'' + data[i].ScreenName + '\'); " class="input-group-addon"> <i class="fa fa-plus"></i>  </span>';
                                //htm += '<span href="#" id="LookUp_' + data[i].DataMember + '"  onchnge = "formLookUpChanged(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"  onclick="formLookUpClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\',\'' + data[i].NewText + '\'); " class="input-group-addon"> <i class="fa fa-plus"></i>  </span>';
                                htm += '</div>';
                                htm += '</div>';
                                break;
                            case "lookuptextbox":
                                autoCompletedata = {};
                                autoCompletedata.DataMember = data[i].DataMember;
                                autoCompletedata.ScreenName = data[i].ScreenName;
                                autoCompletedata.FormListType = "Form";
                                AutoCompleteWithText.push(autoCompletedata);

                                htm += '<div class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';

                                //htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                                //Modified by Nisha/Vishnu on 13/12/2023
                                //if (data[i].NewText.slice(0, 1) == "*")
                                //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';"><span style="color:red;">*</span>' + data[i].NewText.replace("*", "") + '</label>';
                                //else if (data[i].NewText.slice(-1) == "*")
                                //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText.replace("*", "") + '<span style="color:red;">*</span></label>';
                                //else
                                htm += '<label id="lbl_' + data[i].DataMember + '" style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';

                                htm += '</div>';
                                htm += '<div class="labeltext" style="width:' + data[i].ValueWidth + "%" + ';">';

                                htm += '<div class="input-group" >';
                                htm += '<input type="text"   id="' + data[i].DataMember + '" onfocus = "formLookUpChanged(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"  style="height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + '; "     class="form-control"  />';

                                //if(data[i].TabIndex == null)
                                    htm += '<span href="#" id="LookUp_' + data[i].DataMember + '"  onchange = "formLookUpChanged(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"  onclick="formLookUpClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\',\'' + data[i].NewText + '\',\'' + data[i].ScreenName + '\'); " class="input-group-addon"> <i class="fa fa-plus"></i>  </span>';
                                //else
                                   // htm += '<span href="#" id="LookUp_' + data[i].DataMember + '" TabIndex=' + data[i].TabIndex + ' onchange = "formLookUpChanged(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"  onclick="formLookUpClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\',\'' + data[i].NewText + '\',\'' + data[i].ScreenName + '\'); " class="input-group-addon"> <i class="fa fa-plus"></i>  </span>';

                                //htm += '<span href="#" id="LookUp_' + data[i].DataMember + '"  onchnge = "formLookUpChanged(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"  onclick="formLookUpClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\',\'' + data[i].NewText + '\'); " class="input-group-addon"> <i class="fa fa-plus"></i>  </span>';
                                htm += '</div>';
                                htm += '</div>';
                                break;

                            case "autosearch":
                                autoCompletedata = {};
                                autoCompletedata.DataMember = data[i].DataMember;
                                autoCompletedata.ScreenName = data[i].ScreenName;
                                autoCompletedata.FormListType = "Form";
                                AutoCompleteList.push(autoCompletedata);

                                htm += '<div class="row" style="margin-right: 0px; margin-left: 0px">';
                                htm += '<div class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';

                                //htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                                //Modified by Nisha/Vishnu on 13/12/2023
                                //if (data[i].NewText.slice(0, 1) == "*")
                                //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';"><span style="color:red;">*</span>' + data[i].NewText.replace("*", "") + '</label>';
                                //else if (data[i].NewText.slice(-1) == "*")
                                //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText.replace("*", "") + '<span style="color:red;">*</span></label>';
                                //else
                                htm += '<label id="lbl_' + data[i].DataMember + '" style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';

                                htm += '</div>';
                                htm += '<div class="labeltext" style="width:' + data[i].ValueWidth + "%" + ';">';
                                htm += '<input  type="text" id="' + data[i].DataMember + '"  onclick="formReadonlyClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"   placeholder="' + requiredMessage + '"  style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';

                                htm += '</div>';
                                htm += '</div>';

                                break;

                            case "textarea":
                                htm += '<div class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';

                                //htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                                //Modified by Nisha/Vishnu on 13/12/2023
                                //if (data[i].NewText.slice(0, 1) == "*")
                                //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';"><span style="color:red;">*</span>' + data[i].NewText.replace("*", "") + '</label>';
                                //else if (data[i].NewText.slice(-1) == "*")
                                //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText.replace("*", "") + '<span style="color:red;">*</span></label>';
                                //else
                                htm += '<label id="lbl_' + data[i].DataMember + '" style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';

                                htm += '</div>';
                                htm += '<div class="labeltext"style="width:' + data[i].ValueWidth + "%" + ';">';
                                htm += '<textarea id="' + data[i].DataMember + '" onclick="formTextAreaFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur="formTextAreaLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="formTextAreaChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"  style="padding-top:10px;height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';line-height: 130%; background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';"></textarea>';
                                htm += '</div>';
                                break;
                            case "barcode":
                                htm += '<div class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';

                                //htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                                //Modified by Nisha/Vishnu on 13/12/2023
                                //if (data[i].NewText.slice(0, 1) == "*")
                                //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';"><span style="color:red;">*</span>' + data[i].NewText.replace("*", "") + '</label>';
                                //else if (data[i].NewText.slice(-1) == "*")
                                //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText.replace("*", "") + '<span style="color:red;">*</span></label>';
                                //else
                                htm += '<label id="lbl_' + data[i].DataMember + '" style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';

                                htm += '</div>';
                                htm += '<div class="labeltext"style="width:' + data[i].ValueWidth + "%" + ';">';
                                htm += '<svg class="barcodesvg" id="' + data[i].DataMember + '" style="padding-top:10px;height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';line-height: 130%; background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';"></svg>';
                                htm += '</div>';
                                break;

                            case "labelarea":
                                var fontWeight = GetFontStyle(data[i].VFontStyle);
                                htm += '<div class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';

                                //htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                                //Modified by Nisha/Vishnu on 13/12/2023
                                //if (data[i].NewText.slice(0, 1) == "*")
                                //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';"><span style="color:red;">*</span>' + data[i].NewText.replace("*", "") + '</label>';
                                //else if (data[i].NewText.slice(-1) == "*")
                                //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText.replace("*", "") + '<span style="color:red;">*</span></label>';
                                //else
                                htm += '<label id="lbl_' + data[i].DataMember + '" style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';

                                htm += '</div>';
                                htm += '<div class="labeltext"style="width:' + data[i].ValueWidth + "%" + ';">';
                                htm += '<textarea readonly id="' + data[i].DataMember + '" onclick="formTextAreaFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur="formTextAreaLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="formTextAreaChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"  style="padding-top:10px;height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';line-height: 130%; background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';' + fontWeight + '"></textarea>';
                                htm += '</div>';
                                break;
                            case "label":

                                try {
                                    LogQry = baseLogQry;
                                    //  if (isEditScreen == "yes") {
                                    if (executeLog == true) {
                                        if (data[i].DataMember.toLowerCase() == "title") {
                                            if (data[i].ScreenName == currentScreenName) {
                                                Screen_NewText = data[i].NewText;
                                                webAuditLog('Load', data[i].NewText, screeninfo);
                                            }
                                        }
                                    }
                                    //  }
                                } catch (e) {

                                }

                                htm += '<div  class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';
                                if (data[i].HeaderWidth != 0) {
                                    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                                }
                                htm += '</div>';
                                if (data[i].ValueWidth != 0) {
                                    htm += '<div class="labeltext"style="width:' + data[i].ValueWidth + "%" + ';">';

                                    if (data[i].DataMemberType == "DATE") {
                                        if (data[i].ShowBorder == "0") {
                                            if (vBackColor == '#ffffff')
                                                htm += '<input readonly type="text" id="' + data[i].DataMember + '" onclick="formTextFieldFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');TextFieldChangeTooltip(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"   style="border:0px;  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:#f0f0f0;font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';background: url(../Images/cal3.png)no-repeat right, #f0f0f0;padding-right:20px;background-size:20px;" />';
                                            else
                                                htm += '<input readonly type="text" id="' + data[i].DataMember + '" onclick="formTextFieldFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');TextFieldChangeTooltip(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"   style="border:0px;  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';background: url(../Images/cal3.png)no-repeat right, #f0f0f0;padding-right:20px;background-size:20px;" />';
                                        }
                                        else {
                                            if (vBackColor == '#ffffff')
                                                htm += '<input readonly type="text" id="' + data[i].DataMember + '" name="' + data[i].DataMember + '" onclick="formTextFieldFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');TextFieldChangeTooltip(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"   style="background-color:#f0f0f0;height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';background: url(../Images/cal3.png)no-repeat right, #f0f0f0;padding-right:20px;background-size:20px;" />';
                                            else
                                                htm += '<input readonly type="text" id="' + data[i].DataMember + '" name="' + data[i].DataMember + '" onclick="formTextFieldFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');TextFieldChangeTooltip(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"   style="background-color:' + vBackColor + ';height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';background: url(../Images/cal3.png)no-repeat right, #f0f0f0;padding-right:20px;background-size:20px;" />';
                                        }
                                    }
                                    else {
                                        if (data[i].ShowBorder == "0") {
                                            if (vBackColor == '#ffffff')
                                                htm += '<input readonly type="text" id="' + data[i].DataMember + '" onclick="formTextFieldFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');TextFieldChangeTooltip(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"   style="border:0px;  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:#f0f0f0;font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                                            else
                                                htm += '<input readonly type="text" id="' + data[i].DataMember + '" onclick="formTextFieldFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');TextFieldChangeTooltip(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"   style="border:0px;  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                                        }
                                        else {
                                            if (vBackColor == '#ffffff')
                                                htm += '<input readonly type="text" id="' + data[i].DataMember + '" name="' + data[i].DataMember + '" onclick="formTextFieldFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');TextFieldChangeTooltip(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"   style="background-color:#f0f0f0;height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                                            else
                                                htm += '<input readonly type="text" id="' + data[i].DataMember + '" name="' + data[i].DataMember + '" onclick="formTextFieldFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');TextFieldChangeTooltip(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"   style="background-color:' + vBackColor + ';height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                                        }
                                    }

                                    htm += '</div>';
                                    try {
                                        if (flg == true && data[i].IsHidden == false) {
                                            flg = false;
                                            nextFocus = data[i].DataMember;
                                        }
                                    }
                                    catch (err) {

                                    }
                                }
                                else {
                                    htm += '<input readonly type="hidden" id="' + data[i].DataMember + '" onclick="formTextFieldFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onblur="formTextFieldLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"onkeyup="formTextFieldChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"  style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                                }

                                

                                break;

                            case "fileupload":
                                htm += '<div class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';

                                //htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                                //Modified by Nisha/Vishnu on 13/12/2023
                                //if (data[i].NewText.slice(0, 1) == "*")
                                //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';"><span style="color:red;">*</span>' + data[i].NewText.replace("*", "") + '</label>';
                                //else if (data[i].NewText.slice(-1) == "*")
                                //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText.replace("*", "") + '<span style="color:red;">*</span></label>';
                                //else
                                htm += '<label id="lbl_' + data[i].DataMember + '" style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';

                                htm += '</div>';
                                htm += '<div class="labeltext"style="width:' + data[i].ValueWidth + "%" + ';">';
                                htm += '<input id="fileupload" name="myfile" type="file" onclick="formFileUploadFocus(this,\'' + data[i].DataMember + '\',' + i + ')"   onchange="formFileUploadChangeCheck(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"  onblur="formFileUploadLostFocus(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\')"    accept=".xlsx, .xls, .csv, text/xml,image"  />';
                                htm += '<input   id="' + data[i].DataMember + '"  type="hidden"   />';
                                htm += '</div>';
                                break;
                            case "imageupload":
                                // <input type="file" name="upload" accept="application/pdf,application/vnd.ms-excel" />
                                var acceptType = data[i].DefaultValue == "" || data[i].DefaultValue == null ? 'image/*' : data[i].DefaultValue;
                                //var acceptType = data[i].DefaultValue == "" ? 'image/*' : data[i].DefaultValue;
                                // acceptType = "application/pdf";
                                htm += '<div  class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';

                                //htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                                //Modified by Nisha/Vishnu on 13/12/2023
                                //if (data[i].NewText.slice(0, 1) == "*")
                                //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';"><span style="color:red;">*</span>' + data[i].NewText.replace("*", "") + '</label>';
                                //else if (data[i].NewText.slice(-1) == "*")
                                //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText.replace("*", "") + '<span style="color:red;">*</span></label>';
                                //else
                                htm += '<label id="lbl_' + data[i].DataMember + '" style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';

                                htm += '</div>';
                                htm += '<div  class="labeltext" style="width:' + data[i].ValueWidth + "%" + ';">';


                                htm += '<input  style="width: 100%;display:none;" id="' + data[i].DataMember + '_1" name="' + data[i].DataMember + '_1" type="file"   onchange="formFileUploadChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"    accept="' + acceptType + '"  />';
                                htm += '<Button value="Browse..." id="' + data[i].DataMember + '_btn" onclick="openImageUpload(this);" style="height:' + data[i].HeaderHeight + 'px;font-size:18px;width:100px;box-shadow: 0 5px #999;border-radius:5px;background-color:white;"" ><i class="fa fa-cloud-upload"></i> upload</Button>';

                                htm += '<input    id="' + data[i].DataMember + '"  type="hidden"   />';
                                htm += '</div>';
                                break;
                            case "image":
                                htm += '<div class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';

                                //htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                                //Modified by Nisha/Vishnu on 13/12/2023
                                //if (data[i].NewText.slice(0, 1) == "*")
                                //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';"><span style="color:red;">*</span>' + data[i].NewText.replace("*", "") + '</label>';
                                //else if (data[i].NewText.slice(-1) == "*")
                                //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText.replace("*", "") + '<span style="color:red;">*</span></label>';
                                //else
                                htm += '<label id="lbl_' + data[i].DataMember + '" style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';

                                htm += '</div>';
                                htm += '<div class="labeltext"style="width:' + data[i].ValueWidth + "%" + ';">';
                                htm += '<img type="image"  src="../Images/noimage.png"  id="' + data[i].DataMember + '" onclick="formImageClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"  style="height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';"></img>';
                                // htm += '<img id="blah" src="" alt="your image" />';
                                htm += '</div>';

                                break;

                            case "timer":
                                mapTimer = data[i].DefaultValue;
                                break;
                            case "line":
                                htm += '<div  class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';
                                htm += '</div>';
                                htm += '<div  class="labeltext" style="width:' + data[i].ValueWidth + "%" + ';">';
                                htm += '<hr >';
                                htm += '</div>';
                                break;
                            case "option":
                                htm += '<div  class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';

                                //htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                                //Modified by Nisha/Vishnu on 13/12/2023
                                //if (data[i].NewText.slice(0, 1) == "*")
                                //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';"><span style="color:red;">*</span>' + data[i].NewText.replace("*", "") + '</label>';
                                //else if (data[i].NewText.slice(-1) == "*")
                                //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText.replace("*", "") + '<span style="color:red;">*</span></label>';
                                //else
                                htm += '<label id="lbl_' + data[i].DataMember + '" style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';

                                htm += '</div>';
                                htm += '<div class="labeltext" style="width:' + data[i].ValueWidth + "%" + ';margin-top:5px;">';
                                if (data[i].DataMemberType == "") {
                                    htm += '<input type="checkbox" onclick="formCheckBoxValueChanged(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');ClickCheckBoxFunction(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\')" id="' + data[i].DataMember + '"   style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                                }
                                else {
                                    htm += '<input type="checkbox" id="' + data[i].DataMember + '" onclick="formCheckBoxValueChanged(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');ClickCheckBoxFunction(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\')"  style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                                }
                                htm += '</div>';
                                break;

                            case "optionview":
                                htm += '<div  class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';

                                //htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                                //Modified by Nisha/Vishnu on 13/12/2023
                                //if (data[i].NewText.slice(0, 1) == "*")
                                //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';"><span style="color:red;">*</span>' + data[i].NewText.replace("*", "") + '</label>';
                                //else if (data[i].NewText.slice(-1) == "*")
                                //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText.replace("*", "") + '<span style="color:red;">*</span></label>';
                                //else
                                htm += '<label id="lbl_' + data[i].DataMember + '" style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';

                                htm += '</div>';
                                htm += '<div class="labeltext" style="width:' + data[i].ValueWidth + "%" + ';margin-top:5px;">';
                                if (data[i].DataMemberType == "") {
                                    htm += '<input type="checkbox" disabled onclick="formCheckBoxValueChanged(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');ClickCheckBoxFunction(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\')" id="' + data[i].DataMember + '"   style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                                }
                                else {
                                    htm += '<input type="checkbox" disabled id="' + data[i].DataMember + '" onclick="formCheckBoxValueChanged(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');ClickCheckBoxFunction(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\')"  style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                                }
                                htm += '</div>';
                                break;
                            case "combobox":
                                comboboxdata = {};
                                comboboxdata.DataMember = data[i].DataMember;
                                comboboxdata.ScreenName = data[i].ScreenName;
                                comboboxdata.FormListType = "Form";
                                DropDownIdList.push(comboboxdata);
                                //DropDownIdList.push(data[i].DataMember);
                                htm += '<div  class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';
                                //htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + MandatoryStarColorChange(data[i].NewText) + '</label>';

                                //htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                                //Modified by Nisha/Vishnu on 13/12/2023
                                //if (data[i].NewText.slice(0, 1) == "*")
                                //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';"><span style="color:red;">*</span>' + data[i].NewText.replace("*", "") + '</label>';
                                //else if (data[i].NewText.slice(-1) == "*")
                                //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText.replace("*", "") + '<span style="color:red;">*</span></label>';
                                //else
                                htm += '<label id="lbl_' + data[i].DataMember + '" style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';

                                htm += '</div>';
                                htm += '<div  class="labeltext" style="width:' + data[i].ValueWidth + "%" + ';">';

                               
                                if (ProjectName == "CPF") {
                                    if (vBackColor == '#ffffff') {
                                        // if (data[i].AutoFocus == null || data[i].AutoFocus == 0) {
                                        if (data[i].TabIndex == null)
                                            htm += '<select id="' + data[i].DataMember + '" onchange="formComboChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');DropDownOnchangeFunction(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');comboBoxFormItemClicked(\'' + "" + '\',0,\'' + $('#' + data[i].DataMember).val() + '\',\'' + $('#' + data[i].DataMember).val() + '\',\'' + data[i].ScreenName + '\',\'' + data[i].FieldName + '\',\'' + "" + '\', \'' + data[i].DataMember + '\');DropDownChangeToolTip(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"  style="height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:#f0f0f0;font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" >';
                                        else
                                            htm += '<select id="' + data[i].DataMember + '" TabIndex=' + data[i].TabIndex + ' onchange="formComboChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');DropDownOnchangeFunction(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');comboBoxFormItemClicked(\'' + "" + '\',0,\'' + $('#' + data[i].DataMember).val() + '\',\'' + $('#' + data[i].DataMember).val() + '\',\'' + data[i].ScreenName + '\',\'' + data[i].FieldName + '\',\'' + "" + '\', \'' + data[i].DataMember + '\');DropDownChangeToolTip(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"  style="height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:#f0f0f0;font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" >';
                                        //}
                                        //else
                                        //  htm += '<select id="' + data[i].DataMember + '" autofocus onchange="formComboChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');DropDownOnchangeFunction(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');comboBoxFormItemClicked(\'' + "" + '\',0,\'' + $('#' + data[i].DataMember).val() + '\',\'' + $('#' + data[i].DataMember).val() + '\',\'' + data[i].ScreenName + '\',\'' + data[i].FieldName + '\',\'' + "" + '\', \'' + data[i].DataMember + '\');"  style="height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" >';
                                    }
                                    else {
                                        if (data[i].TabIndex == null)
                                            htm += '<select id="' + data[i].DataMember + '" onchange="formComboChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');DropDownOnchangeFunction(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');comboBoxFormItemClicked(\'' + "" + '\',0,\'' + $('#' + data[i].DataMember).val() + '\',\'' + $('#' + data[i].DataMember).val() + '\',\'' + data[i].ScreenName + '\',\'' + data[i].FieldName + '\',\'' + "" + '\', \'' + data[i].DataMember + '\');DropDownChangeToolTip(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"  style="height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" >';
                                        else
                                            htm += '<select id="' + data[i].DataMember + '" TabIndex=' + data[i].TabIndex + ' onchange="formComboChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');DropDownOnchangeFunction(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');comboBoxFormItemClicked(\'' + "" + '\',0,\'' + $('#' + data[i].DataMember).val() + '\',\'' + $('#' + data[i].DataMember).val() + '\',\'' + data[i].ScreenName + '\',\'' + data[i].FieldName + '\',\'' + "" + '\', \'' + data[i].DataMember + '\');DropDownChangeToolTip(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"  style="height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" >';

                                    }

                                    }
                                    else
                                    htm += '<select id="' + data[i].DataMember + '" onchange="formComboChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');DropDownOnchangeFunction(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');comboBoxFormItemClicked(\'' + "" + '\',0,\'' + $('#' + data[i].DataMember).val() + '\',\'' + $('#' + data[i].DataMember).val() + '\',\'' + data[i].ScreenName + '\',\'' + data[i].FieldName + '\',\'' + "" + '\', \'' + data[i].DataMember + '\');DropDownChangeToolTip(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"  style="height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" >';
                                

                                htm += '</select>';
                                htm += '</div>';
                                break;
                            case "multiselectcombobox":
                                //case "combobox":
                                isMultiSelectCombobox = true;
                                comboboxdata = {};
                                comboboxdata.DataMember = data[i].DataMember;
                                comboboxdata.ScreenName = data[i].ScreenName;
                                comboboxdata.FormListType = "Form";
                                DropDownIdList.push(comboboxdata);
                                //DropDownIdList.push(data[i].DataMember);
                                htm += '<div  class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';

                                //htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                                //Modified by Nisha/Vishnu on 13/12/2023
                                //if (data[i].NewText.slice(0, 1) == "*")
                                //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';"><span style="color:red;">*</span>' + data[i].NewText.replace("*", "") + '</label>';
                                //else if (data[i].NewText.slice(-1) == "*")
                                //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText.replace("*", "") + '<span style="color:red;">*</span></label>';
                                //else
                                htm += '<label id="lbl_' + data[i].DataMember + '" style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';

                                htm += '</div>';
                                htm += '<div  class="labeltext" style="width:' + data[i].ValueWidth + "%" + ';">';
                                htm += '<select  multiple size=2 class="labeltext select2"   id="' + data[i].DataMember + '" onchange="formComboChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');DropDownOnchangeFunction(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');comboBoxFormItemClicked(\'' + "" + '\',0,\'' + $('#' + data[i].DataMember).val() + '\',\'' + $('#' + data[i].DataMember).val() + '\',\'' + data[i].ScreenName + '\',\'' + data[i].FieldName + '\',\'' + "" + '\', \'' + data[i].DataMember + '\');"  style="height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" >';
                                htm += '</select>';
                                htm += '</div>';
                                break;
                            case "comboboxsearch":
                                comboboxdata = {};
                                comboboxdata.DataMember = data[i].DataMember;
                                comboboxdata.ScreenName = data[i].ScreenName;
                                comboboxdata.AutoSearch = "Yes";
                                comboboxdata.FormListType = "Form";
                                DropDownIdList.push(comboboxdata);
                                //DropDownIdList.push(data[i].DataMember);
                                htm += '<div  class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';

                                //htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                                //Modified by Nisha/Vishnu on 13/12/2023
                                //if (data[i].NewText.slice(0, 1) == "*")
                                //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';"><span style="color:red;">*</span>' + data[i].NewText.replace("*", "") + '</label>';
                                //else if (data[i].NewText.slice(-1) == "*")
                                //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText.replace("*", "") + '<span style="color:red;">*</span></label>';
                                //else
                                htm += '<label id="lbl_' + data[i].DataMember + '" style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';

                                htm += '</div>';
                                htm += '<div  class="labeltext" style="width:' + data[i].ValueWidth + "%" + ';">';
                                htm += '<select id="' + data[i].DataMember + '" onchange="formComboChange(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');DropDownOnchangeFunction(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');comboBoxFormItemClicked(\'' + "" + '\',0,\'' + $('#' + data[i].DataMember).val() + '\',\'' + $('#' + data[i].DataMember).val() + '\',\'' + data[i].ScreenName + '\',\'' + data[i].FieldName + '\',\'' + "" + '\', \'' + data[i].DataMember + '\');DropDownChangeToolTip(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"  style="height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" >';
                                htm += '</select>';
                                htm += '</div>';
                                break;
                            case "radiobutton":
                                RadioButtonIdList.push(data[i].DataMember);
                                htm += '<div  class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';

                                //htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                                //Modified by Nisha/Vishnu on 13/12/2023
                                //if (data[i].NewText.slice(0, 1) == "*")
                                //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';"><span style="color:red;">*</span>' + data[i].NewText.replace("*", "") + '</label>';
                                //else if (data[i].NewText.slice(-1) == "*")
                                //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText.replace("*", "") + '<span style="color:red;">*</span></label>';
                                //else
                                htm += '<label id="lbl_' + data[i].DataMember + '" style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';

                                htm += '</div>';
                                htm += '<div  class="labeltext" style="width:' + data[i].ValueWidth + "%" + ';">';
                                htm += '<div  id="radio_' + data[i].DataMember + '"  onclick="formradioButtonValueChanged(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');">';
                                htm += '</div>';
                                htm += '</div>';
                                break;
                            case "listview":

                                CurrentScreen_TabScreen_Name = data[i].ScreenName;
                                FormListViewFieldName.push(data[i].FieldName);
                                FormListViewTabGroupName.push(TabScreenName);
                                var obj = {};
                                obj.tableId = 'table_' + CurrentScreen_TabScreen_Name + '_' + data[i].FieldName + '';
                                obj.theadId = 'ListHeadDivId_' + CurrentScreen_TabScreen_Name + '_' + data[i].FieldName + '';
                                obj.ttbody = 'ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + data[i].FieldName + '';
                                obj.tfoot = 'ListfootDivId_' + CurrentScreen_TabScreen_Name + '_' + data[i].FieldName + '';
                                obj.screenName = data[i].ScreenName;
                                obj.fieldName = data[i].FieldName;
                                tableList.push(obj);

                                // COMMENTED 01.04.2021
                                var obj1 = {};
                                obj1.tableId = 'table_' + CurrentScreen_TabScreen_Name + '_' + data[i].FieldName + '';
                                obj1.filled = "0"
                                tableList_Filled.push(obj1);

                                //htm += '<div  class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';
                                //new
                                htm += '<div  class="labeltext" style="width:' + data[i].ValueWidth + "%" + ';">';
                                //todo
                                // htm += '<div  class="labeltext" style="width:50%";">';





                                htm += '<div style="width: 100%">';

                                htm += '<div style="width: 50%; display: inline-block; float: left">';
                                htm += '<div id="DynamicButtonId_' + data[i].ScreenName + '" style="width: 20%; display: inline-block;margin-left: 15px; display:none;" onclick="AddDynamicList(\'' + data[i].ScreenName + '\',\'' + "ListBodyDivId_" + CurrentScreen_TabScreen_Name + "_" + data[i].FieldName + '\',\'' + data[i].FieldName + '\');">';
                                htm += '<input type="button"  value="+"   style="height: 30px; width: 25%;" />';
                                htm += '</div>';
                                htm += '</div>';

                                //htm += '<div id="SearchDiv_' + data[i].ScreenName + '" style="width: 50%; display: inline-block; float: right; margin-top: 0px; margin-right: 0px;display:none">';
                                //============================================================

                                if (isSearchorSort != 0) {
                                    htm += '<div id="SearchDiv_' + data[i].ScreenName + '_' + data[i].FieldName + '" style="width: 50%; display: inline-block; float: right; margin-top: 0px; margin-right: 0px;display:none">';
                                    htm += '<div style="width: 20%; display: inline-block;">';
                                    htm += 'Search : ';
                                    htm += '</div>';

                                    htm += '<div style="width: 38%; display: inline-block; ">';
                                    htm += '<select id="SearchFieldId_' + data[i].ScreenName + '" onchange="SetSearchControl(\'' + data[i].ScreenName + '\',\'' + obj.ttbody + '\',\'' + obj.tfoot + '\');"></select>';
                                    htm += '</div>';
                                    htm += '<div id="SearchOptionId_' + data[i].ScreenName + '" style="width: 40%; display: inline-block; float: right;">';
                                    htm += '<input type="text" id="" />';
                                    htm += '</div>';

                                    htm += '</div>';
                                }



                                var isSearchorSort = isFuncSearchorSort(data[i].ScreenName, data[i].FieldName);
                                if (isSearchorSort != 0) {
                                    htm += '<div id="SearchDiv_' + data[i].ScreenName + '_' + data[i].FieldName + '" style="width: 50%; display: inline-block; float: right; margin-top: 0px; margin-right: 0px;display:none">';
                                    htm += '<div style="width: 20%; display: inline-block;">';
                                    htm += 'Search : ';
                                    htm += '</div>';

                                    htm += '<div style="width: 38%; display: inline-block; ">';
                                    htm += '<select id="SearchFieldId_' + data[i].ScreenName + '" onchange="SetSearchControl(\'' + data[i].ScreenName + '\',\'' + obj.ttbody + '\',\'' + obj.tfoot + '\');"></select>';
                                    htm += '</div>';
                                    htm += '<div id="SearchOptionId_' + data[i].ScreenName + '" style="width: 40%; display: inline-block; float: right;">';
                                    htm += '<input type="text" id="" />';
                                    htm += '</div>';

                                    htm += '</div>';
                                }

                                htm += '</div>';

                                //htm += '<br />';
                                //htm += '<br />';
                                //htm += '<br />';
                                if (isSearchorSort != 0) {
                                    htm += '<div style="width: 100%">';
                                    htm += '<div id="SearchMultiListAdd_' + data[i].ScreenName + '_' + data[i].FieldName + '" >';
                                    htm += '</div>';
                                    htm += '</div>';
                                }


                                //htm += '<br />';
                                ///
                                //todo
                                // htm += '<div class="tableDiv_' + CurrentScreen_TabScreen_Name + '_' + data[i].FieldName + '" style="width: ' + data[i].ValueWidth + "%" + '; overflow-x: auto; height: ' + data[i].ValueHeight + "px" + '; overflow-y: auto;">';
                                //htm += '<div class="tableDiv_' + CurrentScreen_TabScreen_Name + '_' + data[i].FieldName + '" style="width:50%" ; overflow-x: auto; height: ' + data[i].ValueHeight + "px" + '; overflow-y: auto;">';
                                //new
                                //htm += '<div class="tableDiv_' + CurrentScreen_TabScreen_Name + '_' + data[i].FieldName + '" style="width:99%  ; overflow-x: auto; height: ' + data[i].ValueHeight + "px" + '; overflow-y: auto;">';

                                try {
                                    var legends = '';
                                  //  isColorLegend = false;

                                    try {
                                        var tmpcolorLegend = colorLegend.filter(x => x.ScreenName == data[i].ScreenName);

                                        for (var p = 0; p < tmpcolorLegend.length; p++) {
                                         //   isColorLegend = true;
                                            var tmpForeColor = argbToRGB(tmpcolorLegend[p].CForeColor);
                                            var tmpBackColor = argbToRGB(tmpcolorLegend[p].CBackColor);
                                            legends += '<td style="color:' + tmpForeColor + ';background-color:' + tmpBackColor + ';border- tyle:solid;;text-align:center;padding:0px 0px 0px 0px;">' + tmpcolorLegend[p].Category + '</td>';
                                        }

                                        console.log('isColorLegend: ' + isColorLegend);
                                    }
                                    catch (e) {
                                        console.log('isColorLegend error: ' + e);
                                    }


                                    if (isColorLegend == true)
                                        htm += '<table style="float:right;display:items;border:none;font-size:12px;width:320px;"><tr>' + legends + '</tr></table><br/>';
                                }
                                catch { }

                                htm += '<div id="tableDiv_' + CurrentScreen_TabScreen_Name + '_' + data[i].FieldName + '" class="tableDiv_' + CurrentScreen_TabScreen_Name + '_' + data[i].FieldName + '" style="width:99%;overflow:auto;height:300px;">';
                                htm += '<table id="table_' + CurrentScreen_TabScreen_Name + '_' + data[i].FieldName + '" class="table table-striped table-bordered tableId">';
                                //  htm += '<table id="table_' + data[i].FieldName + '" class="table table-striped table-bordered tableId">';
                                htm += '<thead id="ListHeadDivId_' + CurrentScreen_TabScreen_Name + '_' + data[i].FieldName + '">';
                                htm += '</thead>';
                                htm += '<tbody id="ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + data[i].FieldName + '" >';
                                htm += '</tbody>';
                                htm += '<tfoot id="ListfootDivId_' + CurrentScreen_TabScreen_Name + '_' + data[i].FieldName + '">';
                                htm += '</tfoot>';
                                htm += '</table>';
                                htm += '</div>';

                                htm += '</div>';


                                ////////////////////////////////
                                break;

                            case "slider":
                                htm += '<div class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';

                                //htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                                //Modified by Nisha/Vishnu on 13/12/2023
                                //if (data[i].NewText.slice(0, 1) == "*")
                                //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';"><span style="color:red;">*</span>' + data[i].NewText.replace("*", "") + '</label>';
                                //else if (data[i].NewText.slice(-1) == "*")
                                //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText.replace("*", "") + '<span style="color:red;">*</span></label>';
                                //else
                                htm += '<label id="lbl_' + data[i].DataMember + '" style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';

                                htm += '</div>';
                                htm += '<div  class="labeltext"  style="width:' + data[i].ValueWidth + "%" + ';">';
                                htm += '<div id="slider"></div>';
                                htm += '</div>';
                                break;
                            case "mapmarker":
                                isMapMarker = true;
                                mapmarkerdata = {};
                                mapmarkerdata.DataMember = data[i].DataMember;
                                mapmarkerdata.ScreenName = data[i].ScreenName;
                                mapmarkerdata.FormListType = "Form";
                                MapMarkerIdList.push(mapmarkerdata);
                                htm += '<div  class="labeltext"  style="width:' + data[i].ValueWidth + "%;height:" + data[i].ValueHeight + "px" + ';">';
                                htm += '<div style="z-index: 99;width: 98%;margin-left: 8px" id="map"></div>';
                                htm += '</div>';
                                //htm += '<div  class="labeltext"  style="width:' + data[i].ValueWidth + "%;height:" + data[i].HeaderHeight + "px" + ';">';
                                //htm += '<div   id="map"></div>';
                                //htm += '</div>';
                                break;
                                //case "mapmarker":
                            case "maproute":
                                isMapRoute = true;
                                htm += '<div  class="labeltext"  style="width:' + data[i].ValueWidth + "%;height:" + data[i].ValueHeight + "px" + ';">';
                                // htm += '<div id="mapRoute"></div>';
                                //htm += '<div id="map"></div>';
                                htm += '<div id="map_canvas" style="width:100%;height:100%;"></div>';
                                htm += '</div>';
                                break;

                            case "chart":
                                htm += '<div  class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';border-style:solid;border-color:grey;border-width:2px;">';
                                htm += '<center><label  style="height: ' + data[i].HeaderHeight + "px" + ';">' + data[i].NewText + '</label></center>';
                                htm += '<br>';
                                htm += '<div>';

                                var scrName = currentScreenName + '_CHART_' + data[i].FieldName;
                                // setCookie('FormView', ReplaceSpecialCharacter(JSON.stringify(FormView)));
                                var formView1 = JSON.stringify(FormView);
                                var params1 = JSON.stringify(Params);
                                formView1 = formView1.replace(/"/g, '@#');
                                params1 = params1.replace(/"/g, '@#');
                                htm += '<iframe id="iframeId"   src="../Charts' + data[i].DefaultValue + '/index.html?' + scrName + '&' + formView1 + '&' + params1 + '"  style="border:none;width: ' + data[i].ValueWidth + "%" + '; overflow-x: auto; height: ' + data[i].ValueHeight + "px" + '; "></iframe>';
                                htm += '</div>';
                                htm += '</div>';
                                // htm += '<br>';
                                break;

                            case "button":
                                htm += '<div  class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';
                                htm += '</div>';
                                htm += '<div  class="labeltext" style="width:' + data[i].ValueWidth + "%" + ';">';

                                if (data[i].NewText.replace(/\s/g, "") == "") {

                                    if (ProjectName == "CPF") {
                                        if (data[i].TabIndex == null)
                                            htm += '<input type="button" id="Button_' + data[i].DataMember + '" value="' + data[i].DefaultText + '"   onclick="formButtonClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" style="width:100%; height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';line-height:none;" />';
                                        else
                                            htm += '<input type="button" id="Button_' + data[i].DataMember + '" TabIndex=' + data[i].TabIndex + ' value="' + data[i].DefaultText + '"   onclick="formButtonClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" style="width:100%; height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';line-height:none;" />';
                                    }
                                    else {
                                        if (data[i].btnIcon == null)
                                            htm += '<Button id="Button_' + data[i].DataMember + '" value="' + data[i].DefaultText + '"   onclick="formButtonClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" style="width:100%; height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';line-height:none;border-radius:5px;" >' + data[i].DefaultText + '</Button>';
                                        else
                                            htm += '<Button id="Button_' + data[i].DataMember + '" value="' + data[i].DefaultText + '"   onclick="formButtonClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" style="width:100%; height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';line-height:none;border-radius:5px;" ><i class="fa fa-' + data[i].btnIcon + '"></i> | ' + data[i].DefaultText + '</Button>';
                                    }
                                        //htm += '<input type="button" id="Button_' + data[i].DataMember + '" value="' + data[i].DefaultText + '"   onclick="formButtonClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" style="width:100%; height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';line-height:none;" />';

                                }
                                else {
                                    if (ProjectName == "CPF") {
                                        if (data[i].TabIndex == null)
                                            htm += '<input type="button" id="Button_' + data[i].DataMember + '" value="' + data[i].NewText + '"   onclick="formButtonClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" style="width:100%; height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';line-height:none;" />';
                                        else
                                            htm += '<input type="button" id="Button_' + data[i].DataMember + '" TabIndex=' + data[i].TabIndex + ' value="' + data[i].NewText + '"   onclick="formButtonClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" style="width:100%; height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';line-height:none;" />';
                                    }
                                    else {
                                        if (data[i].btnIcon == null)
                                            htm += '<Button id="Button_' + data[i].DataMember + '" value="' + data[i].DefaultText + '"   onclick="formButtonClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" style="width:100%; height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';line-height:none;border-radius:5px;" >' + data[i].DefaultText + '</Button>';
                                        else
                                            htm += '<Button id="Button_' + data[i].DataMember + '" value="' + data[i].DefaultText + '"   onclick="formButtonClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" style="width:100%; height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';line-height:none;border-radius:5px;" ><i class="fa fa-' + data[i].btnIcon + '"></i> | ' + data[i].DefaultText + '</Button>';

                                        // htm += '<input type="button" id="Button_' + data[i].DataMember + '" value="' + data[i].NewText + '"   onclick="formButtonClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" style="width:100%; height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';line-height:none;" />';
                                    }

                                }

                                

                                //if (ProjectName.toLowerCase() == "pvmb" && currentScreenName.toLowerCase() == "mappickerformnew" && data[i].DataMember == "SubmitBtn") {
                                //    htm += '<input type="button" id="Button_1" value="Screenshot"   onclick="printMap();" id="' + data[i].DataMember + '" style="width:200px; height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';line-height:none;" />';
                                    
                                //}

                                htm += '</div>';
                                isBtnFormPopUpTable = true;

                                if (ProjectName.toLowerCase() == "pvmb" && currentScreenName.toLowerCase() == "mappickerformnew" && data[i].DataMember == "DownloadBtn") {
                                  //  htm += '<input type="button" id="Button_1" value="Screenshot"   onclick="printMap();" id="' + data[i].DataMember + '" style="width:200px; height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';line-height:none;" />';
                                    htm += '<a id="link" style="display:none;">download</a>';
                                    htm += '<br/><div class="row"></div><br/><div class="row" style="margin-right: 0px; margin-left: 0px;height:100px;padding:5px 5px;font-size:13px;" id="dvImg">';
                                    htm += '<table><tr><td><center><img src="../Images/Startm.png" height="40px" width="30px"/><br>Start Location</center></td>';
                                    htm += '<td><center><img src="../Images/redm.png" height="40px" width="30px"/><br>NonVisited Outlets</center></td>';
                                    htm += '<td><center><img src="../Images/greenm.png" height="40px" width="30px"/><br>Outlet Visited & Order within Location</center></td>';
                                    htm += '<td><center><img src="../Images/bluem.png" height="40px" width="30px"/><br>Outlet Visited & Order Beyond Location</center></td>';
                                    htm += '<td><center><img src="../Images/pinkm.png" height="40px" width="30px"/><br>No Order & Give Exception within Location</center></td>';
                                    htm += '<td><center><img src="../Images/yellowm.png" height="40px" width="30px"/><br>No Order & Give Exception Beyond Location</center></td>';
                                    htm += '<td><center><img src="../Images/blackm.png" height="40px" width="30px"/><br>GPS OFF</center></td>';
                                    //htm += '<td><center><img src="../Images/aquam.png" height="40px" width="30px"/><br>Current Location</center></td>';
                                    htm += '<td><center><img src="../Images/Endm.png" height="40px" width="30px"/><br>Current/End Location</center></td>';
                                    htm += '</tr></table></div><br/>';
                                }

                                break;
                        }
                    }
                    if (displayNoCount != 0)
                        i++;
                }
                htm += '</div>';
            }
        }
    }

    if (isTabGroupExit == false) {
        formFieldIdList["FormConfig_" + scrn] = formDataList;
        _objArray.arrForm = arrfrm;
        if (TabGroupList.length >= 1) {
            htm += '</div>';
        }
        // COMMENTED 06.01.2021 FOR 4TH LEVEL PAGE
        //htm += '</div>';
        htm += '</div>';
        //vida salesorder void issue multitimes open - 07.07.2023
        if (ispopupContainerThirdLevel == false) {
            htm += '<div id="popupdialog_Container_ThirdLevel" class="class_popupdialog_Container_ThirdLevel"></div>';
            ispopupContainerThirdLevel = true;
        }
        htm += '</div>';


        _lookUphtm = htm;
        $("#" + id).append(htm);


        if (isDataMemberTypeInt == true) {
            isDataMemberTypeInt = false;
            intOnly();
        }
        if (isDataMemberTypeFloat == true) {
            isDataMemberTypeFloat = false;
            floatOnly();
        }
        if (isDataMemberTypeDecimal == true) {
            isDataMemberTypeDecimal = false;
            decimalOnly();
        }
        if (isDataMemberTypeEmail == true) {
            isDataMemberTypeEmail = false;
            emailOnly();
        }
        //numbersOnly();
        if (isDateTimePicker == true) {
            isDateTimePicker = false;
            if (ProjectName == "pokka")
                DatePicker("No");
            else
                DatePicker();
            DateTimeCheckId.push(DateTimeIdList);
            DateTimeIdList = [];
        }
        if (isTimePicker == true) {
            isTimePicker = false;
            TimePicker();
        }
        if (isMonthPicker == true) {
            isMonthPicker = false;
            MonthPicker();
        }
        if (isYearPicker == true) {
            isYearPicker = false;
            YearPicker();
        }
        if (isMapMarker == true) {
            isMapMarker = false;
            // COMMENTED FOR TESTING PURPUSE
            initMapMarker();
            //if (MapMarkerIdList.length > 0) {
            //    GetMapMarker();
            //}
        }
        if (isMapRoute == true) {
            isMapRoute = false;
            // initMapRoute();
            initialize();////mapRoute.js
            // initMapWaypointsDirections();
        }
        if (DropDownIdList.length > 0) {
            //Commented by Vignesh on 26/08/2024 for Ticket 28134
            //if (isActionCreate != "edit")
                GetDropDownListValue(scrn, "Form");

               DropDownIdList = [];
        }
        if (isMultiSelectCombobox == true) {
            select2();
            isMultiSelectCombobox = false;
        }

        if (AutoCompleteList.length > 0) {
            GetAutoCompleteFormValue(scrn, "Form");
           // AutoCompleteList = [];
        }


        //if (AutoCompleteWithText.length > 0) {
        //    AutoCompleteList = AutoCompleteWithText;
        //    GetAutoCompleteFormValue(scrn, "Form");
        //    AutoCompleteWithText = [];
        //    AutoCompleteList = [];
        //}


        if (ReadOnlyFieldList.length > 0)
            EnableReadOnlyField(scrn);
        if (RadioButtonIdList.length > 0)
            GetRadioButtonListValue(scrn);

        // 26.08.2020 Wednesday ========================================================================
        //if (tableList.length > 0 && scrn.toString().toLowerCase() != "web_dashboard".toString().toLowerCase()) {
        if (tableList.length > 0) {
            // COMMNETED 22.03.2021
            if (isActionCreate != "edit")
                GetFormListViewListNew();
        }
        // 26.08.2020 Wednesday ========================================================================

        if (isModuleSettings == true) {
            ModuleConfig();
            isModuleSettings = false;
        }

    }
    else {
        isTabGroupExit = false;
        // COMMENTED 06.01.2021 FOR 4THLEVEL PAGE
        //htm += '</div>';
        if (ispopupContainerThirdLevel == false) {
            htm += '<div id="popupdialog_Container_ThirdLevel" class="class_popupdialog_Container_ThirdLevel"></div>';
            ispopupContainerThirdLevel = true;
        }
        //htm += '<div id="popupdialog_Container_ThirdLevel" class="class_popupdialog_Container_ThirdLevel"></div></div>';
        htm += '</div>';
        $("#" + id).append(htm);


        // COMMENTED 22.03.2021 =======================================
        // BELOW CODE IS COMMENTED ====================================
        if (tableList.length > 0) {
            // COMMENTED 01.04.2021
            GetFormListViewListNew();
        }
        // BELOW CODE IS COMMENTED ====================================
        // COMMENTED 22.03.2021 =======================================



        if (isModuleSettings == true) {
            ModuleConfig();
            isModuleSettings = false;
        }
    }

    PageLoadinginfo("FormConfig function end");



}

function MandatoryStarColorChange(str) {
    if (str.slice(-1) == "*") {
        str = str.replace('*', '') + '<span style="color: red;"> *</span>';
    }
    return str;
}


function colWidth(LableWidth, TextboxWidth) {
    var result = 6;
    var width = 100 / (LableWidth + TextboxWidth);
    holeValue = Math.floor(width);
    if (holeValue == 1) {
        result = 12;
    }
    else if (holeValue == 2) {
        result = 6;
    }
    else if (holeValue == 3) {
        result = 4;
    }
    else if (holeValue == 4) {
        result = 3;
    }
    else if (holeValue == 5) {
        result = 2;
    }
    else if (holeValue == 6) {
        result = 2;
    }
    else if (holeValue == 12) {
        result = 1;
    }
    else {
        result;
    }
    return result;
}
function EnableReadOnlyField() {
    for (var i = 0; i < ReadOnlyFieldList.length; i++) {
        //  $('#' + ReadOnlyFieldList[i]).attr("readonly", true);
        $('#' + ReadOnlyFieldList[i]).attr("disabled", true);
        $('#' + ReadOnlyFieldList[i]).css('background-color', 'lightgrey');
    }
}

var buttonTextId = '';
var lookUpTextId2 = '';
var url_saveForm = '';


function ClickClearFuncton() {
    ActionConfigEvent("", "", screenName, "", "Clear");
    if (returnData.replace(" ", "") == '') {
        $('#FormDivId input:text').val('');
        $('#FormDivId').children().find('select').each(function () {
            $(this).val('');
        });
    }
}

var CopyFromToIdArrayList = [];
var CopyFromIdArrayList = [];
var CopyToIdArrayList = [];
function ClickCheckBoxFunction(data, id, count) {

    if (currentScreenName.toString().toLowerCase().trim() == "peppolform" &&
            id.toString().toLowerCase().trim() == "authorize" && $("#Authorize")[0].checked == true) {
        document.getElementById("UserImage").style.display = "none";
        document.getElementById("Image_1").value = "";
        return;
    }
    else if (currentScreenName.toString().toLowerCase().trim() == "peppolform" &&
            id.toString().toLowerCase().trim() == "authorize" && $("#Authorize")[0].checked == false) {
        document.getElementById("UserImage").style.display = "block";
        document.getElementById("Image_1").value = "";
        return;
    }
    else {
        return;
    }


    var scrName = TabScreenName == '' ? currentScreenName : currentScreenName + "_" + TabScreenName;
    if ($('#' + id).is(':checked') && CopyFromToIdArrayList.length == 0) {
        $.ajax({
            type: 'POST',
            url: url_GetFormToCopyFields,
            data: { ScreenName: scrName, id: id },
            dataType: 'json',
            async: false,
            success: function (data) {
                if (data != null) {
                    CopyFromToIdArrayList = data;
                    AssignFromToData(1); //1 means From id to To Id assign data
                    //for (var i = 0; i < data.length; i++) {
                    //    $('#' + data[i].CopyTo).val($('#' + data[i].CopyFrom).val());
                    //    CopyFromIdArrayList.push(data[i].CopyFrom);
                    //    CopyToIdArrayList.push(data[i].CopyTo);
                    //}
                }
            }
        });
    }
    else {
        if (CopyFromToIdArrayList.length > 0 && $('#' + id).is(':checked')) {
            AssignFromToData(1); //1 means From id to To Id assign data
        }
        else {
            AssignFromToData(0); //0 means  To Id Clear data
        }

    }
}

function AssignFromToData(val) {
    for (var i = 0; i < CopyFromToIdArrayList.length; i++) {
        if (val == 1) {
            if (CopyFromToIdArrayList[i].CopyFrom == "Address3" || CopyFromToIdArrayList[i].CopyFrom == "Address4" || CopyFromToIdArrayList[i].CopyFrom == "City")
                $('#' + CopyFromToIdArrayList[i].CopyTo).val($('#' + CopyFromToIdArrayList[i].CopyFrom + ' option:selected').text());
            else
                $('#' + CopyFromToIdArrayList[i].CopyTo).val($('#' + CopyFromToIdArrayList[i].CopyFrom).val());
        }
        else
            $('#' + CopyFromToIdArrayList[i].CopyTo).val('');
    }
}


function Emailvalidation() {
    var re = /^\w+([-+.'][^\s]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    var emailFormat = re.test($("#email").val());
    if (re.test($("#email").val()) == false)
        alert("not valid e mail addess");
}
var _lookUpId = '';
function GetLookUpData(lookUpId, id1, id2) {
    //  var scrName = lookUpId;
    var screenName = currentScreenName;
    var scrName = TabScreenName == '' ? screenName + "_FORM_LOOKUP_" + lookUpId : screenName + "_" + TabScreenName + "_FORM_LOOKUP_" + lookUpId
    _lookUpId = id1;
    buttonTextId = id1;
    lookUpTextId2 = id2;

    assignDataToObject(screenName);

    if (screenName == "CustomerPrice") {
        if ($("input:radio[name='SalesType']:checked").val() == undefined) {
            $('#dialog').dialog('close');
            $('#messageDialog').dialog('open');
            $('#messageDialogId').text('Please select the sales type');
            return false;
        }
        else {
            scrName = $("input:radio[name='SalesType']:checked").val().replace(" ", "");
            if (scrName.toLowerCase() == "customers" || scrName.toLowerCase() == "pricegroup") {
                _lookUpId = scrName;
                GetGridHeaderDetails(url_GetListConfig, url_GetListValue, "ListPopUpHeadDivId", "ListPopUpBodyDivId", "ListPopUpfootDivId", scrName);
            }
            else {
                $('#dialog').dialog('close');
                $('#' + _lookUpId).val('');
            }
        }
    }
    else {
        // FormListConfigHeader("ListPopUpHeadDivId", "ListPopUpBodyDivId", "ListPopUpfootDivId", scrName, ''/*fieldName*/, url_GetListConfig);
        //GetGridHeaderDetails("ListPopUpHeadDivId", "ListPopUpBodyDivId", "ListPopUpfootDivId", scrName);
    }

    // GetSearchConfig(scrName);

    //todoo
    // $('#dialog').dialog({ title: "" + lookUpId + " Details" }).dialog('open');
    $('#dialogHiddenId').css("display", "none");



    //

    var htm = '<table width="100%" border="1" cellpadding="1">';
    htm += '<tr>';
    htm += '<th scope="col" class="dialog" title="Example1"> <p>Example1</p>';
    htm += '</th>';
    htm += '<th scope="col" class="dialog" > <p>Example2</p>';
    htm += '</th>';
    htm += '</tr>';
    htm += '<tr>';
    htm += '<td class="dialog" ><p>Example3</p></td>';
    htm += '<td class="dialog" ><p>Example4</p></td>';
    htm += '</tr>';
    htm += '</table>';
}

var dynamicData = '';
function DynamicForm() {
    $("#DynamicFormDivId").empty();

    FieldIdList = [];
    $.ajax({
        type: 'POST',
        url: url_GetTabGroupFormList,
        data: { ScreenName: screenName, id: 'DYNAMIC' },
        dataType: 'json',
        async: false,
        success: function (data) {
            dynamicData = data;
            if (data != null) {
                AddDynamicHeader();
                AddDynamic();

            }
        }
    });
}
var dynamicCnt = -1;
function AddCustomerAgent() {

    dynamicCnt++;
    var htm = '';
    //  htm += '<div style="width: 100%">';
    htm += '<div class="row"  id="dynamic_' + dynamicCnt + '">';

    for (var i = 0; i < dynamicData.length; i++) {
        htm += '<div class="labeltext" style="width:25%;">';
        htm += '<input    type="text" id=""  />';
        htm += '</div>';
    }
    htm += '<div class="labeltext" style="width:5%;">';
    htm += '<input    type="button"   onclick="AddCustomerAgent();"  value="Add" style="background-color:Green;height:30px;"/>';
    htm += '</div>';
    htm += '<div class="labeltext" style="width:10%;">';
    htm += '<input    type="button"  onclick="RemoveDynamic(' + dynamicCnt + ');"  value="Remove"style="background-color:red;height:30px;"/>';
    htm += '</div>';

    htm += '</div>';
    // htm += '</div>';

    $("#DynamicFormDivId").append(htm);
}

function RemoveDynamic(cnt) {
    $('#dynamic_' + cnt).remove();
}



function AddDynamicHeader() {
    dynamicCnt = -1;
    var data = dynamicData;

    var htmlHeader = '';
    htmlHeader += '<div style="width: 100%">';
    htmlHeader += '<div class="row" style="margin-right: 0px; margin-left: 0px">';
    for (var i = 0; i < data.length; i++) {
        if (i > 0) {
            htmlHeader += '<div class="labeltext"style="width:1%;">';
            htmlHeader += '</div>';
        }

        htmlHeader += '<div class="labeltext" style="width:30%;">';
        htmlHeader += data[i].NewText;
        htmlHeader += '</div>';
    }
    htmlHeader += '</div>';
    htmlHeader += '</div>';
    $("#DynamicFormDivId").append(htmlHeader);
}
var salesAgentId = '';
var FieldName = '';
function DropDownOnchangeFunction(id, onchange) {

    if (currentScreenName == "ModuleSettingsForm") {
        GetUserAccessList();
    }
    else {
        if (onchange == "TargetAttributes" && FieldName == "List3") {
            FieldName = "List1";
        }
        var _obj = {};
        _obj.fieldName = 'TempTableDelete';
        PerformAction('listTextFieldLostFocus', _obj);

        //dataFieldIdList['Channel'] = $('#Channel').val();
        //dataFieldIdList['IOM_Month'] = $('#IOM_Month').val();
        //dataFieldIdList['IOM_Year'] = $('#IOM_Year').val();

        


        if (_objArray.arrForm == undefined)
            return;

        for (var i = 0; i < _objArray.arrForm.length; i++) {
            fieldControl = _objArray.arrForm[i].fieldControl;
            id = _objArray.arrForm[i].DataMember;
            if (fieldControl != "LISTVIEW" && id != "") {
                //textvalue = fieldControl == "LABEL" ? $('#' + id).text() : $('#' + id).val();
                //FormView[id] = textvalue;

                if (fieldControl == "LABEL") {
                    textvalue = $('#' + id).val();
                }
                else if (fieldControl == "COMBOBOX") {
                    if (currentScreenName == "RouteListReportForm") {
                        if (id == "Route")
                            textvalue = $('#' + id + ' option:selected').text();
                        else
                            textvalue = $('#' + id).val();
                    }
                    else {
                        //textvalue = $('#' + id).val() == null ? "" : $('#' + id).val().replace(/-space-/g, " ");
                        textvalue = $('#' + id).val() == null ? "" : $('#' + id).val();
                    }
                }
                else
                    textvalue = $('#' + id).val();
                //textvalue = fieldControl == "LABEL" ? $('#' + id).text() : $('#' + id).val();
                FormView[id] = textvalue;
            }
        }
        FormView.FieldName = FieldName
        FormView.UserID = _UserID;
        FormView.LastLogin = _LastLogin;
        FormView.URL = _URL;
        FormView.PlanoGramURL = _PlanoGramURL;
        dataFieldIdList = FormView;

        if (FieldName != '' && onchange != "No") {
            var listParameter = objListParameter['ListParameter_ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + FieldName];
            if (listParameter != undefined) {
                ListSelectedId = [];
                //ListBodyDivId_ItemMaintenanceNewForm_LstLBP

                //todo 27.06.2019 - one line only command
                //FormListConfigRow(listParameter.ttbody, listParameter.tfoot, listParameter.scrName, 1, '', listParameter.fieldName, listParameter.actionType, '');
                //DynamicFormListConfigRow(listParameter.ttbody, listParameter.tfoot, listParameter.scrName, 1, '', listParameter.fieldName, listParameter.actionType);
            }
        }
    }
}

function LookUpchangeFunction(id) {
    if (currentScreenName == "StockTransferForm" || currentScreenName == "CustomerProductForm") {
        ListSelectedId = [];
        LookUpMultiSelected = [];
    }
    var _obj = {};
    _obj.fieldName = 'TempTableDelete';
    PerformAction('listTextFieldLostFocus', _obj);

    //dataFieldIdList['Channel'] = $('#Channel').val();
    //dataFieldIdList['IOM_Month'] = $('#IOM_Month').val();
    //dataFieldIdList['IOM_Year'] = $('#IOM_Year').val();

    // COLLECT CONTROLS VALUE EXCEPT LISTVIEW ======================
    for (var i = 0; i < _objArray.arrForm.length; i++) {
        fieldControl = _objArray.arrForm[i].fieldControl;
        id = _objArray.arrForm[i].DataMember;
        if (fieldControl != "LISTVIEW" && id != "") {
            textvalue = fieldControl == "LABEL" ? $('#' + id).text() : $('#' + id).val();
            FormView[id] = textvalue;
        }
    }
    // COLLECT CONTROLS VALUE EXCEPT LISTVIEW ======================

    FormView.FieldName = FieldName
    FormView.UserID = _UserID;
    FormView.LastLogin = _LastLogin;
    dataFieldIdList = FormView;

    if (FieldName != '') {
        var listParameter = objListParameter['ListParameter_' + CurrentScreen_TabScreen_Name + '_' + FieldName];
        if (listParameter != undefined)
            DynamicFormListConfigRow(listParameter.ttbody, listParameter.tfoot, listParameter.scrName, 1, '', listParameter.fieldName, listParameter.actionType);
    }
}

function listCheckBoxClickFunction(thisObj, id, rowIndex) {
    var obj = {};
    var type = '';
    chkRowIndex = rowIndex;
    // $(this).children('td').eq(0).is(':checked')
    //var vfrf = $('#table_"' + CurrentScreen_TabScreen_Name + '"_"' + dynamicFieldName).children('td').eq(0).is(':checked');
    //var vfvv = $('#table_"' + CurrentScreen_TabScreen_Name + '"_"' + dynamicFieldName).attr("checked", $('#table_"' + CurrentScreen_TabScreen_Name + '"_"' + dynamicFieldName).children('td').eq(0).is(":checked"));

    var t = document.getElementById("table_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName).rows;
    t[0].cells[0].innerHTML

    var textbox = $('#ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName + ' tr').find("input")

    var rowDataString = document.getElementById("table_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName).rows[(rowIndex + 1)].innerHTML;
    var rowData = rowDataString.split('</td>')
    istextValueAssigned = false;
    for (var i = 0; i < (rowData.length - 1) ; i++) {
        id = getTableRowTDid(rowData[i]);
        type = getTableRowFullTDType(rowData[i]);

        if ((type.toLowerCase() == "text" || type.toLowerCase() == "checkbox") && istextValueAssigned == false) {

            var textbox = $('#ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName + ' tr').find("input");
            // var rowIndexCount = dynamicRowindex == 1 ? dynamicRowindex : dynamicRowindex + 1;
            var dividedCount = textbox.length / dynamicRowindex;
            // var dividedCount = textbox.length / rowIndexCount;
            var minusCount = textbox.length - dividedCount;

            var initCount = rowIndex * dividedCount;
            var lengthCount = initCount + dividedCount;
            //  for (var y = minusCount; y < textbox.length; y++) {
            for (var y = initCount; y < lengthCount; y++) {
                id = textbox[y].id.split('_')[0];
                if (textbox[y].type == 'checkbox') {
                    value = textbox[y].checked;
                }
                else {
                    value = textbox[y].value
                }
                obj.FieldName = id;
                obj[id] = value;

            }
            istextValueAssigned = true
        }
            //else if (type.toLowerCase() == "checkbox") {
            //    obj.FieldName = id;
            //    //obj[id] = $('#table_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName).find('input[type="checkbox"]:checked').length == 0 ? false : $('#table_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName).find('input[type="checkbox"]:checked')[0].checked
            //    obj[id] = thisObj.checked;
            //}
        else if (type.toLowerCase() == "") {
            value = getTableRowTDvalue(rowData[i]);
            obj[id] = value;
        }
    }

    FormView.FieldName = FieldName;
    FormView[FieldName] = obj;

    var _obj = {};
    if (currentScreenName == 'MustCarryItemForm') {
        if (obj[obj.FieldName] == true) {
            _obj.fieldName = FieldName.split('_')[0];
            PerformAction('listTextFieldLostFocus', _obj);
        }
        else {
            _obj.fieldName = 'TempTableRowDelete';
            PerformAction('listTextFieldLostFocus', _obj);
        }
    }
    else {
        _obj.fieldName = FieldName.split('_')[0];
        PerformAction('listTextFieldLostFocus', _obj);
    }

}

function CustomerAgentIdValidation() {
    var id = buttonTextId.split('_')[0];
    var currentCnt = buttonTextId.split('_')[1];
    for (var i = 0; i < dynamicCnt; i++) {
        if (currentCnt != i) {
            if ($("#" + id + "_" + i).val() == $("#" + buttonTextId).val()) {
                $('#messageDialogId').text("Customer Agent Id already exists!");
                $('#messageDialog').dialog('open');
                return false;
            }
        }
    }
    return true;

}




function BackButton(value, action, ActionName) {
    //BackButton1(value, action, ActionName);
    ActionConfigEvent("", ActionId, screenName, "", ActionName);
    // if (returnData != "BACK") {
    if (returnData != "BACK" && returnData != "HIDEPOPUPWINDOW" && returnData != "CANCEL") {
        var result = confirm(returnData);
        if (result) {
            BackButton(value, action, "alertDialogClick");
        }
        else {
            BackButton(value, action, "initCancelButtonClick");
        }
    }
    else if (returnData != "CANCEL") {
        ////Todo-inlineEdit
        //if (isEmpty(actionRowClickCount)) {
        //    //  $('#FormDivCreateId').empty();
        //    $('#FormDivCreateId').hide();
        //}
        //else {
        //    // $('#rowFormDiv_' + actionRowClickCount + '').empty();
        //    $('#rowFormDiv_' + actionRowClickCount + '').hide();
        //}
        ////

        if (isPopUpCreateForm == true) {
            $('#createPopupDialog').dialog('close');
        }
        else {
            window.close();
            //  window.location = url_GetIndex + "?screenName=" + screenName + "&InsertUpdateMessage=" + '' + "&MenuId=" + '' + "&Count=" + '';
            //window.location = "/Common/GetIndex/?screenName=" + screenName;
        }
    }
}

var returnData = '';
function RowItemClicked1(id, ActionId, data) {

    ActionConfigEvent(data, ActionId, screenName, "", "rowItemClicked");
    if (actionRowClickCount != lastActionRowClickCount) {
        //   $('#rowFormDiv_' + lastActionRowClickCount + '').empty();
        $('#tabMenuId_' + lastActionRowClickCount + '').empty();
        $('#FormDivId_' + lastActionRowClickCount + '').empty();
        $('#buttonDivId_' + lastActionRowClickCount + '').empty();
    }

    data = $.parseJSON(returnData);
    if (data != null) {

        $("#" + id).empty();
        // $("#FormDivId_" + actionRowClickCount).empty();
        if (isEmpty(actionRowClickCount))
            $("#buttonDivId").empty();
        else
            $("#buttonDivId_" + actionRowClickCount).empty();
        if (isViweButton == true)
            showFormConfigListView(id, data, 0);
        else
            showFormConfigList(id, data, 0);

        $('#rowFormDiv_' + lastActionRowClickCount + '').hide();
        $('#rowFormDiv_' + actionRowClickCount + '').show();
        GetEditForm(ActionId, 'Edit');
    }
}

function RowItemClicked2(id, ActionId, data) {
    //GetFormConfig(id, screenName);

    ActionConfigEvent(data, ActionId, screenName, "", "rowItemClicked");
    data = $.parseJSON(returnData.split('$')[0]);
    isPopUpCreateForm = returnData.split('$')[1] == "FORM" ? false : true;
    if (data != null) {
        $("#" + id).empty();
        $("#buttonDivId").empty();
        if (isViweButton == true)
            showFormConfigListView(id, data, 0);
        else
            showFormConfigList(id, data, 0);

        if (isPopUpCreateForm == true) {
            $('#createPopupDialog').dialog({ title: "" + screenName + " Edit Form" }).dialog('open');
            $('#createPopupDialogHiddenId').hide();
            GetEditForm(ActionId, 'Edit');
        }
        else {
            // if (action == "Edit")
            window.location = url_GetEdit + "?screenName=" + screenName + "&Id=" + ActionId;
            // window.location = url_GetEdit + "?screenName=" + screenName + "&Id=" + secondColval;
            //else
            //    window.location = url_GetDetails + "?screenName=" + screenName + "&Id=" + secondColval;
        }
    }
}
function RowItemClicked(id, ActionId, data) {
    if (isListLookUpClicked == true) {
        //   var scrnName = TabScreenName == '' ? screenName : screenName + "_" + TabScreenName;
        //var scrnName = screenName + "_FORM_LOOKUP_" + buttonTextId;

        //ActionConfigEvent(data, ActionId, screenName, "", "rowItemClicked");
        PerformAction('rowItemClicked', data, buttonTextId);
        returnData = returnData.replace('[', '').replace(']', '')
        var formData = $.parseJSON(returnData);
        if (formData != null)
            $.each(formData, function (key, value) {
                var val = data[key];
                $('#' + key).val(val).attr("disabled", true);
                $('#' + key).onblur();
            });

    }
    else {
        ActionConfigEvent(data, ActionId, screenName, "", "rowItemClicked");
        var formData = $.parseJSON(returnData.split('$')[0]);
        //GetFormConfig(id, screenName);
        //AssignFormData(formData);
        //   CreateForm = returnData.split('$')[1] == "FORM" ? false : true;

        isPopUpCreateForm = returnData.split('$')[1] == "FORM" ? false : true;
        if (isPopUpCreateForm == true) {
            GetFormConfig(id, screenName);
            $('#createPopupDialog').dialog({ title: "" + screenName + " Edit Form" }).dialog('open');
            $('#createPopupDialogHiddenId').hide();
            AssignFormData(formData);
        }
        else {
            var taburl = url_GetEdit + "?screenName=" + screenName + "&Id=" + ActionId;
            window.location = taburl;
            // window.open(taburl, '_blank');
        }

    }
}


function ActionConfigEvent(data, ActionId, screenName, FieldName, ActionName) {
    $.ajax({
        type: 'POST',
        url: url_ActionConfig,
        data: { data: JSON.stringify(data), Code: ActionId, ScreenName: screenName, FieldName: FieldName, ActionName: ActionName },
        dataType: 'json',
        async: false,
        success: function (data) {
            returnData = data;
            return;
        }
    });
}

$(document).ready(function () {

    $('#SaveBtn').click(function (evt) {
        //Keyboard click.
        if (evt.screenX == 0 && evt.screenY == 0) {
            // window.alert('Keyboard click.');
        } else {
            // window.alert('Mouse click.');
        }
    });

    $('#CancelBtn').click(function (evt) {
        if (evt.screenX == 0 && evt.screenY == 0) {
            $('#FormDivCreateId input:text').val('');
            // window.alert('Keyboard click.');
        } else {
            // window.alert('Mouse click.');
        }
    });
});


function getConfirmStatus() {
    //TransNo
    var stConfirmed = "";
    var dtr = "Select ISNULL(TransStatus,0) as TransStatus from TransferHdr where TransNo='" + $('#TransNo').val() + "'";
    execute(dtr);
    stConfirmed = executeQry[0] == undefined ? false : executeQry[0].TransStatus;
    //stConfirmed = dtr("TransStatus");
    return stConfirmed;
}
function getCheckinStatus() {
    var stConfirmed = ""
    // Dim dtr As SqlDataReader
    var dtr = "Select IsNull(CheckIn,0) As CheckIn from StockOrder where StockNo='" + $('#StockRequestNo').val() + "'";
    execute(dtr);
    if (executeQry.length > 0) {
        stConfirmed = executeQry[0].CheckIn;
    }
    // While dtr.Read
    //  stConfirmed = dtr("CheckIn")
    // End While
    // dtr.Close()
    return stConfirmed
}


var isSaveBtn = false;
var isConfirmBtn = false;
var isInvAdjConfirmBtn = false;
function formButtonClicked(obj, dataMember, rowIndex, value) {
    $('#Button_' + dataMember).attr("disabled", "disabled");
    try {

        LogQry = baseLogQry;
        if (executeLog == true) {
            var btn_newtext = document.getElementById('Button_' + dataMember).value;
            webAuditLog('Button', Screen_NewText, btn_newtext);
        }
    }
    catch (err) { }//alert(err); }

    //debugger;
    if (currentScreenName == "ModuleSettingsForm" && dataMember == "SaveBtn1") {
        saveModuleSettingsForm1();
        return;
    }
        // EINVOICE PURPOSE - THAILAND DEMO
    else if ((currentScreenName == "ReceivedInvoiceList" || currentScreenName == "InvoiceList") && dataMember == "Inbound") {
        Peppol_Receive_Invoice_Data();
        return;
    }
    else if (currentScreenName == "PeppolForm" && dataMember == "SaveBtn") {
        PeppolForm_RegisterData();
        return;
    }
    else if (dataMember == "DownBtn" || dataMember == "UpBtn") {
        if (dataMember == "DownBtn")
            clickDown();
        else
            clickUp();
    }
    else {
        //if (dataMember == "SaveBtn" && isSaveBtn == true) {
        //    alert("already save button clicked!");
        //    return
        //}
        if (currentScreenName == "StockTransferForm1") {//not need
            StockTransferFormformButtonClicked(obj, dataMember, rowIndex, value);
        }
        if (currentScreenName == "InventoryAdjustmentForm1") {//not need
            InventoryAdjustmentFormformButtonClicked(obj, dataMember, rowIndex, value);
        }

        else if (currentScreenName == "FocusSKUForm1" && dataMember == "CreateBtn") {//not need
            $('#IOM_Month').val('');
            $('#Channel').val('');
            $('#IOM_Year').val('');

            DropDownOnchangeFunction("Item", "Channel")
        }
        else if (currentScreenName == "ViewInvoiceReportForm" && dataMember == "PrintBtn") {
           // debugger;
            var strInvNo = "";
          
            //DeliveryDate
            var date = $('#DeliveryDate').val();
            var fDate = FromDateFormate(date);
            var tDate = ToDateFormate(date);
            var tmpuserb = _UserID;
            tmpuserb = tmpuserb;
            //Added by Vishnu on 20.10.2023
            //--------------------------------------------
            var qry = ""
            if ($('#VehicleID').val() == "ALL") {
                //qry = "select InvNo from Invoice where DeliveryDate between '" + fDate + "' and '" + tDate + "'";
                //Changes made by Vishnu/Sudhakar on 31.10.2023 for UserWise fetching
                try {
                    if (radioValue == "InvoiceDate") {
                        if (_UserID.indexOf("TKM") > -1) 
                        {
                            qry = " select distinct a.OrdNo from invoice a inner join Vehicle b on a.VehicleID =b.Code   ";
                            qry += " inner join NodeTree c on b.Branch =c.SalesOfficeID  inner join SalesManGroup d on c.SalesManTerritory =d.GroupId   ";
                            qry += " where InvDt between '" + fDate + "' and '" + tDate + "'  and d.UserId ='" + _UserID + "' ";
                        }
                        else if (_UserID.indexOf("OPC") > -1) {
                            qry = " select distinct a.OrdNo from invoice a inner join Vehicle b on a.VehicleID =b.Code   ";
                            qry += " inner join NodeTree c on b.Branch =c.SalesOfficeID  inner join SalesManGroup d on c.SalesManTerritory =d.GroupId   ";
                            qry += " where InvDt between '" + fDate + "' and '" + tDate + "'  and d.UserId ='" + _UserID + "' ";
                        }
                        else {
                            qry = " select distinct a.InvNo from invoice a inner join Vehicle b on a.VehicleID =b.Code   ";
                            qry += " inner join NodeTree c on b.Branch =c.SalesOfficeID  inner join SalesManGroup d on c.SalesManTerritory =d.GroupId   ";
                            qry += " where InvDt between '" + fDate + "' and '" + tDate + "'  and d.UserId ='" + _UserID + "' ";
                        }
                    }
                    else {
                        if ((_UserID.indexOf("TKM") > -1) || (_UserID.indexOf("OPC") > -1))
                            {
                            qry = " select distinct a.OrdNo from invoice a inner join Vehicle b on a.VehicleID =b.Code   ";
                            qry += " inner join NodeTree c on b.Branch =c.SalesOfficeID  inner join SalesManGroup d on c.SalesManTerritory =d.GroupId   ";
                            qry += " where DeliveryDate between '" + fDate + "' and '" + tDate + "'  and d.UserId ='" + _UserID + "' ";
                        }
                        else {
                            qry = " select distinct a.InvNo from invoice a inner join Vehicle b on a.VehicleID =b.Code   ";
                            qry += " inner join NodeTree c on b.Branch =c.SalesOfficeID  inner join SalesManGroup d on c.SalesManTerritory =d.GroupId   ";
                            qry += " where DeliveryDate between '" + fDate + "' and '" + tDate + "'  and d.UserId ='" + _UserID + "' ";
                        }
                    }

                } catch (e) {

                }

            }
            else {
                //dtr = objDo.ReadRecord("select InvNo from Invoice where  VehicleID=" & objDo.SafeSQL(cmbVehicleID.SelectedValue) & " and DeliveryDate between " & objDo.SafeSQL(Format(DeliveryDate.Value, "yyyyMMdd 00:00:00")) & " and " & objDo.SafeSQL(Format(DeliveryDate.Value, "yyyyMMdd 23:59:59")))
                try {
                    if (radioValue == "InvoiceDate") {
                        if (_UserID.indexOf("TKM") > -1) //((_UserID.indexOf("TKM") > -1) || (_UserID.indexOf("OPC") > -1))
                            qry = "select OrdNo from Invoice where  VehicleID='" + $('#VehicleID').val() + "' and InvDt between '" + fDate + "' and '" + tDate + "'";
                        else
                            qry = "select InvNo from Invoice where  VehicleID='" + $('#VehicleID').val() + "' and InvDt between '" + fDate + "' and '" + tDate + "'";
                    }
                    else {
                        if (_UserID.indexOf("TKM") > -1) //((_UserID.indexOf("TKM") > -1) || (_UserID.indexOf("OPC") > -1))
                            qry = "select OrdNo from Invoice where  VehicleID='" + $('#VehicleID').val() + "' and DeliveryDate between '" + fDate + "' and '" + tDate + "'";
                        else
                            qry = "select InvNo from Invoice where  VehicleID='" + $('#VehicleID').val() + "' and DeliveryDate between '" + fDate + "' and '" + tDate + "'";
                    }
                } catch (e) {

                }
            }
            //--------------------------------------------
            execute(qry);
            var dataLst = executeQry;
            for (var i = 0; i < dataLst.length; i++) {
                //if (strInvNo == "")
                //    strInvNo = '' + dataLst[i].InvNo + '';
                //else
                //    strInvNo = strInvNo + "," + dataLst[i].InvNo
                if ((_UserID.indexOf("TKM") > -1) || (_UserID.indexOf("OPC") > -1)) 
                {
                    if (strInvNo == "")
                        strInvNo = "'" + dataLst[i].OrdNo + "'";
                    else
                        strInvNo = "" + strInvNo + "" + "," + "'" + dataLst[i].OrdNo + "'";
                }
                else {
                    if (strInvNo == "")
                        strInvNo = "'" + dataLst[i].InvNo + "'";
                    else
                        strInvNo = "" + strInvNo + "" + "," + "'" + dataLst[i].InvNo + "'";
                }
                // "'" + dataLst[i].InvNo + "'" + "," + "'" + dataLst[i].InvNo + "'"
            }
            if (strInvNo != "") {
                if (ProjectName.toLowerCase() == "jsu") {
                    strInvNo = ReplaceSpecialCharacter(strInvNo);
                    if ((_UserID.indexOf("TKM") > -1) || (_UserID.indexOf("OPC") > -1))
                        window.open(url_LoadInvoiceReportJSU + "?strInvNo=" + strInvNo + "&sRptName=EverHomeInvoiceRep&typeNo=order");
                    else
                        window.open(url_LoadInvoiceReportJSU + "?strInvNo=" + strInvNo + "&sRptName=EverHomeInvoiceRep");
                }
                else if (ProjectName.toLowerCase() == "poc") {
                    window.open(url_LoadInvoiceReport_POC + "?strInvNo=" + strInvNo + "&sRptName=EverHomeInvoiceRep");
                }
                else {
                    window.open(url_LoadInvoiceReport + "?strInvNo=" + strInvNo + "&sRptName=EverHomeInvoiceRep");
                }

                // 
                cation = url_LoadInvoiceReport + "?strInvNo=" + strInvNo + "&sRptName=EverHomeInvoiceRep";
            }
            else {
                //   alert("There are no invoices created for the above criteria", MsgBoxStyle.OkOnly, "No Invoice")
                obj = {};
                obj.title = "No Invoice";
                obj.message = "There are no invoices created for the above criteria";
                showAlertMessage(obj);
                return;
            }
        }
        else if (currentScreenName == "ImportConfigForm") {
            if (dataMember == "OkBtn" || dataMember == "SourceColumns") {
                ImportConfigMap();
                return;
            }
            else if (dataMember == "MapBtn") {
                if (dbColumnName == '' || mappedField == '') {
                    obj = {};
                    obj.title = "Import Config";
                    obj.message = "Please select List 1 and List 2!";
                    showAlertMessage(obj);
                    return;
                }
                obj = {};
                obj.DbColumnName = dbColumnName;
                obj.TestDefault = testDefault;
                obj.MappedField = mappedField;
                obj.FieldName = FieldName;
                FormView["TargetAttributes"] = $('#TargetAttributes').val();
                FormView[FieldName] = obj;
                ImportConfigMapping(dataMember);
            }
            else if (dataMember == "UnmapBtn") {
                if (dbColumnName == '' || mappedField == '') {
                    obj = {};
                    obj.title = "Import Config";
                    obj.message = "Please select List 1 and List 2!";
                    showAlertMessage(obj);
                    return;
                }
                obj = {};
                obj.DbColumnName = dbColumnName;
                obj.TestDefault = '';
                obj.MappedField = '';
                obj.FieldName = FieldName;
                FormView["TargetAttributes"] = $('#TargetAttributes').val();
                FormView[FieldName] = obj;
                ImportConfigMapping(dataMember);

            }
        }

        else if (currentScreenName == "ImportConfig1Form") {
            if (dataMember == "OkBtn") {
                ImportFile();
                return;
            }
        }

        if (dataMember == "SaveBtn")
            isSaveBtn = true;
        else if (dataMember == "DeleteBtn") {
            //obj = {};
           // obj.title = "Confirm";
           // obj.message = "Are you sure you want to delete?";
           // ConfirmMessage(obj);
            var _obj = {};
            _obj.fieldName = dataMember;
            PerformAction('formButtonClicked', _obj);
            //return;
        }

        var _obj = {};
        _obj.fieldName = dataMember;
        if (isInvAdjConfirmBtn == false) {
            PerformAction('formButtonClicked', _obj);
        }


        if (dataMember == 'LstDownload') {
            ListExport(dataMember);
        }

        if (currentScreenName == 'ImportDataList' && dataMember == 'ImportBtn') {
            exportSql();
        }
        if (currentScreenName == 'ImportDataForm' && dataMember == 'ImportBtn') {
            if (ProjectName.toLowerCase() == "cpf" || (SolutionName == "SALES-WEB-UL" && ULCR == "1")) {
                //if (ProjectName.toLowerCase() == "cpf" && ULCR == "1") {
               // ImportFileToSQLUL();
                ImportFileToSQL();
           // ImportFileToSQLULOld();// exportSqlUL();
            }
            else
            ImportFileToSQL();
        }
        if (currentScreenName == 'ExportDataForm' && dataMember == 'ExportBtn') {
            if (SolutionName == "SALES-WEB-UL" && ULCR == "1") {
                // exportFileUL();
                exportFileULCR();
            }
            else {
                if (ProjectName.toLowerCase() == "unilever")
                    exportFileToSQL();
                else {
                    // COMMENTED 12.10.2020 ====================
                    //if (ProjectName.toLowerCase() == "cpf")
                    //    exportCSVToSQLFromToDate();
                    //if (ProjectName.toLowerCase() == "jsu")
                    //    exportFileToSQLFromToDateJSU();
                    //else
                    //    exportFileToSQLFromToDate();

                    if (ProjectName.toLowerCase() == "cpf") {
                        //exportCSVToSQLFromToDate();
                        exportFileToSQLFromToDate();
                    }
                    else if (ProjectName.toLowerCase() == "jsu") {
                        exportFileToSQLFromToDateJSU();
                    }
                    else {
                        exportFileToSQLFromToDate();
                       
                    }
                }
            }
        }
        if (currentScreenName == 'POSDataUploadForm') {
            if (dataMember == 'DownloadBtn')
                DownloadBlobe();
            else if (dataMember == 'SaveBtn')
                POSDataUploadUL();
        }
            if (currentScreenName == 'SerialNoUpdateNewForm' && (ProjectName.toLowerCase() == "targetmedia" || ProjectName.toLowerCase() == "dancom")) {
            if (dataMember == "ImportBtn")
                ImportFromExcelToList();
        }
       if (currentScreenName == 'ImportMDFForm' && ProjectName.toLowerCase() == "dancom" ) {
            if (dataMember == "UploadBtn")
                MDFImportList();
            if ($('#fileupload').get(0).files[0] == null) {
                $('#Template').html('<z><a href="../ImportFiles/CSV/MDF.csv" style="display:none" style="color: blue" download>MDF.csv</a></z>');
                //ImportFromExcelToList();
            }
            else {
                $('#Template').html('<z><a href="../ImportFiles/CSV/MDF.csv"  style="color: blue" download>MDF.csv</a></z>');
            }
        }
    }
    $('#Button_' + dataMember).removeAttr("disabled");
}



// EINVOICE FOR REGISTER FORM DATA ============================

function Peppol_Receive_Invoice_Data() {

    $.ajax({
        type: 'POST',
        url: url_Receive_Invoice_InBound_Peppol,
        //data: jsonData,
        //contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        async: false,
        success: function (result) {
            var obj = {};
            obj.title = "InBound Updation";
            obj.message = result.toString();
            showAlertMessage(obj);


        },
        error: function (result) {
            alert('Fail ');
        }
    });
}


function emailValidate(mailId) {
    var re = /^\w+([-+.'][^\s]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    var emailFormat = re.test(mailId);
    if (re.test(mailId) == false) {
        return false;
    }
    return true;
}
function PeppolForm_RegisterData() {
    var CompanyCode = $("#CustNo").val();
    var CompanyName = $("#CustName").val();
    var UEN = $("#GSTNo").val();
    var CountryCode = $("#CountryCode").val();
    var ContactNo = $("#Phone").val();
    var ContactEmail = $("#Email").val();
    var Address = $("#Address").val();
    var PostCode = $("#PostCode").val();
    //var AuthorizationLetter = $("#AuthorizationLetter").val();
    var RegisterationNotification = $("#NotificationEmail").val();
    var selectedImageName = "";

    var obj = {};

    // HERE VALIDATION 

    if (CompanyName == '') {
        obj.title = "Information";
        obj.message = "Enter Custommer Name.";
        showAlertMessage(obj);
        return;
    }
    else if (CompanyCode == '') {
        obj.title = "Information";
        obj.message = "Enter Custommer Code.";
        showAlertMessage(obj);
        return;
    }
    else if (UEN == '') {
        obj.title = "Information";
        obj.message = "Enter GSTNo.";
        showAlertMessage(obj);
        return;
    }
    else if (CountryCode == '') {
        obj.title = "Information";
        obj.message = "Enter CountryCode.";
        showAlertMessage(obj);
        return;
    }
    else if (ContactNo == '') {
        obj.title = "Information";
        obj.message = "Enter Phone.";
        showAlertMessage(obj);
        return;
    }
    else if (ContactNo.toString().length > 10) {
        obj.title = "Information";
        obj.message = "Phone Number should be 10 [or] less than 10 digits.";
        showAlertMessage(obj);
        return;
    }
    else if (ContactEmail == '') {
        obj.title = "Information";
        obj.message = "Enter Email.";
        showAlertMessage(obj);
        return;
    }
    else if (!emailValidate(ContactEmail)) {
        obj.title = "Information";
        obj.message = "Enter Valid Email Id.";
        showAlertMessage(obj);
        return;
    }

    else if (Address == '') {
        obj.title = "Information";
        obj.message = "Enter Address.";
        showAlertMessage(obj);
        return;
    }
    else if (PostCode == '') {
        obj.title = "Information";
        obj.message = "Enter PostCode.";
        showAlertMessage(obj);
        return;
    }
    else if (RegisterationNotification == '') {
        obj.title = "Information";
        obj.message = "Enter Notification Email Id.";
        showAlertMessage(obj);
        return;
    }
    else if (!emailValidate(RegisterationNotification)) {
        obj.title = "Information";
        obj.message = "Enter Valid Email Id.";
        showAlertMessage(obj);
        return;
    }
    else if (($("#Authorize")[0].checked == false) && (document.getElementById("Image_1").value == ""
                || document.getElementById("Image_1").value == null
                || document.getElementById("Image_1").value == undefined)) {
        obj.title = "Information";
        obj.message = "Please select authorization file to upload or authorize eInvoice.sg on your behalf.";
        showAlertMessage(obj);
        return;
    }
    else if (($("#Authorize")[0].checked == true) && (document.getElementById("Image_1").value != ""
                && document.getElementById("Image_1").value != null
                && document.getElementById("Image_1").value != undefined)) {
        // BOTH INPUTS ARE GIVEN
        obj.title = "Information";
        obj.message = "Either the authorization letter or option should be chosen. Not both.";
        showAlertMessage(obj);
        return;
    }



    if ($("#Authorize")[0].checked == true) {
        selectedImageName = "";
    }
    else {
        selectedImageName = document.getElementById("Image_1").value;
        selectedImageName = selectedImageName.split('\\')[selectedImageName.split('\\').length - 1]
    }

    var jsonData = JSON.stringify({
        'CompanyName': CompanyName, 'UEN': UEN,
        'CountryCode': CountryCode, 'ContactNumber': ContactNo,
        'ContactEmail': ContactEmail, 'Address': Address,
        'PostCode': PostCode, 'AuthorizationLetter': "",
        'CompanyCode': CompanyCode,
        'RegistrationNotification': RegisterationNotification,
        'imgName': selectedImageName
    })

    //alert(jsonData);

    $.ajax({
        type: 'POST',
        url: url_Register_Form_Data_Peppol,
        data: jsonData,
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (result) {
            obj.title = "Registeration";
            obj.message = result.toString();
            if (result.toString() == 'Pending') {
                $("#PeppolStatus").val(result.toString());
            }

            showAlertMessage(obj);
        },
        error: function (result) {
            alert('Fail ');
        }
    });


}
function DeleteConfirm() {
    var _obj = {};
    _obj.fieldName = "DeleteBtn";
    PerformAction('formButtonClicked', _obj);
}
function GetSetAutoRunningNo() {
    if (currentScreenName == "CustomerRoutingForm") {
        if ($('#RouteNo').val() == "") {
            var qry = '';
            qry = "Declare @DN as nvarchar(50) \n";
            qry += "Exec UpdateNewDocNo 'CUSTOMERROUTING', 'ADMIN', @DN output \n";
            qry += "Select @DN";
            execute(qry);
            var autoRunNo = executeQry[0].Column1;
            $('#RouteNo').val(autoRunNo);
        }
    }
    else if (currentScreenName == "InventoryAdjustmentForm") {
        if ($('#DocNo').val() == "") {
            var qry = '';
            qry = "Declare @DN as nvarchar(50) \n";
            qry += "Exec UpdateNewDocNo 'INVENTORYADJUSTMENT', 'ADMIN', @DN output \n";
            qry += "Select @DN";
            execute(qry);
            var autoRunNo = executeQry[0].Column1;
            $('#DocNo').text(autoRunNo);
        }
    }
    else if (currentScreenName == "StockTransferForm") {
        if ($('#TransNo').val() == "") {
            var qry = '';
            qry = "Declare @DN as nvarchar(50) \n";
            qry += "Exec UpdateNewDocNo 'STOCKTRANSFER', 'ADMIN', @DN output \n";
            qry += "Select @DN";
            execute(qry);
            var autoRunNo = executeQry[0].Column1;
            $('#TransNo').val(autoRunNo);
        }
    }
    else if (currentScreenName == "SalesOfficeStockRequestForm") {
        if ($('#StockNo').val() == "") {
            var qry = '';
            qry = "Declare @DN as nvarchar(50) \n";
            qry += "Exec UpdateNewDocNo 'SALESOFFICESTOCKREQUEST', 'ADMIN', @DN output \n";
            qry += "Select @DN";
            execute(qry);
            var autoRunNo = executeQry[0].Column1;
            $('#StockNo').val(autoRunNo);
        }
    }

}

function formTextFieldChange(obj, dataMember, rowIndex, value) {
    var _obj = {};
    _obj.fieldName = dataMember;
    _obj.value = $('#' + dataMember).val();
    PerformAction('formTextFieldChange', _obj/*, dataMember*/);
}
function formTextFieldFocus(obj, dataMember, rowIndex, value) {
    if (obj.value != "") {
        var _obj = {};
        _obj.fieldName = dataMember;
        _obj.value = $('#' + dataMember).val();
        PerformAction('formTextFieldFocus', _obj/*, dataMember*/);
    }
}

function formTextFieldLostFocus(obj, dataMember, rowIndex, value) {
    if (obj.value != "") {
        var _obj = {};
        _obj.fieldName = dataMember;
        _obj.value = $('#' + dataMember).val();
        try {
            if (dataMember == "ToteBox") {
                var target = document.getElementById(nextFocus);
                target.focus();
                target.select();
            }
        } catch (err) {

        }
        PerformAction('formTextFieldLostFocus', _obj/*, dataMember*/);
    }
}

function enterformTextFieldLostFocus(obj, dataMember, rowIndex, value) {

    try {
        document.getElementById(dataMember).style.border = "1px solid Lightgrey";
        var el = document.getElementById("tooltip_" + dataMember);
        el.remove();
    } catch (e) {

    }

    if (obj.value != "")
        if (ProjectName == "POC" && currentScreenName == "SpecialPackingList") {
            if (event.keyCode === 13 || event.keyCode === 8) {
                var _obj = {};
                _obj.fieldName = dataMember;
                _obj.value = $('#' + dataMember).val();
                try {
                    if (dataMember == "ToteBox") {
                        var target = document.getElementById(nextFocus);
                        target.focus();
                        target.select();
                    }
                } catch (err) {

                }
                PerformAction('formTextFieldLostFocus', _obj/*, dataMember*/);
            }
        }
        else {
            if (event.keyCode === 13) {
                var _obj = {};
                _obj.fieldName = dataMember;
                _obj.value = $('#' + dataMember).val();
                try {
                    if (dataMember == "ToteBox") {
                        var target = document.getElementById(nextFocus);
                        target.focus();
                        target.select();
                    }
                } catch (err) {

                }
                PerformAction('formTextFieldLostFocus', _obj/*, dataMember*/);
            }
        }
        
}



function formLookUpChanged(obj, dataMember, rowIndex, value) {

    try {
        document.getElementById(dataMember).style.border = "1px solid Lightgrey";
        var el = document.getElementById("tooltip_" + dataMember);
        el.remove();
    } catch (e) {

    }

    autoID = dataMember;
    AutoCompleteList = [];

    //for (var i = 0; i < AutoCompleteList.length; i++) {
    //    if (AutoCompleteList[i].DataMember == dataMember) {
    //        isexists = true;
    //        break;
    //    }
    //}

    //if (isexists == false) {
    try {
        autoCompletedata = {};
        autoCompletedata.DataMember = dataMember;
        autoCompletedata.ScreenName = dataMember;
        autoCompletedata.FormListType = "Form";
        AutoCompleteList.push(autoCompletedata);
    } catch (e) {

    }

    //debugger;
    _listLookUpIndex = -1;
    var _obj = {};
    _obj.fieldName = dataMember;
    _obj.value = $('#' + dataMember).val();
    PerformAction('formLookUpChanged', _obj/*, dataMember*/);
}

function formFileUploadFocus(obj, dataMember, rowIndex) {
    $('#' + obj.id).val(null);
}


function formFileUploadLostFocus(obj, dataMember, rowIndex, value) {

    if (currentScreenName == "ImportConfigForm") {
        formButtonClicked(obj, dataMember, rowIndex, value);
    }
    else if (currentScreenName == "ImportConfig1Form") {
        ImportConfigMap();
    }

    else {
        //var _obj = {};
        //_obj.fieldName = dataMember;
        //_obj.value = $('#' + dataMember).val();
        // PerformAction('formTextFieldLostFocus', _obj/*, dataMember*/);
    }
}

function formFileUploadChangeCheck(obj, dataMember, rowIndex, value) {
    if (currentScreenName.toLowerCase() == "importdataform" && dataMember == "Upload") {
        var tmpbody = document.getElementById("ListBodyDivId_ImportDataForm_LstImportData");
        for (var i = 0; i < tmpbody.rows.length; i++) {
            tmpbody.rows[i].cells[1].childNodes[0].checked = false;
            tmpbody.rows[i].cells[2].innerText = "";

        }
    }
    //if ($('#fileupload').get(0).files[0] != null && obj.files[0].type == "image/png" && $('#fileupload').get(0).files[0].size > 2000) {//200000kb
    if (obj.files[0] != null && obj.files[0].type == "image/png" && obj.files[0].size > 2000) {//200000kb
        alert("File is too big!");
        // obj.value = "aaaa";
        $('#fileupload').val(null);
        //document.getElementById("fileupload").value = null;
        //$('#fileupload').val("");
        //var input = $("#fileupload");
        //    input = input.val('').clone(true);
        return;
    }
    else if (obj.files[0] == null)
        return;
    else {
        var _obj = {};
        _obj.fieldName = dataMember;
        //_obj.value = $('#' + dataMember).val();
        _obj.value = $('#' + dataMember).val();
        PerformAction('formFileUploadChange', _obj/*, dataMember*/);
    }

}
//$('#' + obj.id).get(0).files[0]
var isImageFileUploadChange = false;
function formFileUploadChange(obj, dataMember, rowIndex, value) {

    if (obj.files.length == 0) {
        return;
    }

    if (obj.accept == "image/*" && (obj.files[0].name.split(".")[1].toLowerCase() != "png" && obj.files[0].name.split(".")[1].toLowerCase() != "jpg" && obj.files[0].name.split(".")[1].toLowerCase() != "jpeg")) {
        $('#' + obj.id).val(null);
        obj = {};
        obj.title = "Error";
        obj.message = "Please select the image format!";
        showAlertMessage(obj);
        return;
    }

    // FOR VALIDATION PURPOSE ====================================================================
    if (currentScreenName.toString().toLowerCase().trim() == "peppolform" && obj.id == "Image_1") {
        document.getElementById("UserImage").style.display = "block";
        $("#Authorize")[0].checked = false;
    }
    // FOR VALIDATION PURPOSE ====================================================================

    if (ProjectName.toLowerCase() == "CPF" && (obj.accept == "image/*") && obj.files[0].size > 1000000) {
        $('#' + obj.id).val(null);

        obj = {};
        obj.title = "Error";

        obj.message = "Maximum image file size accepted is 1MB!";
        //obj.message = "Image file maximum accept 200kb size. Please select less than 200kb!";
        showAlertMessage(obj);

        // alert("Image file maximum accept 200kb size. Please select less than 200kb!");
        return;
    }

    //if (obj.files[0] != null && (obj.accept == "image/*" || obj.accept == "null" || obj.accept == "NULL") && obj.files[0].size > 200000) {//200000kb
    if (obj.files[0] != null && (obj.accept == "image/*") && obj.files[0].size > 200000) {//200000kb

        $('#' + obj.id).val(null);

        obj = {};
        obj.title = "Error";

        obj.message = "Maximum image file size accepted is 200KB!";
        //obj.message = "Image file maximum accept 200kb size. Please select less than 200kb!";
        showAlertMessage(obj);

        // alert("Image file maximum accept 200kb size. Please select less than 200kb!");
        return;
    }


    isImageFileUploadChange = true;


    var _obj = {};
    _obj.fieldName = dataMember;
    //_obj.value = $('#' + dataMember).val();
    _obj.value = $('#' + dataMember + '_1').val();
    PerformAction('formFileUploadChange', _obj/*, dataMember*/);

    isImageFileUploadChange = false;

}


function formImageClicked(obj, dataMember, rowIndex, value) {
    var src = document.getElementById(dataMember).src;
    window.open(src, "_blank");
}

function ValidateSize(file) {
    var FileSize = file.files[0].size / 1024 / 1024; // in MB
    if (FileSize > 2) {
        alert('File size exceeds 2 MB');
        // $(file).val(''); //for clearing with Jquery
    } else {

    }
}

function listFileUploadChange(obj, ftype, fname, dataMember, rowIndex, ttbodyId, tfoot, fieldName) {

    //-----------------------------------Checking file extension start---------------------------------------//
    var col;
    if (ftype != "") {
        var tblbody = document.getElementById(ttbodyId);
        col = tblbody.rows[rowIndex].cells.namedItem(ftype).childNodes[0].value;
        tblbody.rows[rowIndex].cells.namedItem(fname).childNodes[0].innerText = "";
    }
    else {
        var tblbody = document.getElementById(ttbodyId);
        tblbody.rows[rowIndex].cells.namedItem(fname).innerText = "";
        col = "image";
    }
    var ext = obj.value.match(/\.([^\.]+)$/)[1];
    switch (col.toLowerCase()) {
        case "image":
            {
                if (ext != 'jpg' && ext != 'png' && ext != 'jpeg' ) {
                    var objc = {};
                    objc.title = "Error";
                    objc.message = "File type is not valid. Please select an Image File!";
                    showAlertMessage(objc);
                    obj.value = '';
                    // $('#' + dataMember + "_" + (rowIndex+1)).val("");
                    return;
                }
                break;
            }
        case "pdf":
            {
                if (ext != 'pdf') {

                    var objc = {};
                    objc.title = "Error";
                    objc.message = "File type is not a valid. Please select a PDF File!";
                    showAlertMessage(objc);
                    obj.value = '';
                    return;
                }
                break;
            }
        case "video":
            {
                if (ext != 'mp4' && ext != 'mov' && ext != 'wmv' && ext != 'avi' && ext != 'flv' && ext != 'mkv' && ext != 'webm' && ext != 'avchd') {

                    var objc = {};
                    objc.title = "Error";
                    objc.message = "File type is not a valid. Please select a Video File!";
                    showAlertMessage(objc);
                    obj.value = '';
                    return;
                }
                break;
            }
        case "powerpoint":
            {
                if (ext != 'ppt' && ext != 'pptx')
                {
                    var objc = {};
                    objc.title = "Error";
                    objc.message = "File type is not a valid. Please select a Power Point File!";
                    showAlertMessage(objc);
                    obj.value = '';
                    return;
                }
                break;
            }
    }
    //-------------------------------------Checking File Extension End---------------------------------------//

    //if (obj.files[0] != null && (obj.accept == "video/*" || obj.files[0].type == "video/mp4") && obj.files[0].size / 1024 / 1024 < 5) {//obj.files[0].size / 1024 /1024 => mb
    if (obj.files[0] != null && obj.files[0].size / 1024 / 1024 > 5) {//obj.files[0].size / 1024 /1024 => mb
        var objc = {};
        objc.title = "Error";
        objc.message = "File size should be less than 5MB!";
        showAlertMessage(objc);
        // alert("Image file maximum accept 200kb size. Please select less than 200kb!");
        $('#' + obj.id).val(null);
        return;
    }

    SaveListViewFileUpload(dataMember + "_" + rowIndex, "");
    setListValue(obj, dataMember, rowIndex, ttbodyId);
    _listLookUpttbody = ttbodyId;

    //var val = $("#File_" + dataMember + "_" + rowIndex + "").get(0).value;
    //$("#" + dataMember + "_" + rowIndex + "").val(val);
    var _obj = {};
    _obj.fieldName = dataMember;
    //_obj.value = $('#' + dataMember).val();
    _obj.value = $('#' + dataMember + '_1').val();
    PerformAction('listFileUploadChange', _obj/*, dataMember*/);
    isImageFileUploadChange = false;

}

function listValueChanged(obj, dataMember, rowIndex, value, fieldName, ttbodyId) {
    setListValue(obj, dataMember, rowIndex, ttbodyId);
    var _obj = {};
    _obj.fieldName = dataMember;
    _obj.rowIndex = rowIndex;
    _obj.value = value;
    PerformAction('listValueChanged', _obj);






}
function listDatePickerClicked(obj, dataMember, rowIndex, value, fieldName, ttbodyId) {
    setListValue(obj, dataMember, rowIndex, ttbodyId);
    var _obj = {};
    _obj.fieldName = dataMember;
    _obj.rowIndex = rowIndex;
    _obj.value = value;
    PerformAction('datePickerClicked', _obj);

}
function listTimePickerClicked(obj, dataMember, rowIndex, value, fieldName, ttbodyId) {
    setListValue(obj, dataMember, rowIndex, ttbodyId);
    var _obj = {};
    _obj.fieldName = dataMember;
    _obj.rowIndex = rowIndex;
    _obj.value = value;
    PerformAction('listTimePickerClicked', _obj);
}
function listTimePickerLostFocus(obj, dataMember, rowIndex, value, fieldName, ttbodyId) {
    setListValue(obj, dataMember, rowIndex, ttbodyId);
    var _obj = {};
    _obj.fieldName = dataMember;
    _obj.rowIndex = rowIndex;
    _obj.value = value;
    PerformAction('listTimePickerLostFocus', _obj);
}

function listTextFieldFocus(obj, dataMember, rowIndex, value, fieldName, ttbodyId) {
    _isListNewRowAdd = true;
    setListValue(obj, dataMember, rowIndex, ttbodyId);
    currentRowClickCount = rowIndex;

    console.log('formlistconfig.js,5233,index-' + currentRowClickCount);

    // alert('iIndex : ' + obj.iIndex + '- value : ' + value + '- rowIndex : ' + rowIndex + obj.selectionStart + obj.tabIndex);

    var _obj = {};
    _obj.fieldName = dataMember;
    _obj.rowIndex = rowIndex;
    _obj.value = value;
    PerformAction('listTextFieldFocus', _obj);
}


function autoCompleteLostFocus(obj, dataMember, rowIndex, value, fieldName, ttbodyId, tfoot) {
    try {
        var _obj = {};
        _obj.fieldName = dataMember;
        _obj.rowIndex = rowIndex;
        _obj.value = value;
        PerformAction('autoCompleteEntered', _obj);
    }
    catch {

    }
}

function listNumberTextFieldFocus(obj, dataMember, rowIndex, value, fieldName, ttbodyId) {

    try {
        var tmpbody = document.getElementById(ttbodyId);

        var tmp = tmpbody.rows[rowIndex].cells.namedItem(dataMember).childNodes[0].value;

        tmp = tmp.replace(/^0+/, '')

        tmpbody.rows[rowIndex].cells.namedItem(dataMember).childNodes[0].value = tmp;
    } catch (e) {

    }

}

function listTabTextClicked(obj, dataMember, rowIndex, value, fieldName, ttbodyId) {
    //_isListNewRowAdd = true;
    setListValue(obj, dataMember, rowIndex, ttbodyId);
    currentRowClickCount = rowIndex;

    console.log('formlistconfig.js,5276,index-' + currentRowClickCount);

    // alert('iIndex : ' + obj.iIndex + '- value : ' + value + '- rowIndex : ' + rowIndex + obj.selectionStart + obj.tabIndex);

    var _obj = {};
    _obj.fieldName = dataMember;
    _obj.rowIndex = rowIndex;
    _obj.value = value;
    PerformAction('listTabTextClicked', _obj);
}

function listTextFieldFocus1(obj, dataMember, dataMember1, rowIndex, value, fieldName, ttbodyId) {
    try {
        var tmpval = "";
        tmpval = document.getElementById(dataMember1).value;
        if (tmpval == "")
            document.getElementById(dataMember1).value = "0";
    } catch (err) {

    }

    _isListNewRowAdd = true;
    setListValue(obj, dataMember, rowIndex, ttbodyId);
    currentRowClickCount = rowIndex;

    console.log('formlistconfig.js,5300,index-' + currentRowClickCount);

    // alert('iIndex : ' + obj.iIndex + '- value : ' + value + '- rowIndex : ' + rowIndex + obj.selectionStart + obj.tabIndex);

    var _obj = {};
    _obj.fieldName = dataMember;
    _obj.rowIndex = rowIndex;
    _obj.value = value;
    PerformAction('listTextFieldFocus', _obj);
}

function listButtonClicked(obj, dataMember, rowIndex, value, fieldName, ttbodyId) {
    _isListNewRowAdd = true;
    setListValue(obj, dataMember, rowIndex, ttbodyId);
    currentRowClickCount = rowIndex;

    console.log('formlistconfig.js,5311,index-' + currentRowClickCount);

    // alert('iIndex : ' + obj.iIndex + '- value : ' + value + '- rowIndex : ' + rowIndex + obj.selectionStart + obj.tabIndex);

    var _obj = {};
    _obj.fieldName = dataMember;
    _obj.rowIndex = rowIndex;
    _obj.value = value;
    PerformAction('listButtonClicked', _obj);
}


function listTextFieldLostFocus1(obj, dataMember, rowIndex, value, fieldName, ttbodyId) {
    currentRowClickCount = rowIndex;

    console.log('formlistconfig.js,5323,index-' + currentRowClickCount);

    setListValue(obj, dataMember, rowIndex, ttbodyId);
    var _obj = {};
    _obj.fieldName = dataMember;
    _obj.rowIndex = rowIndex;
    _obj.value = value;
    PerformAction('listTextFieldLostFocus', _obj);
}


function FuncListDatePickerOnChange(tmpvar, rowIndex) {
    var tmpDate = $('#' + tmpvar + rowIndex).val();
    if (lastDate != tmpDate) {
        try {
            var tmpval = $('#' + tmpvar + rowIndex).val();
            if (tmpval != "" && tmpval != null) {
                var _obj = {};
                _obj.value = $('#' + tmpvar + rowIndex).val();
                _obj.fieldName = tmpvar;
                PerformAction('listDatePickerOnChange', _obj/*, dataMember*/);
            }
        } catch (err) {

        }
    }
   
}

function listDatePickerLostFocus(obj, dataMember, rowIndex, value, fieldName, ttbodyId, tfoot) {

    
    var tmpvar = dataMember;
    lastDate = $('#' + tmpvar + rowIndex).val();
        setTimeout("FuncListDatePickerOnChange('" + tmpvar + "'," + rowIndex + ")", 1000);
    

}



//function listDatePickerLostFocus(obj, dataMember, rowIndex, value, fieldName, ttbodyId, tfoot) {
//    var obj = {};
//    obj.title = "Expiry Date";
//    obj.message = "Date format is wrong!";

//    if ($('#' + dataMember + rowIndex).val() != "") {
//        var dt = $('#' + dataMember + rowIndex).val().split("/");
//        if (dt.length == 1)
//            dt = $('#' + dataMember + rowIndex).val().split("-");
//        if (dt.length == 1) {
//            showAlertMessage(obj);
//            $('#' + dataMember + rowIndex).val("");
//            return;
//        }

//        if (_format.split('/')[0] == "MM") {
//            if (parseInt(dt[0]) > 12) {
//                showAlertMessage(obj);
//                $('#' + dataMember + rowIndex).val("");
//                return;
//            }
//        }
//        else if (_format.split('/')[1] == "MM") {
//            if (parseInt(dt[1]) > 12) {
//                showAlertMessage(obj);
//                $('#' + dataMember + rowIndex).val("");
//                return;
//            }
//        }
//        listTextFieldLostFocus(obj, dataMember, rowIndex, value, fieldName, ttbodyId, tfoot);
//    }

//    var _obj = {};
//    _obj.fieldName = dataMember;
//    _obj.rowIndex = rowIndex;
//    _obj.value = value;
//    PerformAction('listDatePickerOnChange', _obj);

//}
function listTextFieldLostFocus(obj, dataMember, rowIndex, value, fieldName, ttbodyId, tfoot) {
    _listLookUpttbody = ttbodyId;
    _listLookUpIndex = rowIndex;
    //Toda - row click and  delete means using this line. but tab button using means not working this line
    // rowIndex = currentRowClickCount;
    currentRowClickCount = rowIndex;

    console.log('formlistconfig.js,5407,index-' + currentRowClickCount);

    var obj = {};
    var type = '';

    //return;

    if (currentScreenName == "InventoryAdjustmentForm") {
        if ($('#DocType').val() == "General")
            InventoryAdjustmentListQtyValidate(dataMember, rowIndex, value, fieldName);
        else {
            if (document.getElementById("table_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName) != null) {
                var inventoryQty = document.getElementById("table_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName).rows[(rowIndex + 1)].cells.Inventory.childNodes['0'].value;
                var qty = document.getElementById("table_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName).rows[(rowIndex + 1)].cells.Qty.childNodes['0'].value;
                var itemNo = document.getElementById("table_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName).rows[(rowIndex + 1)].cells.ItemNo.childNodes['0'].data;
                if (parseInt(inventoryQty) < parseInt(qty)) {
                    //"Current Inventory ItemNo :  itemNo   in the row 1 is   . Therefore not enough for adjustment
                    // Current Inventory ItenNo : 
                    obj = {};
                    obj.title = "Inventory Adjustment Form";
                    obj.message = "Current Inventory ItemNo : " + itemNo + " in the row " + (rowIndex + 1) + " is " + inventoryQty + ". Therefore not enough for adjustment";
                    showAlertMessage(obj);
                    document.getElementById("table_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName).rows[(rowIndex + 1)].cells.Qty.childNodes['0'].value = "0";
                    obj = {};
                    return;
                }
            }
        }
    }

    ///// 
    setListValue(obj, dataMember, rowIndex, ttbodyId);
    ////

    ///////////////********---------------------------
    //var textbox = $('#ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName + ' tr').find("input")
    //var rowDataString = document.getElementById("table_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName).rows[(rowIndex + 1)].innerHTML;
    //var rowData = rowDataString.split('</td>')
    //istextValueAssigned = false;

    //for (var i = 0; i < (rowData.length - 1) ; i++) {
    //    //  var columnData=   $('#ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName + ' tr')[rowIndex].children;
    //    id = getTableRowTDid(rowData[i]);
    //    type = getTableRowFullTDType(rowData[i]);


    //    if (type.toLowerCase() == "text" || type == "select") {
    //        obj[id] = $('#ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName + ' tr')[currentRowClickCount].cells[id].childNodes['0'].value;
    //    }
    //    else if (type.toLowerCase() == "checkbox" && istextValueAssigned == false) {
    //        obj[id] = $('#ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName + ' tr')[currentRowClickCount].cells[id].childNodes['0'].checked;
    //        istextValueAssigned = true
    //    }
    //    else if (type.toLowerCase() == "") {
    //        value = getTableRowTDvalue(rowData[i]);
    //        obj[id] = value;
    //    }
    //}
    //FormView.FieldName = FieldName;
    //FormView[FieldName] = obj;

    //////***************------------------------------------

    var _obj = {};
    _obj.fieldName = dataMember;
    _obj.rowIndex = rowIndex;
    _obj.value = value;

    //var _obj = {};
    // _obj.fieldName = FieldName.split('_')[0];

    //command for sales order option and but it will using start functionallity
    if (currentScreenName == "SalesOrderForm1") {
        BulkUOMCalculation(_obj.fieldName, dataMember, rowIndex);

        ////sales order temp qty value added for this logic
        var textbox = $('#ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName + ' tr').find("input")
        var rowDataString = document.getElementById("table_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName).rows[(rowIndex + 1)].innerHTML;
        var rowData = rowDataString.split('</td>')
        istextValueAssigned = false;

        for (var i = 0; i < (rowData.length - 1) ; i++) {
            //  var columnData=   $('#ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName + ' tr')[rowIndex].children;
            id = getTableRowTDid(rowData[i]);
            type = getTableRowFullTDType(rowData[i]);


            if (type.toLowerCase() == "text" || type == "select") {
                obj[id] = $('#ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName + ' tr')[currentRowClickCount].cells[id].childNodes['0'].value;
            }

                //TODO //this else if logic command for sales order
                // if (type.toLowerCase() == "text" && istextValueAssigned == false) {
            else if (type.toLowerCase() == "checkbox" && istextValueAssigned == false) {
                var textbox = $('#ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName + ' tr').find("input");
                //  var rowIndexCount = dynamicRowindex == 1 ? dynamicRowindex : dynamicRowindex + 1;
                //  var dividedCount = textbox.length / rowIndexCount;
                var dividedCount = textbox.length / dynamicRowindex;
                if ((addCount + 1) != dynamicRowindex)
                    dividedCount = textbox.length / (addCount + 1);
                //var dividedrowIndexCount = textbox.length / (rowIndex + 1);
                //var minusCount = textbox.length - dividedCount;

                var initCount = rowIndex * dividedCount;
                var lengthCount = initCount + dividedCount;

                //  for (var y = minusCount; y < textbox.length; y++) {
                for (var y = initCount; y < lengthCount; y++) {
                    id = textbox[y].id.split('_')[0];
                    if (textbox[y].type == 'checkbox') {
                        value = textbox[y].checked;
                        obj[id] = value;
                    }
                    else {
                        value = textbox[y].value
                    }
                    //  obj[id] = value;
                }
                istextValueAssigned = true
            }
            else if (type.toLowerCase() == "") {
                value = getTableRowTDvalue(rowData[i]);
                obj[id] = value;
            }
        }
        FormView.FieldName = FieldName;
        FormView[FieldName] = obj;
        ////////////
    }
    PerformAction('listTextFieldLostFocus', _obj);

    ////
    _isListNewRowAdd = true;
    _listLookUpFieldName = FieldName;
    _listLookUpttbody = ttbodyId;
    _listLookUpttfoot = tfoot;
    _listLookUpIndex = rowIndex;

    var ttableId = ttbodyId.replace("ListBodyDivId", "table");
    try {
        if (isdynamic == true && FormView[fieldName][dataMember] != "") {
            //newly added by M.26.10.2022 --ffb uom new row tab button click event
            var trowcnt = $('#' + ttableId + ' >tbody >tr').length;
            dynamictableTotalRowCount = trowcnt != "" && trowcnt != null ? trowcnt : dynamictableTotalRowCount
            //

            dynamictableTotalRowCount = dynamictableTotalRowCount == 0 && tableTotalRowCount > 0 ? tableTotalRowCount : dynamictableTotalRowCount;
            dynamicNewRowAdd();
        }
    }
    catch (e) {

    }

    
    ///

}

var listCombochangeBefore = 0;
var islistCombochanged = false;
function listComboClick(obj, dataMember, rowIndex, value, fieldName, ttbodyId, tfoot) {
    _listLookUpttbody = _listLookUpttbody == "" ? ttbodyId : _listLookUpttbody;
    if (listCombochangeBefore == 0) {
        setListValue(obj, dataMember, rowIndex, ttbodyId);
        var _obj = {};
        _obj.fieldName = dataMember;
        _obj.rowIndex = rowIndex;
        _obj.value = value;
        PerformAction('listComboClick', _obj);
    }
    else if (islistCombochanged = true) {
        listCombochangeBefore = 0;
        islistCombochanged = false;
    }
}
function listComboChange(obj, dataMember, rowIndex, value, fieldName, ttbodyId, tfoot) {

    try {
        var tblbody = document.getElementById(ttbodyId);
        tblbody.rows[rowIndex].cells.namedItem(dataMember).childNodes['0'].style.border = "1px solid Lightgrey";
    } catch (e) {

    }

    listCombochangeBefore = 1;
    islistCombochanged = true;
    //var _obj = {};
    //_obj.fieldName = dataMember;
    //_obj.rowIndex = rowIndex;
    //_obj.value = value;
    //PerformAction('listComboChange', _obj);

    

    var obj = {};
    var type = '';

    if (currentScreenName == "InventoryAdjustmentForm") {

        var textbox = $('#ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName + ' tr').find("input")
        var rowDataString = document.getElementById("table_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName).rows[(rowIndex + 1)].innerHTML;


        if ($('#DocType').val() == "BadStock") {
            //InventoryAdjustmentListBadStockChangeEvent();

            var inventoryQty = document.getElementById("table_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName).rows[(rowIndex + 1)].cells.Inventory.childNodes['0'].value;
            var qty = document.getElementById("table_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName).rows[(rowIndex + 1)].cells.Qty.childNodes['0'].value;
            var itemNo = document.getElementById("table_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName).rows[(rowIndex + 1)].cells.ItemNo.childNodes['0'].data;
            if (parseInt(inventoryQty) < parseInt(qty)) {
                //"Current Inventory ItemNo :  itemNo   in the row 1 is   . Therefore not enough for adjustment
                // Current Inventory ItenNo : 
                obj = {};
                obj.title = "Inventory Adjustment Form";
                obj.message = "Current Inventory ItemNo : " + itemNo + " in the row " + (rowIndex + 1) + " is " + inventoryQty + ". Therefore not enough for adjustment";
                showAlertMessage(obj);
                document.getElementById("table_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName).rows[(rowIndex + 1)].cells.Qty.childNodes['0'].value = "0";
                obj = {};
                return;
            }
        }
        else
            InventoryAdjustmentListQtyValidate(dataMember, rowIndex, value, fieldName);


        ////////////////////new added
        var rowData = rowDataString.split('</td>')
        istextValueAssigned = false;

        for (var i = 0; i < (rowData.length - 1) ; i++) {
            //  var columnData=   $('#ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName + ' tr')[rowIndex].children;
            id = getTableRowTDid(rowData[i]);
            type = getTableRowFullTDType(rowData[i]);


            if (type.toLowerCase() == "text" || type == "select") {
                obj[id] = $('#ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName + ' tr')[currentRowClickCount].cells[id].childNodes['0'].value;
            }

                //TODO //this else if logic command for sales order
                // if (type.toLowerCase() == "text" && istextValueAssigned == false) {
            else if (type.toLowerCase() == "checkbox" && istextValueAssigned == false) {

                obj[id] = $('#ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName + ' tr')[currentRowClickCount].cells[id].childNodes['0'].checked;
                istextValueAssigned = true
            }
            else if (type.toLowerCase() == "") {
                value = getTableRowTDvalue(rowData[i]);
                obj[id] = value;
            }
        }
        FormView.FieldName = FieldName;
        FormView[FieldName] = obj;

        var _obj = {};
        _obj.fieldName = FieldName.split('_')[0];

        PerformAction('listTextFieldLostFocus', _obj);
        /////////////////////
    }
    else if (currentScreenName == "InvoiceNewForm" || currentScreenName == "InvoiceForm") {
        try {
            var tableid, tbodyid, tfooterid, listiewid;

            if (currentScreenName == "InvoiceNewForm") {
                tbodyid = "ListBodyDivId_InvoiceNewForm_Item";
                tableid = "table_InvoiceNewForm_Item";
                tfooterid = "ListfootDivId_InvoiceNewForm_Item";
                listviewid = "InvoiceNewForm_LISTVIEW_Item";
            }
            else {
                tbodyid = "ListBodyDivId_InvoiceForm_Item";
                tableid = "table_InvoiceForm_Item";
                tfooterid = "ListfootDivId_InvoiceForm_Item";
                listviewid = "InvoiceForm_LISTVIEW_Item";
            }

            var table = document.getElementById(tbodyid);
           

            var sIndex = table.rows[rowIndex].cells[3].childNodes[0].selectedIndex;

            var c_itemno = table.rows[rowIndex].cells[2].childNodes[0].value;
            var c_itemname = table.rows[rowIndex].cells[4].childNodes[0].value;
            var c_uom = table.rows[rowIndex].cells[5].innerText;

            var n_itemno = table.rows[rowIndex + 1].cells[2].childNodes[0].value;
            var n_itemname = table.rows[rowIndex + 1].cells[4].childNodes[0].value;
            var n_uom = table.rows[rowIndex + 1].cells[5].innerText;

            var p_itemno = '';
            var p_itemname = '';
            var p_uom = '';

            try {
                 p_itemno = table.rows[rowIndex - 1].cells[2].childNodes[0].value;
                 p_itemname = table.rows[rowIndex - 1].cells[4].childNodes[0].value;
                 p_uom = table.rows[rowIndex - 1].cells[5].innerText;
            }
            catch (er) {

            }

            if (sIndex == 0) {
                table.rows[rowIndex].cells[3].childNodes[0].selectedIndex = 1;
                return;
            }

            if (sIndex == 1) {

                if (c_itemno != n_itemno && c_itemno != p_itemno) {
                    //var itemNo = document.getElementById("ListBodyDivId_InvoiceNewForm_Item").rows[(rowIndex + 1)].cells.childNodes['0'].data;

                    var row = document.getElementById("Item" + rowIndex);

                    // rowhtml.closest("tr").clone(true).appendTo(table);

                    //var row = table.insertRow(1);


                    //for (var i = 0; i < rowhtml.cells.length; i++) {
                    //    var cell1 = row.insertCell(i);
                    //    cell1 = rowhtml.cells[i].cloneNode(true);
                    //}


                    // var row = document.createElement();

                    // row.innerHTML = rowhtml;

                    var clone = row.cloneNode(true);
                    clone.id = "Item0_1";
                    //  var middleRow = table.insertRow(1);
                    //   middleRow.appendChild(row);
                    table.insertBefore(clone, row)


                    objAddDynamicListCount['ListConfig_' + tbodyid] = objAddDynamicListCount['ListConfig_' + tbodyid] + 1;

                    //  row = document.getElementById("Item0");
                    //  row.cells["3"]

                    for (var i = 0; i < table.rows.length; i++) {
                        table.rows[i].id = "Item" + i;
                        // table.rows[i].className = "tablecell trRow_ListBodyDivId_InvoiceNewForm_Item_" + i;

                        table.rows[i].attributes[0].nodeValue = "keyDowned(this,'Item','" + i + "' ,'" + tbodyid + "','" + tableid + "');"
                        table.rows[i].attributes[1].nodeValue = "rowItemClicked(this,'Item','" + i + "' ,'" + tbodyid + "','" + tableid + "');";
                        //var cell1 = row.insertCell(i);
                        //cell1 = rowhtml.cells[i].cloneNode(true);
                        //delete btn
                        table.rows[i].cells[0].childNodes[1].attributes[2].nodeValue = "DynamicRowItemRemove(this,'Delete'," + i + ",'Delete','Item'," + i + ",'" + tbodyid + "','" + tfooterid + "');";
                        //Itemno
                        table.rows[i].cells[2].childNodes[1].attributes[2].nodeValue = "multiSelectListLookUpClicked(this,'ItemNo'," + i + ",'Item','Item No','" + tbodyid + "','" + tfooterid + "','" + listviewid + "');";
                        //Sales type
                        table.rows[i].cells[3].childNodes[0].attributes[2].nodeValue = "listComboClick(this,'SalesType'," + i + ",'SalesType','Item','" + tbodyid + "','" + tfooterid + "','Item');";
                        table.rows[i].cells[3].childNodes[0].attributes[3].nodeValue = "listComboChange(this,'SalesType'," + i + ",'SalesType','Item','" + tbodyid + "','" + tfooterid + "','Item');";

                        if (currentScreenName == "InvoiceNewForm") {
                            //Item name
                            table.rows[i].cells[4].childNodes[0].attributes[5].nodeValue = "listTextFieldFocus(this,'ItemName'," + i + ",-1,'Item','" + tbodyid + "','" + tfooterid + "');";
                            table.rows[i].cells[4].childNodes[0].attributes[6].nodeValue = "listTextFieldLostFocus(this,'ItemName'," + i + ",-1,'Item','" + tbodyid + "','" + tfooterid + "');";
                            table.rows[i].cells[4].childNodes[0].attributes[7].nodeValue = "listTextFieldChange(this,'ItemName'," + i + ",-1,'Item','" + tbodyid + "','" + tfooterid + "');";
                        }

                        //Qty
                        table.rows[i].cells[6].childNodes[0].id = "Qty_" + i;
                        table.rows[i].cells[6].childNodes[0].attributes[6].nodeValue = "listTextFieldFocus1(this,'Qty','Qty_" + i + "'," + i + ",-1,'Item','" + tbodyid + "','" + tfooterid + "');";
                        table.rows[i].cells[6].childNodes[0].attributes[7].nodeValue = "listTextFieldLostFocus(this,'Qty'," + i + ",-1,'Item','" + tbodyid + "','" + tfooterid + "');";
                        table.rows[i].cells[6].childNodes[0].attributes[8].nodeValue = "listTextFieldChange1(this,'Qty','Qty_" + i + "'," + i + ",-1,'Item','" + tbodyid + "','" + tfooterid + "');";
                    }


                    //table.rows[rowIndex].cells[3].childNodes[0].disabled = true;
                    //table.rows[rowIndex + 1].cells[3].childNodes[0].disabled = true;
                    if (currentScreenName == "InvoiceNewForm") 
                        table.rows[rowIndex + 1].cells[4].childNodes[0].value = "Ex. " + table.rows[rowIndex + 1].cells[4].childNodes[0].value;
                    else
                        table.rows[rowIndex + 1].cells[4].childNodes[0].nodeValue = "Ex. " + table.rows[rowIndex + 1].cells[4].childNodes[0].nodeValue;

                    table.rows[rowIndex + 1].cells[6].childNodes[0].value = 0;
                    table.rows[rowIndex + 1].cells[7].innerText = "0";
                    table.rows[rowIndex + 1].cells[8].innerText = "0";
                    table.rows[rowIndex + 1].cells[9].innerText = "0";
                    table.rows[rowIndex + 1].cells[10].innerText = "0";

                }
                else {
                    table.rows[rowIndex].cells[3].childNodes[0].selectedIndex = 0;
                    obj = {};
                    obj.title = "Information!";
                    obj.message = "Exchange item is already added for this item - " + c_itemno;
                    showAlertMessage(obj);
                    return;
                   }
            }
            //table.appendChild(clone);
        }
        catch (err) {
            alert(err);
        }
    }
    else {
        setListValue(obj, dataMember, rowIndex, ttbodyId);
        _listLookUpttbody = ttbodyId;
        _listLookUpIndex = rowIndex;
        var _obj = {};
        _obj.fieldName = dataMember;
        _obj.rowIndex = rowIndex;
        _obj.value = value;
        PerformAction('listComboChange', _obj);


        ////
        _isListNewRowAdd = true;
        fieldName;

        _listLookUpFieldName = ttbodyId.split('_')[ttbodyId.split('_').length - 1] == FieldName ? FieldName : ttbodyId.split('_')[ttbodyId.split('_').length - 1];
        //_listLookUpttbody = ttbodyId;
        _listLookUpttfoot = tfoot;
        //_listLookUpIndex = rowIndex;
        //   dynamictableTotalRowCount = dynamictableTotalRowCount == 0 ? 1 : dynamictableTotalRowCount;
        tableTotalRowCount = $('#' + ttbodyId)[0].rows.length;
        dynamictableTotalRowCount = dynamictableTotalRowCount == 0 && tableTotalRowCount == 0 ? 1 : tableTotalRowCount;

        if (FormView[fieldName] == undefined && FieldName != fieldName && FieldName == fieldName.split('_')[0])
            dynamicNewRowAdd();
        else if (FormView[fieldName][dataMember] != "") {
            
            if (ProjectName.toLowerCase().toString() == "fgv" && currentScreenName == "SalesOrderSpecialForm")
            {
                //skip;
            }
            else
                dynamicNewRowAdd();
        }
        ///


    }

}
function InventoryAdjustmentListBadStockChangeEvent() {
    sScreenName = "InventoryAdjustmentForm_FORM_LOOKUP_Item_InvQty";
    //  var type=    document.getElementById("ListBodyDivId_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName).rows[(dynamicRowindex - 1)].cells.AdjustmentType.children.AdjustmentType.value;
    var type = document.getElementById("ListBodyDivId_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName).rows[(dynamicRowindex - 1)].cells.AdjustmentType.firstChild.value;
    if (type == "+veAdjustment") {
        sScreenName = "InventoryAdjustmentForm_FORM_LOOKUP_Item_Possitive_InvQty";
    }
    var qry = getString['QueryConfig_' + sScreenName + '']
    qry += ' ' + getString['QueryConfig_' + sScreenName + '_GroupText'];
    qry += ' ' + getString['QueryConfig_' + sScreenName + '_OrderText'];
    qry = formatQueryString(qry, sScreenName);//ScreenView
    execute(qry);
    var tblbody = document.getElementById("ListBodyDivId_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName);
    if (executeStringQry.toString() != "[]") {
        executeStringQry = executeStringQry.replace('[', '').replace(']', '');
        formData = $.parseJSON(executeStringQry);
        tblbody.rows[(dynamicRowindex - 1)].cells.namedItem('Inventory').childNodes['0'].value = formData['ListView.Inventory'];
    }
    else
        tblbody.rows[(dynamicRowindex - 1)].cells.namedItem('Inventory').childNodes['0'].value = 0;

    //////////

}

function listTextFieldChange1(obj, dataMember, dataMember1, rowIndex, value, fieldName) {

    var _obj = {};
    _obj.fieldName = dataMember;
    _obj.rowIndex = rowIndex;
    _obj.value = value;
    PerformAction('listTextFieldChange', _obj);
    FieldName = fieldName;

    if (event.keyCode === 13) {
      
        try {
            if (dataMember1.indexOf("Qty_") > -1) {

                var tmpFocus = dataMember1.split("_")[1];
                var source = document.getElementById(dataMember1);
                tmpFocus = "Qty_" + (parseInt(tmpFocus) + 1);
                const target = document.getElementById(tmpFocus);
                //if (source.value != "0" && source.value != "") {
                    //target.tabIndex = '-1';
                    if (target.value == '')
                        target.value = '0';
                    //setTimeout(function () {

                    target.focus();
               // }
               // }
            }
        } catch (err) {

        }
        // ev = "no";
    }


}

function listTextFieldChange(obj, dataMember, rowIndex, value, fieldName, ttbodyid) {

    try {
        var tblbody = document.getElementById(ttbodyId);
        tblbody.rows[rowIndex].cells.namedItem(dataMember).childNodes['0'].style.border = "1px solid Lightgrey";
    } catch (e) {

    }
   
    var _obj = {};
    _obj.fieldName = dataMember;
    _obj.rowIndex = rowIndex;
    _obj.value = value;
    PerformAction('listTextFieldChange', _obj);
    FieldName = fieldName;

    
}

function InventoryAdjustmentListQtyValidate(dataMember, rowIndex, value, fieldName) {
    var adjustmentType = document.getElementById("table_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName).rows[(rowIndex + 1)].cells.AdjustmentType.childNodes['0'].value;
    if (adjustmentType == "-veAdjustment") {
        var inventoryQty = 0;
        if (document.getElementById("table_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName).rows[(rowIndex + 1)].cells.Inventory.childNodes['0'].value == undefined) {
            inventoryQty = document.getElementById("table_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName).rows[(rowIndex + 1)].cells.Inventory.childNodes['0'].data == undefined ?
                document.getElementById("table_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName).rows[(rowIndex + 1)].cells.Inventory.childNodes['0'].innerText :
                document.getElementById("table_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName).rows[(rowIndex + 1)].cells.Inventory.childNodes['0'].data;
        }
        else
            inventoryQty = document.getElementById("table_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName).rows[(rowIndex + 1)].cells.Inventory.childNodes['0'].value;

        var qty = document.getElementById("table_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName).rows[(rowIndex + 1)].cells.Qty.childNodes['0'].value;
        var itemNo = document.getElementById("table_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName).rows[(rowIndex + 1)].cells.ItemNo.childNodes['0'].data;
        if (parseInt(inventoryQty) < parseInt(qty)) {
            //"Current Inventory ItemNo :  itemNo   in the row 1 is   . Therefore not enough for adjustment
            // Current Inventory ItenNo : 
            obj = {};
            obj.title = "Inventory Adjustment Form";
            obj.message = "Current Inventory ItemNo : " + itemNo + " in the row " + (rowIndex + 1) + " is " + inventoryQty + ". Therefore not enough for adjustment";
            showAlertMessage(obj);
            document.getElementById("table_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName).rows[(rowIndex + 1)].cells.Qty.childNodes['0'].value = "0";
            obj = {};
            return;
        }
    }
}


function BulkUOMCalculation(listFieldName, dataMember, rowIndex) {
    rowIndex = currentRowClickCount;
    var tempListFieldName = listFieldName;
    //if (dataMember == "BulkQty") {
    if (FormView[listFieldName] == undefined)
        listFieldName = FormView.FieldName;


    var bulkQty = FormView[listFieldName].BulkQty == "" ? 0 : parseFloat(FormView[listFieldName].BulkQty);
    var Price = FormView[listFieldName].Price == "" ? 0 : parseFloat(FormView[listFieldName].Price);
    var itemNo = $('#ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName + ' tr')[rowIndex].children.ItemNo.innerHTML;
    var itemNo1 = $('#ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName + ' tr')[rowIndex].children.ItemNo.innerText;
    var uom = $('#ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName + ' tr')[rowIndex].children.BulkUOM.innerHTML;

    if (itemNo1 == "")
        return;
    var qry = "select PriceGroup  from customer Where CustNO='" + FormView.CustNo + "'"
    execute(qry);
    var priceGroup = executeQry[0].PriceGroup;
    var unitPrice = 0;
    if (priceGroup != "") {
        qry = "select UnitPrice from Itempr where PriceGroup='" + priceGroup + "' and ItemNo='" + itemNo + "'";
        execute(qry);
        unitPrice = executeQry[0].UnitPrice;
    }
    else {
        qry = "select UnitPrice  from Item Where ItemNo='" + itemNo + "'";
        execute(qry);
        unitPrice = executeQry[0].UnitPrice;
    }

    //var qry = "select BaseQty from uom where ItemNo='" + itemNo + "' and uom='" + uom + "'";
    //execute(qry);
    //var baseQty = executeQry[0].BaseQty;

    //Qty=a+b --store tmp table
    var qryA = "select BaseQty from uom where ItemNo='" + itemNo + "' and uom='" + uom + "'";
    execute(qryA);
    var oneCasBbaseQty = executeQry[0].BaseQty;
    var baseQtyA = executeQry[0].BaseQty;
    var bulkQtyA = bulkQty * baseQtyA;
    // $('#ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName + ' tr')[rowIndex].children.Amount.innerHTML = Price * bulkQty;//(baseQty * Price) * bulkQty;
    var amount = bulkQtyA * unitPrice;
    $('#ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName + ' tr')[rowIndex].children.Amount.innerHTML = amount;//(baseQty * Price) * bulkQty;
    $('#ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName + ' tr')[rowIndex].children.Price.innerHTML = oneCasBbaseQty * unitPrice;
    //}
    // if (dataMember == "LooseQty") {
    var looseQty = FormView[listFieldName].LooseQty == "" ? 0 : parseFloat(FormView[listFieldName].LooseQty);
    var looseQtyB = 0;
    if (looseQty != 0 && looseQty != "") {
        var loosePrice = FormView[listFieldName].Price == "" ? 0 : parseFloat(FormView[listFieldName].Price);
        var looseItemNo = $('#ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName + ' tr')[rowIndex].children.ItemNo.innerHTML;
        var looseuom = $('#ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName + ' tr')[rowIndex].children.LooseUOM.innerHTML;
        var qry = "select BaseQty from uom where ItemNo='" + looseItemNo + "' and uom='" + looseuom + "'";
        execute(qry);
        var looseBaseQty = executeQry[0].BaseQty;
        looseQty = looseQty * looseBaseQty;
        looseQtyB = looseQty;//* looseBaseQty;
        //Todo
        // var looseQtyAmount = Price * looseQty / 100;
        //var looseQtyAmount = loosePrice * looseQty;
        var looseQtyAmount = looseQty * unitPrice;
        var bulkQtyAmount = $('#ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName + ' tr')[rowIndex].children.Amount.innerHTML;
        $('#ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName + ' tr')[rowIndex].children.Amount.innerHTML = parseFloat(bulkQtyAmount) + looseQtyAmount;
    }
    var qtyC = parseFloat(bulkQtyA) + parseFloat(looseQtyB);
    //$('#ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName + ' tr')[rowIndex].children.Qty.innerText =qtyC;
    $('#ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName + ' tr')[rowIndex].children.Qty.innerHTML = qtyC;

    //this line added for sales order..
    listFieldName = tempListFieldName;;
    var listParameter = objListParameter['ListParameter_' + CurrentScreen_TabScreen_Name + '_' + listFieldName];
    OrderCalculations(listParameter.scrName, listParameter.fieldName);
}

function BulkUOMCalculation1(listFieldName, dataMember, rowIndex) {
    var tempListFieldName = listFieldName;
    //if (dataMember == "BulkQty") {
    if (FormView[listFieldName] == undefined)
        listFieldName = FormView.FieldName;
    var bulkQty = FormView[listFieldName].BulkQty == "" ? 0 : parseFloat(FormView[listFieldName].BulkQty);
    var Price = FormView[listFieldName].Price == "" ? 0 : parseFloat(FormView[listFieldName].Price);
    var itemNo = $('#ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName + ' tr')[rowIndex].children.ItemNo.innerHTML;
    var uom = $('#ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName + ' tr')[rowIndex].children.BulkUOM.innerHTML;

    var qryA = "select BaseQty from uom where ItemNo='" + itemNo + "' and uom='" + uom + "'";
    execute(qryA);
    var baseQtyA = executeQry[0].BaseQty;
    var bulkQtyA = bulkQty * baseQtyA;

    var looseQty = FormView[listFieldName].LooseQty == "" ? 0 : parseFloat(FormView[listFieldName].LooseQty);
    var looseQtyB = 0;
    if (looseQty != 0 && looseQty != "") {
        var Price = FormView[listFieldName].Price == "" ? 0 : parseFloat(FormView[listFieldName].Price);
        var itemNo = $('#ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName + ' tr')[rowIndex].children.ItemNo.innerHTML;
        var uom = $('#ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName + ' tr')[rowIndex].children.LooseUOM.innerHTML;
        var qry = "select BaseQty from uom where ItemNo='" + itemNo + "' and uom='" + uom + "'";
        execute(qry);
        var baseQty = executeQry[0].BaseQty;
        looseQty = looseQty * baseQty;
        looseQtyB = looseQty * baseQty;
    }
    var qtyC = parseFloat(bulkQtyA) + parseFloat(looseQtyB);
    $('#ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName + ' tr')[rowIndex].children.Qty.innerHTML = qtyC;

}

function formComboChange(obj, dataMember, rowIndex, value) {

    try {
        const element = document.querySelector('[aria-labelledby="select2-' + dataMember + '-container"]');
        element.style.border = "1px solid Lightgrey";
        document.getElementById(dataMember).style.border = "1px solid Lightgrey";
        var el = document.getElementById("tooltip_" + dataMember);
        el.remove();
    } catch (e) {

    }

    //_LoadingImageOpen();

    var _obj = {};
    _obj.fieldName = dataMember;
    _obj.value = $('#' + dataMember).val();
    PerformAction('formComboChange', _obj/*, dataMember*/);

    //_LoadingImageClose();

}



//function FormDatePickerChanged(obj, dataMember, rowIndex, value) {
//    alert('datepicker change event called');
//    var _obj = {};
//    _obj.fieldName = dataMember;
//    _obj.value = $('#' + dataMember).val();
//    PerformAction('formComboChange', _obj/*, dataMember*/);
//}


function comboBoxFormItemClicked(title, index, text, code, screenName, fieldName, searchType, dataMember) {



    var _obj = {};
    _obj.rowIndex = index;
    _obj.value = $('#' + fieldName).val();
    _obj.fieldName = fieldName;
    PerformAction('comboBoxFormItemClicked', _obj);

   

    if (fieldName != dataMember) {
        //Ti.App.ARRAYOPERATION.handleFieldAction(screenName, fieldName, dataMember);
        handleFieldAction(screenName, fieldName, dataMember);
    }

}




//function formComboChange(obj, dataMember, rowIndex, value) {
//    var _obj = {};
//    _obj.fieldName = dataMember;
//    _obj.value = $('#' + dataMember).val();
//    PerformAction('formComboChange', _obj/*, dataMember*/);
//}

function formCheckBoxValueChanged(obj, dataMember, rowIndex, value) {
    if (ProjectName == 'UIC' && currentScreenName == 'PhotoManagementUpdatedForm' && dataMember == 'OptionALL') {
        $("input[type=radio][name=FilterType]").prop('checked', false); //$('#FilterType').removeAttr('checked');
    }
    var _obj = {};
    // value = COMMON.CheckBooleanField(value);
    _obj.value = CheckBoxFieldValue(dataMember);
    _obj.fieldName = dataMember;
    // PerformAction('formOptionChange', _obj/*, dataMember*/);
    PerformAction('formCheckBoxValueChanged', _obj/*, dataMember*/);
}
// function checkBoxValueChanged(obj, iIndex, value, fieldName, ttbodyId) {
// setListValue(obj, iIndex, value, fieldName, ttbodyId);

function checkBoxValueChanged(obj, dataMember, iIndex, ttbodyId, tfoot, fieldName, pageNo) {

    if (pageNo != "" && pageNo != undefined && isPageMultiSelect == true && obj.checked == false) {
        $('#HeaderCheckBox_' + pageNo).attr('checked', false)
    }
    else if (obj.checked == true && pageNo != undefined && isPageMultiSelect == true) { // newly added pvmn&& isPageMultiSelect == true 
        var tblbody = document.getElementById(ttbodyId);
        var ttableId = ttbodyId.replace("ListBodyDivId", "table")
        var table = document.getElementById(ttableId);
        var rows = table.getElementsByTagName('tr');

        var isListCheckBoxAllEnabled = true;
        for (var i = 0; i < rows.length - 1; i++) {
            //for (var i = 0; i < rows.length  ; i++) {
            var cells = rows[i].getElementsByTagName('td');
            if (!cells.length) {
                continue;
            }
            if (tblbody.rows[(i - 1)].cells.namedItem(cells[0].id).childNodes['0'].checked == false)
                isListCheckBoxAllEnabled = false;
        }
        if (isListCheckBoxAllEnabled == true)
            $('#HeaderCheckBox_' + pageNo).attr('checked', true)

    }


    setListValue(obj, dataMember, iIndex, ttbodyId);
    var _obj = {};
    //  value = COMMON.CheckBooleanField(value);
    //CheckBoxFieldValue(fieldName);
    _obj.value = obj.checked;
    _obj.fieldName = dataMember;//_this.fieldName;
    TiAPIinfo("JSON.stringify(_obj) ---> " + JSON.stringify(_obj));

    //COMMENTED 03.02.2021 
    _listLookUpIndex = iIndex;
    PerformAction('CheckBoxValueChanged', _obj);

    ////
    if (isMultiSelect == false) {
        _isListNewRowAdd = true;
        _listLookUpFieldName = FieldName;
        _listLookUpttbody = ttbodyId;
        _listLookUpttfoot = tfoot;
        _listLookUpIndex = iIndex;


        //Changes done by Vignesh 19/06/2024
        //if (FormView[fieldName][dataMember] != "" && dynamictableTotalRowCount != "")
        //    dynamicNewRowAdd();
        if (ProjectName == "CPF" && FormView[fieldName][dataMember] != true && FormView[fieldName][dataMember] != "" && dynamictableTotalRowCount != "")
            dynamicNewRowAdd();
        else if (ProjectName != "CPF" && FormView[fieldName][dataMember] != "" && dynamictableTotalRowCount != "")
            dynamicNewRowAdd();
    }

    ///



    if (currentScreenName == 'ExportDataForm' && dataMember == 'Export') {
        if (ProjectName.toLowerCase() == "targetmedia") {
            ClearExistingCheckedListData(iIndex, dataMember, ttbodyId);
        }
    }
    ///
}


function listCheckBoxValueChanged(obj, dataMember, rowIndex, value, ttbodyId, tfoot, fieldName) {
   

    try {
        if ((ProjectName == "CPF" || ProjectName == "FGV" || ProjectName == "EBFF" || ProjectName == "FFB") && currentScreenName.toLowerCase() == "paymentscollectionnewform" && dataMember == "AmtChk") {
            var tbl = document.getElementById(ttbodyId);
            if (tbl.rows[rowIndex].cells[0].childNodes[0].checked == true) {
                // tbl.rows[rowIndex].cells[0].childNodes[0].value
                tbl.rows[rowIndex].cells[5].childNodes[0].disabled = false; //.style.cursor = 'not-allowed';
                tbl.rows[rowIndex].cells[5].childNodes[0].style.cursor = 'pointer';
            }
            else {
                tbl.rows[rowIndex].cells[5].childNodes[0].disabled = true; //.style.cursor = 'not-allowed';
                tbl.rows[rowIndex].cells[5].childNodes[0].style.cursor = 'not-allowed';
            }
        }
    } catch (e) {

    }

   
        ////
        _isListNewRowAdd = true;
        _listLookUpFieldName = FieldName;
        _listLookUpttbody = ttbodyId;
        _listLookUpttfoot = tfoot;
    _listLookUpIndex = rowIndex;

    if (ProjectName == "FGV" && currentScreenName == "ImportDataForm") {

    } else {
        if (FormView[fieldName][dataMember] != "")
            dynamicNewRowAdd();
    }

    setListValue(obj, dataMember, rowIndex, ttbodyId);


    var _obj = {};
    _obj.value = CheckBoxFieldValue(dataMember);
    _obj.fieldName = dataMember;
    PerformAction('listOptionChange', _obj/*, dataMember*/);

    ///
}

function formradioButtonValueChanged(obj, dataMember, rowIndex, value) {

    if (ProjectName == 'UIC' && currentScreenName == 'PhotoManagementUpdatedForm' && dataMember == 'FilterType') {
        document.getElementById("OptionALL").checked = false; 
    }

    ListSelectedId = [];
    radioValue = RadioButtonFieldvalue(dataMember);
    var _obj = {};
    _obj.value = radioValue;
    _obj.fieldName = dataMember;
    PerformAction('formRadioButtonChange', _obj/*, dataMember*/);

    //todo 26.07.2019 -- itempromotion
    ////this line is added for customer routing
    //var _obj = {};
    //_obj.fieldName = 'TempTableDelete';
    //PerformAction('listTextFieldLostFocus', _obj);
    //for (var i = 0; i < _objArray.arrForm.length; i++) {
    //    fieldControl = _objArray.arrForm[i].fieldControl;
    //    id = _objArray.arrForm[i].DataMember;
    //    if (fieldControl != "LISTVIEW" && id != "") {
    //        textvalue = fieldControl == "LABEL" ? $('#' + id).text() : fieldControl == "RADIOBUTTON" ? $('input[name=' + id + ']:checked').val() : $('#' + id).val();
    //        var selValue = $('input[name=rbnNumber]:checked').val();

    //        FormView[id] = textvalue;
    //    }
    //}
    //FormView.FieldName = FieldName;
    //FormView.UserID = _UserID;
    //dataFieldIdList = FormView;
    //var listParameter = objListParameter['ListParameter_' + CurrentScreen_TabScreen_Name + '_' + FieldName];
    //if (currentScreenName == "ItemPromotionForm" || currentScreenName == "InvoicePromotionForm") {
    //    listParameter = objListParameter['ListParameter_' + CurrentScreen_TabScreen_Name + '_Item'];
    //    objAddDynamicListCount['ListConfig_' + CurrentScreen_TabScreen_Name + '_Item'] = -1;
    //    // AddDynamicListItemPromtion(listParameter.scrName, listParameter.ttbody, listParameter.fieldName);
    //}
    //if (listParameter != undefined)
    //    DynamicFormListConfigRow(listParameter.ttbody, listParameter.tfoot, listParameter.scrName, 1, '', listParameter.fieldName, listParameter.actionType, "no");
}

function initSaveButtonClick() {
    PerformAction('initSaveButtonClick', {});
}
function saveButtonClickfunction() {
    PerformAction('saveButtonClick', {});
}
function finalizeSaveButtonClick() {
    PerformAction('finalizeSaveButtonClick', {});
}

//todo
function formReadonlyClicked(obj, dataMember, rowIndex, value) {
    var _obj = {};
    _obj.fieldName = dataMember;
    _obj.value = $('#' + dataMember).val();
    PerformAction('formReadonlyClicked', _obj/*, dataMember*/);
}


//function formAutoCompleteFocused(obj, dataMember, rowIndex, value) {
//    id = dataMember;
//    $('#' + id).autocomplete({
//        source: function (request, response) {
//            //id = 'Run';
//            var myLength = $('#' + id).val().length;
//            //if (myLength <= 2)
//            //    return;

//            if (id == "Run" && runData != "") {
//                try {
//                    var runData1;

//                    var condValue1 = $('#' + id).val();
//                    runData1 = runData.filter(x => x.label.indexOf(condValue1.toUpperCase()) > -1);

//                    response($.map(runData1, function (item) {
//                        return item;
//                    }))
//                } catch (err) {

//                }
                
//            }
//            else if (id == "ShipToCountry" && shiptocountryData != "")
//            {
//                try {
//                    var runData1;

//                    var condValue1 = $('#' + id).val();
//                    runData1 = shiptocountryData.filter(x => x.label.indexOf(condValue1.toUpperCase()) > -1);

//                    response($.map(runData1, function (item) {
//                        return item;
//                    }))
//                } catch (err) {

//                }
//            }
//            else {
//                sName = currentScreenName + "_AUTOCOMPLETE_" + id;
//                var qry = getString['QueryConfig_' + sName];
//                qry += ' ' + getString['QueryConfig_' + sName + '_GroupText'];
//                qry += ' ' + getString['QueryConfig_' + sName + '_OrderText'];

//                if (id == "Run" && runData == "")
//                    qry = qry.replace("{FormView.Run.LIKE}", "");
//                else if (id == "ShipToCountry" && shiptocountryData == "")
//                    qry = qry.replace("{FormView.ShipToCountry.LIKE}", "");
//                else
//                qry = formatQueryString(qry, sName);//ScreenView

//                $.ajax({
//                    url: '../Common/AutoComplete/',
//                    data: { qry: qry },
//                    dataType: "json",
//                    type: "POST",
//                    // contentType: "application/json; charset=utf-8",
//                    success: function (data) {

//                        if (id == "Run") {
//                            runData = data;

//                            try {
//                                var runData1;

//                                var condValue1 = $('#' + id).val();
//                                runData1 = runData.filter(x => x.label.indexOf(condValue1.toUpperCase()) > -1);
//                                response($.map(runData1, function (item) {
//                                    return item;
//                                }))
//                            } catch (err) {

//                            }

                           
//                        }
//                        else if (id == "ShipToCountry") {
//                            shiptocountryData = data;

//                            try {
//                                var runData1;

//                                var condValue1 = $('#' + id).val();
//                                runData1 = shiptocountryData.filter(x => x.label.indexOf(condValue1.toUpperCase()) > -1);
//                                response($.map(runData1, function (item) {
//                                    return item;
//                                }))
//                            } catch (err) {

//                            }


//                        }
//                        else {
//                            response($.map(data, function (item) {
//                                return item;
//                            }))
//                        }
//                    },
//                    error: function (response) {
//                        alert(response.responseText);
//                    },
//                    failure: function (response) {
//                        alert(response.responseText);
//                    }
//                });
//            }
//        },
//        select: function (e, i) {
//            $('#' + id).val(i.item.val)
//            // $("#hfCustomer").val(i.item.val);

//            var _obj = {};
//            _obj.fieldName = id;
//            _obj.value = i.item.val;

//            //  PerformAction('autoLookupEntered', _obj);
//            PerformAction('autoCompleteEntered', _obj);

//        },
//        minLength: 1
//    });
//    //var _obj = {};
//    //_obj.fieldName = dataMember;
//    //_obj.value = $('#' + dataMember).val();
//    //PerformAction('formReadonlyClicked', _obj/*, dataMember*/);
//}


//
function formTextAreaFocus(obj, dataMember, rowIndex, value) {
    var _obj = {};
    _obj.fieldName = dataMember;
    _obj.value = $('#' + dataMember).val();
    PerformAction('formTextAreaFocus', _obj/*, dataMember*/);
}
//
function formTextAreaLostFocus(obj, dataMember, rowIndex, value) {
    var _obj = {};
    _obj.fieldName = dataMember;
    _obj.value = $('#' + dataMember).val();
    PerformAction('formTextAreaLostFocus', _obj/*, dataMember*/);
}

//
function formTextAreaChange(obj, dataMember, rowIndex, value) {
    var _obj = {};
    _obj.fieldName = dataMember;
    _obj.value = $('#' + dataMember).val();
    PerformAction('formTextAreaChange', _obj/*, dataMember*/);
}

//
function formLabelClicked(obj, dataMember, rowIndex, value) {
    var _obj = {};
    _obj.fieldName = dataMember;
    _obj.value = $('#' + dataMember).text();
    PerformAction('formLabelClicked', _obj/*, dataMember*/);
}

function formAutoCompleteClicked(obj, dataMember, value) {
    var _obj = {};
    _obj.fieldName = dataMember;
    _obj.value = $('#' + dataMember).val();
    PerformAction('formAutoCompleteClicked', _obj/*, dataMember*/);
}

//
isListLookUpClicked = false;
var _lookUpFieldId = '';
//function formLookUpClicked(obj, dataMember, rowIndex, value) {
function formLookUpClicked1(obj, dataMember, rowIndex, value) {
    // SetFormView();
    LastParams.FormView = Params.FormView;
    Params.FormView = FormView;
    FormView = {};

    objParams.fieldName = FieldName;
    objParams.dynamicFieldName = dynamicFieldName;
    _lookUpFieldId = dataMember;
    isListLookUpClicked = true;
    var _obj = {};
    _obj.fieldName = dataMember;
    _obj.value = $('#' + dataMember).text();
    // PerformAction('formLookUpClicked', _obj);
    scrName = '';
    if (currentScreenName == "CustomerPriceForm") {
        if ($("input:radio[name='SalesType']:checked").val() == undefined) {
            alert('Please select the sales type');
            return false;
        }
        else {
            scrName = $("input:radio[name='SalesType']:checked").val().replace(" ", "");
            if (scrName.toLowerCase() == "customers" || scrName.toLowerCase() == "pricegroup") {
                //  dataMember = scrName;
                // _lookUpId = scrName;
                _lookUpFieldId = scrName;
                //GetGridHeaderDetails(url_GetListConfig, url_GetListValue, "ListPopUpHeadDivId", "ListPopUpBodyDivId", "ListPopUpfootDivId", scrName);
            }
            else {
                $('#dialog').dialog('close');
                $('#' + _lookUpId).val('');
            }
        }
    }
    //   else {
    var htm = '';

    htm += '<div id="okbtn_' + CurrentScreen_TabScreen_Name + '_' + dataMember + '"  style="width: 30%; display: inline-block; float: left; margin-top: 0px; margin-right: 0px;">';
    // if (isdynamic == true && CurrentScreen_TabScreen_Name != "InventoryAdjustmentForm") {
    if (isdynamic == true && currentScreenName != "ItemPromotionForm" && currentScreenName != "InvoicePromotionForm") {
        //if (isdynamic == true) {
        isMultiSelect = true;
        htm += '<div style="width: 20%; display: inline-block;">';
        htm += '<input type="button" value="Ok" onclick="AssignListDynamicData();" style="width: 100%;">';
        htm += '</div>';
    }
    else {
        isMultiSelect = false;
    }
    htm += '</div>';

    htm += '<div id="SearchDiv_' + CurrentScreen_TabScreen_Name + '_' + dataMember + '" style="width: 70%; display: inline-block; float: right; margin-top: 0px; margin-right: 0px;">';
    //htm += '<div id="SearchDiv_' + CurrentScreen_TabScreen_Name + '_' + data[i].FieldName + '" style="width: 50%; display: inline-block; float: right; margin-top: 0px; margin-right: 0px;display:none">';
    htm += '<div style="width: 20%; display: inline-block;">';
    htm += 'Search : ';
    htm += '</div>';

    htm += '<div style="width: 38%; display: inline-block; ">';
    htm += '<select id="SearchFieldId_' + CurrentScreen_TabScreen_Name + '_' + dataMember + '" onchange="SetSearchControl(\'' + CurrentScreen_TabScreen_Name + '_' + dataMember + '\');"></select>';
    // htm += '<select id="SearchFieldId_' + dataMember + '" onchange="SetSearchControl(\'' + dataMember + '\');"></select>';
    htm += '</div>';
    htm += '<div id="SearchOptionId_' + CurrentScreen_TabScreen_Name + '_' + dataMember + '" style="width: 40%; display: inline-block; float: right;">';
    //htm += '<div id="SearchOptionId_' + dataMember + '" style="width: 40%; display: inline-block; float: right;">';
    htm += '<input type="text" id="" />';
    htm += '</div>';

    htm += '</div>';
    htm += '</div>';

    htm += '<br />';

    htm += '<div style="width: 100%">';
    htm += '<div id="SearchMultiListAdd_' + CurrentScreen_TabScreen_Name + '_' + dataMember + '" >';
    htm += '</div>';
    htm += '</div>';

    htm += '<br />';



    if (scrName != '')
        htm += '<table id="table_' + CurrentScreen_TabScreen_Name + '_' + scrName + '" class="table table-striped table-bordered tableId">';
    else
        htm += '<table id="table_' + CurrentScreen_TabScreen_Name + '_' + dataMember + '" class="table table-striped table-bordered tableId">';
    htm += '<thead id="ListPopUpHeadDivId">';
    htm += '</thead>';
    htm += '<tbody id="ListPopUpBodyDivId">';
    htm += '</tbody>';
    htm += '<tfoot id="ListPopUpfootDivId">';
    htm += '</tfoot>';
    htm += '</table>';
    $('#popupdialog').html(htm);

    //var scrName = TabScreenName == '' ? screenName + "_FORM_LOOKUP_" + lookUpId : screenName + "_" + TabScreenName + "_FORM_LOOKUP_" + lookUpId
    var scrnName = TabScreenName == '' ? currentScreenName : currentScreenName + "_" + TabScreenName;

    if (scrName != '')
        FormListConfigHeader("ListPopUpHeadDivId", "ListPopUpBodyDivId", "ListPopUpfootDivId", scrnName, scrName, url_GetLookUpListConfig, 'LOOKUP');
    else
        FormListConfigHeader("ListPopUpHeadDivId", "ListPopUpBodyDivId", "ListPopUpfootDivId", scrnName, dataMember, url_GetLookUpListConfig, 'LOOKUP');
    //FormListConfigHeader("ListPopUpHeadDivId", "ListPopUpBodyDivId", "ListPopUpfootDivId", currentScreenName, dataMember, url_GetLookUpListConfig, 'LOOKUP');
    //  $('#dialog').dialog({ title: "" + currentScreenName + " Details" }).dialog('open');
    //$('#popupdialog').dialog();
    $('#popupdialog').dialog({
        //autoOpen: false,
        width: "50%",
        //resizable: false,
        title: '' + currentScreenName + ' Details',
        modal: true,
        closeOnEscape: false,
        beforeClose: function (e, a, b) {
          
            if (e.cancelable == true)
                uiIconCloseThick();
        }
    });


    // $('#popupdialog').dialog("close");
    // }

}

function uiIconCloseThick() {
    isListLookUpClicked = false;
    FormView = Params.FormView;
    Params.FormView = LastParams.FormView;

    FieldName = objParams.fieldName;
    dynamicFieldName = objParams.dynamicFieldName;
    //newly add by.M 23.03.2022 empire snapshot
    isFormLookUpClicked = false;
    
}
function formMultiOptionListClicked(fieldName, dataMember) {
    var _obj = {};
    _obj.dataMember = dataMember;
    _obj.fieldName = fieldName;
    PerformAction('formMultiOptionListClicked', _obj/*, dataMember*/);
}
function FormDatePickerClicked(obj, dataMember, rowIndex, value) {
    var _obj = {};
    _obj.value = $('#' + dataMember).val();
    _obj.fieldName = dataMember;
    PerformAction('datePickerClicked', _obj/*, dataMember*/);
}
function datePickerClicked(text, index, screenName, fieldName, searchType) {
    var _obj = {};
    _obj.value = text;
    _obj.rowIndex = index;
    _obj.fieldName = fieldName;
    PerformAction('datePickerClicked', _obj/*, dataMember*/);
}

function datePickerClicked(text, index, screenName, fieldName, searchType) {
    var _obj = {};
    _obj.value = text;
    _obj.rowIndex = index;
    _obj.fieldName = fieldName;
    PerformAction('datePickerClicked', _obj/*, dataMember*/);
}


function formTabGroupclicked(obj, dataMember, rowIndex, value) {
    var _obj = {};
    _obj.fieldName = dataMember;
    _obj.value = $('#' + dataMember).val();
    PerformAction('formTextAreaChange', _obj/*, dataMember*/);
}


function rowItemClicked(row, screenName) {

    var _obj = {};
    for (var i = 0; i < HeaderFieldNameArrayList.length; i++) {
        id = HeaderFieldNameArrayList[i];
        textvalue = isListLookUpClicked == true ? row.currentTarget.cells[i].innerText : row.currentTarget.cells[(i + 1)].innerText;
        _obj[id] = textvalue;
    }
    window.location = url_FormView + "?ScreenName=" + FieldName + "&ActionName=rowItemClicked&data=" + _obj;

    if (isListLookUpClicked == true) {
        var scr = screenName + "_" + TabScreenName + "_popup_" + buttonTextId;
        scr = screenName;
        if (formListLookUp == true)
            scr = screenName + "_LIST_LOOKUP_" + buttonTextId;

        PerformAction('rowItemClicked', _obj, buttonTextId, scr);
        //PerformAction('rowItemClicked', _obj, buttonTextId, scr);
        var formData = '';

        returnData = returnData.replace('[', '').replace(']', '');
        formData = $.parseJSON(returnData);
        if (formData != null)
            $.each(formData, function (key, value) {
                var val = _obj[key];
                if (formListLookUp == true)
                    $('#' + key + '_' + currentRowClickCount).val(val).attr("disabled", true);
                else
                    $('#' + key).val(val).attr("disabled", true);

            });
        if (formListLookUp == true) {
            if (addCount <= parseInt(currentRowClickCount) || totalItemTableRowCount <= 2)
                addDynamicitem(formListscrName, formListttbody);
            formListLookUp = false;
        }


    }
    else {

        //PerformAction('rowItemClicked', _obj, '', screenName);
        //var formData = $.parseJSON(returnData.split('$')[0]);

        //isPopUpCreateForm = returnData.split('$')[1] == "FORM" ? false : true;
        //isPopUpCreateForm = false;
        //if (isPopUpCreateForm == true) {
        //    GetFormConfig("FormDivId", screenName);
        //    $('#createPopupDialog').dialog({ title: "" + screenName + " Edit Form" }).dialog('open');
        //    $('#createPopupDialogHiddenId').hide();
        //    AssignFormData(formData);
        //}
        //else {
        //    var taburl = url_FormView + "?screenName=" + screenName + "&Id=" + ActionId;
        //    window.location = taburl;
        //    // window.open(taburl, '_blank');
        //}





    }

}

function rowItemDoubleClicked(row) {
    var _obj = {};
    _obj.rowIndex = row.index;
    PerformAction('rowItemDoubleClicked', _obj);
}



function NewCreateForm(obj, dataMember, rowIndex, value) {
    //$('.formContainer').show();
    //$('#ListDiv').hide();


    if (true) {

        var _obj = {};
        PerformAction('formButtonClicked', _obj/*, dataMember*/);
        isPopUpCreateForm = returnData.split('$')[1] == "FORM" ? false : true;
        //todo
        //if (isPopUpCreateForm == false) {
        //    window.location = url_GetCreate + "?screenName=" + screenName;
        //    taburl = url_GetCreate + "?screenName=" + screenName;
        //    // window.open(taburl, '_blank');
        //    //window.open(taburl, 'mywindow', 'width=400,height=200')
        //    //window.open(taburl, 'mywindow', 'width=1400,height=700')
        //}
        //else if (isPopUpCreateForm == true) {
        //    GetFormConfig("FormDivId", screenName);
        //    $('#createPopupDialog').dialog({ title: "" + screenName + " Create Form" }).dialog('open');
        //    $('#createPopupDialogHiddenId').hide();
        //    PerformAction("formTextboxfocus", "", "");
        //    $("#" + returnData).focus();
        //}

        GetFormConfig("FormDivId", screenName);
        $('#createPopupDialog').dialog({ title: "" + screenName + " Create Form" }).dialog('open');
        $('#createPopupDialogHiddenId').hide();
        PerformAction("formTextboxfocus", "", "");
        $("#" + returnData).focus();
    }
}

function formButtonClickedTodo(actionName, fieldName) {
    var data = {};
    var id = '';
    var value = '';

    for (var i = 0; i < FieldIdList.length; i++) {
        var dataMember = FieldIdList[i].split('$')[0];
        var fieldControl = FieldIdList[i].split('$')[1];
        var dataMemberType = FieldIdList[i].split('$')[2];
        if (fieldControl == "option") {
            if (dataMember != "") {
                id = dataMember;
                value = CheckBoxFieldValue(dataMember);
                data[id] = value;
            }
        }
        else if (fieldControl == "radioButton") {
            if (dataMember != "") {
                id = dataMember;
                value = RadioButtonFieldvalue(dataMember);
                data[id] = value;
            }
        }

        else if (fieldControl == "datepicker") {
            if (dataMember != "") {
                id = dataMember;
                value = $('#' + dataMember).val() == '' ? '' : DateFormateChange($('#' + dataMember).val());
                data[id] = value;
            }
        }
        else {
            if (dataMemberType == "int" || dataMemberType == "float" || dataMemberType == "decimal") {
                id = dataMember;
                value = $('#' + dataMember).val() == "" ? "0" : $('#' + dataMember).val();
                data[id] = value;
            }
            else {
                id = dataMember;
                value = $('#' + dataMember).val();
                data[id] = value;
            }
        }
    }

    PerformAction(actionName, data, fieldName);
    alert(returnData);
    isListLookUpClicked = false;
    GetGridHeaderDetails(url_GetListConfig, url_GetListValue, "ListHeadDivId", "ListBodyDivId", 'ListfootDivId', '', '');
    ClickClearFuncton();
}

function assignDataToObject(screenName) {

    formFieldIdList["FormConfig_" + screenName];
    var data = {};
    var id = '';
    var value = '';

    for (var i = 0; i < formFieldIdList["FormConfig_" + screenName].length; i++) {
        var dataMember = formFieldIdList["FormConfig_" + screenName][i].DataMember;
        var fieldControl = formFieldIdList["FormConfig_" + screenName][i].FieldControl;
        var dataMemberType = '';
        if (fieldControl == "option") {
            if (dataMember != "") {
                id = dataMember;
                value = CheckBoxFieldValue(dataMember);
                data[id] = value;
            }
        }
        else if (fieldControl == "radioButton") {
            if (dataMember != "") {
                id = dataMember;
                value = RadioButtonFieldvalue(dataMember);
                data[id] = value;
            }
        }

        else if (fieldControl == "datepicker") {
            if (dataMember != "") {
                id = dataMember;
                value = $('#' + dataMember).val() == '' ? '' : DateFormateChange($('#' + dataMember).val());
                data[id] = value;
            }
        }
        else {
            if (dataMemberType == "int" || dataMemberType == "float" || dataMemberType == "decimal") {
                id = dataMember;
                value = $('#' + dataMember).val() == "" ? "0" : $('#' + dataMember).val();
                data[id] = value;
            }
            else {
                id = dataMember;
                value = dataMember == " " ? "" : $('#' + dataMember).val();
                data[id] = value;
            }
        }
    }
}

function CheckBoxFieldValue(dataMember) {

  return $("#" + dataMember).is(":checked");
}

function RadioButtonFieldvalue(dataMember) {
    // return $("input:radio[name='" + dataMember + "']:checked").val().replace(" ", "");
    return $("input:radio[name='" + dataMember + "']:checked").val();
}

function viewPassword(id) {
    var passwordInput = document.getElementById(id);
    var passStatus = document.getElementById('pass-status_' + id);

    if (passwordInput.type == 'password') {
        passwordInput.type = 'text';
        //passStatus.className = 'fa fa-eye-slash';
        passStatus.className = 'fa fa-eye';
    }
    else {
        passwordInput.type = 'password';
        //passStatus.className = 'fa fa-eye';
        passStatus.className = 'fa fa-eye-slash';

    }
}


////////////////////////////

function getElementsByClassName(node, classname) {
    if (node.getElementsByClassName) { // use native implementation if available
        return node.getElementsByClassName(classname);
    } else {
        return (function getElementsByClass(searchClass, node) {
            if (node == null)
                node = document;
            var classElements = [],
                els = node.getElementsByTagName("*"),
                elsLen = els.length,
                pattern = new RegExp("(^|\\s)" + searchClass + "(\\s|$)"), i, j;

            for (i = 0, j = 0; i < elsLen; i++) {
                if (pattern.test(els[i].className)) {
                    classElements[j] = els[i];
                    j++;
                }
            }
            return classElements;
        })(classname, node);
    }
}
function toggle_visibility(className, lineColor) {
    var elements = getElementsByClassName(document, className),
        n = elements.length;

    //alert('n -> ' + n);

    for (var i = 0; i < n; i++) {
        var e = elements[i];
        e.style.stroke = lineColor;
    }
}



function strReplace(str) {
    str = str.replace(/@@/g, '"').replace(/'{/g, '{').replace(/}'/g, '}');
    return str;
}


function getChartData(fieldCount, query) {
    //db = new dbConnection().createDataBaseConnection();
    //dbDataRows = Ti.App.dbConn.execute(query);

    //dbDataRows = execute(query);
    //dbDataRows = executeQry;
    executeFieldList(query);
    dbDataRows = executeQry;
    str = '';


    //fieldCount = ['string','number']


    //  if (dbDataRows.length > 0)
    // while (dbDataRows.isValidRow()) {

    for (var j = 0; j < dbDataRows.length; j++) {

        //var len = (Ti.Platform.osname === 'android') ? dbDataRows.fieldCount : dbDataRows.fieldCount();
        //alert(len);

        if (str == '') {
            str = '{';
        } else {
            str += '##{';
        }
        var str1 = '';

        for (var i = 0; i < fieldCount.length; i++) {

            //Ti.API.info
            if (fieldCount[i] == 'string') {
                str1 = '@@';
            } else {
                str1 = '';
            }
            if (i == 0) {
                str += dbDataRows[j].FieldName + ':' + str1 + dbDataRows[j].Field + str1;
                j++;
                //  str += dbDataRows.fieldName(i) + ':' + str1 + dbDataRows.field(i) + str1;
            } else {
                str += ',' + dbDataRows[j].FieldName + ':' + str1 + dbDataRows[j].Field + str1;
                // str += ',' + dbDataRows.fieldName(i) + ':' + str1 + dbDataRows.field(i) + str1;
            }
            /*if(i == 0){
                str += dbDataRows.fieldName(i)+':@@'+dbDataRows.field(i)+'@@';
            }else{
                str += ',' +dbDataRows.fieldName(i)+':@@'+dbDataRows.field(i)+'@@'; 
            }*/
        }
        str += '}';
        //  dbDataRows.next();
    }
    // dbDataRows.close();
    //db.close();
    return str;
}

function myfunction2() {
    myfunction1();
    alert('Function called after the IFrame load')
}




function tabwindowclose() {
    window.open('', '_self', '').close();
    window.close();
}

function close_window() {
    this.window.open('', '_self', '');
    this.window.close();
}

function printMap() {
    const screenshotTarget = document.getElementById('map_canvas');// document.body;// document.getElementById("thecanvas");

    html2canvas(screenshotTarget, {
        useCORS: true,
        allowTaint: true,
        async: false,
    }).then((canvas) => {


        const base64image = canvas.toDataURL("image/png");
        //// window.location.href = base64image;
        //var tempcanvas = screenshotTarget;//document.createElement('canvas');
        ////tempcanvas.width = 1350;
        ////tempcanvas.height = 700;
        //var context = tempcanvas.getContext('2d');
        //context.drawImage(screenshotTarget, 0, 0, 1350, 700, 0, 0, 1350, 700);

        var link = document.getElementById('link');
        link.setAttribute('download', 'MintyPaper.png');
        link.setAttribute('href', base64image.replace("image/png", "image/octet-stream"));
        link.click();
    });
}

function openImageUpload(obj) {
    var idd = obj.id;
    idd = idd.replace('_btn', '');
    document.getElementById(idd + '_1').click();
}

//sundar added tooltip condition on 04/12/24
function TextFieldChangeTooltip(obj, dataMember, rowIndex, value) {
    try {
        var txt = $('#' + dataMember).val();
        if (txt != "") {
            var el = document.getElementById("tooltip_" + dataMember);
            if (el != null) {
                el.remove();
                document.getElementById(dataMember).style.border = "1px solid Lightgrey";
            }


        }
    } catch (e) {

    }
}
//finish



//sundar added tooltip condition on 04/12/24

function DropDownChangeToolTip(obj, dataMember, rowIndex, value) {
    try {

        var chk = "";
        chk = $('#' + dataMember).val();

        if (chk.toLowerCase().indexOf('select') > -1)
            chk = '';

        if (chk != "" || chk != null) {

            var el = document.getElementById("tooltip_" + dataMember);
            if (el != null) {
                el.remove();
                const element = document.querySelector('[aria-labelledby="select2-' + dataMember + '-container"]');
                element.style.border = "1px solid Lightgrey";
                document.getElementById(dataMember).style.border = "1px solid Lightgrey";
            }

        }

    } catch (e) {

    }
}

//finish