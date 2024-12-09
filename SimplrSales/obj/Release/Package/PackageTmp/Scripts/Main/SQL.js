

var sqlObj = {};
function safeSQL(value) {
    ////value = this.handleSingleQuote(value);
    //return "'" + value + "%'";
    ////return "'" + value + "'";
    //if (value.split('singlequote').length >= 3) {
    //    return value.replace(/singlequote/g, "'")
    //}

    
   // var strRet = "'" + this.handleSingleQuote(value) + "'";
   // strRet = strRet.replace(/'', ''/g, "', '")
    //return strRet;
    return "'" + this.handleSingleQuote(value) + "'";
}

function handleSingleQuote(value) {

    // COMMENTED 10.12.2020 ====================
    // FOR REMOVING ADDTIONAL SINGLE QUOTES 
    try {
        if (value.substring(0, 1) == "'" && value.slice(-1) == "'") {
            value = value.substring(1, value.length - 1);
        }
    }
    catch (e) {
    }
    // 'asdf' 012345  
    // COMMENTED 10.12.2020 ====================

    /* try {

         if (value != undefined && value != 0 && value != '0') {
             var iPos = value.indexOf('\'');
             if (iPos > 0) {
                 do {
                     value = value.substring(0, iPos) + '"' + value.substring(iPos + 1);
                     iPos = value.indexOf("\'");
                 } while(iPos > 0)
             }
             iPos = value.indexOf('"');
             if (iPos > 0) {
                 do {
                     value = value.substring(0, iPos) + '\'\'' + value.substring(iPos + 1);
                     iPos = value.indexOf('"');
                 } while(iPos > 0)
             }
             return value;
         } else {
             return value;
         }
     } catch(e) {
         return value;
     }
     */

    try {

        //Ti.API.info('value ---> ' + value);

        //value = (value == undefined || value == 'undefined') ? '' : value;

        sqlObj.tmpchar = String.fromCharCode(1);
        if (value != 0 && value != '0' && value != '' && value != null) {
            sqlObj.iPos = value.indexOf('\'');
            if (sqlObj.iPos > 0) {
                do {
                    value = value.substring(0, sqlObj.iPos) + sqlObj.tmpchar + value.substring(sqlObj.iPos + 1);
                    sqlObj.iPos = value.indexOf("\'");
                } while (sqlObj.iPos > 0)
            }
            sqlObj.iPos = value.indexOf(sqlObj.tmpchar);
            if (sqlObj.iPos > 0) {
                do {
                    value = value.substring(0, sqlObj.iPos) + '\'\'' + value.substring(sqlObj.iPos + 1);
                    sqlObj.iPos = value.indexOf(sqlObj.tmpchar);
                } while (sqlObj.iPos > 0)
            }
            return value;
        } else {
            return value;
        }
    } catch (e) {
        //alert('error ---> ' + e);
        return value;
    }

}
function getFieldCount(resultSet) {
    try {
        //if ( (Ti.Platform.name === 'android') || (Ti.version >= '3.3.0') ) {
        //    return resultSet.fieldCount;
        //} else {
        //    return resultSet.fieldCount();
        //}
        return resultSet.length;
    } catch (e) {
        return 0;
    }
}

 