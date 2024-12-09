
var map;
var directionDisplay;
var directionsService;
var stepDisplay;
var isCurrent = false;

var position;
var marker = [];
var polyline = [];
var poly2 = [];
var poly3 = [];
var poly4 = [];

var isPoly2 = false;
var isPoly3 = false;
var isPoly4 = false;
var poly = null;
var startLocation = [];
var endLocation = [];
var timerHandle = [];

var Poly1PinColor = false;
var pinColor1 = "yellow";
var pinColor2 = "green";
var pinColor3 = "red";
var pinColor4 = "blue";


var problems = '';

var execlenth = 0;

//var speed = 0.000005, wait = 0;//1;
//var speed = 1000.000005, wait = 0;/ / 1;
var speed = 10000.000005, wait = 0;//1;
var infowindow = null;

var myPano;
var panoClient;
var nextPanoId;

var startLoc = new Array();
var dPinIndex = 0;

var endLoc = new Array();
var arrLoc = ['11.016781,76.968687', '11.026882,76.951358', '11.058540,76.945290', '11.169005,76.951830', '11.235384,76.961082', '11.307102,76.934784', '11.233241,77.103472', '11.317935,77.006621', '11.499118,77.244918', '11.922962,76.939759', '12.131172,76.676396', '12.300946,76.655978', '12.157157,77.110524', '11.922962,76.939759', '11.499118,77.244918', '11.575973,77.588428', '11.447032,77.684019', '11.454663,77.435338', '11.356782,77.318871', '11.351138,77.167286', '11.233202,77.103506', '11.107513,77.177081', '11.087299,77.184644', '11.109580,77.339016', '11.190400,77.265764', '11.062402,77.089466', '11.026332,77.020859', '11.077914,77.037108', '11.137431,77.035942', '11.152675,76.944406', '11.112402,77.029041', '11.037993,77.037502', '11.005931,77.069634', '10.995410,77.281724', '11.172477,77.268576', '11.201656,77.077783', '11.207299,76.966969', '11.024849,76.906367', '10.994426,76.968133', '10.771726,76.680313', '10.701695,76.742649', '10.661804,77.008075', '10.744274,77.019756', '10.904000,76.998297', '10.915854,77.038751', '11.005837,77.069675', '11.012821,76.986124', '11.054194,76.994308', '11.330675,77.727422'];//, '11.016781,76.968687', '11.026882,76.951358', '11.058540,76.945290', '11.169005,76.951830', '11.235384,76.961082', '11.307102,76.934784', '11.233241,77.103472', '11.317935,77.006621', '11.499118,77.244918', '11.922962,76.939759', '12.131172,76.676396', '12.300946,76.655978', '12.157157,77.110524', '11.922962,76.939759', '11.499118,77.244918', '11.575973,77.588428', '11.447032,77.684019', '11.454663,77.435338', '11.356782,77.318871', '11.351138,77.167286', '11.233202,77.103506', '11.107513,77.177081', '11.087299,77.184644', '11.109580,77.339016', '11.190400,77.265764', '11.062402,77.089466', '11.026332,77.020859', '11.077914,77.037108', '11.137431,77.035942', '11.152675,76.944406', '11.112402,77.029041', '11.037993,77.037502', '11.005931,77.069634', '10.995410,77.281724', '11.172477,77.268576', '11.201656,77.077783', '11.207299,76.966969', '11.024849,76.906367', '10.994426,76.968133', '10.771726,76.680313', '10.701695,76.742649', '10.661804,77.008075', '10.744274,77.019756', '10.904000,76.998297', '10.915854,77.038751', '11.005837,77.069675', '11.012821,76.986124', '11.054194,76.994308', '11.330675,77.727422'];
//var arrLoc = ['3.01573889949219,101.541899894895', '1.2851119,103.8113655', '3.0160089,101.542087', '3.0160089,101.542087', '3.0160089,101.542087', '3.0160089,101.542087', '3.0160089,101.542087', '14.4047376,121.0463451', '11.0538501,76.9945934', '11.0538655,76.9945938'];

var arrLocData = [];
var nonvisistedOutlets = [];
var speedLimit = 2;//2
//var speedLimit = 10;
var speedstep = 5000;//1000;
var speedtick = 3;//100;

var totalDistance = 0;
var totalDuration = 0;

var salesAgentRouteColorArrLoc = [];
var agentRecords = [];
var agentRecords1 = [];
var planRecords;
var total_outlets = 0;
var markers = {};

function CleargetLatLonValue() {
    dPinIndex = 0;
    startLoc = new Array();
    marker = [];
    polyline = [];
    poly2 = [];
    poly = null;
    startLocation = [];
    endLocation = [];
    timerHandle = [];

    isPoly2 = false;
    isPoly3 = false;
    isPoly4 = false;
    salesAgentRouteColorArrLoc = [];
    legsCnt = 0;
}

var routeLinecolor = "blue"
function getLatLonValue(action) {
    CleargetLatLonValue();
    step = speedstep * speedLimit;
    tick = speedtick - speedLimit;

    if (action == undefined) {

        qry = routemap_query;
        //var sScreenName = "MapPickerForm_MapRoute";//CustLocForm_MapRoute-ThailandDemo
        //var sScreenName = currentScreenName + "_MapRoute";
        //  var qry = getString['QueryConfig_' + sScreenName];
        // qry += ' ' + getString['QueryConfig_' + sScreenName + '_GroupText'];
        // qry += ' ' + getString['QueryConfig_' + sScreenName + '_OrderText'];

        //qry = "SELECT 'green' as Color,'11.016781' as Latitude,'76.968687' as Longitude , 'Test1' as Remarks,'1' as MarkerNo, 'AAA' as MarkerName Union SELECT 'red' as Color,'11.026882' as Latitude,    '76.951358' as Longitude , 'Test2' as Remarks,'2' as MarkerNo, 'bbb' as MarkerName Union SELECT 'yellow' as Color,'11.058540' as Latitude,'76.945290' as Longitude , 'Test3' as Remarks,'3' as MarkerNo, 'ccc' as MarkerName";

        //qry = "select  'CUSTOMER' as ICON, 'yellow' as Color,CustNo+' - '+CustName as Remarks,'Customer No :'+CustNo as MarkerName,  1 as MarkerNo,Latitude,Longitude From Customer Where CustNo in ('001','002')   union Select distinct 'SALESAGENT' as ICON,   Case When DateDiff(MINUTE  ,CustVisit.TransDate,GetDate())<=30    Then 'green' Else 'red' End as Color, CustVisit.AgentID+' - ' +SalesAgent.Name as Remarks,    'AgentID : '+ MDT.VehicleID as MarkerName, Row_NUMBER() Over(Order by CustVisit.AgentID)+1 as MarkerNo,    CustVisit.Latitude, CustVisit.Longitude from CustVisit inner join MDT on MDT.agentID=CustVisit.AgentID    inner join SalesAgent on Salesagent.Code=CustVisit.AgentID     where (ISNULL(CustVisit.Latitude,0) > 0 and ISNULL(CustVisit.Latitude,0) <20)    and (ISNULL(CustVisit.Longitude,0) > 0 and ISNULL(CustVisit.Longitude,0) < 130)    and CustVisit.TransDate >= (Select Max(CustVisit.TransDate) from CustVisit    where (ISNULL(CustVisit.Latitude,0) > 0 and ISNULL(CustVisit.Latitude,0) <20)    and (ISNULL(CustVisit.Longitude,0) > 0 and ISNULL(CustVisit.Longitude,0) < 130)    and CustVisit.AgentID = Salesagent.Code  )";

        //multi agent
        // qry = "SELECT 'red' as Color, '14.8474867' as Latitude, '120.8238718' as Longitude, 'Test1' as Remarks, '1' as MarkerNo, 'AAA' as MarkerName, 'A,B' as SalesAgent, 'red,green' RouteColor Union SELECT 'red' as Color, '14.2952706' as Latitude, '120.9176947' as Longitude, 'Test2' as Remarks, '2' as MarkerNo, 'bbb' as MarkerName, 'A,B' as SalesAgent, 'red,green'RouteColor Union SELECT 'yellow' as Color, '14.9692139' as Latitude, '120.9188296' as Longitude, 'Test3' as Remarks, '3' as MarkerNo, 'ccc' as MarkerName, 'A,B' as SalesAgent, 'red,green'RouteColor Union SELECT 'green' as Color, '13.936684' as Latitude, '121.1564816' as Longitude, 'Test4' as Remarks, '4' as MarkerNo, 'ddd' as MarkerName, 'A,B' as SalesAgent, 'red,green' RouteColor Union SELECT 'red' as Color, '14.5860298' as Latitude, '121.0641453' as Longitude, 'Test5' as Remarks, '5' as MarkerNo, 'eee' as MarkerName, 'A,B' as SalesAgent, 'red,green' RouteColor Union SELECT 'yellow' as Color, '14.9924004' as Latitude, '120.6326731' as Longitude, 'Test6' as Remarks, '6' as MarkerNo, 'fff' as MarkerName, 'A,B' as SalesAgent, 'red,green' RouteColor ";
        //qry = "SELECT 'red' as Color, '14.8474867' as Latitude, '120.8238718' as Longitude, 'Test1' as Remarks, '1' as MarkerNo, 'AAA' as MarkerName, 'A,B,C' as SalesAgent, 'red,green,yellow' RouteColor Union SELECT 'red' as Color, '14.2952706' as Latitude, '120.9176947' as Longitude, 'Test2' as Remarks, '2' as MarkerNo, 'bbb' as MarkerName, 'A,B,C' as SalesAgent, 'red,green,yellow'RouteColor Union SELECT 'yellow' as Color, '14.9692139' as Latitude, '120.9188296' as Longitude, 'Test3' as Remarks, '3' as MarkerNo, 'ccc' as MarkerName, 'A,B,C' as SalesAgent, 'red,green,yellow'RouteColor Union SELECT 'green' as Color, '13.936684' as Latitude, '121.1564816' as Longitude, 'Test4' as Remarks, '4' as MarkerNo, 'ddd' as MarkerName, 'A,B,C' as SalesAgent, 'red,green,yellow' RouteColor Union SELECT 'red' as Color, '14.5860298' as Latitude, '121.0641453' as Longitude, 'Test5' as Remarks, '5' as MarkerNo, 'eee' as MarkerName, 'A,B,C' as SalesAgent, 'red,green,yellow' RouteColor Union SELECT 'yellow' as Color, '14.9924004' as Latitude, '120.6326731' as Longitude, 'Test6' as Remarks, '6' as MarkerNo, 'fff' as MarkerName, 'A,B,C' as SalesAgent, 'red,green,yellow' RouteColor ";

        //multi agent - 2 route
        //qry = "SELECT  '14.8474867' as Latitude, '120.8238718' as Longitude, 'Test1' as Remarks, '1' as MarkerNo, 'AAA' as MarkerName, 'A,B' as Agent, 'red,green' Color Union SELECT  '14.2952706' as Latitude, '120.9176947' as Longitude, 'Test2' as Remarks, '2' as MarkerNo, 'bbb' as MarkerName, 'A,B' as Agent, 'red,green'Color Union SELECT  '14.9692139' as Latitude, '120.9188296' as Longitude, 'Test3' as Remarks, '3' as MarkerNo, 'ccc' as MarkerName, 'A,B' as Agent, 'red,green'Color Union SELECT   '13.936684' as Latitude, '121.1564816' as Longitude, 'Test4' as Remarks, '4' as MarkerNo, 'ddd' as MarkerName, 'A,B' as Agent, 'red,green' Color Union SELECT  '14.5860298' as Latitude, '121.0641453' as Longitude, 'Test5' as Remarks, '5' as MarkerNo, 'eee' as MarkerName, 'A,B' as Agent, 'red,green' Color Union SELECT  '14.9924004' as Latitude, '120.6326731' as Longitude, 'Test6' as Remarks, '6' as MarkerNo, 'fff' as MarkerName, 'A,B' as Agent, 'red,green' Color";
        //multi agent - 3 route
        //yes qry = "SELECT  '14.8474867' as Latitude, '120.8238718' as Longitude, 'Test1' as Remarks, '1' as MarkerNo, 'AAA' as MarkerName, 'A,B,C' as Agent, 'red,green,yellow' Color Union SELECT  '14.2952706' as Latitude, '120.9176947' as Longitude, 'Test2' as Remarks, '2' as MarkerNo, 'bbb' as MarkerName, 'A,B,C' as Agent, 'red,green,yellow'Color Union SELECT  '14.9692139' as Latitude, '120.9188296' as Longitude, 'Test3' as Remarks, '3' as MarkerNo, 'ccc' as MarkerName, 'A,B,C' as Agent, 'red,green,yellow'Color Union SELECT   '13.936684' as Latitude, '121.1564816' as Longitude, 'Test4' as Remarks, '4' as MarkerNo, 'ddd' as MarkerName, 'A,B,C' as Agent, 'red,green,yellow' Color Union SELECT  '14.5860298' as Latitude, '121.0641453' as Longitude, 'Test5' as Remarks, '5' as MarkerNo, 'eee' as MarkerName, 'A,B,C' as Agent, 'red,green,yellow' Color Union SELECT  '14.9924004' as Latitude, '120.6326731' as Longitude, 'Test6' as Remarks, '6' as MarkerNo, 'fff' as MarkerName, 'A,B,C' as Agent, 'red,green,yellow' Color";
        //yes qry = "select Latitude, Longitude, TransNo as Remarks, ROW_NUMBER() OVER(ORDER BY(SELECT 1)) as MarkerNo, CustID as MarkerName, 'A' as Agent, 'red' Color from custvisit where convert(date, transdate) = convert(date, '2022-04-02') and custid like 'T5-%' and transtype like 'CLOCK-IN' and agentid like '20733' order by TransDate ";
        if (qry != "undefined undefined undefined" && qry != "") {
            document.getElementById("Duration").value = "";
            document.getElementById("Agent").value = "";
            document.getElementById("Distance").value = "";
            document.getElementById("Outlets").value = "";

            qry = formatQueryString(qry, currentScreenName);
            execute(qry);
            if (executeQry.length > 0)
                pvmb_processdata();
            else {
                LoadingImagePopUpClose();
                alert("No data found");
                return;
            }

        }
        else return;
    }

    executeQry = agentRecords;

    arrLocData = executeQry;
    execlenth = executeQry.length;
    arrLoc = [];
    for (var i = 0; i < execlenth; i++) {
        arrLoc.push(executeQry[i].Latitude + ',' + executeQry[i].Longitude);
        if (i == execlenth - 1) {
            arrLoc.push(executeQry[i].Latitude + ',' + executeQry[i].Longitude);
            var obj = {};
            obj.Color = executeQry[i].Color;
            obj.Latitude = executeQry[i].Latitude;
            obj.Longitude = executeQry[i].Longitude;
            obj.Remarks = executeQry[i].Remarks;
            obj.MarkerNo = executeQry[i].MarkerNo;
            obj.MarkerName = executeQry[i].MarkerName;
            obj.SalesAgent = executeQry[i].SalesAgent == undefined ? "" : executeQry[i].Agent;
            obj.RouteColor = executeQry[i].RouteColor == undefined ? "" : executeQry[i].Color;
            arrLocData.push(obj);
        }
    }
    salesAgentRouteColorArrLoc = [];
    for (var i = 0; i < executeQry.length; i++) {
        if (executeQry[i].Agent != undefined) {
            var salesAgentArr = executeQry[i].Agent.split(',')
            var routeColorArr = executeQry[i].Color.split(',')
            for (var j = 0; j < salesAgentArr.length; j++) {
                salesAgentRouteColorArrLoc.push(salesAgentArr[j] + "," + routeColorArr[j].toLowerCase());
                if (j == (salesAgentArr.length - 1))
                    routeLinecolor = routeColorArr[j].toLowerCase();
            }
        }
        i = executeQry.length + 1;
    }

    //var sScreenName = currentScreenName + "_MapRouteDuration";
    //  var qry = getString['QueryConfig_' + sScreenName];
    // qry += ' ' + getString['QueryConfig_' + sScreenName + '_GroupText'];
    // qry += ' ' + getString['QueryConfig_' + sScreenName + '_OrderText'];

    // if (qry != "undefined undefined undefined" && qry != "") {
    //   // qry = formatQueryString(qry, sScreenName);
    //     execute(qry);

    //     document.getElementById("Duration").value = executeQry[0].Duration;

    //     var agnt = executeQry[0].Agent;
    //     document.getElementById("Agent").value = agnt;



    //}





}


function mapDuration(seconds) {
    var sec_num = seconds;// parseInt(seconds, 10); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    return hours + ':' + minutes + ':' + seconds;
}


function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {

    var R = 6371; // Radius of the earth in km

    var dLat = deg2rad(lat2 - lat1);  // deg2rad below

    var dLon = deg2rad(lon2 - lon1);

    var a =

        Math.sin(dLat / 2) * Math.sin(dLat / 2) +

        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *

        Math.sin(dLon / 2) * Math.sin(dLon / 2)

        ;

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    var d = R * c; // Distance in km

    return d;

}



function deg2rad(deg) {

    return deg * (Math.PI / 180)

}

function pvmb_processdata() {
    problems = '';
    agentRecords = []; planRecords = [];
    var minDT, maxDT;
    var secDur;
    total_outlets = 0;
    totalDistance = 0.0;
    // qry = "select c.CustName,c.Phone,cv.TransType,cv.TransDate,cv.AgentID,cv.Latitude,cv.Longitude from custvisit cv WITH (NOLOCK) inner join Customer c WITH (NOLOCK) on cv.CustID like c.CustNo  where convert(date,cv.transdate)=convert(date,{FormView.Date}) and cv.agentid={FormView.Agent}  order by cv.TransDate";
    // qry = formatQueryString(qry, sScreenName);
    // execute(qry);
    var actualRecords = executeQry;


    var recs;
    var Latitude, Longitude;//, Remarks, MarkerNo, MarkerName, Agent, Color;
    var isStart = false;
    var markerno = 1;
    var clckDur;

    var isClockin = false;
    var isOrderTaken = false;
    var clockinTime;
    var clockouttime;
    var custName, custPhone, custID;
    var isEnd;
    var coutLat, coutLon;
    var dist = 0;
    var ordAmount = 0;
    var expReason = "";
    var markrName = "";
    var beyondDist = 0;

    document.getElementById("Agent").value = actualRecords[0].AgentID;


    qry = "select   m.stopno,m.CustNo,c.CustName,c.Latitude,c.Longitude,n.salesofficeid,n.distributorid,d.distributorname as DistName,d.address as DistAddress,d.city as DistCity,d.phone as DistPhone,s.subdistributorname as SubdistName,s.address as SubdistAddress,s.city as SubdistCity,s.phone as SubdistPhone from MonthlyRoutePlan m inner join Customer c on c.CustNo = m.CustNo inner join nodetree n on m.salesmanterritory=n.salesmanterritory left join subdistributor s on s.subdistributorid=n.salesofficeid left join distributor d on d.distributorid=n.distributorid where m.AgentID like {FormView.Agent} and convert(date,m.RouteDate) = convert(date,{FormView.Date})  order by m.stopno";
    //qry = "select   m.stopno,m.CustNo,c.CustName,c.Latitude,c.Longitude from MonthlyRoutePlan m inner join Customer c on c.CustNo like m.CustNo where m.AgentID like {FormView.Agent} and convert(date,m.RouteDate) = convert(date,{FormView.Date})  order by m.stopno";
    // qry = "select   m.stopno,m.CustNo,c.CustName,avg(cv.Latitude) as Latitude,avg(cv.Longitude) as Longitude from MonthlyRoutePlan m inner join CustVisit cv on cv.CustID like m.CustNo inner join Customer c on c.CustNo like cv.CustID where m.AgentID like {FormView.Agent} and convert(date,m.RouteDate) = convert(date,{FormView.Date}) group by  m.stopno,m.CustNo,c.custname order by m.stopno";
    // qry = "select  * from MonthlyRoutePlan where AgentID like {FormView.Agent} and convert(date,RouteDate) = convert(date,{FormView.Date}) order by stopno";
    qry = formatQueryString(qry, currentScreenName);
    execute(qry);
    planRecords = executeQry;

    var starticon_msg = "";

    try {
        for (var p = 0; p < planRecords.length; p++) {
            createMarker(new google.maps.LatLng(planRecords[p].Latitude, planRecords[p].Longitude), planRecords[p].CustName, 0, 'red', 1, 11, planRecords[p].stopno, 1);
            // createMarker(new google.maps.LatLng(planRecords[p].Latitude, planRecords[p].Longitude), planRecords[p].CustName + "<br>" + planRecords[p].Latitude + "<br>" + planRecords[p].Longitude, 0, 'red', 1, 11, planRecords[p].stopno);
        }
    }
    catch (err) { }//alert(err); }

    try {
        if (planRecords[0].distributorid == planRecords[0].salesofficeid) {
            starticon_msg = "DB Code - <b>" + planRecords[0].distributorid + "</b><br>DB Name - <b>" + planRecords[0].DistName + "</b><br>DB Address - <b>" + planRecords[0].DistAddress + "</b><br>Phone No - <b>" + planRecords[0].DistPhone + "</b><br><br>";
        }
        else {
            starticon_msg = "DB Code - <b>" + planRecords[0].salesofficeid + "</b><br>DB Name - <b>" + planRecords[0].SubdistName + "</b><br>DB Address - <b>" + planRecords[0].SubdistAddress + "</b><br>Phone No - <b>" + planRecords[0].DistPhone + "</b><br><br>";
        }
        
    }
    catch (err) { }

    for (var i = 0; i < actualRecords.length; i++) {

        if (i == (actualRecords.length - 1)) {
            isEnd = true;
            maxDT = actualRecords[i].TransDate;
        }

        if (isStart == false && actualRecords[i].Latitude != 0 && actualRecords[i].Longitude != 0) {
            minDT = actualRecords[i].TransDate;
            try {
                agentRecords.push({
                    "Latitude": actualRecords[i].Latitude,
                    "Longitude": actualRecords[i].Longitude,
                    "Remarks": starticon_msg + "Start Time: <b>" + new Date(actualRecords[i].TransDate).toDateString() + " " + actualRecords[i].TransDate.split("T")[1] + "</b>",
                    "MarkerNo": markerno,
                    "MarkerName": "Start Work",
                    "Agent": actualRecords[i].AgentID,
                    "Color": "Start"
                });
                isStart = true;
                markerno = markerno + 1;
            }
            catch { }
        }

        if (actualRecords[i].TransType == "CLOCK-IN") {
            if (isClockin == false) {

                isClockin = true; isOrderTaken = false;
                clockinTime = actualRecords[i].TransDate;
                custName = actualRecords[i].custname;
                custID = actualRecords[i].CustID;
                custPhone = actualRecords[i].Phone;
                Latitude = actualRecords[i].Latitude;
                Longitude = actualRecords[i].Longitude;

            }
            else {
                isEnd = false; isClockin = false;
                total_outlets = total_outlets + 1;
                clckDur = mapDuration(((new Date(clockouttime) - new Date(clockinTime)) / 1000));
                dist = (getDistanceFromLatLonInKm(Latitude, Longitude, coutLat, coutLon) * 1000).toFixed(2);

                beyondDist = getDistanceFromLatLonInKm(Latitude, Longitude, actualRecords[i].CustLat, actualRecords[i].CustLon);
                beyondDist = beyondDist * 1000;

                if (isOrderTaken == true) {

                    if (beyondDist > 200)
                        markrName = "blue";
                    else
                        markrName = "green";

                    try {
                        agentRecords.push({
                            "Latitude": Latitude,
                            "Longitude": Longitude,
                            "Remarks": "Customer Name: <b>" + custName + "</b><br>Phone: <b>" + custPhone + "</b><br>Clock-In Time: <b>" + new Date(clockinTime).toDateString() + " " + clockinTime.split("T")[1] + "</b><br>Clock-Out Time: <b>" + new Date(clockouttime).toDateString() + " " + clockouttime.split("T")[1] + "</b><br>Duration: <b>" + clckDur + "</b><br>Distance(m): <b>" + beyondDist.toFixed(2) + "</b><br>Order Value: <b>" + ordAmount + "</b><br>Exception Reason: <b>" + expReason + "</b><br>",
                            //"Remarks": "Customer Name: <b>" + custName + "</b><br>Phone: <b>" + custPhone + "</b><br>Clock-In Time: <b>" + new Date(clockinTime).toDateString() + " " + clockinTime.split("T")[1] + "</b><br>Clock-Out Time: <b>" + new Date(clockouttime).toDateString() + " " + clockouttime.split("T")[1] + "</b><br>Duration: <b>" + clckDur + "</b><br>Distance(m): <b>" + dist + "</b><br>Order Value: <b>" + ordAmount + "</b><br>Exception Reason: <b>" + expReason + "</b><br>",
                            "MarkerNo": markerno,
                            "MarkerName": custID,
                            "Agent": actualRecords[i].AgentID,
                            "Color": markrName
                        });
                        isOrderTaken = false;
                        markerno = markerno + 1;
                    }
                    catch { }



                }
                else {

                    if (beyondDist > 200)
                        markrName = "yellow";
                    else
                        markrName = "pink";

                    try {
                        agentRecords.push({
                            "Latitude": Latitude,
                            "Longitude": Longitude,
                            "Remarks": "Customer Name: <b>" + custName + "</b><br>Phone: <b>" + custPhone + "</b><br>Clock-In Time: <b>" + new Date(clockinTime).toDateString() + " " + clockinTime.split("T")[1] + "</b><br>Clock-Out Time: <b>" + new Date(clockouttime).toDateString() + " " + clockouttime.split("T")[1] + "</b><br>Duration: <b>" + clckDur + "</b><br>Distance(m): <b>" + beyondDist.toFixed(2) + "</b><br>Order Value: <b>" + ordAmount + "</b><br>Exception Reason: <b>" + expReason + "</b><br>",
                            //"Remarks": "Customer Name: <b>" + custName + "</b><br>Phone: <b>" + custPhone + "</b><br>Clock-In Time: <b>" + new Date(clockinTime).toDateString() + " " + clockinTime.split("T")[1] + "</b><br>Clock-Out Time: <b>" + new Date(clockouttime).toDateString() + " " + clockouttime.split("T")[1] + "</b><br>Duration: <b>" + clckDur + "</b><br>Distance(m): <b>" + dist + "</b><br>Order Value: <b>" + ordAmount + "</b><br>Exception Reason: <b>" + expReason + "</b><br>",
                            "MarkerNo": markerno,
                            "MarkerName": custID,
                            "Agent": actualRecords[i].AgentID,
                            "Color": markrName
                        });
                        markerno = markerno + 1;
                    }
                    catch { }
                }

                ordAmount = 0; expReason = "";

                planRecords = planRecords;
                //  var rec = planRecords.filter(x => x.CustNo == custID);

                ////  planRecords = planRecords.filter(x => x.CustNo != custID);
                //  try {

                //     // if (rec[0].stopno == 37) {
                //          delMarker(rec[0].stopno);
                //       //   alert(rec[0].stopno);
                //     // }
                //  } catch (e) {
                //    //  alert(e);
                //  }

                isClockin = true; isOrderTaken = false;
                clockinTime = actualRecords[i].TransDate;
                custName = actualRecords[i].custname;
                custID = actualRecords[i].CustID;
                custPhone = actualRecords[i].Phone;
                Latitude = actualRecords[i].Latitude;
                Longitude = actualRecords[i].Longitude;

            }
        }
        else if (actualRecords[i].TransType == "CLOCK-OUT") {
            clockouttime = actualRecords[i].TransDate;
            coutLat = actualRecords[i].CustLat; coutLon = actualRecords[i].CustLon;
        }
        else if (actualRecords[i].TransType.toLowerCase() == "order") {
            isOrderTaken = true; ordAmount = actualRecords[i].OrderAmount;
        }
        else if (actualRecords[i].TransType.toLowerCase() == "service") {
            expReason = actualRecords[i].description;
        }
        else {
            clockouttime = actualRecords[i].TransDate;
        }

        if (isEnd == true) {
            if (isClockin == true) {
                isClockin = false;
                total_outlets = total_outlets + 1;

                clckDur = mapDuration(((new Date(clockouttime) - new Date(clockinTime)) / 1000))
                dist = (getDistanceFromLatLonInKm(Latitude, Longitude, coutLat, coutLon) * 1000).toFixed(2);

                beyondDist = getDistanceFromLatLonInKm(Latitude, Longitude, actualRecords[i].CustLat, actualRecords[i].CustLon);
                beyondDist = beyondDist * 1000;

                if (isOrderTaken == true) {

                    if (beyondDist > 200)
                        markrName = "blue";
                    else
                        markrName = "green";

                    try {
                        agentRecords.push({
                            "Latitude": Latitude,
                            "Longitude": Longitude,
                            "Remarks": "Customer Name: <b>" + custName + "</b><br>Phone: <b>" + custPhone + "</b><br>Clock-In Time: <b>" + new Date(clockinTime).toDateString() + " " + clockinTime.split("T")[1] + "</b><br>Clock-Out Time: <b>" + new Date(clockouttime).toDateString() + " " + clockouttime.split("T")[1] + "</b><br>Duration: <b>" + clckDur + "</b><br>Distance(m): <b>" + dist + "</b><br>Order Value: <b>" + ordAmount + "</b><br>Exception Reason: <b>" + expReason + "</b><br>",
                            //"Remarks": "Customer Name: <b>" + custName + "</b><br>Phone: <b>" + custPhone + "</b><br>Clock-In Time: <b>" + new Date(clockinTime).toDateString() + " " + clockinTime.split("T")[1] + "</b><br>Clock-Out Time: <b>" + new Date(clockouttime).toDateString() + " " + clockouttime.split("T")[1] + "</b><br>Duration: <b>" + clckDur + "</b><br>Distance(m): <b>" + dist + "</b><br>Order Value: <b>" + ordAmount + "</b><br>Exception Reason: <b>" + expReason + "</b><br>Lat: <B>" + Latitude + "</b><br>Lon: <b>" + Longitude + "</b><br>",
                            "MarkerNo": markerno,
                            "MarkerName": custID,
                            "Agent": actualRecords[i].AgentID,
                            "Color": markrName
                        });
                        isOrderTaken = false;
                        markerno = markerno + 1;
                    }
                    catch (err) { }//alert(err); }
                }
                else {

                    if (beyondDist > 200)
                        markrName = "yellow";
                    else
                        markrName = "pink";

                    try {
                        agentRecords.push({
                            "Latitude": Latitude,
                            "Longitude": Longitude,
                            "Remarks": "Customer Name: <b>" + custName + "</b><br>Phone: <b>" + custPhone + "</b><br>Clock-In Time: <b>" + new Date(clockinTime).toDateString() + " " + clockinTime.split("T")[1] + "</b><br>Clock-Out Time: <b>" + new Date(clockouttime).toDateString() + " " + clockouttime.split("T")[1] + "</b><br>Duration: <b>" + clckDur + "</b><br>Distance(m): <b>" + dist + "</b><br>Order Value: <b>" + ordAmount + "</b><br>Exception Reason: <b>" + expReason + "</b><br>",
                            // "Remarks": "Customer Name: <b>" + custName + "</b><br>Phone: <b>" + custPhone + "</b><br>Clock-In Time: <b>" + new Date(clockinTime).toDateString() + " " + clockinTime.split("T")[1] + "</b><br>Clock-Out Time: <b>" + new Date(clockouttime).toDateString() + " " + clockouttime.split("T")[1] + "</b><br>Duration: <b>" + clckDur + "</b><br>Distance(m): <b>" + dist + "</b><br>Order Value: <b>" + ordAmount + "</b><br>Exception Reason: <b>" + expReason + "</b><br>Lat: <B>" + Latitude + "</b><br>Lon: <b>" + Longitude + "</b><br>",
                            "MarkerNo": markerno,
                            "MarkerName": custID,
                            "Agent": actualRecords[i].AgentID,
                            "Color": markrName
                        });
                        markerno = markerno + 1;
                    }
                    catch (err) {// alert(err); 
                    }
                }

                ordAmount = 0; expReason = "";

                planRecords = planRecords;
                //  var rec = planRecords.filter(x => x.CustNo == custID);

                ////  planRecords = planRecords.filter(x => x.CustNo != custID);

                //  try {

                //      // if (rec[0].stopno == 37) {
                //      delMarker(rec[0].stopno);
                //      //   alert(rec[0].stopno);
                //      // }
                //  } catch (e) {
                //      //  alert(e);
                //  }


                isEnd = false;
                try {
                    agentRecords.push({
                        "Latitude": actualRecords[i].Latitude,
                        "Longitude": actualRecords[i].Longitude,
                        "Remarks": "End Time: <b>" + new Date(actualRecords[i].TransDate).toDateString() + " " + actualRecords[i].TransDate.split("T")[1] + "</b>",
                        "MarkerNo": markerno,
                        "MarkerName": "End Work",
                        "Agent": actualRecords[i].AgentID,
                        "Color": "End"
                    });
                    markerno = markerno + 1;
                }
                catch { }
            }
            else {
                isEnd = false;
                try {
                    agentRecords.push({
                        "Latitude": actualRecords[i].Latitude,
                        "Longitude": actualRecords[i].Longitude,
                        "Remarks": "End Time: <b>" + new Date(actualRecords[i].TransDate).toDateString() + " " + actualRecords[i].TransDate.split("T")[1] + "</b>",
                        "MarkerNo": markerno,
                        "MarkerName": "End Work",
                        "Agent": actualRecords[i].AgentID,
                        "Color": "End"
                    });
                    markerno = markerno + 1;
                }
                catch { }
            }

        }

    }

    secDur = (new Date(maxDT) - new Date(minDT)) / 1000;


    document.getElementById("Duration").value = mapDuration(secDur);
    document.getElementById("Outlets").value = total_outlets;

}

function initializeMapRoute(action) {
  //  var latLon = { lat: 23.684994, lng: 90.356331 };//Bangladesh

   // var latLon = { lat: 1.3146631, lng: 103.8454093 };//Singapore

    var latLon = { lat: 14.599512, lng: 120.984222 };//Philippines

    infowindow = new google.maps.InfoWindow(
        {
            size: new google.maps.Size(150, 50)
        });

    var myOptions = {
        zoom: 17,//12//15,
        center: latLon,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

    //var _obj = {};
    //_obj.fieldName = 'MapTimer';
    //PerformAction('timerEventRun', _obj);
    //if (action == undefined) {
    //    if (mapTimer != "") {
    //        setInterval(function () {
    //            PerformAction('timerEventRun', _obj);
    //            _obj = {};
    //            _obj.fieldName = "SubmitBtn";
    //            PerformAction('formButtonClicked', _obj);
    //        }, mapTimer * 1000);
    //    }
    //}

}
var initializeLoaded = false;
function initialize(action) {

    initializeMapRoute(action);
    getLatLonValue(action);

    address = startLoc[0];//'Trinidad and Tobago'
    geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, function (results, status) {
        //geocoder.geocode( {}, function(results, status) {
        if (results != null && results.length != 0)
            map.fitBounds(results[0].geometry.viewport);

    });

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
                infowindow = new google.maps.InfoWindow(
                    {
                        size: new google.maps.Size(150, 50)
                    });

                var myOptions = {
                    zoom: 12,//15,
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
        if (arrLoc.length == 1) {
            for (var i = 0; i < arrLoc.length; i++) {
                //startLoc
                startLoc.push(arrLoc[i]);
                //endLoc
            }
        }
        else {
            for (var i = 0; i < arrLoc.length - 1; i++) {
                //startLoc
                startLoc.push(arrLoc[i]);
                //endLoc
            }
        }
        endLoc = [];
        if (arrLoc.length == 1) {
            for (var i = 0; i < arrLoc.length; i++) {
                //startLoc
                endLoc.push(arrLoc[i]);
                //endLoc
            }
        }
        else {
            for (var i = 1; i < arrLoc.length; i++) {
                //startLoc
                endLoc.push(arrLoc[i]);
                //endLoc
            }
        }

        var liveRecords;

        try {
            isCurrent = false;
           
            qry = "select top 1 agentid,format(CONVERT(date,transdate),'yyyy/MM/dd') as transdate,format(CONVERT(date,getdate()),'yyyy/MM/dd') as curdate,latitude,longitude,datediff(mi,getdate(),transdate) as diff from AgentTracking where AgentID = {FormView.Agent} and convert(date,TransDate) = convert(date,{FormView.Date})  order by transdate desc;";
            // qry = "select   m.stopno,m.CustNo,c.CustName,avg(cv.Latitude) as Latitude,avg(cv.Longitude) as Longitude from MonthlyRoutePlan m inner join CustVisit cv on cv.CustID like m.CustNo inner join Customer c on c.CustNo like cv.CustID where m.AgentID like {FormView.Agent} and convert(date,m.RouteDate) = convert(date,{FormView.Date}) group by  m.stopno,m.CustNo,c.custname order by m.stopno";
            // qry = "select  * from MonthlyRoutePlan where AgentID like {FormView.Agent} and convert(date,RouteDate) = convert(date,{FormView.Date}) order by stopno";
            qry = formatQueryString(qry, currentScreenName);
            execute(qry);
            liveRecords = executeQry;

            var curdate = liveRecords[0].curdate;//new Date().toJSON().slice(0, 10).replace(/-/g, '/');
            var transdate = liveRecords[0].transdate;//.toJSON().slice(0, 10).replace(/-/g, '/');
            console.log('transdate- ' + liveRecords[0].transdate);
            console.log('diff- ' + liveRecords[0].transdate);

           
            if (transdate == curdate) 
                isCurrent = true;

        }
        catch { }

        setRoutes();


        try {
          
            //var liveRecords;
            //qry = "select top 1 agentid,format(CONVERT(date,transdate),'yyyy/MM/dd') as transdate,format(CONVERT(date,getdate()),'yyyy/MM/dd') as curdate,latitude,longitude,datediff(mi,getdate(),transdate) as diff from AgentTracking where AgentID = {FormView.Agent} and convert(date,TransDate) = convert(date,{FormView.Date})  order by transdate desc;";
            //// qry = "select   m.stopno,m.CustNo,c.CustName,avg(cv.Latitude) as Latitude,avg(cv.Longitude) as Longitude from MonthlyRoutePlan m inner join CustVisit cv on cv.CustID like m.CustNo inner join Customer c on c.CustNo like cv.CustID where m.AgentID like {FormView.Agent} and convert(date,m.RouteDate) = convert(date,{FormView.Date}) group by  m.stopno,m.CustNo,c.custname order by m.stopno";
            //// qry = "select  * from MonthlyRoutePlan where AgentID like {FormView.Agent} and convert(date,RouteDate) = convert(date,{FormView.Date}) order by stopno";
            //qry = formatQueryString(qry, currentScreenName);
            //execute(qry);
            //liveRecords = executeQry;

            var curdate = liveRecords[0].curdate;//new Date().toJSON().slice(0, 10).replace(/-/g, '/');
            var transdate = liveRecords[0].transdate;//.toJSON().slice(0, 10).replace(/-/g, '/');
            console.log('transdate- ' + liveRecords[0].transdate);
            console.log('diff- ' + liveRecords[0].transdate);

            var num = planRecords.length + 1;



            if (transdate == curdate) {
                isCurrent = true;
               if (liveRecords[0].diff > 20)
                    createMarker(new google.maps.LatLng(liveRecords[0].latitude, liveRecords[0].longitude), 'GPS OFF', 0, 'black', 1, 11, num, 1);
                else
                    createMarker(new google.maps.LatLng(liveRecords[0].latitude, liveRecords[0].longitude), 'Current Location', 0, 'End', 1, 11, num, 1);
            }

        }
        catch { }

        //alert(err);}
        //if (routemap_query != "undefined undefined undefined" && routemap_query != "") {
        //    var sScreenName = currentScreenName + "_MapRoute2";
        //    var qry = getString['QueryConfig_' + sScreenName];
        //    qry += ' ' + getString['QueryConfig_' + sScreenName + '_GroupText'];
        //    qry += ' ' + getString['QueryConfig_' + sScreenName + '_OrderText'];

        //    if (qry != "undefined undefined undefined" && qry != "") {
        //        // qry = formatQueryString(qry, sScreenName);
        //        execute(qry);

        //        if (executeQry.length > 0) {
        //            arrLocData = executeQry;
        //            execlenth = executeQry.length;
        //            arrLoc = [];
        //            for (var i = 0; i < execlenth; i++) {
        //                arrLoc.push(executeQry[i].Latitude + ',' + executeQry[i].Longitude);
        //                if (i == execlenth - 1) {
        //                    arrLoc.push(executeQry[i].Latitude + ',' + executeQry[i].Longitude);
        //                    var obj = {};
        //                    obj.Color = executeQry[i].Color;
        //                    obj.Latitude = executeQry[i].Latitude;
        //                    obj.Longitude = executeQry[i].Longitude;
        //                    obj.Remarks = executeQry[i].Remarks;
        //                    obj.MarkerNo = executeQry[i].MarkerNo;
        //                    obj.MarkerName = executeQry[i].MarkerName;
        //                    obj.SalesAgent = executeQry[i].SalesAgent == undefined ? "" : executeQry[i].Agent;
        //                    obj.RouteColor = executeQry[i].RouteColor == undefined ? "" : executeQry[i].Color;
        //                    arrLocData.push(obj);
        //                }
        //            }
        //            salesAgentRouteColorArrLoc = [];
        //            for (var i = 0; i < executeQry.length; i++) {
        //                if (executeQry[i].Agent != undefined) {
        //                    var salesAgentArr = executeQry[i].Agent.split(',')
        //                    var routeColorArr = executeQry[i].Color.split(',')
        //                    for (var j = 0; j < salesAgentArr.length; j++) {
        //                        salesAgentRouteColorArrLoc.push(salesAgentArr[j] + "," + routeColorArr[j].toLowerCase());
        //                        if (j == (salesAgentArr.length - 1))
        //                            routeLinecolor = routeColorArr[j].toLowerCase();
        //                    }
        //                }
        //                i = executeQry.length + 1;
        //            }
        //        }

        //        startLoc = [];
        //        if (arrLoc.length == 1) {
        //            for (var i = 0; i < arrLoc.length; i++) {
        //                //startLoc
        //                startLoc.push(arrLoc[i]);
        //                //endLoc
        //            }
        //        }
        //        else {
        //            for (var i = 0; i < arrLoc.length - 1; i++) {
        //                //startLoc
        //                startLoc.push(arrLoc[i]);
        //                //endLoc
        //            }
        //        }
        //        endLoc = [];
        //        if (arrLoc.length == 1) {
        //            for (var i = 0; i < arrLoc.length; i++) {
        //                //startLoc
        //                endLoc.push(arrLoc[i]);
        //                //endLoc
        //            }
        //        }
        //        else {
        //            for (var i = 1; i < arrLoc.length; i++) {
        //                //startLoc
        //                endLoc.push(arrLoc[i]);
        //                //endLoc
        //            }
        //        }
        //        setRoutes();
        //    }
        //}

    }

}




var size1 = 50;
var size2 = 50;
var lineSymbol = "";
function createMarker(latlng, label, html, color, moveMarker, markerSize, rnum, custID) {
    if (markerSize == 11 && isPoly3 == true) {
        size1 = 70;
        size2 = 70;
    }
    if (markerSize == 1) {
        size1 = 40;
        size2 = 40;
    }
    else if (markerSize == 2) {
        size1 = 50;
        size2 = 50;
    }
    else if (markerSize == 3) {
        size1 = 60;
        size2 = 60;
    }
    else if (markerSize == 4) {
        size1 = 95;
        size2 = 95;
    }
    var iconurl = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
    if (color == "green")
        iconurl = "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
    else if (color == "yellow")
        iconurl = "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png";
    else if (color == "red")
        iconurl = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";

    if (moveMarker == 1) {
        lineSymbol = "";
    }
    else {
        lineSymbol = {
            path: google.maps.SymbolPath.CIRCLE,
            // path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
            scale: 7,
            strokeColor: '#005db5',
            //strokeColor: "yellow",
            strokeWidth: '#005db5',
            //icon: 'https://maps.google.com/mapfiles/ms/icons/truck.png',

        };
    }


    var icon1 = {
        url: iconurl,//"http://maps.google.com/mapfiles/ms/icons/red-dot.png", // url
        scaledSize: new google.maps.Size(size1, size2), // scaled size
        //origin: new google.maps.Point(0, 0), // origin
        //anchor: new google.maps.Point(0, 0) // anchor
    };

    icon1 = getMarkerImage(color);
    //if (isPoly2 == false)
    //   icon1 = lineSymbol;
    var lbl = ' ';
    if (rnum != undefined)
        lbl = lbl + (rnum + 1);

    var contentString = '<b>' + label + '</b>';//<br>' + html;

    // alert("createMarker("+latlng+","+label+","+html+","+color+")");


    if (html != 0 && rnum != undefined) {

        var rec = planRecords.filter(x => x.CustNo == custID);

        try {

            // if (rec[0].stopno == 37) {
            delMarker(rec[0].stopno);
            //   alert(rec[0].stopno);
            // }
        } catch (e) {
            //  alert(e);
        }


        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            draggable: true,
            label: {

                text: lbl,
                className: 'marker-label',

            },
            //title: label,
            //icon: lineSymbol,
            //icon: iconurl,
            zIndex: 0,
            icon: icon1
            //icon: 'https://maps.google.com/mapfiles/ms/icons/truck.png',
           // zIndex: Math.round(latlng.lat() * -100000) << 5
        });
        marker.myname = label;
    }
    else {
        var marker = new google.maps.Marker({
            id: rnum,
            position: latlng,
            map: map,
            draggable: true,
            //title: label,
            //icon: lineSymbol,
            //icon: iconurl,
            icon: icon1,
            zIndex: 0
            //icon: 'https://maps.google.com/mapfiles/ms/icons/truck.png',
           // zIndex: Math.round(latlng.lat() * -100000) << 5
        });
        marker.myname = rnum;
        if (label != 'current location')
        markers[rnum] = marker;
    }


    // marker.myname = label;
    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(contentString);
        infowindow.open(map, marker);
        MapRouteClickEvent();
    });
    return marker;
}

var delMarker = function (id) {
    var marker = markers[id];
    marker.setMap(null);
}

var delayFactor = 0;
var legsCnt = 0;
var labelText1 = "";
var labelText2 = "";
var labelText3 = "";
var labelText4 = "";


function setRoutes() {
    var directionsDisplay = new Array();
    const lineSymbol = {
        // path: "M 0,-1 0, 1",
        path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
        strokeOpacity: 1,
        scale: 2,
    };

    for (var i = dPinIndex; i <= dPinIndex; i++) {
        var rendererOptions = {
            map: map,
            suppressMarkers: true,
            preserveViewport: true,
            polylineOptions: {
                strokeOpacity: 0,
                strokeWeight: 3,
                icons: [
                    {
                        icon: lineSymbol,
                        offset: "0",
                        repeat: "20px",
                    },
                ],
                // strokeColor: 'red'
            } //routeLinecolor }// "yellow" }
        }
        directionsService = new google.maps.DirectionsService();
        var travelMode = google.maps.DirectionsTravelMode.DRIVING;
        //var t = i;
        //if (problems != "") {
        //    t = t + 1;//continue;
        //}
       
            try {
                var request = {
                    origin: startLoc[i],
                    destination: endLoc[i],
                    optimizeWaypoints: true,
                    travelMode: travelMode
                };
                directionsService.route(request, makeRouteCallback(i, directionsDisplay[i]));


                try {
                    document.getElementById("Distance").value = totalDistance.toFixed(2);//(totalDistance / 1000).toFixed(2);
                } catch (err) {

                }

            } catch (e) {

            }
        

    }

    var tmpCount = 0;

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

                const lineSymbol = {
                    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                    //path: "M 0,-1 0, 1",
                    strokeOpacity: 1,
                    scale: 2,
                };

                polyline[routeNum] = new google.maps.Polyline({
                    path: [],
                    //// strokeColor: '#FF00FF',
                    //strokeColor: 'blue',
                    //strokeWeight: 3,
                    //fillColor: 'red',//'#FF0000',
                    //fillOpacity: 0.35
                    strokeOpacity: 0,
                    strokeWeight: 3,
                    icons: [
                        {
                            icon: lineSymbol,
                            offset: "0",
                            repeat: "20px",
                        },
                    ],

                });

                for (var n = 0; n < salesAgentRouteColorArrLoc.length; n++) {
                    var colr = salesAgentRouteColorArrLoc[n].split(',')[1];
                    //if (routeNum == 0) {
                    //    polyline[routeNum] = new gsoogle.maps.Polyline({
                    //        path: [],
                    //        strokeColor: "yellow",
                    //        strokeWeight: 5,
                    //    });
                    //    pinColor1 = "green";
                    //}
                    //else {
                    //pinColor2 = "green";

                    if (n == 0) {
                        polyline[routeNum] = new google.maps.Polyline({
                            path: [],
                            //strokeColor: 'red',
                            //    strokeWeight: 3,
                            strokeOpacity: 0,
                            strokeWeight: 3,
                            icons: [
                                {
                                    icon: lineSymbol,
                                    offset: "0",
                                    repeat: "20px",
                                },
                            ],
                        });
                        if (routeNum == 0)
                            pinColor1 = "start";
                        else if (routeNum == (execlenth - 1))
                            pinColor1 = "end";
                        else
                            pinColor1 = "yellow";

                        pinColor1 = agentRecords[routeNum].Color;

                    }
                    else if (n == 1) {
                        poly2[routeNum] = new google.maps.Polyline({
                            path: [],
                            strokeColor: colr,
                            strokeWeight: 10,
                        });
                        isPoly2 = true;
                        pinColor2 = colr;
                    }
                    else if (n == 2) {
                        poly3[routeNum] = new google.maps.Polyline({
                            path: [],
                            strokeColor: colr,
                            strokeWeight: 5,
                        });
                        isPoly3 = true;
                        pinColor3 = colr;
                    }
                    else if (n == 3) {
                        poly4[routeNum] = new google.maps.Polyline({
                            path: [],
                            strokeColor: colr,
                            strokeWeight: 5,
                        });
                        isPoly4 = true;
                        pinColor4 = colr;
                    }
                    // }
                }
                // For each route, display summary information.
                var path = response.routes[0].overview_path;
                var legs = response.routes[0].legs;

                disp = new google.maps.DirectionsRenderer(rendererOptions);
                disp.setMap(map);
                disp.setDirections(response);
                //disp.setOptions({ suppressMarkers: true });

                //Markers
                for (i = 0; i < legs.length; i++) {
                    labelText1 = arrLocData[legsCnt].Remarks;//.MarkerName;
                    labelText2 = "";
                    //if (arrLocData[legsCnt].Agent != undefined) {
                    //    labelText1 = arrLocData[legsCnt].Agent.split(',')[0];
                    //    if (isPoly2 == true)
                    //        labelText2 = arrLocData[legsCnt].Agent.split(',')[1];
                    //    if (isPoly3 == true)
                    //        labelText3 = arrLocData[legsCnt].Agent.split(',')[2];
                    //    if (isPoly4 == true)
                    //        labelText4 = arrLocData[legsCnt].Agent.split(',')[3];
                    //}

                    if (i == 0) {
                        startLocation[routeNum].latlng = legs[i].start_location;
                        startLocation[routeNum].address = legs[i].start_address;

                        totalDistance += getDistanceFromLatLonInKm(legs[i].start_location.lat(), legs[i].start_location.lng(), legs[i].end_location.lat(), legs[i].end_location.lng());


                        //totalDistance += legs[i].distance.value;
                        totalDuration += legs[i].duration.value;


                        // marker = google.maps.Marker({map:map,position: startLocation.latlng});
                        //marker[routeNum] = createMarker(legs[i].start_location, "start", legs[i].start_address, "green", 1);
                        //marker[routeNum] = createMarker(legs[i].start_location, arrLocData[legsCnt].MarkerNo, legs[i].start_address, arrLocData[i].Color, 1);

                        if (agentRecords[routeNum].Color == 'End' && agentRecords[routeNum].Color == agentRecords[routeNum + 1].Color)
                            console.log("skip");
                        else if (isCurrent == true && agentRecords[routeNum].Color == 'End')
                            console.log("skip");
                        else
                            marker[routeNum] = createMarker(legs[i].start_location, labelText1, legs[i].start_address, pinColor1, 1, 11, routeNum, arrLocData[legsCnt].MarkerName);

                        if (isPoly2 == true) marker[routeNum] = createMarker(legs[i].start_location, labelText2, legs[i].start_address, pinColor2, 1, 2);
                        if (isPoly3 == true) marker[routeNum] = createMarker(legs[i].start_location, labelText3, legs[i].start_address, pinColor3, 1, 3);
                        if (isPoly4 == true) marker[routeNum] = createMarker(legs[i].start_location, labelText4, legs[i].start_address, pinColor4, 1, 4);

                        //if (isPoly4 == true) marker[routeNum] = createMarker(legs[i].start_location, labelText4, legs[i].start_address, pinColor4, 1, 4);
                        //if (isPoly3 == true) marker[routeNum] = createMarker(legs[i].start_location, labelText3, legs[i].start_address, pinColor3, 1, 3);
                        //if (isPoly2 == true) marker[routeNum] = createMarker(legs[i].start_location, labelText2, legs[i].start_address, pinColor2, 1, 2);
                        //marker[routeNum] = createMarker(legs[i].start_location, labelText1, legs[i].start_address, pinColor1, 1, 1);

                    }
                    // alert(routeNum + " : " + arrLoc.length);
                    //todo
                   
                   if (isCurrent == false && routeNum == (arrLoc.length - 2)) {
                        endLocation[routeNum].latlng = legs[i].end_location;
                        endLocation[routeNum].address = legs[i].end_address;
                        // marker[routeNum] = createMarker(legs[i].start_location, "start", legs[i].start_address, "green", 1);
                        //marker[routeNum] = createMarker(legs[i].start_location, arrLocData[(legsCnt + 1)].MarkerNo, legs[i].start_address, arrLocData[i].Color, 1);
                        if (isPoly4 == true) marker[routeNum] = createMarker(legs[i].start_location, labelText4, legs[i].start_address, pinColor4, 1, 4);
                        if (isPoly3 == true) marker[routeNum] = createMarker(legs[i].start_location, labelText3, legs[i].start_address, pinColor3, 1, 3);
                        if (isPoly2 == true) marker[routeNum] = createMarker(legs[i].start_location, labelText2, legs[i].start_address, pinColor2, 1, 2);
                        if (isPoly3 != true) marker[routeNum] = createMarker(legs[i].start_location, labelText1, legs[i].start_address, pinColor1, 1, 1);

                    }
                    else {
                        // marker[routeNum] = createMarker(legs[i].start_location, "start", legs[i].start_address, "green", 0);  
                        //marker[routeNum] = createMarker(legs[i].start_location, arrLocData[legsCnt].MarkerNo, legs[i].start_address, arrLocData[i].Color, 0);
                        marker[routeNum] = createMarker(legs[i].start_location, labelText1, legs[i].start_address, pinColor1, 0, 1);
                        if (isPoly2 == true) marker[routeNum] = createMarker(legs[i].start_location, labelText2, legs[i].start_address, pinColor2, 0, 2);
                        if (isPoly3 == true) marker[routeNum] = createMarker(legs[i].start_location, labelText3, legs[i].start_address, pinColor3, 0, 3);
                        if (isPoly4 == true) marker[routeNum] = createMarker(legs[i].start_location, labelText4, legs[i].start_address, pinColor4, 0, 4);

                        //if (isPoly4 == true) marker[routeNum] = createMarker(legs[i].start_location, labelText4, legs[i].start_address, pinColor4, 0, 4);
                        //if (isPoly3 == true) marker[routeNum] = createMarker(legs[i].start_location, labelText3, legs[i].start_address, pinColor3, 0, 3);
                        //if (isPoly2 == true) marker[routeNum] = createMarker(legs[i].start_location, labelText2, legs[i].start_address, pinColor2, 0, 2);
                        //marker[routeNum] = createMarker(legs[i].start_location, labelText1, legs[i].start_address, pinColor1, 0, 1);
                    }
                

                    var steps = legs[i].steps;
                    for (j = 0; j < steps.length; j++) {
                        var nextSegment = steps[j].path;
                        var nextSegment = steps[j].path;

                        for (k = 0; k < nextSegment.length; k++) {
                            polyline[routeNum].getPath().push(nextSegment[k]);
                            if (isPoly2 == true) poly2[routeNum].getPath().push(nextSegment[k]);
                            if (isPoly3 == true) poly3[routeNum].getPath().push(nextSegment[k]);
                            if (isPoly4 == true) poly4[routeNum].getPath().push(nextSegment[k]);
                            //bounds.extend(nextSegment[k]);
                        }
                    }
                    tmpCount = 1;
                }
                legsCnt++;
                polyline[routeNum].setMap(map);
                if (isPoly2 == true) poly2[routeNum].setMap(map);
                if (isPoly3 == true) poly3[routeNum].setMap(map);
                if (isPoly4 == true) poly4[routeNum].setMap(map);
                //polyline[routeNum].setOptions({ strokeColor: 'red' });

                //polyline[routeNum].setZIndex(0);
                //polyline[routeNum].setColor("red");

                //polyl2[routeNum].setMap(map);
                //map.fitBounds(bounds);
                if (dPinIndex == routeNum) {
                    startAnimation(routeNum);
                }
            }
            else if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
                delayFactor++;
                setTimeout(function () {
                    LoadingImagePopUpClose();
                    alert("Directions request failed: " + status);
                    setRoutes();
                }, delayFactor * 1000);
            }
            else {
               // alert("Directions request failed: " + status);
                problems = problems + "," + (i - 1) + ",";
                startLoc.splice((i - 1), 1);
                endLoc.splice((i - 1), 1);
                agentRecords1 = agentRecords;
                agentRecords1.splice((i - 1), 1);

                setRoutes1();
            }
        }
    }
}


function setRoutes1() {
   // routeNum = 0;
    var directionsDisplay = new Array();
    const lineSymbol = {
        // path: "M 0,-1 0, 1",
        path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
        strokeOpacity: 1,
        scale: 2,
    };

    for (var i = dPinIndex; i <= dPinIndex; i++) {
        var rendererOptions = {
            map: map,
            suppressMarkers: true,
            preserveViewport: true,
            polylineOptions: {
                strokeOpacity: 0,
                strokeWeight: 3,
                icons: [
                    {
                        icon: lineSymbol,
                        offset: "0",
                        repeat: "20px",
                    },
                ],
                // strokeColor: 'red'
            } //routeLinecolor }// "yellow" }
        }
        directionsService = new google.maps.DirectionsService();
        var travelMode = google.maps.DirectionsTravelMode.DRIVING;
       

        try {
            var request = {
                origin: startLoc[i],
                destination: endLoc[i],
                optimizeWaypoints: true,
                travelMode: travelMode
            };
            directionsService.route(request, makeRouteCallback1(i, directionsDisplay[i]));


            try {
                document.getElementById("Distance").value = totalDistance.toFixed(2);//(totalDistance / 1000).toFixed(2);
            } catch (err) {

            }

        } catch (e) {

        }


    }

    var tmpCount = 0;

    function makeRouteCallback1(routeNum, disp) {
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

                const lineSymbol = {
                    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                    //path: "M 0,-1 0, 1",
                    strokeOpacity: 1,
                    scale: 2,
                };

                polyline[routeNum] = new google.maps.Polyline({
                    path: [],
                    //// strokeColor: '#FF00FF',
                    //strokeColor: 'blue',
                    //strokeWeight: 3,
                    //fillColor: 'red',//'#FF0000',
                    //fillOpacity: 0.35
                    strokeOpacity: 0,
                    strokeWeight: 3,
                    icons: [
                        {
                            icon: lineSymbol,
                            offset: "0",
                            repeat: "20px",
                        },
                    ],

                });

                for (var n = 0; n < salesAgentRouteColorArrLoc.length; n++) {
                    var colr = salesAgentRouteColorArrLoc[n].split(',')[1];
                    //if (routeNum == 0) {
                    //    polyline[routeNum] = new gsoogle.maps.Polyline({
                    //        path: [],
                    //        strokeColor: "yellow",
                    //        strokeWeight: 5,
                    //    });
                    //    pinColor1 = "green";
                    //}
                    //else {
                    //pinColor2 = "green";

                    if (n == 0) {
                        polyline[routeNum] = new google.maps.Polyline({
                            path: [],
                            //strokeColor: 'red',
                            //    strokeWeight: 3,
                            strokeOpacity: 0,
                            strokeWeight: 3,
                            icons: [
                                {
                                    icon: lineSymbol,
                                    offset: "0",
                                    repeat: "20px",
                                },
                            ],
                        });
                        if (routeNum == 0)
                            pinColor1 = "start";
                        else if (routeNum == (execlenth - 1))
                            pinColor1 = "end";
                        else
                            pinColor1 = "yellow";

                        pinColor1 = agentRecords[routeNum].Color;

                    }
                    else if (n == 1) {
                        poly2[routeNum] = new google.maps.Polyline({
                            path: [],
                            strokeColor: colr,
                            strokeWeight: 10,
                        });
                        isPoly2 = true;
                        pinColor2 = colr;
                    }
                    else if (n == 2) {
                        poly3[routeNum] = new google.maps.Polyline({
                            path: [],
                            strokeColor: colr,
                            strokeWeight: 5,
                        });
                        isPoly3 = true;
                        pinColor3 = colr;
                    }
                    else if (n == 3) {
                        poly4[routeNum] = new google.maps.Polyline({
                            path: [],
                            strokeColor: colr,
                            strokeWeight: 5,
                        });
                        isPoly4 = true;
                        pinColor4 = colr;
                    }
                    // }
                }
                // For each route, display summary information.
                var path = response.routes[0].overview_path;
                var legs = response.routes[0].legs;

                disp = new google.maps.DirectionsRenderer(rendererOptions);
                disp.setMap(map);
                disp.setDirections(response);
                //disp.setOptions({ suppressMarkers: true });

                //Markers
                for (i = 0; i < legs.length; i++) {
                    labelText1 = arrLocData[legsCnt].Remarks;//.MarkerName;
                    labelText2 = "";
                    //if (arrLocData[legsCnt].Agent != undefined) {
                    //    labelText1 = arrLocData[legsCnt].Agent.split(',')[0];
                    //    if (isPoly2 == true)
                    //        labelText2 = arrLocData[legsCnt].Agent.split(',')[1];
                    //    if (isPoly3 == true)
                    //        labelText3 = arrLocData[legsCnt].Agent.split(',')[2];
                    //    if (isPoly4 == true)
                    //        labelText4 = arrLocData[legsCnt].Agent.split(',')[3];
                    //}

                    if (i == 0) {
                        startLocation[routeNum].latlng = legs[i].start_location;
                        startLocation[routeNum].address = legs[i].start_address;

                        totalDistance += getDistanceFromLatLonInKm(legs[i].start_location.lat(), legs[i].start_location.lng(), legs[i].end_location.lat(), legs[i].end_location.lng());


                        //totalDistance += legs[i].distance.value;
                        totalDuration += legs[i].duration.value;


                        // marker = google.maps.Marker({map:map,position: startLocation.latlng});
                        //marker[routeNum] = createMarker(legs[i].start_location, "start", legs[i].start_address, "green", 1);
                        //marker[routeNum] = createMarker(legs[i].start_location, arrLocData[legsCnt].MarkerNo, legs[i].start_address, arrLocData[i].Color, 1);

                        if (agentRecords[routeNum].Color == 'End' && agentRecords[routeNum].Color == agentRecords[routeNum + 1].Color)
                            console.log("skip");
                        else if (isCurrent == true && agentRecords[routeNum].Color == 'End')
                            console.log("skip");
                        else
                            marker[routeNum] = createMarker(legs[i].start_location, labelText1, legs[i].start_address, pinColor1, 1, 11, routeNum, arrLocData[legsCnt].MarkerName);

                        if (isPoly2 == true) marker[routeNum] = createMarker(legs[i].start_location, labelText2, legs[i].start_address, pinColor2, 1, 2);
                        if (isPoly3 == true) marker[routeNum] = createMarker(legs[i].start_location, labelText3, legs[i].start_address, pinColor3, 1, 3);
                        if (isPoly4 == true) marker[routeNum] = createMarker(legs[i].start_location, labelText4, legs[i].start_address, pinColor4, 1, 4);

                        //if (isPoly4 == true) marker[routeNum] = createMarker(legs[i].start_location, labelText4, legs[i].start_address, pinColor4, 1, 4);
                        //if (isPoly3 == true) marker[routeNum] = createMarker(legs[i].start_location, labelText3, legs[i].start_address, pinColor3, 1, 3);
                        //if (isPoly2 == true) marker[routeNum] = createMarker(legs[i].start_location, labelText2, legs[i].start_address, pinColor2, 1, 2);
                        //marker[routeNum] = createMarker(legs[i].start_location, labelText1, legs[i].start_address, pinColor1, 1, 1);

                    }
                    // alert(routeNum + " : " + arrLoc.length);
                    //todo
                    if (routeNum == (arrLoc.length - 2)) {
                        endLocation[routeNum].latlng = legs[i].end_location;
                        endLocation[routeNum].address = legs[i].end_address;
                        // marker[routeNum] = createMarker(legs[i].start_location, "start", legs[i].start_address, "green", 1);
                        //marker[routeNum] = createMarker(legs[i].start_location, arrLocData[(legsCnt + 1)].MarkerNo, legs[i].start_address, arrLocData[i].Color, 1);
                        if (isPoly4 == true) marker[routeNum] = createMarker(legs[i].start_location, labelText4, legs[i].start_address, pinColor4, 1, 4);
                        if (isPoly3 == true) marker[routeNum] = createMarker(legs[i].start_location, labelText3, legs[i].start_address, pinColor3, 1, 3);
                        if (isPoly2 == true) marker[routeNum] = createMarker(legs[i].start_location, labelText2, legs[i].start_address, pinColor2, 1, 2);
                        if (isPoly3 != true) marker[routeNum] = createMarker(legs[i].start_location, labelText1, legs[i].start_address, pinColor1, 1, 1);

                    }
                    else {
                        // marker[routeNum] = createMarker(legs[i].start_location, "start", legs[i].start_address, "green", 0);  
                        //marker[routeNum] = createMarker(legs[i].start_location, arrLocData[legsCnt].MarkerNo, legs[i].start_address, arrLocData[i].Color, 0);
                        marker[routeNum] = createMarker(legs[i].start_location, labelText1, legs[i].start_address, pinColor1, 0, 1);
                        if (isPoly2 == true) marker[routeNum] = createMarker(legs[i].start_location, labelText2, legs[i].start_address, pinColor2, 0, 2);
                        if (isPoly3 == true) marker[routeNum] = createMarker(legs[i].start_location, labelText3, legs[i].start_address, pinColor3, 0, 3);
                        if (isPoly4 == true) marker[routeNum] = createMarker(legs[i].start_location, labelText4, legs[i].start_address, pinColor4, 0, 4);

                        //if (isPoly4 == true) marker[routeNum] = createMarker(legs[i].start_location, labelText4, legs[i].start_address, pinColor4, 0, 4);
                        //if (isPoly3 == true) marker[routeNum] = createMarker(legs[i].start_location, labelText3, legs[i].start_address, pinColor3, 0, 3);
                        //if (isPoly2 == true) marker[routeNum] = createMarker(legs[i].start_location, labelText2, legs[i].start_address, pinColor2, 0, 2);
                        //marker[routeNum] = createMarker(legs[i].start_location, labelText1, legs[i].start_address, pinColor1, 0, 1);
                    }

                    var steps = legs[i].steps;
                    for (j = 0; j < steps.length; j++) {
                        var nextSegment = steps[j].path;
                        var nextSegment = steps[j].path;

                        for (k = 0; k < nextSegment.length; k++) {
                            polyline[routeNum].getPath().push(nextSegment[k]);
                            if (isPoly2 == true) poly2[routeNum].getPath().push(nextSegment[k]);
                            if (isPoly3 == true) poly3[routeNum].getPath().push(nextSegment[k]);
                            if (isPoly4 == true) poly4[routeNum].getPath().push(nextSegment[k]);
                            //bounds.extend(nextSegment[k]);
                        }
                    }
                    tmpCount = 1;
                }
                legsCnt++;
                polyline[routeNum].setMap(map);
                if (isPoly2 == true) poly2[routeNum].setMap(map);
                if (isPoly3 == true) poly3[routeNum].setMap(map);
                if (isPoly4 == true) poly4[routeNum].setMap(map);
                //polyline[routeNum].setOptions({ strokeColor: 'red' });

                //polyline[routeNum].setZIndex(0);
                //polyline[routeNum].setColor("red");

                //polyl2[routeNum].setMap(map);
                //map.fitBounds(bounds);
                if (dPinIndex == routeNum) {
                    startAnimation(routeNum);
                }
            }
            else if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
                delayFactor++;
                setTimeout(function () {
                    alert("Directions request failed: " + status);
                    setRoutes1();
                }, delayFactor * 1000);
            }
            else {
                LoadingImagePopUpClose();
                 alert("Directions request failed: " + status);
              //  problems = problems + "," + (i - 1) + ",";

                //setRoutes1();
            }
        }
    }
}


function MapRouteClickEvent() {

}
var lastVertex = 1;
var stepnum = 0;
var step = 5000;//1000//50; // 5; // metres
var tick = 1;//100; // milliseconds
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

            //testdelayFactor++;
            //setTimeout(function () {
            //    setRoutes();
            //}, 1000);
            //todo
            if (problems != '')
                setRoutes1();
            else
                setRoutes();

        }
        if (marker[index] != undefined)
            marker[index].setPosition(endLocation[index].latlng);
        return;
    }
    var p = polyline[index].GetPointAtDistance(d);
    //var p2 = poly2[index].GetPointAtDistance(d);

    //map.panTo(p);
    marker[index].setPosition(p);
    //marker[index].setPosition(p2);

    if (isPoly2 == true) {
        var p2 = poly2[index].GetPointAtDistance(d);
        marker[index].setPosition(p2);
    }
    if (isPoly3 == true) {
        var p3 = poly3[index].GetPointAtDistance(d);
        marker[index].setPosition(p3);
    }
    if (isPoly4 == true) {
        var p4 = poly3[index].GetPointAtDistance(d);
        marker[index].setPosition(p4);
    }
    //updatePoly(index, d);//todo1
    timerHandle[index] = setTimeout("animate(" + index + "," + (d + step) + ")", tick);
    // timerHandle[index] = animate(index, (d + step));
}

//-------------------------------------------------------------------------

function startAnimation(index) {
    if (timerHandle[index]) clearTimeout(timerHandle[index]);
    eol[index] = polyline[index].Distance();
    map.setCenter(polyline[index].getPath().getAt(0));
    if (isPoly2 == true) map.setCenter(poly2[index].getPath().getAt(0));

    //  poly2[index] = new google.maps.Polyline({ path: [polyline[index].getPath().getAt(0)], strokeColor: "#FFFF00", strokeWeight: 3 });
    //todo1
    //poly2[index] = new google.maps.Polyline({ path: [polyline[index].getPath().getAt(0)], strokeColor: "red",   strokeWeight: 3 });
    //poly2[index] = new google.maps.Polyline({ path: [polyline[index].getPath().getAt(0)], strokeWeight: 3 });

    //timerHandle[index] = setTimeout("animate("+index+",50)",2000);  // Allow time for the initial map display
    timerHandle[index] = setTimeout("animate(" + index + ",0)", 1); // 2000);  // Allow time for the initial map display
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
    for (var i = 0; i < this.getPath().getLength(); i++) {
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
    for (var i = 0; i < this.getPath().getLength(); i++) {
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
    for (var i = 1; i < this.getPath().getLength(); i++) {
        dist += this.getPath().getAt(i).distanceFrom(this.getPath().getAt(i - 1));
    }
    return dist;
}

// === A method which returns the bounds as a GLatLngBounds ===
google.maps.Polyline.prototype.Bounds = function () {
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < this.getPath().getLength(); i++) {
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
    for (var i = 1; (i < this.getPath().getLength() && dist < metres); i++) {
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
    for (var i = 1; (i < this.getPath().getLength()); i++) {
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
    for (var i = 1; (i < this.getPath().getLength() && dist < metres); i++) {
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

