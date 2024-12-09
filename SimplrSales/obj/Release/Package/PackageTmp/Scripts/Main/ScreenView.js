var ConfigObj = {}, dPanelHeight = '94%';
var selectedRowIndex = -1;




function formatQueryString(qry, queryName) {

    var replaceQueryValue = '';
    var isreplace = 0;
    var str_replaceQueryValue = '';

    var temp_id = '';
    var temp_value = '';

    if (qry == null) {
        return;
    }

    startPos = qry.indexOf('{');
    endPos = 0; keyVal = '';
    while (startPos > -1) {
        endPos = qry.indexOf('}', startPos + 1);
        keyVal = qry.substr(startPos + 1, (endPos - startPos - 1));

        if ((keyVal.split('.').length == 4 && keyVal.split('.')[3] == "ALL") || keyVal == "AllOfList")
        {
            // IN CASE REPLACEVALUE GETS THE FOLLOWING CHAR  "{" OR "}" 
            str_replaceQueryValue = replaceQuery(keyVal, queryName).toString();
            if (str_replaceQueryValue.indexOf("{") > -1 && str_replaceQueryValue.indexOf("}") > -1) {
                replaceQueryValue = replaceAll(str_replaceQueryValue, "{", "^");
                replaceQueryValue = replaceAll(replaceQueryValue.toString(), "}", "$");
                qry = createQuery(qry, ('{' + keyVal + '}'), (replaceQueryValue));
                isreplace = 1;
            }
            else
            {
                qry = createQuery(qry, ('{' + keyVal + '}'), (replaceQuery(keyVal, queryName)));
            }
        }
        else if ((keyVal.split('.').length == 3 && keyVal.split('.')[2] == "LIKE") || keyVal.split('.').length == 4 && keyVal.split('.')[3] == "LIKE")
        {
            // IN CASE REPLACEVALUE GETS THE FOLLOWING CHAR  "{" OR "}"
            str_replaceQueryValue = (replaceQuery(keyVal.replace('.LIKE', ''), queryName));
            if (str_replaceQueryValue.indexOf("{") > -1 && str_replaceQueryValue.indexOf("}") > -1) {
                replaceQueryValue = replaceAll(str_replaceQueryValue, "{", "^");
                replaceQueryValue = replaceAll(replaceQueryValue.toString(), "}", "$");
                qry = createQuery(qry, ('{' + keyVal + '}'), (replaceQueryValue));
                isreplace = 1;
            }
            else {
                qry = createQuery(qry, ('{' + keyVal + '}'), (replaceQuery(keyVal.replace('.LIKE', ''), queryName)));
            }
        }
        else {
            // IN CASE REPLACEVALUE GETS THE FOLLOWING CHAR  "{" OR "}"
            if (keyVal.toLowerCase().indexOf('.image') > -1) {
                qry = createQuery(qry, ('{' + keyVal + '}'), safeSQL(replaceQuery(keyVal, queryName)));
            }
            else {
                // COMMENTED 15.12.2020 
                temp_id = keyVal;
                str_replaceQueryValue = safeSQL(replaceQuery(keyVal, queryName));
                // COMMENTED 15.12.2020 

                if (str_replaceQueryValue.toLowerCase().indexOf("--select--") > -1)
                    str_replaceQueryValue = str_replaceQueryValue.replace('--Select--', '');

                temp_value = str_replaceQueryValue;
                if (str_replaceQueryValue.indexOf("{") > -1 && str_replaceQueryValue.indexOf("}") > -1) {
                    replaceQueryValue = replaceAll(str_replaceQueryValue, "{", "^");
                    replaceQueryValue = replaceAll(replaceQueryValue.toString(), "}", "$");
                    qry = createQuery(qry, ('{' + keyVal + '}'), safeSQL(replaceQueryValue));
                    isreplace = 1;
                }
                else {
                    // COMMENTED 15.12.2020
                    //qry = createQuery(qry, ('{' + keyVal + '}'), safeSQL(replaceQuery(keyVal, queryName)));
                    // COMMENTED 21.12.2020 FOR '' PROBLEM IN A STRING
                    //qry = createQuery(qry, ('{' + temp_id + '}'), temp_value);
                    if (temp_value != "''") {
                        //qry = createQuery(qry, ('{' + temp_id + '}'), temp_value.replace(/''/g, " "));
                        qry = createQuery(qry, ('{' + temp_id + '}'), temp_value);
                        // 'Can't change' => should return 'Can''t change'    
                    }
                    else
                    {
                        qry = createQuery(qry, ('{' + temp_id + '}'), temp_value);
                    }
                    
                }
            }
          
        }

        startPos = qry.indexOf('{');
        //info('LOG FOr Debug ---> ' + startPos + ' : ' + endPos + ' : ' + qry);
        //Removed End Position, keyVal length is more than the value, so end position gives wrong information.
        //alert(startPos+' : '+endPos+ ' : '+qry);
        COMMONLog('LOG FOr Debug ---> ' + startPos + ' : ' + endPos + ' : ' + qry);
    }
    //info('formatQueryString : ' + qry);
    COMMONLog('formatQueryString : ' + qry);

    // HERE REVERT IT AS USUAL 
    if (isreplace == 1)
    {
        qry = replaceAll(qry.toString(), "^", "{");
        qry = replaceAll(qry.toString(), "$", "}");
    }
    
    ItemPromo_LogString("ScreenViewJS > " + queryName + " :\n " + qry);

    return qry;
}

function replaceAll(string, search, replace) {
    return string.split(search).join(replace);
}



function formatQueryString_OLD(qry, queryName) {

    if (qry == null) {
        return;
    }

    
    startPos = qry.indexOf('{');
    endPos = 0; keyVal = '';
    while (startPos > -1) {
        endPos = qry.indexOf('}', startPos + 1);
        keyVal = qry.substr(startPos + 1, (endPos - startPos - 1));

        if ((keyVal.split('.').length == 4 && keyVal.split('.')[3] == "ALL") || keyVal == "AllOfList")
        {
            qry = createQuery(qry, ('{' + keyVal + '}'), (replaceQuery(keyVal, queryName)));
        }
        else if ((keyVal.split('.').length == 3 && keyVal.split('.')[2] == "LIKE") || keyVal.split('.').length == 4 && keyVal.split('.')[3] == "LIKE") {
            qry = createQuery(qry, ('{' + keyVal + '}'), (replaceQuery(keyVal.replace('.LIKE', ''), queryName)));
        }
        else
        {
            qry = createQuery(qry, ('{' + keyVal + '}'), safeSQL(replaceQuery(keyVal, queryName)));
        }
        


        startPos = qry.indexOf('{');
        //info('LOG FOr Debug ---> ' + startPos + ' : ' + endPos + ' : ' + qry);
        //Removed End Position, keyVal length is more than the value, so end position gives wrong information.
        //alert(startPos+' : '+endPos+ ' : '+qry);
        COMMONLog('LOG FOr Debug ---> ' + startPos + ' : ' + endPos + ' : ' + qry);
    }
    //info('formatQueryString : ' + qry);
    COMMONLog('formatQueryString : ' + qry);
    return qry;
}

function replaceQuery(key, queryName) {

    /*
     * key -> system.QtyRoundingDigits
     * 
     * Ti.App.AgentId
     * Ti.App.CustNo
     *
     * 
     * GPS.longitude
     * GPS.latitude
     */

    if (key.toUpperCase() == 'QtyRoundingDigits'.toUpperCase() || key.toUpperCase() == 'PriceRoundingDigits'.toUpperCase() || key.toUpperCase() == 'AmountRoundingDigits'.toUpperCase()) {
        return Ti.App.ARRAYOPERATION.getSystemValue(key);
    }

    ConfigObj.skey = key.toUpperCase();
    if (ConfigObj.skey.indexOf('SYSTEM.') > -1) {
        ConfigObj.arrKeyVar = ConfigObj.skey.split('SYSTEM.');
        //Need to check the DATATYPE
        //   ConfigObj.SysValue = Ti.App.ARRAYOPERATION.getSystemValue(ConfigObj.arrKeyVar[1]);
        ConfigObj.SysValue = getSystemValue(ConfigObj.arrKeyVar[1]);
        ConfigObj.SysValue = (ConfigObj.SysValue == null || ConfigObj.SysValue == undefined || ConfigObj.SysValue == 'null' || ConfigObj.SysValue == 'undefined') ? '' : ConfigObj.SysValue;
        //return Ti.App.SQL.safeSQL(Ti.App.ARRAYOPERATION.getSystemValue(ConfigObj.arrKeyVar[1]));
        //  return safeSQL(ConfigObj.SysValue);
        return ConfigObj.SysValue;
    } else if (key.indexOf('Ti.App.') > -1) {
        return Ti.App.SQL.safeSQL(eval(key));
    } else if (key.toUpperCase() == 'AGENTID') {
        return agentID;
        // return Ti.App.SQL.safeSQL(Ti.App.agentID);
    }
    else if (key.toUpperCase() == 'ACCESSLEVEL') {
        return AccessLevel;
    }
    else if (key.toUpperCase() == 'CLICKED_MAP_CUSTOMERNO') {
        return Clicked_Map_CustomerNo;
    }
    else if (key.toUpperCase() == 'LANGUAGE') {
        return Language;
    }
    else if (key.toUpperCase() == 'SOLUTIONNAME') {
        return SolutionName;
    }
    else if (key.toUpperCase() == 'SALESAGENTID') {
        if (Ti.App.SalesAgentID == '' || Ti.App.SalesAgentID == null || Ti.App.SalesAgentID == undefined) {
            return Ti.App.SQL.safeSQL(Ti.App.agentID);
        } else {
            return Ti.App.SQL.safeSQL(Ti.App.SalesAgentID);
        }
    } else if (key.toUpperCase() == 'GPS.LONGITUDE') {
        ConfigObj.longitude = 0;
        Ti.Geolocation.purpose = 'Get Current Location';
        Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
        Ti.Geolocation.distanceFilter = 1;
        Titanium.Geolocation.getCurrentPosition(function (e) {
            if (!e.error) {
                //get the properties from Titanium.GeoLocation
                //return Ti.App.SQL.safeSQL(e.coords.longitude);
                ConfigObj.longitude = e.coords.longitude;
                //latitude = e.coords.latitude;
                return Ti.App.SQL.safeSQL(ConfigObj.longitude);
            } else {
                return Ti.App.SQL.safeSQL(ConfigObj.longitude);
            }
        });
        //return Ti.App.SQL.safeSQL(longitude);

    } else if (key.toUpperCase() == 'GPS.LATITUDE') {
        ConfigObj.latitude = 0;
        Ti.Geolocation.purpose = 'Get Current Location';
        Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
        Ti.Geolocation.distanceFilter = 1;
        Titanium.Geolocation.getCurrentPosition(function (e) {
            if (!e.error) {
                //e.coords.longitude
                //return Ti.App.SQL.safeSQL(e.coords.latitude);
                ConfigObj.latitude = e.coords.latitude;
                return Ti.App.SQL.safeSQL(ConfigObj.latitude);
            } else {
                return Ti.App.SQL.safeSQL(ConfigObj.latitude);
            }
        });
        //return Ti.App.SQL.safeSQL(Ti.App.agentID);
        //return Ti.App.SQL.safeSQL(latitude);
    } else if (key.toUpperCase() == 'SAPItemId'.toUpperCase()) {
        return Ti.App.SQL.safeSQL(Ti.App.SAPItemId);
    } else if (key.toUpperCase() == 'CUSTNO') {
        return Ti.App.SQL.safeSQL(Ti.App.CustNo);
    } else if (key.toUpperCase() == 'SAPItemUom'.toUpperCase()) {
        return Ti.App.SQL.safeSQL(Ti.App.SAPItemUom);
    } else if (key.toUpperCase() == 'SAPItemQty'.toUpperCase()) {
        return Ti.App.SQL.safeSQL(Ti.App.SAPItemQty);
    } else if (key.toUpperCase() == 'MetrialPriceGroup'.toUpperCase()) {
        var MetrialPriceGroup = '';
        qry = "select MaterialPriceGroup from Products where ItemId = " + Ti.App.SQL.safeSQL(Ti.App.SAPItemId);
        dbDataRows = Ti.App.dbConn.execute(qry);
        while (dbDataRows.isValidRow()) {
            MetrialPriceGroup = dbDataRows.fieldByName('MaterialPriceGroup');
            dbDataRows.next();
        }
        dbDataRows.close();
        MetrialPriceGroup = (MetrialPriceGroup == null || MetrialPriceGroup == undefined || MetrialPriceGroup == '') ? '' : MetrialPriceGroup;
        return Ti.App.SQL.safeSQL(MetrialPriceGroup);
    }
    return replaceQueryString(key, queryName);//COntroller
}

function getFormComponent1(index) {
    //return Ti.App.formItems.children[index].children[1];

    try {
        var field = Ti.App.formItems.children[index].children[1];
        if (field.sType != undefined && field.sType != null && field.sType != '' && field.sType == 'ListView') {
            field = Ti.App.formItems.children[index].children[2];
        }
        return field;
    } catch (e) {
        return null;
    }

}

function getFormComponent(index) {
    //return Ti.App.formItems.children[index].children[1];

    try {
        // var field = $('#' + index).val();
        var field = formItems[index];
        return field;
    } catch (e) {
        return null;
    }

}

function getSelectedRowIndex() {

    COMMONLog('selectedRowIndex : ' + selectedRowIndex);

    return selectedRowIndex;
}

function ItemPromo_LogString(errorStr) {

    try {
        $.ajax({
            type: 'POST',
            url: url_WriteItemPromoLog,
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