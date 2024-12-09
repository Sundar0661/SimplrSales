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
    var obj = app.ExecuteSQL(query);
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

 
//subfunction

function GetQueryString(sScreenName) {
    
    var qry = getString['QueryConfig_' + sScreenName];
    qry += ' ' + getString['QueryConfig_' + sScreenName + '_GroupText'];
    qry += ' ' + getString['QueryConfig_' + sScreenName + '_OrderText'];
    qry = formatQueryString(qry, sScreenName);
    execute(qry);
    return executeQry;
    //return qry;
}





//New1
////////////////////////=========================================================================

var ParamJS = {};
function CheckInvoicePromotion_1(sitemid, suom, dqty, scat, dtorderdate)
    //function CheckInvoicePromotion(sitemid, suom, dqty, scat)
{
    sitemid = "CADBL10-P";
    suom = "PD";
    var rtn = 0;
    var s = "{\"key\":\"ModelPromotion\"}";
    return;
    var bBulkUomPrice = getSystemValue('BulkUomPrice');
    // var bBulkUomPrice = CheckBooleanField(sysBulkUomPrice);
    PromoItemBulkUOM = suom;
    var sysUOMType = getSystemValue('UOMType');

    if (bBulkUomPrice == true || bBulkUomPrice == '1') {
        //ParamJS = {};
        //ParamJS.itemNo = sitemid;
        //var suomRes = app.ReadRecord("GET_PRODUCTS_VALUE", JSON.stringify(productParam));
        //var suomParse = JSON.parse(suomRes);
        //for (var i = 0; i < suomParse.length; i++) {
        //    suom = suomParse[i]["BulkUOM"];
        //}
        var dbDataRows1 = GetQueryString("GET_PRODUCTS_VALUE");
        for (var i = 0; i < dbDataRows1.length; i++) {
            suom = dbDataRows1[i].BaseUOM == undefined ? "" : dbDataRows1[i].BaseUOM;//BulkUOM
        }



        //var uomParam = {};
        //uomParam.uom = suom;
        //uomParam.itemNo = sitemid;
        //var suom1 = app.ReadRecord("GET_UOM_VALUE", JSON.stringify(uomParam));
        //var suomParse1 = JSON.parse(suom1);
        //for (var i = 0; i < suomParse1.length; i++) {
        //    suomq = suomParse1[i]["BulkUOM"];
        //}
        var dbDataRows1 = GetQueryString("GET_UOM_VALUE");

        var suomq = 0;
        for (var i = 0; i < dbDataRows1.length; i++) {
            suomq = dbDataRows1[i].BulkUOM;
        }
        dqty = parseFloat(dqty) / parseFloat(suomq);


    } else if (sysUOMType == '2' || sysUOMType == 2) {
        iBaseQty = getBaseQty(sitemid, suom);
        dqty = dqty / iBaseQty;
    }

    var sysCustomerID = getSystemValue('CustomerID');

    PromoItemBulkUOM = suom;

    dPromoEnterQty = dqty;

    arrPromoList = [];
    newOrdItems = [];
    lstOrdItems = [];

    promotion = {};
    qry = "";
    dbDataRows = "";
    dtrOffer = [];
    var dLastMultiCnt = -1;
    Arr = [];
    stPromo = {};
    bPromo = false;
    //dtOrdDate = Ti.App.dtDeliveryDate;

    var date = new Date();
    dtDeliveryDate = date;
    dtOrdDate = dtDeliveryDate;


    var sysModelPromotion = getSystemValue('ModelPromotion');
    var bModelPromotion = CheckBooleanField(sysModelPromotion);


    var custDet = [];
    custDet = setCustomerFields(sysCustomerID);


    console.log('log from javascript' + custDet[0]["CustName"]);
    var AgentId = getAgentId();

    var qry
    if (bModelPromotion == true) {
        var promotionParam = {};
        promotionParam.dtorderdate = dtorderdate;
        promotionParam.sitemid = sitemid;
        promotionParam.scat = scat;
        promotionParam.CustNo = sysCustomerID;
        promotionParam.agentID = AgentId;
        promotionParam.PriceGroup = dtorderdate;
        promotionParam.PriceGroup2 = dtorderdate;
        qry = app.ReadRecord("GET_PROMOTION_PRICE", JSON.stringify(promotionParam));
    } else {
        var promotionParam = {};
        promotionParam.dtorderdate = dtorderdate;
        promotionParam.sitemid = sitemid;
        promotionParam.scat = scat;
        promotionParam.CustNo = sysCustomerID;
        promotionParam.agentID = AgentId;
        promotionParam.PriceGroup = custDet[0]["PriceGroup"];
        promotionParam.PriceGroup2 = custDet[0]["PriceGroup2"];
        promotionParam.Custchannel = custDet[0]["Custchannel"];
        promotionParam.CustSubchannel = custDet[0]["CustSubchannel"];
        qry = app.ReadRecord("GET_PROMOTION_CHANNEL", JSON.stringify(promotionParam));
    }
    var qryParse = JSON.parse(qry);
    for (var i = 0; i < qryParse.length; i++) {
        stPromo = {};
        stPromo["PromoId"] = qryParse[i]["PromoID"];
        stPromo["Entitle"] = qryParse[i]["Entitle"];
        stPromo["EntitleType"] = qryParse[i]["EntitleType"];
        Arr.push(stPromo);
    }
    if (Arr.length == 0) {
        return promotion;
    }//NextRecord:
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
                var promoTitleParam = {};
                promoTitleParam.CustNo = dtorderdate;
                promoTitleParam.PromoId = stPromo["PromoId"];
                promoTitleParam.dtorderdate = dtorderdate;
                qry = app.ReadRecord("GET_PROMOTITLE_VALUE", JSON.stringify(promoTitleParam));
                var qryParse = JSON.parse(qry);
                for (var i = 0; i < qryParse.length; i++) {
                    iPCount = qryParse[i]["TotalPromoApplied"];
                }
            } else if (stPromo.EntitleType == 'Per Week' || stPromo.EntitleType == 'PerWeek') {
                var tmpDate = dtOrdDate;
                tmpDate = new Date();
                var weekday = new Date(tmpDate.setDate(tmpDate.getDate() - (tmpDate.getDay() - 1)));
                var promoTitleParam = {};
                promoTitleParam.CustNo = dtorderdate;
                promoTitleParam.PromoId = stPromo["PromoId"];
                promoTitleParam.weekday = weekday;
                qry = app.ReadRecord("GET_PROMOTITLE_WEEK", JSON.stringify(promoTitleParam));
                var qryParse = JSON.parse(qry);
                for (var i = 0; i < qryParse.length; i++) {
                    iPCount = qryParse[i]["TotalPromoApplied"];
                }
            } else if (stPromo.EntitleType == 'Per Month' || stPromo.EntitleType == 'PerMonth') {
                var tmpDate = new Date(dtOrdDate.getFullYear(), dtOrdDate.getMonth(), 1);
                var promoTitleParam = {};
                promoTitleParam.CustNo = dtorderdate;
                promoTitleParam.PromoId = stPromo["PromoId"];
                promoTitleParam.weekday = tmpDate;
                qry = app.ReadRecord("GET_PROMOTITLE_MONTH", JSON.stringify(promoTitleParam));
                var qryParse = JSON.parse(qry);
                for (var i = 0; i < qryParse.length; i++) {
                    iPCount = qryParse[i]["TotalPromoApplied"];
                }
            } else if (stPromo.EntitleType == 'Per Promotion' || stPromo.EntitleType == 'PerPromotion' || stPromo.EntitleType == 'Per Invoice' || stPromo.EntitleType == 'PerInvoice' || stPromo.EntitleType == 'Per Order' || stPromo.EntitleType == 'PerOrder') {
                var promoTitleParam = {};
                promoTitleParam.CustNo = dtorderdate;
                promoTitleParam.PromoId = stPromo["PromoId"];
                qry = app.ReadRecord("GET_PROMOTITLE_PER", JSON.stringify(promoTitleParam));
                var qryParse = JSON.parse(qry);
                for (var i = 0; i < qryParse.length; i++) {
                    iPCount = qryParse[i]["TotalPromoApplied"];
                }
            }
            if (iPCount >= stPromo.Entitle) {
                //continue NextRecord; //break NextRecord;
            }
        }
        arrGroup = [];
        ipdGroup = {};
        var promoTitleParam = {};
        promoTitleParam.PromoId = stPromo["PromoId"];
        qry = app.ReadRecord("GET_PROMOTION_MIN", JSON.stringify(promoTitleParam));
        var qryParse = JSON.parse(qry);
        for (var i = 0; i < qryParse.length; i++) {
            ipdGroup = {};
            ipdGroup["PromoId"] = qryParse[i]["PromoId"];
            ipdGroup["Priority"] = qryParse[i]["Priority"];
            ipdGroup["ItemId"] = qryParse[i]["ItemId"];
            ipdGroup["UOM"] = qryParse[i]["UOM"];
            ipdGroup["MinQty"] = qryParse[i]["MinQty"];
            ipdGroup["MaxQty"] = qryParse[i]["MaxQty"];
            ipdGroup["Multiply"] = qryParse[i]["Multiply"];
            ipdGroup["LineType"] = qryParse[i]["LineType"];
            ipdGroup["Entitle"] = qryParse[i]["Entitle"];
            ipdGroup["EntitleType"] = qryParse[i]["EntitleType"];
            ipdGroup["MinAmt"] = qryParse[i]["MinAmt"];
            ipdGroup["MaxAmt"] = qryParse[i]["MaxAmt"];
            arrGroup.push(ipdGroup);
        }
        var promoTitleParam = {};
        promoTitleParam.PromoId = stPromo["PromoId"];
        qry = app.ReadRecord("GET_PROMOTION_MINLIKE", JSON.stringify(promoTitleParam));
        var qryParse = JSON.parse(qry);
        for (var i = 0; i < qryParse.length; i++) {
            bItemPromo = true;
            bCondition = false;
            iPriority = qryParse[i]["Priority"];
            if (qryParse[i]["Multiply"] == "Incremental") {
                bMultiply = true;
            }
            iCnt = 1;
            if (sysUOMType == '2' || sysUOMType == 2) {
                var sysBaseQtytoBulk = getSystemValue('BaseQtytoBulk');
                var bsysBaseQtytoBulk = CheckBooleanField(sysBaseQtytoBulk);
                if (bsysBaseQtytoBulk == true) {
                    var baseQtyParam = {};
                    baseQtyParam.UOM = qryParse[i]["UOM"];
                    baseQtyParam.ItemId = qryParse[i]["ItemId"];
                    tempOrdqry = app.ReadRecord("GET_PROMO_BASEQTY", JSON.stringify(baseQtyParam));
                } else {
                    var baseQtyParam = {};
                    baseQtyParam.UOM = qryParse[i]["UOM"];
                    baseQtyParam.ItemId = qryParse[i]["ItemId"];
                    tempOrdqry = app.ReadRecord("GET_PROMO_BASEQTYEL", JSON.stringify(baseQtyParam));
                }
            } else {
                if ((qryParse[i]["MaxQty"] == 0 && qryParse[i]["MinQty"] == 0)) {
                    var tempOrdParam = {};
                    tempOrdParam.ItemId = qryParse[i]["ItemId"];
                    tempOrdParam.UOM = qryParse[i]["UOM"];
                    tempOrdParam.MinQty = qryParse[i]["MinQty"];
                    tempOrdParam.MaxQty = qryParse[i]["MaxQty"];
                    tempOrdqry = app.ReadRecord("GET_PTEMPORDET", JSON.stringify(tempOrdParam));
                } else {
                    var tempOrdParam = {};
                    tempOrdParam.ItemId = qryParse[i]["ItemId"];
                    tempOrdParam.UOM = qryParse[i]["UOM"];
                    tempOrdqry = app.ReadRecord("GET_PTEMPORDETEL", JSON.stringify(tempOrdParam));
                }
            }
            var tempOrdParse = JSON.parse(tempOrdqry);
            for (var j = 0; j < tempOrdParse.length; j++) {
                if ((qryParse[i]["MinQty"] > tempOrdParse[j]["Qty"] || qryParse[i]["MaxQty"] < tempOrdParse[j]["Qty"]) && (qryParse[i]["MinAmt"] > tempOrdParse[j]["Amount"] || qryParse[i]["MaxAmt"] < tempOrdParse[j]["Amount"])) {
                    bCondition = false;
                    _obj = {};
                    _obj.PromoId = qryParse[i]["PromoId"];
                    _obj.MinQty = qryParse[i]["MinQty"];
                    _obj.Priority = qryParse[i]["Priority"];
                    _obj.Entitle = qryParse[i]["Entitle"];
                    _obj.EntitleType = qryParse[i]["EntitleType"];
                    arrPromoList.push(_obj);

                    break;//While1;
                } else {
                    var ItemPromotionPriority = getSystemValue('ItemPromotionPriority');
                    ItemPromotionPriority = (ItemPromotionPriority == "" || ItemPromotionPriority == null || ItemPromotionPriority == undefined) ? "" : ItemPromotionPriority;
                    if (qryParse[i]["Priority"] > 0) {
                        if (tempOrdParse[j]["Priority"] < qryParse[i]["Priority"]) {
                            bCondition = false;
                            break;// While1;
                        }
                    }
                    if (bMultiply == true) {
                        iMulti = Math.floor(tempOrdParse[j]["Qty"] / qryParse[i]["MinQty"]);
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
                break;// While2;
            }

        }
        if (bItemPromo == true && bCondition == false) {
            //continue NextRecord; //break NextRecord;
        }
        dPQty = 0;
        var dpromoCondAmt = 0;
        var promoTitleParam = {};
        promoTitleParam.PromoId = stPromo["PromoId"];
        promoTitleqry = app.ReadRecord("GET_PROMOTION_TITLE", JSON.stringify(promoTitleParam));
        var promoTitleParse = JSON.parse(promoTitleqry);
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
                    var promoTitleParam = {};
                    promoTemOrdParam.UOM = promoTitleParse[i]["UOM"];
                    promoTemOrdParam.ItemId = promoTitleParse[i]["ItemId"];
                    promoTemOrdqry = app.ReadRecord("GET_PROTEMPORD_PRODUCT", JSON.stringify(promoTemOrdParam));

                } else {
                    var promoTitleParam = {};
                    promoTemOrdParam.UOM = promoTitleParse[i]["UOM"];
                    promoTemOrdParam.ItemId = promoTitleParse[i]["ItemId"];
                    promoTemOrdqry = app.ReadRecord("GET_PROTEMPORD_PRODUCTSL", JSON.stringify(promoTemOrdParam));

                }
            } else {
                var promoTitleParam = {};
                promoTemOrdParam.ItemId = promoTitleParse[i]["ItemId"];
                promoTemOrdParam.UOM = promoTitleParse[i]["UOM"];
                promoTemOrdqry = app.ReadRecord("GET_PROTEMPORD_PRODUCT", JSON.stringify(promoTemOrdParam));
            }
            var promoTemOrdParse = JSON.parse(promoTemOrdqry);
            for (var i = 0; i < promoTemOrdParse.length; i++) {
                bCondition = true;
                var _dQty = promoTitleParse[i]["Qty"];
                _dQty = (_dQty == null || _dQty == undefined || _dQty == '') ? 0 : _dQty;
                if (promoTemOrdParse[i]["Priority"].length > 0) {
                    if (promoTemOrdParse[i]["Priority"] >= promoTemOrdParse[i]["Priority"]) {
                        dPQty += parseFloat(_dQty);
                        arrCnt.push(iCnt);
                    }
                } else {
                    dPQty += parseFloat(_dQty);
                    arrCnt.push(iCnt);
                }
                var _tmpPromoCondAmt = promoTemOrdParse[i]["Amount"];
                _tmpPromoCondAmt = (_tmpPromoCondAmt == null || _tmpPromoCondAmt == undefined || _tmpPromoCondAmt == '') ? 0 : _tmpPromoCondAmt;
                dpromoCondAmt += parseFloat(_tmpPromoCondAmt);
                iCnt++;
            }
            if ((promoTemOrdParse[i]["MinQty"] > dPQty || promoTemOrdParse[i]["MaxQty"] < dPQty) && (promoTemOrdParse[i]["MinAmt"] > dpromoCondAmt || promoTemOrdParse[i]["MaxAmt"] < dpromoCondAmt)) {
                bCondition = false;
                _obj = {};
                _obj.PromoId = promoTemOrdParse[i]["PromoId"];
                _obj.MinQty = promoTemOrdParse[i]["MinQty"];
                _obj.Priority = promoTemOrdParse[i]["Priority"];
                _obj.Entitle = promoTemOrdParse[i]["Entitle"];
                _obj.EntitleType = promoTemOrdParse[i]["EntitleType"];
                arrPromoList.push(_obj);
                break; //While2;
            }
        }
        if (bCatPromo == true && bCondition == false) {
            //continue NextRecord; //break NextRecord;
        }
        dPQty = 0;
        dpromoCondAmt = 0;
        var promoBrandParam = {};
        promoBrandParam.PromoId = stPromo["PromoId"];
        promoBrandqry = app.ReadRecord("GET_PROMOTION_BRAND", JSON.stringify(promoBrandParam));
        var promoBrandParse = JSON.parse(promoBrandqry);
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
                    var promoTitleParam = {};
                    promoTemBrdParam.UOM = promoBrandParse[i]["UOM"];
                    promoTemBrdParam.ItemId = promoBrandParse[i]["ItemId"];
                    promoTemBrdqry = app.ReadRecord("GET_PROTEMPORD_BRAND", JSON.stringify(promoTemBrdParam));
                } else {
                    var promoTitleParam = {};
                    promoTemBrdParam.UOM = promoBrandParse[i]["UOM"];
                    promoTemBrdParam.ItemId = promoBrandParse[i]["ItemId"];
                    promoTemBrdqry = app.ReadRecord("GET_PROTEMPORD_BRANDSL", JSON.stringify(promoTemBrdParam));
                }
            } else {
                var promoTitleParam = {};
                promoTemBrdParam.UOM = promoBrandParse[i]["UOM"];
                promoTemBrdParam.ItemId = promoBrandParse[i]["ItemId"];
                promoTemBrdqry = app.ReadRecord("GET_PROTEMPORD_BRANDCAT", JSON.stringify(promoTemBrdParam));
            }
            var promoTemBrdParse = JSON.parse(promoTemBrdqry);
            for (var i = 0; i < promoTemBrdParse.length; i++) {
                bCondition = true;
                var _dQty = promoTemBrdParse[i]["Qty"];
                _dQty = (_dQty == null || _dQty == undefined || _dQty == '') ? 0 : _dQty;
                if (promoTemBrdParse[i]["Priority"].length > 0) {
                    if (promoTemBrdParse[i]["Priority"] >= promoTemOrdParse[i]["Priority"]) {
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
            if ((promoTemBrdParse[i]["MinQty"] > dPQty || promoTemOrdParse[i]["MaxQty"] < dPQty) && (promoTemBrdParse[i]["MinAmt"] > dpromoCondAmt || promoTemOrdParse[i]["MaxAmt"] < dpromoCondAmt)) {
                bCondition = false;
                _obj = {};
                _obj.PromoId = promoTemOrdParse[i]["PromoId"];
                _obj.MinQty = promoTemOrdParse[i]["MinQty"];
                _obj.Priority = promoTemOrdParse[i]["Priority"];
                _obj.Entitle = promoTemOrdParse[i]["Entitle"];
                _obj.EntitleType = promoTemOrdParse[i]["EntitleType"];
                arrPromoList.push(_obj);
                break; //While2;
            }
            if (bMultiply == true) {
                iMulti = Math.floor(dPQty / promoTemOrdParse[i]["MinQty"]);
                if (iMulti > iMultiCnt) {
                    iMultiCnt = iMulti;
                }
                if (dLastMultiCnt < 0 || (dLastMultiCnt != iMultiCnt && dLastMultiCnt > iMultiCnt)) {
                    dLastMultiCnt = iMultiCnt;
                }
            }
            if (bCondition == false) {
                break;// While2;
            }
        }
        if (bCatPromo == true && bCondition == false) {
            //continue NextRecord; //break NextRecord;
        }
        if (bModelPromotion == true) {
            dPQty = 0;
            dpromoCondAmt = 0;
            var promoModelParam = {};
            promoModelParam.PromoId = stPromo["PromoId"];
            promoModelqry = app.ReadRecord("GET_PROMOTION_MODEL", JSON.stringify(promoModelParam));
            var promoModelParse = JSON.parse(promoModelqry);
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
                        var promoSaleParam = {};
                        promoSaleParam.UOM = promoModelParse[i]["UOM"];
                        promoSaleParam.ItemId = promoModelParse[i]["ItemId"];
                        promoTemSaleqry = app.ReadRecord("GET_PROTEMPORD_MODEL", JSON.stringify(promoSaleParam));
                    } else {
                        var promoSaleParam = {};
                        promoSaleParam.UOM = promoModelParse[i]["UOM"];
                        promoSaleParam.ItemId = promoModelParse[i]["ItemId"];
                        promoTemSaleqry = app.ReadRecord("GET_PROTEMPORD_MODELSL", JSON.stringify(promoSaleParam));
                    }
                } else {
                    var promoSaleParam = {};
                    promoSaleParam.UOM = promoModelParse[i]["UOM"];
                    promoSaleParam.ItemId = promoModelParse[i]["ItemId"];
                    promoTemSaleqry = app.ReadRecord("GET_PROTEMPORD_MODELCAT", JSON.stringify(promoSaleParam));
                }
                var promoTemSaleParse = JSON.parse(promoTemSaleqry);
                for (var i = 0; i < promoTemSaleParse.length; i++) {
                    bCondition = true;
                    var _dQty = promoTemSaleParse[i]["Qty"];
                    _dQty = (_dQty == null || _dQty == undefined || _dQty == '') ? 0 : _dQty;
                    if (promoTemSaleParse[i]["Priority"].length > 0) {
                        if (promoTemSaleParse[i]["Priority"] >= promoModelParse[i]["Priority"]) {
                            dPQty += parseFloat(_dQty);
                            arrCnt.push(iCnt);
                        }
                    } else {
                        dPQty += parseFloat(_dQty);
                        arrCnt.push(iCnt);
                    }
                    var _tmpPromoCondAmt = promoTemSaleParse[i]["Amount"];
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
                    break; //While2;
                }
                if (bMultiply == true) {
                    iMulti = Math.floor(dPQty / s13[i]["MinQty"]);
                    if (iMulti > iMultiCnt) {
                        iMultiCnt = iMulti;
                    }
                    if (dLastMultiCnt < 0 || (dLastMultiCnt != iMultiCnt && dLastMultiCnt > iMultiCnt)) {
                        dLastMultiCnt = iMultiCnt;
                    }
                }
                if (bCondition == false) {
                    break;// While2;
                }

            }
            if (bCatPromo == true && bCondition == false) {
                //continue NextRecord; //break NextRecord;
            }
        }
        dpromoCondAmt = 0;
        bPromoGroup = false;
        var promoGroupParam = {};
        promoGroupParam.PromoId = stPromo["PromoId"];
        promoGroupqry = app.ReadRecord("GET_PROMOTION_GROUP", JSON.stringify(promoGroupParam));
        var promoGroupParse = JSON.parse(promoGroupqry);
        for (var i = 0; i < promoGroupParse.length; i++) {
            if (promoGroupParse[i]["Multiply"] == 'Incremental') {
                bMultiply = true;
            }
            bPromoGroup = true;
            bCondition = false;
            if (bModelPromotion == true) {
                var promoGroProParam = {};
                promoGroProParam.ItemId = promoGroupParse["ItemId"];
                promoGroProParam.GroupPromo = promoGroupParse["GroupPromo"];
                promoGroProParam.PromoId = promoGroupParse["PromoId"];
                promoGroProParam.Priority = promoGroupParse["Priority"];
                promoGroProParam.UOM = promoGroupParse["UOM"];
                promoGroProParam.CustNo = CustNo;
                promoGroProqry = app.ReadRecord("GET_PROMOTION_GROUPROMO", JSON.stringify(promoGroProParam));
            } else {
                var promoGroProParam = {};
                promoGroProParam.ItemId = promoGroupParse["ItemId"];
                promoGroProParam.GroupPromo = promoGroupParse["GroupPromo"];
                promoGroProParam.PromoId = promoGroupParse["PromoId"];
                promoGroProParam.Priority = promoGroupParse["Priority"];
                promoGroProParam.UOM = promoGroupParse["UOM"];
                promoGroProParam.CustNo = CustNo;
                promoGroProqry = app.ReadRecord("GET_PROMOTION_GROUPROMOE", JSON.stringify(promoGroProParam));
            }
            var promoGroProParse = JSON.parse(promoGroProqry);
            for (var i = 0; i < promoGroProParse.length; i++) {
                if (promoGroProParse[i]["MinQty"] > promoGroProParse[i]["Qty"] || (promoGroProParse[i]["MaxQty"] > 0 && promoGroProParse[i]["MaxQty"] < promoGroProParse[i]["Qty"]) || promoGroProParse[i]["MinAmt"] > promoGroProParse[i]["amount"] || (promoGroProParse[i]["MaxAmt"] > 0 && promoGroProParse[i]["MaxAmt"] < promoGroProParse[i]["amount"])) {
                    bCondition = false;
                    _obj = {};
                    _obj.PromoId = promoGroProParse[i]["PromoId"];
                    _obj.MinQty = promoGroProParse[i]["MinQty"];
                    _obj.Priority = promoGroProParse[i]["Priority"];
                    _obj.Entitle = promoGroProParse[i]["Entitle"];
                    _obj.EntitleType = promoGroProParse[i]["EntitleType"];
                    break; //While2;

                } else {
                    if (bMultiply == true) {
                        iMulti = Math.floor(promoGroProParse[i]["Qty"] / promoGroProParse[i]["MinQty"]);
                        iMultiCnt = iMulti;
                    }
                    if (dLastMultiCnt < 0 || (dLastMultiCnt != iMultiCnt && dLastMultiCnt > iMultiCnt)) {
                        dLastMultiCnt = iMultiCnt;
                    }
                }
            }
            if (bCondition == false) {
                break;// While1;
            }
        }
        if (bPromoGroup == true && bCondition == false) {
            //continue NextRecord; //break NextRecord;
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
            var promoCondParam = {};
            promoCondParam.PromoId = stPromo["PromoId"];
            promoCondqry = app.ReadRecord("GET_PROMOTION_COND", JSON.stringify(promoCondParam));
            var promoCondParse = JSON.parse(promoCondqry);
            for (var i = 0; i < promoCondParse.length; i++) {
                var sUpdatePromoIdQry = "";
                if (bModelPromotion == true) {
                    var query = "update TempOrderDet SET PromoID = (CASE WHEN (ifnull(PromoID,'') = '' OR ifnull(PromoID,'') = '" + promoCondParse[i]["PromoId"] + "') THEN  '" + promoCondParse[i]["PromoId"] + "' ELSE  PromoID ||','|| '" + promoCondParse[i]["PromoId"] + "' END), Priority ='" + CheckDecimal(promoCondParse[i]["Priority"]) + "' WHERE SalesType = 'S' and CASE WHEN ifnull(Priority,'') = '' THEN 999 ELSE  Priority END >= cast('" + CheckDecimal(promoCondParse[i]["Priority"]) + "'  as int) and CASE WHEN ('" + promoCondParse[i]["LineType"] + "' = 'Item') THEN ItemId ='" + promoCondParse[i]["ItemId"] + "' ELSE CASE WHEN ('" + promoCondParse[i]["LineType"] + "' = 'Promotion Group') THEN ItemId in (Select ItemId from PromoGroup WHERE GroupId = '" + promoCondParse[i]["Itemid"] + "' and (ifnull(LineType,'') = '' OR ifnull(LineType,'') = 'Item') UNION Select Products.ItemId from PromoGroup INNER JOIN Products on Products.Brand = PromoGroup.ItemId WHERE GroupId = '" + promoCondParse[i]["Itemid"] + "' and  ifnull(LineType,'') = 'Brand' UNION Select Products.ItemId from PromoGroup INNER JOIN Products on Products.CategoryId = PromoGroup.ItemId  WHERE GroupId ='" + promoCondParse[i]["Itemid"] + "' and ifnull(LineType,'') = 'Category' UNION Select Products.ItemId from PromoGroup INNER JOIN Products on Products.Model = PromoGroup.ItemId  WHERE GroupId = '" + promoCondParse[i]["Itemid"] + "' and ifnull(LineType,'') = 'Model') ELSE CASE WHEN ('" + promoCondParse[i]["LineType"] + "' = 'Category') THEN ItemId in (Select ItemId from Products WHERE categoryId ='" + promoCondParse[i]["Itemid"] + "')ELSE CASE WHEN ( '" + promoCondParse[i]["LineType"] + "' = 'Brand') THEN ItemId in (Select ItemId from Products WHERE Brand = '" + promoCondParse[i]["Itemid"] + "')ELSE ItemId ='" + promoCondParse[i]["Itemid"] + "'  END END END END";
                    var obj = app.ExecuteSQL(query);
                } else {
                    var query = "update TempOrderDet SET PromoID = (CASE WHEN (ifnull(PromoID,'') = '' OR ifnull(PromoID,'') = '" + promoCondParse[i]["PromoId"] + "') THEN  '" + promoCondParse[i]["PromoId"] + "' ELSE  CASE WHEN (select count(*) from (select '''' || replace(ifnull(PromoID,''),',',''',''') || '''' as Promo ) a  where Promo like '%'''" + promoCondParse[i]["PromoId"] + "' ''%') > 0 then ifnull(PromoID,'') else PromoID ||','|| '" + promoCondParse[i]["PromoId"] + "' END END) , Priority ='" + CheckDecimal(promoCondParse[i]["Priority"]) + "' WHERE SalesType = 'S' and CASE WHEN ifnull(Priority,'') = '' THEN 999 ELSE  Priority END >= cast('" + CheckDecimal(promoCondParse[i]["Priority"]) + "' as int) and CASE WHEN ( '" + promoCondParse[i]["LineType"] + "' = 'Item') THEN ItemId = '" + promoCondParse[i]["Itemid"] + "' ELSE CASE WHEN ( '" + promoCondParse[i]["LineType"] + "' = 'Promotion Group') THEN ItemId in (Select ItemId from PromoGroup WHERE GroupId ='" + promoCondParse[i]["Itemid"] + "' and (ifnull(LineType,'') = '' OR ifnull(LineType,'') = 'Item') UNION Select Products.ItemId from PromoGroup INNER JOIN Products on Products.Brand = PromoGroup.ItemId WHERE GroupId = '" + promoCondParse[i]["Itemid"] + "' and  ifnull(LineType,'') = 'Brand' UNION Select Products.ItemId from PromoGroup INNER JOIN Products on Products.CategoryId = PromoGroup.ItemId  WHERE GroupId ='" + promoCondParse[i]["Itemid"] + "' and ifnull(LineType,'') = 'Category') ELSE CASE WHEN ('" + promoCondParse[i]["LineType"] + "'= 'Category') THEN ItemId in (Select ItemId from Products WHERE categoryId = '" + promoCondParse[i]["Itemid"] + "' ELSE CASE WHEN ( '" + promoCondParse[i]["LineType"] + "'= 'Brand') THEN ItemId in (Select ItemId from Products WHERE Brand ='" + promoCondParse[i]["Itemid"] + "') ELSE ItemId ='" + promoCondParse[i]["Itemid"] + "' END END END END";
                    var obj = app.ExecuteSQL(query);
                }
                if (CheckPromoAfterSave == false) {
                    //Ti.App.ARRAYOPERATION.updateColumnData(0, Ti.App.dPromoItemRowIndex, "Promotion", promoCondParse[i]["PromoId"]);
                    updatePromotion(promoCondParse[i]["PromoId"]);
                }
            }
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
            var promOfferParam = {};
            promOfferParam.PromoId = stPromo["PromoId"];
            promoOfferqry = app.ReadRecord("GET_PROMOFFER", JSON.stringify(promOfferParam));
            var promOfferParse = JSON.parse(promoOfferqry);
            for (var i = 0; i < promOfferParse.length; i++) {
                bPromoGroup = true;
            }
            if (bPromoGroup == true || bCatPromo == true) {
                sSelectedItem = '';
                bCheckDataExists = false;
                if (CheckData("Select PromoOffer.FocQty, PromoOffer.ItemID from PromoOffer where PromoID = '" + stPromo["PromoId"] + "'")) {
                    var promGroupParam = {};
                    promGroupParam.PromoId = stPromo["PromoId"];
                    promGroupqry = app.ReadRecord("GET_PROMOGROUP", JSON.stringify(promGroupParam));
                    var promGroupParse = JSON.parse(promGroupqry);
                    for (var i = 0; i < promGroupParse.length; i++) {
                        bCheckDataExists = true;
                        if (sSelectedItem == '') {
                            sSelectedItem = "" + promGroupParse[i]["ItemId"] + "";
                        }
                        else {
                            sSelectedItem = sSelectedItem + "," + promGroupParse[i]["ItemId"] + "";
                        }
                    }
                }
                if (bCheckDataExists == true) {
                    var promProductParam = {};
                    promProductParam.selectItem = sSelectedItem;
                    promProductParam.PromoId = stPromo["PromoId"];
                    promProductqry = app.ReadRecord("GET_PROMOPROSELECT", JSON.stringify(promProductParam));

                } else {
                    var promProductParam = {};
                    promProductParam.PromoId = stPromo["PromoId"];
                    promProductqry = app.ReadRecord("GET_PROMOPRO", JSON.stringify(promProductParam));

                }
            } else {
                var promProductParam = {};
                promProductParam.PromoId = stPromo["PromoId"];
                promProductqry = app.ReadRecord("GET_PROMOPROEL", JSON.stringify(promProductParam));
            }
            var promProductParse = JSON.parse(promProductqry);
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
                    LVItem["Qty"] = Math.floor(iMultiCnt * parseFloat(s21[i]["FOcQty"]));
                    if (bEnableFOCPrice == true) {
                        var price = this.getPrice(promProductParse[i]["ItemId"], promProductParse[i]["UOM"], Math.floor(iMultiCnt * parseFloat(promProductParse[i]["FOcQty"])), 1, promProductParse[i]["UOM"], Ti.App.ARRAYOPERATION.getCustFieldValue('PriceGroup'), false);
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
                    tempOrderDetqry = app.ReadRecord("GET_TEMPORDERET", "");
                    var tempOrderDetParse = JSON.parse(tempOrderDetqry);
                    for (var i = 0; i < tempOrderDetParse.length; i++) {
                        var getProductParam = {};
                        getProductParam.ItemId = tempOrderDetParse[i]["ItemId"];
                        getProductqry = app.ReadRecord("GET_PRODUCT", JSON.stringify(getProductParam));
                        var getProductParse = JSON.parse(getProductqry);
                        for (var i = 0; i < getProductParse.length; i++) {
                            sCategoryID = getProductParse[i]["CategoryID"];
                        }
                        var dbUOM = tempOrderDetParse[i]["UOM"];
                        if (bBulkUomPrice == true) {
                            dbUOM = PromoItemBulkUOM;
                        }
                        if ((promProductParse[i]["ItemId"] == tempOrderDetParse[i]["ItemId"] || promProductParse[i]["ItemId"] == sCategoryID) && promProductParse[i]["UOM"] == dbUOM) {
                            var price = this.getPrice(tempOrderDetParse[i]["ItemId"], promProductParse[i]["UOM"], CheckDecimal(tempOrderDetParse[i]["Qty"]), 1, promProductParse[i]["UOM"], getCustFieldValue('PriceGroup'), false);
                            LVItem = null;
                            LVItem = {};
                            LVItem["PromoType"] = "DisPrice";
                            LVItem["Price"] = price;
                            LVItem["Amount"] = (LVItem["Price"] - promProductParse[i]["DisPrice"]) * tempOrderDetParse[i]["Qty"];
                            LVItem["Qty"] = tempOrderDetParse[i]["Qty"];
                            LVItem["DisPrice"] = promProductParse[i]["DisPrice"];
                            LVItem["Promotion"] = stPromo.PromoId;
                            LVItem["ItemId"] = tempOrderDetParse[i]["ItemId"];
                            LVItem["PromoCount"] = 1;
                            LVItem["Priority"] = iPriority;
                            if (bBulkUomPrice == true) {
                                LVItem["UOM"] = tempOrderDetParse[i]["UOM"];
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
                    tempOrderDetqry = app.ReadRecord("GET_TEMPORDERET", "");
                    var tempOrderDetParse = JSON.parse(tempOrderDetqry);
                    for (var i = 0; i < tempOrderDetParse.length; i++) {
                        var getProductParam = {};
                        getProductParam.ItemId = tempOrderDetParse[i]["ItemId"];
                        getProductqry = app.ReadRecord("GET_PRODUCT", JSON.stringify(getProductParam));
                        var getProductParse = JSON.parse(getProductqry);
                        for (var i = 0; i < getProductParse.length; i++) {
                            sCategoryID = getProductParse[i]["CategoryID"];
                        }
                        var dbUOM = tempOrderDetParse[i]["UOM"];
                        if (bBulkUomPrice == true) {
                            //dbUOM = Ti.App.PromoItemBulkUOM;
                            dbUOM = PromoItemBulkUOM;
                        }
                        if ((promProductParse[i]["ItemId"] == tempOrderDetParse[i]["ItemId"] || promProductParse[i]["ItemId"] == sCategoryID) && promProductParse[i]["UOM"] == dbUOM) {
                            var price = this.getPrice(tempOrderDetParse[i]["ItemId"], promProductParse[i]["UOM"], CheckDecimal(tempOrderDetParse[i]["Qty"]), 1, promProductParse[i]["UOM"], getCustFieldValue('PriceGroup'), false);
                            LVItem = null;
                            LVItem = {};
                            LVItem["PromoType"] = "Discount";
                            LVItem["Price"] = price;
                            LVItem["Amount"] = (LVItem["Price"] * tempOrderDetParse[i]["Qty"]) - tempOrderDetParse[i]["DisPrice"];
                            LVItem["Qty"] = tempOrderDetParse[i]["Qty"];
                            LVItem["DisPrice"] = tempOrderDetParse[i]["DisPrice"];
                            LVItem["Promotion"] = stPromo.PromoId;
                            LVItem["ItemId"] = tempOrderDetParse[i]["ItemId"];
                            LVItem["PromoCount"] = 1;
                            LVItem["Priority"] = iPriority;
                            if (bBulkUomPrice == true) {
                                LVItem["UOM"] = tempOrderDetParse[i]["UOM"];
                            } else {
                                LVItem["UOM"] = dbUOM;
                            }
                            LVItem["LineType"] = tempOrderDetParse[i]["LineType"];
                            LVItem["DisCalc"] = tempOrderDetParse[i]["DisCalc"];
                            LVItem["PromoId"] = stPromo.PromoId;
                            newOrdItems.push(LVItem);
                        }
                    }

                } else if (promProductParse[i]["DisCalc"] != '') {
                    var sCategoryID = '';
                    tempOrderDetqry = app.ReadRecord("GET_TEMPORDERET", "");
                    var tempOrderDetParse = JSON.parse(tempOrderDetqry);
                    for (var i = 0; i < tempOrderDetParse.length; i++) {
                        var getProductParam = {};
                        getProductParam.ItemId = tempOrderDetParse[i]["ItemId"];
                        getProductqry = app.ReadRecord("GET_PRODUCT", JSON.stringify(getProductParam));
                        var getProductParse = JSON.parse(getProductqry);
                        for (var i = 0; i < getProductParse.length; i++) {
                            sCategoryID = getProductParse[i]["CategoryID"];
                        }
                        var dbUOM = getProductParse[i]["UOM"];
                        if (bBulkUomPrice == true) {
                            dbUOM = Ti.App.PromoItemBulkUOM;
                        }
                        if ((promProductParse[i]["ItemId"] == getProductParse[i]["ItemId"] || promProductParse[i]["ItemId"] == sCategoryID) && promProductParse[i]["UOM"] == dbUOM) {
                            var price = this.getPrice(getProductParse[i]["ItemId"], promProductParse[i]["UOM"], CheckDecimal(getProductParse[i]["Qty"]), 1, promProductParse[i]["UOM"], getCustFieldValue('PriceGroup'), false);
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
            //continue NextRecord;
        }

    }
    var sysCheckPromoAf = getSystemValue('CheckPromoAfterSave');
    var CheckPromoAfterSave = CheckBooleanField(sysCheckPromoAf);
    if (newOrdItems.length == 0 || (newOrdItems.length == 0 && dqty == 0)) {
        newOrdItems = [];
        if (ipdGroup.MinQty != null && ipdGroup.MinQty != undefined) {
            if (ipdGroup.MinQty > dqty || ipdGroup.MaxQty < dqty) {
                var sPromoCondUOM = '';
                var getpromoCondParam = {};
                getpromoCondParam.PromoId = ipdGroup.PromoId;
                getpromoCondqry = app.ReadRecord("GET_PROMOTIONCOND", JSON.stringify(getpromoCondParam));
                var getpromoCondParse = JSON.parse(getpromoCondqry);
                for (var i = 0; i < getpromoCondParse.length; i++) {
                    sPromoCondUOM = getpromoCondParse[i]["UOM"];
                }
                var promoOfferParam = {};
                promoOfferParam.ItemId = sitemid;
                promoOfferParam.PromoId = ipdGroup.PromoId;
                promoOfferqry = app.ReadRecord("GET_PROMOFFERPRO", JSON.stringify(promoOfferParam));
                var promoOfferParse = JSON.parse(promoOfferqry);
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
    } else {
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
            var getpromoCondParam = {};
            getpromoCondParam.PromoId = sPromoId;
            getpromoCondqry = app.ReadRecord("GET_PROMOTIONCOND", JSON.stringify(getpromoCondParam));
            var getpromoCondParse = JSON.parse(getpromoCondqry);
            for (var i = 0; i < getpromoCondParse.length; i++) {
                sPromoCondUOM = getpromoCondParse[i]["UOM"];
            }

            var promoOfferParam = {};
            promoOfferParam.ItemId = sitemid;
            promoOfferParam.PromoId = sPromoId;
            promoOfferqry = app.ReadRecord("GET_PROMOFFERPRO", JSON.stringify(promoOfferParam));
            var promoOfferParse = JSON.parse(promoOfferqry);
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
    return sPromoMsgText;
}

//function getSystemValue(systemCode) {
//    res = false;
//    var systemParam = {};
//    systemParam.systemCode = systemCode;
//    //systemParam.systemCode = "BulkUomPrice";
//    //var res = app.ReadRecord("GET_SYSTEM_VALUE", systemCode);
//    var resRet = app.ReadRecord("GET_SYSTEM_VALUE", JSON.stringify(systemParam));

//    var sysCustomerP = JSON.parse(resRet);
//    for (var i = 0; i < sysCustomerP.length; i++) {
//        res = sysCustomerP[i]["SystemValue"];
//    }
//    return res;
//}

function getAgentId() {
    var resRet = app.ReadRecord("GET_SYSTEMS_VALUE", "");
    var suomParse1 = JSON.parse(resRet);

    for (var i = 0; i < suomParse1.length; i++) {
        res = suomParse1[i]["AgentId"];
    }

    return res;
}

function setCustomerFields(custId) {
    var arr = [];
    var arrObj = {};
    var custParam = {};
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

function CheckData1(qry) {
    bFlag = false;
    var obj = app.ExecuteSQL(qry)
    if (obj > 0)
        bFlag = true;

    return bFlag
}

function getPrice1(sItemId, sUOM, Qty, baseQty, baseUom, sPriceGroup, bBaseUomPrice) {
    objPrice = {};
    objPrice = getPriceObj(sItemId, sUOM, Qty, baseQty, baseUom, sPriceGroup, bBaseUomPrice);

    objPrice.dPrice = (objPrice.dPrice == null || objPrice.dPrice == undefined || objPrice.dPrice == '') ? 0 : objPrice.dPrice;
    return objPrice.dPrice;
}

function getPriceObj(sItemId, sUOM, Qty, baseQty, baseUom, sPriceGroup, bBaseUomPrice) {
    var sysBulkUomPrice = getSystemValue('BulkUomPrice');
    var bBulkUomPrice = CheckBooleanField(sysBulkUomPrice);
    if (bBulkUomPrice == true) {
        var productParam = {};
        productParam.itemNo = sItemId;
        var suomRes = app.ReadRecord("GET_PRODUCTS_VALUE", JSON.stringify(productParam));
        var suomParse = JSON.parse(suomRes);
        for (var i = 0; i < suomParse.length; i++) {
            suom = suomParse[i]["BulkUOM"];
        }
    }
    fromDate = Ti.App.dtDeliveryDate;
    dtDocDate = Ti.App.dtDeliveryDate;
    toDate = dtDocDate;
    dPriceObj = {};
    dPriceObj.dPrice = 0;
    dPriceObj.dDisPrice = 0;

    Qty = (Qty == '' || Qty == null || Qty == undefined) ? 0 : Qty;
    dpr = 0.0; baseqty = 1.0;
    priceGroup = sPriceGroup;
    fromDate = dtDocDate; toDate = dtDocDate; custID = Ti.App.CustNo;

    var sysBaseUomPrice = getSystemValue('BaseUomPrice');
    var bBaseUomPrice = CheckBooleanField(sysBaseUomPrice);
    if (bBaseUomPrice == true) {
        sUOM = GetBaseUOM(sItemId);
        Qty = Qty * baseQty;
    }
    if (bBulkUomPrice == true) {
        var baseQty1 = DBCommon.prototype.getBulkBaseQty(sItemId);
        Qty = Qty / baseQty1;
    }
    if (Ti.App.sSupplierCode == 'SUPERMARKET-111') {
        _tmpUOM = sUOM;
        Qty = Qty * baseQty;
        var getPriceParam = {};
        getPriceParam.ItemId = sItemId;
        getPriceParam.uom = sUOM;
        getPriceParam.priceGroup = priceGroup;
        getPriceParam.Qty = Qty;
        getPriceParam.fromDate = fromDate;
        getPriceParam.toDate = toDate;
        getPriceqry = app.ReadRecord("GET_PRICE_FUN", JSON.stringify(getPriceParam));
        var getPriceParse = JSON.parse(getPriceqry);
        for (var i = 0; i < getPriceParse.length; i++) {
            dpr = getPriceParse[i]["RSP"];
            dPriceObj.dPrice = getPriceParse[i]["RSP"];
            dPriceObj.dDisPrice = getPriceParse[i]["DisPrice"];
        }

        if (bBaseUomPrice == true) {
            dpr = dpr * baseQty;
            dPriceObj.dPrice = dpr;
        }

        return dPriceObj;
    }
    if (dpr == 0.0) {
        if (IsFieldExist("Customers", "MaxPriceGroup")) {
            var getPriceParam = {};
            getPriceParam.ItemId = sItemId;
            getPriceParam.uom = sUOM;
            getPriceParam.priceGroup = priceGroup;
            getPriceParam.custID = custID;
            getPriceParam.fromDate = fromDate;
            getPriceParam.toDate = toDate;
            getPriceqry = app.ReadRecord("GET_PRICE_FUNIN", JSON.stringify(getPriceParam));
            var getPriceParse = JSON.parse(getPriceqry);
            for (var i = 0; i < getPriceParse.length; i++) {
                dpr = getPriceParse[i]["UnitPrice"];
                dPriceObj.dPrice = getPriceParse[i]["UnitPrice"];
                dPriceObj.dDisPrice = getPriceParse[i]["DisPrice"];
                dPriceObj.dDisCalc = getPriceParse[i]["DisCalc"];

            }
        }
    }
    if (dpr == 0.0) {
        var getPriceParam = {};
        getPriceParam.ItemId = sItemId;
        getPriceParam.uom = sUOM;
        getPriceParam.Qty = Qty;
        getPriceParam.custID = custID;
        getPriceParam.fromDate = fromDate;
        getPriceParam.toDate = toDate;
        getPriceqry = app.ReadRecord("GET_PRICECUST", JSON.stringify(getPriceParam));
        var getPriceParse = JSON.parse(getPriceqry);
        for (var i = 0; i < getPriceParse.length; i++) {
            dpr = getPriceParse[i]["UnitPrice"];
            dPriceObj.dPrice = getPriceParse[i]["UnitPrice"];
            dPriceObj.dDisPrice = getPriceParse[i]["DisPrice"];
            dPriceObj.dDisCalc = getPriceParse[i]["DisCalc"];

        }
    }
    priceGroup = (priceGroup != null && priceGroup != undefined) ? priceGroup : "";
    if (dpr == 0.0 && priceGroup != "") {
        var getPriceParam = {};
        getPriceParam.ItemId = sItemId;
        getPriceParam.uom = sUOM;
        getPriceParam.priceGroup = priceGroup;
        getPriceParam.Qty = Qty;
        getPriceParam.fromDate = fromDate;
        getPriceParam.toDate = toDate;
        getPriceqry = app.ReadRecord("GET_PRICE_FUN", JSON.stringify(getPriceParam));
        var getPriceParse = JSON.parse(getPriceqry);
        for (var i = 0; i < getPriceParse.length; i++) {
            dpr = getPriceParse[i]["UnitPrice"];
            dPriceObj.dPrice = getPriceParse[i]["UnitPrice"];
            dPriceObj.dDisPrice = getPriceParse[i]["DisPrice"];
            dPriceObj.dDisCalc = getPriceParse[i]["DisCalc"];
        }
    }
    //_tmpPriceGroup = Ti.App.ARRAYOPERATION.getCustFieldValue('PriceGroup2');
    _tmpPriceGroup = custDet[0]["PriceGroup2"];
    _tmpPriceGroup = (_tmpPriceGroup != null && _tmpPriceGroup != undefined) ? _tmpPriceGroup : "";
    if (dpr == 0.0 && _tmpPriceGroup != "") {
        var getPriceParam = {};
        getPriceParam.ItemId = sItemId;
        getPriceParam.uom = sUOM;
        getPriceParam.priceGroup = priceGroup;
        getPriceParam.Qty = Qty;
        getPriceParam.fromDate = fromDate;
        getPriceParam.toDate = toDate;
        getPriceqry = app.ReadRecord("GET_PRICE_FUN", JSON.stringify(getPriceParam));
        var getPriceParse = JSON.parse(getPriceqry);
        for (var i = 0; i < getPriceParse.length; i++) {
            dpr = getPriceParse[i]["UnitPrice"];
            dPriceObj.dPrice = getPriceParse[i]["UnitPrice"];
            dPriceObj.dDisPrice = getPriceParse[i]["DisPrice"];
            dPriceObj.dDisCalc = getPriceParse[i]["DisCalc"];
        }
    }
    if (dpr == 0.0) {
        var getPriceParam = {};
        getPriceParam.ItemId = sItemId;
        getPriceParam.uom = sUOM;
        getPriceParam.priceGroup = priceGroup;
        getPriceParam.Qty = Qty;
        getPriceParam.fromDate = fromDate;
        getPriceParam.toDate = toDate;
        getPriceqry = app.ReadRecord("GET_PRICE_FUN", JSON.stringify(getPriceParam));
        var getPriceParse = JSON.parse(getPriceqry);
        for (var i = 0; i < getPriceParse.length; i++) {
            dpr = getPriceParse[i]["UnitPrice"];
            dPriceObj.dPrice = getPriceParse[i]["UnitPrice"];
            dPriceObj.dDisPrice = getPriceParse[i]["DisPrice"];
            dPriceObj.dDisCalc = getPriceParse[i]["DisCalc"];
        }
    }
    if (dpr > 0) {
        if (dPriceObj.dDisCalc != null && dPriceObj.dDisCalc != undefined && dPriceObj.dDisCalc != '') {
            disArr = [];
            disArr = dPriceObj.dDisCalc.split('+');
            for (var iCnt = 0; iCnt < disArr.length; iCnt++) {
                if (disArr[iCnt].indexOf('%') > -1) {
                    if (Ti.App.COMMON.isNumber(parseFloat(disArr[iCnt]))) {
                        dpr = dpr - (dpr * (parseFloat(disArr[iCnt]) / 100));
                    }
                } else {
                    //if(disArr[iCnt] != null && disArr[iCnt] != undefined && disArr[iCnt] != ''){
                    //Ti.App.COMMON.isNumber
                    if (Number.isNaN(parseFloat(disArr[iCnt]))) {

                    } else {
                        dpr = dpr - parseFloat(disArr[iCnt]);
                    }
                }
            }
        }
        dPriceObj.dPrice = dpr;
    }
    if (dpr == 0.0) {
        //if (Ti.App.UOMType == 2)
        if (sysUOMType == 2) {
            var getPriceParam = {};
            getPriceParam.ItemId = sItemId;
            getPriceqry = app.ReadRecord("GET_PRICEPRODUCT", JSON.stringify(getPriceParam));


        } else {
            var getPriceParam = {};
            getPriceParam.ItemId = sItemId;
            getPriceParam.uom = sUOM;
            getPriceqry = app.ReadRecord("GET_MPRODUCT", JSON.stringify(getPriceParam));

        }
        var getPriceParse = JSON.parse(getPriceqry);
        for (var i = 0; i < getPriceParse.length; i++) {
            dpr = getPriceParse[i]["price"];
            dPriceObj.dPrice = getPriceParse[i]["price"];
            dPriceObj.dDisPrice = 0;
        }
    }
    if (bBaseUomPrice == true) {
        dpr = dpr * baseQty;
        dPriceObj.dPrice = dpr;
    }
    return dPriceObj;
}

function GetBaseUOM(sItemNo) {
    BaseUOM = "";
    var getPriceParam = {};
    getPriceParam.ItemId = sItemNo;
    getPriceqry = app.ReadRecord("GET_BASEUOM", JSON.stringify(getPriceParam));
    var getPriceParse = JSON.parse(getPriceqry);
    for (var i = 0; i < getPriceParse.length; i++) {
        BaseUOM = getPriceParse[i]["Uom"];
    }
    return BaseUOM;
}

function getBulkBaseQty(sItemId) {
    sBulkBaseQty = 1;
    //if (Ti.App.UOMType == 2)
    if (sysUOMType == 2) {
        var getPriceParam = {};
        getPriceParam.ItemId = sItemId;
        getPriceqry = app.ReadRecord("GET_PRICEPRODUCT", JSON.stringify(getPriceParam));

    } else {
        var getPriceParam = {};
        getPriceParam.ItemId = sItemId;
        getPriceqry = app.ReadRecord("GET_MPRODUCT", JSON.stringify(getPriceParam));
    }
    var getPriceParse = JSON.parse(getPriceqry);
    for (var i = 0; i < getPriceParse.length; i++) {
        sBulkBaseQty = getPriceParse[i]["BaseQty"];
    }
    return sBulkBaseQty;
}

function IsFieldExist(sTableName, sFieldName) {
    bIsFieldExist = false;
    var getPriceParam = {};
    getPriceParam.sTableName = sTableName;
    getPriceqry = app.ReadRecord("GET_MPRODUCT", JSON.stringify(getPriceParam));
    var getPriceParse = JSON.parse(getPriceqry);
    for (var i = 0; i < getPriceParse.length; i++) {
        if (getPriceParse.field(1) == sFieldName || getPriceParse.field(1).toUpperCase() == sFieldName.toUpperCase()) {
            bIsFieldExist = true;
            break;
        }
    }
    return bIsFieldExist;
}

function updatePromotion(promoId) {
    var query = "UPDATE Promotion SET PromoID = '" + promoId + "' WHERE PromoID = '" + promoId + "'";
    var obj = app.ExecuteSQL(query);
    return obj;
}



//public String ReadRecord(String queryname, String jsParams) {
////  HashMap<String, String> rtn = new HashMap<>();
//// JSONObject json = new JSONObject();
//        String rtn = "";
//JSONArray jsonArray = new JSONArray();
//JSONObject json = null;
//try {
//    if (jsParams != null) {
//        if(jsParams.isEmpty()){

//        }else {
//            System.out.println(jsParams);
//            //jsParams = "{key:" + jsParams + "}";
//            System.out.println(jsParams);
//            json = new JSONObject(jsParams);
//            //json.put("ParamJS",jsParams);

//            Iterator<String> iterator = json.keys();
//            while ((iterator.hasNext())) {
//                String key = iterator.next();
//                Log.v("key", key);
//                Log.v("value", json.getString(key));

//                selectedListValues.put(key.toUpperCase(), json.getString(key));

//            }
//        }
//        BE_QueryConfig queryConfig = da_queryConfig.getQueryConfig(queryname);
//        String query = ut_common.getQuery(queryConfig, null, formValues, selectedListValues, paramFormValues, paramSelectedListValues, qtyRoundingDigits, priceRoundingDigits, amountRoundingDigits, fixedLot, system, null, null);
//        // da_dynamics.executeQuery(query);
//        HashMap<String, ArrayList<String>> hashMap = new HashMap<>();
//        hashMap = da_dynamics.getDataSyncValues(query);


//        if (hashMap.size() > 0) {

//            try {

//                System.out.println("hashMap:"+hashMap.size());
//                System.out.println("hashMap:"+hashMap.entrySet());
//                for (int s = 0; s < 1; s++) {
//                    JSONObject jsonObject = new JSONObject();
//                    for (Map.Entry<String, ArrayList<String>> entry : hashMap.entrySet()) {
//                        System.out.println("hashMap:"+entry.getKey());
//                        System.out.println("hashMap:"+entry.getValue().get(s).toString());
//                        jsonObject.put(entry.getKey(), entry.getValue().get(s).toString());
//                }
//            jsonArray.put(jsonObject);
//        }
//    } catch (Exception e) {
//                e.printStackTrace();
//}
//}
//System.out.println(query);
//} else {
//    System.out.println("No value found for : " + jsParams);
//}
//} catch (JSONException e) {
//            e.printStackTrace();
//}

////        try {
////            open();
////            Cursor cursor = db.rawQuery(queryname, null);
////            //   JSONObject   json = new JSONObject(query);
////            if (cursor.getCount() > 0) {
////                if (cursor.moveToNext()) {
////                    for (int i = 0; i < cursor.getColumnCount(); i++) {
////                        rtn = cursor.getString(i).toString();
////
////                        // rtn.put(cursor.getColumnName(i).toUpperCase(), cursor.getString(i).toString());
////                        json.put(cursor.getColumnName(i).toUpperCase(), cursor.getString(i).toString());
////                    }
////                }
////            }
////
////            cursor.close();
////
////        } catch (Exception e) {
////            Log.e("ERR>", e.getMessage());
////            Log.e("Query>", query);
////            e.printStackTrace();
////
////        } finally {
////            close();
////        }

//return jsonArray.toString();
//}


//function ReadRecord(queryname, jsParams) {
//        var rtn = "";
//var jsonArray = new JSONArray();
//JSONObject json = null;
//try {
//    if (jsParams != null) {
//        if(jsParams.isEmpty()){

//        }else {
//           // System.out.println(jsParams);
//            //jsParams = "{key:" + jsParams + "}";
//           // System.out.println(jsParams);
//            json = new JSONObject(jsParams);
//            //json.put("ParamJS",jsParams);

//            Iterator<String> iterator = json.keys();
//            while ((iterator.hasNext())) {
//                var key = iterator.next();
//               // Log.v("key", key);
//                //Log.v("value", json.getString(key));

//                selectedListValues.put(key.toUpperCase(), json.getString(key));

//            }
//        }
//        BE_QueryConfig queryConfig = da_queryConfig.getQueryConfig(queryname);
//        String query = ut_common.getQuery(queryConfig, null, formValues, selectedListValues, paramFormValues, paramSelectedListValues, qtyRoundingDigits, priceRoundingDigits, amountRoundingDigits, fixedLot, system, null, null);
//        // da_dynamics.executeQuery(query);
//        HashMap<String, ArrayList<String>> hashMap = new HashMap<>();
//        hashMap = da_dynamics.getDataSyncValues(query);


//        if (hashMap.size() > 0) {

//            try {

//                //System.out.println("hashMap:"+hashMap.size());
//               // System.out.println("hashMap:"+hashMap.entrySet());
//                for (int s = 0; s < 1; s++) {
//                    JSONObject jsonObject = new JSONObject();
//                    for (Map.Entry<String, ArrayList<String>> entry : hashMap.entrySet()) {
//                        //System.out.println("hashMap:"+entry.getKey());
//                      //  System.out.println("hashMap:"+entry.getValue().get(s).toString());
//                        jsonObject.put(entry.getKey(), entry.getValue().get(s).toString());
//                }
//            jsonArray.put(jsonObject);
//        }
//    } catch (Exception e) {
//                e.printStackTrace();
//}
//}
////System.out.println(query);
//} else {
//    //System.out.println("No value found for : " + jsParams);
//}
//} catch (JSONException e) {
//            e.printStackTrace();
//}

//return jsonArray.toString();
//}