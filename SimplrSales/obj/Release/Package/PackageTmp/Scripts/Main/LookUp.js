
var lookUpTableList = [];
function GetLookUpFormConfig(id, screenName, scrnName) {
    $.ajax({
        type: 'POST',
        url: url_GetFormConfigList,
        dataType: 'json',
        data: { ScreenName: screenName },
        async: false,
        success: function (data) {
            lookUpTableList = [];
            ClearFormConfigArrayList();
            if (data != null && data.toString() != "") {
                $('.formContainer').show()
                $("#" + id).empty();
                showLookUpFormConfigList(id, data, 0, screenName, scrnName);
            }
        }
    });
}

function showLookUpFormConfigList(id, data, cnt, scrn, scrnName) {
    var htm = '';
    for (var i = 0; i < data.length; i++) {
        var fontWeight = data[i].HFontStyle;
        var fontWeightt = data[i].VFontStyle;
        var hForeColor = '';
        var hBackColor = '';
        var vForeColor = argbToRGB(data[i].VForeColor);
        var vBackColor = argbToRGB(data[i].VBackColor);

        var displayNo = data[i].DisplayNo.toString().split('.');
        if (displayNo.length == 1) {
            formdata = {};
            formdata.screenName = data[i].ScreenName;
            formdata.fieldName = data[i].FieldName;
            //formdata.FieldControl = data[i].FieldControl;
            formdata.fieldControl = data[i].FieldControl;
            formdata.FieldControl = data[i].FieldControl;
            formdata.DataMember = data[i].DataMember;
            formdata.DataMemberType = data[i].DataMemberType;
            formDataList.push(formdata);
            formItems.push(formdata);
            arrfrm.push(formdata);
            // formFieldNames.push(data[i].FieldName);
            formFieldNames.push(data[i].FieldName.toUpperCase());

            FieldNameFormArrayList.push(data[i].DataMember);
            var dataMemberType = data[i].DataMemberType.toLowerCase();
            if (dataMemberType != "int" && dataMemberType != "float" && dataMemberType != "decimal")
                dataMemberType = '';
            dataFieldIdList[data[i].DataMember] = '';
            formDataMember.push(data[i].DataMember);


            switch (data[i].FieldControl.toLowerCase()) {
                case "label":
                    //htm += '<div class="row">';
                    //htm += '<div  class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';
                    //if (data[i].HeaderWidth != 0) {
                    //    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                    //}
                    //htm += '</div>';
                    //htm += '<div  class="labeltext"  style="width:' + data[i].ValueWidth + "%" + ';">';
                    //htm += _lookUpTitle
                    //htm += '</div>';
                    //htm += '</div>';
                    break;
                case "line":
                    //htm += '<div class="row">';
                    //htm += '<div  class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';
                    //htm += '</div>';
                    //htm += '<div  class="labeltext" style="width:' + data[i].ValueWidth + "%" + ';">';
                    //htm += '<hr >';
                    //htm += '</div>';
                    //htm += '</div>';
                    break;


                case "listview":
                    var obj = {};
                    obj.tableId = 'table_' + scrnName + '_' + data[i].FieldName + '';
                    obj.theadId = 'ListHeadDivId_' + scrnName + '_' + data[i].FieldName + '';
                    obj.ttbody = 'ListBodyDivId_' + scrnName + '_' + data[i].FieldName + '';
                    obj.tfoot = 'ListfootDivId_' + scrnName + '_' + data[i].FieldName + '';
                    obj.screenName = data[i].ScreenName;
                    obj.fieldName = data[i].FieldName;
                    //obj.url = url_GetListConfig;
                    lookUpTableList.push(obj);

                    //htm += '<div id="okbtn_' + scrnName + '_' + data[i].FieldName + '"  style="width: 30%; display: inline-block; float: left; margin-top: 0px; margin-right: 0px;">';
                    ////// if (isdynamic == true && CurrentScreen_TabScreen_Name != "InventoryAdjustmentForm") {
                    ////if (isdynamic == true && currentScreenName != "ItemPromotionForm" && currentScreenName != "InvoicePromotionForm") {
                    ////    //if (isdynamic == true) {
                    //isMultiSelect = true;
                    //htm += '<div style="width: 20%; display: inline-block;">';
                    //htm += '<input type="button" value="Ok" onclick="AssignListDynamicData();" style="width: 100%;">';
                    //htm += '</div>';
                    ////}
                    ////else {
                    ////    isMultiSelect = false;
                    //// }
                    //htm += '</div>';


                    htm += '<div id="SearchDiv_' + scrnName + '_' + id + '" style="width: 50%; display: inline-block; float: right; margin-top: 0px; margin-right: 0px;">';
                    htm += '<div style="width: 20%; display: inline-block;">';
                    htm += 'Search : ';
                    htm += '</div>';

                    htm += '<div style="width: 38%; display: inline-block; ">';
                    htm += '<select id="SearchFieldId_' + scrnName + '_' + id + '" onchange="SetSearchControl(\'' + scrnName + '_' + id + '\',\'' + obj.ttbody + '\',\'' + obj.tfoot + '\');"></select>';
                    htm += '</div>';
                    htm += '<div id="SearchOptionId_' + scrnName + '_' + id + '" style="width: 40%; display: inline-block; float: right;">';
                    htm += '<input type="text" id="" />';
                    htm += '</div>';

                    //htm += '</div>';
                    htm += '</div>';

                    htm += '<div style="width: 100%">';
                    htm += '<div id="SearchMultiListAdd_' + scrnName + '_' + id + '" >';
                    htm += '</div>';
                    htm += '</div>';
                    htm += '<br />';
                    htm += '<div class="tableDiv_' + scrnName + '_' + data[i].FieldName + '" style="width: ' + data[i].ValueWidth + "%" + '; overflow-x: auto; height: ' + data[i].ValueHeight + "px" + '; overflow-y: auto;">';
                    htm += '<table id="table_' + scrnName + '_' + data[i].FieldName + '" class="table table-striped table-bordered tableId">';
                    //  htm += '<table id="table_' + data[i].FieldName + '" class="table table-striped table-bordered tableId">';
                    htm += '<thead id="ListHeadDivId_' + scrnName + '_' + data[i].FieldName + '">';
                    htm += '</thead>';
                    htm += '<tbody id="ListBodyDivId_' + scrnName + '_' + data[i].FieldName + '" >';
                    htm += '</tbody>';
                    htm += '<tfoot id="ListfootDivId_' + scrnName + '_' + data[i].FieldName + '">';
                    htm += '</tfoot>';
                    htm += '</table>';
                    htm += '</div>';
                    break;
                case "listviewOld":
                    var obj = {};
                    obj.tableId = 'table_' + CurrentScreen_TabScreen_Name + '_' + data[i].FieldName + '';
                    obj.theadId = 'ListHeadDivId_' + CurrentScreen_TabScreen_Name + '_' + data[i].FieldName + '';
                    obj.ttbody = 'ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + data[i].FieldName + '';
                    obj.tfoot = 'ListfootDivId_' + CurrentScreen_TabScreen_Name + '_' + data[i].FieldName + '';
                    obj.screenName = data[i].ScreenName;
                    obj.fieldName = data[i].FieldName;
                    //obj.url = url_GetListConfig;
                    lookUpTableList.push(obj);
                    htm += '<div id="SearchDiv_' + CurrentScreen_TabScreen_Name + '_' + id + '" style="width: 50%; display: inline-block; float: right; margin-top: 0px; margin-right: 0px;">';
                    htm += '<div style="width: 20%; display: inline-block;">';
                    htm += 'Search : ';
                    htm += '</div>';

                    htm += '<div style="width: 38%; display: inline-block; ">';
                    htm += '<select id="SearchFieldId_' + CurrentScreen_TabScreen_Name + '_' + id + '" onchange="SetSearchControl(\'' + CurrentScreen_TabScreen_Name + '_' + id + '\',\'' + obj.ttbody + '\',\'' + obj.tfoot + '\');"></select>';
                    htm += '</div>';
                    htm += '<div id="SearchOptionId_' + CurrentScreen_TabScreen_Name + '_' + id + '" style="width: 40%; display: inline-block; float: right;">';
                    htm += '<input type="text" id="" />';
                    htm += '</div>';

                    htm += '</div>';
                    htm += '</div>';

                    htm += '<div style="width: 100%">';
                    htm += '<div id="SearchMultiListAdd_' + CurrentScreen_TabScreen_Name + '_' + id + '" >';
                    htm += '</div>';
                    htm += '</div>';
                    htm += '<br />';
                    htm += '<div class="tableDiv_' + CurrentScreen_TabScreen_Name + '_' + data[i].FieldName + '" style="width: ' + data[i].ValueWidth + "%" + '; overflow-x: auto; height: ' + data[i].ValueHeight + "px" + '; overflow-y: auto;">';
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
                    break;
                case "button":
                    htm += '<div class="row">';
                    htm += '<div  class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';
                    htm += '</div>';
                    htm += '<div  class="labeltext" style="width:' + data[i].ValueWidth + "%" + ';">';
                    htm += '<input id="Button_' + data[i].DataMember + '" type="button"  value="' + data[i].DefaultText + '"   onclick="formButtonClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"id="' + data[i].DataMember + '" style="width:100%; height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';line-height:none;" />';
                    htm += '</div>';
                    htm += '</div>';
                    isBtnFormPopUpTable = true;
                    break;
            }
        }
    }
    $('#popupdialog').html(htm);
}


function GetMultiSelectLookUpFormConfig(id, screenName, scrnName) {
    $.ajax({
        type: 'POST',
        url: url_GetFormConfigList,
        dataType: 'json',
        data: { ScreenName: screenName },
        async: false,
        success: function (data) {
            lookUpTableList = [];
            ClearFormConfigArrayList();
            if (data != null && data.toString() != "") {
                $('.formContainer').show()
                $("#" + id).empty();
                showMultiSelectLookUpFormConfigList(id, data, 0, screenName, scrnName);
            }
        }
    });
}

function showMultiSelectLookUpFormConfigList(id, data, cnt, scrn, scrnName) {
    var htm = '';
    for (var i = 0; i < data.length; i++) {
        var fontWeight = data[i].HFontStyle;
        var fontWeightt = data[i].VFontStyle;
        var hForeColor = '';
        var hBackColor = '';
        var vForeColor = argbToRGB(data[i].VForeColor);
        var vBackColor = argbToRGB(data[i].VBackColor);

        var displayNo = data[i].DisplayNo.toString().split('.');
        if (displayNo.length == 1) {
            formdata = {};
            formdata.screenName = data[i].ScreenName;
            formdata.fieldName = data[i].FieldName;
            //formdata.FieldControl = data[i].FieldControl;
            formdata.fieldControl = data[i].FieldControl;
            formdata.FieldControl = data[i].FieldControl;
            formdata.DataMember = data[i].DataMember;
            formdata.DataMemberType = data[i].DataMemberType;
            formDataList.push(formdata);
            formItems.push(formdata);
            arrfrm.push(formdata);
            // formFieldNames.push(data[i].FieldName);
            formFieldNames.push(data[i].FieldName.toUpperCase());

            FieldNameFormArrayList.push(data[i].DataMember);
            var dataMemberType = data[i].DataMemberType.toLowerCase();
            if (dataMemberType != "int" && dataMemberType != "float" && dataMemberType != "decimal")
                dataMemberType = '';
            dataFieldIdList[data[i].DataMember] = '';
            formDataMember.push(data[i].DataMember);


            switch (data[i].FieldControl.toLowerCase()) {
                case "label":
                    htm += '<div class="row">';
                    htm += '<div  class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';
                    if (data[i].HeaderWidth != 0) {
                        htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                    }
                    htm += '</div>';
                    htm += '<div  class="labeltext"  style="width:' + data[i].ValueWidth + "%" + ';">';
                    htm += _lookUpTitle
                    htm += '</div>';
                    htm += '</div>';
                    break;
                case "line":
                    htm += '<div class="row">';
                    htm += '<div  class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';
                    htm += '</div>';
                    htm += '<div  class="labeltext" style="width:' + data[i].ValueWidth + "%" + ';">';
                    htm += '<hr >';
                    htm += '</div>';
                    htm += '</div>';
                    break;

                case "listview":
                    var obj = {};
                    obj.tableId = 'table_' + scrnName + '_' + data[i].FieldName + '';
                    obj.theadId = 'ListHeadDivId_' + scrnName + '_' + data[i].FieldName + '';
                    obj.ttbody = 'ListBodyDivId_' + scrnName + '_' + data[i].FieldName + '';
                    obj.tfoot = 'ListfootDivId_' + scrnName + '_' + data[i].FieldName + '';
                    obj.screenName = data[i].ScreenName;
                    obj.fieldName = data[i].FieldName;
                    //obj.url = url_GetListConfig;
                    lookUpTableList.push(obj);

                    htm += '<div id="okbtn_' + scrnName + '_' + data[i].FieldName + '"  style="width: 30%; display: inline-block; float: left; margin-top: 0px; margin-right: 0px;">';
                    //// if (isdynamic == true && CurrentScreen_TabScreen_Name != "InventoryAdjustmentForm") {
                    //if (isdynamic == true && currentScreenName != "ItemPromotionForm" && currentScreenName != "InvoicePromotionForm") {
                    //    //if (isdynamic == true) {
                    isMultiSelect = true;
                    htm += '<div style="width: 20%; display: inline-block;">';
                    htm += '<input type="button" value="Ok" onclick="AssignMultiListData();" style="width: 100%;">';
                    htm += '</div>';
                    //}
                    //else {
                    //    isMultiSelect = false;
                    // }
                    htm += '</div>';

                    htm += '<div id="SearchDiv_' + scrnName + '_' + id + '" style="width: 50%; display: inline-block; float: right; margin-top: 0px; margin-right: 0px;">';
                    htm += '<div style="width: 20%; display: inline-block;">';
                    htm += 'Search : ';
                    htm += '</div>';

                    htm += '<div style="width: 38%; display: inline-block; ">';
                    htm += '<select id="SearchFieldId_' + scrnName + '_' + id + '" onchange="SetSearchControl(\'' + scrnName + '_' + id + '\',\'' + obj.ttbody + '\',\'' + obj.tfoot + '\');"></select>';
                    htm += '</div>';
                    htm += '<div id="SearchOptionId_' + scrnName + '_' + id + '" style="width: 40%; display: inline-block; float: right;">';
                    htm += '<input type="text" id="" />';
                    htm += '</div>';

                    htm += '</div>';
                    htm += '</div>';

                    htm += '<div style="width: 100%">';
                    htm += '<div id="SearchMultiListAdd_' + scrnName + '_' + id + '" >';
                    htm += '</div>';
                    htm += '</div>';
                    htm += '<br />';
                    htm += '<div class="tableDiv_' + scrnName + '_' + data[i].FieldName + '" style="width: ' + data[i].ValueWidth + "%" + '; overflow-x: auto; height: ' + data[i].ValueHeight + "px" + '; overflow-y: auto;">';
                    htm += '<table id="table_' + scrnName + '_' + data[i].FieldName + '" class="table table-striped table-bordered tableId">';
                    //  htm += '<table id="table_' + data[i].FieldName + '" class="table table-striped table-bordered tableId">';
                    htm += '<thead id="ListHeadDivId_' + scrnName + '_' + data[i].FieldName + '">';
                    htm += '</thead>';
                    htm += '<tbody id="ListBodyDivId_' + scrnName + '_' + data[i].FieldName + '" >';
                    htm += '</tbody>';
                    htm += '<tfoot id="ListfootDivId_' + scrnName + '_' + data[i].FieldName + '">';
                    htm += '</tfoot>';
                    htm += '</table>';
                    htm += '</div>';
                    break;
                case "listviewOld":
                    var obj = {};
                    obj.tableId = 'table_' + CurrentScreen_TabScreen_Name + '_' + data[i].FieldName + '';
                    obj.theadId = 'ListHeadDivId_' + CurrentScreen_TabScreen_Name + '_' + data[i].FieldName + '';
                    obj.ttbody = 'ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + data[i].FieldName + '';
                    obj.tfoot = 'ListfootDivId_' + CurrentScreen_TabScreen_Name + '_' + data[i].FieldName + '';
                    obj.screenName = data[i].ScreenName;
                    obj.fieldName = data[i].FieldName;
                    //obj.url = url_GetListConfig;
                    lookUpTableList.push(obj);
                    htm += '<div id="SearchDiv_' + CurrentScreen_TabScreen_Name + '_' + id + '" style="width: 50%; display: inline-block; float: right; margin-top: 0px; margin-right: 0px;">';
                    htm += '<div style="width: 20%; display: inline-block;">';
                    htm += 'Search : ';
                    htm += '</div>';

                    htm += '<div style="width: 38%; display: inline-block; ">';
                    htm += '<select id="SearchFieldId_' + CurrentScreen_TabScreen_Name + '_' + id + '" onchange="SetSearchControl(\'' + CurrentScreen_TabScreen_Name + '_' + id + '\',\'' + obj.ttbody + '\',\'' + obj.tfoot + '\');"></select>';
                    htm += '</div>';
                    htm += '<div id="SearchOptionId_' + CurrentScreen_TabScreen_Name + '_' + id + '" style="width: 40%; display: inline-block; float: right;">';
                    htm += '<input type="text" id="" />';
                    htm += '</div>';

                    htm += '</div>';
                    htm += '</div>';

                    htm += '<div style="width: 100%">';
                    htm += '<div id="SearchMultiListAdd_' + CurrentScreen_TabScreen_Name + '_' + id + '" >';
                    htm += '</div>';
                    htm += '</div>';
                    htm += '<br />';
                    htm += '<div class="tableDiv_' + CurrentScreen_TabScreen_Name + '_' + data[i].FieldName + '" style="width: ' + data[i].ValueWidth + "%" + '; overflow-x: auto; height: ' + data[i].ValueHeight + "px" + '; overflow-y: auto;">';
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
                    break;
                case "button":
                    htm += '<div class="row">';
                    htm += '<div  class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';
                    htm += '</div>';
                    htm += '<div  class="labeltext" style="width:' + data[i].ValueWidth + "%" + ';">';
                    htm += '<input id="Button_' + data[i].DataMember + '" type="button"  value="' + data[i].DefaultText + '"   onclick="formButtonClicked(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"id="' + data[i].DataMember + '" style="width:100%; height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';line-height:none;" />';
                    htm += '</div>';
                    htm += '</div>';
                    isBtnFormPopUpTable = true;
                    break;
            }
        }
    }
    $('#popupdialog').html(htm);
}

var isMultiselectRowClear = false;
function AssignMultiListData() {
    searchOptionArray = []
    TempLookUpMultiSelected = [];
    dynamicRowindex = tableTotalRowCount;

    $('#popupdialog').dialog("close");
   

    var tempMultiSelected = [];
    tempMultiSelected = LookUpMultiSelected;

    //todo
    //for (var y = 0; y < ListSelectedId.length; y++) {
    //    tempMultiSelected = jQuery.grep(tempMultiSelected, function (value) {
    //        return value[uniqueId] != ListSelectedId[y][uniqueId];
    //    });
    //}

    
    if (tempMultiSelected.length == 0) {
        _listLookUpIndex = 0;
        $("#" + _listLookUpttbody).empty();
        CreateList(_listLookUpttbody, _listLookUpttbody.replace('ListBodyDivId_', 'ListfootDivId_'), currentScreenName, 1, "", FieldName.split('_')[0], '', '', 1);
    }

    var tempFieldName = FieldName;
    for (var i = 0; i < tempMultiSelected.length; i++) {
        if (i >= 1) {
            dynamicRowindex++;
            currentRowClickCount++;
            isMultiselectRowClear = false;
        }
        else {
            dynamictableTotalRowCount = 1;
            isMultiselectRowClear = true;
        }

        textvalue = tempMultiSelected[i][uniqueId];
        var obj = {};
        obj[uniqueId] = textvalue;
        obj["UserNo"] = tempUserNo;
        // FormView.UserNo = tempUserNo;
        FormView[tempFieldName] = obj;
        arrList = Params.arrList;
        listView[uniqueId] = tempMultiSelected[i][uniqueId];
        // AssignListData('rowItemClicked', listView, dynamicFieldName);


        ///
        currentRowIndex = dynamicRowindex;
        setListValue(this, uniqueId, currentRowIndex, _ttbody);

        if (i != 0) {
            _listLookUpIndex++;
            dynamictableTotalRowCount++;;
        }
        // $("#ListBodyDivId_CustomerRoutingForm_Customer").empty();

        var _obj = {};
        _obj.fieldName = uniqueId;
        _obj.value = uniqueId;
        _obj.rowIndex = currentRowIndex;
        PerformAction('rowItemClicked', _obj);
        ///

        ListSelectedId.push(obj);

        /////this 3 line added for item and invoice promotion
        //if (currentScreenName == "ItemPromotionForm" || currentScreenName == "InvoicePromotionForm") {
        //    // AddDynamicListItemPromtion(scrName, ttbody, fieldName, SearchId, data.length, i);
        //    var actionPlan = "AddEmptyRow";
        //    isDynamicValidate = true;
        //    AddDynamicListNewItemPromtion(CurrentScreen_TabScreen_Name, "ListBodyDivId_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName, dynamicFieldName, actionPlan, isDynamicValidate);
        //}
        //else
        //    AddDynamicList(CurrentScreen_TabScreen_Name, "ListBodyDivId_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName, dynamicFieldName);
    }

    if (tempMultiSelected.length == 0) {
        isListLookUpClicked = false;
        // $('#popupdialog').dialog("close");
    }

    FormView = Params.FormView;
    Params.FormView = LastParams.FormView

    isdynamic = false;
    //_isdynamic;
}