
var lst_prev_Theme = '';
var lst_current_Theme = '';
var selectedItem = '';
var selectedSurvey = '';
var selectedAnsNo = '';


var ArrProperties = {}; // Object
var ArrGridProperties = {}; // Object
var PageArrProperties = {}; // Object
var cboField = {}; // Object

var lastOpenQuestionControlId = '';
var lastQuestionId = '';
var tvw_lastOpenControlId = '';
var lastMovedControlId = '';

var ChecklistName = '';
var NoofScreens = 1;

var targetId = '';
var sourceId = '';
var oldctrl = ''

var currentPage = 0;
var currentPanel = "pnl_0";
var PageDetails = [];

// CONTROLS COUNT START HERE...
var questionsCnt = 0;
var noCnt = 0;
var labelCnt = 0;
var photoCnt = 0;
var datetimeCnt = 0;
var pictureCnt = 0;
var sliderCnt = 0;
var txtCnt = 0;
var listboxCnt = 0;
var checkboxCnt = 0;
var dropdownCnt = 0;
var optionboxCnt = 0;
var gridCnt = 0;
// CONTROLS COUNT ENDS HERE...

var isColumnSelection = false;
var LstGridColumnIdSelect = '';
var LstLineColumnIdSelect = '';
var LstLinkColumnIdSelect = '';
var subControlName_subTheme = '';

var Theme = [];
var subTheme = [];
var Linedata = [];
var Answer = [];
var SubAnswer = [];

var POSData = {};

var POSTheme = {};
var POSSubTheme = {};
var POSLineData = {};
var Answer = {};
var SubAnswer = {};


var arrayQuery = [];

// POSLineData for Dropdown and Listbox
var SerialNo = 1;
var isQuestionAvailable = 0;

// POSSubTheme for Grid handline
var ControlNo = 1;
var del_ctrl_id = '';


var currentResizingControlId = '';
var lastPOSITION_X = '';
var lastPOSITION_Y = '';


var lastOpenControlId = '';
var lastOpenControlName = '';

var CurrentOpenConrtrolId = '';
var CurrentOpenControlName = '';

var cboPosMapData_List = [];
var selected_SubControlName = '';

var tbl_cbo_ColumnLabelCnt = 0;


//Width	    : 384						520
//Height 	: 512						540
var deviceWIDTH_RATIO = 2.5
var deviceHEIGHT_RATIO = 1.4



//$(function () {
//    $("#btnDeleteAll").bind("click", function () {
//        //$("#ddlFruits option").remove();
//        $("#ddlFruits").html("");

//    });
//});

function dropDown_Clear(id) {
 
    $("#" + id).html("");
    //$("#" + id + " option").remove();

    //var select = document.getElementById(id);
    //if (select != null && select != undefined) {
    //    length = select.options.length;
    //    while (length--) {
    //        select.remove(length);
    //    }
    //}
}

function fill_Customer_Data(CustomerType) {
    var dropdowncust = document.getElementById("CustomerList");
    dropDown_Clear("CustomerList");
    var i = 0;
    $.ajax({
        url: url_GetCustomerListDetails,
        type: 'GET',
        dataType: 'json',
        async: false,
        data: { SearchType: CustomerType },
        success: function (results) {

            if (results != null && results != "" && results != undefined) {
                data = results.Table;
                for (var ctr = 0; ctr < data.length; ctr++) {
                    var opt = data[ctr];
                    var el = document.createElement("option");
                    el.textContent = opt.text;
                    el.value = opt.code;
                    dropdowncust.appendChild(el);
                }
            }

        },
        error: function (xhr) {
            alert('Failed. To get data please check.');
            //alert('Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' ' + xhr.responseText);
        }
    });
}




// LOOKUP DISPLAY ================================

//function Show_Lookup() {
//    var htm = '<table id="table_CustomerList" class="table table-striped table-bordered tableId">';
//    htm += '<thead id="ListPopUpHeadDivId">xsd';
//    htm += '</thead>';
//    htm += '<tbody id="ListPopUpBodyDivId">';
//    htm += '</tbody>';
//    htm += '<tfoot id="ListPopUpfootDivId">';
//    htm += '</tfoot>';
//    htm += '</table>';

//    $('#popupdialog').html(htm);

//    //FormListConfigHeader("ListPopUpHeadDivId", "ListPopUpBodyDivId", "ListPopUpfootDivId", currentScreenName, objData.fieldName, url_GetLookUpListConfig, 'LOOKUP');

//    $('#popupdialog').dialog({
//        width: "50%",
//        title: 'Details',
//        modal: true,
//    });


//}



function get_Customer_Data(inputData) {

    LoadingImagePopUpOpen();
    setTimeout(function () {
        
        var radioId = inputData.id;
        var CustomerType = "name";
        if (inputData.id.toString().toLowerCase() == "custgroup") {
            CustomerType = "group";
        }
        fill_Customer_Data(CustomerType);
        LoadingImagePopUpClose();
    }, 300);
   

}




function fill_SurveyTheme_Data(inputData) {
    var addrFromDate = DateFormateChange($('#FromDate').val());
    var addrToDate = DateFormateChange($('#ToDate').val());
    var CustomerType = "name";
    var htm = '';

    if (document.getElementById('CustGroup').checked) {
        CustomerType = "group";
    }

    var custCode = document.getElementById("CustomerList").value;

    //alert(custCode); // returns BT0108

    if ($('#FromDate').val() == '' || $('#ToDate').val() == '') {
        var alertmsg = $('#FromDate').val() == '' ? "Enter From Date" : "Enter To Date";
        //alert(alertmsg);
        var obj = {};
        obj.title = "Information";
        obj.message = alertmsg;
        showAlertMessage(obj);
        return;
    }

    $("#divlistofSurvey").empty();

    $.ajax({
        url: url_GetSurveyThemeListDetails,
        type: 'GET',
        dataType: 'json',
        async: false,
        data: { fromDate: addrFromDate, toDate: addrToDate, custType: CustomerType, custCode: custCode },
        success: function (results) {
            if (results != null && results != "" && results != undefined) {
                data = results.Table;
                for (var ctr = 0; ctr < data.length; ctr++) {
                    var id = "div_" + ctr;
                    htm = '<div id="' + id + '" onclick="TableColumnSelect(\'' + id + '\')" style="padding-top:10px;font-weight:bold;width: 100%; height: 30px;" >' + data[ctr].ThemeName + '</div>';
                    $("#divlistofSurvey").append(htm);
                }
            }
            else {
                //alert('No Survey found.');
                var obj = {};
                obj.title = "Information";
                obj.message = "No Survey found.";
                showAlertMessage(obj);
            }
        },
        error: function (xhr) {
            alert('Failed. To get data please check.');
            //alert('Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' ' + xhr.responseText);
        }
    });
}


function TableColumnSelect(id) {
    //debugger;

    lst_current_Theme = id;

    document.getElementById(id).style.backgroundColor = "blue";
    document.getElementById(id).style.color = "white";

    if (lst_prev_Theme != "" && document.getElementById(lst_prev_Theme) != null && (id.toString() != lst_prev_Theme.toString())) {
        document.getElementById(lst_prev_Theme).style.backgroundColor = "";
        document.getElementById(lst_prev_Theme).style.color = "Black";
    }

    lst_prev_Theme = lst_current_Theme;
}



function viewSurvey() {

    if (document.getElementById(lst_current_Theme) != null || document.getElementById(lst_current_Theme) != undefined) {
        selectedItem = document.getElementById(lst_current_Theme).innerHTML;

        selectedSurvey = selectedItem.split('-')[1].toString();
        selectedAnsNo = selectedItem.split('-')[0].toString();

        //alert(selectedSurvey); alert(selectedAnsNo);
        document.getElementById(lst_current_Theme).style.backgroundColor = "";
        document.getElementById(lst_current_Theme).style.color = "Black";
        document.getElementById(lst_current_Theme).style.fontWeight = "bold";
        lst_current_Theme = "";
        //alert('selected survey => ' + selectedSurvey);




        document.getElementById("Input_div").style.display = "block";
        document.getElementById("mogrify_reportbackground").style.display = "block";
        //debugger;
        prepare_Page_Loading();
    }
    else {
        alert("No survey is selected or There is no survey.");
    }


}


function prepare_Page_Loading() {
    //debugger;
    Theme = [];
    subTheme = [];
    Linedata = [];
    NoofScreens = 1;
    currentPage = 0;

    // Controls count initialized...
    questionsCnt = 0;
    noCnt = 0;
    labelCnt = 0;
    photoCnt = 0;
    datetimeCnt = 0;
    pictureCnt = 0;
    sliderCnt = 0;
    txtCnt = 0;
    listboxCnt = 0;
    checkboxCnt = 0;
    dropdownCnt = 0;
    optionboxCnt = 0;
    gridCnt = 0;

    get_data_DB();
}

function get_data_DB() {

    if (selectedSurvey != '' && selectedSurvey != null) {
        debugger;
        $.ajax({
            url: url_GetCheckListDetails,
            type: 'GET',
            dataType: 'json',
            async: false,
            data: { AnsNo: selectedAnsNo, checkListName: selectedSurvey },
            success: function (results) {
                if (results != null && results != "" && results != undefined) {
                    prepare_Data(results);
                }
            },
            error: function (xhr) {
                alert('Failed. To get data please check.');
                //alert('Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' ' + xhr.responseText);
            }
        });

    }
}


function prepare_Data(data) {
    // RETRIEVE PROCESS
    Theme = data.Theme;
    Linedata = data.Linedata;
    subTheme = data.subTheme;
    Answer = data.Answer;
    SubAnswer = data.SubAnswer;


    //      CONVERT FROM        MOBILE         TO          WEB
    //  DEVICE CALCULATION
    //Width	    : 384						520
    //Height 	: 512						540
    // DEVICE CALCULATION
    loop = 0;
    if (Theme != null && Theme != [] && Theme.length > 0) {
        for (loop = 0; loop < Theme.length; loop++) {
            Theme[loop].XPos = parseInt((Theme[loop].XPos / 384) * 520);
            Theme[loop].YPos = parseInt((Theme[loop].YPos / 512) * 540);

            Theme[loop].ControlWidth = parseInt((Theme[loop].ControlWidth / 384) * 520);
            Theme[loop].ControlHeight = parseInt((Theme[loop].ControlHeight / 512) * 540);
        }
    }


    //  HEIGHT CALCULATION  pn0

    var loop = 0;
    var pv = ''; cr = '';

    if (Theme != null && Theme != [] && Theme.length > 0) {
        for (loop = 0; loop < Theme.length; loop++) {
            //Theme[loop].YPos = parseInt(Theme[loop].YPos) - calc_Height(loop, Theme[loop].FormId);

            pv = cr;
            cr = Theme[loop].FormId.toString();
            if (pv != '' && pv != cr) {
                NoofScreens = NoofScreens + 1;
            }
            Theme[loop].FormName = "pnl_" + Theme[loop].FormName.toString().replace("pn", "");
            Theme[loop].Parent = "pnl_" + Theme[loop].FormName.toString().replace("pn", "");
        }
    }

    //debugger;
    var i;
    //var seq = 1;
    tbl_cbo_ColumnLabelCnt++;
    for (i = 0; i < Linedata.length; i++) {
        if (Linedata[i].IsLink.toString() == "true") {
            Linedata[i].CONTROL_ID = "LinkColumnId_" + tbl_cbo_ColumnLabelCnt;
        }
        else {
            Linedata[i].CONTROL_ID = "LineColumnId_" + tbl_cbo_ColumnLabelCnt;
        }
        tbl_cbo_ColumnLabelCnt += 1;
    }

    pageLoading(0);

}


function pageLoading(pageNumber) {
    //debugger;
    var loop = 0;
    var i = 0;
    var innloop = 0;
    var htm = '';
    //debugger;

    HTMLContent = '';
    $("#TestId").empty();
    $("#treeview").empty();
    isQuestionAvailable = 0;
    for (i = 0; i < Theme.length; i++) {
        if (Theme[i].FormId.toString() == pageNumber.toString()) {
            var ctrltype = Theme[i].ControlType.toString().toLowerCase();
            switch (ctrltype) {
                case 'numerictextbox':
                    NumberBoxEvent(Theme[i].ControlName.toString());
                    break;
                case 'datetime':
                    DateTimeEvent(Theme[i].ControlName.toString());
                    break;
                case 'picture':
                    PictureEvent(Theme[i].ControlName.toString());
                    break;
                case 'slider':
                    SliderEvent(Theme[i].ControlName.toString());
                    break;
                case 'photo':
                    PhotoEvent(Theme[i].ControlName.toString());
                    break;
                case 'label':
                    labelEvent(Theme[i].ControlName.toString());
                    break;
                case 'question':
                    QuestionsEvent(Theme[i].ControlName.toString());
                    break;
                case 'textbox':
                    textBoxEvent(Theme[i].ControlName.toString());
                    break;
                case 'listbox':
                    ListBoxEvent(Theme[i].ControlName.toString());
                    break;
                case 'checkbox':
                    CheckBoxEvent(Theme[i].ControlName.toString());
                    break;
                case 'combobox':
                    DropDownEvent(Theme[i].ControlName.toString());
                    break;
                case 'radiobutton':
                    OptionButtonEvent(Theme[i].ControlName.toString());
                    break;
                case 'datagrid':
                    GridEvent(Theme[i].ControlName.toString());
                    break;
                default:
            }
        }
    } // Theme iteration


    Update_Answer(pageNumber);


}



function GridEvent(passedId) {
    if (!isQuestionAvailable) { alert('Question is not available!'); return; }
    $('#ColumnColletionsDivId').show();
    $('#DisplayTextId').attr('disabled', true);


    lastOpenControlName = "DataGrid";

    CurrentOpenControlName = "DataGrid";


    var id;
    if (passedId == null || passedId == undefined || passedId == '') {
        gridCnt++;
        id = currentPanel + '_DataGrid_' + gridCnt;
    }
    else {
        gridCnt++;
        id = passedId;
    }

    var htm = '';
    //class="ui-state-active"
    htm += '<div id="' + id + '" style="position:absolute;width: 200px;height: 50px;border-style: ridge;" >';
    htm += '<div  id="' + id + '_header"  style="background-color: lightblue;border: 1px solid black;height:50px;overflow:auto;" ></div>';
    htm += '<div id="' + id + '_body" style="background-color: darkgray;border: 1px solid black;height:calc(100% - 50px);overflow:auto"></div>';
    htm += '</div>';
    $("#TestId").append(htm);

    if (passedId == null || passedId == undefined || passedId == '') {
        addDataCollection(id, "DATAGRID", "DataGrid");
    }
    else {
        updateControls(id);
        //SetArrayProperties_fromDB(id);
        grid_Design_Implementation_withAnswer(id)
    }
}



function Update_Answer(pageNumber) {
    var ctrlName = '';

    try {

        for (i = 0; i < Answer.length; i++) {
            if (Answer[i].FormId.toString() == pageNumber.toString()) {
                var ctrltype = Answer[i].ControlType.toString().toLowerCase();
                ctrlName = Answer[i].ControlName.toString();
                switch (ctrltype) {

                    case 'numerictextbox':
                        // DOING NUMERIC TEXTBOX VALUE
                        document.getElementById("lbl_" + ctrlName).innerHTML = Answer[i].Value;
                        break;
                    case 'datetime':
                        // DOING DATETIME VALUE
                        break;
                    case 'picture':
                        // DOING PICTURE VALUE
                        break;
                    case 'slider':
                        // DOING SLIDER VALUE
                        break;
                    case 'photo':
                        // DOING PHOTO VALUE
                        break;
                    case 'label':
                        // DOING LABEL VALUE
                        break;
                    case 'question':
                        // DOING QUESTION VALUE
                        break;
                    case 'textbox':
                        // DOING TEXTBOX VALUE
                        document.getElementById("lbl_" + ctrlName).innerHTML = Answer[i].Value;
                        break;
                    case 'listbox':
                        // DOING LISTBOX VALUE
                        break;
                    case 'checkbox':
                        // DOING CHECKBOX VALUE
                        document.getElementById(ctrlName).checked = true;
                        break;
                    case 'combobox':
                        // DOING COMBOBOX VALUE
                        break;
                    case 'radiobutton':
                        // DOING RADIOBUTTON VALUE
                        document.getElementById("rad_" + ctrlName).checked = true;
                        break;
                    case 'datagrid':
                        // DOING DATAGRID VALUE

                        break;
                    default:
                }
            }
        } // Theme iteration
    }
    catch (e) {
        //alert('please check text property of control ' + ctrlid);
    }
}


function grid_Design_Implementation_withAnswer(ctrlid) {
    var html_header = '';
    var html_body = '';
    var col_array = [];
    var col_dets = {};
    var max_row_number = 0;
    var no_columns = 0;
    var temp_value = '';

    var sub_ctrl_no = 0;
    var sub_ctrl_type = '';

    var line_no = 0;
    var col_no = 0;

    try {
        //// HEADER IMPLEMENTATION 
        html_header = "<table class='mytable'><tr>"

        // 
        for (i = 0; i < subTheme.length; i++) {
            if (subTheme[i].FormId.toString() == currentPage.toString() &&
                subTheme[i].ControlName.toString().toLowerCase() == ctrlid.toString().toLowerCase()) {

                sub_ctrl_no = subTheme[i].ControlNo;
                sub_ctrl_type = subTheme[i].ControlType.toString().toLowerCase();

                html_header += "<td style='word-wrap: break-word;'>" + subTheme[i].SubControlName + "</td>";
                col_dets = {};
                col_dets.colName = subTheme[i].SubControlName;
                col_dets.colType = sub_ctrl_type;
                col_dets.colArray = [];
                var k = 0;
                var t = [];

                // ANSWER RELATED =====================================
                if (sub_ctrl_type.toLowerCase() == "fixedrows") {
                    // FIXED ROW RELATED =================================
                    for (il = 0; il < Linedata.length; il++) {
                        if (Linedata[il].FormId.toString() == currentPage.toString() &&
                            Linedata[il].ControlName.toString().toLowerCase() == ctrlid.toString().toLowerCase()
                            && Linedata[il].SubControlName.toString().toLowerCase() == col_dets.colName.toLowerCase()) {
                            t.push(Linedata[il].LineValue);
                        }
                    } // Theme iteration
                }
                else if (sub_ctrl_type.toLowerCase() == "checkbox") {

                }
                else {
                    for (al = 0; al < SubAnswer.length; al++) {
                        if (SubAnswer[al].FormId.toString() == currentPage.toString() &&
                            SubAnswer[al].ControlNo.toString().toLowerCase() == sub_ctrl_no.toString().toLowerCase()) {

                            t.push(SubAnswer[al].Value);
                        }
                    } // Theme iteration

                }


                col_dets.colArray = t;

                col_array.push(col_dets);
                no_columns += 1;
            }

        } // Theme iteration

        if (col_array.length > 0) {
            for (g = 0; g < col_array.length; g++) {
                if (col_array[g].colArray.length > max_row_number) {
                    max_row_number = col_array[g].colArray.length;
                }
            }
        }

        html_header += "</tr></table>"

        $("#" + ctrlid + "_header").append(html_header);
        //// HEADER IMPLEMENTATION 


        ////// BODY IMPLEMENTATION 
        html_body = "<table class='mytable'><tr>"
        for (row = 0; row < max_row_number; row++) {
            line_no = row + 1;

            html_body += "<tr>"
            for (col = 0; col < col_array.length; col++) {

                col_no = col + 1;

                if (col_array[col].colType == "checkbox") {
                    if (is_Checked(line_no, col_no)) {
                        html_body += "<td style='word-wrap: break-word;'> <input type='checkbox' checked ></td>";
                    }
                    else {
                        html_body += "<td style='word-wrap: break-word;'> <input type='checkbox'></td>";
                    }

                    // FIX HERE CHECKED OR NOT
                }
                else {
                    if (col_array[col].colArray[row] != null && col_array[col].colArray[row] != undefined) {
                        temp_value = col_array[col].colArray[row].toString();

                        html_body += "<td style='word-wrap: break-word;'>" + temp_value + "</td>";
                    }
                    else {
                        html_body += "<td style='word-wrap: break-word;'></td>";
                    }
                }
            } // COLUMN ITERATION 
            html_body += "</tr>"

        } // Theme iteration





        html_body += "</tr></table>"

        $("#" + ctrlid + "_body").append(html_body);
        ////// BODY IMPLEMENTATION 

    }
    catch (e) {
        console.log(e);
        //alert(e);
    }

}


function is_Checked(l, c) {
    var i;
    for (i = 0; i < SubAnswer.length; i++) {
        if (SubAnswer[i].ControlNo.toString() == c.toString() && SubAnswer[i].SerialNo.toString() == l.toString()) {
            return true;
        }
    }
    return false;
}

function matrix(rows, cols, defaultValue) {

    var arr = [];

    // Creates all lines:
    for (var i = 0; i < rows; i++) {

        // Creates an empty line
        arr.push([]);

        // Adds cols to the empty line:
        arr[i].push(new Array(cols));

        for (var j = 0; j < cols; j++) {
            // Initializes:
            arr[i][j] = defaultValue;
        }
    }

    return arr;
}





function back_InputPage() {
    document.getElementById("Input_div").style.display = "block";
    document.getElementById("mogrify_reportbackground").style.display = "none";
    //fill_Customer_Data("by_Customer_Name");
}




// PAGE NOVIGATION ==================================================================
var PageNoCount = 1;
var TestDivValue = '';


function prev_next_Buttons_State() {
    var loop;
    for (loop = 0; loop < NoofScreens; loop++) {
        PageDetails[loop] = "";
    }
}

function getPrevNext_ButtonState() {
    if (currentPage == 0) {
        $('#PrevWindowButtonId').attr('disabled', true);
    }
    else {
        $('#PrevWindowButtonId').attr('disabled', false);
    }

    if (currentPage == (NoofScreens - 1)) {
        $('#NextWindowButtonId').attr('disabled', true);
    }
    else {
        $('#NextWindowButtonId').attr('disabled', false);
    }
}

function NextWindowEvent() {
    //debugger;

    //COMMENTED BY ME 19.05.2021 ====
    //update_Xpos_Ypos(currentPage);
    if (currentPage < (NoofScreens - 1)) {
        currentPage++;
        currentPanel = "pnl_" + currentPage;
        pageLoading(currentPage);
    }
}
function PrevWindowEvent() {
    //debugger;

    //COMMENTED BY ME 19.05.2021 ====
    //update_Xpos_Ypos(currentPage);
    if (currentPage > 0) {
        currentPage--;
        currentPanel = "pnl_" + currentPage;
        pageLoading(currentPage);
    }

}




function update_Xpos_Ypos(pageNumber) {
    var loop = 0;
    var no = 0;
    var i = 0;
    for (i = 0; i < Theme.length; i++) {
        if (Theme[i].FormId.toString() == pageNumber.toString()) {
            var ctrltype = Theme[i].ControlType.toString().toLowerCase();
            switch (ctrltype) {
                case 'numerictextbox':
                case 'datetime':
                case 'picture':
                case 'slider':
                case 'photo':
                case 'label':
                case 'question':
                case 'textbox':
                case 'listbox':
                case 'checkbox':
                case 'combobox':
                case 'radiobutton':
                case 'datagrid':
                    Theme[i].XPos = document.getElementById(Theme[i].ControlName).style.left.replace("px", "");
                    Theme[i].YPos = document.getElementById(Theme[i].ControlName).style.top.replace("px", "");

                    if (Theme[i].XPos == "" || Theme[i].XPos == 'undefined' || Theme[i].XPos == null || Theme[i].XPos == 'null' || Theme[i].XPos == '0') {
                        Theme[i].XPos = 0;
                    }
                    if (Theme[i].YPos == "" || Theme[i].YPos == 'undefined' || Theme[i].YPos == null || Theme[i].YPos == 'null' || Theme[i].YPos == '0') {
                        Theme[i].YPos = 0;
                    }

                    break;
                default:
            }
        }
    } // Theme iteration
}


// PAGE NOVIGATION ==================================================================


function QuestionsEvent(passedId) {
    var id;
    //debugger;
    isQuestionAvailable = 1;

    if (passedId == null || passedId == undefined || passedId == '') {
        questionsCnt++;
        //debugger;
        var sno = sequenceNo(currentPage, "Question");
        id = currentPanel + '_Question_' + sno;
    }
    else {
        questionsCnt++;
        id = passedId;
    }

    lastOpenControlName = "Question";

    CurrentOpenControlName = "Question";

    //var htm = '<div id="' + id + '"  onclick="OpenProperties(\'' + id + '\',\'' + "Question" + '\',1);" style="position:relative;font-size:16.5px;font-family: Times New Roman" class="makeMeDraggableLabel"><p id="lbl_' + id + '">Questions</p> </div>';
    //class="ui-state-active"
    var htm = '<div id="' + id + '"  style="width: 200px;height: 50px;border-style: ridge;position:absolute;font-size:16.5px;font-family: Times New Roman" ><p id="lbl_' + id + '">Questions</p> </div>';

    $("#TestId").append(htm);

    if (passedId == null || passedId == undefined || passedId == '') {
        addDataCollection(id, "Question", "Question");
    }
    else {
        updateControls(id);
        //SetArrayProperties_fromDB(id);
    }

}

function NumberBoxEvent(passedId) {
    var id;
    if (!isQuestionAvailable) { alert('Question is not available!'); return; }
    if (passedId == null || passedId == undefined || passedId == '') {
        noCnt++;
        id = currentPanel + '_NumericTextBox_' + noCnt;
    }
    else {
        noCnt++;
        id = passedId;
    }

    lastOpenControlName = "NumericTextBox";

    CurrentOpenControlName = "NumericTextBox";


    var htm = '';
    //class="ui-state-active"
    var htm = '<div id="' + id + '" style="position:absolute; width: 200px; height: 40px; background: white; border-style: ridge;font-size:16.5px;font-family: Times New Roman"  >';
    htm += '<p id="lbl_' + id + '"></p></div>';
    $("#TestId").append(htm);

    if (passedId == null || passedId == undefined || passedId == '') {
        addDataCollection(id, "Numeric Input NUMERIC BOX", "NumericTextBox");
    }
    else {
        updateControls(id);
        //SetArrayProperties_fromDB(id);
    }


}



function labelEvent(passedId) {
    var id;
    if (!isQuestionAvailable) { alert('Question is not available!'); return; }
    if (passedId == null || passedId == undefined || passedId == '') {
        labelCnt++;
        id = currentPanel + '_Label_' + labelCnt;
    }
    else {
        labelCnt++;
        id = passedId;
    }

    lastOpenControlName = "Label";

    CurrentOpenControlName = "Label";

    var htm = '';

    //class="ui-state-active"
    htm += '<div id="' + id + '"  style="position:absolute;font-size:16.5px;left:0px;top:0px;font-family: Times New Roman; width: 200px;height: 50px;border-style: ridge;">';
    //htm += '<label>Label Text</label>';
    htm += '<p id="lbl_' + id + '">Label Text</p>';
    htm += '</div>';
    $("#TestId").append(htm);


    if (passedId == null || passedId == undefined || passedId == '') {
        addDataCollection(id, "Label Text LABEL", "Label");
    }
    else {
        updateControls(id);
        //SetArrayProperties_fromDB(id);
    }


}




function textBoxEvent(passedId) {
    var id;
    if (!isQuestionAvailable) { alert('Question is not available!'); return; }
    if (passedId == null || passedId == undefined || passedId == '') {
        txtCnt++;
        id = currentPanel + '_TextBox_' + txtCnt;
    }
    else {
        txtCnt++;
        id = passedId;
    }
    lastOpenControlName = "TextBox";

    CurrentOpenControlName = "TextBox";

    var htm = '';
    //class="ui-state-active"
    var htm = '<div id="' + id + '" style="position:absolute;font-size:16.5px;width: 200px; height: 40px; background: white; border-style: ridge;"  >';
    htm += '<p id="lbl_' + id + '">Text</p></div>';
    $("#TestId").append(htm);

    if (passedId == null || passedId == undefined || passedId == '') {
        addDataCollection(id, "Text Input TEXTBOX", "TextBox");
    }
    else {
        updateControls(id);
        //SetArrayProperties_fromDB(id);
    }


}


function PhotoEvent(passedId) {
    var id;
    if (!isQuestionAvailable) { alert('Question is not available!'); return; }
    if (passedId == null || passedId == undefined || passedId == '') {
        photoCnt++;
        id = currentPanel + '_Photo_' + photoCnt;
    }
    else {
        photoCnt++;
        id = passedId;
    }

    lastOpenControlName = "photo";

    CurrentOpenControlName = "photo";
    var htm = '';
    //class="ui-state-active"
    var htm = '<div id="' + id + '" style="position:absolute;font-size:16.5px;font-family: Times New Roman;width: 75px; height: 75px; background: lightgray; border: 1px solid black;"  >';
    htm += '</div>';
    $("#TestId").append(htm);

    if (passedId == null || passedId == undefined || passedId == '') {
        addDataCollection(id, "Photo Input PHOTO BOX", "photo");
    }
    else {
        updateControls(id);
        //SetArrayProperties_fromDB(id);
    }


}





function DateTimeEvent(passedId) {
    var id;
    if (!isQuestionAvailable) { alert('Question is not available!'); return; }
    if (passedId == null || passedId == undefined || passedId == '') {
        datetimeCnt++;
        id = currentPanel + '_DateTime_' + datetimeCnt;
    }
    else {
        datetimeCnt++;
        id = passedId;
    }
    lastOpenControlName = "DateTime";

    CurrentOpenControlName = "DateTime";

    var htm = '';
    //class="ui-state-active"
    var htm = '<div id="' + id + '" disabled style="position:absolute;font-size:16.5px;font-family: Times New Roman;width: 200px; height: 35px; background: white; border-style: ridge;"  >';
    htm += '<p id="lbl_' + id + '"></p></div>';
    $("#TestId").append(htm);

    setCaption(id);
    if (passedId == null || passedId == undefined || passedId == '') {
        addDataCollection(id, "DateTime Input DATETIME BOX", "DateTime");
    }
    else {
        updateControls(id);
        //SetArrayProperties_fromDB(id);
    }


}

function setCaption(id) {
    // dd/mm/yyyy
    var d = new Date();
    var currentMonth = (parseInt(d.getMonth()) + 1);
    currentMonth = currentMonth.toString().length == 1 ? '0' + currentMonth : currentMonth;
    var currentDate = d.getDate().toString().length == 1 ? '0' + d.getDate() : d.getDate();
    var currentYear = d.getFullYear();

    var dateNowString = currentDate + '/' + currentMonth + '/' + currentYear;

    $('#lbl_' + id).text(dateNowString.toString());
}

function PictureEvent(passedId) {
    var id;
    if (!isQuestionAvailable) { alert('Question is not available!'); return; }
    if (passedId == null || passedId == undefined || passedId == '') {
        pictureCnt++;
        id = currentPanel + '_Picture_' + pictureCnt;
    }
    else {
        pictureCnt++;
        id = passedId;
    }
    lastOpenControlName = "picture";

    CurrentOpenControlName = "picture";

    //position:fixed
    //class="ui-state-active" 
    var htm = '<div id="' + id + '" style="position:absolute;font-size:16.5px;font-family: Times New Roman;width: 75px; height: 75px;  background: white;  border: 1px solid black;" >';
    htm += '</div>';
    $("#TestId").append(htm);

    if (passedId == null || passedId == undefined || passedId == '') {
        addDataCollection(id, "Picture Input PICTURE BOX", "picture");
    }
    else {
        updateControls(id);
        //SetArrayProperties_fromDB(id);
    }


}



function SliderEvent(passedId) {
    var id;
    if (!isQuestionAvailable) { alert('Question is not available!'); return; }
    if (passedId == null || passedId == undefined || passedId == '') {
        sliderCnt++;
        id = currentPanel + '_Slider_' + sliderCnt;
    }
    else {
        sliderCnt++;
        id = passedId;
    }
    lastOpenControlName = "Slider";

    CurrentOpenControlName = "Slider";
    //class="ui-state-active"
    var htm = '<div id="' + id + '" style="position:absolute;font-size:16.5px;font-family: Times New Roman;width: 65px;  height: 65px; background: white;  border: 1px solid black;"  >';
    htm += '<img  style="width:60px;height:60px;" src=\"' + url_Image_Slider + '\"/>'
    htm += '</div>';
    $("#TestId").append(htm);

    if (passedId == null || passedId == undefined || passedId == '') {
        addDataCollection(id, "Slider Input SLIDER BOX", "Slider");
    }
    else {
        updateControls(id);
        //SetArrayProperties_fromDB(id);
    }


}




function ListBoxEvent(passedId) {
    var id;
    if (!isQuestionAvailable) { alert('Question is not available!'); return; }
    if (passedId == null || passedId == undefined || passedId == '') {
        listboxCnt++;
        id = currentPanel + '_ListBox_' + listboxCnt;
    }
    else {
        listboxCnt++;
        id = passedId;
    }
    lastOpenControlName = "ListBox";

    CurrentOpenControlName = "ListBox";

    var htm = '';
    //class="ui-state-active"
    htm += '<div id="' + id + '" style="position:absolute;font-size:16.5px;font-family: Times New Roman;width: 100px; height: 100px;  background: white; border-style: ridge;" >';
    htm += '</div>';
    $("#TestId").append(htm);

    if (passedId == null || passedId == undefined || passedId == '') {
        addDataCollection(id, "LIST BOX", "ListBox");
    }
    else {
        updateControls(id);
        //SetArrayProperties_fromDB(id);
    }


}



function CheckBoxEvent(passedId) {
    var id;
    if (!isQuestionAvailable) { alert('Question is not available!'); return; }
    if (passedId == null || passedId == undefined || passedId == '') {
        checkboxCnt++;
        id = currentPanel + '_CheckBox_' + checkboxCnt;
    }
    else {
        checkboxCnt++;
        id = passedId;
    }
    lastOpenControlName = "CheckBox";

    CurrentOpenControlName = "CheckBox";

    var htm = '';
    //class="ui-state-active"
    htm += '<div id="' + id + '" style="position:absolute;width: 200px;height: 50px;border-style: ridge;" >';
    htm += '<input disabled type="checkbox"  style="width:20%;height:20px;float:left" class="custom-control-input" value="Check Box Text">';
    htm += '<label  style="font-size:16.5px;font-weight:normal;font-family: Times New Roman;margin-top:-10px;" id="chk_' + id + '"  > Check Box Text</label> ';
    htm += '</div>';
    $("#TestId").append(htm);

    if (passedId == null || passedId == undefined || passedId == '') {
        addDataCollection(id, "CHECK BOX", "CheckBox");
    }
    else {
        updateControls_chk_opt(id);
        //SetArrayProperties_fromDB(id);
    }


}




function DropDownEvent(passedId) {
    //debugger;
    var id;
    if (!isQuestionAvailable) { alert('Question is not available!'); return; }
    if (passedId == null || passedId == undefined || passedId == '') {
        dropdownCnt++;
        id = currentPanel + '_ComboBox_' + dropdownCnt;
        //RadioButton
    }
    else {
        dropdownCnt++;
        id = passedId;
    }

    lastOpenControlName = "ComboBox";

    CurrentOpenControlName = "ComboBox";
    //class="ui-state-active"
    var htm = '<div id="' + id + '" style="position:absolute;padding-top:3px;height:35px;text-align:center;font-size:16.5px;font-family: Times New Roman;width: 200px; height: 50px;  border-style: ridge;" >';
    //htm += '<select disabled style="z-index: -1;width:100%;"> </select>';
    htm += '<div style="width:80%;"></div>'
    htm += '<div style="width:20%;float:right;"><img  style="width:25px;height:25px;" src=\"' + url_Image_DropdownIcon + '\"/></div>'
    htm += '</div>';


    $("#TestId").append(htm);

    if (passedId == null || passedId == undefined || passedId == '') {
        addDataCollection(id, "COMBO BOX", "ComboBox");
    }
    else {
        updateControls(id);
        //SetArrayProperties_fromDB(id);
    }

}



function OptionButtonEvent(passedId) {
    var id;
    if (!isQuestionAvailable) { alert('Question is not available!'); return; }
    if (passedId == null || passedId == undefined || passedId == '') {
        optionboxCnt++;
        id = currentPanel + '_RadioButton_' + optionboxCnt;
    }
    else {
        optionboxCnt++;
        id = passedId;
    }

    lastOpenControlName = "RadioButton";

    CurrentOpenControlName = "RadioButton";

    var htm = '';
    //class="ui-state-active"
    htm += '<div id="' + id + '" style="position:absolute;width: 200px;height: 50px;border-style: ridge;" >';
    htm += '<input id="rad_' + id + '" disabled type="radio" name="" style="width:20%;height:20px;float:left" value="Option Button Text">';
    htm += '<label style="font-size:16.5px;font-weight:normal; font-family: Times New Roman;margin-top:-10px;" id="opt_' + id + '"  > Option Button Text</label> ';
    htm += '</div>';
    $("#TestId").append(htm);



    if (passedId == null || passedId == undefined || passedId == '') {
        addDataCollection(id, "OPTION BUTTON", "RadioButton");
    }
    else {
        updateControls_chk_opt(id);
        //SetArrayProperties_fromDB(id);
    }


}


function updateControls_chk_opt(ctrlid) {
    var loop = 0;
    var no = 0;
    var divid = ctrlid;


    for (loop = 0; loop < Theme.length; loop++) {
        if (Theme[loop].ControlName.toString() == ctrlid.toString()) {
            no = loop;
            break;
        }
    }



    //try { } catch (e) {
    //    //alert('please check text property of control ' + ctrlid);
    //}

    if (ctrlid.indexOf("Radio") > -1) {
        ctrlid = "opt_" + ctrlid;
    }
    else if (ctrlid.toString().toLowerCase().indexOf("check") > -1 || ctrlid.toString().toLowerCase().indexOf("cb") > -1) {
        ctrlid = "chk_" + ctrlid;
    }
    else {
        ctrlid = "opt_" + ctrlid;
    }
    //debugger;

    try {
        if (Theme[no].ControlText != '' && Theme[no].ControlText != 'undefined'
       && Theme[no].ControlText != null && Theme[no].ControlText != '0') {
            document.getElementById(ctrlid).innerText = Theme[no].ControlText;
        }

        if (Theme[no].FontName != '' && Theme[no].FontName != 'undefined'
           && Theme[no].FontName != null && Theme[no].FontName != '0') {
            document.getElementById(ctrlid).style.fontFamily = Theme[no].FontName;
        }

        if (Theme[no].FontSize != '' && Theme[no].FontSize != 'undefined'
           && Theme[no].FontSize != null && Theme[no].FontSize != '0') {
            document.getElementById(ctrlid).style.fontSize = Theme[no].FontSize;
        }
    } catch (e) {
        //alert('please check text property of control ' + ctrlid);
    }



    document.getElementById(divid).style.backgroundColor = Theme[no].BackColor;
    document.getElementById(divid).style.color = Theme[no].ForeColor;

    //debugger;
    if (Theme[no].XPos != '' && Theme[no].XPos != 'undefined'
       && Theme[no].XPos != null && Theme[no].XPos != '0') {
        document.getElementById(divid).style.left = Theme[no].XPos + "px";
    }

    if (Theme[no].YPos != '' && Theme[no].YPos != 'undefined'
    && Theme[no].YPos != null && Theme[no].YPos != '0') {
        document.getElementById(divid).style.top = Theme[no].YPos + "px";
    }


    if (Theme[no].ControlWidth != '' && Theme[no].ControlWidth != 'undefined'
         && Theme[no].ControlWidth != null && Theme[no].ControlWidth != '0') {
        //document.getElementById(ctrlid).style.width = Theme[no].ControlWidth + "px";
        document.getElementById(divid).style.width = Theme[no].ControlWidth + "px";
    }

    if (Theme[no].ControlHeight != '' && Theme[no].ControlHeight != 'undefined'
    && Theme[no].ControlHeight != null && Theme[no].ControlHeight != '0') {
        //document.getElementById(ctrlid).style.height = Theme[no].ControlHeight + "px";
        document.getElementById(divid).style.height = Theme[no].ControlHeight + "px";
    }

}





function updateControls(ctrlid) {
    var loop = 0;
    var no = 0;
    //debugger;
    for (loop = 0; loop < Theme.length; loop++) {
        if (Theme[loop].ControlName.toString() == ctrlid.toString()) {
            no = loop;
            break;
        }
    }
    //debugger;

    if (Theme[no].ControlText != '' && Theme[no].ControlText != 'undefined'
        && Theme[no].ControlText != null && Theme[no].ControlText != '0') {

        if (document.getElementById("lbl_" + ctrlid) != null) {
            document.getElementById("lbl_" + ctrlid).innerHTML = Theme[no].ControlText;
        }


    }

    if (Theme[no].FontName != '' && Theme[no].FontName != 'undefined'
       && Theme[no].FontName != null && Theme[no].FontName != '0') {
        document.getElementById(ctrlid).style.fontFamily = Theme[no].FontName;
    }


    if (Theme[no].FontSize != '' && Theme[no].FontSize != 'undefined'
       && Theme[no].FontSize != null && Theme[no].FontSize != '0') {
        document.getElementById(ctrlid).style.fontSize = Theme[no].FontSize;
    }

    if (ctrlid.indexOf("Grid") == -1) {
        document.getElementById(ctrlid).style.backgroundColor = Theme[no].BackColor;
        document.getElementById(ctrlid).style.color = Theme[no].ForeColor;
    }


    try {

        if (Theme[no].XPos != '' && Theme[no].XPos != 'undefined'
        && Theme[no].XPos != null && Theme[no].XPos != '0') {

            document.getElementById(ctrlid).style.left = Theme[no].XPos + "px";
        }

        if (Theme[no].YPos != '' && Theme[no].YPos != 'undefined'
        && Theme[no].YPos != null && Theme[no].YPos != '0') {

            document.getElementById(ctrlid).style.top = Theme[no].YPos + "px";
        }


        if (Theme[no].ControlWidth != '' && Theme[no].ControlWidth != 'undefined'
         && Theme[no].ControlWidth != null && Theme[no].ControlWidth != '0') {
            if (ctrlid.indexOf("Radio") > -1) {
                document.getElementById("opt_" + ctrlid).style.width = Theme[no].ControlWidth;

            }
            else if (ctrlid.indexOf("Check") > -1) {
                document.getElementById("chk_" + ctrlid).style.width = Theme[no].ControlWidth;
            }
            else {
                document.getElementById(ctrlid).style.width = Theme[no].ControlWidth + "px";
                //document.getElementById(ctrlid).clientWidth = Theme[no].ControlWidth;
            }
        }

        if (Theme[no].ControlHeight != '' && Theme[no].ControlHeight != 'undefined'
        && Theme[no].ControlHeight != null && Theme[no].ControlHeight != '0') {
            if (ctrlid.indexOf("Radio") > -1) {
                document.getElementById("opt_" + ctrlid).style.height = Theme[no].ControlHeight;

            }
            else if (ctrlid.indexOf("Check") > -1) {
                document.getElementById("chk_" + ctrlid).style.height = Theme[no].ControlHeight;
            }
            else {
                document.getElementById(ctrlid).style.height = Theme[no].ControlHeight + "px";
                //document.getElementById(ctrlid).clientHeight = Theme[no].ControlHeight;
            }
        }


        if (Theme[no].FontStyle == '0') {
            document.getElementById(ctrlid).style.fontWeight = 'normal';
            document.getElementById(ctrlid).style.fontStyle = 'normal';
            document.getElementById(ctrlid).style.textDecoration = 'none';
        }
        else if (Theme[no].FontStyle == '1') {
            document.getElementById(ctrlid).style.fontWeight = 'bold';
            document.getElementById(ctrlid).style.fontStyle = 'normal';
            document.getElementById(ctrlid).style.textDecoration = 'none';
        }
        else if (Theme[no].FontStyle == '2') {
            document.getElementById(ctrlid).style.fontWeight = 'normal';
            document.getElementById(ctrlid).style.fontStyle = 'italic';
            document.getElementById(ctrlid).style.textDecoration = 'none';
        }
        else if (Theme[no].FontStyle == '3') {
            document.getElementById(ctrlid).style.fontWeight = 'normal';
            document.getElementById(ctrlid).style.fontStyle = 'normal';
            document.getElementById(ctrlid).style.textDecoration = 'underline';
        }
    }
    catch (e) {
        //alert('please check text property of control ' + ctrlid);
    }

}




//   CONTROLS ENDS HERE... =================================================================