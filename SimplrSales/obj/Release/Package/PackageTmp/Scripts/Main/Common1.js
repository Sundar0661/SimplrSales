var isErrorLogEnable = false;

function showAlert(messageCode, mButtonNames, params) {

    //if (Ti.Platform.osname === 'android') {
    //    Ti.UI.Android.hideSoftKeyboard();
    //}

    show(messageCode, mButtonNames, params);
}

function CheckDecimal(dVal) {
    if (dVal == null || dVal == undefined || dVal == 'null' || dVal == '') {
        return 0;
    } else {
        return dVal;
    }
}


function info(error, logType) {
    if (isErrorLogEnable == true)
        $.ajax({
            url: url_JavaScriptErrorData,
            type: 'POST',
            dataType: 'json',
            async: false,
            data: { error: error, logType: logType },
            success: function (results) {
                return results;
            },
            error: function (results, q, a) {
                //alert(results);
            }
        });
}

var javascriptErrorMessage = '';
var javascriptErrorMessageCnt = 0;
var msg = '';
function COMMONLog(text) {
    if (isErrorLogEnable == true) {
        javascriptErrorMessage += new Date() + "\r\n";
        javascriptErrorMessage += "-----------------------------------------------------------\r\n";
        javascriptErrorMessage += text + "\r\n";
        javascriptErrorMessage += "-----------------------------------------------------------\r\n";

        // javascriptErrorMessage = javascriptErrorMessage + " " + text;
        if (javascriptErrorMessageCnt == 50) {
            info(javascriptErrorMessage);
            javascriptErrorMessage = '';
            javascriptErrorMessageCnt = 0;
        }
        javascriptErrorMessageCnt++;
        // info(text);
    }
}
function TiAPIinfo(text) {
    if (isErrorLogEnable == true) {
        javascriptErrorMessage += new Date() + "\r\n";
        javascriptErrorMessage += "-----------------------------------------------------------\r\n";
        javascriptErrorMessage += text + "\r\n";
        javascriptErrorMessage += "-----------------------------------------------------------\r\n";

        // javascriptErrorMessage = javascriptErrorMessage + " " + text;
        if (javascriptErrorMessageCnt == 50) {
            info(javascriptErrorMessage);
            javascriptErrorMessage = '';
            javascriptErrorMessageCnt = 0;
        }
        javascriptErrorMessageCnt++;
        //  info(text);
    }
}

var pageLoadingLog = '';
var pageLoadingLogCnt = 0;
//new Date().getTime()
 
function PageLoadinginfo(text) {
    
    if (isErrorLogEnable == true) {
        var d = new Date();

        pageLoadingLog += d + " : " + d.getMilliseconds() + " : " + d.getTime() + "\r\n";
        pageLoadingLog += "-----------------------------------------------------------\r\n";
        pageLoadingLog += text + "\r\n";
        pageLoadingLog += "-----------------------------------------------------------\r\n";
        info(pageLoadingLog);
    }
}

function PageLoadinginfo_ALT(text) {
       
    pageLoadingLog += text + "\r\n";
    info_ALT(pageLoadingLog);
}



function info_ALT(error, logType) {
    //if (isErrorLogEnable == true)
        $.ajax({
            url: url_JavaScriptErrorData_TestPurpose,
            type: 'POST',
            dataType: 'json',
            async: false,
            data: { error: error, logType: logType },
            success: function (results) {
                return results;
            },
            error: function (results, q, a) {
                //alert(results);
            }
        });
}
function replaceSpecialCharacters(str) {
    /**********
    //http://xml.silmaril.ie/specials.html
     &lt;	< 
     &amp; 	& 
     &gt; 	> 
     &quot; " 
     &apos; '
    /**********/
    if (str == null || str == undefined || str == "") {
        return "";
    }
    str = new String(str);
    str = str.replace(/&/g, '&amp;');//Already Exists in handleSpecialCharacters method
    str = str.replace(/</g, '&lt;');
    str = str.replace(/>/g, '&gt;');
    str = str.replace(/"/g, '&quot;');
    str = str.replace(/'/g, '&apos;');
    //return str.replace(/&/g, '&amp;');
    return str;

}
//function setCookie(key, value) {
//        var expires = new Date();
//        expires.setTime(expires.getTime() + (1 * 24 * 60 * 60 * 1000));
//        document.cookie = key + '=' + encodeURIComponent(value) + ';expires=' + expires.toUTCString();
      
//    }

    function getCookie(key) {
        //var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
        //return keyValue ? keyValue[2] : null;
        var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
        return keyValue ? decodeURIComponent(keyValue[2]) : null;
    }

//function setCookie_old(key, value) {
//    var expires = new Date();
//    expires.setTime(expires.getTime() + (1 * 24 * 60 * 60 * 1000));
//    document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();
//    //$.cookie(key, value);
//    //$.cookie('the_cookie');// => "the_value"
//}

//function getCookie_old(key) {
//    var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
//    return keyValue ? keyValue[2] : null;
//}

