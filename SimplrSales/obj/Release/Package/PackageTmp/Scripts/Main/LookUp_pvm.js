
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


    var legends = '';
    isColorLegend = false;

    try {
        var tmpcolorLegend = colorLegend.filter(x => x.ScreenName == scrnName);

        for (var p = 0; p < tmpcolorLegend.length; p++) {
            isColorLegend = true;
            var tmpForeColor = argbToRGB(tmpcolorLegend[p].CForeColor);
            var tmpBackColor = argbToRGB(tmpcolorLegend[p].CBackColor);
            legends += '<td style="color:' + tmpForeColor + ';background-color:' + tmpBackColor + ';border-style:solid;;text-align:center;">' + tmpcolorLegend[p].Category + '</td>';
        }

        console.log('isColorLegend: ' + isColorLegend);
    }
    catch (e) {
        console.log('isColorLegend error: ' + e);
    }


    if (isColorLegend == true)
        htm += '<table style="float:right;display:block;border:none;font-size:12px;"><tr>' + legends + '</tr></table><br/>';

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
                    htm += '<input type="text" id="" placeholder="&#xf002; Search" style="font-family: FontAwesome, Arial; font-style: normal" />';
                    //htm += '<input type="text" id="" />';
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
                    lookUpTableList.push(obj);

                    try {
                        var legends = '';
                        isColorLegend = false;

                        try {
                            var tmpcolorLegend = colorLegend.filter(x => x.ScreenName == scrnName);

                            for (var p = 0; p < tmpcolorLegend.length; p++) {
                                isColorLegend = true;
                                var tmpForeColor = argbToRGB(tmpcolorLegend[p].CForeColor);
                                var tmpBackColor = argbToRGB(tmpcolorLegend[p].CBackColor);
                                legends += '<td style="color:' + tmpForeColor + ';background-color:' + tmpBackColor + ';border- tyle:solid;text-align:center;">' + tmpcolorLegend[p].Category + '</td>';
                            }

                            console.log('isColorLegend: ' + isColorLegend);
                        }
                        catch (e) {
                            console.log('isColorLegend error: ' + e);
                        }


                        if (isColorLegend == true)
                            htm += '<table style="float:right;display:items;border:none;font-size:12px;width:320px;height:26px;"><tr>' + legends + '</tr></table><br/><br/>';
                    }
                    catch { }

                    htm += '<div id="okbtn_' + scrnName + '_' + data[i].FieldName + '"  style="width: 30%; display: inline-block; float: left; margin-top: 0px; margin-right: 0px;">';
                    isMultiSelect = true;
                    htm += '<div style="width: 40%; display: inline-block;">';
                    var vBackColor = argbToRGB(33280);

                    htm += '<button type="button"  onclick="AssignMultiListData();"   style="width:100%;height:35px;font-size:12px;color:white;background-color:' + vBackColor + ';text-align:center;line-height:none;border-radius:5px;" ><i class="fa fa-check"></i> | OK</Button>';
                    //htm += '<input type="button" value="Ok" onclick="AssignMultiListData();" style="width: 100%;">';
                    htm += '</div>';
                    htm += '</div>';

                    htm += '<div id="SearchDiv_' + scrnName + '_' + id + '" style="width: 50%; display: inline-block; float: right; margin-top: 0px; margin-right: 0px;">';
                    htm += '<div style="width: 20%; display: inline-block;">';
                    htm += 'Search : ';
                    htm += '</div>';

                    htm += '<div style="width: 38%; display: inline-block; ">';
                    htm += '<select id="SearchFieldId_' + scrnName + '_' + id + '" onchange="SetSearchControl(\'' + scrnName + '_' + id + '\',\'' + obj.ttbody + '\',\'' + obj.tfoot + '\');"></select>';
                    htm += '</div>';
                    htm += '<div id="SearchOptionId_' + scrnName + '_' + id + '" style="width: 40%; display: inline-block; float: right;">';
                    //Changes done by vignesh on 20/08/2024
                   // htm += '<input type="text" id="" />';
                    htm += '<input type="text" id="" placeholder="&#xf002; Search" style="font-family: FontAwesome, Arial; font-style: normal" />';
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



function getListViewData(ttbodyId) {
    var listConfigFieldName = "ListConfig_" + ttbodyId;
    var listConfig = ListHeaderList[listConfigFieldName];
    var tblbody = document.getElementById(ttbodyId);
    if (tblbody == null)
        return null;
    var id = '';
    var value = '';
    var tdType = '';
    var obj = {};
    isRowDeleted = true;

    var arrValue = [];


    var id = listConfig[1].FieldName;
    var textvalue = "";

    //if (ttbodyId == "ListBodyDivId_StockTransferForm_Item") {
    var sScreenName = listConfig[1].ScreenName + "_MULTILOOKUPSELECTED";// "StockTransferForm_LISTVIEW_Item_MULTILOOKUPSELECTED";
    qry = getString['QueryConfig_' + sScreenName];
    qry += ' ' + getString['QueryConfig_' + sScreenName + '_GroupText'];
    qry += ' ' + getString['QueryConfig_' + sScreenName + '_OrderText'];
    qry = formatQueryString(qry, sScreenName);

    //qry = "select ItemNo+UOM as ItemNo1 from TransferDettemp where TransNo='STR0000269'";
    execute(qry);
    var data = executeQry;
    var iIndex1 = 0;
    if (data != null) {
        for (var i = 0; i < data.length; i++) {

            var textvalue1 = data[i][id];

            for (iIndex = 0; iIndex < tblbody.rows.length - 1; iIndex++) {
                if (tblbody.rows[iIndex].cells.length > 0) {

                    if (tblbody.rows[iIndex].cells.namedItem(id) != null) {
                        tdType = tblbody.rows[iIndex] == undefined ? "" : tblbody.rows[iIndex].cells.length == 0 ? "" : getTableRowTDType(tblbody.rows[iIndex].cells.namedItem(id).innerHTML);

                        if (tdType == "text" || tdType == "select" || tdType == "hidden") {
                            if (textvalue1 == tblbody.rows[iIndex].cells.namedItem(id).childNodes['0'].value) {
                                iIndex1 = iIndex;
                                iIndex = tblbody.rows.length + 1;
                            }
                        }
                        else {
                            if ($('#' + id).css('display') == 'none' || i == 1) {
                                value = tblbody.rows[iIndex].cells.namedItem(id).childNodes['0'] == undefined ? "" : tblbody.rows[iIndex].cells.namedItem(id).childNodes['0'].data;
                                if (textvalue1 == value) {
                                    iIndex1 = iIndex;
                                    iIndex = tblbody.rows.length + 1;
                                }
                            }
                        }
                    }
                }
            }

            textvalue = data[i][id];
            obj = {};
            obj["Index"] = iIndex1;// i;
            obj[id] = textvalue == undefined ? "" : textvalue;
            arrValue.push(obj);
        }
        return arrValue;
    }
    //}
    //
    try {
        if (listConfig != undefined && tblbody.rows.length > 0) {

            for (iIndex = 0; iIndex < tblbody.rows.length - 1; iIndex++) {
                obj = {};
                if (tblbody.rows[iIndex].cells.length > 0) {
                    for (var i = 0; i < listConfig.length; i++) {
                        id = listConfig[i].DataMember;

                        if (tblbody.rows[iIndex].cells.namedItem(id) != null) {
                            //id = tblbody.rows[iIndex].cells[i].childNodes['0'].id;
                            tdType = tblbody.rows[iIndex] == undefined ? "" : tblbody.rows[iIndex].cells.length == 0 ? "" : getTableRowTDType(tblbody.rows[iIndex].cells.namedItem(id).innerHTML);

                            if (tdType == "text" || tdType == "select" || tdType == "hidden") {
                                value = tblbody.rows[iIndex].cells.namedItem(id).childNodes['0'].value;
                                obj["Index"] = iIndex;
                                obj[id] = value;
                                // break;
                            }
                            else {
                                if ($('#' + id).css('display') == 'none' || i == 1) {
                                    value = tblbody.rows[iIndex].cells.namedItem(id).childNodes['0'] == undefined ? "" : tblbody.rows[iIndex].cells.namedItem(id).childNodes['0'].data;
                                    obj["Index"] = iIndex;
                                    obj[id] = value == undefined ? "" : value;
                                    // break;
                                }
                                else
                                    value = "";
                            }
                        }
                    }
                    arrValue.push(obj);
                }
            }
        }
        return arrValue;
    }
    catch (e) {
        return [];
    }
}


var isMultiselectRowClear = false;
var isNotEmpty = false;


function AssignMultiListData() {
    isMultiClose = true;
    if (uniqueId == "") {
        lookUpPopUpClose();
        return;
    }

    if (currentScreenName == "SalesOrderNewForm1") {
        LoadingImagePopUpOpen();
        debugger;
        setTimeout(function () {

            var _obj = {};
            _obj.fieldName = uniqueId;
            _obj.value = uniqueId;
            _obj.rowIndex = 0;

            PerformAction('rowItemClicked', _obj);
            if (ListDataCount > 0)
                CreateList(_listLookUpttbody, _listLookUpttbody.replace('ListBodyDivId_', 'ListfootDivId_'), currentScreenName, 1, "", FieldName.split('_')[0], '', '', 1);
            lookUpPopUpClose();
            FormView = Params.FormView;
            Params.FormView = LastParams.FormView

            isdynamic = false;
            LoadingImagePopUpClose();
            isMultiSelect = false;

        }, 200);
        return;
    }
    else {
        LoadingImagePopUpOpen();
        setTimeout(function () {
            arrList = Params.arrList;
            //debugger;
            searchOptionArray = []
            TempLookUpMultiSelected = [];
            
            index = tableTotalRowCount;
            // debugger;
            // HERE STORING LISTVIEW DETAILS =============================================================
            //salesOrderListView = $("#" + _listLookUpttbody);
            salesOrderListView = getListViewData(_listLookUpttbody);
            // HERE STORING LISTVIEW DETAILS =============================================================

            // $('#popupdialog').dialog("close");
            var tempMultiSelected = [];
            tempMultiSelected = LookUpMultiSelected;

            var tempcurrentRowClickCount = currentRowClickCount;
            for (var n = 0; n < TempLookUpUnSelected.length; n++) {
                var itm = TempLookUpUnSelected[n][uniqueId] == undefined ? "" : TempLookUpUnSelected[n][uniqueId].toString();
                var isExisted = isExisted_itm1(itm, uniqueId);
                if (isExisted != "false") {
                    var fName = TempLookUpUnSelected[n].FieldName
                    FormView[fName] = TempLookUpUnSelected[n];
                    currentRowClickCount = isExisted;

                    // DynamicRowItemRemoveConfirmNew(obj.objthis, obj.dataMember, obj.rowIndex, obj.value, obj.fieldName, obj.cnt, obj.ttbody, 1);
                    DynamicRowItemRemoveConfirmNew("", "Delete", isExisted, "Delete", fName.split('_')[0], isExisted, _listLookUpttbody, 1);
                }
            }
            TempLookUpUnSelected = [];
            currentRowClickCount = tempcurrentRowClickCount;
            //newly added by.M 28.12.2022
            var len = document.getElementById(_listLookUpttbody.replace('ListBodyDivId_', 'table_')).rows.length;
            var tbodyVal = document.getElementById(_listLookUpttbody).rows[_listLookUpIndex];
            //_listLookUpIndex = tbodyVal.cells.namedItem(id) != null && (tbodyVal.cells.namedItem(id).outerText.trim() == "" || tbodyVal.cells.namedItem(id).outerText == " " || tbodyVal.cells.namedItem(id).outerText == "  ") ? _listLookUpIndex : len - 2;
            _listLookUpIndex = len - 2;
            //newly added by.M 27.06.2023- pvmng
            if (document.getElementById(_listLookUpttbody).rows.length == _listLookUpIndex)
                _listLookUpIndex = document.getElementById(_listLookUpttbody).rows.length - 1;//Params.FormView._listLookUpIndex
            if (tempMultiSelected.length == 0) {
                _listLookUpIndex = 0;
                $("#" + _listLookUpttbody).empty();
                try {
                    CreateList(_listLookUpttbody, _listLookUpttbody.replace('ListBodyDivId_', 'ListfootDivId_'), currentScreenName, 1, "", FieldName.split('_')[0], '', '', 1);
                } catch (e) {

                }
                //Added by Vignesh on 26/08/2024
                lookUpPopUpClose();
            }

            var tempFieldName = FieldName;



            // 0 1 2 3 4 5 6 
            // all clear 0
            //      1
            //      2
            //      3
            //      ...
            if (salesOrderListView.length == 0) {
                for (var i = 0; i < tempMultiSelected.length; i++) {
                    if (i >= 1) {
                        // 1 2 3 4 5 6 7 8 ....
                        dynamicRowindex++;
                        currentRowClickCount++;
                        isMultiselectRowClear = false;
                    }
                    else {
                        // 0 only
                        dynamictableTotalRowCount = 1;
                        isMultiselectRowClear = true;
                    }

                    textvalue = tempMultiSelected[i][uniqueId];
                    var obj = {};
                    obj[uniqueId] = textvalue;
                    obj["UserNo"] = tempUserNo;
                    // FormView.UserNo = tempUserNo;
                    FormView[tempFieldName] = obj;

                    //newly added by.M21.12.2021
                    FormView[tempFieldName] = tempMultiSelected[i];
                    FormView["GenericLookUp"] = tempMultiSelected[i];

                    listView[uniqueId] = tempMultiSelected[i][uniqueId];


                    ///
                    currentRowIndex = dynamicRowindex;
                    setListValue(this, uniqueId, currentRowIndex, _ttbody);

                    if (i != 0) {
                        // 1 2 3 4 5 6 7 8
                        _listLookUpIndex++;
                        dynamictableTotalRowCount++;;
                    }

                    var _obj = {};
                    _obj.fieldName = uniqueId;
                    _obj.value = uniqueId;
                    _obj.rowIndex = currentRowIndex;
                    PerformAction('rowItemClicked', _obj);
                    ///

                    ListSelectedId.push(obj);

                }
            }
            else {
                //// SET MODIFIED LIST ========
                //// DELETE PROCESS
                //var ik;
                //var isDeletedExisted = 0;
                //for (var ik = 0; ik < salesOrderListView.length; ik++) {
                //    // 1 insert 0 remove
                //    var itm = salesOrderListView[ik].ItemNo.toString();

                //    isDeletedExisted = 0;

                //    for (i = 0; i < tempMultiSelected.length; i++) {
                //        if (tempMultiSelected[i].ItemNo.toString() == itm) {
                //            isDeletedExisted = 1;
                //            break;
                //        }
                //    }


                //    // var isDeletedExisted = isDeletedExisted_itm(itm);
                //    // 1 means 
                //    if (!isDeletedExisted) {
                //        //alert(itm);
                //    }
                //}

                // INSERT PROCESS
                // 1 2 3   // 1 4  // 2 REMOVED 3 REMOVED   // 4 INSERTED
                var ij;
                var sq = 0;
                var isUnselectandNotSelect = false;
                for (var ij = 0; ij < tempMultiSelected.length; ij++) {
                    // 1 insert 0 remove
                    //Newly added 27.05.2021 By M
                    // var itm = tempMultiSelected[ij].ItemNo.toString();
                    var itm = tempMultiSelected[ij][uniqueId] == undefined ? "" : tempMultiSelected[ij][uniqueId].toString();
                    var isExisted = isExisted_itm(itm, uniqueId);

                    if (!isExisted) {
                        isUnselectandNotSelect = true;
                        // NOT AVAILABLE THEN INSERT PROCESS
                        dynamicRowindex++;
                        currentRowClickCount++;

                        textvalue = tempMultiSelected[ij][uniqueId];
                        var obj = {};
                        obj[uniqueId] = textvalue;
                        obj["UserNo"] = tempUserNo;
                        // FormView.UserNo = tempUserNo;
                        FormView[tempFieldName] = obj;

                        //newly added by.M21.12.2021
                        FormView[tempFieldName] = tempMultiSelected[ij];
                        FormView["GenericLookUp"] = tempMultiSelected[ij];

                        listView[uniqueId] = tempMultiSelected[ij][uniqueId];

                        currentRowIndex = dynamicRowindex;
                        setListValue(this, uniqueId, currentRowIndex, _ttbody);

                        //_listLookUpIndex++;
                        //dynamictableTotalRowCount++;


                        if (sq != 0) {
                            // 1 2 3 4 5 6 7 8
                            _listLookUpIndex++;
                            dynamictableTotalRowCount++;;
                        }
                        sq++;
                        var _obj = {};
                        _obj.fieldName = uniqueId;
                        _obj.value = uniqueId;
                        _obj.rowIndex = currentRowIndex;
                        PerformAction('rowItemClicked', _obj);

                        ListSelectedId.push(obj);
                        if (isDynamicValidate == false && ProjectName != "PVMB") {
                            ij = tempMultiSelected.length + 1;
                        }
                    }
                }

            }

            if (tempMultiSelected.length == 0) {
                isListLookUpClicked = false;
                // $('#popupdialog').dialog("close");
            }

            //alert(tempMultiSelected);

            FormView = Params.FormView == null ? FormView : Params.FormView;
            Params.FormView = LastParams.FormView

            isdynamic = false;
            //_isdynamic;

            LoadingImagePopUpClose();
            isMultiSelect = false;

            //Commented by Vignesh 26-08-2024
            //if (!isUnselectandNotSelect)
            //    lookUpPopUpClose();

            lookUpPopUpClose();

        }, 200);
    }
}

function isDeletedExisted_itm(itm) {
    var i, j;
    var _deleted = 0;
    // 1 2 3 4  5
    // 1 5

    for (i = 0; i < tempMultiSelected.length; i++) {
        if (tempMultiSelected[i].ItemNo.toString() == itm) {
            return 1;
        }
    }
    return _deleted;
}

function isExisted_itm(itm, uniqueId) {
    var i, j;
    var existed = 0;
    // 1 2 3 4  5
    for (i = 0; i < salesOrderListView.length; i++) {
        //if (salesOrderListView[i].ItemNo.toString() == itm) {
        if (salesOrderListView[i][uniqueId] != undefined && salesOrderListView[i][uniqueId].toString() == itm) {
            return 1;
        }
    }
    return existed;
}
function isExisted_itm1(itm, uniqueId) {
    var i, j;
    var existed = 0;
    // 1 2 3 4  5
    for (i = 0; i < salesOrderListView.length; i++) {
        //if (salesOrderListView[i].ItemNo.toString() == itm) {
        if (salesOrderListView[i][uniqueId].toString() == itm) {
            return salesOrderListView[i]["Index"];
        }
    }
    return "false";
}