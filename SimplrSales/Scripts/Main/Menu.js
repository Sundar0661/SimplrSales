var MenuNameArrayList = [];
var contextMenuClick = 0;
var MenuConfigList = '';
var executeLog = false;

var LogQry = '';

function GetMenuConfig(screenName) {
    $.ajax({
        type: 'POST',
        url: url_GetMenuConfig,
        data: { screenName: screenName },
        dataType: 'json',
        async: false,
        success: function (data) {
            MenuConfigList = data;
            return data;
        }
    });
}


var htm = '';
function MenuConfig() {
    try {
        //PageLoadinginfo("MenuConfig() Start");
        setFormData();
        var sScreenName = '';

        try {
            sScreenName = 'EXECUTELOG';
            var qry = GetQueryConfigvalue(sScreenName);
           

            if (qry != '') {
                executeLog = true;
                baseLogQry = executeQry[0].QueryText;
            }
            
        } catch (e) {

        }

        
        FormView.MenuCode = "MAIN";
        $('#MenuCode').val('MAIN');

        //var qry = getString['QueryConfig_' + sScreenName + '']
        //qry += ' ' + getString['QueryConfig_' + sScreenName + '_GroupText'];
        //qry += ' ' + getString['QueryConfig_' + sScreenName + '_OrderText'];
        // qry = "select * from Gridfunctions where screenname ={FormView.MenuCode} and Access ={AccessLevel} and solutionName='SALES-WEB-UL'  ";
        //var qry1 = formatQueryString(qry, sScreenName);//ScreenView
        sScreenName = 'MainMenuLoad';
        var qry = GetQueryConfigvalue(sScreenName);
        var qry1 = formatQueryString(qry, "");
        execute(qry1);
        var menuList = executeQry;

        if (menuList == null) {
            sScreenName = 'MainMenuLoad';
            FormView.MenuCode = "MAIN";
            $('#MenuCode').val('MAIN');

            //var qry = getString['QueryConfig_' + sScreenName + '']
            //qry += ' ' + getString['QueryConfig_' + sScreenName + '_GroupText'];
            //qry += ' ' + getString['QueryConfig_' + sScreenName + '_OrderText'];
            // qry = "select * from Gridfunctions where screenname ={FormView.MenuCode} and Access ={AccessLevel} and solutionName='SALES-WEB-UL'  ";
            //var qry1 = formatQueryString(qry, sScreenName);//ScreenView

            qry = GetQueryConfigvalue(sScreenName);
            qry1 = formatQueryString(qry, "");
            execute(qry1);
            menuList = executeQry;
        }

        if (menuList != null) {
            htm += '<ul class="nav navbar-nav" style="font-size: 14px;">';
            for (var i = 0; i < menuList.length; i++) {
                if (menuList[i].FunctionName == "Folder") {
                    htm += '<li id="' + menuList[i].FunctionText.replace(/ /g, '') + '" class="dropdown">';
                    htm += '<a data-toggle="dropdown" class="dropdown-toggle" style="color:white;" href="#">' + menuList[i].FunctionText + ' <b class="caret"></b></a>';
                    htm += '<ul style="background-color: #007dbb" class="dropdown-menu">';

                    FormView.MenuCode = menuList[i].FunctionText;
                    $('#MenuCode').val(menuList[i].FunctionText);

                    qry1 = formatQueryString(qry, sScreenName);//ScreenView
                    execute(qry1);
                    submenuList = executeQry;
                    for (var j = 0; j < submenuList.length; j++) {
                        // NORMAL CODE DONT DISTURB ============================
                        //  oncontextmenu="return false;" 
                        htm += '<li id="' + submenuList[j].FunctionName + '" class="ddmenu-content"><a    style="color:white;" oncontextmenu="return false;" onclick="ActionMenu(\'' + menuList[i].ScreenName + '\',\'' + submenuList[j].FunctionName + '\',\'' + menuList[i].FunctionText.replace(/ /g, '') + '\',\'' + submenuList[j].FunctionText + '\',\'' + submenuList[j].ScreenName + '\' );" href="#">' + submenuList[j].FunctionText + '</a></li>';
                        // Main 		smPayments     		Payments
                    }
                    htm += '</ul>';
                    htm += '</li>';
                }
                else {
                    htm += '<li id="' + menuList[i].FunctionText.replace(/ /g, '') + '" class="ddmenu-content"><a href="#"  style="color:white;" onclick="ActionMenu(\'' + menuList[i].ScreenName + '\',\'' + menuList[i].FunctionName + '\' ,\'' + menuList[i].FunctionText.replace(/ /g, '') + '\' ,\'' + menuList[i].FunctionText + '\' ,\'' + menuList[i].ScreenName + '\');">' + menuList[i].FunctionText + '</a></li>';
                }
            }
            htm += '</ul>';
            $(Menu).append(htm);
            var mainMenuId = getCookie('MainMenuId')
            var subMenuId = getCookie('SubMenuId');
            if (mainMenuId != null && mainMenuId != "") {
                try {
                    document.getElementById(mainMenuId).style.backgroundColor = "darkblue";
                }
                catch (e) {
                }
            }
            if (subMenuId != null && subMenuId != "" && document.getElementById(subMenuId) != null) {
                document.getElementById(subMenuId).style.backgroundColor = "darkblue";
            }
            htm = '';
            //PageLoadinginfo("MenuConfig() End");
            //info(pageLoadingLog, "PageLoadinginfo");
            pageLoadingLog = "";

           

          // var fpswd= String(sessionStorage.getItem('fpswd')); // '@Session["fpswd"]';
          

          //var fpswd1 = String(localStorage.getItem('fpswd'));

          //  var fpswd2 = window.fpswd;
          
          // // alert("fpswd-" + fpswd + ",fpswd1-" + fpswd1);
          //  //setTimeout("Func1(" + fpswd + "," + fpswd1 + ")", 2000);
          //  alert("fpswd-" + fpswd + ",fpswd1-" + fpswd1);


          //  var tmp = '';

          //  if (fpswd != null)
          //      tmp = fpswd;
          //  else if (fpswd1 != null)
          //      tmp = fpswd1;

          //  if (tmp == 'yes')
          //      $(Menu).hide();
          //  else if (tmp == 'no')
          //      $(Menu).show();
          //  else
          //      $(Menu).show();

        }
        else {
            alert("please check the Query : " + qry1);
        }
    }
    catch (e) {
        // alert("Error Information - " + e);
        // COMMENTED 25.03.2021 - INVOKE LOGIN PAGE ============
        setCookie('MainMenuId', "");
        setCookie('SubMenuId', "");
        setCookie('ScreenName', "");
        // 
        cation = "../Login/Login/";
        PageLogOut();
        return;
        // COMMENTED 25.03.2021 - INVOKE LOGIN PAGE ============
    }
}

//function Func1(fpswd, fpswd1) {
//    var tmp = '';

//    if (fpswd != null)
//        tmp = fpswd;
//    else if (fpswd1 != null)
//        tmp = fpswd1;

//    if (tmp == 'yes')
//        $(Menu).hide();
//    else if (tmp == 'no')
//        $(Menu).show();
//    else
//        $(Menu).show();
//}

function MenuConfigOld() {
    //var qry = "select * from Gridfunctions where screenname ='MAIN' and Access ='" + AccessLevel + "' and solutionName='" + SolutionName + "'";  //solutionName direct set query
    //execute(qry);
    //folder means dropdown or n
    GetMenuConfig("Main");
    var mainMenuList = MenuConfigList;
    var subMenuList = '';

    var htm = '';
    htm += '<ul class="nav navbar-nav">';
    for (var i = 0; i < mainMenuList.length; i++) {
        htm += '<li class="dropdown">';
        htm += '<a data-toggle="dropdown" class="dropdown-toggle" style="color:white;" href="#">' + mainMenuList[i].MenuDisplayText + ' <b class="caret"></b></a>';
        htm += '<ul style="background-color: #007dbb" class="dropdown-menu">';
        GetMenuConfig("Main_" + mainMenuList[i].MenuCode);
        subMenuList = MenuConfigList;
        for (var j = 0; j < subMenuList.length; j++) {
            //if (i == 0 && j == 0) {
            //    htm += '<li class="dropdown">';
            //    htm += '<a data-toggle="dropdown" class="dropdown-toggle" href="#">' + subMenuList[i].MenuDisplayText + ' <b class="caret"></b></a>';
            //    htm += '<ul class="dropdown-menu">';
            //    GetMenuConfig("Main_" + subMenuList[i].MenuCode);
            //    var subsubMenuList = MenuConfigList;
            //    for (var k = 0; k < subsubMenuList.length; k++) {
            //        htm += '<li><a href="#">' + subsubMenuList[k].MenuDisplayText + '</a></li>';
            //    }
            //    htm += '</ul>';
            //    htm += '</li>';
            //}
            //else
            htm += '<li class="ddmenu-content"><a href="#"  style="color:white;" onclick="ActionMenu(\'' + mainMenuList[i].ScreenName + '\',\'' + subMenuList[j].MenuCode + '\' );">' + subMenuList[j].MenuDisplayText + '</a></li>';
        }
        htm += '</ul>';
        htm += '</li>';
    }
    htm += '</ul>';
    $(Menu).append(htm);

}
function ActionMenu_1(screenName, menuCode, MainMenuId) {
    LoadingImageOpen();
    setTimeout(function () {
        ActionMenu1(screenName, menuCode, MainMenuId);
        LoadingImageClose();
    }, 200);
}

//ActionMenu --function 
function ActionMenu(screenName, menuCode, MainMenuId, MenuText, MainMenuText) {

    try {
        LogQry = baseLogQry;
        if (executeLog == true) {
            webAuditLog('Menu', MainMenuText, MenuText);
          }
    }
    catch { }

    try {
        document.getElementById('FormListDivId').innerHTML = "";
       // $("#FormListDivId").append('');
        if (ProjectName == "PVMB" && MenuText == "Confirm Delivery Invoice") {
            Params.FormView["Route"] = "";
            Params.FormView["DeliveryDate1"] = "";
        }
    }
    catch { }

    if (menuCode == "smQuickBooks") {
        var url = "https://simplrdb.southeastasia.cloudapp.azure.com/SimplrSuvaiIntegrationDemo";
        window.open(url, '_blank');
        return false;
    }
    else if (menuCode == "smPeppol") {
        var url = "https://www.peppolsmp.sg/#/login";
        window.open(url, '_blank');
        return false;
    }
    if (menuCode == "smAbout") {
        // HERE SHOW THE POPUP FOR HELP OR ABOUT DIALOG ========================


        if (ProjectName.toLowerCase() == "wms" || ProjectName.toLowerCase() == "pegasus" || ProjectName.toLowerCase() == "sandl"
            || ProjectName.toLowerCase() == "similate" || ProjectName.toLowerCase() == 'hysses'
            || ProjectName.toLowerCase() == "alphapioneer" || ProjectName.toLowerCase() == "eastocean" || ProjectName.toLowerCase() == "targetmedia" || ProjectName.toLowerCase() == "tradeproship" || ProjectName.toLowerCase() == "tradeprotrd" ||
            ProjectName.toLowerCase() == "tradeproimpex" || ProjectName.toLowerCase() == "wil" || ProjectName.toLowerCase() == "empiere" || ProjectName.toLowerCase() == "greencapsule" ||
            ProjectName.toLowerCase() == "limtraders" || ProjectName.toLowerCase() == "pvmng" || ProjectName.toLowerCase() == "motul sales" || ProjectName.toLowerCase() == "vismark" || ProjectName.toLowerCase() == "fgv") {
            // Get the modal
            var modal = document.getElementById("AboutDivId");
            // Get the <span> element that closes the modal
            var span = document.getElementsByClassName("close")[0];

            //execute("select Isnull(SystemValue,'') code from systemlist where code='SerialNo'");
            execute("select  Isnull(SystemValue,'') code,year(GETDATE()) year from systemlist where code='SerialNo' union select  Isnull(SystemValue,'') code,year(GETDATE()) year from systemlist where  code='SerialNoVersion'");

            var serialNo = executeQry.length == 0 ? "" : executeQry[0].code.toString();
            var year = executeQry.length == 0 ? "" : executeQry[0].year.toString();
            var serialNoVersion = executeQry.length == 2 ? executeQry[1].code.toString() : "6.1";

            $("#span_About_Information").html("<b>All rights reserved<br>Copyright &copy; Simplr Solutions Pte Ltd " + year + "<br>Serial No.: " + serialNo + " <br>Version No.: " + serialNoVersion + "</b>");
            $("#span_About_Information").css('color', "#C97998");
            modal.style.display = "block";
            // When the user clicks on <span> (x), close the modal
            span.onclick = function () {
                modal.style.display = "none";
            }
        }
        // HERE SHOW THE POPUP FOR HELP OR ABOUT DIALOG ========================
    }
    setCookie('PreviewsMainMenuId', JSON.stringify(""));
    setCookie('PreviewsSubMenuId', JSON.stringify(""));
    setCookie('PreviewsMainMenuId', getCookie('MainMenuId'));
    setCookie('PreviewsSubMenuId', getCookie('SubMenuId'));
    //
    setCookie('MainMenuId', JSON.stringify(""));
    setCookie('SubMenuId', JSON.stringify(""));
    //alert('set=> ' + MainMenuId);
    setCookie('MainMenuId', MainMenuId);
    setCookie('SubMenuId', menuCode);

    pageLoadingLog = "";
    PageLoadinginfo("Menu Clicked");
    // PageLoadinginfo("windowPreparingToOpen function Start");
    windowPreparingToOpen(screenName);
    // PageLoadinginfo("windowPreparingToOpen function end");
    //PageLoadinginfo("PerformAction('menuItemClicked', _obj) Start");
    //alert(screenName); alert(menuCode);

    _isFromMobile = "FROM MENU";
    var _obj = {};
    _obj.screenName = screenName;
    _obj.fieldName = menuCode;
    //alert(_obj.screenName); alert(_obj.fieldName);
    PerformAction('menuItemClicked', _obj);//Controller.js
}

function CloseAboutScreen() {
    var modal = document.getElementById("AboutDivId");
    modal.style.display = "none";
}

function setFormData() {
    formdata = {};
    formdata.screenName = "MainMenuLoad";
    formdata.fieldName = "MenuCode";
    formdata.fieldControl = "TEXTBOX";
    formdata.FieldControl = "TEXTBOX";
    formdata.DataMember = "MenuCode";
    formdata.DataMemberType = "STRING";
    formItems.push(formdata);
    formFieldNames.push("MENUCODE");
}


function GetQueryConfigvalue(tmpScreenName) {
    var qry = "select ScreenName, QueryText, ISNULL(GroupText,'') as GroupText, ISNULL(OrderText, '' ) as OrderText from QueryConfig where solutionName='" + SolutionName + "'   and ScreenName = " + safeSQL(tmpScreenName);
    execute(qry);
    dbDataRows = executeQry;
    var getString = "";
    if (dbDataRows != null && dbDataRows.length > 0) {
        for (var i = 0; i < dbDataRows.length; i++) {
            if (dbDataRows[i].QueryText != null && dbDataRows[i].QueryText != "") {
                getString = dbDataRows[i].QueryText.toString().trim(); //.toString().trim() newly addedby.M 10.01.2023
                getString += ' ' + dbDataRows[i].GroupText.toString().trim();
                getString += ' ' + dbDataRows[i].OrderText.toString().trim();
            }
        }
    }
    return getString;
}

function TEST(screenName, menuCode, MainMenuId) {
    var qry = "select ActionValue from ActionConfig Where ScreenName='" + screenName + "' and FieldName='" + menuCode + "'";
    execute(qry);
    var actionValue = executeQry[0].ActionValue;
    var url = "FormClickEvent?ScreenName=" + actionValue + "&FieldName=";
    window.open(url, '_blank');
    return false;
}


function ActionMenu_Invoke(screenName, menuCode, MainMenuId) {
    //alert(rightClick);
    if (contextMenuClick == 0) {
        alert(contextMenuClick);
        ActionMenu(screenName, menuCode, MainMenuId);
    }
}




function mainMenu(menuList, i) {

    if (menuList[i].FunctionName == "Folder") {
        htm += '<li class="dropdown">';
        htm += '<a data-toggle="dropdown" class="dropdown-toggle" style="color:white;" href="#">' + menuList[i].FunctionText + ' <b class="caret"></b></a>';
        htm += '<ul style="background-color: #007dbb" class="dropdown-menu">';
        htm += '<div id=' + menuList[i].ScreenName + '></div>';

        htm += '</ul>';
        htm += '</li>';

        htm += '</ul>';
        $(Menu).append(htm);
        htm = '';
    }
    else {
        htm += '<ul style="background-color: #007dbb" class="dropdown-menu">';
        htm += '<div id=' + menuList[i].ScreenName + '></div>';
        htm += '</ul>';
        $(Menu).append(htm);
        htm = '<li class="ddmenu-content"><a href="#"  style="color:white;" onclick="ActionMenu(\'' + submenuList[i].ScreenName + '\',\'' + submenuList[i].FunctionName + '\' );">' + submenuList[i].FunctionText + '</a></li>';
        $(submenuList[i].ScreenName).append(htm);
        htm = '';
    }


}

function SubMenu(submenuList, i) {

    if (submenuList[i].FunctionName == "Folder") {
        mainMenu(submenuList, i);
    }
    else {
        htm = '<li class="ddmenu-content"><a href="#"  style="color:white;" onclick="ActionMenu(\'' + submenuList[i].ScreenName + '\',\'' + submenuList[i].FunctionName + '\',\'' + submenuList[i].FunctionText + '\' );">' + submenuList[i].FunctionText + '</a></li>';
        $(submenuList[i].ScreenName).append(htm);
        htm = '';
    }
}