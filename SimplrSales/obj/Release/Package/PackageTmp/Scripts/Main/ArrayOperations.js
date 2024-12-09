var getString = {};
var getList = {};
var getInt = {};
var dHeightRatio = 0;
var _isFromMobile = "";
var _fromWhichDevice = "";
var HeaderDetails = [], formDataList = [], messageList = [];

var fieldNames = [], formFieldNames = [], formDataMember = [];

var encryptkey = CryptoJS.enc.Utf8.parse('simplr8080808080');
var encryptiv = CryptoJS.enc.Utf8.parse('simplr8080808080');


var dColorConfigRowIndex = -1, dColorConfigRow = null, isShowSearchButton = false;
var bColorConfig = false, sBorderColor = '#616161', bRowComponentBorder = true, rowHeight = 0;
var ConditionFieldValue = '', CForeColor = '', CBackColor = 'transparent';
var sCondArr = [], DataMemberValue = '', tmpFieldVal = '', sColorCondFieldArr = [], ComboboDataObj = {};

var sLanguage = ""; //Language;
//setListConfig(sLanguage);

setQueryConfig();
//setMessageConfig(sLanguage);
setMessageConfig();
setColorConfig();//sLanguage);
var data = {}, iIndex = 0, mView = null, mController = null, commonObj = {};

//function getSystemValue(key) {
//    COMMONLog('System Table Field Requested -> ' + key.toUpperCase() + ' : ' + systemTableConfig[key.toUpperCase()]);
//    return systemTableConfig[key.toUpperCase()];
//}

function loadListConfigArr(screenName) {
    //   commonObj.headerListLength = Titanium.App.Properties.getInt('TotalWidth_' + screenName);
    commonObj.headerListLength = getInt['TotalWidth_' + screenName];
    if (screenName == '' || commonObj.headerListLength == 0) {
        return;
    }
    title = screenName;
    HeaderDetails = getListConfigByScreenName(screenName);
}

function setTableHeaderFieldNames(screenName) {
    fieldNames = [];
    commonObj.details = this.getListConfigByScreenName(screenName);
    if (commonObj.details != undefined && commonObj.details != null) {
        for (var c = 0; c < commonObj.details.length; c++) {
            fieldNames.push('' + commonObj.details[c].DataMember.toUpperCase());
        }
    }
}

function resetRowiIndex() {
    //before Call Refersh List method need to reset iIndex value
    iIndex = 0;
}
function getListConfigByScreenName(screenName) {
    COMMONLog('Load ListConfig_' + screenName);
    return getList['ListConfig_' + screenName];
}
function getQueryConfigByScreenName(queryName) {

    if (queryName == "ItemPromotionForm_Item_USER_VALIDATE" && CurrentScreen_TabScreen_Name.replace(" ", "") == "ItemPromotionForm_Appliesto")
        queryName = "ItemPromotionForm_Appliesto_Item_USER_VALIDATE";
    else if (queryName == "ItemPromotionForm_Item_USER_VALIDATE" && CurrentScreen_TabScreen_Name == "ItemPromotionForm_Offer")
        queryName = "ItemPromotionForm_Offer_Item_USER_VALIDATE";
    else if (queryName == "ItemPromotionForm_Item_USER_VALIDATE" && CurrentScreen_TabScreen_Name == "ItemPromotionForm_Condition")
        queryName = "ItemPromotionForm_Condition_Item_USER_VALIDATE";

    var queryText = '';
    $.ajax({
        type: 'POST',
        url: url_GetQueryConfigByScreenName,
        // url: '/Common/GetQueryConfigByScreenName/',
        data: { ScreenName: queryName },
        dataType: 'json',
        async: false,
        success: function (data) {
            if (data != null) {
                queryText = data;
            }
        },
        error: function (results, q, a) {
            PageLogOut("sessionexpired");
        }
    });

    if (mView == null) {
        return queryText;
    }
    return mView.formatQueryString(queryText, queryName);
}


function loadData(screenName, qry, currentPage, isPagination) {
    COMMONLog('LoadData Start Time : ' + new Date().getTime());
    arrFieldControlObj = [];
    bEnabledarrFieldCtrlObj = false;
    if (qry == undefined || qry == 'undefined' || qry == '' || qry == null) {
        return [];
    }
    commonObj.dbDataRows = "";
    commonObj.array = [];
    try {
        //COMMON.traceSTART();
        if (isPagination == true) {
            //qry += ' limit '+(parseInt(currentPage * 100))+', 100'; //' limit 0, 100';
            qry += ' limit ' + (parseInt(currentPage * Ti.App.iPaginationLimit)) + ', ' + Ti.App.iPaginationLimit; //' limit 0, 100';
        }//else{
        COMMONLog('Load Query --> ' + qry);
        // commonObj.dbDataRows = Ti.App.dbConn.execute(qry);
        execute(qry);
        commonObj.dbDataRows = executeQry;
        //iIndex = 0;
        var row = '';
        while (commonObj.dbDataRows.isValidRow()) {
            if (iIndex == 0 && bIsAndroid) {
                row = createUI(screenName, iIndex, commonObj.dbDataRows);
                row.height = 0.1;
                commonObj.array.push(row);
                iIndex++;
            }
            //row = this.createUI(screenName, iIndex, dbDataRows);
            //array.push(row);
            commonObj.array.push(this.createUI(screenName, iIndex, commonObj.dbDataRows));
            iIndex++;
            bEnabledarrFieldCtrlObj = true;
            commonObj.dbDataRows.next();
        }
    } catch (e) {
        //COMMON.hideCustIndicator();
        alert('Query Error : ' + e);
    } finally {
        if (commonObj.dbDataRows != undefined && commonObj.dbDataRows != null) {
            commonObj.dbDataRows.close();
        }
        //commonObj.db.close();
        //COMMON.hideCustIndicator();
        //COMMON.traceEND();
    }
    arrFieldControlObj = [];
    bEnabledarrFieldCtrlObj = false;
    //if (!isPagination) {
    //COMMON.hideIndicator();
    //}
    COMMONLog('array.length ---> ' + commonObj.array.length);
    COMMONLog('LoadData End Time : ' + new Date().getTime());
    //LOG.debug('Arrayoperation - loadData END ' + screenName , 'AvailableMemory : ' + COMMON.availableMemoryInMB());       
    return commonObj.array;
}


function createQuery(query, str1, str2) {
    COMMONLog('Qry : ' + query + ' searchString : ' + str1 + ' replaceString : ' + str2);

    ignore = true;
    return query.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"), (ignore ? "gi" : "g")), (typeof (str2) == "string") ? str2.replace(/\$/g, "$$$$") : str2);
    //return query.replace(searchString, replaceString);
}


function getFormComponentValue(fieldName) {
    try {
        var fieldNameId = fieldName;
        fieldName = fieldName.toUpperCase();
        //  info('formFieldNames -> ' + JSON.stringify(formFieldNames));
        COMMONLog('formFieldNames -> ' + JSON.stringify(formFieldNames));
        COMMONLog('formDataMember -> ' + JSON.stringify(formDataMember));
        commonObj.index = formFieldNames.indexOf(fieldName);
        if (commonObj.index < 0) {
            commonObj.index = formDataMember.indexOf(fieldName);
        }
        if (commonObj.index > -1) {
            fieldComponent = getFormComponent(commonObj.index);//ScreenView
            if (fieldComponent != null && fieldComponent != undefined) {
                fieldControl = fieldComponent.fieldControl;
                var dataMemberType = fieldComponent.DataMemberType;
                fieldNameId = fieldComponent.fieldName;
                // info('fieldName : ' + fieldName + ' - fieldControl : ' + fieldControl + 'fieldComponent : ' + fieldComponent);
                COMMONLog('fieldName : ' + fieldName + ' - fieldControl : ' + fieldControl + 'fieldComponent : ' + fieldComponent);
                //if (fieldControl == 'TEXTBOX' || fieldControl == 'EDITABLETEXTBOX' || fieldControl == 'OPTION' || fieldControl == 'LABEL' || fieldControl == 'COMBOBOX' || fieldControl == 'DATEPICKER' || fieldControl == 'TIMEPICKER') {
                if (fieldControl == 'SEARCH' || fieldControl == 'TEXTBOX' || fieldControl == 'TEXTAREA' || fieldControl == 'EDITABLETEXTBOX' || fieldControl == 'LOOKUP'/*|| fieldControl == 'OPTION' || fieldControl == 'LABEL'*/) {
                    if (dataMemberType.toUpperCase() == "INT" || dataMemberType.toUpperCase() == "FLOAT" || dataMemberType.toUpperCase() == "DECIMAL")
                        return $('#' + fieldNameId).val() == '' ? '0' : $('#' + fieldNameId).val();
                    else
                        return $('#' + fieldNameId).val();
                    //  return fieldComponent.value;
                }
                else if (fieldControl == 'PASSWORD') {
                    return $('#' + fieldNameId).val() == '' ? '' : $('#' + fieldNameId).val();
                }
                else if (fieldControl == 'OPTION') {
                    return CheckBoxFieldValue(fieldNameId);

                    //  return fieldComponent.value;
                }
                    //else if (fieldControl == 'DATEPICKER' || dataMemberType == "DATE") {
                    //}
                else if (fieldControl == 'DATEPICKER') {
                    //else if (fieldControl == 'DATEPICKER' || fieldControl == 'TIMEPICKER') {
                    //  return $('#' + fieldNameId).val() == "" ? "" : document.getElementById(fieldNameId).getAttribute("data-act");
                    //return $('#' + fieldNameId).val() == "" ? "" : DateFormateChange($('#' + fieldNameId).val(), fieldNameId);
                    //  return fieldComponent.code;
                    // return fieldComponent.ComboBoxActiveData;

                    //Changes done by vignesh 19/07/2024
                    //var textvalue = document.getElementById(fieldNameId).getAttribute("data-act"); //.value;

                    var textvalue = DateFormateChange_Format(systemTableConfig['DATEFORMATSTRING'], $('#' + fieldNameId).val());

                    if ($('#' + fieldNameId).val() == "")
                        return ""
                    else {
                        if ($('#' + fieldNameId).val().length == 10)
                            return textvalue.split(' ')[0];
                        else
                            return textvalue;
                    }
                }
                else if (fieldControl == 'LABEL') {
                    return $('#' + fieldNameId).val();

                    // return $('#' + fieldNameId).text();
                    //  return fieldComponent.value;
                }

                //else if (fieldControl == 'LINK') {
                //    return $('#' + fieldNameId).val();
                //}

                else if (fieldControl == 'TIMEPICKER') {
                    return $('#' + fieldNameId).val() == "" ? "" : $('#' + fieldNameId).val();
                }
                else if (fieldControl == 'COMBOBOXSEARCH') {
                    return $('#' + fieldNameId).val();
                }
                else if (fieldControl == 'COMBOBOX' || fieldControl == 'COMBOGROUP') {
                    var textvalue = "";
                    if (ProjectName == "JSU") {
                        if (currentScreenName == "OutstandingPaymentReportForm") {
                            if (fieldNameId == "SalesmanTerritory")
                                textvalue = $('#' + fieldNameId + ' option:selected').text();
                            else
                                textvalue = $('#' + fieldNameId).val();
                        }
                        else if (currentScreenName == "GoodsReturnReportForm") {
                            if (fieldNameId == "SalesmanTerritory")
                                textvalue = $('#' + fieldNameId + ' option:selected').text();
                            else
                                textvalue = $('#' + fieldNameId).val();
                        }
                        else if (currentScreenName == "DailyOrderDetailReportForm") {
                            if (fieldNameId == "SalesmanTerritory")
                                textvalue = $('#' + fieldNameId + ' option:selected').text();
                            else
                                textvalue = $('#' + fieldNameId).val();
                        }
                        else if (currentScreenName == "VoidDocumentsReportForm") {
                            if (fieldNameId == "SalesmanTerritory")
                                textvalue = $('#' + fieldNameId + ' option:selected').text();
                            else
                                textvalue = $('#' + fieldNameId).val();
                        }
                        else if (currentScreenName == "DailyOrderSummaryReportForm") {
                            if (fieldNameId == "SalesmanTerritory")
                                textvalue = $('#' + fieldNameId + ' option:selected').text();
                            else
                                textvalue = $('#' + fieldNameId).val();
                        }
                        else if (currentScreenName == "ActivityReportForm") {
                            if (fieldNameId == "SalesmanTerritory")
                                textvalue = $('#' + fieldNameId + ' option:selected').text();
                            else
                                textvalue = $('#' + fieldNameId).val();
                        }
                        else if (currentScreenName == "FrequencyReportForm") {
                            if (fieldNameId == "SalesmanTerritory")
                                textvalue = $('#' + fieldNameId + ' option:selected').text();
                            else
                                textvalue = $('#' + fieldNameId).val();
                        }
                        else if (currentScreenName == "PaymentSummaryReportForm") {
                            if (fieldNameId == "SalesmanTerritory")
                                textvalue = $('#' + fieldNameId + ' option:selected').text();
                            else
                                textvalue = $('#' + fieldNameId).val();
                        }
                        else if (currentScreenName == "ServiceReportForm") {
                            if (fieldNameId == "SalesmanTerritory")
                                textvalue = $('#' + fieldNameId + ' option:selected').text();
                            else
                                textvalue = $('#' + fieldNameId).val();
                        }
                        else if (currentScreenName == "PaymentCollectionReportForm") {
                            if (fieldNameId == "SalesmanTerritory")
                                textvalue = $('#' + fieldNameId + ' option:selected').text();
                            else
                                textvalue = $('#' + fieldNameId).val();
                        }
                        else if (currentScreenName == "CustomerVisitReportForm") {
                            if (fieldNameId == "SalesmanTerritory")
                                textvalue = $('#' + fieldNameId + ' option:selected').text();
                            else
                                textvalue = $('#' + fieldNameId).val();
                        }
                        else if (currentScreenName == "StockOrderReportForm") {
                            if (fieldNameId == "SalesmanTerritory")
                                textvalue = $('#' + fieldNameId + ' option:selected').text();
                            else
                                textvalue = $('#' + fieldNameId).val();
                        }
                        else if (currentScreenName == "InvoiceDetailReportForm") {
                            if (fieldNameId == "SalesmanTerritory")
                                textvalue = $('#' + fieldNameId + ' option:selected').text();
                            else
                                textvalue = $('#' + fieldNameId).val();
                        }
                        else if (currentScreenName == "SalesManEfficiencyReportForm") {
                            if (fieldNameId == "SalesmanTerritory")
                                textvalue = $('#' + fieldNameId + ' option:selected').text();
                            else
                                textvalue = $('#' + fieldNameId).val();
                        }
                        else if (currentScreenName == "InvoiceSummaryReportForm") {
                            if (fieldNameId == "SalesmanTerritory")
                                textvalue = $('#' + fieldNameId + ' option:selected').text();
                            else
                                textvalue = $('#' + fieldNameId).val();
                        }
                        else {
                            // textvalue = $('#' + fieldNameId).val().replace(/-space-/g, " ");
                            textvalue = $('#' + fieldNameId).val();
                        }
                    }
                    else {
                        // textvalue = $('#' + fieldNameId).val().replace(/-space-/g, " ");
                        //if (ProjectName == "pokka")
                        //    textvalue = $('#' + fieldNameId + ' option:selected').text();
                        //else
                        textvalue = $('#' + fieldNameId).val();
                        if (textvalue == null || textvalue == undefined || textvalue == '') {
                            textvalue = $('#' + fieldNameId + ' option:selected').text();
                        }
                    }

                    textvalue = textvalue;
                    // textvalue = textvalue.replace(/-space-/g, " ");
                    //return $('#' + fieldNameId).val();
                    return textvalue;
                } else if (fieldControl == 'COMBOBOXMULTISELECT') {
                    return $('#' + fieldNameId).val();
                    //  return fieldComponent.code;
                } else if (fieldControl == 'LISTVIEW') {
                    return 'LISTVIEW';
                    //return [];
                    //return fieldComponent.ComboBoxActiveData;
                } else if (fieldControl == 'SWITCH') {
                    fieldComponent.switchValue = (fieldComponent.switchValue != null && fieldComponent.switchValue != undefined && fieldComponent.switchValue != '') ? fieldComponent.switchValue : false;
                    return fieldComponent.switchValue;
                } else if (fieldControl == 'RADIOBUTTON') {
                    // info("RADIOBUTTON : " + formDataMember[i] + " == " + sDataMember.toUpperCase());
                    return RadioButtonFieldvalue(fieldNameId);

                    //var sDataMember = fieldComponent.DataMember;
                    //var arrDataMemberIndex = [];
                    //for (var i = 0; i < formDataMember.length; i++) {
                    //    COMMONLog("RADIOBUTTON : " + formDataMember[i] + " == " + sDataMember.toUpperCase());
                    //    if (formDataMember[i] == sDataMember.toUpperCase()) {
                    //        arrDataMemberIndex.push(i);
                    //    }
                    //}
                    //for (var i = 0; i < arrDataMemberIndex.length; i++) {
                    //    fieldComponent = mView.getFormComponent(arrDataMemberIndex[i]);
                    //    if (fieldComponent.value == true) {
                    //        i = arrDataMemberIndex.length;
                    //        return fieldComponent.DefaultValue;
                    //    }
                    //}
                    //return '';
                }
                else if (fieldControl == "IMAGEUPLOAD") {
                    if (isImageFileUploadChange == true) {
                        SaveImageUpload(fieldNameId, "");
                        //isImageFileUploadChange = false;
                        return $('#' + fieldNameId).val();
                        //return $('#' + fieldNameId + '_1').val();
                    }
                    else {
                        SAVEPHOTO(fieldNameId);
                        return $('#' + fieldNameId).val();
                    }
                }
                else if (fieldControl == "MONTHYEARPICKER") {
                    return $('#' + fieldNameId).val();
                }
                else if (fieldControl == "MONTHPICKER" || fieldControl == "YEARPICKER") {
                    return $('#' + fieldNameId).val();
                }
                else if (fieldControl == "MULTIPLEPHOTO") {
                    return $('#' + fieldNameId).val();
                }
                else if (fieldControl == "IMAGE") {
                    if ($('#' + fieldNameId).attr('src') == "data:image/jpg;base64,undefined") {
                        // alert($('#' + fieldNameId).attr('src'));
                        return "";
                    }
                    return $('#' + fieldNameId).attr('src');
                    //$('#' + fieldNameId).val();
                }
                else if (fieldControl == "AUTOLOOKUP") {
                    return $('#' + fieldNameId).val();
                }
                return fieldComponent.text;
            } else {
                return '';
            }
        }
        else {
            if (fieldName == "IMGCOUNT")
                return $('#' + fieldNameId).val();
            else if (fieldName == "URL")
                return FormView.URL;
            else if (fieldName == "PLANOGRAMURL")
                return FormView.PlanoGramURL;
        }
        return '';
    } catch (e) {
        return '';
    }
}

//function getFormComponent(fieldName) {
//    //fieldName = fieldName.toUpperCase();
//    fieldName = fieldName.toUpperCase();
//    commonObj.index = formFieldNames.indexOf(fieldName);
//    if (commonObj.index > -1) {
//        return getFormComponent(commonObj.index);
//    }
//    return null;
//}

function getFormComponentArrayOperations(fieldName) {
    //fieldName = fieldName.toUpperCase();
    fieldName = fieldName.toUpperCase();
    commonObj.index = formFieldNames.indexOf(fieldName);
    if (commonObj.index > -1) {
        return getFormComponent(commonObj.index);
    }
    return null;
}

function setFormConfig(language) {
    try {
        //var db = commonObj.dbConnectionObj.createDataBaseConnection();
        var qry = "", dbDataRows = "", screenName = '', formdata = {};
        PageLoadinginfo('Form Config Start : ' + new Date());

        //IsHidden
        // Ti.App.dbConn.execute("Update FormConfig SET IsHidden = 0");

        qry = "SELECT * FROM FormConfig where  ScreenName='" + currentScreenName + "' and Language = " + safeSQL(language) + " ORDER BY ScreenName, DisplayNo";
        //info('FormConfig Qry --> ' + qry);
        //info('Form Config Start : ' + new Date());
        PageLoadinginfo('FormConfig Qry --> ' + qry);
        // dbDataRows = Ti.App.dbConn.execute(qry);
        execute(qry);
        dbDataRows = executeQry;
        var iIndex = 0;
        var dFontHeightRatio = systemTableConfig['FONTRATIO'];
        dFontHeightRatio = (dFontHeightRatio == null || dFontHeightRatio == undefined || dFontHeightRatio == '') ? 1 : dFontHeightRatio;
        //info('dFontHeightRatio --> ' + dFontHeightRatio);
        COMMONLog('dFontHeightRatio --> ' + dFontHeightRatio);
        formDataList = [];
        //  while (dbDataRows.isValidRow()) {
        if (dbDataRows.length > 0) {
            for (var i = 0; i < dbDataRows.length; i++) {

                if (screenName != '' && screenName != '' + dbDataRows[i].ScreenName) {
                    //  Titanium.App.Properties.setList('FormConfig_' + screenName, formDataList);
                    getList['FormConfig_' + screenName] = formDataList;
                    formDataList = [];
                }
                screenName = dbDataRows[i].ScreenName;
                formdata = {};
                formdata.screenName = screenName;//dbDataRows[i].ScreenName;
                formdata.fieldName = dbDataRows[i].FieldName;
                formdata.defaultText = dbDataRows[i].DefaultText;
                formdata.newText = dbDataRows[i].NewText;
                /*formdata.headerHeight = dbDataRows[i].HeaderHeight;
                if(parseInt(pHeight*0.05) > formdata.headerHeight){
                    formdata.headerHeight = (Titanium.Platform.displayCaps.density == 'high') ? parseInt(pHeight*0.06) : parseInt(pHeight*0.05); 
                }*/
                formdata.headerHeight = parseInt(dbDataRows[i].HeaderHeight * dHeightRatio);
                formdata.showBorder = CheckDecimal(dbDataRows[i].ShowBorder);//COMMON
                formdata.borderColor = dbDataRows[i].BorderColor;
                //formdata.headerWidth = parseInt(dbDataRows[i].HeaderWidth)-2) + '%';
                //FORMUI - 
                //formdata.dHeaderWidth = parseInt(dbDataRows[i].HeaderWidth)-2);
                formdata.dHeaderWidth = parseInt(dbDataRows[i].HeaderWidth);
                formdata.dHeaderWidth = (formdata.dHeaderWidth < 0) ? 0 : formdata.dHeaderWidth;
                formdata.headerWidth = formdata.dHeaderWidth + '%';
                formdata.HAlignment = dbDataRows[i].HAlignment;
                formdata.HForeColor = dbDataRows[i].HForeColor;
                formdata.HBackColor = dbDataRows[i].HBackColor;
                formdata.HFont = dbDataRows[i].HFont;
                //formdata.HFontSize = (Titanium.Platform.displayCaps.density == 'high') ? parseInt(pHeight*0.025) : parseInt(pHeight*0.02);//dbDataRows[i].HFontSize;
                //formdata.HFontSize = parseInt(dbDataRows[i].HFontSize') * Ti.App.dHeightRatio);
                formdata.HFontSize = parseInt(dbDataRows[i].HFontSize * dFontHeightRatio);
                formdata.HFontStyle = dbDataRows[i].HFontStyle;
                formdata.HForeColorName = dbDataRows[i].HForeColorName;
                formdata.HBackColorName = dbDataRows[i].HBackColorName;
                formdata.ValueHeight = dbDataRows[i].ValueHeight;
                /*if(parseInt(pHeight*0.05) > formdata.ValueHeight){
                    formdata.ValueHeight = (Titanium.Platform.displayCaps.density == 'high') ? parseInt(pHeight*0.06) : parseInt(pHeight*0.05); 
                }*/
                formdata.dValueHeight = parseInt(formdata.ValueHeight);
                formdata.ValueHeight = parseInt(formdata.ValueHeight * dHeightRatio);
                formdata.dValueHeightRatioVal = formdata.ValueHeight;
                formdata.ValueWidth = dbDataRows[i].ValueWidth + '%';
                //FORMUI - 
                formdata.dValueWidth = dbDataRows[i].ValueWidth;
                //FORMUI - 
                formdata.VForeColor = dbDataRows[i].VForeColor;
                formdata.VBackColor = dbDataRows[i].VBackColor;
                formdata.VAlignment = dbDataRows[i].VAlignment;
                formdata.VFont = dbDataRows[i].VFont;
                //formdata.VFontSize = (Titanium.Platform.displayCaps.density == 'high') ? parseInt(pHeight*0.025) : parseInt(pHeight*0.02);//dbDataRows[i].VFontSize;
                //formdata.VFontSize = parseInt(dbDataRows[i].VFontSize') * Ti.App.dHeightRatio);
                formdata.VFontSize = parseInt(dbDataRows[i].VFontSize * dFontHeightRatio);
                formdata.VFontStyle = dbDataRows[i].VFontStyle;
                formdata.VForeColorName = dbDataRows[i].VForeColorName;
                formdata.VBackColorName = dbDataRows[i].VBackColorName;
                formdata.DisplayNo = dbDataRows[i].DisplayNo;
                formdata.DataMember = dbDataRows[i].DataMember;
                //formdata.IsHidden = (formdata.IsHidden == null || formdata.IsHidden == '' || formdata.IsHidden == undefined) ? 0 : formdata.IsHidden;
                formdata.IsHidden = CheckDecimal(dbDataRows[i].IsHidden);//COMMON
                //formdata.IsHidden = (formdata.IsHidden == 1 || formdata.IsHidden == '1') ? 1 : 0;
                if (formdata.IsHidden == 1 || formdata.IsHidden == '1') {
                    formdata.IsHidden = 1;
                    formdata.ValueHeight = 0;
                    formdata.headerHeight = 0;
                }
                formdata.Language = dbDataRows[i].Language;
                formdata.DefaultValue = dbDataRows[i].DefaultValue;
                formdata.Visible = CheckDecimal(dbDataRows[i].Visible);//COMMON
                formdata.FieldControl = dbDataRows[i].FieldControl.toUpperCase();
                formdata.DataMemberType = dbDataRows[i].DataMemberType;
                formdata.DataMemberType = (formdata.DataMemberType == null || formdata.DataMemberType == undefined) ? 'STRING' : formdata.DataMemberType;
                formDataList.push(formdata);
                iIndex = iIndex + 1;
                //dbDataRows.next();
            }
        }
        // dbDataRows.close();
        //db.close();
        if (screenName != '') {
            // Log('FormConfig ScreenNAme 2  --> ' + 'FormConfig_' + screenName);
            // COMMONLog('FormConfig ScreenNAme 2  --> ' + 'FormConfig_' + screenName);
            //  Titanium.App.Properties.setList('FormConfig_' + screenName, formDataList);
            getList['FormConfig_' + screenName] = formDataList;
            formDataList = [];
        }
        qry = ""; qry = null;
        //db = null; 
        dbDataRows = null;
        formdata = {}; formdata = null;
        PageLoadinginfo('Form Config End : ' + new Date());
    } catch (e) { }
}
function setFormConfigByScreenName(sScreenname, language) {
    try {
        //var db = commonObj.dbConnectionObj.createDataBaseConnection();
        var qry = "", dbDataRows = "", screenName = '', formdata = {};

        //IsHidden
        Ti.App.dbConn.execute("Update FormConfig SET IsHidden = 0");

        qry = 'SELECT * FROM FormConfig where Screenname = ' + Ti.App.SQL.safeSQL(sScreenname) + ' and Language = ' + Ti.App.SQL.safeSQL(language) + ' ORDER BY ScreenName, DisplayNo';
        COMMONLog('FormConfig Qry --> ' + qry);
        COMMONLog('Form Config Start : ' + new Date());
        dbDataRows = Ti.App.dbConn.execute(qry);
        var iIndex = 0;
        var dFontHeightRatio = systemTableConfig['FONTRATIO'];
        dFontHeightRatio = (dFontHeightRatio == null || dFontHeightRatio == undefined || dFontHeightRatio == '') ? 1 : dFontHeightRatio;
        COMMONLog('dFontHeightRatio --> ' + dFontHeightRatio);
        formDataList = [];
        while (dbDataRows.isValidRow()) {
            if (screenName != '' && screenName != '' + dbDataRows.fieldByName('ScreenName')) {
                Titanium.App.Properties.setList('FormConfig_' + screenName, formDataList);
                formDataList = [];
            }
            screenName = dbDataRows.fieldByName('ScreenName');
            formdata = {};
            formdata.screenName = screenName;//dbDataRows.fieldByName('ScreenName');
            formdata.fieldName = dbDataRows.fieldByName('FieldName');
            formdata.defaultText = dbDataRows.fieldByName('DefaultText');
            formdata.newText = dbDataRows.fieldByName('NewText');
            /*formdata.headerHeight = dbDataRows.fieldByName('HeaderHeight');
            if(parseInt(pHeight*0.05) > formdata.headerHeight){
                formdata.headerHeight = (Titanium.Platform.displayCaps.density == 'high') ? parseInt(pHeight*0.06) : parseInt(pHeight*0.05); 
            }*/
            formdata.headerHeight = parseInt(dbDataRows.fieldByName('HeaderHeight') * Ti.App.dHeightRatio);
            formdata.showBorder = COMMON.CheckDecimal(dbDataRows.fieldByName('ShowBorder'));
            formdata.borderColor = dbDataRows.fieldByName('BorderColor');
            //formdata.headerWidth = parseInt(dbDataRows.fieldByName('HeaderWidth')-2) + '%';
            //FORMUI - 
            //formdata.dHeaderWidth = parseInt(dbDataRows.fieldByName('HeaderWidth')-2);
            formdata.dHeaderWidth = parseInt(dbDataRows.fieldByName('HeaderWidth'));
            formdata.dHeaderWidth = (formdata.dHeaderWidth < 0) ? 0 : formdata.dHeaderWidth;
            formdata.headerWidth = formdata.dHeaderWidth + '%';
            formdata.HAlignment = dbDataRows.fieldByName('HAlignment');
            formdata.HForeColor = dbDataRows.fieldByName('HForeColor');
            formdata.HBackColor = dbDataRows.fieldByName('HBackColor');
            formdata.HFont = dbDataRows.fieldByName('HFont');
            //formdata.HFontSize = (Titanium.Platform.displayCaps.density == 'high') ? parseInt(pHeight*0.025) : parseInt(pHeight*0.02);//dbDataRows.fieldByName('HFontSize');
            //formdata.HFontSize = parseInt(dbDataRows.fieldByName('HFontSize') * Ti.App.dHeightRatio);
            formdata.HFontSize = parseInt(dbDataRows.fieldByName('HFontSize') * dFontHeightRatio);
            formdata.HFontStyle = dbDataRows.fieldByName('HFontStyle');
            formdata.HForeColorName = dbDataRows.fieldByName('HForeColorName');
            formdata.HBackColorName = dbDataRows.fieldByName('HBackColorName');
            formdata.ValueHeight = dbDataRows.fieldByName('ValueHeight');
            /*if(parseInt(pHeight*0.05) > formdata.ValueHeight){
                formdata.ValueHeight = (Titanium.Platform.displayCaps.density == 'high') ? parseInt(pHeight*0.06) : parseInt(pHeight*0.05); 
            }*/
            formdata.dValueHeight = parseInt(formdata.ValueHeight);
            formdata.ValueHeight = parseInt(formdata.ValueHeight * Ti.App.dHeightRatio);
            formdata.dValueHeightRatioVal = formdata.ValueHeight;
            formdata.ValueWidth = dbDataRows.fieldByName('ValueWidth') + '%';
            //FORMUI - 
            formdata.dValueWidth = dbDataRows.fieldByName('ValueWidth');
            //FORMUI - 
            formdata.VForeColor = dbDataRows.fieldByName('VForeColor');
            formdata.VBackColor = dbDataRows.fieldByName('VBackColor');
            formdata.VAlignment = dbDataRows.fieldByName('VAlignment');
            formdata.VFont = dbDataRows.fieldByName('VFont');
            //formdata.VFontSize = (Titanium.Platform.displayCaps.density == 'high') ? parseInt(pHeight*0.025) : parseInt(pHeight*0.02);//dbDataRows.fieldByName('VFontSize');
            //formdata.VFontSize = parseInt(dbDataRows.fieldByName('VFontSize') * Ti.App.dHeightRatio);
            formdata.VFontSize = parseInt(dbDataRows.fieldByName('VFontSize') * dFontHeightRatio);
            formdata.VFontStyle = dbDataRows.fieldByName('VFontStyle');
            formdata.VForeColorName = dbDataRows.fieldByName('VForeColorName');
            formdata.VBackColorName = dbDataRows.fieldByName('VBackColorName');
            formdata.DisplayNo = dbDataRows.fieldByName('DisplayNo');
            formdata.DataMember = dbDataRows.fieldByName('DataMember');
            //formdata.IsHidden = (formdata.IsHidden == null || formdata.IsHidden == '' || formdata.IsHidden == undefined) ? 0 : formdata.IsHidden;
            formdata.IsHidden = COMMON.CheckDecimal(dbDataRows.fieldByName('IsHidden'));
            //formdata.IsHidden = (formdata.IsHidden == 1 || formdata.IsHidden == '1') ? 1 : 0;
            if (formdata.IsHidden == 1 || formdata.IsHidden == '1') {
                formdata.IsHidden = 1;
                formdata.ValueHeight = 0;
                formdata.headerHeight = 0;
            }
            formdata.Language = dbDataRows.fieldByName('Language');
            formdata.DefaultValue = dbDataRows.fieldByName('DefaultValue');
            formdata.Visible = COMMON.CheckDecimal(dbDataRows.fieldByName('Visible'));
            formdata.FieldControl = dbDataRows.fieldByName('FieldControl').toUpperCase();
            formdata.DataMemberType = dbDataRows.fieldByName('DataMemberType');
            formdata.DataMemberType = (formdata.DataMemberType == null || formdata.DataMemberType == undefined) ? 'STRING' : formdata.DataMemberType;
            formDataList.push(formdata);
            iIndex = iIndex + 1;
            dbDataRows.next();
        }
        dbDataRows.close();
        //db.close();
        if (screenName != '') {
            COMMONLog('FormConfig ScreenNAme 2  --> ' + 'FormConfig_' + screenName);
            Titanium.App.Properties.setList('FormConfig_' + screenName, formDataList);
            formDataList = [];
        }
        qry = ""; qry = null;
        //db = null; 
        dbDataRows = null;
        formdata = {}; formdata = null;
        COMMONLog('Form Config End : ' + new Date());
    } catch (e) { }
}
function setQueryConfig(type) {
    if (type == undefined || SolutionName == "")
        return;
    var dbDataRows = '';

    //var qry = "select ScreenName, QueryText, ISNULL(GroupText,'') as GroupText, ISNULL(OrderText, '' ) as OrderText from QueryConfig where  ScreenName ='MainMenuLoad' and solutionName='" + SolutionName + "'";
    var qry = "select ScreenName, QueryText, ISNULL(GroupText,'') as GroupText, ISNULL(OrderText, '' ) as OrderText from QueryConfig where solutionName='" + SolutionName + "'";
    if (type == 1)
        executeQueryConfig(qry);
    else
        execute(qry);

    dbDataRows = executeQry;
    var scrName = "";
    if (dbDataRows != null && dbDataRows.length > 0) {
        for (var i = 0; i < dbDataRows.length; i++) {
            //setgetString
            if (dbDataRows[i].QueryText != null && dbDataRows[i].QueryText != "") {
                getString["QueryConfig_" + dbDataRows[i].ScreenName + ""] = dbDataRows[i].QueryText.toString().trim(); //.toString().trim() newly addedby.M 10.01.2023
                getString["QueryConfig_" + dbDataRows[i].ScreenName + "_GroupText"] = dbDataRows[i].GroupText.toString().trim();
                getString["QueryConfig_" + dbDataRows[i].ScreenName + "_OrderText"] = dbDataRows[i].OrderText.toString().trim();
            }
        }
    }
    return true;
}



function setMessageConfig(language) {

    //var db = commonObj.dbConnectionObj.createDataBaseConnection();
    var qry = "", dbDataRows = '', screenName = '', message = {}, iIndex = 0;

    //  COMMONLog('Message Config Start : ' + new Date());
    // qry = 'SELECT * FROM MessageConfig where [Language] = ' + Ti.App.SQL.safeSQL(language) + ' order by ScreenName';
    qry = "SELECT * FROM MessageConfig  where solutionName='" + SolutionName + "'  order by ScreenName";

    //COMMONLog('MessageConfig Qry --> ' + qry);
    //  dbDataRows = Ti.App.dbConn.execute(qry);
    execute(qry);
 
    dbDataRows = executeQry;
    if (dbDataRows == null)
        return;
    if (dbDataRows.length > 0) {
        // while (dbDataRows.isValidRow()) {

        for (var i = 0; i < dbDataRows.length; i++) {
            message = {};
            message.screenName = dbDataRows[i].ScreenName;
            message.messageCode = dbDataRows[i].MenuCode;
            message.messageText = dbDataRows[i].MenuDisplayText;
            message.title = dbDataRows[i].Title;
            messageList[message.screenName + '_' + message.messageCode] = message;
            iIndex = iIndex + 1;
        }

    }
    qry = ""; qry = null;
    dbDataRows = null;
    message = {}; message = null;
}


function setColorConfig(language) {
    var qry = "";
    dbDataRows = "";
    qry = "SELECT * FROM ColorConfig  where solutionName='" + SolutionName + "' and ScreenName like '" + _screenName + "_%'   order by ScreenName, FieldName";
    //qry = "SELECT * FROM ColorConfig  where solutionName='" + SolutionName + "' and ScreenName='" + _screenName + "'   order by ScreenName, FieldName";
    //qry = "SELECT * FROM ColorConfig  where ScreenName='CategoryList'  order by ScreenName, FieldName";
    //  qry = "SELECT * FROM ColorConfig   order by ScreenName, FieldName";
    execute(qry);

    var iIndex = 0;
    var screenName = '';
    var arrObj = {};
    var arrColorConfigList = [];

    dbDataRows = executeQry;

    try {
        colorLegend = null;
    } catch (e) {

    }

    try {
        //var tmpColor = argbToRGB(dbDataRows[i].CForeColor);
        //colorLegend += '<td style="color:' + tmpColor + ';border-style:solid;">' + dbDataRows[i].Category + '</td>';
        colorLegend = executeQry;
    }
    catch {

    }

    if (dbDataRows != undefined && dbDataRows.length > 0) {
       
        for (var i = 0; i < dbDataRows.length; i++) {
            if (screenName != '' && screenName != '' + dbDataRows[i].ScreenName) {
               
                    // if (_screenName != '')
                    getList['ColorConfig_' + screenName] = arrColorConfigList;
                arrColorConfigList = [];
            }
            screenName = dbDataRows[i].ScreenName;
            arrObj = {};
            arrObj.ScreenName = screenName;
            arrObj.FieldName = dbDataRows[i].FieldName;
            arrObj.Condition = dbDataRows[i].Condition;
            arrObj.ConditionField = dbDataRows[i].ConditionField;
            arrObj.ConditionValue = dbDataRows[i].ConditionValue;
            arrObj.CForeColor = dbDataRows[i].CForeColor;
            arrObj.CBackColor = dbDataRows[i].CBackColor;

          

            if (dbDataRows[i].ConditionField == '') {
                arrObj.CBackColor = 'transparent';
            }
            try {
                arrObj.CRowColor = CheckDecimal(dbDataRows[i].RowColor);//COMMON
            } catch (e) {
                arrObj.CRowColor = 0;
            }
            arrColorConfigList.push(arrObj);
        }
    }
    if (screenName != '') 
       // if (_screenName != '')
        getList['ColorConfig_' + screenName] = arrColorConfigList;

    dbDataRows = null;
    qry = ""; qry = null;
    arrObj = {}; arrObj = null;
    arrColorConfigList = []; arrColorConfigList = null;
}

function setSystemTableConfig() {
    try {
        systemTableConfig = {};
        systemTableConfig['APPVERSION'] = '';
        systemTableConfig['NEWVERSIONURL'] = '';
        systemTableConfig['ALLOWWITHOUTSALES'] = '';
        systemTableConfig['SETCONFIGDATA'] = '0';
        //var db = commonObj.dbConnectionObj.createDataBaseConnection();
        // COMMONLog('System Start : ' + new Date());
        try {
            // dbDataRows = Ti.App.dbConn.execute('select * from SystemList');
            execute('select * from SystemList');
            dbDataRows = executeQry;
            if (dbDataRows.length > 0) {
                for (var i = 0; i < dbDataRows.length; i++) {
                    // systemTableConfig[dbDataRows.fieldByName('Code').toUpperCase()] = dbDataRows.fieldByName('SystemValue');
                    systemTableConfig[dbDataRows[i].Code.toUpperCase()] = dbDataRows[i].SystemValue;
                    //dbDataRows.next();
                }
            }
            //   dbDataRows.close();
        } catch (e) { }

        //execute('select * from System');
        executeFieldList('select * from System');
        dbDataRows = executeQry;
        //COMMONLog('dbDataRows.isValidRow() ---> ' + dbDataRows.length);
        if (dbDataRows.length > 0) {
            //var length = (bIsAndroid ? dbDataRows.fieldCount : dbDataRows.fieldCount());
            //if ((Ti.Platform.name === 'android') || (Ti.version >= '3.3.0')) {
            //    var length = dbDataRows.fieldCount;
            //} else {
            //var length = dbDataRows.fieldCount();
            //}
            var length = dbDataRows.length;

            for (var ctr = 0; ctr < length; ctr++) {
                // systemTableConfig[dbDataRows.fieldName(ctr).toUpperCase()] = dbDataRows.field(ctr);
                systemTableConfig[dbDataRows[ctr].FieldName.toUpperCase()] = dbDataRows[ctr].Field;
                if (dbDataRows[ctr].FieldName.toUpperCase() == "LANGUAGE")
                    sLanguage = dbDataRows[ctr].Field;
            }
            //sLanguage = dbDataRows[0].Language;
            sLanguage = (sLanguage == null || sLanguage == undefined || sLanguage == '') ? 'English' : sLanguage;
            sMCAddress = dbDataRows[0].MCAddress;
            //   Ti.App.sLanguage = dbDataRows.fieldByName("Language");
            //Ti.App.sLanguage = (Ti.App.sLanguage == null || Ti.App.sLanguage == undefined || Ti.App.sLanguage == '') ? 'English' : Ti.App.sLanguage;
            //Ti.App.sMCAddress = dbDataRows.fieldByName("MCAddress");

        }
        //  dbDataRows.close();


        try {
            ////commend by.M 27.06.2023 - pvmng varshini
            //execute('select * from DeviceSystemList');
            //dbDataRows = executeQry;
            ////  while (dbDataRows.isValidRow()) {
            //if (dbDataRows.length > 0) {
            //    for (var i = 0; i < dbDataRows.length; i++) {
            //        systemTableConfig[dbDataRows[i].Code.toUpperCase()] = dbDataRows[i].SystemValue;
            //        //  dbDataRows.next();
            //    }
            //}
            //// dbDataRows.close();

        } catch (e) { }

        //db.close();
        dbDataRows = null; //db = null;
        COMMONLog('System End : ' + new Date());
    } catch (e) { }
}

function getSystemValue(key) {
    systemTableConfig == null ? COMMONLog('System Table Field Requested -> ' + key.toUpperCase() + ' : ' + "") : COMMONLog('System Table Field Requested -> ' + key.toUpperCase() + ' : ' + systemTableConfig[key.toUpperCase()]);
    return systemTableConfig == null || systemTableConfig == "" ? "" : systemTableConfig[key.toUpperCase()];
}




function getMessageString(ScreenName, MessageCode) {
    var messageObj = {};
    messageObj.title = '';
    messageObj.messageText = '';
    var obj = null;
    try {
        if (MessageCode == undefined) {
            return;
        }
        var MessageString = MessageCode;
        var iPos = MessageCode.indexOf('<');
        var iEnd = -1;

        obj = messageList[ScreenName + '_' + MessageCode];
        var str = '';
        if (obj != undefined) {
            str = obj.messageText;
        } else {
            str = MessageCode;
        }
        str = str.replace("<BR>", '\r\n');

        //create by.M 07.06.2023 - pvmng - stock request approval
        // qry = formatQueryString(qry, sScreenName);//ScreenView
        str = formatQueryString(str, "");//ScreenView


        iPos = str.indexOf('<');
        iEnd = -1;
        var CmdStr = "";
        while (!(iPos == -1)) {
            iEnd = str.indexOf('>', iPos);
            if (iEnd == -1)
                break;
            // TODO: might not be correct. Was : Exit Do
            CmdStr = str.substr(iPos + 1, iEnd - iPos - 1);

            //replaceQuery(key, queryName);


            str = str.substr(0, iPos) + replaceQuery(CmdStr, ScreenName) + str.substr(iEnd + 1, str.length - iEnd);
            iPos = str.indexOf('<', iPos + 1);
        }
        MessageString = str;
        MessageString = MessageString.replace('\r\n', "<BR>").replace('\\r\\n', "<BR>").replace('\r\n', "<BR>");
        //iPos = MessageString.indexOf('<');
        //var iTagEnd = 0;
        //iEnd = -1;

        //while (!(iPos == -1)) {
        //    iTagEnd = MessageString.indexOf(' ', iPos);
        //    iEnd = MessageString.indexOf('>', iPos);
        //    if (iEnd == -1)
        //        break;
        //    // TODO: might not be correct. Was : Exit Do
        //    MessageString = MessageString.substr(0, iPos) + MessageString.substr(iTagEnd, iEnd - iTagEnd) + MessageString.substr(iEnd + 1, MessageString.length - iEnd);
        //    iPos = MessageString.indexOf('<', iPos + 1);
        //}
    } catch (e) {
        COMMONLog('Message String --> ' + e);
    }
    if (obj != undefined) {
        messageObj.title = obj.title;
        messageObj.messageText = MessageString;
    } else {
        messageObj.title = '';
        messageObj.messageText = MessageCode;
    }

    alertMsg = MessageString;

    return messageObj;
}

function getFormFieldNames() {
    return formFieldNames;
}

function getSelectedRowIndex() {
    return getSelectedRowIndex();//ScreenView
}

var executeQry = '';
function execute1(qry) {

    $.ajax({
        url: url_GetActionConfigData,
        //url: "/ActionConfig/GetActionConfigData",
        type: 'POST',
        dataType: 'json',
        async: false,
        data: { query: qry },
        success: function (results) {
            executeQry = results;
            return results;
        },
        error: function (results, q, a) {
            alert(results);
        }
    });

}


function execute(qry) {
    if (SolutionName == "")
        return;
    //var key = CryptoJS.enc.Utf8.parse('simplr8080808080');
    //var iv = CryptoJS.enc.Utf8.parse('simplr8080808080');
    qry = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(qry), encryptkey, { keySize: 128 / 8, iv: encryptiv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    var params = "{'query':'" + qry + "'}";

    $.ajax({
        type: "POST",
        url: url_GetActionConfigData,
        data: params,
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (results) {

            executeQry = results;
            return results;
        },
        error: function (results, q, a) {
            alert(results);
        }
    });

}


function getTableHeaderFieldNames() {
    return fieldNames;
}

function getColumnData(sectionIndex, rowIndex, fieldName, columnIndex, arrFields) {
    ///
    var index = arrFields.indexOf(fieldName);
    var field = formListItems[index];
    commonObj.fieldControl = field.fieldControl;
    if (commonObj.fieldControl == 'TEXTBOX' || fieldControl == 'EDITABLETEXTBOX' || commonObj.fieldControl == 'OPTION') {
        return $('#' + FieldName + rowIndex).closest('tr').find('#' + field.fieldName).val();
    } else if (commonObj.fieldControl == 'DATEPICKER' || commonObj.fieldControl == 'TIMEPICKER' || commonObj.fieldControl == 'COMBOBOX') {
        return $('#' + FieldName + rowIndex).closest('tr').find('#' + field.fieldName).val();
    }
    else
        return currentRowevent.currentTarget.cells[columnIndex].innerText;
    // var val = $('#' + FieldName + rowIndex).closest('tr').find('#' + field.fieldName).val();
    //  $("#table_" + FieldName).closest('tr').find('#Code').val();
    //return $("#table_" + FieldName).children().children()[rowIndex].children[columnIndex].innerHTML;
    ///

    //old code
    //LOG.debug('Arrayoperation - getColumnData : fieldName - ' + fieldName , ' AvailableMemory : ' + COMMON.availableMemoryInMB());
    COMMONLog('AAA --> ' + rowIndex + ' : ' + fieldName);
    fieldName = fieldName.toUpperCase();
    if (fieldNames.indexOf(fieldName) > -1 && rowIndex > -1) {
        commonObj.rows = Ti.App.currentTable.data[sectionIndex].rows;
        commonObj.fieldControl = commonObj.rows[rowIndex].children[0].children[fieldNames.indexOf(fieldName)].fieldControl;
        if (commonObj.fieldControl == 'TEXTBOX' || commonObj.fieldControl == 'EDITABLETEXTBOX' || commonObj.fieldControl == 'OPTION') {
            return commonObj.rows[rowIndex].children[0].children[fieldNames.indexOf(fieldName)].value;
        } else if (commonObj.fieldControl == 'DATEPICKER' || commonObj.fieldControl == 'TIMEPICKER' || commonObj.fieldControl == 'COMBOBOX') {
            return commonObj.rows[rowIndex].children[0].children[fieldNames.indexOf(fieldName)].code;
        }
        return commonObj.rows[rowIndex].children[0].children[fieldNames.indexOf(fieldName)].text;
    }
    return null;
}



function createComboBoxData(qry) {
    //commonObj.db1 = commonObj.dbConnectionObj.createDataBaseConnection();
    commonObj.dbDataRows1 = '', commonObj.List1 = [];
    COMMONLog('ComboBox Qry --> ' + qry);
    try {
        if (qry != undefined) {
            //commonObj.dbDataRows1 = Ti.App.dbConn.execute(qry);
            execute(qry);
            commonObj.dbDataRows1 = executeQry;
            ComboboDataObj = {};
            //  while (commonObj.dbDataRows1.isValidRow()) {
            if (commonObj.dbDataRows1.length > 0) {
                try {
                    for (var i = 0; i < commonObj.dbDataRows1.length; i++) {
                        ComboboDataObj = {};
                        ComboboDataObj.ComboBoxCode = commonObj.dbDataRows1[i].Code;
                        ComboboDataObj.displayText = commonObj.dbDataRows1[0].Text;
                        commonObj.List1.push(ComboboDataObj);
                    }
                    //ComboboDataObj = {};
                    //ComboboDataObj.ComboBoxCode = commonObj.dbDataRows1.fieldByName('code');
                    //ComboboDataObj.displayText = commonObj.dbDataRows1.fieldByName('text');
                    //commonObj.List1.push(ComboboDataObj);
                    COMMONLog('Combo displayText --> ' + ComboboDataObj.displayText + ' Code --> ' + ComboboDataObj.ComboBoxCode);
                } catch (e) { }
                //commonObj.dbDataRows1.next();
            }
            // commonObj.dbDataRows1.close();
            //commonObj.db1.close();
        }
    } catch (e) {
        commonObj.List1 = [];
    }
    return commonObj.List1;
}

function setListConfig(language) {
    //var db = commonObj.dbConnectionObj.createDataBaseConnection();
    //COMMONLog('List Config Start : ' + new Date());
    PageLoadinginfo('List Config Start : ');
    //dbDataRows = db.execute('SELECT * FROM ListConfig  where [Language] = ' + Ti.App.SQL.safeSQL(language) + ' order by ScreenName, DisplayNo;
    //dbDataRows = Ti.App.dbConn.execute('select ScreenName, HeaderHeight, HFont, HFontSize, HFontStyle, DisplayNo, FieldName, NewText, ColumnWidth, HBackColor, HForeColor, HBackColor, RForeColor, RBackColor, RFont, RFontSize, RFontStyle, Alignment, RowHeight, FieldControl, DataMember, DataMemberType, Header, LineIndex, Showborder, BorderColor from  ListConfig  where  DataMember <> "" and [Language] = ' + Ti.App.SQL.safeSQL(language) + ' order by ScreenName, DisplayNo;
    //var qry = "select ScreenName, HeaderHeight, HFont, HFontSize, HFontStyle, DisplayNo, FieldName, NewText, ColumnWidth, HBackColor, HForeColor, HBackColor, RForeColor, RBackColor, RFont, RFontSize, RFontStyle, Alignment, RowHeight, FieldControl, DataMember, DataMemberType, Header, LineIndex from  ListConfig  where  ScreenName like '%" + safeSQL(_screenName) + "%' and DataMember <> '' and [Language] = " + safeSQL(language) + " order by ScreenName, DisplayNo";
    var qry = "select ScreenName, HeaderHeight, HFont, HFontSize, HFontStyle, DisplayNo, FieldName, NewText, ColumnWidth, HBackColor, HForeColor, HBackColor, RForeColor, RBackColor, RFont, RFontSize, RFontStyle, Alignment, RowHeight, FieldControl, DataMember, DataMemberType, Header, LineIndex from  ListConfig  where  ScreenName like '%" + _screenName + "%' and DataMember <> '' and [Language] = " + safeSQL(language) + " order by ScreenName, DisplayNo";
    execute(qry);
    //execute("select ScreenName, HeaderHeight, HFont, HFontSize, HFontStyle, DisplayNo, FieldName, NewText, ColumnWidth, HBackColor, HForeColor, HBackColor, RForeColor, RBackColor, RFont, RFontSize, RFontStyle, Alignment, RowHeight, FieldControl, DataMember, DataMemberType, Header, LineIndex from  ListConfig  where  ScreenName='" + currentScreenName + "' and DataMember <> '' and [Language] = " + safeSQL(language) + " order by ScreenName, DisplayNo");

    //qry = "SELECT * FROM FormConfig where  ScreenName='" + currentScreenName + "' and Language = " + safeSQL(language) + " ORDER BY ScreenName, DisplayNo";
    //info('FormConfig Qry --> ' + qry);
    //info('Form Config Start : ' + new Date());
    PageLoadinginfo('List Config Qry --> ' + qry);

    dbDataRows = executeQry;
    //var iIndex = 0;
    var screenName = '', headerList = [], header = {}, totalWidth = 0;
    var arrTotalWidth = [], dLineIndex = 0;
    if (systemTableConfig == null)
        return;
    var dFontHeightRatio = systemTableConfig['FONTRATIO'];
    dFontHeightRatio = (dFontHeightRatio == null || dFontHeightRatio == undefined || dFontHeightRatio == '') ? 1 : dFontHeightRatio;
    COMMONLog('dFontHeightRatio --> LISTCONFIG : ' + dFontHeightRatio);
    if (dbDataRows != null && dbDataRows.length > 0) {
        for (var i = 0; i < dbDataRows.length; i++) {

            // while (dbDataRows.isValidRow()) {
            if (screenName != '' && screenName != '' + dbDataRows[i].ScreenName) {
                //setgetList
                //setgetInt
                getList['ListConfig_' + screenName] = headerList;
                getInt['TotalWidth_' + screenName] = totalWidth;
                //Titanium.App.Properties.setList('ListConfig_' + screenName, headerList);
                //Titanium.App.Properties.setInt('TotalWidth_' + screenName, totalWidth);
                headerList = [];
                totalWidth = 0;
            }
            screenName = dbDataRows[i].ScreenName;
            header = {};
            //header.headerHeight = (Titanium.Platform.displayCaps.density == 'high') ? parseInt(pHeight*0.065) : parseInt(pHeight*0.06);//dbDataRows[i].HeaderHeight;
            header.headerHeight = parseInt(dbDataRows[i].HeaderHeight * dHeightRatio);
            header.HFont = dbDataRows[i].HFont;
            //header.HFontSize = (Titanium.Platform.displayCaps.density == 'high') ? parseInt(pHeight*0.025) : parseInt(pHeight*0.02);//dbDataRows[i].HFontSize;
            //header.HFontSize = parseInt(dbDataRows[i].HFontSize') * Ti.App.dHeightRatio);
            header.HFontSize = parseInt(dbDataRows[i].HFontSize * dFontHeightRatio);
            header.HFontStyle = dbDataRows[i].HFontStyle;
            header.screenName = screenName;//dbDataRows[i].ScreenName;
            header.displayNo = dbDataRows[i].DisplayNo;
            header.fieldName = dbDataRows[i].FieldName;
            header.columnText = dbDataRows[i].NewText;
            header.columnWidth = dbDataRows[i].ColumnWidth;
            header.ActualColumnWidth = dbDataRows[i].ColumnWidth;
            header.LineIndex = dbDataRows[i].LineIndex;
            header.LineIndex = (header.LineIndex != null && header.LineIndex != undefined && header.LineIndex != "") ? header.LineIndex : 0;
            //LineIndex
            /* 0
             * 0
             * 0
             * 0
             * 1
             * 1
             *
            if(dbDataRows[i].LineIndex != dLineIndex){
                arrTotalWidth[dLineIndex] = totalWidth;
                dLineIndex = dbDataRows[i].LineIndex;
                totalWidth = header.columnWidth;
                //dLineIndex =
            }else{
                totalWidth += header.columnWidth;
                //dLineIndex =
            }
             
            if(dbDataRows[i].MultiLine == true){
                totalWidth = 100;   
            }else{
                totalWidth += header.columnWidth;//dbDataRows[i].ColumnWidth;
            }
            /******/
            if (header.LineIndex == 0 || header.LineIndex == 1) {
                totalWidth += header.columnWidth;
            }
            header.colnWidth = header.columnWidth;
            header.ColumnUnit = '%';//dbDataRows[i].ColumnUnit;
            header.bgColor = this.argbToRGB(dbDataRows[i].HBackColor);
            header.HForeColor = this.argbToRGB(dbDataRows[i].HForeColor);
            header.HBackColor = this.argbToRGB(dbDataRows[i].HBackColor);
            header.rowTextColor = this.argbToRGB(dbDataRows[i].RForeColor);
            header.rowBgColor = this.argbToRGB(dbDataRows[i].RBackColor);
            //header.bgColor = dbDataRows[i].HBackColorName;
            //header.HForeColor = dbDataRows[i].HForeColorName;
            //header.HBackColor = dbDataRows[i].HBackColorName;
            //header.rowTextColor = dbDataRows[i].RForeColorName;
            //header.rowBgColorName = dbDataRows[i].RBackColorName;
            //header.rowARForeColorName = dbDataRows[i].ARForeColorName;
            //header.rowARBackColorName = dbDataRows[i].ARBackColorName;
            header.fontName = dbDataRows[i].RFont;
            //header.fontSize =  (Titanium.Platform.displayCaps.density == 'high') ? parseInt(pHeight*0.025) : parseInt(pHeight*0.02);//dbDataRows[i].RFontSize;
            //header.fontSize =  parseInt(dbDataRows[i].RFontSize * Ti.App.dHeightRatio);
            header.fontSize = parseInt(dbDataRows[i].RFontSize * dFontHeightRatio);
            header.fontStyle = dbDataRows[i].RFontStyle;
            header.allignment = dbDataRows[i].Alignment;
            //header.rowHeight = (Titanium.Platform.displayCaps.density == 'high ? parseInt(pHeight*0.065) : parseInt(pHeight*0.06);//dbDataRows[i].RowHeight;
            header.rowHeight = parseInt(dbDataRows[i].RowHeight * dHeightRatio);
            header.fieldControl = ('' + dbDataRows[i].FieldControl).toUpperCase();
            //header.isSearch = dbDataRows[i].IsSearch;
            //header.searchType = dbDataRows[i].SearchType;
            header.DataMember = dbDataRows[i].DataMember;
            header.DataMemberType = dbDataRows[i].DataMemberType;
            header.Header = dbDataRows[i].Header;
            header.Header = (header.Header != null && header.Header != undefined && header.Header != "") ? header.Header : "";
            try {
                header.showBorder = CheckDecimal(dbDataRows[i].ShowBorder);//COMMON
            } catch (e) {
                header.showBorder = 0;
            }
            try {
                if (header.showBorder == 1) {
                    header.borderColor = this.argbToRGB(dbDataRows[i].BorderColor);
                    header.borderColor = (header.borderColor == null || header.borderColor == undefined || header.borderColor == '') ? '#3b3b3b' : header.borderColor;
                } else {
                    header.borderColor = 'transparent';
                }
            } catch (e) {
                header.borderColor = 'transparent';
            }
            headerList.push(header);
            headerList.totalWidth = 100;
            // dbDataRows.next();
        }
    }

    // dbDataRows.close();
    //db.close();
    if (screenName != '') {
        //Titanium.App.Properties.setInt('TotalWidth_' + screenName, totalWidth);
        //Titanium.App.Properties.setList('ListConfig_' + screenName, headerList);
        getInt['TotalWidth_' + screenName] = totalWidth;
        getList['ListConfig_' + screenName] = headerList;

    }
    //db = null;
    dbDataRows = null;
    headerList = []; headerList = null;
    header = {}; header = null;
    totalWidth = 0; totalWidth = null;
    arrTotalWidth = []; arrTotalWidth = null;
    dLineIndex = 0; dLineIndex = null;
    PageLoadinginfo('List Config End : ' + new Date());
    return true;
}


function setListConfigByScreenname(sScreenName) {
    stmpActiveScreenName = '';
    //var db = commonObj.dbConnectionObj.createDataBaseConnection();
    COMMONLog('List Config Start : ' + new Date());
    //dbDataRows = db.execute('SELECT * FROM ListConfig  where [Language] = ' + safeSQL(language) + ' order by ScreenName, DisplayNo;
    //dbDataRows = db.execute('select ScreenName, HeaderHeight, HFont, HFontSize, HFontStyle, DisplayNo, FieldName, NewText, ColumnWidth, HBackColor, HForeColor, HBackColor, RForeColor, RBackColor, RFont, RFontSize, RFontStyle, Alignment, RowHeight, FieldControl, DataMember, DataMemberType, Header, LineIndex, Showborder, BorderColor from  ListConfig  where  DataMember <> "" and [Language] = ' + safeSQL(language) + ' order by ScreenName, DisplayNo;
    var language = 'English';//sLanguage;//'English';

    //var qry = this.getQueryConfigByScreenNameWithOrderText(sScreenName+'_USER_ListConfig;
    COMMONLog("SELECT FieldName, DefaultText, NewText, ColumnWidth, Alignment, HForeColor, HBackColor, RForeColor, RBackColor, ARForeColor, ARBackColor, HFont, HFontSize, HFontStyle, RFont, RFontSize, RFontStyle, DisplayNo, ScreenName, DataMember, HeaderHeight, RowHeight, GridBackColorName, GridBackColor, ScrollBarWidth, Language, IsSearch, SearchType, SearchControl, FieldControl, DataMemberType, ParentName, Header, LineIndex, BorderColor, ShowBorder FROM ListConfig WHERE [Language] = " + safeSQL(language) + " and Screenname like " + safeSQL(sScreenName) + " UNION SELECT CustDepartment.DeptCode as FieldName, DefaultText, CustDepartment.DeptName as NewText, ColumnWidth, Alignment, HForeColor, HBackColor, RForeColor, RBackColor, ARForeColor, ARBackColor, HFont, HFontSize, HFontStyle, RFont, RFontSize, RFontStyle, DisplayNo+1, " + safeSQL(sScreenName) + ", CustDepartment.DeptCode as DataMember, HeaderHeight, RowHeight, GridBackColorName, GridBackColor, ScrollBarWidth, Language, IsSearch, SearchType, SearchControl, 'EDITABLETEXTBOX' as FieldControl, DataMemberType, " + safeSQL(sScreenName) + ", Header, LineIndex, BorderColor, ShowBorder FROM CustDepartment, ListConfig  WHERE [Language] = " + safeSQL(language) + " and Screenname like 'ProposeOrder-Dept' and FieldName = 'Qty' Order by DIsplayNo");
    /*
    if(sScreenName == 'Propose Summary'){
        dbDataRows = db.execute("SELECT FieldName, DefaultText, NewText, ColumnWidth, Alignment, HForeColor, HBackColor, RForeColor, RBackColor, ARForeColor, ARBackColor, HFont, HFontSize, HFontStyle, RFont, RFontSize, RFontStyle, DisplayNo, ScreenName, DataMember, HeaderHeight, RowHeight, GridBackColorName, GridBackColor, ScrollBarWidth, Language, IsSearch, SearchType, SearchControl, FieldControl, DataMemberType, ParentName, Header, LineIndex, BorderColor, ShowBorder FROM ListConfig WHERE [Language] = " + safeSQL(language) + " and Screenname like '"+sScreenName+"_FORM%' UNION SELECT CustDepartment.DeptCode as FieldName, DefaultText, CustDepartment.DeptName as NewText, ColumnWidth, Alignment, HForeColor, HBackColor, RForeColor, RBackColor, ARForeColor, ARBackColor, HFont, HFontSize, HFontStyle, RFont, RFontSize, RFontStyle, DisplayNo+1, 'Propose Summary_FORM_LISTVIEW_SalesItelList', CustDepartment.DeptCode as DataMember, HeaderHeight, RowHeight, GridBackColorName, GridBackColor, ScrollBarWidth, Language, IsSearch, SearchType, SearchControl, 'EDITABLETEXTBOX' as FieldControl, DataMemberType, screenname, Header, LineIndex, BorderColor, ShowBorder FROM CustDepartment, ListConfig  WHERE [Language] = " + safeSQL(language) + " and Screenname like '"+sScreenName+"_dept' and FieldName = 'Qty' Order by DIsplayNo");   
        //dbDataRows = db.execute("SELECT FieldName, DefaultText, NewText, ColumnWidth, Alignment, HForeColor, HBackColor, RForeColor, RBackColor, ARForeColor, ARBackColor, HFont, HFontSize, HFontStyle, RFont, RFontSize, RFontStyle, DisplayNo, ScreenName, DataMember, HeaderHeight, RowHeight, GridBackColorName, GridBackColor, ScrollBarWidth, Language, IsSearch, SearchType, SearchControl, FieldControl, DataMemberType, ParentName, Header, LineIndex, BorderColor, ShowBorder FROM ListConfig WHERE [Language] = " + safeSQL(language) + " and Screenname like '"+sScreenName+"_FORM%' ");  
    }else{
        dbDataRows = db.execute("SELECT FieldName, DefaultText, NewText, ColumnWidth, Alignment, HForeColor, HBackColor, RForeColor, RBackColor, ARForeColor, ARBackColor, HFont, HFontSize, HFontStyle, RFont, RFontSize, RFontStyle, DisplayNo, ScreenName, DataMember, HeaderHeight, RowHeight, GridBackColorName, GridBackColor, ScrollBarWidth, Language, IsSearch, SearchType, SearchControl, FieldControl, DataMemberType, ParentName, Header, LineIndex, BorderColor, ShowBorder FROM ListConfig WHERE [Language] = " + safeSQL(language) + " and Screenname like " + safeSQL(sScreenName) + " UNION SELECT CustDepartment.DeptCode as FieldName, DefaultText, CustDepartment.DeptName as NewText, ColumnWidth, Alignment, HForeColor, HBackColor, RForeColor, RBackColor, ARForeColor, ARBackColor, HFont, HFontSize, HFontStyle, RFont, RFontSize, RFontStyle, DisplayNo+1, " + safeSQL(sScreenName) + ", CustDepartment.DeptCode as DataMember, HeaderHeight, RowHeight, GridBackColorName, GridBackColor, ScrollBarWidth, Language, IsSearch, SearchType, SearchControl, 'EDITABLETEXTBOX' as FieldControl, DataMemberType, " + safeSQL(sScreenName) + ", Header, LineIndex, BorderColor, ShowBorder FROM CustDepartment, ListConfig  WHERE [Language] = " + safeSQL(language) + " and Screenname like '"+sScreenName+"-Dept' and FieldName = 'Qty' Order by DIsplayNo");
        //dbDataRows = db.execute("SELECT FieldName, DefaultText, NewText, ColumnWidth, Alignment, HForeColor, HBackColor, RForeColor, RBackColor, ARForeColor, ARBackColor, HFont, HFontSize, HFontStyle, RFont, RFontSize, RFontStyle, DisplayNo, ScreenName, DataMember, HeaderHeight, RowHeight, GridBackColorName, GridBackColor, ScrollBarWidth, Language, IsSearch, SearchType, SearchControl, FieldControl, DataMemberType, ParentName, Header, LineIndex, BorderColor, ShowBorder FROM ListConfig WHERE [Language] = " + safeSQL(language) + " and Screenname like '"+sScreenName+"%' UNION SELECT CustDepartment.DeptCode as FieldName, DefaultText, CustDepartment.DeptName as NewText, ColumnWidth, Alignment, HForeColor, HBackColor, RForeColor, RBackColor, ARForeColor, ARBackColor, HFont, HFontSize, HFontStyle, RFont, RFontSize, RFontStyle, DisplayNo+1, " + safeSQL(sScreenName) + ", CustDepartment.DeptCode as DataMember, HeaderHeight, RowHeight, GridBackColorName, GridBackColor, ScrollBarWidth, Language, IsSearch, SearchType, SearchControl, 'EDITABLETEXTBOX' as FieldControl, DataMemberType, " + safeSQL(sScreenName) + ", Header, LineIndex, BorderColor, ShowBorder FROM CustDepartment, ListConfig  WHERE [Language] = " + safeSQL(language) + " and Screenname like '"+sScreenName+"-Dept' and FieldName = 'Qty' Order by DIsplayNo");
    }*/
    execute("SELECT FieldName, DefaultText, NewText, ColumnWidth, Alignment, HForeColor, HBackColor, RForeColor, RBackColor, ARForeColor, ARBackColor, HFont, HFontSize, HFontStyle, RFont, RFontSize, RFontStyle, DisplayNo, ScreenName, DataMember, HeaderHeight, RowHeight, GridBackColorName, GridBackColor, ScrollBarWidth, Language, IsSearch, SearchType, SearchControl, FieldControl, DataMemberType, ParentName, Header, LineIndex, BorderColor, ShowBorder FROM ListConfig WHERE [Language] = " + safeSQL(language) + " and Screenname like " + safeSQL(sScreenName) + " UNION SELECT CustDepartment.DeptCode as FieldName, DefaultText, CustDepartment.DeptName as NewText, ColumnWidth, Alignment, HForeColor, HBackColor, RForeColor, RBackColor, ARForeColor, ARBackColor, HFont, HFontSize, HFontStyle, RFont, RFontSize, RFontStyle, DisplayNo+1, " + safeSQL(sScreenName) + ", CustDepartment.DeptCode as DataMember, HeaderHeight, RowHeight, GridBackColorName, GridBackColor, ScrollBarWidth, Language, IsSearch, SearchType, SearchControl, 'EDITABLETEXTBOX' as FieldControl, DataMemberType, " + safeSQL(sScreenName) + ", Header, LineIndex, BorderColor, ShowBorder FROM CustDepartment, ListConfig  WHERE [Language] = " + safeSQL(language) + " and Screenname like '" + sScreenName + "-Dept' and FieldName = 'Qty' Order by DIsplayNo");
    dbDataRows = executeQry;
    //var iIndex = 0;
    var screenName = '', headerList = [], header = {}, totalWidth = 0;
    var arrTotalWidth = [], dLineIndex = 0;
    var dFontHeightRatio = systemTableConfig['FONTRATIO'];
    dFontHeightRatio = (dFontHeightRatio == null || dFontHeightRatio == undefined || dFontHeightRatio == '') ? 1 : dFontHeightRatio;
    COMMONLog('dFontHeightRatio --> LISTCONFIG : ' + dFontHeightRatio);
    //    while (dbDataRows.isValidRow()) {
    if (dbDataRows.length > 0) {
        for (var i = 0; i < dbDataRows.length; i++) {


            if (screenName != '' && screenName != '' + dbDataRows[i].ScreenName) {
                setList['ListConfig_' + screenName] = headerList;
                setInt['TotalWidth_' + screenName] = totalWidth;
                //Titanium.App.Properties.setList('ListConfig_' + screenName, headerList);
                //Titanium.App.Properties.setInt('TotalWidth_' + screenName, totalWidth);
                headerList = [];
                totalWidth = 0;
            }
            screenName = dbDataRows[i].ScreenName;
            header = {};
            //header.headerHeight = (Titanium.Platform.displayCaps.density == 'high') ? parseInt(pHeight*0.065) : parseInt(pHeight*0.06);//dbDataRows[i].HeaderHeight;
            header.headerHeight = parseInt(dbDataRows[i].HeaderHeight * dHeightRatio);
            header.HFont = dbDataRows[i].HFont;
            //header.HFontSize = (Titanium.Platform.displayCaps.density == 'high') ? parseInt(pHeight*0.025) : parseInt(pHeight*0.02);//dbDataRows[i].HFontSize;
            //header.HFontSize = parseInt(dbDataRows[i].HFontSize') * dHeightRatio);
            header.HFontSize = parseInt(dbDataRows[i].HFontSize * dFontHeightRatio);
            header.HFontStyle = dbDataRows[i].HFontStyle;
            header.screenName = screenName;//dbDataRows[i].ScreenName;
            header.displayNo = dbDataRows[i].DisplayNo;
            header.fieldName = dbDataRows[i].FieldName;
            header.columnText = dbDataRows[i].NewText;
            header.columnWidth = dbDataRows[i].ColumnWidth;
            header.ActualColumnWidth = dbDataRows[i].ColumnWidth;
            header.LineIndex = dbDataRows[i].LineIndex;
            header.LineIndex = (header.LineIndex != null && header.LineIndex != undefined && header.LineIndex != "") ? header.LineIndex : 0;
            //LineIndex
            /* 0
             * 0
             * 0
             * 0
             * 1
             * 1
             *
            if(dbDataRows[i].LineIndex') != dLineIndex){
                arrTotalWidth[dLineIndex] = totalWidth;
                dLineIndex = dbDataRows[i].LineIndex;
                totalWidth = header.columnWidth;
                //dLineIndex =
            }else{
                totalWidth += header.columnWidth;
                //dLineIndex =
            }
             
            if(dbDataRows[i].MultiLine') == true){
                totalWidth = 100;   
            }else{
                totalWidth += header.columnWidth;//dbDataRows[i].ColumnWidth;
            }
            /******/
            if (header.LineIndex == 0 || header.LineIndex == 1) {
                totalWidth += header.columnWidth;
            }
            header.colnWidth = header.columnWidth;
            header.ColumnUnit = '%';//dbDataRows[i].ColumnUnit;
            header.bgColor = this.argbToRGB(dbDataRows[i].HBackColor);
            header.HForeColor = this.argbToRGB(dbDataRows[i].HForeColor);
            header.HBackColor = this.argbToRGB(dbDataRows[i].HBackColor);
            header.rowTextColor = this.argbToRGB(dbDataRows[i].RForeColor);
            header.rowBgColor = this.argbToRGB(dbDataRows[i].RBackColor);
            //header.bgColor = dbDataRows[i].HBackColorName;
            //header.HForeColor = dbDataRows[i].HForeColorName;
            //header.HBackColor = dbDataRows[i].HBackColorName;
            //header.rowTextColor = dbDataRows[i].RForeColorName;
            //header.rowBgColorName = dbDataRows[i].RBackColorName;
            //header.rowARForeColorName = dbDataRows[i].ARForeColorName;
            //header.rowARBackColorName = dbDataRows[i].ARBackColorName;
            header.fontName = dbDataRows[i].RFont;
            //header.fontSize =  (Titanium.Platform.displayCaps.density == 'high') ? parseInt(pHeight*0.025) : parseInt(pHeight*0.02);//dbDataRows[i].RFontSize;
            //header.fontSize =  parseInt(dbDataRows[i].RFontSize * dHeightRatio);
            header.fontSize = parseInt(dbDataRows[i].RFontSize * dFontHeightRatio);
            header.fontStyle = dbDataRows[i].RFontStyle;
            header.allignment = dbDataRows[i].Alignment;
            //header.rowHeight = (Titanium.Platform.displayCaps.density == 'high') ? parseInt(pHeight*0.065) : parseInt(pHeight*0.06);//dbDataRows[i].RowHeight;
            header.rowHeight = parseInt(dbDataRows[i].RowHeight * dHeightRatio);
            header.fieldControl = ('' + dbDataRows[i].FieldControl).toUpperCase();
            //header.isSearch = dbDataRows[i].IsSearch;
            //header.searchType = dbDataRows[i].SearchType;
            header.DataMember = dbDataRows[i].DataMember;
            header.DataMemberType = dbDataRows[i].DataMemberType;
            header.Header = dbDataRows[i].Header;
            header.Header = (header.Header != null && header.Header != undefined && header.Header != "") ? header.Header : "";
            try {
                header.showBorder = COMMON.CheckDecimal(dbDataRows[i].ShowBorder);
            } catch (e) {
                header.showBorder = 0;
            }
            try {
                if (header.showBorder == 1) {
                    header.borderColor = this.argbToRGB(dbDataRows[i].BorderColor);
                    header.borderColor = (header.borderColor == null || header.borderColor == undefined || header.borderColor == '') ? '#3b3b3b' : header.borderColor;
                } else {
                    header.borderColor = 'transparent';
                }
            } catch (e) {
                header.borderColor = 'transparent';
            }
            headerList.push(header);
            headerList.totalWidth = 100;
            // dbDataRows.next();
        }
    }
    //dbDataRows.close();
    //db.close();
    if (screenName != '') {
        getInt['TotalWidth_' + screenName] = totalWidth;
        getList['ListConfig_' + screenName] = headerList;
    }
    COMMONLog('List Config End : ' + new Date());
    //db = null;
    dbDataRows = null;
    headerList = []; headerList = null;
    header = {}; header = null;
    totalWidth = 0; totalWidth = null;
    arrTotalWidth = []; arrTotalWidth = null;
    dLineIndex = 0; dLineIndex = null;
    return true;
}


function setFormConfigFieldNames(screenName) {
    formFieldNames = []; formDataMember = [];
    commonObj.data = getFormConfigByScreenName(screenName);
    if (commonObj.data == undefined && commonObj.data == null) {
        return;
    }
    commonObj.length = commonObj.data.length;
    var formdata = {};
    for (var abc = 0; abc < commonObj.length; abc++) {
        formdata = {};
        formdata = commonObj.data[abc];
        formFieldNames.push(formdata.fieldName.toUpperCase());
        formDataMember.push(formdata.DataMember.toUpperCase());
    }
    commonObj.length = null; commonObj.data = null;
    delete commonObj.length; delete commonObj.data;
}

function getFormConfigByScreenName(screenName) {
    //return Titanium.App.Properties.getList('FormConfig_' + screenName);
    return getList['FormConfig_' + screenName];
}


function createUI(screenName, iIndex, item) { //7051 - 5187 : TOTAL LINE - 1864
    //LOG.debug('Arrayoperation - CreateUI START ' + screenName , + ' - Index : ' + iIndex + ' AvailableMemory : ' + COMMON.availableMemoryInMB());
    COMMONLog('LoadData CreateUI Start Time1 : ' + new Date().getTime() + ' - iIndex : ' + iIndex);
    COMMONLog('LoadData CreateUI stmpActiveScreenName : ' + stmpActiveScreenName + ' - screenName : ' + screenName);
    if (HeaderDetails == null || HeaderDetails == undefined) {
        return;
    }
    if (commonObj.DateFormatString == null || commonObj.DateFormatString == undefined || commonObj.DateFormatString == '') {
        commonObj.DateFormatString = systemTableConfig['DATEFORMATSTRING'];
        commonObj.DateTimeFormatString = systemTableConfig['DATETIMEFORMATSTRING'];
        commonObj.TimeFormatString = systemTableConfig['TIMEFORMATSTRING'];
        commonObj.QtyRoundingDigits = systemTableConfig['QTYROUNDINGDIGITS'];
        commonObj.AmountRoundingDigits = systemTableConfig['AMOUNTROUNDINGDIGITS'];
        commonObj.PriceRoundingDigits = systemTableConfig['PRICEROUNDINGDIGITS'];
        commonObj.Currency = systemTableConfig['CURRENCY'];
    }
    if (stmpActiveScreenName != screenName) {
        stmpActiveScreenName = screenName;
        bColorConfig = this.IsColorConfig(screenName);
        headerListLength = Titanium.App.Properties.getInt('TotalWidth_' + screenName);
        headerTotalLength = parseInt(this.getListWidth(screenName));
        widthRatio = (headerListLength / ((100 / (Ti.App.DeviceWidth * 0.94)) * headerTotalLength));
        dMaxRowHeight = 0;
        sColorCondFieldArr = [];
        if (bColorConfig == true) {
            try {
                sCondArr = [];
                sCondArr = Titanium.App.Properties.getList('ColorConfig_' + screenName);
                if (sCondArr == null || sCondArr == undefined || sCondArr == '') {
                    sCondArr = [];
                }
                if (sCondArr.length > 0) {
                    for (var condCtr = 0; condCtr < sCondArr.length; condCtr++) {
                        tmpFieldVal = sCondArr[condCtr].FieldName;
                        sColorCondFieldArr.push(tmpFieldVal.toUpperCase());
                    }
                }
                sCondArr = [];
            } catch (e) { }
        }
        HeaderDetailsObj = {};
        for (var ctr = 0; ctr < HeaderDetails.length; ctr++) {
            HeaderDetailsObj = {};
            HeaderDetailsObj = HeaderDetails[ctr];
            if (dLineIndex != HeaderDetailsObj.LineIndex) {
                dLineIndex = HeaderDetailsObj.LineIndex;
                rowHeight = HeaderDetailsObj.rowHeight;
                dMaxRowHeight = dMaxRowHeight + rowHeight;
            }
            if (rowHeight < HeaderDetailsObj.rowHeight && HeaderDetailsObj.name != 'IMAGE' && HeaderDetailsObj.name != 'MULTILINE') {
                rowHeight = HeaderDetailsObj.rowHeight;
                dMaxRowHeight = dMaxRowHeight + rowHeight;
            }
            dMaxRowHeight = (dMaxRowHeight == 0) ? HeaderDetailsObj.rowHeight : dMaxRowHeight;
            sCreateUIRowBgColor = HeaderDetailsObj.rowBgColor;
        }
        sCreateUIRowBgColor = (sCreateUIRowBgColor == null || sCreateUIRowBgColor == undefined || sCreateUIRowBgColor == '') ? 'transparent' : sCreateUIRowBgColor;
        sBorderColor = Ti.App.listBorderColor;//'#000080';//'#616161';//'#b0b0b0';
        try {
            if (screenName.indexOf('Merchandising-') > -1) {
                bRowComponentBorder = false;
                bRowComponentBorder = 'transparent';
                sBorderColor = 'transparent';//'#1f1f1f';//'black';
            }
        } catch (e) { }
    }
    //var vwRowHorizontal = Ti.App.BasicViewObj.createBasicView(null, 'transparent', dMaxRowHeight, '100%', 0, 0, null, null, 'absolute');
    vwRowHorizontal = Ti.App.BasicViewObj.createBasicView(null, 'transparent', dMaxRowHeight, '100%', 0, 0, null, null, 'absolute');
    vwRowHorizontal.backgroundSelectedColor = Ti.App.sRowHighlightColor;//'#8a0000';//'#F6921E';
    vwRowHorizontal.borderColor = sBorderColor;//sListBorderColor;//'#3333ff';//'#616161';//'#fff';
    vwRowHorizontal.borderWidth = 1;
    //var row = new BasicRow().createBasicRow(iIndex, title, false);
    row = new BasicRow().createBasicRow(iIndex, title, false);
    row.screenName = screenName;
    row.dRowHeight = dMaxRowHeight;
    row.height = dMaxRowHeight;
    row.backgroundColor = sCreateUIRowBgColor;
    rowHeight = 0; sRow_BG_Color = 'transparent';
    fieldNames = []; comboData = [];
    dColorConfigRowIndex = iIndex; dColorConfigRow = row;
    sKeyType = 'NUMBER'; dLeftPos = 0; dLineIndex = 0; dTopPos = 0;
    dataMemberType = ''; dataValue = ''; mFieldControl = {};
    commonObj.tblColumnWidth = 1;
    HeaderDetailsObj = {};
    for (var ctr = 0; ctr < HeaderDetails.length; ctr++) {
        HeaderDetailsObj = {};
        HeaderDetailsObj = HeaderDetails[ctr];
        if (dLineIndex != HeaderDetailsObj.LineIndex) {
            dTopPos = dTopPos + rowHeight;
            dLeftPos = 0;
        }
        rowHeight = HeaderDetailsObj.rowHeight;
        dLineIndex = HeaderDetailsObj.LineIndex;
        if (dLineIndex > 0) {
            headerTotalLength = 100;
            headerListLength = 100;
        }
        dTopPos = (dLineIndex - 1 <= 0) ? 0 : dTopPos;
        row.dLineIndex = dLineIndex;
        bRowComponentBorder = (HeaderDetailsObj.showBorder == 1 || HeaderDetailsObj.showBorder == '1') ? true : false;
        sBorderColor = HeaderDetailsObj.borderColor;
        COMMONLog('bRowComponentBorder -> ' + bRowComponentBorder);
        COMMONLog('sBorderColor -> ' + sBorderColor);
        try {
            fieldNames.push(HeaderDetailsObj.DataMember.toUpperCase());
            dataMemberType = HeaderDetailsObj.DataMemberType;
            dataValue = '';
            try {
                if (dataMemberType != 'STRING') {
                    COMMONLog('****** dataMemberType --> ' + dataMemberType);
                    if (dataMemberType == 'DATE') {
                        dataValue = Ti.App.DATEFORMAT.formatDate(item.fieldByName(HeaderDetailsObj.DataMember), commonObj.DateFormatString);
                    } else if (dataMemberType == 'DATETIME') {
                        dataValue = Ti.App.DATEFORMAT.formatDate(item.fieldByName(HeaderDetailsObj.DataMember), commonObj.DateTimeFormatString);
                    } else if (dataMemberType == 'TIME') {
                        dataValue = Ti.App.DATEFORMAT.formatDate(item.fieldByName(HeaderDetailsObj.DataMember), commonObj.TimeFormatString);
                    } else if (dataMemberType == 'QTYDESC') {
                        if (HeaderDetailsObj.columnWidth != 0 && HeaderDetailsObj.columnWidth != '0' && HeaderDetailsObj.columnWidth != '') {
                            var sDataMember = HeaderDetailsObj.DataMember;//ItemId$$InvnQty
                            sDataMember = sDataMember.split("$$");
                            if (sDataMember.length > 0) {
                                dataValue = COMMONMODEL.getUOMDescription(item.fieldByName(sDataMember[0]), item.fieldByName(sDataMember[1]), commonObj.QtyRoundingDigits);
                            }
                        }
                    } else if (dataMemberType == 'CURRENCY') {
                        try {
                            dataValue = commonObj.Currency + ' ' + Ti.App.NUMBER.roundNumber(item.fieldByName(HeaderDetailsObj.DataMember), 2);
                        } catch (e) { }
                    } else if (dataMemberType == 'AMOUNTFORMAT') {
                        try {
                            dataValue = Ti.App.NUMBER.roundNumber(item.fieldByName(HeaderDetailsObj.DataMember), commonObj.AmountRoundingDigits);
                        } catch (e) { }
                    } else if (dataMemberType == 'PRICEFORMAT') {
                        try {
                            dataValue = Ti.App.NUMBER.roundNumber(item.fieldByName(HeaderDetailsObj.DataMember), commonObj.PriceRoundingDigits);
                        } catch (e) { }
                    } else if (dataMemberType == 'QTYFORMAT') {
                        try {
                            dataValue = Ti.App.NUMBER.roundNumber(item.fieldByName(HeaderDetailsObj.DataMember), commonObj.QtyRoundingDigits);
                        } catch (e) { }
                    } else if (dataMemberType == 'NUMBERFORMAT' || dataMemberType == 'AMOUNTNUMBERFORMAT') {
                        try {
                            var sCurrencyCode = commonObj.Currency + " ";
                            if (dataMemberType == 'AMOUNTNUMBERFORMAT') {
                                sCurrencyCode = "";
                            }
                            var _strValue = item.fieldByName(HeaderDetailsObj.DataMember);
                            _strValue = (_strValue == null || _strValue == undefined || _strValue == '') ? 0 : _strValue;
                            if (_strValue == 0) {
                                dataValue = _strValue;
                            } else {
                                _strValue = _strValue.toString();
                                if (_strValue.indexOf('/') > -1 || _strValue.indexOf(' / ') > -1) {
                                    var _dataVal = "", _tmpDataVal = "";
                                    var arr = (_strValue.indexOf('/') > -1) ? _strValue.split("/") : _strValue.split(" / ");
                                    if (arr.length > 0) {
                                        for (var i = 0; i < arr.length; i++) {
                                            COMMONLog('1. arr[' + i + '] ---> ' + arr[i]);
                                            _tmpDataVal = Ti.App.NUMBER.roundNumber(arr[i], commonObj.AmountRoundingDigits);
                                            _tmpDataVal = _tmpDataVal.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
                                            _dataVal = (i == 0) ? (sCurrencyCode + _tmpDataVal) : (_dataVal + " / " + sCurrencyCode + _tmpDataVal);
                                        }
                                    }
                                    dataValue = _dataVal;
                                } else {
                                    dataValue = Ti.App.NUMBER.roundNumber(_strValue, commonObj.AmountRoundingDigits);//2);
                                    dataValue = dataValue.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
                                    dataValue = sCurrencyCode + dataValue;
                                }
                            }
                        } catch (e) { }
                    } else {
                        try {
                            dataValue = item.fieldByName(HeaderDetailsObj.DataMember);
                        } catch (e) {
                            if (item[HeaderDetailsObj.DataMember] != undefined && item[HeaderDetailsObj.DataMember] != null) {
                                dataValue = item[HeaderDetailsObj.DataMember];
                            }
                        }
                    }
                } else {
                    try {
                        dataValue = item.fieldByName(HeaderDetailsObj.DataMember);
                    } catch (e) {
                        if (item[HeaderDetailsObj.DataMember] != undefined && item[HeaderDetailsObj.DataMember] != null) {
                            dataValue = item[HeaderDetailsObj.DataMember];
                        }
                    }
                }
            } catch (e) {
                if (item[HeaderDetailsObj.DataMember] != undefined && item[HeaderDetailsObj.DataMember] != null) {
                    dataValue = item[HeaderDetailsObj.DataMember];
                }
            }
            mFieldControl = {};
            mFieldControl.resetColumnWidth = false;
            //arrFieldControlObj = [], bEnabledarrFieldCtrlObj = false
            if (bEnabledarrFieldCtrlObj == false) {
                mFieldControl.name = HeaderDetailsObj.fieldControl;
                mFieldControl.isEditable = (mFieldControl.name == 'EDITABLETEXTBOX') ? false : true;
                COMMONLog('FieldControl BEFORE Change Field Name --> ' + mFieldControl.name + ' mFieldControl.isEditable --> ' + mFieldControl.isEditable);
                try {
                    mFieldControl.keyType = 'NUMBER';
                    mFieldControl.resetColumnWidth = false;
                    mFieldControl = mController.fieldControlHandler(HeaderDetailsObj.DataMember.toUpperCase(), mFieldControl);
                    COMMONLog('FieldControl AFTER Change Field Name --> ' + mFieldControl.name + ' mFieldControl.isEditable --> ' + mFieldControl.isEditable);
                } catch (e) { }
                COMMONLog('********************************** mFieldControl.name --> ' + mFieldControl.name);
                try {
                    mFieldControl = mController.fieldControlHandlerWithResultSet(item, HeaderDetailsObj.DataMember.toUpperCase(), mFieldControl);
                } catch (e) { }
                arrFieldControlObj.push(mFieldControl);
            } else {
                mFieldControl = arrFieldControlObj[ctr];
            }
            if (mFieldControl.resetColumnWidth == true) {
                HeaderDetailsObj.columnWidth = 0;
            } else {
                HeaderDetailsObj.columnWidth = HeaderDetailsObj.ActualColumnWidth;
            }
            sRow_BG_Color = 'transparent';//HeaderDetailsObj.rowBgColor
            commonObj.tblColumnWidth = (HeaderDetailsObj.columnWidth * widthRatio * 100 / headerListLength);
            if (mFieldControl.name == 'LABEL' || mFieldControl.name == 'Label') {//Label
                var label = commonObj.BasicLabelObj.createLabel(dataValue, commonObj.tblColumnWidth + '%', rowHeight, HeaderDetailsObj.fontSize, HeaderDetailsObj.HFont, HeaderDetailsObj.fontStyle, HeaderDetailsObj.rowTextColor, sRow_BG_Color, HeaderDetailsObj.allignment, 0);
                label.text = dataValue;
                label.backgroundPaddingLeft = 30;
                label.backgroundPaddingRight = 30;
                label.touchEnabled = false;
                label.horizontalWrap = true;
                label.wordWrap = true;
                label.verticalAlign = Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER;
                label.left = dLeftPos + '%';
                label.top = dTopPos;
                //label.backgroundColor = sRow_BG_Color;//'transparent';
                label.fieldControl = mFieldControl.name;
                label.rowIndex = iIndex;
                label.iIndex = iIndex;
                label.DataMember = HeaderDetailsObj.DataMember.toUpperCase();
                label.DataMemberType = HeaderDetailsObj.DataMemberType.toUpperCase();
                label.dActualHeight = 'auto';
                label.dLineIndex = dLineIndex;
                label.DataMemberType = dataMemberType;
                label.columnWidth = HeaderDetailsObj.columnWidth;
                label.paddingLeft = 10;
                label.paddingRight = 10;
                if (bRowComponentBorder == true) {
                    label.borderColor = sBorderColor;
                    label.borderWidth = 1;
                }
                try {
                    label.actVal = item.fieldByName(HeaderDetailsObj.DataMember);
                } catch (e) {
                    label.actVal = dataValue;
                }
                //if(bColorConfig == true){
                if (bColorConfig == true && sColorCondFieldArr.indexOf(label.DataMember) > -1) {
                    label.backgroundColor = this.getColorConfig(screenName, label.DataMember, dataValue, item);
                }
                if (screenName.indexOf('LISTVIEW') < 0) {
                    label.color = Ti.App.listForeColor;//'#000080';//'#e8e8e8';
                }
                /*
                COMMONLog('screenName : ' + screenName);
                
                if(screenName == "Stock Take"){
                    label.touchEnabled = true;
                    label.addEventListener('click', function(e) {
                        Ti.App.columnClicked = e.source.DataMember;
                        try{
                            mController.tblRowLabelPressed(this, e.source.DataMember, e.source.iIndex);
                        }catch(e){}
                        
                    });
                }
                */
                vwRowHorizontal.add(label);
                /*label.addEventListener('click', function(e) {
                    Ti.App.columnClicked = e.source.DataMember;
                });
                label.addEventListener('longpress', function(e) {
                    Ti.App.columnClicked = e.source.DataMember;
                });
                label.addEventListener('swipe', function(e) {
                    Ti.App.columnClicked = e.source.DataMember;
                });*/
            } else if (mFieldControl.name == 'TEXTAREA') {//Label
                //var dataValue = "asdassdas dsdad \n ad asdasdsad asd \n asdas da da";
                dataValue = new String(dataValue);
                dataValue = dataValue.replace(/<br>/g, '\n');
                dataValue = dataValue.replace(/<BR>/g, '\n');
                dataValue = dataValue.replace(/ br /g, '\n');
                dataValue = dataValue.replace(/ BR /g, '\n');
                var label = new TextArea().createTextArea(dataValue, commonObj.tblColumnWidth + '%', 'auto', HeaderDetailsObj.fontSize, HeaderDetailsObj.rowTextColor, sRow_BG_Color, HeaderDetailsObj.allignment);
                //var label = new TextArea().createTextArea(dataValue, commonObj.tblColumnWidth + '%', '100%', HeaderDetailsObj.fontSize,  HeaderDetailsObj.rowTextColor, sRow_BG_Color, HeaderDetailsObj.allignment);
                label.left = dLeftPos + '%';
                label.top = dTopPos;
                label.text = dataValue;
                //label.backgroundColor = sRow_BG_Color;
                label.fieldControl = mFieldControl.name;
                label.rowIndex = iIndex;
                label.iIndex = iIndex;
                label.DataMember = HeaderDetailsObj.DataMember.toUpperCase();
                label.DataMemberType = HeaderDetailsObj.DataMemberType.toUpperCase();
                label.touchEnabled = false;
                label.horizontalWrap = true;
                label.wordWrap = true;
                label.dActualHeight = 'auto';
                label.dLineIndex = dLineIndex;
                if (bRowComponentBorder == true) {
                    label.borderColor = sBorderColor;
                    label.borderWidth = 1;
                }
                try {
                    label.actVal = item.fieldByName(HeaderDetailsObj.DataMember);
                } catch (e) {
                    label.actVal = dataValue;
                }
                label.DataMemberType = dataMemberType;
                label.columnWidth = HeaderDetailsObj.columnWidth;
                //if(bColorConfig == true){
                if (bColorConfig == true && sColorCondFieldArr.indexOf(label.DataMember) > -1) {
                    label.backgroundColor = this.getColorConfig(screenName, label.DataMember, dataValue, item);
                }
                label.color = '#e8e8e8';
                vwRowHorizontal.add(label);
                /*label.addEventListener('click', function(e) {
                    Ti.App.columnClicked = e.source.DataMember;
                });
                label.addEventListener('longpress', function(e) {
                    Ti.App.columnClicked = e.source.DataMember;
                });
                label.addEventListener('swipe', function(e) {
                    Ti.App.columnClicked = e.source.DataMember;
                });*/
            } else if (mFieldControl.name == 'TEXTBOX') {//Field
                sKeyType = 'TEXT';
                if (HeaderDetailsObj.DataMemberType == "NUMBER") {
                    sKeyType = 'NUMBER';
                }
                var field = commonObj.TextFieldObj.createTextField(false, dataValue, commonObj.tblColumnWidth + '%', rowHeight, HeaderDetailsObj.fontSize, HeaderDetailsObj.HFont, HeaderDetailsObj.rowTextColor, sRow_BG_Color, HeaderDetailsObj.allignment, false, sKeyType);
                //var field = commonObj.TextFieldObj.createTextField(false, dataValue, commonObj.tblColumnWidth + '%', rowHeight, HeaderDetailsObj.fontSize, HeaderDetailsObj.HFont, HeaderDetailsObj.rowTextColor, HeaderDetailsObj.rowBgColor, HeaderDetailsObj.allignment, false, 'NUMBER');
                //field.backgroundColor = sRow_BG_Color;//'transparent';
                currentFocusedField = field;
                field.left = dLeftPos + '%';//0;
                field.top = dTopPos;//0;
                //field.editable = false;
                field.iIndex = iIndex;
                field.fieldName = HeaderDetailsObj.fieldName;
                field.fieldControl = mFieldControl.name;
                field.DataMember = HeaderDetailsObj.DataMember.toUpperCase();
                field.DataMemberType = HeaderDetailsObj.DataMemberType.toUpperCase();
                //field.zIndex = 99;
                field.columnWidth = HeaderDetailsObj.columnWidth;
                field.screenName = screenName;
                field.dLineIndex = dLineIndex;
                //if(bColorConfig == true){
                if (bColorConfig == true && sColorCondFieldArr.indexOf(field.DataMember) > -1) {
                    field.backgroundColor = this.getColorConfig(screenName, field.DataMember, dataValue, item);
                }
                //field.borderRadius = 11;
                if (bRowComponentBorder == true) {
                    field.borderColor = sBorderColor;
                    field.borderWidth = 1;
                }
                if (dLineIndex > 0) {
                    field.backgroundColor = '#e8e8e8';
                    field.color = '#333';
                    field.borderColor = "#fff";
                    field.borderWidth = 1;
                }
                vwRowHorizontal.add(field);
                /*field.addEventListener('click', function(e) {
                    Ti.App.columnClicked = e.source.DataMember;
                });*/
                field.addEventListener('longpress', function (e) {
                    Ti.App.columnClicked = e.source.DataMember;
                });
                field.addEventListener('change', function (e) {
                    if (COMMON.getRowIndex() == 1 && e.source.iIndex == 0) {
                        return '';
                    }
                    mController.listValueChanged(this, e.source.DataMember, e.source.iIndex, e.value);
                });
                field.addEventListener('focus', function (e) {
                    Ti.App.columnClicked = e.source.DataMember;
                    this.currentFocus = true;
                    // added this line on 21 Nov 2013 to keep track of focused item.
                    mController.listTextFieldFocus(this, e.source.DataMember, e.source.iIndex, e.value);
                });
                field.addEventListener('return', function (e) {
                    //field.blur();
                    //this.currentFocus = false;
                    // added this line on 21 Nov 2013 to keep track of focused item.
                    //mController.listTextFieldLostFocus(this, e.source.DataMember, e.source.iIndex, e.value);
                });
                field.addEventListener('blur', function (e) {
                    this.currentFocus = false;
                    // added this line on 21 Nov 2013 to keep track of focused item.
                    dColorConfigRowIndex = e.source.iIndex;
                    try {
                        //getColumnData : function(sectionIndex, rowIndex, fieldName) {
                        //var sCondArr = COMMONMODEL.CheckColorConfig(screenName, e.source.DataMember);
                        sCondArr = [];
                        sCondArr = Titanium.App.Properties.getList('ColorConfig_' + e.source.screenName);
                        if (sCondArr.length > 0) {
                            DataMemberValue = this.value;//ArrayOperations.prototype.getColumnData(0, e.source.iIndex, e.source.DataMember);
                            ConditionFieldValue = '';
                            CForeColor = ''; CBackColor = '';
                            try {
                                for (var condCtr = 0; condCtr < sCondArr.length; condCtr++) {
                                    ConditionFieldValue = '';
                                    CForeColor = '';
                                    CBackColor = '';
                                    COMMONLog('ColorConfig sCondArr[condCtr] ---> ' + JSON.stringify(sCondArr[condCtr]));
                                    if (sCondArr[condCtr].ConditionField != '' && sCondArr[condCtr].ConditionField != null) {
                                        ConditionFieldValue = ArrayOperations.prototype.getColumnData(0, e.source.iIndex, sCondArr[condCtr].ConditionField);
                                    } else {
                                        ConditionFieldValue = sCondArr[condCtr].ConditionValue;
                                    }
                                    COMMONLog('dColorConfigRowIndex ---> ' + dColorConfigRowIndex);
                                    if (sCondArr[condCtr].Condition == '>') {
                                        if (DataMemberValue > ConditionFieldValue) {
                                            CForeColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CForeColor);
                                            CBackColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CBackColor);
                                            if (sCondArr[condCtr].CRowColor == 1 || sCondArr[condCtr].CRowColor == '1') {
                                                CForeColor = 'transparent';
                                                CBackColor = 'transparent';
                                                var _tmpRow = ArrayOperations.prototype.getRowByIndex(dColorConfigRowIndex);
                                                COMMONLog('_tmpRow ---> ' + _tmpRow);
                                                _tmpRow.backgroundColor = '#33ff77';//'#9FC2F5';//'#3333ff';//'#009900';//'#F6921E';
                                            }
                                        }
                                    } else if (sCondArr[condCtr].Condition == '<') {
                                        if (DataMemberValue < ConditionFieldValue) {
                                            CForeColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CForeColor);
                                            CBackColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CBackColor);
                                            if (sCondArr[condCtr].CRowColor == 1 || sCondArr[condCtr].CRowColor == '1') {
                                                CForeColor = 'transparent';
                                                CBackColor = 'transparent';
                                                var _tmpRow = ArrayOperations.prototype.getRowByIndex(dColorConfigRowIndex);
                                                COMMONLog('_tmpRow ---> ' + _tmpRow);
                                                _tmpRow.backgroundColor = '#33ff77';//'#9FC2F5';//'#3333ff';//'#009900';//'#F6921E';
                                            }
                                        }
                                    } else if (sCondArr[condCtr].Condition == '=') {
                                        if (DataMemberValue == ConditionFieldValue) {
                                            CForeColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CForeColor);
                                            CBackColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CBackColor);
                                            if (sCondArr[condCtr].CRowColor == 1 || sCondArr[condCtr].CRowColor == '1') {
                                                CForeColor = 'transparent';
                                                CBackColor = 'transparent';
                                                var _tmpRow = ArrayOperations.prototype.getRowByIndex(dColorConfigRowIndex);
                                                COMMONLog('_tmpRow ---> ' + _tmpRow);
                                                _tmpRow.backgroundColor = '#33ff77';//'#9FC2F5';//'#3333ff';//'#009900';//'#F6921E';
                                            }
                                        }
                                    }
                                    if (CBackColor != '') {
                                        this.backgroundColor = CBackColor;
                                        this.color = CForeColor;
                                        dColorConfigRowIndex = -1;
                                    }
                                    if (bIsAndroid) {
                                        if (e.source.iIndex == 0) {
                                            ArrayOperations.prototype.refreshTableListUI();
                                        }
                                    }
                                }
                            } catch (e) {
                                alert('TEXTBOX COLORCONFIG ERROR ---> ' + e);
                            }
                        }
                    } catch (e) { }
                    dColorConfigRowIndex = -1;
                    mController.listTextFieldLostFocus(this, e.source.DataMember, e.source.iIndex, e.value);
                });
                /*field.addEventListener('swipe', function(e) {
                    Ti.App.columnClicked = e.source.DataMember;
                });*/
            } else if (mFieldControl.name == 'EDITABLETEXTBOX') {//Field
                sKeyType = 'NUMBER';
                try {
                    sKeyType = mFieldControl.keyType;
                } catch (e) {
                    sKeyType = 'NUMBER';
                }
                var field = commonObj.TextFieldObj.createTextField(false, dataValue, commonObj.tblColumnWidth + '%', rowHeight, HeaderDetailsObj.fontSize, HeaderDetailsObj.HFont, HeaderDetailsObj.rowTextColor, sRow_BG_Color, HeaderDetailsObj.allignment, false, sKeyType);
                //var field = commonObj.TextFieldObj.createTextField(false, dataValue, commonObj.tblColumnWidth + '%', rowHeight, HeaderDetailsObj.fontSize, HeaderDetailsObj.HFont, HeaderDetailsObj.rowTextColor, HeaderDetailsObj.rowBgColor, HeaderDetailsObj.allignment, false, 'NUMBER');
                //field.backgroundColor = sRow_BG_Color;//'#d6d6d6';//'transparent';
                field.focusable = false;
                field.iIndex = iIndex;
                field.left = dLeftPos + '%';
                field.top = dTopPos;
                field.fieldName = HeaderDetailsObj.fieldName;
                field.fieldControl = mFieldControl.name;
                field.DataMember = HeaderDetailsObj.DataMember.toUpperCase();
                field.DataMemberType = HeaderDetailsObj.DataMemberType.toUpperCase();
                field.columnWidth = HeaderDetailsObj.columnWidth;
                field.dLineIndex = dLineIndex;
                field.valueChanged = false;
                field.dPreValue = dataValue;
                field.dListRowIndex = COMMON.getRowIndex();
                field.prevBGColor = sRow_BG_Color;
                field.screenName = screenName;
                field.ReadOnly = false;
                if (mFieldControl.isEditable) {
                    field.editable = true;
                    field.focusable = true;
                } else {
                    field.editable = false;
                    //field.focusable = false;
                }
                field.DefBGColor = sRow_BG_Color;//'transparent';
                //if(bColorConfig == true){
                if (bColorConfig == true && sColorCondFieldArr.indexOf(field.DataMember) > -1) {
                    field.backgroundColor = this.getColorConfig(screenName, field.DataMember, dataValue, item);
                }
                //field.DefBGColor = field.backgroundColor;
                //field.borderRadius = 11;
                field.borderColor = '#333';
                field.borderWidth = 1;
                field.borderRadius = 6;
                if (bRowComponentBorder == true) {
                    field.borderColor = sBorderColor;
                    field.borderWidth = 1;
                }
                /*if(dLineIndex > 0){   
                    field.backgroundColor = '#e8e8e8';
                    field.color = '#333';
                    field.borderColor= "#fff";
                    field.borderWidth = 1;
                }*/
                vwRowHorizontal.add(field);
                /*field.addEventListener('click', function(e) {
                    Ti.App.columnClicked = e.source.DataMember;
                });*/
                field.addEventListener('touchstart', function (e) {

                    //field.ReadOnly = false;
                    Ti.API.info("this.ReadOnly1 " + this.ReadOnly + " : bIsAndroid -> " + bIsAndroid);
                    if (this.ReadOnly == true) {
                        this.valueChanged = false;
                        if (bIsAndroid) {
                            Ti.UI.Android.hideSoftKeyboard();
                        }
                        this.blur();
                        return "";
                    }

                    Ti.App.columnClicked = e.source.DataMember;
                    try {
                        if (mView != null && mView != undefined) {
                            mView.setselectedRowIndex(e.source.iIndex);
                        }
                    } catch (e) { }
                    try {
                        mController.checkEditableTextBox(this, e.source.DataMember, e.source.iIndex, e.value);
                    } catch (e) { }
                });
                /*field.addEventListener('longpress', function(e) {
                    Ti.App.columnClicked = e.source.DataMember;
                });*/
                field.addEventListener('change', function (e) {
                    /*if (!COMMON.isNumber(e.value)) {
                        //COMMON.showAlert("Please Enter Valid Character.", ["OK"], null);
                        COMMON.showAlert("ArrayOperation -> Please Enter Valid Character.", ["OK"], null);
                        this.value = '';
                        return false;
                    }*/
                    try {
                        if (mView != null && mView != undefined) {
                            mView.setselectedRowIndex(e.source.iIndex);
                        }
                    } catch (e) { }
                    Ti.App.columnClicked = e.source.DataMember;
                    currentFocusedField = this;
                    try {
                        //if(COMMON.getRowIndex()==1 && e.source.iIndex == 0){
                        if (e.source.dListRowIndex == 1 && e.source.iIndex == 0) {
                            return '';
                        }
                        //this.valueChanged = true;
                        if (this.dPreValue != e.value) {
                            this.dPreValue = e.value;
                            this.valueChanged = true;
                            mController.listValueChanged(this, e.source.DataMember, e.source.iIndex, e.value);
                        }
                    } catch (e) { }
                });
                field.addEventListener('return', function (e) {
                    Ti.App.bReadOnlyRowTextField = true;
                    COMMONLog('LOST FOCUS START TIME : ' + new Date().getTime());
                    // this.backgroundColor = this.prevBGColor;
                    // this.currentFocus = false;
                    // this.valueChanged = false;
                    // this.blur();
                    // return '';
                    commonObj.txtValue = e.value;
                    commonObj.txtValue = (commonObj.txtValue == null || commonObj.txtValue == undefined || commonObj.txtValue == '') ? -1 : commonObj.txtValue.length;
                    this.maxLength = commonObj.txtValue;
                    this.editable = false;//true;
                    COMMONLog('return --> this.maxLength : ' + this.maxLength);
                    COMMONLog('return --> ' + e.source.DataMember + ' - ' + e.source.iIndex + ' this.valueChanged -> ' + this.valueChanged);
                    if (this.valueChanged == true) {
                        //this.backgroundColor = 'transparent';
                        this.backgroundColor = this.prevBGColor;
                        this.currentFocus = false;
                        this.valueChanged = false;
                        //this.editable = false;
                        //this.focusable = false;
                        //this.blur();
                        this.editable = true;
                        this.focusable = true;
                        try {
                            mController.listTextFieldLostFocus(this, e.source.DataMember, e.source.iIndex, e.value);
                        } catch (e) { }
                        COMMONLog('LOST FOCUS START TIME 2 : ' + new Date().getTime());
                    }
                    //this.editable = true;
                    //this.focusable = true;
                    COMMONLog('textFieldNextFocusByIndex --> ' + e.source.DataMember + ' - ' + e.source.iIndex);
                    try {
                        //mController.textFieldNextFocusByIndex(e.source.iIndex+1);
                        //**/
                        commonObj._tmpRowIndex = e.source.iIndex;
                        commonObj._tmpRowIndex = parseInt(commonObj._tmpRowIndex) + 1;
                        commonObj.tblLen = ArrayOperations.prototype.getAllRows(0).length;//SI.getAllRows(0).length;
                        commonObj.tblLen = (commonObj.tblLen == null || commonObj.tblLen == undefined || commonObj.tblLen == '') ? 0 : commonObj.tblLen;
                        COMMONLog(commonObj.tblLen + ' > ' + commonObj._tmpRowIndex);
                        this.backgroundColor = this.prevBGColor;
                        this.currentFocus = false;
                        this.valueChanged = false;
                        ////this.editable = true;
                        ////this.maxLength = 9999;
                        if (commonObj.tblLen > 0 && commonObj.tblLen > commonObj._tmpRowIndex) {
                            commonObj.field = ArrayOperations.prototype.getRowComponent(0, commonObj._tmpRowIndex, e.source.DataMember);
                            Ti.App.bReadOnlyRowTextField = false;
                            commonObj.field.focus();
                        } else {
                            Ti.App.bReadOnlyRowTextField = false;
                            mController.textFieldNextFocusByIndex(e.source.iIndex + 1);
                            //var _fieldComponent = '', _fieldControl= '';
                            //for(var _i=0 ; _i<formFieldNames.length; _i++){
                            //_fieldComponent = ArrayOperations.prototype.getFormComponent(_i);
                            //_fieldControl = _fieldComponent.fieldControl;
                            //if (_fieldControl == 'SEARCH') {
                            //_fieldComponent.focus();
                            //_fieldComponent.value = '';
                            //_i = formFieldNames.length;
                            //}
                            //}

                        }
                        //**/
                        this.editable = true;
                        this.maxLength = 9999;
                    } catch (e) {
                        Ti.App.bReadOnlyRowTextField = false;
                    }
                    COMMONLog('LOST FOCUS END TIME : ' + new Date().getTime());
                });
                field.addEventListener('focus', function (e) {
                    //field.ReadOnly = false;
                    Ti.API.info("this.ReadOnly1 " + this.ReadOnly);
                    if (this.ReadOnly == true) {
                        this.valueChanged = false;
                        //this.blur();
                        if (COMMON.isPlatformAndroid()) {
                            Ti.UI.Android.hideSoftKeyboard();
                        }
                        return "";
                    }
                    COMMON.Log('Ti.App.bReadOnlyRowTextField ---> ' + Ti.App.bReadOnlyRowTextField + ' ' + this.fieldName);
                    if (Ti.App.bReadOnlyRowTextField == true) {
                        this.backgroundColor = this.prevBGColor;
                        this.valueChanged = false;
                        this.blur();
                        return "";
                    }
                    try {
                        if (mView != null && mView != undefined) {
                            mView.setselectedRowIndex(e.source.iIndex);
                        }
                    } catch (e) { }
                    //var _len = ArrayOperations.prototype.getAllRows(0);
                    //if(_len > 0){
                    commonObj.tbl = Ti.App.currentTable;
                    if (e.source.iIndex > 5 && e.source.dLineIndex == 0) {
                        //tbl.scrollToTop(e.source.iIndex-5);//scrollT
                        commonObj.tbl.scrollToTop(e.source.iIndex - 3);//scrollT//NoneedParkfood
                        //tbl.scrollToIndex(e.source.iIndex);//scrollT
                    }
                    this.prevBGColor = this.DefBGColor;//.backgroundColor;
                    this.backgroundColor = '#666666';//'#333333';
                    //}
                    Ti.App.columnClicked = e.source.DataMember;
                    currentFocusedField = this;
                    this.currentFocus = true;
                    // added this line on 21 Nov 2013 to keep track of focused item.
                    try {
                        mController.listTextFieldFocus(this, e.source.DataMember, e.source.iIndex, e.value);
                    } catch (e) { }
                    var val = this.value;
                    val = (val == null || val == undefined || val == '') ? '' : val;
                    COMMONLog('val1 --> ' + val);
                    if (val != '') {
                        COMMONLog('val2 --> ' + val);
                        val = new String(val);
                        COMMONLog('val.length --> ' + val.length);
                        //field.setSelection(field.value.length, field.value.length);
                        e.source.setSelection(0, val.length);
                        //this.setSelection(val.length, 0); 
                    }
                });
                field.addEventListener('blur', function (e) {
                    COMMONLog('blur --> ' + e.source.DataMember + ' - ' + e.source.iIndex + ' this.valueChanged -> ' + this.valueChanged);
                    //this.backgroundColor = 'transparent';
                    this.backgroundColor = this.prevBGColor;
                    this.currentFocus = false;
                    this.editable = true;
                    this.focusable = true;
                    if (this.valueChanged == true) {
                        Ti.App.bReadOnlyRowTextField = true;
                        this.valueChanged = false;
                        try {
                            //getColumnData : function(sectionIndex, rowIndex, fieldName) {
                            sCondArr = [];
                            sCondArr = Titanium.App.Properties.getList('ColorConfig_' + screenName);
                            if (sCondArr.length > 0) {
                                DataMemberValue = ArrayOperations.prototype.getColumnData(0, e.source.iIndex, e.source.DataMember);
                                if (DataMemberValue == null || DataMemberValue == undefined) {
                                    DataMemberValue = "";
                                }
                                ConditionFieldValue = ''; CForeColor = ''; CBackColor = '';
                                for (var condCtr = 0; condCtr < sCondArr.length; condCtr++) {
                                    ConditionFieldValue = '';
                                    CForeColor = '';
                                    CBackColor = '';
                                    if (sCondArr[condCtr].ConditionField != '' && sCondArr[condCtr].ConditionField != null) {
                                        ConditionFieldValue = ArrayOperations.prototype.getColumnData(0, e.source.iIndex, sCondArr[condCtr].ConditionField);
                                    } else {
                                        ConditionFieldValue = sCondArr[condCtr].ConditionValue;
                                    }
                                    if (sCondArr[condCtr].Condition == '>') {
                                        if (DataMemberValue > ConditionFieldValue) {
                                            CForeColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CForeColor);
                                            CBackColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CBackColor);
                                        }
                                    } else if (sCondArr[condCtr].Condition == '<') {
                                        if (DataMemberValue < ConditionFieldValue) {
                                            CForeColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CForeColor);
                                            CBackColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CBackColor);
                                        }
                                    } else if (sCondArr[condCtr].Condition == '=') {
                                        if (DataMemberValue === ConditionFieldValue) {
                                            CForeColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CForeColor);
                                            CBackColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CBackColor);
                                        }
                                    }
                                    if (CBackColor != '') {
                                        e.source.backgroundColor = CBackColor;
                                        e.source.color = CForeColor;
                                    }
                                    if (bIsAndroid) {
                                        if (e.source.iIndex == 0) {
                                            ArrayOperations.prototype.refreshTableListUI();
                                        }
                                    }
                                }
                            }
                        } catch (e) { }
                        //this.editable = false;
                        //this.focusable = false;
                        // added this line on 21 Nov 2013 to keep track of focused item.
                        try {
                            mController.listTextFieldLostFocus(this, e.source.DataMember, e.source.iIndex, e.value);
                        } catch (e) { }
                        Ti.App.bReadOnlyRowTextField = false;
                    }
                    //this.editable = true;
                    //this.focusable = true;
                });
                /*field.addEventListener('swipe', function(e) {
                    Ti.App.columnClicked = e.source.DataMember;
                });*/
            } else if (mFieldControl.name == 'COMBOBOX') {//Combo Box
                var field = commonObj.BasicLabelObj.createLabel(dataValue, commonObj.tblColumnWidth + '%', rowHeight, HeaderDetailsObj.fontSize, HeaderDetailsObj.HFont, HeaderDetailsObj.fontStyle, HeaderDetailsObj.rowTextColor, HeaderDetailsObj.rowBgColor, HeaderDetailsObj.allignment, 0);
                //var field = commonObj.TextFieldObj.createTextField(false, dataValue, Math.floorcommonObj.tblColumnWidth + '%', rowHeight, HeaderDetailsObj.fontSize, HeaderDetailsObj.HFont, HeaderDetailsObj.rowTextColor, HeaderDetailsObj.rowBgColor, HeaderDetailsObj.allignment, false, 'TEXT');
                field.backgroundColor = sRow_BG_Color;//'transparent';
                field.left = dLeftPos + '%';
                field.top = dTopPos;
                if (mFieldControl.isEditable) {
                    field.touchEnabled = true;
                } else {
                    field.touchEnabled = false;
                    //field.focusable = false;
                }
                field.fieldControl = mFieldControl.name;
                field.DataMember = HeaderDetailsObj.DataMember.toUpperCase();
                field.DataMemberType = HeaderDetailsObj.DataMemberType.toUpperCase();
                field.iIndex = iIndex;
                field.code = dataValue;
                field.title = HeaderDetailsObj.columnText;//item.fieldByName(HeaderDetailsObj.columnText);
                field.fieldName = HeaderDetailsObj.fieldName;
                field.screenName = HeaderDetailsObj.screenName;
                field.searchType = 0;
                field.columnWidth = HeaderDetailsObj.columnWidth;
                field.dLineIndex = dLineIndex;
                if (bRowComponentBorder == true) {
                    field.borderColor = sBorderColor;
                    field.borderWidth = 1;
                }
                //if(bColorConfig == true){
                if (bColorConfig == true && sColorCondFieldArr.indexOf(field.DataMember) > -1) {
                    field.backgroundColor = this.getColorConfig(screenName, field.DataMember, dataValue, item);
                }
                commonObj.mScreenNameComboQry = HeaderDetailsObj.screenName + '_COMBOBOX_' + HeaderDetailsObj.fieldName;
                commonObj.mScreenNameComboQryTxt = this.getQueryConfigByScreenName(commonObj.mScreenNameComboQry);
                COMMONLog('List Config ComboBox Query ---> ' + qry);
                try {
                    if (commonObj.mScreenNameComboQryTxt != null && commonObj.mScreenNameComboQryTxt != undefined && commonObj.mScreenNameComboQryTxt != '') {
                        commonObj.mScreenNameComboQryTxt += ' ' + Titanium.App.Properties.getString('QueryConfig_' + commonObj.mScreenNameComboQry + '_GroupText');
                        commonObj.mScreenNameComboQryTxt += ' ' + Titanium.App.Properties.getString('QueryConfig_' + commonObj.mScreenNameComboQry + '_OrderText');
                    }
                    comboData = this.createComboBoxData(commonObj.mScreenNameComboQryTxt);
                    if (comboData.length > 0) {

                        if (HeaderDetailsObj.fieldName == 'ReasonCode') {
                            commonObj.bDefaultValueFound = false;
                            for (var _j = 0; _j < comboData.length; _j++) {
                                if (comboData[_j].ComboBoxCode == dataValue || comboData[_j].displayText == dataValue) {
                                    commonObj.bDefaultValueFound = true;
                                    field.text = comboData[_j].displayText;
                                    field.code = comboData[_j].ComboBoxCode;
                                }
                            }

                            if (commonObj.bDefaultValueFound == false) {
                                //field.text = comboData[0].displayText;
                                //field.code = comboData[0].ComboBoxCode;
                            }
                        } else {
                            for (var _j = 0; _j < comboData.length; _j++) {
                                if (comboData[_j].ComboBoxCode == dataValue) {
                                    commonObj.bDefaultValueFound = true;
                                    field.text = comboData[_j].displayText;
                                    field.code = comboData[_j].ComboBoxCode;
                                }
                            }
                        }
                    }
                } catch (e) {
                    comboData = [];
                }
                field.ComboBoxData = comboData;
                field.addEventListener('click', function (e) {
                    COMMONLog('ComboBox Displayed ---> ');
                    Ti.App.columnClicked = e.source.DataMember;
                    if (mView != null && mView != undefined) {
                        mView.setselectedRowIndex(this.iIndex);
                    }
                    if (this.ComboBoxData.length != 0) {
                        new ComboBox().show(this.title, mController, this.ComboBoxData, this, this.screenName, this.fieldName, this.searchType);
                    } else {
                        try {
                            mController.handleShowingComboBox(this.iIndex, this.title, mController, this, this.screenName, this.fieldName, this.searchType);
                        } catch (e) { }
                    }
                });
                /*field.addEventListener('longpress', function(e) {
                    Ti.App.columnClicked = e.source.DataMember;
                });*/
                /*field.addEventListener('change', function(e) {
                    try {
                        if(COMMON.getRowIndex()==1 && e.source.iIndex == 0){
                            return '';
                        }   
                        mController.listValueChanged(this, e.source.DataMember, e.source.iIndex, e.value);
                    } catch(e) {}
                });
                field.addEventListener('focus', function(e) {
                    try {
                        mController.listTextFieldFocus(this, e.source.DataMember, e.source.iIndex, e.value);
                    } catch(e) {}
                });
                field.addEventListener('blur', function(e) {
                    try {
                        mController.listTextFieldLostFocus(this, e.source.DataMember, e.source.iIndex, e.value);
                    } catch(e) {}
                });*/
                //field.addEventListener('swipe', function(e) {
                //Ti.App.columnClicked = e.source.DataMember;
                //});
                vwRowHorizontal.add(field);
            } else if (mFieldControl.name == 'DATEPICKER') {//DatePicker
                var dateLabel = commonObj.BasicLabelObj.createLabel(dataValue, commonObj.tblColumnWidth + '%', rowHeight, HeaderDetailsObj.fontSize, HeaderDetailsObj.HFont, HeaderDetailsObj.fontStyle, HeaderDetailsObj.rowTextColor, HeaderDetailsObj.rowBgColor, HeaderDetailsObj.allignment, 0);
                dateLabel.backgroundColor = sRow_BG_Color;//'transparent';
                //field.focusable = true;
                //var field = commonObj.TextFieldObj.createTextField(false, dataValue, Math.floorcommonObj.tblColumnWidth + '%', rowHeight, HeaderDetailsObj.fontSize, HeaderDetailsObj.HFont, HeaderDetailsObj.rowTextColor, HeaderDetailsObj.rowBgColor, HeaderDetailsObj.allignment, false, 'TEXT');
                //field.enabled = false;
                if (mFieldControl.isEditable) {
                    dateLabel.touchEnabled = true;
                } else {
                    dateLabel.touchEnabled = false;
                    //field.focusable = false;
                }
                dateLabel.left = dLeftPos + '%';
                dateLabel.top = dTopPos;
                dateLabel.fieldControl = mFieldControl.name;
                dateLabel.iIndex = iIndex;
                dateLabel.title = item.fieldByName(item.fieldName(ctr));
                dateLabel.fieldName = HeaderDetailsObj.fieldName;
                dateLabel.screenName = HeaderDetailsObj.screenName;
                dateLabel.DataMember = HeaderDetailsObj.DataMember.toUpperCase();
                field.DataMemberType = HeaderDetailsObj.DataMemberType.toUpperCase();
                dateLabel.searchType = 0;
                dateLabel.columnWidth = HeaderDetailsObj.columnWidth;
                dateLabel.dLineIndex = dLineIndex;
                if (bRowComponentBorder == true) {
                    dateLabel.borderColor = sBorderColor;
                    dateLabel.borderWidth = 1;
                }
                //if(bColorConfig == true){
                if (bColorConfig == true && sColorCondFieldArr.indexOf(dateLabel.DataMember) > -1) {
                    dateLabel.backgroundColor = this.getColorConfig(screenName, dateLabel.DataMember, dataValue, item);
                }
                dateLabel.addEventListener('click', function (e) {
                    Ti.App.columnClicked = e.source.DataMember;
                    var datepicker = new DatePicker();
                    datepicker.setController(mController);
                    try {
                        COMMONLog(e.source.iIndex + ' - ' + this.iIndex);
                        datepicker.show(mController, this.iIndex, this.screenName, this.fieldName, this.searchType, dateLabel);
                    } catch (e) {
                    }
                    //datepicker.show(mController, e.source.iIndex, this.screenName, this.fieldName, this.searchType, dateLabel);
                });
                //dateLabel.addEventListener('longpress', function(e) {
                //Ti.App.columnClicked = e.source.DataMember;
                //});
                /*dateLabel.addEventListener('change', function(e) {
                    try {
                        if(COMMON.getRowIndex()==1 && e.source.iIndex == 0){
                            return '';
                        }   
                        mController.listValueChanged(this, e.source.DataMember, e.source.iIndex, e.value);
                    } catch(e) {}
                });
                dateLabel.addEventListener('focus', function(e) {
                    try {
                        mController.listTextFieldFocus(this, e.source.DataMember, e.source.iIndex, e.value);
                    } catch(e) {}
                });
                dateLabel.addEventListener('blur', function(e) {
                    try {
                        mController.listTextFieldLostFocus(this, e.source.DataMember, e.source.iIndex, e.value);
                    } catch(e) {}
                });*/
                //dateLabel.addEventListener('swipe', function(e) {
                //Ti.App.columnClicked = e.source.DataMember;
                //});
                vwRowHorizontal.add(dateLabel);
            } else if (mFieldControl.name == 'OPTION') {//DatePicker
                var checkBox = new BasicCheckBox().createBasicCheckBox(dataValue, HeaderDetailsObj.allignment);
                checkBox.value = (dataValue == null || dataValue == undefined || dataValue == "" || dataValue == 0 || dataValue == "0" || dataValue == "false" || dataValue == false) ? false : true;
                checkBox.index = iIndex;
                checkBox.backgroundColor = sRow_BG_Color;//'transparent';
                checkBox.fieldControl = mFieldControl.name;
                checkBox.DataMember = HeaderDetailsObj.DataMember.toUpperCase();
                checkBox.DataMemberType = HeaderDetailsObj.DataMemberType.toUpperCase();
                checkBox.iIndex = iIndex;
                checkBox.left = dLeftPos + '%';
                checkBox.top = dTopPos;
                checkBox.fieldName = HeaderDetailsObj.fieldName;
                checkBox.columnWidth = HeaderDetailsObj.columnWidth;
                //checkBox.width = commonObj.tblColumnWidth + '%';
                //checkBox.borderColor = '#e8e8e8';
                //checkBox.borderWidth = 2;
                checkBox.height = rowHeight;
                checkBox.defaultValue = (dataValue == null || dataValue == undefined || dataValue == "" || dataValue == 0 || dataValue == "0" || dataValue == "false" || dataValue == false) ? false : true;
                checkBox.dLineIndex = dLineIndex;
                if (mFieldControl.isEditable) {
                    checkBox.touchEnabled = true;
                } else {
                    checkBox.touchEnabled = false;
                }
                if (Ti.Platform.name == 'android') {
                    checkBox.addEventListener('click', checkboxevent1);
                } else {
                    checkBox.addEventListener('change', checkboxevent1);
                }
                function checkboxevent1(e) {
                    try {
                        try {
                            var bflagOption = mController.checkBoxEditable(this.iIndex, this.value);
                            COMMONLog('bflagOption --> ' + bflagOption);
                            COMMONLog('this.defaultValue ---> ' + this.defaultValue);
                            if (!bflagOption) {// && bflagOption != ''){
                                this.value = this.defaultValue;
                                return false;
                            }
                            if (COMMON.avoidMultipleClick()) {
                                return '';
                            }
                        } catch (e) { }
                        COMMONLog("this.iIndex checkboxevent --> " + this.iIndex);
                        mController.checkBoxValueChanged(this.iIndex, this.value, this.fieldName);
                    } catch (e) { }
                }
                vwRowHorizontal.add(checkBox);
            } else if (mFieldControl.name == 'TAKEPHOTO') {//DatePicker
                var test = (dataValue == null || dataValue == undefined || dataValue == '') ? formdata.DefaultValue : dataValue;
                test = (test == null || test == undefined || test == '') ? '' : test;
                if (test != '') {
                    var imgPath = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'Photo', test);
                    try {
                        var file = (bIsAndroid) ? Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, 'Photo', test) : Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'Photo', test);
                        if (file.exists()) {
                            var imgPath = file.nativePath;
                            file = null;
                            delete file;
                        } else {
                            test = test.replace('png', 'simg');
                            file = (bIsAndroid) ? Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, 'Photo', test) : Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'Photo', test);
                            if (file.exists()) {
                                var imgPath = file.nativePath;
                                file = null;
                                delete file;
                            } else {
                                file = null;
                                delete file;
                                var imgPath = '/images/camdisplay.simg';
                            }
                        }
                        file = null;
                        delete file;
                    } catch (e) {
                        var imgPath = '/images/camdisplay.simg';
                    }
                } else {
                    var imgPath = '/images/camdisplay.simg';
                }
                var ImgCtrlView = Ti.App.BasicViewObj.createBasicView(null, 'transparent', rowHeight, HeaderDetailsObj.columnWidth + '%', 0, 0, 0, 0, '');
                var img = new BasicImageView().createImageView(null, imgPath, 'auto', 'auto');//formdata.dValueWidth * pWidth, formdata.ValueHeight);
                img.enableZoomControls = false;
                img.fieldName = HeaderDetailsObj.fieldName;
                img.backgroundColor = sRow_BG_Color;
                img.fieldControl = mFieldControl.name;
                img.rowIndex = iIndex;
                img.iIndex = iIndex;
                img.index = iIndex;
                img.DataMember = HeaderDetailsObj.DataMember.toUpperCase();
                img.dataMember = HeaderDetailsObj.DataMember.toUpperCase();
                img.DataMemberType = HeaderDetailsObj.DataMemberType;
                img.columnWidth = HeaderDetailsObj.columnWidth;
                img.screenName = HeaderDetailsObj.screenName;
                img.dLineIndex = dLineIndex;
                img.height = rowHeight;
                ImgCtrlView.top = dTopPos;
                if (HeaderDetailsObj.allignment == 0) {
                    ImgCtrlView.layout = 'vertical';
                } else if (HeaderDetailsObj.allignment == 1) {
                    img.right = 1;//2;
                } else if (HeaderDetailsObj.allignment == 2) {
                    img.left = 1;//2;
                }
                img.addEventListener('click', function (e) {
                    try {
                        if (Ti.App.bFocusedTxtfield != null && Ti.App.bFocusedTxtfield != undefined) {
                            Ti.App.bFocusedTxtfield.blur();
                            Ti.App.bFocusedTxtfield = null;
                            return;
                        }
                        mController.showCamera(this, e.source.fieldName);
                    } catch (e) { }
                });
                ImgCtrlView.add(img);
                vwRowHorizontal.add(ImgCtrlView);
            } else if (mFieldControl.name == 'TAKEPHOTOWITHPREVIEW') {//DatePicker
                var bImgFound = true;
                var test = (dataValue == null || dataValue == undefined || dataValue == '') ? formdata.DefaultValue : dataValue;
                test = (test == null || test == undefined || test == '') ? '' : test;
                if (test != '') {
                    var imgPath = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'Photo', test);
                    try {
                        var file = (bIsAndroid) ? Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, 'Photo', test) : Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'Photo', test);
                        if (file.exists()) {
                            var imgPath = file.nativePath;
                            file = null;
                            delete file;
                        } else {
                            test = test.replace('png', 'simg');
                            file = (bIsAndroid) ? Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, 'Photo', test) : Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'Photo', test);
                            if (file.exists()) {
                                var imgPath = file.nativePath;
                                file = null;
                                delete file;
                            } else {
                                file = null;
                                delete file;
                                bImgFound = false;
                                var imgPath = '/images/camdisplay.simg';
                            }
                        }
                        file = null;
                        delete file;
                    } catch (e) {
                        bImgFound = false;
                        var imgPath = '/images/camdisplay.simg';
                    }
                } else {
                    bImgFound = false;
                    var imgPath = '/images/camdisplay.simg';
                }
                var ImgCtrlView = Ti.App.BasicViewObj.createBasicView(null, 'transparent', rowHeight, HeaderDetailsObj.columnWidth + '%', 0, 0, 0, 0, '');
                //var img = new BasicImageView().createImageView(null, Ti.App.ImageCacheObj.getImage('MobileSalesCache', test), formdata.dValueWidth * pWidth, formdata.ValueHeight);
                //P&G
                var img = new BasicImageView().createImageView(null, imgPath, 'auto', 'auto');//formdata.dValueWidth * pWidth, formdata.ValueHeight);
                //var img = new BasicImageView().createImageView(null, Ti.App.ImageCacheObj.getImage('MobileSalesCache', formdata.DefaultValue), 'auto', 'auto');
                //var img = Ti.App.BasicViewObj.createBasicView(null, 'transparent', 'auto', 'auto', 0, 0, 0, 0, '');
                //img.backgroundImage = imgPath;
                img.enableZoomControls = false;
                img.fieldName = HeaderDetailsObj.fieldName;
                img.backgroundColor = sRow_BG_Color;
                img.fieldControl = mFieldControl.name;
                img.rowIndex = iIndex;
                img.iIndex = iIndex;
                img.index = iIndex;
                img.DataMember = HeaderDetailsObj.DataMember.toUpperCase();
                img.dataMember = HeaderDetailsObj.DataMember.toUpperCase();
                img.DataMemberType = HeaderDetailsObj.DataMemberType;
                img.columnWidth = HeaderDetailsObj.columnWidth;
                img.bImgFound = bImgFound;
                img.sControlType = 'TAKEPHOTOWITHPREVIEW';
                img.dLineIndex = dLineIndex;
                img.height = rowHeight;
                img.bMultiplePhoto = false;
                img.imgPath = imgPath;
                img.imgName = test;
                img.screenName = HeaderDetailsObj.screenName;
                ImgCtrlView.top = dTopPos;
                if (HeaderDetailsObj.allignment == 0) {
                    ImgCtrlView.layout = 'vertical';
                } else if (HeaderDetailsObj.allignment == 1) {
                    img.right = 1;//2;
                } else if (HeaderDetailsObj.allignment == 2) {
                    img.left = 1;//2;
                }
                img.addEventListener('click', function (e) {
                    try {
                        if (Ti.App.bFocusedTxtfield != null && Ti.App.bFocusedTxtfield != undefined) {
                            Ti.App.bFocusedTxtfield.blur();
                            Ti.App.bFocusedTxtfield = null;
                            return;
                        }
                        //mController.showCamera(this, e.source.fieldName);
                        if (this.bImgFound == false) {
                            mController.showCamera(this, e.source.fieldName);
                        } else {
                            mController.showPreviewPopup(this, e.source.fieldName);
                        }
                    } catch (e) { }
                });
                ImgCtrlView.add(img);
                vwRowHorizontal.add(ImgCtrlView);
            } else if (mFieldControl.name == 'THUMBNAIL') {//DatePicker
                var bImgFound = true;
                var test = (dataValue == null || dataValue == undefined || dataValue == '') ? formdata.DefaultValue : dataValue;
                test = (test == null || test == undefined || test == '') ? '' : test;
                if (test != '') {
                    var imgPath = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'Photo', test);
                    try {
                        var file = (bIsAndroid) ? Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, 'Photo', test) : Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'Photo', test);
                        if (file.exists()) {
                            var imgPath = file.nativePath;
                            file = null;
                            delete file;
                        } else {
                            test = test.replace('png', 'simg');
                            file = (bIsAndroid) ? Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, 'Photo', test) : Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'Photo', test);
                            if (file.exists()) {
                                var imgPath = file.nativePath;
                                file = null;
                                delete file;
                            } else {
                                file = null;
                                delete file;
                                bImgFound = false;
                                var imgPath = '/images/Thumbnail_Icon.png';
                            }
                        }
                        file = null;
                        delete file;
                    } catch (e) {
                        bImgFound = false;
                        var imgPath = '/images/Thumbnail_Icon.png';
                    }
                } else {
                    bImgFound = false;
                    var imgPath = '/images/Thumbnail_Icon.png';
                }
                var ImgCtrlView = Ti.App.BasicViewObj.createBasicView(null, 'transparent', rowHeight, HeaderDetailsObj.columnWidth + '%', 0, 0, 0, 0, '');
                var img = new BasicImageView().createImageView(null, imgPath, 'auto', 'auto');//formdata.dValueWidth * pWidth, formdata.ValueHeight);
                img.enableZoomControls = false;
                img.fieldName = HeaderDetailsObj.fieldName;
                img.backgroundColor = sRow_BG_Color;
                img.fieldControl = mFieldControl.name;
                img.rowIndex = iIndex;
                img.iIndex = iIndex;
                img.index = iIndex;
                img.DataMember = HeaderDetailsObj.DataMember.toUpperCase();
                img.dataMember = HeaderDetailsObj.DataMember.toUpperCase();
                img.DataMemberType = HeaderDetailsObj.DataMemberType;
                img.columnWidth = HeaderDetailsObj.columnWidth;
                img.bImgFound = bImgFound;
                img.sControlType = 'THUMBNAIL';
                img.dLineIndex = dLineIndex;
                img.height = rowHeight;
                img.bMultiplePhoto = false;
                img.imgPath = imgPath;
                img.imgName = test;
                img.screenName = HeaderDetailsObj.screenName;
                ImgCtrlView.top = dTopPos;
                if (HeaderDetailsObj.allignment == 0) {
                    ImgCtrlView.layout = 'vertical';
                } else if (HeaderDetailsObj.allignment == 1) {
                    img.right = 1;//2;
                } else if (HeaderDetailsObj.allignment == 2) {
                    img.left = 1;//2;
                }
                img.addEventListener('click', function (e) {
                    try {
                        if (Ti.App.bFocusedTxtfield != null && Ti.App.bFocusedTxtfield != undefined) {
                            Ti.App.bFocusedTxtfield.blur();
                            Ti.App.bFocusedTxtfield = null;
                            return;
                        }
                        //if(this.bImgFound == false){
                        //mController.showCamera(this, e.source.fieldName);
                        //}else{
                        mController.showThumbnailPopup(this, e.source.fieldName);
                        //}
                    } catch (e) { }
                });
                ImgCtrlView.add(img);
                vwRowHorizontal.add(ImgCtrlView);
            } else if (mFieldControl.name == 'MULTIPLEPHOTO') {//DatePicker
                var bImgFound = true;
                var test = (dataValue == null || dataValue == undefined || dataValue == '') ? formdata.DefaultValue : dataValue;
                test = (test == null || test == undefined || test == '') ? '' : test;
                if (test != '') {
                    var imgPath = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'Photo', test);
                    try {
                        var file = (bIsAndroid) ? Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, 'Photo', test) : Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'Photo', test);
                        if (file.exists()) {
                            var imgPath = file.nativePath;
                            file = null;
                            delete file;
                        } else {
                            test = test.replace('png', 'simg');
                            file = (bIsAndroid) ? Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, 'Photo', test) : Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'Photo', test);
                            if (file.exists()) {
                                var imgPath = file.nativePath;
                                file = null;
                                delete file;
                            } else {
                                file = null;
                                delete file;
                                bImgFound = false;
                                var imgPath = '/images/camdisplay.png';
                            }
                        }
                        file = null;
                        delete file;
                    } catch (e) {
                        bImgFound = false;
                        var imgPath = '/images/camdisplay.png';
                    }
                } else {
                    bImgFound = false;
                    var imgPath = '/images/camdisplay.png';
                }
                var ImgCtrlView = Ti.App.BasicViewObj.createBasicView(null, 'transparent', rowHeight, HeaderDetailsObj.columnWidth + '%', 0, 0, 0, 0, '');
                var img = new BasicImageView().createImageView(null, imgPath, 'auto', 'auto');//formdata.dValueWidth * pWidth, formdata.ValueHeight);
                img.enableZoomControls = false;
                img.fieldName = HeaderDetailsObj.fieldName;
                img.backgroundColor = sRow_BG_Color;
                img.fieldControl = mFieldControl.name;
                img.rowIndex = iIndex;
                img.iIndex = iIndex;
                img.index = iIndex;
                img.DataMember = HeaderDetailsObj.DataMember.toUpperCase();
                img.dataMember = HeaderDetailsObj.DataMember.toUpperCase();
                img.DataMemberType = HeaderDetailsObj.DataMemberType;
                img.columnWidth = HeaderDetailsObj.columnWidth;
                img.bImgFound = bImgFound;
                img.sControlType = 'MULTIPLEPHOTO';
                img.dLineIndex = dLineIndex;
                img.height = rowHeight;
                img.bMultiplePhoto = false;
                img.imgPath = imgPath;
                img.imgName = test;
                img.screenName = HeaderDetailsObj.screenName;
                ImgCtrlView.top = dTopPos;
                if (HeaderDetailsObj.allignment == 0) {
                    ImgCtrlView.layout = 'vertical';
                } else if (HeaderDetailsObj.allignment == 1) {
                    img.right = 1;//2;
                } else if (HeaderDetailsObj.allignment == 2) {
                    img.left = 1;//2;
                }
                img.addEventListener('click', function (e) {
                    try {
                        if (Ti.App.bFocusedTxtfield != null && Ti.App.bFocusedTxtfield != undefined) {
                            Ti.App.bFocusedTxtfield.blur();
                            Ti.App.bFocusedTxtfield = null;
                            return;
                        }
                        if (COMMON.isPlatformAndroid()) {
                            Ti.UI.Android.hideSoftKeyboard();
                        }
                        //if(this.bImgFound == false){
                        //mController.showCamera(this, e.source.fieldName);
                        //}else{
                        mController.showPreviewPopup(this, e.source.fieldName);

                        /*if(this.bImgFound == false){
                            mController.showCamera(this, e.source.fieldName);
                        }else{
                            mController.showPreviewPopup(this, e.source.fieldName);
                        }*/
                        //}
                    } catch (e) { }
                });
                ImgCtrlView.add(img);
                vwRowHorizontal.add(ImgCtrlView);
            } else if (mFieldControl.name == 'CAMERABUTTON') {//DatePicker
                var imgPath = Ti.App.ImageCacheObj.getImage('MobileSalesCache', dataValue);
                var img = new BasicImageView().createImageView(null, imgPath, 'auto', 'auto'); //'auto',rowHeight);
                img.enableZoomControls = false;
                img.left = dLeftPos + '%';//0;
                img.top = dTopPos;
                img.backgroundColor = sRow_BG_Color;//'transparent';
                img.fieldControl = mFieldControl.name;
                img.rowIndex = iIndex;
                img.iIndex = iIndex;
                img.DataMember = HeaderDetailsObj.DataMember.toUpperCase();
                img.DataMemberType = HeaderDetailsObj.DataMemberType;
                img.fieldName = HeaderDetailsObj.fieldName;
                img.columnWidth = HeaderDetailsObj.columnWidth;
                img.dLineIndex = dLineIndex;
                img.addEventListener('touchstart', function (e) {
                    //mView.disabledFormScrollView();
                });
                img.addEventListener('touchend', function (e) {
                    //mView.enabledFormScrollView();
                });
                img.addEventListener('click', function (e) {
                    try {
                        var _this = this;
                        Titanium.Media.showCamera({
                            success: function (event) {
                                try {
                                    var imgname = 'tmp.png', image = event.media;
                                    var bIsAndroid = COMMON.isPlatformAndroid();
                                    if (bIsAndroid) {//COMMON.isPlatformAndroid()) {
                                        //ImageFactory = require('ti.imagefactory');
                                        //image = ImageFactory.compress(image, 0.25);
                                        //image = ImageFactory.imageAsResized(image, { width: 320, height: 240 });
                                    }
                                    var file = null;
                                    /*if (bIsAndroid) {
                                        var folder = Titanium.Filesystem.getFile('file:///mnt/sdcard/com.simplrsales', 'Photo');
                                        COMMONLog('folder.nativePath ---> ' + folder.nativePath);
                                        if (!folder.exists()) {
                                                folder.createDirectory();
                                        }
                                        file = Titanium.Filesystem.getFile(folder.nativePath, imgname);
                                        
                                    } else {
                                        file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, imgname);
                                    }
                                     
                                    if(file.exists()) {
                                        file.deleteFile();
                                    }
                                     
                                    file.write(image);
                                     */
                                    _this.image = '';
                                    _this.url = '';
                                    _this.image = '/images/Photo_Green.png';
                                    _this.url = '/images/Photo_Green.png';
                                    _this.height = 'auto';
                                    _this.width = 'auto';
                                    file = null;
                                    image = null;
                                } catch (e) { }
                            }, cancel: function () {
                                COMMONLog('Cancelled ');
                            },
                            error: function (error) {
                                if (error.code == Titanium.Media.NO_CAMERA) {
                                    COMMON.showAlert('Device does not have video recording capabilities', ['OK'], null);
                                } else {
                                    COMMON.showAlert('Unexpected error: ' + error.code, ['OK'], null);
                                }
                            },
                            mediaTypes: [Ti.Media.MEDIA_TYPE_PHOTO]
                        });
                    } catch (e) { }
                });
                vwRowHorizontal.add(img);
            } else if (mFieldControl.name == 'OPTIONBUTTON') {//DatePicker
                var checkBox = new BasicCheckBoxButton().createBasicCheckBoxButton(dataValue, HeaderDetailsObj.allignment);
                checkBox.value = (dataValue == null || dataValue == undefined || dataValue == "" || dataValue == 0 || dataValue == "0" || dataValue == "false" || dataValue == false) ? false : true;
                checkBox.index = iIndex;
                checkBox.backgroundColor = sRow_BG_Color;//'transparent';
                checkBox.fieldControl = mFieldControl.name;
                checkBox.DataMember = HeaderDetailsObj.DataMember.toUpperCase();
                checkBox.DataMemberType = HeaderDetailsObj.DataMemberType.toUpperCase();
                checkBox.fieldName = HeaderDetailsObj.fieldName;
                checkBox.iIndex = iIndex;
                checkBox.left = (dLeftPos + 4) + '%';
                checkBox.top = dTopPos;
                checkBox.columnWidth = HeaderDetailsObj.columnWidth;
                checkBox.height = rowHeight;
                checkBox.defaultValue = (dataValue == null || dataValue == undefined || dataValue == "" || dataValue == 0 || dataValue == "0" || dataValue == "false" || dataValue == false) ? false : true;
                checkBox.dLineIndex = dLineIndex;
                if (mFieldControl.isEditable) {
                    checkBox.touchEnabled = true;
                } else {
                    checkBox.touchEnabled = false;
                }
                if (Ti.Platform.name == 'android') {
                    checkBox.addEventListener('click', checkboxevent1);
                } else {
                    checkBox.addEventListener('change', checkboxevent1);
                }
                function checkboxevent1(e) {
                    try {
                        try {
                            var bflagOption = mController.checkBoxEditable(this.iIndex, this.value);
                            COMMONLog('bflagOption --> ' + bflagOption);
                            COMMONLog('this.defaultValue ---> ' + this.defaultValue);
                            if (!bflagOption) {// && bflagOption != ''){
                                this.value = this.defaultValue;
                                return false;
                            }
                            if (COMMON.avoidMultipleClick()) {
                                return '';
                            }
                        } catch (e) { }
                        COMMONLog("this.iIndex checkboxevent --> " + this.iIndex);
                        mController.checkBoxValueChanged(this.iIndex, this.value, this.fieldName);
                    } catch (e) { }
                }
                vwRowHorizontal.add(checkBox);
            } else if (mFieldControl.name == 'PROGRESSBAR') {
                var statusWidth = commonObj.tblColumnWidth + '%';
                var status = new BasicProgressBar().createBasicProgressBar(statusWidth, 0, 10, 0, 'Loading...');
                status.backgroundColor = 'transparent';
                status.color = '#888';
                status.show();
                status.fieldControl = mFieldControl.name;
                status.DataMember = HeaderDetailsObj.DataMember.toUpperCase();
                status.DataMemberType = HeaderDetailsObj.DataMemberType.toUpperCase();
                vwRowHorizontal.add(status);
            } else if (mFieldControl.name == 'BUTTON') {
                COMMONLog('BUTTON : HeaderDetailsObj.columnWidth : ' + HeaderDetailsObj.columnWidth);
                //var rowButton = commonObj.BasicButtonObj.createButton('', iIconWidth-1 , iIconHeight-4, null, '#e8e8e8');
                var rowButton = commonObj.BasicButtonObj.createButton(' + ', 40, 40, null, '#e8e8e8');
                if (HeaderDetailsObj.columnWidth == 0) {
                    rowButton.width = 0;
                }
                rowButton.fieldControl = mFieldControl.name;
                rowButton.iIndex = iIndex;
                rowButton.DataMember = HeaderDetailsObj.DataMember.toUpperCase();
                rowButton.DataMemberType = HeaderDetailsObj.DataMemberType.toUpperCase();
                rowButton.fieldName = HeaderDetailsObj.fieldName;
                rowButton.left = dLeftPos + '%';
                rowButton.top = dTopPos;
                rowButton.addEventListener('click', function (e) {
                    try {
                        if (mView != null && mView != undefined) {
                            mView.setselectedRowIndex(e.source.iIndex);
                        }
                        mController.tblRowButtonPressed(this, e.source.DataMember, e.source.iIndex);
                    } catch (e) { }
                });
                vwRowHorizontal.add(rowButton);
            } else if (mFieldControl.name == 'MSGBUTTON') {
                var rowButton = commonObj.BasicButtonObj.createButton('', iIconWidth - 1, iIconHeight - 3, null, '#e8e8e8');
                rowButton.backgroundImage = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'env.simg');//delete.simg
                rowButton.backgroundColor = 'transparent';
                rowButton.fieldControl = mFieldControl.name;
                rowButton.iIndex = iIndex;
                rowButton.DataMember = HeaderDetailsObj.DataMember.toUpperCase();
                rowButton.DataMemberType = HeaderDetailsObj.DataMemberType.toUpperCase();
                rowButton.left = dLeftPos + '%';
                rowButton.top = dTopPos;
                rowButton.dLineIndex = dLineIndex;
                rowButton.addEventListener('click', function (e) {
                    try {
                        if (mView != null && mView != undefined) {
                            mView.setselectedRowIndex(e.source.iIndex);
                        }
                        mController.tblRowButtonPressed(this, e.source.DataMember, e.source.iIndex);
                    } catch (e) { }
                });
                vwRowHorizontal.add(rowButton);
            } else if (mFieldControl.name == 'QUESBUTTON') {
                var rowButton = commonObj.BasicButtonObj.createButton('', iIconWidth - 1, iIconHeight - 3, null, '#e8e8e8');
                rowButton.backgroundImage = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'ques.simg');//delete.simg
                rowButton.backgroundColor = 'transparent';
                rowButton.fieldControl = mFieldControl.name;
                rowButton.iIndex = iIndex;
                rowButton.DataMember = HeaderDetailsObj.DataMember.toUpperCase();
                rowButton.DataMemberType = HeaderDetailsObj.DataMemberType.toUpperCase();
                rowButton.left = dLeftPos + '%';
                rowButton.top = dTopPos;
                rowButton.dLineIndex = dLineIndex;
                rowButton.addEventListener('click', function (e) {
                    try {
                        if (mView != null && mView != undefined) {
                            mView.setselectedRowIndex(e.source.iIndex);
                        }
                        mController.tblRowButtonPressed(this, e.source.DataMember, e.source.iIndex);
                    } catch (e) { }
                });
                vwRowHorizontal.add(rowButton);
            } else if (mFieldControl.name == 'DELBUTTON') {
                //var rowButton = commonObj.BasicButtonObj.createButton('', iIconWidth, iIconHeight, null, '#e8e8e8');
                var rowButton = commonObj.BasicButtonObj.createButton('', 40, 40, null, 'transparent');
                rowButton.backgroundImage = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'delete.simg');//delete.simg
                rowButton.backgroundColor = sRow_BG_Color;//'transparent';
                rowButton.fieldControl = mFieldControl.name;
                rowButton.iIndex = iIndex;
                rowButton.left = dLeftPos + '%';
                rowButton.top = dTopPos;
                rowButton.fieldName = HeaderDetailsObj.fieldName.toUpperCase();
                rowButton.DataMember = HeaderDetailsObj.DataMember.toUpperCase();
                rowButton.DataMemberType = HeaderDetailsObj.DataMemberType.toUpperCase();
                rowButton.sScreenName = screenName;
                rowButton.dLineIndex = dLineIndex;
                rowButton.addEventListener('click', function (e) {
                    try {
                        if (mView != null && mView != undefined) {
                            mView.setselectedRowIndex(e.source.iIndex);
                        }
                        mController.tblRowDelButtonPressed(this, e.source.DataMember, e.source.iIndex);
                    } catch (e) { }
                });
                vwRowHorizontal.add(rowButton);
            } else if (mFieldControl.name == 'IMAGE') {
                try {
                    if (dataValue == "unreadMsg.simg" || dataValue == "unreadMsg.png") {
                        //var ImgCtrlView = Ti.App.BasicViewObj.createBasicView(null, 'transparent', Ti.UI.SIZE, 'auto', 0, 0, null, null, 'horizontal');
                        var ImgCtrlView = Ti.App.BasicViewObj.createBasicView(null, 'transparent', rowHeight, HeaderDetailsObj.columnWidth + '%', 0, 0, 0, 0, '');
                        ImgCtrlView.left = dLeftPos + '%';//0;
                        ImgCtrlView.top = dTopPos + 3;
                        ImgCtrlView.fieldControl = mFieldControl.name;
                        ImgCtrlView.rowIndex = iIndex;
                        ImgCtrlView.iIndex = iIndex;
                        ImgCtrlView.DataMember = HeaderDetailsObj.DataMember.toUpperCase();
                        ImgCtrlView.DataMemberType = HeaderDetailsObj.DataMemberType;
                        ImgCtrlView.columnWidth = HeaderDetailsObj.columnWidth;
                        ImgCtrlView.dLineIndex = dLineIndex;
                        var img = new BasicImageView().createImageView(null, Ti.App.ImageCacheObj.getImage('MobileSalesCache', dataValue), 'auto', 'auto'); //'auto',rowHeight);
                        img.enableZoomControls = false;
                        if (dataValue == 'camera.png') {
                            img.height = rowHeight;
                        }
                        img.backgroundColor = sRow_BG_Color;//'transparent';
                        img.fieldControl = mFieldControl.name;
                        img.rowIndex = iIndex;
                        img.iIndex = iIndex;
                        img.DataMember = HeaderDetailsObj.DataMember.toUpperCase();
                        img.DataMemberType = HeaderDetailsObj.DataMemberType;
                        img.columnWidth = HeaderDetailsObj.columnWidth;
                        //ImgCtrlView.addEventListener('touchstart',function(e){
                        //mView.disabledFormScrollView();
                        //});
                        ImgCtrlView.addEventListener('touchend', function (e) {
                            //mView.enabledFormScrollView();
                        });
                        ImgCtrlView.addEventListener('touchstart', function (e) {
                            try {
                                if (mView != null && mView != undefined) {
                                    mView.setselectedRowIndex(e.source.iIndex);
                                }
                                mController.tblRowImagePressed(this, e.source.DataMember, e.source.iIndex);
                            } catch (e) { }
                        });
                        ImgCtrlView.add(img);
                        var dMsgCount = 0;
                        try {
                            dMsgCount = ' ' + item.fieldByName('MsgCount') + ' ';
                        } catch (e) {
                            dMsgCount = 0;
                        }
                        if (dMsgCount > 0) {
                            //var label = commonObj.BasicLabelObj.createLabel(dMsgCount, Ti.UI.SIZE, 16, 10, '', 'normal', '#f00', '#ff0', 0, 0);
                            var label = commonObj.BasicLabelObj.createLabel(dMsgCount, 20, 20, 12, '', 'normal', '#f00', '#ff0', 0, 0);
                            label.borderRadius = 8;
                            label.bottom = -2;
                            //label.left = -10;
                            label.right = 8;
                            label.rowIndex = iIndex;
                            label.iIndex = iIndex;
                            label.fieldControl = mFieldControl.name;
                            label.rowIndex = iIndex;
                            label.iIndex = iIndex;
                            label.DataMember = HeaderDetailsObj.DataMember.toUpperCase();
                            label.DataMemberType = HeaderDetailsObj.DataMemberType;
                            label.columnWidth = HeaderDetailsObj.columnWidth;
                            /*label.addEventListener('click', function(e){
                                try{
                                    if(mView != null && mView != undefined){
                                        mView.setselectedRowIndex(e.source.iIndex);
                                    }
                                    mController.tblRowImagePressed(this, e.source.DataMember, e.source.iIndex);
                                }catch(e){
                                    
                                }
                            });*/
                            ImgCtrlView.add(label);
                        }
                        vwRowHorizontal.add(ImgCtrlView);
                    } else {
                        if (dLineIndex > 0) {
                            var ImgCtrlView = Ti.App.BasicViewObj.createBasicView(null, 'transparent', rowHeight, HeaderDetailsObj.columnWidth + '%', 0, 0, 0, 0, '');
                            ImgCtrlView.left = dLeftPos + '%';//0;
                            if (dLineIndex == 1) {
                                ImgCtrlView.top = dTopPos + 5;
                            } else {
                                ImgCtrlView.top = dTopPos - 3;
                            }
                            COMMONLog(' columnWidth  : (' + HeaderDetailsObj.columnWidth + ' * ' + widthRatio + ' *  100 / ' + headerListLength + ') - rowHeight : ' + rowHeight);
                            COMMONLog(' WIDTH : ' + commonObj.tblColumnWidth + ' - rowHeight : ' + rowHeight);
                            var img = new BasicImageView().createImageView(null, Ti.App.ImageCacheObj.getImage('MobileSalesCache', dataValue), 'auto', 'auto'); //'auto',rowHeight);
                            img.enableZoomControls = false;
                            if (HeaderDetailsObj.allignment == 0) {
                                ImgCtrlView.layout = 'vertical';
                            } else if (HeaderDetailsObj.allignment == 1) {
                                img.right = 1;//2;
                            } else if (HeaderDetailsObj.allignment == 2) {
                                img.left = 1;//2;
                            }
                            if (dataValue == 'camera.png') {
                                img.height = rowHeight;
                            }
                            img.backgroundColor = sRow_BG_Color;//'transparent';
                            img.fieldControl = mFieldControl.name;
                            img.rowIndex = iIndex;
                            img.iIndex = iIndex;
                            img.DataMember = HeaderDetailsObj.DataMember.toUpperCase();
                            img.DataMemberType = HeaderDetailsObj.DataMemberType;
                            img.columnWidth = HeaderDetailsObj.columnWidth;
                            ImgCtrlView.add(img);

                            ImgCtrlView.fieldControl = mFieldControl.name;
                            ImgCtrlView.rowIndex = iIndex;
                            ImgCtrlView.iIndex = iIndex;
                            ImgCtrlView.DataMember = HeaderDetailsObj.DataMember.toUpperCase();
                            ImgCtrlView.DataMemberType = HeaderDetailsObj.DataMemberType;
                            ImgCtrlView.columnWidth = HeaderDetailsObj.columnWidth;
                            ImgCtrlView.addEventListener('touchstart', function (e) {
                                //mView.disabledFormScrollView();
                            });
                            ImgCtrlView.addEventListener('touchend', function (e) {
                                //mView.enabledFormScrollView();
                            });
                            ImgCtrlView.addEventListener('click', function (e) {
                                try {
                                    if (mView != null && mView != undefined) {
                                        mView.setselectedRowIndex(e.source.iIndex);
                                    }
                                    mController.tblRowImagePressed(this, e.source.DataMember, e.source.iIndex);
                                } catch (e) { }
                            });
                            vwRowHorizontal.add(ImgCtrlView);
                        } else {
                            var imgPath = Ti.App.ImageCacheObj.getImage('MobileSalesCache', dataValue);
                            if (screenName.toUpperCase() == 'CATALOG') {
                                var _item = item.fieldByName('itemid');
                                //if(_item == 'K615268' || _item == 'K688781' || _item == 'K847005' || _item == 'K960175' || _item == 'ZF110580'){
                                /*if(iIndex < 6 && iIndex > 0 ){        
                                    var imgPath = "/images/Items/" + iIndex + ".jpg";
                                }else{
                                    var imgPath = "/images/default_Dash.png";
                                }*/
                                var imgPath = null;

                                /*if(Ti.App.ImageCacheObj.getImage("/Items/"+_item+".jpg")){
                                    //var imgPath = Ti.App.ImageCacheObj.getImage('MobileSalesCache',_item+".jpg");
                                    var imgPath = Ti.App.ImageCacheObj.getImage('MobileSalesCache',"/Items/"+_item+".jpg");
                                }else if(Ti.App.ImageCacheObj.getImage("/Images/"+_item+".jpg")){
                                    var imgPath = Ti.App.ImageCacheObj.getImage("/Images/"+_item+".jpg");
                                }else{
                                    var imgPath = Ti.App.ImageCacheObj.getImage("/Items/NoImage.jpg");
                                } */

                                try {
                                    var imgPath = Ti.App.ImageCacheObj.getImage('MobileSalesCache', _item + ".jpg");
                                    if (imgPath.indexOf('/images/') !== -1) {
                                        var imgPath = Ti.App.ImageCacheObj.getImage('MobileSalesCache', "NoImage.jpg");
                                    }
                                } catch (e) {
                                    Ti.API.info('imgPath error -> ' + e);
                                }



                                Ti.API.info('imgPath -> ' + imgPath);
                                /*
                                file = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory,'Items', imageName);
                        
                                if(file.exists()){
                                    file = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory,'Items', imageName);
                                }else{
                                    file = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory,'Images', imageName);
                                }
                                
                                if(!file.exists()){
                                    file = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory,'Items', 'NoImage.jpg');
                                }
                                
                                file.read();
                                imgPath = file.nativePath(); */
                            }
                            var img = new BasicImageView().createImageView(null, imgPath, 'auto', rowHeight); //'auto',rowHeight);
                            img.enableZoomControls = false;
                            if (dataValue == 'camera.png') {
                                img.height = rowHeight;
                            }
                            img.left = dLeftPos + '%';//0;
                            img.top = dTopPos;
                            img.backgroundColor = sRow_BG_Color;//'transparent';
                            img.fieldControl = mFieldControl.name;
                            img.rowIndex = iIndex;
                            img.iIndex = iIndex;
                            img.DataMember = HeaderDetailsObj.DataMember.toUpperCase();
                            img.DataMemberType = HeaderDetailsObj.DataMemberType;
                            img.columnWidth = HeaderDetailsObj.columnWidth;
                            img.dLineIndex = dLineIndex;
                            img.addEventListener('touchstart', function (e) {
                                //mView.disabledFormScrollView();
                            });
                            img.addEventListener('touchend', function (e) {
                                //mView.enabledFormScrollView();
                            });
                            img.addEventListener('click', function (e) {
                                try {
                                    if (mView != null && mView != undefined) {
                                        mView.setselectedRowIndex(e.source.iIndex);
                                    }
                                    mController.tblRowImagePressed(this, e.source.DataMember, e.source.iIndex);
                                } catch (e) { }
                            });
                            vwRowHorizontal.add(img);
                        }
                    }
                } catch (e) { }
            } else if (mFieldControl.name == 'IMAGEWITHPREVIEW') {
                var imgPathArr = [];
                try {
                    if (dataValue == "unreadMsg.simg" || dataValue == "unreadMsg.png") {
                        //var ImgCtrlView = Ti.App.BasicViewObj.createBasicView(null, 'transparent', Ti.UI.SIZE, 'auto', 0, 0, null, null, 'horizontal');
                        var ImgCtrlView = Ti.App.BasicViewObj.createBasicView(null, 'transparent', rowHeight, HeaderDetailsObj.columnWidth + '%', 0, 0, 0, 0, '');
                        ImgCtrlView.left = dLeftPos + '%';//0;
                        ImgCtrlView.top = dTopPos + 3;
                        ImgCtrlView.fieldControl = mFieldControl.name;
                        ImgCtrlView.rowIndex = iIndex;
                        ImgCtrlView.iIndex = iIndex;
                        ImgCtrlView.DataMember = HeaderDetailsObj.DataMember.toUpperCase();
                        ImgCtrlView.DataMemberType = HeaderDetailsObj.DataMemberType;
                        ImgCtrlView.columnWidth = HeaderDetailsObj.columnWidth;
                        ImgCtrlView.dLineIndex = dLineIndex;
                        var img = new BasicImageView().createImageView(null, Ti.App.ImageCacheObj.getImage('MobileSalesCache', dataValue), 'auto', 'auto'); //'auto',rowHeight);
                        img.enableZoomControls = false;
                        if (dataValue == 'camera.png') {
                            img.height = rowHeight;
                        }
                        img.backgroundColor = sRow_BG_Color;//'transparent';
                        img.fieldControl = mFieldControl.name;
                        img.rowIndex = iIndex;
                        img.iIndex = iIndex;
                        img.DataMember = HeaderDetailsObj.DataMember.toUpperCase();
                        img.DataMemberType = HeaderDetailsObj.DataMemberType;
                        img.columnWidth = HeaderDetailsObj.columnWidth;
                        //ImgCtrlView.addEventListener('touchstart',function(e){
                        //mView.disabledFormScrollView();
                        //});
                        ImgCtrlView.addEventListener('touchend', function (e) {
                            //mView.enabledFormScrollView();
                        });
                        ImgCtrlView.addEventListener('touchstart', function (e) {
                            try {
                                if (mView != null && mView != undefined) {
                                    mView.setselectedRowIndex(e.source.iIndex);
                                }
                                mController.tblRowImagePressed(this, e.source.DataMember, e.source.iIndex);
                            } catch (e) { }
                        });
                        ImgCtrlView.add(img);
                        var dMsgCount = 0;
                        try {
                            dMsgCount = ' ' + item.fieldByName('MsgCount') + ' ';
                        } catch (e) {
                            dMsgCount = 0;
                        }
                        if (dMsgCount > 0) {
                            //var label = commonObj.BasicLabelObj.createLabel(dMsgCount, Ti.UI.SIZE, 16, 10, '', 'normal', '#f00', '#ff0', 0, 0);
                            var label = commonObj.BasicLabelObj.createLabel(dMsgCount, 20, 20, 12, '', 'normal', '#f00', '#ff0', 0, 0);
                            label.borderRadius = 8;
                            label.bottom = -2;
                            //label.left = -10;
                            label.right = 8;
                            label.rowIndex = iIndex;
                            label.iIndex = iIndex;
                            label.fieldControl = mFieldControl.name;
                            label.rowIndex = iIndex;
                            label.iIndex = iIndex;
                            label.DataMember = HeaderDetailsObj.DataMember.toUpperCase();
                            label.DataMemberType = HeaderDetailsObj.DataMemberType;
                            label.columnWidth = HeaderDetailsObj.columnWidth;
                            /*label.addEventListener('click', function(e){
                                try{
                                    if(mView != null && mView != undefined){
                                        mView.setselectedRowIndex(e.source.iIndex);
                                    }
                                    mController.tblRowImagePressed(this, e.source.DataMember, e.source.iIndex);
                                }catch(e){
                                    
                                }
                            });*/
                            ImgCtrlView.add(label);
                        }
                        vwRowHorizontal.add(ImgCtrlView);
                    } else {
                        if (dLineIndex > 0) {
                            var ImgCtrlView = Ti.App.BasicViewObj.createBasicView(null, 'transparent', rowHeight, HeaderDetailsObj.columnWidth + '%', 0, 0, 0, 0, '');
                            ImgCtrlView.left = dLeftPos + '%';//0;
                            if (dLineIndex == 1) {
                                ImgCtrlView.top = dTopPos + 5;
                            } else {
                                ImgCtrlView.top = dTopPos - 3;
                            }
                            COMMONLog(' columnWidth  : (' + HeaderDetailsObj.columnWidth + ' * ' + widthRatio + ' *  100 / ' + headerListLength + ') - rowHeight : ' + rowHeight);
                            COMMONLog(' WIDTH : ' + commonObj.tblColumnWidth + ' - rowHeight : ' + rowHeight);
                            var img = new BasicImageView().createImageView(null, Ti.App.ImageCacheObj.getImage('MobileSalesCache', dataValue), 'auto', 'auto'); //'auto',rowHeight);
                            img.enableZoomControls = false;
                            if (HeaderDetailsObj.allignment == 0) {
                                ImgCtrlView.layout = 'vertical';
                            } else if (HeaderDetailsObj.allignment == 1) {
                                img.right = 1;//2;
                            } else if (HeaderDetailsObj.allignment == 2) {
                                img.left = 1;//2;
                            }
                            if (dataValue == 'camera.png') {
                                img.height = rowHeight;
                            }
                            img.backgroundColor = sRow_BG_Color;//'transparent';
                            img.fieldControl = mFieldControl.name;
                            img.rowIndex = iIndex;
                            img.iIndex = iIndex;
                            img.DataMember = HeaderDetailsObj.DataMember.toUpperCase();
                            img.DataMemberType = HeaderDetailsObj.DataMemberType;
                            img.columnWidth = HeaderDetailsObj.columnWidth;
                            ImgCtrlView.add(img);

                            ImgCtrlView.fieldControl = mFieldControl.name;
                            ImgCtrlView.rowIndex = iIndex;
                            ImgCtrlView.iIndex = iIndex;
                            ImgCtrlView.DataMember = HeaderDetailsObj.DataMember.toUpperCase();
                            ImgCtrlView.DataMemberType = HeaderDetailsObj.DataMemberType;
                            ImgCtrlView.columnWidth = HeaderDetailsObj.columnWidth;
                            ImgCtrlView.addEventListener('touchstart', function (e) {
                                Ti.API.info("touchstart ");
                                //mView.disabledFormScrollView();
                                var file = (bIsAndroid) ? Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, test) : Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, dataValue);
                                if (file.exists()) {
                                    var imgPath = file.nativePath;
                                    file = null;
                                    imgPathArr.push(imgPath);
                                } else {
                                    var imgPath = '/images/' + test;
                                    file = null;
                                    imgPathArr.push(imgPath);
                                }
                                var imgArr = [];
                                //imgArr.push(dirItems[i]);                     
                                obj = {};
                                obj.sArrItems = imgArr;
                                obj.sImagePathArr = imgPathArr;
                                Ti.API.info("imgPathArr1 " + imgPathArr);
                                obj.index = 0;
                                Ti.API.info("Gallery Screen");
                                Ti.App.sItemNo = '';
                                var BasicPopUp = require('/BaseComponents/PreviewPopupGallery');
                                new BasicPopUp().show('Preview', this, obj, imgPathArr);


                            });
                            ImgCtrlView.addEventListener('touchend', function (e) {
                                //mView.enabledFormScrollView();
                            });
                            ImgCtrlView.addEventListener('click', function (e) {

                                Ti.API.info("click ");


                                try {
                                    if (mView != null && mView != undefined) {
                                        mView.setselectedRowIndex(e.source.iIndex);
                                    }
                                    mController.tblRowImagePressed(this, e.source.DataMember, e.source.iIndex);
                                } catch (e) { Ti.API.info("error " + e); }
                            });
                            vwRowHorizontal.add(ImgCtrlView);
                        } else {
                            var imgPath = Ti.App.ImageCacheObj.getImage('MobileSalesCache', dataValue);
                            if (screenName.toUpperCase() == 'CATALOG') {
                                var _item = item.fieldByName('itemid');
                                //if(_item == 'K615268' || _item == 'K688781' || _item == 'K847005' || _item == 'K960175' || _item == 'ZF110580'){
                                /*if(iIndex < 6 && iIndex > 0 ){        
                                    var imgPath = "/images/Items/" + iIndex + ".jpg";
                                }else{
                                    var imgPath = "/images/default_Dash.png";
                                }*/
                                var imgPath = Ti.App.ImageCacheObj.getImage('MobileSalesCache', _item + ".jpg");
                            }
                            var img = new BasicImageView().createImageView(null, imgPath, 'auto', rowHeight); //'auto',rowHeight);
                            img.enableZoomControls = false;
                            if (dataValue == 'camera.png') {
                                img.height = rowHeight;
                            }
                            img.left = dLeftPos + '%';//0;
                            img.top = dTopPos;
                            img.backgroundColor = sRow_BG_Color;//'transparent';
                            img.fieldControl = mFieldControl.name;
                            img.rowIndex = iIndex;
                            img.iIndex = iIndex;
                            img.DataMember = HeaderDetailsObj.DataMember.toUpperCase();
                            img.DataMemberType = HeaderDetailsObj.DataMemberType;
                            img.columnWidth = HeaderDetailsObj.columnWidth;
                            img.dLineIndex = dLineIndex;
                            img.dataValue = dataValue;
                            img.addEventListener('touchstart', function (e) {
                                //mView.disabledFormScrollView();                                                               
                            });
                            img.addEventListener('touchend', function (e) {
                                //mView.enabledFormScrollView();
                            });
                            img.addEventListener('click', function (e) {
                                imgPathArr = [];
                                try {
                                    var file = (bIsAndroid) ? Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, e.source.dataValue) : Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, e.source.dataValue);
                                    if (file.exists()) {
                                        var imgPath = file.nativePath;
                                        file = null;
                                        imgPathArr.push(imgPath);
                                    } else {
                                        var imgPath = '/images/' + e.source.dataValue;
                                        file = null;
                                        file = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, imgPath);
                                        imgPathArr.push(file.nativePath);
                                    }
                                    var imgArr = [];
                                    //imgArr.push(dirItems[i]);                     
                                    obj = {};
                                    obj.sArrItems = imgArr;
                                    obj.sImagePathArr = imgPathArr;
                                    Ti.API.info("imgPathArr1 " + imgPathArr);
                                    obj.index = 0;
                                    Ti.API.info("Gallery Screen");
                                    Ti.App.sItemNo = '';
                                    var BasicPopUp = require('/BaseComponents/PreviewPopupGallery');
                                    new BasicPopUp().show('Preview', this, obj, imgPathArr);

                                    if (mView != null && mView != undefined) {
                                        mView.setselectedRowIndex(e.source.iIndex);
                                    }
                                    mController.tblRowImagePressed(this, e.source.DataMember, e.source.iIndex);
                                } catch (e) { }
                            });
                            vwRowHorizontal.add(img);
                        }
                    }
                } catch (e) { }
            } else if (mFieldControl.name == 'SWITCH') {
                try {
                    var flag = dataValue;
                    var toggleOn = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'toggleOn.png');
                    var toggleOff = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'toggleOff.png');
                    if (flag == 0 || flag == '0' || flag == null || flag == '' || flag == undefined) {
                        toggleBtn = new BasicImageView().createImageView(null, toggleOff, 'auto', 'auto'); //'auto',rowHeight);
                        toggleBtn.switchValue = false;
                    } else {
                        toggleBtn = new BasicImageView().createImageView(null, toggleOn, 'auto', 'auto'); //'auto',rowHeight);
                        toggleBtn.switchValue = true;
                    }
                    toggleBtn.left = dLeftPos + '%';//0;
                    toggleBtn.top = dTopPos;//0;
                    toggleBtn.backgroundColor = sRow_BG_Color;//'transparent';
                    toggleBtn.fieldControl = mFieldControl.name;
                    toggleBtn.rowIndex = iIndex;
                    toggleBtn.iIndex = iIndex;
                    toggleBtn.DataMember = HeaderDetailsObj.DataMember.toUpperCase();
                    toggleBtn.DataMemberType = HeaderDetailsObj.DataMemberType;
                    toggleBtn.columnWidth = HeaderDetailsObj.columnWidth;
                    toggleBtn.dLineIndex = dLineIndex;
                    toggleBtn.addEventListener('click', function (e) {
                        try {
                            COMMONLog("Before : Flag ----> " + flag);
                            COMMONLog("RowIndex --> " + e.source.iIndex);
                            if (mView != null && mView != undefined) {
                                mView.setselectedRowIndex(e.source.iIndex);
                            }
                            if (flag == 0 || flag == '0' || flag == null || flag == '' || flag == undefined) {
                                e.source.image = toggleOn;
                                e.source.switchValue = true;
                                flag = 1;
                                COMMONLog("On");
                                COMMONLog("After : Flag ----> " + flag);
                                try {
                                    mController.toggleBtnChanged(e.source.iIndex, true, this);
                                } catch (e) { }
                            } else {
                                e.source.image = toggleOff;
                                e.source.switchValue = false;
                                flag = 0;
                                COMMONLog("Off");
                                COMMONLog("After : Flag ----> " + flag);
                                try {
                                    mController.toggleBtnChanged(e.source.iIndex, false, this);
                                } catch (e) { }
                            }
                        } catch (e) { }
                    });
                    vwRowHorizontal.add(toggleBtn);
                } catch (e) { }
            } else if (mFieldControl.name == 'MULTILINE') {
                COMMONLog('MULTILINE');
                //if(screenName.toUpperCase() == 'CATALOG'){
                //var sRowMultiLineView = Ti.App.BasicViewObj.createBasicView(null, 'transparent', (120 * Ti.App.dHeightRatio), commonObj.tblColumnWidth + '%', 0, 0, null, null, 'vertical');
                //}else{
                var sRowMultiLineView = Ti.App.BasicViewObj.createBasicView(null, 'transparent', (100 * Ti.App.dHeightRatio), commonObj.tblColumnWidth + '%', 0, 0, null, null, 'vertical');
                //}    
                sRowMultiLineView.borderWidth = 1;
                sRowMultiLineView.left = dLeftPos + '%';
                sRowMultiLineView.top = dTopPos;
                var label = null;
                var sListFieldName = HeaderDetailsObj.fieldName;
                var sListFieldNameArr = sListFieldName.split("##");
                for (var _i = 0; _i < sListFieldNameArr.length; _i++) {

                    if (screenName.toUpperCase() == 'CATALOG') {
                        if (_i == 0) {
                            label = commonObj.BasicLabelObj.createLabel(item.fieldByName(sListFieldNameArr[_i]), '99%', (31 * Ti.App.dHeightRatio), HeaderDetailsObj.fontSize, HeaderDetailsObj.HFont, HeaderDetailsObj.fontStyle, HeaderDetailsObj.rowTextColor, 'transparent', HeaderDetailsObj.allignment, 0);
                        } else if (_i == 1) {
                            label = commonObj.BasicLabelObj.createLabel(item.fieldByName(sListFieldNameArr[_i]) + ' (' + item.fieldByName(sListFieldNameArr[_i + 1]) + ')', '99%', (68 * Ti.App.dHeightRatio), HeaderDetailsObj.fontSize, HeaderDetailsObj.HFont, HeaderDetailsObj.fontStyle, HeaderDetailsObj.rowTextColor, 'transparent', HeaderDetailsObj.allignment, 0);
                            _i = _i + 1;
                        } else {
                            label = commonObj.BasicLabelObj.createLabel(dataValue, '99%', (30 * Ti.App.dHeightRatio), HeaderDetailsObj.fontSize, HeaderDetailsObj.HFont, HeaderDetailsObj.fontStyle, HeaderDetailsObj.rowTextColor, 'transparent', HeaderDetailsObj.allignment, 0);
                        }
                    } else {
                        dataValue = item.fieldByName(sListFieldNameArr[_i]);
                        label = commonObj.BasicLabelObj.createLabel(dataValue, '99%', (33 * Ti.App.dHeightRatio), HeaderDetailsObj.fontSize, HeaderDetailsObj.HFont, HeaderDetailsObj.fontStyle, HeaderDetailsObj.rowTextColor, 'transparent', HeaderDetailsObj.allignment, 0);
                    }
                    sRowMultiLineView.add(label);
                }
                vwRowHorizontal.add(sRowMultiLineView);
            }
            dLeftPos += commonObj.tblColumnWidth;
        } catch (e) {
            COMMONLog(e);
        }
    }
    row.add(vwRowHorizontal);
    COMMONLog('LoadData CreateUI End Time : ' + new Date().getTime());
    if (bColorConfig == true) {
        row.backgroundColor = this.getColorConfig(screenName, 'RowColor', '', item);
    }
    //row.height = 'auto';
    HeaderDetailsObj = {};
    HeaderDetailsObj = null;
    dColorConfigRowIndex = -1;
    dColorConfigRow = null;
    //LOG.debug('Arrayoperation - CreateUI END ' + screenName , 'AvailableMemory : ' + COMMON.availableMemoryInMB());       
    return row;
}


function getColorConfig(screenName, DataMember, dataValue, item) {
    /******** no need for Warburg ****/
    //return 'transparent';
    /*********************************/
    //var ConditionFieldValue = '', CForeColor = '', CBackColor = 'transparent';
    ConditionFieldValue = ''; CForeColor = ''; CBackColor = '';
    try {
        //var sCondArr = COMMONMODEL.CheckColorConfig(screenName, DataMember);
        sCondArr = [];
        sCondArr = getList['ColorConfig_' + screenName];
        if (sCondArr == null || sCondArr == undefined || sCondArr == '') {
            return 'transparent';
        }
        if (sCondArr.length > 0) {
            DataMemberValue = dataValue;
            for (var condCtr = 0; condCtr < sCondArr.length; condCtr++) {
                ConditionFieldValue = '';
                //if(sCondArr[condCtr].ConditionField != '' && sCondArr[condCtr].ConditionField != null){
                //COMMON.Log('COLOR CONFIG COND ---> ' + DataMember + ' == ' + sCondArr[condCtr].FieldName + ' && ' +  sCondArr[condCtr].ConditionField  + ' == ' + sCondArr[condCtr].ConditionValue);
                tmpFieldVal = sCondArr[condCtr].FieldName;
                tmpFieldVal = (tmpFieldVal == null || tmpFieldVal == undefined) ? '' : tmpFieldVal;
                if (DataMember.toUpperCase() == tmpFieldVal.toUpperCase()) {
                    if (sCondArr[condCtr].ConditionField != '' && sCondArr[condCtr].ConditionField != null) {
                        ConditionFieldValue = item[sCondArr[condCtr].ConditionField];
                    }
                    else {
                        ConditionFieldValue = sCondArr[condCtr].ConditionValue;
                    }
                    if (sCondArr[condCtr].Condition == '>') {
                        CForeColor = 'transparent';
                        CBackColor = 'transparent';
                        if (tmpFieldVal.toUpperCase() == 'ROWCOLOR' && parseInt(ConditionFieldValue) > parseInt(sCondArr[condCtr].ConditionValue)) {
                            CForeColor = 'transparent';
                            CBackColor = 'transparent';
                            CForeColor = argbToRGB(sCondArr[condCtr].CForeColor);
                            CBackColor = argbToRGB(sCondArr[condCtr].CBackColor);
                            var _tmpRow = dColorConfigRow;
                            _tmpRow.backgroundColor = CBackColor;
                            return CBackColor + "~" + CForeColor;
                        } else if (tmpFieldVal.toUpperCase() == 'ROWCOLOR' && parseInt(ConditionFieldValue) < parseInt(sCondArr[condCtr].ConditionValue) || parseInt(ConditionFieldValue) == parseInt(sCondArr[condCtr].ConditionValue)) {
                            CForeColor = 'transparent';
                            CBackColor = 'transparent';
                            return CBackColor + "~" + CForeColor;
                        }

                        //COMMON.Log('DataMemberValue>-----'+DataMemberValue);
                        //COMMON.Log('DataMemberValue>-----'+ConditionFieldValue);
                        if (DataMemberValue > ConditionFieldValue && DataMemberValue != 0) {
                            //COMMON.Log('inside>-----');
                            CForeColor = 'transparent';
                            CBackColor = 'transparent';
                            CForeColor = argbToRGB(sCondArr[condCtr].CForeColor);
                            CBackColor = argbToRGB(sCondArr[condCtr].CBackColor);
                            if (tmpFieldVal.toUpperCase() == 'ROWCOLOR' && (ConditionFieldValue < sCondArr[condCtr].ConditionValue || parseInt(ConditionFieldValue) > parseInt(sCondArr[condCtr].ConditionValue))) {
                                CForeColor = 'transparent';
                                CBackColor = 'transparent';
                                CForeColor = argbToRGB(sCondArr[condCtr].CForeColor);
                                CBackColor = argbToRGB(sCondArr[condCtr].CBackColor);
                                var _tmpRow = dColorConfigRow;
                                _tmpRow.backgroundColor = CBackColor;
                            } else if (sCondArr[condCtr].CRowColor == 1 || sCondArr[condCtr].CRowColor == '1') {
                                //CBackColor = '#33ff77';//P&G

                                var _tmpRow = dColorConfigRow;//ArrayOperations.prototype.getRowByIndex(dColorConfigRowIndex);
                                _tmpRow.backgroundColor = CBackColor;//'#33ff77';//'#9FC2F5';//'#3333ff';//'#009900';//'#F6921E';
                                //COMMON.Log('inside trans-----'+CBackColor);
                                CForeColor = 'transparent';
                                CBackColor = 'transparent';
                            }
                        }
                    }
                    else if (sCondArr[condCtr].Condition == '<') {
                        CForeColor = 'transparent';
                        CBackColor = 'transparent';
                        if (tmpFieldVal.toUpperCase() == 'ROWCOLOR' && parseInt(ConditionFieldValue) < parseInt(sCondArr[condCtr].ConditionValue)) {
                            CForeColor = 'transparent';
                            CBackColor = 'transparent';
                            CForeColor = argbToRGB(sCondArr[condCtr].CForeColor);
                            CBackColor = argbToRGB(sCondArr[condCtr].CBackColor);
                            var _tmpRow = dColorConfigRow;
                            _tmpRow.backgroundColor = CBackColor;
                            return CBackColor + "~" + CForeColor;
                        } else if (tmpFieldVal.toUpperCase() == 'ROWCOLOR' && parseInt(ConditionFieldValue) > parseInt(sCondArr[condCtr].ConditionValue) || parseInt(ConditionFieldValue) == parseInt(sCondArr[condCtr].ConditionValue)) {
                            CForeColor = 'transparent';
                            CBackColor = 'transparent';
                            return CBackColor + "~" + CForeColor;
                        }
                        if (DataMemberValue < ConditionFieldValue && DataMemberValue != 0) {
                            CForeColor = 'transparent';
                            CBackColor = 'transparent';
                            CForeColor = argbToRGB(sCondArr[condCtr].CForeColor);
                            CBackColor = argbToRGB(sCondArr[condCtr].CBackColor);
                            if (tmpFieldVal.toUpperCase() == 'ROWCOLOR' && (ConditionFieldValue < sCondArr[condCtr].ConditionValue || parseInt(ConditionFieldValue) < parseInt(sCondArr[condCtr].ConditionValue))) {
                                CForeColor = 'transparent';
                                CBackColor = 'transparent';
                                CForeColor = argbToRGB(sCondArr[condCtr].CForeColor);
                                CBackColor = argbToRGB(sCondArr[condCtr].CBackColor);
                                var _tmpRow = dColorConfigRow;
                                _tmpRow.backgroundColor = CBackColor;
                            } else if (sCondArr[condCtr].CRowColor == 1 || sCondArr[condCtr].CRowColor == '1') {
                                //CBackColor = '#33ff77';//P&G
                                var _tmpRow = dColorConfigRow;//ArrayOperations.prototype.getRowByIndex(dColorConfigRowIndex);
                                _tmpRow.backgroundColor = CBackColor;//'#33ff77';//'#9FC2F5';//'#3333ff';//'#009900';//'#F6921E';
                                CForeColor = 'transparent';
                                CBackColor = 'transparent';
                            }
                        }
                    }
                    else if (sCondArr[condCtr].Condition == '=') {
                        if (tmpFieldVal.toUpperCase() == 'ROWCOLOR' && parseInt(ConditionFieldValue) == NaN && parseInt(sCondArr[condCtr].ConditionValue) == NaN && ConditionFieldValue != sCondArr[condCtr].ConditionValue) {
                            CForeColor = 'transparent';
                            CBackColor = 'transparent';
                            return CBackColor + "~" + CForeColor;
                        }
                        if (tmpFieldVal.toUpperCase() == 'ROWCOLOR' && ConditionFieldValue == sCondArr[condCtr].ConditionValue) {
                            CForeColor = 'transparent';
                            CBackColor = 'transparent';
                            CForeColor = argbToRGB(sCondArr[condCtr].CForeColor);
                            CBackColor = argbToRGB(sCondArr[condCtr].CBackColor);
                            //var _tmpRow = dColorConfigRow;
                            //_tmpRow.backgroundColor = CBackColor;
                            //return CBackColor;
                            return CBackColor + "~" + CForeColor;
                        }

                        if (DataMemberValue != '' && ConditionFieldValue != '') {
                            if (DataMemberValue === ConditionFieldValue) {
                                //COMMON.Log('DataMemberValue '+DataMemberValue+' ConditionFieldValue '+ConditionFieldValue);
                                CForeColor = 'transparent';
                                CBackColor = 'transparent';
                                CForeColor = argbToRGB(sCondArr[condCtr].CForeColor);
                                CBackColor = argbToRGB(sCondArr[condCtr].CBackColor);
                                if ((sCondArr[condCtr].CRowColor == 1 || sCondArr[condCtr].CRowColor == '1')) {
                                    //CBackColor = '#33ff77';//P&G
                                    var _tmpRow = dColorConfigRow;//ArrayOperations.prototype.getRowByIndex(dColorConfigRowIndex);
                                    _tmpRow.backgroundColor = CBackColor;//'#33ff77';//'#9FC2F5';//'#3333ff';//'#009900';//'#F6921E';
                                    CForeColor = 'transparent';
                                    CBackColor = 'transparent';
                                }
                            }
                        }

                    }

                    if (ConditionFieldValue == '') {
                        CForeColor = 'transparent';
                        CBackColor = 'transparent';
                    }


                }
                else {
                    //CForeColor = 'transparent';
                    //CBackColor = 'transparent';
                }


            }
        }
    } catch (e) {
        CBackColor = 'transparent';
    }
    //COMMON.Log('CForeColor : ' + CForeColor + ' - CBackColor : ' + CBackColor);

    return CBackColor + "~" + CForeColor;
}
function IsColorConfig(screenName) {
    //return false;//SHH
    try {
        sCondArr = [];
        sCondArr = getList['ColorConfig_' + screenName];
        if (sCondArr.length > 0) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        return false;
    }
}