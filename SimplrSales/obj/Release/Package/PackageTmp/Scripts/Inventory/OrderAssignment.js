var myInterval = 0;

GetVehicleList();
var vehicleData = '';
var glbI = 0;
var glbData = '';
var tmpObj;
var isDetailOpen = false;

$(document).ready(function () {

    $("tbody.connectedSortable")
    .sortable({
        connectWith: ".connectedSortable",
        items: "> tr:not(:first)",
        appendTo: "parent",
        cursor: "move",
        receive: function (dataTo, dataFrom, e) {

            //vehicleId = dataTo.target.className.split(' connectedSortable')[0];
            vehicleId = dataTo.target.value;//$("#" + dataTo.target.id).val();
            var ordNo = dataFrom.item[0].children['0'].innerText;
            MoveOrder(vehicleId, ordNo, "");
            //var dtg = getClientSideDateTime();
            //var query = "Select O.Ordno,Oi.DeliQty,OrdLevelstatus from orderhdr o inner join (Select Sum(Isnull(DeliQty,0)) as DeliQty ,OrdNo from OrdItem group by OrdNo)oi on o.OrdNo=Oi.ordno where o.OrdNo ='" + ordNo + "'";
            //execute(query);
            //if (executeQry[0].DeliQty == 0 && executeQry[0].OrdLevelstatus != "PICK") {
            //    qry = "update Orderhdr set AgentId='" + vehicleId + "',  VehicleId='" + vehicleId + "' ,  DTG='" + dtg + "' where OrdNo='" + ordNo + "'";
            //    ExecuteInsertUpdateQuery(qry);
            //    is_first_Time_Loaded = false;
            //    GetVehicleData(vehicleData);
            //}
            //else {
            //    var qry = "";
            //    var btns = {};
            //    btns["Yes"] = function (e) {
            //        qry = "update Orderhdr set AgentId='" + vehicleId + "',  VehicleId='" + vehicleId + "',  DTG='" + dtg + "' where OrdNo='" + ordNo + "'";

            //        ExecuteInsertUpdateQuery(qry);
            //        is_first_Time_Loaded = false;
            //        GetVehicleData(vehicleData);
            //        $(this).dialog("close");
            //    }

            //    btns["No"] = function (e) {
            //        is_first_Time_Loaded = false;
            //        GetVehicleData(vehicleData);
            //        $(this).dialog("close");
            //    }
            //    var htmTitle = '<div style="display: inline-block;float:left;">Alert!</div> ';

            //    $('#DragDropValidationId').remove();
            //    $('<div id="DragDropValidationId"></div>').appendTo('body')
            //                            .html('<div><h6>Picking Process has been started for this order. Do you still want to proceed?</h6></div>').dialog({
            //                                modal: true, title: htmTitle, zIndex: 10000, autoOpen: true,
            //                                width: '35%', resizable: false,
            //                                buttons: btns
            //                            });

            //    //startInterval();
            //}


        }
    });
});

function MoveOrder(vehicleId, ordNo, isAction) {
    var dtg = getClientSideDateTime();

    if (vehicleId.toLowerCase() == "spc") {
        var qry = "";
        var btns = {};
        btns["Close"] = function (e) {
            is_first_Time_Loaded = false;
            GetVehicleData(vehicleData);
            $(this).dialog("close");
        }
        var htmTitle = '<div style="display: inline-block;float:left;">Alert!</div> ';

        $('#DragDropValidationId').remove();
        $('<div id="DragDropValidationId"></div>').appendTo('body')
            .html('<div><h6>The order cannot be re-assigned!</h6></div>').dialog({
                modal: true, title: htmTitle, zIndex: 10000, autoOpen: true,
                width: '35%', resizable: false,
                buttons: btns
            });
    }
    else {


        var query = "Select O.Ordno,case when OrdLevelstatus in ('PLA','PLG') then 0 else Oi.DeliQty end as DeliQty,OrdLevelstatus from orderhdr o  WITH (NOLOCK) inner join (Select Sum(Isnull(DeliQty,0)) as DeliQty ,OrdNo from OrdItem  WITH (NOLOCK) group by OrdNo)oi on o.OrdNo=Oi.ordno where o.OrdNo ='" + ordNo + "'";
        execute(query);
        //if (executeQry[0].DeliQty == 0 && executeQry[0].OrdLevelstatus != "WCN") {
        //PLA

        if (executeQry[0].DeliQty == 0 && (executeQry[0].OrdLevelstatus != "PICK" && executeQry[0].OrdLevelstatus != "WCN")) {
            if (vehicleId.toLowerCase() == "buffer" || vehicleId.toLowerCase() == "bufferma" || vehicleId.toLowerCase() == "spc" || vehicleId.toLowerCase() == "bufferpdd")

                qry = "  Update Orderhdr set ModifiedDate=GetDate(),AgentID='',VehicleID='',OrdLevelStatus='PLG',PLGAgent='" + _UserID + "',PLGDTG=GetDate() where OrdNo='" + ordNo + "'";

            //qry = "  Update Orderhdr set ModifiedDate=GetDate(),AgentID='',VehicleID='',OrdLevelStatus='PLG' where OrdNo='" + ordNo + "' ";
            //else if (vehicleId.toLowerCase() == "buffer" || vehicleId.toLowerCase() == "bufferma" || vehicleId.toLowerCase() == "spc" || vehicleId.toLowerCase() == "bufferpdd")
            //    qry = "  Update Orderhdr set ModifiedDate=GetDate(),AgentID='',VehicleID='',OrdLevelStatus='PLG' where OrdNo='" + ordNo + "' ";
            else {
                //enhancement 4
                qry = "  update Orderhdr set ModifiedDate=GetDate(),AgentId='" + vehicleId + "',  VehicleId='" + vehicleId + "' , OrdLevelStatus=Case when OrdLevelStatus='PLG' then 'PLA' else OrdLevelStatus end ,PickAgent    =case when 'PICK'=Case when OrdLevelStatus='PLG' then 'PLA' else OrdLevelStatus end   then '" + _UserID + "' else PickAgent end,PLGAgent     =case when 'PLG'=Case when OrdLevelStatus='PLG' then 'PLA' else OrdLevelStatus end    then '" + _UserID + "' else PLGAgent end,PLAAgent     =case when 'PLA'=Case when OrdLevelStatus='PLG' then 'PLA' else OrdLevelStatus end   then '" + _UserID + "' else PLAAgent end,WCNAgent   =case when 'WCN'=Case when OrdLevelStatus='PLG' then 'PLA' else OrdLevelStatus end   then '" + _UserID + "' else WCNAgent end,     PickDTG    =case when 'PICK'=Case when OrdLevelStatus='PLG' then 'PLA' else OrdLevelStatus end   then Getdate() else PickDTG end,PLGDTG     =case when 'PLG'=Case when OrdLevelStatus='PLG' then 'PLA' else OrdLevelStatus end   then Getdate() else PLGDTG end,PLADTG     =case when 'PLA'=Case when OrdLevelStatus='PLG' then 'PLA' else OrdLevelStatus end  then Getdate() else PLADTG end,WCNDTG   =case when 'WCN'=Case when OrdLevelStatus='PLG' then 'PLA' else OrdLevelStatus end then Getdate() else WCNDTG end where OrdNo='" + ordNo + "' ";

                //qry = "  update Orderhdr set ModifiedDate=GetDate(),AgentId='" + vehicleId + "',  VehicleId='" + vehicleId + "' , OrdLevelStatus=Case when OrdLevelStatus='PLG' then 'PLA' else OrdLevelStatus end where OrdNo='" + ordNo + "' ";
                //qry = "  update Orderhdr set ModifiedDate=GetDate(),AgentId='" + vehicleId + "',  VehicleId='" + vehicleId + "' ,  DTG='" + dtg + "',OrdLevelStatus=Case when OrdLevelStatus='PLG' then 'PLA' else OrdLevelStatus end where OrdNo='" + ordNo + "' ";

            } qry += " Insert into orderSTatusrunningtime(OrdNo,OrderStatusCode,ItemID,LinelevelStatus,DTG,UserID,OrderType,OrderAgent) 	Select '" + ordNo + "' as ordNo,ordlevelstatus as OrderStatusCode,'','',GetDate(),'" + _UserID + "' as UserID,'Manual',AgentID from Orderhdr where OrdNo='" + ordNo + "' ;";

            ExecuteInsertUpdateQuery(qry);
            is_first_Time_Loaded = false;
            GetVehicleData(vehicleData);
            if (isAction == "1")
                AssignOrderSuccess();

            //var qry = "";
            //var btns = {};
            //btns["Close"] = function (e) {
            //    is_first_Time_Loaded = false;
            //    GetVehicleData(vehicleData);
            //    $(this).dialog("close");
            //}
            //var htmTitle = '<div style="display: inline-block;float:left;">Alert!</div> ';

            //$('#DragDropValidationId').remove();
            //$('<div id="DragDropValidationId"></div>').appendTo('body')
            //    .html('<div><h6>The order cannot be re-assigned!</h6></div>').dialog({
            //        modal: true, title: htmTitle, zIndex: 10000, autoOpen: true,
            //        width: '35%', resizable: false,
            //        buttons: btns
            //    });

        }

        else {
            if (executeQry[0].OrdLevelstatus == "PICK") {
                var qry = "";
                var btns = {};
                btns["Yes"] = function (e) {
                    if (vehicleId.toLowerCase() == "buffer" || vehicleId.toLowerCase() == "bufferma" || vehicleId.toLowerCase() == "spc" || vehicleId.toLowerCase() == "bufferpdd") {
                        //enhancement 4
                        qry = "  Update Orderhdr set ModifiedDate=GetDate(),AgentID='',VehicleID='',OrdLevelStatus='PLG',PLGAgent='" + _UserID + "',PLGDTG=GetDate() where OrdNo='" + ordNo + "'";

                        //qry = "  Update Orderhdr set ModifiedDate=GetDate(),AgentID='',VehicleID='',OrdLevelStatus='PLG' where OrdNo='" + ordNo + "' ";
                    }
                    else {
                        //enhancement 4
                        qry = " update Orderhdr set ModifiedDate=GetDate(),AgentId='" + vehicleId + "',  VehicleId='" + vehicleId + "' ,  OrdLevelStatus=Case when OrdLevelStatus='PLG' then 'PLA' else OrdLevelStatus end , PickAgent    =case when 'PICK'=Case when OrdLevelStatus='PLG' then 'PLA' else OrdLevelStatus end   then '" + _UserID + "' else PickAgent end,PLGAgent     =case when 'PLG'=Case when OrdLevelStatus='PLG' then 'PLA' else OrdLevelStatus end    then '" + _UserID + "' else PLGAgent end,PLAAgent     =case when 'PLA'=Case when OrdLevelStatus='PLG' then 'PLA' else OrdLevelStatus end   then '" + _UserID + "' else PLAAgent end,WCNAgent   =case when 'WCN'=Case when OrdLevelStatus='PLG' then 'PLA' else OrdLevelStatus end   then '" + _UserID + "' else WCNAgent end,     PickDTG    =case when 'PICK'=Case when OrdLevelStatus='PLG' then 'PLA' else OrdLevelStatus end   then Getdate() else PickDTG end,PLGDTG     =case when 'PLG'=Case when OrdLevelStatus='PLG' then 'PLA' else OrdLevelStatus end   then Getdate() else PLGDTG end,PLADTG     =case when 'PLA'=Case when OrdLevelStatus='PLG' then 'PLA' else OrdLevelStatus end  then Getdate() else PLADTG end,WCNDTG   =case when 'WCN'=Case when OrdLevelStatus='PLG' then 'PLA' else OrdLevelStatus end then Getdate() else WCNDTG end where OrdNo='" + ordNo + "' ";
                        //qry = "update Orderhdr set ModifiedDate=GetDate(),AgentId='" + vehicleId + "',  VehicleId='" + vehicleId + "' ,OrdLevelStatus=Case when OrdLevelStatus='PLG' then 'PLA' else OrdLevelStatus end where OrdNo='" + ordNo + "' ";
                        //qry = "update Orderhdr set ModifiedDate=GetDate(),AgentId='" + vehicleId + "',  VehicleId='" + vehicleId + "',  DTG='" + dtg + "',OrdLevelStatus=Case when OrdLevelStatus='PLG' then 'PLA' else OrdLevelStatus end where OrdNo='" + ordNo + "' ";

                    } qry += " Insert into orderSTatusrunningtime(OrdNo,OrderStatusCode,ItemID,LinelevelStatus,DTG,UserID,OrderType,OrderAgent) 	Select '" + ordNo + "' as ordNo,ordlevelstatus as OrderStatusCode,'','',GetDate(),'" + _UserID + "' as UserID,'Manual',AgentID from Orderhdr where OrdNo='" + ordNo + "' ;";

                    ExecuteInsertUpdateQuery(qry);
                    is_first_Time_Loaded = false;
                    GetVehicleData(vehicleData);
                    $(this).dialog("close");

                    if (isAction == "1")
                        AssignOrderSuccess();



                }

                btns["No"] = function (e) {
                    is_first_Time_Loaded = false;
                    GetVehicleData(vehicleData);
                    $(this).dialog("close");
                }
                var htmTitle = '<div style="display: inline-block;float:left;">Alert!</div> ';

                $('#DragDropValidationId').remove();
                $('<div id="DragDropValidationId"></div>').appendTo('body')
                    .html('<div><h6>Picking Process has been started for this order. Do you still want to proceed?</h6></div>').dialog({
                        modal: true, title: htmTitle, zIndex: 10000, autoOpen: true,
                        width: '35%', resizable: false,
                        buttons: btns
                    });

            }
            else if (executeQry[0].OrdLevelstatus == "WCN") {
                var qry = "";
                var btns = {};
                btns["Close"] = function (e) {
                    is_first_Time_Loaded = false;
                    GetVehicleData(vehicleData);
                    $(this).dialog("close");
                }
                var htmTitle = '<div style="display: inline-block;float:left;">Alert!</div> ';

                $('#DragDropValidationId').remove();
                $('<div id="DragDropValidationId"></div>').appendTo('body')
                    .html('<div><h6>Waiting for cancellation orders cannot be re-assigned!</h6></div>').dialog({
                        modal: true, title: htmTitle, zIndex: 10000, autoOpen: true,
                        width: '35%', resizable: false,
                        buttons: btns
                    });
            }
        }
    }
}
function GetVehicleList() {

    //var interval_Time = parseInt(Interval_Time.toString());
    //setInterval(function () {
    GetVehicleList_sub();

    startInterval();
}

var isRefresh = false;
var salesAgenttimestamp = 0;
var ordHdrtimestamp = 0;
var SAlatestts;
var OHlatestts;

function setIntervalFunction() {
    var qry = "SELECT CAST((CONVERT(bigint, MAX(ts))) as decimal)  as ts FROM salesagent  WITH (NOLOCK) union SELECT CAST((CONVERT(bigint, MAX(ts))) as decimal)  as ts FROM OrderHdr  WITH (NOLOCK) ";
    execute(qry);
    if (executeQry != null) {
        SAlatestts = parseInt(executeQry[0].ts);
        OHlatestts = parseInt(executeQry[1].ts);
        console.log(SAlatestts);
        console.log(OHlatestts);
        console.log(salesAgenttimestamp);
        console.log(ordHdrtimestamp);
        if (salesAgenttimestamp < SAlatestts || ordHdrtimestamp < OHlatestts) {
            //GetVehicleList_sub();
            DivHeaderandColorRefresh();
            GetVehicleListDataRefresh();
            DetailRefresh();
            salesAgenttimestamp = SAlatestts;
            ordHdrtimestamp = OHlatestts;

        }
    }
}


function startInterval() {
    const myInterval1 = setInterval(setIntervalFunction, 3000);
    //location.host == "localhost:52063"
    //const myInterval1 = setInterval(setIntervalFunction, 120000);
    myInterval = myInterval1;
    //clearInterval(myInterval);
}

function clearIntervalFunction() {
    if (myInterval != 0) {
        clearInterval(myInterval);
        myInterval = 0;
    }
}

function DivHeaderandColorRefresh() {
    //11.07.2023
    var qry = "Select Code,UserID,case when Status1='' then '' else ' - '+Status1 end Status1,OrdC,IsLogged    from (select Distinct Code,Name+' ('+UserID+') ' + CASE WHEN AssignType = 'Auto Assign' THEN ' (Auto) ' Else ' (Manual) ' END as UserID ,IsNull(IsLogged,0) as IsLogged ,    Isnull(OrdC,0) as OrdC,    Case when IsNull(IsLogged,0)=0 then 'OFFLINE' when OrdC>0 and IsNull(IsLogged,0)=1     then     'ASSIGNED'  else 'READY' end as Status1      from salesagent With (NOLOCK) Left Join     (	 select  Vehicleid as AgentID,Count(OrdNo) as OrdC from  (select Case when Isnull(B.AgentID,'')='' or Isnull(B.AgentID,'')  like '%buffer%' then (Select Case when IsNull(OrderOriginType,'')<>'Manual Assign'     then (    Select case when Convert(Date,b.DeliveryDate)<= Convert(Date,GetDate()+(select cast (SystemValue as float) from SystemList where Code='PDDDate'))     and ((b.CreatedDate<dateadd(minute,datepart(minute,(Convert(time,cutofftime.Time))),(dateadd(hour,datepart(hour,(Convert(time,cutofftime.Time))),Convert(DateTime,Convert(Date,GetDate()))))) or (select cast (SystemValue as float) from SystemList where Code='PDDDate')>0)  or cutofftime.time is null)   then 'BUFFER'else 'BUFFERPDD' end )else  'BUFFERMA'  end)    else B.AgentID  end  as VehicleID,c.City as Territory, b.OrdNo as OrdNo,C.CustNo,c.CustName as CustomerName  , C.Address+(Case When ISNULL(C.Address2,'')='' Then'' Else  ', '+ C.Address2 End)+(Case When ISNULL(C.City,'')='' Then''  Else ', '+ C.City End) as CustAddress  ,c.ZoneCode as AlternateShipAgent,  b.DeliveryDate        from  OrderHdr b  With (NOLOCK) INNER JOIN Customer c With (NOLOCK) on b.CustID = c.CustNo        Left Join cutofftime on b.Custorder like cutofftime.CustOrderNo+'%'    where IsNull(OrdLevelStatus,'') in ('PICK','WCN','PLA','PLG')     and  IsNull(TrolleyNo,'') = Case when IsNull(OrdLevelStatus,'')='WCN'     then '' else isnull(TrolleyNo,'') end  and     IsNull(B.Void,0)=0  and b.CustID = c.CustNo  and ISNULL(b.ConditionType,'') <> 'BatteryPrinting'      group by DCOrdNo,OrderOriginType, b.companyno, b.OrdNo,   b.CreatedDate,cutofftime.[Time],  C.CustNo,b.ShipCountry,b.Remarks, c.SalesAgent, c.CustName,  C.Address, C.Address2,C.City,  c.ZoneCode,b.ToteBoxno, b.DeliveryDate,B.AgentID ,B.OrdLevelStatus) as A1 group by vehicleid   )     as Agent on Agent.AgentID=SalesAgent.Code  and (salesagent.active=1)       Union select 'BUFFER' as  Code,'BUFFER-AUTO ASSIGN' as UserID,     1 as IsLogged ,1003 as OrdC,'' Status1     Union  select 'BUFFERMA' as  Code,'BUFFER-MANUAL ASSIGN' as UserID, 1 as IsLogged     ,1002 as OrdC,'' Status1     Union select 'BUFFERPDD' as  Code,'BUFFER for future PDD' as UserID, 1 as IsLogged ,1001 as OrdC,'' Status1     Union select 'SPC' as  Code,'Special Process - Part Shortage' as UserID, 1 as IsLogged ,1000 as OrdC,'' Status1 ) as A where Code<>'ADMIN'    order by   IsLogged Desc,OrdC desc,Status1 ,UserID ";
    //12/04/2023
    //var qry = "Select Code,UserID,case when Status1='' then '' else ' - '+Status1 end Status1,OrdC,IsLogged    from (select Distinct Code,Name+' ('+UserID+') ' + CASE WHEN AssignType = 'Auto Assign' THEN ' (Auto) ' Else ' (Manual) ' END as UserID ,IsNull(IsLogged,0) as IsLogged ,    Isnull(OrdC,0) as OrdC,    Case when IsNull(IsLogged,0)=0 then 'OFFLINE' when OrdC>0 and IsNull(IsLogged,0)=1     then     'ASSIGNED'  else 'READY' end as Status1      from salesagent Left Join     ((select  AgentID,Count(OrdNo) as OrdC from  (select  VehicleID as AgentID,OrdNo,DCOrdNo,CustNo,CustomerName, format(DeliveryDate,(select dateformatstring from System)) as DeliveryDate  ,ShipCountry,Remarks,ToteBoxno, isnull((Select Description from Orderstatus where code=OrdLevelstatus),'') as OrdLevelstatus,TotalLines  from  (select DCOrdNo,Count as TotalLines, P.SoldTo, b.ShipCountry, (select top 1 NoSeries from OrderSeries  Where a.OrdNo Like Replace(NoSeries,'*','')+'%') as NoSeries ,B.ToteBoxno,b.Remarks, b.companyno, B.OrdLevelStatus, Case when Isnull(B.AgentID,'')='' or Isnull(B.AgentID,'')  like '%buffer%' then (Select Case when IsNull(OrderOriginType,'')<>'Manual Assign' then (Select case when Convert(Date,b.DeliveryDate) <= Convert(Date,GetDate()+(select cast (SystemValue as float) from SystemList where Code='PDDDate')) then 'BUFFER' else 'BUFFERPDD' end)else  'BUFFERMA'  end)    else B.AgentID  end  as VehicleID,c.City as Territory, a.OrdNo as OrdNo, Sum(a.Cubage) as Cubage,  Isnull(Sum(a.ItemCaseQty),0) as CaseQty,  C.CustNo,c.CustName as CustomerName  , C.Address+(Case When ISNULL(C.Address2,'')='' Then'' Else  ', '+ C.Address2 End)+(Case When ISNULL(C.City,'')=''  Then''  Else ', '+ C.City End) as CustAddress  ,c.ZoneCode as AlternateShipAgent,  b.DeliveryDate  from (select OrdItem.OrdNo, (select top 1 (Cubage / BaseQty) * OrdItem.Qty   from UOM    inner join Item on Item.ItemNo=UOM.ItemNo     where Uom.ItemNo=OrdItem.ItemNo and Uom.Uom=Item.BulkUOM) as Cubage,     (OrdItem.Qty / (select top 1 BaseQty  from UOM     inner join Item on Item.ItemNo=UOM.ItemNo   where Uom.ItemNo=OrdItem.ItemNo and  Uom.Uom=Item.LooseUOM)) as ItemCaseQty       from  OrdItem) a   INNER JOIN OrderHdr b on a.OrdNo=b.OrdNo  inner join (select OrdNo,Count(*)   as count,    (select Count(*)  from OrdItem O      where OrdItem.OrdNO=O.OrdNO and   O.Qty=O.DeliQty and ISNULL(O.NoPick,0)=0 group by OrdNo)     as DelCount, (select Count(*)  from OrdItem O     where OrdItem.OrdNO=O.OrdNO     and ISNULL(O.NoPick,0)=1 group by OrdNo) as NoPickCount,(select Count(*) from OrdItem O        where OrdItem.OrdNO=O.OrdNO  and ISNULL(O.NoPick,0)=2 group by OrdNo) as KickOutCount      from OrdItem group by ordNo) d on d.ordNo=b.ordNo        and D.count <>ISNULL(D.DelCount,0)  +ISNULL(D.KickOutCount,0) +ISNULL(D.NoPickCount ,0)        INNER JOIN Customer c on b.CustID = c.CustNo   Left Join OrderBP P on P.SoldTo=b.CustId       Left Join invoice I on I.OrdNo=b.OrdNo and IsnUll(I.Void,0) = 0         where IsNull(OrdLevelStatus,'') in ('PICK','WCN','PLA','PLG')        and  IsNull(TrolleyNo,'') = Case when IsNull(OrdLevelStatus,'')='WCN' then '' else isnull(TrolleyNo,'') end  and       IsNull(B.Void,0)=0  and b.CustID = c.CustNo  and ISNULL(b.ConditionType,'') <> 'BatteryPrinting' and I.InvNo Is NULL and       isnull(PickingStatus,0) < 8  group by DCOrdNo,OrderOriginType, b.companyno, a.OrdNo,        C.CustNo,b.ShipCountry,b.Remarks, c.SalesAgent, c.CustName,  C.Address, C.Address2,C.City,         c.ZoneCode,b.ToteBoxno, b.DeliveryDate,B.AgentID ,B.OrdLevelStatus, P.SoldTo,d.Count) as A1 )as A1 Group by AgentID))     as Agent on Agent.AgentID=SalesAgent.Code      Union select 'BUFFER' as  Code,'BUFFER-AUTO ASSIGN' as UserID,     1 as IsLogged ,1003 as OrdC,'' Status1     Union  select 'BUFFERMA' as  Code,'BUFFER-MANUAL ASSIGN' as UserID, 1 as IsLogged     ,1002 as OrdC,'' Status1     Union select 'BUFFERPDD' as  Code,'BUFFER for future PDD' as UserID, 1 as IsLogged ,1001 as OrdC,'' Status1     Union select 'SPC' as  Code,'Special Process - Part Shortage' as UserID, 1 as IsLogged ,1000 as OrdC,'' Status1 ) as A where Code<>'ADMIN'     order by   IsLogged Desc,OrdC desc,Status1 ,UserID";
    //var qry = "Select Code,UserID,case when Status1='' then '' else ' - '+Status1 end Status1,OrdC,IsLogged    from (select Distinct Code,Name+' ('+UserID+')' as UserID ,IsNull(IsLogged,0) as IsLogged ,    Isnull(OrdC,0) as OrdC,    Case when IsNull(IsLogged,0)=0 then 'OFFLINE' when OrdC>0 and IsNull(IsLogged,0)=1     then     'ASSIGNED'  else 'READY' end as Status1      from salesagent Left Join     ((select  AgentID,Count(OrdNo) as OrdC from  (select  VehicleID as AgentID,OrdNo,DCOrdNo,CustNo,CustomerName, format(DeliveryDate,(select dateformatstring from System)) as DeliveryDate  ,ShipCountry,Remarks,ToteBoxno, isnull((Select Description from Orderstatus where code=OrdLevelstatus),'') as OrdLevelstatus,TotalLines  from  (select DCOrdNo,Count as TotalLines, P.SoldTo, b.ShipCountry, (select top 1 NoSeries from OrderSeries  Where a.OrdNo Like Replace(NoSeries,'*','')+'%') as NoSeries ,B.ToteBoxno,b.Remarks, b.companyno, B.OrdLevelStatus, Case when Isnull(B.AgentID,'')='' or Isnull(B.AgentID,'')  like '%buffer%' then (Select Case when IsNull(OrderOriginType,'')<>'Manual Assign' then (Select case when Convert(Date,b.DeliveryDate) <= Convert(Date,GetDate()+(select cast (SystemValue as float) from SystemList where Code='PDDDate')) then 'BUFFER' else 'BUFFERPDD' end)else  'BUFFERMA'  end)    else B.AgentID  end  as VehicleID,c.City as Territory, a.OrdNo as OrdNo, Sum(a.Cubage) as Cubage,  Isnull(Sum(a.ItemCaseQty),0) as CaseQty,  C.CustNo,c.CustName as CustomerName  , C.Address+(Case When ISNULL(C.Address2,'')='' Then'' Else  ', '+ C.Address2 End)+(Case When ISNULL(C.City,'')=''  Then''  Else ', '+ C.City End) as CustAddress  ,c.ZoneCode as AlternateShipAgent,  b.DeliveryDate  from (select OrdItem.OrdNo, (select top 1 (Cubage / BaseQty) * OrdItem.Qty   from UOM    inner join Item on Item.ItemNo=UOM.ItemNo     where Uom.ItemNo=OrdItem.ItemNo and Uom.Uom=Item.BulkUOM) as Cubage,     (OrdItem.Qty / (select top 1 BaseQty  from UOM     inner join Item on Item.ItemNo=UOM.ItemNo   where Uom.ItemNo=OrdItem.ItemNo and  Uom.Uom=Item.LooseUOM)) as ItemCaseQty       from  OrdItem) a   INNER JOIN OrderHdr b on a.OrdNo=b.OrdNo  inner join (select OrdNo,Count(*)   as count,    (select Count(*)  from OrdItem O      where OrdItem.OrdNO=O.OrdNO and   O.Qty=O.DeliQty and ISNULL(O.NoPick,0)=0 group by OrdNo)     as DelCount, (select Count(*)  from OrdItem O     where OrdItem.OrdNO=O.OrdNO     and ISNULL(O.NoPick,0)=1 group by OrdNo) as NoPickCount,(select Count(*) from OrdItem O        where OrdItem.OrdNO=O.OrdNO  and ISNULL(O.NoPick,0)=2 group by OrdNo) as KickOutCount      from OrdItem group by ordNo) d on d.ordNo=b.ordNo        and D.count <>ISNULL(D.DelCount,0)  +ISNULL(D.KickOutCount,0) +ISNULL(D.NoPickCount ,0)        INNER JOIN Customer c on b.CustID = c.CustNo   Left Join OrderBP P on P.SoldTo=b.CustId       Left Join invoice I on I.OrdNo=b.OrdNo and IsnUll(I.Void,0) = 0         where IsNull(OrdLevelStatus,'') in ('PICK','WCN','PLA','PLG')        and  IsNull(TrolleyNo,'') = Case when IsNull(OrdLevelStatus,'')='WCN' then '' else isnull(TrolleyNo,'') end  and       IsNull(B.Void,0)=0  and b.CustID = c.CustNo  and ISNULL(b.ConditionType,'') <> 'BatteryPrinting' and I.InvNo Is NULL and       isnull(PickingStatus,0) < 8  group by DCOrdNo,OrderOriginType, b.companyno, a.OrdNo,        C.CustNo,b.ShipCountry,b.Remarks, c.SalesAgent, c.CustName,  C.Address, C.Address2,C.City,         c.ZoneCode,b.ToteBoxno, b.DeliveryDate,B.AgentID ,B.OrdLevelStatus, P.SoldTo,d.Count) as A1 )as A1 Group by AgentID))     as Agent on Agent.AgentID=SalesAgent.Code      Union select 'BUFFER' as  Code,'BUFFER-AUTO ASSIGN' as UserID,     1 as IsLogged ,1003 as OrdC,'' Status1     Union  select 'BUFFERMA' as  Code,'BUFFER-MANUAL ASSIGN' as UserID, 1 as IsLogged     ,1002 as OrdC,'' Status1     Union select 'BUFFERPDD' as  Code,'BUFFER for future PDD' as UserID, 1 as IsLogged ,1001 as OrdC,'' Status1     Union select 'SPC' as  Code,'Special Process - Part Shortage' as UserID, 1 as IsLogged ,1000 as OrdC,'' Status1 ) as A where Code<>'ADMIN'     order by   IsLogged Desc,OrdC desc,Status1 ,UserID ";
    //var qry = "Select Code,UserID,case when Status1='' then '' else ' - '+Status1 end Status1,OrdC,IsLogged     from (select Distinct Code,Name+' ('+UserID+')' as UserID ,IsNull(IsLogged,0) as IsLogged ,    Isnull(OrdC,0) as OrdC,Case when IsNull(IsLogged,0)=0 then 'OFFLINE' when OrdC>0 and IsNull(IsLogged,0)=1     then     'ASSIGNED'  else 'READY' end as Status1   from salesagent Left Join     ((select  AgentID,Count(OrdNo) as OrdC from  (select Count as TotalLines, P.SoldTo,     (select top 1 NoSeries from OrderSeries  Where a.OrdNo Like Replace(NoSeries,'*','')+'%') as NoSeries     ,b.TotalAmt as Amount,b.companyno, B.OrdLevelStatus, B.AgentID,Case when Isnull(B.AgentID,'')='' then    'BUFFER'else B.AgentID  end as VehicleID,c.City as Territory, a.OrdNo as OrdNo,    Sum(a.Cubage) as Cubage,  Isnull(Sum(a.ItemCaseQty),0) as CaseQty,c.CustName as CustomerName  ,    C.Address+(Case When ISNULL(C.Address2,'')='' Then'' Else  ', '+ C.Address2 End)+(Case When ISNULL(C.City,'')=''  Then'' Else ', '+ C.City End) as CustAddress  , c.ZoneCode as AlternateShipAgent, b.DeliveryDate  from (select OrdItem.OrdNo,   (select top 1 (Cubage / BaseQty) * OrdItem.Qty from UOM inner join Item on Item.ItemNo=UOM.ItemNo  where Uom.ItemNo=OrdItem.ItemNo and Uom.Uom=Item.BulkUOM) as Cubage, (OrdItem.Qty / (select top 1 BaseQty  from UOM  inner join Item on Item.ItemNo=UOM.ItemNo   where Uom.ItemNo=OrdItem.ItemNo and  Uom.Uom=Item.LooseUOM)) as ItemCaseQty  from  OrdItem) a       INNER JOIN OrderHdr b on a.OrdNo=b.OrdNo inner join (select OrdNo,Count(*)   as count, (select Count(*)  from OrdItem O   where OrdItem.OrdNO=O.OrdNO and   O.Qty=O.DeliQty and ISNULL(O.NoPick,0)=0 group by OrdNo) as DelCount, (select Count(*)  from OrdItem O where OrdItem.OrdNO=O.OrdNO  and ISNULL(O.NoPick,0)=1 group by OrdNo) as NoPickCount,(select Count(*) from OrdItem O where OrdItem.OrdNO=O.OrdNO  and ISNULL(O.NoPick,0)=2 group by OrdNo) as KickOutCount from OrdItem group by ordNo) d on d.ordNo=b.ordNo  and D.count <>ISNULL(D.DelCount,0)  +ISNULL(D.KickOutCount,0) +ISNULL(D.NoPickCount ,0) INNER JOIN Customer c on b.CustID = c.CustNo   Left Join OrderBP P on P.SoldTo=b.CustId Left Join invoice I on I.OrdNo=b.OrdNo and IsnUll(I.Void,0) = 0 where IsNull(B.Void,0)=0  and b.CustID = c.CustNo  and I.InvNo Is NULL and  isnull(PickingStatus,0) < 8 group by b.companyno, a.OrdNo, b.TotalAmt,  c.SalesAgent, c.CustName,  C.Address, C.Address2,C.City, c.ZoneCode, b.DeliveryDate,B.AgentID ,B.OrdLevelStatus, P.SoldTo,d.Count) as A1 Group by AgentID)) as Agent on Agent.AgentID=SalesAgent.Code      Union select 'BUFFER' as  Code,'BUFFER-AUTO ASSIGN' as UserID, 1 as IsLogged ,1003 as OrdC,'' Status1     Union  select 'BUFFERMA' as  Code,'BUFFER-MANUAL ASSIGN' as UserID, 1 as IsLogged ,1002 as OrdC,'' Status1     Union select 'BUFFERPDD' as  Code,'BUFFER for future PDD' as UserID, 1 as IsLogged ,1001 as OrdC,'' Status1   Union select 'SPC' as  Code,'Special Process - Part Shortage' as UserID, 1 as IsLogged ,1000 as OrdC,'' Status1 ) as A where Code<>'ADMIN' order by   IsLogged Desc,OrdC desc,Status1 ,UserID ";
    //var qry = "Select Code,UserID,case when Status1='' then '' else ' - '+Status1 end Status1,OrdC,IsLogged     from (select Distinct Code,Name+' ('+UserID+')' as UserID ,IsNull(IsLogged,0) as IsLogged ,    Isnull(OrdC,0) as OrdC,Case when IsNull(IsLogged,0)=0 then 'OFFLINE' when OrdC>0 and IsNull(IsLogged,0)=1     then     'ASSIGNED'  else 'READY' end as Status1   from salesagent Left Join     ((select  AgentID,Count(OrdNo) as OrdC from  (select Count as TotalLines, P.SoldTo,     (select top 1 NoSeries from OrderSeries  Where a.OrdNo Like Replace(NoSeries,'*','')+'%') as NoSeries     ,b.TotalAmt as Amount,b.companyno, B.OrdLevelStatus, B.AgentID,Case when Isnull(B.AgentID,'')='' then    'BUFFER'else B.AgentID  end as VehicleID,c.City as Territory, a.OrdNo as OrdNo,    Sum(a.Cubage) as Cubage,  Isnull(Sum(a.ItemCaseQty),0) as CaseQty,c.CustName as CustomerName  ,    C.Address+(Case When ISNULL(C.Address2,'')='' Then'' Else  ', '+ C.Address2 End)+(Case When ISNULL(C.City,'')=''  Then'' Else ', '+ C.City End) as CustAddress  , c.ZoneCode as AlternateShipAgent, b.DeliveryDate  from (select OrdItem.OrdNo,   (select top 1 (Cubage / BaseQty) * OrdItem.Qty from UOM inner join Item on Item.ItemNo=UOM.ItemNo  where Uom.ItemNo=OrdItem.ItemNo and Uom.Uom=Item.BulkUOM) as Cubage, (OrdItem.Qty / (select top 1 BaseQty  from UOM  inner join Item on Item.ItemNo=UOM.ItemNo   where Uom.ItemNo=OrdItem.ItemNo and  Uom.Uom=Item.LooseUOM)) as ItemCaseQty  from  OrdItem) a       INNER JOIN OrderHdr b on a.OrdNo=b.OrdNo inner join (select OrdNo,Count(*)   as count, (select Count(*)  from OrdItem O   where OrdItem.OrdNO=O.OrdNO and   O.Qty=O.DeliQty and ISNULL(O.NoPick,0)=0 group by OrdNo) as DelCount, (select Count(*)  from OrdItem O where OrdItem.OrdNO=O.OrdNO  and ISNULL(O.NoPick,0)=1 group by OrdNo) as NoPickCount,(select Count(*) from OrdItem O where OrdItem.OrdNO=O.OrdNO  and ISNULL(O.NoPick,0)=2 group by OrdNo) as KickOutCount from OrdItem group by ordNo) d on d.ordNo=b.ordNo  and D.count <>ISNULL(D.DelCount,0)  +ISNULL(D.KickOutCount,0) +ISNULL(D.NoPickCount ,0) INNER JOIN Customer c on b.CustID = c.CustNo   Left Join OrderBP P on P.SoldTo=b.CustId Left Join invoice I on I.OrdNo=b.OrdNo and IsnUll(I.Void,0) = 0 where IsNull(B.Void,0)=0  and b.CustID = c.CustNo  and I.InvNo Is NULL and  isnull(PickingStatus,0) < 8 group by b.companyno, a.OrdNo, b.TotalAmt,  c.SalesAgent, c.CustName,  C.Address, C.Address2,C.City, c.ZoneCode, b.DeliveryDate,B.AgentID ,B.OrdLevelStatus, P.SoldTo,d.Count) as A1 Group by AgentID)) as Agent on Agent.AgentID=SalesAgent.Code      Union select 'BUFFER' as  Code,'BUFFER-AUTO ASSIGN' as UserID, 1 as IsLogged ,1003 as OrdC,'' Status1     Union  select 'BUFFERMA' as  Code,'BUFFER-MANUAL ASSIGN' as UserID, 1 as IsLogged ,1002 as OrdC,'' Status1     Union select 'BUFFERPDD' as  Code,'BUFFER for future PDD' as UserID, 1 as IsLogged ,1001 as OrdC,'' Status1   Union select 'SPC' as  Code,'Special Process - Part Shortage' as UserID, 1 as IsLogged ,1000 as OrdC,'' Status1 ) as A where Code<>'ADMIN' order by   IsLogged Desc,OrdC desc,Status1 ,UserID ";
    //var qry = "Select Code,UserID,case when Status1='' then '' else ' - '+Status1 end Status1,OrdC,IsLogged from (select Distinct Code,Name+' ('+UserID+')' as UserID ,IsNull(IsLogged,0) as IsLogged ,Isnull(OrdC,0) as OrdC,Case when IsNull(IsLogged,0)=0 then 'OFFLINE' when OrdC>0 and IsNull(IsLogged,0)=1 then     'ASSIGNED'  else 'READY' end as Status1   from salesagent Left Join ((select  AgentID,Count(OrdNo) as OrdC from  (select Count as TotalLines, P.SoldTo,  (select top 1 NoSeries from OrderSeries  Where a.OrdNo Like Replace(NoSeries,'*','')+'%') as NoSeries ,b.TotalAmt as Amount,b.companyno, B.OrdLevelStatus, B.AgentID,Case when Isnull(B.AgentID,'')='' then 'BUFFER'else B.AgentID  end as VehicleID,c.City as Territory, a.OrdNo as OrdNo, Sum(a.Cubage) as Cubage,  Isnull(Sum(a.ItemCaseQty),0) as CaseQty,c.CustName as CustomerName  , C.Address+(Case When ISNULL(C.Address2,'')='' Then'' Else  ', '+ C.Address2 End)+(Case When ISNULL(C.City,'')=''  Then'' Else ', '+ C.City End) as CustAddress  , c.ZoneCode as AlternateShipAgent, b.DeliveryDate  from (select OrdItem.OrdNo,   (select top 1 (Cubage / BaseQty) * OrdItem.Qty from UOM inner join Item on Item.ItemNo=UOM.ItemNo  where Uom.ItemNo=OrdItem.ItemNo and Uom.Uom=Item.BulkUOM) as Cubage, (OrdItem.Qty / (select top 1 BaseQty  from UOM  inner join Item on Item.ItemNo=UOM.ItemNo   where Uom.ItemNo=OrdItem.ItemNo and  Uom.Uom=Item.LooseUOM)) as ItemCaseQty  from  OrdItem) a       INNER JOIN OrderHdr b on a.OrdNo=b.OrdNo inner join (select OrdNo,Count(*)   as count, (select Count(*)  from OrdItem O   where OrdItem.OrdNO=O.OrdNO and   O.Qty=O.DeliQty and ISNULL(O.NoPick,0)=0 group by OrdNo) as DelCount, (select Count(*)  from OrdItem O where OrdItem.OrdNO=O.OrdNO  and ISNULL(O.NoPick,0)=1 group by OrdNo) as NoPickCount,(select Count(*) from OrdItem O where OrdItem.OrdNO=O.OrdNO  and ISNULL(O.NoPick,0)=2 group by OrdNo) as KickOutCount from OrdItem group by ordNo) d on d.ordNo=b.ordNo  and D.count <>ISNULL(D.DelCount,0)  +ISNULL(D.KickOutCount,0) +ISNULL(D.NoPickCount ,0) INNER JOIN Customer c on b.CustID = c.CustNo   Left Join OrderBP P on P.SoldTo=b.CustId Left Join invoice I on I.OrdNo=b.OrdNo and IsnUll(I.Void,0) = 0 where IsNull(B.Void,0)=0  and b.CustID = c.CustNo  and I.InvNo Is NULL and  isnull(PickingStatus,0) < 8 group by b.companyno, a.OrdNo, b.TotalAmt,  c.SalesAgent, c.CustName,  C.Address, C.Address2,C.City, c.ZoneCode, b.DeliveryDate,B.AgentID ,B.OrdLevelStatus, P.SoldTo,d.Count) as A1 Group by AgentID)) as Agent on Agent.AgentID=SalesAgent.Code  Union select 'BUFFER' as  Code,'BUFFER-AUTO ASSIGN' as UserID, 1 as IsLogged ,1002 as OrdC,'' Status1 Union  select 'BUFFERMA' as  Code,'BUFFER-MANUAL ASSIGN' as UserID, 1 as IsLogged ,1001 as OrdC,'' Status1 Union select 'SPC' as  Code,'Special Process - Part Shortage' as UserID, 1 as IsLogged ,1000 as OrdC,'' Status1) as A where Code<>'ADMIN' order by   IsLogged Desc,OrdC desc,Status1 ,UserID";
    //var qry = "Select Code,UserID,case when Status1='' then '' else ' - '+Status1 end Status1,IsLogged from (select Distinct Code,UserID ,IsNull(IsLogged,0) as IsLogged ,Case when IsNull(IsLogged,0)=0 then 'OFFLINE' when (select  Count(OrdNo) as OrdC from  (select Count as TotalLines, P.SoldTo,  (select top 1 NoSeries from OrderSeries  Where a.OrdNo Like Replace(NoSeries,'*','')+'%') as NoSeries ,  b.TotalAmt as Amount,b.companyno, B.OrdLevelStatus, Case when Isnull(B.AgentID,'')='' then 'BUFFER'else B.AgentID  end as VehicleID,  c.City as Territory, a.OrdNo as OrdNo, Sum(a.Cubage) as Cubage,  Isnull(Sum(a.ItemCaseQty),0) as CaseQty,  c.CustName as CustomerName  , C.Address+(Case When ISNULL(C.Address2,'')='' Then'' Else  ', '+ C.Address2 End)+(Case When ISNULL(C.City,'')=''  Then''  Else ', '+ C.City End) as CustAddress  , c.ZoneCode as AlternateShipAgent,  b.DeliveryDate  from (select OrdItem.OrdNo,   (select top 1 (Cubage / BaseQty) * OrdItem.Qty   from UOM inner join Item on Item.ItemNo=UOM.ItemNo  where Uom.ItemNo=OrdItem.ItemNo and Uom.Uom=Item.BulkUOM) as Cubage, (OrdItem.Qty / (select top 1 BaseQty  from UOM  inner join Item on Item.ItemNo=UOM.ItemNo   where Uom.ItemNo=OrdItem.ItemNo and  Uom.Uom=Item.LooseUOM)) as ItemCaseQty  from  OrdItem) a       INNER JOIN OrderHdr b on a.OrdNo=b.OrdNo  and b.AgentID =Code inner join (select OrdNo,Count(*)   as count, (select Count(*)  from OrdItem O   where OrdItem.OrdNO=O.OrdNO and   O.Qty=O.DeliQty and ISNULL(O.NoPick,0)=0 group by OrdNo) as DelCount, (select Count(*)  from OrdItem O where OrdItem.OrdNO=O.OrdNO  and ISNULL(O.NoPick,0)=1 group by OrdNo) as NoPickCount,(select Count(*) from OrdItem O where OrdItem.OrdNO=O.OrdNO  and ISNULL(O.NoPick,0)=2 group by OrdNo) as KickOutCount  from OrdItem group by ordNo) d on d.ordNo=b.ordNo  and D.count <>ISNULL(D.DelCount,0)  +ISNULL(D.KickOutCount,0) +ISNULL(D.NoPickCount ,0) INNER JOIN Customer c on b.CustID = c.CustNo   Left Join OrderBP P on P.SoldTo=b.CustId  Left Join invoice I on I.OrdNo=b.OrdNo and IsnUll(I.Void,0) = 0 where IsNull(B.Void,0)=0  and b.CustID = c.CustNo  and I.InvNo Is NULL and  isnull(PickingStatus,0) < 8  group by b.companyno, a.OrdNo, b.TotalAmt,  c.SalesAgent, c.CustName,  C.Address, C.Address2,C.City, c.ZoneCode, b.DeliveryDate,B.AgentID ,B.OrdLevelStatus, P.SoldTo,d.Count) as A1 )>0 and IsNull(IsLogged,0)=1 then     'ASSIGNED'  else 'READY' end as Status1     from salesagent Union select 'BUFFER' as  Code,'BUFFER' as UserID, 1 as IsLogged ,'' Status1) as A order by   IsLogged Desc ,UserID";
    //var qry = "Select Code,UserID,case when Status1='' then '' else ' - '+Status1 end Status1,IsLogged from (select Distinct Code,UserID ,IsNull(IsLogged,0) as IsLogged ,Case when IsNull(IsLogged,0)=0 then 'OFFLINE' when (select  Count(OrdNo) as OrdC from  (select Count as TotalLines, P.SoldTo,  (select top 1 NoSeries from OrderSeries  Where a.OrdNo Like Replace(NoSeries,'*','')+'%') as NoSeries ,  b.TotalAmt as Amount,b.companyno, B.OrdLevelStatus, Case when Isnull(B.AgentID,'')='' then 'BUFFER'else B.AgentID  end as VehicleID,  c.City as Territory, a.OrdNo as OrdNo, Sum(a.Cubage) as Cubage,  Isnull(Sum(a.ItemCaseQty),0) as CaseQty,  c.CustName as CustomerName  , C.Address+(Case When ISNULL(C.Address2,'')='' Then'' Else  ', '+ C.Address2 End)+(Case When ISNULL(C.City,'')=''  Then''  Else ', '+ C.City End) as CustAddress  , c.ZoneCode as AlternateShipAgent,  b.DeliveryDate  from (select OrdItem.OrdNo,   (select top 1 (Cubage / BaseQty) * OrdItem.Qty   from UOM inner join Item on Item.ItemNo=UOM.ItemNo  where Uom.ItemNo=OrdItem.ItemNo and Uom.Uom=Item.BulkUOM) as Cubage, (OrdItem.Qty / (select top 1 BaseQty  from UOM  inner join Item on Item.ItemNo=UOM.ItemNo   where Uom.ItemNo=OrdItem.ItemNo and  Uom.Uom=Item.LooseUOM)) as ItemCaseQty  from  OrdItem) a       INNER JOIN OrderHdr b on a.OrdNo=b.OrdNo  and b.AgentID =Code inner join (select OrdNo,Count(*)   as count, (select Count(*)  from OrdItem O   where OrdItem.OrdNO=O.OrdNO and   O.Qty=O.DeliQty and ISNULL(O.NoPick,0)=0 group by OrdNo) as DelCount, (select Count(*)  from OrdItem O where OrdItem.OrdNO=O.OrdNO  and ISNULL(O.NoPick,0)=1 group by OrdNo) as NoPickCount,(select Count(*) from OrdItem O where OrdItem.OrdNO=O.OrdNO  and ISNULL(O.NoPick,0)=2 group by OrdNo) as KickOutCount  from OrdItem group by ordNo) d on d.ordNo=b.ordNo  and D.count <>ISNULL(D.DelCount,0)  +ISNULL(D.KickOutCount,0) +ISNULL(D.NoPickCount ,0) INNER JOIN Customer c on b.CustID = c.CustNo   Left Join OrderBP P on P.SoldTo=b.CustId  Left Join invoice I on I.OrdNo=b.OrdNo and IsnUll(I.Void,0) = 0 where IsNull(B.Void,0)=0  and b.CustID = c.CustNo  and I.InvNo Is NULL and  isnull(PickingStatus,0) < 8  group by b.companyno, a.OrdNo, b.TotalAmt,  c.SalesAgent, c.CustName,  C.Address, C.Address2,C.City, c.ZoneCode, b.DeliveryDate,B.AgentID ,B.OrdLevelStatus, P.SoldTo,d.Count) as A1 )>0 and IsNull(IsLogged,0)=1 then     'ASSIGNED'  else 'READY' end as Status1     from salesagent Union select 'BUFFER' as  Code,'BUFFER' as UserID, 1 as IsLogged ,'' Status1) as A order by   IsLogged Desc ,UserID";
    execute(qry);
    var data = executeQry;
    vehicleData = executeQry;
    var BackRoundcolor = 'Green';
    if (data != null) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].IsLogged == "0")
                BackRoundcolor = "red";
            else
                BackRoundcolor = 'Green';
            $('#div' + i).css("border-color", BackRoundcolor);
            $('#divbackRoundColor' + i).css("background-color", BackRoundcolor);
            $('#printbtnbackRoundColor' + i).css("background-color", BackRoundcolor);
            $('#divHeaderId' + i).text(data[i].UserID + "" + data[i].Status1);
            $('#divVehId' + i).text(data[i].Code);
        }
    }
}
function DDAssignVehicle(data) {
    var valueText = '';
    var valueText1 = '';
    var valueText2 = '';
    valueText1 = "<option value='' id=''>--Select--</option>";
    $.each(data, function (j, data) {
        valueText += "<option value=" + data.Code + ">" + data.UserID + "</option>";
        if (data.Code.toLowerCase() != "buffer" && data.Code.toLowerCase() != "bufferma" && data.Code.toLowerCase() != "spc" && data.Code.toLowerCase() != "bufferpdd") {
            valueText1 += "<option value=" + data.Code + " id=" + data.Code + ">" + data.UserID + "</option>";
            valueText2 += "<option value=" + data.Code + " id=" + data.Code + ">" + data.UserID + "</option>";
        }
        
    });
    $("#VehicleId").append(valueText);
   
    $("#VehicleId1").append(valueText2);
}

function GetVehicleList_sub() {
    //var qry = "Select Code,UserID,IsLogged from (select Distinct Code,UserID ,IsNull(IsLogged,0) as IsLogged   from salesagent   Union select 'BUFFER' as  Code,'BUFFER' as UserID, 1 as IsLogged ) as A";
    //var qry = "Select Code,UserID,case when Status1='' then '' else ' - '+Status1 end Status1,IsLogged from (select Distinct Code, UserID ,IsNull(IsLogged,0) as IsLogged ,Case when IsNull(IsLogged,0)=0 then 'OFFLINE' when (Select Count(ordno) from Orderhdr where OrderHdr.AgentID=Code and isnull(PickingStatus,0) < 8  and IsNull(Void,0)=0   )>0 and IsNull(IsLogged,0)=1 then     'ASSIGNED'  else 'READY' end as Status1     from salesagent Union select 'BUFFER' as  Code,'BUFFER' as UserID, 1 as IsLogged ,'' Status1) as A";
    //var qry = "Select Code,UserID,case when Status1='' then '' else ' - '+Status1 end Status1,IsLogged from (select Distinct Code,UserID ,IsNull(IsLogged,0) as IsLogged ,Case when IsNull(IsLogged,0)=0 then 'OFFLINE' when (select  Count(OrdNo) as OrdC from  (select Count as TotalLines, P.SoldTo,  (select top 1 NoSeries from OrderSeries  Where a.OrdNo Like Replace(NoSeries,'*','')+'%') as NoSeries ,  b.TotalAmt as Amount,b.companyno, B.OrdLevelStatus, Case when Isnull(B.AgentID,'')='' then 'BUFFER'else B.AgentID  end as VehicleID,  c.City as Territory, a.OrdNo as OrdNo, Sum(a.Cubage) as Cubage,  Isnull(Sum(a.ItemCaseQty),0) as CaseQty,  c.CustName as CustomerName  , C.Address+(Case When ISNULL(C.Address2,'')='' Then'' Else  ', '+ C.Address2 End)+(Case When ISNULL(C.City,'')=''  Then''  Else ', '+ C.City End) as CustAddress  , c.ZoneCode as AlternateShipAgent,  b.DeliveryDate  from (select OrdItem.OrdNo,   (select top 1 (Cubage / BaseQty) * OrdItem.Qty   from UOM inner join Item on Item.ItemNo=UOM.ItemNo  where Uom.ItemNo=OrdItem.ItemNo and Uom.Uom=Item.BulkUOM) as Cubage, (OrdItem.Qty / (select top 1 BaseQty  from UOM  inner join Item on Item.ItemNo=UOM.ItemNo   where Uom.ItemNo=OrdItem.ItemNo and  Uom.Uom=Item.LooseUOM)) as ItemCaseQty  from  OrdItem) a       INNER JOIN OrderHdr b on a.OrdNo=b.OrdNo  and b.AgentID =Code inner join (select OrdNo,Count(*)   as count, (select Count(*)  from OrdItem O   where OrdItem.OrdNO=O.OrdNO and   O.Qty=O.DeliQty and ISNULL(O.NoPick,0)=0 group by OrdNo) as DelCount, (select Count(*)  from OrdItem O where OrdItem.OrdNO=O.OrdNO  and ISNULL(O.NoPick,0)=1 group by OrdNo) as NoPickCount,(select Count(*) from OrdItem O where OrdItem.OrdNO=O.OrdNO  and ISNULL(O.NoPick,0)=2 group by OrdNo) as KickOutCount  from OrdItem group by ordNo) d on d.ordNo=b.ordNo  and D.count <>ISNULL(D.DelCount,0)  +ISNULL(D.KickOutCount,0) +ISNULL(D.NoPickCount ,0) INNER JOIN Customer c on b.CustID = c.CustNo   Left Join OrderBP P on P.SoldTo=b.CustId  Left Join invoice I on I.OrdNo=b.OrdNo and IsnUll(I.Void,0) = 0 where IsNull(B.Void,0)=0  and b.CustID = c.CustNo  and I.InvNo Is NULL and  isnull(PickingStatus,0) < 8  group by b.companyno, a.OrdNo, b.TotalAmt,  c.SalesAgent, c.CustName,  C.Address, C.Address2,C.City, c.ZoneCode, b.DeliveryDate,B.AgentID ,B.OrdLevelStatus, P.SoldTo,d.Count) as A1 )>0 and IsNull(IsLogged,0)=1 then     'ASSIGNED'  else 'READY' end as Status1     from salesagent Union select 'BUFFER' as  Code,'BUFFER' as UserID, 1 as IsLogged ,'' Status1) as A order by   IsLogged Desc ,UserID";
    // var qry = "Select Code,UserID,case when Status1='' then '' else ' - '+Status1 end Status1,OrdC,IsLogged from (select Distinct Code,Name+' ('+UserID+')' as UserID ,IsNull(IsLogged,0) as IsLogged ,Isnull(OrdC,0) as OrdC,Case when IsNull(IsLogged,0)=0 then 'OFFLINE' when OrdC>0 and IsNull(IsLogged,0)=1 then     'ASSIGNED'  else 'READY' end as Status1   from salesagent Left Join ((select  AgentID,Count(OrdNo) as OrdC from  (select Count as TotalLines, P.SoldTo,  (select top 1 NoSeries from OrderSeries  Where a.OrdNo Like Replace(NoSeries,'*','')+'%') as NoSeries ,b.TotalAmt as Amount,b.companyno, B.OrdLevelStatus, B.AgentID,Case when Isnull(B.AgentID,'')='' then 'BUFFER'else B.AgentID  end as VehicleID,c.City as Territory, a.OrdNo as OrdNo, Sum(a.Cubage) as Cubage,  Isnull(Sum(a.ItemCaseQty),0) as CaseQty,c.CustName as CustomerName  , C.Address+(Case When ISNULL(C.Address2,'')='' Then'' Else  ', '+ C.Address2 End)+(Case When ISNULL(C.City,'')=''  Then'' Else ', '+ C.City End) as CustAddress  , c.ZoneCode as AlternateShipAgent, b.DeliveryDate  from (select OrdItem.OrdNo,   (select top 1 (Cubage / BaseQty) * OrdItem.Qty from UOM inner join Item on Item.ItemNo=UOM.ItemNo  where Uom.ItemNo=OrdItem.ItemNo and Uom.Uom=Item.BulkUOM) as Cubage, (OrdItem.Qty / (select top 1 BaseQty  from UOM  inner join Item on Item.ItemNo=UOM.ItemNo   where Uom.ItemNo=OrdItem.ItemNo and  Uom.Uom=Item.LooseUOM)) as ItemCaseQty  from  OrdItem) a       INNER JOIN OrderHdr b on a.OrdNo=b.OrdNo inner join (select OrdNo,Count(*)   as count, (select Count(*)  from OrdItem O   where OrdItem.OrdNO=O.OrdNO and   O.Qty=O.DeliQty and ISNULL(O.NoPick,0)=0 group by OrdNo) as DelCount, (select Count(*)  from OrdItem O where OrdItem.OrdNO=O.OrdNO  and ISNULL(O.NoPick,0)=1 group by OrdNo) as NoPickCount,(select Count(*) from OrdItem O where OrdItem.OrdNO=O.OrdNO  and ISNULL(O.NoPick,0)=2 group by OrdNo) as KickOutCount from OrdItem group by ordNo) d on d.ordNo=b.ordNo  and D.count <>ISNULL(D.DelCount,0)  +ISNULL(D.KickOutCount,0) +ISNULL(D.NoPickCount ,0) INNER JOIN Customer c on b.CustID = c.CustNo   Left Join OrderBP P on P.SoldTo=b.CustId Left Join invoice I on I.OrdNo=b.OrdNo and IsnUll(I.Void,0) = 0 where IsNull(B.Void,0)=0  and b.CustID = c.CustNo  and I.InvNo Is NULL and  isnull(PickingStatus,0) < 8 group by b.companyno, a.OrdNo, b.TotalAmt,  c.SalesAgent, c.CustName,  C.Address, C.Address2,C.City, c.ZoneCode, b.DeliveryDate,B.AgentID ,B.OrdLevelStatus, P.SoldTo,d.Count) as A1 Group by AgentID)) as Agent on Agent.AgentID=SalesAgent.Code  Union select 'BUFFER' as  Code,'BUFFER-AUTO ASSIGN' as UserID, 1 as IsLogged ,1002 as OrdC,'' Status1 Union  select 'BUFFERMA' as  Code,'BUFFER-MANUAL ASSIGN' as UserID, 1 as IsLogged ,1001 as OrdC,'' Status1 Union select 'SPC' as  Code,'Special Process - Part Shortage' as UserID, 1 as IsLogged ,1000 as OrdC,'' Status1) as A where Code<>'ADMIN' order by   IsLogged Desc,OrdC desc,Status1 ,UserID";

    //var qry = "Select Code,UserID,case when Status1='' then '' else ' - '+Status1 end Status1,OrdC,IsLogged     from (select Distinct Code,Name+' ('+UserID+')' as UserID ,IsNull(IsLogged,0) as IsLogged ,    Isnull(OrdC,0) as OrdC,Case when IsNull(IsLogged,0)=0 then 'OFFLINE' when OrdC>0 and IsNull(IsLogged,0)=1     then     'ASSIGNED'  else 'READY' end as Status1   from salesagent Left Join     ((select  AgentID,Count(OrdNo) as OrdC from  (select Count as TotalLines, P.SoldTo,     (select top 1 NoSeries from OrderSeries  Where a.OrdNo Like Replace(NoSeries,'*','')+'%') as NoSeries     ,b.TotalAmt as Amount,b.companyno, B.OrdLevelStatus, B.AgentID,Case when Isnull(B.AgentID,'')='' then    'BUFFER'else B.AgentID  end as VehicleID,c.City as Territory, a.OrdNo as OrdNo,    Sum(a.Cubage) as Cubage,  Isnull(Sum(a.ItemCaseQty),0) as CaseQty,c.CustName as CustomerName  ,    C.Address+(Case When ISNULL(C.Address2,'')='' Then'' Else  ', '+ C.Address2 End)+(Case When ISNULL(C.City,'')=''  Then'' Else ', '+ C.City End) as CustAddress  , c.ZoneCode as AlternateShipAgent, b.DeliveryDate  from (select OrdItem.OrdNo,   (select top 1 (Cubage / BaseQty) * OrdItem.Qty from UOM inner join Item on Item.ItemNo=UOM.ItemNo  where Uom.ItemNo=OrdItem.ItemNo and Uom.Uom=Item.BulkUOM) as Cubage, (OrdItem.Qty / (select top 1 BaseQty  from UOM  inner join Item on Item.ItemNo=UOM.ItemNo   where Uom.ItemNo=OrdItem.ItemNo and  Uom.Uom=Item.LooseUOM)) as ItemCaseQty  from  OrdItem) a       INNER JOIN OrderHdr b on a.OrdNo=b.OrdNo inner join (select OrdNo,Count(*)   as count, (select Count(*)  from OrdItem O   where OrdItem.OrdNO=O.OrdNO and   O.Qty=O.DeliQty and ISNULL(O.NoPick,0)=0 group by OrdNo) as DelCount, (select Count(*)  from OrdItem O where OrdItem.OrdNO=O.OrdNO  and ISNULL(O.NoPick,0)=1 group by OrdNo) as NoPickCount,(select Count(*) from OrdItem O where OrdItem.OrdNO=O.OrdNO  and ISNULL(O.NoPick,0)=2 group by OrdNo) as KickOutCount from OrdItem group by ordNo) d on d.ordNo=b.ordNo  and D.count <>ISNULL(D.DelCount,0)  +ISNULL(D.KickOutCount,0) +ISNULL(D.NoPickCount ,0) INNER JOIN Customer c on b.CustID = c.CustNo   Left Join OrderBP P on P.SoldTo=b.CustId Left Join invoice I on I.OrdNo=b.OrdNo and IsnUll(I.Void,0) = 0 where IsNull(B.Void,0)=0  and b.CustID = c.CustNo  and I.InvNo Is NULL and  isnull(PickingStatus,0) < 8 group by b.companyno, a.OrdNo, b.TotalAmt,  c.SalesAgent, c.CustName,  C.Address, C.Address2,C.City, c.ZoneCode, b.DeliveryDate,B.AgentID ,B.OrdLevelStatus, P.SoldTo,d.Count) as A1 Group by AgentID)) as Agent on Agent.AgentID=SalesAgent.Code      Union select 'BUFFER' as  Code,'BUFFER-AUTO ASSIGN' as UserID, 1 as IsLogged ,1003 as OrdC,'' Status1     Union  select 'BUFFERMA' as  Code,'BUFFER-MANUAL ASSIGN' as UserID, 1 as IsLogged ,1002 as OrdC,'' Status1     Union select 'BUFFERPDD' as  Code,'BUFFER for future PDD' as UserID, 1 as IsLogged ,1001 as OrdC,'' Status1   Union select 'SPC' as  Code,'Special Process - Part Shortage' as UserID, 1 as IsLogged ,1000 as OrdC,'' Status1 ) as A where Code<>'ADMIN' order by   IsLogged Desc,OrdC desc,Status1 ,UserID ";

    //var qry = "Select Code,UserID,case when Status1='' then '' else ' - '+Status1 end Status1,OrdC,IsLogged    from (select Distinct Code,Name+' ('+UserID+')' as UserID ,IsNull(IsLogged,0) as IsLogged ,    Isnull(OrdC,0) as OrdC,    Case when IsNull(IsLogged,0)=0 then 'OFFLINE' when OrdC>0 and IsNull(IsLogged,0)=1     then     'ASSIGNED'  else 'READY' end as Status1      from salesagent Left Join     ((select  AgentID,Count(OrdNo) as OrdC from  (select  VehicleID as AgentID,OrdNo,DCOrdNo,CustNo,CustomerName, format(DeliveryDate,(select dateformatstring from System)) as DeliveryDate  ,ShipCountry,Remarks,ToteBoxno, isnull((Select Description from Orderstatus where code=OrdLevelstatus),'') as OrdLevelstatus,TotalLines  from  (select DCOrdNo,Count as TotalLines, P.SoldTo, b.ShipCountry, (select top 1 NoSeries from OrderSeries  Where a.OrdNo Like Replace(NoSeries,'*','')+'%') as NoSeries ,B.ToteBoxno,b.Remarks, b.companyno, B.OrdLevelStatus, Case when Isnull(B.AgentID,'')='' or Isnull(B.AgentID,'')  like '%buffer%' then (Select Case when IsNull(OrderOriginType,'')<>'Manual Assign' then (Select case when Convert(Date,b.DeliveryDate) <= Convert(Date,GetDate()+(select cast (SystemValue as float) from SystemList where Code='PDDDate')) then 'BUFFER' else 'BUFFERPDD' end)else  'BUFFERMA'  end)    else B.AgentID  end  as VehicleID,c.City as Territory, a.OrdNo as OrdNo, Sum(a.Cubage) as Cubage,  Isnull(Sum(a.ItemCaseQty),0) as CaseQty,  C.CustNo,c.CustName as CustomerName  , C.Address+(Case When ISNULL(C.Address2,'')='' Then'' Else  ', '+ C.Address2 End)+(Case When ISNULL(C.City,'')=''  Then''  Else ', '+ C.City End) as CustAddress  ,c.ZoneCode as AlternateShipAgent,  b.DeliveryDate  from (select OrdItem.OrdNo, (select top 1 (Cubage / BaseQty) * OrdItem.Qty   from UOM    inner join Item on Item.ItemNo=UOM.ItemNo     where Uom.ItemNo=OrdItem.ItemNo and Uom.Uom=Item.BulkUOM) as Cubage,     (OrdItem.Qty / (select top 1 BaseQty  from UOM     inner join Item on Item.ItemNo=UOM.ItemNo   where Uom.ItemNo=OrdItem.ItemNo and  Uom.Uom=Item.LooseUOM)) as ItemCaseQty       from  OrdItem) a   INNER JOIN OrderHdr b on a.OrdNo=b.OrdNo  inner join (select OrdNo,Count(*)   as count,    (select Count(*)  from OrdItem O      where OrdItem.OrdNO=O.OrdNO and   O.Qty=O.DeliQty and ISNULL(O.NoPick,0)=0 group by OrdNo)     as DelCount, (select Count(*)  from OrdItem O     where OrdItem.OrdNO=O.OrdNO     and ISNULL(O.NoPick,0)=1 group by OrdNo) as NoPickCount,(select Count(*) from OrdItem O        where OrdItem.OrdNO=O.OrdNO  and ISNULL(O.NoPick,0)=2 group by OrdNo) as KickOutCount      from OrdItem group by ordNo) d on d.ordNo=b.ordNo        and D.count <>ISNULL(D.DelCount,0)  +ISNULL(D.KickOutCount,0) +ISNULL(D.NoPickCount ,0)        INNER JOIN Customer c on b.CustID = c.CustNo   Left Join OrderBP P on P.SoldTo=b.CustId       Left Join invoice I on I.OrdNo=b.OrdNo and IsnUll(I.Void,0) = 0         where IsNull(OrdLevelStatus,'') in ('PICK','WCN','PLA','PLG')        and  IsNull(TrolleyNo,'') = Case when IsNull(OrdLevelStatus,'')='WCN' then '' else isnull(TrolleyNo,'') end  and       IsNull(B.Void,0)=0  and b.CustID = c.CustNo  and ISNULL(b.ConditionType,'') <> 'BatteryPrinting' and I.InvNo Is NULL and       isnull(PickingStatus,0) < 8  group by DCOrdNo,OrderOriginType, b.companyno, a.OrdNo,        C.CustNo,b.ShipCountry,b.Remarks, c.SalesAgent, c.CustName,  C.Address, C.Address2,C.City,         c.ZoneCode,b.ToteBoxno, b.DeliveryDate,B.AgentID ,B.OrdLevelStatus, P.SoldTo,d.Count) as A1 )as A1 Group by AgentID))     as Agent on Agent.AgentID=SalesAgent.Code      Union select 'BUFFER' as  Code,'BUFFER-AUTO ASSIGN' as UserID,     1 as IsLogged ,1003 as OrdC,'' Status1     Union  select 'BUFFERMA' as  Code,'BUFFER-MANUAL ASSIGN' as UserID, 1 as IsLogged     ,1002 as OrdC,'' Status1     Union select 'BUFFERPDD' as  Code,'BUFFER for future PDD' as UserID, 1 as IsLogged ,1001 as OrdC,'' Status1     Union select 'SPC' as  Code,'Special Process - Part Shortage' as UserID, 1 as IsLogged ,1000 as OrdC,'' Status1 ) as A where Code<>'ADMIN'     order by   IsLogged Desc,OrdC desc,Status1 ,UserID ";
    // var qry = "Select Code,UserID,case when Status1='' then '' else ' - '+Status1 end Status1,OrdC,IsLogged    from (select Distinct Code,Name+' ('+UserID+') ' + CASE WHEN AssignType = 'Auto Assign' THEN ' (Auto) ' Else ' (Manual) ' END as UserID ,IsNull(IsLogged,0) as IsLogged ,    Isnull(OrdC,0) as OrdC,    Case when IsNull(IsLogged,0)=0 then 'OFFLINE' when OrdC>0 and IsNull(IsLogged,0)=1     then     'ASSIGNED'  else 'READY' end as Status1      from salesagent Left Join     ((select  AgentID,Count(OrdNo) as OrdC from  (select  VehicleID as AgentID,OrdNo,DCOrdNo,CustNo,CustomerName, format(DeliveryDate,(select dateformatstring from System)) as DeliveryDate  ,ShipCountry,Remarks,ToteBoxno, isnull((Select Description from Orderstatus where code=OrdLevelstatus),'') as OrdLevelstatus,TotalLines  from  (select DCOrdNo,Count as TotalLines, P.SoldTo, b.ShipCountry, (select top 1 NoSeries from OrderSeries  Where a.OrdNo Like Replace(NoSeries,'*','')+'%') as NoSeries ,B.ToteBoxno,b.Remarks, b.companyno, B.OrdLevelStatus, Case when Isnull(B.AgentID,'')='' or Isnull(B.AgentID,'')  like '%buffer%' then (Select Case when IsNull(OrderOriginType,'')<>'Manual Assign' then (Select case when Convert(Date,b.DeliveryDate) <= Convert(Date,GetDate()+(select cast (SystemValue as float) from SystemList where Code='PDDDate')) then 'BUFFER' else 'BUFFERPDD' end)else  'BUFFERMA'  end)    else B.AgentID  end  as VehicleID,c.City as Territory, a.OrdNo as OrdNo, Sum(a.Cubage) as Cubage,  Isnull(Sum(a.ItemCaseQty),0) as CaseQty,  C.CustNo,c.CustName as CustomerName  , C.Address+(Case When ISNULL(C.Address2,'')='' Then'' Else  ', '+ C.Address2 End)+(Case When ISNULL(C.City,'')=''  Then''  Else ', '+ C.City End) as CustAddress  ,c.ZoneCode as AlternateShipAgent,  b.DeliveryDate  from (select OrdItem.OrdNo, (select top 1 (Cubage / BaseQty) * OrdItem.Qty   from UOM    inner join Item on Item.ItemNo=UOM.ItemNo     where Uom.ItemNo=OrdItem.ItemNo and Uom.Uom=Item.BulkUOM) as Cubage,     (OrdItem.Qty / (select top 1 BaseQty  from UOM     inner join Item on Item.ItemNo=UOM.ItemNo   where Uom.ItemNo=OrdItem.ItemNo and  Uom.Uom=Item.LooseUOM)) as ItemCaseQty       from  OrdItem) a   INNER JOIN OrderHdr b on a.OrdNo=b.OrdNo  inner join (select OrdNo,Count(*)   as count,    (select Count(*)  from OrdItem O      where OrdItem.OrdNO=O.OrdNO and   O.Qty=O.DeliQty and ISNULL(O.NoPick,0)=0 group by OrdNo)     as DelCount, (select Count(*)  from OrdItem O     where OrdItem.OrdNO=O.OrdNO     and ISNULL(O.NoPick,0)=1 group by OrdNo) as NoPickCount,(select Count(*) from OrdItem O        where OrdItem.OrdNO=O.OrdNO  and ISNULL(O.NoPick,0)=2 group by OrdNo) as KickOutCount      from OrdItem group by ordNo) d on d.ordNo=b.ordNo        and D.count <>ISNULL(D.DelCount,0)  +ISNULL(D.KickOutCount,0) +ISNULL(D.NoPickCount ,0)        INNER JOIN Customer c on b.CustID = c.CustNo   Left Join OrderBP P on P.SoldTo=b.CustId       Left Join invoice I on I.OrdNo=b.OrdNo and IsnUll(I.Void,0) = 0         where IsNull(OrdLevelStatus,'') in ('PICK','WCN','PLA','PLG')        and  IsNull(TrolleyNo,'') = Case when IsNull(OrdLevelStatus,'')='WCN' then '' else isnull(TrolleyNo,'') end  and       IsNull(B.Void,0)=0  and b.CustID = c.CustNo  and ISNULL(b.ConditionType,'') <> 'BatteryPrinting' and I.InvNo Is NULL and       isnull(PickingStatus,0) < 8  group by DCOrdNo,OrderOriginType, b.companyno, a.OrdNo,        C.CustNo,b.ShipCountry,b.Remarks, c.SalesAgent, c.CustName,  C.Address, C.Address2,C.City,         c.ZoneCode,b.ToteBoxno, b.DeliveryDate,B.AgentID ,B.OrdLevelStatus, P.SoldTo,d.Count) as A1 )as A1 Group by AgentID))     as Agent on Agent.AgentID=SalesAgent.Code      Union select 'BUFFER' as  Code,'BUFFER-AUTO ASSIGN' as UserID,     1 as IsLogged ,1003 as OrdC,'' Status1     Union  select 'BUFFERMA' as  Code,'BUFFER-MANUAL ASSIGN' as UserID, 1 as IsLogged     ,1002 as OrdC,'' Status1     Union select 'BUFFERPDD' as  Code,'BUFFER for future PDD' as UserID, 1 as IsLogged ,1001 as OrdC,'' Status1     Union select 'SPC' as  Code,'Special Process - Part Shortage' as UserID, 1 as IsLogged ,1000 as OrdC,'' Status1 ) as A where Code<>'ADMIN'     order by   IsLogged Desc,OrdC desc,Status1 ,UserID";
    //12.04.2023
    //var qry = "Select Code,UserID,case when Status1='' then '' else ' - '+Status1 end Status1,OrdC,IsLogged    from (select Distinct Code,Name+' ('+UserID+') ' + CASE WHEN AssignType = 'Auto Assign' THEN ' (Auto) ' Else ' (Manual) ' END as UserID ,IsNull(IsLogged,0) as IsLogged ,    Isnull(OrdC,0) as OrdC,    Case when IsNull(IsLogged,0)=0 then 'OFFLINE' when OrdC>0 and IsNull(IsLogged,0)=1     then     'ASSIGNED'  else 'READY' end as Status1      from salesagent Left Join ((select  AgentID,Count(OrdNo) as OrdC from  (select  AgentID,OrdNo,DCOrdNo,CustNo,CustomerName, format(DeliveryDate,(select dateformatstring from System)) as DeliveryDate  ,ShipCountry,Remarks,ToteBoxno, isnull((Select Description from Orderstatus where code=OrdLevelstatus),'') as OrdLevelstatus, TotalLines from  (select DCOrdNo,(select COunt(*) from Orditem where Ordno=b.ordno) as TotalLines,  b.ShipCountry, '' as NoSeries ,B.ToteBoxno,b.Remarks, b.companyno,B.OrdLevelStatus, Case when Isnull(B.AgentID,'')='' or Isnull(B.AgentID,'')  like '%buffer%' then (Select Case when IsNull(OrderOriginType,'')<>'Manual Assign'     then (    Select case when Convert(Date,b.DeliveryDate)<= Convert(Date,GetDate()+(select cast (SystemValue as float) from SystemList where Code='PDDDate'))     and ((b.CreatedDate<dateadd(minute,datepart(minute,(Convert(time,cutofftime.Time))),(dateadd(hour,datepart(hour,(Convert(time,cutofftime.Time))),Convert(DateTime,Convert(Date,GetDate()))))) )  or cutofftime.time is null)   then 'BUFFER'else 'BUFFERPDD' end )else  'BUFFERMA'  end)    else B.AgentID  end  as AgentID,c.City as Territory, b.OrdNo as OrdNo,C.CustNo,c.CustName as CustomerName  , C.Address+(Case When ISNULL(C.Address2,'')='' Then'' Else  ', '+ C.Address2 End)+(Case When ISNULL(C.City,'')='' Then''  Else ', '+ C.City End) as CustAddress  ,c.ZoneCode as AlternateShipAgent,  b.DeliveryDate      from  OrderHdr b INNER JOIN Customer c on b.CustID = c.CustNo     Left Join cutofftime on b.Custorder like cutofftime.CustOrderNo+'%'    where IsNull(OrdLevelStatus,'') in ('PICK','WCN','PLA','PLG')     and  IsNull(TrolleyNo,'') = Case when IsNull(OrdLevelStatus,'')='WCN'     then '' else isnull(TrolleyNo,'') end  and     IsNull(B.Void,0)=0  and b.CustID = c.CustNo  and ISNULL(b.ConditionType,'') <> 'BatteryPrinting'      group by DCOrdNo,OrderOriginType, b.companyno, b.OrdNo,   b.CreatedDate,cutofftime.[Time],  C.CustNo,b.ShipCountry,b.Remarks, c.SalesAgent, c.CustName,  C.Address, C.Address2,C.City,  c.ZoneCode,b.ToteBoxno, b.DeliveryDate,B.AgentID ,B.OrdLevelStatus) as A1)as A1 Group by AgentID))     as Agent on Agent.AgentID=SalesAgent.Code      Union select 'BUFFER' as  Code,'BUFFER-AUTO ASSIGN' as UserID,     1 as IsLogged ,1003 as OrdC,'' Status1     Union  select 'BUFFERMA' as  Code,'BUFFER-MANUAL ASSIGN' as UserID, 1 as IsLogged     ,1002 as OrdC,'' Status1     Union select 'BUFFERPDD' as  Code,'BUFFER for future PDD' as UserID, 1 as IsLogged ,1001 as OrdC,'' Status1     Union select 'SPC' as  Code,'Special Process - Part Shortage' as UserID, 1 as IsLogged ,1000 as OrdC,'' Status1 ) as A where Code<>'ADMIN'     order by   IsLogged Desc,OrdC desc,Status1 ,UserID";
    //11.07.2023
    var qry = "Select Code,UserID,case when Status1='' then '' else ' - '+Status1 end Status1,OrdC,IsLogged    from (select Distinct Code,Name+' ('+UserID+') ' + CASE WHEN AssignType = 'Auto Assign' THEN ' (Auto) ' Else ' (Manual) ' END as UserID ,IsNull(IsLogged,0) as IsLogged ,    Isnull(OrdC,0) as OrdC,    Case when IsNull(IsLogged,0)=0 then 'OFFLINE' when OrdC>0 and IsNull(IsLogged,0)=1     then     'ASSIGNED'  else 'READY' end as Status1      from salesagent With (NOLOCK) Left Join     (	 select  Vehicleid as AgentID,Count(OrdNo) as OrdC from  (select Case when Isnull(B.AgentID,'')='' or Isnull(B.AgentID,'')  like '%buffer%' then (Select Case when IsNull(OrderOriginType,'')<>'Manual Assign'     then (    Select case when Convert(Date,b.DeliveryDate)<= Convert(Date,GetDate()+(select cast (SystemValue as float) from SystemList where Code='PDDDate'))     and ((b.CreatedDate<dateadd(minute,datepart(minute,(Convert(time,cutofftime.Time))),(dateadd(hour,datepart(hour,(Convert(time,cutofftime.Time))),Convert(DateTime,Convert(Date,GetDate()))))) or (select cast (SystemValue as float) from SystemList where Code='PDDDate')>0)  or cutofftime.time is null)   then 'BUFFER'else 'BUFFERPDD' end )else  'BUFFERMA'  end)    else B.AgentID  end  as VehicleID,c.City as Territory, b.OrdNo as OrdNo,C.CustNo,c.CustName as CustomerName  , C.Address+(Case When ISNULL(C.Address2,'')='' Then'' Else  ', '+ C.Address2 End)+(Case When ISNULL(C.City,'')='' Then''  Else ', '+ C.City End) as CustAddress  ,c.ZoneCode as AlternateShipAgent,  b.DeliveryDate        from  OrderHdr b  With (NOLOCK) INNER JOIN Customer c With (NOLOCK) on b.CustID = c.CustNo        Left Join cutofftime on b.Custorder like cutofftime.CustOrderNo+'%'    where IsNull(OrdLevelStatus,'') in ('PICK','WCN','PLA','PLG')     and  IsNull(TrolleyNo,'') = Case when IsNull(OrdLevelStatus,'')='WCN'     then '' else isnull(TrolleyNo,'') end  and     IsNull(B.Void,0)=0  and b.CustID = c.CustNo  and ISNULL(b.ConditionType,'') <> 'BatteryPrinting'      group by DCOrdNo,OrderOriginType, b.companyno, b.OrdNo,   b.CreatedDate,cutofftime.[Time],  C.CustNo,b.ShipCountry,b.Remarks, c.SalesAgent, c.CustName,  C.Address, C.Address2,C.City,  c.ZoneCode,b.ToteBoxno, b.DeliveryDate,B.AgentID ,B.OrdLevelStatus) as A1 group by vehicleid   )     as Agent on Agent.AgentID=SalesAgent.Code  and (salesagent.active=1)       Union select 'BUFFER' as  Code,'BUFFER-AUTO ASSIGN' as UserID,     1 as IsLogged ,1003 as OrdC,'' Status1     Union  select 'BUFFERMA' as  Code,'BUFFER-MANUAL ASSIGN' as UserID, 1 as IsLogged     ,1002 as OrdC,'' Status1     Union select 'BUFFERPDD' as  Code,'BUFFER for future PDD' as UserID, 1 as IsLogged ,1001 as OrdC,'' Status1     Union select 'SPC' as  Code,'Special Process - Part Shortage' as UserID, 1 as IsLogged ,1000 as OrdC,'' Status1 ) as A where Code<>'ADMIN'    order by   IsLogged Desc,OrdC desc,Status1 ,UserID ";
    execute(qry);
    vehicleData = executeQry;
    DDAssignVehicle(executeQry);
    LoadVehicle(vehicleData);

    GetVehicleData(vehicleData);
}

function GetVehicleListDataRefresh() {
    GetVehicleData(vehicleData);
}

function LoadVehicle(data) {
    $("#VehicleAssignmentId").html('');
    var htm = '';
    var tbodyId = '';
    var BackRoundcolor = 'Green';
    if (data != null) {
        htm += '<input  style="display:none" type="button" value="Order Count" onclick="showCount();">';
        htm += '<span style="display:none" id="OrdCntId" style="color:blue"></span>';
        htm += '<br/>';

        for (var i = 0; i < data.length; i++) {
            if (data[i].IsLogged == "0")
                BackRoundcolor = "red";
            else
                BackRoundcolor = 'Green';



            htm += '<div id="div' + i + '" style="margin-left:3px;width: 49.7%; height: 350px; display: inline-block; margin-top: 5px; border-style: solid; border-color: ' + BackRoundcolor + '; border-width: 10px 10px 10px 10px;">';
            // FOR POD TOTAL TIME CALCULATION PURPOSE HEIGHT IS INCREASED 65PX INSTEAD OF 37px
            htm += '<div  id="divbackRoundColor' + i + '"  style="background-color: ' + BackRoundcolor + '; height: 12%;margin-top:-1px">';
            htm += '<div class="w3-dropdown-hover">';
            htm += '<a  id="printbtnbackRoundColor' + i + '"    class="w3-button " style="color: white;background-color: ' + BackRoundcolor + ';"><span class="glyphicon glyphicon-print"></span></a>';
            htm += '<div    class="w3-dropdown-content w3-bar-block w3-border">';
            //htm += '<a   onclick="PrintPickingConsolidated(' + i + ',\'' + data[i].Code + '\');" class="w3-bar-item w3-button">Print Picking Consolidated</a>';

            if (Language.toLowerCase() == "english") {
                htm += '<a style="width:145%"  onclick="Open_Detail(' + i + ',\'' + data[i].Code + '\');" class="w3-bar-item w3-button">Details</a>';

            }
            else {
                htm += '<a style="width:145%"  onclick="Open_Detail(' + i + ',\'' + data[i].Code + '\');" class="w3-bar-item w3-button">Detale</a>';

            }

            if (data[i].Code.toLowerCase() != "buffer" && data[i].Code.toLowerCase() != "bufferma" && data[i].Code.toLowerCase() != "spc" && data[i].Code.toLowerCase() != "bufferpdd") {
                if (Language.toLowerCase() == "english") {
                    htm += '<a style="width:145%"  onclick="OrderReassign(' + i + ',\'' + data[i].Code + '\');" class="w3-bar-item w3-button">Move all orders to Buffer</a>';
                    htm += '<a  style="width:145%"  onclick="OrderAssignToPicker(' + i + ',\'' + data[i].Code + '\');" class="w3-bar-item w3-button">Reassign all orders to another Picker</a>';
                }
                else {
                    htm += '<a style="width:145%"  onclick="OrderReassign(' + i + ',\'' + data[i].Code + '\');" class="w3-bar-item w3-button">Przenieś wszystkie zamówienia do bufora</a>';
                    htm += '<a  style="width:145%"  onclick="OrderAssignToPicker(' + i + ',\'' + data[i].Code + '\');" class="w3-bar-item w3-button">Przypisz wszystkie zamówienia do innego Pickera</a>';
                }
            }

            

            htm += '</div>';
            htm += '</div>';
            htm += ' <span id="divVehId' + i + '" style="display:none">' + data[i].Status1 + '</span>';
            //htm += ' <span id="divVehId' + i + '" style="display:none;">' + data[i].UserID + "" + data[i].Status1 + "  ";
            htm += ' <span id="divHeaderId' + i + '" style="margin-left:5px;font-size:13px;font-weight:bold;color:white;">' + data[i].UserID + "" + data[i].Status1 + "  ";
            htm += '<a href="#" onclick="RemoveVehiclTable(' + i + ');" style="float: right; color: white;"><span class="glyphicon glyphicon-remove"></span></a>';
            //htm += '<a href="#" onclick="return DownRow_func()" style="float: right; color: white;"><span class="glyphicon glyphicon-download"></span></a>';
            //htm += '<a href="#" onclick="return UpRow_func()" style="float: right; color: white;"><span class="glyphicon glyphicon-upload"></span></a>';
            htm += '</div>';

            //htm += '<div style="margin-top:3px;">';
            ////htm += 'Search';
            //htm += '<input   style="width:30%;margin-left:10px;" type="text" id="SearchId' + i + '" onblur="GetSearchDate(' + i + ',\'' + data[i].Code + '\')"  />';
            //htm += '<button style="width:13%;margin-left:10px;" type="button" class="btn btn-info">Search</button>';

            //htm += '</div>';
            //htm += '<br/>';

            htm += '<table id="table' + i + '" name="' + data[i].Code + '_' + i + '" class="table table-striped table-bordered tableId" style="margin-left: 4px;height:88%;overflow:auto;  ">';
            tbodyId = vehicleData[i].Code.replace(/ /g, '').replace("/", "");
            htm += '<tbody class="' + data[i].Code + ' connectedSortable" value="' + data[i].Code + '"   id="tbodyId_' + i + '"    style="font-size:10px;height:280px;display:block;overflow:scroll;">';
            //htm += '<tbody class="' + data[i].Code + ' connectedSortable" value="' + data[i].Code + '"   id="tbodyId_' + i + '"    style="font-size:.8em;height:280px;display:block;overflow:scroll">';
            //htm += '<tbody class="' + data[i].Code + ' connectedSortable" value="' + data[i].Code + '"   id="' + tbodyId + '_' + i + '"    style="font-size:.8em;height:280px;display:block;overflow:scroll">';
            htm += '<tr class="table' + i + '" id="' + data[i].Code + '" >';
            htm += '<th  style="width: 0%;display: none">Order No</th>';

            if (Language.toLowerCase() == "english") {
                htm += '<th  style="width: 0%;display: none">Order No</th>';
                htm += '<th  style="width: 12%;">Order No</th>';
                htm += '<th  style="width: 10%;">ToteBox</th>';
                htm += '<th  style="width: 10%;">Total Lines</th>';
                //htm += '<th  style="width: 35%;;">Customer No</th>';
                htm += '<th  style="width: 15%;">Customer Name</th>';

                htm += '<th  style="width: 14%;">Plan DeliveryDate</th>';
                htm += '<th  style="width: 11%;">Ship to Country</th>';
                htm += '<th  style="width: 16%;">Remarks</th>';
                htm += '<th  style="width: 12%;">OrdLevel status</th>';
            } else {
                /////////////////////
                htm += '<th  style="width: 12%;">Nr zamówienia</th>';
                htm += '<th  style="width: 10%;">Kuweta</th>';
                htm += '<th  style="width: 10%;">Suma linii</th>';
                htm += '<th  style="width: 15%;">Nazwa Klienta</th>';

                htm += '<th  style="width: 14%;">Plan Dostawy Data</th>';
                htm += '<th  style="width: 11%;">Wysyłka do kraju</th>';
                htm += '<th  style="width: 16%;">Komentarz</th>';
                htm += '<th  style="width: 12%;">Stan na poziomie zamówienia</th>';
            }

            htm += '<th  style="width: 0%;display: none">"' + data[i].Code + '""</th>';
            htm += '</tr>';
            htm += '</tbody>';
            htm += '</table>';
            htm += '</div>';
        }
        $("#VehicleAssignmentId").append(htm);

        //$('#table0').DataTable();

    }
}


//function GetSearchDate(i)
//{

//}



function GetVehicleData(vehData) {

    var _totQty = 0;
    var _totnoofOrders = 0;

    ///
    sorted_Customer_List = [];
    ///
    var qry = "";

    //qry = " select SoldTo,NoSeries,DeliveryDate ,Amount,companyno, VehicleID, Territory, OrdNo, Cubage, CaseQty, CustomerName,";
    //qry += "TotalLines from  (select Count as TotalLines, P.SoldTo, (select top 1 NoSeries from OrderSeries Where a.OrdNo ";
    //qry += "Like Replace(NoSeries,'*','')+'%') as NoSeries , b.TotalAmt as Amount,b.companyno, Case when Isnull(B.AgentID,'')='' then 'BUFFER'";
    //qry += "else B.AgentID  end as VehicleID, c.City as Territory,  a.OrdNo as OrdNo, Sum(a.Cubage) as Cubage, ";
    //qry += "Isnull(Sum(a.ItemCaseQty),0) as CaseQty,  c.CustName as CustomerName  , C.Address+(Case When ISNULL(C.Address2,'')='' ";
    //qry += "Then'' Else ', '+ C.Address2 End)+(Case When ISNULL(C.City,'')=''  Then'' Else ', '+ C.City End) as CustAddress  ,";
    //qry += "c.ZoneCode as AlternateShipAgent, b.DeliveryDate  from (select OrdItem.OrdNo,  (select top 1 (Cubage / BaseQty) * OrdItem.Qty   ";
    //qry += "from UOM inner join Item on Item.ItemNo=UOM.ItemNo  where Uom.ItemNo=OrdItem.ItemNo and Uom.Uom=Item.BulkUOM) as Cubage, ";
    //qry += "(OrdItem.Qty / (select top 1 BaseQty   from UOM  inner join Item on Item.ItemNo=UOM.ItemNo  ";
    //qry += "where Uom.ItemNo=OrdItem.ItemNo and Uom.Uom=Item.BulkUOM)) as ItemCaseQty  from  OrdItem) a   INNER JOIN OrderHdr b on a.OrdNo=b.OrdNo ";
    //qry += "inner join (select OrdNo,Count(*)   as count,  (select Count(*)  from OrdItem O  where OrdItem.OrdNO=O.OrdNO and  O.Qty=O.DeliQty and ISNULL(O.NoPick,0)=0 group by OrdNo) as DelCount,";
    //qry += "(select Count(*)  from OrdItem O where OrdItem.OrdNO=O.OrdNO  and ISNULL(O.NoPick,0)=1 group by OrdNo) as NoPickCount,";
    //qry += "(select Count(*)  from OrdItem O where OrdItem.OrdNO=O.OrdNO  and ISNULL(O.NoPick,0)=2 group by OrdNo) as KickOutCount ";
    //qry += "from OrdItem group by ordNo) d on d.ordNo=b.ordNo  and D.count <>ISNULL(D.DelCount,0)  +ISNULL(D.KickOutCount,0) +ISNULL(D.NoPickCount ,0)";
    //qry += "INNER JOIN Customer c on b.CustID = c.CustNo   Left Join OrderBP P on P.SoldTo=b.CustId   where (b.Void=0 or b.Void is null)  ";
    //qry += "and b.CustID = c.CustNo   and  isnull(PickingStatus,0) < 8   and  b.OrdNo not in  (select OrdNo from invoice  where (Void = 0 or Void is null))  ";
    //qry += "group by b.companyno, a.OrdNo, b.TotalAmt,  c.SalesAgent, c.CustName, C.Address, C.Address2,C.City, c.ZoneCode,";
    //qry += "b.DeliveryDate,B.AgentID ,P.SoldTo,d.Count) as A1  order by isnull(companyno,0),VehicleID ,DeliveryDate,";
    //qry += "IIf(IsNull(SoldTo,'')<>'',0,1),ISNULL(SoldTo,''), IIf(IsNull(NoSeries,'')<>'',0,1),ISNULL(NoSeries,'') ";

    //qry = "select  SoldTo,NoSeries,DeliveryDate ,Amount,companyno, VehicleID, Territory, OrdNo,    CustomerName, ";
    //qry += "TotalLines, isnull((Select Description from Orderstatus where code=OrdLevelstatus),'') as OrdLevelstatus from  ";
    //qry += "(select Count as TotalLines, P.SoldTo,  (select top 1 NoSeries from OrderSeries  Where a.OrdNo Like ";
    //qry += "Replace(NoSeries,'*','')+'%') as NoSeries ,  b.TotalAmt as Amount,b.companyno, B.OrdLevelStatus, ";
    //qry += "Case when Isnull(B.AgentID,'')='' then 'BUFFER'else B.AgentID  end as VehicleID,  c.City as Territory, ";
    //qry += "a.OrdNo as OrdNo, Sum(a.Cubage) as Cubage,  Isnull(Sum(a.ItemCaseQty),0) as CaseQty,  c.CustName as CustomerName  , ";
    //qry += "C.Address+(Case When ISNULL(C.Address2,'')='' Then'' Else  ', '+ C.Address2 End)+(Case When ISNULL(C.City,'')=''  Then''  Else ', '+ C.City End) as CustAddress  , ";
    //qry += "c.ZoneCode as AlternateShipAgent,  b.DeliveryDate  from (select OrdItem.OrdNo,   (select top 1 (Cubage / BaseQty) * OrdItem.Qty   from UOM inner join Item on Item.ItemNo=UOM.ItemNo  ";
    //qry += "where Uom.ItemNo=OrdItem.ItemNo and Uom.Uom=Item.BulkUOM) as Cubage, (OrdItem.Qty / (select top 1 BaseQty  ";
    //qry += "from UOM  inner join Item on Item.ItemNo=UOM.ItemNo   where Uom.ItemNo=OrdItem.ItemNo and  ";
    //qry += "Uom.Uom=Item.LooseUOM)) as ItemCaseQty  from  OrdItem) a   INNER JOIN OrderHdr b on a.OrdNo=b.OrdNo  ";
    //qry += "inner join (select OrdNo,Count(*)   as count, (select Count(*)  from OrdItem O   ";
    //qry += "where OrdItem.OrdNO=O.OrdNO and   O.Qty=O.DeliQty and ISNULL(O.NoPick,0)=0 group by OrdNo) as DelCount, ";
    //qry += "(select Count(*)  from OrdItem O where OrdItem.OrdNO=O.OrdNO  and ISNULL(O.NoPick,0)=1 group by OrdNo) as NoPickCount,(select Count(*) ";
    //qry += "from OrdItem O where OrdItem.OrdNO=O.OrdNO  and ISNULL(O.NoPick,0)=2 group by OrdNo) as KickOutCount  ";
    //qry += "from OrdItem group by ordNo) d on d.ordNo=b.ordNo  and D.count <>ISNULL(D.DelCount,0)  +ISNULL(D.KickOutCount,0) +ISNULL(D.NoPickCount ,0) ";
    //qry += "INNER JOIN Customer c on b.CustID = c.CustNo   Left Join OrderBP P on P.SoldTo=b.CustId  Left Join invoice I on I.OrdNo=b.OrdNo and IsnUll(I.Void,0) = 0 where IsNull(B.Void,0)=0  and b.CustID = c.CustNo  and I.InvNo Is NULL and  isnull(PickingStatus,0) < 8  ";
    //qry += "group by b.companyno, a.OrdNo, b.TotalAmt,  c.SalesAgent, c.CustName,  C.Address, C.Address2,C.City, c.ZoneCode, ";
    //qry += "b.DeliveryDate,B.AgentID ,B.OrdLevelStatus, P.SoldTo,d.Count) as A1  order by VehicleID,isnull(companyno,0),  DeliveryDate,OrdNo";
    ////order by isnull(OrderHdr.companyno,0),VehicleID , DeliveryDate,OrdNo

    //qry = "select  VehicleID,OrdNo,CustNo,CustomerName, format(DeliveryDate,(select dateformatstring from System)) as DeliveryDate  ,ShipCountry,Remarks";
    //qry += ", isnull((Select Description from Orderstatus where code=OrdLevelstatus),'') as OrdLevelstatus from  ";
    //qry += "(select Count as TotalLines, P.SoldTo, b.ShipCountry, (select top 1 NoSeries from OrderSeries  Where a.OrdNo Like ";
    //qry += "Replace(NoSeries,'*','')+'%') as NoSeries ,b.Remarks, b.companyno, B.OrdLevelStatus, ";
    //qry += "Case when Isnull(B.AgentID,'')='' then 'BUFFER'else B.AgentID  end as VehicleID,  c.City as Territory, ";
    //qry += "a.OrdNo as OrdNo, Sum(a.Cubage) as Cubage,  Isnull(Sum(a.ItemCaseQty),0) as CaseQty,  C.CustNo,c.CustName as CustomerName  , ";
    //qry += "C.Address+(Case When ISNULL(C.Address2,'')='' Then'' Else  ', '+ C.Address2 End)+(Case When ISNULL(C.City,'')=''  Then''  Else ', '+ C.City End) as CustAddress  , ";
    //qry += "c.ZoneCode as AlternateShipAgent,  b.DeliveryDate  from (select OrdItem.OrdNo,   (select top 1 (Cubage / BaseQty) * OrdItem.Qty   from UOM inner join Item on Item.ItemNo=UOM.ItemNo  ";
    //qry += "where Uom.ItemNo=OrdItem.ItemNo and Uom.Uom=Item.BulkUOM) as Cubage, (OrdItem.Qty / (select top 1 BaseQty  ";
    //qry += "from UOM  inner join Item on Item.ItemNo=UOM.ItemNo   where Uom.ItemNo=OrdItem.ItemNo and  ";
    //qry += "Uom.Uom=Item.LooseUOM)) as ItemCaseQty  from  OrdItem) a   INNER JOIN OrderHdr b on a.OrdNo=b.OrdNo  ";
    //qry += "inner join (select OrdNo,Count(*)   as count, (select Count(*)  from OrdItem O   ";
    //qry += "where OrdItem.OrdNO=O.OrdNO and   O.Qty=O.DeliQty and ISNULL(O.NoPick,0)=0 group by OrdNo) as DelCount, ";
    //qry += "(select Count(*)  from OrdItem O where OrdItem.OrdNO=O.OrdNO  and ISNULL(O.NoPick,0)=1 group by OrdNo) as NoPickCount,(select Count(*) ";
    //qry += "from OrdItem O where OrdItem.OrdNO=O.OrdNO  and ISNULL(O.NoPick,0)=2 group by OrdNo) as KickOutCount  ";
    //qry += "from OrdItem group by ordNo) d on d.ordNo=b.ordNo  and D.count <>ISNULL(D.DelCount,0)  +ISNULL(D.KickOutCount,0) +ISNULL(D.NoPickCount ,0) ";
    //qry += "INNER JOIN Customer c on b.CustID = c.CustNo   Left Join OrderBP P on P.SoldTo=b.CustId  Left Join invoice I on I.OrdNo=b.OrdNo and IsnUll(I.Void,0) = 0 where IsNull(B.Void,0)=0  and b.CustID = c.CustNo  and I.InvNo Is NULL and  isnull(PickingStatus,0) < 8  ";
    //qry += "group by b.companyno, a.OrdNo, C.CustNo,b.ShipCountry,b.Remarks, ";
    //qry += "c.SalesAgent, c.CustName,  C.Address, C.Address2,C.City, c.ZoneCode, ";
    //qry += "b.DeliveryDate,B.AgentID ,B.OrdLevelStatus, P.SoldTo,d.Count) as A1 order by VehicleID,isnull(companyno,0),  DeliveryDate,OrdNo";

    //qry = "select  VehicleID,OrdNo,CustNo,CustomerName, format(DeliveryDate,(select dateformatstring from System)) as DeliveryDate  ,    ShipCountry,Remarks,ToteBoxno, isnull((Select Description from Orderstatus where code=OrdLevelstatus),'') as OrdLevelstatus from  (select Count as TotalLines, P.SoldTo, b.ShipCountry, (select top 1 NoSeries from OrderSeries  Where a.OrdNo Like Replace(NoSeries,'*','')+'%') as NoSeries ,B.ToteBoxno,b.Remarks, b.companyno, B.OrdLevelStatus, Case when Isnull(B.AgentID,'')='' then (Select Case when IsNull(OrderOrigin,'')='' then 'BUFFERMA' else 'BUFFER' end) else B.AgentID  end as VehicleID,  c.City as Territory, a.OrdNo as OrdNo, Sum(a.Cubage) as Cubage,  Isnull(Sum(a.ItemCaseQty),0) as CaseQty,  C.CustNo,c.CustName as CustomerName  , C.Address+(Case When ISNULL(C.Address2,'')='' Then'' Else  ', '+ C.Address2 End)+(Case When ISNULL(C.City,'')=''  Then''  Else ', '+ C.City End) as CustAddress  , c.ZoneCode as AlternateShipAgent,  b.DeliveryDate  from (select OrdItem.OrdNo,   (select top 1 (Cubage / BaseQty) * OrdItem.Qty   from UOM inner join Item on Item.ItemNo=UOM.ItemNo  where Uom.ItemNo=OrdItem.ItemNo and Uom.Uom=Item.BulkUOM) as Cubage, (OrdItem.Qty / (select top 1 BaseQty  from UOM  inner join Item on Item.ItemNo=UOM.ItemNo   where Uom.ItemNo=OrdItem.ItemNo and  Uom.Uom=Item.LooseUOM)) as ItemCaseQty  from  OrdItem) a   INNER JOIN OrderHdr b on a.OrdNo=b.OrdNo  inner join (select OrdNo,Count(*)   as count, (select Count(*)  from OrdItem O   where OrdItem.OrdNO=O.OrdNO and   O.Qty=O.DeliQty and ISNULL(O.NoPick,0)=0 group by OrdNo) as DelCount, (select Count(*)  from OrdItem O where OrdItem.OrdNO=O.OrdNO  and ISNULL(O.NoPick,0)=1 group by OrdNo) as NoPickCount,(select Count(*) from OrdItem O where OrdItem.OrdNO=O.OrdNO  and ISNULL(O.NoPick,0)=2 group by OrdNo) as KickOutCount  from OrdItem group by ordNo) d on d.ordNo=b.ordNo  and D.count <>ISNULL(D.DelCount,0)  +ISNULL(D.KickOutCount,0) +ISNULL(D.NoPickCount ,0) INNER JOIN Customer c on b.CustID = c.CustNo   Left Join OrderBP P on P.SoldTo=b.CustId  Left Join invoice I on I.OrdNo=b.OrdNo and IsnUll(I.Void,0) = 0 where IsNull(B.Void,0)=0  and b.CustID = c.CustNo  and I.InvNo Is NULL and  isnull(PickingStatus,0) < 8  group by OrderOrigin, b.companyno, a.OrdNo, C.CustNo,b.ShipCountry,b.Remarks, c.SalesAgent, c.CustName,  C.Address, C.Address2,C.City, c.ZoneCode,b.ToteBoxno, b.DeliveryDate,B.AgentID ,B.OrdLevelStatus, P.SoldTo,d.Count) as A1";
    //qry += " order by VehicleID,isnull(companyno,0),  DeliveryDate,OrdNo";

    //qry = "select  VehicleID,OrdNo,CustNo,CustomerName, format(DeliveryDate,(select dateformatstring from System)) as DeliveryDate  ,ShipCountry,Remarks,ToteBoxno, isnull((Select Description from Orderstatus where code=OrdLevelstatus),'') as OrdLevelstatus from  (select Count as TotalLines, P.SoldTo, b.ShipCountry, (select top 1 NoSeries from OrderSeries  Where a.OrdNo Like Replace(NoSeries,'*','')+'%') as NoSeries ,B.ToteBoxno,b.Remarks, b.companyno, B.OrdLevelStatus, Case when Isnull(B.AgentID,'')='' then (Select Case when IsNull(OrderOrigin,'')='' then 'BUFFERMA' else 'BUFFER' end) else B.AgentID  end as VehicleID,  c.City as Territory, a.OrdNo as OrdNo, Sum(a.Cubage) as Cubage,  Isnull(Sum(a.ItemCaseQty),0) as CaseQty,  C.CustNo,c.CustName as CustomerName  , C.Address+(Case When ISNULL(C.Address2,'')='' Then'' Else  ', '+ C.Address2 End)+(Case When ISNULL(C.City,'')=''  Then''  Else ', '+ C.City End) as CustAddress  , c.ZoneCode as AlternateShipAgent,  b.DeliveryDate  from (select OrdItem.OrdNo,   (select top 1 (Cubage / BaseQty) * OrdItem.Qty   from UOM inner join Item on Item.ItemNo=UOM.ItemNo  where Uom.ItemNo=OrdItem.ItemNo and Uom.Uom=Item.BulkUOM) as Cubage, (OrdItem.Qty / (select top 1 BaseQty  from UOM  inner join Item on Item.ItemNo=UOM.ItemNo   where Uom.ItemNo=OrdItem.ItemNo and  Uom.Uom=Item.LooseUOM)) as ItemCaseQty  from  OrdItem) a   INNER JOIN OrderHdr b on a.OrdNo=b.OrdNo  inner join (select OrdNo,Count(*)   as count, (select Count(*)  from OrdItem O   where OrdItem.OrdNO=O.OrdNO and   O.Qty=O.DeliQty and ISNULL(O.NoPick,0)=0 group by OrdNo) as DelCount, (select Count(*)  from OrdItem O where OrdItem.OrdNO=O.OrdNO  and ISNULL(O.NoPick,0)=1 group by OrdNo) as NoPickCount,(select Count(*) from OrdItem O where OrdItem.OrdNO=O.OrdNO  and ISNULL(O.NoPick,0)=2 group by OrdNo) as KickOutCount  from OrdItem group by ordNo) d on d.ordNo=b.ordNo  and D.count <>ISNULL(D.DelCount,0)  +ISNULL(D.KickOutCount,0) +ISNULL(D.NoPickCount ,0) INNER JOIN Customer c on b.CustID = c.CustNo   Left Join OrderBP P on P.SoldTo=b.CustId  Left Join invoice I on I.OrdNo=b.OrdNo and IsnUll(I.Void,0) = 0     where IsNull(OrdLevelStatus,'') in ('PICK','WCN','PLA','PLG') and TrolleyNo = Case when IsNull(OrdLevelStatus,'')='WCN' then '' else TrolleyNo end  and     IsNull(B.Void,0)=0  and b.CustID = c.CustNo  and I.InvNo Is NULL and  isnull(PickingStatus,0) < 8  group by OrderOrigin, b.companyno, a.OrdNo, C.CustNo,b.ShipCountry,b.Remarks, c.SalesAgent, c.CustName,  C.Address, C.Address2,C.City, c.ZoneCode,b.ToteBoxno, b.DeliveryDate,B.AgentID ,B.OrdLevelStatus, P.SoldTo,d.Count) as A1";
    //qry += " order by VehicleID,isnull(companyno,0),  DeliveryDate,OrdNo";



    //--Note : Any update this query and also update this store producture OrderAssignmentAssignBuffer

    //qry = "select  VehicleID,OrdNo,DCOrdNo,CustNo,CustomerName, format(DeliveryDate,(select dateformatstring from System)) as DeliveryDate  ,ShipCountry,Remarks,ToteBoxno, isnull((Select Description from Orderstatus where code=OrdLevelstatus),'') as OrdLevelstatus,(Select count(*) from orditem where orditem.OrdNo=A1.OrdNo) as TotalLines from  (select Count as TotalLines, P.SoldTo, b.ShipCountry, (select top 1 NoSeries from OrderSeries  Where a.OrdNo Like Replace(NoSeries,'*','')+'%') as NoSeries ,B.ToteBoxno,b.Remarks, b.companyno, B.OrdLevelStatus, Case when Isnull(B.AgentID,'')='' or Isnull(B.AgentID,'')  like '%buffer%' then (Select Case when IsNull(OrderOriginType,'')<>'' then (Select case when Convert(Date,b.DeliveryDate) <= Convert(Date,GetDate()+(select cast (SystemValue as float) from SystemList where Code='PDDDate')) then 'BUFFER' else 'BUFFERPDD' end)else  'BUFFERMA'  end)    else B.AgentID  end  as VehicleID,c.City as Territory, a.OrdNo as OrdNo, Sum(a.Cubage) as Cubage,  Isnull(Sum(a.ItemCaseQty),0) as CaseQty,  C.CustNo,c.CustName as CustomerName  , C.Address+(Case When ISNULL(C.Address2,'')='' Then'' Else  ', '+ C.Address2 End)+(Case When ISNULL(C.City,'')=''  Then''  Else ', '+ C.City End) as CustAddress  ,c.ZoneCode as AlternateShipAgent,  b.DeliveryDate  from (select OrdItem.OrdNo, (select top 1 (Cubage / BaseQty) * OrdItem.Qty   from UOM inner join Item on Item.ItemNo=UOM.ItemNo     where Uom.ItemNo=OrdItem.ItemNo and Uom.Uom=Item.BulkUOM) as Cubage, (OrdItem.Qty / (select top 1 BaseQty  from UOM     inner join Item on Item.ItemNo=UOM.ItemNo   where Uom.ItemNo=OrdItem.ItemNo and  Uom.Uom=Item.LooseUOM)) as ItemCaseQty     from  OrdItem) a   INNER JOIN OrderHdr b on a.OrdNo=b.OrdNo  inner join (select OrdNo,Count(*)   as count,    (select Count(*)  from OrdItem O   where OrdItem.OrdNO=O.OrdNO and   O.Qty=O.DeliQty and ISNULL(O.NoPick,0)=0 group by OrdNo)     as DelCount, (select Count(*)  from OrdItem O where OrdItem.OrdNO=O.OrdNO     and ISNULL(O.NoPick,0)=1 group by OrdNo) as NoPickCount,(select Count(*) from OrdItem O     where OrdItem.OrdNO=O.OrdNO  and ISNULL(O.NoPick,0)=2 group by OrdNo) as KickOutCount      from OrdItem group by ordNo) d on d.ordNo=b.ordNo      and D.count <>ISNULL(D.DelCount,0)  +ISNULL(D.KickOutCount,0) +ISNULL(D.NoPickCount ,0)     INNER JOIN Customer c on b.CustID = c.CustNo   Left Join OrderBP P on P.SoldTo=b.CustId      Left Join invoice I on I.OrdNo=b.OrdNo and IsnUll(I.Void,0) = 0         where IsNull(OrdLevelStatus,'') in ('PICK','WCN','PLA','PLG')     and TrolleyNo = Case when IsNull(OrdLevelStatus,'')='WCN' then '' else TrolleyNo end  and       IsNull(B.Void,0)=0  and b.CustID = c.CustNo  and I.InvNo Is NULL and      isnull(PickingStatus,0) < 8  group by OrderOriginType, b.companyno, a.OrdNo,    C.CustNo,b.ShipCountry,b.Remarks, c.SalesAgent, c.CustName,  C.Address, C.Address2,C.City,     c.ZoneCode,b.ToteBoxno, b.DeliveryDate,B.AgentID ,B.OrdLevelStatus, P.SoldTo,d.Count) as A1";
    //qry += " order by VehicleID,isnull(companyno,0),  DeliveryDate,OrdNo ";

    // Commented As per Ram and Isabel 28.02.2023
    //qry = "select  VehicleID,OrdNo,DCOrdNo,CustNo,CustomerName, format(DeliveryDate,(select dateformatstring from System)) as DeliveryDate  ,ShipCountry,Remarks,ToteBoxno, isnull((Select Description from Orderstatus where code=OrdLevelstatus),'') as OrdLevelstatus,TotalLines  from  (select DCOrdNo,Count as TotalLines, P.SoldTo, b.ShipCountry, (select top 1 NoSeries from OrderSeries  Where a.OrdNo Like Replace(NoSeries,'*','')+'%') as NoSeries ,B.ToteBoxno,b.Remarks, b.companyno, B.OrdLevelStatus, Case when Isnull(B.AgentID,'')='' or Isnull(B.AgentID,'')  like '%buffer%' then (Select Case when IsNull(OrderOriginType,'')<>'Manual Assign' then (Select case when Convert(Date,b.DeliveryDate) <= Convert(Date,GetDate()+(select cast (SystemValue as float) from SystemList where Code='PDDDate')) then 'BUFFER' else 'BUFFERPDD' end)else  'BUFFERMA'  end)    else B.AgentID  end  as VehicleID,c.City as Territory, a.OrdNo as OrdNo, Sum(a.Cubage) as Cubage,  Isnull(Sum(a.ItemCaseQty),0) as CaseQty,  C.CustNo,c.CustName as CustomerName  , C.Address+(Case When ISNULL(C.Address2,'')='' Then'' Else  ', '+ C.Address2 End)+(Case When ISNULL(C.City,'')=''  Then''  Else ', '+ C.City End) as CustAddress  ,c.ZoneCode as AlternateShipAgent,  b.DeliveryDate  from (select OrdItem.OrdNo, (select top 1 (Cubage / BaseQty) * OrdItem.Qty   from UOM    inner join Item on Item.ItemNo=UOM.ItemNo     where Uom.ItemNo=OrdItem.ItemNo and Uom.Uom=Item.BulkUOM) as Cubage,     (OrdItem.Qty / (select top 1 BaseQty  from UOM     inner join Item on Item.ItemNo=UOM.ItemNo   where Uom.ItemNo=OrdItem.ItemNo and  Uom.Uom=Item.LooseUOM)) as ItemCaseQty       from  OrdItem) a   INNER JOIN OrderHdr b on a.OrdNo=b.OrdNo  inner join (select OrdNo,Count(*)   as count,    (select Count(*)  from OrdItem O      where OrdItem.OrdNO=O.OrdNO and   O.Qty=O.DeliQty and ISNULL(O.NoPick,0)=0 group by OrdNo)     as DelCount, (select Count(*)  from OrdItem O     where OrdItem.OrdNO=O.OrdNO     and ISNULL(O.NoPick,0)=1 group by OrdNo) as NoPickCount,(select Count(*) from OrdItem O        where OrdItem.OrdNO=O.OrdNO  and ISNULL(O.NoPick,0)=2 group by OrdNo) as KickOutCount      from OrdItem group by ordNo) d on d.ordNo=b.ordNo        and D.count <>ISNULL(D.DelCount,0)  +ISNULL(D.KickOutCount,0) +ISNULL(D.NoPickCount ,0)        INNER JOIN Customer c on b.CustID = c.CustNo   Left Join OrderBP P on P.SoldTo=b.CustId       Left Join invoice I on I.OrdNo=b.OrdNo and IsnUll(I.Void,0) = 0         where IsNull(OrdLevelStatus,'') in ('PICK','WCN','PLA','PLG')        and  IsNull(TrolleyNo,'') = Case when IsNull(OrdLevelStatus,'')='WCN' then '' else isnull(TrolleyNo,'') end  and       IsNull(B.Void,0)=0  and b.CustID = c.CustNo  and ISNULL(b.ConditionType,'') <> 'BatteryPrinting' and I.InvNo Is NULL and       isnull(PickingStatus,0) < 8  group by DCOrdNo,OrderOriginType, b.companyno, a.OrdNo,        C.CustNo,b.ShipCountry,b.Remarks, c.SalesAgent, c.CustName,  C.Address, C.Address2,C.City,         c.ZoneCode,b.ToteBoxno, b.DeliveryDate,B.AgentID ,B.OrdLevelStatus, P.SoldTo,d.Count) as A1 ";
    //qry += " order by VehicleID,isnull(companyno,0),  DeliveryDate,OrdNo ";

    //qry = "select  VehicleID,OrdNo,DCOrdNo,CustNo,CustomerName, format(DeliveryDate,(select dateformatstring from System)) as DeliveryDate  ,ShipCountry,Remarks,ToteBoxno, isnull((Select Description from Orderstatus where code=OrdLevelstatus),'') as OrdLevelstatus, TotalLines from  (select DCOrdNo,(select COunt(*) from Orditem where Ordno=b.ordno) as TotalLines,  b.ShipCountry, '' as NoSeries ,B.ToteBoxno,b.Remarks, b.companyno, B.OrdLevelStatus, Case when Isnull(B.AgentID,'')='' or Isnull(B.AgentID,'')  like '%buffer%' then (Select Case when IsNull(OrderOriginType,'')<>'Manual Assign' then (Select case when Convert(Date,b.DeliveryDate) <= Convert(Date,GetDate()+(select cast (SystemValue as float) from SystemList where Code='PDDDate')) then 'BUFFER' else 'BUFFERPDD' end)else  'BUFFERMA'  end)    else B.AgentID  end  as VehicleID,c.City as Territory, b.OrdNo as OrdNo,C.CustNo,c.CustName as CustomerName  , C.Address+(Case When ISNULL(C.Address2,'')='' Then'' Else  ', '+ C.Address2 End)+(Case When ISNULL(C.City,'')='' Then''  Else ', '+ C.City End) as CustAddress  ,c.ZoneCode as AlternateShipAgent,  b.DeliveryDate      from  OrderHdr b INNER JOIN Customer c on b.CustID = c.CustNo    where IsNull(OrdLevelStatus,'') in ('PICK','WCN','PLA','PLG')     and  IsNull(TrolleyNo,'') = Case when IsNull(OrdLevelStatus,'')='WCN' then '' else isnull(TrolleyNo,'') end  and     IsNull(B.Void,0)=0  and b.CustID = c.CustNo  and ISNULL(b.ConditionType,'') <> 'BatteryPrinting'    group by DCOrdNo,OrderOriginType, b.companyno, b.OrdNo,     C.CustNo,b.ShipCountry,b.Remarks, c.SalesAgent, c.CustName,  C.Address, C.Address2,C.City,      c.ZoneCode,b.ToteBoxno, b.DeliveryDate,B.AgentID ,B.OrdLevelStatus) as A1  ";
    //qry += " order by VehicleID,isnull(companyno,0),  DeliveryDate,OrdNo ";

    //qry = "select  VehicleID,OrdNo,DCOrdNo,CustNo,CustomerName, format(DeliveryDate,(select dateformatstring from System)) as DeliveryDate  ,ShipCountry,Remarks,ToteBoxno, isnull((Select Description from Orderstatus where code=OrdLevelstatus),'') as OrdLevelstatus, TotalLines from  (select DCOrdNo,(select COunt(*) from Orditem where Ordno=b.ordno) as TotalLines,  b.ShipCountry, '' as NoSeries ,B.ToteBoxno,b.Remarks, b.companyno,B.OrdLevelStatus, Case when Isnull(B.AgentID,'')='' or Isnull(B.AgentID,'')  like '%buffer%' then (Select Case when IsNull(OrderOriginType,'')<>'Manual Assign'     then (    Select case when Convert(Date,b.DeliveryDate)<= Convert(Date,GetDate()+(select cast (SystemValue as float) from SystemList where Code='PDDDate'))     and (b.DTG<dateadd(minute,datepart(minute,(Convert(time,cutofftime.Time))),(dateadd(hour,datepart(hour,(Convert(time,cutofftime.Time))),Convert(DateTime,Convert(Date,GetDate()))))) or (select cast (SystemValue as float) from SystemList where Code='PDDDate')>0)     then 'BUFFER'else 'BUFFERPDD' end )else  'BUFFERMA'  end)    else B.AgentID  end  as VehicleID,c.City as Territory, b.OrdNo as OrdNo,C.CustNo,c.CustName as CustomerName  , C.Address+(Case When ISNULL(C.Address2,'')='' Then'' Else  ', '+ C.Address2 End)+(Case When ISNULL(C.City,'')='' Then''  Else ', '+ C.City End) as CustAddress  ,c.ZoneCode as AlternateShipAgent,  b.DeliveryDate      from  OrderHdr b INNER JOIN Customer c on b.CustID = c.CustNo     Left Join cutofftime on substring(b.Ordno,1,2)=cutofftime.CustOrderNo    where IsNull(OrdLevelStatus,'') in ('PICK','WCN','PLA','PLG')     and  IsNull(TrolleyNo,'') = Case when IsNull(OrdLevelStatus,'')='WCN'     then '' else isnull(TrolleyNo,'') end  and     IsNull(B.Void,0)=0  and b.CustID = c.CustNo  and ISNULL(b.ConditionType,'') <> 'BatteryPrinting'      group by DCOrdNo,OrderOriginType, b.companyno, b.OrdNo,   b.DTG,cutofftime.[Time],  C.CustNo,b.ShipCountry,b.Remarks, c.SalesAgent, c.CustName,  C.Address, C.Address2,C.City,  c.ZoneCode,b.ToteBoxno, b.DeliveryDate,B.AgentID ,B.OrdLevelStatus) as A1 ";
    //qry += " order by VehicleID,isnull(companyno,0),  DeliveryDate,OrdNo ";

    ////07.04.2023
    //qry = "select  VehicleID,OrdNo,DCOrdNo,CustNo,CustomerName, format(DeliveryDate,(select dateformatstring from System)) as DeliveryDate  ,ShipCountry,Remarks,ToteBoxno, isnull((Select Description from Orderstatus where code=OrdLevelstatus),'') as OrdLevelstatus, TotalLines from  (select DCOrdNo,(select COunt(*) from Orditem where Ordno=b.ordno) as TotalLines,  b.ShipCountry, '' as NoSeries ,B.ToteBoxno,b.Remarks, b.companyno,B.OrdLevelStatus, Case when Isnull(B.AgentID,'')='' or Isnull(B.AgentID,'')  like '%buffer%' then (Select Case when IsNull(OrderOriginType,'')<>'Manual Assign'     then (    Select case when Convert(Date,b.DeliveryDate)<= Convert(Date,GetDate()+(select cast (SystemValue as float) from SystemList where Code='PDDDate'))     and ((b.CreatedDate<dateadd(minute,datepart(minute,(Convert(time,cutofftime.Time))),(dateadd(hour,datepart(hour,(Convert(time,cutofftime.Time))),Convert(DateTime,Convert(Date,GetDate()))))) or (select cast (SystemValue as float) from SystemList where Code='PDDDate')>0)  or cutofftime.time is null)   then 'BUFFER'else 'BUFFERPDD' end )else  'BUFFERMA'  end)    else B.AgentID  end  as VehicleID,c.City as Territory, b.OrdNo as OrdNo,C.CustNo,c.CustName as CustomerName  , C.Address+(Case When ISNULL(C.Address2,'')='' Then'' Else  ', '+ C.Address2 End)+(Case When ISNULL(C.City,'')='' Then''  Else ', '+ C.City End) as CustAddress  ,c.ZoneCode as AlternateShipAgent,  b.DeliveryDate      from  OrderHdr b INNER JOIN Customer c on b.CustID = c.CustNo     Left Join cutofftime on b.Custorder like cutofftime.CustOrderNo+'%'    where IsNull(OrdLevelStatus,'') in ('PICK','WCN','PLA','PLG')     and  IsNull(TrolleyNo,'') = Case when IsNull(OrdLevelStatus,'')='WCN'     then '' else isnull(TrolleyNo,'') end  and     IsNull(B.Void,0)=0  and b.CustID = c.CustNo  and ISNULL(b.ConditionType,'') <> 'BatteryPrinting'      group by DCOrdNo,OrderOriginType, b.companyno, b.OrdNo,   b.CreatedDate,cutofftime.[Time],  C.CustNo,b.ShipCountry,b.Remarks, c.SalesAgent, c.CustName,  C.Address, C.Address2,C.City,  c.ZoneCode,b.ToteBoxno, b.DeliveryDate,B.AgentID ,B.OrdLevelStatus) as A1 ";
    //qry += " order by VehicleID,isnull(companyno,0),  DeliveryDate,OrdNo ";

    //12.04.2023 - Ram
    //qry = "select  VehicleID,OrdNo,DCOrdNo,CustNo,CustomerName, format(DeliveryDate,(select dateformatstring from System)) as DeliveryDate  ,ShipCountry,Remarks,ToteBoxno,isnull((Select Description from Orderstatus where code=OrdLevelstatus),'') as OrdLevelstatus, TotalLines from  (select DCOrdNo,(select COunt(*) from Orditem where Ordno=b.ordno) as TotalLines,  b.ShipCountry, '' as NoSeries ,B.ToteBoxno,b.Remarks, b.companyno,B.OrdLevelStatus, Case when Isnull(B.AgentID,'')='' or Isnull(B.AgentID,'')  like '%buffer%' then (Select Case when IsNull(OrderOriginType,'')<>'Manual Assign'     then (    Select case when Convert(Date,b.DeliveryDate)<= Convert(Date,GetDate()+(select cast (SystemValue as float) from SystemList where Code='PDDDate'))     and ((b.CreatedDate<dateadd(minute,datepart(minute,(Convert(time,cutofftime.Time))),(dateadd(hour,datepart(hour,(Convert(time,cutofftime.Time))),Convert(DateTime,Convert(Date,GetDate()))))) )  or cutofftime.time is null)   then 'BUFFER'else 'BUFFERPDD' end )else  'BUFFERMA'  end)    else B.AgentID  end  as VehicleID,c.City as Territory, b.OrdNo as OrdNo,C.CustNo,c.CustName as CustomerName  , C.Address+(Case When ISNULL(C.Address2,'')='' Then'' Else  ', '+ C.Address2 End)+(Case When ISNULL(C.City,'')='' Then''  Else ', '+ C.City End) as CustAddress  ,c.ZoneCode as AlternateShipAgent,  b.DeliveryDate      from  OrderHdr b  With (NOLOCK)  INNER JOIN Customer c on b.CustID = c.CustNo     Left Join cutofftime on b.Custorder like cutofftime.CustOrderNo+'%'    where IsNull(OrdLevelStatus,'') in ('PICK','WCN','PLA','PLG')     and  IsNull(TrolleyNo,'') = Case when IsNull(OrdLevelStatus,'')='WCN'     then '' else isnull(TrolleyNo,'') end  and     IsNull(B.Void,0)=0  and b.CustID = c.CustNo  and ISNULL(b.ConditionType,'') <> 'BatteryPrinting'      group by DCOrdNo,OrderOriginType, b.companyno, b.OrdNo,   b.CreatedDate,cutofftime.[Time],  C.CustNo,b.ShipCountry,b.Remarks, c.SalesAgent, c.CustName,  C.Address, C.Address2,C.City,  c.ZoneCode,b.ToteBoxno, b.DeliveryDate,B.AgentID ,B.OrdLevelStatus) as A1 ";
    //qry += " order by VehicleID,isnull(companyno,0),  DeliveryDate,OrdNo ";

    //20-03-2024 poc varshini
    qry = "select  VehicleID,OrdNo,DCOrdNo,CustNo,CustomerName, format(DeliveryDate,(select dateformatstring from System)) as DeliveryDate  ,ShipCountry,Remarks,ToteBoxno,Run, isnull((Select Description from Orderstatus where code=OrdLevelstatus),'') as OrdLevelstatus, TotalLines from  (select DCOrdNo,(select COunt(*) from Orditem where Ordno=b.ordno) as TotalLines,  b.ShipCountry, '' as NoSeries ,B.ToteBoxno,b.Remarks, b.companyno,B.OrdLevelStatus, Case when Isnull(B.AgentID,'')='' or Isnull(B.AgentID,'')  like '%buffer%' then (Select Case when IsNull(OrderOriginType,'')<>'Manual Assign'     then (    Select case when Convert(Date,b.DeliveryDate)<= Convert(Date,GetDate()+(select cast (SystemValue as float) from SystemList where Code='PDDDate'))     and ((b.CreatedDate<dateadd(minute,datepart(minute,(Convert(time,cutofftime.Time))),(dateadd(hour,datepart(hour,(Convert(time,cutofftime.Time))),Convert(DateTime,Convert(Date,GetDate()))))) )  or cutofftime.time is null)   then 'BUFFER'else 'BUFFERPDD' end )else  'BUFFERMA'  end)    else B.AgentID  end  as VehicleID,c.City as Territory, b.OrdNo as OrdNo,C.CustNo,c.CustName as CustomerName  , C.Address+(Case When ISNULL(C.Address2,'')='' Then'' Else  ', '+ C.Address2 End)+(Case When ISNULL(C.City,'')='' Then''  Else ', '+ C.City End) as CustAddress  ,c.ZoneCode as AlternateShipAgent,  b.DeliveryDate ,b.Run     from  OrderHdr b  With (NOLOCK)  INNER JOIN Customer c on b.CustID = c.CustNo     Left Join cutofftime on b.Custorder like cutofftime.CustOrderNo+'%'    where IsNull(OrdLevelStatus,'') in ('PICK','WCN','PLA','PLG')     and  IsNull(TrolleyNo,'') = Case when IsNull(OrdLevelStatus,'')='WCN'     then '' else isnull(TrolleyNo,'') end  and     IsNull(B.Void,0)=0  and b.CustID = c.CustNo  and ISNULL(b.ConditionType,'') <> 'BatteryPrinting'      group by DCOrdNo,OrderOriginType, b.companyno, b.OrdNo, b.Run, b.CreatedDate,cutofftime.[Time],  C.CustNo,b.ShipCountry,b.Remarks, c.SalesAgent, c.CustName,  C.Address, C.Address2,C.City,  c.ZoneCode,b.ToteBoxno, b.DeliveryDate,B.AgentID ,B.OrdLevelStatus) as A1 ";
    qry += " order by VehicleID,isnull(companyno,0),  DeliveryDate,OrdNo ";

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


            _totQty = 0;
            _totnoofOrders = 0;
            vehicleData = vehData;
            $('#OrdCntId').html("");


            var wid = document.getElementById("divbackRoundColor0").clientWidth;
            var col1, col2, col3, col4, col5, col6, col7, col8;
            col1 = 70; col2 = 60; col3 = 40; col4 = 100; col5 = 80; col6 = 50; col7 = 100; col8 = 80;
            try {

                col1 = Math.round(wid * (12 / 100));
                col2 = Math.round(wid * (10 / 100));
                col3 = Math.round(wid * (7 / 100));
                col4 = Math.round(wid * (17 / 100));
                col5 = Math.round(wid * (14 / 100));
                col6 = Math.round(wid * (8 / 100));
                col7 = Math.round(wid * (17 / 100));
                col8 = Math.round(wid * (15 / 100));
            } catch (err) {

            }


            for (var i = 0; i < vehicleData.length; i++) {
                tbodyId = vehicleData[i].Code.replace(/ /g, "").replace("/", "");
                //$("#" + tbodyId + "_" + i).empty();


                $("#tbodyId_" + i).empty();



                htm = "";
                htm += '<tr class="table' + i + ';">'; //  style="position:sticky;top:0px;background:lightgrey;">';
                if (Language.toLowerCase() == "english") {
                    htm += '<th style="width: 0%;display: none">Order No</th>';
                    htm += '<th style="min-width:' + col1 + 'px;max-width:' + col1 + 'px;">Order No</th>';//70px//12%
                    htm += '<th style="min-width:' + col2 + 'px;max-width:' + col2 + 'px;">ToteBox</th>';//60px//10%
                    htm += '<th style="min-width:' + col3 + 'px;max-width:' + col3 + 'px;">Total Lines</th>';//40px//7%
                    //htm += '<th  style="width: 35%;;">Customer No</th>';
                    htm += '<th style="min-width:' + col4 + 'px;max-width:' + col4 + 'px;">Customer Name</th>';//100px//17%

                    htm += '<th style="min-width:' + col5 + 'px;max-width:' + col5 + 'px;">Plan DeliveryDate</th>';//80px//14%
                    htm += '<th style="min-width:' + col6 + 'px;max-width:' + col6 + 'px;">Ship to Country</th>';//50px//8%
                    htm += '<th style="min-width:' + col7 + 'px;max-width:' + col7  + 'px;">Remarks</th>';//100px//17%
                    htm += '<th style="min-width:' + col8 + 'px;max-width:' + col8 + 'px;">OrdLevel status</th>';//80px//15%
                    htm += '<th style="min-width:100px;max-width:100px;" >Run Number</th>';//100px//10%
                } else {
                    /////////////////////
                    htm += '<th style="min-width:'+ col1 + 'px;max-width:' + col1 + 'px;">Nr zamówienia</th>';
                    htm += '<th style="min-width:' + col2 + 'px;max-width:' + col2 + 'px;">Kuweta</th>';
                    htm += '<th style="min-width:' + col3 + 'px;max-width:' + col3 + 'px;">Suma linii</th>';
                    htm += '<th style="min-width:' + col4 + 'px;max-width:' + col4 + 'px;">Nazwa Klienta</th>';

                    htm += '<th style="min-width:' + col5 + 'px;max-width:' + col5 + 'px;">Plan Dostawy Data</th>';
                    htm += '<th style="min-width:' + col6 + 'px;max-width:' + col6 + 'px;">Wysyłka do kraju</th>';
                    htm += '<th style="min-width:' + col7 + 'px;max-width:' + col7 + 'px;">Komentarz</th>';
                    htm += '<th style="min-width:' + col8 + 'px;max-width:' + col8 + 'px;">Stan na poziomie zamówienia</th>';
                    htm += '<th style="min-width:100px;max-width:100px;">Nr biegu</th>';
                }

                htm += '<th style="width: 0%;display: none">veh No</th>';

                htm += '</tr>';

                var vehId = vehicleData[i].Code;

                var vehLength = vehicleData[i].Length == null ? 0 : vehicleData[i].Length;
                var vehHeight = vehicleData[i].Height == null ? 0 : vehicleData[i].Height;
                var vehWidth = vehicleData[i].Width == null ? 0 : vehicleData[i].Width;
                var ordCnt = 0;
                for (var j = 0; j < selectData.length; j++) {
                    if (vehId != null && selectData[j].VehicleID != null) {
                        if (vehId.toLowerCase() == selectData[j].VehicleID.toLowerCase()) {
                            ordCnt++;
                            //var cubage = selectData[j].Cubage == null ? "" : selectData[j].Cubage;
                            htm += '<tr class="table' + i + '" style="word-wrap:break-word; "  onclick="Row_Click_func(this);"  >';
                            htm += '<td style="width: 0%;display: none">' + selectData[j].OrdNo + '</td>';
                            htm += '<td  style="min-width:' + col1 + 'px;max-width:' + col1 + 'px;" onclick="Row_Click_Redirect(\'' + selectData[j].OrdNo + '\',\'' + selectData[j].DCOrdNo + '\')"  >' + selectData[j].DCOrdNo + '</td>';
                            //htm += '<td   style="width: 35%;">' + selectData[j].CustNo + '</td>';
                            htm += '<td style="min-width:' + col2 + 'px;max-width:' + col2 + 'px;">' + selectData[j].ToteBoxno + '</td>';
                            htm += '<td style="min-width:' + col3  + 'px;max-width:' + col3 + 'px;">' + selectData[j].TotalLines + '</td>';
                            htm += '<td style="min-width:' + col4 + 'px;max-width:' + col4 + 'px;">' + selectData[j].CustomerName + '</td>';
                            htm += '<td style="min-width:' + col5 + 'px;max-width:' + col5 + 'px;">' + selectData[j].DeliveryDate + '</td>';
                            htm += '<td style="min-width:' + col6 + 'px;max-width:' + col6 + 'px;">' + selectData[j].ShipCountry + '</td>';
                            htm += '<td style="min-width:' + col7 + 'px;max-width:' + col7 + 'px;word-wrap:break-word;">' + selectData[j].Remarks + '</td>';
                            htm += '<td style="min-width:' + col8 + 'px;max-width:' + col8 + 'px;">' + selectData[j].OrdLevelstatus + '</td>';
                            htm += '<td style="min-width:100px;max-width:100px;">' + selectData[j].Run + '</td>';//100px//10%
                            htm += '<td style="max-width: 0%;display: none">' + vehId + '</td>';
                            htm += '</tr>';
                        }
                    }
                }
                //if (i == 1)
                //    alert($("#tbodyId_" + i).val());
                //$("#" + tbodyId + "_" + i).append(htm);
                $("#tbodyId_" + i).val(tbodyId);

                try {
                    var txt = $("#divHeaderId" + i).text();
                    console.log(txt);
                    var regExp = /\(([^)]+)\)/g;
                    var matches = [...txt.match(regExp)];
                    var tmpp = matches[matches.length - 1].replace('(', '');
                    tmpp = tmpp.replace(')', '');
                    if (isNaN(tmpp) == false)
                        txt = txt.replace(matches[matches.length - 1], '');
                    txt = txt;
                    $("#divHeaderId" + i).text(txt);
                } catch (errr) {
                   // alert(errr);
                }
                //sconsole.log(matches)

                $("#divHeaderId" + i).text($("#divHeaderId" + i).text() + " (" + ordCnt + ")");


                $('#OrdCntId').append("<div> <br/>" + tbodyId + " :   " + ordCnt + "</div>");

                //if (i == 1)
                //    alert($("#tbodyId_" + i).val());
                $("#tbodyId_" + i).append(htm);

            }
            //$('#example').DataTable();

            //$('#table0').DataTable();
        }

    });

}
function showCount() {
    alert($('#OrdCntId').text());
}


function Row_Click_Redirect(ordNo, dcOrdNo) {

    //alert(ordNo);
    //return;
    var btns = {};

    btns["Assign Order"] = function (e) {
        AssignOrderOpenPopUp(ordNo, dcOrdNo);
        $(this).dialog("close");
    }
    //$(btns["Assign Order"]).css({ "backgroundColor": "blue" });
    btns["View"] = function (e) {
        console.log(currentScreenName);

        //var _obj = {};
        //_obj.fieldName = "View";
        //_obj.value = ordNo;
        //_obj.currentScreenName = currentScreenName;
        //PerformAction('formButtonClicked', _obj);
        //VehicleAssignmentReportForm

        Row_Click_Redirect1(ordNo, dcOrdNo);
        $(this).dialog("close");
    }
    btns["Order Cancel"] = function (e) {
        OrderCancel(ordNo, dcOrdNo);
        $(this).dialog("close");
    }

    $('<div class="ordAssignmentRedirect"></div>').appendTo('body')
                .html('<div class="ordAssignmentRedirect"><h6>' + "Order No : " + dcOrdNo + '</h6></div>').dialog({
                    modal: true, title: "Order Assignment", zIndex: 10000, autoOpen: true,
                    width: '30%', resizable: false,
                    buttons: btns
                });
}

function DetailRefresh() {
    if (isDetailOpen == true) {
        try {
            glbData = $('#divVehId' + glbI).text();

            var query = "select VehicleID, (SUBSTRING(DCOrdNo, 1, 2)) as orderseries, count(*) as cnt from";
            query += "  (select  VehicleID, OrdNo, DCOrdNo, CustNo, CustomerName, format(DeliveryDate, (select dateformatstring from System)) as DeliveryDate, ShipCountry, Remarks, ToteBoxno, Run, isnull((Select Description from Orderstatus where code = OrdLevelstatus), '') as OrdLevelstatus, TotalLines from(select DCOrdNo, (select COunt(*) from Orditem WITH(NOLOCK) where Ordno = b.ordno) as TotalLines, b.ShipCountry, '' as NoSeries, B.ToteBoxno, b.Remarks, b.companyno, B.OrdLevelStatus, Case when Isnull(B.AgentID, '') = '' or Isnull(B.AgentID, '')  like '%buffer%' then(Select Case when IsNull(OrderOriginType, '') <> 'Manual Assign'     then(Select case when Convert(Date, b.DeliveryDate) <= Convert(Date, GetDate() + (select cast(SystemValue as float) from SystemList where Code = 'PDDDate'))     and((b.CreatedDate < dateadd(minute, datepart(minute, (Convert(time, cutofftime.Time))), (dateadd(hour, datepart(hour, (Convert(time, cutofftime.Time))), Convert(DateTime, Convert(Date, GetDate()))))))  or cutofftime.time is null)   then 'BUFFER'else 'BUFFERPDD' end)else 'BUFFERMA'  end)    else B.AgentID  end as VehicleID, c.City as Territory, b.OrdNo as OrdNo, C.CustNo, c.CustName as CustomerName, C.Address + (Case When ISNULL(C.Address2, '') = '' Then'' Else  ', ' + C.Address2 End) +(Case When ISNULL(C.City, '') = '' Then''  Else ', ' + C.City End) as CustAddress, c.ZoneCode as AlternateShipAgent, b.DeliveryDate, b.Run     from  OrderHdr b  With(NOLOCK)  INNER JOIN Customer c WITH(NOLOCK) on b.CustID = c.CustNo     Left Join cutofftime on b.Custorder like cutofftime.CustOrderNo + '%'    where IsNull(OrdLevelStatus, '') in ('PICK', 'WCN', 'PLA', 'PLG')     and  IsNull(TrolleyNo, '') = Case when IsNull(OrdLevelStatus, '') = 'WCN'     then '' else isnull(TrolleyNo, '') end  and     IsNull(B.Void, 0) = 0  and b.CustID = c.CustNo  and ISNULL(b.ConditionType, '') <> 'BatteryPrinting'    group by DCOrdNo, OrderOriginType, b.companyno, b.OrdNo, b.Run, b.CreatedDate, cutofftime.[Time], C.CustNo, b.ShipCountry, b.Remarks, c.SalesAgent, c.CustName, C.Address, C.Address2, C.City, c.ZoneCode, b.ToteBoxno, b.DeliveryDate, B.AgentID, B.OrdLevelStatus) as A1";
            query += " ) as A1";
            query += " group by VehicleID, (SUBSTRING(DCOrdNo, 1, 2)) order by VehicleID, orderseries";
            //var query = "select ( SUBSTRING(DCOrdNo,1,2)) as orderseries,count(*) as cnt from ";
            //query += "(select DCOrdNo,(select COunt(*) from Orditem where Ordno=b.ordno) as TotalLines,  b.ShipCountry, '' as NoSeries ,B.ToteBoxno,b.Remarks,";
            //query += "b.companyno,B.OrdLevelStatus, Case when Isnull(B.AgentID,'')='' or Isnull(B.AgentID,'')  like '%buffer%' then (Select Case when ";
            //query += "IsNull(OrderOriginType,'')<>'Manual Assign'     then (    Select case when Convert(Date,b.DeliveryDate)<= Convert(Date,GetDate()+";
            //query += "(select cast (SystemValue as float) from SystemList where Code='PDDDate'))     and ";
            //query += "((b.CreatedDate<dateadd(minute,datepart(minute,(Convert(time,cutofftime.Time))),(dateadd(hour,datepart(hour,(Convert(time,cutofftime.Time))),";
            //query += "Convert(DateTime,Convert(Date,GetDate()))))) )  or cutofftime.time is null)   then 'BUFFER'else 'BUFFERPDD' end )else  'BUFFERMA'  end)    else "; query += "B.AgentID  end  as VehicleID,c.City as Territory, b.OrdNo as OrdNo,C.CustNo,c.CustName as CustomerName  , C.Address+(Case When ";
            //query += "ISNULL(C.Address2,'')='' Then'' Else  ', '+ C.Address2 End)+(Case When ISNULL(C.City,'')='' Then''  Else ', '+ C.City End) as ";
            //query += "CustAddress  ,c.ZoneCode as AlternateShipAgent,  b.DeliveryDate ,b.Run     from  OrderHdr b  With (NOLOCK)  INNER JOIN Customer c on b.CustID = ";
            //query += "c.CustNo     Left Join cutofftime on b.Custorder like cutofftime.CustOrderNo+'%'    where IsNull(OrdLevelStatus,'') in ";
            //query += "('PICK','WCN','PLA','PLG')     and  IsNull(TrolleyNo,'') = Case when IsNull(OrdLevelStatus,'')='WCN'     then '' else isnull(TrolleyNo,'') end ";
            //query += "and     IsNull(B.Void,0)=0  and b.CustID = c.CustNo  and ISNULL(b.ConditionType,'') <> 'BatteryPrinting'      group by DCOrdNo,OrderOriginType, ";
            //query += "b.companyno, b.OrdNo, b.Run, b.CreatedDate,cutofftime.[Time],  C.CustNo,b.ShipCountry,b.Remarks, c.SalesAgent, c.CustName,  C.Address, ";
            //query += "C.Address2,C.City,  c.ZoneCode,b.ToteBoxno, b.DeliveryDate,B.AgentID ,B.OrdLevelStatus) as A1 ";
            //query += "group by ( SUBSTRING(DCOrdNo,1,2)) order by orderseries";

            execute(query);

            hDetail = "<table class='table table-striped table-bordered tableId' style='height:300px;overflow:auto;'><tr style='font-size:14px;background-color:#000066;color:#ffffff;font-family:sans-serif;text-align:Left;height:50px;'><td><b>Order Series Starting With</b></td><td><b>Count of Orders</b></td></tr>";

            var dbDataRows = executeQry;
            var dbDataRows1;
            //var obj1;
            try {
               var obj1 = dbDataRows[0];


                dbDataRows1 = dbDataRows.filter(x => x.VehicleID === glbData);

            } catch (err) {

            }

            try {
                if (dbDataRows1 == null) {
                    hDetail += "<tr ><td colspan=2>No Records</td></tr>";
                }
                else if (dbDataRows1.length == 0) {
                    hDetail += "<tr ><td colspan=2>No Records</td></tr>";
                }
                for (var j = 0; j <= dbDataRows1.length - 1; j++) {
                    tmpObj = dbDataRows1[j];
                    hDetail += "<tr ><td>" + tmpObj["orderseries"] + "</td><td>" + tmpObj["cnt"] + "</td></tr>";

                }
            } catch (e) {

            }
            hDetail += "</table>";
            document.getElementById("hDetail").innerHTML = hDetail;
        } catch (e) {

        }
    }
}

function Open_Detail(i, vehCode) {

    isDetailOpen = true;
    glbData = vehCode;
    glbI = i;
    vehCode = $('#divVehId' + i).text();

    var query = "select VehicleID, (SUBSTRING(DCOrdNo, 1, 2)) as orderseries, count(*) as cnt from";
    query += "  (select  VehicleID, OrdNo, DCOrdNo, CustNo, CustomerName, format(DeliveryDate, (select dateformatstring from System)) as DeliveryDate, ShipCountry, Remarks, ToteBoxno, Run, isnull((Select Description from Orderstatus where code = OrdLevelstatus), '') as OrdLevelstatus, TotalLines from(select DCOrdNo, (select COunt(*) from Orditem WITH(NOLOCK) where Ordno = b.ordno) as TotalLines, b.ShipCountry, '' as NoSeries, B.ToteBoxno, b.Remarks, b.companyno, B.OrdLevelStatus, Case when Isnull(B.AgentID, '') = '' or Isnull(B.AgentID, '')  like '%buffer%' then(Select Case when IsNull(OrderOriginType, '') <> 'Manual Assign'     then(Select case when Convert(Date, b.DeliveryDate) <= Convert(Date, GetDate() + (select cast(SystemValue as float) from SystemList where Code = 'PDDDate'))     and((b.CreatedDate < dateadd(minute, datepart(minute, (Convert(time, cutofftime.Time))), (dateadd(hour, datepart(hour, (Convert(time, cutofftime.Time))), Convert(DateTime, Convert(Date, GetDate()))))))  or cutofftime.time is null)   then 'BUFFER'else 'BUFFERPDD' end)else 'BUFFERMA'  end)    else B.AgentID  end as VehicleID, c.City as Territory, b.OrdNo as OrdNo, C.CustNo, c.CustName as CustomerName, C.Address + (Case When ISNULL(C.Address2, '') = '' Then'' Else  ', ' + C.Address2 End) +(Case When ISNULL(C.City, '') = '' Then''  Else ', ' + C.City End) as CustAddress, c.ZoneCode as AlternateShipAgent, b.DeliveryDate, b.Run     from  OrderHdr b  With(NOLOCK)  INNER JOIN Customer c WITH(NOLOCK) on b.CustID = c.CustNo     Left Join cutofftime on b.Custorder like cutofftime.CustOrderNo + '%'    where IsNull(OrdLevelStatus, '') in ('PICK', 'WCN', 'PLA', 'PLG')     and  IsNull(TrolleyNo, '') = Case when IsNull(OrdLevelStatus, '') = 'WCN'     then '' else isnull(TrolleyNo, '') end  and     IsNull(B.Void, 0) = 0  and b.CustID = c.CustNo  and ISNULL(b.ConditionType, '') <> 'BatteryPrinting'    group by DCOrdNo, OrderOriginType, b.companyno, b.OrdNo, b.Run, b.CreatedDate, cutofftime.[Time], C.CustNo, b.ShipCountry, b.Remarks, c.SalesAgent, c.CustName, C.Address, C.Address2, C.City, c.ZoneCode, b.ToteBoxno, b.DeliveryDate, B.AgentID, B.OrdLevelStatus) as A1";
    query += " ) as A1";
    query += " group by VehicleID, (SUBSTRING(DCOrdNo, 1, 2)) order by VehicleID, orderseries";
    //var query = "select ( SUBSTRING(DCOrdNo,1,2)) as orderseries,count(*) as cnt from ";
    //query += "(select DCOrdNo,(select COunt(*) from Orditem where Ordno=b.ordno) as TotalLines,  b.ShipCountry, '' as NoSeries ,B.ToteBoxno,b.Remarks,";
    //query += "b.companyno,B.OrdLevelStatus, Case when Isnull(B.AgentID,'')='' or Isnull(B.AgentID,'')  like '%buffer%' then (Select Case when ";
    //query += "IsNull(OrderOriginType,'')<>'Manual Assign'     then (    Select case when Convert(Date,b.DeliveryDate)<= Convert(Date,GetDate()+";
    //query += "(select cast (SystemValue as float) from SystemList where Code='PDDDate'))     and ";
    //query += "((b.CreatedDate<dateadd(minute,datepart(minute,(Convert(time,cutofftime.Time))),(dateadd(hour,datepart(hour,(Convert(time,cutofftime.Time))),";
    //query += "Convert(DateTime,Convert(Date,GetDate()))))) )  or cutofftime.time is null)   then 'BUFFER'else 'BUFFERPDD' end )else  'BUFFERMA'  end)    else "; query += "B.AgentID  end  as VehicleID,c.City as Territory, b.OrdNo as OrdNo,C.CustNo,c.CustName as CustomerName  , C.Address+(Case When ";
    //query += "ISNULL(C.Address2,'')='' Then'' Else  ', '+ C.Address2 End)+(Case When ISNULL(C.City,'')='' Then''  Else ', '+ C.City End) as ";
    //query += "CustAddress  ,c.ZoneCode as AlternateShipAgent,  b.DeliveryDate ,b.Run     from  OrderHdr b  With (NOLOCK)  INNER JOIN Customer c on b.CustID = ";
    //query += "c.CustNo     Left Join cutofftime on b.Custorder like cutofftime.CustOrderNo+'%'    where IsNull(OrdLevelStatus,'') in ";
    //query += "('PICK','WCN','PLA','PLG')     and  IsNull(TrolleyNo,'') = Case when IsNull(OrdLevelStatus,'')='WCN'     then '' else isnull(TrolleyNo,'') end ";
    //query += "and     IsNull(B.Void,0)=0  and b.CustID = c.CustNo  and ISNULL(b.ConditionType,'') <> 'BatteryPrinting'      group by DCOrdNo,OrderOriginType, ";
    //query += "b.companyno, b.OrdNo, b.Run, b.CreatedDate,cutofftime.[Time],  C.CustNo,b.ShipCountry,b.Remarks, c.SalesAgent, c.CustName,  C.Address, ";
    //query += "C.Address2,C.City,  c.ZoneCode,b.ToteBoxno, b.DeliveryDate,B.AgentID ,B.OrdLevelStatus) as A1 ";
    //query += "group by ( SUBSTRING(DCOrdNo,1,2)) order by orderseries";

    execute(query);

    hDetail = "<table class='table table-striped table-bordered tableId' style='height:300px;overflow:auto;'><tr style='font-size:14px;background-color:#000066;color:#ffffff;font-family:sans-serif;text-align:Left;height:50px;'><td><b>Order Series Starting With</b></td><td><b>Count of Orders</b></td></tr>";

    var dbDataRows = executeQry;

     try {
                                var obj1 = dbDataRows[0];
                                
                                  
                                    dbDataRows = dbDataRows.filter(x => x.VehicleID === vehCode);
                               
        } catch (err) {

        }

    try {
        if (dbDataRows == null) {
            hDetail += "<tr  ><td colspan=2>No Records</td></tr>";
        }
        else if (dbDataRows.length == 0) {
            hDetail += "<tr ><td colspan=2>No Records</td></tr>";
        }
        for (var j = 0; j <= dbDataRows.length - 1; j++) {
            var obj = dbDataRows[j];
            hDetail += "<tr><td>" + obj["orderseries"] + "</td><td>" + obj["cnt"] + "</td></tr>";

        }
    } catch (e) {

    }
    hDetail += "</table>";

    
    //alert(ordNo);
    //return;
    var btns = {};

   
    btns["Cancel"] = function (e) {
        isDetailOpen = false;
        $(this).dialog("close");
    }

    $('<div class="ordAssignmentRedirect"></div>').appendTo('body')
        .html('<div class="ordAssignmentRedirect" id="hDetail">' + hDetail + '').dialog({
            modal: true, title: "Details", zIndex: 10000, autoOpen: true,
            width: '30%', resizable: false,
            buttons: btns
        });

    $('.ui-dialog-titlebar-close').hide();

}

function AssignOrder() {
    MoveOrder($('#VehicleId').val(), $('#txtOrdNo').val(), "1");
}

function AssignOrderSuccess() {
    var btns = {};
    btns["Ok"] = function (e) {
        $(this).dialog("close");
    }
    $('<div class="assignOrder1"></div>').appendTo('body')
                .html('<div class="assignOrder1"><h6>' + "Order assigned successfully!" + '</h6></div>').dialog({
                    modal: true, title: "Order Assignment", zIndex: 10000, autoOpen: true,
                    width: '30%', resizable: false,
                    buttons: btns
                });

}

function AssignOrderOpenPopUp(ordNo, dcOrdNo) {
    $('#txtDcOrdNo').val(dcOrdNo);
    $('#txtOrdNo').val(ordNo);
    $('#vehicleDialog').dialog('open');
}

var OrderAssignToPickerCnt = 0;
var PreviousvehCode = "";
function OrderAssignToPicker(i, vehCode) {
    vehCode = $('#divVehId' + i).text();

    OrderAssignToPickerCnt = i;
    var table = document.getElementById("table" + OrderAssignToPickerCnt);
    if (table.rows.length == 0 || table.rows.length == 1) {
        var btns = {};
        btns["Ok"] = function (e) {
            $(this).dialog("close");
        }
        $('<div class="assignOrder1"></div>').appendTo('body')
                    .html('<div class="assignOrder1"><h6>' + "No Order's to assign!" + '</h6></div>').dialog({
                        modal: true, title: "Order Assignment", zIndex: 10000, autoOpen: true,
                        width: '30%', resizable: false,
                        buttons: btns
                    });
        return;
    }
    else {
        if (PreviousvehCode != "")
            $('#' + PreviousvehCode).show();
        //current vehicleid hide
        $('#' + vehCode).hide();
        PreviousvehCode = vehCode;
        //$("#VehicleId1 option[value='" + vehCode + "']").remove();
        $('#vehicleDialog1').dialog('open');
    }
}

function OrderReassign(i, vehCode) {
    vehCode = $('#divVehId' + i).text();


    var table = document.getElementById("table" + i);
    if (table.rows.length == 0 || table.rows.length == 1) {
        var btns = {};
        btns["Ok"] = function (e) {
            $(this).dialog("close");
        }
        $('<div class="assignOrder1"></div>').appendTo('body')
                    .html('<div class="assignOrder1"><h6>' + "No Order's to assign!" + '</h6></div>').dialog({
                        modal: true, title: "Order Assignment", zIndex: 10000, autoOpen: true,
                        width: '30%', resizable: false,
                        buttons: btns
                    });
        return;
    }

    var btns = {};
    btns["Ok"] = function (e) {
        $(this).dialog("close");
    }
    var sp = "exec OrderAssignmentAssignBuffer '" + vehCode + "','" + _UserID + "'";
    execute(sp);
    var ret = executeQry[0].Response;

    $('<div class="assignOrder1"></div>').appendTo('body')
                  .html('<div class="assignOrder1"><h6>' + ret + '</h6></div>').dialog({
                      modal: true, title: "Order Re-Assignment", zIndex: 10000, autoOpen: true,
                      width: '30%', resizable: false,
                      buttons: btns
                  });
    //if (ret == "0") {
    //    $('<div class="assignOrder1"></div>').appendTo('body')
    //               .html('<div class="assignOrder1"><h6>' + "Picking process is started for one or more orders." + '</h6></div>').dialog({
    //                   modal: true, title: "Order Re-Assignment", zIndex: 10000, autoOpen: true,
    //                   width: '30%', resizable: false,
    //                   buttons: btns
    //               });
    //}
    //else {

    //    $('<div class="assignOrder1"></div>').appendTo('body')
    //                .html('<div class="assignOrder1"><h6>' + "Order re-assigned successfully!" + '</h6></div>').dialog({
    //                    modal: true, title: "Order Re-Assignment", zIndex: 10000, autoOpen: true,
    //                    width: '30%', resizable: false,
    //                    buttons: btns
    //                });
    //}

}
function BulkAssignOrder() {
    var vehicleId = $('#VehicleId1').val();
    if (vehicleId == "") {
        var btns = {};
        btns["Ok"] = function (e) {
            $(this).dialog("close");
        }
        $('<div class="assignOrder1"></div>').appendTo('body')
                    .html('<div class="assignOrder1"><h6>' + "Please select Picker No!" + '</h6></div>').dialog({
                        modal: true, title: "Order Assignment", zIndex: 10000, autoOpen: true,
                        width: '30%', resizable: false,
                        buttons: btns
                    });
    }
    var ordNo = "";
    var table = document.getElementById("table" + OrderAssignToPickerCnt);
    var dtg = "";
    var qry = "";
    for (var i = 1; i < table.rows.length; i++) {
        ordNo = table.rows[i].cells['0'].innerText;

        //alert(ordNo);
        dtg = getClientSideDateTime();

        //enhancement 4
        qry += " update Orderhdr set ModifiedDate=GetDate(),AgentId='" + vehicleId + "',  VehicleId='" + vehicleId + "'  where OrdNo='" + ordNo + "' ";

        //qry += " update Orderhdr set ModifiedDate=GetDate(),AgentId='" + vehicleId + "',  VehicleId='" + vehicleId + "'   where OrdNo='" + ordNo + "' ";
        //qry += " update Orderhdr set ModifiedDate=GetDate(),AgentId='" + vehicleId + "',  VehicleId='" + vehicleId + "' ,  DTG='" + dtg + "' where OrdNo='" + ordNo + "' ";
        qry += " Insert into orderSTatusrunningtime(OrdNo,OrderStatusCode,ItemID,LinelevelStatus,DTG,UserID,OrderType,OrderAgent) 	Select '" + ordNo + "' as ordNo,ordlevelstatus as OrderStatusCode,'','',GetDate(),'" + _UserID + "' as UserID,'Manual',AgentID from Orderhdr where OrdNo='" + ordNo + "' ;";

        //MoveOrder(vehicleId, ordNo);
    }
    ExecuteInsertUpdateQuery(qry);


    var btns = {};
    btns["Ok"] = function (e) {
        $(this).dialog("close");
    }
    $('<div class="assignOrder1"></div>').appendTo('body')
                .html('<div class="assignOrder1"><h6>' + "Order assigned successfully!" + '</h6></div>').dialog({
                    modal: true, title: "Order Assignment", zIndex: 10000, autoOpen: true,
                    width: '30%', resizable: false,
                    buttons: btns
                });

}
function OrderCancel(ordNo, dcOrdNo) {
    var btns = {};
    btns["Yes"] = function (e) {
        updateCancelOrder(ordNo);
        OrderCancelSubmit();
        $(this).dialog("close");
    }
    btns["No"] = function (e) {
        $(this).dialog("close");
    }

    $('<div class="CancelordAssignment"></div>').appendTo('body')
                .html('<div class="CancelordAssignment"><h6>' + "Cancel Order No : " + dcOrdNo + '</h6></div>').dialog({
                    modal: true, title: "Order Cancel", zIndex: 10000, autoOpen: true,
                    width: '20%', resizable: false,
                    buttons: btns
                });
}

function updateCancelOrder(ordNo) {

    var query = "Select O.Ordno,case when OrdLevelstatus in ('PLA','PLG') then 0 else Oi.DeliQty end as DeliQty,OrdLevelstatus from orderhdr o WITH(NOLOCK) inner join (Select Sum(Isnull(DeliQty,0)) as DeliQty ,OrdNo from OrdItem WITH(NOLOCK) group by OrdNo)oi on o.OrdNo=Oi.ordno where o.OrdNo ='" + ordNo + "'";
    //var query = "Select O.Ordno,Oi.DeliQty,OrdLevelstatus from orderhdr o inner join (Select Sum(Isnull(DeliQty,0)) as DeliQty ,OrdNo from OrdItem group by OrdNo)oi on o.OrdNo=Oi.ordno where o.OrdNo ='" + ordNo + "'";
    execute(query);
    var qry = "";
    if (executeQry[0].DeliQty == 0 && executeQry[0].OrdLevelstatus != "PICK") {

        //enhancement 4
        qry = "update Orderhdr set ModifiedDate=GetDate(),OrdLevelstatus=case when OrdLevelstatus='PLG' then 'CAN' else 'WCN' end,CANAgent     =case when 'CAN'=case when OrdLevelstatus='PLG' then 'CAN' else 'WCN' end   then '" + _UserID + "' else PLGAgent end,WCNAgent   =case when 'WCN'=case when OrdLevelstatus='PLG' then 'CAN' else 'WCN' end   then '" + _UserID + "' else WCNAgent end,CANDTG     =case when 'CAN'=case when OrdLevelstatus='PLG' then 'CAN' else 'WCN' end   then Getdate() else PLGDTG end, WCNDTG   =case when 'WCN'=case when OrdLevelstatus='PLG' then 'CAN' else 'WCN' end then Getdate() else WCNDTG end  where OrdLevelstatus<>'CAN' and OrdNo='" + ordNo + "'";

        //qry = "update Orderhdr set ModifiedDate=GetDate(),OrdLevelstatus=case when Ordlevelstatus in ('PLG','CAN') then 'CAN' else 'WCN' end where OrdNo='" + ordNo + "' ;";
        //qry = "update Orderhdr set ModifiedDate=GetDate(),OrdLevelstatus=case when OrdLevelstatus='PLG' then 'CAN' else 'WCN' end where OrdNo='" + ordNo + "' ;";
        qry += "Insert into orderSTatusrunningtime(OrdNo,OrderStatusCode,ItemID,LinelevelStatus,DTG,UserID,OrderType,OrderAgent) 	Select '" + ordNo + "' as ordNo,OrdLevelstatus as OrderStatusCode,'','',GetDate(),'" + _UserID + "' as UserID,'',AgentID from Orderhdr where OrdNo='" + ordNo + "' ;";
        //qry += "Insert into orderSTatusrunningtime(OrdNo,OrderStatusCode,ItemID,LinelevelStatus,DTG,UserID,OrderType,OrderAgent) Select '" + ordNo + "' as ordNo,'CAN' as OrderStatusCode,'','',GetDate(),'" + _UserID + "' as UserID ;";
        qry += "Update ToteBoxUsed set InUse =0  where ToteBox=(Select ToteBoxno from orderhdr where ordno='" + ordNo + "')";
    }
    else {
        //enhancement 4
        qry = "update Orderhdr set ModifiedDate=GetDate(),OrdLevelstatus=case when OrdLevelstatus='PLG' then 'CAN' else 'WCN' end,CANAgent     =case when 'CAN'=case when OrdLevelstatus='PLG' then 'CAN' else 'WCN' end   then '" + _UserID + "' else PLGAgent end,WCNAgent   =case when 'WCN'=case when OrdLevelstatus='PLG' then 'CAN' else 'WCN' end   then '" + _UserID + "' else WCNAgent end,CANDTG     =case when 'CAN'=case when OrdLevelstatus='PLG' then 'CAN' else 'WCN' end   then Getdate() else PLGDTG end, WCNDTG   =case when 'WCN'=case when OrdLevelstatus='PLG' then 'CAN' else 'WCN' end then Getdate() else WCNDTG end  where OrdLevelstatus<>'CAN' and OrdNo='" + ordNo + "'";

        //qry = "update Orderhdr set ModifiedDate=GetDate(),OrdLevelstatus=case when OrdLevelstatus='PLG' then 'CAN' else 'WCN' end where OrdNo='" + ordNo + "' ";
        qry += "Insert into orderSTatusrunningtime(OrdNo,OrderStatusCode,ItemID,LinelevelStatus,DTG,UserID,OrderType,OrderAgent) 	Select '" + ordNo + "' as ordNo, OrdLevelstatus as OrderStatusCode,'','',GetDate(),'" + _UserID + "' as UserID,'',AgentID from Orderhdr where OrdNo='" + ordNo + "' ;";
        //qry += "Insert into orderSTatusrunningtime(OrdNo,OrderStatusCode,ItemID,LinelevelStatus,DTG,UserID) Select '" + ordNo + "' as ordNo,'WCN' as OrderStatusCode,'','',GetDate(),'" + _UserID + "' as UserID";
    }
    ExecuteInsertUpdateQuery(qry);
}

function OrderCancelSubmit() {
    var btns = {};
    btns["Ok"] = function (e) {
        $(this).dialog("close");
    }
    $('<div class="CancelorderSubmit"></div>').appendTo('body')
                .html('<div class="CancelorderSubmit"><h6>' + "Order Canceled successfully!" + '</h6></div>').dialog({
                    modal: true, title: "Order Cancel", zIndex: 10000, autoOpen: true,
                    width: '20%', resizable: false,
                    buttons: btns
                });
}

function Row_Click_Redirect1(ordNo, dcOrdNo) {
    var obj = {};
    obj["OrdNo"] = ordNo;
    FormView["LstSalesOrder"] = obj;

    setCookie('FormView', JSON.stringify(""));
    setCookie('FormView', "");
    //setCookie('ScreenName', JSON.stringify(""));
    //setCookie('ScreenName', "");
    //setCookie('ClickEvent', JSON.stringify(""));
    //setCookie('ClickEvent', "");

    // COMMENTED 22.03.2021
    setCookie('FormView', (JSON.stringify(FormView)));

    //FormView["OrdNo1"] = ordNo;
    //{ Params.FormView.LstSalesOrder.OrdNo }
    //setCookie1('FormView1', JSON.stringify(""));
    //setCookie1('FormView1', "");
    //setCookie1('FormView1', (JSON.stringify(FormView)));
    //setCookie1('FormView', (JSON.stringify(FormView)));

    //var formView1 = getCookie('FormView1');
   


    $.ajax({
        type: 'POST',
        url: url_TempStoreFormView,
        data: { data: JSON.stringify(FormView) },
        async: false,
        success: function (result) {
            //alert(result);
            //window.open(url_FormViewList + "?ScreenName=SalesOrderForm");

            if (result == "") {
                FormView = getCookie('FormView');
               
                window.open(url_FormViewList + "?ScreenName=SalesOrderForm");

            }
            else {
                // alert(result);
                //Row_Click_Redirect1(ordNo, dcOrdNo);
                //OrderAssignment / Index
                window.location = url_Login + "?sessionexpired=sessionexpired";
            }

        }
    });

    //window.open(url_FormViewList + "?ScreenName=SalesOrderForm");

    //window.location = url_FormViewList + "?ScreenName=SalesOrderForm";//single parameter

}

function setCookie1(key, value) {
    var expires = new Date();
    expires.setTime(expires.getTime() + (1 * 24 * 60 * 60 * 1000));
    document.cookie = key + '=' + encodeURIComponent(value) + ';expires=' + expires.toUTCString();

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

    var calling_url = url_printReport_POC;


    $.ajax({
        url: calling_url,
        type: 'POST',

        data: arrDoc,
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (results) {
            _LoadingImageClose();
            if (results == 1) {
                window.open(url_LoadStockVarianceReport);
            }
            else {

                GetVehicleData(vehicleData);
                showAlertMessage("Order Assignment", 'Order Reassigned');
            }
        },
        error: function (results, q, a) {
            alert(results);
            _LoadingImageClose();
        }
    });


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
        console.log(e);
        //alert(e);
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
        var objCells = myTab.rows.item(i).cells;
        for (var j = 0; j < 1; j++) {
            ordNo = ordNo == '' ? "'" + objCells.item(j).innerHTML + "'" : ordNo + ", '" + objCells.item(j).innerHTML + "'";
        }
    }

    window.open(url_LoadConsolidatedReport + "?strInvNo=" + ordNo + "&sRptName=ConsolidatedReport");

}

function getClientSideDateTime() {
    var myDate = new Date();
    var dtTime = myDate.getFullYear() + '-' + ('0' + (myDate.getMonth() + 1)).slice(-2) + '-' + ('0' + myDate.getDate()).slice(-2) + ' ' + myDate.getHours() + ':' + ('0' + (myDate.getMinutes())).slice(-2) + ':' + myDate.getSeconds() + '.' + myDate.getMilliseconds();
    return dtTime;


}




$(document).ready(function () {
    //$('#table0').DataTable();
    //$('#table0').DataTable();

    //var myTable = $("#table0").DataTable({
    //    paging: true,
    //    searching: true,
    //    info: false,
    //});

});


//function GetSearchDate(ii, vehicleCode) {

//    var ordiiD = $('#SearchId' + ii).val();
//    var _totQty = 0;
//    var _totnoofOrders = 0;

//    sorted_Customer_List = [];
//    var qry = "";
//    qry = "select  VehicleID,OrdNo,CustNo,CustomerName, format(DeliveryDate,(select dateformatstring from System)) as DeliveryDate  ,ShipCountry,Remarks, isnull((Select Description from Orderstatus where code=OrdLevelstatus),'') as OrdLevelstatus from  (select Count as TotalLines, P.SoldTo, b.ShipCountry, (select top 1 NoSeries from OrderSeries  Where a.OrdNo Like Replace(NoSeries,'*','')+'%') as NoSeries ,b.Remarks, b.companyno, B.OrdLevelStatus, Case when Isnull(B.AgentID,'')='' then (Select Case when IsNull(OrderOrigin,'')='' then 'BUFFERMA' else 'BUFFER' end) else B.AgentID  end as VehicleID,  c.City as Territory, a.OrdNo as OrdNo, Sum(a.Cubage) as Cubage,  Isnull(Sum(a.ItemCaseQty),0) as CaseQty,  C.CustNo,c.CustName as CustomerName  , C.Address+(Case When ISNULL(C.Address2,'')='' Then'' Else  ', '+ C.Address2 End)+(Case When ISNULL(C.City,'')=''  Then''  Else ', '+ C.City End) as CustAddress  , c.ZoneCode as AlternateShipAgent,  b.DeliveryDate  from (select OrdItem.OrdNo,   (select top 1 (Cubage / BaseQty) * OrdItem.Qty   from UOM inner join Item on Item.ItemNo=UOM.ItemNo  where Uom.ItemNo=OrdItem.ItemNo and Uom.Uom=Item.BulkUOM) as Cubage, (OrdItem.Qty / (select top 1 BaseQty  from UOM  inner join Item on Item.ItemNo=UOM.ItemNo   where Uom.ItemNo=OrdItem.ItemNo and  Uom.Uom=Item.LooseUOM)) as ItemCaseQty  from  OrdItem) a   INNER JOIN OrderHdr b on a.OrdNo=b.OrdNo  inner join (select OrdNo,Count(*)   as count, (select Count(*)  from OrdItem O   where OrdItem.OrdNO=O.OrdNO and   O.Qty=O.DeliQty and ISNULL(O.NoPick,0)=0 group by OrdNo) as DelCount, (select Count(*)  from OrdItem O where OrdItem.OrdNO=O.OrdNO  and ISNULL(O.NoPick,0)=1 group by OrdNo) as NoPickCount,(select Count(*) from OrdItem O where OrdItem.OrdNO=O.OrdNO  and ISNULL(O.NoPick,0)=2 group by OrdNo) as KickOutCount  from OrdItem group by ordNo) d on d.ordNo=b.ordNo  and D.count <>ISNULL(D.DelCount,0)  +ISNULL(D.KickOutCount,0) +ISNULL(D.NoPickCount ,0) INNER JOIN Customer c on b.CustID = c.CustNo   Left Join OrderBP P on P.SoldTo=b.CustId  Left Join invoice I on I.OrdNo=b.OrdNo and IsnUll(I.Void,0) = 0 where IsNull(B.Void,0)=0  and b.CustID = c.CustNo  and I.InvNo Is NULL and  isnull(PickingStatus,0) < 8  group by OrderOrigin, b.companyno, a.OrdNo, C.CustNo,b.ShipCountry,b.Remarks, c.SalesAgent, c.CustName,  C.Address, C.Address2,C.City, c.ZoneCode, b.DeliveryDate,B.AgentID ,B.OrdLevelStatus, P.SoldTo,d.Count) as A1";
//    qry += " where  OrdNo like '%" + ordiiD + "%'  order by VehicleID,isnull(companyno,0),  DeliveryDate,OrdNo";


//    qry = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(qry), encryptkey, { keySize: 128 / 8, iv: encryptiv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
//    var params = "{'query':'" + qry + "'}";
//    $.ajax({
//        type: "POST",
//        url: url_GetActionConfigData,
//        data: params,
//        contentType: "application/json;charset=utf-8",
//        // dataType: "json",
//        async: true,
//        success: function (results) {
//            executeQry = $.parseJSON(results);
//            //
//            selectData = executeQry;
//            var tbodyId = '';


//            _totQty = 0;
//            _totnoofOrders = 0;
//            //vehicleData = vehData;
//            $('#OrdCntId').html("");
//            //for (var i = 0; i < vehicleData.length; i++) {
//            tbodyId = vehicleCode;// vehicleData[i].Code.replace(/ /g, "").replace("/", "");
//            //$("#" + tbodyId + "_" + i).empty();

//            var i = ii;
//            $("#tbodyId_" + i).empty();



//            htm = "";
//            htm += '<tr class="table' + i + '" style="z-index: 0; ">';
//            htm += '<th  style="width: 16%;;">Order No</th>';
//            //htm += '<th  style="width: 35%;;">Customer No</th>';
//            htm += '<th  style="width: 35%;;">Customer Name</th>';

//            htm += '<th  style="width: 18%;;">Plan DeliveryDate</th>';
//            htm += '<th  style="width: 12%;;">Ship to Country</th>';
//            htm += '<th  style="width: 18%;;">Remarks</th>';
//            htm += '<th  style="width: 12%;;">OrdLevel status</th>';

//            htm += '</tr>';

//            var vehId = vehicleCode;// vehicleData[i].Code;

//            //var vehLength = vehicleData[i].Length == null ? 0 : vehicleData[i].Length;
//            //var vehHeight = vehicleData[i].Height == null ? 0 : vehicleData[i].Height;
//            //var vehWidth = vehicleData[i].Width == null ? 0 : vehicleData[i].Width;

//            for (var j = 0; j < selectData.length; j++) {

//                if (vehId == selectData[j].VehicleID) {

//                    //var cubage = selectData[j].Cubage == null ? "" : selectData[j].Cubage;
//                    htm += '<tr class="table' + i + '" style="z-index: 0; "  onclick="Row_Click_func(this);"  >';
//                    htm += '<td  onclick="Row_Click_Redirect(\'' + selectData[j].OrdNo + '\')"  style="width: 16%;">' + selectData[j].OrdNo + '</td>';
//                    //htm += '<td   style="width: 35%;">' + selectData[j].CustNo + '</td>';
//                    htm += '<td   style="width: 35%;">' + selectData[j].CustomerName + '</td>';
//                    htm += '<td   style="width: 35%;">' + selectData[j].DeliveryDate + '</td>';
//                    htm += '<td   style="width: 35%;">' + selectData[j].ShipCountry + '</td>';
//                    htm += '<td   style="width: 35%;">' + selectData[j].Remarks + '</td>';
//                    htm += '<td   style="width: 18%;">' + selectData[j].OrdLevelstatus + '</td>';
//                    htm += '<td style="display: none">' + vehId + '</td>';
//                    htm += '</tr>';
//                }
//            }

//            $("#tbodyId_" + i).val(tbodyId);


//            $("#tbodyId_" + i).append(htm);


//        }

//    });

//}