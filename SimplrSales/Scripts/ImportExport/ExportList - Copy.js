var encryptkey = CryptoJS.enc.Utf8.parse('simplr8080808080');
var encryptiv = CryptoJS.enc.Utf8.parse('simplr8080808080');
var exportHdr = {};
var listQry = {};

var searchOptionArray = [];
var sortOptionArray = [];

function ExportDataFormList() {
    executeReader();
}

function executeReader() {
    searchOptionArray = [];
    sortOptionArray = [];

    //qry = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(qry), encryptkey, { keySize: 128 / 8, iv: encryptiv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    //var params = "{'query':'" + qry + "'}";
    listQry = FormView.LstExportData.QueryText;
    $.ajax({
        type: "POST",
        url: url_GetExecuteReader,
        data: { query: listQry },
        //  contentType: "application/json;charset=utf-8",
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
            htm += '<th>';
            htm += dataHdr[i].Name;
            htm += '</th>';

            searchobj.FieldControl = dataHdr[i].Name;
            searchobj.SearchControl = dataHdr[i].Type;
            fieldControl = dataHdr[i].Name.replace(/ /g, "");
            // fieldControl = dataHdr[i].Name;

            _searchControl[fieldControl] = searchobj;
            valueText += "<option value='" + fieldControl + "'>" + dataHdr[i].Name + "</option>";
            valueTextSoryOrder += "<option value='" + fieldControl + "'>" + dataHdr[i].Name + "</option>";
        }
        htm += '</tr>';
        $("#ExportListHeadDivId").append(htm);
        $(valueTextSoryOrder).appendTo('#ExportSortFieldId');
        $(valueText).appendTo('#ExportSearchFieldId');

        //execute(qry);
        //AssignExportListData(executeQry, 1);;
        ExportSortControl();
        ExportFormListConfigRow(1);
    }
}

function ExportFormListConfigRow(pageNumber, SearchId) {

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

    $.ajax({
        type: 'POST',
        url: url_ExportGetListValue,
        data: { qry: listQry, pageNumber: pageNumber, searchOption: searchOption, SortOption: sortOption },
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

            htm += '<td>';
            htm += data[i][exportHdr[j].Name];
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
    htm += "Export : " + FormView.LstExportData.AliasName;
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
    htm += '<option value="Islessthanorequalto">isless than or equal to</option>';
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
    htm += '<table id="Exporttable" class="table table-striped table-bordered tableId">';
    htm += '<thead id="ExportListHeadDivId">';

    htm += '</thead>';
    htm += '<tbody id="ExportListBodyDivId" >';
    htm += '</tr>';
    htm += '</tbody>';
    htm += '<tfoot id="ExportListfootDivId">';
    htm += '</tfoot>';
    htm += '</table>';
    htm += '</div>';
    htm += '</div>';

    htm += '</div>';


    htm += '<div class="row">';

    htm += '<div  class="labeltext" >';
    htm += '<button type="button" onclick="CancelExport();"   class="btn btn-danger">Cancel</button>';
    htm += '<button type="button" onclick="ExportBtn();" class="btn btn-info">Export</button> ';
    htm += '</div>';
    htm += '</div>';
    htm += '</div>';

    $("#ExportListDivId").append(htm);

}

function CancelExport() {
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
    htm += "Export : " + FormView.LstExportData.AliasName;
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
        html = '<input  type="text" id="SearchId_' + selectedId + '"   onblur="ExportEnterSearch(1);" style="font-size: 16px;"  />';
        $(html).appendTo('#ExportSearchOptionId');
        ExportListSearch();
    }
    else if (selectedvalue == "int") {
        html = '<input  type="text" id="SearchId_' + selectedId + '"  onkeypress="restrictMinus(event);"  onblur="ExportEnterSearch(1);" style="font-size: 16px;"  />';
        $(html).appendTo('#ExportSearchOptionId');
        ExportListSearch();
    }
    else if (selectedvalue == "DATEPICKER" || selectedvalue == "Date") {
        isDatePicker = true;
        html = '<input class="datepicker" type="text" id="SearchId_' + selectedId + '"  onchange="ExportListSearch();ExportEnterSearch(,1);"  onkeyup="ExportEnterSearch();" style="font-size: 16px;" />';
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
        var orderByQuery = idText.split(' ').length > 1 == true ? "[" + idText + "]" : idText;
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
        //  ListSearch(scrName);

        //if ($('#ExportSearchFieldId').val() != undefined) {
        var id = $('#ExportSearchFieldId').val();

        var value = $("#SearchId_" + id).val();
        var ExportContitionIdValue = $('#ExportContitionId  option:selected').text();
        var idText = $('#ExportSearchFieldId option:selected').text()
        TiAPIinfo('searchField Id  ---> ' + id);
        TiAPIinfo('searchField Code  ---> ' + value);
        TiAPIinfo('searchField ValueText  ---> ' + idText);
        id = id.split('_').length == 2 ? id.split('_')[1] : id;
        var isMultiSearchAdd = false;

        var checkRemoveId = id + $('#ExportContitionId').val();
        searchOptionArray = $.grep(searchOptionArray, function (e) {
            //if (e.FieldName == id) {
            //    isMultiSearchAdd = true;
            //}
            //return e.FieldName != id;
            if (e.FieldName == checkRemoveId) {
                isMultiSearchAdd = true;
            }
            return e.FieldName != checkRemoveId;
        });


        var html = '';
        if (searchOptionArray.length <= 0) {
            ExportDeleteMultiSearch(id, 0);
            //html += '<div id="DeleteMultiple_' + id + '" style="width:50%;">';
            html += '<div id="DeleteMultiple_' + id + '"  >';
            html += '<p   >' + idText + ' : ' + ExportContitionIdValue + ' : ' + +value + '<span style="color:red" onclick="ExportDeleteMultiSearch(\'' + id + '\',1);"> x </span> </p>';
            html += '</div> ';

            // $(html).appendTo('#SearchMultiListAdd_' + currentScreenName + '_' + FieldName);
            $(html).appendTo('#ExportSearchMultiListAdd');
        }
        else {
            if (isMultiSearchAdd == true) {
                ExportDeleteMultiSearch(ExportContitionIdValue, 0);
                isMultiSearchAdd = false;
            }
            html = '';
            //html += '<div id="DeleteMultiple_' + id + '" style="width:50%;">';
            html += '<div id="DeleteMultiple_' + id + '" >';
            html += '<p   >' + idText + ' : ' + ExportContitionIdValue + ' : ' + ' : ' + value + '<span style="color:red" onclick="ExportDeleteMultiSearch(\'' + id + '\',1);"> x </span> </p>';
            html += '</div> ';
            $(html).appendTo('#ExportSearchMultiListAdd');
        }


        objSearch = {};
        // objSearch.FieldName = id;
        objSearch.FieldName = id + $('#ExportContitionId').val();
        objSearch.SearchText = value;
        objSearch.ExportContitionId = $('#ExportContitionId').val();

        var whereQueryId = idText.split(' ').length > 1 == true ? "[" + idText + "]" : idText;

        if ($("#ExportContitionId").val() == "equals") { objSearch.SearchQuery = " and " + whereQueryId + " = '" + value + "' "; }
        else if ($("#ExportContitionId").val() == "doesnotequal") { objSearch.SearchQuery = " and " + whereQueryId + " != '" + value + "' "; }
        else if ($("#ExportContitionId").val() == "isgreaterthan") { objSearch.SearchQuery = " and " + whereQueryId + " > '" + value + "' "; }
        else if ($("#ExportContitionId").val() == "isgreaterthanorequalto") { objSearch.SearchQuery = " and " + whereQueryId + " >= '" + value + "' "; }
        else if ($("#ExportContitionId").val() == "islessthan") { objSearch.SearchQuery = " and " + whereQueryId + " < '" + value + "' "; }
        else if ($("#ExportContitionId").val() == "islessthanorequalto") { objSearch.SearchQuery = " and " + whereQueryId + " <= '" + value + "' "; }
        else if ($("#ExportContitionId").val() == "beginswith") { objSearch.SearchQuery = " and " + whereQueryId + " like '" + value + "%' " }
        else if ($("#ExportContitionId").val() == "endswith") { objSearch.SearchQuery = " and " + whereQueryId + " like '%" + value + "' " }
        else if ($("#ExportContitionId").val() == "contains") { objSearch.SearchQuery = " and " + whereQueryId + " like '%" + value + "%' " }

        //if (isDatePicker == true)
        //    objSearch.SearchQuery = " and cast( " + id + " AS DATE) = '" + DateFormateChange(value) + "' ";
        //else if (FieldControl == "NUMERIC")
        //    objSearch.SearchQuery = " and " + id + " = '" + value + "' ";
        //else
        //    objSearch.SearchQuery = " and " + id + " like '%" + value + "%' ";
        searchOptionArray.push(objSearch);
        ExportFormListConfigRow(1)
        //}
    }
}

function ExportDeleteMultiSearch(id, deleteClick) {
    //  Search_StockTransferForm_StockRequestNo_StockOrder_StockNo
    searchOptionArray = $.grep(searchOptionArray, function (e) {
        return e.FieldName != id;
    });

    TiAPIinfo('Multisearch Remove Id    ---> ' + id);
    $('#DeleteMultiple_' + id).remove();
    if (deleteClick == 1)
        $('#' + searchSelectedId).val('');

    ExportFormListConfigRow(1);
}



function ExportBtn() {
    $('#popupdialog').dialog({ width: "20%", modal: true, closeOnEscape: false, });
    $('.ui-dialog-titlebar').hide();
    $('#popupdialog').html('<img src="../Images/ajax-loader%20(4).gif"  style="margin-left: 90px;"/>');

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

    PageLoadinginfo("ListConfig listvalue query start: ");

    $.ajax({
        type: 'POST',
        url: url_ExportWithOutPagination,
        data: { qry: listQry, searchOption: searchOption, SortOption: sortOption, TableName: FormView.LstExportData.AliasName },
        async: false,
        success: function (data) {
            $('.ui-dialog-titlebar').show();
            $('#popupdialog').html('');
            $('#popupdialog').dialog("close");


            var btns = {};
            btns["Ok"] = function (e) {
                $(this).dialog("close");
            }
            var sheetName = data.split('&')[0].split('\\')[data.split('&')[0].split('\\').length - 1];
            $('<div></div>').appendTo('body')
                               .html('<div><h6><a href="' + data.split('&')[1] + sheetName + '" style="color: blue" download  >' + sheetName + '</a></h6></div>').dialog({
                                   modal: true, title: "Export file(s) Generated", zIndex: 10000, autoOpen: true,
                                   width: '20%', resizable: false,
                                   buttons: btns
                               });

            //alert(result);
        },
        error: function (xhr) {
            alert("Error : " + xhr.responseText);
        }

    });
}


function encryptMessage(messageToencrypt, secretkey) {
    var key = CryptoJS.enc.Utf8.parse('simplr8080808080');
    var iv = CryptoJS.enc.Utf8.parse('simplr8080808080');
    qry = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(messageToencrypt), key, { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    return qry.toString();

    //var encryptedMessage = CryptoJS.AES.encrypt(messageToencrypt, secretkey);
    //return encryptedMessage.toString();
}
function decryptMessage(encryptedMessage, secretkey) {

    //var key = CryptoJS.enc.Utf8.parse('simplr8080808080');
    //var iv = CryptoJS.enc.Utf8.parse('simplr8080808080');
    //qry = CryptoJS.AES.decrypt(CryptoJS.decrypt.Utf8.parse(encryptedMessage), key, { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });

    //return qry;

    var key = CryptoJS.enc.Utf8.parse('simplr8080808080');
    var iv = CryptoJS.enc.Utf8.parse('simplr8080808080');
    var _enid = CryptoJS.AES.decrypt(encryptedMessage, key,
  {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
  }).toString(CryptoJS.enc.Utf8);
    return _enid;



    //var decryptedBytes = CryptoJS.AES.decrypt(encryptedMessage, secretkey);
    //var decryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);

    return decryptedMessage;
}

////var _key = 'simplr8080808080';
////var _key = 'your_password';
//var _key = CryptoJS.enc.Utf8.parse('simplr8080808080')
////var query = "select * from Gridfunctions where screenname ='MAIN' and Access ='4' and solutionName='SALES-WEB-UL'";
//var query = "Users13s";
//alert("Text Before encrypt: " + query);
//var encrypt = encryptMessage(query, _key);
//alert("Text after encrypt: " + encrypt);

////var decrypt = decryptMessage(encrypt, _key);
//var decryptq = decryptMessage("ICZWkEYYwVWhF7Cpr2fpZA==", _key);
//alert("Text after decrypt: " + decrypt);



//var key = CryptoJS.enc.Utf8.parse('simplr8080808080');
//var iv = CryptoJS.enc.Utf8.parse('simplr8080808080');
//qry = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(qry), key, { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });

