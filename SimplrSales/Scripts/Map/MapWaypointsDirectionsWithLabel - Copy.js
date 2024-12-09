var directionsDisplay;
var directionsService = new google.maps.DirectionsService();

var gmarkers = [];
var marker;
var map = null;
var startLocation = {};
var endLocation = {};

function initMapWaypointsDirections(action) {

    directionsDisplay = new google.maps.DirectionsRenderer({
        suppressMarkers: true
    });

    var latLon = { lat: 1.29027, lng: 103.851959 };
    marker = new google.maps.Marker({
        position: latLon,
        //icon: "http://localhost:52063/Images/simplrTruck.png",
        // icon: imageA,
        map: map
    });

    var chicago = new google.maps.LatLng(41.850033, -87.6500523);
    var mapOptions = {
        zoom: 6,
        center: chicago
    };
    map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
    directionsDisplay.setMap(map);

    calcRoute(action);
}
var arrLoc = [];
var arrData = [];
function getWaypointsDirectionsLatLonValue(action) {
    if (action == undefined) {
        //var sScreenName = "MapPickerForm_MapRoute";//CustLocForm_MapRoute-ThailandDemo
        var sScreenName = currentScreenName + "_MapRoute";
        var qry = getString['QueryConfig_' + sScreenName];
        qry += ' ' + getString['QueryConfig_' + sScreenName + '_GroupText'];
        qry += ' ' + getString['QueryConfig_' + sScreenName + '_OrderText'];
        // qry = "SELECT 'green' as Color,'14.8474867' as Latitude,'120.8238718' as Longitude , 'Test1' as Remarks,'1' as MarkerNo, 'AAA' as MarkerName Union SELECT 'red' as Color,'14.2952706' as Latitude,'120.9176947' as Longitude , 'Test2' as Remarks,'2' as MarkerNo, 'bbb' as MarkerName Union SELECT 'yellow' as Color,'14.9692139' as Latitude,'120.9188296' as Longitude , 'Test3' as Remarks,'3' as MarkerNo, 'ccc' as MarkerName  Union SELECT 'green' as Color,'13.936684' as Latitude,'121.1564816' as Longitude , 'Test4' as Remarks,'4' as MarkerNo, 'ddd' as MarkerName Union SELECT 'red' as Color,'14.5860298' as Latitude,'121.0641453' as Longitude , 'Test5' as Remarks,'5' as MarkerNo, 'eee' as MarkerName Union SELECT 'yellow' as Color,'14.9924004' as Latitude,'120.6326731' as Longitude , 'Test6' as Remarks,'6' as MarkerNo, 'fff' as MarkerName";// Union SELECT 'green' as Color,'1.2851138' as Latitude,'103.8113694' as Longitude , 'Test7' as Remarks,'7' as MarkerNo, 'ggg' as MarkerName ";
        //qry = "SELECT  '1' as MarkerNo, 'T19-100025544' as CustNo,'PIN' as ICON ,'red' as Color, 'T19-100025544 - Mayer Doa' as Remarks, 'Customer  :Mayer Doa' as MarkerName,'23.746708177' as Latitude,'90.426175853' as Longitude ,'CustLocation' as Ref union SELECT  '2' as MarkerNo, 'T19-100025552' as CustNo,'PIN' as ICON ,'red' as Color, 'T19-100025552 - Nuha Store' as Remarks, 'Customer  :Nuha Store' as MarkerName,'23.7505751' as Latitude,'90.4250522' as Longitude ,'CustLocation' as Ref union SELECT  '3' as MarkerNo, 'T19-100025553' as CustNo,'PIN' as ICON ,'red' as Color, 'T19-100025553 - Faruk Store' as Remarks, 'Customer  :Faruk Store' as MarkerName,'23.7520256' as Latitude,'90.4243504' as Longitude ,'CustLocation' as Ref union SELECT  '4' as MarkerNo, 'T19-100025554' as CustNo,'PIN' as ICON ,'red' as Color, 'T19-100025554 - Bidda Libery' as Remarks, 'Customer  :Bidda Libery' as MarkerName,'23.750694872' as Latitude,'90.425402607' as Longitude ,'CustLocation' as Ref";
        //qry = "SELECT  '1' as MarkerNo, 'T19-100025544' as CustNo,'PIN' as ICON ,'red' as Color, 'T19-100025544 - Mayer Doa' as Remarks, 'Customer  :Mayer Doa' as MarkerName,'23.846708177' as Latitude,'90.526175853' as Longitude ,'CustLocation' as Ref  union SELECT  '2' as MarkerNo, 'T19-100025552' as CustNo,'PIN' as ICON ,'green' as Color, 'T19-100025552 - Nuha Store' as Remarks, 'Customer  :Nuha Store' as MarkerName,'23.8505751' as Latitude,'90.5250522' as Longitude ,'CustLocation' as Ref union SELECT  '3' as MarkerNo, 'T19-100025553' as CustNo,'PIN' as ICON ,'orange' as Color, 'T19-100025553 - Faruk Store' as Remarks, 'Customer  :Faruk Store' as MarkerName,'23.7520256' as Latitude,'90.4243504' as Longitude ,'CustLocation' as Ref";
        //qry = "select    ROW_NUMBER() OVER(       ORDER BY CustNo) as MarkerNo,   CustNo,'PIN' as ICON ,'red' as Color, 'A' as Remarks, 'A' as MarkerName,Latitude,Longitude from Customer where CustNo in('T16-200104996','T16-200104997','T16-200104998','T16-200104999','T16-200105000','T16-200105001')";
        qry = "select    ROW_NUMBER() OVER(       ORDER BY CustNo) as MarkerNo,   CustNo,'PIN' as ICON ,'red' as Color, 'A' as Remarks, 'A' as MarkerName,Latitude,Longitude from Customer where CustNo in('T16-200104997','T16-200104998','T16-200104999','T16-200105000','T16-200105001')";

        qry = formatQueryString(qry, sScreenName);
        execute(qry);
    }
    //else {
    //      //var sScreenName = "MapPickerForm_MapRoute";//CustLocForm_MapRoute-ThailandDemo
    //      var sScreenName = currentScreenName + "_MapRoute";
    //      var qry = getString['QueryConfig_' + sScreenName];
    //      qry += ' ' + getString['QueryConfig_' + sScreenName + '_GroupText'];
    //      qry += ' ' + getString['QueryConfig_' + sScreenName + '_OrderText'];
    //      // qry = "SELECT 'green' as Color,'14.8474867' as Latitude,'120.8238718' as Longitude , 'Test1' as Remarks,'1' as MarkerNo, 'AAA' as MarkerName Union SELECT 'red' as Color,'14.2952706' as Latitude,'120.9176947' as Longitude , 'Test2' as Remarks,'2' as MarkerNo, 'bbb' as MarkerName Union SELECT 'yellow' as Color,'14.9692139' as Latitude,'120.9188296' as Longitude , 'Test3' as Remarks,'3' as MarkerNo, 'ccc' as MarkerName  Union SELECT 'green' as Color,'13.936684' as Latitude,'121.1564816' as Longitude , 'Test4' as Remarks,'4' as MarkerNo, 'ddd' as MarkerName Union SELECT 'red' as Color,'14.5860298' as Latitude,'121.0641453' as Longitude , 'Test5' as Remarks,'5' as MarkerNo, 'eee' as MarkerName Union SELECT 'yellow' as Color,'14.9924004' as Latitude,'120.6326731' as Longitude , 'Test6' as Remarks,'6' as MarkerNo, 'fff' as MarkerName";// Union SELECT 'green' as Color,'1.2851138' as Latitude,'103.8113694' as Longitude , 'Test7' as Remarks,'7' as MarkerNo, 'ggg' as MarkerName ";
    //      //qry = "SELECT  '1' as MarkerNo, 'T19-100025544' as CustNo,'PIN' as ICON ,'red' as Color, 'T19-100025544 - Mayer Doa' as Remarks, 'Customer  :Mayer Doa' as MarkerName,'23.746708177' as Latitude,'90.426175853' as Longitude ,'CustLocation' as Ref union SELECT  '2' as MarkerNo, 'T19-100025552' as CustNo,'PIN' as ICON ,'red' as Color, 'T19-100025552 - Nuha Store' as Remarks, 'Customer  :Nuha Store' as MarkerName,'23.7505751' as Latitude,'90.4250522' as Longitude ,'CustLocation' as Ref union SELECT  '3' as MarkerNo, 'T19-100025553' as CustNo,'PIN' as ICON ,'red' as Color, 'T19-100025553 - Faruk Store' as Remarks, 'Customer  :Faruk Store' as MarkerName,'23.7520256' as Latitude,'90.4243504' as Longitude ,'CustLocation' as Ref union SELECT  '4' as MarkerNo, 'T19-100025554' as CustNo,'PIN' as ICON ,'red' as Color, 'T19-100025554 - Bidda Libery' as Remarks, 'Customer  :Bidda Libery' as MarkerName,'23.750694872' as Latitude,'90.425402607' as Longitude ,'CustLocation' as Ref";
    //      qry = "SELECT  '1' as MarkerNo, 'T19-100025544' as CustNo,'PIN' as ICON ,'red' as Color, 'T19-100025544 - Mayer Doa' as Remarks, 'Customer  :Mayer Doa' as MarkerName,'23.846708177' as Latitude,'90.526175853' as Longitude ,'CustLocation' as Ref  union SELECT  '2' as MarkerNo, 'T19-100025552' as CustNo,'PIN' as ICON ,'green' as Color, 'T19-100025552 - Nuha Store' as Remarks, 'Customer  :Nuha Store' as MarkerName,'23.8505751' as Latitude,'90.5250522' as Longitude ,'CustLocation' as Ref union SELECT  '3' as MarkerNo, 'T19-100025553' as CustNo,'PIN' as ICON ,'orange' as Color, 'T19-100025553 - Faruk Store' as Remarks, 'Customer  :Faruk Store' as MarkerName,'23.7520256' as Latitude,'90.4243504' as Longitude ,'CustLocation' as Ref";
    //      qry = formatQueryString(qry, sScreenName);
    //      execute(qry);
    //  }
    arrData = executeQry;

    var hero = [{ 'id': 1, 'name': 'hero1' }, { 'id': 2, 'name': 'hero2' }];
    //remove hero1
    // var updatedHero = hero.filter(item => item.id !== 1);
    hero = hero.filter(function (item) {
        return item.id !== 1
    })
    arrLoc = [];
    arrLocDis = [];
    arrLocDis1 = [];
    executeQry1 = [];

    var arrLocDis = [];
    var obj = {};
    //obj["01"] = nieto.label;
    //obj["02"] = nieto.value;
    //arrLocDis.push(obj);

    var slat = "";
    var slon = "";
    var elat = "";
    var elon = "";
    var tcnt = executeQry.length;
    for (var f = 0; f < tcnt; f++) {
        if (f == 0) {
            obj["Latitude"] = executeQry[f].Latitude;
            obj["Longitude"] = executeQry[f].Longitude;

            obj["MarkerNo"] = f + 1;
            obj["CustNo"] = executeQry[f].CustNo;
            obj["ICON"] = executeQry[f].ICON;
            obj["Color"] = executeQry[f].Color;
            obj["Remarks"] = executeQry[f].Remarks;
            obj["MarkerName"] = executeQry[f].MarkerName;
            slat = executeQry[f].Latitude;
            slon = executeQry[f].Longitude;
            executeQry1.push(obj);
        }
        for (var ff = 0; ff < executeQry.length; ff++) {
            if (slat != executeQry[ff].Latitude && slon != executeQry[ff].Longitude) {
                var dis = calcCrow(slat, slon, executeQry[ff].Latitude, executeQry[ff].Longitude);
                obj = {};
                obj["Slat"] = slat;
                obj["Slng"] = slon;
                obj["eLatitude"] = executeQry[ff].Latitude;
                obj["eLongitude"] = executeQry[ff].Longitude;
                obj["dis"] = dis;

                obj["MarkerNo"] = executeQry[ff].MarkerNo;
                obj["CustNo"] = executeQry[ff].CustNo;
                obj["ICON"] = executeQry[ff].ICON;
                obj["Color"] = executeQry[ff].Color;
                obj["Remarks"] = executeQry[ff].Remarks;
                obj["MarkerName"] = executeQry[ff].MarkerName;

                arrLocDis.push(obj);
            }
        }
        arrLocDis = arrLocDis.sort(function (a, b) {
            return parseFloat(a.dis) - parseFloat(b.dis);
        });

        executeQry = executeQry.filter(function (item) {
            return item.Latitude !== slat
        });

        for (var ii = 0; ii < 1; ii++) {
            obj = {};
            //if (ii == 0) {
            //    obj["Latitude"] = executeQry[f].Latitude;
            //    obj["Longitude"] = executeQry[f].Longitude;

            //    obj["MarkerNo"] = f + 1;
            //    obj["CustNo"] = executeQry[f].CustNo;
            //    obj["ICON"] = executeQry[f].ICON;
            //    obj["Color"] = executeQry[f].Color;
            //    obj["Remarks"] = executeQry[f].Remarks;
            //    obj["MarkerName"] = executeQry[f].MarkerName;
            //    slat = executeQry[f].Latitude;
            //    slon = executeQry[f].Longitude;
            //    //executeQry1.push(obj);

            //}
            //else {
            obj["Latitude"] = arrLocDis[ii].eLatitude;
            obj["Longitude"] = arrLocDis[ii].eLongitude;
            obj["MarkerNo"] = f + 2;
            obj["CustNo"] = arrLocDis[ii].CustNo;
            obj["ICON"] = arrLocDis[ii].ICON;
            obj["Color"] = arrLocDis[ii].Color;
            obj["Remarks"] = arrLocDis[ii].Remarks;
            obj["MarkerName"] = arrLocDis[ii].MarkerName;
            obj["distance"] = arrLocDis[ii].dis;
            slat = arrLocDis[ii].eLatitude;
            slon = arrLocDis[ii].eLongitude;
            // }

            executeQry1.push(obj);

        }
    }


    for (var i = 0; i < executeQry1.length; i++) {
        var latLon = { lat: parseFloat(executeQry[0].Latitude), lng: parseFloat(executeQry[0].Longitude) };
        // arrLoc.push(latLon);
        arrLoc.push(executeQry[i].Latitude + ',' + executeQry[i].Longitude);

        var dis = calcCrow('23.70698', '90.448567', executeQry[i].Latitude, executeQry[i].Longitude);
        var disq = calcCrow('11.076375', '77.002983', '11.046150', '77.008740');
        var dis1 = dis;
    }


    //var sortedArray = arrLoc.sort(sortLngLat);
    //var sortedArray = executeQry.sort(function (a, b) {
    //    return parseFloat(a.dis) - parseFloat(b.dis);
    //});

    //arrLoc = ['3.01573889949219,101.541899894895', '1.2851119,103.8113655',     '11.0538501,76.9945934', '11.0538655,76.9945938'];

}

function sortLngLat(a, b) {
    var x = a[0] / a[1];
    var y = b[0] / b[1];
}

function calcCrow(lat1, lon1, lat2, lon2) {
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

function setMapOnAll1(map) {
    marker.setMap(null);
    // gmarkers = [];
    for (i = 0; i < gmarkers.length; i++) {
        gmarkers[i].setMap(null);
    }
    gmarkers = [];
}
function clearMarkers1() {
    setMapOnAll1(null);
}
var myLatLng = '';
function calcRoute(action) {
    getWaypointsDirectionsLatLonValue(action);
    clearMarkers1();
    var start = arrLoc[0];//document.getElementById('start').value;
    var end = arrLoc[arrLoc.length - 1];//document.getElementById('end').value;
    var waypts = [];
    //var checkboxArray = document.getElementById('waypoints');
    //for (var i = 0; i < checkboxArray.length; i++) {
    //    if (checkboxArray.options[i].selected == true) {
    //        waypts.push({
    //            location: checkboxArray[i].value,
    //            stopover: true
    //        });
    //    }
    //}
    for (var i = 0; i < arrLoc.length; i++) {
        waypts.push({
            location: arrLoc[i],//.position,
            stopover: true
        });
    }

    var request = {
        origin: start,
        destination: end,
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function (response, status) {
        //  directionsDisplay.setDirections(response);
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);

            //todo
            //var route = response.routes[0];
            //var summaryPanel = document.getElementById('directions_panel');
            //summaryPanel.innerHTML = '';
            //// For each route, display summary information.
            //for (var i = 0; i < route.legs.length; i++) {
            //    var routeSegment = i + 1;
            //    summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment + '</b><br>';
            //    summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
            //    summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
            //    summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
            //}

            var path = response.routes[0].overview_path;
            var legs = response.routes[0].legs;
            for (var i = 0; i < arrLoc.length; i++) {
                myLatLng = { lat: parseFloat(arrData[i].Latitude), lng: parseFloat(arrData[i].Longitude) };
                //createMarker(myLatLng, arrLoc[i].MarkerNo, arrLoc[i].Remarks, arrLoc[i].Color);
                createMarkerNew(myLatLng, arrData[i].MarkerNo, arrData[i].Remarks, arrData[i].Color);
            }
            //for (i = 0; i < legs.length; i++) {
            //    if (i == 0) {
            //        startLocation.latlng = legs[i].start_location;
            //        startLocation.address = legs[i].start_address;
            //        createMarker(legs[i].start_location, "start", legs[i].start_address, "green");
            //    }
            //    endLocation.latlng = legs[i].end_location;
            //    endLocation.address = legs[i].end_address;
            //}
        }
        else if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
            //delayFactor++;
            setTimeout(function () {
                alert("Directions request failed: " + status);
                setRoutes();
            }, 1 * 1000);
        }
        else
            alert("Directions request failed: " + status);
        //createMarker(endLocation.latlng, "end", endLocation.address, "red");



    });
}

var icons = [];
icons["red"] = {
    url: 'http://maps.google.com/mapfiles/ms/micons/red.png',
    // This marker is 34 pixels wide by 34 pixels tall.
    size: new google.maps.Size(34, 34),
    // The origin for this image is 0,0.
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is at 9,34.
    anchor: new google.maps.Point(17, 34)
};

function getMarkerImage(iconColor) {
    if ((typeof (iconColor) == "undefined") || (iconColor == null)) {
        iconColor = "red";
    }
    // if (!icons[iconColor]) {
    icons[iconColor] = {
        url: "http://maps.google.com/mapfiles/ms/micons/" + iconColor + ".png",
        // This marker is 34 pixels wide by 34 pixels tall.
        //size: new google.maps.Size(34, 34),
        size: new google.maps.Size(35, 35),
        // The origin for this image is 0,0.
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is at 6,20.
        anchor: new google.maps.Point(17, 34)
    };

    //scaledSize: new google.maps.Size(50, 50),
    //labelOrigin: { x: 24, y: 16 }

    // }
    return icons[iconColor];

}
// Marker sizes are expressed as a Size of X,Y
// where the origin of the image (0,0) is located
// in the top left of the image.

// Origins, anchor positions and coordinates of the marker
// increase in the X direction to the right and in
// the Y direction down.

var iconImage = {
    url: 'http://maps.google.com/mapfiles/ms/micons/red.png',
    // This marker is 20 pixels wide by 34 pixels tall.
    size: new google.maps.Size(20, 34),
    // The origin for this image is 0,0.
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is at 9,34.
    anchor: new google.maps.Point(9, 34)
};
// Shapes define the clickable region of the icon.
// The type defines an HTML &lt;area&gt; element 'poly' which
// traces out a polygon as a series of X,Y points. The final
// coordinate closes the poly by connecting to the first
// coordinate.
var iconShape = {
    coord: [9, 0, 6, 1, 4, 2, 2, 4, 0, 8, 0, 12, 1, 14, 2, 16, 5, 19, 7, 23, 8, 26, 9, 30, 9, 34, 11, 34, 11, 30, 12, 26, 13, 24, 14, 21, 16, 18, 18, 16, 20, 12, 20, 8, 18, 4, 16, 2, 15, 1, 13, 0],
    type: 'poly'
};
//var infowindow = new google.maps.InfoWindow({
//    size: new google.maps.Size(150, 50)
//});


function createMarkerNew(latlng, label, html, color) {
    try {


        marker = new google.maps.Marker({
            position: latlng,
            map: map,
            label: label.toString(),
            // animation: google.maps.Animation.DROP,
            //icon: getMarkerImage(color),
            icon: {
                //url: "http://maps.google.com/mapfiles/ms/icons/truck.png",
                url: "http://maps.google.com/mapfiles/ms/icons/" + color + ".png",
                scaledSize: new google.maps.Size(50, 50),
                labelOrigin: { x: 24, y: 16 }
            },
            //shape: iconShape,
            title: html,
            //  zIndex: Math.round(latlng.lat() * -100000) << 5
        });


        // var contentString = '<b>' + label + '</b><br>' + html;
        //marker.myname = label;
        //  gmarkers.push(marker);
        //google.maps.event.addListener(marker, 'click', function () {
        //    infowindow.setContent(contentString);
        //    infowindow.open(map, marker);
        //});


        var contentString = '<div id="content">' +
                     '<div id="siteNotice"> </div> <div id="bodyContent">' +
                     '<p><b>Remarks :</b> ' + html + ' ' +
                     '</div> </div>';
        var infowindow = new google.maps.InfoWindow()
        google.maps.event.addListener(marker, 'click', (function (marker, contentString, infowindow) {
            return function () {
                infowindow.setContent(contentString);
                infowindow.open(map, marker);
            };
        })(marker, contentString, infowindow));

    } catch (e) {
        alert(e.message);
    }
}



//google.maps.event.addDomListener(window, 'load', initialize);