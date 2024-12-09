var selectedDepartmentId = '';
function ChatPerson(toUserId, code, toUserName, department) {
    //debugger;
    selectedDepartmentId = department;
    $("#ChatArea").show();
    $("#SpanSelectCustDiv").hide();
    $("#ToUserImageDivId,#textAreaDiv").show();
    $("#ToUserId").val(toUserId);
    $("#ToUserCode").val(code);
    $("#SpanToUserName").text(toUserName);
    ChatHistory("no");
    startInterval();
}

function ChatHistory(autoRefresh) {
   // debugger;
    // if (autoRefresh == "no")
    $("#ChatArea").empty();
    //$("#ChatArea").html('');
    $.ajax({
        type: "POST",
        url: url_GetChatHistory,
        data: { AgentId: $('#ToUserCode').val(), CustNo: $('#FromUserDepartment').val(), autoRefresh: autoRefresh },
        //data: { AgentId: $('#SalesAgentCode').val(), CustNo: selectedDepartmentId },
        //data: { FromUserId: $('#FromUserId').val(), ToUserid: toUserid },
        dataType: 'json',
        success: function (data) {

            var html = "";
            //if (autoRefresh == "no")
            $("#ChatArea").empty();
            for (i = 0; i < data.length; i++) {
                var message = data[i].Msg;
                var sendDateTime = data[i].FromDt;//ConvertJsonDateString(data[i].FromDt);
                if (message != null) {
                    message = data[i].Msg;
                    message = message.replace(":)", "<img src=\"/images/smile.gif\" class=\"smileys\" />");
                    message = message.replace(":D", "<img src=\"/images/laugh.gif\" class=\"smileys\" />");
                    message = message.replace(":o", "<img src=\"/images/cool.gif\" class=\"smileys\" />");

                    //if (webBrowserName != 'ie')
                    //    message = emojione.toImage(message);
                    //message = emojione.toImage(message);
                    message = urlify(message);
                    //message = emojione.shortnameToImage(message);

                    if (data[i].MessageType == "Principal") {
                        $('#ChatArea').append('<div class="row message-body"> <div class="col-sm-12 message-main-sender" style="margin-top: 5px;">   <div class="sender">    <div class="message-text" style="line-height:20px;">  ' + message + '   </div>   <span class="message-time pull-right">   ' + sendDateTime + '   </span>   </div>     </div>      </div>');
                    }
                    else if (data[i].MessageType == "Customer") {
                        $('#ChatArea').append('<div class="row message-body"><div class="col-sm-12 message-main-receiver" style="margin-top: 5px;"><div class="receiver"> <div class="message-text" style="line-height:20px;">  ' + message + '</div>  <span class="message-time pull-right">   ' + sendDateTime + '   </span>  </div>  </div> </div>');
                    }

                }

                //$("#ChatArea").append(html);
            }
            var elem = document.getElementById('ChatArea');
            elem.scrollTop = elem.scrollHeight;
            //  html = "</ul>";
        },
        error: function (ex) {
            alert('Failed to retrieve data' + ex);
        }
    });
}
function SaveChatHistory() {
    //debugger;
    var model = {
        CustNo: $('#FromUserDepartment').val(),
        AgentId: $('#ToUserCode').val(),
        Msg: $('#message').val(),
        MsgNO: 'Test',
        MessageType: 'Principal'
    };

    $.ajax({
        type: "POST",
        url: url_SaveChatHistory,
        dataType: 'json',
        data: JSON.stringify(model),
        contentType: "application/json",
        success: function (data) {

        },
        error: function (ex) {
            alert('Failed to post data' + ex);
        }
    });
}

var myInterval = 0;
function startInterval() {
    const myInterval1 = setInterval(setIntervalFunction, 5000);
    myInterval = myInterval1;
    //clearInterval(myInterval);
}

function clearIntervalFunction() {
    if (myInterval != 0) {
        clearInterval(myInterval);
        myInterval = 0;
    }
}

var messagetimestamp = 0;
var msglatestts;
function setIntervalFunction() {
    //debugger;
    var qry = "SELECT CAST((CONVERT(bigint, MAX(ts))) as decimal)  as ts FROM Messages";
    execute(qry);
    if (executeQry != null) {
        msglatestts = parseInt(executeQry[0].ts);
        if (messagetimestamp < msglatestts) {
            ChatHistory("yes");
            messagetimestamp = msglatestts;

        }
    }
}

function urlify(input) {
    var urlRegex = /(https?:\/\/([-\w\.]+)+(:\d+)?(\/([\w\/_\.]*(\?\S+)?)?)?)/ig;

    var output = input.replace(urlRegex, function (url) {
        if (url.substring(0, 4) == "http") {
            return '<a href="' + url + '" target="_blank">' + url + '</a>';
        }
        else {
            if (url.substring(0, 3) == "www") {
                url = "http://" + url;
                return '<a href="' + url + '" target="_blank">' + url + '</a>';
            }
            else {
                var n = text.indexOf(url);
                var c = text.charAt(n - 1);
                if (c == "@") {
                    return url;
                }
                else {
                    return url;
                    //	url = "http://" + url;
                    //	return '<a href="' + url + '">' + url + '</a>';
                }
            }
        }
    });

    urlRegex = /([a-zA-Z0-9_\-\.]+)(@[a-zA-Z0-9_\-\.]+)/g;
    output = output.replace(urlRegex, function (url) {
        return '<a href="mailto:' + url + '" target="_blank">' + url + '</a>';
    });

    return output;
}


var sendDateTime = '';
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
}


function urlify(input) {
    var urlRegex = /(https?:\/\/([-\w\.]+)+(:\d+)?(\/([\w\/_\.]*(\?\S+)?)?)?)/ig;

    var output = input.replace(urlRegex, function (url) {
        if (url.substring(0, 4) == "http") {
            return '<a href="' + url + '" target="_blank">' + url + '</a>';
        }
        else {
            if (url.substring(0, 3) == "www") {
                url = "http://" + url;
                return '<a href="' + url + '" target="_blank">' + url + '</a>';
            }
            else {
                var n = text.indexOf(url);
                var c = text.charAt(n - 1);
                if (c == "@") {
                    return url;
                }
                else {
                    return url;
                    //	url = "http://" + url;
                    //	return '<a href="' + url + '">' + url + '</a>';
                }
            }
        }
    });

    urlRegex = /([a-zA-Z0-9_\-\.]+)(@[a-zA-Z0-9_\-\.]+)/g;
    output = output.replace(urlRegex, function (url) {
        return '<a href="mailto:' + url + '" target="_blank">' + url + '</a>';
    });

    return output;
}