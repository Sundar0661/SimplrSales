var ColumnWidth = [];
var FLIsHiddenList = [];
var FLRFontList = [];
var isBtnFormPopUpTable = false;
var headerCount = 0;
var _isdynamic = false;
var _ispagination = false;
var _isList_FieldName = false;
var formListItems = [];
var listView = {};
var DateTimeIdGridList = [];
var TimeIdGridList = [];
var LastPageNumber = 1;
var isSortable = '';
var num = 0;
let stars;

//newly added.By.M.22.06.2023
//newly added.By.M.22.06.2023
var previousData = "";
var previousResult = "";
var previousPageNumber = 0;
var _previousispagination = false;

function FormListConfigClearArrayList() {
    FLIsHiddenList = [];
    headerCount = 0;
}

var arrList = [];
var ListHeaderList = {};
var objListParameter = [];
var objListParameterFieldName = [];
var isPageMultiSelect = false;

var row;

function start() {
    row = event.target;
}
function dragover() {

    //  row.css("background-color", "yellow");

    var e = event;
    e.preventDefault();

    let children = Array.from(e.target.parentNode.parentNode.children);


    if (children.indexOf(e.target.parentNode) > children.indexOf(row))
        e.target.parentNode.after(row);
    else
        e.target.parentNode.before(row);
}

function FormListConfigHeader(theadId, ttbody, tfoot, scrName, fieldName, url, actionType, screenFieldName) {
    if (scrName == "invoicenewform" || scrName == "invoiceform")
    num = 0;
    // RE-INITIALIZE ISDYNAMIC
    //_isdynamic = false;

    //if (scrName == "CustomerRoutingCTRForm" || scrName == "CustomerRoutingCTRAnalysisForm")
    //{
    //    _isdynamic = false;
    //}
    isSortable = "";
    try {
        var Qury1 = "select * from formconfig where screenname like '" + scrName + "' and fieldname like '" + fieldName + "'";
        var query1 = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(Qury1), encryptkey, { keySize: 128 / 8, iv: encryptiv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
        var params = "{'query':'" + query1 + "'}";

        $.ajax({
            type: 'POST',
            url: url_GetExecuteReader1,//"/Common/ExportListData/",
            data: params,
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            async: false,
            success: function (data) {
                //data = data;
                if (data.length > 0) {
                    var obj = JSON.parse(data);
                    isSortable = obj[0]["DefaultValue"];
                }


            },
            error: function (xhr) {

              //  alert("Error occurred while loading the List. " + xhr.responseText);


            }
        });
    }
    catch (e) {
       // alert(e);
    }

    try {
        if (commonObj.DateFormatString == null || commonObj.DateFormatString == undefined || commonObj.DateFormatString == '') {
            commonObj.DateFormatString = systemTableConfig['DATEFORMATSTRING'];
            commonObj.DateTimeFormatString = systemTableConfig['DATETIMEFORMATSTRING'];
            commonObj.TimeFormatString = systemTableConfig['TIMEFORMATSTRING'];
            commonObj.QtyRoundingDigits = systemTableConfig['QTYROUNDINGDIGITS'];
            commonObj.AmountRoundingDigits = systemTableConfig['AMOUNTROUNDINGDIGITS'];
            commonObj.PriceRoundingDigits = systemTableConfig['PRICEROUNDINGDIGITS'];
            commonObj.Currency = systemTableConfig['CURRENCY'];
        }
        ///

        var dynamicQry = "";
        if (fieldName.indexOf("_DynamicHeader") >= 0) {
            var dynamicScrName = scrName + "_LISTVIEW_" + fieldName;
            var dynamicScrName = scrName + "_LISTVIEW_" + fieldName.split('_')[0] + "_Dynamic_Header";
            // var dynamicScrName = "Web_DashBoard_LISTVIEW_LstUBA_Dynamic";
            dynamicQry = getString['QueryConfig_' + dynamicScrName];
            //qry += ' ' + getString['QueryConfig_' + sScreenName + '_GroupText'];
            //qry += ' ' + getString['QueryConfig_' + sScreenName + '_OrderText'];
            // dynamicQry = "SELECT FieldName,DefaultText, CASE WHEN NewText = 'FirstMonth' THEN (SELECT left(datename(month, dateadd(month,-2,{Params.FormView.ToDate})), 10)) +' - '+(SELECT FORMAT(getdate(), 'yy')) WHEN NewText = 'SecondMonth' THEN (SELECT left(datename(month, dateadd(month,-1,{Params.FormView.ToDate})), 10)) +' - '+(SELECT FORMAT(getdate(), 'yy')) WHEN NewText = 'CurrentMonth' THEN (SELECT left(datename(month, dateadd(month,0,getdate())), 10)) +' - '+(SELECT FORMAT(getdate(), 'yy')) ELSE  NewText END AS NewText, ColumnWidth,Alignment,HForeColor,HBackColor,RForeColor,RBackColor,ARForeColor,ARBackColor,HFont,HFontSize,HFontStyle,RFont,RFontSize,RFontStyle,DisplayNo, ScreenName,HForeColorName,HBackColorName,RForeColorName,RBackColorName,ARForeColorName,ARBackColorName,DataMember,IsHidden,HeaderHeight,RowHeight, GridBackColorName,GridBackColor,ScrollBarWidth,solutionname,Language,ts,FieldControl,DataMemberType,ColumnUnit,ParentName,Header,LineIndex,IsSearch,SearchType, SearchControl,AccessLevel,DefaultWidth,HAlignment,ShowBorder,BorderColor FROM listconfig where screenname = 'Web_DashBoard_LISTVIEW_LstUBA_Dynamic'";
            dynamicQry = formatQueryString(dynamicQry, dynamicScrName);
            Params.FormView == ""
            //execute(qry);
            //executeQry;
        }
        ///
        url = url == undefined || url == "" ? url_GetListConfig : url;
        //  scrName = currentScreenName; //tab group problem
        scrName = scrName;


        ///

        var _sName = scrName;
        if (fieldName != null && fieldName != "")
            _sName = scrName + "_LISTVIEW_" + fieldName;
        var lcquery = "select * from listconfig where screenname ='" + _sName + "' and Language ='" + Language + "' and (AccessLevel is null or AccessLevel ='" + AccessLevel + "') order by displayno";
        if (dynamicQry != null && dynamicQry != "")
            lcquery = dynamicQry + " and Language = '" + Language + "' and(AccessLevel is null or AccessLevel = '" + AccessLevel + "') order by displayno";

        FormListConfiginfo("ListConfig : " + lcquery);
        ///
        $.ajax({
            type: 'POST',
            //url: url_GetListConfig,
            url: url,
            data: { ScreenName: scrName, FieldName: fieldName, qry: dynamicQry },//now command 02.06.2019
            //  data: { ScreenName: screenFieldName, FieldName: '' },
            async: false,
            success: function (data) {
                _ispagination = false;
                // HERE SESSION EXPIRED ... 
                if (data == null || data == 'undefined') {
                    //window.location = "../Login/Login/";
                }
                else if (data.length == 0) {
                    //window.location = "../Login/Login/";
                }
                // HERE SESSION EXPIRED ... 
                else {
                    arrList = [];
                    FormListConfigClearArrayList();
                    data = $.parseJSON(data);
                    $("#" + theadId).empty();
                    $("#" + ttbody).empty();
                    $("#" + tfoot).empty();

                    var htm = '';
                    htm = '<tr  class="tablehead">';
                    for (var i = 0; i < data.length; i++) {

                        var isEdit = "";
                        try {
                            isEdit = String(localStorage.getItem('isEdit'));
                        } catch (e) {

                        }
                        if (data[i].FieldName == "Swap" && isEdit == 'no')
                            continue;

                        var widthPixel = (1105.61 / 100) * data[i].ColumnWidth;

                        ColumnWidth.push(widthPixel);
                        FLIsHiddenList.push(data[i].IsHidden);

                        if (data[i].FieldName.toLowerCase() == "isdynamic") {
                            _isdynamic = true;
                        }
                        else if (data[i].FieldName.toLowerCase() == "ispagination") {
                            _ispagination = true;
                        }
                        else if (data[i].IsHidden != 1 && data[i].ColumnWidth != 0) {
                            if (data[i].NewText.replace("\t", "").toLowerCase() != "create new") {
                                listdata = {};
                                listdata.FieldName = data[i].FieldName;
                                listdata.ScreenName = data[i].ScreenName;
                                listdata.DefaultText = data[i].DefaultText;
                                listdata.NewText = data[i].NewText;
                                widthPixel = (1105.61 / 100) * data[i].ColumnWidth;

                                listdata.ColumnWidth = widthPixel + "px";
                               // listdata.ColumnWidth = data[i].ColumnWidth + "%";
                                //listdata.ColumnWidth = data[i].ColumnWidth;
                                listdata.Alignment = data[i].Alignment;
                                listdata.HForeColor = argbToRGB(data[i].HForeColor);
                                listdata.HBackColor = argbToRGB(data[i].HBackColor);
                                listdata.RForeColor = argbToRGB(data[i].RForeColor);
                                listdata.RBackColor = argbToRGB(data[i].RBackColor);
                                listdata.ARForeColor = argbToRGB(data[i].ARForeColor);
                                listdata.ARBackColor = argbToRGB(data[i].ARBackColor);
                                listdata.HFont = data[i].HFont;
                                listdata.HFontSize = data[i].HFontSize + "px";
                                listdata.HFontStyle = data[i].HFontStyle;
                                listdata.RFont = data[i].RFont;
                                listdata.RFontSize = data[i].RFontSize + "px";
                                listdata.RFontStyle = data[i].RFontStyle;
                                listdata.DisplayNo = data[i].DisplayNo;
                                listdata.ScreenName = data[i].ScreenName;
                                listdata.HForeColorName = data[i].HForeColorName;
                                listdata.HBackColorName = data[i].HBackColorName;
                                listdata.RForeColorName = data[i].RForeColorName;
                                listdata.RBackColorName = data[i].RBackColorName;
                                listdata.ARForeColorName = data[i].ARForeColorName;
                                listdata.ARBackColorName = data[i].ARBackColorName;
                                //listdata.DataMember = data[i].DataMember;
                                listdata.IsHidden = data[i].IsHidden;
                                listdata.HeaderHeight = data[i].HeaderHeight;
                                listdata.RowHeight = data[i].RowHeight;
                                listdata.GridBackColorName = data[i].GridBackColorName;
                                listdata.GridBackColor = data[i].GridBackColor;
                                listdata.ScrollBarWidth = data[i].ScrollBarWidth;
                                listdata.solutionname = data[i].solutionname;
                                listdata.Language = data[i].Language;
                                listdata.ts = data[i].ts;
                                listdata.FieldControl = data[i].FieldControl;
                                listdata.DataMemberType = data[i].DataMemberType;
                                listdata.ColumnUnit = data[i].ColumnUnit;
                                listdata.ParentName = data[i].ParentName;
                                listdata.Header = data[i].Header;
                                listdata.LineIndex = data[i].LineIndex;
                                listdata.IsSearch = data[i].IsSearch;
                                listdata.isDisable = data[i].isDisable;
                                listdata.SearchType = data[i].SearchType;
                                listdata.SearchControl = data[i].SearchControl;
                                listdata.AccessLevel = data[i].AccessLevel;
                                listdata.DataMember = data[i].DataMember;
                                listdata.CursorType = data[i].CursorType;
                                try {
                                    listdata.MaxCharLength = data[i].MaxCharLength;
                                } catch (e) {

                                }
                                arrList.push(listdata);
                                headerCount++;

                                // htm += '<th  style="width:' + listdata.ColumnWidth + '; font-size:' + listdata.HFontSize + ';background-color:' + listdata.HBackColor + ';color:' + listdata.HForeColor + ';font-family: ' + listdata.HFont + ';text-align:' + getAlignStyle(listdata.Alignment) + ';">';


                                if (WebBrowserName == "Edge")//position: relative
                                    htm += '<th  id="' + CurrentScreen_TabScreen_Name + '_' + fieldName + '_' + data[i].DataMember + '" class="' + data[i].DataMember + '" name="' + data[i].DataMember + '" style="top: 0;  width:' + listdata.ColumnWidth + '; font-size:' + listdata.HFontSize + ';background-color:' + listdata.HBackColor + ';color:' + listdata.HForeColor + ';font-family: ' + listdata.HFont + ';text-align:' + getAlignStyle(listdata.Alignment) + ';">';
                                else
                                    htm += '<th  id="' + CurrentScreen_TabScreen_Name + '_' + fieldName + '_' + data[i].DataMember + '" class="' + data[i].DataMember + '" name="' + data[i].DataMember + '" style="top: 0;position: sticky; width:' + listdata.ColumnWidth + '; font-size:' + listdata.HFontSize + ';background-color:' + listdata.HBackColor + ';color:' + listdata.HForeColor + ';font-family: ' + listdata.HFont + ';text-align:' + getAlignStyle(listdata.Alignment) + ';">';
                                if (i == 0 && data[i].NewText == "") {
                                    //htm += "Checkbox";
                                    htm += '<div id="HeaderCheckBoxDiv">';
                                    //htm += '<input type="checkbox" id="HeaderCheckBox_1" name="HeaderCheckBox_1"  >';
                                    htm += "</div>";
                                    isPageMultiSelect = true;
                                }
                                else
                                    htm += '<label  id="th_' + CurrentScreen_TabScreen_Name + '_' + fieldName + '_' + data[i].DataMember + '" style="font-size:' + listdata.HFontSize + ';font-family: ' + listdata.HFont + ';margin-left:0px;padding-left:0px;" >' + data[i].NewText + '</label>';
                                   // htm += data[i].NewText;

                                htm += '</th>';

                                if (totalColumnWidth <= 1105.61) {
                                    totalColumnWidth = totalColumnWidth + ColumnWidth[i];
                                    // totalColumnWidth = totalColumnWidth + listdata.ColumnWidth;
                                    totalcolspan = (totalColumnWidth > 1105.61) ? totalcolspan : totalcolspan + 1;
                                }
                            }
                        }
                        else if (data[i].IsHidden == 1 || data[i].ColumnWidth == 0) {

                            listdata = {};
                            listdata.FieldName = data[i].FieldName;
                            listdata.ScreenName = data[i].ScreenName;
                            listdata.DefaultText = data[i].DefaultText;
                            listdata.NewText = data[i].NewText;
                            var widthPixel = (1105.61 / 100) * data[i].ColumnWidth;

                           // listdata.ColumnWidth = widthPixel + "px";
                            listdata.ColumnWidth = data[i].ColumnWidth + "%";
                            //listdata.ColumnWidth = data[i].ColumnWidth;
                            listdata.Alignment = data[i].Alignment;
                            listdata.HForeColor = argbToRGB(data[i].HForeColor);
                            listdata.HBackColor = argbToRGB(data[i].HBackColor);
                            listdata.RForeColor = argbToRGB(data[i].RForeColor);
                            listdata.RBackColor = argbToRGB(data[i].RBackColor);
                            listdata.ARForeColor = argbToRGB(data[i].ARForeColor);
                            listdata.ARBackColor = argbToRGB(data[i].ARBackColor);
                            listdata.HFont = data[i].HFont;
                            listdata.HFontSize = data[i].HFontSize + "px";
                            listdata.HFontStyle = data[i].HFontStyle;
                            listdata.RFont = data[i].RFont;
                            listdata.RFontSize = data[i].RFontSize + "px";
                            listdata.RFontStyle = data[i].RFontStyle;
                            listdata.DisplayNo = data[i].DisplayNo;
                            listdata.ScreenName = data[i].ScreenName;
                            listdata.HForeColorName = data[i].HForeColorName;
                            listdata.HBackColorName = data[i].HBackColorName;
                            listdata.RForeColorName = data[i].RForeColorName;
                            listdata.RBackColorName = data[i].RBackColorName;
                            listdata.ARForeColorName = data[i].ARForeColorName;
                            listdata.ARBackColorName = data[i].ARBackColorName;
                            //listdata.DataMember = data[i].DataMember;
                            listdata.IsHidden = data[i].IsHidden;
                            listdata.HeaderHeight = data[i].HeaderHeight;
                            listdata.RowHeight = data[i].RowHeight;
                            listdata.GridBackColorName = data[i].GridBackColorName;
                            listdata.GridBackColor = data[i].GridBackColor;
                            listdata.ScrollBarWidth = data[i].ScrollBarWidth;
                            listdata.solutionname = data[i].solutionname;
                            listdata.Language = data[i].Language;
                            listdata.ts = data[i].ts;
                            listdata.FieldControl = data[i].FieldControl;
                            listdata.DataMemberType = data[i].DataMemberType;
                            listdata.ColumnUnit = data[i].ColumnUnit;
                            listdata.ParentName = data[i].ParentName;
                            listdata.Header = data[i].Header;
                            listdata.LineIndex = data[i].LineIndex;
                            listdata.IsSearch = data[i].IsSearch;
                            listdata.isDisable = data[i].isDisable;
                            listdata.SearchType = data[i].SearchType;
                            listdata.SearchControl = data[i].SearchControl;
                            listdata.AccessLevel = data[i].AccessLevel;
                            listdata.DataMember = data[i].DataMember;
                            listdata.CursorType = data[i].CursorType;
                            try {
                                listdata.MaxCharLength = data[i].MaxCharLength;
                            } catch (e) {

                            }
                            arrList.push(listdata);

                            navigator.userAgent;
                            // htm += '<th  style="display:none;width:' + listdata.ColumnWidth + '; font-size:' + listdata.HFontSize + ';background-color:' + listdata.HBackColor + ';color:' + listdata.HForeColor + ';font-family: ' + listdata.HFont + ';text-align:' + getAlignStyle(listdata.Alignment) + ';">';
                            htm += '<th  style="top: 0; position: sticky; display:none;width:' + listdata.ColumnWidth + '; font-size:' + listdata.HFontSize + ';background-color:' + listdata.HBackColor + ';color:' + listdata.HForeColor + ';font-family: ' + listdata.HFont + ';text-align:' + getAlignStyle(listdata.Alignment) + ';">';
                            htm += data[i].NewText;
                            htm += '</th>';
                            // FLHeaderFieldNameArrayList.push(data[i].DataMember);
                        }
                    }

                    htm += '</tr>';
                    $("#" + theadId).append(htm);
                    //   arrfrm.push(FLHeaderFieldNameArrayList);
                    _objArray.arrList = arrList;

                    if (actionType == "LOOKUP" && isMultiSelect == true) {
                        try {
                            tblbody =  multiLookup_tblBody;

                            LookUpMultiSelected = [];

                            if (LookUpMultiSelected.length == 0) {
                                LookUpMultiSelected = [];
                                var _obj = {};
                                var obj = {};
                                //     var tblbody = document.getElementById(ttbody);
                                var textvalue = "";
                                var id = "";

                                //var listConfig = ListHeaderList['ListConfig_' + ttbody];
                                // id = listConfig[1].FieldName;
                                id = _objArray.arrList[1].DataMember;

                                for (var c = 0; c < tblbody.rows.length - 1; c++) {
                                    //if (arrList[0].ScreenName != _objArray.arrList[1].ScreenName)
                                    //   break;
                                    //id = dataMember;//_objArray.arrList[1].DataMember;
                                    //newly added.By.M.22.06.2023 - pvmng
                                    //id = _objArray.arrList[1].DataMember;
                                    //changes done by nisha 30.04.2024
                                    //id = dataMember;
                                    // COMMENTED 04.09.2020 
                                    if (tblbody.rows[c].cells.length) {
                                        // COMMENTED 15.02.2021
                                        //textvalue = tblbody.rows[c].cells[id].childNodes['0'].children[id] == undefined ? tblbody.rows[c].cells[id].children[id].value : tblbody.rows[c].cells[id].childNodes['0'].children[id].value;
                                        // textvalue = tblbody.rows[c].cells[id].childNodes['0'].children[id].value;

                                        try {
                                            textvalue = tblbody.rows[c].cells[id].childNodes['0'] == undefined ? "" : tblbody.rows[c].cells[id].childNodes['0'].children[id] == undefined ? tblbody.rows[c].cells[id].children[id].value : tblbody.rows[c].cells[id].childNodes['0'].children[id].value;
                                        }
                                        catch (e) {
                                            //alert('error ---> ' + e);
                                            //textvalue = tblbody.rows[0].cells[id].innerText;
                                            if (tblbody.rows[c].cells[id].childNodes['0'] == undefined)
                                                textvalue = "";
                                            else
                                                textvalue = tblbody.rows[c].cells[id].childNodes['0'].children == undefined ? tblbody.rows[c].cells[id].childNodes['0'].data : "";
                                        }


                                        _obj = {};
                                        _obj[id] = textvalue;
                                        LookUpMultiSelected.push(_obj);
                                        TempLookUpMultiSelected.push(_obj);

                                        obj = {};
                                        obj[id] = textvalue;
                                        obj["UserNo"] = tempUserNo;
                                        ListSelectedId.push(obj);
                                    }

                                    //textvalue = tblbody.rows[c].cells[id].childNodes['0'].children[id] == undefined ? tblbody.rows[c].cells[id].children[id].value : tblbody.rows[c].cells[id].childNodes['0'].children[id].value;
                                    //// textvalue = tblbody.rows[c].cells[id].childNodes['0'].children[id].value;
                                    //_obj = {};
                                    //_obj[id] = textvalue;
                                    //LookUpMultiSelected.push(_obj);
                                    //TempLookUpMultiSelected.push(_obj);

                                    //obj = {};
                                    //obj[id] = textvalue;
                                    //obj["UserNo"] = tempUserNo;
                                    //ListSelectedId.push(obj);
                                }
                            }
                        }
                        catch { }
                    }

                    ListHeaderList['ListConfig_' + CurrentScreen_TabScreen_Name + '_' + fieldName] = arrList;
                    //now developed
                    ListHeaderList['ListConfig_' + ttbody] = arrList;
                    ListHeaderList['HeaderCountListConfig_' + ttbody] = headerCount;

                    var listParameter = {};
                    listParameter.ttbody = ttbody;
                    listParameter.tfoot = tfoot;
                    listParameter.scrName = scrName;
                    listParameter.pageNumber = 1;
                    listParameter.SearchId = '';
                    listParameter.fieldName = fieldName;
                    listParameter.actionType = actionType;
                    FieldName = fieldName;
                    objListParameter['ListParameter_' + ttbody] = listParameter;
                    objListParameterFieldName.push(fieldName);
                    FormListConfigRow(ttbody, tfoot, scrName, 1, '', fieldName, actionType, screenFieldName);
                }
            },
            error: function () {

            }
        });
    }
    catch (e) {
        //alert('Your Session is expired.');
        //window.location = "../Login/Login/";
    }


}

function FormListConfigRowN(ttbody, tfoot, scrName, pageNumber, SearchId, fieldName, actionType, screenFieldName) {
    if (scrName == "Web_DashBoard") {
        var arrayfrm = _objArray.arrForm;
        if (arrayfrm != undefined) {
            for (var k = 0; k < arrayfrm.length; k++) {
                if (arrayfrm[k].fieldControl == "LISTVIEW") {
                    setListValue("", arrayfrm[k].fieldName, currentRowClickCount, _ttbody)
                }
                else
                    FormView[arrayfrm[k].fieldName] = getFormComponentValue(arrayfrm[k].fieldName); //ARRAYOPERATION
            }
            Params.FormView = FormView;
        }
    }
    //if (scrName == "Web_DashBoard")
    //    Params.FormView = dataFieldIdList

    searchOption = "";
    if (ProjectName.toLowerCase() == "frostfood" && scrName == "CreditNoteMappingImage") {

    }
    else {
        for (var i = 0; i < searchOptionArray.length; i++) {
            searchOption = searchOption + searchOptionArray[i].SearchQuery
        }
    }

    sortOption = " ";
    if (ProjectName.toLowerCase() == "frostfood" && scrName == "CreditNoteMappingImage") {

    }
    else {
        for (var i = 0; i < sortOptionArray.length; i++) {
            if (sortOption != " ")
                sortOption = sortOption + " , ";
            sortOption = sortOption + sortOptionArray[i].OrderByQuery
        }
    }

    if (sortOptionArray.length == 0)
        sortOption = "";

    var sName = "";

    // FOR THAI LANGUAGE PURPOSE
    //Param = System.Web.HttpUtility.UrlDecode(Param);
    //data = System.Web.HttpUtility.UrlDecode(data);


    if (FieldName != null && fieldName != "")
        screenName = scrName + "_LISTVIEW_" + fieldName;
    if (actionType == "LOOKUP") //temp
        screenName = scrName + "_FORM_LOOKUP_LISTVIEW_" + fieldName;
    screenName = screenName == "" ? scrName : screenName;
    sName = screenName;

    var systemValue = 10;

    var PageSize = systemValue == "" ? 10 : parseInt(systemValue);

  //  if (ProjectName.toLowerCase() == "jsu" && screenName.toLowerCase() == "inventoryform")
     //   PageSize = 20;

    var PageNumber = (pageNumber == null ? 1 : parseInt(pageNumber));

    var query = "";
    var cntQuery = "";
    var queryText = getString['QueryConfig_' + sName];
    var groupby = getString['QueryConfig_' + sName + '_GroupText'];
    var orderby = getString['QueryConfig_' + sName + '_OrderText'];

    if (sortOption == "") {
        //Newly addded by.M 02.09.2021 - if logic only
        //green capsule - inv adj bin lookup search issue
        if (queryText.indexOf("exec ") >= 0) {//&& orderby != "") {
            query = queryText + ", '" + searchOption.replace("'%", "''%").replace("%'", "%''") + " " + groupby + " " + orderby + "'";
        }
        else
            query = queryText + " " + searchOption + " " + groupby + " " + orderby;
    }
    else {
        if (queryText.indexOf("exec ") >= 0) {//&& orderby != "") {
            query = queryText + ", '" + searchOption.replace("'%", "''%").Replace("%'", "%''") + " " + groupby + " order by" + sortOption + "'";
        }
        else
            query = queryText + " " + searchOption + " " + groupby + " order by" + sortOption;
    }
    cntQuery = query;
    //select  * from  customer order by custNo offset 10 rows Fetch next 10 rows only
    if (sName.split("Form_LISTVIEW").length > 1 || sName.split("LISTVIEW")[0].split('_').length == 3) {
        if (_ispagination == true) {//stock take sandlSnapshot check
            query = query + "," + "' offset  " + ((PageNumber - 1) * PageSize) + "  rows Fetch next " + PageSize + " rows only'"; //' limit 0, 100';
            cntQuery = cntQuery + ",''";
        }
        //if (isdynamic == false)
        //    query = query + " offset  " + ((PageNumber - 1) * PageSize) + "  rows Fetch next " + PageSize + " rows only"; //' limit 0, 100';
    }
    else {
        cntQuery = "";
        query = query + " offset  " + ((PageNumber - 1) * PageSize) + "  rows Fetch next " + PageSize + " rows only"; //' limit 0, 100';
    }
    var query1 = formatQueryString(query, scrName);
    var logquery = query1;
    var query2 = formatQueryString("select floor(count(*) /" + PageSize + ") + case when (count(*) %" + PageSize + ") = 0 then 0 else 1 end  as cnt from (" + queryText + " " + searchOption + " " + groupby + ") rs");
    if (cntQuery != "") query2 = formatQueryString(cntQuery);

    var asyncvar;
    if (scrName.toString().toLowerCase() == "inventoryform" && ProjectName.toString().toLowerCase() == "khind") {
        _LoadingImageOpen();
        asyncvar = true;
    }
    else
        asyncvar = false;

    query1 = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(query1), encryptkey, { keySize: 128 / 8, iv: encryptiv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    query2 = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(query2), encryptkey, { keySize: 128 / 8, iv: encryptiv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    //var params = "{'query1':'" + query1 + "','query2':'" + query2 + "','screenName':'" + scrName + "','ispagination':'" + _ispagination + "'}";
    var params = "{'query1':'" + query1 + "','query2':'" + query2 + "','screenName':'" + sName + "','ispagination':'" + _ispagination + "'}";

    $.ajax({
        type: 'POST',
        url: url_GetListValueN,
        data: params,
        contentType: "application/json;charset=utf-8",
        async: asyncvar,
        success: function (result) {

            $("#" + ttbody).empty();
            $('#' + tfoot).empty();
            objAddDynamicListCount['ListConfig_' + ttbody] = -1;
            paginationCount = 0;
            if (_isList_FieldName == true && fieldName.split('_').length == 2) {
                fieldName = fieldName.split('_')[0];
            }
            if (result.List != "") {
                SetListData(ttbody, tfoot, scrName, pageNumber, SearchId, fieldName, actionType, result);
            }
            else {
                CreateList(ttbody, tfoot, scrName, pageNumber, SearchId, fieldName, actionType, result);
                //rowRefresh();
            }
            if (scrName.toString().toLowerCase() == "inventoryform" && ProjectName.toString().toLowerCase() == "khind") {
                _LoadingImageClose();
            }


        },
        error: function (xhr) {
            alert("Error occurred while loading the image. " + xhr.responseText);
        }

    });

    FormListConfiginfo("Get ListConfig Data : " + logquery);
    info_ALT(formListCofiginformation, "FormListConfigInfo");

}

function FormListConfigRow(ttbody, tfoot, scrName, pageNumber, SearchId, fieldName, actionType, screenFieldName) {
    //if (_action == "create") {
    //    CreateList(ttbody, tfoot, scrName, pageNumber, SearchId, fieldName, actionType, 1);
    //    return;
    //}

    try {
        var arrayfrm = _objArray.arrForm;
        if (arrayfrm != undefined) {
            for (var k = 0; k < arrayfrm.length; k++) {
                if (arrayfrm[k].fieldControl == "LISTVIEW") {
                    setListValue("", arrayfrm[k].fieldName, currentRowClickCount, ttbody)
                }
                else
                    FormView[arrayfrm[k].fieldName] = getFormComponentValue(arrayfrm[k].fieldName); //ARRAYOPERATION
            }
            dataFieldIdList = FormView;
        }

        // var tableDivId = "tableDiv_" + ttbody.replace(/ListBodyDivId_/g, "");
        searchOption = "";
        for (var i = 0; i < searchOptionArray.length; i++) {
            searchOption = searchOption + searchOptionArray[i].SearchQuery
        }

        sortOption = " ";
        for (var i = 0; i < sortOptionArray.length; i++) {
            if (sortOption != " ")
                sortOption = sortOption + " , ";
            sortOption = sortOption + sortOptionArray[i].OrderByQuery
        }
        if (sortOptionArray.length == 0)
            sortOption = "";

        PageLoadinginfo("ListConfig listvalue query start: ");
        if (scrName == "Web_DashBoard")
            Params.FormView = dataFieldIdList

        var asyncvar;
        if (scrName.toString().toLowerCase() == "inventoryform" && ProjectName.toString().toLowerCase() == "khind") {
            _LoadingImageOpen();
            asyncvar = true;
        }
        else
            asyncvar = false;



        $.ajax({
            type: 'POST',
            url: url_GetListQuery,//url_GetListValue,
            data: { ScreenName: scrName, pageNumber: pageNumber, searchOption: searchOption, id: _lookUpId.split('_')[0], FieldName: fieldName, ActionType: actionType, SortOption: sortOption, isdynamic: _isdynamic, ispagination: _ispagination },
            async: asyncvar,
            success: function (result) {

                var qry = formatQueryString(result.query, "");
                var countQuery = formatQueryString(result.countQuery, "");
                var cntQuery = formatQueryString(result.cntQuery, "");

                qry = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(qry), encryptkey, { keySize: 128 / 8, iv: encryptiv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
                countQuery = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(countQuery), encryptkey, { keySize: 128 / 8, iv: encryptiv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
                cntQuery = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(cntQuery), encryptkey, { keySize: 128 / 8, iv: encryptiv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });

                var params = "{'query':'" + qry + "','countQuery':'" + countQuery + "','cntQuery':'" + cntQuery + "','ScreenName':'" + scrName + "','FieldName':'" + fieldName + "','ActionType':'" + actionType + "','ispagination':'" + _ispagination + "'}";
                $.ajax({
                    type: 'POST',
                    url: url_GetListValue,
                    data: params,
                    contentType: "application/json;charset=utf-8",
                    dataType: "json",
                    async: asyncvar,
                    success: function (result) {
                        PageLoadinginfo("ListConfig listvalue execute query ");

                        $("#" + ttbody).empty();
                        $('#' + tfoot).empty();
                        objAddDynamicListCount['ListConfig_' + ttbody] = -1;
                        paginationCount = 0;
                        if (_isList_FieldName == true && fieldName.split('_').length == 2) {
                            fieldName = fieldName.split('_')[0];
                        }

                        if (result.List != "" && result.List != "[]") {
                            SetListData(ttbody, tfoot, scrName, pageNumber, SearchId, fieldName, actionType, result);
                            if (ProjectName.toLowerCase() == "ofii" && currentScreenName == "MDTVehicleList") {
                                if (_isdynamic) { //by.M ffb no data but unwanted row
                                    CreateList(ttbody, tfoot, scrName, pageNumber, SearchId, fieldName, actionType, result);
                                    //newly added by.M28.01.2022 - 13.JSU PO lookup first time value not assign
                                    //objDefaultExecute = {};
                                }
                            }
                        }
                        else {
                            if (_isdynamic) { //by.M ffb no data but unwanted row
                                CreateList(ttbody, tfoot, scrName, pageNumber, SearchId, fieldName, actionType, result);
                                //newly added by.M28.01.2022 - 13.JSU PO lookup first time value not assign
                                objDefaultExecute = {};
                            }
                        }
                        if (scrName.toString().toLowerCase() == "inventoryform" && ProjectName.toString().toLowerCase() == "khind") {
                            _LoadingImageClose();
                        }

                        //Below code added by sundar 03/12/2024
                        var countRows = result.countRows == null ? 0 : $.parseJSON(result.countRows)[0].cnt;

                        if (parseInt(countRows) == 0) {
                            var ele = document.getElementById("HeaderCheckBox_1");
                            ele.remove();
                        }
                        else {
                            document.getElementById("HeaderCheckBox_1").checked = false;
                        }

 //End 

                    },
                    error: function (xhr) {
                        if (location.host == "localhost:52063")
                            alert("Error occurred while loading the List. " + xhr.responseText);

                    }
                });

            },
            error: function (xhr) {
                if (location.host == "localhost:52063")
                    alert("Error occurred while loading the List. " + xhr.responseText);

            }
        });

    }
    catch (e) {

        //alert('Your Session is expired.');
        //window.location = "../Login/Login/";
        //PageLogOut();
    }


}


function FormListConfigRow_05052022(ttbody, tfoot, scrName, pageNumber, SearchId, fieldName, actionType, screenFieldName) {
    //FormListConfigRowN(ttbody, tfoot, scrName, pageNumber, SearchId, fieldName, actionType, screenFieldName);
    //return;
    try {
        var arrayfrm = _objArray.arrForm;
        if (arrayfrm != undefined) {
            for (var k = 0; k < arrayfrm.length; k++) {
                if (arrayfrm[k].fieldControl == "LISTVIEW") {
                    setListValue("", arrayfrm[k].fieldName, currentRowClickCount, _ttbody)
                }
                else
                    FormView[arrayfrm[k].fieldName] = getFormComponentValue(arrayfrm[k].fieldName); //ARRAYOPERATION
            }
            dataFieldIdList = FormView;
        }

        // var tableDivId = "tableDiv_" + ttbody.replace(/ListBodyDivId_/g, "");
        searchOption = "";
        for (var i = 0; i < searchOptionArray.length; i++) {
            searchOption = searchOption + searchOptionArray[i].SearchQuery
        }

        sortOption = " ";
        for (var i = 0; i < sortOptionArray.length; i++) {
            if (sortOption != " ")
                sortOption = sortOption + " , ";
            sortOption = sortOption + sortOptionArray[i].OrderByQuery
        }
        if (sortOptionArray.length == 0)
            sortOption = "";

        PageLoadinginfo("ListConfig listvalue query start: ");
        if (scrName == "Web_DashBoard")
            Params.FormView = dataFieldIdList

        var asyncvar;
        if (scrName.toString().toLowerCase() == "inventoryform" && ProjectName.toString().toLowerCase() == "khind") {
            _LoadingImageOpen();

            asyncvar = true;
        }
        else {
            asyncvar = false;
        }


        $.ajax({
            type: 'POST',
            url: url_GetListValue,
            //data: { data: escape(JSON.stringify(data)) },
            // COMMENTED 10.09.2020 
            data: { data: encodeURIComponent(JSON.stringify(dataFieldIdList)), Param: encodeURIComponent(JSON.stringify(Params)), ScreenName: scrName, pageNumber: pageNumber, searchOption: searchOption, id: _lookUpId.split('_')[0], FieldName: fieldName, ActionType: actionType, SortOption: sortOption, isdynamic: _isdynamic, ispagination: _ispagination },
            //data: { data: escape(JSON.stringify(dataFieldIdList)), Param: escape(JSON.stringify(Params)), ScreenName: scrName, pageNumber: pageNumber, searchOption: searchOption, id: _lookUpId.split('_')[0], FieldName: fieldName, ActionType: actionType, SortOption: sortOption, isdynamic: _isdynamic },
            // data: { data: JSON.stringify(dataFieldIdList), ScreenName: screenFieldName, pageNumber: pageNumber, searchOption: searchOption, id: _lookUpId.split('_')[0], FieldName: '', ActionType: '' },
            //async: false,
            async: asyncvar,
            success: function (result) {

                PageLoadinginfo("ListConfig listvalue execute query ");

                TiAPIinfo('GetListValue  ---> ' + result);

                //old
                //ListCreateOld(ttbody, tfoot, scrName, pageNumber, SearchId, fieldName, actionType, result);
                //-- CreateList(ttbody, tfoot, scrName, pageNumber, SearchId, fieldName, actionType, result);

                //recent
                $("#" + ttbody).empty();
                $('#' + tfoot).empty();
                objAddDynamicListCount['ListConfig_' + ttbody] = -1;
                //CreateList(ttbody, tfoot, scrName, pageNumber, SearchId, fieldName, actionType, result);
                paginationCount = 0;

                if (_isList_FieldName == true && fieldName.split('_').length == 2) {
                    fieldName = fieldName.split('_')[0];
                }

                if (result.List != "") {
                    SetListData(ttbody, tfoot, scrName, pageNumber, SearchId, fieldName, actionType, result);
                }
                else {
                    CreateList(ttbody, tfoot, scrName, pageNumber, SearchId, fieldName, actionType, result);
                    //newly added by.M28.01.2022 - 13.JSU PO lookup first time value not assign
                    objDefaultExecute = {};
                }
                if (scrName.toString().toLowerCase() == "inventoryform" && ProjectName.toString().toLowerCase() == "khind") {
                    _LoadingImageClose();
                }

            },
            error: function (xhr) {


                alert("Error occurred while loading the image. "
                    + xhr.responseText);

                //alert("Error occurred while list loading. "
                //   + xhr.responseText);

                //window.location = "/Login/Login/";
            }

        });

    }
    catch (e) {

        //alert('Your Session is expired.');
        //window.location = "../Login/Login/";
        //PageLogOut();
    }


}

//Newly added by.M 07.02.2023
function ExportFormListConfig(scrName, queryText, groupby, orderby) {
    var query = '';
    try {
        searchOption = "";
        for (var i = 0; i < searchOptionArray.length; i++) {
            searchOption = searchOption + searchOptionArray[i].SearchQuery
        }

        sortOption = " ";
        for (var i = 0; i < sortOptionArray.length; i++) {
            if (sortOption != " ")
                sortOption = sortOption + " , ";
            sortOption = sortOption + sortOptionArray[i].OrderByQuery
        }
        if (sortOptionArray.length == 0)
            sortOption = "";

        if (sortOption == "") {
            if (queryText.indexOf("exec ") >= 0 || queryText.indexOf("EXEC ") >= 0) {
                if (searchOption != "")
                    query = queryText + ", '" + searchOption.replace("'%", "''%").replace("%'", "%''") + " " + groupby + " " + orderby + "'";
                else
                    query = queryText;
                    }
            else
                query = queryText + " " + searchOption + " " + groupby + " " + orderby;
        }
        else {
            if (queryText.indexOf("exec ") >= 0 || queryText.indexOf("EXEC ") >= 0)
                query = queryText + ", '" + searchOption.replace("'%", "''%").Replace("%'", "%''") + " " + groupby + " order by" + sortOption + "'";
            else
                query = queryText + " " + searchOption + " " + groupby + " order by" + sortOption;
        }

        console.log(url_ExportListData);

        _LoadingImageOpen();
        query = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(query), encryptkey, { keySize: 128 / 8, iv: encryptiv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
        var params = "{'query':'" + query + "','ScreenName':'" + scrName + "'}";
        console.log(params);

        $.ajax({
            type: 'POST',
            url: url_ExportListData,//"/Common/ExportListData/",
            data: params,
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                var btns = {};
                btns["Ok"] = function (e) {
                    $(this).dialog("close");
                }
                result = result + '.xlsx';
                $('<div></div>').appendTo('body')
                    .html('<div><h6><a href="' + result + '"    style="color: blue;" download  >' + scrName + '</a></h6></div>').dialog({
                        modal: true, title: "Export file(s) Generated", zIndex: 10000, autoOpen: true,
                        width: '35%', resizable: false,
                        buttons: btns
                    });

                _LoadingImageClose()
            },
            error: function (xhr) {
                if (location.host == "localhost:52063")
                    alert("Error occurred while loading the List. " + xhr.responseText);
                _LoadingImageClose()

            }
        });
    }
    catch (e) {
    }
}
// COMMENTED 24.03.2021 ==================================

function _LoadingImageClose() {
    //$("#LoadingImg").empty();
    ////LoadingImg
    //$('#LoadingImg').fadeOut();
    document.getElementById("LoadingImg").innerHTML = "";
    document.getElementById("LoadingImg").style.display = "none";
}

function _LoadingImageOpen() {
    try {
        //$("#LoadingImg").show();
        document.getElementById("LoadingImg").style.display = "block";
        //alert('sdfe');
        var htm = '<img src="../Images/ajax-loader(4).gif"  style="margin-left: 15px;"/>'
        htm += '<br>';
        htm += 'Please wait...';
        document.getElementById("LoadingImg").innerHTML = htm;
        //$("#LoadingImg").append(htm)

        //$('#LoadingImg').fadeIn();

    } catch (e) {
        console.log(e);
        //alert(e);
    }

}


// COMMENTED 24.03.2021 ==================================

function ListExport(dataMember) {
    var scrName = _screenName;
    var fieldName = FieldName;
    var defaultValue = '';
    var actionType = '';
    var arrayfrm = _objArray.arrForm;
    var newText = "";
    if (arrayfrm != undefined) {
        for (var k = 0; k < arrayfrm.length; k++) {
            if (arrayfrm[k].fieldName == dataMember) {
                newText = arrayfrm[k].NewText;
                defaultValue = arrayfrm[k].DefaultValue;
            }
            FormView[arrayfrm[k].fieldName] = getFormComponentValue(arrayfrm[k].fieldName); //ARRAYOPERATION
        }
        dataFieldIdList = FormView;
    }

    searchOption = "";
    TiAPIinfo('searchOptionArray.length ---> ' + searchOptionArray.length);
    for (var i = 0; i < searchOptionArray.length; i++) {
        searchOption = searchOption + searchOptionArray[i].SearchQuery
    }

    sortOption = " ";
    TiAPIinfo('searchOptionArray.length ---> ' + sortOptionArray.length);
    for (var i = 0; i < sortOptionArray.length; i++) {
        if (sortOption != " ")
            sortOption = sortOption + " , ";
        sortOption = sortOption + sortOptionArray[i].OrderByQuery
    }
    if (sortOptionArray.length == 0)
        sortOption = "";
    TiAPIinfo('searchOption  ---> ' + searchOption);
    TiAPIinfo('FormView Data --> ' + JSON.stringify(dataFieldIdList));

    PageLoadinginfo("ListConfig listvalue query start: ");
    LoadingImageDownloadOpen();
    $.ajax({
        type: 'POST',
        url: url_ListExport,
        data: { data: JSON.stringify(dataFieldIdList), Param: JSON.stringify(Params), ScreenName: scrName, searchOption: searchOption, FieldName: fieldName, ActionType: actionType, SortOption: sortOption, defaultValue: defaultValue, newText: newText },
        //  async: false,
        success: function (result) {
            PageLoadinginfo("ListConfig listvalue execute query ");
            TiAPIinfo('GetListValue  ---> ' + result);
            LoadingImageClose();
            var btns = {};
            btns["Ok"] = function (e) {
                $(this).dialog("close");
            }
            var sheetName = result.split('/')[result.split('/').length - 1];
            $('<div></div>').appendTo('body')
                .html('<div><h6><a href="' + result + '" style="color: blue" download  >' + sheetName + '</a></h6></div>').dialog({
                    modal: true, title: scrName + " file(s) Generated", zIndex: 10000, autoOpen: true,
                    width: '20%', resizable: false,
                    buttons: btns
                });

        },
        error: function (xhr) {
            debugger;
            LoadingImageClose();

            //alert("Error occurred while loading the image. "
            //    + xhr.responseText);

            alert("Error occurred while list loading. "
                + xhr.responseText);
        }

    });
}



var ttbody1 = ''; var tfoot1 = ''; var scrName1 = ''; var countRows1 = ''; var SearchId1 = ''; var fieldName1 = ''; var actionType1 = '';
var ttbodycnt1 = 0;
var paginationCount = 0;
function CreateList(ttbody, tfoot, scrName, pageNumber, SearchId, fieldName, actionType, result, isLastLineCombobox, vBackRoundColor) {
   // if (scrName == "invoicenewform" || scrName == "invoiceform")
        num = num + 1;
    
    info_ALT_TxtFileName("CreateList start", "PerformActionInfoLog");
    try {
        isLastLineCombobox = isLastLineCombobox == undefined || isLastLineCombobox == "" ? 0 : isLastLineCombobox;
        //var ddd = ttbody + " - " + tfoot + " - " + scrName + " - " + pageNumber + " - " + SearchId + " - " + fieldName + " - " + actionType + " - " + result;
        var ttableId = "table_" + ttbody.replace(/ListBodyDivId_/g, "");
        DropDownIdList = [];
        var listConfig = ListHeaderList['ListConfig_' + ttbody];
        objAddDynamicListCount['ListConfig_' + ttbody] = objAddDynamicListCount['ListConfig_' + ttbody] == undefined ? 0 : objAddDynamicListCount['ListConfig_' + ttbody] + 1;
        addCount = objAddDynamicListCount['ListConfig_' + ttbody];
        var trowCount = addCount;
        var htm = '';
        var maxCharLength = '';
        var isDataMemberTypeInt = false;
        var RowHeight = 50 + "px";
        if (listConfig.length > 0)
            RowHeight = listConfig[0].RowHeight + "px";
        //htm += '<tr onclick="rowItemClicked(this,\'' + fieldName + '\',\'' + addCount + '\' ,\'' + ttbody + '\',\'' + ttableId + '\');" id="' + fieldName + addCount + '" style="z-index: 0;" background-color:' + listConfig[0].RBackColor + ' class="tablecell trRow_' + addCount + '" id="trRow_' + addCount + '" >';
        //htm += '<tr onclick="rowItemClicked(this,\'' + fieldName + '\',\'' + addCount + '\' ,\'' + ttbody + '\',\'' + ttableId + '\');" id="' + fieldName + addCount + '" style="height:' + RowHeight + ';  word-wrap: break-word;z-index: 0;background-color:white;"   class="tablecell trRow_' + ttbody + '_' + addCount + '" id="trRow_' + addCount + '" >';

        if (isSortable == 'sortable')
            htm += '<tr draggable="true" ondragstart="start()" ondragover="dragover()" onkeydown="keyDowned(this,\'' + fieldName + '\',\'' + addCount + '\' ,\'' + ttbody + '\',\'' + ttableId + '\');" onclick="rowItemClicked(this,\'' + fieldName + '\',\'' + addCount + '\' ,\'' + ttbody + '\',\'' + ttableId + '\');" id="' + fieldName + addCount + '" style="word-wrap: break-word;z-index: 0;"   class="tablecell trRow_' + ttbody + '_' + addCount + '" id="trRow_' + addCount + '" >';
        else
            htm += '<tr onkeydown="keyDowned(this,\'' + fieldName + '\',\'' + addCount + '\' ,\'' + ttbody + '\',\'' + ttableId + '\');" onclick="rowItemClicked(this,\'' + fieldName + '\',\'' + addCount + '\' ,\'' + ttbody + '\',\'' + ttableId + '\');" id="' + fieldName + addCount + '" style="word-wrap: break-word;z-index: 0;"   class="tablecell trRow_' + ttbody + '_' + addCount + '" id="trRow_' + addCount + '" >';

        var ftype = "";
        var fname = "";

        var isReadOnly = false;

        for (var j = 0; j < listConfig.length; j++) {
            if (isBtnFormPopUpTable == false || listConfig[j].DataMember.replace("\t", "").toLowerCase() != 'action') {
                var colName = listConfig[j].DataMember.replace("\t", "");
                var fieldControl = listConfig[j].FieldControl.replace("\t", "");
                var vForeColor = argbToRGB(listConfig[j].RForeColor);
                var vBackColor = argbToRGB(listConfig[j].RBackColor);
                var cursorType = listConfig[j].CursorType;
                var isDisable = false;

                try {
                    isDisable = listConfig[j].isDisable;
                } catch (e) {

                }

                fontWeight = GetFontStyle(listConfig[j].RFontStyle);

                if (listConfig[j].FieldControl == "TEXTBOX" || listConfig[j].FieldControl == "PASSWORD")
                    requiredMessage = "Enter the " + listConfig[j].NewText.replace('*', '');
                else if (listConfig[j].FieldControl == "LOOKUP" || listConfig[j].FieldControl == "MULTISELECTLOOKUP")
                    requiredMessage = "Select the " + listConfig[j].NewText.replace('*', '');
                else
                    requiredMessage = "";
                //requiredMessage = "";
                /*if (fieldControl.toLowerCase() != "imageupload") { ftype = ""; fname = ""; }*/
                isReadOnly = false;

                for (var z = 0; z < roFields.length; z++) {
                    if (roFields[z] == listConfig[j].DataMember)
                        isReadOnly = true;
                }

                switch (fieldControl.toLowerCase()) {
                    case "textbox":
                        maxCharLength = listConfig[j].MaxCharLength == undefined || listConfig[j].MaxCharLength == null ? "" : listConfig[j].MaxCharLength;
                        //if (scrName == "SystemListList" && listConfig[j].DataMember == "SystemValue")
                        //{
                        //    htm += '<td  id="' + listConfig[j].DataMember + '" style="width:' + listConfig[j].ColumnWidth + ';font-family: ' + listConfig[j].RFont + ';font-size:' + listConfig[j].RFontSize + ';color: ' + listConfig[j].RForeColor + ' ;background-color:' + listConfig[j].RBackColor + '; text-align:' + getAlignStyle(listConfig[j].Alignment) + ';' + fontWeight + '">';
                        //    //htm += '<input style="z-index: 99;" type="checkbox" id="' + listConfig[j].DataMember + '" name="' + listConfig[j].DataMember + '"  onclick="listCheckBoxClickFunction(this,\'' + listConfig[j].DataMember + '\',' + trowCount + ',\'' + ttbody + '\',\'' + tfoot + '\'));listCheckBoxValueChanged(this,\'' + listConfig[j].DataMember + '\',' + j + ',\'' + $('#' + listConfig[j].DataMember).val() + '\',\'' + ttbody + '\',\'' + tfoot + '\'));" >';
                        //    htm += '<input  style="z-index: 99;" type="checkbox" id="' + listConfig[j].DataMember + '" name="' + listConfig[j].DataMember + '"   onclick="checkBoxValueChanged(this,\'' + listConfig[j].DataMember + '\',' + trowCount + ',\'' + ttbody + '\',\'' + tfoot + '\',\'' + fieldName + '\',\'' + pageNumber + '\');" >';
                        //    htm += '</td>';
                        //}
                        //else {
                        htm += '<td  id="' + listConfig[j].DataMember + '" class="' + listConfig[j].DataMember + '" name="' + listConfig[j].DataMember + '" style=" width:' + listConfig[j].ColumnWidth + ';font-family: ' + listConfig[j].RFont + ';font-size:' + listConfig[j].RFontSize + ';color: ' + listConfig[j].RForeColor + ' ; text-align:' + getAlignStyle(listConfig[j].Alignment) + ';' + fontWeight + '">';

                        if (listConfig[j].DataMemberType == "NUMBER") {
                            console.log(ProjectName);
                            console.log(scrName);
                            console.log(listConfig[j].DataMember);
                            if (ProjectName.toLowerCase() == "sengchoon" && (scrName == "InvoiceNewForm" || scrName == "InvoiceForm") && listConfig[j].DataMember == "Qty")
                                htm += '<input   type="text" maxlength="' + maxCharLength + '" placeholder="' + requiredMessage + '"  style="z-index: 99;cursor:' + cursorType + '" id="' + listConfig[j].DataMember + '_' + num + '" value=""  onkeypress="restrictMinus(event);" onclick="listTextFieldFocus1(this,\'' + listConfig[j].DataMember + '\',\'' + listConfig[j].DataMember + '_' + num + '\',' + addCount + ',' + $(this).parent().index('td') + ',\'' + fieldName + '\',\'' + ttbody + '\',\'' + tfoot + '\');"onblur="listTextFieldLostFocus(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',' + $(this).parent().index('td') + ',\'' + fieldName + '\',\'' + ttbody + '\',\'' + tfoot + '\');"onkeyup="listTextFieldChange1(this,\'' + listConfig[j].DataMember + '\',\'' + listConfig[j].DataMember + '_' + num + '\',' + addCount + ',' + $(this).parent().index('td') + ',\'' + fieldName + '\',\'' + ttbody + '\',\'' + tfoot + '\');" />';
                            else {
                                if (isReadOnly == true || isDisable == true)
                                    htm += '<input   type="text" maxlength="' + maxCharLength + '" data-restrict="1234567890:" placeholder="' + requiredMessage + '"  style="z-index: 99;cursor:not-allowed;text-align:' + getAlignStyle(listConfig[j].Alignment) + ';" id="' + listConfig[j].DataMember + '" name="' + listConfig[j].DataMember + '" value=""  onkeypress="restrictMinus(event);" onclick="listTextFieldFocus(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',' + $(this).parent().index('td') + ',\'' + fieldName + '\',\'' + ttbody + '\',\'' + tfoot + '\');"onblur="listTextFieldLostFocus(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',' + $(this).parent().index('td') + ',\'' + fieldName + '\',\'' + ttbody + '\',\'' + tfoot + '\');"onkeyup="listTextFieldChange(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',' + $(this).parent().index('td') + ',\'' + fieldName + '\',\'' + ttbody + '\',\'' + tfoot + '\');" disabled />';
                                else
                                    htm += '<input   type="text" maxlength="' + maxCharLength + '" data-restrict="1234567890:" placeholder="' + requiredMessage + '"  style="z-index: 99;cursor:' + cursorType + ';text-align:' + getAlignStyle(listConfig[j].Alignment) + ';" id="' + listConfig[j].DataMember + '" name="' + listConfig[j].DataMember + '" value=""  onkeypress="restrictMinus(event);listNumberTextFieldFocus(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',' + $(this).parent().index('td') + ',\'' + fieldName + '\',\'' + ttbody + '\',\'' + tfoot + '\')" onclick="listTextFieldFocus(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',' + $(this).parent().index('td') + ',\'' + fieldName + '\',\'' + ttbody + '\',\'' + tfoot + '\');"onblur="listTextFieldLostFocus(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',' + $(this).parent().index('td') + ',\'' + fieldName + '\',\'' + ttbody + '\',\'' + tfoot + '\');"onkeyup="listTextFieldChange(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',' + $(this).parent().index('td') + ',\'' + fieldName + '\',\'' + ttbody + '\',\'' + tfoot + '\');" />';
                            }
                        }
                            else if (listConfig[j].DataMemberType == "INTEGER") {
                            isDataMemberTypeInt = true;

                            if (isReadOnly == true || isDisable == true)
                                htm += '<input   class="int" type="text" maxlength="' + maxCharLength + '" style="z-index: 99;cursor:' + cursorType + ';text-align:' + getAlignStyle(listConfig[j].Alignment) + ';" id="' + listConfig[j].DataMember + '" value="" oncopy="return false" onpaste="return false" onkeypress="restrictMinusDot(event);" onclick="listTextFieldFocus(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',' + $(this).parent().index('td') + ',\'' + fieldName + '\',\'' + ttbody + '\',\'' + tfoot + '\');"onblur="listTextFieldLostFocus(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',' + $(this).parent().index('td') + ',\'' + fieldName + '\',\'' + ttbody + '\',\'' + tfoot + '\');"onkeyup="listTextFieldChange(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',' + $(this).parent().index('td') + ',\'' + fieldName + '\',\'' + ttbody + '\',\'' + tfoot + '\');" disabled />';
                            else
                                htm += '<input   class="int" type="text" maxlength="' + maxCharLength + '" style="z-index: 99;cursor:' + cursorType + ';text-align:' + getAlignStyle(listConfig[j].Alignment) + ';" id="' + listConfig[j].DataMember + '" value="" oncopy="return false" onpaste="return false" onkeypress="restrictMinusDot(event);" onclick="listTextFieldFocus(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',' + $(this).parent().index('td') + ',\'' + fieldName + '\',\'' + ttbody + '\',\'' + tfoot + '\');"onblur="listTextFieldLostFocus(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',' + $(this).parent().index('td') + ',\'' + fieldName + '\',\'' + ttbody + '\',\'' + tfoot + '\');"onkeyup="listTextFieldChange(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',' + $(this).parent().index('td') + ',\'' + fieldName + '\',\'' + ttbody + '\',\'' + tfoot + '\');" />';

                            }
                            else {
                            if (ProjectName == "VIDA")
                                htm += '<input   type="text" maxlength="' + maxCharLength + '" oninput="this.value = this.value.toUpperCase()"  placeholder="' + requiredMessage + '"  style="z-index: 99;cursor:' + cursorType + '"   id="' + listConfig[j].DataMember + '" value=""      onclick="listTextFieldFocus(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',' + $(this).parent().index('td') + ',\'' + fieldName + '\',\'' + ttbody + '\',\'' + tfoot + '\');"onblur="listTextFieldLostFocus(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',' + $(this).parent().index('td') + ',\'' + fieldName + '\',\'' + ttbody + '\',\'' + tfoot + '\');"onkeyup="listTextFieldChange(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',' + $(this).parent().index('td') + ',\'' + fieldName + '\',\'' + ttbody + '\',\'' + tfoot + '\');" />';
                            else {
                                if (isReadOnly == true || isDisable == true)
                                    htm += '<input   type="text" maxlength="' + maxCharLength + '" placeholder="' + requiredMessage + '"  style="z-index: 99;cursor:not-allowed"   id="' + listConfig[j].DataMember + '" value=""      onclick="listTextFieldFocus(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',' + $(this).parent().index('td') + ',\'' + fieldName + '\',\'' + ttbody + '\',\'' + tfoot + '\');"onblur="listTextFieldLostFocus(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',' + $(this).parent().index('td') + ',\'' + fieldName + '\',\'' + ttbody + '\',\'' + tfoot + '\');"onkeyup="listTextFieldChange(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',' + $(this).parent().index('td') + ',\'' + fieldName + '\',\'' + ttbody + '\',\'' + tfoot + '\');" disabled />';
                                else
                                    htm += '<input   type="text" maxlength="' + maxCharLength + '" placeholder="' + requiredMessage + '"  style="z-index: 99;cursor:' + cursorType + '"   id="' + listConfig[j].DataMember + '" value=""      onclick="listTextFieldFocus(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',' + $(this).parent().index('td') + ',\'' + fieldName + '\',\'' + ttbody + '\',\'' + tfoot + '\');"onblur="listTextFieldLostFocus(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',' + $(this).parent().index('td') + ',\'' + fieldName + '\',\'' + ttbody + '\',\'' + tfoot + '\');"onkeyup="listTextFieldChange(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',' + $(this).parent().index('td') + ',\'' + fieldName + '\',\'' + ttbody + '\',\'' + tfoot + '\');" />';
                            }
                            }
                            htm += '</td>';
                        //}
                        break;
                    case "tabtext":
                        htm += '<td id="' + listConfig[j].DataMember + '">';
                        htm += '<div class="tab1" id="div_' + listConfig[j].DataMember + '" onclick="listTabTextClicked(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',' + $(this).parent().index('td') + ',\'' + fieldName + '\',\'' + ttbody + '\',\'' + tfoot + '\');" style="width:100%;"><button id="hdr_' + listConfig[j].DataMember + '_' + num + '" class="tablinks active" style="width:100%;" >' + listConfig[j].NewText + '</button > <div class="tabcontent1"><h3><label id="val_' + listConfig[j].DataMember + '_' + num + '">Nil</label></h3></div></div > ';
                        htm += '</td>';
                        break;
                    case "starrating":
                        //\'' + listConfig[j].FieldName + '\',' + addCount + '
                        htm += '<td id="' + listConfig[j].DataMember + '">';
                        htm += '</td>';
                        break;
                    case "starratingoutput":
                        htm += '<td id="' + listConfig[j].DataMember + '">';
                        htm += '<h3 id="output' + addCount + '">Rating is: 0 / 5</h3>';
                        htm += '</td>';
                        break;
                    case "datepicker":
                        isDateTimePicker = true;
                        DatePickerdata = {};
                        DatePickerdata.FieldControl = listConfig[j].FieldControl;
                        DatePickerdata.DataMember = listConfig[j].DataMember + addCount;
                        DatePickerdata.ScreenName = listConfig[j].ScreenName;
                        DatePickerdata.DataMemberType = listConfig[j].DataMemberType;
                        DatePickerdata.FormListType = "Form";
                        DateTimeIdGridList.push(DatePickerdata);
                        if (listConfig[j].IsHidden == 1) {
                            htm += '<td  id="' + listConfig[j].DataMember + '"  class="' + listConfig[j].DataMember + '" name="' + listConfig[j].DataMember + '" style="display:none; width:' + listConfig[j].ColumnWidth + ';font-family: ' + listConfig[j].RFont + ';font-size:' + listConfig[j].RFontSize + ';color: ' + listConfig[j].RForeColor + ' ;  text-align:' + getAlignStyle(listConfig[j].Alignment) + ';' + fontWeight + '">';
                            htm += '<input  style="display:none;" type="text" data-act="2020-03-20 00:00:01" id="' + listConfig[j].DataMember + addCount + '" class="datepickerList"   value=""      onclick="listDatePickerClicked(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',' + $(this).parent().index('td') + ',\'' + fieldName + '\',\'' + ttbody + '\',\'' + tfoot + '\');"  />';
                            htm += '</td>';
                        }
                        else {
                            htm += '<td  id="' + listConfig[j].DataMember + '"  style=" width:' + listConfig[j].ColumnWidth + ';font-family: ' + listConfig[j].RFont + ';font-size:' + listConfig[j].RFontSize + ';color: ' + listConfig[j].RForeColor + ' ;  text-align:' + getAlignStyle(listConfig[j].Alignment) + ';' + fontWeight + '">';
                            //htm += '<input type="text" autocomplete="off" readonly="true" id="' + listConfig[j].DataMember + addCount + '" class="datepickerList"   value=""      onchange="listTextFieldLostFocus(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',' + $(this).parent().index('td') + ',\'' + fieldName + '\',\'' + ttbody + '\',\'' + tfoot + '\');"onclick="listDatePickerClicked(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',' + $(this).parent().index('td') + ',\'' + fieldName + '\',\'' + ttbody + '\',\'' + tfoot + '\');"  />';
                            //htm += '<input readonly type="text" autocomplete="off"   id="' + listConfig[j].DataMember + addCount + '" class="datepickerList"   value=""      onclick="listDatePickerClicked(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',' + $(this).parent().index('td') + ',\'' + fieldName + '\',\'' + ttbody + '\',\'' + tfoot + '\');"onblur="listDatePickerLostFocus(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',' + $(this).parent().index('td') + ',\'' + fieldName + '\',\'' + ttbody + '\',\'' + tfoot + '\');"  />';
                           // htm += '<div style="position:relative;width:100%;border:1px solid lightgray;boder-radius:2px;">';

                            if (isReadOnly == true)
                                htm += '<input readonly type="text" autocomplete="off"   id="' + listConfig[j].DataMember + addCount + '" name="' + listConfig[j].DataMember + '" class="datepickerList"  onblur="listDatePickerLostFocus(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',' + $(this).parent().index('td') + ',\'' + fieldName + '\',\'' + ttbody + '\',\'' + tfoot + '\');" value=""   style = "cursor:not-allowed;width:100%;background: url(../Images/cal3.png)no-repeat right;padding-right:20px;background-size:20px;border-radius:5px;" disabled  />';
                            else if (isDisable == true)
                                htm += '<input readonly type="text" autocomplete="off"   id="' + listConfig[j].DataMember + addCount + '" name="' + listConfig[j].DataMember + '" class="datepickerList"  onblur="listDatePickerLostFocus(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',' + $(this).parent().index('td') + ',\'' + fieldName + '\',\'' + ttbody + '\',\'' + tfoot + '\');" value=""   style = "width:100%;background: url(../Images/cal3.png)no-repeat right, #f0f0f0;padding-right:20px;background-size:20px;border-radius:5px;" disabled  />';
                            else
                                htm += '<input readonly type="text" autocomplete="off"   id="' + listConfig[j].DataMember + addCount + '" name="' + listConfig[j].DataMember + '" class="datepickerList"  onblur="listDatePickerLostFocus(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',' + $(this).parent().index('td') + ',\'' + fieldName + '\',\'' + ttbody + '\',\'' + tfoot + '\');" value="" style="width:100%;background: url(../Images/cal3.png)no-repeat right;padding-right:20px;background-size:20px;border-radius:5px;"    />';
                            //htm += '<input readonly type="text" autocomplete="off"   id="' + listConfig[j].DataMember + addCount + '" class="datepickerList"   value=""      onchange="listTextFieldLostFocus(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',' + $(this).parent().index('td') + ',\'' + fieldName + '\',\'' + ttbody + '\',\'' + tfoot + '\');"onclick="listDatePickerClicked(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',' + $(this).parent().index('td') + ',\'' + fieldName + '\',\'' + ttbody + '\',\'' + tfoot + '\');"onblur="listDatePickerLostFocus(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',' + $(this).parent().index('td') + ',\'' + fieldName + '\',\'' + ttbody + '\',\'' + tfoot + '\');"  />';

                           // htm += '</div></td>';
                            htm += '</td>';
                        }
                        break;

                    case "timepicker":
                        isTimePicker = true;

                        //TimePickerdata = {};
                        //TimePickerdata.FieldControl = listConfig[j].FieldControl;
                        //TimePickerdata.DataMember = listConfig[j].DataMember + addCount;
                        //TimePickerdata.ScreenName = listConfig[j].ScreenName;
                        //TimePickerdata.DataMemberType = listConfig[j].DataMemberType;
                        //TimePickerdata.FormListType = "List";
                        //TimeIdGridList.push(TimePickerdata);

                        htm += '<td  id="' + listConfig[j].DataMember + '" class="' + listConfig[j].DataMember + '" name="' + listConfig[j].DataMember + '" style=" width:' + listConfig[j].ColumnWidth + ';font-family: ' + listConfig[j].RFont + ';font-size:' + listConfig[j].RFontSize + ';color: ' + listConfig[j].RForeColor + ' ;  text-align:' + getAlignStyle(listConfig[j].Alignment) + ';' + fontWeight + '">';
                        htm += '<div style="position: absolute;margin-left:10px;">';
                        htm += '<div style=" width:' + listConfig[j].ColumnWidth + '">';
                        htm += '<input type="text" autocomplete="off"   id="' + listConfig[j].DataMember + addCount + '" class="listtimepicker"   value=""      onchange="listTimePickerLostFocus(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',' + $(this).parent().index('td') + ',\'' + fieldName + '\',\'' + ttbody + '\',\'' + tfoot + '\');"onclick="listTimePickerClicked(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',' + $(this).parent().index('td') + ',\'' + fieldName + '\',\'' + ttbody + '\',\'' + tfoot + '\');"onblur="listTimePickerLostFocus(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',' + $(this).parent().index('td') + ',\'' + fieldName + '\',\'' + ttbody + '\',\'' + tfoot + '\');"  />';
                        htm += '</div>';
                        htm += '</div>';
                        htm += '</td>';

                        break;

                    case "label":
                        if (listConfig[j].IsHidden == 1) {
                            htm += '<td  id="' + listConfig[j].DataMember + '" class="' + listConfig[j].DataMember + '" name="' + listConfig[j].DataMember + '" style="cursor:' + cursorType + ' ; display:none; width:' + listConfig[j].ColumnWidth + ';font-family: ' + listConfig[j].RFont + ';font-size:' + listConfig[j].RFontSize + ';color: ' + listConfig[j].RForeColor + ' ;background-color:' + listConfig[j].RBackColor + '; text-align:' + getAlignStyle(listConfig[j].Alignment) + ';' + fontWeight + '">';
                            htm += '<label  style="display:none;" onclick="listLableClicked(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',' + $(this).parent().index('td') + ',\'' + listConfig[j].DataMember + '\',\'' + ttbody + '\',\'' + tfoot + '\');"    id="' + listConfig[j].DataMember + '" > </label>';
                            htm += '</td>';
                        }
                        else {
                           // htm += '<td  id="' + listConfig[j].DataMember + '" class="' + listConfig[j].DataMember + '" name="' + listConfig[j].DataMember + '" style="cursor:' + cursorType + ' ; width:' + listConfig[j].ColumnWidth + ';font-family: ' + listConfig[j].RFont + ';font-size:' + listConfig[j].RFontSize + ';color: ' + listConfig[j].RForeColor + ' ;   text-align:' + getAlignStyle(listConfig[j].Alignment) + ';' + fontWeight + '">';

                            if (listConfig[j].DataMemberType == "DATE") {
                                htm += '<td  id="' + listConfig[j].DataMember + '" class="' + listConfig[j].DataMember + '" name="' + listConfig[j].DataMember + '" style="background: url(../Images/Cal3.png)no-repeat right;padding-right:20px;background-size:20px;cursor:' + cursorType + ';width:' + listConfig[j].ColumnWidth + ';font-family: ' + listConfig[j].RFont + ';font-size:' + listConfig[j].RFontSize + ';color: ' + listConfig[j].RForeColor + ' ;text-align:' + getAlignStyle(listConfig[j].Alignment) + ';' + fontWeight + '">';
                                htm += '<label  style="z-index: 99;" onclick="listLableClicked(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',' + $(this).parent().index('td') + ',\'' + listConfig[j].DataMember + '\',\'' + ttbody + '\',\'' + tfoot + '\');"    id="' + listConfig[j].DataMember + '" style="background: url(../Images/Cal3.png)no-repeat right, #f0f0f0;padding-right:20px;background-size:20px;" > </label>';
                            }
                            else {
                                htm += '<td  id="' + listConfig[j].DataMember + '" class="' + listConfig[j].DataMember + '" name="' + listConfig[j].DataMember + '" style="cursor:' + cursorType + ' ; width:' + listConfig[j].ColumnWidth + ';font-family: ' + listConfig[j].RFont + ';font-size:' + listConfig[j].RFontSize + ';color: ' + listConfig[j].RForeColor + ' ;   text-align:' + getAlignStyle(listConfig[j].Alignment) + ';' + fontWeight + '">';
                                htm += '<label  style="z-index: 99;" onclick="listLableClicked(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',' + $(this).parent().index('td') + ',\'' + listConfig[j].DataMember + '\',\'' + ttbody + '\',\'' + tfoot + '\');"    id="' + listConfig[j].DataMember + '" > </label>';
                            }

                            htm += '</td>';
                        }
                        break;
                    case "link":
                        htm += '<td  id="' + listConfig[j].DataMember + '" class="' + listConfig[j].DataMember + '" name="' + listConfig[j].DataMember + '" style="width:' + listConfig[j].ColumnWidth + ';font-family: ' + listConfig[j].RFont + ';font-size:' + listConfig[j].RFontSize + ';  text-align:' + getAlignStyle(listConfig[j].Alignment) + ';">';
                        htm += '<a href="" id="' + listConfig[j].DataMember + '_' + addCount + '"  download style="color: blue"> </a>';
                        htm += '</td>';
                        break;
                    case "linktab":
                        //this contol will impliment for targetmedia- cleaning screen
                        htm += '<td  id="' + listConfig[j].DataMember + '" class="' + listConfig[j].DataMember + '" name="' + listConfig[j].DataMember + '" style="width:' + listConfig[j].ColumnWidth + ';font-family: ' + listConfig[j].RFont + ';font-size:' + listConfig[j].RFontSize + ';  text-align:' + getAlignStyle(listConfig[j].Alignment) + ';">';
                        htm += '<a href="" id="' + listConfig[j].DataMember + '_' + addCount + '"  target="_blank" style="color: blue"> </a>';
                        htm += '</td>';
                        break;
                    case "option_disabled":
                        if (listConfig[j].IsHidden == 1) {
                            htm += '<th id="' + listConfig[j].DataMember + '"   style="display:none;" >';
                            htm += '<input   type="checkbox" id="' + listConfig[j].DataMember + '" name="' + listConfig[j].DataMember + '"  onclick="checkBoxValueChanged(this,\'' + listConfig[j].DataMember + '\',' + trowCount + ',\'' + ttbody + '\',\'' + tfoot + '\',\'' + fieldName + '\',\'' + pageNumber + '\');" >';
                            // htm += '<input  style="z-index: 99;display:none;" type="checkbox" id="' + listConfig[j].DataMember + '" name="' + listConfig[j].DataMember + '"   onclick="checkBoxValueChanged(this,\'' + listConfig[j].DataMember + '\',' + trowCount + ',\'' + ttbody + '\',\'' + tfoot + '\',\'' + pageNumber + '\');" >';
                            htm += '</td>';
                        }
                        else {
                            htm += '<td  class="' + listConfig[j].DataMember + '" name="' + listConfig[j].DataMember + '" id="' + listConfig[j].DataMember + '" style="width:' + listConfig[j].ColumnWidth + ';font-family: ' + listConfig[j].RFont + ';font-size:' + listConfig[j].RFontSize + ';color: ' + listConfig[j].RForeColor + ' ;background-color:' + listConfig[j].RBackColor + '; text-align:' + getAlignStyle(listConfig[j].Alignment) + ';' + fontWeight + '">';
                            //htm += '<input style="z-index: 99;" type="checkbox" id="' + listConfig[j].DataMember + '" name="' + listConfig[j].DataMember + '"  onclick="listCheckBoxClickFunction(this,\'' + listConfig[j].DataMember + '\',' + trowCount + ',\'' + ttbody + '\',\'' + tfoot + '\'));listCheckBoxValueChanged(this,\'' + listConfig[j].DataMember + '\',' + j + ',\'' + $('#' + listConfig[j].DataMember).val() + '\',\'' + ttbody + '\',\'' + tfoot + '\'));" >';
                            htm += '<input  class="checkdisable" style="z-index: 99;" type="checkbox" id="' + listConfig[j].DataMember + '" name="' + listConfig[j].DataMember + '" onchange="handleChange(event)" >';
                            htm += '</td>';
                        }
                        break;
                    case "option":
                        if (listConfig[j].IsHidden == 1) {
                            htm += '<th id="' + listConfig[j].DataMember + '"  style="display:none;" >';
                            htm += '<input   type="checkbox" id="' + listConfig[j].DataMember + '" name="' + listConfig[j].DataMember + '"   onclick="checkBoxValueChanged(this,\'' + listConfig[j].DataMember + '\',' + trowCount + ',\'' + ttbody + '\',\'' + tfoot + '\',\'' + fieldName + '\',\'' + pageNumber + '\');" >';
                            // htm += '<input  style="z-index: 99;display:none;" type="checkbox" id="' + listConfig[j].DataMember + '" name="' + listConfig[j].DataMember + '"   onclick="checkBoxValueChanged(this,\'' + listConfig[j].DataMember + '\',' + trowCount + ',\'' + ttbody + '\',\'' + tfoot + '\',\'' + pageNumber + '\');" >';
                            htm += '</td>';
                        }
                        else {
                            
                            htm += '<td  id="' + listConfig[j].DataMember + '" class="' + listConfig[j].DataMember + '" name="' + listConfig[j].DataMember + '" style="width:' + listConfig[j].ColumnWidth + ';font-family: ' + listConfig[j].RFont + ';font-size:' + listConfig[j].RFontSize + ';color: ' + listConfig[j].RForeColor + ' ;background-color:' + listConfig[j].RBackColor + '; text-align:' + getAlignStyle(listConfig[j].Alignment) + ';' + fontWeight + '">';
                            //htm += '<input style="z-index: 99;" type="checkbox" id="' + listConfig[j].DataMember + '" name="' + listConfig[j].DataMember + '"  onclick="listCheckBoxClickFunction(this,\'' + listConfig[j].DataMember + '\',' + trowCount + ',\'' + ttbody + '\',\'' + tfoot + '\'));listCheckBoxValueChanged(this,\'' + listConfig[j].DataMember + '\',' + j + ',\'' + $('#' + listConfig[j].DataMember).val() + '\',\'' + ttbody + '\',\'' + tfoot + '\'));" >';
                            if (listConfig[j].DataMember == "MultiSelect")
                                htm += '<input  style="z-index: 99;" type="checkbox" id="' + listConfig[j].DataMember + '" name="' + listConfig[j].DataMember + '" onclick="checkBoxValueChanged(this,\'' + listConfig[j].DataMember + '\',' + trowCount + ',\'' + ttbody + '\',\'' + tfoot + '\',\'' + fieldName + '\',\'' + pageNumber + '\');" >';
                            else
                                htm += '<input  style="z-index: 99;" type="checkbox" id="' + listConfig[j].DataMember + '" name="' + listConfig[j].DataMember + '" onchange="listCheckBoxValueChanged(this,\'' + listConfig[j].FieldName + '\',' + trowCount + ',\'' + $('#' + listConfig[j].DataMember).val() + '\',\'' + ttbody + '\',\'' + tfoot + '\',\'' + fieldName + '\');"  onclick="checkBoxValueChanged(this,\'' + listConfig[j].DataMember + '\',' + trowCount + ',\'' + ttbody + '\',\'' + tfoot + '\',\'' + fieldName + '\',\'' + pageNumber + '\');" >';

                            htm += '</td>';
                        }
                        break;
                    case "optionview":
                        if (listConfig[j].IsHidden == 1) {
                            htm += '<th id="' + listConfig[j].DataMember + '"  style="display:none;" >';
                            htm += '<input   type="checkbox" id="' + listConfig[j].DataMember + '" name="' + listConfig[j].DataMember + '"   onclick="checkBoxValueChanged(this,\'' + listConfig[j].DataMember + '\',' + trowCount + ',\'' + ttbody + '\',\'' + tfoot + '\',\'' + fieldName + '\');" >';
                            // htm += '<input  style="z-index: 99;display:none;" type="checkbox" id="' + listConfig[j].DataMember + '" name="' + listConfig[j].DataMember + '"   onclick="checkBoxValueChanged(this,\'' + listConfig[j].DataMember + '\',' + trowCount + ',\'' + ttbody + '\',\'' + tfoot + '\');" >';
                            htm += '</td>';
                        }
                        else {
                            htm += '<td  id="' + listConfig[j].DataMember + '" class="' + listConfig[j].DataMember + '" name="' + listConfig[j].DataMember + '" style="width:' + listConfig[j].ColumnWidth + ';font-family: ' + listConfig[j].RFont + ';font-size:' + listConfig[j].RFontSize + ';color: ' + listConfig[j].RForeColor + ' ;background-color:' + listConfig[j].RBackColor + '; text-align:' + getAlignStyle(listConfig[j].Alignment) + ';' + fontWeight + '">';
                            //htm += '<input style="z-index: 99;" type="checkbox" id="' + listConfig[j].DataMember + '" name="' + listConfig[j].DataMember + '"  onclick="listCheckBoxClickFunction(this,\'' + listConfig[j].DataMember + '\',' + trowCount + ',\'' + ttbody + '\',\'' + tfoot + '\'));listCheckBoxValueChanged(this,\'' + listConfig[j].DataMember + '\',' + j + ',\'' + $('#' + listConfig[j].DataMember).val() + '\',\'' + ttbody + '\',\'' + tfoot + '\'));" >';
                            htm += '<input  style="z-index: 99;" disabled type="checkbox" id="' + listConfig[j].DataMember + '" name="' + listConfig[j].DataMember + '"   onclick="checkBoxValueChanged(this,\'' + listConfig[j].DataMember + '\',' + trowCount + ',\'' + ttbody + '\',\'' + tfoot + '\',\'' + fieldName + '\');" >';
                            htm += '</td>';
                        }
                        break;

                    case "combobox":
                        comboboxdata = {};
                        comboboxdata.DataMember = listConfig[j].DataMember;
                        comboboxdata.ScreenName = listConfig[j].ScreenName;
                        comboboxdata.FormListType = "List";
                        DropDownIdList.push(comboboxdata);

                        //vBackColor = '';
                        var rFontSize = parseInt(listConfig[j].RFontSize.replace('px', '')) + 2;
                        if (listConfig[j].IsHidden == 1) {
                            htm += '<td  id="' + listConfig[j].DataMember + '" style="display:none;">';
                            htm += '<select  id="' + listConfig[j].DataMember + '" placeholder="' + requiredMessage + '"      style="display:none;z-index: 99;font-size:' + rFontSize + "px" + ';color:' + vForeColor + ';background-color:' + listConfig[j].RBackColor + ';font-family:' + listConfig[j].RFont + ';text-align:' + getAlignStyle(listConfig[j].Alignment) + ';" >';
                            htm += '</select>';
                            htm += '</td>';
                        }
                        else {
                            ftype = listConfig[j].DataMember;
                            htm += '<td  id="' + listConfig[j].DataMember + '" class="' + listConfig[j].DataMember + '" name="' + listConfig[j].DataMember + '" style="width:' + listConfig[j].ColumnWidth + ';font-family: ' + listConfig[j].RFont + ';font-size:' + listConfig[j].RFontSize + ';color: ' + listConfig[j].RForeColor + ' ;background-color:' + listConfig[j].RBackColor + '; text-align:' + getAlignStyle(listConfig[j].Alignment) + ';' + fontWeight + '">';

                            if (listConfig[j].RBackColor == '#ffffff')
                                htm += '<select  id="' + listConfig[j].DataMember + '" placeholder="' + requiredMessage + '"     onclick="listComboClick(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',\'' + listConfig[j].DataMember + '\',\'' + fieldName + '\',\'' + ttbody + '\',\'' + tfoot + '\',\'' + fieldName + '\');"   onchange="listComboChange(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',\'' + listConfig[j].DataMember + '\',\'' + fieldName + '\',\'' + ttbody + '\',\'' + tfoot + '\',\'' + fieldName + '\');" style="z-index: 99;font-size:' + rFontSize + "px" + ';color:' + vForeColor + ';background-color:#f0f0f0;font-family:' + listConfig[j].RFont + ';text-align:' + getAlignStyle(listConfig[j].Alignment) + ';" >';
                            else
                                htm += '<select  id="' + listConfig[j].DataMember + '" placeholder="' + requiredMessage + '"     onclick="listComboClick(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',\'' + listConfig[j].DataMember + '\',\'' + fieldName + '\',\'' + ttbody + '\',\'' + tfoot + '\',\'' + fieldName + '\');"   onchange="listComboChange(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',\'' + listConfig[j].DataMember + '\',\'' + fieldName + '\',\'' + ttbody + '\',\'' + tfoot + '\',\'' + fieldName + '\');" style="z-index: 99;font-size:' + rFontSize + "px" + ';color:' + vForeColor + ';background-color:' + listConfig[j].RBackColor + ';font-family:' + listConfig[j].RFont + ';text-align:' + getAlignStyle(listConfig[j].Alignment) + ';" >';

                            htm += '</select>';
                            htm += '</td>';
                        }
                        break;
                    case "comboboxsearch":
                        comboboxdata = {};
                        comboboxdata.DataMember = listConfig[j].DataMember;
                        comboboxdata.RowIndex = addCount;
                        comboboxdata.ScreenName = listConfig[j].ScreenName;
                        comboboxdata.AutoSearch = "Yes";
                        comboboxdata.FormListType = "Form";
                        DropDownIdList.push(comboboxdata);

                        //vBackColor = '';
                        var rFontSize = parseInt(listConfig[j].RFontSize.replace('px', '')) + 2;
                        if (listConfig[j].IsHidden == 1) {
                            htm += '<td  id="' + listConfig[j].DataMember + '" style="display:none;">';
                            htm += '<select  id="' + listConfig[j].DataMember + '" placeholder="' + requiredMessage + '"      style="display:none;z-index: 99;font-size:' + rFontSize + "px" + ';color:' + vForeColor + ';background-color:' + listConfig[j].RBackColor + ';font-family:' + listConfig[j].RFont + ';text-align:' + getAlignStyle(listConfig[j].Alignment) + ';" >';
                            htm += '</select>';
                            htm += '</td>';
                        }
                        else {
                            ftype = listConfig[j].DataMember;
                            htm += '<td  id="' + listConfig[j].DataMember + '" class="' + listConfig[j].DataMember + '" name="' + listConfig[j].DataMember + '" style="width:' + listConfig[j].ColumnWidth + ';font-family: ' + listConfig[j].RFont + ';font-size:' + listConfig[j].RFontSize + ';color: ' + listConfig[j].RForeColor + ' ;background-color:' + listConfig[j].RBackColor + '; text-align:' + getAlignStyle(listConfig[j].Alignment) + ';' + fontWeight + '">';

                            if (listConfig[j].RBackColor == '#ffffff')
                                htm += '<select  id="' + listConfig[j].DataMember + addCount + '" placeholder="' + requiredMessage + '"     onclick="listComboClick(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',\'' + listConfig[j].DataMember + '\',\'' + fieldName + '\',\'' + ttbody + '\',\'' + tfoot + '\',\'' + fieldName + '\');"   onchange="listComboChange(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',\'' + listConfig[j].DataMember + '\',\'' + fieldName + '\',\'' + ttbody + '\',\'' + tfoot + '\',\'' + fieldName + '\');" style="z-index: 99;font-size:' + rFontSize + "px" + ';color:' + vForeColor + ';background-color:#f0f0f0;font-family:' + listConfig[j].RFont + ';text-align:' + getAlignStyle(listConfig[j].Alignment) + ';" >';
                            else
                                htm += '<select  id="' + listConfig[j].DataMember + addCount + '" placeholder="' + requiredMessage + '"     onclick="listComboClick(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',\'' + listConfig[j].DataMember + '\',\'' + fieldName + '\',\'' + ttbody + '\',\'' + tfoot + '\',\'' + fieldName + '\');"   onchange="listComboChange(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',\'' + listConfig[j].DataMember + '\',\'' + fieldName + '\',\'' + ttbody + '\',\'' + tfoot + '\',\'' + fieldName + '\');" style="z-index: 99;font-size:' + rFontSize + "px" + ';color:' + vForeColor + ';background-color:' + listConfig[j].RBackColor + ';font-family:' + listConfig[j].RFont + ';text-align:' + getAlignStyle(listConfig[j].Alignment) + ';" >';

                            htm += '</select>';
                            htm += '</td>';
                        }
                        break;
                    case "lookup":
                        htm += '<td class="' + listConfig[j].DataMember + '" name="' + listConfig[j].DataMember + '"  id="' + listConfig[j].DataMember + '" style="width:' + listConfig[j].ColumnWidth + ';font-family: ' + listConfig[j].RFont + ';font-size:' + listConfig[j].RFontSize + ';color: ' + listConfig[j].RForeColor + ' ;background-color:' + listConfig[j].RBackColor + '; text-align:' + getAlignStyle(listConfig[j].Alignment) + ';' + fontWeight + '">';
                        htm += '<input type="text" id="' + listConfig[j].DataMember + '"   placeholder="' + requiredMessage + '"    readonly="true" style="width:80%;float:left;border-radius:0px;"  class="form-control"  />';
                        htm += '<span href="#" id="LookUp_' + listConfig[j].DataMember + '"  onclick="listLookUpClicked(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',\'' + fieldName + '\',\'' + listConfig[j].NewText + '\',\'' + ttbody + '\',\'' + tfoot + '\',\'' + listConfig[j].ScreenName + '\'); " class="input-group-addon" style="height:30px;width:20%;float:left;border-radius:0px;"> <i class="fa fa-plus" style="margin-left: -3px"></i>  </span>';
                        htm += '</td>';
                        break;
                    case "multiselectlookup":
                        htm += '<td class="' + listConfig[j].DataMember + '" name="' + listConfig[j].DataMember + '"  id="' + listConfig[j].DataMember + '" style="width:' + listConfig[j].ColumnWidth + ';font-family: ' + listConfig[j].RFont + ';font-size:' + listConfig[j].RFontSize + ';color: ' + listConfig[j].RForeColor + ' ;background-color:' + listConfig[j].RBackColor + '; text-align:' + getAlignStyle(listConfig[j].Alignment) + ';' + fontWeight + '">';

                       
                        if (isReadOnly == true)
                            htm += '<input type="text" id="' + listConfig[j].DataMember + '" name="' + listConfig[j].DataMember + '"  placeholder="' + requiredMessage + '"    readonly="true" style="width:84%;float:left;border-radius:0px;cursor:not-allowed;"  class="form-control" disabled  />';
                        else
                            htm += '<input type="text" id="' + listConfig[j].DataMember + '" name="' + listConfig[j].DataMember + '"  placeholder="' + requiredMessage + '"    readonly="true" style="width:84%;float:left;border-radius:0px;"  class="form-control"  />';

                        

                        if (ProjectName == "CPF" && (scrName == "CreditNoteForm" || scrName == "CreditNoteNewForm")) {
                            
                            if (isReadOnly == true)
                                htm += '<Button href="#" id="LookUp_' + listConfig[j].DataMember + '" class="LookUp_' + listConfig[j].DataMember + '"  onclick="multiSelectListLookUpClicked(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',\'' + fieldName + '\',\'' + listConfig[j].NewText + '\',\'' + ttbody + '\',\'' + tfoot + '\',\'' + listConfig[j].ScreenName + '\'); " style="height:30px;width:13%;float:left;border-radius:0px;cursor:not-allowed;" disabled> <i class="fa fa-plus"></i>  </Button>';
                            else
                                htm += '<Button href="#" id="LookUp_' + listConfig[j].DataMember + '" class="LookUp_' + listConfig[j].DataMember + '"  onclick="multiSelectListLookUpClicked(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',\'' + fieldName + '\',\'' + listConfig[j].NewText + '\',\'' + ttbody + '\',\'' + tfoot + '\',\'' + listConfig[j].ScreenName + '\'); " style="height:30px;width:13%;float:left;border-radius:0px;"> <i class="fa fa-plus"></i>  </Button>';
                        }
                        else
                            htm += '<span href="#" id="LookUp_' + listConfig[j].DataMember + '"  onclick="multiSelectListLookUpClicked(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',\'' + fieldName + '\',\'' + listConfig[j].NewText + '\',\'' + ttbody + '\',\'' + tfoot + '\',\'' + listConfig[j].ScreenName + '\'); " class="input-group-addon" style="height:30px;width:16%;float:left;border-radius:0px;"> <i class="fa fa-plus"></i>  </span>';

                        htm += '</td>';

                       // Added by vignesh on 07/10/2024
                        isMultiSelect = true;
                        //htm += '<td class="listInput-group  input-group"  id="' + listConfig[j].DataMember + '" style="position: inherit;font-family: ' + listConfig[j].RFont + ';font-size:' + listConfig[j].RFontSize + ';color: ' + listConfig[j].RForeColor + ' ;background-color:' + listConfig[j].RBackColor + '; text-align:' + getAlignStyle(listConfig[j].Alignment) + ';' + fontWeight + '">';
                        //htm += '<input type="text" id="' + listConfig[j].DataMember + '"  style="position:inherit"    readonly="true"   class="form-control"  />';
                        //htm += '<span href="#" id="LookUp_' + listConfig[j].DataMember + '"  onclick="multiSelectListLookUpClicked(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',\'' + fieldName + '\',\'' + listConfig[j].NewText + '\',\'' + ttbody + '\',\'' + tfoot + '\',\'' + listConfig[j].ScreenName + '\'); " class="input-group-addon"> <i class="fa fa-plus"></i>  </span>';
                        //htm += '</td>';
                        break;
                    case "autosuggest":
                        autoCompletedata = {};
                        autoCompletedata.DataMember = listConfig[j].DataMember;
                        autoCompletedata.rowIndex = addCount;
                        autoCompletedata.ScreenName = listConfig[j].ScreenName;
                        autoCompletedata.FormListType = "List";
                        AutoCompleteList.push(autoCompletedata);

                        htm += '<td class="' + listConfig[j].DataMember + '" name="' + listConfig[j].DataMember + '"  id="' + listConfig[j].DataMember + '" style="width:' + listConfig[j].ColumnWidth + ';font-family: ' + listConfig[j].RFont + ';font-size:' + listConfig[j].RFontSize + ';color: ' + listConfig[j].RForeColor + ' ;background-color:' + listConfig[j].RBackColor + '; text-align:' + getAlignStyle(listConfig[j].Alignment) + ';' + fontWeight + '">';
                        htm += '<input type="text" id="' + listConfig[j].DataMember + '" placeholder="' + requiredMessage + '"   style="width:84%;float:left;border-radius:0px;" class="form-control Id_' + listConfig[j].DataMember + '_' + addCount + '"  />';
                       // htm += '<span href="#" id="LookUp_' + listConfig[j].DataMember + '"  onclick="listLookUpClicked(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',\'' + fieldName + '\',\'' + listConfig[j].NewText + '\',\'' + ttbody + '\',\'' + tfoot + '\',\'' + listConfig[j].ScreenName + '\'); " class="input-group-addon" style="height:30px;width:16%;float:left;border-radius:0px;"> <i class="fa fa-plus"></i>  </span>';
                        htm += '</td>';

                        break;
                    case "autolookup":
                        autoCompletedata = {};
                        autoCompletedata.DataMember = listConfig[j].DataMember;
                        autoCompletedata.rowIndex = addCount;
                        autoCompletedata.ScreenName = listConfig[j].ScreenName;
                        autoCompletedata.FormListType = "List";
                        AutoCompleteList.push(autoCompletedata);

                        htm += '<td class=""  id="' + listConfig[j].DataMember + '" style="width:' + listConfig[j].ColumnWidth + ';font-family: ' + listConfig[j].RFont + ';font-size:' + listConfig[j].RFontSize + ';color: ' + listConfig[j].RForeColor + ' ;background-color:' + listConfig[j].RBackColor + '; text-align:' + getAlignStyle(listConfig[j].Alignment) + ';' + fontWeight + '">';
                        htm += '<input type="text" id="' + listConfig[j].DataMember + '" placeholder="' + requiredMessage + '"   style="width:84%;float:left;border-radius:0px;" class="form-control Id_' + listConfig[j].DataMember + '_' + addCount + '" onblur="autoCompleteLostFocus(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',' + $(this).parent().index('td') + ',\'' + fieldName + '\',\'' + ttbody + '\',\'' + tfoot + '\');" />';

                        if (ProjectName == "JSU" && scrName == "SalesOrderForm")
                            htm += '<Button href="#" id="LookUp_' + listConfig[j].DataMember + '" class="LookUp_' + listConfig[j].DataMember + '"  onclick="listLookUpClicked(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',\'' + fieldName + '\',\'' + listConfig[j].NewText + '\',\'' + ttbody + '\',\'' + tfoot + '\',\'' + listConfig[j].ScreenName + '\'); " style="height:30px;width:13%;float:left;border-radius:0px;"> <i class="fa fa-plus"></i>  </Button>';
                        else
                            htm += '<span href="#" id="LookUp_' + listConfig[j].DataMember + '"  onclick="multiSelectListLookUpClicked(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',\'' + fieldName + '\',\'' + listConfig[j].NewText + '\',\'' + ttbody + '\',\'' + tfoot + '\',\'' + listConfig[j].ScreenName + '\'); " class="input-group-addon" style="height:30px;width:16%;float:left;border-radius:0px;"> <i class="fa fa-plus"></i>  </span>';
                        htm += '</td>';

                        break;
                    //case "autolookup":
                    //    autoCompletedata = {};
                    //    autoCompletedata.DataMember = listConfig[j].DataMember;
                    //    autoCompletedata.rowIndex = addCount;
                    //    autoCompletedata.ScreenName = listConfig[j].ScreenName;
                    //    autoCompletedata.FormListType = "List";
                    //    AutoCompleteList.push(autoCompletedata);

                    //    htm += '<td class="' + listConfig[j].DataMember + '" name="' + listConfig[j].DataMember + '"  id="' + listConfig[j].DataMember + '" style="width:' + listConfig[j].ColumnWidth + ';font-family: ' + listConfig[j].RFont + ';font-size:' + listConfig[j].RFontSize + ';color: ' + listConfig[j].RForeColor + ' ;background-color:' + listConfig[j].RBackColor + '; text-align:' + getAlignStyle(listConfig[j].Alignment) + ';' + fontWeight + '">';
                    //    htm += '<input type="text" id="' + listConfig[j].DataMember + '" onfocus="listAutoCompleteFocused(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',\'' + fieldName + '\',\'' + listConfig[j].NewText + '\',\'' + ttbody + '\',\'' + tfoot + '\',\'' + listConfig[j].ScreenName + '\');" placeholder="' + requiredMessage + '"   style="width:84%;float:left;border-radius:0px;" class="form-control Id_' + listConfig[j].DataMember + '_' + addCount + '"  />';

                    //    if (ProjectName == "JSU" && scrName == "SalesOrderForm")
                    //        htm += '<Button href="#" id="LookUp_' + listConfig[j].DataMember + '" class="LookUp_' + listConfig[j].DataMember + '"  onclick="listLookUpClicked(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',\'' + fieldName + '\',\'' + listConfig[j].NewText + '\',\'' + ttbody + '\',\'' + tfoot + '\',\'' + listConfig[j].ScreenName + '\'); " style="height:30px;width:13%;float:left;border-radius:0px;"> <i class="fa fa-plus"></i>  </Button>';
                    //    else
                    //       // htm += '<span href="#" id="LookUp_' + listConfig[j].DataMember + '"  onclick="listLookUpClicked(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',\'' + fieldName + '\',\'' + listConfig[j].NewText + '\',\'' + ttbody + '\',\'' + tfoot + '\',\'' + listConfig[j].ScreenName + '\'); " class="input-group-addon" style="height:30px;width:16%;float:left;border-radius:0px;"> <i class="fa fa-plus"></i>  </span>';
                    //        htm += '<span href="#" id="LookUp_' + listConfig[j].DataMember + '"  onclick="multiSelectListLookUpClicked(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',\'' + fieldName + '\',\'' + listConfig[j].NewText + '\',\'' + ttbody + '\',\'' + tfoot + '\',\'' + listConfig[j].ScreenName + '\'); " class="input-group-addon" style="height:30px;width:16%;float:left;border-radius:0px;"> <i class="fa fa-plus"></i>  </span>';

                    //    htm += '</td>';

                    //    break;
                    
                    case "automultilookup":
                        autoCompletedata = {};
                        autoCompletedata.DataMember = listConfig[j].DataMember;
                        autoCompletedata.rowIndex = addCount;
                        autoCompletedata.ScreenName = listConfig[j].ScreenName;
                        autoCompletedata.FormListType = "List";
                        AutoCompleteList.push(autoCompletedata);

                        htm += '<td class="' + listConfig[j].DataMember + '" name="' + listConfig[j].DataMember + '"  id="' + listConfig[j].DataMember + '" style="width:' + listConfig[j].ColumnWidth + ';font-family: ' + listConfig[j].RFont + ';font-size:' + listConfig[j].RFontSize + ';color: ' + listConfig[j].RForeColor + ' ;background-color:' + listConfig[j].RBackColor + '; text-align:' + getAlignStyle(listConfig[j].Alignment) + ';' + fontWeight + '">';
                        htm += '<input type="text" id="' + listConfig[j].DataMember + '" onfocus="listAutoCompleteFocused(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',\'' + fieldName + '\',\'' + listConfig[j].NewText + '\',\'' + ttbody + '\',\'' + tfoot + '\',\'' + listConfig[j].ScreenName + '\');" placeholder="' + requiredMessage + '"   style="width:84%;float:left;border-radius:0px;" class="form-control Id_' + listConfig[j].DataMember + '_' + addCount + '" onblur="autoCompleteLostFocus(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',' + $(this).parent().index('td') + ',\'' + fieldName + '\',\'' + ttbody + '\',\'' + tfoot + '\');" />';

                        if (ProjectName == "JSU" && scrName == "SalesOrderForm")
                            htm += '<Button href="#" id="LookUp_' + listConfig[j].DataMember + '" class="LookUp_' + listConfig[j].DataMember + '"  onclick="listLookUpClicked(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',\'' + fieldName + '\',\'' + listConfig[j].NewText + '\',\'' + ttbody + '\',\'' + tfoot + '\',\'' + listConfig[j].ScreenName + '\'); " style="height:30px;width:13%;float:left;border-radius:0px;"> <i class="fa fa-plus"></i>  </Button>';
                        else
                            htm += '<span href="#" id="LookUp_' + listConfig[j].DataMember + '"  onclick="listLookUpClicked(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',\'' + fieldName + '\',\'' + listConfig[j].NewText + '\',\'' + ttbody + '\',\'' + tfoot + '\',\'' + listConfig[j].ScreenName + '\'); " class="input-group-addon" style="height:30px;width:16%;float:left;border-radius:0px;"> <i class="fa fa-plus"></i>  </span>';

                        htm += '</td>';

                        break;
                    case "lookuptextbox":

                        autoCompletedata = {};
                        autoCompletedata.DataMember = listConfig[j].DataMember;
                        autoCompletedata.rowIndex = addCount;
                        autoCompletedata.ScreenName = listConfig[j].ScreenName;
                        autoCompletedata.FormListType = "List";
                        AutoCompleteWithTextList.push(autoCompletedata);

                        htm += '<td class="' + listConfig[j].DataMember + '" name="' + listConfig[j].DataMember + '"  id="' + listConfig[j].DataMember + '" style="width:' + listConfig[j].ColumnWidth + ';font-family: ' + listConfig[j].RFont + ';font-size:' + listConfig[j].RFontSize + ';color: ' + listConfig[j].RForeColor + ' ;background-color:' + listConfig[j].RBackColor + '; text-align:' + getAlignStyle(listConfig[j].Alignment) + ';' + fontWeight + '">';
                        

                        if (isReadOnly == true)
                            htm += '<input type="text" id="' + listConfig[j].DataMember + '" name="' + listConfig[j].DataMember + '" onblur = "listLookUpTextFieldLostFocus(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',\'' + fieldName + '\',\'' + listConfig[j].NewText + '\',\'' + ttbody + '\',\'' + tfoot + '\',\'' + listConfig[j].ScreenName + '\'); " placeholder="' + requiredMessage + '"   style="width:84%;float:left;border-radius:0px;cursor:not-allowed;" class="form-control Id_' + listConfig[j].DataMember + '_' + addCount + '" disabled />';
                        else
                            htm += '<input type="text" id="' + listConfig[j].DataMember + '" name="' + listConfig[j].DataMember + '" onblur = "listLookUpTextFieldLostFocus(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',\'' + fieldName + '\',\'' + listConfig[j].NewText + '\',\'' + ttbody + '\',\'' + tfoot + '\',\'' + listConfig[j].ScreenName + '\'); " placeholder="' + requiredMessage + '"   style="width:84%;float:left;border-radius:0px;" class="form-control Id_' + listConfig[j].DataMember + '_' + addCount + '"  />';
                        //htm += '<input type="text" id="' + listConfig[j].DataMember + '" placeholder="' + requiredMessage + '"   style="width:84%;float:left;border-radius:0px;" class="form-control Id_' + listConfig[j].DataMember + '_' + addCount + '"  />';
                        if (ProjectName == "CPF" && (scrName == "CreditNoteForm" || scrName == "CreditNoteNewForm")) {
                            if (isReadOnly == true)
                                htm += '<Button href="#" id="LookUp_' + listConfig[j].DataMember + '" class="LookUp_' + listConfig[j].DataMember + '"  onclick="listLookUpClicked(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',\'' + fieldName + '\',\'' + listConfig[j].NewText + '\',\'' + ttbody + '\',\'' + tfoot + '\',\'' + listConfig[j].ScreenName + '\'); " style="height:30px;width:13%;float:left;border-radius:0px;cursor:not-allowed;" disabled> <i class="fa fa-plus"></i>  </Button>';
                            else
                                htm += '<Button href="#" id="LookUp_' + listConfig[j].DataMember + '" class="LookUp_' + listConfig[j].DataMember + '"  onclick="listLookUpClicked(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',\'' + fieldName + '\',\'' + listConfig[j].NewText + '\',\'' + ttbody + '\',\'' + tfoot + '\',\'' + listConfig[j].ScreenName + '\'); " style="height:30px;width:13%;float:left;border-radius:0px;"> <i class="fa fa-plus"></i>  </Button>';
                        }
                        else
                            htm += '<span href="#" id="LookUp_' + listConfig[j].DataMember + '"  onclick="listLookUpClicked(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',\'' + fieldName + '\',\'' + listConfig[j].NewText + '\',\'' + ttbody + '\',\'' + tfoot + '\',\'' + listConfig[j].ScreenName + '\'); " class="input-group-addon" style="height:30px;width:16%;float:left;border-radius:0px;"> <i class="fa fa-plus"></i>  </span>';

                        htm += '</td>';

                        break;
                    case "imageupload":
                        fname = listConfig[j + 1].DataMember;
                        var acceptType = listConfig[j].DefaultValue == "" || listConfig[j].DefaultValue == undefined ? 'image/*' : listConfig[j].DefaultValue;
                        // var acceptType = 'image/*';
                        htm += '<td class="' + listConfig[j].DataMember + '" name="' + listConfig[j].DataMember + '" id="' + listConfig[j].DataMember + '" style="width:' + listConfig[j].ColumnWidth + ';font-family: ' + listConfig[j].RFont + ';font-size:' + listConfig[j].RFontSize + ';color: ' + listConfig[j].RForeColor + ' ;background-color:""; text-align:' + getAlignStyle(listConfig[j].Alignment) + ';' + fontWeight + '">';
                        //htm += '<input id="File_' + listConfig[j].DataMember + '_' + addCount + '" name="' + listConfig[j].DataMember + '_' + addCount + '" type="file"   onchange="formFileUploadChange(this,\'' + listConfig[j].DataMember + '\',' + j + ',\'' + $('#' + listConfig[j].DataMember).val() + '\');"    accept="' + acceptType + '"  />';
                        //htm += '<input id="File_' + listConfig[j].DataMember + '_' + addCount + '" name="File_' + listConfig[j].DataMember + '_' + addCount + '" type="file"   onchange="listFileUploadChange(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',\'' + ttbody + '\',\'' + tfoot + '\',\'' + fieldName + '\');"    accept="' + acceptType + '"  />';
                        htm += '<input id="File_' + listConfig[j].DataMember + '_' + addCount + '" name="File_' + listConfig[j].DataMember + '_' + addCount + '" type="file"   onchange="listFileUploadChange(this,\'' + ftype + '\',\'' + fname + '\',\'' + listConfig[j].DataMember + '\',' + addCount + ',\'' + ttbody + '\',\'' + tfoot + '\',\'' + fieldName + '\');"    accept="' + acceptType + '"  />';
                        htm += '<input    id="' + listConfig[j].DataMember + '_' + addCount + '"  type="hidden"   />';

                        //htm += '<input    id="' + listConfig[j].DataMember + '"  type="hidden"   />';
                        htm += '</td>';
                        break;
                    case "image":
                        if (listConfig[j].DataMember == "Delete") {
                            htm += '<td  id="' + listConfig[j].DataMember + '" style="width:' + listConfig[j].ColumnWidth + ';font-family: ' + listConfig[j].RFont + ';font-size:' + listConfig[j].RFontSize + ';color: ' + listConfig[j].RForeColor + ' ;background-color:""; text-align:' + getAlignStyle(listConfig[j].Alignment) + ';' + fontWeight + '">';
                            htm += '<input style="display:none" type="button" ></>';
                            htm += '<button style="z-index: 99;" id="delete" onclick="DynamicRowItemRemove(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',\'' + listConfig[j].DataMember + '\',\'' + fieldName + '\',' + addCount + ',\'' + ttbody + '\',\'' + tfoot + '\');"  class="btn"><i     class="fa fa-trash"></i></button>';
                            htm += '</td>';
                        }
                        else if (listConfig[j].DataMember == "Print") {
                            htm += '<td  id="' + listConfig[j].DataMember + '" style="width:' + listConfig[j].ColumnWidth + ';font-family: ' + listConfig[j].RFont + ';font-size:' + listConfig[j].RFontSize + ';color: ' + listConfig[j].RForeColor + ' ;background-color:""; text-align:' + getAlignStyle(listConfig[j].Alignment) + ';' + fontWeight + '">';
                            htm += '<input style="display:none" type="button" ></>';
                            htm += '<button style="z-index: 99;" id="print" onclick="DynamicRowItemPrint(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',\'' + listConfig[j].DataMember + '\',\'' + fieldName + '\',' + addCount + ',\'' + ttbody + '\',\'' + tfoot + '\');"   class="btn"><i     class="fa fa-print"></i></button>';
                            //htm += '<button style="z-index: 99;" id="print" onclick="DynamicRowItemRemove(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',\'' + listConfig[j].DataMember + '\',\'' + fieldName + '\',' + addCount + ',\'' + ttbody + '\',\'' + tfoot + '\');"  class="btn"><i     class="fa fa-print"></i></button>';
                            htm += '</td>';

                        }
                        else if (listConfig[j].DataMember == "Swap") {
                            var isEdit = String(localStorage.getItem('isEdit'));
                            if (isEdit == 'yes') {
                                swap_ttbody = ttbody;
                                htm += '<td  id="' + listConfig[j].DataMember + '_' + addCount + '" style="width:' + listConfig[j].ColumnWidth + ';font-family: ' + listConfig[j].RFont + ';font-size:' + listConfig[j].RFontSize + ';color: ' + listConfig[j].RForeColor + ' ;background-color:""; text-align:' + getAlignStyle(listConfig[j].Alignment) + ';' + fontWeight + '">';
                                htm += '<input style="display:none" type="button" ></>';
                                //htm += '<input type="button" value="↑↑" onclick="swapRow("up",' + addCount + ')" />';
                                //htm += '<input type="button" value="↓↓" onclick="swapRow("down",' + addCount + ')" />';
                                htm += '<button style="z-index: 99;" id="swapup" onclick="swapRow("up",' + addCount + ',\'' + ttbody + '\');"   class="btn"><i     class="fa fa-arrow-circle-up"></i></button>';
                                htm += '<button style="z-index: 99;" id="swapdown" onclick="swapRow("down",' + addCount + ',\'' + ttbody + '\');"   class="btn"><i     class="fa fa-arrow-circle-down"></i></button>';
                                //htm += '<button style="z-index: 99;" id="swapdown" onclick="swap(this,\'down\',' + addCount + ',\'' + ttbody + '\');"   class="btn"><i     class="fa fa-arrow-circle-down"></i></button>';
                                //htm += '<button style="z-index: 99;" id="print" onclick="DynamicRowItemRemove(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',\'' + listConfig[j].DataMember + '\',\'' + fieldName + '\',' + addCount + ',\'' + ttbody + '\',\'' + tfoot + '\');"  class="btn"><i     class="fa fa-print"></i></button>';
                                htm += '</td>';
                            }

                        }
                        break;
                    case "showimage":
                        htm += '<td onclick="showimageClicked1(\'' + listConfig[j].DataMember + '\');" class=""  id="' + listConfig[j].DataMember + '" style="width:' + listConfig[j].ColumnWidth + ';font-family: ' + listConfig[j].RFont + ';font-size:' + listConfig[j].RFontSize + ';color: ' + listConfig[j].RForeColor + ' ;background-color:' + listConfig[j].RBackColor + '; text-align:' + getAlignStyle(listConfig[j].Alignment) + ';' + fontWeight + '">';
                        //htm += '<input type="text" id="' + listConfig[j].DataMember + '"  style="width:84%;float:left;border-radius:0px;" class="form-control Id_' + listConfig[j].DataMember + '_' + addCount + '"  />';
                        //Changes done by nisha on 03/11/2024
                        //htm += '<img type="image"  src="../Images/noimage.png"  id="' + listConfig[j].DataMember + '"   style="width:84%;height:' + listConfig[j].RowHeight + 'px;float:left;border-radius:0px;" ></img>';
                        htm += '<img type="image"  src="../Images/noimage.png"  id="' + listConfig[j].DataMember + '"   style="width:' + listConfig[j].RowHeight + 'px;height:' + listConfig[j].RowHeight + 'px;float:left;border-radius:0px;" ></img>';
                        //htm += '<img type="image"  src=""  id="' + listConfig[j].DataMember + '"   style="width:84%;float:left;border-radius:0px;" ></img>';
                        htm += '</td>';
                        break;
                    case "colorpicker":
                        htm += '<td  id="' + listConfig[j].DataMember + '" style="width:' + listConfig[j].ColumnWidth + ';font-family: ' + listConfig[j].RFont + ';font-size:' + listConfig[j].RFontSize + ';color: ' + listConfig[j].RForeColor + ' ;background-color:""; text-align:' + getAlignStyle(listConfig[j].Alignment) + ';' + fontWeight + '">';
                        htm += '<div  style="z-index: 99;" class="pick-a-color" id="border-color" data-border-color="222">222</div>';
                        htm += '</td>';
                        break;

                    // COMMENTED IMAGE WITH PREVIEW 09.03.2021
                    case "imagewithpreview":
                        htm += '<td  id="' + listConfig[j].DataMember + '" style="width:' + listConfig[j].ColumnWidth + ';font-family: ' + listConfig[j].RFont + ';font-size:' + listConfig[j].RFontSize + ';color: ' + listConfig[j].RForeColor + ' ;background-color:""; text-align:' + getAlignStyle(listConfig[j].Alignment) + ';' + fontWeight + '">';
                        htm += '<div  style="z-index: 99;" class="pick-a-color" id="border-color" data-border-color="">';
                        htm += '  </div>';
                        htm += '</td>';
                        break;
                    case "barcode":
                        htm += '<td  id="' + listConfig[j].DataMember + '">';
                        htm += '<svg id="' + listConfig[j].DataMember + '_' + addCount + '" style="height:50px;"></svg>';
                        htm += '</td>';
                        break;
                    case "button":
                        vForeColor = listConfig[j].RForeColor;
                        vBackColor = listConfig[j].RBackColor;
                        htm += '<td class="' + listConfig[j].DataMember + '" name="' + listConfig[j].DataMember + '" id="' + listConfig[j].DataMember + '" style="width:' + listConfig[j].ColumnWidth + ';font-family: ' + listConfig[j].RFont + ';font-size:' + listConfig[j].RFontSize + ';color: ' + listConfig[j].RForeColor + ' ;background-color:""; text-align:' + getAlignStyle(listConfig[j].Alignment) + ';' + fontWeight + '">';
                        htm += '<input   type="button" style="color:' + vForeColor + ';background-color:' + vBackColor + ';cursor:' + cursorType + '"   id="' + listConfig[j].DataMember + '" value="' + listConfig[j].DefaultText + '"      onclick="listButtonClicked(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',' + $(this).parent().index('td') + ',\'' + fieldName + '\',\'' + ttbody + '\',\'' + tfoot + '\');" />';
                        htm += '  </div>';
                        htm += '</td>';
                        break;

                }
            }

        }

        htm += '</tr>';
        $("#" + ttbody).append(htm);



        if (ProjectName.toLowerCase() == "sengchoon" && (currentScreenName.toLowerCase() == "invoicenewform" || currentScreenName.toLowerCase() == "invoiceform")) {

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
                    //Item name
                    table.rows[i].cells[4].childNodes[0].attributes[5].nodeValue = "listTextFieldFocus(this,'ItemName'," + i + ",-1,'Item','" + tbodyid + "','" + tfooterid + "');";
                    table.rows[i].cells[4].childNodes[0].attributes[6].nodeValue = "listTextFieldLostFocus(this,'ItemName'," + i + ",-1,'Item','" + tbodyid + "','" + tfooterid + "');";
                    table.rows[i].cells[4].childNodes[0].attributes[7].nodeValue = "listTextFieldChange(this,'ItemName'," + i + ",-1,'Item','" + tbodyid + "','" + tfooterid + "');";
                    //Qty
                    table.rows[i].cells[6].childNodes[0].id = "Qty_" + i;
                    table.rows[i].cells[6].childNodes[0].attributes[6].nodeValue = "listTextFieldFocus1(this,'Qty','Qty_" + i + "'," + i + ",-1,'Item','" + tbodyid + "','" + tfooterid + "');";
                    table.rows[i].cells[6].childNodes[0].attributes[7].nodeValue = "listTextFieldLostFocus(this,'Qty'," + i + ",-1,'Item','" + tbodyid + "','" + tfooterid + "');";
                    table.rows[i].cells[6].childNodes[0].attributes[8].nodeValue = "listTextFieldChange1(this,'Qty','Qty_" + i + "'," + i + ",-1,'Item','" + tbodyid + "','" + tfooterid + "');";
                }
            }
            catch (err) {

            }
        }



        ///////
        $('input[class="checkdisable"]').on('click', function (event) {
            event.preventDefault();
            event.stopPropagation();

            return false;

            alert('Break');
        });
        ///////


    } catch (err) {
        info_ALT_TxtFileName("CreateList Error: " + err, "PerformActionInfoLog");
        htm += '</tr>';
        $("#" + ttbody).append(htm);
    }

    var data;// = result.List;
    try {
        data = result.List;
        data = $.parseJSON(data);

        //2 lines added by vignesh on 07/10/2024
        //if (isMultiSelect == true && isActionCreate == "edit" && actionType != "LOOKUP") {
        //    if(data != null)
        //    LookUpMultiSelected = data;
        //}

        //newly added.By.M.22.06.2023 -- PVMNG
        //_isdynamic = true;

        if (data == null && isActionCreate == "edit" && _ispagination == true && _isdynamic == true) {
            data = previousData;
            result = previousResult;
            pageNumber = previousPageNumber;
        }
        else if (data != null && isActionCreate == "edit" && _ispagination == true && _isdynamic == true) {
            previousData = data;
            previousResult = result;
            previousPageNumber = pageNumber;
        }

        //Changes done by Vignesh 26/06/2024
        //countRows = data == null ? 0 : result.countRows == "" ? 0 : $.parseJSON(result.countRows)[0].cnt;
        //var totalrows = data == null ? 0 : result.countRows == "" ? 0 : $.parseJSON(result.countRows)[0].totalrows;
        //var pagesize = data == null ? 0 : result.countRows == "" ? 0 : $.parseJSON(result.countRows)[0].pagesize;

        countRows = data == null ? 0 : result.countRows == null ? 0 : $.parseJSON(result.countRows)[0].cnt;
        var totalrows = data == null ? 0 : result.countRows == null ? 0 : $.parseJSON(result.countRows)[0].totalrows;
        var pagesize = data == null ? 0 : result.countRows == null ? 0 : $.parseJSON(result.countRows)[0].pagesize;


       // if (ProjectName.toLowerCase() == "jsu" && scrName.toLowerCase() == "inventoryform")
        //   pagesize = 20;
        //countRows = 1;
        $('#' + tfoot).empty();
    } catch (err) {

    }

    try {
        if (ProjectName.toLowerCase() == "cpf") {
            var tmp = 0;
            try {
                tmp = data.length;
            }
            catch (er) {

            }
            PaginationLogString('scrName-' + scrName + ',CountRows-' + countRows + ",Datalength-" + tmp + ",paginationCount-" + paginationCount + ',isActionCreate-' + isActionCreate + ',_ispagination-' + _ispagination + ',_isdynamic-' + _isdynamic + ',data-' + data);
        }
    }
    catch (err) {

    }

    try {
        //if (countRows > 1 && (data.length == 1 || data.length == (paginationCount + 2))) {
        if ((countRows > 1 && (data.length == 1 || data.length == (paginationCount + 2))) || (isActionCreate == "edit" && _ispagination == true && _isdynamic == true && (data == null || data.length < (paginationCount + 2)))) {//newly added.By.M.22.06.2023
        //if (( _ispagination == true && (countRows > 1 && (data.length == 1 || data.length == (paginationCount + 2)))) || (isActionCreate == "edit" && _ispagination == true && _isdynamic == true && (data == null || data.length < (paginationCount + 2)))) {//newly added.By.M.22.06.2023
            try {
                try {
                    if (ProjectName.toLowerCase() == "cpf") {
                    PaginationLogString('stage-start');
                    }
                }
                catch (err) {

                }
                var hdrCnt = ListHeaderList["HeaderCountListConfig_" + ttbody];
                headerCount = headerCount == hdrCnt ? headerCount : hdrCnt;
                var fromPage = pageNumber == "1" ? "1" : (pageNumber - 1) * pagesize + 1;
                var endPage = data.length == pagesize ? pageNumber * pagesize : (pageNumber - 1) * pagesize + data.length;

                try {
                    if (ProjectName.toLowerCase() == "cpf") {

                        PaginationLogString('headerCount: ' + headerCount + ', pageNumber: ' + pageNumber + ', fromPage: ' + fromPage + ', endPage :' + endPage);
                    }
                }
                catch (err) {

                }

                var html = '';
                html += '<tr>';
                html += '<td height="50" colspan="' + headerCount + '">';
                //html += '<span class="pagination pull-center" style="margin: 0px 0;">Page 1 to 10 (' + countRows + ' items)  </span>';
                html += '<ul class="pagination pull-center" style="margin: 0px 0;">';
                html += '<span   style="margin-top:8px;float:left;margin-right: 20px">Showing  ' + fromPage + ' to ' + endPage + ' (' + totalrows + ' entries)   </span>';

                try {
                    if (ProjectName.toLowerCase() == "cpf") {

                        PaginationLogString('stage:1, html : ' + html); // .replace(/'/g, "").replace(/"/g, "").replace('/', ""));
                    }
                }
                catch (err) {

                }

                if (pageNumber > 1) {
                    html += '<li style="background-color: #cccccc;" class="paginate_button"><a style="background-color:#cccccc;" href="#" onclick="FormListConfigRow(\'' + ttbody + '\',\'' + tfoot + '\',\'' + scrName + '\',' + 1 + ',\'' + SearchId + '\',\'' + fieldName + '\',\'' + actionType + '\')" aria-controls="example" data-dt-idx="2" tabindex="0"><<</a></li>';
                    html += '<li style="background-color: #cccccc;" class="paginate_button"><a style="background-color:#cccccc;" href="#" onclick="FormListConfigRow(\'' + ttbody + '\',\'' + tfoot + '\',\'' + scrName + '\',' + (pageNumber - 1) + ',\'' + SearchId + '\',\'' + fieldName + '\',\'' + actionType + '\')" aria-controls="example" data-dt-idx="2" tabindex="0"> Previous</a></li>';
                }

                try {
                    if (ProjectName.toLowerCase() == "cpf") {

                        PaginationLogString('stage:2, html : ' + html); //.replace(/(['"])/g, "\\$1"));
                    }
                }
                catch (err) {

                }

                var dotCount = 0;
                var pageNumberCount = (pageNumber >= (countRows - 5) ? (countRows - 5) - 1 : pageNumber == 1 ? pageNumber : pageNumber - 1);
                pageNumberCount = pageNumber >= (countRows - 4) ? (countRows - 5) : pageNumberCount;
                var isDotShow = pageNumber >= (countRows - 4) ? false : true;
                pageNumberCount = pageNumberCount <= 0 ? pageNumber : pageNumberCount;

                try {
                    if (ProjectName.toLowerCase() == "cpf") {

                        PaginationLogString('pageNumberCount : ' + pageNumberCount + ', isDotShow: ' + isDotShow + ', pageNumber: ' + pageNumber + ', countRows: ' + countRows + ', dotCount: ' + dotCount);
                    }
                }
                catch (err) {

                }

                for (var pagenum = pageNumberCount; pagenum <= countRows; pagenum++) {
                    dotCount++;
                    html += '<li style="background-color: #cccccc;" class="paginate_button"><a id="pagination_' + pagenum + '" style="background-color:#cccccc;" href="#" onclick="FormListConfigRow(\'' + ttbody + '\',\'' + tfoot + '\',\'' + scrName + '\',' + pagenum + ',\'' + SearchId + '\',\'' + fieldName + '\',\'' + actionType + '\')" aria-controls="example" data-dt-idx="2" tabindex="0"> ' + pagenum + '</a></li>';
                    if (dotCount == 3 & isDotShow) {
                        html += '<li style="background-color: #cccccc;" class="paginate_button"><a style="background-color:#cccccc;" href="#"  aria-controls="example" data-dt-idx="2" tabindex="0"> ...</a></li>';
                        pagenum = countRows - dotCount;
                    }
                }

                try {
                    if (ProjectName.toLowerCase() == "cpf") {

                        PaginationLogString('stage:3, html : ' + html); //.replace(/(['"])/g, "\\$1"));
                    }
                }
                catch (err) {

                }

                if (countRows > pageNumber) {
                    ttbody1 = '';
                    html += '<li style="background-color: #cccccc;" class="paginate_button"><a style="background-color:#cccccc;" href="#" onclick="FormListConfigRow(\'' + ttbody + '\',\'' + tfoot + '\',\'' + scrName + '\',' + (pageNumber + 1) + ',\'' + SearchId + '\',\'' + fieldName + '\',\'' + actionType + '\')" aria-controls="example" data-dt-idx="2" tabindex="0"> Next</a></li>';
                    html += '<li style="background-color: #cccccc;" class="paginate_button"><a style="background-color:#cccccc;" href="#" onclick="FormListConfigRow(\'' + ttbody + '\',\'' + tfoot + '\',\'' + scrName + '\',' + countRows + ',\'' + SearchId + '\',\'' + fieldName + '\',\'' + actionType + '\')" aria-controls="example" data-dt-idx="2" tabindex="0">>></a></li>';
                }
                else if (countRows == pageNumber) { // this not need
                    ttbody1 = ttbody; tfoot1 = tfoot; scrName1 = scrName; countRows1 = countRows; SearchId1 = SearchId; fieldName1 = fieldName; actionType1 = actionType;
                }
                
                html += '</ul>';
                html += '</td>';
                html += '</tr>';

                try {
                    if (ProjectName.toLowerCase() == "cpf") {

                        PaginationLogString('stage:4, html : ' + html); //.replace(/(['"])/g, "\\$1"));
                    }
                }
                catch (err) {

                }

                $('#' + tfoot).append(html);
                $('#pagination_' + pageNumber).css("background-color", "#041d67");
                $('#pagination_' + pageNumber).css("color", "white");

                if (isPageMultiSelect == true) {
                    $('#HeaderCheckBox_' + LastPageNumber + '').hide();
                    if ($('#HeaderCheckBox_' + pageNumber + '').val() == undefined) {
                        var htm = '<input type="checkbox" id="HeaderCheckBox_' + pageNumber + '" name="HeaderCheckBox_' + pageNumber + '"  onclick="HeaderCheckBoxClicked(this,\'' + fieldName + '\',\'' + pageNumber + '\' ,\'' + ttbody + '\',\'' + ttableId + '\',\'' + tfoot + '\');"  >';
                        $('#HeaderCheckBoxDiv').append(htm);
                    }
                    else
                        $('#HeaderCheckBox_' + pageNumber + '').show();
                    LastPageNumber = pageNumber;
                }
                try {
                    if (ProjectName.toLowerCase() == "cpf") {
                        
                        PaginationLogString('stage-end');
                    }
                }
                catch (err) {

                }
            } catch (errp) {
                $('#' + tfoot).append(html);
                $('#pagination_' + pageNumber).css("background-color", "#041d67");
                $('#pagination_' + pageNumber).css("color", "white");

                if (isPageMultiSelect == true) {
                    $('#HeaderCheckBox_' + LastPageNumber + '').hide();
                    if ($('#HeaderCheckBox_' + pageNumber + '').val() == undefined) {
                        var htm = '<input type="checkbox" id="HeaderCheckBox_' + pageNumber + '" name="HeaderCheckBox_' + pageNumber + '"  onclick="HeaderCheckBoxClicked(this,\'' + fieldName + '\',\'' + pageNumber + '\' ,\'' + ttbody + '\',\'' + ttableId + '\',\'' + tfoot + '\');"  >';
                        $('#HeaderCheckBoxDiv').append(htm);
                    }
                    else
                        $('#HeaderCheckBox_' + pageNumber + '').show();
                    LastPageNumber = pageNumber;
                }
            }
        }
        else {
            if (countRows == 1 && (data.length == 1 || data.length == (paginationCount + 2))) {
                var fromPage = pageNumber == "1" ? "1" : (pageNumber - 1) * pagesize + 1;
                var endPage = data.length == pagesize ? pageNumber * pagesize : (pageNumber - 1) * pagesize + data.length;
                var html = '';
                html += '<tr>';
                html += '<td height="50" colspan="' + headerCount + '">';
                html += '<ul class="pagination pull-center" style="margin: 0px 0;">';
                html += '<span   style="margin-top:8px;float:left;margin-right: 20px">Showing  ' + fromPage + ' to ' + endPage + ' (' + totalrows + ' entries)   </span>';

                html += '</ul>';
                html += '</td>';
                html += '</tr>';
                $('#' + tfoot).append(html);
            }
            if (data != null && addCount == (data.length - 1)) {
                if (isPageMultiSelect == true) {
                    $('#HeaderCheckBox_' + LastPageNumber + '').hide();
                    if ($('#HeaderCheckBox_' + pageNumber + '').val() == undefined) {
                        var htm = '<input type="checkbox" id="HeaderCheckBox_' + pageNumber + '" name="HeaderCheckBox_' + pageNumber + '"  onclick="HeaderCheckBoxClicked(this,\'' + fieldName + '\',\'' + pageNumber + '\' ,\'' + ttbody + '\',\'' + ttableId + '\',\'' + tfoot + '\');"  >';
                        $('#HeaderCheckBoxDiv').append(htm);
                    }
                    else
                        $('#HeaderCheckBox_' + pageNumber + '').show();
                    LastPageNumber = pageNumber;
                }
            }
        }
    } catch (err) {

    }

    listRowClicked(ttbody, tfoot, ttableId, scrName, fieldName);

    if (_isList_FieldName == true && fieldName.split('_').length == 2) {
        FieldName = fieldName.split('_')[0];
    }
    else
        FieldName = fieldName;

    if (DropDownIdList.length > 0 && (isLastLineCombobox == 1 || result == "" || result.List == "[]" || result.List == "")) {
        GetListDropDownListValue(scrName, FieldName, ttbody, addCount);
    }

    if (data != null && (data.length == (paginationCount + 2) || data.length == 1)) {
        if (SearchId == '') {
            GetSearchConfig(scrName, FieldName, ttbody, tfoot);
        }
    }
    else {
        GetSearchConfig(scrName, FieldName, ttbody, tfoot);
    }
    

    if (AutoCompleteList.length > 0) {
        GetAutoCompleteListValue(scrName, "List");
       // AutoCompleteList = [];
    }
    if (AutoCompleteWithTextList.length > 0) {
        GetAutoCompleteListWithTextValue(scrName, "List");
        AutoCompleteWithTextList = [];
    }
    if (isDataMemberTypeInt == true) {
        isDataMemberTypeInt = false;
        intOnly();
    }
    if (isDateTimePicker == true) {
        isDateTimePicker = false;
        listDatePicker();
        DateTimeIdGridList = [];
    }
    if (isTimePicker == true) {
        isTimePicker = false;
        listTimePicker();
        TimeIdGridList = [];
    }

    

}


function HeaderCheckBoxClicked(obj, fieldName, pageNumber, ttbody, ttableId, tfoot) {



    LoadingImagePopUpOpen();

    setTimeout(function () {
        var tblbody = document.getElementById(ttbody);
        var table = document.getElementById(ttableId);
        var rows = table.getElementsByTagName('tr');
        var i = 0;

        var dataMember;
        var currentInx = 0;
        //for (i = 0; i < rows.length - 1; i++) {
        for (i = 0; i < rows.length; i++) {
            var cells = rows[i].getElementsByTagName('td');
            if (!cells.length) {
                continue;
            }
            currentInx = (i - 1);
            dataMember = cells[0].id;
            if (tblbody.rows[currentInx] != undefined) {
                tblbody.rows[currentInx].cells.namedItem(dataMember).childNodes['0'].checked = obj.checked;
                checkBoxValueChanged(obj, dataMember, currentInx, ttbody, tfoot, fieldName)
            }
            LoadingImagePopUpClose();
        }
    }, 200);

}

function GetFontStyle(sStyle) {
    if (sStyle == 100)
        return "font-weight:bold;"
    else if (sStyle == 10)
        return "font-style: italic;"
    else if (sStyle == 1)
        return "text-decoration: underline"
    else if (sStyle == 110)
        return "font-weight:bold; font-style: italic;"
    else if (sStyle == 11)
        return "font-style: italic; text-decoration: underline"
    else if (sStyle == 101)
        return "font-weight:bold; text-decoration: underline"
    else if (sStyle == 111)
        return "font-weight:bold; font-style: italic; text-decoration: underline"
    else
        return "font-weight: normal";

    //if (sStyle = 100)
    //    return "BOLD"
    //else if (sStyle = 10)
    //    return "ITALIC"
    //else if (sStyle = 1)
    //    return "UNDERLINE"
    //else if (sStyle = 110)
    //    return "BOLD | ITALIC"
    //else if (sStyle = 11)
    //    return "ITALIC | UNDERLINE"
    //else if (sStyle = 101)
    //    return "BOLD | UNDERLINE"
    //else if (sStyle = 111)
    //    return "BOLD | ITALIC | UNDERLINE"
    //else
    //    return "";
}

var isListColumnCheckBox = '';
var listColumnName = '';
var listColumnIndex = '';
var listRowIndex = '';
function listonclickFunction(columname, columnIndex, rowIndex) {
    listColumnName = columname;
    listColumnIndex = columnIndex;
    listRowIndex = rowIndex;
    isListColumnCheckBox = true;
}

function listonclickFunction(obj, dataMember, rowIndex, value) {
    var _obj = {};
    _obj.value = CheckBoxFieldValue(dataMember);
    _obj.fieldName = dataMember;
    PerformAction('formOptionChange', _obj/*, dataMember*/);
}

var rowItemArray = [];

function getId(element, fieldName) {
    rowItemArray = [];
    if (_objData1[fieldName] != undefined) {
        for (var i = 0; i < _objData1[fieldName].length; i++) {
            rowItemArray.push(_objData1[fieldName][i]);
        }
    }
    rowItemArray.push(element.rowIndex);
    _objData1[fieldName] = rowItemArray;

}

function ListRowClickFunction(rowIndexNo, tbodyId, scrName, fieldName) {
    FieldName = fieldName;
    rowIndexNo =
        //var _obj = {};
        //_obj.rowIndex = rowIndexNo;
        selectedRowIndex = rowIndexNo;
    //   PerformAction('rowItemClicked', _obj);

}
var ListSelectedId = [];
var LookUpMultiSelected = [];
var TempLookUpMultiSelected = [];
var LookUpUnSelected = [];
var TempLookUpUnSelected = [];
var FormView = {};
var Params = {};
var LastParams = {};
var _objData = {};
var _objData1 = {};
var currentRowevent = '';
var uniqueId = '';

function tableclickfunction1(tbodyId, scrName, fieldName) {
    $('#table_' + CurrentScreen_TabScreen_Name + '_' + FieldName + ' >tbody > tr').click(function (event) {
        currentRowevent = event;
    });

}

function tableclickfunction(tbodyId, scrName, fieldName) {
    var obj = {};
    var _obj = {};
    var formView = {};
    var listView = {};
    // Params = {};
    _objData[FieldName] = _obj;

    $('#table_' + CurrentScreen_TabScreen_Name + '_' + FieldName + ' >tbody > tr').click(function (event) {
        event.stopImmediatePropagation();
        searchOptionArray = []


        //todo 24.05.2019 /// command for inv- adj
        // Params.FormView = FormView;

        $("#table_" + CurrentScreen_TabScreen_Name + "_" + FieldName + " tr").removeClass('highlighted');
        $("#table_" + CurrentScreen_TabScreen_Name + "_" + FieldName + " tr").addClass('highlighted');
        $(this).addClass('highlighted')


        if (isListLookUpClicked == false || _isdynamic == false || isMultiSelect == false) {
            //if (isListLookUpClicked == false || _isdynamic == false) {
            //$("#table_" + CurrentScreen_TabScreen_Name + "_" + FieldName + " >tbody > tr > td").click(function (event) {

            var isClickColumnEvent = $(this).index();
            //selectedListColumnNo = event.currentTarget.cellIndex;
            selectedListColumnNo = event.target.cellIndex == undefined ? isListColumnCheckBox == true ? listColumnIndex : 0 : event.target.cellIndex;
            selectedListColumnName = ListHeaderList['ListConfig_' + CurrentScreen_TabScreen_Name + '_' + FieldName][selectedListColumnNo].FieldName;

            /////////////////////
            //todo 24.05.2019 /// command for inv- adj and stock transfer
            // Params.FormView = FormView;
            //dynamicFieldName = FormView.FieldName;
            //if (currentScreenName == "ItemPromotionForm" || currentScreenName == "InvoicePromotionForm")
            //    dynamicFieldName = "Item";
            //else
            dynamicFieldName = FieldName.split('_')[0];
            //if (isListLookUpClicked == false) {
            obj = {};
            _obj = {};
            FormView = {};
            listView = {};
            var fieldControl = '';
            for (var i = 0; i < _objArray.arrForm.length; i++) {
                fieldControl = _objArray.arrForm[i].FieldControl;
                id = _objArray.arrForm[i].DataMember;
                if (fieldControl != "LISTVIEW" && id != "") {
                    textvalue = fieldControl == "LABEL" ? $('#' + id).text() : $('#' + id).val();
                    obj[id] = textvalue;
                    FormView[id] = textvalue;
                    _objData[id] = textvalue;
                }
            }
            FormView.FieldName = FieldName;

            var listConfig = ListHeaderList['ListConfig_' + CurrentScreen_TabScreen_Name + '_' + FieldName];
            //for (var i = 0; i < _objArray.arrList.length; i++) {
            for (var i = 0; i < listConfig.length; i++) {
                id = _objArray.arrList[i].DataMember;
                if (isListColumnCheckBox == true && event.target.type == "checkbox" && id == "MultiSelect")
                    textvalue = event.target.checked;
                else if (listConfig[i].IsHidden == true)
                    textvalue = event.currentTarget.cells[i].childNodes['0'].defaultValue;
                else
                    textvalue = event.currentTarget.cells[i].innerText;

                _obj[id] = textvalue;
                listView[id] = textvalue;
            }
            _obj.FieldName = FieldName;
            FormView[FieldName] = _obj;
            FormView.SelectedListColumnNo = selectedListColumnNo;
            FormView.SelectedListColumnName = selectedListColumnName;

            obj[FieldName] = _obj;
            _objData[FieldName] = _obj;
            //  Params.FormView = obj;
            // 

            cation = url_ActionConfigClass + "?ScreenName=" + scrName + "&FieldName=" + '' + "&ActionName=" + "rowItemClicked&data=" + JSON.stringify(obj);
            //window.location = url_ActionConfigClass + "?ScreenName=" + scrName + "&FieldName=" + '' + "&ActionName=" + "rowItemClicked&FormView=" + JSON.stringify(formView) + "&ListView=" + replaceHashSymbol(JSON.stringify(listView));// 2two parameter

            //TODO
            // window.location = url_ActionConfigClass + "?ScreenName=" + scrName + "&FieldName=" + FieldName + "&ActionName=" + "rowItemClicked&FormView=" + replaceHashSymbol(JSON.stringify(FormView));//single parameter

            //  if (isListLookUpClicked == false || _isdynamic == false) {
            if (isListLookUpClicked == true && isdynamic == false) {
                AssignLookUpData('rowItemClicked', listView);
                fieldName = objParams.fieldName;
                FieldName = objParams.fieldName;
                dynamicFieldName = objParams.dynamicFieldName;
                objParams.fieldName = '';
                objParams.dynamicFieldName = '';
                LookUpchangeFunction(fieldName);


                //22.05
                FormView = Params.FormView;
                Params.FormView = LastParams.FormView

                if (CurrentScreen_TabScreen_Name == "CustomerProductForm") {
                    if (_action != 'create')
                        ListSelectedId = [];
                }
                else if (CurrentScreen_TabScreen_Name != "StockTransferForm")
                    ListSelectedId = [];
            }
            else if (isdynamic == true) {
                //&& isListLookUpClicked == false
                AssignListData('rowItemClicked', listView, dynamicFieldName);

                // FieldName = Params.FormView.FieldName;
                if (currentScreenName == "ItemPromotionForm" || currentScreenName == "InvoicePromotionForm") {
                    if (tableTotalRowCount == dynamicRowindex) {
                        var actionPlan = "AddEmptyRow";
                        isDynamicValidate = true;
                        AddDynamicListNewItemPromtion(CurrentScreen_TabScreen_Name, "ListBodyDivId_" + CurrentScreen_TabScreen_Name + "_" + FieldName, FieldName, actionPlan, isDynamicValidate);
                    }
                }
                else
                    AddDynamicList(CurrentScreen_TabScreen_Name, "ListBodyDivId_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName, dynamicFieldName);
                isdynamic = false;
            }
            else {
                var _obj = {};
                _obj.rowIndex = selectedRowIndex;
                PerformAction('rowItemClicked', _obj);
            }
            // }
        }
        else {
            if (isListLookUpClicked == true && event.target.checked != undefined) {
                selectedListColumnNo = event.target.cellIndex == undefined ? isListColumnCheckBox == true ? 0 : 0 : event.target.cellIndex;
                selectedListColumnName = ListHeaderList['ListConfig_' + CurrentScreen_TabScreen_Name + '_' + FieldName][selectedListColumnNo].FieldName;
                var _obj = {};
                var listConfig = ListHeaderList['ListConfig_' + CurrentScreen_TabScreen_Name + '_' + FieldName];
                id = _objArray.arrList[1].DataMember;
                uniqueId = id;
                //textvalue = event.currentTarget.cells[1].innerText;
                textvalue = event.currentTarget.cells[1].innerHTML;
                _obj[id] = textvalue;
                listView[id] = textvalue;
                FormView[FieldName] = _obj;
                if (event.target.checked == true) {
                    LookUpMultiSelected.push(_obj);
                    TempLookUpMultiSelected.push(_obj);
                }
                else {
                    LookUpUnSelected.push(_obj);
                    LookUpMultiSelected = jQuery.grep(LookUpMultiSelected, function (value) { return value[id] != LookUpUnSelected[0][id]; });
                    TempLookUpMultiSelected = jQuery.grep(TempLookUpMultiSelected, function (value) { return value[id] != LookUpUnSelected[0][id]; });
                    //LookUpMultiSelected.splice($.inArray(LookUpUnSelected, LookUpMultiSelected), 1);
                    LookUpUnSelected = [];
                }

                //if (event.target.checked == true)
                //    LookUpMultiSelectedA.push(_obj);
                //else {
                //    LookUpUnSelected.push(_obj);
                //    LookUpMultiSelectedA = jQuery.grep(LookUpMultiSelectedA, function (value) { return value[id] != LookUpUnSelected[0][id]; });
                //    //LookUpMultiSelected.splice($.inArray(LookUpUnSelected, LookUpMultiSelected), 1);
                //    LookUpUnSelected = [];
                //}

            }
        }

        // }
    });


}

function AssignListDynamicData() {
    searchOptionArray = []
    TempLookUpMultiSelected = [];
    dynamicRowindex = tableTotalRowCount;

    $('#popupdialog').dialog("close");
    var tempMultiSelected = [];
    tempMultiSelected = LookUpMultiSelected;
    for (var y = 0; y < ListSelectedId.length; y++) {
        tempMultiSelected = jQuery.grep(tempMultiSelected, function (value) {
            return value[uniqueId] != ListSelectedId[y][uniqueId];
        });
    }
    var tempFieldName = FieldName;
    for (var i = 0; i < tempMultiSelected.length; i++) {
        if (i >= 1) {
            dynamicRowindex++;
            currentRowClickCount++;
        }
        textvalue = tempMultiSelected[i][uniqueId];
        var obj = {};
        obj[uniqueId] = textvalue;
        obj["UserNo"] = tempUserNo;
        // FormView.UserNo = tempUserNo;
        FormView[tempFieldName] = obj;

        //todo 22.05.2019
        //  Params.FormView = FormView;

        listView[uniqueId] = tempMultiSelected[i][uniqueId];
        AssignListData('rowItemClicked', listView, dynamicFieldName);

        ListSelectedId.push(obj);

        ///this 3 line added for item and invoice promotion
        if (currentScreenName == "ItemPromotionForm" || currentScreenName == "InvoicePromotionForm") {
            // AddDynamicListItemPromtion(scrName, ttbody, fieldName, SearchId, data.length, i);
            var actionPlan = "AddEmptyRow";
            isDynamicValidate = true;
            AddDynamicListNewItemPromtion(CurrentScreen_TabScreen_Name, "ListBodyDivId_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName, dynamicFieldName, actionPlan, isDynamicValidate);
        }
        else
            AddDynamicList(CurrentScreen_TabScreen_Name, "ListBodyDivId_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName, dynamicFieldName);
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

function AssignLookUpData(sActionEvent, listView) {
    var scrName = TabScreenName == '' ? currentScreenName : currentScreenName + "_" + TabScreenName;
    var sScreenName = scrName + "_FORM_LOOKUP_" + _lookUpFieldId;
    var qry = getString['QueryConfig_' + sScreenName + '']
    qry += ' ' + getString['QueryConfig_' + sScreenName + '_GroupText'];
    qry += ' ' + getString['QueryConfig_' + sScreenName + '_OrderText'];
    qry = formatQueryString(qry, sScreenName);//ScreenView

    execute(qry);
    returnData = executeStringQry;
    // PerformAction111(sActionEvent, listView, _lookUpFieldId, currentScreenName);
    executeStringQry = executeStringQry.replace('[', '').replace(']', '');
    formData = $.parseJSON(executeStringQry);

    if (formData != null)
        $.each(formData, function (key, value) {
            $('#' + key.replace("FormView.", '')).val(value);
        });
    isListLookUpClicked = false;
    $('#popupdialog').dialog("close");
}

function GetParameters() {
    var obj = {};
    var _obj = {};
    var formView = {};
    var listView = {};
    var fieldControl = '';
    for (var i = 0; i < _objArray.arrForm.length; i++) {
        fieldControl = _objArray.arrForm[i].FieldControl;
        id = _objArray.arrForm[i].DataMember;

        if (fieldControl != "LISTVIEW" && id != "") {
            textvalue = fieldControl == "LABEL" ? $('#' + id).text() : $('#' + id).val();
            obj[id] = textvalue;
            formView[id] = textvalue;
        }
        else if (fieldControl == 'LISTVIEW') {//change to upper 

        }
        //for (var i = 0; i < arr; i++) {
        //    $('#' + arr[i]).val();
        //}
    }
}

var formListscrName = '';
var formListttbody = '';
var currentRowClickCount = 0;
var totalItemTableRowCount = 0;

function EmptyRowClickFunction(scrName, ttbody, cnt, fieldName, tis) {
    dynamicFieldName = fieldName;
    currentRowClickCount = parseInt(cnt);
console.log('formlistconfig.js,2364,index-' +  currentRowClickCount);
    formListttbody = ttbody;
    formListscrName = scrName;
    var _obj = {};
    // PerformAction('rowItemClicked', _obj, '', scrName);
    //addDynamicitem(scrName, ttbody);

}

function getTableRowTDid(value) {
    return value.split('>')[0].split('id=').length == 1 ? "" : value.split('>')[0].split('id=')[1].split("\"")[1];
}

function getTableRowTDvalue(value) {
    return value.split('>').length > 2 ? '' : value.split('>')[1];
}

function getTableRowTDType(value) {
    if (value.indexOf("timepicker") > 0)
        return "timepicker";
    else if (value.indexOf('_blank') > -1 && value.indexOf('href') > -1 && value.indexOf('input') != 1 && value.indexOf('<div class=\"input-group\">') != 0)
         return "linktab";
    else if (value.indexOf('href') > -1 && value.indexOf('input') != 1 && value.indexOf('<div class=\"input-group\">') != 0)
        return "link";
    if (value.indexOf('svg') > -1)
        return "barcode";
    else if (value.indexOf('★') > -1)
        return "starrating";
    else if (value.indexOf('<h3 ') > -1)
        return "starratingoutput";
    else if (value.indexOf('<div class=\"input-group\">') == 0)
        return "lookup";
    else if (value.indexOf('tab1') > -1)
        return "tabtext";
    else {
        return value.split('>')[0].split('type=').length == 1 ? value.split('>')[0].split('<label').length == 2 ? "label" : value.split('>')[0].split('<select').length == 1 ? "" : "select" : value.split('>')[0].split('type=')[1].split("\"")[1];
    }
}

function getTableDataMemberType(value) {
    return value.split('datamembertyp')[1] == undefined ? "" : value.split('datamembertyp')[1].split("\"")[1];
}

function getTableRowFullTDType(value) {
    return value.split('>')[1].split('type=').length == 1 ? value.split('>')[1].split('select').length == 2 ? "select" : "" : value.split('>')[1].split('type=')[1].split("\"")[1];
}

var objAddDynamicListCount = {};

var addCount = -1;
var isDynamicValidate = true;

function AddDynamicList(scrName, ttbody, fieldName) {
    var lastRowCount = $('table#table_' + CurrentScreen_TabScreen_Name + '_' + fieldName + ' tr:last').index() + 1;
    // if (addCount == -1 || lastRowCount ==1) {
    debugger;
    if (addCount == -1) {
        var obj = {};
        obj["UserNo"] = tempUserNo;
        FormView[FieldName] = obj;

        var _obj = {};
        _obj.fieldName = 'TempTableDelete';
        PerformAction('listTextFieldLostFocus', _obj);
    }
    isDynamicValidate = true;
    var id = '';
    var value = '';
    listView = {};
    FieldName = fieldName;
    //this line command add function start line //Invoicepromotion
    // var lastRowCount = $('table#table_' + CurrentScreen_TabScreen_Name + '_' + fieldName + ' tr:last').index() + 1;
    addCount = objAddDynamicListCount['ListConfig_' + CurrentScreen_TabScreen_Name + '_' + fieldName] == undefined ? -1 : objAddDynamicListCount['ListConfig_' + CurrentScreen_TabScreen_Name + '_' + fieldName];
    if (addCount >= 0) {
        //  var lastRowDataString = document.getElementById("table_" + CurrentScreen_TabScreen_Name + "_" + fieldName).rows[(addCount + 1)].innerHTML;
        var lastRowDataString = document.getElementById("table_" + CurrentScreen_TabScreen_Name + "_" + fieldName).rows[(dynamicRowindex)].innerHTML;
        var lastRowData = lastRowDataString.split('</td>')
        var istextValueAssigned = false;
        var isselectValueAssigned = false;
        var dynamicFieldName1 = "Item";

        for (var i = 0; i < (lastRowData.length - 1); i++) {
            id = getTableRowTDid(lastRowData[i]);

            //var tblbody = document.getElementById("ListBodyDivId_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName);
            var tblbody = document.getElementById("ListBodyDivId_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName);
            
            //  
            //var tblbody = document.getElementById("ListBodyDivId_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName);
            if (currentScreenName == "ItemPromotionForm" || currentScreenName == "InvoicePromotionForm") {
                tblbody = document.getElementById("ListBodyDivId_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName1);
            }
            //

            //inventory adjusment change currentRowClickCount to dynamicRowindex 
            //var tdType = tblbody.rows[currentRowClickCount] == undefined ? "" : getTableRowTDType(tblbody.rows[currentRowClickCount].cells.namedItem(id).innerHTML);
            var tdType = tblbody.rows[(dynamicRowindex - 1)] == undefined ? "" : getTableRowTDType(tblbody.rows[(dynamicRowindex - 1)].cells.namedItem(id).innerHTML);
            if (tdType == "text" || tdType == "select" || tdType == "button") {
                value = tblbody.rows[(dynamicRowindex - 1)].cells.namedItem(id).childNodes['0'].value;
                //tblbody.rows[currentRowClickCount].cells.namedItem(id).innerText
                listView[id] = value;
            }
            else {
                value = tblbody.rows[(dynamicRowindex - 1)].cells.namedItem(id).innerText;
                //value = tblbody.rows[currentRowClickCount].cells.namedItem(id).innerHTML;
                listView[id] = value;
            }

            ////////////////////////command for inventory adjesment
            //var tdType = tblbody.rows[currentRowClickCount] == undefined ? "" : getTableRowTDType(tblbody.rows[currentRowClickCount].cells.namedItem(id).innerHTML);
            //if (tdType == "text" || tdType == "select" || tdType == "button") {
            //    value = tblbody.rows[currentRowClickCount].cells.namedItem(id).childNodes['0'].value;
            //    //tblbody.rows[currentRowClickCount].cells.namedItem(id).innerText
            //    listView[id] = value;
            //}
            //else {
            //    value = tblbody.rows[currentRowClickCount].cells.namedItem(id).innerText;
            //    //value = tblbody.rows[currentRowClickCount].cells.namedItem(id).innerHTML;
            //    listView[id] = value;
            //}
            ////////////////////////////



            //command for item promotion//
            ///--
            //if (tdType == "checkbox") {
            //    //    checkBox[dynamicRowindex].checked = false;
            //}
            //else if (tdType == "text" && istextValueAssigned == false) {
            //    var textbox = $('#ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName + ' tr').find("input");
            //    if (currentScreenName == "ItemPromotionForm" || currentScreenName == "InvoicePromotionForm") {
            //        textbox = $('#ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName1 + ' tr').find("input");
            //    }
            //    //  var rowIndexCount = dynamicRowindex == 1 ? dynamicRowindex : dynamicRowindex + 1;
            //    var dividedCount = textbox.length / dynamicRowindex;
            //    // var dividedCount = textbox.length / rowIndexCount;
            //    var minusCount = textbox.length - dividedCount;

            //    for (var y = minusCount; y < textbox.length; y++) {
            //        id = textbox[y].id.split('_')[0];
            //        value = textbox[y].value
            //        listView[id] = value;
            //    }
            //    istextValueAssigned = true;
            //}
            //else if (tdType == "select" && isselectValueAssigned == false) {
            //    var select = $('#ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName + ' tr').find("select");
            //    if (currentScreenName == "ItemPromotionForm" || currentScreenName == "InvoicePromotionForm") {
            //        select = $('#ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName1 + ' tr').find("select");
            //    }
            //    for (var y = 0; y < select.length; y++) {
            //        id = select[y].id;
            //        value = select[y].value
            //        listView[id] = value;
            //    }
            //    isselectValueAssigned = true;
            //}
            //else if ((isselectValueAssigned == false && istextValueAssigned == false) || tdType == "") {
            //    // id = getTableRowTDid(lastRowData[i]);
            //    value = getTableRowTDvalue(lastRowData[i]);
            //    listView[id] = value;
            //}
            ///--
        }
    }
    else {
        var listConfig = ListHeaderList['ListConfig_' + CurrentScreen_TabScreen_Name.replace(" ", "") + '_' + FieldName];
        for (var i = 0; i < listConfig.length; i++) {
            // id = _objArray.arrList[i].DataMember;
            id = listConfig[i].DataMember;
            value = "First Count dummy Data";
            listView[id] = value;
        }
        listView.FieldName = FieldName;
        listView["UserNo"] = tempUserNo;
    }


    FormView.FieldName = FieldName;
    FormView[FieldName] = listView;
    //


    if (currentScreenName == "ItemPromotionForm" || currentScreenName == "InvoicePromotionForm")
        dynamicFieldName = fieldName;
    var trowTotalCount = $('#table_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName + ' >tbody >tr').length - 1;

    var actionPlan = '';
    if (currentRowClickCount == trowTotalCount || trowTotalCount == -1 || addCount == trowTotalCount) {
        actionPlan = "AddEmptyRow";
    }

    //Command for --Todo
    //var _obj = {};
    //_obj.fieldName = fieldName;
    //var actionPlan = PerformAction('listAddClicked', _obj);
    //
    if (currentScreenName == "ItemPromotionForm" || currentScreenName == "InvoicePromotionForm") {
        AddDynamicListNewItemPromtion(scrName, ttbody, fieldName, actionPlan, isDynamicValidate);//List.js
    }
    else {
        var rowCount = $('#table_' + CurrentScreen_TabScreen_Name + '_' + fieldName + ' tr').length;
        var trowCount = $('#table_' + CurrentScreen_TabScreen_Name + '_' + fieldName + ' >tbody >tr').length;
        var rowCount = $('table#myTable tr:last').index() + 1;

        if (actionPlan == "AddEmptyRow" && isDynamicValidate) {
            var listConfig = ListHeasderList['ListConfig_' + CurrentScreen_TabScreen_Name + '_' + fieldName];
            objAddDynamicListCount['ListConfig_' + CurrentScreen_TabScreen_Name + '_' + fieldName] = objAddDynamicListCount['ListConfig_' + CurrentScreen_TabScreen_Name + '_' + fieldName] == undefined ? 0 : objAddDynamicListCount['ListConfig_' + CurrentScreen_TabScreen_Name + '_' + fieldName] + 1;
            addCount = objAddDynamicListCount['ListConfig_' + CurrentScreen_TabScreen_Name + '_' + fieldName];
            var htm = '';
            // htm += '<tr id="' + fieldName + i + '"  class="tablecell" onclick="ListRowClickFunction(\'' + i + '\',\'' + ttbody + '\',\'' + scrName + '\',\'' + fieldName + '\');getId(this,\'' + fieldName + '\');">';

            htm += '<tr  id="' + fieldName + addCount + '" style="background-color:' + listConfig[1].RBackColor + ';" class="tablecell trRow_' + addCount + '" id="trRow_' + addCount + '" onclick="EmptyRowClickFunction(\'' + scrName + '\',\'' + ttbody + '\',\'' + addCount + '\',\'' + fieldName + '\',this)">';

            //htm += '<td style="width:35px;background-color: #ffffff">';
            //if (addCount == 0)
            //    htm += '';
            //else
            //    htm += '<button  id="delete" onclick="RemoveItem(' + addCount + ');" class="btn"><i class="fa fa-close"></i></button>';
            //htm += '</td>';

            for (var j = 0; j < listConfig.length; j++) {
                //if (listConfig[j].IsHidden != 1 && listConfig[j].ColumnWidth != "0px" && (isBtnFormPopUpTable == false)) {
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
                            if (listConfig[j].DataMemberType == "NUMBER")
                                htm += '<input type="text" id="' + listConfig[j].FieldName + '" value="" onkeypress="restrictMinus(event);" onfocus="listTextFieldFocus(this,\'' + listConfig[j].FieldName + '\',' + addCount + ',\'' + listConfig[j].FieldName + '\',\'' + fieldName + '\',\'' + ttbody + '\',\'' + tfoot + '\');"onblur="listTextFieldLostFocus(this,\'' + listConfig[j].FieldName + '\',' + addCount + ',\'' + listConfig[j].FieldName + '\',\'' + fieldName + '\',\'' + ttbody + '\',\'' + tfoot + '\');"onkeyup="listTextFieldChange(this,\'' + listConfig[j].FieldName + '\',' + addCount + ',\'' + listConfig[j].FieldName + '\',\'' + fieldName + '\',\'' + ttbody + '\',\'' + tfoot + '\');" />';
                            else
                                htm += '<input type="text" id="' + listConfig[j].FieldName + '" value="" onfocus="listTextFieldFocus(this,\'' + listConfig[j].FieldName + '\',' + addCount + ',\'' + listConfig[j].FieldName + '\',\'' + fieldName + '\',\'' + ttbody + '\',\'' + tfoot + '\');"onblur="listTextFieldLostFocus(this,\'' + listConfig[j].FieldName + '\',' + addCount + ',\'' + listConfig[j].FieldName + '\',\'' + fieldName + '\',\'' + ttbody + '\',\'' + tfoot + '\');"onkeyup="listTextFieldChange(this,\'' + listConfig[j].FieldName + '\',' + addCount + ',\'' + listConfig[j].FieldName + '\',\'' + fieldName + '\',\'' + ttbody + '\',\'' + tfoot + '\');" />';
                            htm += '</td>';
                            break;
                        case "label":
                            // htm += '<td  id="' + listConfig[j].FieldName + '" style="width:' + listConfig[j].ColumnWidth + ';font-family: ' + listConfig[j].RFont + ';font-size:' + listConfig[j].RFontSize + ';color: ' + listConfig[j].RForeColor + ' ;background-color:' + listConfig[j].RBackColor + '; text-align:' + getAlignStyle(listConfig[j].Alignment) + ';' + fontWeight + '">';
                            htm += '<td  id="' + listConfig[j].FieldName + '" style="width:' + listConfig[j].ColumnWidth + ';font-family: ' + listConfig[j].RFont + ';font-size:' + listConfig[j].RFontSize + ';color: ' + listConfig[j].RForeColor + ' ;background-color:""; text-align:' + getAlignStyle(listConfig[j].Alignment) + ';' + fontWeight + '">';
                            htm += '<label  id="' + listConfig[j].FieldName + '" > </label>';
                            htm += '</td>';
                            break;

                        case "combobox":
                            comboboxdata = {};
                            comboboxdata.DataMember = listConfig[j].FieldName;
                            comboboxdata.ScreenName = listConfig[j].ScreenName;
                            comboboxdata.FormListType = "List";
                            DropDownIdList.push(comboboxdata);
                            //DropDownIdList.push(listConfig[j].FieldName);
                            //vBackColor = '';
                            var rFontSize = parseInt(listConfig[j].RFontSize.replace('px', '')) + 2;
                            htm += '<td  id="' + listConfig[j].FieldName + '" style="width:' + listConfig[j].ColumnWidth + ';font-family: ' + listConfig[j].RFont + ';font-size:' + listConfig[j].RFontSize + ';color: ' + listConfig[j].RForeColor + ' ;background-color:' + listConfig[j].RBackColor + '; text-align:' + getAlignStyle(listConfig[j].Alignment) + ';' + fontWeight + '">';
                            //htm += '<select id="' + listConfig[j].DataMember + '"   onchange="listComboChange(this,\'' + listConfig[j].FieldName + '\',' + addCount + ',\'' + listConfig[j].FieldName + '\',\'' + fieldName + '\');" style="  height: ' + listConfig[j].ValueHeight + "px" + ';font-size:' + listConfig[j].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + listConfig[j].VFont + ';text-align:' + getAlignStyle(listConfig[j].VAlignment) + ';" >';
                            //htm += '<select id="' + listConfig[j].DataMember + '" onchange="listComboChange(this,\'' + listConfig[j].FieldName + '\',' + addCount + ',\'' + listConfig[j].FieldName + '\',\'' + fieldName + '\');"  style="  height: ' + listConfig[j].ValueHeight + "px" + ';font-size:' + listConfig[j].VFontSize + "px" + ';color:' + vForeColor + ';background-color:' + vBackColor + ';font-family:' + listConfig[j].VFont + ';text-align:' + getAlignStyle(listConfig[j].VAlignment) + ';" >';

                            if (listConfig[j].RBackColor == '#ffffff')
                                htm += '<select id="' + listConfig[j].DataMember + '"   onchange="listComboChange(this,\'' + listConfig[j].FieldName + '\',' + addCount + ',\'' + listConfig[j].FieldName + '\',\'' + fieldName + '\');" style="font-size:' + rFontSize + "px" + ';color:' + vForeColor + ';background-color:#f0f0f0;font-family:' + listConfig[j].RFont + ';text-align:' + getAlignStyle(listConfig[j].Alignment) + ';" >';
                            else
                                htm += '<select id="' + listConfig[j].DataMember + '"   onchange="listComboChange(this,\'' + listConfig[j].FieldName + '\',' + addCount + ',\'' + listConfig[j].FieldName + '\',\'' + fieldName + '\');" style="font-size:' + rFontSize + "px" + ';color:' + vForeColor + ';background-color:' + listConfig[j].RBackColor + ';font-family:' + listConfig[j].RFont + ';text-align:' + getAlignStyle(listConfig[j].Alignment) + ';" >';

                            htm += '</select>';
                            htm += '</td>';
                            break;

                        case "option":
                            htm += '<td  id="' + listConfig[j].FieldName + '" style="width:' + listConfig[j].ColumnWidth + ';font-family: ' + listConfig[j].RFont + ';font-size:' + listConfig[j].RFontSize + ';color: ' + listConfig[j].RForeColor + ' ;background-color:' + listConfig[j].RBackColor + '; text-align:' + getAlignStyle(listConfig[j].Alignment) + ';' + fontWeight + '">';
                            htm += '<input type="checkbox" id="' + listConfig[j].DataMember + '" onchange="listCheckBoxValueChanged(this,\'' + listConfig[j].FieldName + '\',' + j + ',\'' + $('#' + listConfig[j].DataMember).val() + '\');"  onclick="listCheckBoxClickFunction(this,\'' + listConfig[j].FieldName + '\',' + trowCount + ');" value="">';

                            htm += '</td>';
                            break;

                        case "lookup1":
                            htm += '<td  id="' + listConfig[j].FieldName + '" style="width:' + listConfig[j].ColumnWidth + ';font-family: ' + listConfig[j].RFont + ';font-size:' + listConfig[j].RFontSize + ';color: ' + listConfig[j].RForeColor + ' ;background-color:' + listConfig[j].RBackColor + '; text-align:' + getAlignStyle(listConfig[j].Alignment) + ';' + fontWeight + '">';
                            htm += '<input type="text" id="' + listConfig[j].FieldName + '"  onclick="formReadonlyClicked(\'' + listConfig[j].FieldName + '\');" style="width:80%"  />';
                            htm += '<span href="#" style="width:20%;listConfig[j].oat:right;margin-top:5px;height:30px;"   onclick="formLookUpClicked(\'' + listConfig[j].FieldName + '\');GetLookUpData1(\'' + listConfig[j].FieldName + '\',\'' + listConfig[j].FieldName + '\',\'' + "" + '\');" class="input-group-addon"> <i class="fa fa-plus"></i>  </span>';
                            htm += '</td>';
                            break;
                        case "lookup":

                            autoCompletedata = {};
                            autoCompletedata.DataMember = data[j].DataMember;
                            autoCompletedata.ScreenName = data[j].ScreenName;
                            autoCompletedata.FormListType = "Form";
                            AutoCompleteList.push(autoCompletedata);

                            htm += '<td  id="' + listConfig[j].FieldName + '" style="width:' + listConfig[j].ColumnWidth + ';font-family: ' + listConfig[j].RFont + ';font-size:' + listConfig[j].RFontSize + ';color: ' + listConfig[j].RForeColor + ' ;background-color:' + listConfig[j].RBackColor + '; text-align:' + getAlignStyle(listConfig[j].Alignment) + ';' + fontWeight + '">';
                            htm += '<input type="text" id="' + listConfig[j].FieldName + '"  onclick="formReadonlyClicked(\'' + listConfig[j].FieldName + '\');" style="width:80%"  />';
                            htm += '<span href="#" style="width:20%;listConfig[j].oat:right;margin-top:5px;height:30px;"   onclick="formLookUpClicked(\'' + listConfig[j].FieldName + '\');GetLookUpData1(\'' + listConfig[j].FieldName + '\',\'' + listConfig[j].FieldName + '\',\'' + "" + '\');" class="input-group-addon"> <i class="fa fa-plus"></i>  </span>';
                            htm += '</td>';
                            break;
                        case "image":
                            if (listConfig[j].FieldName == "Delete") {
                                // htm += '<td  id="' + listConfig[j].FieldName + '" style="width:' + listConfig[j].ColumnWidth + ';font-family: ' + listConfig[j].RFont + ';font-size:' + listConfig[j].RFontSize + ';color: ' + listConfig[j].RForeColor + ' ;background-color:' + listConfig[j].RBackColor + '; text-align:' + getAlignStyle(listConfig[j].Alignment) + ';' + fontWeight + '">';
                                htm += '<td  id="' + listConfig[j].FieldName + '" style="width:' + listConfig[j].ColumnWidth + ';font-family: ' + listConfig[j].RFont + ';font-size:' + listConfig[j].RFontSize + ';color: ' + listConfig[j].RForeColor + ' ;background-color:""; text-align:' + getAlignStyle(listConfig[j].Alignment) + ';' + fontWeight + '">';
                                //htm += '<button  id="delete" onclick="DynamicRowItemRemove(this,\'' + listConfig[j].FieldName + '\',' + addCount + ',\'' + listConfig[j].FieldName + '\',\'' + fieldName + '\',' + addCount + ');"  class="btn"><i  onclick="DynamicRowItemRemove(this,\'' + listConfig[j].FieldName + '\',' + addCount + ',\'' + listConfig[j].FieldName + '\',\'' + fieldName + '\',' + addCount + ');"  class="fa fa-trash"></i></button>';
                                htm += '<button  id="delete" onclick="DynamicRowItemRemove(this,\'' + listConfig[j].FieldName + '\',\'' + ttbody + '\',' + addCount + ',\'' + listConfig[j].FieldName + '\',\'' + fieldName + '\',' + addCount + ');"  class="btn"><i    class="fa fa-trash"></i></button>';
                                htm += '</td>';
                            }
                            else if (listConfig[j].FieldName == "Print") {
                                // htm += '<td  id="' + listConfig[j].FieldName + '" style="width:' + listConfig[j].ColumnWidth + ';font-family: ' + listConfig[j].RFont + ';font-size:' + listConfig[j].RFontSize + ';color: ' + listConfig[j].RForeColor + ' ;background-color:' + listConfig[j].RBackColor + '; text-align:' + getAlignStyle(listConfig[j].Alignment) + ';' + fontWeight + '">';
                                htm += '<td  id="' + listConfig[j].FieldName + '" style="width:' + listConfig[j].ColumnWidth + ';font-family: ' + listConfig[j].RFont + ';font-size:' + listConfig[j].RFontSize + ';color: ' + listConfig[j].RForeColor + ' ;background-color:""; text-align:' + getAlignStyle(listConfig[j].Alignment) + ';' + fontWeight + '">';
                                //htm += '<button  id="delete" onclick="DynamicRowItemRemove(this,\'' + listConfig[j].FieldName + '\',' + addCount + ',\'' + listConfig[j].FieldName + '\',\'' + fieldName + '\',' + addCount + ');"  class="btn"><i  onclick="DynamicRowItemRemove(this,\'' + listConfig[j].FieldName + '\',' + addCount + ',\'' + listConfig[j].FieldName + '\',\'' + fieldName + '\',' + addCount + ');"  class="fa fa-trash"></i></button>';
                                htm += '<button  id="print" onclick="DynamicRowItemPrint(this,\'' + listConfig[j].FieldName + '\',' + addCount + ',\'' + listConfig[j].FieldName + '\',\'' + fieldName + '\',' + addCount + ');"  class="btn"><i    class="fa fa-print"></i></button>';
                                htm += '</td>';
                            }
                            else if (listConfig[j].DataMember == "Swap") {
                                var isEdit = String(localStorage.getItem('isEdit'));
                                if (isEdit == 'yes') {
                                    swap_ttbody = "ListBodyDivId_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName;
                                    htm += '<td  id="' + listConfig[j].DataMember + '" style="width:' + listConfig[j].ColumnWidth + ';font-family: ' + listConfig[j].RFont + ';font-size:' + listConfig[j].RFontSize + ';color: ' + listConfig[j].RForeColor + ' ;background-color:""; text-align:' + getAlignStyle(listConfig[j].Alignment) + ';' + fontWeight + '">';
                                    htm += '<input style="display:none" type="button" ></>';
                                    //htm += '<input type="button" value="↑↑" onclick="swapRow("up",' + addCount + ')" />';
                                    //htm += '<input type="button" value="↓↓" onclick="swapRow("down",' + addCount + ')" />';
                                    htm += '<button style="z-index: 99;" id="swapup" onclick="swapRow("up",' + addCount + ');"   class="btn"><i     class="fa fa-arrow-circle-up"></i></button>';
                                    htm += '<button style="z-index: 99;" id="swapdown" onclick="swapRow("down",' + addCount + ');"   class="btn"><i     class="fa fa-arrow-circle-down"></i></button>';
                                    //htm += '<button style="z-index: 99;" id="swapdown" onclick="swap(this,\'down\',' + addCount + ',\'' + ttbody + '\');"   class="btn"><i     class="fa fa-arrow-circle-down"></i></button>';
                                    //htm += '<button style="z-index: 99;" id="print" onclick="DynamicRowItemRemove(this,\'' + listConfig[j].DataMember + '\',' + addCount + ',\'' + listConfig[j].DataMember + '\',\'' + fieldName + '\',' + addCount + ',\'' + ttbody + '\',\'' + tfoot + '\');"  class="btn"><i     class="fa fa-print"></i></button>';
                                    htm += '</td>';
                                }

                            }
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
            if (DropDownIdList.length > 0) {
                GetDropDownListValue(CurrentScreen_TabScreen_Name, "List");
                DropDownIdList = [];
            }

        }
    }
}

function populateDropDownList(data, id, i, sName) {
    // dynamicFieldName = "Item";

    var select = $('#ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName + ' tr').find("select");

    if (sName != CurrentScreen_TabScreen_Name && currentScreenName == "ItemPromotionForm")
        select = $('#ListBodyDivId_' + sName + '_' + dynamicFieldName + ' tr').find("select");


    if (select[i] != undefined && id == select[i].id) {
        var valueText = '';
        valueText += '<option selected="selected" disabled="true">--Select--</option>';
        $.each(data, function (j, data) {
            valueText += "<option value=" + data.Code + ">" + data.Text + "</option>";
        });

        var tblbody = document.getElementById("ListBodyDivId_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName);
        // tblbody.rows[(addCount)].cells.namedItem(id).childNodes['0'].innerHTML = valueText;
        tblbody.rows[(dynamicRowindex)].cells.namedItem(id).childNodes['0'].innerHTML = valueText;
        tblbody.rows[(dynamicRowindex)].cells.namedItem(id).childNodes['0'].selectedIndex = "-1";
        // document.getElementById(id).selectedIndex = "-1";

    }
}



var dbColumnName = '';
function dynamicTableclickfunction(fieldName) {
    dynamicFieldName = fieldName;
    $("#table_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName + " >tbody > tr > td").click(function (event) {
        // $("#table_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName + " >tbody > tr").click(function (event) {
        if (CurrentScreen_TabScreen_Name == "CustomerRoutingForm" || CurrentScreen_TabScreen_Name == "ImportConfigForm") {
            if (CurrentScreen_TabScreen_Name == "ImportConfigForm") {
                var tableElements = document.getElementById("ListBodyDivId_ImportConfigForm_List1");
                for (var j = 0; j < tableElements.childElementCount; j++) {
                    var tableCells = tableElements.childNodes[j]
                    tableCells.bgColor = "transparent";
                }
            }

            $("#table_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName + " tr").removeClass('highlighted');
            // $(this).addClass('highlighted')
            $(this).closest('tr').addClass('highlighted');

            dbColumnName = $(this).closest('tr')[0].childNodes['0'].innerText;
        }
        event.stopImmediatePropagation();
        _this = this;
        tableTotalRowCount = $('#table_' + CurrentScreen_TabScreen_Name + '_' + fieldName + ' >tbody >tr').length
        var tr = $(this).closest("tr");
        currentRowClickCount = tr.index();
console.log('formlistconfig.js,2780,index-' +  currentRowClickCount);

    });

}

var dynamicList = [];
var dynamicFieldName = '';
var dynamicTableId = '';
var isdynamic = false;
var dynamicRowindex = 0;
var tableTotalRowCount = 0;
var _this = "";
function dynamicTabledblclickfunction(fieldName) {
    dynamicFieldName = fieldName;
    //$('#table_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName + ' >tbody > tr').dblclick(function (event) {
    // $("#table_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName + " >tbody > tr > td").click(function (event) {
    $("#table_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName + " >tbody > tr > td").dblclick(function (event) {
        event.stopImmediatePropagation();

        //$("#table_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName + " tr").removeClass('highlighted');
        ////$("#table_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName + " tr").addClass('highlighted');
        //$(this).addClass('highlighted')
        _this = this;

        if (TempLookUpMultiSelected.length > 0) {
            for (var y = 0; y < TempLookUpMultiSelected.length; y++) {
                LookUpMultiSelected = jQuery.grep(LookUpMultiSelected, function (value) { return value[id] != TempLookUpMultiSelected[y][id]; });
            }
            TempLookUpMultiSelected = [];
        }

        var tablwe = $(this).closest("#table_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName + " >tbody > tr > td");
        var trowCount = $('#table_' + CurrentScreen_TabScreen_Name + '_' + fieldName + ' >tbody >tr').length;
        tableTotalRowCount = trowCount;
        var tr = $(this).closest("tr");
        dynamicRowindex = tr.index() + 1;
        currentRowClickCount = dynamicRowindex - 1;

console.log('formlistconfig.js,2819,index-' +  currentRowClickCount);

        ///
        var lastRowDataString = document.getElementById("table_" + CurrentScreen_TabScreen_Name + "_" + fieldName).rows[(dynamicRowindex)].innerHTML;
        var lastRowData = lastRowDataString.split('</td>')
        value = getTableRowTDvalue(lastRowData[0]);

        ////

        var isClickEvent = false;
        if (CurrentScreen_TabScreen_Name == "InventoryForm")
            isClickEvent = false;
        else if (CurrentScreen_TabScreen_Name == "InventoryAdjustmentForm") {
            if ($(this).index() == 3)
                isClickEvent = true;
        }
        else if (CurrentScreen_TabScreen_Name == "VanStockRequestForm") {
            isClickEvent = false;
        }
        else {
            if ($(this).index() == 1)
                isClickEvent = true;
        }
        var column_num = parseInt($(this).index()) + 1;
        // if ($(this).index() < 1 && trowCount == (dynamicRowindex) && value == "") {
        // if ($(this).index() < 1) {
        if (isClickEvent == true || isDynamicRowItemRemove == true) {
            //if (isClickEvent == true) {
            dynamicTableId = 'table_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName;

            //  var popUpListId = event.currentTarget.childNodes[0].id
            var popUpListId = event.currentTarget.id
            dynamicList = [];

            var obj = {};
            var objList = [];
            for (var j = 1; j <= trowCount; j++) {
                //for (var j = trowCount; j <= trowCount; j++) {
                var currentRowClickedCnt = $(this).index() + 1;//or -- //$('#table_' + fieldName + ' >tbody >tr').index()+1;
                //command for sales order
                if (currentRowClickedCnt != j) {
                    objList = [];
                    var lastRowDataString = document.getElementById("table_" + CurrentScreen_TabScreen_Name + "_" + fieldName).rows[j].innerHTML;
                    var lastRowData = lastRowDataString.split('</td>')
                    for (var i = 0; i < (lastRowData.length - 1); i++) {
                        obj = {};
                        id = getTableRowTDid(lastRowData[i]);
                        value = getTableRowTDvalue(lastRowData[i]);
                        var tdType = getTableRowTDType(lastRowData[i])

                        ////
                        //tdType = tblbody.rows[i] == undefined ? "" : getTableRowTDType(tblbody.rows[i].cells.namedItem(id).innerHTML);
                        //if (tdType == "text" || tdType == "select") {
                        //    value = tblbody.rows[ctr].cells.namedItem(id).childNodes['0'].value;
                        //}
                        //else if (tdType == "button")
                        //    value = '';
                        //else {
                        //    value = tblbody.rows[i].cells.namedItem(id).innerText == "" ? "" : tblbody.rows[i].cells.namedItem(id).innerHTML;
                        //}
                        ///

                        obj["FieldName"] = id;
                        obj[id] = value;
                        objList.push(obj);
                    }
                    if (objList.length > 0)
                        dynamicList.push(objList);
                }
            }


            ////
            obj = {};
            var lastRowobjListDataString = document.getElementById("table_" + CurrentScreen_TabScreen_Name + "_" + fieldName).rows[(currentRowClickCount + 1)].innerHTML;
            var rowData = document.getElementById("table_" + CurrentScreen_TabScreen_Name + "_" + fieldName).rows[(currentRowClickCount + 1)];
            var lastRowData = lastRowDataString.split('</td>')
            for (var i = 0; i < (lastRowData.length - 1); i++) {
                id = getTableRowTDid(lastRowData[i]);
                var type = getTableRowFullTDType(lastRowData[i]);
                if (type == "text") {
                    value = rowData.cells[id].childNodes['0'].value;
                }
                else if (type == "select") {
                    value = rowData.cells[id].childNodes['0'].firstChild == null ? '' : rowData.cells[id].childNodes['0'].firstChild.innerText;
                    //value = rowData.cells[id].childNodes['0'].value;
                }
                else
                    value = rowData.cells[id].childNodes.length == 0 ? "" : rowData.cells[id].childNodes['0'].data == undefined ? "" : rowData.cells[id].childNodes['0'].data;
                obj[id] = value;
            }

            SetFormView();
            obj["UserNo"] = tempUserNo;
            obj.FieldName = FieldName;
            FormView[FieldName] = obj;

            // Params.FormView = FormView;

            ///////////

            // }

            if (isDynamicRowItemRemove == true) {
                var _obj = {};
                _obj.fieldName = 'TempDeleteBtn';
                PerformAction('listTextFieldLostFocus', _obj);
                isDynamicRowItemRemove = false;
            }
            if (isClickEvent == true) {
                DropDownIdList = [];
                isdynamic = true;
                formLookUpClicked("", fieldName + "_" + popUpListId, 0, '');
            }
        }
    });
}

function AssignListData(sActionEvent, listView, dynamicFieldNam) {
    dynamicFieldName = dynamicFieldName == undefined ? dynamicFieldNam : dynamicFieldName;
    var scrName = TabScreenName == '' ? currentScreenName : currentScreenName + "_" + TabScreenName;
    var sScreenName = scrName + "_FORM_LOOKUP_" + _lookUpFieldId;
    var qry = getString['QueryConfig_' + sScreenName + '']
    qry += ' ' + getString['QueryConfig_' + sScreenName + '_GroupText'];
    qry += ' ' + getString['QueryConfig_' + sScreenName + '_OrderText'];
    qry = formatQueryString(qry, sScreenName);//ScreenView
    execute(qry);
    returnData = executeStringQry;
    executeStringQry = executeStringQry.replace('[', '').replace(']', '');
    formData = $.parseJSON(executeStringQry);

    var dynamicValusDuplication = false;
    if (formData != null) {
        dynamicValusDuplication = false;
        $.each(formData, function (key, value) {
            var keyId = key.replace("ListView.", '');
            for (var j = 0; j < dynamicList.length; j++) {
                var fieldName = dynamicList[j][0].FieldName;
                var fieldvalue = dynamicList[j][0][fieldName];

                if (keyId == fieldName && value == fieldvalue) {
                    dynamicValusDuplication = true;
                }
            }
            if (dynamicValusDuplication == true) {
                //showAlertMessage()
                $('<div></div>').appendTo('body')
                    .html('<div><h6>' + "This row already exists!" + '?</h6></div>').dialog({
                        modal: true, title: "Duplicated", zIndex: 10000, autoOpen: true,
                        width: 'auto', resizable: false,
                        buttons: { "Close": function () { $(this).dialog("close"); } },
                    });
                return false;
            }
            else if (dynamicValusDuplication == false) {
                var tblbody = document.getElementById("ListBodyDivId_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName);
                if (currentScreenName == "ItemPromotionForm" || currentScreenName == "InvoicePromotionForm") {
                    var dynamicFieldName1 = "Item";
                    tblbody = document.getElementById("ListBodyDivId_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName1);
                }

                //  var tblbody = document.getElementById("ListBodyDivId_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName);
                var tdType = getTableRowTDType(tblbody.rows[(dynamicRowindex - 1)].cells.namedItem(key.replace("ListView.", '')).innerHTML);

                if (tdType == "text") {
                    tblbody.rows[(dynamicRowindex - 1)].cells.namedItem(key.replace("ListView.", '')).childNodes['0'].value = value == null ? "" : value;
                    // tblbody.rows[(dynamicRowindex - 1)].cells.namedItem(key.replace("ListView.", '')).value = value == null ? "" : value;
                }
                else if (tdType == "select") {
                    tblbody.rows[(dynamicRowindex - 1)].cells.namedItem(key.replace("ListView.", '')).childNodes['0'].value = value;
                    //tblbody.rows[(dynamicRowindex - 1)].cells.namedItem(key.replace("ListView.", '')).value = value == null ? "" : value;
                }
                else
                    tblbody.rows[(dynamicRowindex - 1)].cells.namedItem(key.replace("ListView.", '')).innerHTML = value;

            }
        });


        //
        if (currentScreenName == "InventoryAdjustmentForm") {
            //InventoryAdjustmentListBadStockChangeEvent();
            sScreenName = "InventoryAdjustmentForm_FORM_LOOKUP_Item_InvQty";
            //  var type=    document.getElementById("ListBodyDivId_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName).rows[(dynamicRowindex - 1)].cells.AdjustmentType.children.AdjustmentType.value;
            var type = document.getElementById("ListBodyDivId_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName).rows[(dynamicRowindex - 1)].cells.AdjustmentType.firstChild.value;
            if ($('#DocType').val() == "BadStock" && type == "+veAdjustment") {
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
                if (tblbody.rows[(dynamicRowindex - 1)].cells.namedItem('Inventory').childNodes['0'].value == undefined)
                    tblbody.rows[(dynamicRowindex - 1)].cells.namedItem('Inventory').childNodes['0'].innerText = formData['ListView.Inventory'];
                else
                    tblbody.rows[(dynamicRowindex - 1)].cells.namedItem('Inventory').childNodes['0'].value = formData['ListView.Inventory'];
            }
            else {
                if (tblbody.rows[(dynamicRowindex - 1)].cells.namedItem('Inventory').childNodes['0'].value == undefined)
                    tblbody.rows[(dynamicRowindex - 1)].cells.namedItem('Inventory').childNodes['0'].innerText = 0;
                else
                    tblbody.rows[(dynamicRowindex - 1)].cells.namedItem('Inventory').childNodes['0'].value = 0;
            }
        }
        //

    }

    isListLookUpClicked = false;
    $('#popupdialog').dialog("close");

    ////this line addded for Inventory Adjustment 
    //FieldName = Params.FormView.FieldName;
    //FormView = Params.FormView;
    ////

    //  var tblbody = document.getElementById("ListBodyDivId_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName);


    if (dynamicValusDuplication == false) { ///temp table data store
        var obj = {};
        var rowDataString = "";

        //if (currentScreenName == "ItemPromotionForm" || currentScreenName == "InvoicePromotionForm") {
        //    var dynamicFieldName1 = "Item";
        //    rowDataString = document.getElementById("table_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName1).rows[dynamicRowindex].innerHTML;
        //}
        //else
        //    rowDataString = document.getElementById("table_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName).rows[dynamicRowindex].innerHTML;

        if (currentScreenName == "ItemPromotionForm" || currentScreenName == "InvoicePromotionForm")
            var dynamicFieldName = "Item";

        rowDataString = document.getElementById("table_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName).rows[dynamicRowindex].innerHTML;


        //var rowDataString = document.getElementById("table_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName).rows[dynamicRowindex].innerHTML;
        var rowData = rowDataString.split('</td>')
        istextValueAssigned = false;
        isselectValueAssigned = false;
        for (var i = 0; i < (rowData.length - 1); i++) {
            id = getTableRowTDid(rowData[i]);
            type = getTableRowFullTDType(rowData[i]);


            if (type.toLowerCase() == "text" || type == "select") {
                obj[id] = $('#ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName + ' tr')[currentRowClickCount].cells[id].childNodes['0'].value;
            }
            //  if (type.toLowerCase() == "text" && istextValueAssigned == false) { //this line command for sales order
            if (type.toLowerCase() == "checkbox" && istextValueAssigned == false) {
                var textbox = $('#ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName + ' tr').find("input");
                var dividedCount = textbox.length / (currentRowClickCount + 1);
                var minusCount = textbox.length - dividedCount;
                for (var y = minusCount; y < textbox.length; y++) {
                    id = textbox[y].id.split('_')[0];
                    if (textbox[y].type == 'checkbox') {
                        obj[id] = textbox[y].checked;
                    }
                    else {
                        //  obj[id] = textbox[y].value;
                    }
                }
                istextValueAssigned = true
            }
            //else if (type == "select" && isselectValueAssigned == false) { //this else if logic command for sales order
            //    var select = $('#ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName + ' tr').find("select");
            //    // var dividedCount = select.length / dynamicRowindex;
            //    // var dividedCount = select.length / (addCount + 1);
            //    var dividedCount = select.length / dynamicRowindex;
            //    var initCount = dynamicRowindex * dividedCount;
            //    var lengthCount = initCount + dividedCount;
            //    //for (var y = initCount; y < lengthCount; y++) {
            //    var dividedCount = select.length / (currentRowClickCount + 1);
            //    var minusCount = select.length - dividedCount;
            //    for (var y = minusCount; y < select.length; y++) {
            //        var fieldId = select[y].id.split('_')[0];
            //        obj[fieldId] = select[y].value;
            //    }
            //    isselectValueAssigned = true;
            //}
            else if (type.toLowerCase() == "") {
                var innerText = $('#ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName + ' tr')[currentRowClickCount].cells[id].innerText;
                obj[id] = innerText == "" ? "0" : $('#ListBodyDivId_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName + ' tr')[currentRowClickCount].cells[id].innerHTML;
            }

        }
        //  if (currentScreenName == "CustomerRoutingForm") {
        obj.LineNo = addCount + 1;
        // }

        //for (var i = 0; i < (rowData.length - 1) ; i++) {
        //    id = getTableRowTDid(rowData[i]);

        //    value = getTableRowTDvalue(rowData[i]);
        //    obj[id] = value;
        //}
        obj.FieldName = FieldName;
        FormView.FieldName = FieldName;
        obj["UserNo"] = tempUserNo;
        FormView[FieldName] = obj;

        var _obj = {};
        if (currentScreenName == "ItemPromotionForm" || currentScreenName == "InvoicePromotionForm")
            _obj.fieldName = "Item";
        else
            _obj.fieldName = FieldName.split('_')[0];
        //  PerformAction('listTextFieldLostFocus', _obj);
        PerformAction('listLookUpFieldFocus', _obj);
    }

    //this line addded for Inventory Adjustment 
    FieldName = Params.FormView.FieldName;
    //FormView = Params.FormView;
    //Params.FormView = '';
    //


    // FieldName = Params.FormView.FieldName;
    //AddDynamicList(CurrentScreen_TabScreen_Name, "ListBodyDivId_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldNam, dynamicFieldNam);

}




function addDynamicitem(scrName, ttbody) {
    addCount++;
    var htm = '';

    htm += '<tr  class="tablecell" id="trRow_' + addCount + '" onclick="EmptyRowClickFunction(\'' + scrName + '\',\'' + ttbody + '\',\'' + addCount + '\',this)">';

    //htm += '<td style="width:35px;background-color: #ffffff">';
    //if (addCount == 0)
    //    htm += '';
    //else
    //    htm += '<button  id="delete" onclick="RemoveItem(' + addCount + ');" class="btn"><i class="fa fa-close"></i></button>';
    //htm += '</td>';

    for (var j = 0; j < _objArray.arrList.length; j++) {
        if (FLIsHiddenList[j] != 1 && _objArray.arrList[j].ColumnWidth != "0px" && (isBtnFormPopUpTable == false)) {
            //if (FLIsHiddenList[j] != 1 && _objArray.arrList[j].ColumnWidth != "0px" && (isBtnFormPopUpTable == false || _objArray.arrList[j].FieldName.replace("\t", "").toLowerCase() != 'action')) {
            var colName = _objArray.arrList[j].FieldName.replace("\t", "");
            var fieldControl = _objArray.arrList[j].FieldControl.replace("\t", "");
            var fontWeight = getFontStyle(_objArray.arrList[j].RFontStyle);
            fontWeight = fontWeight.replace("_", "-");
            fontWeight = fontWeight.replace("normal", ":normal");
            fontWeight = fontWeight.replace("bold", ":bold");
            switch (fieldControl.toLowerCase()) {
                case "textbox":
                    htm += '<td  style="width:' + _objArray.arrList[j].ColumnWidth + ';font-family: ' + _objArray.arrList[j].RFont + ';font-size:' + _objArray.arrList[j].RFontSize + ';color: ' + _objArray.arrList[j].RForeColor + ' ;background-color:' + _objArray.arrList[j].RBackColor + '; text-align:' + getAlignStyle(_objArray.arrList[j].RBackColor) + ';' + fontWeight + '">';
                    htm += '<input type="text" id="' + _objArray.arrList[j].FieldName + '_' + addCount + '" onclick="formTextFieldFocus(\'' + _objArray.arrList[j].FieldName + '\');"onblur="formTextFieldLostFocus(\'' + _objArray.arrList[j].FieldName + '\');"onkeyup="formTextFieldChange(\'' + _objArray.arrList[j].FieldName + '\');"onchange="formTextFieldFocus(\'' + _objArray.arrList[j].FieldName + '\');" />';
                    htm += '</td>';
                    break;
                case "label":
                    htm += '<td  style="width:' + _objArray.arrList[j].ColumnWidth + ';font-family: ' + _objArray.arrList[j].RFont + ';font-size:' + _objArray.arrList[j].RFontSize + ';color: ' + _objArray.arrList[j].RForeColor + ' ;background-color:' + _objArray.arrList[j].RBackColor + '; text-align:' + getAlignStyle(_objArray.arrList[j].RBackColor) + ';' + fontWeight + '">';
                    //htm += '<input type="text" id="' + _objArray.arrList[j].FieldName + '_' + addCount + '" onclick="formTextFieldFocus(\'' + _objArray.arrList[j].FieldName + '\');"onblur="formTextFieldLostFocus(\'' + _objArray.arrList[j].FieldName + '\');"onkeyup="formTextFieldChange(\'' + _objArray.arrList[j].FieldName + '\');" />';
                    htm += '</td>';
                    break;
                case "lookup":
                    htm += '<td  style="width:' + _objArray.arrList[j].ColumnWidth + ';font-family: ' + _objArray.arrList[j].RFont + ';font-size:' + _objArray.arrList[j].RFontSize + ';color: ' + _objArray.arrList[j].RForeColor + ' ;background-color:' + _objArray.arrList[j].RBackColor + '; text-align:' + getAlignStyle(_objArray.arrList[j].RBackColor) + ';' + fontWeight + '">';
                    htm += '<input type="text" id="' + _objArray.arrList[j].FieldName + '_' + addCount + '"  onclick="formReadonlyClicked(\'' + _objArray.arrList[j].FieldName + '\');" style="width:80%"  />';
                    htm += '<span href="#" style="width:20%;float:right;margin-top:5px;height:30px;"   onclick="formLookUpClicked(\'' + _objArray.arrList[j].FieldName + '\');GetLookUpData1(\'' + _objArray.arrList[j].FieldName + '\',\'' + _objArray.arrList[j].FieldName + '\',\'' + "" + '\');" class="input-group-addon"> <i class="fa fa-plus"></i>  </span>';
                    htm += '</td>';
                    break;
            }
        }
    }
    htm += '</tr>';

    $("#" + ttbody).append(htm);
}


var formListLookUp = false;
function GetLookUpData1(lookUpId, id1, id2) {
    formListLookUp = true;
    var scrName = screenName + "_LIST_LOOKUP_" + lookUpId;
    _lookUpId = id1;
    buttonTextId = id1;
    lookUpTextId2 = id2;

    GetGridHeaderDetails(url_GetListConfig, url_GetListValue, "ListPopUpHeadDivId", "ListPopUpBodyDivId", "ListPopUpfootDivId", scrName);

    GetSearchConfig(scrName);
    $('#dialog').dialog({ title: "" + lookUpId + " Details" }).dialog('open');
    $('#dialogHiddenId').css("display", "none");

}

function RemoveItem(cnt) {
    $('#trRow_' + cnt).remove();
}

function PaginationLogString(errorStr) {
    errorStr = errorStr;
    try {
        $.ajax({
            type: 'POST',
            url: url_WritePaginationLog,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ 'msg': errorStr }), // { msg: errorStr },
            async: false,
            success: function (data) {
                //alert(data);
            },
            //error: function (type) { alert("ERROR!!" + type.responseText); }
        });

    }
    catch (err) {
        //alert(JSON.stringify(err));
    }
}


function handleChange(event) {
  
}

function gfg(ttbody, dataMember,m, n) {
    stars =
        document.getElementsByClassName("star" + m);
    let output =
        document.getElementById("output" + m);
   
    if ((n==1) && (stars[0].className == "star" + m + " one")) {
        remove(m);
        n = 0;
    }
    else {
        remove(m);
        for (let i = 0; i < n; i++) {
            try {
                if (n == 1) cls = "one";
                else  cls = "five";

               // if (i == (n - 1))
                stars[i].className = "star" + m + " " + cls;
  
            } catch (e) {

            }

        }
    }
    try {
        if (n == undefined)
            output.innerText = "Rating is: 0/5";
        else
            output.innerText = "Rating is: " + n + "/5";
    } catch (e) {

    }
    try {
        var tblbody = document.getElementById(ttbody);
        //if (n == undefined)
        //    tblbody.rows[m].cells.namedItem("Rating").innerHTML = "0";
        //else
            tblbody.rows[m].cells.namedItem("Rating").innerHTML = n;
    } catch (e) {

    }

    var _obj = {};
    _obj.fieldName = dataMember;
    _obj.rowIndex = m;
    _obj.value = n;
    PerformAction('listRatingClick', _obj);

   // alert(n);
}

// To remove the pre-applied styling
function remove(m) {
    try {
        let i = 0;
        while (i < 100) {
            stars[i].className = "star" + m;
            i++;
        }
    } catch (e) {

    }
}