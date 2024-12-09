var map;
var marker;

function setMapOnAll(map) {
    marker.setMap(null);
}
function clearMarkers() {
    setMapOnAll(null);
}
function initMapMarker() {
    try {
        var latLon = { lat: 14.5995, lng: 120.9842 };//manila
        map = new google.maps.Map(
          document.getElementById('map'), { zoom: 10, center: latLon });
        marker = new google.maps.Marker({
            position: latLon,
            //icon: "http://localhost:52063/Images/simplrTruck.png",
            map: map
        });
        var _obj = {};
        if (mapTimer != "") {
            setInterval(function () {
                // PerformAction('timerEventRun', _obj);
                _obj = {};
                _obj.fieldName = "SubmitBtn";
                PerformAction('formButtonClicked', _obj);
            }, mapTimer * 1000);
            //}, mapTimer * 100);
        }
        SetMapMarker('default');
    } catch (e) {
        //alert("initMapMarker - " + e);
    }
}
function MapMarkerDrawCircle() {
    var citymap = {
        circuledraw: {
            center: { lat: executeQry[0].Latitude, lng: executeQry[0].Longitude },
        }
    };
    var radius = parseInt(executeQry[0].Radius);

    var cityCircle = new google.maps.Circle({
        strokeColor: '#2271cce7',
        fillColor: '#2271cce7',
        map: map,
        // center: circuledraw,// citymap[city].center,
        center: citymap.circuledraw.center,
        radius: Math.sqrt(radius) * 1609.34//Math.sqrt(citymap[city].population) * 1609.34
        //radius: Math.sqrt(citymap[city].population) * 100
    });
}

function SetMapMarker_reference(action) {
    debugger;
    //  var sScreenName = "MapPickerForm_MapPicker";
    if (action == 'default') {
        var sScreenName = currentScreenName + "_MapPicker";
        var qry = getString['QueryConfig_' + sScreenName];
        qry += ' ' + getString['QueryConfig_' + sScreenName + '_GroupText'];
        qry += ' ' + getString['QueryConfig_' + sScreenName + '_OrderText'];
        // var qry = "SELECT 'green' as Color,'14.8474867' as Latitude,'120.8238718' as Longitude , 'Test1' as Remarks,'1' as MarkerNo, 'AAA' as MarkerName Union SELECT 'red' as Color,'14.2952706' as Latitude,'120.9176947' as Longitude , 'Test2' as Remarks,'2' as MarkerNo, 'bbb' as MarkerName Union SELECT 'yellow' as Color,'14.9692139' as Latitude,'120.9188296' as Longitude , 'Test3' as Remarks,'3' as MarkerNo, 'ccc' as MarkerName  Union SELECT 'green' as Color,'13.936684' as Latitude,'121.1564816' as Longitude , 'Test4' as Remarks,'4' as MarkerNo, 'ddd' as MarkerName Union SELECT 'red' as Color,'14.5860298' as Latitude,'121.0641453' as Longitude , 'Test5' as Remarks,'5' as MarkerNo, 'eee' as MarkerName Union SELECT 'yellow' as Color,'14.9924004' as Latitude,'120.6326731' as Longitude , 'Test6' as Remarks,'6' as MarkerNo, 'fff' as MarkerName Union SELECT 'green' as Color,'1.2851138' as Latitude,'103.8113694' as Longitude , 'Test7' as Remarks,'7' as MarkerNo, 'ggg' as MarkerName ";
        qry = formatQueryString(qry, sScreenName);
        alert(qry);
        execute(qry);
    }
    var myLatLng = '';
    var infowindow = '';
    var contentString = '';
    var contentString1 = '';



    if (executeQry.length >= 1) {
        var latLon = { lat: parseFloat(executeQry[0].Latitude), lng: parseFloat(executeQry[0].Longitude) };
        //var latLon = { lat: parseFloat(executeQry[4].Latitude), lng: parseFloat(executeQry[4].Longitude) };
        map = new google.maps.Map(document.getElementById('map'), { zoom: 10, center: latLon });
        marker = new google.maps.Marker({ position: latLon, map: map });
    }
    clearMarkers();
    var scaledSize = new google.maps.Size(30, 30);

    for (var i = 0; i < executeQry.length; i++) {

        myLatLng = { lat: parseFloat(executeQry[i].Latitude), lng: parseFloat(executeQry[i].Longitude) };
        var iconUrl = "http://maps.google.com/mapfiles/ms/icons/" + executeQry[i].Color + ".png";
        //iconUrl += executeQry[i].Color + "-dot.png";
        scaledSize = new google.maps.Size(50, 50);
        if (executeQry[i].ICON == "CUSTOMER") {
            iconUrl = "../Images/MapIcons/Customers.png";
            scaledSize = new google.maps.Size(30, 30);
        }
        else if (executeQry[i].ICON == "SALESAGENT") {
            iconUrl = "../Images/MapIcons/SalesPerson.png";
            scaledSize = new google.maps.Size(30, 30);
        }

        new MarkerWithLabel({
            position: myLatLng,
            map: map,
            icon: {
                // url: "../Images/MapIcons/Customers.png",
                //url: "http://maps.google.com/mapfiles/ms/icons/truck.png",
                url: iconUrl,
                // scaledSize: new google.maps.Size(50, 50),
                scaledSize: scaledSize,
            },
            labelContent: executeQry[i].MarkerName,
            labelAnchor: new google.maps.Point(38, -3),
            // the CSS class for the label
            labelClass: "label  " + executeQry[i].Color,
            labelInBackground: true
        });


        marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            label: executeQry[i].MarkerNo == null ? "" : executeQry[i].MarkerNo.toString(),
            icon: {
                url: iconUrl,
                // scaledSize: new google.maps.Size(50, 50),
                scaledSize: scaledSize,
                // labelOrigin: { x: 25, y: 15 }
                labelOrigin: { x: 24, y: 16 }
            },
            //optimized: false,
        });

        contentString = '<div id="content">' +
                 '<div id="siteNotice">' +
                 '</div>' +
                 '<div id="bodyContent">' +
                 '<p><b>Remarks :</b> ' +
                 executeQry[i].Remarks + ' ' +
                 '</div>' +
                 '</div>';

        contentString1 = executeQry[i].CustNo;

        var infowindow = new google.maps.InfoWindow({
            content: contentString,
        });
        debugger;

        if ((ProjectName.toLowerCase() == "lite" || ProjectName.toLowerCase() == "khind" || ProjectName.toLowerCase() == "frostfood") &&
            (currentScreenName.toString().toLowerCase() == "customerroutingctrform" ||
            currentScreenName.toString().toLowerCase() == "customerroutingctranalysisform" ||
            currentScreenName.toString().toLowerCase() == "customerroutingmappickeraddform" ||
                currentScreenName.toString().toLowerCase() == "customerroutingmappickerremoveform")) {
            google.maps.event.addListener(marker, 'click', (function (marker, contentString1, infowindow) {
                return function () {
                    Marker_Popup_Calling("CustomerRoutingMapPickerForm", contentString1);
                };
            })(marker, contentString1, infowindow));
        }
        else {
            google.maps.event.addListener(marker, 'click', (function (marker, contentString, infowindow) {
                return function () {
                    infowindow.open(map, marker);
                };
            })(marker, contentString, infowindow));
        }
    }
}

var myLatLng = '';
var locations = [];
//async function initMap() {
////    // Request needed libraries.
//    const { Map, InfoWindow } = await google.maps.importLibrary("maps");
////    const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary(
////        "marker",
////    );
//    const map = new google.maps.Map(document.getElementById("map"), {
//        zoom: 3,
//        center: { lat: -28.024, lng: 140.887 },
//        mapId: "DEMO_MAP_ID",
//    });
//    const infoWindow = new google.maps.InfoWindow({
//        content: "",
//        disableAutoPan: true,
//    });
//    // Create an array of alphabetical characters used to label the markers.
//    const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
//    // Add some markers to the map.
//    const markers = locations.map((position, i) => {
//        const label = labels[i % labels.length];
//        const pinGlyph = new google.maps.marker.PinElement({
//            glyph: label,
//            glyphColor: "white",
//        });
//        const marker = new google.maps.marker.AdvancedMarkerElement({
//            position,
//            content: pinGlyph.element,
//        });

//        // markers can only be keyboard focusable when they have click listeners
//        // open info window when marker is clicked
//        marker.addListener("click", () => {
//            infoWindow.setContent(position.lat + ", " + position.lng);
//            infoWindow.open(map, marker);
//        });
//        return marker;
//    });

//    // Add a marker clusterer to manage the markers.
//    new MarkerClusterer({ markers, map });
//}

function SetMapMarker(action) {
    //  var sScreenName = "MapPickerForm_MapPicker";
    if (action == 'default') {
        var sScreenName = currentScreenName + "_MapPicker";
        var qry = getString['QueryConfig_' + sScreenName];
        qry += ' ' + getString['QueryConfig_' + sScreenName + '_GroupText'];
        qry += ' ' + getString['QueryConfig_' + sScreenName + '_OrderText'];
        //var qry = "SELECT 'green' as Color,'14.8474867' as Latitude,'120.8238718' as Longitude , 'Test1' as Remarks,'1' as MarkerNo, 'AAA' as MarkerName Union SELECT 'red' as Color,'14.2952706' as Latitude,'120.9176947' as Longitude , 'Test2' as Remarks,'2' as MarkerNo, 'bbb' as MarkerName Union SELECT 'yellow' as Color,'14.9692139' as Latitude,'120.9188296' as Longitude , 'Test3' as Remarks,'3' as MarkerNo, 'ccc' as MarkerName  Union SELECT 'green' as Color,'13.936684' as Latitude,'121.1564816' as Longitude , 'Test4' as Remarks,'4' as MarkerNo, 'ddd' as MarkerName Union SELECT 'red' as Color,'14.5860298' as Latitude,'121.0641453' as Longitude , 'Test5' as Remarks,'5' as MarkerNo, 'eee' as MarkerName Union SELECT 'yellow' as Color,'14.9924004' as Latitude,'120.6326731' as Longitude , 'Test6' as Remarks,'6' as MarkerNo, 'fff' as MarkerName Union SELECT 'green' as Color,'1.2851138' as Latitude,'103.8113694' as Longitude , 'Test7' as Remarks,'7' as MarkerNo, 'ggg' as MarkerName ";
        //qry = "select  'CUSTOMER' as ICON, 'yellow' as Color,CustNo+' - '+CustName as Remarks,'Customer No :'+CustNo as MarkerName,1 as MarkerNo,Latitude,Longitude From Customer Where CustNo='' union Select distinct 'PIN' as ICON,Case When DateDiff(MINUTE  ,CustVisit.TransDate,GetDate())<=30 Then 'green' Else 'green' End as Color, CustVisit.AgentID+' - ' +SalesAgent.Name as Remarks, 'AgentID : '+ MDT.VehicleID as MarkerName, Row_NUMBER() Over(Order by CustVisit.AgentID)+1 as MarkerNo, CustVisit.Latitude, CustVisit.Longitude from CustVisit inner join MDT on MDT.agentID=CustVisit.AgentID inner join SalesAgent on Salesagent.Code=CustVisit.AgentID  where (ISNULL(CustVisit.Latitude,0) > 0 and ISNULL(CustVisit.Latitude,0) <20) and (ISNULL(CustVisit.Longitude,0) > 0  and ISNULL(CustVisit.Longitude,0) < 130) and CustVisit.TransDate >= (Select Max(CustVisit.TransDate) from CustVisit where  (ISNULL(CustVisit.Latitude,0) > 0 and ISNULL(CustVisit.Latitude,0) <20) and (ISNULL(CustVisit.Longitude,0) > 0 and ISNULL(CustVisit.Longitude,0) < 130)  and CustVisit.AgentID = Salesagent.Code and TransDate >=GetDate()-1 )  and TransDate>=GetDate()-1  ";
        //qry = "SELECT 'green' as Color,'14.8474867' as Latitude,'120.8238718' as Longitude , 'Test1' as Remarks,'1' as MarkerNo, 'AAA' as MarkerName,'SALESAGENT' as ICON Union SELECT 'red' as Color,'14.2952706' as Latitude,'120.9176947' as Longitude , 'Test2' as Remarks,'2' as MarkerNo, 'bbb' as MarkerName,'CUSTOMER'  as ICON";
        qry = formatQueryString(qry, sScreenName);
        execute(qry);
    }
     
   
    var infowindow = '';
    var contentString = '';
    var contentString1 = '';
    if (executeQry.length >= 1) {
        var latLon = { lat: parseFloat(executeQry[0].Latitude), lng: parseFloat(executeQry[0].Longitude) };
        //var latLon = { lat: parseFloat(executeQry[4].Latitude), lng: parseFloat(executeQry[4].Longitude) };
        map = new google.maps.Map(document.getElementById('map'), { zoom: 10, center: latLon });
        marker = new google.maps.Marker({ position: latLon, map: map });
    }
    clearMarkers();
    var scaledSize = new google.maps.Size(30, 30);
    //if (ProjectName == "PVMNG") {
    //   // import { MarkerClusterer } from "https://cdn.skypack.dev/@googlemaps/markerclusterer@2.3.1";
    //    for (var i = 0; i < executeQry.length; i++) {

    //        myLatLng = { lat: parseFloat(executeQry[i].Latitude), lng: parseFloat(executeQry[i].Longitude) };
    //        locations.push(myLatLng);
    //    }
    //    initMap();
    //}

    for (var i = 0; i < executeQry.length; i++) {

        myLatLng = { lat: parseFloat(executeQry[i].Latitude), lng: parseFloat(executeQry[i].Longitude) };

        //if (i == 1)
         //   myLatLng = { lat: parseFloat(1.285141), lng: parseFloat(103.8113771) };

        var iconUrl = "http://maps.google.com/mapfiles/ms/icons/" + executeQry[i].Color + ".png";
        //iconUrl += executeQry[i].Color + "-dot.png";
        scaledSize = new google.maps.Size(50, 50);
        if (executeQry[i].ICON == "CUSTOMER") {
            iconUrl = "../Images/MapIcons/Customers.png";
            scaledSize = new google.maps.Size(30, 30);
        }
        else if (executeQry[i].ICON == "PIN") {

            if (executeQry[i].Color.toString().toUpperCase() == "RED") {
                iconUrl = "../Images/MapIcons/Red_Bullet.png";
                scaledSize = new google.maps.Size(30, 30);
            }
            if (executeQry[i].Color.toString().toUpperCase() == "YELLOW") {
                iconUrl = "../Images/MapIcons/Yellow_Bullet.png";
                scaledSize = new google.maps.Size(30, 30);
            }
            if (executeQry[i].Color.toString().toUpperCase() == "GREEN") {
                iconUrl = "../Images/MapIcons/Green_Bullet.png";
                scaledSize = new google.maps.Size(30, 30);
            }

            //iconUrl = "../Images/MapIcons/Red_Bullet.png";
            //scaledSize = new google.maps.Size(30, 30);
        }
        else if (executeQry[i].ICON == "SALESAGENT") {
            iconUrl = "../Images/MapIcons/SalesPerson.png";
            scaledSize = new google.maps.Size(30, 30);
        }

        if ((ProjectName.toLowerCase() == "lite" || ProjectName.toLowerCase() == "khind" || ProjectName.toLowerCase() == "frostfood") &&
           (currentScreenName.toString().toLowerCase() == "customerroutingctrform" ||
           currentScreenName.toString().toLowerCase() == "customerroutingctranalysisform" ||
           currentScreenName.toString().toLowerCase() == "customerroutingmappickeraddform" ||
           currentScreenName.toString().toLowerCase() == "customerroutingmappickerremoveform")) {
            new MarkerWithLabel({
                position: myLatLng,
                map: map,
                icon: {
                    url: iconUrl,
                    scaledSize: scaledSize,
                },
            });


            marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                label: executeQry[i].MarkerNo == null ? "" : executeQry[i].MarkerNo.toString(),
                icon: {
                    url: iconUrl,
                    scaledSize: scaledSize,
                },
            });

        }
        else {
            try {
                debugger;
                new MarkerWithLabel({
                    position: myLatLng,
                    map: map,
                    icon: {
                        url: iconUrl,
                        scaledSize: scaledSize,
                    },
                    labelContent: ProjectName.toLowerCase() == "pvmng" ? "" : executeQry[i].MarkerName,
                    labelAnchor: new google.maps.Point(38, -3),
                    // the CSS class for the label
                    labelClass: ProjectName.toLowerCase() == "pvmng" ? "" : "label  " + executeQry[i].Color,
                    labelInBackground: true
                });

            } catch (e) {

            }
            marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                label: executeQry[i].MarkerNo == null ? "" : executeQry[i].MarkerNo.toString(),
                icon: {
                    url: iconUrl,
                    scaledSize: scaledSize,
                    labelOrigin: { x: 24, y: 16 }
                },
            });
        }

        if (ProjectName.toLowerCase() == "pvmng") {
            contentString = '<div id="content">' +
                 '<div id="siteNotice">' +
                 '</div>' +
                 '<div id="bodyContent">' +
                 '<p><b>Agent :</b> ' +
                 executeQry[i].Remarks + ' ' +
                 '</div>' +
                 '</div>';
        }
        else {
            contentString = '<div id="content">' +
                     '<div id="siteNotice">' +
                     '</div>' +
                     '<div id="bodyContent">' +
                     '<p><b>Remarks :</b> ' +
                     executeQry[i].Remarks + ' ' +
                     '</div>' +
                     '</div>';
        }

        contentString1 = executeQry[i].CustNo;

        var infowindow = new google.maps.InfoWindow({
            content: contentString,
        });


        if ((ProjectName.toLowerCase() == "lite" || ProjectName.toLowerCase() == "khind" || ProjectName.toLowerCase() == "frostfood" || ProjectName.toLowerCase() == "ffb" ) &&
            (currentScreenName.toString().toLowerCase() == "customerroutingctrform" ||
            currentScreenName.toString().toLowerCase() == "customerroutingctranalysisform" ||
            currentScreenName.toString().toLowerCase() == "customerroutingmappickeraddform" ||
            currentScreenName.toString().toLowerCase() == "customerroutingmappickerremoveform")) {


            // TESTING PURPOSE =========================================

            var infowindow_hover_out = new google.maps.InfoWindow({
                content: executeQry[i].MarkerName,
            });

            google.maps.event.addListener(marker, 'mouseover', (function (marker, contentString1, infowindow_hover_out) {
                return function () {
                    infowindow_hover_out.open(map, marker);
                };
            })(marker, contentString1, infowindow_hover_out));

            google.maps.event.addListener(marker, 'mouseout', (function (marker, contentString1, infowindow_hover_out) {
                return function () {
                    infowindow_hover_out.close();
                };
            })(marker, contentString1, infowindow_hover_out));


            // TESTING PURPOSE =========================================

            google.maps.event.addListener(marker, 'click', (function (marker, contentString1, infowindow) {
                return function () {
                    Marker_Popup_Calling("CustomerRoutingMapPickerForm", contentString1);
                };
            })(marker, contentString1, infowindow));

        }
        else {
            google.maps.event.addListener(marker, 'click', (function (marker, contentString, infowindow) {
                return function () {
                    infowindow.open(map, marker);
                };
            })(marker, contentString, infowindow));
        }
    }
}


// MARKER CLICK EVENT HANDLING ====================================================================
function Marker_Popup_Calling(popup_scrName, custNo) {
    // debugger;
    var screenName_Decided = '';
    //alert(custNo)
    Clicked_Map_CustomerNo = custNo;

    subCurrentScreenName = popup_scrName;

    var _obj = {};
    _obj.fieldName = "Clicked_Map_CustomerNo";
    //PerformAction('formButtonClicked', _obj);
    PerformAction('mapButtonClicked', _obj);

    return;

    // select * from RouteDet inner join RouteMaster on RouteMaster.RouteNo = RouteDet.RouteNo 
    // where RouteDet.RouteNo ='ARSS000118'  and CustNo='230086'

    // HERE WE HAVE TO FIND OUT WHICH FORM SHOULD BE CALLED
    // AS OF NOW HERE USED ADD FORM
    // BASED CUSTOMER SELECTION FORM IS DECIDED HERE.


    //select * from RouteDet inner join RouteMaster on RouteMaster.RouteNo = RouteDet.RouteNo 
    //where RouteDet.RouteNo ='ARSS000118'  and CustNo='230086'

}

function Handle_Close_Clicked_Map_Customer(sScreenName) {
    //popupdialog_Container_ThirdLevel
    if (sScreenName.toString().toLowerCase() == "customerroutingctrform") {
        $(".ui-dialog-content").dialog().dialog("close");

        windowPreparingToOpen("CustomerRoutingForm");
        currentScreenName = "CustomerRoutingForm";
        CurrentScreen_TabScreen_Name = "CustomerRoutingForm";
    }
    else if (sScreenName.toString().toLowerCase() == "customerroutingmappickeraddform" ||
        sScreenName.toString().toLowerCase() == "customerroutingmappickerremoveform") {
        windowPreparingToOpen("CustomerRoutingCTRForm");


        //// COMMENTED 11.02.2021 ======================================
        currentScreenName = "CustomerRoutingCTRForm";
        CurrentScreen_TabScreen_Name = "CustomerRoutingCTRForm";
        //// COMMENTED 11.02.2021 ======================================

        $('#popupdialog_MapMarker_Container').dialog('close');
    }
    //<div id="popupdialog_Container_ThirdLevel"></div> 
    //<div id="popupdialog_Container_FourthLevel"></div>
    //<div id="popupdialog_MapMarker_Container"></div> 
}


function Handle_Clicked_Map_Customer(screenName_Decided) {
    var htm = '<div id="FormConfig_' + screenName_Decided + '"></div>';

    //<div id="popupdialog_Container" title=""></div>
    $("#FormConfig_" + screenName_Decided).html("");
    $("#popupdialog_MapMarker_Container").html("");
    $("#popupdialog_MapMarker_Container").append(htm);
    //_divId = "FormConfig_" + _screenName;
    var pageCount = 0;

    windowPreparingToOpen(screenName_Decided);

    setSystemTableConfig();

    //GetFormConfig("FormConfig_" + _screenName, _screenName);
    GetFormConfig("FormConfig_" + screenName_Decided, screenName_Decided);

    var query = "select QueryText + ' ' + GroupText + ' ' + OrderText from Queryconfig where screenname ='" + screenName_Decided + "_FORM'";

    getExecute(query);

    var qry = executeQry;
    qry = formatQueryString(qry, screenName_Decided);
    execute(qry);
    executeData = executeQry;

    if (executeData != "" && executeData != null && currentScreenName != "AssetForm") {
        AssignFormData(executeData, screenName_Decided);
    }

    setFormConfig(sLanguage);

    PopUpOpen_Marker();
    return false;

}

function PopUpOpen_Marker() {

    $('#popupdialog_MapMarker_Container').dialog({
        width: "60%",
        modal: true,
        title: "",
        closeOnEscape: false,
        buttons: {
            Close: function () {
                $(this).dialog("close");
                Marker_Popup_Close_Functionality();
            }
        },
        close: function () {
            Marker_Popup_Close_Functionality();
        },
        beforeClose: function (e, a, b) {
            if (e.cancelable == true)
                uiIconCloseThick();
        }
    });
}

function Marker_Popup_Close_Functionality() {


    // HERE WE HAVE TO MAKE REFRESH THE PAGE.===================
    windowPreparingToOpen("CustomerRoutingCTRForm");
    // HERE WE HAVE TO MAKE REFRESH THE PAGE.===================


    // HERE WE HAVE FUNCTIONALITY FOR CLOSE POPUP  =======================================
}
// MARKER CLICK EVENT HANDLING ====================================================================




var directionsService = "";
var directionsRenderer = "";
function initMapRoute() {

    directionsService = new google.maps.DirectionsService;
    // directionsRenderer = new google.maps.DirectionsRenderer;
    directionsRenderer = new google.maps.DirectionsRenderer({
        suppressMarkers: true
    });
    var latLon = { lat: 11.0494, lng: 77.0094 };
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: latLon
    });
    marker = new google.maps.Marker({
        position: latLon,
        //draggable:true,
        animation: google.maps.Animation.DROP,
        //icon: "http://localhost:52063/Images/simplrTruck.png",
        // icon: imageA,
        icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/truck.png",
            scaledSize: new google.maps.Size(50, 50),
            labelOrigin: { x: 25, y: 0 }
        },
        map: map
    });
    directionsRenderer.setMap(map);
    clearMarkers();
    SetMapRoute(map);
}

function SetMapRoute(map) {
    var sScreenName = "MapPickerForm_MapRoute";
    var qry = getString['QueryConfig_' + sScreenName];
    qry += ' ' + getString['QueryConfig_' + sScreenName + '_GroupText'];
    qry += ' ' + getString['QueryConfig_' + sScreenName + '_OrderText'];
    // var qry = "SELECT 'green' as Color,'14.8474867' as Latitude,'120.8238718' as Longitude , 'Test1' as Remarks,'1' as MarkerNo, 'AAA' as MarkerName Union SELECT 'red' as Color,'14.2952706' as Latitude,'120.9176947' as Longitude , 'Test2' as Remarks,'2' as MarkerNo, 'bbb' as MarkerName Union SELECT 'yellow' as Color,'14.9692139' as Latitude,'120.9188296' as Longitude , 'Test3' as Remarks,'3' as MarkerNo, 'ccc' as MarkerName  Union SELECT 'green' as Color,'13.936684' as Latitude,'121.1564816' as Longitude , 'Test4' as Remarks,'4' as MarkerNo, 'ddd' as MarkerName Union SELECT 'red' as Color,'14.5860298' as Latitude,'121.0641453' as Longitude , 'Test5' as Remarks,'5' as MarkerNo, 'eee' as MarkerName Union SELECT 'yellow' as Color,'14.9924004' as Latitude,'120.6326731' as Longitude , 'Test6' as Remarks,'6' as MarkerNo, 'fff' as MarkerName Union SELECT 'green' as Color,'1.2851138' as Latitude,'103.8113694' as Longitude , 'Test7' as Remarks,'7' as MarkerNo, 'ggg' as MarkerName ";
    execute(qry);
    var executeQry1 = executeQry;
    //  executeQry1 = DummyData();

    var speedLimit = 4000;
    var myLatLng = '';
    clearMarkers();
    var j = 0;

    //if (executeQry1.length >= 1) {
    //    var latLon = { lat: parseFloat(executeQry[0].Latitude), lng: parseFloat(executeQry[0].Longitude) };
    //map = new google.maps.Map(document.getElementById('map'), { zoom: 8, center: latLon });
    //marker = new google.maps.Marker({ position: latLon, map: map });
    //}
    for (var i = 0; i < executeQry1.length    ; i++) {
        setTimeout(function () {
            myLatLng = { lat: parseFloat(executeQry1[j].Latitude), lng: parseFloat(executeQry1[j].Longitude) };
            var iconUrl = "http://maps.google.com/mapfiles/ms/icons/" + executeQry1[j].Color + ".png";
            if (executeQry1[j].Color != "")
                marker = new google.maps.Marker({
                    position: myLatLng,
                    animation: google.maps.Animation.DROP,
                    map: map,
                    label: executeQry1[j].MarkerNo,
                    icon: {
                        //url: "http://maps.google.com/mapfiles/ms/icons/truck.png",
                        url: iconUrl,
                        scaledSize: new google.maps.Size(50, 50),
                        labelOrigin: { x: 24, y: 16 }
                    },
                    title: " Remarks : " + executeQry1[j].MarkerName
                });



            if (i == j)
                calculateAndDisplayRoute(directionsService, directionsRenderer, j, executeQry1);
            else {
                if (j != 0)
                    calculateAndDisplayRoute(directionsService, directionsRenderer, j + 1, executeQry1);
            }

            ///
            var contentString = '<div id="content">' +
                      '<div id="siteNotice"> </div> <div id="bodyContent">' +
                      '<p><b>Remarks :</b> ' + executeQry1[j].MarkerName + ' ' +
                      '</div> </div>';
            var infowindow = new google.maps.InfoWindow()
            google.maps.event.addListener(marker, 'click', (function (marker, contentString, infowindow) {
                return function () {
                    infowindow.setContent(contentString);
                    infowindow.open(map, marker);
                };
            })(marker, contentString, infowindow));
            j++;
        }, i * speedLimit);
    }
}

function calculateAndDisplayRoute(directionsService, directionsRenderer, j, executeQry1) {
    var waypts = [];
    var orginLat = '';
    var orginLon = '';
    var destinationLat = '';
    var destinationLon = '';
    for (var i = 0; i < j  ; i++) {
        if (i == 0) {
            orginLat = executeQry1[i].Latitude;
            orginLon = executeQry1[i].Longitude;
        }
        else if (i == j - 1) {
            destinationLat = executeQry1[i].Latitude;
            destinationLon = executeQry1[i].Longitude;
        }
        else {
            waypts.push({
                location: new google.maps.LatLng(executeQry1[i].Latitude, executeQry1[i].Longitude),
                stopover: true
            });
        }
    }
    directionsService.route({
        origin: new google.maps.LatLng(orginLat, orginLon),
        destination: new google.maps.LatLng(destinationLat, destinationLon),
        waypoints: waypts,
        optimizeWaypoints: false,//true,
        travelMode: 'DRIVING'
    }, function (response, status) {
        if (status === 'OK') {
            directionsRenderer.setDirections(response);
        } else {
            // window.alert('Directions request failed due to ' + status);
        }
    });
}



function DummyData() {
    var arr = [];
    // AgentId, Name, Latitude, Longitude, TransDate
    arr.push({ "AgentId": '11', "Name": 'AAA', "Latitude": '11.0547233', "Longitude": '76.9943673', "TransDate": '2020-02-03 12:57:55.000' });
    arr.push({ "AgentId": '12', "Name": 'bbb', "Latitude": '11.2327', "Longitude": '77.1019', "TransDate": '2020-02-03 12:57:55.000' });
    arr.push({ "AgentId": '13', "Name": 'CCC', "Latitude": '11.1098', "Longitude": '77.1761', "TransDate": '2020-02-03 12:57:55.000' });

    arr.push({ "AgentId": '14', "Name": 'DDD', "Latitude": '11.0749', "Longitude": '77.1931', "TransDate": '2020-02-03 12:57:55.000' });
    arr.push({ "AgentId": '15', "Name": 'EEE', "Latitude": '11.1085', "Longitude": '77.3411', "TransDate": '2020-02-03 12:57:55.000' });
    arr.push({ "AgentId": '16', "Name": 'FFF', "Latitude": '11.1730', "Longitude": '77.2686', "TransDate": '2020-02-03 12:57:55.000' });
    arr.push({ "AgentId": '11', "Name": 'AAA', "Latitude": '11.0332', "Longitude": '77.0339', "TransDate": '2020-02-03 12:57:55.000' });
    arr.push({ "AgentId": '11', "Name": 'AAA', "Latitude": '11.0802', "Longitude": '76.9415', "TransDate": '2020-02-03 12:57:55.000' });
    return arr;
}



