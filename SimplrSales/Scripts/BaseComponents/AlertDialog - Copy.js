function show(messageCode, mButtonNames, params) {

    //Ti.App.varObjMessage = Ti.App.ARRAYOPERATION.getMessageString(Ti.App.currentScreenName, messageCode);
    var varObjMessage = getMessageString(currentScreenName, messageCode); //ArrayOperation

    //ConfirmDialog('Are you sure', varObjMessage, messageCode, mButtonNames, params);


    if (varObjMessage != undefined) {
        // Ti.App.varObjMessage.title = (Ti.App.varObjMessage.title != null && Ti.App.varObjMessage.title != undefined && Ti.App.varObjMessage.title != '') ? Ti.App.varObjMessage.title : Ti.App.sAppName;//'Simplr Sales';
        //varObjMessage.title = (varObjMessage.title != null && varObjMessage.title != undefined && varObjMessage.title != '') ? varObjMessage.title : Ti.App.sAppName;//'Simplr Sales';
        varObjMessage.title = (varObjMessage.title != null && varObjMessage.title != undefined && varObjMessage.title != '') ? varObjMessage.title : "";//'Simplr Sales';

        var btns = {};
        var btns1 = [];
        params.messageCode = messageCode;
        for (var i = 0; i < mButtonNames.length; i++) {
            params.index = i;
            //btns[mButtonNames[i]] = function (e) {
            //    //params.index = e.index;
            //    params.index = i;
            //    alertDialogClick(params); //Controller.js
            //    //$(this).close();
            //    $(this).dialog("close");
            //}

            btns[mButtonNames[i]] = {
                id: i,
                text: mButtonNames[i],
                click: function (e) {
                    params.index = parseInt(e.currentTarget.id);
                    alertDialogClick(params); //Controller.js
                    $(this).dialog("close");
                }
            }
        }
        if (messageCode == "SUCCESSMESSAGE") {

            $('<div></div>').appendTo('body')
                    .html('<div><h6>' + varObjMessage.messageText + '</h6></div>').dialog({
                        modal: true, title: varObjMessage.title, zIndex: 10000, autoOpen: true,
                        width: 'auto', resizable: false,
                        buttons: btns
                    });
            //alert(varObjMessage.messageText);
        }
        else {
            $('<div></div>').appendTo('body')
                            .html('<div><h6>' + varObjMessage.messageText + '</h6></div>').dialog({
                                modal: true, title: varObjMessage.title, zIndex: 10000, autoOpen: true,
                                width: 'auto', resizable: false,
                                buttons: btns
                            });
        }



        //Ti.App.varAlertDialog = Titanium.UI.createAlertDialog({
        //    title: Ti.App.varObjMessage.title,//'Simplr Sales',//
        //    message: Ti.App.varObjMessage.messageText,
        //    buttonNames: mButtonNames, //['OK'],
        //    persistent: true
        //});

        ////canceledOnTouchOutside

        //if (params != null) {
        //    params.messageCode = messageCode;
        //    Ti.App.varAlertDialog.params = params;
        //    Ti.App.varAlertDialog.addEventListener('click', function (e) {
        //        params.index = e.index;
        //        params.controller.alertDialogClick(params);
        //    });
        //}
        //Ti.App.varAlertDialog.show();

    }

}

function ConfirmDialog(message, varObjMessage, messageCode, mButtonNames, params) {

    var btns = {};
    for (var i = 0; i < mButtonNames.length; i++) {
        btns[mButtonNames[i]] = function () { alert(mButtonNames[i] + " code here"); }
    }
    $('<div></div>').appendTo('body')
                    .html('<div><h6>' + varObjMessage.messageText + '</h6></div>').dialog({
                        modal: true, title: varObjMessage.title, zIndex: 10000, autoOpen: true,
                        width: 'auto', resizable: false,
                        buttons: btns
                    });
}

function showAlertMessage(obj, messageHeader) {

    var btns = {};
    btns["Ok"] = function (e) {
        $(this).dialog("close");
    }

    $('<div></div>').appendTo('body')
                    .html('<div><h6>' + obj.message + '</h6></div>').dialog({
                        modal: true, title: obj.title, zIndex: 10000, autoOpen: true,
                        // width: 'auto', resizable: false,
                        width: '40%', resizable: false,
                        buttons: btns
                    });
}


function ConfirmMessage(obj) {
    var btns = {};
    btns["Yes"] = function (e) {
        if (isDynamicRowItemDelete == true)
            DynamicRowItemRemoveConfirm(obj.objthis, obj.dataMember, obj.rowIndex, obj.value, obj.fieldName, obj.cnt);
        else
            DeleteConfirm();
        $(this).dialog("close");
    }
    btns["No"] = function (e) {
        $(this).dialog("close");
    }

    $('<div></div>').appendTo('body')
                    .html('<div><h6>' + obj.message + '</h6></div>').dialog({
                        modal: true, title: obj.title, zIndex: 10000, autoOpen: true,
                        // width: 'auto', resizable: false,
                        width: '20%', resizable: false,
                        buttons: btns
                    });
}


function setAutoDialog() {
    var testArray = ["T1", "T2"];
    var myClass = [{
        myclass: "primary",
        color: "#558899"
    }, {
        myclass: "secondary",
        color: "pink"
    }];
    var testFunction = function (e) {
        alert("worked2");
        alert($(e.target).prop("class"));
    };

    var myButtons = [];
    var i = 0;
    for (i = 0; i < testArray.length; i++) {
        //myButtons[i] = {
        //    text: testArray[i],
        //    click: testFunction,
        //    myclass: myClass[i].myclass
        //};

        //  myButtons[i] =   "{" +myClass[i].myclass +":"+ function() {
        //      $(this).dialog('close');
        //      $('form').submit();
        //  },
        //'Cancel': function() {
        //    $(this).dialog('close');
        //}

    }


    $('<div></div>').appendTo('body')
                            .html('<div><h6>' + varObjMessage.messageText + '</h6></div>').dialog({
                                modal: true, title: varObjMessage.title, zIndex: 10000, autoOpen: true,
                                width: 'auto', resizable: false,
                                buttons: myButtons
                            });
}

function setAutoDialog1() {
    var testArray = ["T1", "T2"];

    //function testFunction(a) {
    //    if (a == 0)
    //        alert("worked");
    //    else
    //        alert("workedeee");

    //}

    var myButtons = {};

    for (var i = 0; i < testArray.length; i++) {
        myButtons[testArray[i]] = testFunction(i);
    }
    //$('#messageDialogId').text("varObjMessage.messageText");
    //$('#messageDialog').dialog({
    //    autoOpen: false,
    //    width: 'auto',
    //    buttons: myButtons
    //});
    //$('<div></div>').appendTo('body')
    //                     .html('<div><h6>ssssss</h6></div>').dialog({
    //                         modal: true, title: "varObjMessage.title", zIndex: 10000, autoOpen: true,
    //                         width: 'auto', resizable: false,
    //                         buttons: myButtons
    //                     });

}
function setAutoDialog2() {
    var testArray = ["T1", "T2"];

    var myButtons = {};


    //for (var i = 0; i < testArray.length; i++) {
    //    //var testFunction = function ( ) {
    //    //    alert(testArray[i]);
    //    //}
    //    var testFunction = function (e) {
    //        testFunction11(e);
    //    }

    //    myButtons[testArray[i]] = testFunction;
    //}

    //for (var i = 0; i < testArray.length; i++) {
    //    $('<div></div>').appendTo("<input type='text' id='" + i + "'>");
    //    $('#' + i).val(i);
    //    var dda = $('#' + i).val();
    //    var testFunction = function (e) {
    //        testFunction11(e);
    //    }

    //    myButtons[testArray[i]] = testFunction;
    //}

    for (var i = 0; i < testArray.length; i++) {
        $('<div></div>').appendTo("<input type='text' id='" + i + "'>");
        myButtons[i] = {
            id: i,
            text: testArray[i],
            click: function (e) {
                test(e.currentTarget.id);

            }
        }
    }



    $('<div></div>').appendTo('body')
                         .html('<div><h6>ssddddddddddddddssss</h6></div>').dialog({
                             modal: true, title: "varObjMessage.title", zIndex: 10000, autoOpen: true,
                             width: 'auto', resizable: false,
                             buttons: myButtons
                         });

    //$('#messageDialog').dialog(
    //    {
    //        title: "" + varObjMessage.title + "",
    //        buttons: btns,
    //        //  buttons: {
    //        //    "Ok": function () {
    //        //        $(this).dialog('close');
    //        //    }
    //        //}
    //    }
    //    ).dialog('open');





}


function test(value) {
    //if (value.selector == "#confirm") {
    //    confirmthis();
    //}
    //if (value.selector == "#cancel") {
    //    cancelthis();
    //}
    alert(value);
}



function testFunction11(e) {
    alert("sdd");

}