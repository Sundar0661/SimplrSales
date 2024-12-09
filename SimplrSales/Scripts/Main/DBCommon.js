
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


function CheckInvoicePromotion1(dAmt) {

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
                var bFoc
mo = false;
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
                        //ddmmyyyy
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
                            //dbCommonObj.dbDataRows1 = db.execute("Select (isnull(InvD.InvQty,0)  + isnull(TmpQty,0)) as Qty, (isnull(InvD.InvAmt,0)  + isnull(TmpAmt,0)) as amount from Category LEFT JOIN (Select Products.CategoryID, TempOrderDet.UOM, SUM(isnull(TempOrderDet.price,0) * isnull(TempOrderDet.Qty,0)) as TmpAmt, SUM(TempOrderDet.Qty) as TmpQty  from TempOrderDet INNER JOIN Products ON Products.ItemId = TempOrderDet.ItemId and Products.CategoryID = " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('ItemId')) + " WHERE TempOrderDet.SalesType = 'S' and  CASE WHEN (" + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) + " = '' OR " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) + " = 'INVOICE') THEN  CASE WHEN isnull(TempOrderDet.Priority, 999) <> '' THEN isnull(TempOrderDet.Priority, 999) > cast(" + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('Priority')) + " as int) ELSE 1=1 END END GROUP BY Products.CategoryID, TempOrderDet.UOM) Tmp ON Tmp.CategoryID = Category.CategoryId and Tmp.UOM = " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('UOM')) + "  LEFT JOIN (Select Products.CategoryID, InvDet.UOM, SUM(InvDet.AMOUNT) as InvAmt, SUM(InvDet.Qty) as InvQty  from InvDet INNER JOIN Products ON Products.ItemId = InvDet.ItemId and Products.CategoryID = " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('ItemId')) + " INNER JOIN Invoices ON Invoices.InvNo = InvDet.InvNo where InvDet.SalesType = 'S' and CustNo = " + Ti.App.SQL.safeSQL(Ti.App.CustNo) + " and void = 0 and CASE WHEN " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) + " = 'Year' THEN InvDt > FORMAT( DATEADD(yy, DATEDIFF(yy, 0, GETDATE()), 0) ,'yyyy-MM-dd') ELSE CASE WHEN " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) + " = 'Month' THEN InvDt > Format(DATEADD(m, DATEDIFF(m, 0, GETDATE()), 0) ,'yyyy-MM-dd') ELSE CASE WHEN " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) + " = 'Day' THEN date(InvDt) >= Format(DATEADD(d, DATEDIFF(d, 0, GETDATE()), 0) ,'yyyy-MM-dd')  ELSE 1=0 END END END Group by Products.CategoryID, InvDet.UOM)InvD ON InvD.CategoryID = Category.CategoryId and InvD.UOM = " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('UOM')) + " WHERE isnull(Qty,0) > 0 and Category.CategoryId =" + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('ItemId')));
                            qry1 = "Select (isnull(InvD.InvQty,0)  + isnull(TmpQty,0)) as Qty, (isnull(InvD.InvAmt,0)  + isnull(TmpAmt,0)) as amount from Category LEFT JOIN (Select Products.CategoryID, TempOrderDet.UOM, SUM(isnull(TempOrderDet.price,0) * isnull(TempOrderDet.Qty,0)) as TmpAmt, SUM(TempOrderDet.Qty) as TmpQty  from TempOrderDet INNER JOIN Products ON Products.ItemId = TempOrderDet.ItemId and Products.CategoryID = " + safeSQL(dbDataRows[n].ItemId) + " WHERE TempOrderDet.SalesType = 'S' and  CASE WHEN (" + safeSQL(dbDataRows[n].GroupPromo) + " = '' OR " + safeSQL(dbDataRows[n].GroupPromo) + " = 'INVOICE') THEN  CASE WHEN isnull(TempOrderDet.Priority, 999) <> '' THEN isnull(TempOrderDet.Priority, 999) > cast(" + safeSQL(dbDataRows[n].Priority) + " as int) ELSE 1=1 END END GROUP BY Products.CategoryID, TempOrderDet.UOM) Tmp ON Tmp.CategoryID = Category.CategoryId and Tmp.UOM = " + safeSQL(dbDataRows[n].UOM) + "  LEFT JOIN (Select Products.CategoryID, InvDet.UOM, SUM(InvDet.AMOUNT) as InvAmt, SUM(InvDet.Qty) as InvQty  from InvDet INNER JOIN Products ON Products.ItemId = InvDet.ItemId and Products.CategoryID = " + safeSQL(dbDataRows[n].ItemId) + " INNER JOIN Invoices ON Invoices.InvNo = InvDet.InvNo where InvDet.SalesType = 'S' and CustNo = {FormView.CustId} and void = 0 and CASE WHEN " + safeSQL(dbDataRows[n].GroupPromo) + " = 'Year' THEN InvDt > FORMAT( DATEADD(yy, DATEDIFF(yy, 0, GETDATE()), 0) ,'yyyy-MM-dd') ELSE CASE WHEN " + safeSQL(dbDataRows[n].GroupPromo) + " = 'Month' THEN InvDt > Format(DATEADD(m, DATEDIFF(m, 0, GETDATE()), 0) ,'yyyy-MM-dd') ELSE CASE WHEN " + safeSQL(dbDataRows[n].GroupPromo) + " = 'Day' THEN date(InvDt) >= Format(DATEADD(d, DATEDIFF(d, 0, GETDATE()), 0) ,'yyyy-MM-dd')  ELSE 1=0 END END END Group by Products.CategoryID, InvDet.UOM)InvD ON InvD.CategoryID = Category.CategoryId and InvD.UOM = " + safeSQL(dbDataRows[n].UOM) + " WHERE isnull(Qty,0) > 0 and Category.CategoryId =" + safeSQL(dbDataRows[n].ItemId);
                            //dbCommonObj.dbDataRows1 = db.execute(qry1);
                            qry = formatQueryString(qry1, "");
                            execute(qry);
                            dbCommonObj.dbDataRows1 = executeQry;
                            for (var nn = 0; nn < dbCommonObj.dbDataRows1.length; nn++) {
                                //while (dbCommonObj.dbDataRows1.isValidRow()) {

                                //if (dbDataRows[n].MinQty  > Ti.App.ARRAYOPERATION.getColumnData(0,iCnt,"Qty") || dbDataRows[n].MaxQty  < Ti.App.ARRAYOPERATION.getColumnData(0,iCnt,"Qty")) {
                                if (dbDataRows[n].MinQty > dbCommonObj.dbDataRows1[nn].Qty || dbDataRows[n].MaxQty < dbCommonObj.dbDataRows1[nn].Qty || dbDataRows[n].MinAmt > dbCommonObj.dbDataRows1[nn].amount) {
                                    if (bConditionPromo != true) {
                                        bCondition = false;
                                    }

                                    _obj = {};
                                    _obj.PromoId = dbDataRows[n].PromoId;
                                    _obj.MinQty = dbDataRows[n].MinQty;
                                    _obj.Priority = dbDataRows[n].Priority;
                                    _obj.Entitle = dbDataRows[n].Entitle;
                                    _obj.EntitleType = dbDataRows[n].EntitleType;
                                    //dbCommonObj.arrPromoList.push(_obj);
                                    arrPromoList.push(_obj)
                                    dbCommonObj.arrPromoList = arrPromoList;

                                    break While1;
                                } else {

                                    if (bMultiply == true) {
                                        iMulti = Math.floor(dbCommonObj.dbDataRows1[nn].Qty / dbDataRows[n].MinQty);
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
                            //if (getSystemValue('InvoicePromoGroupSkipUOMCheck')) {
                            //    var sPromoConditionQry = "Select  isnull(InvD.InvQty,0)  + isnull(Tmp.TmpQty,0) as Qty, (isnull(InvD.InvAmt,0)  + isnull(Tmp.TmpAmt,0)) as amount from PromoGroup LEFT JOIN (Select PromoGroup.GroupId, TempOrderDet.UOM, SUM(isnull(TempOrderDet.price,0) * isnull(TempOrderDet.Qty,0)) as TmpAmt, SUM(TempOrderDet.Qty) as TmpQty  from TempOrderDet INNER JOIN PromoGroup ON PromoGroup.ItemId = TempOrderDet.ItemId and PromoGroup.GroupId =" + safeSQL(dbDataRows[o].ItemId) + " WHERE TempOrderDet.SalesType = 'S' and CASE WHEN (" + safeSQL(dbDataRows[o].GroupPromo) + " = '' OR " + safeSQL(dbDataRows[o].GroupPromo) + " = 'INVOICE') THEN 1=1 END GROUP BY PromoGroup.GroupId) Tmp ON PromoGroup.GroupId = Tmp.GroupId   LEFT JOIN (Select PromoGroup.GroupId, InvDet.UOM, SUM(InvDet.AMOUNT) as InvAmt, SUM(InvDet.Qty) as InvQty  from InvDet INNER JOIN PromoGroup ON PromoGroup.ItemId = InvDet.ItemId and PromoGroup.GroupId =" + safeSQL(dbDataRows[o].ItemId) + " INNER JOIN Invoices ON Invoices.InvNo = InvDet.InvNo where InvDet.SalesType = 'S' and CustNo = {FormView.CustId} and void = 0 and CASE WHEN " + safeSQL(dbDataRows[o].GroupPromo) + " = 'Year' THEN InvDt > FORMAT( DATEADD(yy, DATEDIFF(yy, 0, GETDATE()), 0) ,'yyyy-MM-dd') ELSE CASE WHEN " + safeSQL(dbDataRows[o].GroupPromo) + " = 'Month' THEN InvDt > Format(DATEADD(m, DATEDIFF(m, 0, GETDATE()), 0) ,'yyyy-MM-dd') ELSE CASE WHEN " + safeSQL(dbDataRows[o].GroupPromo) + " = 'Day' THEN date(InvDt) >= Format(DATEADD(d, DATEDIFF(d, 0, GETDATE()), 0) ,'yyyy-MM-dd')  ELSE 1=0 END END END Group by PromoGroup.GroupId)InvD ON InvD.GroupId = PromoGroup.GroupId  WHERE isnull(Qty,0) > 0 and PromoGroup.GroupId =" + safeSQL(dbDataRows[o].ItemId);

                            //} else {
                            //    var sPromoConditionQry = "Select isnull(InvD.InvQty,0)  + isnull(Tmp.TmpQty,0) as Qty, (isnull(InvD.InvAmt,0)  + isnull(Tmp.TmpAmt,0)) as amount from PromoGroup LEFT JOIN (Select PromoGroup.GroupId, TempOrderDet.UOM, SUM(isnull(TempOrderDet.price,0) * isnull(TempOrderDet.Qty,0)) as TmpAmt, SUM(TempOrderDet.Qty) as TmpQty  from TempOrderDet INNER JOIN PromoGroup ON PromoGroup.ItemId = TempOrderDet.ItemId and PromoGroup.GroupId =" + safeSQL(dbDataRows[o].ItemId) + " WHERE TempOrderDet.SalesType = 'S' and CASE WHEN (" + safeSQL(dbDataRows[o].GroupPromo) + " = '' OR " + safeSQL(dbDataRows[o].GroupPromo) + " = 'INVOICE') THEN 1=1 END GROUP BY PromoGroup.GroupId, TempOrderDet.UOM) Tmp ON PromoGroup.GroupId = Tmp.GroupId and Tmp.UOM = " + safeSQL(dbDataRows[o].UOM) + "  LEFT JOIN (Select PromoGroup.GroupId, InvDet.UOM, SUM(InvDet.AMOUNT) as InvAmt, SUM(InvDet.Qty) as InvQty  from InvDet INNER JOIN PromoGroup ON PromoGroup.ItemId = InvDet.ItemId and PromoGroup.GroupId =" + safeSQL(dbDataRows[o].ItemId) + " INNER JOIN Invoices ON Invoices.InvNo = InvDet.InvNo where InvDet.SalesType = 'S' and CustNo =  {FormView.CustId}  and void = 0 and CASE WHEN " + safeSQL(dbDataRows[o].GroupPromo) + " = 'Year' THEN InvDt > FORMAT( DATEADD(yy, DATEDIFF(yy, 0, GETDATE()), 0) ,'yyyy-MM-dd') ELSE CASE WHEN " + safeSQL(dbDataRows[o].GroupPromo) + " = 'Month' THEN InvDt > Format(DATEADD(m, DATEDIFF(m, 0, GETDATE()), 0) ,'yyyy-MM-dd') ELSE CASE WHEN " + safeSQL(dbDataRows[o].GroupPromo) + " = 'Day' THEN date(InvDt) >= Format(DATEADD(d, DATEDIFF(d, 0, GETDATE()), 0) ,'yyyy-MM-dd')  ELSE 1=0 END END END Group by PromoGroup.GroupId, InvDet.UOM)InvD ON InvD.GroupId = PromoGroup.GroupId and InvD.UOM = " + safeSQL(dbDataRows[o].UOM) + "  WHERE isnull(Qty,0) > 0 and PromoGroup.GroupId =" + safeSQL(dbDataRows[o].ItemId);
                            //}

                            //if (dbDataRows[o].MaxQty == 0) {
                            //    sPromoConditionQry = "Select isnull(InvD.InvQty,0)  + isnull(Tmp.TmpQty,0) as Qty, (isnull(InvD.InvAmt,0)  + isnull(Tmp.TmpAmt,0)) as amount from PromoGroup LEFT JOIN (Select PromoGroup.GroupId, TempOrderDet.UOM, SUM(isnull(TempOrderDet.price,0) * isnull(TempOrderDet.Qty,0)) as TmpAmt, SUM(TempOrderDet.Qty) as TmpQty  from TempOrderDet INNER JOIN PromoGroup ON PromoGroup.ItemId = TempOrderDet.ItemId and PromoGroup.GroupId =" + safeSQL(dbDataRows[o].ItemId) + " WHERE TempOrderDet.SalesType = 'S' and CASE WHEN (" + safeSQL(dbDataRows[o].GroupPromo) + " = '' OR " + safeSQL(dbDataRows[o].GroupPromo) + " = 'INVOICE') THEN 1=1 END GROUP BY PromoGroup.GroupId, TempOrderDet.UOM) Tmp ON PromoGroup.GroupId = Tmp.GroupId LEFT JOIN (Select PromoGroup.GroupId, InvDet.UOM, SUM(InvDet.AMOUNT) as InvAmt, SUM(InvDet.Qty) as InvQty  from InvDet INNER JOIN PromoGroup ON PromoGroup.ItemId = InvDet.ItemId and PromoGroup.GroupId =" + safeSQL(dbDataRows[o].ItemId) + " INNER JOIN Invoices ON Invoices.InvNo = InvDet.InvNo where InvDet.SalesType = 'S' and CustNo =  {FormView.CustId}  and void = 0 and CASE WHEN " + safeSQL(dbDataRows[o].GroupPromo) + " = 'Year' THEN InvDt > FORMAT( DATEADD(yy, DATEDIFF(yy, 0, GETDATE()), 0) ,'yyyy-MM-dd') ELSE CASE WHEN " + safeSQL(dbDataRows[o].GroupPromo) + " = 'Month' THEN InvDt > Format(DATEADD(m, DATEDIFF(m, 0, GETDATE()), 0) ,'yyyy-MM-dd') ELSE CASE WHEN " + safeSQL(dbDataRows[o].GroupPromo) + " = 'Day' THEN date(InvDt) >= Format(DATEADD(d, DATEDIFF(d, 0, GETDATE()), 0) ,'yyyy-MM-dd')  ELSE 1=0 END END END Group by PromoGroup.GroupId, InvDet.UOM)InvD ON InvD.GroupId = PromoGroup.GroupId WHERE isnull(Qty,0) > 0 and PromoGroup.GroupId =" + safeSQL(dbDataRows[o].ItemId);
                            //}

                            if (getSystemValue('InvoicePromoGroupSkipUOMCheck')) {
                                //var sPromoConditionQry = "Select  isnull(InvD.InvQty,0)  + isnull(Tmp.TmpQty,0) as Qty, (isnull(InvD.InvAmt,0)  + isnull(Tmp.TmpAmt,0)) as amount from PromoGroup LEFT JOIN (Select PromoGroup.GroupId, TempOrderDet.UOM, SUM(isnull(TempOrderDet.price,0) * isnull(TempOrderDet.Qty,0)) as TmpAmt, SUM(TempOrderDet.Qty) as TmpQty  from TempOrderDet INNER JOIN PromoGroup ON PromoGroup.ItemId = TempOrderDet.ItemId and PromoGroup.GroupId =" + safeSQL(dbDataRows[o].ItemId) + " WHERE TempOrderDet.SalesType = 'S'    and CASE WHEN (" + safeSQL(dbDataRows[o].GroupPromo) + " = '' OR " + safeSQL(dbDataRows[o].GroupPromo) + " = 'INVOICE') THEN 1=1 END    GROUP BY PromoGroup.GroupId)                  Tmp ON PromoGroup.GroupId = Tmp.GroupId   LEFT JOIN (Select PromoGroup.GroupId, invitem.UOM, SUM(InvDet.AMOUNT) as  InvAmt, SUM(InvDet.Qty) as InvQty   from InvDet INNER JOIN PromoGroup  ON PromoGroup.ItemId = InvDet.ItemId and PromoGroup.GroupId =" + safeSQL(dbDataRows[o].ItemId) + "  INNER JOIN Invoices ON Invoices.InvNo = InvDet.InvNo  where InvDet.SalesType = 'S' and CustNo  = {FormView.CustId} and void = 0   and CASE WHEN " + safeSQL(dbDataRows[o].GroupPromo) + " = 'Year' THEN InvDt > FORMAT( DATEADD(yy, DATEDIFF(yy, 0, GETDATE()), 0) ,'yyyy-MM-dd') ELSE CASE WHEN " + safeSQL(dbDataRows[o].GroupPromo) + " = 'Month' THEN InvDt > Format(DATEADD(m, DATEDIFF(m, 0, GETDATE()), 0) ,'yyyy-MM-dd') ELSE CASE WHEN " + safeSQL(dbDataRows[o].GroupPromo) + " = 'Day' THEN date(InvDt) >= Format(DATEADD(d, DATEDIFF(d, 0, GETDATE()), 0) ,'yyyy-MM-dd')  ELSE 1=0 END END END       Group by PromoGroup.GroupId)InvD ON InvD.GroupId = PromoGroup.GroupId  WHERE isnull(Qty,0) > 0 and PromoGroup.GroupId =" + safeSQL(dbDataRows[o].ItemId);
                                var sPromoConditionQry = "Select  isnull(InvD.InvQty,0)  + isnull(Tmp.TmpQty,0) as Qty, (isnull(InvD.InvAmt,0)  + isnull(Tmp.TmpAmt,0)) as amount from PromoGroup LEFT JOIN (Select PromoGroup.GroupId, TempOrderDet.UOM, SUM(isnull(TempOrderDet.price,0) * isnull(TempOrderDet.Qty,0)) as TmpAmt, SUM(TempOrderDet.Qty) as TmpQty  from TempOrderDet INNER JOIN PromoGroup ON PromoGroup.ItemId = TempOrderDet.ItemId and PromoGroup.GroupId =" + safeSQL(dbDataRows[o].ItemId) + " WHERE TempOrderDet.SalesType = 'S'  /*and CASE WHEN (" + safeSQL(dbDataRows[o].GroupPromo) + " = '' OR " + safeSQL(dbDataRows[o].GroupPromo) + " = 'INVOICE') THEN 1=1 END*/  GROUP BY PromoGroup.GroupId,TempOrderDet.UOM) Tmp ON PromoGroup.GroupId = Tmp.GroupId   LEFT JOIN (Select PromoGroup.GroupId, invitem.UOM, SUM(invitem.SubAmt) as InvAmt, SUM(invitem.Qty) as InvQty  from invitem INNER JOIN PromoGroup ON PromoGroup.ItemId = invitem.ItemNo and PromoGroup.GroupId =" + safeSQL(dbDataRows[o].ItemId) + " INNER JOIN Invoice  ON Invoice.InvNo  = invitem.InvNo where invitem.SalesType = 'S' and custid = {FormView.CustId} and void = 0 /*and CASE WHEN " + safeSQL(dbDataRows[o].GroupPromo) + " = 'Year' THEN InvDt > FORMAT( DATEADD(yy, DATEDIFF(yy, 0, GETDATE()), 0) ,'yyyy-MM-dd') ELSE CASE WHEN " + safeSQL(dbDataRows[o].GroupPromo) + " = 'Month' THEN InvDt > Format(DATEADD(m, DATEDIFF(m, 0, GETDATE()), 0) ,'yyyy-MM-dd') ELSE CASE WHEN " + safeSQL(dbDataRows[o].GroupPromo) + " = 'Day' THEN date(InvDt) >= Format(DATEADD(d, DATEDIFF(d, 0, GETDATE()), 0) ,'yyyy-MM-dd')   ELSE 1=0 END END END 8*/  Group by PromoGroup.GroupId, invitem.UOM)InvD ON InvD.GroupId = PromoGroup.GroupId  WHERE isnull(TmpQty,0) > 0 and PromoGroup.GroupId =" + safeSQL(dbDataRows[o].ItemId);


                            } else {
                                //var sPromoConditionQry = "Select isnull(InvD.InvQty,0)  + isnull(Tmp.TmpQty,0) as Qty, (isnull(InvD.InvAmt,0)  + isnull(Tmp.TmpAmt,0)) as amount from PromoGroup LEFT JOIN (Select PromoGroup.GroupId, TempOrderDet.UOM, SUM(isnull(TempOrderDet.price,0) * isnull(TempOrderDet.Qty,0)) as TmpAmt, SUM(TempOrderDet.Qty) as TmpQty  from TempOrderDet INNER JOIN PromoGroup ON PromoGroup.ItemId = TempOrderDet.ItemId and PromoGroup.GroupId =" + safeSQL(dbDataRows[o].ItemId) + " WHERE TempOrderDet.SalesType = 'S'   and CASE WHEN (" + safeSQL(dbDataRows[o].GroupPromo) + " = '' OR " + safeSQL(dbDataRows[o].GroupPromo) + " = 'INVOICE') THEN 1=1 END     GROUP BY PromoGroup.GroupId, TempOrderDet.UOM) Tmp ON PromoGroup.GroupId = Tmp.GroupId and Tmp.UOM = " + safeSQL(dbDataRows[o].UOM) + "  LEFT JOIN (Select PromoGroup.GroupId, invitem.UOM, SUM(invitem.AMOUNT) as InvAmt, SUM(invitem.Qty) as InvQty  from invitem INNER JOIN PromoGroup ON PromoGroup.ItemId = invitem.ItemId and PromoGroup.GroupId =" + safeSQL(dbDataRows[o].ItemId) + " INNER JOIN Invoices ON Invoices.InvNo = invitem.InvNo where invitem.SalesType = 'S' and CustNo =  {FormView.CustId}  and void = 0    and CASE WHEN " + safeSQL(dbDataRows[o].GroupPromo) + " = 'Year' THEN InvDt > FORMAT( DATEADD(yy, DATEDIFF(yy, 0, GETDATE()), 0) ,'yyyy-MM-dd') ELSE CASE WHEN " + safeSQL(dbDataRows[o].GroupPromo) + " = 'Month' THEN InvDt > Format(DATEADD(m, DATEDIFF(m, 0, GETDATE()), 0) ,'yyyy-MM-dd') ELSE CASE WHEN " + safeSQL(dbDataRows[o].GroupPromo) + " = 'Day' THEN date(InvDt) >= Format(DATEADD(d, DATEDIFF(d, 0, GETDATE()), 0) ,'yyyy-MM-dd')  ELSE 1=0 END END END      Group by PromoGroup.GroupId, InvDet.UOM)InvD ON InvD.GroupId = PromoGroup.GroupId and InvD.UOM =  " + safeSQL(dbDataRows[o].UOM) + "  WHERE isnull(Qty,0) > 0 and PromoGroup.GroupId =" + safeSQL(dbDataRows[o].ItemId);
                                var sPromoConditionQry = "Select isnull(InvD.InvQty,0)  + isnull(Tmp.TmpQty,0) as Qty, (isnull(InvD.InvAmt,0)  + isnull(Tmp.TmpAmt,0)) as amount from PromoGroup LEFT JOIN (Select PromoGroup.GroupId, TempOrderDet.UOM, SUM(isnull(TempOrderDet.price,0) * isnull(TempOrderDet.Qty,0)) as TmpAmt, SUM(TempOrderDet.Qty) as TmpQty  from TempOrderDet INNER JOIN PromoGroup ON PromoGroup.ItemId = TempOrderDet.ItemId and PromoGroup.GroupId =" + safeSQL(dbDataRows[o].ItemId) + " WHERE TempOrderDet.SalesType = 'S' /*and CASE WHEN (" + safeSQL(dbDataRows[o].GroupPromo) + " = '' OR " + safeSQL(dbDataRows[o].GroupPromo) + " = 'INVOICE') THEN 1=1 END */  GROUP BY PromoGroup.GroupId, TempOrderDet.UOM) Tmp ON PromoGroup.GroupId = Tmp.GroupId and Tmp.UOM = " + safeSQL(dbDataRows[o].UOM) + "  LEFT JOIN (Select PromoGroup.GroupId, invitem.UOM, SUM(invitem.SubAmt) as InvAmt, SUM(invitem.Qty) as InvQty  from invitem INNER JOIN PromoGroup ON PromoGroup.ItemId = invitem.itemno and PromoGroup.GroupId =" + safeSQL(dbDataRows[o].ItemId) + " INNER JOIN invoice  ON invoice.InvNo  = invitem.InvNo where invitem.SalesType = 'S' and custid =  {FormView.CustId}  and void = 0  /*and CASE WHEN " + safeSQL(dbDataRows[o].GroupPromo) + " = 'Year' THEN InvDt > FORMAT( DATEADD(yy, DATEDIFF(yy, 0, GETDATE()), 0) ,'yyyy-MM-dd') ELSE CASE WHEN " + safeSQL(dbDataRows[o].GroupPromo) + " = 'Month' THEN InvDt > Format(DATEADD(m, DATEDIFF(m, 0, GETDATE()), 0) ,'yyyy-MM-dd') ELSE CASE WHEN " + safeSQL(dbDataRows[o].GroupPromo) + " = 'Day' THEN date(InvDt) >= Format(DATEADD(d, DATEDIFF(d, 0, GETDATE()), 0) ,'yyyy-MM-dd')  ELSE 1=0 END END END */   Group by PromoGroup.GroupId, invitem.UOM)InvD ON InvD.GroupId = PromoGroup.GroupId and InvD.UOM = " + safeSQL(dbDataRows[o].UOM) + "  WHERE isnull(TmpAmt,0) > 0 and PromoGroup.GroupId  =" + safeSQL(dbDataRows[o].ItemId);

                            }

                            if (dbDataRows[o].MaxQty == 0) {
                                //sPromoConditionQry = "Select isnull(InvD.InvQty,0)  + isnull(Tmp.TmpQty,0) as Qty, (isnull(InvD.InvAmt,0)  + isnull(Tmp.TmpAmt,0)) as amount from PromoGroup LEFT JOIN (Select PromoGroup.GroupId, TempOrderDet.UOM, SUM(isnull(TempOrderDet.price,0) * isnull(TempOrderDet.Qty,0)) as TmpAmt, SUM(TempOrderDet.Qty) as TmpQty  from TempOrderDet INNER JOIN PromoGroup ON PromoGroup.ItemId = TempOrderDet.ItemId and PromoGroup.GroupId =" + safeSQL(dbDataRows[o].ItemId) + " WHERE TempOrderDet.SalesType = 'S'      and CASE WHEN (" + safeSQL(dbDataRows[o].GroupPromo) + " = '' OR " + safeSQL(dbDataRows[o].GroupPromo) + " = 'INVOICE') THEN 1=1 END     GROUP BY PromoGroup.GroupId, TempOrderDet.UOM) Tmp ON PromoGroup.GroupId = Tmp.GroupId LEFT JOIN (Select PromoGroup.GroupId, InvDet.UOM, SUM(InvDet.AMOUNT) as InvAmt, SUM(InvDet.Qty) as InvQty     from InvDet INNER JOIN PromoGroup ON PromoGroup.ItemId = InvDet.ItemId and PromoGroup.GroupId =" + safeSQL(dbDataRows[o].ItemId) + "    INNER JOIN Invoices ON Invoices.InvNo = InvDet.InvNo where InvDet.SalesType = 'S' and CustNo =  {FormView.CustId}  and void = 0 and CASE WHEN " + safeSQL(dbDataRows[o].GroupPromo) + " = 'Year'             THEN InvDt > FORMAT( DATEADD(yy, DATEDIFF(yy, 0, GETDATE()), 0) ,'yyyy-MM-dd') ELSE CASE WHEN " + safeSQL(dbDataRows[o].GroupPromo) + " = 'Month' THEN InvDt > Format(DATEADD(m, DATEDIFF(m, 0, GETDATE()), 0) ,'yyyy-MM-dd') ELSE CASE WHEN " + safeSQL(dbDataRows[o].GroupPromo) + " = 'Day' THEN date(InvDt) >= Format(DATEADD(d, DATEDIFF(d, 0, GETDATE()), 0) ,'yyyy-MM-dd')  ELSE 1=0 END END END    Group by PromoGroup.GroupId, InvDet.UOM)InvD  ON InvD.GroupId = PromoGroup.GroupId WHERE isnull(Qty,0) > 0 and PromoGroup.GroupId =" + safeSQL(dbDataRows[o].ItemId);
                                sPromoConditionQry = "Select isnull(InvD.InvQty,0)  + isnull(Tmp.TmpQty,0) as Qty, (isnull(InvD.InvAmt,0)  + isnull(Tmp.TmpAmt,0)) as amount from PromoGroup LEFT JOIN (Select PromoGroup.GroupId, TempOrderDet.UOM, SUM(isnull(TempOrderDet.price,0) * isnull(TempOrderDet.Qty,0)) as TmpAmt, SUM(TempOrderDet.Qty) as TmpQty  from TempOrderDet INNER JOIN PromoGroup ON PromoGroup.ItemId = TempOrderDet.ItemId and PromoGroup.GroupId =" + safeSQL(dbDataRows[o].ItemId) + " WHERE TempOrderDet.SalesType = 'S'  /*  and CASE WHEN (" + safeSQL(dbDataRows[o].GroupPromo) + " = '' OR " + safeSQL(dbDataRows[o].GroupPromo) + " = 'INVOICE') THEN 1=1 END */  GROUP BY PromoGroup.GroupId, TempOrderDet.UOM) Tmp ON PromoGroup.GroupId = Tmp.GroupId LEFT JOIN (Select PromoGroup.GroupId, invitem.UOM, SUM(invitem.SubAmt) as InvAmt, SUM(invitem.Qty) as InvQty  from invitem INNER JOIN PromoGroup ON PromoGroup.ItemId = invitem.ItemNo  and PromoGroup.GroupId =" + safeSQL(dbDataRows[o].ItemId) + " INNER JOIN Invoice ON Invoice.InvNo = invitem.InvNo	   where invitem.SalesType = 'S' and custid = {FormView.CustId}  and void = 0	 /*   and CASE WHEN  " + safeSQL(dbDataRows[o].GroupPromo) + " = 'Year' THEN InvDt > FORMAT( DATEADD(yy, DATEDIFF(yy, 0, GETDATE()), 0) ,'yyyy-MM-dd') ELSE CASE WHEN " + safeSQL(dbDataRows[o].GroupPromo) + " = 'Month' THEN InvDt > Format(DATEADD(m, DATEDIFF(m, 0, GETDATE()), 0) ,'yyyy-MM-dd') ELSE CASE WHEN " + safeSQL(dbDataRows[o].GroupPromo) + " = 'Day' THEN date(InvDt) >= Format(DATEADD(d, DATEDIFF(d, 0, GETDATE()), 0) ,'yyyy-MM-dd')  ELSE 1=0 END END END */ Group by PromoGroup.GroupId, invitem.UOM)InvD ON InvD.GroupId = PromoGroup.GroupId WHERE isnull(TmpQty,0) > 0 and PromoGroup.GroupId =" + safeSQL(dbDataRows[o].ItemId);
                            }
                            //change query - above 3 querys
                            sPromoConditionQry = formatQueryString(sPromoConditionQry, "");
                            execute(sPromoConditionQry);
                            dbCommonObj.dbDataRows1 = executeQry;
                            //var arrPromoList = [];
                            for (var p = 0; p < dbCommonObj.dbDataRows1.length; p++) {

                                //
                                //dbCommonObj.dbDataRows1 = db.execute(sPromoConditionQry);
                                //while (dbCommonObj.dbDataRows1.isValidRow()) {
                                if (dbDataRows[o].MinQty > dbCommonObj.dbDataRows1[p].Qty || dbDataRows[o].MaxQty < dbCommonObj.dbDataRows1[p].Qty || dbDataRows[o].MinAmt > dbCommonObj.dbDataRows1[p].amount) {

                                    if (bConditionPromo != true) {
                                        bCondition = false;
                                    }

                                    _obj = {};
                                    _obj.PromoId = dbDataRows[o].PromoId;
                                    _obj.MinQty = dbDataRows[o].MinQty;
                                    _obj.Priority = dbDataRows[o].Priority;
                                    _obj.Entitle = dbDataRows[o].Entitle;
                                    _obj.EntitleType = dbDataRows[o].EntitleType;
                                    //dbCommonObj.arrPromoList.push(_obj);
                                    arrPromoList.push(_obj)
                                    dbCommonObj.arrPromoList = arrPromoList;

                                    break While1;
                                } else {
                                    if (bMultiply == true) {
                                        iMulti = Math.floor(dbCommonObj.dbDataRows1[p].Qty / dbDataRows[o].MinQty);
                                        iMultiCnt = iMulti;

                                        if (dLastMultiCnt < 0 || (dLastMultiCnt != iMultiCnt && dLastMultiCnt > iMultiCnt)) {
                                            dLastMultiCnt = iMultiCnt;
                                        }
                                    }
                                    // Ti.API.info("bCondition1 " + bCondition);
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

                //todo by.M
                //if ((bPromoGroupPromo == true && bCondition == false)) {
                //    continue NextRecord;
                //}

                //CheckBrand

                /*Included  PromoGroup, Promotion -> GroupPromo (Invoice, Day, Month, Year)
                 * Changed on 04 Aug 2020 
                 * Changed by Sattam/Ram 
                 */
                var bBrandPromo = false;

                try {
                    //var qry1 = "Select Promotion.PromoId, Promotion.PromoName, Priority, PromoCondition.ItemId, PromoCondition.UOM, MinQty, MaxQty, PromoCondition.MinAmt, isnull(GroupPromo,'') as GroupPromo from PromoCondition INNER JOIN Promotion ON Promotion.PromoId = PromoCondition.PromoId where Promotion.PromoId = PromoCondition.PromoId and lower(PromoCondition.LineType) = lower('Brand') and Promotion.PromoId = '" + ipdDet.PromoId + "'";
                    var qry1 = "Select Promotion.PromoId, Promotion.PromoName, Priority, PromoCondition.ItemId, PromoCondition.UOM, MinQty, MaxQty, PromoCondition.MinAmt, isnull('','') as GroupPromo from PromoCondition INNER JOIN Promotion ON Promotion.PromoId = PromoCondition.PromoId where Promotion.PromoId = PromoCondition.PromoId and lower(PromoCondition.LineType) = lower('Brand') and Promotion.PromoId = '" + ipdDet.PromoId + "'";

                    qry1 = formatQueryString(qry1, "");
                    execute(qry1);
                    dbDataRows = executeQry;
                    While1:
                        for (var q = 0; q < dbDataRows.length; q++) {
                            //
                            //var dbDataRows = db.execute(qry1);
                            //While1:
                            //while (dbDataRows.isValidRow()) {
                            bBrandPromo = true;
                            if (bConditionPromo != true) {
                                bCondition = false;
                            }
                            qry = "Select isnull(InvD.InvQty,0)  + isnull(Tmp.TmpQty,0) as Qty, (isnull(InvD.InvAmt,0)  + isnull(Tmp.TmpAmt,0)) as amount from Brand  LEFT JOIN (Select Products.Brand, TempOrderDet.UOM, SUM(isnull(TempOrderDet.price,0) * isnull(TempOrderDet.Qty,0)) as TmpAmt, SUM(TempOrderDet.Qty) as TmpQty  from TempOrderDet INNER JOIN Products ON Products.ItemId = TempOrderDet.ItemId and Products.Brand =" + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('ItemId')) + " WHERE TempOrderDet.SalesType = 'S' and CASE WHEN (" + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) + " = '' OR " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) + " = 'INVOICE') THEN CASE WHEN isnull(TempOrderDet.Priority, 999) <> " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('Priority')) + " THEN isnull(TempOrderDet.Priority, 999) > 1 ELSE 1=1 END END GROUP BY Products.Brand, TempOrderDet.UOM)  Tmp ON Brand.Code = Tmp.Brand and Tmp.UOM = " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('UOM')) + "   LEFT JOIN (Select Products.Brand, InvDet.UOM, SUM(InvDet.AMOUNT) as InvAmt, SUM(InvDet.Qty) as InvQty  from InvDet INNER JOIN Products ON Products.ItemId = InvDet.ItemId and Products.Brand =" + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('ItemId')) + " INNER JOIN Invoices ON Invoices.InvNo = InvDet.InvNo where InvDet.SalesType = 'S' and CustNo =  {FormView.CustId}  and void = 0 and CASE WHEN " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) + " = 'Year' THEN InvDt > FORMAT( DATEADD(yy, DATEDIFF(yy, 0, GETDATE()), 0) ,'yyyy-MM-dd') ELSE CASE WHEN " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) + " = 'Month' THEN InvDt > Format(DATEADD(m, DATEDIFF(m, 0, GETDATE()), 0) ,'yyyy-MM-dd') ELSE CASE WHEN " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) + " = 'Day' THEN date(InvDt) >= Format(DATEADD(d, DATEDIFF(d, 0, GETDATE()), 0) ,'yyyy-MM-dd')  ELSE 1=0 END END END Group by Products.Brand, InvDet.UOM)  InvD ON InvD.Brand = Brand.Code and InvD.UOM = " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('UOM')) + "  WHERE isnull(Qty,0) > 0 and Brand.Code =" + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('ItemId'));
                            //dbCommonObj.dbDataRows1 = db.execute(qry);
                            //while (dbCommonObj.dbDataRows1.isValidRow()) {
                            execute(qry);
                            dbCommonObj.dbDataRows1 = executeQry;
                            for (var r = 0; r < dbCommonObj.dbDataRows1.length; r++) {
                                if (dbDataRows[q].MinQty > dbCommonObj.dbDataRows1[r].Qty || dbDataRows[q].MaxQty < dbCommonObj.dbDataRows1[r].Qty || dbDataRows[q].MinAmt > dbCommonObj.dbDataRows1[r].amount) {

                                    if (bConditionPromo != true) {
                                        bCondition = false;
                                    }

                                    _obj = {};
                                    _obj.PromoId = dbDataRows[q].PromoId;
                                    _obj.MinQty = dbDataRows[q].MinQty;
                                    _obj.Priority = dbDataRows[q].Priority;
                                    _obj.Entitle = dbDataRows[q].Entitle;
                                    _obj.EntitleType = dbDataRows[q].EntitleType;
                                    //dbCommonObj.arrPromoList.push(_obj);
                                    arrPromoList.push(_obj)
                                    dbCommonObj.arrPromoList = arrPromoList;

                                    break While1;
                                } else {
                                    if (bMultiply == true) {
                                        iMulti = Math.floor(dbCommonObj.dbDataRows1[r].Qty / dbDataRows[q].MinQty);
                                        iMultiCnt = iMulti;

                                        if (dLastMultiCnt < 0 || (dLastMultiCnt != iMultiCnt && dLastMultiCnt > iMultiCnt)) {
                                            dLastMultiCnt = iMultiCnt;
                                        }
                                    }
                                    bCondition = true;
                                    bConditionPromo = true;
                                }
                                //dbCommonObj.dbDataRows1.next();
                            }
                            //dbCommonObj.dbDataRows1.close();
                            //dbDataRows.next();
                        }
                    //dbDataRows.close();
                } catch (e) {
                    alert('Error brand  ---> ' + e);
                }
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
                                Ti.App.COMMON.Log("qry " + "Select isnull(InvD.InvQty,0)  + isnull(Tmp.TmpQty,0) as Qty, (isnull(InvD.InvAmt,0)  + isnull(Tmp.TmpAmt,0)) as amount from Model  LEFT JOIN (Select Products.Model, TempOrderDet.UOM, SUM(isnull(TempOrderDet.price,0) * isnull(TempOrderDet.Qty,0)) as TmpAmt, SUM(TempOrderDet.Qty) as TmpQty  from TempOrderDet INNER JOIN Products ON Products.ItemId = TempOrderDet.ItemId and Products.Model =" + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('ItemId')) + " WHERE TempOrderDet.SalesType = 'S' and CASE WHEN (" + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) + " = '' OR " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) + " = 'INVOICE') THEN CASE WHEN isnull(TempOrderDet.Priority, 999) <> " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('Priority')) + " THEN isnull(TempOrderDet.Priority, 999) > 1 ELSE 1=1 END END GROUP BY Products.Model, TempOrderDet.UOM)  Tmp ON Model.Code = Tmp.Model and Tmp.UOM = " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('UOM')) + "   LEFT JOIN (Select Products.Model, InvDet.UOM, SUM(InvDet.AMOUNT) as InvAmt, SUM(InvDet.Qty) as InvQty  from InvDet INNER JOIN Products ON Products.ItemId = InvDet.ItemId and Products.Model =" + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('ItemId')) + " INNER JOIN Invoices ON Invoices.InvNo = InvDet.InvNo where InvDet.SalesType = 'S' and CustNo =  {FormView.CustId}  and void = 0 and CASE WHEN " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) + " = 'Year' THEN InvDt > FORMAT( DATEADD(yy, DATEDIFF(yy, 0, GETDATE()), 0) ,'yyyy-MM-dd') ELSE CASE WHEN " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) + " = 'Month' THEN InvDt > Format(DATEADD(m, DATEDIFF(m, 0, GETDATE()), 0) ,'yyyy-MM-dd') ELSE CASE WHEN " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) + " = 'Day' THEN date(InvDt) >= Format(DATEADD(d, DATEDIFF(d, 0, GETDATE()), 0) ,'yyyy-MM-dd')  ELSE 1=0 END END END Group by Products.Model, InvDet.UOM)  InvD ON InvD.Model = Model.Code and InvD.UOM = " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('UOM')) + "  WHERE isnull(Qty,0) > 0 and Model.Code =" + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('ItemId')));
                                //dbCommonObj.dbDataRows1 = db.execute("Select (isnull(InvD.InvQty,0)  + isnull(TempOrderDet.Qty,0) as Qty, (isnull(InvD.InvAmt,0)  + isnull(TempOrderDet.amount,0)) as amount from Brand LEFT JOIN (Select Products.Brand, TempOrderDet.UOM, SUM(TempOrderDet.amount) as TmpAmt, SUM(TempOrderDet.Qty) as TmpQty  from TempOrderDet INNER JOIN Products ON Products.ItemId = TempOrderDet.ItemId and Products.Brand =" + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('ItemId')) +" WHERE TempOrderDet.SalesType = 'S' and CASE WHEN (" + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) +" = '' OR " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) +" = 'INVOICE') THEN CASE WHEN isnull(TempOrderDet.Priority, 999) <> '' THEN isnull(TempOrderDet.Priority, 999) > " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('Priority')) + " ELSE 1=1 END END GROUP BY Products.Brand, TempOrderDet.UOM) Tmp ON Brand.Code = Tmp.Brand and Tmp.UOM = " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('UOM')) +"  LEFT JOIN (Select Products.Brand, InvDet.UOM, SUM(InvDet.AMOUNT) as InvAmt, SUM(InvDet.Qty) as InvQty  from InvDet INNER JOIN Products ON Products.ItemId = InvDet.ItemId and Products.Brand =" + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('ItemId')) +" INNER JOIN Invoices ON Invoices.InvNo = InvDet.InvNo where InvDet.SalesType = 'S' and CustNo = " + Ti.App.SQL.safeSQL(Ti.App.CustNo) +" and void = 0 and CASE WHEN " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) +" = 'Year' THEN IndDt > FORMAT( DATEADD(yy, DATEDIFF(yy, 0, GETDATE()), 0) ,'yyyy-MM-dd') ELSE CASE WHEN " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) +" = 'Month' THEN IndDt > Format(DATEADD(m, DATEDIFF(m, 0, GETDATE()), 0) ,'yyyy-MM-dd') ELSE CASE WHEN " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) +" = 'Day' THEN date(IndDt) >= Format(DATEADD(d, DATEDIFF(d, 0, GETDATE()), 0) ,'yyyy-MM-dd')  ELSE 1=0 END END END Group by Products.Brand, InvDet.UOM)InvD ON InvD.Brand = Brand.Code and InvD.UOM = " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('UOM')) +" WHERE isnull(Qty,0) > 0 and Brand.Code =" + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('ItemId')));
                                dbCommonObj.dbDataRows1 = db.execute("Select isnull(InvD.InvQty,0)  + isnull(Tmp.TmpQty,0) as Qty, (isnull(InvD.InvAmt,0)  + isnull(Tmp.TmpAmt,0)) as amount from Model  LEFT JOIN (Select Products.Model, TempOrderDet.UOM, SUM(isnull(TempOrderDet.price,0) * isnull(TempOrderDet.Qty,0)) as TmpAmt, SUM(TempOrderDet.Qty) as TmpQty  from TempOrderDet INNER JOIN Products ON Products.ItemId = TempOrderDet.ItemId and Products.Model =" + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('ItemId')) + " WHERE TempOrderDet.SalesType = 'S' and CASE WHEN (" + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) + " = '' OR " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) + " = 'INVOICE') THEN CASE WHEN isnull(TempOrderDet.Priority, 999) <> " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('Priority')) + " THEN isnull(TempOrderDet.Priority, 999) > 1 ELSE 1=1 END END GROUP BY Products.Model, TempOrderDet.UOM)  Tmp ON Model.Code = Tmp.Model and Tmp.UOM = " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('UOM')) + "   LEFT JOIN (Select Products.Model, InvDet.UOM, SUM(InvDet.AMOUNT) as InvAmt, SUM(InvDet.Qty) as InvQty  from InvDet INNER JOIN Products ON Products.ItemId = InvDet.ItemId and Products.Model =" + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('ItemId')) + " INNER JOIN Invoices ON Invoices.InvNo = InvDet.InvNo where InvDet.SalesType = 'S' and CustNo =  {FormView.CustId}  and void = 0 and CASE WHEN " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) + " = 'Year' THEN InvDt > FORMAT( DATEADD(yy, DATEDIFF(yy, 0, GETDATE()), 0) ,'yyyy-MM-dd') ELSE CASE WHEN " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) + " = 'Month' THEN InvDt > Format(DATEADD(m, DATEDIFF(m, 0, GETDATE()), 0) ,'yyyy-MM-dd') ELSE CASE WHEN " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('GroupPromo')) + " = 'Day' THEN date(InvDt) >= Format(DATEADD(d, DATEDIFF(d, 0, GETDATE()), 0) ,'yyyy-MM-dd')  ELSE 1=0 END END END Group by Products.Model, InvDet.UOM)  InvD ON InvD.Model = Model.Code and InvD.UOM = " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('UOM')) + "  WHERE isnull(Qty,0) > 0 and Model.Code =" + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('ItemId')));
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

                iMultiCnt = dLastMultiCnt;
                if (iMultiCnt == -1) {
                    iMultiCnt = 1;
                }
                if (ipdDet.Entitle > 0) {
                    if (iPCount + iMultiCnt > ipdDet.Entitle) {
                        iMultiCnt = ipdDet.Entitle - iPCount;
                    }
                }
                var bFocPromo = false;
                try {
                    var bPromoGroup = false;
                    var bCatPromo = false;
                    var qry = "select distinct promooffer.Itemid from promogroup, promooffer where promooffer.Itemid = PromoGroup.GroupId and promoid = " + safeSQL(ipdDet.PromoId);
                    //  dbDataRows = db.execute(qry);
                    //while (dbDataRows.isValidRow()) {
                    qry = formatQueryString(qry, "");
                    execute(qry);
                    dbDataRows = executeQry;
                    for (var s = 0; s < dbDataRows.length; s++) {
                        bPromoGroup = true;
                        //dbDataRows.next();
                    }
                    //dbDataRows.close();

                    if (bPromoGroup == true || bCatPromo == true) {
                        sSelectedItem = '';
                        bCheckDataExists = false;
                        //if(this.CheckData("Select PromoOffer.FocQty, PromoOffer.ItemID from PromoOffer where PromoID = '" + stPromo.PromoId + "' and FocQty > 0")){
                        if (this.CheckData("Select PromoOffer.FocQty, PromoOffer.ItemID from PromoOffer where PromoID = " + safeSQL(ipdDet.PromoId) + "")) {

                            qry = "Select PromoGroup.ItemID,Products.UOM, Products.ShortDesc as [Description] from PromoGroup INNER JOIN Products ON PromoGroup.ItemID = Products.ItemID where PromoGroup.GroupID in (Select ItemID from PromoOffer where PromoID = " + safeSQL(ipdDet.PromoId) + ") order by Products.ItemID";
                            //dbDataRows = db.execute(qry);
                            //while (dbDataRows.isValidRow()) {
                            qry = formatQueryString(qry, "");
                            execute(qry);
                            dbDataRows = executeQry;
                            for (var s = 0; s < dbDataRows.length; s++) {
                                bCheckDataExists = true;
                                if (sSelectedItem == '') {
                                    sSelectedItem = "" + safeSQL(dbDataRows[s].ItemId) + "";
                                }
                                else {
                                    sSelectedItem = sSelectedItem + "," + safeSQL(dbDataRows[s].ItemId) + "";
                                }

                                //dbDataRows.next();
                            }
                            //dbDataRows.close();
                        }
                        //alert('sSelectedItem ---> ' + sSelectedItem);

                        if (bCheckDataExists == true) {
                            //var sSelectedItem = '';
                            //ToDo let user to select the promo item
                            //qry = "Select PromoOffer.Reason, PromoOffer.LineType, isnull(PromoOffer.DisCalc,'') as DisCalc, Products.Itemname, Products.ItemId, CASE When PackSize is null then '0' else PackSize END as PackSize, shortdesc," + " PromoOffer.Uom, PromoOffer.FOcQty, PromoOffer.DisPrice, PromoOffer.Discount, CategoryId, PromoOffer.ItemID as PromoGroup " + " from PromoOffer, Products where Products.ItemID in (" + sSelectedItem + ") and PromoID = " + safeSQL(ipdDet.PromoId) + " order by LineType, PromoOffer.ItemId, FocQty, DisPrice, discount, Discalc";
                            qry = "Select PromoOffer.Reason, PromoOffer.LineType, isnull(PromoOffer.DisCalc,'') as DisCalc, Item.Itemname,    Item.ItemNo,      CASE When PackSize is null then '0' else PackSize END as PackSize, shortdesc,  " + " PromoOffer.UOM, PromoOffer.FOcQty, PromoOffer.DisPrice, PromoOffer.Discount, Category , PromoOffer.ItemID as PromoGroup " + "  from PromoOffer, Item where Item.ItemNo in (" + sSelectedItem + ") and PromoID = " + safeSQL(ipdDet.PromoId) + " order by LineType, PromoOffer.ItemId, FocQty, DisPrice, discount, Discalc";
                            //qry = "Select PromoOffer.ItemId, ItemName, PromoOffer.Uom, PromoOffer.FOcQty, PromoOffer.DisPrice, PromoOffer.Discount, CategoryID from PromoOffer, Products where PromoOffer.ItemId = Products.ItemID and PromoID = '" + ipdDet.PromoId + "'";
                        } else {
                            //qry = "Select PromoOffer.ItemId, ItemName, PromoOffer.Uom, PromoOffer.FOcQty, PromoOffer.DisPrice, PromoOffer.Discount, CategoryID from PromoOffer, Products where PromoOffer.ItemId = Products.ItemID and PromoID = '" + ipdDet.PromoId + "'";
                            qry = "Select PromoOffer.ItemId, ItemName, PromoOffer.Uom, PromoOffer.FOcQty, PromoOffer.DisPrice, PromoOffer.Discount, Category  from PromoOffer, Products where PromoOffer.ItemId = Item.ItemNo and PromoID = '" + ipdDet.PromoId + "'";
                        }

                    } else {
                        //qry = "Select PromoOffer.ItemId, ItemName, PromoOffer.Uom, PromoOffer.FOcQty, PromoOffer.DisPrice, PromoOffer.Discount, CategoryID from PromoOffer, Products where PromoOffer.ItemId = Products.ItemID and PromoID = '" + ipdDet.PromoId + "'";
                        qry = "Select PromoOffer.ItemId, ItemName, PromoOffer.Uom, PromoOffer.FOcQty, PromoOffer.DisPrice, PromoOffer.Discount, Category  from PromoOffer, Item where PromoOffer.ItemId = Item.ItemNo and PromoID = '" + ipdDet.PromoId + "'";
                    }

                    //var iMultiCnt = 1;
                    //var dbDataRows1 = db.execute(qry);//"Select PromoOffer.ItemId, ItemName, PromoOffer.Uom, PromoOffer.FOcQty, PromoOffer.DisPrice, PromoOffer.Discount, CategoryID from PromoOffer, Products where PromoOffer.ItemId = Products.ItemID and PromoID = '" + ipdDet.PromoId + "'");
                    //while (dbDataRows1.isValidRow()) {
                    qry = formatQueryString(qry, "");
                    execute(qry);
                    var dbDataRows1 = executeQry;
                    for (var t = 0; t < dbDataRows1.length; t++) {

                        if (dbDataRows1[t].FocQty > 0) {
                            bFocPromo = true;
                            var LVItem = {};
                            LVItem["PromoType"] = "FOCQTY";
                            LVItem["ItemId"] = dbDataRows1[t].ItemId;
                            LVItem["OType"] = 'FOC';
                            LVItem["ItemName"] = dbDataRows1[t].Itemname;
                            LVItem["UOM"] = dbDataRows1[t].UOM;
                            LVItem["Qty"] = parseFloat(dbDataRows1[t].FOcQty);
                            if (bEnableFOCPrice == true) {
                                var price = this.getPrice(dbDataRows1[t].ItemId, dbDataRows1[t].UOM, Math.floor(iMultiCnt * parseFloat(dbDataRows1[t].FOcQty)), 1, dbDataRows1[t].UOM, getCustFieldValue('PriceGroup'), false);
                                var amt = price * Math.floor(iMultiCnt * parseFloat(dbDataRows1[t].FOcQty));
                                Ti.App.NUMBER.mathRound(amt, Ti.App.ARRAYOPERATION.getSystemValue('AmountRoundingDigits'));
                                LVItem["Price"] = price;
                                LVItem["Amount"] = amt;
                            } else {
                                LVItem["Price"] = 0;
                                LVItem["Amount"] = 0;
                            }
                            LVItem["Reason"] = dbDataRows1[t].Reason; //'FOC';
                            LVItem["DisPrice"] = 0;
                            LVItem["Promotion"] = ipdDet.PromoId;
                            LVItem["Priority"] = 0;
                            LVItem["Category"] = dbDataRows1[t].CategoryId;
                            LVItem["shortdesc"] = dbDataRows1[t].shortdesc;
                            LVItem["PromoCount"] = 1;
                            LVItem["LineType"] = '';//dtrOffer.fieldByName('LineType');
                            LVItem["DisCalc"] = '';//dtrOffer.fieldByName('DisCalc');
                            LVItem["PromoId"] = ipdDet.PromoId;
                            //lstOrdItems.push(LVItem);
                            newOrdItems.push(LVItem);
                        }
                        //dbDataRows1.next();
                    }
                    //dbDataRows1.close();
                }
                catch (e) {
                    alert('6386 Error ' + e);
                }

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
                                if (isNumber(parseFloat(disArr[iCnt]))) {
                                    dDisAmt1 = dDisAmt1 + (dDisAmt * (parseFloat(disArr[iCnt]) / 100));
                                    dDisAmt = dDisAmt - (dDisAmt * (parseFloat(disArr[iCnt]) / 100));
                                } else {
                                    //Ti.App.COMMON.Log('Invoice Promotion : DisCalc - ' + dDisCalc + ' : disArr[iCnt] 2-> ' + disArr[iCnt]);
                                }
                            } else {
                                if (isNumber(parseFloat(disArr[iCnt]))) {
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

                if (CheckBooleanField(getSystemValue('MultiInvoicePromotion'))) { // Multiple Promotion Apply for Invoice Promotion Discount Amount should be added. Discount Percentage will be overwrite by the Grater Percentage
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

function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

function GetQueryString(sScreenName) {
    var qry = getString['QueryConfig_' + sScreenName];
    qry += ' ' + getString['QueryConfig_' + sScreenName + '_GroupText'];
    qry += ' ' + getString['QueryConfig_' + sScreenName + '_OrderText'];
    qry = formatQueryString(qry, sScreenName);
    execute(qry);
    return executeQry;
    //return qry;
}
/**************************************************************/
/***************** CHECK PROMOTION START **********************/
/**************** CHECK PROMOTION NEW METHOD ******************/
/**************************************************************/
//line 1623
function CheckPromotionWithTempOrderDet(sitemid, suom, dqty, scat, dtorderdate) {
    var bBulkUomPrice = getSystemValue('BulkUomPrice');
    //Ti.App.PromoItemBulkUOM = suom;
    var PromoItemBulkUOM = suom;
    if (bBulkUomPrice == true) {
        try {
            var qry = GetQueryString("GET_PRODUCTS_VALUE");
            execute(qry);
            var dbDataRows1 = executeQry;
            for (var i = 0; i < dbDataRows1.length; i++) {
                suom = dbDataRows1[i].BulkUOM;
            }
            //    var _dbDataRows1 = Ti.App.dbConn.execute("select BulkUOM from Products where itemid=" + Ti.App.SQL.safeSQL(sitemid));
            //    while (_dbDataRows1.isValidRow()) {
            //        suom = _dbDataRows1.fieldByName('BulkUOM');
            //        _dbDataRows1.next();
            //    }
            //    _dbDataRows1.close();
        } catch (e) {
            console.log(e);
            //alert(e);
        }

        try {
            var _dbDataRows1 = Ti.App.dbConn.execute("select BaseQty from UOM where UOM =" + Ti.App.SQL.safeSQL(suom) + " and itemid=" + Ti.App.SQL.safeSQL(sitemid));
            while (_dbDataRows1.isValidRow()) {
                dqty = parseFloat(dqty) / parseFloat(_dbDataRows1.fieldByName('BaseQty'));
                _dbDataRows1.next();
            }
            _dbDataRows1.close();
        } catch (e) {
            console.log(e);
            //alert(e);
        }
    } else if (Ti.App.UOMType == 2) {
        iBaseQty = this.GetBaseQty(sitemid, suom);
        dqty = dqty / iBaseQty;
    }

    Ti.App.PromoItemBulkUOM = suom;
    try {
        dPromoEnterQty = dqty;
        dbCommonObj.arrPromoList = [];
        dbCommonObj.newOrdItems = [];
        dbCommonObj.lstOrdItems = [];//model.salesItemController.getTableItemData();
        //ToDo
        // Add all of current orders from temporditem to lstOrdItems
        promotion = {};
        var db = Ti.App.dbConn;//dbConnObj.createDataBaseConnection();
        qry = "";
        dbDataRows = "";
        dtrOffer = [];

        var dLastMultiCnt = -1;
        Arr = [];
        stPromo = {};
        bPromo = false;
        dtOrdDate = Ti.App.dtDeliveryDate;//new Date();
        if (Ti.App.COMMON.CheckBooleanField(Ti.App.ARRAYOPERATION.getSystemValue('ModelPromotion'))) {
            qry = "Select DISTINCT Promotion.PromoId, Entitle, EntitleType from Promotion, PromoCondition, PromoApply Where PromoName <> 'Special Price' and PromoType = 'Item Promotion'" + " and (Promotion.PromoId = PromoCondition.PromoId And Promotion.PromoId = PromoApply.PromoId) and FromDate <= " + Ti.App.SQL.safeSQL(dtorderdate) + " and ToDate >=" + Ti.App.SQL.safeSQL(dtorderdate) + "" + " and (ItemId = " + Ti.App.SQL.safeSQL(sitemid) + " or ItemId = " + Ti.App.SQL.safeSQL(scat) + " or ItemId in (Select Distinct GroupId from PromoGroup where ItemId = " + Ti.App.SQL.safeSQL(sitemid) + " and (ifnull(LineType,'') = '' OR ifnull(LineType,'') = 'Item') UNION Select Distinct GroupId from PromoGroup INNER JOIN Products on Products.Brand = PromoGroup.ItemId where Products.ItemId = " + Ti.App.SQL.safeSQL(sitemid) + " and ifnull(LineType,'') = 'Brand' UNION Select Distinct GroupId from PromoGroup INNER JOIN Products on Products.CategoryId = PromoGroup.ItemId  where Products.ItemId = " + Ti.App.SQL.safeSQL(sitemid) + " and ifnull(LineType,'') = 'Category' UNION Select Distinct GroupId from PromoGroup INNER JOIN Products on Products.Model = PromoGroup.ItemId where Products.ItemId = " + Ti.App.SQL.safeSQL(sitemid) + " and ifnull(LineType,'') = 'Model') or ItemId in (Select Distinct Brand from Products where ItemId = " + Ti.App.SQL.safeSQL(sitemid) + ") or ItemId in (Select Distinct Model from Products where ItemId = " + Ti.App.SQL.safeSQL(sitemid) + ") ) and (Uom = " + Ti.App.SQL.safeSQL(suom) + " or (PromoCondition.MinQty = 0 and PromoCondition.MaxQty = 0) )  and (( upper(Promotion.ApType) = 'ALL') or (PromoApply.Id = " + Ti.App.SQL.safeSQL(Ti.App.CustNo) + " and Promotion.ApType = 'Customer') or (PromoApply.Id in (select ZoneID from customers where CustNo = " + Ti.App.SQL.safeSQL(Ti.App.CustNo) + " ) and Promotion.ApType = 'Zone') " + " or (PromoApply.Id = " + Ti.App.SQL.safeSQL(Ti.App.agentID) + " and Promotion.ApType = 'Agent') or (PromoApply.Id = " + Ti.App.SQL.safeSQL(Ti.App.ARRAYOPERATION.getCustFieldValue('PriceGroup')) + " and Promotion.ApType = 'Price Group')  or (PromoApply.Id = " + Ti.App.SQL.safeSQL(Ti.App.ARRAYOPERATION.getCustFieldValue('PriceGroup2')) + " and (Promotion.ApType = 'Discount Group' or Promotion.ApType = 'DiscountGroup'))) order by Promotion.Priority, PromoCondition.MinQty, Promotion.FromDate desc, Promotion.PromoID";
        } else {
            //qry = "Select DISTINCT Promotion.PromoId, Entitle, EntitleType from Promotion, PromoCondition, PromoApply Where PromoName <> 'Special Price' and PromoType = 'Item Promotion'" + " and (Promotion.PromoId = PromoCondition.PromoId And Promotion.PromoId = PromoApply.PromoId) and FromDate <= " + Ti.App.SQL.safeSQL(dtorderdate) + " and ToDate >=" + Ti.App.SQL.safeSQL(dtorderdate) + "" + " and (ItemId = " + Ti.App.SQL.safeSQL(sitemid) + " or ItemId = " + Ti.App.SQL.safeSQL(scat) + " or ItemId in (Select Distinct GroupId from PromoGroup where ItemId = " + Ti.App.SQL.safeSQL(sitemid) + " and (ifnull(LineType,'') = '' OR ifnull(LineType,'') = 'Item') UNION Select Distinct GroupId from PromoGroup INNER JOIN Products on Products.Brand = PromoGroup.ItemId where Products.ItemId = " + Ti.App.SQL.safeSQL(sitemid) + " and ifnull(LineType,'') = 'Brand' UNION Select Distinct GroupId from PromoGroup INNER JOIN Products on Products.CategoryId = PromoGroup.ItemId  where Products.ItemId = " + Ti.App.SQL.safeSQL(sitemid) + " and ifnull(LineType,'') = 'Category') or ItemId in (Select Distinct Brand from Products where ItemId = " + Ti.App.SQL.safeSQL(sitemid) + ") ) and (Uom = " + Ti.App.SQL.safeSQL(suom) + " or (PromoCondition.MinQty = 0 and PromoCondition.MaxQty = 0) )  and (( upper(Promotion.ApType) = 'ALL') or (PromoApply.Id = " + Ti.App.SQL.safeSQL(Ti.App.Custchannel) + " and Promotion.ApType = 'Channel') or (PromoApply.Id = " + Ti.App.SQL.safeSQL(Ti.App.CustSubchannel) + " and Promotion.ApType = 'SubChannel') or (PromoApply.Id = " + Ti.App.SQL.safeSQL(Ti.App.CustNo) + " and Promotion.ApType = 'Customer') or (PromoApply.Id in (select ZoneID from customers where CustNo = " + Ti.App.SQL.safeSQL(Ti.App.CustNo) + " ) and Promotion.ApType = 'Zone') " + " or (PromoApply.Id = " + Ti.App.SQL.safeSQL(Ti.App.agentID) + " and Promotion.ApType = 'Agent') or (PromoApply.Id = " + Ti.App.SQL.safeSQL(Ti.App.ARRAYOPERATION.getCustFieldValue('PriceGroup')) + " and Promotion.ApType = 'Price Group')  or (PromoApply.Id = " + Ti.App.SQL.safeSQL(Ti.App.ARRAYOPERATION.getCustFieldValue('PriceGroup2')) + " and (Promotion.ApType = 'Discount Group' or Promotion.ApType = 'DiscountGroup'))) order by Promotion.Priority, PromoCondition.MinQty desc, Promotion.FromDate desc, Promotion.PromoID ";
            qry = "Select DISTINCT Promotion.PromoId, Entitle, EntitleType from Promotion, PromoCondition, PromoApply Where PromoName <> 'Special Price' and PromoType = 'Item Promotion'" + " and (Promotion.PromoId = PromoCondition.PromoId And Promotion.PromoId = PromoApply.PromoId) and FromDate <= " + Ti.App.SQL.safeSQL(dtorderdate) + " and ToDate >=" + Ti.App.SQL.safeSQL(dtorderdate) + "" + " and (ItemId = " + Ti.App.SQL.safeSQL(sitemid) + " or ItemId = " + Ti.App.SQL.safeSQL(scat) + " or ItemId in (Select Distinct GroupId from PromoGroup where ItemId = " + Ti.App.SQL.safeSQL(sitemid) + " and (ifnull(LineType,'') = '' OR ifnull(LineType,'') = 'Item') UNION Select Distinct GroupId from PromoGroup INNER JOIN Products on Products.Brand = PromoGroup.ItemId where Products.ItemId = " + Ti.App.SQL.safeSQL(sitemid) + " and ifnull(LineType,'') = 'Brand' UNION Select Distinct GroupId from PromoGroup INNER JOIN Products on Products.CategoryId = PromoGroup.ItemId  where Products.ItemId = " + Ti.App.SQL.safeSQL(sitemid) + " and ifnull(LineType,'') = 'Category') or ItemId in (Select Distinct Brand from Products where ItemId = " + Ti.App.SQL.safeSQL(sitemid) + ") ) and (( upper(Promotion.ApType) = 'ALL') or (PromoApply.Id = " + Ti.App.SQL.safeSQL(Ti.App.Custchannel) + " and Promotion.ApType = 'Channel') or (PromoApply.Id = " + Ti.App.SQL.safeSQL(Ti.App.CustSubchannel) + " and Promotion.ApType = 'SubChannel') or (PromoApply.Id = " + Ti.App.SQL.safeSQL(Ti.App.CustNo) + " and Promotion.ApType = 'Customer') or (PromoApply.Id in (select ZoneID from customers where CustNo = " + Ti.App.SQL.safeSQL(Ti.App.CustNo) + " ) and Promotion.ApType = 'Zone') " + " or (PromoApply.Id = " + Ti.App.SQL.safeSQL(Ti.App.agentID) + " and Promotion.ApType = 'Agent') or (PromoApply.Id = " + Ti.App.SQL.safeSQL(Ti.App.ARRAYOPERATION.getCustFieldValue('PriceGroup')) + " and Promotion.ApType = 'Price Group')  or (PromoApply.Id = " + Ti.App.SQL.safeSQL(Ti.App.ARRAYOPERATION.getCustFieldValue('PriceGroup2')) + " and (Promotion.ApType = 'Discount Group' or Promotion.ApType = 'DiscountGroup'))) order by Promotion.Priority, PromoCondition.MinQty desc, Promotion.FromDate desc, Promotion.PromoID ";
        }

        dbDataRows = db.execute(qry);
        while (dbDataRows.isValidRow()) {
            stPromo = {};
            stPromo["PromoId"] = dbDataRows.fieldByName('PromoId');
            stPromo["Entitle"] = dbDataRows.fieldByName('Entitle');
            stPromo["EntitleType"] = dbDataRows.fieldByName('EntitleType');
            Arr.push(stPromo);
            dbDataRows.next();
        };
        dbDataRows.close();

        if (Arr.length == 0) {
            return promotion;
        } NextRecord:
            for (var iCnt1 = 0; iCnt1 < Arr.length; iCnt1++) {
                stPromo = {};
                stPromo = Arr[iCnt1];

                arrCnt = [];
                bCondition = false;
                bMultiply = false;
                iMultiCnt = 1;
                dLastMultiCnt = -1;
                iMulti = 1;
                iPriority = 0;
                bItemPromo = false;
                bCatPromo = false;
                iPCount = 0;
                if (stPromo.Entitle > 0) {
                    if (stPromo.EntitleType == 'Per Day' || stPromo.EntitleType == 'PerDay') {
                        qry = "Select ifnull(Sum(PromoCount),0) as TotalPromoApplied from PromoEntitlement where CustNo = " + Ti.App.SQL.safeSQL(Ti.App.CustNo) + " and PromoId = " + Ti.App.SQL.safeSQL(stPromo.PromoId) + " and date(OrderDate) = date(" + Ti.App.SQL.safeSQL(dtorderdate) + ")";
                        dbDataRows = db.execute(qry);
                        while (dbDataRows.isValidRow()) {
                            iPCount = dbDataRows.fieldByName('TotalPromoApplied');
                            dbDataRows.next();
                        }
                        dbDataRows.close();
                    } else if (stPromo.EntitleType == 'Per Week' || stPromo.EntitleType == 'PerWeek') {
                        var tmpDate = dtOrdDate;
                        tmpDate = new Date();
                        qry = "Select ifnull(Sum(PromoCount),0) as TotalPromoApplied from PromoEntitlement where CustNo = " + Ti.App.SQL.safeSQL(Ti.App.CustNo) + " and PromoId = " + Ti.App.SQL.safeSQL(stPromo.PromoId) + " and date(OrderDate) >= date(" + Ti.App.SQL.safeSQL(new Date(tmpDate.setDate(tmpDate.getDate() - (tmpDate.getDay() - 1)))) + ")";
                        dbDataRows = db.execute(qry);
                        while (dbDataRows.isValidRow()) {
                            iPCount = dbDataRows.fieldByName('TotalPromoApplied');
                            dbDataRows.next();
                        }
                        dbDataRows.close();
                    } else if (stPromo.EntitleType == 'Per Month' || stPromo.EntitleType == 'PerMonth') {
                        var tmpDate = new Date(dtOrdDate.getFullYear(), dtOrdDate.getMonth(), 1);
                        qry = "Select ifnull(Sum(PromoCount),0) as TotalPromoApplied from PromoEntitlement where CustNo = " + Ti.App.SQL.safeSQL(Ti.App.CustNo) + " and PromoId = " + Ti.App.SQL.safeSQL(stPromo.PromoId) + " and date(OrderDate) >= date(" + Ti.App.SQL.safeSQL(tmpDate) + ")";
                        dbDataRows = db.execute(qry);
                        while (dbDataRows.isValidRow()) {
                            iPCount = dbDataRows.fieldByName('TotalPromoApplied');
                            dbDataRows.next();
                        }
                        dbDataRows.close();
                    } else if (stPromo.EntitleType == 'Per Promotion' || stPromo.EntitleType == 'PerPromotion' || stPromo.EntitleType == 'Per Invoice' || stPromo.EntitleType == 'PerInvoice' || stPromo.EntitleType == 'Per Order' || stPromo.EntitleType == 'PerOrder') {
                        qry = "Select ifnull(Sum(PromoCount),0) as TotalPromoApplied from PromoEntitlement where CustNo = " + Ti.App.SQL.safeSQL(Ti.App.CustNo) + " and PromoId = " + Ti.App.SQL.safeSQL(stPromo.PromoId) + "";
                        dbDataRows = db.execute(qry);
                        while (dbDataRows.isValidRow()) {
                            iPCount = dbDataRows.fieldByName('TotalPromoApplied');
                            dbDataRows.next();
                        }
                        dbDataRows.close();
                    }
                    if (iPCount >= stPromo.Entitle) {
                        continue NextRecord; //break NextRecord;
                    }
                }

                arrGroup = [];
                ipdGroup = {};
                //qry = "Select Promotion.PromoId, Promotion.PromoName, Priority, PromoCondition.ItemId, PromoCondition.UOM, MinQty, MaxQty, Multiply " + " from PromoCondition, Promotion where Promotion.PromoId = PromoCondition.PromoId and PromoCondition.LineType = 'Promotion Group' and " + " Promotion.PromoId = '" + stPromo.PromoId + "' order by PromoCondition.MinQty desc, Promotion.PromoID desc";
                qry = "Select Promotion.PromoId, Promotion.PromoName, Priority, PromoCondition.ItemId, PromoCondition.LineType, PromoCondition.UOM, MinQty, MaxQty, Multiply, Entitle, EntitleType, PromoCondition.MinAmt as MinAmt, PromoCondition.MaxAmt as MaxAmt  " + " from PromoCondition, Promotion where Promotion.PromoId = PromoCondition.PromoId and (PromoCondition.LineType = 'Item' or PromoCondition.LineType = 'Category') and " + " Promotion.PromoId = " + Ti.App.SQL.safeSQL(stPromo.PromoId) + " order by PromoCondition.MinQty desc, PromoCondition.MinAmt Desc,  Promotion.PromoID desc";
                dbDataRows = db.execute(qry);
                while (dbDataRows.isValidRow()) {
                    //alert('i am here 5');
                    ipdGroup = {};
                    ipdGroup["PromoId"] = dbDataRows.fieldByName('PromoId');
                    ipdGroup["Priority"] = dbDataRows.fieldByName('Priority');
                    ipdGroup["ItemId"] = dbDataRows.fieldByName('ItemId');
                    ipdGroup["UOM"] = dbDataRows.fieldByName('UOM');
                    ipdGroup["MinQty"] = dbDataRows.fieldByName('MinQty');
                    ipdGroup["MaxQty"] = dbDataRows.fieldByName('MaxQty');
                    ipdGroup["Multiply"] = dbDataRows.fieldByName('Multiply');
                    ipdGroup["LineType"] = dbDataRows.fieldByName('LineType');
                    ipdGroup["Entitle"] = dbDataRows.fieldByName('Entitle');
                    ipdGroup["EntitleType"] = dbDataRows.fieldByName('EntitleType');
                    ipdGroup["MinAmt"] = dbDataRows.fieldByName('MinAmt');
                    ipdGroup["MaxAmt"] = dbDataRows.fieldByName('MaxAmt');
                    arrGroup.push(ipdGroup);
                    dbDataRows.next();
                }
                dbDataRows.close();

                qry = "select Promotion.PromoId, Promotion.PromoName, Priority, PromoCondition.ItemId, shortdesc, PromoCondition.UOM, MinQty, MaxQty, Multiply, Entitle, EntitleType, PromoCondition.MinAmt as MinAmt, PromoCondition.MaxAmt as MaxAmt, Products.CategoryID " + "from PromoCondition, Promotion, Products where Promotion.PromoId = PromoCondition.PromoId and PromoCondition.ItemId = Products.ItemId and PromoCondition.LineType = 'ITEM' " + "and Promotion.PromoId like " + Ti.App.SQL.safeSQL(stPromo.PromoId) + " order by PromoCondition.MinQty desc, Promotion.PromoID desc";
                dbDataRows = db.execute(qry); While1:
                    while (dbDataRows.isValidRow()) {
                        bItemPromo = true;
                        bCondition = false;
                        iPriority = dbDataRows.fieldByName('Priority');
                        if (dbDataRows.fieldByName('Multiply') == "Incremental") {
                            bMultiply = true;
                        }

                        iCnt = 1;

                        if (Ti.App.UOMType == 2) {

                            if (Ti.App.COMMON.CheckBooleanField(Ti.App.ARRAYOPERATION.getSystemValue('BaseQtytoBulk'))) {
                                dbCommonObj.dbDataRows1 = db.execute("Select ifnull(TempOrderDet.Qty,0) as Qty, ifnull(TempOrderDet.Priority, '') as Priority, ifnull(TempOrderDet.Price,0) as Price, ifnull(TempOrderDet.Qty,0) * ifnull(TempOrderDet.Price,0) as Amount from TempOrderDet INNER JOIN UOM ON UOM.ItemId = TempOrderDet.ItemId and UOM.UOM = " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('UOM')) + " WHERE TempOrderDet.SalesType = 'S' and ifnull(Qty,0) > 0 and TempOrderDet.ItemId = " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('ItemId')));
                            }
                            else {
                                dbCommonObj.dbDataRows1 = db.execute("Select ifnull(TempOrderDet.Qty,0)/ifnull(UOM.BaseQty,1) as Qty, ifnull(TempOrderDet.Priority, '') as Priority, ifnull(TempOrderDet.Price,0) as Price, ifnull(TempOrderDet.Qty,0) * ifnull(TempOrderDet.Price,0) as Amount  from TempOrderDet INNER JOIN UOM ON UOM.ItemId = TempOrderDet.ItemId and UOM.UOM = " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('UOM')) + " WHERE TempOrderDet.SalesType = 'S' and ifnull(Qty,0) > 0 and TempOrderDet.ItemId = " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('ItemId')));
                            }
                        } else {
                            if ((dbDataRows.fieldByName('MaxQty') == 0 && dbDataRows.fieldByName('MinQty') == 0)) {
                                dbCommonObj.dbDataRows1 = db.execute("Select ifnull(TempOrderDet.Qty,0) as Qty, ifnull(TempOrderDet.Priority, '') as Priority, ifnull(TempOrderDet.Price,0) as Price, sum(ifnull(TempOrderDet.Qty,0) * ifnull(TempOrderDet.Price,0)) as Amount from TempOrderDet WHERE SalesType = 'S' and ifnull(Qty,0) > 0 and ItemId = " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('ItemId')) + " and (uom = " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('UOM')) + " or (" + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('MinQty')) + "='0' and " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('MaxQty')) + "='0' )) group by itemid ");
                            } else {
                                dbCommonObj.dbDataRows1 = db.execute("Select ifnull(TempOrderDet.Qty,0) as Qty, ifnull(TempOrderDet.Priority, '') as Priority, ifnull(TempOrderDet.Price,0) as Price, ifnull(TempOrderDet.Qty,0) * ifnull(TempOrderDet.Price,0) as Amount from TempOrderDet WHERE SalesType = 'S' and ifnull(Qty,0) > 0 and ItemId = " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('ItemId')) + " and uom = " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('UOM')) + " ");
                            }
                        }
                        while (dbCommonObj.dbDataRows1.isValidRow()) {
                            if ((dbDataRows.fieldByName('MinQty') > dbCommonObj.dbDataRows1.fieldByName('Qty') || dbDataRows.fieldByName('MaxQty') < dbCommonObj.dbDataRows1.fieldByName('Qty')) && (dbDataRows.fieldByName('MinAmt') > dbCommonObj.dbDataRows1.fieldByName('Amount') || dbDataRows.fieldByName('MaxAmt') < dbCommonObj.dbDataRows1.fieldByName('Amount'))) {
                                bCondition = false;

                                _obj = {};
                                _obj.PromoId = dbDataRows.fieldByName('PromoId');
                                _obj.MinQty = dbDataRows.fieldByName('MinQty');
                                _obj.Priority = dbDataRows.fieldByName('Priority');
                                _obj.Entitle = dbDataRows.fieldByName('Entitle');
                                _obj.EntitleType = dbDataRows.fieldByName('EntitleType');
                                dbCommonObj.arrPromoList.push(_obj);

                                break While1;
                            } else {
                                /*if (dbCommonObj.dbDataRows1.fieldByName('Price') == 0 && dbDataRows.fieldByName('CategoryID') != "ZZZ") {
                                    bCondition = false;
                                    break While1;
                                }*/

                                var ItemPromotionPriority = Ti.App.ARRAYOPERATION.getSystemValue('ItemPromotionPriority');
                                ItemPromotionPriority = (ItemPromotionPriority == "" || ItemPromotionPriority == null || ItemPromotionPriority == undefined) ? "" : ItemPromotionPriority;

                                if (dbCommonObj.dbDataRows1.fieldByName('Priority') > 0) {
                                    Ti.API.info("LINE 3771 " + dbCommonObj.dbDataRows1.fieldByName('Priority') + " " + dbDataRows.fieldByName('Priority'));
                                    if (dbCommonObj.dbDataRows1.fieldByName('Priority') < dbDataRows.fieldByName('Priority')) {
                                        bCondition = false;
                                        break While1;
                                    }
                                }
                                if (bMultiply == true) {

                                    iMulti = Math.floor(dbCommonObj.dbDataRows1.fieldByName('Qty') / dbDataRows.fieldByName('MinQty'));
                                    iMultiCnt = iMulti;
                                    if (dLastMultiCnt < 0 || (dLastMultiCnt != iMultiCnt && dLastMultiCnt > iMultiCnt)) {
                                        dLastMultiCnt = iMultiCnt;
                                    }

                                }
                                bCondition = true;
                                arrCnt.push(iCnt);
                            }
                            iCnt++;
                            dbCommonObj.dbDataRows1.next();
                        }
                        dbCommonObj.dbDataRows1.close();

                        if (bCondition == false) {
                            break While1;
                        }
                        dbDataRows.next();
                    }
                dbDataRows.close();
                if (bItemPromo == true && bCondition == false) {
                    continue NextRecord; //break NextRecord;
                }
                dPQty = 0;
                var dpromoCondAmt = 0;
                qry = "Select Promotion.PromoId, Promotion.PromoName, Priority, PromoCondition.ItemId, PromoCondition.UOM, MinQty, MaxQty, Multiply, Entitle, EntitleType, PromoCondition.MinAmt as MinAmt, PromoCondition.MaxAmt as MaxAmt from PromoCondition, Promotion where Promotion.PromoId = PromoCondition.PromoId and PromoCondition.LineType = 'Category' and Promotion.PromoId = " + Ti.App.SQL.safeSQL(stPromo.PromoId) + " order by PromoCondition.MinQty desc, Promotion.PromoID desc";
                //bCondition = false;
                dbDataRows = db.execute(qry); While2:
                    while (dbDataRows.isValidRow()) {
                        bCatPromo = true;
                        bCondition = false;
                        dPQty = 0;
                        iPriority = dbDataRows.fieldByName('Priority');
                        if (dbDataRows.fieldByName('Multiply') == 'Incremental') {
                            bMultiply = true;
                        }

                        iCnt = 1;
                        if (Ti.App.UOMType == 2) {

                            if (Ti.App.COMMON.CheckBooleanField(Ti.App.ARRAYOPERATION.getSystemValue('BaseQtytoBulk'))) {
                                dbCommonObj.dbDataRows1 = db.execute("Select ifnull(TempOrderDet.Qty,0) as Qty, ifnull(TempOrderDet.Priority, '') as Priority, ifnull(TempOrderDet.Qty,0) * ifnull(TempOrderDet.Price,0) as Amount from TempOrderDet INNER JOIN UOM ON UOM.ItemId = TempOrderDet.ItemId and UOM.UOM = " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('UOM')) + " LEFT JOIN Products ON TempOrderDet.ItemId = Products.ItemId  WHERE QTY > 0 and SalesType = 'S' and Products.CategoryID = " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('ItemId')));
                            }
                            else {
                                dbCommonObj.dbDataRows1 = db.execute("Select ifnull(TempOrderDet.Qty,0)/ifnull(UOM.BaseQty,1) as Qty, ifnull(TempOrderDet.Priority, '') as Priority, ifnull(TempOrderDet.Qty,0) * ifnull(TempOrderDet.Price,0) as Amount from TempOrderDet INNER JOIN UOM ON UOM.ItemId = TempOrderDet.ItemId and UOM.UOM = " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('UOM')) + " LEFT JOIN Products ON TempOrderDet.ItemId = Products.ItemId  WHERE QTY > 0 and SalesType = 'S' and Products.CategoryID = " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('ItemId')));
                            }
                        } else {
                            dbCommonObj.dbDataRows1 = db.execute("Select ifnull(TempOrderDet.Qty,0) as Qty, ifnull(TempOrderDet.Priority, '') as Priority, ifnull(TempOrderDet.Qty,0) * ifnull(TempOrderDet.Price,0) as Amount from TempOrderDet LEFT JOIN Products ON TempOrderDet.ItemId = Products.ItemId  WHERE QTY > 0 and SalesType = 'S' and Products.CategoryID = " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('ItemId')) + " and TempOrderDet.uom = " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('UOM')));
                        }

                        while (dbCommonObj.dbDataRows1.isValidRow()) {

                            bCondition = true;
                            var _dQty = dbCommonObj.dbDataRows1.fieldByName('Qty');
                            _dQty = (_dQty == null || _dQty == undefined || _dQty == '') ? 0 : _dQty;
                            if (dbCommonObj.dbDataRows1.fieldByName('Priority').length > 0) {
                                if (dbCommonObj.dbDataRows1.fieldByName('Priority') >= dbDataRows.fieldByName('Priority')) {
                                    dPQty += parseFloat(_dQty);
                                    arrCnt.push(iCnt);
                                }
                            } else {
                                dPQty += parseFloat(_dQty);
                                arrCnt.push(iCnt);
                            }

                            var _tmpPromoCondAmt = dbCommonObj.dbDataRows1.fieldByName('Amount');
                            _tmpPromoCondAmt = (_tmpPromoCondAmt == null || _tmpPromoCondAmt == undefined || _tmpPromoCondAmt == '') ? 0 : _tmpPromoCondAmt;
                            dpromoCondAmt += parseFloat(_tmpPromoCondAmt);

                            iCnt++;
                            dbCommonObj.dbDataRows1.next();
                        }
                        dbCommonObj.dbDataRows1.close();


                        if ((dbDataRows.fieldByName('MinQty') > dPQty || dbDataRows.fieldByName('MaxQty') < dPQty) &&
                            (dbDataRows.fieldByName('MinAmt') > dpromoCondAmt || dbDataRows.fieldByName('MaxAmt') < dpromoCondAmt)) {
                            bCondition = false;

                            _obj = {};
                            _obj.PromoId = dbDataRows.fieldByName('PromoId');
                            _obj.MinQty = dbDataRows.fieldByName('MinQty');
                            _obj.Priority = dbDataRows.fieldByName('Priority');
                            _obj.Entitle = dbDataRows.fieldByName('Entitle');
                            _obj.EntitleType = dbDataRows.fieldByName('EntitleType');
                            //Entitle, EntitleType
                            dbCommonObj.arrPromoList.push(_obj);

                            break While2;
                        }
                        if (bMultiply == true) {
                            iMulti = Math.floor(dPQty / dbDataRows.fieldByName('MinQty'));
                            if (iMulti > iMultiCnt) {
                                iMultiCnt = iMulti;
                            }
                            if (dLastMultiCnt < 0 || (dLastMultiCnt != iMultiCnt && dLastMultiCnt > iMultiCnt)) {
                                dLastMultiCnt = iMultiCnt;
                            }
                        }
                        if (bCondition == false) {
                            break While2;
                        }
                        dbDataRows.next();
                    }
                dbDataRows.close();

                if (bCatPromo == true && bCondition == false) {
                    continue NextRecord; //break NextRecord;
                }

                dPQty = 0;
                dpromoCondAmt = 0;
                qry = "Select Promotion.PromoId, Promotion.PromoName, Priority, PromoCondition.ItemId, PromoCondition.UOM, MinQty, MaxQty, Multiply, Entitle, EntitleType, PromoCondition.MinAmt as MinAmt, PromoCondition.MaxAmt as MaxAmt from PromoCondition, Promotion where Promotion.PromoId = PromoCondition.PromoId and PromoCondition.LineType = 'Brand' and Promotion.PromoId = " + Ti.App.SQL.safeSQL(stPromo.PromoId) + " order by PromoCondition.MinQty desc, Promotion.PromoID desc";
                //bCondition = false;
                dbDataRows = db.execute(qry); While2:
                    while (dbDataRows.isValidRow()) {
                        //alert('i am here 3');
                        bCatPromo = true;
                        bCondition = false;
                        dPQty = 0;
                        iPriority = dbDataRows.fieldByName('Priority');
                        if (dbDataRows.fieldByName('Multiply') == 'Incremental') {
                            bMultiply = true;
                        }

                        iCnt = 1;
                        //dbCommonObj.dbDataRows1 = db.execute("Select * from TempOrderDet WHERE SalesType = 'S' and ifnull(Qty,0) > 0 and ItemId = " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('ItemId')) +" and uom = " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('UOM')));
                        if (Ti.App.UOMType == 2) {

                            if (Ti.App.COMMON.CheckBooleanField(Ti.App.ARRAYOPERATION.getSystemValue('BaseQtytoBulk'))) {
                                dbCommonObj.dbDataRows1 = db.execute("Select ifnull(TempOrderDet.Qty,0) as Qty, ifnull(TempOrderDet.Priority, '') as Priority, ifnull(TempOrderDet.Qty,0) * ifnull(TempOrderDet.Price,0) as Amount from TempOrderDet INNER JOIN UOM ON UOM.ItemId = TempOrderDet.ItemId and UOM.UOM = " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('UOM')) + " LEFT JOIN Products ON TempOrderDet.ItemId = Products.ItemId  WHERE QTY > 0 and SalesType = 'S' and Products.Brand = " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('ItemId')));
                            }
                            else {
                                dbCommonObj.dbDataRows1 = db.execute("Select ifnull(TempOrderDet.Qty,0)/ifnull(UOM.BaseQty,1) as Qty, ifnull(TempOrderDet.Priority, '') as Priority, ifnull(TempOrderDet.Qty,0) * ifnull(TempOrderDet.Price,0) as Amount from TempOrderDet INNER JOIN UOM ON UOM.ItemId = TempOrderDet.ItemId and UOM.UOM = " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('UOM')) + " LEFT JOIN Products ON TempOrderDet.ItemId = Products.ItemId  WHERE QTY > 0 and SalesType = 'S' and Products.Brand = " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('ItemId')));
                            }
                        } else {
                            dbCommonObj.dbDataRows1 = db.execute("Select ifnull(TempOrderDet.Qty,0) as Qty, ifnull(TempOrderDet.Priority, '') as Priority, ifnull(TempOrderDet.Qty,0) * ifnull(TempOrderDet.Price,0) as Amount from TempOrderDet LEFT JOIN Products ON TempOrderDet.ItemId = Products.ItemId  WHERE QTY > 0 and SalesType = 'S' and Products.Brand = " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('ItemId')) + " and TempOrderDet.uom = " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('UOM')));
                        }

                        while (dbCommonObj.dbDataRows1.isValidRow()) {

                            bCondition = true;
                            var _dQty = dbCommonObj.dbDataRows1.fieldByName('Qty');
                            _dQty = (_dQty == null || _dQty == undefined || _dQty == '') ? 0 : _dQty;
                            if (dbCommonObj.dbDataRows1.fieldByName('Priority').length > 0) {
                                if (dbCommonObj.dbDataRows1.fieldByName('Priority') >= dbDataRows.fieldByName('Priority')) {
                                    dPQty += parseFloat(_dQty);
                                    arrCnt.push(iCnt);
                                }
                            } else {
                                dPQty += parseFloat(_dQty);
                                arrCnt.push(iCnt);
                            }

                            var _tmpPromoCondAmt = dbCommonObj.dbDataRows1.fieldByName('Amount');
                            _tmpPromoCondAmt = (_tmpPromoCondAmt == null || _tmpPromoCondAmt == undefined || _tmpPromoCondAmt == '') ? 0 : _tmpPromoCondAmt;
                            dpromoCondAmt += parseFloat(_tmpPromoCondAmt);

                            iCnt++;
                            dbCommonObj.dbDataRows1.next();
                        }
                        dbCommonObj.dbDataRows1.close();

                        if ((dbDataRows.fieldByName('MinQty') > dPQty || dbDataRows.fieldByName('MaxQty') < dPQty) &&
                            (dbDataRows.fieldByName('MinAmt') > dpromoCondAmt || dbDataRows.fieldByName('MaxAmt') < dpromoCondAmt)) {
                            bCondition = false;

                            _obj = {};
                            _obj.PromoId = dbDataRows.fieldByName('PromoId');
                            _obj.MinQty = dbDataRows.fieldByName('MinQty');
                            _obj.Priority = dbDataRows.fieldByName('Priority');
                            _obj.Entitle = dbDataRows.fieldByName('Entitle');
                            _obj.EntitleType = dbDataRows.fieldByName('EntitleType');
                            //Entitle, EntitleType
                            dbCommonObj.arrPromoList.push(_obj);

                            break While2;
                        }
                        if (bMultiply == true) {
                            iMulti = Math.floor(dPQty / dbDataRows.fieldByName('MinQty'));
                            if (iMulti > iMultiCnt) {
                                iMultiCnt = iMulti;
                            }
                            if (dLastMultiCnt < 0 || (dLastMultiCnt != iMultiCnt && dLastMultiCnt > iMultiCnt)) {
                                dLastMultiCnt = iMultiCnt;
                            }
                        }
                        if (bCondition == false) {
                            break While2;
                        }
                        dbDataRows.next();
                    }
                dbDataRows.close();

                if (bCatPromo == true && bCondition == false) {
                    continue NextRecord; //break NextRecord;
                }


                if (Ti.App.COMMON.CheckBooleanField(Ti.App.ARRAYOPERATION.getSystemValue('ModelPromotion'))) {
                    dPQty = 0;
                    dpromoCondAmt = 0;
                    qry = "Select Promotion.PromoId, Promotion.PromoName, Priority, PromoCondition.ItemId, PromoCondition.UOM, MinQty, MaxQty, Multiply, Entitle, EntitleType, PromoCondition.MinAmt as MinAmt, PromoCondition.MaxAmt as MaxAmt from PromoCondition, Promotion where Promotion.PromoId = PromoCondition.PromoId and PromoCondition.LineType = 'Model' and Promotion.PromoId = " + Ti.App.SQL.safeSQL(stPromo.PromoId) + " order by PromoCondition.MinQty desc, Promotion.PromoID desc";
                    dbDataRows = db.execute(qry); While2:
                        while (dbDataRows.isValidRow()) {
                            //alert('i am here 3');
                            bCatPromo = true;
                            bCondition = false;
                            dPQty = 0;
                            iPriority = dbDataRows.fieldByName('Priority');
                            if (dbDataRows.fieldByName('Multiply') == 'Incremental') {
                                bMultiply = true;
                            }

                            iCnt = 1;
                            if (Ti.App.UOMType == 2) {

                                if (Ti.App.COMMON.CheckBooleanField(Ti.App.ARRAYOPERATION.getSystemValue('BaseQtytoBulk'))) {
                                    dbCommonObj.dbDataRows1 = db.execute("Select ifnull(TempOrderDet.Qty,0) as Qty, ifnull(TempOrderDet.Priority, '') as Priority, ifnull(TempOrderDet.Qty,0) * ifnull(TempOrderDet.Price,0) as Amount from TempOrderDet INNER JOIN UOM ON UOM.ItemId = TempOrderDet.ItemId and UOM.UOM = " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('UOM')) + " LEFT JOIN Products ON TempOrderDet.ItemId = Products.ItemId  WHERE QTY > 0 and SalesType = 'S' and Products.Model = " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('ItemId')));
                                }
                                else {
                                    dbCommonObj.dbDataRows1 = db.execute("Select ifnull(TempOrderDet.Qty,0)/ifnull(UOM.BaseQty,1) as Qty, ifnull(TempOrderDet.Priority, '') as Priority, ifnull(TempOrderDet.Qty,0) * ifnull(TempOrderDet.Price,0) as Amount from TempOrderDet INNER JOIN UOM ON UOM.ItemId = TempOrderDet.ItemId and UOM.UOM = " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('UOM')) + " LEFT JOIN Products ON TempOrderDet.ItemId = Products.ItemId  WHERE QTY > 0 and SalesType = 'S' and Products.Model = " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('ItemId')));
                                }
                            } else {
                                dbCommonObj.dbDataRows1 = db.execute("Select ifnull(TempOrderDet.Qty,0) as Qty, ifnull(TempOrderDet.Priority, '') as Priority, ifnull(TempOrderDet.Qty,0) * ifnull(TempOrderDet.Price,0) as Amount from TempOrderDet LEFT JOIN Products ON TempOrderDet.ItemId = Products.ItemId  WHERE QTY > 0 and SalesType = 'S' and Products.Model = " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('ItemId')) + " and TempOrderDet.uom = " + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('UOM')));
                            }

                            while (dbCommonObj.dbDataRows1.isValidRow()) {

                                bCondition = true;
                                var _dQty = dbCommonObj.dbDataRows1.fieldByName('Qty');
                                _dQty = (_dQty == null || _dQty == undefined || _dQty == '') ? 0 : _dQty;
                                if (dbCommonObj.dbDataRows1.fieldByName('Priority').length > 0) {
                                    if (dbCommonObj.dbDataRows1.fieldByName('Priority') >= dbDataRows.fieldByName('Priority')) {
                                        dPQty += parseFloat(_dQty);
                                        arrCnt.push(iCnt);
                                    }
                                } else {
                                    dPQty += parseFloat(_dQty);
                                    arrCnt.push(iCnt);
                                }

                                var _tmpPromoCondAmt = dbCommonObj.dbDataRows1.fieldByName('Amount');
                                _tmpPromoCondAmt = (_tmpPromoCondAmt == null || _tmpPromoCondAmt == undefined || _tmpPromoCondAmt == '') ? 0 : _tmpPromoCondAmt;
                                dpromoCondAmt += parseFloat(_tmpPromoCondAmt);

                                iCnt++;
                                dbCommonObj.dbDataRows1.next();
                            }
                            dbCommonObj.dbDataRows1.close();

                            //10 > 15   || 14 < 15
                            if ((dbDataRows.fieldByName('MinQty') > dPQty || dbDataRows.fieldByName('MaxQty') < dPQty) &&
                                (dbDataRows.fieldByName('MinAmt') > dpromoCondAmt || dbDataRows.fieldByName('MaxAmt') < dpromoCondAmt)) {
                                bCondition = false;

                                _obj = {};
                                _obj.PromoId = dbDataRows.fieldByName('PromoId');
                                _obj.MinQty = dbDataRows.fieldByName('MinQty');
                                _obj.Priority = dbDataRows.fieldByName('Priority');
                                _obj.Entitle = dbDataRows.fieldByName('Entitle');
                                _obj.EntitleType = dbDataRows.fieldByName('EntitleType');
                                //Entitle, EntitleType
                                dbCommonObj.arrPromoList.push(_obj);

                                break While2;
                            }
                            if (bMultiply == true) {
                                iMulti = Math.floor(dPQty / dbDataRows.fieldByName('MinQty'));
                                if (iMulti > iMultiCnt) {
                                    iMultiCnt = iMulti;
                                }
                                if (dLastMultiCnt < 0 || (dLastMultiCnt != iMultiCnt && dLastMultiCnt > iMultiCnt)) {
                                    dLastMultiCnt = iMultiCnt;
                                }
                            }
                            if (bCondition == false) {
                                break While2;
                            }
                            dbDataRows.next();
                        }
                    dbDataRows.close();

                    if (bCatPromo == true && bCondition == false) {
                        continue NextRecord; //break NextRecord;
                    }

                }

                dpromoCondAmt = 0;
                bPromoGroup = false;
                try {
                    var qry1 = "Select Promotion.PromoId, Promotion.PromoName, Priority,Multiply, PromoCondition.ItemId, PromoCondition.UOM, MinQty, MaxQty, ifnull(PromoCondition.MinAmt,0) as MinAmt, ifnull(PromoCondition.MaxAmt,0) as MaxAmt, ifnull(GroupPromo,'') as GroupPromo from PromoCondition INNER JOIN Promotion ON Promotion.PromoId = PromoCondition.PromoId where Promotion.PromoId = PromoCondition.PromoId and lower(PromoCondition.LineType) = lower('Promotion Group') and Promotion.PromoId = " + Ti.App.SQL.safeSQL(stPromo.PromoId);
                    var dbDataRows1 = db.execute(qry1); While1:
                        while (dbDataRows1.isValidRow()) {

                            if (dbDataRows1.fieldByName('Multiply') == 'Incremental') {
                                bMultiply = true;
                            }

                            bPromoGroup = true;
                            bCondition = false;

                            if (Ti.App.COMMON.CheckBooleanField(Ti.App.ARRAYOPERATION.getSystemValue('ModelPromotion'))) {
                                dbCommonObj.dbDataRows1 = db.execute("Select (ifnull(InvD.InvQty,0)  + ifnull(Tmp.TmpQty,0)) as Qty, (ifnull(InvD.InvAmt,0)  + ifnull(Tmp.TmpAmt,0)) as amount from PromoGroup LEFT JOIN (Select PromoGroup.GroupId, TempOrderDet.UOM, SUM(ifnull(TempOrderDet.price,0) * ifnull(TempOrderDet.Qty,0)) as TmpAmt, SUM(TempOrderDet.Qty) as TmpQty  from TempOrderDet INNER  jOIN Products ON Products.ItemId = TempOrderDet.ItemId INNER JOIN PromoGroup ON (PromoGroup.ItemId = Products.ItemId OR PromoGroup.ItemId = Products.Brand OR PromoGroup.ItemId = Products.Model OR PromoGroup.ItemId = Products.CategoryID) and PromoGroup.GroupId =" + Ti.App.SQL.safeSQL(dbDataRows1.fieldByName('ItemId')) + " WHERE TempOrderDet.SalesType = 'S' and CASE WHEN (" + Ti.App.SQL.safeSQL(dbDataRows1.fieldByName('GroupPromo')) + " = '' OR " + Ti.App.SQL.safeSQL(dbDataRows1.fieldByName('GroupPromo')) + " = 'INVOICE') THEN CASE WHEN (ifnull(TempOrderDet.PromoId,'') like " + Ti.App.SQL.safeSQL('%' + dbDataRows1.fieldByName('PromoId') + '%') + " and ifnull(TempOrderDet.Priority, 999) <> '') THEN ifnull(TempOrderDet.Priority, 999) > cast(" + Ti.App.SQL.safeSQL(dbDataRows1.fieldByName('Priority')) + " as int) ELSE 1=1 END END GROUP BY PromoGroup.GroupId, TempOrderDet.UOM) Tmp ON PromoGroup.GroupId = Tmp.GroupId and Tmp.UOM = " + Ti.App.SQL.safeSQL(dbDataRows1.fieldByName('UOM')) + "  LEFT JOIN (Select PromoGroup.GroupId, InvDet.UOM, SUM(InvDet.AMOUNT) as InvAmt, SUM(InvDet.Qty) as InvQty  from InvDet INNER  jOIN Products ON Products.ItemId = InvDet.ItemId INNER JOIN PromoGroup ON (PromoGroup.ItemId = Products.ItemId OR PromoGroup.ItemId = Products.Brand OR PromoGroup.ItemId = Products.Model OR PromoGroup.ItemId = Products.CategoryID) and PromoGroup.GroupId =" + Ti.App.SQL.safeSQL(dbDataRows1.fieldByName('ItemId')) + " INNER JOIN Invoices ON Invoices.InvNo = InvDet.InvNo where InvDet.SalesType = 'S' and CustNo = " + Ti.App.SQL.safeSQL(Ti.App.CustNo) + " and void = 0 and CASE WHEN " + Ti.App.SQL.safeSQL(dbDataRows1.fieldByName('GroupPromo')) + " = 'Year' THEN InvDt > Date('now','localtime','start of year') ELSE CASE WHEN " + Ti.App.SQL.safeSQL(dbDataRows1.fieldByName('GroupPromo')) + " = 'Month' THEN InvDt > Date('now','localtime','start of month') ELSE CASE WHEN " + Ti.App.SQL.safeSQL(dbDataRows1.fieldByName('GroupPromo')) + " = 'Day' THEN date(InvDt) >= Date('now','localtime','start of Day') ELSE 1=0 END END END Group by PromoGroup.GroupId, InvDet.UOM)InvD ON InvD.GroupId = PromoGroup.GroupId and InvD.UOM = " + Ti.App.SQL.safeSQL(dbDataRows1.fieldByName('UOM')) + "  WHERE ifnull(Qty,0) > 0 and PromoGroup.GroupId =" + Ti.App.SQL.safeSQL(dbDataRows1.fieldByName('ItemId')) + " group by promogroup.GroupId");
                            } else {

                                dbCommonObj.dbDataRows1 = db.execute("Select (ifnull(InvD.InvQty,0)  + ifnull(Tmp.TmpQty,0)) as Qty, (ifnull(InvD.InvAmt,0)  + ifnull(Tmp.TmpAmt,0)) as amount from PromoGroup LEFT JOIN (Select PromoGroup.GroupId, TempOrderDet.UOM, SUM(ifnull(TempOrderDet.price,0) * ifnull(TempOrderDet.Qty,0)) as TmpAmt, SUM(TempOrderDet.Qty) as TmpQty  from TempOrderDet INNER  jOIN Products ON Products.ItemId = TempOrderDet.ItemId INNER JOIN PromoGroup ON (PromoGroup.ItemId = Products.ItemId OR PromoGroup.ItemId = Products.Brand OR PromoGroup.ItemId = Products.CategoryID) and PromoGroup.GroupId =" + Ti.App.SQL.safeSQL(dbDataRows1.fieldByName('ItemId')) + " WHERE TempOrderDet.SalesType = 'S' and CASE WHEN (" + Ti.App.SQL.safeSQL(dbDataRows1.fieldByName('GroupPromo')) + " = '' OR " + Ti.App.SQL.safeSQL(dbDataRows1.fieldByName('GroupPromo')) + " = 'INVOICE') THEN CASE WHEN (ifnull(TempOrderDet.PromoId,'') = " + Ti.App.SQL.safeSQL(dbDataRows1.fieldByName('PromoId')) + " and ifnull(TempOrderDet.Priority, 999) <> '') THEN ifnull(TempOrderDet.Priority, 999) >= cast(" + Ti.App.SQL.safeSQL(dbDataRows1.fieldByName('Priority')) + " as int) ELSE 1=1 END END GROUP BY PromoGroup.GroupId) Tmp ON PromoGroup.GroupId = Tmp.GroupId  LEFT JOIN (Select PromoGroup.GroupId, InvDet.UOM, SUM(InvDet.AMOUNT) as InvAmt, SUM(InvDet.Qty) as InvQty  from InvDet INNER  jOIN Products ON Products.ItemId = InvDet.ItemId INNER JOIN PromoGroup ON (PromoGroup.ItemId = Products.ItemId OR PromoGroup.ItemId = Products.Brand OR PromoGroup.ItemId = Products.CategoryID) and PromoGroup.GroupId =" + Ti.App.SQL.safeSQL(dbDataRows1.fieldByName('ItemId')) + " INNER JOIN Invoices ON Invoices.InvNo = InvDet.InvNo where InvDet.SalesType = 'S' and CustNo = " + Ti.App.SQL.safeSQL(Ti.App.CustNo) + " and void = 0 and CASE WHEN " + Ti.App.SQL.safeSQL(dbDataRows1.fieldByName('GroupPromo')) + " = 'Year' THEN InvDt > Date('now','localtime','start of year') ELSE CASE WHEN " + Ti.App.SQL.safeSQL(dbDataRows1.fieldByName('GroupPromo')) + " = 'Month' THEN InvDt > Date('now','localtime','start of month') ELSE CASE WHEN " + Ti.App.SQL.safeSQL(dbDataRows1.fieldByName('GroupPromo')) + " = 'Day' THEN date(InvDt) >= Date('now','localtime','start of Day') ELSE 1=0 END END END Group by PromoGroup.GroupId)InvD ON InvD.GroupId = PromoGroup.GroupId  WHERE ifnull(Qty,0) > 0 and PromoGroup.GroupId =" + Ti.App.SQL.safeSQL(dbDataRows1.fieldByName('ItemId')));
                            }

                            while (dbCommonObj.dbDataRows1.isValidRow()) {

                                if (dbDataRows1.fieldByName('MinQty') > dbCommonObj.dbDataRows1.fieldByName('Qty') || (dbDataRows1.fieldByName('MaxQty') > 0 && dbDataRows1.fieldByName('MaxQty') < dbCommonObj.dbDataRows1.fieldByName('Qty')) || dbDataRows1.fieldByName('MinAmt') > dbCommonObj.dbDataRows1.fieldByName('amount') || (dbDataRows1.fieldByName('MaxAmt') > 0 && dbDataRows1.fieldByName('MaxAmt') < dbCommonObj.dbDataRows1.fieldByName('amount'))) {
                                    bCondition = false;

                                    _obj = {};
                                    _obj.PromoId = dbDataRows1.fieldByName('PromoId');
                                    _obj.MinQty = dbDataRows1.fieldByName('MinQty');
                                    _obj.Priority = dbDataRows1.fieldByName('Priority');
                                    _obj.Entitle = dbDataRows1.fieldByName('Entitle');
                                    _obj.EntitleType = dbDataRows1.fieldByName('EntitleType');
                                    //dbCommonObj.arrPromoList.push(_obj);


                                    break While1;
                                } else {
                                    if (bMultiply == true) {
                                        iMulti = Math.floor(dbCommonObj.dbDataRows1.fieldByName('Qty') / dbDataRows1.fieldByName('MinQty'));
                                        iMultiCnt = iMulti;
                                    }
                                    if (dLastMultiCnt < 0 || (dLastMultiCnt != iMultiCnt && dLastMultiCnt > iMultiCnt)) {
                                        dLastMultiCnt = iMultiCnt;
                                    }
                                    bCondition = true;
                                }
                                dbCommonObj.dbDataRows1.next();
                            }
                            dbCommonObj.dbDataRows1.close();
                            if (bCondition == false) {
                                break While1;
                            }
                            dbDataRows1.next();
                        }
                    dbDataRows1.close();
                } catch (e) {
                    alert('e ---> PromoGroup ' + e);
                }
                if (bPromoGroup == true && bCondition == false) {
                    continue NextRecord; //break NextRecord;
                }


                /*
                 * 5Aug20 -> ApplyPromotion New Method
                 * 
                 */
                if (bCondition == true) {
                    CheckPromoAfterSave = Ti.App.COMMON.CheckBooleanField(Ti.App.ARRAYOPERATION.getSystemValue('CheckPromoAfterSave'));
                    bPromo = true;
                    if (dLastMultiCnt > 0) {
                        iMultiCnt = dLastMultiCnt;
                    }
                    if (stPromo.Entitle > 0) {
                        if (iPCount + iMultiCnt > stPromo.Entitle) {
                            iMultiCnt = stPromo.Entitle - iPCount;
                        }
                    }
                    //(sitemid, suom, dqty, scat, dtorderdate)
                    var db = Ti.App.dbConn;
                    var qry = "select PromoCondition.PromoId, PromoCondition.Itemid, PromoCondition.LineType, Promotion.Priority as Priority from PromoCondition INNER JOIN Promotion ON Promotion.PromOId = PromoCondition.PromoId where Promotion.promoid = '" + stPromo.PromoId + "'";
                    var sOfferQry = '';
                    var dbOfferDataRows = db.execute(qry);
                    while (dbOfferDataRows.isValidRow()) {

                        var sUpdatePromoIdQry = "";

                        if (Ti.App.COMMON.CheckBooleanField(Ti.App.ARRAYOPERATION.getSystemValue('ModelPromotion'))) {
                            sUpdatePromoIdQry = "update TempOrderDet SET PromoID = (CASE WHEN (ifnull(PromoID,'') = '' OR ifnull(PromoID,'') = " + Ti.App.SQL.safeSQL(dbOfferDataRows.fieldByName('PromoId')) + ") THEN " + Ti.App.SQL.safeSQL(dbOfferDataRows.fieldByName('PromoId')) + " ELSE  PromoID ||','|| " + Ti.App.SQL.safeSQL(dbOfferDataRows.fieldByName('PromoId')) + " END)"
                            + " , Priority = " + Ti.App.COMMON.CheckDecimal(dbOfferDataRows.fieldByName('Priority'))
                            + " WHERE SalesType = 'S' and CASE WHEN ifnull(Priority,'') = '' THEN 999 ELSE  Priority END >= cast(" + Ti.App.COMMON.CheckDecimal(dbOfferDataRows.fieldByName('Priority')) + " as int)"
                            + " and CASE WHEN ( " + Ti.App.SQL.safeSQL(dbOfferDataRows.fieldByName('LineType')) + " = 'Item') THEN"
                            + " ItemId = " + Ti.App.SQL.safeSQL(dbOfferDataRows.fieldByName('ItemId'))
                            + " ELSE CASE WHEN ( " + Ti.App.SQL.safeSQL(dbOfferDataRows.fieldByName('LineType')) + " = 'Promotion Group') THEN"
                            //+" ItemId in (Select ItemId from PromoGroup WHERE GroupId =  " +  Ti.App.SQL.safeSQL(dbOfferDataRows.fieldByName('Itemid')) + ")"
                            + " ItemId in (Select ItemId from PromoGroup WHERE GroupId =  " + Ti.App.SQL.safeSQL(dbOfferDataRows.fieldByName('Itemid')) + " and (ifnull(LineType,'') = '' OR ifnull(LineType,'') = 'Item')"
                            + " 	UNION Select Products.ItemId from PromoGroup INNER JOIN Products on Products.Brand = PromoGroup.ItemId WHERE GroupId =  " + Ti.App.SQL.safeSQL(dbOfferDataRows.fieldByName('Itemid')) + " and  ifnull(LineType,'') = 'Brand'"
                            + " 	UNION Select Products.ItemId from PromoGroup INNER JOIN Products on Products.CategoryId = PromoGroup.ItemId  WHERE GroupId = " + Ti.App.SQL.safeSQL(dbOfferDataRows.fieldByName('Itemid')) + " and ifnull(LineType,'') = 'Category'"
                            + " 	UNION Select Products.ItemId from PromoGroup INNER JOIN Products on Products.Model = PromoGroup.ItemId  WHERE GroupId = " + Ti.App.SQL.safeSQL(dbOfferDataRows.fieldByName('Itemid')) + " and ifnull(LineType,'') = 'Model')"
                            + " ELSE CASE WHEN ( " + Ti.App.SQL.safeSQL(dbOfferDataRows.fieldByName('LineType')) + " = 'Category') THEN"
                            + " ItemId in (Select ItemId from Products WHERE categoryId = " + Ti.App.SQL.safeSQL(dbOfferDataRows.fieldByName('Itemid')) + ")"
                            + " ELSE CASE WHEN ( " + Ti.App.SQL.safeSQL(dbOfferDataRows.fieldByName('LineType')) + " = 'Brand') THEN"
                            + " ItemId in (Select ItemId from Products WHERE Brand = " + Ti.App.SQL.safeSQL(dbOfferDataRows.fieldByName('Itemid')) + ")"
                            + " ELSE ItemId = " + Ti.App.SQL.safeSQL(dbOfferDataRows.fieldByName('ItemId')) + " END END END END";

                            db.execute(sUpdatePromoIdQry);
                        } else {
                            sUpdatePromoIdQry = "update TempOrderDet SET PromoID = (CASE WHEN (ifnull(PromoID,'') = '' OR ifnull(PromoID,'') = " + Ti.App.SQL.safeSQL(dbOfferDataRows.fieldByName('PromoId')) + ") THEN " + Ti.App.SQL.safeSQL(dbOfferDataRows.fieldByName('PromoId')) + " ELSE  "
                            + " CASE WHEN (select count(*) from (select '''' || replace(ifnull(PromoID,''),',',''',''') || '''' as Promo ) a  where Promo like '%''" + dbOfferDataRows.fieldByName('PromoId') + "''%') > 0 then ifnull(PromoID,'') else PromoID ||','|| " + Ti.App.SQL.safeSQL(dbOfferDataRows.fieldByName('PromoId')) + " END END)"
                            + " , Priority = " + Ti.App.COMMON.CheckDecimal(dbOfferDataRows.fieldByName('Priority'))
                               + " WHERE SalesType = 'S' and CASE WHEN ifnull(Priority,'') = '' THEN 999 ELSE  Priority END >= cast(" + Ti.App.COMMON.CheckDecimal(dbOfferDataRows.fieldByName('Priority')) + " as int)"
                               + " and CASE WHEN ( " + Ti.App.SQL.safeSQL(dbOfferDataRows.fieldByName('LineType')) + " = 'Item') THEN"
                               + " ItemId = " + Ti.App.SQL.safeSQL(dbOfferDataRows.fieldByName('ItemId'))
                               + " ELSE CASE WHEN ( " + Ti.App.SQL.safeSQL(dbOfferDataRows.fieldByName('LineType')) + " = 'Promotion Group') THEN"
                               //+" ItemId in (Select ItemId from PromoGroup WHERE GroupId =  " +  Ti.App.SQL.safeSQL(dbOfferDataRows.fieldByName('Itemid')) + ")"
                               + " ItemId in (Select ItemId from PromoGroup WHERE GroupId =  " + Ti.App.SQL.safeSQL(dbOfferDataRows.fieldByName('Itemid')) + " and (ifnull(LineType,'') = '' OR ifnull(LineType,'') = 'Item')"
                               + " 	UNION Select Products.ItemId from PromoGroup INNER JOIN Products on Products.Brand = PromoGroup.ItemId WHERE GroupId =  " + Ti.App.SQL.safeSQL(dbOfferDataRows.fieldByName('Itemid')) + " and  ifnull(LineType,'') = 'Brand'"
                               + " 	UNION Select Products.ItemId from PromoGroup INNER JOIN Products on Products.CategoryId = PromoGroup.ItemId  WHERE GroupId = " + Ti.App.SQL.safeSQL(dbOfferDataRows.fieldByName('Itemid')) + " and ifnull(LineType,'') = 'Category')"
                               + " ELSE CASE WHEN ( " + Ti.App.SQL.safeSQL(dbOfferDataRows.fieldByName('LineType')) + " = 'Category') THEN"
                               + " ItemId in (Select ItemId from Products WHERE categoryId = " + Ti.App.SQL.safeSQL(dbOfferDataRows.fieldByName('Itemid')) + ")"
                               + " ELSE CASE WHEN ( " + Ti.App.SQL.safeSQL(dbOfferDataRows.fieldByName('LineType')) + " = 'Brand') THEN"
                               + " ItemId in (Select ItemId from Products WHERE Brand = " + Ti.App.SQL.safeSQL(dbOfferDataRows.fieldByName('Itemid')) + ")"
                               + " ELSE ItemId = " + Ti.App.SQL.safeSQL(dbOfferDataRows.fieldByName('ItemId')) + " END END END END";
                            db.execute(sUpdatePromoIdQry);
                        }




                        if (CheckPromoAfterSave == false) {
                            //var 
                            Ti.App.ARRAYOPERATION.updateColumnData(0, Ti.App.dPromoItemRowIndex, "Promotion", dbOfferDataRows.fieldByName('PromoId'));

                        }
                        dbOfferDataRows.next();
                    }
                    dbOfferDataRows.close();

                    arrItemIndex = [];
                    if (CheckPromoAfterSave == false) {
                        var rowlength = Ti.App.ARRAYOPERATION.getAllRows(0).length;
                        var iRowCnt = Ti.App.COMMON.getRowIndex();
                        arrItemIndex.push("-");
                        for (var ctr = iRowCnt; ctr < rowlength; ctr++) {
                            arrItemIndex.push(Ti.App.ARRAYOPERATION.getColumnData(0, ctr, 'Itemid'));
                        }
                    }

                    DBCommon.prototype.ApplyPromotion(stPromo.PromoId, iMultiCnt, sitemid);
                    bCondition = false;
                }
                if (bCondition == true) {
                    bPromo = true;
                    if (stPromo.Entitle > 0) {
                        if (iPCount + iMultiCnt > stPromo.Entitle) {
                            iMultiCnt = stPromo.Entitle - iPCount;
                        }
                    }
                    //alert('arrCnt ' + arrCnt.length);
                    for (i = 0; i < arrCnt.length; i++) {
                        /*if (lstOrdItems[arrCnt[i]]["Promotion"].length > 0) {
                         //ToDo RemovePromotion
                         RemovePromotion(lstOrdItems[arrCnt[i]]["Promotion"]);
                         }*/
                        //lstOrdItems[arrCnt[i]]["Promotion"] = stPromo.PromoId;
                        //lstOrdItems[arrCnt[i]]["Priority"] = iPriority;
                        //Ti.App.ARRAYOPERATION.updateColumnData(0, i, "Promotion", stPromo.PromoId);//RK - 02dec
                        //Ti.App.ARRAYOPERATION.updateColumnData(0, i, "Priority", iPriority);//RK - 02dec
                    }

                    qry = "select distinct promooffer.Itemid from promogroup, promooffer where promooffer.Itemid = PromoGroup.GroupId and promoid = " + Ti.App.SQL.safeSQL(stPromo.PromoId);
                    dbDataRows = db.execute(qry);
                    while (dbDataRows.isValidRow()) {
                        bPromoGroup = true;
                        dbDataRows.next();
                    }
                    dbDataRows.close();

                    if (bPromoGroup == true || bCatPromo == true) {
                        sSelectedItem = '';
                        bCheckDataExists = false;
                        if (this.CheckData("Select PromoOffer.FocQty, PromoOffer.ItemID from PromoOffer where PromoID = " + Ti.App.SQL.safeSQL(stPromo.PromoId) + "")) {

                            qry = "Select PromoGroup.ItemID,Products.UOM, Products.ShortDesc as [Description] from PromoGroup INNER JOIN Products ON PromoGroup.ItemID = Products.ItemID where PromoGroup.GroupID in (Select ItemID from PromoOffer where PromoID = " + Ti.App.SQL.safeSQL(stPromo.PromoId) + ") order by Products.ItemID";
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

                        if (bCheckDataExists == true) {
                            //ToDo var user to select the promo item
                            qry = "Select PromoOffer.Reason, PromoOffer.LineType, ifnull(PromoOffer.DisCalc,'') as DisCalc, Products.Itemname, Products.ItemId, CASE When PackSize is null then '0' else PackSize END as PackSize, shortdesc," + " PromoOffer.Uom, PromoOffer.FOcQty, PromoOffer.DisPrice, PromoOffer.Discount, CategoryId, PromoOffer.ItemID as PromoGroup " + " from PromoOffer, Products where Products.ItemID in (" + sSelectedItem + ") and PromoID = " + Ti.App.SQL.safeSQL(stPromo.PromoId) + " order by LineType, PromoOffer.ItemId, FocQty, DisPrice, discount, Discalc";
                        } else {
                            //qry = "Select PromoOffer.Reason, Products.Itemname, Products.ItemId, CASE When PackSize is null then '0' else PackSize END as PackSize, shortdesc, " + " PromoOffer.Uom, PromoOffer.FOcQty, PromoOffer.DisPrice, PromoOffer.Discount, CategoryId, PromoOffer.ItemID as PromoGroup " + " from PromoOffer, Products, PromoGroup where Products.ItemID = PromoGroup.ItemID and PromoOffer.ItemID = PromoGroup.GroupID and PromoOffer.PromoID = '" + stPromo.PromoId + "'";
                            qry = "Select PromoOffer.Reason, PromoOffer.LineType, ifnull(PromoOffer.DisCalc,'') as DisCalc, Products.Itemname, Products.ItemId, CASE When PackSize is null then '0' else PackSize END as PackSize, shortdesc,  PromoOffer.Uom, PromoOffer.FOcQty, PromoOffer.DisPrice, PromoOffer.Discount, CategoryId, PromoOffer.ItemID as PromoGroup  from PromoOffer, Products where (Products.ItemID = PromoOffer.ItemID or Products.Brand = PromoOffer.ItemID) and PromoOffer.PromoID = " + Ti.App.SQL.safeSQL(stPromo.PromoId) + " order by LineType, PromoOffer.ItemId, FocQty, DisPrice, discount, Discalc";
                        }

                    } else {
                        qry = "Select PromoOffer.Reason, PromoOffer.LineType, ifnull(PromoOffer.DisCalc,'') as DisCalc, Products.Itemname, PromoOffer.ItemId, CASE When PackSize is null then '0' else PackSize END as PackSize, shortdesc, " + " PromoOffer.Uom, PromoOffer.FOcQty, PromoOffer.DisPrice, PromoOffer.Discount, CategoryId, PromoOffer.ItemID as PromoGroup " + " from PromoOffer, Products where PromoOffer.ItemId = Products.ItemID and PromoID = " + Ti.App.SQL.safeSQL(stPromo.PromoId) + " order by LineType, PromoOffer.ItemId, FocQty, DisPrice, discount, Discalc";
                    }


                    dtrOffer = db.execute(qry);
                    while (dtrOffer.isValidRow()) {
                        if (dtrOffer.fieldByName('FOcQty') > 0) {
                            //ToDo need to check how adding foc item
                            //dPQty = (dPQty == null || dPQty == undefined || dPQty == '') ? dqty : dPQty; 
                            //var tmpQty = Math.floor(dPQty / ipdGroup.MinQty);
                            LVItem = null;
                            LVItem = {};
                            LVItem["PromoType"] = "FOCQTY";
                            LVItem["ItemId"] = dtrOffer.fieldByName('ItemId');
                            LVItem["OType"] = 'FOC';
                            LVItem["ItemName"] = dtrOffer.fieldByName('Itemname');
                            if (bBulkUomPrice == true) {
                                LVItem["UOM"] = Ti.App.PromoItemBulkUOM;//dbApplyPromoData.fieldByName('UOM');
                            } else {
                                LVItem["UOM"] = dtrOffer.fieldByName('UOM');
                            }
                            //LVItem["Qty"] = tmpQty * parseFloat(dtrOffer.fieldByName('FOcQty'));
                            LVItem["Qty"] = Math.floor(iMultiCnt * parseFloat(dtrOffer.fieldByName('FOcQty')));
                            if (bEnableFOCPrice == true) {
                                var price = this.getPrice(dtrOffer.fieldByName('ItemId'), dtrOffer.fieldByName('UOM'), Math.floor(iMultiCnt * parseFloat(dtrOffer.fieldByName('FOcQty'))), 1, dtrOffer.fieldByName('UOM'), Ti.App.ARRAYOPERATION.getCustFieldValue('PriceGroup'), false);
                                var amt = price * Math.floor(iMultiCnt * parseFloat(dtrOffer.fieldByName('FOcQty')));
                                Ti.App.NUMBER.mathRound(amt, Ti.App.ARRAYOPERATION.getSystemValue('AmountRoundingDigits'));
                                LVItem["Price"] = price;
                                LVItem["Amount"] = amt;
                            } else {
                                LVItem["Price"] = 0;
                                LVItem["Amount"] = 0;
                            }
                            LVItem["Reason"] = dtrOffer.fieldByName('Reason'); //'FOC';
                            LVItem["DisPrice"] = 0;
                            LVItem["Promotion"] = stPromo.PromoId;
                            LVItem["Priority"] = iPriority;//0;//iPriority
                            LVItem["Category"] = dtrOffer.fieldByName('CategoryId');
                            LVItem["shortdesc"] = dtrOffer.fieldByName('shortdesc');
                            LVItem["PromoCount"] = iMultiCnt;
                            LVItem["LineType"] = dtrOffer.fieldByName('LineType');
                            LVItem["DisCalc"] = dtrOffer.fieldByName('DisCalc');
                            LVItem["PromoId"] = stPromo.PromoId;
                            //lstOrdItems.push(LVItem);
                            //dbCommonObj.newOrdItems.push(LVItem);
                            //dbCommonObj.newOrdItems = []; // Raj - 30Nov2016                        
                            dbCommonObj.newOrdItems.push(LVItem);

                        } else if (dtrOffer.fieldByName('DisPrice') > 0) {
                            //alert('i am here 10');
                            //for ( iCnt = 0; iCnt < lstOrdItems.length; iCnt++) {

                            var sCategoryID = '';
                            qry = "Select * FROM TempOrderDet where salesType ='S' and ifnull(Qty,0) > 0";
                            var dbApplyPromoData = db.execute(qry);
                            while (dbApplyPromoData.isValidRow()) {

                                var dbCategoryData = db.execute("Select CategoryId from Products where ItemId =" + Ti.App.SQL.safeSQL(dbApplyPromoData.fieldByName('ItemId')) + "");
                                while (dbCategoryData.isValidRow()) {
                                    sCategoryID = dbCategoryData.fieldByName('CategoryID');
                                    dbCategoryData.next();
                                }
                                dbCategoryData.close();
                                //for ( iCnt = Ti.App.COMMON.getRowIndex(); iCnt < Ti.App.ARRAYOPERATION.getAllRows(0).length; iCnt++) {
                                //if (bPromoGroup == true) {

                                //} else {
                                //if (dtrOffer.fieldByName('ItemId') == lstOrdItems[arrCnt[iCnt]]["ItemId"] && dtrOffer.fieldByName('UOM') == lstOrdItems[arrCnt[iCnt]]["UOM"]) {
                                //if ((dtrOffer.fieldByName('ItemId') == Ti.App.ARRAYOPERATION.getColumnData(0,iCnt,"ItemId") || dtrOffer.fieldByName('ItemId') == Ti.App.ARRAYOPERATION.getColumnData(0,iCnt,"CategoryID"))  && dtrOffer.fieldByName('UOM') == Ti.App.ARRAYOPERATION.getColumnData(0,iCnt,"UOM")) {

                                var dbUOM = dbApplyPromoData.fieldByName('UOM');

                                //Ti.App.PromoItemBulkUOM = suom;
                                if (bBulkUomPrice == true) {
                                    dbUOM = Ti.App.PromoItemBulkUOM;
                                }
                                if ((dtrOffer.fieldByName('ItemId') == dbApplyPromoData.fieldByName('ItemId') || dtrOffer.fieldByName('ItemId') == sCategoryID) && dtrOffer.fieldByName('UOM') == dbUOM) {
                                    //if (Ti.App.ARRAYOPERATION.getColumnData(0,iCnt,"OType") == 'RTN' || Ti.App.ARRAYOPERATION.getColumnData(0,iCnt,"OType") == 'FOC' || Ti.App.ARRAYOPERATION.getColumnData(0,iCnt,"OType") == 'EX') {
                                    //  break;
                                    //}

                                    //var price = this.getItemPrice(dtrOffer.fieldByName('ItemId'), dtrOffer.fieldByName('UOM'), '0', 1, dtrOffer.fieldByName('UOM'));
                                    //var price = this.getPrice(Ti.App.ARRAYOPERATION.getColumnData(0,iCnt,"ItemId"), dtrOffer.fieldByName('UOM'), Ti.App.COMMON.CheckDecimal(Ti.App.ARRAYOPERATION.getColumnData(0,iCnt,"Qty")), 1, dtrOffer.fieldByName('UOM'), Ti.App.ARRAYOPERATION.getCustFieldValue('PriceGroup'), false);
                                    var price = this.getPrice(dbApplyPromoData.fieldByName('ItemId'), dtrOffer.fieldByName('UOM'), Ti.App.COMMON.CheckDecimal(dbApplyPromoData.fieldByName('Qty')), 1, dtrOffer.fieldByName('UOM'), Ti.App.ARRAYOPERATION.getCustFieldValue('PriceGroup'), false);
                                    LVItem = null;
                                    LVItem = {};
                                    LVItem["PromoType"] = "DisPrice";
                                    //LVItem["Price"] = lstOrdItems[iCnt]["Price"] - dtrOffer.fieldByName('DisPrice');
                                    try {
                                        //db.execute("UPDATE TempOrders SET Price = Price + DiscountPrice Where OType = 'SALES' and ItemId =" + Ti.App.SQL.safeSQL(dtrOffer.fieldByName('ItemId')) + " and UOM =" + Ti.App.SQL.safeSQL(dtrOffer.fieldByName('UOM')));
                                        //db.execute("UPDATE TempOrders SET DiscountPrice = " + dtrOffer.fieldByName('DisPrice') + ", Discount = 0 Where OType = 'SALES' and ItemId =" + Ti.App.SQL.safeSQL(dtrOffer.fieldByName('ItemId')) + " and UOM =" + Ti.App.SQL.safeSQL(dtrOffer.fieldByName('UOM')));
                                        //db.execute("UPDATE TempOrders SET Price = Price - DiscountPrice Where OType = 'SALES' and ItemId =" + Ti.App.SQL.safeSQL(dtrOffer.fieldByName('ItemId')) + " and UOM =" + Ti.App.SQL.safeSQL(dtrOffer.fieldByName('UOM')));
                                    } catch (e) {

                                    }
                                    LVItem["Price"] = price;// - dtrOffer.fieldByName('DisPrice');
                                    //LVItem["Amount"] = (LVItem["Price"] * Ti.App.ARRAYOPERATION.getColumnData(0,iCnt,"Qty")) - dtrOffer.fieldByName('DisPrice');//lstOrdItems[iCnt]["Price"]
                                    LVItem["Amount"] = (LVItem["Price"] - dtrOffer.fieldByName('DisPrice')) * dbApplyPromoData.fieldByName('Qty');//lstOrdItems[iCnt]["Price"]
                                    LVItem["Qty"] = dbApplyPromoData.fieldByName('Qty');//Ti.App.ARRAYOPERATION.getColumnData(0,iCnt,"Qty");
                                    LVItem["DisPrice"] = dtrOffer.fieldByName('DisPrice');
                                    LVItem["Promotion"] = stPromo.PromoId;
                                    LVItem["ItemId"] = dbApplyPromoData.fieldByName('ItemId');//Ti.App.ARRAYOPERATION.getColumnData(0,iCnt,"ItemId");
                                    LVItem["PromoCount"] = 1;
                                    LVItem["Priority"] = iPriority;
                                    if (bBulkUomPrice == true) {
                                        LVItem["UOM"] = dbApplyPromoData.fieldByName('UOM');
                                    } else {
                                        LVItem["UOM"] = dtrOffer.fieldByName('UOM');
                                    }
                                    LVItem["LineType"] = dtrOffer.fieldByName('LineType');
                                    LVItem["DisCalc"] = dtrOffer.fieldByName('DisCalc');
                                    LVItem["PromoId"] = stPromo.PromoId;
                                    dbCommonObj.newOrdItems.push(LVItem);
                                }
                                //}
                                dbApplyPromoData.next();
                            }
                            dbApplyPromoData.close();

                        } else if (dtrOffer.fieldByName('Discount') > 0) {
                            //alert('i am here 11');
                            var sCategoryID = '';
                            qry = "Select * FROM TempOrderDet where salesType ='S' and ifnull(Qty,0) > 0";
                            var dbApplyPromoData = db.execute(qry);
                            while (dbApplyPromoData.isValidRow()) {

                                var dbCategoryData = db.execute("Select CategoryId from Products where ItemId =" + Ti.App.SQL.safeSQL(dbApplyPromoData.fieldByName('ItemId')) + "");
                                while (dbCategoryData.isValidRow()) {
                                    sCategoryID = dbCategoryData.fieldByName('CategoryID');
                                    dbCategoryData.next();
                                }
                                dbCategoryData.close();

                                var dbUOM = dbApplyPromoData.fieldByName('UOM');
                                if (bBulkUomPrice == true) {
                                    dbUOM = Ti.App.PromoItemBulkUOM;
                                }

                                if ((dtrOffer.fieldByName('ItemId') == dbApplyPromoData.fieldByName('ItemId') || dtrOffer.fieldByName('ItemId') == sCategoryID) && dtrOffer.fieldByName('UOM') == dbUOM) {
                                    var price = this.getPrice(dbApplyPromoData.fieldByName('ItemId'), dtrOffer.fieldByName('UOM'), Ti.App.COMMON.CheckDecimal(dbApplyPromoData.fieldByName('Qty')), 1, dtrOffer.fieldByName('UOM'), Ti.App.ARRAYOPERATION.getCustFieldValue('PriceGroup'), false);
                                    LVItem = null;
                                    LVItem = {};
                                    LVItem["PromoType"] = "Discount";
                                    LVItem["Price"] = price;// - dtrOffer.fieldByName('DisPrice');
                                    LVItem["Amount"] = (LVItem["Price"] * dbApplyPromoData.fieldByName('Qty')) - dtrOffer.fieldByName('DisPrice');//lstOrdItems[iCnt]["Price"]
                                    //LVItem["Amount"] = (price * dbApplyPromoData.fieldByName('Qty')) - ((dtrOffer.fieldByName('Discount') / 100 ) *  (price * dbApplyPromoData.fieldByName('Qty')));
                                    LVItem["Amount"] = (price - ((dtrOffer.fieldByName('Discount') / 100) * price)) * dbApplyPromoData.fieldByName('Qty');//));
                                    LVItem["Qty"] = dbApplyPromoData.fieldByName('Qty');//Ti.App.ARRAYOPERATION.getColumnData(0,iCnt,"Qty");
                                    LVItem["DisPrice"] = dtrOffer.fieldByName('Discount');
                                    LVItem["Promotion"] = stPromo.PromoId;
                                    LVItem["ItemId"] = dbApplyPromoData.fieldByName('ItemId');//Ti.App.ARRAYOPERATION.getColumnData(0,iCnt,"ItemId");
                                    LVItem["PromoCount"] = 1;
                                    LVItem["Priority"] = iPriority;
                                    if (bBulkUomPrice == true) {
                                        LVItem["UOM"] = dbApplyPromoData.fieldByName('UOM');
                                    } else {
                                        LVItem["UOM"] = dbUOM;//dtrOffer.fieldByName('UOM');
                                    }
                                    LVItem["LineType"] = dtrOffer.fieldByName('LineType');
                                    LVItem["DisCalc"] = dtrOffer.fieldByName('DisCalc');
                                    LVItem["PromoId"] = stPromo.PromoId;
                                    dbCommonObj.newOrdItems.push(LVItem);
                                }
                                //}
                                dbApplyPromoData.next();
                            }
                            dbApplyPromoData.close();


                        } else if (dtrOffer.fieldByName('DisCalc') != '') {

                            var sCategoryID = '';
                            qry = "Select * FROM TempOrderDet where salesType ='S' and ifnull(Qty,0) > 0";
                            Ti.App.COMMON.Log('TempOrderDet ----> ' + qry);
                            Ti.App.COMMON.Log('iMultiCnt -> ' + iMultiCnt);
                            var dbApplyPromoData = db.execute(qry);
                            while (dbApplyPromoData.isValidRow()) {

                                var dbCategoryData = db.execute("Select CategoryId from Products where ItemId =" + Ti.App.SQL.safeSQL(dbApplyPromoData.fieldByName('ItemId')) + "");
                                while (dbCategoryData.isValidRow()) {
                                    sCategoryID = dbCategoryData.fieldByName('CategoryID');
                                    dbCategoryData.next();
                                }
                                dbCategoryData.close();

                                var dbUOM = dbApplyPromoData.fieldByName('UOM');

                                //Ti.App.PromoItemBulkUOM = suom;
                                if (bBulkUomPrice == true) {
                                    dbUOM = Ti.App.PromoItemBulkUOM;
                                }
                                Ti.App.COMMON.Log('dbUOM -> ' + dbUOM);
                                Ti.App.COMMON.Log((dtrOffer.fieldByName('ItemId') + ' == ' + dbApplyPromoData.fieldByName('ItemId') + ' || ' + dtrOffer.fieldByName('ItemId') + ' == ' + sCategoryID) + ' && ' + dtrOffer.fieldByName('UOM') + ' == ' + dbApplyPromoData.fieldByName('UOM'));

                                /*
                                 * 
                                 * dtrOffer.fieldByName('UOM') == dbUOM
                                 * DISCALC / BaseQty
                                 * 
                                 */

                                if ((dtrOffer.fieldByName('ItemId') == dbApplyPromoData.fieldByName('ItemId') || dtrOffer.fieldByName('ItemId') == sCategoryID) && dtrOffer.fieldByName('UOM') == dbUOM) {
                                    var price = this.getPrice(dbApplyPromoData.fieldByName('ItemId'), dtrOffer.fieldByName('UOM'), Ti.App.COMMON.CheckDecimal(dbApplyPromoData.fieldByName('Qty')), 1, dtrOffer.fieldByName('UOM'), Ti.App.ARRAYOPERATION.getCustFieldValue('PriceGroup'), false);
                                    LVItem = null;
                                    LVItem = {};
                                    LVItem["PromoType"] = "DisCalc";
                                    //LVItem["Price"] = lstOrdItems[iCnt]["Price"] - dtrOffer.fieldByName('DisPrice');
                                    try {
                                        //db.execute("UPDATE TempOrders SET Price = Price + DiscountPrice Where OType = 'SALES' and ItemId =" + Ti.App.SQL.safeSQL(dtrOffer.fieldByName('ItemId')) + " and UOM =" + Ti.App.SQL.safeSQL(dtrOffer.fieldByName('UOM')));
                                        //db.execute("UPDATE TempOrders SET DiscountPrice = " + dtrOffer.fieldByName('DisPrice') + ", Discount = 0 Where OType = 'SALES' and ItemId =" + Ti.App.SQL.safeSQL(dtrOffer.fieldByName('ItemId')) + " and UOM =" + Ti.App.SQL.safeSQL(dtrOffer.fieldByName('UOM')));
                                        //db.execute("UPDATE TempOrders SET Price = Price - DiscountPrice Where OType = 'SALES' and ItemId =" + Ti.App.SQL.safeSQL(dtrOffer.fieldByName('ItemId')) + " and UOM =" + Ti.App.SQL.safeSQL(dtrOffer.fieldByName('UOM')));
                                    } catch (e) {

                                    }


                                    var dDisAmt = price;
                                    var dDisAmt1 = 0;
                                    var dDisCalc = dtrOffer.fieldByName('DisCalc');
                                    if (dDisCalc != null && dDisCalc != undefined && dDisCalc != '') {
                                        var disArr = [];
                                        disArr = dDisCalc.split('+');

                                        dDisAmt1 = 0;
                                        for (var iCnt = 0; iCnt < disArr.length; iCnt++) {
                                            if (disArr[iCnt].indexOf('%') > -1) {
                                                disArr[iCnt] = Ti.App.ARRAYOPERATION.createQuery(disArr[iCnt], "%", "");
                                                if (Ti.App.COMMON.isNumber(parseFloat(disArr[iCnt]))) {
                                                    dDisAmt1 = dDisAmt1 + (dDisAmt * (parseFloat(disArr[iCnt]) / 100));
                                                    dDisAmt = dDisAmt - (dDisAmt * (parseFloat(disArr[iCnt]) / 100));
                                                } else {
                                                }
                                            } else {
                                                if (Ti.App.COMMON.isNumber(parseFloat(disArr[iCnt]))) {
                                                    dDisAmt1 = dDisAmt1 + parseFloat(disArr[iCnt]);
                                                    dDisAmt = dDisAmt - parseFloat(disArr[iCnt]);
                                                } else {
                                                }
                                            }
                                        }
                                    }



                                    dDisAmt1 = (dDisAmt1 == null || dDisAmt1 == undefined || dDisAmt1 == '') ? 0 : dDisAmt1;
                                    if (bBulkUomPrice == true) {
                                        var baseQty1 = DBCommon.prototype.getBulkBaseQty(dbApplyPromoData.fieldByName('ItemId'));
                                        dDisAmt1 = dDisAmt1 / baseQty1;
                                    }


                                    LVItem["Price"] = price;// - dtrOffer.fieldByName('DisPrice');
                                    //LVItem["Amount"] = (LVItem["Price"] * Ti.App.ARRAYOPERATION.getColumnData(0,iCnt,"Qty")) - dtrOffer.fieldByName('DisPrice');//lstOrdItems[iCnt]["Price"]
                                    //LVItem["Amount"] = (LVItem["Price"]  - dtrOffer.fieldByName('DisPrice'))* dbApplyPromoData.fieldByName('Qty');//lstOrdItems[iCnt]["Price"]
                                    LVItem["Amount"] = (LVItem["Price"] - dDisAmt1) * dbApplyPromoData.fieldByName('Qty');//lstOrdItems[iCnt]["Price"]
                                    LVItem["Qty"] = dbApplyPromoData.fieldByName('Qty');//Ti.App.ARRAYOPERATION.getColumnData(0,iCnt,"Qty");
                                    LVItem["DisPrice"] = dDisAmt1;//dtrOffer.fieldByName('DisPrice');
                                    LVItem["Promotion"] = stPromo.PromoId;
                                    LVItem["ItemId"] = dbApplyPromoData.fieldByName('ItemId');//Ti.App.ARRAYOPERATION.getColumnData(0,iCnt,"ItemId");
                                    LVItem["PromoCount"] = 1;
                                    LVItem["Priority"] = iPriority;
                                    if (bBulkUomPrice == true) {
                                        LVItem["UOM"] = dbApplyPromoData.fieldByName('UOM');
                                    } else {
                                        LVItem["UOM"] = dtrOffer.fieldByName('UOM');
                                    }
                                    LVItem["LineType"] = dtrOffer.fieldByName('LineType');
                                    LVItem["DisCalc"] = dtrOffer.fieldByName('DisCalc');
                                    LVItem["PromoId"] = stPromo.PromoId;
                                    dbCommonObj.newOrdItems.push(LVItem);
                                }
                                //}
                                dbApplyPromoData.next();
                            }
                            dbApplyPromoData.close();

                        }
                        //lstOrdItems[arrCnt[i]]["Promotion"]

                        dtrOffer.next();
                    }
                    dtrOffer.close();

                    //break NextRecord;
                    continue NextRecord;


                }

            }///MAIN PROMO ARRAY - FOR END - 

        CheckPromoAfterSave = Ti.App.COMMON.CheckBooleanField(Ti.App.ARRAYOPERATION.getSystemValue('CheckPromoAfterSave'));
        if (dbCommonObj.newOrdItems.length == 0 || (dbCommonObj.newOrdItems.length == 0 && dqty == 0)) {
            dbCommonObj.newOrdItems = [];
            try {

                if (ipdGroup.MinQty != null && ipdGroup.MinQty != undefined) {

                    if (ipdGroup.MinQty > dqty || ipdGroup.MaxQty < dqty) {

                        var sPromoCondUOM = '';
                        var qry = "Select PromoCondition.Uom from PromoCondition where PromoID = " + Ti.App.SQL.safeSQL(ipdGroup.PromoId);
                        var dtrPromoCond = db.execute(qry);
                        while (dtrPromoCond.isValidRow()) {
                            sPromoCondUOM = dtrPromoCond.fieldByName('UOM');
                            dtrPromoCond.next();
                        }
                        dtrPromoCond.close();

                        //qry = "Select Products.Itemname, Products.ItemId, CASE When PackSize is null then '0' else PackSize END as PackSize, shortdesc," + " PromoOffer.Uom, PromoOffer.FOcQty, PromoOffer.DisPrice, PromoOffer.Discount, CategoryId, PromoOffer.ItemID as PromoGroup from PromoOffer, Products where Products.ItemID = '" + sitemid + "' and PromoID = '" + ipdGroup.PromoId + "'";// stPromo.PromoId + "'";
                        qry = "Select ifnull(Promotion.PromoName,'') as PromoName,ifnull(Category.Description,'')  as CategoryName,Products.Itemname, Products.ItemId, CASE When PackSize is null then '0' else PackSize END as PackSize, shortdesc,PromoOffer.Uom, PromoOffer.FOcQty, PromoOffer.DisPrice, PromoOffer.Discount, Products.CategoryId, PromoOffer.ItemID as PromoGroup from PromoOffer, Products left join Promotion on PromoOffer.promoid=Promotion.promoid left join Category on Products.CategoryID=Category.CategoryID where Products.ItemID = " + Ti.App.SQL.safeSQL(sitemid) + " and PromoOffer.PromoID = " + Ti.App.SQL.safeSQL(ipdGroup.PromoId) + "";// stPromo.PromoId + "'";
                        dtrOffer = db.execute(qry);
                        var bAlertExists = false;
                        while (dtrOffer.isValidRow()) {
                            /*
                             * 
                            Condition:
                            Flora Spreads LIGHT - 16x500g
                            Min: 12 EAC
                            offer: FOC2 EAC
                             */
                            if (dtrOffer.fieldByName('FocQty') > 0) {

                                Ti.App.bShowPromoAlert = true;
                                //alert("Condition : \n" + dtrOffer.fieldByName('Itemname') + "\n" + "Min : " + ipdGroup.MinQty + " " + dtrOffer.fieldByName('UOM') + "\n" + "Max : " + ipdGroup.MaxQty + " " + dtrOffer.fieldByName('UOM') + "\n" + "Offer : FOC " + dtrOffer.fieldByName('FOcQty') + " " + dtrOffer.fieldByName('UOM'));
                                if (sPromoCondUOM != '') {
                                    sPromoMsgText = "Condition : \n" + dtrOffer.fieldByName('Itemname') + "\n" + "Category : " + dtrOffer.fieldByName('CategoryName') + "\n" + "Promotion Group : " + dtrOffer.fieldByName('PromoName') + "\n" + "Min : " + ipdGroup.MinQty + " " + sPromoCondUOM + "\n" + "Max : " + ipdGroup.MaxQty + " " + dtrOffer.fieldByName('UOM') + "\n" + "Offer : FOC " + dtrOffer.fieldByName('FOcQty') + " " + dtrOffer.fieldByName('UOM');
                                } else {
                                    sPromoMsgText = "Condition : \n" + dtrOffer.fieldByName('Itemname') + "\n" + "Category : " + dtrOffer.fieldByName('CategoryName') + "\n" + "Promotion Group : " + dtrOffer.fieldByName('PromoName') + "\n" + "Min : " + ipdGroup.MinQty + " " + dtrOffer.fieldByName('UOM') + "\n" + "Max : " + ipdGroup.MaxQty + " " + dtrOffer.fieldByName('UOM') + "\n" + "Offer : FOC " + dtrOffer.fieldByName('FOcQty') + " " + dtrOffer.fieldByName('UOM');
                                }
                                if (CheckPromoAfterSave == false) {
                                    if (bAlertExists == false) {
                                        bAlertExists = true;
                                        //alert(sPromoMsgText);
                                    }
                                } else {
                                    Ti.App.arrPromoMsg.push(sPromoMsgText);
                                }
                                //alert("Condition : " + dtrOffer.fieldByName('Itemname') + " Min : " + ipdGroup.MinQty + " " + dtrOffer.fieldByName('UOM') + " offer : FOC" + dtrOffer.fieldByName('FOcQty') + " " +dtrOffer.fieldByName('UOM'));
                            } else if (dtrOffer.fieldByName('DisPrice') > 0) {
                                Ti.App.bShowPromoAlert = true;
                                ///alert("Condition : \n" + dtrOffer.fieldByName('Itemname') + "\n" + "Min : " + ipdGroup.MinQty + " " + dtrOffer.fieldByName('UOM') +"\n" + "Max : " + ipdGroup.MaxQty + " " + dtrOffer.fieldByName('UOM') + "\n" + "Offer : Discount " + dtrOffer.fieldByName('DisPrice'));
                                if (sPromoCondUOM != '') {
                                    sPromoMsgText = "Condition : \n" + dtrOffer.fieldByName('Itemname') + "\n" + "Min : " + ipdGroup.MinQty + " " + sPromoCondUOM + "\n" + "Max : " + ipdGroup.MaxQty + " " + dtrOffer.fieldByName('UOM') + "\n" + "Offer : Discount " + dtrOffer.fieldByName('DisPrice');
                                } else {
                                    sPromoMsgText = "Condition : \n" + dtrOffer.fieldByName('Itemname') + "\n" + "Min : " + ipdGroup.MinQty + " " + dtrOffer.fieldByName('UOM') + "\n" + "Max : " + ipdGroup.MaxQty + " " + dtrOffer.fieldByName('UOM') + "\n" + "Offer : Discount " + dtrOffer.fieldByName('DisPrice');
                                }
                                if (CheckPromoAfterSave == false) {
                                    if (bAlertExists == false) {
                                        bAlertExists = true;
                                        alert(sPromoMsgText);
                                    }
                                } else {
                                    Ti.App.arrPromoMsg.push(sPromoMsgText);
                                }
                            } else if (dtrOffer.fieldByName('Discount') > 0) {
                                Ti.App.bShowPromoAlert = true;
                                //alert("Condition : \n" + dtrOffer.fieldByName('Itemname') + "\n" + "Min : " + ipdGroup.MinQty + " " + dtrOffer.fieldByName('UOM') +"\n" + "Max : " + ipdGroup.MaxQty + " " + dtrOffer.fieldByName('UOM') + "\n" + "Offer : Discount " + dtrOffer.fieldByName('Discount') + "%");
                                if (sPromoCondUOM != '') {
                                    sPromoMsgText = "Condition : \n" + dtrOffer.fieldByName('Itemname') + "\n" + "Min : " + ipdGroup.MinQty + " " + sPromoCondUOM + "\n" + "Max : " + ipdGroup.MaxQty + " " + dtrOffer.fieldByName('UOM') + "\n" + "Offer : Discount " + dtrOffer.fieldByName('Discount') + "%";
                                } else {
                                    sPromoMsgText = "Condition : \n" + dtrOffer.fieldByName('Itemname') + "\n" + "Min : " + ipdGroup.MinQty + " " + dtrOffer.fieldByName('UOM') + "\n" + "Max : " + ipdGroup.MaxQty + " " + dtrOffer.fieldByName('UOM') + "\n" + "Offer : Discount " + dtrOffer.fieldByName('Discount') + "%";
                                }
                                if (CheckPromoAfterSave == false) {
                                    if (bAlertExists == false) {
                                        bAlertExists = true;
                                        alert(sPromoMsgText);
                                    }
                                } else {
                                    Ti.App.arrPromoMsg.push(sPromoMsgText);
                                }
                            }
                            dtrOffer.next();
                        }
                        dtrOffer.close();
                        //alert("Condition : " + lstOrdItems[rowPos]["ItemId"] + " Min : " + ipdGroup.MinQty + " " + lstOrdItems[rowPos]["UOM"] + " offer ");
                    }

                }
            } catch (e) { }
        } else {


            /*
                    _obj = {};
                    _obj.PromoId = ipdGroup.PromoId;
                    _obj.MinQty = ipdGroup.MinQty;
                    _obj.Priority = ipdGroup.Priority;
                    dbCommonObj.arrPromoList.push();
                    
                    119
                    59
                    39
                    19
              */

            if (dbCommonObj.arrPromoList.length > 0) {
                dPromoMinQty = 0; sPromoId = "";
                for (var i = 0; i < dbCommonObj.arrPromoList.length; i++) {
                    //119 < 0
                    if (dPromoEnterQty < dbCommonObj.arrPromoList[i].MinQty) {
                        if (dPromoMinQty == 0) {
                            sPromoId = dbCommonObj.arrPromoList[i].PromoId;
                            dPromoMinQty = dbCommonObj.arrPromoList[i].MinQty;
                        } else if (dbCommonObj.arrPromoList[i].MinQty < dPromoMinQty) {
                            sPromoId = dbCommonObj.arrPromoList[i].PromoId;
                            dPromoMinQty = dbCommonObj.arrPromoList[i].MinQty;
                        }
                    }
                }
                dPromoMinQty = (dPromoMinQty == null || dPromoMinQty == undefined || dPromoMinQty == '') ? 0 : dPromoMinQty;

                var sPromoCondUOM = '';
                qry = "Select PromoCondition.Uom from PromoCondition where PromoID = " + Ti.App.SQL.safeSQL(sPromoId);

                var dtrPromoCond = db.execute(qry);
                while (dtrPromoCond.isValidRow()) {
                    sPromoCondUOM = dtrPromoCond.fieldByName('UOM');
                    dtrPromoCond.next();
                }
                dtrPromoCond.close();
                qry = "Select ifnull(Promotion.PromoName,'') as PromoName,ifnull(Category.Description,'')  as CategoryName,Products.Itemname, Products.ItemId, CASE When PackSize is null then '0' else PackSize END as PackSize, shortdesc,PromoOffer.Uom, PromoOffer.FOcQty, PromoOffer.DisPrice, PromoOffer.Discount, Products.CategoryId, PromoOffer.ItemID as PromoGroup from PromoOffer, Products left join Promotion on PromoOffer.promoid=Promotion.promoid left join Category on Products.CategoryID=Category.CategoryID where Products.ItemID = " + Ti.App.SQL.safeSQL(sitemid) + " and PromoOffer.PromoID = " + Ti.App.SQL.safeSQL(sPromoId) + "";// stPromo.PromoId + "'";
                Ti.App.COMMON.Log(qry);
                dtrOffer = db.execute(qry);
                var bAlertExists = false;
                while (dtrOffer.isValidRow()) {

                    if (dtrOffer.fieldByName('FocQty') > 0) {
                        Ti.App.bShowPromoAlert = true;
                        if (sPromoCondUOM != '') {
                            sPromoMsgText = "Condition : \n" + dtrOffer.fieldByName('Itemname') + "\n" + "Category : " + dtrOffer.fieldByName('CategoryName') + "\n" + "Promotion Group : " + dtrOffer.fieldByName('PromoName') + "\n" + "Min : " + dPromoMinQty + " " + sPromoCondUOM + "\n" + "Offer : FOC " + dtrOffer.fieldByName('FOcQty') + " " + dtrOffer.fieldByName('UOM');
                        } else {
                            sPromoMsgText = "Condition : \n" + dtrOffer.fieldByName('Itemname') + "\n" + "Category : " + dtrOffer.fieldByName('CategoryName') + "\n" + "Promotion Group : " + dtrOffer.fieldByName('PromoName') + "\n" + "Min : " + dPromoMinQty + " " + dtrOffer.fieldByName('UOM') + "\n" + "Offer : FOC " + dtrOffer.fieldByName('FOcQty') + " " + dtrOffer.fieldByName('UOM');
                        }
                        if (CheckPromoAfterSave == false) {
                            if (bAlertExists == false) {
                                bAlertExists = true;
                                //alert(sPromoMsgText);
                            }
                        } else {
                            Ti.App.arrPromoMsg.push(sPromoMsgText);
                        }
                    } else if (dtrOffer.fieldByName('DisPrice') > 0) {
                        Ti.App.bShowPromoAlert = true;
                        //alert("Condition : \n" + dtrOffer.fieldByName('Itemname') + "\n" + "Min : " + dPromoMinQty + " " + dtrOffer.fieldByName('UOM') + "\n" + "Ooffer : Discount " + dtrOffer.fieldByName('DisPrice'));
                        if (sPromoCondUOM != '') {
                            sPromoMsgText = "Condition : \n" + dtrOffer.fieldByName('Itemname') + "\n" + "Min : " + dPromoMinQty + " " + sPromoCondUOM + "\n" + "Offer : Discount " + dtrOffer.fieldByName('DisPrice');
                        } else {
                            sPromoMsgText = "Condition : \n" + dtrOffer.fieldByName('Itemname') + "\n" + "Min : " + dPromoMinQty + " " + dtrOffer.fieldByName('UOM') + "\n" + "Offer : Discount " + dtrOffer.fieldByName('DisPrice');
                        }
                        if (CheckPromoAfterSave == false) {
                            if (bAlertExists == false) {
                                bAlertExists = true;
                                alert(sPromoMsgText);
                            }
                        } else {
                            Ti.App.arrPromoMsg.push(sPromoMsgText);
                        }
                    } else if (dtrOffer.fieldByName('Discount') > 0) {
                        Ti.App.bShowPromoAlert = true;
                        //alert("Condition : \n" + dtrOffer.fieldByName('Itemname') + "\n" + "Min : " + dPromoMinQty + " " + dtrOffer.fieldByName('UOM') + "\n" + "Offer : Discount " + dtrOffer.fieldByName('Discount') + "%");
                        if (sPromoCondUOM != '') {
                            sPromoMsgText = "Condition : \n" + dtrOffer.fieldByName('Itemname') + "\n" + "Min : " + dPromoMinQty + " " + sPromoCondUOM + "\n" + "Offer : Discount " + dtrOffer.fieldByName('Discount') + "%";
                        } else {
                            sPromoMsgText = "Condition : \n" + dtrOffer.fieldByName('Itemname') + "\n" + "Min : " + dPromoMinQty + " " + dtrOffer.fieldByName('UOM') + "\n" + "Offer : Discount " + dtrOffer.fieldByName('Discount') + "%";
                        }
                        if (CheckPromoAfterSave == false) {
                            if (bAlertExists == false) {
                                bAlertExists = true;
                                alert(sPromoMsgText);
                            }
                        } else {
                            Ti.App.arrPromoMsg.push(sPromoMsgText);
                        }
                    }
                    dtrOffer.next();
                }
                dtrOffer.close();
                //alert("Condition : " + lstOrdItems[rowPos]["ItemId"] + " Min : " + ipdGroup.MinQty + " " + lstOrdItems[rowPos]["UOM"] + " offer ");
            }

        }

        return dbCommonObj.newOrdItems;

    } catch (e) {
      //  alert('CheckPro --> ' + e);
        return [];
    }
}

/////New2
//var ParamJS = [];
function CheckInvoicePromotion2(sitemid, suom, dqty, scat) {

    //
    var bBulkUomPrice = getSystemValue('BulkUomPrice');
    //Ti.App.PromoItemBulkUOM = suom;
    var PromoItemBulkUOM = suom;

    return;
    if (bBulkUomPrice == true || bBulkUomPrice == '1') {
        try {
            var qry = GetQueryString("GET_PRODUCTS_VALUE");
            execute(qry);
            var dbDataRows1 = executeQry;
            for (var i = 0; i < dbDataRows1.length; i++) {
                suom = dbDataRows1[i].BulkUOM;
            }
            //    var _dbDataRows1 = Ti.App.dbConn.execute("select BulkUOM from Products where itemid=" + Ti.App.SQL.safeSQL(sitemid));
            //    while (_dbDataRows1.isValidRow()) {
            //        suom = _dbDataRows1.fieldByName('BulkUOM');
            //        _dbDataRows1.next();
            //    }
            //    _dbDataRows1.close();
        } catch (e) {
            console.log(e);
            //alert(e);
        }

        try {
            var qry = GetQueryString("GET_UOM_VALUE");
            execute(qry);
            var _dbDataRows1 = executeQry;
            for (var i = 0; i < _dbDataRows1.length; i++) {
                dqty = parseFloat(dqty) / parseFloat(_dbDataRows1[i].BaseQty);
            }
            //var _dbDataRows1 = Ti.App.dbConn.execute("select BaseQty from UOM where UOM =" + Ti.App.SQL.safeSQL(suom) + " and itemid=" + Ti.App.SQL.safeSQL(sitemid));
            //while (_dbDataRows1.isValidRow()) {
            //    dqty = parseFloat(dqty) / parseFloat(_dbDataRows1.fieldByName('BaseQty'));
            //    _dbDataRows1.next();
            //}
            //_dbDataRows1.close();
        } catch (e) {
            console.log(e);
            //alert(e);
        }
    } else if (Ti.App.UOMType == 2) {
        iBaseQty = this.GetBaseQty(sitemid, suom);
        dqty = dqty / iBaseQty;
    }

    PromoItemBulkUOM = suom;

    ////////////
    //testing purpose - doubt
    //ParamJS.systemCode = 'BulkUomPrice';
    FormView.systemCode = 'BulkUomPrice';

    var rtn = 0;
    var s = "{\"key\":\"ModelPromotion\"}";
    var sysModelPromotion = getSystemValue1('BulkUomPrice');

    var bBulkUomPrice = getSystemValue('BulkUomPrice');
    //var sysModelPromotion = getSystemValue(s);
    var bBulkUomPrice = CheckBooleanField(sysModelPromotion);
    if (bBulkUomPrice == true || bBulkUomPrice == '1') {
    }
    return bBulkUomPrice;
}
 

function getSystemValue1(systemCode) {
    //var res = app.ReadRecord("GET_SYSTEM_VALUE", systemCode);
    var res = ReadRecord("GET_SYSTEM_VALUE", systemCode);
    return res;
}



function GetBaseQty_Old(sItemId, sUOM) {
    baseqty = 0;
    dbDataRows = Ti.App.dbConn.execute("SELECT BaseQty FROM UOM WHERE ItemId=" + Ti.App.SQL.safeSQL(sItemId) + " and UOM=" + Ti.App.SQL.safeSQL(sUOM));
    while (dbDataRows.isValidRow()) {
        baseqty = dbDataRows.fieldByName('BaseQty');
        dbDataRows.next();
    }
    dbDataRows.close();
    //db.close();
    return baseqty;
}
