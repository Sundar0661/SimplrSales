var encryptkey = CryptoJS.enc.Utf8.parse('simplr8080808080');
var encryptiv = CryptoJS.enc.Utf8.parse('simplr8080808080');
var exportHdr = {};
var listQry = {};
var exportTableName = "";
var searchOptionArray = [];
var sortOptionArray = [];

function ExportDataFormList() {
    executeReader1();
}

function executeReader1() {
    searchOptionArray = [];
    sortOptionArray = [];

    listQry = FormView.LstExportData.QueryText;
    listQry = formatQueryString(listQry, "");
    qry = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(listQry), encryptkey, { keySize: 128 / 8, iv: encryptiv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    var params = "{'query':'" + qry + "'}";

    //listQry = FormView.LstExportData.QueryText;
    $.ajax({
        type: "POST",
        url: url_GetExecuteReader,
        data: params,
        //data: { query: listQry },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (results) {
            loadhdr(results, listQry);
        },
        error: function (results, q, a) {
            alert(results);
        }
    });

}

function executeReader(tableName) {
    exportTableName = tableName;
    searchOptionArray = [];
    sortOptionArray = [];

    // listQry = FormView.LstExportData.QueryText;
    var query = "select Query from ExportQueryConfigcr  where Tablename ='" + tableName + "'";
    getExecute(query);
    listQry = executeQry;
    listQry = formatQueryString(listQry, "");
    qry = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(listQry), encryptkey, { keySize: 128 / 8, iv: encryptiv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    var params = "{'query':'" + qry + "'}";

    //listQry = FormView.LstExportData.QueryText;
    $.ajax({
        type: "POST",
        url: url_GetExecuteReader,
        data: params,
        //data: { query: listQry },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (results) {
            loadhdr(results, listQry, tableName);
        },
        error: function (results, q, a) {
            alert(results);
        }
    });

}


function loadhdr(dataHdr, listQry) {
    $("#FormListDivId").hide();
    $("#ExportListDivId").show();
    $("#ExportListDivId").empty();
    $("#ExportListHeadDivId").empty();
    $("#ExportListBodyDivId").empty();
    $("#ExportListfootDivId").empty();
    var fieldControl = '';
    if (dataHdr.length == 1 && dataHdr[0].optional == "no data available") {
        NoDataAvailable();
    }
    else {
        CreateExportList();
        exportHdr = dataHdr;
        _searchControl = {};
        var searchobj = {};
        var valueText = '';
        var valueTextSoryOrder = '';
        valueText += "<option value=" + 0 + ">Select</option>";
        headerCount = dataHdr.length;
        var htm = '';
        htm = '<tr  class="tablehead">';
        for (var i = 0; i < dataHdr.length; i++) {
            htm += '<td style="width: 15%; ">';
            htm += dataHdr[i].Name;
            htm += '</td>';
            searchobj = {};
            searchobj.FieldControl = dataHdr[i].Name;
            searchobj.SearchControl = dataHdr[i].Type;
            //fieldControl = dataHdr[i].Name.replace(/ /g, "").replace('*', '');
            fieldControl = dataHdr[i].Name.replace(/ /g, "").replace('*', '');
            // fieldControl = dataHdr[i].Name;

            _searchControl[fieldControl] = searchobj;
            valueText += "<option value='" + fieldControl + "'>" + dataHdr[i].Name + "</option>";
            // valueTextSoryOrder += "<option value='" + fieldControl + "'>" + dataHdr[i].Name + "</option>";
        }
        htm += '</tr>';
        $("#ExportListHeadDivId").append(htm);
        // $(valueTextSoryOrder).appendTo('#ExportSortFieldId');
        $(valueText).appendTo('#ExportSortFieldId');
        $(valueText).appendTo('#ExportSearchFieldId');

        //execute(qry);
        //AssignExportListData(executeQry, 1);;
        // ExportSortControl();


        objSort = {};
        if (FormView.LstExportData == undefined || FormView.LstExportData == "") {
            var query = "select OrderByText from ExportQueryConfigcr  where Tablename ='" + exportTableName + "'";
            getExecute(query);
            objSort.OrderByQuery = executeQry;
        }
        else
            objSort.OrderByQuery = FormView.LstExportData.OrderByText;

        // objSort.OrderByQuery = (FormView.LstExportData.OrderByText.indexOf("ASC") == -1 && FormView.LstExportData.OrderByText.indexOf("DESC") - 1) ? FormView.LstExportData.OrderByText + " ASC" : FormView.LstExportData.OrderByText;
        sortOptionArray.push(objSort);

        ExportFormListConfigRow(1);
    }
}

function ExportFormListConfigRow(pageNumber, SearchId) {
    searchOption = "";
    TiAPIinfo('searchOptionArray.length ---> ' + searchOptionArray.length);
    for (var i = 0; i < searchOptionArray.length; i++) {
        //  searchOption = searchOption + searchOptionArray[i].SearchQuery;
        if (searchOptionArray[i].IsMultiple == false) {
            searchOption = searchOption + searchOptionArray[i].SearchQuery;
        }
    }
    sortOption = " ";
    TiAPIinfo('searchOptionArray.length ---> ' + sortOptionArray.length);
    var defaultSortOption = '';
    var defaultSortOption1 = '';
    if (FormView.LstExportData == undefined || FormView.LstExportData == "") {
        var query = "select OrderByText from ExportQueryConfigcr  where Tablename ='" + exportTableName + "'";
        getExecute(query);
        defaultSortOption = executeQry;
        defaultSortOption1 = executeQry;
    }
    else {
        defaultSortOption = FormView.LstExportData.OrderByText;
        defaultSortOption1 = FormView.LstExportData.OrderByText;
    }

    for (var i = 0; i < sortOptionArray.length; i++) {
        if (sortOptionArray[i].OrderByQuery != defaultSortOption || sortOptionArray.length == 1) {
            if (sortOption != " ")
                sortOption = sortOption + " , ";
            sortOption = sortOption + sortOptionArray[i].OrderByQuery
        }
    }
    if (sortOptionArray.length == 0) {
        sortOption = defaultSortOption1;
        //sortOption = FormView.LstExportData.OrderByText;
    }
    // sortOption = "";  
    TiAPIinfo('searchOption  ---> ' + searchOption);
    TiAPIinfo('FormView Data --> ' + JSON.stringify(dataFieldIdList));

    PageLoadinginfo("ListConfig listvalue query start: ");
    qry = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(listQry), encryptkey, { keySize: 128 / 8, iv: encryptiv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    var params = "" + qry + "";

    $.ajax({
        type: 'POST',
        url: url_ExportGetListValue,
        // data: { qry: listQry, pageNumber: pageNumber, searchOption: searchOption, SortOption: sortOption },
        data: { qry: params, pageNumber: pageNumber, searchOption: searchOption, SortOption: sortOption },
        async: false,
        success: function (result) {

            data = result.List;
            countRows = result.countRows == "" ? 0 : $.parseJSON(result.countRows)[0].cnt;
            data = $.parseJSON(data);
            //countRows = data == null ? 0 : result.countRows == "" ? 0 : $.parseJSON(result.countRows)[0].cnt;
            PageLoadinginfo("ListConfig listvalue execute query ");
            TiAPIinfo('GetListValue  ---> ' + result);
            paginationCount = 0;
            AssignExportListData(data, pageNumber, SearchId, countRows);
        },
        error: function (xhr) {
            alert("Error occurred while loading the image. "
                + xhr.responseText);

        }

    });
}


var paginationCount = 0;
function AssignExportListData(data, pageNumber, SearchId, countRows) {
    $("#ExportListBodyDivId").empty();
    $("#ExportListfootDivId").empty();
    if (data == null)
        return;

    var htm = '';
    for (var i = 0; i < data.length; i++) {
        htm += '<tr >';
        for (var j = 0; j < exportHdr.length; j++) {

            // htm += '<td  >';
            htm += '<td>';
            htm += data[i][exportHdr[j].Name] == null ? "" : data[i][exportHdr[j].Name];
            htm += '</td>';
        }
        htm += '</tr>';
    }
    $("#ExportListBodyDivId").append(htm);

    $('#ExportListfootDivId').empty();
    // countRows = data.length;
    pageNumber = pageNumber == undefined ? 1 : pageNumber;
    if (countRows > 1) {
        var html = '';
        html += '<tr>';
        html += '<td height="50" colspan="' + headerCount + '">';
        html += '<ul class="pagination pull-center" style="margin: 0px 0;">';

        if (pageNumber > 1) {
            //ExportFormListConfigRow(ttbody, tfoot, scrName, pageNumber, SearchId, fieldName)
            html += '<li style="background-color: #cccccc;" class="paginate_button"><a style="background-color:#cccccc;" href="#" onclick="ExportFormListConfigRow(' + 1 + ',\'' + SearchId + '\')" aria-controls="example" data-dt-idx="2" tabindex="0"><<</a></li>';
            html += '<li style="background-color: #cccccc;" class="paginate_button"><a style="background-color:#cccccc;" href="#" onclick="ExportFormListConfigRow(' + (pageNumber - 1) + ',\'' + SearchId + '\')" aria-controls="example" data-dt-idx="2" tabindex="0"> Previous</a></li>';
        }
        var dotCount = 0;
        var pageNumberCount = (pageNumber >= (countRows - 5) ? (countRows - 5) - 1 : pageNumber == 1 ? pageNumber : pageNumber - 1);
        pageNumberCount = pageNumber >= (countRows - 4) ? (countRows - 5) : pageNumberCount;
        var isDotShow = pageNumber >= (countRows - 4) ? false : true;
        pageNumberCount = pageNumberCount <= 0 ? pageNumber : pageNumberCount;
        for (var pagenum = pageNumberCount ; pagenum <= countRows; pagenum++) {
            dotCount++;
            html += '<li style="background-color: #cccccc;" class="paginate_button"><a id="pagination_' + pagenum + '" style="background-color:#cccccc;" href="#" onclick="ExportFormListConfigRow(' + pagenum + ',\'' + SearchId + '\')" aria-controls="example" data-dt-idx="2" tabindex="0"> ' + pagenum + '</a></li>';
            if (dotCount == 3 & isDotShow) {
                html += '<li style="background-color: #cccccc;" class="paginate_button"><a style="background-color:#cccccc;" href="#"  aria-controls="example" data-dt-idx="2" tabindex="0"> ...</a></li>';
                pagenum = countRows - dotCount;
            }
        }
        if (countRows > pageNumber) {
            ttbody1 = '';
            html += '<li style="background-color: #cccccc;" class="paginate_button"><a style="background-color:#cccccc;" href="#" onclick="ExportFormListConfigRow(' + (pageNumber + 1) + ',\'' + SearchId + '\')" aria-controls="example" data-dt-idx="2" tabindex="0"> Next</a></li>';
            html += '<li style="background-color: #cccccc;" class="paginate_button"><a style="background-color:#cccccc;" href="#" onclick="ExportFormListConfigRow(' + countRows + ',\'' + SearchId + '\')" aria-controls="example" data-dt-idx="2" tabindex="0">>></a></li>';
        }


        html += '</ul>';
        html += '</td>';
        html += '</tr>';

        $('#ExportListfootDivId').append(html);

        $('#pagination_' + pageNumber).css("background-color", "#041d67");
        $('#pagination_' + pageNumber).css("color", "white");

    }
}

function CreateExportList() {

    var htm = '';

    htm += '<div style="width: 98%;margin-left:15px">';
    htm += '<div class="row">';
    htm += '<div  class="labeltext" >';
    if (FormView.LstExportData == undefined || FormView.LstExportData == "")
        htm += "Export : " + exportTableName;
    else
        htm += "Export : " + FormView.LstExportData == undefined || FormView.LstExportData == "" ? exportTableName : FormView.LstExportData.AliasName;
    htm += '</div>';
    htm += '</div>';


    htm += '<div class="row">';
    htm += '<div  class="labeltext" style="width:100%">';
    htm += '<hr >';
    htm += '</div>';
    htm += '</div>';


    htm += '<div class="row">';
    //htm += '</br>';
    htm += '<div style="width: 100%">';

    htm += '<div id="SortDiv" style="width: 40%; display: inline-block; float: left; margin-top: 0px; margin-right: 0px;">';
    htm += '<div style="width: 20%; display: inline-block;">';
    htm += 'Sort : ';
    htm += '</div>';

    htm += '<div style="width: 38%; display: inline-block; ">';
    htm += '<select id="ExportSortFieldId" onchange="ExportSortControl();"></select>';
    htm += '</div>';
    htm += '<div style="width: 5%; display: inline-block; ">';
    htm += '</div>';
    htm += '<div id="SortId1" style="width: 15%; display: inline-block; ">';
    htm += '<select id="ExportSortId" onchange="ExportSortControl();">';
    htm += '<option value="ASC">ASC</option>';
    htm += '<option value="DESC">DESC</option>';
    htm += '</select>';
    htm += '</div>';



    ///////////////////
    htm += '</div>';

    htm += '<div id="ExportSearchDiv" style="width: 60%; display: inline-block; float: right; margin-top: 0px; margin-right: 0px;">';
    htm += '<div style="width: 10%; display: inline-block;">';
    htm += 'Search : ';
    htm += '</div>';

    htm += '<div style="width: 38%; display: inline-block; ">';
    htm += '<select id="ExportSearchFieldId" onchange="ExportSetSearchControl();"></select>';
    htm += '</div>';
    htm += '<div style="width: 18%; display: inline-block; ">';
    htm += '<select id="ExportContitionId" onchange="ExportSearchControl();">';
    htm += '<option value="equals">equals</option>';
    htm += '<option value="doesnotequal">does not equal</option>';
    htm += '<option value="isgreaterthan">is greater than</option>';
    htm += '<option value="isgreaterthanorequalto">is greater than or equal to</option>';
    htm += '<option value="islessthan">Is less than</option>';
    htm += '<option value="islessthanorequalto">is less than or equal to</option>';
    htm += '<option value="beginswith">begins with</option>';
    htm += '<option value="endswith">ends with</option>';
    htm += '<option value="contains">contains</option>';
    htm += '</select>';
    htm += '</div>';
    htm += '<div id="ExportSearchOptionId" style="width: 30%; display: inline-block; float: right;">';
    htm += '<input type="text" id="" />';
    htm += '</div>';

    htm += '</div>';
    htm += '</div>';

    htm += '<br />';
    htm += '<br />';
    htm += '<br />';

    htm += '<div style="width: 100%">';
    htm += '<div style="float: left;width:40%" id="ExportSortMultiListAdd" >';
    htm += '</div>';
    htm += '<div style="float: right;width:60%" id="ExportSearchMultiListAdd" >';
    htm += '</div>';
    htm += '</div>';

    htm += '<br />';

    htm += '<div class="tableDiv" style="width: 97% margin-left:20px; overflow-x: auto; height: 500px ; overflow-y: auto;">';
    //style = "white-space:nowrap;width:100%;"
    htm += '<table  style="table-layout:auto"  id="Exporttable" class="table table-striped table-bordered tableId">';
    htm += '<thead id="ExportListHeadDivId"  style="background-color:#000066; color: white; ">';

    htm += '</thead>';
    htm += '<tbody id="ExportListBodyDivId" >';
    // htm += '</tr>';
    htm += '</tbody>';
    htm += '<tfoot id="ExportListfootDivId">';
    htm += '</tfoot>';
    htm += '</table>';
    htm += '</div>';
    htm += '</div>';

    htm += '</div>';


    htm += '<div class="row">';

    //htm += '<div  class="labeltext" >';
    htm += '<div >';
    htm += '<button type="button" onclick="CancelExport();"   class="btn btn-danger" style="width:7%;margin-left:84%">Cancel</button>';
    htm += '<button type="button" onclick="ExportBtn();" class="btn btn-info" style="width:7%;margin-left:1%">Export</button> ';
    htm += '</div>';
    htm += '</div>';
    htm += '</div>';

    $("#ExportListDivId").append(htm);

}

function CancelExport() {
    FormView = Params.FormView;
    Params.FormView = LastParams.FormView;

    $("#FormListDivId").show();
    $("#ExportListDivId").hide();
}

function ExportSearchControl() {
}

function NoDataAvailable() {
    var htm = '';
    htm += '<div style="width: 98%;margin-left:15px">';
    htm += '<div class="row">';
    htm += '<div  class="labeltext" >';
    htm += "Export : " + FormView.LstExportData == undefined || FormView.LstExportData == "" ? exportTableName : FormView.LstExportData.AliasName;
    //htm += "Export : " + FormView.LstExportData.AliasName;
    htm += '</div>';
    htm += '</div>';


    htm += '<div class="row">';
    htm += '<div  class="labeltext" style="width:100%">';
    htm += '<hr >';
    htm += '</div>';
    htm += '</div>';
    htm += '</div>';

    htm += '<div class="row">';
    htm += '<div  class="labeltext" style="text-align:center;margin-bottom:25px" >';
    htm += "No data available ";
    htm += '</div>';
    htm += '</div>';

    htm += '<div class="row">';

    htm += '<div  class="labeltext" >';
    htm += '<button type="button" onclick="CancelExport();"   class="btn btn-danger">Cancel</button>';
    htm += '</div>';
    htm += '</div>';

    htm += '</div>';

    $("#ExportListDivId").append(htm);
}


function ExportSetSearchControl() {
    var selectedId = $('#ExportSearchFieldId').val();
    if (selectedId == "0")
        return;
    var selectedvalue = _searchControl[selectedId].SearchControl;
    $('#ExportSearchOptionId').empty();
    isDatePicker = false;
    var html = '';
    // searchSelectedId = 'Search_' + screenName + '_' + selectedId + '';

    if (selectedvalue == "TEXTBOX" || selectedvalue == "String") {
        html = '<input  type="text" id="SearchId_' + selectedId + '"   onblur="ExportEnterSearch(1);"onkeyup="ExportEnterSearch();" style="font-size: 16px;"  />';
        $(html).appendTo('#ExportSearchOptionId');
        ExportListSearch();
    }
    if (selectedvalue == "bool") {
        html = '<input  type="text" id="SearchId_' + selectedId + '"   onblur="ExportEnterSearch(1);"onkeyup="ExportEnterSearch();" style="font-size: 16px;"  />';
        $(html).appendTo('#ExportSearchOptionId');
        ExportListSearch();
    }
    else if (selectedvalue == "int") {
        html = '<input  type="text" id="SearchId_' + selectedId + '"  onkeypress="restrictMinus(event);"  onblur="ExportEnterSearch(1);"onkeyup="ExportEnterSearch();" style="font-size: 16px;"  />';
        $(html).appendTo('#ExportSearchOptionId');
        ExportListSearch();
    }
    else if (selectedvalue == "Double") {
        html = '<input  type="text" id="SearchId_' + selectedId + '"  onkeypress="restrictMinus(event);"  onblur="ExportEnterSearch(1);"onkeyup="ExportEnterSearch();" style="font-size: 16px;"  />';
        $(html).appendTo('#ExportSearchOptionId');
        ExportListSearch();
    }
    else if (selectedvalue == "DATEPICKER" || selectedvalue == "Date") {
        isDatePicker = true;
        html = '<input class="datepicker" type="text" id="SearchId_' + selectedId + '"  onchange="ExportListSearch();ExportEnterSearch(1,1);"  onkeyup="ExportEnterSearch(1,1);" style="font-size: 16px;" />';
        $(html).appendTo('#ExportSearchOptionId');
        DatePicker("No");
        ExportListSearch();
    }

    //else
    //    ExportListSearch(screenName, selectedvalue1.FieldControl, selectedId);


    ///
    if ($('#ExportSearchFieldId').val() != undefined) {
        var id = $('#ExportSearchFieldId').val();
        $.grep(searchOptionArray, function (e) {
            if (e.FieldName == id) {
                $("#SearchId_" + id).val(e.SearchText);
                $("#ExportContitionId").val(e.ExportContitionId);
            }
        });
    }

    ////
}


function ExportListSearch() {
    if ($('#ExportSearchFieldId').val() != undefined) {
        ExportFormListConfigRow(1);
    }
    else
        ExportFormListConfigRow(1);
}


function ExportSortControl() {

    if ($('#ExportSortFieldId').val() != undefined && $('#ExportSortFieldId').val() != '0') {
        var id = $('#ExportSortFieldId').val();

        var value = $("#ExportSortId").val();
        var idText = $('#ExportSortFieldId option:selected').text()
        TiAPIinfo('searchField Id  ---> ' + id);
        TiAPIinfo('searchField Code  ---> ' + value);
        TiAPIinfo('searchField ValueText  ---> ' + idText);
        id = id.split('_').length == 2 ? id.split('_')[1] : id;
        // id = id.replace(/ /g, "");
        var isMultiSortAdd = false;
        sortOptionArray = $.grep(sortOptionArray, function (e) {
            if (e.FieldName == id) {
                isMultiSortAdd = true;
            }
            return e.FieldName != id;
        });


        var html = '';

        if (sortOptionArray.length <= 0) {
            ExportDeleteMultiSort(id, 0);
            html += '<div id="SortDeleteMultiple_' + id + '"  >';
            html += '<p   >' + idText + ' : ' + value + ' <i style="color:red;cursor:pointer" class="fa fa-trash"  onclick="ExportDeleteMultiSort(\'' + id + '\');"></i>  </p>';
            html += '</div> ';
            $(html).appendTo('#ExportSortMultiListAdd');
        }
        else {
            if (isMultiSortAdd == true) {
                ExportDeleteMultiSort(id, 0);
                isMultiSortAdd = false;
            }
            html = '';
            html += '<div id="SortDeleteMultiple_' + id + '" >';
            html += '<p   >' + idText + ' : ' + value + ' <i style="color:red;cursor:pointer" class="fa fa-trash" onclick="ExportDeleteMultiSort(\'' + id + '\');"></i> </p>';
            html += '</div> ';
            $(html).appendTo('#ExportSortMultiListAdd');
        }

        // FieldControl
        objSort = {};
        objSort.FieldName = id;
        objSort.SearchText = value;

        //FieldName ASC
        //  objSort.OrderByQuery = $('#ExportSortFieldId').val().replace(/ /g, "") + " " + value;
        //var orderByQuery = $('#ExportSortFieldId').val().split(' ').length > 1 == true ? "[" + $('#ExportSortFieldId').val() + "]" : $('#ExportSortFieldId').val();
        var orderByQuery = idText.split(' ').length > 1 == true || idText == "Month" || idText == "Year" || idText == "Day" ? "[" + idText + "]" : idText;

        ///
        sortOptionArray = $.grep(sortOptionArray, function (e) {
            /// return e.OrderByQuery.toUpperCase() != "ORDER BY " + orderByQuery.toUpperCase() ;
            return e.OrderByQuery.toUpperCase() != "ORDER BY " + orderByQuery.toUpperCase();
        });
        sortOptionArray = $.grep(sortOptionArray, function (e) {
            /// return e.OrderByQuery.toUpperCase() != "ORDER BY " + orderByQuery.toUpperCase() ;
            return e.OrderByQuery.toUpperCase() != " ORDER BY " + orderByQuery.toUpperCase();
        });
        ///

        objSort.OrderByQuery = orderByQuery + " " + value;
        sortOptionArray.push(objSort);
        // ListSearch(scrName, '', '');
        ExportFormListConfigRow(1)

    }


}


function ExportDeleteMultiSort(id, deleteClick) {
    //  Search_StockTransferForm_StockRequestNo_StockOrder_StockNo
    sortOptionArray = $.grep(sortOptionArray, function (e) {
        return e.FieldName != id;
    });

    TiAPIinfo('MultiSort Remove Id    ---> ' + id);
    $('#SortDeleteMultiple_' + id).remove();
    if (deleteClick == 1)
        $('#' + searchSelectedId).val('');

    // ListSearch(scrName, '', '');
    ExportFormListConfigRow(1)
}


function ExportEnterSearch(isonblur, isDatePicker) {
    if (event.keyCode === 13 || isonblur || isDatePicker == 1) {//enter button click event
        $(this).next().focus();

        //  ListSearch(scrName);

        //if ($('#ExportSearchFieldId').val() != undefined) {
        var id = $('#ExportSearchFieldId').val();
        if (event.keyCode === 13)
            $('#ExportSearchFieldId').focus();


        var value = $("#SearchId_" + id).val();
        // value = value.replace('+', '__').replace('__', '+')
        value = value.replace('+', '__');
        var ExportContitionIdValue = $('#ExportContitionId  option:selected').text();
        var idText = $('#ExportSearchFieldId option:selected').text()
        TiAPIinfo('searchField Id  ---> ' + id);
        TiAPIinfo('searchField Code  ---> ' + value);
        TiAPIinfo('searchField ValueText  ---> ' + idText);
        id = id.split('_').length == 2 ? id.split('_')[1] : id;
        var isMultiSearchAdd = false;

        var checkRemoveId = id + $('#ExportContitionId').val() + "" + value;
        checkRemoveId = checkRemoveId.replace('/', '-').replace('/', '-').replace('/', '-');
        value = value.replace('__', '+');

        // var checkRemoveId = id + $('#ExportContitionId').val();
        // var checkRemoveIdNew = id + $('#ExportContitionId').val() + "" + value;
        searchOptionArray = $.grep(searchOptionArray, function (e) {
            //if (e.FieldName == checkRemoveId) {
            //    isMultiSearchAdd = true;
            //}
            //return e.FieldName != checkRemoveId;
            if (e.FieldName == checkRemoveId.replace('__', '+')) {
                isMultiSearchAdd = true;
            }
            return e.FieldName != checkRemoveId.replace('__', '+');
        });


        var html = '';
        if (searchOptionArray.length <= 0) {
            ExportDeleteMultiSearch(id, checkRemoveId, 0, ExportContitionIdValue);
            //html += '<div id="DeleteMultiple_' + id + '" style="width:50%;">';
            // html += '<div id="DeleteMultiple_' + id + '"  >';
            html += '<div id="DeleteMultiple_' + checkRemoveId.replace(/ /g, '') + '"  >';
            html += '<p   >' + idText + ' : ' + ExportContitionIdValue + ' : ' + value + '  <i style="color:red;cursor:pointer" class="fa fa-trash"  onclick="ExportDeleteMultiSearch(\'' + id + '\',\'' + checkRemoveId.replace('__', '+') + '\',1,\'' + ExportContitionIdValue + '\');"></i> </p>';
            //html += '<p   >' + idText + ' : ' + ExportContitionIdValue + ' : ' + value + '<span style="color:red" onclick="ExportDeleteMultiSearch(\'' + id + '\',\'' + checkRemoveId + '\',1,\'' + ExportContitionIdValue + '\');"> x </span> </p>';
            html += '</div> ';

            // $(html).appendTo('#SearchMultiListAdd_' + currentScreenName + '_' + FieldName);
            $(html).appendTo('#ExportSearchMultiListAdd');
        }
        else {
            if (isMultiSearchAdd == true) {
                ExportDeleteMultiSearch(id, checkRemoveId, 0, ExportContitionIdValue);
                // ExportDeleteMultiSearch(id, 0);
                isMultiSearchAdd = false;
            }
            html = '';
            //html += '<div id="DeleteMultiple_' + id + '" style="width:50%;">';
            // html += '<div id="DeleteMultiple_' + id + '" >';
            html += '<div id="DeleteMultiple_' + checkRemoveId.replace(/ /g, '') + '" >';
            html += '<p   id="focusId1">' + idText + ' : ' + ExportContitionIdValue + ' : ' + ' : ' + value + '  <i id="focusId" style="color:red;cursor:pointer" class="fa fa-trash"  onclick="ExportDeleteMultiSearch(\'' + id + '\',\'' + checkRemoveId.replace('__', '+') + '\',1,\'' + ExportContitionIdValue + '\');"></i> </p>';
            //html += '<p   >' + idText + ' : ' + ExportContitionIdValue + ' : ' + ' : ' + value + '<span style="color:red" onclick="ExportDeleteMultiSearch(\'' + id + '\',\'' + checkRemoveId + '\',1,\'' + ExportContitionIdValue + '\');"> x </span> </p>';
            html += '</div> ';
            $(html).appendTo('#ExportSearchMultiListAdd');
        }


        objSearch = {};
        // objSearch.FieldName = id;
        //objSearch.FieldName = id + $('#ExportContitionId').val();
        objSearch.FieldName = id + $('#ExportContitionId').val() + "" + value;
        objSearch.FieldNameContition = id + $('#ExportContitionId').val();
        objSearch.SearchText = value;
        objSearch.ExportContitionId = $('#ExportContitionId').val();
        objSearch.IsMultiple = false;

        var whereQueryId = idText.split(' ').length > 1 == true ? "[" + idText + "]" : idText;

        if ($("#ExportContitionId").val() == "equals") {
            var searchQuery = GetSearchQuery();
            if (searchOptionArray.length > 0 && searchQuery != '') {
                if (isDatePicker == 1)
                    objSearch.SearchQuery = searchQuery + " or cast( " + whereQueryId + " as Date) = Cast ( '" + value + "'  as Date) )";
                else
                    objSearch.SearchQuery = searchQuery + " or " + whereQueryId + " = '" + value + "' )";
                // "=Cast (' '" + value + "' as Date)"
                // "cast( " + whereQueryId + " as Date)"
                objSearch.IsMultiple = false;
            }
            else {
                if (isDatePicker == 1)
                    objSearch.SearchQuery = "and cast( " + whereQueryId + " as Date) = Cast ( '" + value + "'  as Date)  ";
                else
                    objSearch.SearchQuery = " and " + whereQueryId + " = '" + value + "' ";
            }
            if (isDatePicker == 1)
                objSearch.OptionSearchQuery = "and cast( " + whereQueryId + " as Date) = Cast ( '" + value + "'  as Date)  ";
            else
                objSearch.OptionSearchQuery = " and " + whereQueryId + " = '" + value + "' ";
        }
        else if ($("#ExportContitionId").val() == "doesnotequal") {
            var searchQuery = GetSearchQuery();
            if (searchOptionArray.length > 0 && searchQuery != '') {
                if (isDatePicker == 1)
                    objSearch.SearchQuery = searchQuery + " or cast( " + whereQueryId + " as Date) != Cast ( '" + value + "'  as Date) )";
                else
                    objSearch.SearchQuery = searchQuery + " or " + whereQueryId + " != '" + value + "' )";
                objSearch.IsMultiple = false;
            }
            else {
                if (isDatePicker == 1)
                    objSearch.SearchQuery = "and cast( " + whereQueryId + " as Date) != Cast ( '" + value + "'  as Date)  ";
                else
                    objSearch.SearchQuery = " and " + whereQueryId + " != '" + value + "' ";
            }
            if (isDatePicker == 1)
                objSearch.OptionSearchQuery = "and cast( " + whereQueryId + " as Date) != Cast ( '" + value + "'  as Date)  ";
            else
                objSearch.OptionSearchQuery = " and " + whereQueryId + " != '" + value + "' ";
        }
        else if ($("#ExportContitionId").val() == "isgreaterthan") {
            var searchQuery = GetSearchQuery();
            if (searchOptionArray.length > 0 && searchQuery != '') {
                if (isDatePicker == 1)
                    objSearch.SearchQuery = searchQuery + " or cast( " + whereQueryId + " as Date) > Cast ( '" + value + "'  as Date) )";
                else
                    objSearch.SearchQuery = searchQuery + " or " + whereQueryId + " > '" + value + "' )";
                objSearch.IsMultiple = false;
            }
            else {
                if (isDatePicker == 1)
                    objSearch.SearchQuery = "and cast( " + whereQueryId + " as Date) > Cast ( '" + value + "'  as Date)  ";
                else
                    objSearch.SearchQuery = " and " + whereQueryId + " > '" + value + "' ";
            }
            if (isDatePicker == 1)
                objSearch.OptionSearchQuery = "and cast( " + whereQueryId + " as Date) > Cast ( '" + value + "'  as Date)  ";
            else
                objSearch.OptionSearchQuery = " and " + whereQueryId + " > '" + value + "' ";
        }
        else if ($("#ExportContitionId").val() == "isgreaterthanorequalto") {
            var searchQuery = GetSearchQuery();
            if (searchOptionArray.length > 0 && searchQuery != '') {
                if (isDatePicker == 1)
                    objSearch.SearchQuery = searchQuery + " or cast( " + whereQueryId + " as Date) >= Cast ( '" + value + "'  as Date) )";
                else
                    objSearch.SearchQuery = searchQuery + " or " + whereQueryId + " >= '" + value + "' )";
                objSearch.IsMultiple = false;
            }
            else {
                if (isDatePicker == 1)
                    objSearch.SearchQuery = "and cast( " + whereQueryId + " as Date) >= Cast ( '" + value + "'  as Date)  ";
                else
                    objSearch.SearchQuery = " and " + whereQueryId + " >= '" + value + "' ";
            }
            if (isDatePicker == 1)
                objSearch.OptionSearchQuery = "and cast( " + whereQueryId + " as Date) >= Cast ( '" + value + "'  as Date)  ";
            else
                objSearch.OptionSearchQuery = " and " + whereQueryId + " >= '" + value + "' ";
        }
        else if ($("#ExportContitionId").val() == "islessthan") {
            var searchQuery = GetSearchQuery();
            if (searchOptionArray.length > 0 && searchQuery != '') {
                if (isDatePicker == 1)
                    objSearch.SearchQuery = searchQuery + " or cast( " + whereQueryId + " as Date) < Cast ( '" + value + "'  as Date) )";
                else
                    objSearch.SearchQuery = searchQuery + " or " + whereQueryId + " < '" + value + "' )";
                objSearch.IsMultiple = false;
            }
            else {
                if (isDatePicker == 1)
                    objSearch.SearchQuery = "and cast( " + whereQueryId + " as Date) < Cast ( '" + value + "'  as Date)  ";
                else
                    objSearch.SearchQuery = " and " + whereQueryId + " < '" + value + "' ";
            }
            if (isDatePicker == 1)
                objSearch.OptionSearchQuery = "and cast( " + whereQueryId + " as Date) < Cast ( '" + value + "'  as Date)  ";
            else
                objSearch.OptionSearchQuery = " and " + whereQueryId + " < '" + value + "' ";
        }
        else if ($("#ExportContitionId").val() == "islessthanorequalto") {
            var searchQuery = GetSearchQuery();
            if (searchOptionArray.length > 0 && searchQuery != '') {
                if (isDatePicker == 1)
                    objSearch.SearchQuery = searchQuery + " or cast( " + whereQueryId + " as Date) <= Cast ( '" + value + "'  as Date) )";
                else
                    objSearch.SearchQuery = searchQuery + " or " + whereQueryId + " <= '" + value + "' )";
                objSearch.IsMultiple = false;
            }
            else {
                if (isDatePicker == 1)
                    objSearch.SearchQuery = "and cast( " + whereQueryId + " as Date) <= Cast ( '" + value + "'  as Date)  ";
                else
                    objSearch.SearchQuery = " and " + whereQueryId + " <= '" + value + "' ";
            }
            if (isDatePicker == 1)
                objSearch.OptionSearchQuery = "and cast( " + whereQueryId + " as Date) <= Cast ( '" + value + "'  as Date)  ";
            else
                objSearch.OptionSearchQuery = " and " + whereQueryId + " <= '" + value + "' ";
        }
        else if ($("#ExportContitionId").val() == "beginswith") {
            var searchQuery = GetSearchQuery();
            if (searchOptionArray.length > 0 && searchQuery != '') {
                objSearch.SearchQuery = searchQuery + " or " + whereQueryId + " like '" + value + "%' )";
                objSearch.IsMultiple = false;
            }
            else
                objSearch.SearchQuery = " and " + whereQueryId + " like '" + value + "%' ";
            objSearch.OptionSearchQuery = " and " + whereQueryId + " like '" + value + "%' ";
        }
        else if ($("#ExportContitionId").val() == "endswith") {
            var searchQuery = GetSearchQuery();
            if (searchOptionArray.length > 0 && searchQuery != '') {
                objSearch.SearchQuery = searchQuery + " or " + whereQueryId + " like '%" + value + "' )";
                objSearch.IsMultiple = false;
            }
            else
                objSearch.SearchQuery = " and " + whereQueryId + " like '%" + value + "' ";
            objSearch.OptionSearchQuery = " and " + whereQueryId + " like '%" + value + "' ";
        }
        else if ($("#ExportContitionId").val() == "contains") {
            var searchQuery = GetSearchQuery();
            if (searchOptionArray.length > 0 && searchQuery != '') {
                objSearch.SearchQuery = searchQuery + " or " + whereQueryId + " like '%" + value + "%' )";
                objSearch.IsMultiple = false;
            }
            else
                objSearch.SearchQuery = " and " + whereQueryId + " like '%" + value + "%' "
            objSearch.OptionSearchQuery = " and " + whereQueryId + " like '%" + value + "%' ";
        }
        searchOptionArray.push(objSearch);
        ExportFormListConfigRow(1)
    }
}

function GetSearchQuery() {
    var searchQuery = '';
    for (var b = 0; b < searchOptionArray.length; b++) {
        if (searchOptionArray[b].FieldNameContition == objSearch.FieldNameContition) {
            searchOptionArray[b].IsMultiple = true;
            if (searchQuery == '')
                searchQuery = searchOptionArray[b].OptionSearchQuery.replace('and', 'and (');
            else
                searchQuery = searchQuery + searchOptionArray[b].OptionSearchQuery.replace('and', 'or')
        }
    }

    return searchQuery;
}

function ExportDeleteMultiSearch(id, checkRemoveId, deleteClick, operatorId) {
    var fieldNameCondition = id + operatorId;
    searchOptionArray = $.grep(searchOptionArray, function (e) {
        return e.FieldName != checkRemoveId.replace("-", "/").replace("-", "/").replace("-", "/");
    });

    TiAPIinfo('Multisearch Remove Id    ---> ' + id);
    $('#DeleteMultiple_' + checkRemoveId.replace(/ /g, '').replace('+', '__')).remove();
    if (deleteClick == 1)
        $('#' + searchSelectedId).val('');

    ///
    if (deleteClick != 0) {
        var searchQuery = '';
        var searchQueryLastCount = -1;
        for (var b = 0; b < searchOptionArray.length; b++) {
            if (searchOptionArray[b].FieldNameContition == fieldNameCondition) {
                searchQueryLastCount = b;
                searchOptionArray[b].IsMultiple = true;
                if (searchQuery == '')
                    searchQuery = searchOptionArray[b].OptionSearchQuery.replace('and', 'and (');
                else
                    searchQuery = searchQuery + searchOptionArray[b].OptionSearchQuery.replace('and', 'or')
            }
        }
        if (searchQueryLastCount != -1) {
            searchOptionArray[searchQueryLastCount].SearchQuery = searchQuery + ")";
            searchOptionArray[searchQueryLastCount].IsMultiple = false;
        }
    }
    //OptionSearchQuery
    ///
    ExportFormListConfigRow(1);
}


function ExportBtn() {

    searchOption = "";
    TiAPIinfo('Export Btn clicked searchOptionArray---> ' + searchOptionArray.length);
    for (var i = 0; i < searchOptionArray.length; i++) {
        // searchOption = searchOption + searchOptionArray[i].SearchQuery
        if (searchOptionArray[i].IsMultiple == false) {
            searchOption = searchOption + searchOptionArray[i].SearchQuery;
        }
    }

    sortOption = " ";
    TiAPIinfo('sortOptionArray.length ---> ' + sortOptionArray.length);
    for (var i = 0; i < sortOptionArray.length; i++) {
        if (sortOption != " ")
            sortOption = sortOption + " , ";
        sortOption = sortOption + sortOptionArray[i].OrderByQuery
    }
    if (sortOptionArray.length == 0)
        sortOption = "";
    TiAPIinfo('searchOption  ---> ' + searchOption);

    PageLoadinginfo("ListConfig listvalue query start: " + qry);
    qry = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(listQry), encryptkey, { keySize: 128 / 8, iv: encryptiv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    var params = "" + qry + "";

    LoadingImageDownloadOpen();

    var tblName = "";
    if (FormView.LstExportData == undefined || FormView.LstExportData == "")
        tblName = exportTableName;
    else
        tblName = FormView.LstExportData.AliasName;
    $.ajax({
        type: 'POST',
        url: url_ExportWithOutPagination,
        // data: { qry: listQry, searchOption: searchOption, SortOption: sortOption, TableName: FormView.LstExportData.AliasName },
        data: { qry: params, searchOption: searchOption, SortOption: sortOption, TableName: tblName },
        //  async: false,
        success: function (data) {
            LoadingImageClose();
            var btns = {};
            btns["Ok"] = function (e) {
                $(this).dialog("close");
            }
            var sheetName = data.split('&')[0].split('\\')[data.split('&')[0].split('\\').length - 1];
            $('<div></div>').appendTo('body')
                               .html('<div><h6><a href="' + data.split('&')[1] + sheetName + '"    style="color: blue;" download  >' + sheetName + '</a></h6></div>').dialog({
                                   modal: true, title: "Export file(s) Generated", zIndex: 10000, autoOpen: true,
                                   width: '35%', resizable: false,
                                   buttons: btns
                               });

            //alert(result);
        },
        error: function (xhr, e) {
            LoadingImageClose();
            alert("Error : " + xhr.responseText + " : " + e);
        }

    });
}


function ClearExistingCheckedListData(iIndex, dataMember, ttbodyId) {
    var tblbody = document.getElementById(ttbodyId);
    var isExport = tblbody.rows[iIndex].cells.namedItem(dataMember).childNodes['0'].checked;
    var aliasName = tblbody.rows[iIndex].cells.AliasName.innerText;
    var link = tblbody.rows[iIndex].cells.Link.innerText;
    var isShowAlert = false;
    if (isExport == true) {
        //$("#table_ExportDataForm_LstExportData").find('tr').each(function (event) {
        //    var row = $(this);
        //    if (row.find('input[type="checkbox"]').is(':checked') && row[0].children.Link.innerText != "" && row[0].children.AliasName.innerText != aliasName) {
        //        isShowAlert = true;
        //    }
        //});

        //if (isShowAlert) {
        //    var obj = {};
        //    obj.title = "ALERT";
        //    obj.message = "Do you want to refresh the list?";
        //    obj.functionname = ExportListClearConfirm;
        //    obj.aliasName = aliasName;
        //   // ExportListConfirmMessage(obj);
        //    ExportListClearConfirm(obj);
        //}

    }
    else {
        if (link != "") {
            link = tblbody.rows[iIndex].cells.Link.innerText = "";
        }
    }
}

function ExportListConfirmMessage(obj) {
    var btns = {};
    btns["Yes"] = function (e) {
        obj.functionname(obj);
        $(this).dialog("close");
    }
    btns["No"] = function (e) {
        $(this).dialog("close");
    }

    $('<div></div>').appendTo('body')
                    .html('<div><h6>' + obj.message + '</h6></div>').dialog({
                        modal: true, title: obj.title, zIndex: 10000, autoOpen: true,
                        width: 'auto', resizable: false,
                        buttons: btns
                    });
}

function ExportListClearConfirm(obj) {
    $("#table_ExportDataForm_LstExportData").find('tr').each(function (event) {
        var row = $(this);
        if (row.find('input[type="checkbox"]').is(':checked')) {
            if (row[0].children.AliasName.innerText != obj.aliasName) {

                row[0].children.Link.innerText = "";
                row[0].children.Export.children.Export.checked = false;
            }
        }
    });
}




function exportFileToSQLFromToDateJSU() {
    var tableName = new Array();

    var selectedIDs = new Array();
    // table_ImportDataForm_LstImportData
    $("#table_ExportDataForm_LstExportData").find('tr').each(function (event) {
        var row = $(this);
        //if (row.find('input[type="checkbox"]').is(':checked') &&   row.find('textarea').val().length <= 0) {
        if (row.find('input[type="checkbox"]').is(':checked')) {
            selectedIDs.push(row[0].children.AliasName.innerText);
        }
    });

    var postData = selectedIDs.join(",");
    var d = new Date();
    var usrId = $('#User').val() == undefined ? "" : $('#User').val();
    var fileType = $('#FileType').val() == undefined ? "" : $('#FileType').val();
    var fromDate = $('#FromDate').val() == undefined ? d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear() : $('#FromDate').val();
    var toDate = $('#ToDate').val() == undefined ? d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear() : $('#ToDate').val();
    link1 = url_ExportSQLFromToDateJSU + "?tableName=" + postData + "&AgentID=" + $('#AgentId').val() + "&FromDt=" + $('#FromDate').val() + "&ToDt=" + $('#ToDate').val() + "&FileType=" + fileType;
    LoadingImageOpen();
    $.ajax({
        type: "POST",
        url: link1,
        //url: url_ExportFile,
        // data: csv,
        dataType: 'json',
        success: function (data) {
            if (data != "") {
                var j = 0;
                var hrefUrl = '';
                var hrefLable = '';
                var retValue = '';
                $("#table_ExportDataForm_LstExportData").find('tr').each(function (event) {
                    var row = $(this);
                    //if (row.find('input[type="checkbox"]').is(':checked') &&   row.find('textarea').val().length <= 0) {
                    if (row.find('input[type="checkbox"]').is(':checked')) {
                        //for (var j = 0; j < selectedIDs.length; j++) {
                        //   debugger;
                        // "../ ImportFiles / ExportFiles /Customer" + "$" + "Customer""
                        hrefUrl = data.split(',')[j].split('$')[0];
                        retValue = data.split(',')[j].split('$')[1];
                        hrefLable = retValue == "" ? "" : hrefUrl.split('.csv').length == 2 ? selectedIDs[j] + ".csv" : selectedIDs[j] + ".xlsx";
                        // hrefLable = retValue == "" ? "" : selectedIDs[j];
                        row[0].children.Link.innerHTML = "";
                        if (retValue != "")
                            row[0].children.Link.innerHTML = "<a href='" + hrefUrl + "' style='color: blue' download>" + hrefLable + " </a>";
                        else
                            row[0].children.Link.innerHTML = "Data Not Available";
                        j++;
                    }
                });
            }

            LoadingImageClose();

        },
        error: function (xhr, status, error) {
            LoadingImageClose();
        }
    });
}

function exportFileToSQLFromToDate() {
    var tableName = new Array();

    var selectedIDs = new Array();
    // table_ImportDataForm_LstImportData
    $("#table_ExportDataForm_LstExportData").find('tr').each(function (event) {
        var row = $(this);
        //if (row.find('input[type="checkbox"]').is(':checked') &&   row.find('textarea').val().length <= 0) {
        if (row.find('input[type="checkbox"]').is(':checked')) {
            // selectedIDs.push(row[0].children.TableName.innerText);
            selectedIDs.push(row[0].children.AliasName.innerText);
            // selectedIDs.push(row[0].cells["Checkbox"].innerText);
            //alert('You must fill the text area!');
        }
    });

    var link2 = "";
    var link3 = "";

    var postData = selectedIDs.join(",");
    var d = new Date();
    var usrId = $('#User').val() == undefined ? "" : $('#User').val();
    var fileType = $('#FileType').val() == undefined ? "" : $('#FileType').val();
    var fromDate = $('#FromDate').val() == undefined ? d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear() : $('#FromDate').val();
    var toDate = $('#ToDate').val() == undefined ? d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear() : $('#ToDate').val();
    // link1 = url_ExportFile + "?tableName=" + postData + "&AgentID=" + usrId + "&FromDt=" + fromDate + "&ToDt=" + toDate;
    //link1 = url_ExportSQLFromToDate + "?tableName=" + postData + "&AgentID=" + $('#User').val() + "&FromDt=" + $('#FromDate').val() + "&ToDt=" + $('#ToDate').val();

    //  COMMENTED FOR UIC ONLY UIC HAVE DATE FORMAT DD/MM/YYYY
    if (ProjectName.toLowerCase() == "uic" || ProjectName.toLowerCase() == 'bangala'
        || ProjectName.toLowerCase() == 'pod') {
        var fDate = DateFormateChangeDDMM("dd/mm/yyyy", $('#FromDate').val());
        var tDate = DateFormateChangeDDMM("dd/mm/yyyy", $('#ToDate').val());

        link1 = url_ExportSQLFromToDate + "?tableName=" + postData + "&AgentID=" + $('#AgentId').val() + "&FromDt=" + fDate + "&ToDt=" + tDate + "&FileType=" + fileType;
        //alert(link1);
    }

    else {
        var dteformat = systemTableConfig["DATEFORMATSTRING"].toString().toLowerCase();
        var salesAgent = $('#SalesAgent').val() == undefined ? "" : $('#SalesAgent').val();
        var distributorID = $('#DistributorID').val() == undefined ? "" : $('#DistributorID').val();
        var salesOfficeID = $('#SalesOfficeID').val() == undefined ? "" : $('#SalesOfficeID').val();
        if (dteformat == "dd/mm/yyyy") {

            var fDate = DateFormateChangeDDMM(_format, $('#FromDate').val()); //"dd/mm/yyyy"
            var tDate = DateFormateChangeDDMM(_format, $('#ToDate').val());

            link1 = url_ExportSQLFromToDate + "?tableName=" + postData + "&AgentID=" + $('#AgentId').val() + "&FromDt=" + fDate + "&ToDt=" + tDate + "&DistributorID=" + distributorID + "&SalesOfficeID=" + salesOfficeID + "&SalesAgent=" + salesAgent + "&FileType=" + fileType;

            ///
            link2 = "&AgentID=" + $('#AgentId').val() + "&FromDt=" + fDate + "&ToDt=" + tDate + "&DistributorID=" + distributorID + "&SalesOfficeID=" + salesOfficeID + "&SalesAgent=" + salesAgent + "&FileType=" + fileType;

            //if (fileType == "xlsx") {
            //    var tt = 0;
            //    LoadingImageOpen();

            //    for (var t = 0; t < selectedIDs.length; t++) {
            //        link2 = "/Export/ExportToExcel1/" + "?tableName=" + selectedIDs[t] + "&AgentID=" + $('#AgentId').val() + "&FromDt=" + fDate + "&ToDt=" + tDate + "&DistributorID=" + distributorID + "&SalesOfficeID=" + salesOfficeID + "&SalesAgent=" + salesAgent + "&FileType=" + fileType;
            //        $.ajax({
            //            type: "POST",
            //            url: link2,
            //            dataType: 'json',
            //            beforeSend: function () {
            //                //LoadingImageOpen();
            //            },
            //            success: function (data) {
            //                tt++;
            //                //var response = JSON.parse(data);
            //                var response = data;
            //                window.location = '/Export/Download?fileGuid=' + response.FileGuid
            //                                  + '&filename=' + response.FileName;
            //                if (selectedIDs.length == tt)
            //                    LoadingImageClose();

            //            },
            //            complete: function () {
            //                //LoadingImageClose();
            //            }
            //        })
            //    }
            //    return;
            //}

            ///

            // link1 = url_ExportSQLFromToDate + "?tableName=" + postData + "&AgentID=" + $('#AgentId').val() + "&FromDt=" + fDate + "&ToDt=" + tDate;
            //url_ExportSQLFromToDatePVM
        }
        else {
            link1 = url_ExportSQLFromToDate + "?tableName=" + postData + "&AgentID=" + $('#AgentId').val() + "&FromDt=" + $('#FromDate').val() + "&ToDt=" + $('#ToDate').val() + "&DistributorID=" + distributorID + "&SalesOfficeID=" + salesOfficeID + "&SalesAgent=" + salesAgent + "&FileType=" + fileType;
            // link1 = url_ExportSQLFromToDate + "?tableName=" + postData + "&AgentID=" + $('#AgentId').val() + "&FromDt=" + $('#FromDate').val() + "&ToDt=" + $('#ToDate').val();
        }
        //alert(link1);
    }
    //link1 = "/Export/ExportSQLFromToDateNew/?tableName=Item&AgentID=undefined&FromDt=2022-04-13&ToDt=2022-04-13&FileType=";

    if (fileType == "xlsx1" && (ProjectName == "PVMB" || ProjectName == "PVM1")) {
        var tt = 0;
        LoadingImageOpen();

        for (var t = 0; t < selectedIDs.length; t++) {
            link2 = "../Export/ExportToExcel1/" + "?tableName=" + selectedIDs[t] + link2;
            //link2 = "/Export/ExportToExcel1/" + "?tableName=" + selectedIDs[t] + "&AgentID=" + $('#AgentId').val() + "&FromDt=" + fDate + "&ToDt=" + tDate + "&DistributorID=" + distributorID + "&SalesOfficeID=" + salesOfficeID + "&SalesAgent=" + salesAgent + "&FileType=" + fileType;
            $.ajax({
                type: "POST",
                url: link2,
                dataType: 'json',
                success: function (data) {
                    tt++;
                    var response = data;
                    window.location = '../Export/Download?fileGuid=' + response.FileGuid
                                      + '&filename=' + response.FileName;
                    if (selectedIDs.length == tt) {
                        LoadingImageClose();
                        $("#table_ExportDataForm_LstExportData").find('tr').each(function (event) {
                            var row = $(this);
                            if (row.find('input[type="checkbox"]').is(':checked')) {
                                row[0].children.Link.innerHTML = "Completed!";
                            }
                            else {
                                var row = $(this);
                                row[0].children.Link == undefined ? "" : row[0].children.Link.innerHTML = "";
                            }
                        });
                    }


                }
            })
        }
        return;
    }
    else {
        LoadingImageOpen();
        //link1 = "../Export/TestExcel"
        $.ajax({
            type: "POST",
            url: link1,
            //url: url_ExportFile,
            // data: csv,
            dataType: 'json',
            success: function (data) {

                //exportexcel(data);
                //LoadingImageClose();
                //return;
                if (data != "") {
                    var j = 0;
                    var hrefUrl = '';
                    var hrefLable = '';
                    var retValue = '';
                    $("#table_ExportDataForm_LstExportData").find('tr').each(function (event) {
                        var row = $(this);
                        //if (row.find('input[type="checkbox"]').is(':checked') &&   row.find('textarea').val().length <= 0) {
                        if (row.find('input[type="checkbox"]').is(':checked')) {
                            //for (var j = 0; j < selectedIDs.length; j++) {

                            // "../ ImportFiles / ExportFiles /Customer" + "$" + "Customer""
                            hrefUrl = data.split(',')[j].split('$')[0];
                            retValue = data.split(',')[j].split('$')[1];
                            hrefLable = retValue == "" ? "" : hrefUrl.split('.csv').length == 2 ? selectedIDs[j] + ".csv" : selectedIDs[j] + ".xlsx";
                            // hrefLable = retValue == "" ? "" : selectedIDs[j];
                            row[0].children.Link.innerHTML = "";
                            if (retValue != "")
                                row[0].children.Link.innerHTML = "<a href='" + hrefUrl + "' style='color: blue' download>" + hrefLable + " </a>";
                            else
                                row[0].children.Link.innerHTML = "Data Not Available";

                            //row[0].children.Link.innerHTML = "<a href='" + hrefUrl + "' style='color: blue' download>" + selectedIDs[j] + ".xlsx </a>";
                            //row[0].children.Link.innerHTML = "<a href='" + data.split(',')[j] + "' download>" + selectedIDs[j] + ".xlsx </a>";
                            j++;
                            // }
                        }
                        else {
                            var row = $(this);
                            row[0].children.Link == undefined ? "" : row[0].children.Link.innerHTML = "";
                        }
                    });
                }

                LoadingImageClose();

            },
            error: function (xhr, status, error) {
                LoadingImageClose();
                //alert("Error -" + status + ' ' + error);
            }
        });


    }
    //});

}



function exportexcel(data) {
    //$('#TestExportTable').dataTable({
    //    "data": data,
    //    dom: 'Bfrtip',
    //    buttons: [
    //         'excel' 
    //        //'copy', 'csv', 'excel', 'pdf', 'print'
    //    ]
    //});
    //$('#TestExportDiv').show();

    var dataListq = "";
    var dataList = $.parseJSON(data);
    $.each(dataList, function (k, v) {
        //display the key and value pair
        //alert(k + ' is ' + v);
        dataListq = k + ' is ' + v;
    });
    //for (var i = 0; i < dataList.length; i++) {

    //}


    //$('#dialog').dialog('open');

    $("#dialog").append('<div id="aaww"> <table id="TestExportTable" style="display: block;overflow-x: auto;white-space: nowrap;font-size: 10px;font-family: sans-serif;" class="table"><thead id="TesttheadId"></thead><tbody id="TesttbodyId"></tbody> </table> </div>');
    //$("#dialog").append('<div id="aaww"></div>');
    var htmlTesttheadId = "";
    var htmlTesttbodyId = "";
    htmlTesttheadId += "<tr>";
    for (var j = 0; j < 100; j++) {
        for (index = 0; index < dataList.length; index++) {
            var obj = dataList[index];
            htmlTesttbodyId += "<tr>";

            $.each(obj, function (value, key) {
                if (index == 0 && j == 0) {
                    htmlTesttheadId += "<th>" + value + "</th>";
                }
                dataListq = value, " =", key;
                htmlTesttbodyId += "<th>" + key + "</th>";

            });
            htmlTesttbodyId += "</tr>";

        }

        //if (j == 60) {
        //    htmlTesttheadId += "</tr>";

        //    $("#TesttheadId").append(htmlTesttheadId);
        //    $("#TesttbodyId").append(htmlTesttbodyId);

        //    htmlTesttheadId = "";
        //    htmlTesttbodyId = "";
        //    htmlTesttheadId += "<tr>";
        //}
    }
    htmlTesttheadId += "</tr>";

    $("#TesttheadId").append(htmlTesttheadId);
    $("#TesttbodyId").append(htmlTesttbodyId);

    $('#TestExportTable').dataTable({
        //"data": data,
        dom: 'Bfrtip',
        buttons: [
             'excel'
            //'copy', 'csv', 'excel', 'pdf', 'print'
        ]
    });


    $('#dialog').dialog('open');
    //$('#aaww').hide();
    //$('.dataTables_filter').hide();

    //$('#TestExportDiv').dialog('open');

    //$('#messageDialog').dialog('open');

    //var btns = {};
    //btns["Ok"] = function (e) {
    //    $(this).dialog("close");
    //}

    //$('<div></div>').appendTo('body')
    //                             .html('<div><table id="TestExportTable" class="table table-bordered  dataTable dtr-inline"><thead id="TesttheadId"></thead> <tbody  id="TesttbodyId" ></tbody></table></div>').dialog({
    //                                 modal: true, title: "", zIndex: 10000, autoOpen: true,
    //                                 width: '50%', resizable: false,
    //                                 buttons: btns
    //                             });

}




function exportCSVToSQLFromToDate() {
    var tableName = new Array();

    var selectedIDs = new Array();
    $("#table_ExportDataForm_LstExportData").find('tr').each(function (event) {
        var row = $(this);
        if (row.find('input[type="checkbox"]').is(':checked')) {
            selectedIDs.push(row[0].children.AliasName.innerText);
        }
    });

    var postData = selectedIDs.join(",");
    var d = new Date();
    var usrId = $('#User').val() == undefined ? "" : $('#User').val();
    var fromDate = $('#FromDate').val() == undefined ? d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear() : $('#FromDate').val();
    var toDate = $('#ToDate').val() == undefined ? d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear() : $('#ToDate').val();
    var agentid = $('#User').val() == undefined || $('#User').val() == "" ? "ALL" : $('#User').val();
    //url_ExportCSV -- C# code
    link1 = url_ExportCSV + "?tableName=" + postData + "&AgentID=" + agentid + "&FromDt=" + $('#FromDate').val() + "&ToDt=" + $('#ToDate').val();
    //url_ExportCSV -- dll code
    link1 = url_ExportSQLFromToDateCSV + "?tableName=" + postData + "&AgentID=" + agentid + "&FromDt=" + $('#FromDate').val() + "&ToDt=" + $('#ToDate').val();

    LoadingImageOpen();
    $.ajax({
        type: "POST",
        url: link1,
        dataType: 'json',
        success: function (data) {
            if (data != "") {
                var j = 0;
                var hrefUrl = '';
                var hrefLable = '';
                var retValue = '';
                $("#table_ExportDataForm_LstExportData").find('tr').each(function (event) {
                    var row = $(this);
                    if (row.find('input[type="checkbox"]').is(':checked')) {
                        hrefUrl = data.split(',')[j].split('$')[0];
                        retValue = data.split(',')[j].split('$')[1];
                        hrefLable = retValue == "" ? "" : hrefUrl.split('.csv').length == 2 ? selectedIDs[j] + ".csv" : selectedIDs[j] + ".xlsx";
                        row[0].children.Link.innerHTML = "";
                        if (retValue != "")
                            row[0].children.Link.innerHTML = "<a href='" + hrefUrl + "' style='color: blue' download>" + hrefLable + " </a>";
                        else
                            row[0].children.Link.innerHTML = "Data Not Available";
                        j++;
                    }
                });
            }
            LoadingImageClose();
        },
        error: function (xhr, status, error) {
            LoadingImageClose();
        }
    });


}
