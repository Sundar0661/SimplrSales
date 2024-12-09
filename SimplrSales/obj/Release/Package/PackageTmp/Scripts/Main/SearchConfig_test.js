
var fldName = '';

var search_Data = [];


//function GetSearchConfig(screenName, fieldName, ttbody, tfoot) {
//    fldName = fieldName;
//    // COMMENTED 17.09.2020 ===============================================================
//    $.ajax({
//        type: 'POST',
//        url: url_GetSearchConfigList,
//        dataType: 'json',

//        //'MDTAssignmentList_LISTVIEW_LstMDTAssignment'
//        //'MDTAssignmentList_LISTVIEW_LstMDTAssignment_AgentId'

//        data: { ScreenName: screenName + "_LISTVIEW_" + fieldName },
//        async: false,
//        success: function (data) {
//            if (data != null && data.toString() != "") {
               
//                //Assign_main_DropDownData(data, screenName, ttbody, tfoot)
//                Assign_main_DropDownData(screenName);

//                $('#SortSearchDiv_' + screenName + '_' + fldName + '').show();
               
//                $('#SearchDiv_' + screenName + '_' + fldName + '').show();
              
//                AssignDropDownData(data, screenName + '_' + fldName, ttbody, tfoot)
//                var dats = data;
//                data = data;
//            }

//        }
//    });
  
//    var qry = "select * from SortConfig where  ScreenName = '" + screenName + "_LISTVIEW_" + fieldName + "'   order by displayno";
//    execute(qry);
//    var data = executeQry;


//    if (data != null && data.toString() != "") {
//        AssignSortDropDownData(data, screenName, ttbody, tfoot)
//        $('#SortSearchDiv_' + screenName + '_' + fldName + '').show();
//        $('#SortDiv_' + screenName + '_' + fldName + '').show();

//    }

//}



//function Assign_main_DropDownData(screenName) {
//    _searchControl = {};
//    _searchControl1 = {};
//    var searchobj = {};

//    alert(screenName);

//    //var qry =  "select * from SearchConfig where  ScreenName = '" + ScreenName + "'   order by displayno";
//    //execute(qry);
//    //var data = executeQry;


//    //$('#SearchFieldId_' + screenName + '').empty();
//    //var valueText = '';
//    //valueText += "<option value=" + 0 + ">Select</option>";
//    //for (var i = 0; i < data.length; i++) {
//    //    searchobj.FieldControl = data[i].FieldControl;
//    //    searchobj.SearchControl = data[i].SearchControl;

//    //    _searchControl1[data[i].FieldName] = searchobj;
//    //    _searchControl[data[i].FieldName] = data[i].SearchControl;
//    //    valueText += "<option value=" + data[i].FieldName + ">" + data[i].NewText + "</option>";
//    //}
//    //$(valueText).appendTo('#SearchFieldId_' + screenName + '');
//}


function GetSearchConfig(screenName, fieldName, ttbody, tfoot) {
    fldName = fieldName;
    // COMMENTED 17.09.2020 ===============================================================
    $.ajax({
        type: 'POST',
        url: url_GetSearchConfigList,
        dataType: 'json',

        //'MDTAssignmentList_LISTVIEW_LstMDTAssignment'
        //'MDTAssignmentList_LISTVIEW_LstMDTAssignment_AgentId'


        data: { ScreenName: screenName + "_LISTVIEW_" + fieldName },
        async: false,
        success: function (data) {
            if (data != null && data.toString() != "") {
                //$('#SearchDiv_' + screenName + '').show();
                alert('I ' + screenName);
                alert('I ' + '#SearchFieldId_' + screenName + '');
                AssignDropDownData(data, screenName, ttbody, tfoot)
                $('#SortSearchDiv_' + screenName + '_' + fldName + '').show();
                //document.getElementById('SortSearchDiv_' + screenName + '_' + fldName + '').style.display = "block";
                $('#SearchDiv_' + screenName + '_' + fldName + '').show();
                alert('II ' + screenName + '_' + fldName);
                alert('II ' + '#SearchFieldId_' + screenName + '_' + fldName);
                AssignDropDownData(data, screenName + '_' + fldName, ttbody, tfoot)
                var dats = data;
                data = data;
            }
           
        }
    });
    //// COMMENTED 17.09.2020 ===============================================================
    //var o_ScreenName = screenName + "_LISTVIEW_" + fieldName;
    //var qry = "select * from SearchConfig where  ScreenName = '" + o_ScreenName + "'   order by displayno";
    //execute(qry);
    //var data = executeQry;


    //if (data != null && data.toString() != "") {
    //        AssignDropDownData(data, screenName, ttbody, tfoot)
    //        $('#SortSearchDiv_' + screenName + '_' + fldName + '').show();
    //        $('#SearchDiv_' + screenName + '_' + fldName + '').show();
    //}

    //var o_ScreenName = screenName + "_LISTVIEW_" + fieldName;
    //var qry = "select * from SortConfig where  ScreenName = '" + screenName + "_LISTVIEW_" + fieldName + "'   order by displayno";
    //execute(qry);
    //var data = executeQry;


    //if (data != null && data.toString() != "") {
    //    AssignSortDropDownData(data, screenName, ttbody, tfoot)
    //    $('#SortSearchDiv_' + screenName + '_' + fldName + '').show();
    //    $('#SortDiv_' + screenName + '_' + fldName + '').show();

    //}
    //// ===========================================================

    var qry = "select * from SortConfig where  ScreenName = '" + screenName + "_LISTVIEW_" + fieldName + "'   order by displayno";
    execute(qry);
    var data = executeQry;


    if (data != null && data.toString() != "") {
        AssignSortDropDownData(data, screenName, ttbody, tfoot)
        $('#SortSearchDiv_' + screenName + '_' + fldName + '').show();
        $('#SortDiv_' + screenName + '_' + fldName + '').show();
        
    }
  
}

var _searchControl = {};
var _searchControl1 = {};

function AssignDropDownData(data, screenName, ttbody, tfoot) {
    _searchControl = {};
    _searchControl1 = {};
    var searchobj = {};

    ////if ($('#SearchFieldId_' + screenName + '').length > 1) return;
    //if (document.getElementById('SearchFieldId_' + screenName + '') != null && document.getElementById('SearchFieldId_' + screenName + '') != undefined)
    //{
    //    if (document.getElementById('SearchFieldId_' + screenName + '').length > 0)
    //    {
    //        //alert('SearchFieldId_' + screenName + '');
    //        return;
    //    } 
    //}
    

    $('#SearchFieldId_' + screenName + '').empty();
    var valueText = '';
    valueText += "<option value=" + 0 + ">Select</option>";
    for (var i = 0; i < data.length; i++) {
        searchobj.FieldControl = data[i].FieldControl;
        searchobj.SearchControl = data[i].SearchControl;

        _searchControl1[data[i].FieldName] = searchobj;
        _searchControl[data[i].FieldName] = data[i].SearchControl;
        valueText += "<option value=" + data[i].FieldName + ">" + data[i].NewText + "</option>";
    }
    $(valueText).appendTo('#SearchFieldId_' + screenName + '');
}


function AssignSortDropDownData(data, screenName, ttbody, tfoot) {
    _searchControl = {};
    _searchControl1 = {};
    var searchobj = {};
    var searchitems = {};
    search_Data = [];

    $('#SortFieldId_' + screenName + '').empty();
    var valueText = '';
    valueText += "<option value=" + 0 + ">Select</option>";
    for (var i = 0; i < data.length; i++) {
        searchobj.FieldControl = data[i].FieldControl;
        searchobj.SearchControl = data[i].SearchControl;

        _searchControl1[data[i].FieldName] = searchobj;
        _searchControl[data[i].FieldName] = data[i].SearchControl;

        searchitems = {};

        searchitems.ScreenName = data[i].ScreenName;
        searchitems.FieldName = data[i].FieldName;
        searchitems.NewText = data[i].NewText;
        searchitems.SearchControl = data[i].SearchControl;

        search_Data.push(searchitems);

        valueText += "<option value=" + data[i].FieldName + ">" + data[i].NewText + "</option>";
        
    }
    $(valueText).appendTo('#SortFieldId_' + screenName + '');
}

var searchOptionArray = [];
var sortOptionArray = [];
var objSearch = {};
function EnterSearch(scrName, FieldControl, ttbody, tfoot, isDatePicker) {
    if (event.keyCode === 13 || isDatePicker == 1) {//enter button click event
        //  ListSearch(scrName);

        if ($('#SearchFieldId_' + scrName + '').val() != undefined) {
            var id = $('#SearchFieldId_' + scrName + '').val();
            //$("#" + id).trigger("focus");
            //$(this).blur();

            if (isFormLookUpClicked == true || isListLookUpClicked == true)
                //$("#Search_MaintainPlanogramImageNewForm_LeadBasePack_LeadBasePack").blur();
                $("#Search_" + scrName + "_" + id).blur();

            var value = $("#Search_" + scrName + "_" + id).val();
            var idText = $('#SearchFieldId_' + scrName + ' option:selected').text()
            TiAPIinfo('searchField Id  ---> ' + id);
            TiAPIinfo('searchField Code  ---> ' + value);
            TiAPIinfo('searchField ValueText  ---> ' + idText);
            id = id.split('_').length == 2 ? id.split('_')[1] : id;
            var isMultiSearchAdd = false;
            searchOptionArray = $.grep(searchOptionArray, function (e) {
                if (e.FieldName == id) {
                    isMultiSearchAdd = true;
                }
                return e.FieldName != id;
            });


            var html = '';
            if (searchOptionArray.length <= 0) {
                DeleteMultiSearch(id, scrName, 0, ttbody, tfoot);
                //html += '<div id="DeleteMultiple_' + id + '" style="width:50%;">';
                html += '<div id="DeleteMultiple_' + id + '"  >';
                html += '<p   >' + idText + ' : ' + value + '<span style="color:red" onclick="DeleteMultiSearch(\'' + id + '\',\'' + scrName + '\',1,\'' + ttbody + '\',\'' + tfoot + '\');"> x </span> </p>';
                html += '</div> ';

                // $(html).appendTo('#SearchMultiListAdd_' + currentScreenName + '_' + FieldName);
                $(html).appendTo('#SearchMultiListAdd_' + CurrentScreen_TabScreen_Name + '_' + FieldName);
            }
            else {
                if (isMultiSearchAdd == true) {
                    DeleteMultiSearch(id, scrName, 0, ttbody, tfoot);
                    isMultiSearchAdd = false;
                }
                html = '';
                //html += '<div id="DeleteMultiple_' + id + '" style="width:50%;">';
                html += '<div id="DeleteMultiple_' + id + '" >';
                html += '<p   >' + idText + ' : ' + value + '<span style="color:red" onclick="DeleteMultiSearch(\'' + id + '\',\'' + scrName + '\',1,\'' + ttbody + '\',\'' + tfoot + '\');"> x </span> </p>';
                html += '</div> ';
                //$(html).appendTo('#SearchMultiListAdd_' + currentScreenName + '_' + FieldName);
                $(html).appendTo('#SearchMultiListAdd_' + CurrentScreen_TabScreen_Name + '_' + FieldName);
            }


            //FieldControl
            objSearch = {};
            objSearch.FieldName = id;
            objSearch.SearchText = value;
            value = value.replace(/'/g, "''");

            if (isDatePicker == true)
                objSearch.SearchQuery = " and cast( " + id + " AS DATE) = '" + DateFormateChange(value) + "' ";
            else if (FieldControl == "NUMERIC")
                objSearch.SearchQuery = " and " + id + " = '" + value + "' ";
            else
                objSearch.SearchQuery = " and " + id + " like '%" + value + "%' ";
            searchOptionArray.push(objSearch);
            ListSearch(scrName, '', '', ttbody, tfoot);
        }

    }
}

function DeleteMultiSearch(id, scrName, deleteClick, ttbody, tfoot) {
    //  Search_StockTransferForm_StockRequestNo_StockOrder_StockNo
    searchOptionArray = $.grep(searchOptionArray, function (e) {
        return e.FieldName != id;
    });

    TiAPIinfo('Multisearch Remove Id    ---> ' + id);
    $('#DeleteMultiple_' + id).remove();
    if (deleteClick == 1)
        $('#' + searchSelectedId).val('');

    ListSearch(scrName, '', '', ttbody, tfoot);
}

function DeleteMultiSort(id, scrName, deleteClick, ttbody, tfoot) {
    //  Search_StockTransferForm_StockRequestNo_StockOrder_StockNo
    sortOptionArray = $.grep(sortOptionArray, function (e) {
        return e.FieldName != id;
    });

    TiAPIinfo('MultiSort Remove Id    ---> ' + id);
    $('#SortDeleteMultiple_' + id).remove();
    if (deleteClick == 1)
        $('#' + searchSelectedId).val('');

    ListSearch(scrName, '', '', ttbody, tfoot);
}

function DeleteMultiSearchevent() {
    var closebtns = document.getElementsByClassName("close");
    var i;

    for (i = 0; i < closebtns.length; i++) {
        closebtns[i].addEventListener("click", function () {
            this.parentElement.style.display = 'none';
        });
    }
}

//function SortControl(scrName, ttbody, tfoot) {
function SortControl(scrName, FieldControl, ttbody, tfoot, isDatePicker) {

    if ($('#SortFieldId_' + scrName + '').val() != undefined && $('#SortFieldId_' + scrName + '').val() != '0') {
        var id = $('#SortFieldId_' + scrName + '').val();

        var value = $("#SortId_" + scrName).val();
        var idText = $('#SortFieldId_' + scrName + ' option:selected').text()
        TiAPIinfo('searchField Id  ---> ' + id);
        TiAPIinfo('searchField Code  ---> ' + value);
        TiAPIinfo('searchField ValueText  ---> ' + idText);
        id = id.split('_').length == 2 ? id.split('_')[1] : id;
        var isMultiSortAdd = false;
        sortOptionArray = $.grep(sortOptionArray, function (e) {
            if (e.FieldName == id) {
                isMultiSortAdd = true;
            }
            return e.FieldName != id;
        });


        var html = '';
        //  html += '<a href="#">';
        // html += '<button class="btn"><i class="fa fa-trash"></i></button>';
        //  html += '</a>';
        if (sortOptionArray.length <= 0) {
            DeleteMultiSort(id, scrName, 0, ttbody, tfoot);
            //html += '<div id="DeleteMultiple_' + id + '" style="width:50%;">';
            html += '<div id="SortDeleteMultiple_' + id + '"  >';
            //html += '<p   >' + idText + ' : ' + value + '<span style="color:red;cursor:pointer" class="glyphicon glyphicon-remove-circle" onclick="DeleteMultiSort(\'' + id + '\',\'' + scrName + '\',1,\'' + ttbody + '\',\'' + tfoot + '\');"> x </span> </p>';
            html += '<p   >' + idText + ' : ' + value + ' <i style="color:red;cursor:pointer" class="fa fa-trash"  onclick="DeleteMultiSort(\'' + id + '\',\'' + scrName + '\',1,\'' + ttbody + '\',\'' + tfoot + '\');"></i>  </p>';
            html += '</div> ';
            $(html).appendTo('#SortMultiListAdd_' + currentScreenName + '_' + FieldName);
        }
        else {
            if (isMultiSortAdd == true) {
                DeleteMultiSort(id, scrName, 0, ttbody, tfoot);
                isMultiSortAdd = false;
            }
            html = '';
            //html += '<div id="DeleteMultiple_' + id + '" style="width:50%;">';
            html += '<div id="SortDeleteMultiple_' + id + '" >';
            //html += '<p   >' + idText + ' : ' + value + '<span style="color:red; cursor:pointer" class="glyphicon glyphicon-remove-circle" onclick="DeleteMultiSort(\'' + id + '\',\'' + scrName + '\',1,\'' + ttbody + '\',\'' + tfoot + '\');"> x </span> </p>';
            html += '<p   >' + idText + ' : ' + value + ' <i style="color:red;cursor:pointer" class="fa fa-trash" onclick="DeleteMultiSort(\'' + id + '\',\'' + scrName + '\',1,\'' + ttbody + '\',\'' + tfoot + '\');"></i> </p>';
            html += '</div> ';
            $(html).appendTo('#SortMultiListAdd_' + currentScreenName + '_' + FieldName);
        }


        // FieldControl
        objSort = {};
        objSort.FieldName = id;
        objSort.SearchText = value;

        //FieldName ASC

        ///
        var i = 0; isDatefld = 0;
        for (i = 0; i < search_Data.length; i++)
        {
            if (search_Data[i].FieldName == $('#SortFieldId_' + scrName + '').val() && search_Data[i].SearchControl.toString() == "DATEPICKER") {
                objSort.OrderByQuery = "Cast(" + search_Data[i].FieldName + " as datetime )" + " " + value;
                isDatefld = 1;
                break;
            }
        }
        if (isDatefld == 0)
        {
            objSort.OrderByQuery = $('#SortFieldId_' + scrName + '').val() + " " + value;
        }
        ///

        //objSort.OrderByQuery = $('#SortFieldId_' + scrName + '').val() + " " + value;
        sortOptionArray.push(objSort);
        ListSearch(scrName, '', '', ttbody, tfoot);
    }


}




var isDatePicker = false;
var searchSelectedId = '';
var searchSelectedId1 = '';
function SetSearchControl(screenName, ttbody, tfoot) {
    var selectedId = $('#SearchFieldId_' + screenName + '').val();
    var selectedvalue = _searchControl[selectedId];
    var selectedvalue1 = _searchControl1[selectedId];
    $('#SearchOptionId_' + screenName + '').empty();
    isDatePicker = false;
    var html = '';
    searchSelectedId = 'Search_' + screenName + '_' + selectedId + '';

    if (selectedvalue == "TEXTBOX") {
        //html = '<input type="text" id="Search_' + screenName + '_' + selectedId + '"  onclick="formTextFieldFocus(\'' + selectedId + '\');"onblur="formTextFieldLostFocus(\'' + selectedId + '\');ListSearch();"onkeyup="formTextFieldChange(\'' + selectedId + '\');" />';
        html = '<input  type="text" id="Search_' + screenName + '_' + selectedId + '"   onblur="ListSearch(\'' + screenName + '\',\'' + selectedvalue1.FieldControl + '\',\'' + '' + '\',\'' + ttbody + '\',\'' + tfoot + '\');" style="font-size: 16px;" onkeyup="EnterSearch(\'' + screenName + '\',\'' + selectedvalue1.FieldControl + '\',\'' + ttbody + '\',\'' + tfoot + '\');" />';
        $(html).appendTo('#SearchOptionId_' + screenName + '');
       // ListSearch(screenName, selectedvalue1.FieldControl, selectedId, ttbody, tfoot);
    }
    else if (selectedvalue == "DATEPICKER") {
        isDatePicker = true;
        //html = '<input class="datepicker" type="text" id="Search_' + screenName + '_' + selectedId + '"  onchange="FormDatePickerClicked(\'' + selectedId + '\');ListSearch();" style="font-size: 16px;" />';
        //html = '<input class="datepicker" type="text" id="Search_' + screenName + '_' + selectedId + '"  onchange="FormDatePickerClicked(\'' + selectedId + '\',\'' + selectedvalue1.FieldControl + '\',\'' + '' + '\',\'' + ttbody + '\',\'' + tfoot + '\');ListSearch(\'' + screenName + '\',\'' + selectedvalue1.FieldControl + '\',\'' + ttbody + '\',\'' + tfoot + '\');EnterSearch(\'' + screenName + '\',\'' + selectedvalue1.FieldControl + '\',\'' + ttbody + '\',\'' + tfoot + '\');"  onkeyup="EnterSearch(\'' + screenName + '\',\'' + selectedvalue1.FieldControl + '\',\'' + ttbody + '\',\'' + tfoot + '\');" style="font-size: 16px;" />';
        //html = '<input class="datepicker" type="text" id="Search_' + screenName + '_' + selectedId + '"  onchange="ListSearch(\'' + screenName + '\',\'' + selectedvalue1.FieldControl + '\',\'' + ttbody + '\',\'' + tfoot + '\');EnterSearch(\'' + screenName + '\',\'' + selectedvalue1.FieldControl + '\',\'' + ttbody + '\',\'' + tfoot + '\',1);"  onkeyup="EnterSearch(\'' + screenName + '\',\'' + selectedvalue1.FieldControl + '\',\'' + ttbody + '\',\'' + tfoot + '\');" style="font-size: 16px;" />';
        html = '<input class="searchdatepicker" type="text" id="Search_' + screenName + '_' + selectedId + '"  onchange="ListSearch(\'' + screenName + '\',\'' + selectedvalue1.FieldControl + '\',\'' + ttbody + '\',\'' + tfoot + '\');EnterSearch(\'' + screenName + '\',\'' + selectedvalue1.FieldControl + '\',\'' + ttbody + '\',\'' + tfoot + '\',1);"  onkeyup="EnterSearch(\'' + screenName + '\',\'' + selectedvalue1.FieldControl + '\',\'' + ttbody + '\',\'' + tfoot + '\');" style="font-size: 16px;" />';
        $(html).appendTo('#SearchOptionId_' + screenName + '');
        SearchDatePicker("No");
     //   ListSearch(screenName, selectedvalue1.FieldControl, selectedId, ttbody, tfoot);
    }
    else if (selectedvalue == "COMBOBOX") {
        // html = '<select id="Search_' + screenName + '_' + selectedId + '" onchange="formComboChange(\'' + selectedId + '\');ListSearch();"  style="font-size: 16px;"></select>';
        html = '<select id="Search_' + screenName + '_' + selectedId + '" onchange="ListSearch(\'' + screenName + '\',\'' + selectedvalue1.FieldControl + '\',\'' + '' + '\',\'' + ttbody + '\',\'' + tfoot + '\');"  style="font-size: 16px;"></select>';
        $(html).appendTo('#SearchOptionId_' + screenName + '');
        $.ajax({
            type: 'POST',
            url: url_GetSearchDropDownListValue,
            data: { ScreenName: screenName, id: selectedId },
            dataType: 'json',
            async: false,
            success: function (data) {
                if (data != null)
                    populateDropDown(data, 'Search_' + screenName + '_' + selectedId);
            }
        });
    }
    //else
    //    ListSearch(screenName, selectedvalue1.FieldControl, selectedId, ttbody, tfoot);


    ///
    if ($('#SearchFieldId_' + screenName + '').val() != undefined) {
        var id = $('#SearchFieldId_' + screenName + '').val();
        $.grep(searchOptionArray, function (e) {
            if (e.FieldName == id)
                $("#Search_" + screenName + "_" + id).val(e.SearchText);
        });
    }

    ////
}

function ListSearch(screenName, FieldControl, selectedId, ttbody, tfoot) {
    //screenName = CurrentScreen_TabScreen_Name;
    if ($('#SearchFieldId_' + screenName + '').val() != undefined) {
        if (isListLookUpClicked == true || isFormLookUpClicked == true) {
            var searchId = screenName;
            screenName = CurrentScreen_TabScreen_Name;
            //FormListConfigRow("ListPopUpBodyDivId", "ListPopUpfootDivId", screenName, 1, searchId.replace(screenName + '_', "") + "_" + $('#SearchFieldId_' + searchId + '').val(), FieldName, "LOOKUP");
            FormListConfigRow(ttbody, tfoot, screenName, 1, searchId.replace(screenName + '_', "") + "_" + $('#SearchFieldId_' + searchId + '').val(), FieldName, "LOOKUP");

            // ttbody, tfoot, scrName, pageNumber, SearchId, fieldName, actionType, screenFieldName
        }
        else {
            FormListConfigRow("ListBodyDivId_" + CurrentScreen_TabScreen_Name + "_" + FieldName, "ListfootDivId_" + CurrentScreen_TabScreen_Name + "_" + FieldName, screenName, 1, $('#SearchFieldId_' + screenName + '').val(), FieldName);
        }
    }
    else
        FormListConfigRow("ListBodyDivId_" + FieldName, "ListfootDivId_" + FieldName, screenName, 1, "", FieldName);

}


