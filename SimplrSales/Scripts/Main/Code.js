function saveModuleSettingsForm(value) {
    // value = value.replace(/@/g, ",");
    var selected = new Array();
    //Reference the CheckBoxes and insert the checked CheckBox value in Array.
    $("#ModuleSettingsId input[type=checkbox]:checked").each(function (e) {
        selected.push(this.value);
    });
    var qry = "Delete from  UserAccess where UserID={FormView.SalesMan} \n";
    for (var i = 0; i < selected.length; i++) {
        qry += "insert into UserAccess (UserID,ModuleName) values({FormView.SalesMan},'" + selected[i] + "') \n";
    }

    qry = formatQueryString(qry, currentScreenName);//ScreenView
    execute(qry);
    executeQry;
    return;
}


function StockTransferFormformButtonClicked(obj, dataMember, rowIndex, value) {
    if (dataMember == 'SaveBtn') {
        var isgetConfirmStatus = getConfirmStatus();
        if (isgetConfirmStatus == true) {
            alert("You cannot modify this order. The transfer has already Completed.", "Inventory Updated Already");
            return;
        }
    }
    else if (dataMember == "ConfirmBtn") {
        // select * from transferhdr where StockRequestNo='REQ0000035' 

        var qry = "select * from transferhdr where StockRequestNo='" + $('#StockRequestNo').val() + "'";
        //var qry = "select * from transferhdr where StockRequestNo={ FormView.StockRequestNo }";
        //qry = formatQueryString(qry, '');
        execute(qry);
        if (executeQry.toString() != "");
        else {
            if (dataMember == "ConfirmBtn") {
                obj = {};
                obj.title = "Stock Transfer Form";
                obj.message = "Form data is not saved";
                showAlertMessage(obj);
                return;
            }
        }

        if (isConfirmBtn == true) {
            alert("already confirm button clicked!");
            return;
        }
        isConfirmBtn = true;
        var listConfig = ListHeaderList['ListConfig_' + CurrentScreen_TabScreen_Name + '_' + FieldName];

        var isgetConfirmStatus = getConfirmStatus();
        if (isgetConfirmStatus != true) {
            var isgetCheckinStatus = getCheckinStatus();
            if (isgetCheckinStatus != true) {

                itemNo = listConfig[1].FieldName;
                uom = listConfig[3].FieldName;
                qty = listConfig[5].FieldName;
                tbFromLoc = $('#FromLoc').val();
                tbToLoc = $('#ToLoc').val();

                var tblbody = document.getElementById("ListBodyDivId_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName);
                for (var cnt = 0; cnt < (tblbody.children.length) ; cnt++) {
                    if (tblbody.rows[cnt].cells.namedItem(itemNo).innerText != "" && tblbody.rows[cnt].cells.namedItem(uom).children.UOM.value != "" && tblbody.rows[cnt].cells.namedItem(qty).children.ActualQty.value != "") {
                        StrSql = "Exec ReduceGoodsInventory @ItemNo = '" + tblbody.rows[cnt].cells.namedItem(itemNo).innerHTML + "', @Uom = '" + tblbody.rows[cnt].cells.namedItem(uom).children.UOM.value + "', @Qty =  '" + tblbody.rows[cnt].cells.namedItem(qty).children.ActualQty.value + "', @FromBin =  '" + tbFromLoc + "', @FromLoc = '" + tbFromLoc + "',@LineNum =  '" + (cnt + 1) + "',@TransNo = '" + $('#TransNo').val() + "'";
                        execute(StrSql);

                        StrSql = "Exec IncreaseGoodsInventory @ItemNo = '" + tblbody.rows[cnt].cells.namedItem(itemNo).innerHTML + "', @Uom = '" + tblbody.rows[cnt].cells.namedItem(uom).children.UOM.value + "', @Qty =  '" + tblbody.rows[cnt].cells.namedItem(qty).children.ActualQty.value + "', @ToBin =  '" + tbToLoc + "', @ToLoc = '" + tbToLoc + "',@LineNum =  '" + (cnt + 1) + "',@TransNo = '" + $('#TransNo').val() + "'";
                        execute(StrSql);
                    }
                }

                StrSql = "Update TransferHdr set TransStatus=1 where TransNo = '" + $('#TransNo').val() + "'";
                execute(StrSql);

                var arrNewQty = [];


                qry = "select ItemNO,Sum(TotTQuantity) as TotTQuantity,Sum(CSBAseQty) as CSBaseQty  from (select TransferDet.ItemNo,ISNULL(ShippedQty,0)*UOM.BaseQty as TotTQuantity,ISNULL(ShippedQty,0)*UOM.BaseQty/(select UOM.BAseQty from UOM where UOM.ItemNO=TransferDet.ItemNo and UOM.UOM='CS') as CSBAseQty from TransferDet inner join UOM on UOM.ItemNo=TransferDet.ItemNO and UOM.UOM=TransferDet.UOM inner join TransferHDR on TransferHDR.TransNo=TransferDet.TransNo where TransferHDR.StockRequestNo='" + $('#StockRequestNo').val() + "') as C group By C.ItemNO";
                execute(qry);
                var dStkTr = executeQry;
                qry = "select ItemNO,Description, Sum(TotSQuantity) As TotSQuantity,Sum(CSBAseQty) as CSBAseQty  from (select StockOrderItem.ItemNo,Item.[Description],Qty*UOM.BaseQty as TotSQuantity,Qty*UOM.BaseQty/(select UOM.BAseQty from UOM where UOM.ItemNO=StockOrderItem.ItemNo and UOM.UOM='CS') as CSBAseQty from StockOrderItem inner join UOM on UOM.ItemNo=StockOrderItem.ItemNO and UOM.UOM=StockOrderItem.UOM inner join Item On Item.ItemNo=StockOrderItem.ItemNO where StockNO='" + $('#StockRequestNo').val() + "') as D group By D.ItemNO,D.Description";
                execute(qry);
                var dtStkReq = executeQry;
                for (var i = 0; i < dtStkReq.length; i++) {
                    var flag = 0;
                    for (var j = 0; j < dStkTr.length; j++) {
                        if (dtStkReq[i].ItemNO == dStkTr[j].ItemNO) {
                            flag = 1
                            if (dtStkReq[i].CSBAseQty > dStkTr[j].CSBaseQty)
                                arrNewQty.push(parseFloat(dtStkReq[i].CSBAseQty) - parseFloat(dStkTr[j].CSBaseQty))
                            else
                                arrNewQty.push(0)
                        }
                    }
                    if (flag = 0) {
                        arrNewQty.push(parseFloat(dtStkReq[i].CSBAseQty))
                    }
                }

                var flag1 = 0;
                for (var i = 0; i < arrNewQty.length - 1; i++) {
                    if (arrNewQty[i] != 0)
                        flag1 = 1;
                }
                if (flag1 == 0) {
                    StrSql = "Update StockOrder set CheckIn=1 where StockNO = '" + $('#StockRequestNo').val() + "'";
                    execute(StrSql);
                }
                else {
                    StrSql = "Update StockOrder set CheckIn=0 where StockNO = '" + $('#StockRequestNo').val() + "'";
                    execute(StrSql);
                }

                // alert("Stock transfer updated in Inventory", "Inventory Updated");
                var _obj = {};
                _obj.fieldName = "ConfirmBtn";
                PerformAction('formButtonClicked', _obj);
            }
            else
                alert("The stock request you mentioned in this transfer was already Checked-In", "Stock Request Checked-In Already");
        }
        else
            alert("Stock transfer is already updated in Inventory", "Inventory Updated Already");

        return;
    }
}

function InventoryAdjustmentFormformButtonClicked(obj, dataMember, rowIndex, value) {

    var qry = "select * from StockAdjustmentHdr where docno='" + $('#DocNo').val() + "'";
    execute(qry);
    if (executeQry.toString() != "") {
        if (executeQry[0].IsConfirmed == true && dataMember == "SaveBtn") {
            obj = {};
            obj.title = "Inventory Adjustment Form";
            obj.message = "Form data is already confirmed";
            showAlertMessage(obj);
            return;
        }
        else if (executeQry[0].IsConfirmed == true && dataMember == "ConfirmBtn") {
            obj = {};
            obj.title = "Inventory Adjustment Form";
            obj.message = "Form data is already confirmed";
            showAlertMessage(obj);
            return;
        }
        else if (executeQry[0].IsConfirmed == false && dataMember == "ConfirmBtn") {
            isInvAdjConfirmBtn = true;
            var qry = "select  * from  StockAdjustmentDet where docno={FormView.DocNo}"
            var sScreenName = '';
            qry = formatQueryString(qry, sScreenName);
            execute(qry);
            var data = executeQry;
            //  var formData = $.parseJSON(executeStringQry);
            var obj = {};
            for (var i = 0; i < data.length; i++) {
                obj = {};
                $.each(data[i], function (key, value) {
                    obj[key] = value;
                });
                FormView[FormView.FieldName] = obj;
                var _obj = {};
                _obj.fieldName = dataMember;
                PerformAction('formButtonClicked', _obj);
              
            }

            _obj.fieldName = "Inv" + dataMember;
            PerformAction('formButtonClicked', _obj);
        }
    }
    else {
        if (dataMember == "ConfirmBtn") {
            obj = {};
            obj.title = "Inventory Adjustment Form";
            obj.message = "Form data is not saved";
            showAlertMessage(obj);
            return;
        }
    }
    if (dataMember == "SaveBtn") {
        var obj = {};
        var id = '';
        var value = '';
        var listConfig = ListHeaderList['ListConfig_' + CurrentScreen_TabScreen_Name + '_' + dynamicFieldName];
        var tblbody = document.getElementById("ListBodyDivId_" + CurrentScreen_TabScreen_Name + "_" + dynamicFieldName);
        for (var cnt = 0; cnt < (tblbody.childNodes.length - 1) ; cnt++) {
            for (var i = 0; i < listConfig.length; i++) {
                id = listConfig[i].FieldName;

                var tdType = tblbody.rows[cnt] == undefined ? "" : getTableRowTDType(tblbody.rows[cnt].cells.namedItem(id).innerHTML);
                //   var tdType = tblbody.rows[cnt] == undefined ? "" : getTableRowTDType(tblbody.childNodes[cnt].children(id).innerHTML);
                if (tdType == "text" || tdType == "select") {
                    // value = tblbody.childNodes[cnt].children(id).firstChild.value;
                    value = tblbody.rows[cnt].cells.namedItem(id).childNodes['0'].value;

                    //value = tblbody.childNodes['0'].cells[id].value
                    // value = tblbody.rows[i].cells.namedItem(id).childNodes['0'].value;
                }
                else {
                    // value = tblbody.childNodes[cnt].children(id).innerText;
                    value = tblbody.rows[cnt].cells.namedItem(id).innerText;
                    //value = tblbody.childNodes['0'].cells(id).innerText
                    //value = tblbody.rows[i].cells.namedItem(id).innerText;
                }
                obj[id] = value;
                obj.FieldName = FieldName;
            }

            FormView.FieldName = FieldName;
            FormView[FieldName] = obj;
            var _obj = {};
            _obj.fieldName = dataMember;
            PerformAction('formButtonClicked1', _obj);
            if (isDynamicValidate == false) {
                isDynamicValidate = true;
                return;
            }
        }
    }

}


