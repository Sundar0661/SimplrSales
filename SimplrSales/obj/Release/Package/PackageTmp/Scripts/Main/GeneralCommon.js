var ddd = 0;
var _ttbody = '';
var _fieldName = '';
var isDateModified = false;

function isEmpty(value) {
    //Usage:
    //isEmpty(undefined); // true
    //isEmpty(null); // true
    //isEmpty(''); // true
    //isEmpty('foo'); // false
    //isEmpty(1); // false
    //isEmpty(0); // false
    return typeof value == 'string' && !value.trim() || typeof value == 'undefined' || value === null;
}


$(document).ready(function () {
    // $(".allownumericwithdecimal").on("keypress keyup blur", function (event) {
    $(".decimalOnly").on("keypress keyup blur", function (event) {
        //this.value = this.value.replace(/[^0-9\.]/g,'');
        $(this).val($(this).val().replace(/[^0-9\.]/g, ''));
        if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
    });

    $(".mobilenumber").on("blur", function () {
        var mobNum = $(this).val();
        var filter = /^\d*(?:\.\d{1,2})?$/;
        if (filter.test(mobNum)) {
            if (mobNum.length == 10) {
            } else {
                ShowMessage('Mobile number entered doesnot have 10 digits');
                $(this).val('');
                // $(this).focus();
                //  return false;
            }
        }
        else {
            ShowMessage('Not a valid Phone number');
            $(this).val('');
            $(this).focus();
            return false;
        }
    });


    // $(".allownumericwithoutdecimal").on("keypress keyup blur", function (event) {
    $(".numbersOnly").on("keypress keyup blur", function (event) {
        $(this).val($(this).val().replace(/[^\d].+/, ""));
        if ((event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
    });
});


function numbersOnly() {
    $(".numbersOnly").on("keypress keyup blur", function (event) {
        $(this).val($(this).val().replace(/[^\d].+/, ""));
        if ((event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
    });
}

function decimalOnly() {
    $(".decimalOnly").on("keypress keyup blur", function (event) {
        //this.value = this.value.replace(/[^0-9\.]/g,'');
        $(this).val($(this).val().replace(/[^0-9\.]/g, ''));
        if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
    });
}

//================================================================================================================================

$(document).ready(function () {
    // $(".allownumericwithdecimal").on("keypress keyup blur", function (event) {
    $(".folat").on("keypress keyup blur", function (event) {
        //this.value = this.value.replace(/[^0-9\.]/g,'');
        $(this).val($(this).val().replace(/[^0-9\.]/g, ''));
        if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
    });

    $(".decimal").on("keypress keyup blur", function (event) {
        //this.value = this.value.replace(/[^0-9\.]/g,'');
        $(this).val($(this).val().replace(/[^0-9\.]/g, ''));
        if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
    });

    $(".mobilenumber").on("blur", function () {
        var mobNum = $(this).val();
        var filter = /^\d*(?:\.\d{1,2})?$/;
        if (filter.test(mobNum)) {
            if (mobNum.length == 10) {
            } else {
                ShowMessage('Mobile number entered doesnot have 10 digits');
                $(this).val('');
                // $(this).focus();
                //  return false;
            }
        }
        else {
            ShowMessage('Not a valid Phone number');
            $(this).val('');
            $(this).focus();
            return false;
        }
    });
});

function select2() {
    $('.select2').select2({
        closeOnSelect: false,
        allowClear: false
    });
}
function intOnly() {
    $(".int").on("keypress keyup blur", function (event) {
        $(this).val($(this).val().replace(/[^\d].+/, ""));
        if ((event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
    });
}

function floatOnly() {
    $(".float").on("keypress keyup blur", function (event) {
        //this.value = this.value.replace(/[^0-9\.]/g,'');
        $(this).val($(this).val().replace(/[^0-9\.]/g, ''));
        if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
    });
}


function decimalOnly() {
    $(".decimal").on("keypress keyup blur", function (event) {
        //this.value = this.value.replace(/[^0-9\.]/g,'');
        $(this).val($(this).val().replace(/[^0-9\.]/g, ''));
        if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
    });
}

function emailOnly() {
    $(".email").on("blur", function (event) {
        var re = /^\w+([-+.'][^\s]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        var emailFormat = re.test($(this).val());
        if (re.test($(this).val()) == false) {
            $(this).val('');
            alert("Please enter valid e mail addess");
        }
    });
}

var DateFormatString = ''; var TimeFormatString = ''; var DateTimeFormatString = '';

var _format = 'MM/DD/YYYY';//'MM/DD/YYYY hh:mm:ss'


function DatePicker(defaultShow) {
    var id = '';
    var dataMenberType = '';
    var format = 'MM/DD/YYYY';//'MM/DD/YYYY hh:mm:ss'
    if (DateFormatString == '' && TimeFormatString == '' && DateTimeFormatString == '') {
        var qry = "select DateFormatString, TimeFormatString, DateTimeFormatString from system";
        execute(qry);
        DateFormatString = executeQry[0].DateFormatString;
        TimeFormatString = executeQry[0].TimeFormatString;
        DateTimeFormatString = executeQry[0].DateTimeFormatString;

        DateFormatString = DateFormatString.toLowerCase() == "dd/mm/yyyy" ? "DD/MM/YYYY" : "MM/DD/YYYY";
        // TimeFormatString = TimeFormatString.toLowerCase() == "hh:mm:ss tt" ? "hh:mm:ss tt" : "hh:mm:ss tt";
        DateTimeFormatString = DateTimeFormatString.toLowerCase() == "dd/mm/yyyy hh:mm:ss" ? "DD/MM/YYYY hh:mm:ss" : "MM/DD/YYYY hh:mm:ss";
    }
    else
        DateFormatString = DateFormatString.toLowerCase() == "dd/mm/yyyy" ? "DD/MM/YYYY" : "MM/DD/YYYY";

    for (var i = 0; i < DateTimeIdList.length; i++) {
        id = DateTimeIdList[i].DataMember;
        if (DateTimeIdList[i].DataMemberType.toLowerCase() == "date")
            format = DateFormatString;
        else if (DateTimeIdList[i].DataMemberType.toLowerCase() == "time")
            format = TimeFormatString;
        else if (DateTimeIdList[i].DataMemberType.toLowerCase() == "datetime")
            format = DateTimeFormatString;
        _format = format;
        if (id == "ToDate1") {
            var dateToday = new Date();

            $('#' + id).datetimepicker({
                // showSecond: true,
                defaultDate: new Date(),
                format: format,
                minDate: dateToday,
                //onSelect: function (selected) {
                //    $("#FromDate").datetimepicker("option", "minDate", selected)
                //},
            }).on('dp.change', function (ev) {
                jQuery('#FromDate').datetimepicker({ minDate: ev.date._d });

                DateTimePickerChangeFuction(ev.date._d, ev.target.id, "onChange");//your function call
            });
        }

        else {
            try {
                $('#' + id).datetimepicker({
                    // showSecond: true,
                    defaultDate: new Date(),
                    format: format,
                }).on('dp.change', function (ev) {
                    DateTimePickerChangeFuction(ev.date._d, ev.target.id, "onChange");//your function call
                });
            } catch (e) {

            }
        }

        // COMMENTED BELOW 25.09.2020 ===================
        //DateTimePickerChangeFuction(new Date(), id, "")
        // MODIFIED RECORDS SHOULD LOAD BASED ON CURRENT DATES
        DateTimePickerChangeFuction(new Date(), id, "onChange");
        //if (defaultShow != "No")
        //    $('#' + id).val(new Date());
        //DateFormateChange1($('#id').val(), id);
    }
}

function DateTimePickerChangeFuction(dat, id, dtChangeaction) {
    //if (id == "ToDate") {
    //    //var startDate = new Date($('#FromDate').val());
    //    //var endDate = new Date($('#' + id).val());

    //    var startDate = $('#FromDate').val();
    //    var endDate = $('#' + id).val();

    //    if (_format.toLowerCase().indexOf("dd") == 0) {
    //        startDate = DateFormateChangeDDMM("dd/mm/yyyy", startDate);
    //        endDate = DateFormateChangeDDMM("dd/mm/yyyy", endDate);
    //    }
    //    else if (_format.toLowerCase().indexOf("mm") == 0) {
    //        startDate = DateFormateChangeDDMM("mm/dd/yyyy", startDate);
    //        endDate = DateFormateChangeDDMM("mm/dd/yyyy", endDate);
    //    }

    //    startDate = new Date(startDate);
    //    endDate = new Date(endDate);



    //    if (Date.parse(startDate) > Date.parse(endDate)) {
    //        alert("ToDate Must be greater than FromDate!");
    //        //var obj = {};
    //        //obj.title = "Alert";
    //        //obj.message = "ToDate Must be greater than FromDate!";
    //        //showAlertMessage(obj);

    //        $('#' + id).val("");
    //        document.getElementById(id).setAttribute("data-act", "");
    //        return;
    //    }

    //}
    //var val = dbDateFormatSQLite(dat.date._d);
    var val = dbDateFormatSQLite(dat);
    // document.getElementById(dat.target.id).setAttribute("data-act", val);
    document.getElementById(id).setAttribute("data-act", val);

    $("#" + id).blur();

    if (dtChangeaction.toLowerCase() == "onchange" && isDateModified == false) {
        var _obj = {};
        _obj.fieldName = id;
        _obj.value = $("#" + id).val();
        PerformAction('datePickerChanged', _obj);
    }
}

function ListDateTimePickerChangeFuction(dat, id, dtChangeaction) {
    // var val = dbDateFormatSQLite(dat);
    //document.getElementById(id).setAttribute("data-act", val);
    var rowIndex = id.replace(new RegExp("[A-Z]", "g"), "").replace(new RegExp("[a-z]", "g"), "");
    var dataMember = id.replace(new RegExp("[0-9]", "g"), "");

    //_ttableId = ttableId;
    //_ttbody = ttbody;

    setListValue("", dataMember, rowIndex, _ttbody);
    currentRowClickCount = rowIndex;

    var _obj = {};

    _obj.fieldName = dataMember;
    _obj.value = $("#" + id).val();
    PerformAction('listDatePickerChanged', _obj);
}

//function DatePickerOld(defaultShow) {



function listDatePicker_old(defaultShow) {
    //$(".datepickerList").datetimepicker({
    //    // showSecond: true,
    //    defaultDate: new Date(),
    //    format: "mm/dd/yy",
    //}) ;



    $(".datepickerList").datepicker({
        //timeFormat:  "hh:mm:ss",
        // COMMENTED 22.03.2021
        //dateFormat: "mm/dd/yy",
        dateFormat: "mm/dd/yy",
        // dateFormat: "h:mm",
        changeMonth: true,
        changeYear: true,
        yearRange: "-60:+60",
        setDate: new Date()
    });
    if (false) {
        for (var i = 0; i < DateTimeIdGridList.length; i++) {
            id = DateTimeIdGridList[i].DataMember;
            $('#' + id).datepicker({
                dateFormat: "mm/dd/yy",
                changeMonth: true,
                changeYear: true,
                yearRange: "-60:+60",
                showButtonPanel: true,
            });
            if (defaultShow != "No")
                $(".datepicker").datepicker().datepicker("setDate", new Date());
        }
    }
    //todo
    //$(".datepicker").datepicker({
    //    //showOn: "button",
    //    //buttonImage: "images/calendar.gif",
    //    //buttonImageOnly: true,
    //    //buttonText: "Select date",
    //    dateFormat: "mm/dd/yy",
    //    // dateFormat: "dd/mm/yy",
    //    // format: 'L("dd MMM yyyy, HH:MM")'
    //    // dateFormat: "h:mm ",
    //    // timeFormat: "hh:mm:ss",
    //    // dateFormat: "dd/mm/yy",
    //    changeMonth: true,
    //    changeYear: true,
    //    yearRange: "-60:+60",
    //    showButtonPanel: true,
    //    //setDate: new Date()
    //    //setDate: "10/10/2018"
    //});
    //if (defaultShow != "No")
    //    $(".datepicker").datepicker().datepicker("setDate", new Date());
}



function listDatePicker(defaultShow) {
    //$(".datepickerList").datetimepicker({
    //    // showSecond: true,
    //    defaultDate: new Date(),
    //    format: "mm/dd/yy",
    //}) ;


    var qry = "select DateFormatString, TimeFormatString, DateTimeFormatString from system";
    execute(qry);
    var DateFormatString = executeQry[0].DateFormatString;
    var fString = '';

    if (DateFormatString.toString().toLowerCase() == "dd/mm/yyyy") {
        fString = "dd/mm/yy";
        _format = "DD/MM/YYYY";
    }
    else {
        fString = "mm/dd/yy";
        _format = "MM/DD/YYYY";
    }

    $(".datepickerList").datepicker({
        dateFormat: fString,
        //dateFormat: "h:mm",
        changeMonth: true,
        changeYear: true,
        yearRange: "-60:+60",
        setDate: new Date(),
        onSelect: function (d, i) {
            ListDateTimePickerChangeFuction(d, i.id, "onChange");
        }
    });

    //ListDateTimePickerChangeFuction(new Date(), DateTimeIdGridList[0].DataMember, "onChange");
    if (false) {
        for (var i = 0; i < DateTimeIdGridList.length; i++) {
            id = DateTimeIdGridList[i].DataMember;
            $('#' + id).datepicker({
                dateFormat: "mm/dd/yy",
                changeMonth: true,
                changeYear: true,
                yearRange: "-60:+60",
                showButtonPanel: true,
            });
            if (defaultShow != "No")
                $(".datepicker").datepicker().datepicker("setDate", new Date());
        }
    }
    //todo
    //$(".datepicker").datepicker({
    //    //showOn: "button",
    //    //buttonImage: "images/calendar.gif",
    //    //buttonImageOnly: true,
    //    //buttonText: "Select date",
    //    dateFormat: "mm/dd/yy",
    //    // dateFormat: "dd/mm/yy",
    //    // format: 'L("dd MMM yyyy, HH:MM")'
    //    // dateFormat: "h:mm ",
    //    // timeFormat: "hh:mm:ss",
    //    // dateFormat: "dd/mm/yy",
    //    changeMonth: true,
    //    changeYear: true,
    //    yearRange: "-60:+60",
    //    showButtonPanel: true,
    //    //setDate: new Date()
    //    //setDate: "10/10/2018"
    //});
    //if (defaultShow != "No")
    //    $(".datepicker").datepicker().datepicker("setDate", new Date());
}

function SearchDatePicker(defaultShow) {

    var date_format = "";
    var dteformat = systemTableConfig["DATEFORMATSTRING"].toString().toLowerCase();
    if (dteformat == "dd/mm/yyyy") {
        date_format = "dd/mm/yy";
    }
    else {
        date_format = "mm/dd/yy";
    }

    $(".searchdatepicker").datepicker({
        //showOn: "button",
        //buttonImage: "images/calendar.gif",
        //buttonImageOnly: true,
        //buttonText: "Select date",

        // COMMENTED 28/10/2020 =====
        //dateFormat: "mm/dd/yy",
        dateFormat: date_format,


        // dateFormat: "dd/mm/yy",
        // format: 'L("dd MMM yyyy, HH:MM")'
        // dateFormat: "h:mm ",
        // timeFormat: "hh:mm:ss",
        // dateFormat: "dd/mm/yy",
        changeMonth: true,
        changeYear: true,
        yearRange: "-60:+60",
        showButtonPanel: true,
        //setDate: new Date()
        //setDate: "10/10/2018"
    });
    if (defaultShow != "No")
        $(".datepicker").datepicker().datepicker("setDate", new Date());
}

function MonthPicker() {
    $('.monthpicker').empty();
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var valueText = '';
    valueText += '<option selected="selected" disabled="true">--Select--</option>';
    for (var i = 0; i < months.length; i++) {
        valueText += "<option value='" + (i + 1) + "'>" + months[i] + "</option>";
    }
    $(valueText).appendTo('.monthpicker');
    $('.monthpicker').val((new Date).getUTCMonth() + 1);

}
function YearPicker() {
    var startYear = '';
    var endYear = '';
    if (_YearPickerLimit == "") {
        startYear = parseInt((new Date).getFullYear() - 1);
        endYear = parseInt((new Date).getFullYear() + 49);
    }
    else {
        startYear = parseInt(_YearPickerLimit.split('-')[0]);
        endYear = parseInt(_YearPickerLimit.split('-')[1]);
    }

    $('.yearpicker').yearselect({
        //selected: 2016,
        //start: 2000,
        start: startYear,
        end: endYear,
    });
    $('.yearpicker').val((new Date).getFullYear());
}

function listTimePicker(defaultShow) {

    $('.listtimepicker').datetimepicker({
        //use24hours: true,
        //format: "HH:mm:ss",
        format: 'LT'
    }).on('dp.change', function (ev) {
    });
    //$('#Time0').timepicki();
}

function TimePicker(defaultShow) {

    $('.timepicker').datetimepicker({
        // use24hours: true,
        format: "HH:mm:ss",
        //format: 'LT'
    }).on('dp.change', function (ev) {
        //DateTimePickerChangeFuction(ev);//your function call
    });


    //$('.timepicker').timepicker({
    //    // use24hours: true,
    //    //timeFormat: 'hh:mm:ss p',//12hours format
    //    timeFormat: 'HH:mm:ss', //24 hours format
    //    //interval: 60,
    //    //minTime: '10',
    //    //maxTime: '6:00pm',
    //    //defaultTime: '11',
    //    ////startTime: '10:00',
    //    dynamic: false,
    //    dropdown: true,
    //    scrollbar: true,

    //    startTime: '00:00:00',
    //    maxHour: 23,
    //    maxMinutes: 45,
    //    // startTime: new Date(0, 0, 0, 15, 0, 0), // 3:00:00 PM - noon
    //    interval: 15 // 15 minutes


    //});

    //$('.timepicker').datetimepicker({
    //    //format: 'HH:mm:ss'
    //    timeFormat: "hh:mm:ss",
    //});
}

function quoteReplace(data) {
    if (data != undefined) {
        data = data.replace(/&lt;/g, "<");
        data = data.replace(/&gt;/g, ">");
        data = data.replace(/&quot;/g, '"');
        data = data.replace(/&#39;/g, "'");
        return data;
    }
}

function DateFormateChange1(date, id) {
    // _objArray.arrForm
    var format = '';
    for (var n = 0; n < DateTimeCheckId.length; n++) {
        if (DateTimeCheckId[n].DataMember == id) {
            format = DateTimeCheckId[n].DataMemberType;
            n = DateTimeCheckId.length + 1;
        }
    }

    //dd/MM/yyyy	
    //hh:mm:ss tt	
    //dd/MM/yyyy HH:mm:ss

    if (date != "" && date != undefined) {
        var d = '', m = '', y = '';
        if (date.split('/').length >= 3) {
            if (format.toLowerCase() == "dd/mm/yyyy") {
                d = date.split('/')[0];
                m = date.split('/')[1];
                y = date.split('/')[2];
            }
            else {
                m = date.split('/')[0];
                d = date.split('/')[1];
                y = date.split('/')[2];
            }
        }
        else if (date.split('-').length >= 3) {
            if (format.toLowerCase() == "dd/mm/yyyy") {
                d = date.split('-')[0];
                m = date.split('-')[1];
                y = date.split('-')[2];
            }
            else {
                m = date.split('-')[0];
                d = date.split('-')[1];
                y = date.split('-')[2];
            }
        }
        else if (date.split('.').length >= 3) {
            if (format.toLowerCase() == "dd/mm/yyyy") {
                d = date.split('.')[0];
                m = date.split('.')[1];
                y = date.split('.')[2];
            }
            else {
                m = date.split('.')[0];
                d = date.split('.')[1];
                y = date.split('.')[2];
            }
        }
        return y + "-" + m + "-" + d;
    }
    return data;
}

function DateFormateChangeDDMM(format, date) {
    if (date != "" && date != undefined) {
        var d = '', m = '', y = '';
        if (date.split('/').length >= 3) {
            if (format.toLowerCase() == "dd/mm/yyyy") {
                d = date.split('/')[0];
                m = date.split('/')[1];
                y = date.split('/')[2];
            }
            else {
                m = date.split('/')[0];
                d = date.split('/')[1];
                y = date.split('/')[2];
            }
        }
        else if (date.split('-').length >= 3) {
            if (format.toLowerCase() == "dd/mm/yyyy") {
                d = date.split('-')[0];
                m = date.split('-')[1];
                y = date.split('-')[2];
            }
            else {
                m = date.split('-')[0];
                d = date.split('-')[1];
                y = date.split('-')[2];
            }
        }
        else if (date.split('.').length >= 3) {
            if (format.toLowerCase() == "dd/mm/yyyy") {
                d = date.split('.')[0];
                m = date.split('.')[1];
                y = date.split('.')[2];
            }
            else {
                m = date.split('.')[0];
                d = date.split('.')[1];
                y = date.split('.')[2];
            }
        }
        if (_format.toLowerCase().indexOf("hh:mm:ss") == 11 && y.split(' ').length == 2) {
            //return y.split(' ')[0] + "-" + m + "-" + d + " " + y.split(' ')[1];
            return m + "-" + d + "-" + y.split(' ')[0] + " " + y.split(' ')[1];
        }
        else
            return y + "-" + m + "-" + d;
    }
    return date;
}

function DatePickerFormateChangeDDMM(format, date) {
    if (date != "" && date != undefined) {
        var d = '', m = '', y = '';
        if (date.split('/').length >= 3) {
            if (format.toLowerCase() == "dd/mm/yyyy") {
                d = date.split('/')[0];
                m = date.split('/')[1];
                y = date.split('/')[2];
            }
            else {
                m = date.split('/')[0];
                d = date.split('/')[1];
                y = date.split('/')[2];
            }
        }
        else if (date.split('-').length >= 3) {
            if (format.toLowerCase() == "dd/mm/yyyy") {
                d = date.split('-')[0];
                m = date.split('-')[1];
                y = date.split('-')[2];
            }
            else {
                m = date.split('-')[0];
                d = date.split('-')[1];
                y = date.split('-')[2];
            }
        }
        else if (date.split('.').length >= 3) {
            if (format.toLowerCase() == "dd/mm/yyyy") {
                d = date.split('.')[0];
                m = date.split('.')[1];
                y = date.split('.')[2];
            }
            else {
                m = date.split('.')[0];
                d = date.split('.')[1];
                y = date.split('.')[2];
            }
        }
        return m + "-" + d + "-" + y;
    }
    return date;
}


// COMMENTED ON 04.12.2020 ====
function DateFormateChange_Format(format, date) {
    if (date != "" && date != undefined) {
        var d = '', m = '', y = '';
        if (date.split('/').length >= 3) {
            if (format.toLowerCase() == "dd/mm/yyyy") {
                d = date.split('/')[0];
                m = date.split('/')[1];
                y = date.split('/')[2];
            }
            else {
                m = date.split('/')[0];
                d = date.split('/')[1];
                y = date.split('/')[2];
            }
        }
        else if (date.split('-').length >= 3) {
            if (format.toLowerCase() == "dd/mm/yyyy") {
                d = date.split('-')[0];
                m = date.split('-')[1];
                y = date.split('-')[2];
            }
            else {
                m = date.split('-')[0];
                d = date.split('-')[1];
                y = date.split('-')[2];
            }
        }
        else if (date.split('.').length >= 3) {
            if (format.toLowerCase() == "dd/mm/yyyy") {
                d = date.split('.')[0];
                m = date.split('.')[1];
                y = date.split('.')[2];
            }
            else {
                m = date.split('.')[0];
                d = date.split('.')[1];
                y = date.split('.')[2];
            }
        }
        return y + "-" + m + "-" + d;
    }
    return date;
}
function DateFormateChange(date) {
    if (date != "" && date != undefined) {
        var d = '', m = '', y = '';
        if (date.split('/').length >= 3) {
            m = date.split('/')[0];
            d = date.split('/')[1];
            y = date.split('/')[2];
        }
        else if (date.split('-').length >= 3) {
            m = date.split('-')[0];
            d = date.split('-')[1];
            y = date.split('-')[2];
        }
        else if (date.split('.').length >= 3) {
            m = date.split('.')[0];
            d = date.split('.')[1];
            y = date.split('.')[2];
        }
        return y + "-" + m + "-" + d;
    }
    return data;
}

function DateFormateChangeUIC(date) {
    if (date != "" && date != undefined) {
        var d = '', m = '', y = '';
        if (date.split('/').length >= 3) {
            d = date.split('/')[0];
            m = date.split('/')[1];
            y = date.split('/')[2];
        }
        else if (date.split('-').length >= 3) {
            d = date.split('-')[0];
            m = date.split('-')[1];
            y = date.split('-')[2];
        }
        else if (date.split('.').length >= 3) {
            d = date.split('.')[0];
            m = date.split('.')[1];
            y = date.split('.')[2];
        }
        return d + "/" + m + "/" + y;
    }
    return data;
}

function FromDateFormate(date) {
    return date + " 00:00:00";
}
function ToDateFormate(date) {
    return date + " 23:59:59";
}





//////////////////////////////////

function selectedRow() {
    var index;
    table = document.getElementById("table_" + CurrentScreen_TabScreen_Name + "_" + FieldName);
    for (var i = 0; i < table.rows.length; i++) {
        table.rows[i].onclick = function (event) {
            if (typeof index !== "undefined") {
                table.rows[index].classList.toggle("selected");
            }
            index = this.rowIndex;
            this.classList.toggle("selected");
            //  console.log(index);
        }
    }
}

function replaceHashSymbol(data) {
    data = data.replace(/#/g, 'hashsymbol');
    return data;
}
function ReplaceSpecialCharacter(data) {

    data = data.replace(/&amp;/g, 'ampersandsymbol');

    data = data.replace(/&/g, 'ampersandsymbol');
      
    data = data.replace(/#/g, 'hashsymbol');
    data = data.replace(/\+/g, 'plussymbol');
    return data;
}
function ReplaceStringtoSpecialCharacter(data) {
    if (data != null) {
        data = data.replace(/ampersandsymbol/g, '&');
        data = data.replace(/hashsymbol/g, '#');
        data = data.replace(/plussymbol/g, '+');
    }
    return data;
}

////////////////////////


var DropDownIdValueList = [];
var ListDataCount = 0;
function SetListData(ttbody, tfoot, scrName, pageNumber, SearchId, fieldName, actionType, result) {
    data = result.List;
    ListDataCount = 0;
    bColorConfig = IsColorConfig(scrName);
    sColorCondFieldArr = [];
    if (bColorConfig == true) {
        try {
            sCondArr = [];
            sCondArr = getList['ColorConfig_' + scrName];
            if (sCondArr == null || sCondArr == undefined || sCondArr == '') {
                sCondArr = [];
            }
            if (sCondArr.length > 0) {
                var sCondArrlength = sCondArr.length;
                for (var condCtr = 0; condCtr < sCondArrlength; condCtr++) {
                    tmpFieldVal = sCondArr[condCtr].FieldName;
                    sColorCondFieldArr.push(tmpFieldVal.toUpperCase());
                }
            }
            sCondArr = [];
        } catch (e) { }
    }

    ///
    var vBackColor = '';
    var returnColor = '';
    var isRBC = false;//isRowBackroundColor
    DropDownIdValueList = [];
    var currentIndex = 0;
    //data = result.List;
    countRows = result.countRows == "" ? 0 : $.parseJSON(result.countRows)[0].cnt;
    if (data != "" && data != null && data != "[]") {
        data = $.parseJSON(data);

        try {
            var div_id = ttbody.replace("ListBodyDivId_", "tableDiv_");
            var row_count = data.length + 1;
            var tbl_size = 0;
            if (row_count >= 9)
                tbl_size = 550;
            else {
                if (isEditScreen == "yes")
                    tbl_size = row_count * 100;
                else {
                    tbl_size = row_count * 45;
                    tbl_size = tbl_size + 100;
                }
            }

            var ele = document.getElementById(div_id);
            ele.style.height = tbl_size + "px";

            isEditScreen = "no";
        }
        catch { }

        if (data != null) {
            countRows = result.countRows == "" ? 0 : $.parseJSON(result.countRows)[0].cnt;
            ListDataCount = data.length;

            //CreateList(ttbody, tfoot, scrName, pageNumber, SearchId, fieldName, actionType, result);

            var listConfig = ListHeaderList['ListConfig_' + ttbody];
            var tblbody = document.getElementById(ttbody);
            if (tblbody == null)
                return;
            var iscreate = tblbody.rows.length == 0 ? true : false;
            var tdType = '';
            var id = '';
            var value = '';
            var dataMemberType = '';
            var dataValue = '';
            var bgcolor = '';
            var color = '';
            var dataValue = '';
            if (data.length > 0) {
                PageLoadinginfo("ListConfig listvalue execute query forloop start");
                var tmpLine = "";
                for (var i = 0; i < data.length; i++) {
                    tmpLine = "Line No: " + i.toString();

                    isRBC = false;
                    //vBackColor = getColorConfig(scrName, listConfig[j].DataMember, value, data[i]);
                    // vBackColor = getColorConfig(scrName, 'RowColor', '', data[i]);
                    //vBackColor = getColorConfig(scrName, listConfig[j].DataMember, value, data[i]);
                    ///Create new row
                    if (iscreate == true) {
                        CreateList(ttbody, tfoot, scrName, pageNumber, SearchId, fieldName, actionType, result, "", vBackColor);
                        try {
                           if (swap_ttbody == ttbody)
                                rowRefresh(swap_ttbody);
                        } catch (err) {

                        }
                    }
                    iscreate = true;
                    ///

                    currentIndex = addCount;
                    paginationCount = i;

                    if (bColorConfig == true && sColorCondFieldArr.indexOf("ROWCOLOR") > -1) {
                        //removeA(sColorCondFieldArr, 'ROWCOLOR');
                        var returnColor = getColorConfig(scrName, 'RowColor', '', data[i]);
                        if (returnColor.split('~')[0] != "") {
                            tblbody.rows[currentIndex].style.backgroundColor = returnColor.split('~')[0];
                            tblbody.rows[currentIndex].style.color = returnColor.split('~')[1];
                            //document.getElementById(id).style.backgroundColor = '#003F87';
                            //document.getElementById("Item0").style.color = 'white';

                            isRBC = true;
                        }
                    }

                    //var flg = false;
                    var tmpText = "";

                    for (var j = 0; j < listConfig.length; j++) {
                        
                        
                        // data[i].
                        dataMemberType = listConfig[j].DataMemberType;
                        // id = listConfig[j].DataMember.replace("[", "").replace("]", "");
                        id = listConfig[j].DataMember;
                        //newly add byM 17.01.2022
                        if (id == "[LineNo]") {
                            var lineId = id.replace("[", "").replace("]", "");
                            value = data[i][lineId] == null || data[i][lineId] == undefined ? "" : data[i][lineId];
                        }
                        else {
                            //if(id != "Rating1")
                            value = data[i][id] == null || data[i][id] == undefined ? "" : data[i][id];
                        }

                        tmpLine = tmpLine + ", " + id + ": " + value;

                        //if (id == "GroupName") {
                        //    debugger;
                        //}


                        //getColorConfig(screenName, 'RowColor', '', item);
                        for (var n = 0; n < DropDownIdList.length; n++) {
                            if (DropDownIdList.length > 0 && DropDownIdList[n].DataMember == id) {
                                // DropDownIdList = [];
                                comboboxdata = {};
                                comboboxdata.DataMember = id;
                                comboboxdata.Value = value;
                                DropDownIdValueList.push(comboboxdata);
                                //  GetListDropDownListValue(scrName, FieldName, ttbody, addCount);
                            }
                        }

                        tdType = tblbody.rows[currentIndex] == undefined ? "" : tblbody.rows[currentIndex].cells.namedItem(id) == null ? "" : getTableRowTDType(tblbody.rows[currentIndex].cells.namedItem(id).innerHTML);

                        //pvmigt SYSTEMLIST
                        //try {
                        //    if (scrName.toLowerCase() == "systemlistlist" && listConfig[j].DataMember == "Code" && value == "RevistGeoFencing")
                        //        flg = true;
                        //    else if (flg == true && scrName.toLowerCase() == "systemlistlist" && listConfig[j].DataMember == "SystemValue") {
                        //        tblbody.rows[currentIndex].cells.namedItem(id).innerHTML = '<input type="checkbox" id="' + listConfig[j].DataMember + '"  onclick="listCheckBoxClickFunction(this,\'' + listConfig[j].FieldName + '\',' + currentIndex + ');listCheckBoxValueChanged(this,\'' + listConfig[j].FieldName + '\',' + j + ',\'' + $('#' + listConfig[j].DataMember).val() + '\');" value="">';
                        //        tdType = "checkbox";
                        //        flg = false;
                        //    }
                        //} catch (err) {

                        //}
                           

                        if (bColorConfig == true && isRBC == false && sColorCondFieldArr.indexOf(listConfig[j].DataMember.toUpperCase()) > -1) {
                            var returnColor = getColorConfig(scrName, listConfig[j].DataMember, value, data[i]);
                            tblbody.rows[currentIndex].cells.namedItem(id).style.backgroundColor = returnColor.split('~')[0];
                            tblbody.rows[currentIndex].cells.namedItem(id).style.color = returnColor.split('~')[1];
                        }
                        if (tdType == "text" || tdType == "select" || tdType == "hidden") {
                            if (dataMemberType == 'NUMBERFORMAT' || dataMemberType == 'AMOUNTNUMBERFORMAT') {
                                dataValue = GetNumberAndAmountNumberFormat(value, dataMemberType);
                                tblbody.rows[currentIndex].cells.namedItem(id).childNodes['0'].value = dataValue;
                            }
                            else {
                                if (bColorConfig == true && isRBC == false && sColorCondFieldArr.indexOf(listConfig[j].DataMember.toUpperCase()) > -1) {
                                    tblbody.rows[currentIndex].cells.namedItem(id).style.backgroundColor = getColorConfig(scrName, listConfig[j].DataMember, value, data[i]).split('~')[0];
                                }
                                else if (bColorConfig == true && isRBC == true && sColorCondFieldArr.indexOf("ROWCOLOR") > -1) {
                                    tblbody.rows[currentIndex].cells.namedItem(id).style.backgroundColor = getColorConfig(scrName, "RowColor", "", data[i]).split('~')[0];
                                }
                                tblbody.rows[currentIndex].cells.namedItem(id).childNodes['0'].value = value;

                             //  if (tdType == "text" && id == "Link" && value != "")
                                // tblbody.rows[currentIndex].cells.namedItem(id).childNodes['0'].onblur();
                                //try {
                                //    if (scrName == "SalesOrderForm" && listConfig[j].FieldControl == "AUTOLOOKUP" && value != "") {
                                //        tblbody.rows[currentIndex].cells.namedItem(id).childNodes['0'].disabled = true;
                                //        tblbody.rows[currentIndex].cells.namedItem(id).childNodes['1'].disabled = true;
                                //    }
                                //} catch (eauto) {

                                //}

                                tmpText = value;
                            }
                        }
                        else if (tdType == "starrating") {
                            gfg(ttbody, id, i, value);
                        }
                        else if (tdType == "starratingoutput") {

                        }
                        else if (tdType == "tabtext") {
                            try {
                                document.getElementById('hdr_' + id + '_' + (i + 1)).innerText = value.split('@')[0];
                                document.getElementById('val_' + id + '_' + (i + 1)).innerText = value.split('@')[1];
                                document.getElementById('hdr_' + id + '_' + (i + 1)).style.backgroundColor = value.split('@')[2];
                                document.getElementById('hdr_' + id + '_' + (i + 1)).style.color = value.split('@')[3];
                                document.getElementById(tfoot).style.display = "none";
                                //FormView[currentScreenName + '_LISTVIEW_' + fieldName][id]
                            } catch (e) {

                            }
                        }
                        else if (tdType == "timepicker") {
                            tblbody.rows[currentIndex].cells.namedItem(id).childNodes['0'].childNodes['0'].childNodes['0'].value = value;
                        }
                        else if (tdType == "checkbox") {
                            if (bColorConfig == true && isRBC == true && sColorCondFieldArr.indexOf("ROWCOLOR") > -1) {
                                tblbody.rows[currentIndex].cells.namedItem(id).style.backgroundColor = getColorConfig(scrName, "RowColor", "", data[i]).split('~')[0];
                            }
                            value = value == "1" ? 1 : value == "0" ? 0 : value
                            tblbody.rows[currentIndex].cells.namedItem(id).childNodes['0'].checked = value;

                            if (isListLookUpClicked == true && isMultiSelect == true) {
                                //if ((isListLookUpClicked == true && isMultiSelect == true) || LookUpMultiSelected.length > 0) {
                                var chkColName = _objArray.arrList[1].FieldName.replace("\t", "");
                                //  chkColName = "HItemNo";
                                var colVal = data[i][chkColName];
                                var isLookUpCheckBoxSelected = false;
                                for (var q = 0; q < LookUpMultiSelected.length; q++) {
                                    if (LookUpMultiSelected[q][chkColName] == colVal) {
                                        isLookUpCheckBoxSelected = true;
                                        q = LookUpMultiSelected.length + 1;
                                    }
                                }
                                if (isLookUpCheckBoxSelected == true) {
                                    tblbody.rows[currentIndex].cells.namedItem(id).childNodes['0'].checked = true;
                                }
                            }
                            else if (LookUpMultiSelected.length > 0) {
                                //Newly added by.M 26.10.2021 - SandL
                                var chkColName = arrList[1].FieldName.replace("\t", "");
                                var colVal = data[i][chkColName];
                                var isCheckBoxSelected = false;
                                for (var q = 0; q < LookUpMultiSelected.length; q++) {
                                    if (LookUpMultiSelected[q][chkColName] == colVal) {
                                        isCheckBoxSelected = true;
                                        q = LookUpMultiSelected.length + 1;
                                    }
                                }
                                if (isCheckBoxSelected == true) {
                                    tblbody.rows[currentIndex].cells.namedItem(id).childNodes['0'].checked = true;
                                }
                            }

                        }
                        else if (tdType == "file") {
                            tblbody.rows[currentIndex].cells.namedItem(id).childNodes['1'].value = SaveImagePath + "/" + value;
                            $("#" + id + "_" + currentIndex).val(SaveImagePath + "/" + value);
                        }
                        else if (tdType == "linktab") {
                            var linkId = tblbody.rows[currentIndex].cells.namedItem(id).childNodes['0'].id;
                           // var link = tmpText;
                            $("a#" + linkId).attr('href', value);
                            $("a#" + linkId).text(value);
                        }
                        else if (tdType == "link") {
                            var linkId = tblbody.rows[currentIndex].cells.namedItem(id).childNodes['0'].id;
                            var png64 = "data:image/" + _base64imgage;

                            if (ProjectName == "PVMNG" && scrName.toString().toLowerCase() == "presentationform") {
                                //Changed By.M 06.09.2021
                                //  var link = "../DeviceImages/Images/Images/" + value;
                                var link = PresentationSaveImagePath + "/" + value;
                                $("a#" + linkId).attr('href', link);
                                $("a#" + linkId).text(value);
                            }
                            else if (scrName.toString().toLowerCase() == "presentationform") {
                                //Changed By.M 06.09.2021
                                //  var link = "../DeviceImages/Images/Images/" + value;
                                var link = SaveImagePath + "/" + value;
                                $("a#" + linkId).attr('href', link);
                                $("a#" + linkId).text(value);
                            }
                            else {
                                if (_base64imgage == '')
                                    $("a#" + linkId).attr('href', SaveImagePath + "/" + value);
                                else
                                    $("a#" + linkId).attr('href', _base64imgage);
                                $("a#" + linkId).text(value);
                            }
                        }
                        else if (tdType == "lookup") {
                            tblbody.rows[currentIndex].cells.namedItem(id).childNodes['0'].children[id].value = value;
                            $('#ItemPlaceHolder').val(value);
                        }

                        else if (tdType == "button") {
                            if (value == "" && id != "Delete" && id != "Print" && id != "Swap")
                                tblbody.rows[currentIndex].cells.namedItem(id).innerText = value;
                        }
                        else if (tdType == "image") {
                            var imgPath = SaveImagePath + "/" + value;
                            var imgTag = tblbody.rows[currentIndex].cells.namedItem(id).innerHTML;
                            var imgheight = "100"
                            try {
                                imgheight = imgTag.split("height:")[1].split("px")[0];
                            } catch (e) {
                            }
                            tblbody.rows[currentIndex].cells.namedItem(id).innerHTML = "<img src='" + imgPath + "' width='" + imgheight + "' height='" + imgheight + "'>";
                            //tblbody.rows[currentIndex].cells.namedItem(id).innerHTML = "<img src='" + imgPath + "' width='80' height='80'>";
                        }
                        else if (tdType == "barcode") {
                            JsBarcode('#' + id + "_" + addCount, value);
                            $('#' + id + "_" + addCount).css("width", "100%");
                            $('#' + id + "_" + addCount).css("height", "70px");
                        }
                        else {
                            if (dataMemberType == 'NUMBERFORMAT' || dataMemberType == 'AMOUNTNUMBERFORMAT') {
                                dataValue = GetNumberAndAmountNumberFormat(value, dataMemberType);
                                tblbody.rows[currentIndex].cells.namedItem(id).innerHTML = dataValue;
                            }
                            else {
                                //tblbody.rows[currentIndex].cells.namedItem(id).innerHTML = value;

                                if (listConfig[j].DataMemberType.toString().toLowerCase() == "image") {
                                    if (value == '' || value == null || value == 'undefined') {
                                        tblbody.rows[currentIndex].cells.namedItem(id).innerHTML = "";
                                    }
                                    else {
                                        //alert(value);
                                        tblbody.rows[currentIndex].cells.namedItem(id).innerHTML = "<img src='../Images/GridImages/" + value + "' width='30' height='30'>";
                                    }
                                }
                               
                                else {
                                    if (bColorConfig == true && isRBC == true && sColorCondFieldArr.indexOf("ROWCOLOR") > -1) {
                                        tblbody.rows[currentIndex].cells.namedItem(id).style.color = getColorConfig(scrName, "RowColor", "", data[i]).split('~')[1];
                                    }
                                    //if (id == 'CustId') {
                                    //    JsBarcode('#' + id + "_" + addCount, value);
                                    //    $('#' + id + "_" + addCount).css("width", "100%");
                                    //    $('#' + id + "_" + addCount).css("height", "70px");
                                    //}
                                    //else
                                    tblbody.rows[currentIndex].cells.namedItem(id).innerText = value;

                                    if (ProjectName == "FrostFood" && currentScreenName == "AuditRatingListForm" && listConfig[j].FieldName == "MaximumPoints") {
                                        {
                                            var htm = '';
                                            for (var t = 1; t <= value; t++)
                                            {
                                                htm += '<span onclick="gfg(\'' + ttbody + '\',\'' + listConfig[j].FieldName + '\',' + addCount + ',' + t + ')" class="star' + addCount + '" style="font-size:7vh;cursor:pointer;">★</span>';
                                            }
                                            //htm += '<span onclick="gfg(\'' + ttbody + '\',\'' + listConfig[j].FieldName + '\',' + addCount + ',1)" class="star' + addCount + '" style="font-size:7vh;cursor:pointer;">★</span>';
                                            //htm += '<span onclick="gfg(\'' + ttbody + '\',\'' + listConfig[j].FieldName + '\',' + addCount + ',2)" class="star' + addCount + '" style="font-size:7vh;cursor:pointer;">★</span>';
                                            //htm += '<span onclick="gfg(\'' + ttbody + '\',\'' + listConfig[j].FieldName + '\',' + addCount + ',3)" class="star' + addCount + '" style="font-size:7vh;cursor:pointer;">★</span>';
                                            //htm += '<span onclick="gfg(\'' + ttbody + '\',\'' + listConfig[j].FieldName + '\',' + addCount + ',4)" class="star' + addCount + '" style="font-size:7vh;cursor:pointer;">★</span>';
                                            //htm += '<span onclick="gfg(\'' + ttbody + '\',\'' + listConfig[j].FieldName + '\',' + addCount + ',5)" class="star' + addCount + '" style="font-size:7vh;cursor:pointer;">★</span>';

                                            tblbody.rows[currentIndex].cells.namedItem("SRating").innerHTML = htm;
                                        }
                                    }

                                }


                            }
                        }
                    }

                    if (ProjectName == "PVMB" && scrName == "PONewskuDistributorForm")
                        PONewSkuDistributorLogString("PONewskuDistributorForm > " + tmpLine);
                    //url_PONewSKUDistributorLog
                   

                    tmpLine = "";
                    GetListDropDownListValue(scrName, FieldName, ttbody, addCount);
                    DropDownIdValueList = [];

                    //
                    //if (data.length == countRows)
                    //todo 06.06.2019
                    //CreateList(ttbody, tfoot, scrName, pageNumber, SearchId, fieldName, actionType, result);
                    //else {
                    //    if (paginationCount != i)
                    //        CreateList(ttbody, tfoot, scrName, pageNumber, SearchId, fieldName, actionType, result);
                    //}
                    //
                }
                PageLoadinginfo("ListConfig listvalue execute query forloop end");

                //if (_isdynamic == true   && isListLookUpClicked == false && isFormLookUpClicked == false) {
                if (_isdynamic == true && isListLookUpClicked == false && isFormLookUpClicked == false && (countRows == 0 || countRows == pageNumber)) {//newly added.By.M.22.06.2023
                    // FLAG TO SET TRUE
                    CreateList(ttbody, tfoot, scrName, pageNumber, SearchId, fieldName, actionType, result, 1);
                    try {
                        if (swap_ttbody == ttbody)
                            rowRefresh(ttbody);
                    } catch (err) {

                    }
                }
            }
            else {
                CreateList(ttbody, tfoot, scrName, pageNumber, SearchId, fieldName, actionType, result, 1);
            }
        }
    }
    else {
        CreateList(ttbody, tfoot, scrName, pageNumber, SearchId, fieldName, actionType, result, 1);
    }

    var isEdit = localStorage.getItem("isEdit");

    if (ProjectName == "PVMNG" && scrName == "PONewDistributorForm" && isEdit == "no") {
        scrName = scrName;
    }
    else {
        if (objDefaultExecute.value != undefined) {
            setListValue("", fieldName, 0, ttbody);
            PerformAction('defaultExecute', objDefaultExecute/*, dataMember*/);
        }
    }

    objDefaultExecute = {};

}


function removeA(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax = arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}

var _ttableId = '';
function rowItemClicked(_this, fieldName, index, ttbody, ttableId) {
    //debugger;
    //alert(isUpDown);
    

    if (isUpDown) {
        Row_Click_func(_this);
    }
    _ttableId = ttableId;
    _ttbody = ttbody;
    tableTotalRowCount = $('#' + ttableId + ' >tbody >tr').length;
    currentRowClickCount = index;
    //Newly added by.M24.01.2022 - 13server simplr JSU PO lookup
    // FieldName = fieldName;
    //Newly added by.M26.08.2022 - 13server simplr POC -SpecialPackingList
    if (Params.FormView == null)
        _listLookUpIndex = parseInt(index);
    else
        _listLookUpIndex = Params.FormView._listLookUpIndex == undefined || Params.FormView._listLookUpIndex.toString() == "" ? parseInt(index) : Params.FormView._listLookUpIndex;
}


function Row_Click_func(obj) {
    //current_Table_Reference = $(obj).closest('table').attr('id');


    listview_prev_current_Row_Reference = listview_current_Row_Reference;
    listview_current_Row_Reference = obj;

    $(listview_current_Row_Reference).closest('tr').children('td,th').css('background-color', 'blue');

    if (listview_prev_current_Row_Reference != null) {
        $(listview_prev_current_Row_Reference).closest('tr').children('td,th').css('background-color', 'white');
    }

}

function listLableClicked(obj, dataMember, rowIndex, value, fieldName, ttbodyId) {
    setListValue(obj, dataMember, rowIndex, ttbodyId);
    currentRowClickCount = rowIndex;

    //var _obj = {};
    //_obj.fieldName = dataMember;
    //_obj.rowIndex = rowIndex;
    //_obj.value = value;
    //PerformAction('listLableClicked', _obj);
}


currentRowIndex = '';
var dynamictableTotalRowCount = 0;
//function tableclickfunction(tbodyId, scrName, fieldName) {
function listRowClicked1(tbodyId, tfoot, ttableId, scrName, fieldName) {
    _ttableId = ttableId;
    $('#' + _ttableId + ' >tbody > tr').click(function (event) {
        event.stopImmediatePropagation();
        currentRowIndex = $(this).index();
        setListValue(this, event.target.id, currentRowIndex, _ttbody);

        if (_isListNewRowAdd == true) {
            //dynamictableTotalRowCount = event.target.parentElement.parentElement.parentElement.rowIndex;
            dynamictableTotalRowCount = tableTotalRowCount;
            _isListNewRowAdd = false;
        }

        if (currentScreenName == "ExportDataForm" && SolutionName == "SALES-WEB-UL" && event.target.id == "AliasName" && ULCR == "1") {
            ExportDataFormList();
        }
        else {
            var _obj = {};
            _obj.fieldName = event.target.id;
            _obj.value = event.target.innerText;
            _obj.rowIndex = currentRowIndex;
            PerformAction('rowItemClicked', _obj);
        }

    });
}
function listRowClicked(tbodyId, tfoot, ttableId, scrName, fieldName) {
    _ttableId = ttableId;
    $('#' + _ttableId + ' >tbody > tr').click(function (event, a, b) {

        event.stopImmediatePropagation();
        currentRowIndex = $(this).index();
        if (event.target.id == "" && showimageId != "") {
            event.target.id = showimageId;
            showimageId = "";
        }
        setListValue(this, event.target.id, currentRowIndex, _ttbody);

        if (isMultiSelect == true) {

            if (_isListNewRowAdd == true) {
                //dynamictableTotalRowCount = event.target.parentElement.parentElement.parentElement.rowIndex;
                dynamictableTotalRowCount = tableTotalRowCount;
                _isListNewRowAdd = false;
            }

            if (isListLookUpClicked == true && event.target.checked != undefined) {
                selectedListColumnNo = event.target.cellIndex == undefined ? isListColumnCheckBox == true ? 0 : 0 : event.target.cellIndex;
                selectedListColumnName = ListHeaderList['ListConfig_' + CurrentScreen_TabScreen_Name + '_' + FieldName][selectedListColumnNo].FieldName;
                var _obj = {};
                var listConfig = ListHeaderList['ListConfig_' + CurrentScreen_TabScreen_Name + '_' + FieldName];
                id = _objArray.arrList[1].DataMember;
                uniqueId = id;
                //textvalue = event.currentTarget.cells[1].innerText;
                if (event.currentTarget.cells[1].innerText == "")
                    return;
                textvalue = event.currentTarget.cells[1].innerHTML;
                _obj[id] = textvalue;
                //newly added by.M21.12.2021
                _obj["Index"] = currentRowIndex;
                listView[id] = textvalue;
                FormView[FieldName] = _obj;

                //newly added by.M21.12.2021
                _obj = FormView.MultiSelect;

                if (event.target.checked == true) {
                    LookUpMultiSelected.push(_obj);
                    TempLookUpMultiSelected.push(_obj);

                    TempLookUpUnSelected = jQuery.grep(TempLookUpUnSelected, function (value) { return value[id] != TempLookUpMultiSelected[0][id]; });

                }
                else {
                    LookUpUnSelected.push(_obj);
                    TempLookUpUnSelected.push(_obj);
                    LookUpMultiSelected = jQuery.grep(LookUpMultiSelected, function (value) { return value[id] != LookUpUnSelected[0][id]; });
                    TempLookUpMultiSelected = jQuery.grep(TempLookUpMultiSelected, function (value) { return value[id] != LookUpUnSelected[0][id]; });
                    //LookUpMultiSelected.splice($.inArray(LookUpUnSelected, LookUpMultiSelected), 1);
                    LookUpUnSelected = [];
                }
            }

        }
        else {
            if (event.target.type == "checkbox") {
                //Newly added by.M 26.10.2021 - SandL
                var _obj = {};
                id = _objArray.arrList[1] == undefined ? arrList[1].DataMember : _objArray.arrList[1].DataMember;
                uniqueId = id;
                if (event.currentTarget.cells[1].innerText == "")
                    return;
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
            }
            if (_isListNewRowAdd == true) {
                //dynamictableTotalRowCount = event.target.parentElement.parentElement.parentElement.rowIndex;
                dynamictableTotalRowCount = tableTotalRowCount;

                //newly added.By.M.22.06.2023
                if (_ttableId.indexOf('GenericLookUp') > 0 && _previousispagination == true)
                    dynamictableTotalRowCount = _listLookUpIndex + 1;

                _isListNewRowAdd = false;
            }

            if (currentScreenName == "ExportDataForm" && SolutionName == "SALES-WEB-UL" && event.target.id == "AliasName" && ULCR == "1") {
                ExportDataFormList();
            }
            else if (currentScreenName == "InvoiceList" && SolutionName == "SALES-WEB" && event.target.id == "SendInvoice") {
                // Here we call dll part =============
                //alert('selected invoice No.: ' + FormView.LstInvoice.InvNo.toString());

                //alert(?FormView.LstInvoice.PeppolStatus)
                var peppolStatus = "";

                if (FormView.LstInvoice.PeppolStatus != null && FormView.LstInvoice.PeppolStatus != undefined) {
                    peppolStatus = FormView.LstInvoice.PeppolStatus.toString();
                }

                if (peppolStatus == "Accepted" || peppolStatus == "Transmission-Success") {
                    var obj = {};
                    obj.title = "OutBound Status";
                    obj.message = "OutBound already Completed.";
                    showAlertMessage(obj);
                    return;
                }

                Peppol_Invoice_Integration(FormView.LstInvoice.InvNo.toString());

                var _obj = {};
                _obj.fieldName = event.target.id;
                _obj.value = event.target.innerText;
                _obj.rowIndex = currentRowIndex;
                PerformAction('rowItemClicked', _obj);

            }

            else if (currentScreenName == "InvoiceList" && SolutionName == "SALES-WEB" && event.target.id == "UpdateStatus") {

                // Here we call dll part =============
                //alert('selected invoice No.: ' + FormView.LstInvoice.InvNo.toString());
                var peppolStatus = "";

                if (FormView.LstInvoice.PeppolStatus != null && FormView.LstInvoice.PeppolStatus != undefined) {
                    peppolStatus = FormView.LstInvoice.PeppolStatus.toString();
                }

                if (peppolStatus == "") {
                    var obj = {};
                    obj.title = "Update Status";
                    obj.message = "OutBound to be Completed.";
                    showAlertMessage(obj);
                    return;
                }


                if (peppolStatus == "Transmission-Success" || peppolStatus == "") {
                    var obj = {};
                    obj.title = "Update Status";
                    obj.message = "Status already Updated.";
                    showAlertMessage(obj);
                    return;
                }

                Peppol_Invoice_UpdateStatus(FormView.LstInvoice.InvNo.toString());

                var _obj = {};
                _obj.fieldName = event.target.id;
                _obj.value = event.target.innerText;
                _obj.rowIndex = currentRowIndex;
                PerformAction('rowItemClicked', _obj);

            }
            else if (currentScreenName == "BarcodeConfigList" && event.target.id == "Edit") {

                var _params = "ItemNo=" + FormView["LstBarcodeConfig"].ItemNo + "_Barcode=" + FormView["LstBarcodeConfig"].Barcode;

                window.location = url_FormClickEvent + "?ScreenName=BarcodeConfigPage" + "&FieldName=" + _params + "";//single parameter

            }
            else {

                if (isListLookUpClicked == true || isFormLookUpClicked == true)
                    arrList = Params.arrList;
                //if (isFormLookUpClicked == true)
                //    FieldName = objParams.fieldName;

                var _obj = {};
                _obj.fieldName = event.target.id;
                _obj.value = event.target.innerText;
                _obj.rowIndex = currentRowIndex;
                PerformAction('rowItemClicked', _obj);
            }
        }
    });
}

function Peppol_Invoice_Integration(invNo) {
    // OUTBOUND COMPLETED.
    $.ajax({
        type: "POST",
        url: url_GetInvoiceProcess_Peppol,
        data: { invoiceNo: invNo },
        dataType: "text",
        async: false,
        success: function (results) {
            //alert('Outbound Completed.');
            obj = {};
            obj.title = "Outbound Completion";
            obj.message = "Outbound Completed!";
            showAlertMessage(obj);
            //showAlertMessage("Outbound Completion", "Outbound Completed!");
        },
        error: function (results, q, a) {
            alert(results);
        }
    });

}



function Peppol_Invoice_UpdateStatus(invNo) {
    // STATUS UPDATED.
    $.ajax({
        type: "POST",
        url: url_GetInvoiceUpdation_Peppol,
        data: { invoiceNo: invNo },
        dataType: "text",
        async: false,
        success: function (results) {
            //alert('Status Updated.');
            obj = {};
            obj.title = "Status Updation";
            obj.message = "Status Updated!";
            showAlertMessage(obj);
            //showAlertMessage("Status Updation", "Status Updated!");
        },
        error: function (results, q, a) {
            alert(results);
        }
    });

}

function NumberFormat(dataMemberType, value) {

    if (dataMemberType == 'NUMBERFORMAT' || dataMemberType == 'AMOUNTNUMBERFORMAT') {
        var sCurrencyCode = commonObj.Currency + " ";
        if (dataMemberType == 'AMOUNTNUMBERFORMAT') {
            sCurrencyCode = "";
        }
        var _strValue = value;
        _strValue = (_strValue == null || _strValue == undefined || _strValue == '') ? 0 : _strValue;
        if (_strValue == 0) {
            try {
                //Changes done by Vignesh on 23/08/2024
                //dataValue = _strValue == "0.00" || _strValue == "0" ? _strValue : _strValue.toFixed(2);
                dataValue = strValue == "0.00" || strValue == "0" ? _strValue : parseFloat(_strValue).toFixed(2);
            }
            catch (err) {
                dataValue = _strValue == "0.00" || _strValue == "0" ? _strValue : Number(_strValue).toFixed(2);
            }
             return dataValue;
        } else {
            _strValue = _strValue.toString();
            if (_strValue.indexOf('/') > -1 || _strValue.indexOf(' / ') > -1) {
                var _dataVal = "", _tmpDataVal = "";
                var arr = (_strValue.indexOf('/') > -1) ? _strValue.split("/") : _strValue.split(" / ");
                if (arr.length > 0) {
                    for (var i = 0; i < arr.length; i++) {
                        COMMONLog('1. arr[' + i + '] ---> ' + arr[i]);
                        //_tmpDataVal = Ti.App.NUMBER.roundNumber(arr[i], commonObj.AmountRoundingDigits);
                        _tmpDataVal = roundNumber(arr[i], commonObj.AmountRoundingDigits);
                        _tmpDataVal = _tmpDataVal.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
                        _dataVal = (i == 0) ? (sCurrencyCode + _tmpDataVal) : (_dataVal + " / " + sCurrencyCode + _tmpDataVal);
                    }
                }
                dataValue = _dataVal;
                return dataValue;
            }
            //Changes made by Nisha on 07.12.2023
            //else {
            //    dataValue = roundNumber(_strValue, commonObj.AmountRoundingDigits);//2);
            //    dataValue = dataValue.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
            //    dataValue = sCurrencyCode + dataValue;
            //    return dataValue;
            //}
            else {
                dataValue = roundNumber(_strValue, commonObj.AmountRoundingDigits);//2);
                //dataValue = dataValue.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
                var parts = dataValue.toString().split(".");
                parts[0] = parts[0].toString().replace(/(\B)(?=(\d{3})+(?!\d))/g, "$1,");
                dataValue = parts[0] + "." + parts[1];
                dataValue = sCurrencyCode + dataValue;
                return dataValue;
            }

        }

    }
    return value;
}
var TimerIdList = [];
var timerdata = {};
var isTimerEvent = false;
var objDefaultExecute = {};
function AssignFormData(data, scrnName, clickEvent) {
    mustCarryItemData = data;
    dataFieldIdList = {};
    if (data != '' && data != null) {
        currentScreenName = scrnName == undefined || scrnName == "" ? currentScreenName : scrnName;
        if (currentScreenName == "SalesOrderForm" || currentScreenName == "InvoiceForm" || currentScreenName == "CreditNoteForm")
            DiscountGroup = data[0].DiscountGroup;
        var formConfig = formFieldIdList["FormConfig_" + currentScreenName];//[0].fieldControl
        //for (var j = 0; j < data.length; j++) {//command for inventry
        for (var j = 0; j < 1; j++) {
            if (formConfig != undefined) {
                for (var i = 0; i < formConfig.length; i++) {
                    if (formConfig[i].fieldName.toLowerCase() != 'cancelbtn' && formConfig[i].fieldName.toLowerCase() != 'savebtn') {
                        FormView[formConfig[i].DataMember] = data[j][formConfig[i].DataMember];
                        if (formConfig[i].fieldControl.toLowerCase() == 'textbox' || formConfig[i].fieldControl.toLowerCase() == 'textarea' || formConfig[i].fieldControl.toLowerCase() == 'password') {
                            value = NumberFormat(formConfig[i].DataMemberType, data[j][formConfig[i].DataMember])
                            $('#' + formConfig[i].DataMember).val(value);
                            try {
                                if (ProjectName.toLowerCase() == "jsu" && (currentScreenName == "PaymentsCashForm" || currentScreenName == "PaymentsCreditForm" || currentScreenName == "PaymentsCreditForm" || currentScreenName == "PaymentsChequeForm" || currentScreenName == "PaymentsChequeForm")) {
                                    if (formConfig[i].DataMember == "Amount1") {
                                        currentScreenName = currentScreenName;
                                    }
                                    var itm = document.getElementsByName(formConfig[i].DataMember);
                                    for (var z = 0; z < itm.length; z++)
                                        itm[z].value = value;
                                }
                                //}
                            } catch (errr) {

                            }
                            // $('#' + formConfig[i].DataMember).val(data[j][formConfig[i].DataMember]);
                        }
                        else if (formConfig[i].fieldControl.toLowerCase() == 'execute') {

                            //if (formConfig[i].DefaultValue != null && formConfig[i].DefaultValue != "") {
                            //    setListValue("", formConfig[i].DefaultValue, 0, "ListBodyDivId_PONewDistributorForm_Item");
                            //}
                          
                                var _obj = {};
                                _obj.value = "execute";
                                _obj.fieldName = formConfig[i].DataMember;
                            objDefaultExecute = _obj;
                            if (ProjectName == "PVMNG" && currentScreenName == "PONewDistributorForm") {
                                currentScreenName = currentScreenName;
                            }
                            else {
                                PerformAction('defaultExecute', _obj/*, dataMember*/);
                            }
                        }
                        else if (formConfig[i].fieldControl.toLowerCase() == 'timer') {

                            timerdata = {};
                            timerdata.DataMember = formConfig[i].DataMember;
                            timerdata.ScreenName = formConfig[i].screenName;
                            TimerIdList.push(timerdata);

                            //var _obj = {};
                            //_obj.value = "";
                            //_obj.fieldName = formConfig[i].DataMember;
                            //objDefaultExecute = _obj;
                            //PerformAction('timerEventRun', _obj/*, dataMember*/);

                            //mapTimer = mapTimer == "" ? "30" : mapTimer;
                            //setInterval(function () {
                            //    _obj = {};
                            //    _obj.fieldName = formConfig[i].DataMember;
                            //    //PerformAction('formButtonClicked', _obj);
                            //    PerformAction('EXECUTE', _obj);
                            //}, mapTimer * 60 * 1000);

                        }
                        else if (formConfig[i].fieldControl.toLowerCase() == 'monthpicker' || formConfig[i].fieldControl.toLowerCase() == "yearpicker") {
                            if (data[j][formConfig[i].DataMember] == undefined);
                            else if (data[j][formConfig[i].DataMember].toString() == "")
                                ;//document.getElementById(formConfig[i].DataMember).selectedIndex = "-1"
                            else
                                $('#' + formConfig[i].DataMember).val(data[j][formConfig[i].DataMember].toString());
                        }
                        else if (formConfig[i].fieldControl.toLowerCase() == 'combobox' || formConfig[i].fieldControl.toLowerCase() == "comboboxsearch") {
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
                                //$('#' + formConfig[i].DataMember).val(data[j][formConfig[i].DataMember].toString().replace(/ /g, "-space-"));
                                $('#' + formConfig[i].DataMember).val(data[j][formConfig[i].DataMember].toString());

                               // document.getElementById(formConfig[i].DataMember).value = data[j][formConfig[i].DataMember].toString();
                                
                            }
                            if (formConfig[i].screenName != "Web_DashBoard" && clickEvent != "menuItemClicked")
                                formComboChange('', formConfig[i].DataMember, 0, data[j][formConfig[i].DataMember]);
                            DropDownOnchangeFunction(formConfig[i].DataMember, "No");
                        }
                        else if (formConfig[i].fieldControl.toLowerCase() == 'timepicker') {
                            if (data[j][formConfig[i].DataMember] != undefined) {
                                value = data[j][formConfig[i].DataMember];
                                $('#' + formConfig[i].DataMember).val(value);
                            }
                        }
                        else if (formConfig[i].fieldControl.toLowerCase() == 'datepicker') {
                            if (currentScreenName != "ExportDataForm") {
                                $('#' + formConfig[i].DataMember).val(data[j][formConfig[i].DataMember]);
                                var returnDate = '';
                                var pickerDate = '';
                                var dat = data[j][formConfig[i].DataMember];
                                if (dat != undefined) {
                                    var tim = '';
                                    if (data[j][formConfig[i].DataMember].split(' ').length == 2) {
                                        dat = data[j][formConfig[i].DataMember].split(' ')[0];
                                        tim = data[j][formConfig[i].DataMember].split(' ')[1];
                                    }
                                    else if (data[j][formConfig[i].DataMember].split("T").length == 2) {
                                        dat = data[j][formConfig[i].DataMember].split('T')[0];
                                        tim = data[j][formConfig[i].DataMember].split('T')[1];
                                    }
                                    if (_format.toLowerCase().indexOf("dd") == 0) {
                                        returnDate = DateFormateChangeDDMM("dd/mm/yyyy", dat);
                                        pickerDate = DatePickerFormateChangeDDMM("dd/mm/yyyy", dat);
                                    }
                                    else if (_format.toLowerCase().indexOf("mm") == 0) {
                                        returnDate = DateFormateChangeDDMM("mm/dd/yyyy", dat);
                                        pickerDate = DatePickerFormateChangeDDMM("mm/dd/yyyy", dat);
                                    }
                                    if (data[j][formConfig[i].DataMember].split(' ').length == 2) {
                                        returnDate = returnDate + " " + tim;
                                        pickerDate = pickerDate + " " + tim;
                                    }

                                    //changes done by vignesh on 19/07/2024
                                     //  if (pickerDate != "" && ProjectName != "PVMB") {
                                    if (pickerDate != "" ) {
                                 
                                        isDateModified = true;

                                        if (formConfig[i].FieldControl.toString().toLowerCase() == 'datepicker') {
                                            //$('#' + formConfig[i].DataMember).data("DateTimePicker").date(moment(new Date(pickerDate)).format(_format));
                                            //$('#' + formConfig[i].DataMember).data("DatePicker").date(moment(new Date(data[j][formConfig[i].DataMember])).format(_format));

                                            //newly added by.M 01.11.2022 --delisary -StockTakeWithoutSnapShotList- ProjectName.toLowerCase() != "wms" 
                                            //if (_format.toLowerCase().indexOf("dd") == 0 && ) {
                                            if (_format.toLowerCase().indexOf("dd") == 0) {
                                                //$('#' + formConfig[i].DataMember).data("DateTimePicker").date(moment(new Date()).format('DD/MM/YYYY'));
                                                $('#' + formConfig[i].DataMember).data("DateTimePicker").date(moment(new Date(returnDate)).format(_format));
                                                //if (ProjectName.toLowerCase() == "wms") {
                                                //    isDateModified = false;
                                                //    DateTimePickerChangeFuction(moment(new Date(returnDate))._d, formConfig[i].DataMember, "onChange");
                                                //    //DateTimePickerChangeFuction(new Date(), formConfig[i].DataMember, "onChange");
                                                //}

                                            }
                                            else {
                                                //by.M 02.o5.2022 - jsu - salesorder edit
                                                $('#' + formConfig[i].DataMember).data("DateTimePicker").date(moment(new Date(data[j][formConfig[i].DataMember])).format(_format));
                                            }
                                        }
                                        else {
                                            $('#' + formConfig[i].DataMember).data("DateTimePicker").date(moment(new Date(pickerDate)).format(_format));
                                        }


                                        //$('#' + formConfig[i].DataMember).data("DateTimePicker").date(moment(new Date(pickerDate)).format(_format));
                                        //   $('#' + formConfig[i].DataMember).data("DateTimePicker").date(moment(new Date(data[j][formConfig[i].DataMember])).format(_format));
                                        isDateModified = false;
                                        //$('#datetimepicker1').data("DateTimePicker").date(moment(new Date).format('DD/MM/YYYY HH:mm'));
                                    }
                                    if (returnDate == "") {
                                        var dataact = document.getElementById(formConfig[i].DataMember).getAttribute("data-act");
                                        document.getElementById(formConfig[i].DataMember).setAttribute("data-act", dataact);
                                    }
                                    else
                                        document.getElementById(formConfig[i].DataMember).setAttribute("data-act", returnDate);
                                }
                            }
                        }
                        else if (formConfig[i].fieldControl.toLowerCase() == 'option') {
                            if (data[j][formConfig[i].DataMember] == true || data[j][formConfig[i].DataMember] == "true") {
                                $('#' + formConfig[i].DataMember).attr("Checked", true);
                            }
                        }
                        else if (formConfig[i].fieldControl.toLowerCase() == 'optionview') {
                            if (data[j][formConfig[i].DataMember] == true || data[j][formConfig[i].DataMember] == "true") {
                                $('#' + formConfig[i].DataMember).attr("Checked", true);
                            }
                        }
                        else if (formConfig[i].fieldControl.toLowerCase() == 'barcode') {
                            if (data[j][formConfig[i].DataMember] != "") {
                                JsBarcode('#' + formConfig[i].DataMember, data[j][formConfig[i].DataMember]);
                                $('#' + formConfig[i].DataMember).show();
                            }
                            else
                                $('#' + formConfig[i].DataMember).hide();


                        }
                        else if (formConfig[i].fieldControl.toLowerCase() == 'label') {
                            if (data[j][formConfig[i].DataMember] != undefined) {
                                value = NumberFormat(formConfig[i].DataMemberType, data[j][formConfig[i].DataMember])
                                $('#' + formConfig[i].DataMember).val(value);
                                try {
                                    if (ProjectName.toLowerCase() == "jsu" && (currentScreenName == "PaymentsCashForm" || currentScreenName == "PaymentsCreditForm" || currentScreenName == "PaymentsCreditForm" || currentScreenName == "PaymentsChequeForm" || currentScreenName == "PaymentsChequeForm")) {
                                        if (formConfig[i].DataMember == "Amount1") {
                                            currentScreenName = currentScreenName;
                                        }
                                        var itm = document.getElementsByName(formConfig[i].DataMember);
                                        for (var z = 0; z < itm.length; z++)
                                            itm[z].value = value;
                                    }
                                    //}
                                } catch (errr) {

                                }
                                //$('#' + formConfig[i].DataMember).val(data[j][formConfig[i].DataMember]);
                            }
                        }
                        else if (formConfig[i].fieldControl.toLowerCase() == 'radiobutton') {
                            if (data[j][formConfig[i].DataMember] != undefined) {
                                // var value = (data[j][formConfig[i].DataMember] == false || data[j][formConfig[i].DataMember] == true) ? data[j][formConfig[i].DataMember] : data[j][formConfig[i].DataMember].replace(/ /g, "");
                                var value = data[j][formConfig[i].DataMember];
                                $("input[name=" + formConfig[i].DataMember + "][value='" + value + "']").attr('checked', 'checked');

                                ////
                                formradioButtonValueChanged(this, formConfig[i].DataMember, i, +$('#' + formConfig[i].DataMember).val());
                                var sScreenName = formConfig[i].screenName + "_" + formConfig[i].fieldName;
                                var qry = getString['QueryConfig_' + sScreenName];
                                qry += ' ' + getString['QueryConfig_' + sScreenName + '_GroupText'];
                                qry += ' ' + getString['QueryConfig_' + sScreenName + '_OrderText'];
                                qry = formatQueryString(qry, sScreenName);
                                execute(qry);
                                var dbDataRow = executeQry;
                                if (dbDataRow != null) {
                                    for (var x = 0; x < dbDataRow.length; x++) {
                                        for (var key in dbDataRow[x]) {
                                            var fieldValue = dbDataRow[x][key]
                                            var arrFieldName = key.split('FormView.');
                                            $("#" + arrFieldName[1]).val(fieldValue);
                                        }
                                    }
                                }
                                ////////
                            }
                        }
                        else if (formConfig[i].fieldControl.toLowerCase() == 'lookup') {
                            $('#' + formConfig[i].DataMember).val(data[j][formConfig[i].DataMember]);
                        }
                        else if (formConfig[i].fieldControl.toLowerCase() == 'autolookup') {
                            $('#' + formConfig[i].DataMember).val(data[j][formConfig[i].DataMember]);
                        }
                        else if (formConfig[i].fieldControl.toLowerCase() == 'imageupload') {
                            $("input:file[Id=" + formConfig[i].DataMember + "]").attr("value", data[j][formConfig[i].DataMember]);
                            //$("input:file[id*=Image_1]").attr("value", data[j][formConfig[i].DataMember]);
                            $('#' + formConfig[i].DataMember).val(data[j][formConfig[i].DataMember]);

                            // GetBase64Image(data[j][formConfig[i].DataMember]);
                            //  $('#blah').attr('src', data[j][formConfig[i].DataMember]);
                        }
                        else if (formConfig[i].fieldControl.toLowerCase() == 'image') {
                            GetBase64Image(formConfig[i].DataMember, data[j][formConfig[i].DataMember]);
                            //  $('#blah').attr('src', data[j][formConfig[i].DataMember]);
                        }
                        else if (formConfig[i].fieldControl.toLowerCase() == 'link' || formConfig[i].fieldControl.toLowerCase() == 'linktab') {
                            //GetBase64Image(formConfig[i].DataMember, data[j][formConfig[i].DataMember]);
                            if ($('#ImagePath').val() != undefined && $('#ImagePath').val() != "") {
                                var splitimgPath = $('#ImagePath').val().split('/');
                                //splitimgPath = "http://simplrdb.southeastasia.cloudapp.azure.com/SimplrB2BSG/DeviceImages/Images/Banner/".split('/');
                                var splitimgPathCnt = splitimgPath != null && splitimgPath.length >= 4 ? splitimgPath.length : 0;
                                if (splitimgPathCnt > 0 && splitimgPath[splitimgPathCnt - 1] == "")
                                    SaveImagePath = "../" + splitimgPath[splitimgPathCnt - 4] + "/" + splitimgPath[splitimgPathCnt - 3] + "/" + splitimgPath[splitimgPathCnt - 2];
                                else
                                    SaveImagePath = "~/" + splitimgPath[splitimgPathCnt - 3] + "/" + splitimgPath[splitimgPathCnt - 2] + "/" + splitimgPath[splitimgPathCnt - 1];
                            }

                            var link = SaveImagePath + "/" + data[j][formConfig[i].DataMember];
                            $("a#" + formConfig[i].DataMember).attr('href', link);
                            $("a#" + formConfig[i].DataMember).text(data[j][formConfig[i].DataMember]);

                        }
                        else if (formConfig[i].fieldControl.toLowerCase() == 'multiplephoto') {//MULTIPLEPHOTO
                            var sScreenName = formConfig[i].screenName + "_" + formConfig[i].fieldName;
                            var qry = getString['QueryConfig_' + sScreenName];
                            qry += ' ' + getString['QueryConfig_' + sScreenName + '_GroupText'];
                            qry += ' ' + getString['QueryConfig_' + sScreenName + '_OrderText'];
                            qry = formatQueryString(qry, sScreenName);
                            execute(qry);
                            var dbDataRow = executeQry;
                            var imgUrlPath = '';
                            var imgId = '';

                            for (var x = 0; x < dbDataRow.length; x++) {
                                for (var key in dbDataRow[x]) {
                                    var fieldValue = dbDataRow[x][key]
                                    var arrFieldName = key.split('FormView.');
                                    imgUrlPath = fieldValue;
                                    imgId = arrFieldName[1] + '_ImageId_' + multiPhotoCount;
                                    imgId1 = arrFieldName[1] + '_' + multiPhotoCount;
                                    //$("#" + imgId1).get(0).value = imgUrlPath;
                                    // $("#" + imgId1)[0].value = imgUrlPath;
                                    $("#" + imgId1)[0].innerText = imgUrlPath;
                                    GetBase64Image(imgId, imgUrlPath);
                                    $('#' + imgId).show();
                                    multiPhotoAdd(multiPhotoCount, _ImgCtrlHeight, _ImgCtrlWidth, formConfig[i].DataMember);
                                }
                            }
                            //qry = "select * from ImageMaster where ImgName = " + safeSQL(data[j][formConfig[i].DataMember]);
                            //execute(qry);
                            //var dbDataRows = executeQry;
                            //var imgUrlPath = '';
                            //var imgId = '';
                            //for (var x = 0; x < dbDataRows.length; x++) {
                            //    imgUrlPath = dbDataRows[x]['ImgUrlString'];
                            //    imgId = formConfig[i].DataMember + '_ImageId_' + multiPhotoCount;
                            //    imgId1 = formConfig[i].DataMember + '_' + multiPhotoCount;
                            //    //$("#" + imgId1).get(0).value = imgUrlPath;
                            //    $("#" + imgId1)[0].value = imgUrlPath;
                            //    $("#" + imgId1)[0].innerText = imgUrlPath;
                            //    GetBase64Image(imgId, imgUrlPath);
                            //    $('#' + imgId).show();
                            //    multiPhotoAdd(multiPhotoCount, _ImgCtrlHeight, _ImgCtrlWidth, formConfig[i].DataMember);
                            //    //  multiPhotoFileOnChane('', multiPhotoCount, _ImgCtrlHeight, _ImgCtrlWidth, formConfig[i].DataMember)
                            //}
                        }

                        dataFieldIdList[formConfig[i].DataMember] = data[j][formConfig[i].DataMember];
                    }
                }
            }
        }

        if (TimerIdList.length > 0) {
            //GetDropDownListValue(scrn, "Form");
            //DropDownIdList = [];

            var _obj = {};
            _obj.value = "";
            _obj.fieldName = "Timer";//TimerIdList[0].DataMember;
            objDefaultExecute = _obj;
            PerformAction('timerEventRun', _obj/*, dataMember*/);

        }


        //DropDownIdList[i].DataMember;
        // COMMENTED 01.04.2021
        //GetFormListViewListNew();
        GetFormListViewListNew_Assign();

        //if (FormListViewList.length > 0) {
        //    //  TabScreenName = "Contacts";
        //    GetFormListViewList();
        //}
        //var listParameter = objListParameter['ListParameter_' + CurrentScreen_TabScreen_Name + '_' + FieldName];
        ////if (currentScreenName == "MustCarryItemForm")
        ////    FormListConfigRow1(listParameter.ttbody, listParameter.tfoot, listParameter.scrName, 1, '', listParameter.fieldName, listParameter.actionType);
        ////else
        //if (listParameter != undefined) {
        //    listParameter.actionType = listParameter.actionType == undefined ? _action : listParameter.actionType;

        //    if ((currentScreenName == "ItemPromotionForm" || currentScreenName == "InvoicePromotionForm") && tabGroupData.length >= 1) {
        //        var cs_ts_name = CurrentScreen_TabScreen_Name;
        //        for (var n = 0; n < tabGroupData.length; n++) {
        //            var scrName = currentScreenName + "_" + tabGroupData[n].Value.replace(" ", "");
        //            var fieldNam = objListParameterFieldName[n];
        //            listParameter = objListParameter['ListParameter_' + scrName + '_' + fieldNam];
        //            DynamicFormListConfigRow(listParameter.ttbody, listParameter.tfoot, listParameter.scrName, 1, '', listParameter.fieldName, listParameter.actionType, "yes");
        //        }
        //        CurrentScreen_TabScreen_Name = cs_ts_name;
        //    }
        //    else
        //        DynamicFormListConfigRow(listParameter.ttbody, listParameter.tfoot, listParameter.scrName, 1, '', listParameter.fieldName, listParameter.actionType, "no");
        //    if (listParameter.scrName == "SalesOrderForm" || listParameter.scrName == "InvoiceForm" || listParameter.scrName == "CreditNoteForm") {
        //        OrderCalculations(listParameter.scrName, listParameter.fieldName);
        //    }
        //}
        //else {
        //    //for (var i = 0; i < objListParameterFieldName.length; i++) {
        //    //    FieldName = objListParameterFieldName[i]
        //    //    var listParameter = objListParameter['ListParameter_' + CurrentScreen_TabScreen_Name + '_' + FieldName];
        //    //    DynamicFormListConfigRow(listParameter.ttbody, listParameter.tfoot, listParameter.scrName, 1, '', listParameter.fieldName, listParameter.actionType);
        //    //}
        //}
    }
}



function GetFormListViewListNew() {

    if (listView_WithinTab) {
        for (var i = 0; i < tableList.length; i++) {
            isFormListView = true;
            if (tableList_Filled[i].filled.toString() == "0") {
                FormListConfigHeader(tableList[i].theadId, tableList[i].ttbody, tableList[i].tfoot, tableList[i].screenName, tableList[i].fieldName, url_GetListConfig);

                // // COMMENTED 01.04.2021
                tableList_Filled[i].filled = "1";
            }

            isFormListView = false;
        }

    }
    else {
        for (var i = 0; i < tableList.length; i++) {
            isFormListView = true;

            FormListConfigHeader(tableList[i].theadId, tableList[i].ttbody, tableList[i].tfoot, tableList[i].screenName, tableList[i].fieldName, url_GetListConfig);

            isFormListView = false;
        }
    }


}

function GetFormListViewListNew_Assign() {
    //newly added by.M 03.02.2022 - pvmLive dashboard
    if (currentScreenName.toLowerCase() == "web_dashboard") {
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

    for (var i = 0; i < tableList.length; i++) {
        isFormListView = true;

        FormListConfigHeader(tableList[i].theadId, tableList[i].ttbody, tableList[i].tfoot, tableList[i].screenName, tableList[i].fieldName, url_GetListConfig);

        isFormListView = false;
    }
}

function DynamicRowItemRemoveConfirmNew(objthis, dataMember, rowIndex, value1, fieldName, cnt, ttbody, isPerformActionCall) {
    _ttbody = ttbody;
    _fieldName = fieldName;
    var Temp = fieldName;

    

    cnt = parseInt(currentRowClickCount);

    var _obj = {};
    _obj.fieldName = dataMember;
    _obj.rowIndex = cnt;
    _obj.value = value1;
    // _obj.ttbody = ttbody;
    if (isPerformActionCall == 1)
        PerformAction('listButtonClicked', _obj);

    if (cnt == (tableTotalRowCount - 1) && _isdynamic == true)
        return;
    addCount = objAddDynamicListCount['ListConfig_' + ttbody];
    if ((addCount > 0 && addCount > cnt && tableTotalRowCount > 1) || _isdynamic == false) {
        isDynamicRowItemRemove = true;
        var removeSelected = [];
        var obj = {};
        var value = '';
        // setListValue(objthis, dataMember, rowIndex, ttbody)
        obj = FormView[FieldName]
        removeSelected.push(obj);
        LookUpMultiSelected = jQuery.grep(LookUpMultiSelected,
            function (value) {
                return value[id] != removeSelected[0][id];
            });

        ListSelectedId = jQuery.grep(ListSelectedId,
            function (value) {
                return value[id] != removeSelected[0][id];
            });

        //newly added 11.09.2023 --3
        var tempFieldName = FieldName
        FieldName = fieldName;
        setListValue('', fieldName, cnt, ttbody);
        //
        var _obj = {};
        _obj.fieldName = 'TempDeleteBtn';
        PerformAction('listTextFieldLostFocus', _obj);



        //newly added 11.09.2023 --1
        FieldName = tempFieldName;

        if (ProjectName.toLowerCase() == "frostfood" && (currentScreenName.toLowerCase() == "presentationform" || currentScreenName.toLowerCase() == "presentationnewform")) {
            var table = document.getElementById(ttbody); //'ListBodyDivId_PresentationForm_Media');
           // var fNames = [];
            var fName = table.rows[cnt].cells[3].childNodes[0].innerText;
            //fNames[0] = fName;
            deleteImage(fName);

        }

        if (ProjectName.toLowerCase() == "sengchoon" && ( currentScreenName.toLowerCase() == "invoicenewform" || currentScreenName.toLowerCase() == "invoiceform")) {
            if (isDynamicRowItemDelete == false) {
                var removeid = document.getElementById(ttbody).rows[cnt].className.split(' ')[1];
                // $('.' + removeid).remove();
                $('.' + removeid).find('td').remove();
                //changed by Nisha 23-03-2024
                $('.' + removeid).remove();//.hide();
            }
            else {
                var removeid = document.getElementById(ttbody).rows[cnt].id;//className.split(' ')[1];
                // $('.' + removeid).remove();
                $('#' + removeid).find('td').remove();
                //changed by Nisha 23-03-2024
                $('#' + removeid).remove();//.hide();
            }
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
        else {
            //Todo - row click and  delete means using this line. but tab button using means not working this line
            var removeid = document.getElementById(ttbody).rows[cnt].className.split(' ')[1];
            // $('.' + removeid).remove();
            $('.' + removeid).find('td').remove();
            //changed by Nisha 23-03-2024
            $('.' + removeid).remove();//.hide();
        }

        if (ProjectName.toLowerCase() == "jsu" && (currentScreenName.toLowerCase() == "salesorderform" || currentScreenName == "VanStockRequestNewForm" || currentScreenName == "StockTransferNewForm" || currentScreenName == "InventoryAdjustmentTypeForm" || currentScreenName == "CreditNoteNewForm" || currentScreenName == "SalesOfficeStockRequestForm" || currentScreenName == "SalesOrderEditForm" || currentScreenName == "PONewForm" || currentScreenName == "StockTransferForm")) {
            delete FormView.Item_ItemNo;
        }
           // FormView["Item_ItemNo"].remove();

       


        var _obj = {};
        _obj.fieldName = dataMember;
        PerformAction('rowItemClicked', _obj);
        //todo // commendsalesorder
        //if (CurrentScreen_TabScreen_Name == "SalesOrderForm") {
        //    OrderCalculations(CurrentScreen_TabScreen_Name, fieldName);
        //}
        ///
    } else {
        isDynamicRowItemRemove = false;
    }

}

var _lookUpTitle = '';
var isFormLookUpClicked = false;

function formLookUpClicked(obj, dataMember, rowIndex, value, lookUpTitle, scrName) {

    LoadingImageOpen();

    $('.ui-dialog-titlebar-close').show();

    try {
        setTimeout(function () {
        _lookUpTitle = lookUpTitle;
        // SetFormView();
        FormView._listLookUpIndex = 0;
        FormView.addCount = addCount;
        LastParams.FormView = Params.FormView;
        Params.FormView = FormView;
        Params.arrList = arrList;
        FormView = {};
        FormView.UserID = _UserID;
        FormView.URL = _URL;
        FormView.PlanoGramURL = _PlanoGramURL;
        searchOptionArray = [];
        try {
            objParams.fieldName = FieldName;
            objParams.dynamicFieldName = dynamicFieldName;
        } catch (e) {

        }
        _lookUpFieldId = dataMember;
        isFormLookUpClicked = true;

        // COMMENTED 04.09.2020 ===
        isMultiSelect = false;

        //scrName = '';
        //var scrnName = currentScreenName;
        var scrnName = scrName;
        //Newly add by.M 06.07.2021
        //if (isListLookUpClicked == true)
        //    scrnName = TabScreenName == '' ? currentScreenName : currentScreenName + "_" + TabScreenName;
        if (TabScreenName != '')
            CurrentScreen_TabScreen_Name = TabScreenName == '' ? currentScreenName : currentScreenName + "_" + TabScreenName;
        // CurrentScreen_TabScreen_Name = scrnName;
        //GetLookUpFormConfig(dataMember, 'GenericLookUp', CurrentScreen_TabScreen_Name);
        GetLookUpFormConfig(dataMember, 'GenericLookUp', scrnName);
        // scrnName = scrnName + "_FORM_LOOKUP_" + dataMember;
        if (lookUpTableList.length > 0) {
            FormListConfigHeader(lookUpTableList[0].theadId, lookUpTableList[0].ttbody, lookUpTableList[0].tfoot, scrnName, dataMember, url_GetLookUpListConfig, 'LOOKUP', scrnName);
        }
        else {
            //alert('Your Session is expired.');
            //window.location = "../Login/Login/";
            //PageLogOut();
            return;
        }

        lookUpPopUpOpen();
            LoadingImageClose();
        }, 200);
    }
    catch (e) {
        //alert('Your Session is expired.');
        //window.location = "../Login/Login/";
        //PageLogOut();
        return;
    }



}
var _listLookUpFieldName = '';
//var _listLookUpScreenName = '';
var _listLookUpttbody = '';
var _listLookUpttfoot = '';
var _listLookUpIndex = '';
var _isListNewRowAdd = false;
//var isListLookUpClicked = false;

function listLookUpTextFieldLostFocus(obj, dataMember, rowIndex, listName, lookUpTitle, ttbody, tfoot, sName) {
    var _obj = {};
    _obj.fieldName = dataMember;
    _obj.rowIndex = rowIndex;
    _obj.value = dataMember;
    _listLookUpIndex = rowIndex
    PerformAction('listLookUpTextFieldLostFocus', _obj);
}

//function listAutoCompleteFocused(obj, dataMember, rowIndex, listName, lookUpTitle, ttbody, tfoot, sName) {
//    var Temp = FieldName;
//    var scrName = CurrentScreen_TabScreen_Name; // TabScreenName == '' ? screenName : screenName + "_" + TabScreenName;
//    var sName = "";
//    var id = "CustNo";
//    var rowIndex = "CustNo";
//    for (var i = 0; i < AutoCompleteList.length; i++) {
//        id = AutoCompleteList[i].DataMember;
//        rowIndex = AutoCompleteList[i].rowIndex;
//        $('.Id_' + id + '_' + rowIndex).autocomplete({
//            //$('.Id_' + id).autocomplete({
//            source: function (request, response) {

//                //FormView.AUTOLISTSELECT = "151565";
//                //var _obj = {};
//                //_obj.fieldName = id;
//                //_obj.value = "151565";
//                //PerformAction('autoLookupEntered', _obj);

//                //var tblbody = document.getElementById(_ttbody);
//                //tblbody.rows[currentRowIndex].cells.namedItem(id).childNodes['0'].innerText = "ddd";
//                // var tblbody = document.getElementById(_ttbody);
//                //tblbody.rows[currentRowIndex].cells.namedItem(id).childNodes['0'].innerText = i.item.val;
//                //todo
//                //id = this.element[0].id

//                //  var myLength = $('.Id_' + id + '_' + currentRowIndex).val().length;

//                //  tblbody

//                var tblbody = document.getElementById(ttbody);
//                var tmlval = tblbody.rows[currentRowIndex].cells.namedItem(id).childNodes['0'].value;

//                //if ($('.Id_' + id + '_' + currentRowIndex) == null || $('.Id_' + id + '_' + currentRowIndex) == undefined) return;
//                if (tmlval == null || tmlval == undefined) return;
//                //var myLength = $('.Id_' + id + '_' + currentRowIndex).val().length;
//                var myLength = tmlval.length;
//                //if (myLength <= 3)
//                //    return;
//                //setListValue(this, id, currentRowIndex, _ttbody);

//                if (id == "ItemNo" && runData != "") {
//                    try {
//                        var runData1;

//                        var condValue1 = $('#' + id).val();
//                        runData1 = runData.filter(x => x.label.indexOf(condValue1.toUpperCase()) > -1);

//                        response($.map(runData1, function (item) {
//                            return item;
//                        }))
//                    } catch (err) {

//                    }

//                }
//                else {

//                    sName = scrName + "_LISTVIEW_AUTOCOMPLETE_" + id;
//                    var qry = getString['QueryConfig_' + sName];
//                    qry += ' ' + getString['QueryConfig_' + sName + '_GroupText'];
//                    qry += ' ' + getString['QueryConfig_' + sName + '_OrderText'];
//                    PageLoadinginfo_ALT("AUTO LIST AUTO LIST AUTO LIST:BEFORE " + qry);
//                    qry = formatQueryString(qry, sName);//ScreenView

//                    PageLoadinginfo_ALT("AUTO LIST AUTO LIST AUTO LIST: " + qry);

//                    $.ajax({
//                        url: '../Common/AutoComplete/',
//                        data: { qry: qry },
//                        dataType: "json",
//                        type: "POST",
//                        // contentType: "application/json; charset=utf-8",
//                        success: function (data) {
//                            if (id == "ItemNo") {
//                                runData = data;

//                                try {
//                                    var runData1;

//                                    var condValue1 = $('#' + id).val();
//                                    runData1 = runData.filter(x => x.label.indexOf(condValue1.toUpperCase()) > -1);
//                                    response($.map(runData1, function (item) {
//                                        return item;
//                                    }))
//                                } catch (err) {

//                                }


//                            }
//                            else {
//                                response($.map(data, function (item) {
//                                    return item;
//                                }))
//                            }
//                        },
//                        error: function (response) {
//                            alert(response.responseText);
//                        },
//                        failure: function (response) {
//                            alert(response.responseText);
//                        }
//                    });
//                }
//            },
//            select: function (e, i) {
//                //$('#' + id).val(i.item.val)
//                // $("#hfCustomer").val(i.item.val);
//                //alert(id);
//                //debugger;
//                //  $('.Id_' + id).val(i.item.val);
//                // var tblbody = document.getElementById(_ttbody);
//                //tblbody.rows[currentRowIndex].cells.namedItem(id).childNodes['0'].innerText = i.item.val;

//                // _ttbody=  _ttableId.replace('table_', 'ListBodyDivId_');
//                setListValue("", id, currentRowIndex, _ttbody);

//                //CreateList(_ttbody, _ttbody.replace("ListBodyDivId_", "ListfootDivId_"), currentScreenName, 1, "", _ttbody.split('_')[_ttbody.split('_') - 1], "", "");
//                //        table_CustomerRoutingForm_Customer
//                //ListBodyDivId_CustomerRoutingForm_Customer
//                FormView.AUTOLISTSELECT = i.item.val;
//                AUTOLISTSELECT = i.item.val;
//                _listLookUpttbody = _ttbody;
//                _listLookUpIndex = currentRowIndex;
//                //var _obj = {};
//                //_obj.fieldName = id;
//                //_obj.value = i.item.val;
//                ////  PerformAction('autoLookupEntered', _obj);
//                //PerformAction('autoCompleteEntered', _obj);

//            },
//            minLength: 1
//        });

//    }
//    FieldName = Temp;
//}

function listLookUpClicked(obj, dataMember, rowIndex, listName, lookUpTitle, ttbody, tfoot, sName) {
    $('.ui-dialog-titlebar-close').show();

    //Added by Vignesh 24062024
    LoadingImageOpen();

    _previousispagination = _ispagination;
    isMultiSelect = false;
    ////
    //newly added by.m 12.09.2022
    _ttbody = ttbody;

    currentRowClickCount = rowIndex;
    setListValue(obj, dataMember, rowIndex, ttbody);
    var _obj = {};
    _obj.fieldName = dataMember;
    _obj.rowIndex = rowIndex;
    _obj.value = dataMember;
    _listLookUpIndex = rowIndex
    PerformAction('listLookUpClicked', _obj);

    /////

    _listLookUpFieldName = listName;
    //  _listLookUpScreenName = currentScreenName;
    _lookUpTitle = lookUpTitle;
    _listLookUpttbody = ttbody;
    _listLookUpttfoot = tfoot;
    _listLookUpIndex = rowIndex;
    _isListNewRowAdd = true;

    // SetFormView();
    setListValue("", dataMember, rowIndex, ttbody)
    FormView._listLookUpIndex = rowIndex;
    LastParams.FormView = Params.FormView;
    Params.FormView = FormView;
    Params.arrList = arrList;
    FormView = {};
    FormView.UserID = _UserID;
    FormView.URL = _URL;
    FormView.PlanoGramURL = _PlanoGramURL;
    searchOptionArray = [];
    try {
        objParams.fieldName = FieldName;
        objParams.dynamicFieldName = dynamicFieldName;
    } catch (e) {

    }
    _lookUpFieldId = dataMember;
    // isListLookUpClicked = true;
    isListLookUpClicked = true;

    dataMember = listName.split('_')[0] + "_" + dataMember;
    //todo 21.05.2020 
    //old
    // scrName = '';
    //var scrnName = TabScreenName == '' ? currentScreenName : currentScreenName + "_" + TabScreenName;
    //new
    var scrnName = sName.split('_LISTVIEW_')[0];
    //if (TabScreenName != '')
    //    CurrentScreen_TabScreen_Name = scrnName;

    GetLookUpFormConfig(dataMember, 'GenericLookUp', scrnName);//lookup.js
    // scrnName + "_FORM" + listName + "_LOOKUP_" + dataMember;
    //dataMember = listName + "_" + dataMember;
    if (lookUpTableList.length > 0) {
        FormListConfigHeader(lookUpTableList[0].theadId, lookUpTableList[0].ttbody, lookUpTableList[0].tfoot, scrnName, dataMember, url_GetLookUpListConfig, 'LOOKUP', scrnName);
    }

    //Changes done by vignesh 24/06/2024
    setTimeout(function () {
        lookUpPopUpOpen();
        LoadingImageClose();
    }, 200);

}

//newly added by.M 27.06.2023
function AssignLookUpMultiSelected(ttbody, sName) {
    _previousispagination = _ispagination;
    var listConfig = ListHeaderList['ListConfig_' + ttbody];
    var id = listConfig[1].FieldName;
    var textvalue = "";
    if (_isdynamic == true && LookUpMultiSelected.length == 0) {

        var sScreenName = sName + "_MULTILOOKUPSELECTED";
        qry = getString['QueryConfig_' + sScreenName];
        qry += ' ' + getString['QueryConfig_' + sScreenName + '_GroupText'];
        qry += ' ' + getString['QueryConfig_' + sScreenName + '_OrderText'];
        qry = formatQueryString(qry, sScreenName);

        //var query = "select ItemNo+UOM as ItemNo1 from TransferDettemp where TransNo='STR0000269'";
        execute(qry);
        var data = executeQry;
        if (data != null) {
            for (var i = 0; i < data.length; i++) {
                textvalue = data[i][id];
                _obj = {};
                _obj[id] = textvalue;
                LookUpMultiSelected.push(_obj);
                TempLookUpMultiSelected.push(_obj);

                obj = {};
                obj[id] = textvalue;
                obj["UserNo"] = tempUserNo;
                ListSelectedId.push(obj);
            }
        }
    }

}
var ListLookUpscrnName = "";
function multiSelectListLookUpClicked(obj, dataMember, rowIndex, listName, lookUpTitle, ttbody, tfoot, sName) {
    isMultiClose = false;

    LoadingImageClose();
    LoadingImageOpen();

    setTimeout(function () {
    $('.ui-dialog-titlebar-close').show();
    // debugger;
    AssignLookUpMultiSelected(ttbody, sName);
    ////

    currentRowClickCount = rowIndex;
    setListValue(obj, dataMember, rowIndex, ttbody);
    var _obj = {};
    _obj.fieldName = dataMember;
    _obj.rowIndex = rowIndex;
    _obj.value = dataMember;
    _listLookUpIndex = rowIndex
    PerformAction('listLookUpClicked', _obj);

    /////

    _listLookUpFieldName = listName;
    //  _listLookUpScreenName = currentScreenName;
    _lookUpTitle = lookUpTitle;
    _listLookUpttbody = ttbody;
    _listLookUpttfoot = tfoot;
    _listLookUpIndex = rowIndex;
    _isListNewRowAdd = true;

    // SetFormView();
    setListValue("", dataMember, rowIndex, ttbody)
    FormView._listLookUpIndex = rowIndex;
    LastParams.FormView = Params.FormView;
    Params.FormView = FormView;
    Params.arrList = arrList;
    FormView = {};
    FormView.UserID = _UserID;
    FormView.URL = _URL;
    FormView.PlanoGramURL = _PlanoGramURL;
    searchOptionArray = [];
    try {
        objParams.fieldName = FieldName;
        objParams.dynamicFieldName = dynamicFieldName;
    } catch (e) {

    }
    _lookUpFieldId = dataMember;
    isListLookUpClicked = true;


    //
    var tblbody = document.getElementById(ttbody);
    if (tblbody.children.length == 1)
        LookUpMultiSelected = [];

    LookUpMultiSelected = [];

    if (LookUpMultiSelected.length == 0) {
        LookUpMultiSelected = [];
        var _obj = {};
        var obj = {};
        //     var tblbody = document.getElementById(ttbody);
        var textvalue = "";
        var id = "";
        
        var listConfig = ListHeaderList['ListConfig_' + ttbody];
        id = listConfig[1].FieldName;

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

    //
    dataMember = listName.split('_')[0] + "_" + dataMember;
    var scrnName = sName.split('_LISTVIEW_')[0];
    ListLookUpscrnName = scrnName;
    GetMultiSelectLookUpFormConfig(dataMember, 'GenericLookUp', scrnName);//lookup.js
    if (lookUpTableList.length > 0)
        FormListConfigHeader(lookUpTableList[0].theadId, lookUpTableList[0].ttbody, lookUpTableList[0].tfoot, scrnName, dataMember, url_GetLookUpListConfig, 'LOOKUP', scrnName);

   
        lookUpPopUpOpen();
        LoadingImageClose();
    }, 200);

}


function lookUpPopUpClose() {
    ListLookUpscrnName = "";
    isFormLookUpClicked = false;
    isListLookUpClicked = false;
    //isLstView = false;
    LastParams.FormView == null ? "" : LastParams.FormView._listLookUpIndex = '';
    //jayasurya //
    //FormView = Params.FormView;
    Params.FormView = LastParams.FormView;
    try {
        FieldName = objParams.fieldName;
    } catch (e) {

    }
    addCount = FormView.addCount == undefined ? addCount : FormView.addCount;
    //$('#popupdialog').dialog("close");
    $('.classpopupdialog').dialog("close");

    searchOptionArray = [];
    sortOptionArray = [];
    //dynamicNewRowAdd(); 

}



function dynamicNewRowAdd() {
    // COMMENTED 04.05.2021 
    // FIRST ROW DOES FIRE NEW ROW 
    //if ((_listLookUpIndex + 1) == dynamictableTotalRowCount && _isdynamic == true) {
    ////////PVMIGT
    //try {
    //    var tmpcount = $('#table_' + currentScreenName + '_' + _listLookUpttbody.split('_')[2] + ' >tbody >tr').length;
    //    if (ProjectName == "PVMIGT" && currentScreenName == "BannerImageUploadNewForm" && tmpcount >= 5)
    //        return;
    //} catch (e) {

    //}

    //////
    try {
        dynamictableTotalRowCount = $('#table_' + currentScreenName + '_' + _listLookUpttbody.split('_')[2] + ' >tbody >tr').length;
    } catch (e) {

    }

    //if (ProjectName == "PVMIGT" && currentScreenName == "BannerImageUploadNewForm" && dynamictableTotalRowCount >= 5)
      //  return;
    //////  
    var tmp = document.getElementById(_listLookUpttbody);

    var tmpVal = tmp.rows[tmp.rows.length - 1].cells[1].innerHTML;


    if ((tmp.rows.length - 1) <= _listLookUpIndex) {
        info_ALT_TxtFileName("dynamicNewRowAdd start, _listLookUpIndex: " + _listLookUpIndex + ", dynamictableTotalRowCount: " + dynamictableTotalRowCount + ", _isdynamic: " + _isdynamic, "PerformActionInfoLog");
        if (((_listLookUpIndex + 1) == dynamictableTotalRowCount || dynamictableTotalRowCount == 0) && _isdynamic == true) {
            //tableList.filter(function (x) { return x.ttbody === _listLookUpttbody })[0].screenName
            info_ALT_TxtFileName("dynamicNewRowAdd condition-1", "PerformActionInfoLog");
            //console.log("dynamicNewRowAdd condition-1");
            if (tableList.length >= 1 && tableList.filter(function (x) { return x.ttbody === _listLookUpttbody }).length >= 0) {
                info_ALT_TxtFileName("dynamicNewRowAdd condition-2", "PerformActionInfoLog");
                var sname = tableList.filter(function (x) { return x.ttbody === _listLookUpttbody })[0].screenName;
                var tmp = tableList[0].fieldName;
                //if (tableList[0].screenName == "PONewForm")
                // {
                info_ALT_TxtFileName("dynamicNewRowAdd condition-3", "PerformActionInfoLog");
                if (_listLookUpFieldName == '')
                    CreateList(_listLookUpttbody, _listLookUpttfoot, sname, 1, '', tmp, '', '');
                else
                    CreateList(_listLookUpttbody, _listLookUpttfoot, sname, 1, '', _listLookUpFieldName, '', '');
                //}
                //  else
                //    CreateList(_listLookUpttbody, _listLookUpttfoot, sname, 1, '', _listLookUpFieldName, '', '');
            }
            else {
                info_ALT_TxtFileName("dynamicNewRowAdd condition-4", "PerformActionInfoLog");
                CreateList(_listLookUpttbody, _listLookUpttfoot, currentScreenName, 1, '', _listLookUpFieldName, '', '');
                try {
                    // if (swap_ttbody == ttbody)
                    rowRefresh(swap_ttbody);
                } catch (err) {

                }
            }
            _isListNewRowAdd = true;
            if (isMultiSelect != true)
                dynamictableTotalRowCount = '';
        }
    }
    

}

function lookUpPopUpOpen() {
    // $('#popupdialog').dialog({
    $('.classpopupdialog').dialog({
        //autoOpen: false,
        width: "80%",
        //resizable: false,
        title: _lookUpTitle,
        //title: '' + currentScreenName + ' Details',
        modal: true,
        closeOnEscape: false,
        beforeClose: function (e, a, b) {
            if (e.cancelable == true)
                uiIconCloseThick();
        }
    });
}

function SAVEPHOTO(dataMember, imageName) {
    var sScreenName = currentScreenName + "_" + dataMember + "_SAVEPHOTO";
    TiAPIinfo('SAVE PHOTO sScreenName --> ' + sScreenName);
    qry = "SELECT * FROM ActionConfig WHERE ScreenName = " + safeSQL(sScreenName) + " ORDER By ActionName, DIsplayNo";
    TiAPIinfo('SAVE PHOTO --> ' + qry);
    //dbDataRows = db.execute(qry);
    var dbDataRows = execute(qry);
    dbDataRows = executeQry;
    var qry = '';
    var _dbDataRows = '';
    var imgname = imageName == undefined ? $('#' + dataMember).val().split('/')[$('#' + dataMember).val().split('/').length - 1] : imageName;
    for (var i = 0; i < dbDataRows.length; i++) {
        var qry = getString['QueryConfig_' + dbDataRows[i].ActionPlan];
        if (qry != null && qry != undefined && qry != '') {
            qry = formatQueryString(qry, currentScreenName);//ScreenView
            TiAPIinfo('qry --> ' + qry);
            _dbDataRows = execute(qry);
            _dbDataRows = executeQry;
            if (_dbDataRows != null && _dbDataRows.length > 0) {
                imgname = _dbDataRows[0].imgname;
            }
        }
    }
    SaveImageUpload(dataMember, imgname);
}

function SaveListFileToMain(dataMember, imageName) {
    var sScreenName = currentScreenName + "_" + dataMember.split('_')[0] + "_SAVEPHOTO";
    TiAPIinfo('SAVE PHOTO sScreenName --> ' + sScreenName);
    qry = "SELECT * FROM ActionConfig WHERE ScreenName = " + safeSQL(sScreenName) + " ORDER By ActionName, DIsplayNo";
    TiAPIinfo('SAVE PHOTO --> ' + qry);
    //dbDataRows = db.execute(qry);
    var dbDataRows = execute(qry);
    dbDataRows = executeQry;
    var qry = '';
    var _dbDataRows = '';
    var imgname = imageName == undefined ? "" : imageName;
    for (var i = 0; i < dbDataRows.length; i++) {
        var qry = getString['QueryConfig_' + dbDataRows[i].ActionPlan];
        if (qry != null && qry != undefined && qry != '') {
            qry = formatQueryString(qry, currentScreenName);//ScreenView
            TiAPIinfo('qry --> ' + qry);
            _dbDataRows = execute(qry);
            _dbDataRows = executeQry;
            if (_dbDataRows != null && _dbDataRows.length > 0) {
                imgname = _dbDataRows[0].imgname;
            }
        }
    }
    //   SaveImageUpload(dataMember, imgname);
    SaveListViewFileUpload(dataMember, imgname);
}



function openfileDialog() {
    debugger;
    $("#fileLoader1").click();
}
$images =
    $(document).ready(function () {
        //  $(".imageUpload").change(function (event) {
        $("#fileLoader1").change(function (event) {
            readURL1(this);
        });
    });

function readURL1(input) {
    debugger;
    if (input.files && input.files[0]) {

        $.each(input.files, function () {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('.imageOutput').append('<img src="' + e.target.result + '" />')
            }
            reader.readAsDataURL(this);
        });

    }
}


var isImageChange = false;
function openfileDialog11(cnt, isChange) {
    if (isChange == 1) {
        isImageChange = true;
        $('#popupdialog').dialog("close");
        $("#fileLoader_" + cnt).click();
        $('#popupdialog').dialog("open");
    }
    else {
        $("#fileLoader_" + cnt).click();
    }
}


function cameraButtonClick(cnt, id, isChange) {
    if (isChange == 1) {
        isImageChange = true;
        $('#popupdialog').dialog("close");
        $("#" + id + "_" + cnt).click();
        //  $('#popupdialog').dialog("open");
    }
    else {
        $("#" + id + "_" + cnt).click();
    }
}
$images =
    $(document).ready(function () {
        //  $(".imageUpload").change(function (event) {
        $("#fileLoader1").change(function (event) {
            readURL1(this);
        });
    });
var multiPhotoCount = 0;
function readURL2(input, cnt, height, width) {

    if (input.files && input.files[0]) {

        $.each(input.files, function () {
            var reader = new FileReader();
            reader.onload = function (e) {

                if (isImageChange == true) {
                    isImageChange = false;
                    $('#imageOutput_' + cnt).show().attr('src', e.target.result);
                    $('#imageOutput_a').attr('src', e.target.result);

                    var de = $('#fileLoader_0').get(0).files[0];

                    var element = document.getElementById("myDiv");
                    var numberOfChildren = element.children.length;

                }
                else {
                    // $('.imageOutput_' + cnt).append('<img src="' + e.target.result + '" />')
                    $('#imageOutput_' + cnt).show().attr('src', e.target.result);
                    $('#cameraId_' + cnt).hide();
                    cnt++;
                    var htm = '';
                    htm += '<div class="multiplephotoDiv_' + cnt + '">';
                    htm += '<input type="file" id="fileLoader_' + cnt + '" name="files" onchange="readURL2(this,\'' + +cnt + '\',\'' + height + '\',\'' + width + '\');"  style="display:none" title="Load File"  accept="image/*"/>';
                    htm += '<i class="fa fa-camera" id="cameraId_' + cnt + '"  style="font-size:100px;color:black" onclick="openfileDialog1(\'' + +cnt + '\');"></i>';
                    htm += '<img   type="image"  onclick="multiplephotoclicked(this,\'' + 'imageOutput_' + cnt + '\',\'' + 'multiplephotoDiv_' + cnt + '\',\'' + cnt + '\');" style="width:' + width + '%;height:' + height + 'px; float: left;  padding: 10px;display:none" src=""  id="imageOutput_' + cnt + '" ></img>';
                    htm += '</div>';

                    $("#MultiPhoto").append(htm);
                }
            }
            reader.readAsDataURL(this);
        });

    }
}

function multiPhotoFileOnChane(input, cnt, height, width, id) {
    if (input.files[0] != null && input.accept == "image/*" && input.files[0].size > 200000) {//200000kb
        $('#' + input.id).val(null);
        obj = {};
        obj.title = "Error";
        obj.message = "Image file maximum accept 200kb size. Please select less than 200kb!";
        showAlertMessage(obj);
        //alert("Image file maximum accept 200kb size. Please select less than 200kb!");
        return;
    }
    else if (input.files[0] == null)
        return;
    multiPhotoCount = cnt;

    if (input.files && input.files[0]) {

        $.each(input.files, function () {
            var reader = new FileReader();
            reader.onload = function (e) {

                if (isImageChange == true) {
                    isImageChange = false;
                    $('#' + id + '_ImageId_' + multiPhotoCount).show().attr('src', e.target.result);
                    $('#imageOutput_a').attr('src', e.target.result);

                    //  var de = $('#fileLoader_0').get(0).files[0];

                    var element = document.getElementById("MultiPhoto");
                    var numberOfChildren = element.children.length;

                }
                else {
                    // $('.imageOutput_' + multiPhotoCount).append('<img src="' + e.target.result + '" />')
                    $('#' + id + '_ImageId_' + multiPhotoCount).show().attr('src', e.target.result);
                    multiPhotoAdd(multiPhotoCount, height, width, id);
                    //multiPhotoCount++;
                    //var htm = '';
                    //htm += '<div class="multiplephotoDiv_' + multiPhotoCount + '">';
                    //htm += '<input type="file" id=' + id + '_' + multiPhotoCount + ' name="files" onchange="multiPhotoFileOnChane(this,\'' + +multiPhotoCount + '\',\'' + height + '\',\'' + width + '\',\'' + id + '\');"  style="display:none" title="Load File"  accept="image/*"/>';
                    //htm += '<i class="fa fa-camera" id=' + id + '_CameraId_' + multiPhotoCount + '  style="font-size:100px;color:black" onclick="cameraButtonClick(' + multiPhotoCount + ',\'' + id + '\',0);"></i>';
                    //htm += '<img   type="image"  id=' + id + '_ImageId_' + multiPhotoCount + '   onclick="multiplephotoclicked(\'' + id + '\',\'' + id + '_ImageId_' + multiPhotoCount + '\',\'' + 'multiplephotoDiv_' + multiPhotoCount + '\',' + multiPhotoCount + ');" style="width:' + width + '%;height:' + height + 'px; float: left;  padding: 10px;display:none" src=""  ></img>';
                    //htm += '</div>';

                    //$("#" + id + "_Div").append(htm);
                }
            }
            reader.readAsDataURL(this);
        });

    }
}


function multiPhotoAdd(cnt, height, width, id) {
    $('#' + id + '_CameraId_' + multiPhotoCount).hide();
    multiPhotoCount = cnt + 1;
    // multiPhotoCount++;

    var htm = '';
    htm += '<div class="multiplephotoDiv_' + multiPhotoCount + '">';
    htm += '<input type="file" id=' + id + '_' + multiPhotoCount + ' name="files" onchange="multiPhotoFileOnChane(this,\'' + +multiPhotoCount + '\',\'' + height + '\',\'' + width + '\',\'' + id + '\');"  style="display:none" title="Load File"  accept="image/*"/>';
    htm += '<i class="fa fa-camera" id=' + id + '_CameraId_' + multiPhotoCount + '  style="font-size:100px;color:black" onclick="cameraButtonClick(' + multiPhotoCount + ',\'' + id + '\',0);"></i>';
    htm += '<img   type="image"  id=' + id + '_ImageId_' + multiPhotoCount + '   onclick="multiplephotoclicked(this,\'' + id + '\',\'' + id + '_ImageId_' + multiPhotoCount + '\',\'' + 'multiplephotoDiv_' + multiPhotoCount + '\',' + multiPhotoCount + ');" style="width:' + width + '%;height:' + height + 'px; float: left;  padding: 10px;display:none" src=""  ></img>';
    htm += '</div>';
    $("#" + id + "_Div").append(htm);
}


function multiplephotoclicked(objthis, id, imageId, divId, cnt) {
    //openfileDialog1(0);
    multiplephotoPopUpOpen(objthis, id, imageId, divId, cnt);
}

function multiplephotoPopUpOpen(objthis, id, imageId, divId, cnt) {
    var imgs = document.getElementById(imageId).src;
    var ddd = $('#' + imageId)[0].href;
    var imgName = $('#' + id + '_' + cnt).text();
    //var imgName = $('#' + id + '_' + cnt).text() == "" ? $('#' + id + '_' + cnt)[0].files['0'].name : $('#' + id + '_' + cnt).text().split('/')[$('#' + id + '_' + cnt).text().split('/').length - 1];
    var htm = '';
    htm += '<div>';
    //htm += '<input id="ChangeImage" type="button" style="margin-right:50px;width:25%" value="Re Take"   onclick="formButtonClicked();" />';
    //htm += '<input id="ChangeImage" type="button" style="margin-right:50px;width:25%" value="Delete"   onclick="formButtonClicked();" />';
    //htm += '<input id="ChangeImage" type="button" style="margin-right:50px;width:25%" value="Cancel"   onclick="formButtonClicked();" />'; 

    // COMMENTED 19.02.2021
    //htm += '<button type="button" style="margin-right:50px;width:25%" class="btn btn-info" onclick="cameraButtonClick(' + cnt + ',\'' + id + '\',1);">ReTake</button>';
    htm += '<button type="button" style="margin-right:50px;width:25%" class="btn btn-info" onclick="cameraButtonClick(' + cnt + ',\'' + id + '\',1);">ReUpload</button>';
    htm += '<button type="button" style="margin-right:50px;width:25%" class="btn btn-info"  onclick="RemoveDeleteButtonClicked(\'' + id + '\',' + cnt + ',\'' + imageId + '\',\'' + divId + '\');">Delete</button>';
    htm += '<button type="button" style="margin-right:50px;width:25%" class="btn btn-info" onclick="cancelButtonClicked();">Cancel</button>';
    htm += '</div>';
    htm += '<br />';
    htm += '<div>';

    htm += imgName;
    htm += '<br />';

    // htm += '<img type="image"  style="width:80%;height:300px;"  src="' + imgs + '"  id="imageOutput_a" ></img>';
    htm += '<img type="image"    src="' + imgs + '"  id="imageOutput_a" ></img>';
    htm += '</div>';
    $('#popupdialog').html(htm);

    $('#popupdialog').dialog({
        //autoOpen: false,
        width: "50%",
        //resizable: false,
        title: 'Clicked Image',
        modal: true,
        closeOnEscape: false,
        beforeClose: function (e, a, b) {
           
            if (e.cancelable == true)
                uiIconCloseThick();
        }
    });
}

function RemoveDeleteButtonClicked(inputTypeId, cnt, id, divId) {
    // var imgName = document.getElementById(id).nameProp;
    var imgName = $('#' + inputTypeId + "_" + cnt).text().split('/')[$('#' + inputTypeId + "_" + cnt).text().split('/').length - 1];
    RemoveMultiPhoto(imgName);
    $('#popupdialog').dialog("close");
    $('.' + divId).remove();
    $('.' + id).remove();
}


function cancelButtonClicked() {
    $('#popupdialog').dialog("close");
}

//fileDownload("../ImportFiles/Images//2018000008_1.png", '2018000008_1.png');
function fileDownload(file) {
    window.open(file, 'Download');
    //  window.location.href = file;
    window.open(file);
    //window.location.href = '~/Content/images/photograph-nature4.jpg';
    //window.open('~/Content/images/photograph-nature4.jpg');
}

function clickMonthPicker() {
    $('.ui-datepicker-calendar').css("display", "none");
    // $('.ui-datepicker-month').css("display", "none");
    $('.ui-datepicker-year').css("display", "none");
    $('.ui-datepicker-prevv').css("display", "none");
    $('.ui-datepiczker-next').css("display", "none");
}

function LoadingImageOpen() {
    try {
        //var htm = '<div id="overlay" style="display:none;">';
        //htm += '<img src="../Images/ajax-loader(4).gif" />';
        //htm += '<div class="spinner"></div>';
        //htm += '<br />';
        //htm += 'Loading...';
        // htm += '</div>';
        //$("#LoadingImg").append(htm);
        //  $('#overlay').fadeIn();
        //alert('loading here.');
        var htm = '<img src="../Images/ajax-loader(4).gif"  style="margin-left: 15px;"/>'
        htm += '<br>';
        htm += 'Please wait...';
        $("#LoadingImg").append(htm)

        $('#LoadingImg').fadeIn();
        //$('#popupdialog').dialog({ width: "10%", modal: true, closeOnEscape: false, });
        //$('.ui-dialog-titlebar').hide();
        //$('#popupdialog').html('<img src="../Images/ajax-loader(4).gif"  style="margin-left: 40px;"/>');
    } catch (e) {
        console.log(e);
        //alert(e);
    }

}


function LoadingImageUploadOpen() {



    //$('#popupdialog').dialog({ width: "10%", modal: true, closeOnEscape: false, });
    //$('.ui-dialog-titlebar').hide();
    var htm = '<img src="../Images/ajax-loader(4).gif"  style="margin-left: 15px;"/>'
    htm += '<br>';
    htm += 'Uploading...';
    //$('#popupdialog').html(htm);
    $("#LoadingImg").append(htm);
    $('#LoadingImg').fadeIn();
}
function LoadingImageProcessOpen() {
    //$('#popupdialog').dialog({ width: "10%", modal: true, closeOnEscape: false, });
    //$('.ui-dialog-titlebar').hide();
    var htm = '<img src="../Images/ajax-loader(4).gif"  style="margin-left: 15px;"/>'
    htm += '<br>';
    htm += 'Processing...';
    //$('#popupdialog').html(htm);
    $("#LoadingImg").append(htm);
    $('#LoadingImg').fadeIn();
}
function LoadingImageDownloadOpen() {
    //$('#popupdialog').dialog({ width: "12", modal: true, closeOnEscape: false, });
    //$('.ui-dialog-titlebar').hide();
    var htm = '<img src="../Images/ajax-loader(4).gif"  style="margin-left: 15px;"/>'
    htm += '<br>';
    htm += 'Downloading...';
    // $('#popupdialog').html(htm);
    $("#LoadingImg").append(htm);
    $('#LoadingImg').fadeIn();
}
function LoadingProgressOpen1() {
    // $('#popupdialog').dialog({ width: "25%", modal: true, closeOnEscape: false, });
    //$('#popupdialog').dialog({ width: "35%", modal: true, closeOnEscape: false, });
    $('.ui-dialog-titlebar').hide();
    //$('#popupdialog').html();
    $("#LoadingImg").append('<div class="progress"><div id="dynamic" class="progress-bar progress-bar-info progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%"><span id="current-progress"></span></div></div>');
    $('#LoadingImg').fadeIn();
    var current_progress = 0;
    var interval = setInterval(function () {
        current_progress += 25;
        $("#dynamic")
            .css("width", current_progress + "%")
            .attr("aria-valuenow", current_progress)
        //.text(current_progress + "% Complete");
        if (current_progress >= 100)
            clearInterval(interval);
    }, 1000);
}
function LoadingProgressOpen() {
    // $('#popupdialog').dialog({ width: "25%", modal: true, closeOnEscape: false, });
    $('#popupdialog').dialog({ width: "35%", modal: true, closeOnEscape: false, });
    $('.ui-dialog-titlebar').hide();
    $('#popupdialog').html('<div class="progress"><div id="dynamic" class="progress-bar progress-bar-info progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%"><span id="current-progress"></span></div></div>');
    var current_progress = 0;
    var interval = setInterval(function () {
        current_progress += 25;
        $("#dynamic")
            .css("width", current_progress + "%")
            .attr("aria-valuenow", current_progress)
        //.text(current_progress + "% Complete");
        if (current_progress >= 100)
            clearInterval(interval);
    }, 1000);
}

function LoadingImageClose() {
    $("#LoadingImg").empty();
    $('#LoadingImg').fadeOut();
    //$('.ui-dialog-titlebar').show();
    //$('#popupdialog').html('');
    //$('#popupdialog').dialog("close");
}

function LoadingImagePopUpOpen() {
    try {
        //$('#Loadingpopupdialog').dialog({ width: "12%", modal: true, closeOnEscape: false, });
        //$('.ui-dialog-titlebar').hide();
        var htm = '<img src="../Images/ajax-loader(4).gif"  style="margin-left: 20px;"/>'
        htm += '<br>';
        htm += '  Please wait...';

        //$('#Loadingpopupdialog').html(htm);
        ////  $('#popupdialog').html('<img src="../Images/ajax-loader(4).gif"  style="margin-left: 40px;"/>');
        ////$('#popupdialog').dialog("show");
        //$('#Loadingpopupdialog').dialog('open');

        $('<div class="LoadingImagePopUpOpenId"></div>').appendTo('body')
            .html(htm).dialog({
                modal: true, zIndex: 10000, autoOpen: true,
                width: 'auto', resizable: false,

            });
        $('.ui-dialog-titlebar').hide();
    } catch (e) {
        console.log(e);
        //alert(e);
    }
}

function LoadingImagePopUpClose() {
    //$("#LoadingImg").empty();
    //$('#LoadingImg').fadeOut();
    //$('.ui-dialog-titlebar').show();
    //$('#Loadingpopupdialog').html('');
    $('.LoadingImagePopUpOpenId').html('');
    //$('#Loadingpopupdialog').dialog("close");
    $('.LoadingImagePopUpOpenId').dialog("close");
    //ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix
    $('.ui-dialog-titlebar').show();
}

$(function () {
    if ($("#slider").slider != undefined) {
        $("#slider").slider({
            range: "max",
            min: 1,
            max: 10,
            value: 1,
            slide: function (event, ui) {
                $("#id").val(ui.value);
            }
        });
        $("#id").val($("#slider").slider("value"));
    }
});




function dbDateFormatSQLite(_date) {
    var month = _date.getMonth() + 1;
    var day = _date.getDate();
    var year = _date.getFullYear();
    var hh = _date.getHours();
    var mm = _date.getMinutes();
    var ss = _date.getSeconds();

    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;
    hh = hh < 10 ? "0" + hh : hh;
    mm = mm < 10 ? "0" + mm : mm;
    ss = ss < 10 ? "0" + ss : ss;
    var date = year + "-" + month + "-" + day + " " + hh + ":" + mm + ":" + ss;
    return date;
}

function exampleFunction1(dat, ev, a, b) {
    //alert("Date Selected 1 " + dat._d);
    var val = dbDateFormatSQLite(dat._d);
    //$('#StartDate1').attr('data-act', val);
    //$('#StartDate1').attr('act', val);

    // $('#StartDate1').data('act') = "2020-02-10 00:00:00";


    document.getElementById("StartDate1").setAttribute("data-act", val);

    var x = document.getElementById("StartDate1").getAttribute("data-act");


    alert(x);



}

function GetNumberAndAmountNumberFormat(value, dataMemberType) {
    if (value == "")
        return value;
    var fieldValue = value;
    var dataValue = '';
    if (dataMemberType == 'NUMBERFORMAT' || dataMemberType == 'AMOUNTNUMBERFORMAT') {
        var sCurrencyCode = commonObj.Currency + " ";
        if (dataMemberType == 'AMOUNTNUMBERFORMAT') {
            sCurrencyCode = "";
        }
        var _strValue = fieldValue;
        _strValue = (_strValue == null || _strValue == undefined || _strValue == '') ? 0 : _strValue;
        if (_strValue == 0) {
            dataValue = parseInt(_strValue).toFixed(2);
            fieldValue = dataValue;
        } else {
            _strValue = _strValue.toString();
            if (_strValue.indexOf('/') > -1 || _strValue.indexOf(' / ') > -1) {
                var _dataVal = "", _tmpDataVal = "";
                var arr = (_strValue.indexOf('/') > -1) ? _strValue.split("/") : _strValue.split(" / ");
                if (arr.length > 0) {
                    for (var i = 0; i < arr.length; i++) {
                        COMMONLog('1. arr[' + i + '] ---> ' + arr[i]);
                        //_tmpDataVal = Ti.App.NUMBER.roundNumber(arr[i], commonObj.AmountRoundingDigits);
                        _tmpDataVal = roundNumber(arr[i], commonObj.AmountRoundingDigits);
                        _tmpDataVal = _tmpDataVal.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
                        _dataVal = (i == 0) ? (sCurrencyCode + _tmpDataVal) : (_dataVal + " / " + sCurrencyCode + _tmpDataVal);
                    }
                }
                dataValue = _dataVal;
                fieldValue = dataValue;

            }
            //Changes made by Nisha on 07.12.2023
            //else
            //{
            //    dataValue = roundNumber(_strValue, commonObj.AmountRoundingDigits);//2);
            //    dataValue = dataValue.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
            //    dataValue = sCurrencyCode + dataValue;
            //    fieldValue = dataValue;
            //}
            else {
                dataValue = roundNumber(_strValue, commonObj.AmountRoundingDigits);//2);
                var parts = dataValue.split(".");
                parts[0] = parts[0].toString().replace(/(\B)(?=(\d{3})+(?!\d))/g, "$1,");
                dataValue = parts[0] + "." + parts[1];
                dataValue = sCurrencyCode + dataValue;
                fieldValue = dataValue;
            }
        }

        return fieldValue;
    }
}



//////////////////////////-------------Route Master and det table Update
function RouteMaster() {
    var qry = "select * from routeMaster Where RouteNo='T16R00007102'";
    execute(qry);
    var routeMasterData = executeQry;
    for (var m = 0; m < routeMasterData.length; m++) {

        qry = "select * from salesoffice where code in (select SalesOfficeId from Nodetree where SalesmanTerritory ='" + routeMasterData[m].VehicleNo + "')";
        execute(qry);
        var salesOfficeData = executeQry;
        var slat = "";
        var slon = "";
        //var elat = "";
        //var elon = "";
        slat = salesOfficeData[0].Latitude;
        slon = salesOfficeData[0].Longitude;

        qry = "select Latitude,Longitude,CustNo from Customer where CustNo in ( select CustNo from routedet  Where RouteNo='" + routeMasterData[0].RouteNo + "')";
        execute(qry);
        var customerData = executeQry;
        var tcnt = executeQry.length;
        var arrLocDis = [];
        var updateStopNo = [];

        for (var f = 0; f < tcnt; f++) {
            arrLocDis = [];
            for (var ff = 0; ff < executeQry.length; ff++) {
                if (slat != executeQry[ff].Latitude && slon != executeQry[ff].Longitude) {
                    var dis = distancecalc(slat, slon, executeQry[ff].Latitude, executeQry[ff].Longitude);
                    obj = {};
                    obj["eLatitude"] = executeQry[ff].Latitude;
                    obj["eLongitude"] = executeQry[ff].Longitude;
                    obj["dis"] = dis;
                    obj["CustNo"] = executeQry[ff].CustNo;
                    arrLocDis.push(obj);
                }
            }
            arrLocDis = arrLocDis.sort(function (a, b) {
                return parseFloat(a.dis) - parseFloat(b.dis);
            });

            executeQry = executeQry.filter(function (item) {
                return item.Latitude !== slat
            });
            if (executeQry.length > 0) {
                for (var ii = 0; ii < 1; ii++) {
                    obj = {};
                    obj["Latitude"] = arrLocDis[ii].eLatitude;
                    obj["Longitude"] = arrLocDis[ii].eLongitude;
                    obj["MarkerNo"] = f + 1;
                    obj["CustNo"] = arrLocDis[ii].CustNo;
                    obj["Distance"] = arrLocDis[ii].dis;
                    slat = arrLocDis[ii].eLatitude;
                    slon = arrLocDis[ii].eLongitude;
                    updateStopNo.push(obj);
                }
            }
        }
        var arrayQuery = [];
        if (updateStopNo.length > 0) {
            for (var k = 0; k < updateStopNo.length; k++) {
                qry = "update routedet  StopNo='" + updateStopNo[k].MarkerNo + "' where CustNo='" + updateStopNo[k].CustNo + "' and RouteNo ='" + routeMasterData[m].RouteNo + "'"
                arrayQuery.push(qry);
            }
            // BulkInsertQueries(arrayQuery);
            var ddd = arrayQuery;
        }
    }


}

function distancecalc(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lon2 - lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
}

// Converts numeric degrees to radians
function toRad(Value) {
    return Value * Math.PI / 180;
}




var showimageId = "";
function showimageClicked1(dataMember) {
    showimageId = dataMember;
}

function PONewSkuDistributorLogString(errorStr) {

    try {
        $.ajax({
            type: 'POST',
            //url: url_WriteItemPromoLog,
           // url: url_WriteSearchLog,
            url: url_PONewSKUDistributorLog,
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

function deleteImage(filename) {

    try {
        $.ajax({
            type: 'POST',
            //url: url_WriteItemPromoLog,
            // url: url_WriteSearchLog,
            url: url_ImageDelete,
            dataType: 'json',
            data: { imgname: filename },
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