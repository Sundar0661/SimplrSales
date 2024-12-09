
//var dbConnection = require('/utils/DataBaseConnection');
var _tmpPriceGroup = "";
var dbCommonObj = {};
var db = '', dbDataRows = '', dbCon = '', res = 0, bFlag = false, qry = "";
//var dbConnObj = new dbConnection();
var dbConnObj = {};

function htmlEnc(s) {
    return s.replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
}

function BulkInsertQueries(arr) {

    dbConnObj.bSaved = false;
    try {
        //Ti.App.dbConn.execute("Begin");
        //Ti.App.dbConn.execute("Savepoint BulkInsert");
        //for (var i = 0; i < arr.length; i++) {
        //    // Ti.App.dbConn.execute(arr[i]);
        //}
        //Ti.App.dbConn.execute("Commit");
        var data = {};
        data = arr;
        if (ProjectName.toLowerCase() == "khind1") {


            var qry = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(JSON.stringify(data)), encryptkey, { keySize: 128 / 8, iv: encryptiv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
            var params = "{'data':'" + qry + "'}";

            $.ajax({
                //url: "../ActionConfig/ExecuteNonQuerys/",
                url: url_BulkInsertQueries,
                type: 'POST',
                dataType: 'json',
                async: false,
                data: params,
                contentType: "application/json;charset=utf-8",
                //data: { data: escape(JSON.stringify(data)) },
                success: function (results) {
                    return results;
                },
                error: function (results, q, a) {
                    debugger;
                    if (ProjectName.toLowerCase() != "khind")
                        alert("Bulk Insert :" + results);
                    LoadingImagePopUpClose();
                }
            });
        }
        else {
            $.ajax({
                //url: "../ActionConfig/ExecuteNonQuerys/",
                url: url_ExecuteNonQuerys,
                type: 'POST',
                dataType: 'json',
                async: false,
                //data: { data: encodeURI(JSON.stringify(data)) },
                data: { data: encodeURIComponent(JSON.stringify(data)) },
                //data: { data: escape(JSON.stringify(data)) },
                success: function (results) {
                    return results;
                },
                error: function (results, q, a) {
                    debugger;
                    if (ProjectName.toLowerCase() != "khind")
                        alert("Bulk Insert :" + results);
                    LoadingImagePopUpClose();
                }
            });
        }

        dbConnObj.bSaved = true;
    } catch (e) {
        debugger;

        //alert('BulkInsertQueries -> ' + e);
        //Ti.App.dbConn.execute("Rollback to Savepoint BulkInsert");
        //Ti.App.dbConn.execute("Commit");
        dbConnObj.bSaved = false;
        execute("Rollback to Savepoint BulkInsert");
        execute("Commit");
    } finally {
        return dbConnObj.bSaved;
    }

    return dbConnObj.bSaved;

    /********************************************************** /
    
    dbConnObj._db = dbConnObj.createDataBaseConnection();
    
    //for(var i=0; i< arr.length; i++){
        //Ti.API.info('BulkInsertQueries - '+  arr[i]);
    //}
        
    dbConnObj.bSaved = false;
    try{
        dbConnObj._db.execute("Begin");
        dbConnObj._db.execute("Savepoint BulkInsert");
        
        
        
        //Ti.App.ARRAYOPERATION.debug('DBCOMMON - BulkInsertQueries', '\n ##### BULKINSERTQUERY START #####');
        for(var i=0; i< arr.length; i++){
            //Ti.App.ARRAYOPERATION.debug('DBCOMMON - BulkInsertQueries', '\n BulkInsertQueries ' + i + ' : ' + arr[i] + ' \n');
            //Ti.API.info('BulkInsertQueries - '+  arr[i]);
            dbConnObj._db.execute(arr[i]);
            // var qry = arr[i];
            // //arr[i] = 
            // if(qry.indexOf(";") > -1){
                // var arr1 = qry.split(";");
                // for(var j=0; j< arr1.length; j++){
                    // if(arr1[j] != null && arr1[j] != undefined && arr1[j] != ''){
                        // //Ti.API.info('BulkInsertQueries - arr1 : '+  arr1[j]);
                        // _db.execute(arr1[j]);
                    // }
                // }        			
            // }else{
                // //Ti.API.info('BulkInsertQueries - '+  arr[i]);
                // _db.execute(arr[i]);
            // }
        }
        //Ti.App.ARRAYOPERATION.debug('DBCOMMON - BulkInsertQueries', '\n ##### BULKINSERTQUERY END #####');
        
        dbConnObj._db.execute("Commit");
        dbConnObj.bSaved = true;
    }catch(e){
        alert('BulkInsertQueries -> ' + e);
        //Ti.API.info(''+e);
        dbConnObj._db.execute("Rollback to Savepoint BulkInsert");
        dbConnObj._db.execute("Commit");
        dbConnObj.bSaved = false;
    } finally {
        dbConnObj._db.close();
        return dbConnObj.bSaved;
    }
    /************************************************/
}

function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}


////////////////////New1


function CheckInvoicePromotion(dAmt) {

    var dtr = '', dtrOffer = '';
    var Arr = [];
    var bApplied = false;
    var resObj = {};
    //var db = Ti.App.dbConn;//dbConnObj.createDataBaseConnection();
    var bConditionPromo = false;
    var dAmt1 = 0;
    var sPromoMsgText = "";
    var promoObj = [];
    var dLastMultiCnt = -1;
    var totDisAmt = 0;
    var ipdDet = {};
    var dateNow = new Date();
    dateNow = dbDateFormatSQLite(dateNow);

    var qry = "Select top 10 Promotion.PromoId, MinAmt, MaxAmt, CatBased, ItemCondition, DisPer, DisAmt, Multiply, Entitle, EntitleType, isnull(DisCalc,'') as DisCalc,isnull(Promotion.Event,'') as Event from Promotion, PromoApply Where PromoName <> 'Special Price' and PromoType = 'Invoice Promotion' and (Promotion.PromoId = PromoApply.PromoId) and ";
    //qry += "FromDate <= '" + dateNow + "' and ";
    //qry += "ToDate >= '" + dateNow + "' and ";
    qry += "((Promotion.ApType = 'All') or (PromoApply.Id = {FormView.CustId} and Promotion.ApType = 'Customer') or ";
    qry += "(PromoApply.Id = {FormView.CustId} and Promotion.ApType = 'Zone') or ";
    qry += "(PromoApply.Id ={FormView.UserID} and Promotion.ApType = 'Agent') or ";
    qry += "(PromoApply.Id = 'RETAIL' and "; //{FormView.CustId} based {FormView.PriceGroup} from customer table
    qry += "Promotion.ApType = 'Price Group')   or ";
    qry += "(Promotion.ApType = 'Discount Group' or Promotion.ApType = 'DiscountGroup')) order by Event,Priority";


    //var dbDataRows = db.execute(qry);
    qry = formatQueryString(qry, "");
    execute(qry);
    var dbDataRows = executeQry;
    if (dbDataRows != null && dbDataRows.length > 0) {
        for (var i = 0; i < dbDataRows.length; i++) {
            //while (dbDataRows.isValidRow()) {
            ipdDet = {};
            //  ipdDet["PromoId"] = dbDataRows.fieldByName("PromoId");
            ipdDet["PromoId"] = dbDataRows[i].PromoId;
            ipdDet["MinAmt"] = dbDataRows[i].MinAmt;
            ipdDet["MaxAmt"] = dbDataRows[i].MaxAmt;
            ipdDet["CatBased"] = dbDataRows[i].CatBased;
            ipdDet["ItemCondition"] = dbDataRows[i].ItemCondition;
            ipdDet["DisPer"] = dbDataRows[i].DisPer;
            ipdDet["DisAmt"] = dbDataRows[i].DisAmt;
            ipdDet["Multiply"] = dbDataRows[i].Multiply;
            ipdDet["Entitle"] = dbDataRows[i].Entitle;
            ipdDet["EntitleType"] = dbDataRows[i].EntitleType;
            ipdDet["Event"] = dbDataRows[i].Event;

            var sDisCalc = dbDataRows[i].DisCalc;
            ipdDet["DisCalc"] = dbDataRows[i].DisCalc;
            var sInvPromoId = ipdDet["PromoId"]; //Ti.App.sInvPromoId = ipdDet["PromoId"];
            //var Qry1 = "Select isnull(SUM(netamt),0) as InvoiceAmt from Invoices INNER JOIN PromoCondition ON PromoId ='PRO0000021' where void = 0 and CASE WHEN PromoTarget = 'Year' THEN date(InvDt) > Date('now','localtime','start of year') ELSE CASE WHEN PromoTarget = 'Month' THEN date(InvDt) > Date('now','localtime','start of month') ELSE CASE WHEN PromoTarget = 'Day' THEN date(InvDt) >= Date('now','localtime','start of Day') ELSE 1=0 END END END";
            // var Qry1 = Ti.App.ARRAYOPERATION.getQueryByScreenName('GetInvicePromo');

            var mScreenName = "GetInvicePromo";
            var Qry1 = getString['QueryConfig_' + mScreenName];
            Qry1 += ' ' + getString['QueryConfig_' + mScreenName + '_GroupText'];
            Qry1 += ' ' + getString['QueryConfig_' + mScreenName + '_OrderText'];
            if (Qry1 == '' || Qry1 == "undefined undefined undefined") {

                //Qry1 = "Select isnull(SUM(netamt),0) as InvoiceAmt from Invoices INNER JOIN PromoCondition ON PromoId = '" + sInvPromoId + "' where CustNo = {FormView.CustId}  and void = 0 and CASE WHEN PromoTarget = 'Year' THEN date(InvDt) > Date('now','localtime','start of year') ELSE CASE WHEN PromoTarget = 'Month' THEN date(InvDt) > Date('now','localtime','start of month') ELSE CASE WHEN PromoTarget = 'Day' THEN date(InvDt) >= Date('now','localtime','start of Day') ELSE 1=0 END END END";
                Qry1 = "Select isnull(SUM(TotalAmt),0) as InvoiceAmt from Invoice INNER JOIN PromoCondition ON PromoId = '" + sInvPromoId + "' where CustId = {FormView.CustId}  and void = 0";// and CASE WHEN PromoTarget = 'Year' THEN {FormView.InvDt} > format(getdate(),'yyyy-MM-dd') ELSE CASE WHEN PromoTarget = 'Month' THEN {FormView.InvDt} > format(getdate(),'yyyy-MM-dd') ELSE CASE WHEN PromoTarget = 'Day' THEN {FormView.InvDt} >= format(getdate(),'yyyy-MM-dd') ELSE 1=0 END END END";
            }
            dAmt1 = dAmt;

            //
            Qry1 = formatQueryString(Qry1, "");
            execute(Qry1);
            var dbDataRows1 = executeQry;
            if (dbDataRows1 != null && dbDataRows1.length > 0) {
                for (var j = 0; j < dbDataRows1.length; j++) {
                    //
                    // if (Qry1 != undefined && Qry1 != null && Qry1 != '') {
                    // var dbDataRows1 = db.execute(Qry1);
                    // while (dbDataRows1.isValidRow()) {
                    dAmt1 = parseFloat(dAmt) + parseFloat(dbDataRows1[j].InvoiceAmt);//Ti.App.COMMON.CheckDecimalVal(dbDataRows1.fieldByName("InvoiceAmt")));
                    // dbDataRows1.next();
                }
                //dbDataRows1.close();
            }

            if (dAmt1 >= ipdDet["MinAmt"] && dAmt1 <= ipdDet["MaxAmt"]) {
                Arr.push(ipdDet);
            } else {

                try {
                    var sOfferFOC = '';
                    Ti.API.info("select * from promooffer where promoid = " + Ti.App.SQL.safeSQL(Ti.App.sInvPromoId) + "");
                    var dbDataRows2 = db.execute("select * from promooffer where promoid = " + Ti.App.SQL.safeSQL(Ti.App.sInvPromoId) + "");
                    while (dbDataRows2.isValidRow()) {
                        sOfferFOC = dbDataRows2.fieldByName("ItemId") + ' Offer Qty: ' + dbDataRows2.fieldByName("FOCQty");
                        dbDataRows2.next();
                    }
                    dbDataRows2.close();
                    sPromoMsgText = "Promotion \n Condition : \n Min : " + dbDataRows.fieldByName("MinAmt") + " " + "\n" + "Max : " + dbDataRows.fieldByName("MaxAmt") + "\n" + "Offer : FOC " + sOfferFOC;
                } catch (e) {
                    //Ti.API.info("Error " + e);
                    // alert(e);
                }
                //Ti.App.arrPromoMsg.push(sPromoMsgText);
            }
            //dbDataRows.next();
        }
    }
    //dbDataRows.close();
    //db.close();

    if (Arr.length == 0) {


        //Exit Function
        //db.close();
        resObj = {};
        resObj.bFocPromo = false;
        resObj.newOrdItems = [];
        resObj.DisPer = 0;
        resObj.DisAmt = 0;
        resObj.PromoId = ipdDet.PromoId;
        resObj.PromoCount = 1;
        return resObj;//"";
    }
    //db = Ti.App.dbConn;//dbConnObj.createDataBaseConnection();


    var sEvent = 'Event';
    newOrdItems = [];
    promoObj = [];

    resObj = {};
    resObj.bFocPromo = false;
    resObj.newOrdItems = [];
    resObj.DisPer = 0;
    resObj.DisAmt = 0;
    resObj.PromoId = "";
    resObj.PromoCount = 0;

    NextRecord:
        for (var iIndex = 0; iIndex < Arr.length; iIndex++) {
            try {



                var bMultiply = false;
                var bMultiStarted = false;
                var iMultiCnt = 1;
                dLastMultiCnt = -1;
                var iMulti = 1;
                var bFocMultiPromo = false;
                var ipdDet = {};
                ipdDet = Arr[iIndex];

                //if (Ti.App.COMMON.CheckBooleanField(Ti.App.ARRAYOPERATION.getSystemValue('PrmotionByEvent'))) {
                if (getSystemValue('PrmotionByEvent')) {
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

                /*if (ipdDet.Entitle > 0) {
                    if (ipdDet.EntitleType == "Per Day" || ipdDet.EntitleType == "PerDay") {

                        //dtr = GetData("Select Sum(PromoCount) as TotalPromoApplied from PromoEntitlement where PromoId = " & SafeSQL(ipdDet.PromoId) & " and OrderDate = '" & Format(Date.Now, "yyyyMMdd") & "'")
                        var qry1 = "Select isnull(Sum(PromoCount),0) as TotalPromoApplied from PromoEntitlement where PromoId = " + Ti.App.SQL.safeSQL(ipdDet.PromoId) + " and date(OrderDate) = date(" + Ti.App.SQL.safeSQL(Ti.App.DATEFORMAT.formatDate(new String(new Date()), 'yyyy-MM-dd HH:mm:ss')) + ") and CustNo = " + Ti.App.SQL.safeSQL(Ti.App.CustNo);
                        var dbDataRows = db.execute(qry1);
                        while (dbDataRows.isValidRow()) {
                            // Comment by SR
                            //ipdDet = {}; 
                            //if (dbDataRows.fieldByName("TotalPromoApplied") == '') {
                            iPCount = dbDataRows.fieldByName("TotalPromoApplied");
                            //}
                            dbDataRows.next();
                        }
                        dbDataRows.close();
                    } else if (ipdDet.EntitleType == "Per Week" || ipdDet.EntitleType == "PerWeek") {
                        var tmpDate = Ti.App.dtDeliveryDate;//new Date();
                        var qry1 = "Select isnull(Sum(PromoCount),0) as TotalPromoApplied from PromoEntitlement where PromoId = " + Ti.App.SQL.safeSQL(ipdDet.PromoId) + " and date(OrderDate) = date(" + Ti.App.SQL.safeSQL(Ti.App.DATEFORMAT.formatDate(new String(new Date()), 'yyyy-MM-dd HH:mm:ss')) + ") and CustNo = " + Ti.App.SQL.safeSQL(Ti.App.CustNo);
                        var dbDataRows = db.execute(qry1);
                        while (dbDataRows.isValidRow()) {
                            // Comment by SR
                            //ipdDet = {};
                            //if (dbDataRows.fieldByName("TotalPromoApplied") == '') {
                            iPCount = dbDataRows.fieldByName("TotalPromoApplied");
                            //}
                            dbDataRows.next();
                        }
                        dbDataRows.close();
                    } else if (ipdDet.EntitleType == "Per Month" || ipdDet.EntitleType == "PerMonth") {
                        //var dtOrdDate = Ti.App.dtDeliveryDate;//new Date();
                        //var tmpDate = Ti.App.DATEFORMAT.dbDateFormatSQLite(new Date(dtOrdDate.getFullYear(), dtOrdDate.getMonth(), 1));
                        dateNow = new Date();
                        tmpDate = dbDateFormatSQLite(dateNow);

                        //var qry1 = "Select isnull(Sum(PromoCount),0) as TotalPromoApplied from PromoEntitlement where PromoId = '" + ipdDet.PromoId + "' and date(OrderDate) >= date('" + tmpDate + "') and CustNo = " + Ti.App.SQL.safeSQL(Ti.App.CustNo);
                        var qry1 = "Select isnull(Sum(PromoCount),0) as TotalPromoApplied from PromoEntitlement where PromoId = '" + ipdDet.PromoId + "' and  format(OrderDate,'yyyy-MM-dd')  >= format(getdate(),'yyyy-MM-dd') and CustNo = {FormView.CustId}";
                        qry1 = formatQueryString(qry1, "");
                        execute(qry1);
                        dbDataRows = executeQry;
                        if (dbDataRows != null && dbDataRows.length > 0) {
                            for (var k = 0; k < dbDataRows.length; k++) {
                                //dbDataRows = db.execute(qry1);
                                //while (dbDataRows.isValidRow()) {
                                iPCount = dbDataRows[k].TotalPromoApplied;
                                //dbDataRows.next();
                            }
                        }
                        //dbDataRows.close();
                    } else if (ipdDet.EntitleType == 'Per Promotion' || ipdDet.EntitleType == 'PerPromotion' || ipdDet.EntitleType == 'Per Invoice' || ipdDet.EntitleType == 'PerInvoice' || ipdDet.EntitleType == 'Per Order' || ipdDet.EntitleType == 'PerOrder') {
                        var qry1 = "Select isnull(Sum(PromoCount),0) as TotalPromoApplied from PromoEntitlement where PromoId = '" + ipdDet.PromoId + "' and CustNo = " + Ti.App.SQL.safeSQL(Ti.App.CustNo);
                        dbDataRows = db.execute(qry1);
                        while (dbDataRows.isValidRow()) {
                            iPCount = dbDataRows.fieldByName('TotalPromoApplied');
                            dbDataRows.next();
                        }
                        dbDataRows.close();
                    }
                    if (iPCount >= ipdDet.Entitle) {
                        continue NextRecord; //break NextRecord;
                    }
                }*/


                //Checking Items
                var bCondition = false;
                var bItemPromo = false;
                var bCatPromo = false;
                bConditionPromo = false;
                //var qry = "Select Promotion.PromoId, Promotion.PromoName, Priority, PromoCondition.ItemId, ItemName, PromoCondition.UOM, MinQty, MaxQty, PromoCondition.MinAmt, isnull(GroupPromo,'') as GroupPromo  from PromoCondition, Promotion, Products where Promotion.PromoId = PromoCondition.PromoId and PromoCondition.ItemId = Products.ItemId and PromoCondition.LineType = 'Item' and Promotion.PromoId = '" + ipdDet.PromoId + "'";
                var qry = "Select Promotion.PromoId, Promotion.PromoName, Priority, PromoCondition.ItemId, ItemName, PromoCondition.UOM, PromoCondition.MinQty, MaxQty, PromoCondition.MinAmt ,'' as GroupPromo      from PromoCondition, Promotion,     Item where Promotion.PromoId = PromoCondition.PromoId and PromoCondition.ItemId = Item.ItemNo and PromoCondition.LineType = 'Item' and Promotion.PromoId = '" + ipdDet.PromoId + "'";
                //var dbDataRows = db.execute(qry);
                qry = formatQueryString(qry, "");
                execute(qry);
                dbDataRows = executeQry;

                While1:


                    for (var l = 0; l < dbDataRows.length; l++) {
                        //while (dbDataRows.isValidRow()) {
                        bItemPromo = true;

                        if (bConditionPromo != true) {
                            bCondition = false;
                        }
                        bCondition = false;

                        //qry = "Select isnull(InvD.InvQty,0)  + isnull(Tmp.TmpQty,0) as Qty, (isnull(InvD.InvAmt,0)  + isnull(Tmp.TmpAmt,0)) as amount from Products LEFT JOIN (Select TempOrderDet.ItemId, TempOrderDet.UOM, SUM(isnull(TempOrderDet.price,0) * isnull(TempOrderDet.Qty,0)) as TmpAmt, SUM(TempOrderDet.Qty) as TmpQty  from TempOrderDet WHERE TempOrderDet.SalesType = 'S' and CASE WHEN (" + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) + " = '' OR " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) + " = 'INVOICE') THEN CASE WHEN isnull(TempOrderDet.Priority, 999) <> '' THEN isnull(TempOrderDet.Priority, 999) > Cast(" + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('Priority')) + " as int) ELSE 1=1 END ELSE 1=1 END GROUP BY TempOrderDet.ItemId, TempOrderDet.UOM) Tmp ON Tmp.ItemId = Products.ItemId and Tmp.UOM = " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('UOM')) + "  LEFT JOIN (Select InvDet.ItemId, InvDet.UOM, SUM(InvDet.AMOUNT) as InvAmt, SUM(InvDet.Qty) as InvQty  from InvDet INNER JOIN Invoices ON Invoices.InvNo = InvDet.InvNo where InvDet.SalesType = 'S' and CustNo = " + Ti.App.SQL.safeSQL(Ti.App.CustNo) + " and void = 0 and CASE WHEN " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) + " = 'Year' THEN InvDt > Date('now','localtime','start of year') ELSE CASE WHEN " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) + " = 'Month' THEN InvDt > Date('now','localtime','start of month') ELSE CASE WHEN " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) + " = 'Day' THEN date(InvDt) >= Date('now','localtime','start of Day') ELSE 1=0 END END END Group by InvDet.ItemId, InvDet.UOM)InvD ON InvD.ItemId = Products.ItemId and InvD.UOM = " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('UOM')) + " WHERE isnull(Qty,0) > 0 and Products.ItemId =" + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('ItemId'))";
                        //qry = "Select isnull(InvD.InvQty,0)  + isnull(Tmp.TmpQty,0) as Qty, (isnull(InvD.InvAmt,0)  + isnull(Tmp.TmpAmt,0)) as amount from Products LEFT JOIN (Select TempOrderDet.ItemId, TempOrderDet.UOM, SUM(isnull(TempOrderDet.price,0) * isnull(TempOrderDet.Qty,0)) as TmpAmt, SUM(TempOrderDet.Qty) as TmpQty  from TempOrderDet WHERE TempOrderDet.SalesType = 'S' and CASE WHEN (" + safeSQL(dbDataRows[l].GroupPromo) + " = '' OR " + safeSQL(dbDataRows[l].GroupPromo) + " = 'INVOICE') THEN CASE WHEN isnull(TempOrderDet.Priority, 999) <> '' THEN isnull(TempOrderDet.Priority, 999) > Cast(" + safeSQL(dbDataRows[l].Priority) + " as int) ELSE 1=1 END ELSE 1=1 END GROUP BY TempOrderDet.ItemId, TempOrderDet.UOM) Tmp ON Tmp.ItemId = Products.ItemId and Tmp.UOM = " + safeSQL(dbDataRows[l].UOM) + "  LEFT JOIN (Select InvDet.ItemId, InvDet.UOM, SUM(InvDet.AMOUNT) as InvAmt, SUM(InvDet.Qty) as InvQty  from InvDet INNER JOIN Invoices ON Invoices.InvNo = InvDet.InvNo where InvDet.SalesType = 'S' and CustNo = {FormView.CustId} and void = 0 and CASE WHEN " + safeSQL(dbDataRows[l].GroupPromo) + " = 'Year' THEN  FORMAT(InvDt,'yyyy-MM-dd') >  FORMAT( DATEADD(yy, DATEDIFF(yy, 0, GETDATE()), 0) ,'yyyy-MM-dd') ELSE CASE WHEN " + safeSQL(dbDataRows[l].GroupPromo) + " = 'Month' THEN  Format(InvDt,'yyyy-MM-dd') >  Format(DATEADD(m, DATEDIFF(m, 0, GETDATE()), 0) ,'yyyy-MM-dd') ELSE CASE WHEN " + safeSQL(dbDataRows[l].GroupPromo) + " = 'Day' THEN Format(InvDt,'yyyy-MM-dd') >= Format(DATEADD(d, DATEDIFF(d, 0, GETDATE()), 0) ,'yyyy-MM-dd') ELSE 1=0 END END END Group by InvDet.ItemId, InvDet.UOM)InvD ON InvD.ItemId = Products.ItemId and InvD.UOM = " + safeSQL(dbDataRows[l].UOM) + " WHERE isnull(Qty,0) > 0 and Products.ItemId =" + safeSQL(dbDataRows[l].ItemId);       
                        qry = "Select isnull(InvD.InvQty,0)  + isnull(Tmp.TmpQty,0) as Qty, (isnull(InvD.InvAmt,0)  + isnull(Tmp.TmpAmt,0)) as amount from     Item LEFT JOIN (Select TempOrderDet.ItemId, TempOrderDet.UOM, SUM(isnull(TempOrderDet.price,0) * isnull(TempOrderDet.Qty,0)) as TmpAmt, SUM(TempOrderDet.Qty) as TmpQty  from TempOrderDet WHERE TempOrderDet.SalesType = 'S'  GROUP BY TempOrderDet.ItemId, TempOrderDet.UOM) Tmp ON Tmp.ItemId = Item.Itemno and Tmp.UOM = " + safeSQL(dbDataRows[l].UOM) + "   LEFT JOIN (Select invItem.Itemno, invitem.UOM, SUM(invitem.subamt) as InvAmt, SUM(invitem.Qty) as InvQty  from invitem  INNER JOIN invoice ON invoice.InvNo = invitem.InvNo where invitem.SalesType = 'S' and Custid = {FormView.CustId} and void = 0  Group by invItem.Itemno, invitem.UOM)InvD ON InvD.Itemno = Item.Itemno and InvD.UOM = " + safeSQL(dbDataRows[l].UOM) + " WHERE  Item.Itemno =" + safeSQL(dbDataRows[l].ItemId);
                        //qry = "Select isnull(InvD.InvQty,0)  + isnull(Tmp.TmpQty,0) as Qty, (isnull(InvD.InvAmt,0)  + isnull(Tmp.TmpAmt,0)) as amount from     Item LEFT JOIN (Select TempOrderDet.ItemId, TempOrderDet.UOM, SUM(isnull(TempOrderDet.price,0) * isnull(TempOrderDet.Qty,0)) as TmpAmt, SUM(TempOrderDet.Qty) as TmpQty  from TempOrderDet WHERE TempOrderDet.SalesType = 'S'                                                                                                                                                                                                                                                                                                          GROUP BY TempOrderDet.ItemId, TempOrderDet.UOM) Tmp ON Tmp.ItemId = Item.Itemno and Tmp.UOM = 'Pouch'                                 LEFT JOIN (Select invItem.Itemno, invitem.UOM, SUM(invitem.subamt) as InvAmt, SUM(invitem.Qty) as InvQty  from invitem  INNER JOIN invoice ON invoice.InvNo = invitem.InvNo where invitem.SalesType = 'S' and Custid = 'T16-200104793' and void = 0                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  Group by invItem.Itemno, invitem.UOM)InvD ON InvD.Itemno = Item.Itemno and InvD.UOM = 'Pouch'                             WHERE  Item.Itemno ='650567'
                        qry = formatQueryString(qry, "");
                        execute(qry);
                        dbCommonObj.dbDataRows1 = executeQry;
                        //dbCommonObj.dbDataRows1 = db.execute(qry);
                        var arrPromoList = [];
                        for (var m = 0; m < dbCommonObj.dbDataRows1.length; m++) {
                            //while (dbCommonObj.dbDataRows1.isValidRow()) {

                            //if (dbDataRows.fieldByName('MinQty') > dbCommonObj.dbDataRows1.fieldByName('Qty') || dbDataRows.fieldByName('MaxQty') < dbCommonObj.dbDataRows1.fieldByName('Qty') || dbDataRows.fieldByName('MinAmt') > dbCommonObj.dbDataRows1.fieldByName('amount')) {
                            if (dbDataRows[l].MinQty > dbCommonObj.dbDataRows1[m].Qty || dbDataRows[l].MaxQty < dbCommonObj.dbDataRows1[m].Qty || dbDataRows[l].MinAmt > dbCommonObj.dbDataRows1[m].amount) {

                                if (bConditionPromo != true) {
                                    bCondition = false;
                                }

                                _obj = {};
                                _obj.PromoId = dbDataRows[l].PromoId;
                                _obj.MinQty = dbDataRows[l].MinQty;
                                _obj.Priority = dbDataRows[l].Priority;
                                _obj.Entitle = dbDataRows[l].Entitle;
                                _obj.EntitleType = dbDataRows[l].EntitleType;
                                //dbCommonObj.arrPromoList.push(_obj);
                                arrPromoList.push(_obj)
                                dbCommonObj.arrPromoList = arrPromoList;

                                break While1;
                            } else {

                                if (bMultiply == true) {
                                    iMulti = Math.floor(dbCommonObj.dbDataRows1[m].Qty / dbDataRows.fieldByName('MinQty'));
                                    iMultiCnt = iMulti;

                                    if (dLastMultiCnt < 0 || (dLastMultiCnt != iMultiCnt && dLastMultiCnt > iMultiCnt)) {
                                        dLastMultiCnt = iMultiCnt;
                                    }

                                }
                                bCondition = true;
                                bConditionPromo = true;
                                //arrCnt.push(iCnt);
                            }
                            //iCnt++;
                            //dbCommonObj.dbDataRows1.next();
                        }
                        //dbCommonObj.dbDataRows1.close();

                        if (bCondition == false) {
                            break While1;
                        }
                        // dbDataRows.next();
                    }
                // dbDataRows.close();

                if (bItemPromo == true && bCondition == false) {
                    continue NextRecord;
                }
                try {
                    //var qry1 = "Select Promotion.PromoId, Promotion.PromoName, Priority, PromoCondition.ItemId, PromoCondition.UOM, MinQty, MaxQty  from PromoCondition, Promotion where Promotion.PromoId = PromoCondition.PromoId and PromoCondition.LineType = 'Category' and Promotion.PromoId = '" + ipdDet.PromoId + "'";
                    //var qry1 = "Select Promotion.PromoId, Promotion.PromoName, Priority, PromoCondition.ItemId, PromoCondition.UOM, MinQty, MaxQty, Promotion.MinAmt, isnull(GroupPromo,'') as GroupPromo from PromoCondition INNER JOIN Promotion ON Promotion.PromoId = PromoCondition.PromoId where Promotion.PromoId = PromoCondition.PromoId and PromoCondition.LineType = 'Category' and Promotion.PromoId = '" + ipdDet.PromoId + "'";
                    var qry1 = "Select Promotion.PromoId, Promotion.PromoName, Priority, PromoCondition.ItemId, PromoCondition.UOM, MinQty, MaxQty, Promotion.MinAmt, isnull('','') as GroupPromo from PromoCondition INNER JOIN Promotion ON Promotion.PromoId = PromoCondition.PromoId where Promotion.PromoId = PromoCondition.PromoId and PromoCondition.LineType = 'Category' and Promotion.PromoId = '" + ipdDet.PromoId + "'";
                    //var dbDataRows = db.execute(qry1);
                    qry = formatQueryString(qry1, "");
                    execute(qry);
                    dbDataRows = executeQry;
                    While1:
                        for (var n = 0; n < dbDataRows.length; n++) {
                            //while (dbDataRows.isValidRow()) {
                            bCatPromo = true;
                            if (bConditionPromo != true) {
                                bCondition = false;
                            }

                            bCondition = false;
                            //dbCommonObj.dbDataRows1 = db.execute("Select (isnull(InvD.InvQty,0)  + isnull(TmpQty,0)) as Qty, (isnull(InvD.InvAmt,0)  + isnull(TmpAmt,0)) as amount from Category LEFT JOIN (Select Products.CategoryID, TempOrderDet.UOM, SUM(isnull(TempOrderDet.price,0) * isnull(TempOrderDet.Qty,0)) as TmpAmt, SUM(TempOrderDet.Qty) as TmpQty  from TempOrderDet INNER JOIN Products ON Products.ItemId = TempOrderDet.ItemId and Products.CategoryID = " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('ItemId')) + " WHERE TempOrderDet.SalesType = 'S' and  CASE WHEN (" + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) + " = '' OR " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) + " = 'INVOICE') THEN  CASE WHEN isnull(TempOrderDet.Priority, 999) <> '' THEN isnull(TempOrderDet.Priority, 999) > cast(" + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('Priority')) + " as int) ELSE 1=1 END END GROUP BY Products.CategoryID, TempOrderDet.UOM) Tmp ON Tmp.CategoryID = Category.CategoryId and Tmp.UOM = " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('UOM')) + "  LEFT JOIN (Select Products.CategoryID, InvDet.UOM, SUM(InvDet.AMOUNT) as InvAmt, SUM(InvDet.Qty) as InvQty  from InvDet INNER JOIN Products ON Products.ItemId = InvDet.ItemId and Products.CategoryID = " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('ItemId')) + " INNER JOIN Invoices ON Invoices.InvNo = InvDet.InvNo where InvDet.SalesType = 'S' and CustNo = " + Ti.App.SQL.safeSQL(Ti.App.CustNo) + " and void = 0 and CASE WHEN " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) + " = 'Year' THEN InvDt > Date('now','localtime','start of year') ELSE CASE WHEN " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) + " = 'Month' THEN InvDt > Date('now','localtime','start of month') ELSE CASE WHEN " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) + " = 'Day' THEN date(InvDt) >= Date('now','localtime','start of Day') ELSE 1=0 END END END Group by Products.CategoryID, InvDet.UOM)InvD ON InvD.CategoryID = Category.CategoryId and InvD.UOM = " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('UOM')) + " WHERE isnull(Qty,0) > 0 and Category.CategoryId =" + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('ItemId')));
                            dbCommonObj.dbDataRows1 = db.execute("Select (isnull(InvD.InvQty,0)  + isnull(TmpQty,0)) as Qty, (isnull(InvD.InvAmt,0)  + isnull(TmpAmt,0)) as amount from Category LEFT JOIN (Select Products.CategoryID, TempOrderDet.UOM, SUM(isnull(TempOrderDet.price,0) * isnull(TempOrderDet.Qty,0)) as TmpAmt, SUM(TempOrderDet.Qty) as TmpQty  from TempOrderDet INNER JOIN Products ON Products.ItemId = TempOrderDet.ItemId and Products.CategoryID = " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('ItemId')) + " WHERE TempOrderDet.SalesType = 'S' and  CASE WHEN (" + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) + " = '' OR " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) + " = 'INVOICE') THEN  CASE WHEN isnull(TempOrderDet.Priority, 999) <> '' THEN isnull(TempOrderDet.Priority, 999) > cast(" + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('Priority')) + " as int) ELSE 1=1 END END GROUP BY Products.CategoryID, TempOrderDet.UOM) Tmp ON Tmp.CategoryID = Category.CategoryId and Tmp.UOM = " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('UOM')) + "  LEFT JOIN (Select Products.CategoryID, InvDet.UOM, SUM(InvDet.AMOUNT) as InvAmt, SUM(InvDet.Qty) as InvQty  from InvDet INNER JOIN Products ON Products.ItemId = InvDet.ItemId and Products.CategoryID = " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('ItemId')) + " INNER JOIN Invoices ON Invoices.InvNo = InvDet.InvNo where InvDet.SalesType = 'S' and CustNo = {FormView.CustId} and void = 0 and CASE WHEN " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) + " = 'Year' THEN InvDt > Date('now','localtime','start of year') ELSE CASE WHEN " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) + " = 'Month' THEN InvDt > Date('now','localtime','start of month') ELSE CASE WHEN " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) + " = 'Day' THEN date(InvDt) >= Date('now','localtime','start of Day') ELSE 1=0 END END END Group by Products.CategoryID, InvDet.UOM)InvD ON InvD.CategoryID = Category.CategoryId and InvD.UOM = " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('UOM')) + " WHERE isnull(Qty,0) > 0 and Category.CategoryId =" + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('ItemId')));
                            while (dbCommonObj.dbDataRows1.isValidRow()) {

                                //if (dbDataRows.fieldByName('MinQty') > Ti.App.ARRAYOPERATION.getColumnData(0,iCnt,"Qty") || dbDataRows.fieldByName('MaxQty') < Ti.App.ARRAYOPERATION.getColumnData(0,iCnt,"Qty")) {
                                if (dbDataRows.fieldByName('MinQty') > dbCommonObj.dbDataRows1.fieldByName('Qty') || dbDataRows.fieldByName('MaxQty') < dbCommonObj.dbDataRows1.fieldByName('Qty') || dbDataRows.fieldByName('MinAmt') > dbCommonObj.dbDataRows1.fieldByName('amount')) {
                                    if (bConditionPromo != true) {
                                        bCondition = false;
                                    }

                                    _obj = {};
                                    _obj.PromoId = dbDataRows.fieldByName('PromoId');
                                    _obj.MinQty = dbDataRows.fieldByName('MinQty');
                                    _obj.Priority = dbDataRows.fieldByName('Priority');
                                    _obj.Entitle = dbDataRows.fieldByName('Entitle');
                                    _obj.EntitleType = dbDataRows.fieldByName('EntitleType');
                                    dbCommonObj.arrPromoList.push(_obj);

                                    break While1;
                                } else {

                                    if (bMultiply == true) {
                                        iMulti = Math.floor(dbCommonObj.dbDataRows1.fieldByName('Qty') / dbDataRows.fieldByName('MinQty'));
                                        iMultiCnt = iMulti;

                                        if (dLastMultiCnt < 0 || (dLastMultiCnt != iMultiCnt && dLastMultiCnt > iMultiCnt)) {
                                            dLastMultiCnt = iMultiCnt;
                                        }
                                    }
                                    bCondition = true;
                                    bConditionPromo = true;
                                    //arrCnt.push(iCnt);
                                }
                                //iCnt++;
                                //dbCommonObj.dbDataRows1.next();
                            }
                            //dbCommonObj.dbDataRows1.close();

                            //dbDataRows.next();
                        }
                    //dbDataRows.close();
                } catch (e) {
                    alert('Error1 ---> ' + e);
                    //Ti.App.COMMON.Log("Error1 " + e);
                }

                //Ti.App.COMMON.Log(bItemPromo + ' && ' + bCondition);

                if ((bCatPromo == true && bCondition == false)) {
                    continue NextRecord;
                }


                //CheckPROMOGROUP

                /*Included  PromoGroup, Promotion -> GroupPromo (Invoice, Day, Month, Year)
                 * Changed on 04 Aug 2020 
                 * Changed by Sattam/Ram 
                 */
                var bPromoGroupPromo = false;

                try {
                    //var qry1 = "Select Promotion.PromoId, Promotion.PromoName, Priority, PromoCondition.ItemId, PromoCondition.UOM, MinQty, MaxQty, PromoCondition.MinAmt, isnull(GroupPromo,'') as GroupPromo from PromoCondition INNER JOIN Promotion ON Promotion.PromoId = PromoCondition.PromoId where Promotion.PromoId = PromoCondition.PromoId and lower(PromoCondition.LineType) = lower('Promotion Group') and Promotion.PromoId = '" + ipdDet.PromoId + "'";
                    var qry1 = "Select Promotion.PromoId, Promotion.PromoName, Priority, PromoCondition.ItemId, PromoCondition.UOM, MinQty, MaxQty, PromoCondition.MinAmt, isnull('','') as GroupPromo from PromoCondition INNER JOIN Promotion ON Promotion.PromoId = PromoCondition.PromoId where Promotion.PromoId = PromoCondition.PromoId and lower(PromoCondition.LineType) = lower('Promotion Group') and Promotion.PromoId = '" + ipdDet.PromoId + "'";
                    //Ti.App.COMMON.Log("qry PromoGroup : " + qry1);
                    //var dbDataRows = db.execute(qry1);
                    //While1:

                    qry = formatQueryString(qry1, "");
                    execute(qry);
                    dbDataRows = executeQry;
                    While1:
                        for (var o = 0; o < dbDataRows.length; o++) {

                            //while (dbDataRows.isValidRow()) {
                            bPromoGroupPromo = true;
                            //Ti.API.info("bConditionPromo " + bConditionPromo);
                            if (bConditionPromo != true) {
                                bCondition = false;
                            }
                            bCondition = false;

                              //if (Ti.App.COMMON.CheckBooleanField(Ti.App.ARRAYOPERATION.getSystemValue('InvoicePromoGroupSkipUOMCheck'))) {
                            if (getSystemValue('InvoicePromoGroupSkipUOMCheck')) {
                                var sPromoConditionQry = "Select  isnull(InvD.InvQty,0)  + isnull(Tmp.TmpQty,0) as Qty, (isnull(InvD.InvAmt,0)  + isnull(Tmp.TmpAmt,0)) as amount from PromoGroup LEFT JOIN (Select PromoGroup.GroupId, TempOrderDet.UOM, SUM(isnull(TempOrderDet.price,0) * isnull(TempOrderDet.Qty,0)) as TmpAmt, SUM(TempOrderDet.Qty) as TmpQty  from TempOrderDet INNER JOIN PromoGroup ON PromoGroup.ItemId = TempOrderDet.ItemId and PromoGroup.GroupId =" + safeSQL(dbDataRows[o].ItemId) + " WHERE TempOrderDet.SalesType = 'S' and CASE WHEN (" + safeSQL(dbDataRows[o].GroupPromo) + " = '' OR " + safeSQL(dbDataRows[o].GroupPromo) + " = 'INVOICE') THEN 1=1 END GROUP BY PromoGroup.GroupId) Tmp ON PromoGroup.GroupId = Tmp.GroupId   LEFT JOIN (Select PromoGroup.GroupId, InvDet.UOM, SUM(InvDet.AMOUNT) as InvAmt, SUM(InvDet.Qty) as InvQty  from InvDet INNER JOIN PromoGroup ON PromoGroup.ItemId = InvDet.ItemId and PromoGroup.GroupId =" + safeSQL(dbDataRows[o].ItemId) + " INNER JOIN Invoices ON Invoices.InvNo = InvDet.InvNo where InvDet.SalesType = 'S' and CustNo = " + safeSQL(Ti.App.CustNo) + " and void = 0 and CASE WHEN " + safeSQL(dbDataRows[o].GroupPromo) + " = 'Year' THEN InvDt > Date('now','localtime','start of year') ELSE CASE WHEN " + safeSQL(dbDataRows[o].GroupPromo) + " = 'Month' THEN InvDt > Date('now','localtime','start of month') ELSE CASE WHEN " + safeSQL(dbDataRows[o].GroupPromo) + " = 'Day' THEN date(InvDt) >= Date('now','localtime','start of Day') ELSE 1=0 END END END Group by PromoGroup.GroupId)InvD ON InvD.GroupId = PromoGroup.GroupId  WHERE isnull(Qty,0) > 0 and PromoGroup.GroupId =" + safeSQL(dbDataRows[o].ItemId);

                            } else {
                                var sPromoConditionQry = "Select isnull(InvD.InvQty,0)  + isnull(Tmp.TmpQty,0) as Qty, (isnull(InvD.InvAmt,0)  + isnull(Tmp.TmpAmt,0)) as amount from PromoGroup LEFT JOIN (Select PromoGroup.GroupId, TempOrderDet.UOM, SUM(isnull(TempOrderDet.price,0) * isnull(TempOrderDet.Qty,0)) as TmpAmt, SUM(TempOrderDet.Qty) as TmpQty  from TempOrderDet INNER JOIN PromoGroup ON PromoGroup.ItemId = TempOrderDet.ItemId and PromoGroup.GroupId =" + safeSQL(dbDataRows[o].ItemId) + " WHERE TempOrderDet.SalesType = 'S' and CASE WHEN (" + safeSQL(dbDataRows[o].GroupPromo) + " = '' OR " + safeSQL(dbDataRows[o].GroupPromo) + " = 'INVOICE') THEN 1=1 END GROUP BY PromoGroup.GroupId, TempOrderDet.UOM) Tmp ON PromoGroup.GroupId = Tmp.GroupId and Tmp.UOM = " + safeSQL(dbDataRows[o].UOM) + "  LEFT JOIN (Select PromoGroup.GroupId, InvDet.UOM, SUM(InvDet.AMOUNT) as InvAmt, SUM(InvDet.Qty) as InvQty  from InvDet INNER JOIN PromoGroup ON PromoGroup.ItemId = InvDet.ItemId and PromoGroup.GroupId =" + safeSQL(dbDataRows[o].ItemId) + " INNER JOIN Invoices ON Invoices.InvNo = InvDet.InvNo where InvDet.SalesType = 'S' and CustNo =  {FormView.CustId}  and void = 0 and CASE WHEN " + safeSQL(dbDataRows[o].GroupPromo) + " = 'Year' THEN InvDt > Date('now','localtime','start of year') ELSE CASE WHEN " + safeSQL(dbDataRows[o].GroupPromo) + " = 'Month' THEN InvDt > Date('now','localtime','start of month') ELSE CASE WHEN " + safeSQL(dbDataRows[o].GroupPromo) + " = 'Day' THEN date(InvDt) >= Date('now','localtime','start of Day') ELSE 1=0 END END END Group by PromoGroup.GroupId, InvDet.UOM)InvD ON InvD.GroupId = PromoGroup.GroupId and InvD.UOM = " + safeSQL(dbDataRows[o].UOM) + "  WHERE isnull(Qty,0) > 0 and PromoGroup.GroupId =" + safeSQL(dbDataRows[o].ItemId);
                            }

                            if (dbDataRows[o].MaxQty == 0) {
                                sPromoConditionQry = "Select isnull(InvD.InvQty,0)  + isnull(Tmp.TmpQty,0) as Qty, (isnull(InvD.InvAmt,0)  + isnull(Tmp.TmpAmt,0)) as amount from PromoGroup LEFT JOIN (Select PromoGroup.GroupId, TempOrderDet.UOM, SUM(isnull(TempOrderDet.price,0) * isnull(TempOrderDet.Qty,0)) as TmpAmt, SUM(TempOrderDet.Qty) as TmpQty  from TempOrderDet INNER JOIN PromoGroup ON PromoGroup.ItemId = TempOrderDet.ItemId and PromoGroup.GroupId =" + safeSQL(dbDataRows[o].ItemId) + " WHERE TempOrderDet.SalesType = 'S' and CASE WHEN (" + safeSQLsafeSQL(dbDataRows[o].GroupPromo) + " = '' OR " + safeSQL(dbDataRows[o].GroupPromo) + " = 'INVOICE') THEN 1=1 END GROUP BY PromoGroup.GroupId, TempOrderDet.UOM) Tmp ON PromoGroup.GroupId = Tmp.GroupId LEFT JOIN (Select PromoGroup.GroupId, InvDet.UOM, SUM(InvDet.AMOUNT) as InvAmt, SUM(InvDet.Qty) as InvQty  from InvDet INNER JOIN PromoGroup ON PromoGroup.ItemId = InvDet.ItemId and PromoGroup.GroupId =" + safeSQL(dbDataRows[o].ItemId) + " INNER JOIN Invoices ON Invoices.InvNo = InvDet.InvNo where InvDet.SalesType = 'S' and CustNo =  {FormView.CustId}  and void = 0 and CASE WHEN " + safeSQL(dbDataRows[o].GroupPromo) + " = 'Year' THEN InvDt > Date('now','localtime','start of year') ELSE CASE WHEN " + safeSQL(dbDataRows[o].GroupPromo) + " = 'Month' THEN InvDt > Date('now','localtime','start of month') ELSE CASE WHEN " + safeSQL(dbDataRows[o].GroupPromo) + " = 'Day' THEN date(InvDt) >= Date('now','localtime','start of Day') ELSE 1=0 END END END Group by PromoGroup.GroupId, InvDet.UOM)InvD ON InvD.GroupId = PromoGroup.GroupId WHERE isnull(Qty,0) > 0 and PromoGroup.GroupId =" + safeSQL(dbDataRows[o].ItemId);
                            }

                            sPromoConditionQry = formatQueryString(sPromoConditionQry, "");
                            execute(sPromoConditionQry);
                            dbCommonObj.dbDataRows1 = executeQry;
                            //var arrPromoList = [];
                            for (var p = 0; p < dbCommonObj.dbDataRows1.length; p++) {

                                //
                                //dbCommonObj.dbDataRows1 = db.execute(sPromoConditionQry);
                                //while (dbCommonObj.dbDataRows1.isValidRow()) {
                                if (dbDataRows.fieldByName('MinQty') > dbCommonObj.dbDataRows1.fieldByName('Qty') || dbDataRows.fieldByName('MaxQty') < dbCommonObj.dbDataRows1.fieldByName('Qty') || dbDataRows.fieldByName('MinAmt') > dbCommonObj.dbDataRows1.fieldByName('amount')) {

                                    if (bConditionPromo != true) {
                                        bCondition = false;
                                    }

                                    _obj = {};
                                    _obj.PromoId = dbDataRows.fieldByName('PromoId');
                                    _obj.MinQty = dbDataRows.fieldByName('MinQty');
                                    _obj.Priority = dbDataRows.fieldByName('Priority');
                                    _obj.Entitle = dbDataRows.fieldByName('Entitle');
                                    _obj.EntitleType = dbDataRows.fieldByName('EntitleType');
                                    dbCommonObj.arrPromoList.push(_obj);

                                    break While1;
                                } else {
                                    Ti.API.info("LINE 6843 " + bMultiply);
                                    if (bMultiply == true) {
                                        iMulti = Math.floor(dbCommonObj.dbDataRows1.fieldByName('Qty') / dbDataRows.fieldByName('MinQty'));
                                        iMultiCnt = iMulti;
                                        Ti.API.info("LINE 6847 iMulti " + iMulti);

                                        if (dLastMultiCnt < 0 || (dLastMultiCnt != iMultiCnt && dLastMultiCnt > iMultiCnt)) {
                                            dLastMultiCnt = iMultiCnt;
                                        }
                                    }
                                    Ti.API.info("bCondition1 " + bCondition);
                                    bCondition = true;
                                    bConditionPromo = true;
                                }
                                //dbCommonObj.dbDataRows1.next();
                            }
                            //dbCommonObj.dbDataRows1.close();
                            if (bCondition == false) {
                                break While1;
                            }
                            //dbDataRows.next();
                        }
                    //dbDataRows.close();
                } catch (e) {
                    alert('Error2 ---> PromoGroup ' + e);
                }

                if ((bPromoGroupPromo == true && bCondition == false)) {
                    continue NextRecord;
                }

                //CheckBrand

                /*Included  PromoGroup, Promotion -> GroupPromo (Invoice, Day, Month, Year)
                 * Changed on 04 Aug 2020 
                 * Changed by Sattam/Ram 
                 */
                var bBrandPromo = false;

                try {
                    var qry1 = "Select Promotion.PromoId, Promotion.PromoName, Priority, PromoCondition.ItemId, PromoCondition.UOM, MinQty, MaxQty, PromoCondition.MinAmt, isnull(GroupPromo,'') as GroupPromo from PromoCondition INNER JOIN Promotion ON Promotion.PromoId = PromoCondition.PromoId where Promotion.PromoId = PromoCondition.PromoId and lower(PromoCondition.LineType) = lower('Brand') and Promotion.PromoId = '" + ipdDet.PromoId + "'";
                    Ti.App.COMMON.Log("qry brand : " + qry1);
                    var dbDataRows = db.execute(qry1); While1:
                        while (dbDataRows.isValidRow()) {
                            bBrandPromo = true;
                            if (bConditionPromo != true) {
                                bCondition = false;
                            }
                            Ti.App.COMMON.Log("qry " + "Select isnull(InvD.InvQty,0)  + isnull(Tmp.TmpQty,0) as Qty, (isnull(InvD.InvAmt,0)  + isnull(Tmp.TmpAmt,0)) as amount from Brand  LEFT JOIN (Select Products.Brand, TempOrderDet.UOM, SUM(isnull(TempOrderDet.price,0) * isnull(TempOrderDet.Qty,0)) as TmpAmt, SUM(TempOrderDet.Qty) as TmpQty  from TempOrderDet INNER JOIN Products ON Products.ItemId = TempOrderDet.ItemId and Products.Brand =" + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('ItemId')) + " WHERE TempOrderDet.SalesType = 'S' and CASE WHEN (" + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) + " = '' OR " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) + " = 'INVOICE') THEN CASE WHEN isnull(TempOrderDet.Priority, 999) <> " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('Priority')) + " THEN isnull(TempOrderDet.Priority, 999) > 1 ELSE 1=1 END END GROUP BY Products.Brand, TempOrderDet.UOM)  Tmp ON Brand.Code = Tmp.Brand and Tmp.UOM = " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('UOM')) + "   LEFT JOIN (Select Products.Brand, InvDet.UOM, SUM(InvDet.AMOUNT) as InvAmt, SUM(InvDet.Qty) as InvQty  from InvDet INNER JOIN Products ON Products.ItemId = InvDet.ItemId and Products.Brand =" + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('ItemId')) + " INNER JOIN Invoices ON Invoices.InvNo = InvDet.InvNo where InvDet.SalesType = 'S' and CustNo =  {FormView.CustId}  and void = 0 and CASE WHEN " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) + " = 'Year' THEN InvDt > Date('now','localtime','start of year') ELSE CASE WHEN " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) + " = 'Month' THEN InvDt > Date('now','localtime','start of month') ELSE CASE WHEN " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) + " = 'Day' THEN date(InvDt) >= Date('now','localtime','start of Day') ELSE 1=0 END END END Group by Products.Brand, InvDet.UOM)  InvD ON InvD.Brand = Brand.Code and InvD.UOM = " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('UOM')) + "  WHERE isnull(Qty,0) > 0 and Brand.Code =" + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('ItemId')));
                            //dbCommonObj.dbDataRows1 = db.execute("Select (isnull(InvD.InvQty,0)  + isnull(TempOrderDet.Qty,0) as Qty, (isnull(InvD.InvAmt,0)  + isnull(TempOrderDet.amount,0)) as amount from Brand LEFT JOIN (Select Products.Brand, TempOrderDet.UOM, SUM(TempOrderDet.amount) as TmpAmt, SUM(TempOrderDet.Qty) as TmpQty  from TempOrderDet INNER JOIN Products ON Products.ItemId = TempOrderDet.ItemId and Products.Brand =" + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('ItemId')) +" WHERE TempOrderDet.SalesType = 'S' and CASE WHEN (" + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) +" = '' OR " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) +" = 'INVOICE') THEN CASE WHEN isnull(TempOrderDet.Priority, 999) <> '' THEN isnull(TempOrderDet.Priority, 999) > " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('Priority')) + " ELSE 1=1 END END GROUP BY Products.Brand, TempOrderDet.UOM) Tmp ON Brand.Code = Tmp.Brand and Tmp.UOM = " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('UOM')) +"  LEFT JOIN (Select Products.Brand, InvDet.UOM, SUM(InvDet.AMOUNT) as InvAmt, SUM(InvDet.Qty) as InvQty  from InvDet INNER JOIN Products ON Products.ItemId = InvDet.ItemId and Products.Brand =" + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('ItemId')) +" INNER JOIN Invoices ON Invoices.InvNo = InvDet.InvNo where InvDet.SalesType = 'S' and CustNo = " + Ti.App.SQL.safeSQL(Ti.App.CustNo) +" and void = 0 and CASE WHEN " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) +" = 'Year' THEN IndDt > Date('now','localtime','start of year') ELSE CASE WHEN " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) +" = 'Month' THEN IndDt > Date('now','localtime','start of month') ELSE CASE WHEN " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) +" = 'Day' THEN date(IndDt) >= Date('now','localtime','start of Day') ELSE 1=0 END END END Group by Products.Brand, InvDet.UOM)InvD ON InvD.Brand = Brand.Code and InvD.UOM = " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('UOM')) +" WHERE isnull(Qty,0) > 0 and Brand.Code =" + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('ItemId')));
                            dbCommonObj.dbDataRows1 = db.execute("Select isnull(InvD.InvQty,0)  + isnull(Tmp.TmpQty,0) as Qty, (isnull(InvD.InvAmt,0)  + isnull(Tmp.TmpAmt,0)) as amount from Brand  LEFT JOIN (Select Products.Brand, TempOrderDet.UOM, SUM(isnull(TempOrderDet.price,0) * isnull(TempOrderDet.Qty,0)) as TmpAmt, SUM(TempOrderDet.Qty) as TmpQty  from TempOrderDet INNER JOIN Products ON Products.ItemId = TempOrderDet.ItemId and Products.Brand =" + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('ItemId')) + " WHERE TempOrderDet.SalesType = 'S' and CASE WHEN (" + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) + " = '' OR " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) + " = 'INVOICE') THEN CASE WHEN isnull(TempOrderDet.Priority, 999) <> " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('Priority')) + " THEN isnull(TempOrderDet.Priority, 999) > 1 ELSE 1=1 END END GROUP BY Products.Brand, TempOrderDet.UOM)  Tmp ON Brand.Code = Tmp.Brand and Tmp.UOM = " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('UOM')) + "   LEFT JOIN (Select Products.Brand, InvDet.UOM, SUM(InvDet.AMOUNT) as InvAmt, SUM(InvDet.Qty) as InvQty  from InvDet INNER JOIN Products ON Products.ItemId = InvDet.ItemId and Products.Brand =" + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('ItemId')) + " INNER JOIN Invoices ON Invoices.InvNo = InvDet.InvNo where InvDet.SalesType = 'S' and CustNo =  {FormView.CustId}  and void = 0 and CASE WHEN " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) + " = 'Year' THEN InvDt > Date('now','localtime','start of year') ELSE CASE WHEN " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) + " = 'Month' THEN InvDt > Date('now','localtime','start of month') ELSE CASE WHEN " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) + " = 'Day' THEN date(InvDt) >= Date('now','localtime','start of Day') ELSE 1=0 END END END Group by Products.Brand, InvDet.UOM)  InvD ON InvD.Brand = Brand.Code and InvD.UOM = " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('UOM')) + "  WHERE isnull(Qty,0) > 0 and Brand.Code =" + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('ItemId')));
                            while (dbCommonObj.dbDataRows1.isValidRow()) {
                                Ti.App.COMMON.Log("LINE 6314 " + dbDataRows.fieldByName('MinQty') + ' ' + dbCommonObj.dbDataRows1.fieldByName('Qty') + ' ' + dbDataRows.fieldByName('MaxQty') + ' ' + dbDataRows.fieldByName('MinAmt') + ' ' + dbCommonObj.dbDataRows1.fieldByName('amount'));
                                if (dbDataRows.fieldByName('MinQty') > dbCommonObj.dbDataRows1.fieldByName('Qty') || dbDataRows.fieldByName('MaxQty') < dbCommonObj.dbDataRows1.fieldByName('Qty') || dbDataRows.fieldByName('MinAmt') > dbCommonObj.dbDataRows1.fieldByName('amount')) {
                                    Ti.App.COMMON.Log("LINE 6318");
                                    if (bConditionPromo != true) {
                                        bCondition = false;
                                    }

                                    _obj = {};
                                    _obj.PromoId = dbDataRows.fieldByName('PromoId');
                                    _obj.MinQty = dbDataRows.fieldByName('MinQty');
                                    _obj.Priority = dbDataRows.fieldByName('Priority');
                                    _obj.Entitle = dbDataRows.fieldByName('Entitle');
                                    _obj.EntitleType = dbDataRows.fieldByName('EntitleType');
                                    dbCommonObj.arrPromoList.push(_obj);

                                    break While1;
                                } else {
                                    Ti.App.COMMON.Log("LINE 6332");
                                    if (bMultiply == true) {
                                        iMulti = Math.floor(dbCommonObj.dbDataRows1.fieldByName('Qty') / dbDataRows.fieldByName('MinQty'));
                                        iMultiCnt = iMulti;

                                        if (dLastMultiCnt < 0 || (dLastMultiCnt != iMultiCnt && dLastMultiCnt > iMultiCnt)) {
                                            dLastMultiCnt = iMultiCnt;
                                        }
                                    }
                                    bCondition = true;
                                    bConditionPromo = true;
                                }
                                dbCommonObj.dbDataRows1.next();
                            }
                            dbCommonObj.dbDataRows1.close();
                            dbDataRows.next();
                        }
                    dbDataRows.close();
                } catch (e) {
                    Ti.App.COMMON.Log("Error brand " + e);
                    //alert('e ---> ' + e);
                }

                Ti.App.COMMON.Log(bBrandPromo + ' && ' + bCondition);

                if ((bBrandPromo == true && bCondition == false)) {
                    continue NextRecord;
                }
                /*
                if (Ti.App.COMMON.CheckBooleanField(Ti.App.ARRAYOPERATION.getSystemValue('ModelPromotion'))) {
                    var bBrandPromo = false;

                    try {
                        var qry1 = "Select Promotion.PromoId, Promotion.PromoName, Priority, PromoCondition.ItemId, PromoCondition.UOM, MinQty, MaxQty, PromoCondition.MinAmt, isnull(GroupPromo,'') as GroupPromo from PromoCondition INNER JOIN Promotion ON Promotion.PromoId = PromoCondition.PromoId where Promotion.PromoId = PromoCondition.PromoId and lower(PromoCondition.LineType) = lower('Model') and Promotion.PromoId = '" + ipdDet.PromoId + "'";
                        Ti.App.COMMON.Log("qry Model : " + qry1);
                        var dbDataRows = db.execute(qry1); While1:
                            while (dbDataRows.isValidRow()) {
                                bBrandPromo = true;
                                if (bConditionPromo != true) {
                                    bCondition = false;
                                }
                                Ti.App.COMMON.Log("qry " + "Select isnull(InvD.InvQty,0)  + isnull(Tmp.TmpQty,0) as Qty, (isnull(InvD.InvAmt,0)  + isnull(Tmp.TmpAmt,0)) as amount from Model  LEFT JOIN (Select Products.Model, TempOrderDet.UOM, SUM(isnull(TempOrderDet.price,0) * isnull(TempOrderDet.Qty,0)) as TmpAmt, SUM(TempOrderDet.Qty) as TmpQty  from TempOrderDet INNER JOIN Products ON Products.ItemId = TempOrderDet.ItemId and Products.Model =" + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('ItemId')) + " WHERE TempOrderDet.SalesType = 'S' and CASE WHEN (" + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) + " = '' OR " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) + " = 'INVOICE') THEN CASE WHEN isnull(TempOrderDet.Priority, 999) <> " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('Priority')) + " THEN isnull(TempOrderDet.Priority, 999) > 1 ELSE 1=1 END END GROUP BY Products.Model, TempOrderDet.UOM)  Tmp ON Model.Code = Tmp.Model and Tmp.UOM = " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('UOM')) + "   LEFT JOIN (Select Products.Model, InvDet.UOM, SUM(InvDet.AMOUNT) as InvAmt, SUM(InvDet.Qty) as InvQty  from InvDet INNER JOIN Products ON Products.ItemId = InvDet.ItemId and Products.Model =" + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('ItemId')) + " INNER JOIN Invoices ON Invoices.InvNo = InvDet.InvNo where InvDet.SalesType = 'S' and CustNo =  {FormView.CustId}  and void = 0 and CASE WHEN " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) + " = 'Year' THEN InvDt > Date('now','localtime','start of year') ELSE CASE WHEN " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) + " = 'Month' THEN InvDt > Date('now','localtime','start of month') ELSE CASE WHEN " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) + " = 'Day' THEN date(InvDt) >= Date('now','localtime','start of Day') ELSE 1=0 END END END Group by Products.Model, InvDet.UOM)  InvD ON InvD.Model = Model.Code and InvD.UOM = " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('UOM')) + "  WHERE isnull(Qty,0) > 0 and Model.Code =" + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('ItemId')));
                                //dbCommonObj.dbDataRows1 = db.execute("Select (isnull(InvD.InvQty,0)  + isnull(TempOrderDet.Qty,0) as Qty, (isnull(InvD.InvAmt,0)  + isnull(TempOrderDet.amount,0)) as amount from Brand LEFT JOIN (Select Products.Brand, TempOrderDet.UOM, SUM(TempOrderDet.amount) as TmpAmt, SUM(TempOrderDet.Qty) as TmpQty  from TempOrderDet INNER JOIN Products ON Products.ItemId = TempOrderDet.ItemId and Products.Brand =" + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('ItemId')) +" WHERE TempOrderDet.SalesType = 'S' and CASE WHEN (" + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) +" = '' OR " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) +" = 'INVOICE') THEN CASE WHEN isnull(TempOrderDet.Priority, 999) <> '' THEN isnull(TempOrderDet.Priority, 999) > " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('Priority')) + " ELSE 1=1 END END GROUP BY Products.Brand, TempOrderDet.UOM) Tmp ON Brand.Code = Tmp.Brand and Tmp.UOM = " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('UOM')) +"  LEFT JOIN (Select Products.Brand, InvDet.UOM, SUM(InvDet.AMOUNT) as InvAmt, SUM(InvDet.Qty) as InvQty  from InvDet INNER JOIN Products ON Products.ItemId = InvDet.ItemId and Products.Brand =" + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('ItemId')) +" INNER JOIN Invoices ON Invoices.InvNo = InvDet.InvNo where InvDet.SalesType = 'S' and CustNo = " + Ti.App.SQL.safeSQL(Ti.App.CustNo) +" and void = 0 and CASE WHEN " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) +" = 'Year' THEN IndDt > Date('now','localtime','start of year') ELSE CASE WHEN " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) +" = 'Month' THEN IndDt > Date('now','localtime','start of month') ELSE CASE WHEN " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) +" = 'Day' THEN date(IndDt) >= Date('now','localtime','start of Day') ELSE 1=0 END END END Group by Products.Brand, InvDet.UOM)InvD ON InvD.Brand = Brand.Code and InvD.UOM = " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('UOM')) +" WHERE isnull(Qty,0) > 0 and Brand.Code =" + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('ItemId')));
                                dbCommonObj.dbDataRows1 = db.execute("Select isnull(InvD.InvQty,0)  + isnull(Tmp.TmpQty,0) as Qty, (isnull(InvD.InvAmt,0)  + isnull(Tmp.TmpAmt,0)) as amount from Model  LEFT JOIN (Select Products.Model, TempOrderDet.UOM, SUM(isnull(TempOrderDet.price,0) * isnull(TempOrderDet.Qty,0)) as TmpAmt, SUM(TempOrderDet.Qty) as TmpQty  from TempOrderDet INNER JOIN Products ON Products.ItemId = TempOrderDet.ItemId and Products.Model =" + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('ItemId')) + " WHERE TempOrderDet.SalesType = 'S' and CASE WHEN (" + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) + " = '' OR " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) + " = 'INVOICE') THEN CASE WHEN isnull(TempOrderDet.Priority, 999) <> " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('Priority')) + " THEN isnull(TempOrderDet.Priority, 999) > 1 ELSE 1=1 END END GROUP BY Products.Model, TempOrderDet.UOM)  Tmp ON Model.Code = Tmp.Model and Tmp.UOM = " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('UOM')) + "   LEFT JOIN (Select Products.Model, InvDet.UOM, SUM(InvDet.AMOUNT) as InvAmt, SUM(InvDet.Qty) as InvQty  from InvDet INNER JOIN Products ON Products.ItemId = InvDet.ItemId and Products.Model =" + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('ItemId')) + " INNER JOIN Invoices ON Invoices.InvNo = InvDet.InvNo where InvDet.SalesType = 'S' and CustNo =  {FormView.CustId}  and void = 0 and CASE WHEN " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) + " = 'Year' THEN InvDt > Date('now','localtime','start of year') ELSE CASE WHEN " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) + " = 'Month' THEN InvDt > Date('now','localtime','start of month') ELSE CASE WHEN " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) + " = 'Day' THEN date(InvDt) >= Date('now','localtime','start of Day') ELSE 1=0 END END END Group by Products.Model, InvDet.UOM)  InvD ON InvD.Model = Model.Code and InvD.UOM = " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('UOM')) + "  WHERE isnull(Qty,0) > 0 and Model.Code =" + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('ItemId')));
                                while (dbCommonObj.dbDataRows1.isValidRow()) {
                                    Ti.App.COMMON.Log("LINE 6314 " + dbDataRows.fieldByName('MinQty') + ' ' + dbCommonObj.dbDataRows1.fieldByName('Qty') + ' ' + dbDataRows.fieldByName('MaxQty') + ' ' + dbDataRows.fieldByName('MinAmt') + ' ' + dbCommonObj.dbDataRows1.fieldByName('amount'));
                                    if (dbDataRows.fieldByName('MinQty') > dbCommonObj.dbDataRows1.fieldByName('Qty') || dbDataRows.fieldByName('MaxQty') < dbCommonObj.dbDataRows1.fieldByName('Qty') || dbDataRows.fieldByName('MinAmt') > dbCommonObj.dbDataRows1.fieldByName('amount')) {
                                        Ti.App.COMMON.Log("LINE 6318");
                                        if (bConditionPromo != true) {
                                            bCondition = false;
                                        }

                                        _obj = {};
                                        _obj.PromoId = dbDataRows.fieldByName('PromoId');
                                        _obj.MinQty = dbDataRows.fieldByName('MinQty');
                                        _obj.Priority = dbDataRows.fieldByName('Priority');
                                        _obj.Entitle = dbDataRows.fieldByName('Entitle');
                                        _obj.EntitleType = dbDataRows.fieldByName('EntitleType');
                                        dbCommonObj.arrPromoList.push(_obj);

                                        break While1;
                                    } else {
                                        Ti.App.COMMON.Log("LINE 6332");
                                        if (bMultiply == true) {
                                            iMulti = Math.floor(dbCommonObj.dbDataRows1.fieldByName('Qty') / dbDataRows.fieldByName('MinQty'));
                                            iMultiCnt = iMulti;
                                        }
                                        bCondition = true;
                                        bConditionPromo = true;
                                    }
                                    dbCommonObj.dbDataRows1.next();
                                }
                                dbCommonObj.dbDataRows1.close();
                                dbDataRows.next();
                            }
                        dbDataRows.close();
                    } catch (e) {
                        Ti.App.COMMON.Log("Error Model " + e);
                        //alert('e ---> ' + e);
                    }

                    Ti.App.COMMON.Log(bBrandPromo + ' && ' + bCondition);

                    if ((bBrandPromo == true && bCondition == false)) {
                        continue NextRecord;
                    }
                }

                */
                /*
                //Checking Category
                If bCatPromo = True And bCondition = False Then GoTo NextRecord
                */



                Ti.API.info("dLastMultiCnt1 " + dLastMultiCnt);
                iMultiCnt = dLastMultiCnt;

                if (iMultiCnt == -1) {
                    iMultiCnt = 1;
                }

                Ti.API.info("iMultiCnt " + iMultiCnt);

                if (ipdDet.Entitle > 0) {
                    if (iPCount + iMultiCnt > ipdDet.Entitle) {
                        iMultiCnt = ipdDet.Entitle - iPCount;
                    }
                }

                var bFocPromo = false;
                try {
                    //newOrdItems = [];


                    var bPromoGroup = false;
                    var bCatPromo = false;
                    var qry = "select distinct promooffer.Itemid from promogroup, promooffer where promooffer.Itemid = PromoGroup.GroupId and promoid = " + Ti.App.SQL.safeSQL(ipdDet.PromoId);
                    Ti.App.COMMON.Log('i am here 4 --> ' + qry);
                    //alert(qry);
                    dbDataRows = db.execute(qry);
                    while (dbDataRows.isValidRow()) {
                        bPromoGroup = true;
                        dbDataRows.next();
                    }
                    dbDataRows.close();
                    if (bPromoGroup == true || bCatPromo == true) {
                        sSelectedItem = '';
                        bCheckDataExists = false;
                        //if(this.CheckData("Select PromoOffer.FocQty, PromoOffer.ItemID from PromoOffer where PromoID = '" + stPromo.PromoId + "' and FocQty > 0")){
                        if (this.CheckData("Select PromoOffer.FocQty, PromoOffer.ItemID from PromoOffer where PromoID = " + Ti.App.SQL.safeSQL(ipdDet.PromoId) + "")) {

                            qry = "Select PromoGroup.ItemID,Products.UOM, Products.ShortDesc as [Description] from PromoGroup INNER JOIN Products ON PromoGroup.ItemID = Products.ItemID where PromoGroup.GroupID in (Select ItemID from PromoOffer where PromoID = " + Ti.App.SQL.safeSQL(ipdDet.PromoId) + ") order by Products.ItemID";
                            dbDataRows = db.execute(qry);

                            while (dbDataRows.isValidRow()) {
                                bCheckDataExists = true;
                                if (sSelectedItem == '') {
                                    sSelectedItem = "" + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('ItemId')) + "";
                                }
                                else {
                                    sSelectedItem = sSelectedItem + "," + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('ItemId')) + "";
                                }

                                dbDataRows.next();
                            }
                            dbDataRows.close();
                        }
                        //alert('sSelectedItem ---> ' + sSelectedItem);

                        if (bCheckDataExists == true) {
                            //var sSelectedItem = '';
                            //ToDo let user to select the promo item
                            qry = "Select PromoOffer.Reason, PromoOffer.LineType, isnull(PromoOffer.DisCalc,'') as DisCalc, Products.Itemname, Products.ItemId, CASE When PackSize is null then '0' else PackSize END as PackSize, shortdesc," + " PromoOffer.Uom, PromoOffer.FOcQty, PromoOffer.DisPrice, PromoOffer.Discount, CategoryId, PromoOffer.ItemID as PromoGroup " + " from PromoOffer, Products where Products.ItemID in (" + sSelectedItem + ") and PromoID = " + Ti.App.SQL.safeSQL(ipdDet.PromoId) + " order by LineType, PromoOffer.ItemId, FocQty, DisPrice, discount, Discalc";
                            //qry = "Select PromoOffer.ItemId, ItemName, PromoOffer.Uom, PromoOffer.FOcQty, PromoOffer.DisPrice, PromoOffer.Discount, CategoryID from PromoOffer, Products where PromoOffer.ItemId = Products.ItemID and PromoID = '" + ipdDet.PromoId + "'";
                        } else {
                            qry = "Select PromoOffer.ItemId, ItemName, PromoOffer.Uom, PromoOffer.FOcQty, PromoOffer.DisPrice, PromoOffer.Discount, CategoryID from PromoOffer, Products where PromoOffer.ItemId = Products.ItemID and PromoID = '" + ipdDet.PromoId + "'";
                        }

                    } else {
                        qry = "Select PromoOffer.ItemId, ItemName, PromoOffer.Uom, PromoOffer.FOcQty, PromoOffer.DisPrice, PromoOffer.Discount, CategoryID from PromoOffer, Products where PromoOffer.ItemId = Products.ItemID and PromoID = '" + ipdDet.PromoId + "'";
                    }
                    //alert('i am here 8');
                    Ti.App.COMMON.Log('Invoice Promo offer ----> ' + qry);

                    Ti.App.COMMON.Log('iMultiCnt -> ' + iMultiCnt);

                    //var iMultiCnt = 1;
                    Ti.App.COMMON.Log("Select PromoOffer.ItemId, ItemName, PromoOffer.Uom, PromoOffer.FOcQty, PromoOffer.DisPrice, PromoOffer.Discount, CategoryID from PromoOffer, Products where PromoOffer.ItemId = Products.ItemID and PromoID = '" + ipdDet.PromoId + "'");
                    var dbDataRows1 = db.execute(qry);//"Select PromoOffer.ItemId, ItemName, PromoOffer.Uom, PromoOffer.FOcQty, PromoOffer.DisPrice, PromoOffer.Discount, CategoryID from PromoOffer, Products where PromoOffer.ItemId = Products.ItemID and PromoID = '" + ipdDet.PromoId + "'");
                    while (dbDataRows1.isValidRow()) {

                        Ti.App.COMMON.Log('FOCQTY : ' + dbDataRows1.fieldByName("FocQty"));

                        if (dbDataRows1.fieldByName("FocQty") > 0) {
                            bFocPromo = true;
                            var LVItem = {};
                            LVItem["PromoType"] = "FOCQTY";
                            LVItem["ItemId"] = dbDataRows1.fieldByName('ItemId');
                            LVItem["OType"] = 'FOC';
                            LVItem["ItemName"] = dbDataRows1.fieldByName('Itemname');
                            LVItem["UOM"] = dbDataRows1.fieldByName('UOM');
                            LVItem["Qty"] = parseFloat(dbDataRows1.fieldByName('FOcQty'));
                            if (bEnableFOCPrice == true) {
                                var price = this.getPrice(dbDataRows1.fieldByName('ItemId'), dbDataRows1.fieldByName('UOM'), Math.floor(iMultiCnt * parseFloat(dbDataRows1.fieldByName('FOcQty'))), 1, dbDataRows1.fieldByName('UOM'), Ti.App.ARRAYOPERATION.getCustFieldValue('PriceGroup'), false);
                                var amt = price * Math.floor(iMultiCnt * parseFloat(dbDataRows1.fieldByName('FOcQty')));
                                Ti.App.NUMBER.mathRound(amt, Ti.App.ARRAYOPERATION.getSystemValue('AmountRoundingDigits'));
                                LVItem["Price"] = price;
                                LVItem["Amount"] = amt;
                            } else {
                                LVItem["Price"] = 0;
                                LVItem["Amount"] = 0;
                            }
                            LVItem["Reason"] = dbDataRows1.fieldByName('Reason'); //'FOC';
                            LVItem["DisPrice"] = 0;
                            LVItem["Promotion"] = ipdDet.PromoId;
                            LVItem["Priority"] = 0;
                            LVItem["Category"] = dbDataRows1.fieldByName('CategoryId');
                            LVItem["shortdesc"] = dbDataRows1.fieldByName('shortdesc');
                            LVItem["PromoCount"] = 1;
                            LVItem["LineType"] = '';//dtrOffer.fieldByName('LineType');
                            LVItem["DisCalc"] = '';//dtrOffer.fieldByName('DisCalc');
                            LVItem["PromoId"] = ipdDet.PromoId;
                            //lstOrdItems.push(LVItem);
                            newOrdItems.push(LVItem);
                        }
                        dbDataRows1.next();
                    }
                    dbDataRows1.close();
                } catch (e) { Ti.App.COMMON.Log('6386 Error ' + e); }



                Ti.API.info("LINE 7150 " + ipdDet.DisAmt);

                if (bFocPromo == true) {
                    resObj.bFocPromo = bFocPromo;
                }

                //resObj = {};                
                resObj.newOrdItems = newOrdItems;

                if (resObj.DisPer < ipdDet.DisPer) {
                    resObj.DisPer = ipdDet.DisPer;
                }
                resObj.DisAmt = resObj.DisAmt + (ipdDet.DisAmt * iMultiCnt);
                resObj.PromoId = ipdDet.PromoId;


                var obj1 = {}
                obj1.PromoId = ipdDet.PromoId;
                obj1.PromoCount = iPCount;
                obj1.DisAmt = ipdDet.DisAmt * iMultiCnt;

                promoObj.push(obj1);
                //Ti.API.info("LINE 7203 "+JSON.stringify(promoObj));
                resObj.promoObj = promoObj;
                resObj.PromoCount = iPCount;


                //totDisAmt = totDisAmt + ipdDet.DisAmt * iMultiCnt;
                //resObj.DisAmt = resObj.DisAmt  + totDisAmt;


                var dDisCalc = ipdDet.DisCalc;
                if (dDisCalc != null && dDisCalc != undefined && dDisCalc != '') {
                    dDisAmt = dAmt;
                    if (dDisCalc != null && dDisCalc != undefined && dDisCalc != '') {
                        //Ti.App.COMMON.Log('dDisCalc -> ' + dDisCalc);
                        var disArr = [];
                        disArr = dDisCalc.split('+');

                        var dDisAmt1 = 0;
                        for (var iCnt = 0; iCnt < disArr.length; iCnt++) {

                            if (disArr[iCnt].indexOf('%') > -1) {
                                //disArr[iCnt] = Ti.App.ARRAYOPERATION.createQuery(disArr[iCnt], "%", "");
                                if (Ti.App.COMMON.isNumber(parseFloat(disArr[iCnt]))) {
                                    dDisAmt1 = dDisAmt1 + (dDisAmt * (parseFloat(disArr[iCnt]) / 100));
                                    dDisAmt = dDisAmt - (dDisAmt * (parseFloat(disArr[iCnt]) / 100));
                                } else {
                                    //Ti.App.COMMON.Log('Invoice Promotion : DisCalc - ' + dDisCalc + ' : disArr[iCnt] 2-> ' + disArr[iCnt]);
                                }
                            } else {
                                if (Ti.App.COMMON.isNumber(parseFloat(disArr[iCnt]))) {
                                    dDisAmt1 = dDisAmt1 + parseFloat(disArr[iCnt]);
                                    dDisAmt = dDisAmt - parseFloat(disArr[iCnt]);
                                } else {
                                    //Ti.App.COMMON.Log('Invoice Promotion : DisCalc - ' + dDisCalc + ' : disArr[iCnt] 2-> ' + disArr[iCnt]);
                                }
                            }
                        }
                    }
                    resObj.DisAmt = dDisAmt1;
                }


                bApplied = true;

                if (Ti.App.COMMON.CheckBooleanField(Ti.App.ARRAYOPERATION.getSystemValue('MultiInvoicePromotion'))) { // Multiple Promotion Apply for Invoice Promotion Discount Amount should be added. Discount Percentage will be overwrite by the Grater Percentage
                    //if (Ti.App.COMMON.CheckBooleanField(Ti.App.ARRAYOPERATION.getSystemValue('PrmotionByEvent'))) {
                    sEvent = ipdDet.Event;
                    //}
                    continue NextRecord;
                } else {
                    break NextRecord;
                }

            } catch (e) {
                //Ti.App.COMMON.Log('6449 Error ' + e);
                //alert(e);
            }
        }

    return resObj;
}