

//////
function GetMultiSeriesLineChart(qry) {

    var key = CryptoJS.enc.Utf8.parse('simplr8080808080');
    var iv = CryptoJS.enc.Utf8.parse('simplr8080808080');
    qry = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(qry), key, { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    var params = "{'query':'" + qry + "'}";
    $.ajax({
        type: "POST",
        url: url_GetMultiSeriesLineChart,
        data: params,
        contentType: "application/json;charset=utf-8",
        // dataType: "json",
        async: false,
        success: function (results) {
            executeQry = $.parseJSON(results);
            return results;
        },
        error: function (results, q, a) {
            alert(results);
        }
    });

}

function executeFieldList(qry) {
   

    var key = CryptoJS.enc.Utf8.parse('simplr8080808080');
    var iv = CryptoJS.enc.Utf8.parse('simplr8080808080');
    qry = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(qry), key, { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    var params = "{'query':'" + qry + "'}";
    $.ajax({
        type: "POST",
        url: url_getFieldList,
        data: params,
        contentType: "application/json;charset=utf-8",
        // dataType: "json",
        async: false,
        success: function (results) {
            executeQry = $.parseJSON(results);
            return results;
        },
        error: function (results, q, a) {
            alert(results);
        }
    });

}
function executeNameValueList(qry) {

    var key = CryptoJS.enc.Utf8.parse('simplr8080808080');
    var iv = CryptoJS.enc.Utf8.parse('simplr8080808080');
    qry = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(qry), key, { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    var params = "{'query':'" + qry + "'}";
    $.ajax({
        type: "POST",
        url: url_GetNameValueList,
        data: params,
        contentType: "application/json;charset=utf-8",
        // dataType: "json",
        async: false,
        success: function (results) {
            executeQry = $.parseJSON(results);
            return results;
        },
        error: function (results, q, a) {
            alert(results);
        }
    });

}

function getQueryConfigByScreenName(queryName) {
    var queryText = '';
    $.ajax({
        type: 'POST',
        url: url_GetQueryConfigByScreenName,
        // url: '/Common/GetQueryConfigByScreenName/',
        data: { ScreenName: queryName },
        dataType: 'text',
        async: false,
        success: function (data) {
            if (data != null) {
                queryText = data;
            }
        }
    });
    return queryText;
}

function strReplace(str) {
    str = str.replace(/@@/g, '"').replace(/'{/g, '{').replace(/}'/g, '}');
    return str;
}


function getChartData(fieldCount, query) {
    //db = new dbConnection().createDataBaseConnection();
    //dbDataRows = Ti.App.dbConn.execute(query);

    //dbDataRows = execute(query);
    //dbDataRows = executeQry;
    executeFieldList(query);
    dbDataRows = executeQry;
    str = '';


    //fieldCount = ['string','number']


    //  if (dbDataRows.length > 0)
    // while (dbDataRows.isValidRow()) {

    for (var j = 0; j < dbDataRows.length; j++) {

        //var len = (Ti.Platform.osname === 'android') ? dbDataRows.fieldCount : dbDataRows.fieldCount();
        //alert(len);

        if (str == '') {
            str = '{';
        } else {
            str += '##{';
        }
        var str1 = '';



        for (var i = 0; i < fieldCount.length; i++) {

            //Ti.API.info
            if (fieldCount[i] == 'string') {
                str1 = '@@';
            } else {
                str1 = '';
            }
            if (i == 0) {
                str += dbDataRows[j].FieldName + ':' + str1 + dbDataRows[j].Field + str1;
                j++;
                //  str += dbDataRows.fieldName(i) + ':' + str1 + dbDataRows.field(i) + str1;
            } else {
                str += ',' + dbDataRows[j].FieldName + ':' + str1 + dbDataRows[j].Field + str1;
                // str += ',' + dbDataRows.fieldName(i) + ':' + str1 + dbDataRows.field(i) + str1;
            }
            /*if(i == 0){
                str += dbDataRows.fieldName(i)+':@@'+dbDataRows.field(i)+'@@';
            }else{
                str += ',' +dbDataRows.fieldName(i)+':@@'+dbDataRows.field(i)+'@@';
            }*/
        }
        str += '}';
        //  dbDataRows.next();
    }
    // dbDataRows.close();
    //db.close();
    return str;
}

function execute(qry) {
    var key = CryptoJS.enc.Utf8.parse('simplr8080808080');
    var iv = CryptoJS.enc.Utf8.parse('simplr8080808080');
    qry = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(qry), key, { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    var params = "{'query':'" + qry + "'}";
    //if (_isFormList == true)
    //    LoadingImageOpen();
    $.ajax({
        type: "POST",
        url: url_GetActionConfigData,
        data: params,
        contentType: "application/json;charset=utf-8",
        // dataType: "json",
        async: false,
        success: function (results) {
            executeStringQry = results;
            executeQry = $.parseJSON(results);
            return results;
        },
        error: function (results, q, a) {
            LoadingImageClose();
            alert(results);
        }

    });

}


function getChartDataList(query, data1) {
    //db = new dbConnection().createDataBaseConnection();
    dbDataRows = execute(query);
    str = '';
    var datevalue = '';
    var i = 0;
    GetMultiSeriesLineChart(query);
    dbDataRows = executeQry;
    str = '';
    if (dbDataRows != null && dbDataRows != undefined)
    {
        for (var j = 0; j < dbDataRows.length; j++) {
            //  while (dbDataRows.isValidRow()) {
            if (dbDataRows[j].date != datevalue) {
                i = 0;
                datevalue = dbDataRows[j].date;
                if (str == '') {
                    str = '{';
                } else {
                    str += '}';
                    str += '##{';
                }
            }
            if (i == 0) {
                str += 'date:' + '@@' + dbDataRows[j].date + '@@';
                i = 1;
            }
            str += ',@@' + dbDataRows[j].Label + '@@:' + dbDataRows[j].Value;
            // dbDataRows.next();
        }

        if (str != '') {
            str += '}';
        }
        // dbDataRows.close();
        //db.close();
    }
   
    return str;
}

function setQueryConfig(scrName) {
    var dbDataRows = '';
    var qry = "select ScreenName, QueryText, ISNULL(GroupText,'') as GroupText, ISNULL(OrderText, '' ) as OrderText from QueryConfig where screenname='" + scrName + "'";
    execute(qry);
    dbDataRows = executeQry;
    var chartGetString = {};
    if (dbDataRows != null && dbDataRows.length > 0) {
        for (var i = 0; i < dbDataRows.length; i++) {
            //setgetString
            chartGetString["QueryConfig_" + scrName + ""] = dbDataRows[i].QueryText;
            chartGetString["QueryConfig_" + scrName + "_GroupText"] = dbDataRows[i].GroupText;
            chartGetString["QueryConfig_" + scrName + "_OrderText"] = dbDataRows[i].OrderText;
            //  dbDataRows.next();
        }
    }
    return chartGetString;
}
function setQueryConfig1(scrName) {
    var dbDataRows = '';
    var qry = "select ScreenName, QueryText, ISNULL(GroupText,'') as GroupText, ISNULL(OrderText, '' ) as OrderText from QueryConfig where screenname='" + scrName + "'";
    execute(qry);
    dbDataRows = executeQry;
    var chartGetString = {};
    if (dbDataRows != null && dbDataRows.length > 0) {
        for (var i = 0; i < dbDataRows.length; i++) {
            //setgetString
            chartGetString["QueryConfig_" + scrName + ""] = dbDataRows[i].QueryText;
            chartGetString["QueryConfig_" + scrName + "_GroupText"] = dbDataRows[i].GroupText;
            chartGetString["QueryConfig_" + scrName + "_OrderText"] = dbDataRows[i].OrderText;
            //  dbDataRows.next();
        }
    }
    return chartGetString;
}









///////////////////////////////
//var SqlFunction = require('/utils/SQL');
//var SQL = new SqlFunction();

////var iRoundingDigits = SI.getSystemValue('QtyRoundingDigits');

//var dbConnection = require('/utils/DataBaseConnection');

//var dbDataRows = '', db = '', str = '', sBaseUOM = "", sGQtyDesc = "";
//var sCondArr = [], obj = {};
//function CommonModel(mController) {
//    //Constructor
//    //modelObj.mController = mController;
//}

//CommonModel.prototype = {

//    CheckData: function (qry) {

//        Ti.API.info('CheckData : ' + qry);

//        //db = new dbConnection().createDataBaseConnection();
//        dbDataRows = Ti.App.dbConn.execute(qry);
//        var bFlag = false;
//        //if(dbDataRows.isValidRow()) {
//        bFlag = dbDataRows.isValidRow();//true;
//        //}
//        dbDataRows.close();
//        //db.close();

//        Ti.API.info('CheckData : bFlag ' + bFlag);

//        return bFlag;
//        //return (this.ExecuteSQL(qry) > 0) ? true : false;
//    },
//    getUOMDescription: function (sItemId, dGQty, iRoundingDigits) {
//        //db = new dbConnection().createDataBaseConnection();
//        Ti.API.info("LINE 37 iRoundingDigits " + iRoundingDigits);
//        sBaseUOM = "";
//        sGQtyDesc = "";
//        //dbDataRows = Ti.App.dbConn.execute("Select * from UOM where ItemId=" + SQL.safeSQL(sItemId) + " Order by BaseQty Desc");
//        dbDataRows = Ti.App.dbConn.execute("Select * from UOM where ItemId=" + SQL.safeSQL(sItemId) + " Order by BaseQty Desc,Uom desc");

//        while (dbDataRows.isValidRow()) {
//            Ti.API.info("LINE 43 dbDataRows.fieldByName(BaseQty)" + dbDataRows.fieldByName("BaseQty"));
//            if (dbDataRows.fieldByName("BaseQty") == '1' || dbDataRows.fieldByName("BaseQty") == '1.0') {
//                sBaseUOM = dbDataRows.fieldByName("UOM");
//                Ti.API.info("LINE 46 " + sItemId + '' + sBaseUOM + ' ' + dGQty);
//            }
//            dbDataRows.next();
//        }
//        dbDataRows.close();
//        if (dGQty == 0) {
//            //db.close();
//            if (iRoundingDigits == "/" || Ti.App.UOMSeparator == true) {
//                return "0 / 0";
//            }
//            return "0 " + sBaseUOM;
//        }
//        //dbDataRows = Ti.App.dbConn.execute("Select * from UOM where ItemId=" + SQL.safeSQL(sItemId) + " Order by BaseQty Desc");
//        dbDataRows = Ti.App.dbConn.execute("Select * from UOM where ItemId=" + SQL.safeSQL(sItemId) + " Order by BaseQty Desc,Uom desc");
//        while (dbDataRows.isValidRow()) {
//            Ti.API.info("BaseQTY1 " + dbDataRows.fieldByName("BaseQty") + ' ' + dGQty + ' ' + sItemId);
//            if (dbDataRows.fieldByName("BaseQty") <= dGQty) {
//                //sGQtyDesc = (sGQtyDesc != "") ? sGQtyDesc + " " : sGQtyDesc;
//                if (iRoundingDigits == "/" || Ti.App.UOMSeparator == true) {
//                    sGQtyDesc = (sGQtyDesc != "") ? sGQtyDesc + " / " : sGQtyDesc;
//                    Ti.API.info("LINE 67 " + sGQtyDesc + ' ' + sItemId + ' ' + dGQty);
//                    sGQtyDesc = sGQtyDesc + Math.floor(dGQty / parseFloat(dbDataRows.fieldByName("BaseQty")));
//                    Ti.API.info("LINE 69 " + sGQtyDesc + ' ' + sItemId + ' ' + dGQty);
//                } else {
//                    sGQtyDesc = (sGQtyDesc != "") ? sGQtyDesc + "\r\n" : sGQtyDesc;
//                    Ti.API.info("LINE 72 " + sGQtyDesc + ' ' + sItemId + ' ' + dGQty);
//                    sGQtyDesc = sGQtyDesc + Math.floor(dGQty / parseFloat(dbDataRows.fieldByName("BaseQty"))) + " " + dbDataRows.fieldByName("UOM");
//                    Ti.API.info("LINE 74 " + sGQtyDesc + ' ' + sItemId + ' ' + dGQty);
//                }
//                dGQty = dGQty % parseFloat(dbDataRows.fieldByName("BaseQty"));
//            } else {
//                if (iRoundingDigits == "/" || Ti.App.UOMSeparator == true) {
//                    sGQtyDesc = (sGQtyDesc != "") ? sGQtyDesc + " / " : sGQtyDesc;
//                    sGQtyDesc = sGQtyDesc + "0";
//                }
//            }
//            dbDataRows.next();
//        }
//        dbDataRows.close();
//        //db.close();
//        if (iRoundingDigits == "/" || Ti.App.UOMSeparator == true) {
//            return (sGQtyDesc == "") ? ("0 / 0") : sGQtyDesc;
//        } else {
//            return (sGQtyDesc == "") ? ("0 " + sBaseUOM) : sGQtyDesc;
//        }
//        /*
//        if(sGQtyDesc == ""){
//            return "0 " + sBaseUOM;
//        }else{
//            return sGQtyDesc;
//        }*/
//    },
//    getBulkUOMDescription: function (sItemId, dGQty, iRoundingDigits) {
//        Ti.API.info("LINE 37 iRoundingDigits " + iRoundingDigits);
//        sBaseUOM = "";
//        sGQtyDesc = "";
//        dbDataRows = Ti.App.dbConn.execute("Select * from UOM where ItemId=" + SQL.safeSQL(sItemId) + " Order by BaseQty Desc,Uom desc");

//        while (dbDataRows.isValidRow()) {
//            Ti.API.info("LINE 43 dbDataRows.fieldByName(BaseQty)" + dbDataRows.fieldByName("BaseQty"));
//            if (dbDataRows.fieldByName("BaseQty") == '1' || dbDataRows.fieldByName("BaseQty") == '1.0') {
//                sBaseUOM = dbDataRows.fieldByName("UOM");
//                Ti.API.info("LINE 46 " + sItemId + '' + sBaseUOM + ' ' + dGQty);
//            }
//            dbDataRows.next();
//        }
//        dbDataRows.close();

//        dbDataRows = Ti.App.dbConn.execute("Select * from UOM where ItemId=" + SQL.safeSQL(sItemId) + " Order by BaseQty Desc,Uom desc");
//        while (dbDataRows.isValidRow()) {
//            Ti.API.info("BaseQTY1 " + dbDataRows.fieldByName("BaseQty") + ' ' + dGQty + ' ' + sItemId);
//            if (dbDataRows.fieldByName("BaseQty") <= dGQty) {
//                sGQtyDesc = (sGQtyDesc != "") ? sGQtyDesc + "\r\n" : sGQtyDesc;
//                Ti.API.info("LINE 72 " + sGQtyDesc + ' ' + sItemId + ' ' + dGQty);
//                sGQtyDesc = sGQtyDesc + Math.floor(dGQty / parseFloat(dbDataRows.fieldByName("BaseQty"))) + " " + dbDataRows.fieldByName("UOM");
//                Ti.API.info("LINE 74 " + sGQtyDesc + ' ' + sItemId + ' ' + dGQty);
//                dGQty = 0;//dGQty % parseFloat(dbDataRows.fieldByName("BaseQty"));
//            }
//            dbDataRows.next();
//        }
//        dbDataRows.close();
//        return (sGQtyDesc == "") ? "" : sGQtyDesc;

//    },
//    getPackUOMDescription: function (sItemId, dGQty, iRoundingDigits) {
//        Ti.API.info("LINE 37 iRoundingDigits " + iRoundingDigits);
//        sBaseUOM = "";
//        sGQtyDesc = "";
//        dbDataRows = Ti.App.dbConn.execute("Select * from UOM where BaseQty = 1 and ItemId=" + SQL.safeSQL(sItemId) + " Order by BaseQty Desc,Uom desc");

//        while (dbDataRows.isValidRow()) {
//            Ti.API.info("LINE 43 dbDataRows.fieldByName(BaseQty)" + dbDataRows.fieldByName("BaseQty"));
//            if (dbDataRows.fieldByName("BaseQty") == '1' || dbDataRows.fieldByName("BaseQty") == '1.0') {
//                sBaseUOM = dbDataRows.fieldByName("UOM");
//                Ti.API.info("LINE 46 " + sItemId + '' + sBaseUOM + ' ' + dGQty);
//            }
//            dbDataRows.next();
//        }
//        dbDataRows.close();

//        dbDataRows = Ti.App.dbConn.execute("Select * from UOM where ItemId=" + SQL.safeSQL(sItemId) + " Order by BaseQty Desc,Uom desc");
//        while (dbDataRows.isValidRow()) {
//            Ti.API.info("BaseQTY1 " + dbDataRows.fieldByName("BaseQty") + ' ' + dGQty + ' ' + sItemId);
//            if (dbDataRows.fieldByName("BaseQty") <= dGQty) {
//                //sGQtyDesc = (sGQtyDesc != "") ? sGQtyDesc + "\r\n" : sGQtyDesc;
//                Ti.API.info("LINE 72 " + sGQtyDesc + ' ' + sItemId + ' ' + dGQty);
//                //sGQtyDesc = sGQtyDesc + Math.floor(dGQty / parseFloat(dbDataRows.fieldByName("BaseQty"))) + " " + dbDataRows.fieldByName("UOM");
//                Ti.API.info("LINE 74 " + sGQtyDesc + ' ' + sItemId + ' ' + dGQty);
//                dGQty = dGQty % parseFloat(dbDataRows.fieldByName("BaseQty"));
//            }

//            if (dbDataRows.fieldByName("BaseQty") == '1' || dbDataRows.fieldByName("BaseQty") == '1.0') {
//                sBaseUOM = dbDataRows.fieldByName("UOM");
//                sGQtyDesc = Math.floor(dGQty / parseFloat(dbDataRows.fieldByName("BaseQty"))) + " " + dbDataRows.fieldByName("UOM");
//            }
//            dbDataRows.next();
//        }
//        dbDataRows.close();
//        return (sGQtyDesc == "") ? "" : sGQtyDesc;

//    },
//    getBulkPackQty: function (dGQty, dBulkBaseQty, dPackBaseQty) {//sItemId, dGQty, iRoundingDigits){
//        try {
//            var obj = {};
//            obj.TotalQty = dGQty;
//            obj.BulkQty = Math.floor(dGQty / dBulkBaseQty);//0;
//            dGQty = dGQty % dBulkBaseQty;
//            obj.PackQty = Math.floor(dGQty / dPackBaseQty);//0;
//            /*
//	    	db = new dbConnection().createDataBaseConnection();
//			sBaseUOM = "", sGQtyDesc = "";
//			dbDataRows = db.execute("Select * from UOM where ItemId=" + SQL.safeSQL(sItemId) + " Order by BaseQty Desc");
//			while(dbDataRows.isValidRow()){
//	        	if(dbDataRows.fieldByName("BaseQty") < dGQty && dbDataRows.fieldByName("BaseQty") > 1){
//	    			obj.BulkQty = Math.floor(dGQty / parseFloat(dbDataRows.fieldByName("BaseQty")));
//	    			dGQty = dGQty % parseFloat(dbDataRows.fieldByName("BaseQty"));
//	    		}else if(dbDataRows.fieldByName("BaseQty") == '1' || dbDataRows.fieldByName("BaseQty") == 1){
//	    			obj.PackQty = dGQty;
//	        	}
//	        	dbDataRows.next();
//	        }
//	        dbDataRows.close();
//	        db.close();
//	        */
//            return obj;
//        } catch (e) {
//            return obj;
//        }
//    },
//    CheckColorConfig: function (sScreenName, sFieldName) {

//        sCondArr = [];
//        try {

//            //db = new dbConnection().createDataBaseConnection();

//            dbDataRows = Ti.App.dbConn.execute("Select * from ColorConfig where ScreenName=" + SQL.safeSQL(sScreenName) + " and FieldName like" + SQL.safeSQL(sFieldName));
//            obj = {};
//            while (dbDataRows.isValidRow()) {
//                obj = {};
//                obj.Condition = dbDataRows.fieldByName("Condition");
//                obj.ConditionField = dbDataRows.fieldByName("ConditionField");
//                obj.ConditionValue = dbDataRows.fieldByName("ConditionValue");
//                obj.CForeColor = dbDataRows.fieldByName("CForeColor");
//                obj.CBackColor = dbDataRows.fieldByName("CBackColor");
//                sCondArr.push(obj);
//                dbDataRows.next();
//            }
//            dbDataRows.close();
//            //db.close();
//        } catch (e) {
//            sCondArr = [];
//        }
//        return sCondArr;
//    },



//    getChartData: function (fieldCount, query) {
//        //db = new dbConnection().createDataBaseConnection();
//        dbDataRows = Ti.App.dbConn.execute(query);
//        str = '';


//        //fieldCount = ['string','number']



//        while (dbDataRows.isValidRow()) {

//            //var len = (Ti.Platform.osname === 'android') ? dbDataRows.fieldCount : dbDataRows.fieldCount();
//            //alert(len);

//            if (str == '') {
//                str = '{';
//            } else {
//                str += '##{';
//            }
//            var str1 = '';



//            for (var i = 0; i < fieldCount.length; i++) {

//                //Ti.API.info
//                if (fieldCount[i] == 'string') {
//                    str1 = '@@';
//                } else {
//                    str1 = '';
//                }
//                if (i == 0) {
//                    str += dbDataRows.fieldName(i) + ':' + str1 + dbDataRows.field(i) + str1;
//                } else {
//                    str += ',' + dbDataRows.fieldName(i) + ':' + str1 + dbDataRows.field(i) + str1;
//                }

//                /*if(i == 0){
//					str += dbDataRows.fieldName(i)+':@@'+dbDataRows.field(i)+'@@';
//				}else{
//					str += ',' +dbDataRows.fieldName(i)+':@@'+dbDataRows.field(i)+'@@'; 
//				}*/
//            }
//            str += '}';
//            dbDataRows.next();
//        }
//        dbDataRows.close();
//        //db.close();
//        return str;
//    },
//    getChartDataList: function (query) {
//        //db = new dbConnection().createDataBaseConnection();
//        dbDataRows = Ti.App.dbConn.execute(query);
//        str = '';
//        var datevalue = '';
//        var i = 0;
//        while (dbDataRows.isValidRow()) {
//            if (dbDataRows.fieldByName('date') != datevalue) {
//                i = 0;
//                datevalue = dbDataRows.fieldByName('date');
//                if (str == '') {
//                    str = '{';
//                } else {
//                    str += '}';
//                    str += '##{';
//                }
//            }
//            if (i == 0) {
//                str += 'date:' + '@@' + dbDataRows.fieldByName('date') + '@@';
//                i = 1;
//            }
//            str += ',@@' + dbDataRows.fieldByName('Label') + '@@:' + dbDataRows.fieldByName('Value');
//            dbDataRows.next();
//        }
//        if (str != '') {
//            str += '}';
//        }
//        dbDataRows.close();
//        //db.close();
//        return str;
//    },
//    /*getPrice : function(sItemId, sUOM, Qty, baseQty, baseUom) {
//		db = Titanium.Database.open('main');
//		var qry = "";
//		var dbDataRows;

//		var dpr = 0.0;
//		var baseqty = 1.0;

//		var priceGroup = _this.DETAILS.get('PRICE_GROUP');
//		var dt = _this.COMMON.dbDateFormatSQLite(new Date());
//		Qty=_this.COMMON.safeSQL(Qty);
//		var fromDate = dt;
//		var toDate = dt;
//		var custID = _this.DETAILS.get('CUSTOMER_NUMBER');
//		if(_this.DETAILS.get('BASEUOMPRICE')=='TRUE'){
//			sUOM = baseUom;		
//		}
//		qry = "Select * from ItemPr Where ItemId =" + _this.COMMON.safeSQL(sItemId) + " and Uom = "+  _this.COMMON.safeSQL(sUOM) +" and PriceGroup = "+_this.COMMON.safeSQL(custID)+" and SalesType = 'Customer' and MinQty <= "+ Qty + " and FromDate <= " + _this.COMMON.safeSQL(fromDate) + " and ToDate >= " + _this.COMMON.safeSQL(toDate) + " order by MinQty ,FromDate Asc";
//		Ti.API.info(qry);
//		dbDataRows = db.execute(qry);
//		while (dbDataRows.isValidRow()) {
//			dpr = dbDataRows.fieldByName('UnitPrice');
//			dbDataRows.next();
//		}
//		dbDataRows.close();
//		if (dpr == 0.0) {
//			qry = "Select * from ItemPr Where ItemId =" + _this.COMMON.safeSQL(sItemId) + " and Uom = "+  _this.COMMON.safeSQL(sUOM) +" and PriceGroup = "+_this.COMMON.safeSQL(priceGroup)+" and SalesType = 'Customer Price Group' and MinQty <= "+ Qty + " and FromDate <= " + _this.COMMON.safeSQL(fromDate) + " and ToDate >= " + _this.COMMON.safeSQL(toDate) + " order by MinQty ,FromDate Asc";
//			Ti.API.info(qry);
//			dbDataRows = db.execute(qry);
//			while (dbDataRows.isValidRow()) {
//				dpr = dbDataRows.fieldByName('UnitPrice');
//				dbDataRows.next();
//			}
//			dbDataRows.close();
//		}
//		if (dpr == 0.0) {
//			qry = "Select * from ItemPr Where ItemId =" + _this.COMMON.safeSQL(sItemId) + " and Uom = "+  _this.COMMON.safeSQL(sUOM) +" and SalesType = 'All Customers' and MinQty <= "+ Qty + " and FromDate <= " + _this.COMMON.safeSQL(fromDate) + " and ToDate >= " + _this.COMMON.safeSQL(toDate) + " order by MinQty ,FromDate Asc";
//			Ti.API.info(qry);
//			dbDataRows = db.execute(qry);
//			while (dbDataRows.isValidRow()) {
//				dpr = dbDataRows.fieldByName('UnitPrice');
//				dbDataRows.next();
//			}
//			dbDataRows.close();
//		}
//		//gaurav changes start
//		if (dpr == 0.0) {
//			qry = "SELECT * FROM Products where ItemId = '" + sItemId + "'";
//			Ti.API.info(qry);
//			dbDataRows = db.execute(qry);
//			Ti.API.info('arkar');
//			while (dbDataRows.isValidRow()) {
//				dpr = dbDataRows.fieldByName('price');
//				dbDataRows.next();
//			}
//			dbDataRows.close();
//			db.close();
//		}
//		//gaurav changes end
//		if(_this.DETAILS.get('BASEUOMPRICE')=='TRUE'){
//			dpr = dpr * baseQty;
//		}
//		dpr = Math.round(dpr * 100) / 100;
//		return _this.COMMON.roundNumber(dpr, -1);
//	}*/
//};
//module.exports = CommonModel;
