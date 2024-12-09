var map;
var marker;

function setMapOnAll(map) {
    marker.setMap(null);
}
function clearMarkers() {
    setMapOnAll(null);
}



function initMapMarker_NEW(mapid) {
    var latLon = { lat: 1.29027, lng: 103.851959 };
    map = new google.maps.Map(
      document.getElementById(mapid), { zoom: 10, center: latLon });
    marker = new google.maps.Marker({
        position: latLon,
        //icon: "http://localhost:52063/Images/simplrTruck.png",
        // icon: imageA,
        map: map
    });

    var _obj = {};
    _obj.fieldName = 'MapTimer';
    PerformAction('timerEventRun', _obj);
    if (mapTimer != "") {
        setInterval(function () {
            PerformAction('timerEventRun', _obj);
            _obj = {};
            _obj.fieldName = "SubmitBtn";
            PerformAction('formButtonClicked', _obj);
        }, mapTimer * 1000);
    }
}

function initMapMarker() {
    //var latLon = { lat: 11.0494, lng: 77.0094 };

    var latLon = { lat: 1.29027, lng: 103.851959 };
    map = new google.maps.Map(
      document.getElementById('map'), { zoom: 10, center: latLon });
    marker = new google.maps.Marker({
        position: latLon,
        //icon: "http://localhost:52063/Images/simplrTruck.png",
        // icon: imageA,
        map: map
    });

    var _obj = {};
    _obj.fieldName = 'MapTimer';
    PerformAction('timerEventRun', _obj);
    if (mapTimer != "") {
        setInterval(function () {
            PerformAction('timerEventRun', _obj);
            _obj = {};
            _obj.fieldName = "SubmitBtn";
            PerformAction('formButtonClicked', _obj);
        }, mapTimer * 1000);
    }
    //  SetMapMarker(map,'default');
    //  SetMapMarker('default');

}
function MapMarkerDrawCircle() {

    var citymap = {
        circuledraw: {
            center: { lat: executeQry[0].Latitude, lng: executeQry[0].Longitude },
        }
    };
    var radius = parseInt(executeQry[0].Radius);

    var cityCircle = new google.maps.Circle({
        //strokeColor: '#FF0000',
        strokeColor: '#2271cce7',
        //  strokeOpacity: 0.8,
        // strokeWeight: 2,
        // fillColor: '#FF0000',
        fillColor: '#2271cce7',
        //fillOpacity: 0.35,
        map: map,
        // center: circuledraw,// citymap[city].center,
        center: citymap.circuledraw.center,
        radius: Math.sqrt(radius) * 1609.34//Math.sqrt(citymap[city].population) * 1609.34
        //radius: Math.sqrt(citymap[city].population) * 100
    });
}
//function SetMapMarker(map,action) {
function SetMapMarker_NEW(mapid) {

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

    if (executeQry.length >= 1) {
        var latLon = { lat: parseFloat(executeQry[0].Latitude), lng: parseFloat(executeQry[0].Longitude) };
        map = new google.maps.Map(document.getElementById(mapid), { zoom: 10, center: latLon });
        marker = new google.maps.Marker({ position: latLon, map: map });
    }
    clearMarkers();
    var scaledSize = new google.maps.Size(30, 30);
    //var citymap = {
    //    chicago: {
    //        center: { lat: executeQry[0].Latitude, lng: executeQry[0].Longitude },
    //        // population: 2714856
    //        population: 1
    //      //  radius: 1609,// 16093,
    //      //  radius:   16093,
    //    }

    //};
    for (var i = 0; i < executeQry.length    ; i++) {



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
        //if (i == 0) {
        //    var mMap = new google.maps.Circle();
        //    var dd = mMap.addCircle(new CircleOptions()
        //             .center(new LatLng(executeQry[0].Latitude, executeQry[0].Longitude))
        //             .radius(500)
        //             .strokeWidth(0)
        //             .strokeColor(Color.parseColor("#2271cce7"))
        //             .fillColor(Color.parseColor("#2271cce7")));
        //}
        //for (var city in citymap) {
        //.strokeColor(Color.parseColor("#2271cce7"))
        //    .fillColor(Color.parseColor("#2271cce7")));
        //.radius(500)
        //    .strokeWidth(0)


        //var cityCircle = new google.maps.Circle({
        //    //strokeColor: '#FF0000',
        //    strokeColor: '#2271cce7',
        //  //  strokeOpacity: 0.8,
        //   // strokeWeight: 2,
        //   // fillColor: '#FF0000',
        //    fillColor:'#2271cce7',
        //    //fillOpacity: 0.35,
        //    map: map,
        //    center: citymap[city].center,
        //    radius: Math.sqrt(citymap[city].population) * 1609.34

        ////radius: Math.sqrt(citymap[city].population) * 100
        //});
        //   }
        contentString = '<div id="content">' +
                                           '<div id="siteNotice">' +
                                           '</div>' +
                                            '<div id="bodyContent">' +
                                           '<p><b>Remarks :</b> ' + executeQry[i].Remarks + ' ' +
                                           '</div>' +
                                           '</div>';
        var infowindow = new google.maps.InfoWindow()
        google.maps.event.addListener(marker, 'click', (function (marker, contentString, infowindow) {
            return function () {
                infowindow.setContent(contentString);
                infowindow.open(map, marker);
            };
        })(marker, contentString, infowindow));
    }
}

function SetMapMarker(action) {

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

    if (executeQry.length >= 1) {
        var latLon = { lat: parseFloat(executeQry[0].Latitude), lng: parseFloat(executeQry[0].Longitude) };
        map = new google.maps.Map(document.getElementById('map'), { zoom: 10, center: latLon });
        marker = new google.maps.Marker({ position: latLon, map: map });
    }
    clearMarkers();
    var scaledSize = new google.maps.Size(30, 30);
    //var citymap = {
    //    chicago: {
    //        center: { lat: executeQry[0].Latitude, lng: executeQry[0].Longitude },
    //        // population: 2714856
    //        population: 1
    //      //  radius: 1609,// 16093,
    //      //  radius:   16093,
    //    }

    //};
    for (var i = 0; i < executeQry.length    ; i++) {



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
        //if (i == 0) {
        //    var mMap = new google.maps.Circle();
        //    var dd = mMap.addCircle(new CircleOptions()
        //             .center(new LatLng(executeQry[0].Latitude, executeQry[0].Longitude))
        //             .radius(500)
        //             .strokeWidth(0)
        //             .strokeColor(Color.parseColor("#2271cce7"))
        //             .fillColor(Color.parseColor("#2271cce7")));
        //}
        //for (var city in citymap) {
        //.strokeColor(Color.parseColor("#2271cce7"))
        //    .fillColor(Color.parseColor("#2271cce7")));
        //.radius(500)
        //    .strokeWidth(0)


        //var cityCircle = new google.maps.Circle({
        //    //strokeColor: '#FF0000',
        //    strokeColor: '#2271cce7',
        //  //  strokeOpacity: 0.8,
        //   // strokeWeight: 2,
        //   // fillColor: '#FF0000',
        //    fillColor:'#2271cce7',
        //    //fillOpacity: 0.35,
        //    map: map,
        //    center: citymap[city].center,
        //    radius: Math.sqrt(citymap[city].population) * 1609.34

        ////radius: Math.sqrt(citymap[city].population) * 100
        //});
        //   }
        contentString = '<div id="content">' +
                                           '<div id="siteNotice">' +
                                           '</div>' +
                                            '<div id="bodyContent">' +
                                           '<p><b>Remarks :</b> ' + executeQry[i].Remarks + ' ' +
                                           '</div>' +
                                           '</div>';
        var infowindow = new google.maps.InfoWindow()
        google.maps.event.addListener(marker, 'click', (function (marker, contentString, infowindow) {
            return function () {
                infowindow.setContent(contentString);
                infowindow.open(map, marker);
            };
        })(marker, contentString, infowindow));
    }
}

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



