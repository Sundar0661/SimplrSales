
var map;
var directionDisplay;
var directionsService;
var stepDisplay;

var position;
var marker = [];
var polyline = [];
var poly2 = [];
var poly = null;
var startLocation = [];
var endLocation = [];
var timerHandle = [];


//var speed = 0.000005, wait = 0;//1;
var speed = 1000.000005, wait = 0;//1;
var infowindow = null;

var myPano;
var panoClient;
var nextPanoId;

var startLoc = new Array();
var dPinIndex = 0;


/*
        +
        +
        +

   */
//|11.5034,77.2444'
/*startLoc[0] = '11.0547233,76.9943673';//'Singapore 539211';//'rio claro, trinidad';
startLoc[1] = '11.2327,77.1019';//'preysal, trinidad';
startLoc[2] = '11.1098,77.1761';//'san fernando, trinidad';
startLoc[3] = '11.0749,77.1931';//'couva, trinidad';
startLoc[4] = '11.1085,77.3411';//'couva, trinidad';
startLoc[5] = '11.1730,77.2686';//'couva, trinidad';
startLoc[6] = '11.0332,77.0339';//'couva, trinidad';
startLoc[0] = '11.0749,77.1931';*/
var endLoc = new Array();
/*endLoc[0] = '11.2327,77.1019';//'Singapore 609081';//'princes town, trinidad';
endLoc[1] = '11.1098,77.1761';//'tabaquite, trinidad';
endLoc[2] = '11.0749,77.1931';//'mayaro, trinidad';
endLoc[3] = '11.1085,77.3411';//'arima, trinidad';
endLoc[4] = '11.1730,77.2686';//'arima, trinidad';
endLoc[5] = '11.0332,77.0339';//'arima, trinidad';
endLoc[6] = '11.0802,76.9415';//'arima, trinidad';*/
endLoc[0] = '11.1730,77.2686';//'arima, trinidad';

//var eg1 = '11.0547233,76.9943673|11.2327,77.1019|' +
//       '11.1098,77.1761|' +
//       '11.0749,77.1931|' +
//       '11.1085,77.3411|' +
//       '11.1730,77.2686|' +
//       '11.0332,77.0339|' +
//       '11.0802,76.9415';

//var arrLoc = ['11.0547233,76.9943673','11.0332,77.0339','11.1730,77.2686','11.1085,77.3411','11.0749,77.1931','11.1098,77.1761','11.2327,77.1019', '11.0802,76.9415'];

//var arrLoc = ['11.0547233,76.9943673', '11.2327,77.1019', '11.1098,77.1761', '11.0749,77.1931', '11.1085,77.3411', '11.1730,77.2686', '11.0332,77.0339', '11.0749,77.1931'];


//var arrLoc = ['11.0547233,76.9943673', '11.2327,77.1019', '11.1098,77.1761', '11.0749,77.1931', '11.1085,77.3411', '11.1730,77.2686', '11.0332,77.0339', '11.0802,76.9415'];
 var arrLoc = ['14.5849,121.063', '15.3713,120.939', '14.6215,121.089', '14.4425,121.051', '15.3555,120.939', '14.8074,120.533', '14.6217,121.088', '15.358,120.942', '14.2964,120.939', '14.5638,121.113', '14.9922,120.633', '14.5624,121.112', '14.5694,121.108', '15.263,120.867', '14.1035,121.145', '13.87,121.024', '14.6854,121.026', '13.9397,121.596', '15.3676,120.94', '14.9922,120.633', '14.7412,121.685', '13.8483,121.047', '14.8475,120.824', '14.8396,120.831', '13.9565,122.282', '14.2863,121.01', '14.5127,121.163', '14.7679,120.942', '14.9535,120.898', '14.7467,121.651', '14.3795,120.923', '14.599,121.173', '13.7897,121.062', '14.2102,120.975', '13.5976,122.324', '13.9367,121.156', '13.915,122.1', '14.1817,121.247', '13.3931,121.828', '14.9923,120.633', '14.8416,120.849', '13.5959,122.324', '14.9692,120.919', '15.3563,120.943', '14.2204,121.181', '14.3139,120.922', '14.8419,120.815', '14.2953,120.918', '13.9389,121.157', '14.5847,121.063', '14.5847,121.063', '14.5413,121.02', '14.5413,121.02', '14.5413,121.02', '14.586,121.064', '14.9924,120.633', '14.9924,120.633', '14.5413,121.02', '1.28511,103.811', '14.5412,121.02', '14.5412,121.02', '14.5412,121.02', '14.7371,121.056', '14.5848,121.063'];
//todo
//var arrLoc = ['14.1035,121.145', '13.87,121.024', '14.6854,121.026', '13.9397,121.596', '15.3676,120.94', '14.9922,120.633', '14.7412,121.685', '13.8483,121.047', '14.8475,120.824', '14.8396,120.831', '13.9565,122.282', '14.2863,121.01', '14.5127,121.163', '14.7679,120.942', '14.9535,120.898', '14.7467,121.651', '14.3795,120.923', '14.599,121.173', '13.7897,121.062', '14.2102,120.975', '13.5976,122.324', '13.9367,121.156', '13.915,122.1', '14.1817,121.247', '13.3931,121.828', '14.9923,120.633', '14.8416,120.849', '13.5959,122.324', '14.9692,120.919', '15.3563,120.943', '14.2204,121.181', '14.3139,120.922', '14.8419,120.815', '14.2953,120.918', '13.9389,121.157', '14.5847,121.063', '14.5847,121.063', '14.5413,121.02', '14.5413,121.02', '14.5413,121.02', '14.586,121.064', '14.9924,120.633', '14.9924,120.633', '14.5413,121.02', '1.28511,103.811', '14.5412,121.02', '14.5412,121.02', '14.5412,121.02', '14.7371,121.056', '14.5848,121.063'];

//Ind data //11.499118,77.244918,'11.922962,76.939759','12.131172,76.676396','12.300946,76.655978','12.157157,77.110524','11.922962,76.939759','11.499118,77.244918'
//var arrLoc = ['11.016781,76.968687', '11.026882,76.951358', '11.058540,76.945290', '11.169005,76.951830', '11.235384,76.961082', '11.307102,76.934784', '11.233241,77.103472', '11.317935,77.006621', '11.499118,77.244918', '11.922962,76.939759', '12.131172,76.676396', '12.300946,76.655978', '12.157157,77.110524', '11.922962,76.939759', '11.499118,77.244918', '11.575973,77.588428', '11.447032,77.684019', '11.454663,77.435338', '11.356782,77.318871', '11.351138,77.167286', '11.233202,77.103506', '11.107513,77.177081', '11.087299,77.184644', '11.109580,77.339016', '11.190400,77.265764', '11.062402,77.089466', '11.026332,77.020859', '11.077914,77.037108', '11.137431,77.035942', '11.152675,76.944406', '11.112402,77.029041', '11.037993,77.037502', '11.005931,77.069634', '10.995410,77.281724', '11.172477,77.268576', '11.201656,77.077783', '11.207299,76.966969', '11.024849,76.906367', '10.994426,76.968133', '10.771726,76.680313', '10.701695,76.742649', '10.661804,77.008075', '10.744274,77.019756', '10.904000,76.998297', '10.915854,77.038751', '11.005837,77.069675', '11.012821,76.986124', '11.054194,76.994308', '11.016781,76.968687', '11.026882,76.951358', '11.058540,76.945290', '11.169005,76.951830', '11.235384,76.961082', '11.307102,76.934784', '11.233241,77.103472', '11.317935,77.006621', '11.499118,77.244918', '11.922962,76.939759', '12.131172,76.676396', '12.300946,76.655978', '12.157157,77.110524', '11.922962,76.939759', '11.499118,77.244918', '11.575973,77.588428', '11.447032,77.684019', '11.454663,77.435338', '11.356782,77.318871', '11.351138,77.167286', '11.233202,77.103506', '11.107513,77.177081', '11.087299,77.184644', '11.109580,77.339016', '11.190400,77.265764', '11.062402,77.089466', '11.026332,77.020859', '11.077914,77.037108', '11.137431,77.035942', '11.152675,76.944406', '11.112402,77.029041', '11.037993,77.037502', '11.005931,77.069634', '10.995410,77.281724', '11.172477,77.268576', '11.201656,77.077783', '11.207299,76.966969', '11.024849,76.906367', '10.994426,76.968133', '10.771726,76.680313', '10.701695,76.742649', '10.661804,77.008075', '10.744274,77.019756', '10.904000,76.998297', '10.915854,77.038751', '11.005837,77.069675', '11.012821,76.986124', '11.054194,76.994308','11.330675,77.727422'];
//var arrLoc = ['14.5849,121.063', '15.3713,120.939', '14.6215,121.089', '14.4425,121.051', '15.3555,120.939', '14.8074,120.533', '14.6217,121.088', '15.358,120.942', '14.5638,121.113', '14.9922,120.633', '14.5624,121.112', '14.5694,121.108', '15.263,120.867', '14.1035,121.145', '13.87,121.024', '14.6854,121.026', '13.9397,121.596', '15.3676,120.94', '14.9922,120.633', '14.7412,121.685', '13.8483,121.047', '14.8475,120.824', '14.8396,120.831', '13.9565,122.282', '14.2863,121.01', '14.5127,121.163', '14.7679,120.942', '14.9535,120.898', '14.7467,121.651', '14.3795,120.923', '14.599,121.173', '13.7897,121.062', '14.2102,120.975', '13.5976,122.324', '13.9367,121.156', '13.915,122.1', '14.1817,121.247', '13.3931,121.828', '14.9923,120.633', '14.8416,120.849', '13.5959,122.324', '14.9692,120.919', '15.3563,120.943', '14.2204,121.181', '14.3139,120.922', '14.8419,120.815', '14.2953,120.918', '13.9389,121.157', '14.5847,121.063', '14.5847,121.063', '14.5413,121.02', '14.5413,121.02', '14.5413,121.02', '14.586,121.064', '14.9924,120.633', '14.9924,120.633', '14.5413,121.02', '14.5412,121.02', '14.5412,121.02', '14.5412,121.02', '14.7371,121.056', '14.5848,121.063'];
//var arrLoc = ['1.28511,103.811', '14.5413,121.02', '14.5624,121.112', '14.5694,121.108', '14.599,121.173', '14.5638,121.113', '14.5413,121.02', '14.8074,120.533', '14.9922,120.633', '14.9923,120.633'];
//var arrLoc = ['11.055068,76.994340', '11.500514,77.245955', '1.28511,103.811'];//, '14.5694,121.108', '14.599,121.173', '14.5638,121.113', '14.5413,121.02', '14.8074,120.533', '14.9922,120.633', '14.9923,120.633'];
//var arrLoc = [ '14.5694,121.108', '14.599,121.173', '14.5638,121.113', '14.5413,121.02', '14.8074,120.533', '14.9922,120.633', '14.9923,120.633'];
var Colors = ["#FF0000", "#00FF00", "#0000FF"];

function getLatLonValue() {
    var sScreenName = "MapPickerForm_MapRoute";
    var qry = getString['QueryConfig_' + sScreenName];
    qry += ' ' + getString['QueryConfig_' + sScreenName + '_GroupText'];
    qry += ' ' + getString['QueryConfig_' + sScreenName + '_OrderText'];
    // var qry = "SELECT 'green' as Color,'14.8474867' as Latitude,'120.8238718' as Longitude , 'Test1' as Remarks,'1' as MarkerNo, 'AAA' as MarkerName Union SELECT 'red' as Color,'14.2952706' as Latitude,'120.9176947' as Longitude , 'Test2' as Remarks,'2' as MarkerNo, 'bbb' as MarkerName Union SELECT 'yellow' as Color,'14.9692139' as Latitude,'120.9188296' as Longitude , 'Test3' as Remarks,'3' as MarkerNo, 'ccc' as MarkerName  Union SELECT 'green' as Color,'13.936684' as Latitude,'121.1564816' as Longitude , 'Test4' as Remarks,'4' as MarkerNo, 'ddd' as MarkerName Union SELECT 'red' as Color,'14.5860298' as Latitude,'121.0641453' as Longitude , 'Test5' as Remarks,'5' as MarkerNo, 'eee' as MarkerName Union SELECT 'yellow' as Color,'14.9924004' as Latitude,'120.6326731' as Longitude , 'Test6' as Remarks,'6' as MarkerNo, 'fff' as MarkerName Union SELECT 'green' as Color,'1.2851138' as Latitude,'103.8113694' as Longitude , 'Test7' as Remarks,'7' as MarkerNo, 'ggg' as MarkerName ";
    execute(qry);
    //arrLoc = [];
    for (var i = 0; i < executeQry.length; i++) {
        // arrLoc.push(executeQry[i].Latitude + ',' + executeQry[i].Longitude)
    }
}
var initializeLoaded = false;
function initialize() {
    getLatLonValue();
    infowindow = new google.maps.InfoWindow(
      {
          size: new google.maps.Size(150, 50)
      });

    var myOptions = {
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

    address = startLoc[0];//'Trinidad and Tobago'
    geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, function (results, status) {
        //geocoder.geocode( {}, function(results, status) {
        if (results.length != 0)
            map.fitBounds(results[0].geometry.viewport);

    });

    //alert(arrLoc.length);

    var rendererOptions = {
        map: map,
        suppressMarkers: true,
        preserveViewport: true
    }



    var directionsService1 = new google.maps.DirectionsService();

    var travelMode = google.maps.DirectionsTravelMode.DRIVING;
    var waypts = [];
    for (var i = 0; i < arrLoc.length; i++) {
        waypts.push({
            location: arrLoc[i],//.position,
            stopover: true
        });
    }
    var bOptimizeWaypoints = false;

    if (bOptimizeWaypoints == true) {

        var request = {
            origin: arrLoc[0],
            destination: arrLoc[arrLoc.length - 1],
            waypoints: waypts,
            optimizeWaypoints: true,
            travelMode: travelMode
        };

        directionsService1.route(request, function (response, status) {

            //alert('initializeLoaded : ' + initializeLoaded);

            if (initializeLoaded == true) {
                return false;
            }
            initializeLoaded = true;
            if (status == google.maps.DirectionsStatus.OK) {
                //directionsDisplay.setDirections(response);
                var route = response.routes[0];
                var str = "";
                for (var i = 0; i < route.legs.length; i++) {
                    if (str == "") {
                        str = JSON.stringify(route.legs[i].start_location);
                    } else {
                        str = str + "|" + JSON.stringify(route.legs[i].start_location);
                    }
                    //alert(JSON.stringify(route.legs[i].start_location));
                }

                str = str.replace(/{"lat":/g, '');
                str = str.replace(/"lng":/g, '');
                str = str.replace(/}/g, '');
                arrStr = str.split('|');
                alert(arrStr.length)
                startLoc = [];
                for (var i = 0; i < arrStr.length - 1; i++) {
                    //startLoc
                    startLoc.push(arrStr[i]);
                    //endLoc
                }
                endLoc = [];
                for (var i = 1; i < arrStr.length; i++) {
                    //startLoc
                    endLoc.push(arrStr[i]);
                    //endLoc
                }


                //alert(startLoc.length);


                infowindow = new google.maps.InfoWindow(
                {
                    size: new google.maps.Size(150, 50)
                });

                var myOptions = {
                    zoom: 15,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                }
                map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

                address = startLoc[0];//'Trinidad and Tobago'
                geocoder = new google.maps.Geocoder();
                geocoder.geocode({ 'address': address }, function (results, status) {
                    if (results.length != 0)
                        map.fitBounds(results[0].geometry.viewport);

                });
                setRoutes();
            }
        });
    } else {

        /*
         *
         * arr = [1,2,3,4,5]
         *
         * arr1 = [1,2,3,4]
         * arr1 = [2,3,4,5]
         *
         */


        startLoc = [];
        for (var i = 0; i < arrLoc.length - 1; i++) {
            //startLoc
            startLoc.push(arrLoc[i]);
            //endLoc
        }
        endLoc = [];
        for (var i = 1; i < arrLoc.length; i++) {
            //startLoc
            endLoc.push(arrLoc[i]);
            //endLoc
        }

        //alert('startLoc -> ' + JSON.stringify(startLoc));
        //alert('endLoc -> ' + JSON.stringify(endLoc));
        setRoutes();
    }

}

var lineSymbol = "";
var tt = 0;
function createMarker(latlng, label, html, color, moveMarker) {
    if (moveMarker == 1) {
        lineSymbol = "";

    }
    else {
        lineSymbol = {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            strokeColor: '#005db5',
            strokeWidth: '#005db5'
        };
    }
    // alert("createMarker("+latlng+","+label+","+html+","+color+")");
    var contentString = '<b>' + label + '</b><br>' + html;
    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        title: label,
        icon: lineSymbol,
        // icon: 'https://maps.google.com/mapfiles/ms/icons/truck.png',
        zIndex: Math.round(latlng.lat() * -100000) << 5
    });
    marker.myname = label;


    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(contentString);
        infowindow.open(map, marker);
    });
    return marker;
}

var delayFactor = 0;
function setRoutes() {
    //alert('setRoutes');
    var directionsDisplay = new Array();

    //alert('startLoc.length : ' + startLoc.length);
    //dPinIndex
    //for (var i=0; i< startLoc.length; i++){
  //  for (var i = 0; i <= dPinIndex; i++) {
        for (var i = dPinIndex; i <= dPinIndex; i++) {
        //var i= 0;
        var rendererOptions = {
            map: map,
            suppressMarkers: true,
            preserveViewport: true
        }
        directionsService = new google.maps.DirectionsService();

        var travelMode = google.maps.DirectionsTravelMode.DRIVING;

        var request = {
            origin: startLoc[i],
            destination: endLoc[i],
            optimizeWaypoints: true,
            travelMode: travelMode
        };


        //directionsService.route(request,function(iss,directionsDisplay[i]){

        //});

        directionsService.route(request, makeRouteCallback(i, directionsDisplay[i]));

    }

   
    function makeRouteCallback(routeNum, disp) {


        if (polyline[routeNum] && (polyline[routeNum].getMap() != null)) {

            if (dPinIndex == routeNum) {
                startAnimation(routeNum);
            }
            return;
        }
        return function (response, status) {

            if (status == google.maps.DirectionsStatus.OK) {

                var bounds = new google.maps.LatLngBounds();
                var route = response.routes[0];
                startLocation[routeNum] = new Object();
                endLocation[routeNum] = new Object();


                polyline[routeNum] = new google.maps.Polyline({
                    path: [],
                    // strokeColor: '#FF00FF',
                    strokeWeight: 3
                });

                poly2[routeNum] = new google.maps.Polyline({
                    path: [],
                    //  strokeColor: '#FFFF00',
                    strokeWeight: 3
                });


                // For each route, display summary information.
                var path = response.routes[0].overview_path;
                var legs = response.routes[0].legs;


                disp = new google.maps.DirectionsRenderer(rendererOptions);
                disp.setMap(map);
                disp.setDirections(response);


                //Markers
                for (i = 0; i < legs.length; i++) {
                    if (i == 0) {
                        startLocation[routeNum].latlng = legs[i].start_location;
                        startLocation[routeNum].address = legs[i].start_address;
                        // marker = google.maps.Marker({map:map,position: startLocation.latlng});
                        marker[routeNum] = createMarker(legs[i].start_location, "start", legs[i].start_address, "green", 1);
                    }

                    //todo
                    //endLocation[routeNum].latlng = legs[i].end_location;
                    //endLocation[routeNum].address = legs[i].end_address;
                    ////Newly add for marker
                    marker[routeNum] = createMarker(legs[i].start_location, "start", legs[i].start_address, "green", 0);

                    var steps = legs[i].steps;

                    for (j = 0; j < steps.length; j++) {
                        var nextSegment = steps[j].path;
                        var nextSegment = steps[j].path;

                        for (k = 0; k < nextSegment.length; k++) {
                            polyline[routeNum].getPath().push(nextSegment[k]);
                            //bounds.extend(nextSegment[k]);
                        }

                    }
                }



                polyline[routeNum].setMap(map);
                //map.fitBounds(bounds);

                if (dPinIndex == routeNum) {
                    startAnimation(routeNum);
                }
            }
            else if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
              
                //wait = true;
                //setTimeout("wait = true", 2000);
                //alert("OQL: " + status);


                delayFactor++;
                setTimeout(function () {
                     alert("Directions request failed: " + status);
                    //  m_get_directions_route(request);
                   // makeRouteCallback(routeNum, disp);
                    setRoutes();
                }, delayFactor *1000);

            }
            else alert("Directions request failed: " + status);

        } // else alert("Directions request failed: "+status);

    }

}

var lastVertex = 1;
var stepnum = 0;
var step = 1000;//50; // 5; // metres
var tick = 50;//100; // milliseconds
var eol = [];
//----------------------------------------------------------------------
function updatePoly(i, d) {
    // Spawn a new polyline every 20 vertices, because updating a 100-vertex poly is too slow
    if (poly2[i].getPath().getLength() > 20) {
        poly2[i] = new google.maps.Polyline([polyline[i].getPath().getAt(lastVertex - 1)]);
        // map.addOverlay(poly2)
    }

    if (polyline[i].GetIndexAtDistance(d) < lastVertex + 2) {
        if (poly2[i].getPath().getLength() > 1) {
            poly2[i].getPath().removeAt(poly2[i].getPath().getLength() - 1)
        }
        poly2[i].getPath().insertAt(poly2[i].getPath().getLength(), polyline[i].GetPointAtDistance(d));
    } else {
        poly2[i].getPath().insertAt(poly2[i].getPath().getLength(), endLocation[i].latlng);
    }
}
//----------------------------------------------------------------------------
var testdelayFactor = 0;
function animate(index, d) {
    if (d > eol[index]) {
        //alert('END');
        if (dPinIndex < startLoc.length) {
            dPinIndex = dPinIndex + 1;

            testdelayFactor++;
            setTimeout(function () {
                setRoutes();
            },  1000);
            //todo
          //  setRoutes();
        }

        marker[index].setPosition(endLocation[index].latlng);
        return;
    }
    var p = polyline[index].GetPointAtDistance(d);

    //map.panTo(p);
    marker[index].setPosition(p);
    updatePoly(index, d);

    //alert(d+'-'+step+'-'+(d+step));

    timerHandle[index] = setTimeout("animate(" + index + "," + (d + step) + ")", tick);
    // timerHandle[index] = animate(index, (d + step));
}

//-------------------------------------------------------------------------

function startAnimation(index) {
    if (timerHandle[index]) clearTimeout(timerHandle[index]);
    eol[index] = polyline[index].Distance();
    map.setCenter(polyline[index].getPath().getAt(0));

    poly2[index] = new google.maps.Polyline({ path: [polyline[index].getPath().getAt(0)], strokeColor: "#FFFF00", strokeWeight: 3 });

    //timerHandle[index] = setTimeout("animate("+index+",50)",2000);  // Allow time for the initial map display
    timerHandle[index] = setTimeout("animate(" + index + ",50)", 2000);  // Allow time for the initial map display
    // timerHandle[index] = animate(index, 50);  // Allow time for the initial map display
}

//----------------------------------------------------------------------------





////////////////////////////////////////////////////////
google.maps.LatLng.prototype.distanceFrom = function (newLatLng) {
    var EarthRadiusMeters = 6378137.0; // meters
    var lat1 = this.lat();
    var lon1 = this.lng();
    var lat2 = newLatLng.lat();
    var lon2 = newLatLng.lng();
    var dLat = (lat2 - lat1) * Math.PI / 180;
    var dLon = (lon2 - lon1) * Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = EarthRadiusMeters * c;
    return d;
}

google.maps.LatLng.prototype.latRadians = function () {
    return this.lat() * Math.PI / 180;
}

google.maps.LatLng.prototype.lngRadians = function () {
    return this.lng() * Math.PI / 180;
}

// === A method for testing if a point is inside a polygon
// === Returns true if poly contains point
// === Algorithm shamelessly stolen from http://alienryderflex.com/polygon/ 
google.maps.Polyline.prototype.Contains = function (point) {
    var j = 0;
    var oddNodes = false;
    var x = point.lng();
    var y = point.lat();
    for (var i = 0; i < this.getPath().getLength() ; i++) {
        j++;
        if (j == this.getPath().getLength()) { j = 0; }
        if (((this.getPath().getAt(i).lat() < y) && (this.getPath().getAt(j).lat() >= y))
        || ((this.getPath().getAt(j).lat() < y) && (this.getPath().getAt(i).lat() >= y))) {
            if (this.getPath().getAt(i).lng() + (y - this.getPath().getAt(i).lat())
            / (this.getPath().getAt(j).lat() - this.getPath().getAt(i).lat())
            * (this.getPath().getAt(j).lng() - this.getPath().getAt(i).lng()) < x) {
                oddNodes = !oddNodes
            }
        }
    }
    return oddNodes;
}

// === A method which returns the approximate area of a non-intersecting polygon in square metres ===
// === It doesn't fully account for spherical geometry, so will be inaccurate for large polygons ===
// === The polygon must not intersect itself ===
google.maps.Polyline.prototype.Area = function () {
    var a = 0;
    var j = 0;
    var b = this.Bounds();
    var x0 = b.getSouthWest().lng();
    var y0 = b.getSouthWest().lat();
    for (var i = 0; i < this.getPath().getLength() ; i++) {
        j++;
        if (j == this.getPath().getLength()) { j = 0; }
        var x1 = this.getPath().getAt(i).distanceFrom(new google.maps.LatLng(this.getPath().getAt(i).lat(), x0));
        var x2 = this.getPath().getAt(j).distanceFrom(new google.maps.LatLng(this.getPath().getAt(j).lat(), x0));
        var y1 = this.getPath().getAt(i).distanceFrom(new google.maps.LatLng(y0, this.getPath().getAt(i).lng()));
        var y2 = this.getPath().getAt(j).distanceFrom(new google.maps.LatLng(y0, this.getPath().getAt(j).lng()));
        a += x1 * y2 - x2 * y1;
    }
    return Math.abs(a * 0.5);
}

// === A method which returns the length of a path in metres ===
google.maps.Polyline.prototype.Distance = function () {
    var dist = 0;
    for (var i = 1; i < this.getPath().getLength() ; i++) {
        dist += this.getPath().getAt(i).distanceFrom(this.getPath().getAt(i - 1));
    }
    return dist;
}

// === A method which returns the bounds as a GLatLngBounds ===
google.maps.Polyline.prototype.Bounds = function () {
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < this.getPath().getLength() ; i++) {
        bounds.extend(this.getPath().getAt(i));
    }
    return bounds;
}

// === A method which returns a GLatLng of a point a given distance along the path ===
// === Returns null if the path is shorter than the specified distance ===
google.maps.Polyline.prototype.GetPointAtDistance = function (metres) {
    // some awkward special cases
    if (metres == 0) return this.getPath().getAt(0);
    if (metres < 0) return null;
    if (this.getPath().getLength() < 2) return null;
    var dist = 0;
    var olddist = 0;
    for (var i = 1; (i < this.getPath().getLength() && dist < metres) ; i++) {
        olddist = dist;
        dist += this.getPath().getAt(i).distanceFrom(this.getPath().getAt(i - 1));
    }
    if (dist < metres) {
        return null;
    }
    var p1 = this.getPath().getAt(i - 2);
    var p2 = this.getPath().getAt(i - 1);
    var m = (metres - olddist) / (dist - olddist);
    return new google.maps.LatLng(p1.lat() + (p2.lat() - p1.lat()) * m, p1.lng() + (p2.lng() - p1.lng()) * m);
}

// === A method which returns an array of GLatLngs of points a given interval along the path ===
google.maps.Polyline.prototype.GetPointsAtDistance = function (metres) {
    var next = metres;
    var points = [];
    // some awkward special cases
    if (metres <= 0) return points;
    var dist = 0;
    var olddist = 0;
    for (var i = 1; (i < this.getPath().getLength()) ; i++) {
        olddist = dist;
        dist += this.getPath().getAt(i).distanceFrom(this.getPath().getAt(i - 1));
        while (dist > next) {
            var p1 = this.getPath().getAt(i - 1);
            var p2 = this.getPath().getAt(i);
            var m = (next - olddist) / (dist - olddist);
            points.push(new google.maps.LatLng(p1.lat() + (p2.lat() - p1.lat()) * m, p1.lng() + (p2.lng() - p1.lng()) * m));
            next += metres;
        }
    }
    return points;
}

// === A method which returns the Vertex number at a given distance along the path ===
// === Returns null if the path is shorter than the specified distance ===
google.maps.Polyline.prototype.GetIndexAtDistance = function (metres) {
    // some awkward special cases
    if (metres == 0) return this.getPath().getAt(0);
    if (metres < 0) return null;
    var dist = 0;
    var olddist = 0;
    for (var i = 1; (i < this.getPath().getLength() && dist < metres) ; i++) {
        olddist = dist;
        dist += this.getPath().getAt(i).distanceFrom(this.getPath().getAt(i - 1));
    }
    if (dist < metres) { return null; }
    return i;
}

// === A function which returns the bearing between two vertices in decgrees from 0 to 360===
// === If v1 is null, it returns the bearing between the first and last vertex ===
// === If v1 is present but v2 is null, returns the bearing from v1 to the next vertex ===
// === If either vertex is out of range, returns void ===
google.maps.Polyline.prototype.Bearing = function (v1, v2) {
    if (v1 == null) {
        v1 = 0;
        v2 = this.getPath().getLength() - 1;
    } else if (v2 == null) {
        v2 = v1 + 1;
    }
    if ((v1 < 0) || (v1 >= this.getPath().getLength()) || (v2 < 0) || (v2 >= this.getPath().getLength())) {
        return;
    }
    var from = this.getPath().getAt(v1);
    var to = this.getPath().getAt(v2);
    if (from.equals(to)) {
        return 0;
    }
    var lat1 = from.latRadians();
    var lon1 = from.lngRadians();
    var lat2 = to.latRadians();
    var lon2 = to.lngRadians();
    var angle = -Math.atan2(Math.sin(lon1 - lon2) * Math.cos(lat2), Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon1 - lon2));
    if (angle < 0.0) angle += Math.PI * 2.0;
    angle = angle * 180.0 / Math.PI;
    return parseFloat(angle.toFixed(1));
}

/*
// === Copy all the above functions to GPolyline ===
google.maps.Polyline.prototype.Contains             = google.maps.Polygon.prototype.Contains;
google.maps.Polyline.prototype.Area                 = google.maps.Polygon.prototype.Area;
google.maps.Polyline.prototype.Distance             = google.maps.Polygon.prototype.Distance;
google.maps.Polyline.prototype.Bounds               = google.maps.Polygon.prototype.Bounds;
google.maps.Polyline.prototype.GetPointAtDistance   = google.maps.Polygon.prototype.GetPointAtDistance;
google.maps.Polyline.prototype.GetPointsAtDistance  = google.maps.Polygon.prototype.GetPointsAtDistance;
google.maps.Polyline.prototype.GetIndexAtDistance   = google.maps.Polygon.prototype.GetIndexAtDistance;
google.maps.Polyline.prototype.Bearing              = google.maps.Polygon.prototype.Bearing;
*/




////////////////////////////

