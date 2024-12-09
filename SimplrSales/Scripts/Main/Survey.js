var ArrProperties = {}; // Object
var ArrGridProperties = {}; // Object
var PageArrProperties = {}; // Object
var cboField = {}; // Object
//var isAlertOpen;

var lastOpenQuestionControlId = '';
var lastQuestionId = '';
var tvw_lastOpenControlId = '';
var lastMovedControlId = '';

var ChecklistName = '';
var descrip = '';
var val_active = false;

var NoofScreens = 0;

var targetId = '';
var sourceId = '';

var parent_swapId = '';
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

var POSData = {};

var POSTheme = {};
var POSSubTheme = {};
var POSLineData = {};

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

//     KEY       AND       VALUE 
//var g_obj = {
//    "pnl_0_Question_": "lbQ",
//    "pnl_0_Label_": "lbText",
//    "pnl_0_TextBox_": "tb",
//    "pnl_0_NumericTextBox_": "ntb",
//    "pnl_0_ComboBox_": "cmb",
//    "pnl_0_ListBox_": "lst",
//    "pnl_0_RadioButton_": "rb",
//    "pnl_0_CheckBox_": "cb",
//    "pnl_0_Picture_": "pnl_0_Picture_",
//    "pnl_0_DataGrid_": "sg",
//    "pnl_0_Photo_": "pnl_0_Photo_",
//    "pnl_0_DateTime_": "dt",
//    "pnl_0_Slider_": "pnl_0_Slider_"
//};

var g_obj = {
    "Question_": "lbQ",
    "Label_": "lbText",
    "TextBox_": "tb",
    "NumericTextBox_": "ntb",
    "ComboBox_": "cmb",
    "ListBox_": "lst",
    "RadioButton_": "rb",
    "CheckBox_": "cb",
    "Picture_": "pnl_0_Picture_",
    "DataGrid_": "sg",
    "Photo_": "pnl_0_Photo_",
    "DateTime_": "dt",
    "Slider_": "pnl_0_Slider_"
};

/*
-- windows ==================================
--lbQ1	Question
--sl1	Slider
--dt1	DateTime
--sg1	DataGrid
--cb1	CheckBox
--rb1	RadioButton
--lst1	ListBox
--cmb1	ComboBox
--ntb1	NumericTextBox
--tb1	TextBox
--lbText1	Label
-- windows ==================================
*/

//Width	    : 384						520
//Height 	: 512						540
var deviceWIDTH_RATIO = 2.5
var deviceHEIGHT_RATIO = 1.4

const x = 2;

var current_Active_Element = '';
var last_Active_Element = '';


var maxheight = 30;
var maxwidth = 50;

function getValue(givenKey) {
    for (var key in g_obj) {
        if (key.toString() == givenKey.toString().split('_')[2] + "_") {
            return g_obj[key];
        }
    }
}

function getKey(givenValue) {
    for (var key in g_obj) {
        if (g_obj[key].toString() == givenValue.toString()) {
            return key;
        }
    }
}

function prepare_Page_Loading() {
    //debugger;
    Theme = [];
    subTheme = [];
    Linedata = [];

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

    if (ChecklistName != '' && ChecklistName != null) {
        //debugger;
        $.ajax({
            url: url_GetCheckListDetails,
            type: 'GET',
            dataType: 'json',
            async: false,
            data: { AnsNo: "", checkListName: ChecklistName, description: descrip, active: val_active },
            success: function (results) {

                if (results != null && results != "" && results != undefined) {

                    prepare_Data(results);
                }

            },
            error: function (xhr) {
                //alert('Failed. To get data please check.');
                var obj = {};
                obj.title = "Information";
                obj.message = 'Failed. To get data please check.';
                showAlertMessage_survey(obj);
                //alert('Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' ' + xhr.responseText);
            }
        });



    }
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


}


//   CONTROLS STARTS HERE... =================================================================

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

    if (ctrlid.indexOf("Radio") > -1) {
        ctrlid = "opt_" + ctrlid;
    }
    else if (ctrlid.indexOf("Check") > -1) {
        ctrlid = "chk_" + ctrlid;
    }
    //debugger;

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
    var htm = '<div id="' + id + '"  onclick="OpenProperties(\'' + id + '\',\'' + "Question" + '\',1);" style="width: 200px;height: 50px;border-style: solid;  border-color: rgb(192, 192, 192);position:absolute;font-size:16.5px;font-family: Times New Roman" ><p id="lbl_' + id + '">Questions</p> </div>';

    $("#TestId").append(htm);

    if (passedId == null || passedId == undefined || passedId == '') {
        addDataCollection(id, "Question", "Question");
    }
    else {
        updateControls(id);
        SetArrayProperties_fromDB(id);
    }
    setInit(id, "question");
    addQuestion(id);
    lastQuestionId = id;
    //test(id);
}

function NumberBoxEvent(passedId) {
    var id;
    if (!isQuestionAvailable) {
        var obj = {};
        obj.title = "Information";
        obj.message = "Question is not available!";
        showAlertMessage_survey(obj);
        return;
    }
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
    var htm = '<div id="' + id + '" onclick="OpenProperties(\'' + id + '\',\'' + "NumericTextBox" + '\',1);" style="position:absolute; width: 200px; height: 40px; background: white; border-style: solid;  border-color: rgb(192, 192, 192);font-size:16.5px;font-family: Times New Roman"  >';
    htm += '<p id="lbl_' + id + '"></p></div>';
    $("#TestId").append(htm);

    if (passedId == null || passedId == undefined || passedId == '') {
        addDataCollection(id, "Numeric Input NUMERIC BOX", "NumericTextBox");
    }
    else {
        updateControls(id);
        SetArrayProperties_fromDB(id);
    }

    setInit(id, "numerictextbox");
    addSubItem_UnderQuestion(id, "NUMERICBOX");
}



function labelEvent(passedId) {
    var id;
    if (!isQuestionAvailable) {
        var obj = {};
        obj.title = "Information";
        obj.message = "Question is not available!";
        showAlertMessage_survey(obj);
        return;
    }
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
    htm += '<div id="' + id + '"  onclick="OpenProperties(\'' + id + '\',\'' + "Label" + '\',1);"  style="position:absolute;font-size:16.5px;left:0px;top:0px;font-family: Times New Roman; width: 200px;height: 50px;border-style: solid;  border-color: rgb(192, 192, 192);">';
    //htm += '<label>Label Text</label>';
    htm += '<p id="lbl_' + id + '">Label Text</p>';
    htm += '</div>';
    $("#TestId").append(htm);


    if (passedId == null || passedId == undefined || passedId == '') {
        addDataCollection(id, "Label Text LABEL", "Label");
    }
    else {
        updateControls(id);
        SetArrayProperties_fromDB(id);
    }

    setInit(id, "label");
    addSubItem_UnderQuestion(id, "LABEL");
}




function textBoxEvent(passedId) {
    var id;
    if (!isQuestionAvailable) {
        var obj = {};
        obj.title = "Information";
        obj.message = "Question is not available!";
        showAlertMessage_survey(obj);
        return;
    }
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
    var htm = '<div id="' + id + '" onclick="OpenProperties(\'' + id + '\',\'' + "TextBox" + '\',1);" style="position:absolute;font-size:16.5px;width: 200px; height: 40px; background: white; border-style: solid;  border-color: rgb(192, 192, 192);"  >';
    htm += '<p id="lbl_' + id + '">Text</p></div>';
    $("#TestId").append(htm);

    if (passedId == null || passedId == undefined || passedId == '') {
        addDataCollection(id, "Text Input TEXTBOX", "TextBox");
    }
    else {
        updateControls(id);
        SetArrayProperties_fromDB(id);
    }

    setInit(id, "txt");
    addSubItem_UnderQuestion(id, "TEXTBOX");
}


function PhotoEvent(passedId) {
    var id;
    if (!isQuestionAvailable) {
        var obj = {};
        obj.title = "Information";
        obj.message = "Question is not available!";
        showAlertMessage_survey(obj);
        return;
    }
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
    var htm = '<div id="' + id + '" onclick="OpenProperties(\'' + id + '\',\'' + "photo" + '\',1);" style="position:absolute;font-size:16.5px;font-family: Times New Roman;width: 75px; height: 75px; background: lightgray; border-style: solid;  border-color: rgb(192, 192, 192);"  >';
    htm += '</div>';
    $("#TestId").append(htm);

    if (passedId == null || passedId == undefined || passedId == '') {
        addDataCollection(id, "Photo Input PHOTO BOX", "photo");
    }
    else {
        updateControls(id);
        SetArrayProperties_fromDB(id);
    }

    setInit(id, "photo");
    addSubItem_UnderQuestion(id, "PHOTO");
}





function DateTimeEvent(passedId) {
    var id;
    if (!isQuestionAvailable) {
        var obj = {};
        obj.title = "Information";
        obj.message = "Question is not available!";
        showAlertMessage_survey(obj);
        return;
    }
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
    var htm = '<div id="' + id + '" disabled onclick="OpenProperties(\'' + id + '\',\'' + "DateTime" + '\',1);" style="position:absolute;font-size:16.5px;font-family: Times New Roman;width: 200px; height: 35px; background: white;border-style: solid;  border-color: rgb(192, 192, 192);"  >';
    htm += '<p id="lbl_' + id + '"></p></div>';
    $("#TestId").append(htm);

    setCaption(id);
    if (passedId == null || passedId == undefined || passedId == '') {
        addDataCollection(id, "DateTime Input DATETIME BOX", "DateTime");
    }
    else {
        updateControls(id);
        SetArrayProperties_fromDB(id);
    }

    setInit(id, "datetime");
    addSubItem_UnderQuestion(id, "DATETIME");
}


function PictureEvent(passedId) {
    var id;
    if (!isQuestionAvailable) {
        var obj = {};
        obj.title = "Information";
        obj.message = "Question is not available!";
        showAlertMessage_survey(obj);
        return;
    }
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
    var htm = '<div id="' + id + '" onclick="OpenProperties(\'' + id + '\',\'' + "picture" + '\',1);" style="position:absolute;font-size:16.5px;font-family: Times New Roman;width: 75px; height: 75px;  background: white;  border-style: solid;  border-color: rgb(192, 192, 192);" >';
    htm += '<img id = "img_' + id + '" style="width:100%;height:100%;object-fit:cover;" ></div>';
    $("#TestId").append(htm);

    if (passedId == null || passedId == undefined || passedId == '') {
        addDataCollection(id, "Picture Input PICTURE BOX", "picture");
    }
    else {
        updateControls(id);
        SetArrayProperties_fromDB(id);
    }

    setInit(id, "picture");
    addSubItem_UnderQuestion(id, "PICTURE");

    // LOAD PICTURE IF IT EXISTS 
    load_uploaded_survey_Image(id);



}


function load_uploaded_survey_Image(id) {
    var img_picture = document.getElementById("img_" + id);
    //img_picture.src = result.split("|")[0].toString();



    var no = 0;

    for (loop = 0; loop < Theme.length; loop++) {
        if (Theme[loop].ControlName.toString() == id.toString()) {
            no = loop;
            break;
        }
    }

    if (Theme[no].ControlText.toString() != null || Theme[no].ControlText.toString() != undefined || Theme[no].ControlText.toString() != '') {
        img_picture.src = "../../DeviceImages/Images/Survey/" + Theme[no].ControlText.toString();
    }



}



function SliderEvent(passedId) {
    var id;
    if (!isQuestionAvailable) {
        var obj = {};
        obj.title = "Information";
        obj.message = "Question is not available!";
        showAlertMessage_survey(obj);
        return;
    }
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
    var htm = '<div id="' + id + '" onclick="OpenProperties(\'' + id + '\',\'' + "Slider" + '\',1);" style="position:absolute;font-size:16.5px;font-family: Times New Roman;width: 65px;  height: 65px; background: white; border-style: solid;  border-color: rgb(192, 192, 192);"  >';
    htm += '<img  style="width:60px;height:60px;" src=\"' + url_Image_Slider + '\"/>'
    htm += '</div>';
    $("#TestId").append(htm);

    if (passedId == null || passedId == undefined || passedId == '') {
        addDataCollection(id, "Slider Input SLIDER BOX", "Slider");
    }
    else {
        updateControls(id);
        SetArrayProperties_fromDB(id);
    }

    setInit(id, "slider");
    addSubItem_UnderQuestion(id, "SLIDER");
}




function ListBoxEvent(passedId) {
    var id;
    if (!isQuestionAvailable) {
        var obj = {};
        obj.title = "Information";
        obj.message = "Question is not available!";
        showAlertMessage_survey(obj);
        return;
    }
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
    htm += '<div id="' + id + '"  onclick="OpenProperties(\'' + id + '\',\'' + "ListBox" + '\',1);" style="position:absolute;font-size:16.5px;font-family: Times New Roman;width: 100px; height: 100px;  background: white;border-style: solid;  border-color: rgb(192, 192, 192);" >';
    htm += '</div>';
    $("#TestId").append(htm);

    if (passedId == null || passedId == undefined || passedId == '') {
        addDataCollection(id, "LIST BOX", "ListBox");
    }
    else {
        updateControls(id);
        SetArrayProperties_fromDB(id);
    }

    setInit(id, "listbox");
    addSubItem_UnderQuestion(id, "LISTBOX");
}



function CheckBoxEvent(passedId) {
    var id;
    if (!isQuestionAvailable) {
        var obj = {};
        obj.title = "Information";
        obj.message = "Question is not available!";
        showAlertMessage_survey(obj);
        return;
    }
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
    htm += '<div id="' + id + '" style="position:absolute;width: 200px;height: 50px;border-style: solid;  border-color: rgb(192, 192, 192);" onclick="OpenProperties(\'' + id + '\',\'' + "CheckBox" + '\',1);" >';

    //Changes done by vignesh on 28102024
    //htm += '<input disabled type="checkbox"  style="width:20%;height:20px;float:left" class="custom-control-input" value="Check Box Text">';
    htm += '<input type="checkbox"  style="width:20%;height:20px;float:left" class="custom-control-input" value="Check Box Text">';
    htm += '<label  style="font-size:16.5px;font-weight:normal;font-family: Times New Roman;margin-top:-10px;" id="chk_' + id + '"  > Check Box Text</label> ';
    htm += '</div>';
    $("#TestId").append(htm);

    if (passedId == null || passedId == undefined || passedId == '') {
        addDataCollection(id, "CHECK BOX", "CheckBox");
    }
    else {
        updateControls_chk_opt(id);
        SetArrayProperties_fromDB(id);
    }

    setInit(id, "check");
    addSubItem_UnderQuestion(id, "CHECKBOX");
}




function DropDownEvent(passedId) {
    //debugger;
    var id;
    var id1;
    if (!isQuestionAvailable) {
        var obj = {};
        obj.title = "Information";
        obj.message = "Question is not available!";
        showAlertMessage_survey(obj);
        return;
    }
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
    //class="ui-state-active" //newlyadded
    var htm = '<div id="' + id + '"  onclick="OpenProperties(\'' + id + '\',\'' + "ComboBox" + '\',1);" style="overflow-y:auto;overflow-x: hidden;position:absolute;padding-top:3px;height:35px;text-align:center;font-size:16.5px;font-family: Times New Roman;width: 200px; height: 50px; border-style: solid;  border-color: rgb(192, 192, 192);" >';
    //htm += '<select disabled style="z-index: -1;width:100%;"> </select>';
    htm += '<div id="' + id + '" style="width:80%;"></div>'
    htm += '<div style="width:20%;float:right;"><img  style="width:25px;height:25px;" src=\"' + url_Image_DropdownIcon + '\"/></div>'
    htm += '</div>';


    $("#TestId").append(htm);

    if (passedId == null || passedId == undefined || passedId == '') {
        addDataCollection(id, "COMBO BOX", "ComboBox");
    }
    else {
        updateControls(id);
        SetArrayProperties_fromDB(id);
    }

    setInit(id, "combobox");
    addSubItem_UnderQuestion(id, "COMBOBOX");
}



function OptionButtonEvent(passedId) {
    var id;
    if (!isQuestionAvailable) {
        var obj = {};
        obj.title = "Information";
        obj.message = "Question is not available!";
        showAlertMessage_survey(obj);
        return;
    }
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
    htm += '<div id="' + id + '" style="position:absolute;width: 200px;height: 50px;border-style: solid;  border-color: rgb(192, 192, 192);" onclick="OpenProperties(\'' + id + '\',\'' + "RadioButton" + '\',1);" >';
    htm += '<input disabled type="radio"   name="" style="width:20%;height:20px;float:left" value="Option Button Text">';
    htm += '<label  style="font-size:16.5px;font-weight:normal; font-family: Times New Roman;margin-top:-10px;" id="opt_' + id + '"  > Option Button Text</label> ';
    htm += '</div>';
    $("#TestId").append(htm);

    if (passedId == null || passedId == undefined || passedId == '') {
        addDataCollection(id, "OPTION BUTTON", "RadioButton");
    }
    else {
        updateControls_chk_opt(id);
        SetArrayProperties_fromDB(id);
    }

    setInit(id, "radio");
    addSubItem_UnderQuestion(id, "OPTIONBUTTON");
}



function GridEvent(passedId) {
    if (!isQuestionAvailable) {
        var obj = {};
        obj.title = "Information";
        obj.message = "Question is not available!";
        showAlertMessage_survey(obj);
        return;
    }
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
    htm += '<div id="' + id + '" style="position:absolute;width: 200px;height: 50px;border-style: solid;  border-color: rgb(192, 192, 192);" onclick="OpenProperties(\'' + id + '\',\'' + "DataGrid" + '\',1);"  >';
    htm += '<div style="background-color: lightblue;border: 1px solid black;height:25px;" ></div>';
    htm += '<div style="background-color: darkgray;border: 1px solid black;height:calc(100% - 25px);overflow:auto"></div>';
    htm += '</div>';
    $("#TestId").append(htm);

    if (passedId == null || passedId == undefined || passedId == '') {
        addDataCollection(id, "DATAGRID", "DataGrid");
    }
    else {
        updateControls(id);
        SetArrayProperties_fromDB(id);
    }

    setInit(id, "grid");
    addSubItem_UnderQuestion(id, "DATAGRID");
}


//   CONTROLS ENDS HERE... =================================================================

function sequenceNo(formId, ctrlType) {
    var seqno = 0;
    var i = 0;
    var flag = 0;
    var parentQuest = '';

    if (Theme != null && Theme != [] && Theme.length > 0) {
        for (i = 0; i < Theme.length; i++) {
            if (ctrlType.toString().toUpperCase() == "QUESTION") {
                if (Theme[i].ControlType.toString().toUpperCase() == ctrlType.toString().toUpperCase()
                && Theme[i].FormId == formId) {
                    flag = 1;
                    if (Theme[i].SeqNo > seqno) {
                        // get max no
                        seqno = Theme[i].SeqNo;
                    }
                }
            }
            else {
                if (Theme[i].ControlType.toString().toUpperCase() != "QUESTION"
                && Theme[i].FormId == formId) {
                    flag = 1;
                    if (Theme[i].SeqNo > seqno) {
                        // get max no
                        seqno = Theme[i].SeqNo;
                    }
                    parentQuest = Theme[i].ParentQuestion;
                }
            }
        }
        if (flag) {
            seqno = (parseInt(seqno) + 1);
            if (ctrlType.toString().toUpperCase() != "QUESTION") {
                seqno = (seqno - parseInt(parentQuest.split('_')[3]) * 10);
            }
        }
        else {
            return "0";
        }
    }
    else {
        return "0";
    }
    return seqno.toString();
}

function addDataCollection(id, caption, ctrlTYPE) {
    // Here set default values 

    // CONTROL STRUCTURE 
    // 'pnl_0_Questions_1';

    //debugger;

    POSTheme = {};

    POSTheme.ThemeName = ChecklistName;
    descrip = descrip.replace(/(')/g, "\"");

    POSTheme.Description = descrip;
    POSTheme.Active = val_active;
    POSTheme.FormId = parseInt(id.split("_")[1]);
    POSTheme.FormName = id.split("_")[0].toString() + '_' + id.split("_")[1].toString();
    POSTheme.ControlName = id;
    //POSTheme.ControlType = id.split("_")[2].toString();
    POSTheme.ControlType = ctrlTYPE;
    // Here just assign default values
    POSTheme.XPos = 90;
    POSTheme.YPos = 24;
    POSTheme.ControlWidth = 75;
    POSTheme.ControlHeight = 13;

    POSTheme.ControlText = caption;

    if (id.indexOf("Question") == -1) {
        // NOT A QUESTION 
        POSTheme.ParentQuestion = lastOpenQuestionControlId.substring(4);
        //POSTheme.SeqNo = parseInt(lastOpenQuestionControlId.split("_")[3]) - 1;
        //POSTheme.SeqNo = "0";
        POSTheme.SeqNo = parseInt(lastQuestionId.split("_")[3]).toString() + sequenceNo(parseInt(id.split("_")[1]), POSTheme.ControlType);

    }
    else {
        // QUESTION
        POSTheme.ParentQuestion = "";
        POSTheme.SeqNo = parseInt(id.split("_")[3]);
    }

    POSTheme.BackColor = "White";
    POSTheme.ForeColor = "Black";
    POSTheme.ThemeColor = "None";
    POSTheme.FontName = document.getElementById(id).style.fontFamily //"Tahoma";
    POSTheme.FontSize = 8.25; //parseFloat(document.getElementById(id).style.fontSize.toString().replace("px", "")) 
    POSTheme.FontStyle = 0;
    POSTheme.Parent = id.split("_")[0].toString() + '_' + id.split("_")[1].toString();;
    POSTheme.Visible = 1;
    POSTheme.IsDB = 0;
    POSTheme.DBFieldCode = "";
    POSTheme.Device = "IPAD";

    Theme.push(POSTheme);

}

// TREE VIEW IMPLEMENTATION ===================================================================
function addQuestion(questionID) {
    var idValue = "tvw_" + questionID;
    var mydiv = document.getElementById("treeview");

    if (idValue.value != "") {
        var div_ele = document.createElement("div");
        var aTag = document.createElement('span');
        aTag.setAttribute('id', idValue);
        aTag.onclick = function () { Question_Identification(this); };

        aTag.ondblclick = function () { Question_Callback(this); };
        aTag.onmousedown = function () { Element_MouseDown(this); };
        aTag.onmouseup = function () { Element_MouseUp(this); };


        aTag.onmouseover = function () { Element_MouseOver(this); };
        aTag.onmouseout = function () { Element_MouseOut(this); };


        aTag.innerText = "[-] QUESTION";
        aTag.style.color = "#2B3FF7";
        aTag.style.backgroundColor = "White";
        aTag.style.fontSize = "12px";
        div_ele.setAttribute('id', "div_" + idValue);
        //border:1px solid red;
        div_ele.setAttribute("style", "padding-left: 20px;");
        // No need br Tag
        mydiv.insertBefore(div_ele, mydiv.firstChild);
        mydiv.insertBefore(aTag, mydiv.firstChild);
        lastOpenQuestionControlId = idValue;
        tvw_lastOpenControlId = '';
    }
}
function Element_MouseOver(id) {
    var ctlid = id.id;

    //indication_backcolor
    //var element = document.getElementById("myDIV");
    //element.classList.add("mystyle");

    //var element = document.getElementById("myDIV");
    //element.classList.remove("mystyle");

    document.getElementById(ctlid).style.backgroundColor = "Blue";
    document.getElementById(ctlid).style.color = "white";
    //.color = "#2B3FF7";
    //document.getElementById(ctlid).classList.add("indication_backcolor");

}
function Element_MouseOut(id) {
    var ctlid = id.id;
    document.getElementById(ctlid).style.backgroundColor = "White";
    document.getElementById(ctlid).style.color = "#2B3FF7";

    //document.getElementById(ctlid).classList.remove("indication_backcolor");

}

function sub_Element_MouseOver(id) {
    var ctlid = id.id;
    document.getElementById(ctlid).style.backgroundColor = "Blue";
    document.getElementById(ctlid).style.color = "white";

}
function sub_Element_MouseOut(id) {
    var ctlid = id.id;
    document.getElementById(ctlid).style.backgroundColor = "White";
    document.getElementById(ctlid).style.color = "black";

}

function addSubItem_UnderQuestion(elementId, elementCaption) {
    //debugger;

    // Question Div tag
    var parentdiv = document.getElementById("div_" + lastOpenQuestionControlId);


    var aTag = document.createElement('BUTTON');
    //aTag.setAttribute('id', lastOpenQuestionControlId + "_" + elementId);
    aTag.setAttribute('id', "tvw_" + elementId);
    aTag.innerText = "-" + " " + elementCaption;
    //aTag.setAttribute("style", "background-color:white;color:black;width:190px;height:25px;text-align: left; font-size: 0.6em;border: none;");
    aTag.setAttribute("style", "background-color:white;width:190px;height:25px;text-align: left; font-size: 0.6em;border: none;");
    aTag.onclick = function () { Element_Callback(this); };
    aTag.onmousedown = function () { Element_MouseDown(this); };
    aTag.onmouseup = function () { Element_MouseUp(this); };


    aTag.onmouseover = function () { sub_Element_MouseOver(this); };
    aTag.onmouseout = function () { sub_Element_MouseOut(this); };


    var brTag = document.createElement('br');
    if (tvw_lastOpenControlId == null || tvw_lastOpenControlId == '') {
        parentdiv.appendChild(aTag);
        tvw_lastOpenControlId = elementId;
    }
    else {
        var subElementDiv = document.getElementById(tvw_lastOpenControlId);
        parentdiv.insertBefore(aTag, parentdiv.firstChild);
        tvw_lastOpenControlId = elementId;
    }
}


function Element_Callback(id) {
    var tvw_ctrlid = id.id;
    var ctrlid = tvw_ctrlid.replace("tvw_", "");

    get_Identification(ctrlid, true);

    OpenProperties(ctrlid);
}


function get_Identification(ctrlid, isIndicate) {
    //debugger;
    last_Active_Element = current_Active_Element;
    current_Active_Element = ctrlid;

    var cidid = ctrlid;

    if (cidid.toString().toLowerCase().indexOf("picture") == -1) {
        $("#ImageDivId").hide();
    }
    else {
        $("#ImageDivId").show();
    }


    //if (isIndicate)
    //{
    //    document.getElementById(current_Active_Element).style.backgroundColor = "aliceBlue";
    //}

    //if (last_Active_Element != '') {
    //    document.getElementById(last_Active_Element).style.backgroundColor = "white";
    //}
    //debugger;
    var element_current = document.getElementById(current_Active_Element);
    element_current.classList.add("indication_style");
    if (last_Active_Element != '' && last_Active_Element != current_Active_Element) {
        var element_last = document.getElementById(last_Active_Element);
        if (element_last != null) {
            element_last.classList.remove("indication_style");
        }
    }

}

function Element_MouseDown(id) {

    targetId = id.id;

    if (lastMovedControlId != '') {
        if (lastMovedControlId.indexOf("Question") == -1) {
            // NOT A QUESTION
            document.getElementById(lastMovedControlId).classList.remove("change_Color");
        }
    }
}

function Element_MouseUp(id) {
    sourceId = id.id;

    //alert('target id -' + targetId);
    //alert('source id -' + sourceId);

    if (targetId.indexOf("Question") == -1) {
        document.getElementById(targetId).classList.add("change_Color");
        lastMovedControlId = targetId;
    }

    move_Element_Target_Source();

    if (targetId.indexOf("Question") > -1) {
        parent_swapId = targetId;
    }
    else {
        parent_swapId = document.getElementById(targetId).parentNode.id;
    }
    //debugger;
    //alert('parent swap');
    //alert(parent_swapId);
    update_SeqNo_ParentQuestion(parent_swapId);
}


function update_SeqNo_ParentQuestion(parent_swapId) {
    var elm = {};
    var QuesList = [];
    var ElemList = [];
    var QuesCnt = 0;
    var ElemCnt = 0;
    var cid = '';
    var inn_cid = '';
    var Qname = '';
    var Ename = '';
    var icnt = 0;

    //alert(parent_swapId);

    var inner_elms = document.getElementById(parent_swapId).getElementsByTagName("*");
    for (var i = 0; i < inner_elms.length; i++) {
        //alert(inner_elms[i].id);
        ElemCnt += 1;
    }

    //alert('cnt ' + ElemCnt);



    for (var i = 0; i < inner_elms.length; i++) {
        //      control id,    seqno,  parent question
        Ename = inner_elms[i].id.replace("tvw_", "");  //tvw_pnl_0_TextBox_1
        Qname = parent_swapId.replace("div_tvw_", "");  //pnl_0_Question_1
        //alert(Ename); alert(Qname);
        update_On_Theme(Ename, Qname.split("_")[Qname.split("_").length - 1].toString() + ElemCnt.toString(), Qname);

    }

    //inn_cid = inner_elms[i].id;
    //Ename = inn_cid.replace("tvw_", "");  //tvw_pnl_0_TextBox_1
    //update_On_Theme(Ename, Qname.split("_")[Qname.split("_").length - 1].toString() + ElemCnt.toString(), Qname);
    //ElemCnt -= 1;

    //Qname = cid.replace("div_tvw_", "");  //pnl_0_Question_1

    //var ElemCnt = document.getElementById(cid).getElementsByTagName("*").length - 1;

    //var inner_elms = document.getElementById(cid).getElementsByTagName("*");

    //for (var i = 0; i < inner_elms.length; i++) {
    //    inn_cid = inner_elms[i].id;
    //    Ename = inn_cid.replace("tvw_", "");  //tvw_pnl_0_TextBox_1
    //    update_On_Theme(Ename, Qname.split("_")[Qname.split("_").length - 1].toString() + ElemCnt.toString(), Qname);
    //    ElemCnt -= 1;
    //}

}

function update_On_Theme(_ctrl, _id, _name) {

    if (Theme != null && Theme != [] && Theme.length > 0) {
        for (loop = 0; loop < Theme.length; loop++) {
            if (Theme[loop].ControlName.toString() == _ctrl.toString()) {
                Theme[loop].SeqNo = _id;
                Theme[loop].ParentQuestion = _name;
                break;
            }
        }
    }
}


function move_Element_Target_Source() {
    //debugger;
    if (targetId == sourceId) {
        return;
    }
    var newElement;
    var mydiv = document.getElementById("treeview");
    var innerdiv = '';
    var isfound = 0;

    // REMOVE ELEMENT 
    for (var child = mydiv.firstChild; child !== null; child = child.nextSibling) {
        if (child.id.indexOf('div') > -1) {
            //alert('child element iterate');
            innerdiv = child;
            for (var child_inner = innerdiv.firstChild; child_inner !== null; child_inner = child_inner.nextSibling) {
                if (targetId == child_inner.id) {
                    newElement = child_inner;
                    innerdiv.removeChild(child_inner);
                    isfound = 1;
                    break;
                }
            }
            if (isfound == 1) break;
        }
    }
    // INSERT ELEMENT
    isfound = 0;
    //debugger;
    for (var child = mydiv.firstChild; child !== null; child = child.nextSibling) {

        if (child.id.indexOf('div') > -1) {

            //alert('child element iterate');
            innerdiv = child;

            if ("div_" + sourceId == child.id) {
                var referenceNode = child;
                if (referenceNode.firstChild != null) {
                    referenceNode.insertBefore(newElement, referenceNode.firstChild);
                }
                else {
                    referenceNode.appendChild(newElement);
                }
                break;
            }
            else {
                for (var child_inner = innerdiv.firstChild; child_inner !== null; child_inner = child_inner.nextSibling) {
                    if (sourceId == child_inner.id) {
                        // Get the reference node
                        var referenceNode = child_inner;
                        insertAfter(newElement, referenceNode);
                        isfound = 1;
                        break;
                    }
                }
            }
        }
        if (isfound == 1) break;
    }

}

// create function, it expects 2 values.
function insertAfter(newElement, targetElement) {
    // target is what you want it to go after. Look for this elements parent.
    var parent = targetElement.parentNode;

    // if the parents lastchild is the targetElement...
    if (parent.lastChild == targetElement) {
        // add the newElement after the target element.
        parent.appendChild(newElement);
    } else {
        // else the target has siblings, insert the new element between the target and it's next sibling.
        parent.insertBefore(newElement, targetElement.nextSibling);

    }
}



function Question_Identification(id) {
    var tvw_ctrlid = id.id;
    //newly added by MahalingaM 15.9.2022
    //todo
    lastOpenQuestionControlId = tvw_ctrlid;
    var ctrlid = tvw_ctrlid.replace("tvw_", "");

    get_Identification(ctrlid, true);

    OpenProperties(ctrlid);

}


function Question_Blur(id) {
    //alert(last_Active_Question);
    if (last_Active_Question != '') {
        //alert('blur' + last_Active_Question);
        document.getElementById(last_Active_Question).style.border = "none";
    }
}


function Question_Callback(id) {
    //alert(id.id);
    //alert('calling from question ');
    //debugger;
    var ctrlid = id.id;
    var question_ctrl = document.getElementById(ctrlid);
    var div_question_ctrl = document.getElementById("div_" + ctrlid);
    var question_name = document.getElementById(ctrlid).textContent;

    if (question_name.indexOf("[+]") > -1) {
        // expand
        question_ctrl.innerHTML = question_name.replace('[+]', '[-]');
        div_question_ctrl.style.display = "block";

    }
    else if (question_name.indexOf("[-]") > -1) {
        // collapse
        question_ctrl.innerHTML = question_name.replace('[-]', '[+]') + "<br>";
        div_question_ctrl.style.display = "none";
    }
}

// TREE VIEW IMPLEMENTATION ===================================================================


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



function set_Resizable(id) {


    if (Theme.length > 0) {
        for (i = 0; i < Theme.length; i++) {
            if (Theme[i].ControlName.toString() != id.toString()) {
                $(id).resizable('destroy');
                $(id).draggable('disable');

            }
        } // Theme iteration
    }



    $('#' + id).resizable
    ({

        containment: "#TestId",

    });
}
function setInit(id, ctrlname) {
    var minHeight = 30;
    var minWidth = 80;

    lastOpenControlId = id;

    $('#DisplayTextId').val($('#' + id)[0].innerText);

    //$('#' + id).draggable({
    //    containment: "#TestId"
    //}).resizable({
    $('#' + id).draggable().resizable({
        containment: "#TestId",
        resize: function (event, ui) {
        },
        stop: function (event, ui) {
            var ctrlId = $(this).context.id;
            //$("#" + ctrlId).resizable("option", "minHeight", parseInt($("#" + ctrlId).height(), 10));
            //$("#" + ctrlId).resizable("option", "minWidth", parseInt($("#" + ctrlId).width(), 10));
            var window_width = document.getElementById(ctrlId).clientWidth;
            var window_height = document.getElementById(ctrlId).clientHeight;
            //debugger;
            //alert(window_width); alert(window_height);
            ///    31 < 30
            if (window_height < minHeight) {
                window_height = minHeight;
            }

            if (window_width < minWidth) {
                window_width = minWidth;
            }


            $('#SizeHeightId').val(window_height);
            $('#SizeWidthId').val(window_width);

            //event_handler_for_size(window_width, window_height);

            event_handler_for_size_new(window_width, window_height, ctrlId);

        }
    });

    OpenProperties(id, ctrlname);

    RightClickEvent(id)

}



function event_handler_for_size_new(_WIDTH, _HEIGHT, _CTRLID) {
    // SET RESIZED 
    if (lastOpenControlName == "RadioButton") {
        var radioButtonid = _CTRLID.replace("makeMeDraggableOptionBox", "makeMeDraggableOptionBox_");
        $('#' + radioButtonid)[0].style.width = _WIDTH + "px";
    }
    else {
        document.getElementById(_CTRLID).style.width = _WIDTH + "px";
    }

    // height
    if (lastOpenControlName == "RadioButton") {
        var radioButtonid = _CTRLID.replace("makeMeDraggableOptionBox", "makeMeDraggableOptionBox_");
        $('#' + radioButtonid)[0].style.height = _HEIGHT + "px";
    }
    else {
        document.getElementById(_CTRLID).style.height = _HEIGHT + "px";
    }

    //SetArrayProperties();
    //obj.SizeXId = $('#SizeXId').val();
    //obj.SizeYId = $('#SizeYId').val();

    //obj.SizeHeightId = $('#SizeHeightId').val();
    //obj.SizeWidthId = $('#SizeWidthId').val();


    var i;
    for (i = 0; i < Theme.length; i++) {
        if (Theme[i].ControlName.toString() == _CTRLID) {

            Theme[i].ControlWidth = _WIDTH;
            Theme[i].ControlHeight = _HEIGHT;

        }
    }
}


function event_handler_for_size(_WIDTH, _HEIGHT) {
    // width
    //alert('here' + _WIDTH + _HEIGHT);
    if (lastOpenControlName == "RadioButton") {
        var radioButtonid = lastOpenControlId.replace("makeMeDraggableOptionBox", "makeMeDraggableOptionBox_");
        $('#' + radioButtonid)[0].style.width = _WIDTH + "px";
    }
    else {
        document.getElementById(lastOpenControlId).style.width = _WIDTH + "px";
    }

    // height
    if (lastOpenControlName == "RadioButton") {
        var radioButtonid = lastOpenControlId.replace("makeMeDraggableOptionBox", "makeMeDraggableOptionBox_");
        $('#' + radioButtonid)[0].style.height = _HEIGHT + "px";
    }
    else {
        document.getElementById(lastOpenControlId).style.height = _HEIGHT + "px";
    }

    SetArrayProperties();
}



function SetArrayProperties() {
    var obj = {};
    //debugger;
    obj.DisplayTextId = $('#DisplayTextId').val();
    obj.FontNameId = $('#FontNameId').val();
    obj.FontSizeId = $('#FontSizeId').val();
    obj.BoldId = $('#BoldId').is(':checked');
    obj.ItalicId = $('#ItalicId').is(':checked');
    obj.UnderlineId = $('#UnderlineId').is(':checked');

    obj.ForeColorId = $('#ForeColorId').val();
    obj.BackColorId = $('#BackColorId').val();

    obj.SizeXId = $('#SizeXId').val();
    obj.SizeYId = $('#SizeYId').val();

    obj.SizeHeightId = $('#SizeHeightId').val();
    obj.SizeWidthId = $('#SizeWidthId').val();

    obj.FontStyleId = $('#FontStyleId').val();

    ArrProperties[lastOpenControlId] = obj;

    updateDataCollection();

}


function updateDataCollection() {
    //ArrProperties[lastOpenControlId] = obj;
    var i;
    for (i = 0; i < Theme.length; i++) {
        if (Theme[i].ControlName.toString() == lastOpenControlId) {

            Theme[i].XPos = ArrProperties[lastOpenControlId].SizeXId == '' || ArrProperties[lastOpenControlId].SizeXId == undefined || ArrProperties[lastOpenControlId].SizeXId == null ? "0" : ArrProperties[lastOpenControlId].SizeXId;
            Theme[i].YPos = ArrProperties[lastOpenControlId].SizeYId == '' || ArrProperties[lastOpenControlId].SizeYId == undefined || ArrProperties[lastOpenControlId].SizeYId == null ? "0" : ArrProperties[lastOpenControlId].SizeYId;
            Theme[i].ControlWidth = ArrProperties[lastOpenControlId].SizeWidthId;
            Theme[i].ControlHeight = ArrProperties[lastOpenControlId].SizeHeightId;

            Theme[i].ControlText = ArrProperties[lastOpenControlId].DisplayTextId;
            Theme[i].BackColor = ArrProperties[lastOpenControlId].BackColorId;
            Theme[i].ForeColor = ArrProperties[lastOpenControlId].ForeColorId;
            Theme[i].FontName = ArrProperties[lastOpenControlId].FontNameId;
            //Theme[i].FontSize = ArrProperties[lastOpenControlId].FontSizeId;
            Theme[i].FontSize = ArrProperties[lastOpenControlId].FontSizeId;
            Theme[i].FontStyle = ArrProperties[lastOpenControlId].FontStyleId;
        }
    }
}



function restrictSize(ui) {

    ui.size.height = ui.size.height > maxheight ? maxheight : ui.size.height;
    ui.size.width = ui.size.width > maxwidth ? maxwidth : ui.size.width;

}



function place_element_withinDIV(id, X, Y) {
    //debugger;
    //alert('p'+id);
    $('#' + id).css({
        position: 'absolute',
        left: X + "px",
        top: Y + "px",
    });
}



function RightClickEvent(id) {
    //debugger;
    var eventId = document.getElementById(id);
    eventId.addEventListener("contextmenu", function (event) {
        $('#RightClickmenu').show();
        del_ctrl_id = id;
        var posX = event.clientX;
        var posY = event.clientY;
        menu(posX, posY);
        event.preventDefault();
    }, false);
    eventId.addEventListener("click", function (event) {
        $('#RightClickmenu').hide();

        var ctxMenu = document.getElementById("RightClickmenu");
        ctxMenu.style.display = "";
        ctxMenu.style.left = "";
        ctxMenu.style.top = "";
    }, false);
}

function RemoveControls() {
    $('#RightClickmenu').hide();

    //Theme.splice(Theme.indexOf(del_ctrl_id), 1);
    Theme.forEach(function (item, index) {
        if (item.ControlName.toString() === del_ctrl_id.toString()) {
            Theme.splice(index, 1);
        }
    });
    //subTheme.splice(subTheme.indexOf(del_ctrl_id), 1);
    subTheme.forEach(function (item, index) {
        if (item.ControlName.toString() === del_ctrl_id.toString()) {
            subTheme.splice(index, 1);
        }
    });
    //Linedata.splice(Linedata.indexOf(del_ctrl_id), 1);
    Linedata.forEach(function (item, index) {
        if (item.ControlName.toString() === del_ctrl_id.toString()) {
            Linedata.splice(index, 1);
        }
    });

    $('#' + del_ctrl_id).remove();
    $('#tvw_' + del_ctrl_id).remove();

}


function DisplayTextkeyupEvents(id, controlId) {
    //debugger;
    try {
        if (lastOpenControlName == "RadioButton") {
            var radioButtonid = "opt_" + lastOpenControlId;
            $('#' + radioButtonid)[0].innerText = $('#' + id).val();

        }
        else if (lastOpenControlName == "CheckBox") {
            var chkButtonid = "chk_" + lastOpenControlId;
            $('#' + chkButtonid)[0].innerText = $('#' + id).val();
        }
        else if (lastOpenControlName == "Question") {
            document.getElementById("lbl_" + lastOpenControlId).innerHTML = $('#' + id).val();

            //if (lastOpenControlId.indexOf("Question") > -1) {
            //    // if it is question control 
            //    $('#tvw_' + lastOpenControlId)[0].innerText = " [-] " + $('#' + id).val();
            //}
        }
        else if (lastOpenControlName == "NumericTextBox") {
            document.getElementById("lbl_" + lastOpenControlId).innerHTML = $('#' + id).val();
        }
        else if (lastOpenControlName == "Label") {
            document.getElementById("lbl_" + lastOpenControlId).innerHTML = $('#' + id).val();
        }
        else if (lastOpenControlName == "DateTime") {
            document.getElementById("lbl_" + lastOpenControlId).innerHTML = $('#' + id).val();
        }
        else if (lastOpenControlName == "TextBox") {
            document.getElementById("lbl_" + lastOpenControlId).innerHTML = $('#' + id).val();
        }


        var temp = $("#tvw_" + lastOpenControlId).html();
        temp = temp.split(' ')[temp.split(' ').length - 1];
        if (temp.toString().toLowerCase() == "question") {
            //Changes done by Vignesh on 28102024
          //  $("#tvw_" + lastOpenControlId).html("[-] " + $('#' + id).val() + " QUESTION");
            $("#tvw_" + lastOpenControlId).html("[-] " + $('#' + id).val() + "");
        }
        else {
            $("#tvw_" + lastOpenControlId).html(" - " + $('#' + id).val() + " " + temp);
        }


    }
    catch (e) {

    }

    SetArrayProperties();
}


function changeFont1(id, controlId) {

    //debugger;
    if (isColumnSelection == true) {
        //debugger;
        SetArrayGridProperties();
        return;
    }
    if (lastOpenControlName == "RadioButton") {
        var radioButtonid = lastOpenControlId.replace("makeMeDraggableOptionBox", "makeMeDraggableOptionBox_");
        $('#' + radioButtonid)[0].style.fontFamily = $('#' + id).val();
    }
    else
        document.getElementById(lastOpenControlId).style.fontFamily = $('#' + id).val();
    SetArrayProperties();

}

function changeType1(id, controlId) {

    if (isColumnSelection == true) {
        SetArrayGridProperties();
        return;
    }


}


function changeStyle1(id, controlId) {
    var ctrlid;

    if (isColumnSelection == true) {
        SetArrayGridProperties();
        return;
    }

    if (lastOpenControlName == "RadioButton") {
        ctrlid = "opt_" + lastOpenControlId;
    }
    else if (lastOpenControlName == "CheckBox") {
        ctrlid = "chk_" + lastOpenControlId;
    }
    else
        ctrlid = lastOpenControlId;

    if ($('#' + id).val() == '0') {
        document.getElementById(ctrlid).style.fontWeight = 'normal';
        document.getElementById(ctrlid).style.fontStyle = 'normal';
        document.getElementById(ctrlid).style.textDecoration = 'none';
    }
    else if ($('#' + id).val() == '1') {
        document.getElementById(ctrlid).style.fontWeight = 'bold';
        document.getElementById(ctrlid).style.fontStyle = 'normal';
        document.getElementById(ctrlid).style.textDecoration = 'none';
    }
    else if ($('#' + id).val() == '2') {
        document.getElementById(ctrlid).style.fontWeight = 'normal';
        document.getElementById(ctrlid).style.fontStyle = 'italic';
        document.getElementById(ctrlid).style.textDecoration = 'none';
    }
    else if ($('#' + id).val() == '3') {
        document.getElementById(ctrlid).style.fontWeight = 'normal';
        document.getElementById(ctrlid).style.fontStyle = 'normal';
        document.getElementById(ctrlid).style.textDecoration = 'underline';
    }
    SetArrayProperties();

}
function keyupEventsFontSize1(id, controlId) {

    if (isColumnSelection == true) {
        SetArrayGridProperties();
        return;
    }

    if (lastOpenControlName == "RadioButton") {
        var radioButtonid = lastOpenControlId.replace("makeMeDraggableOptionBox", "makeMeDraggableOptionBox_");
        $('#' + radioButtonid)[0].style.fontSize = $('#' + id).val() + "px";
    }
    else
        document.getElementById(lastOpenControlId).style.fontSize = $('#' + id).val() + "px";
    SetArrayProperties();
}

function changeBackColor(id) {
    //debugger;
    if (isColumnSelection == true) {
        SetArrayGridProperties();
        return;
    }
    if (lastOpenControlName == "RadioButton") {
        var radioButtonid = lastOpenControlId.replace("makeMeDraggableOptionBox", "makeMeDraggableOptionBox_");
        $('#' + radioButtonid)[0].style.backgroundColor = $('#' + id).val();
        $('#' + radioButtonid)[0].style.background = $('#' + id).val();
    }
    else {
        document.getElementById(lastOpenControlId).style.backgroundColor = $('#' + id).val();
        document.getElementById(lastOpenControlId).style.background = $('#' + id).val();
    }


    SetArrayProperties();
}
function changeForeColor(id) {
    //debugger;
    if (isColumnSelection == true) {
        SetArrayGridProperties();
        return;
    }

    if (lastOpenControlName == "RadioButton") {
        var radioButtonid = lastOpenControlId.replace("makeMeDraggableOptionBox", "makeMeDraggableOptionBox_");
        $('#' + radioButtonid)[0].style.color = $('#' + id).val();
    }
    else
        document.getElementById(lastOpenControlId).style.color = $('#' + id).val();
    SetArrayProperties();
}


function keyupEventsSizeX(id) {
    if (lastOpenControlName == "RadioButton") {
        var radioButtonid = lastOpenControlId.replace("makeMeDraggableOptionBox", "makeMeDraggableOptionBox_");
        $('#' + radioButtonid)[0].style.left = $('#' + id).val() + "px";
    }
    else {
        //alert('change here.');
        document.getElementById(lastOpenControlId).style.left = $('#' + id).val() + "px";
    }

    SetArrayProperties();

}
function keyupEventsSizeY(id) {
    if (lastOpenControlName == "RadioButton") {
        var radioButtonid = lastOpenControlId.replace("makeMeDraggableOptionBox", "makeMeDraggableOptionBox_");
        $('#' + radioButtonid)[0].style.top = $('#' + id).val() + "px";
    }
    else {
        //alert('change here.');
        document.getElementById(lastOpenControlId).style.top = $('#' + id).val() + "px";
    }

    SetArrayProperties();
}
function keyupEventsSizeHeight(id) {
    if (lastOpenControlName == "RadioButton") {
        var radioButtonid = lastOpenControlId.replace("makeMeDraggableOptionBox", "makeMeDraggableOptionBox_");
        $('#' + radioButtonid)[0].style.height = $('#' + id).val() + "px";
    }
    else
        document.getElementById(lastOpenControlId).style.height = $('#' + id).val() + "px";
    SetArrayProperties();
}
function keyupEventsSizeWidth(id) {


    //debugger;
    if (isColumnSelection == true) {
        SetArrayGridProperties();
        return;
    }

    if (lastOpenControlName == "RadioButton") {
        var radioButtonid = lastOpenControlId.replace("makeMeDraggableOptionBox", "makeMeDraggableOptionBox_");
        $('#' + radioButtonid)[0].style.width = $('#' + id).val() + "px";
    }
    else
        document.getElementById(lastOpenControlId).style.width = $('#' + id).val() + "px";
    SetArrayProperties();
}


function dropDown_Clear(id) {
    var select = document.getElementById(id);
    length = select.options.length;
    while (length--) {
        select.remove(length);
    }
}

function dropDown_Fill(id) {
    var ctrlId = id.id;
    //debugger;

    var select = document.getElementById(ctrlId);

    if (ctrlId.toString() == "cboDatabaseField") {
        if (select == null || !document.getElementById('chkDatabaseField').checked) {
            //alert('not checked');
            dropDown_Clear("cboDatabaseField");
            return;
        }
        if (select.options.length > 0) return;
        dropDown_Clear("cboDatabaseField");
        for (i = 0; i < cboPosMapData_List.length; i++) {
            var optn = cboPosMapData_List[i];
            if (i == 0) {
                var eselect = document.createElement("option");
                eselect.textContent = "Select";
                eselect.value = "Select";
                select.appendChild(eselect);
            }
            var el = document.createElement("option");
            el.textContent = optn.sDesc;
            el.value = optn.sCode;
            select.appendChild(el);
        }
    }


    if (ctrlId.toString() == "cboLinkField") {
        //debugger;
        if (select == null || !document.getElementById('chkLinkData').checked) {
            //alert('not checked');
            dropDown_Clear("cboLinkField");
            return;
        }
        if (select.options.length > 0) return;
        dropDown_Clear("cboLinkField");

        for (i = 0; i < subTheme.length; i++) {


            if (i == 0) {
                var eselect = document.createElement("option");
                eselect.textContent = "Select";
                eselect.value = "Select";
                select.appendChild(eselect);
            }
            if (parseInt(subTheme[i].IsDB.toString()) == 1) {
                var el = document.createElement("option");
                el.textContent = subTheme[i].SubControlName;
                el.value = subTheme[i].DBFieldCode;
                select.appendChild(el);
            }
        }
    }
}

function get_posdataMap() {
    var obj = {};
    var _sCode = '';
    var _sDesc = '';

    $.ajax({
        url: url_GetPosDataMapDetails,
        type: 'GET',
        dataType: 'json',
        async: false,
        //data: { checkListName: ChecklistName },
        success: function (results) {
            //debugger;
            if (results != null && results != "" && results != undefined) {

                for (i = 0; i < results.Table.length; i++) {
                    cboField = {};
                    
                    cboField.sCode = results.Table[i].LineValue.toString();
                    cboField.sDesc = results.Table[i].LineValue.toString();
                    //cboField.sCode = results.Table[i].FieldCode.toString();
                    //cboField.sDesc = results.Table[i].FieldDesc.toString();
                    cboPosMapData_List.push(cboField);

                }
            }
            //Changes done by vignesh on 29/07/2024
            //else {
            //    alert('Please check PosDataMap not found. ');
            //}

        },
        error: function (xhr) {

            var obj = {};
            obj.title = "Information";
            obj.message = 'Failed. To get data please check.';
            showAlertMessage_survey(obj);

            //alert('Failed. To get data please check.');
            //alert('Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' ' + xhr.responseText);
        }
    });
}



function SetArrayProperties_fromDB(id) {

    var loop = 0;
    var i = 0;

    for (loop = 0; loop < Theme.length; loop++) {
        if (Theme[loop].ControlName.toString() == id.toString()) {
            i = loop;
            break;
        }
    }
    var obj = {};
    //debugger;
    obj.DisplayTextId = Theme[i].ControlText;
    obj.FontNameId = Theme[i].FontName;
    obj.FontSizeId = Theme[i].FontSize;
    obj.FontStyleId = Theme[i].FontStyle;

    obj.ForeColorId = Theme[i].ForeColor;
    obj.BackColorId = Theme[i].BackColor;

    obj.SizeXId = Theme[i].XPos;
    obj.SizeYId = Theme[i].YPos;

    obj.SizeHeightId = Theme[i].ControlHeight;
    obj.SizeWidthId = Theme[i].ControlWidth;

    ArrProperties[id] = obj;

}


function OpenProperties(id, name, fromctrl) {
    //debugger;
    //alert(id);

    if (fromctrl != undefined) {
        // defined
        get_Identification(id, false);
    }
    //


    $('#DisplayTextId').attr('disabled', false);
    lastOpenControlId = id;

    fillData(lastOpenControlId);
    if (name != undefined) {
        lastOpenControlName = name;
    }

    if (lastOpenControlName == "DataGrid") {
        document.getElementById("tab_Link").style.display = "block";
    }
    else {
        document.getElementById("tab_Link").style.display = "none";
    }

    var obj1 = ArrProperties[id];
    if (obj1 != undefined) {
        $('#DisplayTextId').val(obj1.DisplayTextId);
        $('#FontNameId').val(obj1.FontNameId);
        $('#FontSizeId').val(obj1.FontSizeId);

        $('#FontStyleId').val(obj1.FontStyleId);
        //FontStyle
        $('#ForeColorId').val(obj1.ForeColorId);
        $('#BackColorId').val(obj1.BackColorId);

        $('#SizeHeightId').val(obj1.SizeHeightId);
        $('#SizeWidthId').val(obj1.SizeWidthId);

        //if (name =="slider")
        //EditcboAddTableColumn();
        if (document.getElementById(lastOpenControlId) != null) {
            //debugger;
            //alert('s');            alert(lastOpenControlId);
            $('#SizeXId').val(document.getElementById(lastOpenControlId).style.left.replace('px', ''));
            $('#SizeYId').val(document.getElementById(lastOpenControlId).style.top.replace('px', ''));
            //alert('fixed');
            set_Resizable(lastOpenControlId);

            lastPOSITION_X = parseInt($('#SizeXId').val().toString());
            lastPOSITION_Y = parseInt($('#SizeYId').val().toString());
            //debugger;

            var i;
            for (i = 0; i < Theme.length; i++) {
                if (Theme[i].ControlName.toString() == lastOpenControlId) {

                    Theme[i].XPos = lastPOSITION_X;
                    Theme[i].YPos = lastPOSITION_Y;
                    break;
                }
            }

            //alert(lastPOSITION_X);
            //alert(lastPOSITION_Y);
            //if (currentResizingControlId != lastOpenControlId) {
            //    //alert('note here.');
            //    $('#SizeXId').val(document.getElementById(lastOpenControlId).style.left.replace('px', ''));
            //    $('#SizeYId').val(document.getElementById(lastOpenControlId).style.top.replace('px', ''));

            //    lastPOSITION_X = parseInt($('#SizeXId').val().toString());
            //    lastPOSITION_Y = parseInt($('#SizeYId').val().toString());

            //}
            //else {
            //    //alert('flag not working');
            //    currentResizingControlId = '';
            //}
        }

    }
    else {
        $('#FontNameId').val("Tahoma");
        $('#FontSizeId').val("16");
        $('#FontStyleId').val(0);
        $('#BackColorId').val('#FFFFFF');
        $('#ForeColorId').val('#000000');

        if (document.getElementById(lastOpenControlId) != null) {

            if (currentResizingControlId != lastOpenControlId) {
                //alert('ruunnnnnnnnnn;');
                $('#SizeXId').val(document.getElementById(lastOpenControlId).clientLeft);
                $('#SizeYId').val(document.getElementById(lastOpenControlId).clientTop);
                currentResizingControlId = '';
            }

            $('#SizeHeightId').val(document.getElementById(lastOpenControlId).clientHeight);
            $('#SizeWidthId').val(document.getElementById(lastOpenControlId).clientWidth);
        }
        SetArrayProperties();
    }
}


function updateDataCollection_XY_POS(X, Y) {
    //ArrProperties[lastOpenControlId] = obj;
    var i;
    for (i = 0; i < Theme.length; i++) {
        if (Theme[i].ControlName.toString() == lastOpenControlId) {
            Theme[i].XPos = X;
            Theme[i].YPos = Y;
            break;
        }
    }
}
function SetProperties(id) {
    //debugger;
    // var val = $('#' + id)[0].innerText;
    var val = "";
    var htm = '';
    //htm += '<div style="width:100%;height:100%">';
    htm += '<div style="width:100%;height:140%">';
    htm += '<div style="width:40%;float:left">';

    //htm += 'Text To Dispay';
    htm += '<label style="font-size:12px;">Text To Dispay</label>';

    htm += '</div>';
    htm += '<div style="width:55%;float:right">';
    htm += '<input type="text" id="DisplayTextId" style="font-size:12px;"  onkeyup="DisplayTextkeyupEvents(\'' + "DisplayTextId" + '\',\'' + id + '\')" value="' + val + '" />';

    htm += '<select id="ControlTypeId"  style="display:none;width:100%;height:28px;" onchange="changeType1(\'' + "FontNameId" + '\',\'' + id + '\');">';
    htm += '<option selected="selected" disabled="true">--Select--</option>';
    htm += '<option value="LabelBox">Label Box</option>';
    htm += '<option value="TextBox">Text Box</option>';
    htm += '<option value="ComboBox">Combo Box</option>';
    htm += '<option value="CheckBox">Check Box</option>';
    htm += '<option value="MultipleSelection">Multiple Selection</option>';
    htm += '<option value="FixedRows">Fixed Rows</option>';
    htm += '<option value="DatePicker">Date Picker</option>';
    htm += '<option value="TimePicker">Time Picker</option>';
    htm += '<option value="NumerUpDown">Numer Up/Down</option>';
    htm += '<option value="Photos">Photos</option>';
    htm += '</select>';

    htm += '</div>';
    //htm += '</div>';

    htm += '<br>';
    htm += '<br>';

    htm += '<div style="width:100%;">';
    htm += '<div style="width:40%;float:left">';
    htm += '<label style="font-size:12px;">Font Name</label>';
    htm += '</div>';
    htm += '<div style="width:55%;float:right">';
    // htm += '<input type="text" id="" />';
    // htm += '<select id="PrFontName_' + id + '" onchange="changeFont(this.value,\'' + id + '\');">';
    htm += '<select style="width:100%;height:28px;font-size:12px;" id="FontNameId" onchange="changeFont1(\'' + "FontNameId" + '\',\'' + id + '\');">';
    htm += '<option selected="selected" disabled="true">--Select--</option>';
    htm += '<option style="font-family:Times New Roman;" selected class="Times-New-Roman"  value="Times-New-Roman">Times New Roman</option>';
    htm += '<option style="font-family:Arial;" class="Arial" value="Arial">Arial</option>';
    htm += '<option style="font-family:Arial Black;" class="Arial Black" value="Arial Black">Arial Black</option>';
    htm += '<option style="font-family:Arial narrow;" class="Arial narrow" value="Arial narrow">Arial narrow</option>';

    htm += '<option style="font-family:Bookman;" class="Bookman" value="Bookman">Bookman</option>';
    htm += '<option style="font-family:Brush Script MT;" class="Brush Script MT" value="Brush Script MT">Brush Script MT</option>';

    htm += '<option style="font-family:Courier" class="Courier" value="Courier">Courier</option>';
    htm += '<option style="font-family:Courier New" class="Courier New" value="Courier New">Courier New</option>';
    htm += '<option style="font-family:Comic Sans" class="Comic Sans" value="Comic Sans">Comic Sans</option>';
    htm += '<option style="font-family:Comic Sans MS" class="Comic Sans MS" value="Comic Sans MS">Comic Sans MS</option>';
    htm += '<option style="font-family:Corbel;" class="Corbel" value="Corbel">Corbel</option>';
    htm += '<option style="font-family:Cambria;" class="Cambria" value="Cambria">Cambria</option>';
    htm += '<option style="font-family:Century Gothic;" class="Century Gothic" value="Century Gothic">Century Gothic</option>';
    htm += '<option style="font-family:cursive;" class="cursive" value="cursive">cursive</option>';

    htm += '<option style="font-family:fantasy;" class="fantasy" value="fantasy">fantasy</option>';

    htm += '<option style="font-family:Helvetica;" class="Helvetica" value="Helvetica">Helvetica</option>';

    htm += '<option style="font-family:Impact;" class="Impact" value="Impact">Impact</option>';

    htm += '<option style="font-family:Lucida Console;" class="Lucida Console" value="Lucida Console">Lucida Console</option>';

    htm += '<option style="font-family:monospace;" class="monospace" value="monospace">monospace</option>';
    htm += '<option style="font-family:MS Comic Sans;" class="MS Comic Sans" value="MS-Comic-Sans">MS Comic Sans</option>';
    htm += '<option style="font-family:MS Gothic;" class="MS Gothic" value="MS Gothic">MS Gothic</option>';
    htm += '<option style="font-family:Miriam;" class="Miriam" value="Miriam">Miriam</option>';

    htm += '<option style="font-family:serif;" class="serif" value="serif">serif</option>';
    htm += '<option style="font-family:sans-serif;" class="sans-serif" value="sans-serif">sans-serif</option>';
    htm += '<option style="font-family:SimSun;" class="SimSun" value="SimSun">SimSun</option>';
    htm += '<option style="font-family:SimSun-ExtB;" class="SimSun-ExtB" value="SimSun-ExtB">SimSun-ExtB</option>';

    htm += '<option style="font-family:Tahoma;" class="Tahoma" value="Tahoma">Tahoma</option>';

    htm += '<option style="font-family:Verdana, Geneva, sans-serif;" class="Verdana" value="Verdana">Verdana</option>';

    htm += '<option style="font-family:Webdings;" class="Webdings" value="Webdings">Webdings</option>';
    htm += '<option style="font-family:Wingdings;" class="Wingdings" value="Wingdings">Wingdings</option>';


    htm += '</select>';
    htm += '</div>';
    htm += '</div>';

    htm += '<br>';
    htm += '<br>';
    htm += '<div style="width:100%;">';
    htm += '<div style="width:40%;float:left">';
    htm += '<label style="font-size:12px;">Font Size</label>';
    htm += '</div>';
    //55
    htm += '<div style="width:40%;float:right">';
    htm += '<select style="width:100%;height:28px;font-size:12px;" id="FontStyleId" onchange="changeStyle1(\'' + "FontStyleId" + '\',\'' + id + '\');">';
    htm += '<option selected="selected" disabled="true">--Select--</option>';
    htm += '<option value="0">Regular</option>';
    htm += '<option value="1">Bold</option>';
    htm += '<option value="2">Italic</option>';
    htm += '<option value="3">Underline</option>';
    htm += '</select>';
    htm += '</div>';
    htm += '<div style="width:15%;height:20px;padding-right:5px;float:right">';
    htm += '<input type="text" id="FontSizeId" style="font-size:12px;" onkeyup="keyupEventsFontSize1(\'' + "FontSizeId" + '\',\'' + id + '\')" value="16.4" />';
    htm += '</div>';

    htm += '<br>';
    htm += '<br>';
    htm += '<div id="ColumnColletionsDivId" style="width:100%;display:none;">';
    htm += '<div style="width:40%;float:left">';
    htm += '<label style="font-size:12px;">Column Colletions</label>';
    htm += '</div>';
    htm += '<div style="width:55%;float:right">';
    htm += '<button type="button" class="btn btn-rounded btn-primary" style="height:25px;background-color:#ccc;color:#000000;width:100%;font-size:12px;" id="ColumnColletionsId"  onclick="ColumnColletionskeyupEvents()">Add Column</button>';
    htm += '</div>';
    htm += '</div>';

    // Image and Style =================================================================

    htm += '<div id="ImageDivId" style="width:100%;float:left;display:none;">';

    htm += '<div style="width:40%;float:left">';
    htm += '<label style="font-size:12px;">Load Image</label>';
    htm += '</div>';

    htm += '<div style="width:55%;float:right">';
    htm += '<img src="../../Images/Survey/folder.png" style="width:20px;height:20px;" onclick="picture_imageload()" />'
    htm += '<input id="imageUpload" type="file" name="name" style="display: none;" onchange="ImageUploadChange(this)" title="Load File"  accept="image/*"/ />';
    htm += '</div>';
    htm += '</div>';

    htm += '<br>';

    htm += '<div style="width:130%;float:left;">';

    //htm += '<div style="width:32%;float:left;">';
    //htm += '<div style="position:absolute;left:0;">';
    htm += '<input id="rad_stretch" type="radio"  name="image_style" style="width:10%;height:10px;" >';
    htm += '<label style="width:10%;font-size:12px;font-weight:normal;">Stretch</label>';
    //htm += '</div>';

    //htm += '<div style="width:32%;float:center;">';
    //htm += '<div style="position:absolute;left:50%;transform: translateX(-50%);">';
    htm += '<input id="rad_center" type="radio" name="image_style" style="width:10%;height:10px;" >';
    htm += '<label style="width:10%;font-size:12px;font-weight:normal;">Center</label>';
    //htm += '</div>';

    //htm += '<div style="width:32%;float:right;">';
    //htm += '<div style="position:absolute;right:0;">';
    htm += '<input id="rad_normal" type="radio" checked name="image_style" style="width:10%;height:10px;" >';
    htm += '<label style="width:10%;font-size:12px;font-weight:normal;">Normal</label>';
    //htm += '</div>';

    htm += '</div>';
    htm += '</div>';

    htm += '<br>';
    htm += '<br>';

    // Image and Style =================================================================


    $("#TapTextDivId").empty();
    $("#TapTextDivId").append(htm);


    SetColor(id);
}


function picture_imageload() {

    $('#imageUpload').trigger('click');

}


function ImageUploadChange(obj) {
    if (obj.files[0] != null) {//200000kb
        // Here we store in server and update the collection

        var formData = new FormData();
        var totalFiles = document.getElementById("imageUpload").files.length;
        for (var i = 0; i < totalFiles; i++) {
            var file = document.getElementById("imageUpload").files[i];
            formData.append("imageUpload", file);
        }

 
        $.ajax({
            url: url_SurveyUploadFiles + "?imgname=" + "" + "&oldImageName=" + "",
            //url: url_UploadFiles + "?imgname=" + "" + "&oldImageName=" + "",
            //url: url_Imagefile_Upload + "?val=" + "",
            type: "POST",
            async: false,
            contentType: false, // Not to set any content header  
            processData: false, // Not to process data  
            data: formData,
            success: function (result) {
                
                if (result.toString() != "-1") {
                    // SUCCESSFULLY UPLOADED IMAGE 
                    //alert(current_Active_Element);
                    //alert(Survey_Uploaded_Image_Location);
                    var img_picture = document.getElementById("img_" + current_Active_Element);
                    img_picture.src = "../.." + result.split("|")[0].toString();
                    // UPDATE THE CONTROL ON COLLECTION 
                    var no = 0;
                    for (loop = 0; loop < Theme.length; loop++) {
                        if (Theme[loop].ControlName.toString() == current_Active_Element.toString()) {
                            no = loop;
                            break;
                        }
                    }
                    Theme[no].ControlText = result.split("|")[1].toString();
                    // STORE CONTROLTEXT 
                }
                else {
                    var obj = {};
                    obj.title = "Information";
                    obj.message = 'Image is not uploaded! Please Check.';
                    showAlertMessage_survey(obj);
                    //alert("Image is not uploaded! Please Check.");
                }
            },
            error: function (err, z, x) {
               // alert(err.statusText);
                var obj = {};
                obj.title = "Information";
                obj.message = err.statusText;
                showAlertMessage_survey(obj);
            }
        });
    }
    else if (obj.files[0] == null) {
        return;
    }



}

function SetColor(id) {
    var htm = '';
    htm += '<div style="width:100%;">';
    htm += '<div style="width:40%;float:left">';
    htm += 'Back Color';
    htm += '</div>';
    htm += '<div style="width:55%;float:right">';
    htm += '<select id="BackColorId" onchange="changeBackColor(\'' + "BackColorId" + '\');">';
    //   htm += '<option value=""></option>';
    htm += '<option selected="selected" disabled="true">--Select--</option>';
    htm += '<option value="White" style="background-color: White;" selected>White</option>';
    htm += '<option value="Black" style="background-color: Black;">Black</option>';
    htm += '<option value="Gray" style="background-color: Gray;">Gray</option>';
    htm += '<option value="DarkGray" style="background-color: DarkGray;">DarkGray</option>';
    htm += '<option value="LightGrey" style="background-color: LightGrey;">LightGray</option>';
    htm += '<option value="Aquamarine" style="background-color: Aquamarine;">Aquamarine</option>';
    htm += '<option value="Blue" style="background-color: Blue;">Blue</option>';
    htm += '<option value="Navy" style="background-color: Navy;color: #FFFFFF;">Navy</option>';
    htm += '<option value="Purple" style="background-color: Purple;color: #FFFFFF;">Purple</option>';
    htm += '<option value="DeepPink" style="background-color: DeepPink;">DeepPink</option>';
    htm += '<option value="Violet" style="background-color: Violet;">Violet</option>';
    htm += '<option value="Pink" style="background-color: Pink;">Pink</option>';
    htm += '<option value="DarkGreen" style="background-color: DarkGreen;color: #FFFFFF;">DarkGreen</option>';
    htm += '<option value="Green" style="background-color: Green;color: #FFFFFF;">Green</option>';
    htm += '<option value="YellowGreen" style="background-color: YellowGreen;">YellowGreen</option>';
    htm += '<option value="Yellow" style="background-color: Yellow;">Yellow</option>';
    htm += '<option value="Orange" style="background-color: Orange;">Orange</option>';
    htm += '<option value="Red" style="background-color: Red;">Red</option>';
    htm += '<option value="Brown" style="background-color: Brown;">Brown</option>';
    htm += '<option value="BurlyWood" style="background-color: BurlyWood;">BurlyWood</option>';
    htm += '<option value="Beige" style="background-color: Beige;">Beige</option>';
    htm += '</select>';
    htm += '</div>';


    htm += '<br>';
    htm += '<br>';
    htm += '<div style="width:40%;float:left">';
    htm += 'Fore Color';
    htm += '</div>';
    htm += '<div style="width:55%;float:right">';
    htm += '<select id="ForeColorId" onchange="changeForeColor(\'' + "ForeColorId" + '\');">';
    //   htm += '<option value=""></option>';
    htm += '<option value="Black" style="background-color: Black;">Black</option>';
    htm += '<option value="White" style="background-color: White;" selected>White</option>';
    htm += '<option value="Gray" style="background-color: Gray;">Gray</option>';
    htm += '<option value="DarkGray" style="background-color: DarkGray;">DarkGray</option>';
    htm += '<option value="LightGrey" style="background-color: LightGrey;">LightGray</option>';
    htm += '<option value="Aquamarine" style="background-color: Aquamarine;">Aquamarine</option>';
    htm += '<option value="Blue" style="background-color: Blue;">Blue</option>';
    htm += '<option value="Navy" style="background-color: Navy;color: #FFFFFF;">Navy</option>';
    htm += '<option value="Purple" style="background-color: Purple;color: #FFFFFF;">Purple</option>';
    htm += '<option value="DeepPink" style="background-color: DeepPink;">DeepPink</option>';
    htm += '<option value="Violet" style="background-color: Violet;">Violet</option>';
    htm += '<option value="Pink" style="background-color: Pink;">Pink</option>';
    htm += '<option value="DarkGreen" style="background-color: DarkGreen;color: #FFFFFF;">DarkGreen</option>';
    htm += '<option value="Green" style="background-color: Green;color: #FFFFFF;">Green</option>';
    htm += '<option value="YellowGreen" style="background-color: YellowGreen;">YellowGreen</option>';
    htm += '<option value="Yellow" style="background-color: Yellow;">Yellow</option>';
    htm += '<option value="Orange" style="background-color: Orange;">Orange</option>';
    htm += '<option value="Red" style="background-color: Red;">Red</option>';
    htm += '<option value="Brown" style="background-color: Brown;">Brown</option>';
    htm += '<option value="BurlyWood" style="background-color: BurlyWood;">BurlyWood</option>';
    htm += '<option value="Beige" style="background-color: Beige;">Beige</option>';
    htm += '</select>';
    htm += '</div>';
    htm += '</div>';
    htm += '<br>';
    htm += '<br>';
    $("#TapColorDivId").append(htm);

    SetSize(id);

}
function SetSize(id) {
    var htm = '';
    htm += '<div style="width:100%;">';
    htm += '<div class="GridHideShow" style="width:40%;float:left">';
    htm += 'Height';
    htm += '</div>';
    htm += '<div class="GridHideShow" style="width:55%;float:right">';
    htm += '<input type="text" id="SizeHeightId" onkeyup="keyupEventsSizeHeight(\'' + "SizeHeightId" + '\')" value="26" />';
    htm += '</div>';
    htm += '<br>';
    htm += '<br>';
    htm += '<div style="width:40%;float:left">';
    htm += 'Width';
    htm += '</div>';
    htm += '<div style="width:55%;float:right">';
    htm += '<input type="text" id="SizeWidthId" onkeyup="keyupEventsSizeWidth(\'' + "SizeWidthId" + '\')" value="120" />';
    //htm += '<input type="text" id="grdSizeWidthId" onkeyup="keyupEventsSizeWidth(\'' + "SizeWidthId" + '\')" value="222" />';
    htm += '</div>';
    htm += '<br>';
    htm += '<br>';
    htm += '<div  class="GridHideShow" style="width:40%;float:left">';
    htm += 'X';
    htm += '</div>';
    htm += '<div  class="GridHideShow" style="width:55%;float:right">';
    htm += '<input type="text" id="SizeXId" onkeyup="keyupEventsSizeX(\'' + "SizeXId" + '\')" value="294" />';
    htm += '</div>';
    htm += '<br>';
    htm += '<br>';
    htm += '<div  class="GridHideShow" style="width:40%;float:left">';
    htm += 'Y';
    htm += '</div>';
    htm += '<div  class="GridHideShow" style="width:55%;float:right">';
    htm += '<input type="text" id="SizeYId" onkeyup="keyupEventsSizeY(\'' + "SizeYId" + '\')" value="428" />';
    htm += '</div>';
    htm += '</div>';
    htm += '<br>';
    htm += '<br>';
    $("#TapSizeDivId").append(htm);

    SetData(id);
}


function SetData(id) {
    //  debugger;
    // var val = $('#' + id)[0].innerText;padding-top:8px;
    var val = "";
    var htm = '';


    htm = '<div style="width:100%;padding-top:8px;">';
    htm += '<input name="textStyle"  type="checkbox"  value="0" id="chkDatabaseField" />Database Field<br>';
    htm += '</div>';
    //htm += '<br>';

    htm += '<div style="width:100%;padding-top:8px;">';
    htm += '<select style="width:100%;height:28px;" onchange="cboDatabaseField_change(this)" onclick="dropDown_Fill(this)"  id="cboDatabaseField"  >';
    htm += '</select>';
    htm += '</div>';
    //htm += '<br>';

    htm += '<div style="width:80%;float:left;padding-top:8px;">';
    htm += '<input type="text" id="cboTableColumnId" />';
    htm += '</div>';
    htm += '<div style="width:20%;float:right;padding-top:8px;">';
    htm += '<img src=\"' + url_Image_PlusIcon + '\" onclick="cboAddTableColumn()" style="width:25px;height:25px;" />';
    htm += '</div>';
    htm += '<br>';

    htm += '<br>';

    htm += '<div style="width:100%;float:left">';
    htm += '<div id="cboTableColumnDivId" style="overflow:scroll;height:80px;border:1px solid #ccc;">';
    htm += '</div>';


    htm += '<div style="float: right;">';
    htm += '<img src=\"' + url_Image_DeleteIcon + '\" onclick="RemoveTableColumn_Data()" style="width:25px;height:25px;" />';
    htm += '</div>';

    $("#TapDataDivId").empty();
    $("#TapDataDivId").append(htm);

    SetLink(id);
}




function SetLink(id) {

    var val = "";
    var htm = '';


    htm = '<div style="width:100%;padding-top:8px;">';
    htm += '<input name="textStyle"  type="checkbox"  value="0" id="chkLinkData" />Link Data<br>';
    htm += '</div>';
    //htm += '<br>';

    htm += '<div style="width:100%;">';
    htm += '<div style="width:80%;float:left;">';
    // Populate Pos Data Map Here... 
    htm += '<select style="width:100%;height:28px;"  onclick="dropDown_Fill(this)"  id="cboLinkField" >';
    htm += '</select>';
    htm += '</div>';
    htm += '<div style="width:20%;float:left;">';
    htm += '<img src=\"' + url_Image_PlusIcon + '\" onclick="cboAddTableColumn_Link()" style="width:25px;height:25px;" />';
    htm += '</div>';
    htm += '</div>';

    htm += '<br>';


    htm += '<br>';

    htm += '<div style="width:100%;float:left;">';
    htm += '<div id="cboLinkTableColumnDivId" style="overflow:scroll;height:120px;border:1px solid #ccc;">';
    htm += '</div>';

    htm += '<div style="float: right;">';
    htm += '<img src=\"' + url_Image_DeleteIcon + '\" onclick="RemoveTableColumn_Link()" style="width:25px;height:25px;" />';
    //htm += '<img  style="width:60px;height:60px;" src=\"' + url_Image_Slider + '\"/>'
    htm += '</div>';


    $("#TapLinkDivId").empty();
    //alert(htm);
    $("#TapLinkDivId").append(htm);

}




function SaveMethod() {
    //debugger;

    //debugger;

    arrayQuery = [];

    update_Xpos_Ypos(currentPage);

    Prepare_Data();

    if (arrayQuery != [] && arrayQuery != null && arrayQuery.length > 0) {
        $.ajax({
            url: url_ExecuteNonQuerys,
            // url: '/Survey/ExecuteNonQuerys',
            type: 'POST',
            dataType: 'json',

            async: false,
            data: { data: JSON.stringify(arrayQuery) },
            success: function (results) {

                if (results == "1") {
                    //alert('Saved Successfully.');
                    var obj = {};
                    obj.title = "Information";
                    obj.message = 'Saved Successfully.';
                    showAlertMessage_survey(obj);

                }
                else {
                    //alert('Failed. please check.');
                    var obj = {};
                    obj.title = "Information";
                    obj.message = 'Failed. please check.';
                    showAlertMessage_survey(obj);

                }

                //alert(results);
                //return results;
            },
            error: function (xhr) {
                //alert('Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' ' + xhr.responseText);
                var obj = {};
                obj.title = "Information";
                obj.message = 'Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' ' + xhr.responseText;
                showAlertMessage_survey(obj);
            }
        });
    }

}

function showAlertMessage_survey(obj, messageHeader) {

    var btns = {};
    btns["Ok"] = function (e) {

       // isAlertOpen = false;

        if (obj.title == "InBound Updation") {
            window.location.reload();
            $(this).dialog("close");
        }
        else {

            if (obj.message == 'Failed. please check.' || obj.message == 'Saved Successfully.' || obj.message.toLowerCase().indexOf("updated successfully") > -1 || obj.message.toLowerCase().indexOf('created successfully') > -1) {
                //alert('eee');
                //window.location = '~/Survey/SurveyList/';
                window.location = "../SurveyList/";
            }
            $(this).dialog("close");
        }

    }

    $('<div></div>').appendTo('body')
                    .html('<div><h6>' + obj.message + '</h6></div>').dialog({


                        modal: true, title: obj.title, zIndex: 10000, autoOpen: true,
                        // width: 'auto', resizable: false,
                        width: '40%',
                        resizable: false,
                        buttons: btns
                    });
}

function calc_Height(loopValue, formID) {
    var retValue = 0;
    var loop = 0;
    //var checkFormId = 0;

    if (loopValue == 0) return 0;

    if (Theme != null && Theme != [] && Theme.length > 0) {
        for (loop = 0; loop < loopValue; loop++) {
            if (Theme[loop].FormId.toString() == formID.toString()) {
                //checkFormId = 1;
                retValue += parseInt(Theme[loop].ControlHeight);
            }
        }
    }

    //if (checkFormId == 0 && parseInt(formID) > 0 ) return 0;

    return retValue;

}


function prepare_Data(data) {
    // RETRIEVE PROCESS
    Theme = data.Theme;
    Linedata = data.Linedata;
    subTheme = data.subTheme;

    var k1 = ''; var v1 = '';

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


            Theme[loop].FontSize = parseInt(Theme[loop].FontSize) * 2;


            //"pnl_0_Question_": "lbQ",
            v1 = Theme[loop].ControlName.replace(/\d+$/, "");
            //Theme[loop].ControlName = Theme[loop].ControlName.replace(v1, getKey(v1)); //pnl_0_Question_0
            Theme[loop].ControlName = "pnl_" + Theme[loop].FormId.toString() + "_" + Theme[loop].ControlName.replace(v1, getKey(v1));

            if (Theme[loop].ParentQuestion != "") {
                v1 = Theme[loop].ParentQuestion.replace(/\d+$/, "");
                //Theme[loop].ParentQuestion = Theme[loop].ParentQuestion.replace(v1, getKey(v1));
                Theme[loop].ParentQuestion = "pnl_" + Theme[loop].FormId.toString() + "_" + Theme[loop].ParentQuestion.replace(v1, getKey(v1));
            }
        }
    }

    if (subTheme != null && subTheme != [] && subTheme.length > 0) {
        for (loop = 0; loop < subTheme.length; loop++) {
            v1 = subTheme[loop].ControlName.replace(/\d+$/, "");
            subTheme[loop].ControlName = "pnl_" + subTheme[loop].FormId.toString() + "_" + subTheme[loop].ControlName.replace(v1, getKey(v1));

            // COLUMN WIDTH
            subTheme[loop].ControlWidth = parseInt(subTheme[loop].ControlWidth) * 2;
        }
    }

    if (Linedata != null && Linedata != [] && Linedata.length > 0) {
        for (loop = 0; loop < Linedata.length; loop++) {
            v1 = Linedata[loop].ControlName.replace(/\d+$/, "");
            Linedata[loop].ControlName = "pnl_" + Linedata[loop].FormId.toString() + "_" + Linedata[loop].ControlName.replace(v1, getKey(v1));


            //v1 = Theme[loop].ControlName.replace(/\d+$/, "");
            //Theme[loop].ControlName = "pnl_" + Theme[loop].FormId.toString() + "_" + Theme[loop].ControlName.replace(v1, getKey(v1));
        }
    }


    //  HEIGHT CALCULATION  pn0

    var loop = 0;

    if (Theme != null && Theme != [] && Theme.length > 0) {
        for (loop = 0; loop < Theme.length; loop++) {
            //Theme[loop].YPos = parseInt(Theme[loop].YPos) - calc_Height(loop, Theme[loop].FormId);
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



function Prepare_Data() {
    // STORE PROCESS
    var qry = '';
    var k1 = ''; var v1 = '';
    var idx = 0;

    arrayQuery = [];

    arrayQuery.push("Delete from POSTheme where ThemeName = " + SafeSQL(Theme[0].ThemeName));
    arrayQuery.push("Delete from POSSubTheme where ThemeName = " + SafeSQL(Theme[0].ThemeName));
    arrayQuery.push("Delete from POSLineData where ThemeName = " + SafeSQL(Theme[0].ThemeName));

    // HEIGHT CALCULATION
    var loop = 0;

    if (Theme != null && Theme != [] && Theme.length > 0) {
        for (loop = 0; loop < Theme.length; loop++) {
            //Theme[loop].YPos = parseInt(Theme[loop].YPos) + calc_Height(loop, Theme[loop].FormId);
            Theme[loop].FormName = Theme[loop].FormName.toString().replace("l_", "");
            Theme[loop].Parent = Theme[loop].FormName.toString().replace("l_", "");

            k1 = Theme[loop].ControlName.replace(/\d+$/, "");
            Theme[loop].ControlName = Theme[loop].ControlName.replace(k1, getValue(k1));

            if (Theme[loop].ParentQuestion != "") {
                k1 = Theme[loop].ParentQuestion.replace(/\d+$/, "");
                Theme[loop].ParentQuestion = Theme[loop].ParentQuestion.replace(k1, getValue(k1));
            }

        }
    }

    if (subTheme != null && subTheme != [] && subTheme.length > 0) {
        idx = 1;
        for (loop = 0; loop < subTheme.length; loop++) {
            k1 = subTheme[loop].ControlName.replace(/\d+$/, "");
            subTheme[loop].ControlName = subTheme[loop].ControlName.replace(k1, getValue(k1));
            // COMMENTED CONTROLNO
            subTheme[loop].ControlNo = idx;
            idx = idx + 1;
        }
    }

    if (Linedata != null && Linedata != [] && Linedata.length > 0) {

        idx = 1;
        for (loop = 0; loop < Linedata.length; loop++) {
            k1 = Linedata[loop].ControlName.replace(/\d+$/, "");
            Linedata[loop].ControlName = Linedata[loop].ControlName.replace(k1, getValue(k1));

            // COMMENTED CONTROLNO
            Linedata[loop].SerialNo = idx;
            idx = idx + 1;
        }
    }


    ////"pnl_0_CheckBox_": "cb",
    //alert("value" + getValue("pnl_0_CheckBox_"));
    //alert("key" + getKey("cb"))

    //      CONVERT FROM        WEB         TO          MOBILE
    //Width	    : 384						520
    //Height 	: 512						540
    // DEVICE CALCULATION
    loop = 0;
    if (Theme != null && Theme != [] && Theme.length > 0) {
        for (loop = 0; loop < Theme.length; loop++) {

            if (Theme[loop].XPos.toString() == "auto") {
                Theme[loop].XPos = "0";
            }

            if (Theme[loop].YPos.toString() == "auto") {
                Theme[loop].YPos = "0";
            }


            Theme[loop].XPos = parseInt((Theme[loop].XPos / 520) * 384);
            Theme[loop].YPos = parseInt((Theme[loop].YPos / 540) * 512);

            Theme[loop].ControlWidth = parseInt((Theme[loop].ControlWidth / 520) * 384);
            Theme[loop].ControlHeight = parseInt((Theme[loop].ControlHeight / 540) * 512);

            Theme[loop].FontSize = parseInt(Theme[loop].FontSize) / 2;

        }
    }


    if (subTheme != null && subTheme != [] && subTheme.length > 0) {
        for (loop = 0; loop < subTheme.length; loop++) {
            // COLUMN WIDTH
            subTheme[loop].ControlWidth = parseInt(subTheme[loop].ControlWidth) / 2;
        }
    }


    var i = 0;
    if (Theme != null && Theme != [] && Theme.length > 0) {
        for (i = 0; i < Theme.length; i++) {
            var qry = "Insert into POSTheme(ThemeName, FormId, FormName, ControlName, ControlType, XPos, YPos, ControlWidth, ControlHeight, ControlText, BackColor, ForeColor, ThemeColor, FontName, FontSize, FontStyle, Parent, Visible, IsDB, DBFieldCode, [Device], SeqNo, ParentQuestion,Active, Description) Values (";
            qry += ' ' + SafeSQL(Theme[i].ThemeName) + ", " + SafeSQL(Theme[i].FormId) + ", " + SafeSQL(Theme[i].FormName);
            qry += ', ' + SafeSQL(Theme[i].ControlName) + ", " + SafeSQL(Theme[i].ControlType) + ", " + Theme[i].XPos;
            qry += ', ' + Theme[i].YPos + ", " + Theme[i].ControlWidth + ", " + Theme[i].ControlHeight;
            qry += ', ' + SafeSQL(Theme[i].ControlText) + ", " + SafeSQL(Theme[i].BackColor) + ", " + SafeSQL(Theme[i].ForeColor);
            qry += ', ' + SafeSQL(Theme[i].ThemeColor) + ", " + SafeSQL(Theme[i].FontName) + ", " + Theme[i].FontSize;
            qry += ', ' + SafeSQL(Theme[i].FontStyle) + ", " + SafeSQL(Theme[i].Parent) + ", " + SafeSQL(Theme[i].Visible);
            qry += ', ' + SafeSQL(Theme[i].IsDB) + ", " + SafeSQL(Theme[i].DBFieldCode) + ", " + SafeSQL(Theme[i].Device);
            qry += ', ' + SafeSQL(Theme[i].SeqNo) + ", " + SafeSQL(Theme[i].ParentQuestion) + ", " + SafeSQL(Theme[i].Active) + ", " + SafeSQL(Theme[i].Description) + ");";
            arrayQuery.push(qry);
        }
    }


    i = 0;
    if (Linedata != null && Linedata != [] && Linedata.length > 0) {
        for (i = 0; i < Linedata.length; i++) {
            var qry = "Insert into POSLineData(ThemeName, FormId, ControlName, ";
            qry += " SubControlName, SerialNo, LineValue, IsLink, LinkControlName,";
            qry += " LinkSubControlName, LinkFieldCode) Values (";
            qry += '' + SafeSQL(Linedata[i].ThemeName) + ", " + SafeSQL(Linedata[i].FormId) + ", " + SafeSQL(Linedata[i].ControlName);
            qry += ', ' + SafeSQL(Linedata[i].SubControlName) + ", " + Linedata[i].SerialNo + ", " + SafeSQL(Linedata[i].LineValue);
            qry += ', ' + SafeSQL(Linedata[i].IsLink) + ", " + SafeSQL(Linedata[i].LinkControlName) + ", " + SafeSQL(Linedata[i].LinkSubControlName);
            qry += ', ' + SafeSQL(Linedata[i].LinkFieldCode) + ");";
            arrayQuery.push(qry);
        }
    }

    i = 0;
    if (subTheme != null && subTheme != [] && subTheme.length > 0) {
        for (i = 0; i < subTheme.length; i++) {
            var qry = "Insert into POSSubTheme(ThemeName, FormId, ControlName, SubControlName, ControlType, ";
            qry += " ControlWidth, ControlNo, ControlText, BackColor, ForeColor, FontName, FontSize,";
            qry += " FontStyle, IsDB, DBFieldCode) Values (";
            qry += '' + SafeSQL(subTheme[i].ThemeName) + ", " + SafeSQL(subTheme[i].FormId) + ", " + SafeSQL(subTheme[i].ControlName);
            qry += ', ' + SafeSQL(subTheme[i].SubControlName) + ", " + SafeSQL(subTheme[i].ControlType) + ", " + subTheme[i].ControlWidth;
            qry += ', ' + subTheme[i].ControlNo + ", " + SafeSQL(subTheme[i].ControlText) + ", " + SafeSQL(subTheme[i].BackColor);
            qry += ', ' + SafeSQL(subTheme[i].ForeColor) + ", " + SafeSQL(subTheme[i].FontName) + ", " + subTheme[i].FontSize;
            qry += ', ' + SafeSQL(subTheme[i].FontStyle) + ", " + SafeSQL(subTheme[i].IsDB) + ", " + SafeSQL(subTheme[i].DBFieldCode) + ");";
            arrayQuery.push(qry);
        }
    }

}


function SafeSQL(datavalue) {
    return "'" + datavalue + "'"
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
    update_Xpos_Ypos(currentPage);
    if (currentPage < (NoofScreens - 1)) {
        currentPage++;
        currentPanel = "pnl_" + currentPage;
        pageLoading(currentPage);
    }
}
function PrevWindowEvent() {
    //debugger;
    update_Xpos_Ypos(currentPage);
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

                    try {
                        Theme[i].XPos = document.getElementById(Theme[i].ControlName).style.left.replace("px", "");
                        Theme[i].YPos = document.getElementById(Theme[i].ControlName).style.top.replace("px", "");

                        if (Theme[i].XPos == "" || Theme[i].XPos == 'undefined' || Theme[i].XPos == null || Theme[i].XPos == 'null' || Theme[i].XPos == '0') {
                            Theme[i].XPos = 0;
                        }
                        if (Theme[i].YPos == "" || Theme[i].YPos == 'undefined' || Theme[i].YPos == null || Theme[i].YPos == 'null' || Theme[i].YPos == '0') {
                            Theme[i].YPos = 0;
                        }

                    }
                    catch (e) {

                    }

                    break;
                default:
            }
        }
    } // Theme iteration
}

// PAGE NOVIGATION ==================================================================








// GRID RELATED FUNCTIONALITY STARTS HERE =============================================================================




function ColumnColletionskeyupEvents() {
    var x = $("#mogrify_toolbox").position();

    $('#TableWindowDivId').position.left = parseInt(x.left) + 65;

    $('#TableWindowDivId').position.top = parseInt(x.top) + 25;
    $('#TableWindowDivId').css("z-index", 100);
    $('#TableWindowDivId').css('background', '#ECECEC');
    $('#TableWindowDivId').show();

    $('#DisplayTextId').attr('disabled', false);
    $('#divTextToDisplay').text("Control Type");
    //debugger;
    $('#DisplayTextId').hide();
    $('#ControlTypeId').show();
    $('.GridHideShow').hide();
    $('#ColumnColletionsDivId').hide();
}

function ColumnColletionsClose() {
    $('#TableWindowDivId').hide();
    document.getElementById("TableWindowDivId").style.margin.left = '0px';
    $('#DisplayTextId').attr('disabled', true);
    $('#divTextToDisplay').text("Text To Display");
    $('#DisplayTextId').show();
    $('#ControlTypeId').hide();
    $('.GridHideShow').show();
    $('#ColumnColletionsDivId').show();
    isColumnSelection = false;
}

var tblColumnLabelCnt = 0;

function check_duplication(columnValue) {
    //debugger;
    i = 0;
    if (subTheme != null && subTheme != [] && subTheme.length > 0) {
        for (i = 0; i < subTheme.length; i++) {

            if (subTheme[i].SubControlName.toString() == columnValue.toString() && subTheme[i].ControlName.toString() === lastOpenControlId.toString()) {
                return true;
            }
        }
    }
    return false;
}

function AddTableColumn(givenId) {
    // ADDED value
    //debugger;
    var columnID = '';
    var columnValue = $('#TableColumnId').val();

    if (check_duplication(columnValue) == true) {
        //alert('already existed.');
        var obj = {};
        obj.title = "Information";
        obj.message = 'already exist';
        showAlertMessage_survey(obj);
        return;
    }

    if (columnValue != "") {
        //subControlName_subTheme = columnValue;

        tblColumnLabelCnt++;
        tblColumnLabelCnt = typeof givenId !== 'undefined' ? givenId : tblColumnLabelCnt;
        var id = 'GridColumnId_' + tblColumnLabelCnt + '';
        var htm = '';
        htm += '<div id="' + id + '" onclick="TableColumnSelect(\'' + id + '\')"; style="width:100%">' + columnValue + '</div>';
        $("#TableColumnDivId").append(htm);
        $('#TableColumnId').val('');

        columnID = lastOpenControlId + "_" + id;
        SetArrayGridProperties(id);
        subThemeData(columnValue);

    }
}




function SetArrayGridProperties(id) {
    var obj = {};
    //obj.DisplayTextId = $('#DisplayTextId').val();
    obj.ControlType = $('#ControlTypeId').val();
    obj.FontNameId = $('#FontNameId').val();
    obj.FontSizeId = $('#FontSizeId').val();
    obj.FontStyleId = $('#FontStyleId').val();

    //obj.BoldId = $('#BoldId').is(':checked');
    //obj.ItalicId = $('#ItalicId').is(':checked');
    //obj.UnderlineId = $('#UnderlineId').is(':checked');

    obj.ForeColorId = $('#ForeColorId').val();
    obj.BackColorId = $('#BackColorId').val();


    obj.SizeWidthId = $('#SizeWidthId').val();

    ArrGridProperties[lastOpenControlId + "_" + LstGridColumnIdSelect] = obj;

    updateDataCollection_SubTheme();

}


function updateDataCollection_SubTheme() {
    //ArrProperties[lastOpenControlId] = obj;
    var i;
    if (LstGridColumnIdSelect != "" && document.getElementById(LstGridColumnIdSelect) != null) {
        var subcontrolname = document.getElementById(LstGridColumnIdSelect).innerText.toString();

        for (i = 0; i < subTheme.length; i++) {
            if (subTheme[i].ControlName.toString() == lastOpenControlId && subTheme[i].SubControlName.toString() == subcontrolname) {


                subTheme[i].ControlWidth = ArrGridProperties[lastOpenControlId + "_" + LstGridColumnIdSelect].SizeWidthId;
                //subTheme[i].ControlWidth = "60";
                subTheme[i].ControlType = ArrGridProperties[lastOpenControlId + "_" + LstGridColumnIdSelect].ControlType;
                subTheme[i].BackColor = ArrGridProperties[lastOpenControlId + "_" + LstGridColumnIdSelect].BackColorId;
                subTheme[i].ForeColor = ArrGridProperties[lastOpenControlId + "_" + LstGridColumnIdSelect].ForeColorId;
                subTheme[i].FontName = ArrGridProperties[lastOpenControlId + "_" + LstGridColumnIdSelect].FontNameId;
                subTheme[i].FontSize = ArrGridProperties[lastOpenControlId + "_" + LstGridColumnIdSelect].FontSizeId;
                subTheme[i].FontStyle = ArrGridProperties[lastOpenControlId + "_" + LstGridColumnIdSelect].FontStyleId;
            }
        }
    }

}


function OpenGridProperties(id, name) {
    //lastOpenControlId = id;
    //debugger;
    if (name != undefined)
        lastOpenControlName = name;
    var obj = ArrGridProperties[lastOpenControlId + "_" + id];
    if (obj != undefined) {

        $('#ControlTypeId').val(obj.ControlType);
        //$('#DisplayTextId').val(obj.DisplayTextId);
        $('#FontNameId').val(obj.FontNameId);
        $('#FontSizeId').val(obj.FontSizeId);

        $('#FontStyleId').val(obj.FontStyleId);


        $('#ForeColorId').val(obj.ForeColorId);
        $('#BackColorId').val(obj.BackColorId);

        $('#SizeWidthId').val(obj.SizeWidthId);

    }
    else {
        //alert('nothing');
        $('#ControlTypeId').val(0);
        $('#FontNameId').val("Tahoma");
        $('#FontSizeId').val("16.5");

        $('#FontStyleId').val(0);
        //$('#BoldId').attr('checked', false);
        //$('#UnderlineId').attr('checked', false);
        //$('#ItalicId').attr('checked', false);
        $('#BackColorId').val('#FFFFFF');
        $('#ForeColorId').val('#000000');

        $('#SizeWidthId').val(200);

        SetArrayGridProperties()

    }
}



function AddTableColumn_Collection(columnValue, givenId) {
    // ADDED value

    if (columnValue != "") {

        tblColumnLabelCnt++;
        tblColumnLabelCnt = typeof givenId !== 'undefined' ? givenId : tblColumnLabelCnt;
        var id = 'GridColumnId_' + tblColumnLabelCnt + '';
        var htm = '';
        htm += '<div id="' + id + '" onclick="TableColumnSelect(\'' + id + '\')"; style="width:100%">' + columnValue + '</div>';
        $("#TableColumnDivId").append(htm);
        $('#TableColumnId').val('');

        //SetArrayGridProperties(id);
    }
}

function getIndexOf(id) {
    var no = 0;

    for (loop = 0; loop < Theme.length; loop++) {
        if (Theme[loop].ControlName.toString() == id.toString()) {
            no = loop;
            return no;
        }
    }
}


function fillData(id) {
    var i;
    //debugger;
    if (id.indexOf("_DataGrid_") != -1) {
        // GRID HANDLING
        $("#TableColumnDivId").empty();
        if (subTheme != null && subTheme != [] && subTheme.length > 0) {
            for (i = 0; i < subTheme.length; i++) {
                if (id.indexOf(subTheme[i].ControlName) > -1) {
                    AddTableColumn_Collection(subTheme[i].SubControlName, subTheme[i].ControlNo);
                    SetGridArrayProperties_fromDB(subTheme[i].ControlName, subTheme[i].ControlNo)
                }
                //if (subTheme[i].ControlName == id) {
                //    AddTableColumn_Collection(subTheme[i].SubControlName, subTheme[i].ControlNo);
                //    SetGridArrayProperties_fromDB(subTheme[i].ControlName, subTheme[i].ControlNo)
                //}
            }
        }
    }
    else if (id.indexOf("_ComboBox_") != -1 || id.indexOf("_ListBox_") != -1) {
        // DROPDOWN AND LISTBOX HANDLING
        $("#cboTableColumnDivId").empty();
        //var pId = id.split('_')
        if (Linedata != null && Linedata != [] && Linedata.length > 0) {
            for (i = 0; i < Linedata.length; i++) {
                if (id.indexOf(Linedata[i].ControlName) > -1)
                    //if (Linedata[i].ControlName == id)
                {
                    var columnid = 'LineColumnId_' + Linedata[i].SerialNo + '';
                    //AddTableColumn_Collection(subTheme[i].SubControlName, subTheme[i].ControlNo)
                    cboAddTableColumn_Collection(Linedata[i].LineValue, columnid)
                }
            }
        }
    }
    else {
        // NOTHING TO DO
    }
}




function SetGridArrayProperties_fromDB(controlName, givenId) {

    var loop = 0;
    var i = 0;
    //debugger;
    for (loop = 0; loop < subTheme.length; loop++) {
        if (subTheme[loop].ControlName.toString() == controlName.toString() && subTheme[loop].ControlNo.toString() == givenId.toString()) {
            i = loop;
            break;
        }
    }
    var obj = {};
    //debugger;
    obj.ControlType = subTheme[i].ControlType;
    obj.FontNameId = subTheme[i].FontName;
    obj.FontSizeId = subTheme[i].FontSize;
    obj.FontStyleId = subTheme[i].FontStyle;

    obj.ForeColorId = subTheme[i].ForeColor;
    obj.BackColorId = subTheme[i].BackColor;

    obj.SizeWidthId = subTheme[i].ControlWidth;
    //obj.SizeWidthId = "60";


    ArrGridProperties[controlName + "_" + 'GridColumnId_' + givenId] = obj;

    //pnl_0_DataGrid_1_GridColumnId_3

}

function subThemeData(columnValue, DBFieldCode) {
    // Grid control
    //debugger;

    if (DBFieldCode != undefined) {
        var no = 0;

        for (loop = 0; loop < subTheme.length; loop++) {
            if (subTheme[loop].ControlName.toString() == lastOpenControlId.toString() && subTheme[loop].SubControlName.toString() == columnValue.toString()) {
                no = loop;
                subTheme[no].IsDB = 1;
                subTheme[no].DBFieldCode = DBFieldCode;
                return;
            }
        }
    }

    var ctrl_Id = lastOpenControlId + "_" + LstGridColumnIdSelect;
    POSSubTheme = {};

    POSSubTheme.ThemeName = ChecklistName;
    POSSubTheme.FormId = parseInt(currentPanel.split("_")[1]);
    //alert(lastOpenControlId);
    POSSubTheme.ControlName = lastOpenControlId;
    POSSubTheme.SubControlName = columnValue;
    POSSubTheme.ControlType = ArrGridProperties[ctrl_Id].ControlType;  //"Label";
    //POSSubTheme.ControlType = Labelbox;

    POSSubTheme.ControlWidth = ArrGridProperties[ctrl_Id].SizeWidthId;
    //POSSubTheme.ControlWidth = "60";


    POSSubTheme.ControlNo = ControlNo;
    POSSubTheme.ControlText = "";
    POSSubTheme.BackColor = ArrGridProperties[ctrl_Id].BackColorId;
    POSSubTheme.ForeColor = ArrGridProperties[ctrl_Id].ForeColorId;
    POSSubTheme.FontName = ArrGridProperties[ctrl_Id].FontNameId;
    POSSubTheme.FontSize = ArrGridProperties[ctrl_Id].FontSizeId;
    POSSubTheme.FontStyle = ArrGridProperties[ctrl_Id].FontStyleId;
    POSSubTheme.IsDB = 0;
    POSSubTheme.DBFieldCode = "";


    subTheme.push(POSSubTheme);
    ControlNo += 1;
}



// DROPDOWN AND LISTBOX DATA HANDLING ================================================
var tbl_cbo_ColumnLabelCnt = 0;

function cboAddTableColumn() {
    //alert('calling');
    var columnValue = $('#cboTableColumnId').val();

    if (columnValue != "") {

        if (check_duplication(columnValue) == true) {
            //alert('already existed.');
            var obj = {};
            obj.title = "Information";
            obj.message = 'already exist';
            showAlertMessage_survey(obj);
            return;
        }

        tbl_cbo_ColumnLabelCnt++;
        var htm = '';
        var id = 'LineColumnId_' + tbl_cbo_ColumnLabelCnt + '';

        htm += '<div id="' + id + '" onclick="TableColumnSelect_Data_Line(\'' + id + '\')";  style="width:100%">' + columnValue + '</div>';
        $("#cboTableColumnDivId").append(htm);
        $('#cboTableColumnId').val('');
        addingLineData(id, columnValue, '');
    }
}

//function EditcboAddTableColumn() {
//    tbl_cbo_ColumnLabelCnt = 0;
//    for (var i = 0; i < Linedata.length; i++) {
//        var columnValue = Linedata[i].LineValue;
//        if (columnValue != "") {

//            if (check_duplication(columnValue) == true) {
//                alert('already existed.');
//                return;
//            }

//            tbl_cbo_ColumnLabelCnt++;
//            var htm = '';
//            var id = Linedata[i].CONTROL_ID; //'LineColumnId_' + tbl_cbo_ColumnLabelCnt + '';

//            htm += '<div id="' + id + '" onclick="TableColumnSelect_Data_Line(\'' + id + '\')";  style="width:100%">' + columnValue + '</div>';
//            $("#cboTableColumnDivId").append(htm);
//            $('#cboTableColumnId').val('');
//            //addingLineData(id, columnValue, '');
//        }
//    }
//}

function cboAddTableColumn_Link() {
    //alert('calling');
    var dcontrol = document.getElementById("cboLinkField");
    //debugger;
    if (dcontrol.selectedIndex == -1 || !document.getElementById('chkLinkData').checked) return;

    var columnValue = dcontrol.options[dcontrol.selectedIndex].text

    if (columnValue != "") {

        //if (check_duplication(columnValue) == true) {
        //    alert('already existed.');
        //    return;
        //}

        tbl_cbo_ColumnLabelCnt++;
        var htm = '';
        var id = 'LinkColumnId_' + tbl_cbo_ColumnLabelCnt + '';

        //htm += '<div id="' + id + '" style="width:100%">' + columnValue + '</div>';
        htm += '<div id="' + id + '" onclick="TableColumnSelect_Data_Link(\'' + id + '\')"; style="width:100%"  >' + columnValue + '</div>';
        $("#cboLinkTableColumnDivId").append(htm);
        //$('#cboTableColumnId').val('');
        addingLineData(id, columnValue, 'cboLinkField');
    }
}

function cboAddTableColumn_Collection(columnValue, id) {
    // ADDED value
    if (columnValue != "") {
        tblColumnLabelCnt++;
        tblColumnLabelCnt = typeof givenId !== 'undefined' ? givenId : tblColumnLabelCnt;
        var htm = '';
        //htm += '<div id="' + id + '" style="width:100%">' + columnValue + '</div>';


        //htm += '<div id="' + id + '" onclick="TableColumnSelect_Data_Line(\'' + id + '\')";  style="width:100%">' + columnValue + '</div>';
        //$("#cboTableColumnDivId").append(htm);
        //$('#cboTableColumnId').val('');
        //addingLineData(id, columnValue, '');
        htm += '<div id="' + id + '" onclick="TableColumnSelect_Data_Line(\'' + id + '\')"; style="width:100%">' + columnValue + '</div>';
        $("#cboTableColumnDivId").append(htm);
        $('#cboTableColumnId').val('');
    }
}


function addingLineData(ID, columnValue, LinkDataPassed) {
    // Grid control
    //debugger;
    POSLineData = {};
    //debugger;
    //$('#' + lastOpenControlId).append("<span>" + columnValue + "<br /></span>");
    //newlyadded
    $('#' + lastOpenControlId).append('<div style="text-align: left;"> ' + columnValue + ' <br /></div>');
    //// listbox and dropdown and DataGrid linevalue
    POSLineData.ThemeName = ChecklistName;
    POSLineData.FormId = parseInt(currentPanel.split("_")[1]);
    POSLineData.ControlName = lastOpenControlId;
    if (selected_SubControlName != null && selected_SubControlName != '') {
        POSLineData.SubControlName = selected_SubControlName;
        //selected_SubControlName = '';
    }
    else {
        POSLineData.SubControlName = "";
    }

    POSLineData.CONTROL_ID = ID;
    POSLineData.SerialNo = SerialNo;
    POSLineData.LineValue = columnValue;

    if (LinkDataPassed != '') {
        var dctrl = document.getElementById(LinkDataPassed);
        //var dvalue = dctrl.options[dctrl.selectedIndex].text;
        POSLineData.IsLink = 1;
        POSLineData.LinkControlName = "";
        if (dctrl.selectedIndex != -1) {
            POSLineData.LinkSubControlName = dctrl.options[dctrl.selectedIndex].text;
            POSLineData.LinkFieldCode = dctrl.options[dctrl.selectedIndex].value;
            POSLineData.LineValue = "";
        }
        else {
            POSLineData.LinkSubControlName = "";
            POSLineData.LinkFieldCode = "";
            POSLineData.LineValue = "";
        }
    }
    else {
        //POSLineData.IsLink = 0;
        POSLineData.IsLink = 'false';
        POSLineData.LinkControlName = "";
        POSLineData.LinkSubControlName = "";
        POSLineData.LinkFieldCode = "";

    }


    Linedata.push(POSLineData);
    SerialNo += 1;
}

// LINK DATA REALTED FUNCTIONS STARTS ============================================================

function cboDatabaseField_change() {
    // Link Data Plus Operation
    //debugger;
    var dvalue = null;
    var cvalue = selected_SubControlName;
    var sel = document.getElementById("cboDatabaseField");
    if (sel.selectedIndex != undefined && sel.selectedIndex != -1) {
        dvalue = sel.options[sel.selectedIndex].text;
    }

    //if (dvalue != null)
    //    if (dvalue != "Select") subThemeData(cvalue, dvalue);

    FillExternalCombo(dvalue)

}

function FillExternalCombo(Data) {
    //debugger;
    //var qry = "select FieldSQL from POSDatamap where FieldCode='Item'  and IsPDA =0 ";
    var qry = "select FieldSQL from POSDatamap where FieldCode='" + Data + "'  and IsPDA =0 ";
    //var qry = "select distinct FieldSQL from POSDatamap where FieldCode='" + Data +
    //"'   and IsPDA =0 "
    execute(qry);
    var TableData = executeQry[0].FieldSQL;
    var qry1 = TableData;
    //execute(qry1);
    //alert(TableData);
    executeFieldList(qry1);
    dbDataRows = executeQry;

    //dropDown_Clear("cboTableColumnId");
    var sel = document.getElementById("cboTableColumnDivId");
    if (dbDataRows.length > 0) {
        var length = dbDataRows.length;
        for (var i = 0; i < length; i++) {
            document.getElementById("cboTableColumnId").value = dbDataRows[i].Field;
            //sel.options.add(dbDataRows[i].value);
            cboAddTableColumn();
        }
    }
}

function NewSurvey_Insert(Data, Id) {
//debugger;
    var qry;
    qry = "select ThemeName  from POSTheme where  upper(ThemeName)=upper('" + Id + "') ";
    executeFieldList(qry);
    dbDataRows = executeQry;
    //var TableData1 = executeQry[0].ThemeName;
    if (dbDataRows.length > 0) {
       // alert("Entered New Survey name already have.. Please Enter Different Survey Name -" + Id);

        var obj = {};
        obj.title = "Information";
        obj.message = "Entered New Survey name already have.. Please Enter Different Survey Name -" + Id;
        showAlertMessage_survey(obj);

        document.getElementById('txtNewSurveyName').value = ""
        return;
    }
    else {
        qry = "";
    qry = " Exec usp_SurveyCopy '" + Data + "' ,'" + Id + "'";
    execute(qry);
    var obj = {};
    obj.title = "Information";
    //obj.message = "New Survey Created Successfully -" + Id;
    //showAlertMessage_survey(obj);
    //window.alert("New Survey Created Successfully -" + Id);
        //alert("New Survey Created Successfully -" + Id);

        var obj = {};
        obj.title = "Information";
        obj.message = "New Survey Created Successfully - " + Id;
        showAlertMessage_survey(obj);

    document.getElementById('txtNewSurveyName').value = ""
   // callSurveyListPage()
}
}

function ActiveSurvey_Save(Data, Id, Desc) {
    //debugger;
    var qry;
    qry = "";
    qry = " Update a set  Active= '" + Id + "',Description='" + Desc + "' from POSTheme a where upper(ThemeName) = upper('" + Data + "') ";
    execute(qry)
   // var obj = {};
  //  obj.title = "Information";
    //alert(" Survey Active Status Updated Successfully - " + Data);
    //isAlertOpen = true;

    var obj = {};
    obj.title = "Information";
    obj.message = " Survey Active Status Updated Successfully - " + Data;
    showAlertMessage_survey(obj);

    //document.getElementById('txtNewSurveyName').value = ""
   // while (isAlertOpen == false)
   // callSurveyListPage()
}

function Link_Data_Remove_Operation() {
    // Link Data Remove Operation
}

function Link_Link_Remove_Operation() {
    // Link Link Remove Operation 
}

function Populate_Link_Data_Link() {
    //Populate Link Data while selection of Data Grid Column Value
    ///debugger;

    document.getElementById("chkDatabaseField").checked = false;
    document.getElementById("chkLinkData").checked = false;
    $("#cboTableColumnDivId").empty();
    $("#cboLinkTableColumnDivId").empty();

    for (i12 = 0; i12 < subTheme.length; i12++) {
        if (subTheme[i12].ControlName == lastOpenControlId.toString() && subTheme[i12].IsDB.toString() == "true" && subTheme[i12].SubControlName == selected_SubControlName.toString()) {
            document.getElementById("chkDatabaseField").checked = true;
            dropDown_Fill(document.getElementById("cboDatabaseField"))
            document.getElementById("cboDatabaseField").value = subTheme[i12].DBFieldCode;
        }
    }

    for (i22 = 0; i22 < Linedata.length; i22++) {
        if (Linedata[i22].ControlName == lastOpenControlId.toString() && Linedata[i22].IsLink.toString() == "false" && Linedata[i22].SubControlName == selected_SubControlName.toString()) {
            document.getElementById("chkLinkData").checked = false;
            var htm = '';
            var id = Linedata[i22].CONTROL_ID.toString();
            var columnValue = Linedata[i22].LineValue.toString();

            htm += '<div id="' + id + '" onclick="TableColumnSelect_Data_Line(\'' + id + '\')";  style="width:100%">' + columnValue + '</div>';
            $("#cboTableColumnDivId").append(htm);
        }
        else {
            document.getElementById("chkLinkData").checked = true;
            var htm = '';
            var id = Linedata[i22].CONTROL_ID.toString();
            var columnValue = Linedata[i22].LinkSubControlName.toString();

            //htm += '<div id="' + id + '" style="width:100%">' + columnValue + '</div>';
            htm += '<div  id="' + id + '"  onclick="TableColumnSelect_Data_Link(\'' + id + '\')"; style="width:100%"  >' + columnValue + '</div>';
            $("#cboLinkTableColumnDivId").append(htm);
        }
    }

}


// LINK DATA REALTED FUNCTIONS ENDS ==============================================================

// DROPDOWN AND LISTBOX DATA HANDLING ================================================


function TableColumnSelect(id) {
    //alert(id);
    isColumnSelection = true;
    document.getElementById(id).style.backgroundColor = "blue";
    if (LstGridColumnIdSelect != "" && document.getElementById(LstGridColumnIdSelect) != null)
        document.getElementById(LstGridColumnIdSelect).style.backgroundColor = "";
    LstGridColumnIdSelect = id;
    //debugger;
    var node = document.getElementById(id);
    selected_SubControlName = node.textContent || node.innerText;
    $("#cboTableColumnDivId").empty();
    $("#cboLinkTableColumnDivId").empty();
    Populate_Link_Data_Link();
    OpenGridProperties(id, name);
}


function TableColumnSelect_Data_Line(id) {
    //debugger;
    document.getElementById(id).style.backgroundColor = "blue";
    if (LstLineColumnIdSelect != "" && document.getElementById(LstLineColumnIdSelect) != null) {
        document.getElementById(LstLineColumnIdSelect).style.backgroundColor = "";
    }

    LstLineColumnIdSelect = id;
}


function TableColumnSelect_Data_Link(id) {
    document.getElementById(id).style.backgroundColor = "blue";
    if (LstLinkColumnIdSelect != "" && document.getElementById(LstLinkColumnIdSelect) != null) {
        document.getElementById(LstLinkColumnIdSelect).style.backgroundColor = "";
    }

    LstLinkColumnIdSelect = id;
}

function RemoveTableColumn_Grid_Fields() {
    //debugger;
    //alert($('#' + LstGridColumnIdSelect));
    var columnValue = $("#" + LstGridColumnIdSelect)[0].innerText;
    //alert(lastOpenControlId);

    $('#' + LstGridColumnIdSelect).remove();

    subTheme.forEach(function (item, index) {
        if (item.SubControlName.toString() === columnValue.toString() && item.ControlName.toString() === lastOpenControlId.toString()) {
            subTheme.splice(index, 1);
        }
    });
}

function RemoveTableColumn_Data() {

    var columnValue = $("#" + LstLineColumnIdSelect)[0].innerText;

    //alert(columnValue);
    //alert(LstLineColumnIdSelect);
    //LstLineColumnIdSelect.

    $('#' + LstLineColumnIdSelect).remove();
    //debugger;
    Linedata.forEach(function (item, index) {
        if (item.LineValue.toString() === columnValue.toString() && item.ControlName.toString() === lastOpenControlId.toString()) {
            Linedata.splice(index, 1);
        }
    });
}


// DISABLE ENTIRE DIV ======================================

function disableTest() {

    document.getElementById("TestId").disabled = true;
    var nodes = document.getElementById("TestId").getElementsByTagName('*');
    for (var i = 0; i < nodes.length; i++) {
        nodes[i].disabled = true;
    }

}


function getGridControlNo() {

}


//function showAlertMessage(title, message) {
//    var btns = {};
//    btns["Ok"] = function (e) {
//        $(this).dialog("close");
//    }
//    $('<div></div>').appendTo('body')
//        .html(message).dialog({
//            modal: true, title: title, zIndex: 10000, autoOpen: true,
//            width: '35%', resizable: false,
//            buttons: btns
//        });
//}

// DISABLE ENTIRE DIV ======================================

// GRID RELATED FUNCTIONALITY ENDS HERE =============================================================================



