
function PromotionRowClickFunction(scrName, ttbody, cnt, fieldName) {
    dynamicFieldName = fieldName;
    currentRowClickCount = parseInt(cnt);
    formListttbody = ttbody;
    formListscrName = scrName;
    CurrentScreen_TabScreen_Name = scrName;
}

function AddDynamicListNewItemPromtion(scrName, ttbody, fieldName, actionPlan, isDynamicValidate) {
    CurrentScreen_TabScreen_Name = scrName;
    var rowCount = $('#table_' + CurrentScreen_TabScreen_Name + '_' + fieldName + ' tr').length;
    var trowCount = $('#table_' + CurrentScreen_TabScreen_Name + '_' + fieldName + ' >tbody >tr').length;
    var rowCount = $('table#myTable tr:last').index() + 1;

    if (actionPlan == "AddEmptyRow" && isDynamicValidate) {
        var listConfig = ListHeaderList['ListConfig_' + CurrentScreen_TabScreen_Name + '_' + fieldName];
        objAddDynamicListCount['ListConfig_' + CurrentScreen_TabScreen_Name + '_' + fieldName] = objAddDynamicListCount['ListConfig_' + CurrentScreen_TabScreen_Name + '_' + fieldName] == undefined ? 0 : objAddDynamicListCount['ListConfig_' + CurrentScreen_TabScreen_Name + '_' + fieldName] + 1;
        addCount = objAddDynamicListCount['ListConfig_' + CurrentScreen_TabScreen_Name + '_' + fieldName];
        var htm = '';

        htm += '<tr  id="' + fieldName + addCount + '" class="tablecell" id="trRow_' + addCount + '" onclick="PromotionRowClickFunction(\'' + scrName + '\',\'' + ttbody + '\',\'' + addCount + '\',\'' + fieldName + '\')">';

        for (var j = 0; j < listConfig.length; j++) {
            if (listConfig[j].IsHidden != 1 && listConfig[j].ColumnWidth != "0px" && (isBtnFormPopUpTable == false || listConfig[j].FieldName.replace("\t", "").toLowerCase() != 'action')) {
                var colName = listConfig[j].FieldName.replace("\t", "");
                var fieldControl = listConfig[j].FieldControl.replace("\t", "");
                var fontWeight = getFontStyle(listConfig[j].RFontStyle);
                fontWeight = fontWeight.replace("_", "-");
                fontWeight = fontWeight.replace("normal", ":normal");
                fontWeight = fontWeight.replace("bold", ":bold");

                var vForeColor = argbToRGB(listConfig[j].VForeColor);
                var vBackColor = argbToRGB(listConfig[j].VBackColor);
                switch (fieldControl.toLowerCase()) {
                    case "textbox":
                        htm += '<td  id="' + listConfig[j].FieldName + '" style="width:' + listConfig[j].ColumnWidth + ';font-family: ' + listConfig[j].RFont + ';font-size:' + listConfig[j].RFontSize + ';color: ' + listConfig[j].RForeColor + ' ;background-color:' + listConfig[j].RBackColor + '; text-align:' + getAlignStyle(listConfig[j].Alignment) + ';' + fontWeight + '">';
                        //htm += '<input type="text" id="' + listConfig[j].FieldName + '_' + addCount + '" onclick="formTextFieldFocus(\'' + listConfig[j].FieldName + '\');"onblur="formTextFieldLostFocus(\'' + listConfig[j].FieldName + '\');"onkeyup="formTextFieldChange(\'' + listConfig[j].FieldName + '\');" />';

                        if (listConfig[j].DataMemberType == "NUMBER")
                            htm += '<input type="text" id="' + listConfig[j].FieldName + '" value="" onkeypress="restrictMinus(event);" onclick="listTextFieldFocus(this,\'' + listConfig[j].FieldName + '\',' + addCount + ',\'' + listConfig[j].FieldName + '\',\'' + fieldName + '\');"onblur="listTextFieldLostFocus(this,\'' + listConfig[j].FieldName + '\',' + addCount + ',\'' + listConfig[j].FieldName + '\',\'' + fieldName + '\');"onkeyup="listTextFieldChange(this,\'' + listConfig[j].FieldName + '\',' + addCount + ',\'' + listConfig[j].FieldName + '\',\'' + fieldName + '\');" />';
                        else
                            htm += '<input type="text" id="' + listConfig[j].FieldName + '" value="" onclick="listTextFieldFocus(this,\'' + listConfig[j].FieldName + '\',' + addCount + ',\'' + listConfig[j].FieldName + '\',\'' + fieldName + '\');"onblur="listTextFieldLostFocus(this,\'' + listConfig[j].FieldName + '\',' + addCount + ',\'' + listConfig[j].FieldName + '\',\'' + fieldName + '\');"onkeyup="listTextFieldChange(this,\'' + listConfig[j].FieldName + '\',' + addCount + ',\'' + listConfig[j].FieldName + '\',\'' + fieldName + '\');" />';
                        // htm += '<input type="text" id="' + listConfig[j].FieldName + '" onclick="formTextFieldFocus(\'' + listConfig[j].FieldName + '\');"onblur="formTextFieldLostFocus(\'' + listConfig[j].FieldName + '\');"onkeyup="formTextFieldChange(\'' + listConfig[j].FieldName + '\');" />';
                        htm += '</td>';
                        break;
                    case "label":
                        htm += '<td  id="' + listConfig[j].FieldName + '" style="width:' + listConfig[j].ColumnWidth + ';font-family: ' + listConfig[j].RFont + ';font-size:' + listConfig[j].RFontSize + ';color: ' + listConfig[j].RForeColor + ' ;background-color:' + listConfig[j].RBackColor + '; text-align:' + getAlignStyle(listConfig[j].Alignment) + ';' + fontWeight + '">';
                        htm += '<label  id="' + listConfig[j].FieldName + '" > </label>';
                        htm += '</td>';
                        break;

                    case "combobox":
                        comboboxdata = {};
                        comboboxdata.DataMember = listConfig[j].DataMember;
                        comboboxdata.ScreenName = listConfig[j].ScreenName;
                        comboboxdata.FormListType = "List";
                        DropDownIdList.push(comboboxdata);
                        //DropDownIdList.push(listConfig[j].FieldName);

                        vBackColor = '';
                        htm += '<td  id="' + listConfig[j].FieldName + '" style="width:' + listConfig[j].ColumnWidth + ';font-family: ' + listConfig[j].RFont + ';font-size:' + listConfig[j].RFontSize + ';color: ' + listConfig[j].RForeColor + ' ;background-color:' + listConfig[j].RBackColor + '; text-align:' + getAlignStyle(listConfig[j].Alignment) + ';' + fontWeight + '">';
                        //htm += '<select id="' + listConfig[j].DataMember + '" onchange="formComboChange(this,\'' + listConfig[j].DataMember + '\',' + i + ',\'' + $('#' + listConfig[j].DataMember).val() + '\'); DropDownOnchangeFunction(this,\'' + listConfig[j].DataMember + '\',' + i + ',\'' + $('#' + listConfig[j].DataMember).val() + '\');comboBoxFormItemClicked(\'' + "" + '\',0,\'' + $('#' + listConfig[j].DataMember).val() + '\',\'' + $('#' + listConfig[j].DataMember).val() + '\',\'' + listConfig[j].ScreenName + '\',\'' + listConfig[j].FieldName + '\',\'' + "" + '\', \'' + listConfig[j].DataMember + '\');" style="  height: ' + listConfig[j].ValueHeight + "px" + ';font-size:' + listConfig[j].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + listConfig[j].VFont + ';text-align:' + getAlignStyle(listConfig[j].VAlignment) + ';" >';
                        htm += '<select id="' + listConfig[j].DataMember + '"   onchange="formComboChangeItemPromotion(this,\'' + listConfig[j].DataMember + '\',' + addCount + '  );" style="  height: ' + listConfig[j].ValueHeight + "px" + ';font-size:' + listConfig[j].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + listConfig[j].RBackColor + ';font-family:' + listConfig[j].VFont + ';text-align:' + getAlignStyle(listConfig[j].VAlignment) + ';" >';
                        //htm += '<option value=1>A</option>';
                        htm += '</select>';
                        htm += '</td>';

                        break;

                    case "option":
                        htm += '<td  id="' + listConfig[j].FieldName + '" style="width:' + listConfig[j].ColumnWidth + ';font-family: ' + listConfig[j].RFont + ';font-size:' + listConfig[j].RFontSize + ';color: ' + listConfig[j].RForeColor + ' ;background-color:' + listConfig[j].RBackColor + '; text-align:' + getAlignStyle(listConfig[j].Alignment) + ';' + fontWeight + '">';
                        htm += '<input type="checkbox" id="' + listConfig[j].DataMember + '"  onclick="listCheckBoxClickFunction(this,\'' + listConfig[j].FieldName + '\',' + trowCount + ');listCheckBoxValueChanged(this,\'' + listConfig[j].FieldName + '\',' + j + ',\'' + $('#' + listConfig[j].DataMember).val() + '\');" value="">';

                        // htm += '<input type="checkbox" id="' + listConfig[j].DataMember + '" onclick="formCheckBoxValueChanged(this,\'' + listConfig[j].DataMember + '\',' + j + ',\'' + $('#' + listConfig[j].DataMember).val() + '\');"  style="  height: ' + listConfig[j].ValueHeight + "px" + ';font-size:' + listConfig[j].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + listConfig[j].VFont + ';text-align:' + getAlignStyle(listConfig[j].VAlignment) + ';" />';
                        //if (data[i].DataMemberType == "") {
                        //    htm += '<input type="checkbox" onclick="formCheckBoxValueChanged(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');ClickCheckBoxFunction(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');" id="' + data[i].DataMember + '"   style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                        //}
                        //else {
                        //    htm += '<input type="checkbox" id="' + data[i].DataMember + '" onclick="formCheckBoxValueChanged(this,\'' + data[i].DataMember + '\',' + i + ',\'' + $('#' + data[i].DataMember).val() + '\');"  style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                        //}
                        htm += '</td>';
                        break;

                    case "lookup":
                        htm += '<td  id="' + listConfig[j].FieldName + '" style="width:' + listConfig[j].ColumnWidth + ';font-family: ' + listConfig[j].RFont + ';font-size:' + listConfig[j].RFontSize + ';color: ' + listConfig[j].RForeColor + ' ;background-color:' + listConfig[j].RBackColor + '; text-align:' + getAlignStyle(listConfig[j].Alignment) + ';' + fontWeight + '">';
                        //  htm += '<input type="text" id="' + listConfig[j].FieldName + '_' + addCount + '"  onclick="formReadonlyClicked(\'' + listConfig[j].FieldName + '\');" style="width:80%"  />';
                        htm += '<input type="text" id="' + listConfig[j].FieldName + '"  onclick="formReadonlyClicked(\'' + listConfig[j].FieldName + '\');" style="width:80%"  />';
                        htm += '<span href="#" style="width:20%;listConfig[j].oat:right;margin-top:5px;height:30px;"   onclick="formLookUpClicked(\'' + listConfig[j].FieldName + '\');GetLookUpData1(\'' + listConfig[j].FieldName + '\',\'' + listConfig[j].FieldName + '\',\'' + "" + '\');" class="input-group-addon"> <i class="fa fa-plus"></i>  </span>';
                        htm += '</td>';
                        break;
                }
            }
        }
        htm += '</tr>';
        $("#" + ttbody).append(htm);

        dynamicItemPromotionTableclickfunction(fieldName);
        if (DropDownIdList.length > 0)
            GetDropDownListValue(CurrentScreen_TabScreen_Name, "List");
    }
}
function AddDynamicListItemPromtion(scrName, ttbody, fieldName, SearchId, totalLength, currentCount) {
    //this line added for item promotion
    CurrentScreen_TabScreen_Name = scrName;

    var listConfig = ListHeaderList['ListConfig_' + CurrentScreen_TabScreen_Name + '_' + fieldName];
    objAddDynamicListCount['ListConfig_' + CurrentScreen_TabScreen_Name + '_' + fieldName] = objAddDynamicListCount['ListConfig_' + CurrentScreen_TabScreen_Name + '_' + fieldName] == undefined ? 0 : objAddDynamicListCount['ListConfig_' + CurrentScreen_TabScreen_Name + '_' + fieldName] + 1;
    addCount = objAddDynamicListCount['ListConfig_' + CurrentScreen_TabScreen_Name + '_' + fieldName];
    var htm = '';
    var trowCount = addCount;
    htm += '<tr  id="' + fieldName + addCount + '" class="tablecell" id="trRow_' + addCount + '" onclick="PromotionRowClickFunction(\'' + scrName + '\',\'' + ttbody + '\',\'' + addCount + '\',\'' + fieldName + '\')">';

    for (var j = 0; j < listConfig.length; j++) {
        if (listConfig[j].IsHidden != 1 && listConfig[j].ColumnWidth != "0px" && (isBtnFormPopUpTable == false || listConfig[j].FieldName.replace("\t", "").toLowerCase() != 'action')) {
            var colName = listConfig[j].FieldName.replace("\t", "");
            var fieldControl = listConfig[j].FieldControl.replace("\t", "");
            var fontWeight = getFontStyle(listConfig[j].RFontStyle);
            fontWeight = fontWeight.replace("_", "-");
            fontWeight = fontWeight.replace("normal", ":normal");
            fontWeight = fontWeight.replace("bold", ":bold");

            var vForeColor = argbToRGB(listConfig[j].VForeColor);
            var vBackColor = argbToRGB(listConfig[j].VBackColor);

            switch (fieldControl.toLowerCase()) {
                case "textbox":
                    htm += '<td  id="' + listConfig[j].FieldName + '" style="width:' + listConfig[j].ColumnWidth + ';font-family: ' + listConfig[j].RFont + ';font-size:' + listConfig[j].RFontSize + ';color: ' + listConfig[j].RForeColor + ' ;background-color:' + listConfig[j].RBackColor + '; text-align:' + getAlignStyle(listConfig[j].Alignment) + ';' + fontWeight + '">';
                    //  htm += '<input type="text" id="' + listConfig[j].FieldName + '_' + addCount + '" onclick="formTextFieldFocus(\'' + listConfig[j].FieldName + '\');"onblur="formTextFieldLostFocus(\'' + listConfig[j].FieldName + '\');"onkeyup="formTextFieldChange(\'' + listConfig[j].FieldName + '\');" />';
                    //htm += '<input type="text" id="' + listConfig[j].FieldName + '" value="" onclick="listTextFieldFocus(\'' + listConfig[j].FieldName + '\');"onblur="listTextFieldLostFocus(\'' + listConfig[j].FieldName + '\');"onkeyup="listTextFieldChange(\'' + listConfig[j].FieldName + '\');" />';
                    htm += '<input type="text" id="' + listConfig[j].FieldName + '" value="" onclick="listTextFieldFocus(this,\'' + listConfig[j].FieldName + '\',' + addCount + ',\'' + listConfig[j].FieldName + '\',\'' + fieldName + '\');"onblur="listTextFieldLostFocus(this,\'' + listConfig[j].FieldName + '\',' + addCount + ',\'' + listConfig[j].FieldName + '\',\'' + fieldName + '\');"onkeyup="listTextFieldChange(this,\'' + listConfig[j].FieldName + '\',' + addCount + ',\'' + listConfig[j].FieldName + '\',\'' + fieldName + '\');" />';

                    htm += '</td>';
                    break;
                case "label":
                    htm += '<td  id="' + listConfig[j].FieldName + '" style="width:' + listConfig[j].ColumnWidth + ';font-family: ' + listConfig[j].RFont + ';font-size:' + listConfig[j].RFontSize + ';color: ' + listConfig[j].RForeColor + ' ;background-color:' + listConfig[j].RBackColor + '; text-align:' + getAlignStyle(listConfig[j].Alignment) + ';' + fontWeight + '">';
                    htm += '<label  id="' + listConfig[j].FieldName + '" > </label>';
                    htm += '</td>';
                    break;
                case "option":
                    htm += '<td  id="' + listConfig[j].FieldName + '" style="width:' + listConfig[j].ColumnWidth + ';font-family: ' + listConfig[j].RFont + ';font-size:' + listConfig[j].RFontSize + ';color: ' + listConfig[j].RForeColor + ' ;background-color:' + listConfig[j].RBackColor + '; text-align:' + getAlignStyle(listConfig[j].Alignment) + ';' + fontWeight + '">';
                    htm += '<input type="checkbox" id="' + listConfig[j].DataMember + '" name="' + listConfig[j].DataMember + '"  onclick="listCheckBoxClickFunction(this,\'' + listConfig[j].FieldName + '\',' + trowCount + ');listCheckBoxValueChanged(this,\'' + listConfig[j].FieldName + '\',' + j + ',\'' + $('#' + listConfig[j].DataMember).val() + '\');" >';
                    htm += '</td>';
                    break;

                case "combobox":
                    comboboxdata = {};
                    comboboxdata.DataMember = listConfig[j].FieldName;
                    comboboxdata.ScreenName = listConfig[j].ScreenName;
                    comboboxdata.FormListType = "List";
                    DropDownIdList.push(comboboxdata);
                    vBackColor = '';
                    htm += '<td  id="' + listConfig[j].FieldName + '" style="width:' + listConfig[j].ColumnWidth + ';font-family: ' + listConfig[j].RFont + ';font-size:' + listConfig[j].RFontSize + ';color: ' + listConfig[j].RForeColor + ' ;background-color:' + listConfig[j].RBackColor + '; text-align:' + getAlignStyle(listConfig[j].Alignment) + ';' + fontWeight + '">';
                    //htm += '<select id="' + listConfig[j].DataMember + '"   style="  height: ' + listConfig[j].ValueHeight + "px" + ';font-size:' + listConfig[j].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + listConfig[j].VFont + ';text-align:' + getAlignStyle(listConfig[j].VAlignment) + ';" >';
                    htm += '<select id="' + listConfig[j].DataMember + '"  onchange="formComboChangeItemPromotion(this,\'' + listConfig[j].DataMember + '\',' + addCount + '  );"  style="  height: ' + listConfig[j].ValueHeight + "px" + ';font-size:' + listConfig[j].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + listConfig[j].RBackColor + ';font-family:' + listConfig[j].VFont + ';text-align:' + getAlignStyle(listConfig[j].VAlignment) + ';" >';

                    htm += '</select>';
                    htm += '</td>';

                    break;
                case "lookup":
                    htm += '<td  id="' + listConfig[j].FieldName + '" style="width:' + listConfig[j].ColumnWidth + ';font-family: ' + listConfig[j].RFont + ';font-size:' + listConfig[j].RFontSize + ';color: ' + listConfig[j].RForeColor + ' ;background-color:' + listConfig[j].RBackColor + '; text-align:' + getAlignStyle(listConfig[j].Alignment) + ';' + fontWeight + '">';
                    //htm += '<input type="text" id="' + listConfig[j].FieldName + '_' + addCount + '"  onclick="formReadonlyClicked(\'' + listConfig[j].FieldName + '\');" style="width:80%"  />';
                    htm += '<input type="text" id="' + listConfig[j].FieldName + '"  onclick="formReadonlyClicked(\'' + listConfig[j].FieldName + '\');" style="width:80%"  />';
                    htm += '<span href="#" style="width:20%;listConfig[j].oat:right;margin-top:5px;height:30px;"   onclick="formLookUpClicked(\'' + listConfig[j].FieldName + '\');GetLookUpData1(\'' + listConfig[j].FieldName + '\',\'' + listConfig[j].FieldName + '\',\'' + "" + '\');" class="input-group-addon"> <i class="fa fa-plus"></i>  </span>';
                    htm += '</td>';
                    break;
            }
        }
    }
    htm += '</tr>';
    $("#" + ttbody).append(htm);
    dynamicItemPromotionTableclickfunction(fieldName);

    if (DropDownIdList.length > 0)
        GetDropDownListValue(CurrentScreen_TabScreen_Name, "List");

    //if (totalLength == (currentCount + 1) && _isdynamic == true && _action == 'edit') {
    //    var actionPlan = "AddEmptyRow";
    //    isDynamicValidate = true;
    //    AddDynamicListNewItemPromtion(CurrentScreen_TabScreen_Name, ttbody, fieldName, actionPlan, isDynamicValidate);
    //}
}

function formComboChangeItemPromotion(obj, dataMember, rowIndex) {

    //var t = document.getElementById("table_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName).rows;
    //t[0].cells[0].innerHTML
    istextValueAssigned = false;
    isselectValueAssigned = false;
    //  var textbox = $('#ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName + ' tr').find("input")
    if (dynamicFieldName != FieldName)
        dynamicFieldName = FieldName;
    var rowDataString = document.getElementById("table_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName).rows[(rowIndex + 1)].innerHTML;
    var rowData = rowDataString.split('</td>')
    istextValueAssigned = false;
    if (dataMember == "LineType") {
        for (var i = 1; i < (rowData.length - 1) ; i++) {
            id = getTableRowTDid(rowData[i]);
            type = getTableRowFullTDType(rowData[i]);

            if (type.toLowerCase() == "text" || type == "select") {
                $('#ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName + ' tr')[rowIndex].cells[id].childNodes['0'].value = '';
            }
            else if (type.toLowerCase() == "") {
                $('#ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName + ' tr')[rowIndex].cells[id].innerHTML = ""
            }

            //if (type.toLowerCase() == "text" && istextValueAssigned == false) {
            //    var textbox = $('#ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName + ' tr').find("input");
            //    // var rowIndexCount = dynamicRowindex == 1 ? dynamicRowindex : dynamicRowindex + 1;
            //    //  var dividedCount = textbox.length / (dynamicRowindex + 1);
            //    // var dividedCount = textbox.length / dynamicRowindex;
            //    // var dividedCount = textbox.length / rowIndexCount;
            //    var minusCount = textbox.length - dividedCount;

            //    var dividedCount = textbox.length / (rowIndex + 1);
            //    var initCount = rowIndex * dividedCount;
            //    var lengthCount = initCount + dividedCount;
            //    //  for (var y = minusCount; y < textbox.length; y++) {
            //    for (var y = initCount; y < lengthCount; y++) {
            //        id = textbox[y].id.split('_')[0];
            //        if (textbox[y].type == 'checkbox') {
            //            textbox[y].checked = false;;
            //        }
            //        else {
            //            textbox[y].value = "";
            //        }
            //    }
            //    istextValueAssigned = true
            //}
            //else if (type == "select" && isselectValueAssigned == false) {
            //    var select = $('#ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName + ' tr').find("select");
            //    // var dividedCount = select.length / dynamicRowindex;
            //    var dividedCount = select.length / (rowIndex + 1);
            //    var initCount = rowIndex * dividedCount;
            //    var lengthCount = initCount + dividedCount;
            //    //  for (var y = minusCount; y < textbox.length; y++) {
            //    for (var y = initCount; y < lengthCount; y++) {
            //        //for (var y = 0; y < select.length; y++) {
            //        if (select[y].id != "LineType")
            //            select[y].value = "";
            //    }
            //    isselectValueAssigned = true;
            //}
            //else if (type.toLowerCase() == "") {
            //    //var label = $('#ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName + ' tr').find("label");
            //    //for (var z = 0; z < label.length; z++) {
            //    //    label[z].innerHTML = "";
            //    //}

            //    //    tblbody.children.Item0.cells.ItemID.innerHTML
            //    $('#ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName + ' tr')[rowIndex].cells[id].innerHTML = ""
            //    //var tblbody = document.getElementById("ListBodyDivId_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName);
            //    //tblbody.firstChild.cells[id].innerHTML = '';
            //    // tblbody.rows[(rowIndex + 1)].cells.namedItem(id).innerHTML = ""
            //}
        }
    }
}


function dynamicItemPromotionTableclickfunction(fieldName) {
    dynamicFieldName = fieldName;
    //if (currentScreenName + "_" + TabScreenName != CurrentScreen_TabScreen_Name)
    //    CurrentScreen_TabScreen_Name = currentScreenName + "_" + TabScreenName;
    //$('#table_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName + ' >tbody > tr').dblclick(function (event) {
    $("#table_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName + " >tbody > tr > td").click(function (event) {
        event.stopImmediatePropagation();
        var radioType = '';
        if (CurrentScreen_TabScreen_Name == "ItemPromotionForm_Appliesto" || CurrentScreen_TabScreen_Name == "InvoicePromotionForm_Appliesto")
            radioType = fieldType = $("input:radio[name='ApType']:checked").val();
        if (radioType != "All") {
            var tablwe = $(this).closest("#table_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName + " >tbody > tr > td");
            var trowCount = $('#table_' + CurrentScreen_TabScreen_Name + '_' + fieldName + ' >tbody >tr').length;
            tableTotalRowCount = trowCount;
            var tr = $(this).closest("tr");
            dynamicRowindex = tr.index() + 1;
            currentRowClickCount = tr.index();
            ///
            var lastRowDataString = document.getElementById("table_" + CurrentScreen_TabScreen_Name + "_" + fieldName).rows[(dynamicRowindex)].innerHTML;
            var lastRowData = lastRowDataString.split('</td>')
            value = getTableRowTDvalue(lastRowData[0]);
            ////

            //   var column_num = parseInt($(this).index()) + 1;
            // if ($(this).index() < 1 && trowCount == (dynamicRowindex) && value == "") {
            var isrowClick = false;
            if (CurrentScreen_TabScreen_Name == "InvoicePromotionForm_Category" || CurrentScreen_TabScreen_Name == "InvoicePromotionForm_Offer") {
                if ($(this).index() == 0)
                    isrowClick = true;
            }
            else if (CurrentScreen_TabScreen_Name == "ItemPromotionForm_Appliesto" || CurrentScreen_TabScreen_Name == "InvoicePromotionForm_Appliesto") {
                if ($(this).index() == 0)
                    isrowClick = true;
            }
            else if ($(this).index() == 1)
                isrowClick = true;

            //if ($(this).index() == 1) {
            if (isrowClick == true) {
                dynamicTableId = 'table_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName;

                //  var popUpListId = event.currentTarget.childNodes[0].id
                var popUpListId = event.currentTarget.id
                dynamicList = [];

                var obj = {};
                var objList = [];
                var fieldType = '';

                //for (var j = 1; j <= trowCount; j++) {
                //    var currentRowClickedCnt = $(this).index() + 1;//or -- //$('#table_' + fieldName + ' >tbody >tr').index()+1;
                //    if (currentRowClickedCnt != j) {
                //        objList = [];
                //        var lastRowDataString = document.getElementById("table_" + CurrentScreen_TabScreen_Name + "_" + fieldName).rows[j].innerHTML;
                //        var lastRowData = lastRowDataString.split('</td>')
                //        for (var i = 0; i < (lastRowData.length - 1) ; i++) {
                //            obj = {};
                //            id = getTableRowTDid(lastRowData[i]);
                //            value = getTableRowTDvalue(lastRowData[i]);
                //            if (i == 0) {
                //                value = $('#ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName + ' tr').find("select")[i].value;
                //                fieldType = value;
                //            }
                //            obj["FieldName"] = id;
                //            obj[id] = value;
                //            objList.push(obj);
                //        }
                //        if (objList.length > 0)
                //            dynamicList.push(objList);
                //    }
                //}

                var j = parseInt(currentRowClickCount) + 1;
                // for (var j = 1; j <= trowCount; j++) {
                objList = [];
                var lastRowDataString = document.getElementById("table_" + CurrentScreen_TabScreen_Name + "_" + fieldName).rows[j].innerHTML;
                var lastRowData = lastRowDataString.split('</td>')
                for (var i = 0; i < (lastRowData.length - 1) ; i++) {
                    obj = {};
                    id = getTableRowTDid(lastRowData[i]);
                    value = getTableRowTDvalue(lastRowData[i]);
                    if (i == 0) {

                        // var tblbody = document.getElementById("ListBodyDivId_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName);
                        var tblbody = document.getElementById("ListBodyDivId_" + CurrentScreen_TabScreen_Name + "_" + FieldName);
                        if (tblbody != null) {
                            var tdType = getTableRowTDType(tblbody.rows[currentRowClickCount].cells.namedItem(id).innerHTML);
                            if (tdType == "select") {
                                //tblbody.rows[(dynamicRowindex - 1)].cells.namedItem('Inventory').childNodes['0'].value;
                                value = tblbody.rows[(currentRowClickCount)].cells.namedItem(id).childNodes['0'].value;
                                // value = tblbody.rows[(currentRowClickCount)].cells.namedItem(id).innerHTML;
                                value = value == null || value == undefined ? "" : value;
                                fieldType = value;
                            }

                        }
                    }

                    //if (i == 0) {
                    //    var select = $('#ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName + ' tr').find("select");

                    //    //  var dividedCount = select.length / dynamicRowindex;
                    //    var dividedCount = select.length / (currentRowClickCount + 1);
                    //    var minusCount = select.length - dividedCount;
                    //    for (var y = minusCount; y < select.length; y++) {
                    //        var fieldId = select[y].id.split('_')[0];
                    //        if (fieldId == "LineType") {
                    //            var value = select[y].value
                    //            value = value == null || value == undefined ? "" : value;
                    //            fieldType = value;
                    //            y = select.length + 1;
                    //        }
                    //    }

                    //    //value = $('#ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName + ' tr').find("select")[i].value;
                    //    //fieldType = value;
                    //}
                    obj["FieldName"] = id;
                    obj[id] = value;
                    objList.push(obj);
                }

                ////this logic added in new -- 08.02.2019
                //obj = {};
                //var lastRowobjListDataString = document.getElementById("table_" + CurrentScreen_TabScreen_Name + "_" + fieldName).rows[(currentRowClickCount + 1)].innerHTML;
                //var rowData = document.getElementById("table_" + CurrentScreen_TabScreen_Name + "_" + fieldName).rows[(currentRowClickCount + 1)];
                //var lastRowData = lastRowDataString.split('</td>')
                //for (var i = 0; i < (lastRowData.length - 1) ; i++) {
                //    id = getTableRowTDid(lastRowData[i]);
                //    var type = getTableRowFullTDType(lastRowData[i]);
                //    if (type == "text") {
                //        value = rowData.cells[id].childNodes['0'].value;
                //    }
                //    else if (type == "select") {
                //        value = rowData.cells[id].childNodes['0'].value;
                //    }
                //    else
                //        value = rowData.cells[id].childNodes.length == 0 ? "" : rowData.cells[id].childNodes['0'].data == undefined ? "" : rowData.cells[id].childNodes['0'].data;
                //    obj[id] = value;
                //}

                //obj.FieldName = FieldName;
                //FormView[FieldName] = obj;    
                ///////////


                if (objList.length > 0)
                    dynamicList.push(objList);
                // }
                if (CurrentScreen_TabScreen_Name == "ItemPromotionForm_Appliesto")
                    fieldType = $("input:radio[name='ApType']:checked").val();
                else if (CurrentScreen_TabScreen_Name == "InvoicePromotionForm_Category")
                    fieldType = "Item";
                else if (CurrentScreen_TabScreen_Name == "InvoicePromotionForm_Offer")
                    fieldType = "Item";
                else if (CurrentScreen_TabScreen_Name == "InvoicePromotionForm_Appliesto")
                    fieldType = $("input:radio[name='ApType']:checked").val();
                isdynamic = true;
                if (fieldType == "")
                    fieldType = "Item"
                fieldType = fieldType.toString().replace(" ", "");
                formLookUpClicked("", fieldType + "_" + popUpListId, 0, '');
                //formLookUpClicked("", fieldName + "_" + popUpListId, 0, '');

            }
        }
    });
}



