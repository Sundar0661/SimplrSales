var isErrorLogEnable = false;
var isPerformActionInfo = true;
if (location.host == "localhost:52063")
    isPerformActionInfo = true;
function showAlert(messageCode, mButtonNames, params) {
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
    if (isErrorLogEnable == true) {
        var url = "../Common/JavaScriptErrorData";
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
var performActioninformation = '';
function PerformActioninfo(text) {
    performActioninformation += text + "\r\n";
    //performActioninformation = text;
    //info_ALT(performActioninformation, "PerformActionInfo");
}

var formListCofiginformation = '';
function FormListConfiginfo(text) {
    formListCofiginformation += text + "\r\n";
}
var pageLoadingLog = '';
var pageLoading_UOMLog = '';
var pageLoadingLogCnt = 0;
//new Date().getTime()

function PageLoadinginfo(text) {
    //isErrorLogEnable = true;
    if (isErrorLogEnable == true) {
        var d = new Date();
        pageLoadingLog += d + " : " + d.getMilliseconds() + " : " + d.getTime() + "\r\n";
        pageLoadingLog += "-----------------------------------------------------------\r\n";
        pageLoadingLog += text + "\r\n";
        pageLoadingLog += "-----------------------------------------------------------\r\n";
        // info(pageLoadingLog);
        info(pageLoadingLog, "PageLoadinginfo");
    }
}

function PageLoadinginfo_ALT(text) {

    pageLoadingLog += text + "\r\n";
    info_ALT(pageLoadingLog);
}
function PageLoadinginfo_ALT_UOM(text, logType) {
    pageLoading_UOMLog += text + "\r\n";
    if (logType != "") {
        info_ALT(pageLoading_UOMLog, logType, 'uom');
        pageLoading_UOMLog = "";
    }
}

function info_ALT1(error, logType) {

    if (logType == "PerformActionInfo") {
        info_ALT_TxtFileName(error, "PerformActionInfoLog");
    }
    //if (isErrorLogEnable == true)
    // if (performActioninformation != "" )
    $.ajax({
        url: url_JavaScriptErrorData_TestPurpose,
        type: 'POST',
        dataType: 'json',
        async: false,
        data: { error: error, logType: logType },
        success: function (results) {
            performActioninformation = "";
            return results;
        },
        error: function (results, q, a) {
            //alert(results);
        }
    });
}
function info_ALT(error, logType, actionuom) {

    if (isPerformActionInfo == false)
        return
    if (error == "") return;
    if (logType == "PerformActionInfo") {
        info_ALT_TxtFileName(error, "PerformActionInfoLog");
    }
    //else if (logType == "FormListConfigInfo_")
    //    info_ALT_TxtFileName(error, "FormListConfigInfoLog");

    error = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(error), encryptkey, { keySize: 128 / 8, iv: encryptiv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    var params = "{'error':'" + error + "','logType':'" + logType + "'}";

    $.ajax({
        url: url_JavaScriptErrorData_TestPurpose,
        type: 'POST',
        data: params,
        contentType: "application/json;charset=utf-8",
        async: false,
        success: function (results) {
            if (actionuom != 'uom')
                performActioninformation = "";
            if (logType == "FormListConfigInfo")
                formListCofiginformation = '';
            return results;
        },
        error: function (results, q, a) {
            //alert(results);
        }
    });
}


//Future use
function info_ALT_TxtFileName(error, txtfileName) {
    if (error == "") return;
    error = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(error), encryptkey, { keySize: 128 / 8, iv: encryptiv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    var params = "{'error':'" + error + "','txtfileName':'" + txtfileName + "'}";

    $.ajax({
        type: "POST",
        url: url_JavaScriptErrorDataTestPurpose,
        data: params,
        contentType: "application/json;charset=utf-8",
        // dataType: "json",
        async: false,
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
function setCookie(key, value) {
    var expires = new Date();
    expires.setTime(expires.getTime() + (1 * 24 * 60 * 60 * 1000));
    document.cookie = key + '=' + encodeURIComponent(value) + ';expires=' + expires.toUTCString();
    //alert(key + " - " + value);
}

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




function checkPassword(str) {
    var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;
    var p = document.getElementById('psw').value,
   errors = [];
    if (p.length < 8) {
        errors.push("Your password must be at least 8 characters");
    }
    else if (p.search(/[A-A]/i) < 0) {
        errors.push("Your password must contain at least one upper case letter.");
    }
    else if (p.search(/[a-z]/i) < 0) {
        errors.push("Your password must contain at least one lower letter.");
    }
    else if (p.search(/[0-9]/) < 0) {
        errors.push("Your password must contain at least one digit.");
    }
    else if (!regex.test(str)) {
        errors.push("Your password must contain at least special character.");
    }

    if (errors.length > 0) {
        $('#InvaildMsg').text(errors.join("\n"));
        //alert(errors.join("\n"));
        return false;
    }
    return true;
}

//function UpdateForgetPassword(sAgentid) 
//{
//    debugger;
//    let sSql;
//    let email = "";
//    let pwd = "";
//    let dt = new DataTable();
//    try {
//        sSql = "Select top 1 password,email from salesagent where Code = " + sAgentid;
//        dt = GetQueryData(sSql);
        
//        if (dt.Rows.length > 0) 
//        {
//            email = dt.Rows[0].ItemArray[0].toString();
//            pwd = dt.Rows[0].ItemArray[1].toString();
//        }

//        if (email !== "") 
//        {
//            let rnd = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
//            pwd = rnd.toString();
//            let Smtp_Server = new SmtpClient();
//            let e_mail = new MailMessage();
//            Smtp_Server.UseDefaultCredentials = false;
//            Smtp_Server.Credentials = new NetworkCredential("noreplysimplr@gmail.com", "oilixdmdnatpvugi");
//            Smtp_Server.Port = 587;
//            Smtp_Server.EnableSsl = true;
//            Smtp_Server.Host = "smtp.gmail.com";
//            e_mail = new MailMessage();
//            e_mail.From = new MailAddress("noreplysimplr@gmail.com");
//            e_mail.To.Add(email);
//            e_mail.Subject = "Simplr - Forgot Password";
//            e_mail.Body = "New Password - " + pwd;
//        } 
//        else 
//        {
//            return false;
//        }
//        return true;

//    }
//}
