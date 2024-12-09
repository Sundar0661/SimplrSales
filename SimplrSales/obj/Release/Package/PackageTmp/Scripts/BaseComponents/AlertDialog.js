function show(messageCode, mButtonNames, params) {

    //Ti.App.varObjMessage = Ti.App.ARRAYOPERATION.getMessageString(Ti.App.currentScreenName, messageCode);
    var varObjMessage = getMessageString(currentScreenName, messageCode); //ArrayOperation

    //ConfirmDialog('Are you sure', varObjMessage, messageCode, mButtonNames, params);
    if (objDynamicRowItemRemove.message == "Are you sure you want to Remove?")
        isDynamicRowItemDeletePerformAction = true;

    if (varObjMessage != undefined) {
        // Ti.App.varObjMessage.title = (Ti.App.varObjMessage.title != null && Ti.App.varObjMessage.title != undefined && Ti.App.varObjMessage.title != '') ? Ti.App.varObjMessage.title : Ti.App.sAppName;//'Simplr Sales';
        //varObjMessage.title = (varObjMessage.title != null && varObjMessage.title != undefined && varObjMessage.title != '') ? varObjMessage.title : Ti.App.sAppName;//'Simplr Sales';
        varObjMessage.title = (varObjMessage.title != null && varObjMessage.title != undefined && varObjMessage.title != '') ? varObjMessage.title : "";//'Simplr Sales';

        if (varObjMessage.messageText.indexOf('These orders are not confirmed yet') > -1)
            varObjMessage.title = "Information!";

        var btns = {};
        var btns1 = [];
        params.messageCode = messageCode;
        for (var i = 0; i < mButtonNames.length; i++) {
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
        $('<div></div>').appendTo('body')
                        .html('<div><h6>' + varObjMessage.messageText + '</h6></div>').dialog({
                            modal: true, title: varObjMessage.title, zIndex: 10000, autoOpen: true,
                            width: 'auto', resizable: false,
                            closeOnEscape: false,
                            buttons: btns
                        });
         $('.ui-dialog-titlebar-close').hide();

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

        if (obj.title == "InBound Updation") {
            window.location.reload();
            $(this).dialog("close");
        }
        if (obj.title == "Change Password") {
           
            windowPreparingToOpen("Main");
            var _obj = {};
            _obj.screenName = "Main";
            _obj.fieldName = "smChangePassword";
            PerformAction('menuItemClicked', _obj);//Controller.js
            $(this).dialog("close");
                    

            //$('#Menu').hide();
        }
        else {
            $(this).dialog("close");
        }
    }

    $('<div></div>').appendTo('body')
                    .html('<div><h6>' + obj.message + '</h6></div>').dialog({
                        modal: true, title: obj.title, zIndex: 10000, autoOpen: true,
                        // width: 'auto', resizable: false,
                        width: '40%', resizable: false, closeOnEscape: false,
                        buttons: btns
                    });

    //Newly added by Nisha/Vishnu on 12/12/2023
    if (obj.title == "Change Password") {
        $('.ui-dialog-titlebar-close').hide();
    }
    
       
}


function ConfirmMessage(obj) {
    var btns = {};
    btns["Yes"] = function (e) {
        if (isDynamicRowItemDelete == true) {
            LoadingImageOpen();
            DynamicRowItemRemoveConfirmNew(obj.objthis, obj.dataMember, obj.rowIndex, obj.value, obj.fieldName, obj.cnt, obj.ttbody, 1);
            
            // DynamicRowItemRemoveConfirm(obj.objthis, obj.dataMember, obj.rowIndex, obj.value, obj.fieldName, obj.cnt, obj.ttbody);
            //Newly Added-28.05.2021
            isDynamicRowItemDelete = false;
            $(this).dialog("close");

            setTimeout(function () {
                LoadingImageClose();
            }, 200);

            try {
                if (obj.ttbody == swap_ttbody)
                rowRefresh(obj.ttbody);
            } catch (err) {

            }
        }
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

function ListRemoveConfirmMessage(obj) {
    var btns = {};
    btns["Ok"] = function (e) {
        //$("#" + obj.ttbody).empty();
        //$('#' + obj.tfoot).empty();
        //objAddDynamicListCount['ListConfig_' + obj.ttbody] = -1;
        //for (var n = 0; n < obj.rowCount ; n++) {
        //    CreateList(obj.ttbody, obj.tfoot, obj.scrName, 1, "", obj.dynamicFieldName, "", 0);
        //}
        $(this).dialog("close");
    }
    //btns["No"] = function (e) {
    //    $(this).dialog("close");
    //}

    $('<div></div>').appendTo('body')
                    .html('<div><h6>' + obj.message + '</h6></div>').dialog({
                        modal: true, title: obj.title, zIndex: 10000, autoOpen: true,
                        // width: 'auto', resizable: false,
                        width: '20%', resizable: false,
                        buttons: btns
                    });
}