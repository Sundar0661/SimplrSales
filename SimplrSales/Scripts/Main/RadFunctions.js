var flgLog = false;

function addSomething(a, b) {
    var c = a + b
    return c;
    console.log('log from javascript');
}
function getItemPrice1(itemNo, qty) {
    return 2 + 4;
}



function getItemName(itemno) {
    var rtn = 'Item ' + itemno + ' description';
    return rtn
}

function getItemPriceJSON(itemno) {
    var obj = {};
    obj.ItemNo = itemNo;
    obj.Price = 2 * qty;

    return obj.ItemNo;
}

function getItemPrice(val) {//itemNo, qty) {
    var itemNo = val.split(',')[0];
    var qty = val.split(',')[1];
    var obj = {};
    obj.ItemNo = itemNo.replace(/'/g, "");
    obj.Price = 2 * qty.replace(/'/g, "");//.replace("'", "") ;
    //var obj = app.ReadJsonObject(JSON.stringify(obj));
    //var obj2 = JSON.parse(obj);

    return obj.Price;//obj2.Price;
}

function getItemDescFromJV(itemno) {

    var query = "select * from item where ItemNo= " + itemno + "";//'650002'

    execute(query);
    return JSON.stringify(executeQry);

    //var query = "SELECT * from Products WHERE Itemid = '" + itemno + "'";
    //var obj = app.ReadRecord(query, '');
    //return obj;
}

function updateItem(itemno) {
    var query = "UPDATE Item SET itemname = '" + itemno + "' WHERE ItemNo = '" + itemno + "'";
    var obj = execute(query);
    return obj;
}

function showToast(str) {
    var message = document.getElementById("message").value;
    //   var lengthLong = document.getElementById("length").checked;

    /*
        Call the 'makeToast' method in the Java code.
        'app' is specified in MainActivity.java when
        adding the JavaScript interface.
     */
    app.makeToast(str);
    //  app.getValue();
    return false;
}

//not need
//function javascriptCallFinished(val) {

//    if (val.contains("{")) {

//        JSONObject issueObj = null;
//        try {
//            issueObj = new JSONObject(val);
//            Iterator iterator = issueObj.keys();
//            while (iterator.hasNext()) {
//                String key = (String) iterator.next();
//                String issue = issueObj.getString(key)
//                ;

//                ut_sp.setStringValue(SQL_JAVASCRIPTRESULT + "." + key, issueObj.getString(key));
//                //  get id from  issue
//                //   String _pubKey = issue.optString("id");
//                executeActionConfig(jsFieldname, AN_JAVASCRIPTFINISHED, "");

//            }

//        } catch (JSONException e) {
//            e.printStackTrace();
//        }

//    } else {
//        ut_sp.setStringValue(SQL_JAVASCRIPTRESULT, val.toString());

//        executeActionConfig(jsFieldname, AN_JAVASCRIPTFINISHED, "");
//    }

//}



function setResult(val) {
    mContext.javascriptCallFinished(val);
}
function setStringValue(parameter, value) {
    parameter = value;
    //        writer.putString(parameter.toUpperCase(), value);
    //writer.commit();
}


//New1
////////////////////////=========================================================================

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

var ParamJS = {};
var sysCustomerID = "";
var sysUOMType = "";
var custDet = [];
var sPromoMsgText = "";
var dtorderdate = "";
var invdate = "";
function CheckItemPromotion(sitemid, suom, sysCustId, scat, qty, dAmt) { //function CheckInvoicePromotion(sitemid, suom, dqty, scat, dtorderdate) {//ItemPromotion --function CheckItemPromotion(sitemid, suom, dqty, scat,qty,dAmt)

    

    var itempromoradfunction1 = ("CheckItemPromotion Params Values > ItemId > " + sitemid + " UOM > " + suom + " CustomerId > " + sysCustId + " Category > " + scat + " Qty > " + qty + " SubTotal > " + dAmt);
    ItemPromo_LogCalculation(itempromoradfunction1);

    flgLog = true;
    sPromoMsgText = "";
    
    var splitValue = sitemid.split(",");
    //sitemid = splitValue[0].slice(1, -1); suom = splitValue[1].slice(1, -1); dqty = splitValue[2].slice(1, -1); scat = splitValue[3].slice(1, -1); qty = splitValue[4].slice(1, -1); dAmt = splitValue[5].slice(1, -1);
    sitemid = splitValue[0].slice(1, -1); suom = splitValue[1].slice(1, -1); sysCustId = splitValue[2].slice(1, -1); scat = splitValue[3].slice(1, -1); qty = splitValue[4].slice(1, -1); dAmt = splitValue[5].slice(1, -1); invdate = splitValue[6].slice(1, -1); dtorderdate = splitValue[7].slice(1, -1);
    dqty = qty;

    try {
       // var qry = "delete from temporderdet where userid='" + FormView.UserID + "'";
        var qry = "delete from TempOrderdet WHERE PROMOId LIKE '%' + (select promoid from TempOrderdet where itemid ='" + sitemid + "' and salestype ='S') + '%' AND SalesType = 'F' and userid='" + FormView.UserID + "'";
        //qry = formatQueryString(qry, sScreenName);

        execute(qry);
    } catch (e) {

    }


    try {
        if (qty == '0' || qty == '' || qty == null)
            return;
    }
    catch { }

    //var dtorderdate = getDateTime();//new Date();
   // dtorderdate = DateFormateChangeDDMM("dd-mm-yyyy", dtorderdate);

   // dtorderdate = getDateTime();

    var bBulkUomPrice = getSystemValue('BulkUomPrice');
    var PromoItemBulkUOM = suom;
    var sysbEnableFOCPrice = getSystemValue('EnableFOCPrice');
    var bEnableFOCPrice = CheckBooleanField(sysbEnableFOCPrice);
    var UOMType = getSystemValue('UOMType');
    sysUOMType = UOMType;
    if (bBulkUomPrice == true || bBulkUomPrice == '1') {
        try {
            var qry = GetQueryString("GET_PRODUCTS_VALUE");
            execute(qry);
            var dbDataRows1 = executeQry;
            for (var i = 0; i < dbDataRows1.length; i++) {
                suom = dbDataRows1[i].BulkUOM;
            }
        } catch (e) {
            console.log(e);
            //alert(e);
        }

        try {
            ParamJS.UOM = suom;
            var dbDataRows1 = GetQueryString("GET_UOM_VALUE");
            for (var i = 0; i < dbDataRows1.length; i++) {
                dqty = parseFloat(dqty) / parseFloat(dbDataRows1[i].BaseQty);
            }
        } catch (e) {
            console.log(e);
            //alert(e);
        }
    } else if (UOMType == 2) {
        iBaseQty = GetBaseQty(sitemid, suom);
        dqty = dqty / iBaseQty;
    }
    sysCustomerID = sysCustId;// "T16-200104793";// getSystemValue('CustomerID');//todo1
    PromoItemBulkUOM = suom;
    try {
        dPromoEnterQty = dqty;
        dbCommonObj.arrPromoList = [];
        dbCommonObj.newOrdItems = [];
        dbCommonObj.lstOrdItems = [];

        arrPromoList = [];
        newOrdItems = [];
        lstOrdItems = [];

        //model.salesItemController.getTableItemData();
        //ToDo
        // Add all of current orders from temporditem to lstOrdItems
        promotion = {};
        //var db = Ti.App.dbConn;//dbConnObj.createDataBaseConnection();
        qry = "";
        dbDataRows = "";
        dtrOffer = [];

        var dLastMultiCnt = -1;
        Arr = [];
        stPromo = {};
        bPromo = false;
        var dtOrdDate = new Date();// date = new Date();
       
        var sysModelPromotion = getSystemValue('ModelPromotion');
        var bModelPromotion = CheckBooleanField(sysModelPromotion);

        custDet = setCustomerFields(sysCustomerID);

        qry = "";
        if (bModelPromotion == true || bModelPromotion == '1') {
            //var promotionParam = {};
            ParamJS.dtorderdate = dtorderdate;
            ParamJS.sitemid = sitemid;
            ParamJS.scat = scat;
            ParamJS.CustNo = sysCustomerID;
            ParamJS.agentID = AgentId;
            ParamJS.PriceGroup = dtorderdate;
            ParamJS.PriceGroup2 = dtorderdate;
            dbDataRows = GetQueryString("GET_PROMOTION_PRICE");
        }
        else {
            //ParamJS.
            //var ParamJS = {};
            ParamJS.dtorderdate = dtorderdate;
            ParamJS.sitemid = sitemid;
            ParamJS.scat = scat;
            ParamJS.CustNo = sysCustomerID;
            ParamJS.agentID = FormView.UserID;// AgentId;
            ParamJS.PriceGroup = custDet[0]["PriceGroup"];
            ParamJS.PriceGroup2 = custDet[0]["PriceGroup2"];
            ParamJS.Custchannel = custDet[0]["Custchannel"];
            ParamJS.CustSubchannel = custDet[0]["CustSubchannel"];
            if (currentScreenName.toLowerCase() == "salesordernewform" || currentScreenName.toLowerCase() == "salesorderform")
                dbDataRows = GetQueryString("GET_PROMOTION_CHANNEL");
            else
                dbDataRows = GetQueryString("GET_PROMOTION_CHANNEL_PO");
            //todo1
            //dbDataRows = GetQueryString1("Select DISTINCT Promotion.PromoID, Entitle, EntitleType,Promotion.Priority, PromoCondition.MinQty, Promotion.FromDate from Promotion, PromoCondition, PromoApply Where Promotion.PromoID ='ADMPP00569-S20BOX' and MinQty='1'");
            // Select DISTINCT Promotion.PromoID, Entitle, EntitleType,Promotion.Priority, PromoCondition.MinQty, Promotion.FromDate from Promotion, PromoCondition, PromoApply Where Promotion.PromoID ='ADMPP00569-S20BOX' and MinQty='1'
        }

        qryParse = dbDataRows;
        if (qryParse != null) {
            for (var i = 0; i < qryParse.length; i++) {
                stPromo = {};
                stPromo["PromoId"] = qryParse[i]["PromoID"];
                stPromo["Entitle"] = qryParse[i]["Entitle"];
                stPromo["EntitleType"] = qryParse[i]["EntitleType"];
                Arr.push(stPromo);
            }
        }
        if (Arr.length == 0) {
            //return promotion;
            promotion = CheckInvoicePromotion(dAmt, dtorderdate);
            return promotion;
        }  NextRecord:
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

                        ParamJS.PromoId = stPromo["PromoId"];
                        //qry = "Select ifnull(Sum(PromoCount),0) as TotalPromoApplied from PromoEntitlement where CustNo = " + Ti.App.SQL.safeSQL(Ti.App.CustNo) + " and PromoId = " + Ti.App.SQL.safeSQL(stPromo.PromoId) + " and date(OrderDate) = date(" + Ti.App.SQL.safeSQL(dtorderdate) + ")";
                        //dbDataRows = db.execute(qry);
                        dbDataRows = GetQueryString("GET_PROMOTITLE_VALUE");
                        for (var i = 0; i < dbDataRows.length; i++) {
                            iPCount = dbDataRows[i]["TotalPromoApplied"];
                        }
                        //while (dbDataRows.isValidRow()) {
                        //    iPCount = dbDataRows.fieldByName('TotalPromoApplied');
                        //    dbDataRows.next();
                        //}
                        //dbDataRows.close();
                    } else if (stPromo.EntitleType == 'Per Week' || stPromo.EntitleType == 'PerWeek') {
                        var tmpDate = dtOrdDate;
                        tmpDate = new Date();
                        var weekday = new Date(tmpDate.setDate(tmpDate.getDate() - (tmpDate.getDay() - 1)));

                        ParamJS.CustNo = dtorderdate;
                        ParamJS.PromoId = stPromo["PromoId"];
                        ParamJS.weekday = weekday;

                        //qry = "Select ifnull(Sum(PromoCount),0) as TotalPromoApplied from PromoEntitlement where CustNo = " + Ti.App.SQL.safeSQL(Ti.App.CustNo) + " and PromoId = " + Ti.App.SQL.safeSQL(stPromo.PromoId) + " and date(OrderDate) >= date(" + Ti.App.SQL.safeSQL(new Date(tmpDate.setDate(tmpDate.getDate() - (tmpDate.getDay() - 1)))) + ")";
                        //dbDataRows = db.execute(qry);
                        //while (dbDataRows.isValidRow()) {
                        //    iPCount = dbDataRows.fieldByName('TotalPromoApplied');
                        //    dbDataRows.next();
                        //}
                        //dbDataRows.close();
                        dbDataRows = GetQueryString("GET_PROMOTITLE_WEEK");
                        for (var i = 0; i < dbDataRows.length; i++) {
                            iPCount = dbDataRows[i]["TotalPromoApplied"];
                        }

                    } else if (stPromo.EntitleType == 'Per Month' || stPromo.EntitleType == 'PerMonth') {
                        //var tmpDate = new Date(dtOrdDate.getFullYear(), dtOrdDate.getMonth(), 1);
                        //qry = "Select ifnull(Sum(PromoCount),0) as TotalPromoApplied from PromoEntitlement where CustNo = " + Ti.App.SQL.safeSQL(Ti.App.CustNo) + " and PromoId = " + Ti.App.SQL.safeSQL(stPromo.PromoId) + " and date(OrderDate) >= date(" + Ti.App.SQL.safeSQL(tmpDate) + ")";
                        //dbDataRows = db.execute(qry);
                        //while (dbDataRows.isValidRow()) {
                        //    iPCount = dbDataRows.fieldByName('TotalPromoApplied');
                        //    dbDataRows.next();
                        //}
                        //dbDataRows.close();
                        var tmpDate =  new Date(dtOrdDate.getFullYear(), dtOrdDate.getMonth(), 1);
                        ParamJS.CustNo = dtorderdate;
                        ParamJS.PromoId = stPromo["PromoId"];
                        ParamJS.weekday = dtorderdate;
                        dbDataRows = GetQueryString("GET_PROMOTITLE_MONTH");
                        for (var i = 0; i < dbDataRows.length; i++) {
                            iPCount = dbDataRows[i]["TotalPromoApplied"];
                        }
                    } else if (stPromo.EntitleType == 'Per Promotion' || stPromo.EntitleType == 'PerPromotion' || stPromo.EntitleType == 'Per Invoice' || stPromo.EntitleType == 'PerInvoice' || stPromo.EntitleType == 'Per Order' || stPromo.EntitleType == 'PerOrder') {
                        //qry = "Select ifnull(Sum(PromoCount),0) as TotalPromoApplied from PromoEntitlement where CustNo = " + Ti.App.SQL.safeSQL(Ti.App.CustNo) + " and PromoId = " + Ti.App.SQL.safeSQL(stPromo.PromoId) + "";
                        //dbDataRows = db.execute(qry);
                        //while (dbDataRows.isValidRow()) {
                        //    iPCount = dbDataRows.fieldByName('TotalPromoApplied');
                        //    dbDataRows.next();
                        //}
                        //dbDataRows.close();
                        ParamJS.CustNo = dtorderdate;
                        ParamJS.PromoId == stPromo["PromoId"];
                        dbDataRows = GetQueryString("GET_PROMOTITLE_PER");
                        for (var i = 0; i < dbDataRows.length; i++) {
                            iPCount = dbDataRows[i]["TotalPromoApplied"];
                        }
                    }
                    if (iPCount >= stPromo.Entitle) {
                        continue NextRecord; //break NextRecord;
                    }
                }

                arrGroup = [];
                ipdGroup = {};

                ParamJS.PromoId = stPromo["PromoId"];
                //Select Promotion.PromoId, Promotion.PromoName, Priority, PromoCondition.ItemId, PromoCondition.LineType, PromoCondition.UOM, MinQty, MaxQty, Multiply, Entitle, EntitleType from PromoCondition, Promotion where Promotion.PromoId = PromoCondition.PromoId and (PromoCondition.LineType = 'Item' or PromoCondition.LineType = 'Category') and Promotion.PromoId = 'ADMPDEC21-1'  order by PromoCondition.MinQty desc, Promotion.PromoID desc
                dbDataRows = GetQueryString("GET_PROMOTION_MIN");
                //todo1
                //dbDataRows = GetQueryString1("Select Promotion.PromoId, Promotion.PromoName, Priority, PromoCondition.ItemId, PromoCondition.LineType, PromoCondition.UOM, MinQty, MaxQty, Multiply, Entitle, EntitleType from PromoCondition, Promotion where Promotion.PromoId = PromoCondition.PromoId and (PromoCondition.LineType = 'Item' or PromoCondition.LineType = 'Category') and Promotion.PromoId = 'ADMPDEC21-1'  order by PromoCondition.MinQty desc, Promotion.PromoID desc");
                for (var i = 0; i < dbDataRows.length; i++) {
                    ipdGroup = {};
                    ipdGroup["PromoId"] = dbDataRows[i]["PromoId"];
                    ipdGroup["Priority"] = dbDataRows[i]["Priority"];
                    ipdGroup["ItemId"] = dbDataRows[i]["ItemId"];
                    ipdGroup["UOM"] = dbDataRows[i]["UOM"];
                    ipdGroup["MinQty"] = dbDataRows[i]["MinQty"];
                    ipdGroup["MaxQty"] = dbDataRows[i]["MaxQty"];
                    ipdGroup["Multiply"] = dbDataRows[i]["Multiply"];
                    ipdGroup["LineType"] = dbDataRows[i]["LineType"];
                    ipdGroup["Entitle"] = dbDataRows[i]["Entitle"];
                    ipdGroup["EntitleType"] = dbDataRows[i]["EntitleType"];
                    ipdGroup["MinAmt"] = dbDataRows[i]["MinAmt"];
                    ipdGroup["MaxAmt"] = dbDataRows[i]["MaxAmt"];
                    arrGroup.push(ipdGroup);
                }


                dbDataRows = GetQueryString("GET_PROMOTION_MINLIKE");
                //todo1
                //dbDataRows = GetQueryString1("select Promotion.PromoId, Promotion.PromoName, Priority, PromoCondition.ItemId, shortdesc, PromoCondition.UOM, PromoCondition.MinQty, MaxQty, Multiply, Entitle, EntitleType, PromoCondition.MinAmt as MinAmt, PromoCondition.MaxAmt as MaxAmt, Item.Category from PromoCondition, Promotion, Item where Promotion.PromoId = PromoCondition.PromoId and PromoCondition.ItemId = Item.IteMno and PromoCondition.LineType = 'ITEM' and Promotion.PromoId like 'ADMPP00487'  order by PromoCondition.MinQty desc, Promotion.PromoID desc");
                While1:
                    for (var i = 0; i < dbDataRows.length; i++) {
                        bItemPromo = true;
                        bCondition = false;
                        iPriority = dbDataRows[i]["Priority"];
                        if (dbDataRows[i]["Multiply"] == "Incremental") {
                            bMultiply = true;
                        }
                        iCnt = 1;
                        if (sysUOMType == '2' || sysUOMType == 2) {
                            var sysBaseQtytoBulk = getSystemValue('BaseQtytoBulk');
                            var bsysBaseQtytoBulk = CheckBooleanField(sysBaseQtytoBulk);
                            if (bsysBaseQtytoBulk == true) {
                                //var baseQtyParam = {};
                                ParamJS.UOM = dbDataRows[i]["UOM"];
                                ParamJS.ItemId = dbDataRows[i]["ItemId"];
                                tempOrdqry = GetQueryString("GET_PROMO_BASEQTY");
                            } else {
                                //var baseQtyParam = {};
                                ParamJS.UOM = dbDataRows[i]["UOM"];
                                ParamJS.ItemId = dbDataRows[i]["ItemId"];
                                tempOrdqry = GetQueryString("GET_PROMO_BASEQTYEL");
                            }
                        } else {
                            if ((dbDataRows[i]["MaxQty"] == 0 && dbDataRows[i]["MinQty"] == 0)) {
                                //var tempOrdParam = {};
                                ParamJS.ItemId = dbDataRows[i]["ItemId"];
                                ParamJS.UOM = dbDataRows[i]["UOM"];
                                ParamJS.MinQty = dbDataRows[i]["MinQty"];
                                ParamJS.MaxQty = dbDataRows[i]["MaxQty"];
                                tempOrdqry = GetQueryString("GET_PTEMPORDET");
                            } else {
                                //var tempOrdParam = {};
                                ParamJS.ItemId = dbDataRows[i]["ItemId"];
                                ParamJS.UOM = dbDataRows[i]["UOM"];
                                tempOrdqry = GetQueryString("GET_PTEMPORDETEL");
                                //todo1
                                //tempOrdqry = GetQueryString1("select '1' as Qty,'1' as Priority, '10' as Price,'21' as Amount");

                            }
                        }
                        var tempOrdParse = tempOrdqry;//JSON.parse(tempOrdqry);
                        for (var j = 0; j < tempOrdParse.length; j++) {
                            if ((dbDataRows[i]["MinQty"] > tempOrdParse[j]["Qty"] || dbDataRows[i]["MaxQty"] < tempOrdParse[j]["Qty"]) && (dbDataRows[i]["MinAmt"] > tempOrdParse[j]["Amount"] || dbDataRows[i]["MaxAmt"] < tempOrdParse[j]["Amount"])) {
                                bCondition = false;
                                _obj = {};
                                _obj.PromoId = dbDataRows[i]["PromoId"];
                                _obj.MinQty = dbDataRows[i]["MinQty"];
                                _obj.Priority = dbDataRows[i]["Priority"];
                                _obj.Entitle = dbDataRows[i]["Entitle"];
                                _obj.EntitleType = dbDataRows[i]["EntitleType"];
                                arrPromoList.push(_obj);

                                break While1;
                            } else {
                                var ItemPromotionPriority = getSystemValue('ItemPromotionPriority');
                                ItemPromotionPriority = (ItemPromotionPriority == "" || ItemPromotionPriority == null || ItemPromotionPriority == undefined) ? "" : ItemPromotionPriority;
                                if (dbDataRows[i]["Priority"] > 0) {
                                    if (tempOrdParse[j]["Priority"] < dbDataRows[i]["Priority"]) {
                                        bCondition = false;
                                        break  While1;
                                    }
                                }
                                if (bMultiply == true) {
                                    iMulti = Math.floor(tempOrdParse[j]["Qty"] / dbDataRows[i]["MinQty"]);
                                    iMultiCnt = iMulti;
                                    if (dLastMultiCnt < 0 || (dLastMultiCnt != iMultiCnt && dLastMultiCnt > iMultiCnt)) {
                                        dLastMultiCnt = iMultiCnt;
                                    }
                                }
                                bCondition = true;
                                arrCnt.push(iCnt);
                            }
                            iCnt++;
                        }
                        if (bCondition == false) {
                            break  While1;// While2;
                        }

                    }
                if (bItemPromo == true && bCondition == false) {
                    continue NextRecord; //break NextRecord;
                }
                dPQty = 0;
                var dpromoCondAmt = 0;
                ParamJS.PromoId = stPromo["PromoId"];
                promoTitleParse = GetQueryString("GET_PROMOTION_TITLE");
                //todo1
                //promoTitleParse = GetQueryString1(" Select Promotion.PromoId, Promotion.PromoName, Priority, PromoCondition.ItemId, PromoCondition.UOM, MinQty, MaxQty, Multiply, Entitle, EntitleType, PromoCondition.MinAmt as MinAmt, PromoCondition.MaxAmt as MaxAmt from PromoCondition, Promotion  where Promotion.PromoId = PromoCondition.PromoId and Promotion.PromoId = 'ADMPP00569-S20BOX'  ");
                //qry = "Select Promotion.PromoId, Promotion.PromoName, Priority, PromoCondition.ItemId, PromoCondition.UOM, MinQty, MaxQty, Multiply, Entitle, EntitleType, PromoCondition.MinAmt as MinAmt, PromoCondition.MaxAmt as MaxAmt from PromoCondition, Promotion where Promotion.PromoId = PromoCondition.PromoId and PromoCondition.LineType = 'Category' and Promotion.PromoId = " + Ti.App.SQL.safeSQL(stPromo.PromoId) + " order by PromoCondition.MinQty desc, Promotion.PromoID desc";
                //bCondition = false;
                While2:
                    for (var i = 0; i < promoTitleParse.length; i++) {
                        bCatPromo = true;
                        bCondition = false;
                        dPQty = 0;
                        iPriority = promoTitleParse[i]["Priority"];
                        if (promoTitleParse[i]["Multiply"] == 'Incremental') {
                            bMultiply = true;
                        }
                        iCnt = 1;
                        if (sysUOMType == '2' || sysUOMType == 2) {
                            var sysBaseQtytoBulk = getSystemValue('BaseQtytoBulk');
                            var bsysBaseQtytoBulk = CheckBooleanField(sysBaseQtytoBulk);
                            if (bsysBaseQtytoBulk == true) {
                                //var promoTitleParam = {};
                                ParamJS.UOM = promoTitleParse[i]["UOM"];
                                ParamJS.ItemId = promoTitleParse[i]["ItemId"];
                                promoTemOrdqry = GetQueryString("GET_PROTEMPORD_PRODUCT");

                            } else {
                                //var promoTitleParam = {};
                                ParamJS.UOM = promoTitleParse[i]["UOM"];
                                ParamJS.ItemId = promoTitleParse[i]["ItemId"];
                                promoTemOrdqry = GetQueryString("GET_PROTEMPORD_PRODUCTSL");

                            }
                        } else {
                            //var promoTitleParam = {};
                            ParamJS.ItemId = promoTitleParse[i]["ItemId"];
                            ParamJS.UOM = promoTitleParse[i]["UOM"];
                            promoTemOrdqry = GetQueryString("GET_PROTEMPORD_PRODUCT");
                            //todo1
                            //promoTemOrdqry = GetQueryString1("select '2' as Qty , '1' as Priority,'21'  as Amount");


                        }
                        var promoTemOrdParse = promoTemOrdqry;// JSON.parse(promoTemOrdqry);
                        for (var ij = 0; ij < promoTemOrdParse.length; ij++) {
                            bCondition = true;
                            var _dQty = promoTemOrdParse[ij]["Qty"];
                            _dQty = (_dQty == null || _dQty == undefined || _dQty == '') ? 0 : _dQty;
                            if (promoTemOrdParse[ij]["Priority"].length > 0) {
                                if (promoTemOrdParse[ij]["Priority"] >= promoTitleParse[i]["Priority"]) {
                                    dPQty += parseFloat(_dQty);
                                    arrCnt.push(iCnt);
                                }
                            } else {
                                dPQty += parseFloat(_dQty);
                                arrCnt.push(iCnt);
                            }
                            var _tmpPromoCondAmt = promoTemOrdParse[ij]["Amount"];
                            _tmpPromoCondAmt = (_tmpPromoCondAmt == null || _tmpPromoCondAmt == undefined || _tmpPromoCondAmt == '') ? 0 : _tmpPromoCondAmt;
                            dpromoCondAmt += parseFloat(_tmpPromoCondAmt);
                            iCnt++;
                        }


                        if ((promoTitleParse[i]["MinQty"] > dPQty || promoTitleParse[i]["MaxQty"] < dPQty) && (promoTitleParse[i]["MinAmt"] > dpromoCondAmt || promoTitleParse[i]["MaxAmt"] < dpromoCondAmt)) {
                            bCondition = false;
                            _obj = {};
                            _obj.PromoId = promoTitleParse[i]["PromoId"];
                            _obj.MinQty = promoTitleParse[i]["MinQty"];
                            _obj.Priority = promoTitleParse[i]["Priority"];
                            _obj.Entitle = promoTitleParse[i]["Entitle"];
                            _obj.EntitleType = promoTitleParse[i]["EntitleType"];
                            arrPromoList.push(_obj);
                            break While2;
                        }

                        if (bMultiply == true) {
                            iMulti = Math.floor(dPQty / promoTitleParse[j]["MinQty"]);
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
                    }

                if (bCatPromo == true && bCondition == false) {
                    continue NextRecord; //break NextRecord;
                }


                dPQty = 0;
                dpromoCondAmt = 0;
                ParamJS.PromoId = stPromo["PromoId"];
                promoBrandqry = GetQueryString("GET_PROMOTION_BRAND");
                //todo1
                //promoBrandqry = GetQueryString1("Select Promotion.PromoId, Promotion.PromoName, Priority, PromoCondition.ItemId, PromoCondition.UOM, MinQty, MaxQty, Multiply, Entitle, EntitleType, PromoCondition.MinAmt as MinAmt, PromoCondition.MaxAmt as MaxAmt from PromoCondition, Promotion where Promotion.PromoId = PromoCondition.PromoId and PromoCondition.LineType = 'Brand' and Promotion.PromoId = 'ADMPP00474'  order by PromoCondition.MinQty desc, Promotion.PromoID desc");
                var promoBrandParse = promoBrandqry;//JSON.parse(promoBrandqry);
                While2:
                    for (var i = 0; i < promoBrandParse.length; i++) {
                        bCatPromo = true;
                        bCondition = false;
                        dPQty = 0;
                        iPriority = promoBrandParse[i]["Priority"];
                        if (promoBrandParse[i]["Multiply"] == 'Incremental') {
                            bMultiply = true;
                        }

                        iCnt = 1;
                        if (sysUOMType == '2' || sysUOMType == 2) {
                            var sysBaseQtytoBulk = getSystemValue('BaseQtytoBulk');
                            var bsysBaseQtytoBulk = CheckBooleanField(sysBaseQtytoBulk);
                            if (bsysBaseQtytoBulk == true) {
                                //var promoTitleParam = {};
                                ParamJS.UOM = promoBrandParse[i]["UOM"];
                                ParamJS.ItemId = promoBrandParse[i]["ItemId"];
                                promoTemBrdqry = GetQueryString("GET_PROTEMPORD_BRAND");
                            } else {
                                //var promoTitleParam = {};
                                ParamJS.UOM = promoBrandParse[i]["UOM"];
                                ParamJS.ItemId = promoBrandParse[i]["ItemId"];
                                promoTemBrdqry = GetQueryString("GET_PROTEMPORD_BRANDSL");
                            }
                        } else {
                            // var promoTitleParam = {};
                            ParamJS.UOM = promoBrandParse[i]["UOM"];
                            ParamJS.ItemId = promoBrandParse[i]["ItemId"];
                            promoTemBrdqry = GetQueryString("GET_PROTEMPORD_BRANDCAT");
                            //todo1
                            //promoTemBrdqry = GetQueryString1("select '2' as Qty , '1' as Priority,'21'  as Amount");


                        }
                        var promoTemBrdParse = promoTemBrdqry;// JSON.parse(promoTemBrdqry);
                        for (var j = 0; j < promoTemBrdParse.length; j++) {
                            bCondition = true;
                            var _dQty = promoTemBrdParse[j]["Qty"];
                            _dQty = (_dQty == null || _dQty == undefined || _dQty == '') ? 0 : _dQty;
                            if (promoTemBrdParse[j]["Priority"].length > 0) {
                                if (promoTemBrdParse[j]["Priority"] >= promoBrandParse[i]["Priority"]) {
                                    dPQty += parseFloat(_dQty);
                                    arrCnt.push(iCnt);
                                }
                            } else {
                                dPQty += parseFloat(_dQty);
                                arrCnt.push(iCnt);
                            }
                            var _tmpPromoCondAmt = promoTemBrdParse[i]["Amount"];
                            _tmpPromoCondAmt = (_tmpPromoCondAmt == null || _tmpPromoCondAmt == undefined || _tmpPromoCondAmt == '') ? 0 : _tmpPromoCondAmt;
                            dpromoCondAmt += parseFloat(_tmpPromoCondAmt);
                            iCnt++;
                        }
                        if ((promoBrandParse[i]["MinQty"] > dPQty || promoBrandParse[i]["MaxQty"] < dPQty) && (promoBrandParse[i]["MinAmt"] > dpromoCondAmt || promoBrandParse[i]["MaxAmt"] < dpromoCondAmt)) {
                            bCondition = false;
                            _obj = {};
                            _obj.PromoId = promoBrandParse[i]["PromoId"];
                            _obj.MinQty = promoBrandParse[i]["MinQty"];
                            _obj.Priority = promoBrandParse[i]["Priority"];
                            _obj.Entitle = promoBrandParse[i]["Entitle"];
                            _obj.EntitleType = promoBrandParse[i]["EntitleType"];
                            arrPromoList.push(_obj);
                            break While2;
                        }
                        if (bMultiply == true) {
                            iMulti = Math.floor(dPQty / promoBrandParse[i]["MinQty"]);
                            if (iMulti > iMultiCnt) {
                                iMultiCnt = iMulti;
                            }
                            if (dLastMultiCnt < 0 || (dLastMultiCnt != iMultiCnt && dLastMultiCnt > iMultiCnt)) {
                                dLastMultiCnt = iMultiCnt;
                            }
                        }
                        if (bCondition == false) {
                            break  While2;
                        }
                    }

                if (bCatPromo == true && bCondition == false) {
                    continue NextRecord; //break NextRecord;
                }

                if (bModelPromotion == true) {
                    dPQty = 0;
                    dpromoCondAmt = 0;
                    var promoModelParam = {};
                    ParamJS.PromoId = stPromo["PromoId"];
                    promoModelqry = GetQueryString("GET_PROMOTION_MODEL");

                    //todo1
                    //promoModelqry = GetQueryString1("   Select Promotion.PromoId, Promotion.PromoName, Priority, PromoCondition.ItemId, PromoCondition.UOM, MinQty, MaxQty, Multiply, Entitle, EntitleType, PromoCondition.MinAmt as MinAmt, PromoCondition.MaxAmt as MaxAmt from PromoCondition, Promotion where Promotion.PromoId = PromoCondition.PromoId and Promotion.PromoId = 'NOVADMPP00417'  ");

                    var promoModelParse = promoModelqry;// JSON.parse(promoModelqry);
                    While2:
                        for (var i = 0; i < promoModelParse.length; i++) {
                            bCatPromo = true;
                            bCondition = false;
                            dPQty = 0;
                            iPriority = promoModelParse[i]["Priority"];
                            if (promoModelParse[i]["Multiply"] == 'Incremental') {
                                bMultiply = true;
                            }

                            iCnt = 1;
                            if (sysUOMType == '2' || sysUOMType == 2) {
                                var sysBaseQtytoBulk = getSystemValue('BaseQtytoBulk');
                                var bsysBaseQtytoBulk = CheckBooleanField(sysBaseQtytoBulk);
                                if (bsysBaseQtytoBulk == true) {
                                    //var promoSaleParam = {};
                                    ParamJS.UOM = promoModelParse[i]["UOM"];
                                    ParamJS.ItemId = promoModelParse[i]["ItemId"];
                                    promoTemSaleqry = GetQueryString("GET_PROTEMPORD_MODEL");
                                } else {
                                    var promoSaleParam = {};
                                    ParamJS.UOM = promoModelParse[i]["UOM"];
                                    ParamJS.ItemId = promoModelParse[i]["ItemId"];
                                    promoTemSaleqry = GetQueryString("GET_PROTEMPORD_MODELSL");
                                }
                            } else {
                                //var promoSaleParam = {};
                                ParamJS.UOM = promoModelParse[i]["UOM"];
                                ParamJS.ItemId = promoModelParse[i]["ItemId"];
                                promoTemSaleqry = GetQueryString("GET_PROTEMPORD_MODELCAT");
                                //todo1
                                //promoTemSaleqry = GetQueryString1(" select '2' as Qty , '1' as Priority,'21'  as Amount");
                            }
                            var promoTemSaleParse = promoTemSaleqry;// JSON.parse(promoTemSaleqry);
                            for (var j = 0; j < promoTemSaleParse.length; j++) {
                                bCondition = true;
                                var _dQty = promoTemSaleParse[j]["Qty"];
                                _dQty = (_dQty == null || _dQty == undefined || _dQty == '') ? 0 : _dQty;
                                if (promoTemSaleParse[j]["Priority"].length > 0) {
                                    if (promoTemSaleParse[j]["Priority"] >= promoModelParse[i]["Priority"]) {
                                        dPQty += parseFloat(_dQty);
                                        arrCnt.push(iCnt);
                                    }
                                } else {
                                    dPQty += parseFloat(_dQty);
                                    arrCnt.push(iCnt);
                                }
                                var _tmpPromoCondAmt = promoTemSaleParse[j]["Amount"];
                                _tmpPromoCondAmt = (_tmpPromoCondAmt == null || _tmpPromoCondAmt == undefined || _tmpPromoCondAmt == '') ? 0 : _tmpPromoCondAmt;
                                dpromoCondAmt += parseFloat(_tmpPromoCondAmt);
                                iCnt++;
                            }
                            if ((promoModelParse[i]["MinQty"] > dPQty || promoModelParse[i]["MaxQty"] < dPQty) && (promoModelParse[i]["MinAmt"] > dpromoCondAmt || promoModelParse[i]["MaxAmt"] < dpromoCondAmt)) {
                                bCondition = false;
                                _obj = {};
                                _obj.PromoId = promoModelParse[i]["PromoId"];
                                _obj.MinQty = promoModelParse[i]["MinQty"];
                                _obj.Priority = promoModelParse[i]["Priority"];
                                _obj.Entitle = promoModelParse[i]["Entitle"];
                                _obj.EntitleType = promoModelParse[i]["EntitleType"];
                                arrPromoList.push(_obj);
                                break While2;
                            }
                            if (bMultiply == true) {
                                iMulti = Math.floor(dPQty / promoModelParse[i]["MinQty"]);
                                if (iMulti > iMultiCnt) {
                                    iMultiCnt = iMulti;
                                }
                                if (dLastMultiCnt < 0 || (dLastMultiCnt != iMultiCnt && dLastMultiCnt > iMultiCnt)) {
                                    dLastMultiCnt = iMultiCnt;
                                }
                            }
                            if (bCondition == false) {
                                break  While2;
                            }

                        }
                    if (bCatPromo == true && bCondition == false) {
                        continue NextRecord; //break NextRecord;
                    }
                }

                dpromoCondAmt = 0;
                bPromoGroup = false;
                //var promoGroupParam = {};
                ParamJS.PromoId = stPromo["PromoId"];
                promoGroupqry = GetQueryString("GET_PROMOTION_GROUP");
                //todo1
                //promoGroupqry = GetQueryString1(" Select Promotion.PromoId, Promotion.PromoName, Priority,Multiply,PromoCondition.ItemId, PromoCondition.UOM, MinQty, MaxQty, isnull(PromoCondition.MinAmt,0) as MinAmt, isnull(PromoCondition.MaxAmt,0) as MaxAmt, isnull('','') as GroupPromo from PromoCondition INNER JOIN Promotion ON Promotion.PromoId = PromoCondition.PromoId where Promotion.PromoId = PromoCondition.PromoId   and Promotion.PromoId = 'NOVADMPP00417'  ");
                var promoGroupParse = promoGroupqry;// JSON.parse(promoGroupqry);
                While1:
                    for (var i = 0; i < promoGroupParse.length; i++) {
                        if (promoGroupParse[i]["Multiply"] == 'Incremental') {
                            bMultiply = true;
                        }
                        bPromoGroup = true;
                        bCondition = false;
                        if (bModelPromotion == true) {
                            //var promoGroProParam = {};
                            ParamJS.ItemId = promoGroupParse[i]["ItemId"];
                            ParamJS.GroupPromo = promoGroupParse[i]["GroupPromo"];
                            ParamJS.PromoId = promoGroupParse[i]["PromoId"];
                            ParamJS.Priority = promoGroupParse[i]["Priority"];
                            ParamJS.UOM = promoGroupParse[i]["UOM"];
                            ParamJS.CustNo = sysCustomerID;// CustNo;
                            promoGroProqry = GetQueryString("GET_PROMOTION_GROUPROMO");
                        } else {
                            //var promoGroProParam = {};
                            ParamJS.ItemId = promoGroupParse[i]["ItemId"];
                            ParamJS.GroupPromo = promoGroupParse[i]["GroupPromo"];
                            ParamJS.PromoId = promoGroupParse[i]["PromoId"];
                            ParamJS.Priority = promoGroupParse[i]["Priority"];
                            ParamJS.UOM = promoGroupParse[i]["UOM"];
                            ParamJS.CustNo = sysCustomerID;// CustNo;
                            promoGroProqry = GetQueryString("GET_PROMOTION_GROUPROMOE");
                            //todo1
                            //promoGroProqry = GetQueryString1("select '11' as Qty, '10'  as amount , '12'  as TmpAmt, '11' as TmpQty, '2'  as InvAmt , '23'  as InvQty");

                        }
                        var promoGroProParse = promoGroProqry;//JSON.parse(promoGroProqry);
                        //for (var j = 0; j < promoGroProParse.length; j++) {
                        //    if (promoGroProParse[j]["MinQty"] > promoGroProParse[j]["Qty"] || (promoGroProParse[j]["MaxQty"] > 0 && promoGroProParse[j]["MaxQty"] < promoGroProParse[j]["Qty"]) || promoGroProParse[j]["MinAmt"] > promoGroProParse[j]["amount"] || (promoGroProParse[j]["MaxAmt"] > 0 && promoGroProParse[j]["MaxAmt"] < promoGroProParse[j]["amount"])) {
                        //        bCondition = false;
                        //        _obj = {};
                        //        _obj.PromoId = promoGroProParse[j]["PromoId"];
                        //        _obj.MinQty = promoGroProParse[j]["MinQty"];
                        //        _obj.Priority = promoGroProParse[j]["Priority"];
                        //        _obj.Entitle = promoGroProParse[j]["Entitle"];
                        //        _obj.EntitleType = promoGroProParse[j]["EntitleType"];
                        //        break; //While2;

                        //    } else {
                        //        if (bMultiply == true) {
                        //            iMulti = Math.floor(promoGroProParse[j]["Qty"] / promoGroProParse[j]["MinQty"]);
                        //            iMultiCnt = iMulti;
                        //        }
                        //        if (dLastMultiCnt < 0 || (dLastMultiCnt != iMultiCnt && dLastMultiCnt > iMultiCnt)) {
                        //            dLastMultiCnt = iMultiCnt;
                        //        }
                        //    }
                        //}


                        for (var iq = 0; iq < promoGroProParse.length; iq++) {
                            if (promoGroupParse[i]["MinQty"] > promoGroProParse[iq]["Qty"] || (promoGroupParse[i]["MaxQty"] > 0 && promoGroupParse[i]["MaxQty"] < promoGroProParse[iq]["Qty"]) || promoGroupParse[i]["MinAmt"] > promoGroProParse[iq]["amount"] || (promoGroupParse[i]["MaxAmt"] > 0 && promoGroupParse[i]["MaxAmt"] < promoGroProParse[iq]["amount"])) {
                                bCondition = false;
                                _obj = {};
                                _obj.PromoId = promoGroupParse[i]["PromoId"];
                                _obj.MinQty = promoGroupParse[i]["MinQty"];
                                _obj.Priority = promoGroupParse[i]["Priority"];
                                _obj.Entitle = promoGroupParse[i]["Entitle"];
                                _obj.EntitleType = promoGroupParse[i]["EntitleType"];
                                // break;// While2;
                                break While1;

                            } else {
                                if (bMultiply == true) {
                                    iMulti = Math.floor(promoGroProParse[iq]["Qty"] / promoGroupParse[i]["MinQty"]);
                                    iMultiCnt = iMulti;
                                }
                                if (dLastMultiCnt < 0 || (dLastMultiCnt != iMultiCnt && dLastMultiCnt > iMultiCnt)) {
                                    dLastMultiCnt = iMultiCnt;
                                }
                                bCondition = true;
                            }
                        }


                        if (bCondition == false) {
                            break  While1;
                        }
                    }
                if (bPromoGroup == true && bCondition == false) {
                    continue NextRecord; //break NextRecord;
                }
                if (bCondition == true) {
                    var sysCheckPromoAf = getSystemValue('CheckPromoAfterSave');
                    var CheckPromoAfterSave = CheckBooleanField(sysCheckPromoAf);
                    bPromo = true;
                    if (dLastMultiCnt > 0) {
                        iMultiCnt = dLastMultiCnt;
                    }
                    if (stPromo.Entitle > 0) {
                        if (iPCount + iMultiCnt > stPromo.Entitle) {
                            iMultiCnt = stPromo.Entitle - iPCount;
                        }
                    }
                    //var promoCondParam = {};
                    ParamJS.PromoId = stPromo["PromoId"];
                    promoCondqry = GetQueryString("GET_PROMOTION_COND");

                    //todo1
                    //promoCondqry = GetQueryString1("select PromoCondition.PromoId, PromoCondition.Itemid, PromoCondition.LineType, Promotion.Priority as Priority from PromoCondition INNER JOIN Promotion ON Promotion.PromOId = PromoCondition.PromoId  where Promotion.promoid = 'NOVADMPP00417'  ");
                    var promoCondParse = promoCondqry;// JSON.parse(promoCondqry);
                    for (var i = 0; i < promoCondParse.length; i++) {
                        var sUpdatePromoIdQry = "";
                        if (bModelPromotion == true) {
                            var query = "update TempOrderDet SET PromoID = (CASE WHEN (Isnull(PromoID,'') = '' OR Isnull(PromoID,'') = '" + promoCondParse[i]["PromoId"] + "') THEN  '" + promoCondParse[i]["PromoId"] + "' ELSE  PromoID +','+ '" + promoCondParse[i]["PromoId"] + "' END),   Priority ='" + CheckDecimal(promoCondParse[i]["Priority"]) + "' WHERE SalesType = 'S' and CASE WHEN Isnull(Priority,'') = '' THEN 999 ELSE  Priority END >= cast('" + CheckDecimal(promoCondParse[i]["Priority"]) + "'  as int) and CASE WHEN ('" + promoCondParse[i]["LineType"] + "' = 'Item') THEN case when ItemId ='" + promoCondParse[i]["ItemId"] + "' then CASE WHEN ('" + promoCondParse[i]["LineType"] + "' = 'Promotion Group') THEN case when ItemId in (Select ItemId from PromoGroup WHERE GroupId = '" + promoCondParse[i]["Itemid"] + "' and (Isnull(LineType,'') = '' OR Isnull(LineType,'') = 'Item') UNION Select Item.ItemNo from PromoGroup INNER JOIN Item on Item.Brand = PromoGroup.ItemId WHERE GroupId = '" + promoCondParse[i]["Itemid"] + "'         and  Isnull(LineType,'') = 'Brand' UNION Select Item.ItemNo from PromoGroup INNER JOIN Item on Item.CategoryId = PromoGroup.ItemId  WHERE GroupId ='" + promoCondParse[i]["Itemid"] + "' and Isnull(LineType,'') = 'Category' UNION Select Item.ItemNo from PromoGroup INNER JOIN Item on Item.Model = PromoGroup.ItemId  WHERE GroupId = '" + promoCondParse[i]["Itemid"] + "' and Isnull(LineType,'') = 'Model') then                         CASE WHEN ('" + promoCondParse[i]["LineType"] + "' = 'Category') THEN case when ItemId in (Select ItemNo from Item WHERE categoryId ='" + promoCondParse[i]["Itemid"] + "')then CASE WHEN ( '" + promoCondParse[i]["LineType"] + "' = 'Brand') THEN case when ItemId in (Select ItemNo from Item WHERE Brand = '" + promoCondParse[i]["Itemid"] + "') then case when ItemId ='" + promoCondParse[i]["Itemid"] + "' then 1 else 0  END END END END END END END END END=1";
                            // var query = "update TempOrderDet SET PromoID = (CASE WHEN (ifnull(PromoID,'') = '' OR ifnull(PromoID,'') = '" + promoCondParse[i]["PromoId"] + "') THEN  '" + promoCondParse[i]["PromoId"] + "' ELSE  PromoID ||','|| '" + promoCondParse[i]["PromoId"] + "' END), Priority ='" + CheckDecimal(promoCondParse[i]["Priority"]) + "' WHERE SalesType = 'S' and CASE WHEN ifnull(Priority,'') = '' THEN 999 ELSE  Priority END >= cast('" + CheckDecimal(promoCondParse[i]["Priority"]) + "'  as int) and CASE WHEN ('" + promoCondParse[i]["LineType"] + "' = 'Item') THEN ItemId ='" + promoCondParse[i]["ItemId"] + "' ELSE CASE WHEN ('" + promoCondParse[i]["LineType"] + "' = 'Promotion Group') THEN ItemId in (Select ItemId from PromoGroup WHERE GroupId = '" + promoCondParse[i]["Itemid"] + "' and (ifnull(LineType,'') = '' OR ifnull(LineType,'') = 'Item') UNION Select Products.ItemId from PromoGroup                 INNER JOIN Products on Products.Brand = PromoGroup.ItemId WHERE GroupId = '" + promoCondParse[i]["Itemid"] + "' and  ifnull(LineType,'') = 'Brand' UNION Select Products.ItemId from PromoGroup INNER JOIN Products on Products.CategoryId = PromoGroup.ItemId  WHERE GroupId ='" + promoCondParse[i]["Itemid"] + "' and ifnull(LineType,'') = 'Category' UNION Select Products.ItemId from PromoGroup INNER JOIN Products on Products.Model = PromoGroup.ItemId  WHERE GroupId = '" + promoCondParse[i]["Itemid"] + "' and ifnull(LineType,'') = 'Model') ELSE CASE WHEN ('" + promoCondParse[i]["LineType"] + "' = 'Category') THEN ItemId in (Select ItemId from Products WHERE categoryId ='" + promoCondParse[i]["Itemid"] + "')ELSE CASE WHEN ( '" + promoCondParse[i]["LineType"] + "' = 'Brand') THEN ItemId in (Select ItemId from Products WHERE Brand = '" + promoCondParse[i]["Itemid"] + "')ELSE ItemId ='" + promoCondParse[i]["Itemid"] + "'  END END END END";
                            var obj = execute(query); //app.ExecuteSQL(query);
                        } else {
                            //var query = "update TempOrderDet SET PromoID = (CASE WHEN (Isnull(PromoID,'') = '' OR Isnull(PromoID,'') = '" + promoCondParse[i]["PromoId"] + "') THEN  '" + promoCondParse[i]["PromoId"] + "' ELSE  CASE WHEN (select count(*) from (select '''' + replace(Isnull(PromoID,''),',',''',''') + '''' as Promo )  a  where Promo like '%'''" + promoCondParse[i]["PromoId"] + "' ''%') > 0 then Isnull(PromoID,'') else PromoID +','+ '" + promoCondParse[i]["PromoId"] + "' END END) , Priority ='" + CheckDecimal(promoCondParse[i]["Priority"]) + "'    WHERE SalesType = 'S' and CASE WHEN Isnull(Priority,'') = '' THEN 999 ELSE  Priority END >= cast('" + CheckDecimal(promoCondParse[i]["Priority"]) + "' as int) and CASE WHEN ( '" + promoCondParse[i]["LineType"] + "' = 'Item') THEN case when ItemId = '" + promoCondParse[i]["LineType"] + "' then CASE WHEN ( '" + promoCondParse[i]["LineType"] + "' = 'Promotion Group') THEN case when ItemId in (Select ItemId from PromoGroup WHERE GroupId ='" + promoCondParse[i]["Itemid"] + "' and (Isnull(LineType,'') = '' OR Isnull(LineType,'') = 'Item') UNION Select Item.ItemNo from PromoGroup INNER JOIN Item on Item.Brand = PromoGroup.ItemId WHERE GroupId = '" + promoCondParse[i]["Itemid"] + "' and  Isnull(LineType,'') = 'Brand' UNION Select Item.ItemNo from PromoGroup INNER JOIN Item on Item.CategoryId = PromoGroup.ItemId  WHERE GroupId ='" + promoCondParse[i]["Itemid"] + "' and Isnull(LineType,'') = 'Category') then CASE WHEN ('" + promoCondParse[i]["LineType"] + "'= 'Category') THEN case when ItemId in (Select ItemNo from Item WHERE categoryId = '" + promoCondParse[i]["Itemid"] + "') then CASE WHEN ( '" + promoCondParse[i]["LineType"] + "'= 'Brand') THEN case when ItemId in (Select ItemNo from Item WHERE Brand ='" + promoCondParse[i]["Itemid"] + "') then case when ItemId ='" + promoCondParse[i]["Itemid"] + "' then 1 else 0 END END END END END END END END END=1";
                           // var query = "	UPDATE TempOrderDet SET PromoID = CASE WHEN ISNULL(PromoID, '') = '' OR ISNULL(PromoID, '') = '" + promoCondParse[i]["PromoId"] + "' THEN '" + promoCondParse[i]["PromoId"] + "' ELSE CASE WHEN (SELECT COUNT(*) FROM (SELECT '''' + REPLACE(ISNULL(PromoID,''), ',', ''',''') + '''' AS Promo) a WHERE Promo LIKE '%" + promoCondParse[i]["PromoId"] + "%') > 0 THEN ISNULL(PromoID, '') ELSE PromoID + ',' + '" + promoCondParse[i]["PromoId"] + "' END END,Priority = '1' where SalesType = 'S' AND ISNULL(CAST(Priority AS INT), 999) >= 1 AND ItemId IN (SELECT ItemId FROM PromoGroup WHERE GroupId = '" + promoCondParse[i]["ItemId"] + "' AND (ISNULL(LineType, '') = '' OR ISNULL(LineType, '') = 'Item') UNION SELECT Item.ItemNo FROM PromoGroup INNER JOIN Item ON Item.Brand = PromoGroup.ItemId WHERE GroupId ='" + promoCondParse[i]["ItemId"] + "' AND ISNULL(LineType, '') = 'Brand' UNION SELECT Item.ItemNo FROM PromoGroup INNER JOIN Item ON Item.ItemNo = PromoGroup.ItemId WHERE GroupId = '" + promoCondParse[i]["ItemId"] + "' AND ISNULL(LineType, '') = 'Category' UNION SELECT ItemId FROM PromoCondition WHERE PromoId = '" + promoCondParse[i]["PromoId"] + "' AND (ISNULL(LineType, '') = '' OR ISNULL(LineType, '') = 'Item')";
                            var query = "UPDATE TempOrderDet SET PromoID = CASE WHEN ISNULL(PromoID, '') = '' OR ISNULL(PromoID, '') = '" + promoCondParse[i]["PromoId"] + "' THEN '" + promoCondParse[i]["PromoId"] + "' ELSE CASE WHEN (SELECT COUNT(*) FROM (SELECT '''' + REPLACE(ISNULL(PromoID,''), ',', ''',''') + '''' AS Promo) a WHERE Promo LIKE '%" + promoCondParse[i]["PromoId"] + "%') > 0 THEN ISNULL(PromoID, '') ELSE PromoID + ',' + '" + promoCondParse[i]["PromoId"] + "' END END, Priority = '1' where SalesType = 'S' AND ISNULL(CAST(Priority AS INT), 999) >= 1 AND ItemId IN (SELECT ItemId FROM PromoGroup WHERE GroupId = '" + promoCondParse[i]["ItemId"] + "' AND (ISNULL(LineType, '') = '' OR ISNULL(LineType, '') = 'Item') UNION  SELECT Item.ItemNo FROM PromoGroup INNER JOIN Item ON Item.Brand = PromoGroup.ItemId WHERE GroupId = '" + promoCondParse[i]["ItemId"] + "' AND ISNULL(LineType, '') = 'Brand' UNION SELECT Item.ItemNo FROM PromoGroup INNER JOIN Item ON Item.ItemNo = PromoGroup.ItemId WHERE GroupId = '" + promoCondParse[i]["ItemId"] + "' AND ISNULL(LineType, '') = 'Category' UNION SELECT ItemId FROM PromoCondition WHERE PromoId = '" + promoCondParse[i]["PromoId"] + "' AND (ISNULL(LineType, '') = '' OR ISNULL(LineType, '') = 'Item'))";
                            //var query = "update TempOrderDet SET PromoID = (CASE WHEN (ifnull(PromoID,'') = '' OR ifnull(PromoID,'') = '" + promoCondParse[i]["PromoId"] + "') THEN  '" + promoCondParse[i]["PromoId"] + "' ELSE  CASE WHEN (select count(*) from (select '''' || replace(ifnull(PromoID,''),',',''',''') || '''' as Promo ) a  where Promo like '%'''" + promoCondParse[i]["PromoId"] + "' ''%') > 0 then ifnull(PromoID,'') else PromoID ||','|| '" + promoCondParse[i]["PromoId"] + "' END END) , Priority ='" + CheckDecimal(promoCondParse[i]["Priority"]) + "' WHERE SalesType = 'S' and CASE WHEN ifnull(Priority,'') = '' THEN 999 ELSE  Priority END >= cast('" + CheckDecimal(promoCondParse[i]["Priority"]) + "' as int) and CASE WHEN ( '" + promoCondParse[i]["LineType"] + "' = 'Item') THEN ItemId = '" + promoCondParse[i]["Itemid"] + "' ELSE CASE WHEN ( '" + promoCondParse[i]["LineType"] + "' = 'Promotion Group') THEN ItemId in (Select ItemId from PromoGroup WHERE GroupId ='" + promoCondParse[i]["Itemid"] + "' and (ifnull(LineType,'') = '' OR ifnull(LineType,'') = 'Item') UNION Select Products.ItemId from PromoGroup INNER JOIN Products on Products.Brand = PromoGroup.ItemId WHERE GroupId = '" + promoCondParse[i]["Itemid"] + "' and  ifnull(LineType,'') = 'Brand' UNION Select Products.ItemId from PromoGroup INNER JOIN Products on Products.CategoryId = PromoGroup.ItemId  WHERE GroupId ='" + promoCondParse[i]["Itemid"] + "' and ifnull(LineType,'') = 'Category') ELSE CASE WHEN ('" + promoCondParse[i]["LineType"] + "'= 'Category') THEN ItemId in (Select ItemId from Products WHERE categoryId = '" + promoCondParse[i]["Itemid"] + "' ELSE CASE WHEN ( '" + promoCondParse[i]["LineType"] + "'= 'Brand') THEN ItemId in (Select ItemId from Products WHERE Brand ='" + promoCondParse[i]["Itemid"] + "') ELSE ItemId ='" + promoCondParse[i]["Itemid"] + "' END END END END";
                            var obj = execute(query); //app.ExecuteSQL(query);
                        }
                        if (CheckPromoAfterSave == false) {
                            //Ti.App.ARRAYOPERATION.updateColumnData(0, Ti.App.dPromoItemRowIndex, "Promotion", promoCondParse[i]["PromoId"]);
                            updatePromotion(promoCondParse[i]["PromoId"]);
                        }
                    }
                    arrItemIndex = [];
                    try {//todo1
                        if (CheckPromoAfterSave == false) {
                            /*var rowlength = Ti.App.ARRAYOPERATION.getAllRows(0).length;
                            var iRowCnt = Ti.App.COMMON.getRowIndex();
                            arrItemIndex.push("-");
                            for(var ctr = iRowCnt; ctr < rowlength; ctr++)
                            {
                                arrItemIndex.push(Ti.App.ARRAYOPERATION.getColumnData(0, ctr, 'Itemid'));
                            }*/
                        }
                        
                        var flg=confirmPromotion();

                        if(flg == true)
                        ApplyPromotion(stPromo.PromoId, iMultiCnt, sitemid, sysCustomerID);

                        bCondition = false;

                    } catch (e) {

                    }
                }
                if (bCondition == true) {
                    bPromo = true;
                    if (stPromo.Entitle > 0) {
                        if (iPCount + iMultiCnt > stPromo.Entitle) {
                            iMultiCnt = stPromo.Entitle - iPCount;
                        }
                    }
                    //var promOfferParam = {};
                    ParamJS.PromoId = stPromo["PromoId"];
                    promoOfferqry = GetQueryString("GET_PROMOFFER");

                    //todo1
                    //promoOfferqry = GetQueryString1("select distinct promooffer.Itemid,promoid from promogroup, promooffer where promooffer.Itemid = PromoGroup.GroupId and promoid = 'ADMPP00425-2'  ");

                    var promOfferParse = promoOfferqry;// JSON.parse(promoOfferqry);
                    for (var i = 0; i < promOfferParse.length; i++) {
                        bPromoGroup = true;
                    }
                    if (bPromoGroup == true || bCatPromo == true) {
                        sSelectedItem = '';
                        bCheckDataExists = false;
                        //if (true) {//todo1
                        if (CheckData("Select PromoOffer.FocQty, PromoOffer.ItemID from PromoOffer where PromoID = '" + stPromo["PromoId"] + "'")) {
                            //var promGroupParam = {};
                            ParamJS.PromoId = stPromo["PromoId"];
                            promGroupqry = GetQueryString("GET_PROMOGROUP");

                            //todo1
                            // promGroupqry = GetQueryString1("Select PromoGroup.ItemID,Item.BaseUOM, Item.ShortDesc as [Description] from PromoGroup INNER JOIN Item ON PromoGroup.ItemID = Item.ItemNo where PromoGroup.GroupID in (Select ItemID from PromoOffer where PromoID =  'NOVADMPP00417')  ");

                            var promGroupParse = promGroupqry;// JSON.parse(promGroupqry);
                            for (var i = 0; i < promGroupParse.length; i++) {
                                bCheckDataExists = true;
                                if (sSelectedItem == '') {
                                    sSelectedItem = "" + promGroupParse[i]["ItemID"] + "";
                                }
                                else {
                                    sSelectedItem = sSelectedItem + "," + promGroupParse[i]["ItemID"] + "";
                                }
                            }
                        }
                        if (bCheckDataExists == true) {
                            //var promProductParam = {};
                            ParamJS.selectItem = sSelectedItem;
                            ParamJS.PromoId = stPromo["PromoId"];
                            promProductqry = GetQueryString("GET_PROMOPROSELECT");

                            //todo1
                            // promProductqry = GetQueryString1("Select PromoOffer.Reason, PromoOffer.LineType, isnull(PromoOffer.DisCalc,'') as DisCalc, Item.Itemname, Item.ItemNo as ItemId, CASE When PackSize is null then '0' else PackSize END as PackSize, shortdesc,PromoOffer.Uom as UOM, PromoOffer.FOcQty,PromoOffer.DisPrice, PromoOffer.Discount, Category as CategoryId, PromoOffer.ItemID as PromoGroup from PromoOffer, Item where Item.ItemNo in ('650002') and  PromoID ='NOVADMPP00417'   order by LineType, PromoOffer.ItemId, FocQty, DisPrice, discount, Discalc");

                        } else {
                            //var promProductParam = {};
                            ParamJS.PromoId = stPromo["PromoId"];
                            promProductqry = GetQueryString("GET_PROMOPRO");

                        }
                    } else {
                        //var promProductParam = {};
                        ParamJS.PromoId = stPromo["PromoId"];
                        promProductqry = GetQueryString("GET_PROMOPROEL");
                    }
                    var promProductParse = promProductqry;//JSON.parse(promProductqry);
                    for (var i = 0; i < promProductParse.length; i++) {
                        if (promProductParse[i]["FOcQty"] > 0) {
                            LVItem = null;
                            LVItem = {};
                            LVItem["PromoType"] = "FOCQTY";
                            LVItem["ItemId"] = promProductParse[i]["ItemId"];
                            LVItem["OType"] = 'FOC';
                            LVItem["ItemName"] = promProductParse[i]["Itemname"];
                            if (bBulkUomPrice == true) {
                                LVItem["UOM"] = PromoItemBulkUOM;//dbApplyPromoData.fieldByName('UOM');
                            } else {
                                LVItem["UOM"] = promProductParse[i]["UOM"];
                            }
                            LVItem["Qty"] = Math.floor(iMultiCnt * parseFloat(promProductParse[i]["FOcQty"]));
                            if (bEnableFOCPrice == true) {
                                //todo1
                                //if (true) {
                                //var price = getPrice(promProductParse[i]["ItemId"], promProductParse[i]["UOM"], Math.floor(iMultiCnt * parseFloat(promProductParse[i]["FOcQty"])), 1, promProductParse[i]["UOM"], Ti.App.ARRAYOPERATION.getCustFieldValue('PriceGroup'), false);
                                var price = getPrice(promProductParse[i]["ItemId"], promProductParse[i]["UOM"], Math.floor(iMultiCnt * parseFloat(promProductParse[i]["FOcQty"])), 1, promProductParse[i]["UOM"], custDet[0]["PriceGroup"], false); //Ti.App.ARRAYOPERATION.getCustFieldValue('PriceGroup')                            var amt = price * Math.floor(iMultiCnt * parseFloat(promProductParse[i]["FOcQty"]));
                                var amt = price * Math.floor(iMultiCnt * parseFloat(promProductParse[i]["FOcQty"]));
                                LVItem["Price"] = price;
                                LVItem["Amount"] = amt;
                            } else {
                                LVItem["Price"] = 0;
                                LVItem["Amount"] = 0;
                            }
                            LVItem["Reason"] = promProductParse[i]["Reason"];
                            LVItem["DisPrice"] = 0;
                            LVItem["Promotion"] = stPromo.PromoId;
                            LVItem["Priority"] = iPriority;//0;//iPriority
                            LVItem["Category"] = promProductParse[i]["CategoryId"];
                            LVItem["shortdesc"] = promProductParse[i]["shortdesc"];
                            LVItem["PromoCount"] = iMultiCnt;
                            LVItem["LineType"] = promProductParse[i]["LineType"];
                            LVItem["DisCalc"] = promProductParse[i]["DisCalc"];
                            LVItem["PromoId"] = stPromo.PromoId;
                            newOrdItems.push(LVItem);
                        } else if (promProductParse[i]["DisPrice"] > 0) {
                            var sCategoryID = '';
                            tempOrderDetqry = GetQueryString("GET_TEMPORDERET");
                            var tempOrderDetParse = tempOrderDetqry;// JSON.parse(tempOrderDetqry);
                            for (var j = 0; j < tempOrderDetParse.length; j++) {
                                //var getProductParam = {};
                                ParamJS.ItemId = tempOrderDetParse[j]["ItemId"];
                                getProductqry = GetQueryString("GET_PRODUCT");
                                var getProductParse = getProductqry;//JSON.parse(getProductqry);
                                for (var k = 0; k < getProductParse.length; k++) {
                                    sCategoryID = getProductParse[k]["CategoryID"];
                                }
                                var dbUOM = tempOrderDetParse[j]["UOM"];
                                if (bBulkUomPrice == true) {
                                    dbUOM = PromoItemBulkUOM;
                                }
                                if ((promProductParse[i]["ItemId"] == tempOrderDetParse[j]["ItemId"] || promProductParse[i]["ItemId"] == sCategoryID) && promProductParse[i]["UOM"] == dbUOM) {
                                    var price = getPrice(tempOrderDetParse[j]["ItemId"], promProductParse[i]["UOM"], CheckDecimal(tempOrderDetParse[j]["Qty"]), 1, promProductParse[i]["UOM"], getCustFieldValue('PriceGroup'), false);
                                    LVItem = null;
                                    LVItem = {};
                                    LVItem["PromoType"] = "DisPrice";
                                    LVItem["Price"] = price;
                                    LVItem["Amount"] = (LVItem["Price"] - promProductParse[i]["DisPrice"]) * tempOrderDetParse[j]["Qty"];
                                    LVItem["Qty"] = tempOrderDetParse[j]["Qty"];
                                    LVItem["DisPrice"] = promProductParse[i]["DisPrice"];
                                    LVItem["Promotion"] = stPromo.PromoId;
                                    LVItem["ItemId"] = tempOrderDetParse[j]["ItemId"];
                                    LVItem["PromoCount"] = 1;
                                    LVItem["Priority"] = iPriority;
                                    if (bBulkUomPrice == true) {
                                        LVItem["UOM"] = tempOrderDetParse[j]["UOM"];
                                    } else {
                                        LVItem["UOM"] = promProductParse[i]["UOM"];
                                    }
                                    LVItem["LineType"] = promProductParse[i]["LineType"];
                                    LVItem["DisCalc"] = promProductParse[i]["DisCalc"];
                                    LVItem["PromoId"] = stPromo.PromoId;
                                    newOrdItems.push(LVItem);
                                }
                            }
                        } else if (promProductParse[i]["Discount"] > 0) {
                            var sCategoryID = '';
                            tempOrderDetqry = GetQueryString("GET_TEMPORDERET", "");
                            var tempOrderDetParse = tempOrderDetqry;//JSON.parse(tempOrderDetqry);
                            for (var j = 0; j < tempOrderDetParse.length; j++) {
                                //var getProductParam = {};
                                ParamJS.ItemId = tempOrderDetParse[j]["ItemId"];
                                getProductqry = GetQueryString("GET_PRODUCT");
                                var getProductParse = getProductqry;// JSON.parse(getProductqry);
                                for (var k = 0; k < getProductParse.length; k++) {
                                    sCategoryID = getProductParse[k]["CategoryID"];
                                }
                                var dbUOM = tempOrderDetParse[j]["UOM"];
                                if (bBulkUomPrice == true) {
                                    //dbUOM = Ti.App.PromoItemBulkUOM;
                                    dbUOM = PromoItemBulkUOM;
                                }
                                if ((promProductParse[i]["ItemId"] == tempOrderDetParse[j]["ItemId"] || promProductParse[i]["ItemId"] == sCategoryID) && promProductParse[i]["UOM"] == dbUOM) {
                                    var price = getPrice(tempOrderDetParse[j]["ItemId"], promProductParse[i]["UOM"], CheckDecimal(tempOrderDetParse[j]["Qty"]), 1, promProductParse[i]["UOM"], getCustFieldValue('PriceGroup'), false);
                                    LVItem = null;
                                    LVItem = {};
                                    LVItem["PromoType"] = "Discount";
                                    LVItem["Price"] = price;
                                    LVItem["Amount"] = (LVItem["Price"] * tempOrderDetParse[j]["Qty"]) - tempOrderDetParse[j]["DisPrice"];
                                    LVItem["Qty"] = tempOrderDetParse[j]["Qty"];
                                    LVItem["DisPrice"] = tempOrderDetParse[j]["DisPrice"];
                                    LVItem["Promotion"] = stPromo.PromoId;
                                    LVItem["ItemId"] = tempOrderDetParse[j]["ItemId"];
                                    LVItem["PromoCount"] = 1;
                                    LVItem["Priority"] = iPriority;
                                    if (bBulkUomPrice == true) {
                                        LVItem["UOM"] = tempOrderDetParse[j]["UOM"];
                                    } else {
                                        LVItem["UOM"] = dbUOM;
                                    }
                                    LVItem["LineType"] = tempOrderDetParse[j]["LineType"];
                                    LVItem["DisCalc"] = tempOrderDetParse[j]["DisCalc"];
                                    LVItem["PromoId"] = stPromo.PromoId;
                                    newOrdItems.push(LVItem);
                                }
                            }

                        } else if (promProductParse[i]["DisCalc"] != '') {
                            var sCategoryID = '';
                            tempOrderDetqry = GetQueryString("GET_TEMPORDERET");
                            var tempOrderDetParse = tempOrderDetqry;// JSON.parse(tempOrderDetqry);
                            for (var j = 0; j < tempOrderDetParse.length; j++) {
                                //var getProductParam = {};
                                ParamJS.ItemId = tempOrderDetParse[j]["ItemId"];
                                getProductqry = GetQueryString("GET_PRODUCT");
                                var getProductParse = getProductqry;// JSON.parse(getProductqry);
                                for (var k = 0; k < getProductParse.length; k++) {
                                    sCategoryID = getProductParse[k]["CategoryID"];
                                }
                                var dbUOM = getProductParse[i]["UOM"];
                                if (bBulkUomPrice == true) {
                                    dbUOM = PromoItemBulkUOM;
                                }
                                if ((promProductParse[i]["ItemId"] == getProductParse[i]["ItemId"] || promProductParse[i]["ItemId"] == sCategoryID) && promProductParse[i]["UOM"] == dbUOM) {
                                    var price = getPrice(getProductParse[i]["ItemId"], promProductParse[i]["UOM"], CheckDecimal(getProductParse[i]["Qty"]), 1, promProductParse[i]["UOM"], getCustFieldValue('PriceGroup'), false);
                                    LVItem = null;
                                    LVItem = {};
                                    LVItem["PromoType"] = "DisCalc";
                                    var dDisAmt = price;
                                    var dDisAmt1 = 0;
                                    var dDisCalc = promProductParse[i]["DisCalc"];
                                    if (dDisCalc != null && dDisCalc != undefined && dDisCalc != '') {
                                        var disArr = [];
                                        disArr = dDisCalc.split('+');
                                        dDisAmt1 = 0;
                                        for (var iCnt = 0; iCnt < disArr.length; iCnt++) {
                                            if (disArr[iCnt].indexOf('%') > -1) {
                                                disArr[iCnt] = Ti.App.ARRAYOPERATION.createQuery(disArr[iCnt], "%", "");
                                                if (parseFloat(disArr[iCnt])) {
                                                    dDisAmt1 = dDisAmt1 + (dDisAmt * (parseFloat(disArr[iCnt]) / 100));
                                                    dDisAmt = dDisAmt - (dDisAmt * (parseFloat(disArr[iCnt]) / 100));
                                                }
                                            } else {
                                                if (parseFloat(disArr[iCnt])) {
                                                    dDisAmt1 = dDisAmt1 + parseFloat(disArr[iCnt]);
                                                    dDisAmt = dDisAmt - parseFloat(disArr[iCnt]);
                                                }
                                            }
                                        }
                                    }
                                    dDisAmt1 = (dDisAmt1 == null || dDisAmt1 == undefined || dDisAmt1 == '') ? 0 : dDisAmt1;
                                    if (bBulkUomPrice == true) {
                                        var baseQty1 = DBCommon.prototype.getBulkBaseQty(getProductParse[i]["ItemId"]);
                                        dDisAmt1 = dDisAmt1 / baseQty1;
                                    }
                                    LVItem["Price"] = price;
                                    LVItem["Amount"] = (LVItem["Price"] - dDisAmt1) - getProductParse[i]["Qty"];
                                    LVItem["Qty"] = getProductParse[i]["Qty"];
                                    LVItem["DisPrice"] = dDisAmt1;
                                    LVItem["Promotion"] = stPromo.PromoId;
                                    LVItem["ItemId"] = getProductParse[i]["ItemId"];
                                    LVItem["PromoCount"] = 1;
                                    LVItem["Priority"] = iPriority;
                                    if (bBulkUomPrice == true) {
                                        LVItem["UOM"] = getProductParse[i]["UOM"];
                                    } else {
                                        LVItem["UOM"] = promProductParse[i]["UOM"];
                                    }
                                    LVItem["LineType"] = promProductParse[i]["LineType"];
                                    LVItem["DisCalc"] = promProductParse[i]["DisCalc"];
                                    LVItem["PromoId"] = stPromo.PromoId;
                                    newOrdItems.push(LVItem);
                                }
                            }
                        }
                    }
                    continue NextRecord;
                }

            }///MAIN PROMO ARRAY - FOR END - 

        var sysCheckPromoAf = getSystemValue('CheckPromoAfterSave');
        var CheckPromoAfterSave = CheckBooleanField(sysCheckPromoAf);
        if (newOrdItems.length == 0 || (newOrdItems.length == 0 && dqty == 0)) {
            newOrdItems = [];
            if (ipdGroup.MinQty != null && ipdGroup.MinQty != undefined) {
                if (ipdGroup.MinQty > dqty || ipdGroup.MaxQty < dqty) {
                    var sPromoCondUOM = '';
                    //var getpromoCondParam = {};
                    ParamJS.PromoId = ipdGroup.PromoId;
                    getpromoCondqry = GetQueryString("GET_PROMOTIONCOND");
                    var getpromoCondParse = getpromoCondqry;// JSON.parse(getpromoCondqry);
                    for (var i = 0; i < getpromoCondParse.length; i++) {
                        sPromoCondUOM = getpromoCondParse[i]["UOM"];
                    }
                    //var promoOfferParam = {};
                    ParamJS.ItemId = sitemid;
                    ParamJS.PromoId = ipdGroup.PromoId;
                    promoOfferqry = GetQueryString("GET_PROMOFFERPRO");
                    var promoOfferParse = promoOfferqry;// JSON.parse(promoOfferqry);
                    var bAlertExists = false;
                    for (var i = 0; i < promoOfferParse.length; i++) {
                        if (promoOfferParse[i]["FocQty"] > 0) {
                            bShowPromoAlert = true;
                            if (sPromoCondUOM != '') {
                                sPromoMsgText = "Condition : \n" + promoOfferParse[i]["Itemname"] + "\n" + "Category : " + promoOfferParse[i]["CategoryName"] + "\n" + "Promotion Group : " + promoOfferParse[i]["PromoName"] + "\n" + "Min : " + ipdGroup.MinQty + " " + sPromoCondUOM + "\n" + "Max : " + ipdGroup.MaxQty + " " + promoOfferParse[i]["UOM"] + "\n" + "Offer : FOC " + promoOfferParse[i]["FOcQty"] + " " + promoOfferParse[i]["UOM"];
                            } else {
                                sPromoMsgText = "Condition : \n" + promoOfferParse[i]["Itemname"] + "\n" + "Category : " + promoOfferParse[i]["CategoryName"] + "\n" + "Promotion Group : " + promoOfferParse[i]["PromoName"] + "\n" + "Min : " + ipdGroup.MinQty + " " + promoOfferParse[i]["UOM"] + "\n" + "Max : " + ipdGroup.MaxQty + " " + promoOfferParse[i]["UOM"] + "\n" + "Offer : FOC " + promoOfferParse[i]["FOcQty"] + " " + promoOfferParse[i]["UOM"];
                            }
                            if (CheckPromoAfterSave == false) {
                                if (bAlertExists == false) {
                                    bAlertExists = true;
                                }
                            } else {
                                arrPromoMsg.push(sPromoMsgText);
                            }
                        } else if (promoOfferParse[i]["DisPrice"] > 0) {
                            bShowPromoAlert = true;
                            if (sPromoCondUOM != '') {
                                sPromoMsgText = "Condition : \n" + promoOfferParse[i]["Itemname"] + "\n" + "Min : " + ipdGroup.MinQty + " " + sPromoCondUOM + "\n" + "Max : " + ipdGroup.MaxQty + " " + promoOfferParse[i]["UOM"] + "\n" + "Offer : Discount " + promoOfferParse[i]["DisPrice"];
                            } else {
                                sPromoMsgText = "Condition : \n" + promoOfferParse[i]["Itemname"] + "\n" + "Min : " + ipdGroup.MinQty + " " + promoOfferParse[i]["UOM"] + "\n" + "Max : " + ipdGroup.MaxQty + " " + promoOfferParse[i]["UOM"] + "\n" + "Offer : Discount " + promoOfferParse[i]["DisPrice"];
                            }
                            if (CheckPromoAfterSave == false) {
                                if (bAlertExists == false) {
                                    bAlertExists = true;
                                    alert(sPromoMsgText);
                                }
                            }
                        } else if (promoOfferParse[i]["Discount"] > 0) {
                            bShowPromoAlert = true;
                            if (sPromoCondUOM != '') {
                                sPromoMsgText = "Condition : \n" + promoOfferParse[i]["Itemname"] + "\n" + "Min : " + ipdGroup.MinQty + " " + sPromoCondUOM + "\n" + "Max : " + ipdGroup.MaxQty + " " + promoOfferParse[i]["UOM"] + "\n" + "Offer : Discount " + promoOfferParse[i]["Discount"] + "%";
                            } else {
                                sPromoMsgText = "Condition : \n" + promoOfferParse[i]["Itemname"] + "\n" + "Min : " + ipdGroup.MinQty + " " + promoOfferParse[i]["UOM"] + "\n" + "Max : " + ipdGroup.MaxQty + " " + promoOfferParse[i]["UOM"] + "\n" + "Offer : Discount " + promoOfferParse[i]["Discount"] + "%";
                            }
                            if (CheckPromoAfterSave == false) {
                                if (bAlertExists == false) {
                                    bAlertExists = true;
                                    alert(sPromoMsgText);
                                }
                            }
                        }
                    }
                }
            }
        }
        else {
            if (arrPromoList.length > 0) {
                dPromoMinQty = 0; sPromoId = "";
                for (var i = 0; i < arrPromoList.length; i++) {
                    if (dPromoEnterQty < arrPromoList[i].MinQty) {
                        if (dPromoMinQty == 0) {
                            sPromoId = arrPromoList[i].PromoId;
                            dPromoMinQty = arrPromoList[i].MinQty;
                        } else if (arrPromoList[i].MinQty < dPromoMinQty) {
                            sPromoId = arrPromoList[i].PromoId;
                            dPromoMinQty = arrPromoList[i].MinQty;
                        }
                    }
                }
                dPromoMinQty = (dPromoMinQty == null || dPromoMinQty == undefined || dPromoMinQty == '') ? 0 : dPromoMinQty;
                var sPromoCondUOM = '';
                //var getpromoCondParam = {};
                ParamJS.PromoId = sPromoId;
                getpromoCondqry = GetQueryString("GET_PROMOTIONCOND");
                var getpromoCondParse = getpromoCondqry;// JSON.parse(getpromoCondqry);
                for (var i = 0; i < getpromoCondParse.length; i++) {
                    sPromoCondUOM = getpromoCondParse[i]["UOM"];
                }

                //var promoOfferParam = {};
                ParamJS.ItemId = sitemid;
                ParamJS.PromoId = sPromoId;
                promoOfferqry = GetQueryString("GET_PROMOFFERPRO");
                var promoOfferParse = promoOfferqry;//JSON.parse(promoOfferqry);
                var bAlertExists = false;
                for (var i = 0; i < promoOfferParse.length; i++) {
                    if (promoOfferParse[i]["FocQty"] > 0) {
                        bShowPromoAlert = true;
                        if (sPromoCondUOM != '') {
                            sPromoMsgText = "Condition : \n" + promoOfferParse[i]["Itemname"] + "\n" + "Category : " + promoOfferParse[i]["CategoryName"] + "\n" + "Promotion Group : " + promoOfferParse[i]["PromoName"] + "\n" + "Min : " + dPromoMinQty + " " + sPromoCondUOM + "\n" + "Offer : FOC " + promoOfferParse[i]["FOcQty"] + " " + promoOfferParse[i]["UOM"];
                        } else {
                            sPromoMsgText = "Condition : \n" + promoOfferParse[i]["Itemname"] + "\n" + "Category : " + promoOfferParse[i]["CategoryName"] + "\n" + "Promotion Group : " + promoOfferParse[i]["PromoName"] + "\n" + "Min : " + dPromoMinQty + " " + promoOfferParse[i]["UOM"] + "\n" + "Offer : FOC " + promoOfferParse[i]["FOcQty"] + " " + promoOfferParse[i]["UOM"];
                        }
                        if (CheckPromoAfterSave == false) {
                            if (bAlertExists == false) {
                                bAlertExists = true;
                            }
                        }
                    } else if (promoOfferParse[i]["DisPrice"] > 0) {
                        bShowPromoAlert = true;
                        if (sPromoCondUOM != '') {
                            sPromoMsgText = "Condition : \n" + promoOfferParse[i]["Itemname"] + "\n" + "Min : " + dPromoMinQty + " " + sPromoCondUOM + "\n" + "Offer : Discount " + promoOfferParse[i]["DisPrice"];
                        } else {
                            sPromoMsgText = "Condition : \n" + promoOfferParse[i]["Itemname"] + "\n" + "Min : " + dPromoMinQty + " " + promoOfferParse[i]["UOM"] + "\n" + "Offer : Discount " + promoOfferParse[i]["DisPrice"];
                        }
                        if (CheckPromoAfterSave == false) {
                            if (bAlertExists == false) {
                                bAlertExists = true;
                                alert(sPromoMsgText);
                            }
                        }
                    } else if (promoOfferParse[i]["Discount"] > 0) {
                        bShowPromoAlert = true;
                        if (sPromoCondUOM != '') {
                            sPromoMsgText = "Condition : \n" + promoOfferParse[i]["Itemname"] + "\n" + "Min : " + dPromoMinQty + " " + sPromoCondUOM + "\n" + "Offer : Discount " + promoOfferParse[i]["Discount"] + "%";
                        } else {
                            sPromoMsgText = "Condition : \n" + promoOfferParse[i]["Itemname"] + "\n" + "Min : " + dPromoMinQty + " " + promoOfferParse[i]["UOM"] + "\n" + "Offer : Discount " + promoOfferParse[i]["Discount"] + "%";
                        }
                        if (CheckPromoAfterSave == false) {
                            if (bAlertExists == false) {
                                bAlertExists = true;
                                alert(sPromoMsgText);
                            }
                        }
                    }
                }
            }
        }
        //return sPromoMsgText;
        var invoiceRtn = CheckInvoicePromotion(dAmt);
        flgLog = false;
        return invoiceRtn;
    } catch (e) {
       // alert('CheckPro --> ' + e);
        return [];
    }
}


function setCustomerFields(custId) {
    var arr = [];
    var arrObj = {};
    //var custParam = {};
    ParamJS.CustNo = custId;
    //custParam.CustNo = custId;
    //var res = app.ReadRecord("GET_CUSTOMER", JSON.stringify(custParam));
    //res = GetQueryString("GET_CUSTOMER");
    //var custParse = JSON.parse(res);

    var custParse = GetQueryString("GET_CUSTOMER");
    if (custParse != null)
        for (var i = 0; i < custParse.length; i++) {
            arrObj = {};
            //Ti.App.CustName = custParse[i]["Customername"];
            //Ti.App.Custchannel = custParse[i]["Channel"];
            //Ti.App.CustSubchannel = custParse[i]["SubChannel"];
            arrObj.CustNo = custId;
            //arrObj.CustName = Ti.App.CustName;
            arrObj.CustName = custParse[i]["Customername"];
            arrObj.Custchannel = custParse[i]["Channel"];
            arrObj.CustSubchannel = custParse[i]["SubChannel"];

            arrObj.PriceGroup = custParse[i]["PriceGroup"];
            arrObj.PriceGroup2 = custParse[i]["PriceGroup2"];
            arrObj.StockTakeRequired = custParse[i]["StockTakeRequired"];
            arrObj.TermCalc = custParse[i]["TermCalc"];

            arrObj.DefPayTerms = custParse[i]["DefPayTerms"];
            arrObj.DefCurCode = custParse[i]["DefCurCode"];
            arrObj.AcBillRef = custParse[i]["AcBillRef"];
            arrObj.Remarks = custParse[i]["Remarks"];
            arrObj.CustClass = custParse[i]["CustClass"];
            arrObj.Barcode = custParse[i]["Barcode"];
            arrObj.GSTType = custParse[i]["GSTType"];
            arrObj.address = custParse[i]["address"];
            arrObj.Address2 = custParse[i]["Address2"];
            arrObj.City = custParse[i]["City"];
            arrObj.Pin = custParse[i]["Pin"];
            arrObj.MachineNo = custParse[i]["MachineNo"];
            arrObj.BandCode = custParse[i]["BandCode"];
            arrObj.ZoneID = custParse[i]["ZoneID"];
            arrObj.SupplierCode = custParse[i]["SupplierCode"];
            arrObj.GSTCustGroup = custParse[i]["GSTCustGroup"];
            //arrObj.SupplierCode = '';
            //Ti.App.sSupplierCode = arrObj.SupplierCode;
            //Ti.App.PriceGroup = arrObj.PriceGroup;
            arr.push(arrObj);
            //console.log('log from javascript' + custParse[i]["PriceGroup"]);
        }

    return arr;
}

function getBaseQty(itemid, uom) {
    //var param = {};
    //param.itemNo = itemid;
    //param.uom = uom;

    //var res = app.ReadRecord("GET_BASE_QTY", JSON.stringify(param));
    //return res.baseQty;
    var baseqty = 0;
    var dbDataRows = GetQueryString("GET_BASE_QTY");
    //execute(qry);
    //var dbDataRows = executeQry;
    for (var i = 0; i < dbDataRows.length; i++) {
        baseqty = dbDataRows[i].BaseQty;
    }
    return baseqty;

}


function getDateTime() {
    //var datetime = new Date();

    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    if (month.toString().length == 1) {
        var month = '0' + month;
    }
    if (day.toString().length == 1) {
        var day = '0' + day;
    }
    if (hour.toString().length == 1) {
        var hour = '0' + hour;
    }
    if (minute.toString().length == 1) {
        var minute = '0' + minute;
    }
    if (second.toString().length == 1) {
        var second = '0' + second;
    }
    //  var dateTime1 = year + '/' + month + '/' + day + ' ' + hour + ':' + minute + ':' + second;
    // sendDateTime = year + '-' + month + '-' + day + '  ' + now.toLocaleTimeString('en-US', { hour12: true, hour: "numeric", minute: "numeric" });
    sendDateTime = now.toLocaleTimeString('en-US', { hour12: true, hour: "numeric", minute: "numeric" });

    return year + '-' + month + '-' + day;
}
function getCurrentDateTime() {

    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    if (month.toString().length == 1) {
        var month = '0' + month;
    }
    if (day.toString().length == 1) {
        var day = '0' + day;
    }
    if (hour.toString().length == 1) {
        var hour = '0' + hour;
    }
    if (minute.toString().length == 1) {
        var minute = '0' + minute;
    }
    if (second.toString().length == 1) {
        var second = '0' + second;
    }
    //  var dateTime1 = year + '/' + month + '/' + day + ' ' + hour + ':' + minute + ':' + second;
    // sendDateTime = year + '-' + month + '-' + day + '  ' + now.toLocaleTimeString('en-US', { hour12: true, hour: "numeric", minute: "numeric" });

    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
}
//function getPrice1(sItemId, sUOM, Qty, baseQty, baseUom, sPriceGroup, bBaseUomPrice) {
//    objPrice = {};
//    objPrice = getPriceObj(sItemId, sUOM, Qty, baseQty, baseUom, sPriceGroup, bBaseUomPrice);

//    objPrice.dPrice = (objPrice.dPrice == null || objPrice.dPrice == undefined || objPrice.dPrice == '') ? 0 : objPrice.dPrice;
//    return objPrice.dPrice;
//}


function CheckBooleanField(value) {
    retValue = false;
    if (value == "1" || value == true)
        retValue = true;
    return retValue;

}


function GetBaseQty(itemid, uom) {
    //var param = {};
    //param.itemNo = itemid;
    //param.uom = uom;

    //var res = app.ReadRecord("GET_BASE_QTY", JSON.stringify(param));
    //return res.baseQty;
    var baseqty = 0;
    var dbDataRows = GetQueryString("GET_BASE_QTY");
    //execute(qry);
    //var dbDataRows = executeQry;
    for (var i = 0; i < dbDataRows.length; i++) {
        baseqty = dbDataRows[i].BaseQty;
    }
    return baseqty;

}

function updatePromotion(promoId) {
    var query = "UPDATE Promotion SET PromoID = '" + promoId + "' WHERE PromoID = '" + promoId + "'";
    var obj = execute(query);
    return obj;
}
function CheckData(qry) {
    bFlag = false;
    var obj = execute(qry); //app.ExecuteSQL(qry)
    if (obj > 0)
        bFlag = true;

    return bFlag
}

function getPrice(sItemId, sUOM, Qty, baseQty, baseUom, sPriceGroup, bBaseUomPrice) {
    objPrice = {};
    objPrice = getPriceObj(sItemId, sUOM, Qty, baseQty, baseUom, sPriceGroup, bBaseUomPrice);

    objPrice.dPrice = (objPrice.dPrice == null || objPrice.dPrice == undefined || objPrice.dPrice == '') ? 0 : objPrice.dPrice;
    return objPrice.dPrice;
}
function getPriceObj(sItemId, sUOM, Qty, baseQty, baseUom, sPriceGroup, bBaseUomPrice) {
    var sysBulkUomPrice = getSystemValue('BulkUomPrice');    var bBulkUomPrice = CheckBooleanField(sysBulkUomPrice);    if (bBulkUomPrice == true) {
        //var productParam = {};        ParamJS.itemNo = sItemId;        var suomRes = GetQueryString("GET_PRODUCTS_VALUE");//, JSON.stringify(productParam));        var suomParse = suomRes;// JSON.parse(suomRes);        for (var i = 0; i < suomParse.length; i++) {
            suom = suomParse[i]["BulkUOM"];
        }
    }    //fromDate = "2023-02-21 01:06:21.92";    fromDate = getCurrentDateTime();//Ti.App.dtDeliveryDate;    dtDocDate = getCurrentDateTime();//Ti.App.dtDeliveryDate;    toDate = dtDocDate;    dPriceObj = {};    dPriceObj.dPrice = 0;    dPriceObj.dDisPrice = 0;    Qty = (Qty == '' || Qty == null || Qty == undefined) ? 0 : Qty;    dpr = 0.0; baseqty = 1.0;    priceGroup = sPriceGroup;    fromDate = dtDocDate; toDate = dtDocDate; custID = sysCustomerID;//custID = Ti.App.CustNo;    var sysBaseUomPrice = getSystemValue('BaseUomPrice');    var bBaseUomPrice = CheckBooleanField(sysBaseUomPrice);    if (bBaseUomPrice == true) {
        sUOM = GetBaseUOM(sItemId);        Qty = Qty * baseQty;
    }    if (bBulkUomPrice == true) {
        var baseQty1 = getBulkBaseQty(sItemId);        Qty = Qty / baseQty1;
    }    //if (Ti.App.sSupplierCode == 'SUPERMARKET-111')    if (custDet[0]["SupplierCode"] == 'SUPERMARKET-111') {

        _tmpUOM = sUOM;        Qty = Qty * baseQty;        //var getPriceParam = {};        ParamJS.ItemId = sItemId;        ParamJS.uom = sUOM;        ParamJS.priceGroup = priceGroup;        ParamJS.Qty = Qty;        ParamJS.fromDate = fromDate;        ParamJS.toDate = toDate;        getPriceqry = GetQueryString("GET_PRICE_FUN");//); //, JSON.stringify(getPriceParam));        var getPriceParse = getPriceqry;// JSON.parse(getPriceqry);        for (var i = 0; i < getPriceParse.length; i++) {
            dpr = getPriceParse[i]["RSP"];            dPriceObj.dPrice = getPriceParse[i]["RSP"];            dPriceObj.dDisPrice = getPriceParse[i]["DisPrice"];
        }        if (bBaseUomPrice == true) {
            dpr = dpr * baseQty;            dPriceObj.dPrice = dpr;
        }        return dPriceObj;
    }    if (dpr == 0.0) {
        if (IsFieldExist("Customer", "MaxPriceGroup")) {
            //todo1
            //if (true) {
            //var getPriceParam = {};            ParamJS.ItemId = sItemId;            ParamJS.uom = sUOM;            ParamJS.priceGroup = priceGroup;            ParamJS.custID = custID;            ParamJS.fromDate = fromDate;            ParamJS.toDate = toDate;            getPriceqry = GetQueryString("GET_PRICE_FUNIN");//, JSON.stringify(getPriceParam));            var getPriceParse = getPriceqry;//JSON.parse(getPriceqry);            for (var i = 0; i < getPriceParse.length; i++) {
                dpr = getPriceParse[i]["UnitPrice"];                dPriceObj.dPrice = getPriceParse[i]["UnitPrice"];                dPriceObj.dDisPrice = getPriceParse[i]["DisPrice"];                dPriceObj.dDisCalc = getPriceParse[i]["DisCalc"];
            }
        }
    }    if (dpr == 0.0) {
        //var getPriceParam = {};        ParamJS.ItemId = sItemId;        ParamJS.uom = sUOM;        ParamJS.Qty = Qty;        ParamJS.custID = custID;        ParamJS.fromDate = fromDate;        ParamJS.toDate = toDate;        getPriceqry = GetQueryString("GET_PRICECUST");//, JSON.stringify(getPriceParam));        var getPriceParse = getPriceqry;// JSON.parse(getPriceqry);        for (var i = 0; i < getPriceParse.length; i++) {
            dpr = getPriceParse[i]["UnitPrice"];            dPriceObj.dPrice = getPriceParse[i]["UnitPrice"];            dPriceObj.dDisPrice = getPriceParse[i]["DisPrice"];            dPriceObj.dDisCalc = getPriceParse[i]["DisCalc"];
        }
    }    priceGroup = (priceGroup != null && priceGroup != undefined) ? priceGroup : "";    if (dpr == 0.0 && priceGroup != "") {
        //var getPriceParam = {};        ParamJS.ItemId = sItemId;        ParamJS.uom = sUOM;        ParamJS.priceGroup = priceGroup;        ParamJS.Qty = Qty;        ParamJS.fromDate = fromDate;        ParamJS.toDate = toDate;        getPriceqry = GetQueryString("GET_PRICE_FUN");//, JSON.stringify(getPriceParam));        var getPriceParse = getPriceqry;// JSON.parse(getPriceqry);        for (var i = 0; i < getPriceParse.length; i++) {
            dpr = getPriceParse[i]["UnitPrice"];            dPriceObj.dPrice = getPriceParse[i]["UnitPrice"];            dPriceObj.dDisPrice = getPriceParse[i]["DisPrice"];            dPriceObj.dDisCalc = getPriceParse[i]["DisCalc"];
        }
    }    //_tmpPriceGroup = Ti.App.ARRAYOPERATION.getCustFieldValue('PriceGroup2');    _tmpPriceGroup = custDet[0]["PriceGroup2"];    _tmpPriceGroup = (_tmpPriceGroup != null && _tmpPriceGroup != undefined) ? _tmpPriceGroup : "";    if (dpr == 0.0 && _tmpPriceGroup != "") {
        //var getPriceParam = {};        ParamJS.ItemId = sItemId;        ParamJS.uom = sUOM;        ParamJS.priceGroup = priceGroup;        ParamJS.Qty = Qty;        ParamJS.fromDate = fromDate;        ParamJS.toDate = toDate;        getPriceqry = GetQueryString("GET_PRICE_FUN");//, JSON.stringify(getPriceParam));        var getPriceParse = getPriceqry;        for (var i = 0; i < getPriceParse.length; i++) {
            dpr = getPriceParse[i]["UnitPrice"];            dPriceObj.dPrice = getPriceParse[i]["UnitPrice"];            dPriceObj.dDisPrice = getPriceParse[i]["DisPrice"];            dPriceObj.dDisCalc = getPriceParse[i]["DisCalc"];
        }
    }    if (dpr == 0.0) {
        //var getPriceParam = {};        ParamJS.ItemId = sItemId;        ParamJS.uom = sUOM;        ParamJS.priceGroup = priceGroup;        ParamJS.Qty = Qty;        ParamJS.fromDate = fromDate;        ParamJS.toDate = toDate;        getPriceqry = GetQueryString("GET_PRICE_FUN");//, JSON.stringify(getPriceParam));        var getPriceParse = getPriceqry;//;        for (var i = 0; i < getPriceParse.length; i++) {
            dpr = getPriceParse[i]["UnitPrice"];            dPriceObj.dPrice = getPriceParse[i]["UnitPrice"];            dPriceObj.dDisPrice = getPriceParse[i]["DisPrice"];            dPriceObj.dDisCalc = getPriceParse[i]["DisCalc"];
        }
    }    if (dpr > 0) {
        if (dPriceObj.dDisCalc != null && dPriceObj.dDisCalc != undefined && dPriceObj.dDisCalc != '') {
            disArr = [];            disArr = dPriceObj.dDisCalc.split('+');            for (var iCnt = 0; iCnt < disArr.length; iCnt++) {
                if (disArr[iCnt].indexOf('%') > -1) {                    //if (Ti.App.COMMON.isNumber(parseFloat(disArr[iCnt])))                    if (isNumber(parseFloat(disArr[iCnt]))) {
                        dpr = dpr - (dpr * (parseFloat(disArr[iCnt]) / 100));
                    }
                } else {                    //if(disArr[iCnt] != null && disArr[iCnt] != undefined && disArr[iCnt] != ''){                    //Ti.App.COMMON.isNumber                    if (isNaN(parseFloat(disArr[iCnt]))) {
                    } else {
                        dpr = dpr - parseFloat(disArr[iCnt]);
                    }
                }
            }
        }        dPriceObj.dPrice = dpr;
    }    if (dpr == 0.0) {        //if (Ti.App.UOMType == 2)        if (sysUOMType == 2) {
            //var getPriceParam = {};            ParamJS.ItemId = sItemId;            getPriceqry = GetQueryString("GET_PRICEPRODUCT");//, JSON.stringify(getPriceParam));
        } else {
            //var getPriceParam = {};            ParamJS.ItemId = sItemId;            ParamJS.uom = sUOM;            getPriceqry = GetQueryString("GET_MPRODUCT");//, JSON.stringify(getPriceParam));
        }        var getPriceParse = getPriceqry;//;        for (var i = 0; i < getPriceParse.length; i++) {
            dpr = getPriceParse[i]["price"];            dPriceObj.dPrice = getPriceParse[i]["price"];            dPriceObj.dDisPrice = 0;
        }
    }    if (bBaseUomPrice == true) {
        dpr = dpr * baseQty;        dPriceObj.dPrice = dpr;
    }    return dPriceObj;
}


function GetBaseUOM(sItemNo) {
    BaseUOM = "";
    //var getPriceParam = {};
    //getPriceParam.ItemId = sItemNo;
    ParamJS.ItemId = sItemNo;
    getPriceqry = GetQueryString("GET_BASEUOM");//, JSON.stringify(getPriceParam));
    var getPriceParse = getPriceqry;// JSON.parse(getPriceqry);
    for (var i = 0; i < getPriceParse.length; i++) {
        BaseUOM = getPriceParse[i]["Uom"];
    }
    return BaseUOM;
}

function getBulkBaseQty(sItemId) {
    sBulkBaseQty = 1;
    //if (Ti.App.UOMType == 2)
    if (sysUOMType == 2) {
        //var getPriceParam = {};
        //getPriceParam.ItemId = sItemId;
        ParamJS.ItemId = sItemId;
        getPriceqry = GetQueryString("GET_BULKBASEQTY");//GET_PRICEPRODUCT");//, JSON.stringify(getPriceParam));

    } else {
        //var getPriceParam = {};
        //getPriceParam.ItemId = sItemId;
        ParamJS.ItemId = sItemId;
        getPriceqry = GetQueryString("GET_BULKBASEPRO");//GET_MPRODUCT");//, JSON.stringify(getPriceParam));
    }
    var getPriceParse = getPriceqry;//JSON.parse(getPriceqry);
    for (var i = 0; i < getPriceParse.length; i++) {
        sBulkBaseQty = getPriceParse[i]["BaseQty"];
    }
    return sBulkBaseQty;
}

function IsFieldExist(sTableName, sFieldName) {
    bIsFieldExist = false;
    //var getPriceParam = {};
    ParamJS.sTableName = sTableName;
    getPriceqry = GetQueryString("GET_ISFIELD");//GET_MPRODUCT");//, JSON.stringify(getPriceParam));
    var getPriceParse = getPriceqry;// JSON.parse(getPriceqry);
    for (var i = 0; i < getPriceParse.length; i++) {
        //if (getPriceParse.field(1) == sFieldName || getPriceParse.field(1).toUpperCase() == sFieldName.toUpperCase()) {
        if (getPriceParse[i].name == sFieldName || getPriceParse[i].name.toUpperCase() == sFieldName.toUpperCase()) {
            bIsFieldExist = true;
            break;
        }
    }
    return bIsFieldExist;
}

function ReadRecord(scrName, jsParams) {
    var qry = getString['QueryConfig_' + scrName];
    var groupBy = getString['QueryConfig_' + scrName + '_GroupText'];
    var orderBy = getString['QueryConfig_' + scrName + '_OrderText'];
    qry = formatQueryString(qry, '');

    qry = "SELECT SystemValue FROM SystemList WHERE Code = 'BulkUomPrice'";
    execute(qry);
    return executeQry;
}

//subfunction
function GetQueryString(sScreenName) {
    var qry = getString['QueryConfig_' + sScreenName];
    qry += ' ' + getString['QueryConfig_' + sScreenName + '_GroupText'];
    qry += ' ' + getString['QueryConfig_' + sScreenName + '_OrderText'];
    qry = formatQueryString(qry, sScreenName);
    execute(qry);

    console.log("radfunctions.js > getquerystring > " + qry);

    if (flgLog == true) {
        var dbDataRows = executeQry;        var count = 0;        try {
            count = dbDataRows.length;
        } catch (e) {
        }        ItemPromo_LogString(sScreenName + ":\n" + qry + "\n No. Of Records : " + count.toString());
    }

    return executeQry;
}
function GetQueryString1(qry) {
    qry = formatQueryString(qry, '');
    execute(qry);
    return executeQry;
}





function ApplyPromotion(sPromoId, Multiplier, sItemNo, custNo) {
    var sysCheckPromoAf = getSystemValue('CheckPromoAfterSave');
    var CheckPromoAfterSave = false;
    if (!sysCheckPromoAf) {
        CheckPromoAfterSave = false;
    } else {
        CheckPromoAfterSave = CheckBooleanField(sysCheckPromoAf);
    }
    PromoOfferItem = [];
    var sOfferQry = '';
    var arrPromoOfferItems = [];
    //var arrPromoOfferItems = Ti.App.arrPromoOfferItemObj;
    //var getPriceParam = {};
    ParamJS.sPromoId = sPromoId;
    getPriceqry = GetQueryString("GET_APPLYPROMO"); //, JSON.stringify(getPriceParam));

    //todo1
    //getPriceqry = GetQueryString1("select promooffer.PromoId, promooffer.Itemid, promooffer.UOM, promooffer.LineType, isnull(promooffer.FocQty,0) as FocQty,isnull(promooffer.Reason,'') as Reason, isnull(promooffer.DisPrice,0) as DisPrice, isnull(promooffer.Discount,0) as Discount, isnull(promooffer.DisCalc,'') as DisCalc, Promotion.Priority as Priority from promooffer INNER JOIN Promotion ON Promotion.PromOId = promooffer.PromoId  where Promotion.promoid  ='NOVADMPP00417'  ");

    var getPriceParse = (getPriceqry);
    // console.log('Apply Promotion:' + getPriceParse.length + " " + CheckPromoAfterSave);
    for (var i = 0; i < getPriceParse.length; i++) {
        // console.log('Apply Promotion : ' + getPriceParse[i]['FocQty'] + " " + getPriceParse[i]['DisPrice'] + " " + getPriceParse[i]['DisCalc']);
        var query = "Delete from TempOrderDet WHERE SalesType = 'F' and itemid='" + getPriceParse[i]['Itemid'] + "' and PromoOffer = '" + getPriceParse[i]['PromoId'] + "'";
        //var obj = execute(query); //New added code

        //todo1 --&& false -- enable execute(query); //New added code
        if (Number(getPriceParse[i]['DisPrice']) > 0) {
            //console.log('Apply Promotion:' + getPriceParse[i]['DisPrice'] + " " + CheckDecimal(getPriceParse[i]['DisPrice']));
            //console.log('Apply Promotion:' + getPriceParse[i]['LineType'] + " " + getPriceParse[i]['ItemID']);


            var tmpUOM = '';

            try {
                var query = "select UOM from TempOrderDet WHERE SalesType = 'S' AND isnull(DisPr,0) < '" + CheckDecimal(getPriceParse[i]['DisPrice']) + "' AND (isnull(Price,0) * (isnull(DisPer,0) / 100.0)) < '" + CheckDecimal(getPriceParse[i]['DisPrice']) + "' AND (ItemId IN (SELECT ItemId FROM PromoCondition WHERE PromoId = '" + getPriceParse[i]['PromoId'] + "' AND (ISNULL(LineType, '') = '' OR ISNULL(LineType, '') = 'Item') union SELECT ItemId FROM PromoGroup WHERE GroupId = '" + getPriceParse[i]['Itemid'] + "' AND (ISNULL(LineType,'') = '' OR ISNULL(LineType,'') = 'Item') UNION SELECT Item.ItemNo FROM PromoGroup INNER JOIN Item ON Item.Brand = PromoGroup.ItemId WHERE GroupId = '" + getPriceParse[i]['Itemid'] + "' AND ISNULL(LineType, '') = 'Brand' UNION SELECT Item.ItemNo FROM PromoGroup INNER JOIN Item ON Item.ItemNo = PromoGroup.ItemId WHERE GroupId = '" + getPriceParse[i]['Itemid'] + "' AND ISNULL(LineType, '') = 'Category'))";

                var obj = execute(query);

                tmpUOM = obj[0]["UOM"];

            }
            catch { }

            try {
                var query = "Delete from PromoEntitlementTemp WHERE SalesType = 'F' and itemno='" + getPriceParse[i]['Itemid'] + "' and  PromoId = '" + getPriceParse[i]['PromoId'] + "' and UOM = '" + tmpUOM + "' and userid='" + FormView.UserID + "'";
                var obj = execute(query);
            } catch (e) {

            }

            try {
                var InvoiceNo = getInvoiceNo();
                const currentDate = new Date();
                const year = currentDate.getFullYear(); // Get the year (e.g., 2024)
                const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Get the month (0-11, add 1 to get 1-12), padded with leading zero if needed
                const day = String(currentDate.getDate()).padStart(2, '0'); // Get the day of the month (1-31), padded with leading zero if needed
                const hours = String(currentDate.getHours()).padStart(2, '0'); // Get the hour (0-23), padded with leading zero if needed
                const minutes = String(currentDate.getMinutes()).padStart(2, '0'); // Get the minutes (0-59), padded with leading zero if needed
                const currentDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;
                var query_promotemp = "insert into PromoEntitlementTemp (CustNo, OrdNo, OrderDate, PromoId, PromoCount, PromoDiscount, Userid,SalesType,ItemNo,UOM) VALUES ('" + custNo + "', '" + InvoiceNo + "', '" + currentDateTime + "', '" + getPriceParse[i]['PromoId'] + "',1, " + CheckDecimal(getPriceParse[i]['DisPrice']) + ", '" + FormView.UserID + "','S','" + getPriceParse[i]['Itemid'] + "','" + tmpUOM + "')";
                var objwe = execute(query_promotemp);
            } catch (e) {

            }


            sOfferQry = "UPDATE TempOrderDet SET DisPer = 0, DisPr = '" + CheckDecimal(getPriceParse[i]['DisPrice']) + "', Amount = (Price - " + Number(CheckDecimal(getPriceParse[i]['DisPrice'])) + ") * Qty,PromoOffer = '" + getPriceParse[i]['PromoId'] + "' WHERE SalesType = 'S' AND isnull(DisPr,0) < '" + CheckDecimal(getPriceParse[i]['DisPrice']) + "' AND (isnull(Price,0) * (isnull(DisPer,0) / 100.0)) < '" + CheckDecimal(getPriceParse[i]['DisPrice']) + "' AND (ItemId IN (SELECT ItemId FROM PromoCondition WHERE PromoId = '" + getPriceParse[i]['PromoId'] + "' AND (ISNULL(LineType, '') = '' OR ISNULL(LineType, '') = 'Item') union SELECT ItemId FROM PromoGroup WHERE GroupId = '" + getPriceParse[i]['Itemid'] + "' AND (ISNULL(LineType,'') = '' OR ISNULL(LineType,'') = 'Item') UNION SELECT Item.ItemNo FROM PromoGroup INNER JOIN Item ON Item.Brand = PromoGroup.ItemId WHERE GroupId = '" + getPriceParse[i]['Itemid'] + "' AND ISNULL(LineType, '') = 'Brand' UNION SELECT Item.ItemNo FROM PromoGroup INNER JOIN Item ON Item.ItemNo = PromoGroup.ItemId WHERE GroupId = '" + getPriceParse[i]['Itemid'] + "' AND ISNULL(LineType, '') = 'Category'))";
            //sOfferQry = "update TempOrderDet SET DisPer=0, DisPr = '" + CheckDecimal(getPriceParse[i]['DisPrice']) + "', Amount = (price - " + Number(CheckDecimal(getPriceParse[i]['DisPrice'])) + ") * Qty, Promooffer = '" + getPriceParse[i]['PromoId'] + "' WHERE SalesType = 'S' and DisPr < '" + CheckDecimal(getPriceParse[i]['DisPrice']) + "' and (price * ((DisPer / 100.0))) < '" + CheckDecimal(getPriceParse[i]['DisPrice']) + "' and CASE WHEN ( '" + getPriceParse[i]['LineType'] + "' = 'Item') THEN case when	temId = '" + getPriceParse[i]['Itemid'] + "' then CASE WHEN ( '" + getPriceParse[i]['LineType'] + "' = 'Promotion Group') THEN case when ItemId in (Select ItemId from PromoGroup WHERE GroupId =  '" + getPriceParse[i]['Itemid'] + "' and (isnull(LineType,'') = '' OR isnull(LineType,'') = 'Item') UNION Select Item.ItemNo from PromoGroup INNER JOIN Item on Item.Brand = PromoGroup.ItemId WHERE GroupId =  '" + getPriceParse[i]['Itemid'] + "' and     isnull(LineType,'') = 'Brand'	UNION Select Item.ItemNo from PromoGroup INNER JOIN Item on Item.CategoryId = PromoGroup.ItemId  WHERE GroupId = '" + getPriceParse[i]['Itemid'] + "' and isnull(LineType,'') = 'Category') then CASE WHEN ( '" + getPriceParse[i]['LineType'] + "' = 'Category') THEN case when ItemId in (Select ItemNo from Item WHERE categoryId = '" + getPriceParse[i]['Itemid'] + "')	then CASE WHEN ( '" + getPriceParse[i]['LineType'] + "' = 'Brand') THEN case when ItemId in (Select ItemNo from Item WHERE Brand = '" + getPriceParse[i]['Itemid'] + "') then 1  ELSE 0 END END END END END END END END=1";
            //sOfferQry = "update TempOrderDet SET DisPer=0, DisPr = '" + CheckDecimal(getPriceParse[i]['DisPrice']) + "', Amount = (price - " + Number(CheckDecimal(getPriceParse[i]['DisPrice'])) + ") * Qty, Promooffer = '" + getPriceParse[i]['PromoId'] + "' WHERE SalesType = 'S' and DisPr < '" + CheckDecimal(getPriceParse[i]['DisPrice']) + "' and (price * ((DisPer / 100.0))) < '" + CheckDecimal(getPriceParse[i]['DisPrice']) + "' and CASE WHEN ( '" + getPriceParse[i]['LineType'] + "' = 'Item') THEN	ItemId = '" + getPriceParse[i]['Itemid'] + "' ELSE CASE WHEN ( '" + getPriceParse[i]['LineType'] + "' = 'Promotion Group')        THEN ItemId in (Select ItemId from PromoGroup WHERE GroupId =  '" + getPriceParse[i]['Itemid'] + "' and (isnull(LineType,'') = '' OR isnull(LineType,'') = 'Item') UNION Select Products.ItemId from PromoGroup INNER JOIN Products on Products.Brand = PromoGroup.ItemId WHERE GroupId =  '" + getPriceParse[i]['Itemid'] + "' and  isnull(LineType,'') = 'Brand'	UNION Select Products.ItemId from PromoGroup INNER JOIN Products on Products.CategoryId = PromoGroup.ItemId  WHERE GroupId = '" + getPriceParse[i]['Itemid'] + "' and isnull(LineType,'') = 'Category') ELSE CASE WHEN ( '" + getPriceParse[i]['LineType'] + "' = 'Category') THEN ItemId in (Select ItemId from Products WHERE categoryId = '" + getPriceParse[i]['Itemid'] + "')	ELSE CASE WHEN ( '" + getPriceParse[i]['LineType'] + "' = 'Brand') THEN ItemId in (Select ItemId from Products WHERE Brand = '" + getPriceParse[i]['Itemid'] + "') ELSE 1=0 END END END END";
            //console.log("Apply Promotion Update DisPrice : " + sOfferQry);
            var obj = execute(sOfferQry);
            if (CheckPromoAfterSave == false) {
                //var getTmpqryParam = {};
                ParamJS.PromoId = getPriceParse[i]['PromoId'];
                ParamJS.LineType = getPriceParse[i]['LineType'];
                ParamJS.ItemId = getPriceParse[i]['Itemid'];
                getTmpqry = GetQueryString("GET_APPLYPROMOTEMP"); //, JSON.stringify(getTmpqryParam));
                var getTmpParse = (getTmpqry);
                var dTmpRowIndex = -1;
                // console.log('Apply Promotion:' + getTmpParse.length);
                for (var q = 0; q < getTmpParse.length; q++) {
                    //dTmpRowIndex = arrItemIndex.indexOf(getTmpParse[q]['ItemId']);
                    //if (dTmpRowIndex > -1) {
                    //    Ti.App.ARRAYOPERATION.updateColumnData(0, dTmpRowIndex, "Promotion", dbOfferDataRows.fieldByName('PromoId'));
                    //    Ti.App.ARRAYOPERATION.updateColumnData(0, dTmpRowIndex, "DisPer", dbTmpQryDataRows.fieldByName('DisPer'));
                    //    Ti.App.ARRAYOPERATION.updateColumnData(0, dTmpRowIndex, "DisPr", dbTmpQryDataRows.fieldByName('DisPr'));
                    //    Ti.App.ARRAYOPERATION.updateColumnData(0, dTmpRowIndex, "Price", Ti.App.NUMBER.roundNumber(dbTmpQryDataRows.fieldByName('Price'), 2));
                    //    Ti.App.ARRAYOPERATION.updateColumnData(0, dTmpRowIndex, "Amount", Ti.App.NUMBER.roundNumber(dbTmpQryDataRows.fieldByName('Amount'), 2))
                    //}
                    dTmpRowIndex = -1;
                }
            }
        }
        else if (Number(getPriceParse[i]['Discount']) > 0) {

         

            var tmpUOM = '';

            try {
                var query = "select UOM from TempOrderDet WHERE SalesType = 'S' AND isnull(DisPr,0) < '" + CheckDecimal(getPriceParse[i]['DisPrice']) + "' AND (isnull(Price,0) * (isnull(DisPer,0) / 100.0)) < '" + CheckDecimal(getPriceParse[i]['DisPrice']) + "' AND (ItemId IN (SELECT ItemId FROM PromoCondition WHERE PromoId = '" + getPriceParse[i]['PromoId'] + "' AND (ISNULL(LineType, '') = '' OR ISNULL(LineType, '') = 'Item') union SELECT ItemId FROM PromoGroup WHERE GroupId = '" + getPriceParse[i]['Itemid'] + "' AND (ISNULL(LineType,'') = '' OR ISNULL(LineType,'') = 'Item') UNION SELECT Item.ItemNo FROM PromoGroup INNER JOIN Item ON Item.Brand = PromoGroup.ItemId WHERE GroupId = '" + getPriceParse[i]['Itemid'] + "' AND ISNULL(LineType, '') = 'Brand' UNION SELECT Item.ItemNo FROM PromoGroup INNER JOIN Item ON Item.ItemNo = PromoGroup.ItemId WHERE GroupId = '" + getPriceParse[i]['Itemid'] + "' AND ISNULL(LineType, '') = 'Category'))";

                var obj = execute(query);

                tmpUOM = obj[0]["UOM"];

            }
            catch { }

            try {
                var query = "Delete from PromoEntitlementTemp WHERE SalesType = 'F' and itemno='" + getPriceParse[i]['Itemid'] + "' and  PromoId = '" + getPriceParse[i]['PromoId'] + "' and UOM = '" + tmpUOM + "' and userid='" + FormView.UserID + "'";
                var obj = execute(query);
            } catch (e) {

            }

            try {
                var InvoiceNo = getInvoiceNo();
                const currentDate = new Date();
                const year = currentDate.getFullYear(); // Get the year (e.g., 2024)
                const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Get the month (0-11, add 1 to get 1-12), padded with leading zero if needed
                const day = String(currentDate.getDate()).padStart(2, '0'); // Get the day of the month (1-31), padded with leading zero if needed
                const hours = String(currentDate.getHours()).padStart(2, '0'); // Get the hour (0-23), padded with leading zero if needed
                const minutes = String(currentDate.getMinutes()).padStart(2, '0'); // Get the minutes (0-59), padded with leading zero if needed
                const currentDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;
                var query_promotemp = "insert into PromoEntitlementTemp (CustNo, OrdNo, OrderDate, PromoId, PromoCount, PromoDiscount, Userid, SalesType,ItemNo, UOM) VALUES ('" + custNo + "', '" + InvoiceNo + "', '" + currentDateTime + "', '" + getPriceParse[i]['PromoId'] + "',1, " + CheckDecimal(getPriceParse[i]['Discount']) + ", '" + FormView.UserID + "','S','" + getPriceParse[i]['Itemid'] + "','" + tmpUOM + "')";
                var objwe = execute(query_promotemp);
            } catch (e) {

            }
            
            sOfferQry = "UPDATE TempOrderDet SET DisPr = 0,DisPer = '" + CheckDecimal(getPriceParse[i]['Discount']) + "',Amount = (price * (1 - (" + CheckDecimal(getPriceParse[i]['Discount']) + "/ 100.0))) * Qty,PromoOffer = '" + getPriceParse[i]['PromoId'] + "' WHERE SalesType = 'S' AND isnull(DisPer,0) < '" + getPriceParse[i]['Discount'] + "' AND (isnull(DisPr,0) / isnull(Price,0)) * 100.0 < " + CheckDecimal(getPriceParse[i]['Discount']) + " AND (ItemId IN (SELECT ItemId FROM PromoCondition WHERE PromoId = '" + getPriceParse[i]['PromoId'] + "' AND (ISNULL(LineType, '') = '' OR ISNULL(LineType, '') = 'Item') union SELECT ItemId FROM PromoGroup WHERE GroupId = '" + getPriceParse[i]['Itemid'] + "' AND (ISNULL(LineType, '') = '' OR ISNULL(LineType, '') = 'Item') UNION SELECT Item.ItemNo FROM PromoGroup INNER JOIN Item ON Item.Brand = PromoGroup.ItemId WHERE GroupId = '" + getPriceParse[i]['Itemid'] + "' AND ISNULL(LineType, '') = 'Brand' UNION SELECT Item.ItemNo FROM PromoGroup INNER JOIN Item ON Item.ItemNo = PromoGroup.ItemId WHERE GroupId = '" + getPriceParse[i]['Itemid'] + "' AND ISNULL(LineType, '') = 'Category'))";
            //sOfferQry = "update TempOrderDet SET DisPr = 0, DisPer = '" + CheckDecimal(getPriceParse[i]['Discount']) + "', Amount = (price * (1-(" + CheckDecimal(getPriceParse[i]['Discount']) + "/100.0))) * Qty, PromoOffer = '" + getPriceParse[i]['PromoId'] + "' WHERE SalesType = 'S' and DisPer < '" + getPriceParse[i]['Discount'] + "' and (DisPr/Price) * 100.0 < " + CheckDecimal(getPriceParse[i]['Discount']) + " and CASE WHEN ( '" + getPriceParse[i]['LineType'] + "' = 'Item') THEN case when ItemId = '" + getPriceParse[i]['Itemid'] + "' then CASE WHEN ('" + getPriceParse[i]['LineType'] + "' = 'Promotion Group') THEN case when ItemId in (Select ItemId from PromoGroup WHERE GroupId =  '" + getPriceParse[i]['Itemid'] + "' and (isnull(LineType,'') = '' OR isnull(LineType,'') = 'Item') UNION Select Item.ItemNo from PromoGroup INNER JOIN Item on Item.Brand = PromoGroup.ItemId WHERE GroupId =  '" + getPriceParse[i]['Itemid'] + "' and  isnull(LineType,'') = 'Brand'	UNION Select Item.ItemNo from PromoGroup INNER JOIN Item on Item.CategoryId = PromoGroup.ItemId  WHERE GroupId = '" + getPriceParse[i]['Itemid'] + "' and isnull(LineType,'') = 'Category') then CASE WHEN ( '" + getPriceParse[i]['LineType'] + "' = 'Category') THEN case when ItemId in (Select ItemNo from Item WHERE categoryId = '" + getPriceParse[i]['Itemid'] + "') then CASE WHEN ('" + getPriceParse[i]['LineType'] + "' = 'Brand') THEN case when ItemId in (Select ItemNo from Item WHERE Brand = '" + getPriceParse[i]['Itemid'] + "') then 1 else 0 END END END END END END END END=1";
            //sOfferQry = "update TempOrderDet SET DisPr = 0, DisPer = '" + CheckDecimal(getPriceParse[i]['Discount']) + "', Amount = (price * (1-(" + CheckDecimal(getPriceParse[i]['Discount']) + "/100.0))) * Qty, PromoOffer = '" + getPriceParse[i]['PromoId'] + "' WHERE SalesType = 'S' and DisPer < '" + getPriceParse[i]['Discount'] + "' and (DisPr/Price) * 100.0 < " + CheckDecimal(getPriceParse[i]['Discount']) + " and CASE WHEN ( '" + getPriceParse[i]['LineType'] + "' = 'Item') THEN ItemId = '" + getPriceParse[i]['Itemid'] + "' ELSE CASE WHEN ( '" + getPriceParse[i]['LineType'] + "' = 'Promotion Group') THEN ItemId in (Select ItemId from PromoGroup WHERE GroupId =  '" + getPriceParse[i]['Itemid'] + "' and (isnull(LineType,'') = '' OR isnull(LineType,'') = 'Item') UNION Select Products.ItemId from PromoGroup INNER JOIN Products on Products.Brand = PromoGroup.ItemId WHERE GroupId =  '" + getPriceParse[i]['Itemid'] + "' and  isnull(LineType,'') = 'Brand'	UNION Select Products.ItemId from PromoGroup INNER JOIN Products on Products.CategoryId = PromoGroup.ItemId  WHERE GroupId = '" + getPriceParse[i]['Itemid'] + "' and isnull(LineType,'') = 'Category') ELSE CASE WHEN ( '" + getPriceParse[i]['LineType'] + "' = 'Category') THEN ItemId in (Select ItemId from Products WHERE categoryId = '" + getPriceParse[i]['Itemid'] + "') ELSE CASE WHEN ( '" + getPriceParse[i]['LineType'] + "' = 'Brand') THEN ItemId in (Select ItemId from Products WHERE Brand = '" + getPriceParse[i]['Itemid'] + "') ELSE 1=0 END END END END";
            //console.log("Apply Promotion Update Discount : " + sOfferQry);
            var obj = execute(sOfferQry);
            if (CheckPromoAfterSave == false) {
                //var getTmpqryParam = {};
                ParamJS.PromoId = getPriceParse[i]['PromoId'];
                ParamJS.LineType = getPriceParse[i]['LineType'];
                ParamJS.ItemId = getPriceParse[i]['Itemid'];
                getTmpqry = GetQueryString("GET_APPLYPROMOTEMP"); //, JSON.stringify(getTmpqryParam));
                var getTmpParse = (getTmpqry);
                var dTmpRowIndex = -1;
                for (var q = 0; q < getTmpParse.length; q++) {
                    //dTmpRowIndex = arrItemIndex.indexOf(dbTmpQryDataRows.fieldByName('ItemId'));
                    //if (dTmpRowIndex > -1) {
                    //    Ti.App.ARRAYOPERATION.updateColumnData(0, dTmpRowIndex, "Promotion", dbOfferDataRows.fieldByName('PromoId'));
                    //    Ti.App.ARRAYOPERATION.updateColumnData(0, dTmpRowIndex, "DisPer", dbTmpQryDataRows.fieldByName('DisPer'));
                    //    Ti.App.ARRAYOPERATION.updateColumnData(0, dTmpRowIndex, "DisPr", dbTmpQryDataRows.fieldByName('DisPr'));
                    //    Ti.App.ARRAYOPERATION.updateColumnData(0, dTmpRowIndex, "Price", Ti.App.NUMBER.roundNumber(dbTmpQryDataRows.fieldByName('Price'), 2));
                    //    Ti.App.ARRAYOPERATION.updateColumnData(0, dTmpRowIndex, "Amount", Ti.App.NUMBER.roundNumber(dbTmpQryDataRows.fieldByName('Amount'), 2));
                    //}
                    dTmpRowIndex = -1;
                }
            }
        }
        else if (getPriceParse[i]['DisCalc'] != '' && getPriceParse[i]['DisCalc'] != '0') { //todo1 -- && false
            var sDisCalc = 'PRICE';
            var dDisCalc = getPriceParse[i]['DisCalc'];
            if (dDisCalc != null && dDisCalc != undefined && dDisCalc != '') {
                var disArr = [];
                disArr = dDisCalc.split('+');
                for (var iCnt = 0; iCnt < disArr.length; iCnt++) {
                    if (disArr[iCnt].indexOf('%') > -1) {
                        disArr[iCnt] = createQuery(disArr[iCnt], "%", "");
                        sDisCalc = '(' + sDisCalc + ' - (' + sDisCalc + ' * ' + disArr[iCnt] + '/100.0))';
                    } else {
                        sDisCalc = '(' + sDisCalc + '- ' + disArr[iCnt] + ')';
                    }
                }
            }

           

            var tmpUOM = '';

            try {
                var query = "select UOM from TempOrderDet WHERE SalesType = 'S' AND isnull(DisPr,0) < '" + CheckDecimal(getPriceParse[i]['DisPrice']) + "' AND (isnull(Price,0) * (isnull(DisPer,0) / 100.0)) < '" + CheckDecimal(getPriceParse[i]['DisPrice']) + "' AND (ItemId IN (SELECT ItemId FROM PromoCondition WHERE PromoId = '" + getPriceParse[i]['PromoId'] + "' AND (ISNULL(LineType, '') = '' OR ISNULL(LineType, '') = 'Item') union SELECT ItemId FROM PromoGroup WHERE GroupId = '" + getPriceParse[i]['Itemid'] + "' AND (ISNULL(LineType,'') = '' OR ISNULL(LineType,'') = 'Item') UNION SELECT Item.ItemNo FROM PromoGroup INNER JOIN Item ON Item.Brand = PromoGroup.ItemId WHERE GroupId = '" + getPriceParse[i]['Itemid'] + "' AND ISNULL(LineType, '') = 'Brand' UNION SELECT Item.ItemNo FROM PromoGroup INNER JOIN Item ON Item.ItemNo = PromoGroup.ItemId WHERE GroupId = '" + getPriceParse[i]['Itemid'] + "' AND ISNULL(LineType, '') = 'Category'))";

                var obj = execute(query);

                tmpUOM = obj[0]["UOM"];

            }
            catch { }

            try {
                var query = "Delete from PromoEntitlementTemp WHERE SalesType = 'F' and itemno='" + getPriceParse[i]['Itemid'] + "' and  PromoId = '" + getPriceParse[i]['PromoId'] + "' and UOM = '" + tmpUOM + "' and userid='" + FormView.UserID + "'";
                var obj = execute(query);
            } catch (e) {

            }


            try {
                var InvoiceNo = getInvoiceNo();
                const currentDate = new Date();
                const year = currentDate.getFullYear(); // Get the year (e.g., 2024)
                const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Get the month (0-11, add 1 to get 1-12), padded with leading zero if needed
                const day = String(currentDate.getDate()).padStart(2, '0'); // Get the day of the month (1-31), padded with leading zero if needed
                const hours = String(currentDate.getHours()).padStart(2, '0'); // Get the hour (0-23), padded with leading zero if needed
                const minutes = String(currentDate.getMinutes()).padStart(2, '0'); // Get the minutes (0-59), padded with leading zero if needed
                const currentDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;
                var query_promotemp = "insert into PromoEntitlementTemp (CustNo, OrdNo, OrderDate, PromoId, PromoCount, PromoDiscount, Userid, SalesType,ItemNo,UOM) VALUES ('" + custNo + "', '" + InvoiceNo + "', '" + currentDateTime + "', '" + sDisCalc + "',1, " + CheckDecimal(getPriceParse[i]['Discount']) + ", '" + FormView.UserID + "','S','" + getPriceParse[i]['Itemid'] + "','" + tmpUOM + "')";
                var objwe = execute(query_promotemp);
            } catch (e) {

            }

            sOfferQry = "UPDATE TempOrderDet SET DisPer = 0,DisPr = Price - ('" + sDisCalc + "'),Amount = (Price - ('" + sDisCalc + "')) * Qty,PromoOffer = '" + getPriceParse[i]['PromoId'] + "' WHERE SalesType = 'S' AND isnull(DisPr,0) < ('" + sDisCalc + "') AND (isnull(Price,0) * (1 - (isnull(DisPer,0) / 100))) < ('" + sDisCalc + "') AND (ItemId IN (SELECT ItemId FROM PromoCondition WHERE PromoId = '" + getPriceParse[i]['PromoId'] + "' AND (ISNULL(LineType, '') = '' OR ISNULL(LineType, '') = 'Item') union SELECT ItemId FROM PromoGroup WHERE GroupId = '" + getPriceParse[i]['Itemid'] + "' AND (ISNULL(LineType, '') = '' OR ISNULL(LineType, '') = 'Item') UNION SELECT Item.ItemNo FROM PromoGroup INNER JOIN Item ON Item.Brand = PromoGroup.ItemId WHERE GroupId = '" + getPriceParse[i]['Itemid'] + "' AND ISNULL(LineType, '') = 'Brand' UNION SELECT Item.ItemNo FROM PromoGroup INNER JOIN Item ON Item.ItemNo = PromoGroup.ItemId WHERE GroupId = '" + getPriceParse[i]['Itemid'] + "' AND ISNULL(LineType, '') = 'Category'))";
            //sOfferQry = "update TempOrderDet SET DisPer=0, DisPr = Price - ('" + sDisCalc + "'), Amount = (price - ('" + sDisCalc + "')) * Qty, PromoOffer = '" + getPriceParse[i]['PromoId'] + "' WHERE SalesType = 'S' and DisPr < ('" + sDisCalc + "') and (Price * (1-(DisPer / 100))) < ('" + sDisCalc + "') and CASE WHEN ( '" + getPriceParse[i]['LineType'] + "' = 'Item') THEN case when ItemId = '" + getPriceParse[i]['Itemid'] + "' then CASE WHEN ( '" + getPriceParse[i]['LineType'] + "' = 'Promotion Group') THEN case when  ItemId in (Select ItemId from PromoGroup WHERE GroupId =  '" + getPriceParse[i]['Itemid'] + "' and (isnull(LineType,'') = '' OR isnull(LineType,'') = 'Item') UNION Select Item.ItemNo from PromoGroup INNER JOIN Item on Item.Brand = PromoGroup.ItemId WHERE GroupId = '" + getPriceParse[i]['Itemid'] + "' and  isnull(LineType,'') = 'Brand' UNION Select Item.ItemNo from PromoGroup INNER JOIN Item on Item.CategoryId = PromoGroup.ItemId  WHERE GroupId = '" + getPriceParse[i]['Itemid'] + "' and isnull(LineType,'') = 'Category') Then CASE WHEN ( '" + getPriceParse[i]['LineType'] + "' = 'Category') THEN case when ItemId in (Select ItemNo from Item WHERE categoryId = '" + getPriceParse[i]['Itemid'] + "') Then CASE WHEN ( '" + getPriceParse[i]['LineType'] + "' = 'Brand') THEN case when ItemId in (Select ItemNo from Item WHERE Brand = '" + getPriceParse[i]['Itemid'] + "') then 1 ELSE 0 END END END END END END END END=1 ";
            //sOfferQry = "update TempOrderDet SET DisPer=0, DisPr = Price - ('" + sDisCalc + "'), Amount = (price - ('" + sDisCalc + "')) * Qty, PromoOffer = '" + getPriceParse[i]['PromoId'] + "' WHERE SalesType = 'S' and DisPr < ('" + sDisCalc + "') and (Price * (1-(DisPer / 100))) < ('" + sDisCalc + "') and CASE WHEN ( '" + getPriceParse[i]['LineType'] + "' = 'Item') THEN ItemId = '" + getPriceParse[i]['Itemid'] + "' ELSE CASE WHEN ( '" + getPriceParse[i]['LineType'] + "' = 'Promotion Group') THEN ItemId in (Select ItemId from PromoGroup WHERE GroupId =  '" + getPriceParse[i]['Itemid'] + "' and (ifnull(LineType,'') = '' OR ifnull(LineType,'') = 'Item') UNION Select Products.ItemId from PromoGroup INNER JOIN Products on Products.Brand = PromoGroup.ItemId WHERE GroupId = '" + getPriceParse[i]['Itemid'] + " 'and  ifnull(LineType,'') = 'Brand' UNION Select Products.ItemId from PromoGroup INNER JOIN Products on Products.CategoryId = PromoGroup.ItemId  WHERE GroupId = '" + getPriceParse[i]['Itemid'] + "' and ifnull(LineType,'') = 'Category') ELSE CASE WHEN ( '" + getPriceParse[i]['LineType'] + "' = 'Category') THEN ItemId in (Select ItemId from Products WHERE categoryId = '" + getPriceParse[i]['Itemid'] + "') ELSE CASE WHEN ( '" + getPriceParse[i]['LineType'] + "' = 'Brand') THEN ItemId in (Select ItemId from Products WHERE Brand = '" + getPriceParse[i]['Itemid'] + "') ELSE 1=0 END END END END";
            //console.log("Apply Promotion Update DisCalc : " + sOfferQry);
            var obj = execute(sOfferQry);
            if (CheckPromoAfterSave == false) {
                //var getTmpqryParam = {};
                ParamJS.PromoId = getPriceParse[i]['PromoId'];
                ParamJS.LineType = getPriceParse[i]['LineType'];
                ParamJS.ItemId = getPriceParse[i]['Itemid'];
                getTmpqry = GetQueryString("GET_APPLYPROMOTEMP"); //, JSON.stringify(getTmpqryParam));
                var getTmpParse = (getTmpqry);
                var dTmpRowIndex = -1;
                for (var q = 0; q < getTmpParse.length; q++) {
                    //dTmpRowIndex = arrItemIndex.indexOf(dbTmpQryDataRows.fieldByName('ItemId'));
                    //if (dTmpRowIndex > -1) {
                    //    Ti.App.ARRAYOPERATION.updateColumnData(0, dTmpRowIndex, "Promotion", dbOfferDataRows.fieldByName('PromoId'));
                    //    Ti.App.ARRAYOPERATION.updateColumnData(0, dTmpRowIndex, "DisPer", dbTmpQryDataRows.fieldByName('DisPer'));
                    //    Ti.App.ARRAYOPERATION.updateColumnData(0, dTmpRowIndex, "DisPr", dbTmpQryDataRows.fieldByName('DisPr'));
                    //    Ti.App.ARRAYOPERATION.updateColumnData(0, dTmpRowIndex, "Price", Ti.App.NUMBER.roundNumber(dbTmpQryDataRows.fieldByName('Price'), 2));
                    //    Ti.App.ARRAYOPERATION.updateColumnData(0, dTmpRowIndex, "Amount", Ti.App.NUMBER.roundNumber(dbTmpQryDataRows.fieldByName('Amount'), 2));
                    //}
                    dTmpRowIndex = -1;
                }

            }
        }
        else if (Number(getPriceParse[i]['FocQty']) > 0) {
            if (getPriceParse[i]['LineType'] == 'Item') {
                var sTmpPromoOffer = "", sTmpQty = 0;
                //var getItmqryParam = {};
                ParamJS.ItemId = getPriceParse[i]['Itemid'];
                getItemqry = GetQueryString("GET_APPLYPROMOITEM"); //, JSON.stringify(getItmqryParam));
                var getItemParse = (getItemqry);
                //console.log('Apply Promotion FocQty : ' + getItemParse.length)
                for (var w = 0; w < getItemParse.length; w++) {
                    //console.log("Apply Promotions loop : " + getItemParse[w]['PromoOffer'] + " " + getItemParse[w]['qty']);
                    sTmpPromoOffer = getItemParse[w]['PromoOffer'];
                    sTmpQty = getItemParse[w]['qty'];
                }
                var qry = "";
                //if(sTmpPromoOffer != "")
                //console.log('Apply Promotions sTmpPromoOffer: ' + sTmpPromoOffer + " " + getPriceParse[i]['PromoID'] + " " + getPriceParse[i]['FocQty'] + " " + Multiplier);
                //console.log('Apply Promotions sTmpQty: ' + sTmpQty + " " + sTmpPromoOffer.length);
                if (sTmpPromoOffer.length != 0) {
                    sTmpPromoOffer = sTmpPromoOffer + "," + getPriceParse[i]['PromoId'];
                    sTmpQty = parseFloat(sTmpQty) + (parseFloat(getPriceParse[i]['FocQty']) * parseFloat(Multiplier));
                    //console.log('Apply Promotions sTmpQty sTmpPromoOffer: ' + sTmpQty);
                    qry = "update temporderdet set PromoID = '" + sTmpPromoOffer + "', promooffer = '" + sTmpPromoOffer + "',  Qty = '" + sTmpQty + "'  where salesType ='F' and itemid ='" + getPriceParse[i]['Itemid'] + "' ";
                    //console.log("Apply Promotion Update FocQty : " + qry);
                } else {

                    try {
                        var query = "Delete from PromoEntitlementTemp WHERE SalesType = 'F' and itemno='" + getPriceParse[i]['Itemid'] + "' and  PromoId = '" + getPriceParse[i]['PromoId'] + "' and UOM = '" + getPriceParse[i]['UOM'] + "' and userid='" + FormView.UserID + "'";
                        var obj = execute(query);
                    } catch (e) {

                    }

                    try {

                        var InvoiceNo = '';//getInvoiceNo();
                        const currentDate = new Date();
                        const year = currentDate.getFullYear(); // Get the year (e.g., 2024)
                        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Get the month (0-11, add 1 to get 1-12), padded with leading zero if needed
                        const day = String(currentDate.getDate()).padStart(2, '0'); // Get the day of the month (1-31), padded with leading zero if needed
                        const hours = String(currentDate.getHours()).padStart(2, '0'); // Get the hour (0-23), padded with leading zero if needed
                        const minutes = String(currentDate.getMinutes()).padStart(2, '0'); // Get the minutes (0-59), padded with leading zero if needed
                        const currentDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;
                        var query_promotemp = "insert into PromoEntitlementTemp (CustNo, OrdNo, OrderDate, PromoId, PromoCount, PromoDiscount, Userid, SalesType, ItemNo, UOM) VALUES ('" + custNo + "', '" + InvoiceNo + "', '" + currentDateTime + "', '" + getPriceParse[i]['PromoId'] + "',1,'" + getPriceParse[i]['FocQty'] + "', '" + FormView.UserID + "','F','" + getPriceParse[i]['Itemid'] + "','" + getPriceParse[i]['UOM'] + "')";
                        var objwe = execute(query_promotemp);
                    } catch (e) {
                        alert(e);
                    }

                    var query = "Delete from TempOrderDet WHERE SalesType = 'F' and itemid='" + getPriceParse[i]['Itemid'] + "' and  PromoOffer = '" + getPriceParse[i]['PromoId'] + "' and userid = '" + FormView.UserID + "'";
                    var obj = execute(query);
                    //console.log("Apply Promotion sTmpPromoOffer Delete : " + query);
                    //var tmpp = UserID;
                    var tmpp = FormView.UserID;
                    qry = "insert into TempOrderdet (OrderNo, itemid, itemname, uom, qty, price, amount, PromoID, Priority, PromoOffer, DisPer, DisPr, ActPrice, ReasonCode, Remarks, LineNum, SalesType, SugQty, AutoNum, Unloaded,UserID) "
                        + "Select 'temp', P.ItemNo, P.itemname,  '" + getPriceParse[i]['UOM'] + "' as UOM, '" + getPriceParse[i]['FocQty'] + "'*" + Multiplier + " as Qty, 0 as Price, 0 as Amount, '" + getPriceParse[i]['PromoId'] + "' as PromoID, 0 as Priority,  '" + getPriceParse[i]['PromoId'] + "' as PromoOffer, 0 as DisPer, 0 as DisPr, 0 as ActPrice, isnull(Reason.Code,'FOC') as ReasonCode, '' as Remarks, 99 as LineNum, 'F' as SalesType, 0 as SugQty, 99999 as AutoNum, 0 as Unloaded,'" + tmpp + "' as UserID from Item P Inner Join UOM ON P.ItemNo = UOM.ItemNo and UOM.UOM = '" + getPriceParse[i]['UOM'] + "' LEFT JOIN Reason ON Reason.code = '" + getPriceParse[i]['Reason'] + "' where P.ItemNo = '" + getPriceParse[i]['Itemid'] + "'";
                    //qry = "insert into TempOrderdet (OrderNo, itemid, itemname, uom, qty, price, amount, PromoID, Priority, PromoOffer, DisPer, DisPr, ActPrice, ReasonCode, Remarks, LineNum, SalesType, SugQty, AutoNum, Unloaded) "
                    //    + "Select 'temp', P.itemid, P.itemname, '" + getPriceParse[i]['UOM'] + "' as UOM, '" + getPriceParse[i]['FocQty'] + "'*" + Multiplier + " as Qty, 0 as Price, 0 as Amount, '" + getPriceParse[i]['PromoId'] + "' as PromoID, 0 as Priority, '" + getPriceParse[i]['PromoId'] + "' as PromoOffer, 0 as DisPer, 0 as DisPr, 0 as ActPrice, ifnull(Reason.Code,'FOC') as ReasonCode, '' as Remarks, 99 as LineNum, 'F' as SalesType, 0 as SugQty, 99999 as AutoNum, 0 as Unloaded from Products P Inner Join UOM ON P.ItemId = UOM.ItemId and UOM.UOM = '" + getPriceParse[i]['UOM'] + "' LEFT JOIN Reason ON Reason.code = '" + getPriceParse[i]['Reason'] + "' where  P.ItemId = '" + getPriceParse[i]['Itemid'] + "'";

                }
                var _varObj = {};
                _varObj.sItemId = getPriceParse[i]['Itemid'];
                var checkPrd = getSystemValue('CheckProductAvailable');
                var CheckPromoBoolean = false;
                if (!checkPrd) {
                    CheckPromoBoolean = false;
                } else {
                    CheckPromoBoolean = CheckBooleanField(checkPrd);
                }
                if ((CheckPromoBoolean) && CheckData("select * from CustomerBlockedItem where CustNo = '" + custNo + "' and itemno ='" + _varObj.sItemId + "'")) {

                } else {
                    var checkstock = getSystemValue('CheckStockForFOC')
                    //console.log('Apply Promotion CheckStockForFOC :' + checkstock)
                    if (CheckBooleanField(checkstock)) {
                        var _varObj = {};
                        var agentID = '';
                        var syslocation = '';
                        var SalesAgentID = '';
                        var getAgentval1 = GetQueryString("GET_APPLYPROMOAGET", '');
                        var getAgentval = (getAgentval1);
                        for (var g = 0; g < getAgentval.length; g++) {
                            agentID = getAgentval[g]['AgentId'];
                            syslocation = getAgentval[g]['Location'];
                            SalesAgentID = getAgentval[g]['AgentId'];
                        }
                        //console.log('Apply Promotion CheckStockForFOC :' + syslocation + " " + agentID + " " + SalesAgentID);
                        var sCurrentLocation = syslocation, sCurrentAgent = agentID;
                        if (SalesAgentID == '' || SalesAgentID == null || SalesAgentID == undefined) {
                            sCurrentAgent = agentID;
                        } else {
                            sCurrentAgent = SalesAgentID;
                        }

                        //var getvarParam = {};
                        ParamJS.sCurrentAgent = sCurrentAgent;
                        getvarqry1 = GetQueryString("GET_APPLYPROMOSALE"); //, JSON.stringify(getvarParam));
                        var getvarqry = (getvarqry1);
                        for (var e = 0; e < getvarqry.length; e++) {
                            sCurrentLocation = getvarqry[e]['SalesOfficeId'];// _varObj.getvarqry[e]['SalesOfficeId'];//_varObj.dbDataRows.fieldByName('SalesOfficeId');
                        }

                        //var getObjParam = {};
                        ParamJS.syslocation = syslocation;
                        ParamJS.ItemId = getPriceParse[i]['Itemid'];

                        getobjqry1 = GetQueryString("GET_APPLYPROMOVAR"); //, JSON.stringify(getObjParam));
                        var getobjqry = (getobjqry1);
                        _varObj.dEnteredQty = 0;
                        _varObj.dVanQty = 0;
                        for (var r = 0; r < getobjqry.length; r++) {
                            _varObj.dEnteredQty = getobjqry[r]['Qty'];//_varObj.getobjqry[r]['Qty'];
                            _varObj.dVanQty = getobjqry[r]['VanQty'];// _varObj.getobjqry[r]['VanQty'];
                        }
                        _varObj.dEnteredQty = parseFloat(_varObj.dEnteredQty) + parseFloat(getPriceParse[i]['FocQty']) * Multiplier;
                        if (parseFloat(_varObj.dVanQty) < parseFloat(_varObj.dEnteredQty)) {
                            if (parseFloat(_varObj.dVanQty) > 0) {
                                var qry = "insert into TempOrderdet (OrderNo, itemid, itemname, uom, qty, price, amount, PromoID, Priority, PromoOffer, DisPer, DisPr, ActPrice, ReasonCode, Remarks, LineNum, SalesType, SugQty, AutoNum, Unloaded) "
                                        + "Select 'temp', P.itemid, P.itemname, '" + getPriceParse[i]['UOM'] + "' as UOM, '" + _varObj.dVanQty + "'*" + 1 + " as Qty, 0 as Price, 0 as Amount, '" + getPriceParse[i]['PromoId'] + "' as PromoID, 0 as Priority, '" + getPriceParse[i]['PromoId'] + "' as PromoOffer, 0 as DisPer, 0 as DisPr, 0 as ActPrice, ifnull(Reason.Code,'FOC') as ReasonCode, '' as Remarks, 99 as LineNum, 'F' as SalesType, 0 as SugQty, 99999 as AutoNum, 0 as Unloaded from Products P Inner Join UOM ON P.ItemId = UOM.ItemId and UOM.UOM = '" + getPriceParse[i]['UOM'] + "' LEFT JOIN Reason ON Reason.code = '" + getPriceParse[i]['Reason'] + "' where  P.ItemId = '" + getPriceParse[i]['Itemid'] + "'";
                                var obj = execute(qry);
                                //console.log("Apply Promotion insert dVanQty : " + qry);
                                PromoOfferItem.push(getPriceParse[i]['PromoId']);
                            }
                        } else {
                            var obj = execute(qry);
                            if (getPriceParse[i]['FocQty'] > 0) {
                                PromoOfferItem.push(getPriceParse[i]['PromoId']);
                            }
                        }

                    } else {
                        //console.log('Apply Promotion : ' + qry);
                        var obj = execute(qry);
                        if (Number(getPriceParse[i]['FocQty']) > 0) {
                            PromoOfferItem.push(getPriceParse[i]['PromoID']);
                        }
                    }
                }
            }
            else {
                var qry = "";
                var modelPrm = getSystemValue('ModelPromotion');
                var getModqry1 = "";
                if (CheckBooleanField(modelPrm)) {
                    //var getModParam = {};
                    ParamJS.PromoId = getPriceParse[i]['PromoId'];
                    ParamJS.ItemId = getPriceParse[i]['Itemid'];

                    getModqry1 = GetQueryString("GET_APPLYPROMOMOD"); //, JSON.stringify(getModParam));
                } else {
                    //var getModParam = {};
                    ParamJS.PromoId = getPriceParse[i]['PromoId'];
                    ParamJS.ItemId = getPriceParse[i]['Itemid'];

                    getModqry1 = GetQueryString("GET_APPLYPROMOMODE"); //, JSON.stringify(getModParam));
                }

                var LVItem = {};
                var newPromoOfferItems = [];
                var getModqry = (getModqry1);
                for (var t = 0; t < getModqry.length; t++) {
                    LVItem = null;
                    LVItem = {};
                    LVItem["PromoType"] = "FOCQTY";
                    LVItem["ItemId"] = getModqry[t]['ItemId'];
                    LVItem["OType"] = 'FOC';
                    LVItem["ItemName"] = getModqry[t]['Itemname'];
                    LVItem["UOM"] = getModqry[t]['UOM'];
                    LVItem["Qty"] = Math.floor(Multiplier * parseFloat(getModqry[t]['FOcQty']));
                    LVItem["Price"] = 0;
                    LVItem["Amount"] = 0;
                    LVItem["Reason"] = getModqry[t]['Reason'];
                    LVItem["DisPrice"] = 0;
                    LVItem["Promotion"] = getModqry[t]['PromoID'];
                    LVItem["Priority"] = 0;
                    LVItem["Category"] = getModqry[t]['CategoryId'] == undefined ? getModqry[t]['Category'] : getModqry[t]['CategoryId'];
                    LVItem["shortdesc"] = getModqry[t]['shortdesc'];
                    LVItem["PromoCount"] = iMultiCnt;
                    LVItem["LineType"] = getModqry[t]['LineType'];
                    LVItem["DisCalc"] = getModqry[t]['DisCalc'];
                    LVItem["PromoId"] = getModqry[t]['PromoID'];
                    newPromoOfferItems.push(LVItem);
                }
                if (newPromoOfferItems.length > 0) {
                    obj = {};
                    obj.arrPromoCode = [newPromoOfferItems[0].PromoId];
                    obj.sArrPromoOfferItems = newPromoOfferItems;
                    obj.bPromoOfferItems = true;
                    obj.sItemId = sItemNo;
                    obj.sItemname = newPromoOfferItems[0].ItemName;
                    obj.sUOM = newPromoOfferItems[0].UOM;
                    obj.dQty = newPromoOfferItems[0].Qty;
                    obj.dPromoQty = newPromoOfferItems[0].Qty;
                    arrPromoOfferItems.push(obj);
                }
            }
        }

    }
    arrPromoOfferItemObj = arrPromoOfferItems;
}

function ItemPromo_LogString(errorStr) {
    try {
        $.ajax({
            type: 'POST',            url: url_WriteItemPromoLog,            dataType: 'json',            data: { msg: errorStr },            async: false,            success: function (data) {                //alert(data);            }
        });
    }    catch (err) {        //alert(JSON.stringify(err));    }
}
