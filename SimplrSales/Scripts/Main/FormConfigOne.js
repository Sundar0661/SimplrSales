
var DropDownIdList = [];
var RadioButtonIdList = [];
var TabGroupList = [];
var FieldIdList = [];
var DynamcFieldIdList = [];
var ReadOnlyFieldList = [];
var DataMemberType = [];
var IsMandatoryList = [];
var FieldNameFormArrayList = [];
var TabScreenName = '';
var DynamicScreenName = '';


function ClearFormConfigArrayList() {
    DropDownIdList = [];
    RadioButtonIdList = [];
    TabGroupList = [];
    FieldIdList = [];
    DynamcFieldIdList = [];
    ReadOnlyFieldList = [];
    DataMemberType = [];
    IsMandatoryList = [];
    FieldNameFormArrayList = [];
}
function GetFormConfig1(id, screenName) {
    $.ajax({
        type: 'POST',
        url: url_GetFormConfigList,
        dataType: 'json',
        data: { ScreenName: screenName },
        async: false,
        success: function (data) {
            //   $("#buttonDivId_" + actionRowClickCount).empty();
            ClearArrayList();
            ClearFormConfigArrayList();

            //data = $.parseJSON(data);
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

            }
        }
    });
}

 

function GetTabGroupMenuList(id) {
    if (isEmpty(actionRowClickCount))
        $("#tabMenuId").empty();
    else
        $("#tabMenuId_" + actionRowClickCount).empty();
    $.ajax({
        type: 'POST',
        url: url_GetTabGroupMenuList,
        dataType: 'json',
        data: { ScreenName: screenName },
        async: false,
        success: function (data) {
            var htm = '';
            htm += '<div style="width: 100%">';
            htm += '<div class="tab">';
            for (var i = 0; i < data.length; i++) {
                // TabGroupList.push(data[i].Value + "_" + actionRowClickCount);
                TabGroupList.push(data[i].Value);
                if (i == 0)
                    htm += '<button id="defaultOpen" class="tablinks" onclick="openTabMenu(event, \'' + data[i].Value + '\')">' + data[i].Descriptions + '</button>';
                else
                    htm += '<button class="tablinks" onclick="openTabMenu(event, \'' + data[i].Value + '\')">' + data[i].Descriptions + '</button>';
            }

            htm += '</div>';
            htm += '</div>';
            if (isEmpty(actionRowClickCount))
                $("#tabMenuId").append(htm);
            else
                $("#tabMenuId_" + actionRowClickCount).append(htm);
            if (TabGroupList.length > 0)
                GetTabGroupFormList(id);
            document.getElementById("defaultOpen").click();

        }
    });
}
function ClearFormArrayList() {
    FieldNameFormArrayList = [];
}
function GetTabGroupFormList(id) {
    for (var i = 0; i < TabGroupList.length; i++) {
        TabScreenName = TabGroupList[i].split('_')[0].toString();
        $.ajax({
            type: 'POST',
            url: url_GetTabGroupFormList,
            data: { ScreenName: screenName, id: TabGroupList[i].toString() },
            dataType: 'json',
            async: false,
            success: function (data) {
                // ClearFormArrayList();
                if (isViweButton == true)
                    showFormConfigListView(id, data, i);
                else
                    showFormConfigList(id, data, i);

            }
        });
    }
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
    document.getElementById(name).style.display = "block";
    evt.currentTarget.className += " active";

    // TabScreenName = name.split('_')[0];
    TabScreenName = name;
}

function GetDropDownListValue() {
    var scrName = TabScreenName == '' ? screenName : screenName + "_" + TabScreenName;
    for (var i = 0; i < DropDownIdList.length; i++) {
        $.ajax({
            type: 'POST',
            url: url_GetDropDownListValue,
            data: { ScreenName: scrName, id: DropDownIdList[i] },
            dataType: 'json',
            async: false,
            success: function (data) {
                if (data != null)
                    populateDropDown(data, DropDownIdList[i]);

            }
        });
    }

}

function GetRadioButtonListValue() {
    var scrName = TabScreenName == '' ? screenName : screenName + "_" + TabScreenName;
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
                        html += '<input type="radio" id="' + RadioButtonIdList[i] + '" name="' + RadioButtonIdList[i] + '" value="' + data[j].Text + '" style="width:5%" >' + data[j].Text;
                    }
                    $("#radio_" + RadioButtonIdList[i]).append(html);

                }
            }
        });
    }
}



function populateDropDown(data, id) {
    $('#' + id).empty();
    var valueText = "<option value=" + 0 + ">Select</option>";
    if (screenName == "CustomerAgent")
        var valueText = "<option value='ADMIN'>ADMIN</option>";
    $(valueText).appendTo('#' + id);
    $.each(data, function (i, data) {
        valueText = "<option value=" + data.Code + ">" + data.Text + "</option>";
        $(valueText).appendTo('#' + id);
    });
}


var isDataMemberTypeInt = false;
var isDataMemberTypeFloat = false;
var isDataMemberTypeDecimal = false;
var isDataMemberTypeEmail = false;
var requiredMessage = '';
function showFormConfigList(id, data, cnt) {
    // $("#" + id).empty();
    var htm = '';
    htm += '<form>';
    htm += '<div style="width: 100%">';
    if (TabGroupList.length >= 1)
        htm += '<div id="' + TabGroupList[cnt] + '" class="tabcontent">';

    for (var i = 0; i < data.length; i++) {
        if (data[i].ValueWidth != "0" && data[i].HeaderWidth != "0") {



            var fontWeight = data[i].HFontStyle;
            var fontWeightt = data[i].VFontStyle;

            var hForeColor = argbToRGB(data[i].HForeColor);
            var hBackColor = argbToRGB(data[i].HBackColor);
            hForeColor = '';
            hBackColor = '';
            var vForeColor = argbToRGB(data[i].VForeColor);
            var vBackColor = argbToRGB(data[i].VBackColor);

            var displayNo = data[i].DisplayNo.toString().split('.');
            if (displayNo.length == 1) {

                if (data[i].IsMandatory == true) {
                    IsMandatoryList.push(data[i].DataMember);
                    requiredMessage = "Please enter the " + data[i].NewText;
                }
                else
                    requiredMessage = '';
                FieldNameFormArrayList.push(data[i].DataMember);
                var dataMemberType = data[i].DataMemberType.toLowerCase();
                if (dataMemberType != "int" && dataMemberType != "float" && dataMemberType != "decimal")
                    dataMemberType = '';

                if (data[i].IsHidden == true) {
                    FieldIdList.push(data[i].DataMember + "$" + data[i].FieldControl.toLowerCase() + "$" + dataMemberType + "$" + data[i].IsMandatory);
                    htm += '<input type="hidden" id="' + data[i].DataMember + '"   style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';' + fontWeightt + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                }
                else {
                    FieldIdList.push(data[i].DataMember + "$" + data[i].FieldControl.toLowerCase() + "$" + dataMemberType + "$" + data[i].IsMandatory);

                    switch (data[i].FieldControl.toLowerCase()) {

                        case "tabgroup":
                            i = (data.length + 1);
                            GetTabGroupMenuList(id);
                            break;

                        case "datepicker":
                            htm += '<div class="row">';
                            htm += '<div class="labeltext"  style="width:' + data[i].HeaderWidth + "%" + ';">';
                            htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                            if (data[i].IsMandatory == true) htm += '<span id="m_' + data[i].DataMember + '" style="color:red">*</span>';
                            htm += '</div>';
                            htm += '<div  class="labeltext" class="labeltext" style="width:' + data[i].ValueWidth + "%" + ';">';
                            htm += '<input type="date" id="' + data[i].DataMember + '"   style="width:100%;height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';' + fontWeightt + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                            htm += '</div>';
                            htm += '</div>';
                            break;


                        case "textbox":
                            //  FieldIdList.push(data[i].DataMember + "$" + data[i].FieldControl.toLowerCase());
                            // FieldIdList.push(data[i].DataMember);
                            htm += '<div class="row">';
                            htm += '<div class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';
                            htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                            if (data[i].IsMandatory == true) htm += '<span id="m_' + data[i].DataMember + '" style="color:red">*</span>';
                            htm += '</div>';
                            htm += '<div  class="labeltext" class="labeltext" style="width:' + data[i].ValueWidth + "%" + ';">';
                            htm += '<input type="text" id="' + data[i].DataMember + '"  placeholder="' + requiredMessage + '"  style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';' + fontWeightt + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                            htm += '</div>';
                            htm += '</div>';
                            break;
                        case "lookup":
                            htm += '<div class="row">';
                            htm += '<div class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';
                            htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                            if (data[i].IsMandatory == true) htm += '<span id="m_' + data[i].DataMember + '" style="color:red">*</span>';
                            htm += '</div>';
                            htm += '<div class="labeltext" style="width:' + data[i].ValueWidth + "%" + ';">';

                            //htm += '<div class="input-group" style="display:block;">';
                            //htm += '<input type="text" id="' + data[i].DataMember + '"   style="width:85%;height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';' + fontWeightt + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';background-color:lightgrey"    disabled="true" placeholder="' + requiredMessage + '" class="form-control"  />';
                            //htm += ' <button onclick="GetLookUpData(\'' + data[i].DataMember + '\');" style="float:right;width:15%;border-color:lightgray;"><span class="input-group-addon"> <i class="fa fa-plus"></i>  </span> </button>';
                            //htm += '</div>';

                            htm += '<div class="input-group" >';
                            htm += '<input type="text" id="' + data[i].DataMember + '"   style="height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';' + fontWeightt + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';background-color:lightgrey"    disabled="true" placeholder="' + requiredMessage + '" class="form-control"  />';
                            htm += '<span href="#"   onclick="GetLookUpData(\'' + data[i].LookUpScreenName + '\',\'' + data[i].DataMember + '\',\'' + "" + '\');" class="input-group-addon"> <i class="fa fa-plus"></i>  </span>';
                            //htm += '<span href="#"   onclick="GetLookUpData(\'' + data[i].DataMember + '\');" class="input-group-addon"> <a href="#" class="fa fa-plus"></a></i>  </span>';

                            htm += '</div>';
                            htm += '</div>';
                            htm += '</div>';
                            break;
                        case "textarea":
                            htm += '<div class="row">';
                            htm += '<div class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';
                            htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                            if (data[i].IsMandatory == true) htm += '<span id="m_' + data[i].DataMember + '" style="color:red">*</span>';
                            htm += '</div>';
                            htm += '<div class="labeltext"style="width:' + data[i].ValueWidth + "%" + ';">';
                            htm += '<textarea id="' + data[i].DataMember + '"  style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';' + fontWeightt + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';"></textarea>';
                            htm += '</div>';
                            htm += '</div>';
                            break;
                        case "label":
                            htm += '<div class="row">';
                            htm += '<div  class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';
                            // htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                            htm += '</div>';
                            htm += '<div  class="labeltext" style="width:' + data[i].ValueWidth + "%" + ';">';
                            //  htm += '<label  id="' + data[i].DataMember + '"  style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';' + fontWeightt + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" >' + data[i].NewText + '</label>';
                            htm += '</div>';
                            htm += '</div>';
                            break;
                        case "line":
                            htm += '<div class="row">';
                            htm += '<div  class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';
                            htm += '</div>';
                            htm += '<div  class="labeltext" style="width:' + data[i].ValueWidth + "%" + ';">';
                            htm += '</div>';
                            htm += '</div>';
                            break;
                        case "option":
                            htm += '<div class="row">';
                            htm += '<div  class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';
                            htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                            if (data[i].IsMandatory == true) htm += '<span id="m_' + data[i].DataMember + '" style="color:red">*</span>';
                            htm += '</div>';
                            htm += '<div  class="labeltext" style="width:' + data[i].ValueWidth + "%" + ';">';
                            if (data[i].DataMemberType == "") {
                                htm += '<input type="checkbox" onclick="ClickCheckBoxFunction(\'' + data[i].DataMember + '\')" id="' + data[i].DataMember + '"   style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';' + fontWeightt + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                            }
                            else {
                                htm += '<input type="checkbox" id="' + data[i].DataMember + '"   style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';' + fontWeightt + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                            }
                            htm += '</div>';
                            htm += '</div>';
                            break;

                        case "combobox":
                            DropDownIdList.push(data[i].DataMember);
                            htm += '<div class="row">';
                            htm += '<div  class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';
                            htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                            if (data[i].IsMandatory == true) htm += '<span id="m_' + data[i].DataMember + '" style="color:red">*</span>';
                            htm += '</div>';
                            htm += '<div  class="labeltext" style="width:' + data[i].ValueWidth + "%" + ';">';
                            htm += '<select id="' + data[i].DataMember + '" onchange="DropDownOnchangeFunction(\'' + data[i].DataMember + '\');"  style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';' + fontWeightt + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" >';
                            htm += '</select>';
                            htm += '</div>';
                            htm += '</div>';
                            break;

                        case "radiobutton":
                            RadioButtonIdList.push(data[i].DataMember);
                            htm += '<div class="row">';

                            htm += '<div  class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';
                            htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                            htm += '</div>';

                            htm += '<div  class="labeltext" style="width:' + data[i].ValueWidth + "%" + ';">';
                            htm += '<div  id="radio_"' + data[i].DataMember + '"">';
                            htm += '</div>';
                            htm += '</div>';
                            htm += '</div>';
                            break;

                        case "button":
                            if (data[i].DataMember.toLowerCase() == 'cancelbtn' || data[i].DataMember.toLowerCase() == 'savebtn') {
                                var htmlButton = '';
                                if (data[i].DataMember.toLowerCase() == 'savebtn' && isEditButton == true)
                                    htmlButton += '<input type="button"  value="Update"   onclick="ClickButtonFuncton(\'UpdateBtn\');"id="' + data[i].DataMember + '" style="width:' + data[i].ValueWidth + "%" + '; height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';' + fontWeightt + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';line-height:none" />';
                                    // htmlButton += '<input type="button"  value="Update"   onclick="ClickButtonFuncton(\'UpdateBtn\',\'' + data[(i - 1)].DataMember + '\');"id="' + data[i].DataMember + '" style="width:' + data[i].ValueWidth + "%" + '; height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';' + fontWeightt + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';line-height:none" />';
                                else
                                    htmlButton += '<input type="button"  onclick="ClickButtonFuncton(\'' + data[i].DataMember + '\');" value="' + data[i].NewText + '" id="' + data[i].DataMember + '" style="width:' + data[i].ValueWidth + "%" + '; height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';' + fontWeightt + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';line-height:none" />';
                                // htmlButton += '<input type="button"  onclick="ClickButtonFuncton(\'' + data[i].DataMember + '\',\'' + data[(i - 1)].DataMember + '\');" value="' + data[i].NewText + '" id="' + data[i].DataMember + '" style="width:' + data[i].ValueWidth + "%" + '; height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';' + fontWeightt + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';line-height:none" />';
                                if (isEmpty(actionRowClickCount))
                                    $("#buttonDivId").append(htmlButton);
                                else
                                    $("#buttonDivId_" + actionRowClickCount).append(htmlButton);
                            }
                            else {
                                ReadOnlyFieldList.push(data[(i - 1)].DataMember);
                                htm += '<div class="row">';
                                htm += '<div  class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';
                                htm += '</div>';
                                htm += '<div  class="labeltext" style="width:' + data[i].ValueWidth + "%" + '; ">';
                                htm += '<input type="button" onclick="ClickButtonFuncton(\'' + data[i].DataMember + '\');" value="' + data[i].NewText + '" id="' + data[i].DataMember + '" style="width:100%;height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';' + fontWeightt + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';line-height:none" />';
                                //htm += '<input type="button" onclick="ClickButtonFuncton(\'' + data[i].DataMember + '\',\'' + data[(i - 1)].DataMember + '\');" value="' + data[i].NewText + '" id="' + data[i].DataMember + '" style="width:100%;height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';' + fontWeightt + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';line-height:none" />';
                                htm += '</div>';
                                htm += '</div>';
                            }
                            //var htmlButton = '';
                            //htmlButton += '<input type="button" value="' + data[i].NewText + '" id="' + data[i].DataMember + '" style="width:' + data[i].ValueWidth + "%" + '; height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';' + fontWeightt + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';line-height:none" />';
                            //$("#buttonDivId").append(htmlButton);
                            isBtnFormPopUpTable = true;
                            break;
                    }

                }

            }
                // }
            else {

                if (data[i].FieldControl.toLowerCase() == "button")
                    htm += '<div  class="row" style="text-align: right;padding-top: 10PX;">';
                else
                    htm += '<div class="row">';
                var displayNoCount = 1;
                for (var j = 0; j < displayNoCount; j++) {

                    if (data[i].IsMandatory == true) {
                        IsMandatoryList.push(data[i].DataMember);
                        requiredMessage = "Please enter the " + data[i].NewText;
                    }
                    else
                        requiredMessage = '';

                    FieldNameFormArrayList.push(data[i].DataMember);

                    //var fontWeight = getFontStyle(data[i].HFontStyle);
                    //fontWeight = fontWeight.replace("_", "-");
                    //fontWeight = fontWeight.replace("normal", ":normal");
                    //fontWeight = fontWeight.replace("bold", ":bold");

                    //var fontWeightt = getFontStyle(data[i].VFontStyle);
                    //fontWeightt = fontWeightt.replace("_", "-");
                    //fontWeightt = fontWeightt.replace("normal", ":normal");
                    //fontWeightt = fontWeightt.replace("bold", ":bold");

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
                    if (data[i].IsHidden == true) {
                        FieldIdList.push(data[i].DataMember + "$" + data[i].FieldControl.toLowerCase() + "$" + dataMemberType + "$" + data[i].IsMandatory);
                        htm += '<input type="hidden" id="' + data[i].DataMember + '"   style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';' + fontWeightt + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                    }
                    else {
                        FieldIdList.push(data[i].DataMember + "$" + data[i].FieldControl.toLowerCase() + "$" + dataMemberType + "$" + data[i].IsMandatory);

                        switch (data[i].FieldControl.toLowerCase()) {
                            case "tabgroup":
                                i = (data.length + 1);
                                GetTabGroupMenuList(id);
                                break;
                            case "datepicker":
                                htm += '<div class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';
                                htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                                if (data[i].IsMandatory == true) htm += '<span id="m_' + data[i].DataMember + '" style="color:red">*</span>';
                                htm += '</div>';
                                htm += '<div  class="labeltext" style="width:' + data[i].ValueWidth + "%" + ';">';
                                htm += '<input type="text" id="' + data[i].DataMember + '" class="datepicker" style="width:100%;height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';' + fontWeightt + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';"  />';
                                htm += '</div>';
                                break;

                            case "textbox":
                                //  FieldIdList.push(data[i].DataMember + "$" + data[i].FieldControl.toLowerCase());
                                htm += '<div class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';
                                htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                                if (data[i].IsMandatory == true) htm += '<span id="m_' + data[i].DataMember + '" style="color:red">*</span>';
                                htm += '</div>';
                                htm += '<div class="labeltext"style="width:' + data[i].ValueWidth + "%" + ';">';
                                htm += '<input class="' + dataMemberType + '" placeholder="' + requiredMessage + '"  type="text" id="' + data[i].DataMember + '"   style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';' + fontWeightt + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                                htm += '</div>';
                                break;

                            case "lookup":
                                htm += '<div class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';
                                htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                                if (data[i].IsMandatory == true) htm += '<span id="m_' + data[i].DataMember + '" style="color:red">*</span>';
                                htm += '</div>';
                                htm += '<div class="labeltext" style="width:' + data[i].ValueWidth + "%" + ';">';

                                //htm += '<div class="input-group" style="display:block;">';
                                //htm += '<input type="text" id="' + data[i].DataMember + '"   style="width:85%;height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';' + fontWeightt + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';background-color:lightgrey"    disabled="true" placeholder="' + requiredMessage + '" class="form-control"  />';
                                //htm += ' <button onclick="GetLookUpData(\'' + data[i].DataMember + '\');" style="float:right;width:15%;border-color:lightgray;"><span class="input-group-addon"> <i class="fa fa-plus"></i>  </span> </button>';
                                //htm += '</div>';

                                htm += '<div class="input-group" >';
                                htm += '<input type="text" id="' + data[i].DataMember + '"   style="height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';' + fontWeightt + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';background-color:lightgrey"    disabled="true" placeholder="' + requiredMessage + '" class="form-control"  />';
                                htm += '<span href="#"   onclick="GetLookUpData(\'' + data[i].LookUpScreenName + '\',\'' + data[i].DataMember + '\',\'' + "" + '\');" class="input-group-addon"> <i class="fa fa-plus"></i>  </span>';
                                //htm += '<span href="#"   onclick="GetLookUpData(\'' + data[i].DataMember + '\');" class="input-group-addon"> <a href="#" class="fa fa-plus"></a></i>  </span>';

                                htm += '</div>';
                                htm += '</div>';
                                break;
                            case "textarea":
                                htm += '<div class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';
                                htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                                if (data[i].IsMandatory == true) htm += '<span id="m_' + data[i].DataMember + '" style="color:red">*</span>';
                                htm += '</div>';
                                htm += '<div class="labeltext"style="width:' + data[i].ValueWidth + "%" + ';">';
                                htm += '<textarea id="' + data[i].DataMember + '"  style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';' + fontWeightt + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';"></textarea>';
                                htm += '</div>';
                                break;
                            case "label":
                                htm += '<div  class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';
                                //   htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                                htm += '</div>';
                                htm += '<div  class="labeltext" style="width:' + data[i].ValueWidth + "%" + ';">';
                                // htm += '<label  id="' + data[i].DataMember + '"  style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';' + fontWeightt + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" >' + data[i].NewText + '</label>';
                                htm += '</div>';
                                break;
                            case "line":
                                htm += '<div  class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';
                                htm += '</div>';
                                htm += '<div  class="labeltext" style="width:' + data[i].ValueWidth + "%" + ';">';
                                htm += '</div>';
                                break;
                            case "option":
                                htm += '<div  class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';
                                htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                                htm += '</div>';
                                htm += '<div class="labeltext" style="width:' + data[i].ValueWidth + "%" + ';">';
                                if (data[i].DataMemberType == "") {
                                    htm += '<input type="checkbox" onclick="ClickCheckBoxFunction(\'' + data[i].DataMember + '\')" id="' + data[i].DataMember + '"   style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';' + fontWeightt + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                                }
                                else {
                                    htm += '<input type="checkbox" id="' + data[i].DataMember + '"   style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';' + fontWeightt + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                                }
                                //htm += '<input type="checkbox" id="' + data[i].DataMember + '"  style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';' + fontWeightt + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';"  />';
                                htm += '</div>';
                                break;

                            case "combobox":
                                DropDownIdList.push(data[i].DataMember);
                                htm += '<div  class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';
                                htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                                if (data[i].IsMandatory == true) htm += '<span id="m_' + data[i].DataMember + '" style="color:red">*</span>';
                                htm += '</div>';
                                htm += '<div  class="labeltext" style="width:' + data[i].ValueWidth + "%" + ';">';
                                htm += '<select id="' + data[i].DataMember + '" onchange="DropDownOnchangeFunction(\'' + data[i].DataMember + '\');" style="height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';' + fontWeightt + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" >';
                                htm += '</select>';
                                htm += '</div>';
                                break;

                            case "radiobutton":
                                RadioButtonIdList.push(data[i].DataMember);
                                htm += '<div  class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';
                                htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                                htm += '</div>';
                                htm += '<div  class="labeltext" style="width:' + data[i].ValueWidth + "%" + ';">';
                                htm += '<div  id="radio_' + data[i].DataMember + '">';
                                htm += '</div>';
                                htm += '</div>';
                                break;
                            case "button":
                                if ((data[i].DataMember.toLowerCase() == 'cancelbtn' || data[i].DataMember.toLowerCase() == 'savebtn')) {
                                    var htmlButton = '';
                                    if (data[i].DataMember.toLowerCase() == 'savebtn' && isEditButton == true)
                                        htmlButton += '<input type="button"  value="Update"   onclick="ClickButtonFuncton(\'UpdateBtn\');"id="' + data[i].DataMember + '" style="width:' + data[i].ValueWidth + "%" + '; height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';' + fontWeightt + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';line-height:none" />';
                                    else
                                        htmlButton += '<input type="button"  value="' + data[i].NewText + '"   onclick="ClickButtonFuncton(\'' + data[i].DataMember + '\');"id="' + data[i].DataMember + '" style="width:' + data[i].ValueWidth + "%" + '; height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';' + fontWeightt + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';line-height:none" />';
                                    // htmlButton += '<input type="button"  onclick="ClickButtonFuncton(\'' + data[i].DataMember + '\',\'' + data[(i - 1)].DataMember + '\');" value="' + data[i].NewText + '" id="' + data[i].DataMember + '" style="width:' + data[i].ValueWidth + "%" + '; height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';' + fontWeightt + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';line-height:none" />';
                                    if (isEmpty(actionRowClickCount))
                                        $("#buttonDivId").append(htmlButton);
                                    else
                                        $("#buttonDivId_" + actionRowClickCount).append(htmlButton);

                                }
                                else {
                                    ReadOnlyFieldList.push(data[(i - 1)].DataMember);
                                    htm += '<div  class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';
                                    htm += '</div>';
                                    htm += '<div  class="labeltext" style="width:' + data[i].ValueWidth + "%" + '; ">';
                                    htm += '<input type="button" onclick="ClickButtonFuncton(\'' + data[i].DataMember + '\');" value="' + data[i].NewText + '" id="' + data[i].DataMember + '" style="width:100%;height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';' + fontWeightt + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';line-height:none" />';
                                    htm += '</div>';
                                }
                                isBtnFormPopUpTable = true;
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



    if (TabGroupList.length >= 1)
        htm += '</div>';
    htm += '</div>';
    htm += '</form>';

    // $("#FormDivId").append(htm);
    $("#" + id).append(htm);

    // $("#FormDivId_" + actionRowClickCount).append(htm);
    //actionRowClickCount = 1;
    // if(htm  !='<form><div style="width: 100%"></div></div></form>'){
    //  $("#FormDivId_" + actionRowClickCount).append(htm);

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

    if (DropDownIdList.length > 0)
        GetDropDownListValue();
    if (ReadOnlyFieldList.length > 0)
        EnableReadOnlyField();
    if (RadioButtonIdList.length > 0)
        GetRadioButtonListValue();

    if (screenName == "CustomerAgent") {
        DynamicForm();
    }
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
//var isButtonPopUp= false;
function ClickButtonFuncton(value, btnTextId) {
    if (value == "SaveBtn") {
        url_saveForm = url_InsertForm;
        SaveForm(value, "create");
    }
    else if (value == "UpdateBtn") {
        url_saveForm = url_updateForm;
        SaveForm(value, "edit");
    }
    else if (value == "CancelBtn") {
        //$('#FormDivId input:text').val('');
 
        //$('#FormDivId').children().find('select').each(function () {
        //    $(this).val('');
        //});

         BackButton(value, "back", "initBackButtonClick");
        //if (isEmpty(actionRowClickCount)) {
        //    //  $('#FormDivCreateId').empty();
        //    $('#FormDivCreateId').hide();
        //}
        //else {
        //    // $('#rowFormDiv_' + actionRowClickCount + '').empty();
        //    $('#rowFormDiv_' + actionRowClickCount + '').hide();
        //}

        ////if (isPopUpCreateForm == true) {
        ////    $('#createPopupDialog').dialog('close');
        ////}
        ////else {
        ////    window.location = url_GetIndex + "?screenName=" + screenName + "&InsertUpdateMessage=" + '' + "&MenuId=" + '' + "&Count=" + '';
        ////    //window.location = "/Common/GetIndex/?screenName=" + screenName;
        ////}
    }
    else {
        buttonTextId = btnTextId;
        GetGridHeaderDetails(url_GetListConfig, url_GetListValue, "ListHeadDivId", "ListBodyDivId", "ListfootDivId", value);
        //GetFormConfig('FormDivId1', 'PriceGroup');
        $('#dialog').dialog({ title: "" + value + " Details" }).dialog('open');
        // $('#dialog').dialog('open');
    }
}
var CopyFromToIdArrayList = [];
var CopyFromIdArrayList = [];
var CopyToIdArrayList = [];
function ClickCheckBoxFunction(id) {
    var scrName = TabScreenName == '' ? screenName : screenName + "_" + TabScreenName;
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
        if (val == 1)
            $('#' + CopyFromToIdArrayList[i].CopyTo).val($('#' + CopyFromToIdArrayList[i].CopyFrom).val());
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
    var scrName = lookUpId;
    _lookUpId = id1;
    buttonTextId = id1;
    lookUpTextId2 = id2;


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
        GetGridHeaderDetails(url_GetListConfig, url_GetListValue, "ListPopUpHeadDivId", "ListPopUpBodyDivId", "ListPopUpfootDivId", scrName);
    }

    $('#dialog').dialog({ title: "" + lookUpId + " Details" }).dialog('open');
    $('#dialogHiddenId').css("display", "none");

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


function AddDynamic() {
    var data = dynamicData;
    dynamicCnt++;

    var htm = '';
    htm += '<div style="width: 100%">';
    htm += '<div class="row"   id="dynamic_' + dynamicCnt + '">';
    for (var i = 0; i < data.length; i++) {
        var fontWeightt = data[i].VFontStyle;

        if (data[i].IsMandatory == true) {
            IsMandatoryList.push(data[i].DataMember);
            requiredMessage = "Please enter the " + data[i].NewText;
        }
        else
            requiredMessage = '';

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

        if (data[i].IsHidden == true) {
            DynamcFieldIdList.push(data[i].DataMember + "$" + data[i].FieldControl.toLowerCase() + "$" + dataMemberType + "$" + data[i].IsMandatory);
            htm += '<input type="hidden" id="' + data[i].DataMember + '"   style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';' + fontWeightt + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
        }
        else {

            if (i > 0) {
                htm += '<div class="labeltext"style="width:1%;">';
                htm += '</div>';
            }
            FieldIdList.push(data[i].DataMember + "$" + data[i].FieldControl.toLowerCase() + "$" + dataMemberType + "$" + data[i].IsMandatory);

            switch (data[i].FieldControl.toLowerCase()) {
                case "tabgroup":
                    i = (data.length + 1);
                    GetTabGroupMenuList(id);
                    break;
                case "datepicker":
                    htm += '<div class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';
                    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                    if (data[i].IsMandatory == true) htm += '<span id="m_' + data[i].DataMember + '" style="color:red">*</span>';
                    htm += '</div>';
                    htm += '<div  class="labeltext" style="width:' + data[i].ValueWidth + "%" + ';">';
                    htm += '<input  type="text" id="' + data[i].DataMember + '" class="datepicker"  style="width:100%;height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';' + fontWeightt + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';"  />';
                    htm += '</div>';
                    break;

                case "textbox":

                    htm += '<div class="labeltext"style="width:' + (data[i].ValueWidth - 1) + "%" + ';">';
                    htm += '<input class="' + dataMemberType + '" placeholder="' + requiredMessage + '"  type="text"  id="' + data[i].DataMember + '_' + dynamicCnt + '"   style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';' + fontWeightt + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                    htm += '</div>';
                    break;

                case "lookup":

                    htm += '<div class="labeltext" style="width:' + (data[i].ValueWidth - 1) + "%" + ';">';
                    htm += '<div class="input-group" >';
                    htm += '<input type="text" id="' + data[i].DataMember + '_' + dynamicCnt + '"   style="height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';' + fontWeightt + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';background-color:lightgrey"    disabled="true" placeholder="' + requiredMessage + '" class="form-control"  />';
                    htm += '<span href="#"   onclick="GetLookUpData(\'' + data[i].LookUpScreenName + '\',\'' + data[i].DataMember + '_' + dynamicCnt + '\',\'' + data[(i + 1)].DataMember + '_' + dynamicCnt + '\');" class="input-group-addon"> <i class="fa fa-plus"></i>  </span>';
                    htm += '</div>';

                    htm += '</div>';
                    break;
                case "textarea":
                    htm += '<div class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';
                    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                    if (data[i].IsMandatory == true) htm += '<span id="m_' + data[i].DataMember + '" style="color:red">*</span>';
                    htm += '</div>';
                    htm += '<div class="labeltext"style="width:' + data[i].ValueWidth + "%" + ';">';
                    htm += '<textarea id="' + data[i].DataMember + '"  style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';' + fontWeightt + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';"></textarea>';
                    htm += '</div>';
                    break;
                case "label":
                    htm += '<div  class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';
                    htm += '</div>';
                    htm += '<div  class="labeltext" style="width:' + data[i].ValueWidth + "%" + ';">';
                    htm += '</div>';
                    break;
                case "line":
                    htm += '<div  class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';
                    htm += '</div>';
                    htm += '<div  class="labeltext" style="width:' + data[i].ValueWidth + "%" + ';">';
                    htm += '</div>';
                    break;
                case "option":
                    htm += '<div  class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';
                    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                    htm += '</div>';
                    htm += '<div class="labeltext" style="width:' + data[i].ValueWidth + "%" + ';">';
                    if (data[i].DataMemberType == "") {
                        htm += '<input type="checkbox" onclick="ClickCheckBoxFunction(\'' + data[i].DataMember + '\')" id="' + data[i].DataMember + '"   style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';' + fontWeightt + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                    }
                    else {
                        htm += '<input type="checkbox" id="' + data[i].DataMember + '"   style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';' + fontWeightt + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                    }
                    //htm += '<input type="checkbox" id="' + data[i].DataMember + '"  style="  height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';' + fontWeightt + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';"  />';
                    htm += '</div>';
                    break;

                case "combobox":
                    DropDownIdList.push(data[i].DataMember);
                    htm += '<div  class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';
                    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                    if (data[i].IsMandatory == true) htm += '<span id="m_' + data[i].DataMember + '" style="color:red">*</span>';
                    htm += '</div>';
                    htm += '<div  class="labeltext" style="width:' + data[i].ValueWidth + "%" + ';">';
                    htm += '<select  id="' + data[i].DataMember + '" style="height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';' + fontWeightt + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" >';
                    htm += '</select>';
                    htm += '</div>';
                    break;

                case "radiobutton":
                    RadioButtonIdList.push(data[i].DataMember);
                    htm += '<div  class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';
                    htm += '<label  style="height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                    htm += '</div>';
                    htm += '<div  class="labeltext" style="width:' + data[i].ValueWidth + "%" + ';">';
                    htm += '<div  id="radio_' + data[i].DataMember + '">';
                    htm += '</div>';
                    htm += '</div>';
                    break;
                case "button":
                    ReadOnlyFieldList.push(data[(i - 1)].DataMember);
                    htm += '<div  class="labeltext" style="width:' + data[i].HeaderWidth + "%" + ';">';
                    htm += '</div>';
                    htm += '<div  class="labeltext" style="width:' + data[i].ValueWidth + "%" + '; ">';
                    htm += '<input type="button" onclick="ClickButtonFuncton(\'' + data[i].DataMember + '\');" value="' + data[i].NewText + '" id="' + data[i].DataMember + '" style="width:100%;height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';' + fontWeightt + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';line-height:none" />';
                    htm += '</div>';
                    isBtnFormPopUpTable = true;
                    break;
            }


        }
    }
    htm += '<div class="labeltext" style="width:5%;">';
    htm += '<input    type="button"   onclick="AddDynamic();"  value="+" style="background-color:Green;height:30px;width:98%;"/>';
    htm += '</div>';
    if (dynamicCnt > 0) {
        htm += '<div class="labeltext" style="width:5%;">';
        htm += '<input    type="button"  onclick="RemoveDynamic(' + dynamicCnt + ');"  value="-"style="background-color:red;height:30px;width:98%;"/>';
        htm += '</div>';
    }
    htm += '</div>';
    htm += '</div>';

    $("#DynamicFormDivId").append(htm);

    if (salesAgentId == "")
        salesAgentId = "ADMIN"
    $('#AgentID_' + dynamicCnt).val(salesAgentId).attr('disabled', true).css('background-color', 'lightgrey');
}


function AddDynamicHeader() {
    dynamicCnt = -1;
    var data = dynamicData;

    var htmlHeader = '';
    htmlHeader += '<div style="width: 100%">';
    htmlHeader += '<div class="row">';
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
function DropDownOnchangeFunction(id) {
    if (screenName == "CustomerAgent") {
        salesAgentId = $('#' + id).val();
        dynamicCnt = -1;
        $("#DynamicFormDivId").empty();
        DynamcFieldIdList = [];
        AddDynamicHeader();
        AddDynamic();
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
