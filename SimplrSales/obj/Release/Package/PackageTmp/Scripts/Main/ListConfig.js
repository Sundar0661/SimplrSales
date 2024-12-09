function infoA(error, logType) {
    // /Common/JavaScriptErrorData
    var url = "../Common/JavaScriptErrorData";
    // if (isErrorLogEnable == true)
    $.ajax({
        url: url,// url_JavaScriptErrorData,
        type: 'POST',
        dataType: 'json',
        async: false,
        data: { error: error, logType: logType },
        success: function (results) {
            pageLoadingLog = "";
            return results;
        },
        error: function (results, q, a) {
            //alert(results);
        }
    });
}
function PageLoadinginfoA(text) {

    // if (isErrorLogEnable == true) {
    var d = new Date();
    var pageLoadingLog = "";
    pageLoadingLog += d + " : " + d.getMilliseconds() + " : " + d.getTime() + "\r\n";
    pageLoadingLog += "-----------------------------------------------------------\r\n";
    pageLoadingLog += text + "\r\n";
    pageLoadingLog += "-----------------------------------------------------------\r\n";
    //infoA(pageLoadingLog, "PageLoadinginfo");
    // }
}


var FieldNameArrayList = [];
var HeaderFieldNameArrayList = [];
var New1TextArrayList = [];
var NewTextBtnArrayList = [];
var FieldControlList = [];
var ColumnWidthList = [];
var DeleteCheckBoxColumnWidthList = [];
var ColumnWidth = [];
var HFontSizeList = [];
var RFontSizeList = [];
var HForeColorList = [];
var HBackColorList = [];

var HForeColorActionList = [];
var HBackColorActionList = [];

var RForeColorList = [];
var RBackColorList = [];
var ARForeColorList = [];
var ARBackColorList = [];
var HFontList = [];
var HFontStyle = [];
var RFontStyle = [];
var AlignmentList = [];
var IsHiddenList = [];
var RFontList = [];
var isBtnFormPopUpTable = false;
var isPopUpCreateForm = false;
var ListConfigLength = 0;
var isEditButton = false;
var isViweButton = false;
var ActionId = '';
var headerCount = 0;


function ListConfigClearArrayList11() {
    FieldNameArrayList = [];
    HeaderFieldNameArrayList = [];
    New1TextArrayList = [];
    NewTextBtnArrayList = [];
    HForeColorActionList = [];
    HBackColorActionList = [];
    FieldControlList = [];
    ColumnWidthList = [];
    DeleteCheckBoxColumnWidthList = [];
    HFontSizeList = [];
    RFontSizeList = [];
    HForeColorList = [];
    HBackColorList = [];
    RForeColorList = [];
    RBackColorList = [];
    ARForeColorList = [];
    ARBackColorList = [];
    HFontList = [];
    HFontStyle = [];
    RFontStyle = [];
    AlignmentList = [];
    IsHiddenList = [];
    RFontList = [];
    headerCount = 0;
}

var arrList = [];
var headerList = [];
var ListHeaderList = {};

function GetGridHeaderDetails11(headerUrl, rowUrl, theadId, ttbody, tfoot, scrName) {
    //  scrName = scrName != '' ? scrName : screenName;
    $.ajax({
        type: 'POST',
        url: headerUrl,
        //data: { ScreenName: screenName },
        data: { ScreenName: scrName },
        async: false,
        success: function (data) {
            ListConfigClearArrayList();
            data = $.parseJSON(data);
            //  ListConfigLength = data.length;
            $("#" + theadId).empty();
            $("#" + ttbody).empty();
            $("#createButtonDivId").empty();

            var htm = '';
            htm = '<tr  class="tablehead">';

            var searchhtml = '';
            searchhtml += '<tr  class="tablehead">';


            ////
            var screenName = '', headerList = [], header = {}, totalWidth = 0;
            var arrTotalWidth = [], dLineIndex = 0;
            //   var dFontHeightRatio = systemTableConfig['FONTRATIO'];
            ////
            for (var i = 0; i < data.length; i++) {

                ////
                //if (screenName != '' && screenName != '' + data[i].ScreenName) {
                //    Titanium.App.Properties.setList('ListConfig_' + screenName, headerList);
                //    Titanium.App.Properties.setInt('TotalWidth_' + screenName, totalWidth);
                //    headerList = [];
                //    totalWidth = 0;
                //}
                screenName = data[i].ScreenName;
                header = {};
                //header.headerHeight = (Titanium.Platform.displayCaps.density == 'high ? parseInt(pHeight*0.065) : parseInt(pHeight*0.06);//data[i].HeaderHeight;

                // header.headerHeight = parseInt(data[i].HeaderHeight * Ti.App.dHeightRatio);
                header.headerHeight = parseInt(data[i].HeaderHeight);
                header.HFont = data[i].HFont;
                //header.HFontSize = (Titanium.Platform.displayCaps.density == 'high ? parseInt(pHeight*0.025) : parseInt(pHeight*0.02);//data[i].HFontSize;
                //header.HFontSize = parseInt(data[i].HFontSize * Ti.App.dHeightRatio);

                // header.HFontSize = parseInt(data[i].HFontSize * dFontHeightRatio);
                header.HFontSize = parseInt(data[i].HFontSize);
                header.HFontStyle = data[i].HFontStyle;
                header.screenName = screenName;//data[i].ScreenName;
                header.displayNo = data[i].DisplayNo;
                header.fieldName = data[i].FieldName;
                header.columnText = data[i].NewText;
                header.columnWidth = data[i].ColumnWidth;
                header.ActualColumnWidth = data[i].ColumnWidth;
                header.LineIndex = data[i].LineIndex;
                header.LineIndex = (header.LineIndex != null && header.LineIndex != undefined && header.LineIndex != "") ? header.LineIndex : 0;
                //LineIndex
                /* 0
                 * 0
                 * 0
                 * 0
                 * 1
                 * 1
                 *
                if(data[i].LineIndex != dLineIndex){
                    arrTotalWidth[dLineIndex] = totalWidth;
                    dLineIndex = data[i].LineIndex;
                    totalWidth = header.columnWidth;
                    //dLineIndex =
                }else{
                    totalWidth += header.columnWidth;
                    //dLineIndex =
                }
                 
                if(data[i].MultiLine == true){
                    totalWidth = 100;   
                }else{
                    totalWidth += header.columnWidth;//data[i].ColumnWidth;
                }
                /******/
                if (header.LineIndex == 0 || header.LineIndex == 1) {
                    totalWidth += header.columnWidth;
                }
                header.colnWidth = header.columnWidth;
                header.ColumnUnit = '%';//data[i].ColumnUnit;
                header.bgColor = argbToRGB(data[i].HBackColor);
                header.HForeColor = argbToRGB(data[i].HForeColor);
                header.HBackColor = argbToRGB(data[i].HBackColor);
                header.rowTextColor = argbToRGB(data[i].RForeColor);
                header.rowBgColor = argbToRGB(data[i].RBackColor);
                //header.bgColor = data[i].HBackColorName;
                //header.HForeColor = data[i].HForeColorName;
                //header.HBackColor = data[i].HBackColorName;
                //header.rowTextColor = data[i].RForeColorName;
                //header.rowBgColorName = data[i].RBackColorName;
                //header.rowARForeColorName = data[i].ARForeColorName;
                //header.rowARBackColorName = data[i].ARBackColorName;
                header.fontName = data[i].RFont;
                //header.fontSize =  (Titanium.Platform.displayCaps.density == 'high ? parseInt(pHeight*0.025) : parseInt(pHeight*0.02);//data[i].RFontSize;
                //header.fontSize =  parseInt(data[i].RFontSize * Ti.App.dHeightRatio);

                //header.fontSize = parseInt(data[i].RFontSize * dFontHeightRatio);
                header.fontSize = parseInt(data[i].RFontSize);
                header.fontStyle = data[i].RFontStyle;
                header.allignment = data[i].Alignment;
                //header.rowHeight = (Titanium.Platform.displayCaps.density == 'high ? parseInt(pHeight*0.065) : parseInt(pHeight*0.06);//data[i].RowHeight;

                //header.rowHeight = parseInt(data[i].RowHeight * Ti.App.dHeightRatio);
                header.rowHeight = parseInt(data[i].RowHeight);
                header.fieldControl = ('' + data[i].FieldControl).toUpperCase();
                //header.isSearch = data[i].IsSearch;
                //header.searchType = data[i].SearchType;
                header.DataMember = data[i].DataMember;
                header.DataMemberType = data[i].DataMemberType;
                header.Header = data[i].Header;
                header.Header = (header.Header != null && header.Header != undefined && header.Header != "") ? header.Header : "";
                try {
                    header.showBorder = COMMON.CheckDecimal(data[i].ShowBorder);
                } catch (e) {
                    header.showBorder = 0;
                }
                try {
                    if (header.showBorder == 1) {
                        header.borderColor = this.argbToRGB(data[i].BorderColor);
                        header.borderColor = (header.borderColor == null || header.borderColor == undefined || header.borderColor == '') ? '#3b3b3b' : header.borderColor;
                    } else {
                        header.borderColor = 'transparent';
                    }
                } catch (e) {
                    header.borderColor = 'transparent';
                }
                headerList.push(header);
                headerList.totalWidth = 100;


                ////



                listdata = {};
                listdata.FieldControl = data[i].FieldControl;
                listdata.DataMember = data[i].DataMember;
                arrList.push(formdata);

                FieldNameArrayList.push(data[i].DataMember);
                New1TextArrayList.push(data[i].NewText);

                var displayNo = data[i].DisplayNo.toString().split('.');
                if (displayNo.length == 2 && (data[i].NewText.replace("\t", "").toLowerCase() == 'view' || data[i].NewText.replace("\t", "").toLowerCase() == 'edit' || data[i].NewText.replace("\t", "").toLowerCase() == 'delete')) {
                    NewTextBtnArrayList.push(data[i].NewText.replace("\t", ""));
                    HForeColorActionList.push(data[i].HForeColor);
                    HBackColorActionList.push(data[i].HBackColor);
                }
                FieldControlList.push(data[i].FieldControl);
                // var widthPixel = ($(window).width() / 100) * data[i].ColumnWidth;
                var widthPixel = (1105.61 / 100) * data[i].ColumnWidth;
                ColumnWidthList.push(widthPixel + "px");
                // ColumnWidthList.push(data[i].ColumnWidth + "%");

                widthPixel = (1105.61 / 100) * 5;
                DeleteCheckBoxColumnWidthList.push(widthPixel + "px");

                var widthPixel1 = ($(window).width() / 83.5) * 100;
                var widthPercent2 = (widthPixel1 / $(window).width()) * 100;
                var widthPercent = (widthPixel / $(window).width()) * 100;

                ColumnWidth.push(widthPixel);
                // ColumnWidth.push(data[i].ColumnWidth);
                HFontSizeList.push(data[i].HFontSize + "px");
                RFontSizeList.push(data[i].RFontSize + "px");
                HForeColorList.push(argbToRGB(data[i].HForeColor));
                HBackColorList.push(argbToRGB(data[i].HBackColor));
                RForeColorList.push(argbToRGB(data[i].RForeColor));
                RBackColorList.push(argbToRGB(data[i].RBackColor));
                ARForeColorList.push(argbToRGB(data[i].ARForeColor));
                ARBackColorList.push(argbToRGB(data[i].ARBackColor));
                HFontList.push(data[i].HFont);
                HFontStyle.push(data[i].HFontStyle);
                RFontList.push(data[i].RFont);
                RFontStyle.push(data[i].RFontStyle);
                AlignmentList.push(data[i].Alignment);
                IsHiddenList.push(data[i].IsHidden);


                ///
                if (i == 0 && data[i].NewText.replace("\t", "").toLowerCase() == "create new") {
                    if (isListLookUpClicked != true) {
                        htm += '<th  style="width:' + DeleteCheckBoxColumnWidthList[i] + ';text-align:center;background-color:' + HBackColorList[i] + ';">';
                        //htm += '<input type="checkbox" id="checkAll" />';
                        htm += '<button  id="delete" class="btn"><i class="fa fa-trash"></i></button>';
                        htm += '</th>';
                    }
                    searchhtml += '<td  style="width:' + DeleteCheckBoxColumnWidthList[i] + '; ">';
                    //  searchhtml += '<button class="btn"><i class="fa fa-close"></i></button>';
                    searchhtml += '<input type="checkbox" id="checkAll" />';
                    searchhtml += '</td>';
                    headerCount++;
                }
                ///

                if (isBtnFormPopUpTable == false || data[i].NewText.replace("\t", "").toLowerCase() != 'action') {
                    if (data[i].NewText.replace("\t", "").toLowerCase() != 'action') {

                        if (data[i].IsHidden != 1 && data[i].ColumnWidth != 0 && data[i].DataMember.replace("\t", "").toLowerCase() != 'createbtn') {
                            HeaderFieldNameArrayList.push(data[i].DataMember);
                            headerCount++;
                            htm += '<th  style="width:' + ColumnWidthList[i] + '; font-size:' + HFontSizeList[i] + ';background-color:' + HBackColorList[i] + ';color:' + HForeColorList[i] + ';font-family: ' + HFontList[i] + ';text-align:' + getAlignStyle(AlignmentList[i]) + ';">';
                            htm += data[i].NewText;
                            htm += '</th>';

                            if (data[i].NewText.replace("\t", "").toLowerCase() != 'action' && data[i].FieldControl.replace("\t", "").toLowerCase() != 'button' && data[i].FieldControl.replace("\t", "").toLowerCase() != 'option') {
                                searchhtml += '<td  style="width:' + ColumnWidthList[i] + ';font-family: ' + RFontList[i] + ';font-size:' + RFontSizeList[i] + ';color: ' + RForeColorList[i] + ' ;background-color:' + RBackColorList[i] + '; text-align:' + getAlignStyle(AlignmentList[i]) + ';">';
                                searchhtml += '<input type="text" id="S_' + data[i].DataMember + '"onkeyup="GetSearchDataList(\'' + rowUrl + '\', \'' + ttbody + '\', \'' + tfoot + '\', \'' + scrName + '\', \'' + 1 + '\',\'' + data[i].DataMember + '\');" onblur="GetSearchDataList(\'' + rowUrl + '\', \'' + ttbody + '\', \'' + tfoot + '\', \'' + scrName + '\', \'' + 1 + '\',\'' + data[i].DataMember + '\');"  placeholder="Search ' + data[i].NewText + '" value="" >';
                                searchhtml += '</td>';
                            }
                            else {
                                searchhtml += '<td  style="width:' + ColumnWidthList[i] + ';font-family: ' + RFontList[i] + ';font-size:' + RFontSizeList[i] + ';color: ' + RForeColorList[i] + ' ;background-color:' + RBackColorList[i] + '; text-align:' + getAlignStyle(AlignmentList[i]) + ';">';
                                searchhtml += '</td>';
                            }


                            //if (totalColumnWidth <= 100) {
                            //    totalColumnWidth = totalColumnWidth + ColumnWidth[i];
                            //    totalcolspan = (totalColumnWidth > 100) ? totalcolspan : totalcolspan + 1;
                            //}
                            if (totalColumnWidth <= 1105.61) {
                                totalColumnWidth = totalColumnWidth + ColumnWidth[i];
                                totalcolspan = (totalColumnWidth > 1105.61) ? totalcolspan : totalcolspan + 1;
                            }

                        }
                        else if (data[i].DataMember.replace("\t", "").toLowerCase() == 'createbtn') {
                            var htmlButton = '';
                            htmlButton += '<input type="button" value="' + New1TextArrayList[i] + '" onclick="NewCreateForm(\'' + data[i].DataMember.replace("\t", "") + '\');" class="btn btn-primary btn-lg"  style="float:left;border-radius: 0px; font-family: Times New Roman; background-color: #428bca; width:' + ColumnWidthList[i] + ';height:30px;" />';
                            $("#createButtonDivId").append(htmlButton);

                        }
                        else if (data[i].ColumnWidth == 0) {
                            HeaderFieldNameArrayList.push(data[i].DataMember);
                        }
                    }
                }
            }
            searchhtml += '</tr>';
            htm += '</tr>';
            $("#" + theadId).append(htm);
            // $("#" + theadId).append(searchhtml);

            _objArray.arrList = arrList;
            ListHeaderList['ListConfig_' + screenName] = headerList;
            ///formFieldIdList["FormConfig_" + tempScreenName] = formDataList;

            GetRowData(rowUrl, ttbody, tfoot, scrName, 1, '');
        }

    });
}

var totalColumnWidth = 0;
var totalcolspan = 0;

function ShowListView11(data) {
    if (data != "") {
        data = $.parseJSON(data);
        $("#" + ttbody).empty();
        $('#' + tfoot).empty();
        if (data != "") {
            $("#" + ttbody).empty();
            if (data != null) {

                var htm = '';
                var createHtml = '';

                for (var i = 0; i < data.length; i++) {
                    //htm += '<tr  class="tablecell" onclick="RowClickFunction(this,' + (i + 1) + ',\'' + NewTextBtnArrayList[k] + '\')">';
                    htm += '<tr  class="tablecell" >';

                    for (var j = 0; j < FieldNameArrayList.length; j++) {
                        if (IsHiddenList[j] != 1 && ColumnWidthList[j] != "0px" && (isBtnFormPopUpTable == false || FieldNameArrayList[j].replace("\t", "").toLowerCase() != 'action')) {

                            var colName = FieldNameArrayList[j].replace("\t", "");
                            var fieldControl = FieldControlList[j].replace("\t", "");

                            var fontWeight = getFontStyle(RFontStyle[j]);
                            fontWeight = fontWeight.replace("_", "-");
                            fontWeight = fontWeight.replace("normal", ":normal");
                            fontWeight = fontWeight.replace("bold", ":bold");


                            ///
                            if (isListLookUpClicked != true) {
                                if (j == 5 && FieldNameArrayList[0].replace("\t", "") == "CreateBtn") {
                                    htm += '<td  style="width:' + DeleteCheckBoxColumnWidthList[j] + ';text-align:center;background-color:' + RBackColorList[j] + ';">';
                                    htm += '<input type="checkbox" class="checkBox"  value="' + data[i][colName] + '" />';
                                    htm += '</td>';
                                }
                            }
                            ///

                            if (fieldControl.toLowerCase() == "label") {
                                htm += '<td  style="width:' + ColumnWidthList[j] + ';font-family: ' + RFontList[j] + ';font-size:' + RFontSizeList[j] + ';color: ' + RForeColorList[j] + ' ;background-color:' + RBackColorList[j] + '; text-align:' + getAlignStyle(AlignmentList[j]) + ';' + fontWeight + '">';
                                htm += data[i][colName];
                                htm += '</td>';
                            }
                            if (fieldControl.toLowerCase() == "combobox") {
                                if (i == 0)
                                    DropDownIdList.push(colName + "_" + data.length);
                                htm += '<td  style="width:' + ColumnWidthList[j] + ';font-family: ' + RFontList[j] + ';font-size:' + RFontSizeList[j] + ';color: ' + RForeColorList[j] + ' ;background-color:' + RBackColorList[j] + '; text-align:' + getAlignStyle(AlignmentList[j]) + ';' + fontWeight + '">';
                                htm += '<select id="' + colName + "_" + i + '" onchange="DropDownOnchangeFunction(\'' + data[i][colName] + '\');"  >';
                                htm += '</select>';
                                htm += '</td>';
                            }
                            else if (fieldControl.toLowerCase() == "option") {
                                htm += '<td style="width:' + ColumnWidthList[j] + ';font-family: ' + RFontList[j] + ';font-size:' + RFontSizeList[j] + ';color: ' + RForeColorList[j] + ' ;background-color:' + RBackColorList[j] + '; text-align:' + getAlignStyle(AlignmentList[j]) + ';' + fontWeight + '">';
                                if (data[i][colName] == true)
                                    htm += '<input type="checkbox" checked disabled>';
                                else
                                    htm += '<input type="checkbox" disabled>';
                                htm += '</td>';
                            }
                            else if (fieldControl.toLowerCase() == "button") {
                                if (colName.toLowerCase() == 'action') {
                                    //   htm += '<td  style="width:' + ColumnWidthList[j] + ';font-family: ' + RFontList[j] + ';font-size:' + RFontSizeList[j] + ';color: ' + RForeColorList[j] + ' ;background-color:' + RBackColorList[j] + '; text-align:' + getAlignStyle(AlignmentList[j]) + ';' + fontWeight + '">';
                                    for (var k = 0; k < NewTextBtnArrayList.length; k++) {
                                        //   htm += '<input type="button" onclick="ActionButtonClick(' + (i + 1) + ',\'' + NewTextBtnArrayList[k] + '\');" value="' + NewTextBtnArrayList[k] + '" style="color: ' + argbToRGB(HForeColorActionList[k]) + ' ;background-color:' + argbToRGB(HBackColorActionList[k]) + ';" />';
                                    }
                                    // htm += '</td>';
                                }
                            }
                            else if (fieldControl.toLowerCase() == "text") {
                                htm += '<td  style="width:' + ColumnWidthList[j] + ';font-family: ' + RFontList[j] + ';font-size:' + RFontSizeList[j] + ';color: ' + RForeColorList[j] + ' ;background-color:' + RBackColorList[j] + '; text-align:' + getAlignStyle(AlignmentList[j]) + ';' + fontWeight + '">';
                                htm += '<input type="text" value="' + data[i][colName] + '" >';
                                htm += '</td>';
                            }

                        }
                        else if (ColumnWidthList[j] == "0px") {
                            htm += '<td  style="display:none">';
                            htm += '<input type="hidden" value="' + data[i][colName] + '" >';
                            htm += '</td>';
                        }
                    }
                    htm += '</tr>';
                }

                $("#" + ttbody).append(htm);
                $("#FormDivCreateId").append(createHtml);

                ///////////////
                $('#' + tfoot).empty();
                //  $('#ListfootDivId').empty();
                if (data[0].TotalCount > 1) {
                    var html = '';
                    html += '<tr>';
                    html += '<td height="50" colspan="' + headerCount + '">';
                    html += '<ul class="pagination pull-center" style="margin: 0px 0;">';

                    if (pageNumber > 1) {
                        html += '<li style="background-color: #cccccc;" class="paginate_button"><a style="background-color:#cccccc;" href="#" onclick="GetRowData(\'' + rowUrl + '\',\'' + ttbody + '\',\'' + tfoot + '\',\'' + scrName + '\',' + 1 + ',\'' + SearchId + '\')" aria-controls="example" data-dt-idx="2" tabindex="0"><<</a></li>';
                        html += '<li style="background-color: #cccccc;" class="paginate_button"><a style="background-color:#cccccc;" href="#" onclick="GetRowData(\'' + rowUrl + '\',\'' + ttbody + '\',\'' + tfoot + '\',\'' + scrName + '\',' + (pageNumber - 1) + ',\'' + SearchId + '\')" aria-controls="example" data-dt-idx="2" tabindex="0"> Previous</a></li>';
                    }
                    var dotCount = 0;
                    var pageNumberCount = (pageNumber >= (data[0].TotalCount - 5) ? (data[0].TotalCount - 5) - 1 : pageNumber == 1 ? pageNumber : pageNumber - 1);
                    pageNumberCount = pageNumber >= (data[0].TotalCount - 4) ? (data[0].TotalCount - 5) : pageNumberCount;
                    var isDotShow = pageNumber >= (data[0].TotalCount - 4) ? false : true;
                    pageNumberCount = pageNumberCount <= 0 ? pageNumber : pageNumberCount;
                    for (var pagenum = pageNumberCount ; pagenum <= data[0].TotalCount; pagenum++) {
                        dotCount++;
                        html += '<li style="background-color: #cccccc;" class="paginate_button"><a id="pagination_' + pagenum + '" style="background-color:#cccccc;" href="#" onclick="GetRowData(\'' + rowUrl + '\',\'' + ttbody + '\',\'' + tfoot + '\',\'' + scrName + '\',' + pagenum + ',\'' + SearchId + '\')" aria-controls="example" data-dt-idx="2" tabindex="0"> ' + pagenum + '</a></li>';
                        if (dotCount == 3 & isDotShow) {
                            html += '<li style="background-color: #cccccc;" class="paginate_button"><a style="background-color:#cccccc;" href="#"  aria-controls="example" data-dt-idx="2" tabindex="0"> ...</a></li>';
                            pagenum = data[0].TotalCount - dotCount;
                        }
                    }
                    if (data[0].TotalCount > pageNumber) {
                        html += '<li style="background-color: #cccccc;" class="paginate_button"><a style="background-color:#cccccc;" href="#" onclick="GetRowData(\'' + rowUrl + '\',\'' + ttbody + '\',\'' + tfoot + '\',\'' + scrName + '\',' + (pageNumber + 1) + ',\'' + SearchId + '\')" aria-controls="example" data-dt-idx="2" tabindex="0"> Next</a></li>';
                        html += '<li style="background-color: #cccccc;" class="paginate_button"><a style="background-color:#cccccc;" href="#" onclick="GetRowData(\'' + rowUrl + '\',\'' + ttbody + '\',\'' + tfoot + '\',\'' + scrName + '\',' + data[0].TotalCount + ',\'' + SearchId + '\')" aria-controls="example" data-dt-idx="2" tabindex="0">>></a></li>';
                    }

                    html += '</ul>';
                    html += '</td>';
                    html += '</tr>';

                    $('#' + tfoot).append(html);
                    // $('#ListfootDivId').append(html);

                    $('#pagination_' + pageNumber).css("background", "linear-gradient(45deg, #fbac7f, #e5658a)");
                    $('#pagination_' + pageNumber).css("color", "red");
                }


                ////////////
                // if (isBtnFormPopUpTable == true)
                //tabledblclickfunction();
                tableclickfunction1();

                if (DropDownIdList.length > 0) {
                    GetListDropDownListValue(FieldName);
                    DropDownIdList = [];
                }

            }
        }
    }
}

function GetRowData11(rowUrl, ttbody, tfoot, scrName, pageNumber, SearchId) {
    // if (isListLookUpClicked != true)

    //if (isListLookUpClicked == true)
    //    scrName = scrName;
    //    // scrName = TabScreenName == '' ? screenName : screenName + "_" + TabScreenName;
    //else if (isFormListView == true)
    //    scrName = scrName;
    //else
    //    scrName = screenName;

    //var searchOption = SearchId != '' ? $('#S_' + SearchId).val() != '' ? " where " + SearchId + " like '%" + $('#S_' + SearchId).val() + "%'" : '' : '';
    var searchOption = SearchId != '' ? $('#Search_' + screenName + '_' + SearchId).val() != '' && SearchId != "0" ? " where " + SearchId + " like '%" + $('#Search_' + screenName + '_' + SearchId).val() + "%'" : '' : '';
    if (SearchId.toLowerCase() == 'print')
        searchOption = SearchId != '' ? $('#Search_' + screenName + '_' + SearchId).val() != '' ? " where [" + SearchId + "] like '%" + $('#Search_' + screenName + '_' + screenName + '_' + SearchId).val() + "%'" : '' : '';
    else if (isDatePicker == true) {
        if ($('#Search_' + screenName + '_' + SearchId).val() != "") {
            //  var date = DateFormateChange($('#Search_' + SearchId).val());
            searchOption = SearchId != '' ? $('#Search_' + screenName + '_' + SearchId).val() != '' ? " where " + SearchId + " = '" + DateFormateChange($('#Search_' + screenName + '_' + SearchId).val()) + "'" : '' : '';
        }
        else return;
    }
    $.ajax({
        type: 'POST',
        url: rowUrl,
        //  data: { ScreenName: screenName },
        data: { data: JSON.stringify(dataFieldIdList), ScreenName: scrName, pageNumber: pageNumber, searchOption: searchOption, id: _lookUpId.split('_')[0] },
        async: false,
        success: function (data) {
            if (data != "") {
                data = $.parseJSON(data);
                $("#" + ttbody).empty();
                $('#' + tfoot).empty();
                if (data != "") {
                    $("#" + ttbody).empty();
                    if (data != null) {

                        var htm = '';
                        var createHtml = '';

                        ////Todo-InlineEdit
                        //htm += '<tr  class="tablecell"  id="FormDivCreateId" style="display: none"  >';
                        ////
                        //// htm += '<div id="FormDivCreateId" ></div>';
                        ////
                        //htm += '</tr>';
                        ////
                        for (var i = 0; i < data.length; i++) {

                            //htm += '<tr  class="tablecell" onclick="RowClickFunction(this,' + (i + 1) + ',\'' + NewTextBtnArrayList[k] + '\')">';
                            htm += '<tr  class="tablecell" >';

                            for (var j = 0; j < FieldNameArrayList.length; j++) {
                                if (IsHiddenList[j] != 1 && ColumnWidthList[j] != "0px" && (isBtnFormPopUpTable == false || FieldNameArrayList[j].replace("\t", "").toLowerCase() != 'action')) {

                                    var colName = FieldNameArrayList[j].replace("\t", "");
                                    var fieldControl = FieldControlList[j].replace("\t", "");

                                    var fontWeight = getFontStyle(RFontStyle[j]);
                                    fontWeight = fontWeight.replace("_", "-");
                                    fontWeight = fontWeight.replace("normal", ":normal");
                                    fontWeight = fontWeight.replace("bold", ":bold");


                                    ///
                                    if (isListLookUpClicked != true) {
                                        if (j == 5 && FieldNameArrayList[0].replace("\t", "") == "CreateBtn") {
                                            htm += '<td  style="width:' + DeleteCheckBoxColumnWidthList[j] + ';text-align:center;background-color:' + RBackColorList[j] + ';">';
                                            htm += '<input type="checkbox" class="checkBox"  value="' + data[i][colName] + '" />';
                                            htm += '</td>';
                                        }
                                    }
                                    ///

                                    if (fieldControl.toLowerCase() == "label") {
                                        htm += '<td  style="width:' + ColumnWidthList[j] + ';font-family: ' + RFontList[j] + ';font-size:' + RFontSizeList[j] + ';color: ' + RForeColorList[j] + ' ;background-color:' + RBackColorList[j] + '; text-align:' + getAlignStyle(AlignmentList[j]) + ';' + fontWeight + '">';
                                        htm += data[i][colName];
                                        htm += '</td>';
                                    }
                                    if (fieldControl.toLowerCase() == "combobox") {
                                        if (i == 0)
                                            DropDownIdList.push(colName + "_" + data.length);
                                        htm += '<td  style="width:' + ColumnWidthList[j] + ';font-family: ' + RFontList[j] + ';font-size:' + RFontSizeList[j] + ';color: ' + RForeColorList[j] + ' ;background-color:' + RBackColorList[j] + '; text-align:' + getAlignStyle(AlignmentList[j]) + ';' + fontWeight + '">';
                                        htm += '<select id="' + colName + "_" + i + '" onchange="DropDownOnchangeFunction(\'' + data[i][colName] + '\');"  >';
                                        htm += '</select>';
                                        htm += '</td>';
                                    }
                                    else if (fieldControl.toLowerCase() == "option") {
                                        htm += '<td style="width:' + ColumnWidthList[j] + ';font-family: ' + RFontList[j] + ';font-size:' + RFontSizeList[j] + ';color: ' + RForeColorList[j] + ' ;background-color:' + RBackColorList[j] + '; text-align:' + getAlignStyle(AlignmentList[j]) + ';' + fontWeight + '">';
                                        if (data[i][colName] == true)
                                            htm += '<input type="checkbox" checked disabled>';
                                        else
                                            htm += '<input type="checkbox" disabled>';
                                        htm += '</td>';
                                    }
                                    else if (fieldControl.toLowerCase() == "button") {
                                        if (colName.toLowerCase() == 'action') {
                                            //   htm += '<td  style="width:' + ColumnWidthList[j] + ';font-family: ' + RFontList[j] + ';font-size:' + RFontSizeList[j] + ';color: ' + RForeColorList[j] + ' ;background-color:' + RBackColorList[j] + '; text-align:' + getAlignStyle(AlignmentList[j]) + ';' + fontWeight + '">';
                                            for (var k = 0; k < NewTextBtnArrayList.length; k++) {
                                                //   htm += '<input type="button" onclick="ActionButtonClick(' + (i + 1) + ',\'' + NewTextBtnArrayList[k] + '\');" value="' + NewTextBtnArrayList[k] + '" style="color: ' + argbToRGB(HForeColorActionList[k]) + ' ;background-color:' + argbToRGB(HBackColorActionList[k]) + ';" />';
                                            }
                                            // htm += '</td>';
                                        }
                                    }
                                    else if (fieldControl.toLowerCase() == "text") {
                                        htm += '<td  style="width:' + ColumnWidthList[j] + ';font-family: ' + RFontList[j] + ';font-size:' + RFontSizeList[j] + ';color: ' + RForeColorList[j] + ' ;background-color:' + RBackColorList[j] + '; text-align:' + getAlignStyle(AlignmentList[j]) + ';' + fontWeight + '">';
                                        htm += '<input type="text" value="' + data[i][colName] + '" >';
                                        htm += '</td>';
                                    }

                                }
                                else if (ColumnWidthList[j] == "0px") {
                                    htm += '<td  style="display:none">';
                                    htm += '<input type="hidden" value="' + data[i][colName] + '" >';
                                    htm += '</td>';
                                }
                            }
                            htm += '</tr>';

                            ////Todo-InlineEdit
                            //htm += '<tr id="rowFormDiv_' + i + '"  style="display: none">';
                            //// htm += '<tr id="aaa1_' + i + '"  style="display: none">';
                            //htm += '<td colspan="' + totalcolspan + '">';
                            //htm += '<div id="tabMenuId_' + i + '"></div>';
                            ////   htm += '<div class="formContainer">';
                            //htm += '<div class="formContainer">';
                            //htm += '<div id="FormDivId_' + i + '"></div>';
                            //htm += '<div id="buttonDivId_' + i + '" style="text-align: right"></div>';
                            ////    htm += '</div>';
                            //htm += '</div>';
                            //htm += '</td>';
                            //htm += '</tr>';

                            //if (i == 0) {
                            //    //   createHtml += '<tr id="rowFormDivCreateId_' + i + '"  style="display: none">';
                            //    createHtml += '<td colspan="' + totalcolspan + '">';
                            //    createHtml += '<div id="tabMenuId"></div>';
                            //    createHtml += '<div class="formContainer">';
                            //    createHtml += '<div id="FormDivId"></div>';
                            //    createHtml += '<div id="buttonDivId" style="text-align: right"></div>';
                            //    createHtml += '</div>';
                            //    createHtml += '</td>';
                            //    // createHtml += '</tr>';

                            //}
                            ////
                        }

                        $("#" + ttbody).append(htm);
                        $("#FormDivCreateId").append(createHtml);

                        ///////////////
                        $('#' + tfoot).empty();
                        //  $('#ListfootDivId').empty();
                        if (data[0].TotalCount > 1) {
                            var html = '';
                            html += '<tr>';
                            html += '<td height="50" colspan="' + headerCount + '">';
                            html += '<ul class="pagination pull-center" style="margin: 0px 0;">';

                            if (pageNumber > 1) {
                                html += '<li style="background-color: #cccccc;" class="paginate_button"><a style="background-color:#cccccc;" href="#" onclick="GetRowData(\'' + rowUrl + '\',\'' + ttbody + '\',\'' + tfoot + '\',\'' + scrName + '\',' + 1 + ',\'' + SearchId + '\')" aria-controls="example" data-dt-idx="2" tabindex="0"><<</a></li>';
                                html += '<li style="background-color: #cccccc;" class="paginate_button"><a style="background-color:#cccccc;" href="#" onclick="GetRowData(\'' + rowUrl + '\',\'' + ttbody + '\',\'' + tfoot + '\',\'' + scrName + '\',' + (pageNumber - 1) + ',\'' + SearchId + '\')" aria-controls="example" data-dt-idx="2" tabindex="0"> Previous</a></li>';
                            }
                            var dotCount = 0;
                            var pageNumberCount = (pageNumber >= (data[0].TotalCount - 5) ? (data[0].TotalCount - 5) - 1 : pageNumber == 1 ? pageNumber : pageNumber - 1);
                            pageNumberCount = pageNumber >= (data[0].TotalCount - 4) ? (data[0].TotalCount - 5) : pageNumberCount;
                            var isDotShow = pageNumber >= (data[0].TotalCount - 4) ? false : true;
                            pageNumberCount = pageNumberCount <= 0 ? pageNumber : pageNumberCount;
                            for (var pagenum = pageNumberCount ; pagenum <= data[0].TotalCount; pagenum++) {
                                dotCount++;
                                html += '<li style="background-color: #cccccc;" class="paginate_button"><a id="pagination_' + pagenum + '" style="background-color:#cccccc;" href="#" onclick="GetRowData(\'' + rowUrl + '\',\'' + ttbody + '\',\'' + tfoot + '\',\'' + scrName + '\',' + pagenum + ',\'' + SearchId + '\')" aria-controls="example" data-dt-idx="2" tabindex="0"> ' + pagenum + '</a></li>';
                                if (dotCount == 3 & isDotShow) {
                                    html += '<li style="background-color: #cccccc;" class="paginate_button"><a style="background-color:#cccccc;" href="#"  aria-controls="example" data-dt-idx="2" tabindex="0"> ...</a></li>';
                                    pagenum = data[0].TotalCount - dotCount;
                                }
                            }
                            if (data[0].TotalCount > pageNumber) {
                                html += '<li style="background-color: #cccccc;" class="paginate_button"><a style="background-color:#cccccc;" href="#" onclick="GetRowData(\'' + rowUrl + '\',\'' + ttbody + '\',\'' + tfoot + '\',\'' + scrName + '\',' + (pageNumber + 1) + ',\'' + SearchId + '\')" aria-controls="example" data-dt-idx="2" tabindex="0"> Next</a></li>';
                                html += '<li style="background-color: #cccccc;" class="paginate_button"><a style="background-color:#cccccc;" href="#" onclick="GetRowData(\'' + rowUrl + '\',\'' + ttbody + '\',\'' + tfoot + '\',\'' + scrName + '\',' + data[0].TotalCount + ',\'' + SearchId + '\')" aria-controls="example" data-dt-idx="2" tabindex="0">>></a></li>';
                            }

                            html += '</ul>';
                            html += '</td>';
                            html += '</tr>';

                            $('#' + tfoot).append(html);
                            // $('#ListfootDivId').append(html);

                            $('#pagination_' + pageNumber).css("background", "linear-gradient(45deg, #fbac7f, #e5658a)");
                            $('#pagination_' + pageNumber).css("color", "red");
                        }


                        ////////////
                        // if (isBtnFormPopUpTable == true)
                        //tabledblclickfunction();
                        //tableclickfunction1();

                        if (DropDownIdList.length > 0) {
                            GetListDropDownListValue();
                            DropDownIdList = [];
                        }

                    }
                }
            }

        }

        ///

        ///
    });


}
//GetListDropDownListValue(scrName, FieldName, ttbody, addCount);
function GetListDropDownListValue(screenName, FieldName, ttbody, index) {
    //var cnt = 0;
    //if (screenName != "AssetForm")
    // var cnt = DropDownIdList[0].split('_')[1];
    var id = "";

    for (var i = 0; i < DropDownIdList.length; i++) {
        //if (screenName == "Customers") {
        //    TabScreenName = "General";
        //    if (i == 1)
        //        TabScreenName = "Invoicing";
        //}
        //var scrName = TabScreenName == '' ? screenName : screenName + "_" + TabScreenName;
        //var scrName = screenName;

        id = DropDownIdList[i].DataMember;
        // setListValue('', id, i, ttbody);
        setListValue('', id, index, ttbody);

        //var qry = "select QueryText + ' ' + GroupText + ' ' + OrderText from Queryconfig where screenname ='" + screenName + "_LIST_COMBOBOX_" + id + "'";
        //qry = formatQueryString(qry, screenName);
        //execute(qry);

        var mScreenName = screenName + "_LIST_COMBOBOX_" + id;
        console.log(mScreenName);

        var qry1 = getString['QueryConfig_' + mScreenName];
        qry1 += ' ' + getString['QueryConfig_' + mScreenName + '_GroupText'];
        qry1 += ' ' + getString['QueryConfig_' + mScreenName + '_OrderText'];
        //var qry1 = executeQry.length == 0 ? '' : executeQry[0].Column1;

        if (qry1 == "undefined undefined undefined")
            qry1 = GetQueryConfigvalue(mScreenName);
        qry1 = formatQueryString(qry1, screenName);

        execute(qry1);

        var data = executeQry;

        // PageLoadinginfo_ALT(" UOM related Query :- " + sqry);

        //// COMMENTED 24.03.2021 ==================================================================
        //// LOG FOR UOM NOT BINDING PROBLEM 
        //if (data == null || data == '' || data == 'undefined')
        //{
        if (id.toUpperCase() == "UOM") {
            sqry = qry1;
            PageLoadinginfo_ALT_UOM(" UOM related Query :- " + sqry, "uom");
            //alert(qry1);
        }

        // }
        //// COMMENTED 24.03.2021 ==================================================================
        ////alert(qry1);
        if (currentScreenName == "ItemMasterLabelPrintingForm" && ProjectName == "SELASIHAMAN") {
            if (data != null) {
              
                var tmp_ttbodyid = document.getElementById("ListBodyDivId_ItemMasterLabelPrintingForm_LstIMLB");
                var n = index;
               // for (var n = 0; n < tmp_ttbodyid.rows.length; n++) {
                    try {
                       
                        var valueText = '';
                        var data1 = data;
                        data1 = data1.filter(x => x.ItemNo === tmp_ttbodyid.rows[n].cells[2].innerHTML);
                        valueText += '<option selected="selected" disabled="true">--Select--</option>';

                        for (var j = 0; j <= data1.length - 1; j++) {
                            var obj = data1[j];

                            
                                valueText += "<option value='" + obj["Code"] + "'>" + obj["Text"] + "</option>";


                        }

                        tmp_ttbodyid.rows[n].cells.namedItem(id).childNodes['0'].innerHTML = valueText;
                    } catch (err) {

                    }


                //}
            }
        }
        else {
            if (data != null) {
                var tmpIndex = 0;
                var select = $('#' + ttbody + ' tr').find("select");
                //if (select[index] != undefined && id == select[index].id) {
                for (var n = 0; n < select.length; n++) {
                    if (select[n] != undefined && id == select[n].id) {
                        var valueText = '';

                        //for (var j = 0; j < data.length; j++)
                        //    $('#' + select[n].id).append(new Option(data[j].Code, data[j].Text));

                        //for (var j = 0; j < data.length; j++)
                        //    valueText += "<option value='" + data[j].Code + "'>" + data[j].Text + "</option>";
                        valueText += '<option selected="selected" disabled="true">--Select--</option>';

                        $.each(data, function (j, data1) {
                            valueText += "<option value='" + data1.Code + "'>" + data1.Text + "</option>";
                        });

                        var tblbody = document.getElementById(ttbody);
                        var lstname = "";
                      //  lstname = ttbody.split("_")[2];

                        
                        try {
                            lstname = ttbody.split("_")[3];
                           if (lstname == undefined)
                                lstname = ttbody.split("_")[2];
                        } catch (e) {
                           lstname = ttbody.split("_")[2];
                        }

                      //  if (ProjectName.toLowerCase() == "frostfood")
                        //    tblbody.rows[index].cells.namedItem(id).childNodes['0'].innerHTML = valueText;
                        //else
                        if (ProjectName == "CPF" && (currentScreenName == "CreditNoteNewForm" || currentScreenName == "CreditNoteForm" || currentScreenName == "GoodsReturnNewForm" || currentScreenName == "GoodsReturnForm" ) && id == "ReasonCode" ) {
                            tblbody.rows["Item" + tmpIndex].cells.namedItem(id).childNodes['0'].innerHTML = valueText;

                            if (DropDownIdValueList.length == 0) {
                                // COMMENTED AUTOMATIC UOM FILLING BASED ITEM SELECTION
                                if (ProjectName.toLowerCase() == "wms") {
                                    if (id != null && id != "" && id.toString().toUpperCase() == "UOM") {
                                        try {
                                            tblbody.rows[tmpIndex].cells.namedItem(id).childNodes['0'].selectedIndex = "0";
                                        }
                                        catch (e) {
                                        }

                                    }
                                    else {
                                      //  tblbody.rows[tmpIndex].cells.namedItem(id).childNodes['0'].selectedIndex = "-1";
                                    }
                                }
                                else {
                                    tblbody.rows[tmpIndex].cells.namedItem(id).childNodes['0'].selectedIndex = "0";
                                }


                            }
                            else {
                                tblbody.rows[tmpIndex].cells.namedItem(id).childNodes['0'].value = DropDownIdValueList[i].Value;
                            }

                            tmpIndex = tmpIndex + 1;
                        }
                        else {
                            try {
                                
                                tblbody.rows[lstname + index].cells.namedItem(id).childNodes['0'].innerHTML = valueText;
                            } catch (e) {

                            }

                            if (DropDownIdValueList.length == 0) {
                                // COMMENTED AUTOMATIC UOM FILLING BASED ITEM SELECTION
                                if (ProjectName.toLowerCase() == "wms") {
                                    if (id != null && id != "" && id.toString().toUpperCase() == "UOM") {
                                        try {
                                            tblbody.rows[index].cells.namedItem(id).childNodes['0'].selectedIndex = "0";
                                        }
                                        catch (e) {
                                        }

                                    }
                                    else {
                                       // tblbody.rows[index].cells.namedItem(id).childNodes['0'].selectedIndex = "-1";
                                    }
                                }
                                else {
                                  //  tblbody.rows[index].cells.namedItem(id).childNodes['0'].selectedIndex = "-1";
                                }


                            }
                            else {
                                tblbody.rows[index].cells.namedItem(id).childNodes['0'].value = DropDownIdValueList[i].Value;
                            }
                        }

                      
                    }
                }
            }
            else {
                //alert(qry1);
            }
        }
    }
    //if (ProjectName == "CPF" && (currentScreenName == "CreditNoteNewForm" || currentScreenName == "CreditNoteForm" || currentScreenName == "GoodsReturnNewForm" || currentScreenName == "GoodsReturnForm") && id == "ReasonCode") 
    //    tblbody.rows[tmpIndex-1].cells.namedItem(id).childNodes['0'].selectedIndex = "-1";
}


function populateListDropDown(data, id, cnt) {
    var valueText = '';
    valueText += '<option selected="selected" disabled="true">--Select--</option>';
    $.each(data, function (i, data) {
        valueText += "<option value=" + data.Code + ">" + data.Text + "</option>";
    });
    for (var i = 0; i < cnt; i++) {
        $('#' + id + "_" + i).empty();
        $(valueText).appendTo('#' + id + "_" + i);
    }
}

//argbToRGB : function(color) {
//    return '#' + ('000000' + (color & 0xFFFFFF).toString(16)).slice(-6);
//}

function argbToRGB(color) {
    return '#' + ('000000' + (color & 0xFFFFFF).toString(16)).slice(-6);
}

var FontStyle = {
    font_stylenormal: 0,
    font_weightbold: 100,
}
var FontStylekeys = Object.keys(FontStyle).sort(function (a, b) {
    return FontStyle[a] - FontStyle[b];
});

function getFontStyle(value) {
    return FontStylekeys[value];
}

var AlignStyle = {
    Center: 0,
    Right: 1,
    Left: 2
}

var keys = Object.keys(AlignStyle).sort(function (a, b) {
    return AlignStyle[a] - AlignStyle[b];
});
function getAlignStyle(value) {
    return keys[value];
}

function tabledblclickfunction() {
    if (isBtnFormPopUpTable == true) {
        $('#popUptable >tbody > tr').dblclick(function (event) {
            isBtnFormPopUpTable == false;

            ///future Remove this code -///
            var textvalue = event.currentTarget.cells[1].innerText;
            var textvalue = $(this).find('td:first').text();
            $('#' + buttonTextId).attr("readonly", true);
            $('#' + buttonTextId).val(textvalue);
            ///

            $('#dialog').dialog('close');

            //if (screenName == "CustomerAgent") {
            //    var status = CustomerAgentIdValidation();
            //    if (status == false) {
            //        $('#' + buttonTextId).val('');
            //        $('#' + lookUpTextId2).val('').attr("disabled", true).css('background-color', 'lightgrey');
            //    }
            //    else
            //        $('#' + lookUpTextId2).val(event.currentTarget.cells[2].innerText).attr("disabled", true).css('background-color', 'lightgrey');
            //}
        });
    }
    else {
        //$('#table >tbody > tr').click(function (event) {
        //    var textvalue = event.currentTarget.cells[1].innerText;
        //    RowItemClicked(textvalue);
        //});
    }
}


function tableclickfunction1() {
    if (isBtnFormPopUpTable == true) {
        $('#popUptable  >tbody > tr').click(function (event) {
            totalItemTableRowCount = $('#FormListTableDiv tr').length;
            isBtnFormPopUpTable == false;
            rowItemClicked(event);

            $('#dialog').dialog('close');
        });

    }
    else {
        $('#table_' + FieldName + ' >tbody > tr').click(function (event) {
            rowItemClicked(event, FieldName);
            //window.location = url_FormView + "?ScreenName=" + FieldName + "&ActionName=rowItemClicked";

        });
    }
}

function RowClickFunction(x, cnt, value) {
    var colLengh = $("table").find("tr:first th").length;
    var textvalue = event.currentTarget.cells[1].innerText;
    lastActionRowClickCount = actionRowClickCount;
    actionRowClickCount = cnt - 1;
    cnt = cnt + 1;

    //GetFormConfig1("FormDivId_" + actionRowClickCount + "", screenName);
    //$('#rowFormDiv_' + lastActionRowClickCount + '').hide();
    //$('#rowFormDiv_' + actionRowClickCount + '').show();

    ///////

    var data = {};
    for (var i = 0; i < HeaderFieldNameArrayList.length; i++) {
        id = HeaderFieldNameArrayList[i];
        textvalue = isListLookUpClicked == true ? event.currentTarget.cells[i].innerText : event.currentTarget.cells[(i + 1)].innerText;
        //textvalue = event.currentTarget.cells[(i + 1)].innerText;
        data[id] = textvalue;
    }

    //////
    //todo now
    RowItemClicked("FormDivId", textvalue, data);
}


function NewCreateForm1(dataMember) {

    ActionConfigEvent("", "", screenName, dataMember, "formButtonClicked");
    isPopUpCreateForm = returnData.split('$')[1] == "FORM" ? false : true;
    if (isPopUpCreateForm == false) {
        //window.location = url_GetCreate + "?screenName=" + screenName;
        taburl = url_GetCreate + "?screenName=" + screenName;
        window.open(taburl, '_blank');
        //window.open(taburl, 'mywindow', 'width=400,height=200')
        //window.open(taburl, 'mywindow', 'width=1400,height=700')
    }
    else if (isPopUpCreateForm == true) {
        GetFormConfig("FormDivId", screenName);
        $('#createPopupDialog').dialog({ title: "" + screenName + " Create Form" }).dialog('open');
        $('#createPopupDialogHiddenId').hide();
        ActionConfigEvent("", "", screenName, "", "formTextboxfocus");
        $("#" + returnData).focus();
    }
}


var deleteId = '';
var actionRowClickCount = 0;
var lastActionRowClickCount = 0;
function ActionButtonClick(cnt, value) {
    if (isEmpty(actionRowClickCount)) {
        //   $('#FormDivCreateId').empty();
        $('#FormDivCreateId').hide();
        $('#tabMenuId').empty();
        $('#FormDivId').empty();
        $('#buttonDivId').empty();
    }

    //  lastActionRowClickCount = actionRowClickCount == "" ? 0 : actionRowClickCount;
    lastActionRowClickCount = actionRowClickCount;
    actionRowClickCount = cnt - 1;
    cnt = cnt + 1;
    var t = document.getElementById('table');
    // jQuery to get the content of row 4, column 1
    var firstColval = $(t.rows[cnt].cells[0]).text();
    var secondColval = $(t.rows[cnt].cells[1]).text();
    isEditButton, isViweButton = false;

    if (value == "Edit") {
        isEditButton = true;
        OpenEditView(value, secondColval)
    }

    else if (value == "View") {
        isViweButton = true;
        OpenEditView(value, secondColval);
    }
    else if (value = "Delete") {
        deleteId = secondColval;
        $('#deleteMessageId').text(" Are you sure want to delete?");
        $('#deletePopupDialog').dialog('open');
    }
}

function OpenEditView(action, secondColval) {
    ////todo-inlineEdit
    //if (actionRowClickCount != lastActionRowClickCount) {
    //    //   $('#rowFormDiv_' + lastActionRowClickCount + '').empty();
    //    $('#tabMenuId_' + lastActionRowClickCount + '').empty();
    //    $('#FormDivId_' + lastActionRowClickCount + '').empty();
    //    $('#buttonDivId_' + lastActionRowClickCount + '').empty();
    //}

    //GetFormConfig1("FormDivId_" + actionRowClickCount + "", screenName);
    //$('#rowFormDiv_' + lastActionRowClickCount + '').hide();
    //$('#rowFormDiv_' + actionRowClickCount + '').show();
    //GetEditForm(secondColval, 'Edit');
    ////

    if (ListConfigLength <= 20 && isPopUpCreateForm == true) {
        // $('#rowFormDiv_0').show();
        //  isPopUpCreateForm = true;
        GetFormConfig("FormDivId", screenName);
        $('#createPopupDialog').dialog({ title: "" + screenName + " " + action + " Form" }).dialog('open');
        $('#createPopupDialogHiddenId').hide();
    }
    else {
        if (action == "Edit")
            window.location = url_GetEdit + "?screenName=" + screenName + "&Id=" + secondColval;
            // window.location = "/Common/GetEdit/?screenName=" + screenName + "&Id=" + secondColval;
        else
            window.location = url_GetDetails + "?screenName=" + screenName + "&Id=" + secondColval;
        // window.location = "/Common/GetDetails/?screenName=" + screenName + "&Id=" + secondColval;

        // window.location = "/Common/GetEdit/?Id=" + secondColval;
    }
    GetEditForm(secondColval, 'Edit');
}



var mustCarryItemData = '';
function AssignFormData1(data) {
    mustCarryItemData = data;
    dataFieldIdList = {};
    if (data != '' && data != null) {
        var formConfig = formFieldIdList["FormConfig_" + currentScreenName];//[0].fieldControl
        for (var j = 0; j < data.length; j++) {
            for (var i = 0; i < formConfig.length; i++) {
                if (formConfig[i].fieldName.toLowerCase() != 'cancelbtn' && formConfig[i].fieldName.toLowerCase() != 'savebtn') {
                    FormView[FieldNameFormArrayList[i]] = data[j][FieldNameFormArrayList[i]];
                    if (formConfig[i].fieldControl.toLowerCase() == 'textbox') {
                        $('#' + FieldNameFormArrayList[i]).val(data[j][FieldNameFormArrayList[i]]);
                    }
                    else if (formConfig[i].fieldControl.toLowerCase() == 'combobox') {
                        DropDownIdList.push(FieldNameFormArrayList[i]);
                        GetDropDownListValue(currentScreenName, "Form");
                        DropDownIdList = [];
                        $('#' + FieldNameFormArrayList[i]).val(data[j][FieldNameFormArrayList[i]]);
                        formComboChange('', FieldNameFormArrayList[i], 0, data[j][FieldNameFormArrayList[i]])
                    }
                    else if (formConfig[i].fieldControl.toLowerCase() == 'datepicker') {
                        $('#' + FieldNameFormArrayList[i]).val(data[j][FieldNameFormArrayList[i]]);
                    }
                    else if (formConfig[i].fieldControl.toLowerCase() == 'option') {
                        if (data[j][FieldNameFormArrayList[i]] == true)
                            $('#' + FieldNameFormArrayList[i]).attr("Checked", true);
                    }
                    else if (formConfig[i].fieldControl.toLowerCase() == 'label')
                        $('#' + FieldNameFormArrayList[i]).val(data[j][FieldNameFormArrayList[i]]);
                    else if (formConfig[i].fieldControl.toLowerCase() == 'radiobutton') {
                        // $('#' + FieldNameFormArrayList[i]).text(data[j][FieldNameFormArrayList[i]]);
                    }
                    else if (formConfig[i].fieldControl.toLowerCase() == 'lookup') {
                        $('#' + FieldNameFormArrayList[i]).val(data[j][FieldNameFormArrayList[i]]);
                    }
                    dataFieldIdList[FieldNameFormArrayList[i]] = data[j][FieldNameFormArrayList[i]];
                }
            }
        }
        if (FormListViewList.length > 0) {
            //  TabScreenName = "Contacts";
            GetFormListViewList();
        }
        var listParameter = objListParameter['ListParameter_' + CurrentScreen_TabScreen_Name + '_' + FieldName];
        //if (currentScreenName == "MustCarryItemForm")
        //    FormListConfigRow1(listParameter.ttbody, listParameter.tfoot, listParameter.scrName, 1, '', listParameter.fieldName, listParameter.actionType);
        //else
        if (listParameter != undefined)
            DynamicFormListConfigRow(listParameter.ttbody, listParameter.tfoot, listParameter.scrName, 1, '', listParameter.fieldName, listParameter.actionType);
        else {
            //for (var i = 0; i < objListParameterFieldName.length; i++) {
            //    FieldName = objListParameterFieldName[i]
            //    var listParameter = objListParameter['ListParameter_' + CurrentScreen_TabScreen_Name + '_' + FieldName];
            //    DynamicFormListConfigRow(listParameter.ttbody, listParameter.tfoot, listParameter.scrName, 1, '', listParameter.fieldName, listParameter.actionType);
            //}
        }
    }
}

function AssetFormAssignFormData(data) {
    dataFieldIdList = {};
    if (data != '' && data != null) {

        var formConfig = formFieldIdList["FormConfig_" + currentScreenName];//[0].fieldControl
        // for (var j = 0; j < data.length; j++) {
        for (var j = 0; j < 1; j++) {
            for (var i = 0; i < formConfig.length; i++) {
                if (formConfig[i].fieldName.toLowerCase() != 'cancelbtn' && formConfig[i].fieldName.toLowerCase() != 'savebtn') {
                    FormView[formConfig[i].DataMember] = data[j][formConfig[i].DataMember];
                    if (formConfig[i].fieldControl.toLowerCase() == 'textbox') {
                        $('#' + formConfig[i].DataMember).val(data[j][formConfig[i].DataMember]);
                    }
                    else if (formConfig[i].fieldControl.toLowerCase() == 'combobox') {
                        comboboxdata = {};
                        comboboxdata.DataMember = formConfig[i].DataMember;
                        comboboxdata.ScreenName = formConfig[i].screenName;
                        comboboxdata.FormListType = "Form";
                        DropDownIdList.push(comboboxdata);
                        // DropDownIdList.push(formConfig[i].DataMember);
                        if (formConfig[i].DataMember != "ShowcaseTypeID") {
                            GetDropDownListValue(formConfig[i].screenName, "Form");
                            //GetDropDownListValue(currentScreenName, "Form");
                            DropDownIdList = [];
                            $('#' + formConfig[i].DataMember).val(data[j][formConfig[i].DataMember]);
                            formComboChange('', formConfig[i].DataMember, 0, data[j][formConfig[i].DataMember]);
                            DropDownOnchangeFunction(formConfig[i].DataMember);
                        }
                    }
                    else if (formConfig[i].fieldControl.toLowerCase() == 'datepicker') {
                        $('#' + formConfig[i].DataMember).val(data[j][formConfig[i].DataMember]);
                    }
                    else if (formConfig[i].fieldControl.toLowerCase() == 'option') {
                        if (data[j][formConfig[i].DataMember] == true)
                            $('#' + formConfig[i].DataMember).attr("Checked", true);
                    }
                    else if (formConfig[i].fieldControl.toLowerCase() == 'label') {
                        if (data[j][formConfig[i].DataMember] != undefined)
                            $('#' + formConfig[i].DataMember).val(data[j][formConfig[i].DataMember]);
                    }
                    else if (formConfig[i].fieldControl.toLowerCase() == 'radiobutton') {
                        var value = data[j][formConfig[i].DataMember].replace(/ /g, "");
                        $("input[name=" + formConfig[i].DataMember + "][value=" + value + "]").attr('checked', 'checked');
                    }
                    else if (formConfig[i].fieldControl.toLowerCase() == 'lookup') {
                        $('#' + formConfig[i].DataMember).val(data[j][formConfig[i].DataMember]);
                    }
                    dataFieldIdList[formConfig[i].DataMember] = data[j][formConfig[i].DataMember];
                }
            }
        }

    }
}


var isEdit = false;
//function AssignFormData(data, scrnName) { //last working Functionallity
function AssignFormDataOld(data, scrnName) {
    mustCarryItemData = data;
    dataFieldIdList = {};
    if (data != '' && data != null) {
        currentScreenName = scrnName == undefined ? currentScreenName : scrnName;
        if (currentScreenName == "SalesOrderForm" || currentScreenName == "InvoiceForm" || currentScreenName == "CreditNoteForm")
            DiscountGroup = data[0].DiscountGroup;
        var formConfig = formFieldIdList["FormConfig_" + currentScreenName];//[0].fieldControl
        //for (var j = 0; j < data.length; j++) {//command for inventry
        for (var j = 0; j < 1; j++) {
            for (var i = 0; i < formConfig.length; i++) {
                if (formConfig[i].fieldName.toLowerCase() != 'cancelbtn' && formConfig[i].fieldName.toLowerCase() != 'savebtn') {
                    FormView[formConfig[i].DataMember] = data[j][formConfig[i].DataMember];
                    if (formConfig[i].fieldControl.toLowerCase() == 'textbox' || formConfig[i].fieldControl.toLowerCase() == 'textarea') {
                        $('#' + formConfig[i].DataMember).val(data[j][formConfig[i].DataMember]);
                    }
                    else if (formConfig[i].fieldControl.toLowerCase() == 'combobox') {
                        comboboxdata = {};
                        comboboxdata.DataMember = formConfig[i].DataMember;
                        comboboxdata.ScreenName = formConfig[i].screenName;
                        comboboxdata.FormListType = "Form";
                        DropDownIdList.push(comboboxdata);
                        // DropDownIdList.push(formConfig[i].DataMember);
                        GetDropDownListValue(formConfig[i].screenName, "Form");
                        //GetDropDownListValue(currentScreenName, "Form");
                        DropDownIdList = [];
                        if (data[j][formConfig[i].DataMember] == false || data[j][formConfig[i].DataMember] == true)
                            $('#' + formConfig[i].DataMember).val(data[j][formConfig[i].DataMember]);
                        else if (data[j][formConfig[i].DataMember] != null) {
                            //  $('#' + formConfig[i].DataMember).val(data[j][formConfig[i].DataMember].toString().replace(/ /g, "-space-"));
                            $('#' + formConfig[i].DataMember).val(data[j][formConfig[i].DataMember].toString());
                        }
                        formComboChange('', formConfig[i].DataMember, 0, data[j][formConfig[i].DataMember]);
                        DropDownOnchangeFunction(formConfig[i].DataMember, "No");
                    }
                    else if (formConfig[i].fieldControl.toLowerCase() == 'datepicker') {
                        $('#' + formConfig[i].DataMember).val(data[j][formConfig[i].DataMember]);
                    }
                    else if (formConfig[i].fieldControl.toLowerCase() == 'option') {
                        if (data[j][formConfig[i].DataMember] == true)
                            $('#' + formConfig[i].DataMember).attr("Checked", true);
                    }
                    else if (formConfig[i].fieldControl.toLowerCase() == 'label') {
                        if (data[j][formConfig[i].DataMember] != undefined)
                            $('#' + formConfig[i].DataMember).val(data[j][formConfig[i].DataMember]);
                    }
                    else if (formConfig[i].fieldControl.toLowerCase() == 'radiobutton') {
                        if (data[j][formConfig[i].DataMember] != undefined) {
                            var value = (data[j][formConfig[i].DataMember] == false || data[j][formConfig[i].DataMember] == true) ? data[j][formConfig[i].DataMember] : data[j][formConfig[i].DataMember].replace(/ /g, "");
                            $("input[name=" + formConfig[i].DataMember + "][value=" + value + "]").attr('checked', 'checked');
                        }
                    }
                    else if (formConfig[i].fieldControl.toLowerCase() == 'lookup') {
                        $('#' + formConfig[i].DataMember).val(data[j][formConfig[i].DataMember]);
                    }
                    else if (formConfig[i].fieldControl.toLowerCase() == 'imageupload') {
                        GetBase64Image(data[j][formConfig[i].DataMember]);
                        //  $('#blah').attr('src', data[j][formConfig[i].DataMember]);
                    }
                    dataFieldIdList[formConfig[i].DataMember] = data[j][formConfig[i].DataMember];
                }
            }
        }
        if (FormListViewList.length > 0) {
            //  TabScreenName = "Contacts";
            GetFormListViewList();
        }
        var listParameter = objListParameter['ListParameter_' + CurrentScreen_TabScreen_Name + '_' + FieldName];
        //if (currentScreenName == "MustCarryItemForm")
        //    FormListConfigRow1(listParameter.ttbody, listParameter.tfoot, listParameter.scrName, 1, '', listParameter.fieldName, listParameter.actionType);
        //else
        if (listParameter != undefined) {
            listParameter.actionType = listParameter.actionType == undefined ? _action : listParameter.actionType;

            if ((currentScreenName == "ItemPromotionForm" || currentScreenName == "InvoicePromotionForm") && tabGroupData.length >= 1) {
                var cs_ts_name = CurrentScreen_TabScreen_Name;
                for (var n = 0; n < tabGroupData.length; n++) {
                    var scrName = currentScreenName + "_" + tabGroupData[n].Value.replace(" ", "");
                    var fieldNam = objListParameterFieldName[n];
                    listParameter = objListParameter['ListParameter_' + scrName + '_' + fieldNam];
                    DynamicFormListConfigRow(listParameter.ttbody, listParameter.tfoot, listParameter.scrName, 1, '', listParameter.fieldName, listParameter.actionType, "yes");
                }
                CurrentScreen_TabScreen_Name = cs_ts_name;
            }
            else
                DynamicFormListConfigRow(listParameter.ttbody, listParameter.tfoot, listParameter.scrName, 1, '', listParameter.fieldName, listParameter.actionType, "no");
            if (listParameter.scrName == "SalesOrderForm" || listParameter.scrName == "InvoiceForm" || listParameter.scrName == "CreditNoteForm") {
                OrderCalculations(listParameter.scrName, listParameter.fieldName);
            }
        }
        else {
            //for (var i = 0; i < objListParameterFieldName.length; i++) {
            //    FieldName = objListParameterFieldName[i]
            //    var listParameter = objListParameter['ListParameter_' + CurrentScreen_TabScreen_Name + '_' + FieldName];
            //    DynamicFormListConfigRow(listParameter.ttbody, listParameter.tfoot, listParameter.scrName, 1, '', listParameter.fieldName, listParameter.actionType);
            //}
        }
    }
}
var _base64imgage = "";
function GetBase64Image(id, path) {
    if (path != "No files selected." && path != null && path.indexOf('.simg') > 0) {
        $.ajax({
            cache: false,
            type: "GET",
            // url: "../ImportExcel/GetBase64Image",
            url: url_GetBase64Image,
            contentType: 'application/json',
            dataType: "json",
            async: false,
            data: { path1: path.replace('//', '/') },
            success: function (data) {
                _base64imgage = data.base64imgage;
                $('#' + id).attr('src', "data:image/jpg;base64," + data.base64imgage);
                //    $('#' + id).attr('src', "data:image/jpg;base64," + SaveImagePath + "/" + data.base64imgage);

                //displayImage(imgs.base64imgage);
            },
            error: function (xhr) {
                alert("Error occurred while loading the image. "
                    + xhr.responseText);
            }
        });
    }
    else {
        if (path != null) {
            if (path.indexOf('.mp4') > 0 || path.indexOf('.mov') > 0 || path.indexOf('.mkv') > 0 || path.indexOf('.webm') > 0 || path.indexOf('.avi') > 0 || path.indexOf('.mov') > 0 || path.indexOf('.3gp') > 0) {
                //$('#' + id).attr("src", "../ImportFiles/Images/video.png");
                $('#' + id).attr("src", "../Images/video.png");
            }
            else if (path.indexOf('.pdf') > 0) {
                $('#' + id).attr("src", "../Images/pdf.jpg");
            }
            else if (path.indexOf('.pptx') > 0 || path.indexOf('.ppt') > 0 || path.indexOf('.ppsx') > 0) {
                $('#' + id).attr("src", "../Images/Powerpoint.png");
            }
            else if (path.indexOf('http') > -1) {
                // http ================================================================================
                // display online remote image =========================================================
                $('#' + id).attr('src', path + "?timestamp=" + new Date().getTime());
                $(window).load(function () {
                    var img = new Image();
                    img.onload = function () {
                        if (parseInt(this.height) == 0 && parseInt(this.width) == 0) {
                            $('#' + id).attr('src', SaveImagePath + "/" + path + "?timestamp=" + new Date().getTime());
                        }
                        else {
                            $('#' + id).attr('src', path + "?timestamp=" + new Date().getTime());
                        }
                    }
                    img.src = path + "?timestamp=" + new Date().getTime();
                });
                // display online remote image =========================================================
                // http ================================================================================
            }
            else {
                //$('#' + id).attr('src', path.replace("//", "/"));
                //$('#' + id).attr('src', SaveImagePath + "/" + path);
                if ($('#ImagePath').val() != undefined && $('#ImagePath').val() != "") {
                    var splitimgPath = $('#ImagePath').val().split('/');
                    //splitimgPath = "http://simplrdb.southeastasia.cloudapp.azure.com/SimplrB2BSG/DeviceImages/Images/Banner/".split('/');
                    var splitimgPathCnt = splitimgPath != null && splitimgPath.length >= 4 ? splitimgPath.length : 0;
                    if (splitimgPathCnt > 0 && splitimgPath[splitimgPathCnt - 1] == "")
                        SaveImagePath = "../" + splitimgPath[splitimgPathCnt - 4] + "/" + splitimgPath[splitimgPathCnt - 3] + "/" + splitimgPath[splitimgPathCnt - 2];
                    else
                        SaveImagePath = "~/" + splitimgPath[splitimgPathCnt - 3] + "/" + splitimgPath[splitimgPathCnt - 2] + "/" + splitimgPath[splitimgPathCnt - 1];
                }
                $('#' + id).attr('src', SaveImagePath + "/" + path + "?timestamp=" + new Date().getTime());;
            }

        }
    }

}

function DynamicFormListConfigRow(ttbody, tfoot, scrName, pageNumber, SearchId, fieldName, actionType, tabGroup) {
    $("#" + ttbody).empty();
    $("#" + tfoot).empty();
    objAddDynamicListCount['ListConfig_' + CurrentScreen_TabScreen_Name + '_' + fieldName] = objAddDynamicListCount['ListConfig_' + CurrentScreen_TabScreen_Name + '_' + fieldName] == undefined ? -1 : objAddDynamicListCount['ListConfig_' + CurrentScreen_TabScreen_Name + '_' + fieldName];
    dynamicRowindex = 0;
    //var searchOption = SearchId != '' ? $('#S_' + SearchId).val() != '' ? " where " + SearchId + " like '%" + $('#S_' + SearchId).val() + "%'" : '' : '';
    //var searchOption = SearchId != '' ? $('#Search_' + scrName + '_' + SearchId).val() != '' && SearchId != "0" ? " where " + SearchId + " like '%" + $('#Search_' + scrName + '_' + SearchId).val() + "%'" : '' : '';
    //if (SearchId.toLowerCase() == 'print')
    //    searchOption = SearchId != '' ? $('#Search_' + scrName + '_' + SearchId).val() != '' ? " where [" + SearchId + "] like '%" + $('#Search_' + scrName + '_' + SearchId).val() + "%'" : '' : '';
    //    //searchOption = SearchId != '' ? $('#Search_' + SearchId).val() != '' ? " where [" + SearchId + "] like '%" + $('#Search_' + SearchId).val() + "%'" : '' : '';
    //else if (isDatePicker == true) {
    //    if ($('#Search_' + SearchId).val() != "") {
    //        //  var date = DateFormateChange($('#Search_' + SearchId).val());
    //        searchOption = SearchId != '' ? $('#Search_' + SearchId).val() != '' ? " where " + SearchId + " = '" + DateFormateChange($('#Search_' + SearchId).val()) + "'" : '' : '';
    //    }
    //    else return;
    //}
    var searchOption = '';
    var fName = fieldName;
    if (scrName == "StockTransferForm" && actionType == 'edit')
        fName = fieldName + "_" + actionType;


    $.ajax({
        type: 'POST',
        url: url_GetListValue,
        data: { data: JSON.stringify(dataFieldIdList), ScreenName: scrName, pageNumber: pageNumber, searchOption: searchOption, id: _lookUpId.split('_')[0], FieldName: fName, ActionType: actionType },
        async: false,
        success: function (data) {
            data = data.List;
            LookUpMultiSelected = [];
            if (currentScreenName != "ItemPromotionForm" && currentScreenName != "InvoicePromotionForm")
                objAddDynamicListCount['ListConfig_' + CurrentScreen_TabScreen_Name + '_' + fieldName] = -1;
            if (tabGroup == 'yes')
                CurrentScreen_TabScreen_Name = scrName;
            if (data != "" && data != "[]") {
                var isMustCarryItem = false;

                var _obj = {};
                _obj.fieldName = 'TempTableDelete';
                PerformAction('listTextFieldLostFocus', _obj);

                data = $.parseJSON(data);
                var isTableRowValue = false;
                var isaddDynamic = true;
                for (var i = 0; i < data.length; i++) {
                    if (currentScreenName == "MustCarryItemForm1") {
                        AddDynamicList1(scrName, ttbody, fieldName, SearchId);
                        isaddDynamic = true;
                        //  MustCarryItemListDataLoad(fieldName, data, i);
                    }
                    else {
                        if (currentScreenName == "ItemPromotionForm" || currentScreenName == "InvoicePromotionForm") {
                            AddDynamicListItemPromtion(scrName, ttbody, fieldName, SearchId, data.length, i);
                            isaddDynamic = true;
                        }
                        else {
                            // if (currentScreenName == "StockTransferForm" && !data[i].RequestedQty > 0 && data[i].TransStatus == true) {

                            //if (currentScreenName == "StockTransferForm" && data[i].RequestedQty <= 0 && _action == 'create') {
                            //    //  if (currentScreenName == "StockTransferForm" && data[i].RequestedQty <= 0) {
                            //    isaddDynamic = false;
                            //}
                            //else {
                            AddDynamicList1(scrName, ttbody, fieldName, SearchId, data.length, i);
                            isaddDynamic = true;
                            // }
                        }
                        //if (currentScreenName == "MustCarryItemForm" || currentScreenName == "VanStockRequestForm" || currentScreenName == "SalesOfficeStockRequestForm" || currentScreenName == "CreditNoteForm" || currentScreenName == "InvoiceForm" || currentScreenName == "DeviceSystemListForm")//|| currentScreenName == "SalesOrderForm"
                        //    AddDynamicList1(scrName, ttbody, fieldName);
                        //else
                        //    AddDynamicList(scrName, ttbody, fieldName);
                        //  ListHeaderList['ListConfig_' + CurrentScreen_TabScreen_Name + '_' + fieldName][0].FieldName
                        if (isaddDynamic == true) {
                            var listData = ListHeaderList['ListConfig_' + CurrentScreen_TabScreen_Name + '_' + fieldName];
                            if (tabGroup == 'yes') {
                                CurrentScreen_TabScreen_Name = scrName;
                                dynamicFieldName = fieldName;
                                listData = ListHeaderList['ListConfig_' + scrName + '_' + fieldName];
                            }
                            var obj = {};
                            var istextValueAssigned = false;
                            var isselectValueAssigned = false;
                            for (var j = 0; j < listData.length; j++) {
                                var fieldId = listData[j].FieldName;
                                var value = data[i][fieldId];

                                if (CurrentScreen_TabScreen_Name == "InventoryAdjustmentForm") {
                                    if (j == 3) {
                                        obj[fieldId] = value;
                                        LookUpMultiSelected.push(obj);
                                        ListSelectedId.push(obj);
                                    }
                                }
                                else if (j == 1) {
                                    obj[fieldId] = value;
                                    LookUpMultiSelected.push(obj);
                                    ListSelectedId.push(obj);
                                    // obj = {};
                                }
                                value = value == null || value == undefined ? "" : value;

                                if (currentScreenName == "MustCarryItemForm")
                                    dynamicFieldName = dynamicFieldName.split('_').length >= 2 ? dynamicFieldName.split('_')[0] : dynamicFieldName;
                                var tblbody = document.getElementById("ListBodyDivId_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName);
                                if (tblbody != null) {
                                    isTableRowValue = true;
                                    var tdType = getTableRowTDType(tblbody.rows[dynamicRowindex].cells.namedItem(fieldId).innerHTML);

                                    if (tdType == "checkbox") {
                                        var checkBox = $('#ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName + ' tr').find("input[type=checkbox]");
                                        if (value.toString().toLowerCase() == "true") {
                                            //checkBox.prop('checked', true);
                                            checkBox[dynamicRowindex].checked = true;
                                            isMustCarryItem = true;
                                        }
                                        else
                                            checkBox[dynamicRowindex].checked = false;
                                    }
                                    else if (tdType == "text" && istextValueAssigned == false) {
                                        var textbox = $('#ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName + ' tr').find("input");
                                        ////  textbox.val(value);
                                        //textbox[dynamicRowindex].value = value == undefined ? "" : value;
                                        //textbox.context.childNodes[dynamicRowindex]
                                        var dividedCount = textbox.length / (dynamicRowindex + 1);
                                        var minusCount = textbox.length - dividedCount;

                                        for (var y = minusCount; y < textbox.length; y++) {
                                            var fieldId = textbox[y].id.split('_')[0];
                                            var value = data[i][fieldId];
                                            value = value == null || value == undefined ? "" : value;

                                            if (textbox[y].type == "checkbox") {
                                                if (value.toString().toLowerCase() == "true") {
                                                    //checkBox.prop('checked', true);
                                                    textbox[y].checked = true;
                                                    isMustCarryItem = true;
                                                }
                                                else
                                                    textbox[y].checked = false;
                                            }
                                            else {
                                                // var fieldId = listData[y].FieldName;
                                                if (currentScreenName == "SalesOrderForm" && fieldId == "Qty") {
                                                    var bulkQtyA = data[i]["BulkQtyA"];
                                                    var looseQtyA = data[i]["LooseQtyA"];
                                                    value = parseFloat(bulkQtyA) + parseFloat(looseQtyA);
                                                    textbox[y].value = value;
                                                }
                                                else
                                                    textbox[y].value = value;
                                            }
                                            obj[fieldId] = value;
                                        }
                                        istextValueAssigned = true;


                                    }
                                    else if (tdType == "select" && isselectValueAssigned == false) {
                                        var textbox = $('#ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName + ' tr').find("select");
                                        var dividedCount = textbox.length / (dynamicRowindex + 1);
                                        var minusCount = textbox.length - dividedCount;
                                        for (var y = minusCount; y < textbox.length; y++) {
                                            var fieldId = textbox[y].id.split('_')[0];
                                            var value = data[i][fieldId];
                                            value = value == null || value == undefined ? "" : value;
                                            textbox[y].value = value;
                                            obj[fieldId] = value;
                                        }
                                        isselectValueAssigned = true;
                                    }

                                    else if (tdType == "") {
                                        tblbody.rows[(dynamicRowindex)].cells.namedItem(fieldId).innerHTML = value;
                                        obj[fieldId] = value;
                                    }
                                }
                                //obj[fieldId] = value;

                            }

                            //if (currentScreenName == "SalesOrderForm") {
                            //    var _obj = {};
                            //    _obj.fieldName = FieldName.split('_')[0];
                            //    BulkUOMCalculation(_obj.fieldName, "LooseQty", dynamicRowindex);
                            //}

                            //if (currentScreenName == "CustomerRoutingForm") {
                            obj.LineNo = addCount + 1;
                            //   }
                            dynamicRowindex++;
                            ///
                            FormView[fieldName] = obj;



                            //if (currentScreenName == "MustCarryItemForm") {
                            //    if (isMustCarryItem == true) {
                            //        _obj = {};
                            //        _obj.fieldName = FieldName.split('_')[0];
                            //        PerformAction('listTextFieldLostFocus', _obj);
                            //        isMustCarryItem = false;
                            //    }
                            //}
                            //else {
                            _obj = {};
                            _obj.fieldName = FieldName.split('_')[0];
                            PerformAction('listTextFieldLostFocus', _obj);
                            //}
                        }

                    }
                }
                if (isTableRowValue == false) {
                    LookUpMultiSelected = [];
                    //ListSelectedId = {};
                }
                if (_isdynamic == true && _action == 'edit') {
                    if (currentScreenName == "ItemPromotionForm" || currentScreenName == "InvoicePromotionForm") {
                        var actionPlan = "AddEmptyRow";
                        isDynamicValidate = true;
                        AddDynamicListNewItemPromtion(CurrentScreen_TabScreen_Name, ttbody, fieldName, actionPlan, isDynamicValidate);
                    }
                    else {
                        AddDynamicList(CurrentScreen_TabScreen_Name, "ListBodyDivId_" + CurrentScreen_TabScreen_Name + "_" + fieldName, fieldName);
                    }
                }
                else if (_isdynamic == true && _action == 'create') {
                    //command 31.05.2019 -- Item maintence download
                    // if (currentScreenName == "CustomerProductForm" || currentScreenName == "StockTransferForm") {
                    AddDynamicList(CurrentScreen_TabScreen_Name, "ListBodyDivId_" + CurrentScreen_TabScreen_Name + "_" + fieldName, fieldName);
                    // }
                }
            }
            else {
                // if (_isdynamic == true && _action == 'edit') {
                if (_isdynamic == true) {
                    if (currentScreenName == "ItemPromotionForm" || currentScreenName == "InvoicePromotionForm") {
                        var actionPlan = "AddEmptyRow";
                        isDynamicValidate = true;
                        AddDynamicListNewItemPromtion(CurrentScreen_TabScreen_Name, ttbody, fieldName, actionPlan, isDynamicValidate);
                    }
                    else
                        AddDynamicList(CurrentScreen_TabScreen_Name, "ListBodyDivId_" + CurrentScreen_TabScreen_Name + "_" + fieldName, fieldName);
                }
            }
        },
        error: function (a, b, c) {
            //  alert(a);
            LookUpMultiSelected = [];
            if (currentScreenName != "ItemPromotionForm" && currentScreenName != "InvoicePromotionForm")
                objAddDynamicListCount['ListConfig_' + CurrentScreen_TabScreen_Name + '_' + fieldName] = -1;
            if (tabGroup == 'yes')
                CurrentScreen_TabScreen_Name = scrName;
            if (_isdynamic == true) {
                if (currentScreenName == "ItemPromotionForm" || currentScreenName == "InvoicePromotionForm") {
                    var actionPlan = "AddEmptyRow";
                    isDynamicValidate = true;
                    AddDynamicListNewItemPromtion(CurrentScreen_TabScreen_Name, ttbody, fieldName, actionPlan, isDynamicValidate);
                }
                else
                    AddDynamicList(CurrentScreen_TabScreen_Name, "ListBodyDivId_" + CurrentScreen_TabScreen_Name + "_" + fieldName, fieldName);
            }
        }

    });
}

function OrderCalculations(screenName, fieldName) {
    var tblbody = document.getElementById("ListBodyDivId_" + screenName + "_" + fieldName);
    var tdType = '';
    var subTotal = 0;
    var discount = 0;
    var vatAmount = 0;
    var totalAmount = 0;
    for (var i = 0; i < tblbody.rows.length; i++) {
        tdType = getTableRowTDType(tblbody.rows[i].cells.namedItem("Amount").innerHTML);
        if (tdType == "text") {
            var textbox = $('#ListBodyDivId_' + screenName + '_' + fieldName + ' tr').find("input");
            subTotal = subTotal + parseFloat(textbox[i].value);
        }
        else {
            var amt = tblbody.rows[i].cells.namedItem("Amount").innerText == "" ? 0 : parseFloat(tblbody.rows[i].cells.namedItem("Amount").innerHTML);
            subTotal = subTotal + amt;
        }
    }
    $('#SubTotal').text(subTotal.toFixed(2));
    var disSubTotal = subTotal;
    var discnt = 0;
    DiscountGroup = DiscountGroup == "" ? "0+0" : DiscountGroup;
    var discountGroupsplit = DiscountGroup.split('+');
    for (var i = 0; i < discountGroupsplit.length; i++) {
        discnt = (disSubTotal * parseFloat(discountGroupsplit[i])) / 100;
        discount = discount + discnt;
        disSubTotal = disSubTotal - discnt;
    }
    totalAmount = subTotal - discount;
    vatAmount = totalAmount / 112 * 12;
    $('#Discount').text(discount.toFixed(2));
    $('#WithholdingTax').text('0.00');
    $('#TotalAmt').text(totalAmount.toFixed(2));

    if (screenName == "CreditNoteForm")
        $('#GST').text(vatAmount.toFixed(2))
    else
        $('#GstAmt').text(vatAmount.toFixed(2))
}

function MustCarryItemListDataLoad(fieldName, data) {
    for (var i = 0; i < data.length; i++) {
        var isMustCarryItem = false;
        //  ListHeaderList['ListConfig_' + CurrentScreen_TabScreen_Name + '_' + fieldName][0].FieldName
        var listData = ListHeaderList['ListConfig_' + CurrentScreen_TabScreen_Name + '_' + fieldName];
        var obj = {};
        for (var j = 0; j < listData.length; j++) {
            var fieldId = listData[j].FieldName;
            var value = data[i][fieldId];

            var tblbody = document.getElementById("ListBodyDivId_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName);
            var tdType = getTableRowTDType(tblbody.rows[dynamicRowindex].cells.namedItem(fieldId).innerHTML);

            if (tdType == "checkbox") {
                value = false;
                for (var k = 0; k < mustCarryItemData.length; k++) {
                    for (var l = j; l < listData.length; l++) {
                        var fieldId1 = listData[l].FieldName;
                        var value1 = data[i][fieldId1];
                        var value2 = mustCarryItemData[k][fieldId1];
                        if (value1 == value2 && value1 != undefined && value2 != undefined) {
                            isMustCarryItem = true;
                            value = true;
                            l = listData.length + 1;
                            k = mustCarryItemData.length + 1;
                        }
                    }
                }
                var checkBox = $('#ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName + ' tr').find("input[type=checkbox]");
                checkBox[dynamicRowindex].checked = false;

                if (isMustCarryItem) {
                    checkBox[dynamicRowindex].checked = true;
                    //checkBox.prop('checked', true);
                    // $('#ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName + ' tr').children('td').eq(0).is(':checked')

                }
                else {
                    //checkBox.prop('checked', false);
                    checkBox[dynamicRowindex].checked = false;

                }
            }
            else
                tblbody.rows[dynamicRowindex].cells.namedItem(fieldId).innerHTML = value;
            obj[fieldId] = value;
        }
        dynamicRowindex++;
        FormView[fieldName] = obj;

        if (isMustCarryItem) {
            _obj = {};
            _obj.fieldName = FieldName.split('_')[0];
            PerformAction('listTextFieldLostFocus', _obj);
        }
    }
}

function AddDynamicList1(scrName, ttbody, fieldName, SearchId, totalLength, currentCount) {
    //this line added for item promotion
    CurrentScreen_TabScreen_Name = scrName;
    //isDynamicValidate = true;
    //var id = '';
    //var value = '';
    //listView = {};
    //FieldName = fieldName;
    //var lastRowCount = $('table#table_' + CurrentScreen_TabScreen_Name + '_' + fieldName + ' tr:last').index() + 1;
    //addCount = objAddDynamicListCount['ListConfig_' + CurrentScreen_TabScreen_Name + '_' + fieldName] == undefined ? -1 : objAddDynamicListCount['ListConfig_' + CurrentScreen_TabScreen_Name + '_' + fieldName];
    //if (addCount >= 0) {
    //    var lastRowDataString = document.getElementById("table_" + CurrentScreen_TabScreen_Name + "_" + fieldName).rows[(addCount + 1)].innerHTML;
    //    var lastRowData = lastRowDataString.split('</td>')
    //    for (var i = 0; i < (lastRowData.length - 1) ; i++) {
    //        id = getTableRowTDid(lastRowData[i]);
    //        value = getTableRowTDvalue(lastRowData[i]);
    //        listView[id] = value;
    //    }
    //}
    //else {
    //    var listConfig = ListHeaderList['ListConfig_' + CurrentScreen_TabScreen_Name + '_' + FieldName];
    //    for (var i = 0; i < listConfig.length; i++) {
    //        // id = _objArray.arrList[i].DataMember;
    //        id = listConfig[i].DataMember;
    //        value = "First Count dummy Data";
    //        listView[id] = value;
    //    }
    //    listView.FieldName = FieldName;

    //}
    //FormView.FieldName = FieldName;
    //FormView[FieldName] = listView;

    ////
    //var _obj = {};
    //_obj.fieldName = fieldName;
    //var actionPlan = PerformAction('listAddClicked', _obj);
    ////
    //var rowCount = $('#table_' + CurrentScreen_TabScreen_Name + '_' + fieldName + ' tr').length;
    //var trowCount = $('#table_' + CurrentScreen_TabScreen_Name + '_' + fieldName + ' >tbody >tr').length;
    //var rowCount = $('table#myTable tr:last').index() + 1;

    //  if (actionPlan == "AddEmptyRow" && isDynamicValidate) {
    DropDownIdList = [];
    var listConfig = ListHeaderList['ListConfig_' + CurrentScreen_TabScreen_Name + '_' + fieldName];
    objAddDynamicListCount['ListConfig_' + CurrentScreen_TabScreen_Name + '_' + fieldName] = objAddDynamicListCount['ListConfig_' + CurrentScreen_TabScreen_Name + '_' + fieldName] == undefined ? 0 : objAddDynamicListCount['ListConfig_' + CurrentScreen_TabScreen_Name + '_' + fieldName] + 1;
    addCount = objAddDynamicListCount['ListConfig_' + CurrentScreen_TabScreen_Name + '_' + fieldName];
    var htm = '';
    var trowCount = addCount;
    htm += '<tr  id="' + fieldName + addCount + '" background-color:' + listConfig[1].RBackColor + ' class="tablecell trRow_' + addCount + '" id="trRow_' + addCount + '" onclick="EmptyRowClickFunction(\'' + scrName + '\',\'' + ttbody + '\',\'' + addCount + '\',\'' + fieldName + '\')">';

    for (var j = 0; j < listConfig.length; j++) {
        if (listConfig[j].IsHidden != 1 && listConfig[j].ColumnWidth != "0px" && (isBtnFormPopUpTable == false || listConfig[j].FieldName.replace("\t", "").toLowerCase() != 'action')) {
            var colName = listConfig[j].FieldName.replace("\t", "");
            var fieldControl = listConfig[j].FieldControl.replace("\t", "");
            var fontWeight = getFontStyle(listConfig[j].RFontStyle);
            fontWeight = fontWeight.replace("_", "-");
            fontWeight = fontWeight.replace("normal", ":normal");
            fontWeight = fontWeight.replace("bold", ":bold");

            //var vForeColor = argbToRGB(listConfig[j].VForeColor);
            //var vBackColor = argbToRGB(listConfig[j].VBackColor);
            var vForeColor = argbToRGB(listConfig[j].RForeColor);
            var vBackColor = argbToRGB(listConfig[j].RBackColor);

            switch (fieldControl.toLowerCase()) {
                case "textbox":
                    htm += '<td  id="' + listConfig[j].FieldName + '" style="width:' + listConfig[j].ColumnWidth + ';font-family: ' + listConfig[j].RFont + ';font-size:' + listConfig[j].RFontSize + ';color: ' + listConfig[j].RForeColor + ' ;background-color:""; text-align:' + getAlignStyle(listConfig[j].Alignment) + ';' + fontWeight + '">';
                    //htm += '<td  id="' + listConfig[j].FieldName + '" style="width:' + listConfig[j].ColumnWidth + ';font-family: ' + listConfig[j].RFont + ';font-size:' + listConfig[j].RFontSize + ';color: ' + listConfig[j].RForeColor + ' ;background-color:' + listConfig[j].RBackColor + '; text-align:' + getAlignStyle(listConfig[j].Alignment) + ';' + fontWeight + '">';
                    //  htm += '<input type="text" id="' + listConfig[j].FieldName + '_' + addCount + '" onclick="formTextFieldFocus(\'' + listConfig[j].FieldName + '\');"onblur="formTextFieldLostFocus(\'' + listConfig[j].FieldName + '\');"onkeyup="formTextFieldChange(\'' + listConfig[j].FieldName + '\');" />';
                    //htm += '<input type="text" id="' + listConfig[j].FieldName + '" value="" onclick="listTextFieldFocus(\'' + listConfig[j].FieldName + '\');"onblur="listTextFieldLostFocus(\'' + listConfig[j].FieldName + '\');"onkeyup="listTextFieldChange(\'' + listConfig[j].FieldName + '\');" />';

                    if (listConfig[j].DataMemberType == "NUMBER")
                        //htm += '<input iIndex="99" type="text" index = "44" id="' + listConfig[j].FieldName + '" value="" onkeypress="restrictMinus(event);" onfocus="listTextFieldFocus(this,\'' + listConfig[j].FieldName + '\',' + $(this).parent().index('td') + ',\'' + listConfig[j].FieldName + '\',\'' + fieldName + '\');"onblur="listTextFieldLostFocus(this,\'' + listConfig[j].FieldName + '\',' + addCount + ',\'' + listConfig[j].FieldName + '\',\'' + fieldName + '\');"onkeyup="listTextFieldChange(this,\'' + listConfig[j].FieldName + '\',' + addCount + ',\'' + listConfig[j].FieldName + '\',\'' + fieldName + '\');" />';
                        htm += '<input   type="text"  id="' + listConfig[j].FieldName + '" value=""  onkeypress="restrictMinus(event);" onfocus="listTextFieldFocus(this,\'' + listConfig[j].FieldName + '\',\'' + $(this) + '\',\'' + listConfig[j].FieldName + '\',\'' + fieldName + '\',\'' + ttbody + '\');"onblur="listTextFieldLostFocus(this,\'' + listConfig[j].FieldName + '\',' + addCount + ',\'' + listConfig[j].FieldName + '\',\'' + fieldName + '\',\'' + ttbody + '\');"onkeyup="listTextFieldChange(this,\'' + listConfig[j].FieldName + '\',' + addCount + ',\'' + listConfig[j].FieldName + '\',\'' + fieldName + '\',\'' + ttbody + '\');" />';
                    else
                        htm += '<input   type="text"    id="' + listConfig[j].FieldName + '" value="" onfocus="listTextFieldFocus(this,\'' + listConfig[j].FieldName + '\',' + $(this).parent().index('td') + ',\'' + listConfig[j].FieldName + '\',\'' + fieldName + '\',\'' + ttbody + '\');"onblur="listTextFieldLostFocus(this,\'' + listConfig[j].FieldName + '\',' + addCount + ',\'' + listConfig[j].FieldName + '\',\'' + fieldName + '\',\'' + ttbody + '\');"onkeyup="listTextFieldChange(this,\'' + listConfig[j].FieldName + '\',' + addCount + ',\'' + listConfig[j].FieldName + '\',\'' + fieldName + '\',\'' + ttbody + '\');" />';
                    //
                    htm += '</td>';
                    break;
                case "label":
                    htm += '<td  id="' + listConfig[j].FieldName + '" style="width:' + listConfig[j].ColumnWidth + ';font-family: ' + listConfig[j].RFont + ';font-size:' + listConfig[j].RFontSize + ';color: ' + listConfig[j].RForeColor + ' ;background-color:""; text-align:' + getAlignStyle(listConfig[j].Alignment) + ';' + fontWeight + '">';
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
                    //vBackColor = '';
                    var rFontSize = parseInt(listConfig[j].RFontSize.replace('px', '')) + 2;
                    htm += '<td  id="' + listConfig[j].FieldName + '" style="width:' + listConfig[j].ColumnWidth + ';font-family: ' + listConfig[j].RFont + ';font-size:' + listConfig[j].RFontSize + ';color: ' + listConfig[j].RForeColor + ' ;background-color:' + listConfig[j].RBackColor + '; text-align:' + getAlignStyle(listConfig[j].Alignment) + ';' + fontWeight + '">';
                    //htm += '<select id="' + listConfig[j].DataMember + '"   onchange="listComboChange(this,\'' + listConfig[j].FieldName + '\',' + addCount + ',\'' + listConfig[j].FieldName + '\',\'' + fieldName + '\');" style="  height: ' + listConfig[j].ValueHeight + "px" + ';font-size:' + listConfig[j].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + listConfig[j].VFont + ';text-align:' + getAlignStyle(listConfig[j].VAlignment) + ';" >';
                    htm += '<select id="' + listConfig[j].DataMember + '"   onchange="listComboChange(this,\'' + listConfig[j].FieldName + '\',' + addCount + ',\'' + listConfig[j].FieldName + '\',\'' + fieldName + '\');" style="font-size:' + rFontSize + "px" + ';color:' + vForeColor + ';background-color:' + listConfig[j].RBackColor + ';font-family:' + listConfig[j].RFont + ';text-align:' + getAlignStyle(listConfig[j].Alignment) + ';" >';
                    //htm += '<select id="' + listConfig[j].DataMember + '"   onchange="listComboChange(this,\'' + listConfig[j].FieldName + '\',' + addCount + ',\'' + listConfig[j].FieldName + '\',\'' + fieldName + '\');" style="font-size:' + rFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + listConfig[j].RFont + ';text-align:' + getAlignStyle(listConfig[j].Alignment) + ';" >';
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

                case "image":
                    if (listConfig[j].FieldName == "Delete")
                    {
                    htm += '<td  id="' + listConfig[j].FieldName + '" style="width:' + listConfig[j].ColumnWidth + ';font-family: ' + listConfig[j].RFont + ';font-size:' + listConfig[j].RFontSize + ';color: ' + listConfig[j].RForeColor + ' ;background-color:""; text-align:' + getAlignStyle(listConfig[j].Alignment) + ';' + fontWeight + '">';
                    //  htm += '<input type="text" id="' + listConfig[j].FieldName + '_' + addCount + '"  onclick="formReadonlyClicked(\'' + listConfig[j].FieldName + '\');" style="width:80%"  />';
                    htm += '<input style="display:none" type="button" ></>';
                    //htm += '<button  id="delete" onclick="DynamicRowItemRemove(this,\'' + listConfig[j].FieldName + '\',' + addCount + ',\'' + listConfig[j].FieldName + '\',\'' + fieldName + '\',' + addCount + ');"  class="btn"><i  onclick="DynamicRowItemRemove(this,\'' + listConfig[j].FieldName + '\',' + addCount + ',\'' + listConfig[j].FieldName + '\',\'' + fieldName + '\',' + addCount + ');"  class="fa fa-trash"></i></button>';
                        htm += '<button  id="delete" onclick="DynamicRowItemRemove(this,\'' + listConfig[j].FieldName + '\',' + addCount + ',\'' + listConfig[j].FieldName + '\',\'' + fieldName + '\',' + addCount + ',\'' + ttbody + '\');"  class="btn"><i     class="fa fa-trash"></i></button>';
                    //htm += '<button class="btn"><i class="fa fa-trash"></i> Trash</button>';
                    htm += '</td>';
                    }
                    else if (listConfig[j].FieldName == "Print")
                    {
                        htm += '<td  id="' + listConfig[j].FieldName + '" style="width:' + listConfig[j].ColumnWidth + ';font-family: ' + listConfig[j].RFont + ';font-size:' + listConfig[j].RFontSize + ';color: ' + listConfig[j].RForeColor + ' ;background-color:""; text-align:' + getAlignStyle(listConfig[j].Alignment) + ';' + fontWeight + '">';
                        //  htm += '<input type="text" id="' + listConfig[j].FieldName + '_' + addCount + '"  onclick="formReadonlyClicked(\'' + listConfig[j].FieldName + '\');" style="width:80%"  />';
                        htm += '<input style="display:none" type="button" ></>';
                        //htm += '<button  id="delete" onclick="DynamicRowItemRemove(this,\'' + listConfig[j].FieldName + '\',' + addCount + ',\'' + listConfig[j].FieldName + '\',\'' + fieldName + '\',' + addCount + ');"  class="btn"><i  onclick="DynamicRowItemRemove(this,\'' + listConfig[j].FieldName + '\',' + addCount + ',\'' + listConfig[j].FieldName + '\',\'' + fieldName + '\',' + addCount + ');"  class="fa fa-trash"></i></button>';
                        htm += '<button  id="print" onclick="DynamicRowItemPrint(this,\'' + listConfig[j].FieldName + '\',' + addCount + ',\'' + listConfig[j].FieldName + '\',\'' + fieldName + '\',' + addCount + ');"  class="btn"><i     class="fa fa-print"></i></button>';
                        //htm += '<button class="btn"><i class="fa fa-trash"></i> Trash</button>';
                        htm += '</td>';
                    }
                    break;
                case "colorpicker":
                    htm += '<td  id="' + listConfig[j].FieldName + '" style="width:' + listConfig[j].ColumnWidth + ';font-family: ' + listConfig[j].RFont + ';font-size:' + listConfig[j].RFontSize + ';color: ' + listConfig[j].RForeColor + ' ;background-color:""; text-align:' + getAlignStyle(listConfig[j].Alignment) + ';' + fontWeight + '">';
                    //htm += '<div class="pick-a-color" id=""' + listConfig[j].FieldName + '_' + addCount + '"" data-font-color="aaa">aaa</div>';
                    htm += '<div class="pick-a-color" id="border-color" data-border-color="222">222</div>';
                    //' + listConfig[j].DataMember + '
                    htm += '</td>';
                    break;

            }
        }
        else if (listConfig[j].IsHidden == 1) {
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
                    htm += '<td  id="' + listConfig[j].FieldName + '" style="display:none; width:' + listConfig[j].ColumnWidth + ';font-family: ' + listConfig[j].RFont + ';font-size:' + listConfig[j].RFontSize + ';color: ' + listConfig[j].RForeColor + ' ;background-color:' + listConfig[j].RBackColor + '; text-align:' + getAlignStyle(listConfig[j].Alignment) + ';' + fontWeight + '">';
                    htm += '<input type="text" id="' + listConfig[j].FieldName + '" value="" onclick="listTextFieldFocus(this,\'' + listConfig[j].FieldName + '\',' + addCount + ',\'' + listConfig[j].FieldName + '\',\'' + fieldName + '\');"onblur="listTextFieldLostFocus(this,\'' + listConfig[j].FieldName + '\',' + addCount + ',\'' + listConfig[j].FieldName + '\',\'' + fieldName + '\');"onkeyup="listTextFieldChange(this,\'' + listConfig[j].FieldName + '\',' + addCount + ',\'' + listConfig[j].FieldName + '\',\'' + fieldName + '\');" />';
                    htm += '</td>';
                    break;
            }
        }
    }
    htm += '</tr>';
    $("#" + ttbody).append(htm);
    dynamicTabledblclickfunction(fieldName);
    dynamicTableclickfunction(fieldName);
    //testauto();
    //if (DropDownIdList.length > 0) {
    //    GetDropDownListValue(scrn, "List");
    //}
    if (DropDownIdList.length > 0)
        GetDropDownListValue(CurrentScreen_TabScreen_Name, "List");

    if (totalLength == (currentCount + 1) && SearchId == '') {
        GetSearchConfig(scrName, FieldName);
    }

    //command for customer product and another some forms automatically not added
    //if (totalLength == (currentCount + 1) && _isdynamic == true && _action == 'edit') {
    //    //ttbody
    //    AddDynamicList(CurrentScreen_TabScreen_Name, "ListBodyDivId_" + CurrentScreen_TabScreen_Name + "_" + fieldName, fieldName);
    //}
}


var isDynamicRowItemRemove = false;
var isDynamicRowItemDelete = false;
var isInvoicePrint = false;
var isDynamicRowItemDeletePerformAction = false;
var objDynamicRowItemRemove = {};
var bool = false;

function swapRow(direction, rowindex, ttbody) {
    if (bool == false) {
        rowindex = rowindex - 1;
        var src_row = rowindex;
        var dest_row = rowindex;

        if (direction == "up")
            dest_row = rowindex - 1;
        else
            dest_row = rowindex + 1;

        var tab_ref = document.getElementById(ttbody);

        for (var i = 0; i < tab_ref.childNodes.length; i++) {
            try {
                var cntrl_up = tab_ref.childNodes[i].childNodes[0].childNodes[1];
            }
            catch (err) {
                tab_ref.removeChild[i];
            }
        }

        if (src_row > dest_row)
            swapElements(tab_ref, src_row, dest_row);
        else
            swapElements(tab_ref, dest_row, src_row);

       // ListBodyDivId_GoodsReturnForm_Item

        var tab_ref = document.getElementById('ListBodyDivId_GoodsReturnForm_Item');
        var cells_value = new Array();
        //for (var i = 0; i < tab_ref.childNodes[dest_row].childNodes.length; i++) {
           
        //    swapElements(tab_ref.childNodes[dest_row], src_row, dest_row);
        //    cells_value[i] = tab_ref.childNodes[dest_row].childNodes[i].innerHTML;

        //}
        //for (var i = 0; i < tab_ref.childNodes[src_row].childNodes.length; i++) {
        
        //    tab_ref.childNodes[dest_row].childNodes[i].innerHTML = tab_ref.childNodes[src_row].childNodes[i].innerHTML;
            
        //}
        //for (var i = 0; i < tab_ref.childNodes[src_row].childNodes.length; i++) {
           
        //    tab_ref.childNodes[src_row].childNodes[i].innerHTML = cells_value[i];
        //}
        try {
           // if (swap_ttbody == ttbody)
                rowRefresh(ttbody);
        } catch (err) {

        }
    }
}

function swapElements(parent, elemA, elemB) {
    //a little of validation
    if (!parent || parent.constructor.toString().search('HTML') === -1) return;
    var children = parent.children;
    if (typeof elemA !== 'number' || typeof elemB !== 'number' || elemA === elemB || !children[elemA] || !children[elemB]) return;

    elemB = elemA < elemB ? elemB-- : elemB;
    var childNumb = children.length - 1;

    var a = parent.removeChild(children[elemA]);
    var b = parent.removeChild(children[elemB]);
    append(elemB, a);
    append(elemA, b);

    function append(a, b) {
        childNumb === a ? parent.appendChild(b) : parent.insertBefore(b, children[a]);
    }
}

function rowRefresh(ttbody) {
 if (1 == 0) {
        var isEdit = String(localStorage.getItem('isEdit'));
        if (isEdit == 'yes') {
            bool = true;
            //'ListBodyDivId_GoodsReturnForm_Item'
            var tab_ref = document.getElementById(ttbody);
            //var tBody = tab_ref.getElementsByTagName('tbody')[0].rows;
           // var tableRow = tab_ref.childNodes.

            //var rows = tab_Ref.find('tr');
            //var cells_value = new Array();
            var cnt = 0;

            for (var i = 0; i < tab_ref.childNodes.length; i++) {

                if (tab_ref.childNodes[i].childNodes.length = 0)
                    continue;

                if (tab_ref.childNodes[i].childNodes[0].id == "Delete")
                    break;

                try {
                    var cntrl_up = tab_ref.childNodes[i].childNodes[0].childNodes[1];
                    var cntrl_down = tab_ref.childNodes[i].childNodes[0].childNodes[2];
                    if (cntrl_up.innerHTML.indexOf('delete') > 0)
                        break;
                    if (cnt == 0) {
                        cnt = cnt + 1;
                        cntrl_up.innerHTML = '<i class="fa fa-circle"></i>';
                        cntrl_up.removeAttribute('onclick');
                        cntrl_down.innerHTML = '<i class="fa fa-arrow-circle-down"></i>';
                        cntrl_down.removeAttribute('onclick');
                        cntrl_down.setAttribute('onclick', "swapRow('down', " + (i + 1)  + ",'" + ttbody + "');");
                        // cntrl_down.childNodes[0].onclick = swapRow('down', (i + 1));//addEventListener('click', swapRow('down', (i + 1)), false);
                        // document.getElementById('tour-edit-save').removeAttribute('onclick');
                    }
                    else if (i == tab_ref.childNodes.length - 1) {
                        cntrl_down.innerHTML = '<i class="fa fa-circle"></i>';
                        cntrl_down.removeAttribute('onclick');
                        cntrl_up.innerHTML = '<i class="fa fa-arrow-circle-up"></i>';
                        cntrl_up.removeAttribute('onclick');
                        cntrl_up.setAttribute('onclick', "swapRow('up', " + (i + 1) + ",'" + ttbody + "');");

                        // cntrl_up.childNodes[0].addEventListener('click', swapRow('up', (i + 1)), false);
                    }
                    else {
                        try {
                            cntrl_up.innerHTML = '<i class="fa fa-arrow-circle-up"></i>';
                            cntrl_up.removeAttribute('onclick');
                            cntrl_up.setAttribute('onclick', "swapRow('up', " + (i + 1) + ",'" + ttbody + "');");
                        } catch (err) {

                        }
                        // cntrl_up.childNodes[0].addEventListener('click', swapRow('up',(i + 1)), false);
                        try {
                            cntrl_down.innerHTML = '<i class="fa fa-arrow-circle-down"></i>';
                            cntrl_down.removeAttribute('onclick');
                            cntrl_down.setAttribute('onclick', "swapRow('down', " + (i + 1) + ",'" + ttbody + "');");
                        } catch (err) {

                        }
                        //cntrl_down.childNodes[0].addEventListener('click', swapRow('down', (i + 1)), false);
                    }
                } catch (err) {

                }

                // if (cntrl.childNodes[0].type == "button")
                //   cntrl.childNodes[0].value = cells_value[i];

            }
            bool = false;
        }
}
}

function DynamicRowItemPrint(objthis, dataMember, rowIndex, value, fieldName, cnt, ttbody) {
    //debugger;
    //window.open(url_ReportsView1 + "?InitReport=" + qry + "&ReportName=" + qry1 + "&LoadReport=" + ReplaceSpecialCharacter(JSON.stringify(qry2)) + "&Print=true");
    //window.open(url_ReportsView1 + "?Print=true");
    obj = {};
    ///not need five lines
    obj.objthis = objthis;
    obj.dataMember = dataMember;
    //  obj.dataMember = "BulkQty";
    obj.rowIndex = rowIndex - 1;
    obj.value = value;
    obj.fieldName = fieldName;
    obj.ttbody = ttbody;
    setListValue(objthis, dataMember, rowIndex, ttbody);
    var _obj = {};
    _obj.fieldName = dataMember;
    _obj.rowIndex = rowIndex;
    _obj.value = value;
    PerformAction('listButtonClicked', _obj);

}
function DynamicRowItemRemove(objthis, dataMember, rowIndex, value, fieldName, cnt, ttbody) {
    //debugger;
    isDynamicRowItemDelete = true;
    obj = {};
    ///not need five lines
    obj.objthis = objthis;
    obj.dataMember = dataMember;
    //  obj.dataMember = "BulkQty";
    obj.rowIndex = rowIndex - 1;
    obj.value = value;
    obj.fieldName = fieldName;
    obj.ttbody = ttbody;
    ///
    obj.cnt = cnt;
    obj.title = "Confirm";

   

    //if (ProjectName.toLowerCase() == "selasihaman" && currentScreenName == "SalesOrderForm") {
    //    var _obj = {};
    //    _obj.fieldName = dataMember;
    //    _obj.rowIndex = rowIndex;
    //    _obj.value = value;
    //    PerformAction('listButtonClicked', _obj);
    //    return;
    //}

    if (ProjectName.toLowerCase() == "danone" && CurrentScreen_TabScreen_Name == "PriceCheckList")
    {
        if (obj.cnt == 0) {
            obj.title = "Information";
            obj.message = "Sorry, Not allowed to Delete this record.?";
            showAlertMessage(obj);
            return
        }
    }
    var tmpCount = 0;
    try {
        tmpCount = document.getElementById(ttbody).childNodes.length;
        tmpCount = tmpCount;
    }
    catch (err) {

    }

    //Newly Added by Vishnu on 13/09/2023
    if (tmpCount < 2) {
        obj.title = "Information";
        obj.message = "Sorry, there is nothing to delete. Fill all required details.?";
        showAlertMessage(obj);
        return
    }
    else
        obj.message = "Are you sure you want to Remove?";

    objDynamicRowItemRemove = obj;
    //ConfirmMessage(obj);
    //return;
    setListValue(objthis, dataMember, rowIndex, ttbody);
    var _obj = {};
    _obj.fieldName = dataMember;
    _obj.rowIndex = rowIndex;
    _obj.value = value;
    PerformAction('listButtonClicked', _obj);
    if (isDynamicRowItemDeletePerformAction == false) {
        ConfirmMessage(obj);
        objDynamicRowItemRemove = {};
        return;
    }
    else
        isDynamicRowItemDeletePerformAction = false;
    //todo //by.M02.2023 - osg_internal
    //objDynamicRowItemRemove = {};
    //rowRefresh();
}

//function DynamicRowItemRemove(cnt) {
function DynamicRowItemRemoveConfirm(objthis, dataMember, rowIndex, value1, fieldName, cnt, ttbody) {
    cnt = currentRowClickCount;
    addCount = objAddDynamicListCount['ListConfig_' + ttbody];
    if (addCount > 0 && addCount > cnt && tableTotalRowCount > 1) {
        isDynamicRowItemRemove = true;
        var removeSelected = [];
        var obj = {};
        var value = '';
        //var listConfig = ListHeaderList['ListConfig_' + CurrentScreen_TabScreen_Name + '_' + FieldName];  

        //var listConfig = "ListConfig_" + ttbody.replace(/ListBodyDivId_/g, "");
        var listConfig = ListHeaderList['ListConfig_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName];
        // var listConfig = ListHeaderList[listConfig];
        var id = listConfig[1].FieldName;
        if (CurrentScreen_TabScreen_Name == "InventoryAdjustmentForm")
            id = listConfig[3].FieldName;
        var tblbody = document.getElementById("ListBodyDivId_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName);
        //   var tblbody = document.getElementById(ttbody);
        var tdType = tblbody.rows[cnt] == undefined ? "" : getTableRowTDType(tblbody.rows[cnt].cells.namedItem(id).innerHTML);
        if (tdType == "text" || tdType == "select") {
            value = tblbody.rows[cnt].cells.namedItem(id).childNodes['0'].value;
        }
        else {
            value = tblbody.rows[cnt].cells.namedItem(id).innerHTML;
        }

        if (tblbody.rows[cnt].cells.namedItem(id).innerText == "") {
            var tdType = tblbody.rows[cnt] == undefined ? "" : getTableRowTDType(tblbody.rows[cnt].cells.namedItem(id).innerHTML);
            if (tdType == 'text') {
                if (tblbody.rows[cnt].cells.namedItem(id).children[id].value == "") {
                    isDynamicRowItemRemove = false;
                    return;
                }
            }
            else {
                isDynamicRowItemRemove = false;
                return;
            }
        }

        obj[id] = value;
        FormView.FieldName = FieldName;
        FormView[FieldName] = obj;

        removeSelected.push(obj);
        LookUpMultiSelected = jQuery.grep(LookUpMultiSelected, function (value) { return value[id] != removeSelected[0][id]; });
        ListSelectedId = jQuery.grep(ListSelectedId, function (value) { return value[id] != removeSelected[0][id]; });

        var _obj = {};
        _obj.fieldName = 'TempDeleteBtn';
        PerformAction('listTextFieldLostFocus', _obj);
        //Todo - row click and  delete means using this line. but tab button using means not working this line
        var removeid = document.getElementById("ListBodyDivId_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName).rows[cnt].className.split(' ')[1];
        // $('.' + removeid).remove();
        $('.' + removeid).find('td').remove();
        $('.' + removeid).hide();
        var _obj = {};
        _obj.fieldName = dataMember;
        PerformAction('rowItemClicked', _obj);
    }
    else {
        isDynamicRowItemRemove = false;
    }
}

function DeleteForm() {
    $.ajax({
        type: 'POST',
        url: url_DeleteForm,
        data: { ScreenName: screenName + "_Delete", Code: deleteId },
        dataType: 'text',
        async: false,
        success: function (data) {
            if (data == null)
                $('#messageDialogId').text("Delect Error occour");
            else {
                GetGridHeaderDetails(url_GetListConfig, url_GetListValue, "ListHeadDivId", "ListBodyDivId", 'ListfootDivId', '');
                $('#messageDialogId').text(data);
            }
            $('#messageDialog').dialog('open');
        }
    });
}


function GetSearchDataList(rowUrl, ttbody, tfoot, scrName, pageNumber, SearchId) {
    GetRowData(rowUrl, ttbody, tfoot, scrName, pageNumber, SearchId);
}

$(document).ready(function () {
    $("#checkAll").click(function () {
        $(".checkBox").prop('checked',
            $(this).prop('checked'));
    });
    var selectedIDs1 = '';
    $("#delete").click(function () {
        //var selectedIDs = new Array();
        //$('input:checkbox.checkBox').each(function () {
        //    if ($(this).prop('checked')) {
        //        selectedIDs.push($(this).val());
        //    }
        //});

        //$.ajax({
        //    url: "/Common/delete",
        //    type: "POST",
        //    data: JSON.stringify(selectedIDs),
        //    contentType: "application/json",
        //    dataType: "json",
        //    success: function (msg) {
        //        alert(msg);
        //    },
        //    error: function () {
        //        alert("Error while deleting the records!");
        //    }
        //});

    });
});

function clickUp() {
    if (currentRowClickCount > 0) {
        var row = $(_this).parents("tr:first");
        row.insertBefore(row.prev());
        currentRowClickCount--;
        var sScreenName = '';
        setFormListView(currentRowClickCount, currentRowClickCount);
        var qry = "update TempRouteDet set [LineNo]={FormView.ListView.LineNo} where CustNo={FormView.ListView.CustNo}";
        qry = formatQueryString(qry, sScreenName);
        execute(qry);
        // var dbDataRows = executeQry;

        setFormListView((currentRowClickCount + 1), currentRowClickCount);
        var qry = "update TempRouteDet set [LineNo]={FormView.ListView.LineNo} where CustNo={FormView.ListView.CustNo}";
        qry = formatQueryString(qry, sScreenName);
        execute(qry);
    }
}

function clickDown() {
    if (currentRowClickCount < (tableTotalRowCount - 2)) {
        var row = $(_this).parents("tr:first");
        row.insertAfter(row.next());
        currentRowClickCount++;
        var sScreenName = '';
        setFormListView(currentRowClickCount, currentRowClickCount);
        var qry = "update TempRouteDet set [LineNo]={FormView.ListView.LineNo} where CustNo={FormView.ListView.CustNo}";
        qry = formatQueryString(qry, sScreenName);
        execute(qry);
        // var dbDataRows = executeQry;

        setFormListView((currentRowClickCount - 1), currentRowClickCount);
        var qry = "update TempRouteDet set [LineNo]={FormView.ListView.LineNo} where CustNo={FormView.ListView.CustNo}";
        qry = formatQueryString(qry, sScreenName);
        execute(qry);
    }
}


function setFormListView(lineNo, index) {
    dynamicRowindex = index;
    var obj = {};
    var rowDataString = "";
    dynamicFieldName = dynamicFieldName == undefined ? FieldName : dynamicFieldName;
    if (currentScreenName == "ItemPromotionForm" || currentScreenName == "InvoicePromotionForm")
        var dynamicFieldName = "Item";

    rowDataString = document.getElementById("table_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName).rows[(dynamicRowindex + 1)].innerHTML;
    var rowData = rowDataString.split('</td>')
    istextValueAssigned = false;
    isselectValueAssigned = false;

    dynamicRowindex = lineNo;
    for (var i = 0; i < (rowData.length - 1) ; i++) {
        id = getTableRowTDid(rowData[i]);
        type = getTableRowFullTDType(rowData[i]);

        //currentRowClickCount => change to dynamicRowindex
        if (type.toLowerCase() == "text" || type == "select") {
            obj[id] = $('#ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName + ' tr')[dynamicRowindex].cells[id].childNodes['0'].value;
        }
        else if (type.toLowerCase() == "") {
            var innerText = $('#ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName + ' tr')[dynamicRowindex].cells[id].innerText;
            obj[id] = innerText == "" ? "0" : $('#ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName + ' tr')[dynamicRowindex].cells[id].innerHTML;
        }
    }
    // if (currentScreenName == "CustomerRoutingForm") {
    obj.LineNo = lineNo + 1;
    //}

    obj.FieldName = FieldName;
    FormView.FieldName = FieldName;
    FormView[FieldName] = obj;
}

//function restrictMinus(event) {
//    var inputKeyCode = event.keyCode ? event.keyCode : event.which;
//    if (inputKeyCode != null) {
//        if (inputKeyCode == 45) event.preventDefault();
//    }
//    //if ((event.which != 46) && (event.which < 48 || event.which > 57)) {
//    if (event.which < 48 || event.which > 57) {
//        event.preventDefault();
//    }
//}

function restrictMinusDot(event) {
    var inputKeyCode = event.keyCode ? event.keyCode : event.which;
    if (inputKeyCode != null) {
        if (inputKeyCode == 45) event.preventDefault();
    }
   // if ((event.which != 46) && (event.which < 48 || event.which > 57)) {
   if (event.which < 48 || event.which > 57) {
        event.preventDefault();
    }
}

function restrictMinus(event) {
    var inputKeyCode = event.keyCode ? event.keyCode : event.which;
    if (inputKeyCode != null) {
        if (inputKeyCode == 45) event.preventDefault();
    }
    if ((event.which != 46) && (event.which < 48 || event.which > 57)) {
    //if (event.which < 48 || event.which > 57) {
        event.preventDefault();
    }
}

//Additional Added by Vishnu on 18.08.2023
function myFirstFunction(event) {
    var inputBox = document.getElementsByClassName('numbersOnly');
    inputBox.onchange = function () {
        inputBox.value = inputBox.value.replace(/[^0-9]/g, '');
    }
}

var tempUserNo = ''
function getdocNo() {
    var dt = new Date();
    var dat = dt.getDate() + "-" + (dt.getMonth() + 1) + "-" + dt.getFullYear();
    var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
    tempUserNo = _UserID + "_" + dat + " " + time;
    // alert(_UserID + "_" + time);
}


function SetFormView() {
    //FormView = {};
    var arrayfrm = _objArray.arrForm;
    var fieldComponent = '', fieldControl = '';
    for (var k = 0; k < arrayfrm.length; k++) {
        //arrFields.push(arrayfrm[k].fieldName);
        //arrFormFields.push(getFormComponentValue(arrayfrm[k].fieldName)); //ARRAYOPERATION
        FormView[arrayfrm[k].fieldName] = getFormComponentValue(arrayfrm[k].fieldName);
    }
}

//function setListValue(thisObj, iIndex, value, fieldName, ttbodyId) {
function setListValueOld(thisObj, fieldName, iIndex, ttbodyId) {
    var listConfigFieldName = "ListConfig_" + ttbodyId.replace(/ListBodyDivId_/g, "");
    var listConfig = ListHeaderList[listConfigFieldName];
    var tblbody = document.getElementById(ttbodyId);
    var id = '';
    var value = '';
    var obj = {};

    for (var i = 0; i < listConfig.length; i++) {
        id = listConfig[i].FieldName;
        //id = tblbody.rows[iIndex].cells[i].childNodes['0'].id;
        //var tdType = tblbody.rows[iIndex] == undefined ? "" : getTableRowTDType(tblbody.rows[iIndex].cells.namedItem(id).innerHTML);
        var tdType = tblbody.rows[iIndex] == undefined ? "" : getTableRowTDType(tblbody.rows[iIndex].cells[i].innerHTML);
        var tdType1 = tblbody.rows[iIndex].cells[i].childNodes['0'].type;
        if (tdType == "text" || tdType == "select") {
            //   value = tblbody.rows[iIndex].cells[i].childNodes['0'].value;
            // value = tblbody.rows[iIndex].cells.namedItem(id).childNodes['0'].value;
            value = tblbody.rows[iIndex].cells[i].childNodes['0'].value;
        }
        else if (tdType == "checkbox") {
            value = tblbody.rows[iIndex].cells[i].childNodes['0'].checked
        }
        else {
            //value = tblbody.rows[iIndex].cells.namedItem(id).innerHTML;
            value = tblbody.rows[iIndex].cells[i].innerText;
        }
        obj[id] = value;
    }
    obj.FieldName = FieldName;
    FormView[FieldName] = obj;
}

var isRowDeleted = false;
function SubSetListValue(thisObj, fieldName, iIndex, ttbodyId) {
    //  var listConfigFieldName = "ListConfig_" + ttbodyId.replace(/ListBodyDivId_/g, "");
    var listConfigFieldName = "ListConfig_" + ttbodyId;
    var listConfig = ListHeaderList[listConfigFieldName];
    var tblbody = document.getElementById(ttbodyId);
    var id = '';
    var value = '';
    var tdType = '';
    var obj = {};
    if (listConfig != undefined && tblbody.rows[iIndex] != undefined) {
        if (tblbody.rows[iIndex].cells.length > 0) {
            for (var i = 0; i < listConfig.length; i++) {
                isRowDeleted = false;
                id = listConfig[i].DataMember;
                if (tblbody.rows[iIndex].cells.namedItem(id) != null) {

                    try {
                        tdType = tblbody.rows[iIndex] == undefined ? "" : tblbody.rows[iIndex].cells.length == 0 ? "" : getTableRowTDType(tblbody.rows[iIndex].cells.namedItem(id).innerHTML);
                        if (tdType == "text" || tdType == "select" || tdType == "hidden") {
                            value = tblbody.rows[iIndex].cells.namedItem(id).childNodes['0'].value;
                        }
                        else if (tdType == "checkbox") {
                            value = tblbody.rows[iIndex].cells.namedItem(id).childNodes['0'].checked;
                        }
                        else if (tdType == "file") {
                            value = tblbody.rows[iIndex].cells.namedItem(id).childNodes['1'].value;
                        }
                        else if (tdType == "lookup") {
                            value = tblbody.rows[iIndex].cells.namedItem(id).childNodes['0'].children[id].value;
                        }
                        else if (tdType == "button");
                        else if (tdType == "label" || tdType == "link")
                            value = tblbody.rows[iIndex].cells.namedItem(id).innerText;
                        else {
                            value = tblbody.rows[iIndex].cells.namedItem(id).innerText;
                        }
                        obj[id] = value;
                    }
                    catch (e) {
                        obj[id] = "";
                    }
                }
                else
                    isRowDeleted = true;
            }
            obj.FieldName = FieldName;
            FormView[fieldName] = obj;
        }
        else {
            obj.FieldName = FieldName;
            FormView[fieldName] = obj;
        }
    }
}

function setListValue(thisObj, fieldName, iIndex, ttbodyId) {
    //  var listConfigFieldName = "ListConfig_" + ttbodyId.replace(/ListBodyDivId_/g, "");
    var listConfigFieldName = "ListConfig_" + ttbodyId;
    var listConfig = ListHeaderList[listConfigFieldName];
    var tblbody = document.getElementById(ttbodyId);
    if (tblbody == null)
        return;
    var id = '';
    var value = '';
    var tdType = '';
    var obj = {};
    isRowDeleted = true;

    if (listConfig != undefined && tblbody.rows[iIndex] != undefined) {
        if (tblbody.rows[iIndex].cells.length > 0) {
            for (var i = 0; i < listConfig.length; i++) {
                isRowDeleted = false;
                id = listConfig[i].DataMember;

                if (tblbody.rows[iIndex].cells.namedItem(id) != null) {
                    try {
                        //id = tblbody.rows[iIndex].cells[i].childNodes['0'].id;
                        tdType = tblbody.rows[iIndex] == undefined ? "" : tblbody.rows[iIndex].cells.length == 0 ? "" : getTableRowTDType(tblbody.rows[iIndex].cells.namedItem(id).innerHTML);
                        //tblbody.rows[iIndex].cells.LeadBasePackDesc.children.LeadBasePackDesc.nodeName
                        //var tdType = tblbody.rows[iIndex] == undefined ? "" : getTableRowTDType(tblbody.rows[iIndex].cells[i].innerHTML);
                        //var tdType1 = tblbody.rows[iIndex].cells[i].childNodes['0'].type;
                        if (tdType == "text" || tdType == "select" || tdType == "hidden") {
                            value = tblbody.rows[iIndex].cells.namedItem(id).childNodes['0'].value;
                            // value = tblbody.rows[iIndex].cells[i].childNodes['0'].value;
                            //try {
                            //    if (currentScreenName == "SalesOrderForm" && listConfig[i].FieldControl == "AUTOLOOKUP" && value != "") {
                            //        tblbody.rows[iIndex].cells.namedItem(id).childNodes['0'].disabled = true;
                            //        tblbody.rows[iIndex].cells.namedItem(id).childNodes['1'].disabled = true;
                            //    }
                            //} catch (eauto) {

                            //}
                        }
                        else if (tdType == "timepicker") {
                            value = tblbody.rows[iIndex].cells.namedItem(id).childNodes['0'].childNodes['0'].childNodes['0'].value;
                        }
                        else if (tdType == "checkbox") {
                            value = tblbody.rows[iIndex].cells.namedItem(id).childNodes['0'].checked;
                            // value = tblbody.rows[iIndex].cells[i].childNodes['0'].checked
                        }
                        else if (tdType == "file") {
                            //value = tblbody.rows[iIndex].cells.namedItem(id).childNodes['0'].value;
                            //if (value == "")
                            value = tblbody.rows[iIndex].cells.namedItem(id).childNodes['1'].value;
                        }
                        else if (tdType == "lookup") {
                            value = tblbody.rows[iIndex].cells.namedItem(id).childNodes['0'].children[id].value;
                        }
                        else if (tdType == "button");
                        else if (tdType == "label" || tdType == "link")
                            value = tblbody.rows[iIndex].cells.namedItem(id).innerText;
                        else {
                            value = tblbody.rows[iIndex].cells.namedItem(id).innerText;

                            //value = tblbody.rows[iIndex].cells.namedItem(id).innerHTML;
                            // value = tblbody.rows[iIndex].cells[i].innerText;
                        }
                        obj[id] = value;

                    }
                    catch (e) {
                        obj[id] = "";
                    }
                }
                else
                    isRowDeleted = true;
            }
            if (FieldName != undefined) {
                obj.FieldName = FieldName;
                //newly added by.M 11.03.2022 - targetmedia service
                if (fieldName == "MultiSelect")
                    FormView[fieldName] = obj;
                FormView[FieldName] = obj;
                if (FieldName.split('Lst').length <= 2 && FieldName.split('Lst')[0] == "");
                else
                    FormView[fieldName] = obj;
            }
            else
                FormView[fieldName] = obj;


            var listName = ttbodyId.split('_')[ttbodyId.split('_').length - 1]
            FormView[listName] = obj;
        }
        else {
            obj.FieldName = FieldName;
            FormView[FieldName] = obj;
            FormView[fieldName] = obj;

            var listName = ttbodyId.split('_')[ttbodyId.split('_').length - 1]
            FormView[listName] = obj;
        }
    }
}
