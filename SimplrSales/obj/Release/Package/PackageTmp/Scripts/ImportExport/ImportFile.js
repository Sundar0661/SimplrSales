function exportSql() {
    // $("#btnExport").on("click", function () {

    if ($('#fileupload').get(0).files[0] == null) {
        alert("Please Select File!");
        return;
    }
    var csv = new FormData();
    csv.append('file', $('#fileupload').get(0).files[0]);
    var provider = $('#ddlProvider').val();
    //alert($("#file").val());
    //alert(csv);
    //alert(provider);
    var tableName = new Array();

    var selectedIDs = new Array();
    $("#table_" + CurrentScreen_TabScreen_Name + "_" + FieldName + "").find('tr').each(function () {
        var row = $(this);
        if (row.find('input[type="checkbox"]').is(':checked')) {
            selectedIDs.push(row[0].innerText);
        }
    });

    if (selectedIDs.length > 1 || selectedIDs.length == 0) {
        alert("Please select one import option box !");
        return;
    }
    var postData = selectedIDs.join(",");
    TiAPIinfo('Import file postData --> ' + postData);
    link1 = url_ExportSQL + "?tableName=" + postData;
    $.ajax({
        type: "POST",
        url: link1,
        data: csv,
        dataType: 'json',
        cache: false,
        contentType: false,
        processData: false,

        success: function (data) {
            TiAPIinfo('Import file result --> ' + data);
            if (data == "1")
                alert("Imported Successfully");
            else
                alert("Imported error");

            //window.open(data.URL);

        },
        error: function (xhr, status, error) {

            TiAPIinfo('error --> ' + xhr.responseText);
            //alert("Error -" + status + ' ' + error);
            //alert("Select Table/File");
        }
    });


    //});

}

function ImportFileToSQL() {
        if ($('#fileupload').get(0).files[0] == null) {
        alert("Please Select File!");
        return;
    }
    //Newly Added by Vishnu on 06.11.2023
    //-----------------------------------------------------------------------------------------------------------------
    var fileName = $('#fileupload').get(0).files[0].name;
    var extension = fileName.split('.').pop();
    //var extension = fileName.substring(fileName.lastIndexOf('.') + 1);
    if (extension != "xlsx") {
        //alert("Please select an excel file format");
        //return;
        obj = {};
        obj.message = "Please select an excel file format(xlsx)?";
        showAlertMessage(obj);
        return;
    }
    //-----------------------------------------------------------------------------------------------------------------

    var csv = new FormData();
    csv.append('file', $('#fileupload').get(0).files[0]);
    var provider = $('#ddlProvider').val();
    var tableName = new Array();
    var selectedIDs = new Array();
    $("#table_ImportDataForm_LstImportData").find('tr').each(function (event) {
        var row = $(this);
        if (row.find('input[type="checkbox"]').is(':checked')) {
            selectedIDs.push(row[0].cells["Checkbox"].innerText);
        }
    });

    LoadingImageOpen();
    var postData = selectedIDs.join(",");
    link1 = url_ImportFileToSQL + "?tableName=" + postData;
    try {
        $.ajax({
            type: "POST",
            url: link1,
            data: csv,
            dataType: 'json',
            cache: false,
            contentType: false,
            processData: false,
            async: true,
            success: function (importResult) {
                LoadingImageClose();
                var j = 0;
                var sheetName = '';
                var linkPath = '';
                $("#table_ImportDataForm_LstImportData").find('tr').each(function (event) {
                    var row = $(this);

                    if (row.find('input[type="checkbox"]').is(':checked')) {

                        if (importResult.split('$')[j].replace(" ", "") == "Completed" || importResult.split('$')[j].replace(" ", "") == "Completed ")
                        {
                            row[0].cells.Status.innerHTML = importResult.split('$')[j];
                            var checkbx = row[0].cells[1];
                            checkbx.childNodes[0].checked = false;
                        }
                        else
                            row[0].cells.Status.innerHTML = "<a href='" + importResult.split('$')[j] + "' style='color: blue' download  target='_blank'>" + importResult.split('$')[j].split('/')[importResult.split('$')[j].split('/').length - 1] + "</a>";

                        //row[0].children.Link.innerHTML = "<a href='" + data.split(',')[j] + "' style='color: blue' download>" + selectedIDs[j] + ".xlsx </a>";
                        j++;
                    }

                });
            },
            complete: function (data) {
                LoadingImageClose();
            },
            failure: function (xhr, status, error) {

                alert("failure - : " + xhr.responseText);
                LoadingImageClose();
            },
            error: function (xhr, status, error) {
                if (status === "timeout") {
                    alert("error timeout : " + xhr.responseText + " : " + error);
                }
                if (location.host == "localhost:52063")
                    alert("error - test : " + xhr.responseText + " : " + error + " : xhr =>:" + xhr);
                LoadingImageClose();
            }
        }).done(function (aa) {
            //  alert("testtst");
        });

    } catch (e) {
        alert("try catch :" + e.message);
    }
    //});

}


//function exportSqlUL() {
function ImportFileToSQLULOld() {

    // $("#btnExport").on("click", function () {

    if ($('#fileupload').get(0).files[0] == null) {
        alert("Please Select File!");
        return;
    }
    var csv = new FormData();

    csv.append('file', $('#fileupload').get(0).files[0]);
    var provider = $('#ddlProvider').val();
    //alert($("#file").val());
    //alert(csv);
    //alert(provider);
    var tableName = new Array();

    var selectedIDs = new Array();


    $("#table_ImportDataForm_LstImportData").find('tr').each(function (event) {
        var row = $(this);
        if (row.find('input[type="checkbox"]').is(':checked')) {
            selectedIDs.push(row[0].cells["Checkbox"].innerText);
        }
    });

    LoadingImageOpen();
    var postData = selectedIDs.join(",");

    link1 = url_ImportFileToSQLUL + "?tableName=" + postData;
    try {

        $.ajax({
            type: "POST",
            url: link1,
            data: csv,
            dataType: 'json',
            cache: false,
            contentType: false,
            processData: false,
            success: function (importResult) {

                LoadingImageClose();
                var j = 0;
                var jj = 0;
                var sheetName = '';
                var linkPath = '';
                $("#table_ImportDataForm_LstImportData").find('tr').each(function (event) {
                    var row = $(this);
                    jj++;

                    if (row.find('input[type="checkbox"]').is(':checked')) {
                        if (importResult.split('$')[j].split('&').length == 3) {
                            if (importResult.split('$')[j].split('&')[1] == "link") {
                                sheetName = importResult.split('$')[j].split('&')[0].split('\\')[importResult.split('$')[j].split('&')[0].split('\\').length - 1];
                                linkPath = importResult.split('$')[j].split('&')[importResult.split('$')[j].split('&').length - 1];
                                linkPath = linkPath.replace(' ', "");
                                row[0].cells.Status.innerHTML = "<a href='" + linkPath + "" + sheetName + "' style='color: blue' download >" + sheetName + "</a>";
                            }
                        }
                        else
                            row[0].cells.Status.innerHTML = importResult.split('$')[j];
                        j++;
                    }
                });
            },
            complete: function (data) {
                //  alert("complete BB- : " + data);
            },
            failure: function (xhr, status, error) {
                alert("failure - : " + xhr.responseText);
                LoadingImageClose();
            },
            error: function (xhr, status, error) {

                if (status === "timeout") {
                    alert("error timeout : " + xhr.responseText + " : " + error);
                }

                alert("error - : " + xhr.responseText + " : " + error);
                LoadingImageClose();

                //alert("Error -" + status + ' ' + error);
                //alert("Select Table/File");
            }
        }).done(function (aa) {
            //  alert("testtst");
        });

    } catch (e) {
        alert("try catch :" + e.message);
    }
    //});

}

function ImportFileToSQLUL() {

    if ($('#fileupload').get(0).files[0] == null) {
        alert("Please Select File!");
        return;
    }
    var csv = new FormData();

    csv.append('file', $('#fileupload').get(0).files[0]);
    var provider = $('#ddlProvider').val();
    var tableName = new Array();
    var selectedIDs = new Array();

    $("#table_ImportDataForm_LstImportData").find('tr').each(function (event) {
        var row = $(this);
        //if (row.find('input[type="checkbox"]').is(':checked') &&   row.find('textarea').val().length <= 0) {
        if (row.find('input[type="checkbox"]').is(':checked')) {
            //selectedIDs.push(row[0].innerText);
            selectedIDs.push(row[0].cells["Checkbox"].innerText);
            //alert('You must fill the text area!');
        }
    });

    LoadingImageUploadOpen();
    var postData = selectedIDs.join(",");

    try {
        $.ajax({
            type: "POST",
            url: url_ImportFileUpload,
            data: csv,
            dataType: 'json',
            cache: false,
            contentType: false,
            processData: false,
            success: function (fileLocation) {
                LoadingImageClose();
                if (fileLocation != "" && fileLocation != null) {
                    LoadingImageProcessOpen();

                    link1 = url_ImportFileToSQLUL + "?tableName=" + postData + "&fileLocation=" + fileLocation;
                    $.ajax({
                        type: "POST",
                        url: link1,
                        // data: csv,
                        dataType: 'json',
                        // cache: false,
                        // contentType: false,
                        // processData: false,
                        success: function (importResult) {
                            LoadingImageClose();
                            var j = 0;
                            // var jj = 0;
                            var sheetName = '';
                            var linkPath = '';
                            $("#table_ImportDataForm_LstImportData").find('tr').each(function (event) {
                                var row = $(this);
                                //  jj++;
                                if (row.find('input[type="checkbox"]').is(':checked')) {
                                    if (importResult.split('$')[j].split('&').length == 3) {
                                        if (importResult.split('$')[j].split('&')[1] == "link") {
                                            sheetName = importResult.split('$')[j].split('&')[0].split('\\')[importResult.split('$')[j].split('&')[0].split('\\').length - 1];
                                            linkPath = importResult.split('$')[j].split('&')[importResult.split('$')[j].split('&').length - 1];
                                            linkPath = linkPath.replace(' ', "");
                                            row[0].cells.Status.innerHTML = "Failed - <a href='" + linkPath + "" + sheetName + "' style='color: blue' download >" + sheetName + "</a>";
                                        }
                                    }
                                    else {
                                        row[0].cells.Status.innerHTML = importResult.split('$')[j];
                                    }

                                    j++;
                                }
                            });
                        },
                        complete: function (data) {
                            //  alert("complete BB- : " + data);
                        },
                        failure: function (xhr, status, error) {
                            alert("failure - : " + xhr.responseText);
                            LoadingImageClose();
                        },
                        error: function (xhr, status, error) {
                            if (status === "timeout") {
                                alert("error timeout : " + xhr.responseText + " : " + error);
                            }
                            alert("error - : " + xhr.responseText + " : " + error);
                            LoadingImageClose();
                        }
                    });
                }
            }
        });
    } catch (e) {
        alert("try catch :" + e.message);
    }
}



$('#Button_OkBtn').on('click', function (e) {
    var files = new FormData(); // you can consider this as 'data bag'
    //   url = 'yourUrl';

    files.append('fileName', $('#file')[0].files[0]); // append selected file to the bag named 'file'
    var _url = url_ImportConfigMaping + "?WORKSHEETNAME=" + $('#TargetAttributes').val();

    $.ajax({
        type: 'post',
        url: _url,
        processData: false,
        contentType: false,
        data: files,
        success: function (response) {
            console.log(response);
        },
        error: function (err) {
            console.log(err);
        }
    });
});


function ImportConfigMap() {
    // $("#btnExport").on("click", function () {
    if ($('#TargetAttributes').val() == "") {
        alert("Please select Target Attributes !");
        return;
    }
    if ($('#fileupload').get(0).files[0] != null) {
        $('#SourceColumnPath').text($('#fileupload').get(0).files[0].name);
        var csv = new FormData();
        csv.append('file', $('#fileupload').get(0).files[0]);
        var _url = url_ImportConfigMaping + "?WORKSHEETNAME=" + $('#TargetAttributes').val();
        if (currentScreenName == "ImportConfig1Form")
            _url = url_ImportConfigMaping1 + "?WORKSHEETNAME=" + $('#TargetAttributes').val();

        $.ajax({
            type: "POST",
            url: _url,
            data: csv,
            dataType: 'json',
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                if (currentScreenName == "ImportConfig1Form") {
                    // alert("test : " + data);
                    LoadDataTableData(data);
                }
                else {
                    // alert(" : " + data);
                    GetDataFromDll(data);
                }
                //  alert("Imported Successfully");
                //window.open(data.URL);
            },
            error: function (xhr, status, error) {
                //alert("Error -" + status + ' ' + error);
                //  alert("Select Table/File");
            }
        });
    }

}


function LoadDataTableData(data) {
    debugger;
    //  $("#ListBodyDivId_ImportConfig1Form_List").empty();
    $(".tablehead").empty();
    var widthPixel = (1105.61 / 100) * 15;
    var headerWidth = widthPixel + "px";
    var htm = '';
    // htm = '<tr  class="tablehead">';
    for (var i = 0; i < data.HeaderList.length; i++) {
        htm += '<th  style="width:' + headerWidth + ';font-size:14px;background-color:#428bca; ">';

        //htm += '<th>';
        //htm += '<th  style="top: 0;position: sticky; width:' + dddd + ';">';
        htm += data.HeaderList[i];
        htm += '</th>';
    }
    // htm += '</tr>';
    $(".tablehead").append(htm);
    // $("#ListHeadDivId_ImportConfig1Form_List").append(htm);

    $("#ListBodyDivId_ImportConfig1Form_List").empty();

    var htm = '';
    for (var i = 0; i < data.parentRow.length; i++) {
        htm += '<tr ">';

        for (var j = 0; j < data.HeaderList.length; j++) {
            htm += '<td style="font-size:14px; ">';
            htm += data.parentRow[i][data.HeaderList[j]] == undefined ? "" : data.parentRow[i][data.HeaderList[j]];
            htm += '</td>';
        }
        htm += '</tr>';

    }

    $("#ListBodyDivId_ImportConfig1Form_List").append(htm);

}


function GetDataFromDll(data) {
    $("#ListBodyDivId_ImportConfigForm_List2").empty();
    if (data != null && data != '') {
        var htm = '';
        for (var i = 0; i < data.importFileHeaderName.length; i++) {

            var intRegex = /^\d+$/;
            var floatRegex = /^((\d+(\.\d *)?)|((\d*\.)?\d+))$/;

            htm += '<tr class="tablecell" style="word-wrap: break-word;">';
            htm += '<td >';
            //htm += '<label> "' + data.importFileHeaderName[i] + '"</label>';
            htm += data.importFileHeaderName[i];
            htm += '</td>';

            htm += '<td  >';
            if (intRegex.test(data.importFileDataField[i]) || floatRegex.test(data.importFileDataField[i]))
                htm += data.importFileDataField[i];
            else
                htm += data.importFileDataField[i].slice(1, -1);
            htm += '</td>';
            htm += '</tr>';

        }
        $("#ListBodyDivId_ImportConfigForm_List2").append(htm);
        ImportConfigClickRow("List2");
        //  data = '';
    }
}

var testDefault = '';
var mappedField = '';

function ImportConfigClickRow(fieldName1) {
    dynamicFieldName1 = fieldName1;
    $("#table_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName1 + " >tbody > tr > td").click(function (event) {
        var tableElements = document.getElementById("ListBodyDivId_ImportConfigForm_List2");
        for (var j = 0; j < tableElements.childElementCount; j++) {
            var tableCells = tableElements.childNodes[j]
            tableCells.bgColor = "transparent";
        }

        $("#table_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName1 + " tr").removeClass('highlighted');
        //  $("#table_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName1 + "").closest('tr').addClass('highlighted');
        $(this).closest('tr').addClass('highlighted');
        mappedField = $(this).closest('tr')[0].childNodes['0'].innerText;
        testDefault = $(this).closest('tr')[0].childNodes['1'].innerText;
    });

}

var incCnt = 0;
function ImportConfigMapping(action) {

    var x = document.getElementById("ListBodyDivId_ImportConfigForm_List3").rows.length;
    //var fff = document.getElementById("ListBodyDivId_ImportConfigForm_List3").rows[0].innerHTML;
    var removeid = '';
    for (var i = 0; i < x; i++) {
        var a = document.getElementById("ListBodyDivId_ImportConfigForm_List3").rows[i].cells['1'].innerText;
        var b = document.getElementById("ListBodyDivId_ImportConfigForm_List3").rows[i].cells['2'].innerText;
        if (a == dbColumnName && b == mappedField && action == "MapBtn") {
            alert("Selected row already mapped !");
            return;
        }
        else if (a == dbColumnName && b == mappedField) {
            var removeid = document.getElementById("ListBodyDivId_ImportConfigForm_List3").rows[i].className.split(' ')[1];
            i = x + 1;
        }
    }

    if (action == "MapBtn") {
        var htm = '';
        htm += '<tr class="tablecell trRows_' + incCnt + '" style="word-wrap: break-word;">';
        htm += '<td >';
        htm += "<input type='button' value='Remove' onclick='RemoveRowList3(" + incCnt + ")'/>";
        htm += '</td>';

        htm += '<td >';
        htm += dbColumnName;
        htm += '</td>';

        htm += '<td  >';
        htm += mappedField;
        htm += '</td>';

        htm += '<td  >';
        htm += testDefault;
        htm += '</td>';

        htm += '</tr>';
        $("#ListBodyDivId_ImportConfigForm_List3").append(htm);
        ImportConfigListClickRow("List3");
        incCnt++;
    }
    else if (action == "UnmapBtn") {
        $('.' + removeid).remove();
        // incCnt--;
        // $('.trRows_' + removeCnt).hide();
    }
}

function RemoveRowList3(i) {

    dataMember = "UnmapBtn";
    obj = {};
    obj.DbColumnName = dbColumnName;
    obj.TestDefault = '';
    obj.MappedField = '';
    obj.FieldName = FieldName;
    FormView["TargetAttributes"] = $('#TargetAttributes').val();
    FormView[FieldName] = obj;
    // ImportConfigMapping(dataMember);
    $('.trRows_' + i).remove();

    var _obj = {};
    _obj.fieldName = dataMember;
    PerformAction('formButtonClicked', _obj);

}

var target = '';
var source = '';
var sampleData = '';

function ImportConfigListClickRow(fieldName2) {
    dynamicFieldName2 = fieldName2;
    $("#table_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName2 + " >tbody > tr > td").click(function (event) {
        $("#table_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName2 + " tr").removeClass('highlighted');
        $(this).closest('tr').addClass('highlighted');
        target = $(this).closest('tr')[0].childNodes['1'].innerText;
        source = $(this).closest('tr')[0].childNodes['2'].innerText;
        sampleData = $(this).closest('tr')[0].childNodes['3'].innerText;

        //document.getElementById("ListBodyDivId_ImportConfigForm_List2").bgColor = "";
        $("#table_" + CurrentScreen_TabScreen_Name + "_List2 tr").removeClass('highlighted');
        $("#table_" + CurrentScreen_TabScreen_Name + "_List1 tr").removeClass('highlighted');
        var tableElements = document.getElementById("ListBodyDivId_ImportConfigForm_List2");

        for (var j = 0; j < tableElements.childElementCount; j++) {
            var tableCells = tableElements.childNodes[j]
            var a = document.getElementById("ListBodyDivId_ImportConfigForm_List2").rows[j].cells['0'].innerText;
            var b = document.getElementById("ListBodyDivId_ImportConfigForm_List2").rows[j].cells['1'].innerText;
            if (a == source && b == sampleData) {
                // tableCells.currentStyle.backgroundColor = "red";
                tableCells.bgColor = "lightgray";
                //  j < tableElements.childElementCount + 1;
            }
            else {
                tableCells.bgColor = "transparent";
            }
        }
        var tableElements = document.getElementById("ListBodyDivId_ImportConfigForm_List1");
        for (var j = 0; j < tableElements.childElementCount; j++) {
            var tableCells = tableElements.childNodes[j]
            var a = document.getElementById("ListBodyDivId_ImportConfigForm_List1").rows[j].cells['0'].innerText;
            if (a == target) {
                tableCells.bgColor = "lightgray";
                //j < tableElements.childElementCount + 1;
            }
            else {
                tableCells.bgColor = "transparent";
            }
        }


    });

}


function SaveImageFiles() {
    debugger;
    if (window.FormData !== undefined) {

        var fileUpload = $("#fileupload").get(0);
        var files = fileUpload.files;

        // Create FormData object  
        var fileData = new FormData();

        // Looping over all files and add it to FormData object  
        for (var i = 0; i < files.length; i++) {
            fileData.append(files[i].name, files[i]);
        }

        // Adding one more key to FormData object  
        //fileData.append('username', "Manas");

        $.ajax({
            //   url: '/Home/UploadFiles',
            url: url_UploadFiles + "?Code=" + $('#Code').val(),
            type: "POST",
            async: false,
            contentType: false, // Not to set any content header  
            processData: false, // Not to process data  
            data: fileData,
            success: function (result) {
                $('#Image').val(result);
                //   alert(result);
            },
            error: function (err, z, x) {

                alert(err.statusText);
            }
        });
    } else {
        alert("FormData is not supported.");
    }
}
var isFileAcceptType = '';
function SaveImageUpload(id, imgname) {
    if (window.FormData !== undefined) {
        var oldImageName = "";

        var fileUpload = $("#" + id + "_1").get(0);
        // var fileUpload = $("#" + id).get(0);
        var files = fileUpload.files;
        if (files.length == 0) {
            if (imgname == $('#' + id).val())
                return;
            else
                oldImageName = $('#' + id).val();
        }

        try {
            imgname = $('#ImgName').val();
            if (imgname == undefined || imgname == "")
            imgname = files[0].name;
            //imgname = $('#' + id).val();
            //imgname = $('#ImgName').val()
        } catch (err) {

        }
       // oldImageName = files[0].name;

        isFileAcceptType = files.length == 0 ? "" : files[0].name.split('.')[files[0].name.split('.').length - 1];
        // Create FormData object  
        var fileData = new FormData();

        // Looping over all files and add it to FormData object  
        for (var i = 0; i < files.length; i++) {
            fileData.append(files[i].name, files[i]);
        }

        // Adding one more key to FormData object  
        //fileData.append('username', "Manas");
        imgname = ReplaceSpecialCharacter(imgname);
        $.ajax({
            //   url: '/Home/UploadFiles',
            //url: url_UploadFiles + "?imgname=" + imgname + "&oldImageName=" + oldImageName,
            url: url_UploadFiles + "?imgname=" + imgname + "&oldImageName=" + oldImageName + "&imgPath=" + $('#ImagePath').val(),

            type: "POST",
            async: false,
            contentType: false, // Not to set any content header  
            processData: false, // Not to process data  
            data: fileData,
            success: function (result) {
                //if newly added by.M 01.08.2023
                if (result.split('/').length > 1)
                    $('#' + id).val(result.split('/')[result.split('/').length - 1]);
                else
                    $('#' + id).val(result);
                // alert(result +"   ID   "+ $('#' + id).val());
            },
            error: function (err, z, x) {
                var dd = err;
                //alert(err.statusText);
            }
        });
    } else {
        alert("FormData is not supported.");
    }
}



function SaveListViewFileUpload(id, imgname) {
    debugger;
    if (window.FormData !== undefined) {

        var fileUpload = $("#File_" + id).get(0);
        // var fileUpload = $("#" + id).get(0);
        var files = fileUpload.files;
        //if (files.length == 0)
        //    return;

        var oldImageName = "";

        ///
        var imName = $('#' + id).val().split('/')[$('#' + id).val().split('/').length - 1];
        if (files.length == 0) {
            $('#' + id).val(imName);
            return;
            //if (imgname == imName)//$('#' + id).val())
            //    return;
            //else
            //    oldImageName = imName;//$('#' + id).val();
        }

        ///
        isFileAcceptType = files[0].name.split('.')[files[0].name.split('.').length - 1];
        // Create FormData object  
        var fileData = new FormData();
        // Looping over all files and add it to FormData object  
        for (var i = 0; i < files.length; i++) {
            fileData.append(files[i].name, files[i]);
        }

        $.ajax({
            url: url_UploadFiles + "?imgname=" + imgname + "&oldImageName=" + oldImageName + "&screenName=" + currentScreenName,
            type: "POST",
            async: false,
            contentType: false, // Not to set any content header  
            processData: false, // Not to process data  
            data: fileData,
            success: function (result) {
                $('#' + id).val(result);
            },
            error: function (err, z, x) {
            }
        });
    } else {
        alert("FormData is not supported.");
    }
}


var imageIdLastCount = 0;
function SaveMultiPhotoImageUpload(id, imgname) {

    if (window.FormData !== undefined) {

        var fileUpload = $("#" + id).get(0);
        // var fileUpload = $("#" + id).get(0);

        var oldImageName = "";
        var files = fileUpload.files;
        if (files.length == 0) {
            imageIdLastCount = $('#' + id).text().split('_')[1].split('.')[0]
            //imageIdLastCount = $('#' + id)[0].innerHTML.split('/')[$('#' + id)[0].innerHTML.split('/').length - 1].split('_')[1].split('.')[0];
            $('#' + id.split('_')[0]).val($('#' + id)[0].innerHTML);
            oldImageName = $('#' + id).text();
            //oldImageName = $('#' + id)[0].innerHTML.split('/')[$('#' + id)[0].innerHTML.split('/').length - 1];
            // return;
        }

        else {
            if (parseInt(imageIdLastCount) > 0) {
            }
        }
        // return;
        // Create FormData object  
        var fileData = new FormData();

        // Looping over all files and add it to FormData object  
        for (var i = 0; i < files.length; i++) {
            fileData.append(files[i].name, files[i]);
        }

        // Adding one more key to FormData object  
        //fileData.append('username', "Manas");

        $.ajax({
            //   url: '/Home/UploadFiles',
            url: url_UploadFiles + "?imgname=" + imgname + "&oldImageName=" + oldImageName + "&imgPath=" + $('#ImagePath').val(),
            type: "POST",
            async: false,
            contentType: false, // Not to set any content header  
            processData: false, // Not to process data  
            data: fileData,
            success: function (result) {
                //   if (oldImageName == "")
                $('#' + id.split('_')[0]).val(result);
                //   alert(result);
            },
            error: function (err, z, x) {

                alert(err.statusText);
            }
        });
    } else {
        alert("FormData is not supported.");
    }
}

function RemoveMultiPhoto(imgname) {

    $.ajax({
        //   url: '/Home/UploadFiles',
        url: url_RemoveMultiPhoto + "?imgname=" + imgname,
        type: "POST",
        async: false,
        //contentType: false, // Not to set any content header  
        //processData: false, // Not to process data  
        // data: fileData,
        success: function (result) {
            //alert(result);
        },
        error: function (err, z, x) {

            // alert(err.statusText);
        }
    });

}
function RemovePhoto(imgname) {

    $.ajax({
        url: url_RemovePhoto + "?imgname=" + imgname,
        type: "POST",
        async: false,
        success: function (result) {
        },
        error: function (err, z, x) {
        }
    });

}

function ImportFile() {
    $.ajax({
        url: url_ImportFile,
        type: 'POST',
        dataType: 'json',
        async: false,
        success: function (results) {
            alert(results);
        },
        error: function (results, q, a) {
            alert(results);
        }
    });
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            // $('#blah').attr('src', "E:\\Source\\JSU\\SimplrSales\\SimplrSales\\ImportFiles\\Images\\10.png");
            //$('#blah').attr('src', "C:\\Users\\DELL\\Desktop\\IMG_20180424_203412.jpg");
            $('#showImage').attr('src', e.target.result);
        };
        //var ddd = $("#fileupload").get(0).files[0];
        reader.readAsDataURL(input.files[0]);
    }
}



function exportFileUL() {

    var tableName = new Array();

    var selectedIDs = new Array();
    // table_ImportDataForm_LstImportData
    $("#table_ExportDataForm_LstExportData").find('tr').each(function (event) {
        var row = $(this);
        //if (row.find('input[type="checkbox"]').is(':checked') &&   row.find('textarea').val().length <= 0) {
        if (row.find('input[type="checkbox"]').is(':checked')) {
            selectedIDs.push(row[0].children.AliasName.innerText);
            // selectedIDs.push(row[0].cells["Checkbox"].innerText);
            //alert('You must fill the text area!');
        }
    });

    var postData = selectedIDs.join(",");

    link1 = url_ExportFileUL + "?tableName=" + postData;

    //$('#popupdialog').dialog({ width: "20%", modal: true, closeOnEscape: false, });
    //// $('.ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix
    //$('.ui-dialog-titlebar').hide();
    //$('#popupdialog').html('<img src="../Images/ajax-loader%20(4).gif"  style="margin-left: 90px;"/>');
    LoadingImageOpen();
    //$("#LoadingImg").append('<span style="width:100%;"><img src="http://www.snacklocal.com/images/ajaxload.gif"></span>');
    $.ajax({
        type: "POST",
        url: link1,
        // data: csv,
        dataType: 'json',
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            if (data != "") {
                var j = 0;
                $("#table_ExportDataForm_LstExportData").find('tr').each(function (event) {
                    var row = $(this);
                    //if (row.find('input[type="checkbox"]').is(':checked') &&   row.find('textarea').val().length <= 0) {
                    if (row.find('input[type="checkbox"]').is(':checked')) {
                        //for (var j = 0; j < selectedIDs.length; j++) {
                        row[0].children.Link.innerHTML = "";
                        row[0].children.Link.innerHTML = "<a href='" + data.split(',')[j] + "' style='color: blue' download>" + selectedIDs[j] + ".xlsx </a>";
                        //row[0].children.Link.innerHTML = "<a href='" + data.split(',')[j] + "' download>" + selectedIDs[j] + ".xlsx </a>";
                        j++;
                        // }
                    }
                });
            }

            LoadingImageClose();
            // $("#LoadingImg").html('');
        },
        error: function (xhr, status, error) {
            LoadingImageClose();
            //alert("Error -" + status + ' ' + error);
            // alert("Select Table/File");
        }
    });

}

function exportFileULCR() {
    var tableName = new Array();
    var selectedIDs = new Array();
    // table_ImportDataForm_LstImportData
    $("#table_ExportDataForm_LstExportData").find('tr').each(function (event) {
        var row = $(this);
        //if (row.find('input[type="checkbox"]').is(':checked') &&   row.find('textarea').val().length <= 0) {
        if (row.find('input[type="checkbox"]').is(':checked')) {
            selectedIDs.push(row[0].children.AliasName.innerText);
            // selectedIDs.push(row[0].cells["Checkbox"].innerText);
            //alert('You must fill the text area!');
        }
    });

    var postData = selectedIDs.join(",");

    link1 = url_ExportFileULCR + "?tableName=" + postData;
    LoadingImageDownloadOpen();
    $.ajax({
        type: "POST",
        url: link1,
        // data: csv,
        dataType: 'json',
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            if (data != "") {
                var j = 0;
                $("#table_ExportDataForm_LstExportData").find('tr').each(function (event) {
                    var row = $(this);
                    //if (row.find('input[type="checkbox"]').is(':checked') &&   row.find('textarea').val().length <= 0) {
                    if (row.find('input[type="checkbox"]').is(':checked')) {
                        //for (var j = 0; j < selectedIDs.length; j++) {
                        row[0].children.Link.innerHTML = "";
                        row[0].children.Link.innerHTML = "<a href='" + data.split(',')[j] + "' style='color: blue' download>" + selectedIDs[j] + ".xlsx </a>";
                        //row[0].children.Link.innerHTML = "<a href='" + data.split(',')[j] + "' download>" + selectedIDs[j] + ".xlsx </a>";
                        j++;
                        // }
                    }
                });
            }

            LoadingImageClose();


        },
        error: function (xhr, status, error) {
            LoadingImageClose();
            //alert("Error -" + status + ' ' + error);
            // alert("Select Table/File");
        }
    });


    //});

}


function exportFileToSQL() {
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

    var postData = selectedIDs.join(",");
    var d = new Date();
    var usrId = $('#User').val() == undefined ? "" : $('#User').val();
    var fromDate = $('#FromDate').val() == undefined ? d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear() : $('#FromDate').val();
    var toDate = $('#ToDate').val() == undefined ? d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear() : $('#ToDate').val();
    link1 = url_ExportFile + "?tableName=" + postData + "&AgentID=" + usrId + "&FromDt=" + fromDate + "&ToDt=" + toDate;
    // link1 = url_ExportFile + "?tableName=" + postData + "&AgentID=" + $('#User').val() + "&FromDt=" + $('#FromDate').val() + "&ToDt=" + $('#ToDate').val();
    link1 = url_ExportFile + "?tableName=" + postData;

    LoadingImageOpen();
    //$("#LoadingImg").append('<span style="width:100%;"><img src="http://www.snacklocal.com/images/ajaxload.gif"></span>');
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
                });
            }

            LoadingImageClose();

        },
        error: function (xhr, status, error) {


            LoadingImageClose();
            //alert("Error -" + status + ' ' + error);
            // alert("Select Table/File");
        }
    });


    //});

}


function POSDataUploadUL() {
    $('#divError').hide();
    $("#ExportListDivId").hide();
    if ($('#fileupload').get(0).files[0] == null) {
        alert("Please Select File!");
        return;
    }
    var csv = new FormData();
    csv.append('file', $('#fileupload').get(0).files[0]);

    var link1 = url_POSDataUploadUL + "?CustNo=" + $('#CustNo').val();

    //$('#popupdialog').dialog({ width: "20%", modal: true, closeOnEscape: false, });
    //$('.ui-dialog-titlebar').hide();
    //$('#popupdialog').html('<img src="../Images/ajax-loader%20(4).gif"  style="margin-left: 90px;"/>');
    LoadingImageOpen();
    $.ajax({
        type: "POST",
        url: link1,
        data: csv,
        dataType: 'json',
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            LoadingImageClose();

            //alert(data);
            if (data == "True") {
                POSDataUploadAlert(data, data);
            }
            else if (data.split('&')[1] == "link") {
                var btns = {};
                btns["Ok"] = function (e) {
                    $(this).dialog("close");
                }
                var sheetName = data.split('&')[0].split('\\')[data.split('&')[0].split('\\').length - 1];
                $('<div></div>').appendTo('body')
                                   .html('<div><h6><a href="' + data.split('&')[2] + sheetName + '" style="color: blue" download  >' + sheetName + '</a></h6></div>').dialog({
                                       modal: true, title: "POS file(s) Log Generated", zIndex: 10000, autoOpen: true,
                                       width: '20%', resizable: false,
                                       buttons: btns
                                   });
            }
            else if (data.split('&')[1] == "alert") {
                var btns = {};
                btns["Ok"] = function (e) {
                    $(this).dialog("close");
                }
                $('<div></div>').appendTo('body')
                                   .html('<div><h6>' + data.split('&')[0] + '</h6></div>').dialog({
                                       modal: true, title: "POS file(s) Uploaded", zIndex: 10000, autoOpen: true,
                                       width: '20%', resizable: false,
                                       buttons: btns
                                   });
            }

            else if (data.split('&')[1] == 'False') {
                data = data.split('&')[0];
                if (data == "Completed") {
                    $('#divError').hide();
                    //alert(results);
                    var btns = {};
                    btns["Ok"] = function (e) {
                        $(this).dialog("close");
                    }

                    $('<div></div>').appendTo('body')
                                    .html('<div><h6>' + "1 file(s) Uploaded Successfully!" + '</h6></div>').dialog({
                                        modal: true, title: "POS file(s) Uploaded", zIndex: 10000, autoOpen: true,
                                        width: '20%', resizable: false,
                                        buttons: btns
                                    });
                }
                else if (data == "Warning : Duplicate rows are found. should you want to proceed?")
                    DuplicateRowsAlert();

                else if (data == "File : Improper Format")
                    alert(data);
                else
                    showErrorMessageLog(data);
            }
            else {
                alert(data);
            }
        },
        error: function (xhr, status, error) {
            LoadingImageClose();
            //alert("Error -" + status + ' ' + error);
            //  alert("Select Table/File");
        }
    });

}

function DownloadBlobe() {
    LoadingImageOpen();

    $.ajax({
        type: "POST",
        url: url_DownloadBlobe,
        dataType: 'json',
        // async: false,
        success: function (data) {
            LoadingImageClose();
            // alert(data);
            CreateLinkList(data);

            var btns = {};
            btns["Ok"] = function (e) {
                $(this).dialog("close");
            }
            $('<div></div>').appendTo('body')
                               .html('<div><h6>' + data.split('#')[0] + '</h6></div>').dialog({
                                   modal: true, title: "Blobe Message", zIndex: 10000, autoOpen: true,
                                   width: '20%', resizable: false,
                                   buttons: btns
                               });
        },
        error: function (xhr, status, error) {
            LoadingImageClose();
        }
    });

}

function CreateLinkList(data) {
    $("#ExportListDivId").show();
    $("#ExportListDivId").empty();
    var fileList = data.split('#')[1].split('&');
    var link = '';
    var fileName = '';

    var htm = '';
    htm += '<table  style="table-layout:auto"  class="table table-striped table-bordered tableId">';
    htm += '<thead  style="background-color:#000066; color: white; ">';
    htm += '<tr>';
    htm += '<th>S.No</th>';
    htm += '<th>Link</th>';
    htm += '<th>Status</th>';
    htm += '</tr>';
    htm += '</thead>';
    htm += '<tbody >';
    for (var j = 0; j < (fileList.length - 1) ; j++) {
        htm += '<tr>';
        htm += '<td>' + (j + 1) + '</td>';
        link = fileList[j].split('$')[0];
        fileName = fileList[j].split('$')[0].split('/')[fileList[j].split('$')[0].split('/').length - 1]
        htm += '<td><a href="' + link + '" style="color: blue" download  >' + fileName + '</a></td>';
        htm += '<td>' + fileList[j].split('$')[1] + '</td>';
        htm += '</tr>';
    }
    htm += '</tbody>';
    htm += '<tfoot  >';
    htm += '</tfoot>';
    htm += '</table>';

    $("#ExportListDivId").append(htm);

}



function POSDataUploadAlert(data) {

    var btns = {};

    btns["Override"] = function (e) {
        e.preventDefault();
        $(this).dialog("close");

        LoadingImageOpen();
        POSDataUploadAdDelete("Delete", url_POSDataUploadAddDelete, data);
    }

    btns["Cancel"] = function (e) {
        $(this).dialog("close");
    }

    $('<div class="ddd"></div>').appendTo('body')
                .html('<div class="ddd"><h6>' + "The Control No. provided is already present. Please choose any of the following option to proceed further" + '</h6></div>').dialog({
                    modal: true, title: "POS Data Upload", zIndex: 10000, autoOpen: true,
                    width: '20%', resizable: false,
                    buttons: btns
                });
}



function POSDataUploadAdDelete(value, url, returnVal) {
    $('#dialog').dialog('close');

    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        //async: false,
        data: { CustNo: $('#CustNo').val(), value: value, returnVal: returnVal },
        success: function (results) {
            LoadingImageClose();
            if (results == "Completed") {
                $('#divError').hide();
                //alert(results);
                var btns = {};
                btns["Ok"] = function (e) {
                    $(this).dialog("close");
                }

                $('<div id="dddf"></div>').appendTo('body')
                                .html('<div><h6>' + "1 file(s) Uploaded Successfully!" + '</h6></div>').dialog({
                                    modal: true, title: "POS file(s) Uploaded", zIndex: 10000, autoOpen: true,
                                    width: '20%', resizable: false,
                                    buttons: btns
                                });
            }
            else if (results.split('&')[1] == "link") {
                var btns = {};
                btns["Ok"] = function (e) {
                    $(this).dialog("close");
                }
                var sheetName = results.split('&')[0].split('\\')[results.split('&')[0].split('\\').length - 1];
                $('<div></div>').appendTo('body')
                                   .html('<div><h6><a href="' + results.split('&')[2] + sheetName + '" style="color: blue" download  >' + sheetName + '</a></h6></div>').dialog({
                                       modal: true, title: "POS file(s) Log Generated", zIndex: 10000, autoOpen: true,
                                       width: '20%', resizable: false,
                                       buttons: btns
                                   });
            }
            else if (results.split('&')[1] == "alert") {
                var btns = {};
                btns["Ok"] = function (e) {
                    $(this).dialog("close");
                }
                $('<div></div>').appendTo('body')
                                   .html('<div><h6>' + results.split('&')[0] + '</h6></div>').dialog({
                                       modal: true, title: "POS file(s) Uploaded", zIndex: 10000, autoOpen: true,
                                       width: '20%', resizable: false,
                                       buttons: btns
                                   });
            }
            else if (results == "Warning : Duplicate rows are found. should you want to proceed?")
                DuplicateRowsAlert();
            else if (results == 'File Not properly Loaded' || results == 'File not properly loaded')
                alert(results);
            else if (results == "File : Improper Format")
                alert(results);
            else
                showErrorMessageLog(results);
            // alert(results);
        },
        error: function (results, q, a) {
            alert(results);
        }
    });
}

function DuplicateRowsAlert() {
    var btns = {};

    btns["Yes"] = function (e) {
        $(this).dialog("close");
        POSDataUploadAdDelete("Yes", url_POSDataUploadError, "");
        //POSDataUploadError("Yes", url_POSDataUploadError);
    }
    btns["No"] = function (e) {
        $(this).dialog("close");
    }

    $('<div></div>').appendTo('body')
                    .html('<div><h6>' + "Warning : Duplicate rows are found. should you want to proceed?" + '</h6></div>').dialog({
                        modal: true, title: "POS Data Upload", zIndex: 10000, autoOpen: true,
                        width: '20%', resizable: false,
                        buttons: btns
                    });
}

function POSDataUploadError(value, url) {
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        async: false,
        data: { value: value },
        success: function (results) {
            if (results == "Completed") {
                $('#divError').hide();
                var btns = {};
                btns["Ok"] = function (e) {
                    $(this).dialog("close");
                }
                $('<div></div>').appendTo('body')
                                .html('<div><h6>' + "1 file(s) Uploaded Successfully!" + '</h6></div>').dialog({
                                    modal: true, title: "POS file(s) Uploaded", zIndex: 10000, autoOpen: true,
                                    width: '20%', resizable: false,
                                    buttons: btns
                                });
            }
            else
                showErrorMessageLog(results);
            // alert(results);
        },
        error: function (results, q, a) {
            alert(results);
        }
    });
}


function showErrorMessageLog(data) {
    if (data.split('\r\n').length > 1) {
        $('div#divError').removeAttr('id');

        $("#divError").html('');
        $("#divError").empty();
        $("#ListBodyDivId_Error").empty();
        $('#ListHeadDivId_Error').empty();
        var htm = '';

        htm += '<div class="row" id="divError">';
        htm += '<br />';
        htm += '<div style="width: 50%;margin-left:200px;">';
        htm += '<div class="tableDiv_E" style="width:100% ; overflow-y: auto; height:350px"; overflow-y: auto;">';
        htm += '<table id="table_E" class="table table-striped table-bordered tableId">';
        htm += '<thead id="ListHeadDivId_Error">';
        htm += '<tr style="background-color:#428bca" >';
        htm += '<th >';
        htm += "Row Number"
        htm += '</th>';
        htm += '<th >';
        htm += "Message"
        htm += '</th>';
        htm += '</tr>';
        htm += '</thead>';
        htm += '<tbody id="ListBodyDivId_Error" >';
        var datas = data.split('\r\n');
        for (var i = 0; i < datas.length - 1; i++) {
            htm += '<tr  >';
            for (var j = 0; j < datas[i].split(':').length; j++) {
                htm += '<td >';
                htm += datas[i].split(':')[j];
                htm += '</td>';
            }
            htm += '</tr>';
        }

        htm += '</tbody>';

        htm += '</table>';
        htm += '</div>';
        htm += '</div>';

        htm += '</div>';
        $("#FormListDivId").append(htm);
        $('#divError').show();
    }
    else
        alert(data);

}

function MDFImportList() {
    //debugger;
    //alert("test");
    try {
        if ($('#fileupload').get(0).files[0] == null) {
            alert("Please Select File!");
            $('#Template').html('<z><a href="../ImportFiles/CSV/MDF.csv" style="display:none" style="color: blue" download>MDF.csv</a></z>');
            return;
        }
        var csv = new FormData();
        csv.append('file', $('#fileupload').get(0).files[0]);
        //var url_MDFImportListDancom = '/ImportExcel/MDFImportListDancom/';
        //var url_MDFImportListDancom = '/ImportExcel/ImportFromExcelToList/';
        var url_GetImportFromExcelData = ProjectName.toLowerCase() == "dancom" ? url_MDFImportListDancom : url_MDFImportListDancom;
        LoadingImagePopUpOpen();
        $.ajax({
            type: "POST",
            url: url_GetImportFromExcelData,
            data: csv,
            dataType: 'json',
            cache: false,
            async: true,
            contentType: false,
            processData: false,
            success: function (data) {
                //if (ProjectName.toLowerCase() == "targetmedia") {
                //    for (var i = 0; i < data.length; i++) {
                //        if (data[i].HeatNo == "") {
                //            alert("Import sheet Device Serial No column, row no " + (i + 1) + " is empty");
                //            i = data.length;

                LoadingImagePopUpClose();

                if (data == "Completed") {
                    $('<div id="dddf"></div>').appendTo('body')
                   .html('<div><h6>' + "1 file Uploaded Successfully!" + '</h6></div>').dialog({
                       modal: true, title: "Import MDF", zIndex: 10000, autoOpen: true,
                       width: '20%', resizable: false,
                       buttons: btns
                   });
                }
                else
                    showErrorMessageLog(data);
                    return;
                //        }
                //    }
                //}

                    var data = [];
                    data["countRows"] = "[{\"cnt\":0}]"
                    data["List"] = JSON.stringify(data);

                $("#ListBodyDivId_SerialNoUpdateNewForm_LstHeatList").empty();
                $('#ListfootDivId_SerialNoUpdateNewForm_LstHeatList').empty();
                objAddDynamicListCount['ListConfig_ListBodyDivId_SerialNoUpdateNewForm_LstHeatList'] = -1;
                SetListData("ListBodyDivId_SerialNoUpdateNewForm_LstHeatList", "ListfootDivId_SerialNoUpdateNewForm_LstHeatList", "SerialNoUpdateNewForm", "0", "", "LstHeatList", "", result);
                LoadingImagePopUpClose();

            },
            error: function (xhr, status, error) {

                LoadingImagePopUpClose();

                TiAPIinfo('error --> ' + xhr.responseText);
            }
        });

    }


    catch (ex)
    {
        alert(ex.message);
    }


    //});

}

function ImportFromExcelToList() {
    //debugger;
    if ($('#fileupload').get(0).files[0] == null) {
        alert("Please Select File!");
        return;
    }
    var csv = new FormData();
    csv.append('file', $('#fileupload').get(0).files[0]);
    //alert(url_ImportFromExcelToListDancom);
    //alert(url_ImportFromExcelToList);
    var url_GetImportFromExcelData = ProjectName.toLowerCase() == "dancom" ? url_ImportFromExcelToListDancom : url_ImportFromExcelToList;
    LoadingImagePopUpOpen();
    $.ajax({
        type: "POST",
        url: url_GetImportFromExcelData,
        data: csv,
        dataType: 'json',
        cache: false,
        async: true,
        contentType: false,
        processData: false,
        success: function (data) {
            if (ProjectName.toLowerCase() == "targetmedia") {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].HeatNo == "") {
                        alert("Import sheet Device Serial No column, row no " + (i + 1) + " is empty");
                        i = data.length;
                        LoadingImagePopUpClose();
                        return;
                    }
                }
            }

            var result = [];
            result["countRows"] = "[{\"cnt\":0}]"
            result["List"] = JSON.stringify(data);

            $("#ListBodyDivId_SerialNoUpdateNewForm_LstHeatList").empty();
            $('#ListfootDivId_SerialNoUpdateNewForm_LstHeatList').empty();
            objAddDynamicListCount['ListConfig_ListBodyDivId_SerialNoUpdateNewForm_LstHeatList'] = -1;
            SetListData("ListBodyDivId_SerialNoUpdateNewForm_LstHeatList", "ListfootDivId_SerialNoUpdateNewForm_LstHeatList", "SerialNoUpdateNewForm", "0", "", "LstHeatList", "", result);
            LoadingImagePopUpClose();

        },
        error: function (xhr, status, error) {
            LoadingImagePopUpClose();

            TiAPIinfo('error --> ' + xhr.responseText);
        }
    });


    //});

}
