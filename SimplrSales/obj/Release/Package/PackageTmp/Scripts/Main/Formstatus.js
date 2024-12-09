
var DropDownIdList = [];

function getFormstatusList(formUrl, divId) {
    $.ajax({
        type: 'GET',
        url: formUrl,
        dataType: 'json',
        success: function (data) {
            //data = $.parseJSON(data);
            var htm = '';
            htm += '<div style="width: 100%"  class="container1">';
            for (var i = 0; i < data.length; i++) {
                if (data[i].ValueWidth != "0" && data[i].HeaderWidth != "0") {

                    fontWeight = data[i].HFontStyle;
                    var fontWeightt = data[i].VFontStyle;

                    var hForeColor = argbToRGB(data[i].HForeColor);
                    var hBackColor = argbToRGB(data[i].HBackColor);
                    hForeColor = '';
                    hBackColor = '';
                    var vForeColor = argbToRGB(data[i].VForeColor);
                    var vBackColor = argbToRGB(data[i].VBackColor);


                    var displayNo = data[i].DisplayNo.toString().split('.');
                    if (displayNo.length == 1) {

                        switch (data[i].FieldControl.toLowerCase()) {


                            case "datepicker":
                                htm += '<div style="text-align: left;padding-top: 10PX;">';
                                //htm += '<label style="width:' + data[i].HeaderWidth + "%" + ';height: ' + data[i].HeaderHeight + "%" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + argbToRGB(data[i].HForeColor) + ';background-color:' + a1rgbToRGB(data[i].HBackColor) + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                                //htm += '<input type="date" id="' + data[i].DataMember + '" style="width:' + data[i].ValueWidth + "%" + '; height: ' + data[i].ValueHeight1 + "%" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + argbToRGB(data[i].VForeColor) + ';background-color:' + argbToRGB(data[i].VBackColor) + ';font-family:' + data[i].VFont + ';' + fontWeightt + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';

                                htm += '<label style="width:' + data[i].HeaderWidth + "%" + ';height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                                htm += '<input type="date" id="' + data[i].DataMember + '" style="width:' + data[i].ValueWidth + "%" + '; height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';' + fontWeightt + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                                htm += '</div>';
                                break;

                            case "textbox":
                                htm += '<div style="text-align: left;padding-top: 10PX;">';
                                htm += '<label style="width:' + data[i].HeaderWidth + "%" + ';height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                                htm += '<input type="text" id="' + data[i].DataMember + '" style="width:' + data[i].ValueWidth + "%" + '; height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';' + fontWeightt + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                                htm += '</div>';
                                break;
                                //case "label":
                                //    htm += '<div style="text-align: left;">';
                                //    htm += '<label style="width:' + data[i].HeaderWidth + "%" + ';height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].FieldName + '</label>';
                                //    htm += '<label  id="' + data[i].DataMember + '" style="width:' + data[i].ValueWidth + "%" + '; height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';' + fontWeightt + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" > </label>';
                                //    htm += '</div>';
                                //    break;
                            case "option":
                                htm += '<div style="text-align: left;padding-top: 10PX;"">';
                                htm += '<label style="width:' + data[i].HeaderWidth + "%" + ';height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                                htm += '<input type="checkbox" id="' + data[i].DataMember + '" style="width:' + data[i].ValueWidth + "%" + '; height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';' + fontWeightt + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                                htm += '</div>';
                                break;

                                // case "label":
                            case "combobox":
                                DropDownIdList.push(data[i].DataMember);
                                htm += '<div style="text-align: left;padding-top: 10PX;">';
                                // htm += '<div>';
                                htm += '<label style="width:' + data[i].HeaderWidth + "%" + ';height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                                //htm += '</div>';
                                //htm += '<div>';
                                htm += '<select id="' + data[i].DataMember + '" style="width:' + data[i].ValueWidth + "%" + '; height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';' + fontWeightt + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';">';
                                //htm += '<option value="0">Select</option>';
                                //htm += '<option value="1">Test 1</option>';
                                //htm += '<option value="2">Test 2</option>';
                                //htm += '<option value="3">Test 3</option>';
                                htm += '</select>';
                                htm += '</div>';
                                // htm += '</div>';
                                break;
                            case "button":
                                htm += '<div style="text-align: right;padding-top: 10PX;">';
                                htm += '<input type="button" value="' + data[i].DataMember + '" id="' + data[i].DataMember + '" style="width:' + data[i].ValueWidth + "%" + '; height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';' + fontWeightt + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';line-height:none" />';
                                htm += '</div>';
                                break;
                        }
                    }
                    else {
                        if (data[i].FieldControl.toLowerCase() == "button")
                            htm += '<div style="text-align: right;padding-top: 10PX;">';
                        else
                            htm += '<div style="text-align: left;">';
                        var displayNoCount = 1;
                        for (var j = 0; j < displayNoCount; j++) {
                            hForeColor = argbToRGB(data[i].HForeColor);
                            hBackColor = argbToRGB(data[i].HBackColor);
                            hForeColor = '';
                            hBackColor = '';
                            vForeColor = argbToRGB(data[i].VForeColor);
                            vBackColor = argbToRGB(data[i].VBackColor);

                            if (data.length == (i + 1))
                                displayNoCount = 0;
                            else if (data[(i + 1)].DisplayNo.toString().split('.').length >= 1 && data[(i + 1)].DisplayNo.toString().split('.')[0] == displayNo[0])
                                displayNoCount++;
                            else
                                displayNoCount = 0;
                            //if (j != 0)
                            //    i++;
                            switch (data[i].FieldControl.toLowerCase()) {
                                case "datepicker":
                                    htm += '<label style="width:' + data[i].HeaderWidth + "%" + ';height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                                    htm += '<input type="date" id="' + data[i].DataMember + '" style="width:' + data[i].ValueWidth + "%" + '; height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';' + fontWeightt + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                                    break;

                                case "textbox":
                                    htm += '<label style="width:' + data[i].HeaderWidth + "%" + ';height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                                    htm += '<input type="text" id="' + data[i].DataMember + '" style="width:' + data[i].ValueWidth + "%" + '; height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';ont-family:' + data[i].VFont + ';' + fontWeightt + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                                    break;

                                    //case "label":
                                    //    htm += '<label style="width:' + data[i].HeaderWidth + "%" + ';height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                                    //    htm += '<label  id="' + data[i].DataMember + '" style="width:' + data[i].ValueWidth + "%" + '; height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';' + fontWeightt + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" ></label>';
                                    //    break;
                                case "option":
                                    htm += '<label style="width:' + data[i].HeaderWidth + "%" + ';height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                                    htm += '<input type="checkbox" id="' + data[i].DataMember + '" style="width:' + data[i].ValueWidth + "%" + '; height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';' + fontWeightt + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';" />';
                                    break;

                                case "combobox":
                                    DropDownIdList.push(data[i].DataMember);
                                    // htm += '<div>';
                                    htm += '<label style="width:' + data[i].HeaderWidth + "%" + ';height: ' + data[i].HeaderHeight + "px" + ';font-size:' + data[i].HFontSize + "px" + ';color:' + hForeColor + ';background-color:' + hBackColor + ';font-family:' + data[i].HFont + ';' + fontWeight + ';text-align:' + getAlignStyle(data[i].HAlignment) + ';">' + data[i].NewText + '</label>';
                                    //htm += '</div>';
                                    //htm += '<div>';
                                    htm += '<select id="' + data[i].DataMember + '" style="width:' + data[i].ValueWidth + "%" + '; height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';' + fontWeightt + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';">';
                                    //htm += '<option value="0">Select</option>';
                                    //htm += '<option value="1">Test 1</option>';
                                    //htm += '<option value="2">Test 2</option>';
                                    //htm += '<option value="3">Test 3</option>';
                                    htm += '</select>';
                                    // htm += '</div>';
                                    break;

                                case "button":
                                    htm += '<input type="button" value="' + data[i].NewText + '" id="' + data[i].DataMember + '" style="width:' + data[i].ValueWidth + "%" + '; height: ' + data[i].ValueHeight + "px" + ';font-size:' + data[i].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + data[i].VFont + ';' + fontWeightt + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';line-height:none" />';

                                    break;


                            }
                            if (displayNoCount != 0)
                                i++;
                        }

                        htm += '</div>';

                    }

                }

            }
            htm += '</div>';
            $("#" + divId).append(htm);
            if (DropDownIdList.length > 0)
                GetDropDownListValue();
        }
    });
}

function GetDropDownListValue() {
    for (
        var i = 0; i < DropDownIdList.length; i++) {
        $.ajax({
            type: 'GET',
            url: url_GetDropDownListValue,
            data: { id: DropDownIdList[i] },
            dataType: 'json',
            async: false,
            success: function (data) {
                populateDropDown(data, DropDownIdList[i]);

            }
        });
    }

}

function populateDropDown(data, id) {
    $('#' + id).empty();
    var valueText = "<option value=" + 0 + ">Select</option>";
    $(valueText).appendTo('#' + id);
    $.each(data, function (i, data) {
        valueText = "<option value=" + data.Code + ">" + data.Text + "</option>";
        $(valueText).appendTo('#' + id);
    });
}

