﻿//view using format:
//use SimplrLimTraders


//var encryptkey = CryptoJS.enc.Utf8.parse('simplr8080808080');
//var encryptiv = CryptoJS.enc.Utf8.parse('simplr8080808080');
var VhCntqry = "";
var current_Row_Reference = null;
var current_Table_Reference = null;

var prev_current_Row_Reference = null;

// SPECIFIC FOR  POD  PROJECT =======================
var vehicle_Iteration = 0;
var Origin_latitude;
var Origin_longitude;
var selectData;
var sorted_Customer_List = [];

var is_first_Time_Loaded = true;

// SPECIFIC FOR  POD  PROJECT =======================

$(document).ready(function () {
    $("tbody.connectedSortable")
        .sortable({
            connectWith: ".connectedSortable",
            items: "> tr:not(:first)",
            appendTo: "parent",
            // helper: "clone",
            cursor: "move",
            // zIndex: 999990,
            //stop: function(e, ui) {
            //    if (ProjectName.toLowerCase() == "pod") {
            //        showAlertMessage("Information", "Orders cannot be reallocated to vehicles assigned to other districts");
            //        $(ui.sender).sortable('cancel');
            //    }
            //},
            receive: function (dataTo, dataFrom, e) {

                vehicleId = dataTo.target.className.split(' connectedSortable')[0];
                var ordNo = dataFrom.item[0].children['0'].innerText;

                var qry = "";
                if (ProjectName.toLowerCase() == "poc") {
                    var btns = {};
                    btns["Ok"] = function (e) {
                        qry = "update Orderhdr set AgentId='" + vehicleId + "',  VehicleId='" + vehicleId + "' where OrdNo='" + ordNo + "'";

                        ExecuteInsertUpdateQuery(qry);
                        is_first_Time_Loaded = false;
                        GetVehicleData();
                        $(this).dialog("close");
                    }

                    btns["Cancel"] = function (e) {
                        is_first_Time_Loaded = false;
                        GetVehicleData();
                        $(this).dialog("close");
                    }
                    var htmTitle = '<div style="display: inline-block;float:left;">Alert!</div> ';

                    $('#DragDropValidationId').remove();
                    $('<div id="DragDropValidationId"></div>').appendTo('body')
                                            .html('<div><h6>Are you sure want to move?</h6></div>').dialog({
                                                modal: true, title: htmTitle, zIndex: 10000, autoOpen: true,
                                                width: '35%', resizable: false,
                                                buttons: btns
                                            });
                }
                else {
                    if (ProjectName.toLowerCase() == "wms-lsh" || ProjectName.toLowerCase() == "unitrade" || ProjectName.toLowerCase() == "ywf" || ProjectName.toLowerCase() == "ricwil" || ProjectName.toLowerCase() == "sandl") {
                        qry = "update Orderhdr set AgentId='" + vehicleId + "',  VehicleId='" + vehicleId + "' where OrdNo='" + ordNo + "'";
                    }
                    else {
                        qry = "update Orderhdr set VehicleId='" + vehicleId + "' where OrdNo='" + ordNo + "'";
                    }

                    ExecuteInsertUpdateQuery(qry);
                    is_first_Time_Loaded = false;
                    GetVehicleData();
                }
            }
        });
});

function beforeGetVehicleData() {
    is_first_Time_Loaded = true;
}

function DownRow_func() {
    var current_down = $(current_Row_Reference).closest('tr')
    var next = current_down.next('tr');
    if (next.length !== 0) {
        current_down.insertAfter(next);
    }
    Update_Order_Number();
    return false;
}


function UpRow_func() {
    var current_up = $(current_Row_Reference).closest('tr');
    var Something = $(current_Row_Reference).closest('tr').prev('tr').find('td:eq(0)').text();
    if (Something != null && Something != undefined && Something != '') {
        var previous = current_up.prev('tr');
        if (previous.length !== 0) {
            current_up.insertBefore(previous);
        }
    }
    Update_Order_Number();
    return false;
}


function Update_Order_Number() {
    var qry = '';
    if (current_Table_Reference != null) {
        var table = document.getElementById(current_Table_Reference);
        var rowLength = table.rows.length;
        for (var i = 1; i < rowLength; i += 1) {
            var row = table.rows[i];
            var cellLength = row.cells.length;
            for (var y = 0; y < 1; y++) {
                var cell = row.cells[y];
                qry += "update orderhdr set companyno=" + i + " where ordno='" + cell.innerText.toString() + "';\n";
            }
        }
    }

    ExecuteInsertUpdateQuery(qry);
}

function Row_Click_func(obj) {
    current_Table_Reference = $(obj).closest('table').attr('id');
    prev_current_Row_Reference = current_Row_Reference;
    current_Row_Reference = obj;

    $(current_Row_Reference).closest('tr').children('td,th').css('background-color', 'blue');

    if (prev_current_Row_Reference != null) {
        $(prev_current_Row_Reference).closest('tr').children('td,th').css('background-color', 'white');
    }

}


var vehicleData = '';



GetVehicleList();

function GetVehicleList_old() {

    var qry = "select V.Description +'('+L.Name+')' as Description,V.Code,V.Branch,V.Length,V.Width,V.Height,V.Tonnage,V.IsBuffer from Vehicle V inner join Location L on L.Code=V.Branch Where V.Branch in (select GroupID from LocationGroup Where UserID='" + _UserID + "')";
    if (ProjectName.toLowerCase() == "jsu")
        qry = "select * from Vehicle Where Branch in (select GroupID from LocationGroup Where UserID='" + _UserID + "')";
    else if (ProjectName.toLowerCase() == "lsh" || ProjectName.toLowerCase() == "poc")
        qry = "select * from Vehicle order BY displayno ";
    //if (ProjectName == "GTILite")
    //    qry = "select * from Vehicle";
    execute(qry);
    vehicleData = executeQry;
    //UpdateOrderVehicleData(vehicleData);
    LoadVehicle(vehicleData);
    // GetVehicleData(vehicleData);
}

function GetVehicleList() {
    //if (ProjectName.toLowerCase() == "poc") {
    //    Interval_Time = "30000";
    //    //alert(Interval_Time);
    //    var interval_Time = parseInt(Interval_Time.toString());
    //    setInterval(function () {
    //        //alert(interval_Time);
    //        GetVehicleList_sub();
    //    }, interval_Time);
    //}
    //else {
    //    GetVehicleList_sub();
    //}

    //commented by.M 16.06.2022
    GetVehicleList_sub();
}


function GetVehicleList_sub() {

    if (ProjectName.toLowerCase() != "poc") {
        $("#div_deliveryDate_Ok_Button").show();
    }


    var qry = "select V.Description +'('+L.Name+')' as Description,V.Code,V.Branch,V.Length,V.Width,V.Height,V.Tonnage,V.IsBuffer from Vehicle V inner join Location L on L.Code=V.Branch Where V.Branch in (select GroupID from LocationGroup Where UserID='" + _UserID + "')";


    if (ProjectName.toLowerCase() == "jsu") {
        qry = "select * from Vehicle Where Branch in (select GroupID from LocationGroup Where UserID='" + _UserID + "')";
    }
    else if (ProjectName.toLowerCase() == "wms-warehouse") {
        qry = "select V.Description +'('+L.Name+')' as Description,V.Code,V.Branch,V.Length,V.Width,V.Height,V.Tonnage,V.IsBuffer from Vehicle V inner join Location L on L.Code=V.Branch";
    }
    else if (ProjectName.toLowerCase() == "pod") {
        //qry = "select v.districtcode,V.Description +'('+L.Name+')' as Description,V.Code,V.Branch,V.Length,V.Width,V.Height,V.Tonnage,V.IsBuffer from Vehicle V inner join Location L on L.Code=V.Branch Where V.Branch in (select GroupID from LocationGroup Where UserID='" + _UserID + "')";
        //qry = "select v.districtcode,V.Description +'('+L.Name+')' as Description,V.Code,V.Branch,V.Length,V.Width,V.Height,V.Tonnage,V.IsBuffer,V.Longitude,V.Latitude from Vehicle V inner join Location L on L.Code=V.Branch Where V.Branch in (select GroupID from LocationGroup Where UserID='" + _UserID + "')";
        // CONVERT POD TO WMSDEMO
        qry = "select v.districtcode,V.Description +'('+L.Name+')' as Description,V.Code,V.Branch,V.Length,V.Width,V.Height,V.Tonnage,V.IsBuffer,V.Longitude,V.Latitude from Vehicle V inner join Location L on L.Code=V.Branch ";
    }
    else if (ProjectName.toLowerCase() == "poc") {
        qry = "select * from Vehicle order BY displayno ";
    }
    else if (ProjectName.toLowerCase() == "lsh" || ProjectName.toLowerCase() == "pegasus" ||
        ProjectName.toLowerCase() == "wms-lsh" || ProjectName.toLowerCase() == "unitrade" || ProjectName.toLowerCase() == "ywf" || ProjectName.toLowerCase() == "ricwil" || ProjectName.toLowerCase() == "sandl") {
        qry = "select * from Vehicle order BY displayno ";
    }
    else if (ProjectName.toLowerCase() == "eastocean") {
        qry = "select V.Description as Description,V.Code,V.Branch,V.Length,V.Width,V.Height,V.Tonnage,V.IsBuffer from Vehicle V ";
    }
    else if (ProjectName.toLowerCase() == "wil" || ProjectName.toLowerCase() == "leonsynergy") {
        qry = "select V.Description +'('+L.Name+')' as Description,V.Code,V.Branch,V.Length,V.Width,V.Height,V.Tonnage,V.IsBuffer from Vehicle V inner join Location L on L.Code=V.Branch";
    }
    else if (ProjectName.toLowerCase() == "tradeproship" || ProjectName.toLowerCase() == "tradeproimpex" || ProjectName.toLowerCase() == "tradeprofd") {
        //  qry = "select V.Description,V.Code,V.Branch,V.Length,V.Width,V.Height,V.Tonnage,V.IsBuffer from Vehicle V";
        qry = "select V.Description +'('+L.Name+')' as Description,V.Code,V.Branch,V.Length,V.Width,V.Height,V.Tonnage,V.IsBuffer from Vehicle V inner join Location L on L.Code=V.Branch";
    }
    else if (ProjectName.toLowerCase() == "limtraders" || ProjectName.toLowerCase() == "sej" || ProjectName.toLowerCase() == "vismark") {
        qry = "select * from[VehicleAssignment_LoadVehicle]";
    }



    execute(qry);
    vehicleData = executeQry;
    LoadVehicle(vehicleData);


    if (ProjectName.toLowerCase() == "poc") {
        GetVehicleData();
    }

}



function LoadVehicle(data) {
    var htm = '';
    var tbodyId = '';
    if (data != null) {
        for (var i = 0; i < data.length; i++) {
            htm += '<div id="div' + i + '" style="margin-left:3px;width: 49.7%; height: 350px; display: inline-block; margin-top: 5px; border-style: solid; border-color: Green; border-width: 10px 10px 10px 10px;">';

            // FOR POD TOTAL TIME CALCULATION PURPOSE HEIGHT IS INCREASED 65PX INSTEAD OF 37px
            htm += '<div  id="divbackRoundColor' + i + '"  style="background-color: Green; height: 40px;margin-top:-1px">';

            htm += '<div class="w3-dropdown-hover">';
            //w3-black
            htm += '<a  id="printbtnbackRoundColor' + i + '"    class="w3-button " style="color: white;background-color: Green;"><span class="glyphicon glyphicon-print"></span></a>';
            htm += '<div class="w3-dropdown-content w3-bar-block w3-border">';
            if (ProjectName.toLowerCase() != "etika" && ProjectName.toLowerCase() != "poc" && ProjectName.toLowerCase() != "wms-lsh" && ProjectName.toLowerCase() != "unitrade" && ProjectName.toLowerCase() != "ywf" && ProjectName.toLowerCase() != "ricwil" && ProjectName.toLowerCase() != "sandl" && ProjectName.toLowerCase() != "tradeprofd" && ProjectName.toLowerCase() != "limtraders" && ProjectName.toLowerCase() != "vismark") {
                htm += '<a   onclick="PrintPicking(' + i + ',\'' + data[i].Code + '\');" class="w3-bar-item w3-button">Print Picking</a>';
            }
            if (ProjectName.toLowerCase() != "etika" && ProjectName.toLowerCase() != "tradeprofd" && ProjectName.toLowerCase() != "limtraders" && ProjectName.toLowerCase() != "vismark")
                htm += '<a   onclick="PrintPickingConsolidated(' + i + ',\'' + data[i].Code + '\');" class="w3-bar-item w3-button">Print Picking Consolidated</a>';
            // COMMENTED 18.12.2020 ===============
            if (ProjectName.toLowerCase() == "wms" || ProjectName.toLowerCase() == "laponie" || ProjectName.toLowerCase() == "wms-warehouse" || ProjectName.toLowerCase() == "lsh" || ProjectName.toLowerCase() == "pod" || ProjectName.toLowerCase() == "eastocean" || ProjectName.toLowerCase() == "wil" || ProjectName.toLowerCase() == "leonsynergy") {
                htm += '<a   onclick="CreateManifest(' + i + ',\'' + data[i].Code + '\');" class="w3-bar-item w3-button">Create Manifest</a>';
            }
            else if (ProjectName.toLowerCase() == "sej") {
                if (data[i].Code.toLowerCase() != "buffer")
                    htm += '<a   onclick="CreateManifest(' + i + ',\'' + data[i].Code + '\');" class="w3-bar-item w3-button">Create Manifest</a>';
            }
            else if (ProjectName.toLowerCase() == "jsu") {
                htm += '<a   onclick="CreateInvoiceJSU(' + i + ',\'' + data[i].Code + '\');" class="w3-bar-item w3-button">Create Invoice</a>';
            }

            else if (ProjectName.toLowerCase() == "pvm" || ProjectName.toLowerCase() == "dms" || ProjectName.toLowerCase() == "etika" || ProjectName.toLowerCase() == "ffb") {
                htm += '<a   onclick="CreateInvoicePVM(' + i + ',\'' + data[i].Code + '\');" class="w3-bar-item w3-button">Create Invoice</a>';
            }


            else if (ProjectName.toLowerCase() == "poc" || ProjectName.toLowerCase() == "wms-lsh" || ProjectName.toLowerCase() == "unitrade" || ProjectName.toLowerCase() == "ywf" || ProjectName.toLowerCase() == "ricwil" || ProjectName.toLowerCase() == "sandl") {
                htm += '<a   onclick="CreateInvoicePOC(' + i + ',\'' + data[i].Code + '\');" class="w3-bar-item w3-button">Order Reassign</a>';
            }
            else if (ProjectName.toLowerCase() == "tradeprofd" || ProjectName.toLowerCase() == "limtraders" || ProjectName.toLowerCase() == "vismark");
            else {
                htm += '<a   onclick="CreateInvoice(' + i + ',\'' + data[i].Code + '\');" class="w3-bar-item w3-button">Create Invoice</a>';
            }

            //
            if (ProjectName.toLowerCase() == "tradeprofd" || ProjectName.toLowerCase() == "limtraders" || ProjectName.toLowerCase() == "vismark") {
                htm += '<a   onclick="PrintOrderList(' + i + ',\'' + data[i].Code + '\');" class="w3-bar-item w3-button">Print Order List</a>';
            }
            htm += '</div>';
            htm += '</div>';

            if (ProjectName.toLowerCase() == "pod") {
                htm += ' <span style="margin-left:5px;font-size:13px;font-weight:bold;color:white;">' + data[i].Description + " - " + data[i].Length * data[i].Width * data[i].Height + " CBM - " + "TOTAL TIME :  " + '</span> <span style="font-size:13px;font-weight:bold;color:red;" id="div' + i + '_tottimeCalculation"></span>';
            }
            else if (ProjectName.toLowerCase() == "wms" || ProjectName.toLowerCase() == "sej" || ProjectName.toLowerCase() == "laponie" || ProjectName.toLowerCase() == "wms-warehouse" || ProjectName.toLowerCase() == "wil" || ProjectName.toLowerCase() == "leonsynergy") {
                htm += ' <span style="margin-left:5px;font-size:13px;font-weight:bold;color:white;">' + data[i].Description + " - " + "TOTAL QTY :  " + '</span> <span style="font-size:13px;font-weight:bold;color:white;" id="div' + i + '_totqty"></span>';
            }
            else {
                // OTHERS EXCEPT POD
                htm += ' <span style="margin-left:5px;font-size:13px;font-weight:bold;color:white;">' + data[i].Description + " - " + data[i].Length * data[i].Width * data[i].Height + " CBM  ";
            }

            // COMMENTED UP AND DOWN MOVEMENT 20.11.2020
            if (ProjectName.toLowerCase() == "poc") {
                htm += '<a href="#" onclick="RemoveVehiclTable(' + i + ');" style="float: right; color: white;"><span class="glyphicon glyphicon-remove"></span></a>';
                htm += '<a href="#" onclick="return DownRow_func()" style="float: right; color: white;"><span class="glyphicon glyphicon-download"></span></a>';
                htm += '<a href="#" onclick="return UpRow_func()" style="float: right; color: white;"><span class="glyphicon glyphicon-upload"></span></a>';
            }
            else {
                htm += '<a href="#" onclick="RemoveVehiclTable(' + i + ');" style="float: right; color: red;"><span class="glyphicon glyphicon-remove"></span></a>';
            }
            htm += '</div>';
            htm += '<table id="table' + i + '" name="' + data[i].Code + '_' + i + '" class="table table-striped table-bordered tableId" style="width: 99%; margin-left: 4px;  ">';
            //newly added by.M 17.11.2021
            tbodyId = vehicleData[i].Code.replace(/ /g, '').replace("/", "");
            htm += '<tbody class="' + data[i].Code + ' connectedSortable" value="' + data[i].Code + '"   id="' + tbodyId + '_' + i + '"    style="font-size:.8em;height:280px;display:block;overflow:scroll">';
            //newly added by.M 08.03.2022 -remove display:block; - tradeprofd -addres column field added
            //htm += '<tbody class="' + data[i].Code + ' connectedSortable" value="' + data[i].Code + '"   id="' + tbodyId + '_' + i + '"    style="font-size:.8em;height:280px;overflow:scroll">';

            htm += '<tr class="table' + i + '" id="' + data[i].Code + '" >';
            htm += '<th style="width: 16%;">Order No</th>';
            if (ProjectName.toLowerCase() == "wms" || ProjectName.toLowerCase() == "sej" || ProjectName.toLowerCase() == "laponie" || ProjectName.toLowerCase() == "wil" || ProjectName.toLowerCase() == "leonsynergy")
                htm += '<th style="width: 16%;">DO No</th>';
            //if (ProjectName.toLowerCase() == "wms" || ProjectName.toLowerCase() == "laponie" || ProjectName.toLowerCase() == "wms-warehouse" || ProjectName.toLowerCase() == "wil" || ProjectName.toLowerCase() == "leonsynergy") {
            if (ProjectName.toLowerCase() == "laponie" || ProjectName.toLowerCase() == "wms-warehouse" || ProjectName.toLowerCase() == "wil" || ProjectName.toLowerCase() == "leonsynergy") {
                htm += '<th  style="width: 17%;">City</th>';
            }
            else if (ProjectName.toLowerCase() == "pvm" || ProjectName.toLowerCase() == "dms" || ProjectName.toLowerCase() == "etika" || ProjectName.toLowerCase() == "ffb") {
                htm += '<th  style="width: 17%;">Sales Agent</th>';
            }
            else if (ProjectName.toLowerCase() != "pod" && ProjectName.toLowerCase() != "poc" && ProjectName.toLowerCase() != "wms-lsh" && ProjectName.toLowerCase() != "unitrade" && ProjectName.toLowerCase() != "ywf" && ProjectName.toLowerCase() != "ricwil" && ProjectName.toLowerCase() != "sandl") {
                htm += '<th  style="width: 17%;">Territory</th>';
            }

            htm += '<th  style="width: 18%;">Customer</th>';


            if (ProjectName.toLowerCase() == "wms" || ProjectName.toLowerCase() == "sej" || ProjectName.toLowerCase() == "laponie" || ProjectName.toLowerCase() == "wil" || ProjectName.toLowerCase() == "leonsynergy" || ProjectName.toLowerCase() == "wms-warehouse" || ProjectName.toLowerCase() == "lsh" || ProjectName.toLowerCase() == "tradeprofd" || ProjectName.toLowerCase() == "limtraders" || ProjectName.toLowerCase() == "vismark") {
                htm += '<th  style="width: 6%;">VehicleID</th>';
                htm += '<th  style="width: 12%;">Address</th>';
                //htm += '<th  style="width: 18%;">Address</th>';
            }
            if (ProjectName.toLowerCase() == "wms" || ProjectName.toLowerCase() == "sej" || ProjectName.toLowerCase() == "laponie" || ProjectName.toLowerCase() == "wil" || ProjectName.toLowerCase() == "leonsynergy") {

                htm += '<th  style="width: 18%;">Category</th>';
            }

            if (ProjectName.toLowerCase() != "poc" && ProjectName.toLowerCase() != "wms-lsh" && ProjectName.toLowerCase() != "unitrade" && ProjectName.toLowerCase() != "ywf" && ProjectName.toLowerCase() != "ricwil"
                && ProjectName.toLowerCase() != "sandl" && ProjectName.toLowerCase() != "laponie" && ProjectName.toLowerCase() != "wms" && ProjectName.toLowerCase() != "sej") {

                htm += '<th  style="width: 18%;">Cubage</th>';
            }


            // COMMENTED 11.03.2021
            if ((ProjectName.toLowerCase() != "pvm" && ProjectName.toLowerCase() != "dms" && ProjectName.toLowerCase() != "ffb" && ProjectName.toLowerCase() != "wms" && ProjectName.toLowerCase() != "sej" && ProjectName.toLowerCase() != "laponie" && ProjectName.toLowerCase() != "wil" && ProjectName.toLowerCase() != "leonsynergy") || ProjectName.toLowerCase() == "etika") {

                htm += '<th  style="width: 18%;">Cubage</th>';
            }
            if (ProjectName.toLowerCase() == "wms" || ProjectName.toLowerCase() == "sej") {
                htm += '<th  style="width: 10%;;">Sales Order Remarks</th>';
                htm += '<th  style="width: 10%;;">Payment Terms</th>';
            }

            if (ProjectName.toLowerCase() != "laponie")
                htm += '<th  style="width: 18%;">Amount</th>';

            if (ProjectName.toLowerCase() == "pod") {
                htm += '<th  style="width: 17%;">Service Time</th>';
            }

            htm += '<th  style="display: none">"' + data[i].Code + '""</th>';
            htm += '</tr>';
            //htm += '</thead>';
            //htm += '<tbody class="' + data[i].Code + ' connectedSortable" value="' + data[i].Code + '"   id="' + tbodyId + '_' + i + '"    style="font-size:.8em;height:280px;display:block;overflow-y:scroll">';
            htm += '</tbody>';
            htm += '</table>';
            //   htm += '</div>';
            htm += '</div>';
        }
        $("#VehicleAssignmentId").append(htm);
    }
}

function RemoveVehiclTable(i) {
    $('#div' + i).remove();
}


var objSalesManTerritory = {};
function UpdateOrderVehicleData(data) {
    if ($('#DeliveryDate').val() == "") {
        alert("Please select delivery date!");
        return;
    }
    var deliverydate = $('#DeliveryDate').val() == "" ? "2019-02-15" : DateFormateChange_Format(_format, $('#DeliveryDate').val());//DateFormateChange($('#DeliveryDate').val());

    var qry = "select * from vehicleterritoryassignment";
    execute(qry);
    var salesManTerritorydata = executeQry;
    if (salesManTerritorydata != null) {
        for (var i = 0; i < salesManTerritorydata.length; i++) {
            objSalesManTerritory[salesManTerritorydata[i].VehicleID] = salesManTerritorydata[i].SalesManTerritory;
        }
    }
    var SSqlSMTerritory = '';
    var qry = '';
    for (var i = 0; i < data.length; i++) {
        SSqlSMTerritory = objSalesManTerritory[data[i].Code];
        if (ProjectName.toLowerCase() == "jsu") {
            //qry += "update OrderHDr set VehicleID='" + data[i].Code + "' ";
            //qry += "from Orderhdr inner join (select custNo,salesagent from Customer) on Customer.CustNo=OrderHDR.CustId ";
            //qry += "where convert(Date,DeliveryDate) =convert(Date,'" + deliverydate + "')";
            //qry += "and Customer.SalesAgent='" + SSqlSMTerritory + "' and ";
            //qry += "OrdNO Not In (select OrdNo from Invoice) and ISNULL(VehicleID,'')='' \n";

            qry += "update OrderHDr set VehicleID='" + data[i].Code + "' from (Select CustNo,Salesagent from Customer) Customer ";
            qry += " where Customer.CustNo=OrderHDR.CustId and Convert(Date,DeliveryDate) =  convert(Date,'" + deliverydate + "') and ";
            qry += "ISNULL(PickingStatus,0)<7 and Customer.SalesAgent='" + SSqlSMTerritory + "' and ISNULL(VehicleID,'')='' \n "
        }
        else {
            qry += "update OrderHDr set VehicleID='" + data[i].Code + "' ";
            qry += "from Orderhdr inner join Customer on Customer.CustNo=OrderHDR.CustId ";
            qry += "where DeliveryDate between '" + deliverydate + " 00:00:00" + "' and '" + deliverydate + " 23:59:59" + "' ";
            qry += "and Customer.SalesAgent='" + SSqlSMTerritory + "' and ";
            qry += "OrdNO Not In (select OrdNo from Invoice) and (VehicleID in (select GroupID from LocationGroup ";
            qry += "Where UserID='" + _UserID + "') or ISNULL(VehicleID,'')='') \n";
        }
    }
    ExecuteInsertUpdateQuery(qry);
}

function UpdateOrderVehicle() {
    if ($('#DeliveryDate').val() == "") {
        alert("Please select delivery date!");
        return;
    }
    var deliverydate = $('#DeliveryDate').val() == "" ? "2019-02-15" : DateFormateChange_Format(_format, $('#DeliveryDate').val());// DateFormateChange($('#DeliveryDate').val());

    var qry = "select Top 1 * from vehicle Where ISBUFFER=1";
    execute(qry);
    var salesManTerritorydata = executeQry;

    var qry = '';
    //02.11.2022 not need  to date
    if (ProjectName.toLowerCase() == "laponie1") {
        var toDeliveryDate = DateFormateChange_Format(_format, $('#ToDeliveryDate').val());
        for (var i = 0; i < salesManTerritorydata.length; i++) {
            qry += "update OrderHDr set VehicleID=Case When Exists(select 1 from vehicle inner join OrderHDr OH on OH.LocationCode=Vehicle.Branch Where ISBUFFER=1  and Oh.OrdNo=OrderHdr.OrdNo) Then (select Code from vehicle inner join OrderHDr OH on OH.LocationCode=Vehicle.Branch Where ISBUFFER=1  and Oh.OrdNo=OrderHdr.OrdNo) Else '' End ";
            qry += "from Orderhdr inner join Customer on Customer.CustNo=OrderHDR.CustId ";
            qry += "where DeliveryDate between '" + deliverydate + " 00:00:00" + "' and '" + toDeliveryDate + " 23:59:59" + "' ";
            qry += "and ISNULL(VehicleID,'')='' and ISNULL(Pickingstatus,0)<8 \n";
        }
    }
    else {
        for (var i = 0; i < salesManTerritorydata.length; i++) {
            //SSqlSMTerritory = objSalesManTerritory[data[i].Code];
            //qry += "update OrderHDr set VehicleID='" + salesManTerritorydata[i].Code + "' ";
            qry += "update OrderHDr set VehicleID=Case When Exists(select 1 from vehicle inner join OrderHDr OH on OH.LocationCode=Vehicle.Branch Where ISBUFFER=1  and Oh.OrdNo=OrderHdr.OrdNo) Then (select Code from vehicle inner join OrderHDr OH on OH.LocationCode=Vehicle.Branch Where ISBUFFER=1  and Oh.OrdNo=OrderHdr.OrdNo) Else '' End ";
            qry += "from Orderhdr inner join Customer on Customer.CustNo=OrderHDR.CustId ";
            qry += "where DeliveryDate between '" + deliverydate + " 00:00:00" + "' and '" + deliverydate + " 23:59:59" + "' ";
            qry += "and ISNULL(VehicleID,'')='' and ISNULL(Pickingstatus,0)<8 \n";
        }
    }
    ExecuteInsertUpdateQuery(qry);
}

//Not Need
function GetVehicleData1() {
    LoadingImagePopUpOpen();
    setTimeout(function () {
        GetVehicleDataLoading();
        LoadingImagePopUpClose();
    }, 200);
}

//function GetVehicleDataLoading() {
function GetVehicleData() {
    // debugger;
    // COMMENTED 08.01.2021
    var _totQty = 0;
    var _totnoofOrders = 0;

    if (ProjectName.toLowerCase() == "pod") {
        vehicle_Iteration = 0;
    }

    sorted_Customer_List = [];

    if (ProjectName.toLowerCase() == "jsu") {
        UpdateOrderVehicleData(vehicleData);
    }
        // COMMENTED 18.12.2020 
        //else if (ProjectName.toLowerCase() == "wms" ) {
    else if (ProjectName.toLowerCase() == "wms" || ProjectName.toLowerCase() == "sej" || ProjectName.toLowerCase() == "laponie" || ProjectName.toLowerCase() == "wms-warehouse" || ProjectName.toLowerCase() == "pod" || ProjectName.toLowerCase() == "wil" || ProjectName.toLowerCase() == "leonsynergy") {
        UpdateOrderVehicle();
    }


    //var deliverydate = DateFormateChange($('#DeliveryDate').val());
    //newly added by.M 17.11.2021
    var deliverydate = DateFormateChange_Format(_format, $('#DeliveryDate').val());


    var qry = "select b.TotalAmt as Amount,b.VehicleID, c.SalesAgent as Territory, a.OrdNo as OrdNo, Sum(a.Cubage) as Cubage, Isnull(Sum(a.ItemCaseQty),0) as CaseQty, c.CustName as CustomerName \n,";
    // qry += "c.ZoneCode as AlternateShipAgent, b.DeliveryDate from (select OrdItem.OrdNo, (select top 1 Cubage \n";
    qry += "c.ZoneCode as AlternateShipAgent, b.DeliveryDate from (select OrdItem.OrdNo, (select top 1 (Cubage / BaseQty) * OrdItem.Qty \n";
    qry += "from UOM where Uom.ItemNo=OrdItem.ItemNo and Uom.Uom='CS') as Cubage,  \n";
    qry += "(OrdItem.Qty / (select top 1 BaseQty  \n";
    qry += "from UOM where Uom.ItemNo=OrdItem.ItemNo and Uom.Uom='CS')) as ItemCaseQty from  OrdItem) a  \n";
    qry += "INNER JOIN OrderHdr b on a.OrdNo=b.OrdNo  \n";
    qry += "INNER JOIN Customer c on b.CustID = c.CustNo  \n";
    qry += "Inner join Salesagent sa on sa.Code=b.AgentId \n";
    qry += "Inner Join SalesManGroup SM On SM.GroupID=sa.nodetreevalue ";
    qry += "where b.DeliveryDate between '" + deliverydate + " 00:00:00" + "' and '" + deliverydate + " 23:59:59" + "'  and (b.Void=0 or b.Void is null)  and b.CustID = c.CustNo  and  isnull(PickingStatus,0) < 7 ";
    //qry += "and  b.OrdNo not in (select ISNULL(OrdNo,'') as OrdNo from invoice where (Void = 0 or Void is null)) and  b.OrdNo not in (select isnull(O.OrdNo,'') as OrdNo from OrdApprovalHdr O inner join (select distinct isnull(OrdNo,'') as OrdNo from OrdApprovalDet Where CustomerInitiated=1) OD on OD.OrdNo=O.OrdNo where O.IsApproved is null) and SM.UserID='" + _UserID + "'  \n";
    qry += "and  b.OrdNo not in (select ISNULL(OrdNo,'') as OrdNo from invoice where (Void = 0 or Void is null)) and SM.UserID='" + _UserID + "'  \n";
    qry += "group by a.OrdNo, b.TotalAmt, c.SalesAgent, c.CustName, c.ZoneCode,b.DeliveryDate,b.VehicleID ";
    // cloud jsulive

    // cloud jsulive newly added by.M 30.11.2021
    if (ProjectName.toLowerCase() == "jsu") {
        //qry = "select distinct a.TotalAmt as Amount,a.VehicleID, c.SalesAgent as Territory, a.OrdNo as OrdNo, a.Cubage as Cubage, Isnull(a.ItemCaseQty,0) as CaseQty, c.CustName as CustomerName \n";
        qry = "select distinct REPLACE(CONVERT(varchar, CAST(totalamt AS money), 1), '.00', '')  as Amount,a.VehicleID, c.SalesAgent as Territory, a.OrdNo as OrdNo, a.Cubage as Cubage, Isnull(a.ItemCaseQty,0) as CaseQty, c.CustName as CustomerName \n";
        qry += ",c.ZoneCode as AlternateShipAgent, a.DeliveryDate from (select OI.OrdNo, Sum(U.Cubage/NULLIF(U.BAseQty,0))  as Cubage,  \n";
        qry += "Sum(OI.Qty / NULLIF(U.BAseQty,0)) as ItemCaseQty,OH.TotalAmt ,OH.VehicleID,OH.CustId,OH.AgentId ,OH.DeliveryDate    from  OrdItem OI inner join OrderHDr OH on OH.OrdNO=OI.OrdNo \n";
        qry += "and Convert(Date,OH.DeliveryDate)=Convert(Date, '" + deliverydate + "') and ISNULL(Void,0)=0 and  isnull(PickingStatus,0) < 7 \n";
        qry += "inner join Item on Item.ItemNO=OI.ItemNO \n";
        qry += "inner join UOM U on U.ItemNo=OI.ItemNO and U.UOM=Item.BulkUOM group by OI.OrdNo,OH.TotalAmt ,OH.VehicleID,OH.CustId,OH.AgentId ,OH.DeliveryDate) a   \n";
        qry += "INNER JOIN (select distinct CustNo,custName,ZoneCode,SalesAgent   from Customer) c on a.CustID = c.CustNo   \n";
        qry += "Inner join (select distinct code,NodeTreeValue,Name from Salesagent) sa on sa.Code=a.AgentId  \n";
        qry += "Inner Join (select distinct UserID,GroupID from SalesManGroup) SM On SM.GroupID=sa.nodetreevalue  \n";
        //where  \n";
        qry += "Left Join (Select OrdNo,InvNo from Invoice where ISNULL(Void,0)=0) Invoice  \n";
        qry += "On Invoice.OrdNo=a.OrdNo \n";
        qry += "where  Invoice.InvNo is  Null   \n";

        //qry += "a.OrdNO Not in (select ISNULL(ORdNO,'') from Invoice where ISNULL(Void,0)=0) \n";
        qry += "and SM.UserID='" + _UserID + "'  \n";
    }
    if (ProjectName.toLowerCase() != "jsu") {

        if (ProjectName.toLowerCase() == "wms") {
            qry = "select b.TotalAmt as Amount,b.PayTerms,b.Remarks,Case When ISNULL(b.VehicleID,'')='' then \n";
            qry += "(select top 1 Code from vehicle Where IsBUffer=1 and Branch=b.LocationCode) Else b.VehicleID End as VehicleID,\n";
            qry += "c.City as Territory, a.OrdNo as OrdNo, \n";
            qry += "(select Description from Category Where Code in (select top 1 Category from Item where ItemNo in \n";
            qry += "(select top 1 ItemNo from OrdItem Where OrdNo=a.OrdNo))) as  Category ,Sum(a.Cubage) as Cubage, Isnull(Sum(a.ItemCaseQty),0) as CaseQty,   \n";
            qry += "c.CustName as CustomerName \n";
            qry += ",C.Address+(Case When ISNULL(C.Address2,'')='' Then'' Else ', '+ C.Address2 End)+(Case When ISNULL(C.City,'')=''  \n";
            qry += "Then'' Else ', '+ C.City End) as CustAddress, \n";
            qry += "c.ZoneCode as AlternateShipAgent, b.DeliveryDate,ISNULL((Select top 1 OrdNO from DeliveryOrderHdr Where SONO=A.OrdNo and ISNULL(Void,0)=0),'')  as DONO \n";
            qry += "from (select OrdItem.OrdNo , (select top 1 (Cubage / BaseQty) * OrdItem.Qty  \n";
            qry += "from UOM inner join Item on Item.ItemNo=UOM.ItemNo where Uom.ItemNo=OrdItem.ItemNo and Uom.Uom=Item.BulkUOM) as Cubage, \n";
            qry += "OrdItem.Qty as ItemCaseQty from OrdItem) a \n";
            qry += "INNER JOIN (Select * from OrderHdr where Isnull(Void,0)=0 and isnull(PickingStatus,0) < 8) b on a.OrdNo=b.OrdNo \n";
            qry += "INNER JOIN (Select CustNo,CustName,Salesagent,Address,Address2,City,ZoneCode,Category from customer) c on b.CustID = c.CustNo \n";
            qry += "INNER JOIN (Select * from LocationGroup where  USerID='" + _UserID + "' ) LM on LM.GroupID=b.LocationCode \n";
            qry += "INNER JOIN (Select Code,Branch from vehicle) V on V.Branch=LM.GroupID \n";
            qry += "Left Join (Select OrdNo,InvNo from Invoice where IsNull(Void,0)=0) Inv on Inv.OrdNo=b.ordno and InvNo is NULL \n";
            qry += "where convert(Date,b.DeliveryDate) between  ('" + deliverydate + " 00:00:00 " + "') and ('" + deliverydate + " 23:59:59 " + "')   \n";
            qry += "group by a.OrdNo, b.TotalAmt, c.SalesAgent, c.CustName, C.Address,C.Address2,C.City,c.ZoneCode,b.DeliveryDate,b.VehicleID,b.LocationCode , Category,b.PayTerms,b.Remarks \n";

        }

        else if (ProjectName.toLowerCase() == "sej") {
            qry = "select * from VehicleAssignment_OrderLoad where deliverydate between '" + deliverydate + " 00:00:00 " + "' and '" + deliverydate + " 23:59:59 " + "'";
            if ($('#CategoryId').val() != "")
                qry = qry + "   and Lotprefix = case when '" + $('#CategoryId').val() + "' in ('','ALL')then Lotprefix else '" + $('#CategoryId').val() + "' end  ";

            //as VHOrdNo,'10' as VHQty
            VhCntqry = "select round(sum(caseqty),2),count(ordno) from VehicleAssignment_OrderLoad where deliverydate  between '" + deliverydate + " 00:00:00 " + "' and '" + deliverydate + " 23:59:59 " + "'";
            VhCntqry = VhCntqry + "   and Lotprefix = case when '" + $('#CategoryId').val() + "' in ('','ALL')then Lotprefix else '" + $('#CategoryId').val() + "' end  ";

            //VhCntqry = "select sum(caseqty) as VHQty,count(ordno) as VHOrdNo from VehicleAssignment_OrderLoad where deliverydate between '" + deliverydate + " 00:00:00 " + "' and '" + deliverydate + " 23:59:59 " + "'";
            //                 //and Lotprefix = case when '' in ('','ALL')then Lotprefix else 'ALL' end ";
            //VhCntqry = VhCntqry + "   and Lotprefix = case when '" + $('#CategoryId').val() + "' in ('','ALL')then Lotprefix else '" + $('#CategoryId').val() + "' end  ";


            //else
            //    qry = qry + " and CategoryId=''";

            //select * from VehicleAssignment_OrderLoad where deliverydate between '2023-04-29 00:00:00 ' and '2023-04-29 23:59:59 '
            //and Lotprefix = case when '" + $('#CategoryId').val() + "' in ('','ALL')then Lotprefix else '" + $('#CategoryId').val() + "' end  

            //qry = "select b.TotalAmt as Amount,b.PayTerms,b.Remarks,Case When ISNULL(b.VehicleID,'')='' then \n";
            //qry += "(select top 1 Code from vehicle Where IsBUffer=1 and Branch=b.LocationCode) Else b.VehicleID End as VehicleID,\n";
            //qry += "c.City as Territory, a.OrdNo as OrdNo, \n";
            //qry += "(select Description from Category Where Code in (select top 1 Category from Item where ItemNo in \n";
            //qry += "(select top 1 ItemNo from OrdItem Where OrdNo=a.OrdNo))) as  Category ,Sum(a.Cubage) as Cubage, Isnull(Sum(a.ItemCaseQty),0) as CaseQty,   \n";
            //qry += "c.CustName as CustomerName \n";
            //qry += ",C.Address+(Case When ISNULL(C.Address2,'')='' Then'' Else ', '+ C.Address2 End)+(Case When ISNULL(C.City,'')=''  \n";
            //qry += "Then'' Else ', '+ C.City End) as CustAddress, \n";
            //qry += "c.ZoneCode as AlternateShipAgent, b.DeliveryDate,ISNULL((Select top 1 OrdNO from DeliveryOrderHdr Where SONO=A.OrdNo and ISNULL(Void,0)=0),'')  as DONO \n";
            //qry += "from (select OrdItem.OrdNo , (select top 1 (Cubage / BaseQty) * OrdItem.Qty  \n";
            //qry += "from UOM inner join Item on Item.ItemNo=UOM.ItemNo where Uom.ItemNo=OrdItem.ItemNo and Uom.Uom=Item.BulkUOM) as Cubage, \n";
            //qry += "OrdItem.Qty as ItemCaseQty from OrdItem) a \n";
            //qry += "INNER JOIN (Select * from OrderHdr where Isnull(Void,0)=0 and isnull(PickingStatus,0) < 8) b on a.OrdNo=b.OrdNo \n";
            //qry += "INNER JOIN (Select CustNo,CustName,Salesagent,Address,Address2,City,ZoneCode,Category from customer) c on b.CustID = c.CustNo \n";
            //qry += "INNER JOIN (Select * from LocationGroup where  USerID='" + _UserID + "' ) LM on LM.GroupID=b.LocationCode \n";
            //qry += "INNER JOIN (Select Code,Branch from vehicle) V on V.Branch=LM.GroupID \n";
            //qry += "Left Join (Select OrdNo,InvNo from Invoice where IsNull(Void,0)=0) Inv on Inv.OrdNo=b.ordno and InvNo is NULL \n";
            //qry += "where convert(Date,b.DeliveryDate) between  ('" + deliverydate + " 00:00:00 " + "') and ('" + deliverydate + " 23:59:59 " + "')   \n";
            //qry += "group by a.OrdNo, b.TotalAmt, c.SalesAgent, c.CustName, C.Address,C.Address2,C.City,c.ZoneCode,b.DeliveryDate,b.VehicleID,b.LocationCode , Category,b.PayTerms,b.Remarks \n";

        }
        else if (ProjectName.toLowerCase() == "laponie") {
            //var toDeliveryDate = DateFormateChange_Format(_format, $('#ToDeliveryDate').val());

            //qry = "select Distinct b.TotalAmt as Amount,Case When ISNULL(b.VehicleID,'')='' then  \n";
            //qry += "(select top 1 Code from vehicle Where IsBUffer=1 and Branch=b.LocationCode) Else b.VehicleID End as VehicleID, \n";
            //qry += "c.City as Territory, a.OrdNo as OrdNo,  \n";
            //qry += "(select Description from Category Where Code in (select top 1 Category from Item where ItemNo in  \n";
            //qry += "(select top 1 ItemNo from OrdItem Where OrdNo=a.OrdNo))) as  Category ,a.Cubage as Cubage,  \n";
            //qry += "Isnull(a.ItemCaseQty,0) as CaseQty,    \n";
            //qry += "c.CustName as CustomerName  \n";
            //qry += ",C.Address+(Case When ISNULL(C.Address2,'')='' Then'' Else ', '+ C.Address2 End)+(Case When ISNULL(C.City,'')=''  \n";
            //qry += "Then'' Else ', '+ C.City End) as CustAddress,  \n";
            //qry += "c.ZoneCode as AlternateShipAgent, b.DeliveryDate,ISNULL((Select top 1 OrdNO from DeliveryOrderHdr Where SONO=A.OrdNo and ISNULL(Void,0)=0),'')  as DONO  \n";
            //qry += "from (Select OrdNo,Sum(ItemCaseQty) as ItemCaseQty,Sum(Cubage) as Cubage from \n";
            //qry += "(select Distinct OrdItem.OrdNo , (select top 1 (Cubage / BaseQty) * OrdItem.Qty \n";
            //qry += "from UOM inner join Item on Item.ItemNo=UOM.ItemNo where Uom.ItemNo=OrdItem.ItemNo and Uom.Uom=Item.BulkUOM) as Cubage,  \n";
            //qry += "OrdItem.Qty as ItemCaseQty from OrdItem)a Group by OrdNo ) a  \n";
            //qry += "INNER JOIN (Select Distinct * from OrderHdr where Isnull(Void,0)=0 and isnull(PickingStatus,0) < 8) b on a.OrdNo=b.OrdNo  \n";
            //qry += "INNER JOIN (Select CustNo,CustName,Salesagent,Address,Address2,City,ZoneCode,Category from customer) c  \n";
            //qry += "on b.CustID = c.CustNo  \n";
            //qry += "INNER JOIN (Select * from LocationGroup where  USerID='" + _UserID + "' ) LM on LM.GroupID=b.LocationCode  \n";
            //qry += "INNER JOIN (Select Code,Branch from vehicle) V on V.Branch=LM.GroupID  \n";
            //qry += "Left Join (Select OrdNo,InvNo from Invoice where IsNull(Void,0)=0) Inv on Inv.OrdNo=b.ordno and InvNo is NULL  \n";
            ////qry += "where convert(Date,b.DeliveryDate) between   ('" + deliverydate + " 00:00:00 " + "') and ('" + deliverydate + " 23:59:59 " + "')   \n";
            //qry += "where convert(Date,b.DeliveryDate) between   ('" + deliverydate + " 00:00:00 " + "') and ('" + toDeliveryDate + " 23:59:59 " + "')   \n";


            qry = "select Distinct b.TotalAmt as Amount,Case When ISNULL(b.VehicleID,'')='' then     \n";
            qry += "(select top 1 Code from vehicle Where IsBUffer=1 and Branch=b.LocationCode) Else b.VehicleID End as VehicleID,    \n";
            qry += "c.City as Territory, a.OrdNo as OrdNo,     \n";
            qry += "(select Description from Category Where Code in (select top 1 Category from Item where ItemNo in     \n";
            qry += "(select top 1 ItemNo from OrdItem Where OrdNo=a.OrdNo))) as  Category ,a.Cubage as Cubage,     \n";
            qry += "Isnull(a.ItemCaseQty,0) as CaseQty,       \n";
            qry += "c.CustName as CustomerName     \n";
            qry += ",C.Address+(Case When ISNULL(C.Address2,'')='' Then'' Else ', '+ C.Address2 End)+(Case When ISNULL(C.City,'')=''     \n";
            qry += "Then'' Else ', '+ C.City End) as CustAddress,     \n";
            qry += "c.ZoneCode as AlternateShipAgent, b.DeliveryDate,ISNULL((Select top 1 OrdNO from DeliveryOrderHdr Where SONO=A.OrdNo    \n";
            qry += "and ISNULL(Void,0)=0),'')  as DONO     \n";
            qry += "from (Select OrdNo,Sum(ItemCaseQty) as ItemCaseQty,Sum(Cubage) as Cubage from  \n";
            qry += "(select Distinct OrdItem.OrdNo , (select top 1 (Cubage / BaseQty) * OrdItem.Qty  \n";
            qry += "from UOM inner join Item on Item.ItemNo=UOM.ItemNo where Uom.ItemNo=OrdItem.ItemNo and Uom.Uom=Item.BulkUOM) as Cubage,   \n";
            qry += "OrdItem.Qty as ItemCaseQty from OrdItem)a Group by OrdNo ) a     \n";
            qry += "INNER JOIN (Select Distinct * from OrderHdr where Isnull(Void,0)=0 and isnull(PickingStatus,0) < 8) b on a.OrdNo=b.OrdNo   \n";
            qry += "INNER JOIN (Select CustNo,CustName,Salesagent,Address,Address2,City,ZoneCode,Category from customer) c   \n";
            qry += "on b.CustID = c.CustNo     \n";
            qry += "INNER JOIN (Select * from LocationGroup where  USerID='" + _UserID + "' ) LM on LM.GroupID=b.LocationCode   \n";
            qry += "INNER JOIN (Select Code,Branch from vehicle) V on V.Code=b.VehicleID    \n";
            qry += "Left Join (Select OrdNo,InvNo from Invoice where IsNull(Void,0)=0) Inv on Inv.OrdNo=b.ordno and Inv.InvNo is NULL   \n";
            qry += "where convert(Date,b.DeliveryDate)  between   ('" + deliverydate + " 00:00:00 " + "') and ('" + deliverydate + " 23:59:59 " + "')   \n";
            //qry += "where convert(Date,b.DeliveryDate)  between   ('" + deliverydate + " 00:00:00 " + "') and ('" + toDeliveryDate + " 23:59:59 " + "')   \n";

        }
        else if (ProjectName.toLowerCase() == "wil" || ProjectName.toLowerCase() == "leonsynergy") {

            qry = "select b.TotalAmt as Amount,Case When ISNULL(b.VehicleID,'')='' then \n";
            qry += "(select top 1 Code from vehicle Where IsBUffer=1 and Branch=b.LocationCode) Else b.VehicleID End as VehicleID, \n";
            //qry += "c.City as Territory, a.OrdNo as OrdNo, Sum(a.Cubage) as Cubage, Isnull(Sum(a.ItemCaseQty),0) as CaseQty, \n";
            qry += "c.City as Territory, a.OrdNo as OrdNo, (select Description from Category Where Code in (select top 1 Category from Item where ItemNo in (select top 1 ItemNo from OrdItem Where OrdNo=a.OrdNo))) as  Category ,Sum(a.Cubage) as Cubage, Isnull(Sum(a.ItemCaseQty),0) as CaseQty,  \n";
            qry += "c.CustName as CustomerName\n";
            qry += ",C.Address+(Case When ISNULL(C.Address2,'')='' Then'' Else ', '+ C.Address2 End)+(Case When ISNULL(C.City,'')='' \n";
            qry += "Then'' Else ', '+ C.City End) as CustAddress,\n";
            //qry += "c.ZoneCode as AlternateShipAgent, b.DeliveryDate,isNull(d.OrdNo,'')  as DONO from (select OrdItem.OrdNo, (select top 1 (Cubage / BaseQty) * OrdItem.Qty\n";
            qry += "c.ZoneCode as AlternateShipAgent, b.DeliveryDate,ISNULL((Select top 1 OrdNO from DeliveryOrderHdr Where SONO=A.OrdNo and ISNULL(Void,0)=0),'')  as DONO from (select OrdItem.OrdNo , (select top 1 (Cubage / BaseQty) * OrdItem.Qty \n";
            qry += "from UOM inner join Item on Item.ItemNo=UOM.ItemNo where Uom.ItemNo=OrdItem.ItemNo and Uom.Uom=Item.BulkUOM) as Cubage,\n";
            qry += " OrdItem.Qty as ItemCaseQty from OrdItem) a\n";
            //qry += "INNER JOIN OrderHdr b on a.OrdNo=b.OrdNo\n";
            //qry += "INNER JOIN Customer c on b.CustID = c.CustNo\n";
            //qry += "INNER JOIN LocationGroup LM on LM.GroupID=b.LocationCode\n";
            //qry += "INNER JOIN vehicle V on V.Branch=LM.GroupID\n";
            ////qry += "LEFT JOIN DeliveryOrderHDr D on D.SONO=b.OrdNO\n";
            qry += "INNER JOIN OrderHdr b on a.OrdNo=b.OrdNo \n";
            qry += "INNER JOIN Customer c on b.CustID = c.CustNo \n";
            qry += "INNER JOIN Location LM on LM.Code=b.LocationCode\n";
            qry += "INNER JOIN vehicle V on V.Branch=LM.Code\n";
            qry += "where b.DeliveryDate between ('" + deliverydate + " 00:00:00 " + "') and ('" + deliverydate + " 23:59:59 " + "') \n";
            qry += "and (b.Void=0 or b.Void is null) and b.CustID = c.CustNo and isnull(PickingStatus,0) < 8 and b.OrdNo not in \n";
            qry += "(select OrdNo from invoice where (Void = 0 or Void is null)) group by  a.OrdNo, b.TotalAmt, c.SalesAgent, c.CustName, \n";
            //qry += "C.Address,C.Address2,C.City,c.ZoneCode,b.DeliveryDate,b.VehicleID,b.LocationCode ,D.OrdNo";
            qry += "C.Address,C.Address2,C.City,c.ZoneCode,b.DeliveryDate,b.VehicleID,b.LocationCode , Category";

        }
        else if (ProjectName.toLowerCase() == "wms-warehouse") {

            qry = "select b.TotalAmt as Amount,Case When ISNULL(b.VehicleID,'')='' then \n";
            qry += "(select top 1 Code from vehicle Where IsBUffer=1 and Branch=b.LocationCode) Else b.VehicleID End as VehicleID, \n";
            qry += "C.City as Territory, a.OrdNo as OrdNo, Sum(a.Cubage) as Cubage, Isnull(Sum(a.ItemCaseQty),0) as CaseQty, \n";
            qry += "C.CustName as CustomerName\n";
            qry += ",C.Address+(Case When ISNULL(C.Address2,'')='' Then'' Else ', '+ C.Address2 End)+(Case When ISNULL(C.City,'')='' \n";
            qry += "Then'' Else ', '+ C.City End) as CustAddress,\n";
            qry += "c.ZoneCode as AlternateShipAgent, b.DeliveryDate from (select OrdItem.OrdNo, (select top 1 (Cubage / BaseQty) * OrdItem.Qty\n";
            qry += "from UOM inner join Item on Item.ItemNo=UOM.ItemNo where Uom.ItemNo=OrdItem.ItemNo and Uom.Uom=Item.BulkUOM) as Cubage,\n";
            qry += "OrdItem.Qty as ItemCaseQty from OrdItem) a\n";
            qry += "INNER JOIN OrderHdr b on a.OrdNo=b.OrdNo\n";
            qry += "INNER JOIN Customer c on b.CustID = c.CustNo\n";
            qry += "INNER JOIN vehicle V on V.Branch=b.LocationCode\n";
            qry += "where b.DeliveryDate between ('" + deliverydate + " 00:00:00 " + "') and ('" + deliverydate + " 23:59:59 " + "') \n";
            qry += "and (b.Void=0 or b.Void is null) and b.CustID = c.CustNo and isnull(PickingStatus,0) < 8 and b.OrdNo not in \n";
            qry += "(select OrdNo from invoice where (Void = 0 or Void is null)) group by a.OrdNo, b.TotalAmt, c.SalesAgent, C.CustName, \n";
            qry += "C.Address,C.Address2,C.City,c.ZoneCode,b.DeliveryDate,b.VehicleID,b.LocationCode ";
        }
        else if (ProjectName.toLowerCase() == "lsh" || ProjectName.toLowerCase() == "pegasus") {
            qry = "select b.TotalAmt as Amount,Case When ISNULL(b.VehicleID,'')='' then (select top 1 Code from vehicle Where IsBUffer=1) Else b.VehicleID End as VehicleID, c.City as Territory, a.OrdNo as OrdNo, Sum(a.Cubage) as Cubage, Isnull(Sum(a.ItemCaseQty),0) as CaseQty, c.CustName as CustomerName   \n";
            qry += ",C.Address+(Case When ISNULL(C.Address2,'')='' Then'' Else ', '+ C.Address2 End)+(Case When ISNULL(C.City,'')='' \n";
            qry += "Then'' Else ', '+ C.City End) as CustAddress\n";
            qry += ",c.ZoneCode as AlternateShipAgent, b.DeliveryDate from (select OrdItem.OrdNo, (select top 1 (Cubage / BaseQty) * OrdItem.Qty   \n";
            qry += "from UOM inner join Item on Item.ItemNo=UOM.ItemNo where Uom.ItemNo=OrdItem.ItemNo and Uom.Uom=Item.BulkUOM) as Cubage,    \n";
            qry += "(OrdItem.Qty / (select top 1 BaseQty    \n";
            qry += "from UOM inner join Item on Item.ItemNo=UOM.ItemNo  where Uom.ItemNo=OrdItem.ItemNo and Uom.Uom=Item.BulkUOM)) as ItemCaseQty from  OrdItem) a    \n";
            qry += "INNER JOIN OrderHdr b on a.OrdNo=b.OrdNo    \n";
            qry += "INNER JOIN Customer c on b.CustID = c.CustNo    \n";
            qry += "where b.DeliveryDate between ('" + deliverydate + " 00:00:00 " + "') and ('" + deliverydate + " 23:59:59 " + "') and (b.Void=0 or b.Void is null)  and b.CustID = c.CustNo  and  isnull(PickingStatus,0) < 8  and  b.OrdNo not in (select OrdNo from invoice where (Void = 0 or Void is null))";
            qry += "group by a.OrdNo, b.TotalAmt, c.SalesAgent, c.CustName, C.Address,C.Address2,C.City, c.ZoneCode,b.DeliveryDate,b.VehicleID   ";

        }

        else if (ProjectName.toLowerCase() == "wms-lsh" || ProjectName.toLowerCase() == "unitrade" || ProjectName.toLowerCase() == "ricwil" || ProjectName.toLowerCase() == "sandl") {
            qry = "select isnull(b.TotalAmt,0) as Amount,b.companyno,Case When ISNULL(b.VehicleID,'')='' then (select top 1 Code from vehicle Where IsBUffer=1) Else b.VehicleID End as VehicleID, c.City as Territory, a.OrdNo as OrdNo, Sum(a.Cubage) as Cubage, Isnull(Sum(a.ItemCaseQty),0) as CaseQty, c.CustName as CustomerName   \n";
            qry += ",C.Address+(Case When ISNULL(C.Address2,'')='' Then'' Else ', '+ C.Address2 End)+(Case When ISNULL(C.City,'')='' \n";
            qry += "Then'' Else ', '+ C.City End) as CustAddress\n";
            qry += ",c.ZoneCode as AlternateShipAgent, b.DeliveryDate from (select OrdItem.OrdNo, (select top 1 (Cubage / BaseQty) * OrdItem.Qty   \n";
            qry += "from UOM inner join Item on Item.ItemNo=UOM.ItemNo where Uom.ItemNo=OrdItem.ItemNo and Uom.Uom=Item.BulkUOM) as Cubage,    \n";
            qry += "(OrdItem.Qty / (select top 1 BaseQty    \n";
            qry += "from UOM inner join Item on Item.ItemNo=UOM.ItemNo  where Uom.ItemNo=OrdItem.ItemNo and Uom.Uom=Item.BulkUOM)) as ItemCaseQty from  OrdItem) a    \n";
            qry += "INNER JOIN OrderHdr b on a.OrdNo=b.OrdNo    \n";
            qry += "INNER JOIN Customer c on b.CustID = c.CustNo    \n";
            qry += "where b.DeliveryDate between ('" + deliverydate + " 00:00:00 " + "') and ('" + deliverydate + " 23:59:59 " + "') and (b.Void=0 or b.Void is null)  and b.CustID = c.CustNo  and  isnull(PickingStatus,0) < 8  and  b.OrdNo not in (select OrdNo from invoice where (Void = 0 or Void is null))";
            qry += "group by b.companyno, a.OrdNo, b.TotalAmt, c.SalesAgent, c.CustName, C.Address,C.Address2,C.City, c.ZoneCode,b.DeliveryDate,b.VehicleID   ";
            qry += " order by isnull(b.companyno,0),VehicleID "

        }
        else if (ProjectName.toLowerCase() == "ywf") {
            qry = "select isnull(b.TotalAmt,0) as Amount,b.companyno,Case When ISNULL(b.VehicleID,'')='' then (select top 1 Code from vehicle Where IsBUffer=1) Else b.VehicleID End as VehicleID, c.City as Territory, a.OrdNo as OrdNo, Sum(a.Cubage) as Cubage, Isnull(Sum(a.ItemCaseQty),0) as CaseQty, c.CustName as CustomerName   \n";
            qry += ",C.Address+(Case When ISNULL(C.Address2,'')='' Then'' Else ', '+ C.Address2 End)+(Case When ISNULL(C.City,'')='' \n";
            qry += "Then'' Else ', '+ C.City End) as CustAddress\n";
            qry += ",c.ZoneCode as AlternateShipAgent, b.DeliveryDate from (select OrdItem.OrdNo, (select top 1 (Cubage / BaseQty) * OrdItem.Qty   \n";
            qry += "from UOM inner join Item on Item.ItemNo=UOM.ItemNo where Uom.ItemNo=OrdItem.ItemNo and Uom.Uom=Item.BulkUOM) as Cubage,    \n";
            qry += "(OrdItem.Qty / (select top 1 BaseQty    \n";
            qry += "from UOM inner join Item on Item.ItemNo=UOM.ItemNo  where Uom.ItemNo=OrdItem.ItemNo and Uom.Uom=Item.BulkUOM)) as ItemCaseQty from  OrdItem) a    \n";
            qry += "INNER JOIN OrderHdr b on a.OrdNo=b.OrdNo    \n";
            qry += "INNER JOIN Customer c on b.CustID = c.CustNo    \n";
            qry += "where b.DeliveryDate between ('" + deliverydate + " 00:00:00 " + "') and ('" + deliverydate + " 23:59:59 " + "') and (b.Void=0 or b.Void is null)  and b.CustID = c.CustNo  and  isnull(PickingStatus,0) < 8    \n";
            if ($('#OrdNo').val() != "")
                qry += "and  b.OrdNo like '%" + $('#OrdNo').val() + "%' \n";
            qry += "and  b.OrdNo not in (select OrdNo from invoice where (Void = 0 or Void is null))";
            qry += "group by b.companyno, a.OrdNo, b.TotalAmt, c.SalesAgent, c.CustName, C.Address,C.Address2,C.City, c.ZoneCode,b.DeliveryDate,b.VehicleID   ";
            qry += " order by isnull(b.companyno,0),VehicleID "
        }
        else if (ProjectName.toLowerCase() == "poc") {
            qry = " select SoldTo,NoSeries,DeliveryDate ,Amount,companyno,VehicleID, Territory, OrdNo, Cubage, CaseQty, CustomerName,TotalLines from ";
            qry += " (select Count as TotalLines,P.SoldTo,(select top 1 NoSeries from OrderSeries Where a.OrdNo Like Replace(NoSeries,'*','')+'%') as NoSeries ,b.TotalAmt as Amount,b.companyno,Case When ISNULL(b.VehicleID,'')='' then (select top 1 Code from vehicle Where IsBUffer=1) Else b.VehicleID End as VehicleID, c.City as Territory, a.OrdNo as OrdNo, Sum(a.Cubage) as Cubage, Isnull(Sum(a.ItemCaseQty),0) as CaseQty, c.CustName as CustomerName ";
            qry += " ,C.Address+(Case When ISNULL(C.Address2,'')='' Then'' Else ', '+ C.Address2 End)+(Case When ISNULL(C.City,'')='' ";
            qry += " Then'' Else ', '+ C.City End) as CustAddress ";
            qry += " ,c.ZoneCode as AlternateShipAgent, b.DeliveryDate from (select OrdItem.OrdNo, (select top 1 (Cubage / BaseQty) * OrdItem.Qty  ";
            qry += " from UOM inner join Item on Item.ItemNo=UOM.ItemNo where Uom.ItemNo=OrdItem.ItemNo and Uom.Uom=Item.BulkUOM) as Cubage,     ";
            qry += " (OrdItem.Qty / (select top 1 BaseQty  ";
            qry += " from UOM inner join Item on Item.ItemNo=UOM.ItemNo  where Uom.ItemNo=OrdItem.ItemNo and Uom.Uom=Item.BulkUOM)) as ItemCaseQty from  OrdItem) a  ";
            qry += " INNER JOIN OrderHdr b on a.OrdNo=b.OrdNo  ";
            qry += " inner join (select OrdNo,Count(*) ";
            qry += "  as count, (select Count(*) ";
            qry += " from OrdItem O where OrdItem.OrdNO=O.OrdNO and O.Qty=O.DeliQty and ISNULL(O.NoPick,0)=0 group by OrdNo) as DelCount,(select Count(*) ";
            qry += " from OrdItem O where OrdItem.OrdNO=O.OrdNO and ISNULL(O.NoPick,0)=1 group by OrdNo) as NoPickCount,(select Count(*) ";
            qry += " from OrdItem O where OrdItem.OrdNO=O.OrdNO and ISNULL(O.NoPick,0)=2 group by OrdNo) as KickOutCount from OrdItem group by ordNo) d on d.ordNo=b.ordNo and D.count <>ISNULL(D.DelCount,0) +ISNULL(D.KickOutCount,0) +ISNULL(D.NoPickCount ,0) ";
            qry += " INNER JOIN Customer c on b.CustID = c.CustNo ";
            qry += " Left Join OrderBP P on P.SoldTo=b.CustId ";
            qry += " where (b.Void=0 or b.Void is null)  and b.CustID = c.CustNo  and  isnull(PickingStatus,0) < 8  and  b.OrdNo not in (select OrdNo from invoice where (Void = 0 or Void is null)) ";
            qry += " group by b.companyno, a.OrdNo, b.TotalAmt, c.SalesAgent, c.CustName, C.Address,C.Address2,C.City, c.ZoneCode,b.DeliveryDate,b.VehicleID ,P.SoldTo,d.Count) as A1 ";
            qry += " order by isnull(companyno,0),VehicleID ,DeliveryDate,IIf(IsNull(SoldTo,'')<>'',0,1),ISNULL(SoldTo,''),IIf(IsNull(NoSeries,'')<>'',0,1),ISNULL(NoSeries,'') ";







        }
        else if (ProjectName.toLowerCase() == "pod") {
            // INCLUDED c.postcode ======================
            qry = "select C.CUSTNO, C.POSTCODE, C.LONGITUDE, C.LATITUDE, b.TotalAmt as Amount,c.postcode,Case When ISNULL(b.VehicleID,'')='' then (select top 1 Code from vehicle Where IsBUffer=1) Else b.VehicleID End as VehicleID, c.City as Territory, a.OrdNo as OrdNo, Sum(a.Cubage) as Cubage, Isnull(Sum(a.ItemCaseQty),0) as CaseQty, c.CustName as CustomerName,  \n";
            qry += " C.Address+(Case When ISNULL(C.Address2,'')='' Then'' Else ', '+ C.Address2 End)+(Case When ISNULL(C.City,'')='' \n";
            qry += "Then'' Else ', '+ C.City End) as CustAddress,\n";
            qry += " c.ZoneCode as AlternateShipAgent, b.DeliveryDate from (select OrdItem.OrdNo, (select top 1 (Cubage ) * OrdItem.Qty   \n";
            qry += "from UOM inner join Item on Item.ItemNo=UOM.ItemNo where Uom.ItemNo=OrdItem.ItemNo and Uom.Uom=Item.BulkUOM) as Cubage,    \n";
            qry += "(OrdItem.Qty / (select top 1 BaseQty    \n";
            qry += "from UOM inner join Item on Item.ItemNo=UOM.ItemNo  where Uom.ItemNo=OrdItem.ItemNo and Uom.Uom=Item.BulkUOM)) as ItemCaseQty from  OrdItem) a    \n";
            qry += "INNER JOIN OrderHdr b on a.OrdNo=b.OrdNo    \n";
            qry += "INNER JOIN Customer c on b.CustID = c.CustNo    \n";
            qry += "where b.DeliveryDate between ('" + deliverydate + " 00:00:00 " + "') and ('" + deliverydate + " 23:59:59 " + "') and (b.Void=0 or b.Void is null)  and b.CustID = c.CustNo  and  isnull(PickingStatus,0) < 8 ";
            //qry += "where b.DeliveryDate between ('" + deliverydate + " 00:00:00 " + "') and ('" + deliverydate + " 23:59:59 " + "') and (b.Void=0 or b.Void is null)  and b.CustID = c.CustNo  and  isnull(PickingStatus,0) < 8  and  b.OrdNo not in (select OrdNo from invoice where (Void = 0 or Void is null))";
            qry += " group by C.CUSTNO, c.postcode, C.LONGITUDE,C.LATITUDE,a.OrdNo, b.TotalAmt, c.SalesAgent, c.CustName, C.Address,C.Address2,C.City, c.ZoneCode,b.DeliveryDate,b.VehicleID   ";
            qry += " order by C.CustName ";
        }
        else if (ProjectName.toLowerCase() == "pvm" || ProjectName.toLowerCase() == "dms") {
            // COMMENTED INCLUED SALES MAN TREE CONCEPT
            //qry = "select b.TotalAmt as Amount,Case When ISNULL(b.VehicleID,'')='' then (select top 1 Code from vehicle Where IsBUffer=1) Else b.VehicleID End as VehicleID, c.City as Territory, a.OrdNo as OrdNo, Sum(a.Cubage) as Cubage, Isnull(Sum(a.ItemCaseQty),0) as CaseQty, c.CustName as CustomerName   \n";
            //qry += ",C.Address+(Case When ISNULL(C.Address2,'')='' Then'' Else ', '+ C.Address2 End)+(Case When ISNULL(C.City,'')='' \n";
            //qry += "Then'' Else ', '+ C.City End) as CustAddress\n";
            //qry += ",c.ZoneCode as AlternateShipAgent, b.DeliveryDate from (select OrdItem.OrdNo, (select top 1 (Cubage / BaseQty) * OrdItem.Qty   \n";
            //qry += "from UOM inner join Item on Item.ItemNo=UOM.ItemNo where Uom.ItemNo=OrdItem.ItemNo and Uom.Uom=Item.BulkUOM) as Cubage,    \n";
            //qry += "(OrdItem.Qty / (select top 1 BaseQty    \n";
            //qry += "from UOM inner join Item on Item.ItemNo=UOM.ItemNo  where Uom.ItemNo=OrdItem.ItemNo and Uom.Uom=Item.BulkUOM)) as ItemCaseQty from  OrdItem) a    \n";
            //qry += "INNER JOIN OrderHdr b on a.OrdNo=b.OrdNo    \n";
            //qry += "INNER JOIN Customer c on b.CustID = c.CustNo    \n";
            //qry += "where b.DeliveryDate between ('" + deliverydate + " 00:00:00 " + "') and ('" + deliverydate + " 23:59:59 " + "') and (b.Void=0 or b.Void is null)  and b.CustID = c.CustNo  and  isnull(PickingStatus,0) < 8  and  b.OrdNo not in (select OrdNo from invoice where (Void = 0 or Void is null))";
            //qry += "group by a.OrdNo, b.TotalAmt, c.SalesAgent, c.CustName, C.Address,C.Address2,C.City, c.ZoneCode,b.DeliveryDate,b.VehicleID   ";

            //qry = "select b.TotalAmt as Amount,Case When ISNULL(b.VehicleID,'')='' then (select top 1 Code from vehicle Where IsBUffer=1) Else b.VehicleID End as VehicleID, c.City as Territory, a.OrdNo as OrdNo, Sum(a.Cubage) as Cubage, Isnull(Sum(a.ItemCaseQty),0) as CaseQty, c.CustName as CustomerName   \n";
            //qry += ",C.Address+(Case When ISNULL(C.Address2,'')='' Then'' Else ', '+ C.Address2 End)+(Case When ISNULL(C.City,'')='' \n";
            //qry += "Then'' Else ', '+ C.City End) as CustAddress\n";
            //qry += ",c.ZoneCode as AlternateShipAgent, b.DeliveryDate from (select OrdItem.OrdNo, (select top 1 (Cubage / BaseQty) * OrdItem.Qty   \n";
            //qry += "from UOM inner join Item on Item.ItemNo=UOM.ItemNo where Uom.ItemNo=OrdItem.ItemNo and Uom.Uom=Item.BulkUOM) as Cubage,    \n";
            //qry += "(OrdItem.Qty / (select top 1 BaseQty    \n";
            //qry += "from UOM inner join Item on Item.ItemNo=UOM.ItemNo  where Uom.ItemNo=OrdItem.ItemNo and Uom.Uom=Item.BulkUOM)) as ItemCaseQty from  OrdItem) a    \n";
            //qry += "INNER JOIN OrderHdr b on a.OrdNo=b.OrdNo    \n";
            //qry += "INNER JOIN Customer c on b.CustID = c.CustNo    \n";
            //qry += "Inner join Salesagent sa on sa.Code=b.AgentId   \n";
            //qry += "Inner Join SalesManGroup SM On SM.GroupID=sa.nodetreevalue   \n";
            //qry += "where b.DeliveryDate between ('" + deliverydate + " 00:00:00 " + "') and ('" + deliverydate + " 23:59:59 " + "') and (b.Void=0 or b.Void is null)  and b.CustID = c.CustNo  and  isnull(PickingStatus,0) < 8  and  b.OrdNo not in (select OrdNo from invoice where (Void = 0 or Void is null)) and SM.UserID='" + _UserID + "'  \n";
            //qry += "group by a.OrdNo, b.TotalAmt, c.SalesAgent, c.CustName, C.Address,C.Address2,C.City, c.ZoneCode,b.DeliveryDate,b.VehicleID   ";


            qry = "select b.TotalAmt as Amount,Case When ISNULL(b.VehicleID,'')='' then (select top 1 Code from vehicle Where IsBUffer=1) \n";
            qry += " Else b.VehicleID End as VehicleID, c.SalesAgent as SalesAgent, a.OrdNo as OrdNo, Sum(a.Cubage) as Cubage, Isnull(Sum(a.ItemCaseQty),0) as CaseQty, c.CustName as CustomerName   \n";
            qry += ",C.Address+(Case When ISNULL(C.Address2,'')='' Then'' Else ', '+ C.Address2 End)+(Case When ISNULL(C.City,'')='' \n";
            qry += "Then'' Else ', '+ C.City End) as CustAddress\n";
            qry += ",c.ZoneCode as AlternateShipAgent, b.DeliveryDate from (select OrdItem.OrdNo, (select top 1 (Cubage / BaseQty) * OrdItem.Qty   \n";
            qry += "from UOM inner join Item on Item.ItemNo=UOM.ItemNo where Uom.ItemNo=OrdItem.ItemNo and Uom.Uom=Item.BulkUOM) as Cubage,    \n";
            qry += "(OrdItem.Qty / (select top 1 BaseQty    \n";
            qry += "from UOM inner join Item on Item.ItemNo=UOM.ItemNo  where Uom.ItemNo=OrdItem.ItemNo and Uom.Uom=Item.BulkUOM)) as ItemCaseQty from  OrdItem) a    \n";
            qry += "INNER JOIN OrderHdr b on a.OrdNo=b.OrdNo    \n";
            qry += "INNER JOIN Customer c on b.CustID = c.CustNo    \n";
            qry += "Inner join Salesagent sa on sa.Code=b.AgentId   \n";
            qry += "Inner Join SalesManGroup SM On SM.GroupID=sa.nodetreevalue   \n";
            qry += "where b.DeliveryDate between ('" + deliverydate + " 00:00:00 " + "') and ('" + deliverydate + " 23:59:59 " + "') and (b.Void=0 or b.Void is null)  and b.CustID = c.CustNo  and  isnull(PickingStatus,0) < 8  and  b.OrdNo not in (select OrdNo from invoice where (Void = 0 or Void is null)) and SM.UserID='" + _UserID + "'  \n";
            qry += "group by a.OrdNo, b.TotalAmt, c.SalesAgent, c.CustName, C.Address,C.Address2,C.City, c.ZoneCode,b.DeliveryDate,b.VehicleID   ";


        }
        else if (ProjectName.toLowerCase() == "ffb") {

            qry = "select b.TotalAmt as Amount,Case When ISNULL(b.VehicleID,'')='' then (select top 1 Code from vehicle Where IsBUffer=1) \n";
            qry += " Else b.VehicleID End as VehicleID, c.SalesAgent as SalesAgent, a.OrdNo as OrdNo, Sum(a.Cubage) as Cubage, Isnull(Sum(a.ItemCaseQty),0) as CaseQty, c.CustName as CustomerName   \n";
            qry += ",C.Address+(Case When ISNULL(C.Address2,'')='' Then'' Else ', '+ C.Address2 End)+(Case When ISNULL(C.City,'')='' \n";
            qry += "Then'' Else ', '+ C.City End) as CustAddress\n";
            qry += ",c.ZoneCode as AlternateShipAgent, b.DeliveryDate from (select OrdItem.OrdNo, (select top 1 (Cubage / BaseQty) * OrdItem.Qty   \n";
            qry += "from UOM inner join Item on Item.ItemNo=UOM.ItemNo where Uom.ItemNo=OrdItem.ItemNo and Uom.Uom=Item.BulkUOM) as Cubage,    \n";
            qry += "(OrdItem.Qty / (select top 1 BaseQty    \n";
            qry += "from UOM inner join Item on Item.ItemNo=UOM.ItemNo  where Uom.ItemNo=OrdItem.ItemNo and Uom.Uom=Item.BulkUOM)) as ItemCaseQty from  OrdItem) a    \n";
            qry += "INNER JOIN OrderHdr b on a.OrdNo=b.OrdNo    \n";
            qry += "INNER JOIN Customer c on b.CustID = c.CustNo    \n";
            qry += "Inner join Salesagent sa on sa.Code=b.AgentId   \n";
            qry += "Inner Join SalesManGroup SM On SM.GroupID=sa.nodetreevalue   \n";
            qry += "where b.DeliveryDate between ('" + deliverydate + " 00:00:00 " + "') and ('" + deliverydate + " 23:59:59 " + "') and (b.Void=0 or b.Void is null)  and b.CustID = c.CustNo  and  isnull(PickingStatus,0) < 8  and  b.OrdNo not in (select ISNULL(OrdNo,'') from invoice where (Void = 0 or Void is null)) and SM.UserID='" + _UserID + "'  \n";
            qry += "group by a.OrdNo, b.TotalAmt, c.SalesAgent, c.CustName, C.Address,C.Address2,C.City, c.ZoneCode,b.DeliveryDate,b.VehicleID   ";
        }
        else if (ProjectName.toLowerCase() == "etika") {
            qry = "select b.TotalAmt as Amount,Case When ISNULL(b.VehicleID,'')='' then (select top 1 Code from vehicle Where IsBUffer=1) \n";
            qry += " Else b.VehicleID End as VehicleID, c.SalesAgent as SalesAgent, a.OrdNo as OrdNo, Sum(a.Cubage) as Cubage, Isnull(Sum(a.ItemCaseQty),0) as CaseQty, c.CustName as CustomerName   \n";
            qry += ",C.Address+(Case When ISNULL(C.Address2,'')='' Then'' Else ', '+ C.Address2 End)+(Case When ISNULL(C.City,'')='' \n";
            qry += "Then'' Else ', '+ C.City End) as CustAddress\n";
            qry += ",c.ZoneCode as AlternateShipAgent, b.DeliveryDate from (select OrdItem.OrdNo, (select top 1 (Cubage / BaseQty) * OrdItem.Qty   \n";
            qry += "from UOM inner join Item on Item.ItemNo=UOM.ItemNo where Uom.ItemNo=OrdItem.ItemNo and Uom.Uom=Item.BulkUOM) as Cubage,    \n";
            qry += "(OrdItem.Qty / (select top 1 BaseQty    \n";
            qry += "from UOM inner join Item on Item.ItemNo=UOM.ItemNo  where Uom.ItemNo=OrdItem.ItemNo and Uom.Uom=Item.BulkUOM)) as ItemCaseQty from  OrdItem) a    \n";
            qry += "INNER JOIN OrderHdr b on a.OrdNo=b.OrdNo    \n";
            qry += "INNER JOIN Customer c on b.CustID = c.CustNo  and C.IsDOB=1   \n";
            qry += "Inner join Salesagent sa on sa.Code=b.AgentId   \n";
            qry += "Inner Join SalesManGroup SM On SM.GroupID=sa.nodetreevalue   \n";
            qry += "where b.DeliveryDate between ('" + deliverydate + " 00:00:00 " + "') and ('" + deliverydate + " 23:59:59 " + "') and (b.Void=0 or b.Void is null)  and b.CustID = c.CustNo  and  isnull(PickingStatus,0) < 8  and  b.OrdNo not in (select OrdNo from invoice where (Void = 0 or Void is null)) and SM.UserID='" + _UserID + "'  \n";
            qry += "group by a.OrdNo, b.TotalAmt, c.SalesAgent, c.CustName, C.Address,C.Address2,C.City, c.ZoneCode,b.DeliveryDate,b.VehicleID   ";


        }
        else if (ProjectName.toLowerCase() == "etika1") {
            //this condition is not need 25.11.2021
            qry = "select b.TotalAmt as Amount,Case When ISNULL(b.VehicleID,'')='' then (select top 1 Code from vehicle Where IsBUffer=1) \n";
            qry += " Else b.VehicleID End as VehicleID, c.SalesAgent as SalesAgent, a.OrdNo as OrdNo, Sum(a.Cubage) as Cubage, Isnull(Sum(a.ItemCaseQty),0) as CaseQty, c.CustName as CustomerName   \n";
            qry += ",C.Address+(Case When ISNULL(C.Address2,'')='' Then'' Else ', '+ C.Address2 End)+(Case When ISNULL(C.City,'')='' \n";
            qry += "Then'' Else ', '+ C.City End) as CustAddress\n";
            qry += ",c.ZoneCode as AlternateShipAgent, b.DeliveryDate from (select OrdItem.OrdNo, (select top 1 (Cubage / BaseQty) * OrdItem.Qty   \n";
            qry += "from UOM inner join Item on Item.ItemNo=UOM.ItemNo where Uom.ItemNo=OrdItem.ItemNo and Uom.Uom=Item.BulkUOM) as Cubage,    \n";
            qry += "(OrdItem.Qty / (select top 1 BaseQty    \n";
            qry += "from UOM inner join Item on Item.ItemNo=UOM.ItemNo  where Uom.ItemNo=OrdItem.ItemNo and Uom.Uom=Item.BulkUOM)) as ItemCaseQty from  OrdItem) a    \n";
            qry += "INNER JOIN OrderHdr b on a.OrdNo=b.OrdNo    \n";
            qry += "INNER JOIN Customer c on b.CustID = c.CustNo and c.Isvansales=0   \n";
            qry += "Inner join Salesagent sa on sa.Code=b.AgentId   \n";
            qry += "Inner Join SalesManGroup SM On SM.GroupID=sa.nodetreevalue   \n";
            qry += "where b.DeliveryDate between ('" + deliverydate + " 00:00:00 " + "') and ('" + deliverydate + " 23:59:59 " + "') and (b.Void=0 or b.Void is null)  and b.CustID = c.CustNo  and  isnull(PickingStatus,0) < 8  and  b.OrdNo not in (select OrdNo from invoice where (Void = 0 or Void is null)) and SM.UserID='" + _UserID + "'  \n";
            qry += "group by a.OrdNo, b.TotalAmt, c.SalesAgent, c.CustName, C.Address,C.Address2,C.City, c.ZoneCode,b.DeliveryDate,b.VehicleID   ";


        }
        else if (ProjectName.toLowerCase() == "eastocean") {
            qry = "select  ISNULL( b.TotalAmt,0) as Amount,Case When ISNULL(b.VehicleID,'')='' then (select top 1 Code from vehicle Where IsBUffer=1) Else b.VehicleID End as VehicleID, c.City as Territory, a.OrdNo as OrdNo, Sum(a.Cubage) as Cubage, Isnull(Sum(a.ItemCaseQty),0) as CaseQty, c.CustName as CustomerName   \n";
            qry += ",C.Address+(Case When ISNULL(C.Address2,'')='' Then'' Else ', '+ C.Address2 End)+(Case When ISNULL(C.City,'')='' \n";
            qry += "Then'' Else ', '+ C.City End) as CustAddress\n";
            qry += ",c.ZoneCode as AlternateShipAgent, b.DeliveryDate from (select OrdItem.OrdNo, (select top 1 ((ISNULL(Length,0)*ISNULL(Width,0)*ISNULL(Height,0)) / BaseQty) * OrdItem.Qty   \n";
            qry += "from UOM inner join Item on Item.ItemNo=UOM.ItemNo where Uom.ItemNo=OrdItem.ItemNo order by BaseQty Desc) as Cubage,    \n";
            qry += "(OrdItem.Qty / (select top 1 BaseQty    \n";
            qry += "from UOM inner join Item on Item.ItemNo=UOM.ItemNo  where Uom.ItemNo=OrdItem.ItemNo order by BaseQty Desc)) as ItemCaseQty from  OrdItem) a    \n";
            qry += "INNER JOIN OrderHdr b on a.OrdNo=b.OrdNo    \n";
            qry += "INNER JOIN Customer c on b.CustID = c.CustNo    \n";
            qry += "where b.DeliveryDate between ('" + deliverydate + " 00:00:00 " + "') and ('" + deliverydate + " 23:59:59 " + "')   and (b.Void=0 or b.Void is null)  and b.CustID = c.CustNo  and  isnull(PickingStatus,0) < 8  and  b.OrdNo not in (select OrdNo from invoice where (Void = 0 or Void is null))";
            //qry += "where convert(date,  b.DeliveryDate)  <= convert(date,'" + deliverydate + " 00:00:00 " + "')  and (b.Void=0 or b.Void is null)  and b.CustID = c.CustNo  and  isnull(PickingStatus,0) < 8  and  b.OrdNo not in (select OrdNo from invoice where (Void = 0 or Void is null))";
            //qry += "where b.DeliveryDate between ('" + deliverydate + " 00:00:00 " + "') and ('" + deliverydate + " 23:59:59 " + "') and (b.Void=0 or b.Void is null)  and b.CustID = c.CustNo  and  isnull(PickingStatus,0) < 8  and  b.OrdNo not in (select OrdNo from invoice where (Void = 0 or Void is null))";
            qry += "group by a.OrdNo, b.TotalAmt, c.SalesAgent, c.CustName, C.Address,C.Address2,C.City, c.ZoneCode,b.DeliveryDate,b.VehicleID   ";
        }
        else if (ProjectName.toLowerCase() == "tradeprofd") {
            qry = "select b.TotalAmt as Amount,Case When ISNULL(b.VehicleID,'')='' then (select top 1 Code from vehicle Where IsBUffer=1) Else b.VehicleID End as VehicleID,   \n";
        }
        else if (ProjectName.toLowerCase() == "limtraders" || ProjectName.toLowerCase() == "vismark") {
            qry = "select * from VehicleAssignment_OrderLoad where deliverydate between '" + deliverydate + " 00:00:00 " + "' and '" + deliverydate + " 23:59:59 " + "'";
        }
            //else if (ProjectName.toLowerCase() == "delisari") {
            //    qry = "select b.TotalAmt as Amount,Case When ISNULL(b.VehicleID,'')='' then (select top 1 Code from vehicle Where IsBUffer=1 and Branch in (select GroupID from LocationGroup Where UserID='" + _UserID + "')) Else b.VehicleID End as VehicleID, c.City as Territory, a.OrdNo as OrdNo, Sum(a.Cubage) as Cubage, Isnull(Sum(a.ItemCaseQty),0) as CaseQty, c.CustName as CustomerName   \n";
            //    qry += ",C.Address+(Case When ISNULL(C.Address2,'')='' Then'' Else ', '+ C.Address2 End)+(Case When ISNULL(C.City,'')='' \n";
            //    qry += "Then'' Else ', '+ C.City End) as CustAddress\n";
            //    qry += ",c.ZoneCode as AlternateShipAgent, b.DeliveryDate from (select OrdItem.OrdNo, (select top 1 (Cubage / BaseQty) * OrdItem.Qty   \n";
            //    qry += "from UOM inner join Item on Item.ItemNo=UOM.ItemNo where Uom.ItemNo=OrdItem.ItemNo and Uom.Uom=Item.BulkUOM) as Cubage,    \n";
            //    qry += "(OrdItem.Qty / (select top 1 BaseQty    \n";
            //    qry += "from UOM inner join Item on Item.ItemNo=UOM.ItemNo  where Uom.ItemNo=OrdItem.ItemNo and Uom.Uom=Item.BulkUOM)) as ItemCaseQty from  OrdItem) a    \n";
            //    //qry += "INNER JOIN OrderHdr b on a.OrdNo=b.OrdNo    \n";
            //    qry += "INNER JOIN OrderHdr b on a.OrdNo=b.OrdNo and b.LocationCode in (select GroupID from LocationGroup Where UserID= '" + _UserID + "') \n";
            //    qry += "INNER JOIN Customer c on b.CustID = c.CustNo    \n";
            //    qry += "where b.DeliveryDate between ('" + deliverydate + " 00:00:00 " + "') and ('" + deliverydate + " 23:59:59 " + "') and (b.Void=0 or b.Void is null)  and b.CustID = c.CustNo  and  isnull(PickingStatus,0) < 8  and  b.OrdNo not in (select OrdNo from invoice where (Void = 0 or Void is null))";
            //    qry += "group by a.OrdNo, b.TotalAmt, c.SalesAgent, c.CustName, C.Address,C.Address2,C.City, c.ZoneCode,b.DeliveryDate,b.VehicleID   ";
            //}
        else if (ProjectName.toLowerCase() == "cpf" || ProjectName.toLowerCase() == "ark") {
            qry = "select b.TotalAmt as Amount,Case When ISNULL(b.VehicleID,'')='' then (select top 1 Code from vehicle Where IsBUffer=1) Else b.VehicleID End as VehicleID,   \n";
            qry += "c.SalesAgent as Territory, a.OrdNo as OrdNo, round(Sum(a.Cubage),4) as Cubage, round(Isnull(Sum(a.ItemCaseQty),0),4) as CaseQty, c.CustName as CustomerName      \n";
            qry += ",C.Address+(Case When ISNULL(C.Address2,'')='' Then'' Else ', '+ C.Address2 End)+(Case When ISNULL(C.City,'')=''    \n";
            qry += "Then'' Else ', '+ C.City End) as CustAddress   \n";
            qry += ",c.ZoneCode as AlternateShipAgent, b.DeliveryDate from (select OrdItem.OrdNo, (select top 1 (Cubage / BaseQty) * OrdItem.Qty      \n";
            qry += "from UOM inner join Item on Item.ItemNo=UOM.ItemNo where Uom.ItemNo=OrdItem.ItemNo and Uom.Uom=Item.BulkUOM) as Cubage,       \n";
            qry += "(OrdItem.Qty / (select top 1 BaseQty       \n";
            qry += "from UOM inner join Item on Item.ItemNo=UOM.ItemNo  where Uom.ItemNo=OrdItem.ItemNo and Uom.Uom=Item.BulkUOM)) as ItemCaseQty from  OrdItem) a       \n";
            qry += "INNER JOIN OrderHdr b on a.OrdNo=b.OrdNo       \n";
            qry += "INNER JOIN Customer c on b.CustID = c.CustNo       \n";
            qry += "where b.DeliveryDate between  ('" + deliverydate + " 00:00:00 " + "') and ('" + deliverydate + " 23:59:59 " + "') and (b.Void=0 or b.Void is null)     \n";
            qry += "and b.CustID = c.CustNo  and  isnull(PickingStatus,0) < 8  and  b.OrdNo not in (select OrdNo from invoice where    \n";
            qry += "(Void = 0 or Void is null))group by a.OrdNo, b.TotalAmt, c.SalesAgent, c.CustName, C.Address,C.Address2,C.City, c.ZoneCode,b.DeliveryDate,b.VehicleID   \n";

        }
        else {
            qry = "select b.TotalAmt as Amount,Case When ISNULL(b.VehicleID,'')='' then (select top 1 Code from vehicle Where IsBUffer=1) Else b.VehicleID End as VehicleID, c.City as Territory, a.OrdNo as OrdNo, Sum(a.Cubage) as Cubage, Isnull(Sum(a.ItemCaseQty),0) as CaseQty, c.CustName as CustomerName   \n";
            qry += ",C.Address+(Case When ISNULL(C.Address2,'')='' Then'' Else ', '+ C.Address2 End)+(Case When ISNULL(C.City,'')='' \n";
            qry += "Then'' Else ', '+ C.City End) as CustAddress\n";
            qry += ",c.ZoneCode as AlternateShipAgent, b.DeliveryDate from (select OrdItem.OrdNo, (select top 1 (Cubage / BaseQty) * OrdItem.Qty   \n";
            qry += "from UOM inner join Item on Item.ItemNo=UOM.ItemNo where Uom.ItemNo=OrdItem.ItemNo and Uom.Uom=Item.BulkUOM) as Cubage,    \n";
            qry += "(OrdItem.Qty / (select top 1 BaseQty    \n";
            qry += "from UOM inner join Item on Item.ItemNo=UOM.ItemNo  where Uom.ItemNo=OrdItem.ItemNo and Uom.Uom=Item.BulkUOM)) as ItemCaseQty from  OrdItem) a    \n";
            qry += "INNER JOIN OrderHdr b on a.OrdNo=b.OrdNo    \n";
            qry += "INNER JOIN Customer c on b.CustID = c.CustNo    \n";
            qry += "where b.DeliveryDate between ('" + deliverydate + " 00:00:00 " + "') and ('" + deliverydate + " 23:59:59 " + "') and (b.Void=0 or b.Void is null)  and b.CustID = c.CustNo  and  isnull(PickingStatus,0) < 8  and  b.OrdNo not in (select OrdNo from invoice where (Void = 0 or Void is null))";
            qry += "group by a.OrdNo, b.TotalAmt, c.SalesAgent, c.CustName, C.Address,C.Address2,C.City, c.ZoneCode,b.DeliveryDate,b.VehicleID   ";
        }
    }

    //VehiclAssignmentExecute(qry);
    //execute(qry);



    //
    // LoadingImagePopUpOpen();

    qry = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(qry), encryptkey, { keySize: 128 / 8, iv: encryptiv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    var params = "{'query':'" + qry + "'}";
    $.ajax({
        type: "POST",
        url: url_GetActionConfigData,
        data: params,
        contentType: "application/json;charset=utf-8",
        // dataType: "json",
        async: true,
        success: function (results) {
            executeQry = $.parseJSON(results);
            //
            selectData = executeQry;
            var tbodyId = '';
            if (executeQry != null) {
                if (ProjectName.toLowerCase() != "pod") {
                    _totQty = 0;
                    _totnoofOrders = 0;
                    for (var i = 0; i < vehicleData.length; i++) {
                        //tbodyId = vehicleData[i].Code.replace(/ /g, "");
                        //newly added by.M 17.11.2021
                        tbodyId = vehicleData[i].Code.replace(/ /g, "").replace("/", "");
                        //$("#" + vehicleData[i].Code + "_" + i).empty();
                        $("#" + tbodyId + "_" + i).empty();

                        if (ProjectName.toLowerCase() == "wms-warehouse" || ProjectName.toLowerCase() == "lsh") {
                            htm = "";
                            htm += '<tr class="table' + i + '" style="z-index: 0;display:flex;" >';
                            htm += '<th  style="width: 16%;;">Order No</th>';
                            htm += '<th  style="width: 17%;;">City</th>';
                            htm += '<th  style="width: 18%;;">Customer</th>';

                            htm += '<th  style="width: 20%;">Address</th>';

                            htm += '<th  style="width: 10%;;">Cubage</th>';
                            htm += '<th  style="width: 10%;;">Case Qty</th>';
                            htm += '<th  style="width: 18%;;">Amount</th>';
                            htm += '</tr>';
                        }
                        else if (ProjectName.toLowerCase() == "wms") {
                            htm = "";
                            //htm += '<tr class="table' + i + '" style="z-index: 0;display:flex;" >'; 
                            //htm += '<tr class="table' + i + '" style="z-index: 0;display:inherit;" >';
                            htm += '<tr class="table' + i + '"  >';
                            htm += '<th  style="width: 14%;;">Order No</th>';
                            htm += '<th  style="width: 10%;;">DO No</th>';
                            //htm += '<th  style="width: 10%;;">City</th>';
                            htm += '<th  style="width: 13%;;">Customer</th>';

                            htm += '<th  style="width: 13%;">Address</th>';
                            //delisari 
                            //newly added By.M 15.02.2022
                            htm += '<th  style="width: 10%;">Category</th>';

                            //htm += '<th  style="width: 10%;;">Cubage</th>';
                            htm += '<th  style="width: 10%;;">Sales Order Remarks</th>';
                            htm += '<th  style="width: 10%;;">Payment Terms</th>';
                            htm += '<th  style="width: 8%;;">Case Qty</th>';
                            htm += '<th  style="width: 12%;;">Amount</th>';
                            htm += '</tr>';
                        }

                        else if (ProjectName.toLowerCase() == "sej") {
                            htm = "";
                            //htm += '<tr class="table' + i + '" style="z-index: 0;display:flex;" >'; 
                            //htm += '<tr class="table' + i + '" style="z-index: 0;display:inherit;" >';
                            htm += '<tr class="table' + i + '"  >';
                            htm += '<th  style="width: 20%;;">Order No</th>';
                            //htm += '<th  style="width: 10%;;">DO No</th>';
                            //htm += '<th  style="width: 10%;;">City</th>';
                            htm += '<th  style="width: 26%;;">Customer</th>';

                            htm += '<th  style="width: 30%;">Address</th>';
                            //delisari 
                            //newly added By.M 15.02.2022
                            //htm += '<th  style="width: 10%;">Category</th>';

                            //htm += '<th  style="width: 10%;;">Cubage</th>';
                            //htm += '<th  style="width: 10%;;">Sales Order Remarks</th>';
                            //htm += '<th  style="width: 10%;;">Payment Terms</th>';
                            htm += '<th  style="width: 12%;;">Case Qty</th>';
                            htm += '<th  style="width: 12%;;">Amount</th>';
                            htm += '</tr>';
                        }
                        else if (ProjectName.toLowerCase() == "wil" || ProjectName.toLowerCase() == "leonsynergy") {
                            htm = "";
                            //htm += '<tr class="table' + i + '" style="z-index: 0;display:flex;" >'; 
                            htm += '<tr class="table' + i + '" style="z-index: 0;display:inherit;" >';
                            htm += '<th  style="width: 14%;;">Order No</th>';
                            htm += '<th  style="width: 10%;;">DO No</th>';
                            htm += '<th  style="width: 10%;;">City</th>';
                            htm += '<th  style="width: 13%;;">Customer</th>';

                            htm += '<th  style="width: 13%;">Address</th>';
                            //delisari 
                            //newly added By.M 15.02.2022
                            htm += '<th  style="width: 10%;">Category</th>';

                            htm += '<th  style="width: 10%;;">Cubage</th>';
                            htm += '<th  style="width: 8%;;">Case Qty</th>';
                            htm += '<th  style="width: 12%;;">Amount</th>';
                            htm += '</tr>';
                        }
                        else if (ProjectName.toLowerCase() == "laponie") {
                            htm = "";
                            //htm += '<tr class="table' + i + '" style="z-index: 0;display:flex;" >'; 
                            htm += '<tr class="table' + i + '" style="z-index: 0;" >';
                            htm += '<th  style="width: 14%;;">Order No</th>';
                            htm += '<th  style="width: 10%;;">DO No</th>';
                            htm += '<th  style="width: 10%;;">City</th>';
                            htm += '<th  style="width: 13%;;">Customer</th>';
                            htm += '<th  style="width: 13%;">Address</th>';
                            htm += '<th  style="width: 10%;">Category</th>';
                            htm += '<th  style="width: 8%;;">Case Qty</th>';
                            htm += '</tr>';
                        }
                        else if (ProjectName.toLowerCase() == "poc") {
                            // COMMENTED UP AND DOWN MOVEMENT 20.11.2020
                            htm = "";
                            htm += '<tr class="table' + i + '" style="z-index: 0;display:flex;">';
                            htm += '<th  style="width: 16%;;">Order No</th>';
                            //htm += '<th  style="width: 35%;;">Customer</th>';
                            htm += '<th  style="width: 35%;;">Customer</th>';

                            //htm += '<th  style="width: 18%;;">Cubage</th>';
                            htm += '<th  style="width: 12%;;">Case Qty</th>';
                            htm += '<th  style="width: 18%;;">Amount</th>';
                            htm += '<th  style="width: 18%;;">Total Lines</th>';

                            htm += '</tr>';
                        }
                        else if (ProjectName.toLowerCase() == "wms-lsh" || ProjectName.toLowerCase() == "unitrade" || ProjectName.toLowerCase() == "ywf" || ProjectName.toLowerCase() == "ricwil" || ProjectName.toLowerCase() == "sandl") {
                            // COMMENTED UP AND DOWN MOVEMENT 20.11.2020
                            htm = "";
                            htm += '<tr class="table' + i + '" style="z-index: 0;display:flex;">';
                            htm += '<th  style="width: 16%;;">Order No</th>';
                            //htm += '<th  style="width: 35%;;">Customer</th>';
                            htm += '<th  style="width: 53%;;">Customer</th>';

                            //htm += '<th  style="width: 18%;;">Cubage</th>';
                            htm += '<th  style="width: 12%;;">Case Qty</th>';
                            htm += '<th  style="width: 18%;;">Amount</th>';

                            htm += '</tr>';
                        }
                        else if (ProjectName.toLowerCase() == "pod") {
                            // COMMENTED UP AND DOWN MOVEMENT 25.11.2020
                            htm = "";
                            htm += '<tr class="table' + i + '" style="z-index: 0;display:flex;">';
                            htm += '<th  style="width: 22%;">Order No</th>';
                            htm += '<th  style="width: 18%;">Customer</th>';

                            htm += '<th  style="width: 16%;">Cubage</th>';
                            htm += '<th  style="width: 11%;">Case Qty</th>';
                            htm += '<th  style="width: 18%;">Amount</th>';
                            htm += '<th  style="width: 14%;">Service Time</th>';
                            htm += '</tr>';
                        }
                        else if (ProjectName.toLowerCase() == "pvm" || ProjectName.toLowerCase() == "dms" || ProjectName.toLowerCase() == "etika" || ProjectName.toLowerCase() == "ffb") {
                            htm = "";
                            htm += '<tr class="table' + i + '" style="z-index: 0;display:flex;" >';
                            htm += '<th  style="width: 16%;;">Order No</th>';
                            htm += '<th  style="width: 17%;;">Sales Agent</th>';
                            htm += '<th  style="width: 18%;;">Customer</th>';

                            htm += '<th  style="width: 18%;;">Cubage</th>';

                            htm += '<th  style="width: 18%;;">Amount</th>';
                            htm += '</tr>';
                        }
                        else if (ProjectName.toLowerCase() == "tradeprofd" || ProjectName.toLowerCase() == "limtraders" || ProjectName.toLowerCase() == "vismark") {
                            htm = "";
                            //htm += '<tr class="table' + i + '" style="z-index: 0;display:flex;" >';
                            htm += '<tr class="table' + i + '" style="z-index: 0;" >';
                            htm += '<th  style="width: 16%;;">Order No</th>';
                            htm += '<th  style="width: 9%;;">Territory</th>';
                            htm += '<th  style="width: 15%;;">Customer</th>';
                            htm += '<th  style="width: 8%;;">VehicleID</th>';
                            htm += '<th  style="width: 15%;;">Address</th>';

                            htm += '<th  style="width: 10%;;">Cubage</th>';
                            htm += '<th  style="width: 12%;;">Case Qty</th>';
                            htm += '<th  style="width: 14%;;">Amount</th>';
                            htm += '<th style="display: none"></th>';
                            htm += '</tr>';
                        }
                        else {
                            htm = "";
                            htm += '<tr class="table' + i + '" style="z-index: 0;display:flex;" >';
                            htm += '<th  style="width: 16%;;">Order No</th>';
                            htm += '<th  style="width: 17%;;">Territory</th>';
                            htm += '<th  style="width: 18%;;">Customer</th>';

                            htm += '<th  style="width: 18%;;">Cubage</th>';
                            htm += '<th  style="width: 12%;;">Case Qty</th>';
                            htm += '<th  style="width: 18%;;">Amount</th>';
                            htm += '</tr>';
                        }

                        //  var territory = objSalesManTerritory[vehicleData[i].Code];
                        var vehId = vehicleData[i].Code;

                        var vehLength = vehicleData[i].Length == null ? 0 : vehicleData[i].Length;
                        var vehHeight = vehicleData[i].Height == null ? 0 : vehicleData[i].Height;
                        var vehWidth = vehicleData[i].Width == null ? 0 : vehicleData[i].Width;
                        var fff0 = 0;
                        var tdRowId = "";
                        for (var j = 0; j < selectData.length; j++) {

                            if (vehId == selectData[j].VehicleID) {
                                var cubage = selectData[j].Cubage == null ? "" : selectData[j].Cubage;

                                if (ProjectName.toLowerCase() == "wms-warehouse" || ProjectName.toLowerCase() == "lsh") {
                                    htm += '<tr class="table' + i + '" style="word-break:break-all;z-index: 0;display:flex;" >';
                                    htm += '<td   style="width: 16%;">' + selectData[j].OrdNo + '</td>';
                                    htm += '<td   style="width: 17%;">' + selectData[j].Territory + '</td>';
                                    htm += '<td   style="width: 18%;">' + selectData[j].CustomerName + '</td>';

                                    htm += '<td   style="width: 20%;">' + selectData[j].CustAddress + '</td>';

                                    htm += '<td   style="width: 10%;">' + cubage + '</td>'; //+5

                                    _totQty = _totQty + parseInt(selectData[j].CaseQty.toString());
                                    _totnoofOrders = _totnoofOrders + 1;
                                    htm += '<td  style="width:  10%;">' + selectData[j].CaseQty + '</td>';
                                    htm += '<td   style="width: 18%;">' + selectData[j].Amount + '</td>';
                                    htm += '<td style="display: none">' + vehId + '</td>';
                                    htm += '</tr>';
                                }
                                else if (ProjectName.toLowerCase() == "wms") {
                                    //htm += '<tr class="table' + i + '" style="word-break:break-all;z-index: 0;display:flex;" >';
                                    htm += '<tr class="table' + i + '" style="word-break:break-all;" >';
                                    htm += '<td   style="width: 14%;">' + selectData[j].OrdNo + '</td>';
                                    htm += '<td   style="width: 10%;">' + selectData[j].DONO + '</td>';
                                    //htm += '<td   style="width: 10%;">' + selectData[j].Territory + '</td>';
                                    htm += '<td   style="width: 13%;">' + selectData[j].CustomerName + '</td>';

                                    htm += '<td   style="width: 13%;">' + selectData[j].CustAddress + '</td>';
                                    htm += '<td   style="width: 10%;">' + selectData[j].Category + '</td>';

                                    //htm += '<td   style="width: 10%;">' + cubage + '</td>'; //+5
                                    htm += '<td   style="width: 10%;">' + selectData[j].Remarks + '</td>'; //+5
                                    htm += '<td   style="width: 10%;">' + selectData[j].PayTerms + '</td>'; //+5

                                    _totQty = _totQty + parseInt(selectData[j].CaseQty.toString());
                                    _totnoofOrders = _totnoofOrders + 1;
                                    htm += '<td  style="width:  8%;">' + selectData[j].CaseQty + '</td>';
                                    htm += '<td   style="width: 12%;">' + selectData[j].Amount + '</td>';
                                    htm += '<td style="display: none">' + vehId + '</td>';
                                    htm += '</tr>';
                                }
                                else if (ProjectName.toLowerCase() == "sej") {

                                    tdRowId = "tdRow_" + selectData[j].OrdNo.toLowerCase();
                                    //htm += '<tr class="table' + i + '" style="word-break:break-all;z-index: 0;display:flex;" >';
                                    htm += '<tr class="table' + i + '" id="' + tdRowId + '" style="word-break:break-all;" >';
                                    htm += '<td   style="width: 20%;">' + selectData[j].OrdNo + '</td>';
                                    //htm += '<td   style="width: 10%;">' + selectData[j].DONO + '</td>';
                                    //htm += '<td   style="width: 10%;">' + selectData[j].Territory + '</td>';
                                    htm += '<td   style="width: 26%;">' + selectData[j].CustomerName + '</td>';

                                    htm += '<td   style="width: 30%;">' + selectData[j].CustAddress + '</td>';
                                    //htm += '<td   style="width: 10%;">' + selectData[j].Category + '</td>';

                                    //htm += '<td   style="width: 10%;">' + cubage + '</td>'; //+5
                                    //htm += '<td   style="width: 10%;">' + selectData[j].Remarks + '</td>'; //+5
                                    //htm += '<td   style="width: 10%;">' + selectData[j].PayTerms + '</td>'; //+5

                                    _totQty = _totQty + parseInt(selectData[j].CaseQty.toString());
                                    _totnoofOrders = _totnoofOrders + 1;
                                    htm += '<td  style="width:  12%;">' + selectData[j].CaseQty + '</td>';
                                    htm += '<td   style="width: 12%;">' + selectData[j].Amount + '</td>';
                                    htm += '<td style="display: none">' + vehId + '</td>';
                                    htm += '</tr>';
                                }
                                else if (ProjectName.toLowerCase() == "wil" || ProjectName.toLowerCase() == "leonsynergy") {
                                    //htm += '<tr class="table' + i + '" style="word-break:break-all;z-index: 0;display:flex;" >';
                                    htm += '<tr class="table' + i + '" style="word-break:break-all;z-index: 0;display:inherit;" >';
                                    htm += '<td   style="width: 14%;">' + selectData[j].OrdNo + '</td>';
                                    htm += '<td   style="width: 10%;">' + selectData[j].DONO + '</td>';
                                    htm += '<td   style="width: 10%;">' + selectData[j].Territory + '</td>';
                                    htm += '<td   style="width: 13%;">' + selectData[j].CustomerName + '</td>';

                                    htm += '<td   style="width: 13%;">' + selectData[j].CustAddress + '</td>';
                                    htm += '<td   style="width: 10%;">' + selectData[j].Category + '</td>';

                                    htm += '<td   style="width: 10%;">' + cubage + '</td>'; //+5

                                    _totQty = _totQty + parseInt(selectData[j].CaseQty.toString());
                                    _totnoofOrders = _totnoofOrders + 1;
                                    htm += '<td  style="width:  8%;">' + selectData[j].CaseQty + '</td>';
                                    htm += '<td   style="width: 12%;">' + selectData[j].Amount + '</td>';
                                    htm += '<td style="display: none">' + vehId + '</td>';
                                    htm += '</tr>';
                                }
                                else if (ProjectName.toLowerCase() == "laponie") {
                                    //htm += '<tr class="table' + i + '" style="word-break:break-all;z-index: 0;display:flex;" >';
                                    htm += '<tr class="table' + i + '" style="word-break:break-all;z-index: 0;" >';
                                    htm += '<td   style="width: 14%;">' + selectData[j].OrdNo + '</td>';
                                    htm += '<td   style="width: 10%;">' + selectData[j].DONO + '</td>';
                                    htm += '<td   style="width: 10%;">' + selectData[j].Territory + '</td>';
                                    htm += '<td   style="width: 13%;">' + selectData[j].CustomerName + '</td>';

                                    htm += '<td   style="width: 13%;">' + selectData[j].CustAddress + '</td>';
                                    htm += '<td   style="width: 10%;">' + selectData[j].Category + '</td>';

                                    _totQty = _totQty + parseInt(selectData[j].CaseQty.toString());
                                    _totnoofOrders = _totnoofOrders + 1;
                                    htm += '<td  style="width:  8%;">' + selectData[j].CaseQty + '</td>';
                                    htm += '<td style="display: none">' + vehId + '</td>';
                                    htm += '</tr>';
                                }
                                else if (ProjectName.toLowerCase() == "poc") {
                                    // COMMENTED UP AND DOWN MOVEMENT 20.11.2020
                                    htm += '<tr class="table' + i + '" style="z-index: 0;display:flex;"  onclick="Row_Click_func(this)"  >';
                                    htm += '<td   style="width: 16%;">' + selectData[j].OrdNo + '</td>';
                                    //htm += '<td   style="width: 35%;">' + selectData[j].CustomerName + '</td>';
                                    htm += '<td   style="width: 35%;">' + selectData[j].CustomerName + '</td>';

                                    //htm += '<td   style="width: 18%;">' + cubage + '</td>'; //+5
                                    htm += '<td  style="width:  12%;">' + selectData[j].CaseQty + '</td>';
                                    htm += '<td   style="width: 18%;">' + selectData[j].Amount + '</td>';
                                    htm += '<td   style="width: 18%;">' + selectData[j].TotalLines + '</td>';
                                    htm += '<td style="display: none">' + vehId + '</td>';
                                    htm += '</tr>';
                                }
                                else if (ProjectName.toLowerCase() == "wms-lsh" || ProjectName.toLowerCase() == "unitrade" || ProjectName.toLowerCase() == "ywf" || ProjectName.toLowerCase() == "ricwil" || ProjectName.toLowerCase() == "sandl") {
                                    // COMMENTED UP AND DOWN MOVEMENT 20.11.2020
                                    htm += '<tr class="table' + i + '" style="z-index: 0;display:flex;"  onclick="Row_Click_func(this)"  >';
                                    htm += '<td   style="width: 16%;">' + selectData[j].OrdNo + '</td>';
                                    //htm += '<td   style="width: 35%;">' + selectData[j].CustomerName + '</td>';
                                    htm += '<td   style="width: 53%;">' + selectData[j].CustomerName + '</td>';

                                    //htm += '<td   style="width: 18%;">' + cubage + '</td>'; //+5
                                    htm += '<td  style="width:  12%;">' + selectData[j].CaseQty + '</td>';
                                    htm += '<td   style="width: 18%;">' + selectData[j].Amount + '</td>';
                                    htm += '<td style="display: none">' + vehId + '</td>';
                                    htm += '</tr>';
                                }
                                else if (ProjectName.toLowerCase() == "pvm" || ProjectName.toLowerCase() == "dms" || ProjectName.toLowerCase() == "etika" || ProjectName.toLowerCase() == "ffb") {
                                    htm += '<tr class="table' + i + '" style="z-index: 0;display:flex;" >';
                                    htm += '<td   style="width: 16%;">' + selectData[j].OrdNo + '</td>';
                                    htm += '<td   style="width: 17%;">' + selectData[j].SalesAgent + '</td>';
                                    htm += '<td   style="width: 18%;">' + selectData[j].CustomerName + '</td>';

                                    htm += '<td   style="width: 18%;">' + cubage + '</td>'; //+5
                                    //htm += '<td  style="width:  12%;">' + selectData[j].CaseQty + '</td>';
                                    htm += '<td   style="width: 18%;">' + selectData[j].Amount + '</td>';
                                    htm += '<td style="display: none">' + vehId + '</td>';
                                    htm += '</tr>';
                                }
                                else if (ProjectName.toLowerCase() == "tradeprofd" || ProjectName.toLowerCase() == "limtraders" || ProjectName.toLowerCase() == "vismark") {
                                    //htm += '<tr class="table' + i + '" style="z-index: 0;display:flex;" >';
                                    htm += '<tr class="table' + i + '" style="z-index: 0;" >';
                                    htm += '<td   style="width: 16%;">' + selectData[j].OrdNo + '</td>';
                                    htm += '<td   style="width: 9%;">' + selectData[j].Territory + '</td>';
                                    htm += '<td   style="width: 15%;">' + selectData[j].CustomerName + '</td>';
                                    htm += '<td   style="width: 8%;">' + selectData[j].VehicleID + '</td>';
                                    htm += '<td   style="width: 15%;">' + selectData[j].CustAddress + '</td>';

                                    htm += '<td   style="width: 10%;">' + cubage + '</td>'; //+5
                                    htm += '<td  style="width:  12%;">' + selectData[j].CaseQty + '</td>';
                                    htm += '<td   style="width: 14%;">' + selectData[j].Amount + '</td>';
                                    htm += '<td style="display: none">' + vehId + '</td>';
                                    htm += '</tr>';
                                }
                                else {
                                    htm += '<tr class="table' + i + '" style="z-index: 0;display:flex;" >';
                                    htm += '<td   style="width: 16%;">' + selectData[j].OrdNo + '</td>';
                                    htm += '<td   style="width: 17%;">' + selectData[j].Territory + '</td>';
                                    htm += '<td   style="width: 18%;">' + selectData[j].CustomerName + '</td>';

                                    htm += '<td   style="width: 18%;">' + cubage + '</td>'; //+5
                                    htm += '<td  style="width:  12%;">' + selectData[j].CaseQty + '</td>';
                                    htm += '<td   style="width: 18%;">' + selectData[j].Amount + '</td>';
                                    htm += '<td style="display: none">' + vehId + '</td>';
                                    htm += '</tr>';
                                }
                            }
                        } // ITERATION for (var j = 0; j < selectData.length; j++) {


                        if (ProjectName.toLowerCase() == "wms" || ProjectName.toLowerCase() == "sej" || ProjectName.toLowerCase() == "laponie" || ProjectName.toLowerCase() == "wms-warehouse" || ProjectName.toLowerCase() == "wil" || ProjectName.toLowerCase() == "leonsynergy") {
                            var info = _totQty + " - No of Order(s) : " + _totnoofOrders + "";
                            $("#div" + i + "_totqty").text(info);
                            _totQty = 0;
                            _totnoofOrders = 0;
                        }


                        $("#" + tbodyId + "_" + i).append(htm);
                        GetOrdNo(i, vehId);
                        if (ordNo != "") {
                            CalculateVehicles(i, ordNo, vehLength, vehHeight, vehWidth);
                            ordNo = "";
                        }
                        else {
                            $('#printbtnbackRoundColor' + i).css('background-color', 'green');
                            $('#divbackRoundColor' + i).css('background-color', 'green');
                            $('#div' + i).css('border-color', 'green');
                        }
                    } // ITERATION OF VEHICLE ===========================
                }
                else {
                    _LoadingImageOpen();
                    vehicle_Iteration = 0;
                    sorted_Customer_List = [];
                    // FIRST GET FINAL SORTED DATA 
                    Prepare_final_Sorted_Data(prepare_customerList_Vehicle(vehicleData[0].districtcode, selectData, vehicleData[0].Code));
                }
            }
            if (ProjectName.toLowerCase() == "sej")
                GetOrdNoandQty(VhCntqry);

            //LoadingImagePopUpClose();
        }

    });

}

// SORTING ORDER BASED DIRECTIONS SERVICE =======================================================================

function Prepare_Dataset_for_AllVehicle() {
    var temp_Customer_List;
    // 0 1 2 3 4   =>   5
    if (vehicle_Iteration < vehicleData.length) {
        // GET ALL SORTED DATA ====
        temp_Customer_List = prepare_customerList_Vehicle(vehicleData[vehicle_Iteration].districtcode, selectData, vehicleData[vehicle_Iteration].Code);

        Prepare_final_Sorted_Data(temp_Customer_List);
    }
    else if (vehicle_Iteration == vehicleData.length) {
        // FINALLY CALL 
        _LoadingImageClose();
        POD_Vehicle_Assignement();
    }
}


function prepare_customerList_Vehicle_old(districtcode, selectData, vehicleCode) {
    var temp_Customer_List = [];

    for (var i = 0; i < selectData.length; i++) {
        if (districtcode.toString() == selectData[i].POSTCODE.toString().substr(0, 2)) {
            var obj = {};
            obj.Cubage = selectData[i].Cubage;
            obj.OrdNo = selectData[i].OrdNo;
            obj.CustomerName = selectData[i].CustomerName;
            obj.CaseQty = selectData[i].CaseQty;
            obj.Amount = selectData[i].Amount;
            obj.ServiceTime = selectData[i].ServiceTime;
            obj.LATITUDE = selectData[i].LATITUDE;
            obj.LONGITUDE = selectData[i].LONGITUDE;
            obj.VehicleDistrictCode = districtcode.toString()
            obj.VehicleCode = vehicleCode.toString()

            temp_Customer_List.push(obj);
        }
    }
    return temp_Customer_List;
}

function prepare_customerList_Vehicle(districtcode, selectData, vehicleCode) {
    var temp_Customer_List = [];

    for (var i = 0; i < selectData.length; i++) {


        if (selectData[i].VehicleID.toString().toUpperCase() == "BUFFER") {
            if (districtcode.toString() == selectData[i].POSTCODE.toString().substr(0, 2)) {
                var obj = {};
                obj.Cubage = selectData[i].Cubage;
                obj.OrdNo = selectData[i].OrdNo;
                obj.CustomerName = selectData[i].CustomerName;
                obj.CaseQty = selectData[i].CaseQty;
                obj.Amount = selectData[i].Amount;
                obj.ServiceTime = selectData[i].ServiceTime;
                obj.LATITUDE = selectData[i].LATITUDE;
                obj.LONGITUDE = selectData[i].LONGITUDE;
                obj.VehicleDistrictCode = districtcode.toString()
                obj.VehicleCode = vehicleCode.toString()

                temp_Customer_List.push(obj);
            }
        }
        else if (selectData[i].VehicleID.toString().toUpperCase() != "BUFFER") {
            if (vehicleCode.toString() == selectData[i].VehicleID.toString().toUpperCase()) {
                var obj = {};
                obj.Cubage = selectData[i].Cubage;
                obj.OrdNo = selectData[i].OrdNo;
                obj.CustomerName = selectData[i].CustomerName;
                obj.CaseQty = selectData[i].CaseQty;
                obj.Amount = selectData[i].Amount;
                obj.ServiceTime = selectData[i].ServiceTime;
                obj.LATITUDE = selectData[i].LATITUDE;
                obj.LONGITUDE = selectData[i].LONGITUDE;
                obj.VehicleDistrictCode = districtcode.toString()
                obj.VehicleCode = vehicleCode.toString()

                temp_Customer_List.push(obj);
            }
        }
        else {
            if (districtcode.toString() == selectData[i].POSTCODE.toString().substr(0, 2)) {
                var obj = {};
                obj.Cubage = selectData[i].Cubage;
                obj.OrdNo = selectData[i].OrdNo;
                obj.CustomerName = selectData[i].CustomerName;
                obj.CaseQty = selectData[i].CaseQty;
                obj.Amount = selectData[i].Amount;
                obj.ServiceTime = selectData[i].ServiceTime;
                obj.LATITUDE = selectData[i].LATITUDE;
                obj.LONGITUDE = selectData[i].LONGITUDE;
                obj.VehicleDistrictCode = districtcode.toString()
                obj.VehicleCode = vehicleCode.toString()

                temp_Customer_List.push(obj);
            }
        }
    }
    return temp_Customer_List;
}


function get_Ordered_customerList_Vehicle(districtcode, selectData, vehicleCode) {
    var temp_Customer_List = [];

    for (var i = 0; i < selectData.length; i++) {

        if (vehicleCode.toString() == selectData[i].VehicleCode.toString()) {
            var obj = {};
            obj.Cubage = selectData[i].Cubage;
            obj.OrdNo = selectData[i].OrdNo;
            obj.CustomerName = selectData[i].CustomerName;
            obj.CaseQty = selectData[i].CaseQty;
            obj.Amount = selectData[i].Amount;
            obj.ServiceTime = selectData[i].ServiceTime;
            obj.LATITUDE = selectData[i].LATITUDE;
            obj.LONGITUDE = selectData[i].LONGITUDE;
            obj.VehicleDistrictCode = districtcode.toString()
            obj.VehicleCode = vehicleCode.toString()

            temp_Customer_List.push(obj);
        }
    }
    return temp_Customer_List;
}


function get_Ordered_customerList_Vehicle_old(districtcode, selectData, vehicleCode) {
    var temp_Customer_List = [];

    for (var i = 0; i < selectData.length; i++) {

        if (selectData[i].VehicleID.toString().toUpperCase() == "BUFFER") {
            if (districtcode.toString() == selectData[i].POSTCODE.toString().substr(0, 2)) {
                var obj = {};
                obj.Cubage = selectData[i].Cubage;
                obj.OrdNo = selectData[i].OrdNo;
                obj.CustomerName = selectData[i].CustomerName;
                obj.CaseQty = selectData[i].CaseQty;
                obj.Amount = selectData[i].Amount;
                obj.ServiceTime = selectData[i].ServiceTime;
                obj.LATITUDE = selectData[i].LATITUDE;
                obj.LONGITUDE = selectData[i].LONGITUDE;
                obj.VehicleDistrictCode = districtcode.toString()
                obj.VehicleCode = vehicleCode.toString()

                temp_Customer_List.push(obj);
            }
        }
        else if (selectData[i].VehicleID.toString().toUpperCase() != "BUFFER") {
            if (vehicleCode.toString() == selectData[i].VehicleID.toString().toUpperCase()) {
                var obj = {};
                obj.Cubage = selectData[i].Cubage;
                obj.OrdNo = selectData[i].OrdNo;
                obj.CustomerName = selectData[i].CustomerName;
                obj.CaseQty = selectData[i].CaseQty;
                obj.Amount = selectData[i].Amount;
                obj.ServiceTime = selectData[i].ServiceTime;
                obj.LATITUDE = selectData[i].LATITUDE;
                obj.LONGITUDE = selectData[i].LONGITUDE;
                obj.VehicleDistrictCode = districtcode.toString()
                obj.VehicleCode = vehicleCode.toString()

                temp_Customer_List.push(obj);
            }
        }
        else {
            if (districtcode.toString() == selectData[i].POSTCODE.toString().substr(0, 2)) {
                var obj = {};
                obj.Cubage = selectData[i].Cubage;
                obj.OrdNo = selectData[i].OrdNo;
                obj.CustomerName = selectData[i].CustomerName;
                obj.CaseQty = selectData[i].CaseQty;
                obj.Amount = selectData[i].Amount;
                obj.ServiceTime = selectData[i].ServiceTime;
                obj.LATITUDE = selectData[i].LATITUDE;
                obj.LONGITUDE = selectData[i].LONGITUDE;
                obj.VehicleDistrictCode = districtcode.toString()
                obj.VehicleCode = vehicleCode.toString()

                temp_Customer_List.push(obj);
            }
        }
    }
    return temp_Customer_List;
}

function update_Destination_Reach_Time(lati, longi, dest_lati, dest_longi, destination_reach_time) {
    var custNumber = '';
    var obj = {};
    var cubage_mins = 0;
    var tot_mins = 0;

    if (
            lati.toString().split('.')[0].toString() == dest_lati.toString().split('.')[0].toString() &&
            lati.toString().split('.')[1].substr(0, 2).toString() == dest_lati.toString().split('.')[1].substr(0, 2).toString() &&
            longi.toString().split('.')[0].toString() == dest_longi.toString().split('.')[0].toString() &&
            longi.toString().split('.')[1].substr(0, 2).toString() == dest_longi.toString().split('.')[1].substr(0, 2).toString()
        ) {
        // ADDED DESTINATION TIME FOR LAST CUSTOMER
        if (sorted_Customer_List != null && sorted_Customer_List.length > 0) {
            var existing_time = parseInt(sorted_Customer_List[sorted_Customer_List.length - 1].ServiceTime);
            sorted_Customer_List[sorted_Customer_List.length - 1].ServiceTime = existing_time + parseInt(destination_reach_time) + " min(s)";
        }
    }
}



function Prepare_final_Sorted_Data(temp_Customer_List) {
    // HERE SERVICE TIME CALCULATION FOR ALL CUSTOMERS
    //debugger;
    var origin_Dets = '';
    var destination_Dets = '';
    var processed_value = '';
    var sTemp1, sTemp2, sTemp3;
    var final_sort_list = [];
    var locations = [];


    // GET LATITUDE AND LONGITUDE FROM VEHICLE 
    if (temp_Customer_List == null || temp_Customer_List == [] || temp_Customer_List == '') {
        vehicle_Iteration++;
        Prepare_Dataset_for_AllVehicle();
    }
    else {

        // SORT THE ARRAY USING THE PROPERTIES HERE 

        //temp_Customer_List.sort(function (x, y) {
        //    // Descending Order
        //    return x.CustNo == y.CustNo ? 0 : x > y ? 1 : -1;
        //});

        // SORT THE ARRAY USING THE PROPERTIES HERE 

        execute("select latitude,longitude from vehicle where code='" + temp_Customer_List[0].VehicleCode.toString() + "'");

        Origin_latitude = executeQry[0].latitude.toString();
        Origin_longitude = executeQry[0].longitude.toString();

        var cnt = temp_Customer_List.length + 2;
        var iv = 0;
        for (j = 0; j < cnt; j++) {
            if (j == 0) {
                locations.push([]);
                locations[j].push(new Array(2));

                locations[j][0] = Origin_latitude;
                locations[j][1] = Origin_longitude;
            }
            else if (j == cnt - 1) {
                locations.push([]);
                locations[j].push(new Array(2));

                locations[j][0] = Origin_latitude;
                locations[j][1] = Origin_longitude;
            }
            else {
                locations.push([]);
                locations[j].push(new Array(2));

                locations[j][0] = temp_Customer_List[iv].LATITUDE;
                locations[j][1] = temp_Customer_List[iv].LONGITUDE;
                iv += 1;
            }
        }

        //// Sample Data 
        //var locations = [
        //  [
        //    //"cbe",
        //    10.951978, 76.977861
        //  ],
        //   [
        //    //"salem",
        //    11.706031, 78.209151
        //   ],
        //   [
        //    //"karur",
        //    10.949282, 78.091709
        //   ],
        //  [
        //    //"tup",
        //    11.093514, 77.340747
        //  ],
        //  [
        //    //"erode",
        //    11.340025, 77.736424
        //  ],
        //   [
        //    //"cbe",
        //    10.951978, 76.977861
        //   ],
        //]



        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer({
            suppressMarkers: true
        });
        var waypts = [];


        for (var i = 0; i < locations.length; i++) {
            waypts.push({
                location: new google.maps.LatLng(locations[i][0], locations[i][1]),
                stopover: true
            });
        }

        var request = {
            origin: new google.maps.LatLng(locations[0][0], locations[0][1]),
            destination: new google.maps.LatLng(locations[locations.length - 1][0], locations[locations.length - 1][1]),
            waypoints: waypts,
            optimizeWaypoints: true,
            travelMode: google.maps.TravelMode.DRIVING
        };

        directionsService.route(request,
            function (response, status) {
                if (status === google.maps.DirectionsStatus.OK) {

                    vehicle_Iteration++;
                    directionsDisplay.setDirections(response);
                    var orders = response.routes[0].waypoint_order;
                    var route = response.routes[0];
                    var regex = /[+-]?\d+(\.\d+)?/g;

                    //alert(route.legs[0].start_location); (10.9519605, 76.97772560000001)

                    //for (var i = 1; i < route.legs.length; i++) {
                    var lineno = 0;
                    var slineno = '';
                    for (var i = 0; i < route.legs.length; i++) {
                        //debugger;
                        //alert(route.legs[i].start_location);
                        var strlatlong = route.legs[i].end_location.toString();

                        var floats = strlatlong.match(regex).map(function (v) { return parseFloat(v); });

                        var obj_v = get_CustomerDetails(temp_Customer_List, floats[0].toString(), floats[1].toString(), route.legs[i].duration.text.toString());
                        if (obj_v != null) {
                            lineno = lineno + 1;
                            slineno = lineno.toString();
                            obj_v.LineNumber = slineno;

                            sorted_Customer_List.push(obj_v);
                        }

                        update_Destination_Reach_Time(floats[0], floats[1], Origin_latitude, Origin_longitude, route.legs[i].duration.text.toString());

                    }

                    Prepare_Dataset_for_AllVehicle();
                }
                else {
                    //window.alert('Directions request failed due to ' + status);
                    // RESUBMIT THE REQUEST i.e., directionsService.route(request,
                    Prepare_Dataset_for_AllVehicle();
                }
            });
    }

    //return final_sort_list;
} // end of function dont comment it.


function getOccurrence(temp_Customer_List, lati, longi, ordno) {
    //sorted_Customer_List
    var no = 0;
    for (var i = 0; i < sorted_Customer_List.length; i++) {

        if (sorted_Customer_List[i].LATITUDE.toString() == lati.toString() &&
            sorted_Customer_List[i].LONGITUDE.toString() == longi.toString() &&
            sorted_Customer_List[i].OrdNo.toString() == ordno.toString()) {
            no++;
        }

    }
    return no;
}

function get_CustomerDetails(temp_Customer_List, lati, longi, serviceTime) {
    var custNumber = '';
    var obj = null;
    var cubage_mins = 0;
    var tot_mins = 0;
    //var NoOfoccurrence = 0;
    //var NoOfMet = 0;

    for (var i = 0; i < temp_Customer_List.length; i++) {

        // APPROXIMATE COMPARE 122.1234234323  IT CHECK ONLY FOR 122.12 

        if (
                lati.split('.')[0].toString() == temp_Customer_List[i].LATITUDE.toString().split('.')[0].toString() &&
                lati.split('.')[1].substr(0, 2).toString() == temp_Customer_List[i].LATITUDE.toString().split('.')[1].substr(0, 2).toString() &&
                longi.split('.')[0].toString() == temp_Customer_List[i].LONGITUDE.toString().split('.')[0].toString() &&
                longi.split('.')[1].substr(0, 2).toString() == temp_Customer_List[i].LONGITUDE.toString().split('.')[1].substr(0, 2).toString()
            ) {

            obj = {};
            obj.Cubage = temp_Customer_List[i].Cubage;
            obj.OrdNo = temp_Customer_List[i].OrdNo;

            obj.CustomerName = temp_Customer_List[i].CustomerName;

            obj.CaseQty = temp_Customer_List[i].CaseQty;
            obj.Amount = temp_Customer_List[i].Amount;

            // Here Add the cubage time with Service time
            cubage_mins = get_cubage_mins(obj.Cubage);
            tot_mins = parseInt(serviceTime) + parseInt(cubage_mins);
            obj.ServiceTime = tot_mins + " min(s)";

            // FOR USED PURPOSE 
            temp_Customer_List[i].LATITUDE = "-1";
            temp_Customer_List[i].LONGITUDE = "-1";

            obj.LATITUDE = temp_Customer_List[i].LATITUDE;
            obj.LONGITUDE = temp_Customer_List[i].LONGITUDE;
            obj.VehicleDistrictCode = temp_Customer_List[i].VehicleDistrictCode;
            obj.VehicleCode = temp_Customer_List[i].VehicleCode;
            obj.LineNumber = 0;

            return obj;
        }
    }
    return null;
}



function POD_Vehicle_Assignement(selectData) {
    var Vehicle_Customer_Data = [];
    var lineNumber = 0;

    for (var i = 0; i < vehicleData.length; i++) {
        tbodyId = vehicleData[i].Code.replace(/ /g, "");
        $("#" + tbodyId + "_" + i).empty();

        // COMMENTED UP AND DOWN MOVEMENT 25.11.2020
        htm = "";
        htm += '<tr class="table' + i + '" style="z-index: 0;display:flex;">';
        htm += '<th  style="width: 22%;">Order No</th>';
        htm += '<th  style="width: 18%;">Customer</th>';

        htm += '<th  style="width: 16%;">Cubage</th>';
        htm += '<th  style="width: 11%;">Case Qty</th>';
        htm += '<th  style="width: 18%;">Amount</th>';
        htm += '<th  style="width: 14%;">Service Time</th>';
        htm += '</tr>';

        //  var territory = objSalesManTerritory[vehicleData[i].Code];
        var vehId = vehicleData[i].Code;

        var vehLength = vehicleData[i].Length == null ? 0 : vehicleData[i].Length;
        var vehHeight = vehicleData[i].Height == null ? 0 : vehicleData[i].Height;
        var vehWidth = vehicleData[i].Width == null ? 0 : vehicleData[i].Width;
        var fff0 = 0;
        var tot_time_calculation = 0;

        Vehicle_Customer_Data = get_Ordered_customerList_Vehicle(vehicleData[i].districtcode, sorted_Customer_List, vehicleData[i].Code);
        tot_time_calculation = 0;
        lineNumber = 0;

        for (var j = 0; j < Vehicle_Customer_Data.length; j++) {


            var cubage = Vehicle_Customer_Data[j].Cubage == null ? "" : Vehicle_Customer_Data[j].Cubage;
            htm += '<tr class="table' + i + '" style="z-index: 0;display:flex;"  onclick="Row_Click_func(this)"  >';
            htm += '<td   style="width: 22%;">' + Vehicle_Customer_Data[j].OrdNo + '</td>';
            htm += '<td   style="width: 18%;">' + Vehicle_Customer_Data[j].CustomerName + '</td>';
            htm += '<td   style="width: 16%;">' + parseFloat(cubage).toFixed(4) + '</td>'; //+5
            htm += '<td  style="width:  11%;">' + parseFloat(Vehicle_Customer_Data[j].CaseQty).toFixed(4) + '</td>';
            htm += '<td   style="width: 18%;">' + Vehicle_Customer_Data[j].Amount + '</td>';
            htm += '<td   style="width: 14%;">' + Vehicle_Customer_Data[j].ServiceTime + '</td>';
            htm += '<td style="display: none">' + vehId + '</td>';
            htm += '</tr>';
            tot_time_calculation += parseInt(Vehicle_Customer_Data[j].ServiceTime.toString());

        } // ITERATION for (var j = 0; j < selectData.length; j++) {

        // HERE WE HAVE ADD LAST CUSTOMER TO OFFICE TIME
        // AND CUBAGE TIME
        $("#div" + i + "_tottimeCalculation").text(tot_time_calculation + " min(s)");

        $("#" + tbodyId + "_" + i).append(htm);
        GetOrdNo(i, vehId);
        if (ordNo != "") {
            CalculateVehicles(i, ordNo, vehLength, vehHeight, vehWidth);
            ordNo = "";
        }
        else {
            $('#printbtnbackRoundColor' + i).css('background-color', 'green');
            $('#divbackRoundColor' + i).css('background-color', 'green');
            $('#div' + i).css('border-color', 'green');
        }
    } // ITERATION OF VEHICLE ===========================


} // END OF FUNCTION   function POD_Vehicle_Assignement(selectData)


function get_cubage_mins(cubage) {

    if (cubage == null || cubage === "undefined") {
        return 0;
    }


    execute("select no_of_mins from cubagelimit where " + cubage + " between from_limit and to_limit");

    return parseInt(executeQry[0].no_of_mins.toString());
}


// SORTING ORDER BASED DIRECTIONS SERVICE =======================================================================





function GetVehicleData_old() {
    if (ProjectName.toLowerCase() == "jsu") {
        UpdateOrderVehicleData(vehicleData);
    }
    else if (ProjectName.toLowerCase() == "wms" || ProjectName.toLowerCase() == "sej" || ProjectName.toLowerCase() == "laponie" || ProjectName.toLowerCase() == "wms-warehouse" || ProjectName.toLowerCase() == "wil" || ProjectName.toLowerCase() == "leonsynergy") {
        UpdateOrderVehicle();
    }

    var deliverydate = DateFormateChange($('#DeliveryDate').val());

    var qry = "select b.TotalAmt as Amount,b.VehicleID, c.SalesAgent as Territory, a.OrdNo as OrdNo, Sum(a.Cubage) as Cubage, Isnull(Sum(a.ItemCaseQty),0) as CaseQty, c.CustName as CustomerName \n,";
    // qry += "c.ZoneCode as AlternateShipAgent, b.DeliveryDate from (select OrdItem.OrdNo, (select top 1 Cubage \n";
    qry += "c.ZoneCode as AlternateShipAgent, b.DeliveryDate from (select OrdItem.OrdNo, (select top 1 (Cubage / BaseQty) * OrdItem.Qty \n";
    qry += "from UOM where Uom.ItemNo=OrdItem.ItemNo and Uom.Uom='CS') as Cubage,  \n";
    qry += "(OrdItem.Qty / (select top 1 BaseQty  \n";
    qry += "from UOM where Uom.ItemNo=OrdItem.ItemNo and Uom.Uom='CS')) as ItemCaseQty from  OrdItem) a  \n";
    qry += "INNER JOIN OrderHdr b on a.OrdNo=b.OrdNo  \n";
    qry += "INNER JOIN Customer c on b.CustID = c.CustNo  \n";
    qry += "Inner join Salesagent sa on sa.Code=b.AgentId \n";
    qry += "Inner Join SalesManGroup SM On SM.GroupID=sa.nodetreevalue ";
    qry += "where b.DeliveryDate between '" + deliverydate + " 00:00:00" + "' and '" + deliverydate + " 23:59:59" + "'  and (b.Void=0 or b.Void is null)  and b.CustID = c.CustNo  and  isnull(PickingStatus,0) < 7 ";
    // qry += "and  b.OrdNo not in (select ISNULL(OrdNo,'') as OrdNo from invoice where (Void = 0 or Void is null)) and  b.OrdNo not in (select isnull(O.OrdNo,'') as OrdNo from OrdApprovalHdr O inner join (select distinct isnull(OrdNo,'') as OrdNo from OrdApprovalDet Where CustomerInitiated=1) OD on OD.OrdNo=O.OrdNo where O.IsApproved is null) and SM.UserID='" + _UserID + "'  \n";
    qry += "and  b.OrdNo not in (select ISNULL(OrdNo,'') as OrdNo from invoice where (Void = 0 or Void is null)) and SM.UserID='" + _UserID + "'  \n";
    qry += "group by a.OrdNo, b.TotalAmt, c.SalesAgent, c.CustName, c.ZoneCode,b.DeliveryDate,b.VehicleID ";

    if (ProjectName.toLowerCase() != "jsu") {


        if (ProjectName.toLowerCase() == "wms" || ProjectName.toLowerCase() == "sej" || ProjectName.toLowerCase() == "laponie" || ProjectName.toLowerCase() == "wms-warehouse" || ProjectName.toLowerCase() == "wil" || ProjectName.toLowerCase() == "leonsynergy") {
            qry = "select b.TotalAmt as Amount,Case When ISNULL(b.VehicleID,'')='' then \n";
            qry += "(select top 1 Code from vehicle Where IsBUffer=1 and Branch=b.LocationCode) Else b.VehicleID End as VehicleID, \n";
            qry += "c.City as Territory, a.OrdNo as OrdNo, Sum(a.Cubage) as Cubage, Isnull(Sum(a.ItemCaseQty),0) as CaseQty, \n";
            qry += "c.CustName as CustomerName\n";
            qry += ",C.Address+(Case When ISNULL(C.Address2,'')='' Then'' Else ', '+ C.Address2 End)+(Case When ISNULL(C.City,'')='' \n";
            qry += "Then'' Else ', '+ C.City End) as CustAddress,\n";
            qry += "c.ZoneCode as AlternateShipAgent, b.DeliveryDate from (select OrdItem.OrdNo, (select top 1 (Cubage / BaseQty) * OrdItem.Qty\n";
            qry += "from UOM inner join Item on Item.ItemNo=UOM.ItemNo where Uom.ItemNo=OrdItem.ItemNo and Uom.Uom=Item.BulkUOM) as Cubage,\n";
            qry += "(OrdItem.Qty / (select top 1 BaseQty\n";
            qry += "from UOM inner join Item on Item.ItemNo=UOM.ItemNo where Uom.ItemNo=OrdItem.ItemNo \n";
            qry += "and Uom.Uom=Item.BulkUOM)) as ItemCaseQty from OrdItem) a\n";
            qry += "INNER JOIN OrderHdr b on a.OrdNo=b.OrdNo\n";
            qry += "INNER JOIN Customer c on b.CustID = c.CustNo\n";
            qry += "INNER JOIN LocationGroup LM on LM.GroupID=b.LocationCode\n";
            qry += "INNER JOIN vehicle V on V.Branch=LM.GroupID\n";
            qry += "where b.DeliveryDate between ('" + deliverydate + " 00:00:00 " + "') and ('" + deliverydate + " 23:59:59 " + "') \n";
            qry += "and (b.Void=0 or b.Void is null) and b.CustID = c.CustNo and isnull(PickingStatus,0) < 8 and b.OrdNo not in \n";
            qry += "(select OrdNo from invoice where (Void = 0 or Void is null)) and LM.USerID='" + _UserID + "' group by a.OrdNo, b.TotalAmt, c.SalesAgent, c.CustName, \n";
            qry += "C.Address,C.Address2,C.City,c.ZoneCode,b.DeliveryDate,b.VehicleID,b.LocationCode ";
        }
        else if (ProjectName.toLowerCase() == "lsh") {
            qry = "select b.TotalAmt as Amount,Case When ISNULL(b.VehicleID,'')='' then (select top 1 Code from vehicle Where IsBUffer=1) Else b.VehicleID End as VehicleID, c.City as Territory, a.OrdNo as OrdNo, Sum(a.Cubage) as Cubage, Isnull(Sum(a.ItemCaseQty),0) as CaseQty, c.CustName as CustomerName   \n";
            qry += ",C.Address+(Case When ISNULL(C.Address2,'')='' Then'' Else ', '+ C.Address2 End)+(Case When ISNULL(C.City,'')='' \n";
            qry += "Then'' Else ', '+ C.City End) as CustAddress\n";
            qry += ",c.ZoneCode as AlternateShipAgent, b.DeliveryDate from (select OrdItem.OrdNo, (select top 1 (Cubage / BaseQty) * OrdItem.Qty   \n";
            qry += "from UOM inner join Item on Item.ItemNo=UOM.ItemNo where Uom.ItemNo=OrdItem.ItemNo and Uom.Uom=Item.BulkUOM) as Cubage,    \n";
            qry += "(OrdItem.Qty / (select top 1 BaseQty    \n";
            qry += "from UOM inner join Item on Item.ItemNo=UOM.ItemNo  where Uom.ItemNo=OrdItem.ItemNo and Uom.Uom=Item.BulkUOM)) as ItemCaseQty from  OrdItem) a    \n";
            qry += "INNER JOIN OrderHdr b on a.OrdNo=b.OrdNo    \n";
            qry += "INNER JOIN Customer c on b.CustID = c.CustNo    \n";
            qry += "where b.DeliveryDate between ('" + deliverydate + " 00:00:00 " + "') and ('" + deliverydate + " 23:59:59 " + "') and (b.Void=0 or b.Void is null)  and b.CustID = c.CustNo  and  isnull(PickingStatus,0) < 8  and  b.OrdNo not in (select OrdNo from invoice where (Void = 0 or Void is null))";
            qry += "group by a.OrdNo, b.TotalAmt, c.SalesAgent, c.CustName, C.Address,C.Address2,C.City, c.ZoneCode,b.DeliveryDate,b.VehicleID   ";

        }
        else if (ProjectName.toLowerCase() == "poc" || ProjectName.toLowerCase() == "wms-lsh" || ProjectName.toLowerCase() == "unitrade" || ProjectName.toLowerCase() == "ywf" || ProjectName.toLowerCase() == "ricwil" || ProjectName.toLowerCase() == "sandl") {
            qry = "select b.TotalAmt as Amount,Case When ISNULL(b.VehicleID,'')='' then (select top 1 Code from vehicle Where IsBUffer=1) Else b.VehicleID End as VehicleID, c.City as Territory, a.OrdNo as OrdNo, Sum(a.Cubage) as Cubage, Isnull(Sum(a.ItemCaseQty),0) as CaseQty, c.CustName as CustomerName   \n";
            qry += ",C.Address+(Case When ISNULL(C.Address2,'')='' Then'' Else ', '+ C.Address2 End)+(Case When ISNULL(C.City,'')='' \n";
            qry += "Then'' Else ', '+ C.City End) as CustAddress\n";
            qry += ",c.ZoneCode as AlternateShipAgent, b.DeliveryDate from (select OrdItem.OrdNo, (select top 1 (Cubage / BaseQty) * OrdItem.Qty   \n";
            qry += "from UOM inner join Item on Item.ItemNo=UOM.ItemNo where Uom.ItemNo=OrdItem.ItemNo and Uom.Uom=Item.BulkUOM) as Cubage,    \n";
            qry += "(OrdItem.Qty / (select top 1 BaseQty    \n";
            qry += "from UOM inner join Item on Item.ItemNo=UOM.ItemNo  where Uom.ItemNo=OrdItem.ItemNo and Uom.Uom=Item.BulkUOM)) as ItemCaseQty from  OrdItem) a    \n";
            qry += "INNER JOIN OrderHdr b on a.OrdNo=b.OrdNo    \n";
            qry += "INNER JOIN Customer c on b.CustID = c.CustNo    \n";
            qry += "where b.DeliveryDate between ('" + deliverydate + " 00:00:00 " + "') and ('" + deliverydate + " 23:59:59 " + "') and (b.Void=0 or b.Void is null)  and b.CustID = c.CustNo  and  isnull(PickingStatus,0) < 8  and  b.OrdNo not in (select OrdNo from invoice where (Void = 0 or Void is null))";
            qry += "group by b.companyno, a.OrdNo, b.TotalAmt, c.SalesAgent, c.CustName, C.Address,C.Address2,C.City, c.ZoneCode,b.DeliveryDate,b.VehicleID   ";
            qry += " order by isnull(b.companyno,0)"

        }
        else {
            qry = "select b.TotalAmt as Amount,Case When ISNULL(b.VehicleID,'')='' then (select top 1 Code from vehicle Where IsBUffer=1) Else b.VehicleID End as VehicleID, c.City as Territory, a.OrdNo as OrdNo, Sum(a.Cubage) as Cubage, Isnull(Sum(a.ItemCaseQty),0) as CaseQty, c.CustName as CustomerName   \n";
            qry += ",C.Address+(Case When ISNULL(C.Address2,'')='' Then'' Else ', '+ C.Address2 End)+(Case When ISNULL(C.City,'')='' \n";
            qry += "Then'' Else ', '+ C.City End) as CustAddress\n";
            qry += ",c.ZoneCode as AlternateShipAgent, b.DeliveryDate from (select OrdItem.OrdNo, (select top 1 (Cubage / BaseQty) * OrdItem.Qty   \n";
            qry += "from UOM inner join Item on Item.ItemNo=UOM.ItemNo where Uom.ItemNo=OrdItem.ItemNo and Uom.Uom=Item.BulkUOM) as Cubage,    \n";
            qry += "(OrdItem.Qty / (select top 1 BaseQty    \n";
            qry += "from UOM inner join Item on Item.ItemNo=UOM.ItemNo  where Uom.ItemNo=OrdItem.ItemNo and Uom.Uom=Item.BulkUOM)) as ItemCaseQty from  OrdItem) a    \n";
            qry += "INNER JOIN OrderHdr b on a.OrdNo=b.OrdNo    \n";
            qry += "INNER JOIN Customer c on b.CustID = c.CustNo    \n";
            qry += "where b.DeliveryDate between ('" + deliverydate + " 00:00:00 " + "') and ('" + deliverydate + " 23:59:59 " + "') and (b.Void=0 or b.Void is null)  and b.CustID = c.CustNo  and  isnull(PickingStatus,0) < 8  and  b.OrdNo not in (select OrdNo from invoice where (Void = 0 or Void is null))";
            qry += "group by a.OrdNo, b.TotalAmt, c.SalesAgent, c.CustName, C.Address,C.Address2,C.City, c.ZoneCode,b.DeliveryDate,b.VehicleID   ";

        }

    }

    execute(qry);
    var selectData = executeQry;
    var tbodyId = '';
    for (var i = 0; i < vehicleData.length; i++) {
        tbodyId = vehicleData[i].Code.replace(/ /g, "");
        //$("#" + vehicleData[i].Code + "_" + i).empty();
        $("#" + tbodyId + "_" + i).empty();


        if (ProjectName.toLowerCase() == "wms" || ProjectName.toLowerCase() == "sej" || ProjectName.toLowerCase() == "laponie" || ProjectName.toLowerCase() == "wms-warehouse" || ProjectName.toLowerCase() == "lsh" || ProjectName.toLowerCase() == "wil" || ProjectName.toLowerCase() == "leonsynergy") {
            htm = "";
            htm += '<tr class="table' + i + '" style="z-index: 0;display:flex;" >';
            htm += '<th  style="width: 16%;;">Order No</th>';
            htm += '<th  style="width: 17%;;">City</th>';
            htm += '<th  style="width: 18%;;">Customer</th>';


            htm += '<th  style="width: 20%;">Address</th>';

            htm += '<th  style="width: 10%;;">Cubage</th>';
            htm += '<th  style="width: 10%;;">Case Qty</th>';
            htm += '<th  style="width: 18%;;">Amount</th>';
            htm += '</tr>';
        }
        else if (ProjectName.toLowerCase() == "poc" || ProjectName.toLowerCase() == "wms-lsh" || ProjectName.toLowerCase() == "unitrade" || ProjectName.toLowerCase() == "ywf" || ProjectName.toLowerCase() == "ricwil" || ProjectName.toLowerCase() == "sandl") {
            // COMMENTED UP AND DOWN MOVEMENT 20.11.2020
            htm = "";
            htm += '<tr class="table' + i + '" style="z-index: 0;display:flex;">';
            htm += '<th  style="width: 16%;;">Order No</th>';
            htm += '<th  style="width: 35%;;">Customer</th>';

            htm += '<th  style="width: 18%;;">Cubage</th>';
            htm += '<th  style="width: 12%;;">Case Qty</th>';
            htm += '<th  style="width: 18%;;">Amount</th>';
            htm += '</tr>';
        }
        else {
            htm = "";
            htm += '<tr class="table' + i + '" style="z-index: 0;display:flex;" >';
            htm += '<th  style="width: 16%;;">Order No</th>';
            htm += '<th  style="width: 17%;;">Territory</th>';
            htm += '<th  style="width: 18%;;">Customer</th>';

            htm += '<th  style="width: 18%;;">Cubage</th>';
            htm += '<th  style="width: 12%;;">Case Qty</th>';
            htm += '<th  style="width: 18%;;">Amount</th>';
            htm += '</tr>';
        }

        //  var territory = objSalesManTerritory[vehicleData[i].Code];
        var vehId = vehicleData[i].Code;

        var vehLength = vehicleData[i].Length == null ? 0 : vehicleData[i].Length;
        var vehHeight = vehicleData[i].Height == null ? 0 : vehicleData[i].Height;
        var vehWidth = vehicleData[i].Width == null ? 0 : vehicleData[i].Width;
        var fff0 = 0;
        for (var j = 0; j < selectData.length; j++) {
            if (vehId == selectData[j].VehicleID) {
                var cubage = selectData[j].Cubage == null ? "" : selectData[j].Cubage;

                if (ProjectName.toLowerCase() == "wms" || ProjectName.toLowerCase() == "sej" || ProjectName.toLowerCase() == "laponie" || ProjectName.toLowerCase() == "wms-warehouse" || ProjectName.toLowerCase() == "lsh" || ProjectName.toLowerCase() == "wil" || ProjectName.toLowerCase() == "leonsynergy") {
                    htm += '<tr class="table' + i + '" style="word-break:break-all;z-index: 0;display:flex;" >';
                    htm += '<td   style="width: 16%;">' + selectData[j].OrdNo + '</td>';
                    htm += '<td   style="width: 17%;">' + selectData[j].Territory + '</td>';
                    htm += '<td   style="width: 18%;">' + selectData[j].CustomerName + '</td>';

                    htm += '<td   style="width: 20%;">' + selectData[j].CustAddress + '</td>';

                    htm += '<td   style="width: 10%;">' + cubage + '</td>'; //+5
                    htm += '<td  style="width:  10%;">' + selectData[j].CaseQty + '</td>';
                    htm += '<td   style="width: 18%;">' + selectData[j].Amount + '</td>';
                    htm += '<td style="display: none">' + vehId + '</td>';
                    htm += '</tr>';
                }
                else if (ProjectName.toLowerCase() == "poc" || ProjectName.toLowerCase() == "wms-lsh" || ProjectName.toLowerCase() == "unitrade" || ProjectName.toLowerCase() == "ywf" || ProjectName.toLowerCase() == "ricwil" || ProjectName.toLowerCase() == "sandl" || ProjectName.toLowerCase() == "wil" || ProjectName.toLowerCase() == "leonsynergy") {
                    // COMMENTED UP AND DOWN MOVEMENT 20.11.2020
                    htm += '<tr class="table' + i + '" style="z-index: 0;display:flex;"  onclick="Row_Click_func(this)"  >';
                    htm += '<td   style="width: 16%;">' + selectData[j].OrdNo + '</td>';
                    htm += '<td   style="width: 35%;">' + selectData[j].CustomerName + '</td>';

                    htm += '<td   style="width: 18%;">' + cubage + '</td>'; //+5
                    htm += '<td  style="width:  12%;">' + selectData[j].CaseQty + '</td>';
                    htm += '<td   style="width: 18%;">' + selectData[j].Amount + '</td>';
                    htm += '<td style="display: none">' + vehId + '</td>';
                    htm += '</tr>';
                }
                else {
                    htm += '<tr class="table' + i + '" style="z-index: 0;display:flex;" >';
                    htm += '<td   style="width: 16%;">' + selectData[j].OrdNo + '</td>';
                    htm += '<td   style="width: 17%;">' + selectData[j].Territory + '</td>';
                    htm += '<td   style="width: 18%;">' + selectData[j].CustomerName + '</td>';

                    htm += '<td   style="width: 18%;">' + cubage + '</td>'; //+5
                    htm += '<td  style="width:  12%;">' + selectData[j].CaseQty + '</td>';
                    htm += '<td   style="width: 18%;">' + selectData[j].Amount + '</td>';
                    htm += '<td style="display: none">' + vehId + '</td>';
                    htm += '</tr>';
                }
            }
        }
        // $("#tbl" + i).append(htm);
        //$("#" + vehicleData[i].Code + "_" + i).append(htm);
        $("#" + tbodyId + "_" + i).append(htm);
        GetOrdNo(i, vehId);
        if (ordNo != "") {
            CalculateVehicles(i, ordNo, vehLength, vehHeight, vehWidth);
            ordNo = "";
        }
        else {
            $('#printbtnbackRoundColor' + i).css('background-color', 'green');
            $('#divbackRoundColor' + i).css('background-color', 'green');
            $('#div' + i).css('border-color', 'green');
        }
    }
}

function CalculateVehicles(i, ordNo, vehLength, vehHeight, vehWidth) {
    $.ajax({
        url: url_CalculateVehicles,
        type: 'POST',
        dataType: 'json',
        async: false,
        data: { sOrderNos: ordNo, vehLength: vehLength, vehWidth: vehHeight, vehHeight: vehWidth },
        success: function (results) {
            $('#printbtnbackRoundColor' + i).css('background-color', results);
            $('#divbackRoundColor' + i).css('background-color', results);
            $('#div' + i).css('border-color', results);
        },
        error: function (results, q, a) {
            alert(results);
        }
    });
}

function ExecuteInsertUpdateQuery(qry) {
    qry = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(qry), encryptkey, { keySize: 128 / 8, iv: encryptiv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    var params = "{'query':'" + qry + "'}";

    $.ajax({
        url: url_ExecuteInsertUpdateQuery,
        type: 'POST',
        //dataType: 'text',
        contentType: "application/json;charset=utf-8",
        async: false,
        //data: { query: qry },
        data: params,
        success: function (results) {
            return results;
        },
        error: function (results, q, a) {
            alert(results);
        }
    });
}

function NoRecordAlertMessage() {
    var btns = {};
    btns["Close"] = function (e) {
        $(this).dialog("close");
    }

    $('<div></div>').appendTo('body')
                    .html('<div><h6>There is no record to process</h6></div>').dialog({
                        modal: true, title: "No Record", zIndex: 10000, autoOpen: true,
                        width: 'auto', resizable: false,
                        buttons: btns
                    });
}

var ordNo = '';
function PrintPicking(i, vehNo) {

    ordNo = '';
    document.getElementById('info').innerHTML = "";
    var myTab = document.getElementById('table' + i);

    if (myTab.rows.length == 1) {
        NoRecordAlertMessage();
        return;
    }
    // LOOP THROUGH EACH ROW OF THE TABLE AFTER HEADER.
    for (i = 1; i < myTab.rows.length; i++) {

        // GET THE CELLS COLLECTION OF THE CURRENT ROW.
        var objCells = myTab.rows.item(i).cells;

        // LOOP THROUGH EACH CELL OF THE CURENT ROW TO READ CELL VALUES.
        // for (var j = 0; j < objCells.length; j++) {
        for (var j = 0; j < 1; j++) {
            //ordNo = ordNo == '' ? "''" + objCells.item(j).innerHTML + "''" : ordNo + ", ''" + objCells.item(j).innerHTML + "''";
            ordNo = ordNo == '' ? "'" + objCells.item(j).innerHTML + "'" : ordNo + ", '" + objCells.item(j).innerHTML + "'";
        }
        //info.innerHTML = info.innerHTML + '<br />';     // ADD A BREAK (TAG).
    }

    // COMMENTED 18.12.2020
    //if (ProjectName.toLowerCase() == "wms")
    //    window.open(url_WMSLoadPickingReport + "?strPrintPickingInvNo=" + ordNo + "&sRptName=PickingReport")
    //else
    //    window.open(url_LoadPickingReport + "?strPrintPickingInvNo=" + ordNo + "&sRptName=PickingReport")

    if (ProjectName.toLowerCase() == "wms" || ProjectName.toLowerCase() == "sej" || ProjectName.toLowerCase() == "laponie" || ProjectName.toLowerCase() == "wms-warehouse" || ProjectName.toLowerCase() == "pod" || ProjectName.toLowerCase() == "wil" || ProjectName.toLowerCase() == "leonsynergy") {
        window.open(url_WMSLoadPickingReport + "?strPrintPickingInvNo=" + ordNo + "&sRptName=PickingReport")
    }
    else {
        window.open(url_LoadPickingReport + "?strPrintPickingInvNo=" + ordNo + "&sRptName=PickingReport")
    }




}


function PrintPickingReport(ordNo) {
    window.open(url_WMSLoadPickingReport + "?strPrintPickingInvNo=" + ordNo + "&sRptName=PickingReport")
}
function GetOrdNo(i, vehNo) {
    ordNo = '';
    document.getElementById('info').innerHTML = "";
    var myTab = document.getElementById('table' + i);
    for (i = 1; i < myTab.rows.length; i++) {
        var objCells = myTab.rows.item(i).cells;
        for (var j = 0; j < 1; j++) {
            //ordNo  ordNo == '' ? "''" + objCells.item(j).innerHTML + "''" : ordNo + ", ''" + objCells.item(j).innerHTML + "''";
            ordNo = ordNo == '' ? "'" + objCells.item(j).innerHTML + "'" : ordNo + ", '" + objCells.item(j).innerHTML + "'";
        }
    }
}

function PrintPickingConsolidated(i, vehNo) {
    var ordNo = '';

    document.getElementById('info').innerHTML = "";
    var myTab = document.getElementById('table' + i);
    if (myTab.rows.length == 1) {
        NoRecordAlertMessage();
        return;
    }
    // LOOP THROUGH EACH ROW OF THE TABLE AFTER HEADER.
    for (i = 1; i < myTab.rows.length; i++) {

        // GET THE CELLS COLLECTION OF THE CURRENT ROW.
        var objCells = myTab.rows.item(i).cells;

        // LOOP THROUGH EACH CELL OF THE CURENT ROW TO READ CELL VALUES.
        // for (var j = 0; j < objCells.length; j++) {
        for (var j = 0; j < 1; j++) {
            ordNo = ordNo == '' ? "'" + objCells.item(j).innerHTML + "'" : ordNo + ", '" + objCells.item(j).innerHTML + "'";
        }
        //info.innerHTML = info.innerHTML + '<br />';     // ADD A BREAK (TAG).
    }
    if (ProjectName.toLowerCase() == "wms" || ProjectName.toLowerCase() == "sej" || ProjectName.toLowerCase() == "laponie" || ProjectName.toLowerCase() == "wms-warehouse" || ProjectName.toLowerCase() == "lsh" || ProjectName.toLowerCase() == "pod"
        || ProjectName.toLowerCase() == "pvm" || ProjectName.toLowerCase() == "dms" || ProjectName.toLowerCase() == "etika" || ProjectName.toLowerCase() == "ffb" || ProjectName.toLowerCase() == "wil" || ProjectName.toLowerCase() == "leonsynergy")
        // Separate Window
        window.open(url_LoadConsolidatedReport + "?strInvNo=" + ordNo + "&sRptName=ConsolidatedReport")
        //    window.location = url_LoadConsolidatedReport + "?strInvNo=" + ordNo + "&sRptName=ConsolidatedReport";
    else
        window.location = url_LoadConsolidatedReport + "?strInvNo=" + ordNo + "&sRptName=ConsolidatedReport";
    //  window.open(url_LoadConsolidatedReport1 + "?strInvNo=" + ordNo + "&sRptName=ConsolidatedReport");

}

function CreateInvoice1(i, vehNo) {
    ordNo = '';

    document.getElementById('info').innerHTML = "";
    var myTab = document.getElementById('table' + i);

    // LOOP THROUGH EACH ROW OF THE TABLE AFTER HEADER.
    for (i = 1; i < myTab.rows.length; i++) {
        // GET THE CELLS COLLECTION OF THE CURRENT ROW.
        var objCells = myTab.rows.item(i).cells;
        // LOOP THROUGH EACH CELL OF THE CURENT ROW TO READ CELL VALUES.
        // for (var j = 0; j < objCells.length; j++) {
        for (var j = 0; j < 1; j++) {
            ordNo = ordNo == '' ? "'" + objCells.item(j).innerHTML + "'" : ordNo + ", '" + objCells.item(j).innerHTML + "'";
        }
        //info.innerHTML = info.innerHTML + '<br />';     // ADD A BREAK (TAG).
    }

    //window.location = url_LoadConsolidatedReport + "?strInvNo=" + ordNo + "&sRptName=ConsolidatedReport";

    $.ajax({
        url: url_LoadInvoiceReport,
        type: 'POST',
        dataType: 'text',
        async: false,
        data: { strInvNo: ordNo, sRptName: "InvoiceReport" },
        success: function (results) {
            return results;
        },
        error: function (results, q, a) {
            alert(results);
        }
    });
}


function CreateInvoicePOC(ii, vehNo) {

    var ordNo = '';
    document.getElementById('info').innerHTML = "";
    var myTab = document.getElementById('table' + ii);
    var arrDoc = [];
    var ArrDoc = {};

    for (i = 1; i < myTab.rows.length; i++) {
        var objCells = myTab.rows.item(i).cells;
        for (var j = 0; j < 1; j++) {
            ordNo = ordNo == '' ? "'" + objCells.item(j).innerHTML + "'" : ordNo + ",'" + objCells.item(j).innerHTML + "'";

            ArrDoc = {};
            ArrDoc.Desc = "'" + objCells.item(j).innerHTML + "'";
            ArrDoc.Code = vehNo;
            ArrDoc.delidt = DateFormateChange_Format(_format, $('#DeliveryDate').val());// DateFormateChange($('#DeliveryDate').val());
            ArrDoc.sType = 'Create Invoice';
            ArrDoc.ordNo = ordNo;
            arrDoc.push(ArrDoc);
        }
    }


    arrDoc = JSON.stringify({ 'arrDoc': arrDoc });
    GetOrdNo(ii, vehNo);

    _LoadingImageOpen(ii);

    var calling_url;

    if (ProjectName.toLowerCase() == "poc" || ProjectName.toLowerCase() == "wms-lsh" || ProjectName.toLowerCase() == "unitrade" || ProjectName.toLowerCase() == "ywf" || ProjectName.toLowerCase() == "ricwil" || ProjectName.toLowerCase() == "sandl") {
        calling_url = url_printReport_POC;
    }
    else {
        calling_url = url_printReport;
    }

    $.ajax({
        url: calling_url,
        type: 'POST',

        data: arrDoc,
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (results) {
            _LoadingImageClose();
            if (results == 1) {
                // StockVarianceOpen();
                window.open(url_LoadStockVarianceReport);
            }
                //else if (results != "") {
            else {
                // window.location = url_CreateInvoiceReport + "?strInvNo=" + ordNo + "&sRptName=ConsolidatedReport";
                //GetVehicleList();

                GetVehicleData();
                //alert('Order Reassigned');
                showAlertMessage("Order Assignment", 'Order Reassigned');
                //window.open(url_CreateInvoiceReport + "?strInvNo=" + ordNo + "&sRptName=ConsolidatedReport");
            }
        },
        error: function (results, q, a) {
            alert(results);
            _LoadingImageClose();
        }
    });


}



function CreateInvoice(ii, vehNo) {

    var ordNo = '';
    document.getElementById('info').innerHTML = "";
    var myTab = document.getElementById('table' + ii);
    var arrDoc = [];
    var ArrDoc = {};

    for (i = 1; i < myTab.rows.length; i++) {
        var objCells = myTab.rows.item(i).cells;
        for (var j = 0; j < 1; j++) {
            ordNo = ordNo == '' ? "'" + objCells.item(j).innerHTML + "'" : ordNo + ",'" + objCells.item(j).innerHTML + "'";

            ArrDoc = {};
            ArrDoc.Desc = "'" + objCells.item(j).innerHTML + "'";
            ArrDoc.Code = vehNo;
            ArrDoc.delidt = DateFormateChange_Format(_format, $('#DeliveryDate').val());//DateFormateChange($('#DeliveryDate').val());
            ArrDoc.sType = 'Create Invoice';
            ArrDoc.ordNo = ordNo;
            arrDoc.push(ArrDoc);
        }
    }


    arrDoc = JSON.stringify({ 'arrDoc': arrDoc });
    GetOrdNo(ii, vehNo);

    _LoadingImageOpen(ii);

    var calling_url;

    if (ProjectName.toLowerCase() == "poc" || ProjectName.toLowerCase() == "wms-lsh" || ProjectName.toLowerCase() == "unitrade" || ProjectName.toLowerCase() == "ywf" || ProjectName.toLowerCase() == "ricwil" || ProjectName.toLowerCase() == "sandl") {
        calling_url = url_printReport_POC;
    }
    else {
        calling_url = url_printReport;
    }

    $.ajax({
        url: calling_url,
        type: 'POST',

        data: arrDoc,
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (results) {
            _LoadingImageClose();
            if (results == 1) {
                // StockVarianceOpen();
                window.open(url_LoadStockVarianceReport);
            }
                //else if (results != "") {
            else {
                // window.location = url_CreateInvoiceReport + "?strInvNo=" + ordNo + "&sRptName=ConsolidatedReport";
                //GetVehicleList();

                GetVehicleData();
                window.open(url_CreateInvoiceReport + "?strInvNo=" + ordNo + "&sRptName=ConsolidatedReport");
            }
        },
        error: function (results, q, a) {
            alert(results);
            LoadingImageClose();
        }
    });


}

var arrDoc = [];
var arrDocJsu = [];
var _ordNo = '';

function CreateInvoiceJSU(ii, vehNo) {
    //debugger;
    var ordNo = '';
    arrDoc = [];
    document.getElementById('info').innerHTML = "";
    var myTab = document.getElementById('table' + ii);
    var ArrDoc = {};

    _LoadingImageOpen(ii);
    for (i = 1; i < myTab.rows.length; i++) {
        var objCells = myTab.rows.item(i).cells;
        for (var j = 0; j < 1; j++) {
            ordNo = ordNo == '' ? "'" + objCells.item(j).innerHTML + "'" : ordNo + ",'" + objCells.item(j).innerHTML + "'";

            ArrDoc = {};
            ArrDoc.Desc = "'" + objCells.item(j).innerHTML + "'";
            ArrDoc.Code = vehNo;
            ArrDoc.delidt = DateFormateChange_Format(_format, $('#DeliveryDate').val());//DateFormateChange($('#DeliveryDate').val());
            ArrDoc.sType = 'Create Invoice';
            ArrDoc.ordNo = ordNo;
            arrDoc.push(ArrDoc);
        }
    }
    _ordNo = ordNo;
    arrDocJsu = arrDoc;
    arrDoc = JSON.stringify({ 'arrDoc': arrDoc });

    GetOrdNo(ii, vehNo);

    $.ajax({
        url: url_printReportJSU,
        type: 'POST',

        data: arrDoc,
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (results) {
            _LoadingImageClose();
            if (results == 1) {
                // StockVarianceOpen();
                window.open(url_LoadStockVarianceReport);
            }
                //else if (results != "") {
            else {

                //   ordNo = 'S2O00033';
                //  PrintPopUpOpen('S2O00033');

                GetVehicleData();
                //window.open(url_CreateInvoiceReport + "?strInvNo=" + ordNo + "&sRptName=ConsolidatedReport");
                _LoadingImageClose();
                InvoicePrint(ordNo);
            }
        },
        error: function (results, q, a) {
            alert(results);
            _LoadingImageClose();
        }
    });
}


function CreateInvoicePVM(ii, vehNo) {
    //debugger;
    var ordNo = '';
    arrDoc = [];
    document.getElementById('info').innerHTML = "";
    var myTab = document.getElementById('table' + ii);
    if (myTab.rows.length == 1) {
        NoRecordAlertMessage();
        return;
    }
    var ArrDoc = {};

    _LoadingImageOpen(ii);
    for (i = 1; i < myTab.rows.length; i++) {
        var objCells = myTab.rows.item(i).cells;
        for (var j = 0; j < 1; j++) {
            ordNo = ordNo == '' ? "'" + objCells.item(j).innerHTML + "'" : ordNo + ",'" + objCells.item(j).innerHTML + "'";

            ArrDoc = {};
            ArrDoc.Desc = "'" + objCells.item(j).innerHTML + "'";
            ArrDoc.Code = vehNo;
            ArrDoc.delidt = DateFormateChange_Format(_format, $('#DeliveryDate').val());//DateFormateChange($('#DeliveryDate').val());
            ArrDoc.sType = 'Create Invoice';
            ArrDoc.ordNo = ordNo;
            arrDoc.push(ArrDoc);
        }
    }
    _ordNo = ordNo;
    arrDocJsu = arrDoc;
    arrDoc = JSON.stringify({ 'arrDoc': arrDoc });

    GetOrdNo(ii, vehNo);

    var _url = ProjectName.toLowerCase() == "etika" ? url_printReportEtika : url_printReportPVM;
    $.ajax({
        //url: url_printReportPVM,
        url: _url,
        type: 'POST',
        data: arrDoc,
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (results) {
            // upto this check ====
            _LoadingImageClose();
            if (results == 1) {
                // StockVarianceOpen();
                //window.open(url_LoadStockVarianceReport);
                window.open(url_LoadStockVarianceReport_PVM);
            }
            else {

                GetVehicleData();
                _LoadingImageClose();

                // GO TO INVOICE PRINT =================
                //InvoicePrint(ordNo);
                //window.open(url_CreateInvoiceReportPVM + "?strInvNo=" + strOrdNo + "&sRptName=ConsolidatedReport");
                window.open(url_CreateInvoiceReportPVM + "?strInvNo=" + ordNo + "&sRptName=ConsolidatedReport");
            }
        },
        error: function (results, q, a) {
            alert(results);
            _LoadingImageClose();
        }
    });
}

function PrintOrderList(i, vehNo) {
    ordNo = '';
    document.getElementById('info').innerHTML = "";
    var myTab = document.getElementById('table' + i);

    if (myTab.rows.length == 1) {
        NoRecordAlertMessage();
        return;
    }

    var initReport = "select 1 as A";
    var reportName = "Select 'SalesOrderSummaryRep' as ReportName";
    var dt = DateFormateChange_Format(_format, $('#DeliveryDate').val());
    var loadReport = "Exec [dbo].[VehicleAssignment_DailyOrderSummary] '" + dt + "','" + vehNo + "','','" + _UserID + "'";

    window.open(url_ReportsView1 + "?InitReport=" + initReport + "&ReportName=" + reportName + "&LoadReport=" + loadReport);
}
//ReportViewA
function _LoadingImageClose() {
    $("#LoadingImg").empty();
    $('#LoadingImg').fadeOut();

}

function _LoadingImageOpen(ii) {
    try {

        var htm = '<img src="../Images/ajax-loader(4).gif"  style="margin-left: 15px;"/>'
        htm += '<br>';
        htm += 'Please wait...';
        $("#LoadingImg").append(htm)

        $('#LoadingImg').fadeIn();

    } catch (e) {
        alert(e);
    }

}



var arrDocIncCnt = 0

function InvoicePrint(strOrdNo) {
    arrDocIncCnt = 0;
    PrintPopUpOpen(arrDocJsu[arrDocIncCnt].ordNo, strOrdNo);
}

function PrintPopUpOpen(ordNo, strOrdNo) {

    var btns = {};
    btns["Print"] = function (e) {
        // e.preventDefault();
        $(this).dialog("close");
        GetInvoiceReportCnt(ordNo)
    }

    btns["Cancel"] = function (e) {
        $(this).dialog("close");
        window.open(url_CreateInvoiceReportJSU + "?strInvNo=" + strOrdNo + "&sRptName=ConsolidatedReport");

    }

    $('<div></div>').appendTo('body')
                            .html("Do you want to print the invoice(s)?").dialog({
                                modal: true, title: "", zIndex: 10000, autoOpen: true,
                                width: '25%', resizable: false,
                                buttons: btns
                            });
}
var reportCnt = 0;
function GetInvoiceReportCnt(ordNo) {
    //  var qry = "select InvNo,InvDt,CustId,CustName from Invoice I  inner join customer C on I.CustId = C.CustNo where OrdNo in('" + ordNo + "')";
    //var qry = "select InvNo,InvDt,CustId,CustName,Prefix from Invoice I  inner join customer C on I.CustId = C.CustNo inner join Salesagent S on S.Code=I.AgentID inner join Nodetree N on N.salesmanTerritory=S.Nodetreevalue inner join NoSeries NS on NS.MDTNO=N.SalesOfficeID where OrdNo in(" + ordNo + ")";
    var qry = "select InvNo,InvDt,CustId,CustName,dbo.[fnGetPrefixfromBIR](I.InvNo) as Prefix from Invoice I  inner join customer C on I.CustId = C.CustNo where OrdNo in(" + ordNo + ")";
    execute(qry);

    // window.open(url_CreateInvoiceReport + "?strInvNo=" + ordNo + "&sRptName=ConsolidatedReport");
    $.ajax({
        // url: url_CreateInvoiceReport,
        url: url_GetInvoiceReportCount,
        // url: "../VehicleAssignment/GetInvoiceReportCountOne/",
        type: 'POST',
        data: { strInvNo: executeQry[0].InvNo, sRptName: 'ConsolidatedReport' },
        //contentType: 'application/json; charset=utf-8',
        dataType: "json",
        async: false,
        success: function (results) {
            // alert(results);
            reportCnt = results;
            //  alert(results);
        },
        error: function (results, q, a) {
            // debugger;
            LoadingImageClose();
        }
    });


    OpenPopUpTable(executeQry, reportCnt);

}


function OpenPopUpTable(data, rptCnt) {
    var htm = '';
    //htm = '<form class="form-inline" >';
    htm += '<div class="form-group">';
    htm += '<label style="width:35%">Invoice No </label>';
    htm += data[0].InvNo;
    htm += '</div>';

    htm += '<div class="form-group">';
    htm += '<label  style="width:35%">Invoice Date </label>';
    htm += data[0].InvDt;
    htm += '</div>';

    htm += '<div class="form-group">';
    htm += '<label  style="width:35%">Customer Id </label>';
    htm += data[0].CustId;
    htm += '</div>';
    htm += '<div class="form-group">';
    htm += '<label  style="width:35%">Customer Name </label>';
    htm += data[0].CustName;
    htm += '</div>';
    htm += '<div class="form-group">';
    htm += '<label  style="width:35%">No Of Pages </label>';
    htm += rptCnt;
    htm += '</div>';
    ///
    var qry = "select dbo.[GenBIRValidateDevOne]('" + data[0].InvNo + "') as BIRNo";
    //var qry = "select dbo.[GenBIRValidate]('" + rptCnt + "','" + data[0].InvNo + "') as BIRNo"
    execute(qry);
    ///
    htm += '<div class="form-group form-inline">';
    htm += '<label  style="width:35%">BIR No </label>';

    // htm += '<label  style="width:10%">' + data[0].Prefix + '</label>';
    htm += '<input  style="width:10%" id="BIRNoPrefix"  readonly="true"  class="form-control"  value="' + data[0].Prefix + '"  >';
    htm += '<input  style="width:50%" id="BIRNo" readonly="true" class="form-control"  value="' + executeQry[0].BIRNo + '"  >';
    htm += '</div>';
    //  htm += '</form>';
    var btns = {};
    btns["Ok"] = function (e) {
        BIRValidate(this, data[0].InvNo, rptCnt, data[0].Prefix);
        //$(this).dialog("close");
    }
    btns["Change"] = function (e) {
        $('#BIRNo').removeAttr("readonly");
        $('#BIRNoPrefix').removeAttr("readonly");
    }

    btns["Cancel"] = function (e) {
        $(this).dialog("close");
    }
    var htmTitle = '<div style="display: inline-block;float:left;">Inv No - ' + data[0].InvNo + ' </div>  <div style="float: right;margin-left: 260px;">' + (arrDocIncCnt + 1) + ' - ' + arrDoc.length + ' </div> ';

    $('#InvoiceDetailsId').remove();
    $('<div id="InvoiceDetailsId"></div>').appendTo('body')
                            .html(htm).dialog({
                                modal: true, title: htmTitle, zIndex: 10000, autoOpen: true,
                                //  modal: true, title: "Inv No -" + data[0].InvNo + "          " + (arrDocIncCnt + 1) + " - " + arrDoc.length + "", zIndex: 10000, autoOpen: true,
                                width: '35%', resizable: false,
                                buttons: btns
                            });
}

function BIRValidate(closeId, invNo, rptCnt, birPrefix) {
    var birNo = $('#BIRNo').val();
    var bIRNoPrefix = $('#BIRNoPrefix').val();
    var qry = "select [dbo].[FnBIRValidateRevVA]('" + bIRNoPrefix + "','" + birNo + "','" + invNo + "','" + rptCnt + "') as Message";
    // var qry = "select [dbo].[FnBIRValidate]('" + birNo + "','" + invNo + "') as Message";
    execute(qry);

    if (executeQry[0].Message.toLowerCase() == 'valid') {
        var qry = "select dbo.[FnBIRProcRev] ('" + bIRNoPrefix + "','" + birNo + "','" + invNo + "','" + rptCnt + "') as Message";
        execute(qry);
        var birNoOne = birNo;
        birNo = executeQry[0].Message;
        var qry = "Update Invoice set BIRNO='" + birNo + "', BIRNoDamaged=Case When ISNULL(BIRNODamaged,'')='' Then '" + birNo + "' Else Case When ISNULL('" + birNo + "','')='' Then BIRNODamaged Else BIRNODamaged+','+'" + birNo + "' End End Where InvNo='" + invNo + "'";
        execute(qry);
        var qry = "Exec [UpdateLastInvNo] '" + bIRNoPrefix + "','" + birNoOne + "','" + invNo + "'";
        execute(qry);

        var qry = "Update InvoiceReport_" + _UserID + " set BIRNO='" + birNo + "'  Where  InvNo='*" + invNo + "*'";
        execute(qry);
        $(closeId).dialog("close");

        arrDocIncCnt++;
        if (arrDocJsu.length > arrDocIncCnt)
            GetInvoiceReportCnt(arrDocJsu[arrDocIncCnt].ordNo);
        else {
            //GetVehicleData();
            // ordNo = "'S2O00033', 'S2O00035'";
            GetVehicleData();
            window.open(url_CreateInvoiceReportJSU + "?strInvNo=" + _ordNo + "&sRptName=ConsolidatedReport");
        }

    }
    else {
        //   $(closeId).dialog("close");
        showAlertMessage("", executeQry[0].Message);

    }

}

function showAlertMessage(title, message) {
    var btns = {};
    btns["Ok"] = function (e) {
        $(this).dialog("close");
    }
    $('<div></div>').appendTo('body')
        .html(message).dialog({
            modal: true, title: title, zIndex: 10000, autoOpen: true,
            width: '35%', resizable: false,
            buttons: btns
        });
}
function CreateManifest(ii, vehNo) {
    //debugger;
    var ordNo = '';
    document.getElementById('info').innerHTML = "";
    var myTab = document.getElementById('table' + ii);
    var arrDoc = [];
    var temp_arrDoc = [];
    var ArrDoc = {};
    if (myTab.rows.length == 1) {
        NoRecordAlertMessage();
        return;
    }
    for (i = 1; i < myTab.rows.length; i++) {
        var objCells = myTab.rows.item(i).cells;
        for (var j = 0; j < 1; j++) {
            ordNo = ordNo == '' ? "'" + objCells.item(j).innerHTML + "'" : ordNo + ",'" + objCells.item(j).innerHTML + "'";

            ArrDoc = {};
            ArrDoc.Desc = "'" + objCells.item(j).innerHTML + "'";  //objCells.item(j).innerHTML
            ArrDoc.Code = vehNo;
            ArrDoc.delidt = DateFormateChange_Format(_format, $('#DeliveryDate').val());//DateFormateChange($('#DeliveryDate').val());
            ArrDoc.sType = 'Create Manifest';
            ArrDoc.ordNo = ordNo;
            arrDoc.push(ArrDoc);
        }
    }

    temp_arrDoc = arrDoc;

    arrDoc = JSON.stringify({ 'arrDoc': arrDoc });
    GetOrdNo(ii, vehNo);
    _LoadingImageOpen(ii);
    $.ajax({
        url: url_GetCreateManifest,
        type: 'POST',


        data: arrDoc,
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (results) {
            showAlertMessage("Manifest Create", "Manifest Created Successfully!");

            //// Update Line Number for Device Purpose ==========================================
            //// COMMENTED 22.12.2020 NEED LATER 
            if (ProjectName.toLowerCase() == "pod") {

                for (var line = 0 ; line < temp_arrDoc.length; line++) {
                    var lno = '';
                    var strOrdNo = temp_arrDoc[line].Desc.toString().toUpperCase();
                    strOrdNo = strOrdNo.substring(1, strOrdNo.length - 1);
                    for (var j = 0; j < sorted_Customer_List.length; j++) {

                        if (strOrdNo != null && strOrdNo == sorted_Customer_List[j].OrdNo.toString().toUpperCase()) {
                            lno = sorted_Customer_List[j].LineNumber.toString();
                            break;
                        }
                    }

                    qry = "Update svcordhdr set linenumber=" + lno + " where OrdNo='" + strOrdNo + "'";
                    ExecuteInsertUpdateQuery(qry);
                }
            }
            //// Update Line Number for Device Purpose ==========================================

            _LoadingImageClose();
            GetVehicleData();

        },
        error: function (results, q, a) {
            alert(results);
            _LoadingImageClose();
        }
    });
}

function StockVarianceOpen() {
    var htm = '';
    htm += '<table id="table" style="font-size:0.6em" class="table table-striped table-bordered tableId">';
    htm += '<thead id="ListPopUpHeadDivId">';
    htm += '</thead>';
    htm += '<th>Location</th>';
    htm += '<th> Item No </th>';
    htm += '<th> Item Name </th>';
    htm += '<th> Ordered Qty(Bulk) </th>';
    htm += '<th> Ordered Qty(Loose) </th>';
    htm += '<th> Inventory (Bulk) </th>';
    htm += '<th> Inventory (Loose) </th>';
    htm += '<th> Variance (Bulk) </th>';
    htm += '<th> Variance (Loose) </th>';
    htm += '<tbody id="ListPopUpBodyDivId">';
    htm += '</tbody>';
    htm += '<tfoot id="ListPopUpfootDivId">';
    htm += '</tfoot>';
    htm += '</table>';
    $('#popupdialog').html(htm);


    var qry = "select ItemNo,Description,BaseUOM AS UOM,Qty,OrdBulkUOm as BulkUOM,OrdBulkQty as BulkQty,OrdLooseUOM as LooseUOM,OrdLooseQty as LooseQty,InvUOM,InvQty,InvBulkUOM,InvBulkQty,InvLooseUOM,InvLooseQty,VarUOM,VarQty,VarBulkUOM,VarBulkQty,VarLooseUOM,VarLooseQty,Location from InvReport order by CustName";
    execute(qry);
    executeQry
    htm = '';
    for (var i = 0; i < executeQry.length; i++) {
        htm += '<tr >';
        htm += '<td>' + executeQry[i].Location + '</td>';
        htm += '<td>' + executeQry[i].ItemNo + '</td>';
        htm += '<td>' + executeQry[i].Description + '</td>';
        htm += '<td>' + (executeQry[i].BulkQty == null ? 0 : executeQry[i].BulkQty) + '</td>';
        htm += '<td>' + (executeQry[i].LooseQty == null ? 0 : executeQry[i].LooseQty) + '</td>';
        htm += '<td>' + (executeQry[i].InvBulkQty == null ? 0 : executeQry[i].InvBulkQty) + '</td>';
        htm += '<td>' + (executeQry[i].InvLooseQty == null ? 0 : executeQry[i].InvLooseQty) + '</td>';
        htm += '<td>' + (executeQry[i].VarBulkQty == null ? 0 : executeQry[i].VarBulkQty) + '</td>';
        htm += '<td>' + (executeQry[i].VarLooseQty == null ? 0 : executeQry[i].VarLooseQty) + '</td>';
        htm += '</tr >';
    }
    $('#ListPopUpBodyDivId').html(htm);

    $('#popupdialog').dialog({
        //autoOpen: false,
        width: "90%",
        //resizable: false,
        title: 'Stock Variance',
        modal: true,
        closeOnEscape: false,
        buttons: {
            "Export": function () {
                $('#popupdialog').dialog('close');
                //  $("#savePath").trigger("click");
                StockVarianceCreateExcel("");
                $('#popupdialog').dialog('open');

            },
            "Close": function () {
                $('#popupdialog').dialog('close');
            }
        }
    });

}


$('#savePath').change(function (event) {
    var path = $('#savePath').val();
    StockVarianceCreateExcel(path);
});


function StockVarianceCreateExcel(path) {

    $.ajax({
        dataType: 'json',
        type: 'POST',
        url: url_StockVarianceCreateExcel,
        data: { Path: path },
        success: function (data) {
            alert(data);
            //   alert("success");
        },
        failure: function (response) {
            alert(response);
            $('#result').html(response);
        },
        error: function (response, a, b) {

            alert(response);
            //console.log(response);
        }
    });
}

$(document).ready(function () {

    $('input[type=file]').change(function (a) {

    })
})


function VehiclAssignmentExecute(qry) {
    LoadingImageOpen();
    if (qry != "") {
        qry = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(qry), encryptkey, { keySize: 128 / 8, iv: encryptiv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
        var params = "{'query':'" + qry + "'}";
        $.ajax({
            type: "POST",
            url: url_GetActionConfigData,
            data: params,
            contentType: "application/json;charset=utf-8",
            // dataType: "json",
            async: true,
            success: function (results) {
                executeStringQry = results;
                executeQry = $.parseJSON(results);
                LoadingImageClose();
                return results;
            },
            error: function (results, q, a) {
            }

        });
    }
}


if (ProjectName.toLowerCase() == "sej")
    GetVADropDownValue();
function GetVADropDownValue() {
    //var qry1 = "select 1 as Code,'AAA' as Text   union select 2 as Code,'BBB' as Text ";
    var qry = "Select 'ALL' as Code,'ALL' as Text,0 as DisplayNo union select Distinct LotPrefix as Code,LotPrefix as Text, 1 as DisplayNo  from Item where LotPrefix <> '' ";
    execute(qry);
    var data = executeQry;
    if (data != null) {
        var valueText = '';
        $.each(data, function (j, data) {
            valueText += "<option value='" + data.Code + "'>" + data.Text + "</option>";
        });
        $(valueText).appendTo('#CategoryId');
    }
}

var executeStringQry = '';


function GetOrdNoandQty(qry1) {
    execute(qry1);

    $('#VHQty').val(executeQry[0].Column1);
    $('#VHOrdNo').val(executeQry[0].Column2);
    //$('#VHQty').val(executeQry[0].VHQty);
    //$('#VHOrdNo').val(executeQry[0].VHOrdNo);
}


var lastSelectedtdRowId = "";
function OrdNoSearch() {
    var ordno = $('#OrdNoSearch').val();
    if (ordno != "") {
        var tdRowId = "tdRow_" + ordno.toLowerCase();
        if (lastSelectedtdRowId != "")
            $('#' + lastSelectedtdRowId).css({ "background-color": "" });
        $('#' + tdRowId).css({ "background-color": "darkseagreen" });
        lastSelectedtdRowId = tdRowId;
        if ($("#" + tdRowId)[0] != undefined) $("#" + tdRowId)[0].scrollIntoView();
    }

}