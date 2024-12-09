//CheckInvoicePromotion
//function CheckInvoice(dAmt) {

function confirmPromotion() {

    var btns = {};
    btns["Yes"] = function (e) {
        console.log(end + '   end');
        $(this).dialog("close");
        return true;
    }
    btns["No"] = function (e) {
        $(this).dialog("close");
        return false;
    }
    var htmTitle = '<div style="display: inline-block;float:left;">Session Alert!</div> ';
    $('#SessionAlertId').remove();
    $('<div id="SessionAlertId"></div>').appendTo('body')
        .html('<div><h6>Do you want to apply promotion?</h6></div>').dialog({
            modal: true,
            title: htmTitle,
            zIndex: 10000,
            autoOpen: true,
            width: '35%',
            resizable: false,
            buttons: btns
        });
}


function CheckInvoicePromotion(dAmt, orderdate) {
    dAmt = dAmt.replace("'", "").replace("'", "")        
    var discountAmt = 0;
    var tmpDisPer = 0;
    var dPromoDisAmt = 0;
    var dPromoDisPer = 0;
    var dtr = '', dtrOffer = '';
    var Arr = [];
    var bApplied = false;
    var resObj = {};
    var bConditionPromo = false;
    var dAmt1 = 0;
    var sPromoMsgText = "";
    var promoObj = [];
    var dLastMultiCnt = -1;
    var totDisAmt = 0;
    var ipdDet = {};
    var arrPromoMsg = [];
    var arrPromoList = []; 
    var dtorderdate = getDateTime();

    if (orderdate == "") {
        orderdate = dtorderdate;
    }

    var qry1 = '';
    var custNo = sysCustomerID;//'SD0001';// getSystemValue('CustomerID');
    var agentId = '';
    custDet = setCustomerFields(custNo);
    // console.log('Check Invoice' + custDet[0]["CustName"] + " " + dAmt);
    var agentId = getAgentId();
    var InvoiceNo = getInvoiceNo();
    var prmEvent = getSystemValue('PrmotionByEvent');
    if (CheckBooleanField(prmEvent)) {
       // console.log('Check Invoice prmEvent True');
        // var getproEveParam = {};
        ParamJS.custNo = custNo;
        ParamJS.agentId = agentId;
        ParamJS.PriceGroup = custDet.length == 0 ? "" : custDet[0]["PriceGroup"];
        ParamJS.PriceGroup2 = custDet.length == 0 ? "" : custDet[0]["PriceGroup2"];
        ParamJS.dtorderdate = dtorderdate;
        ParamJS.orderdate = orderdate;
        
        qry1 = GetQueryString("GET_PROEVENT");
        //qry1 = app.ReadRecord("GET_PROEVENT", JSON.stringify(getproEveParam));


    } else {
        //console.log('Check Invoice prmEvent False');
        // var getproEveParam = {};
        ParamJS.custNo = custNo;
        ParamJS.agentId = agentId;
        ParamJS.PriceGroup = custDet.length == 0 ? "" : custDet[0]["PriceGroup"];
        ParamJS.PriceGroup2 = custDet.length == 0 ? "" : custDet[0]["PriceGroup2"];
        ParamJS.dtorderdate = dtorderdate;
        ParamJS.orderdate = orderdate;

        qry1 = GetQueryString("GET_PROMOEVENT");
        //qry1 = app.ReadRecord("GET_PROMOEVENT", JSON.stringify(getproEveParam));
    }

    //qry1 = GetQueryString1("Select 'NOVADMPP00417' as PromoId,'1' as  MinAmt, '1336' as MaxAmt, '1' as  ItemCondition, '1' as  DisPer, '1' as  DisAmt,'1' as  Multiply,'1' as  Entitle,   '1' as  EntitleType,'1' as    DisCalc,'' as Event");
    var qry = qry1;// JSON.parse(qry1);
    for (var t = 0; t < qry.length; t++) {
        ipdDet = {};
        ipdDet.PromoId = qry[t]['PromoId'];
        ipdDet.MinAmt = qry[t]['MinAmt'];
        ipdDet.MaxAmt = qry[t]['MaxAmt'];
        ipdDet.CatBased = qry[t]['CatBased'];
        ipdDet.ItemCondition = qry[t]['ItemCondition'];
        ipdDet.DisPer = qry[t]['DisPer'];
        ipdDet.DisAmt = qry[t]['DisAmt'];
        ipdDet.Multiply = qry[t]['Multiply'];
        ipdDet.Entitle = qry[t]['Entitle'];
        ipdDet.EntitleType = qry[t]['EntitleType'];
        ipdDet.Event = qry[t]['Event'];
        var sDisCalc = String(qry[t]['DisCalc']);//new String(dbDataRows.fieldByName("DisCalc"));
        ipdDet.DisCalc = qry[t]['DisCalc'];
        var sInvPromoId = ipdDet.PromoId;
        //var Qry1 = getQueryByScreenName('GetInvicePromo');        // var getinvoiceParam = {};
        ParamJS.custNo = custNo;
        ParamJS.sInvPromoId = sInvPromoId;
        
        //var Qry1 = app.ReadRecord("GET_INVOICEPROMO", JSON.stringify(getinvoiceParam));
        console.log(ipdDet.PromoId + " Disc Amt : " + ipdDet.DisAmt + " Disc Per : " + ipdDet.DisPer);

        var itempromocalculation1 = ("Log1 : CustomerId > " + custNo + " InvoiceNo > " + InvoiceNo + " PromoId > " + ipdDet.PromoId + " Disc % > " + ipdDet.DisPer + " DiscAmt > " + ipdDet.DisAmt + " SubTotal > " + dAmt);
        // log discount calcualtion by siva dtd 30.12.2023        
        ItemPromo_LogCalculation(itempromocalculation1);
                
        Qry1 = GetQueryString("GET_INVOICEPROMO");

        if (Qry1 == '') {
            //  var getprScreenParam = {};
            ParamJS.custNo = custNo;
            ParamJS.sInvPromoId = sInvPromoId;           
            Qry1 = GetQueryString("GET_PROMOSCREEN");
        }

        if (Qry1)// != undefined && Qry1 != null && Qry1 !='')
        {
            //console.log('Check Invoice Qry1 :' + Qry1);
            var Qrye = Qry1;// JSON.parse(Qry1);
            for (var b = 0; b < Qrye.length; b++) {
                var gg = CheckDecimal(Qrye[b]['InvoiceAmt']);//CheckDecimalVal
                dAmt1 = parseFloat(dAmt) + parseFloat(gg);
            }
        }

        if (Number(dAmt1) >= Number(ipdDet.MinAmt) && Number(dAmt1) <= Number(ipdDet.MaxAmt)) {
         
            var itempromocalculation2 = ("Log2 : CustomerId > " + custNo + " InvoiceNo > " + InvoiceNo + " PromoId > " + ipdDet.PromoId + " EntitleType > " + ipdDet.EntitleType + " Entitle > " + ipdDet.Entitle + " Disc % > " + ipdDet.DisPer + " Disc Amt > " + ipdDet.DisAmt + " MinAmt > " + ipdDet.MinAmt + " MaxAmt > " + ipdDet.MaxAmt + " Multiply > " + ipdDet.Multiply + " Event > " + ipdDet.Event + " DiscountCalculation > " + ipdDet.DisCalc);
            ItemPromo_LogCalculation(itempromocalculation2);   // log discount calcualtion by siva dtd 30.12.2023

            Arr.push(ipdDet);
           
        } else {
            var sOfferFOC = '';
            //var getprIDParam = {};
            ParamJS.sInvPromoId = sInvPromoId;
            //getprIDqry1 = app.ReadRecord("GET_PROMOSCREEN", JSON.stringify(getprIDParam));
            getprIDqry1 = GetQueryString("GET_PROMOSCREEN");

            var getprIDqry = getprIDqry1;// JSON.parse(getprIDqry1);
            //console.log('Check Invoice sOfferFOC :' + getprIDqry.length);
            for (var c = 0; c < getprIDqry.length; c++) {
                sOfferFOC = getprIDqry[c]['ItemID'] + ' Offer Qty: ' + getprIDqry[c]['FOCQty'];
            }
            sPromoMsgText = "Promotion \n Condition : \n Min : " + qry[t]['MinAmt'] + " " + "\n" + "Max : " + qry[t]['MaxAmt'] + "\n" + "Offer : FOC " + sOfferFOC;
            arrPromoMsg.push(sPromoMsgText);            

        }
    }
    if (Arr.length == 0) {
        //console.log('Check Invoice Arr :' + Arr.length);
        resObj = {};
        resObj.bFocPromo = false;
        resObj.newOrdItems = [];
        resObj.DisPer = 0;
        resObj.DisAmt = 0;
        resObj.PromoId = ipdDet.PromoId;
        resObj.PromoCount = 1;
                
        return resObj;
    }
    var sEvent = 'Event';  /// 'Event'
    newOrdItems = [];
    promoObj = [];
    resObj = {};
    resObj.bFocPromo = false;
    resObj.newOrdItems = [];
    resObj.DisPer = 0;
    resObj.DisAmt = 0;
    resObj.PromoId = "";
    resObj.PromoCount = 0;

    //console.log('Check Invoice Arr else :' + Arr.length);
    
    NextRecord:
        for (var iIndex = 0; iIndex < Arr.length; iIndex++) {
            var bMultiply = false;
            var bMultiStarted = false;
            var iMultiCnt = 1;
            dLastMultiCnt = -1;
            var iMulti = 1;
            var bFocMultiPromo = false;
            sEvent = 'Event';
            var ipdDet = {};
            ipdDet = Arr[iIndex];
           
            console.log(ipdDet.PromoId + " Disc Amt : " + ipdDet.DisAmt + " Disc Per : " + ipdDet.DisPer);

            var sysPromoEvent = getSystemValue('PrmotionByEvent');
            if (CheckBooleanField(sysPromoEvent)) {
                if (sEvent == ipdDet.Event) {
                    continue NextRecord;
                }
            }
            if (ipdDet.Multiply == "Incremental") {
                bMultiply = true;
            } else {
                bMultiply = false;
            }
            var iPCount = 0;
            if (Number(ipdDet.Entitle) > 0) {
                if (ipdDet.EntitleType == "Per Day" || ipdDet.EntitleType == "PerDay") {
                    //var getDayParam = {};
                    ParamJS.PromoId = ipdDet.PromoId;
                    ParamJS.dtorderdate = dtorderdate;
                    ParamJS.orderdate = orderdate;
                    ParamJS.custNo = custNo;

                    console.log(ParamJS.PromoId + " Disc Amt : " + ipdDet.DisAmt + " Disc Per : " + ipdDet.DisPer );

                    //getDayqry1 = app.ReadRecord("GET_PROMODAY", JSON.stringify(getDayParam));
                    getDayqry1 = GetQueryString("GET_PROMODAY");
                    var getDayqry = getDayqry1;// JSON.parse(getDayqry1);
                    for (var x = 0; x < getDayqry.length; x++) {
                        iPCount = getDayqry[x]['TotalPromoApplied'];
                    }
                } else if (ipdDet.EntitleType == "Per Week" || ipdDet.EntitleType == "PerWeek") {
                    //var tmpDate = Ti.App.dtDeliveryDate;
                    // var getWeekParam = {};
                    ParamJS.PromoId = ipdDet.PromoId;
                    ParamJS.dtorderdate = dtorderdate;
                    ParamJS.orderdate = orderdate;
                    ParamJS.custNo = custNo;
                    getWeekqry1 = GetQueryString("GET_PROMOWEEK");//, JSON.stringify(getWeekParam));
                    var getWeekqry = getWeekqry1;// JSON.parse(getWeekqry1);
                    for (var j = 0; j < getWeekqry.length; j++) {
                        iPCount = getWeekqry[j]['TotalPromoApplied'];
                    }

                } else if (ipdDet.EntitleType == "Per Month" || ipdDet.EntitleType == "PerMonth") {
                    //var dtOrdDate = Ti.App.dtDeliveryDate;//new Date();
                    var tmpDate = orderdate;//Ti.App.DATEFORMAT.dbDateFormatSQLite(new Date(dtOrdDate.getFullYear(), dtOrdDate.getMonth(), 1));
                    //var getMonthParam = {};
                    ParamJS.PromoId = ipdDet.PromoId;
                    ParamJS.tmpDate = tmpDate;
                    ParamJS.custNo = custNo;
                    getMonthqry1 = GetQueryString("GET_PROMONTH");//, JSON.stringify(getMonthParam));
                    var getMonthqry = getMonthqry1;//JSON.parse(getMonthqry1);
                    for (var k = 0; k < getMonthqry.length; k++) {
                        iPCount = getMonthqry[k]['TotalPromoApplied'];
                    }
                } else if (ipdDet.EntitleType == 'Per Promotion' || ipdDet.EntitleType == 'PerPromotion' || ipdDet.EntitleType == 'Per Invoice' || ipdDet.EntitleType == 'PerInvoice' || ipdDet.EntitleType == 'Per Order' || ipdDet.EntitleType == 'PerOrder') {
                    //var getYearParam = {};
                    ParamJS.PromoId = ipdDet.PromoId;
                    ParamJS.custNo = custNo;
                    getYearqry1 = GetQueryString("GET_PROMOYEAR");//, JSON.stringify(getYearParam));
                    var getYearqry = getYearqry1;// JSON.parse(getYearqry1);
                    for (var l = 0; l < getYearqry.length; l++) {
                        iPCount = getYearqry[l]['TotalPromoApplied'];
                    }
                }
                if (Number(iPCount) >= Number(ipdDet.Entitle)) {
                    continue NextRecord; //break NextRecord;
                }
            }
            var bCondition = false;
            var bItemPromo = false;
            var bCatPromo = false;
            bConditionPromo = false;
            //var getPromoParam = {};
            ParamJS.PromoId = ipdDet.PromoId;
            getPromoqry1 = GetQueryString("GET_PROMOPROMO");//, JSON.stringify(getPromoParam));
            var getPromoqry = getPromoqry1;// JSON.parse(getPromoqry1);
           // console.log("Check Invoice getPromoqry :" + getPromoqry.length + " " + ipdDet.PromoId);
            While1:
                for (var l = 0; l < getPromoqry.length; l++) {
                    bItemPromo = true;
                    if (bConditionPromo != true) {
                        bCondition = false;
                    }
                    bCondition = false;
                    //var getGrpParam = {};
                    ParamJS.GroupPromo = getPromoqry[l]['GroupPromo'];
                    ParamJS.Priority = getPromoqry[l]['Priority'];
                    ParamJS.UOM = getPromoqry[l]['UOM'];
                    ParamJS.custNo = custNo;
                    ParamJS.ItemId = getPromoqry[l]['ItemId'];

                    getGrpqry1 = GetQueryString("GET_PROMOGRP");//, JSON.stringify(getGrpParam));

                    //todo1
                   // getGrpqry1 = GetQueryString1("Select 12 as Qty, 23 as amount");

                    var getGrpqry = (getGrpqry1);
                    //console.log("Check Invoice getGrpqry1 :" + getGrpqry.length);
                    for (var k = 0; k < getGrpqry.length; k++) {
                        //console.log("Check Invoice getGrpqry1 :" + getPromoqry[l]['MinQty'] + " " + getGrpqry[k]['Qty']);
                        //console.log("Check Invoice getGrpqry1 :" + getPromoqry[l]['MaxQty'] + " " + getGrpqry[k]['Qty']);
                        //console.log("Check Invoice getGrpqry1 :" + getPromoqry[l]['MinAmt'] + " " + getGrpqry[k]['amount']);
                        if (Number(getPromoqry[l]['MinQty']) > Number(getGrpqry[k]['Qty']) || Number(getPromoqry[l]['MaxQty']) < Number(getGrpqry[k]['Qty']) || Number(getPromoqry[l]['MinAmt']) > Number(getGrpqry[k]['amount'])) {
                            // console.log("Check Invoice getGrpqry1 if :" + getPromoqry[l]['MinAmt'] + " " + getGrpqry[k]['amount']);
                            if (bConditionPromo != true) {
                                bCondition = false;
                            }
                            _obj = {};
                            _obj.PromoId = getPromoqry[l]['PromoId'];
                            _obj.MinQty = getPromoqry[l]['MinQty'];
                            _obj.Priority = getPromoqry[l]['Priority'];
                            _obj.Entitle = getPromoqry[l]['Entitle'];
                            _obj.EntitleType = getPromoqry[l]['EntitleType'];

                            //push error //todo1
                            arrPromoList.push(_obj);

                            break While1;
                        } else {
                            console.log("Check Invoice getGrpqry1 bMultiply else :" + bMultiply);
                            if (bMultiply == true) {
                                iMulti = Math.floor(getGrpqry[k]['Qty'] / getPromoqry[l]['MinQty']);
                                iMultiCnt = iMulti;
                                if (Number(dLastMultiCnt) < 0 || (dLastMultiCnt != iMultiCnt && Number(dLastMultiCnt) > Number(iMultiCnt))) {
                                    dLastMultiCnt = iMultiCnt;
                                }
                            }
                            bCondition = true;
                            bConditionPromo = true;
                            console.log("Check Invoice bCondition :" + bCondition + " " + bConditionPromo);
                        }
                    }
                    if (bCondition == false) {
                        break While1;
                    }
                }
            if (bItemPromo == true && bCondition == false) {
                continue NextRecord;
            }
            var getGroupParam = {};
            getGroupParam.PromoId = ipdDet.PromoId;

            getGroupqry1 = GetQueryString("GET_PROMOGROUPCAT");//, JSON.stringify(getGroupParam));

            //todo1
           // getGroupqry1 = GetQueryString1("Select Promotion.PromoId, Promotion.PromoName, Priority, PromoCondition.ItemId, PromoCondition.UOM, MinQty, MaxQty, Promotion.MinAmt, isnull('','') as GroupPromo from PromoCondition INNER JOIN Promotion ON Promotion.PromoId = PromoCondition.PromoId where   Promotion.PromoId = 'NOVADMPP00417' ");
            var getGroupqry = (getGroupqry1);
            //console.log("Check Invoice getGroupqry GET_PROMOGROUPCAT :" + getGroupqry.length);
            While1:
                for (var q = 0; q < getGroupqry.length; q++) {
                    bCatPromo = true;
                    if (bConditionPromo != true) {
                        bCondition = false;
                    }
                    bCondition = false;
                    // var getGrpParam = {};
                    ParamJS.GroupPromo = getGroupqry[q]['GroupPromo'];
                    ParamJS.Priority = getGroupqry[q]['Priority'];
                    ParamJS.UOM = getGroupqry[q]['UOM'];
                    ParamJS.custNo = custNo;
                    ParamJS.ItemId = getGroupqry[q]['ItemId'];

                    getGrpqry1 = GetQueryString("GET_PROMOGROUPCATCHK");//, JSON.stringify(getGrpParam));

                    //todo1
                   // getGrpqry1 = GetQueryString1("Select 13 as Qty, 24 as amount ");

                    var getGrpqry = (getGrpqry1);
                    for (var k = 0; k < getGrpqry.length; k++) {
                        if (Number(getGroupqry[q]['MinQty']) > Number(getGrpqry[k]['Qty']) || Number(getGroupqry[q]['MaxQty']) < Number(getGrpqry[k]['Qty']) || Number(getGroupqry[q]['MinAmt']) > Number(getGrpqry[k]['amount'])) {
                            if (bConditionPromo != true) {
                                bCondition = false;
                            }
                            _obj = {};
                            _obj.PromoId = getGroupqry[q]['PromoId'];
                            _obj.MinQty = getGroupqry[q]['MinQty'];
                            _obj.Priority = getGroupqry[q]['Priority'];
                            _obj.Entitle = getGroupqry[q]['Entitle'];
                            _obj.EntitleType = getGroupqry[q]['EntitleType'];
                            arrPromoList.push(_obj);

                            break While1;
                        } else { 
                            if (bMultiply == true) {
                                iMulti = Math.floor(getGrpqry[k]['Qty'] / getGroupqry[q]['MinQty']);
                                iMultiCnt = iMulti;

                                if (Number(dLastMultiCnt) < 0 || (dLastMultiCnt != iMultiCnt && Number(dLastMultiCnt) > Number(iMultiCnt))) {
                                    dLastMultiCnt = iMultiCnt;
                                }
                            }
                            bCondition = true;
                            bConditionPromo = true;
                        }
                    }

                }
            if (bCatPromo == true && bCondition == false) {
                continue NextRecord;
            }
            bPromoGroupPromo = false;
            var getGroupParam = {};
            getGroupParam.PromoId = ipdDet.PromoId;

            getGroupqry1 = GetQueryString("GET_PROMOGROUPPR");//, JSON.stringify(getGroupParam));

            //todo1
            //getGroupqry1 = GetQueryString1("select Promotion.PromoId, Promotion.PromoName, Priority, PromoCondition.ItemId, PromoCondition.UOM, MinQty, MaxQty, Promotion.MinAmt, '' as GroupPromo from PromoCondition INNER JOIN Promotion ON Promotion.PromoId = PromoCondition.PromoId where   Promotion.PromoId = 'NOVADMPP00417'  ");

            var getGroupqry = (getGroupqry1);
            //console.log("Check Invoice getGroupqry GET_PROMOGROUPPR :" + getGroupqry.length);
            While1:
                for (var q = 0; q < getGroupqry.length; q++) {
                    bPromoGroupPromo = true;
                    if (bConditionPromo != true) {
                        bCondition = false;
                    }
                    bCondition = false;
                    var sPromoConditionQry = "";
                    var sysInvoiceEvent = getSystemValue('InvoicePromoGroupSkipUOMCheck');
                    if (CheckBooleanField(sysInvoiceEvent)) {

                        // var getGrpParam = {};
                        ParamJS.GroupPromo = getGroupqry[q]['GroupPromo'];
                        ParamJS.Priority = getGroupqry[q]['Priority'];
                        ParamJS.UOM = getGroupqry[q]['UOM'];
                        ParamJS.custNo = custNo;
                        ParamJS.ItemId = getGroupqry[q]['ItemId'];
                        sPromoConditionQry = GetQueryString("GET_PROMOGROUPPRCHKO");//, JSON.stringify(getGrpParam));
                        //var getGrpqry = (sPromoConditionQry);
                    } else {
                        // var getGrpParam = {};
                        ParamJS.GroupPromo = getGroupqry[q]['GroupPromo'];
                        ParamJS.Priority = getGroupqry[q]['Priority'];
                        ParamJS.UOM = getGroupqry[q]['UOM'];
                        ParamJS.custNo = custNo;
                        ParamJS.ItemId = getGroupqry[q]['ItemId'];
                        sPromoConditionQry = GetQueryString("GET_PROMOGROUPPRCHKSE");//, JSON.stringify(getGrpParam));
                    }
                    //if (Number(getGroupqry[q]['MaxQty']) > 0) {
                    if (Number(getGroupqry[q]['MaxQty']) == 0) {
                        //var getGrpParam = {};
                        ParamJS.GroupPromo = getGroupqry[q]['GroupPromo'];
                        ParamJS.Priority = getGroupqry[q]['Priority'];
                        ParamJS.UOM = getGroupqry[q]['UOM'];
                        ParamJS.custNo = custNo;
                        ParamJS.ItemId = getGroupqry[q]['ItemId'];
                        sPromoConditionQry = GetQueryString("GET_PROMOGROUPPRMAX");//, JSON.stringify(getGrpParam));
                    }

                    //todo1
                    //sPromoConditionQry = GetQueryString1("Select  32 as Qty, 12 as amount ");
                    var getGrpqry = (sPromoConditionQry);
                    //console.log("Check Invoice getGroupqry GET_PROMOGROUPPRCH :" + getGrpqry.length);
                    for (var k = 0; k < getGrpqry.length; k++) {
                        if (Number(getGroupqry[q]['MinQty']) > Number(getGrpqry[k]['Qty']) || Number(getGroupqry[q]['MaxQty']) < Number(getGrpqry[k]['Qty']) || Number(getGroupqry[q]['MinAmt']) > Number(getGrpqry[k]['amount'])) {
                            //console.log("Check Invoice getGroupqry GET_PROMOGROUPPRCH if :" + getGroupqry[q]['MinQty']);
                            if (bConditionPromo != true) {
                                bCondition = false;
                            }
                            _obj = {};
                            _obj.PromoId = getGroupqry[q]['PromoId'];
                            _obj.MinQty = getGroupqry[q]['MinQty'];
                            _obj.Priority = getGroupqry[q]['Priority'];
                            _obj.Entitle = getGroupqry[q]['Entitle'];
                            _obj.EntitleType = getGroupqry[q]['EntitleType'];
                            arrPromoList.push(_obj);

                            break While1;
                        } else {
                            //console.log("Check Invoice getGroupqry GET_PROMOGROUPPRCH else :" + bMultiply);
                            if (bMultiply == true) {
                                iMulti = Math.floor(getGrpqry[k]['Qty'] / getGroupqry[q]['MinQty']);
                                iMultiCnt = iMulti;

                                if (Number(dLastMultiCnt) < 0 || (dLastMultiCnt != iMultiCnt && Number(dLastMultiCnt) > Number(iMultiCnt))) {
                                    dLastMultiCnt = iMultiCnt;
                                }

                            }
                            bCondition = true;
                            bConditionPromo = true;
                        }
                    }
                    if (bCondition == false) {
                        break While1;
                    }
                }
            if ((bPromoGroupPromo == true && bCondition == false)) {
                continue NextRecord;
            }
            var bBrandPromo = false;
            var getGroupParam = {};
            getGroupParam.PromoId = ipdDet.PromoId;

            getGroupqry1 = GetQueryString("GET_PROMOGROUPBR");//, JSON.stringify(getGroupParam));

            //todo1
           // getGroupqry1 = GetQueryString1("Select Promotion.PromoId, Promotion.PromoName, Priority, PromoCondition.ItemId, PromoCondition.UOM, MinQty, MaxQty, PromoCondition.MinAmt, isnull('','') as GroupPromo from PromoCondition INNER JOIN Promotion ON Promotion.PromoId = PromoCondition.PromoId where  Promotion.PromoId = 'NOVADMPP00417'  ");

            var getGroupqry = (getGroupqry1);
            //console.log("Check Invoice getGroupqry GET_PROMOGROUPBR :" + getGroupqry.length);
            While1:
                for (var q = 0; q < getGroupqry.length; q++) {
                    bBrandPromo = true;
                    if (bConditionPromo != true) {
                        bCondition = false;
                    }
                    bCondition = false;

                    //var getMaxzeParam = {};
                    ParamJS.GroupPromo = getGroupqry[q]['GroupPromo'];
                    ParamJS.Priority = getGroupqry[q]['Priority'];
                    ParamJS.UOM = getGroupqry[q]['UOM'];
                    ParamJS.custNo = custNo;
                    ParamJS.ItemId = getGroupqry[q]['ItemId'];

                    getGrpqry1 = GetQueryString("GET_PROMOGROUPBRCHK");//, JSON.stringify(getMaxzeParam));

                    //todo1
                    //getGrpqry1 = GetQueryString1("Select 13 as Qty, 24 as amount ");

                    var getGrpqry = (getGrpqry1);
                    for (var k = 0; k < getGrpqry.length; k++) {
                        if (Number(getGroupqry[q]['MinQty']) > Number(getGrpqry[k]['Qty']) || Number(getGroupqry[q]['MaxQty']) < Number(getGrpqry[k]['Qty']) || Number(getGroupqry[q]['MinAmt']) > Number(getGrpqry[k]['amount'])) {
                            if (bConditionPromo != true) {
                                bCondition = false;
                            }
                            _obj = {};
                            _obj.PromoId = getGroupqry[q]['PromoId'];
                            _obj.MinQty = getGroupqry[q]['MinQty'];
                            _obj.Priority = getGroupqry[q]['Priority'];
                            _obj.Entitle = getGroupqry[q]['Entitle'];
                            _obj.EntitleType = getGroupqry[q]['EntitleType'];
                            arrPromoList.push(_obj);

                            break While1;
                        } else {
                            if (bMultiply == true) {
                                iMulti = Math.floor(getGrpqry[k]['Qty'] / getGroupqry[q]['MinQty']);
                                iMultiCnt = iMulti;

                                if (Number(dLastMultiCnt) < 0 || (dLastMultiCnt != iMultiCnt && Number(dLastMultiCnt) > Number(iMultiCnt))) {
                                    dLastMultiCnt = iMultiCnt;
                                }

                            }
                            bCondition = true;
                            bConditionPromo = true;
                        }
                    }

                }
            if ((bBrandPromo == true && bCondition == false)) {
                continue NextRecord;
            }
            var sysmodelProm = getSystemValue('ModelPromotion');
            if (CheckBooleanField(sysmodelProm)) {
                var bBrandPromo = false;
                //var getGroupParam = {};
                ParamJS.PromoId = ipdDet.PromoId;

                getGroupqry1 = GetQueryString("GET_PROMOLOWER");//, JSON.stringify(getGroupParam));
                var getGroupqry = (getGroupqry1);
                //console.log("Check Invoice getGroupqry GET_PROMOLOWER :" + getGroupqry.length);
                While1:
                    for (var q = 0; q < getGroupqry.length; q++) {
                        bBrandPromo = true;
                        if (bConditionPromo != true) {
                            bCondition = false;
                        }
                        // var getproPriParam = {};
                        ParamJS.GroupPromo = getGroupqry[q]['GroupPromo'];
                        ParamJS.Priority = getGroupqry[q]['Priority'];
                        ParamJS.UOM = getGroupqry[q]['UOM'];
                        ParamJS.custNo = custNo;
                        ParamJS.ItemId = getGroupqry[q]['ItemId'];

                        getGrpqry1 = GetQueryString("GET_PROMODELPROMO");//, JSON.stringify(getproPriParam));
                        var getGrpqry = (getGrpqry1);
                        for (var k = 0; k < getGrpqry.length; k++) {
                            if (Number(getGroupqry[q]['MinQty']) > Number(getGrpqry[k]['Qty']) || Number(getGroupqry[q]['MaxQty']) < Number(getGrpqry[k]['Qty']) || Number(getGroupqry[q]['MinAmt']) > Number(getGrpqry[k]['amount'])) {
                                if (bConditionPromo != true) {
                                    bCondition = false;
                                }
                                _obj = {};
                                _obj.PromoId = getGroupqry[q]['PromoId'];
                                _obj.MinQty = getGroupqry[q]['MinQty'];
                                _obj.Priority = getGroupqry[q]['Priority'];
                                _obj.Entitle = getGroupqry[q]['Entitle'];
                                _obj.EntitleType = getGroupqry[q]['EntitleType'];
                                arrPromoList.push(_obj);

                                break While1;
                            } else {
                                if (bMultiply == true) {
                                    iMulti = Math.floor(getGrpqry[k]['Qty'] / getGroupqry[q]['MinQty']);
                                    iMultiCnt = iMulti;

                                }
                                bCondition = true;
                                bConditionPromo = true;
                            }
                        }
                    }
                if ((bBrandPromo == true && bCondition == false)) {
                    continue NextRecord;
                }
            }
            iMultiCnt = dLastMultiCnt;

            if (Number(iMultiCnt) == -1) {
                iMultiCnt = 1;
            }
            if (Number(ipdDet.Entitle) > 0) {
                if (Number(iPCount) + Number(iMultiCnt) > Number(ipdDet.Entitle)) {
                    iMultiCnt = Number(ipdDet.Entitle) - Number(iPCount);
                }
            }
            var bFocPromo = false;
            var bPromoGroup = false;
            var bCatPromo = false;
            // var getofferParam = {};
            ParamJS.PromoId = ipdDet.PromoId;

            getOfferqry1 = GetQueryString("GET_PROMOFFERIN");//, JSON.stringify(getofferParam));
            var getOfferqry = (getOfferqry1);

            //console.log("Check Invoice getOfferqry GET_PROMOFFERIN else :" + getOfferqry.length);

            for (var p = 0; p < getOfferqry.length; p++) {
                bPromoGroup = true;
            }

           // console.log("Check Invoice getOfferqry bPromoGroup bCatPromo :" + bPromoGroup + " " + bCatPromo);

            if (bPromoGroup == true || bCatPromo == true) {
                sSelectedItem = '';
                bCheckDataExists = false
                if (CheckData("Select PromoOffer.FocQty, PromoOffer.ItemID from PromoOffer where PromoID = '" + ipdDet.PromoId + "'")) {
                    // var getoffprdParam = {};
                    ParamJS.PromoId = ipdDet.PromoId;

                    getOffPrdqry1 = GetQueryString("GET_PROMOPRODUCT");//, JSON.stringify(getoffprdParam));
                    var getOffPrdqry = (getOffPrdqry1);
                    for (var j = 0; j < getOffPrdqry.length; j++) {
                        bCheckDataExists = true;
                        if (sSelectedItem == '') {
                            sSelectedItem = "" + getOffPrdqry[j]['ItemId'] + "";
                        } else {
                            sSelectedItem = sSelectedItem + "," + getOffPrdqry[j]['ItemId'] + "";
                        }

                    }
                }
                var qry1 = '';
                if (bCheckDataExists == true) {
                    // var getoffprdParam = {};
                    ParamJS.sSelectedItem = sSelectedItem;
                    ParamJS.PromoId = ipdDet.PromoId;

                    qry1 = GetQueryString("GET_PROMOSELECT");//, JSON.stringify(getoffprdParam));
                } else {
                    //var getoffprdParam = {};
                    ParamJS.PromoId = ipdDet.PromoId;

                    qry1 = GetQueryString("GET_PROMOFFERE");//, JSON.stringify(getoffprdParam));
                }
            } else {

                //console.log("Check Invoice qry GET_PROMOCHECK else :" + qry.length);
                //   var getoffprdParam = {};
                ParamJS.PromoId = ipdDet.PromoId;

                qry1 = GetQueryString("GET_PROMOCHECK");//, JSON.stringify(getoffprdParam));
            }

            //todo1
            //qry1 = GetQueryString1(" Select PromoOffer.Reason, PromoOffer.LineType, isnull(PromoOffer.DisCalc,'') as DisCalc, item.Itemname, item.Itemno, CASE When PackSize is null then '0' else PackSize END as PackSize, shortdesc, PromoOffer.Uom, PromoOffer.FOcQty, PromoOffer.DisPrice, PromoOffer.Discount, Category, PromoOffer.ItemID as PromoGroup from PromoOffer, item  where item.Itemno in ('650002') and PromoID = 'NOVADMPP00417'  order by LineType, PromoOffer.ItemId, FocQty, DisPrice, discount, Discalc");


            var qry = (qry1);
            for (var z = 0; z < qry.length; z++) {
                if (Number(qry[z]['FOcQty']) > 0) {
                    bFocPromo = true;
                    var LVItem = {};
                    LVItem["PromoType"] = "FOCQTY";
                    LVItem["ItemId"] = qry[z]['Itemno'];
                    LVItem["OType"] = 'FOC';
                    LVItem["ItemName"] = qry[z]['Itemname'];
                    LVItem["UOM"] = qry[z]['Uom'];
                    LVItem["Qty"] = parseFloat(qry[z]['FOcQty']);
                    var bEnable = getSystemValue('bEnableFOCPrice');
                    var bEnableFOCPrice = CheckBooleanField(bEnable);
                    if (bEnableFOCPrice == true) {

                        //_tmpPriceGroup = custDet[0]["PriceGroup2"];
                        var priceGroup = custDet.length == 0 ? "" : custDet[0]["PriceGroup"];
                        var price = this.getPrice(qry[z]['Itemno'], qry[z]['Uom'], Math.floor(iMultiCnt * parseFloat(qry[z]['FOcQty'])), 1, qry[z]['Uom'], priceGroup, false);// custDet[0]["PriceGroup"], false);
                        var amt = price * Math.floor(iMultiCnt * parseFloat(qry[z]['FOcQty']));
                        //Ti.App.NUMBER.mathRound(amt, getSystemValue('AmountRoundingDigits'));
                        Math.round(amt);//, getSystemValue('AmountRoundingDigits'));
                        LVItem["Price"] = price;
                        LVItem["Amount"] = amt;
                    } else {
                        LVItem["Price"] = 0;
                        LVItem["Amount"] = 0;
                    }
                    LVItem["Reason"] = qry[z]['Reason']; //'FOC';
                    LVItem["DisPrice"] = 0;
                    LVItem["Promotion"] = ipdDet.PromoId;
                    LVItem["Priority"] = 0;
                    LVItem["Category"] = qry[z]['Category'];
                    LVItem["shortdesc"] = qry[z]['shortdesc'];
                    LVItem["PromoCount"] = 1;
                    LVItem["LineType"] = '';//dtrOffer.fieldByName('LineType');
                    LVItem["DisCalc"] = '';//dtrOffer.fieldByName('DisCalc');
                    LVItem["PromoId"] = ipdDet.PromoId;
                    //lstOrdItems.push(LVItem);
                    newOrdItems.push(LVItem);
                }
            }

            if (bFocPromo == true) {
                resObj.bFocPromo = bFocPromo;
            }
            resObj.newOrdItems = newOrdItems;
            if (Number(resObj.DisPer) < Number(ipdDet.DisPer)) {
                resObj.DisPer = ipdDet.DisPer;
            }

            resObj.DisAmt = Number(resObj.DisAmt) + (Number(ipdDet.DisAmt) * Number(iMultiCnt));
            resObj.PromoId = ipdDet.PromoId;
            var obj1 = {}
            obj1.PromoId = ipdDet.PromoId;
            obj1.PromoCount = iPCount;
            obj1.DisAmt = Number(ipdDet.DisAmt) * Number(iMultiCnt);

            console.log("Promotion Array Stored in PromoId : >> " + obj1.PromoId + " Disc Amount : " + obj1.DisAmt + " Disc Per : " + ipdDet.DisPer);   // promoObj Array stored in Promomotion
            
            promoObj.push(obj1);    // PromoId / Discount make in Arrary
            resObj.promoObj = promoObj;
            resObj.PromoCount = iPCount;

            var dDisCalc = ipdDet.DisCalc;
            if (dDisCalc)// != null && dDisCalc != undefined && dDisCalc != '')
            {
                dDisAmt = dAmt;
                if (dDisCalc)// != null && dDisCalc != undefined && dDisCalc != '')
                {
                    var disArr = [];
                    disArr = dDisCalc.split('+');
                    var dDisAmt1 = 0;
                    for (var iCnt = 0; iCnt < disArr.length; iCnt++) {
                        if (Number(disArr[iCnt].indexOf('%')) > -1) {
                            //if (isNumber(parseFloat(disArr[iCnt])))
                            if (isNaN(parseFloat(disArr[iCnt]))) {
                            } else {
                                dDisAmt1 = dDisAmt1 + (dDisAmt * (parseFloat(disArr[iCnt]) / 100));
                                dDisAmt = dDisAmt - (dDisAmt * (parseFloat(disArr[iCnt]) / 100));
                            }
                        } else {
                            if (isNaN(parseFloat(disArr[iCnt]))) {
                            } else {
                                dDisAmt1 = dDisAmt1 + parseFloat(disArr[iCnt]);
                                dDisAmt = dDisAmt - parseFloat(disArr[iCnt]);
                            }
                        }
                    }
                }
                resObj.DisAmt = dDisAmt1;
            }
            bApplied = true;
            var multInv = getSystemValue('MultiInvoicePromotion');
            if (CheckBooleanField(multInv)) {
                var prmEvent = getSystemValue('PrmotionByEvent');
                if (CheckBooleanField(prmEvent)) {
                    sEvent = ipdDet.Event;
                }
                continue NextRecord;
            } else {
                break NextRecord;
            }

        }
    //console.log("Check Invoice return PromoId : " + resObj.PromoId);
    //console.log("Check Invoice return promoObj : " + resObj.promoObj);
    //console.log("Check Invoice return PromoCount : " + resObj.PromoCount);
    //console.log("Check Invoice return DisAmt : " + resObj.DisAmt);
    //console.log("Check Invoice return newOrdItems : " + resObj.newOrdItems);
    //console.log("Check Invoice return DisPer : " + resObj.DisPer);
    //console.log("Check Invoice return bFocPromo : " + resObj.bFocPromo);
    //console.log("Check Invoice return : " + JSON.stringify(resObj));

    try {
        obj = {};
        obj.subAmount = dAmt;
        obj.PromoDiscountAmt = 0;
        obj.discountAmt = 0;
        _varObj = {};
        bPromoArr = [];        
        if (resObj.DisPer != null && resObj.DisPer != undefined && resObj.DisPer != '' && resObj.DisPer != 0) {
            dPromoDisPer = resObj.DisPer;            
            obj.Remarks2 = "";
            if (resObj.promoObj.length > 0) {
                for (var j = 0; j < resObj.promoObj.length; j++) {
                    var promoObj = {};
                    promoObj.Promotion = resObj.promoObj[j].PromoId;//resObj[dPromoCnt].Promotion;
                    if (resObj.promoObj[j].PromoCount != null || resObj.promoObj[j].PromoCount != undefined || resObj.promoObj[j].PromoCount != '') {
                        promoObj.PromoCount = parseInt(resObj.promoObj[j].PromoCount) + 1;// 1;
                    } else {
                        promoObj.PromoCount = 1;
                    }
                    promoObj.ItemId = "";
                    promoObj.PromoType = 'Invoice Promotion';
                    promoObj.DisPrice = 0;
                    tmpDisPer = 0;                    
                    if (Number(resObj.DisPer) > 0) {
                          tmpDisPer = Number(obj.subAmount) * Number(resObj.DisPer) / 100;                       
                        if (isNaN(tmpDisPer)) {
                            tmpDisPer = 0;
                        }
                    }
                    promoObj.DisAmt = tmpDisPer;
                    resObj.DisAmt = resObj.DisAmt + tmpDisPer;
                    discountAmt = tmpDisPer;
                    bPromoArr.push(promoObj);
                }

            }
        }

        //console.log("Check Invoice resObj.DisAmt : " + resObj.DisAmt);

        if (resObj.DisAmt != null && resObj.DisAmt != undefined && resObj.DisAmt != '' && resObj.DisAmt != 0) {
            //dPromoDisAmt = resObj.DisAmt;
            dPromoDisAmt = 0;
            obj.Remarks2 = "";
            var TotalDiscountAmount = 0;
            
            if (resObj.promoObj.length > 0) {
                for (var j = 0; j < resObj.promoObj.length; j++) {
                    var promoObj = {};
                    promoObj.Promotion = resObj.promoObj[j].PromoId;//resObj[dPromoCnt].Promotion;
                    if (resObj.promoObj[j].PromoCount != null || resObj.promoObj[j].PromoCount != undefined || resObj.promoObj[j].PromoCount != '') {
                        promoObj.PromoCount = parseInt(resObj.promoObj[j].PromoCount) + 1;
                    } else {
                        promoObj.PromoCount = 1;
                    }
                    promoObj.ItemId = "";
                    promoObj.PromoType = 'Invoice Promotion';
                    promoObj.DisPrice = 0;

                    promoObj.DisAmt = resObj.promoObj[j].DisAmt;

                    if (promoObj.DisAmt > 0) {
                        obj.PromoDiscountAmt = promoObj.DisAmt;
                        dDiscountAmt = obj.PromoDiscountAmt;                       
                    } else {

                       if (resObj.DisAmt == 0) {
                           //obj.PromoDiscountAmt = 0;
                           //promoObj.DisAmt = 0;
                           //dDiscountAmt = 0;
                        } else {
                           obj.PromoDiscountAmt = parseFloat(dAmt * dPromoDisPer / 100);
                           promoObj.DisAmt = obj.PromoDiscountAmt;
                           dDiscountAmt = obj.PromoDiscountAmt;
                        }
                       
                    }
                                        
                    console.log(promoObj.Promotion + " Disc Amt : " + promoObj.DisAmt + " Disc Per : " + dPromoDisPer );

                    var agentid = agentId;
                    var orderno = InvoiceNo;
                    var orderdate = dtorderdate;
                    const currentDate = new Date();
                    const year = currentDate.getFullYear(); // Get the year (e.g., 2024)
                    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Get the month (0-11, add 1 to get 1-12), padded with leading zero if needed
                    const day = String(currentDate.getDate()).padStart(2, '0'); // Get the day of the month (1-31), padded with leading zero if needed
                    const hours = String(currentDate.getHours()).padStart(2, '0'); // Get the hour (0-23), padded with leading zero if needed
                    const minutes = String(currentDate.getMinutes()).padStart(2, '0'); // Get the minutes (0-59), padded with leading zero if needed
                    const currentDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;                                       
                    
                    var itempromocalculation3 = ("Log3 : CustomerId > " + custNo + " InvoiceNo > " + InvoiceNo + " PromoId > " + promoObj.Promotion + " DiscountPrice > " + promoObj.DisPrice + " DiscountAmount > " + promoObj.DisAmt + " PromoType > " + promoObj.PromoType + " PromoCount > " + promoObj.PromoCount);
                    ItemPromo_LogCalculation(itempromocalculation3);   // log discount calcualtion by siva dtd 30.12.2023

                    var query_promotemp = "insert into PromoEntitlementTemp (CustNo, OrdNo, OrderDate, PromoId, PromoCount, PromoDiscount, Userid) VALUES ('" + custNo + "', '" + orderno + "', '" + currentDateTime + "', '" + promoObj.Promotion + "', " + promoObj.PromoCount + ", " + promoObj.DisAmt + ", '" + agentid + "')";
                    var objwe = execute(query_promotemp);

                    // ----------------------------------- discount ----------------------------------//

                    // dtd 29.01.2024
                    //if (dPromoDisPer > 0) {
                    //    obj.PromoDiscountAmt = obj.PromoDiscountAmt + parseFloat(dAmt * dPromoDisPer / 100);
                    //    promoObj.DisAmt = obj.PromoDiscountAmt;
                    //    dDiscountAmt = obj.PromoDiscountAmt;
                    //}
                    

                    //if (dPromoDisAmt > 0 || resObj.DisAmt > 0) {
                    //    if (resObj.DisAmt == 0) {
                    //        obj.PromoDiscountAmt = obj.PromoDiscountAmt + dPromoDisAmt;
                    //    } else {
                    //        obj.PromoDiscountAmt = resObj.DisAmt;
                    //    }
                    //}
                    
                    //obj.PromoDiscountAmt = (obj.PromoDiscountAmt == null || obj.PromoDiscountAmt == undefined || obj.PromoDiscountAmt == '') ? 0 : obj.PromoDiscountAmt;
                    //dDiscountAmt = parseFloat(obj.discountAmt) + parseFloat(obj.PromoDiscountAmt);
                                        
                    // ----------------------------------- discount ----------------------------------//

                    //discountAmt = dDiscountAmt;  // promoObj.DisAmt;
                    //promoObj.DisAmt = dDiscountAmt;

                    // Sometimes 2 get promo discount will come, added below calculation to stored in total discount amount.                   
                    if (j == 0) {
                        TotalDiscountAmount = promoObj.DisAmt;
                    } else {
                        TotalDiscountAmount = TotalDiscountAmount + promoObj.DisAmt;
                    }
                    dDiscountAmt = TotalDiscountAmount;
                    discountAmt = TotalDiscountAmount;
                    promoObj.DisAmt = TotalDiscountAmount;

                    // insert records shift over line number 853

                    bPromoArr.push(promoObj);
                }
            }
        }

       // console.log("Check Invoice resObj.bFocPromo : " + resObj.bFocPromo);

        if (resObj.bFocPromo == true || resObj.bFocPromo == 'true' || resObj.bFocPromo == 1 || resObj.bFocPromo == '1') {
            var InvPromoItem = [];
            if (resObj.newOrdItems != null && resObj.newOrdItems != undefined && resObj.newOrdItems != '') {
                //console.log("Check Invoice resObj.newOrdItems : " + resObj.newOrdItems);
                InvPromoItem = resObj.newOrdItems;
            }
            //console.log("Check Invoice resObj.newOrdItems : " + InvPromoItem.length);
            if (InvPromoItem.length > 1) {
                arrPromoOfferItems = [];
                var obj1 = {};
                obj1.arrPromoCode = [InvPromoItem[0].PromoId];
                obj1.sArrPromoOfferItems = InvPromoItem;
                obj1.bPromoOfferItems = true;
                obj1.sItemId = 'Invice Promotion';
                obj1.sItemname = 'Invice Promotion';
                obj1.sUOM = '';
                obj1.dQty = InvPromoItem[0].Qty;
                obj1.dPromoQty = InvPromoItem[0].Qty;
                arrPromoOfferItems.push(obj1);
                arrPromoOfferItems = (arrPromoOfferItems == null || arrPromoOfferItems == undefined || arrPromoOfferItems == '') ? [] : arrPromoOfferItems;
                //console.log("Check Invoice arrPromoOfferItems.length : " + arrPromoOfferItems.length);
                if (arrPromoOfferItems.length > 0) {
                    bInvoicePromotionApplied = true;
                    arrPromoOfferItems = arrPromoOfferItems;
                    bCheckPromoCompleted = false;
                    arrPromoOfferItems[0].bCreateInvoice = params.bCreateInvoice;
                    arrPromoOfferItems[0].iDisCountPrice = 0;//iDisCountPrice;
                    arrPromoOfferItems[0].iDisCountPriceInPer = 0;//iDisCountPriceInPer;
                    arrPromoOfferItems[0].bModify = bModify;
                    /*setTimeout(function () {
                        bCheckPromoCompleted = true;
                        UI.openWindow('Sales PromoOffer Items', arrPromoOfferItems[0]);
                    }, 150);*/
                }
            } else {
                for (var _ji = 0; _ji < InvPromoItem.length; _ji++) {
                    //console.log("Check Invoice InvPromoItem[_ji].ItemId : " + InvPromoItem[_ji].ItemId);
                    var seper = getSystemValue('SeperateFOC')
                    if (CheckBooleanField(seper)) {
                    } else {
                        obj.Remarks2 = InvPromoItem[_ji].Promotion;
                    }
                    _varObj.sPromoReasonCode = '';
                    //var getInvProParam = {};
                    ParamJS.Promotion = InvPromoItem[_ji].Promotion;
                    qryInv = GetQueryString("GET_INVCHECK");//, JSON.stringify(getInvProParam));
                    var qryInvParse = (qryInv);
                    //console.log("Check Invoice qryInvParse.length : " + qryInvParse.length);
                    for (var z = 0; z < qryInvParse.length; z++) {
                        _varObj.sPromoReasonCode = qryInvParse[z]['Code'];
                    }
                    if (_varObj.sPromoReasonCode == null || _varObj.sPromoReasonCode == undefined || _varObj.sPromoReasonCode == '') {
                        try {
                            var promoRes = getSystemValue('PromoReasonCode');
                            var chkPromoRes = CheckString(promoRes);
                        } catch (e) {
                            _varObj.sPromoReasonCode = 'FOC';
                        }
                    }
                    _varObj.sPromoReasonCode = (_varObj.sPromoReasonCode == '') ? 'FOC' : _varObj.sPromoReasonCode;
                    _varObj.sPageRowIndex = -1;
                    _varObj.rows = ''; _varObj.sSalesType = ''; _varObj.qry = '';
                    _varObj.arrayQry = [];
                    _varObj.sitemid = ''; _varObj.sitemname = ''; _varObj.sUOM = ''; _varObj.dQty = ''; _varObj.dPrice = '';
                    _varObj.damount = ''; _varObj.sPromoID = ''; _varObj.sPriority = ''; _varObj.sPromoOffer = '';
                    _varObj.dDisPer = ''; _varObj.dDisPr = ''; _varObj.dActualPrice = ''; _varObj.sReasonCode = ''; _varObj.sRemarks = '';
                    _varObj.dLineNum = 10000; _varObj.dTempAutoNum = 0;
                    _damount = 0;
                    _varObj.sSalesType = 'F';
                    _varObj.dLineNum = 9999;//_varObj.i * 10000;
                    _varObj.sitemid = InvPromoItem[_ji].ItemId;
                    _varObj.sUOM = InvPromoItem[_ji].UOM;
                    _varObj.dQty = InvPromoItem[_ji].Qty;
                    _varObj.sitemname = InvPromoItem[_ji].ItemName;
                    _varObj.dPrice = 0;
                    _damount = 0;
                    _varObj.damount = 0;
                    _varObj.sPromoID = '';//arrPromoOfferItemList[cnt].Promotion;
                    _varObj.sPriority = InvPromoItem[_ji].Priority;
                    _varObj.sPromoOffer = InvPromoItem[_ji].Promotion;
                    _varObj.dDisPer = 0;
                    _varObj.dDisPr = 0;
                    _varObj.dActualPrice = 0;
                    _varObj.sReasonCode = _varObj.sPromoReasonCode;
                    _varObj.sRemarks = 'InvoicePromotion';
                    _varObj.dSugQty = 0;

                    _varObj.BulkBaseQty = 0;//arrPromoOfferItemList[cnt].BulkBaseQty;
                    _varObj.dBaseQty = 1;//arrPromoOfferItemList[cnt].dBaseQty;
                    _varObj.BulkUOM = InvPromoItem[_ji].UOM;//arrPromoOfferItemList[cnt].BulkUOM;
                    _varObj.PackUOM = InvPromoItem[_ji].UOM;//arrPromoOfferItemList[cnt].PackUOM;
                    _varObj.PackQty = 0;//arrPromoOfferItemList[cnt].PackQty;
                    _varObj.BulkQty = 0;//arrPromoOfferItemList[cnt].BulkQty;

                    try {

                        //
                        var syslocation = '';
                        var SalesAgentID = '';
                        var getAgentval1 = GetQueryString("GET_APPLYPROMOAGET");
                        var getAgentval = getAgentval1;// JSON.parse(getAgentval1);
                        for (var g = 0; g < getAgentval.length; g++) {
                            agentID = getAgentval[g]['AgentId'];
                            syslocation = getAgentval[g]['Location'];
                            SalesAgentID = getAgentval[g]['AgentId'];
                        }
                        // console.log('Apply Promotion CheckStockForFOC :' + syslocation + " " + agentID + " " + SalesAgentID);
                        var sCurrentLocation = syslocation, sCurrentAgent = agentID;
                        //
                        _varObj.dEnteredQty = 0;
                        _varObj.dVanQty = 0;
                        var query = "DELETE FROM TempOrderdet WHERE isnull(Unloaded,0) <> 2 and SalesType = '" + _varObj.sSalesType + "' and itemid = '" + _varObj.sitemid + "'  and PromoOffer='" + _varObj.sPromoOffer + "'";
                        //console.log("Check Invoice DELETE query : " + query);
                        var objqw = execute(query);
                        var checkStk = getSystemValue('CheckStockForFOC')
                        if (CheckBooleanField(checkStk)) {
                            //var getInVanParam = {};
                            ParamJS.sitemid = _varObj.sitemid;
                            ParamJS.syslocation = syslocation;
                            ParamJS.sUOM = _varObj.sUOM;
                            qryInVan = GetQueryString("GET_VANINVCHECK");//, JSON.stringify(getInVanParam));

                            //todo1
                            //qryInVan = GetQueryString1("Select 11 as cnt, 23 as VanQty , 13 as Qty");
                            var qryInVanParse = (qryInVan);
                            _varObj.dEnteredQty = 0;
                            _varObj.dVanQty = 0;
                            for (var z = 0; z < qryInVanParse.length; z++) {
                                _varObj.dEnteredQty = qryInVanParse[z]['Qty'];
                                _varObj.dVanQty = qryInVanParse[z]['VanQty'];
                            }

                            _varObj.dEnteredQty = parseFloat(_varObj.dEnteredQty) + parseFloat(InvPromoItem[_ji].Qty);
                        }
                        //console.log("Check Invoice DELETE query : " + _varObj.dVanQty + " " + _varObj.dEnteredQty + " " + CheckBooleanField(checkStk));
                        if ((parseFloat(_varObj.dVanQty) < parseFloat(_varObj.dEnteredQty)) && CheckBooleanField(checkStk)) {

                        } else {
                            var promoObj = {};
                            promoObj.Promotion = InvPromoItem[_ji].Promotion;//resObj[dPromoCnt].Promotion;
                            promoObj.PromoCount = 1;
                            promoObj.ItemId = _varObj.sitemid;
                            promoObj.PromoType = 'Invoice Promotion';
                            promoObj.DisPrice = 0;
                            promoObj.DisAmt = 0;
                            bPromoArr.push(promoObj);
                            _varObj.LooseUOM = _varObj.sUOM;
                            var PromoOfferQty = InvPromoItem[_ji].Qty;//dPromoQty;//_varObj.dQty;
                            var PromoOfferID = InvPromoItem[_ji].Promotion;//_varObj.sPromoOffer;
                            sAutoNum = 9999;
                            _varObj.dTempAutoNum = 9999;
                            var query = "insert into TempOrderdet (OrderNo, itemid, itemname, uom, qty, price, amount, PromoID, Priority, PromoOffer, DisPer, DisPr, ActPrice, ReasonCode, Remarks, LineNum, SalesType, SugQty, AutoNum, Unloaded, PackBaseQty, PackQty, PackUOM, BulkBaseQty, BulkQty, BulkUOM, PromoOfferQty, PromoOfferID) VALUES ('temp', '" + _varObj.sitemid + "', '" + _varObj.sitemname + "', '" + _varObj.LooseUOM + "', '" + _varObj.dQty + "', '" + _varObj.dPrice + "', '" + _varObj.damount + "', '" + _varObj.sPromoID + "', '" + _varObj.sPriority + "', '" + _varObj.sPromoOffer + "', '" + _varObj.dDisPer + "', '" + _varObj.dDisPr + "', '" + _varObj.dActualPrice + "', '" + _varObj.sReasonCode + "', '" + _varObj.sRemarks + "', '" + _varObj.dLineNum + "', '" + _varObj.sSalesType + "','" + _varObj.dSugQty + "','" + _varObj.dTempAutoNum + "',1, '" + _varObj.dBaseQty + "','" + _varObj.PackQty + "', '" + _varObj.PackUOM + "', '" + _varObj.BulkBaseQty + "', '" + _varObj.BulkQty + "', '" + _varObj.BulkUOM + "', '" + PromoOfferQty + "', '" + PromoOfferID + "')";
                            //var query = "insert into TempOrderdet (OrderNo, itemid, itemname, uom, qty, price, amount, PromoID, Priority, PromoOffer, DisPer, DisPr, ActPrice, ReasonCode, Remarks, LineNum, SalesType, SugQty, AutoNum, Unloaded, PackBaseQty, PackQty, PackUOM, BulkBaseQty, BulkQty, BulkUOM, PromoOfferQty, PromoOfferID) VALUES ('temp', " + _varObj.sitemid + ", " + _varObj.sitemname + ", " + _varObj.LooseUOM + ", " + _varObj.dQty + ", " + _varObj.dPrice + ", " + _varObj.damount + ", " + _varObj.sPromoID + ", '_varObj.sPriority + "', '" + _varObj.sPromoOffer + "', '" + _varObj.dDisPer + "', '" + _varObj.dDisPr + "', '" + _varObj.dActualPrice + "', '" + _varObj.sReasonCode + "', '" + _varObj.sRemarks + "', '" + _varObj.dLineNum + "', '" + _varObj.sSalesType + "','" + _varObj.dSugQty + "','" + _varObj.dTempAutoNum + "',1, '" + _varObj.dBaseQty + "','" + _varObj.PackQty + "', '" + _varObj.PackUOM + "', '" + _varObj.BulkBaseQty + "', '" + _varObj.BulkQty + "', '" + _varObj.BulkUOM + "', '" + PromoOfferQty + "', '" + PromoOfferID + "')";
                            var objwe = execute(query);
                            var tmprowObj = {};
                            tmprowObj.Qty = _varObj.dQty;
                            tmprowObj.ItemId = _varObj.sitemid;
                            tmprowObj.LineDisPr = 0;
                            tmprowObj.LineDisPer = 0;
                            tmprowObj.Promotion = '';
                            tmprowObj.LineNum = _varObj.dTempAutoNum;
                            tmprowObj.Price = 0;
                            tmprowObj.Amount = 0;
                            tmprowObj.UOM = _varObj.LooseUOM;
                            tmprowObj.Remarks = _varObj.sRemarks;
                            tmprowObj.ReasonCode = _varObj.sReasonCode;
                            tmprowObj.ReasonDesc = '';
                            tmprowObj.BaseQty = _varObj.dBaseQty;
                            tmprowObj.CategoryID = '';
                            tmprowObj.CategoryID = (tmprowObj.CategoryID == null || tmprowObj.CategoryID == undefined || tmprowObj.CategoryID == '') ? '' : tmprowObj.CategoryID;
                            tmprowObj.Brand = '';
                            tmprowObj.Brand = (tmprowObj.Brand == null || tmprowObj.Brand == undefined || tmprowObj.Brand == '') ? '' : tmprowObj.Brand;
                            tmprowObj.Offer = _varObj.sPromoOffer;
                            tmprowObj.Priority = '';
                            tmprowObj.Itemname = _varObj.sitemname;
                            tmprowObj.ActualPrice = 0;//Ti.App.ARRAYOPERATION.getColumnData(0, i, 'ActualPrice');
                            tmprowObj.ProductType = '';
                            tmprowObj.Company = '';//'';
                            tmprowObj.OOS = 0;//'';
                            tmprowObj.GoodsTaken = 0;//'';
                            tmprowObj.Amount = (tmprowObj.Amount == null || tmprowObj.Amount == undefined || tmprowObj.Amount == '') ? 0 : tmprowObj.Amount;
                            tmprowObj.OrderType = 'F';
                            tmprowObj.OrderType = 'FOC';
                            tmprowObj.sOrderNo = '';
                            //obj.arrItems.push(tmprowObj);

                        }
                    } catch (e) {
                        console.log("Error " + e);
                    }
                }
            }
        }
    } catch (e) { console.log("Error " + e); }
    //return resObj;

    //newly added

    //console.log("Check Invoice return : "+discountAmt);
    var ewt = 0;
    var gst = 0;
    getewtqry1 = GetQueryString("GET_EWT");
    var getewtqry = getewtqry1;// JSON.parse(getewtqry1);
    if (getewtqry != null) {
        for (var p = 0; p < getewtqry.length; p++) {
            ewt = getewtqry[p]['EWT'];
        }
    }
    //console.log("Check Invoice ewt : "+ewt);
    getgstqry1 = GetQueryString("GET_GST");
    var getgstqry = getgstqry1;// JSON.parse(getgstqry1);
    for (var q = 0; q < getgstqry.length; q++) {
        gst = getgstqry[q]['GST'];
    }
    //console.log("Check Invoice gst : "+gst);
    var gstAmt = (1 + Number(gst) * 0.01);
    //console.log("Check Invoice gstAmt : "+gstAmt);

    //var vat = ((Number(dAmt)-(Number(discountAmt)+(((Number(dAmt) - Number(discountAmt))*Number(ewt))/100)))*Number(gstAmt));
    //var vat = ((Number(dAmt))-((Number(discountAmt)+(((Number(dAmt) - Number(discountAmt))*Number(ewt))/100))))*Number(gstAmt);
    var vat = (dAmt - (discountAmt + (((dAmt - discountAmt) * ewt) / 100))) * gstAmt;
    //console.log("Check Invoice vat : "+vat);

    var totAmt = (dAmt - (discountAmt + (((dAmt - discountAmt) * ewt) / 100)));
    //console.log("Check Invoice totAmt : "+totAmt);

    var vatd = vat - totAmt;
    //console.log("Check Invoice vatd : "+vatd);

    var withHold = ((Number(dAmt) - Number(discountAmt)) * Number(ewt)) / 100;
    //console.log("Check Invoice withHold : "+withHold);
    //console.log("Check Invoice GSTType : "+custDet[0]["GSTType"]);

    var itempromocalculation4 = ("Log4 : CustomerId > " + custNo + " InvoiceNo > " + InvoiceNo + " Gst > " + gst + " GstAmount(1 + Number(gst) * 0.01) > " + gstAmt + " SubTotal > " + dAmt + " Discount > " + discountAmt + " Vat(dAmt - (discountAmt + (((dAmt - discountAmt) * ewt) / 100))) * gstAmt) > " + vat + " VatDiscount(vat - totAmt) > " + vatd + " TotalAmount((dAmt - (discountAmt + (((dAmt - discountAmt) * ewt) / 100)))) > " + totAmt);
    ItemPromo_LogCalculation(itempromocalculation4);   // log discount calcualtion by siva dtd 02.01.2024

    var excTxt = "exclusive";
    var gstype = custDet[0]["GSTType"];
    var res = excTxt.toLowerCase().localeCompare(gstype.toLowerCase());
    if (res == 0 || res == "0") {
        dAmt = Number(dAmt) + Number(vatd);
        //console.log("Check Invoice GSTType : "+gstype+" "+excTxt+" "+dAmt);
    }
   // var query = "insert into SalesSummary (CustNo, Customername, PONo, GrossAmt, Discount, VAT, withholdingTax, Total, Remarks) VALUES ('" + custNo + "', '" + custDet[0]["Customername"] + "', '', '" + dAmt + "', '" + tmpDisPer + "', '" + vatd + "', '" + withHold + "', '" + dAmt + "', '')";
    // tmpDisPer => DiscountAmount
    // Total Amount(dAmt) => totAmt
    var query = "insert into SalesSummary (CustNo, Customername, PONo, GrossAmt, Discount, VAT, withholdingTax, Total, Remarks) VALUES ('" + custNo + "', '" + custDet[0]["CustName"] + "', '', " + dAmt + ", " + discountAmt + ", " + vatd + ", " + withHold + ", " + totAmt + ", '')";
    var objwe = execute(query);
    return discountAmt;
    //return resObj.bFocPromo;
}

function CheckString(str) {
    if (str == null || str == undefined || str == 'null' || str == '') {
        return '';
    } else {
        return str;
    }
}

function formatDate(date) {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    var hour = d.getHours();
    var minute = d.getMinutes();
    var second = d.getSeconds();
    var millsecond = d.getMilliseconds();

    console.log([hour, minute, second, millsecond].join(':'));

    return [year, month, day].join('-') + " " + [hour, minute, second, millsecond].join(':');
}

function getAgentId() {
    //var resRet = GetQueryString("GET_SYSTEMS_VALUE", "");
    //var resRet =   GetQueryString("GET_SYSTEMS_VALUE");

    //var suomParse1 = JSON.parse(resRet);

    //for (var i = 0; i < suomParse1.length; i++) {
    //    res = suomParse1[i]["AgentId"];
    //}

    //return res;

    return FormView.UserID
}


function getInvoiceNo() {
    
    return FormView.InvNo
}

function getOrderDate() {

    return FormView.ordDt
}



function ItemPromo_LogCalculation(errorStr) {

    try {
        $.ajax({
            type: 'POST',
            url: url_ItemPromoLogCalculation,
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
