var fldName = '';
var search_Data = [];

var _searchControl = {};
var _searchControl1 = {};
function GetSearchConfig(screenName, fieldName, ttbody, tfoot) {
    //-------------------------------------Log Start----------------------------------------//
    //try {
    //    var idd = $('#SearchFieldId_' + screenName + '').val();
    //    if (screenName == "SalesOrderList" && ProjectName == "POC")
    //        SearchLogString("Function Start: GetSearchConfig, Value :" + $("#Search_" + screenName + "_" + idd).val());
    //} catch (e) {

    //}
    //----------------------------------------LOg End-----------------------------------------//
    fldName = fieldName;
    // debugger;
    $.ajax({
        type: 'POST',
        url: url_GetSearchConfigList,
        dataType: 'json',
        data: { ScreenName: screenName + "_LISTVIEW_" + fieldName },
        async: false,
        success: function (data) {
            if (data != null && data.toString() != "") {
                if (screenName.toString().toLowerCase() == "mdtassignmentlist" && (ProjectName.toLowerCase() == "mm" || ProjectName.toLowerCase() == "lite")) {
                    if (fieldName.split('_').length == 2) {
                        var qry = "select * from SearchConfig where ScreenName = '" +
                            screenName + "_LISTVIEW_" + fieldName.split('_')[0] + "'   order by displayno";
                        execute(qry);
                        var data1 = executeQry;
                        AssignDropDownData(data1, screenName, ttbody, tfoot)
                    }
                    else {
                        AssignDropDownData(data, screenName, ttbody, tfoot)
                    }
                }
                else {
                    if (ProjectName.toLowerCase() == "pvmb" || ProjectName.toLowerCase() == "poc") {
                        var qry = "select * from SearchConfig where ScreenName = '" + screenName + "_LISTVIEW_" + fieldName + "' and Language=" + safeSQL(Language) + "   order by displayno";
                        execute(qry);
                        data = executeQry;
                    }
                    //Newly added by.M 23.03,2022 if logic LookUp open means not go this function - empire snapshot
                    if (tfoot.indexOf("_GenericLookUp") == -1)
                        AssignDropDownData(data, screenName, ttbody, tfoot)
                }
                $('#SortSearchDiv_' + screenName + '_' + fldName + '').show();
                //document.getElementById('SortSearchDiv_' + screenName + '_' + fldName + '').style.display = "block";
                $('#SearchDiv_' + screenName + '_' + fldName + '').show();
                AssignDropDownData(data, screenName + '_' + fldName, ttbody, tfoot)
                var dats = data;
                data = data;
            }
        }
    });
    var qry = "select * from SortConfig where  ScreenName = '" + screenName + "_LISTVIEW_" + fieldName + "'   order by displayno";
    if (ProjectName.toLowerCase() == "pvmb" || ProjectName.toLowerCase() == "poc") {
        qry = "select * from SortConfig where  ScreenName = '" + screenName + "_LISTVIEW_" + fieldName + "' and Language=" + safeSQL(Language) + "   order by displayno";
    }
    execute(qry);
    var data = executeQry;
    if (data != null && data.toString() != "") {
        AssignSortDropDownData(data, screenName, ttbody, tfoot)
        $('#SortSearchDiv_' + screenName + '_' + fldName + '').show();
        $('#SortDiv_' + screenName + '_' + fldName + '').show();
    }
    //-------------------------------------Log Start----------------------------------------//
    //try {
    //    var idd = $('#SearchFieldId_' + screenName + '').val();
    //    if (screenName == "SalesOrderList" && ProjectName == "POC")
    //        SearchLogString("Function End: GetSearchConfig, Value :" + $("#Search_" + screenName + "_" + idd).val());
    //} catch (e) {

    //}
    //----------------------------------------LOg End-----------------------------------------//
}

function AssignDropDownData(data, screenName, ttbody, tfoot) {
    //-------------------------------------Log Start----------------------------------------//
    //try {
    //    var idd = $('#SearchFieldId_' + screenName + '').val();
    //    if (screenName == "SalesOrderList" && ProjectName == "POC")
    //        SearchLogString("Function Start: AssignSortDropDownData, Value :" + $("#Search_" + screenName + "_" + idd).val());
    //} catch (e) {

    //}
    //----------------------------------------LOg End-----------------------------------------//
    var searchobj = {};
    //debugger;
    $('#SearchFieldId_' + screenName + '').empty();
    var valueText = '';
    valueText += "<option value=" + 0 + ">Select</option>";
    for (var i = 0; i < data.length; i++) {
        searchobj = {};
        searchobj.FieldControl = data[i].FieldControl;
        searchobj.SearchControl = data[i].SearchControl;
        searchobj.SearchType = data[i].SearchType;
        _searchControl1[data[i].FieldName] = searchobj;
        _searchControl[data[i].FieldName] = data[i].SearchControl;
        valueText += "<option value=" + data[i].FieldName + ">" + data[i].NewText + "</option>";
    }
    $(valueText).appendTo('#SearchFieldId_' + screenName + '');
    //-------------------------------------Log Start----------------------------------------//
    //try {
    //    var idd = $('#SearchFieldId_' + screenName + '').val();
    //    if (screenName == "SalesOrderList" && ProjectName == "POC")
    //        SearchLogString("Function End: AssignSortDropDownData, Value :" + $("#Search_" + screenName + "_" + idd).val());
    //} catch (e) {

    //}
    //----------------------------------------LOg End-----------------------------------------//
}


function AssignSortDropDownData(data, screenName, ttbody, tfoot) {

    _searchControl = {};
    _searchControl1 = {};
    var searchobj = {};
    var searchitems = {};
    search_Data = [];
    //debugger;
    $('#SortFieldId_' + screenName + '').empty();
    var valueText = '';
    valueText += "<option value=" + 0 + ">Select</option>";
    for (var i = 0; i < data.length; i++) {
        searchobj = {};
        searchobj.FieldControl = data[i].FieldControl;
        searchobj.SearchControl = data[i].SearchControl;
        searchobj.SearchType = data[i].SearchType;

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

function Arrange_SearchOption_Criteria(scrName, FieldControl, ttbody, tfoot) {
    //-------------------------------------Log Start----------------------------------------//
    try {
        var idd = $('#SearchFieldId_' + scrName + '').val();
        if (scrName == "SalesOrderList" && ProjectName == "POC")
            SearchLogString("Function Start: Arrange_SearchOption_Criteria, Value :" + $("#Search_" + scrName + "_" + idd).val());
    } catch (e) {

    }
    //----------------------------------------LOg End-----------------------------------------//
    if ($('#SearchFieldId_' + scrName + '').val() != undefined) {
        var id = $('#SearchFieldId_' + scrName + '').val();
        if (isFormLookUpClicked == true || isListLookUpClicked == true)
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
        objSearch = {};
        objSearch.FieldName = id;
        objSearch.SearchText = value;
        value = value.replace(/'/g, "''");

        if (isDatePicker == true) {
            if (ProjectName.toLowerCase().toString() == "uic") {
                // dd/MM/yyyy format
                objSearch.SearchQuery = " and " + id + " = '" + DateFormateChangeUIC(value) + "' ";
            }
            else {
                // COMMENTED 23.04.2021 
                var qry = "select DateFormatString, TimeFormatString, DateTimeFormatString from system";
                execute(qry);
                DateFormatString = executeQry[0].DateFormatString;
                objSearch.SearchQuery = " and cast( " + id + " AS DATE) = '" + DateFormateChange_Format(DateFormatString, value) + "' ";
                //objSearch.SearchQuery = " and cast( " + id + " AS DATE) = '" + DateFormateChange(value) + "' ";
            }
        }
        else if (FieldControl == "NUMERIC") {
            objSearch.SearchQuery = " and " + id + " = '" + value + "' ";
        }
        else {
            objSearch.SearchQuery = " and " + id + " like '%" + value + "%' ";
        }
        searchOptionArray.push(objSearch);
    }
    //-------------------------------------Log Start----------------------------------------//
    //try {
    //    var idd = $('#SearchFieldId_' + scrName + '').val();
    //    if (scrName == "SalesOrderList" && ProjectName == "POC")
    //        SearchLogString("Function End: Arrange_SearchOption_Criteria, Value :" + $("#Search_" + scrName + "_" + idd).val());
    //} catch (e) {

    //}
    //----------------------------------------LOg End-----------------------------------------//
}


function CaptureLog(scrName, FieldControl, ttbody, tfoot) {
    try {
        var idd = $('#SearchFieldId_' + scrName + '').val();
        if (scrName == "SalesOrderList" && ProjectName == "POC" && idd.toLowerCase() == "toteboxno")
            SearchLogString("on CHANGE: " + $("#Search_" + scrName + "_" + idd).val());
    } catch (e) {

    }
}

function CaptureLog1(scrName, FieldControl, ttbody, tfoot) {
    try {
        var idd = $('#SearchFieldId_' + scrName + '').val();
        if (scrName == "SalesOrderList" && ProjectName == "POC" && idd.toLowerCase() == "toteboxno")
            SearchLogString("on KEYUP: " + $("#Search_" + scrName + "_" + idd).val());
    } catch (e) {

    }
}

function EnterSearch(scrName, FieldControl, ttbody, tfoot, isDatePicker, iscombobox) {
    CaptureLog1(scrName, FieldControl, ttbody, tfoot);
    //-------------------------------------Log Start----------------------------------------//
    //try {
    //    var idd = $('#SearchFieldId_' + scrName + '').val();
    //    if (scrName == "SalesOrderList" && ProjectName == "POC")
    //        SearchLogString("Function Start: EnterSearch, Value :" + $("#Search_" + scrName + "_" + idd).val());
    //} catch (e) {

    //}
    //----------------------------------------LOg End-----------------------------------------//
    if (event.keyCode === 13 && isDatePicker == 2)
        isDatePicker = 1;
    if (event.keyCode === 13 || isDatePicker == 1 || iscombobox == 1) {//enter button click event
        LoadingImagePopUpOpen();
        setTimeout(function () {
        if ($('#SearchFieldId_' + scrName + '').val() != undefined) {

            var id = $('#SearchFieldId_' + scrName + '').val();

            if (FieldName === undefined) {
                var arr = [];
                arr = ttbody.split('_');
                FieldName = arr[arr.length - 1];
            }

            if (isFormLookUpClicked == true || isListLookUpClicked == true)
                $("#Search_" + scrName + "_" + id).blur();

            var value = $("#Search_" + scrName + "_" + id).val() == undefined ? "" : $("#Search_" + scrName + "_" + id).val();
            var idText = $('#SearchFieldId_' + scrName + ' option:selected').text()

            id = id.split('_').length == 2 ? id.split('_')[1] : id;
            var isMultiSearchAdd = false;
            searchOptionArray = $.grep(searchOptionArray, function (e) {
                if (e.FieldName == id) {
                    isMultiSearchAdd = true;
                }
                return e.FieldName != id;
            });

            var searchFieldControlType = $("#SearchFieldControlType_" + scrName).val();
            searchFieldControlType = searchFieldControlType == undefined ? "=" : searchFieldControlType;
            var FieldControl = _searchControl1[id].SearchType;

            var html = '';
            if (searchOptionArray.length <= 0) {
                DeleteMultiSearch(id, scrName, 0, ttbody, tfoot);
                html += '<div >';

                html += '<div id="DeleteMultiple_' + id + '"  >';
                if (iscombobox == 1) {
                    var ddvalue = $("#Search_" + scrName + "_" + id).val() == undefined ? "" : $("#Search_" + scrName + "_" + id + ' option:selected').text();
                    html += '<p   >' + idText + ' : ' + ddvalue + ' <i style="color:red;cursor:pointer" class="fa fa-trash"  onclick="DeleteMultiSearch(\'' + id + '\',\'' + scrName + '\',1,\'' + ttbody + '\',\'' + tfoot + '\');"></i> </p>';
                }
                else {
                    if (FieldControl.toLowerCase() == "numeric" || FieldControl.toLowerCase() == "date")
                        html += '<p   >' + idText + ' :' + searchFieldControlType + '  ' + value + ' <i style="color:red;cursor:pointer" class="fa fa-trash"  onclick="DeleteMultiSearch(\'' + id + '\',\'' + scrName + '\',1,\'' + ttbody + '\',\'' + tfoot + '\');"></i> </p>';
                    else
                        html += '<p   >' + idText + ' : ' + value + ' <i style="color:red;cursor:pointer" class="fa fa-trash"  onclick="DeleteMultiSearch(\'' + id + '\',\'' + scrName + '\',1,\'' + ttbody + '\',\'' + tfoot + '\');"></i> </p>';

                } html += '</div> ';
                html += '</div> ';

                if (isListLookUpClicked == true) {
                    //todo 
                    //$(html).appendTo('#SearchMultiListAdd_' + CurrentScreen_TabScreen_Name + '_' + FieldName);
                    //ffb - sales order multiselect
                    $(html).appendTo('#SearchMultiListAdd_' + scrName);

                } else {
                    if (scrName.split('_')[scrName.split('_').length - 1] == FieldName)
                        $(html).appendTo('#SearchMultiListAdd_' + scrName);
                    else
                        $(html).appendTo('#SearchMultiListAdd_' + scrName + '_' + FieldName);
                }
            }
            else {
                if (isMultiSearchAdd == true) {
                    DeleteMultiSearch(id, scrName, 0, ttbody, tfoot);
                    isMultiSearchAdd = false;
                }
                html = '';
                //html += '<div id="DeleteMultiple_' + id + '" style="width:50%;">';
                html += '<div>';
                html += '<div id="DeleteMultiple_' + id + '" >';

                if (iscombobox == 1) {
                    var ddvalue = $("#Search_" + scrName + "_" + id).val() == undefined ? "" : $("#Search_" + scrName + "_" + id + ' option:selected').text();
                    html += '<p   >' + idText + ' : ' + ddvalue + ' <i style="color:red;cursor:pointer" class="fa fa-trash"  onclick="DeleteMultiSearch(\'' + id + '\',\'' + scrName + '\',1,\'' + ttbody + '\',\'' + tfoot + '\');"></i> </p>';
                } else {
                    if (FieldControl.toLowerCase() == "numeric" || FieldControl.toLowerCase() == "date")
                        html += '<p   >' + idText + ' : ' + searchFieldControlType + '  ' + value + ' <i style="color:red;cursor:pointer" class="fa fa-trash"  onclick="DeleteMultiSearch(\'' + id + '\',\'' + scrName + '\',1,\'' + ttbody + '\',\'' + tfoot + '\');"></i> </p>';
                    else
                        html += '<p   >' + idText + ' : ' + value + ' <i style="color:red;cursor:pointer" class="fa fa-trash"  onclick="DeleteMultiSearch(\'' + id + '\',\'' + scrName + '\',1,\'' + ttbody + '\',\'' + tfoot + '\');"></i> </p>';
                    // html += '<p   >' + idText + ' : ' + value + '<span style="color:red" onclick="DeleteMultiSearch(\'' + id + '\',\'' + scrName + '\',1,\'' + ttbody + '\',\'' + tfoot + '\');"> x </span> </p>';
                }
                html += '</div> ';
                html += '</div> ';
                if (isListLookUpClicked == true)
                    $(html).appendTo('#SearchMultiListAdd_' + CurrentScreen_TabScreen_Name + '_' + FieldName);
                else {
                    if (scrName.split('_')[scrName.split('_').length - 1] == FieldName)
                        $(html).appendTo('#SearchMultiListAdd_' + scrName);
                    else
                        $(html).appendTo('#SearchMultiListAdd_' + scrName + '_' + FieldName);
                }
            }
            objSearch = {};
            objSearch.FieldName = id;
            objSearch.SearchText = value;
            value = value.replace(/'/g, "''");
            if (isDatePicker == true) {
                if (ProjectName.toLowerCase().toString() == "uic_1") {
                    // dd/MM/yyyy format //uic change to uic_1 // this is not not need by.M 22.06.2022
                    objSearch.SearchQuery = " and " + id + " = '" + DateFormateChangeUIC(value) + "' ";
                }
                else {
                    // COMMENTED 23.04.2021 
                    var qry = "select DateFormatString, TimeFormatString, DateTimeFormatString from system";
                    execute(qry);
                    DateFormatString = executeQry[0].DateFormatString;
                    if (FieldControl.toLowerCase() == "date") {
                        objSearch.SearchQuery = " and cast( " + id + " AS date) " + searchFieldControlType + " '" + DateFormateChange_Format(DateFormatString, value) + "' ";
                    }
                    else if (FieldControl.toLowerCase() == "datetime") {
                        objSearch.SearchQuery = " and cast( " + id + " AS datetime) " + searchFieldControlType + " '" + DateFormateChange_Format(DateFormatString, value) + "' ";
                    }
                    else {
                        //Format issue - this line converted to yyyy-dd-mm
                        objSearch.SearchQuery = " and cast( " + id + " AS DATE) = '" + DateFormateChange_Format(DateFormatString, value) + "' ";
                    }
                }
            }
            else if (FieldControl.toLowerCase() == "numeric") {// "NUMERIC") {
                objSearch.SearchQuery = " and " + id + " " + searchFieldControlType + " '" + value + "' ";
            }
            else {
                if (value == "")
                    objSearch.SearchQuery = " and ISNULL(" + id + ",'' ) like '' ";
                else
                    objSearch.SearchQuery = " and " + id + " like N'%" + value + "%' ";
            }
            searchOptionArray.push(objSearch);
            ListSearch(scrName, '', '', ttbody, tfoot, 0);
            }
            LoadingImagePopUpClose();
        }, 200);
    }
    //-------------------------------------Log Start----------------------------------------//
    //try {
    //    var idd = $('#SearchFieldId_' + scrName + '').val();
    //    if (scrName == "SalesOrderList" && ProjectName == "POC")
    //        SearchLogString("Function End: EnterSearch, Value :" + $("#Search_" + scrName + "_" + idd).val());
    //} catch (e) {

    //}
    //----------------------------------------LOg End-----------------------------------------//
}

function DeleteMultiSearch(id, scrName, deleteClick, ttbody, tfoot) {
    //-------------------------------------Log Start----------------------------------------//
    //try {
    //    var idd = $('#SearchFieldId_' + scrName + '').val();
    //    if (scrName == "SalesOrderList" && ProjectName == "POC")
    //        SearchLogString("Function Start: DeleteMultiSearch, Value :" + $("#Search_" + scrName + "_" + idd).val());
    //} catch (e) {

    //}
    //----------------------------------------LOg End-----------------------------------------//
    searchOptionArray = $.grep(searchOptionArray, function (e) {
        return e.FieldName != id;
    });
    TiAPIinfo('Multisearch Remove Id    ---> ' + id);
    $('#DeleteMultiple_' + id).remove();
    if (deleteClick == 1) {
        //Changes done vignesh 12/08/2024
        //$('#' + searchSelectedId).val('');
        SetSearchControl(scrName, ttbody, tfoot);
        //newly added
        if (isListLookUpClicked == true) {
            ListSearch(scrName, '', '', ttbody, tfoot);
        }
        else {
            LoadingImagePopUpOpen();
            setTimeout(function () {
                ListSearch(scrName, '', '', ttbody, tfoot);
                LoadingImagePopUpClose();
            }, 200);
        }
    }
    //-------------------------------------Log Start----------------------------------------//
    //try {
    //    var idd = $('#SearchFieldId_' + scrName + '').val();
    //    if (scrName == "SalesOrderList" && ProjectName == "POC")
    //        SearchLogString("Function End: DeleteMultiSearch, Value :" + $("#Search_" + scrName + "_" + idd).val());
    //} catch (e) {

    //}
    //----------------------------------------LOg End-----------------------------------------//
}

function DeleteMultiSort(id, scrName, deleteClick, ttbody, tfoot) {
    sortOptionArray = $.grep(sortOptionArray, function (e) {
        return e.FieldName != id;
    });
    TiAPIinfo('MultiSort Remove Id    ---> ' + id);
    $('#SortDeleteMultiple_' + id).remove();
    if (deleteClick == 1) {
        $('#' + searchSelectedId).val('');
        ListSearch(scrName, '', '', ttbody, tfoot);
    }
}

function DeleteMultiSearchevent() {
    //-------------------------------------Log Start----------------------------------------//
    //try {
    //    var idd = $('#SearchFieldId_' + screenName + '').val();
    //    if (screenName == "SalesOrderList" && ProjectName == "POC")
    //        SearchLogString("Function Start: DeleteMultiSearchevent, Value :" + $("#Search_" + screenName + "_" + idd).val());
    //} catch (e) {

    //}
    //----------------------------------------LOg End-----------------------------------------//
    var closebtns = document.getElementsByClassName("close");
    var i;

    for (i = 0; i < closebtns.length; i++) {
        closebtns[i].addEventListener("click", function () {
            this.parentElement.style.display = 'none';
        });
    }
    //-------------------------------------Log Start----------------------------------------//
    //try {
    //    var idd = $('#SearchFieldId_' + screenName + '').val();
    //    if (screenName == "SalesOrderList" && ProjectName == "POC")
    //        SearchLogString("Function End: DeleteMultiSearchevent, Value :" + $("#Search_" + screenName + "_" + idd).val());
    //} catch (e) {

    //}
    //----------------------------------------LOg End-----------------------------------------//
}

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
        if (sortOptionArray.length <= 0) {
            DeleteMultiSort(id, scrName, 0, ttbody, tfoot);
            html += '<div id="SortDeleteMultiple_' + id + '"  >';
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
            html += '<div id="SortDeleteMultiple_' + id + '" >';
            html += '<p   >' + idText + ' : ' + value + ' <i style="color:red;cursor:pointer" class="fa fa-trash" onclick="DeleteMultiSort(\'' + id + '\',\'' + scrName + '\',1,\'' + ttbody + '\',\'' + tfoot + '\');"></i> </p>';
            html += '</div> ';
            $(html).appendTo('#SortMultiListAdd_' + currentScreenName + '_' + FieldName);
        }


        // FieldControl
        objSort = {};
        objSort.FieldName = id;
        objSort.SearchText = value;
        var i = 0; isDatefld = 0;
        for (i = 0; i < search_Data.length; i++) {
            if (search_Data[i].FieldName == $('#SortFieldId_' + scrName + '').val() && search_Data[i].SearchControl.toString() == "DATEPICKER") {
                //Format issue - this line converted to yyyy-dd-mm
                //enable - newly added by.M28.01.2022 - khindlive - SO
                objSort.OrderByQuery = "Cast(" + search_Data[i].FieldName + " as datetime )" + " " + value;
                //
                //objSort.OrderByQuery = "Cast(" + search_Data[i].FieldName + " as DATE )" + " " + value;

                //Newly added by.M 30/06.2021
                //objSort.OrderByQuery = "convert(datetime, " + search_Data[i].FieldName + "  ,105 )" + " " + value;
                isDatefld = 1;
                break;
            }
        }
        if (isDatefld == 0) {
            objSort.OrderByQuery = $('#SortFieldId_' + scrName + '').val() + " " + value;
        }
        sortOptionArray.push(objSort);
        ListSearch(scrName, '', '', ttbody, tfoot);
    }
}

function numericFilter(txb) {
    txb.value = txb.value.replace(/[^\0-9]/ig, "");
}

var isDatePicker = false;
var searchSelectedId = '';
var searchSelectedId1 = '';
function SetSearchControl(screenName, ttbody, tfoot) {
    //-------------------------------------Log Start----------------------------------------//
    //try {
    //    var idd = $('#SearchFieldId_' + screenName + '').val();
    //    if (screenName == "SalesOrderList" && ProjectName == "POC")
    //        SearchLogString("Function Start: SetSearchControl, Value :" + $("#Search_" + screenName + "_" + idd).val());
    //} catch (e) {

    //}
    //----------------------------------------LOg End-----------------------------------------//
    //debugger;
    var selectedId = $('#SearchFieldId_' + screenName + '').val();
    var selectedvalue = _searchControl[selectedId];
    var selectedvalue1 = _searchControl1[selectedId];
    $('#SearchOptionId_' + screenName + '').empty();
    isDatePicker = false;
    var html = '';
    searchSelectedId = 'Search_' + screenName + '_' + selectedId + '';

    $('#SearchFieldControlType_' + screenName).hide();

    //if (ProjectName == "FGV") {
    //    document.getElementById('SearchFieldControlTypeDiv_' + screenName).style.width = "8%";
    //    document.getElementById('SearchOptionId_' + screenName).style.width = "43%";
    //}

    if (selectedvalue == "TEXTBOX") {
        if (selectedvalue1.SearchType.toLowerCase() == "numeric") {
            $('#SearchFieldControlType_' + screenName).show();
            //if (ProjectName == "FGV") {
            //    document.getElementById('SearchFieldControlTypeDiv_' + screenName).style.width = "18%";
            //    document.getElementById('SearchOptionId_' + screenName).style.width = "33%";
            //}
            /*html = '<input  type="text"  id="Search_' + screenName + '_' + selectedId + '"   onblur="ListSearch(\'' + screenName + '\',\'' + selectedvalue1.FieldControl + '\',\'' + '' + '\',\'' + ttbody + '\',\'' + tfoot + '\',1);" style="font-size: 16px;" onkeyup="numericFilter(this);EnterSearch(\'' + screenName + '\',\'' + selectedvalue1.FieldControl + '\',\'' + ttbody + '\',\'' + tfoot + '\');" />';*/
            html = '<input  type="text"  id="Search_' + screenName + '_' + selectedId + '"   style="font-size: 16px;" onkeyup="numericFilter(this);EnterSearch(\'' + screenName + '\',\'' + selectedvalue1.FieldControl + '\',\'' + ttbody + '\',\'' + tfoot + '\');" />';
        }
        else {
            /*html = '<input  type="text" id="Search_' + screenName + '_' + selectedId + '"   onblur="ListSearch(\'' + screenName + '\',\'' + selectedvalue1.FieldControl + '\',\'' + '' + '\',\'' + ttbody + '\',\'' + tfoot + '\',1);" style="font-size: 16px;" onkeyup="EnterSearch(\'' + screenName + '\',\'' + selectedvalue1.FieldControl + '\',\'' + ttbody + '\',\'' + tfoot + '\');" />';*/
            //html = '<input  type="text" id="Search_' + screenName + '_' + selectedId + '" style="font-size: 16px;" onchange="CaptureLog(\'' + screenName + '\',\'' + selectedvalue1.FieldControl + '\',\'' + ttbody + '\',\'' + tfoot + '\');" onkeyup="EnterSearch(\'' + screenName + '\',\'' + selectedvalue1.FieldControl + '\',\'' + ttbody + '\',\'' + tfoot + '\');" />';
            html = '<input  type="text" id="Search_' + screenName + '_' + selectedId + '" placeholder="&#xf002; Search" style="font-family: FontAwesome, Arial; font-style: normal;font-size: 16px;" onchange="CaptureLog(\'' + screenName + '\',\'' + selectedvalue1.FieldControl + '\',\'' + ttbody + '\',\'' + tfoot + '\');" onkeyup="EnterSearch(\'' + screenName + '\',\'' + selectedvalue1.FieldControl + '\',\'' + ttbody + '\',\'' + tfoot + '\');" />';
        }
        $(html).appendTo('#SearchOptionId_' + screenName + '');
    }
    else if (selectedvalue == "DATEPICKER") {
        if (selectedvalue1.SearchType.toLowerCase() == "date") {
            $('#SearchFieldControlType_' + screenName).show();
            if (ProjectName == "FGV") {
                document.getElementById('SearchFieldControlTypeDiv_' + screenName).style.width = "18%";
                document.getElementById('SearchOptionId_' + screenName).style.width = "33%";
            }
        }
        isDatePicker = true;
        /*html = '<input  autocomplete="off" class="searchdatepicker" type="text" id="Search_' + screenName + '_' + selectedId + '"  onchange="EnterSearch(\'' + screenName + '\',\'' + selectedvalue1.FieldControl + '\',\'' + ttbody + '\',\'' + tfoot + '\',1);"  onkeyup="EnterSearch(\'' + screenName + '\',\'' + selectedvalue1.FieldControl + '\',\'' + ttbody + '\',\'' + tfoot + '\',2);" style="font-size: 16px;" />';*/
        html = '<input  autocomplete="off" class="searchdatepicker" type="text" id="Search_' + screenName + '_' + selectedId + '"   onkeyup="EnterSearch(\'' + screenName + '\',\'' + selectedvalue1.FieldControl + '\',\'' + ttbody + '\',\'' + tfoot + '\',2);" style="font-size: 16px;background: url(../Images/cal3.png)no-repeat right;padding-right:20px;background-size:20px;border-radius:5px;" />';
        $(html).appendTo('#SearchOptionId_' + screenName + '');
        SearchDatePicker("No");
    }
    else if (selectedvalue == "COMBOBOX") {
        // COMMENTED 
        html = '<select id="Search_' + screenName + '_' + selectedId + '" onchange="EnterSearch(\'' + screenName + '\',\'' + selectedvalue1.FieldControl + '\',\'' + ttbody + '\',\'' + tfoot + '\',0,1);"  style="font-size: 16px;" ></select>';
        $(html).appendTo('#SearchOptionId_' + screenName + '');
        //newly added by.M 26.11.2021--pvm - customerrouting
        var sScreenName = screenName + '_SEARCH_COMBOBOX_' + selectedId;
        qry = getString['QueryConfig_' + sScreenName];
        qry += ' ' + getString['QueryConfig_' + sScreenName + '_GroupText'];
        qry += ' ' + getString['QueryConfig_' + sScreenName + '_OrderText'];
        qry = formatQueryString(qry, sScreenName);
        execute(qry);
        var data1 = executeQry;
        populateDropDown(data1, 'Search_' + screenName + '_' + selectedId);
    }
    else {
        html = '<input type="text" id="" placeholder="&#xf002; Search" style="font-family: FontAwesome, Arial; font-style: normal" />';
        $(html).appendTo('#SearchOptionId_' + screenName + '');
    }

    if ($('#SearchFieldId_' + screenName + '').val() != undefined) {
        var id = $('#SearchFieldId_' + screenName + '').val();
        $.grep(searchOptionArray, function (e) {
            if (e.FieldName == id)
                $("#Search_" + screenName + "_" + id).val(e.SearchText);
        });
    }
    //-------------------------------------Log Start----------------------------------------//
    //try {
    //    var idd = $('#SearchFieldId_' + screenName + '').val();
    //    if (screenName == "SalesOrderList" && ProjectName == "POC")
    //        SearchLogString("Function End: SetSearchControl, Value :" + $("#Search_" + screenName + "_" + idd).val());
    //} catch (e) {

    //}
    //----------------------------------------LOg End-----------------------------------------//
}

function ListSearch(screenName, FieldControl, selectedId, ttbody, tfoot, onblur) {
    //-------------------------------------Log Start----------------------------------------//
    //try {
    //    var idd = $('#SearchFieldId_' + screenName + '').val();
    //    if (screenName == "SalesOrderList" && ProjectName == "POC")
    //        SearchLogString("Function Start: ListSearch, Value :" + $("#Search_" + screenName + "_" + idd).val());
    //} catch (e) {

    //}
    //----------------------------------------LOg End-----------------------------------------//
    if (onblur == 1)
        return;
    if ($('#SearchFieldId_' + screenName + '').val() != undefined) {
        if (isListLookUpClicked == true) {
            var searchId = screenName;
            screenName = CurrentScreen_TabScreen_Name;
            //Changes done by vignesh on 20/08/2024
            screenName = screenName.replace("_" + FieldName, "");
            if (ListLookUpscrnName != "" && ListLookUpscrnName != CurrentScreen_TabScreen_Name) {
                screenName = ListLookUpscrnName;
                if (screenName.indexOf("_") > -1) {
                    screenName = screenName.split("_")[0];
                    //var s_id = searchId.replace(screenName + '_', "");//"Item_ItemNo_ItemNo";
                    //s_id = s_id;
                }
            }
            
            FormListConfigRow(ttbody, tfoot, screenName, 1, searchId.replace(screenName + '_', "") + "_" + $('#SearchFieldId_' + searchId + '').val(), FieldName, "LOOKUP");
        }
        else if (isFormLookUpClicked == true) {

            var searchId = screenName;
            if (screenName.split('_').length == 3)
                screenName = screenName.split('_')[0] + "_" + screenName.split('_')[1];
            else
                screenName = screenName.split('_')[0];

            FormListConfigRow(ttbody, tfoot, screenName, 1, searchId.replace(screenName + '_', "") + "_" + $('#SearchFieldId_' + searchId + '').val(), FieldName, "LOOKUP");
        }
        else {
            FormListConfigRow("ListBodyDivId_" + CurrentScreen_TabScreen_Name + "_" + FieldName, "ListfootDivId_" + CurrentScreen_TabScreen_Name + "_" + FieldName, screenName, 1, $('#SearchFieldId_' + screenName + '').val(), FieldName);
        }
    }
    else
        FormListConfigRow("ListBodyDivId_" + FieldName, "ListfootDivId_" + FieldName, screenName, 1, "", FieldName);
    //-------------------------------------Log Start----------------------------------------//
    //try {
    //    var idd = $('#SearchFieldId_' + screenName + '').val();
    //    if (screenName == "SalesOrderList" && ProjectName == "POC")
    //        SearchLogString("Function End: ListSearch, Value :" + $("#Search_" + screenName + "_" + idd).val());
    //} catch (e) {

    //}
    //----------------------------------------LOg End-----------------------------------------//
}

function SearchLogString(errorStr) {

    try {
        $.ajax({
            type: 'POST',
            url: url_WriteSearchLog,
            dataType: 'json',
            data: { msg: errorStr },
            async: false,
            success: function (data) {
                //alert(data);
            }
        });

    }
    catch (err) {
        //alert(JSON.stringify(err));
    }
}


