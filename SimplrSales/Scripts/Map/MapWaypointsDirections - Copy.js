function initMap() {
    getLatLonValue1();
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 6,
        center: { lat: 41.85, lng: -87.65 },
    });

    directionsRenderer.setMap(map);
    //document.getElementById("submit").addEventListener("click", () => {
    document.getElementById("submit").addEventListener("click", function () {
        calculateAndDisplayRoute(directionsService, directionsRenderer);
    });



}
function getLatLonValue1(action) {
    if (action == undefined) {
        ////var sScreenName = "MapPickerForm_MapRoute";//CustLocForm_MapRoute-ThailandDemo
        //var sScreenName = currentScreenName + "_MapRoute";
        //var qry = getString['QueryConfig_' + sScreenName];
        //qry += ' ' + getString['QueryConfig_' + sScreenName + '_GroupText'];
        //qry += ' ' + getString['QueryConfig_' + sScreenName + '_OrderText'];
        //// qry = "SELECT 'green' as Color,'14.8474867' as Latitude,'120.8238718' as Longitude , 'Test1' as Remarks,'1' as MarkerNo, 'AAA' as MarkerName Union SELECT 'red' as Color,'14.2952706' as Latitude,'120.9176947' as Longitude , 'Test2' as Remarks,'2' as MarkerNo, 'bbb' as MarkerName Union SELECT 'yellow' as Color,'14.9692139' as Latitude,'120.9188296' as Longitude , 'Test3' as Remarks,'3' as MarkerNo, 'ccc' as MarkerName  Union SELECT 'green' as Color,'13.936684' as Latitude,'121.1564816' as Longitude , 'Test4' as Remarks,'4' as MarkerNo, 'ddd' as MarkerName Union SELECT 'red' as Color,'14.5860298' as Latitude,'121.0641453' as Longitude , 'Test5' as Remarks,'5' as MarkerNo, 'eee' as MarkerName Union SELECT 'yellow' as Color,'14.9924004' as Latitude,'120.6326731' as Longitude , 'Test6' as Remarks,'6' as MarkerNo, 'fff' as MarkerName";// Union SELECT 'green' as Color,'1.2851138' as Latitude,'103.8113694' as Longitude , 'Test7' as Remarks,'7' as MarkerNo, 'ggg' as MarkerName ";
        qry = "SELECT  '1' as MarkerNo, 'T19-100025544' as CustNo,'PIN' as ICON ,'red' as Color, 'T19-100025544 - Mayer Doa' as Remarks, 'Customer  :Mayer Doa' as MarkerName,'23.746708177' as Latitude,'90.426175853' as Longitude ,'CustLocation' as Ref union SELECT  '2' as MarkerNo, 'T19-100025552' as CustNo,'PIN' as ICON ,'red' as Color, 'T19-100025552 - Nuha Store' as Remarks, 'Customer  :Nuha Store' as MarkerName,'23.7505751' as Latitude,'90.4250522' as Longitude ,'CustLocation' as Ref union SELECT  '3' as MarkerNo, 'T19-100025553' as CustNo,'PIN' as ICON ,'red' as Color, 'T19-100025553 - Faruk Store' as Remarks, 'Customer  :Faruk Store' as MarkerName,'23.7520256' as Latitude,'90.4243504' as Longitude ,'CustLocation' as Ref union SELECT  '4' as MarkerNo, 'T19-100025554' as CustNo,'PIN' as ICON ,'red' as Color, 'T19-100025554 - Bidda Libery' as Remarks, 'Customer  :Bidda Libery' as MarkerName,'23.750694872' as Latitude,'90.425402607' as Longitude ,'CustLocation' as Ref";
        qry = formatQueryString(qry, sScreenName);
        execute(qry);
    }
    arrLoc = [];
    for (var i = 0; i < executeQry.length; i++) {
        arrLoc.push(executeQry[i].Latitude + ',' + executeQry[i].Longitude)
    }
    //arrLoc = ['3.01573889949219,101.541899894895', '1.2851119,103.8113655',     '11.0538501,76.9945934', '11.0538655,76.9945938'];

}

function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    const waypts = [];
    const checkboxArray = document.getElementById("waypoints");

    for (let i = 0; i < checkboxArray.length; i++) {
        if (checkboxArray.options[i].selected) {
            waypts.push({
                location: checkboxArray[i].value,
                stopover: true,
            });
        }
    }

    directionsService
      .route({
          origin: document.getElementById("start").value,
          destination: document.getElementById("end").value,
          waypoints: waypts,
          optimizeWaypoints: true,
          travelMode: google.maps.TravelMode.DRIVING,
      }).then(function (response) {
          //.then((response) => {
              directionsRenderer.setDirections(response);

              const route = response.routes[0];
              const summaryPanel = document.getElementById("directions-panel");

              summaryPanel.innerHTML = "";

              // For each route, display summary information.
              for (let i = 0; i < route.legs.length; i++) {
                  const routeSegment = i + 1;

                  summaryPanel.innerHTML +=
                    "<b>Route Segment: " + routeSegment + "</b><br>";
                  summaryPanel.innerHTML += route.legs[i].start_address + " to ";
                  summaryPanel.innerHTML += route.legs[i].end_address + "<br>";
                  summaryPanel.innerHTML += route.legs[i].distance.text + "<br><br>";
              }
          })
      //.catch((e) => window.alert("Directions request failed due to " + status));
    .catch(function (e) { window.alert("Directions request failed due to " + status) });
}