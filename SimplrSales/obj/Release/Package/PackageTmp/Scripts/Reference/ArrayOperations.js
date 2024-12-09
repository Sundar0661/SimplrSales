//Testing Source tree 1
var tooltip = Titanium.UI.createAlertDialog({
	title: '',
	message: '',
	persistent: true
});
var actInd = null;
var FormPanel = require('/BaseComponents/FormPanel');
var FORMPANEL = new FormPanel();
var FormChildView = require('/BaseComponents/FormPanelHorizontalView');
var FORMCHILDVIEW = new FormChildView();
var COMMON = Ti.App.COMMON;
var CommonModel = require('/utils/CommonModel/CommonModel');
var COMMONMODEL = new CommonModel();
var BasicRow = require('/BaseComponents/BasicRow');
var BasicLabel = require('/BaseComponents/Label');
var BasicSignature = require('/BaseComponents/BasicSignature');
var TextField = require('/BaseComponents/TextField');
var TextArea = require('/BaseComponents/TextArea');
var FormTextField = require('/BaseComponents/FormTextField');
var FormTextField1 = require('/BaseComponents/FormTextField1');
var BasicButton = require('/BaseComponents/BasicButton');
var BasicHeaderButton = require('/BaseComponents/BasicHeaderButton');
var BasicCheckBox = require('/BaseComponents/BasicCheckBox');
var BasicCheckBoxButton = require('/BaseComponents/BasicCheckBoxButton');
var DatePicker = require('/BaseComponents/DatePicker');
var FormDatePicker = require('/BaseComponents/FormDatePicker');
var FormTimePicker = require('/BaseComponents/FormTimePicker');
var DatePickerSearch = require('/BaseComponents/DatePickerSearch');
var ComboBox = require('/BaseComponents/ComboBox');
var ComboBoxSearch = require('/BaseComponents/ComboBoxSearch');
var ComboBoxForm = require('/BaseComponents/ComboBoxForm');
var dbConnection = require('/utils/DataBaseConnection');
var BasicSearchBar = require('/BaseComponents/BasicSearchBar');
var BasicProgressBar = require('/BaseComponents/BasicProgressBar');
var Menu = require('/BaseComponents/Menu');
var BasicImageView = require('/BaseComponents/BasicImageView');
var BasicMenuWithMultiSelection = require('/BaseComponents/MenuWithMultiSelection');
var BasicTableView = require('/BaseComponents/TableView');
var TableViewBasicUI = require('/BaseComponents/TableViewBasicUI');
TableViewBasicUIObj = new TableViewBasicUI();
var MenuRowPopup = require('/BaseComponents/MenuRowPopup');
var iHeaderHeight = Ti.App.CONFIG.get('HEADER_HEIGHT');
var iIconHeight = Ti.App.CONFIG.get('ICON_HEIGHT');
var iIconWidth = Ti.App.CONFIG.get('ICON_WIDTH');
Ti.App.deliveryDateButtonName = '';
Ti.App.dashboardiconclicked = false;
var Log = require('/utils/SimplrLog');
var LOG = new Log();
var logFolderName = '', logFileName = '';
var HeaderDetails = [], formDataList = [], messageList = [];
var title = 'PurchaseOrder';
var Details = require('/utils/Details');
var DETAILS = new Details();
var currentWin = null, buttonOrder = [], dataList = [], systemTableConfig = [];
var data = {}, iIndex = 0, mView = null, mController = null, commonObj = {};
var searchParentView = null, currentFocusedField = null, tmpScreennameforMultiline = '';
var bIsAndroid = COMMON.isPlatformAndroid(), pHeight = Ti.App.DeviceHeight, pWidth = Ti.App.DeviceWidth;

var bColorConfig = false, sBorderColor = '#616161', bRowComponentBorder = true, rowHeight = 0;
var comboData = [], headerTotalLength = 0, headerListLength = 0, sKeyType = 'NUMBER', searchBoxData = [];
var dLeftPos = 0, dLineIndex = 0, dTopPos = 0, widthRatio = 0, sCreateUIRowBgColor = 'transparent';
var _sHeader = '', _width = 0, sScreenNameTitle = "";
var RowDataArray = [], dataMemberType = '', dataValue = '', mFieldControl = {};
var sRow_BG_Color = 'transparent', dMaxRowHeight = 0;
var bImgFound = false;
var BarcodeData = "";
Ti.App.ScanBarCode = true,Ti.App.Firstblurcalled =false;
if (Ti.Platform.osname === 'android') {
	var ImageFactory = require('ti.imagefactory');
	BarcodeData = require('ti.barcode');
}
var sListBorderColor = Ti.App.listBorderColor;//'#3333ff';

var stmpActiveScreenName = '', ignore = true, dbDataRows = '';
var _DBformValues = "", length = 0, totalHeaderHeight = 0, totalChildViewWidth = 0;
var dDisplayNo = "", _dDisplayNo = 0, bMultiLine = false, formdata = {};
var str = '', _dWidgetHeight = 0, height = 0, headerTop = 0, valueTop = 0, _lblTotalWidth = 0;
var test = '', data1 = "", sDataMemberType = "";
var backgroundColor = "", width = "", height = "", fontSize = "", fontColor = "", _URL = "";
var buttonWidth = 0, searchItems = 0, buttonHeight = 0, rowObj = '', pColumnwidth = 1;
var fieldComponent = '', fieldControl = '', NextFunctionName = "", sFunctionName = "";
var pageName = "", access = "", totalmenu = 0;
var arrWorkFlowScreenStatus = [], objWF = {}, lastStatus = 1, tmpCnt = 1;
var FunctionText = '', FunctionName = '', PageNo = '', RowNo = '', ColNo = '', PageName = '', ScreenName = '', img = '';
var dashBoardItems = new Array(), isFolder = 0, c = 0;
var lastStatusCnt = 1, item = {};
var cellWidth = 140, cellHeight = 140, IconWidth = 190, IconHeight = 190;
var dash = {}, _screenW = 0, GridView = [], totalIcons = 0;
var x = 0, y = 0, iconH = 0, iconW = 0, sGridLabelLayout = 'center';
var dGridCols = 3, dGridRows = 2, tmpCnt = 0, totalView = 1;
var thisView = '', thisView1 = '', thisView2 = '', thisLabel = '', dPopupCount = '';
var str = '', newSTR1 = '', newSTR = '', HeaderDetailsObj = {};
var displayNames = [], tableNames = [], functionNames = [], APIStatus = [], downloadTransConfig_List = [];
var vwRowHorizontal = '', row = '', arrFieldControlObj = [], bEnabledarrFieldCtrlObj = false;
Ti.App.bFrmSearchStart = false;
var buttonSearchIsActive = false;
var showIndicatorIcons = false, bGroupOptionChecking = false, bGroupOptionCheckingForm = false;
var arrVariant2Code = [], arrVariant2LineNo = [];
var _LoopLen = 0, DBFieldNameArr = [];
Ti.App.dashboardiconclicked = false;
Ti.App.bAutoFocusTextboxEnabled = false;
function ArrayOperations() {
	Ti.App.bFrmSearchStart = false;
	arrFieldControlObj = [];
	bEnabledarrFieldCtrlObj = false;
	dbDataRows = '';
	commonObj = {};
	commonObj.BasicLabelObj = new BasicLabel();
	commonObj.FormTextFieldObj = new FormTextField();
	commonObj.FormTextField1Obj = new FormTextField1();
	commonObj.TextFieldObj = new TextField();
	commonObj.MenuObj = new Menu();
	commonObj.dbConnectionObj = new dbConnection();
	commonObj.BasicButtonObj = new BasicButton();
	commonObj.BasicHeaderButtonObj = new BasicHeaderButton();
	// try{
	// if(Ti.App.dbConn != null && Ti.App.dbConn != undefined){
	// Ti.App.dbConn.close();
	// }
	// Ti.App.dbConn = commonObj.dbConnectionObj.createDataBaseConnection();
	// }catch(e){}
	tmpScreennameforMultiline = '';
	_LoopLen = 0;
}
var fieldNames = [], formFieldNames = [], formDataMember = [];
var MultiArray = new Array();
var dColorConfigRowIndex = -1, dColorConfigRow = null, isShowSearchButton = false;
var ConditionFieldValue = '', CForeColor = '', CBackColor = 'transparent';
var sCondArr = [], DataMemberValue ='', tmpFieldVal = '', sColorCondFieldArr = [], ComboboDataObj = {};
var bReadOnlyRow = false, queryNameQry = '';

ArrayOperations.prototype = {
	setArray: function (name, array) {
		Titanium.App.Properties.setList(name, array);
	},
	getArray: function (name) {
		return Titanium.App.Properties.getList(name);
	},
	getCategoryArray: function () {
		return Titanium.App.Properties.getList('categoryList');
	},
	getZoneArray: function () {
		return Titanium.App.Properties.getList('customerZoneList');
	},
	getRouteArray: function () {
		return Titanium.App.Properties.getList('customerRouteList');
	},
	getReasonArray: function (reasonType) {
		var reasonList = [];
		var arr = Titanium.App.Properties.getList('reasonList');
		for (var ctr = 0; ctr < arr.length; ctr++) {
			if (arr[ctr].ReasonType == reasonType) {
				reasonList.push(arr[ctr]);
			}
		}
		return reasonList;
	},
	getReasonNameByCode: function (code) {
		var reasonList = [];
		var arr = Titanium.App.Properties.getList('reasonList');
		for (var ctr = 0; ctr < arr.length; ctr++) {
			if (arr[ctr].Code == code) {
				return arr[ctr].Description;
			}
		}
		return 'None';
	},
	insertArrayAt: function (array, index, arrayToInsert) {
		Array.prototype.splice.apply(array, [index, 0].concat(arrayToInsert));
	},
	insertAutoEndWork: function (d) {
		try {

			Ti.Geolocation.purpose = 'Get Current Location';
			if (Ti.version < '8.0.0') { Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST; }
			Ti.Geolocation.distanceFilter = 1;
			Titanium.Geolocation.getCurrentPosition(function (e) {

				var _dt = d;

				var cutofftime = Ti.App.ARRAYOPERATION.getSystemValue("AUTOLOGOUTCUTOFTIME");
				cutofftime = (cutofftime == null || cutofftime == undefined || cutofftime == '') ? "23:59" : cutofftime;
				cutofftime = cutofftime.split(":");
				_dt.setHours(cutofftime[0]);
				_dt.setMinutes(cutofftime[1]);


				_dt = Ti.App.DATEFORMAT.dbDateFormatSQLite(_dt);
				var sTransNo = Ti.App.ARRAYOPERATION.getSystemValue('PDAID') + "-" + Ti.App.DATEFORMAT.formatDate(new String(new Date()), 'yyyyMMddHHmmss');
				var currentlongitude = 0;
				var currentlatitude = 0;
				if (!e.error) {
					currentlongitude = e.coords.longitude;
					currentlatitude = e.coords.latitude;
				}

				//getting last transdate
				var lasttransdate = _dt;
				var Transqry = "select TransDate FROM CustVisit where TransType <> 'GPS-LOC' order by transdate desc limit 0,1";
				var _dbDataRows = Ti.App.dbConn.execute(Transqry);
				if (_dbDataRows.isValidRow()) {
					lasttransdate = _dbDataRows.fieldByName('TransDate');
				}
				_dbDataRows.close();



				var qry = "INSERT INTO CustVisit(CustNo,TransNo, TransType, TransDate, AgentId, Longitude, Latitude,Status,Remarks)";
				qry = qry + "SELECT '' as CustNo," + Ti.App.SQL.safeSQL(sTransNo) + " as TransNo,'ENDWORK' as TransType, " + Ti.App.SQL.safeSQL(lasttransdate) + " as TransDate," + Ti.App.SQL.safeSQL(Ti.App.agentID) + " as AgentId," + Ti.App.SQL.safeSQL(currentlongitude) + " as Longitude," + Ti.App.SQL.safeSQL(currentlatitude) + " as Latitude, 1 as Status,'Auto ENDWORK' as Remarks";
				qry = qry + " WHERE EXISTS(SELECT 1 FROM CustVisit WHERE date(TransDate) = date(" + Ti.App.SQL.safeSQL(_dt) + ") AND TransType = 'STARTWORK'  and AgentId = " + Ti.App.SQL.safeSQL(Ti.App.agentID) + ") and NOT EXISTS (SELECT 1 FROM CustVisit WHERE date(TransDate) = date(" + Ti.App.SQL.safeSQL(_dt) + ") AND TransType = 'ENDWORK' and AgentId = " + Ti.App.SQL.safeSQL(Ti.App.agentID) + ")";
				//COMMON.Log("AutoEndWork qry->" + qry);
				Ti.App.DBCOMMON.ExecuteSQL(qry);

			});
		} catch (e) {
			//COMMON.Log("AutoEndWork Error->" + e);
		}

	},
	getRouteNumberBydate: function (d) {
		try {
			//ROUTE CALCULATION

			var NoOfWeeks = 4;

			//db = Titanium.Database.open(DETAILS.get('DBNAME'));
			dbDataRows = Ti.App.dbConn.execute("select * FROM SystemList");
			while (dbDataRows.isValidRow()) {
				NoOfWeeks = dbDataRows.fieldByName('NoOfWeeks');
				dbDataRows.next();
			}
			dbDataRows.close();
			//db.close();

			Ti.App.dWeeks = NoOfWeeks;
			Ti.App.dWeeks = (Ti.App.dWeeks == null || Ti.App.dWeeks == undefined || Ti.App.dWeeks == '') ? 4 : Ti.App.dWeeks;



			var weekNumber = 'Week1';
			var today = d;
			var currentDay = today.getDay();

			//ROUTEWEEK	
			if (Ti.App.dWeeks == 4) {
				Date.prototype.getWeek = function () {
					var onejan = new Date(this.getFullYear(), 0, 1);
					return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+Ti.App.WeekCalWOSAT) / 7);
				};

				//weekNumber = (new Date()).getWeek();
				var dt = d;
				weekNumber = (new Date(dt.getFullYear(), dt.getMonth(), dt.getDate())).getWeek();
				weekNumber = (weekNumber % 4 == 0) ? 'Week4' : 'Week' + (weekNumber % 4);
			} else if (Ti.App.dWeeks == 2) {
				//2WEEKS
				Date.prototype.getWeek = function () {
					var onejan = new Date(this.getFullYear(), 0, 1);
					return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+Ti.App.WeekCalWOSAT) / 7);
				};
				var dt = d;
				weekNumber = (new Date(dt.getFullYear(), dt.getMonth(), dt.getDate())).getWeek();
				//var weekNumber = (new Date()).getWeek();
				weekNumber = (weekNumber % 2 == 1) ? "Week1" : "Week2";
			}
			//weekNumber = 'Week1';	
			///Ti.App.RouteDay = currentDay;
			//Ti.App.RouteWeek = weekNumber;
			var RouteNo = 0;

			//COMMON.Log('Ti.App.RouteDay : ' + Ti.App.RouteDay + ' - Ti.App.RouteWeek : ' + Ti.App.RouteWeek);

			//db = Titanium.Database.open(DETAILS.get('DBNAME'));
			//dbDataRows = db.execute("Select RouteNo, RouteName  from RouteMaster Where RouteDay = " + SQL.safeSQL(currentDay) + " and RouteWeek = " + SQL.safeSQL(weekNumber) + " and VehicleID = " + SQL.safeSQL(Ti.App.agentID));
			dbDataRows = Ti.App.dbConn.execute("Select RouteNo, RouteName  from RouteMaster Where RouteDay = " + Ti.App.SQL.safeSQL(currentDay) + " and RouteWeek = " + Ti.App.SQL.safeSQL(weekNumber));
			while (dbDataRows.isValidRow()) {
				RouteNo = dbDataRows.fieldByName('RouteNo');
				dbDataRows.next();
			}
			dbDataRows.close();
			//db.close();

			//COMMON.Log('RouteNoBydate-->' + RouteNo);
			return RouteNo;

		} catch (e) {
			//COMMON.Log('RouteNoBydateError-->' + e);
		}
	},
	getRouteNumber: function (route) {// Method to return Today's Route Number while opening Customer Screen
		var today = new Date();
		var currentDay = today.getDay();
		var temp = {};
		for (var ctr = 0; ctr < route.length; ctr++) {
			if (currentDay == route[ctr].day) {
				temp = {};
				temp.number = route[ctr].number;
				temp.name = route[ctr].name;
				return temp;
			}
		}
		return '';
	},
	loadListConfig: function (screenName) {
		//Testing Source tree 2
		try {
			tmpScreennameforMultiline = screenName;
			//COMMON.Log('TotalWidth_' + screenName);
			headerListLength = Titanium.App.Properties.getInt('TotalWidth_' + screenName);
			if (screenName == '' || headerListLength == 0) {
				return;
			}
			sListBorderColor = Ti.App.listBorderColor;//'#3333ff';
			title = screenName;
			HeaderDetails = this.getListConfigByScreenName(screenName);
			headerTotalLength = 0;
			widthRatio = 0;
			var salesHeaderList = TableViewBasicUIObj.createBasicView(null, 'transparent', Ti.UI.SIZE, '100%', 0, 0, null, null, 'absolute');//'horizontal');
			/*
			- - - - - - - - - - - - - - - — — - - - - - - - - - - - -
				SPLIT COLUMN
			- - - - - - - - - - - - - - - — — - - - - - - - - - - - -
			FieldName	NEWTXT		DATAMEMBER	HDR
			- - - - - - - - - - - - - - - — — - - - - - - - - - - - -
			ItemNo		SKU			ItemNo
			ItemName	Name		ItemName
			BOX			BOX			BOXQTY		QTY
			LOOSE		LOOSE		LOOSEQTY	QTY
			QTY			QUANTITY	
			- - - - - - - - - - - - - - - — — - - - - - - - - - - - -
			*/
			//COMMON.Log('LoadListConfig 1'); 
			dLeftPos = 0; dLineIndex = 0; dTopPos = 0; rowHeight = 0;
			if (HeaderDetails != undefined && HeaderDetails != null) {
				//COMMON.Log('LoadListConfig 2');
				var label = '';
				//salesHeaderList.backgroundColor = HeaderDetails[0].HBackColor;//'#a60f16';'#595756';//
				_sHeader = ''; _width = 0; sScreenNameTitle = ""; commonObj.ColumnWidth = 0;
				var db = '';
				salesHeaderList.top = 0;
				//salesHeaderList.height = HeaderDetails[0].headerHeight;//headerHeight;//headerHeight;
				//headerTotalLength = parseInt((HeaderDetails.length * 5) + this.getListWidth(screenName));
				//COMMON.Log('LoadListConfig 3');
				var dTblHeaderRowHeight = 0.1;
				//select SUM(HeaderHeight) from (select Max(HeaderHeight) as HeaderHeight FROM ListConfig where Screenname = 'Form-OnShelfAvailability'  and HeaderHeight > 0 group by LineIndex)
				//dbDataRows = Ti.App.dbConn.execute('select SUM(HeaderHeight) * ' + Ti.App.dHeightRatio + ' as HeaderHeight from (select Max(HeaderHeight) as HeaderHeight FROM ListConfig where Screenname = ' + Ti.App.SQL.safeSQL(screenName) + ' and Language = ' + Ti.App.SQL.safeSQL(Ti.App.sLanguage) + '  and HeaderHeight > 0  group by LineIndex)');
				dbDataRows = Ti.App.configDBConn.execute('select SUM(HeaderHeight) * ' + Ti.App.dHeightRatio + ' as HeaderHeight from (select Max(HeaderHeight) as HeaderHeight FROM ListConfig where Screenname = ' + Ti.App.SQL.safeSQL(screenName) + ' and Language = ' + Ti.App.SQL.safeSQL(Ti.App.sLanguage) + '  and HeaderHeight > 0  group by LineIndex)');
				while (dbDataRows.isValidRow()) {
					//salesHeaderList.height = dbDataRows.fieldByName('HeaderHeight');
					dTblHeaderRowHeight = dbDataRows.fieldByName('HeaderHeight');
					dbDataRows.next();
				}
				dbDataRows.close();
				dTblHeaderRowHeight = (dTblHeaderRowHeight == null || dTblHeaderRowHeight == undefined || dTblHeaderRowHeight == 0) ? 0.1 : dTblHeaderRowHeight;
				salesHeaderList.height = dTblHeaderRowHeight;
				//COMMON.Log('LoadListConfig 4');
				//widthRatio = (headerListLength / ((100 / Ti.App.DeviceWidth ) * headerTotalLength));
				salesHeaderList.backgroundColor = HeaderDetails[0].HBackColor;
				//COMMON.Log('LoadListConfig 5');
				//COMMON.Log('Befoer LoadListConfig headerTotalLength'+headerTotalLength);
				headerTotalLength = parseInt(this.getListWidth(screenName));
				//COMMON.Log('LoadListConfig headerTotalLength'+headerTotalLength);
				//headerListLength = COMMON.CheckDecimal(headerListLength) == 0 ? 100 : headerListLength;
				headerListLength = (headerListLength == null || headerListLength == '') ? 100 : headerListLength;
				//COMMON.Log('('+headerListLength +'/ ((100 / ('+Ti.App.DeviceWidth +'* 0.94) ) * '+ headerTotalLength+')');
				widthRatio = (headerListLength / ((100 / (Ti.App.DeviceWidth * 0.94)) * headerTotalLength));
				//var RowHeight = 0;
				//COMMON.Log('LoadListConfig 6');
				_LoopLen = HeaderDetails.length;
				for (var i = 0; i < _LoopLen; i++) {
					//COMMON.Log('LoadListConfig 7 : - ' + i + ' - ' + dLineIndex);
					if (dLineIndex != HeaderDetails[i].LineIndex) {
						if (COMMON.CheckDecimal(HeaderDetails[i].dColumnUnit) > 0) {
							try {
								var ColumnUnitField = salesHeaderList.children[HeaderDetails[i].dColumnUnit - 1];
								dLeftPos = ColumnUnitField.left;
								dLeftPos = parseFloat(dLeftPos.replace(/%/g, ''));
								dTopPos = dTopPos + rowHeight;
							} catch (e) {
								dLeftPos = 0;
								dTopPos = dTopPos + rowHeight;
							}
						} else {
							dLeftPos = 0;
							dTopPos = dTopPos + rowHeight;
						}
						/*}else{
							dLeftPos = 0;
							dTopPos = dTopPos + rowHeight;*/
					}
					//COMMON.Log('dLeftPos : ' + dLeftPos + ' - dTopPos : ' + dTopPos);

					if (rowHeight < HeaderDetails[i].headerHeight) {
						rowHeight = HeaderDetails[i].headerHeight;
					}
					//if(dLineIndex != HeaderDetails[i].LineIndex){
					//dLeftPos = 0;
					//}
					dLineIndex = HeaderDetails[i].LineIndex;
					dLineIndex = (dLineIndex == null || dLineIndex == '' || dLineIndex == undefined) ? 0 : dLineIndex;
					//salesHeaderList.height = rowHeight * (dLineIndex + 1);//Before Update LINDEX=1
					//dTopPos = dLineIndex * rowHeight;//Before Update LINDEX=1

					commonObj.ColumnWidth = (HeaderDetails[i].columnWidth * widthRatio * 100 / headerListLength);
					//COMMON.Log('%$#@ ---> ' + HeaderDetails[i].columnWidth + ' : ' + widthRatio + ' : ' + headerListLength + ' : headerTotalLength -->  ' + headerTotalLength + ' Percentage --> ' + commonObj.ColumnWidth + '%');

					if (HeaderDetails[i].Header != "") {
						try {
							_sHeader = HeaderDetails[i].Header;
							_width = commonObj.ColumnWidth;
							sScreenNameTitle = HeaderDetails[i].Header;//"";
							//COMMON.Log("sScreenNameTitle1 "+sScreenNameTitle);
							//db = commonObj.dbConnectionObj.createDataBaseConnection();
							dbDataRows = Ti.App.configDBConn.execute('SELECT * FROM ListConfig where screenName = ' + Ti.App.SQL.safeSQL(screenName) + ' and Language = ' + Ti.App.SQL.safeSQL(Ti.App.sLanguage) + ' and FieldName = ' + Ti.App.SQL.safeSQL(HeaderDetails[i].Header) + ' order by ScreenName, DisplayNo');
							while (dbDataRows.isValidRow()) {
								sScreenNameTitle = dbDataRows.fieldByName('NewText');
								dbDataRows.next();
							}
							dbDataRows.close();
							//COMMON.Log("sScreenNameTitle2 "+sScreenNameTitle);
							sScreenNameTitle = HeaderDetails[i].Header;//"";

							//db.close();
							var _LoopLen1 = HeaderDetails.length;
							for (var j = i + 1; j < _LoopLen1; j++) {
								//COMMON.Log('_HeaderDetails[' + j + '].columnWidth ---> ' + HeaderDetails[j].columnWidth);
								//COMMON.Log('_width ---> ' + _width);
								if (HeaderDetails[j].Header == _sHeader) {
									_width = _width + (HeaderDetails[j].columnWidth * widthRatio * 100 / headerListLength);
								} else {
									j = _LoopLen1;//HeaderDetails.length;
								}
							}
							var _sSplitView = TableViewBasicUIObj.createBasicView(null, 'transparent', HeaderDetails[i].headerHeight, (_width) + "%", 0, 0, 0, 0, 'vertical');
							_sSplitView.borderWidth = 1;
							_sSplitView.borderColor = sListBorderColor;//Ti.App.listBorderColor;//'#e8e8e8';//'#3b3b3b';//
							_sSplitView.left = dLeftPos + '%';
							_sSplitView.top = dTopPos;
							salesHeaderList.add(_sSplitView);
							dLeftPos += _width;
							//COMMON.Log("HeaderDetails[i].HFontSize1 "+HeaderDetails[i].HFontSize);
							//var label = commonObj.FormTextFieldObj.createTextField(true, sScreenNameTitle, '100%', HeaderDetails[i].headerHeight/2, HeaderDetails[i].HFontSize, HeaderDetails[i].HFont, HeaderDetails[i].HForeColor, 'transparent', 0, false, 'TEXT');
							var label = commonObj.BasicLabelObj.createLabel(sScreenNameTitle, '100%', HeaderDetails[i].headerHeight / 2, HeaderDetails[i].HFontSize, HeaderDetails[i].HFont, HeaderDetails[i].HFontStyle, HeaderDetails[i].HForeColor, 'transparent', HeaderDetails[i].allignment, 0);
							label.left = 0;
							label.editable = false;
							label.enabled = false;
							label.backgroundColor = HeaderDetails[i].HBackColor;//'#595756';//
							label.verticalAlign = Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER;
							label.horizontalWrap = true;
							if (Ti.version < '8.0.0') {
								label.wordWrap = true;
							}
							_sSplitView.add(label);
							//COMMON.Log('LISTCONFIG : HeaderDetails[i].headerHeight ---> ' + HeaderDetails[i].headerHeight);
							var _sSplitHRView = TableViewBasicUIObj.createBasicView(null, 'transparent', HeaderDetails[i].headerHeight / 2, "100%", 0, 0, 0, 0, 'horizontal');
							_sSplitView.add(_sSplitHRView);
							//var l1 = commonObj.FormTextFieldObj.createTextField(true, HeaderDetails[i].columnText, (((commonObj.ColumnWidth/_width) * 100)-0.2) + '%', HeaderDetails[i].headerHeight/2, HeaderDetails[i].HFontSize, HeaderDetails[i].HFont, HeaderDetails[i].HForeColor, 'transparent', HeaderDetails[i].allignment, false, 'TEXT');
							var l1 = commonObj.BasicLabelObj.createLabel(HeaderDetails[i].columnText, (((commonObj.ColumnWidth / _width) * 100) - 0.002) + '%', HeaderDetails[i].headerHeight / 2, HeaderDetails[i].HFontSize, HeaderDetails[i].HFont, HeaderDetails[i].fontStyle, HeaderDetails[i].HForeColor, 'transparent', 0, 0);
							l1.left = 0;
							l1.borderWidth = 1;
							l1.borderColor = sListBorderColor;//'#e8e8e8';//'#3b3b3b';//
							l1.editable = false;
							l1.enabled = false;
							l1.backgroundColor = HeaderDetails[i].HBackColor;//'#595756';//
							l1.verticalAlign = Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER;
							l1.horizontalWrap = true;
							if (Ti.version < '8.0.0') {
								l1.wordWrap = true;
							}
							_sSplitHRView.add(l1);
							var _LoopLen1 = HeaderDetails.length;
							for (var j = i + 1; j < _LoopLen1; j++) {
								if (HeaderDetails[j].Header == _sHeader) {
									//COMMON.Log("HeaderDetails[j].columnText "+HeaderDetails[j].columnText);
									//var l2 = commonObj.FormTextFieldObj.createTextField(true, HeaderDetails[j].columnText, ((((HeaderDetails[j].columnWidth * widthRatio * 100 / headerListLength)/_width) * 100)) + '%', HeaderDetails[j].headerHeight/2, HeaderDetails[j].HFontSize, HeaderDetails[j].HFont, HeaderDetails[j].HForeColor, 'transparent', HeaderDetails[j].allignment, false, 'TEXT');
									//var l2 = new BasicLabel().createLabel(HeaderDetails[j].columnText, ((((HeaderDetails[j].columnWidth * widthRatio * 100 / headerListLength)/_width) * 100)) + '%', HeaderDetails[j].headerHeight/2, HeaderDetails[j].HFontSize, HeaderDetails[j].HFont, HeaderDetails[j].fontStyle, HeaderDetails[j].HForeColor, 'transparent', 0, 0);
									var l2 = commonObj.BasicLabelObj.createLabel(HeaderDetails[j].columnText, ((((HeaderDetails[j].columnWidth * widthRatio * 100 / headerListLength) / _width) * 100)) + '%', HeaderDetails[j].headerHeight / 2, HeaderDetails[j].HFontSize, HeaderDetails[j].HFont, HeaderDetails[j].HFontStyle, HeaderDetails[j].HForeColor, 'transparent', HeaderDetails[j].Hallignment, 0);
									l2.left = 0;
									l2.borderWidth = 1;
									l2.borderColor = sListBorderColor;//'#e8e8e8';//'#3b3b3b';//
									l2.editable = false;
									l2.enabled = false;
									l2.backgroundColor = HeaderDetails[j].HBackColor;//'#595756';//
									l2.verticalAlign = Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER;
									l2.horizontalWrap = true;
									if (Ti.version < '8.0.0') {
										l2.wordWrap = true;
									}
									_sSplitHRView.add(l2);
									i++;
								} else {
									j = _LoopLen1;//HeaderDetails.length;
								}
							}
						} catch (e) {
							i++;
						}
					} else {
						if (HeaderDetails[i].columnWidth == 0) {
							label = commonObj.BasicLabelObj.createLabel(HeaderDetails[i].columnText, 0, HeaderDetails[i].headerHeight, HeaderDetails[i].HFontSize, HeaderDetails[i].HFont, HeaderDetails[i].HFontStyle, HeaderDetails[i].HForeColor, 'transparent', HeaderDetails[i].Hallignment, 0);
							label.backgroundColor = HeaderDetails[i].HBackColor;//'#a60f16';'#595756';//
							label.left = dLeftPos + '%';
							label.top = dTopPos;
						} else {
							//label = commonObj.FormTextFieldObj.createTextField(true, HeaderDetails[i].columnText, commonObj.ColumnWidth + '%', HeaderDetails[i].headerHeight, HeaderDetails[i].HFontSize, HeaderDetails[i].HFont, HeaderDetails[i].HForeColor, 'transparent', HeaderDetails[i].allignment, false, 'TEXT');
							//label = commonObj.BasicLabelObj.createLabel(HeaderDetails[i].columnText, 0, HeaderDetails[i].headerHeight, HeaderDetails[i].HFontSize, HeaderDetails[i].HFont, HeaderDetails[i].HFontStyle, HeaderDetails[i].HForeColor, 'transparent', HeaderDetails[i].allignment, 0);
							label = commonObj.BasicLabelObj.createLabel(HeaderDetails[i].columnText, commonObj.ColumnWidth + '%', HeaderDetails[i].headerHeight, HeaderDetails[i].HFontSize, HeaderDetails[i].HFont, HeaderDetails[i].HFontStyle, HeaderDetails[i].HForeColor, 'transparent', HeaderDetails[i].Hallignment, 0);
							//label.color = Ti.App.listForeColor;//'#000080';//'#e8e8e8';
							label.left = dLeftPos + '%';
							label.top = dTopPos;
							label.borderWidth = 1;
							label.borderColor = sListBorderColor;//'#e8e8e8';//'#3b3b3b';//
							label.editable = false;
							label.enabled = false;
							label.backgroundColor = HeaderDetails[i].HBackColor;//'#a60f16';//'#595756';//
							label.horizontalWrap = true;
							if (Ti.version < '8.0.0') {
								label.wordWrap = true;
							}
							/*label.addEventListener('longpress', function(e) {
								if (COMMON.avoidMultipleClick()) {
									return;
								}
								if (bIsAndroid) {
									var TOAST = require('/BaseComponents/Toast');
									var Toast = new TOAST();
									Toast.show(this.text);
								} else {
									tooltip.title = 'What is ' + this.text + ' ?';
									tooltip.message = this.text;
									tooltip.show();
								}
							});*/
						}
						salesHeaderList.add(label);
						dLeftPos += commonObj.ColumnWidth;
					}
				}
			}
			try {
				//COMMON.Log('salesHeaderList.dHeaderWidth headerTotalLength'+headerTotalLength);
				salesHeaderList.dHeaderWidth = headerTotalLength;//GetHeader Width
				var _tmpTblHeaderView = new BasicTableView().createTableView();
				var _tmpTblHeaderRow = new BasicRow().createBasicRow(0, 'TableHeader', false);
				_tmpTblHeaderRow.backgroundColor = salesHeaderList.backgroundColor;//'transparent';
				_tmpTblHeaderView.top = 0;
				_tmpTblHeaderView.left = 0;
				_tmpTblHeaderView.width = headerTotalLength;//Ti.UI.SIZE;
				_tmpTblHeaderView.height = salesHeaderList.height;
				_tmpTblHeaderRow.height = salesHeaderList.height;
				_tmpTblHeaderRow.index = 0;
				_tmpTblHeaderRow.add(salesHeaderList);
				//var arr = [];
				//arr.push(_tmpTblHeaderRow);
				//_tmpTblHeaderView.data = arr;
				_tmpTblHeaderView.data = [_tmpTblHeaderRow];
			} catch (e) { }
			return _tmpTblHeaderView;
		} catch (e) { }
	},
	loadListConfig1: function (screenName) {
		headerListLength = Titanium.App.Properties.getInt('TotalWidth_' + screenName);
		if (screenName == '' || headerListLength == 0) {
			return;
		}

		sListBorderColor = sListBorderColor;//'#3333ff';
		title = screenName;
		HeaderDetails = this.getListConfigByScreenName(screenName);
		headerTotalLength = 0;
		widthRatio = 0;
		var salesHeaderList = TableViewBasicUIObj.createBasicView(null, 'transparent', Ti.UI.SIZE, '100%', 0, 0, null, null, 'absolute');//'horizontal');
		/*
		- - - - - - - - - - - - - - - — — - - - - - - - - - - - -
			SPLIT COLUMN
		- - - - - - - - - - - - - - - — — - - - - - - - - - - - -
		FieldName	NEWTXT		DATAMEMBER	HDR
		- - - - - - - - - - - - - - - — — - - - - - - - - - - - -
		ItemNo		SKU			ItemNo
		ItemName	Name		ItemName
		BOX			BOX			BOXQTY		QTY
		LOOSE		LOOSE		LOOSEQTY	QTY
		QTY			QUANTITY	
		- - - - - - - - - - - - - - - — — - - - - - - - - - - - -
		*/
		dLeftPos = 0; dLineIndex = 0; dTopPos = 0; rowHeight = 0;
		if (HeaderDetails != undefined && HeaderDetails != null) {
			var label = '';
			salesHeaderList.backgroundColor = HeaderDetails[0].HBackColor;//'#a60f16';'#595756';//
			headerTotalLength = parseInt(this.getListWidth(screenName));
			widthRatio = (headerListLength / ((100 / (Ti.App.DeviceWidth * 0.94)) * headerTotalLength));
			_LoopLen = HeaderDetails.length;
			for (var i = 0; i < _LoopLen; i++) {
				if (rowHeight < HeaderDetails[i].headerHeight) {
					rowHeight = HeaderDetails[i].headerHeight;
				}
				if (dLineIndex != HeaderDetails[i].LineIndex) {
					dLeftPos = 0;
				}
				//salesHeaderList.backgroundColor = HeaderDetails[0].HBackColor;
				dLineIndex = HeaderDetails[i].LineIndex;
				dLineIndex = (dLineIndex == null || dLineIndex == '' || dLineIndex == undefined) ? 0 : dLineIndex;
				salesHeaderList.height = rowHeight * (dLineIndex + 1);
				dTopPos = dLineIndex * rowHeight;
				//COMMON.Log('%$#@ ---> ' + HeaderDetails[i].columnWidth + ' : ' + widthRatio + ' : ' + headerListLength + ' : headerTotalLength -->  ' + headerTotalLength + ' Percentage --> ' + (HeaderDetails[i].columnWidth * widthRatio * 100 / headerListLength) + '%');
				if (HeaderDetails[i].Header != "") {
					try {
						var _sHeader = HeaderDetails[i].Header;
						var _width = (HeaderDetails[i].columnWidth * widthRatio * 100 / headerListLength);
						var sScreenNameTitle = "";
						//var db = commonObj.dbConnectionObj.createDataBaseConnection();
						dbDataRows = Ti.App.configDBConn.execute('SELECT * FROM ListConfig where ScreenName = ' + Ti.App.SQL.safeSQL(screenName) + ' and Language = ' + Ti.App.SQL.safeSQL(Ti.App.sLanguage) + ' and FieldName = ' + Ti.App.SQL.safeSQL(HeaderDetails[i].Header) + ' order by ScreenName, DisplayNo');
						while (dbDataRows.isValidRow()) {
							sScreenNameTitle = dbDataRows.fieldByName('NewText');
							dbDataRows.next();
						}
						dbDataRows.close();
						//db.close();
						var _LoopLen1 = HeaderDetails.length;
						for (var j = i + 1; j < _LoopLen1; j++) {
							//COMMON.Log('_HeaderDetails[' + j + '].columnWidth ---> ' + HeaderDetails[j].columnWidth);
							//COMMON.Log('_width ---> ' + _width);
							if (HeaderDetails[j].Header == _sHeader) {
								_width = _width + (HeaderDetails[j].columnWidth * widthRatio * 100 / headerListLength);
							} else {
								j = _LoopLen1;//HeaderDetails.length;
							}
						}
						var _sSplitView = TableViewBasicUIObj.createBasicView(null, 'transparent', HeaderDetails[i].headerHeight, (_width) + "%", 0, 0, 0, 0, 'vertical');
						_sSplitView.borderWidth = 1;
						_sSplitView.borderColor = sListBorderColor;//'#e8e8e8';//'#3b3b3b';//
						_sSplitView.left = dLeftPos + '%';
						_sSplitView.top = dTopPos;
						salesHeaderList.add(_sSplitView);
						dLeftPos += _width;
						var label = commonObj.FormTextFieldObj.createTextField(true, sScreenNameTitle, '100%', HeaderDetails[i].headerHeight / 2, HeaderDetails[i].HFontSize, HeaderDetails[i].HFont, HeaderDetails[i].HForeColor, 'transparent', 0, false, 'TEXT');
						label.left = 0;
						label.editable = false;
						label.enabled = false;
						label.backgroundColor = HeaderDetails[i].HBackColor;//'#595756';//
						label.verticalAlign = Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER;
						_sSplitView.add(label);
						//COMMON.Log('LISTCONFIG : HeaderDetails[i].headerHeight ---> ' + HeaderDetails[i].headerHeight);
						var _sSplitHRView = TableViewBasicUIObj.createBasicView(null, 'transparent', HeaderDetails[i].headerHeight / 2, "100%", 0, 0, 0, 0, 'horizontal');
						_sSplitView.add(_sSplitHRView);
						var l1 = commonObj.FormTextFieldObj.createTextField(true, HeaderDetails[i].columnText, ((((HeaderDetails[i].columnWidth * widthRatio * 100 / headerListLength) / _width) * 100) - 0.2) + '%', HeaderDetails[i].headerHeight / 2, HeaderDetails[i].HFontSize, HeaderDetails[i].HFont, HeaderDetails[i].HForeColor, 'transparent', HeaderDetails[i].allignment, false, 'TEXT');
						l1.left = 0;
						l1.borderWidth = 1;
						l1.borderColor = sListBorderColor;//'#e8e8e8';//'#3b3b3b';//
						l1.editable = false;
						l1.enabled = false;
						l1.backgroundColor = HeaderDetails[i].HBackColor;//'#595756';//
						l1.verticalAlign = Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER;
						_sSplitHRView.add(l1);
						var _LoopLen1 = HeaderDetails.length;
						for (var j = i + 1; j < _LoopLen1; j++) {
							if (HeaderDetails[j].Header == _sHeader) {
								var l2 = commonObj.FormTextFieldObj.createTextField(true, HeaderDetails[j].columnText, ((((HeaderDetails[j].columnWidth * widthRatio * 100 / headerListLength) / _width) * 100)) + '%', HeaderDetails[j].headerHeight / 2, HeaderDetails[j].HFontSize, HeaderDetails[j].HFont, HeaderDetails[j].HForeColor, 'transparent', HeaderDetails[j].Hallignment, false, 'TEXT');
								l2.left = 0;
								l2.borderWidth = 1;
								l2.borderColor = sListBorderColor;//'#e8e8e8';//'#3b3b3b';//
								l2.editable = false;
								l2.enabled = false;
								l2.backgroundColor = HeaderDetails[j].HBackColor;//'#595756';//
								l2.verticalAlign = Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER;
								_sSplitHRView.add(l2);
								i++;
							} else {
								j = _LoopLen1;//HeaderDetails.length;
							}
						}
					} catch (e) {
						i++;
					}
				} else {
					if (HeaderDetails[i].columnWidth == 0) {
						label = commonObj.BasicLabelObj.createLabel(HeaderDetails[i].columnText, 0, HeaderDetails[i].headerHeight, HeaderDetails[i].HFontSize, HeaderDetails[i].HFont, HeaderDetails[i].HFontStyle, HeaderDetails[i].HForeColor, 'transparent', HeaderDetails[i].allignment, 0);
						label.backgroundColor = HeaderDetails[i].HBackColor;//'#a60f16';'#595756';//
						label.left = dLeftPos + '%';
						label.top = dTopPos;
					} else {
						label = commonObj.FormTextFieldObj.createTextField(true, HeaderDetails[i].columnText, (HeaderDetails[i].columnWidth * widthRatio * 100 / headerListLength) + '%', HeaderDetails[i].headerHeight, HeaderDetails[i].HFontSize, HeaderDetails[i].HFont, HeaderDetails[i].HForeColor, 'transparent', HeaderDetails[i].allignment, false, 'TEXT');
						label.color = '#e8e8e8';
						label.left = dLeftPos + '%';
						label.top = dTopPos;
						label.borderWidth = 1;
						label.borderColor = sListBorderColor;//'#e8e8e8';//'#3b3b3b';//
						label.editable = false;
						label.enabled = false;
						label.backgroundColor = HeaderDetails[i].HBackColor;//'#a60f16';//'#595756';//
						/*label.addEventListener('longpress', function(e) {
							if (COMMON.avoidMultipleClick()) {
								return;
							}
							if (bIsAndroid) {
								var TOAST = require('/BaseComponents/Toast');
								var Toast = new TOAST();
								Toast.show(this.text);
							} else {
								tooltip.title = 'What is ' + this.text + ' ?';
								tooltip.message = this.text;
								tooltip.show();
							}
						});*/
					}
					salesHeaderList.add(label);
					dLeftPos += (HeaderDetails[i].columnWidth * widthRatio * 100 / headerListLength);
				}
			}
		}
		var _tmpTblHeaderRow = new BasicRow().createBasicRow(0, 'TableHeader', false);
		_tmpTblHeaderRow.backgroundColor = salesHeaderList.backgroundColor;//'transparent';
		_tmpTblHeaderRow.height = salesHeaderList.height;
		_tmpTblHeaderRow.index = 0;
		_tmpTblHeaderRow.add(salesHeaderList);
		return _tmpTblHeaderRow;
	},
	loadListConfigArrNew: function (screenName) {
		commonObj.headerListLength = Titanium.App.Properties.getInt('TotalWidth_' + screenName);
		if (screenName == '' || commonObj.headerListLength == 0) {
			return;
		}
		title = screenName;
		HeaderDetails = this.getListConfigByScreenName(screenName);

		fieldNames = [];
		commonObj.details = HeaderDetails;//this.getListConfigByScreenName(screenName);
		if (commonObj.details != undefined && commonObj.details != null) {
			for (var c = 0; c < commonObj.details.length; c++) {
				fieldNames.push('' + commonObj.details[c].DataMember.toUpperCase());
			}
		}

	},
	loadListConfigArr: function (screenName) {
		commonObj.headerListLength = Titanium.App.Properties.getInt('TotalWidth_' + screenName);
		if (screenName == '' || commonObj.headerListLength == 0) {
			return;
		}
		title = screenName;
		HeaderDetails = this.getListConfigByScreenName(screenName);
	},
	getListWidth: function (screenName) {
		//COMMON.Log('MSB WIdth --> ' + Ti.App.DeviceWidth + ' - MSB Height --> ' + Ti.App.DeviceHeight);
		//COMMON.Log('MSB 623 ---> TotalWidth_' + screenName);
		commonObj.headerTotalLength = Titanium.App.Properties.getInt('TotalWidth_' + screenName);
		//COMMON.Log('MSB 111 ---> commonObj.headerTotalLength : ' + commonObj.headerTotalLength);
		commonObj.headerTotalLength = (commonObj.headerTotalLength == null || commonObj.headerTotalLength == '') ? 100 : commonObj.headerTotalLength;
		//COMMON.Log('MSB 111 ---> ' + Ti.App.DeviceWidth + ' : ' + Ti.App.DeviceHeight + ' : ' + commonObj.headerTotalLength);
		/*if (Ti.App.DeviceWidth > Ti.App.DeviceHeight) {
			if (Ti.App.NUMBER.ceil(((Ti.App.DeviceWidth * commonObj.headerTotalLength) / 100)) > Ti.App.DeviceWidth) {
				//COMMON.Log('MSB WIdth a--> ' + Ti.App.NUMBER.ceil(((Ti.App.DeviceWidth * commonObj.headerTotalLength) / 100)));
				return Ti.App.NUMBER.ceil(((Ti.App.DeviceWidth * commonObj.headerTotalLength) / 100));
			} else {
				//COMMON.Log('MSB WIdth b--> ' + Ti.App.DeviceWidth);
				return Ti.App.DeviceWidth;
			}
		} else {
			if (Ti.App.NUMBER.ceil(((Ti.App.DeviceWidth * commonObj.headerTotalLength) / 100)) > Ti.App.DeviceHeight) {
				//COMMON.Log('MSB WIdth c--> ' + Ti.App.NUMBER.ceil(((Ti.App.DeviceWidth * commonObj.headerTotalLength) / 100)));
				return Ti.App.NUMBER.ceil(((Ti.App.DeviceWidth * commonObj.headerTotalLength) / 100));
			} else {
				//COMMON.Log('MSB WIdth d --> ' + Ti.App.DeviceHeight);
				return Ti.App.DeviceHeight;
			}
		}*/
		//COMMON.Log('MSB WIdth c--> ' + Ti.App.NUMBER.ceil(((Ti.App.DeviceWidth * 0.94 * commonObj.headerTotalLength) / 100)));
		return Ti.App.NUMBER.ceil(((Ti.App.DeviceWidth * 0.94 * commonObj.headerTotalLength) / 100));
	},
	setSearchConfig: function (language) {
		return true;

		//var db = commonObj.dbConnectionObj.createDataBaseConnection();
		//COMMON.Log('Search Config Start : ' + new Date().getTime());
		var SearchDataList = [], searchdata = {}, screenName = '';
		dbDataRows = Ti.App.configDBConn.execute('SELECT * FROM SearchConfig where Language = ' + Ti.App.SQL.safeSQL(language) + 'order by ScreenName, DisplayNo ');
		while (dbDataRows.isValidRow()) {
			if (screenName != '' && screenName != '' + dbDataRows.fieldByName('ScreenName')) {
				Titanium.App.Properties.setList('SearchConfig_' + screenName, SearchDataList);
				SearchDataList = [];
			}
			screenName = dbDataRows.fieldByName('ScreenName');
			searchdata = {};
			searchdata.ScreenName = screenName;//dbDataRows.fieldByName('ScreenName');
			searchdata.FieldName = dbDataRows.fieldByName('FieldName');
			searchdata.DefaultText = dbDataRows.fieldByName('DefaultText');
			searchdata.NewText = dbDataRows.fieldByName('NewText');
			searchdata.DisplayNo = dbDataRows.fieldByName('DisplayNo');
			searchdata.IsSearch = dbDataRows.fieldByName('IsSearch');
			searchdata.SearchType = dbDataRows.fieldByName('SearchType');
			searchdata.SearchControl = dbDataRows.fieldByName('SearchControl');
			searchdata.DataMember = dbDataRows.fieldByName('FieldName');
			SearchDataList.push(searchdata);
			dbDataRows.next();
		}
		dbDataRows.close();
		//db.close();
		if (screenName != '') {
			Titanium.App.Properties.setList('SearchConfig_' + screenName, SearchDataList);
		}
		//db = null;
		SearchDataList = []; SearchDataList = null;
		searchdata = {}; searchdata = null;
		dbDataRows = null;
		//COMMON.Log('Search Config End : ' + new Date().getTime());
		return true;
	},
	setColorConfig: function (language) {
		//var db = commonObj.dbConnectionObj.createDataBaseConnection();
		var qry = "";
		dbDataRows = "";
		//COMMON.Log('Color Config Start : ' + new Date().getTime());
		qry = 'SELECT * FROM ColorConfig order by ScreenName, FieldName';
		//WHERE ScreenName like "' + screenName + '" order by ScreenName, DisplayNo';
		//COMMON.Log('ListConfig Qry --> ' + qry);
		dbDataRows = Ti.App.configDBConn.execute(qry);
		//var iIndex = 0;
		var screenName = '';
		var arrObj = {};
		var arrColorConfigList = [];
		while (dbDataRows.isValidRow()) {
			if (screenName != '' && screenName != '' + dbDataRows.fieldByName('ScreenName')) {
				//COMMON.Log('Set ColorConfig_' + screenName);
				Titanium.App.Properties.setList('ColorConfig_' + screenName, arrColorConfigList);
				arrColorConfigList = [];
			}
			screenName = dbDataRows.fieldByName('ScreenName');
			arrObj = {};
			arrObj.ScreenName = screenName;//dbDataRows.fieldByName('ScreenName');
			arrObj.FieldName = dbDataRows.fieldByName('FieldName');
			arrObj.Condition = dbDataRows.fieldByName('Condition');
			arrObj.ConditionField = dbDataRows.fieldByName('ConditionField');
			arrObj.ConditionValue = dbDataRows.fieldByName('ConditionValue');
			arrObj.CForeColor = dbDataRows.fieldByName('CForeColor');
			arrObj.CBackColor = dbDataRows.fieldByName('CBackColor');
			if (dbDataRows.fieldByName('ConditionField') == '') {
				arrObj.CBackColor = 'transparent';
			}
			try {
				arrObj.CRowColor = COMMON.CheckDecimal(dbDataRows.fieldByName('RowColor'));
			} catch (e) {
				arrObj.CRowColor = 0;
			}
			arrColorConfigList.push(arrObj);
			dbDataRows.next();
		}
		dbDataRows.close();
		//db.close();
		if (screenName != '') {
			//COMMON.Log('Set ColorConfig_' + screenName);
			Titanium.App.Properties.setList('ColorConfig_' + screenName, arrColorConfigList);
		}
		//db = null; 
		dbDataRows = null;
		qry = ""; qry = null;
		arrObj = {}; arrObj = null;
		arrColorConfigList = []; arrColorConfigList = null;
		//COMMON.Log('Color Config End : ' + new Date());
	},
	setListConfig: function (language) {
		//dbDataRows = Ti.App.dbConn.execute('Select ScreenName, SUM(ColumnWidth) as TotalWidth from ListConfig where  ifnull(LineIndex,0) = 0 or ifnull(LineIndex,0) = 1 and [Language] = ' + Ti.App.SQL.safeSQL(language) + ' group by ScreenName order by ScreenName');
		dbDataRows = Ti.App.configDBConn.execute('Select ScreenName, SUM(ColumnWidth) as TotalWidth from ListConfig where  (ifnull(LineIndex,0) = 0 or ifnull(LineIndex,0) = 1) and [Language] = ' + Ti.App.SQL.safeSQL(language) + ' group by ScreenName order by ScreenName');
		//dbDataRows = Ti.App.configDBConn.execute('Select ScreenName, SUM(ColumnWidth) as TotalWidth from ListConfig where [Language] = ' + Ti.App.SQL.safeSQL(language) + ' group by ScreenName order by ScreenName');
		while (dbDataRows.isValidRow()) {
			screenName = dbDataRows.fieldByName('ScreenName');

			//COMMON.Log('TotalWidth_' + screenName + ' - ' + dbDataRows.fieldByName('TotalWidth'));

			Titanium.App.Properties.setInt('TotalWidth_' + screenName, dbDataRows.fieldByName('TotalWidth'));
			dbDataRows.next();
		}
		dbDataRows.close();

		/*****/
		if (Ti.App.ProgressCount <= 5) {
			Ti.App.ProgressCount = 3;
			//Ti.App.pb.message = "Loading Lists ...";
			Ti.App.winfirst.fireEvent('ProgressCount');
		}
		/*****/

		return true;


		//var db = commonObj.dbConnectionObj.createDataBaseConnection();
		//COMMON.Log('List Config Start : ' + new Date().getTime());
		//dbDataRows = db.execute('SELECT * FROM ListConfig  where [Language] = ' + Ti.App.SQL.safeSQL(language) + ' order by ScreenName, DisplayNo');
		dbDataRows = Ti.App.configDBConn.execute('select ScreenName, HeaderHeight, HFont, HFontSize, HFontStyle, DisplayNo, FieldName, DefaultText, NewText, ColumnWidth, HBackColor, HForeColor, HBackColor, RForeColor, RBackColor, RFont, RFontSize, RFontStyle, Alignment, RowHeight, FieldControl, DataMember, DataMemberType, Header, LineIndex, Showborder, BorderColor, ColumnUnit from  ListConfig  where  DataMember <> "" and [Language] = ' + Ti.App.SQL.safeSQL(language) + ' order by ScreenName, LineIndex, DisplayNo');
		//var iIndex = 0;
		var screenName = '', headerList = [], header = {}, totalWidth = 0;
		var arrTotalWidth = [], dLineIndex = 0;
		var dFontHeightRatio = systemTableConfig['FONTRATIO'];
		dFontHeightRatio = (dFontHeightRatio == null || dFontHeightRatio == undefined || dFontHeightRatio == '') ? 1 : dFontHeightRatio;
		//COMMON.Log('dFontHeightRatio --> LISTCONFIG : ' + dFontHeightRatio);
		while (dbDataRows.isValidRow()) {
			if (screenName != '' && screenName != '' + dbDataRows.fieldByName('ScreenName')) {
				Titanium.App.Properties.setList('ListConfig_' + screenName, headerList);
				Titanium.App.Properties.setInt('TotalWidth_' + screenName, totalWidth);
				headerList = [];
				totalWidth = 0;
			}
			screenName = dbDataRows.fieldByName('ScreenName');
			header = {};
			//header.headerHeight = (Titanium.Platform.displayCaps.density == 'high') ? parseInt(pHeight*0.065) : parseInt(pHeight*0.06);//dbDataRows.fieldByName('HeaderHeight');
			header.headerHeight = parseInt(dbDataRows.fieldByName('HeaderHeight') * Ti.App.dHeightRatio);
			header.HFont = dbDataRows.fieldByName('HFont');
			//header.HFontSize = (Titanium.Platform.displayCaps.density == 'high') ? parseInt(pHeight*0.025) : parseInt(pHeight*0.02);//dbDataRows.fieldByName('HFontSize');
			//header.HFontSize = parseInt(dbDataRows.fieldByName('HFontSize') * Ti.App.dHeightRatio);
			header.HFontSize = parseInt(dbDataRows.fieldByName('HFontSize') * dFontHeightRatio);
			header.HFontStyle = dbDataRows.fieldByName('HFontStyle');
			header.screenName = screenName;//dbDataRows.fieldByName('ScreenName');
			header.displayNo = dbDataRows.fieldByName('DisplayNo');
			header.fieldName = dbDataRows.fieldByName('FieldName');
			header.defaultText = dbDataRows.fieldByName('DefaultText');
			header.columnText = dbDataRows.fieldByName('NewText');
			header.columnWidth = dbDataRows.fieldByName('ColumnWidth');
			header.ActualColumnWidth = dbDataRows.fieldByName('ColumnWidth');
			header.LineIndex = dbDataRows.fieldByName('LineIndex');
			header.LineIndex = (header.LineIndex != null && header.LineIndex != undefined && header.LineIndex != "") ? header.LineIndex : 0;
			//LineIndex
			/* 0
			 * 0
			 * 0
			 * 0
			 * 1
			 * 1
			 *
			if(dbDataRows.fieldByName('LineIndex') != dLineIndex){
				arrTotalWidth[dLineIndex] = totalWidth;
				dLineIndex = dbDataRows.fieldByName('LineIndex');
				totalWidth = header.columnWidth;
				//dLineIndex =
			}else{
				totalWidth += header.columnWidth;
				//dLineIndex =
			}
			 
			if(dbDataRows.fieldByName('MultiLine') == true){
				totalWidth = 100;	
			}else{
				totalWidth += header.columnWidth;//dbDataRows.fieldByName('ColumnWidth');
			}
			/******/
			if (header.LineIndex == 0 || header.LineIndex == 1) {
				totalWidth += header.columnWidth;
			}
			header.colnWidth = header.columnWidth;
			header.ColumnUnit = '%';//dbDataRows.fieldByName('ColumnUnit');
			header.dColumnUnit = COMMON.CheckString(dbDataRows.fieldByName('ColumnUnit'));
			header.bgColor = this.argbToRGB(dbDataRows.fieldByName('HBackColor'));
			header.HForeColor = this.argbToRGB(dbDataRows.fieldByName('HForeColor'));
			header.HBackColor = this.argbToRGB(dbDataRows.fieldByName('HBackColor'));
			header.rowTextColor = this.argbToRGB(dbDataRows.fieldByName('RForeColor'));
			header.rowBgColor = this.argbToRGB(dbDataRows.fieldByName('RBackColor'));
			//header.bgColor = dbDataRows.fieldByName('HBackColorName');
			//header.HForeColor = dbDataRows.fieldByName('HForeColorName');
			//header.HBackColor = dbDataRows.fieldByName('HBackColorName');
			//header.rowTextColor = dbDataRows.fieldByName('RForeColorName');
			//header.rowBgColorName = dbDataRows.fieldByName('RBackColorName');
			//header.rowARForeColorName = dbDataRows.fieldByName('ARForeColorName');
			//header.rowARBackColorName = dbDataRows.fieldByName('ARBackColorName');
			header.fontName = dbDataRows.fieldByName('RFont');
			//header.fontSize =  (Titanium.Platform.displayCaps.density == 'high') ? parseInt(pHeight*0.025) : parseInt(pHeight*0.02);//dbDataRows.fieldByName('RFontSize');
			//header.fontSize =  parseInt(dbDataRows.fieldByName('RFontSize') * Ti.App.dHeightRatio);
			header.fontSize = parseInt(dbDataRows.fieldByName('RFontSize') * dFontHeightRatio);
			header.fontStyle = dbDataRows.fieldByName('RFontStyle');
			header.allignment = dbDataRows.fieldByName('Alignment');
			//header.rowHeight = (Titanium.Platform.displayCaps.density == 'high') ? parseInt(pHeight*0.065) : parseInt(pHeight*0.06);//dbDataRows.fieldByName('RowHeight');
			header.rowHeight = parseInt(dbDataRows.fieldByName('RowHeight') * Ti.App.dHeightRatio);
			header.fieldControl = ('' + dbDataRows.fieldByName('FieldControl')).toUpperCase();
			//header.isSearch = dbDataRows.fieldByName('IsSearch');
			//header.searchType = dbDataRows.fieldByName('SearchType');
			header.DataMember = dbDataRows.fieldByName('DataMember');
			header.DataMemberType = dbDataRows.fieldByName('DataMemberType');
			header.Header = dbDataRows.fieldByName('Header');
			header.Header = (header.Header != null && header.Header != undefined && header.Header != "") ? header.Header : "";
			try {
				header.showBorder = COMMON.CheckDecimal(dbDataRows.fieldByName('ShowBorder'));
			} catch (e) {
				header.showBorder = 0;
			}
			try {
				if (header.showBorder == 1) {
					header.borderColor = this.argbToRGB(dbDataRows.fieldByName('BorderColor'));
					header.borderColor = (header.borderColor == null || header.borderColor == undefined || header.borderColor == '') ? '#3b3b3b' : header.borderColor;
				} else {
					header.borderColor = 'transparent';
				}
			} catch (e) {
				header.borderColor = 'transparent';
			}
			headerList.push(header);
			headerList.totalWidth = 100;
			dbDataRows.next();
		}
		dbDataRows.close();
		//db.close();
		if (screenName != '') {
			Titanium.App.Properties.setInt('TotalWidth_' + screenName, totalWidth);
			Titanium.App.Properties.setList('ListConfig_' + screenName, headerList);
		}
		//COMMON.Log('List Config End : ' + new Date().getTime());
		//db = null;
		dbDataRows = null;
		headerList = []; headerList = null;
		header = {}; header = null;
		totalWidth = 0; totalWidth = null;
		arrTotalWidth = []; arrTotalWidth = null;
		dLineIndex = 0; dLineIndex = null;

		/*****/
		if (Ti.App.ProgressCount <= 5) {
			Ti.App.ProgressCount = 3;
			//Ti.App.pb.message = "Loading Lists ...";
			Ti.App.winfirst.fireEvent('ProgressCount');
		}
		/*****/
		return true;
	},
	setListConfigByScreenname: function (sScreenName) {
		stmpActiveScreenName = '';
		//var db = commonObj.dbConnectionObj.createDataBaseConnection();
		//COMMON.Log('List Config Start : ' + new Date().getTime());
		//dbDataRows = db.execute('SELECT * FROM ListConfig  where [Language] = ' + Ti.App.SQL.safeSQL(language) + ' order by ScreenName, DisplayNo');
		//dbDataRows = db.execute('select ScreenName, HeaderHeight, HFont, HFontSize, HFontStyle, DisplayNo, FieldName, NewText, ColumnWidth, HBackColor, HForeColor, HBackColor, RForeColor, RBackColor, RFont, RFontSize, RFontStyle, Alignment, RowHeight, FieldControl, DataMember, DataMemberType, Header, LineIndex, Showborder, BorderColor from  ListConfig  where  DataMember <> "" and [Language] = ' + Ti.App.SQL.safeSQL(language) + ' order by ScreenName, DisplayNo');
		var language = 'English';//Ti.App.sLanguage;//'English';

		//var qry = this.getQueryConfigByScreenNameWithOrderText(sScreenName+'_USER_ListConfig');
		//COMMON.Log("SELECT FieldName, DefaultText, NewText, ColumnWidth, Alignment, HForeColor, HBackColor, RForeColor, RBackColor, ARForeColor, ARBackColor, HFont, HFontSize, HFontStyle, RFont, RFontSize, RFontStyle, DisplayNo, ScreenName, DataMember, HeaderHeight, RowHeight, GridBackColorName, GridBackColor, ScrollBarWidth, Language, IsSearch, SearchType, SearchControl, FieldControl, DataMemberType, ParentName, Header, LineIndex, BorderColor, ShowBorder FROM ListConfig WHERE [Language] = " + Ti.App.SQL.safeSQL(language) + " and Screenname like " + Ti.App.SQL.safeSQL(sScreenName) + " UNION SELECT CustDepartment.DeptCode as FieldName, DefaultText, CustDepartment.DeptName as NewText, ColumnWidth, Alignment, HForeColor, HBackColor, RForeColor, RBackColor, ARForeColor, ARBackColor, HFont, HFontSize, HFontStyle, RFont, RFontSize, RFontStyle, DisplayNo+1, " + Ti.App.SQL.safeSQL(sScreenName) + ", CustDepartment.DeptCode as DataMember, HeaderHeight, RowHeight, GridBackColorName, GridBackColor, ScrollBarWidth, Language, IsSearch, SearchType, SearchControl, 'EDITABLETEXTBOX' as FieldControl, DataMemberType, " + Ti.App.SQL.safeSQL(sScreenName) + ", Header, LineIndex, BorderColor, ShowBorder FROM CustDepartment, ListConfig  WHERE [Language] = " + Ti.App.SQL.safeSQL(language) + " and Screenname like 'ProposeOrder-Dept' and FieldName = 'Qty' Order by DIsplayNo");
		/*
		if(sScreenName == 'Propose Summary'){
			dbDataRows = db.execute("SELECT FieldName, DefaultText, NewText, ColumnWidth, Alignment, HForeColor, HBackColor, RForeColor, RBackColor, ARForeColor, ARBackColor, HFont, HFontSize, HFontStyle, RFont, RFontSize, RFontStyle, DisplayNo, ScreenName, DataMember, HeaderHeight, RowHeight, GridBackColorName, GridBackColor, ScrollBarWidth, Language, IsSearch, SearchType, SearchControl, FieldControl, DataMemberType, ParentName, Header, LineIndex, BorderColor, ShowBorder FROM ListConfig WHERE [Language] = " + Ti.App.SQL.safeSQL(language) + " and Screenname like '"+sScreenName+"_FORM%' UNION SELECT CustDepartment.DeptCode as FieldName, DefaultText, CustDepartment.DeptName as NewText, ColumnWidth, Alignment, HForeColor, HBackColor, RForeColor, RBackColor, ARForeColor, ARBackColor, HFont, HFontSize, HFontStyle, RFont, RFontSize, RFontStyle, DisplayNo+1, 'Propose Summary_FORM_LISTVIEW_SalesItelList', CustDepartment.DeptCode as DataMember, HeaderHeight, RowHeight, GridBackColorName, GridBackColor, ScrollBarWidth, Language, IsSearch, SearchType, SearchControl, 'EDITABLETEXTBOX' as FieldControl, DataMemberType, screenname, Header, LineIndex, BorderColor, ShowBorder FROM CustDepartment, ListConfig  WHERE [Language] = " + Ti.App.SQL.safeSQL(language) + " and Screenname like '"+sScreenName+"_dept' and FieldName = 'Qty' Order by DIsplayNo");	
			//dbDataRows = db.execute("SELECT FieldName, DefaultText, NewText, ColumnWidth, Alignment, HForeColor, HBackColor, RForeColor, RBackColor, ARForeColor, ARBackColor, HFont, HFontSize, HFontStyle, RFont, RFontSize, RFontStyle, DisplayNo, ScreenName, DataMember, HeaderHeight, RowHeight, GridBackColorName, GridBackColor, ScrollBarWidth, Language, IsSearch, SearchType, SearchControl, FieldControl, DataMemberType, ParentName, Header, LineIndex, BorderColor, ShowBorder FROM ListConfig WHERE [Language] = " + Ti.App.SQL.safeSQL(language) + " and Screenname like '"+sScreenName+"_FORM%' ");	
		}else{
			dbDataRows = db.execute("SELECT FieldName, DefaultText, NewText, ColumnWidth, Alignment, HForeColor, HBackColor, RForeColor, RBackColor, ARForeColor, ARBackColor, HFont, HFontSize, HFontStyle, RFont, RFontSize, RFontStyle, DisplayNo, ScreenName, DataMember, HeaderHeight, RowHeight, GridBackColorName, GridBackColor, ScrollBarWidth, Language, IsSearch, SearchType, SearchControl, FieldControl, DataMemberType, ParentName, Header, LineIndex, BorderColor, ShowBorder FROM ListConfig WHERE [Language] = " + Ti.App.SQL.safeSQL(language) + " and Screenname like " + Ti.App.SQL.safeSQL(sScreenName) + " UNION SELECT CustDepartment.DeptCode as FieldName, DefaultText, CustDepartment.DeptName as NewText, ColumnWidth, Alignment, HForeColor, HBackColor, RForeColor, RBackColor, ARForeColor, ARBackColor, HFont, HFontSize, HFontStyle, RFont, RFontSize, RFontStyle, DisplayNo+1, " + Ti.App.SQL.safeSQL(sScreenName) + ", CustDepartment.DeptCode as DataMember, HeaderHeight, RowHeight, GridBackColorName, GridBackColor, ScrollBarWidth, Language, IsSearch, SearchType, SearchControl, 'EDITABLETEXTBOX' as FieldControl, DataMemberType, " + Ti.App.SQL.safeSQL(sScreenName) + ", Header, LineIndex, BorderColor, ShowBorder FROM CustDepartment, ListConfig  WHERE [Language] = " + Ti.App.SQL.safeSQL(language) + " and Screenname like '"+sScreenName+"-Dept' and FieldName = 'Qty' Order by DIsplayNo");
			//dbDataRows = db.execute("SELECT FieldName, DefaultText, NewText, ColumnWidth, Alignment, HForeColor, HBackColor, RForeColor, RBackColor, ARForeColor, ARBackColor, HFont, HFontSize, HFontStyle, RFont, RFontSize, RFontStyle, DisplayNo, ScreenName, DataMember, HeaderHeight, RowHeight, GridBackColorName, GridBackColor, ScrollBarWidth, Language, IsSearch, SearchType, SearchControl, FieldControl, DataMemberType, ParentName, Header, LineIndex, BorderColor, ShowBorder FROM ListConfig WHERE [Language] = " + Ti.App.SQL.safeSQL(language) + " and Screenname like '"+sScreenName+"%' UNION SELECT CustDepartment.DeptCode as FieldName, DefaultText, CustDepartment.DeptName as NewText, ColumnWidth, Alignment, HForeColor, HBackColor, RForeColor, RBackColor, ARForeColor, ARBackColor, HFont, HFontSize, HFontStyle, RFont, RFontSize, RFontStyle, DisplayNo+1, " + Ti.App.SQL.safeSQL(sScreenName) + ", CustDepartment.DeptCode as DataMember, HeaderHeight, RowHeight, GridBackColorName, GridBackColor, ScrollBarWidth, Language, IsSearch, SearchType, SearchControl, 'EDITABLETEXTBOX' as FieldControl, DataMemberType, " + Ti.App.SQL.safeSQL(sScreenName) + ", Header, LineIndex, BorderColor, ShowBorder FROM CustDepartment, ListConfig  WHERE [Language] = " + Ti.App.SQL.safeSQL(language) + " and Screenname like '"+sScreenName+"-Dept' and FieldName = 'Qty' Order by DIsplayNo");
		}*/
		arrVariant2Code = [];
		arrVariant2LineNo = [];
		var qry = "";

		/*qry = "SELECT DISTINCT Variant2, Var2LineNo FROM  ItemVariant WHERE ItemNo =" + SQL.safeSQL(Ti.App.sItemNo);
        dbDataRows = Ti.App.dbConn.execute(qry);
        while (dbDataRows.isValidRow()) {
            arrVariant2Code.push(dbDataRows.fieldByName('Variant2'));// = [];
            arrVariant2LineNo.push(dbDataRows.fieldByName('Var2LineNo'));// = [];
            dbDataRows.next();
        }
        dbDataRows.close();
		
		if(sScreenName == 'Lot Details variant')
		{
			qry = "SELECT * FROM ListConfig  where [Language] = 'English' and screenname ='Lot Details variant' and [Language] = 'English'";
			for(var _i=0; _i<arrVariant2Code.length; _i++){
	            qry = qry + " UNION"; 
	            //qry = qry + " SELECT DISTINCT 'Key' || '" + arrVariant2Code[_i] + "' as FieldName,  '" + arrVariant2Code[_i] + "'  as DefaultText, " + arrVariant2Code[_i] + " as NewText, ColumnWidth as ColumnWidth, Alignment, HForeColor, HBackColor, RForeColor, RBackColor, ARForeColor, ARBackColor, HFont, HFontSize, HFontStyle, RFont, RFontSize, RFontStyle,  " + arrVariant2LineNo[_i] + "*3 as DisplayNo, 'Lot Details variant' as screenname, 'Key' || '" + arrVariant2Code[_i] + "' as DataMember, HeaderHeight, RowHeight, GridBackColorName, GridBackColor, ScrollBarWidth, Language, IsSearch, SearchType, SearchControl,  FieldControl as FieldControl, ListConfig.ts,  DataMemberType,'Lot Details variant' as ParentName," + arrVariant2Code[_i] + " as Header,LineIndex,BorderColor,ShowBorder FROM  ListConfig where  screenname ='TEMPLATEVARIANTKEY' and [Language] = 'English'"; 
                qry = qry + " SELECT DISTINCT 'Key' || '" + arrVariant2Code[_i] + "' as FieldName,  '" + arrVariant2Code[_i] + "'  as DefaultText, 'Stock' as NewText, ColumnWidth as ColumnWidth, Alignment, HForeColor, HBackColor, RForeColor, RBackColor, ARForeColor, ARBackColor, HFont, HFontSize, HFontStyle, RFont, RFontSize, RFontStyle,  " + arrVariant2LineNo[_i] + "*3 as DisplayNo, 'Lot Details variant' as screenname, 'Key' || '" + arrVariant2Code[_i] + "' as DataMember, HeaderHeight, RowHeight, GridBackColorName, GridBackColor, ScrollBarWidth, Language, IsSearch, SearchType, SearchControl,  FieldControl as FieldControl, ListConfig.ts,  DataMemberType,'Lot Details variant' as ParentName,'" + arrVariant2Code[_i] + "' as Header,LineIndex,BorderColor,ShowBorder FROM  ListConfig where  screenname ='TEMPLATEVARIANTKEY' and [Language] = 'English'"; 
                qry = qry + " UNION ";
	            //qry = qry + " SELECT DISTINCT 'Val' || '" + arrVariant2Code[_i] + "' as FieldName, '" + arrVariant2Code[_i] + "'  as DefaultText, " + arrVariant2Code[_i] + " as NewText, ColumnWidth as ColumnWidth, Alignment, HForeColor, HBackColor, RForeColor, RBackColor, ARForeColor, ARBackColor, HFont, HFontSize, HFontStyle, RFont, RFontSize, RFontStyle, (" + arrVariant2LineNo[_i] + "*3)+1 as DisplayNo, 'Lot Details variant' as screenname, 'Val' || '" + arrVariant2Code[_i] + "' as DataMember, HeaderHeight, RowHeight, GridBackColorName, GridBackColor, ScrollBarWidth, Language, IsSearch, SearchType, SearchControl, FieldControl as FieldControl, ListConfig.ts,  DataMemberType,'Lot Details variant' as ParentName," + arrVariant2Code[_i] + " as Header,LineIndex,BorderColor,ShowBorder FROM  ListConfig where  screenname ='TEMPLATEVARIANTVALUE' and [Language] = 'English'"; 
                qry = qry + " SELECT DISTINCT 'Val' || '" + arrVariant2Code[_i] + "' as FieldName, '" + arrVariant2Code[_i] + "'  as DefaultText, 'Qty' as NewText, ColumnWidth as ColumnWidth, Alignment, HForeColor, HBackColor, RForeColor, RBackColor, ARForeColor, ARBackColor, HFont, HFontSize, HFontStyle, RFont, RFontSize, RFontStyle, (" + arrVariant2LineNo[_i] + "*3)+1 as DisplayNo, 'Lot Details variant' as screenname, 'Val' || '" + arrVariant2Code[_i] + "' as DataMember, HeaderHeight, RowHeight, GridBackColorName, GridBackColor, ScrollBarWidth, Language, IsSearch, SearchType, SearchControl, FieldControl as FieldControl, ListConfig.ts,  DataMemberType,'Lot Details variant' as ParentName,'" + arrVariant2Code[_i] + "' as Header,LineIndex,BorderColor,ShowBorder FROM  ListConfig where  screenname ='TEMPLATEVARIANTVALUE' and [Language] = 'English'"; 
                qry = qry + " UNION ";
	            qry = qry + " SELECT DISTINCT '" + arrVariant2Code[_i] + "' as FieldName, '" + arrVariant2Code[_i] + "'  as DefaultText, '" + arrVariant2Code[_i] + "' as NewText, 0 as ColumnWidth, Alignment, HForeColor, HBackColor, RForeColor, RBackColor, ARForeColor, ARBackColor, HFont, HFontSize, HFontStyle, RFont, RFontSize, RFontStyle, (" + arrVariant2LineNo[_i] + "*3)+2 as DisplayNo, 'Lot Details variant' as screenname, ''  as DataMember, HeaderHeight, RowHeight, GridBackColorName, GridBackColor, ScrollBarWidth, Language, IsSearch, SearchType, SearchControl,  FieldControl as FieldControl, ListConfig.ts,  DataMemberType,'Lot Details variant' as ParentName,ifnull(Header,'') as Header,LineIndex,BorderColor,ShowBorder FROM  ListConfig where  screenname ='TEMPLATEVARIANTHEADER' and [Language] = 'English'"; 
	            qry = qry + " UNION ";
	            qry = qry + " SELECT 'Code' || '" + arrVariant2Code[_i] + "' as FieldName, DefaultText,  NewText, ColumnWidth, Alignment, HForeColor, HBackColor, RForeColor, RBackColor, ARForeColor, ARBackColor, HFont, HFontSize, HFontStyle, RFont, RFontSize, RFontStyle, DisplayNo, 'Lot Details variant' as screenname, 'Code' || '" + arrVariant2Code[_i] + "' as DataMember, HeaderHeight, RowHeight, GridBackColorName, GridBackColor, ScrollBarWidth, Language, IsSearch, SearchType, SearchControl,  FieldControl as FieldControl, ListConfig.ts,  DataMemberType,'Lot Details variant' as ParentName,ifnull(Header,'') as Header,LineIndex,BorderColor,ShowBorder FROM  ListConfig where screenname ='TEMPLATEVARIANTCODE' and [Language] = 'English'"; 
	            qry = qry + " UNION ";
	            qry = qry + " SELECT 'Line' || '" + arrVariant2Code[_i] + "' as FieldName, DefaultText,  NewText, ColumnWidth, Alignment, HForeColor, HBackColor, RForeColor, RBackColor, ARForeColor, ARBackColor, HFont, HFontSize, HFontStyle, RFont, RFontSize, RFontStyle, DisplayNo, 'Lot Details variant' as screenname, 'Line' || '" + arrVariant2Code[_i] + "' as DataMember, HeaderHeight, RowHeight, GridBackColorName, GridBackColor, ScrollBarWidth, Language, IsSearch, SearchType, SearchControl,  FieldControl as FieldControl, ListConfig.ts,  DataMemberType,'Lot Details variant' as ParentName,ifnull(Header,'') as Header,LineIndex,BorderColor,ShowBorder FROM  ListConfig where screenname ='TEMPLATEVARIANTLINENO' and [Language] = 'English'";  
	        }
			qry = qry + " order by DisplayNo";
		}
		else if(sScreenName == 'Lot Details variant Inv')
		{
			qry = "SELECT * FROM ListConfig  where [Language] = 'English' and screenname ='Lot Details variant Inv' and [Language] = 'English'";
			for(var _i=0; _i<arrVariant2Code.length; _i++){
	            qry = qry + " UNION"; 
	            qry = qry + " SELECT DISTINCT 'Key' || '" + arrVariant2Code[_i] + "' as FieldName,  '" + arrVariant2Code[_i] + "'  as DefaultText, 'Stock' as NewText, ColumnWidth as ColumnWidth, Alignment, HForeColor, HBackColor, RForeColor, RBackColor, ARForeColor, ARBackColor, HFont, HFontSize, HFontStyle, RFont, RFontSize, RFontStyle,  " + arrVariant2LineNo[_i] + "*3 as DisplayNo, 'Lot Details variant Inv' as screenname, 'Key' || '" + arrVariant2Code[_i] + "' as DataMember, HeaderHeight, RowHeight, GridBackColorName, GridBackColor, ScrollBarWidth, Language, IsSearch, SearchType, SearchControl,  FieldControl as FieldControl, ListConfig.ts,  DataMemberType,'Lot Details variant Inv' as ParentName,'" + arrVariant2Code[_i] + "' as Header,LineIndex,BorderColor,ShowBorder FROM  ListConfig where  screenname ='TEMPLATEVARIANTKEY' and [Language] = 'English'"; 
                qry = qry + " UNION ";
	            qry = qry + " SELECT DISTINCT 'Val' || '" + arrVariant2Code[_i] + "' as FieldName, '" + arrVariant2Code[_i] + "'  as DefaultText, 'Qty' as NewText, 0 as ColumnWidth, Alignment, HForeColor, HBackColor, RForeColor, RBackColor, ARForeColor, ARBackColor, HFont, HFontSize, HFontStyle, RFont, RFontSize, RFontStyle, (" + arrVariant2LineNo[_i] + "*3)+1 as DisplayNo, 'Lot Details variant Inv' as screenname, 'Val' || '" + arrVariant2Code[_i] + "' as DataMember, HeaderHeight, RowHeight, GridBackColorName, GridBackColor, ScrollBarWidth, Language, IsSearch, SearchType, SearchControl, FieldControl as FieldControl, ListConfig.ts,  DataMemberType,'Lot Details variant Inv' as ParentName,'" + arrVariant2Code[_i] + "' as Header,LineIndex,BorderColor,ShowBorder FROM  ListConfig where  screenname ='TEMPLATEVARIANTVALUE' and [Language] = 'English'"; 
                qry = qry + " UNION ";
	            qry = qry + " SELECT DISTINCT '" + arrVariant2Code[_i] + "' as FieldName, '" + arrVariant2Code[_i] + "'  as DefaultText, '" + arrVariant2Code[_i] + "' as NewText, 0 as ColumnWidth, Alignment, HForeColor, HBackColor, RForeColor, RBackColor, ARForeColor, ARBackColor, HFont, HFontSize, HFontStyle, RFont, RFontSize, RFontStyle, (" + arrVariant2LineNo[_i] + "*3)+2 as DisplayNo, 'Lot Details variant Inv' as screenname, ''  as DataMember, HeaderHeight, RowHeight, GridBackColorName, GridBackColor, ScrollBarWidth, Language, IsSearch, SearchType, SearchControl,  FieldControl as FieldControl, ListConfig.ts,  DataMemberType,'Lot Details variant Inv' as ParentName,ifnull(Header,'') as Header,LineIndex,BorderColor,ShowBorder FROM  ListConfig where  screenname ='TEMPLATEVARIANTHEADER' and [Language] = 'English'"; 
	            qry = qry + " UNION ";
	            qry = qry + " SELECT 'Code' || '" + arrVariant2Code[_i] + "' as FieldName, DefaultText,  NewText, ColumnWidth, Alignment, HForeColor, HBackColor, RForeColor, RBackColor, ARForeColor, ARBackColor, HFont, HFontSize, HFontStyle, RFont, RFontSize, RFontStyle, DisplayNo, 'Lot Details variant Inv' as screenname, 'Code' || '" + arrVariant2Code[_i] + "' as DataMember, HeaderHeight, RowHeight, GridBackColorName, GridBackColor, ScrollBarWidth, Language, IsSearch, SearchType, SearchControl,  FieldControl as FieldControl, ListConfig.ts,  DataMemberType,'Lot Details variant Inv' as ParentName,ifnull(Header,'') as Header,LineIndex,BorderColor,ShowBorder FROM  ListConfig where screenname ='TEMPLATEVARIANTCODE' and [Language] = 'English'"; 
	            qry = qry + " UNION ";
	            qry = qry + " SELECT 'Line' || '" + arrVariant2Code[_i] + "' as FieldName, DefaultText,  NewText, ColumnWidth, Alignment, HForeColor, HBackColor, RForeColor, RBackColor, ARForeColor, ARBackColor, HFont, HFontSize, HFontStyle, RFont, RFontSize, RFontStyle, DisplayNo, 'Lot Details variant Inv' as screenname, 'Line' || '" + arrVariant2Code[_i] + "' as DataMember, HeaderHeight, RowHeight, GridBackColorName, GridBackColor, ScrollBarWidth, Language, IsSearch, SearchType, SearchControl,  FieldControl as FieldControl, ListConfig.ts,  DataMemberType,'Lot Details variant Inv' as ParentName,ifnull(Header,'') as Header,LineIndex,BorderColor,ShowBorder FROM  ListConfig where screenname ='TEMPLATEVARIANTLINENO' and [Language] = 'English'";  
	        }
			qry = qry + " order by DisplayNo";
		}
		else
		{*/
		qry = "SELECT FieldName, DefaultText, NewText, ColumnWidth, Alignment,HAlignment, HForeColor, HBackColor, RForeColor, RBackColor, ARForeColor, ARBackColor, HFont, HFontSize, HFontStyle, RFont, RFontSize, RFontStyle, DisplayNo, ScreenName, DataMember, HeaderHeight, RowHeight, GridBackColorName, GridBackColor, ScrollBarWidth, Language, IsSearch, SearchType, SearchControl, FieldControl, DataMemberType, ParentName, Header, LineIndex, BorderColor, ShowBorder, ColumnUnit FROM ListConfig WHERE [Language] = " + Ti.App.SQL.safeSQL(language) + " and Screenname like " + Ti.App.SQL.safeSQL(sScreenName) + " UNION SELECT CustDepartment.DeptCode as FieldName, DefaultText, CustDepartment.DeptName as NewText, ColumnWidth, Alignment, HForeColor, HBackColor, RForeColor, RBackColor, ARForeColor, ARBackColor, HFont, HFontSize, HFontStyle, RFont, RFontSize, RFontStyle, DisplayNo+1, " + Ti.App.SQL.safeSQL(sScreenName) + ", CustDepartment.DeptCode as DataMember, HeaderHeight, RowHeight, GridBackColorName, GridBackColor, ScrollBarWidth, Language, IsSearch, SearchType, SearchControl, 'EDITABLETEXTBOX' as FieldControl, DataMemberType, " + Ti.App.SQL.safeSQL(sScreenName) + ", Header, LineIndex, BorderColor, ShowBorder, ColumnUnit FROM CustDepartment, ListConfig  WHERE [Language] = " + Ti.App.SQL.safeSQL(language) + " and Screenname like '" + sScreenName + "-Dept' and FieldName = 'Qty' Order by LineIndex, DIsplayNo";
		//}
		//var iIndex = 0;
		//COMMON.Log("Qry1 "+qry);
		dbDataRows = Ti.App.configDBConn.execute(qry);
		var screenName = '', headerList = [], header = {}, totalWidth = 0;
		var arrTotalWidth = [], dLineIndex = 0;
		var dFontHeightRatio = systemTableConfig['FONTRATIO'];
		dFontHeightRatio = (dFontHeightRatio == null || dFontHeightRatio == undefined || dFontHeightRatio == '') ? 1 : dFontHeightRatio;
		//COMMON.Log('dFontHeightRatio --> LISTCONFIG : ' + dFontHeightRatio);
		while (dbDataRows.isValidRow()) {
			if (screenName != '' && screenName != '' + dbDataRows.fieldByName('ScreenName')) {
				Titanium.App.Properties.setList('ListConfig_' + screenName, headerList);
				Titanium.App.Properties.setInt('TotalWidth_' + screenName, totalWidth);
				headerList = [];
				totalWidth = 0;
			}
			screenName = dbDataRows.fieldByName('ScreenName');
			header = {};
			//header.headerHeight = (Titanium.Platform.displayCaps.density == 'high') ? parseInt(pHeight*0.065) : parseInt(pHeight*0.06);//dbDataRows.fieldByName('HeaderHeight');
			header.headerHeight = parseInt(dbDataRows.fieldByName('HeaderHeight') * Ti.App.dHeightRatio);
			header.HFont = dbDataRows.fieldByName('HFont');
			//header.HFontSize = (Titanium.Platform.displayCaps.density == 'high') ? parseInt(pHeight*0.025) : parseInt(pHeight*0.02);//dbDataRows.fieldByName('HFontSize');
			//header.HFontSize = parseInt(dbDataRows.fieldByName('HFontSize') * Ti.App.dHeightRatio);
			header.HFontSize = parseInt(dbDataRows.fieldByName('HFontSize') * dFontHeightRatio);
			header.HFontStyle = dbDataRows.fieldByName('HFontStyle');
			header.screenName = screenName;//dbDataRows.fieldByName('ScreenName');
			header.displayNo = dbDataRows.fieldByName('DisplayNo');
			header.fieldName = dbDataRows.fieldByName('FieldName');
			header.defaultText = dbDataRows.fieldByName('DefaultText');
			header.columnText = dbDataRows.fieldByName('NewText');
			header.columnWidth = dbDataRows.fieldByName('ColumnWidth');
			header.ActualColumnWidth = dbDataRows.fieldByName('ColumnWidth');
			header.LineIndex = dbDataRows.fieldByName('LineIndex');
			header.LineIndex = (header.LineIndex != null && header.LineIndex != undefined && header.LineIndex != "") ? header.LineIndex : 0;
			//LineIndex
			/* 0
			 * 0
			 * 0
			 * 0
			 * 1
			 * 1
			 *
			if(dbDataRows.fieldByName('LineIndex') != dLineIndex){
				arrTotalWidth[dLineIndex] = totalWidth;
				dLineIndex = dbDataRows.fieldByName('LineIndex');
				totalWidth = header.columnWidth;
				//dLineIndex =
			}else{
				totalWidth += header.columnWidth;
				//dLineIndex =
			}
			 
			if(dbDataRows.fieldByName('MultiLine') == true){
				totalWidth = 100;	
			}else{
				//totalWidth += header.columnWidth;//dbDataRows.fieldByName('ColumnWidth');
        totalWidth = parseInt(totalWidth)  + parseInt(header.columnWidth);
			}
			/******/
			if (header.LineIndex == 0 || header.LineIndex == 1) {
				//totalWidth += header.columnWidth;
				totalWidth = parseInt(totalWidth) + parseInt(header.columnWidth);
			}
			header.colnWidth = header.columnWidth;
			header.ColumnUnit = '%';//dbDataRows.fieldByName('ColumnUnit');
			header.dColumnUnit = COMMON.CheckString(dbDataRows.fieldByName('ColumnUnit'));
			header.bgColor = this.argbToRGB(dbDataRows.fieldByName('HBackColor'));
			header.HForeColor = this.argbToRGB(dbDataRows.fieldByName('HForeColor'));
			header.HBackColor = this.argbToRGB(dbDataRows.fieldByName('HBackColor'));
			header.rowTextColor = this.argbToRGB(dbDataRows.fieldByName('RForeColor'));
			header.rowBgColor = this.argbToRGB(dbDataRows.fieldByName('RBackColor'));
			//header.bgColor = dbDataRows.fieldByName('HBackColorName');
			//header.HForeColor = dbDataRows.fieldByName('HForeColorName');
			//header.HBackColor = dbDataRows.fieldByName('HBackColorName');
			//header.rowTextColor = dbDataRows.fieldByName('RForeColorName');
			//header.rowBgColorName = dbDataRows.fieldByName('RBackColorName');
			//header.rowARForeColorName = dbDataRows.fieldByName('ARForeColorName');
			//header.rowARBackColorName = dbDataRows.fieldByName('ARBackColorName');
			header.fontName = dbDataRows.fieldByName('RFont');
			//header.fontSize =  (Titanium.Platform.displayCaps.density == 'high') ? parseInt(pHeight*0.025) : parseInt(pHeight*0.02);//dbDataRows.fieldByName('RFontSize');
			//header.fontSize =  parseInt(dbDataRows.fieldByName('RFontSize') * Ti.App.dHeightRatio);
			header.fontSize = parseInt(dbDataRows.fieldByName('RFontSize') * dFontHeightRatio);
			header.fontStyle = dbDataRows.fieldByName('RFontStyle');
			header.allignment = dbDataRows.fieldByName('Alignment');
			header.Hallignment = dbDataRows.fieldByName('HAlignment');
			//COMMON.Log(' header.Hallignment  '+header.Hallignment);
			//header.rowHeight = (Titanium.Platform.displayCaps.density == 'high') ? parseInt(pHeight*0.065) : parseInt(pHeight*0.06);//dbDataRows.fieldByName('RowHeight');
			header.rowHeight = parseInt(dbDataRows.fieldByName('RowHeight') * Ti.App.dHeightRatio);
			header.fieldControl = ('' + dbDataRows.fieldByName('FieldControl')).toUpperCase();
			//header.isSearch = dbDataRows.fieldByName('IsSearch');
			//header.searchType = dbDataRows.fieldByName('SearchType');
			header.DataMember = dbDataRows.fieldByName('DataMember');
			header.DataMemberType = dbDataRows.fieldByName('DataMemberType');
			header.Header = dbDataRows.fieldByName('Header');
			header.Header = (header.Header != null && header.Header != undefined && header.Header != "") ? header.Header : "";
			try {
				header.showBorder = COMMON.CheckDecimal(dbDataRows.fieldByName('ShowBorder'));
			} catch (e) {
				header.showBorder = 0;
			}
			try {
				if (header.showBorder == 1) {
					header.borderColor = this.argbToRGB(dbDataRows.fieldByName('BorderColor'));
					header.borderColor = (header.borderColor == null || header.borderColor == undefined || header.borderColor == '') ? '#3b3b3b' : header.borderColor;
				} else {
					header.borderColor = 'transparent';
				}
			} catch (e) {
				header.borderColor = 'transparent';
			}
			headerList.push(header);
			headerList.totalWidth = 100;
			dbDataRows.next();
		}
		dbDataRows.close();
		//db.close();
		if (screenName != '') {
			Titanium.App.Properties.setInt('TotalWidth_' + screenName, totalWidth);
			Titanium.App.Properties.setList('ListConfig_' + screenName, headerList);
		}
		//COMMON.Log('List Config End : ' + new Date().getTime());
		//db = null;
		dbDataRows = null;
		headerList = []; headerList = null;
		header = {}; header = null;
		totalWidth = 0; totalWidth = null;
		arrTotalWidth = []; arrTotalWidth = null;
		dLineIndex = 0; dLineIndex = null;
		return true;
	},
	setRGBColor: function () {
		//var db = commonObj.dbConnectionObj.createDataBaseConnection();
		var qry = 'SELECT * FROM Color order by ColorName';
		//COMMON.Log('setRGBColor Qry --> ' + qry);
		dbDataRows = Ti.App.configDBConn.execute(qry);
		var decColor = '';
		/*
			http://jsfiddle.net/PsvCP/2/
			function RGB2HTML(red, green, blue) {
			    var decColor = 0x1000000 + blue + 0x100 * green + 0x10000 * red;
			    return '#' + decColor.toString(16).substr(1);
			}
		 */
		while (dbDataRows.isValidRow()) {
			//decColor = 0x1000000+ dbDataRows.fieldByName('Red') + 0x100 * dbDataRows.fieldByName('Green') + 0x10000 * dbDataRows.fieldByName('Blue');
			decColor = 0x1000000 + dbDataRows.fieldByName('Blue') + 0x100 * dbDataRows.fieldByName('Green') + 0x10000 * dbDataRows.fieldByName('Red');
			Titanium.App.Properties.setString('RGB_' + dbDataRows.fieldByName('ColorName'), '#' + decColor.toString(16).substr(1));
			dbDataRows.next();
		}
		dbDataRows.close();
		//db.close();
		Titanium.App.Properties.setString('RGB_Transparent', 'transparent');
	},
	setMenuConfig: function (language) {
		Titanium.App.Properties.setString('bMenuConfig', 'true');
		//var db = commonObj.dbConnectionObj.createDataBaseConnection();
		var qry = "", dbDataRows = '', screenName = '', menuList = [];
		var popMenuList = [], footerIconList = [], menu = {};
		//COMMON.Log('Menu Config Start : ' + new Date().getTime());
		//qry = 'SELECT * FROM MenuConfig WHERE Visible = 1 and [Language] = ' + Ti.App.SQL.safeSQL(language) + ' order by ScreenName, DisplayNo';
		qry = 'SELECT ScreenName, MenuCode, UPPER(MenuDisplayText) as MenuDisplayText, DisplayNo, AccessLevel, Language, Visible, Popup, IsIcon, IconImage FROM MenuConfig WHERE Visible = 1 and [Language] = ' + Ti.App.SQL.safeSQL(language) + ' Group by Screenname, MenuCode, AccessLevel order by ScreenName, DisplayNo';
		//qry = 'SELECT ScreenName, MenuCode, UPPER(MenuDisplayText) as MenuDisplayText, DisplayNo, AccessLevel, Language, Visible, Popup, IsIcon, IconImage FROM MenuConfig WHERE Visible = 1 and [Language] = ' + Ti.App.SQL.safeSQL(language) + ' and Accesslevel in (Select Accesslevel from Agent where Agentid = (Select agentid from system)) Group by Screenname, MenuCode, AccessLevel order by ScreenName, DisplayNo';		
		//COMMON.Log('MenuConfig Qry --> ' + qry);
		dbDataRows = Ti.App.configDBConn.execute(qry);
		//var iIndex = 0;
		while (dbDataRows.isValidRow()) {
			if (screenName != '' && screenName != '' + dbDataRows.fieldByName('ScreenName')) {
				Titanium.App.Properties.setList('MenuConfig_' + screenName, menuList);
				Titanium.App.Properties.setList('MenuConfig_Popup_' + screenName, popMenuList);
				Titanium.App.Properties.setList('MenuConfig_FooterIcon_' + screenName, footerIconList);
				menuList = [];
				popMenuList = [];
				footerIconList = [];
			}
			screenName = dbDataRows.fieldByName('ScreenName');
			menu = {};
			menu.screenName = screenName;//dbDataRows.fieldByName('ScreenName');
			menu.menuCode = dbDataRows.fieldByName('MenuCode');
			menu.displayText = dbDataRows.fieldByName('MenuDisplayText');
			menu.displayNo = dbDataRows.fieldByName('DisplayNo');
			menu.accessLevel = dbDataRows.fieldByName('AccessLevel');
			menu.language = dbDataRows.fieldByName('Language');
			menu.visible = dbDataRows.fieldByName('Visible');
			menu.popup = dbDataRows.fieldByName('Popup');
			menu.bIsIcon = dbDataRows.fieldByName('IsIcon');
			menu.bIsIcon = (menu.bIsIcon == null || menu.bIsIcon == 'null' || menu.bIsIcon == undefined) ? '' : menu.bIsIcon;
			menu.sIconImg = dbDataRows.fieldByName('IconImage');
			menu.sIconImg = (menu.sIconImg == null || menu.sIconImg == 'null' || menu.sIconImg == undefined) ? '' : menu.sIconImg;
			if ((menu.popup == 1 || menu.popup == '1') && menu.bIsIcon != 1) {
				popMenuList.push(menu);
			} else if (menu.bIsIcon == 1 || menu.bIsIcon == '1') {
				footerIconList.push(menu);
			} else {
				menuList.push(menu);
			}
			//iIndex = iIndex + 1;
			dbDataRows.next();
		};
		dbDataRows.close();
		//db.close();
		if (screenName != '') {
			Titanium.App.Properties.setList('MenuConfig_' + screenName, menuList);
			Titanium.App.Properties.setList('MenuConfig_Popup_' + screenName, popMenuList);
			Titanium.App.Properties.setList('MenuConfig_FooterIcon_' + screenName, footerIconList);
		}
		qry = ""; qry = null;
		//db = null; 
		dbDataRows = null;
		menuList = []; menuList = null;
		popMenuList = []; popMenuList = null;
		footerIconList = []; footerIconList = null;
		menu = {}; menu = null;
		//COMMON.Log('Menu Config End : ' + new Date().getTime());
		/*****/
		if (Ti.App.ProgressCount <= 5) {
			Ti.App.ProgressCount = 4;
			//Ti.App.pb.message = "Finalizing Application ...";
			Ti.App.winfirst.fireEvent('ProgressCount');
		}
		/*****/
	},
	setMessageConfig: function (language) {
		//var db = commonObj.dbConnectionObj.createDataBaseConnection();
		var qry = "", dbDataRows = '', screenName = '', message = {};//, iIndex = 0;
		//COMMON.Log('Message Config Start : ' + new Date().getTime());
		qry = 'SELECT * FROM MessageConfig where [Language] = ' + Ti.App.SQL.safeSQL(language) + ' order by ScreenName';
		//COMMON.Log('MessageConfig Qry --> ' + qry);
		dbDataRows = Ti.App.configDBConn.execute(qry);
		while (dbDataRows.isValidRow()) {
			message = {};
			message.screenName = dbDataRows.fieldByName('ScreenName');
			message.messageCode = dbDataRows.fieldByName('MessageCode');
			message.messageText = dbDataRows.fieldByName('MessageText');
			message.title = dbDataRows.fieldByName('Title');
			messageList[message.screenName + '_' + message.messageCode] = message;
			//iIndex = iIndex + 1;
			dbDataRows.next();
		};
		dbDataRows.close();
		//db.close();
		qry = ""; qry = null;
		//db = null; 
		dbDataRows = null;
		message = {}; message = null;
		//COMMON.Log('Message Config End : ' + new Date().getTime());
	},
	getMessageValue: function (MessageString, TagString) {
		commonObj.iPos = MessageString.indexOf(TagString.substr(0, TagString.length - 1));
		commonObj.iEnd = MessageString.indexOf('>', commonObj.iPos);
		return MessageString.substr(commonObj.iPos + TagString.length, commonObj.iEnd - (commonObj.iPos + TagString.length));
	},
	getMessageString: function (ScreenName, MessageCode) {

		//MessageCode
		//
		//COMMON.Log('MessageCode '+ MessageCode);
		if (mView != null && mView != undefined) {
			MessageCode = mView.formatQueryString(MessageCode, ScreenName);
		}
		//COMMON.Log('Format MessageCode '+ MessageCode);

		var messageObj = {};
		messageObj.title = '';
		messageObj.messageText = '';
		var obj = null;
		try {
			if (MessageCode == undefined) {
				return;
			}
			MessageCode = MessageCode.replace(/<BR>/g, '\r\n');
			var MessageString = MessageCode;
			var iPos = MessageCode.indexOf('<');
			var iEnd = -1;
			while (!(iPos == -1)) {
				if (MessageCode.substr(iPos, 4) != "<BR>") {
					iPos = MessageCode.indexOf(' ', iPos);
					iEnd = MessageCode.indexOf('>');
					if (iEnd == -1)
						break;
					// TODO: might not be correct. Was : Exit Do
					MessageCode = MessageCode.substr(0, iPos) + MessageCode.substr(iEnd, MessageCode.length - (iEnd - 1));
					iPos = iEnd;
				}
				iPos = MessageCode.indexOf('<', iPos);
			}

			//COMMON.Log('ScreenName_MessageCode : '+ ScreenName + '_' + MessageCode);

			obj = messageList[ScreenName + '_' + MessageCode];
			var str = '';
			if (obj != undefined) {
				str = obj.messageText;
			} else {
				str = MessageCode;
			}
			str = str.replace("<BR>", '\r\n');
			iPos = str.indexOf('<');
			iEnd = -1;
			var CmdStr = "";
			while (!(iPos == -1)) {
				iEnd = str.indexOf('>', iPos);
				if (iEnd == -1)
					break;
				// TODO: might not be correct. Was : Exit Do
				CmdStr = str.substr(iPos, iEnd - iPos);
				str = str.substr(0, iPos) + this.getMessageValue(MessageString, CmdStr) + str.substr(iEnd + 1, str.length - iEnd);
				iPos = str.indexOf('<', iPos + 1);
			}
			MessageString = str;
			MessageString = MessageString.replace("<BR>", '\r\n');
			iPos = MessageString.indexOf('<');
			var iTagEnd = 0;
			iEnd = -1;

			while (!(iPos == -1)) {
				iTagEnd = MessageString.indexOf(' ', iPos);
				iEnd = MessageString.indexOf('>', iPos);
				if (iEnd == -1)
					break;
				// TODO: might not be correct. Was : Exit Do
				MessageString = MessageString.substr(0, iPos) + MessageString.substr(iTagEnd, iEnd - iTagEnd) + MessageString.substr(iEnd + 1, MessageString.length - iEnd);
				iPos = MessageString.indexOf('<', iPos + 1);
			}
		} catch (e) {
			//COMMON.Log('Message String --> ' + e);
		}
		if (MessageString != null && MessageString != undefined && MessageString != '') {
			MessageString = mView.formatQueryString(MessageString, ScreenName);
			MessageString = MessageString.replace(/\'/g, '');
		}
		if (obj != undefined) {
			messageObj.title = obj.title;
			messageObj.messageText = MessageString;
		} else {
			messageObj.title = '';
			messageObj.messageText = MessageCode;
		}

		var rStr = messageObj.messageText;
		rStr = rStr.split('<BR>').join('\n');
		messageObj.messageText = rStr;

		//COMMON.Log('MessageObj '+ JSON.stringify(messageObj));
		return messageObj;
	},
	setMenuConfigByScreenName: function (language, sMenuScreenname) {
		Titanium.App.Properties.setString('bMenuConfig', 'true');
		//var db = commonObj.dbConnectionObj.createDataBaseConnection();
		var qry = "", dbDataRows = '', screenName = '', menuList = [];
		var popMenuList = [], footerIconList = [], menu = {};
		qry = 'SELECT ScreenName, MenuCode, UPPER(MenuDisplayText) as MenuDisplayText, DisplayNo, AccessLevel, Language, Visible, Popup, IsIcon, IconImage FROM MenuConfig WHERE Visible = 1 and [Language] = ' + Ti.App.SQL.safeSQL(language) + ' and ScreenName = ' + Ti.App.SQL.safeSQL(sMenuScreenname) + ' and AccessLevel = ' + Ti.App.SQL.safeSQL(Ti.App.accessLevel) + '  order by ScreenName, DisplayNo';
		//qry = 'SELECT ScreenName, MenuCode, UPPER(MenuDisplayText) as MenuDisplayText, DisplayNo, AccessLevel, Language, Visible, Popup, IsIcon, IconImage FROM MenuConfig WHERE Visible = 1 and IsIcon <> 1 and Popup <> 1 and [Language] = ' + Ti.App.SQL.safeSQL(Ti.App.sLanguage) + ' and ScreenName = ' + Ti.App.SQL.safeSQL(sMenuScreenname) + ' and AccessLevel = ' + Ti.App.SQL.safeSQL(Ti.App.accessLevel) + ' order by ScreenName, DisplayNo';
		//COMMON.Log('MenuConfig Qry --> ' + qry);
		dbDataRows = Ti.App.configDBConn.execute(qry);
		//var iIndex = 0;
		while (dbDataRows.isValidRow()) {
			if (screenName != '' && screenName != '' + dbDataRows.fieldByName('ScreenName')) {
				Titanium.App.Properties.setList('MenuConfig_' + screenName, menuList);
				Titanium.App.Properties.setList('MenuConfig_Popup_' + screenName, popMenuList);
				Titanium.App.Properties.setList('MenuConfig_FooterIcon_' + screenName, footerIconList);
				menuList = [];
				popMenuList = [];
				footerIconList = [];
			}
			screenName = dbDataRows.fieldByName('ScreenName');
			menu = {};
			menu.screenName = screenName;//dbDataRows.fieldByName('ScreenName');
			menu.menuCode = dbDataRows.fieldByName('MenuCode');
			menu.displayText = dbDataRows.fieldByName('MenuDisplayText');
			menu.displayNo = dbDataRows.fieldByName('DisplayNo');
			menu.accessLevel = dbDataRows.fieldByName('AccessLevel');
			menu.language = dbDataRows.fieldByName('Language');
			menu.visible = dbDataRows.fieldByName('Visible');
			menu.popup = dbDataRows.fieldByName('Popup');
			menu.bIsIcon = dbDataRows.fieldByName('IsIcon');
			menu.bIsIcon = (menu.bIsIcon == null || menu.bIsIcon == 'null' || menu.bIsIcon == undefined) ? '' : menu.bIsIcon;
			menu.sIconImg = dbDataRows.fieldByName('IconImage');
			menu.sIconImg = (menu.sIconImg == null || menu.sIconImg == 'null' || menu.sIconImg == undefined) ? '' : menu.sIconImg;
			if ((menu.popup == 1 || menu.popup == '1') && menu.bIsIcon != 1) {
				popMenuList.push(menu);
			} else if (menu.bIsIcon == 1 || menu.bIsIcon == '1') {
				footerIconList.push(menu);
			} else {
				menuList.push(menu);
			}
			//iIndex = iIndex + 1;
			dbDataRows.next();
		};
		dbDataRows.close();
		//db.close();
		if (screenName != '') {
			Titanium.App.Properties.setList('MenuConfig_' + screenName, menuList);
			Titanium.App.Properties.setList('MenuConfig_Popup_' + screenName, popMenuList);
			Titanium.App.Properties.setList('MenuConfig_FooterIcon_' + screenName, footerIconList);
		}
		qry = ""; qry = null;
		//db = null; 
		dbDataRows = null;
		menuList = []; menuList = null;
		popMenuList = []; popMenuList = null;
		footerIconList = []; footerIconList = null;
		menu = {}; menu = null;
		//COMMON.Log('Menu Config End : ' + new Date().getTime());
	},
	setFormConfig: function (language) {
		//Ti.App.dbConn.execute("Update FormConfig SET IsHidden = 0");
		return true;

		try {
			//var db = commonObj.dbConnectionObj.createDataBaseConnection();
			var qry = "", dbDataRows = "", screenName = '', formdata = {};

			//IsHidden
			Ti.App.configDBConn.execute("Update FormConfig SET IsHidden = 0");

			qry = 'SELECT * FROM FormConfig where Language = ' + Ti.App.SQL.safeSQL(language) + 'ORDER BY ScreenName, DisplayNo';
			//COMMON.Log('FormConfig Qry --> ' + qry);
			//COMMON.Log('Form Config Start : ' + new Date().getTime());
			dbDataRows = Ti.App.configDBConn.execute(qry);
			//var iIndex = 0;
			var dFontHeightRatio = systemTableConfig['FONTRATIO'];
			dFontHeightRatio = (dFontHeightRatio == null || dFontHeightRatio == undefined || dFontHeightRatio == '') ? 1 : dFontHeightRatio;
			//COMMON.Log('dFontHeightRatio --> ' + dFontHeightRatio);
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

				try {
					formdata.IsMandatory = COMMON.CheckBooleanField(dbDataRows.fieldByName('IsMandatory'));
					formdata.MaxCharLength = dbDataRows.fieldByName('MaxCharLength');
					formdata.MaxCharLength = (formdata.MaxCharLength == null || formdata.MaxCharLength == undefined || formdata.MaxCharLength == '') ? 500 : formdata.MaxCharLength;
				} catch (e) {
					formdata.IsMandatory = false;
					formdata.MaxCharLength = 500;
				}

				if (formdata.IsHidden == 1 || formdata.IsHidden == '1') {
					formdata.IsHidden = 1;
					formdata.ValueHeight = 0;
					formdata.headerHeight = 0;
				}
				formdata.Language = dbDataRows.fieldByName('Language');
				formdata.DefaultValue = COMMON.CheckString(dbDataRows.fieldByName('DefaultValue'));
				formdata.Visible = COMMON.CheckDecimal(dbDataRows.fieldByName('Visible'));
				formdata.FieldControl = dbDataRows.fieldByName('FieldControl').toUpperCase();
				formdata.DataMemberType = dbDataRows.fieldByName('DataMemberType');
				formdata.DataMemberType = (formdata.DataMemberType == null || formdata.DataMemberType == undefined) ? 'STRING' : formdata.DataMemberType;
				formDataList.push(formdata);
				//iIndex = iIndex + 1;
				dbDataRows.next();
			}
			dbDataRows.close();
			//db.close();
			if (screenName != '') {
				//COMMON.Log('FormConfig ScreenNAme 2  --> ' + 'FormConfig_' + screenName);
				Titanium.App.Properties.setList('FormConfig_' + screenName, formDataList);
				formDataList = [];
			}
			qry = ""; qry = null;
			//db = null; 
			dbDataRows = null;
			formdata = {}; formdata = null;
			//COMMON.Log('Form Config End : ' + new Date().getTime());
		} catch (e) { }
	},
	setFormConfigByScreenName: function (sScreenname, language) {
		try {
			//var db = commonObj.dbConnectionObj.createDataBaseConnection();
			var qry = "", dbDataRows = "", screenName = '', formdata = {};

			//IsHidden
			Ti.App.configDBConn.execute("Update FormConfig SET IsHidden = 0");

			qry = 'SELECT * FROM FormConfig where Screenname = ' + Ti.App.SQL.safeSQL(sScreenname) + ' and Language = ' + Ti.App.SQL.safeSQL(language) + ' ORDER BY ScreenName, DisplayNo';
			//COMMON.Log('FormConfig Qry --> ' + qry);
			//COMMON.Log('Form Config Start : ' + new Date().getTime());
			dbDataRows = Ti.App.configDBConn.execute(qry);
			//var iIndex = 0;
			var dFontHeightRatio = systemTableConfig['FONTRATIO'];
			dFontHeightRatio = (dFontHeightRatio == null || dFontHeightRatio == undefined || dFontHeightRatio == '') ? 1 : dFontHeightRatio;
			//COMMON.Log('dFontHeightRatio --> ' + dFontHeightRatio);
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
				try {
					formdata.IsMandatory = COMMON.CheckBooleanField(dbDataRows.fieldByName('IsMandatory'));
					formdata.MaxCharLength = dbDataRows.fieldByName('MaxCharLength');
					formdata.MaxCharLength = (formdata.MaxCharLength == null || formdata.MaxCharLength == undefined || formdata.MaxCharLength == '') ? 500 : formdata.MaxCharLength;
				} catch (e) {
					formdata.IsMandatory = false;
					formdata.MaxCharLength = 500;
				}


				if (formdata.IsHidden == 1 || formdata.IsHidden == '1') {
					formdata.IsHidden = 1;
					formdata.ValueHeight = 0;
					formdata.headerHeight = 0;
				}
				formdata.Language = dbDataRows.fieldByName('Language');
				formdata.DefaultValue = COMMON.CheckString(dbDataRows.fieldByName('DefaultValue'));
				formdata.Visible = COMMON.CheckDecimal(dbDataRows.fieldByName('Visible'));
				formdata.FieldControl = dbDataRows.fieldByName('FieldControl').toUpperCase();
				formdata.DataMemberType = dbDataRows.fieldByName('DataMemberType');
				formdata.DataMemberType = (formdata.DataMemberType == null || formdata.DataMemberType == undefined) ? 'STRING' : formdata.DataMemberType;
				formDataList.push(formdata);
				//iIndex = iIndex + 1;
				dbDataRows.next();
			}
			dbDataRows.close();
			//db.close();
			if (screenName != '') {
				//COMMON.Log('FormConfig ScreenNAme 2  --> ' + 'FormConfig_' + screenName);
				Titanium.App.Properties.setList('FormConfig_' + screenName, formDataList);
				formDataList = [];
			}
			qry = ""; qry = null;
			//db = null; 
			dbDataRows = null;
			formdata = {}; formdata = null;
			//COMMON.Log('Form Config End : ' + new Date().getTime());
		} catch (e) { }
	},
	setQueryConfig: function () {
		//var db = commonObj.dbConnectionObj.createDataBaseConnection();
		//var screenName = '';// query= '', groupText = '', orderText = '';
		//COMMON.Log('Query  Config Start : ' + new Date().getTime());
		//select ScreenName, QueryText,GroupText,OrderText from QueryConfig
		/*dbDataRows = Ti.App.configDBConn.execute("select ScreenName, QueryText, ifnull(GroupText,'') as GroupText, ifnull(OrderText, '' ) as OrderText from QueryConfig");
		while (dbDataRows.isValidRow()) {
			//screenName = dbDataRows.fieldByName('ScreenName');
			//Titanium.App.Properties.setString('QueryConfig_' + screenName, dbDataRows.fieldByName('QueryText'));
			//Titanium.App.Properties.setString('QueryConfig_' + screenName + '_GroupText', '' + dbDataRows.fieldByName('GroupText'));
			//Titanium.App.Properties.setString('QueryConfig_' + screenName + '_OrderText', '' + dbDataRows.fieldByName('OrderText'));
			Titanium.App.Properties.setString('QueryConfig_' + dbDataRows.fieldByName('ScreenName'), dbDataRows.fieldByName('QueryText'));
			Titanium.App.Properties.setString('QueryConfig_' + dbDataRows.fieldByName('ScreenName') + '_GroupText', '' + dbDataRows.fieldByName('GroupText'));
			Titanium.App.Properties.setString('QueryConfig_' + dbDataRows.fieldByName('ScreenName') + '_OrderText', '' + dbDataRows.fieldByName('OrderText'));
			dbDataRows.next();
		}
		dbDataRows.close();
		//db.close();
		dbDataRows = null;
		*/
		//db = null;
		/*****/
		if (Ti.App.ProgressCount <= 5) {
			Ti.App.ProgressCount = 2;
			//Ti.App.pb.message = "Loading Lists ...";
			Ti.App.winfirst.fireEvent('ProgressCount');
		}
		/*****/
		//COMMON.Log('Query  Config End : ' + new Date().getTime());
		return true;
	},
	setDownloadTransConfigConfig: function () {
		//var db = commonObj.dbConnectionObj.createDataBaseConnection();
		try {
			Ti.App.configDBConn.execute("Update GridFunctions SET ScreenName = 'Survey List' where lower(ScreenName) = lower('Survey') and Language = 'English'");
			/*
			db.execute("DELETE FROM QueryConfig WHERE ScreenName = 'Survey ListMy'");
			db.execute("DELETE FROM QueryConfig WHERE ScreenName = 'Survey Summary'");
			db.execute("DELETE FROM ListConfig WHERE ScreenName = 'Survey Summary'");
	
			db.execute("INSERT INTO 'ListConfig' VALUES ('Questions','Questions','Questions','45','2','-1','-5103070','-1','-16777216','-1','-29696','Tahoma','18','0','Tahoma','18','0','0','Survey Summary','Questions','60','60','Black','-16777216','10','English','0',null,null,'LABEL','1237039','STRING','Survey Summary','',0,0,0)");
			db.execute("INSERT INTO 'ListConfig' VALUES ('FormId','FormId','FormId','0','2','-1','-5103070','-1','-16777216','-1','-29696','Tahoma','18','0','Tahoma','18','0','1','Survey Summary','FormId','60','60','Black','-16777216','10','English','0',null,null,'LABEL','1237039','STRING','Survey Summary','',0,0,0)");
			
			db.execute("DELETE FROM QueryConfig WHERE ScreenName = 'Survey List'");
			db.execute("DELETE FROM QueryConfig WHERE ScreenName = 'Survey Summary'");
			
			db.execute("INSERT INTO QueryConfig (ScreenName, QueryText,  ts, GroupText, OrderText) VALUES ('Survey List','SELECT Distinct ThemeName as ThemeName FROM POSTheme','1045959','','')");
			db.execute("INSERT INTO QueryConfig (ScreenName, QueryText,  ts, GroupText, OrderText) VALUES ('Survey Summary','SELECT *, ControlText as Questions FROM POSTheme WHERE ControlType={Question} and ThemeName = {ThemeName}','59751','','Order by FormId')");
			
			db.execute("DELETE FROM ListConfig WHERE ScreenName = 'Survey Summary'");
			db.execute("INSERT INTO 'ListConfig' VALUES ('Questions','Questions','Questions','100','2','-1','-5103070','-1','-16777216','-1','-29696','Tahoma','18','0','Tahoma','18','0','0','Survey Summary','Questions','60','60','Black','-16777216','10','English','0',null,null,'LABEL','1237039','STRING','Survey Summary','',0,0,0)");
			db.execute("INSERT INTO 'ListConfig' VALUES ('FormId','FormId','FormId','0','2','-1','-5103070','-1','-16777216','-1','-29696','Tahoma','18','0','Tahoma','18','0','1','Survey Summary','FormId','60','60','Black','-16777216','10','English','0',null,null,'LABEL','1237039','STRING','Survey Summary','',0,0,0)");
			
			db.execute("INSERT INTO QueryConfig (ScreenName, QueryText,  ts, GroupText, OrderText) VALUES ('Survey ListMy','SELECT Distinct ThemeName as ThemeName FROM POSTheme','1045959','','')");
			db.execute("INSERT INTO QueryConfig (ScreenName, QueryText,  ts, GroupText, OrderText) VALUES ('Survey Summary','SELECT *, ControlText as Questions FROM POSTheme WHERE ControlType={Question} and ThemeName = {ThemeName}','59751','','Order by FormId')");
			*/
		} catch (e) { }
		//this.setArray('DownloadTransConfig_List', []);
		dbDataRows = Ti.App.configDBConn.execute('select * from DownloadTransConfig order by ScreenName, TableName');
		var _obj = null;
		var arrList = [];
		//COMMON.Log('DownLoadTrans Config Start : ' + new Date().getTime());
		while (dbDataRows.isValidRow()) {
			_obj = {};
			_obj.screenName = dbDataRows.fieldByName("ScreenName");
			_obj.webserviceAction = dbDataRows.fieldByName("FunctionName");
			_obj.tableName = dbDataRows.fieldByName("TableName");
			_obj.ts = dbDataRows.fieldByName("ts");
			_obj.serviceType = dbDataRows.fieldByName("ServiceType");
			_obj.lastUpdated = dbDataRows.fieldByName("LastUpdated");
			_obj.serviceType = (_obj.serviceType == null) ? "" : _obj.serviceType;
			_obj.lastUpdated = (_obj.lastUpdated == null) ? "" : _obj.lastUpdated;
			arrList.push(_obj);
			dbDataRows.next();
		}
		dbDataRows.close();
		//db.close();
		this.setArray('DownloadTransConfig_List', arrList);
		_obj = null;
		arrList = []; arrList = null;
		dbDataRows = null; //db = null;
		//COMMON.Log('DownLoadTrans Config End : ' + new Date().getTime());
	},
	setSystemTableConfig: function () {
		try {

			systemTableConfig['APPVERSION'] = '';
			systemTableConfig['NEWVERSIONURL'] = '';
			systemTableConfig['ALLOWWITHOUTSALES'] = '';
			systemTableConfig['SETCONFIGDATA'] = '0';
			
			systemTableConfig['ADMINPASSWORD'] = '';
			systemTableConfig['VSCODE'] = '';

			//var db = commonObj.dbConnectionObj.createDataBaseConnection();
			//COMMON.Log('System Start : ' + new Date().getTime());


			dbDataRows = Ti.App.dbConn.execute('select * from System');
			//COMMON.Log('dbDataRows.isValidRow() ---> ' + dbDataRows.isValidRow());
			if (dbDataRows.isValidRow()) {
				//var length = (bIsAndroid ? dbDataRows.fieldCount : dbDataRows.fieldCount());
				if(Ti.App.sDeviceOSName == 'iphone' || (Ti.version >= '8.9.9')){
					var length = dbDataRows.fieldCount;
				}else{
					if ((Ti.Platform.name === 'android') || (Ti.version >= '3.3.0')) {
						var length = dbDataRows.getFieldCount();//fieldCount;
					} else {
						var length = dbDataRows.fieldCount();
					}
				}
				for (var ctr = 0; ctr < length; ctr++) {
					systemTableConfig[dbDataRows.fieldName(ctr).toUpperCase()] = dbDataRows.field(ctr);
				}
				Ti.App.sLanguage = dbDataRows.fieldByName("Language");
				Ti.App.sLanguage = (Ti.App.sLanguage == null || Ti.App.sLanguage == undefined || Ti.App.sLanguage == '') ? 'English' : Ti.App.sLanguage;
				Ti.App.sMCAddress = dbDataRows.fieldByName("MCAddress");

				DETAILS.set('MDT_NO', dbDataRows.fieldByName("PDAID"));
			}
			dbDataRows.close();



			try {
				dbDataRows = Ti.App.dbConn.execute('select * from SystemList');
				while (dbDataRows.isValidRow()) {
					systemTableConfig[dbDataRows.fieldByName('Code').toUpperCase()] = dbDataRows.fieldByName('SystemValue');
					dbDataRows.next();
				}
				dbDataRows.close();
			} catch (e) { }


			var dWebserviceMaxRecord = COMMON.CheckDecimalVal(systemTableConfig['WebserviceMaxRecord'.toUpperCase()]);
			dWebserviceMaxRecord = (dWebserviceMaxRecord == 0) ? 100 : dWebserviceMaxRecord;
			Ti.App.WebserviceMaxRecord = dWebserviceMaxRecord;

			var dWebserviceTimeOut = COMMON.CheckDecimalVal(systemTableConfig['WebserviceTimeOut'.toUpperCase()]);
			dWebserviceTimeOut = (dWebserviceTimeOut == 0) ? 240000 : dWebserviceTimeOut;
			Ti.App.dWebserviceTimeOut = dWebserviceTimeOut;

			var dSyncAutoContinueCount = COMMON.CheckDecimalVal(systemTableConfig['SyncAutoContinueCount'.toUpperCase()]);
			dSyncAutoContinueCount = (dSyncAutoContinueCount == 0) ? 1 : dSyncAutoContinueCount;
			Ti.App.SyncAutoContinueCount = dSyncAutoContinueCount;


			Ti.App.bTokenByHeader = COMMON.CheckBooleanField(systemTableConfig['TokenByHeader'.toUpperCase()]);
			Ti.App.bEnableSendDBLogButton = COMMON.CheckBooleanField(systemTableConfig['EnableSendDBLogButton'.toUpperCase()]);

			Ti.App.bEnableDeviceLog = COMMON.CheckBooleanField(systemTableConfig['EnableDeviceLog'.toUpperCase()]);

			var iWSActionCount = COMMON.CheckDecimalVal(systemTableConfig['WSActionCount'.toUpperCase()]);
			iWSActionCount = (iWSActionCount == 0) ? 10 : iWSActionCount;
			Ti.App.iWSActionCount = iWSActionCount;


			try {
				dbDataRows = Ti.App.dbConn.execute('select * from DeviceSystemList');
				while (dbDataRows.isValidRow()) {
					systemTableConfig[dbDataRows.fieldByName('Code').toUpperCase()] = dbDataRows.fieldByName('SystemValue');
					dbDataRows.next();
				}
				dbDataRows.close();
			} catch (e) { }

			//db.close();
			dbDataRows = null; //db = null;
			//COMMON.Log('System End : ' + new Date().getTime());
		} catch (e) { }
	},
	getSystemValue: function (key) {
		//COMMON.Log('System Table Field Requested -> ' + key.toUpperCase() + ' : ' + systemTableConfig[key.toUpperCase()]);
		return systemTableConfig[key.toUpperCase()];
	},
	setSystemValue: function (key, value) {
		//COMMON.Log('System Table Field Requested -> ' + key.toUpperCase() + ' : ' + systemTableConfig[key.toUpperCase()]);
		systemTableConfig[key.toUpperCase()] = value;
	},
	UpdateSystemValue: function (key, value) {
		//COMMON.Log('System Table Field Requested -> ' + key.toUpperCase() + ' : ' + systemTableConfig[key.toUpperCase()]);
		Ti.App.dbConn.execute("DELETE From SystemList WHERE lower(Code) = lower(" + Ti.App.SQL.safeSQL(key) + ")");
		Ti.App.dbConn.execute("INSERT INTO SystemList (Code, SystemValue, SystemDataType) VALUES (" + Ti.App.SQL.safeSQL(key) + ", " + Ti.App.SQL.safeSQL(value) + ", '')");
		systemTableConfig[key.toUpperCase()] = value;
	},
	setAllConfig: function () {
		/*****/
		if (Ti.App.ProgressCount <= 5) {
			Ti.App.ProgressCount = 1;
			Ti.App.winfirst.fireEvent('ProgressCount');
		}
		/********/
		Ti.App.configDBConn = Ti.App.dbConn;

		//Ti.App.currentScreenName = '';
		//COMMON.Log('setAllConfig Start : ' + new Date().getTime());
		Titanium.App.Properties.setString('bMenuConfig', 'false');
		this.setArray('DownloadTransConfig_List', []);
		Ti.App.arrWorkFlowScreenList = [];
		this.setDownloadTransConfigConfig();
		this.setSystemTableConfig();
		//var sLanguage = this.getSystemValue('Language');
		Ti.App.sLanguage = (Ti.App.sLanguage == null || Ti.App.sLanguage == undefined || Ti.App.sLanguage == '') ? 'English' : Ti.App.sLanguage;
		var sLanguage = Ti.App.sLanguage;
		//var bSetConfigData = systemTableConfig['SETCONFIGDATA'];//if(bIsSyncCompleted == "TRUE"){
		var bIsSyncCompleted = Titanium.App.Properties.getString("IsSyncCompleted");
		bIsSyncCompleted = (bIsSyncCompleted == '' || bIsSyncCompleted == null || bIsSyncCompleted == undefined) ? 'TRUE' : bIsSyncCompleted;
		//COMMON.Log('bIsSyncCompleted ----> ' + bIsSyncCompleted);
		//if(bIsSyncCompleted == "TRUE"){
		Titanium.App.Properties.setString("IsSyncCompleted", "FALSE");
		//COMMON.Log('start setFormConfig ----> ');
		this.setFormConfig(sLanguage);
		//COMMON.Log('end setFormConfig ----> ');
		this.setQueryConfig();
		this.setSearchConfig(sLanguage);
		this.setListConfig(sLanguage);
		this.setMessageConfig(sLanguage);
		this.setColorConfig(sLanguage);
		this.setMenuConfig(sLanguage);
		this.setRGBColor();
		this.setGSTList();
		//}
		//COMMON.Log('setAllConfig End : ' + new Date().getTime());
	},
	setGSTList: function () {
		//var db = new dbConnection().createDataBaseConnection();
		try {
			var arrGSTList = [], arrGSTObj = {};
			var dbDataRows = Ti.App.dbConn.execute('SELECT * FROM GST');

			while (dbDataRows.isValidRow()) {
				arrGSTObj = {};
				arrGSTObj.GSTCustGroup = dbDataRows.fieldByName('GSTCustGroup');
				arrGSTObj.GSTProdGroup = dbDataRows.fieldByName('GSTProdGroup');
				arrGSTObj.GST = dbDataRows.fieldByName('GST');
				arrGSTList.push(arrGSTObj);
				dbDataRows.next();
			}
			dbDataRows.close();
			Titanium.App.Properties.setList('GSTList', arrGSTList);
			//db.close();
		} catch (e) {

		}
	},
	getListConfigByScreenName: function (screenName) {
		//COMMON.Log('Load ListConfig_' + screenName);
		//return Titanium.App.Properties.getList('ListConfig_' + screenName);


		var screenName = screenName, headerList = [], header = {}, totalWidth = 0;
		var arrTotalWidth = [], dLineIndex = 0;
		var dFontHeightRatio = systemTableConfig['FONTRATIO'];
		dbDataRows = Ti.App.configDBConn.execute('select ScreenName, HeaderHeight, HFont, HFontSize, HFontStyle, DisplayNo, FieldName, DefaultText, NewText, ColumnWidth, HBackColor, HForeColor, HBackColor, RForeColor, RBackColor, RFont, RFontSize, RFontStyle, Alignment,HAlignment, RowHeight, FieldControl, DataMember, DataMemberType, Header, LineIndex, Showborder, BorderColor, ColumnUnit from  ListConfig  where (columnwidth > 0 OR ifnull(IsHidden,0) = 1) and DataMember <> "" and Screenname = ' + Ti.App.SQL.safeSQL(screenName) + ' and [Language] = ' + Ti.App.SQL.safeSQL(Ti.App.sLanguage) + ' order by ScreenName, LineIndex, DisplayNo');
		dFontHeightRatio = (dFontHeightRatio == null || dFontHeightRatio == undefined || dFontHeightRatio == '') ? 1 : dFontHeightRatio;
		while (dbDataRows.isValidRow()) {
			screenName = dbDataRows.fieldByName('ScreenName');
			header = {};
			//header.headerHeight = (Titanium.Platform.displayCaps.density == 'high') ? parseInt(pHeight*0.065) : parseInt(pHeight*0.06);//dbDataRows.fieldByName('HeaderHeight');
			header.headerHeight = parseInt(dbDataRows.fieldByName('HeaderHeight') * Ti.App.dHeightRatio);
			header.HFont = dbDataRows.fieldByName('HFont');
			//header.HFontSize = (Titanium.Platform.displayCaps.density == 'high') ? parseInt(pHeight*0.025) : parseInt(pHeight*0.02);//dbDataRows.fieldByName('HFontSize');
			//header.HFontSize = parseInt(dbDataRows.fieldByName('HFontSize') * Ti.App.dHeightRatio);
			header.HFontSize = parseInt(dbDataRows.fieldByName('HFontSize') * dFontHeightRatio);
			header.HFontStyle = dbDataRows.fieldByName('HFontStyle');
			header.screenName = screenName;//dbDataRows.fieldByName('ScreenName');
			header.displayNo = dbDataRows.fieldByName('DisplayNo');
			header.fieldName = dbDataRows.fieldByName('FieldName');
			header.defaultText = dbDataRows.fieldByName('DefaultText');
			header.columnText = dbDataRows.fieldByName('NewText');
			header.columnWidth = dbDataRows.fieldByName('ColumnWidth');
			header.ActualColumnWidth = dbDataRows.fieldByName('ColumnWidth');
			header.LineIndex = dbDataRows.fieldByName('LineIndex');
			header.LineIndex = (header.LineIndex != null && header.LineIndex != undefined && header.LineIndex != "") ? header.LineIndex : 0;
			//LineIndex
            /* 0
             * 0
             * 0
             * 0
             * 1
             * 1
             *
            if(dbDataRows.fieldByName('LineIndex') != dLineIndex){
                arrTotalWidth[dLineIndex] = totalWidth;
                dLineIndex = dbDataRows.fieldByName('LineIndex');
                totalWidth = header.columnWidth;
                //dLineIndex =
            }else{
                totalWidth += header.columnWidth;
                //dLineIndex =
            }
             
            if(dbDataRows.fieldByName('MultiLine') == true){
                totalWidth = 100;   
            }else{
                totalWidth += header.columnWidth;//dbDataRows.fieldByName('ColumnWidth');
            }
            /******/
			if (header.LineIndex == 0 || header.LineIndex == 1) {
				totalWidth += header.columnWidth;
			}
			header.colnWidth = header.columnWidth;
			header.ColumnUnit = '%';//dbDataRows.fieldByName('ColumnUnit');
			header.dColumnUnit = COMMON.CheckString(dbDataRows.fieldByName('ColumnUnit'));
			header.bgColor = this.argbToRGB(dbDataRows.fieldByName('HBackColor'));
			header.HForeColor = this.argbToRGB(dbDataRows.fieldByName('HForeColor'));
			header.HBackColor = this.argbToRGB(dbDataRows.fieldByName('HBackColor'));
			header.rowTextColor = this.argbToRGB(dbDataRows.fieldByName('RForeColor'));
			header.rowBgColor = this.argbToRGB(dbDataRows.fieldByName('RBackColor'));
			//header.bgColor = dbDataRows.fieldByName('HBackColorName');
			//header.HForeColor = dbDataRows.fieldByName('HForeColorName');
			//header.HBackColor = dbDataRows.fieldByName('HBackColorName');
			//header.rowTextColor = dbDataRows.fieldByName('RForeColorName');
			//header.rowBgColorName = dbDataRows.fieldByName('RBackColorName');
			//header.rowARForeColorName = dbDataRows.fieldByName('ARForeColorName');
			//header.rowARBackColorName = dbDataRows.fieldByName('ARBackColorName');
			header.fontName = dbDataRows.fieldByName('RFont');
			//header.fontSize =  (Titanium.Platform.displayCaps.density == 'high') ? parseInt(pHeight*0.025) : parseInt(pHeight*0.02);//dbDataRows.fieldByName('RFontSize');
			//header.fontSize =  parseInt(dbDataRows.fieldByName('RFontSize') * Ti.App.dHeightRatio);
			header.fontSize = parseInt(dbDataRows.fieldByName('RFontSize') * dFontHeightRatio);
			header.fontStyle = dbDataRows.fieldByName('RFontStyle');
			header.allignment = dbDataRows.fieldByName('Alignment');
			header.Hallignment = dbDataRows.fieldByName('HAlignment');
			//header.rowHeight = (Titanium.Platform.displayCaps.density == 'high') ? parseInt(pHeight*0.065) : parseInt(pHeight*0.06);//dbDataRows.fieldByName('RowHeight');
			header.rowHeight = parseInt(dbDataRows.fieldByName('RowHeight') * Ti.App.dHeightRatio);
			header.fieldControl = ('' + dbDataRows.fieldByName('FieldControl')).toUpperCase();
			//header.isSearch = dbDataRows.fieldByName('IsSearch');
			//header.searchType = dbDataRows.fieldByName('SearchType');
			header.DataMember = dbDataRows.fieldByName('DataMember');
			header.DataMemberType = dbDataRows.fieldByName('DataMemberType');
			header.Header = dbDataRows.fieldByName('Header');
			header.Header = (header.Header != null && header.Header != undefined && header.Header != "") ? header.Header : "";
			try {
				header.showBorder = COMMON.CheckDecimal(dbDataRows.fieldByName('ShowBorder'));
			} catch (e) {
				header.showBorder = 0;
			}
			try {
				if (header.showBorder == 1) {
					header.borderColor = this.argbToRGB(dbDataRows.fieldByName('BorderColor'));
					header.borderColor = (header.borderColor == null || header.borderColor == undefined || header.borderColor == '') ? '#3b3b3b' : header.borderColor;
				} else {
					header.borderColor = 'transparent';
				}
			} catch (e) {
				header.borderColor = 'transparent';
			}
			headerList.push(header);
			headerList.totalWidth = 100;
			dbDataRows.next();
		}
		dbDataRows.close();
		//db.close();
		//if (screenName != '') {
		//Titanium.App.Properties.setInt('TotalWidth_' + screenName, totalWidth);
		//Titanium.App.Properties.setList('ListConfig_' + screenName, headerList);
		//}
		//COMMON.Log('List Config End : ' + new Date().getTime());
		//db = null;
		dbDataRows = null;
		//headerList = []; headerList = null;
		header = {}; header = null;
		totalWidth = 0; totalWidth = null;
		arrTotalWidth = []; arrTotalWidth = null;
		dLineIndex = 0; dLineIndex = null;
		return headerList;


	},
	getQueryConfigByScreenNameNEW: function (queryName) {
		/*queryNameQry = '';
        dbDataRows = Ti.App.dbConn.execute('select ifnull(QueryText,'')  || ' ' || ifnull(GroupText,'')  || ' ' || ifnull(OrderText,'') as ScrQuery from  QueryConfig  where  Screenname = ' + Ti.App.SQL.safeSQL(queryName) + ' order by ScreenName');
        while (dbDataRows.isValidRow()) {
            queryNameQry = dbDataRows.fieldByName('ScrQuery');
        	dbDataRows.next();
    	}	
        dbDataRows.close();
		
		if(mView != null && queryNameQry != ''){
			return mView.formatQueryString(queryNameQry, queryName);
		}
		return queryNameQry;*/
	},
	getQueryConfigByScreenName: function (queryName) {
		/*if (mView == null) {
			return Titanium.App.Properties.getString('QueryConfig_' + queryName);
		}
		return mView.formatQueryString(Titanium.App.Properties.getString('QueryConfig_' + queryName), queryName);*/
		queryNameQry = '';
		// || ' ' || ifnull(GroupText,'')  || ' ' || ifnull(OrderText,'') 
		dbDataRows = Ti.App.dbConn.execute("select ifnull(QueryText,'') as ScrQuery from  QueryConfig  where  Screenname = " + Ti.App.SQL.safeSQL(queryName) + " order by ScreenName");
		while (dbDataRows.isValidRow()) {
			queryNameQry = dbDataRows.fieldByName('ScrQuery');
			dbDataRows.next();
		}
		dbDataRows.close();

		if (mView != null && queryNameQry != '') {
			return mView.formatQueryString(queryNameQry, queryName);
		}
		if (queryNameQry != undefined && queryNameQry != null && queryNameQry != '') {
			queryNameQry = mView.formatQueryString(queryNameQry, queryName);
			return queryNameQry;
		} else {
			return '';
		}


	},
	getQueryConfigByScreenNameWithOrderText: function (queryName) {
		queryNameQry = '';
		dbDataRows = Ti.App.dbConn.execute("select ifnull(QueryText,'')  || ' ' || ifnull(GroupText,'')  || ' ' || ifnull(OrderText,'') as ScrQuery from  QueryConfig  where  Screenname = " + Ti.App.SQL.safeSQL(queryName) + " order by ScreenName");
		while (dbDataRows.isValidRow()) {
			queryNameQry = dbDataRows.fieldByName('ScrQuery');
			dbDataRows.next();
		}
		dbDataRows.close();

		if (mView != null && queryNameQry != '') {
			return mView.formatQueryString(queryNameQry, queryName);
		}
		if (queryNameQry != undefined && queryNameQry != null && queryNameQry != '') {
			queryNameQry = mView.formatQueryString(queryNameQry, queryName);
			return queryNameQry;
		} else {
			return '';
		}

		/*
		if (mView == null) {
			commonObj.qry1 = Titanium.App.Properties.getString('QueryConfig_' + queryName);
			if(commonObj.qry1 != undefined && commonObj.qry1 != null && commonObj.qry1 != ''){
				commonObj.sQryGroupTxt = Titanium.App.Properties.getString('QueryConfig_'+queryName+'_GroupText');
				commonObj.sQryOrderTxt = Titanium.App.Properties.getString('QueryConfig_'+queryName+'_OrderText');
				commonObj.sQryGroupTxt = (commonObj.sQryGroupTxt == null || commonObj.sQryGroupTxt == undefined || commonObj.sQryGroupTxt == 'null' || commonObj.sQryGroupTxt == 'undefined' || commonObj.sQryGroupTxt == '') ? '' : commonObj.sQryGroupTxt;
				commonObj.sQryOrderTxt = (commonObj.sQryOrderTxt == null || commonObj.sQryOrderTxt == undefined || commonObj.sQryOrderTxt == 'null' || commonObj.sQryOrderTxt == 'undefined' || commonObj.sQryOrderTxt == '') ? '' : commonObj.sQryOrderTxt;
				commonObj.qry1 = commonObj.qry1 + ' ' + commonObj.sQryGroupTxt + ' ' + commonObj.sQryOrderTxt;
				commonObj.qry1 = mView.formatQueryString(commonObj.qry1, queryName);
				return commonObj.qry1;  
			}else{
				return '';
			} 
		}
		commonObj.qry1 = Titanium.App.Properties.getString('QueryConfig_' + queryName);
		if(commonObj.qry1 != undefined && commonObj.qry1 != null && commonObj.qry1 != ''){
			commonObj.sQryGroupTxt = Titanium.App.Properties.getString('QueryConfig_'+queryName+'_GroupText');
			commonObj.sQryOrderTxt = Titanium.App.Properties.getString('QueryConfig_'+queryName+'_OrderText');
			commonObj.sQryGroupTxt = (commonObj.sQryGroupTxt == null || commonObj.sQryGroupTxt == undefined || commonObj.sQryGroupTxt == 'null' || commonObj.sQryGroupTxt == 'undefined' || commonObj.sQryGroupTxt == '') ? '' : commonObj.sQryGroupTxt;
			commonObj.sQryOrderTxt = (commonObj.sQryOrderTxt == null || commonObj.sQryOrderTxt == undefined || commonObj.sQryOrderTxt == 'null' || commonObj.sQryOrderTxt == 'undefined' || commonObj.sQryOrderTxt == '') ? '' : commonObj.sQryOrderTxt;
			commonObj.qry1 = commonObj.qry1 + ' ' + commonObj.sQryGroupTxt + ' ' + commonObj.sQryOrderTxt;
			commonObj.qry1 = mView.formatQueryString(commonObj.qry1, queryName);
			return commonObj.qry1;
		}else{
			return '';
		} */
	},
	getQueryByScreenName: function (queryName) {
		return ArrayOperations.prototype.getQueryConfigByScreenNameWithOrderText(queryName);
	},
	getFormConfigByScreenName: function (screenName) {
		//return Titanium.App.Properties.getList('FormConfig_' + screenName);

		try {
			//var db = commonObj.dbConnectionObj.createDataBaseConnection();
			var qry = "", dbDataRows = "", screenName = screenName, formdata = {};
			qry = 'SELECT * FROM FormConfig where Screenname = ' + Ti.App.SQL.safeSQL(screenName) + ' and Language = ' + Ti.App.SQL.safeSQL(Ti.App.sLanguage) + 'ORDER BY ScreenName, DisplayNo';
			//COMMON.Log('FormConfig Qry --> ' + qry);
			//COMMON.Log('Form Config Start : ' + new Date().getTime());
			dbDataRows = Ti.App.configDBConn.execute(qry);
			//var iIndex = 0;
			var dFontHeightRatio = systemTableConfig['FONTRATIO'];
			dFontHeightRatio = (dFontHeightRatio == null || dFontHeightRatio == undefined || dFontHeightRatio == '') ? 1 : dFontHeightRatio;
			//COMMON.Log('dFontHeightRatio --> ' + dFontHeightRatio);
			formDataList = [];
			while (dbDataRows.isValidRow()) {
				//if (screenName != '' && screenName != '' + dbDataRows.fieldByName('ScreenName')) {
				//Titanium.App.Properties.setList('FormConfig_' + screenName, formDataList);
				//formDataList = [];
				//}
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

				try {
					formdata.IsMandatory = COMMON.CheckBooleanField(dbDataRows.fieldByName('IsMandatory'));
					formdata.MaxCharLength = dbDataRows.fieldByName('MaxCharLength');
					formdata.MaxCharLength = (formdata.MaxCharLength == null || formdata.MaxCharLength == undefined || formdata.MaxCharLength == '') ? 500 : formdata.MaxCharLength;
				} catch (e) {
					formdata.IsMandatory = false;
					formdata.MaxCharLength = 500;
				}

				if (formdata.IsHidden == 1 || formdata.IsHidden == '1') {
					formdata.IsHidden = 1;
					formdata.ValueHeight = 0;
					formdata.headerHeight = 0;
				}
				formdata.Language = dbDataRows.fieldByName('Language');
				formdata.DefaultValue = COMMON.CheckString(dbDataRows.fieldByName('DefaultValue'));
				formdata.Visible = COMMON.CheckDecimal(dbDataRows.fieldByName('Visible'));
				formdata.FieldControl = dbDataRows.fieldByName('FieldControl').toUpperCase();
				formdata.DataMemberType = dbDataRows.fieldByName('DataMemberType');
				formdata.DataMemberType = (formdata.DataMemberType == null || formdata.DataMemberType == undefined) ? 'STRING' : formdata.DataMemberType;
				formDataList.push(formdata);
				//iIndex = iIndex + 1;
				dbDataRows.next();
			}
			dbDataRows.close();
			//db.close();
			//if (screenName != '') {
			//COMMON.Log('FormConfig ScreenNAme 2  --> ' + 'FormConfig_' + screenName);
			//Titanium.App.Properties.setList('FormConfig_' + screenName, formDataList);
			//formDataList = [];
			//}
			qry = ""; qry = null;
			//db = null; 
			dbDataRows = null;
			formdata = {}; formdata = null;
			//COMMON.Log('Form Config End : ' + new Date().getTime());
		} catch (e) { }
		return formDataList;
	},
	loadMenuConfig: function (screenName) {
		return Titanium.App.Properties.getList('MenuConfig_' + screenName);
	},
	loadMenuPopupConfig: function (screenName) {
		return Titanium.App.Properties.getList('MenuConfig_Popup_' + screenName);
	},
	loadMenuFooterIconConfig: function (screenName) {
		return Titanium.App.Properties.getList('MenuConfig_FooterIcon_' + screenName);
	},
	loadDetailFooter: function (screenName) {
		var parent = TableViewBasicUIObj.createBasicView(null, 'white', 60 * Ti.App.dHeightRatio, '100%', null, null, null, null, 'horizontal');
		//var parent = TableViewBasicUIObj.createBasicView(null, 'transparent', 100, '100%', null, null, null, null, 'horizontal');
		//var sFormFooterView = ArrayOperations.prototype.loadFormConfig(screenName+'_FOOTER', []);
		//POINTOFSALES //TRAVELITE
		//if(screenName == 'Stock Order-NONEED'){//no need to Travelite
		if (screenName == 'Stock Order' || screenName == 'Loading' || screenName == 'Unloading - Items' || screenName == 'Unloading - Return Items' || screenName == 'Unloading - Variance' || screenName == 'Acknowledgement' || screenName == 'Partial Unloading - Items' || screenName == 'Partial Unloading - Return Items' || screenName == 'UnsoldDamage' || screenName == 'Van Stock Balance' || screenName == 'Partial Unloading - Variance') {
			//Stock Order
			if (Ti.App.UOMType == 2) {
				var DFChileView1 = TableViewBasicUIObj.createBasicView(null, 'white', 60, '0%', null, null, null, null, 'horizontal');
				//var DFChileView2 = TableViewBasicUIObj.createBasicView(null, 'white', 60, '100%', null, null, null, null, 'absolute');

				var DFChileView2 = TableViewBasicUIObj.createBasicView(null, 'white', 60, '100%', null, null, null, null, 'horizontal');

				parent.add(DFChileView1);
				parent.add(DFChileView2);


				commonObj.dFontHeightRatio = systemTableConfig['FONTRATIO'];
				commonObj.dFontHeightRatio = (commonObj.dFontHeightRatio == null || commonObj.dFontHeightRatio == undefined || commonObj.dFontHeightRatio == '') ? 1 : commonObj.dFontHeightRatio;

				//var DFChileView2Lbl1 = commonObj.BasicLabelObj.createLabel('Weight : 0', '50%', '100%', parseInt(18*commonObj.dFontHeightRatio), '', 'normal', '#333', 'transparent', 2, 2);
				//var DFChileView2Lbl2 = commonObj.BasicLabelObj.createLabel('Box : 0/0', '49%', '100%', parseInt(18*commonObj.dFontHeightRatio), '', 'normal', '#333', 'transparent', 2, 2);
				var DFChileView2Lbl1 = null; //commonObj.BasicLabelObj.createLabel('TOT : 0', '40%', '100%', parseInt(18*commonObj.dFontHeightRatio), '', 'normal', '#333', 'transparent', 2, 2);
				var DFChileView2Lbl2 = null; //commonObj.BasicLabelObj.createLabel('CBM : 0', '30%', '100%', parseInt(18*commonObj.dFontHeightRatio), '', 'normal', '#333', 'transparent', 2, 2);
				var DFChileView2Lbl3 = null; //commonObj.BasicLabelObj.createLabel('CASE : 0/0', '30%', '100%', parseInt(18*commonObj.dFontHeightRatio), '', 'normal', '#333', 'transparent', 2, 2);


				//DFChileView2Lbl1 = commonObj.BasicLabelObj.createLabel('TOT AMT : 0', '40%', '100%', parseInt(18*commonObj.dFontHeightRatio), '', 'normal', '#333', 'transparent', 2, 2);
				//DFChileView2Lbl2 = commonObj.BasicLabelObj.createLabel('CBM : 0', '30%', '100%', parseInt(18*commonObj.dFontHeightRatio), '', 'normal', '#333', 'transparent', 2, 2);
				//DFChileView2Lbl3 = commonObj.BasicLabelObj.createLabel('CASE : 0/0', '30%', '100%', parseInt(18*commonObj.dFontHeightRatio), '', 'normal', '#333', 'transparent', 2, 2);

				if (screenName == 'Van Stock Balance') {
					//DFChileView2Lbl1 = commonObj.BasicLabelObj.createLabel('TOT AMT : 0', '80%', '100%', parseInt(18*commonObj.dFontHeightRatio), '', 'normal', '#333', 'transparent', 2, 2);
					DFChileView2Lbl1 = commonObj.BasicLabelObj.createLabel('TOT : 0', '80%', '100%', parseInt(18 * commonObj.dFontHeightRatio), '', 'normal', '#333', 'transparent', 2, 2);
					if (Ti.App.ShowCBM == true) {
						DFChileView2Lbl2 = commonObj.BasicLabelObj.createLabel('CBM : 0', '10%', '100%', parseInt(18 * commonObj.dFontHeightRatio), '', 'normal', '#333', 'transparent', 2, 2);
					} else {
						DFChileView2Lbl2 = commonObj.BasicLabelObj.createLabel(' ', '10%', '100%', parseInt(18 * commonObj.dFontHeightRatio), '', 'normal', '#333', 'transparent', 2, 2);
					}
					//DFChileView2Lbl2 = commonObj.BasicLabelObj.createLabel('CBM : 0', '10%', '100%', parseInt(18*commonObj.dFontHeightRatio), '', 'normal', '#333', 'transparent', 2, 2);
					DFChileView2Lbl3 = commonObj.BasicLabelObj.createLabel('CASE : 0/0', '10%', '100%', parseInt(18 * commonObj.dFontHeightRatio), '', 'normal', '#333', 'transparent', 2, 2);

					DFChileView2Lbl2.text = '';
					DFChileView2Lbl3.text = '';
				} else {
					DFChileView2Lbl1 = commonObj.BasicLabelObj.createLabel('TOT : 0', '40%', '100%', parseInt(18 * commonObj.dFontHeightRatio), '', 'normal', '#333', 'transparent', 2, 2);

					if (Ti.App.ShowCBM == true) {
						DFChileView2Lbl2 = commonObj.BasicLabelObj.createLabel('CBM : 0', '30%', '100%', parseInt(18 * commonObj.dFontHeightRatio), '', 'normal', '#333', 'transparent', 2, 2);
					} else {
						DFChileView2Lbl2 = commonObj.BasicLabelObj.createLabel(' ', '30%', '100%', parseInt(18 * commonObj.dFontHeightRatio), '', 'normal', '#333', 'transparent', 2, 2);
					}

					DFChileView2Lbl3 = commonObj.BasicLabelObj.createLabel('CASE : 0/0', '30%', '100%', parseInt(18 * commonObj.dFontHeightRatio), '', 'normal', '#333', 'transparent', 2, 2);
				}


				//DFChileView2Lbl1.left = 0;			
				//DFChileView2Lbl2.right = 0;
				//DFChileView2Lbl3.right = 0;

				DFChileView2.add(DFChileView2Lbl1);
				DFChileView2.add(DFChileView2Lbl2);
				DFChileView2.add(DFChileView2Lbl3);

			} else {

				var DFChileView1 = TableViewBasicUIObj.createBasicView(null, 'white', 60, '40%', null, null, null, null, 'horizontal');
				var DFChileView2 = TableViewBasicUIObj.createBasicView(null, 'white', 60, '60%', null, null, null, null, 'absolute');
				parent.add(DFChileView1);
				parent.add(DFChileView2);

				commonObj.dFontHeightRatio = systemTableConfig['FONTRATIO'];
				commonObj.dFontHeightRatio = (commonObj.dFontHeightRatio == null || commonObj.dFontHeightRatio == undefined || commonObj.dFontHeightRatio == '') ? 1 : commonObj.dFontHeightRatio;

				var DFChileView2Lbl1 = commonObj.BasicLabelObj.createLabel('Weight : 0', '50%', '100%', parseInt(18 * commonObj.dFontHeightRatio), '', 'normal', '#333', 'transparent', 2, 2);
				var DFChileView2Lbl2 = commonObj.BasicLabelObj.createLabel('Box : 0/0', '49%', '100%', parseInt(18 * commonObj.dFontHeightRatio), '', 'normal', '#333', 'transparent', 2, 2);
				var DFChileView2Lbl3 = commonObj.BasicLabelObj.createLabel('TOT : 0', '80%', '100%', parseInt(18 * commonObj.dFontHeightRatio), '', 'normal', '#333', 'transparent', 2, 2);


				/*
				DFChileView2Lbl1.borderWidth = 1;
				DFChileView2Lbl1.borderColor = '#000080';
				DFChileView2Lbl2.borderWidth = 1;
				DFChileView2Lbl2.borderColor = '#008000';
				*/
				DFChileView2Lbl1.left = 0;
				//DFChileView2Lbl2.left = '30%';
				DFChileView2Lbl2.right = 0;
				DFChileView2.add(DFChileView2Lbl1);
				DFChileView2.add(DFChileView2Lbl2);
				if (COMMON.CheckBooleanField(Ti.App.ARRAYOPERATION.getSystemValue('ShowStockRequestTotal')) && screenName == 'Stock Order') {
					DFChileView1.add(DFChileView2Lbl3);
				}
			}
		} else if (screenName == 'Sales Items' || screenName == 'Sales' || screenName == 'ProposeOrder' || screenName == 'Sales Return Items' || screenName == 'Sales FOC Items' || screenName == 'Return') {
			//var DFChileView1 = TableViewBasicUIObj.createBasicView(null, 'white', 50, '100%', null, null, null, null, 'absolute');
			//parent.add(DFChileView1);

			commonObj.bShowSalesTotalAmount = COMMON.CheckBooleanField(this.getSystemValue('bShowSalesTotalAmount'));
			if (commonObj.bShowSalesTotalAmount == true) {
				var DFChileView = TableViewBasicUIObj.createBasicView(null, 'white', 50, '100%', null, null, null, null, 'vertical');
			} else {
				parent.height =100;// 90;
				var DFChileView = TableViewBasicUIObj.createBasicView(null, 'white', 100, '100%', null, null, null, null, 'vertical');
			}
			parent.add(DFChileView);

			var DFChileView1 = TableViewBasicUIObj.createBasicView(null, 'white', 50, '100%', null, null, null, null, 'horizontal');
			DFChileView.add(DFChileView1);
			var DFChileView2 = TableViewBasicUIObj.createBasicView(null, 'white', 50, '100%', null, null, null, null, 'horizontal');
			DFChileView.add(DFChileView2);

			commonObj.dFontHeightRatio = systemTableConfig['FONTRATIO'];
			commonObj.dFontHeightRatio = (commonObj.dFontHeightRatio == null || commonObj.dFontHeightRatio == undefined || commonObj.dFontHeightRatio == '') ? 1 : commonObj.dFontHeightRatio;

			var FooterTotalSKULabel = COMMON.CheckString(this.getSystemValue('FooterTotalSKULabel'));
			FooterTotalSKULabel = (FooterTotalSKULabel == '') ? "Total SKU/Qty :  " : FooterTotalSKULabel;
			var FooterTotalAmountLabel = COMMON.CheckString(this.getSystemValue('FooterTotalAmountLabel'));
			FooterTotalAmountLabel = (FooterTotalAmountLabel == '') ? "Total : " : FooterTotalAmountLabel;

			
			
			if (commonObj.bShowSalesTotalAmount == true) {
				//var DFChileView1Lbl1 = commonObj.BasicLabelObj.createLabel('Total SKU/Qty : 0/0        Total Amt : 0', '90%', '100%', parseInt(18*commonObj.dFontHeightRatio), '', 'normal', '#333', 'transparent', 2, 2);	
				var DFChileView1Lbl1 = commonObj.BasicLabelObj.createLabel(FooterTotalSKULabel+'0/0', '50%', '100%', parseInt(18 * commonObj.dFontHeightRatio), '', 'normal', '#333', 'transparent', 2, 2);
				var DFChileView2Lbl2 = commonObj.BasicLabelObj.createLabel(FooterTotalAmountLabel+'0', '50%', '100%', parseInt(18 * commonObj.dFontHeightRatio), '', 'normal', '#333', 'transparent', 1, 2);

			} else {
				var DFChileView1Lbl1 = commonObj.BasicLabelObj.createLabel(FooterTotalSKULabel+'0/0', '100%', '100%', parseInt(18 * commonObj.dFontHeightRatio), '', 'normal', '#333', 'transparent', 2, 2);
				//var DFChileView2Lbl2 = commonObj.BasicLabelObj.createLabel('GST : 0', '50%', '100%', parseInt(18*commonObj.dFontHeightRatio), '', 'normal', '#333', 'transparent', 2, 2);
				if (COMMON.CheckString(Ti.App.ARRAYOPERATION.getSystemValue('GSTText')) != '') {
					//var DFChileView2Lbl2 = commonObj.BasicLabelObj.createLabel('GST : 0', '50%', '100%', parseInt(18 * commonObj.dFontHeightRatio), '', 'normal', '#333', 'transparent', 2, 2);
					var DFChileView2Lbl2 = commonObj.BasicLabelObj.createLabel(COMMON.CheckString(Ti.App.ARRAYOPERATION.getSystemValue('GSTText')) + ' : 0', '50%', '100%', parseInt(18 * commonObj.dFontHeightRatio), '', 'normal', '#333', 'transparent', 2, 2);
				} else {
					var DFChileView2Lbl2 = commonObj.BasicLabelObj.createLabel('VAT : 0', '50%', '100%', parseInt(18 * commonObj.dFontHeightRatio), '', 'normal', '#333', 'transparent', 2, 2);
				}
				var DFChileView2Lbl3 = commonObj.BasicLabelObj.createLabel(FooterTotalAmountLabel+'0', '50%', '100%', parseInt(18 * commonObj.dFontHeightRatio), '', 'normal', '#333', 'transparent', 1, 2);
			}

			//COMMON.Log('commonObj.bShowSalesTotalAmount => ' + commonObj.bShowSalesTotalAmount);

			DFChileView1Lbl1.right = 0;
			DFChileView1.add(DFChileView1Lbl1);

			if (commonObj.bShowSalesTotalAmount == false) {

				DFChileView2.add(DFChileView2Lbl2);
				DFChileView2.add(DFChileView2Lbl3);
			} else {
				DFChileView1.add(DFChileView2Lbl2);
			}
		} else {

			//var sFormFooterView = ArrayOperations.prototype.loadFormConfig(screenName+'_FOOTER', []);
			dbDataRows = Ti.App.configDBConn.execute('SELECT * from FormConfig where Screenname = ' + Ti.App.SQL.safeSQL(screenName + '_FOOTER') + ' and Language = ' + Ti.App.SQL.safeSQL(Ti.App.sLanguage) + ' Order by DisplayNo');
			//COMMON.Log('SELECT * from FormConfig where Screenname = ' + Ti.App.SQL.safeSQL(screenName+'_FOOTER') + ' and Language = ' + Ti.App.SQL.safeSQL(Ti.App.sLanguage) + ' Order by DisplayNo');
			if (dbDataRows.isValidRow()) {
				while (dbDataRows.isValidRow()) {
					//salesHeaderList.height = dbDataRows.fieldByName('HeaderHeight');
					var DFChileView = TableViewBasicUIObj.createBasicView(null, 'white', 50 * Ti.App.dHeightRatio, '100%', null, null, null, null, 'vertical');
					var DFChileView1 = TableViewBasicUIObj.createBasicView(null, 'white', 50 * Ti.App.dHeightRatio, '100%', null, null, null, null, 'horizontal');

					var DFChileView1Lbl1 = commonObj.BasicLabelObj.createLabel(dbDataRows.fieldByName('NewText'), '30%', '100%', parseInt(18 * Ti.App.dHeightRatio), '', 'normal', '#3333ff', 'transparent', 1, 2);
					DFChileView1.add(DFChileView1Lbl1);

					var DFChileView1Lbl2 = commonObj.BasicLabelObj.createLabel('0/0', '70%', '100%', parseInt(18 * Ti.App.dHeightRatio), '', 'normal', '#3333ff', 'transparent', 2, 2);
					DFChileView1.add(DFChileView1Lbl2);

					DFChileView.add(DFChileView1);
					parent.add(DFChileView);
					dbDataRows.next();
				}
			} else {
				parent.height = 0;
			}
			dbDataRows.close();


		}
		return parent;
	},
	loadSignView: function (screenName) {
		var view = new BasicSignature().createBasicSignature(0, 0, null, 0);
		view.height = 0;
		return view;
	},
	buttonTouchEnd: function () {
		try {
			COMMON.removeOpacity(this);
			if (COMMON.avoidMultipleClick()) {
				return;
			}
			if (Ti.App.bFocusedTxtfield != null && Ti.App.bFocusedTxtfield != undefined) {
				Ti.App.bFocusedTxtfield.blur();
				Ti.App.bFocusedTxtfield = null;
				return;
			}
			Ti.App.triggerWindowOpened = false;
			
			if(bIsAndroid){
				Ti.UI.Android.hideSoftKeyboard();
			}
			
			/********* CHCEKWORKFLOW *********/
			try {
				if (Ti.App.dWorkFlow == true) {
					try {
						if (Ti.App.bSalesCompleted == true) {
							return;
						}
						//if(ArrayOperations.prototype.initCheckWorkFlow() == 1){
						//COMMON.showAlert("You Must Complete this " + Ti.App.currentScreenName + ".", ["OK"], null);
						//return false;
						//}
						if (mController.initWorkFlowBackButtonClick() != true) {
							return;
						}
					} catch (e) { }
					try {
						mController.finalizeWorkFlowBackButtonClick();
						return;
					} catch (e) { }
				}
			} catch (e) {
				return;
			}
			/************************************/
			try {
				if (mController.initBackButtonClick() != true) {
					return;
				}
			} catch (e) { }
			if (mView != null) {
				mView.closeWindow();
			}
			try {
				mController.finalizeBackButtonClick();
			} catch (e) { }
		} catch (e) { }
	},
	saveButtonTouchEnd: function () {
		try {
			commonObj.bCheckSysDate = COMMON.CheckBooleanField(this.getSystemValue('CheckSysDate'));
			if (commonObj.bCheckSysDate == true) {
				commonObj.dtSysDate = SI.getSystemValue('SysDate');
				commonObj.dtSysDate = (commonObj.dtSysDate == null || commonObj.dtSysDate == undefined || commonObj.dtSysDate == '') ? '' : commonObj.dtSysDate;
				commonObj.dtSysDate = commonObj.dtSysDate.replace(/-/g, "/");
				commonObj.dtSysDate = new Date(commonObj.dtSysDate);
				commonObj.dtSysValidDate = commonObj.dtSysDate;
				commonObj.year = parseInt(commonObj.dtSysValidDate.getFullYear());
				commonObj.month = parseInt(commonObj.dtSysValidDate.getMonth());
				commonObj.date = parseInt(commonObj.dtSysValidDate.getDate());
				commonObj.hour = parseInt(commonObj.dtSysValidDate.getHours());
				commonObj.dtSysValidDate = new Date(commonObj.year, commonObj.month, commonObj.date, 23, 59, 59);
				commonObj.currentDate = new Date();
				commonObj.cyear = parseInt(commonObj.currentDate.getFullYear());
				commonObj.cmonth = parseInt(commonObj.currentDate.getMonth());
				commonObj.cdate = parseInt(commonObj.currentDate.getDate());
				commonObj.currentDate = new Date(commonObj.cyear, commonObj.cmonth, commonObj.cdate, 23, 59, 59);
				if (commonObj.dtSysValidDate > commonObj.currentDate) {
					COMMON.showAlert("Please check device date", ["OK"], null);
					return true;
				}
			}
			COMMON.removeOpacity(this);
			if (COMMON.avoidMultipleClick()) {
				return;
			}
			/*if(Ti.App.bFocusedTxtfield != null && Ti.App.bFocusedTxtfield != undefined){
				Ti.App.bFocusedTxtfield.blur();
				Ti.App.bFocusedTxtfield = null;
				return;
			}*/
			if(bIsAndroid){
				Ti.UI.Android.hideSoftKeyboard();
			}
			
			currentWin = Ti.App.currentWin;
			if (currentWin != null && currentWin != undefined) {
				ArrayOperations.prototype.createIndicatorObject();
				currentWin.add(actInd);
				actInd.show();
			}
			
			/********* CHCEKWorkFlow *********/
			try {
				if (Ti.App.dWorkFlow == true) {
					try {
						if (mController.initWorkFlowSaveButtonClick() != true) {
							if (currentWin != null && currentWin != undefined) {
								actInd.hide();
								currentWin.remove(actInd);
								currentWin = null;
							}
						}
					} catch (e) {
					}
					try {
						mController.saveWorkFlowButtonClick();
					} catch (e) {
					}
					try {
						mController.finalizeWorkFlowSaveButtonClick();
						//ArrayOperations.prototype.updateWorkFlowStatus(Ti.App.currentScreenName, Ti.App.accessLevel, Ti.App.sWorkFlowID);
						if (ArrayOperations.prototype.initCheckWorkFlow() == 1) {
							COMMON.showAlert("You Must Complete this " + Ti.App.currentScreenName + ".", ["OK"], null);
							if (currentWin != null && currentWin != undefined) {
								actInd.hide();
								currentWin.remove(actInd);
								currentWin = null;
							}
							return false;
						}
						ArrayOperations.prototype.checkWorkFlow();
						if (currentWin != null && currentWin != undefined) {
							actInd.hide();
							currentWin.remove(actInd);
							currentWin = null;
						}
						return;
					} catch (e) { }
				}
			} catch (e) {
				if (currentWin != null && currentWin != undefined) {
					actInd.hide();
					currentWin.remove(actInd);
					currentWin = null;
				}
				return;
			}
			/************************************/
			try {
				if (!mController.initSaveButtonClick()) {
					if (currentWin != null && currentWin != undefined) {
						actInd.hide();
						currentWin.remove(actInd);
						currentWin = null;
					}
					return;
				}
			} catch (e) { }
			try {
				mController.saveButtonClick();
			} catch (e) { }
			try {
				mController.finalizeSaveButtonClick();
			} catch (e) { }
			if (currentWin != null && currentWin != undefined) {
				actInd.hide();
				currentWin.remove(actInd);
				currentWin = null;
			}
		} catch (e) { }
	},
	printButtonTouchEnd: function () {
		try {
			COMMON.removeOpacity(this);
			if (COMMON.avoidMultipleClick()) {
				return;
			}
			if (Ti.App.bFocusedTxtfield != null && Ti.App.bFocusedTxtfield != undefined) {
				Ti.App.bFocusedTxtfield.blur();
				Ti.App.bFocusedTxtfield = null;
				return;
			}
			try {
				if (Ti.App.currentScreenName == "View Document Sales Order" || Ti.App.currentScreenName == "View Document Invoices" || Ti.App.currentScreenName == "View Document") {
					//if(Ti.App.currentScreenName == "View Document Invoices"){
					var ComboBox = require('/BaseComponents/ComboBox');
					var sPrinterNameArr = [{ "ComboBoxCode": "PRA4", "displayText": "A4 Printer" }, { "ComboBoxCode": "PR4INCH", "displayText": "4Inch Printer" }];
					//new ComboBox().show("Printer Type", Controller.prototype,sPrinterNameArr, Controller.prototype,currentScreenName, sPrinterNameArr, 0);
					new ComboBox().show("Printer Type", mController, sPrinterNameArr, this, '', '', '', '');
				} else {
					try {
						if (!mController.initPrintButtonClick()) {
							return;
						}
					} catch (e) { }
					try {
						mController.printButtonClick();
					} catch (e) { }
					try {
						mController.finalizePrintButtonClick();
					} catch (e) { }
				}
			} catch (e) { }
		} catch (e) { }
	},
	previewButtonTouchEnd: function () {
		try {
			COMMON.removeOpacity(this);
			if (COMMON.avoidMultipleClick()) {
				return;
			}
			if (Ti.App.bFocusedTxtfield != null && Ti.App.bFocusedTxtfield != undefined) {
				Ti.App.bFocusedTxtfield.blur();
				Ti.App.bFocusedTxtfield = null;
				return;
			}
			try {
				if (!mController.initPreviewButtonClick()) {
					return;
				}
			} catch (e) { }
			try {
				mController.previewButtonClick();
			} catch (e) { }
			try {
				mController.finalizePreviewButtonClick();
			} catch (e) { }
		} catch (e) { }
	},
	syncButtonTouchEnd: function () {
		try {
			COMMON.removeOpacity(this);
			if (COMMON.avoidMultipleClick()) {
				return;
			}
			if (Ti.App.bFocusedTxtfield != null && Ti.App.bFocusedTxtfield != undefined) {
				Ti.App.bFocusedTxtfield.blur();
				Ti.App.bFocusedTxtfield = null;
				return;
			}
			try {
				if (!mController.initSyncButtonClick()) {
					return;
				}
			} catch (e) { }
			try {
				mController.syncButtonClick();
			} catch (e) { }
			try {
				mController.finalizeSyncButtonClick();
			} catch (e) { }
		} catch (e) { }
	},
	nextButtonTouchEnd: function () {
		try {
			if (Ti.App.triggerWindowOpened == true) {
				return;
			}
			COMMON.removeOpacity(this);
			if (COMMON.avoidMultipleClick()) {
				return;
			}
			if (Ti.App.bFocusedTxtfield != null && Ti.App.bFocusedTxtfield != undefined) {
				Ti.App.bFocusedTxtfield.blur();
				Ti.App.bFocusedTxtfield = null;
				return;
			}
			
			if(bIsAndroid){
				Ti.UI.Android.hideSoftKeyboard();
			}
			/********* CHCEKWorkFlow *********/
			try {
				//if(Ti.App.dWorkFlow == true){
				try {
					if (mController.initWorkFlowNextButtonClick() != true) {
						return false;
					}
				} catch (e) { }
				try {
					mController.WorkFlowNextButtonClick();
				} catch (e) { }
				try {
					mController.finalizeWorkFlowNextButtonClick();
					//ArrayOperations.prototype.updateWorkFlowStatus(Ti.App.currentScreenName, Ti.App.accessLevel, Ti.App.sWorkFlowID);
					if (ArrayOperations.prototype.initCheckWorkFlow() == 1) {
						COMMON.showAlert("You Must Complete this " + Ti.App.currentScreenName + ".", ["OK"], null);
						return false;
					}
					ArrayOperations.prototype.checkWorkFlow();
					return;
				} catch (e) { }
				//}
			} catch (e) {
				return;
			}
			/************************************/
			try {
				if (!mController.initNextButtonClick()) {
					return;
				}
			} catch (e) { }
			try {
				mController.nextButtonPressed();
			} catch (e) { }
			try {
				mController.FinalizeNextButtonClick();
			} catch (e) { }
		} catch (e) { }
	},
	getIsShowSearchButton: function () {
		return isShowSearchButton;
	},
	loadHeaderButtonsNew: function (screenName) {
		//COMMON.Log('Ti.App.currentScreenName : ' + Ti.App.currentScreenName + ' - screenName : ' + screenName);

		var buttonHeader = TableViewBasicUIObj.createBasicView(null, 'transparent', iHeaderHeight, Ti.UI.FILL, 0, 0, 0, 0, null);
		buttonHeader.backgroundColor = 'transparent';//#ff0';
		buttonHeader.bSearchIconEnabled = isShowSearchButton;
		commonObj.topButton = (parseInt(iHeaderHeight) - parseInt(iIconHeight)) / 2;

		var buttonHeaderRightPanel = TableViewBasicUIObj.createBasicView(null, 'transparent', Ti.UI.SIZE, Ti.UI.SIZE, null, 0, commonObj.topButton, 0, 'horizontal');
		buttonHeader.add(buttonHeaderRightPanel);
		buttonHeader.zIndex = 1;
		commonObj.buttonCounter = 0;
		buttonOrder['BACK'] = commonObj.buttonCounter;
		var backButton = commonObj.BasicHeaderButtonObj.createButton('', iIconWidth, iIconHeight, null, '#e8e8e8', 'back.simg');
		backButton.btnType = 'BACK';
		backButton.left = 1;//5;
		if (Ti.App.LookupScreen == true) {
			backButton.width = 0;
		}
		buttonHeader.add(backButton);
		var rightGap = 5;
		var buttonSearch = commonObj.BasicHeaderButtonObj.createButton('', 0, iIconHeight, null, '#e8e8e8', 'searchicon.png');
		buttonSearch.btnType = 'SEARCH';
		buttonSearch.focusable = false;
		buttonSearch.right = 5;
		buttonOrder['SEARCH'] = commonObj.buttonCounter;
		buttonSearch.isActive = false;
		buttonSearchIsActive = false;
		function searchButtonTouchEnd(e) {
			try {
				COMMON.removeOpacity(this);
				if (COMMON.avoidMultipleClick()) {
					return;
				}
				if (Ti.App.bFocusedTxtfield != null && Ti.App.bFocusedTxtfield != undefined) {
					Ti.App.bFocusedTxtfield.blur();
					Ti.App.bFocusedTxtfield = null;
					return;
				}
				buttonSearch.isActive = !buttonSearch.isActive;
				buttonSearchIsActive = buttonSearch.isActive;
				mView.showSearch(buttonSearch.isActive);
				try {
					if (!mController.initSearchButtonClick()) {
						return;
					}
				} catch (e) { }
				try {
					mController.searchButtonClick();
				} catch (e) { }
				try {
					mController.finalizeSearchButtonClick();
				} catch (e) { }
			} catch (e) { }
		}

		commonObj.buttonCounter = 0;
		commonObj.buttonCounter++;
		buttonOrder['SAVE'] = commonObj.buttonCounter;
		rightGap = 5;
		var buttonSave = commonObj.BasicHeaderButtonObj.createButton('', 0, iIconHeight, null, '#e8e8e8', 'save.png');
		buttonSave.btnType = 'SAVE';
		commonObj.buttonCounter++;

		buttonOrder['PRINT'] = commonObj.buttonCounter;
		var buttonPrint = commonObj.BasicHeaderButtonObj.createButton('', 0, iIconHeight, null, '#e8e8e8', 'print.png');
		buttonPrint.btnType = 'PRINT';
		commonObj.buttonCounter++;

		buttonOrder['PREVIEW'] = commonObj.buttonCounter;
		var buttonPreview = commonObj.BasicHeaderButtonObj.createButton('', 0, iIconHeight, null, '#e8e8e8', 'preview.png');
		buttonPreview.btnType = 'PREVIEW';
		commonObj.buttonCounter++;

		buttonOrder['SYNC'] = commonObj.buttonCounter;
		var buttonSync = commonObj.BasicHeaderButtonObj.createButton('', 0, iIconHeight, null, '#e8e8e8', 'sync.png');
		buttonSync.btnType = 'SYNC';
		commonObj.buttonCounter++;

		buttonOrder['REJECT'] = commonObj.buttonCounter;
		//var buttonReject = commonObj.BasicButtonObj.createButton('', 0, iIconHeight, null, '#e8e8e8');
		var buttonReject = commonObj.BasicHeaderButtonObj.createButton('', 0, iIconHeight, null, '#e8e8e8', 'rejected.simg');
		buttonReject.btnType = 'REJECT';
		//buttonReject.backgroundImage = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'rejected.simg');
		function rejectButtonTouchEnd(e) {
			try {
				COMMON.removeOpacity(this);
				if (COMMON.avoidMultipleClick()) {
					return;
				}
				if (Ti.App.bFocusedTxtfield != null && Ti.App.bFocusedTxtfield != undefined) {
					Ti.App.bFocusedTxtfield.blur();
					Ti.App.bFocusedTxtfield = null;
					return;
				}
				currentWin = Ti.App.currentWin;
				if (currentWin != null && currentWin != undefined) {
					ArrayOperations.prototype.createIndicatorObject();
					currentWin.add(actInd);
					actInd.show();
				}
				try {
					if (!mController.initRejectButtonClick()) {
						if (currentWin != null && currentWin != undefined) {
							actInd.hide();
							currentWin.remove(actInd);
							currentWin = null;
						}
						return;
					}
				} catch (e) { }
				try {
					mController.RejectButtonPressed();
				} catch (e) { }
				try {
					mController.FinalizeRejectButtonClick();
				} catch (e) { }
				if (currentWin != null && currentWin != undefined) {
					actInd.hide();
					currentWin.remove(actInd);
					currentWin = null;
				}
			} catch (e) { }
		}
		commonObj.buttonCounter++;

		buttonOrder['APPROVE'] = commonObj.buttonCounter;
		//var buttonApprove = commonObj.BasicButtonObj.createButton('', 0, iIconHeight, null, '#e8e8e8');
		var buttonApprove = commonObj.BasicHeaderButtonObj.createButton('', 0, iIconHeight, null, '#e8e8e8', 'approved.simg');
		buttonApprove.btnType = 'APPROVE';
		//buttonApprove.backgroundImage = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'approved.simg');

		function approveButtonTouchEnd(e) {
			try {
				COMMON.removeOpacity(this);
				if (COMMON.avoidMultipleClick()) {
					return;
				}
				if (Ti.App.bFocusedTxtfield != null && Ti.App.bFocusedTxtfield != undefined) {
					Ti.App.bFocusedTxtfield.blur();
					Ti.App.bFocusedTxtfield = null;
					return;
				}
				currentWin = Ti.App.currentWin;
				if (currentWin != null && currentWin != undefined) {
					ArrayOperations.prototype.createIndicatorObject();
					currentWin.add(actInd);
					actInd.show();
				}
				try {
					if (!mController.initApproveButtonClick()) {
						if (currentWin != null && currentWin != undefined) {
							actInd.hide();
							currentWin.remove(actInd);
							currentWin = null;
						}
						return;
					}
				} catch (e) { }
				try {
					mController.ApproveButtonPressed();
				} catch (e) { }
				try {
					mController.FinalizeApproveButtonClick();
				} catch (e) { }
				if (currentWin != null && currentWin != undefined) {
					actInd.hide();
					currentWin.remove(actInd);
					currentWin = null;
				}
			} catch (e) { }
		}
		//if(screenName == 'Form-PrintOption'){
		if (Ti.App.currentScreenName != 'MDT' && Ti.App.currentScreenName != 'Message' && Ti.App.currentScreenName != 'SYNC' && Ti.App.LookupScreen == false && screenName != 'Form-Message') {
			commonObj.buttonCounter++;
			buttonOrder['MESSAGE'] = commonObj.buttonCounter;

			var buttonMessage = commonObj.BasicButtonObj.createButton('', 0, 0, null, '#e8e8e8');
			buttonMessage.btnType = 'MESSAGE';

			buttonMessage.right = 3;
			//buttonMessage.backgroundImage = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'msg.png');
			buttonMessage.backgroundImage = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'msg.png');

			commonObj.buttonCounter++;
			buttonOrder['MESSAGECOUNT'] = commonObj.buttonCounter;


			var MsgCountView = commonObj.BasicLabelObj.createLabel(ArrayOperations.prototype.getUnreadMessageCount(), 0, 0, 30, '', '100', '#e8e8e8', 'transparent', 2, 0);
			MsgCountView.right = 3;


			function messageButtonTouchEnd(e) {
				try {
					COMMON.removeOpacity(this);
					if (COMMON.avoidMultipleClick()) {
						return;
					}
					if (Ti.App.bFocusedTxtfield != null && Ti.App.bFocusedTxtfield != undefined) {
						Ti.App.bFocusedTxtfield.blur();
						Ti.App.bFocusedTxtfield = null;
						return;
					}
					var obj = {};
					obj.sScreenOpenFrom = 'HeaderIconClicked';
					mView.openWindow("Message", obj);
				} catch (e) {
				}
			}
		}

		commonObj.buttonCounter++;
		buttonOrder['NEXT'] = commonObj.buttonCounter;
		var buttonNext = commonObj.BasicHeaderButtonObj.createButton('', 0, iIconHeight, null, '#e8e8e8', 'next.simg');
		buttonNext.btnType = 'NEXT';

		buttonHeaderRightPanel.add(buttonSearch);
		buttonHeaderRightPanel.add(buttonSave);
		buttonHeaderRightPanel.add(buttonPrint);///******** no need for Warburg ****
		buttonHeaderRightPanel.add(buttonPreview);
		buttonHeaderRightPanel.add(buttonSync);
		buttonHeaderRightPanel.add(buttonReject);///******** no need for Warburg ****
		buttonHeaderRightPanel.add(buttonApprove);///******** no need for Warburg ****
		//COMMON.Log('Ti.App.currentScreenName --> ' + Ti.App.currentScreenName);

		if (Ti.App.currentScreenName != 'MDT' && Ti.App.currentScreenName != 'Message' && Ti.App.currentScreenName != 'SYNC') {
			buttonHeaderRightPanel.add(buttonMessage);
			buttonHeaderRightPanel.add(MsgCountView);
		}
		buttonHeaderRightPanel.add(buttonNext);

		buttonHeader.addEventListener('touchstart', function (e) {
			if (e.source.btnType != null && e.source.btnType != undefined && e.source.btnType != '') {
				COMMON.touchStart(e);
				if (e.source.btnType == 'BACK') {
					ArrayOperations.prototype.buttonTouchEnd();
				} else if (e.source.btnType == 'SEARCH') {
					searchButtonTouchEnd();
				} else if (e.source.btnType == 'SAVE') {
					ArrayOperations.prototype.saveButtonTouchEnd();
				} else if (e.source.btnType == 'PREVIEW') {
					ArrayOperations.prototype.previewButtonTouchEnd();
				} else if (e.source.btnType == 'PRINT') {
					ArrayOperations.prototype.printButtonTouchEnd();
				} else if (e.source.btnType == 'SYNC') {
					ArrayOperations.prototype.syncButtonTouchEnd();
				} else if (e.source.btnType == 'REJECT') {
					rejectButtonTouchEnd();
				} else if (e.source.btnType == 'APPROVE') {
					approveButtonTouchEnd();
				} else if (e.source.btnType == 'MESSAGE') {
					messageButtonTouchEnd();
				} else if (e.source.btnType == 'NEXT') {
					ArrayOperations.prototype.nextButtonTouchEnd();
				}
				COMMON.removeOpacity(e.source);
			}
		});

		return buttonHeader;
	},
	loadHeaderButtons: function (screenName, contentWindow) {
		//COMMON.Log('Ti.App.currentScreenName : ' + Ti.App.currentScreenName + ' - screenName : ' + screenName);
		//COMMON.Log('loadHeaderButtons Start 1 : ' + new Date().getTime());		
		var buttonHeader = TableViewBasicUIObj.createBasicView(null, 'transparent', iHeaderHeight, Ti.UI.FILL, 0, 0, 0, 0, null);
		buttonHeader.backgroundColor = 'transparent';//#ff0';
		buttonHeader.bSearchIconEnabled = isShowSearchButton;
		commonObj.topButton = (parseInt(iHeaderHeight) - parseInt(iIconHeight)) / 2;
		contentWindow.add(buttonHeader);
		//COMMON.Log('loadHeaderButtons Start 2 : ' + new Date().getTime());		
		var buttonHeaderRightPanel = TableViewBasicUIObj.createBasicView(null, 'transparent', Ti.UI.SIZE, Ti.UI.SIZE, null, 0, commonObj.topButton, 0, 'horizontal');
		buttonHeader.add(buttonHeaderRightPanel);

		buttonHeader.zIndex = 1;
		commonObj.buttonCounter = 0;
		buttonOrder['BACK'] = commonObj.buttonCounter;
		//COMMON.Log('loadHeaderButtons Start 3 : ' + new Date().getTime());		
		var backButton = commonObj.BasicHeaderButtonObj.createButton('', iIconWidth, iIconHeight, null, '#e8e8e8', 'back.simg');
		backButton.btnType = 'BACK';
		backButton.left = 1;//5;
		//backButton.mViewController = mView;
		//backButton.screenName = screenName 
		//backButton.backgroundImage = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'back.simg');
		buttonHeader.add(backButton);
		//COMMON.Log('loadHeaderButtons Start 4 : ' + new Date().getTime());		
		var rightGap = 5;
		/*******************************/
		//if(Ti.App.currentScreenName != 'MDT'){
		var buttonSearch = commonObj.BasicHeaderButtonObj.createButton('', 0, iIconHeight, null, '#e8e8e8', 'searchicon.png');
		buttonSearch.btnType = 'SEARCH';
		//buttonSearch.backgroundImage = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'searchicon.png');
		buttonSearch.focusable = false;
		//buttonSearch.right = rightGap;
		buttonOrder['SEARCH'] = commonObj.buttonCounter;
		buttonSearch.isActive = false;
		//COMMON.Log('loadHeaderButtons Start 5 : ' + new Date().getTime());
		//buttonSearch.addEventListener('touchstart', COMMON.touchStart);
		//buttonSearch.addEventListener('singletap', searchButtonTouchEnd);
		function searchButtonTouchEnd(e) {
			try {
				COMMON.removeOpacity(this);
				if (COMMON.avoidMultipleClick()) {
					return;
				}
				if (Ti.App.bFocusedTxtfield != null && Ti.App.bFocusedTxtfield != undefined) {
					Ti.App.bFocusedTxtfield.blur();
					Ti.App.bFocusedTxtfield = null;
					return;
				}
				buttonSearch.isActive = !buttonSearch.isActive;
				mView.showSearch(buttonSearch.isActive);
				try {
					if (!mController.initSearchButtonClick()) {
						return;
					}
				} catch (e) { }
				try {
					mController.searchButtonClick();
				} catch (e) { }
				try {
					mController.finalizeSearchButtonClick();
				} catch (e) { }
			} catch (e) { }
		}

		commonObj.buttonCounter = 0;
		commonObj.buttonCounter++;
		buttonOrder['SAVE'] = commonObj.buttonCounter;
		rightGap = 5;
		//COMMON.Log('loadHeaderButtons Start 6 : ' + new Date().getTime());		
		var buttonSave = commonObj.BasicHeaderButtonObj.createButton('', 0, iIconHeight, null, '#e8e8e8', 'save.png');
		buttonSave.btnType = 'SAVE';
		//buttonSave.backgroundImage = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'save.png');
		//buttonSave.right = rightGap;
		/******** no need for Warburg ****/
		commonObj.buttonCounter++;
		buttonOrder['PRINT'] = commonObj.buttonCounter;
		//rightGap = 5;
		var buttonPrint = commonObj.BasicHeaderButtonObj.createButton('', 0, iIconHeight, null, '#e8e8e8', 'print.png');
		buttonPrint.btnType = 'PRINT';
		//buttonPrint.backgroundImage = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'print.png');
		//buttonPrint.right = rightGap;
		/************************************/
		commonObj.buttonCounter++;
		buttonOrder['PREVIEW'] = commonObj.buttonCounter;
		//rightGap = 5;
		var buttonPreview = commonObj.BasicHeaderButtonObj.createButton('', 0, iIconHeight, null, '#e8e8e8', 'preview.png');
		buttonPreview.btnType = 'PREVIEW';
		//buttonPreview.backgroundImage = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'preview.png');
		//buttonPreview.right = rightGap;
		//}else {
		//COMMON.Log('loadHeaderButtons Start 7 : ' + new Date().getTime());	
		commonObj.buttonCounter++;
		buttonOrder['SYNC'] = commonObj.buttonCounter;
		//rightGap = 5;
		var buttonSync = commonObj.BasicHeaderButtonObj.createButton('', 0, iIconHeight, null, '#e8e8e8', 'sync.png');
		buttonSync.btnType = 'SYNC';
		//buttonSync.backgroundImage = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'sync.png');
		//}
		///******** no need for Warburg ****/
		commonObj.buttonCounter++;
		buttonOrder['REJECT'] = commonObj.buttonCounter;
		var buttonReject = commonObj.BasicButtonObj.createButton('', 0, iIconHeight, null, '#e8e8e8');
		buttonReject.btnType = 'REJECT';
		buttonReject.backgroundImage = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'rejected.simg');
		//buttonNext.right = rightGap;
		//buttonHeaderRightPanel.add(buttonReject);
		//buttonReject.addEventListener('touchstart', COMMON.touchStart);
		//buttonReject.addEventListener('singletap', rejectButtonTouchEnd);
		function rejectButtonTouchEnd(e) {
			try {
				COMMON.removeOpacity(this);
				if (COMMON.avoidMultipleClick()) {
					return;
				}
				if (Ti.App.bFocusedTxtfield != null && Ti.App.bFocusedTxtfield != undefined) {
					Ti.App.bFocusedTxtfield.blur();
					Ti.App.bFocusedTxtfield = null;
					return;
				}
				currentWin = Ti.App.currentWin;
				if (currentWin != null && currentWin != undefined) {
					ArrayOperations.prototype.createIndicatorObject();
					currentWin.add(actInd);
					actInd.show();
				}
				try {
					if (!mController.initRejectButtonClick()) {
						if (currentWin != null && currentWin != undefined) {
							actInd.hide();
							currentWin.remove(actInd);
							currentWin = null;
						}
						return;
					}
				} catch (e) { }
				try {
					mController.RejectButtonPressed();
				} catch (e) { }
				try {
					mController.FinalizeRejectButtonClick();
				} catch (e) { }
				if (currentWin != null && currentWin != undefined) {
					actInd.hide();
					currentWin.remove(actInd);
					currentWin = null;
				}
			} catch (e) { }
		}

		commonObj.buttonCounter++;
		buttonOrder['APPROVE'] = commonObj.buttonCounter;
		var buttonApprove = commonObj.BasicButtonObj.createButton('', 0, iIconHeight, null, '#e8e8e8');
		buttonApprove.btnType = 'APPROVE';
		buttonApprove.backgroundImage = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'approved.simg');
		//buttonNext.right = rightGap;
		//buttonHeaderRightPanel.add(buttonApprove);
		//buttonApprove.addEventListener('touchstart', COMMON.touchStart);
		//buttonApprove.addEventListener('singletap', approveButtonTouchEnd);

		function approveButtonTouchEnd(e) {
			try {
				COMMON.removeOpacity(this);
				if (COMMON.avoidMultipleClick()) {
					return;
				}
				if (Ti.App.bFocusedTxtfield != null && Ti.App.bFocusedTxtfield != undefined) {
					Ti.App.bFocusedTxtfield.blur();
					Ti.App.bFocusedTxtfield = null;
					return;
				}
				currentWin = Ti.App.currentWin;
				if (currentWin != null && currentWin != undefined) {
					ArrayOperations.prototype.createIndicatorObject();
					currentWin.add(actInd);
					actInd.show();
				}
				try {
					if (!mController.initApproveButtonClick()) {
						if (currentWin != null && currentWin != undefined) {
							actInd.hide();
							currentWin.remove(actInd);
							currentWin = null;
						}
						return;
					}
				} catch (e) { }
				try {
					mController.ApproveButtonPressed();
				} catch (e) { }
				try {
					mController.FinalizeApproveButtonClick();
				} catch (e) { }
				if (currentWin != null && currentWin != undefined) {
					actInd.hide();
					currentWin.remove(actInd);
					currentWin = null;
				}
			} catch (e) { }
		}
		/***************/

		if (Ti.App.currentScreenName != 'MDT' && Ti.App.currentScreenName != 'Message' && Ti.App.currentScreenName != 'SYNC' && Ti.App.currentScreenName != 'Form-Message') {
			commonObj.buttonCounter++;
			buttonOrder['MESSAGE'] = commonObj.buttonCounter;
			// /*
			// var buttonMessage = TableViewBasicUIObj.createBasicView(null, 'transparent', iIconHeight, (iIconWidth + 20), null, null, null, null, 'horizontal');
			// buttonHeaderRightPanel.add(buttonMessage);
			// 		
			// var buttonMessageIcon = commonObj.BasicButtonObj.createButton('', iIconWidth, iIconHeight, null, '#e8e8e8');
			// buttonMessageIcon.backgroundImage = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'm.png');
			// buttonMessage.add(buttonMessageIcon);
			// 		
			// var MsgCountView = commonObj.BasicLabelObj.createLabel(88, 18.5, iIconHeight, 18, '', 'normal', '#e8e8e8', 'transparent', 2, 0);
			// MsgCountView.left = 1;
			// buttonHeaderRightPanel.add(MsgCountView);
			// 
			// buttonMessage.addEventListener('touchstart', COMMON.touchStart);
			// //buttonPreview.addEventListener('touchend', previewButtonTouchEnd);
			// buttonMessage.addEventListener('singletap', messageButtonTouchEnd);
			// * /

			//var buttonMessage = commonObj.BasicButtonObj.createButton('', iIconWidth, iIconHeight-8, null, '#e8e8e8');
			var buttonMessage = commonObj.BasicButtonObj.createButton('', 0, 0, null, '#e8e8e8');
			buttonMessage.btnType = 'MESSAGE';

			buttonMessage.right = 3;
			//var buttonMessage = commonObj.BasicButtonObj.createButton('', 0, iIconHeight, null, '#e8e8e8');
			buttonMessage.backgroundImage = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'msg.png');
			//buttonHeaderRightPanel.add(buttonMessage);
			// /*
			// //var MsgCountView = commonObj.BasicLabelObj.createLabel(88, 18, 0, 18, '', 'normal', '#e8e8e8', 'transparent', 2, 0);
			// var MsgCountView = commonObj.BasicLabelObj.createLabel(88, 18, iIconHeight, 18, '', 'normal', '#e8e8e8', 'transparent', 2, 0);
			// MsgCountView.left = 1;
			// buttonHeaderRightPanel.add(MsgCountView);
			// * /
			//buttonMessage.addEventListener('touchstart', COMMON.touchStart);
			//buttonMessage.addEventListener('singletap', messageButtonTouchEnd);

			//MsgCountView.addEventListener('touchstart', COMMON.touchStart);
			//MsgCountView.addEventListener('singletap', messageButtonTouchEnd);

			function messageButtonTouchEnd(e) {
				try {
					COMMON.removeOpacity(this);
					if (COMMON.avoidMultipleClick()) {
						return;
					}
					if (Ti.App.bFocusedTxtfield != null && Ti.App.bFocusedTxtfield != undefined) {
						Ti.App.bFocusedTxtfield.blur();
						Ti.App.bFocusedTxtfield = null;
						return;
					}
					//if(dashScreenName == "Refresh_Messages"){
					//Ti.App.sEnabledMsgIcon = true;
					//}
					var obj = {};
					obj.sScreenOpenFrom = 'HeaderIconClicked';
					mView.openWindow("Message", obj);
					// try {
					// if (!mController.initMessageButtonClick()) {
					// return;
					// }
					// } catch(e) {}
					// try {
					// mController.messageButtonClick();
					// } catch(e) {}
					// try {
					// mController.finalizeMessageButtonClick();
					// } catch(e) {}

				} catch (e) {
				}
			}
		}
		/***************/

		commonObj.buttonCounter++;
		buttonOrder['NEXT'] = commonObj.buttonCounter;
		//var buttonNext = commonObj.BasicButtonObj.createButton('', 0, iIconHeight, null, '#e8e8e8');
		//if(Ti.App.currentScreenName == 'MDT'){
		/*if(Ti.App.currentScreenName == 'MDT' && Ti.App.currentScreenName == 'Message'  && Ti.App.currentScreenName == 'SYNC'){	
			var buttonNext = commonObj.BasicButtonObj.createButton('', 0, iIconHeight, null, '#e8e8e8');
		}else{
			var buttonNext = commonObj.BasicButtonObj.createButton('', iIconWidth, iIconHeight, null, '#e8e8e8');
			//var buttonNext = commonObj.BasicButtonObj.createButton('', 0, iIconHeight, null, '#e8e8e8');
		}*/
		var buttonNext = commonObj.BasicHeaderButtonObj.createButton('', 0, iIconHeight, null, '#e8e8e8', 'next.simg');
		buttonNext.btnType = 'NEXT';
		//buttonNext.backgroundImage = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'next.simg');
		//buttonNext.right = rightGap;
		//buttonNext.addEventListener('touchstart', function(e){
		//COMMON.touchStart();
		//nextButtonTouchEnd();
		//});
		//COMMON.Log('loadHeaderButtons Start 8 : ' + new Date().getTime());		
		//if(Ti.App.currentScreenName != 'MDT'){		
		buttonHeaderRightPanel.add(buttonSearch);
		//COMMON.Log('loadHeaderButtons Start 8-1 : ' + new Date().getTime());
		buttonHeaderRightPanel.add(buttonSave);
		//COMMON.Log('loadHeaderButtons Start 8-2 : ' + new Date().getTime());
		buttonHeaderRightPanel.add(buttonPrint);///******** no need for Warburg ****
		//COMMON.Log('loadHeaderButtons Start 8-3 : ' + new Date().getTime());		
		buttonHeaderRightPanel.add(buttonPreview);
		//COMMON.Log('loadHeaderButtons Start 8-4 : ' + new Date().getTime());		
		//}else{
		buttonHeaderRightPanel.add(buttonSync);
		//COMMON.Log('loadHeaderButtons Start 8-5 : ' + new Date().getTime());		
		//}	
		buttonHeaderRightPanel.add(buttonReject);///******** no need for Warburg ****
		buttonHeaderRightPanel.add(buttonApprove);///******** no need for Warburg ****
		if (Ti.App.currentScreenName != 'MDT' && Ti.App.currentScreenName != 'Message' && Ti.App.currentScreenName != 'SYNC') {
			buttonHeaderRightPanel.add(buttonMessage);
		}
		buttonHeaderRightPanel.add(buttonNext);
		/*
		backButton.btnType = 'BACK';
		buttonSearch.btnType = 'SEARCH';
		buttonSave.btnType = 'SAVE';
		buttonPreview.btnType = 'PREVIEW';
		buttonPrint.btnType = 'PRINT';
		buttonSync.btnType = 'SYNC';
		buttonReject.btnType = 'REJECT';
		buttonApprove.btnType = 'APPROVE';
		buttonMessage.btnType = 'MESSAGE';
		buttonNext.btnType = 'NEXT';
		*/
		buttonHeader.addEventListener('touchstart', function (e) {
			if (e.source.btnType != null && e.source.btnType != undefined && e.source.btnType != '') {
				COMMON.touchStart(e);
				if (e.source.btnType == 'BACK') {
					ArrayOperations.prototype.buttonTouchEnd();
				} else if (e.source.btnType == 'SEARCH') {
					searchButtonTouchEnd();
				} else if (e.source.btnType == 'SAVE') {
					ArrayOperations.prototype.saveButtonTouchEnd();
				} else if (e.source.btnType == 'PREVIEW') {
					ArrayOperations.prototype.previewButtonTouchEnd();
				} else if (e.source.btnType == 'PRINT') {
					ArrayOperations.prototype.printButtonTouchEnd();
				} else if (e.source.btnType == 'SYNC') {
					ArrayOperations.prototype.syncButtonTouchEnd();
				} else if (e.source.btnType == 'REJECT') {
					rejectButtonTouchEnd();
				} else if (e.source.btnType == 'APPROVE') {
					approveButtonTouchEnd();
				} else if (e.source.btnType == 'MESSAGE') {
					messageButtonTouchEnd();
				} else if (e.source.btnType == 'NEXT') {
					ArrayOperations.prototype.nextButtonTouchEnd();
				}
				COMMON.removeOpacity(e.source);
			}
		});
		/*		
		//COMMON.Log('loadHeaderButtons Start 9 : ' + new Date().getTime());		
				if(bIsAndroid){
					backButton.addEventListener('touchstart', function(){
						COMMON.touchStart();
						ArrayOperations.prototype.buttonTouchEnd();
					});
		//if(Ti.App.currentScreenName != 'MDT'){
					buttonSearch.addEventListener('touchstart', function(){
						COMMON.touchStart();
						searchButtonTouchEnd();
					});
					buttonSave.addEventListener('touchstart', function(){
						COMMON.touchStart();
						ArrayOperations.prototype.saveButtonTouchEnd();
					});
		/******** no need for Warburg **** / 
					buttonPrint.addEventListener('touchstart', function(){
						COMMON.touchStart();
						ArrayOperations.prototype.printButtonTouchEnd();
					});
		/******************************** /
					buttonPreview.addEventListener('touchstart', function(){
						COMMON.touchStart();
						ArrayOperations.prototype.previewButtonTouchEnd();
					});
		//}else{
					buttonSync.addEventListener('touchstart', function(){
						COMMON.touchStart();
						ArrayOperations.prototype.syncButtonTouchEnd();
					});
		//}			
					buttonNext.addEventListener('touchstart', function(){
						COMMON.touchStart();
						ArrayOperations.prototype.nextButtonTouchEnd();
					});
				}else{
					backButton.addEventListener('singletap', function(){
						COMMON.touchStart();
						ArrayOperations.prototype.buttonTouchEnd();
					});
		//if(Ti.App.currentScreenName != 'MDT'){		
					buttonSearch.addEventListener('singletap', function(){
						COMMON.touchStart();
						ArrayOperations.prototype.searchButtonTouchEnd();
					});
					
					buttonSave.addEventListener('singletap', function(){
						COMMON.touchStart();
						ArrayOperations.prototype.saveButtonTouchEnd();
					});
				
					buttonPrint.addEventListener('singletap', function(){
						COMMON.touchStart();
						ArrayOperations.prototype.printButtonTouchEnd();
					});
				
					buttonPreview.addEventListener('singletap', function(){
						COMMON.touchStart();
						ArrayOperations.prototype.previewButtonTouchEnd();
					});
		//}else{		
					buttonSync.addEventListener('singletap', function(){
						COMMON.touchStart();
						ArrayOperations.prototype.syncButtonTouchEnd();
					});
		//}			
					buttonNext.addEventListener('singletap', function(){
						COMMON.touchStart();
						ArrayOperations.prototype.nextButtonTouchEnd();
					});
				}
		//COMMON.Log('loadHeaderButtons Start 10 : ' + new Date().getTime());		
		* /		
				function searchButtonTouchEnd(e) {
					try {
						COMMON.removeOpacity(this);
						if (COMMON.avoidMultipleClick()) {
							return;
						}
						if(Ti.App.bFocusedTxtfield != null && Ti.App.bFocusedTxtfield != undefined){
							Ti.App.bFocusedTxtfield.blur();
							Ti.App.bFocusedTxtfield = null;
							return;
						}
						buttonSearch.isActive = !buttonSearch.isActive;
						mView.showSearch(buttonSearch.isActive);
						try {
							if (!mController.initSearchButtonClick()) {
								return;
							}
						} catch(e) {}
						try {
							mController.searchButtonClick();
						} catch(e) {}
						try {
							mController.finalizeSearchButtonClick();
						} catch(e) {}
					} catch(e) {}
				}
		//COMMON.Log('loadHeaderButtons Start 11 : ' + new Date().getTime());		
		/********************************/
		//COMMON.Log('loadHeaderButtons END 2 : ' + new Date().getTime());
		return buttonHeader;
	},
	loadFooterButtons: function (screenName) {
		var buttonFooter = TableViewBasicUIObj.createBasicView(null, 'transparent', Ti.App.CONFIG.get('FOOTER_HEIGHT'), Ti.UI.FILL, 0, 0, 0, 0, 'horizontal');
		buttonFooter.zIndex = 1;
		commonObj.leftGap = 4;//0;
		//setTimeout(function() {
		////COMMON.Log('2829 screenName '+screenName);
		var bHideHomeBtn = COMMON.CheckBooleanField(Ti.App.ARRAYOPERATION.getSystemValue('HideHomeBtn'));
		if (screenName != 'Application' && screenName != 'AddItem' && screenName != 'Item List' && bHideHomeBtn != true) {// && screenName != 'Dashboard' && screenName != 'MainDashboard'){	
			var sHomeButton = TableViewBasicUIObj.createBasicView(null, 'transparent', iIconHeight, iIconWidth, 0, 0, null, null, null);
			sHomeButton.left = commonObj.leftGap;
			sHomeButton.backgroundImage = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'Home.png');//'/images/Home.simg';
			sHomeButton.visible = true;
			sHomeButton.touchEnabled = true;
			buttonFooter.add(sHomeButton);
			sHomeButton.addEventListener('touchstart', function (e) {//);	
				try {
					COMMON.touchStart();
					//COMMON.Log('homeButtonTouchEnd1');
					var alertDialog = Titanium.UI.createAlertDialog({
						title: Ti.App.sAppName,//'Simplr Sales',
						message: "Do you want to proceed to home screen?",
						buttonNames: ['Yes', 'No'],
						//_controller : mView
					});
					alertDialog.addEventListener('click', function (e) {
						if (e.index == 0) {
							Ti.App.bSalesCompleted = false;
							COMMON.showIndicator('Performing Search Please Wait...');
							Ti.App.bHomeButtonPressed = true;
							var arr = Ti.App.winsStack;
							var length = (parseInt(Ti.App.winsStack.length));
							if (length > 0) {
								var dScreenIndex = 1;
								/******************************/
								var bOpenMainDashboard = systemTableConfig['bOpenMainDashboard'];
								if (bOpenMainDashboard == null || bOpenMainDashboard == undefined || bOpenMainDashboard == '') {
									bOpenMainDashboard = true;
								} else {
									bOpenMainDashboard = COMMON.CheckBooleanField(bOpenMainDashboard);
								}
								//COMMON.Log('bOpenMainDashboard --> ' + bOpenMainDashboard);
								if (bOpenMainDashboard == true) {
									dScreenIndex = 2;
								}
								for (var ctr = 0; ctr < length; ctr++) {
									var lastWin = arr[ctr];
									//COMMON.Log(ctr + '. ScreenName ----> ' + lastWin.screenName);
									if (Ti.App.currentScreenName == 'WorkFlow' && lastWin.screenName == 'WorkFlow') {
										Ti.App.dWorkFlow = false;
										dScreenIndex = 2;//ctr;
										ctr = length;
									} else if (Ti.App.sWorkFlowID != '' && lastWin.screenName == 'WorkFlow') {
										dScreenIndex = ctr + 1;
										ctr = length;
									}
								}
								/******************************/
								//COMMON.Log('dScreenIndex -> ' + dScreenIndex);
								for (var ctr = dScreenIndex; ctr < length; ctr++) {
									//COMMON.Log('winsStack.length1 ----> ' + parseInt(Ti.App.winsStack.length));
									if (dScreenIndex == 1) {
										var lastWin = arr[1];
										arr.splice(1, 1);
									} else {
										var lastWin = arr[dScreenIndex];
										arr.splice(dScreenIndex, 1);
									}
									//COMMON.Log('lastWin ScreenName ----> ' + lastWin.screenName);
									Ti.App.winsStack = arr;
									lastWin.close();
									//COMMON.Log('winsStack.length2 ----> ' + parseInt(Ti.App.winsStack.length));
								}
								if (Ti.App.CustNo == '') {
									commonObj.db = Ti.App.dbConn;//commonObj.dbConnectionObj.createDataBaseConnection();
									commonObj.db.execute("Update SystemList  Set SystemValue = '' WHERE Code in ('SelectedScreenType', 'SelectedCustNo')");
									commonObj.db.execute('DELETE FROM TempOrderDet');
									commonObj.db.execute('DELETE FROM TempOrder');
									//commonObj.db.close();
									if (Ti.App.winsStack.length <= 2) {
										Ti.App.CustNo = '';
										Ti.App.CustName = '';
										Titanium.App.Properties.setList('CUST_FIELDS', []);
									}
								}
							};
							Ti.App.bEnableAndroidBackButton = true;
							Ti.App.dashBoardItemClicked = false;
							Ti.App.bHomeButtonPressed = false;
							COMMON.hideIndicator();
						}
					});
					COMMON.removeOpacity(this);
					alertDialog.show();
				} catch (e) { }
				//}
			});

			if (screenName == 'Dashboard') {

				showIndicatorIcons = this.getSystemValue('showIndicatorIcons');
				showIndicatorIcons = (showIndicatorIcons == '' || showIndicatorIcons == null || showIndicatorIcons == undefined) ? false : true;

				if (showIndicatorIcons == true) {

					var sGPSButton = TableViewBasicUIObj.createBasicView(null, 'transparent', iIconHeight - 20, iIconWidth - 20, 0, 0, null, null, null);
					sGPSButton.left = commonObj.leftGap;
					sGPSButton.backgroundImage = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'locationon.png');//'/images/Home.simg';
					sGPSButton.visible = true;
					sGPSButton.touchEnabled = true;
					buttonFooter.add(sGPSButton);

					sGPSButton.addEventListener('touchstart', function (e) {
						Ti.Geolocation.purpose = "Receive User Location";
						Titanium.Geolocation.getCurrentPosition(function (e) {

							if (!e.success || e.error) {
								alert('Could not find the device location');
								return;
							}
							var longitude = e.coords.longitude;
							var latitude = e.coords.latitude;

							alert("latitude: " + latitude + "longitude: " + longitude);

						});
					});

					var sNetworkButton = TableViewBasicUIObj.createBasicView(null, 'transparent', iIconHeight - 20, iIconWidth - 20, 0, 0, null, null, null);
					//sNetworkButton.left = '100%';
					sNetworkButton.left = commonObj.leftGap;
					sNetworkButton.backgroundImage = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'networkon.png');//'/images/Home.simg';
					sNetworkButton.visible = true;
					sNetworkButton.touchEnabled = true;
					buttonFooter.add(sNetworkButton);

					sNetworkButton.addEventListener('touchstart', function (e) {

						try {
							if (Titanium.Network.networkType == Titanium.Network.NETWORK_NONE) {
								Ti.App.eventTriggered = false;
								Ti.App.dashBoardItemClicked = false;
								Ti.App.bEnableAndroidBackButton = true;
								Ti.App.isDashboardScreen = false;
								COMMON.showAlert("Please check your network connection.", ["OK"], null);
								return;
							}
							DETAILS.set('SYNC_SCREEN', 'APICALL');
							COMMON.showIndicator('Loading Please Wait...');
							var xhr1 = Ti.Network.createHTTPClient({
								onload: function (e) {
									//COMMON.Log('this.responseText ---> ' + this.responseText);
									COMMON.hideIndicator();
									DETAILS.set('SYNC_SCREEN', '');
									Ti.App.eventTriggered = false;
									Ti.App.dashBoardItemClicked = false;
									Ti.App.bEnableAndroidBackButton = true;
									Ti.App.isDashboardScreen = false;
									COMMON.showAlert("Connection Successful.", ["OK"], null);
								},
								onerror: function (e) {
									//COMMON.Log('this.responseText ---> ERROR');
									COMMON.hideIndicator();
									DETAILS.set('SYNC_SCREEN', '');
									Ti.App.eventTriggered = false;
									Ti.App.dashBoardItemClicked = false;
									Ti.App.bEnableAndroidBackButton = true;
									Ti.App.isDashboardScreen = false;
									//COMMON.showAlert("Please check your network connection.", ["OK"], null);
									COMMON.showAlert("Connection Failed.", ["OK"], null);
								},
								timeout: 20000//120000
							});
							var callParams = '<?xml version="1.0" encoding="utf-8"?>'
								+ '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'
								+ '<soap:Body>'
								+ '<CheckConnection xmlns="http://tempuri.org/" />'
								+ '</soap:Body>'
								+ '</soap:Envelope>';

							//COMMON.Log('callParams ---> ' + callParams);
							//COMMON.Log('URL : ' + Ti.App.URL_DBSYNCSERVICE);//Ti.App.URL_POSTWEBSERVICE);
							xhr1.open('POST', Ti.App.URL_DBSYNCSERVICE + "?op=CheckConnection");
							xhr1.setRequestHeader('Content-Type', 'text/xml');
							xhr1.setRequestHeader('Cache-Control', 'no-cache');
							xhr1.setRequestHeader('Cache-Control', 'no-store');
							xhr1.setRequestHeader('SOAPAction', 'http://tempuri.org/CheckConnection');
							xhr1.send(callParams);
							return '';
						} catch (e) {
							DETAILS.set('SYNC_SCREEN', '');
							Ti.App.eventTriggered = false;
							Ti.App.dashBoardItemClicked = false;
							Ti.App.bEnableAndroidBackButton = true;
							Ti.App.isDashboardScreen = false;
						}

					});

					var sBatteryButton = TableViewBasicUIObj.createBasicView(null, 'transparent', iIconHeight - 20, iIconWidth - 20, 0, 0, null, null, null);
					sBatteryButton.left = commonObj.leftGap;
					sBatteryButton.backgroundImage = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'batteryon.png');//'/images/Home.simg';
					sBatteryButton.visible = true;
					sBatteryButton.touchEnabled = true;
					buttonFooter.add(sBatteryButton);

					checkstatus();

					function checkstatus() {
						Titanium.Platform.addEventListener('battery', function (e) {
							if (e.level >= '20' || e.level >= 20) {
								sBatteryButton.backgroundImage = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'batteryon.png');//'/images/Home.simg';
							}
							else {
								sBatteryButton.backgroundImage = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'batteryoff.png');//'/images/Home.simg';
							}
						});


						if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
							sNetworkButton.backgroundImage = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'networkoff.png');//'/images/Home.simg';
						}
						else {
							sNetworkButton.backgroundImage = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'networkon.png');//'/images/Home.simg';
						}


						if (Ti.Geolocation.locationServicesEnabled) {
							sGPSButton.backgroundImage = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'locationon.png');//'/images/Home.simg';
						} else {
							sGPSButton.backgroundImage = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'locationoff.png');//'/images/Home.simg';
						}


					}

					setInterval(function () { checkstatus(); }, 10000);

				}
			}

		}
		if(Ti.App.ViewCheck == false){
		
		//commonObj.db = commonObj.dbConnectionObj.createDataBaseConnection();
		var loadpopup = false;
		commonObj.dbDataRows = Ti.App.configDBConn.execute('SELECT * FROM MenuConfig WHERE Visible = 1 and IsIcon <> 1 and Popup <> 1 and [Language] = ' + Ti.App.SQL.safeSQL(Ti.App.sLanguage) + ' and ScreenName = ' + Ti.App.SQL.safeSQL(screenName) + ' and AccessLevel = ' + Ti.App.SQL.safeSQL(Ti.App.accessLevel) + ' order by ScreenName, DisplayNo');
		if (commonObj.dbDataRows.isValidRow()) {
			ArrayOperations.prototype.setMenuConfigByScreenName(Ti.App.sLanguage, screenName);
			loadpopup = true;
			commonObj.menuItems = ArrayOperations.prototype.loadMenuConfig(screenName);
			if (commonObj.menuItems != undefined && commonObj.menuItems != null) {
				if (commonObj.menuItems.length > 0) {
					//var buttonMenu = commonObj.BasicButtonObj.createButton('', iIconWidth, iIconHeight, null, '#e8e8e8');
					var buttonMenu = TableViewBasicUIObj.createBasicView(null, 'transparent', iIconHeight, iIconWidth, 0, 0, null, null, null);
					buttonMenu.left = commonObj.leftGap;
					buttonMenu.backgroundImage = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'm.png');
					buttonMenu.visible = true;
					buttonMenu.touchEnabled = true;
					buttonMenu.menuItems = commonObj.menuItems;
					buttonFooter.add(buttonMenu);
					buttonMenu.addEventListener('touchstart', function (e) {
						//function menuButtonTouchEnd(e) {
						try {
							/* //FooterMenu option by ScreenName
							if(Ti.App.OrderType == 'EX'){
								commonObj.menuItems = ArrayOperations.prototype.loadMenuConfig("Sales Exchange Items");
							}else if(Ti.App.OrderType == 'RTN'){
								commonObj.menuItems = ArrayOperations.prototype.loadMenuConfig("Sales Return Items");
							}else if(Ti.App.OrderType == 'FOC'){
								commonObj.menuItems = ArrayOperations.prototype.loadMenuConfig("Sales FOC Items");
							}else{
								commonObj.menuItems = ArrayOperations.prototype.loadMenuConfig(screenName);
							}*/

							//if (COMMON.avoidMultipleClick()) {
							//COMMON.removeOpacity(this);
							//return;
							//}
							try {
								//var sMenuTitle = this.getSystemValue('MenuTitle');//MENUTITLE/POPUPMEN
								var sMenuTitle = systemTableConfig['MENUTITLE'];
								sMenuTitle = (sMenuTitle == '' || sMenuTitle == null || sMenuTitle == undefined) ? 'Menu' : sMenuTitle;
								//commonObj.MenuObj.show(sMenuTitle, mController, commonObj.menuItems, this);
								commonObj.MenuObj.show(sMenuTitle, mController, e.source.menuItems, this);
							} catch (e) {
								//commonObj.MenuObj.show('Menu', mController, commonObj.menuItems, this);
								commonObj.MenuObj.show('Menu', mController, e.source.menuItems, this);
							}
							//COMMON.removeOpacity(this);
						} catch (e) { }
						//}
					});
				}
			}
			//commonObj.menuItems = null;
			//delete commonObj.menuItems;
		}
		commonObj.dbDataRows.close();
		commonObj.dbDataRows = null;

		if (loadpopup == false) {
			commonObj.dbDataRows = Ti.App.configDBConn.execute('SELECT * FROM MenuConfig WHERE Visible = 1 and IsIcon <> 1 and Popup = 1 and [Language] = ' + Ti.App.SQL.safeSQL(Ti.App.sLanguage) + ' and ScreenName = ' + Ti.App.SQL.safeSQL(screenName) + ' and AccessLevel = ' + Ti.App.SQL.safeSQL(Ti.App.accessLevel) + ' order by ScreenName, DisplayNo');
			if (commonObj.dbDataRows.isValidRow()) {
				ArrayOperations.prototype.setMenuConfigByScreenName(Ti.App.sLanguage, screenName);
			}
			commonObj.dbDataRows.close();
			commonObj.dbDataRows = null;
		}

		//COMMON.Log('SELECT * FROM MenuConfig WHERE Visible = 1 and IsIcon = 1 and Popup <> 1 and [Language] = ' + Ti.App.SQL.safeSQL(Ti.App.sLanguage) + ' and ScreenName = ' + Ti.App.SQL.safeSQL(screenName) + ' and AccessLevel = ' + Ti.App.SQL.safeSQL(Ti.App.accessLevel) + ' order by ScreenName, DisplayNo');
		commonObj.dbDataRows = Ti.App.configDBConn.execute('SELECT * FROM MenuConfig WHERE Visible = 1 and IsIcon = 1 and Popup <> 1 and [Language] = ' + Ti.App.SQL.safeSQL(Ti.App.sLanguage) + ' and ScreenName = ' + Ti.App.SQL.safeSQL(screenName) + ' and AccessLevel = ' + Ti.App.SQL.safeSQL(Ti.App.accessLevel) + ' order by ScreenName, DisplayNo');
		if (commonObj.dbDataRows.isValidRow()) {
			//buttonMenu.backgroundImage = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'm.png');
			//MenuConfig_FooterIcon_
			commonObj.menuIconList = ArrayOperations.prototype.loadMenuFooterIconConfig(screenName);
			if (commonObj.menuIconList != null && commonObj.menuIconList != undefined && commonObj.menuIconList != '') {
				if (commonObj.menuIconList.length > 0) {
					for (var i = 0; i < commonObj.menuIconList.length; i++) {
						//COMMON.Log(commonObj.menuIconList[i].accessLevel + ' == ' + Ti.App.accessLevel);
						if (commonObj.menuIconList[i].accessLevel == Ti.App.accessLevel) {
							var buttonSales = TableViewBasicUIObj.createBasicView(null, 'transparent', iIconHeight, iIconWidth, 0, 0, null, null, null);
							buttonSales.left = commonObj.leftGap;
							buttonSales.menuCode = commonObj.menuIconList[i].menuCode;
							buttonSales.btnScreenName = commonObj.menuIconList[i].screenName;
							buttonSales.backgroundImage = Ti.App.ImageCacheObj.getImage('MobileSalesCache', commonObj.menuIconList[i].sIconImg);//'/images/'+commonObj.menuIconList[i].sIconImg;
							buttonSales.pageIndex = i;
							//buttonSales.addEventListener('touchstart', COMMON.touchStart);
							//buttonSales.addEventListener('click', footerMenuButtonTouchEnd);
							buttonSales.addEventListener('touchstart', footerMenuButtonTouchEnd);
							/*
							var topButton = commonObj.BasicButtonObj.createButton('199', 30, 24, 16, '#fff');
				            topButton.backgroundImage = null;
				            topButton.fontWeight = 'bold';
				            topButton.backgroundColor = '#f00';
				            topButton.borderRadius = 11;
				            topButton.borderColor = '#fff';
				            topButton.borderWidth = 2;
				            topButton.left = parseInt(iIconWidth) - 5;
				            topButton.top = 0;
							buttonSales.add(topButton);
							*/
							buttonFooter.add(buttonSales);
						}
					}
					function footerMenuButtonTouchEnd(e) {
						try {
							COMMON.touchStart();
							if (COMMON.avoidMultipleClick()) {
								COMMON.removeOpacity(this);
								return;
							}
							mController.menuItemClicked(-1, e.source.pageIndex, e.source.btnScreenName, e.source.menuCode);
							COMMON.removeOpacity(this);
						} catch (e) { }
						//controller.menuItemClicked(-1, e.index, commonObj.menuItems[e.index].displayText, commonObj.menuItems[e.index].menuCode);
					}
				}
				//commonObj.menuIconList = null;
				//delete commonObj.menuIconList;
			}
		}
		commonObj.dbDataRows.close();
		//commonObj.db.close();
		commonObj.dbDataRows = null;

		}else{
			Ti.App.ViewCheck = false;
		}

		//commonObj.db = null;
		if (Ti.version < '7.5.0') {
			//delete commonObj.dbDataRows;//17122018 SDK 7.5.0
			//delete commonObj.db;//7.5.0
		}
		//}, 100);
		commonObj.leftGap = null;
		if (Ti.version < '7.5.0') {
			//delete commonObj.leftGap;//17122018 SDK 7.5.0
		}
		return buttonFooter;
	},
	setFormConfigFieldNames: function (screenName) {
		formFieldNames = []; formDataMember = [];
		commonObj.data = this.getFormConfigByScreenName(screenName);
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
		if (Ti.version < '7.5.0') {
			//delete commonObj.length; //delete commonObj.data;//17122018 SDK 7.5.0
		}
	},
	loadTabGroup: function (screenName) {
		var queryName = '';
		try {
			queryName = mController.preloadQuery(screenName);
		} catch (e) {
		}
		var data = this.getFormConfigByScreenName(screenName);
		if (data == undefined && data == null) {
			return;
		}
		var length = data.length;
		var parent = TableViewBasicUIObj.createBasicView(null, 'transparent', '100%', '100%', null, null, null, null, 'vertical');
	},
	loadFormConfig: function (screenName, formValues) {
		
		screenName = (screenName == null || screenName == undefined || screenName == '' || screenName == 'null' || screenName == 'undefined') ? '' : screenName;
		//COMMON.Log('loadFormConfig START -> ' + new Date().getTime());		
		formFieldNames = [];
		formDataMember = [];
		var queryName = '';
		try {
			queryName = mController.preloadQuery(screenName);
		} catch (e) { }
		tmpScreennameforMultiline = screenName;
		var data = this.getFormConfigByScreenName(screenName);
		if (data == undefined && data == null) {
			return;
		}
		_DBformValues = formValues;
		length = data.length;
		var parent = TableViewBasicUIObj.createBasicView(null, 'transparent', Ti.UI.SIZE, '100%', null, null, 0, 0, 'absolute');
		if(screenName == ''){
			return parent;
		}
		parent.arrListViewFieldName = [];
		totalHeaderHeight = 0; totalChildViewWidth = 0;
		formDataArray = new Array();
		dDisplayNo = "";
		bMultiLine = false;
		formdata = {};
		str = ''; _dWidgetHeight = 0; height = 0; headerTop = 0; valueTop = 0;
		_lblTotalWidth = 0;
		for (var abc = 0; abc < length; abc++) {
			//COMMON.Log('abc ---> ' + abc);
			formdata = {};
			formdata = data[abc];
			if (formdata.FieldControl != 'MULTILINE') {
				formFieldNames.push(formdata.fieldName.toUpperCase());
				formDataMember.push(formdata.DataMember.toUpperCase());
			}
			/******** //FORMUI -
				var res = 4;
			    var DisplayNo =[1, 2, 3, 4.1,4.2,4.3, 5.1,5.2,5.3];
			    //formFieldNames[0, 1, 2, 3         , 4] 
			    for(var i = 0; i< DisplayNo.length; i++){
			        var str = new String(DisplayNo[i]);
			        alert(i+'. '+ str.indexOf(res+'.'));
			    }
		   	*/
			dDisplayNo = formdata.DisplayNo;
			str = new String(dDisplayNo);
			if (str.indexOf(".") > -1) {
				var arr = str.split(".");
				dDisplayNo = arr[0] + ".";
			} else {
				dDisplayNo = "";
			}
			/*********/
			_dWidgetHeight = 0; height = 0; headerTop = 0; valueTop = 0;
			if (formdata.FieldControl == 'WIDGET' || formdata.FieldControl == 'EXPANDABLELISTVIEW' || formdata.FieldControl == 'GRIDLIST') {
				formdata.headerHeight = (formdata.headerHeight == null || formdata.headerHeight == undefined || formdata.headerHeight == '') ? 0 : formdata.headerHeight;
				formdata.ValueHeight = (formdata.ValueHeight == null || formdata.ValueHeight == undefined || formdata.ValueHeight == '') ? 0 : formdata.ValueHeight;
				_dWidgetHeight = (formdata.headerHeight + formdata.ValueHeight);
				totalHeaderHeight += _dWidgetHeight;// + 10;
			} else {
				if (!bIsAndroid) {
					if (formdata.headerHeight < formdata.ValueHeight) {
						totalHeaderHeight += formdata.ValueHeight + 2;
					} else {
						totalHeaderHeight += formdata.headerHeight + 2;
					}
				}else{
					if (formdata.headerHeight < formdata.ValueHeight) {
						totalHeaderHeight += formdata.ValueHeight + 5;
					} else {
						totalHeaderHeight += formdata.headerHeight + 5;
					}
				}
				if (formdata.FieldControl == 'COMBOGROUP') {//COMBOGROUP
					totalHeaderHeight += formdata.headerHeight + 5;
				} else if (formdata.FieldControl == 'TAB') {//COMBOGROUP
					totalHeaderHeight += formdata.ValueHeight + 5;
				}
			}
			if (formdata.headerHeight > formdata.ValueHeight) {
				height = formdata.headerHeight;
				headerTop = 0;
				valueTop = (formdata.headerHeight - formdata.ValueHeight) / 2;
			} else {
				height = formdata.ValueHeight;
				headerTop = (formdata.ValueHeight - formdata.headerHeight) / 2;
				valueTop = 0;
			}
			if (formdata.FieldControl == 'COMBOGROUP') {//COMBOGROUP
				height = height * 2;
			} else if (formdata.FieldControl == 'TAB') {//COMBOGROUP
				height += formdata.ValueHeight;
			}
			if (formdata.FieldControl == 'WIDGET') {
				var view = TableViewBasicUIObj.createBasicView(null, 'transparent', _dWidgetHeight, formdata.ValueWidth, null, null, null, null, 'vertical');
				view.sRowHeight = _dWidgetHeight;
				view.sRowHeight = height;
				view.dWidth = _dWidgetHeight;
				view.top = totalHeaderHeight - _dWidgetHeight;//5;
				view.bottom = 5;
				formdata.HFontStyle = (formdata.HFontStyle == 1) ? 'bold' : formdata.HFontStyle;
				var label = commonObj.BasicLabelObj.createLabel(formdata.newText, formdata.ValueWidth, formdata.headerHeight, formdata.HFontSize, formdata.HFont, formdata.HFontStyle, this.argbToRGB(formdata.HForeColor), this.argbToRGB(formdata.HBackColor), 0, formdata.HAlignment);
				label.backgroundColor = 'transparent';
				view.add(label);
				var WidgetContentView = TableViewBasicUIObj.createBasicView(null, 'transparent', formdata.ValueHeight, formdata.ValueWidth, null, null, null, null, 'vertical');
				try {
					var WidgetContentViewData = mController.getWidgetContentView(formdata.fieldName);
					WidgetContentView.add(WidgetContentViewData);
				} catch (e) { }
				Ti.App.WidgetContentView = WidgetContentView;
				view.add(WidgetContentView);
			}else if (formdata.FieldControl == 'GRIDLIST') {
				
				var GridCols = (formdata.DefaultValue != '') ? formdata.DefaultValue : 2;
				var GridColsWidth = Math.floor(99/GridCols);  
				var view = TableViewBasicUIObj.createBasicView(null, 'transparent', _dWidgetHeight, formdata.ValueWidth, null, null, null, null, 'vertical');
				view.sRowHeight = _dWidgetHeight;
				view.sRowHeight = height;
				view.dWidth = _dWidgetHeight;
				view.top = totalHeaderHeight - _dWidgetHeight;//5;
				view.bottom = 5;
				formdata.HFontStyle = (formdata.HFontStyle == 1) ? 'bold' : formdata.HFontStyle;
				var label = commonObj.BasicLabelObj.createLabel(formdata.newText, formdata.ValueWidth, formdata.headerHeight, formdata.HFontSize, formdata.HFont, formdata.HFontStyle, this.argbToRGB(formdata.HForeColor), this.argbToRGB(formdata.HBackColor), 0, formdata.HAlignment);
				label.backgroundColor = 'transparent';
				view.add(label);
				
				var GridListContentView = TableViewBasicUIObj.createBasicView(null, 'transparent', formdata.ValueHeight, formdata.ValueWidth, null, null, null, null, 'vertical');
				try{
					
					var GridListContentHeader = TableViewBasicUIObj.createBasicView(null, 'transparent', 70, formdata.ValueWidth, null, null, null, null, 'horizontal');
					//GridListContentHeader.top = 10;
					GridListContentHeader.height = 0;
					//var Gridlabel = commonObj.BasicLabelObj.createLabel(' GRID ', formdata.ValueWidth, formdata.headerHeight, formdata.HFontSize, formdata.HFont, formdata.HFontStyle, this.argbToRGB(formdata.HForeColor), this.argbToRGB(formdata.HBackColor), 0, formdata.HAlignment);
					var Gridlabel = commonObj.BasicLabelObj.createLabel(' GRID ', '49%', 60, formdata.HFontSize, formdata.HFont, formdata.HFontStyle, this.argbToRGB(formdata.HForeColor), this.argbToRGB(formdata.HBackColor), 0, formdata.HAlignment);
					Gridlabel.backgroundColor = 'transparent';//'#ff00ff';//'transparent';
					Gridlabel.borderWidth = 3;
					Gridlabel.borderColor = '#e8e8e8';
					Gridlabel.borderRadius = 6;
					Gridlabel.GridColsWidth = GridColsWidth+'%';
					Gridlabel.color = '#e8e8e8';
					Gridlabel.screenName = screenName;
					Gridlabel.fieldName = formdata.fieldName;
					GridListContentHeader.add(Gridlabel);
					
					var Listlabel = commonObj.BasicLabelObj.createLabel(' LIST ', '49%', 60, formdata.HFontSize, formdata.HFont, formdata.HFontStyle, this.argbToRGB(formdata.HForeColor), this.argbToRGB(formdata.HBackColor), 0, formdata.HAlignment);
					Listlabel.left = '2%';
					Listlabel.backgroundColor = 'transparent';//'#00ffff';//'transparent';
					Listlabel.borderWidth = 3;
					Listlabel.borderColor = '#e8e8e8';
					Listlabel.borderRadius = 6;
					Listlabel.GridColsWidth = '100%';
					Listlabel.color = '#e8e8e8';
					Listlabel.screenName = screenName;
					Listlabel.fieldName = formdata.fieldName;
					GridListContentHeader.add(Listlabel);
					GridListContentView.add(GridListContentHeader);
					
					
					var GridListCont = Ti.UI.createScrollView({//createScrollableView({
						contentWidth : 'auto',
						contentHeight : 'auto',
						width : '100%',//Ti.UI.FILL,
						height : 'auto',//Ti.UI.SIZE,
						top : 0,
						bottom : 0,
						showVerticalScrollIndicator : true,
						showHorizontalScrollIndicator : true,
						scrollType : 'vertical',
						//layout : 'horizontal',
						backgroundColor : "transparent",
					});
					GridListCont.screenName = screenName;
					GridListCont.fieldName = formdata.fieldName;
					//var GridListCont = TableViewBasicUIObj.createBasicView(null, 'transparent', Ti.UI.SIZE, '100%', null, null, null, null, 'vertical');
					var tmpView1 = TableViewBasicUIObj.createBasicView(null, 'transparent', Ti.UI.SIZE, '100%', null, null, null, null, 'horizontal');
					tmpView1.screenName = screenName;
					tmpView1.fieldName = formdata.fieldName;
					tmpView1.top = 0;
					
					//COMMON.Log(screenName+"_FORM_GRIDLIST_"+formdata.fieldName);
					//SalesForm_FORM_GRIDLIST_gridlist
					var _tblHeader = ArrayOperations.prototype.loadListConfig(screenName+"_FORM_GRIDLIST_"+formdata.fieldName);
					//view.add(_tblHeader);
					var dGridListIndex = 0;
					commonObj.query =  ArrayOperations.prototype.getQueryConfigByScreenNameWithOrderText(screenName+"_FORM_GRIDLIST_"+formdata.fieldName);
					setTimeout(function() {
					if(commonObj.query != null && commonObj.query != undefined && commonObj.query != '') {
						//COMMON.Log('LoadData Execute Start Time : ' + new Date().getTime());
						commonObj.dbDataRows = Ti.App.dbConn.execute(commonObj.query);
						//COMMON.Log('LoadData Execute End Time : ' + new Date().getTime());
						var GridListRow = '';
						arrFieldControlObj = [];
						bEnabledarrFieldCtrlObj = false;
						while (commonObj.dbDataRows.isValidRow()) {
							GridListRow = ArrayOperations.prototype.createUI(screenName+"_FORM_GRIDLIST_"+formdata.fieldName, dGridListIndex, commonObj.dbDataRows);
							//GridListRow.children[0].index = dGridListIndex;
							//GridListRow.children[0].iRowIndex = dGridListIndex;
							if(GridListRow.backgroundColor != 'transparent'){
								GridListRow.children[0].backgroundColor = GridListRow.backgroundColor;
							}
							GridListRow.children[0].addEventListener("click", function(e) {
								//Ti.App.currentWin.currentRow = null;
								//Ti.App.currentWin.activatedWindow = true;
								//Ti.App.currentWin.lastSelectedRow = null;
								//Ti.App.currentRow = null;
								//mView.openWindow('SalesFormItemDetails', {});
								/*var params = {};
								var object = require('/Screens/SalesFormItemDetails/Controller');
								var sob = new object('SalesFormItemDetails', params);*/
								
								try{
									if(mController != null && mController != undefined){
										//e.row.screenName+"_FORM_EXPLISTVIEW_HEADER_"+e.row.fieldName+"_Sub"+e.row.HeaderIndex+"_Sub"+e.row.ChildIndex
										mController.GridRowClicked(this, this.index);
									}
								}catch(e){}
								
								
							});
							
							//GridListRow.children[0].removeEventListener('longclick', function(e){
							//	alert('22');
							//});
							
							tmpView1.add(GridListRow.children[0]);
							dGridListIndex++;
							bEnabledarrFieldCtrlObj = true;
							commonObj.dbDataRows.next();
						}
						commonObj.dbDataRows.close();
						bEnabledarrFieldCtrlObj = false;
					}
					},100);
					
					/*var arrColor = ['red', 'blue', 'gray', 'green', 'red', 'blue', 'gray', 'green', 'red', 'blue', 'gray', 'green', 'red', 'blue', 'gray', 'green', 'red', 'blue', 'gray', 'green', 'red', 'blue', 'gray', 'green'];
					for(var _kl = 0; _kl < 20; _kl++){
						//'transparent'
						var view1 = TableViewBasicUIObj.createBasicView(null, arrColor[_kl], 150, '32%', null, null, null, null, 'horizontal');
						//var view1 = TableViewBasicUIObj.createBasicView(null, arrColor[_kl], 150, '100%', null, null, null, null, 'horizontal');
						//view1.left = '1%'
						//view1.top = '1%'
						tmpView1.add(view1);
						//GridListCont.add(view1);
					}*/
					GridListCont.add(tmpView1);
					Gridlabel.addEventListener("click", function(e) {
						Ti.UI.Android.hideSoftKeyboard();
						Ti.App.DETAILS.set('SYNC_SCREEN', 'APICALL');
						Ti.App.indicatorEventTriggered = false;
						COMMON.showIndicator("Please Wait...");
						
						//tmpView1.lauout
						
						//alert('GRID');
						
						GridListCont.remove(tmpView1);
						tmpView1 = TableViewBasicUIObj.createBasicView(null, 'transparent', Ti.UI.SIZE, '100%', null, null, null, null, 'horizontal');
						tmpView1.top = 0;
						//GridListCont.add(tmpView1);
						/*for (var count = tmpView1.children.length-1; count <= 0 ; count--) {
							tmpView1.remove(tmpView1.children[count]);
							//tmpView1.children[count].width = this.GridColsWidth;//'32%'
							//tmpView1.children[count].left = '0.5%'
							//tmpView1.top = 0;
						}*/
						
						var _tblHeader = ArrayOperations.prototype.loadListConfig(e.source.screenName+'_FORM_GRIDLIST_GRID_'+e.source.fieldName);//screenName+"_FORM_GRIDLIST_"+formdata.fieldName);
						//view.add(_tblHeader);
						var dGridListIndex = 0;
						commonObj.query =  ArrayOperations.prototype.getQueryConfigByScreenNameWithOrderText(e.source.screenName+'_FORM_GRIDLIST_'+e.source.fieldName);//screenName+"_FORM_GRIDLIST_"+formdata.fieldName);
						if(commonObj.query != null && commonObj.query != undefined && commonObj.query != '') {
							//COMMON.Log('LoadData Execute Start Time : ' + new Date().getTime());
							commonObj.dbDataRows = Ti.App.dbConn.execute(commonObj.query);
							//COMMON.Log('LoadData Execute End Time : ' + new Date().getTime());
							var GridListRow = '';
							arrFieldControlObj = [];
							bEnabledarrFieldCtrlObj = false;
							while (commonObj.dbDataRows.isValidRow()) {
								//GridListRow = this.createUI(screenName+"_FORM_GRIDLIST_"+formdata.fieldName, dGridListIndex, commonObj.dbDataRows);
								GridListRow = ArrayOperations.prototype.createUI(e.source.screenName+'_FORM_GRIDLIST_GRID_'+e.source.fieldName, dGridListIndex, commonObj.dbDataRows);
								if(GridListRow.backgroundColor != 'transparent'){
									GridListRow.children[0].backgroundColor = GridListRow.backgroundColor;
								}
								GridListRow.children[0].addEventListener("click", function(e) {
									//Ti.App.currentWin.currentRow = null;
									//Ti.App.currentWin.activatedWindow = true;
									//Ti.App.currentWin.lastSelectedRow = null;
									//Ti.App.currentRow = null;
									//mView.openWindow('SalesFormItemDetails', {});
									var params = {};
									var object = require('/Screens/SalesFormItemDetails/Controller');
									var sob = new object('SalesFormItemDetails', params);
								});
								
								GridListRow.children[0].removeEventListener('longclick', function(e){
									
								});
								
								GridListRow.children[0].width = this.GridColsWidth;//'32%'
								GridListRow.children[0].left = '0.5%';
								GridListRow.children[0].top = 2;
								tmpView1.add(GridListRow.children[0]);
								dGridListIndex++;
								//bEnabledarrFieldCtrlObj = true;
								commonObj.dbDataRows.next();
							}
							commonObj.dbDataRows.close();
							bEnabledarrFieldCtrlObj = false;
						}
						GridListCont.add(tmpView1);
						
						/*for (var count = 0; count < tmpView1.children.length; count++) {
							tmpView1.children[count].width = this.GridColsWidth;//'32%'
							tmpView1.children[count].left = '0.5%'
							tmpView1.top = 0;
						}*/
						COMMON.hideIndicator();
						Ti.App.DETAILS.set('SYNC_SCREEN', '');
						
					});
					
					Listlabel.addEventListener("click", function(e) {
						//alert('LIST');
						//GridListCont.
						
						Ti.UI.Android.hideSoftKeyboard();
						Ti.App.DETAILS.set('SYNC_SCREEN', 'APICALL');
						Ti.App.indicatorEventTriggered = false;
						COMMON.showIndicator("Please Wait...");
						
						GridListCont.remove(tmpView1);
						tmpView1 = TableViewBasicUIObj.createBasicView(null, 'transparent', Ti.UI.SIZE, '100%', null, null, null, null, 'horizontal');
						tmpView1.top = 0;
						
						
						var _tblHeader = ArrayOperations.prototype.loadListConfig(e.source.screenName+'_FORM_GRIDLIST_'+e.source.fieldName);//screenName+"_FORM_GRIDLIST_"+formdata.fieldName);
						//view.add(_tblHeader);
						var dGridListIndex = 0;
						commonObj.query =  ArrayOperations.prototype.getQueryConfigByScreenNameWithOrderText(e.source.screenName+'_FORM_GRIDLIST_'+e.source.fieldName);//screenName+"_FORM_GRIDLIST_"+formdata.fieldName);
						if(commonObj.query != null && commonObj.query != undefined && commonObj.query != '') {
							//COMMON.Log('LoadData Execute Start Time : ' + new Date().getTime());
							commonObj.dbDataRows = Ti.App.dbConn.execute(commonObj.query);
							//COMMON.Log('LoadData Execute End Time : ' + new Date().getTime());
							var GridListRow = '';
							arrFieldControlObj = [];
							bEnabledarrFieldCtrlObj = false;
							while (commonObj.dbDataRows.isValidRow()) {
								//GridListRow = this.createUI(screenName+"_FORM_GRIDLIST_"+formdata.fieldName, dGridListIndex, commonObj.dbDataRows);
								GridListRow = ArrayOperations.prototype.createUI(e.source.screenName+'_FORM_GRIDLIST_'+e.source.fieldName, dGridListIndex, commonObj.dbDataRows);
								if(GridListRow.backgroundColor != 'transparent'){
									GridListRow.children[0].backgroundColor = GridListRow.backgroundColor;
								}
								GridListRow.children[0].addEventListener("click", function(e) {
									//Ti.App.currentWin.currentRow = null;
									//Ti.App.currentWin.activatedWindow = true;
									//Ti.App.currentWin.lastSelectedRow = null;
									//Ti.App.currentRow = null;
									//mView.openWindow('SalesFormItemDetails', {});
									var params = {};
									var object = require('/Screens/SalesFormItemDetails/Controller');
									var sob = new object('SalesFormItemDetails', params);
								});
								GridListRow.children[0].removeEventListener('longclick', function(e){
									
								});
								GridListRow.children[0].width = '100%';
								GridListRow.children[0].left = '0%';
								GridListRow.children[0].top = 10;
								tmpView1.add(GridListRow.children[0]);
								
								dGridListIndex++;
								bEnabledarrFieldCtrlObj = true;
								commonObj.dbDataRows.next();
							}
							commonObj.dbDataRows.close();
							bEnabledarrFieldCtrlObj = false;
						}
						
						GridListCont.add(tmpView1);
						/*for (var count = 0; count < tmpView1.children.length; count++) {
							tmpView1.children[count].width = '100%'
							tmpView1.children[count].left = '0%';
							tmpView1.top = 0;
							
						}*/
						COMMON.hideIndicator();
						Ti.App.DETAILS.set('SYNC_SCREEN', '');
					});
					
					GridListContentView.add(GridListCont);
					//var GridListContentViewData = mController.getWidgetContentView(formdata.fieldName);
					//GridListContentView.add(GridListContentViewData);
				}catch(e){}
				Ti.App.GridListContentView = GridListContentView;
				view.add(GridListContentView);
			}else if (formdata.FieldControl == 'EXPANDABLELISTVIEW') {//ExpandedListView
				var view = TableViewBasicUIObj.createBasicView(null, 'transparent', _dWidgetHeight, formdata.ValueWidth, null, null, null, null, 'vertical');
				view.sRowHeight = _dWidgetHeight;
				view.sRowHeight = height;
				view.dWidth = _dWidgetHeight;
				view.top = totalHeaderHeight - _dWidgetHeight;//5;
				view.bottom = 5;
				formdata.HFontStyle = (formdata.HFontStyle == 1) ? 'bold' : formdata.HFontStyle;
				var label = commonObj.BasicLabelObj.createLabel(formdata.newText, formdata.ValueWidth, formdata.headerHeight, formdata.HFontSize, formdata.HFont, formdata.HFontStyle, this.argbToRGB(formdata.HForeColor), this.argbToRGB(formdata.HBackColor), 0, formdata.HAlignment);
				label.backgroundColor = 'transparent';
				label.sType = 'ExpListView';
				view.add(label);
				var WidgetContentView = TableViewBasicUIObj.createBasicView(null, 'transparent', formdata.ValueHeight, formdata.ValueWidth, null, null, null, null, 'vertical');
				WidgetContentView.fieldName = formdata.fieldName;
				WidgetContentView.fieldControl = 'EXPLISTVIEW';
				WidgetContentView.sType = 'ExpListView';
				//WidgetContentView.backgroundColor = '#0ff';

				try {
					//var WidgetContentViewData = mController.getWidgetContentView(formdata.fieldName);
					//WidgetContentView.add(WidgetContentViewData);

					var WidgetContentViewData = Ti.UI.createView({ backgroundColor: "transparent", layout: "vertical" });
					WidgetContentViewData.fieldName = formdata.fieldName;
					WidgetContentViewData.fieldControl = 'EXPLISTVIEW';
					WidgetContentViewData.sType = 'ExpListView';
					WidgetContentViewData.height = formdata.ValueHeight;
					//WidgetContentViewData.backgroundColor = '#ff0';
					//COMMON.Log('ExpListViewScreenName -> '+ screenName+"_FORM_EXPLISTVIEW_HEADER_"+formdata.fieldName);
					var _tblHeader = ArrayOperations.prototype.loadListConfig(screenName + "_FORM_EXPLISTVIEW_HEADER_" + formdata.fieldName);
					var layout = [];
					var ExpListViewHeaderQry = ArrayOperations.prototype.getQueryConfigByScreenNameWithOrderText(screenName + "_FORM_EXPLISTVIEW_HEADER_" + formdata.fieldName);
					//COMMON.Log('ExpListViewHeaderQry '+ExpListViewHeaderQry);
					if (ExpListViewHeaderQry != null && ExpListViewHeaderQry != undefined && ExpListViewHeaderQry != '') {
						ArrayOperations.prototype.resetRowiIndex();
						layout = ArrayOperations.prototype.loadData(screenName + "_FORM_EXPLISTVIEW_HEADER_" + formdata.fieldName, ExpListViewHeaderQry, 0, false);

						for (var _iCnt = 0; _iCnt < layout.length; _iCnt++) {
							layout[_iCnt].isparent = true;
							layout[_iCnt].opened = false;
							layout[_iCnt].isChild = false;
							layout[_iCnt].subView = false;
							layout[_iCnt].screenName = screenName;
							layout[_iCnt].fieldName = formdata.fieldName;
							layout[_iCnt].HeaderIndex = _iCnt;
							layout[_iCnt].SubList = 0;
						}
						//tableView.data = commonObj.tmpArrFormValues;
					}

					/*		
					var layout = [
						{
							title: "Parent 1",
							isparent: true,
							opened: false,
							sub: [
								{
									title: "Child 1"
								},
								{
									title: "Child 2"
								}
							]
						}, {
							title: "Parent 2",
							isparent: true,
							opened: false,
							sub: [
								{
									title: "Child 3"
								},
								{
									title: "Child 4"
								}
							]
						}
					
					];*/
					var ExpTableView = Ti.UI.createTableView({
						//style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
						top: 0,
						width: '100%',
						height: formdata.ValueHeight,//Ti.Platform.displayCaps.platformHeight,
						data: layout,
						screenName: screenName,
						fieldName: formdata.fieldName,
						zIndex: 1
					});

					//ExpTableView.backgroundColor = '#ff0';

					Ti.App.SubListViewActivated = false;
					ExpTableView.addEventListener("click", function (e) {
						if (Ti.App.SubListViewActivated == true) {
							return false;
						}
						//COMMON.Log('e.index --> ' + e.index + 'e.row.opened : ' + e.row.opened + ' - e.row.isparent : ' + e.row.isparent + ' - e.row.subView : ' + e.row.subView);

						//layout[_iCnt].screenName = screenName;
						//layout[_iCnt].fieldName = formdata.fieldName;
						//layout[_iCnt].HeaderIndex = _iCnt;
						var rowOpened = (e.row.opened == null || e.row.opened == undefined) ? false : e.row.opened;
						//COMMON.Log('3818');
						var rowIsParent = (e.row.isparent == null || e.row.isparent == undefined) ? false : e.row.isparent;
						//COMMON.Log('3820');
						var rowIsChild = (e.row.isChild == null || e.row.isChild == undefined) ? false : e.row.isChild;
						//COMMON.Log('3822');
						var rowSubView = (e.row.subView == null || e.row.subView == undefined) ? false : e.row.subView;
						//COMMON.Log('3824');
						if (rowIsParent) {



							if (rowOpened) {
								//REMOVE
								//layout[_iCnt].SubList = 0;
								////COMMON.Log('e.row.SubList.length --> ' + e.row.SubList.length);
								//for(var i=e.row.SubList.length; i > 0; i = i - 1) {
								//ExpTableView.deleteRow(e.index + i);
								//}

								if (rowSubView == true) {
									//e.row.subViewRow = 0.1;//
									//ExpTableView.data[0].rows[e.row.subViewIndex].height = 0.1;
									//ExpTableView.deleteRow(e.index + 1);
									//18jul2019//ExpTableView.data[0].rows[e.index + 1].height = 0.1;
									//ExpTableView.data[0].rows[e.index + 1].height = 0.1;
									//e.row.subView = false;
								}
								e.row.opened = false;
								try {
									//COMMON.Log('3843 :' +ExpTableView.data[0].rows[e.index + 1].height);
									ExpTableView.data[0].rows[e.index + 1].height = 0.1;
									//COMMON.Log('3845 '+ExpTableView.data[0].rows[e.index + 1].height);
								} catch (e) {
									//COMMON.Log('3844 '+e);
								}

							} else {

								if (rowSubView == true) {
									//e.row.subViewRow = 'auto';//
									//ExpTableView.data[0].rows[e.row.subViewIndex].height = 'auto';//Ti.UI.SIZE;
									e.row.opened = true;
									//COMMON.Log('3843 :' +ExpTableView.data[0].rows[e.index + 1].height);
									ExpTableView.data[0].rows[e.index + 1].height = ExpTableView.data[0].rows[e.index + 1].ActHeight;// 'auto';//ExpTableView.data[0].rows[e.index + 1].ActHeight;//150 * Ti.App.dHeightRatio;
								} else {
									//Add teh children.
									//COMMON.Log('ExpTableView --> ' + ExpTableView);
									//COMMON.Log('ExpTableView.data[0] --> ' + ExpTableView.data[0]);
									//COMMON.Log('ExpTableView.data[0].rows --> ' + ExpTableView.data[0].rows);

									var currentIndex = ExpTableView.data[0].rows.length;//e.index;
									//COMMON.Log('currentIndex --> ' + currentIndex);
									var SubList = 0;
									var _tblHeader = ArrayOperations.prototype.loadListConfig(e.row.screenName + "_FORM_EXPLISTVIEW_HEADER_" + e.row.fieldName + "_Sub" + e.row.HeaderIndex);
									var layout = [];
									//COMMON.Log('3872 ' + e.row.screenName+"_FORM_EXPLISTVIEW_HEADER_"+e.row.fieldName+"_Sub"+e.row.HeaderIndex);
									var ExpListViewSubQry = ArrayOperations.prototype.getQueryConfigByScreenNameWithOrderText(e.row.screenName + "_FORM_EXPLISTVIEW_HEADER_" + e.row.fieldName + "_Sub" + e.row.HeaderIndex);
									//COMMON.Log('ExpListViewSubQry '+ExpListViewSubQry);

									if (ExpListViewSubQry != null && ExpListViewHeaderQry != undefined && ExpListViewSubQry != '') {
										ArrayOperations.prototype.resetRowiIndex();
										//COMMON.Log('3877 ' + e.row.screenName+"_FORM_EXPLISTVIEW_HEADER_"+e.row.fieldName+"_Sub"+e.row.HeaderIndex);
										layout = ArrayOperations.prototype.loadData(e.row.screenName + "_FORM_EXPLISTVIEW_HEADER_" + e.row.fieldName + "_Sub" + e.row.HeaderIndex, ExpListViewSubQry, 0, false);
										for (var _iCnt = 0; _iCnt < layout.length; _iCnt++) {
											layout[_iCnt].isparent = false;
											layout[_iCnt].isChild = true;
											layout[_iCnt].opened = false;
											layout[_iCnt].screenName = e.row.screenName;
											layout[_iCnt].fieldName = e.row.fieldName;
											layout[_iCnt].HeaderIndex = e.row.HeaderIndex;
											layout[_iCnt].ChildIndex = _iCnt;
											layout[_iCnt].SubList = 0;
										}
									}
									if (layout.length > 0) {
										//var vwRowHorizontal1 = TableViewBasicUIObj.createBasicView(null, 'transparent', Ti.UI.SIZE, '100%', 0, 0, null, null, 'absolute');
										var vwRowHorizontal1 = TableViewBasicUIObj.createBasicView(null, '#FFFFFF', Ti.UI.SIZE, '100%', 0, 0, null, null, 'absolute');
										vwRowHorizontal1.top = 0;
										//vwRowHorizontal1.borderWidth = 3;
										//vwRowHorizontal1.borderColor = '#F00';
										//vwRowHorizontal1.height = 1200;
										//vwRowHorizontal1.top = 0;
										//COMMON.Log('3897 currentIndex ' + currentIndex + ' - ' + e.row.screenName+"_FORM_EXPLISTVIEW_HEADER_"+e.row.fieldName);
										var row1 = TableViewBasicUIObj.createBasicRow(currentIndex, e.row.screenName + "_FORM_EXPLISTVIEW_HEADER_" + e.row.fieldName, false);

										//row1.height = 1200;

										var dListRowHeight = (layout.length - 1) * 50 * Ti.App.dHeightRatio;
										dListRowHeight = (dListRowHeight > 500) ? 500 : dListRowHeight;
										var subTtableView = Ti.UI.createTableView({
											//style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
											top: 0,
											width: '100%',
											height: dListRowHeight,// (layout.length-1) * 50 * Ti.App.dHeightRatio,//formdata.ValueHeight,//Ti.Platform.displayCaps.platformHeight,
											data: layout,
											screenName: e.row.screenName,
											fieldName: e.row.fieldName,
											//backgroundColor : '#FF0',
											zIndex: 10,
											ActHeight: dListRowHeight,// (layout.length-1) * 50 * Ti.App.dHeightRatio
										});
										vwRowHorizontal1.add(subTtableView);
										row1.add(vwRowHorizontal1);


										row1.height = dListRowHeight;//'auto';//(layout.length-1) * 50 * Ti.App.dHeightRatio;//'auto';//Ti.UI.SIZE;
										row1.ActHeight = dListRowHeight;//(layout.length-1) * 50 * Ti.App.dHeightRatio;//'auto';//Ti.UI.SIZE;										
										//row1.height = 'auto';//(layout.length-1) * 50 * Ti.App.dHeightRatio;//'auto';//Ti.UI.SIZE;
										//row1.ActHeight = (layout.length-1) * 50 * Ti.App.dHeightRatio;//'auto';//Ti.UI.SIZE;										

										subTtableView.addEventListener("click", function (e) {

											//var subTtableView1 = this;
											Ti.App.SubListViewActivated = true;
											//COMMON.Log('subTtableView : e.index --> ' + e.index + 'e.row.opened : ' + e.row.opened + ' - e.row.isparent : ' + e.row.isparent + ' - e.row.subView : ' + e.row.subView);

											var rowOpened = (e.row.opened == null || e.row.opened == undefined) ? false : e.row.opened;
											var rowIsParent = (e.row.isparent == null || e.row.isparent == undefined) ? false : e.row.isparent;
											var rowIsChild = (e.row.isChild == null || e.row.isChild == undefined) ? false : e.row.isChild;
											var rowSubView = (e.row.subView == null || e.row.subView == undefined) ? false : e.row.subView;
											if (rowIsChild) {
												if (rowOpened) {
													if (rowSubView == true) {
														subTtableView.data[0].rows[e.index + 1].height = 0.1;
													}
													e.row.opened = false;
												} else {

													if (rowSubView == true) {
														//e.row.subViewRow = 'auto';//
														//ExpTableView.data[0].rows[e.row.subViewIndex].height = 'auto';//Ti.UI.SIZE;
														e.row.opened = true;
														subTtableView.data[0].rows[e.index + 1].height = subTtableView.data[0].rows[e.index + 1].ActHeight;//150 * Ti.App.dHeightRatio;
													} else {
														//Add teh children.
														//COMMON.Log('ExpTableView --> ' + ExpTableView);
														//COMMON.Log('ExpTableView.data[0] --> ' + ExpTableView.data[0]);
														//COMMON.Log('ExpTableView.data[0].rows --> ' + ExpTableView.data[0].rows);
														var sRow = e.row;//ExpTableView.data[0].rows;
														Ti.App.ExpandedSelectedRowData = [];
														var _obj = {};
														for (var i = 0; i < sRow.children[0].children.length; i++) {
															_obj = {};
															_obj.FieldName = sRow.children[0].children[i].DataMember;
															_obj.Value = sRow.children[0].children[i].text;
															Ti.App.ExpandedSelectedRowData.push(_obj);
															/*try{
															//COMMON.Log('i--> ' + sRow.children[0].children[i]);
															//COMMON.Log('i--> fieldName : ' + sRow.children[0].children[i].fieldName);
															//COMMON.Log('i--> fieldControl : ' + sRow.children[0].children[i].fieldControl);
															//COMMON.Log('i--> DataMember : ' + sRow.children[0].children[i].DataMember);
															//COMMON.Log('i--> text : ' + sRow.children[0].children[i].text);
															//COMMON.Log('i--> value : ' + sRow.children[0].children[i].value);
															//COMMON.Log('i--> code : ' + sRow.children[0].children[i].code);
															}catch(e){}*/
														}
														//COMMON.Log('- - - - - - - - - - - - - - - - - - - - - - - - -');
														//COMMON.Log('Ti.App.ExpandedSelectedRowData.length : ' + Ti.App.ExpandedSelectedRowData.length);
														//COMMON.Log('Ti.App.ExpandedSelectedRowData : ' + JSON.stringify(Ti.App.ExpandedSelectedRowData.length));
														//COMMON.Log('- - - - - - - - - - - - - - - - - - - - - - - - -');
														var currentIndex = subTtableView.data[0].rows.length;//e.index;
														//COMMON.Log('currentIndex --> ' + currentIndex);
														var SubList = 0;
														//COMMON.Log('SCREENNAME --> ' +  e.row.screenName+"_FORM_EXPLISTVIEW_HEADER_"+e.row.fieldName+"_Sub"+e.row.HeaderIndex+"_Sub1");
														//var _tblHeader = ArrayOperations.prototype.loadListConfig(e.row.screenName+"_FORM_EXPLISTVIEW_HEADER_"+e.row.fieldName+"_Sub"+e.row.HeaderIndex+"_Sub"+e.row.ChildIndex);
														var _tblHeader = ArrayOperations.prototype.loadListConfig(e.row.screenName + "_FORM_EXPLISTVIEW_HEADER_" + e.row.fieldName + "_Sub" + e.row.HeaderIndex + "_Sub1");
														var layout = [];
														//var ExpListViewSubQry = ArrayOperations.prototype.getQueryConfigByScreenNameWithOrderText(e.row.screenName+"_FORM_EXPLISTVIEW_HEADER_"+e.row.fieldName+"_Sub"+e.row.HeaderIndex+"_Sub"+e.row.ChildIndex);
														var ExpListViewSubQry = ArrayOperations.prototype.getQueryConfigByScreenNameWithOrderText(e.row.screenName + "_FORM_EXPLISTVIEW_HEADER_" + e.row.fieldName + "_Sub" + e.row.HeaderIndex + "_Sub1");
														//COMMON.Log('ExpListViewSubQry '+ExpListViewSubQry);

														if (ExpListViewSubQry != null && ExpListViewHeaderQry != undefined && ExpListViewSubQry != '') {
															ArrayOperations.prototype.resetRowiIndex();
															//layout = ArrayOperations.prototype.loadData(e.row.screenName+"_FORM_EXPLISTVIEW_HEADER_"+e.row.fieldName+"_Sub"+e.row.HeaderIndex+"_Sub"+e.row.ChildIndex, ExpListViewSubQry, 0, false);
															layout = ArrayOperations.prototype.loadData(e.row.screenName + "_FORM_EXPLISTVIEW_HEADER_" + e.row.fieldName + "_Sub" + e.row.HeaderIndex + "_Sub1", ExpListViewSubQry, 0, false);
															/*for(var _iCnt = 0; _iCnt < layout.length; _iCnt++){
																layout[_iCnt].isparent = false;
																layout[_iCnt].isChild = true;
																layout[_iCnt].opened = false;
																layout[_iCnt].screenName = e.row.screenName;
																layout[_iCnt].fieldName = e.row.fieldName;
																layout[_iCnt].HeaderIndex = _iCnt;
																layout[_iCnt].SubList = 0;
															}*/
														}
														if (layout.length > 0) {
															//var vwRowHorizontal2 = TableViewBasicUIObj.createBasicView(null, 'transparent', Ti.UI.SIZE, '100%', 0, 0, null, null, 'absolute');
															var vwRowHorizontal2 = TableViewBasicUIObj.createBasicView(null, '#FFFFFF', Ti.UI.SIZE, '100%', 0, 0, null, null, 'absolute');
															//vwRowHorizontal2.borderWidth = 3;
															//vwRowHorizontal2.borderColor = '#0F0';
															var row2 = TableViewBasicUIObj.createBasicRow(currentIndex, e.row.screenName + "_FORM_EXPLISTVIEW_HEADER_" + e.row.fieldName + "_Sub" + e.row.ChildIndex, false);
															//row2.height = (layout.length-1) * 50 * Ti.App.dHeightRatio;//'auto';//Ti.UI.SIZE;
															//row2.ActHeight = (layout.length-1) * 50 * Ti.App.dHeightRatio;//'auto';//Ti.UI.SIZE;

															var dSubListRowHeight = (layout.length - 1) * 50 * Ti.App.dHeightRatio;
															dSubListRowHeight = (dSubListRowHeight > 500) ? 500 : dSubListRowHeight;

															var subChildtableView = Ti.UI.createTableView({
																//style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
																top: 0,
																width: '100%',
																height: dSubListRowHeight,//(layout.length-1) * 50 * Ti.App.dHeightRatio,//formdata.ValueHeight,//Ti.Platform.displayCaps.platformHeight,
																data: layout,
																screenName: e.row.screenName,
																fieldName: e.row.fieldName,
																//backgroundColor : '#FF0',
																zIndex: 10,
																ActHeight: dSubListRowHeight//(layout.length-1) * 50 * Ti.App.dHeightRatio//'auto';//Ti.UI.SIZE;
															});
															vwRowHorizontal2.add(subChildtableView);
															row2.add(vwRowHorizontal2);

															row2.height = dSubListRowHeight;
															row2.ActHeight = dSubListRowHeight;

															subTtableView.insertRowAfter(e.index, row2);
															e.row.subViewIndex = currentIndex;
															e.row.subViewRow = row2;
															e.row.opened = true;
															e.row.subView = true;
															e.row.subListView = subChildtableView;

															ArrayOperations.prototype.updateTableRowIndexByTableView(subTtableView);
															var _RawData = subTtableView.data;
															subTtableView.data = _RawData;
															subTtableView.setData(_RawData);
															ArrayOperations.prototype.updateTableRowIndexByTableView(ExpTableView);
															var _RawData = ExpTableView.data;
															ExpTableView.data = _RawData;
															ExpTableView.setData(_RawData);


														}
														Ti.App.ExpandedSelectedRowData = [];
													}
												}
											}
											setTimeout(function () {
												Ti.App.SubListViewActivated = false;
											}, 100);

											try {
												if (mController != null && mController != undefined) {
													//e.row.screenName+"_FORM_EXPLISTVIEW_HEADER_"+e.row.fieldName+"_Sub"+e.row.HeaderIndex+"_Sub"+e.row.ChildIndex
													mController.ExpandedSubListClicked(e.row, e.row.fieldName, e.row.HeaderIndex, e.row.ChildIndex);
												}
											} catch (e) { }
										});

										ExpTableView.insertRowAfter(e.index, row1);
										//for(var i=0; i < layout.length; i++) {
										//ExpTableView.insertRowAfter(currentIndex, layout[i]);
										//currentIndex++;
										//}
										e.row.subViewIndex = currentIndex;
										e.row.subViewRow = row1;
										e.row.opened = true;
										e.row.subView = true;
										e.row.subListView = subTtableView;
										//e.row.SubList = layout.length;

										ArrayOperations.prototype.updateTableRowIndexByTableView(ExpTableView);
										var _RawData = ExpTableView.data;
										ExpTableView.data = _RawData;
										ExpTableView.setData(_RawData);
									} else {
										try {
											if (mController != null && mController != undefined) {
												//e.row.screenName+"_FORM_EXPLISTVIEW_HEADER_"+e.row.fieldName+"_Sub"+e.row.HeaderIndex+"_Sub"+e.row.ChildIndex
												mController.ExpandedListClicked(e.row, e.row.fieldName, e.row.HeaderIndex, e.row.ChildIndex);
											}
										} catch (e) { }
									}


								}
							}
							//}else if(rowIsChild){
							//alert(rowIsChild);

						}

						return "";
						//Is this a parent cell?
						if (e.row.isparent) {
							//Is it opened?
							if (e.row.opened) {
								for (var i = e.row.sub.length; i > 0; i = i - 1) {
									ExpTableView.deleteRow(e.index + i);
								}
								e.row.opened = false;
							}

							else {
								//Add teh children.
								var currentIndex = e.index;
								for (var i = 0; i < e.row.sub.length; i++) {
									ExpTableView.insertRowAfter(currentIndex, e.row.sub[i]);
									currentIndex++;
								}
								e.row.opened = true;
							}
						}
					});

					WidgetContentViewData.add(ExpTableView);
					WidgetContentView.add(WidgetContentViewData);

					ArrayOperations.prototype.loadListConfigArr(screenName);
					ArrayOperations.prototype.setTableHeaderFieldNames(screenName);

				} catch (e) { }
				view.add(WidgetContentView);
			} else if (formdata.FieldControl == 'PREVIEW') {
				var view = TableViewBasicUIObj.createBasicView(null, '#e8e8e8', '100%', '100%', null, null, null, null, null);
				var scrollView = Ti.UI.createScrollView({
					contentWidth: 'auto',
					contentHeight: 'auto',
					height: 'auto',//'100%',//Ti.UI.SIZE,//height,//'0%',
					top: 0,
					showVerticalScrollIndicator: false,
					showHorizontalScrollIndicator: false,
					scrollType: 'vertical',
					layout: 'vertical',
					minZoomScale: 1,
					maxZoomScale: 15,
					zoomScale: 1,
					oldZoom: 1,
				});
				scrollView.addEventListener('touchstart', function (e) {
					//mView.disabledFormScrollView();
				});
				scrollView.addEventListener('touchend', function (e) {
					//mView.enabledFormScrollView();
				});
				try {
					currentWin = Ti.App.currentWin;
					if (currentWin != null && currentWin != undefined) {
						ArrayOperations.prototype.createIndicatorObject();
						currentWin.add(actInd);
						actInd.show();
					}
					Ti.App.PreViewScrollView = scrollView;
					var sPreviewData = mController.getPreviewContent();
					scrollView.add(sPreviewData);
					if (currentWin != null && currentWin != undefined) {
						actInd.hide();
						currentWin.remove(actInd);
						currentWin = null;
					}
				} catch (e) {
					var label1 = commonObj.BasicLabelObj.createLabel('Preview Not Found!!!', '100%', 50, formdata.HFontSize, formdata.HFont, formdata.HFontStyle, this.argbToRGB(formdata.HForeColor), this.argbToRGB(formdata.HBackColor), 0, formdata.HAlignment);
					scrollView.add(label1);
				}
				view.add(scrollView);
			} else {
				_lblTotalWidth = (formdata.dHeaderWidth + formdata.dValueWidth);
				var view = TableViewBasicUIObj.createBasicView(null, 'transparent', height, _lblTotalWidth + '%', null, null, null, null, null);
				view.sRowHeight = height;
				view.dWidth = _lblTotalWidth;
				view.top = totalHeaderHeight - height;//5;
				view.bottom = 5;
				/****** FORM VIEW ALIGNMENT ******
				//DEFAULT CENTER ALIGN
				if(abc==0){//LEFT ALIGN
					view.left = 2;
				}else if(abc==1){//RIGHT ALIGN
					view.right = 2;
				}
				/*********************************/
				if (dDisplayNo != "") {
					view.left = 0;
				}
				if (formdata.FieldControl == 'LINE') {
					formdata.Visible = (formdata.Visible == null || formdata.Visible == undefined || formdata.Visible == '') ? 0 : formdata.Visible;
					view.top = totalHeaderHeight - (height/2);
					if (formdata.Visible == 1) {
						//view.height = 1;
						//view.backgroundColor = '#a6a6a6';//'#e8e8e8';
						view.height = (COMMON.CheckDecimal(formdata.DefaultValue) > 0) ? formdata.DefaultValue : 1;
						view.backgroundColor = Ti.App.sFormlineColor;
					} else {
						view.height = 0;
						view.backgroundColor = 'transparent';
					}
				} else if (formdata.FieldControl == 'VERTICALLINE') {
					view.width = 1;
					view.left = 0;
					view.backgroundColor = Ti.App.sFormlineColor;//'#ffffff';
				} else if (formdata.FieldControl == 'LISTVIEW') {
					view = Ti.UI.createScrollView({
						contentWidth: 'auto',
						contentHeight: 'auto',
						height: height,
						top: 0,
						showVerticalScrollIndicator: true,
						showHorizontalScrollIndicator: true,
						scrollType: 'horizontal',
						minZoomScale: 1,
						maxZoomScale: 15,
						zoomScale: 1,
						oldZoom: 1,
					});
					view.FieldControl = 'FORMLISTVIEWPANEL';
					view.borderColor = sListBorderColor;//'#3333ff';
					view.borderWidth = 1;
					view.sRowHeight = height;
					view.dWidth = _lblTotalWidth;
					view.fieldName = formdata.fieldName;
					view.DataMemberType = formdata.DataMemberType.toUpperCase();
					view.top = totalHeaderHeight - height;//5;
					iIndex = 0;
					//COMMON.Log('3700 Qry '+screenName+"_FORM_LISTVIEW_"+formdata.fieldName);
					var _tblHeader = ArrayOperations.prototype.loadListConfig(screenName + "_FORM_LISTVIEW_" + formdata.fieldName);
					view.add(_tblHeader);
					var label = commonObj.FormTextFieldObj.createTextField(true, '', 0, 0, 0, 0, 'transparent', 'transparent', 1, false, 'TEXT');
					label.backgroundColor = 'transparent';//'#333';
					label.editable = false;
					label.enabled = false;
					label.fieldName = formdata.fieldName;
					label.sType = 'ListView';
					label.DataMemberType = formdata.DataMemberType.toUpperCase();
					label.fieldControl = formdata.FieldControl;
					view.add(label);
					//COMMON.Log('formdata.dHeaderWidth ---> ' + formdata.dHeaderWidth);
					var tableView = new BasicTableView().createTableView();
					//tableView.backgroundColor = 'transparent';
					tableView.height = height - _tblHeader.height;//formdata.headerHeight;
					tableView.width = _tblHeader.width;//'100%';//formdata.headerHeight;
					tableView.top = _tblHeader.height;
					tableView.left = 0;
					tableView.sFieldName = formdata.fieldName;
					tableView.fieldName = formdata.fieldName;
					tableView.selectedTblRowIndex = -1;
					tableView.DataMemberType = formdata.DataMemberType.toUpperCase();
					tableView.fieldControl = formdata.FieldControl;
					tableView.tblScreenName = screenName + "_FORM_LISTVIEW_" + formdata.fieldName;
					if (screenName == 'MainDashboard') {
						//COMMON.Log('screenName '+ screenName);
						if (Ti.App.ARRAYOPERATION.getSystemValue('Dashboardtablebgcolor') != '' && Ti.App.ARRAYOPERATION.getSystemValue('Dashboardtablebgcolor') != undefined && Ti.App.ARRAYOPERATION.getSystemValue('Dashboardtablebgcolor') != null) {
							tableView.backgroundColor = Ti.App.ARRAYOPERATION.getSystemValue('Dashboardtablebgcolor');
						}
					}
					//	screenname == "MainDashboard"
					//  Dashboardtablebgcolor !=""

					//  tableView.backgroundcolor = '#ffffff';


					//GOODPACK
					//tableView.borderColor = Ti.App.listBorderColor;//'#3333ff';
					//tableView.borderWidth = Ti.App.sTblViewBorderWidth;//1;
					//var fName = formdata.fieldName;
					commonObj.query = ArrayOperations.prototype.getQueryConfigByScreenNameWithOrderText(screenName + "_FORM_LISTVIEW_" + formdata.fieldName);
					if (commonObj.query != null && commonObj.query != undefined && commonObj.query != '') {
						ArrayOperations.prototype.resetRowiIndex();
						//COMMON.Log('chart query ---> ' + commonObj.query);
						commonObj.tmpArrFormValues = this.loadData(screenName + "_FORM_LISTVIEW_" + formdata.fieldName, commonObj.query, 0, false);
						tableView.data = commonObj.tmpArrFormValues;
					}
					tableView.addEventListener('touchstart', function (e) {
						try {
							if (e.row != null && e.row != undefined) {
								if (e.row.index != null && e.row.index != undefined) {
									this.selectedTblRowIndex = e.row.index;
								}
							}
						} catch (e) { }
						mView.disabledFormScrollView();
					});

					//tableView.addEventListener('swipe',function(e){
					//mView.enabledFormScrollView();
					//});
					tableView.addEventListener('scroll', function (e) {
						mView.enabledFormScrollView();
					});

					tableView.addEventListener('touchend', function (e) {
						mView.enabledFormScrollView();
					});
					tableView.addEventListener('touchcancel', function (e) {
						mView.enabledFormScrollView();
					});
					tableView.addEventListener('longclick', function (e) {
						try {
							//COMMON.Log('longclick Start');
							if (mController != undefined || mController != null) {
								//mController.rowItemLongPress(e.row);
								var queryName = '';
								var menuPopupItems = null;
								try {
									//if (iIndex == 0) {// calling once is enough instead of entire loop
									queryName = mController.preloadQuery(Ti.App.currentScreenName);
									//COMMON.Log('queryName : ' + queryName);
									menuPopupItems = ArrayOperations.prototype.loadMenuPopupConfig(queryName);
									//COMMON.Log('menuPopupItems : ' + JSON.stringify(menuPopupItems));					
									//}
								} catch (e) {
								}
								if (menuPopupItems != null && menuPopupItems != undefined) {
									//COMMON.Log('menuPopupItems.length -> ' + menuPopupItems.length);
									if (menuPopupItems.length > 0) {
										if (COMMON.avoidMultipleClick()) {
											return;
										}
										//Before calling Menupopup need to set Selected Row Index
										//COMMON.Log('setselectedRowIndex -> ' + e.row.index + ' - e.row.iIndex ' + e.row.iIndex);										
										//mView.setselectedRowIndex(e.row.index);
										new MenuRowPopup().show(e.row.index, 'Menu Popup', mController, menuPopupItems, e.row);
									}
								}
							}
							//COMMON.Log('longclick End');			
						} catch (e) {
							//COMMON.Log('longclick ERROR : ' + JSON.stringify(e));			
						}
					});
					tableView.addEventListener('click', function (e) {
						try {
							this.selectedTblRowIndex = e.row.index;
							mController.formRowItemClicked(this.sFieldName, e.row);
						}
						catch (e) {
							//COMMON.Log("tableView Error ---> " + e);
						}
					});
					view.add(tableView);
					parent.arrListViewFieldName.push(formdata.fieldName);
					this.loadListConfigArr(screenName);
					this.setTableHeaderFieldNames(screenName);
				} else if (formdata.FieldControl == 'MULTILINE') {
					/****
					 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  
					 * SCREENNAME		FIELDNAME		DISPLAYNO DEFAULTVALUE	FIELDCONTROLTYPE
					 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
					 * SalesStatus		CustNo			1.1						LABEL
					 * SalesStatus		CustName		1.2						LABEL
					 * SalesStatus		ItemId			2.1			LINE1		MULTILINE
					 * SalesStatus		ItemName		2.2			LINE1		MULTILINE
					 * SalesStatus		Qty				2.3			LINE1		MULTILINE
					 * SalesStatus		Line			3			LINE
					 * SalesStatus		ItemId1			4.1			LINE2		MULTILINE
					 * SalesStatus		ItemName1		4.2			LINE2		MULTILINE
					 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
					 */
					bMultiLine = true;
					_DBformValues = formValues;
					//MULTILINE
					var query = ArrayOperations.prototype.getQueryConfigByScreenNameWithOrderText(screenName + "_FORM_MULTILINE_" + formdata.DefaultValue);
					//COMMON.Log('chart query ---> ' + query);
					var tmpArrFormValues = [];
					tmpScreennameforMultiline = screenName;
					tmpArrFormValues = this.loadFormValueData(query, tmpArrFormValues);
					var tmpCnt = 0;
					//COMMON.Log('tmpArrFormValues.length ---> ' + tmpArrFormValues.length);
					if (tmpArrFormValues.length == 0) {
						_dDisplayNo = 0;
						for (var j = abc; j < length; j++) {
							tmpCnt = abc;
							var formdata = {};
							formdata = data[j];
							_dDisplayNo = formdata.DisplayNo;
							str = new String(_dDisplayNo);
							//COMMON.Log('abc --> ' + abc + ' : _dDisplayNo --> ' + _dDisplayNo);
							if (str.indexOf(".") > -1) {
								var arr = str.split(".");
								//COMMON.Log('dDisplayNo --> ' + dDisplayNo + ' == arr[0] --> ' + arr[0]+ ".");
								if (dDisplayNo == arr[0] + ".") {
									tmpCnt++;
								} else {
									j = length;
								}
							} else {
								tmpCnt++;
							}
						}
					} else {
						var dChildViewLeft = 0;
						var _LoopLen1 = tmpArrFormValues.length;
						for (var _j = 0; _j < _LoopLen1; _j++) {
							formValues = [];
							formValues.push(tmpArrFormValues[_j]);
							formdata = {};
							formdata = data[abc];
							dChildViewTop = totalHeaderHeight - formdata.headerHeight;
							//COMMON.Log('totalHeaderHeight ---> ' + totalHeaderHeight);						
							totalHeaderHeight += formdata.headerHeight;
							dChildViewLeft = 0;// + 2;
							//COMMON.Log('_j --> ' + _j);
							_dDisplayNo = 0;
							for (var j = abc; j < length; j++) {
								tmpCnt = abc;
								var formdata = {};
								formdata = data[j];
								_dDisplayNo = formdata.DisplayNo;
								str = new String(_dDisplayNo);
								//COMMON.Log('abc --> ' + abc + ' : _dDisplayNo --> ' + _dDisplayNo);
								if (str.indexOf(".") > -1) {
									var arr = str.split(".");
									//COMMON.Log('dDisplayNo --> ' + dDisplayNo + ' == arr[0] --> ' + arr[0]+ ".");
									if (dDisplayNo == arr[0] + ".") {
										//if(j != abc){
										formFieldNames.push(formdata.fieldName.toUpperCase());
										formDataMember.push(formdata.DataMember.toUpperCase());
										//}
										_dDisplayNo = formdata.DisplayNo;
										str = new String(_dDisplayNo);
										_lblTotalWidth = (formdata.dHeaderWidth + formdata.dValueWidth);
										view = TableViewBasicUIObj.createBasicView(null, 'transparent', height, _lblTotalWidth + '%', null, null, null, null, null);
										view.sRowHeight = height;
										view.dWidth = _lblTotalWidth;
										view.top = dChildViewTop;//totalHeaderHeight;//5;
										view.left = dChildViewLeft + '%';
										view.bottom = 5;
										view.backgroundColor = 'transparent';
										dChildViewLeft += _lblTotalWidth;//  + 1;
										if (screenName == 'MeterReading') {
											formdata.FieldControl = 'TEXTBOX';//EDITABLETEXTBOX
											formdata.DataMemberType = 'NUMBER';
										} else {
											formdata.FieldControl = 'LABEL';
										}
										this.getFormConfigChildView(view, formdata, headerTop, valueTop, formValues, screenName);
										parent.add(view);
										Ti.App.formItems = parent;//230216-FORMARRAYUPDATE
										tmpCnt++;
										//COMMON.Log('_j1 --> ' + _j);
										_j++;
										//COMMON.Log('_j2 --> ' + _j);
									} else {
										tmpCnt++;
										_j--;
										j = length;
									}
								} else {
									tmpCnt++;
									_j--;
									j = length;
								}
								if (j == length - 1) {
									tmpCnt++;
									_j--;
								}
								formValues = [];
								formValues.push(tmpArrFormValues[_j]);
							}
						}
					}
					abc = tmpCnt;
					formValues = _DBformValues;
					dDisplayNo = "";
				} else {
					this.getFormConfigChildView(view, formdata, headerTop, valueTop, formValues, screenName);
				}
				//formFieldNames        ---> ["ROUTENO","ROUTENO1","ROUTENO3","ROUTENO4","ROUTENO7"]
				//[1, 2, 3, 4.1, 4.2, 4.3, 5.1, 5.2]
				if (dDisplayNo != "") {
					abc++;
					dChildViewTop = view.top;
					//headerTop, valueTop
					var dChildViewLeft = view.dWidth;// + 2;
					var dFormTableViewHeight = 0, _dDisplayNo = 0, _lblTotalWidth = 0;
					for (var j = abc; j < length; j++) {
						var formdata = {};
						formdata = data[j];
						_dDisplayNo = formdata.DisplayNo;
						str = new String(_dDisplayNo);
						//COMMON.Log('_dDisplayNo --> ' + _dDisplayNo);
						if (str.indexOf(".") > -1) {
							var arr = str.split(".");
							//COMMON.Log('dDisplayNo --> ' + dDisplayNo + ' == arr[0] --> ' + arr[0]+ ".");
							if (dDisplayNo == arr[0] + ".") {
								parent.add(view);
								Ti.App.formItems = parent;//230216-FORMARRAYUPDATE
								formFieldNames.push(formdata.fieldName.toUpperCase());
								formDataMember.push(formdata.DataMember.toUpperCase());
								_lblTotalWidth = (formdata.dHeaderWidth + formdata.dValueWidth);
								view = TableViewBasicUIObj.createBasicView(null, 'transparent', height, _lblTotalWidth + '%', null, null, null, null, null);
								view.sRowHeight = height;
								view.dWidth = _lblTotalWidth;
								view.top = dChildViewTop;//totalHeaderHeight;//5;
								view.left = dChildViewLeft + '%';
								view.bottom = 5;
								dChildViewLeft += _lblTotalWidth;//  + 1;
								//COMMON.Log('formdata.FieldControl : ' + formdata.FieldControl);
								if (formdata.FieldControl == 'LISTVIEW') {
									var label = commonObj.FormTextFieldObj.createTextField(true, '', 0, 0, 0, 0, 'transparent', 'transparent', 1, false, 'TEXT');
									label.backgroundColor = 'transparent';//'#333';
									label.editable = false;
									label.enabled = false;
									label.fieldName = formdata.fieldName;
									label.sType = 'ListView';
									label.DataMemberType = formdata.DataMemberType.toUpperCase();
									label.fieldControl = formdata.FieldControl;
									view.add(label);
									//COMMON.Log('formdata.dHeaderWidth ---> ' + formdata.dHeaderWidth);
									formdata.dHeaderWidth = (formdata.dHeaderWidth < 0) ? 0 : formdata.dHeaderWidth;
									formdata.dValueWidth = (formdata.dValueWidth < 0) ? 0 : formdata.dValueWidth;
									_lblTotalWidth = (formdata.dHeaderWidth + formdata.dValueWidth);
									formdata.headerWidth = ((formdata.dHeaderWidth / _lblTotalWidth) * 100);
									formdata.ValueWidth = ((formdata.dValueWidth / _lblTotalWidth) * 100);
									formdata.headerWidth = (formdata.headerWidth < 0) ? 0 : formdata.headerWidth;
									formdata.ValueWidth = (formdata.ValueWidth < 0) ? 0 : formdata.ValueWidth;
									_lblTotalWidth = formdata.headerWidth + formdata.ValueWidth;
									formdata.headerWidth = formdata.headerWidth + '%';
									formdata.ValueWidth = formdata.ValueWidth + '%';
									view.height = formdata.ValueHeight;
									//headerTop = formdata.ValueHeight;
									dFormTableViewHeight = formdata.ValueHeight;
									if (j > 0) {
										var _formdata = data[j - 1];
									}
									totalHeaderHeight = (totalHeaderHeight - _formdata.headerHeight) + dFormTableViewHeight;
									var tableView = new BasicTableView().createTableView();
									//tableView.backgroundColor = 'transparent';
									tableView.height = formdata.ValueHeight;//formdata.headerHeight;
									tableView.width = formdata.ValueWidth;//_lblTotalWidth;//_tblHeader.width;//'100%';//formdata.headerHeight;
									tableView.top = 0;
									tableView.left = 0;
									tableView.sFieldName = formdata.fieldName;
									tableView.fieldName = formdata.fieldName;
									tableView.selectedTblRowIndex = -1;
									tableView.DataMemberType = formdata.DataMemberType.toUpperCase();
									tableView.fieldControl = formdata.FieldControl;
									tableView.tblScreenName = screenName + "_FORM_LISTVIEW_" + formdata.fieldName;
									tableView.backgroundColor = 'Transparent';
									tableView.borderWidth = 1;
									tableView.borderColor = this.argbToRGB(formdata.borderColor);
									//GOODPACK
									//tableView.borderColor = Ti.App.listBorderColor;//'#3333ff';
									//tableView.borderWidth = Ti.App.sTblViewBorderWidth;//1;
									this.loadListConfigArr(screenName + "_FORM_LISTVIEW_" + formdata.fieldName);
									this.setTableHeaderFieldNames(screenName + "_FORM_LISTVIEW_" + formdata.fieldName);
									//var fName = formdata.fieldName;
									commonObj.query = ArrayOperations.prototype.getQueryConfigByScreenNameWithOrderText(screenName + "_FORM_LISTVIEW_" + formdata.fieldName);
									if (commonObj.query != null && commonObj.query != undefined && commonObj.query != '') {
										ArrayOperations.prototype.resetRowiIndex();
										//COMMON.Log('chart query ---> ' + commonObj.query);
										//COMMON.Log('chart query ---> ' + commonObj.query);
										commonObj.tmpArrFormValues = this.loadData(screenName + "_FORM_LISTVIEW_" + formdata.fieldName, commonObj.query, 0, false);
										tableView.data = commonObj.tmpArrFormValues;
									}
									tableView.addEventListener('touchstart', function (e) {
										try {
											if (e.row != null && e.row != undefined) {
												if (e.row.index != null && e.row.index != undefined) {
													this.selectedTblRowIndex = e.row.index;
												}
											}
										} catch (e) { }
										mView.disabledFormScrollView();
									});
									tableView.addEventListener('touchend', function (e) {
										mView.enabledFormScrollView();
									});
									tableView.addEventListener('longclick', function (e) {
										try {
											//COMMON.Log('longclick Start');
											if (mController != undefined || mController != null) {
												//mController.rowItemLongPress(e.row);
												var queryName = '';
												var menuPopupItems = null;
												try {
													//if (iIndex == 0) {// calling once is enough instead of entire loop
													queryName = mController.preloadQuery(Ti.App.currentScreenName);
													//COMMON.Log('queryName : ' + queryName);
													menuPopupItems = ArrayOperations.prototype.loadMenuPopupConfig(queryName);
													//COMMON.Log('menuPopupItems : ' + JSON.stringify(menuPopupItems));					
													//}
												} catch (e) { }
												if (menuPopupItems != null && menuPopupItems != undefined) {
													//COMMON.Log('menuPopupItems.length -> ' + menuPopupItems.length);
													if (menuPopupItems.length > 0) {
														if (COMMON.avoidMultipleClick()) {
															return;
														}
														//Before calling Menupopup need to set Selected Row Index
														//COMMON.Log('setselectedRowIndex -> ' + e.row.index + ' - e.row.iIndex ' + e.row.iIndex);										
														//mView.setselectedRowIndex(e.row.index);
														new MenuRowPopup().show(e.row.index, 'Menu Popup', mController, menuPopupItems, e.row);
													}
												}
											}
											//COMMON.Log('longclick End');			
										} catch (e) {
											//COMMON.Log('longclick ERROR : ' + JSON.stringify(e));			
										}
									});
									tableView.addEventListener('click', function (e) {
										try {
											this.selectedTblRowIndex = e.row.index;
											mController.formRowItemClicked(this.sFieldName, e.row);
										}
										catch (e) {
											//COMMON.Log("tableView Error ---> " + e);
										}
									});
									view.add(tableView);
									parent.arrListViewFieldName.push(formdata.fieldName);
									this.loadListConfigArr(screenName);
									this.setTableHeaderFieldNames(screenName);
								} else {
									this.getFormConfigChildView(view, formdata, headerTop, valueTop, formValues, screenName);
								}
								abc++;
							} else {
								abc = j - 1;
								dDisplayNo = "";
								j = length;
							}
						} else {
							abc = j - 1;
							dDisplayNo = "";
							j = length;
						}
					}
					if (dFormTableViewHeight > 0) {
						//dChildViewTop = totalHeaderHeight + dFormTableViewHeight;
					}
				}
			}
			if (bMultiLine != true) {
				parent.add(view);
				Ti.App.formItems = parent;//230216-FORMARRAYUPDATE
			} else {
				bMultiLine = false;
			}
		}
		//COMMON.Log('loadFormConfig END -> ' + new Date().getTime());
		if (screenName.toUpperCase() == 'PRINTPREVIEW') {
			parent.height = 'auto';
			Ti.App.formItems = parent;
			return parent;
		} else {
			Ti.App.formItems = parent;
			return FORMPANEL.createFormPanel(false, 'Test', parent, totalHeaderHeight + 1, '100%');
		}
	},
	getFormConfigChildView: function (view, formdata, headerTop, valueTop, formValues, screenName) {
		//COMMON.Log('getFormConfigChildView START -> ' + new Date().getTime());		
		if (view.layout != 'horizontal') {
			formdata.dHeaderWidth = (formdata.dHeaderWidth < 0) ? 0 : formdata.dHeaderWidth;
			formdata.dValueWidth = (formdata.dValueWidth < 0) ? 0 : formdata.dValueWidth;
			_lblTotalWidth = (formdata.dHeaderWidth + formdata.dValueWidth);
			formdata.headerWidth = ((formdata.dHeaderWidth / _lblTotalWidth) * 100);
			formdata.ValueWidth = ((formdata.dValueWidth / _lblTotalWidth) * 100);
			formdata.headerWidth = (formdata.headerWidth < 0) ? 0 : formdata.headerWidth;
			formdata.ValueWidth = (formdata.ValueWidth < 0) ? 0 : formdata.ValueWidth;
			_lblTotalWidth = formdata.headerWidth + formdata.ValueWidth;
		} else {
			formdata.headerWidth = (formdata.dHeaderWidth < 0) ? 0 : formdata.dHeaderWidth;
			formdata.ValueWidth = (formdata.dValueWidth < 0) ? 0 : formdata.dValueWidth;
			_lblTotalWidth = 5;//formdata.headerWidth + formdata.ValueWidth;
		}
		formdata.headerWidth = formdata.headerWidth + '%';
		formdata.ValueWidth = formdata.ValueWidth + '%';
		//COMMON.Log('getFormConfigChildView ---> formdata.headerWidth : ' + formdata.headerWidth);
		//COMMON.Log('getFormConfigChildView ---> formdata.ValueWidth  : ' + formdata.ValueWidth);
		formdata.HFontStyle = (formdata.HFontStyle == 1) ? 'bold' : formdata.HFontStyle;
		if (formdata.FieldControl != 'TAB') {
			var label = commonObj.BasicLabelObj.createLabel(formdata.newText, formdata.headerWidth, formdata.headerHeight, formdata.HFontSize, formdata.HFont, formdata.HFontStyle, this.argbToRGB(formdata.HForeColor), this.argbToRGB(formdata.HBackColor), formdata.HAlignment, formdata.HAlignment);
			label.top = headerTop;
			label.horizontalWrap = true;
			if (Ti.version < '8.0.0') {
				label.wordWrap = true;
			}
			label.touchEnabled = false;
			label.editable = false;
			label.enabled = false;
			label.left = 0;
			view.add(label);
		}
		test = '';
		try {
			if (formValues != undefined) {
				var obj = {};
				/******* 
				var obj1 = {};
				obj1.fieldName = 'Name';
				obj1.value = 'NATHAN';

				var obj2 = {};
				obj2.fieldName = 'year';
				obj2.value = '2016';
				var arr = [];
				arr.push(obj1);
				arr.push(obj2);

				var data1 = arr;//JSON.parse(arr);
				alert(data1);

				var index1 = arr[data1.map(function(d) { return d['fieldName']; }).indexOf('Name')].value;
				alert(index1);
				*******/
				/*
				try{
					//COMMON.Log('formValues : ' + JSON.stringify(formValues));
					//COMMON.Log('formValues : ' + formValues);
					test = formValues[formValues.map(function(d)
							{return d[fieldName];}).indexOf(formdata.fieldName)].value;
				}catch(e){
					test = '';
				}*/

				try {
					// var data1 = formValues;//JSON.parse(arr);
					// //COMMON.Log('data1 : ' + data1);
					// //COMMON.Log('data1 : ' + JSON.stringify(data1));
					// //COMMON.Log('VAL : ' + data1.map(function(d) { return d['fieldName1']; }).indexOf(formdata.fieldName.toUpperCase()));
					// //COMMON.Log('VAL : ' + formValues[data1.map(function(d) { return d['fieldName1']; }).indexOf(formdata.fieldName.toUpperCase())].value);
					commonObj.formDataIndex = -1;
					data1 = formValues;//JSON.parse(arr);
					commonObj.formDataIndex = data1.map(function (d) { return d['fieldName1']; }).indexOf(formdata.fieldName.toUpperCase());
					if (commonObj.formDataIndex > -1) {
						test = formValues[data1.map(function (d) { return d['fieldName1']; }).indexOf(formdata.fieldName.toUpperCase())].value;
						test = (test == null || test == undefined) ? '' : test;
					}
				} catch (e) {
					test = '';
				}
				/*
				for (var ctr = 0; ctr < formValues.length; ctr++) {
					obj = formValues[ctr];
					//COMMON.Log(obj.fieldName.toUpperCase() + ' == ' + formdata.fieldName.toUpperCase());
					//COMMON.Log('obj.value ---> ' + obj.value);
					if (obj.fieldName.toUpperCase() == formdata.fieldName.toUpperCase()){						
						test = (obj.value == null || obj.value == undefined) ? '' : obj.value;
						ctr = formValues.length;
					}
				}*/
			}
		} catch (e) {
			//COMMON.Log('ERROR --> ' + JSON.stringify(e));
			test = '';
		}
		sDataMemberType = formdata.DataMemberType;
		sDataMemberType = (sDataMemberType != null && sDataMemberType != undefined && sDataMemberType != '') ? sDataMemberType : 'STRING';
		//COMMON.Log('sDataMemberType --> ' + sDataMemberType);
		//COMMON.Log('obj.value ---> ' + test);
		if (sDataMemberType != 'STRING') {
			test = this.FormatDataMember(test, sDataMemberType);
		}
		//COMMON.Log('obj.value ---> ' + test);
		//COMMON.Log('formdata.FieldControl ---> ' + formdata.FieldControl);
		/*
		 [HeaderHeight] [int] NULL,
		 [HeaderWidth] [int] NULL,
		 
		 Tab 
			  Height = HeaderHeight
			  Width = HeaderWidth
		 	
		 TabContentView	
		 
		 [ValueHeight] [int] NULL,
		 [ValueWidth] [int] NULL,
		 */
		if (formdata.FieldControl == 'MULTIPLEPHOTO') {
			//Form-PromotionTracking_FORM_MULTIPLEPHOTO
			//Form-DisplayTrackingDetails_FORM_MULTIPLEPHOTO_MultiPhoto
			//var sMultiplePhotoView = TableViewBasicUIObj.createBasicView(null, 'transparent', formdata.ValueHeight, formdata.ValueWidth, null, null, null, null, 'horizontal');

			//var sMultiplePhotoView = TableViewBasicUIObj.createBasicView(null, 'transparent', 250, '100%', null, null, null, null, 'horizontal');
			//sMultiplePhotoView.borderWidth = 1;
			//sMultiplePhotoView.borderColor = '#ff0000';
			var sMultiplePhotoView = Ti.UI.createScrollView({
				contentWidth: 'auto',
				contentHeight: 'auto',
				height: formdata.ValueHeight,
				width: formdata.ValueWidth,
				top: 0,
				showVerticalScrollIndicator: true,
				showHorizontalScrollIndicator: true,
				scrollType: 'horizontal',
				minZoomScale: 1,
				maxZoomScale: 15,
				zoomScale: 1,
				oldZoom: 1,
				layout: 'horizontal'
			});
			sMultiplePhotoView.fieldControl = formdata.FieldControl.toUpperCase();
			sMultiplePhotoView.fieldName = formdata.fieldName;
			sMultiplePhotoView.dataMember = formdata.DataMember;
			sMultiplePhotoView.DataMemberType = formdata.DataMemberType;
			sMultiplePhotoView.screenName = screenName;

			/*
			 * select '' as ImgName
			 * select 'ITEMA1.png' as ImgName
			 * select 'ITEMA1.png' as ImgName UNION select 'ITEMA2.png' as ImgName
			 * 
			 */
			var query = ArrayOperations.prototype.getQueryConfigByScreenNameWithOrderText(screenName + "_FORM_MULTIPLEPHOTO_" + formdata.fieldName);
			var dMultiplePhotoIndex = 0;
			//var db = commonObj.dbConnectionObj.createDataBaseConnection();
			//COMMON.Log('4805 '+query);
			dbDataRows = Ti.App.dbConn.execute(query);
			var bImgFound = false;
			while (dbDataRows.isValidRow()) {
				bImgFound = false;
				test = dbDataRows.fieldByName('ImgName');
				test = (test == null || test == undefined || test == '') ? '' : test;
				if (test != '') {
					var imgPath = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'MultiplePhoto_tmp', test);
					try {
						var file = (bIsAndroid) ? Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, 'MultiplePhoto_tmp', test) : Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'MultiplePhoto_tmp', test);
						if (file.exists()) {
							bImgFound = true;
							var imgPath = file.nativePath;
						} else {
							//test = test.replace('png', 'simg');
							//return '/images/' + fileName;
							file = (bIsAndroid) ? Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, 'Photo', test) : Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'Photo', test);
							if (file.exists()) {
								bImgFound = true;
								var imgPath = file.nativePath;
							} else {
								test = test.replace('png', 'simg');
								//return '/images/' + fileName;
								file = (bIsAndroid) ? Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, 'MultiplePhoto_tmp', test) : Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'MultiplePhoto_tmp', test);
								if (file.exists()) {
									bImgFound = true;
									var imgPath = file.nativePath;
								} else {
									file = (bIsAndroid) ? Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, 'Photo', test) : Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'Photo', test);
									if (file.exists()) {
										bImgFound = true;
										var imgPath = file.nativePath;
									} else {
										//COMMON.Log('5314 Multipleimage not found');
									}
								}
							}
							//else{
							//	file = null;
							//	bImgFound = false;
							//	var imgPath = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'camdisplay.simg');//'/images/camdisplay.simg';
							//}
						}
					} catch (e) {
						bImgFound = false;
						var imgPath = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'camdisplay.simg');//'/images/camdisplay.simg';
					}
				} else {
					bImgFound = false;
					var imgPath = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'camdisplay.simg');//'/images/camdisplay.simg';
				}
				/*if(bImgFound == true){
					//var destFolder = Titanium.Filesystem.externalStorageDirectory + Ti.Filesystem.separator + 'Vvvv' + Titanium.Filesystem.separator + '43.jpg';
					//var fileList = Titanium.Filesystem.getFile(Titanium.Filesystem.externalStorageDirectory + Ti.Filesystem.separator + 'Fty' + Titanium.Filesystem.separator + '43.jpg');
					//fileList.copy(destFolder);
					var destFile = (bIsAndroid) ?  Ti.Filesystem.externalStorageDirectory + Ti.Filesystem.separator +'MultiplePhoto_tmp'+ Ti.Filesystem.separator + test : Ti.Filesystem.applicationDataDirectory + Ti.Filesystem.separator + test;
					file.copy(destFile);
					destFile = null;
					
					destFile = (bIsAndroid) ? Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, 'MultiplePhoto_tmp', test) : Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, test);
					imgPath = destFile.nativePath;
					file = null;
				}*/
				var _ImgCtrlWidth = 80, _ImgCtrlHeight = 100;
				if (formdata.DefaultValue != '' && formdata.DefaultValue != null) {
					var arrImgCtrl = formdata.DefaultValue;
					if (arrImgCtrl.indexOf('X') > -1) {
						arrImgCtrl = arrImgCtrl.split('X');
						_ImgCtrlWidth = arrImgCtrl[0];
						_ImgCtrlHeight = arrImgCtrl[1];
					}
				}
				_ImgCtrlWidth = _ImgCtrlWidth * Ti.App.dHeightRatio;
				_ImgCtrlHeight = _ImgCtrlHeight * Ti.App.dHeightRatio;
				//var ImgCtrlView = TableViewBasicUIObj.createBasicView(null, 'transparent', formdata.ValueHeight, (formdata.ValueHeight * 0.8), 0, 0, 0, 0, '');
				sMultiplePhotoView.ImgHeight = _ImgCtrlHeight;
				sMultiplePhotoView.ImgWidth = _ImgCtrlWidth;
				var ImgCtrlView = TableViewBasicUIObj.createBasicView(null, 'transparent', _ImgCtrlHeight, _ImgCtrlWidth, 0, 0, 0, 0, '');
				var img = new BasicImageView().createImageView(null, imgPath, 'auto', 'auto');//formdata.dValueWidth * pWidth, formdata.ValueHeight);
				img.height = _ImgCtrlHeight;
				img.width = _ImgCtrlWidth;
				img.left = 0;//_ImgCtrlWidth;
				img.enableZoomControls = false;
				img.fieldControl = formdata.FieldControl.toUpperCase();
				img.fieldName = formdata.fieldName;
				img.dataMember = formdata.DataMember;
				img.DataMemberType = formdata.DataMemberType;
				img.index = dMultiplePhotoIndex;
				img.bMultiplePhoto = true;
				img.borderWidth = 1;
				img.borderColor = '#e8e8e8';
				img.bImgFound = bImgFound;
				img.imgPath = imgPath;
				img.imgName = test;
				img.screenName = screenName;
				img.sControlType = 'MULTIPLEPHOTO';
				try {
					var dOrientation = dbDataRows.fieldByName('Orientation');
					dOrientation = (dOrientation == null || dOrientation == undefined || dOrientation == '') ? 1 : dOrientation;
				} catch (e) {
					var dOrientation = 1;
				}
				img.dOrientation = dOrientation;
				img.addEventListener('click', function (e) {
					try {
						//mController.showCamera(this, e.source.fieldName);
						if (this.bImgFound == false) {

							var qry = "SELECT * FROM ActionConfig WHERE Actionname = 'CameraIconClicked' and ScreenName=" + Ti.App.SQL.safeSQL(e.source.screenName) + " and FieldName = " + Ti.App.SQL.safeSQL(e.source.fieldName) + " and (ifnull(Access,'') ='' OR Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel) + ") ORDER By ActionName, DisplayNo";
							//COMMON.Log('6648 qry ---> ' + qry);
							var dbDataRows = Ti.App.configDBConn.execute(qry);
							if (dbDataRows.isValidRow()) {
								dbDataRows.close();
								//db.close();	
								mController.CameraIconClicked(this, e.source.fieldName);
								return false;
							}

							mController.showCamera(this, e.source.fieldName);
						} else {
							mController.showPreviewPopup(this, e.source.fieldName);
						}
					} catch (e) { }
				});
				sMultiplePhotoView.add(img);
				dMultiplePhotoIndex = dMultiplePhotoIndex + 1;
				dbDataRows.next();
			}
			dbDataRows.close();
			//db.close();
			view.add(sMultiplePhotoView);
		} if (formdata.FieldControl == 'MULTIPLEPHOTOWITHPREVIEW') {
			//Form-PromotionTracking_FORM_MULTIPLEPHOTO
			//Form-DisplayTrackingDetails_FORM_MULTIPLEPHOTO_MultiPhoto
			//var sMultiplePhotoView = TableViewBasicUIObj.createBasicView(null, 'transparent', formdata.ValueHeight, formdata.ValueWidth, null, null, null, null, 'horizontal');

			var sMultiplePhotoView = Ti.UI.createScrollView({
				contentWidth: 'auto',
				contentHeight: 'auto',
				height: formdata.ValueHeight,
				width: formdata.ValueWidth,
				top: 0,
				showVerticalScrollIndicator: true,
				showHorizontalScrollIndicator: true,
				scrollType: 'horizontal',
				minZoomScale: 1,
				maxZoomScale: 15,
				zoomScale: 1,
				oldZoom: 1,
				layout: 'horizontal'
			});

			//var sMultiplePhotoView = TableViewBasicUIObj.createBasicView(null, 'transparent', 250, '100%', null, null, null, null, 'horizontal');
			//sMultiplePhotoView.borderWidth = 1;
			//sMultiplePhotoView.borderColor = '#ff0000';
			/*var sMultiplePhotoView = Ti.UI.createScrollView({
			   contentWidth : 'auto',
			   contentHeight : 'auto',
			   height : formdata.ValueHeight,
			   top : 0,
			   showVerticalScrollIndicator : true,
			   showHorizontalScrollIndicator : true,
			   scrollType : 'vertical',
			   minZoomScale : 1,
			   maxZoomScale : 15,
			   zoomScale : 1,
			   oldZoom : 1,
		   });*/
			sMultiplePhotoView.fieldControl = formdata.FieldControl.toUpperCase();
			sMultiplePhotoView.fieldName = formdata.fieldName;
			sMultiplePhotoView.dataMember = formdata.DataMember;
			sMultiplePhotoView.DataMemberType = formdata.DataMemberType;
			sMultiplePhotoView.screenName = screenName;

			/*
			 * select '' as ImgName
			 * select 'ITEMA1.png' as ImgName
			 * select 'ITEMA1.png' as ImgName UNION select 'ITEMA2.png' as ImgName
			 * 
			 */
			var query = ArrayOperations.prototype.getQueryConfigByScreenNameWithOrderText(screenName + "_FORM_MULTIPLEPHOTO_" + formdata.fieldName);
			var dMultiplePhotoIndex = 0;
			//var db = commonObj.dbConnectionObj.createDataBaseConnection();
			//COMMON.Log('4805 '+query);
			dbDataRows = Ti.App.dbConn.execute(query);
			var bImgFound = false;
			while (dbDataRows.isValidRow()) {
				bImgFound = false;
				test = dbDataRows.fieldByName('ImgName');
				test = (test == null || test == undefined || test == '') ? '' : test;
				if (test != '') {
					var imgPath = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'MultiplePhoto_tmp', test);
					try {
						var file = (bIsAndroid) ? Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, 'MultiplePhoto_tmp', test) : Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'MultiplePhoto_tmp', test);
						if (file.exists()) {
							bImgFound = true;
							var imgPath = file.nativePath;
						} else {
							test = test.replace('png', 'simg');
							//return '/images/' + fileName;
							file = (bIsAndroid) ? Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, 'MultiplePhoto_tmp', test) : Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'MultiplePhoto_tmp', test);
							if (file.exists()) {
								bImgFound = true;
								var imgPath = file.nativePath;
							} else {
								file = null;
								bImgFound = false;
								//var imgPath = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'camdisplay.simg');//'/images/camdisplay.simg';
							}
						}
					} catch (e) {
						bImgFound = false;
						// var imgPath = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'camdisplay.simg');//'/images/camdisplay.simg';
					}
				} else {
					bImgFound = false;
					//var imgPath = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'camdisplay.simg');//'/images/camdisplay.simg';
				}
				/*if(bImgFound == true){
					//var destFolder = Titanium.Filesystem.externalStorageDirectory + Ti.Filesystem.separator + 'Vvvv' + Titanium.Filesystem.separator + '43.jpg';
					//var fileList = Titanium.Filesystem.getFile(Titanium.Filesystem.externalStorageDirectory + Ti.Filesystem.separator + 'Fty' + Titanium.Filesystem.separator + '43.jpg');
					//fileList.copy(destFolder);
					var destFile = (bIsAndroid) ?  Ti.Filesystem.externalStorageDirectory + Ti.Filesystem.separator +'MultiplePhoto_tmp'+ Ti.Filesystem.separator + test : Ti.Filesystem.applicationDataDirectory + Ti.Filesystem.separator + test;
					file.copy(destFile);
					destFile = null;
				    
					destFile = (bIsAndroid) ? Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, 'MultiplePhoto_tmp', test) : Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, test);
					imgPath = destFile.nativePath;
					file = null;
				}*/
				var _ImgCtrlWidth = 80, _ImgCtrlHeight = 100;
				if (formdata.DefaultValue != '' && formdata.DefaultValue != null) {
					var arrImgCtrl = formdata.DefaultValue;
					if (arrImgCtrl.indexOf('X') > -1) {
						arrImgCtrl = arrImgCtrl.split('X');
						_ImgCtrlWidth = arrImgCtrl[0];
						_ImgCtrlHeight = arrImgCtrl[1];
					}
				}
				_ImgCtrlWidth = _ImgCtrlWidth * Ti.App.dHeightRatio;
				_ImgCtrlHeight = _ImgCtrlHeight * Ti.App.dHeightRatio;
				//var ImgCtrlView = TableViewBasicUIObj.createBasicView(null, 'transparent', formdata.ValueHeight, (formdata.ValueHeight * 0.8), 0, 0, 0, 0, '');
				sMultiplePhotoView.ImgHeight = _ImgCtrlHeight;
				sMultiplePhotoView.ImgWidth = _ImgCtrlWidth;
				var ImgCtrlView = TableViewBasicUIObj.createBasicView(null, 'transparent', _ImgCtrlHeight, _ImgCtrlWidth, 0, 0, 0, 0, '');
				var img = new BasicImageView().createImageView(null, imgPath, 'auto', 'auto');//formdata.dValueWidth * pWidth, formdata.ValueHeight);
				img.height = _ImgCtrlHeight;
				img.width = _ImgCtrlWidth;
				img.enableZoomControls = false;
				img.fieldControl = formdata.FieldControl.toUpperCase();
				img.fieldName = formdata.fieldName;
				img.dataMember = formdata.DataMember;
				img.DataMemberType = formdata.DataMemberType;
				img.index = dMultiplePhotoIndex;
				img.bMultiplePhoto = true;
				img.borderWidth = 1;
				img.borderColor = '#e8e8e8';
				img.bImgFound = bImgFound;
				img.imgPath = imgPath;
				img.imgName = test;
				img.screenName = screenName;
				img.sControlType = 'MULTIPLEPHOTO';
				try {
					var dOrientation = dbDataRows.fieldByName('Orientation');
					dOrientation = (dOrientation == null || dOrientation == undefined || dOrientation == '') ? 1 : dOrientation;
				} catch (e) {
					var dOrientation = 1;
				}
				img.dOrientation = dOrientation;
				img.addEventListener('click', function (e) {
					try {
						//mController.showCamera(this, e.source.fieldName);
						if (this.bImgFound == false) {

						} else {
							mController.showPreviewPopupwithoutBtn(this, e.source.fieldName);
						}
					} catch (e) { }
				});
				sMultiplePhotoView.add(img);
				dMultiplePhotoIndex = dMultiplePhotoIndex + 1;
				dbDataRows.next();
			}
			dbDataRows.close();
			//db.close();
			view.add(sMultiplePhotoView);
		}
		else if (formdata.FieldControl == 'MULTIPLEPHOTOGALLERY') {
			//COMMON.Log("Multiple Photo");
			//Form-PromotionTracking_FORM_MULTIPLEPHOTO
			//Form-DisplayTrackingDetails_FORM_MULTIPLEPHOTO_MultiPhoto
			var sMultiplePhotoView = TableViewBasicUIObj.createBasicView(null, 'transparent', formdata.ValueHeight, formdata.ValueWidth, null, null, null, null, 'horizontal');
			//var sMultiplePhotoView = TableViewBasicUIObj.createBasicView(null, 'transparent', 250, '100%', null, null, null, null, 'horizontal');
			//sMultiplePhotoView.borderWidth = 1;
			//sMultiplePhotoView.borderColor = '#ff0000';
			/*var sMultiplePhotoView = Ti.UI.createScrollView({
			contentWidth : 'auto',
			contentHeight : 'auto',
			height : formdata.ValueHeight,
			top : 0,
			showVerticalScrollIndicator : true,
			showHorizontalScrollIndicator : true,
			scrollType : 'vertical',
			minZoomScale : 1,
			maxZoomScale : 15,
			zoomScale : 1,
			oldZoom : 1,
		});*/
			sMultiplePhotoView.fieldControl = formdata.FieldControl.toUpperCase();
			sMultiplePhotoView.fieldName = formdata.fieldName;
			sMultiplePhotoView.dataMember = formdata.DataMember;
			sMultiplePhotoView.DataMemberType = formdata.DataMemberType;
			sMultiplePhotoView.screenName = screenName;
			var dMultiplePhotoIndex = 0, bImgFound = false, sItemNo = Ti.App.sItemNo;
			var imgArr = [], imgPathArr = [], file = null;
			if (Ti.Platform.name === 'android') {
				var dir = Titanium.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, 'Items');
				var dir_img = Titanium.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, 'Images');
				var dir_imgs = Titanium.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, 'Images/Items');
			} else {
				var dir = Titanium.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'Items');
				var dir_img = Titanium.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, 'Images');
				var dir_imgs = Titanium.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, 'Images/Items');
			}
			var dirItems = dir.getDirectoryListing();
			var dirImages = dir_img.getDirectoryListing();
			var dirImagesItems = dir_imgs.getDirectoryListing();

			var dirItems = [];
			if (dir.exists()) {
				dirItems = dir.getDirectoryListing();
			}
			var dirImages = [];
			if (dir_img.exists()) {
				dirImages = dir_img.getDirectoryListing();
			}
			var dirImagesItems = [];
			if (dir_imgs.exists()) {
				dirImagesItems = dir_imgs.getDirectoryListing();
			}


			for (var i = 0; i < dirItems.length; i++) {
				if (dirItems[i].indexOf(sItemNo) >= 0) {
					imgArr.push(dirItems[i]);
				}
			}
			for (var i = 0; i < dirImages.length; i++) {
				if (dirImages[i].indexOf(sItemNo) >= 0) {
					imgArr.push(dirImages[i]);
				}
			}
			for (var i = 0; i < dirImagesItems.length; i++) {
				if (dirImagesItems[i].indexOf(sItemNo) >= 0) {
					imgArr.push(dirImagesItems[i]);
				}
			}


			//COMMON.Log("imgArr length"+imgArr.length);			
			//imgArr.push(sItemNo+".jpg");
			//COMMON.Log(JSON.stringify("ServiceImage's =>"+imgArr));
			try {
				var _LoopLen1 = imgArr.length;
				var imageName = '';
				for (var ctr = 0; ctr < _LoopLen1; ctr++) {
					imageName = imgArr[ctr];
					if (Ti.Platform.name === 'android') {
						//file = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, 'Items', imageName);
						file = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, 'Items', imageName);

						if (file.exists()) {
							file = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, 'Items', imageName);
						} else {
							file = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, 'Images', imageName);
						}

						if (file.exists()) {
							file = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, 'Images', imageName);
						} else {
							file = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, 'Images/Items', imageName);
						}

					} else {
						//file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'Items', imageName);
						//file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'Items', imageName);
						file = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, 'Items', imageName);

						if (file.exists()) {
							file = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, 'Items', imageName);
						} else {
							file = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, 'Images', imageName);
						}

						if (file.exists()) {
							file = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, 'Images', imageName);
						} else {
							file = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, 'Images/Items', imageName);
						}
					}
					if (file.exists()) {
						file.read();
						imgPathArr.push(file.nativePath);
						//_this.imgPath = file.nativePath;
						bImgFound = true;
						var imgPath = file.nativePath;
						var _ImgCtrlWidth = 80, _ImgCtrlHeight = 100;
						if (formdata.DefaultValue != '' && formdata.DefaultValue != null) {
							var arrImgCtrl = formdata.DefaultValue;
							if (arrImgCtrl.indexOf('X') > -1) {
								arrImgCtrl = arrImgCtrl.split('X');
								_ImgCtrlWidth = arrImgCtrl[0];
								_ImgCtrlHeight = arrImgCtrl[1];
							}
						}
						_ImgCtrlWidth = _ImgCtrlWidth * Ti.App.dHeightRatio;
						_ImgCtrlHeight = _ImgCtrlHeight * Ti.App.dHeightRatio;
						//var ImgCtrlView = TableViewBasicUIObj.createBasicView(null, 'transparent', formdata.ValueHeight, (formdata.ValueHeight * 0.8), 0, 0, 0, 0, '');
						sMultiplePhotoView.ImgHeight = _ImgCtrlHeight;
						sMultiplePhotoView.ImgWidth = _ImgCtrlWidth;
						var ImgCtrlView = TableViewBasicUIObj.createBasicView(null, 'transparent', _ImgCtrlHeight, _ImgCtrlWidth, 0, 0, 0, 0, '');
						var img = new BasicImageView().createImageView(null, imgPath, 'auto', 'auto');//formdata.dValueWidth * pWidth, formdata.ValueHeight);
						img.height = _ImgCtrlHeight;
						img.width = _ImgCtrlWidth;
						img.enableZoomControls = false;
						img.left = '3%';
						img.top = '3%';
						img.fieldControl = formdata.FieldControl.toUpperCase();
						img.fieldName = formdata.fieldName;
						img.dataMember = formdata.DataMember;
						img.DataMemberType = formdata.DataMemberType;
						img.index = dMultiplePhotoIndex;
						img.bMultiplePhoto = true;
						img.borderWidth = 2;
						img.borderRadius = 5,
							img.borderColor = '#e8e8e8';
						img.bImgFound = bImgFound;
						img.imgPath = imgPath;
						img.imgName = sItemNo;
						img.screenName = screenName;
						img.sControlType = 'MULTIPLEPHOTO';
						try {
							var dOrientation = 1;
							dOrientation = (dOrientation == null || dOrientation == undefined || dOrientation == '') ? 1 : dOrientation;
						} catch (e) {
							var dOrientation = 1;
						}
						img.dOrientation = dOrientation;
						img.addEventListener('click', function (e) {
							try {
								//mController.showCamera(this, e.source.fieldName);

								if (this.bImgFound == false) {
									mController.showCamera(this, e.source.fieldName);
								} else {
									mController.showPreviewPopup(this, e.source.fieldName, imgPathArr);
								}
							} catch (e) { }
						});
						sMultiplePhotoView.add(img);
						dMultiplePhotoIndex = dMultiplePhotoIndex + 1;
					}
				}
			} catch (e) {
				//COMMON.Log("Error "+e);
			}
			if (imgArr.length > 1) {
				view.add(sMultiplePhotoView);
			}
			else {
				mController.showPreviewPopup(img, formdata.fieldName);
			}
		} else if (formdata.FieldControl == 'TABGROUP') {
			var dTabCnt = 0;
			var query = ArrayOperations.prototype.getQueryConfigByScreenNameWithOrderText(screenName + "_FORM_TABGROUP_TAB_" + formdata.fieldName);
			//var db = commonObj.dbConnectionObj.createDataBaseConnection();
			dbDataRows = Ti.App.dbConn.execute(query);
			while (dbDataRows.isValidRow()) {
				dTabCnt = dTabCnt + 1;
				dbDataRows.next();
			}
			dbDataRows.close();
			//db.close();
			dTabCnt = (dTabCnt == null || dTabCnt == undefined || dTabCnt == "" || dTabCnt == 0) ? 1 : dTabCnt;
			//var dTabWidth = Math.floor(99.8/dTabCnt);
			var dTabWidth = 100 / dTabCnt;
			var sTab = TableViewBasicUIObj.createBasicView(null, 'transparent', formdata.ValueHeight, '100%', null, null, null, null, 'vertical');
			sTab.fieldName = formdata.fieldName;
			var sTabHeaderView = TableViewBasicUIObj.createBasicView(null, 'transparent', formdata.ValueHeight, '100%', null, null, null, null, 'horizontal');
			sTabHeaderView.fieldName = formdata.fieldName;
			sTabHeaderView.add(sTabHeaderView);
			//Customers_FORM_TABGROUP_TAB	
			var query = ArrayOperations.prototype.getQueryConfigByScreenNameWithOrderText(screenName + "_FORM_TABGROUP_TAB_" + formdata.fieldName);
			//var db = commonObj.dbConnectionObj.createDataBaseConnection();
			dbDataRows = Ti.App.dbConn.execute(query);
			var tabIndex = 0;
			while (dbDataRows.isValidRow()) {
				if (tabIndex == dTabCnt - 1) {
					dTabWidth = (99.8 - (dTabWidth * tabIndex));
				}
				var field = commonObj.BasicButtonObj.createButton(dbDataRows.fieldByName('Descriptions'), dTabWidth + '%', formdata.ValueHeight, formdata.VFontSize, '#e8e8e8');
				field.code = dbDataRows.fieldByName('Value');
				field.dTabCnt = dTabCnt;
				field.left = 0;
				field.borderWidth = 1;
				field.sTab = sTab;
				field.index = tabIndex;
				field.dTabWidth = dTabWidth;
				field.screenName = screenName;
				if (tabIndex > 0) {
					field.backgroundImage = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'whiteBtnBg.png');
					field.color = '#000';
				}
				field.addEventListener('click', function (e) {
					try {
						var sTabView = e.source.sTab;
						var _TabField = "";
						var _LoopLen1 = sTabView.children[0].children.length;
						for (var i = 0; i < _LoopLen1; i++) {
							_TabField = sTabView.children[0].children[i];
							_TabField.backgroundImage = Ti.App.ImageCacheObj.getImage('MobileSalesCache', (e.source.index == i) ? 'btnColor.png' : 'whiteBtnBg.png');
							_TabField.color = (e.source.index == i) ? '#e8e8e8' : '#000';
						}
						//COMMON.Log('e.source.code : ' + e.source.code + ' : e.source.index : ' + e.source.index);
						//COMMON.Log('e.source.screenName : '+ e.source.screenName +', e.source.code : ' + e.source.code + ', : e.source.index : ' + e.source.index);
						Ti.App.ActiveTabGroup = e.source.code;
						if (e.source.index == 0) {
							ArrayOperations.prototype.setTableHeaderFieldNames(e.source.screenName);
							ArrayOperations.prototype.loadListConfigArr(e.source.screenName);
						} else {
							ArrayOperations.prototype.setTableHeaderFieldNames(e.source.screenName + "_" + e.source.code);
							ArrayOperations.prototype.loadListConfigArr(e.source.screenName + "_" + e.source.code);
						}
						try {
							mController.formTabGroupChanged(this, e.source);
						} catch (e) { }
						mView.setScrollViewPage(e.source.index);
					} catch (e) { }
				});
				sTabHeaderView.add(field);
				tabIndex++;
				dbDataRows.next();
			}
			dbDataRows.close();
			//db.close();
			view.add(sTab);
		} else if (formdata.FieldControl == 'TAB') {
			try {
				view.top = 0;//headerTop;
				view.width = '100%';
				view.left = 0;
				//COMMON.Log('TAB view.width --> ' + view.width);	
				var dTabCnt = 0;
				var query = ArrayOperations.prototype.getQueryConfigByScreenNameWithOrderText(screenName + "_FORM_TAB_" + formdata.fieldName);
				//COMMON.Log('TAB QRY --> ' + query);
				//var db = commonObj.dbConnectionObj.createDataBaseConnection();
				dbDataRows = Ti.App.dbConn.execute(query);
				while (dbDataRows.isValidRow()) {
					dTabCnt = dTabCnt + 1;
					dbDataRows.next();
				}
				dbDataRows.close();
				//db.close();
				dTabCnt = (dTabCnt == null || dTabCnt == undefined || dTabCnt == "" || dTabCnt == 0) ? 1 : dTabCnt;
				//var dTabWidth = Math.floor(99.8/dTabCnt);
				var dTabWidth = 100 / dTabCnt;
				var FormConfig = require('/utils/FormConfig');
				var FORMCONFIG = new FormConfig(mView, systemTableConfig);
				//COMMON.Log('dTabWidth : ' + dTabWidth + ' - dTabCnt : ' + dTabCnt);
				//COMMON.Log(formdata.headerHeight + ' - ' + formdata.ValueHeight);
				var sTab = TableViewBasicUIObj.createBasicView(null, 'transparent', (formdata.headerHeight + formdata.ValueHeight), '100%', null, null, null, null, 'vertical');
				sTab.broderWidth = 2;
				sTab.broderColor = '#f0f';
				var sTabHeaderView = TableViewBasicUIObj.createBasicView(null, 'transparent', formdata.headerHeight, '100%', null, null, null, null, 'horizontal');
				sTabHeaderView.backgroundColor = '#e8e8e8';
				sTab.add(sTabHeaderView);
				var TabViewCont = Ti.UI.createScrollableView({
					showPagingControl: true,
					width: '100%',//Ti.UI.FILL,
					height: formdata.ValueHeight,
					backgroundColor: "transparent",
					scrollingEnabled: false,
					top: 1//top : 6
				});
				TabViewCont.borderWidth = 2;
				TabViewCont.borderColor = '#fff';
				sTab.add(TabViewCont);
				//Customers_FORM_TABGROUP_TAB	
				var query = ArrayOperations.prototype.getQueryConfigByScreenNameWithOrderText(screenName + "_FORM_TAB_" + formdata.fieldName);
				//COMMON.Log('TAB QRY2 --> ' + query);
				//var db = commonObj.dbConnectionObj.createDataBaseConnection();
				dbDataRows = Ti.App.dbConn.execute(query);
				var tabIndex = 0;
				var arrTabViewCont = [];
				while (dbDataRows.isValidRow()) {
					if (tabIndex == dTabCnt - 1) {
						dTabWidth = (99.8 - (dTabWidth * tabIndex));
					}
					var tabField = commonObj.BasicButtonObj.createButton(dbDataRows.fieldByName('Descriptions'), dTabWidth + '%', formdata.headerHeight, formdata.VFontSize, '#e8e8e8');
					tabField.code = dbDataRows.fieldByName('Value');
					tabField.dTabCnt = dTabCnt;
					tabField.left = 0;
					tabField.borderWidth = 1;
					tabField.sTab = sTab;
					tabField.index = tabIndex;
					tabField.dTabWidth = dTabWidth;
					tabField.screenName = screenName;
					if (tabIndex > 0) {
						tabField.backgroundImage = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'whiteBtnBg.png');
						tabField.color = '#000';
					}
					tabField.addEventListener('click', function (e) {
						try {
							var sTabView = e.source.sTab;
							var _TabField = "";
							var _LoopLen1 = sTabView.children[0].children.length;
							for (var i = 0; i < _LoopLen1; i++) {
								_TabField = sTabView.children[0].children[i];
								_TabField.backgroundImage = Ti.App.ImageCacheObj.getImage('MobileSalesCache', (e.source.index == i) ? 'btnColor.png' : 'whiteBtnBg.png');
								_TabField.color = (e.source.index == i) ? '#e8e8e8' : '#000';
							}
							//COMMON.Log('e.source.code : ' + e.source.code + ' : e.source.index : ' + e.source.index);
							var _tmpView = sTabView.children[1];
							_tmpView.setCurrentPage(e.source.index);
						} catch (e) {
						}
					});
					sTabHeaderView.add(tabField);
					var View5 = Ti.UI.createScrollView({
						contentWidth: 'auto',
						contentHeight: 'auto',
						height: '100%',
						top: 0,
						showVerticalScrollIndicator: true,
						showHorizontalScrollIndicator: true,
						scrollType: 'vertical',
						minZoomScale: 1,
						maxZoomScale: 15,
						zoomScale: 1,
						oldZoom: 1,
					});
					View5.backgroundColor = (tabIndex % 2 == 0) ? '#ff0' : '#0ff';
					View5.height = '100%';
					View5.width = '100%';
					View5.add(FORMCONFIG.getTabViewContent(screenName + "_FORM_TAB_" + formdata.fieldName + "_" + dbDataRows.fieldByName('Value')));
					arrTabViewCont.push(View5);
					tabIndex++;
					dbDataRows.next();
				}
				dbDataRows.close();
				//db.close();
				TabViewCont.views = arrTabViewCont;
				view.add(sTab);
			} catch (e) {
				alert('e ---> ' + e);
			}
		} else if (formdata.FieldControl == 'DASHBOARD') {
			var sDashView = TableViewBasicUIObj.createBasicView(null, 'transparent', formdata.ValueHeight, formdata.ValueWidth, null, null, null, null, null);
			sDashView.dViewHeight = formdata.ValueHeight;
			sDashView.dViewWidth = Ti.App.DeviceWidth * 0.93;
			var GridCont = Ti.UI.createScrollableView({
				showPagingControl: true,
				width: '100%',//Ti.UI.FILL,
				//top :  Ti.App.CONFIG.get('HEADER_HEIGHT'),//'10%',
				height: '100%',//Ti.UI.FILL,
				//bottom : '10%',
				backgroundColor: "transparent",
				zIndex: 1
			});
			if (formdata.DefaultValue == '' || formdata.DefaultValue == null) {
				DETAILS.set('DASHBOARD_PAGE_NAME', 'Main');
				Ti.App.ARRAYOPERATION.UpdateSystemValue("sDashboardPageName", "Main");
			} else {
				DETAILS.set('DASHBOARD_PAGE_NAME', formdata.DefaultValue);
				Ti.App.ARRAYOPERATION.UpdateSystemValue("sDashboardPageName", formdata.DefaultValue);
			}


			//GridCont.views = (this.getDashboardView(formdata.ValueHeight, Ti.App.DeviceWidth * (formdata.dValueWidth/100) ));
			GridCont.views = (this.getDashboardView(formdata.ValueHeight, Ti.App.DeviceWidth * 0.93, formdata.fieldName, formdata.DataMember, screenName));
			//GridCont.views = (this.getDashboardView(formdata.ValueHeight, Ti.App.DeviceWidth) );
			sDashView.add(GridCont);
			view.add(sDashView);
		} else if (formdata.FieldControl == 'LABEL' || formdata.FieldControl == 'AUTOCOMPLETE') {
			test = (test == null || test == undefined) ? '' : test;
			//COMMON.Log('4738 label');
			//var field = commonObj.FormTextFieldObj.createTextField(true, test, formdata.ValueWidth, formdata.ValueHeight, formdata.VFontSize, formdata.HFont, this.argbToRGB(formdata.VForeColor), this.argbToRGB(formdata.VBackColor), formdata.VAlignment, false, 'TEXT');
			//var field = commonObj.BasicLabelObj.createLabel(test, formdata.ValueWidth, formdata.ValueHeight, formdata.VFontSize, formdata.HFont, formdata.HFontStyle, this.argbToRGB(formdata.VForeColor), this.argbToRGB(formdata.VBackColor), formdata.VAlignment, formdata.VAlignment);
			var field = new TextArea().createTextAreaWithFontStyle(test, formdata.ValueWidth, formdata.ValueHeight, formdata.VFontSize, this.argbToRGB(formdata.VForeColor), this.argbToRGB(formdata.VBackColor), formdata.VAlignment, formdata.VFontStyle);
			field.value = test;
			field.top = valueTop;
			field.NewText = formdata.newText;
			field.fieldControl = formdata.FieldControl.toUpperCase();
			field.editable = false;
			//field.enabled = false;
			//field.touchenabled = false;
			field.bReadOnly = false;
			if (formdata.showBorder == 1) {
				field.borderColor = this.argbToRGB(formdata.borderColor);
				field.borderRadius = 10;
				field.borderWidth = 1;
			}
			field.left = formdata.headerWidth;
			field.fieldName = formdata.fieldName;
			field.dataMember = formdata.DataMember;
			field.DataMemberType = formdata.DataMemberType;
			field.index = ctr;
			field.zIndex = 99;
			//try{
			//if(screenName.indexOf('Form-') > -1){
			//field.backgroundColor = Ti.App.formFieldBackColor;//'#dae5f5';//'#c1d5f5';//only for P&G
			//}
			//}catch(e){}
			if (formdata.FieldControl == 'AUTOCOMPLETE') {
				field.borderRadius = 10;
				field.borderWidth = 1;
				//field.backgroundColor = '#e6e6e6';
				field.backgroundImage = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'FormCombobox.simg');
			}
			field.addEventListener('touchstart', function (e) {
				try {
					//COMMON.Log('formLabelClicked');
					if (e.source.fieldControl == 'AUTOCOMPLETE') {
						Ti.App.AutoCompleteField = e.source;
						try {
							var PopUpView = Ti.App.BasicViewObj.createBasicView(null, 'transparent', Ti.UI.SIZE, Ti.UI.SIZE, 0, 0, 0, 0, '');

							var OverlayView = Ti.App.BasicViewObj.createBasicView(null, '#000', '100%', '100%', 0, 0, 0, 0, '');
							OverlayView.opacity = 0.5;
							PopUpView.add(OverlayView);

							/*var view = Ti.App.BasicViewObj.createBasicView(null, '#b0b0b0', '50%', '80%', null, null, '4%', null, 'vertical');
							view.borderColor = '#e8e8e8';
							//view.borderRadius = 12;
							view.borderWidth = 2;*/

							var view = Ti.UI.createView({
								width: '90%',
								height: '60%',
								top: '20%',
								backgroundColor: '#fff',//a6a6a6',
								layout: 'vertical',
								borderRadius: 6,
								borderWidth: 1,
								borderColor: '#fff',
							});


							var label1 = Titanium.UI.createLabel({
								text: ' ' + e.source.NewText,//'Update Info'
								color: '#fff',
								font: { fontSize: 23 * Ti.App.dHeightRatio, fontFamily: 'Tahoma' },//'Helvetica Neue'},
								textAlign: 'left',//'center',
								width: '100%',
								height: '10%',
								//font: {fontSize:18},
								borderRadius: 6,
								borderWidth: 0,
								borderColor: '#333',
								backgroundColor: '#333',//800000',
								backgroundImage: Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'redbutton.png')
							});
							view.add(label1);

							var tableView = new BasicTableView().createTableView();
							var data = [];
							/*data[0] = Ti.UI.createTableViewRow({hasChild:true,title:'Row 1'});
							data[1] = Ti.UI.createTableViewRow({hasDetail:true,title:'Row 2'});
							data[2] = Ti.UI.createTableViewRow({hasCheck:true,title:'Row 3'});
							data[3] = Ti.UI.createTableViewRow({title:'Row 4'});*/


							commonObj.str = '';
							commonObj.str = '%' + commonObj.str + '%';
							Ti.App.sAutoCompelteStr = commonObj.str;
							data = [];
							var row1 = '', lbl = '';
							commonObj.sAutoCompleteQry = ArrayOperations.prototype.getQueryConfigByScreenNameWithOrderText("USER_AUTOCOMPLETE_Items");
							if (commonObj.sAutoCompleteQry == null || commonObj.sAutoCompleteQry == undefined || commonObj.sAutoCompleteQry == '') {
								commonObj.sAutoCompleteQry = "select * From Item WHERE lower(itemno) like lower(" + Ti.App.SQL.safeSQL(commonObj.str) + ") OR lower(itemname) like lower(" + Ti.App.SQL.safeSQL(commonObj.str) + ")";
							}
							commonObj._dbDataRows1 = Ti.App.dbConn.execute(commonObj.sAutoCompleteQry);
							while (commonObj._dbDataRows1.isValidRow()) {
								lbl = commonObj.BasicLabelObj.createLabel(commonObj._dbDataRows1.fieldByName('ItemName'), '100%', 50 * Ti.App.dHeightRatio, 20 * Ti.App.dHeightRatio, '', 'normal', '#000', '#e8e8e8', 2, 2);
								row1 = Ti.UI.createTableViewRow({ width: '100%', height: 50 * Ti.App.dHeightRatio });
								row1.ItemName = commonObj._dbDataRows1.fieldByName('ItemName');
								row1.add(lbl);
								data.push(row1);
								commonObj._dbDataRows1.next();
							}
							commonObj._dbDataRows1.close();
							commonObj._dbDataRows1 = null;

							tableView.data = data;
							tableView.height = '66%';
							//tableView.height = '96%';
							tableView.top = '1%';
							tableView.left = '2%';
							var btnView = Ti.App.BasicViewObj.createBasicView(null, 'transparent', '10%', '100%', null, null, null, null, 'horizontal');
							btnView.top = 0;

							Ti.App.sAutoCompelteStr = '';
							//var SearchField = commonObj.TextFieldObj.createTextField(false, '', '75%', '100%', 20 * Ti.App.dHeightRatio, '', '#000', '#e8e8e8', 2, false, 'TEXT');
							var SearchField = commonObj.TextFieldObj.createTextField(false, '', '96%', 54 * Ti.App.dHeightRatio, 20 * Ti.App.dHeightRatio, '', '#000', '#fff', 2, false, 'TEXT');
							SearchField.borderWidth = 1;
							SearchField.borderColor = '#333';
							SearchField.left = '2%';
							SearchField.top = '2%';
							SearchField.addEventListener('change', function (e) {
								commonObj.str = e.source.value;
								commonObj.str = (commonObj.str == null || commonObj.str == undefined || commonObj.str == '') ? '' : commonObj.str;
								if (commonObj.str.length >= 3) {
									commonObj.str = '%' + commonObj.str + '%';
									Ti.App.sAutoCompelteStr = commonObj.str;
									data = [];
									var row1 = '', lbl = '';

									commonObj.sAutoCompleteQry = ArrayOperations.prototype.getQueryConfigByScreenNameWithOrderText("USER_AUTOCOMPLETE_Items");
									if (commonObj.sAutoCompleteQry == null || commonObj.sAutoCompleteQry == undefined || commonObj.sAutoCompleteQry == '') {
										commonObj.sAutoCompleteQry = "select * From Item WHERE lower(itemno) like lower(" + Ti.App.SQL.safeSQL(commonObj.str) + ") OR lower(itemname) like lower(" + Ti.App.SQL.safeSQL(commonObj.str) + ")";
									}
									commonObj._dbDataRows1 = Ti.App.dbConn.execute(commonObj.sAutoCompleteQry);
									while (commonObj._dbDataRows1.isValidRow()) {
										lbl = commonObj.BasicLabelObj.createLabel(commonObj._dbDataRows1.fieldByName('ItemName'), '100%', 50 * Ti.App.dHeightRatio, 20 * Ti.App.dHeightRatio, '', 'normal', '#000', '#e8e8e8', 2, 2);
										row1 = Ti.UI.createTableViewRow({ width: '100%', height: 50 * Ti.App.dHeightRatio });
										row1.ItemName = commonObj._dbDataRows1.fieldByName('ItemName');
										row1.add(lbl);
										data.push(row1);
										commonObj._dbDataRows1.next();
									}
									commonObj._dbDataRows1.close();
									commonObj._dbDataRows1 = null;
									tableView.data = data;
								}
							});
							btnView.add(SearchField);
							tableView.addEventListener('click', function (e) {
								//alert(e.index + ' - ' + e.row.index + ' - ' + e.row.ItemName);
								Ti.UI.Android.hideSoftKeyboard();
								if (e.row != null && e.row != undefined) {
									if (e.row.ItemName != null && e.row.ItemName != undefined && e.row.ItemName != '') {
										SearchField.value = e.row.ItemName;
									}
								}
							});
							/*var BasicButton = require('/BaseComponents/BasicButton');
							var retakeBtn = new BasicButton().createButton('>', '20%', '100%', 20 * Ti.App.dHeightRatio, 'white');
							retakeBtn.left = '3%';
							btnView.add(retakeBtn);
							retakeBtn.addEventListener('touchend', function(e) {
								
								Ti.App.AutoCompleteField.value = SearchField.value;
								Ti.App.AutoCompleteField.code = SearchField.value;
								Ti.App.AutoCompleteField.text = SearchField.value;
								
								//alert('CancelBtn');
								view.remove(btnView);
								view.remove(tableView);
								tableView = null;
								OverlayView = null;
								view = null;
								btnView = null;
								Ti.App.currentWin.remove(PopUpView);
								PopUpView = null;
							});*/
							view.add(btnView);
							tableView.backgroundColor = '#FFF'
							view.add(tableView);


							var BasicButton = require('/BaseComponents/BasicButton');
							var submitBtn = new BasicButton().createButton(' OK ', '15%', 50 * Ti.App.dHeightRatio, 20 * Ti.App.dHeightRatio, 'white');
							submitBtn.left = '80%';
							submitBtn.top = '2%';
							submitBtn.bottom = '2%';
							view.add(submitBtn);

							var BlankLabel = Titanium.UI.createLabel({
								text: '',
								color: '#fff',
								font: { fontSize: 23 * Ti.App.dHeightRatio, fontFamily: 'Tahoma' },//'Helvetica Neue'},
								textAlign: 'left',//'center',
								width: '100%',
								height: '2%',
								//font: {fontSize:18},
								backgroundColor: 'transparent',
							});
							view.add(BlankLabel);

							submitBtn.addEventListener('touchend', function (e) {

								Ti.App.AutoCompleteField.value = SearchField.value;
								Ti.App.AutoCompleteField.code = SearchField.value;
								Ti.App.AutoCompleteField.text = SearchField.value;

								//alert('CancelBtn');
								view.remove(btnView);
								view.remove(tableView);
								tableView = null;
								OverlayView = null;
								view = null;
								btnView = null;
								Ti.App.currentWin.remove(PopUpView);
								PopUpView = null;
							});
							PopUpView.add(view);

							Ti.App.currentWin.add(PopUpView);
						} catch (e) {
							//alert('e --> ' + e);
						}

					} else {
						mController.formLabelClicked(this, e.source.fieldName, e.source.index, e.source.value);
					}

				} catch (e) {
					//COMMON.Log('formLabelClicked :' + e);
				}
			});
			/*field.addEventListener('click', function(e) {	
	    		try{
	    			//COMMON.Log("formLabelClicked click");
	    			//alert('formLabelClicked');
	    			mController.formLabelClicked(this, e.source.fieldName, e.source.index, e.source.value);
	    		}catch(e){
	    			//COMMON.Log("error "+e);
	    		}
			});
			*/
			view.add(field);
		} else if (formdata.FieldControl == 'SEARCH') {
			sKeyType = 'TEXT';
			/*try{
				var sDataMemberType = formdata.DataMemberType;
				if(sDataMemberType.toUpperCase() == 'NUMBER'){
					sKeyType= 'NUMBER';
				}
			}catch(e){
				sKeyType = 'TEXT';
			}*/
			var field = commonObj.FormTextFieldObj.createTextField(true, test, formdata.ValueWidth, formdata.ValueHeight, formdata.VFontSize, formdata.HFont, this.argbToRGB(formdata.VForeColor), this.argbToRGB(formdata.VBackColor), formdata.VAlignment, false, sKeyType);
			field.borderColor = 'transparent';
			field.font = {
				fontSize: formdata.VFontSize,
				fontWeight: 'bold'
			};
			field.prevBorderColor = 'transparent';
			if (formdata.showBorder == 1) {
				field.borderColor = this.argbToRGB(formdata.borderColor);
				field.prevBorderColor = this.argbToRGB(formdata.borderColor);
				field.borderWidth = 6;
			}
			field.top = valueTop;
			field.fieldControl = formdata.FieldControl.toUpperCase();
			field.left = formdata.headerWidth;
			field.fieldName = formdata.fieldName;
			field.dataMember = formdata.DataMember;
			field.DataMemberType = formdata.DataMemberType;
			field.index = ctr;
			field.bReadOnly = false;
			field.returnKeyType = Ti.UI.RETURNKEY_NEXT;
			field.keyboardType = Titanium.UI.KEYBOARD_DEFAULT;
			field.prevbackgroundColor = field.backgroundColor;
			field.dPreValue = test;
			field.DefaultValue = (formdata.DefaultValue == null || formdata.DefaultValue == undefined) ? '' : formdata.DefaultValue;
			field.addEventListener('change', function (e) {
				Ti.App.bFrmSearchStart = true;
				this.backgroundColor = '#ffe6e6';
				commonObj.str = e.source.value;
				commonObj.str = (commonObj.str == null || commonObj.str == undefined || commonObj.str == '') ? '' : commonObj.str;
				if (commonObj.str == '') {
					this.borderColor = this.prevBorderColor;//'#e60000';
				} else {
					this.borderColor = '#e60000';
				}
				this.dPreValue = e.source.value;
				if (mView != null && mView != undefined) {
					mView.setselectedRowIndex(-1);//e.source.iIndex);
				}

				/*
				if(commonObj.str.length >= 3){
					try{
						mController.formClearSearchField();
					}catch(e){}
					try {
							mController.formSearchFieldLostFocus(this, e.source.fieldName, e.source.index, e.source.value);
							//mController.formSearchFieldChange(this, e.source.fieldName, e.source.index, e.source.value);
					} catch(e) {}
					formDataArray[this.index] = this.value;
				}
				//*/
				//Ti.App.bFrmSearchStart = false;
			});
			field.addEventListener('focus', function (e) {
				try {
					//**/
					Ti.App.bFrmSearchStart = false;
					if (mView != null && mView != undefined) {
						mView.setselectedRowIndex(-1);//e.source.iIndex);
					}
					//**/
					this.borderColor = '#e60000';//this.prevBorderColor;
					this.backgroundColor = '#ffe6e6';
					//if(e.source.bReadOnly == true){
					//this.blur();
					//return "";
					//}
					/*if(Ti.App.bFocusedTxtfield  != null){
						Ti.App.bFocusedTxtfield.blur();
						Ti.App.bFocusedTxtfield  = null;
						return '';
					}else{
						Ti.App.bFocusedTxtfield = this;
					}*/
					mController.formSearchFieldFocus(this, e.source.fieldName, e.source.index, e.source.value);
					commonObj.tblLen = ArrayOperations.prototype.getAllRows(0).length;//SI.getAllRows(0).length;
					commonObj.tblLen = (commonObj.tblLen == null || commonObj.tblLen == undefined || commonObj.tblLen == '') ? 0 : commonObj.tblLen;
					if (commonObj.tblLen > 0) {
						commonObj.tbl = Ti.App.currentTable;
						commonObj.tbl.scrollToTop(COMMON.getRowIndex());
					}
				} catch (e) { }
			});
			var salesItemfirstrowFocus = COMMON.CheckBooleanField(Ti.App.ARRAYOPERATION.getSystemValue('salesItemfirstrowFocus'));
			field.addEventListener('blur', function (e) {
				try {
					Ti.App.bFrmSearchStart = false;
					if (COMMON.avoidMultipleClick()) {
						return '';
					}
					//COMMON.Log('Ti.App.Firstblurcalled '+Ti.App.Firstblurcalled);
					if(Ti.App.Firstblurcalled == true){
						Ti.App.Firstblurcalled = false;
						return '';
					}
					//COMMON.Log('blur');
					commonObj.str = e.source.value;
					commonObj.str = (commonObj.str == null || commonObj.str == undefined || commonObj.str == '') ? '' : commonObj.str;
					this.dPreValue = e.source.value;
					//*
					try {
						mController.formClearSearchField();
					} catch (e) { }

					if (commonObj.str != '') {
						try {
							mController.formSearchFieldLostFocus(this, e.source.fieldName, e.source.index, e.source.value);
							//mController.formSearchFieldChange(this, e.source.fieldName, e.source.index, e.source.value);
						} catch (e) { }
					}
					/***/
					formDataArray[this.index] = this.value;
					this.borderColor = this.prevBorderColor;
					this.backgroundColor = this.prevbackgroundColor;//'#ffe6e6';
					if (ArrayOperations.prototype.getAllRows(0).length > 0) {
						if (mView != null && mView != undefined) {
							commonObj.dSelectedTblRowIndex = mView.getSelectedRowIndex();
							//COMMON.Log('dSelectedTblRowIndex --> ' + commonObj.dSelectedTblRowIndex);
							commonObj.dSelectedTblRowIndex = (commonObj.dSelectedTblRowIndex != null && commonObj.dSelectedTblRowIndex != undefined && commonObj.dSelectedTblRowIndex != '') ? commonObj.dSelectedTblRowIndex : -1;
							if (commonObj.dSelectedTblRowIndex > -1) {
								return "";
							}
						}
						commonObj.tbl = Ti.App.currentTable;
						commonObj.tbl.scrollToTop(COMMON.getRowIndex());
						//mController.textFieldNextFocus();
						/**/
						commonObj.tblLen = ArrayOperations.prototype.getAllRows(0).length;//SI.getAllRows(0).length;
						commonObj.tblLen = (commonObj.tblLen == null || commonObj.tblLen == undefined || commonObj.tblLen == '') ? 0 : commonObj.tblLen;
						if (commonObj.tblLen > 0) {
							//commonObj.tbl = Ti.App.currentTable;
							//commonObj.tbl.scrollToTop(COMMON.getRowIndex());
							commonObj._rows = ''; commonObj._field = ''; commonObj._fieldControl = '';
							//mController.textFieldNextFocus();
							//NEW 26 Aug 2016
							for (var _i = 0; _i < fieldNames.length; _i++) {
								commonObj._rows = Ti.App.currentTable.data[0].rows;
								commonObj._field = commonObj._rows[COMMON.getRowIndex()].children[0].children[_i];
								commonObj._fieldControl = commonObj._field.fieldControl;
								if (commonObj._fieldControl == 'EDITABLETEXTBOX') {
									if (mView != null && mView != undefined) {
										mView.setselectedRowIndex(COMMON.getRowIndex());//e.source.iIndex);
									}
									if(salesItemfirstrowFocus){
										commonObj._field.focus();//7.5.0//09Jan
									}
									_i = fieldNames.length;
									//return rows[rowIndex].children[0].children[fieldNames.indexOf(fieldName)].value;
								}
							}
							//END
							commonObj._rows = '';
							commonObj._rows = null;
							commonObj._field = '';
							commonObj._field = null;
							commonObj._fieldControl = '';
							commonObj._fieldControl = null;
						}
						commonObj.tbl = [];
						commonObj.tbl = null;
						commonObj.tblLen = 0;
						commonObj.tblLen = null;
						//**/
					}
				} catch (e) { }
				/*
				//if(Ti.App.bFocusedTxtfield == null || Ti.App.bFocusedTxtfield == false){
					//return '';
				//}
				var str = e.source.value;
				str = (str == null || str == undefined || str == '') ? '' : str;
				if(str != ''){
					try{
						mController.formClearSearchField();
					}catch(e){}
					try {
						//if(e.source.bReadOnly == true){
							//return "";
						//}
						Ti.App.bFocusedTxtfield = null;
						mController.formSearchFieldLostFocus(this, e.source.fieldName, e.source.index, e.source.value);
						
						mController.textFieldNextFocus();
					} catch(e) {}
				}
				*/
			});
			field.addEventListener('return', function (e) {
				Ti.App.bFrmSearchStart = false;
				this.borderColor = this.prevBorderColor;
				this.blur();
				/*try{
					mController.formClearSearchField();
				}catch(e){}
				try {
					Ti.App.bFocusedTxtfield = null;
					mController.formSearchFieldLostFocus(this, e.source.fieldName, e.source.index, e.source.value);
					mController.textFieldNextFocus();
				} catch(e) {
				}*/
			});
			field.borderRadius = 10;
			field.borderWidth = 1;
			view.add(field);


			var qry = "SELECT * FROM QueryConfig WHERE  ScreenName=" + Ti.App.SQL.safeSQL(formdata.screenName + "_FORM_FILTER_" + formdata.fieldName);
			//COMMON.Log('6648 qry ---> ' + qry);
			var dbDataRows = Ti.App.configDBConn.execute(qry);
			if (dbDataRows.isValidRow()) {
				dbDataRows.close();

				var FilterBtn = commonObj.BasicButtonObj.createButton("", "9%", formdata.ValueHeight - 6, formdata.VFontSize, '#e8e8e8');
				FilterBtn.backgroundImage = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'searchicon.png');
				FilterBtn.top = valueTop + 3;
				FilterBtn.borderWidth = 1;
				FilterBtn.fieldControl = formdata.FieldControl.toUpperCase();
				FilterBtn.left = '70%';//formdata.headerWidth;
				FilterBtn.fieldName = formdata.fieldName;
				FilterBtn.dataMember = formdata.DataMember;
				FilterBtn.DataMemberType = formdata.DataMemberType;
				FilterBtn.screenName = formdata.screenName;
				FilterBtn.index = ctr;
				FilterBtn.bReadOnly = false;
				FilterBtn.field = field;
				FilterBtn.addEventListener('click', function (e) {
					if (COMMON.isPlatformAndroid()) {
						Ti.UI.Android.hideSoftKeyboard();
					}

					commonObj.mScreenNameFilterQry = e.source.screenName + '_FORM_FILTER_' + e.source.fieldName;
					//COMMON.Log('commonObj.mScreenNameFilterQry '+commonObj.mScreenNameFilterQry);
					commonObj.mScreenNameFilterQryTxt = ArrayOperations.prototype.getQueryConfigByScreenNameWithOrderText(commonObj.mScreenNameFilterQry);
					//COMMON.Log('commonObj.mScreenNameFilterQryTxt '+commonObj.mScreenNameFilterQryTxt);

					var menuName = [];
					var menuCode = [];
					commonObj.dbDataRows1 = Ti.App.configDBConn.execute(commonObj.mScreenNameFilterQryTxt);
					while (commonObj.dbDataRows1.isValidRow()) {
						try {
							menuCode.push(commonObj.dbDataRows1.fieldByName('code'));
							menuName.push(commonObj.dbDataRows1.fieldByName('text'));
						} catch (e) { }
						commonObj.dbDataRows1.next();
					}
					commonObj.dbDataRows1.close();

					var optionsDialogOpts = {
						options: menuName,
						title: 'Category',//'Simplr SALES',
						field: e.source.field,
						fieldName: e.source.field.fieldName,
						screenName: e.source.field.screenName,
						dIndex: e.source.field.index,

					};
					optionsDialogOpts.selectedIndex = -1;
					var dialog = Titanium.UI.createOptionDialog(optionsDialogOpts);
					dialog.addEventListener('click', function (e) {

						//alert(e.source.dIndex + ' - ' + menuCode[e.index] + ' - ' + menuName[e.index]);

						try {
							commonObj.tblLen = ArrayOperations.prototype.getAllRows(0).length;
							commonObj.tblLen = (commonObj.tblLen == null || commonObj.tblLen == undefined || commonObj.tblLen == '') ? 0 : commonObj.tblLen;
							if (commonObj.tblLen > 0) {
								commonObj.tbl = Ti.App.currentTable;
								commonObj.tbl.scrollToTop(0);
							}
						} catch (e) { }

						Ti.App.bReadOnlyRowTextField = true;
						try {
							mController.formClearSearchField();
						} catch (e) { }
						try {
							//this.dPreValue = e.source.value;
							//if(e.source.field.dPreValue != e.source.field.value || e.source.field.value != ''){
							e.source.field.value = menuName[e.index];//'';
							e.source.field.dPreValue = menuName[e.index];//'';
							//mController.formSearchFieldChange(e.source.field, e.source.fieldName, e.source.index, '');

							//COMMON.Log('e.source.field : ' + e.source.field + ' - e.source.fieldName : ' + e.source.fieldName);

							mController.formSearchFieldLostFocus(e.source.field, e.source.fieldName, -1, menuName[e.index]);
							//}
						} catch (e) { }
						//formDataArray[this.index] = '';

						Ti.App.bReadOnlyRowTextField = false;

					});
					dialog.show();
				});
				view.add(FilterBtn);
			}

			var ScanBtn = commonObj.BasicButtonObj.createButton("", "9%", formdata.ValueHeight, formdata.VFontSize, '#e8e8e8');
			if (COMMON.isPlatformAndroid()) {
				ScanBtn.backgroundImage = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'BarcodeReader.png');
			}else{
				ScanBtn.width = 0;
			}
			ScanBtn.top = valueTop;
			ScanBtn.borderWidth = 0;//;1;
			ScanBtn.fieldControl = formdata.FieldControl.toUpperCase();
			ScanBtn.left = '80%';//formdata.headerWidth;
			ScanBtn.fieldName = formdata.fieldName;
			ScanBtn.dataMember = formdata.DataMember;
			ScanBtn.DataMemberType = formdata.DataMemberType;
			ScanBtn.index = ctr;
			ScanBtn.bReadOnly = false;
			ScanBtn.field = field;
			ScanBtn.screenName = screenName;
			Ti.App.SearchBarcodeActivated = false;
			ScanBtn.addEventListener('click', function (e) {
				if (COMMON.isPlatformAndroid()) {
					Ti.UI.Android.hideSoftKeyboard();
				}else{
					return "";
				}

				Ti.App.bReadOnlyRowTextField = true;

				try {
					mController.formClearSearchField();
				} catch (e) { }
				Ti.App.SearchBarcodeActivated = true;
				e.source.field.value = '';
				e.source.field.dPreValue = '';
				Ti.App.UISearchField = e.source.field;
				var barcodeFormat = "";
				barcodeFormat = Ti.App.ARRAYOPERATION.getSystemValue('barcodeFormat');
				barcodeFormat = (barcodeFormat != null && barcodeFormat != undefined && barcodeFormat != '') ? barcodeFormat : 'FORMAT_QR_CODE,FORMAT_CODE_128';

				var barcodeList = {
					FORMAT_NONE: BarcodeData.FORMAT_NONE,
					FORMAT_QR_CODE: BarcodeData.FORMAT_QR_CODE,
					FORMAT_CODE_128: BarcodeData.FORMAT_CODE_128,
					FORMAT_CODE_39: BarcodeData.FORMAT_CODE_39,
					FORMAT_DATA_MATRIX: BarcodeData.FORMAT_DATA_MATRIX,
					FORMAT_UPC_E: BarcodeData.FORMAT_UPC_E,
					FORMAT_UPC_A: BarcodeData.FORMAT_UPC_A,
					FORMAT_EAN_8: BarcodeData.FORMAT_EAN_8,
					FORMAT_EAN_13: BarcodeData.FORMAT_EAN_13,
					FORMAT_ITF: BarcodeData.FORMAT_ITF,
				};
				var barcodeFormatarr = [];
				barcodeFormatarr = barcodeFormat.split(",");

				if (Ti.App.ScanBarCode == true) {
					Ti.App.ScanBarCode = false;

					BarcodeData.addEventListener('success', BarcodeEvent);
				}

				function BarcodeEvent(e) {

					//Ti.App.SearchBarcodeActivated = false;    
					//COMMON.Log('scan data' + e.result);
					Ti.App.Firstblurcalled = false;
					sQRCode = e.result;
					sQRCode = (sQRCode == null || sQRCode == undefined) ? '' : sQRCode;
					if (sQRCode != '') {
						//alert('sQRCode --> ' + sQRCode);
						Ti.App.UISearchField.focus();
						Ti.App.UISearchField.value = sQRCode;
						Ti.App.UISearchField.dPreValue = sQRCode;
						//var qry = "SELECT * FROM QueryConfig WHERE ScreenName="+Ti.App.SQL.safeSQL(Ti.App.currentScreenName+"_VALIDATESEARCH");
						//Ti.App.UISearchField.blur();
						//COMMON.Log('Ti.App.UISearchField --> ' + Ti.App.UISearchField);
						setTimeout(function () {
							Ti.App.UISearchField.fireEvent('blur');//7.5.0
							Ti.App.Firstblurcalled=true;
							//Ti.App.UISearchField.fireEvent('change');//7.5.0
							BarcodeData.removeEventListener('success', BarcodeEvent);
							//COMMON.Log("LINE 6221");
							Ti.App.ScanBarCode = true;
						}, 200);

						//COMMON.Log('blur');
						//Ti.App.UISearchField.fireEvent('blur');//7.5.0
						/*if(sQRCode != '' &&  Ti.App.UISearchField != undefined &&  Ti.App.UISearchField != null){
							try {
								//COMMON.Log('Ti.App.UISearchField.dataMember ' +Ti.App.UISearchField.dataMember);
								mController.formSearchFieldLostFocus(Ti.App.UISearchField,Ti.App.UISearchField.dataMember , 0, sQRCode);
								//mController.formSearchFieldChange(this, e.source.fieldName, e.source.index, e.source.value);
							} catch(e) { 
								//COMMON.Log('5560 error '+e);
							}
						}*/
					} else {
						Ti.App.SearchBarcodeActivated = false;
						COMMON.showAlert("Invalid Barcode!", ['OK'], null);
						return false;
					}

				}

				var barcode_format = [];
				var barcodeFormateVal;
				for (var i = 0; i < barcodeFormatarr.length; i++) {
					try {
						barcode_format.push(barcodeList[barcodeFormatarr[i]]);
						//COMMON.Log("dictionary  "+barcode_format[i]);
					} catch (e) {
						//COMMON.Log("error "+e);
					}
				}
				try {
					BarcodeData.capture({
						acceptedFormats: barcode_format,
						//UIField : e.source.field,				
					});
				} catch (e) {
					Ti.App.SearchBarcodeActivated = false;
					//COMMON.Log("error "+e);
				}

				/*try {
					//this.dPreValue = e.source.value;
					//if(e.source.field.dPreValue != e.source.field.value || e.source.field.value != ''){
						e.source.field.value = '';
						e.source.field.dPreValue = '';
						//mController.formSearchFieldChange(e.source.field, e.source.fieldName, e.source.index, '');
						mController.formSearchFieldLostFocus(e.source.field, e.source.fieldName, e.source.index, '');
					//}
				} catch(e) {}*/
				//formDataArray[this.index] = '';
				Ti.App.bReadOnlyRowTextField = false;
			});

			if (screenName != 'PointOfSales') {
				view.add(ScanBtn);
			}
			var ClearBtn = commonObj.BasicButtonObj.createButton("", "9%", formdata.ValueHeight, formdata.VFontSize, '#e8e8e8');
			ClearBtn.backgroundImage = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'ClearSearchButton.png');
			ClearBtn.top = valueTop;
			ClearBtn.borderWidth = 0;
			ClearBtn.fieldControl = formdata.FieldControl.toUpperCase();
			ClearBtn.left = '90%';//formdata.headerWidth;
			ClearBtn.fieldName = formdata.fieldName;
			ClearBtn.dataMember = formdata.DataMember;
			ClearBtn.DataMemberType = formdata.DataMemberType;
			ClearBtn.index = ctr;
			ClearBtn.bReadOnly = false;
			ClearBtn.field = field;
			ClearBtn.addEventListener('click', function (e) {
				if (COMMON.isPlatformAndroid()) {
					Ti.UI.Android.hideSoftKeyboard();
				}

				try {
					commonObj.tblLen = ArrayOperations.prototype.getAllRows(0).length;
					commonObj.tblLen = (commonObj.tblLen == null || commonObj.tblLen == undefined || commonObj.tblLen == '') ? 0 : commonObj.tblLen;
					if (commonObj.tblLen > 0) {
						commonObj.tbl = Ti.App.currentTable;
						commonObj.tbl.scrollToTop(0);
					}
				} catch (e) { }

				Ti.App.bReadOnlyRowTextField = true;
				try {
					mController.formClearSearchField();
				} catch (e) { }
				try {
					//this.dPreValue = e.source.value;
					//if(e.source.field.dPreValue != e.source.field.value || e.source.field.value != ''){
					e.source.field.value = '';
					e.source.field.dPreValue = '';
					//mController.formSearchFieldChange(e.source.field, e.source.fieldName, e.source.index, '');
				
					mController.formSearchFieldLostFocus(e.source.field, e.source.fieldName, e.source.index, '');
					//}
				} catch (e) { }
				//formDataArray[this.index] = '';
				Ti.App.bReadOnlyRowTextField = false;
			});
			view.add(ClearBtn);
		} else if (formdata.FieldControl == 'TEXTBOX') {
			sKeyType = 'TEXT';
			try {
				var sDataMemberType = formdata.DataMemberType;
				////COMMON.Log('sDataMemberType '+sDataMemberType);
				if (sDataMemberType.toUpperCase() == 'NUMBER') {
					sKeyType = 'NUMBER';
				}
			} catch (e) {
				sKeyType = 'TEXT';
			}
			////COMMON.Log('sKeyType '+sKeyType);
			var field = commonObj.FormTextFieldObj.createTextField(true, test, formdata.ValueWidth, formdata.ValueHeight, formdata.VFontSize, formdata.HFont, this.argbToRGB(formdata.VForeColor), this.argbToRGB(formdata.VBackColor), formdata.VAlignment, false, sKeyType);
			if (formdata.showBorder == 1) {
				field.borderColor = this.argbToRGB(formdata.borderColor);
			}
			field.top = valueTop;
			field.borderWidth = 1;
			field.fieldControl = formdata.FieldControl.toUpperCase();
			field.left = formdata.headerWidth;
			field.fieldName = formdata.fieldName;
			field.dataMember = formdata.DataMember;
			field.DataMemberType = formdata.DataMemberType;
			field.index = ctr;
			field.bReadOnly = false;
			field.IsMandatory = formdata.IsMandatory;
			field.maxLength = formdata.MaxCharLength;
			field.addEventListener('change', function (e) {
				try {
					Ti.App.bformTextFieldLostFocus = false;
					if (!COMMON.isNumber(e.source.value) && e.source.DataMemberType == 'NUMBER') {
						COMMON.showAlert("Please Enter Valid Number.", ["OK"], null);
						//COMMON.showAlert("ArrayOperation -> Please Enter Valid Character.", ["OK"], null);							 
						this.value = '';
						return false;
					}
					mController.formTextFieldChange(this, e.source.fieldName, e.source.index, e.source.value);
				} catch (e) { }
				formDataArray[this.index] = this.value;
			});
			field.addEventListener('focus', function (e) {
				try {
					Ti.App.bformTextFieldLostFocus = false;
					if (e.source.bReadOnly == true) {
						this.blur();
						return "";
					}
					this.currentFocus = true;
					/*if(Ti.App.bFocusedTxtfield  != null){
						Ti.App.bFocusedTxtfield.blur();
						Ti.App.bFocusedTxtfield  = false;
					}else{
						Ti.App.bFocusedTxtfield = this;
					}*/
					// added this line on 21 Nov 2013 to keep track of focused item.
					mController.formTextFieldFocus(this, e.source.fieldName, e.source.index, e.source.value);
				} catch (e) { }
			});
			field.addEventListener('blur', function (e) {
				try {
					if (Ti.App.bformTextFieldLostFocus == true) {
						Ti.App.bformTextFieldLostFocus = false;
						return "";
					}
					if (e.source.bReadOnly == true) {
						return "";
					}
					this.currentFocus = false;
					Ti.App.bFocusedTxtfield = null;
					// added this line on 21 Nov 2013 to keep track of focused item.
					mController.formTextFieldLostFocus(this, e.source.fieldName, e.source.index, e.source.value);
				} catch (e) { }
			});
			field.addEventListener('return', function (e) {
				try {
					this.currentFocus = false;
					Ti.App.bFocusedTxtfield = null;
					Ti.App.bformTextFieldLostFocus = true;
					mController.formTextFieldLostFocus(this, e.source.fieldName, e.source.index, e.source.value);
				} catch (e) {
				}
			});
			field.borderRadius = 10;
			field.borderWidth = 1;
			if (formdata.fieldName == "GiroVal" || formdata.fieldName == "CashVal" || formdata.fieldName == "TransferVal" || formdata.fieldName == "PotonganVal") {
				field.backgroundColor = '#303030';
				field.color = '#e8e8e8';
				field.fontSize = 22;//#e8e8e8';
			}
			view.add(field);
		} else if (formdata.FieldControl == 'PASSWORD') {
			sKeyType = 'TEXT';
			try {
				var sDataMemberType = formdata.DataMemberType;
				if (sDataMemberType.toUpperCase() == 'NUMBER') {
					sKeyType = 'NUMBER';
				}
			} catch (e) {
				sKeyType = 'TEXT';
			}
			var field = commonObj.FormTextFieldObj.createTextField(true, test, formdata.ValueWidth, formdata.ValueHeight, formdata.VFontSize, formdata.HFont, this.argbToRGB(formdata.VForeColor), this.argbToRGB(formdata.VBackColor), formdata.VAlignment, true, sKeyType);
			if (formdata.showBorder == 1) {
				field.borderColor = this.argbToRGB(formdata.borderColor);
			}
			field.top = valueTop;
			field.borderWidth = 1;
			field.fieldControl = formdata.FieldControl.toUpperCase();
			field.left = formdata.headerWidth;
			field.fieldName = formdata.fieldName;
			field.dataMember = formdata.DataMember;
			field.DataMemberType = formdata.DataMemberType;
			field.index = ctr;
			field.bReadOnly = false;
			field.IsMandatory = formdata.IsMandatory;
			field.maxLength = formdata.MaxCharLength;
			field.addEventListener('change', function (e) {
				try {
					Ti.App.bformTextFieldLostFocus = false;
					mController.formTextFieldChange(this, e.source.fieldName, e.source.index, e.source.value);
				} catch (e) { }
				formDataArray[this.index] = this.value;
			});
			field.addEventListener('focus', function (e) {
				try {
					//COMMON.Log('Focus e.source.bReadOnly '+e.source.bReadOnly +' fieldname :'+ e.source.fieldName );
					Ti.App.bformTextFieldLostFocus = false;
					if (e.source.bReadOnly == true) {
						//COMMON.Log('5230 blur');
						this.blur();
						return "";
					}
					this.currentFocus = true;
					/*if(Ti.App.bFocusedTxtfield  != null){
						Ti.App.bFocusedTxtfield.blur();
						Ti.App.bFocusedTxtfield  = false;
					}else{
						Ti.App.bFocusedTxtfield = this;
					}*/
					// added this line on 21 Nov 2013 to keep track of focused item.
					mController.formTextFieldFocus(this, e.source.fieldName, e.source.index, e.source.value);
				} catch (e) { }
			});
			field.addEventListener('blur', function (e) {
				try {
					//COMMON.Log('Blur e.source.bReadOnly '+e.source.bReadOnly +' fieldname :'+ e.source.fieldName );
					if (Ti.App.bformTextFieldLostFocus == true) {
						Ti.App.bformTextFieldLostFocus = false;
						return "";
					}
					if (e.source.bReadOnly == true) {
						return "";
					}
					this.currentFocus = false;
					Ti.App.bFocusedTxtfield = null;
					// added this line on 21 Nov 2013 to keep track of focused item.
					mController.formTextFieldLostFocus(this, e.source.fieldName, e.source.index, e.source.value);
				} catch (e) { }
			});
			field.addEventListener('return', function (e) {
				try {
					//COMMON.Log('return - fieldname :'+ e.source.fieldName );
					//e.source.blur();
					//return "";
					this.currentFocus = false;
					Ti.App.bFocusedTxtfield = null;
					Ti.App.bformTextFieldLostFocus = true;
					mController.formTextFieldLostFocus(this, e.source.fieldName, e.source.index, e.source.value);
				} catch (e) {
				}
			});
			field.borderRadius = 10;
			field.borderWidth = 1;
			if (formdata.fieldName == "GiroVal" || formdata.fieldName == "CashVal" || formdata.fieldName == "TransferVal" || formdata.fieldName == "PotonganVal") {
				field.backgroundColor = '#303030';
				field.color = '#e8e8e8';
				field.fontSize = 22;//#e8e8e8';
			}
			view.add(field);
		} else if (formdata.FieldControl == 'TEXTAREA') {
			//var field = commonObj.FormTextFieldObj.createTextField(true, test, formdata.ValueWidth, formdata.ValueHeight, formdata.VFontSize, formdata.HFont, this.argbToRGB(formdata.VForeColor), this.argbToRGB(formdata.VBackColor), formdata.VAlignment, false, 'TEXT');
			var field = new TextArea().createTextArea(test, formdata.ValueWidth, formdata.ValueHeight, formdata.VFontSize, this.argbToRGB(formdata.VForeColor), this.argbToRGB(formdata.VBackColor), formdata.VAlignment);
			if (formdata.showBorder == 1) {
				field.borderColor = this.argbToRGB(formdata.borderColor);
			}
			field.top = valueTop;
			field.borderWidth = 1;
			field.fieldControl = formdata.FieldControl.toUpperCase();
			//field.color = '#000';
			field.left = formdata.headerWidth;
			field.fieldName = formdata.fieldName;
			field.dataMember = formdata.DataMember;
			field.DataMemberType = formdata.DataMemberType;
			field.index = ctr;
			field.bReadOnly = false;
			field.IsMandatory = formdata.IsMandatory;
			field.maxLength = formdata.MaxCharLength;
			field.addEventListener('change', function (e) {
				try {
					mController.formTextFieldChange(this, e.source.fieldName, e.source.index, e.source.value);
				} catch (e) {
				}
				formDataArray[this.index] = this.value;
			});
			field.addEventListener('focus', function (e) {
				try {
					if (e.source.bReadOnly == true) {
						this.blur();
						return "";
					}
					this.currentFocus = true;
					// added this line on 21 Nov 2013 to keep track of focused item.
					mController.formTextFieldFocus(this, e.source.fieldName, e.source.index, e.source.value);
				} catch (e) { }
			});
			field.addEventListener('blur', function (e) {
				try {
					if (e.source.bReadOnly == true) {
						return "";
					}
					this.currentFocus = false;
					// added this line on 21 Nov 2013 to keep track of focused item.
					mController.formTextFieldLostFocus(this, e.source.fieldName, e.source.index, e.source.value);
				} catch (e) { }
			});
			field.borderRadius = 10;
			field.borderWidth = 1;
			view.add(field);
		} else if (formdata.FieldControl == 'BUTTONCOMBO') {
			var field = commonObj.FormTextFieldObj.createTextField(true, test, formdata.ValueWidth, formdata.ValueHeight, formdata.VFontSize, formdata.HFont, this.argbToRGB(formdata.VForeColor), this.argbToRGB(formdata.VBackColor), formdata.VAlignment, false, 'TEXT');
			field.value = '';
			field.top = valueTop;
			field.fieldControl = formdata.FieldControl.toUpperCase();
			field.editable = false;
			field.bReadOnly = false;
			if (formdata.showBorder == 1) {
				field.borderColor = this.argbToRGB(formdata.borderColor);
			}
			field.borderWidth = 1;
			field.left = formdata.headerWidth;
			field.fieldName = formdata.fieldName;
			field.dataMember = formdata.DataMember;
			field.DataMemberType = formdata.DataMemberType;
			field.ComboBoxData = [];
			field.ComboBoxActiveData = [];
			field.index = ctr;
			commonObj.mScreenName = formdata.screenName + '_FORM_COMBOBOX_' + formdata.fieldName;
			commonObj.qry = this.getQueryConfigByScreenName(commonObj.mScreenName);
			commonObj.qry = mView.formatQueryString(commonObj.qry, commonObj.mScreenName);
			if (commonObj.qry != undefined) {
				comboData = this.createComboBoxData(commonObj.qry);
				try {
					if (comboData.length > 0) {
						field.ComboBoxData = comboData;
						if (test == null || test == "" || test == undefined) {
							field.value = comboData[0].displayText;
							field.code = comboData[0].ComboBoxCode;
						} else {
							var comboDatalength = comboData.length;
							for (var comboCnt = 0; comboCnt < comboDatalength; comboCnt++) {
								if (test == comboData[comboCnt].ComboBoxCode) {
									field.value = comboData[comboCnt].displayText;
									field.code = comboData[comboCnt].ComboBoxCode;
									comboCnt = comboDatalength;
								}
							}
						}
					}
				} catch (e) { }
			}
			field.addEventListener('click', function (e) {
				try {
					if (e.source.bReadOnly == true) {
						return "";
					}
					var view1 = new BasicMenuWithMultiSelection().show(mController, this.ComboBoxData, this.ComboBoxActiveData, true, this);
					Ti.App.currentWin.add(view1);
				} catch (e) {
				}
			});
			field.borderRadius = 10;
			field.borderWidth = 1;
			field.backgroundColor = '#e6e6e6';
			view.add(field);
			var img = new BasicImageView().createImageView(null, Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'downArrow.png'), (Math.ceil(formdata.ValueHeight / 1.5)), (Math.ceil(formdata.ValueHeight / 2)));
			img.top = (formdata.ValueHeight - (Math.ceil(formdata.ValueHeight / 2))) / 2;
			//img.left = (_lblTotalWidth - ((Math.ceil(formdata.ValueHeight/1.5))/100)*19*(parseFloat(_lblTotalWidth)/parseFloat(view.dWidth))) + '%';
			img.left = (_lblTotalWidth - ((Math.ceil(formdata.ValueHeight / 1.5)) / 100) * 13 * (parseFloat(_lblTotalWidth) / parseFloat(view.dWidth))) + '%';
			//img.left = (bIsAndroid) ? (_lblTotalWidth - 7) + '%' : (_lblTotalWidth - 5) + '%';  
			view.add(img);
		} else if (formdata.FieldControl == 'COMBOBOX') {//COMBOBOX
			//var field = commonObj.BasicLabelObj.createLabel('Please Select ' + formdata.newText, formdata.ValueWidth, formdata.ValueHeight, formdata.HFontSize, formdata.HFont, formdata.HFontStyle, formdata.HForeColorName, formdata.VBackColor, 2, formdata.HAlignment);
			var field = commonObj.FormTextFieldObj.createTextField(true, test, formdata.ValueWidth, formdata.ValueHeight, formdata.VFontSize, formdata.HFont, this.argbToRGB(formdata.VForeColor), this.argbToRGB(formdata.VBackColor), formdata.VAlignment, false, 'TEXT');
			field.top = valueTop;
			if (formdata.showBorder == 1) {
				field.borderColor = this.argbToRGB(formdata.borderColor);
			}
			field.borderWidth = 1;
			field.editable = false;
			field.left = formdata.headerWidth;
			field.fieldControl = formdata.FieldControl.toUpperCase();
			field.iIndex = ctr;
			if (formValues != undefined && formValues[formdata.fieldName] != undefined) {
				field.value = formValues[formdata.fieldName];
			}
			field.title = formdata.newText;
			field.fieldName = formdata.fieldName;
			field.dataMember = formdata.DataMember;
			field.screenName = formdata.screenName;
			field.DataMemberType = formdata.DataMemberType;
			field.searchType = 0;
			field.code = '';
			field.bReadOnly = false;
			commonObj.mScreenNameComboQry = formdata.screenName + '_FORM_COMBOBOX_' + formdata.fieldName;
			commonObj.mScreenNameComboQryTxt = this.getQueryConfigByScreenNameWithOrderText(commonObj.mScreenNameComboQry);
			//COMMON.Log('commonObj.mScreenNameComboQryTxt '+commonObj.mScreenNameComboQryTxt);
			//qry = mView.formatQueryString(qry, mScreenName);
			if (commonObj.mScreenNameComboQryTxt != undefined && commonObj.mScreenNameComboQryTxt != null && commonObj.mScreenNameComboQryTxt != '') {
				comboData = this.createComboBoxData(commonObj.mScreenNameComboQryTxt);
				try {
					if (comboData.length > 0) {
						field.ComboBoxData = comboData;
						if (test == null || test == "" || test == undefined) {
							field.value = comboData[0].displayText;
							field.code = comboData[0].ComboBoxCode;
						} else {
							var comboDatalength = comboData.length;
							for (var comboCnt = 0; comboCnt < comboDatalength; comboCnt++) {
								if (test == comboData[comboCnt].ComboBoxCode) {
									field.value = comboData[comboCnt].displayText;
									field.code = comboData[comboCnt].ComboBoxCode;
									comboCnt = comboDatalength;
								}
							}
						}
					}
				} catch (e) { }
			}
			field.addEventListener('touchstart', function (e) {
				if (e.source.bReadOnly == true) {
					return "";
				}
				//+2018-08-12
				if (COMMON.isPlatformAndroid()) {
					Ti.UI.Android.hideSoftKeyboard();
				}
				try {
					//if (this.ComboBoxData.length == 0 && this.title == '') {
					if (this.ComboBoxData.length == 0) {
						////COMMON.Log('9254 : ' + this.fieldName.toUpperCase() + ' Not Found !!!');
						//COMMON.showAlert(this.fieldName.toUpperCase() + ' NOT FOUND !!!', ['OK'], null);
						//COMMON.showAlert('MSG_FORM_COMBOBOX_NOTFOUND_'+this.fieldName.toUpperCase(), ['OK'], null);
						return false;
					}
				} catch (e) { return false; }
				new ComboBoxForm().show(this.title, mController, this.ComboBoxData, this, this.screenName, this.fieldName, this.searchType, this.dataMember);
			});

			field.addEventListener('change', function (e) {
				try {
					if (e.source.bReadOnly == true) {
						return "";
					}
					mController.formComboChange(this, e.source.fieldName, e.source.index, e.source.value);
				} catch (e) { }
			});
			field.borderRadius = 10;
			field.borderWidth = 1;
			//field.backgroundColor = '#e6e6e6';
			field.backgroundImage = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'FormCombobox.simg');
			view.add(field);
			/*var img = new BasicImageView().createImageView(null, Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'downArrow.png'), (Math.ceil(formdata.ValueHeight/1.5)), (Math.ceil(formdata.ValueHeight/2)));
			img.top = (formdata.ValueHeight - (Math.ceil(formdata.ValueHeight/2))) / 2;
			//img.borderWidth = 2;
			//img.borderColor = '#F00';
			//img.left = ((formdata.dHeaderWidth + formdata.dValueWidth) - 5) + '%';
			if(bIsAndroid){
			    img.left = (_lblTotalWidth - ((Math.ceil(formdata.ValueHeight/1.5))/100)*13*(parseFloat(_lblTotalWidth)/parseFloat(view.dWidth))) + '%';
			}else{
			    img.left = (_lblTotalWidth - ((Math.ceil(formdata.ValueHeight/1.5))/100)*28*(parseFloat(_lblTotalWidth)/parseFloat(view.dWidth))) + '%';
			}
			//(formdata.dHeaderWidth + formdata.dValueWidth) - ((Math.ceil(formdata.ValueHeight/1.5)) * Ti.App.dHeightRatio)
			//img.left = (bIsAndroid) ? (_lblTotalWidth - 7) + '%' : (_lblTotalWidth - 5) + '%';
			img.field = field;
			img.addEventListener('touchstart', function(e) {
				try{
					if(this.field.bReadOnly == true){
						return "";
					}
					new ComboBoxForm().show(this.field.title, mController, this.field.ComboBoxData, this.field, this.field.screenName, this.field.fieldName, this.field.searchType, this.field.dataMember);
				}catch(e){}
			}); 
			view.add(img);*/
		} else if (formdata.FieldControl == 'MULTIOPTIONLIST') {//COMBOBOX
			//var field = commonObj.BasicLabelObj.createLabel('Please Select ' + formdata.newText, formdata.ValueWidth, formdata.ValueHeight, formdata.HFontSize, formdata.HFont, formdata.HFontStyle, formdata.HForeColorName, formdata.VBackColor, 2, formdata.HAlignment);
			var field = commonObj.FormTextFieldObj.createTextField(true, test, formdata.ValueWidth, formdata.ValueHeight, formdata.VFontSize, formdata.HFont, this.argbToRGB(formdata.VForeColor), this.argbToRGB(formdata.VBackColor), formdata.VAlignment, false, 'TEXT');
			field.top = valueTop;
			if (formdata.showBorder == 1) {
				field.borderColor = this.argbToRGB(formdata.borderColor);
			}
			field.borderWidth = 1;
			field.editable = false;
			field.left = formdata.headerWidth;
			field.fieldControl = formdata.FieldControl.toUpperCase();
			field.iIndex = ctr;
			if (formValues != undefined && formValues[formdata.fieldName] != undefined) {
				field.value = formValues[formdata.fieldName];
			}
			field.title = formdata.newText;
			field.fieldName = formdata.fieldName;
			field.dataMember = formdata.DataMember;
			field.screenName = formdata.screenName;
			field.DataMemberType = formdata.DataMemberType;
			field.searchType = 0;
			field.code = '';
			field.bReadOnly = false;

			test = (test == null || test == undefined || test == '') ? formdata.DefaultValue : test;
			field.value = test;
			field.text = test;
			field.borderRadius = 10;
			field.borderWidth = 1;

			field.addEventListener('touchstart', function (e) {
				try {
					if (e.source.bReadOnly == true) {
						return "";
					}
					mController.formMultiOptionListClicked(this.fieldName, this.dataMember);
				} catch (e) { }
			});
			view.add(field);

			var img = new BasicImageView().createImageView(null, Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'downArrow.png'), (Math.ceil(formdata.ValueHeight / 1.5)), (Math.ceil(formdata.ValueHeight / 2)));
			img.top = (formdata.ValueHeight - (Math.ceil(formdata.ValueHeight / 2))) / 2;
			img.left = (_lblTotalWidth - ((Math.ceil(formdata.ValueHeight / 1.5)) / 100) * 13 * (parseFloat(_lblTotalWidth) / parseFloat(view.dWidth))) + '%';
			img.field = field;
			img.addEventListener('touchstart', function (e) {
				try {
					if (this.field.bReadOnly == true) {
						return "";
					}
					mController.formMultiOptionListClicked(this.field.fieldName, this.field.dataMember);
				} catch (e) { }
			});
			view.add(img);
		} else if (formdata.FieldControl == 'COMBOGROUP') {//COMBOGROUP
			//var field = commonObj.BasicLabelObj.createLabel('Please Select ' + formdata.newText, formdata.ValueWidth, formdata.ValueHeight, formdata.HFontSize, formdata.HFont, formdata.HFontStyle, formdata.HForeColorName, formdata.VBackColor, 2, formdata.HAlignment);
			var field = commonObj.FormTextFieldObj.createTextField(true, test, formdata.ValueWidth, formdata.ValueHeight, formdata.VFontSize, formdata.HFont, this.argbToRGB(formdata.VForeColor), this.argbToRGB(formdata.VBackColor), formdata.VAlignment, false, 'TEXT');
			field.top = valueTop;
			if (formdata.showBorder == 1) {
				field.borderColor = this.argbToRGB(formdata.borderColor);
			}
			field.borderWidth = 1;
			field.editable = false;
			field.left = formdata.headerWidth;
			field.fieldControl = formdata.FieldControl.toUpperCase();
			field.iIndex = ctr;
			if (formValues != undefined && formValues[formdata.fieldName] != undefined) {
				field.value = formValues[formdata.fieldName];
			}
			field.title = formdata.newText;
			field.fieldName = formdata.fieldName;
			field.dataMember = formdata.DataMember;
			field.DataMemberType = formdata.DataMemberType;
			field.screenName = formdata.screenName;
			field.searchType = 0;
			field.code = '';
			field.bComboGroup = true;
			field.bReadOnly = false;
			commonObj.mScreenName = formdata.screenName + '_FORM_COMBOBOX_' + formdata.fieldName;
			commonObj.qry = this.getQueryConfigByScreenNameWithOrderText(commonObj.mScreenName);
			commonObj.qry = mView.formatQueryString(commonObj.qry, mScreenName);
			field.ComboBoxData = [];

			if (commonObj.qry != undefined) {
				comboData = this.createComboBoxData(commonObj.qry);
				try {
					if (comboData.length > 0) {
						field.ComboBoxData = comboData;
						if (test == null || test == "" || test == undefined) {
							field.value = comboData[0].displayText;
							field.code = comboData[0].ComboBoxCode;
						} else {
							var comboDatalength = comboData.length;
							for (var comboCnt = 0; comboCnt < comboDatalength; comboCnt++) {
								if (test == comboData[comboCnt].ComboBoxCode) {
									field.value = comboData[comboCnt].displayText;
									field.code = comboData[comboCnt].ComboBoxCode;
									comboCnt = comboDatalength;
								}
							}
						}
					}
				} catch (e) { }
			}
			field.addEventListener('touchstart', function (e) {
				if (this.bReadOnly == true) {
					return "";
				}
				new ComboBoxForm().show(this.title, mController, this.ComboBoxData, this, this.screenName, this.fieldName, this.searchType, this.dataMember);
			});
			field.addEventListener('change', function (e) {
				try {
					mController.formComboChange(this, e.source.fieldName, e.source.index, e.source.value);
				} catch (e) { }
			});
			field.borderRadius = 10;
			field.borderWidth = 1;
			field.backgroundColor = '#e6e6e6';
			view.add(field);
			var ComboGroupFilterView = TableViewBasicUIObj.createBasicView(null, 'transparent', formdata.ValueHeight, '100%', 0, 0, 0, 0, 'horizontal');
			ComboGroupFilterView.top = formdata.ValueHeight;
			ComboGroupFilterView.ComboIndex = 0;
			ComboGroupFilterView.ComboData = comboData;
			field.ComboGroupFilterView = ComboGroupFilterView;
			var img = new BasicImageView().createImageView(null, Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'downArrow.png'), (Math.ceil(formdata.ValueHeight / 1.5)), (Math.ceil(formdata.ValueHeight / 2)));
			img.top = (formdata.ValueHeight - (Math.ceil(formdata.ValueHeight / 2))) / 2;
			img.left = (bIsAndroid) ? (_lblTotalWidth - 8) + '%' : (_lblTotalWidth - 10) + '%';
			view.add(img);
			if (comboData.length > 1) {
				var ComboFilterlabel = commonObj.FormTextFieldObj.createTextField(true, "NEXT : " + comboData[1].displayText, "80%", formdata.ValueHeight, formdata.HFontSize, formdata.HFont, this.argbToRGB(formdata.HForeColor), this.argbToRGB(formdata.HBackColor), formdata.HAlignment, false, 'TEXT');
				ComboFilterlabel.editable = false;
				ComboFilterlabel.enabled = false;
				ComboFilterlabel.ComboIndex = 1;
				ComboFilterlabel.ComboData = comboData;
				ComboFilterlabel.field = field;
				ComboGroupFilterView.add(ComboFilterlabel);
				var ComboFilterBtn = commonObj.BasicButtonObj.createButton("->", "19%", formdata.ValueHeight, formdata.VFontSize, '#e8e8e8');
				ComboFilterBtn.ComboIndex = 1;
				ComboFilterBtn.ComboData = comboData;
				ComboFilterBtn.ComboFilterlabel = ComboFilterlabel;
				ComboFilterBtn.ComboGroupFilterView = ComboGroupFilterView;
				ComboFilterBtn.field = field;
				ComboFilterBtn.addEventListener('click', function (e) {
					if (this.field.bReadOnly == true) {
						return "";
					}
					var arrComboData = e.source.ComboData;
					var dComboIndex = e.source.ComboIndex;
					if (arrComboData.length >= dComboIndex + 1) {
						try {
							e.source.field.code = arrComboData[dComboIndex].ComboBoxCode;
							e.source.field.value = arrComboData[dComboIndex].displayText;

							if (arrComboData.length > dComboIndex + 1) {
								e.source.ComboIndex = dComboIndex + 1;
								e.source.ComboFilterlabel.ComboIndex = dComboIndex + 1;
								e.source.ComboFilterlabel.value = "NEXT : " + arrComboData[dComboIndex + 1].displayText;
								mController.comboBoxFormItemClicked('', 0, e.source.field.value, e.source.field.code, e.source.field.screenName, e.source.field.fieldName, '', e.source.field.dataMember);
							} else {
								e.source.ComboIndex = 0;
								e.source.ComboFilterlabel.ComboIndex = 0;
								mController.comboBoxFormItemClicked('', 0, e.source.field.value, e.source.field.code, e.source.field.screenName, e.source.field.fieldName, '', e.source.field.dataMember);
								e.source.ComboGroupFilterView.height = 0;
							}
						} catch (e) { }
					}
				});
				ComboGroupFilterView.add(ComboFilterBtn);
			}
			view.add(ComboGroupFilterView);
		} else if (formdata.FieldControl == 'DATEPICKER') {//DatePicker
			var dateLabel = commonObj.FormTextFieldObj.createTextField(true, test, formdata.ValueWidth, formdata.ValueHeight, formdata.VFontSize, formdata.HFont, this.argbToRGB(formdata.VForeColor), this.argbToRGB(formdata.VBackColor), formdata.VAlignment, false, 'TEXT');
			dateLabel.top = valueTop;
			if (formdata.showBorder == 1) {
				dateLabel.borderColor = this.argbToRGB(formdata.borderColor);
			}
			dateLabel.borderWidth = 1;
			dateLabel.fieldControl = formdata.FieldControl.toUpperCase();
			dateLabel.editable = false;
			dateLabel.left = formdata.headerWidth;
			dateLabel.title = formdata.newText;
			formdata.DefaultValue = (formdata.DefaultValue != null && formdata.DefaultValue != undefined && formdata.DefaultValue != '') ? formdata.DefaultValue : '';
			if (formdata.DefaultValue == 'EMPTY' && (test == null || test == "" || test == undefined)) {
				dateLabel.value = '';
				dateLabel.code = '';
			} else if (test == null || test == "" || test == undefined) {
				dateLabel.value = Ti.App.DATEFORMAT.dbDateFormat(new Date());
				if (Ti.App.MDY == true) {
					dateLabel.value = Ti.App.DATEFORMAT.dbDateFormat1(new Date());
				}
				dateLabel.code = Ti.App.DATEFORMAT.dbDateFormatSQLite(new Date());
			} else {
				////COMMON.Log('test '+test);
				dateLabel.value = Ti.App.DATEFORMAT.dbDateFormat(test);
				////COMMON.Log('dateLabel.value '+dateLabel.value);
				if (Ti.App.MDY == true) {
					dateLabel.value = Ti.App.DATEFORMAT.dbDateFormat1(test);
				}
				dateLabel.code = test;
				////COMMON.Log('dateLabel.code '+dateLabel.code);
			}
			dateLabel.fieldControl = formdata.FieldControl;
			dateLabel.iIndex = ctr;
			//dateLabel.title = formdata.newText;
			dateLabel.fieldName = formdata.fieldName;
			dateLabel.screenName = formdata.screenName;
			dateLabel.DataMember = formdata.DataMember.toUpperCase();
			dateLabel.DataMemberType = formdata.DataMemberType;
			dateLabel.searchType = 0;
			dateLabel.bReadOnly = false;
			commonObj.bEventFlag = true;
			try {
				commonObj.bEventFlag = mController.CheckDatePickerEvent(formdata.fieldName, formdata.DataMember.toUpperCase(), formdata.newText);
				if (commonObj.bEventFlag == false) {
					commonObj.bEventFlag = false;
				} else {
					commonObj.bEventFlag = true;
				}
			} catch (e) {
				commonObj.bEventFlag = true;
			}
			if (commonObj.bEventFlag == true) {
				//dateLabel.addEventListener('click', function(e) {
				dateLabel.addEventListener('touchstart', function (e) {
					if (this.bReadOnly == true) {
						return "";
					}
					Ti.App.columnClicked = e.source.fieldName;//DataMember;
					var datepicker = new FormDatePicker();
					datepicker.setController(mController);
					datepicker.show(mController, 0, this.screenName, this.fieldName, this.searchType, this);
				});
				dateLabel.addEventListener('longpress', function (e) {
					Ti.App.columnClicked = e.source.fieldName;//DataMember;
				});
				dateLabel.addEventListener('change', function (e) {
					try {
						//COMMON.Log('value :'+e.source.value+ ' Code '+e.text);
						mController.formDatePickerValueChanged(this, e.source.fieldName, e.source.iIndex, e.source.value);
					} catch (e) { }
				});
				dateLabel.addEventListener('focus', function (e) {
					if (this.bReadOnly == true) {
						return "";
					}
					try {
						mController.formDatePickerFocus(this, e.source.fieldName, e.source.iIndex, e.source.value);
					} catch (e) { }
				});
				dateLabel.addEventListener('blur', function (e) {
					try {
						mController.formDatePickerLostFocus(this, e.source.fieldName, e.source.iIndex, e.source.value);
					} catch (e) { }
				});
				//dateLabel.addEventListener('swipe', function(e) {
				//Ti.App.columnClicked = e.source.fieldName;//DataMember;
				//});
			} else {
				dateLabel.addEventListener('click', function (e) {
					COMMON.showAlert("Date Can not be changed.", ["OK"], null);
					return false;
				});
			}
			dateLabel.borderRadius = 10;
			dateLabel.borderWidth = 1;
			//dateLabel.backgroundColor = '#e6e6e6';
			dateLabel.backgroundImage = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'FormDatePicker.simg');
			view.add(dateLabel);
			/*var img = new BasicImageView().createImageView(null, Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'downArrow.png'), (Math.ceil(formdata.ValueHeight/1.5)), (Math.ceil(formdata.ValueHeight/2)));
			img.top = (formdata.ValueHeight - (Math.ceil(formdata.ValueHeight/2))) / 2;
			img.dateLabel = dateLabel;
			img.fieldControl = formdata.FieldControl;
			img.iIndex = ctr;
			img.title = formdata.newText;
			img.fieldName = formdata.fieldName;
			img.screenName = formdata.screenName;
			img.DataMember = formdata.DataMember.toUpperCase();
			img.DataMemberType = formdata.DataMemberType;
			img.searchType = 0;
			if(bIsAndroid){
                img.left = (_lblTotalWidth - ((Math.ceil(formdata.ValueHeight/1.5))/100)*13*(parseFloat(_lblTotalWidth)/parseFloat(view.dWidth))) + '%';
			}else{
			    img.left = (_lblTotalWidth - ((Math.ceil(formdata.ValueHeight/1.5))/100)*28*(parseFloat(_lblTotalWidth)/parseFloat(view.dWidth))) + '%';
			}
			//img.left = (bIsAndroid) ? (_lblTotalWidth - 12) + '%' : (_lblTotalWidth - 10) + '%';
			if(commonObj.bEventFlag == true){				
				img.addEventListener('touchend', function(e) {
					Ti.App.columnClicked = e.source.DataMember;
					var datepicker = new FormDatePicker();
					datepicker.setController(mController);
					datepicker.show(mController, 0, this.screenName, this.fieldName, this.searchType, this.dateLabel);
				});
			}else{
				img.addEventListener('touchend', function(e) {
					COMMON.showAlert("Date Can not be changed.", ["OK"], null);
					return false;
				});
			}
			view.add(img);*/
		} else if (formdata.FieldControl == 'TIMEPICKER') {//TimePicker
			var timeLabel = commonObj.FormTextFieldObj.createTextField(true, test, formdata.ValueWidth, formdata.ValueHeight, formdata.VFontSize, formdata.HFont, this.argbToRGB(formdata.VForeColor), this.argbToRGB(formdata.VBackColor), formdata.VAlignment, false, 'TEXT');
			timeLabel.top = valueTop;
			timeLabel.fieldControl = formdata.FieldControl.toUpperCase();
			if (formdata.showBorder == 1) {
				timeLabel.borderColor = this.argbToRGB(formdata.borderColor);
			}
			timeLabel.borderWidth = 1;
			timeLabel.editable = false;
			timeLabel.left = formdata.headerWidth;

			if (formValues != undefined && formValues[formdata.DataMember] != undefined) {
				timeLabel.value = (test == null || test == "" || test == undefined) ? formValues[formdata.DataMember] : test;
			}
			timeLabel.fieldControl = formdata.FieldControl;
			timeLabel.iIndex = ctr;
			timeLabel.title = formdata.newText;
			timeLabel.fieldName = formdata.fieldName;
			timeLabel.screenName = formdata.screenName;
			timeLabel.DataMember = formdata.DataMember.toUpperCase();
			timeLabel.DataMemberType = formdata.DataMemberType;
			timeLabel.searchType = 0;
			timeLabel.bReadOnly = false;
			timeLabel.addEventListener('click', function (e) {
				if (this.bReadOnly == true) {
					return "";
				}
				Ti.App.columnClicked = e.source.fieldName;//DataMember;
				var timePicker = new FormTimePicker();
				timePicker.setController(mController);
				timePicker.show(mController, 0, this.screenName, this.fieldName, this.searchType, this);
			});
			timeLabel.addEventListener('longpress', function (e) {
				Ti.App.columnClicked = e.source.fieldName;//DataMember;
			});
			timeLabel.addEventListener('change', function (e) {
				try {
					mController.formTimePickerValueChanged(this, e.source.fieldName, e.source.iIndex, e.source.value);
				} catch (e) { }
			});
			timeLabel.addEventListener('focus', function (e) {
				try {
					if (this.bReadOnly == true) {
						return "";
					}
					mController.formTimePickerFocus(this, e.source.fieldName, e.source.iIndex, e.source.value);
				} catch (e) { }
			});
			timeLabel.addEventListener('blur', function (e) {
				try {
					mController.formTimePickerLostFocus(this, e.source.fieldName, e.source.iIndex, e.source.value);
				} catch (e) { }
			});
			//timeLabel.addEventListener('swipe', function(e) {
			//Ti.App.columnClicked = e.source.fieldName;//DataMember;
			//});
			timeLabel.borderRadius = 0;
			timeLabel.borderWidth = 1;
			//timeLabel.backgroundColor = '#e6e6e6';
			timeLabel.backgroundImage = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'FormCombobox.simg');
			view.add(timeLabel);
			/*var img = new BasicImageView().createImageView(null, Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'downArrow.png'), (Math.ceil(formdata.ValueHeight/1.5)), (Math.ceil(formdata.ValueHeight/2)));
			img.top = (formdata.ValueHeight - (Math.ceil(formdata.ValueHeight/2))) / 2;
			if(bIsAndroid){
                img.left = (_lblTotalWidth - ((Math.ceil(formdata.ValueHeight/1.5))/100)*13*(parseFloat(_lblTotalWidth)/parseFloat(view.dWidth))) + '%';
			}else{
			    img.left = (_lblTotalWidth - ((Math.ceil(formdata.ValueHeight/1.5))/100)*28*(parseFloat(_lblTotalWidth)/parseFloat(view.dWidth))) + '%';
			}//img.left = (bIsAndroid) ? (_lblTotalWidth - 7) + '%' : (_lblTotalWidth - 5) + '%';
			view.add(img);*/
		} else if (formdata.FieldControl == 'OPTION') {//DatePicker
			var checkBox = new BasicCheckBox().createBasicCheckBox(test, formdata.VAlignment);
			checkBox.value = (test == null || test == undefined || test == "" || test == 0 || test == "0" || test == "false" || test == false) ? false : true;//test;
			if (formdata.showBorder == 1 && !bIsAndroid) {
				checkBox.borderWidth = 2;
				checkBox.borderColor = 'black';
			}
			checkBox.iIndex = ctr;
			checkBox.left = formdata.headerWidth;
			checkBox.fieldControl = formdata.FieldControl.toUpperCase();
			checkBox.fieldName = formdata.fieldName;
			checkBox.DataMemberType = formdata.DataMemberType;
			checkBox.bReadOnly = false;
			checkBox.borderWidth = 1;
			checkBox.borderColor = 'black';
			checkBox.defaultText = formdata.defaultText;
			view.add(checkBox);
			if (Ti.Platform.name == 'android') {
				checkBox.addEventListener('click', FrmCheckBoxEvent);
			} else {
				checkBox.addEventListener('change', FrmCheckBoxEvent);
			}
			function FrmCheckBoxEvent(e) {
				if (bGroupOptionCheckingForm == true) {
					return false;
				}
				try {
					//COMMON.Log('this.iIndex --> ' + this.iIndex + ' : this.defaultText --> ' + this.defaultText);

					var sDefaultText = COMMON.CheckString(this.defaultText);
					//COMMON.Log('sDefaultText --> ' + sDefaultText);
					if (sDefaultText != '') {
						var arrOptions = sDefaultText.split(",");
						if (arrOptions.length > 0) {
							bGroupOptionCheckingForm = true;
							for (var dGroupOptionCnt = 0; dGroupOptionCnt < arrOptions.length; dGroupOptionCnt++) {
								//COMMON.Log('this.fieldName : ' + this.fieldName + ' != arrOptions[dGroupOptionCnt] : ' + arrOptions[dGroupOptionCnt]);
								//COMMON.Log('GET ROW COMPONWNT : ' + arrOptions[dGroupOptionCnt] + ' : ' + ArrayOperations.prototype.getFormComponent(arrOptions[dGroupOptionCnt]));
								try {
									if (this.fieldName != arrOptions[dGroupOptionCnt]) {
										ArrayOperations.prototype.getFormComponent(arrOptions[dGroupOptionCnt]).value = false;
										//getRowComponent(sectionIndex, rowIndex, fieldName)
									}
								} catch (e) { }
							}
						}
					}
				} catch (e) {
				} finally {
					setTimeout(function () {
						bGroupOptionCheckingForm = false;
					}, 100);
				}

				try {
					if (this.bReadOnly == true) {
						return "";
					}
					if (Ti.App.bFocusedTxtfield != null && Ti.App.bFocusedTxtfield != undefined) {
						Ti.App.bFocusedTxtfield.blur();
						Ti.App.bFocusedTxtfield = null;
						//return;
					}
					mController.formCheckBoxValueChanged(this, this.value);
				} catch (e) { }
			}
		} else if (formdata.FieldControl == 'DISABLEDOPTION') {
			var checkBox = new BasicCheckBox().createBasicCheckBox(test, formdata.VAlignment);
			checkBox.top = valueTop;
			checkBox.value = (test == null || test == undefined || test == "" || test == 0 || test == "0" || test == "false" || test == false) ? false : true;//test;
			if (formdata.showBorder == 1 && !bIsAndroid) {
				checkBox.borderWidth = 1;
				checkBox.borderColor = 'black';
			}
			checkBox.iIndex = ctr;
			checkBox.left = formdata.headerWidth;
			checkBox.width = formdata.ValueHeight;
			checkBox.fieldControl = formdata.FieldControl.toUpperCase();
			checkBox.DataMemberType = formdata.DataMemberType;
			checkBox.touchEnabled = false;
			checkBox.borderWidth = 1;
			checkBox.borderColor = 'black';
			view.add(checkBox);
		} else if (formdata.FieldControl == 'SWITCH') {
			test = (test == null || test == undefined || test == '') ? formdata.DefaultValue : test;
			var toggleOn = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'toggleOn.png');
			var toggleOff = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'toggleOff.png');
			//COMMON.Log("Switch Test ----> " + test);
			//COMMON.Log("Image fieldName ----> " + formdata.fieldName);
			if (test == 0 || test == '0' || test == null || test == '' || test == undefined) {
				toggleBtn = new BasicImageView().createImageView(null, toggleOff, 'auto', 'auto'); //'auto',rowHeight);
				toggleBtn.switchValue = false;
			} else {
				toggleBtn = new BasicImageView().createImageView(null, toggleOn, 'auto', 'auto'); //'auto',rowHeight);
				toggleBtn.switchValue = true;
			}
			toggleBtn.fieldControl = formdata.FieldControl.toUpperCase();
			toggleBtn.enableZoomControls = false;
			toggleBtn.DataMemberType = formdata.DataMemberType;
			toggleBtn.iIndex = ctr;
			toggleBtn.bReadOnly = false;
			toggleBtn.addEventListener('click', function (e) {
				try {
					if (this.bReadOnly == true) {
						return "";
					}
					if (Ti.App.bFocusedTxtfield != null && Ti.App.bFocusedTxtfield != undefined) {
						Ti.App.bFocusedTxtfield.blur();
						Ti.App.bFocusedTxtfield = null;
						//return;
					}
					//COMMON.Log("Before : test ----> " + test);
					if (test == 0 || test == '0' || test == null || test == '' || test == undefined) {
						e.source.image = toggleOn;
						e.source.switchValue = true;
						test = 1;
						//COMMON.Log("On");
						//COMMON.Log("After : test ----> " + test);
						try {
							mController.toggleBtnChanged(e.source.iIndex, true, this, e.source.fieldControl);
						} catch (e) { }
					} else {
						e.source.image = toggleOff;
						e.source.switchValue = false;
						test = 0;
						//COMMON.Log("Off");
						//COMMON.Log("After : test ----> " + test);
						try {
							mController.toggleBtnChanged(e.source.iIndex, false, this, e.source.fieldControl);
						} catch (e) { }
					}
				} catch (e) {
					//COMMON.Log("Click error  --> " + e);						
				}
			});
			view.add(toggleBtn);
		} else if (formdata.FieldControl == 'B64IMAGE') {
			//COMMON.Log('Base 64 IMAGE');
			//COMMON.Log(formdata.DefaultValue);
			var img = new BasicImageView().createB64ImageView(formdata.DefaultValue, 'auto', formdata.ValueHeight);//'auto');
			//COMMON.Log("Image test ---> " + test);
			img.DataMemberType = formdata.DataMemberType;
			img.fieldControl = formdata.FieldControl.toUpperCase();
			img.enableZoomControls = true;
			img.top = 0;
			//img.sFilePath = Ti.App.ImageCacheObj.getImage('MobileSalesCache', test);

			if (formdata.VAlignment == 2) {
				img.left = 10;
			} else if (formdata.VAlignment == 1) {
				img.right = 10;
			}
			img.index = iIndex;
			img.fieldName = formdata.fieldName;
			img.bReadOnly = false;


			view.add(img);
		}
		else if (formdata.FieldControl == 'IMAGE' || formdata.FieldControl == 'INTENTVIEW') {
			//COMMON.Log('IMAGE : test : ' + test);

			test = (test == null || test == undefined || test == '') ? formdata.DefaultValue : test;
			if (formdata.FieldControl == 'INTENTVIEW') {
				var imgPath = Ti.App.ImageCacheObj.getImage('MobileSalesCache', formdata.DefaultValue);
			} else {

				if (formdata.screenName == 'Merchandising-Check' && formdata.fieldName == "planogram-old") {
					var WidgetContentView = TableViewBasicUIObj.createBasicView(null, 'transparent', formdata.ValueHeight, '100%', null, null, null, null, 'vertical');
					var WidgetContentViewData = mController.getWidgetContentView(formdata.fieldName);
					WidgetContentView.add(WidgetContentViewData);
					view.add(WidgetContentView);
				} else {
					//COMMON.Log('IMAGE : test : ' + test);
					test = (test == null || test == undefined || test == '') ? formdata.DefaultValue : test;
					if (formdata.fieldName == "planogram") {
						try {
							var file = null;
							test = (test != null && test != undefined && test != '') ? test : 'default.png';
							test = test.replace('png', 'simg');
						} catch (e) { }
						file = (bIsAndroid) ? Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, test) : Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, test);
						if (file.exists()) {
							var imgPath = file.nativePath;
							file = null;
						} else {
							var imgPath = '/images/' + test;
							file = null;
						}
					} else {
						var imgPath = Ti.App.ImageCacheObj.getImage('MobileSalesCache', test);
					}
				}
			}
			var img = new BasicImageView().createImageView(null, imgPath, 'auto', formdata.ValueHeight);//'auto');
			//COMMON.Log("Image test ---> " + test);
			img.DataMemberType = formdata.DataMemberType;
			img.fieldControl = formdata.FieldControl.toUpperCase();
			img.enableZoomControls = false;
			img.sFilePath = Ti.App.ImageCacheObj.getImage('MobileSalesCache', test);
			if (test == formdata.DefaultValue) {
				img.ImgFound = false;
			} else {
				img.ImgFound = true;
			}
			//if(formdata.screenName != 'Application'){
			//img.enableZoomControls  = true;
			//}
			/*
			var dBorderRadius = 0;
			if( ((formdata.dValueWidth/100) * Ti.App.DeviceWidth)  > formdata.dValueHeightRatioVal){
				img.width = (formdata.dValueWidth/100) * Ti.App.DeviceWidth;
				img.height = 'auto';
				dBorderRadius = ((formdata.dValueWidth/100) * Ti.App.DeviceWidth) / 2; 
			}else if(((formdata.dValueWidth/100) * Ti.App.DeviceWidth) < formdata.dValueHeightRatioVal){
				img.width = 'auto';
				img.height = formdata.ValueHeight;
				dBorderRadius = formdata.ValueHeight / 2;
			}
				
			if(formdata.DataMemberType == 'ROUND' || formdata.DataMemberType == 'ROUNDIMAGE'){
				img.borderRadius = dBorderRadius;
				//alert('formdata.ValueWidth -> ' + formdata.ValueWidth + ' : formdata.ValueHeight -> ' + formdata.ValueHeight);
				//alert('Ti.App.dWidthRatio : ' + Ti.App.DeviceWidth + ' : ' + ((formdata.dValueWidth/100) * Ti.App.DeviceWidth)   + ' - ' + formdata.dValueHeightRatioVal);
				/*
				if((formdata.dValueWidth * Ti.App.dWidthRatio)  > formdata.dValueHeightRatioVal){
					img.borderRadius = formdata.dValueWidth * Ti.App.dWidthRatio / 2;
				}else if((formdata.dValueWidth * Ti.App.dWidthRatio) < formdata.dValueHeightRatioVal){
					img.borderRadius = formdata.dValueHeightRatioVal / 2;
				}*/

			/*WORKING
			if( ((formdata.dValueWidth/100) * Ti.App.DeviceWidth)  > formdata.dValueHeightRatioVal){
				//img.width = (formdata.dValueWidth/100) * Ti.App.DeviceWidth;
				//img.height = 'auto'; 
				img.borderRadius = ((formdata.dValueWidth/100) * Ti.App.DeviceWidth) / 2;
			}else if(((formdata.dValueWidth/100) * Ti.App.DeviceWidth) < formdata.dValueHeightRatioVal){
				//img.width = 'auto';
				//img.height = formdata.ValueHeight; 
				//alert('height : borderRadius : ' + formdata.dValueHeightRatioVal/2);
				img.borderRadius = formdata.ValueHeight / 2;
			}*/
			/*
			img.borderColor = '#e8e8e8';
			img.borderWidth = 2;
		}	
		/*}else{
			//var img = new BasicImageView().createImageView(null, Ti.App.ImageCacheObj.getImage('MobileSalesCache', test), 'auto', formdata.ValueHeight);//'auto');
			var img = new BasicImageView().createImageView(null, imgPath, 'auto', formdata.ValueHeight);//'auto');
			//COMMON.Log("Image test ---> " + test);
			img.DataMemberType = formdata.DataMemberType;
			img.enableZoomControls  = true;
		}
		/*
if(align == 2){  Ti.UI.TEXT_ALIGNMENT_LEFT;
}else if(align == 0){  Ti.UI.TEXT_ALIGNMENT_CENTER;
}else if(align == 1){  Ti.UI.TEXT_ALIGNMENT_RIGHT;
}
		 */
			if (formdata.VAlignment == 2) {
				img.left = 10;
			} else if (formdata.VAlignment == 1) {
				img.right = 10;
			}
			if (test == 'Planogram.png' || test == 'camdisplay.png') {
				img.enableZoomControls = false;
			}
			img.index = iIndex;
			img.fieldName = formdata.fieldName;
			img.bReadOnly = false;

			if (formdata.screenName == 'Merchandising-Check') {
				//img.backgroundColor = '#c2c2c2';
			}
			img.addEventListener('touchstart', function (e) {
				mView.disabledFormScrollView();
			});
			img.addEventListener('touchend', function (e) {
				mView.enabledFormScrollView();
			});

			if (formdata.FieldControl == 'INTENTVIEW') {
				img.addEventListener('click', function (e) {
					try {
						/*if(this.bReadOnly == true){
							return "";
						}
						if(Ti.App.bFocusedTxtfield != null && Ti.App.bFocusedTxtfield != undefined){
							Ti.App.bFocusedTxtfield.blur();
							Ti.App.bFocusedTxtfield = null;
							return;
						}
						mController.formImageClicked(this, e.source.fieldName);
						*/

						//COMMON.Log('e.source.sFilePath : ' + e.source.sFilePath);
						//COMMON.Log('Ti.Platform.name : ' + Ti.Platform.name);

						if (e.source.ImgFound == false) {
							return "";
						}

						if (Ti.Platform.name === 'android') {

							//COMMON.Log('e.source.sFilePath '+e.source.sFilePath);
							if (e.source.sFilePath.indexOf('.simg') >= 0) {
								try {
									//COMMON.Log('Entered');						
									var imgArr = [];
									var imgPathArr = [];
									//imgArr.push(dirItems[i]);		
									imgPathArr.push(e.source.sFilePath);
									obj = {};
									obj.sArrItems = imgArr;
									obj.sImagePathArr = imgPathArr;
									//COMMON.Log("imgPathArr1 "+imgPathArr);
									obj.index = 0;
									//COMMON.Log("Gallery Screen");
									Ti.App.sItemNo = '';
									Ti.App.bEnableAndroidBackButton = false;
									var BasicPopUp = require('/BaseComponents/PreviewPopupGallery');
									new BasicPopUp().show('Preview', this, obj, imgPathArr);
								} catch (e) {
									//COMMON.Log('Error ' + e);
									return '';
								}
							} else {

								var intent = Ti.Android.createIntent({
									action: Ti.Android.ACTION_VIEW,
									//type: "application/pdf",
									data: e.source.sFilePath
								});

								try {
									Ti.Android.currentActivity.startActivity(intent);
								} catch (e) {
									//Ti.API.debug(e);
									//alert('NoPDF apps installed!');
									return '';
								}

							}
						}
					} catch (e) { }
				});
			} else {
				img.addEventListener('click', function (e) {
					try {
						if (this.bReadOnly == true) {
							return "";
						}
						if (Ti.App.bFocusedTxtfield != null && Ti.App.bFocusedTxtfield != undefined) {
							Ti.App.bFocusedTxtfield.blur();
							Ti.App.bFocusedTxtfield = null;
							return;
						}
						mController.formImageClicked(this, e.source.fieldName);
					} catch (e) { }
				});
			}
			view.add(img);

		} else if (formdata.FieldControl == 'IMAGEWITHPREVIEW') {
			//COMMON.Log('formdata.FieldControl '+formdata.FieldControl);
			var imgPathArr = [];
			try {
				//if(dLineIndex > 0){
				var ImgCtrlView = TableViewBasicUIObj.createBasicView(null, 'transparent', formdata.ValueHeight * Ti.App.dHeightRatio, formdata.ValueWidth, 0, 0, 0, 0, '');
				if (formdata.VAlignment == 2) {
					ImgCtrlView.left = 10;
				} else if (formdata.VAlignment == 1) {
					ImgCtrlView.right = 10;
				}
				//ImgCtrlView.borderWith = 2;
				//ImgCtrlView.borderColor = '#f00';
				//ImgCtrlView.left = dLeftPos+'%';//0;
				//if(dLineIndex == 1){
				//ImgCtrlView.top = dTopPos + 5;
				//}else{
				//ImgCtrlView.top = dTopPos-3;
				//}
				//ImgCtrlView.top = dTopPos;
				////COMMON.Log(' columnWidth  : (' + HeaderDetailsObj.columnWidth  + ' * ' + widthRatio + ' *  100 / ' + headerListLength + ') - rowHeight : ' + rowHeight);
				////COMMON.Log(' WIDTH : ' + commonObj.tblColumnWidth + ' - rowHeight : ' + rowHeight);
				//COMMON.Log('test1 : ' + test + ' - formdata.DefaultValue : ' + formdata.DefaultValue); 
				test = (test == null || test == undefined || test == '') ? formdata.DefaultValue : test;
				//COMMON.Log('test2 : ' + test);
				var imgPath = Ti.App.ImageCacheObj.getImage('MobileSalesCache', test);
				//COMMON.Log('imgPath : ' + imgPath);
				//var img = new BasicImageView().createImageView(null, imgPath, 'auto', 'auto'); //'auto',rowHeight);
				//img.enableZoomControls  = false;
				//test =  (test == null || test == undefined || test == '') ? formdata.DefaultValue : test;
				//var imgPath = Ti.App.ImageCacheObj.getImage('MobileSalesCache', test);	
				var img = new BasicImageView().createImageView(null, imgPath, 'auto', formdata.ValueHeight);//'auto');
				//COMMON.Log("Image test ---> " + test);
				img.DataMemberType = formdata.DataMemberType;
				img.enableZoomControls = false;

				img.DataMemberType = formdata.DataMemberType;
				img.index = iIndex;
				img.fieldName = formdata.fieldName;
				img.bReadOnly = false;
				img.dataValue = test;
				img.top = 0;
				//img.borderWith = 2;
				//img.borderColor = '#ff0';
				/*if(HeaderDetailsObj.allignment ==  0){
					ImgCtrlView.layout = 'vertical';
				}else if(HeaderDetailsObj.allignment ==  1){
					img.right = 1;//2;
				}else if(HeaderDetailsObj.allignment ==  2){
					img.left = 1;//2;
				}*/
				/*if( test == 'camera.png' ){
					img.height = rowHeight;			
				}*/
				/*img.backgroundColor = sRow_BG_Color;//'transparent';
				img.fieldControl = mFieldControl.name;
				img.rowIndex = iIndex;
				img.iIndex = iIndex;
				img.DataMember = HeaderDetailsObj.DataMember.toUpperCase();
				//img.DataMemberType = HeaderDetailsObj.DataMemberType;
				img.columnWidth = HeaderDetailsObj.columnWidth;
				img.dLineIndex = dLineIndex;
				img.dataValue = dataValue;
				img.fieldName = HeaderDetailsObj.fieldName;*/

				ImgCtrlView.add(img);

				ImgCtrlView.fieldControl = formdata.FieldControl;
				ImgCtrlView.rowIndex = iIndex;
				ImgCtrlView.iIndex = iIndex;
				ImgCtrlView.DataMember = formdata.DataMember.toUpperCase();
				ImgCtrlView.DataMemberType = formdata.DataMemberType;
				ImgCtrlView.fieldName = formdata.fieldName;
				ImgCtrlView.columnWidth = formdata.ValueWidth;
				ImgCtrlView.bubbleParent = false;
				ImgCtrlView.dataValue = test;

				/*if(bReadOnlyRow == true){
					ImgCtrlView.touchEnabled = false;
					ImgCtrlView.editable = false;
					ImgCtrlView.focusable = false;
				}*/
				ImgCtrlView.addEventListener('touchstart', function (e) {
					Ti.App.columnClicked = e.source.fieldName;
					//COMMON.Log("touchstart ");
					//COMMON.Log("e.source.dataValue --> " + e.source.dataValue);

					try {
						if (bIsAndroid) {
							Ti.UI.Android.hideSoftKeyboard();
						}
					} catch (e) { }

					//mView.disabledFormScrollView();
					/*try{
						imgPathArr = [];
						var file = (bIsAndroid) ? Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory,'/Images/'+e.source.dataValue) : Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,e.source.dataValue);
						//COMMON.Log("file.exists() --> " + file.exists());
						if (file.exists()) {
							//COMMON.Log("file.nativePath --> " + file.nativePath);
							var imgPath = file.nativePath;
							file = null;
							imgPathArr.push(imgPath);
						}else{
							var file = (bIsAndroid) ? Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory,e.source.dataValue) : Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,e.source.dataValue);
							//COMMON.Log("file.exists() --> " + file.exists());
							if (file.exists()) {
								//COMMON.Log("file.nativePath --> " + file.nativePath);
								var imgPath = file.nativePath;
								file = null;
								imgPathArr.push(imgPath);
							}
							/*var imgPath = '/images/' + e.source.dataValue;
							file = null;
							file = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, imgPath);
							imgPathArr.push(file.nativePath);* /									
						}
						if(imgPathArr.length > 0){
							var imgArr = [];
							//imgArr.push(dirItems[i]);						
							obj = {};
							obj.sArrItems = imgArr;
							obj.sImagePathArr = imgPathArr;
							//COMMON.Log("imgPathArr1 "+imgPathArr);
							obj.index = 0;
							//COMMON.Log("Gallery Screen");
							Ti.App.sItemNo = '';
							Ti.App.bEnableAndroidBackButton = false;	
							var BasicPopUp = require('/BaseComponents/PreviewPopupGallery');
							new BasicPopUp().show('Preview', this, obj,imgPathArr);
						}
						
					}catch(e){ 
						//COMMON.Log('6848 e'+e);
					} */
					try {
						imgPathArr = [];
						var file = (bIsAndroid) ? Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, '/Images/' + e.source.dataValue) : Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, e.source.dataValue);
						//COMMON.Log("file.exists() --> " + file.exists());
						if (file.exists()) {
							//COMMON.Log("file.nativePath --> " + file.nativePath);
							var imgPath = file.nativePath;
							file = null;
							imgPathArr.push(imgPath);
						} else {
							/*var imgPath = '/images/' + e.source.dataValue;
							file = null;
							file = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, imgPath);
							imgPathArr.push(file.nativePath);*/
						}


						imgPathArr = [];
						var sItemNo = e.source.dataValue;
						//COMMON.Log('sItemNo1 -> '+sItemNo);
						sItemNo = (sItemNo == null || sItemNo == undefined || sItemNo == '') ? '' : sItemNo;
						//COMMON.Log('sItemNo2 -> '+sItemNo);
						if (sItemNo != '') {
							//COMMON.Log('sItemNo3 -> '+sItemNo);
							sItemNo = sItemNo.replace("/Items/", "");
							//COMMON.Log('sItemNo4 -> '+sItemNo);
							sItemNo = sItemNo.replace(".simg", "");
							//COMMON.Log('sItemNo5 -> '+sItemNo);
							sItemNo = sItemNo.replace(".png", "");
							//COMMON.Log('sItemNo6 -> '+sItemNo);
							sItemNo = sItemNo.replace(".jpg", "");
							//COMMON.Log('sItemNo7 -> '+sItemNo);
							var arr = sItemNo.split("_");

							if (arr.length >= 1) {
								sItemNo = arr[0];
							}

							file = null;

							if (Ti.Platform.name === 'android') {
								dir = Titanium.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, '/Images/Items/');
							} else {
								dir = Titanium.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, '/Images/Items/');
							}

							var dirItems = [];
							if (dir.exists()) {
								dirItems = dir.getDirectoryListing();
							}
							//COMMON.Log('dirItems -> '+dirItems.length);	
							var imgArr = [];
							for (i = 0; i < dirItems.length; i++) {
								//COMMON.Log(i+'-dirItems[i] -> '+dirItems[i]);			
								if (dirItems[i].indexOf(sItemNo) >= 0 || dirItems[i].indexOf(sItemNo + "##") >= 0 || dirItems[i].indexOf(sItemNo + "@@") >= 0) {
									//if(dirItems[i].indexOf(sItemNo+"_") >= 0 || dirItems[i].indexOf(sItemNo+"_##") >= 0 || dirItems[i].indexOf(sItemNo+"_@@") >= 0){					    
									imgArr.push(dirItems[i]);
								}
							}

							//imgArr.push(sItemNo+".jpg");
							////COMMON.Log(JSON.stringify("ServiceImage's =>"+imgArr));

							try {
								for (ctr = 0; ctr < imgArr.length; ctr++) {
									imageName = imgArr[ctr];
									if (Ti.Platform.name === 'android') {
										//file = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, 'Items', imageName);
										file = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, '/Images/Items', imageName);
									} else {
										//file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'Items', imageName);
										file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, '/Images/Items', imageName);
									}

									if (file.exists()) {
										file.read();
										imgPathArr.push(file.nativePath);
										//_this.imgPath = file.nativePath;
									}
								}
							} catch (e) {
								//COMMON.Log(e);
							}
						}
						if (imgPathArr.length > 0) {
							var imgArr = [];
							//imgArr.push(dirItems[i]);						
							obj = {};
							obj.sArrItems = imgArr;
							obj.sImagePathArr = imgPathArr;
							//COMMON.Log("imgPathArr1 "+imgPathArr);
							obj.index = 0;
							obj.imgName = imageName;
							//COMMON.Log("Gallery Screen");
							Ti.App.sItemNo = '';
							Ti.App.bEnableAndroidBackButton = false;
							var BasicPopUp = require('/BaseComponents/PreviewPopupGallery');
							new BasicPopUp().show('Preview', this, obj, imgPathArr);
						}
					} catch (e) { }

				});
				ImgCtrlView.addEventListener('touchend', function (e) {
					//mView.enabledFormScrollView();
				});
				ImgCtrlView.addEventListener('click', function (e) {

					//COMMON.Log("click ");

					try {
						/*if(this.bReadOnly == true){
							return "";
						}*/
						if (Ti.App.bFocusedTxtfield != null && Ti.App.bFocusedTxtfield != undefined) {
							Ti.App.bFocusedTxtfield.blur();
							Ti.App.bFocusedTxtfield = null;
							return;
						}
						mController.formImageClicked(this, e.source.fieldName);
					} catch (e) {
						//COMMON.Log('6868 '+e);
					}
				});
				view.add(ImgCtrlView);
				/*}else{
					var imgPath = Ti.App.ImageCacheObj.getImage('MobileSalesCache', dataValue);
					var img = new BasicImageView().createImageView(null, imgPath, 'auto', rowHeight); //'auto',rowHeight);
					img.enableZoomControls = false;
					if( dataValue == 'camera.png' ){
						img.height = rowHeight;			
					}
					img.left = dLeftPos+'%';//0;
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
					img.addEventListener('touchstart',function(e){
						//mView.disabledFormScrollView();																
					});
					img.addEventListener('touchend',function(e){
						//mView.enabledFormScrollView();
					});
					img.addEventListener('click', function(e){
						imgPathArr = [];							
							try{									
							var file = (bIsAndroid) ? Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory,e.source.dataValue) : Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,e.source.dataValue);
							if (file.exists()) {
								var imgPath = file.nativePath;
								file = null;
								imgPathArr.push(imgPath);
							}else{
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
							//COMMON.Log("imgPathArr1 "+imgPathArr);
							obj.index = 0;
							//COMMON.Log("Gallery Screen");
							Ti.App.sItemNo = '';
							Ti.App.bEnableAndroidBackButton = false;	
							var BasicPopUp = require('/BaseComponents/PreviewPopupGallery');
							new BasicPopUp().show('Preview', this, obj,imgPathArr);
								
								if(mView != null && mView != undefined){
									mView.setselectedRowIndex(e.source.iIndex);
								}
								mController.tblRowImagePressed(this, e.source.DataMember, e.source.iIndex);
						}catch(e){}
					});
					vwRowHorizontal.add(img);
				}*/
			} catch (e) {
				//COMMON.Log('6930 error '+e);
			}
		} else if (formdata.FieldControl == 'TAKEPHOTO') {
			test = (test == null || test == undefined || test == '') ? formdata.DefaultValue : test;
			//COMMON.Log('test1 :'+test);
			test = (test == null || test == undefined || test == '') ? '' : test;
			//COMMON.Log('test2 :'+test);
			var bImgFound = false;
			if (test != '') {
				var imgPath = Ti.App.ImageCacheObj.getImage('MobileSalesCache', test);
				try {
					var file = (bIsAndroid) ? Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, test) : Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, test);
					if (file.exists()) {
						bImgFound = true;
						var imgPath = file.nativePath;
						file = null;
						if (Ti.version < '7.5.0') {
							//delete file;//17122018 SDK 7.5.0
						}
					} else {
						test = test.replace('png', 'simg');
						file = (bIsAndroid) ? Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, test) : Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, test);
						if (file.exists()) {
							bImgFound = true;
							var imgPath = file.nativePath;
							file = null;
							if (Ti.version < '7.5.0') {
								//delete file;//17122018 SDK 7.5.0
							}
						} else {
							bImgFound = false;
							file = null;
							if (Ti.version < '7.5.0') {
								//delete file;//17122018 SDK 7.5.0
							}
							var imgPath = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'camdisplay.simg');//'/images/camdisplay.simg';
						}
					}
					file = null;
					if (Ti.version < '7.5.0') {
						//delete file;//17122018 SDK 7.5.0
					}
				} catch (e) {
					bImgFound = false;
					var imgPath = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'camdisplay.simg');//'/images/camdisplay.simg';
				}
			} else {
				bImgFound = false;
				var imgPath = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'camdisplay.simg');//'/images/camdisplay.simg';
			}
			//COMMON.Log('imgPath '+imgPath);
			if (formdata.DefaultValue == test) {
				bImgFound = false;
			}

			var img = new BasicImageView().createImageView(null, imgPath, 'auto', formdata.ValueHeight);//'auto');//formdata.dValueWidth * pWidth, formdata.ValueHeight);
			//formdata.ValueWidth
			img.enableZoomControls = false;
			img.fieldControl = formdata.FieldControl.toUpperCase();
			img.fieldName = formdata.fieldName;
			img.dataMember = formdata.DataMember;
			img.DataMemberType = formdata.DataMemberType;
			img.index = ctr;
			img.borderWidth = 1;
			img.borderColor = '#e8e8e8';
			img.bReadOnly = false;
			img.bImgFound = bImgFound;
			img.enableZoomControls = false;
			img.rowIndex = ctr;
			img.iIndex = ctr;
			img.index = ctr;
			img.sControlType = 'TAKEPHOTOWITHPREVIEW';
			img.bMultiplePhoto = false;
			img.imgPath = '';
			img.imgPath = imgPath;
			img.imgName = test;
			img.screenName = screenName;

			img.addEventListener('click', function (e) {
				try {

					//COMMON.Log("LINE 8320 "+this.bReadOnly +' this.bImgFound '+this.bImgFound);
					try {
						if (bIsAndroid) {
							Ti.UI.Android.hideSoftKeyboard();
						}
					} catch (e) { }
					//COMMON.Log("LINE 8326");
					if (this.bReadOnly == true) {
						return "";
					}
					//COMMON.Log("LINE 8330");
					try{
					if (Ti.App.bFocusedTxtfield != null && Ti.App.bFocusedTxtfield != undefined) {
						//COMMON.Log("LINE 8331");
						Ti.App.bFocusedTxtfield.blur();
						Ti.App.bFocusedTxtfield = null;
						return;
					}
				}catch(e){
        //COMMON.Log("Erroro "+e);
        }
					//COMMON.Log("LINE 8337");
					//mController.showCamera(this, e.source.fieldName);
					if (this.bImgFound == false) {
						try{
						//COMMON.Log("LINE 8340");
						try{
							var qry = "SELECT * FROM ActionConfig WHERE Actionname = 'CameraIconClicked' and ScreenName=" + Ti.App.SQL.safeSQL(e.source.screenName) + " and FieldName = " + Ti.App.SQL.safeSQL(e.source.fieldName) + " and (ifnull(Access,'') ='' OR Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel) + ") ORDER By ActionName, DisplayNo";
							//COMMON.Log('6648 qry ---> ' + qry);
							var dbDataRows = Ti.App.configDBConn.execute(qry);
							if (dbDataRows.isValidRow()) {
								dbDataRows.close();
								//db.close();	
								mController.CameraIconClicked(this, e.source.fieldName);
								return false;
							}
						}catch(e){}
						//COMMON.Log("LINE 8352");
						//mController = Ti.App.currentController
						mController.showCamera(this, e.source.fieldName);
					}catch(e){
          //COMMON.Log("Error "+e);
          }
					} else {
						mController.showPreviewPopup(this, e.source.fieldName);
					}
				} catch (e) { }
			});
			view.add(img);
		} else if (formdata.FieldControl == 'BUTTONGROUP') {
			var query = ArrayOperations.prototype.getQueryConfigByScreenNameWithOrderText(screenName + "_FORM_BUTTONGROUP_" + formdata.fieldName);
			//var db = commonObj.dbConnectionObj.createDataBaseConnection();
			dbDataRows = Ti.App.dbConn.execute(query);
			var dTabCount = 0;
			while (dbDataRows.isValidRow()) {
				dTabCount = dTabCount + 1;
				dbDataRows.next();
			}
			dbDataRows.close();
			//db.close();
			var dTabCnt = (test == null || test == undefined || test == '') ? formdata.DefaultValue : test;
			dTabCnt = (dTabCount > 0) ? dTabCount : dTabCnt;
			dTabCnt = (dTabCnt == null || dTabCnt == undefined || dTabCnt == "" || dTabCnt == 0) ? 1 : dTabCnt;
			var dTabWidth = 99 / dTabCnt;
			//var sTab = TableViewBasicUIObj.createBasicView(null, 'transparent', 60, '100%', null, null, null, null, 'vertical');
			//var sTabHeaderView = TableViewBasicUIObj.createBasicView(null, 'transparent', 60, '100%', null, null, null, null, 'horizontal');

			var sTab = TableViewBasicUIObj.createBasicView(null, 'transparent', formdata.ValueHeight * Ti.App.dHeightRatio, '100%', null, null, null, null, 'vertical');
			var sTabHeaderView = TableViewBasicUIObj.createBasicView(null, 'transparent', formdata.ValueHeight * Ti.App.dHeightRatio, '100%', null, null, null, null, 'horizontal');

			sTab.add(sTabHeaderView);
			//db = commonObj.dbConnectionObj.createDataBaseConnection();
			dbDataRows = Ti.App.dbConn.execute(query);
			var tabIndex = 0;
			while (dbDataRows.isValidRow()) {
				if (tabIndex == dTabCnt - 1) {
					dTabWidth = 99.8 - (dTabWidth * tabIndex);
				}
				var field = commonObj.BasicButtonObj.createButton(dbDataRows.fieldByName('Descriptions'), dTabWidth + '%', formdata.ValueHeight * Ti.App.dHeightRatio, formdata.VFontSize, '#e8e8e8');
				field.code = dbDataRows.fieldByName('Value');
				field.dTabCnt = dTabCnt;
				field.left = 0;
				field.borderWidth = 1;
				field.fieldName = formdata.fieldName;
				field.sTab = sTab;
				field.index = tabIndex;
				field.dTabWidth = dTabWidth;
				if (tabIndex > 0) {
					field.backgroundImage = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'whitebutton.png');
					field.color = '#000';
				}
				field.addEventListener('click', function (e) {
					try {
						if (Ti.App.bFocusedTxtfield != null && Ti.App.bFocusedTxtfield != undefined) {
							Ti.App.bFocusedTxtfield.blur();
							Ti.App.bFocusedTxtfield = null;
							return;
						}
						var sTabView = e.source.sTab;
						var _TabField = "";
						var _LoopLen = sTabView.children[0].children.length;
						for (var i = 0; i < _LoopLen; i++) {
							_TabField = sTabView.children[0].children[i];
							_TabField.backgroundImage = Ti.App.ImageCacheObj.getImage('MobileSalesCache', (e.source.index == i) ? 'redbutton.png' : 'whitebutton.png');
							_TabField.color = (e.source.index == i) ? '#e8e8e8' : '#000';
						}
						mController.formGroupButtonClicked(e.source.code, this);
					} catch (e) { }
				});
				sTabHeaderView.add(field);
				tabIndex++;
				dbDataRows.next();
			}
			dbDataRows.close();
			//db.close();
			view.add(sTab);
		} else if (formdata.FieldControl == 'SIGNATURE' || formdata.FieldControl == 'SIGN' || formdata.FieldControl == 'PAINT') {
			var BasicSignatureView = require('/BaseComponents/BasicSignatureView');
			var paint = new BasicSignatureView().createBasicSignatureView('', '', '', '', formdata.ValueWidth, formdata.ValueHeight, '#fff', this.argbToRGB(formdata.borderColor), formdata.showBorder);
			paint.fieldControl = formdata.FieldControl.toUpperCase();
			paint.fieldName = formdata.fieldName;
			paint.dataMember = formdata.DataMember;
			paint.DataMemberType = formdata.DataMemberType;
			paint.index = ctr;
			paint.addEventListener('touchstart', function (e) {
				mView.disabledFormScrollView();
			});
			paint.addEventListener('touchend', function (e) {
				mView.enabledFormScrollView();
				//var SignImage = paint.toImage().media;//this.toImage();
				var SignImage = paint.toImage();//this.toImage();
				//COMMON.Log('SignImage --> ' + SignImage);
				var imgname = 'tmpSign.png';
				try {
					//var db = commonObj.dbConnectionObj.createDataBaseConnection();
					var sScreenName = Ti.App.currentScreenName + "_" + e.source.fieldName + "_SAVESIGN";
					//COMMON.Log('SAVE SIGN sScreenName --> ' + sScreenName);
					var qry = "SELECT * FROM ActionConfig WHERE ScreenName = " + Ti.App.SQL.safeSQL(sScreenName) + " ORDER By ActionName, DIsplayNo";
					//COMMON.Log('SAVE PHOTO --> ' + qry);
					dbDataRows = Ti.App.configDBConn.execute(qry);
					while (dbDataRows.isValidRow()) {
						var qry = ArrayOperations.prototype.getQueryConfigByScreenName(dbDataRows.fieldByName('ActionPlan'));
						if (qry != null && qry != undefined && qry != '') {
							qry = mView.formatQueryString(qry, Ti.App.currentScreenName);
							//COMMON.Log('qry --> ' + qry);
							var _dbDataRows = Ti.App.dbConn.execute(qry);
							if (_dbDataRows.isValidRow()) {
								imgname = _dbDataRows.fieldByName(_dbDataRows.fieldName(0));
							}
							_dbDataRows.close();
						}
						dbDataRows.next();
					}
					dbDataRows.close();
					//db.close();
				} catch (e) {
					imgname = 'tmpSign.png';
				}
				try {
					//COMMON.Log("Success Event --> Image Name: " + imgname);
					var bIsAndroid = COMMON.isPlatformAndroid();
					if (bIsAndroid) {//COMMON.isPlatformAndroid()) {
						//ImageFactory = require('ti.imagefactory');
						//image = ImageFactory.compress(image, 0.25);
						//image = ImageFactory.imageAsResized(image, { width: 320, height: 240 });
					}
					var file = null;
					if (bIsAndroid) {
						var folder = Titanium.Filesystem.getFile('file:///mnt/sdcard/com.simplrsales', 'Photo');
						//COMMON.Log('folder.nativePath ---> ' + folder.nativePath);
						if (!folder.exists()) {
							folder.createDirectory();
						}
						file = Titanium.Filesystem.getFile(folder.nativePath, imgname);

					} else {
						file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, imgname);
					}
					if (file.exists()) {
						file.deleteFile();
					}
					//COMMON.Log('SignImage --> ' + SignImage); 
					file.write(SignImage);
					var objPhotoTaken = {};
					objPhotoTaken.fieldName = e.source.fieldName;
					mController.PerformAction('SignCapture', objPhotoTaken);
				} catch (e) { }
			});
			view.add(paint);
		} else if (formdata.FieldControl == 'PROGRESSBAR') {
			var dMinValue = 10, dMaxValue = 10, dProgressBarValue = 10;
			try {
				var pbValue = mController.progressBarMinMaxValue(formdata.fieldName, formdata.DataMember, formdata.screenName);
				if (pbValue != undefined && pbValue != null && pbValue != '') {
					dMinValue = (pbValue.MinValue != undefined && pbValue.MinValue != null && pbValue.MinValue != '') ? pbValue.MinValue : 10;
					dMaxValue = (pbValue.MaxValue != undefined && pbValue.MaxValue != null && pbValue.MaxValue != '') ? pbValue.MaxValue : 10;
					dProgressBarValue = (pbValue.ProgressBarValue != undefined && pbValue.ProgressBarValue != null && pbValue.ProgressBarValue != '') ? pbValue.ProgressBarValue : 10;
				}
			} catch (e) {
				dMinValue = 10;
				dMaxValue = 10;
				dProgressBarValue = 10;
			}
			var pb = Ti.UI.createProgressBar({
				width: formdata.ValueWidth,
				min: dMinValue,//0,
				max: dMaxValue,//10,
				value: dProgressBarValue,//0,
				color: 'blue',
				message: '',//'Downloading 0 of 10',
				font: { fontSize: formdata.VFontSize },//, fontWeight: 'bold'},
				style: Titanium.UI.iPhone.ProgressBarStyle.PLAIN,
			});
			pb.top = valueTop;
			pb.borderWidth = 0;
			pb.fieldControl = formdata.FieldControl.toUpperCase();
			pb.left = formdata.headerWidth;
			pb.fieldName = formdata.fieldName;
			pb.dataMember = formdata.DataMember;
			pb.DataMemberType = formdata.DataMemberType;
			pb.screenName = formdata.screenName;
			pb.index = ctr;
			view.add(pb);
		} else if (formdata.FieldControl == 'BUTTON') {
			test = formdata.DefaultValue;
			if (formValues != undefined) {
				var formValueslength = formValues.length;
				for (var ctr = 0; ctr < formValueslength; ctr++) {
					var obj = formValues[ctr];
					if (obj.fieldName.toUpperCase() == formdata.fieldName.toUpperCase()) {
						test = obj.value;
						ctr = formValueslength;
					}
				}
			}
			test = (test == "") ? 'BTN' : test;
			var button = commonObj.BasicButtonObj.createButton(test, formdata.ValueWidth, formdata.ValueHeight, formdata.VFontSize, '#e8e8e8');
			if (formdata.showBorder == 1) {
				button.borderColor = this.argbToRGB(formdata.borderColor);
			}
			button.top = valueTop;
			button.borderWidth = 0;
			button.fieldControl = formdata.FieldControl.toUpperCase();
			button.left = formdata.headerWidth;
			button.fieldName = formdata.fieldName;
			button.dataMember = formdata.DataMember;
			button.DataMemberType = formdata.DataMemberType;
			button.screenName = formdata.screenName;
			button.index = ctr;
			button.bReadOnly = false;
			if (test.indexOf('.png') > -1 || test.indexOf('.simg') > -1) {
				button.title = null;
				button.backgroundImage = Ti.App.ImageCacheObj.getImage('MobileSalesCache', test);
				button.backgroundColor = 'transparent';
				if (test == 'AddMsg.png') {
					button.backgroundColor = '#575656';
				}
			} else if (test == 'Cancel' || test.indexOf('Profile') > -1 || test.indexOf('History') > -1 || test == 'RETURN' || test == 'EXCHANGE') {
				button.backgroundImage = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'whitebutton.png');//'whiteBtnBg.png');
				button.color = '#666666';
			}
			button.addEventListener('click', function (e) {
				try {
					if (this.bReadOnly == true) {
						return "";
					}
					Ti.App.frmButtonField = this;
					//if(e.source.fieldName == e.source.dataMember){
					if (Ti.App.bFocusedTxtfield != null && Ti.App.bFocusedTxtfield != undefined) {
						Ti.App.bFocusedTxtfield.blur();
						Ti.App.bFocusedTxtfield = null;
						//return; //NEED TO CHECK TxtFieldLostFocus finished ot not. 
					}
					mController.formButtonClicked(e.source.fieldName);
					if (test == 'Order' || test == 'Return' || test == 'Exchange') {
						e.source.backgroundImage = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'btnColor.png');
						e.source.color = '#e8e8e8';
					}
					/*}else{
						mController.UpdateFormButtonClicked(e.source.screenName, e.source.fieldName, e.source.dataMember);
					}*/
				} catch (e) { }
			});
			view.add(button);
		} else if (formdata.FieldControl == 'COVERFLOW') {
			view.backgroundColor = 'transparent';
			var coverFlowPanel = TableViewBasicUIObj.createBasicView(null, 'transparent', formdata.ValueHeight, Ti.UI.FILL, 0, 0, 0, 0, 'vertical');
			var images = [];
			if (Ti.App.sScreenName == 'View Document') {
				try {
					images = mController.getCustSerImages();// getImage from ServiceImage table
				} catch (e) {
					images = [];
				}
			} else if (Ti.App.sScreenName != 'View Document' && screenName.toUpperCase() != 'OPENSERVICE') {
				for (var c = 1; c < 5; c++) {
					images[c] = '/images/coverflow/' + c + '.png';
				}
			}
			var GalleryParentView = TableViewBasicUIObj.createBasicView(null, 'transparent', '80%', '100%', 0, 0, 0, 0, 'horizontal');
			var childView = Titanium.UI.createImageView({
				height: Ti.UI.SIZE,//'80%',//400,
				width: Ti.UI.SIZE,//'100%',//400,
				enableZoomControls: true
			});
			if (images.length > 0) {
				childView.image = images[0];
			}
			childView.addEventListener('touchstart', function (e) {
				mView.disabledFormScrollView();
			});
			GalleryParentView.add(childView);
			coverFlowPanel.add(GalleryParentView);
			var scrollView = Ti.UI.createScrollView({
				contentWidth: 'auto',
				contentHeight: 'auto',//'200', //'auto',//'100',
				height: '20%',//'200',
				showVerticalScrollIndicator: true,
				showHorizontalScrollIndicator: true,
				scrollType: 'horizontal',
				zIndex: 1,
				//backgroundColor : '#fff'
			});
			var horizontalParentView = TableViewBasicUIObj.createBasicView(null, 'transparent', '100%', (images.length * 201), 0, 0, 0, 0, 'horizontal');
			scrollView.add(horizontalParentView);
			coverFlowPanel.add(scrollView);
			var coverFlowView = null;
			var imageslength = images.length;
			for (var ctr = 0; ctr < imageslength; ctr++) {
				coverFlowView = Titanium.UI.createImageView({
					height: Ti.UI.SIZE,//'90%',//200,
					width: Ti.UI.SIZE,//200,
					top: '5%',
					bottom: '5%',
					left: 10,
					image: images[ctr],
					zIndex: 1,
					index: ctr
				});
				coverFlowView.addEventListener('click', function (e) {
					childView.image = images[e.source.index];
				});
				horizontalParentView.add(coverFlowView);
			}
			view.add(coverFlowPanel);
		} else if (formdata.FieldControl == 'RADIOBUTTON') {
			var RadioBtn = new BasicCheckBox().createBasicCheckBox(false, 2);
			RadioBtn.backgroundImage = '/images/optionButton.png';
			RadioBtn.borderWidth = 0;
			RadioBtn.title = '';//formdata.newText;
			RadioBtn.DefaultValue = formdata.DefaultValue;
			RadioBtn.fieldName = formdata.fieldName;
			RadioBtn.DataMember = formdata.DataMember;
			RadioBtn.dataMember = formdata.DataMember;
			RadioBtn.DataMemberType = formdata.DataMemberType;
			RadioBtn.fieldControl = formdata.FieldControl.toUpperCase();
			if (Ti.Platform.name == 'android') {
				RadioBtn.addEventListener('click', RadioBtnevent);
			} else {
				RadioBtn.addEventListener('change', RadioBtnevent);
			}
			function RadioBtnevent(e) {
				if (Ti.App.bSurveyRadioButtonClicked == true) {
					return false;
				}
				var arrDataMemberIndex = [];
				var formDataMemberlength = formDataMember.length;
				for (var i = 0; i < formDataMemberlength; i++) {
					//COMMON.Log(formDataMember[i]  + ' == ' + this.dataMember.toUpperCase());
					if (formDataMember[i] == this.dataMember.toUpperCase()) {
						arrDataMemberIndex.push(i);
					}
				}
				Ti.App.bSurveyRadioButtonClicked = true;
				var _thisRadioBtn = null;
				var arrDataMemberIndexlength = arrDataMemberIndex.length;
				for (var i = 0; i < arrDataMemberIndexlength; i++) {
					_thisRadioBtn = ArrayOperations.prototype.getFormComponent(formFieldNames[arrDataMemberIndex[i]]);
					_thisRadioBtn.backgroundImage = '/images/optionButton.png';
					//COMMON.Log(this.DefaultValue + ' == ' + _thisRadioBtn.DefaultValue + ' && ' + this.value + ' == true');
					if (this.DefaultValue == _thisRadioBtn.DefaultValue && this.value == true) {
						_thisRadioBtn.value = true;
						_thisRadioBtn.backgroundImage = '/images/OptionButton1.png';
					} else {
						_thisRadioBtn.value = false;
					}
				}
				_thisRadioBtn = null;
				setTimeout(function () {
					Ti.App.bSurveyRadioButtonClicked = false;
				}, 100);
			}
			view.add(RadioBtn);
			var RadioBtnLbl = commonObj.BasicLabelObj.createLabel(formdata.newText, formdata.dValueWidth + "%", formdata.ValueHeight, formdata.VFontSize, 'normal', 10, this.argbToRGB(formdata.VForeColor), this.argbToRGB(formdata.VBackColor), 2, null);
			RadioBtn.title = '';
			RadioBtnLbl.left = '12%';
			RadioBtnLbl.backgroundColor = this.argbToRGB(formdata.VBackColor);//'#000';//'transparent';
			RadioBtnLbl.DefaultValue = formdata.DefaultValue;
			RadioBtnLbl.fieldName = formdata.fieldName;
			RadioBtnLbl.dataMember = formdata.DataMember;
			RadioBtnLbl.DataMemberType = formdata.DataMemberType;
			if (test == formdata.DefaultValue) {
				RadioBtn.value = true;
			}
			view.add(RadioBtnLbl);
		} else if (formdata.FieldControl == 'WEBVIEW' || formdata.FieldControl == 'CHART') {
			backgroundColor = "'#e8e8e8'";
			width = "'500'";
			height = "'300'";
			fontSize = "'12px'";
			fontColor = "'black'";
			if (formdata.DefaultValue == '') {
				test = '';
				if (formValues != undefined) {
					var obj = {};
					var formValueslength = formValues.length;
					for (var ctr = 0; ctr < formValueslength; ctr++) {
						obj = formValues[ctr];
						if (obj.fieldName.toUpperCase() == formdata.fieldName.toUpperCase()) {
							test = (obj.value == null || obj.value == undefined) ? '' : obj.value;
						}
					}
				}
				if (test != '') {
					if (test.indexOf('RC0000010.html') > -1) {
						var file = (bIsAndroid) ? Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, 'RC0000010.html') : Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'RC0000010.html');
						if (file.exists()) {
							var webView = Titanium.UI.createWebView({
								url: file.nativePath,
								height: formdata.ValueHeight,
								width: formdata.ValueWidth,
								backgroundColor: 'white',
								enableZoomControls: false,//true,
								scalesPageToFit: false,
								webViewType: '',
								screenName: screenName,
								willHandleTouches : false
							});
							webView.addEventListener('touchstart', function (e) {
								mView.disabledFormScrollView();
							});
							//webView.addEventListener('touchend',function(e){
							//mView.enabledFormScrollView();
							//});
						} else {
							var webView = Titanium.UI.createWebView({
								//url : "http://54.251.247.189/SimplrSalesService/KB/RC0000010.html",
								url: "error.html",
								//url : file.nativePath,//formdata.DefaultValue+"/index.html",
								height: formdata.ValueHeight,//Ti.UI.SIZE,
								width: formdata.ValueWidth,//Ti.UI.SIZE,
								backgroundColor: 'white',
								enableZoomControls: true,
								touchEnabled: true,//false,
								scalesPageToFit: false,
								webViewType: '',//formdata.DefaultValue,
								screenName: screenName,
								willHandleTouches : false
							});
						}
					}
				}
			} else {
				if (formdata.DefaultValue != '/Map/Route Map' && formdata.DefaultValue != '/Map/Offlinemap') {
					_URL = '';
					var file = (bIsAndroid) ? Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, formdata.DefaultValue) : Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, formdata.DefaultValue);
					if (file.exists()) {
						////IBIZCS - formdata.DefaultValue = '';
						_URL = file.nativePath;
					} else {
						_URL = formdata.DefaultValue;
						////IBIZCS - formdata.DefaultValue = '';
					}
				}
				//var query = "Select '#FECB69' as backgroundColor, '500' as width, '325' as height, '12px' as fontSize, 'black' as fontColor";
				if (formdata.DefaultValue != '/Map/Route Map' && formdata.DefaultValue != '/Map/Offlinemap' && formdata.DefaultValue != '' && formdata.DefaultValue != '/Map/Cust Map' && formdata.fieldName != "ShowcaseFile") {
					try {
						var query = ArrayOperations.prototype.getQueryConfigByScreenName(screenName + "_FORM_CHART_SalesChart_INIT");
						//COMMON.Log('Chart INIT Query ---> ' + query);
						if (query != null && query != undefined && query != '') {
							//var db = commonObj.dbConnectionObj.createDataBaseConnection();
							dbDataRows = Ti.App.dbConn.execute(query);
							while (dbDataRows.isValidRow()) {
								backgroundColor = "'" + dbDataRows.fieldByName('backgroundColor') + "'";
								width = "'" + dbDataRows.fieldByName('width') + "'";
								height = "'" + dbDataRows.fieldByName('height') + "'";
								fontSize = "'" + dbDataRows.fieldByName('fontSize') + "'";
								fontColor = "'" + dbDataRows.fieldByName('fontColor') + "'";
								dbDataRows.next();
							}
							dbDataRows.close();
							//db.close();
						}

						_URL = formdata.DefaultValue + "/index.html";
						if (screenName.toUpperCase() == 'NewCustomer'.toUpperCase() || screenName.toUpperCase() == 'AgentAcknowledgement'.toUpperCase()) {
							_URL = '';
							var file = (bIsAndroid) ? Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, formdata.DefaultValue) : Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, formdata.DefaultValue);
							if (file.exists()) {
								////IBIZCS - formdata.DefaultValue = '';
								_URL = file.nativePath;
							} else {
								_URL = formdata.DefaultValue;
								////IBIZCS - formdata.DefaultValue = '';
							}


							//_URL = "terms.html";//formdata.DefaultValue;
						}

					} catch (e) {


						_URL = formdata.DefaultValue + "/index.html";
						if (screenName.toUpperCase() == 'NewCustomer'.toUpperCase() || screenName.toUpperCase() == 'AgentAcknowledgement'.toUpperCase()) {
							//_URL = formdata.DefaultValue;
							//_URL = "terms.html";
							_URL = '';
							var file = (bIsAndroid) ? Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, formdata.DefaultValue) : Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, formdata.DefaultValue);
							if (file.exists()) {
								////IBIZCS - formdata.DefaultValue = '';
								_URL = file.nativePath;
							} else {
								_URL = formdata.DefaultValue;
								////IBIZCS - formdata.DefaultValue = '';
							}
						}

					}
				} else if (formdata.DefaultValue == "/Map/Route Map" || formdata.DefaultValue == '/Map/Offlinemap' || formdata.DefaultValue == '/Map/Cust Map' || formdata.DefaultValue == '/Charts/Schedule') {
					_URL = formdata.DefaultValue + "/index.html";
				}				//COMMON.Log('_URL --> ' + _URL);
				commonObj.bEnableZoomControls = true;
				if (formdata.DefaultValue == '/Map/Route Map' || formdata.DefaultValue == '/Map/Offlinemap' || formdata.DefaultValue == '/Map/Cust Map') {
					if (bIsAndroid) {
						commonObj.bEnableZoomControls = false;
					}
				}
				//_URL = 'https://v5ph-uat.com/V5/';//https://www.youtube.com/watch?v=6-0kiZHCtjc';
				//COMMON.Log('_URL --> ' + _URL);
				var webView = Titanium.UI.createWebView({
					url: _URL,//formdata.DefaultValue+"/index.html",
					height: formdata.ValueHeight,//Ti.UI.SIZE,
					width: formdata.ValueWidth,//Ti.UI.SIZE,
					backgroundColor: 'white',
					enableZoomControls: commonObj.bEnableZoomControls,//false,//true,
					scalesPageToFit: false,
					webViewType: formdata.DefaultValue,
					screenName: screenName,
					mixedContentMode: true,
					touchEnabled: true,//false,
					zIndex : 99,
					willHandleTouches : false
				});
/********/
				webView.addEventListener('touchstart', function (e) {
					//COMMON.Log('webview touchstart');
					mView.disabledFormScrollView();
				});

				webView.addEventListener('touchend', function (e) {
					//COMMON.Log('webview touchend');
					mView.enabledFormScrollView();
				});

				webView.addEventListener('click', function (e) {
					//COMMON.Log('webview click');
					//mView.enabledFormScrollView();
				});

				webView.addEventListener('dblclick', function (e) {
					//COMMON.Log('webview dblclick');
					mView.disabledFormScrollView();
				});

				webView.addEventListener('doubletap', function (e) {
					//COMMON.Log('webview doubletap');
					mView.disabledFormScrollView();
				});

				webView.addEventListener('focus', function (e) {
					//COMMON.Log('webview focus');
					mView.disabledFormScrollView();
				});

				webView.addEventListener('singletap', function (e) {
					//COMMON.Log('webview singletap');
					mView.disabledFormScrollView();
				});

				/*webView.addEventListener('swipe',function(e){
					//COMMON.Log('webview swipe');
					mView.disabledFormScrollView();
				});
				webView.addEventListener('cancel',function(e){
					//COMMON.Log('webview cancel');
					mView.enabledFormScrollView();
				}); */
				/*webView.addEventListener('touchstart',function(e){
                    mView.disabledFormScrollView();
                });
                webView.addEventListener('touchend',function(e){
                    mView.enabledFormScrollView();
                });*/

				//webView.addEventListener('scrollend',function(e){
				//mView.enabledFormScrollView();
				//});

				//webView.addEventListener('touchcancel',function(e){
				//mView.enabledFormScrollView();
				//});
				if (formdata.DefaultValue == '/Map/Offlinemap') {
					webView.backgroundColor = 'transparent';
				}
				//if(formdata.DefaultValue == '/Charts/Arc Axis' || formdata.DefaultValue == '/Charts/Gauge'){
				//webView.url = '/Charts/Arc Axis';
				//}
			}
			//COMMON.Log('webView ---> ' + webView);
			webView.left = formdata.headerWidth;
			//MAPVIEW
			if (formdata.DefaultValue == '/Map/Route Map' || formdata.DefaultValue == '/Map/Cust Map') {//if(formdata.fieldName == "RouteMap"){
				var GoogleMapType = {
					None: 0,
					RoadMap: 1,
					Terrain: 2,
					Hybrid: 3,
					Satellite: 4
				};
				var InitialZoom = 11;
				//SINGAPORE
				var InitialLatitude = 1.3738459;
				var InitialLongitude = 103.7981414;
				//From SystemList
				InitialLatitude = ArrayOperations.prototype.getSystemValue('InitialLatitude');
				InitialLongitude = ArrayOperations.prototype.getSystemValue('InitialLongitude');
				InitialLatitude = (InitialLatitude != undefined && InitialLatitude != null && InitialLatitude != '') ? InitialLatitude : 1.3738459;
				InitialLongitude = (InitialLongitude != undefined && InitialLongitude != null && InitialLongitude != '') ? InitialLongitude : 103.7981414;
				//InitialLatitude =  14.604064;
				//InitialLongitude = 120.989719

				var InitialMapType = GoogleMapType.RoadMap;
				Titanium.Geolocation.getCurrentPosition(function (e) {
					if (!e.error) {
						//get the properties from Titanium.GeoLocation
						//1.299779, 103.830399
						InitialLatitude = e.coords.latitude;
						InitialLongitude = e.coords.longitude;
					}
				});
				webView.addEventListener('load', function () {
					//SINGAPORE
					//InitialLatitude = 1.299779;
					//InitialLongitude = 103.830399;

					//Indonesia
					//InitialLatitude = -7.35827;
					//InitialLongitude = 111.08294;
					Titanium.App.Properties.setString('ISVISITED', '0');
					//webView.evalJS("Initialize(" + InitialZoom + "," + InitialLatitude + "," + InitialLongitude + "," + InitialMapType + ")");
					webView.evalJS("Initialize(" + InitialZoom + "," + InitialLatitude + "," + InitialLongitude + "," + InitialMapType + ")");
					//POD DEMO
					//webView.evalJS("Initialize(" + InitialLatitude + "," + InitialLongitude + ")");
					//ToDo
					//LoadRoute('todayroutid');
				});
			} else if (formdata.DefaultValue == '/Map/Offlinemap') {
				webView.addEventListener('load', function () {
					webView.evalJS("Initializemap()");
				});
			} else if (formdata.DefaultValue == '/Map/Cust Map') {
				var GoogleMapType = {
					None: 0,
					RoadMap: 1,
					Terrain: 2,
					Hybrid: 3,
					Satellite: 4
				};
				var InitialZoom = 11;
				var InitialLatitude = 1.3738459;
				var InitialLongitude = 103.7981414;
				var InitialMapType = GoogleMapType.RoadMap;
				Titanium.Geolocation.getCurrentPosition(function (e) {
					if (!e.error) {
						//get the properties from Titanium.GeoLocation
						InitialLatitude = e.coords.latitude;
						InitialLongitude = e.coords.longitude;
					}
				});
				webView.addEventListener('load', function () {
					Titanium.App.Properties.setString('ISVISITED', '0');
					webView.evalJS("Initialize(" + InitialZoom + "," + InitialLatitude + "," + InitialLongitude + "," + InitialMapType + ")");
					//ToDo
					//LoadRoute('todayroutid');
				});
			} else if (formdata.DefaultValue == '/Charts/Schedule') {
				webView.left = 2;
				webView.enableZoomControls = false;
				webView.addEventListener('load', function (e) {
					//var Content = "{ title:'All Day Event'@@start:'2015-02-01'}##{title:'Long Event'@@start:'2015-02-07'@@end:'2015-02-10'}##{ id:999@@title:'Repeating Event'@@start:'2015-02-09T16:00:00' }##{ id:999@@title:'Repeating Event'@@start:'2015-02-16T16:00:00' }##{ title:'Conference'@@start:'2015-02-11'@@end:'2015-02-13' }##{ title:'Meeting'@@start:'2015-02-12T10:30:00'@@end:'2015-02-12T12:30:00' }##{ title:'Lunch'@@start:'2015-02-12T12:00:00' }##{ title:'Meeting'@@start:'2015-02-12T14:30:00' }##{ title:'Happy Hour'@@start:'2015-02-12T17:30:00' }##{ title:'Dinner'@@start:'2015-02-12T20:00:00' }##{ title:'Birthday Party'@@start:'2015-02-13T07:00:00' }##{ title:'Click for Google'@@url:'http://google.com/'@@start:'2015-02-28'}";
					//webView.evalJS("InitializeSchedule("+Content+")");
					//webView.evalJS("InitializeSchedule()");
					try {
						var query = "select CustNo as CustNo, CustName as title, ScheduleDate as startDate, ScheduleEnd as endDate from SalesSchedule WHERE startDate >= datetime('Now','localtime','start of day')";
						//COMMON.Log('Schedule query ---> ' + query);
						//var db = new dbConnection().createDataBaseConnection();
						dbDataRows = Ti.App.dbConn.execute(query);
						var str = '';
						while (dbDataRows.isValidRow()) {
							if (str == '') {
								str = '{';
							} else {
								str += '##{';
							}
							str += 'title:@@' + dbDataRows.fieldByName('title') + '@@';
							str += ',start:@@' + dbDataRows.fieldByName('startDate') + '@@';
							str += ',end:@@' + dbDataRows.fieldByName('endDate') + '@@';
							str += ',CustNo:@@' + dbDataRows.fieldByName('CustNo') + '@@';
							str += '}';
							dbDataRows.next();
						}
						dbDataRows.close();
						//db.close();
						var Content = str;
						//var Content = "{title:@@All Day Event@@,start:@@2015-02-01@@}##{title:@@Long Event@@,start:@@2015-02-07@@,end:@@2015-02-10@@}##{id:999,title:@@Repeating Event@@,start:@@2015-02-09T16:00:00@@ }##{id:999,title:@@Repeating Event@@,start:@@2015-02-16T16:00:00@@ }##{title:@@Conference@@,start:@@2015-02-11@@,end:@@2015-02-13@@ }##{title:@@Meeting@@,start:@@2015-02-12T10:30:00@@,end:@@2015-02-12T12:30:00@@}##{ title:@@Lunch@@,start:@@2015-02-12T12:00:00@@ }##{title:@@Meeting@@,start:@@2015-02-12T14:30:00@@ }##{title:@@Happy Hour@@,start:@@2015-02-12T17:30:00@@}##{title:@@Dinner@@,start:@@2015-02-12T20:00:00@@ }##{title:@@Birthday Party@@,start:@@2015-02-13T07:00:00@@ }##{title:@@Click for Google@@,url:@@http://google.com/@@,start:@@2015-02-28@@}";
						//alert('Content --> ' + Content);
						webView.evalJS("InitializeSchedule('" + Content + "')");
					} catch (e) {
						alert('e---> ' + e);
					}
				});
			}
			//CHARTVIEW
			if (formdata.DefaultValue == '/Charts/3D Donut') {
				webView.addEventListener('load', function (e) {
					var fieldCount = 4;
					/*var query = "Select 'Basic' as label, '#ff0000' as color, '10' as value, '100' as total";
			query += " UNION Select 'Plus' as label, '#ffff00' as color, '20' as value, '100' as total";
			*/
					var query = ArrayOperations.prototype.getQueryConfigByScreenNameWithOrderText(this.screenName + "_FORM_CHART_SalesChart");
					if (query != null && query != undefined && query != '') {
						//COMMON.Log('chart query ---> ' + query);
						//var query =  ArrayOperations.prototype.getQueryConfigByScreenName("Chart-AnimatedDonumChart");
						//var db = commonObj.dbConnectionObj.createDataBaseConnection();
						dbDataRows = Ti.App.dbConn.execute(query);
						var str = '', _total = 0;
						while (dbDataRows.isValidRow()) {
							_total += parseFloat(dbDataRows.fieldByName('value'));
							dbDataRows.next();
						}
						dbDataRows.close();
						dbDataRows = Ti.App.dbConn.execute(query);
						var str = '', i = 0;
						var color = ["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00", "#ff0000", "#00ff00", "#0000ff"];
						while (dbDataRows.isValidRow()) {
							if (str == '') {
								str = '{';
							} else {
								str += '##{';
							}
							str += 'label:@@' + dbDataRows.fieldByName('label') + '@@';
							str += ',value:' + dbDataRows.fieldByName('value') + '';
							str += ',total:' + _total + '';
							str += ',color:@@' + color[i] + '@@';
							i++;
							str += '}';
							dbDataRows.next();
						}
						dbDataRows.close();
						//db.close();
						str = "'" + str + "'";
						webView.evalJS("Initialize3DDonut(" + backgroundColor + "," + width + "," + height + "," + fontSize + "," + fontColor + "," + str + ")");
					}
				});
			} else if (formdata.DefaultValue == '/Charts/Line Chart') {
				webView.addEventListener('load', function (e) {
					/*
					 * 
	date	close
	1-May-12	282.13
	2-Jan-08	194.84
	24-Dec-07	198.80
					 */
					var fieldCount = ['string', 'number'];
					/*var query = "Select '1-May-12' as date, '282.13' as close";
			query += " UNION Select '30-Apr-12' as date, '283.98' as close";
			query += " UNION Select '28-Dec-11' as date, '402.64' as close";*/
					var query = ArrayOperations.prototype.getQueryConfigByScreenName(this.screenName + "_FORM_CHART_SalesChart");
					//var query =  ArrayOperations.prototype.getQueryConfigByScreenName("Chart-LineChart");
					if (query != null && query != undefined && query != '') {
						var str = "'" + COMMONMODEL.getChartData(fieldCount, query) + "'";
						var lineColor = "'#333333'";
						var axisLineColor = "'#333333'";
						webView.evalJS("InitializeLineChart(" + backgroundColor + "," + width + "," + height + "," + fontSize + "," + fontColor + "," + lineColor + "," + axisLineColor + "," + str + ")");
					}
				});
			} else if (formdata.DefaultValue == '/Charts/Bar Chart') {
				webView.addEventListener('load', function (e) {
					var fieldCount = ['string', 'number'];//2;
					/*var query = "Select 'Jan' as letter, '.08167' as frequency";
			query += " UNION Select 'Dec' as letter, '.07373' as frequency";
			*/
					var query = ArrayOperations.prototype.getQueryConfigByScreenNameWithOrderText(this.screenName + "_FORM_CHART_SalesChart");
					if (query != null && query != undefined && query != '') {
						/*var query = "Select 'Hoe Huat Seng Provision Trading' as letter, '.08167' as frequency";
						query += " UNION Select 'CMM Marketing Management Pte Ltd' as letter, '.06532' as frequency";
						*/
						//COMMON.Log('Bar Chart Quert ---> ' + query); 
						var str = "'" + COMMONMODEL.getChartData(fieldCount, query) + "'";
						width = "'" + (Ti.App.deviceWidth - 50) + "'";
						height = "'" + (this.height) + "'";//height = "'325'";
						var yAxisLabel = "'SALES'";
						var barChartColor = "'#FECB69'";//"'#800080'";
						webView.evalJS("InitializeBarChart(" + backgroundColor + "," + width + "," + height + "," + fontSize + "," + fontColor + "," + yAxisLabel + "," + barChartColor + "," + str + ")");
					}
				});
			} else if (formdata.DefaultValue == '/Charts/AnimatedDonumChartWithLabels') {
				webView.addEventListener('load', function (e) {
					var fieldCount = 3, label = '', value = '', color = '';
					/*var label = "'User1,User2,User3,User4,User5'";
					var value = "'10,20,10,40,20'";
					var color = "'#98abc5,#8a89a6,#7b6888,#6b486b,#a05d56'";
					*/
					/*var query = "Select 'User1' as label, '#98abc5' as color, '10' as value";
			query += " UNION Select 'User5' as label, '#a05d56' as color, '20' as value";
			*/
					var query = ArrayOperations.prototype.getQueryConfigByScreenNameWithOrderText(this.screenName + "_FORM_CHART_SalesChart");
					if (query != null && query != undefined && query != '') {
						//COMMON.Log('chart query ---> ' + query);
						//var db = commonObj.dbConnectionObj.createDataBaseConnection();
						dbDataRows = Ti.App.dbConn.execute(query);
						var str = '';
						while (dbDataRows.isValidRow()) {
							if (label != '') {
								label += ",";
								value += ",";
								color += ",";
							}
							label += dbDataRows.fieldByName('label');
							value += dbDataRows.fieldByName('value');
							color += dbDataRows.fieldByName('color');
							dbDataRows.next();
						}
						dbDataRows.close();
						//db.close();
						label = "'" + label + "'";
						value = "'" + value + "'";
						color = "'" + color + "'";
						webView.evalJS("InitializeAnimatedDonumChartWithLabels(" + backgroundColor + "," + width + "," + height + "," + fontSize + "," + fontColor + "," + label + "," + value + "," + color + ")");
					}
				});
			} else if (formdata.DefaultValue == '/Charts/Area Chart') {
				webView.addEventListener('load', function (e) {
					var str = "''", areaColor = "'#800080'";
					webView.evalJS("InitializeAreaChart(" + backgroundColor + "," + width + "," + height + "," + fontSize + "," + fontColor + "," + areaColor + "," + str + ")");
				});
			} else if (formdata.DefaultValue == '/Charts/Arc Axis') {
				webView.addEventListener('load', function (e) {
					var gaugeValue = "'44'", displayValue = "'56749'";
					//var query = "Select '75' as gaugeValue, '56789' as displayValue";
					var query = ArrayOperations.prototype.getQueryConfigByScreenNameWithOrderText(this.screenName + "_FORM_CHART_SalesChart");
					if (query != null && query != undefined && query != '') {
						//var db = commonObj.dbConnectionObj.createDataBaseConnection();
						dbDataRows = Ti.App.dbConn.execute(query);
						while (dbDataRows.isValidRow()) {
							gaugeValue = "'" + dbDataRows.fieldByName('gaugeValue') + "'";
							dbDataRows.next();
						}
						dbDataRows.close();
						//db.close();
						displayValue = gaugeValue;
						webView.evalJS("InitializeArcAxis(" + backgroundColor + "," + width + "," + height + "," + fontSize + "," + fontColor + "," + gaugeValue + "," + displayValue + ")");
					}
				});
			} else if (formdata.DefaultValue == '/Charts/Gauge') {
				webView.addEventListener('load', function (e) {
					/*var backgroundColor = "'#e8e8e8'";
					var width = "'500'";
					var height = "'300'";
					var fontSize = "'12px'";
					var fontColor = "'black'";
					var areaColor = "'#800080'";
					webView.evalJS("InitializeAreaChart("+backgroundColor+","+width+","+height+","+fontSize+","+fontColor+","+areaColor+")");
					*/
					//var fieldCount = 4;
					var fieldCount = ['string', 'string', 'string', 'string'];
					var label = '', minVal = '', maxVal = '', value = '';
					//backgroundColor,width,height,fontSize,fontColor,label,minVal,maxVal,value
					var query = ArrayOperations.prototype.getQueryConfigByScreenNameWithOrderText(this.screenName + "_FORM_CHART_SalesChart");
					if (query != null && query != undefined && query != '') {
						//COMMON.Log('chart query ---> ' + query);
						var str = '', i = 0;
						//label, -100 as [min], 100 as [max]
						//var db = commonObj.dbConnectionObj.createDataBaseConnection();
						dbDataRows = Ti.App.dbConn.execute(query);
						while (dbDataRows.isValidRow()) {
							if (label != '') {
								label += ",";
								minVal += ",";
								maxVal += ",";
								value += ",";
							}
							label += dbDataRows.fieldByName('label');
							minVal += dbDataRows.fieldByName('min');
							maxVal += dbDataRows.fieldByName('max');
							//value += dbDataRows.fieldByName('value');
							value += (dbDataRows.fieldByName('value') == '' || dbDataRows.fieldByName('value') == 'null' || dbDataRows.fieldByName('value') == null) ? 0 : dbDataRows.fieldByName('value');
							dbDataRows.next();
						}
						dbDataRows.close();
						//db.close();
						label = "'" + label + "'";
						minVal = "'" + minVal + "'";
						maxVal = "'" + maxVal + "'";
						value = "'" + value + "'";
						webView.evalJS("InitializeGauge(" + backgroundColor + "," + width + "," + height + "," + fontSize + "," + fontColor + "," + label + "," + minVal + "," + maxVal + "," + value + ")");
					}
				});
			} else if (formdata.DefaultValue == '/Charts/MultiSeriesLineChart') {
				var fieldCount = ['string', 'number', 'number', 'number', 'number', 'number'];
				/*var query = "Select '20111001' as date, '63.5' as NewYork, '65.5' as SanFrancisco, '70.5' as Singapore";
		query += " UNION Select '20111005' as date, '73.5' as NewYork, '65.5' as SanFrancisco, '70.5' as Singapore";
		*/
				webView.addEventListener('load', function (e) {
					var query = ArrayOperations.prototype.getQueryConfigByScreenNameWithOrderText(this.screenName + "_FORM_CHART_SalesChart");
					if (query != null && query != undefined && query != '') {
						//COMMON.Log('chart query ---> ' + query);
						var str = '';
						str = COMMONMODEL.getChartDataList(query);
						if (str == '') {
							return '';
						}
						str = "'" + str + "'";
						width = "'" + (Ti.App.deviceWidth) + "'";
						height = "'" + this.height + "'";
						//webView.evalJS("InitializeMultiSeriesLineChart("+backgroundColor+","+width+","+height+","+fontSize+","+fontColor+","+contents.text+")");
						webView.evalJS("InitializeMultiSeriesLineChart(" + backgroundColor + "," + width + "," + height + "," + fontSize + "," + fontColor + "," + str + ")");
					}
				});
			} else if (formdata.DefaultValue == '/Charts/BasicBarChart') {
				webView.addEventListener('load', function (e) {
					var query = ArrayOperations.prototype.getQueryConfigByScreenNameWithOrderText(this.screenName + "_FORM_CHART_SalesChart");
					if (query != null && query != undefined && query != '') {
						var str = "";
						//var db = commonObj.dbConnectionObj.createDataBaseConnection();
						dbDataRows = Ti.App.dbConn.execute(query);
						while (dbDataRows.isValidRow()) {
							//{State:'AL',freq:{low:4786, mid:1319, high:249}}
							if (str == '') {
								str = '{';
							} else {
								str += '##{';
							}
							str += 'State:@@' + dbDataRows.fieldByName('State') + '@@';
							str += ',freq:{low:' + dbDataRows.fieldByName('low') + ', mid:' + dbDataRows.fieldByName('mid') + ',high:' + dbDataRows.fieldByName('high') + '}}';
							dbDataRows.next();
						}
						dbDataRows.close();
						//db.close();
						str = "'" + str + "'";
						webView.evalJS("InitializeBasicBarChart(" + str + ")");
					}
				});
			} else if (formdata.DefaultValue == '/Charts/MultiChart') {
				webView.addEventListener('load', function (e) {
					var query = ArrayOperations.prototype.getQueryConfigByScreenNameWithOrderText(this.screenName + "_FORM_CHART_SalesChart");
					if (query != null && query != undefined && query != '') {
						var str1 = "", str2 = "";
						//var db = commonObj.dbConnectionObj.createDataBaseConnection();
						dbDataRows = Ti.App.dbConn.execute(query);
						//AgentName, SalesTarget, CurMonTarget
						while (dbDataRows.isValidRow()) {
							//{State:'AL',freq:{low:4786, mid:1319, high:249}}
							if (str1 == '') {
								str1 = '{';
							} else {
								str1 += '##{';
							}
							str1 += 'label:@@' + dbDataRows.fieldByName('AgentName') + '@@, y: ' + dbDataRows.fieldByName('SalesTarget') + '}';
							if (str2 == '') {
								str2 = '{';
							} else {
								str2 += '##{';
							}
							str2 += 'label:@@' + dbDataRows.fieldByName('AgentName') + '@@, y: ' + dbDataRows.fieldByName('CurMonTarget') + '}';
							//label: "Agent1", y: 18
							dbDataRows.next();
						}
						dbDataRows.close();
						//db.close();
						str1 = "'" + str1 + "'";
						str2 = "'" + str2 + "'";
						webView.evalJS("InitializeMultiChart(" + str1 + "," + str2 + ")");
					}
				});
			}
			if (formdata.DefaultValue != '/Map/Route Map' && formdata.DefaultValue != '/Map/Cust Map') {
				webView.addEventListener('touchstart', function (e) {
					mView.disabledFormScrollView();
				});

				webView.addEventListener('touchend', function (e) {
					mView.enabledFormScrollView();
				});
			}
			view.add(webView);
		}
		//COMMON.Log('getFormConfigChildView END -> ' + new Date().getTime());		
	},
	loadSearchData: function (screenName, qry) {
		COMMON.showIndicator('Performing Search Please Wait...');
		//var db = commonObj.dbConnectionObj.createDataBaseConnection();
		dbDataRows = '';
		var array = [];
		try {
			//COMMON.Log('qry --> ' + qry);
			dbDataRows = Ti.App.dbConn.execute(qry);
			iIndex = 0;
			while (dbDataRows.isValidRow()) {
				array.push(this.createUI(screenName, iIndex, dbDataRows));
				iIndex++;
				dbDataRows.next();
			}
		} catch (e) {
		} finally {
			if (dbDataRows != undefined && dbDataRows != null) {
				dbDataRows.close();
			}
			//db.close();
			COMMON.hideIndicator();
		}
		return array;
	},
	loadData: function (screenName, qry, currentPage, isPagination) {
		//COMMON.Log('LoadData Start Time : ' + new Date().getTime());
		//COMMON.Log('screenName : ' + screenName);
		//COMMON.Log('qry : ' + qry);
		//COMMON.Log('currentPage : ' + currentPage);
		//COMMON.Log('isPagination : ' + isPagination);

		arrFieldControlObj = [];
		bEnabledarrFieldCtrlObj = false;
		if (qry == undefined || qry == 'undefined' || qry == '' || qry == null) {
			return [];
		}
		//LOG.debug('Arrayoperation - loadData START ' + screenName , 'AvailableMemory : ' + COMMON.availableMemoryInMB());

		if (currentPage > 0) {
			if (bIsAndroid) {
				Ti.UI.Android.hideSoftKeyboard();
			}
			Ti.App.DETAILS.set('SYNC_SCREEN', 'APICALL');
			Ti.App.indicatorEventTriggered = false;
			COMMON.showIndicator("Please Wait...");
		}

		//COMMON.showCustIndicator();
		//if (!isPagination) {
		//COMMON.showIndicator('Loading Please Wait...');
		//}
		//commonObj.db = commonObj.dbConnectionObj.createDataBaseConnection();
		commonObj.dbDataRows = "";
		commonObj.array = [];
		try {
			//COMMON.traceSTART();
			if (mView != null && mView != undefined && isPagination == true) {//FORM SEARCH 
				isPagination = mView.checkPaginationEnabled(screenName);
			}
			if (currentPage == 0) {
				Ti.App.sRowHeaderTxt = '';
			}

			if (isPagination == true) {
				//qry += ' limit '+(parseInt(currentPage * 100))+', 100'; //' limit 0, 100';
				qry += ' limit ' + (parseInt(currentPage * Ti.App.iPaginationLimit)) + ', ' + Ti.App.iPaginationLimit; //' limit 0, 100';
			}//else{
			//After Complete Pagination this ELSE part no need.
			//qry += ' limit '+(parseInt(currentPage * 100))+', 300'; //' limit 0, 100';
			//}
			//LOG.queryLog(screenName, qry);
			//COMMON.Log('Load Query --> ' + qry);
			LOG.debug('Load Query --> ' + qry);
			//COMMON.Log('LoadData Execute Start Time : ' + new Date().getTime());
			commonObj.dbDataRows = Ti.App.dbConn.execute(qry);
			//COMMON.Log('LoadData Execute End Time : ' + new Date().getTime());
			//iIndex = 0;
			var row = '';
			var RowHeaderTxt = Ti.App.COMMON.CheckString(Ti.App.sRowHeaderTxt), DBRowHeaderTxt = '';
			//COMMON.Log('RowHeaderTxt --> ' + RowHeaderTxt);

			var IsRowCreated = false;
			//var RowHeaderTxt = '', DBRowHeaderTxt = '';
			while (commonObj.dbDataRows.isValidRow()) {
				if (iIndex == 0 && bIsAndroid) {
					row = this.createUI(screenName, iIndex, commonObj.dbDataRows);
					row.height = 0.1;
					commonObj.array.push(row);
					iIndex++;
					bEnabledarrFieldCtrlObj = true;
				}
				
				if(bIsAndroid) {//iOS
					try {
						DBRowHeaderTxt = commonObj.dbDataRows.fieldByName('RowHeaderText');
						//COMMON.Log('rowheadertext '+DBRowHeaderTxt);
						DBRowHeaderTxt = (DBRowHeaderTxt == undefined || DBRowHeaderTxt == null || DBRowHeaderTxt == '') ? '' : DBRowHeaderTxt;
					} catch (e) {
						DBRowHeaderTxt = '';
					}
				}else{
					DBRowHeaderTxt = '';
				}
				/************/
				if (DBRowHeaderTxt != '' && (RowHeaderTxt == '' || RowHeaderTxt != DBRowHeaderTxt)) {
					Ti.App.sRowHeaderTxt = DBRowHeaderTxt;
					RowHeaderTxt = DBRowHeaderTxt;//commonObj.dbDataRows.fieldByName('RowHeaderText');
					//COMMON.Log('rowheadertext '+RowHeaderTxt);
					//if(iIndex == 1 || iIndex == 3){
					//row.header = 'AXE ANTI-PERSPIRANT RLN DARK TEMP 40ML';

					vwRowHorizontal = TableViewBasicUIObj.createBasicView(null, 'transparent', Ti.UI.SIZE, '100%', 0, 0, null, null, 'absolute');
					//vwRowHorizontal.backgroundSelectedColor = Ti.App.sRowHighlightColor;//'#8a0000';//'#F6921E';
					//vwRowHorizontal.borderColor = sBorderColor;//sListBorderColor;//'#3333ff';//'#616161';//'#fff';
					//vwRowHorizontal.borderWidth = 1;
					vwRowHorizontal.touchEnabled = false;
					/*if(iIndex == 3){
						var label = TableViewBasicUIObj.createLabel("AXE AP ROLL-ON ANARCHY 40ml", '100%', '50', 22, '', '100', '#e8e8e8', 'transparent', 2, 0);
					}else{
						var label = TableViewBasicUIObj.createLabel("AXE ANTI-PERSPIRANT RLN DARK TEMP 40ML", '100%', '50', 22, '', '100', '#e8e8e8', 'transparent', 2, 0);
					}*/
					var label = TableViewBasicUIObj.createLabel(RowHeaderTxt, '100%', '50', 17 * Ti.App.dHeightRatio, '', '100', '#e8e8e8', 'transparent', 2, 0);
					label.touchEnabled = false;
					label.left = 0;
					vwRowHorizontal.add(label);
					row = TableViewBasicUIObj.createBasicRow(iIndex, title, false);
					row.screenName = screenName;
					row.dRowHeight = 50 * Ti.App.dHeightRatio;//dMaxRowHeight;
					row.height = 50 * Ti.App.dHeightRatio;//Ti.UI.SIZE;//dMaxRowHeight;
					//COMMON.Log('Ti.App.listRowHeaderBGColor '+Ti.App.listRowHeaderBGColor);
					row.backgroundColor = Ti.App.listRowHeaderBGColor;//'#333';//sCreateUIRowBgColor;
					row.color = Ti.App.listRowHeaderForeColor;//'#333';//sCreateUIRowBgColor;
					row.HeaderRow = true;
					row.add(vwRowHorizontal);

					commonObj.array.push(row);
					iIndex++;
				}
				/********/
				
				/*
				if(IsRowCreated == true){
					
					var newRowObj = new Object();
					newRowObj = commonObj.array[commonObj.array.length - 1];
					//commonObj.array.push(commonObj.array[commonObj.array.length - 1]);
					commonObj.array.push(newRowObj);
					//alert(commonObj.array.length);
					var newRow = newRowObj;//commonObj.array[commonObj.array.length - 1];//row;//commonObj.array[1];
					//alert(newRow);
					var rowIndex = iIndex - 1;
					var HeaderDetailslength = HeaderDetails.length;
					//alert(HeaderDetailslength);
					for(var _ji = 0; _ji < HeaderDetailslength; _ji++){
					//for (var ctr = 0; ctr < HeaderDetailslength; ctr++) {
						var HeaderDetailsObj = {};
						HeaderDetailsObj = HeaderDetails[_ji];
						//fieldNames.push(HeaderDetailsObj.DataMember.toUpperCase());
						fieldName = HeaderDetailsObj.DataMember.toUpperCase();
						//alert(JSON.stringify(fieldNames));
						
						
						
						newRow.children[0].children[fieldNames.indexOf(fieldName)].rowIndex = iIndex;
						newRow.children[0].children[fieldNames.indexOf(fieldName)].iIndex = iIndex;
						newRow.children[0].children[fieldNames.indexOf(fieldName)].index = iIndex;
						
						newRow.children[0].rowIndex = iIndex;
						newRow.children[0].iIndex = iIndex;
						newRow.children[0].index = iIndex;
						
						newRow.rowIndex = iIndex;
						newRow.iIndex = iIndex;
						newRow.index = iIndex;
						
						//alert(iIndex);
						var datavalue = '';
						try{
							datavalue = commonObj.dbDataRows.fieldByName(HeaderDetailsObj.DataMember);
						}catch(e){
							datavalue = '';
						}
						//alert('datavalue : ' + datavalue);
						//COMMON.Log('datavalue : ' + datavalue);
						//alert('fieldControl1 : ' + newRow.children[0].children[fieldNames.indexOf(fieldName)].fieldControl);

						
						newRow.children[0].children[fieldNames.indexOf(fieldName)].text = datavalue;
						newRow.children[0].children[fieldNames.indexOf(fieldName)].value = datavalue;
						newRow.children[0].children[fieldNames.indexOf(fieldName)].code = datavalue;
					}
					iIndex++;
				}else{*/
					//row = this.createUI(screenName, iIndex, commonObj.dbDataRows);
					//array.push(row);
					commonObj.array.push(this.createUI(screenName, iIndex, commonObj.dbDataRows));
					//commonObj.array.push(row);
					iIndex++;
					
					/*if(IsRowCreated == false){
						IsRowCreated = true;
					}
				}*/
				bEnabledarrFieldCtrlObj = true;
				commonObj.dbDataRows.next();
			}
			commonObj.dbDataRows.close();
		} catch (e) {
			//COMMON.hideCustIndicator();
			//alert('Query Error : ' + e);
		} finally {
			//if (commonObj.dbDataRows != undefined && commonObj.dbDataRows != null) {
			//commonObj.dbDataRows.close();
			//}
			//commonObj.db.close();
			//COMMON.hideCustIndicator();
			//COMMON.traceEND();
		}
		arrFieldControlObj = [];
		bEnabledarrFieldCtrlObj = false;
		//if (!isPagination) {
		//COMMON.hideIndicator();
		//}
		//COMMON.Log('array.length ---> ' + commonObj.array.length);
		//COMMON.Log('LoadData End Time : ' + new Date().getTime());		
		//LOG.debug('Arrayoperation - loadData END ' + screenName , 'AvailableMemory : ' + COMMON.availableMemoryInMB());

		COMMON.hideIndicator();
		Ti.App.DETAILS.set('SYNC_SCREEN', '');

		return commonObj.array;
	},
	loadPaginatedData: function (screenName, qry, currentPage, isPagination) {
	},
	loadDummyData: function (screenName, qry, currentPage, isPagination) {
	},
	loadFormData: function (controller, qry, isPagination) {
		return [];
	},
	UpdatetmpScreennameforMultiline: function (sScreenName) {
		tmpScreennameforMultiline = sScreenName;
	},
	loadFormValueData: function (qry, formDataArray) {
		//COMMON.Log('Form QRY1 --> ' + qry);
		if (qry == undefined || qry == 'undefined' || qry == '') {
			return [];
		}
		//commonObj.db = commonObj.dbConnectionObj.createDataBaseConnection();
		commonObj._MultilineFieldName = [];
		//COMMON.Log('Ti.App.currentScreenName --> ' + Ti.App.currentScreenName + ' : tmpScreennameforMultiline --> ' + tmpScreennameforMultiline);
		commonObj.data = [];
		commonObj.data = this.getFormConfigByScreenName(tmpScreennameforMultiline);
		if (commonObj.data != undefined && commonObj.data != null) {
			commonObj.length = commonObj.data.length;
			commonObj.formdata = {};
			for (var abc = 0; abc < commonObj.length; abc++) {
				commonObj.formdata = {};
				commonObj.formdata = commonObj.data[abc];
				commonObj._MultilineFieldName.push(commonObj.formdata.fieldName.toUpperCase());
			}
		}
		//COMMON.Log('commonObj._MultilineFieldName --> ' + JSON.stringify(commonObj._MultilineFieldName));
		commonObj.obj = {};
		try {
			//COMMON.Log('Form QRY2 --> ' + qry);
			commonObj.dbDataRows = Ti.App.dbConn.execute(qry);
			commonObj.len = 0; commonObj.fieldName = ''; commonObj.obj = {};
			while (commonObj.dbDataRows.isValidRow()) {
				//var len = dbDataRows.fieldCount();
				//var len = ( (bIsAndroid) ? dbDataRows.fieldCount : dbDataRows.fieldCount());
				if (commonObj.len == 0) {
					if(Ti.App.sDeviceOSName == 'iphone' || (Ti.version >= '8.9.9')){
						commonObj.len = commonObj.dbDataRows.fieldCount;
					}else{
						if ((Ti.Platform.name === 'android') || (Ti.version >= '3.3.0')) {
							commonObj.len = commonObj.dbDataRows.getFieldCount();//fieldCount;
						} else {
							commonObj.len = commonObj.dbDataRows.fieldCount();
						}
					}
				}
				for (var iIndex1 = 0; iIndex1 < commonObj.len; iIndex1++) {
					commonObj.fieldName = commonObj.dbDataRows.fieldName(iIndex1);
					commonObj.obj = {};
					commonObj.obj.fieldName = commonObj.fieldName;
					commonObj.obj.fieldName1 = commonObj.fieldName.toUpperCase();
					commonObj.obj.value = commonObj.dbDataRows.fieldByName(commonObj.fieldName);
					//COMMON.Log('START ****** FIELDNAME --> ' + commonObj.obj.fieldName + 'Value : ' + commonObj.obj.value);
					commonObj.fieldName = commonObj.fieldName.toUpperCase();
					//COMMON.Log('START ****** FIELDNAME --> _MultilineFieldName.indexOf(fieldName) --> ' + commonObj._MultilineFieldName.indexOf(commonObj.fieldName));
					//COMMON.Log('_MultilineFieldName.length --> ' + commonObj._MultilineFieldName.length);
					if (commonObj._MultilineFieldName.length > 0) {
						if (commonObj._MultilineFieldName.indexOf(commonObj.fieldName) > -1) {
							formDataArray.push(commonObj.obj);
						}
					} else {
						formDataArray.push(commonObj.obj);
					}
				}
				commonObj.dbDataRows.next();
			}
		} catch (e) {
		} finally {
			if (commonObj.dbDataRows != undefined && commonObj.dbDataRows != null) {
				commonObj.dbDataRows.close();
			}
			//commonObj.db.close();
			commonObj.length = null;
			commonObj.len = null;
			commonObj.dbDataRows = null;
			if (Ti.version < '7.5.0') {
				//delete commonObj.length; //17122018 SDK 7.5.0
				//delete commonObj.len;//17122018 SDK 7.5.0
				//delete commonObj.dbDataRows;//17122018 SDK 7.5.0
			}
			return formDataArray;
		}
		return formDataArray;
	},
	//createQuery : function(query, searchString, replaceString) {
	createQuery: function (query, str1, str2) {
		//COMMON.Log('Qry : ' + query + ' searchString : ' + str1 + ' replaceString : ' + str2);
		/*
var qry = "Select {CustNo} as CustNo,{CustNo} as CustNo1, {CustNo} as CustNo2"
function replaceALL(str1, str2, ignore){
    return qry.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
} 
var str1 = "{CustNo}";
var str2 = "'asdssds'";
alert(replaceALL(str1, str2, true)); 
		*/
		ignore = true;
		return query.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"), (ignore ? "gi" : "g")), (typeof (str2) == "string") ? str2.replace(/\$/g, "$$$$") : str2);
		//return query.replace(searchString, replaceString);
	},
	getSearchConfig: function (screenName) {
		//return Titanium.App.Properties.getList('SearchConfig_' + screenName);
		//COMMON.Log('Search Config Start : ' + new Date().getTime());
		var SearchDataList = [], searchdata = {}, screenName = screenName;
		dbDataRows = Ti.App.configDBConn.execute('SELECT * FROM SearchConfig where ScreenName = ' + Ti.App.SQL.safeSQL(screenName) + ' and  Language = ' + Ti.App.SQL.safeSQL(Ti.App.sLanguage) + ' order by ScreenName, DisplayNo ');
		while (dbDataRows.isValidRow()) {
			screenName = dbDataRows.fieldByName('ScreenName');
			searchdata = {};
			searchdata.ScreenName = screenName;//dbDataRows.fieldByName('ScreenName');
			searchdata.FieldName = dbDataRows.fieldByName('FieldName');
			searchdata.DefaultText = dbDataRows.fieldByName('DefaultText');
			searchdata.NewText = dbDataRows.fieldByName('NewText');
			searchdata.DisplayNo = dbDataRows.fieldByName('DisplayNo');
			searchdata.IsSearch = dbDataRows.fieldByName('IsSearch');
			searchdata.SearchType = dbDataRows.fieldByName('SearchType');
			searchdata.SearchControl = dbDataRows.fieldByName('SearchControl');
			searchdata.DataMember = dbDataRows.fieldByName('FieldName');
			SearchDataList.push(searchdata);
			dbDataRows.next();
		}
		dbDataRows.close();
		searchdata = {}; searchdata = null;
		dbDataRows = null;
		//COMMON.Log('Search Config End : ' + new Date().getTime());
		return SearchDataList;
	},
	loadSearchConfig: function (controller, screenName) {
		screenName = (screenName == "AddItem") ? "Item List" : screenName;
		var searchDetails = this.getSearchConfig(screenName);
		isShowSearchButton = false;
		if (searchDetails == null || searchDetails == undefined) {
			return null;
		}
		searchParentView = TableViewBasicUIObj.createBasicView(null, 'transparent', 0, Ti.UI.SIZE, 0, 0, 0, 0, 'vertical');
		var searchHzView = TableViewBasicUIObj.createBasicView(null, 'transparent', Ti.App.CONFIG.get('SEARCH_FIELD_HEIGHT'), '100%', 0, 0, 0, 0, 'horizontal');
		searchParentView.add(searchHzView);
		var searchField = new BasicSearchBar().createSearchBar(null, 'Search', '', '100%', Ti.App.CONFIG.get('SEARCH_FIELD_HEIGHT'));
		//searchField.focusable = false;
		searchField.focusable = false;
		searchField.editable = false;
		searchHzView.add(searchField);
		searchField.screenName = screenName;
		searchField.searchField = searchField;
		//searchField.fieldName = '0';
		//searchField.searchType = 0;
		//searchField.dataMember = 0;
		searchField.addEventListener('return', function (e) {
			if (buttonSearchIsActive == true) {
				searchField.blur();
				mView.performSearch(this.title, this.value, this.value, this.screenName, this.fieldName, this.searchType, this.DataMember, true, "FIELD_SEARCH");
			}
		});
		searchField.addEventListener('change', function (e) {
			//if (searchField.value == '' && !bIsAndroid) {
			//mView.performSearch('', this.value, this.code, this.screenName, this.fieldName, this.searchType, this.dataMember,true);
			//}
		});
		searchField.addEventListener('cancel', function (e) {
			searchField.value = '';
			//mView.performSearch('', this.value, this.code, this.screenName, this.fieldName, this.searchType, this.dataMember, true, "FIELD_SEARCH");
		});
		searchField.addEventListener('focus', function (e) {
			try {
				if (buttonSearchIsActive == false) {
					commonObj.tbl = Ti.App.currentTable;
					//10102018 
					//commonObj.tbl.scrollToTop(COMMON.getRowIndex()); //scroll

					//mController.textFieldNextFocus();
					//**/
					commonObj.tblLen = ArrayOperations.prototype.getAllRows(0).length;//SI.getAllRows(0).length;
					commonObj.tblLen = (commonObj.tblLen == null || commonObj.tblLen == undefined || commonObj.tblLen == '') ? 0 : commonObj.tblLen;
					if (commonObj.tblLen > 0) {
						commonObj.tbl = Ti.App.currentTable;
						//10102018 
						//commonObj.tbl.scrollToTop(COMMON.getRowIndex()); //scroll
						commonObj._rows = ''; commonObj._field = ''; commonObj._fieldControl = '';
						//mController.textFieldNextFocus();
						//NEW 26 Aug 2016
						for (var _i = 0; _i < fieldNames.length; _i++) {
							commonObj._rows = Ti.App.currentTable.data[0].rows;
							commonObj._field = commonObj._rows[COMMON.getRowIndex()].children[0].children[_i];
							commonObj._fieldControl = commonObj._field.fieldControl;
							if (commonObj._fieldControl == 'EDITABLETEXTBOX') {
								if (mView != null && mView != undefined) {
									mView.setselectedRowIndex(COMMON.getRowIndex());//e.source.iIndex);
								}
								if (Ti.version < '7.5.0') {
									commonObj._field.focus();//7.5.0//09Jan
								}
								_i = fieldNames.length;
								//return rows[rowIndex].children[0].children[fieldNames.indexOf(fieldName)].value;
							}
						}
						//END
						commonObj._rows = '';
						commonObj._rows = null;
						commonObj._field = '';
						commonObj._field = null;
						commonObj._fieldControl = '';
						commonObj._fieldControl = null;
					}
					commonObj.tbl = [];
					commonObj.tbl = null;
					commonObj.tblLen = 0;
					commonObj.tblLen = null;
				}
			} catch (e) { }
		});
		var vwRowHorizontal = TableViewBasicUIObj.createBasicView(null, 'transparent', Ti.UI.SIZE, '100%', 0, 0, null, null, 'horizontal');
		buttonWidth = 0;
		searchItems = 0;
		buttonHeight = parseInt(Ti.App.DeviceHeight * 0.05);//*0.08);//*0.05);//60;
		var searchDetailslength = searchDetails.length;
		for (var ctr = 0; ctr < searchDetailslength; ctr++) {
			if (searchDetails[ctr].IsSearch == 1 || searchDetails[ctr].IsSearch == 'true') {
				searchItems++;
			}
		}
		if (searchItems > 0) {
			isShowSearchButton = true;
		} else {
			isShowSearchButton = false;
		}
		if (isShowSearchButton == false) {
			return null;
		}
		if (searchItems == 1) {
			buttonWidth = '99%';
		} else if (searchItems == 2) {
			buttonWidth = '49%';
		} else {
			if (Ti.App.sDeviceOSName == 'iphone') {
				buttonWidth = '30%';
			} else {
				buttonWidth = '32%';
			}
		}
		vwRowHorizontal.height = (parseInt(Math.ceil(searchItems / 3)) * buttonHeight);
		var button = null;
		var searchDetailslength = searchDetails.length;
		for (var ctr = 0; ctr < searchDetailslength; ctr++) {
			if (searchDetails[ctr].IsSearch == 1 || searchDetails[ctr].IsSearch == 'true') {
				button = commonObj.BasicButtonObj.createButton(searchDetails[ctr].NewText, buttonWidth, buttonHeight, Ti.App.CONFIG.get('SEARCH_BUTTON_FONT_SIZE'), Ti.App.sSearchBtnTxtColor);//'#e8e8e8');
				button.bottom = 5;
				button.fieldName = searchDetails[ctr].FieldName;
				button.dataMember = searchDetails[ctr].DataMember;
				button.screenName = searchDetails[ctr].ScreenName;
				button.title = searchDetails[ctr].NewText;
				button.searchType = searchDetails[ctr].SearchType.toUpperCase();
				button.searchControl = searchDetails[ctr].SearchControl.toUpperCase();
				button.comboBoxData = [];
				searchField.title = searchDetails[ctr].NewText;
				searchField.fieldName = searchDetails[ctr].FieldName;
				searchField.searchType = searchDetails[ctr].SearchType.toUpperCase();
				searchField.dataMember = searchDetails[ctr].DataMember;
				var List = [];
				if (button.searchControl == 'COMBOBOX' || button.searchControl == 'COMBOBOXFILTER') {
					commonObj.qry = this.getQueryConfigByScreenNameWithOrderText(searchDetails[ctr].ScreenName + '_SEARCH_COMBOBOX_' + searchDetails[ctr].FieldName);
					//COMMON.Log('Search Config ComboBox Query ---> ' + commonObj.qry);
					button.comboBoxData = this.createComboBoxData(commonObj.qry);
				} else if (button.searchControl == 'TEXTBOX') {
					//this.color = 'orange';
					searchField.fieldName = button.fieldName;
					searchField.dataMember = button.dataMember;
				}
				button.left = 5;
				button.index = ctr;
				button.addEventListener('click', function (e) {
					var length = vwRowHorizontal.children.length;
					for (var ctr = 0; ctr < length; ctr++) {
						vwRowHorizontal.children[ctr].color = Ti.App.sSearchBtnTxtColor;//'white';
					}
					this.color = Ti.App.sSearchBtnHighlightTxtColor;//'orange';
					if (this.searchControl == 'TEXTBOX') {
						//ToDo : Do nothing as Field is already present in search component
						searchField.title = this.title;
						searchField.screenName = this.screenName;
						searchField.fieldName = this.fieldName;
						searchField.DataMember = this.dataMember;
						searchField.searchType = this.searchType;
						searchField.value = '';
						//mController.setSearchValue('', '', this.screenName, this.fieldName, this.searchType);
					} else if (this.searchControl == 'COMBOBOX' || this.searchControl == 'COMBOBOXFILTER') {//ComboBox


						searchField.screenName = this.screenName;
						searchField.fieldName = this.fieldName;
						searchField.searchType = this.searchType;
						searchField.DataMember = this.dataMember;
						if (this.searchControl == 'COMBOBOXFILTER') {
							//COMMON.Log(this.screenName + '_SEARCH_COMBOBOX_' + this.fieldName);
							commonObj.qry = ArrayOperations.prototype.getQueryConfigByScreenNameWithOrderText(this.screenName + '_SEARCH_COMBOBOX_' + this.fieldName);
							//COMMON.Log('Search Config ComboBox Query ---> ' + commonObj.qry);
							var SearchComboBoxData = ArrayOperations.prototype.createComboBoxData(commonObj.qry);
							new ComboBoxSearch().show(this.title, mView, SearchComboBoxData, this, this.screenName, this.fieldName, this.searchType, this.dataMember);
						} else {
							new ComboBoxSearch().show(this.title, mView, this.comboBoxData, this, this.screenName, this.fieldName, this.searchType, this.dataMember);
						}
					} else if (this.searchControl == 'DATEPICKER') {//Date Picker
						var datepickerSearch = new DatePickerSearch();
						//datepickerSearch.setController(mView);
						//searchField.screenName = this.screenName;
						//searchField.fieldName = this.fieldName;
						//searchField.searchType = this.searchType;
						Ti.App.deliveryDateButtonName = this.title;
						datepickerSearch.show(this.title, mView, 0, this.screenName, this.fieldName, this.searchType, this.dataMember);
					} else if (this.searchControl == 'BUTTON') {
						try {
							var tblObj = Ti.App.currentTable;
							var sScreenName = this.screenName;
							if (tblObj.tblScreenName != undefined && tblObj.tblScreenName != null && tblObj.tblScreenName != "") {
								sScreenName = tblObj.tblScreenName;
							}
							//COMMON.Log("sScreenName "+sScreenName);

							var query = ArrayOperations.prototype.getQueryConfigByScreenNameWithOrderText(sScreenName + "_SEARCH_BUTTON_" + this.fieldName);
							if (query != null && query != undefined && query != '') {
								ArrayOperations.prototype.resetRowiIndex();
								//COMMON.Log('chart query ---> ' + query);
								var tmpArrFormValues = ArrayOperations.prototype.loadData(sScreenName, query, 0, false);
								Ti.App.currentTable.data = tmpArrFormValues;
							}
						} catch (e) { }
					}
				});
				vwRowHorizontal.add(button);
			}
		}
		vwRowHorizontal.children[0].color = Ti.App.sSearchBtnHighlightTxtColor;//'orange';
		searchField.title = vwRowHorizontal.children[0].title;
		searchField.screenName = vwRowHorizontal.children[0].screenName;
		searchField.fieldName = vwRowHorizontal.children[0].fieldName;
		searchField.DataMember = vwRowHorizontal.children[0].dataMember;
		searchField.searchType = vwRowHorizontal.children[0].searchType;
		searchParentView.add(vwRowHorizontal);
		return searchParentView;
	},
	createComboBoxData: function (qry) {
		//commonObj.db1 = commonObj.dbConnectionObj.createDataBaseConnection();
		commonObj.dbDataRows1 = '', commonObj.List1 = [];
		//COMMON.Log('ComboBox Qry --> ' + qry);
		try {
			if (qry != undefined) {
				commonObj.dbDataRows1 = Ti.App.dbConn.execute(qry);
				ComboboDataObj = {};

				////COMMON.Log('createComboBoxData -> ' + JSON.stringify(commonObj.dbDataRows1));
				//alert('createComboBoxData -> ' + JSON.stringify(commonObj.dbDataRows1));

				while (commonObj.dbDataRows1.isValidRow()) {
					try {
						ComboboDataObj = {};
						ComboboDataObj.ComboBoxCode = commonObj.dbDataRows1.fieldByName('code');
						ComboboDataObj.displayText = commonObj.dbDataRows1.fieldByName('text');
						commonObj.List1.push(ComboboDataObj);
						//COMMON.Log('Combo displayText --> ' + ComboboDataObj.displayText + ' Code --> ' + ComboboDataObj.ComboBoxCode);
					} catch (e) { }
					commonObj.dbDataRows1.next();
				}
				commonObj.dbDataRows1.close();
				//commonObj.db1.close();
			}
		} catch (e) {
			commonObj.List1 = [];
		}
		return commonObj.List1;
	},
	createUI: function (screenName, iIndex, item) { //7051 - 5187 : TOTAL LINE - 1864
		//LOG.debug('Arrayoperation - CreateUI START ' + screenName , + ' - Index : ' + iIndex + ' AvailableMemory : ' + COMMON.availableMemoryInMB());
		//COMMON.Log('LoadData CreateUI Start Time1 : ' + new Date().getTime() + ' - iIndex : ' + iIndex);		
		//COMMON.Log('LoadData CreateUI stmpActiveScreenName : ' + stmpActiveScreenName + ' - screenName : ' + screenName);
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
			dLineIndex = 0;
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
						var sCondArrlength = sCondArr.length;
						for (var condCtr = 0; condCtr < sCondArrlength; condCtr++) {
							tmpFieldVal = sCondArr[condCtr].FieldName;
							sColorCondFieldArr.push(tmpFieldVal.toUpperCase());
						}
					}
					sCondArr = [];
				} catch (e) { }
			}
			HeaderDetailsObj = {};
			var HeaderDetailslength = HeaderDetails.length;
			for (var ctr = 0; ctr < HeaderDetailslength; ctr++) {
				HeaderDetailsObj = {};
				HeaderDetailsObj = HeaderDetails[ctr];
				////COMMON.Log('dLineIndex '+dLineIndex + ' HeaderDetailsObj.LineIndex' + HeaderDetailsObj.LineIndex + ' HeaderDetailsObj.dColumnUnit '+HeaderDetailsObj.dColumnUnit);
				if (dLineIndex != HeaderDetailsObj.LineIndex) {
					////COMMON.Log('HeaderDetailsObj.dColumnUnit '+HeaderDetailsObj.dColumnUnit)					
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
				if (HeaderDetailsObj.dColumnUnit != '') {
					dMaxRowHeight = dMaxRowHeight - HeaderDetailsObj.rowHeight;
				}

				////COMMON.Log('dMaxRowHeight '+dMaxRowHeight);
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

		var bReadOnlyRow = false;
		//item.fieldByName(HeaderDetailsObj.DataMember)
		if(bIsAndroid) {//iOS
			try {
				bReadOnlyRow = COMMON.CheckBooleanField(item.fieldByName('ReadOnlyRow'));
			} catch (e) {
				bReadOnlyRow = false;
			}
		}

		//var vwRowHorizontal = TableViewBasicUIObj.createBasicView(null, 'transparent', dMaxRowHeight, '100%', 0, 0, null, null, 'absolute');
		vwRowHorizontal = TableViewBasicUIObj.createBasicView(null, 'transparent', Ti.UI.SIZE, '100%', 0, 0, null, null, 'absolute');
		//vwRowHorizontal = TableViewBasicUIObj.createBasicView(null, 'transparent', dMaxRowHeight, '100%', 0, 0, null, null, 'absolute');
		vwRowHorizontal.backgroundSelectedColor = Ti.App.sRowHighlightColor;//'#8a0000';//'#F6921E';
		vwRowHorizontal.borderColor = sBorderColor;//sListBorderColor;//'#3333ff';//'#616161';//'#fff';
		vwRowHorizontal.borderWidth = 1;
		vwRowHorizontal.className = screenName;
		vwRowHorizontal.index = iIndex;
		vwRowHorizontal.iRowIndex = iIndex;
		//var row = new BasicRow().createBasicRow(iIndex, title, false);
		//row = TableViewBasicUIObj.createBasicRow(iIndex, title, false);
		row = TableViewBasicUIObj.createBasicRow(iIndex, screenName, false);
		row.screenName = screenName;
		row.dRowHeight = dMaxRowHeight;
		if (screenName == 'Form-Customers' || screenName == 'Form-NewProduct' || screenName == 'Form-Assortment' || screenName == 'Form-MainItems' || screenName == 'Form-SpecialSet' || screenName == 'Form-OnShelfAvailability') {
			////COMMON.Log('dMaxRowHeight '+dMaxRowHeight);
			row.height = dMaxRowHeight;
		} else {
			row.height = Ti.UI.SIZE;
		}
		
		
		if(screenName == 'Customers--' || screenName == 'SalesForm_FORM_GRIDLIST_gridlist' || screenName == 'SalesForm_FORM_GRIDLIST_GRID_gridlist'){
		
			vwRowHorizontal.height = dMaxRowHeight;
			vwRowHorizontal.top = dMaxRowHeight * 0.01;
			
			row.height = dMaxRowHeight + (dMaxRowHeight * 0.02);
			
			vwRowHorizontal.backgroundColor = '#e8e8e8';
			vwRowHorizontal.borderColor = "#C0C0C0";
			vwRowHorizontal.borderWidth = 1;
			vwRowHorizontal.borderRadius = 12;
			sCreateUIRowBgColor = 'transparent';
			
			if(screenName == 'SalesForm_FORM_GRIDLIST_gridlist' || screenName == 'SalesForm_FORM_GRIDLIST_GRID_gridlist'){
				vwRowHorizontal.addEventListener('longclick', function(e){
					//alert('44');
					
					try{
						if(mView != null && mView != undefined){
							mView.setselectedRowIndex(e.source.iRowIndex);
						}
					}catch(e){}
					
					var menuPopupItems = ArrayOperations.prototype.loadMenuPopupConfig('SalesForm');
					//Ti.App.currentController
					//e.source.iRowIndex
					if (menuPopupItems != null && menuPopupItems != undefined) {
						try{
							var sMenuTitle = ArrayOperations.prototype.getSystemValue('PopupMenuTitle');//MENUTITLE/POPUPMEN
							sMenuTitle = (sMenuTitle == '' || sMenuTitle == null || sMenuTitle == undefined) ? 'Menu' : sMenuTitle;
							//new MenuRowPopup().show(e.row.index, 'Menu Popup', mController, menuPopupItems, e.row);
							new MenuRowPopup().show(e.source.iRowIndex, sMenuTitle, Ti.App.currentController, menuPopupItems, null);
						}catch(e){
							new MenuRowPopup().show(e.source.iRowIndex, 'Menu Popup', Ti.App.currentController, menuPopupItems, null);
						}
					}
					
				});
			}
				
		}else{
    		row.height = dMaxRowHeight;
    }
		row.zIndex = 9;
		//row.height = Ti.UI.SIZE;//dMaxRowHeight;

		row.backgroundColor = sCreateUIRowBgColor;
		//if(screenName != 'Form-Customers'){
		//bReadOnlyRow = true;
		//row.touchEnabled = false;
		//vwRowHorizontal.touchEnabled = false;
		//}
		//if(screenName != 'Form-Customers'){
		//if(iIndex == 0){
		//row.header = 'AXE ANTI-PERSPIRANT RLN DARK TEMP 40ML';
		//}else if(iIndex == 2){
		//row.header = 'AXE AP ROLL-ON ANARCHY 40ml';
		//}
		//}
		rowHeight = 0; sRow_BG_Color = 'transparent';
		fieldNames = []; comboData = [];
		dColorConfigRowIndex = iIndex; dColorConfigRow = row;
		sKeyType = 'NUMBER'; dLeftPos = 0; dLineIndex = 0; dTopPos = 0;
		dataMemberType = ''; dataValue = ''; mFieldControl = {};
		commonObj.tblColumnWidth = 1;
		HeaderDetailsObj = {};

		DBFieldNameArr = [];
		try {
			if(Ti.App.sDeviceOSName == 'iphone' || (Ti.version >= '8.9.9')){
				commonObj.len1 = item.fieldCount;
			}else{
				if ((Ti.Platform.name === 'android') || (Ti.version >= '3.3.0')) {
					commonObj.len1 = item.getFieldCount();//.fieldCount;
				} else {
					commonObj.len1 = item.fieldCount();
				}
			}
			var tmpField = '';
			for (var iIndex1 = 0; iIndex1 < commonObj.len1; iIndex1++) {
				tmpField = item.fieldName(iIndex1);
				DBFieldNameArr.push(tmpField.toUpperCase());
			}
		} catch (e) { }
		//LOG.debug('Arrayoperation - CreateUI START ' + screenName , + ' - DBFieldNameArr : ' + JSON.stringify(DBFieldNameArr));
		var HeaderDetailslength = HeaderDetails.length;
		for (var ctr = 0; ctr < HeaderDetailslength; ctr++) {
			HeaderDetailsObj = {};
			HeaderDetailsObj = HeaderDetails[ctr];
			if (dLineIndex != HeaderDetailsObj.LineIndex) {
				//alert(HeaderDetailsObj.LineIndex + ' - '+ HeaderDetailsObj.dColumnUnit);
				if (HeaderDetailsObj.dColumnUnit != '') {
					var ColumnUnitField = vwRowHorizontal.children[HeaderDetailsObj.dColumnUnit - 1];
					dLeftPos = ColumnUnitField.left;
					dLeftPos = parseFloat(dLeftPos.replace(/%/g, ''));
					//dTopPos = ColumnUnitField.top + ColumnUnitField.height;//dTopPos + rowHeight;
					dTopPos = dTopPos + rowHeight;
					//COMMON.Log('dLeftPos : ' + dLeftPos + ' - dTopPos : ' + dTopPos);
				} else {
					dTopPos = dTopPos + rowHeight;
					dLeftPos = 0;
				}

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
			//COMMON.Log('bRowComponentBorder -> ' + bRowComponentBorder);
			//COMMON.Log('sBorderColor -> ' + sBorderColor);
			try {
				fieldNames.push(HeaderDetailsObj.DataMember.toUpperCase());
				dataMemberType = HeaderDetailsObj.DataMemberType;
				dataValue = '';

				//LOG.debug('Arrayoperation - CreateUI START ' + screenName , + ' - Index : ' + iIndex + ' dataValue1 : ' + dataValue);				
				try {
					if (dataMemberType != 'STRING') {
						//COMMON.Log('****** dataMemberType --> ' + dataMemberType);
						if (dataMemberType == 'DATE') {
							dataValue = Ti.App.DATEFORMAT.formatDate(item.fieldByName(HeaderDetailsObj.DataMember), commonObj.DateFormatString);
						} else if (dataMemberType == 'DATETIME') {
							dataValue = Ti.App.DATEFORMAT.formatDate(item.fieldByName(HeaderDetailsObj.DataMember), commonObj.DateTimeFormatString);
						} else if (dataMemberType == 'TIME') {
							if (item.fieldByName(HeaderDetailsObj.DataMember) == '' || item.fieldByName(HeaderDetailsObj.DataMember) == undefined || item.fieldByName(HeaderDetailsObj.DataMember) === '') {
								dataValue = '';
							} else {
								dataValue = Ti.App.DATEFORMAT.formatDate(item.fieldByName(HeaderDetailsObj.DataMember), commonObj.TimeFormatString);
							}
						} else if (dataMemberType == 'QTYDESC') {
							if (HeaderDetailsObj.columnWidth != 0 && HeaderDetailsObj.columnWidth != '0' && HeaderDetailsObj.columnWidth != '') {
								var sDataMember = HeaderDetailsObj.DataMember;//ItemId$$InvnQty
								sDataMember = sDataMember.split("$$");
								if (sDataMember.length > 0) {
									dataValue = COMMONMODEL.getUOMDescription(item.fieldByName(sDataMember[0]), item.fieldByName(sDataMember[1]), commonObj.QtyRoundingDigits);
								}
							}
						}  else if (dataMemberType == 'UOMDESC') {
							if(HeaderDetailsObj.columnWidth != 0 && HeaderDetailsObj.columnWidth != '0' && HeaderDetailsObj.columnWidth != ''){
								var sDataMember = item.fieldByName(HeaderDetailsObj.DataMember);//ItemId$$InvnQty
								sDataMember = sDataMember.split("$$");
								if(sDataMember.length>0){
									dataValue = COMMONMODEL.getUOMDescription(sDataMember[0], sDataMember[1], "/");	
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
								dataValue = dataValue.toFixed(commonObj.PriceRoundingDigits);
							} catch (e) { }
						} else if (dataMemberType == 'QTYFORMAT') {
							try {
								dataValue = Ti.App.NUMBER.roundNumber(item.fieldByName(HeaderDetailsObj.DataMember), commonObj.QtyRoundingDigits);
							} catch (e) { }
						} else if (dataMemberType == 'NUMBERFORMAT' || dataMemberType == 'AMOUNTNUMBERFORMAT') {
							try {
								var sCurrencyCode = commonObj.Currency + " ";
								if (dataMemberType == 'NUMBERFORMAT') {
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
												//COMMON.Log('1. arr['+i+'] ---> ' + arr[i]);
												_tmpDataVal = Ti.App.NUMBER.roundNumber(arr[i], commonObj.AmountRoundingDigits);
												_tmpDataVal = _tmpDataVal.toString().replace(/(\d)(?=(\d{3})+(?=\.)+(?!\d))/g, "$1,");//_tmpDataVal.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
												_dataVal = (i == 0) ? (sCurrencyCode + _tmpDataVal) : (_dataVal + " / " + sCurrencyCode + _tmpDataVal);
											}
										}
										dataValue = _dataVal;
									} else {
										dataValue = Ti.App.NUMBER.roundNumber(_strValue, commonObj.AmountRoundingDigits);//2);
										dataValue = dataValue.toString().replace(/(\d)(?=(\d{3})+(?=\.)+(?!\d))/g, "$1,");//dataValue.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
										dataValue = dataValue.toFixed(commonObj.AmountRoundingDigits);
										dataValue = sCurrencyCode + dataValue;
									}
								}
							} catch (e) { }
						} else {
							try {
								//DBFieldNameArr
								if (DBFieldNameArr.length > 0) {
									if (DBFieldNameArr.indexOf(HeaderDetailsObj.DataMember.toUpperCase()) > -1) {
										dataValue = item.fieldByName(HeaderDetailsObj.DataMember);
									}
								} else {
									try {
										dataValue = item.fieldByName(HeaderDetailsObj.DataMember);
									} catch (e) {
										if (item[HeaderDetailsObj.DataMember] != undefined && item[HeaderDetailsObj.DataMember] != null) {
											dataValue = item[HeaderDetailsObj.DataMember];
											//LOG.debug('Arrayoperation - CreateUI START ' + screenName , + ' - Index : ' + iIndex + ' dataValue3 : ' + dataValue);									
										}
									}
								}
								//LOG.debug('Arrayoperation - CreateUI START ' + screenName , + ' - Index : ' + iIndex + ' dataValue2 : ' + dataValue);								
							} catch (e) {
								if (DBFieldNameArr.length > 0) {
									if (DBFieldNameArr.indexOf(HeaderDetailsObj.DataMember.toUpperCase()) > -1) {
										if (item[HeaderDetailsObj.DataMember] != undefined && item[HeaderDetailsObj.DataMember] != null) {
											dataValue = item[HeaderDetailsObj.DataMember];
											//LOG.debug('Arrayoperation - CreateUI START ' + screenName , + ' - Index : ' + iIndex + ' dataValue3 : ' + dataValue);									
										}
									}
								} else {
									if (item[HeaderDetailsObj.DataMember] != undefined && item[HeaderDetailsObj.DataMember] != null) {
										dataValue = item[HeaderDetailsObj.DataMember];
									}
								}
							}
						}
					} else {



						try {
							if (DBFieldNameArr.length > 0) {
								if (DBFieldNameArr.indexOf(HeaderDetailsObj.DataMember.toUpperCase()) > -1) {
									dataValue = item.fieldByName(HeaderDetailsObj.DataMember);
								}
							} else {
								/*if(Ti.App.sDeviceOSName == 'iphone'){
									var length = item.fieldCount;
									//COMMON.Log('dbDataRows.isValidRow() length ---> ' + length);
									dataValue = '';
									for (var dbCtr = 0; dbCtr < length; dbCtr++) {
										if(item.fieldName(dbCtr).toUpperCase() == HeaderDetailsObj.DataMember.toUpperCase()){
											dataValue = item.fieldByName(HeaderDetailsObj.DataMember);
											dbCtr = length;
										}
										//systemTableConfig[dbDataRows.fieldName(ctr).toUpperCase()] = dbDataRows.field(ctr);
									}
								}else{*/
									try {
										dataValue = item.fieldByName(HeaderDetailsObj.DataMember);
									} catch (e) {
										if (item[HeaderDetailsObj.DataMember] != undefined && item[HeaderDetailsObj.DataMember] != null) {
											dataValue = item[HeaderDetailsObj.DataMember];
											//LOG.debug('Arrayoperation - CreateUI START ' + screenName , + ' - Index : ' + iIndex + ' dataValue3 : ' + dataValue);									
										}
									}
								//}
							}
							//LOG.debug('Arrayoperation - CreateUI START ' + screenName , + ' - Index : ' + iIndex + ' dataValue4 : ' + dataValue);							
						} catch (e) {
							if (DBFieldNameArr.length > 0) {
								if (DBFieldNameArr.indexOf(HeaderDetailsObj.DataMember.toUpperCase()) > -1) {
									if (item[HeaderDetailsObj.DataMember] != undefined && item[HeaderDetailsObj.DataMember] != null) {
										dataValue = item[HeaderDetailsObj.DataMember];
										///LOG.debug('Arrayoperation - CreateUI START ' + screenName , + ' - Index : ' + iIndex + ' dataValue5 : ' + dataValue);								
									}
								}
							} else {
								if (item[HeaderDetailsObj.DataMember] != undefined && item[HeaderDetailsObj.DataMember] != null) {
									dataValue = item[HeaderDetailsObj.DataMember];
									///LOG.debug('Arrayoperation - CreateUI START ' + screenName , + ' - Index : ' + iIndex + ' dataValue5 : ' + dataValue);								
								}
							}
						}
						//LOG.debug('Arrayoperation - CreateUI START ' + screenName , + ' - Index : ' + iIndex + ' item1 : ' + JSON.stringify(item));						
					}

				} catch (e) {
					//LOG.debug('Arrayoperation - CreateUI START ' + screenName , + ' - Index : ' + iIndex + ' item2 : ' + JSON.stringify(item));					
					if (item[HeaderDetailsObj.DataMember] != undefined && item[HeaderDetailsObj.DataMember] != null) {
						dataValue = item[HeaderDetailsObj.DataMember];
						//LOG.debug('Arrayoperation - CreateUI START ' + screenName , + ' - Index : ' + iIndex + ' dataValue5 : ' + dataValue);						
					}
				}
				mFieldControl = {};
				mFieldControl.resetColumnWidth = false;
				//arrFieldControlObj = [], bEnabledarrFieldCtrlObj = false
				if (bEnabledarrFieldCtrlObj == false) {
					mFieldControl.name = HeaderDetailsObj.fieldControl;
					mFieldControl.isEditable = (mFieldControl.name == 'EDITABLETEXTBOX') ? false : true;
					//COMMON.Log('FieldControl BEFORE Change Field Name --> ' + mFieldControl.name + ' mFieldControl.isEditable --> ' + mFieldControl.isEditable);
					try {
						mFieldControl.keyType = 'NUMBER';
						mFieldControl.resetColumnWidth = false;
						mFieldControl = mController.fieldControlHandler(HeaderDetailsObj.DataMember.toUpperCase(), mFieldControl);
						//COMMON.Log('FieldControl AFTER Change Field Name --> ' + mFieldControl.name + ' mFieldControl.isEditable --> ' + mFieldControl.isEditable);
					} catch (e) { }
					//COMMON.Log('********************************** mFieldControl.name --> ' + mFieldControl.name);
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
				//sRow_BG_Color = 'transparent';//HeaderDetailsObj.rowBgColor
				sRow_BG_Color = HeaderDetailsObj.rowBgColor;
				//COMMON.Log('sRow_BG_Color '+sRow_BG_Color);
				//COMMON.Log('sRow_BG_Color '+HeaderDetailsObj.rowBgColor);
				commonObj.tblColumnWidth = (HeaderDetailsObj.columnWidth * widthRatio * 100 / headerListLength);
				//COMMON.Log('CreateUI LINENO - 7629 : ' + new Date().getTime());				
				if (mFieldControl.name == 'LABEL' || mFieldControl.name == 'Label') {//Label
					//var label = TableViewBasicUIObj.createLabel(dataValue, commonObj.tblColumnWidth + '%', rowHeight, HeaderDetailsObj.fontSize, HeaderDetailsObj.HFont, HeaderDetailsObj.fontStyle, HeaderDetailsObj.rowTextColor, sRow_BG_Color, HeaderDetailsObj.allignment, 0);
					var label = Ti.UI.createLabel({
						text: dataValue, width: commonObj.tblColumnWidth + '%', height: rowHeight,
						font: {
							fontSize: HeaderDetailsObj.fontSize,//+'dp',
							fontWeight: (HeaderDetailsObj.fontStyle == '100') ? 'bold' : HeaderDetailsObj.fontStyle, // 'bold'
						},
						color: HeaderDetailsObj.rowTextColor, backgroundColor: sRow_BG_Color, className: 'lbl',
						textAlign: (HeaderDetailsObj.allignment == 2) ? Ti.UI.TEXT_ALIGNMENT_LEFT : ((HeaderDetailsObj.allignment == 0) ? Ti.UI.TEXT_ALIGNMENT_CENTER : Ti.UI.TEXT_ALIGNMENT_RIGHT)
					});
					//COMMON.Log('CreateUI LINENO - 7632 : ' + new Date().getTime());						
					label.text = dataValue;
					label.backgroundPaddingLeft = 30;
					label.backgroundPaddingRight = 30;
					label.touchEnabled = false;
					label.horizontalWrap = true;
					if (Ti.version < '8.0.0') {
						label.wordWrap = true;
					}
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
						label.actVal = '';
						if(Ti.App.sDeviceOSName == 'iphone' || (Ti.version >= '8.9.9')){
							var length = item.fieldCount;
							//COMMON.Log('dbDataRows.isValidRow() length ---> ' + length);
							for (var dbCtr = 0; dbCtr < length; dbCtr++) {
								if(item.fieldName(dbCtr).toUpperCase() == HeaderDetailsObj.DataMember.toUpperCase()){
									label.actVal = item.fieldByName(HeaderDetailsObj.DataMember);
									dbCtr = length;
								}
								//systemTableConfig[dbDataRows.fieldName(ctr).toUpperCase()] = dbDataRows.field(ctr);
							}
						}else{
							label.actVal = item.fieldByName(HeaderDetailsObj.DataMember);
						}
						
					} catch (e) {
						label.actVal = dataValue;
					}
					if (screenName.indexOf('LISTVIEW') < 0) {
						label.color = Ti.App.listForeColor;//'#000080';//'#e8e8e8';
						//COMMON.Log('label.color :'+label.color);
					}
					//if(bColorConfig == true){
					if (bColorConfig == true && sColorCondFieldArr.indexOf(label.DataMember) > -1) {
						label.backgroundColor = this.getColorConfigWithLabel(screenName, label.DataMember, dataValue, item, label);
						//COMMON.Log('label.backgroundColor :'+label.backgroundColor);
					}

					if (bReadOnlyRow == true) {
						label.touchEnabled = false;
					}

					/*
					//COMMON.Log('screenName : ' + screenName);
					
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


					if (screenName == "Task List") {
						////COMMON.Log('screenName : ' + screenName);
						label.touchEnabled = true;
						label.addEventListener('click', function (e) {
							Ti.App.columnClicked = e.source.DataMember;
							////COMMON.Log('AP Ti.App.columnClicked '+Ti.App.columnClicked);
						});
					}
					//COMMON.Log('CreateUI LINENO - 7693 : ' + new Date().getTime());
					vwRowHorizontal.add(label);
					//COMMON.Log('CreateUI LINENO - 7694 : ' + new Date().getTime());
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
					if (Ti.version < '8.0.0') {
						label.wordWrap = true;
					}
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

					if (bReadOnlyRow == true) {
						label.touchEnabled = false;
					}
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
					////COMMON.Log('sDataMemberType '+sDataMemberType + ' sKeyType'+sKeyType);
					if (HeaderDetailsObj.DataMemberType == "NUMBER") {
						sKeyType = 'NUMBER';
					}
					////COMMON.Log('sKeyType '+sKeyType);
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
					field.prevBGColor = sRow_BG_Color;
					field.zIndex = 99;
					field.columnWidth = HeaderDetailsObj.columnWidth;
					field.screenName = screenName;
					field.dLineIndex = dLineIndex;

					//if(bColorConfig == true){
					field.DefBGColor = sRow_BG_Color;//'transparent';
					//COMMON.Log('sRow_BG_Color ' + sRow_BG_Color);
					if (bColorConfig == true && sColorCondFieldArr.indexOf(field.DataMember) > -1) {
						field.backgroundColor = this.getColorConfig(screenName, field.DataMember, dataValue, item);
						if (field.backgroundColor == 'transparent') {
							field.backgroundColor = sRow_BG_Color;
						}

					}
					//COMMON.Log('field.backgroundColor :' + field.backgroundColor);
					//COMMON.Log('FOCTEST-> :' + bReadOnlyRow);
					//field.borderRadius = 11;
					if (bReadOnlyRow == true) {
						field.touchEnabled = false;
						field.editable = false;
						field.focusable = false;
					}
					if (bRowComponentBorder == true) {
						field.borderColor = sBorderColor;
						field.borderWidth = 1;
					}
					//if(dLineIndex > 0){	
					//field.backgroundColor = '#e8e8e8';
					//field.color = '#333';
					//field.borderColor= "#fff";
					//field.borderWidth = 1;
					//}
					if (dataValue == '0' || dataValue == 0) {
						if (field.fieldName == "SuggestedOrder" && (Ti.App.currentScreenName.indexOf("Form-MainItems") > -1 || Ti.App.currentScreenName.indexOf("Form-Assortment") > -1)) {
							field.value = dataValue;
						}
						if (Ti.App.currentScreenName.indexOf("Form-") > -1) {
							field.value = dataValue;
						}
					}
					vwRowHorizontal.add(field);
					/*field.addEventListener('click', function(e) {
						Ti.App.columnClicked = e.source.DataMember;
					});*/
					field.addEventListener('touchstart', function (e) {
						Ti.App.columnClicked = e.source.DataMember;
						/*try{
							if(mView != null && mView != undefined){
								mView.setselectedRowIndex(e.source.iIndex);
							}
						}catch(e){}
						*/
						try {
							if (e.source.touchEnabled != null && e.source.touchEnabled != undefined && e.source.touchEnabled == true) {
								e.source.touchEnabled = true;
								e.source.editable = true;
								e.source.focusable = true;
							}
						} catch (e) { }



					});
					field.addEventListener('change', function (e) {
						if (COMMON.getRowIndex() == 1 && e.source.iIndex == 0) {
							return '';
						}
						Ti.App.columnClicked = e.source.DataMember;
						try {
							if (mView != null && mView != undefined) {
								mView.setselectedRowIndex(e.source.iIndex);
							}
						} catch (e) { }

						//isNumber
						//if (!COMMON.isInteger(e.source.value) && e.source.DataMemberType == 'NUMBER')  {
						/*
						 * Allowing Decimal value for 'NUMBER'
						 * 
						 */
						if (!COMMON.isNumber(e.source.value) && e.source.DataMemberType == 'NUMBER') {
							COMMON.showAlert("Please Enter Valid Number.", ["OK"], null);
							//COMMON.showAlert("ArrayOperation -> Please Enter Valid Character.", ["OK"], null);							 
							this.value = '';
							return false;
						}

						mController.listValueChanged(this, e.source.DataMember, e.source.iIndex, e.source.value);
					});
					field.addEventListener('focus', function (e) {

						//COMMON.Log('Ti.App.bReadOnlyRowTextField ---> ' + Ti.App.bReadOnlyRowTextField);
						Ti.App.columnClicked = e.source.DataMember;
						try {
							if (mView != null && mView != undefined) {
								mView.setselectedRowIndex(e.source.iIndex);
							}
						} catch (e) { }
						this.currentFocus = true;
						commonObj.tbl = Ti.App.currentTable;
						if (e.source.iIndex > 2) {
							//tbl.scrollToTop(e.source.iIndex-5);//scrollT
							try{
							commonObj.tbl.scrollToTop(e.source.iIndex-1);
							}catch(e){
								//COMMON.Log("Error "+e);
							}
						}

						// added this line on 21 Nov 2013 to keep track of focused item.
						mController.listTextFieldFocus(this, e.source.DataMember, e.source.iIndex, e.source.value);
					});
					field.addEventListener('return', function (e) {
						//field.blur();
						//this.currentFocus = false;
						// added this line on 21 Nov 2013 to keep track of focused item.
						//mController.listTextFieldLostFocus(this, e.source.DataMember, e.source.iIndex, e.source.value);
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
									var sCondArrlength = sCondArr.length;
									for (var condCtr = 0; condCtr < sCondArrlength; condCtr++) {
										ConditionFieldValue = '';
										CForeColor = '';
										CBackColor = '';
										//COMMON.Log('ColorConfig sCondArr[condCtr] ---> ' + JSON.stringify(sCondArr[condCtr]));
										if (sCondArr[condCtr].ConditionField != '' && sCondArr[condCtr].ConditionField != null) {
											ConditionFieldValue = ArrayOperations.prototype.getColumnData(0, e.source.iIndex, sCondArr[condCtr].ConditionField);
										} else {
											ConditionFieldValue = sCondArr[condCtr].ConditionValue;
										}
										//COMMON.Log('dColorConfigRowIndex ---> ' + dColorConfigRowIndex);
										//COMMON.Log('dColorConfigRowIndex ---> ' + this.fieldName + ' - ' + sCondArr[condCtr].FieldName);
										if (this.fieldName == sCondArr[condCtr].FieldName) {
											if (sCondArr[condCtr].Condition == '>') {
												if (DataMemberValue > ConditionFieldValue) {
													CForeColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CForeColor);
													CBackColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CBackColor);
													//COMMON.Log('> CForeColor  '+CForeColor+' CBackColor'+CBackColor);
													if (sCondArr[condCtr].CRowColor == 1 || sCondArr[condCtr].CRowColor == '1') {
														CForeColor = 'transparent';
														CBackColor = 'transparent';
														var _tmpRow = ArrayOperations.prototype.getRowByIndex(dColorConfigRowIndex);
														//COMMON.Log('_tmpRow ---> ' + _tmpRow);
														_tmpRow.backgroundColor = '#33ff77';//'#9FC2F5';//'#3333ff';//'#009900';//'#F6921E';
													}
												}
											} else if (sCondArr[condCtr].Condition == '<') {
												if (DataMemberValue < ConditionFieldValue) {
													CForeColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CForeColor);
													CBackColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CBackColor);
													//COMMON.Log('< CForeColor  '+CForeColor+' CBackColor'+CBackColor);
													if (sCondArr[condCtr].CRowColor == 1 || sCondArr[condCtr].CRowColor == '1') {
														CForeColor = 'transparent';
														CBackColor = 'transparent';
														var _tmpRow = ArrayOperations.prototype.getRowByIndex(dColorConfigRowIndex);
														//COMMON.Log('_tmpRow ---> ' + _tmpRow);
														_tmpRow.backgroundColor = '#33ff77';//'#9FC2F5';//'#3333ff';//'#009900';//'#F6921E';
													}
												}
											} else if (sCondArr[condCtr].Condition == '=') {
												//COMMON.Log('DataMemberValue '+DataMemberValue +' ConditionFieldValue '+ConditionFieldValue);
												if (DataMemberValue == ConditionFieldValue) {
													CForeColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CForeColor);
													CBackColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CBackColor);
													//COMMON.Log('= CForeColor  '+CForeColor+' CBackColor'+CBackColor);
													if (sCondArr[condCtr].CRowColor == 1 || sCondArr[condCtr].CRowColor == '1') {
														CForeColor = 'transparent';
														CBackColor = 'transparent';
														var _tmpRow = ArrayOperations.prototype.getRowByIndex(dColorConfigRowIndex);
														//COMMON.Log('_tmpRow ---> ' + _tmpRow);
														_tmpRow.backgroundColor = '#33ff77';//'#9FC2F5';//'#3333ff';//'#009900';//'#F6921E';
													}
												}

												if (CForeColor == '#000000' && CBackColor == '#000000') {
													CForeColor = '#ffffff';
													CBackColor = '#000000';
												}
											}


											if (CBackColor == '') {
												//COMMON.Log('10103 DefBGColor '+e.source.DefBGColor);
												//e.source.backgroundColor = 'transparent';
												e.source.backgroundColor = e.source.DefBGColor;
											}
										}


										//COMMON.Log(' ConditionFieldValue '+ConditionFieldValue);

										//COMMON.Log('CForeColor  '+CForeColor+' CBackColor'+CBackColor);
										if (CBackColor != '') {
											e.source.backgroundColor = CBackColor;
											e.source.color = CForeColor;
											dColorConfigRowIndex = -1;
										}

										//COMMON.Log('this.backgroundColor  '+e.source.backgroundColor+' this.color'+e.source.color);

										if (bIsAndroid) {
											if (e.source.iIndex == 0) {
												ArrayOperations.prototype.refreshTableListUI();
											}
										}
									}
								} catch (e) {
									//alert('TEXTBOX COLORCONFIG ERROR ---> ' + e);
								}
							}
						} catch (e) { }
						dColorConfigRowIndex = -1;
						mController.listTextFieldLostFocus(this, e.source.DataMember, e.source.iIndex, e.source.value);
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
					//COMMON.Log('8085 sRow_BG_Color '+sRow_BG_Color);
					var EditTxtfield = commonObj.TextFieldObj.createTextField(false, dataValue, commonObj.tblColumnWidth + '%', rowHeight, HeaderDetailsObj.fontSize, HeaderDetailsObj.HFont, HeaderDetailsObj.rowTextColor, sRow_BG_Color, HeaderDetailsObj.allignment, false, sKeyType);
					//var field = commonObj.TextFieldObj.createTextField(false, dataValue, commonObj.tblColumnWidth + '%', rowHeight, HeaderDetailsObj.fontSize, HeaderDetailsObj.HFont, HeaderDetailsObj.rowTextColor, HeaderDetailsObj.rowBgColor, HeaderDetailsObj.allignment, false, 'NUMBER');
					//EditTxtfield.backgroundColor = sRow_BG_Color;//'#d6d6d6';//'transparent';
					EditTxtfield.focusable = false;
					EditTxtfield.iIndex = iIndex;
					EditTxtfield.left = dLeftPos + '%';
					EditTxtfield.top = dTopPos;
					EditTxtfield.fieldName = HeaderDetailsObj.fieldName;
					EditTxtfield.fieldControl = mFieldControl.name;
					EditTxtfield.DataMember = HeaderDetailsObj.DataMember.toUpperCase();
					EditTxtfield.DataMemberType = HeaderDetailsObj.DataMemberType.toUpperCase();
					EditTxtfield.columnWidth = HeaderDetailsObj.columnWidth;
					EditTxtfield.dLineIndex = dLineIndex;
					EditTxtfield.valueChanged = false;
					EditTxtfield.dPreValue = dataValue;
					EditTxtfield.dListRowIndex = COMMON.getRowIndex();
					EditTxtfield.prevBGColor = sRow_BG_Color;
					EditTxtfield.screenName = screenName;
					if (mFieldControl.isEditable) {
						EditTxtfield.editable = true;
						EditTxtfield.focusable = true;
					} else {
						EditTxtfield.editable = false;
						//EditTxtfield.focusable = false;
					}
					EditTxtfield.DefBGColor = sRow_BG_Color;//'transparent';
					//if(bColorConfig == true){
					if (bColorConfig == true && sColorCondFieldArr.indexOf(EditTxtfield.DataMember) > -1) {
						EditTxtfield.backgroundColor = this.getColorConfig(screenName, EditTxtfield.DataMember, dataValue, item);
					}

					if (bReadOnlyRow == true) {
						EditTxtfield.touchEnabled = false;
						EditTxtfield.editable = false;
						EditTxtfield.focusable = false;
					}
					//EditTxtfield.DefBGColor = EditTxtfield.backgroundColor;
					//EditTxtfield.borderRadius = 11;
					EditTxtfield.borderColor = '#333';
					EditTxtfield.borderWidth = 1;
					EditTxtfield.borderRadius = 6;
					if (bRowComponentBorder == true) {
						EditTxtfield.borderColor = sBorderColor;
						EditTxtfield.borderWidth = 1;
					}
					/*if(dLineIndex > 0){	
						EditTxtfield.backgroundColor = '#e8e8e8';
						EditTxtfield.color = '#333';
						EditTxtfield.borderColor= "#fff";
						EditTxtfield.borderWidth = 1;
					}*/
					vwRowHorizontal.add(EditTxtfield);
					/*EditTxtfield.addEventListener('click', function(e) {
						Ti.App.columnClicked = e.source.DataMember;
					});*/
					EditTxtfield.addEventListener('touchstart', function (e) {
						Ti.App.columnClicked = e.source.DataMember;
						try {
							if (mView != null && mView != undefined) {
								mView.setselectedRowIndex(e.source.iIndex);
							}
						} catch (e) { }
						try {
							mController.checkEditableTextBox(this, e.source.DataMember, e.source.iIndex, e.source.value);
						} catch (e) { }
					});
					/*EditTxtfield.addEventListener('longpress', function(e) {
						Ti.App.columnClicked = e.source.DataMember;
					});*/
					EditTxtfield.addEventListener('change', function (e) {
						/*if(Ti.App.dnotouch == true){
							return '';
						}*/
						/*if (!COMMON.isNumber(e.source.value)) {
							//COMMON.showAlert("Please Enter Valid Character.", ["OK"], null);
							COMMON.showAlert("ArrayOperation -> Please Enter Valid Character.", ["OK"], null);
							this.value = '';
							return false;
						}*/
						if (e.source.DataMember.toUpperCase() == 'BULKQTY' || e.source.DataMember.toUpperCase() == 'PACKQTY') {
							////COMMON.Log('7606 listvaluechanged'+((e.source.value % 1)===0));
							//if (!((e.source.value % 1)===0)) {
							if (!COMMON.isInteger(e.source.value)) {
								COMMON.showAlert("Please Enter Valid Quantity.", ["OK"], null);
								//COMMON.showAlert("ArrayOperation -> Please Enter Valid Character.", ["OK"], null);
								this.dPreValue = '';
								this.value = '';
								return false;
							}
						}
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
							//COMMON.Log('this.dPreValue '+ this.dPreValue +' e.value '+ e.value +' - '+ e.source.value +' - '+ this.value);							
							//this.valueChanged = true;
							if (this.dPreValue != e.source.value)  {
								//COMMON.Log('if enterd');
								this.dPreValue = e.source.value;
								this.valueChanged = true;
								mController.listValueChanged(this, e.source.DataMember, e.source.iIndex, e.source.value);
							}
						} catch (e) { }
					});
					EditTxtfield.addEventListener('return', function (e) {
						/*if(Ti.App.dnotouch == true){
							return '';
						}*/
						//COMMON.Log('EDITABLE TEXTBOX return');
						Ti.App.bReadOnlyRowTextField = true;
						//COMMON.Log('LOST FOCUS START TIME : ' + new Date().getTime());
						// this.backgroundColor = this.prevBGColor;
						// this.currentFocus = false;
						// this.valueChanged = false;
						// this.blur();
						// return '';
						currentFocusedField = null;
						commonObj.txtValue = e.source.value;
						commonObj.txtValue = (commonObj.txtValue == null || commonObj.txtValue == undefined || commonObj.txtValue == '') ? -1 : commonObj.txtValue.length;
						this.maxLength = commonObj.txtValue;
						this.editable = false;//true;
						//COMMON.Log('return --> this.maxLength : ' + this.maxLength);
						//COMMON.Log('return --> ' + e.source.DataMember + ' - ' + e.source.iIndex + ' this.valueChanged -> ' + this.valueChanged);
						//if(Ti.version < '7.5.0'){
						if (this.valueChanged == true) {//} || Ti.version >= '7.5.0'){	//7.5.0
							//this.backgroundColor = 'transparent';
							this.backgroundColor = this.prevBGColor;
							this.currentFocus = false;
							//this.editable = false;
							//this.focusable = false;
							//this.blur();
							this.editable = true;
							this.focusable = true;
							try {
								//getColumnData : function(sectionIndex, rowIndex, fieldName) {
								sCondArr = [];
								sCondArr = Titanium.App.Properties.getList('ColorConfig_' + screenName);
								if (sCondArr.length > 0) {
									DataMemberValue = ArrayOperations.prototype.getColumnData(0, e.source.iIndex, e.source.DataMember);
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
										//COMMON.Log('DataMemberValue '+DataMemberValue + ' ConditionFieldValue'+ConditionFieldValue);
										if (sCondArr[condCtr].Condition == '>') {
											if (DataMemberValue > ConditionFieldValue) {
												//COMMON.Log('DataMemberValue '+DataMemberValue + '> ConditionFieldValue'+ConditionFieldValue);
												CForeColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CForeColor);
												CBackColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CBackColor);
												if (CBackColor != '') {
													e.source.backgroundColor = CBackColor;
													e.source.color = CForeColor;
													this.DefBGColor = CBackColor;
													this.prevBGColor = CBackColor;
													break;
												}
											}
										} else if (sCondArr[condCtr].Condition == '<') {
											if (DataMemberValue < ConditionFieldValue) {
												//COMMON.Log('DataMemberValue '+DataMemberValue + ' < ConditionFieldValue'+ConditionFieldValue);
												CForeColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CForeColor);
												CBackColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CBackColor);
												if (CBackColor != '') {
													e.source.backgroundColor = CBackColor;
													e.source.color = CForeColor;
													this.DefBGColor = CBackColor;
													this.prevBGColor = CBackColor;
													break;
												}
											}
										} else if (sCondArr[condCtr].Condition == '=') {
											if (DataMemberValue == ConditionFieldValue || DataMemberValue === ConditionFieldValue) {
												//COMMON.Log('DataMemberValue '+DataMemberValue + ' === ConditionFieldValue'+ConditionFieldValue);
												CForeColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CForeColor);
												CBackColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CBackColor);
												if (CBackColor != '') {
													e.source.backgroundColor = CBackColor;
													this.DefBGColor = CBackColor;
													this.prevBGColor = CBackColor;
													e.source.color = CForeColor;
													break;
												}
											}



										}
										//COMMON.Log('ConditionFieldValue '+ConditionFieldValue +':CForeColor '+CForeColor+' CBackColor'+CBackColor);
										if (ConditionFieldValue == '') {
											//COMMON.Log(' 7820 DataMemberValue '+DataMemberValue + ' === ConditionFieldValue'+ConditionFieldValue);
											CForeColor = '#ffffff';//ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CForeColor);
											CBackColor = 'transparent';//ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CBackColor);	
										}
										//COMMON.Log('ConditionFieldValue '+ConditionFieldValue +':CForeColor '+CForeColor+' CBackColor'+CBackColor);

										/*//COMMON.Log('ConditionFieldValue '+ConditionFieldValue);
										if(ConditionFieldValue == ''){                        	
                        					CForeColor = 'transparent';
                            				CBackColor = 'transparent';
                        				}*/

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
							try {
								mController.listTextFieldLostFocus(this, e.source.DataMember, e.source.iIndex, e.source.value);
							} catch (e) { }
							this.valueChanged = false;
							//COMMON.Log('LOST FOCUS START TIME 2 : ' + new Date().getTime());
						}
						//this.editable = true;
						//this.focusable = true;
						//COMMON.Log('textFieldNextFocusByIndex --> ' + e.source.DataMember + ' - ' + e.source.iIndex);
						try {
							//mController.textFieldNextFocusByIndex(e.source.iIndex+1);
							//**/
							if (Ti.version < '8.3.0') {
								commonObj._tmpRowIndex = e.source.iIndex;
								commonObj._tmpRowIndex = parseInt(commonObj._tmpRowIndex) + 1;
								commonObj.tblLen = ArrayOperations.prototype.getAllRows(0).length;//SI.getAllRows(0).length;
								commonObj.tblLen = (commonObj.tblLen == null || commonObj.tblLen == undefined || commonObj.tblLen == '') ? 0 : commonObj.tblLen;
								//COMMON.Log(commonObj.tblLen + ' > ' + commonObj._tmpRowIndex);
								this.backgroundColor = this.prevBGColor;
								this.currentFocus = false;
								//this.valueChanged = false;
								////this.editable = true;
								////this.maxLength = 9999;
								if (commonObj.tblLen > 0 && commonObj.tblLen > commonObj._tmpRowIndex) {
									commonObj.field = ArrayOperations.prototype.getRowComponent(0, commonObj._tmpRowIndex, e.source.DataMember);
									Ti.App.bReadOnlyRowTextField = false;
									setTimeout(function () {
										commonObj.field.focus();//7.5.0//09Jan
										Ti.App.bAutoFocusTextboxEnabled = true;
									}, 100);
									/*******NewCustomer Focus****/
									try {
										if (screenName == 'NewCustomer' || screenName == 'NewCustomer - Existing') {
											mController.listTextFieldLostFocus(this, e.source.DataMember, e.source.iIndex, e.source.value);
										}
									} catch (e) { }
									/*******NewCustomer Focus****/

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
							}
							//**/
							this.valueChanged = false;
							this.editable = true;
							this.maxLength = 9999;
						} catch (e) {
							Ti.App.bReadOnlyRowTextField = false;

						}
						finally {
							this.valueChanged = false;
							this.editable = true;
							this.maxLength = 9999;
							Ti.App.bReadOnlyRowTextField = false;
						}
						//COMMON.Log('LOST FOCUS END TIME : ' + new Date().getTime());
					});
					EditTxtfield.addEventListener('focus', function (e) {
						/*if(Ti.App.dnotouch == true){
							return '';
						}*/
						/*//COMMON.Log("this.ReadOnly1 "+this.ReadOnly);
                        if(this.ReadOnly == true){
                            this.valueChanged = false;
                            //this.blur();
                            if (COMMON.isPlatformAndroid()) {
                                Ti.UI.Android.hideSoftKeyboard();
                            }
                            return "";
                        }*/
						//COMMON.Log('Ti.App.bAutoFocusTextboxEnabled ---> ' + Ti.App.bAutoFocusTextboxEnabled);
						//COMMON.Log('Ti.App.bReadOnlyRowTextField ---> ' + Ti.App.bReadOnlyRowTextField);
						if (Ti.App.bAutoFocusTextboxEnabled == true) {
							setTimeout(function () {
								Ti.App.bAutoFocusTextboxEnabled = false;
							}, 100);
							return "";
						}
						//COMMON.Log('Ti.App.bReadOnlyRowTextField ---> ' + Ti.App.bReadOnlyRowTextField);
						if (Ti.App.bReadOnlyRowTextField == true) {
							this.backgroundColor = this.prevBGColor;
							this.valueChanged = false;
							if (Ti.version < '8.3.0') {
								this.blur();
							}
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
						try{
							if (e.source.iIndex > 5 && !(screenName == 'NewCustomer' || screenName == 'NewCustomer - Existing')) {// && e.source.dLineIndex == 0){
								//tbl.scrollToTop(e.source.iIndex-5);//scrollT
								commonObj.tbl.scrollToTop(e.source.iIndex - 3);//scrollT//NoneedParkfood
								//tbl.scrollToIndex(e.source.iIndex);//scrollT
							}
						}catch(e){}
						this.prevBGColor = this.DefBGColor;//.backgroundColor;
						//this.backgroundColor = 'transparent';//'#666666';//'#333333';
						//COMMON.Log('this.backgroundColor '+this.backgroundColor);
						//}
						Ti.App.columnClicked = e.source.DataMember;
						currentFocusedField = this;
						this.currentFocus = true;
						// added this line on 21 Nov 2013 to keep track of focused item.
						try {
							mController.listTextFieldFocus(this, e.source.DataMember, e.source.iIndex, e.source.value);
						} catch (e) { }
						if (Ti.version < '8.3.0') {
							var val = this.value;
							val = (val == null || val == undefined || val == '') ? '' : val;
							//COMMON.Log('val1 --> ' + val);
							if (val != '') {
								//COMMON.Log('val2 --> ' + val);
								val = new String(val);
								//COMMON.Log('val.length --> ' + val.length);
								//field.setSelection(field.value.length, field.value.length);
								e.source.setSelection(0, val.length);
								//this.setSelection(val.length, 0); 
							}
						}
					});
					EditTxtfield.addEventListener('blur', function (e) {
						/*if(Ti.App.dnotouch == true){
							return '';
						}*/
						//COMMON.Log('EDITABLE TEXTBOX blur');
						//COMMON.Log('blur --> ' + e.source.DataMember + ' - ' + e.source.iIndex + ' this.valueChanged -> ' + this.valueChanged);
						//COMMON.Log('blur --> ' + e.source.DataMember + ' - ' + e.source.iIndex + ' this.valueChanged -> ' + this.valueChanged);
						//this.backgroundColor = 'transparent';
						currentFocusedField = null;
						this.backgroundColor = this.prevBGColor;
						this.currentFocus = false;
						this.editable = true;
						this.focusable = true;
						//COMMON.Log('this.valueChanged : '+this.valueChanged);
						if (this.valueChanged == true) {// || Ti.version >= '7.5.0'){//7.5.0
							Ti.App.bReadOnlyRowTextField = true;
							this.valueChanged = false;
							try {
								//getColumnData : function(sectionIndex, rowIndex, fieldName) {
								sCondArr = [];
								sCondArr = Titanium.App.Properties.getList('ColorConfig_' + screenName);
								if (sCondArr.length > 0) {
									DataMemberValue = ArrayOperations.prototype.getColumnData(0, e.source.iIndex, e.source.DataMember);
									//COMMON.Log('LostFocus DataMemberValue :'+DataMemberValue);
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
										//COMMON.Log('DataMemberValue '+DataMemberValue + ' ConditionFieldValue'+ConditionFieldValue);
										if (sCondArr[condCtr].Condition == '>') {
											if (DataMemberValue > ConditionFieldValue) {
												//COMMON.Log('DataMemberValue '+DataMemberValue + '> ConditionFieldValue'+ConditionFieldValue);
												CForeColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CForeColor);
												CBackColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CBackColor);
											}
										} else if (sCondArr[condCtr].Condition == '<') {
											if (DataMemberValue < ConditionFieldValue) {
												//COMMON.Log('DataMemberValue '+DataMemberValue + ' < ConditionFieldValue'+ConditionFieldValue);
												CForeColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CForeColor);
												CBackColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CBackColor);
											}
										} else if (sCondArr[condCtr].Condition == '=') {
											if (DataMemberValue == ConditionFieldValue || DataMemberValue === ConditionFieldValue) {
												//COMMON.Log('DataMemberValue '+DataMemberValue + ' === ConditionFieldValue'+ConditionFieldValue);
												CForeColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CForeColor);
												CBackColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CBackColor);
											}



										}
										//COMMON.Log('ConditionFieldValue '+ConditionFieldValue +':CForeColor '+CForeColor+' CBackColor'+CBackColor);
										if (ConditionFieldValue == '') {
											//COMMON.Log(' 7820 DataMemberValue '+DataMemberValue + ' === ConditionFieldValue'+ConditionFieldValue);
											CForeColor = '#ffffff';//ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CForeColor);
											CBackColor = 'transparent';//ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CBackColor);	
										}
										//COMMON.Log('ConditionFieldValue '+ConditionFieldValue +':CForeColor '+CForeColor+' CBackColor'+CBackColor);

										/*//COMMON.Log('ConditionFieldValue '+ConditionFieldValue);
										if(ConditionFieldValue == ''){                        	
                        					CForeColor = 'transparent';
                            				CBackColor = 'transparent';
                        				}*/

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
								mController.listTextFieldLostFocus(this, e.source.DataMember, e.source.iIndex, e.source.value);
							} catch (e) { }
							Ti.App.bReadOnlyRowTextField = false;
						}
						//this.editable = true;
						//this.focusable = true;
					});
					/*field.addEventListener('swipe', function(e) {
						Ti.App.columnClicked = e.source.DataMember;
					});*/
				} else if (mFieldControl.name == 'NUMERICDROPDOWN') {//Field
					
					//var field = commonObj.BasicLabelObj.createLabel(dataValue, commonObj.tblColumnWidth + '%', rowHeight, HeaderDetailsObj.fontSize, HeaderDetailsObj.HFont, HeaderDetailsObj.fontStyle, HeaderDetailsObj.rowTextColor, HeaderDetailsObj.rowBgColor, HeaderDetailsObj.allignment, 0);
					
					
					var sNumericDropdownView = Ti.App.BasicViewObj.createBasicView(null, 'transparent', rowHeight, commonObj.tblColumnWidth + '%', null, null, null, null, 'horizontal');
					sNumericDropdownView.text = dataValue;
					
					sNumericDropdownView.left = dLeftPos+'%';//0;
					sNumericDropdownView.top = dTopPos;//0;
					sNumericDropdownView.iIndex = iIndex;
					sNumericDropdownView.fieldName = HeaderDetailsObj.fieldName;
					sNumericDropdownView.fieldControl = mFieldControl.name;
					sNumericDropdownView.DataMember = HeaderDetailsObj.DataMember.toUpperCase();
					sNumericDropdownView.DataMemberType = HeaderDetailsObj.DataMemberType.toUpperCase();
					sNumericDropdownView.prevBGColor = sRow_BG_Color; 
					sNumericDropdownView.zIndex = 99;
					sNumericDropdownView.columnWidth = HeaderDetailsObj.columnWidth;
					sNumericDropdownView.screenName = screenName;
					sNumericDropdownView.dLineIndex = dLineIndex;
					sNumericDropdownView.DefBGColor = sRow_BG_Color;//'transparent';
					
					var field = new TextField().createTextField(false, dataValue, '40%', rowHeight, HeaderDetailsObj.fontSize, '', '#000', '#fff', 0, false, 'NUMBER');
					field.hintText = '0';
					field.backgroundColor = '#fff';//sBackgroundColor;//'#333';
					field.borderColor = '#333';
					field.borderWidth = 1;
					field.sNumericDropdownView = sNumericDropdownView;
					field.iIndex = iIndex;
					field.fieldName = HeaderDetailsObj.fieldName;
					field.fieldControl = mFieldControl.name;
					field.DataMember = HeaderDetailsObj.DataMember.toUpperCase();
					field.DataMemberType = HeaderDetailsObj.DataMemberType.toUpperCase();
					field.zIndex = 99;
					field.columnWidth = HeaderDetailsObj.columnWidth;
					field.screenName = screenName;
					field.dLineIndex = dLineIndex;
					
					field.addEventListener('change',function(e){
						try {
							mController.listNumericTextFieldChanges(this, e.source.DataMember, e.source.iIndex, e.source.value);
						} catch(e) {}
					});
					
					
					field.addEventListener('return',function(e){
						try {
							mController.listNumericTextFieldLostFocus(this, e.source.DataMember, e.source.iIndex, e.source.value);
						} catch(e) {}
					});
					
					var lbutton = new BasicButton().createButton('-', '30%', rowHeight, HeaderDetailsObj.fontSize, '#FFF');
					lbutton.borderRadius = 0;
					lbutton.field = field;
					lbutton.borderWidth = 0;
					//lbutton.bordercolor = '#f00';
					////COMMON.Log('lbutton created ');
					 
					var rbutton = new BasicButton().createButton('+', '30%', rowHeight, HeaderDetailsObj.fontSize, '#FFF');
					rbutton.borderRadius = 0;
					rbutton.field = field;
					rbutton.borderWidth = 0;
					//rbutton.bordercolor = '#f00';
					////COMMON.Log('rbutton created '); 
					
					
					rbutton.addEventListener('click',function(e){
						if (e.source.field.value != null && e.source.field.value != undefined && e.source.field.value != ''){
							e.source.field.value = parseInt(e.source.field.value) + parseInt(1);
						}else{
							e.source.field.value = 1;//0;
						}
						e.source.field.sNumericDropdownView.text = e.source.field.value;
						////COMMON.Log("rbutton clicked    ");
						try {
							mController.listNumericTextFieldChanges(e.source.field, e.source.field.DataMember, e.source.field.iIndex, e.source.field.value);
						} catch(e) {}
						
					});
					
					lbutton.addEventListener('click',function(e){ 
						if (e.source.field.value != null && e.source.field.value != undefined && e.source.field.value != ''){
							e.source.field.value = parseInt(e.source.field.value) - parseInt(1);								
							if (e.source.field.value < 0){
								e.source.field.value = 0;
							}
						}else{
							e.source.field.value = 0;
						}
						e.source.field.sNumericDropdownView.text = e.source.field.value;
					   ////COMMON.Log("lbutton clicked ");
						try {
							mController.listNumericTextFieldChanges(e.source.field, e.source.field.DataMember, e.source.field.iIndex, e.source.field.value);
						} catch(e) {}
					});

					sNumericDropdownView.add(lbutton);
					sNumericDropdownView.add(field);
					sNumericDropdownView.add(rbutton);
					vwRowHorizontal.add(sNumericDropdownView);
					
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
					field.zIndex = 9999;
					field.columnWidth = HeaderDetailsObj.columnWidth;
					field.dLineIndex = dLineIndex;
					if (bRowComponentBorder == true) {
						field.borderColor = sBorderColor;
						field.borderWidth = 1;
					}
					field.borderColor = '#000';//sBorderColor;
					field.borderWidth = 1;
					field.backgroundImage = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'combobox.simg');
					//if(bColorConfig == true){
					if (bColorConfig == true && sColorCondFieldArr.indexOf(field.DataMember) > -1) {
						field.backgroundColor = this.getColorConfig(screenName, field.DataMember, dataValue, item);
					}
					comboData = [];
					if (HeaderDetailsObj.fieldName != 'UOM' && HeaderDetailsObj.fieldName != 'Uom' && HeaderDetailsObj.fieldName != 'uom') {
						commonObj.mScreenNameComboQry = HeaderDetailsObj.screenName + '_COMBOBOX_' + HeaderDetailsObj.fieldName;
						commonObj.mScreenNameComboQryTxt = this.getQueryConfigByScreenNameWithOrderText(commonObj.mScreenNameComboQry);
						//COMMON.Log('List Config ComboBox Query ---> ' + commonObj.mScreenNameComboQryTxt);
						try {
							comboData = this.createComboBoxData(commonObj.mScreenNameComboQryTxt);
							if (comboData.length > 0) {
								var comboDatalength = comboData.length;
								if (HeaderDetailsObj.fieldName == 'ReasonCode') {
									commonObj.bDefaultValueFound = false;
									//field.text = '';
									//field.code = '';

									for (var _j = 0; _j < comboDatalength; _j++) {
										if (comboData[_j].ComboBoxCode == dataValue || comboData[_j].displayText == dataValue) {
											commonObj.bDefaultValueFound = true;
											field.text = comboData[_j].displayText;
											field.code = comboData[_j].ComboBoxCode;
											_j = comboDatalength;
										}
									}

									//if(commonObj.bDefaultValueFound == false){
									//field.text = comboData[0].displayText;
									//field.code = comboData[0].ComboBoxCode;
									//}
								} else {

									for (var _j = 0; _j < comboDatalength; _j++) {
										if (comboData[_j].ComboBoxCode == dataValue) {
											commonObj.bDefaultValueFound = true;
											field.text = comboData[_j].displayText;
											field.code = comboData[_j].ComboBoxCode;
											_j = comboDatalength;
										}
									}
								}
							}
						} catch (e) {
							comboData = [];
						}
					}
					if (bReadOnlyRow == true) {
						field.touchEnabled = false;
						field.editable = false;
						field.focusable = false;
					}

					field.ComboBoxData = comboData;
					field.addEventListener('click', function (e) {
						//+2018-08-12
						if (COMMON.isPlatformAndroid()) {
							Ti.UI.Android.hideSoftKeyboard();
						}

						//COMMON.Log('ComboBox Displayed ---> ');
						Ti.App.columnClicked = e.source.DataMember;
						if (mView != null && mView != undefined) {
							mView.setselectedRowIndex(this.iIndex);
						}
						if (this.ComboBoxData.length != 0) {
							////COMMON.Log('9248 this.title' +this.title);
							new ComboBox().show(this.title, mController, this.ComboBoxData, this, this.screenName, this.fieldName, this.searchType);
						} else {
							try {
								////COMMON.Log('9251 this.title' +this.title);								 
								//if (this.title != ''){
								if (this.title != '' || Ti.App.currentScreenName.indexOf("Form-") > -1) {
									mController.handleShowingComboBox(this.iIndex, this.title, mController, this, this.screenName, this.fieldName, this.searchType);
								}
								else {
									////COMMON.Log('9254 : ' + this.fieldName.toUpperCase() + ' Not Found !!!');
									//COMMON.showAlert('MSG_COMBOBOX_NOTFOUND_'+this.fieldName.toUpperCase(), ['OK'], null);
									//COMMON.Log('9269 return false');
									return false;
								}
								//mController.handleShowingComboBox(this.iIndex, this.title, mController, this, this.screenName, this.fieldName, this.searchType);

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
							mController.listValueChanged(this, e.source.DataMember, e.source.iIndex, e.source.value);
						} catch(e) {}
					});
					field.addEventListener('focus', function(e) {
						try {
							mController.listTextFieldFocus(this, e.source.DataMember, e.source.iIndex, e.source.value);
						} catch(e) {}
					});
					field.addEventListener('blur', function(e) {
						try {
							mController.listTextFieldLostFocus(this, e.source.DataMember, e.source.iIndex, e.source.value);
						} catch(e) {}
					});*/
					//field.addEventListener('swipe', function(e) {
					//Ti.App.columnClicked = e.source.DataMember;
					//});
					vwRowHorizontal.add(field);
				} else if (mFieldControl.name == 'DATEPICKER') {//DatePicker
					try{

					
					Ti.API.info('dataValue '+dataValue);
					var dateLabel = commonObj.BasicLabelObj.createLabel(dataValue, commonObj.tblColumnWidth + '%', rowHeight, HeaderDetailsObj.fontSize, HeaderDetailsObj.HFont, HeaderDetailsObj.fontStyle, HeaderDetailsObj.rowTextColor, HeaderDetailsObj.rowBgColor, HeaderDetailsObj.allignment, 0);
					//var dateLabel = commonObj.BasicLabelObj.createLabel(dataValue, (HeaderDetailsObj.columnWidth * widthRatio * 100 / headerListLength) + '%', rowHeight, HeaderDetailsObj.fontSize, HeaderDetailsObj.HFont, HeaderDetailsObj.fontStyle, HeaderDetailsObj.rowTextColor, HeaderDetailsObj.rowBgColor, HeaderDetailsObj.allignment, 0);
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
					//field.DataMemberType = HeaderDetailsObj.DataMemberType.toUpperCase();
					dateLabel.DataMemberType = HeaderDetailsObj.DataMemberType.toUpperCase();
					dateLabel.searchType = 0;
					dateLabel.columnWidth = HeaderDetailsObj.columnWidth;
					Ti.API.info('HeaderDetailsObj.columnWidth '+HeaderDetailsObj.columnWidth);
					dateLabel.dLineIndex = dLineIndex;
					if (bRowComponentBorder == true) {
						dateLabel.borderColor = sBorderColor;
						dateLabel.borderWidth = 1;
					}
					//if(bColorConfig == true){
					if (bColorConfig == true && sColorCondFieldArr.indexOf(dateLabel.DataMember) > -1) {
						dateLabel.backgroundColor = this.getColorConfig(screenName, dateLabel.DataMember, dataValue, item);
					}
					if (bReadOnlyRow == true) {
						dateLabel.touchEnabled = false;
						dateLabel.editable = false;
						dateLabel.focusable = false;
					}
					dateLabel.addEventListener('click', function (e) {
						Ti.App.columnClicked = e.source.DataMember;
						var datepicker = new DatePicker();
						datepicker.setController(mController);
						try {
							//COMMON.Log(e.source.iIndex + ' - ' + this.iIndex);
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
							mController.listValueChanged(this, e.source.DataMember, e.source.iIndex, e.source.value);
						} catch(e) {}
					});
					dateLabel.addEventListener('focus', function(e) {
						try {
							mController.listTextFieldFocus(this, e.source.DataMember, e.source.iIndex, e.source.value);
						} catch(e) {}
					});
					dateLabel.addEventListener('blur', function(e) {
						try {
							mController.listTextFieldLostFocus(this, e.source.DataMember, e.source.iIndex, e.source.value);
						} catch(e) {}
					});*/
					//dateLabel.addEventListener('swipe', function(e) {
					//Ti.App.columnClicked = e.source.DataMember;
					//});
					vwRowHorizontal.add(dateLabel);
				}catch(e){
					Ti.API.info('Datepicker Error '+e);
				}
				} else if (mFieldControl.name == 'DISABLEDOPTION') {

					var checkBox = new BasicCheckBox().createBasicCheckBox(dataValue, HeaderDetailsObj.allignment);
					checkBox.value = (dataValue == null || dataValue == undefined || dataValue == "" || dataValue == 0 || dataValue == "0" || dataValue == "false" || dataValue == false) ? false : true;
					checkBox.index = iIndex;
					checkBox.backgroundColor = sRow_BG_Color;//'transparent';
					checkBox.fieldControl = mFieldControl.name;
					checkBox.DataMember = HeaderDetailsObj.DataMember.toUpperCase();
					checkBox.DataMemberType = HeaderDetailsObj.DataMemberType.toUpperCase();
					checkBox.iIndex = iIndex;
					if (HeaderDetailsObj.allignment == 0) {
						checkBox.left = (0.07 * HeaderDetailsObj.colnWidth) + dLeftPos + "%";
					}
					else {
						checkBox.left = dLeftPos + '%';
					}
					//checkBox.left = dLeftPos + '%';
					checkBox.top = dTopPos;
					checkBox.fieldName = HeaderDetailsObj.fieldName;
					checkBox.columnWidth = HeaderDetailsObj.columnWidth;
					//checkBox.width = commonObj.tblColumnWidth + '%';
					//checkBox.borderColor = '#e8e8e8';
					//checkBox.borderWidth = 2;
					checkBox.height = rowHeight;
					checkBox.defaultValue = (dataValue == null || dataValue == undefined || dataValue == "" || dataValue == 0 || dataValue == "0" || dataValue == "false" || dataValue == false) ? false : true;
					checkBox.dLineIndex = dLineIndex;
					checkBox.touchEnabled = false;


					vwRowHorizontal.add(checkBox);
				}
				else if (mFieldControl.name == 'OPTION') {//DatePicker

					//alert('HeaderDetailsObj.defaultText : ' + HeaderDetailsObj.defaultText);
					try{

					//COMMON.Log('dataValue '+dataValue);
					var checkBox = new BasicCheckBox().createBasicCheckBox(dataValue, HeaderDetailsObj.allignment);
					checkBox.value = (dataValue == null || dataValue == undefined || dataValue == "" || dataValue == 0 || dataValue == "0" || dataValue == "false" || dataValue == false) ? false : true;
					checkBox.index = iIndex;
					checkBox.backgroundColor = sRow_BG_Color;//'transparent';
					checkBox.fieldControl = mFieldControl.name;
					checkBox.DataMember = HeaderDetailsObj.DataMember.toUpperCase();
					checkBox.DataMemberType = HeaderDetailsObj.DataMemberType.toUpperCase();
					checkBox.iIndex = iIndex;
					if (HeaderDetailsObj.allignment == 0) {
						checkBox.left = (0.065 * HeaderDetailsObj.colnWidth) + dLeftPos + "%";
					}
					else {
						checkBox.left = dLeftPos + '%';
					}
					//COMMON.Log("Log->dLeftPos->"+dLeftPos);
					//checkBox.left = (4+dLeftPos) + '%';
					checkBox.top = dTopPos;
					checkBox.defaultText = HeaderDetailsObj.defaultText;
					checkBox.fieldName = HeaderDetailsObj.fieldName;
					checkBox.columnWidth = HeaderDetailsObj.columnWidth;
					checkBox.width = HeaderDetailsObj.columnWidth + '%';//commonObj.tblColumnWidth + '%';
					//checkBox.borderColor = '#e8e8e8';
					//checkBox.borderWidth = 2;
					checkBox.height = rowHeight;
					checkBox.defaultValue = (dataValue == null || dataValue == undefined || dataValue == "" || dataValue == 0 || dataValue == "0" || dataValue == "false" || dataValue == false) ? false : true;
					checkBox.dLineIndex = dLineIndex;
					checkBox.bubbleParent = false;
					//if (HeaderDetailsObj.showBorder == 1) {
					//	checkBox.borderWidth = 2;
					//	checkBox.borderColor = 'white';
					//}
					if (mFieldControl.isEditable) {
						checkBox.touchEnabled = true;
					} else {
						checkBox.touchEnabled = false;
					}
					if (bReadOnlyRow == true) {
						checkBox.touchEnabled = false;
						checkBox.editable = false;
						checkBox.focusable = false;
					}

					if (Ti.Platform.name == 'android') {
						checkBox.addEventListener('click', checkboxevent1);
					} else {
						checkBox.addEventListener('change', checkboxevent1);
					}


					function checkboxevent1(e) {
						if (bGroupOptionChecking == true) {
							return false;
						}
						try {
							//COMMON.Log('this.iIndex --> ' + this.iIndex + ' : this.defaultText --> ' + this.defaultText);

							Ti.App.columnClicked = e.source.DataMember;
							if (mView != null && mView != undefined) {
								mView.setselectedRowIndex(this.iIndex);
							}
							var sDefaultText = COMMON.CheckString(this.defaultText);
							//COMMON.Log('sDefaultText --> ' + sDefaultText);
							if (sDefaultText != '') {
								var arrOptions = sDefaultText.split(",");
								if (arrOptions.length > 0) {
									bGroupOptionChecking = true;
									for (var dGroupOptionCnt = 0; dGroupOptionCnt < arrOptions.length; dGroupOptionCnt++) {
										//COMMON.Log('this.fieldName : ' + this.fieldName + ' != arrOptions[dGroupOptionCnt] : ' + arrOptions[dGroupOptionCnt]);
										//COMMON.Log('GET ROW COMPONWNT : ' + arrOptions[dGroupOptionCnt] + ' : ' + ArrayOperations.prototype.getRowComponent(0, this.iIndex, arrOptions[dGroupOptionCnt]));
										try {
											if (this.fieldName != arrOptions[dGroupOptionCnt]) {
												ArrayOperations.prototype.getRowComponent(0, this.iIndex, arrOptions[dGroupOptionCnt]).value = false;
												//getRowComponent(sectionIndex, rowIndex, fieldName)
											}
										} catch (e) { }
									}
								}
							}
						} catch (e) {
						} finally {
							setTimeout(function () {
								bGroupOptionChecking = false;
							}, 100);
						}

						try {
							try {
								var bflagOption = mController.checkBoxEditable(this.iIndex, this.value);
								//COMMON.Log('bflagOption --> ' + bflagOption);
								//COMMON.Log('this.defaultValue ---> ' + this.defaultValue);
								if (!bflagOption) {// && bflagOption != ''){
									this.value = this.defaultValue;
									return false;
								}
								if (COMMON.avoidMultipleClick()) {
									return '';
								}
							} catch (e) { }
							//COMMON.Log("this.iIndex checkboxevent --> " + this.iIndex);
							mController.checkBoxValueChanged(this.iIndex, this.value, this.fieldName);
						} catch (e) { }
					}
					//if(checkBox.columnWidth>0)
					vwRowHorizontal.add(checkBox);
				}catch(e){
						//COMMON.Log('Option error '+e);
				}
				} else if (mFieldControl.name == 'OPTIONGROUP') {
					var sActive = '';
					//COMMON.Log('9840 dataValue '+dataValue);
					if (dataValue == null || dataValue == undefined || dataValue == "") {
						//if(dataValue == null || dataValue == undefined){
						sActive = '';
					} else {
						if (dataValue != '') {
							sActive = COMMON.CheckBooleanField(dataValue);
						}
						//sActive = COMMON.CheckBooleanField(dataValue);
					}
					//COMMON.Log('9840 sActive '+sActive);
					var OptionGroupView = TableViewBasicUIObj.createBasicView(null, 'transparent', rowHeight, HeaderDetailsObj.columnWidth + '%', 0, 0, 0, 0, 'horizontal');
					OptionGroupView.left = dLeftPos + '%';
					//OptionGroupView.value = (dataValue == null || dataValue == undefined || dataValue == "" || dataValue == 0 || dataValue == "0" || dataValue == "false" || dataValue == false) ? 0 : 1;

					if (dataValue == null || dataValue == undefined || dataValue == "") {
						//COMMON.Log('10230 dataValue' +dataValue);
						OptionGroupView.value = "";
					} else {
						//COMMON.Log('10233 dataValue' +dataValue);
						OptionGroupView.value = (dataValue == null || dataValue == undefined || dataValue == 0 || dataValue == "0" || dataValue == "false" || dataValue == false) ? 0 : 1;
					}
					OptionGroupView.index = iIndex;
					OptionGroupView.backgroundColor = sRow_BG_Color;
					OptionGroupView.fieldControl = mFieldControl.name;
					OptionGroupView.DataMember = HeaderDetailsObj.DataMember.toUpperCase();
					OptionGroupView.DataMemberType = HeaderDetailsObj.DataMemberType.toUpperCase();
					OptionGroupView.iIndex = iIndex;
					OptionGroupView.left = dLeftPos + '%';
					OptionGroupView.top = dTopPos;
					OptionGroupView.defaultText = HeaderDetailsObj.defaultText;
					OptionGroupView.fieldName = HeaderDetailsObj.fieldName;
					OptionGroupView.columnWidth = HeaderDetailsObj.columnWidth;
					OptionGroupView.height = rowHeight;
					//OptionGroupView.defaultValue = (dataValue == null || dataValue == undefined || dataValue == "" || dataValue == 0 || dataValue == "0" || dataValue == "false" || dataValue == false) ? false : true;
					OptionGroupView.defaultValue = (dataValue == null || dataValue == undefined || dataValue == 0 || dataValue == "0" || dataValue == "false" || dataValue == false) ? false : true;
					if (dataValue == null || dataValue == undefined || dataValue == "") {
						//COMMON.Log('10251 dataValue' +dataValue);
						OptionGroupView.defaultValue = "";
					} else {
						//COMMON.Log('10254 dataValue' +dataValue);
						OptionGroupView.defaultValue = (dataValue == null || dataValue == undefined || dataValue == 0 || dataValue == "0" || dataValue == "false" || dataValue == false) ? 0 : 1;
					}

					OptionGroupView.dLineIndex = dLineIndex;
					if (bReadOnlyRow == true) {
						OptionGroupView.touchEnabled = false;
						OptionGroupView.editable = false;
						OptionGroupView.focusable = false;
					}

					var OptionGroupViewArr = [];

					var checkBox1 = new BasicCheckBox().createBasicCheckBox(0, HeaderDetailsObj.allignment);
					//if((sActive != '' && sActive == true) || sActive == ''){
					if (sActive === '') {
					} else if ((sActive != '' && (sActive == true || sActive == 'true'))) {
						//COMMON.Log('9875 '+sActive);
						sActive = true;
						OptionGroupView.value = 1;//true;
						checkBox1.value = true;//(dataValue == null || dataValue == undefined || dataValue == "" || dataValue == 0 || dataValue == "0" || dataValue == "false" || dataValue == false) ? false : true;
					}
					checkBox1.index = iIndex;
					checkBox1.backgroundColor = sRow_BG_Color;
					checkBox1.fieldControl = mFieldControl.name;
					checkBox1.DataMember = HeaderDetailsObj.DataMember.toUpperCase();
					checkBox1.DataMemberType = HeaderDetailsObj.DataMemberType.toUpperCase();
					checkBox1.iIndex = iIndex;
					checkBox1.title = 'Yes';
					checkBox1.color = HeaderDetailsObj.rowTextColor;// HeaderDetailsObj.rowTextColor, HeaderDetailsObj.rowBgColor,
					//checkBox1.left = dLeftPos + '%';
					//checkBox1.top = dTopPos;
					checkBox1.defaultText = HeaderDetailsObj.defaultText;
					checkBox1.fieldName = HeaderDetailsObj.fieldName;
					checkBox1.columnWidth = HeaderDetailsObj.columnWidth;
					//checkBox1.width = commonObj.tblColumnWidth + '%';
					//checkBox1.borderColor = '#e8e8e8';
					//checkBox1.borderWidth = 2;
					checkBox1.height = rowHeight;
					checkBox1.defaultValue = (dataValue == null || dataValue == undefined || dataValue == "" || dataValue == 0 || dataValue == "0" || dataValue == "false" || dataValue == false) ? false : true;
					checkBox1.dLineIndex = dLineIndex;
					checkBox1.OptionGroupView = OptionGroupView;
					checkBox1.OptionViewIndex = 0;
					//checkBox1.bubbleParent = false;
					if (Ti.Platform.name == 'android') {
						checkBox1.addEventListener('click', OptionGroupEvent);
					} else {
						checkBox1.addEventListener('change', OptionGroupEvent);
					}
					OptionGroupView.add(checkBox1);

					var checkBox2 = new BasicCheckBox().createBasicCheckBox(0, HeaderDetailsObj.allignment);
					//checkBox2.value = (dataValue == null || dataValue == undefined || dataValue == "" || dataValue == 0 || dataValue == "0" || dataValue == "false" || dataValue == false) ? false : true;
					//if(sActive != '' && sActive == false or sActive == 'false'){

					if (sActive != '' && (sActive == false || sActive == 'false')) {
						//COMMON.Log('9875 '+sActive);
						OptionGroupView.value = 0;//true;
						checkBox2.value = true;//(dataValue == null || dataValue == undefined || dataValue == "" || dataValue == 0 || dataValue == "0" || dataValue == "false" || dataValue == false) ? false : true;
					}

					if (sActive === '') {
					} else if (sActive == false || sActive == 'false') {
						//COMMON.Log('9875 '+sActive);
						OptionGroupView.value = 0;//true;
						checkBox2.value = true;//(dataValue == null || dataValue == undefined || dataValue == "" || dataValue == 0 || dataValue == "0" || dataValue == "false" || dataValue == false) ? false : true;
					}

					checkBox2.index = iIndex;
					checkBox2.backgroundColor = sRow_BG_Color;
					checkBox2.fieldControl = mFieldControl.name;
					checkBox2.DataMember = HeaderDetailsObj.DataMember.toUpperCase();
					checkBox2.DataMemberType = HeaderDetailsObj.DataMemberType.toUpperCase();
					checkBox2.iIndex = iIndex;
					checkBox2.title = 'No';
					checkBox2.color = HeaderDetailsObj.rowTextColor;// HeaderDetailsObj.rowTextColor, HeaderDetailsObj.rowBgColor,
					//checkBox2.left = dLeftPos + '%';
					//checkBox2.top = dTopPos;
					checkBox2.defaultText = HeaderDetailsObj.defaultText;
					checkBox2.fieldName = HeaderDetailsObj.fieldName;
					checkBox2.columnWidth = HeaderDetailsObj.columnWidth;
					//checkBox2.width = commonObj.tblColumnWidth + '%';
					//checkBox2.borderColor = '#e8e8e8';
					//checkBox2.borderWidth = 2;
					checkBox2.height = rowHeight;
					checkBox2.defaultValue = (dataValue == null || dataValue == undefined || dataValue == "" || dataValue == 0 || dataValue == "0" || dataValue == "false" || dataValue == false) ? false : true;
					checkBox2.dLineIndex = dLineIndex;
					checkBox2.OptionGroupView = OptionGroupView;
					checkBox2.OptionViewIndex = 1;
					//checkBox2.bubbleParent = false;
					if (Ti.Platform.name == 'android') {
						checkBox2.addEventListener('click', OptionGroupEvent);
					} else {
						checkBox2.addEventListener('change', OptionGroupEvent);
					}
					OptionGroupView.add(checkBox2);

					function OptionGroupEvent(e) {
						if (bGroupOptionChecking == true) {
							//COMMON.Log('bGroupOptionChecking ' +bGroupOptionChecking);
							bGroupOptionChecking = false;
							return false;
						}
						try {

							Ti.App.DETAILS.set('SYNC_SCREEN', 'APICALL');
							Ti.App.indicatorEventTriggered = false;
							COMMON.showCustIndicator("Please Wait...");

							Ti.App.columnClicked = e.source.DataMember;
							if (mView != null && mView != undefined) {
								mView.setselectedRowIndex(this.iIndex);
							}

							/*Ti.App.columnClicked = e.source.DataMember;
							if(mView != null && mView != undefined){
								mView.setselectedRowIndex(this.iIndex);
							}*/
							var sDefaultText = COMMON.CheckString(this.defaultText);
							//COMMON.Log('sDefaultText --> ' + sDefaultText);
							if (sDefaultText != '') {
								var arrOptions = sDefaultText.split(",");
								if (arrOptions.length > 0) {
									bGroupOptionChecking = true;
									for (var dGroupOptionCnt = 0; dGroupOptionCnt < arrOptions.length; dGroupOptionCnt++) {
										//COMMON.Log('this.fieldName : ' + this.fieldName + ' != arrOptions[dGroupOptionCnt] : ' + arrOptions[dGroupOptionCnt]);
										//COMMON.Log('GET ROW COMPONWNT : ' + arrOptions[dGroupOptionCnt] + ' : ' + ArrayOperations.prototype.getRowComponent(0, this.iIndex, arrOptions[dGroupOptionCnt]));
										try {
											if (this.fieldName != arrOptions[dGroupOptionCnt]) {
												ArrayOperations.prototype.getRowComponent(0, this.iIndex, arrOptions[dGroupOptionCnt]).value = false;
												//getRowComponent(sectionIndex, rowIndex, fieldName)
											}
										} catch (e) { }
									}
								}
							}
						} catch (e) {
							//COMMON.Log('10097 '+e);
						} finally {

							try {

								//bGroupOptionChecking = true;
								if (this.OptionViewIndex == 0) {
									if (this.value == true) {
										this.OptionGroupView.value = 1;//true;
										this.OptionGroupView.children[1].value = 0;//false;
									} else {
										this.OptionGroupView.value = 0;//false;
										this.OptionGroupView.children[1].value = 1;//true;
									}
								} else if (this.OptionViewIndex == 1) {
									if (this.value == true) {
										this.OptionGroupView.value = 0;//false;
										this.OptionGroupView.children[0].value = 0;//false;
									} else {
										this.OptionGroupView.value = 1;//true;
										this.OptionGroupView.children[0].value = 1;//true;
									}
								}
								//COMMON.Log('this.OptionViewIndex --> ' + this.OptionViewIndex + ' : this.OptionGroupView --> ' + this.OptionGroupView);
								//COMMON.Log('this.OptionViewIndex --> ' + this.OptionViewIndex + ' : this.OptionGroupView --> ' + this.OptionGroupView.children[0].value);
								//COMMON.Log('this.OptionViewIndex --> ' + this.OptionViewIndex + ' : this.OptionGroupView --> ' + this.OptionGroupView.children[1].value);
								//COMMON.Log('this.iIndex --> ' + this.iIndex + ' : this.defaultText --> ' + this.defaultText);


								/*try{
									if (COMMON.avoidMultipleClick()){
										return '';
									}
								}catch(e){}*/
								//COMMON.Log("10101 this.iIndex checkboxevent --> " + this.iIndex);
								mController.OptionGroupChanged(this.iIndex, this.value, this.fieldName);

							} catch (e) {
								//COMMON.Log('10112 '+e); 
							}

							//COMMON.sleep(1);
							COMMON.hideCustIndicator();
							Ti.App.DETAILS.set('SYNC_SCREEN', '');
							setTimeout(function () {
								bGroupOptionChecking = false;
							}, 100);
						}
					}
					vwRowHorizontal.add(OptionGroupView);
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
								if (Ti.version < '7.5.0') {
									//delete file;//17122018 SDK 7.5.0
								}
							} else {
								test = test.replace('png', 'simg');
								file = (bIsAndroid) ? Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, 'Photo', test) : Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'Photo', test);
								if (file.exists()) {
									var imgPath = file.nativePath;
									file = null;
									if (Ti.version < '7.5.0') {
										//delete file;//17122018 SDK 7.5.0
									}
								} else {
									file = null;
									if (Ti.version < '7.5.0') {
										//delete file;//17122018 SDK 7.5.0
									}
									if (test != '') {
										var imgPath = Ti.App.ImageCacheObj.getImage('MobileSalesCache', test);
									} else {
										var imgPath = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'camdisplay.simg');//'/images/camdisplay.simg';
									}
								}
							}
							file = null;
							if (Ti.version < '7.5.0') {
								//delete file;//17122018 SDK 7.5.0
							}
						} catch (e) {
							var imgPath = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'camdisplay.simg');//'/images/camdisplay.simg';
						}
					} else {
						var imgPath = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'camdisplay.simg');//'/images/camdisplay.simg';
					}
					var ImgCtrlView = TableViewBasicUIObj.createBasicView(null, 'transparent', rowHeight, HeaderDetailsObj.columnWidth + '%', 0, 0, 0, 0, '');
					ImgCtrlView.iIndex = iIndex;
					ImgCtrlView.left = dLeftPos + '%';
					ImgCtrlView.top = dTopPos;
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
					img.bubbleParent = false;
					ImgCtrlView.top = dTopPos;
					if (HeaderDetailsObj.allignment == 0) {
						ImgCtrlView.layout = 'vertical';
					} else if (HeaderDetailsObj.allignment == 1) {
						img.right = 1;//2;
					} else if (HeaderDetailsObj.allignment == 2) {
						img.left = 1;//2;
					}
					if (bReadOnlyRow == true) {
						img.touchEnabled = false;
						img.editable = false;
						img.focusable = false;
					}
					img.addEventListener('click', function (e) {
						try {
							if (Ti.App.bFocusedTxtfield != null && Ti.App.bFocusedTxtfield != undefined) {
								Ti.App.bFocusedTxtfield.blur();
								Ti.App.bFocusedTxtfield = null;
								return;
							}

							if (mView != null && mView != undefined) {
								mView.setselectedRowIndex(this.iIndex);
							}
							var qry = "SELECT * FROM ActionConfig WHERE Actionname = 'CameraIconClicked' and ScreenName=" + Ti.App.SQL.safeSQL(e.source.screenName) + " and FieldName = " + Ti.App.SQL.safeSQL(e.source.fieldName) + " and (ifnull(Access,'') ='' OR Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel) + ") ORDER By ActionName, DisplayNo";
							//COMMON.Log('qry ---> ' + qry);
							var dbDataRows = Ti.App.configDBConn.execute(qry);
							if (dbDataRows.isValidRow()) {
								dbDataRows.close();
								//db.close();	
								mController.CameraIconClicked(this, e.source.fieldName);
								return false;
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
								if (Ti.version < '7.5.0') {
									//delete file;//17122018 SDK 7.5.0
								}
							} else {
								test = test.replace('png', 'simg');
								file = (bIsAndroid) ? Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, 'Photo', test) : Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'Photo', test);
								if (file.exists()) {
									var imgPath = file.nativePath;
									file = null;
									if (Ti.version < '7.5.0') {
										//delete file;//17122018 SDK 7.5.0
									}
								} else {
									file = null;
									if (Ti.version < '7.5.0') {
										//delete file;//17122018 SDK 7.5.0
									}
									bImgFound = false;
									var imgPath = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'camdisplay.simg');//'/images/camdisplay.simg';
								}
							}
							file = null;
							if (Ti.version < '7.5.0') {
								//delete file;//17122018 SDK 7.5.0
							}
						} catch (e) {
							bImgFound = false;
							var imgPath = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'camdisplay.simg');//'/images/camdisplay.simg';
						}
					} else {
						bImgFound = false;
						var imgPath = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'camdisplay.simg');//'/images/camdisplay.simg';
					}
					var ImgCtrlView = TableViewBasicUIObj.createBasicView(null, 'transparent', rowHeight, HeaderDetailsObj.columnWidth + '%', 0, 0, 0, 0, '');
					ImgCtrlView.iIndex = iIndex;
					ImgCtrlView.left = dLeftPos + '%';
					ImgCtrlView.top = dTopPos;
					//var img = new BasicImageView().createImageView(null, Ti.App.ImageCacheObj.getImage('MobileSalesCache', test), formdata.dValueWidth * pWidth, formdata.ValueHeight);
					//P&G
					var img = new BasicImageView().createImageView(null, imgPath, 'auto', 'auto');//formdata.dValueWidth * pWidth, formdata.ValueHeight);
					//var img = new BasicImageView().createImageView(null, Ti.App.ImageCacheObj.getImage('MobileSalesCache', formdata.DefaultValue), 'auto', 'auto');
					//var img = TableViewBasicUIObj.createBasicView(null, 'transparent', 'auto', 'auto', 0, 0, 0, 0, '');
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
					if (bReadOnlyRow == true) {
						img.touchEnabled = false;
						img.editable = false;
						img.focusable = false;
					}
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
							//COMMON.Log('this.bImgFound : ' + this.bImgFound);
							//mController.showCamera(this, e.source.fieldName);
							if (this.bImgFound == false) {

								if (mView != null && mView != undefined) {
									mView.setselectedRowIndex(this.iIndex);
								}
								var qry = "SELECT * FROM ActionConfig WHERE Actionname = 'CameraIconClicked' and ScreenName=" + Ti.App.SQL.safeSQL(e.source.screenName) + " and FieldName = " + Ti.App.SQL.safeSQL(e.source.fieldName) + " and (ifnull(Access,'') ='' OR Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel) + ") ORDER By ActionName, DisplayNo";
								//COMMON.Log('qry ---> ' + qry);
								var dbDataRows = Ti.App.configDBConn.execute(qry);
								if (dbDataRows.isValidRow()) {
									dbDataRows.close();
									//db.close();	
									mController.CameraIconClicked(this, e.source.fieldName);
									return false;
								}

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
								if (Ti.version < '7.5.0') {
									//delete file;//17122018 SDK 7.5.0
								}
							} else {
								test = test.replace('png', 'simg');
								file = (bIsAndroid) ? Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, 'Photo', test) : Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'Photo', test);
								if (file.exists()) {
									var imgPath = file.nativePath;
									file = null;
									if (Ti.version < '7.5.0') {
										//delete file;//17122018 SDK 7.5.0
									}
								} else {
									file = null;
									if (Ti.version < '7.5.0') {
										//delete file;//17122018 SDK 7.5.0
									}
									bImgFound = false;
									var imgPath = '/images/Thumbnail_Icon.png';
								}
							}
							file = null;
							if (Ti.version < '7.5.0') {
								//delete file;//17122018 SDK 7.5.0
							}
						} catch (e) {
							bImgFound = false;
							var imgPath = '/images/Thumbnail_Icon.png';
						}
					} else {
						bImgFound = false;
						var imgPath = '/images/Thumbnail_Icon.png';
					}
					var ImgCtrlView = TableViewBasicUIObj.createBasicView(null, 'transparent', rowHeight, HeaderDetailsObj.columnWidth + '%', 0, 0, 0, 0, '');
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
					if (bReadOnlyRow == true) {
						img.touchEnabled = false;
						img.editable = false;
						img.focusable = false;
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
					if (bReadOnlyRow == true) {
						img.touchEnabled = false;
						img.editable = false;
						img.focusable = false;
					}
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
										var ImageFactory = require('ti.imagefactory');
							         	image = ImageFactory.compress(image, 0.25);
							         	
										var file = null;
										/*if (bIsAndroid) {
											var folder = Titanium.Filesystem.getFile('file:///mnt/sdcard/com.simplrsales', 'Photo');
											//COMMON.Log('folder.nativePath ---> ' + folder.nativePath);
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
									//COMMON.Log('Cancelled ');
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

					if (bReadOnlyRow == true) {
						checkBox.touchEnabled = false;
						checkBox.editable = false;
						checkBox.focusable = false;
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
								//COMMON.Log('bflagOption --> ' + bflagOption);
								//COMMON.Log('this.defaultValue ---> ' + this.defaultValue);
								if (!bflagOption) {// && bflagOption != ''){
									this.value = this.defaultValue;
									return false;
								}
								if (COMMON.avoidMultipleClick()) {
									return '';
								}
							} catch (e) { }
							//COMMON.Log("this.iIndex checkboxevent --> " + this.iIndex);
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
					//COMMON.Log('BUTTON : HeaderDetailsObj.columnWidth : ' + HeaderDetailsObj.columnWidth);
					//var rowButton = commonObj.BasicButtonObj.createButton('', iIconWidth-1 , iIconHeight-4, null, '#e8e8e8');
					//var rowButton = commonObj.BasicButtonObj.createButton(' + ', 40 , 40, null, '#e8e8e8');

					var test = (dataValue == null || dataValue == undefined || dataValue == '') ? formdata.DefaultValue : dataValue;
					test = (test == null || test == undefined || test == '') ? 'Standard' : test;

					var rowButton = commonObj.BasicButtonObj.createButton(test, 80 * Ti.App.dHeightRatio, 50 * Ti.App.dHeightRatio, HeaderDetailsObj.fontSize, '#e8e8e8');
					//var rowButton = commonObj.BasicButtonObj.createButton(test, rowHeight-4, HeaderDetailsObj.columnWidth + '%',HeaderDetailsObj.fontSize, '#e8e8e8');

					if (HeaderDetailsObj.columnWidth == 0) {
						rowButton.width = 0;
					}
					rowButton.fieldControl = mFieldControl.name;
					rowButton.iIndex = iIndex;
					rowButton.DataMember = HeaderDetailsObj.DataMember.toUpperCase();
					rowButton.DataMemberType = HeaderDetailsObj.DataMemberType.toUpperCase();
					rowButton.fieldName = HeaderDetailsObj.fieldName;
					rowButton.left = dLeftPos + '%';
					rowButton.top = dTopPos + 2;
					rowButton.bubbleParent = false;
					if (bReadOnlyRow == true) {
						rowButton.touchEnabled = false;
						rowButton.editable = false;
						rowButton.focusable = false;
					}
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
					if (bReadOnlyRow == true) {
						rowButton.touchEnabled = false;
						rowButton.editable = false;
						rowButton.focusable = false;
					}
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
					if (bReadOnlyRow == true) {
						rowButton.touchEnabled = false;
						rowButton.editable = false;
						rowButton.focusable = false;
					}
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
					var rowButton = commonObj.BasicButtonObj.createButton('', 40 * Ti.App.dHeightRatio, 40 * Ti.App.dHeightRatio, null, 'transparent');
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
					if (bReadOnlyRow == true) {
						rowButton.touchEnabled = false;
						rowButton.editable = false;
						rowButton.focusable = false;
					}
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
							//var ImgCtrlView = TableViewBasicUIObj.createBasicView(null, 'transparent', Ti.UI.SIZE, 'auto', 0, 0, null, null, 'horizontal');
							var ImgCtrlView = TableViewBasicUIObj.createBasicView(null, 'transparent', rowHeight, HeaderDetailsObj.columnWidth + '%', 0, 0, 0, 0, '');
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
							if (bReadOnlyRow == true) {
								ImgCtrlView.touchEnabled = false;
								ImgCtrlView.editable = false;
								ImgCtrlView.focusable = false;
							}
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
							var ImgCtrlView = TableViewBasicUIObj.createBasicView(null, 'transparent', (rowHeight* 0.90), (commonObj.tblColumnWidth * 0.90) + '%', 0, 0, 0, 0, 'vertical');
							ImgCtrlView.left = dLeftPos+ (commonObj.tblColumnWidth * 0.05) +'%';//0;
								if (dLineIndex == 1) {
								ImgCtrlView.top = dTopPos + (rowHeight* 0.05) + 5;
								} else {
									ImgCtrlView.top = dTopPos - 3;
								}
							ImgCtrlView.borderRadius = 8;
							ImgCtrlView.backgroundColor = '#ffffff';
								//COMMON.Log(' columnWidth  : (' + HeaderDetailsObj.columnWidth  + ' * ' + widthRatio + ' *  100 / ' + headerListLength + ') - rowHeight : ' + rowHeight);
								//COMMON.Log(' WIDTH : ' + commonObj.tblColumnWidth + ' - rowHeight : ' + rowHeight);
								//var img = new BasicImageView().createImageView(null, Ti.App.ImageCacheObj.getImage('MobileSalesCache', dataValue), 'auto', 'auto'); //'auto',rowHeight);
								var img = new BasicImageView().createImageView(null, Ti.App.ImageCacheObj.getImage('MobileSalesCache', dataValue), 'auto', rowHeight);
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

								if (bReadOnlyRow == true) {
									ImgCtrlView.touchEnabled = false;
									ImgCtrlView.editable = false;
									ImgCtrlView.focusable = false;
								}

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
										var imgPath = "";
										imgPath = Ti.App.ImageCacheObj.getImage('MobileSalesCache', _item + ".jpg");
										if (COMMON.CheckBooleanField(Ti.App.ARRAYOPERATION.getSystemValue('CatalogImage'))) {
											imgPath = Ti.App.ImageCacheObj.getImage('MobileSalesCache', dataValue);
										}
										//COMMON.Log("imgPath "+imgPath);
										if (imgPath.indexOf('/images/') !== -1) {
											var imgPath = Ti.App.ImageCacheObj.getImage('MobileSalesCache', "NoImage.jpg");
										}
									} catch (e) {
										//COMMON.Log('imgPath error -> '+ e);
									}



									//COMMON.Log('imgPath -> '+imgPath );
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

								//EXPLISTVIEW
								var ImgCtrlView = TableViewBasicUIObj.createBasicView(null, 'transparent', rowHeight, HeaderDetailsObj.columnWidth + '%', 0, 0, 0, 0, '');
								ImgCtrlView.left = dLeftPos + '%';//0;
								ImgCtrlView.top = dTopPos + 3;
								ImgCtrlView.fieldControl = mFieldControl.name;
								ImgCtrlView.rowIndex = iIndex;
								ImgCtrlView.iIndex = iIndex;
								ImgCtrlView.DataMember = HeaderDetailsObj.DataMember.toUpperCase();
								ImgCtrlView.DataMemberType = HeaderDetailsObj.DataMemberType;
								ImgCtrlView.columnWidth = HeaderDetailsObj.columnWidth;
								ImgCtrlView.dLineIndex = dLineIndex;


								if (screenName.indexOf('EXPLISTVIEW') > -1) {
									var img = new BasicImageView().createImageView(null, imgPath, 'auto', rowHeight / 2); //'auto',rowHeight);
								} else {
									var img = new BasicImageView().createImageView(null, imgPath, 'auto', rowHeight); //'auto',rowHeight);
								}
								img.enableZoomControls = false;
								if (dataValue == 'camera.png') {
									img.height = rowHeight;
								}
								img.left = 0;//dLeftPos + '%';//0;
								img.top = dTopPos;
								if (screenName.indexOf('EXPLISTVIEW') > -1) {
									img.top = rowHeight / 4;
								}
								img.backgroundColor = sRow_BG_Color;//'transparent';
								img.fieldControl = mFieldControl.name;
								img.rowIndex = iIndex;
								img.iIndex = iIndex;
								img.DataMember = HeaderDetailsObj.DataMember.toUpperCase();
								img.DataMemberType = HeaderDetailsObj.DataMemberType;
								img.columnWidth = HeaderDetailsObj.columnWidth;
								img.dLineIndex = dLineIndex;
								ImgCtrlView.add(img);

							/*	img.addEventListener('touchstart', function (e) {
									//mView.disabledFormScrollView();
								});
								if (bReadOnlyRow == true) {
									img.touchEnabled = false;
									img.editable = false;
									img.focusable = false;
								}
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
								});*/

								if (bReadOnlyRow == true) {
									ImgCtrlView.touchEnabled = false;
									ImgCtrlView.editable = false;
									ImgCtrlView.focusable = false;
								}

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
								


								//vwRowHorizontal.add(img);
							}
						}
					} catch (e) { }
				} else if (mFieldControl.name == 'IMAGEWITHPREVIEW') {
					var imgPathArr = [];
					try {
						if (dataValue == "unreadMsg.simg" || dataValue == "unreadMsg.png") {
							//var ImgCtrlView = TableViewBasicUIObj.createBasicView(null, 'transparent', Ti.UI.SIZE, 'auto', 0, 0, null, null, 'horizontal');
							var ImgCtrlView = TableViewBasicUIObj.createBasicView(null, 'transparent', rowHeight, HeaderDetailsObj.columnWidth + '%', 0, 0, 0, 0, '');
							ImgCtrlView.left = dLeftPos + '%';//0;
						ImgCtrlView.top = dTopPos + (rowHeight* 0.05) + 3;
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
							//if(dLineIndex > 0){
							var ImgCtrlView = TableViewBasicUIObj.createBasicView(null, 'transparent', rowHeight, (commonObj.tblColumnWidth * 0.90) + '%', 0, 0, 0, 0, 'vertical');
							//ImgCtrlView.left = dLeftPos+'%';//0;
							ImgCtrlView.left = dLeftPos+ (commonObj.tblColumnWidth * 0.05) +'%';//0;
							//if(dLineIndex == 1){
							//ImgCtrlView.top = dTopPos + 5;
							//}else{
							//ImgCtrlView.top = dTopPos-3;
							//}
							ImgCtrlView.borderRadius = 8;
							ImgCtrlView.backgroundColor = '#ffffff';
							
							ImgCtrlView.top = dTopPos;
							//COMMON.Log(' columnWidth  : (' + HeaderDetailsObj.columnWidth  + ' * ' + widthRatio + ' *  100 / ' + headerListLength + ') - rowHeight : ' + rowHeight);
							//COMMON.Log(' WIDTH : ' + commonObj.tblColumnWidth + ' - rowHeight : ' + rowHeight);
							var img = new BasicImageView().createImageView(null, Ti.App.ImageCacheObj.getImage('MobileSalesCache', dataValue), 'auto', 'auto'); //'auto',rowHeight);
							img.enableZoomControls  = false;
							ImgCtrlView.layout = 'vertical';
							/*if(HeaderDetailsObj.allignment ==  0){
								ImgCtrlView.layout = 'vertical';
							}else if(HeaderDetailsObj.allignment ==  1){
								img.right = 1;//2;
							}else if(HeaderDetailsObj.allignment ==  2){
								img.left = 1;//2;
							}*/
							if( dataValue == 'camera.png' ){
								img.height = rowHeight;			
							}
							img.backgroundColor = sRow_BG_Color;//'transparent';
							img.fieldControl = mFieldControl.name;
							img.rowIndex = iIndex;
							img.iIndex = iIndex;
							img.DataMember = HeaderDetailsObj.DataMember.toUpperCase();
							img.DataMemberType = HeaderDetailsObj.DataMemberType;
							img.columnWidth = HeaderDetailsObj.columnWidth;
							img.dLineIndex = dLineIndex;
							img.dataValue = dataValue;
							img.fieldName = HeaderDetailsObj.fieldName;

							ImgCtrlView.add(img);

							ImgCtrlView.fieldControl = mFieldControl.name;
							ImgCtrlView.rowIndex = iIndex;
							ImgCtrlView.iIndex = iIndex;
							ImgCtrlView.DataMember = HeaderDetailsObj.DataMember.toUpperCase();
							ImgCtrlView.DataMemberType = HeaderDetailsObj.DataMemberType;
							ImgCtrlView.fieldName = HeaderDetailsObj.fieldName;
							ImgCtrlView.columnWidth = HeaderDetailsObj.columnWidth;
							ImgCtrlView.bubbleParent = false;

							if (bReadOnlyRow == true) {
								ImgCtrlView.touchEnabled = false;
								ImgCtrlView.editable = false;
								ImgCtrlView.focusable = false;
							}
							ImgCtrlView.addEventListener('touchstart', function (e) {								
								Ti.App.columnClicked = e.source.fieldName;
								//COMMON.Log("touchstart ");
								//COMMON.Log("e.source.dataValue --> " + e.source.dataValue);
								//mView.disabledFormScrollView();
								try {
									imgPathArr = [];
									var file = (bIsAndroid) ? Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, '/Images/' + e.source.dataValue) : Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, e.source.dataValue);
									//COMMON.Log("file.exists() --> " + file.exists());
									if (file.exists()) {
										//COMMON.Log("file.nativePath --> " + file.nativePath);
										var imgPath = file.nativePath;
										file = null;
										imgPathArr.push(imgPath);
									} else {
										/*var imgPath = '/images/' + e.source.dataValue;
										file = null;
										file = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, imgPath);
										imgPathArr.push(file.nativePath);*/
									}
									
									imgPathArr = [];
									var sItemNo = e.source.dataValue;
									//COMMON.Log('sItemNo1 -> '+sItemNo);
									sItemNo = (sItemNo == null || sItemNo == undefined || sItemNo == '') ? '' : sItemNo;
									//COMMON.Log('sItemNo2 -> '+sItemNo);
									if (sItemNo != '') {
										//COMMON.Log('sItemNo3 -> '+sItemNo);
										sItemNo = sItemNo.replace("/Items/", "");
										//COMMON.Log('sItemNo4 -> '+sItemNo);
										sItemNo = sItemNo.replace(".simg", "");
										//COMMON.Log('sItemNo5 -> '+sItemNo);
										sItemNo = sItemNo.replace(".png", "");
										//COMMON.Log('sItemNo6 -> '+sItemNo);
										sItemNo = sItemNo.replace(".jpg", "");
										//COMMON.Log('sItemNo7 -> '+sItemNo);
										var arr = sItemNo.split("_");
										//sItemNo = arr[0]; 
										if (arr.length >= 1) {
											sItemNo = arr[0];
										}
										//COMMON.Log('sItemNo8 -> '+sItemNo);
										file = null;

										if (Ti.Platform.name === 'android') {
											dir = Titanium.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, '/Images/Items/');
										} else {
											dir = Titanium.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, '/Images/Items/');
										}
										var dirItems = [];
										if (dir.exists()) {
											dirItems = dir.getDirectoryListing();
										}

										//COMMON.Log('dirItems -> '+dirItems.length);	
										var imgArr = [];
										for (i = 0; i < dirItems.length; i++) {
											//COMMON.Log(i+'-dirItems[i] -> '+dirItems[i]);			
											if (dirItems[i].indexOf(sItemNo) >= 0 || dirItems[i].indexOf(sItemNo + "##") >= 0 || dirItems[i].indexOf(sItemNo + "@@") >= 0) {
												imgArr.push(dirItems[i]);
											}
										}

										//imgArr.push(sItemNo+".jpg");
										////COMMON.Log(JSON.stringify("ServiceImage's =>"+imgArr));

										try {											
											if (imgArr.length > 0) {
												for (ctr = 0; ctr < imgArr.length; ctr++) {
													imageName = imgArr[ctr];
													if (Ti.Platform.name === 'android') {
														//file = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, 'Items', imageName);
														file = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, '/Images/Items', imageName);
													} else {
														//file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'Items', imageName);
														file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, '/Images/Items', imageName);
													}

													if (file.exists()) {
														file.read();
														imgPathArr.push(file.nativePath);
														//_this.imgPath = file.nativePath;
													}
												}
											}											
											if (imgArr.length > 0) {
												for (ctr = 0; ctr < imgArr.length; ctr++) {
													imageName = imgArr[ctr];
													if (Ti.Platform.name === 'android') {
														//file = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, 'Items', imageName);
														file = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, '/Photo/', imageName);
													} else {
														//file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'Items', imageName);
														file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, '/Photo/', imageName);
													}

													if (file.exists()) {
														file.read();
														imgPathArr.push(file.nativePath);
														//_this.imgPath = file.nativePath;
													}
												}
											} else {
												file = null;

												if (Ti.Platform.name === 'android') {
													dir = Titanium.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, '/Images/');
												} else {
													dir = Titanium.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, '/Images/');
												}

												dirItems = dir.getDirectoryListing();
												//COMMON.Log('dirItems -> '+dirItems.length);	
												var imgArr = [];
												for (i = 0; i < dirItems.length; i++) {
													//COMMON.Log(i+'-dirItems[i] -> '+dirItems[i]);			
													if (dirItems[i].indexOf(sItemNo) >= 0 || dirItems[i].indexOf(sItemNo + "##") >= 0 || dirItems[i].indexOf(sItemNo + "@@") >= 0) {
														imgArr.push(dirItems[i]);
													}
												}

												for (ctr = 0; ctr < imgArr.length; ctr++) {
													imageName = imgArr[ctr];
													if (Ti.Platform.name === 'android') {
														file = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, '/Images', imageName);
													} else {
														file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, '/Images', imageName);
													}

													if (file.exists()) {
														file.read();
														imgPathArr.push(file.nativePath);
														//_this.imgPath = file.nativePath;
													}
												}


												//This for Photo Dir check 
												if (imgArr.length > 0) {
													//Nothing update.
												}else{
													//COMMON.Log('Touchstrat4');												
													file = null;

													if (Ti.Platform.name === 'android') {
														dir = Titanium.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, '/Photo/');
													} else {
														dir = Titanium.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, '/Photo/');
													}

													dirItems = dir.getDirectoryListing();
													//COMMON.Log('dirItems -> '+dirItems.length);	
													var imgArr = [];
													for (i = 0; i < dirItems.length; i++) {
														//COMMON.Log(i+'-dirItems[i] -> '+dirItems[i]);			
														if (dirItems[i].indexOf(sItemNo) >= 0 || dirItems[i].indexOf(sItemNo + "##") >= 0 || dirItems[i].indexOf(sItemNo + "@@") >= 0) {
															imgArr.push(dirItems[i]);
														}
													}

													for (ctr = 0; ctr < imgArr.length; ctr++) {
														imageName = imgArr[ctr];														
														if (Ti.Platform.name === 'android') {
															file = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, '/Photo', imageName);
														} else {
															file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, '/Photo', imageName);
														}

														if (file.exists()) {
															file.read();
															imgPathArr.push(file.nativePath);
															//_this.imgPath = file.nativePath;
														}
													}
											    }
											}
										} catch (e) {
											//COMMON.Log(e);
										}
									}
									if (imgPathArr.length > 0) {
										var imgArr = [];
										//imgArr.push(dirItems[i]);						
										obj = {};
										obj.sArrItems = imgArr;
										obj.sImagePathArr = imgPathArr;
										//COMMON.Log("imgPathArr1 "+imgPathArr);
										obj.index = 0;
										//COMMON.Log("Gallery Screen");
										Ti.App.sItemNo = '';
										Ti.App.bEnableAndroidBackButton = false;
										var BasicPopUp = require('/BaseComponents/PreviewPopupGallery');
										new BasicPopUp().show('Preview', this, obj, imgPathArr);
									}
								} catch (e) {
									//COMMON.Log("ErrorIMG "+e);

								}

							});
							ImgCtrlView.addEventListener('touchend', function (e) {
								//mView.enabledFormScrollView();
							});
							ImgCtrlView.addEventListener('click', function (e) {

								//COMMON.Log("click ");


								try {
									if (mView != null && mView != undefined) {
										mView.setselectedRowIndex(e.source.iIndex);
									}
									mController.tblRowImagePressed(this, e.source.DataMember, e.source.iIndex);
								} catch (e) {
									//COMMON.Log("error "+e);
								}
							});
							vwRowHorizontal.add(ImgCtrlView);
							/*}else{
								var imgPath = Ti.App.ImageCacheObj.getImage('MobileSalesCache', dataValue);
								var img = new BasicImageView().createImageView(null, imgPath, 'auto', rowHeight); //'auto',rowHeight);
								img.enableZoomControls = false;
								if( dataValue == 'camera.png' ){
									img.height = rowHeight;			
								}
								img.left = dLeftPos+'%';//0;
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
								img.addEventListener('touchstart',function(e){
									//mView.disabledFormScrollView();																
								});
								img.addEventListener('touchend',function(e){
									//mView.enabledFormScrollView();
								});
								img.addEventListener('click', function(e){
									imgPathArr = [];							
										try{									
										var file = (bIsAndroid) ? Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory,e.source.dataValue) : Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,e.source.dataValue);
										if (file.exists()) {
											var imgPath = file.nativePath;
											file = null;
											imgPathArr.push(imgPath);
										}else{
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
										//COMMON.Log("imgPathArr1 "+imgPathArr);
										obj.index = 0;
										//COMMON.Log("Gallery Screen");
										Ti.App.sItemNo = '';
										Ti.App.bEnableAndroidBackButton = false;	
										var BasicPopUp = require('/BaseComponents/PreviewPopupGallery');
										new BasicPopUp().show('Preview', this, obj,imgPathArr);
											
											if(mView != null && mView != undefined){
												mView.setselectedRowIndex(e.source.iIndex);
											}
											mController.tblRowImagePressed(this, e.source.DataMember, e.source.iIndex);
									}catch(e){}
								});
								vwRowHorizontal.add(img);
							}*/
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
						if (bReadOnlyRow == true) {
							toggleBtn.touchEnabled = false;
							toggleBtn.editable = false;
							toggleBtn.focusable = false;
						}
						toggleBtn.addEventListener('click', function (e) {
							try {
								//COMMON.Log("Before : Flag ----> " + flag);
								//COMMON.Log("RowIndex --> " + e.source.iIndex);
								if (mView != null && mView != undefined) {
									mView.setselectedRowIndex(e.source.iIndex);
								}
								if (flag == 0 || flag == '0' || flag == null || flag == '' || flag == undefined) {
									e.source.image = toggleOn;
									e.source.switchValue = true;
									e.source.text = 1;
									flag = 1;
									//COMMON.Log("On");
									//COMMON.Log("After : Flag ----> " + flag);
									try {
										mController.toggleBtnChanged(e.source.iIndex, true, this, e.source.DataMember);
									} catch (e) { }
								} else {
									e.source.image = toggleOff;
									e.source.switchValue = false;
									e.source.text = 0;
									flag = 0;
									//COMMON.Log("Off");
									//COMMON.Log("After : Flag ----> " + flag);
									try {
										mController.toggleBtnChanged(e.source.iIndex, false, this, e.source.DataMember);
									} catch (e) { }
								}
							} catch (e) { }
						});
						vwRowHorizontal.add(toggleBtn);
					} catch (e) { }
				} else if (mFieldControl.name == 'MULTILINE') {
					//COMMON.Log('MULTILINE');
					//if(screenName.toUpperCase() == 'CATALOG'){
					//var sRowMultiLineView = TableViewBasicUIObj.createBasicView(null, 'transparent', (120 * Ti.App.dHeightRatio), commonObj.tblColumnWidth + '%', 0, 0, null, null, 'vertical');
					//}else{
					var sRowMultiLineView = TableViewBasicUIObj.createBasicView(null, 'transparent', (100 * Ti.App.dHeightRatio), commonObj.tblColumnWidth + '%', 0, 0, null, null, 'vertical');
					//}    
					sRowMultiLineView.borderWidth = 1;
					sRowMultiLineView.left = dLeftPos + '%';
					sRowMultiLineView.top = dTopPos;
					var label = null;
					var sListFieldName = HeaderDetailsObj.fieldName;
					var sListFieldNameArr = sListFieldName.split("##");
					var sListFieldNameArrlength = sListFieldNameArr.length;
					for (var _i = 0; _i < sListFieldNameArrlength; _i++) {

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
				//COMMON.Log(e);
			}
		}
		//COMMON.Log('CreateUI LINENO - 9527 : ' + new Date().getTime());
		row.add(vwRowHorizontal);
		//COMMON.Log('LoadData CreateUI End Time : ' + new Date().getTime());
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
	},
	createPaginatedUI: function (screenName, iIndex, item) {
	},
	createFormUI: function (controller, iIndex, item) {
	},
	getListData: function () {
		MultiArray = new Array();
		COMMON.showIndicator('Saving Please Wait...');
		var totalPages = Ti.App.currentTable.data.length;
		var pageTotIndex = 0;
		for (var pageIndex = 0; pageIndex < totalPages; pageIndex++) {
			if (pageIndex == 0) {
				//pageTotIndex = (parseInt(totalPages) * parseInt(Ti.App.currentTable.data[pageIndex].rowCount));
			} else {
				pageTotIndex += (parseInt(Ti.App.currentTable.data[pageIndex].rowCount));
			}
			//var pageCounter = (pageIndex * Ti.App.currentTable.data[pageIndex].rowCount);
			var length = Ti.App.currentTable.data[pageIndex].rowCount;
			var fieldName = '', field = '', value = '';

			var HeaderDetailslength = HeaderDetails.length;
			for (var index = 0; index < length; index++) {
				MultiArray[(pageTotIndex + index)] = new Array();
				for (var ctr = 0; ctr < HeaderDetailslength; ctr++) {
					fieldName = HeaderDetails[ctr].fieldName;
					field = Ti.App.currentTable.data[pageIndex].rows[index].children[0].children[ctr];
					value = field.text;
					if (field.fieldControl == 'TEXTBOX' || field.fieldControl == 'EDITABLETEXTBOX') {
						value = field.value;
					}
					MultiArray[(pageTotIndex + index)][ctr] = '' + value;
				}
			}
		}
		COMMON.hideIndicator();
		return MultiArray;
	},
	getFormData: function () {
		return formDataArray;
	},
	loadSavedData: function (screenName) {
		//return Titanium.App.Properties.getList('SavedData_' + screenName);
	},
	createNewRow: function (controller) {
	},
	updateNewRow: function (fieldName, value) {
		fieldName = fieldName.toUpperCase();
		if (fieldNames.indexOf(fieldName) > -1) {
			if (Ti.App.currentRow.children[0].children[fieldNames.indexOf(fieldName)].fieldControl == 'TEXTBOX' || Ti.App.currentRow.children[0].children[fieldNames.indexOf(fieldName)].fieldControl == 'EDITABLETEXTBOX') {
				Ti.App.currentRow.children[0].children[fieldNames.indexOf(fieldName)].value = value;
			} else {
				Ti.App.currentRow.children[0].children[fieldNames.indexOf(fieldName)].text = value;
			}
		}
	},
	updateColumnData: function (sectionIndex, rowIndex, fieldName, mText) {
		fieldName = fieldName.toUpperCase();
		try {
			if (fieldNames.indexOf(fieldName) > -1) {
				rowObj = Ti.App.currentTable.data[sectionIndex].rows;
				if (rowObj[rowIndex].children[0].children[fieldNames.indexOf(fieldName)].fieldControl == 'TEXTBOX' || rowObj[rowIndex].children[0].children[fieldNames.indexOf(fieldName)].fieldControl == 'EDITABLETEXTBOX' || rowObj[rowIndex].children[0].children[fieldNames.indexOf(fieldName)].fieldControl == 'DISABLEDOPTION'  || rowObj[rowIndex].children[0].children[fieldNames.indexOf(fieldName)].fieldControl == 'OPTION' || rowObj[rowIndex].children[0].children[fieldNames.indexOf(fieldName)].fieldControl == 'COMBOBOX') {
					rowObj[rowIndex].children[0].children[fieldNames.indexOf(fieldName)].value = mText;
					if(rowObj[rowIndex].children[0].children[fieldNames.indexOf(fieldName)].fieldControl == 'EDITABLETEXTBOX')
					{
						try{
							rowObj[rowIndex].children[0].children[fieldNames.indexOf(fieldName)].dPreValue = mText;
						}catch(e){
							//COMMON.Log('Updatecolumndata :'+e);
						}
						
					}
					if (rowObj[rowIndex].children[0].children[fieldNames.indexOf(fieldName)].fieldControl == 'COMBOBOX') {
						try {
							rowObj[rowIndex].children[0].children[fieldNames.indexOf(fieldName)].code = mText;
							//srowObj[rowIndex].children[0].children[fieldNames.indexOf(fieldName)].text = mText;
						} catch (e) { }
					}

					if (Ti.version >= '7.5.0') {
						//rowObj[rowIndex].children[0].children[fieldNames.indexOf(fieldName)].fireEvent('change');//7.5.0
					}
				} else {
					rowObj[rowIndex].children[0].children[fieldNames.indexOf(fieldName)].text = mText;
				}
			}
		} catch (e) {
			//COMMON.Log(e);
		} finally {
			return true;
		}
	},
	updateGivenDataColumnData: function (givenData, sectionIndex, rowIndex, fieldName, mText) {
		fieldName = fieldName.toUpperCase();
		try {
			if (fieldNames.indexOf(fieldName) > -1) {
				rowObj = givenData[sectionIndex].rows;
				if (rowObj[rowIndex].children[0].children[fieldNames.indexOf(fieldName)].fieldControl == 'TEXTBOX' || rowObj[rowIndex].children[0].children[fieldNames.indexOf(fieldName)].fieldControl == 'EDITABLETEXTBOX' || rowObj[rowIndex].children[0].children[fieldNames.indexOf(fieldName)].fieldControl == 'OPTION') {
					rowObj[rowIndex].children[0].children[fieldNames.indexOf(fieldName)].value = mText;
					if (rowObj[rowIndex].children[0].children[fieldNames.indexOf(fieldName)].fieldControl == 'COMBOBOX') {
						try {
							rowObj[rowIndex].children[0].children[fieldNames.indexOf(fieldName)].code = mText;
						} catch (e) { }
					}
					if (Ti.version >= '7.5.0') {
						//rowObj[rowIndex].children[0].children[fieldNames.indexOf(fieldName)].fireEvent('change');//7.5.0
					}
				} else {
					rowObj[rowIndex].children[0].children[fieldNames.indexOf(fieldName)].text = mText;
				}
			}
		} catch (e) {
			//COMMON.Log(e);
		} finally {
			return true;
		}
	},
	updateCurrentRow: function (fieldName, mText) {
		fieldName = fieldName.toUpperCase();
		if (fieldNames.indexOf(fieldName) > -1) {
			if (Ti.App.currentRow.children[0].children[fieldNames.indexOf(fieldName)].fieldControl == 'TEXTBOX' || Ti.App.currentRow.children[0].children[fieldNames.indexOf(fieldName)].fieldControl == 'EDITABLETEXTBOX') {
				Ti.App.currentRow.children[0].children[fieldNames.indexOf(fieldName)].value = mText;
				if (Ti.version >= '7.5.0') {
					//Ti.App.currentRow.children[0].children[fieldNames.indexOf(fieldName)].fireEvent('change');//7.5.0
				}
			} else {
				Ti.App.currentRow.children[0].children[fieldNames.indexOf(fieldName)].text = mText;
			}
		}
	},
	getCurrentRowComponent: function (fieldName) {
		fieldName = fieldName.toUpperCase();
		if (fieldNames.indexOf(fieldName) > -1) {
			return Ti.App.currentRow.children[0].children[fieldNames.indexOf(fieldName)];
		}
		return null;
	},
	getRowComponent: function (sectionIndex, rowIndex, fieldName) {
		fieldName = fieldName.toUpperCase();
		try {
			if (fieldNames.indexOf(fieldName) > -1) {
				return Ti.App.currentTable.data[sectionIndex].rows[rowIndex].children[0].children[fieldNames.indexOf(fieldName)];
			}
		} catch (e) {
			//COMMON.Log('getRowComponent --> ' + sectionIndex + ' : ' + rowIndex + ' : ' + fieldName + ' : ' + e);
		}
		return null;
	},
	getFormTableRowComponent: function (sectionIndex, rowIndex, fieldName) {
		fieldName = fieldName.toUpperCase();
		try {
			if (fieldNames.indexOf(fieldName) > -1) {
				return Ti.App.FormTable.data[sectionIndex].rows[rowIndex].children[0].children[fieldNames.indexOf(fieldName)];
			}
		} catch (e) {
			//COMMON.Log('getRowComponent --> ' + sectionIndex + ' : ' + rowIndex + ' : ' + fieldName + ' : ' + e);
		}
		return null;
	},
	getGivenDataRowComponent: function (givenData, sectionIndex, rowIndex, fieldName) {
		fieldName = fieldName.toUpperCase();
		try {
			if (fieldNames.indexOf(fieldName) > -1) {
				return givenData[sectionIndex].rows[rowIndex].children[0].children[fieldNames.indexOf(fieldName)];
			}
		} catch (e) {
			//COMMON.Log('getRowComponent --> ' + sectionIndex + ' : ' + rowIndex + ' : ' + fieldName + ' : ' + e);
		}
		return null;
	},
	getFormComponent: function (fieldName) {
		fieldName = fieldName.toUpperCase();
		commonObj.index = formFieldNames.indexOf(fieldName);
		if (commonObj.index > -1) {
			return mView.getFormComponent(commonObj.index);
		}
		return null;
	},
	getFormComponentView: function (fieldName) {
		fieldName = fieldName.toUpperCase();
		commonObj.index = formFieldNames.indexOf(fieldName);
		if (commonObj.index > -1) {
			return mView.getFormComponentView(commonObj.index);
		}
		return null;
	},
	getFormListViewComponent: function (fieldName) {
		fieldName = fieldName.toUpperCase();
		commonObj.index = formFieldNames.indexOf(fieldName);
		if (commonObj.index > -1) {
			return mView.getFormListViewComponent(commonObj.index);
		}
		return null;
	},
	getFormListViewSelectedRowIndex: function (sFieldVal) {
		commonObj.frmListViewRowIndex = -1;
		commonObj.arrFieldVal = sFieldVal.split('.');
		commonObj.fieldName = commonObj.arrFieldVal[0].toUpperCase();//fieldName.toUpperCase();
		commonObj.index = formFieldNames.indexOf(commonObj.fieldName);
		if (commonObj.index > -1) {
			commonObj.frmListView = mView.getFormListViewComponent(commonObj.index);
			//////COMMON.Log('frmListView -> ' + commonObj.frmListView);
			commonObj.frmListView = commonObj.frmListView.children[2];
			//////COMMON.Log('frmListView -> ' + commonObj.frmListView);
			//////COMMON.Log('frmListView.selectedTblRowIndex -> ' + commonObj.frmListView.selectedTblRowIndex);
			if (commonObj.frmListView.selectedTblRowIndex > -1) {
				commonObj.frmListViewRowIndex = commonObj.frmListView.selectedTblRowIndex;
			}
		}
		return commonObj.frmListViewRowIndex;
	},
	getFormListView: function (sFieldVal) {
		commonObj.frmListView = null;
		commonObj.arrFieldVal = sFieldVal.split('.');
		commonObj.fieldName = commonObj.arrFieldVal[0].toUpperCase();//fieldName.toUpperCase();
		commonObj.index = formFieldNames.indexOf(commonObj.fieldName);
		if (commonObj.index > -1) {
			commonObj.frmListView = mView.getFormListViewComponent(commonObj.index);
			//COMMON.Log('frmListView -> ' + commonObj.frmListView);
			commonObj.frmListView = commonObj.frmListView.children[2];
			//COMMON.Log('frmListView -> ' + commonObj.frmListView);
		}
		return commonObj.frmListView;
	},
	getFormListViewComponentValue: function (sFieldVal) {
		var arrFieldVal = sFieldVal.split('.');
		//this.selectedTblRowIndex = e.row.index;
		var fieldName = arrFieldVal[0].toUpperCase();//fieldName.toUpperCase();
		//////COMMON.Log('fieldName -> ' + fieldName);
		//LOG.debug('Arrayoperation - getFormListViewComponentValue : ', 'fieldName -> ' + fieldName);
		var index = formFieldNames.indexOf(fieldName);
		if (index > -1) {
			var frmListView = mView.getFormListViewComponent(index);
			//LOG.debug('Arrayoperation - getFormListViewComponentValue : ', 'frmListView -> ' + frmListView);
			//////COMMON.Log('frmListView -> ' + frmListView);
			frmListView = frmListView.children[2];
			//////COMMON.Log('frmListView -> ' + frmListView);
			//LOG.debug('Arrayoperation - getFormListViewComponentValue : ', 'frmListView -> ' + frmListView);
			//////COMMON.Log('frmListView.selectedTblRowIndex -> ' + frmListView.selectedTblRowIndex);
			if (frmListView.selectedTblRowIndex > -1) {

				//LOG.debug('Arrayoperation - getFormListViewComponentValue : ', '------------------------------------');
				//LOG.debug('Arrayoperation - getFormListViewComponentValue : ', 'frmListView.selectedTblRowIndex -> ' + frmListView.selectedTblRowIndex);
				//LOG.debug('Arrayoperation - getFormListViewComponentValue : ', '------------------------------------');
				var rows = frmListView.data[0].rows[frmListView.selectedTblRowIndex];
				//LOG.debug('Arrayoperation - getFormListViewComponentValue : ', rows);
				var fieldNameIndex = -1;
				var _LoopLen = rows.children[0].children.length;
				for (var i = 0; i < _LoopLen; i++) {
					//////COMMON.Log(rows.children[0].children[i].DataMember + ' - ' + arrFieldVal[1].toUpperCase());
					//LOG.debug('Arrayoperation - getFormListViewComponentValue : ', 'DataMember -> ' + rows.children[0].children[i].DataMember + ' - ' + arrFieldVal[1].toUpperCase());

					if (rows.children[0].children[i].DataMember == arrFieldVal[1].toUpperCase()) {
						fieldNameIndex = i;
						i = _LoopLen;
					}
				}
				//LOG.debug('Arrayoperation - getFormListViewComponentValue : ', 'fieldNameIndex -> ' + fieldNameIndex);

				//LOG.debug('Arrayoperation - getFormListViewComponentValue : ', 'fieldControl -> ' + rows.children[0].children[fieldNameIndex]);

				//LOG.debug('Arrayoperation - getFormListViewComponentValue : ', 'fieldControl -> ' + JSON.stringify(rows.children[0].children[fieldNameIndex]));

				var fieldControl = rows.children[0].children[fieldNameIndex].fieldControl;
				//LOG.debug('Arrayoperation - getFormListViewComponentValue : ', 'fieldControl -> ' + fieldControl);
				if (fieldControl == 'TEXTBOX' || fieldControl == 'EDITABLETEXTBOX' || fieldControl == 'OPTION' || fieldControl == 'OPTIONGROUP') {
					return rows.children[0].children[fieldNameIndex].value;
				} else if (fieldControl == 'DATEPICKER' || fieldControl == 'TIMEPICKER' || fieldControl == 'COMBOBOX') {
					return rows.children[0].children[fieldNameIndex].code;
				}
				return rows.children[0].children[fieldNameIndex].text;
			}
		}
		return null;
	},
	getFormRowByIndex: function (fieldName) {
		//COMMON.Log('fieldName :'+fieldName);
		fieldName = fieldName.toUpperCase();
		commonObj.index = formFieldNames.indexOf(fieldName);
		//COMMON.Log('index------> ' + commonObj.index);
		if (commonObj.index > -1) {
			return mView.getFormRowByIndex(commonObj.index);
		}
		return null;
	},
	getFormComponentValue: function (fieldName) {
		try {
			fieldName = fieldName.toUpperCase();
			//COMMON.Log('formFieldNames -> ' + JSON.stringify(formFieldNames));
			//COMMON.Log('formDataMember -> ' + JSON.stringify(formDataMember));
			commonObj.index = formFieldNames.indexOf(fieldName);
			if (commonObj.index < 0) {
				commonObj.index = formDataMember.indexOf(fieldName);
			}
			if (commonObj.index > -1) {
				fieldComponent = mView.getFormComponent(commonObj.index);
				if (fieldComponent != null && fieldComponent != undefined) {
					fieldControl = fieldComponent.fieldControl;
					//COMMON.Log(' fieldControl:' + fieldControl);
					//COMMON.Log('fieldName : ' + fieldName + ' - fieldControl : ' + fieldControl + 'fieldComponent : ' + fieldComponent);
					//if (fieldControl == 'TEXTBOX' || fieldControl == 'EDITABLETEXTBOX' || fieldControl == 'OPTION' || fieldControl == 'LABEL' || fieldControl == 'COMBOBOX' || fieldControl == 'DATEPICKER' || fieldControl == 'TIMEPICKER') {
					if (fieldControl == 'PASSWORD' || fieldControl == 'SEARCH' || fieldControl == 'TEXTBOX' || fieldControl == 'TEXTAREA' || fieldControl == 'EDITABLETEXTBOX' || fieldControl == 'OPTION' || fieldControl == 'LABEL' || fieldControl == 'OPTIONGROUP' || fieldControl == 'AUTOCOMPLETE') {
						if (fieldControl == 'PASSWORD') {
							//COMMON.Log(' fieldComponent.value :' + fieldComponent.value);
						}
						return fieldComponent.value;
					} else if (fieldControl == 'DATEPICKER' || fieldControl == 'TIMEPICKER' || fieldControl == 'COMBOBOX' || fieldControl == 'COMBOGROUP') {
						return fieldComponent.code;
						return fieldComponent.ComboBoxActiveData;
					} else if (fieldControl == 'LISTVIEW') {
						return '';
						//return [];
						//return fieldComponent.ComboBoxActiveData;
					} else if (fieldControl == 'SWITCH') {
						fieldComponent.switchValue = (fieldComponent.switchValue != null && fieldComponent.switchValue != undefined && fieldComponent.switchValue != '') ? fieldComponent.switchValue : false;
						return fieldComponent.switchValue;
					} else if (fieldControl == 'RADIOBUTTON') {
						var sDataMember = fieldComponent.DataMember;
						var arrDataMemberIndex = [];
						var formDataMemberlength = formDataMember.length;
						for (var i = 0; i < formDataMemberlength; i++) {
							//COMMON.Log("RADIOBUTTON : " + formDataMember[i] + " == " + sDataMember.toUpperCase());
							if (formDataMember[i] == sDataMember.toUpperCase()) {
								arrDataMemberIndex.push(i);
							}
						}
						var arrDataMemberIndexlength = arrDataMemberIndex.length;
						for (var i = 0; i < arrDataMemberIndexlength; i++) {
							fieldComponent = mView.getFormComponent(arrDataMemberIndex[i]);
							if (fieldComponent.value == true) {
								i = arrDataMemberIndexlength;
								return fieldComponent.DefaultValue;
							}
						}
						return '';
					}
					return fieldComponent.text;
				} else {
					return '';
				}
			}
			return '';
		} catch (e) {
			return '';
		}
	},
	getFormComponentFieldName: function (fieldName) {
		try {
			fieldName = fieldName.toUpperCase();
			commonObj.index = formFieldNames.indexOf(fieldName);
			if (commonObj.index > -1) {
				fieldComponent = mView.getFormComponent(commonObj.index);
				if (fieldComponent != null && fieldComponent != undefined) {
					fieldControl = fieldComponent.fieldControl;
					if (fieldControl == 'RADIOBUTTON') {
						return fieldComponent.DataMember;
					}
					return fieldComponent.text;
				} else {
					return fieldName;
				}
			}
			return fieldName;
		} catch (e) {
			return fieldName;
		}
	},
	getFormAllComponentValue: function (sScreenName) {
		try {
			var arrFormFieldValue = [];
			var obj = {};
			var arrFields = this.getFormFieldNames();
			var arrFieldslength = arrFields.length;
			for (var i = 0; i < arrFieldslength; i++) {
				fieldName = arrFields[i];
				commonObj.index = formFieldNames.indexOf(fieldName.toUpperCase());
				if (commonObj.index > -1) {
					fieldComponent = mView.getFormComponent(commonObj.index);
					//fieldComponent.fieldName
					if (fieldComponent != null && fieldComponent != undefined) {
						fieldControl = fieldComponent.fieldControl;
						//COMMON.Log('paramsObj ---> fieldControl : ' + fieldControl);
						if (fieldControl == 'TEXTBOX' || fieldControl == 'TEXTAREA' || fieldControl == 'EDITABLETEXTBOX' || fieldControl == 'OPTION' || fieldControl == 'LABEL' || fieldControl == 'OPTIONGROUP' || fieldControl == 'AUTOCOMPLETE') {
							obj = {};
							obj.FieldName = "Params.FormView." + fieldName;
							obj.Value = fieldComponent.value;
							obj.DataMemberType = fieldComponent.DataMemberType;
							obj.FieldControlType = fieldControl;
							obj.ObjType = "FORMVIEW";
							arrFormFieldValue.push(obj);
						} else if (fieldControl == 'DATEPICKER' || fieldControl == 'TIMEPICKER' || fieldControl == 'COMBOBOX') {
							obj = {};
							obj.FieldName = "Params.FormView." + fieldName;
							obj.Value = fieldComponent.code;
							obj.DataMemberType = fieldComponent.DataMemberType;
							obj.FieldControlType = fieldControl;
							obj.ObjType = "FORMVIEW";
							arrFormFieldValue.push(obj);
						} else if (fieldControl == 'BUTTONCOMBO') {
							obj = {};
							obj.FieldName = "Params.FormView." + fieldName;
							obj.Value = fieldComponent.ComboBoxActiveData;
							obj.DataMemberType = fieldComponent.DataMemberType;
							obj.FieldControlType = fieldControl;
							obj.ObjType = "FORMVIEW";
							arrFormFieldValue.push(obj);
						} else if (fieldControl == 'LISTVIEW') {
							/*
							var tblView = this.getFormComponent(fieldName);
							var dSelectedTblRowIndex = tblView.selectedTblRowIndex;
							//COMMON.Log('dSelectedTblRowIndex ---> ' + dSelectedTblRowIndex);
							if(dSelectedTblRowIndex > -1){
								fieldName = fieldComponent.fieldName;
								//COMMON.Log("_FORM_LISTVIEW -> " + sScreenName+"_FORM_LISTVIEW_"+fieldName);
								
								var tmpScreenName = sScreenName+"_FORM_LISTVIEW_"+fieldName;
								this.loadListConfigArr(tmpScreenName);
								this.setTableHeaderFieldNames(tmpScreenName);
								
								var _data = tblView.data;
								_data =  (_data == null || _data == undefined || _data == '') ? [] : _data;
								
								//COMMON.Log('_data.length --> ' + _data.length);
								//COMMON.Log('_data[0].rows.length =--> ' + _data[0].rows.length);
								
								if(_data[0].rows.length > 0){
									var _arrFields = this.getTableHeaderFieldNames();
									//COMMON.Log('_arrFields ---> ' + _arrFields.length);
									//COMMON.Log(JSON.stringify(_arrFields));
									for(var ctr = 0; ctr< _arrFields.length; ctr++){
										try{
											var tblFieldComponent = ArrayOperations.prototype.getGivenDataRowComponent(_data, 0, dSelectedTblRowIndex,_arrFields[ctr]);	
											obj = {};
											obj.FieldName = "LISTVIEW." + fieldName + "_" + _arrFields[ctr];
											obj.Value = ArrayOperations.prototype.getColumnDataByTabView(_data, 0, dSelectedTblRowIndex,_arrFields[ctr]);
											obj.DataMemberType =  tblFieldComponent.DataMemberType;
											obj.FieldControlType = tblFieldComponent.fieldControl;
											obj.ObjType = "FORMLISTVIEW";
											arrFormFieldValue.push(obj);
										}catch(e){
											alert('FRM LISTVIEW' + e);
										}
									}
								}
							}else{
								this.loadListConfigArr(sScreenName);
								this.setTableHeaderFieldNames(sScreenName);
							}
							*/
						}
					}
				}
			}
			//LISTVIEW
			var dSelectedTblRowIndex = this.getSelectedRowIndex();
			//COMMON.Log('dSelectedTblRowIndex --> ' + dSelectedTblRowIndex);
			ArrayOperations.prototype.loadListConfigArr(sScreenName);
			ArrayOperations.prototype.setTableHeaderFieldNames(sScreenName);
			var arrFields = ArrayOperations.prototype.getTableHeaderFieldNames();
			var fieldName = "";
			var arrFieldslength = arrFields.length;
			var tblFieldComponent = '';
			for (var i = 0; i < arrFieldslength; i++) {
				fieldName = arrFields[i];
				tblFieldComponent = ArrayOperations.prototype.getRowComponent(0, dSelectedTblRowIndex, fieldName);
				//COMMON.Log(arrFields[i] + ' - ' + ArrayOperations.prototype.getColumnData(0, dSelectedTblRowIndex, fieldName));
				obj = {};
				obj.FieldName = "Params.ListView." + fieldName;
				obj.Value = ArrayOperations.prototype.getColumnData(0, dSelectedTblRowIndex, fieldName);
				obj.DataMemberType = tblFieldComponent.DataMemberType;
				obj.FieldControlType = tblFieldComponent.fieldControl;
				obj.ObjType = "LISTVIEW";
				arrFormFieldValue.push(obj);
			}
			return arrFormFieldValue;
		} catch (e) {
			return {};
		}
	},
	setFormComponentValue: function (fieldName, sValue) {
		fieldName = fieldName.toUpperCase();
		commonObj.index = formFieldNames.indexOf(fieldName);
		if (commonObj.index > -1) {
			fieldComponent = mView.getFormComponent(commonObj.index);
			if (fieldComponent != null && fieldComponent != undefined) {
				fieldControl = fieldComponent.fieldControl;

				//LOG.debug('Arrayoperation - setFormComponentValue : fieldName - ' + fieldName , 'fieldName : ' + fieldName + ' - fieldControl : ' + fieldControl + 'fieldComponent : ' + fieldComponent);

				//COMMON.Log('fieldName : ' + fieldName + ' - fieldControl : ' + fieldControl + 'fieldComponent : ' + fieldComponent);
				//if (fieldControl == 'TEXTBOX' || fieldControl == 'EDITABLETEXTBOX' || fieldControl == 'OPTION' || fieldControl == 'LABEL' || fieldControl == 'COMBOBOX' || fieldControl == 'DATEPICKER' || fieldControl == 'TIMEPICKER') {
				if (fieldControl == 'TEXTBOX' || fieldControl == 'EDITABLETEXTBOX') {
					fieldComponent.hintText = sValue;
					fieldComponent.value = sValue;
				} else if (fieldControl == 'DATEPICKER' || fieldControl == 'TIMEPICKER' || fieldControl == 'COMBOBOX') {
					if (fieldControl == 'DATEPICKER' || fieldControl == 'TIMEPICKER') {
						try {
							fieldComponent.hintText = ArrayOperations.prototype.FormatDataMember(sValue, fieldComponent.DataMemberType);
							fieldComponent.value = ArrayOperations.prototype.FormatDataMember(sValue, fieldComponent.DataMemberType);
						} catch (e) {
							fieldComponent.hintText = sValue;
							fieldComponent.value = sValue;
						}
					} else {
						fieldComponent.hintText = sValue;
						fieldComponent.value = sValue;
					}
					if (fieldControl == 'COMBOBOX') {
						//fieldComponent.code = sValue;
						var comboData = fieldComponent.ComboBoxData;
						//COMMON.Log(' comboData.length ' + comboData.length);
						var comboDatalength = comboData.length;
						for (var comboCnt = 0; comboCnt < comboDatalength; comboCnt++) {
							//COMMON.Log('COMBO : '+ sValue +' - '+ comboData[comboCnt].ComboBoxCode);
							if (sValue == comboData[comboCnt].ComboBoxCode) {
								//COMMON.Log('comboData[comboCnt].displayText -->' + comboData[comboCnt].displayText);
								//COMMON.Log('comboData[comboCnt].ComboBoxCode -->' + comboData[comboCnt].ComboBoxCode);
								fieldComponent.value = comboData[comboCnt].displayText;
								fieldComponent.code = comboData[comboCnt].ComboBoxCode;
								fieldComponent.text = comboData[comboCnt].displayText;
								comboCnt = comboDatalength;
							}
						}
						if (comboDatalength <= 0) {
							//COMMON.Log('comboDatalength -->' + comboDatalength);
							fieldComponent.code = sValue;
						}

					}
				} else if (fieldControl == 'OPTION' || fieldControl == 'OPTIONGROUP') {
					fieldComponent.value = COMMON.CheckBooleanField(sValue);
				} else if (fieldControl == 'LABEL' || fieldControl == 'AUTOCOMPLETE') {
					fieldComponent.editable = true;
					fieldComponent.enabled = true;
					fieldComponent.hintText = sValue;
					fieldComponent.value = sValue;
					fieldComponent.text = sValue;
					fieldComponent.editable = false;
					fieldComponent.enabled = false;
				}
				if (fieldControl != 'COMBOBOX' && fieldControl != 'LISTVIEW' && fieldControl != 'MULTILINE' && fieldControl != 'SWITCH' && fieldControl != 'IMAGE' && fieldControl != 'DASHBOARD' && fieldControl != 'OPTION') {
					fieldComponent.text = sValue;
					fieldComponent.value = sValue;
					fieldComponent.hintText = sValue;
				}
				if (fieldControl == 'IMAGE') {
					//COMMON.Log('12571 '+sValue);
					fieldComponent.image = Ti.App.ImageCacheObj.getImage('MobileSalesCache', sValue);
				}
				if (fieldControl == 'MULTIPLEPHOTO') {
					//COMMON.Log('MULTIPLEPHOTORemove '+sValue);
					if (sValue == '')
						fieldComponent.removeAllChildren();
					else
						this.loadMultipleIMagewithQry(sValue, fieldComponent);
					//COMMON.Log('MULTIPLEPHOTOAfterremove '+sValue);
				}

			} else {
				return '';
			}
		}
		return '';
	},
	getFormFieldNames: function () {
		return formFieldNames;
	},
	setFormFieldNames: function (fields) {
		formFieldNames = fields;
	},
	getColumnDataByTabView: function (sTableView, sectionIndex, rowIndex, fieldName) {
		var tblData = sTableView.data[sectionIndex].rows;
		var length = tblData[rowIndex].children[0].children.length;
		for (var i = 0; i < length; i++) {
			if (tblData[rowIndex].children[0].children[i].DataMember == fieldName) {
				fieldControl = tblData[rowIndex].children[0].children[i].fieldControl;
				if (fieldControl == 'TEXTBOX' || fieldControl == 'EDITABLETEXTBOX' || fieldControl == 'OPTION' || fieldControl == 'OPTIONGROUP') {
					return tblData[rowIndex].children[0].children[i].value;
				} else if (fieldControl == 'DATEPICKER' || fieldControl == 'TIMEPICKER' || fieldControl == 'COMBOBOX') {
					return tblData[rowIndex].children[0].children[i].code;
				}
				return tblData[rowIndex].children[0].children[i].text;
			}
		}
	},
	getColumnData: function (sectionIndex, rowIndex, fieldName) {

		//LOG.debug('Arrayoperation - getColumnData : fieldName - ' + fieldName , ' AvailableMemory : ' + COMMON.availableMemoryInMB());
		//COMMON.Log('AAA --> ' + rowIndex + ' : ' + fieldName);
		//COMMON.Log('AAA --> fieldNames : ' + JSON.stringify(fieldNames));
		fieldName = fieldName.toUpperCase();
		if (fieldNames.indexOf(fieldName) > -1 && rowIndex > -1) {
			commonObj.rows = Ti.App.currentTable.data[sectionIndex].rows;
			try {
				if (commonObj.rows[rowIndex].HeaderRow != undefined && commonObj.rows[rowIndex].HeaderRow != null) {
					if (commonObj.rows[rowIndex].HeaderRow == true) {
						return "";
					}
				}
			} catch (e) { }

			commonObj.fieldControl = commonObj.rows[rowIndex].children[0].children[fieldNames.indexOf(fieldName)].fieldControl;
			if (commonObj.fieldControl == 'TEXTBOX' || commonObj.fieldControl == 'EDITABLETEXTBOX' || commonObj.fieldControl == 'OPTION' || commonObj.fieldControl == 'OPTIONGROUP') {
				return commonObj.rows[rowIndex].children[0].children[fieldNames.indexOf(fieldName)].value;
			} else if ( commonObj.fieldControl == 'TIMEPICKER' || commonObj.fieldControl == 'COMBOBOX') {
				return commonObj.rows[rowIndex].children[0].children[fieldNames.indexOf(fieldName)].code;
			}
			return commonObj.rows[rowIndex].children[0].children[fieldNames.indexOf(fieldName)].text;
		}
		return null;
	},
	getGivenDataRowComponentData: function (givenData, sectionIndex, rowIndex, fieldName) {
		fieldName = fieldName.toUpperCase();
		try {
			if (fieldNames.indexOf(fieldName) > -1) {
				commonObj.fieldControl = givenData[sectionIndex].rows[rowIndex].children[0].children[fieldNames.indexOf(fieldName)].fieldControl;
				if (commonObj.fieldControl == 'TEXTBOX' || commonObj.fieldControl == 'EDITABLETEXTBOX' || commonObj.fieldControl == 'OPTION' || commonObj.fieldControl == 'OPTIONGROUP') {
					return givenData[sectionIndex].rows[rowIndex].children[0].children[fieldNames.indexOf(fieldName)].value;
				} else if (commonObj.fieldControl == 'DATEPICKER' || commonObj.fieldControl == 'TIMEPICKER' || commonObj.fieldControl == 'COMBOBOX') {
					return givenData[sectionIndex].rows[rowIndex].children[0].children[fieldNames.indexOf(fieldName)].code;
				}
				return givenData[sectionIndex].rows[rowIndex].children[0].children[fieldNames.indexOf(fieldName)].text;
			}
		} catch (e) {
			//COMMON.Log('getRowComponent --> ' + sectionIndex + ' : ' + rowIndex + ' : ' + fieldName + ' : ' + e);
		}
		return null;
	},
	getGridColumnfield : function(rowIndex, fieldName) {
		fieldName = fieldName.toUpperCase();
		var SelectedGridRow = Ti.App.GridListContentView.children[1].children[0].children[rowIndex];
		try{
			if (fieldNames.indexOf(fieldName) > -1 && rowIndex > -1) {
				//return SelectedGridRow.children[fieldNames.indexOf(fieldName)];
				commonObj.row = SelectedGridRow.children[fieldNames.indexOf(fieldName)];
				commonObj.fieldControl = commonObj.row.fieldControl;
				
				//alert(commonObj.fieldControl);
				//if (commonObj.fieldControl == 'TEXTBOX' || commonObj.fieldControl == 'EDITABLETEXTBOX' || commonObj.fieldControl == 'OPTION' || commonObj.fieldControl == 'OPTIONGROUP' || commonObj.fieldControl == 'DATEPICKER' || commonObj.fieldControl == 'TIMEPICKER' || commonObj.fieldControl == 'COMBOBOX') {
				//	return commonObj.row;
				//}else 
				if (commonObj.fieldControl == 'NUMERICDROPDOWN') {
					return commonObj.row.children[1];
				}else{
					return commonObj.row;
				}
			}
		}catch(e){}
		return null;
	},
	getGridColumnData : function(rowIndex, fieldName) {
	    
		//LOG.debug('Arrayoperation - getColumnData : fieldName - ' + fieldName , ' AvailableMemory : ' + COMMON.availableMemoryInMB());
		//COMMON.Log('AAA --> ' + rowIndex + ' : ' + fieldName);
		//COMMON.Log('AAA --> fieldNames : ' + JSON.stringify(fieldNames));
		fieldName = fieldName.toUpperCase();
		
		//alert('AAA --> ' + rowIndex + ' : ' + fieldName);
		//alert('AAA --> fieldNames : ' + JSON.stringify(fieldNames));
		
		//alert(SelectedGridRow.children[fieldNames.indexOf(fieldName)].fieldControl);
		
		//alert(Ti.App.GridListContentView.children[1].children[0].children.length);
		try{
			var SelectedGridRow = Ti.App.GridListContentView.children[1].children[0].children[rowIndex];
			
			//alert(SelectedGridRow);
			//alert(SelectedGridRow.children[0]);
			if (fieldNames.indexOf(fieldName) > -1 && rowIndex > -1) {
				commonObj.row = SelectedGridRow.children[fieldNames.indexOf(fieldName)];
				
				commonObj.fieldControl = commonObj.row.fieldControl;
				
				//alert(commonObj.fieldControl);
				if (commonObj.fieldControl == 'TEXTBOX' || commonObj.fieldControl == 'EDITABLETEXTBOX' || commonObj.fieldControl == 'OPTION' || commonObj.fieldControl == 'OPTIONGROUP') {
					return commonObj.row.value;
				}else if (commonObj.fieldControl == 'DATEPICKER' || commonObj.fieldControl == 'TIMEPICKER' || commonObj.fieldControl == 'COMBOBOX') {
					return commonObj.row.code;
				}else if (commonObj.fieldControl == 'NUMERICDROPDOWN') {
					return commonObj.row.children[1].value;
				}
				return commonObj.row.text;
			}
		}catch(e){}
		return null;
	},
	getComboboxText : function(sectionIndex, rowIndex, fieldName){
		//COMMON.Log('AAA --> ' + rowIndex + ' : ' + fieldName);
		fieldName = fieldName.toUpperCase();
		if (fieldNames.indexOf(fieldName) > -1 && rowIndex > -1) {
			commonObj.rows = Ti.App.currentTable.data[sectionIndex].rows;
			commonObj.fieldControl = commonObj.rows[rowIndex].children[0].children[fieldNames.indexOf(fieldName)].fieldControl;
			if (commonObj.fieldControl == 'DATEPICKER' || commonObj.fieldControl == 'TIMEPICKER' || commonObj.fieldControl == 'COMBOBOX') {
				return commonObj.rows[rowIndex].children[0].children[fieldNames.indexOf(fieldName)].text;
			}
		}
		return '';
	},
	getCurrentRowData: function (fieldName) {
		fieldName = fieldName.toUpperCase();
		if (fieldNames.indexOf(fieldName) > -1) {
			commonObj.rows = Ti.App.currentRow;
			if (commonObj.rows.children[0].children[fieldNames.indexOf(fieldName)].fieldControl == 'TEXTBOX' || commonObj.rows.children[0].children[fieldNames.indexOf(fieldName)].fieldControl == 'EDITABLETEXTBOX' || commonObj.rows.children[0].children[fieldNames.indexOf(fieldName)].fieldControl == 'OPTION' || commonObj.rows.children[0].children[fieldNames.indexOf(fieldName)].fieldControl == 'OPTIONGROUP') {
				return commonObj.rows.children[0].children[fieldNames.indexOf(fieldName)].value;
			}
			return commonObj.rows.children[0].children[fieldNames.indexOf(fieldName)].text;
		}
		return '';
	},
	getCurrentRowDataWithDataMemberType: function (fieldName) {
		fieldName = fieldName.toUpperCase();
		if (fieldNames.indexOf(fieldName) > -1) {
			rowObj = Ti.App.currentRow;
			dataMemberType = rowObj.children[0].children[fieldNames.indexOf(fieldName)].DataMemberType;
			if (dataMemberType == 'DATE' || dataMemberType == 'DATETIME' || dataMemberType == 'TIME') {
				return rowObj.children[0].children[fieldNames.indexOf(fieldName)].actVal;
			}
			if (rowObj.children[0].children[fieldNames.indexOf(fieldName)].fieldControl == 'TEXTBOX' || rowObj.children[0].children[fieldNames.indexOf(fieldName)].fieldControl == 'EDITABLETEXTBOX' || rowObj.children[0].children[fieldNames.indexOf(fieldName)].fieldControl == 'OPTION' || rowObj.children[0].children[fieldNames.indexOf(fieldName)].fieldControl == 'OPTIONGROUP') {
				return rowObj.children[0].children[fieldNames.indexOf(fieldName)].value;
			}
			return rowObj.children[0].children[fieldNames.indexOf(fieldName)].text;
		}
		return '';
	},
	getSelectedRowIndex: function () {
		return mView.getSelectedRowIndex();
	},
	getDataFromArray: function (array, rowIndex, fieldName) {
		fieldName = fieldName.toUpperCase();
		if (fieldNames.indexOf(fieldName) > -1) {
			return array[rowIndex][fieldNames.indexOf(fieldName)];
		}
		return -1;
	},
	setCommonScreen: function (common) {
		//COMMON.Log('Arrayoperation setCommonScreen : iIndex = ' + iIndex);
		iIndex = 0;
		mView = common;
	},
	setCommonScreenControl: function (common) {
		//Don't know the reason why "iIndex = 0" in setCommonScreen this create problem when "WindowActivated" before pagination.
		//It causes wrong index number and checkboxs can't be selected and data can't be saved some records.
		//"iIndex = 0" is removed in this function
		//COMMON.Log('Arrayoperation setCommonScreenControl : iIndex = ' + iIndex);
		mView = common;
	},
	setCommonScreenController: function (common) {
		mView = common;
	},
	resetRowiIndexByTableRow: function () {
		//COMMON.Log('resetRowiIndexByTableRow : iIndex1 - ' + iIndex);
		try {
			//COMMON.Log('resetRowiIndexByTableRow : ' + Ti.App.currentTable.data[0].rows.length);
			iIndex = Ti.App.currentTable.data[0].rows.length;
		} catch (e) {
			iIndex = 0;
		}
		//COMMON.Log('resetRowiIndexByTableRow : iIndex2 - ' + iIndex);
	},
	getAllRows: function (sectionIndex) {
		try {
			return Ti.App.currentTable.data[sectionIndex].rows;
		} catch (e) { }
		return [];
	},
	getWidthValue: function (field) {
		if (field.indexOf('%') > -1) {
			return parseInt(field.substring(0, field.indexOf('%')));
		}
		return -1;
	},
	calculateOnePercentWidth: function () {
		return ((parseInt(Ti.App.SCREEN_WIDTH) / 100) * 1);
	},
	getTotalViewWidth: function (width) {
		return (parseInt(width) + 100);
	},
	setController: function (controller) {
		mController = controller;
	},
	setInitialize: function (folder, file, common, controller) {
		logFolderName = folder;
		logFileName = file;
		iIndex = 0;
		mView = common;
		mController = controller;
		stmpActiveScreenName = '';
	},
	read: function (qry) {
		var db = Ti.App.dbConn;//commonObj.dbConnectionObj.createDataBaseConnection();
		var qry = "";
		dbDataRows = db.execute(qry);
		//db.close();
		return dbDataRows;
	},
	execute: function (qry) {
		var db = Ti.App.dbConn;//commonObj.dbConnectionObj.createDataBaseConnection();
		var qry = "";
		dbDataRows = db.execute(qry);
		//db.close();
		return dbDataRows;
	},
	argbToRGB: function (color) {
		if (color != '234244250' && color != '16777215') {
			return '#' + ('000000' + (color & 0xFFFFFF).toString(16)).slice(-6);
		}
		if (color == '234244250') {
			return '#b3b3b3';//'#98cce6';//d6eaf5';//eaf4fa';	
		} else {
			return 'transparent';
		}
		//return (color == '16777215') ? 'transparent' :  '#' + ('000000' + (color & 0xFFFFFF).toString(16)).slice(-6);
		//return '#' + ('000000' + (color & 0xFFFFFF).toString(16)).slice(-6);
	},
	barcodeCodeCallBack: function (code, controller) {
		controller.handleData(code);
	},
	getCurrentTable: function () {
		return Ti.App.currentTable;
	},
	getCurrentRow: function () {
		return Ti.App.currentRow;
	},
	getRowByIndex: function (index) {
		try {
			commonObj.rows = Ti.App.currentTable.data[0].rows;
			if (index != undefined && index != null) {
				return commonObj.rows[index];
			}
			return commonObj.rows[0];
		} catch (e) { }
		return null;
	},
	getButtonOrder: function () {
		return buttonOrder;
	},
	selectRowByIndex: function (index) {
		mView.selectRowByIndex(index);
	},
	removeCurrentFieldFocus: function () {
		if (currentFocusedField != undefined && currentFocusedField != null) {
			currentFocusedField.blur();
		}
	},
	getTableHeaderFieldNames: function () {
		return fieldNames;
	},
	setTableHeaderFieldNames: function (screenName) {
		fieldNames = [];
		commonObj.details = this.getListConfigByScreenName(screenName);
		if (commonObj.details != undefined && commonObj.details != null) {
			var commonObjdetailslength = commonObj.details.length;
			for (var c = 0; c < commonObjdetailslength; c++) {
				fieldNames.push('' + commonObj.details[c].DataMember.toUpperCase());
			}
		}
	},
	refreshList: function () {
		ArrayOperations.prototype.resetRowiIndex();
		mView.refreshList();
	},
	getFieldCount: function (dbDataRows) {
		//return ((bIsAndroid) ? dbDataRows.fieldCount : dbDataRows.fieldCount());
		if(Ti.App.sDeviceOSName == 'iphone' || (Ti.version >= '8.9.9')){
			return dbDataRows.fieldCount;
		}else{
			if ((Ti.Platform.name === 'android') || (Ti.version >= '3.3.0')) {
				return dbDataRows.getFieldCount();//.fieldCount;
			} else {
				return dbDataRows.fieldCount();
			}
		}
	},
	getFieldControl: function (dataMember) {
		if (HeaderDetails != undefined && HeaderDetails != null && dataMember != undefined && dataMember != null) {
			var HeaderDetailslength = HeaderDetails.length;
			for (var i = 0; i < HeaderDetailslength; i++) {
				if (HeaderDetails[i].DataMember.toUpperCase() == dataMember.toUpperCase()) {
					return HeaderDetails[i].fieldControl;
				}
			}
		}
		return '';
	},
	textFieldFocus: function (sectionIndex, index, row, fieldName, isEditable, isFocusable) {
		fieldName = fieldName.toUpperCase();
		if (fieldNames.indexOf(fieldName) > -1) {
			row.children[0].children[fieldNames.indexOf(fieldName)].editable = isEditable;
			row.children[0].children[fieldNames.indexOf(fieldName)].focusable = isFocusable;
		}
	},
	refreshRow: function (row) {
		var mRow = row;
		Ti.App.currentTable.deleteRow(row);
		if (ArrayOperations.prototype.getAllRows(0).length > 0 && mRow.index < ArrayOperations.prototype.getAllRows(0).length) {
			Ti.App.currentTable.insertRowBefore(mRow.index, mRow);
		} else {
			Ti.App.currentTable.appendRow(mRow);
		}
	},
	getFieldIndex: function (fieldName) {
		fieldName = fieldName.toUpperCase();
		if (fieldNames.indexOf(fieldName) > -1) {
			return fieldNames.indexOf(fieldName);
		}
		return -1;
	},
	resetRowiIndex: function () {
		//before Call Refersh List method need to reset iIndex value
		iIndex = 0;
	},
	updateTextFieldValue: function (index, fieldName, text) {
		fieldName = fieldName.toUpperCase();
		if (fieldNames.indexOf(fieldName) > -1) {
			//row.children[0].children[fieldNames.indexOf(fieldName)].value = text;
			//Ti.App.currentTable.data[0].rows[index].children[0].startLayout();
			//row.children[0].children[fieldNames.indexOf(fieldName)].value = text;
			Ti.App.currentTable.selectRow(index);
			Ti.App.currentTable.data[0].rows[index].children[0].children[fieldNames.indexOf(fieldName)].value = text;
			Ti.App.currentTable.data[0].rows[index].children[0].children[fieldNames.indexOf(fieldName)].text = text;
			//Ti.App.currentTable.data[0].rows[index].children[0].finishLayout();
		}
		if (Ti.Platform.name == 'android') {
			if (index == 0) {
				//this.refreshRow(row);
			}
		}
	},
	refreshTableListUI: function () {
		commonObj.newData = Ti.App.currentTable.data;
		Ti.App.currentTable.data = [];
		//Ti.App.currentTable.setData([]);
		Ti.App.currentTable.setData(commonObj.newData);
	},
	updateCurrentRowTextFieldValue: function (fieldName, text) {
		fieldName = fieldName.toUpperCase();
		if (fieldNames.indexOf(fieldName) > -1) {
			//Ti.App.currentRow.children[0].children[fieldNames.indexOf(fieldName)].value = text;
			Ti.App.currentTable.data[0].rows[mRow.index].children[0].children[fieldNames.indexOf(fieldName)].value = text;
		}
		if (Ti.Platform.name == 'android') {
			//this.refreshRow(Ti.App.currentRow);
		}
	},
	openWindowFrom: function (folder, screenID, title) {
		mView.openWindowFrom(folder, screenID, title);
	},
	openWindow: function (screenID, title) {
		mView.openWindow(screenID, title);
	},
	setFormViewHeight: function (height) {
		mView.setFormViewHeight(height);
	},
	resetIsShowSearchButton: function (flag) {
		isShowSearchButton = flag;
	},
	unFocusCurrentField: function () {
		if (currentFocusedField != undefined && currentFocusedField != null) {
			currentFocusedField.blur();
		}
	},
	hideCustomIndicator: function () {
		if (currentWin != null && currentWin != undefined) {
			if (actInd != null && actInd != undefined) {
				actInd.hide();
				currentWin.remove(actInd);
				currentWin = null;
			}
		}
	},
	debug: function (tagName, text) {
		LOG.debug(logFolderName, logFileName, tagName, text);
	},
	info: function (folderName, fileName, tagName, text) {
		//LOG.debug(folderName, fileName, tagName, text);
	},
	upload: function () {
		LOG.upload();
	},
	sendLogAsEmail: function () {
		LOG.sendLogAsEmail();
	},
	setDebugParams: function (folder, file) {
		logFolderName = folder;
		logFileName = file;
	},
	createIndicatorObject: function () {
		actInd = Titanium.UI.createActivityIndicator({
			//style : ActivityIndicatorStyle.PLAIN,
			message: 'Please Wait...',
			width: Ti.UI.SIZE,
			height: Ti.UI.FILL,
			font: {
				fontFamily: 'tahoma',
				fontSize: parseInt(Ti.App.DeviceHeight * .025),//20,
				fontWeight: 'normal'
			},
			color: 'white'
		});
	},
	uploadDatabase: function (path, fileName) {
	},
	uploadLog: function (path, fileName) {
	},
	uploadImage: function (path, fileName) {
	},
	getTotalPage: function (qry) {
		try {
			commonObj.iTotalPage = 0;
			//commonObj.db = commonObj.dbConnectionObj.createDataBaseConnection();
			//COMMON.Log('getTotalPage qry '+qry);
			/*commonObj.dbDataRows = Ti.App.dbConn.execute(qry);
			while(commonObj.dbDataRows.isValidRow()){
				commonObj.iTotalPage++;
					  commonObj.dbDataRows.next();
			}
			commonObj.dbDataRows.close();
			//commonObj.db.close();
			*/
			commonObj.dbDataRows = Ti.App.dbConn.execute("SELECT Count(*) as TotalRecords FROM (" + qry + ")");
			while (commonObj.dbDataRows.isValidRow()) {
				commonObj.iTotalPage = commonObj.dbDataRows.fieldByName("TotalRecords");
				commonObj.dbDataRows.next();
			}
			commonObj.dbDataRows.close();
			if (Ti.App.iPaginationLimit > 0) {
				commonObj.iTotalPage = Math.ceil(commonObj.iTotalPage / Ti.App.iPaginationLimit);//50); 
			}

			//commonObj.iTotalPage = Math.ceil(commonObj.iTotalPage/Ti.App.iPaginationLimit);//50); 
			return commonObj.iTotalPage;
		} catch (e) {
			//COMMON.Log('error '+e);
			return 0;
		}
	},
	getTotalPageold22112019: function (qry) {
		try {
			commonObj.iTotalPage = 0;
			//commonObj.db = commonObj.dbConnectionObj.createDataBaseConnection();
			//COMMON.Log('getTotalPage qry '+qry);
			commonObj.dbDataRows = Ti.App.dbConn.execute(qry);
			while (commonObj.dbDataRows.isValidRow()) {
				commonObj.iTotalPage++;
				commonObj.dbDataRows.next();
			}
			commonObj.dbDataRows.close();
			//commonObj.db.close();
			if (Ti.App.iPaginationLimit > 0) {
				commonObj.iTotalPage = Math.ceil(commonObj.iTotalPage / Ti.App.iPaginationLimit);//50); 
			}

			//commonObj.iTotalPage = Math.ceil(commonObj.iTotalPage/Ti.App.iPaginationLimit);//50); 
			return commonObj.iTotalPage;
		} catch (e) {
			//COMMON.Log('error '+e);
			return 0;
		}
	},
	initPagination: function () {
		try {
			mController.initPagination();
		} catch (e) { }
		return true;
	},
	FinalizePagination: function () {
		try {
			bGroupOptionChecking = false;
			bGroupOptionCheckingForm = false;
			mController.FinalizePagination();
		} catch (e) { }
		return true;
	},
	IsColorConfig: function (screenName) {
		//return false;//SHH
		try {
			sCondArr = [];
			sCondArr = Titanium.App.Properties.getList('ColorConfig_' + screenName);
			if (sCondArr.length > 0) {
				return true;
			} else {
				return false;
			}
		} catch (e) {
			return false;
		}
	},
	getColorConfigWithLabel: function (screenName, DataMember, dataValue, item, sLabel) {
		/******** no need for Warburg ****/
		//return 'transparent';
		/*********************************/
		//var ConditionFieldValue = '', CForeColor = '', CBackColor = 'transparent';
		ConditionFieldValue = ''; CForeColor = ''; CBackColor = 'transparent';
		//COMMON.Log(screenName + ' - ' + DataMember + ' - ' + dataValue);
		try {
			//var sCondArr = COMMONMODEL.CheckColorConfig(screenName, DataMember);
			sCondArr = [];
			sCondArr = Titanium.App.Properties.getList('ColorConfig_' + screenName);
			if (sCondArr == null || sCondArr == undefined || sCondArr == '') {
				return 'transparent';
			}
			if (sCondArr.length > 0) {
                /*
                //CHECKING FROM inside CreateUI method
                commonObj.IsFieldExists = false;
                for(var condCtr=0; condCtr<sCondArr.length; condCtr++){
                    tmpFieldVal = sCondArr[condCtr].FieldName;
                    if(DataMember.toUpperCase() == tmpFieldVal.toUpperCase()){
                        commonObj.IsFieldExists = true;     
                    }
                }   
                if(commonObj.IsFieldExists == false){
                    return 'transparent';
                }*/
                /*
                var data1 = sCondArr;//JSON.parse(arr);
                commonObj.formDataIndex = data1.map(function(d) { return d['FieldName']; }).indexOf(DataMember.toUpperCase());
                if(commonObj.formDataIndex < 0){
                    sCondArr = [];
                }*/
				var bISNumberCheck = false;
				DataMemberValue = dataValue;
				try {
					//COMMON.Log('12152 DataMemberValue '+DataMemberValue);
					if (DataMemberValue.toString().indexOf("%") > -1) {
						bISNumberCheck = true;
						//COMMON.Log('12154 DataMemberValue '+DataMemberValue);
						DataMemberValue = DataMemberValue.replace("%", "");
						//DataMemberValue = DataMemberValue;
					}
					//COMMON.Log('12158 DataMemberValue '+DataMemberValue);
				} catch (e) {
				     //COMMON.Log('12159 e '+ e);
				}
				for (var condCtr = 0; condCtr < sCondArr.length; condCtr++) {
					ConditionFieldValue = '';
					//if(sCondArr[condCtr].ConditionField != '' && sCondArr[condCtr].ConditionField != null){
					//COMMON.Log('COLOR CONFIG COND ---> ' + DataMember + ' == ' + sCondArr[condCtr].FieldName + ' && ' +  sCondArr[condCtr].ConditionField  + ' == ' + sCondArr[condCtr].ConditionValue);
					tmpFieldVal = sCondArr[condCtr].FieldName;
					tmpFieldVal = (tmpFieldVal == null || tmpFieldVal == undefined) ? '' : tmpFieldVal;
					if (DataMember.toUpperCase() == tmpFieldVal.toUpperCase()) {
						if (sCondArr[condCtr].ConditionField != '' && sCondArr[condCtr].ConditionField != null) {
							//var ConditionField = sCondArr[condCtr].ConditionField;
							//ConditionFieldValue = item.fieldByName(ConditionField);
							ConditionFieldValue = item.fieldByName(sCondArr[condCtr].ConditionField);
						} else {
							ConditionFieldValue = sCondArr[condCtr].ConditionValue;
						}
						//COMMON.Log('COLOR CONFIG COND ---> sCondArr[condCtr].Condition - ' + sCondArr[condCtr].Condition + ' == ConditionFieldValue - ' + ConditionFieldValue);
						if (sCondArr[condCtr].Condition == '>') {
							CForeColor = 'transparent';
							CBackColor = 'transparent';
							CForeColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CForeColor);
							//sLabel.color = CForeColor; 
							if (tmpFieldVal.toUpperCase() == 'ROWCOLOR' && parseInt(ConditionFieldValue) > parseInt(sCondArr[condCtr].ConditionValue)) {
								//COMMON.Log('13742 DataMemberValue ' +tmpFieldVal);
								CForeColor = 'transparent';
								CBackColor = 'transparent';
								CBackColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CBackColor);
								var _tmpRow = dColorConfigRow;
								_tmpRow.backgroundColor = CBackColor;
								return CBackColor;
								/* }else if(tmpFieldVal.toUpperCase() == 'ROWCOLOR' && parseInt(ConditionFieldValue) < parseInt(sCondArr[condCtr].ConditionValue) || parseInt(ConditionFieldValue) == parseInt(sCondArr[condCtr].ConditionValue)){
									 CForeColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CForeColor);
									 sLabel.color = CForeColor; 
									 CForeColor = 'transparent';
									 CBackColor = 'transparent';
									 return CBackColor;*/
							}
                            /*if(DataMemberValue > ConditionFieldValue){
                                CForeColor = 'transparent';
                                CBackColor = 'transparent';
                                CForeColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CForeColor);
                                CBackColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CBackColor);
                                sLabel.color = CForeColor;
                                if(tmpFieldVal.toUpperCase() == 'ROWCOLOR' && (ConditionFieldValue < sCondArr[condCtr].ConditionValue || parseInt(ConditionFieldValue) > parseInt(sCondArr[condCtr].ConditionValue))){
                                    CForeColor = 'transparent';
                                    CBackColor = 'transparent';
                                    CForeColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CForeColor);
                                    CBackColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CBackColor);
                                    var _tmpRow = dColorConfigRow;
                                    _tmpRow.backgroundColor = CBackColor;
                                }else if(sCondArr[condCtr].CRowColor == 1 || sCondArr[condCtr].CRowColor == '1'){
                                    //CBackColor = '#33ff77';//P&G
                                    var _tmpRow = dColorConfigRow;//ArrayOperations.prototype.getRowByIndex(dColorConfigRowIndex);
                                    _tmpRow.backgroundColor = CBackColor;//'#33ff77';//'#9FC2F5';//'#3333ff';//'#009900';//'#F6921E';
                                    CForeColor = 'transparent';
                                    CBackColor = 'transparent';
                                }
                                CBackColor = 'transparent';
                            }*/

							if (DataMemberValue != '' && ConditionFieldValue != '') {
								//COMMON.Log('13780 ');
								if ((bISNumberCheck == true && parseInt(DataMemberValue) > parseInt(ConditionFieldValue)) || DataMemberValue > ConditionFieldValue) {
									//COMMON.Log('13780 DataMemberValue '+DataMemberValue+' ConditionFieldValue '+ConditionFieldValue);
									CForeColor = 'transparent';
									CBackColor = 'transparent';
									//COMMON.Log('sCondArr[condCtr].CForeColor '+sCondArr[condCtr].CForeColor);
									//COMMON.Log('sCondArr[condCtr].CBackColor '+sCondArr[condCtr].CBackColor);
									CForeColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CForeColor);
									CBackColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CBackColor);
									//COMMON.Log('CForeColor '+CForeColor);
									//COMMON.Log('CBackColor '+CBackColor);
									sLabel.color = CForeColor;
									if ((sCondArr[condCtr].CRowColor == 1 || sCondArr[condCtr].CRowColor == '1')) {
										//CBackColor = '#33ff77';//P&G
										var _tmpRow = dColorConfigRow;//ArrayOperations.prototype.getRowByIndex(dColorConfigRowIndex);
										_tmpRow.backgroundColor = CBackColor;//'#33ff77';//'#9FC2F5';//'#3333ff';//'#009900';//'#F6921E';
										CForeColor = 'transparent';
										CBackColor = 'transparent';
									}
									//CBackColor = 'transparent';
									//return CBackColor;
								}
							}
						} else if (sCondArr[condCtr].Condition == '<') {
							//COMMON.Log('13800 <');
							CForeColor = 'transparent';
							CBackColor = 'transparent';
							if (tmpFieldVal.toUpperCase() == 'ROWCOLOR' && parseInt(ConditionFieldValue) < parseInt(sCondArr[condCtr].ConditionValue)) {
								//COMMON.Log('13804 <');
								CForeColor = 'transparent';
								CBackColor = 'transparent';
								CForeColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CForeColor);
								CBackColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CBackColor);
								sLabel.color = CForeColor;
								var _tmpRow = dColorConfigRow;
								_tmpRow.backgroundColor = CBackColor;
								return CBackColor;
								/* }else if(tmpFieldVal.toUpperCase() == 'ROWCOLOR' && parseInt(ConditionFieldValue) > parseInt(sCondArr[condCtr].ConditionValue) || parseInt(ConditionFieldValue) == parseInt(sCondArr[condCtr].ConditionValue)){
									 CForeColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CForeColor);
									 CBackColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CBackColor);
									 sLabel.color = CForeColor;
									 CForeColor = 'transparent';
									 CBackColor = 'transparent';
									 return CBackColor;*/
							}
                            /*if(DataMemberValue < ConditionFieldValue){
                                CForeColor = 'transparent';
                                CBackColor = 'transparent';
                                CForeColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CForeColor);
                                CBackColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CBackColor);
                                sLabel.color = CForeColor;
                                if(tmpFieldVal.toUpperCase() == 'ROWCOLOR' && (ConditionFieldValue < sCondArr[condCtr].ConditionValue || parseInt(ConditionFieldValue) < parseInt(sCondArr[condCtr].ConditionValue))){
                                    CForeColor = 'transparent';
                                    CBackColor = 'transparent';
                                    CForeColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CForeColor);
                                    CBackColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CBackColor);
                                    var _tmpRow = dColorConfigRow;
                                    _tmpRow.backgroundColor = CBackColor;
                                }else if(sCondArr[condCtr].CRowColor == 1 || sCondArr[condCtr].CRowColor == '1'){
                                    //CBackColor = '#33ff77';//P&G
                                    var _tmpRow = dColorConfigRow;//ArrayOperations.prototype.getRowByIndex(dColorConfigRowIndex);
                                    _tmpRow.backgroundColor = CBackColor;//'#33ff77';//'#9FC2F5';//'#3333ff';//'#009900';//'#F6921E';
                                    CForeColor = 'transparent';
                                    CBackColor = 'transparent';
                                }
                                CBackColor = 'transparent';
                            }*/

							//COMMON.Log('13843 DataMemberValue '+DataMemberValue+' ConditionFieldValue '+ConditionFieldValue);
							if (DataMemberValue != '' && ConditionFieldValue != '') {
								//if(parseInt(DataMemberValue) < parseInt(ConditionFieldValue)){
									//COMMON.Log('13846 bISNumberCheck '+bISNumberCheck);
								if ((bISNumberCheck == true && parseInt(DataMemberValue) < parseInt(ConditionFieldValue)) || DataMemberValue < ConditionFieldValue) {
									//COMMON.Log('13849 ');
									CForeColor = 'transparent';
									CBackColor = 'transparent';
									CForeColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CForeColor);
									CBackColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CBackColor);
									sLabel.color = CForeColor;
									if ((sCondArr[condCtr].CRowColor == 1 || sCondArr[condCtr].CRowColor == '1')) {
										//CBackColor = '#33ff77';//P&G
										var _tmpRow = dColorConfigRow;//ArrayOperations.prototype.getRowByIndex(dColorConfigRowIndex);
										_tmpRow.backgroundColor = CBackColor;//'#33ff77';//'#9FC2F5';//'#3333ff';//'#009900';//'#F6921E';
										CForeColor = 'transparent';
										CBackColor = 'transparent';
									}
									//CBackColor = 'transparent';
									//return CBackColor;
								}
							}
						} else if (sCondArr[condCtr].Condition == '=') {
							//COMMON.Log('13867 ');
							if (tmpFieldVal.toUpperCase() == 'ROWCOLOR' && parseInt(ConditionFieldValue) == NaN && parseInt(sCondArr[condCtr].ConditionValue) == NaN && ConditionFieldValue != sCondArr[condCtr].ConditionValue) {
								CForeColor = 'transparent';
								CBackColor = 'transparent';
								return CBackColor;
							}
							if (tmpFieldVal.toUpperCase() == 'ROWCOLOR' && ConditionFieldValue == sCondArr[condCtr].ConditionValue) {
								//COMMON.Log('13874 ');
								CForeColor = 'transparent';
								CBackColor = 'transparent';
								CForeColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CForeColor);
								CBackColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CBackColor);
								sLabel.color = CForeColor;
								var _tmpRow = dColorConfigRow;
								_tmpRow.backgroundColor = CBackColor;
								//COMMON.Log('ROWCOLOR'+CBackColor);
								return CBackColor;
							}

							if (DataMemberValue != '' && ConditionFieldValue != '') {
								//COMMON.Log('13887 ');
								//if(parseInt(DataMemberValue) === parseInt(ConditionFieldValue)){
								try {
									if ((bISNumberCheck == true && parseFloat(DataMemberValue) === parseFloat(ConditionFieldValue)) || DataMemberValue === ConditionFieldValue || parseFloat(DataMemberValue) === parseFloat(ConditionFieldValue)) {
										//COMMON.Log('DataMemberValue '+DataMemberValue+' ConditionFieldValue '+ConditionFieldValue);
										//COMMON.Log('13892 ');
										CForeColor = 'transparent';
										CBackColor = 'transparent';
										//COMMON.Log('sCondArr[condCtr].CForeColor '+sCondArr[condCtr].CForeColor);
										//COMMON.Log('sCondArr[condCtr].CBackColor '+sCondArr[condCtr].CBackColor);
										CForeColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CForeColor);
										CBackColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CBackColor);
										//COMMON.Log('CForeColor '+CForeColor);
										//COMMON.Log('CBackColor '+CBackColor);
										sLabel.color = CForeColor;
										if ((sCondArr[condCtr].CRowColor == 1 || sCondArr[condCtr].CRowColor == '1')) {
											//CBackColor = '#33ff77';//P&G
											var _tmpRow = dColorConfigRow;//ArrayOperations.prototype.getRowByIndex(dColorConfigRowIndex);
											_tmpRow.backgroundColor = CBackColor;//'#33ff77';//'#9FC2F5';//'#3333ff';//'#009900';//'#F6921E';
											CForeColor = 'transparent';
											CBackColor = 'transparent';
										}
										//CBackColor = 'transparent';
										//return CBackColor;
									}
								} catch (e) {
								}

							}

						}

						if (ConditionFieldValue == '') {
							//COMMON.Log('13916 ');
							CForeColor = 'transparent';
							CBackColor = 'transparent';
						}


					} else {
						//COMMON.Log('13923 ');
						CForeColor = 'transparent';
						CBackColor = 'transparent';
					}


				}
				//COMMON.Log('CBackColor '+CBackColor);
				if(CBackColor ==''){
					CBackColor = 'transparent';
				}
				
			}
		} catch (e) {
			CBackColor = 'transparent';
		}
		//COMMON.Log('CForeColor : ' + CForeColor + ' - CBackColor : ' + CBackColor);
		return CBackColor;
	},
	getColorConfig: function (screenName, DataMember, dataValue, item) {
		/******** no need for Warburg ****/
		//return 'transparent';
		/*********************************/
		//var ConditionFieldValue = '', CForeColor = '', CBackColor = 'transparent';
		ConditionFieldValue = ''; CForeColor = ''; CBackColor = 'transparent';
		//COMMON.Log(screenName + ' - ' + DataMember + ' - ' + dataValue);
		try {
			//var sCondArr = COMMONMODEL.CheckColorConfig(screenName, DataMember);
			sCondArr = [];
			sCondArr = Titanium.App.Properties.getList('ColorConfig_' + screenName);
			if (sCondArr == null || sCondArr == undefined || sCondArr == '') {
				return 'transparent';
			}
			if (sCondArr.length > 0) {
                /*
                //CHECKING FROM inside CreateUI method
                commonObj.IsFieldExists = false;
                for(var condCtr=0; condCtr<sCondArr.length; condCtr++){
                    tmpFieldVal = sCondArr[condCtr].FieldName;
                    if(DataMember.toUpperCase() == tmpFieldVal.toUpperCase()){
                        commonObj.IsFieldExists = true;     
                    }
                }   
                if(commonObj.IsFieldExists == false){
                    return 'transparent';
                }*/
                /*
                var data1 = sCondArr;//JSON.parse(arr);
                commonObj.formDataIndex = data1.map(function(d) { return d['FieldName']; }).indexOf(DataMember.toUpperCase());
                if(commonObj.formDataIndex < 0){
                    sCondArr = [];
                }*/
				DataMemberValue = dataValue;
				//COMMON.Log('DataMemberValue '+DataMemberValue);
				
				for (var condCtr = 0; condCtr < sCondArr.length; condCtr++) {
					ConditionFieldValue = '';
					//if(sCondArr[condCtr].ConditionField != '' && sCondArr[condCtr].ConditionField != null){
					//COMMON.Log('COLOR CONFIG COND ---> ' + DataMember + ' == ' + sCondArr[condCtr].FieldName + ' && ' +  sCondArr[condCtr].ConditionField  + ' == ' + sCondArr[condCtr].ConditionValue);
					tmpFieldVal = sCondArr[condCtr].FieldName;
					tmpFieldVal = (tmpFieldVal == null || tmpFieldVal == undefined) ? '' : tmpFieldVal;
					if (DataMember.toUpperCase() == tmpFieldVal.toUpperCase()) {
						if (sCondArr[condCtr].ConditionField != '' && sCondArr[condCtr].ConditionField != null) {
							//var ConditionField = sCondArr[condCtr].ConditionField;
							//ConditionFieldValue = item.fieldByName(ConditionField);
							
							if(Ti.App.sDeviceOSName == 'iphone' || (Ti.version >= '8.9.9')){
								var length = item.fieldCount;
								//COMMON.Log('dbDataRows.isValidRow() length ---> ' + length);
								for (var dbCtr = 0; dbCtr < length; dbCtr++) {
									if(item.fieldName(dbCtr).toUpperCase() == sCondArr[condCtr].ConditionField.toUpperCase()){
										ConditionFieldValue = item.fieldByName(sCondArr[condCtr].ConditionField);
										dbCtr = length;
									}
									//systemTableConfig[dbDataRows.fieldName(ctr).toUpperCase()] = dbDataRows.field(ctr);
								}
							}else{
								ConditionFieldValue = item.fieldByName(sCondArr[condCtr].ConditionField);
							}
						} else {
							ConditionFieldValue = sCondArr[condCtr].ConditionValue;
						}
						if (sCondArr[condCtr].Condition == '>') {
							CForeColor = 'transparent';
							CBackColor = 'transparent';
							if (tmpFieldVal.toUpperCase() == 'ROWCOLOR' && parseInt(ConditionFieldValue) > parseInt(sCondArr[condCtr].ConditionValue)) {
								CForeColor = 'transparent';
								CBackColor = 'transparent';
								CForeColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CForeColor);
								CBackColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CBackColor);
								var _tmpRow = dColorConfigRow;
								_tmpRow.backgroundColor = CBackColor;
								return CBackColor;
							} else if (tmpFieldVal.toUpperCase() == 'ROWCOLOR' && parseInt(ConditionFieldValue) < parseInt(sCondArr[condCtr].ConditionValue) || parseInt(ConditionFieldValue) == parseInt(sCondArr[condCtr].ConditionValue)) {
								CForeColor = 'transparent';
								CBackColor = 'transparent';
								return CBackColor;
							}

							//COMMON.Log('DataMemberValue>-----'+DataMemberValue);
							//COMMON.Log('DataMemberValue>-----'+ConditionFieldValue);
							if (DataMemberValue > ConditionFieldValue && DataMemberValue != 0) {
								//COMMON.Log('inside>-----');
								CForeColor = 'transparent';
								CBackColor = 'transparent';
								CForeColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CForeColor);
								CBackColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CBackColor);
								if (tmpFieldVal.toUpperCase() == 'ROWCOLOR' && (ConditionFieldValue < sCondArr[condCtr].ConditionValue || parseInt(ConditionFieldValue) > parseInt(sCondArr[condCtr].ConditionValue))) {
									CForeColor = 'transparent';
									CBackColor = 'transparent';
									CForeColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CForeColor);
									CBackColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CBackColor);
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
						} else if (sCondArr[condCtr].Condition == '<') {
							CForeColor = 'transparent';
							CBackColor = 'transparent';
							if (tmpFieldVal.toUpperCase() == 'ROWCOLOR' && parseInt(ConditionFieldValue) < parseInt(sCondArr[condCtr].ConditionValue)) {
								CForeColor = 'transparent';
								CBackColor = 'transparent';
								CForeColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CForeColor);
								CBackColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CBackColor);
								var _tmpRow = dColorConfigRow;
								_tmpRow.backgroundColor = CBackColor;
								return CBackColor;
							} else if (tmpFieldVal.toUpperCase() == 'ROWCOLOR' && parseInt(ConditionFieldValue) > parseInt(sCondArr[condCtr].ConditionValue) || parseInt(ConditionFieldValue) == parseInt(sCondArr[condCtr].ConditionValue)) {
								CForeColor = 'transparent';
								CBackColor = 'transparent';
								return CBackColor;
							}
							if (DataMemberValue < ConditionFieldValue && DataMemberValue != 0) {
								CForeColor = 'transparent';
								CBackColor = 'transparent';
								CForeColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CForeColor);
								CBackColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CBackColor);
								if (tmpFieldVal.toUpperCase() == 'ROWCOLOR' && (ConditionFieldValue < sCondArr[condCtr].ConditionValue || parseInt(ConditionFieldValue) < parseInt(sCondArr[condCtr].ConditionValue))) {
									CForeColor = 'transparent';
									CBackColor = 'transparent';
									CForeColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CForeColor);
									CBackColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CBackColor);
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
						} else if (sCondArr[condCtr].Condition == '=') {
							if (tmpFieldVal.toUpperCase() == 'ROWCOLOR' && parseInt(ConditionFieldValue) == NaN && parseInt(sCondArr[condCtr].ConditionValue) == NaN && ConditionFieldValue != sCondArr[condCtr].ConditionValue) {
								CForeColor = 'transparent';
								CBackColor = 'transparent';
								return CBackColor;
							}
							if (tmpFieldVal.toUpperCase() == 'ROWCOLOR' && ConditionFieldValue == sCondArr[condCtr].ConditionValue) {
								CForeColor = 'transparent';
								CBackColor = 'transparent';
								CForeColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CForeColor);
								CBackColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CBackColor);
								var _tmpRow = dColorConfigRow;
								_tmpRow.backgroundColor = CBackColor;
								return CBackColor;
							}

							if (DataMemberValue != '' && ConditionFieldValue != '') {
								if (DataMemberValue === ConditionFieldValue) {
									//COMMON.Log('DataMemberValue '+DataMemberValue+' ConditionFieldValue '+ConditionFieldValue);
									CForeColor = 'transparent';
									CBackColor = 'transparent';
									CForeColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CForeColor);
									CBackColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CBackColor);
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


					} else {
						CForeColor = 'transparent';
						CBackColor = 'transparent';
					}


				}
			}
		} catch (e) {
			CBackColor = 'transparent';
		}
		//COMMON.Log('CForeColor : ' + CForeColor + ' - CBackColor : ' + CBackColor);
		return CBackColor;
	},
	getColorConfigOLD: function (screenName, DataMember, dataValue, item) {
		/******** no need for Warburg ****/
		//return 'transparent';
		/*********************************/
		//var ConditionFieldValue = '', CForeColor = '', CBackColor = 'transparent';
		ConditionFieldValue = ''; CForeColor = ''; CBackColor = 'transparent';
		//COMMON.Log(screenName + ' - ' + DataMember + ' - ' + dataValue);
		try {
			//var sCondArr = COMMONMODEL.CheckColorConfig(screenName, DataMember);
			sCondArr = [];
			sCondArr = Titanium.App.Properties.getList('ColorConfig_' + screenName);
			if (sCondArr == null || sCondArr == undefined || sCondArr == '') {
				return 'transparent';
			}
			if (sCondArr.length > 0) {
				/*
				//CHECKING FROM inside CreateUI method
				commonObj.IsFieldExists = false;
				for(var condCtr=0; condCtr<sCondArr.length; condCtr++){
					tmpFieldVal = sCondArr[condCtr].FieldName;
					if(DataMember.toUpperCase() == tmpFieldVal.toUpperCase()){
						commonObj.IsFieldExists = true;		
					}
				}	
				if(commonObj.IsFieldExists == false){
					return 'transparent';
				}*/
				/*
				var data1 = sCondArr;//JSON.parse(arr);
				commonObj.formDataIndex = data1.map(function(d) { return d['FieldName']; }).indexOf(DataMember.toUpperCase());
				if(commonObj.formDataIndex < 0){
					sCondArr = [];
				}*/
				DataMemberValue = dataValue;
				for (var condCtr = 0; condCtr < sCondArr.length; condCtr++) {
					ConditionFieldValue = '';
					//if(sCondArr[condCtr].ConditionField != '' && sCondArr[condCtr].ConditionField != null){
					//COMMON.Log('COLOR CONFIG COND ---> ' + DataMember + ' == ' + sCondArr[condCtr].FieldName + ' && ' +  sCondArr[condCtr].ConditionField  + ' == ' + sCondArr[condCtr].ConditionValue);
					tmpFieldVal = sCondArr[condCtr].FieldName;
					tmpFieldVal = (tmpFieldVal == null || tmpFieldVal == undefined) ? '' : tmpFieldVal;
					if (DataMember.toUpperCase() == tmpFieldVal.toUpperCase()) {
						if (sCondArr[condCtr].ConditionField != '' && sCondArr[condCtr].ConditionField != null) {
							//var ConditionField = sCondArr[condCtr].ConditionField;
							//ConditionFieldValue = item.fieldByName(ConditionField);
							ConditionFieldValue = item.fieldByName(sCondArr[condCtr].ConditionField);
						} else {
							ConditionFieldValue = sCondArr[condCtr].ConditionValue;
						}
						if (sCondArr[condCtr].Condition == '>') {
							if (DataMemberValue > ConditionFieldValue) {
								CForeColor = 'transparent';
								CBackColor = 'transparent';
								CForeColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CForeColor);
								CBackColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CBackColor);
								if (sCondArr[condCtr].CRowColor == 1 || sCondArr[condCtr].CRowColor == '1') {
									//CBackColor = '#33ff77';//P&G
									var _tmpRow = dColorConfigRow;//ArrayOperations.prototype.getRowByIndex(dColorConfigRowIndex);
									_tmpRow.backgroundColor = CBackColor;//'#33ff77';//'#9FC2F5';//'#3333ff';//'#009900';//'#F6921E';
									CForeColor = 'transparent';
									CBackColor = 'transparent';
								}
							}
						} else if (sCondArr[condCtr].Condition == '<') {
							if (DataMemberValue < ConditionFieldValue) {
								CForeColor = 'transparent';
								CBackColor = 'transparent';
								CForeColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CForeColor);
								CBackColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CBackColor);
								if (sCondArr[condCtr].CRowColor == 1 || sCondArr[condCtr].CRowColor == '1') {
									//CBackColor = '#33ff77';//P&G
									var _tmpRow = dColorConfigRow;//ArrayOperations.prototype.getRowByIndex(dColorConfigRowIndex);
									_tmpRow.backgroundColor = CBackColor;//'#33ff77';//'#9FC2F5';//'#3333ff';//'#009900';//'#F6921E';
									CForeColor = 'transparent';
									CBackColor = 'transparent';
								}
							}
						} else if (sCondArr[condCtr].Condition == '=') {
							if (DataMemberValue === ConditionFieldValue) {
								CForeColor = 'transparent';
								CBackColor = 'transparent';
								CForeColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CForeColor);
								CBackColor = ArrayOperations.prototype.argbToRGB(sCondArr[condCtr].CBackColor);
								if (sCondArr[condCtr].CRowColor == 1 || sCondArr[condCtr].CRowColor == '1') {
									//CBackColor = '#33ff77';//P&G
									var _tmpRow = dColorConfigRow;//ArrayOperations.prototype.getRowByIndex(dColorConfigRowIndex);
									_tmpRow.backgroundColor = CBackColor;//'#33ff77';//'#9FC2F5';//'#3333ff';//'#009900';//'#F6921E';
									CForeColor = 'transparent';
									CBackColor = 'transparent';
								}
							}
						}
					} else {
						CForeColor = 'transparent';
						CBackColor = 'transparent';
					}
				}
			}
		} catch (e) {
			CBackColor = 'transparent';
		}
		//COMMON.Log('CBackColor : ' + CBackColor);
		return CBackColor;
	},
	formatQueryString: function (qry, queryName) {
		if (mView != null) {
			return mView.formatQueryString(qry, queryName);
		}
		return qry;
	},
	getCustFieldValue: function (key) {
		commonObj.arr = Titanium.App.Properties.getList('CUST_FIELDS');
		if (commonObj.arr.length > 0) {
			return commonObj.arr[0][key];
		} else {
			return '';
		}
	},
	reportError: function (path) {

	},
	FormatDataMember: function (sValue, dataMemberType) {
		if (dataMemberType == 'STRING' || dataMemberType == '') {
			return sValue;
		}
		if (dataMemberType == 'DATE') {
			if (sValue != null && sValue != '') {
				sValue = Ti.App.DATEFORMAT.formatDate(sValue, systemTableConfig['DateFormatString'.toUpperCase()]);
			} else {
				sValue = '';
			}
		} else if (dataMemberType == 'DATETIME') {
			if (sValue != null && sValue != '') {
				sValue = Ti.App.DATEFORMAT.formatDate(sValue, systemTableConfig['DateTimeFormatString'.toUpperCase()]);
			} else {
				sValue = '';
			}
		} else if (dataMemberType == 'TIME') {
			if (sValue != null && sValue != '') {
				sValue = Ti.App.DATEFORMAT.formatDate(sValue, systemTableConfig['TimeFormatString'.toUpperCase()]);
			} else {
				sValue = '';
			}
		} else if (dataMemberType == 'QTYDESC') {
			/*
			if(HeaderDetails[ctr].columnWidth != 0 && HeaderDetails[ctr].columnWidth != '0' && HeaderDetails[ctr].columnWidth != ''){
				
				var sDataMember = HeaderDetails[ctr].DataMember;
				//ItemId$$InvnQty
				sDataMember = sDataMember.split("$$");
				
				if(sDataMember.length>0){
					//this.getSystemValue('QtyRoundingDigits');
					//DBCOMMON.getUOMDescription(item.fieldByName(sDataMember[0]), item.fieldByName(sDataMember[1]));
					dataValue = COMMONMODEL.getUOMDescription(item.fieldByName(sDataMember[0]), item.fieldByName(sDataMember[1]), this.getSystemValue('QtyRoundingDigits'));	
				}
				//dataValue = Ti.App.DATEFORMAT.formatDate(item.fieldByName(HeaderDetails[ctr].DataMember), systemTableConfig['TimeFormatString'.toUpperCase()]);
			}*/
		} else if (dataMemberType == 'CURRENCY') {
			sValue = this.getSystemValue('Currency') + ' ' + Ti.App.NUMBER.roundNumber(sValue, 2);
			/*sValue = Ti.App.NUMBER.roundNumber(sValue, 2);
			sValue = sValue.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
			sValue = this.getSystemValue('Currency') + ' ' + sValue;
			*/
		} else if (dataMemberType == 'AMOUNTFORMAT') {
			try {
				sValue = Ti.App.NUMBER.roundNumber(sValue, this.getSystemValue('AmountRoundingDigits'));
			} catch (e) { }
		} else if (dataMemberType == 'PRICEFORMAT') {
			try {
				sValue = Ti.App.NUMBER.roundNumber(sValue, this.getSystemValue('PriceRoundingDigits'));
			} catch (e) { }
		} else if (dataMemberType == 'QTYFORMAT') {
			try {
				sValue = Ti.App.NUMBER.roundNumber(sValue, this.getSystemValue('QtyRoundingDigits'));
			} catch (e) { }
		} else if (dataMemberType == 'NUMBERFORMAT' || dataMemberType == 'AMOUNTNUMBERFORMAT') {
			try {
				var _strValue = sValue;
				_strValue = (_strValue == null || _strValue == undefined || _strValue == '') ? 0 : _strValue;

				if (_strValue == 0) {
					sValue = _strValue;
					if (dataMemberType == 'AMOUNTNUMBERFORMAT') {
						sValue = sValue.toFixed(this.getSystemValue('AmountRoundingDigits'));
						////COMMON.Log('10442 sValue '+sValue);
						sValue = this.getSystemValue('Currency') + ' ' + sValue;
					} else {
						sValue = sValue;
					}
				} else {
					_strValue = _strValue.toString();
					if (_strValue.indexOf('/') > -1 || _strValue.indexOf(' / ') > -1) {
						var _dataVal = "", _tmpDataVal = "";
						var arr = _strValue.split(" / ");
						if (arr.length > 0) {
							for (var i = 0; i < arr.length; i++) {
								//COMMON.Log('1. arr['+i+'] ---> ' + arr[i]);
								_tmpDataVal = Ti.App.NUMBER.roundNumber(arr[i], this.getSystemValue('AmountRoundingDigits'));
								_tmpDataVal = _tmpDataVal.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
								/*if(i==0){
									_dataVal = _tmpDataVal;
								}else{
									_dataVal = _dataVal + " / " + _tmpDataVal;
								}*/
								if (dataMemberType == 'AMOUNTNUMBERFORMAT') {
									_tmpDataVal = _tmpDataVal.toFixed(this.getSystemValue('AmountRoundingDigits'));
									////COMMON.Log('10464 sValue '+_tmpDataVal);
									if (i == 0) {
										_dataVal = this.getSystemValue('Currency') + " " + _tmpDataVal;
									} else {
										_dataVal = _dataVal + " / " + this.getSystemValue('Currency') + " " + _tmpDataVal;
									}
								} else {
									if (i == 0) {
										_dataVal = _tmpDataVal;
									} else {
										_dataVal = _dataVal + " / " + _tmpDataVal;
									}
								}
							}
						}
						var arr = _strValue.split("/");
						if (arr.length > 0) {
							for (var i = 0; i < arr.length; i++) {
								//COMMON.Log('2. arr['+i+'] ---> ' + arr[i]);
								_tmpDataVal = Ti.App.NUMBER.roundNumber(arr[i], this.getSystemValue('AmountRoundingDigits'));
								_tmpDataVal = _tmpDataVal.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
								/*if(i==0){
									_dataVal = _tmpDataVal;
								}else{
									_dataVal = _dataVal + "/" + _tmpDataVal;
								}*/
								if (dataMemberType == 'AMOUNTNUMBERFORMAT') {
									_tmpDataVal = _tmpDataVal.toFixed(this.getSystemValue('AmountRoundingDigits'));
									////COMMON.Log('10492 sValue '+_tmpDataVal);
									if (i == 0) {
										_dataVal = this.getSystemValue('Currency') + " " + _tmpDataVal;
									} else {
										_dataVal = _dataVal + " / " + this.getSystemValue('Currency') + " " + _tmpDataVal;
									}
								} else {
									if (i == 0) {
										_dataVal = _tmpDataVal;
									} else {
										_dataVal = _dataVal + " / " + _tmpDataVal;
									}
								}
							}
						}
						sValue = _dataVal;
					} else {
						//COMMON.Log('2.1_sValue ---> ' + sValue);
						sValue = Ti.App.NUMBER.roundNumber(_strValue, this.getSystemValue('AmountRoundingDigits'));//2);
						//COMMON.Log('2.2_sValue ---> ' + sValue);						
						sValue = sValue.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
						//COMMON.Log('2.3_sValue ---> ' + sValue);
						if (dataMemberType == 'AMOUNTNUMBERFORMAT') {
							sValue = sValue.toFixed(this.getSystemValue('AmountRoundingDigits'));
							////COMMON.Log('10516 sValue '+sValue);
							sValue = this.getSystemValue('Currency') + ' ' + sValue;
						} else {
							sValue = sValue;
						}
						//COMMON.Log('2.4_sValue ---> ' + sValue);						
					}
				}
			} catch (e) { }
			//COMMON.Log('LoadData CreateUI Start Time21 : ' + new Date().getTime());						
		}
		return sValue;
	},
	updateTableRowIndexByTableView: function (sTableView) {
		ArrayOperations.prototype.resetRowiIndexByTableRow();
		return "";
		try {
			commonObj.tblData = sTableView.data[0].rows;
			if (commonObj.tblData.length == 0) {
				sTableView.data = [];
				iIndex = 0;
			} else {
				var commonObjtblDatalength = commonObj.tblData.length;
				var commonObjlength = 0;
				for (var ctr = 0; ctr < commonObjtblDatalength; ctr++) {
					commonObj.row = commonObj.tblData[ctr];
					commonObj.row.iIndex = ctr;
					commonObj.row.index = ctr;
					commonObj.tblData[ctr].children[0].iIndex = ctr;
					commonObjlength = commonObj.tblData[ctr].children[0].children.length;
					for (var i = 0; i < commonObjlength; i++) {
						//COMMON.Log('tblData['+ctr+'].children[0].children['+i+'] : '+commonObj.tblData[ctr].children[0].children[i]);
						//COMMON.Log('tblData['+ctr+'].children[0].children['+i+'].iIndex ='+ctr);
						commonObj.tblData[ctr].children[0].children[i].iIndex = ctr;
					}
				}
				iIndex = commonObjtblDatalength;
			}
		} catch (e) { }
	},
	updateTableRowIndex: function () {
		try {
			commonObj.tblData = this.getAllRows(0);
			var commonObjtblDatalength = commonObj.tblData.length;
			var commonObjlength = 0;
			for (var ctr = 0; ctr < commonObjtblDatalength; ctr++) {
				commonObj.row = commonObj.tblData[ctr];
				commonObj.row.iIndex = ctr;
				commonObj.row.index = ctr;
				commonObj.tblData[ctr].children[0].iIndex = ctr;
				commonObjlength = commonObj.tblData[ctr].children[0].children.length;
				for (var i = 0; i < commonObjlength; i++) {
					//COMMON.Log('tblData['+ctr+'].children[0].children['+i+'] : '+commonObj.tblData[ctr].children[0].children[i]);
					//COMMON.Log('tblData['+ctr+'].children[0].children['+i+'].iIndex ='+ctr);
					commonObj.tblData[ctr].children[0].children[i].iIndex = ctr;
				}
			}
			iIndex = commonObjtblDatalength;
		} catch (e) { }
	},
	getViewByScreenName: function (_sScreenName) {
		try {
			var view = TableViewBasicUIObj.createBasicView(null, 'transparent', '100%', '100%', null, null, null, null, 'vertical');
			var formview = ArrayOperations.prototype.loadFormConfig(_sScreenName, []);
			if (formview != undefined) {
				if (formview.totalHeight > (Ti.App.DeviceHeight * 0.4) && _arr.length > 0) {
					formview.height = '40%';
				} else if (formview.totalHeight > Ti.App.DeviceHeight) {
					formview.height = '100%';
				} else {
					formview.height = formview.totalHeight;
				}
				view.add(formview);
			}
			ArrayOperations.prototype.loadListConfig(_sScreenName);
			var tableView = new BasicTableView().createTableView();
			tableView.backgroundColor = 'transparent';
			view.add(tableView);
			var mainQuery = ArrayOperations.prototype.getQueryConfigByScreenNameWithOrderText(_sScreenName);
			if (mainQuery != 'null' && mainQuery != null && mainQuery != undefined && mainQuery != 'undefined') {
				try {
					mainQuery = mView.formatQueryString(mainQuery, _sScreenName);
					/*** 
					 * currentQuery & paeCount used for Pagination Don't delete *
					***/
					tableView.currentQuery = mainQuery;
					tableView.pageCount = 0;
					tableView.currentPage = 0;
					tableView.tblScreenName = _sScreenName;
					/************************************/
					if (mainQuery != null && mainQuery != undefined) {
						//COMMON.Log('Main Query ---> ' + mainQuery);
						COMMON.showCustIndicator();
						var records = ArrayOperations.prototype.loadData(_sScreenName, mainQuery, 0, false);
						if (tableView != undefined && tableView != null) {
							tableView.data = records;
						}
						COMMON.hideCustIndicator();
					}
				} catch (e) { }
			}
			return view;
		} catch (e) { }
	},
	getDashboardView: function (dHeight, dWidth, sFieldName, sDataMember, sScreenName) {
		pageName = DETAILS.get('DASHBOARD_PAGE_NAME');//FORMCONFIG -> DefaultValue
		access = Ti.App.accessLevel;//DETAILS.get('DASHBOARD_ACCESS_LEVEL');
		//var db = commonObj.dbConnectionObj.createDataBaseConnection();
		Ti.App.sDashPageName = pageName;//'Main';
		var GridFunQry = '';

		//COMMON.Log('DASHBOARD : ' + sScreenName+'_FORM_DASHBOARD_'+sFieldName);

		var qry = ArrayOperations.prototype.getQueryConfigByScreenNameWithOrderText(sScreenName + "_FORM_DASHBOARD_" + sFieldName);
		if (qry != '') {
			GridFunQry = qry;

			dbDataRows = Ti.App.configDBConn.execute(qry);
			while (dbDataRows.isValidRow()) {
				access = dbDataRows.fieldByName('Access');
				dbDataRows.next();
			}
			dbDataRows.close();

			qry = "Select COUNT(*) as count from (" + qry + ")";
		} else {
			qry = "Select COUNT(Access) as count from GridFunctions where lower(PageName) = lower(" + Ti.App.SQL.safeSQL(pageName) + ") and Access = " + access + " and Language = " + Ti.App.SQL.safeSQL(this.getSystemValue('Language')) + " order by RowNo, ColNo";
		}
		//COMMON.Log('getDashboardView qry'+qry);
		totalmenu = 0;
		dbDataRows = Ti.App.configDBConn.execute(qry);
		while (dbDataRows.isValidRow()) {
			totalmenu = dbDataRows.fieldByName('count');
			dbDataRows.next();
		}
		dbDataRows.close();
		arrWorkFlowScreenStatus = []; objWF = {}; lastStatus = 1; tmpCnt = 1;
		dbDataRows = Ti.App.configDBConn.execute("select * from workflowConfig WHERE Access = " + access + " and level = 1 Order By OrderNo");
		while (dbDataRows.isValidRow()) {
			tmpCnt++;
			objWF = {};
			objWF.FlowId = dbDataRows.fieldByName('FlowId');
			objWF.FunctionName = dbDataRows.fieldByName('FunctionName');
			objWF.Status = dbDataRows.fieldByName('Status');
			arrWorkFlowScreenStatus.push(objWF);
			if (dbDataRows.fieldByName('Status') == 1 || dbDataRows.fieldByName('Status') == '1') {
				lastStatus = tmpCnt;
			}
			dbDataRows.next();
		}
		dbDataRows.close();
		FunctionText = ''; FunctionName = ''; PageNo = ''; RowNo = ''; ColNo = ''; PageName = ''; ScreenName = ''; img = '';
		dashBoardItems = new Array(); isFolder = 0; c = 0;
		lastStatusCnt = 1; item = {};
		try {


			var ImgName = '';
			if (GridFunQry == '') {
				GridFunQry = "Select FunctionText, FunctionName, PageNo, RowNo, ColNo, GridFunctions.ScreenName as ScreenName, PageName, CASE WHEN ifnull(GridFunctions.ImgName,'') = '' THEN ifnull(Functions.ImgName,'') ELSE ifnull(GridFunctions.ImgName,'') END as ImgName from GridFunctions INNER JOIN (select distinct * From Functions) Functions ON Functions.Code = GridFunctions.FunctionName where lower(PageName) = lower(" + Ti.App.SQL.safeSQL(pageName) + ") and Access = " + access + " and Language = " + Ti.App.SQL.safeSQL(this.getSystemValue('Language')) + " order by PageNo, RowNo, ColNo";
				//GridFunQry = "Select * from GridFunctions where lower(PageName) = lower(" + Ti.App.SQL.safeSQL(pageName) + ") and Access = " + access + " and Language = " + Ti.App.SQL.safeSQL(this.getSystemValue('Language')) + " order by PageNo, RowNo, ColNo";
			}
			//COMMON.Log('GridFunQry --> ' + GridFunQry);
			//dbDataRows = Ti.App.configDBConn.execute("Select * from GridFunctions where lower(PageName) = lower(" + Ti.App.SQL.safeSQL(pageName) + ") and Access = " + access + " and Language = " + Ti.App.SQL.safeSQL(this.getSystemValue('Language')) + " order by PageNo, RowNo, ColNo");
			dbDataRows = Ti.App.configDBConn.execute(GridFunQry);
			while (dbDataRows.isValidRow()) {
				FunctionText = dbDataRows.fieldByName('FunctionText');
				FunctionName = dbDataRows.fieldByName('FunctionName');
				PageNo = dbDataRows.fieldByName('PageNo');
				RowNo = dbDataRows.fieldByName('RowNo');
				ColNo = dbDataRows.fieldByName('ColNo');
				ScreenName = dbDataRows.fieldByName('ScreenName');
				PageName = dbDataRows.fieldByName('PageName');
				isFolder = (FunctionName == 'Folder') ? 1 : 0;
				//img = PageName.toUpperCase() + "_" + access + "_" + PageNo + "_" + RowNo + "_" + ColNo;
				img = PageName + "_" + access + "_" + PageNo + "_" + RowNo + "_" + ColNo;
				//img = "MAIN_1_" + PageNo + "_" + RowNo + "_" + ColNo;
				if (isFolder == 1) {
					//PageName = PageName.toUpperCase() + "-" + PageNo + RowNo + ColNo;
					//COMMON.Log("Select * FROM GridFunctions where lower(PageName) = lower(" + Ti.App.SQL.safeSQL(FunctionText) + ") and Access = " + access + " and Language = " + Ti.App.SQL.safeSQL(this.getSystemValue('Language')) + "");
					var dbDataRows1 = Ti.App.configDBConn.execute("Select * FROM GridFunctions where lower(PageName) = lower(" + Ti.App.SQL.safeSQL(FunctionText) + ") and Access = " + access + " and Language = " + Ti.App.SQL.safeSQL(this.getSystemValue('Language')) + "");
					if (dbDataRows1.isValidRow()) {
						PageName = FunctionText;//PageName + "-" + PageNo + RowNo + ColNo;
					} else {
						PageName = PageName + "-" + PageNo + RowNo + ColNo;
					}
					dbDataRows1.close();
				}
				item = {};
				item.FunctionName = FunctionName;
				item.FunctionText = FunctionText;
				item.PageName = PageName;
				item.ScreenName = ScreenName;
				item.isFolder = isFolder;
				item.imageName = img;
				ImgName = dbDataRows.fieldByName('ImgName');
				if (ImgName != null && ImgName != undefined && ImgName != '') {
					item.imageName = ImgName;
					item.img = Ti.App.ImageCacheObj.getImage('MobileSalesCache', ImgName);//'.png');//img + '.png',
				} else {
					item.img = Ti.App.ImageCacheObj.getImage('MobileSalesCache', img + '.simg');//'.png');//img + '.png',
				}

				//item.img = Ti.App.ImageCacheObj.getImage('MobileSalesCache',img + '.png');//img + '.png',
				lastStatusCnt++;
				item.totalmenu = totalmenu;
				dashBoardItems.push(item);
				c++;
				dbDataRows.next();
			}
			dbDataRows.close();
			//db.close();
		} catch (e) {
			//db.close();
		}
		if (dashBoardItems.length == 0) {
			return [];
		}
		cellWidth = 140; cellHeight = 140;
		IconWidth = 190; IconHeight = 190;
		dash = {};
		dash.clicked = false;
		dash.screenW = dWidth;
		dash.screenH = dHeight;
		_screenW = parseInt(dash.screenW), _screenH = parseInt(dash.screenH);
		//COMMON.Log("/************************************/");
		//COMMON.Log("WIDTH => " + _screenW + " - HEIGHT => " + _screenH + ' : ' + new Date().getTime());
		//COMMON.Log("/************************************/");
		colorSetIndex = 0;
		cellIndex = 0;
		try {
			GridView = [];
			totalIcons = dashBoardItems[0].totalmenu;
			x = 0; y = 0; iconH = 0; iconW = 0;
			sGridLabelLayout = 'center';//'left'
			/*if (_screenW > _screenH) {
				var tempWidth = 0, tmpHeight = 0;
				tempWidth = _screenW;
				tmpHeight = _screenH;
				_screenW = tmpHeight;
				_screenH = tempWidth;
				x = 3;//2;//1;//3;
				y = 3;//2;//10;//3;
			} else {
				x = 3;//2;//1;//3;
				y = 3;//2;//10;//3;
			}*/

			//Select Max(RowNo)+1 as MainGridRows, Max(ColNo)+1 as MainGridColumns From GridFunctions WHERE Access = 14
			dGridCols = 3;//this.getSystemValue('MainGridColumns');
			dGridRows = 2;//this.getSystemValue('MainGridRows');
			////COMMON.Log('dGridCols1 '+dGridCols +' '+dGridRows);
			//db = commonObj.dbConnectionObj.createDataBaseConnection();
			qry = "Select Max(RowNo)+1 as MainGridRows, Max(ColNo)+1 as MainGridColumns From GridFunctions WHERE lower(PageName) = lower(" + Ti.App.SQL.safeSQL(pageName) + ") and Access = " + access + " and Language = " + Ti.App.SQL.safeSQL(this.getSystemValue('Language'));
			//COMMON.Log('qry1 '+qry);
			dbDataRows = Ti.App.configDBConn.execute(qry);
			while (dbDataRows.isValidRow()) {
				dGridCols = dbDataRows.fieldByName('MainGridColumns');
				dGridRows = dbDataRows.fieldByName('MainGridRows');
				dbDataRows.next();
			}
			dbDataRows.close();
			////COMMON.Log('dGridCols2 '+dGridCols +' '+dGridRows);
			//bHideCreditTextPopup
			//qry = "Select Count(RowNo) as MainGridRows, Count(ColNo) as MainGridColumns From GridFunctions WHERE PageNo = 1 and lower(PageName) = lower(" + Ti.App.SQL.safeSQL(pageName) + ") and Access = " + access + " and Language = " + Ti.App.SQL.safeSQL(this.getSystemValue('Language'));
			//ParkFood
			var qry = "Select Max(RowNo)+1 as MainGridRows, Max(ColNo)+1 as MainGridColumns From GridFunctions WHERE PageNo = 1 and lower(PageName) = lower(" + Ti.App.SQL.safeSQL(pageName) + ") and Access = " + access + " and Language = " + Ti.App.SQL.safeSQL(this.getSystemValue('Language'));
			//COMMON.Log('qry2 '+qry);
			dbDataRows = Ti.App.configDBConn.execute(qry);
			while (dbDataRows.isValidRow()) {
				dGridCols = dbDataRows.fieldByName('MainGridColumns');
				dGridRows = dbDataRows.fieldByName('MainGridRows');
				dbDataRows.next();
			}
			dbDataRows.close();
			////COMMON.Log('dGridCols3 '+dGridCols +' '+dGridRows);
			//dGridCols = Math.ceil(dGridCols/2);
			//dGridRows = Math.ceil(dGridRows/3);
			////COMMON.Log('dGridCols4 '+dGridCols +' '+dGridRows);
			dGridCols = (dGridCols == 1 || dGridCols == 2) ? 3 : dGridCols;
			dGridRows = (dGridRows == 1 || dGridRows == 2) ? 3 : dGridRows;//dGridRows = (dGridRows == 1) ? 2 : dGridRows;
			////COMMON.Log('dGridCols5 '+dGridCols +' '+dGridRows);
			//db.close();
			//DEMO
			//ParkFood
			//RE-VISIT-13Jul2018
			dGridCols = 3;
			dGridRows = 3;
			////COMMON.Log("Ti.App.CustNo grid "+Ti.App.CustNo);

			//Ti.App.CustNo = (Ti.App.CustNo != '' && Ti.App.CustNo != null && Ti.App.CustNo != undefined)? Ti.App.CustNo : this.getSystemValue('CashCustNo'); 
			if (Ti.App.CustNo != null && Ti.App.CustNo != undefined && Ti.App.CustNo != '') {
				dGridCols = 3;
				dGridRows = 3;
			}
			////COMMON.Log('dGridCols '+dGridCols +' '+dGridRows);
			//dGridCols = 3;
			//dGridRows = 3;
			dGridCols = (dGridCols == null || dGridCols == undefined || dGridCols == '' || dGridCols == 0) ? 3 : dGridCols;
			dGridRows = (dGridRows == null || dGridRows == undefined || dGridRows == '' || dGridRows == 0) ? 2 : dGridRows;
			if (Ti.App.bIsDemoVersion == true) {
				dGridCols = 3;
				dGridRows = 3;
			}

			//COMMON.Log('dGridCols : ' + dGridCols + ' - dGridRows : ' + dGridRows);

			x = dGridCols;//3;
			y = dGridRows;//2;
			_screenW = _screenW - 2;//20;
			_screenH = _screenH - 2;//20;
			iconW = Math.floor(_screenW / x);
			//iconH = Math.floor((_screenH - (parseInt(Ti.App.CONFIG.get('HEADER_HEIGHT')) + parseInt(Ti.App.CONFIG.get('FOOTER_HEIGHT')) + 20)) / y);
			iconH = Math.floor(_screenH / y);
			//AUTO CALCULATION START
			//COMMON.Log('iconW : ' + iconW + ' - iconH : ' + iconH);
			cellWidth = iconW * 0.85;//0.8;
			cellHeight = iconH * 0.98;//0.8;
			if (sGridLabelLayout == 'left') {
				IconWidth = cellWidth * 0.5;
				IconHeight = cellHeight * 0.8;//140;
			} else {
				IconWidth = cellWidth * 0.98;//0.8;
				IconHeight = cellHeight * 0.65;//86;//0.65;//140;
			}
			//COMMON.Log('cellWidth : ' + cellWidth + ' - cellHeight : ' + cellHeight);
			//COMMON.Log('IconWidth : ' + IconWidth + ' - IconHeight : ' + IconHeight);
			//AUTO CALCULATION END
			tmpCnt = Math.ceil(totalIcons / (x * y));
			totalView = (totalIcons > (x * y)) ? tmpCnt : 1;
			thisView = ''; thisView1 = ''; thisView2 = ''; thisLabel = ''; dPopupCount = '';
			str = ''; newSTR1 = '';
			for (var i = 0; i < totalView; i++) {
				var IconContainer = Ti.UI.createView({
					height: '100%',
					width: '100%',
					layout: "horizontal",
					id: i,
					borderWidth: 0,
				});
				GridView.push(IconContainer);
				for (var j = 0; j < y; j++) {
					for (var k = 0; k < x; k++) {
						thisView = Ti.UI.createView({
							height: iconH,
							width: iconW,
							textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
							top: 0,
							//backgroundColor : "#e8e8e8",
							//borderWidth : 1,
						});
						str = '' + dashBoardItems[cellIndex].FunctionText;
						newSTR1 = str.replace("/n", "");
						thisView1 = Ti.UI.createView({
							backgroundColor: "transparent",//"#e8e8e8",
							//borderWidth : 1,
							//height : (cellHeight > cellWidth) ? cellWidth : cellHeight,
							//width : (cellHeight > cellWidth) ? cellWidth : cellHeight,//cellWidth,
							//height :Ti.UI.FILL, //- auto
							//width : Ti.UI.FILL, //- auto
							///height : cellHeight+50,//'auto',//iconH,
							///width : 'auto',//iconW,
							width: cellWidth,////
							height: cellHeight,//'auto',//cellHeight,////
							textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
							functionName: dashBoardItems[cellIndex].FunctionName,
							functionText: newSTR1,
							pageName: dashBoardItems[cellIndex].PageName,
							ScreenName: dashBoardItems[cellIndex].ScreenName,
							layout: (sGridLabelLayout == 'left') ? '' : 'vertical',
							zIndex: 99,
							CurrentScreenName: sScreenName,
							DashboardUIFieldName: sFieldName
							//backgroundImage : dashBoardItems[cellIndex].img,
						});
						if (dashBoardItems[cellIndex].img == null || dashBoardItems[cellIndex].img == undefined || dashBoardItems[cellIndex].img == '') {
							//thisView1.borderWidth = 1;
							//thisView1.borderColor = '#fff';
						}
						thisView1.addEventListener('touchstart', function (e) {
							if (!dash.clicked) {
								this.opacity = 0.6;
								var t = this;
								setTimeout(function () {
									t.opacity = 1;
								}, 500);
							}
						});
						thisView1.addEventListener('touchend', function (e) {
							this.opacity = 1;
						});
						//thisView1.addEventListener('singletap', function(e) {
						thisView1.addEventListener('click', function (e) {
							mController = Ti.App.currentController;
							//COMMON.Log("Ti.App.dashBoardItemClicked->" + Ti.App.dashBoardItemClicked);
							if (COMMON.avoidMultipleClick() || Ti.App.dashBoardItemClicked != false || this.ScreenName == '') {
							//if (COMMON.avoidMultipleClick() || this.ScreenName == '') {
								return;
							}

							Ti.App.DashbaordCurrentScreenName = this.CurrentScreenName;
							Ti.App.DashboardUIFieldName = this.DashboardUIFieldName;

							try{
								if(Ti.App.ArrNotificationIcon[this.ScreenName] != null && Ti.App.ArrNotificationIcon[this.ScreenName] != undefined){
									Ti.App.ArrNotificationIcon[this.ScreenName].text = '';
									Ti.App.ArrNotificationIcon[this.ScreenName].width = 0;
									Ti.App.ArrNotificationIcon[this.ScreenName].height = 0;
								}
							}catch(e){}
							
							if (this.functionName == 'Folder' || this.functionName == 'FolderBack') {
								//Titanium.App.Properties.setString('DASHBOARD_FUNCTION_NAME', this.functionName);
								//Titanium.App.Properties.setString('DASHBOARD_FUNCTION_TEXT', this.functionText);
								//Titanium.App.Properties.setString('DASHBOARD_PAGE_NAME', this.pageName);
								sDashScreenName = 'Dashboard Folder';
								Ti.App.currentWin.currentRow = null;//Ti.App.currentRow;
								Ti.App.currentWin.activatedWindow = true;
								Ti.App.currentWin.lastSelectedRow = null;//lastSelectedRow;
								Ti.App.currentRow = null;
								Ti.App.currentScreenName = sDashScreenName;
								Ti.App.bEnableAndroidBackButton = true;
								Ti.App.isDashboardScreen = false;
								COMMON.hideIndicator();
								dash.clicked = false;
								this.opacity = 1;
								//itemClicked(functionName, functionText, pageName, screenName);
								try {

									try {
										//COMMON.Log("this.functionName "+this.functionName);
										if (this.functionName == 'Folder') {
											var PDAID_ = "";
											commonObj.dbDataRows = Ti.App.dbConn.execute("select PDAID from system");
											while (commonObj.dbDataRows.isValidRow()) {
												PDAID_ = commonObj.dbDataRows.fieldByName('PDAID');
												commonObj.dbDataRows.next();
											}
											commonObj.dbDataRows.close();
											commonObj.db = Ti.App.dbConn;

											//commonObj.db.execute("Delete from SystemList where code ='FolderOpened' ");
											//commonObj.db.execute("INSERT INTO SystemList (Code, SystemValue, SystemDataType) VALUES ('FolderOpened', '1', 'bit')");

											commonObj.db.execute("Delete from DeviceSystemList where Code ='FolderOpened' ");
											commonObj.db.execute("INSERT INTO DeviceSystemList (MDTNO, Code, SystemValue, SystemDataType, Uploaded) VALUES (" + Ti.App.SQL.safeSQL(PDAID_) + ", 'FolderOpened', '1', 'bit','0')");

										}

									} catch (e) {
										//COMMON.Log("Error1 "+e);
									}
									//COMMON.Log("LINE 14470");

									mController.itemClicked(this.functionName, this.functionText, this.pageName, sDashScreenName);
								} catch (e) {
									////COMMON.Log(JSON.stringify(e));
									try {
										mController = Ti.App.currentController;
										Ti.App.currentController.setWindowFocus();// : function(_this){//Ti.App.currentWin
										Ti.App.currentController.itemClicked(this.functionName, this.functionText, this.pageName, sDashScreenName);
									} catch (e) { }
								    /*Ti.App.fireEvent('WindowCustomFocusEvent', {});
									//WindowCustomFocusEvent
									try{
										mController.itemClicked(this.functionName, this.functionText, this.pageName, sDashScreenName);
									}catch(e){}*/
								}
								return false;
							}


							sDashScreenName = this.ScreenName;

							if (Ti.App.BlockTransaction == true) {
								commonObj._dbDataRows = Ti.App.configDBConn.execute("select * from Functions where viewOnly = 0 and  (code ='" + sDashScreenName + "' or screenname ='" + sDashScreenName + "')");
								if (commonObj._dbDataRows.isValidRow()) {
									Ti.App.isDashboardScreen = false;
									Ti.App.dashBoardItemClicked = false;
									COMMON.hideIndicator();
									COMMON.showAlert("View only. Can't do any transactions.", ['OK'], null);
									return false;
								}
							}


							var sstartendwork = ArrayOperations.prototype.getSystemValue('StartEndWork');
							sstartendwork = (sstartendwork != undefined && sstartendwork != null && sstartendwork != '') ? sstartendwork : '';
							////COMMON.Log('item clicked sstartendwork '+sstartendwork);
							if (sDashScreenName.toUpperCase() == 'Synchronization'.toUpperCase() || sDashScreenName.toUpperCase() == "SendData".toUpperCase()) {

								if (COMMON.CheckBooleanField(ArrayOperations.prototype.getSystemValue('DisabledEndWorkCheck')) == false) {
									if (sstartendwork != '') {
										
										if (Ti.App.DBCOMMON.CheckData("SELECT * FROM CustVisit where upper(TransType)=upper('COLLECT LATER')") == true && Ti.App.GeneralDisable == false) {
											COMMON.showAlert("Collect Later invoices found, Cannot proceed end work.", ['OK'], null);
											return false;
										} else if (Ti.App.DBCOMMON.CheckData("select DISTINCT RouteDet.custno,C.CustNo from RouteDet Left join (select distinct CustNo  from custvisit where TransType in (Select Code from Transtype) and date(TransDate) = date('now') ) C on RouteDet.CustNo = C.CustNo where Routeno = ('"+  Ti.App.ARRAYOPERATION.getRouteNumberBydate(new Date()) +"') and C.CustNo is null") == true && Ti.App.CustvisitCheck == true) {
											COMMON.showAlert("Not visited customers found in today route, Cannot proceed end work.", ['OK'], null);
											return false;
										}else {
											commonObj._dbDataRows = Ti.App.dbConn.execute("select * from Systemlist where code ='StartEndWork' and systemvalue =1");
											if (commonObj._dbDataRows.isValidRow()) {
												COMMON.showAlert("Please Do End Work.", ['OK'], null);
												return false;
											}
										}
										//if(Ti.App.DBCOMMON.CheckData("select * from Systemlist where code ='StartEndWork' and systemvalue =1 ") == true){
										/*commonObj._dbDataRows = Ti.App.dbConn.execute("select * from Systemlist where code ='StartEndWork' and systemvalue =1");
										if(commonObj._dbDataRows.isValidRow()){
											COMMON.showAlert("Please Do End Work.", ['OK'], null);
											return false;   
										} */
									}
								}
							}


							if (sDashScreenName.toUpperCase() != 'Synchronization'.toUpperCase() && sDashScreenName.toUpperCase() != "SendData".toUpperCase()) {

								if (COMMON.CheckBooleanField(ArrayOperations.prototype.getSystemValue('DisabledSTARTWorkCheck')) == false) {

									try {
										//COMMON.Log('startwork sstartendwork '+sstartendwork);
										sstartendwork = (sstartendwork != undefined && sstartendwork != null && sstartendwork != '') ? sstartendwork : '';
										//COMMON.Log('startwork sstartendwork '+sstartendwork);
										if (sstartendwork != '') {
											commonObj._dbDataRows = Ti.App.dbConn.execute("select * from Systemlist where code ='StartEndWork' and systemvalue =0 ");
											if (commonObj._dbDataRows.isValidRow()) {
												Ti.App.isDashboardScreen = false;
												Ti.App.dashBoardItemClicked = false;
												COMMON.hideIndicator();
												COMMON.showAlert("Please Do Start Work.", ['OK'], null);
												return false;
											}
										}
										//COMMON.Log('startwork end '+sstartendwork);
									} catch (e) {
										//COMMON.Log('error :'+e);
									}
								}
							}

							dash.clicked = true;
							Ti.App.dashBoardItemClicked = true;
							sDashScreenName = this.ScreenName;
							sWFScreenName = this.ScreenName;
							commonObj.bWorkFlowEnabled = (Ti.App.arrWorkFlowScreenList.indexOf(sDashScreenName) > -1) ? true : false;
							if (commonObj.bWorkFlowEnabled == true) {//START commonObj.bWorkFlowEnabled = true;
								//var db = commonObj.dbConnectionObj.createDataBaseConnection();
								commonObj._qry = "Select * from Functions WHERE lower(ScreenName) = lower(" + Ti.App.SQL.safeSQL(sDashScreenName) + ") limit 0,1";
								commonObj._dbDataRows = Ti.App.configDBConn.execute(commonObj._qry);
								if (commonObj._dbDataRows.isValidRow()) {
									sWFScreenName = commonObj._dbDataRows.fieldByName('Code');
								}
								commonObj._dbDataRows.close();
								commonObj._dbDataRows = null;
								commonObj._qry = null;
								commonObj.bWorkFlowEnabled = false;
								commonObj._qry = "Select * from WorkFlowConfig WHERE (lower(FunctionName) = lower(" + Ti.App.SQL.safeSQL(sWFScreenName) + ") or lower(NextFunctionName) = lower(" + Ti.App.SQL.safeSQL(sWFScreenName) + ")) and Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel);
								commonObj._dbDataRows = Ti.App.configDBConn.execute(commonObj._qry);
								if (commonObj._dbDataRows.isValidRow()) {
									commonObj.bWorkFlowEnabled = true;
								}
								commonObj._dbDataRows.close();
								commonObj._dbDataRows = null;
								commonObj._qry = null;
								try {
									//CHECKING COMPLETED DATE
									//var _dbDataRows1 = db.execute("select * From WorkFlowConfig WHERE Level=1 and lower(FunctionName) = lower(" + Ti.App.SQL.safeSQL(sWFScreenName) + ") and Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel) + " and CompletedON < Date('now')");
									commonObj._dbDataRows1 = Ti.App.configDBConn.execute("select * From WorkFlowConfig WHERE lower(FunctionName) = lower(" + Ti.App.SQL.safeSQL(sWFScreenName) + ") and Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel) + " and CompletedON < Date('now','localtime','start of day')");
									if (commonObj._dbDataRows1.isValidRow()) {
										var _dt = new Date();
										_dt = Ti.App.DATEFORMAT.dbDateFormatSQLite(_dt);
										Ti.App.configDBConn.execute("Update WorkFlowConfig SET Status = 0, CompletedOn = " + Ti.App.SQL.safeSQL(_dt) + " WHERE lower(FlowType) = 'main' and Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel));
										Ti.App.configDBConn.execute("Update WorkFlowConfig SET Status = 0, CompletedOn = " + Ti.App.SQL.safeSQL(_dt) + " WHERE lower(FlowType) = lower('Customer') and Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel));
										//db.execute("Update WorkFlowConfig SET Status = 0, CompletedOn = " + Ti.App.SQL.safeSQL(_dt) + " WHERE Level=1 and lower(FunctionName) = lower(" + Ti.App.SQL.safeSQL(sWFScreenName) + ") and Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel));
										//db.execute("Update WorkFlowConfig SET Status = 0, CompletedOn = " + Ti.App.SQL.safeSQL(_dt) + " WHERE lower(FlowId) = lower(" + Ti.App.SQL.safeSQL(sWFScreenName) + ") and Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel));
									}
									commonObj._dbDataRows1.close();
									commonObj._dbDataRows1 = null;
								} catch (e) { }
								//Select * from WorkFlowConfig  WHERE FlowId = 'Flowid - Main' and NextFunctionName = 'Customer' and status = 0 and MustComplete = 1 and Access = 11 Order By OrderNo
								//var qry = "Select * from WorkFlowConfig WHERE (status = 0  or status is null) and MustComplete = 1 and Level = 1 and lower(NextFunctionName) = lower(" + Ti.App.SQL.safeSQL(sWFScreenName) + ") and  Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel)  + " Order By OrderNo";
								commonObj.qry = "Select * from WorkFlowConfig WHERE (status = 0  or status is null) and MustComplete = 1 and lower(NextFunctionName) = lower(" + Ti.App.SQL.safeSQL(sWFScreenName) + ") and  Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel) + " Order By OrderNo";
								//COMMON.Log('1.qry1 ---> ' + commonObj.qry);
								commonObj.dbDataRows = Ti.App.configDBConn.execute(commonObj.qry);
								if (commonObj.dbDataRows.isValidRow()) {
									//CHECKING MUSTCOMPLETE = 0
									//var _qry = "Select * from WorkFlowConfig WHERE (status = 0  or status is null) and MustComplete = 0 and Level = 1 and lower(FunctionName) = lower(" + Ti.App.SQL.safeSQL(sWFScreenName) + ") and  Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel)  + " Order By OrderNo";
									commonObj._qry = "Select * from WorkFlowConfig WHERE (status = 0  or status is null) and MustComplete = 0 and lower(FunctionName) = lower(" + Ti.App.SQL.safeSQL(sWFScreenName) + ") and  Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel) + " Order By OrderNo";
									commonObj._dbDataRows = Ti.App.configDBConn.execute(commonObj._qry);
									if (!commonObj._dbDataRows.isValidRow()) {
										COMMON.showAlert("You Must Complete " + commonObj.dbDataRows.fieldByName('FunctionName') + ".", ["OK"], null);
										commonObj._dbDataRows.close();
										commonObj.dbDataRows.close();
										//db.close();
										dash.clicked = false;
										Ti.App.eventTriggered = false;
										Ti.App.dashBoardItemClicked = false;
										return false;
									}
									commonObj._dbDataRows.close();
								}
								commonObj.dbDataRows.close();
								//STATUS = 1 COMPLETED
								//var qry = "Select * from WorkFlowConfig WHERE status = 1 and MustComplete = 1 and Level = 1 and lower(FunctionName) = lower(" + Ti.App.SQL.safeSQL(sWFScreenName) + ") and  Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel)  + " Order By OrderNo";
								//var qry = "Select * from WorkFlowConfig WHERE status = 1 and Level = 1 and lower(FunctionName) = lower(" + Ti.App.SQL.safeSQL(sWFScreenName) + ") and  Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel)  + " Order By OrderNo";
								commonObj.qry = "Select * from WorkFlowConfig WHERE status = 1 and lower(FunctionName) = lower(" + Ti.App.SQL.safeSQL(sWFScreenName) + ") and  Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel) + " Order By OrderNo";
								//COMMON.Log('1.qry2 ---> ' + commonObj.qry);
								commonObj.dbDataRows = Ti.App.configDBConn.execute(commonObj.qry);
								var sDashScreenName = this.ScreenName;
								if (commonObj.dbDataRows.isValidRow()) {
									//COMMON.showAlert(dbDataRows.fieldByName('FunctionName') + " Flow Completed.", ["OK"], null);
									commonObj._dbDataRows = Ti.App.configDBConn.execute("Select * from WorkFlowConfig  WHERE lower(FlowId) = lower(" + Ti.App.SQL.safeSQL(sWFScreenName) + ") and Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel));
									if (commonObj._dbDataRows.isValidRow()) {
										var params = {};
										//Ti.App.sWorkFlowID = _dbDataRows.fieldByName('FlowId');
										//Ti.App.WorkFlowLevel = _dbDataRows.fieldByName('Level');
										params.FlowId = commonObj._dbDataRows.fieldByName('FlowId');//this.ScreenName;
										params.sFunctionName = this.functionName;
										params.dWorkFlowLevel = commonObj._dbDataRows.fieldByName('Level');
										commonObj._dbDataRows.close();
										commonObj.dbDataRows.close();
										commonObj._dbDataRows = null;
										commonObj.dbDataRows = null;
										//UI.openWindow('WorkFlow', params);
										/*//CHECKING COMPLETED DATE
										var _dbDataRows1 = db.execute("select * From WorkFlowConfig WHERE Level=1 and lower(FunctionName) = lower(" + Ti.App.SQL.safeSQL(sWFScreenName) + ") and Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel) + " and CompletedON < Date('now')"); 
										if(_dbDataRows1.isValidRow()){
											var _dt = new Date();
											_dt = Ti.App.DATEFORMAT.dbDateFormatSQLite(_dt);
											db.execute("Update WorkFlowConfig SET Status = 0, CompletedOn = " + Ti.App.SQL.safeSQL(_dt) + " WHERE Level=1 and lower(FunctionName) = lower(" + Ti.App.SQL.safeSQL(sWFScreenName) + ") and Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel));
											db.execute("Update WorkFlowConfig SET Status = 0, CompletedOn = " + Ti.App.SQL.safeSQL(_dt) + " WHERE lower(FlowId) = lower(" + Ti.App.SQL.safeSQL(sWFScreenName) + ") and Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel));
										}
										*/
										//db.close();
										Ti.App.currentWin.currentRow = null;//Ti.App.currentRow;
										Ti.App.currentWin.activatedWindow = true;
										Ti.App.currentWin.lastSelectedRow = null;//lastSelectedRow;
										Ti.App.currentRow = null;
										Ti.App.currentScreenName = "WorkFlow";
										//object = require('/Screens/WorkFlow/Controller');
										//new object('WorkFlow', params);
										//COMMON.Log('10907 workflow');
										var object = require('/Screens/WorkFlow/Controller');
										var sob = new object('WorkFlow', params);



										//dbDataRows.close();
										//db.close();
										dash.clicked = false;
										Ti.App.eventTriggered = false;
										Ti.App.dashBoardItemClicked = false;
										return false;
									}
									commonObj._dbDataRows.close();
									commonObj._dbDataRows = null;
								}
								commonObj.dbDataRows.close();
								commonObj.dbDataRows = null;
								//STATUS = 0
								//var qry = "Select * from WorkFlowConfig WHERE (status = 0  or status is null) and MustComplete = 1 and Level = 1 and lower(FunctionName) = lower(" + Ti.App.SQL.safeSQL(sWFScreenName) + ") and  Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel)  + " Order By OrderNo";
								//var qry = "Select * from WorkFlowConfig WHERE (status = 0  or status is null) and Level = 1 and lower(FunctionName) = lower(" + Ti.App.SQL.safeSQL(sWFScreenName) + ") and  Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel)  + " Order By OrderNo";
								commonObj.qry = "Select * from WorkFlowConfig WHERE (status = 0  or status is null) and lower(FunctionName) = lower(" + Ti.App.SQL.safeSQL(sWFScreenName) + ") or (lower(FlowId) = lower(" + Ti.App.SQL.safeSQL(sWFScreenName) + ") and FlowType ='Main' ) and  Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel) + " Order By OrderNo";
								//COMMON.Log('1.qry3 ---> ' + commonObj.qry);
								commonObj.dbDataRows = Ti.App.configDBConn.execute(commonObj.qry);
								sDashScreenName = this.ScreenName;
								if (commonObj.dbDataRows.isValidRow()) {
									//dbDataRows.fieldByName('FunctionName')
									commonObj._dbDataRows = Ti.App.configDBConn.execute("Select * from WorkFlowConfig  WHERE lower(FlowId) = lower(" + Ti.App.SQL.safeSQL(sWFScreenName) + ") and  Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel));
									if (commonObj._dbDataRows.isValidRow()) {
										//Ti.App.sWorkFlowID = _dbDataRows.fieldByName('FlowId');
										//Ti.App.WorkFlowLevel = _dbDataRows.fieldByName('Level');
										var params = {};
										params.FlowId = commonObj._dbDataRows.fieldByName('FlowId');//this.ScreenName;
										params.dWorkFlowLevel = commonObj._dbDataRows.fieldByName('Level');
										params.sFunctionName = this.functionName;
										commonObj._dbDataRows.close(); commonObj.dbDataRows.close();
										commonObj._dbDataRows = null; commonObj.dbDataRows = null;
										//UI.openWindow('WorkFlow', params);
										/*//CHECKING COMPLETED DATE
										var _dbDataRows1 = db.execute("select * From WorkFlowConfig WHERE Level=1 and lower(FunctionName) = lower(" + Ti.App.SQL.safeSQL(sWFScreenName) + ") and Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel) + " and CompletedON < Date('now')"); 
										if(_dbDataRows1.isValidRow()){
											var _dt = new Date();
											_dt = Ti.App.DATEFORMAT.dbDateFormatSQLite(_dt);
											db.execute("Update WorkFlowConfig SET Status = 0, CompletedOn = " + Ti.App.SQL.safeSQL(_dt) + " WHERE Level=1 and lower(FunctionName) = lower(" + Ti.App.SQL.safeSQL(sWFScreenName) + ") and Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel));
											db.execute("Update WorkFlowConfig SET Status = 0, CompletedOn = " + Ti.App.SQL.safeSQL(_dt) + " WHERE lower(FlowId) = lower(" + Ti.App.SQL.safeSQL(sWFScreenName) + ") and Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel));
										}
										*/
										//db.close();
										Ti.App.currentWin.currentRow = null;//Ti.App.currentRow;
										Ti.App.currentWin.activatedWindow = true;
										Ti.App.currentWin.lastSelectedRow = null;//lastSelectedRow;
										Ti.App.currentRow = null;
										Ti.App.currentScreenName = "WorkFlow";
										//object = require('/Screens/WorkFlow/Controller');
										//new object('WorkFlow', params);
										//COMMON.Log('10962 workflow');
										var object = require('/Screens/WorkFlow/Controller');
										var sob = new object('WorkFlow', params);

										dash.clicked = false;
										Ti.App.eventTriggered = false;
										Ti.App.dashBoardItemClicked = false;
										return false;
									}
									commonObj._dbDataRows.close();
									commonObj._dbDataRows = null;
								}
								commonObj.dbDataRows.close();
								commonObj.dbDataRows = null;
								commonObj._qry = "Select * from Functions WHERE lower(Code) = lower(" + Ti.App.SQL.safeSQL(sDashScreenName) + ") limit 0,1";
								//COMMON.Log('1.qry4 ---> ' + commonObj._qry);
								commonObj._dbDataRows = Ti.App.configDBConn.execute(commonObj._qry);
								if (commonObj._dbDataRows.isValidRow()) {
									sDashScreenName = commonObj._dbDataRows.fieldByName('ScreenName');
								}
								commonObj._dbDataRows.close();
								commonObj._dbDataRows = null;
								//db.close();
							}//END commonObj.bWorkFlowEnabled = true;
							//var sDashScreenName = this.ScreenName;
							Titanium.App.Properties.setString('SYNC_SCREEN', '');

							if (COMMON.CheckBooleanField(ArrayOperations.prototype.getSystemValue('CheckLocationEnabled'))) {
								try {
									//COMMON.Log("sDashScreenName1 " + sDashScreenName);
									var screenCheckLocationEnabled = COMMON.CheckString(ArrayOperations.prototype.getSystemValue('ScreensCheckLocationEnabled'));
									var arrScreenCheckLocationEnabled = screenCheckLocationEnabled.split(",");

									if (arrScreenCheckLocationEnabled.indexOf(sDashScreenName) > -1) {
										//COMMON.Log("LINE 14600");
										if (!ArrayOperations.prototype.getCurrentPosition()) {
											//COMMON.Log("LINE 14602");
											Ti.App.bEnableAndroidBackButton = true;
											Ti.App.isDashboardScreen = false;
											Ti.App.dashBoardItemClicked = false;
											Ti.App.COMMON.hideIndicator();
											dash.clicked = false;
											return false;
										}
										//COMMON.Log("LINE 14723");
									}
								} catch (e) { 
                //COMMON.Log("Error " + e); 
                }

							}


							if (sDashScreenName.toUpperCase() == 'StartActivity'.toUpperCase()) {
								//alert('longitude = ' + e.coords.longitude + ' latitude = ' + e.coords.latitude);
								Ti.Geolocation.purpose = 'Get Current Location';
								if (Ti.version < '8.0.0') {
									Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
								}
								Ti.Geolocation.distanceFilter = 1;
								Titanium.Geolocation.getCurrentPosition(function (e) {
									if (!e.error) {
										//get the properties from Titanium.GeoLocation
										longitude = e.coords.longitude;
										latitude = e.coords.latitude;
										var sTransNo = Titanium.App.Properties.getString('MDT_NO') + '' + getTransDocNo();
										//COMMON.Log('longitude = ' + e.coords.longitude + ' latitude = ' + e.coords.latitude);
										var db = Ti.App.dbConn;//commonObj.dbConnectionObj.createDataBaseConnection();
										db.execute("INSERT INTO CustVisit(CustNo,TransNo, TransType, TransDate, AgentId, Longitude, Latitude,Status) VALUES (" + Ti.App.SQL.safeSQL(Ti.App.CustNo) + ", " + Ti.App.SQL.safeSQL(sTransNo) + ", 'CLOCK-IN'  ," + Ti.App.SQL.safeSQL(_dt) + "," + Ti.App.SQL.safeSQL(Ti.App.agentID) + "," + Ti.App.SQL.safeSQL(longitude) + "," + Ti.App.SQL.safeSQL(latitude) + ",1)");
										//db.close();
										Ti.App.bEnableAndroidBackButton = true;
										Ti.App.isDashboardScreen = false;
										Ti.App.dashBoardItemClicked = false;
										Ti.App.COMMON.hideIndicator();
										dash.clicked = false;
										this.opacity = 1;
										Ti.App.COMMON.showAlert("Customer Visit Started.", ["OK"], null);
										return "";
									}
								});
							} else if (sDashScreenName.toUpperCase() == 'EndActivity'.toUpperCase()) {
								Ti.Geolocation.purpose = 'Get Current Location';
								if (Ti.version < '8.0.0') {
									Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
								}
								Ti.Geolocation.distanceFilter = 1;
								Titanium.Geolocation.getCurrentPosition(function (e) {
									if (!e.error) {
										//get the properties from Titanium.GeoLocation
										longitude = e.coords.longitude;
										latitude = e.coords.latitude;
										var sTransNo = Titanium.App.Properties.getString('MDT_NO') + '' + Ti.App.SQL.getTransDocNo();
										//COMMON.Log('longitude = ' + e.coords.longitude + ' latitude = ' + e.coords.latitude);
										var db = Ti.App.dbConn;//commonObj.dbConnectionObj.createDataBaseConnection();
										db.execute("INSERT INTO CustVisit(CustNo,TransNo, TransType, TransDate, AgentId, Longitude, Latitude,Status) VALUES (" + Ti.App.SQL.safeSQL(Ti.App.CustNo) + ", " + Ti.App.SQL.safeSQL(sTransNo) + ", 'CLOCK-OUT'  ," + Ti.App.SQL.safeSQL(_dt) + "," + Ti.App.SQL.safeSQL(Ti.App.agentID) + "," + Ti.App.SQL.safeSQL(longitude) + "," + Ti.App.SQL.safeSQL(latitude) + ",1)");
										//db.close();
										Ti.App.bEnableAndroidBackButton = true;
										Ti.App.isDashboardScreen = false;
										Ti.App.dashBoardItemClicked = false;
										Ti.App.COMMON.hideIndicator();
										dash.clicked = false;
										this.opacity = 1;
										Ti.App.COMMON.showAlert("Customer Visit Completed.", ["OK"], null);
										return "";
									}
								});
							} else if (sDashScreenName.toUpperCase() == 'ClockOut'.toUpperCase()) {
								Ti.App.bEnableAndroidBackButton = true;
								Ti.App.dashBoardItemClicked = false;
								Ti.App.isDashboardScreen = false;
								Ti.App.COMMON.hideIndicator();
								dash.clicked = false;
								this.opacity = 1;
								try {
									var bDirectClockOut = Ti.App.COMMON.CheckBooleanField(systemTableConfig['BDIRECTCLOCKOUT']);
									if (bDirectClockOut == true) {
										Ti.App.dashBoardItemClicked = true;
										mController.initBackButtonClick();
									} else {
										mController.menuItemClicked(-1, 0, 'CLOCK-OUT', 'CLOCK-OUT');
									}
								} catch (e) {
									mController.menuItemClicked(-1, 0, 'CLOCK-OUT', 'CLOCK-OUT');
								}
								return "";
							} else if (sDashScreenName.toUpperCase() == 'CaptureGPS'.toUpperCase() || sDashScreenName.toUpperCase() == 'OverrideGPS'.toUpperCase()) {
								Ti.Geolocation.purpose = 'Get Current Location';
								if (Ti.version < '8.0.0') {
									Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
								}
								Ti.Geolocation.distanceFilter = 1;
								Titanium.Geolocation.getCurrentPosition(function (e) {
									if (!e.error) {
										var _dt = new Date();
										_dt = Ti.App.DATEFORMAT.dbDateFormatSQLite(_dt);
										//get the properties from Titanium.GeoLocation
										longitude = e.coords.longitude;
										latitude = e.coords.latitude;
										var sTransNo = Titanium.App.Properties.getString('MDT_NO') + '' + Ti.App.SQL.getTransDocNo();
										//COMMON.Log('longitude = ' + e.coords.longitude + ' latitude = ' + e.coords.latitude);
										var db = Ti.App.dbConn;//commonObj.dbConnectionObj.createDataBaseConnection();
										db.execute("Update Customers SET Uploaded = 0, Longitude = " + Ti.App.SQL.safeSQL(longitude) + ", Latitude = " + Ti.App.SQL.safeSQL(latitude) + " WHERE CustNo = " + Ti.App.SQL.safeSQL(Ti.App.CustNo));
										db.execute("INSERT INTO CustVisit(CustNo,TransNo, TransType, TransDate, AgentId, Longitude, Latitude,Status) VALUES (" + Ti.App.SQL.safeSQL(Ti.App.CustNo) + ", " + Ti.App.SQL.safeSQL(sTransNo) + ", 'CAPTUREGPS'  ," + Ti.App.SQL.safeSQL(_dt) + "," + Ti.App.SQL.safeSQL(Ti.App.agentID) + "," + Ti.App.SQL.safeSQL(longitude) + "," + Ti.App.SQL.safeSQL(latitude) + ",1)");
										//db.close();
										Ti.App.bEnableAndroidBackButton = true;
										Ti.App.isDashboardScreen = false;
										Ti.App.dashBoardItemClicked = false;
										Ti.App.COMMON.hideIndicator();
										dash.clicked = false;
										this.opacity = 1;
										if (sDashScreenName.toUpperCase() == 'CaptureGPS'.toUpperCase() ){
											Ti.App.COMMON.showAlert("Customer location \n longitude : " + longitude + ", latitude : " + latitude + " captured.", ["OK"], null);
										}else if (sDashScreenName.toUpperCase() == 'OverrideGPS'.toUpperCase())
										{
											Ti.App.COMMON.showAlert("Customer location \n longitude : " + longitude + ", latitude : " + latitude + " overrided.", ["OK"], null);
										}
										//Ti.App.COMMON.showAlert("Customer location \n longitude : " + longitude + ", latitude : " + latitude + " captured.", ["OK"], null);
										return "";
									}else{                    
										this.opacity = 1;
										Ti.App.dashBoardItemClicked = false;								
										//COMMON.Log('533 Workflow Capture GPS');
										Ti.App.COMMON.showAlert("Gps not found , Please check your location service", ["OK"], null);
										return false;											
									}
								});
								//}else if(sDashScreenName.toUpperCase() == 'Customers'.toUpperCase() && access == 3){
							} else if (sDashScreenName.toUpperCase() == 'DirectSales'.toUpperCase()) {
								//win.currentRow = null;
								//win.activatedWindow = true;
								//win.lastSelectedRow = null;
								Ti.App.currentRow = null;
								var object = null;
								if (!bIsAndroid) {
									sDashScreenName = sDashScreenName.replace(/ /g, "%20");
									// needed to replace space to %20
								}
								object = require('/Screens/AddItem/Controller');
								var params = {};
								params.sFunctionName = "DirectSales";
								params.sScreenName = sDashScreenName;
								//new object("AddItem", params);
								var sob = new object("AddItem", params);
								Ti.App.bEnableAndroidBackButton = true;
								Ti.App.dashBoardItemClicked = false;
								Ti.App.isDashboardScreen = false;
								Ti.App.COMMON.hideIndicator();
								dash.clicked = false;
								this.opacity = 1;
								return true;
							} else if (sDashScreenName.toUpperCase() == 'Customers'.toUpperCase() || sDashScreenName.toUpperCase() == 'OpenPrintSummary'.toUpperCase() || sDashScreenName.toUpperCase() == 'PrintSummary'.toUpperCase() || sDashScreenName.toUpperCase() == 'PrintDocuments'.toUpperCase() || sDashScreenName.toUpperCase() == 'NewCustomer'.toUpperCase() || sDashScreenName.toUpperCase() == 'RouteMap'.toUpperCase()) {
								try {
									var cnt = 0;
									//commonObj.db = commonObj.dbConnectionObj.createDataBaseConnection();
									commonObj.dbDataRows = Ti.App.dbConn.execute("select COUNT(CustAgentID) as cnt From CustAgent WHERE AgentId = " + Ti.App.SQL.safeSQL(Ti.App.agentID) + " and AgentId <> CustAgentID");
									while (commonObj.dbDataRows.isValidRow()) {
										cnt = commonObj.dbDataRows.fieldByName('cnt');
										commonObj.dbDataRows.next();
									}
									commonObj.dbDataRows.close();
									//commonObj.db.close();

									if (Ti.App.CustNo != null && Ti.App.CustNo != undefined && Ti.App.CustNo != "") {
										cnt = 0;
									}
									//CHEESENG
									//if(Ti.App.accessLevel == 1 || Ti.App.accessLevel == 2){
									//cnt = 0;
									//}
									//NoNeed ParkFood
									//cnt = 0;

									//KeesongDEMO
									//cnt = 0;
									if (cnt > 0) {
										//COMMON.Log("super user4");
										Ti.App.currentWin.currentRow = null;
										Ti.App.currentWin.activatedWindow = true;
										Ti.App.currentWin.lastSelectedRow = null;
										//win.currentRow = null;
										//win.activatedWindow = true;
										//win.lastSelectedRow = null;
										Ti.App.currentRow = null;
										Ti.App.currentScreenName = "SalesAgent";
										var object = null;
										if (!bIsAndroid) {
											sDashScreenName = sDashScreenName.replace(/ /g, "%20");
											// needed to replace space to %20
										}
										object = require('/Screens/SalesAgent/Controller');
										var params = {};
										params.sFunctionName = "SalesAgent";
										params.sScreenName = sDashScreenName;
										//new object("SalesAgent", params);
										var sob = new object("SalesAgent", params);
										Ti.App.bEnableAndroidBackButton = true;
										Ti.App.dashBoardItemClicked = false;
										Ti.App.isDashboardScreen = false;
										Ti.App.COMMON.hideIndicator();
										dash.clicked = false;
										this.opacity = 1;
										return true;
									}
								} catch (e) {
									Ti.App.COMMON.hideIndicator();
									dash.clicked = false;
									this.opacity = 1;
									//return true;
								}
							} else if (sDashScreenName.toUpperCase() == 'CheckConnection'.toUpperCase()) {
								try {
									if (Titanium.Network.networkType == Titanium.Network.NETWORK_NONE) {
										Ti.App.eventTriggered = false;
										Ti.App.dashBoardItemClicked = false;
										Ti.App.bEnableAndroidBackButton = true;
										Ti.App.isDashboardScreen = false;
										COMMON.showAlert("Please check your network connection.", ["OK"], null);
										return;
									}
									DETAILS.set('SYNC_SCREEN', 'APICALL');
									COMMON.showIndicator('Loading Please Wait...');
									var xhr1 = Ti.Network.createHTTPClient({
										onload: function (e) {
											//COMMON.Log('this.responseText ---> ' + this.responseText);
											COMMON.hideIndicator();
											DETAILS.set('SYNC_SCREEN', '');
											Ti.App.eventTriggered = false;
											Ti.App.dashBoardItemClicked = false;
											Ti.App.bEnableAndroidBackButton = true;
											Ti.App.isDashboardScreen = false;
											COMMON.showAlert("Connection Successful.", ["OK"], null);
										},
										onerror: function (e) {
											//COMMON.Log('this.responseText ---> ERROR');
											COMMON.hideIndicator();
											DETAILS.set('SYNC_SCREEN', '');
											Ti.App.eventTriggered = false;
											Ti.App.dashBoardItemClicked = false;
											Ti.App.bEnableAndroidBackButton = true;
											Ti.App.isDashboardScreen = false;
											//COMMON.showAlert("Please check your network connection.", ["OK"], null);
											COMMON.showAlert("Connection Failed.", ["OK"], null);
										},
										timeout: 20000//120000
									});
									var callParams = '<?xml version="1.0" encoding="utf-8"?>'
										+ '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'
										+ '<soap:Body>'
										+ '<CheckConnection xmlns="http://tempuri.org/" />'
										+ '</soap:Body>'
										+ '</soap:Envelope>';

									//COMMON.Log('callParams ---> ' + callParams);
									//COMMON.Log('URL : ' + Ti.App.URL_DBSYNCSERVICE);//Ti.App.URL_POSTWEBSERVICE);
									xhr1.open('POST', Ti.App.URL_DBSYNCSERVICE + "?op=CheckConnection");
									xhr1.setRequestHeader('Content-Type', 'text/xml');
									xhr1.setRequestHeader('Cache-Control', 'no-cache');
									xhr1.setRequestHeader('Cache-Control', 'no-store');
									xhr1.setRequestHeader('SOAPAction', 'http://tempuri.org/CheckConnection');
									xhr1.send(callParams);
									return '';
								} catch (e) {
									DETAILS.set('SYNC_SCREEN', '');
									Ti.App.eventTriggered = false;
									Ti.App.dashBoardItemClicked = false;
									Ti.App.bEnableAndroidBackButton = true;
									Ti.App.isDashboardScreen = false;
								}
							} else if (sDashScreenName.toUpperCase() == 'PrintTestPage'.toUpperCase()) {
								try {

									var menuName = ["A4 Printer", "3Inch Printer"];
									var optionsDialogOpts = {
										options: menuName,
										title: 'Simplr SALES'
									};
									optionsDialogOpts.selectedIndex = -1;
									var dialog = Titanium.UI.createOptionDialog(optionsDialogOpts);
									dialog.addEventListener('click', function (e) {
										/*		
										var db = commonObj.dbConnectionObj.createDataBaseConnection();
										var qry = "Select COUNT(Access) as count from GridFunctions where lower(PageName) = lower(" + Ti.App.SQL.safeSQL(pageName) + ") and Access = " + access + " and Language = " + Ti.App.SQL.safeSQL(this.getSystemValue('Language')) + " order by RowNo, ColNo";
										var totalmenu = 0;	
										dbDataRows = db.execute(qry);
										while (dbDataRows.isValidRow()) {
											totalmenu = dbDataRows.fieldByName('count');
											dbDataRows.next();
										}
										dbDataRows.close();
										*/
										if (e.index == 0) {
											//var sA4PrinterName = COMMON.CheckString(systemTableConfig['A4PrinterName']);//SI.getSystemValue('A4PrinterName'));
											var sA4PrinterName = COMMON.CheckString(ArrayOperations.prototype.getSystemValue('A4PrinterName'));
											//COMMON.Log('sA4PrinterName -> ' + sA4PrinterName);
											try {
												if (sA4PrinterName == "DASCOM" || sA4PrinterName == "Dascom") {
													var sMCAddress = '8C:DE:52:EA:E6:0A';
													var db = Ti.App.dbConn;//new dbConnection().createDataBaseConnection();
													dbDataRows = db.execute("Select PrinterMACAddress from PrintConfig WHERE PrinterName = 'A4Printer'");
													while (dbDataRows.isValidRow()) {
														sMCAddress = dbDataRows.fieldByName("PrinterMACAddress");
														dbDataRows.next();
													}
													dbDataRows.close();
													//db.close();
													sMCAddress = (sMCAddress == null || sMCAddress == undefined || sMCAddress == '') ? '8C:DE:52:EA:E6:0A' : sMCAddress;
													/*
													try{
														var sA4PrinterName = COMMON.CheckString(SI.getSystemValue('A4PrinterName'));
														if(sA4PrinterName == "DASCOM" || sA4PrinterName == "Dascom"){
															try{
																if(Ti.App.dascomprinterConnected == false){
																	Ti.App.sDascomprinter.onStartCall();
																	Ti.App.sDascomprinter.CreatePrinter();
																	Ti.App.dascomprinterConnected = true;
																}
																//Ti.App.sDascomprinter.ConnectPrinter(sMCAddress);//'8C:DE:52:EA:E6:0A');
															}catch(e){
																//Ti.App.dascomprinter = require('com.simplr.dascom1145printer');
																if(Ti.App.dascomprinterConnected == false){
																	Ti.App.sDascomprinter.onStartCall();
																	Ti.App.sDascomprinter.CreatePrinter();
																	Ti.App.dascomprinterConnected = true;
																}
																//Ti.App.sDascomprinter.ConnectPrinter(sMCAddress);
															}
														}
													}catch(e){}
													var DascomReport = require('/Reports/DascomReport');
													var DascomReportObj = new DascomReport();
													DascomReportObj.startPrint('', 'TestPage');
													*/

													var A4NewReportGenerator = require('/Reports/A4NewReportGenerator');
													var A4NewReportGeneratorObj = new A4NewReportGenerator();
													A4NewReportGeneratorObj.startPrint('', 'TestPage');

												} else if (sA4PrinterName == "INTERMEC") {
													var InvoiceReport = require('/Reports/InterMecReport');
													var InvoiceReportObj = new InvoiceReport();
													InvoiceReportObj.PrinterStartA4();
													InvoiceReportObj.PrintTestReprot();
													InvoiceReportObj.PrinterCloseA4();
												} else {
													var InvoiceReport = require('/Reports/A4ReportGenerator');
													var InvoiceReportObj = new InvoiceReport();
													InvoiceReportObj.PrinterStartA4();
													InvoiceReportObj.PrintTestReprot();
													InvoiceReportObj.PrinterCloseA4();
													/*
													var EPSONA4Report = require('/Reports/EPSONA4Report');
													var EPSONA4ReportObj = new EPSONA4Report();
													EPSONA4ReportObj.PrinterStartA4();
													EPSONA4ReportObj.PrintTestReprot();
													EPSONA4ReportObj.PrinterCloseA4();
													*/
												}
											} catch (e) { }
										} else if (e.index == 1) {
											var filename = "TEST.LBL";
											var file;
											if (COMMON.isPlatformAndroid()) {
												file = Ti.Filesystem.getFile('file:///mnt/sdcard/' + filename);
											} else {
												var imageDirectoryName = "";
												file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, imageDirectoryName, filename);
											}
											//if (file.exists() == true) {
											file.deleteFile();
											file.write('');
											var dPrnterH = 500;
											file.write('! 0 200 200 ' + dPrnterH + ' 1\r\nON-FEED IGNORE\r\n');
											file.write('T TAHOMA8P.CPF 0 30 0 LEFT\r\nCENTER\r\n');
											file.write('T TAHOMA8P.CPF 0 30 38 $$$$$$$$$$$$$\r\nLEFT\r\nCENTER\r\n');
											file.write('T TAHOMA8P.CPF 0 30 76 TESTPAGE\r\nLEFT\r\nCENTER\r\n');
											file.write('T TAHOMA8P.CPF 0 30 114 PRINT\r\nLEFT\r\nCENTER\r\n');
											commonObj.db = Ti.App.dbConn;//commonObj.dbConnectionObj.createDataBaseConnection();
											commonObj.dbDataRows = commonObj.db.execute("Select PrinterMACAddress from PrintConfig WHERE PrinterName <> 'A4Printer'");
											while (commonObj.dbDataRows.isValidRow()) {
												Ti.App.sMCAddress = commonObj.dbDataRows.fieldByName("PrinterMACAddress");
												commonObj.dbDataRows.next();
											}
											commonObj.dbDataRows.close();
											//commonObj.db.close();
											if (COMMON.isPlatformAndroid()) {
												COMMON.printFromBlueToothPrinter();
											} else {
												COMMON.checkThermalPrinterStatus();
											}
										}
									});
									dialog.show();
									//}
								} catch (e) {
									//alert(e);
								} finally {
									Ti.App.eventTriggered = false;
									Ti.App.dashBoardItemClicked = false;
									Ti.App.bEnableAndroidBackButton = true;
									Ti.App.isDashboardScreen = false;
									var filename = "TEST.LBL";
									var imageDirectoryName = "";
									if (COMMON.isPlatformAndroid()) {
										var file = Ti.Filesystem.getFile('file:///mnt/sdcard/' + filename);
									} else {
										var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, imageDirectoryName, filename);
									}
									file.deleteFile();
								}
								return "";
							}


							//PointofSales
							if (sDashScreenName.toUpperCase() == 'PointofSales'.toUpperCase()) {
								Ti.App.DBCOMMON.setCustomerFields(Ti.App.ARRAYOPERATION.getSystemValue('CashCustNo'));
							}

							if (sDashScreenName.toUpperCase() == 'SelectedStockTake-Items'.toUpperCase()) {
								//INSERT INTO ItemTrans (DocNo, DocType, ItemID,  Qty, Uploaded
								Ti.App.dbConn.execute("DELETE FROM TempOrderDet");
								Ti.App.dbConn.execute("INSERT INTO TempOrderDet (ItemId, Qty) Select ItemId, Qty FROM ItemTrans WHERE DocNo = 'STOCKTAKE' and Uploaded = 1");
							}

							if (sDashScreenName.toUpperCase() == 'Stock Order'.toUpperCase()) {
								var bStockRequestByLocation = COMMON.CheckBooleanField(Ti.App.ARRAYOPERATION.getSystemValue('StockRequestByLocation'));
								if (bStockRequestByLocation == true && (Ti.App.accessLevel == 2 || Ti.App.accessLevel == '2')) {
									Ti.App.configDBConn.execute("UPDATE FormConfig SET HeaderHeight = 58, ValueHeight = 58 WHERE Screenname = 'Stock Order' and FieldName = 'Location'");
								} else {
									Ti.App.configDBConn.execute("UPDATE FormConfig SET HeaderHeight = 0, ValueHeight = 0 WHERE Screenname = 'Stock Order' and FieldName = 'Location'");
								}
								ArrayOperations.prototype.setFormConfigByScreenName('Stock Order', Ti.App.sLanguage);
							}
							if (sDashScreenName.toUpperCase() == 'Synchronization'.toUpperCase() || sDashScreenName.toUpperCase() == "SendData".toUpperCase()) {
								if (Ti.App.bIsDemoVersion == true) {
									Ti.App.eventTriggered = false;
									Ti.App.dashBoardItemClicked = false;
									Ti.App.bEnableAndroidBackButton = true;
									Ti.App.isDashboardScreen = false;
									COMMON.showAlert("This is Demo Version. You Can't Sync now.", ["OK"], null);
									return;
								}
								//COMMON.Log(Titanium.Network.networkType + ' == ' + Titanium.Network.NETWORK_NONE);
								if (Titanium.Network.networkType == Titanium.Network.NETWORK_NONE) {
									Ti.App.bSendingData = false;
									Ti.App.eventTriggered = false;
									Ti.App.dashBoardItemClicked = false;
									Ti.App.bEnableAndroidBackButton = true;
									Ti.App.isDashboardScreen = false;
									dash.clicked = false;
									//alert('Please check network connection.');
									COMMON.showAlert("Please check your network connection.", ["OK"], null);
									return;
								} else {
									Ti.App.eventTriggered = false;
									Ti.App.bEnableAndroidBackButton = false;
									dash.clicked = false;
									Ti.App.dashBoardItemClicked = true;
									Ti.App.isDashboardScreen = false;
									var obj = {};
									obj.cancel = 1;
									obj.controller = ArrayOperations.prototype;
									obj.type = sDashScreenName;
									if (Ti.App.UOMType == 2) {
										if (sDashScreenName.toUpperCase() == "SendData".toUpperCase()) {
											COMMON.showAlert("Do you want to Upload data?", ["YES", "NO"], obj);
										}else{
											COMMON.showAlert("Do you want to synchronize?", ["YES", "NO"], obj);
										}
										//COMMON.showAlert("Do you want to synchronize?", ["YES", "NO"], obj);
									} else {
										if (sDashScreenName.toUpperCase() == "SendData".toUpperCase()) {
											COMMON.showAlert("Do you want to Upload data?", ["YES", "NO"], obj);
										}else{
											COMMON.showAlert("Do you want to "+sDashScreenName+"?", ["YES", "NO"], obj);
										}
										//COMMON.showAlert("Do you want to " + sDashScreenName + "?", ["YES", "NO"], obj);
									}
									//COMMON.showAlert("Do you want to "+sDashScreenName+"?", ["YES", "NO"], obj);
									return false;
									/*
									Titanium.App.Properties.setString('SYNC_SCREEN', 'USER');
									COMMON.showIndicator('Loading Please Wait...');
									Ti.App.SendAllDataObj = {};
									var obj = {};
									obj.controller = ArrayOperations.prototype;
									Ti.App.bEnableAndroidBackButton = false;
									Ti.App.SendAllDataObj = obj;
									//sending all data to sever 
									var SendData = require('/utils/SendData');
									var SENDDATAOBJ = new SendData();
									SENDDATAOBJ.SendAllDatatoServer();
									retuurn true;
									*/
								}
							}
							COMMON.showIndicator("Please Wait...");
							var sOrderNo = "";

							if (this.functionName == 'Sales' || this.functionName == 'OpenOrderTaking') {
								//COMMON.Log('16173 this.functionName '+this.functionName);
								try {									
									if (Ti.App.EnableTotOrdQtyCheck == true && this.functionName == 'OpenOrderTaking') {
										var OrderNo_QTY ='';
										var qry_ORDER = ArrayOperations.prototype.getQueryConfigByScreenNameWithOrderText("ValidateExistCustOrdInVanSales");
										//COMMON.Log('qry_ORDER '+qry_ORDER);
										if(qry_ORDER != '' && qry_ORDER != undefined && qry_ORDER != null){
											var dbDataRows_QTY = Ti.App.dbConn.execute(qry_ORDER);
											while (dbDataRows_QTY.isValidRow()) {
												OrderNo_QTY = dbDataRows_QTY.fieldByName('OrderNo');
												dbDataRows_QTY.next();
											}
											dbDataRows_QTY.close();
											if(OrderNo_QTY !=''){	
											Ti.App.bEnableAndroidBackButton = true;
											Ti.App.isDashboardScreen = false;
											COMMON.hideIndicator();
											dash.clicked = false;
											this.opacity = 1;
											Ti.App.eventTriggered = false;
											Ti.App.dashBoardItemClicked = false;									
											COMMON.showAlert(OrderNo_QTY + " is already created for this customer. You may modify or void that document to proceed.", ['OK'], null);
											return false;
											}											
									    }
									}
								}catch(e){
									//COMMON.Log('16185 EnableTotOrdQtyCheck Error '+e);
								}

								/*F&N-POINT : 58
			 					* 
								Credit Limit Check :
									1. Only Apply to Pre-Sales and VanSales Traditional.
									2. When they click Sales/Order Icon, Check Customer Table CreditText If NOT Empty show alert CreditText and stop proceed further.
									var bCheckCreditText = COMMON.CheckString(SI.getSystemValue('bCheckCreditText'));
								*/
								//commonObj.db = commonObj.dbConnectionObj.createDataBaseConnection();
								commonObj.creditText = '';
								commonObj.bHideCreditTextPopup = COMMON.CheckBooleanField(systemTableConfig['bHideCreditTextPopup']);//this.getSystemValue('bHideCreditTextPopup'));
								if (commonObj.bHideCreditTextPopup == false) {
									commonObj.dbDataRows = '';
									commonObj.qry = "SELECT CreditText FROM Customers where CustNo = " + Ti.App.SQL.safeSQL(Ti.App.CustNo);
									commonObj.dbDataRows = Ti.App.dbConn.execute(commonObj.qry);
									commonObj.creditText = '';
									while (commonObj.dbDataRows.isValidRow()) {
										commonObj.creditText = commonObj.dbDataRows.fieldByName('CreditText');
										commonObj.dbDataRows.next();
									}
									commonObj.dbDataRows.close();
									if (commonObj.creditText != '' && commonObj.creditText != null && commonObj.creditText != undefined) {
										//commonObj.db.close();
										Ti.App.bEnableAndroidBackButton = true;
										Ti.App.isDashboardScreen = false;
										COMMON.hideIndicator();
										dash.clicked = false;
										this.opacity = 1;
										Ti.App.eventTriggered = false;
										Ti.App.dashBoardItemClicked = false;
										COMMON.showAlert(commonObj.creditText, ["OK"], null);
										return false;
									}
								}

								Ti.App.dtDeliveryDate = new Date();
								var getDeliveryDateBeforeOrder = COMMON.CheckBooleanField(Ti.App.ARRAYOPERATION.getSystemValue('getDeliveryDateBeforeOrder'));
								//alert('this.functionName --> ' + this.functionName +' : getDeliveryDateBeforeOrder --> ' + getDeliveryDateBeforeOrder);
								if (this.functionName == 'OpenOrderTaking' && getDeliveryDateBeforeOrder == true) {
									var dateValue = new Date();
									var minDate = new Date();
									//var minDate = new Date(dateValue.getTime() + 1*24*60*60*1000);
									minDate.setDate(dateValue.getDate() + 1);
									Ti.App.dtDeliveryDate = minDate;
									//minDate.setFullYear(1990);
									//minDate.setMonth(11);
									//minDate.setDate(31);

									var maxDate = new Date();
									maxDate.setFullYear(2050);
									maxDate.setMonth(11);
									maxDate.setDate(31);

									var dtDeliDate_txt = Ti.UI.createPicker({
										type: Ti.UI.PICKER_TYPE_DATE,
										minDate: minDate,
										maxDate: maxDate,
										value: minDate,//dateValue,
										height: 'auto',
										width: '98%',
									});
									var label = null;
									if (COMMON.isPlatformAndroid()) {
										var alertDialog = Titanium.UI.createAlertDialog({
											title: '',
											message: 'Select Date',
											androidView: dtDeliDate_txt,
											persistent: true
										});
										alertDialog.buttonNames = ['OK', 'CANCEL'];
										alertDialog.functionName = this.functionName;

										//alertDialog.show();
										// add event listener
										alertDialog.addEventListener('click', function (e) {
											if (e.index == 0) {// clicked "OK"
												try {
													//COMMON.Log('Ti.App.dtDeliveryDate --> ' + Ti.App.dtDeliveryDate);
													Ti.App.dtDeliveryDate = dtDeliDate_txt.value;
													//COMMON.Log('Ti.App.dtDeliveryDate --> ' + Ti.App.dtDeliveryDate);

													Ti.App.currentWin.currentRow = null;//Ti.App.currentRow;
													Ti.App.currentWin.activatedWindow = true;
													Ti.App.currentWin.lastSelectedRow = null;//lastSelectedRow;
													Ti.App.currentRow = null;
													Ti.App.currentScreenName = sDashScreenName;
													var params = {};
													params.sOrderNo = "";
													params.sInvNo = "";
													params.sFunctionName = this.functionName;
													params.sScreenName = sDashScreenName;
													var object = require('/Screens/' + sDashScreenName + '/Controller');
													var ob = new object(sDashScreenName, params);
													return true;
												} catch (e) {
													Ti.App.dtDeliveryDate = new Date();
												}
											} else if (e.index == 1) {// clicked "CANCEL"
												Ti.App.dtDeliveryDate = new Date();
											}
										});

										Ti.App.bEnableAndroidBackButton = true;
										Ti.App.SendAllDataObj = "";
										Ti.App.isDashboardScreen = false;
										COMMON.hideIndicator();
										dash.clicked = false;
										Ti.App.eventTriggered = false;
										Ti.App.dashBoardItemClicked = false;
										//this.opacity = 1;
										alertDialog.show();
										return "";
									}
								}

								if (this.functionName == 'Sales') {
									try {
										sOrderNo = "";
										commonObj.qry = "Select OrderNo from Orders WHERE  CustNo = " + Ti.App.SQL.safeSQL(Ti.App.CustNo) + " and Delivered = 0 and (Void = 0 or  Void is null)  and OrderNo not in (Select OrderNo from Invoices where  CustNo = " + Ti.App.SQL.safeSQL(Ti.App.CustNo) + " and Void = 0 or Void is NUll ) and strftime( '%Y-%m-%d' , DeliDate )=strftime( '%Y-%m-%d' , datetime('now','localtime') )";
										//COMMON.Log("Qry---->"+commonObj.qry);
										commonObj.dbDataRows = Ti.App.dbConn.execute(commonObj.qry);
										while (commonObj.dbDataRows.isValidRow()) {
											sOrderNo = commonObj.dbDataRows.fieldByName('OrderNo');
											sOrderNo = (sOrderNo == null || sOrderNo == undefined) ? "" : sOrderNo;
											commonObj.dbDataRows.next();
										}
										commonObj.dbDataRows.close();
									} catch (e) {
										sOrderNo = "";
									}
								}
								//commonObj.db.close();
								commonObj.creditText = null;
								commonObj.bHideCreditTextPopup = null;
								if (Ti.version < '7.5.0') {
									//delete commonObj.creditText;//17122018 SDK 7.5.0
									//delete commonObj.bHideCreditTextPopup;//17122018 SDK 7.5.0
								}
							}

							displayNames = [];
							tableNames = [];
							functionNames = [];
							APIStatus = [];
							Ti.App.sTmpDashScreenName = this.functionName;
							if (Titanium.Network.networkType == Titanium.Network.NETWORK_NONE) {
								displayNames = [];
								tableNames = [];
								functionNames = [];
								APIStatus = [];
							} else {
								downloadTransConfig_List = Ti.App.ARRAYOPERATION.getArray('DownloadTransConfig_List');
								if (downloadTransConfig_List.length > 0) {
									for (var ctr = 0; ctr < downloadTransConfig_List.length; ctr++) {
										if (sDashScreenName.toUpperCase() == downloadTransConfig_List[ctr].screenName.toUpperCase()) {
											displayNames.push(downloadTransConfig_List[ctr].screenName);
											tableNames.push(downloadTransConfig_List[ctr].tableName);
											functionNames.push(downloadTransConfig_List[ctr].webserviceAction);
										}
									}
								}
							}
							if (functionNames.length > 0) {
								var params = {};
								params.sFunctionName = this.functionName;
								params.sOrderNo = sOrderNo;
								Ti.App.sTmpDashSrnParams = params;
								Ti.App.isDashboardScreen = true;
								Ti.App.isDashboardScreenName = sDashScreenName;
								Ti.App.SendAllDataObj = '';
								var SendData = require('/utils/SendData');
								var SENDDATAOBJ = new SendData();
								SENDDATAOBJ.SendAllDatatoServer();
								dash.clicked = false;
								this.opacity = 1;
								return true;
							}
							var params = {};
							params.sFunctionName = this.functionName;

							//RE-VISIT-13Jul2018
							sOrderNo = "";

							if (sOrderNo != "") {
								params.sOrderNo = sOrderNo;
								try {
									//COMMON.showAlert("Do you want to load last sales order?", ["YES", "NO"], params);
									Ti.App.bEnableAndroidBackButton = true;
									Ti.App.isDashboardScreen = false;
									COMMON.hideIndicator();
									dash.clicked = false;
									this.opacity = 1;
									mController.loadPrevOrder(params);
									//Ti.App.currentController.loadPrevOrder(params);
									return false;
								} catch (e) {
									//COMMON.Log("Error ---->"+e);
								}
							}
							//COMMON.Log('DASHBOARD OPEN SCREEN : ' + new Date().getTime());											
							try {

								//COMMON.Log('Ti.App.currentScreenName ' + Ti.App.currentScreenName + ' == ' + sDashScreenName);
								if (Ti.App.currentScreenName == sDashScreenName && Ti.App.currentScreenName != '' && sDashScreenName != '' && sDashScreenName != 'Folder' && Ti.App.currentScreenName != 'Folder') {
									//COMMON.Log('Return false');
									return false;
								}


								/*if(Ti.App.dashboardiconclicked == true){
								return false;
							}   
							Ti.App.dashboardiconclicked = true;
							setTimeout(function() {
								Ti.App.dashboardiconclicked = false;                                    
							},10000);  *///5000 change to 10000 for so duble time opening 

								Ti.App.currentWin.currentRow = null;//Ti.App.currentRow;
								Ti.App.currentWin.activatedWindow = true;
								Ti.App.currentWin.lastSelectedRow = null;//lastSelectedRow;
								Ti.App.currentRow = null;
								Ti.App.currentScreenName = sDashScreenName;
								var object = null;
								if (!bIsAndroid) {
									sDashScreenName = sDashScreenName.replace(/ /g, "%20");
								}
								sDashScreenName = sDashScreenName.replace(/%20/g, '');
								if (sDashScreenName.indexOf('Form-') > -1) {
									object = require('/Screens/Form-/Controller');
								} else {
									object = require('/Screens/' + sDashScreenName + '/Controller');
								}
								if (!bIsAndroid) {
									sDashScreenName = sDashScreenName.replace(/%20/g, ' ');
								}
								//var CustNo = (Ti.App.CustNo != '') ? Ti.App.CustNo : '';
								//var remarks = "Open " + sDashScreenName + " Screen";
								var params = {};
								params.sFunctionName = this.functionName;
								//COMMON.Log('11557-> ob' + sDashScreenName);
								//new object(sDashScreenName, params);
								//COMMON.Log('11557->1 ob' + sDashScreenName);
								//new object(sDashScreenName, params);


								//COMMON.Log('StockTakeRequired1 --> ' + ArrayOperations.prototype.getCustFieldValue('StockTakeRequired'));
								//COMMON.Log('this.functionName --> ' + this.functionName);
								//COMMON.Log('sDashScreenName1 --> ' + sDashScreenName);
								if (this.functionName == 'Sales' || this.functionName == 'OpenOrderTaking') {

									//COMMON.Log('StockTakeRequired2 --> ' + COMMON.CheckBooleanField(ArrayOperations.prototype.getCustFieldValue('StockTakeRequired')));

									if (COMMON.CheckBooleanField(ArrayOperations.prototype.getCustFieldValue('StockTakeRequired'))) {
										params.screenType = 'Sales';
										params.bModify = false;
										//UI.openWindow('Stock Take', obj);
										sDashScreenName = 'Stock Take';
										object = require('/Screens/' + sDashScreenName + '/Controller');
									}
								}
								//COMMON.Log('sDashScreenName2 --> ' + sDashScreenName);
								var ob = new object(sDashScreenName, params);


								Ti.App.bEnableAndroidBackButton = true;
								Ti.App.isDashboardScreen = false;
								COMMON.hideIndicator();
							} catch (e) {
								COMMON.hideIndicator();
								//COMMON.Log('11543 e '+e);
								Ti.App.dashboardiconclicked = false;
							}
							dash.clicked = false;
							Ti.App.eventTriggered = false;
							this.opacity = 1;
							return true;
						});
						str = '' + dashBoardItems[cellIndex].FunctionText;
						newSTR = str.replace("/n", "\n");
						//COMMON.Log('heap dashBoardItems[cellIndex].img ---> ' + dashBoardItems[cellIndex].img);
						thisView2 = Ti.UI.createView({
							//height : cellHeight,
							height: (IconWidth < IconHeight) ? IconWidth : IconHeight,// - auto
							width: (IconWidth < IconHeight) ? IconWidth : IconHeight,
							//top : (sGridLabelLayout == 'left') ? 'auto' : '12.5%',// - auto
							top: (sGridLabelLayout == 'left') ? 'auto' : '3%',// - auto
							//top : 1,
							functionName: dashBoardItems[cellIndex].FunctionName,
							functionText: dashBoardItems[cellIndex].FunctionText,
							pageName: dashBoardItems[cellIndex].PageName,
							ScreenName: dashBoardItems[cellIndex].ScreenName,
							//borderRadius : 10,
							backgroundImage: dashBoardItems[cellIndex].img,
							//left : (sGridLabelLayout == 'left') ? 0 : 'auto',
						});
						if (sGridLabelLayout == 'left') {
							thisView2.left = 0;
						}
						thisLabel = Ti.UI.createLabel({

							//color : "#fff",//"#000",
							color: Ti.App.sGridTxtLblColor,//'#000080',//Ti.App.sFooterColor,
							//top : 0.3, - auto
							top: (sGridLabelLayout == 'left') ? 'auto' : 0.3,
							height: Ti.UI.SIZE,
							font: {
								fontSize: Ti.App.CONFIG.get('DASHBOARD_FONT_SIZE'),
								fontWeight: 'bold'
							},
							text: newSTR,// + " ABCDEFGHIJKLMNOPQRSTUVWXYZ",
							touchEnabled: false,
						});
						if (sGridLabelLayout == 'left') {
							thisLabel.left = (thisView2.width + 5);
							thisLabel.textAlign = Ti.UI.TEXT_ALIGNMENT_LEFT;
						} else {
							thisLabel.textAlign = Ti.UI.TEXT_ALIGNMENT_CENTER;
						}
						thisLabel2 = Ti.UI.createLabel({
							color: Ti.App.sGridTxtLblColor,//"#fff",
							//top : 0, - atuo
							top: (sGridLabelLayout == 'left') ? 'auto' : 0,
							height: Ti.UI.SIZE,
							font: {
								fontSize: Ti.App.CONFIG.get('DASHBOARD_FONT_SIZE'),
								fontWeight: 'bold'
							},
							text: '',
							touchEnabled: false,
							left: (sGridLabelLayout == 'left') ? (thisView2.width + 5) : 'auto',
							textAlign: (sGridLabelLayout == 'left') ? Ti.UI.TEXT_ALIGNMENT_LEFT : Ti.UI.TEXT_ALIGNMENT_CENTER,
						});
						thisView1.add(thisView2);
						thisView1.add(thisLabel);
						thisView1.add(thisLabel2);
						thisView.add(thisView1);
						
						//dashBoardItems[cellIndex].ScreenName
						//COMMON.Log('notification Icon  -> ' + dashBoardItems[cellIndex].ScreenName);
						/*Ti.App.ArrNotificationIcon[dashBoardItems[cellIndex].ScreenName] = commonObj.BasicLabelObj.createLabel(88, iconW * 0.20, (iconH * 0.20), 18* Ti.App.dHeightRatio, '', 'bold', '#FFF', '#FF0000', 0, 0);
						Ti.App.ArrNotificationIcon[dashBoardItems[cellIndex].ScreenName].left = iconW * 0.69;
						Ti.App.ArrNotificationIcon[dashBoardItems[cellIndex].ScreenName].top = 0;//iconH * 0.03;
						Ti.App.ArrNotificationIcon[dashBoardItems[cellIndex].ScreenName].zIndex = 99;
						Ti.App.ArrNotificationIcon[dashBoardItems[cellIndex].ScreenName].borderRadius = (iconW * 0.20) / 1.80;
						thisView.add(Ti.App.ArrNotificationIcon[dashBoardItems[cellIndex].ScreenName]);
						*/
						
						/*if(dashBoardItems[cellIndex].ScreenName == 'Form-Elearning'){
							//COMMON.Log('Ti.App.ArrNotificationIcon1.1 --> ' + Ti.App.ArrNotificationIcon['Form-Elearning']);
							Ti.App.ArrNotificationIcon['Form-Elearning'] = commonObj.BasicLabelObj.createLabel(88, iconW * 0.20, (iconH * 0.20), 16* Ti.App.dHeightRatio, '', 'bold', '#FFF', '#FF0000', 0, 0);
							Ti.App.ArrNotificationIcon['Form-Elearning'].left = iconW * 0.69;
							Ti.App.ArrNotificationIcon['Form-Elearning'].dActHeight = iconH * 0.20;
							Ti.App.ArrNotificationIcon['Form-Elearning'].dActWidth = iconW * 0.20;
							Ti.App.ArrNotificationIcon['Form-Elearning'].top = 0;//iconH * 0.03;
							Ti.App.ArrNotificationIcon['Form-Elearning'].zIndex = 99;
							Ti.App.ArrNotificationIcon['Form-Elearning'].borderRadius = (iconW * 0.20) / 1.80;
							thisView.add(Ti.App.ArrNotificationIcon['Form-Elearning']);
							//COMMON.Log('Ti.App.ArrNotificationIcon1.2 --> ' + Ti.App.ArrNotificationIcon['Form-Elearning']);
							
						}*/
						
						try{
							var dbDataRows = Ti.App.dbConn.execute("select * from DownloadTransConfig where Screenname like '"+dashBoardItems[cellIndex].ScreenName+"_USER_NotificationCount' order by Screenname");
							//COMMON.Log("select * from DownloadTransConfig where Screenname like '"+dashBoardItems[cellIndex].ScreenName+"_USER_NotificationCount' order by Screenname");
			    			if (dbDataRows.isValidRow()) {
								//COMMON.Log('Ti.App.ArrNotificationIcon1.1 --> ' + Ti.App.ArrNotificationIcon[dashBoardItems[cellIndex].ScreenName]);
								//Ti.App.ArrNotificationIcon[dashBoardItems[cellIndex].ScreenName] = commonObj.BasicLabelObj.createLabel(88, iconW * 0.20, (iconH * 0.20), 16* Ti.App.dHeightRatio, '', 'bold', '#FFF', '#FF0000', 0, 0);
								Ti.App.ArrNotificationIcon[dashBoardItems[cellIndex].ScreenName] = commonObj.BasicLabelObj.createLabel('', 0, 0, 16* Ti.App.dHeightRatio, '', 'bold', '#FFF', '#FF0000', 0, 0);
								Ti.App.ArrNotificationIcon[dashBoardItems[cellIndex].ScreenName].left = iconW * 0.69;
								Ti.App.ArrNotificationIcon[dashBoardItems[cellIndex].ScreenName].dActHeight = iconH * 0.20;
								Ti.App.ArrNotificationIcon[dashBoardItems[cellIndex].ScreenName].dActWidth = iconW * 0.20;
								Ti.App.ArrNotificationIcon[dashBoardItems[cellIndex].ScreenName].top = 0;//iconH * 0.03;
								Ti.App.ArrNotificationIcon[dashBoardItems[cellIndex].ScreenName].zIndex = 99;
								Ti.App.ArrNotificationIcon[dashBoardItems[cellIndex].ScreenName].borderRadius = (iconW * 0.20) / 1.80;
								thisView.add(Ti.App.ArrNotificationIcon[dashBoardItems[cellIndex].ScreenName]);
								//COMMON.Log('Ti.App.ArrNotificationIcon1.2 --> ' + Ti.App.ArrNotificationIcon[dashBoardItems[cellIndex].ScreenName]);
			    			}
			    			dbDataRows.close();
						}catch(e){}
						/************ POPUP COUNT *************
			 			try{
							dPopupCount = '';
							var cnt1 = 6;
							var cnt = new String(6);
							//COMMON.Log('cnt length ---> ' + cnt.length + ' * 10');
				 			//dPopupCount = commonObj.BasicButtonObj.createButton(cnt, 30, 24, 16, '#fff');
				 			//COMMON.Log('cnt length ---> ' + (cnt.length * 20) + 10);
				 			if(cnt.length == 1){
				 				cnt = 2;//cnt.length
				 			}
				 			dPopupCount = commonObj.BasicButtonObj.createButton(cnt1, (cnt * 15), (cnt * 15), 16, '#fff');
				            dPopupCount.backgroundImage = null;
				            dPopupCount.fontWeight = 'bold';
				            dPopupCount.backgroundColor = '#f00';
				            dPopupCount.borderRadius = dPopupCount.width/2;//11;
				            //dPopupCount.borderColor = '#fff';
				            //dPopupCount.borderWidth = 2;
				            dPopupCount.left = cellWidth + 20;
				            dPopupCount.top = '11%';
            				thisView.add(dPopupCount);
	            		}catch(e){
	            			alert('e ----> ' + e);	
            			}
        				/**************************************/
						IconContainer.add(thisView);

						//COMMON.Log('cellIndex : ' + cellIndex + ' - colorSetIndex : ' + colorSetIndex + ' - totalIcons : ' + totalIcons);
						cellIndex++;
						colorSetIndex++;
						//COMMON.Log('cellIndex : ' + cellIndex + ' - colorSetIndex : ' + colorSetIndex + ' - totalIcons : ' + totalIcons);
						if (cellIndex == totalIcons) {
							i = totalView;
							j = y;
							k = x;
						}
					}
				}
			}
			return GridView;
		} catch (e) {
			alert('Dashboard : e ---> ' + e);
		}
	},
	initCheckWorkFlow: function () {
		//Checking MUST COMPLETE
		//commonObj.db = commonObj.dbConnectionObj.createDataBaseConnection();
		commonObj.sFunctionName = Ti.App.currentScreenName;
		commonObj._qry = "Select * from Functions WHERE lower(ScreenName) = lower(" + Ti.App.SQL.safeSQL(Ti.App.currentScreenName) + ") limit 0,1";
		commonObj._dbDataRows = Ti.App.configDBConn.execute(commonObj._qry);
		if (commonObj._dbDataRows.isValidRow()) {
			commonObj.sFunctionName = commonObj._dbDataRows.fieldByName('Code');
		}
		commonObj._dbDataRows.close();
		commonObj.sFunctionName = (commonObj.sFunctionName != null && commonObj.sFunctionName != undefined) ? commonObj.sFunctionName : '';
		commonObj.qry = "SELECT MustComplete FROM WorkFlowConfig WHERE (status = 0  or status is null) and NextFunctionName = " + Ti.App.SQL.safeSQL(commonObj.sFunctionName) + " and Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel) + " and FlowId = " + Ti.App.SQL.safeSQL(Ti.App.sWorkFlowID);
		commonObj.bMustComplete = 0;
		commonObj.dbDataRows = Ti.App.configDBConn.execute(commonObj.qry);
		while (commonObj.dbDataRows.isValidRow()) {
			commonObj.bMustComplete = commonObj.dbDataRows.fieldByName('MustComplete');
			commonObj.dbDataRows.next();
		}
		commonObj.bMustComplete = (commonObj.bMustComplete == null || commonObj.bMustComplete == undefined || commonObj.bMustComplete == '') ? 0 : commonObj.bMustComplete;
		commonObj.dbDataRows.close();
		//commonObj.db.close();
		return commonObj.bMustComplete;
	},
	updateWorkFlowStatus: function (sCurrentScreenName, sAccessLevel, sWorkFlowID) {
		//commonObj.db = commonObj.dbConnectionObj.createDataBaseConnection();
		commonObj._qry = "Select * from Functions WHERE lower(ScreenName) = lower(" + Ti.App.SQL.safeSQL(sCurrentScreenName) + ") limit 0,1";
		commonObj._dbDataRows = Ti.App.configDBConn.execute(commonObj._qry);
		if (commonObj._dbDataRows.isValidRow()) {
			sCurrentScreenName = commonObj._dbDataRows.fieldByName('Code');
		}
		commonObj._dbDataRows.close();
		//FunctionName = " + Ti.App.SQL.safeSQL(sCurrentScreenName) + " and Access = " + Ti.App.SQL.safeSQL(sAccessLevel) + " and FlowId = " + Ti.App.SQL.safeSQL(sWorkFlowID) CompletedOn, Uploaded
		//COMMON.Log("Update WorkFlowConfig Set Status = 1 WHERE FunctionName = " + Ti.App.SQL.safeSQL(sCurrentScreenName) + " and Access = " + Ti.App.SQL.safeSQL(sAccessLevel) + " and FlowId = " + Ti.App.SQL.safeSQL(sWorkFlowID));
		commonObj._dt = new Date();
		commonObj._dt = Ti.App.DATEFORMAT.dbDateFormatSQLite(commonObj._dt);
		Ti.App.configDBConn.execute("Update WorkFlowConfig Set Status = 1, CompletedOn = " + Ti.App.SQL.safeSQL(commonObj._dt) + " WHERE FunctionName = " + Ti.App.SQL.safeSQL(sCurrentScreenName) + " and Access = " + Ti.App.SQL.safeSQL(sAccessLevel) + " and FlowId = " + Ti.App.SQL.safeSQL(sWorkFlowID));
		Ti.App.dbConn.execute("DELETE FROM WorkFlowStatus WHERE FlowId = " + Ti.App.SQL.safeSQL(sWorkFlowID) + " and  FunctionName = " + Ti.App.SQL.safeSQL(sCurrentScreenName) + " and Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel));
		Ti.App.dbConn.execute("INSERT INTO WorkFlowStatus (FlowId, FunctionName, Access, Status, CompletedOn, Uploaded) VALUES (" + Ti.App.SQL.safeSQL(sWorkFlowID) + ", " + Ti.App.SQL.safeSQL(sCurrentScreenName) + ", " + Ti.App.SQL.safeSQL(Ti.App.accessLevel) + ",1," + Ti.App.SQL.safeSQL(commonObj._dt) + ",0)");
		//db.execute("Update WorkFlowConfig Set Status = 1 WHERE FunctionName = " + Ti.App.SQL.safeSQL(sCurrentScreenName) + " and Access = " + Ti.App.SQL.safeSQL(sAccessLevel) + " and FlowId = " + Ti.App.SQL.safeSQL(sWorkFlowID));
		////////COMMON.Log('db.rowsAffected : ' + db.rowsAffected);
		//commonObj.db.close();
	},
	checkWorkFlow: function () {
		//COMMON.Log('checkWorkFlow : START : ' + new Date().getTime());
		setTimeout(function () {
			try {
				//COMMON.Log('ARRAYOPERATION : Ti.App.WorkFlowLevel ---> ' + Ti.App.WorkFlowLevel);
				commonObj.db = Ti.App.dbConn;//commonObj.dbConnectionObj.createDataBaseConnection();
				NextFunctionName = "";
				sFunctionName = Ti.App.currentScreenName;
				commonObj._qry = "Select * from Functions WHERE lower(ScreenName) = lower(" + Ti.App.SQL.safeSQL(Ti.App.currentScreenName) + ") limit 0,1";
				commonObj._dbDataRows = Ti.App.configDBConn.execute(commonObj._qry);
				if (commonObj._dbDataRows.isValidRow()) {
					sFunctionName = commonObj._dbDataRows.fieldByName('Code');
				}
				commonObj._dbDataRows.close();
				/*
				//1
				select * from WorkFlowConfig Where Level > 1 and OrderNo = 1 and (status = 0  or status is null) and lower(FunctionName) = lower(" + Ti.App.SQL.safeSQL(sFunctionName) + ") and  Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel) Order by Level limit 0,1;
					NextFUnctionName = dataRow.(NextFUnctionName);		
				
				//2
				if(Ti.App.sWorkFlowID != ‘’){
					var qry = "Select * from WorkFlowConfig WHERE lower(FlowId) = lower(" + Ti.App.SQL.safeSQL(Ti.App.sWorkFlowID) + ") and  Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel)  + " and Level = " + Ti.App.SQL.safeSQL(Ti.App.WorkFlowLevel)  + " Order By OrderNo limit 0,1";
					NextFUnctionName = dataRow.(NextFUnctionName);
				}else{
					var qry = "select * from WorkFlowConfig Where Level > 1 and lower(FunctionName) = lower(" + Ti.App.SQL.safeSQL(sFunctionName) + ") and  Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel);
					if(rowCOunt == 1){
						NextFUnctionName = dataRow.(NextFUnctionName);
					}else{
						NextFUnctionName = ‘’
					}
				}
				
				NextFUnctionName == ‘’  && Ti.App.sWorkFlowID != ‘’
					Go to WORKFLOW SCREEN
				
				NextFUnctionName == ‘’  && Ti.App.sWorkFlowID == ‘’
					Close Current Screen
				
				NextFUnctionName != ‘’
					Check WORKFLOW/FUNCITON
				
					if(WORKFLOW){
						OPEN WORKFLOW
					}ELSE{
						OPEN FUNCTION
					}
				 */
				if (Ti.App.sWorkFlowID != '') {
					commonObj._dt = new Date();
					commonObj._dt = Ti.App.DATEFORMAT.dbDateFormatSQLite(commonObj._dt);
					Ti.App.configDBConn.execute("Update WorkFlowConfig Set Status = 1, CompletedOn = " + Ti.App.SQL.safeSQL(commonObj._dt) + " WHERE FunctionName = " + Ti.App.SQL.safeSQL(sFunctionName) + " and Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel) + " and FlowId = " + Ti.App.SQL.safeSQL(Ti.App.sWorkFlowID));
					commonObj.db.execute("DELETE FROM WorkFlowStatus WHERE FlowId = " + Ti.App.SQL.safeSQL(Ti.App.sWorkFlowID) + " and  FunctionName = " + Ti.App.SQL.safeSQL(sFunctionName) + " and Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel));
					commonObj.db.execute("INSERT INTO WorkFlowStatus (FlowId, FunctionName, Access, Status, CompletedOn, Uploaded) VALUES (" + Ti.App.SQL.safeSQL(Ti.App.sWorkFlowID) + ", " + Ti.App.SQL.safeSQL(sFunctionName) + ", " + Ti.App.SQL.safeSQL(Ti.App.accessLevel) + ",1," + Ti.App.SQL.safeSQL(commonObj._dt) + ",0)");
				}
				//COMMON.Log('Ti.App.sWorkFlowID : ' + Ti.App.sWorkFlowID + ' - Ti.App.WorkFlowLevel ' + Ti.App.WorkFlowLevel);
				//var qry = "select * from WorkFlowConfig Where NextFunctionName <> '' and Level > "+ Ti.App.WorkFlowLevel + " and OrderNo = 1 and (status = 0  or status is null) and lower(FunctionName) = lower(" + Ti.App.SQL.safeSQL(sFunctionName) + ") and  Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel);
				commonObj.qry = "select * from WorkFlowConfig Where NextFunctionName <> '' and Level > " + Ti.App.WorkFlowLevel + " and OrderNo = 1 and lower(FunctionName) = lower(" + Ti.App.SQL.safeSQL(sFunctionName) + ") and  Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel);
				//COMMON.Log('qry1 ---> '+ commonObj.qry);
				commonObj.dbDataRows = Ti.App.configDBConn.execute(commonObj.qry);
				if (commonObj.dbDataRows.isValidRow()) {
					var status = commonObj.dbDataRows.fieldByName('status');
					var winObj = Ti.App.currentWin;
					//COMMON.Log('winObj.sFlowScreenName ---> ' + winObj.sFlowScreenName);
					//COMMON.Log('winObj.sFlowScreenName ---> ' + winObj.sFlowScreenName);
					//COMMON.Log('winObj.bStartFlowVisited ---> ' + winObj.bStartFlowVisited);
					if (winObj.bStartFlowVisited == true) {
						//winObj.sFlowScreenName
						if (COMMONMODEL.ConfigCheckData("SELECT * FROM WorkFlowConfig WHERE (status = 0 or status is null) and FlowId = " + Ti.App.SQL.safeSQL(commonObj.dbDataRows.fieldByName('FlowId')) + " and  Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel))) {
							winObj.bStartFlowVisited = false;
						}
					}
					if (winObj.bStartFlowVisited == false) {
						if (winObj.sFlowScreenName != '') {
							winObj.bStartFlowVisited = true;
						}
						//if(status == 0 || status == '' || status == '0' || winObj.sFlowScreenName == ''){
						Ti.App.sWorkFlowID = commonObj.dbDataRows.fieldByName('FlowId');
						Ti.App.WorkFlowLevel = commonObj.dbDataRows.fieldByName('Level');
						commonObj._dt = new Date();
						commonObj._dt = Ti.App.DATEFORMAT.dbDateFormatSQLite(commonObj._dt);
						Ti.App.configDBConn.execute("Update WorkFlowConfig Set Status = 1, CompletedOn = " + Ti.App.SQL.safeSQL(commonObj._dt) + " WHERE FunctionName = " + Ti.App.SQL.safeSQL(sFunctionName) + " and Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel) + " and FlowId = " + Ti.App.SQL.safeSQL(Ti.App.sWorkFlowID));
						commonObj.db.execute("DELETE FROM WorkFlowStatus WHERE FlowId = " + Ti.App.SQL.safeSQL(Ti.App.sWorkFlowID) + " and  FunctionName = " + Ti.App.SQL.safeSQL(sFunctionName) + " and Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel));
						commonObj.db.execute("INSERT INTO WorkFlowStatus (FlowId, FunctionName, Access, Status, CompletedOn, Uploaded) VALUES (" + Ti.App.SQL.safeSQL(Ti.App.sWorkFlowID) + ", " + Ti.App.SQL.safeSQL(sFunctionName) + ", " + Ti.App.SQL.safeSQL(Ti.App.accessLevel) + ",1," + Ti.App.SQL.safeSQL(commonObj._dt) + ",0)");
						NextFunctionName = commonObj.dbDataRows.fieldByName('NextFunctionName');
						//}
					}
				}
				if (NextFunctionName == '') {
					if (Ti.App.sWorkFlowID != '') {
						//"select * from WorkFlowConfig Where lower(FlowId) = lower('FlowVisitShowCase') and  Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel)  + " and FunctionName = " + Ti.App.SQL.safeSQL(sFunctionName) + " and Level = " + Ti.App.SQL.safeSQL(Ti.App.WorkFlowLevel)  + " Order By OrderNo limit 0,1";					
						commonObj.qry = "select * from WorkFlowConfig Where lower(FlowId) = lower(" + Ti.App.SQL.safeSQL(Ti.App.sWorkFlowID) + ") and  Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel) + " and FunctionName = " + Ti.App.SQL.safeSQL(sFunctionName) + " and Level = " + Ti.App.SQL.safeSQL(Ti.App.WorkFlowLevel) + " Order By OrderNo limit 0,1";
						//COMMON.Log('qry2 ---> '+ commonObj.qry);
						commonObj.dbDataRows = Ti.App.configDBConn.execute(commonObj.qry);
						if (commonObj.dbDataRows.isValidRow()) {
							NextFunctionName = commonObj.dbDataRows.fieldByName('NextFunctionName');
						}
						commonObj.dbDataRows.close();
					} else {
						/*
						var _dt = new Date();
						_dt = Ti.App.DATEFORMAT.dbDateFormatSQLite(_dt);
						db.execute("Update WorkFlowConfig Set Status = 1, CompletedOn = " + Ti.App.SQL.safeSQL(_dt) + " WHERE FunctionName = " + Ti.App.SQL.safeSQL(sFunctionName) + " and Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel) + " and NextFunctionName = ''");
						db.close();
						*/
						commonObj.qry = "select * from WorkFlowConfig Where Level > 1 and NextFunctionName <> '' and lower(FunctionName) = lower(" + Ti.App.SQL.safeSQL(sFunctionName) + ") and  Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel);
						//COMMON.Log('qry ---> ' + commonObj.qry);
						commonObj.dbDataRows = Ti.App.configDBConn.execute(commonObj.qry);
						var dCnt = 0;
						var sWorkFlowID = '', dWorkFlowLevel = 0, sTmpNextFunctionName = '';
						while (commonObj.dbDataRows.isValidRow()) {
							dCnt++;
							if (dCnt > 1) {
								break;
							}
							sWorkFlowID = commonObj.dbDataRows.fieldByName('FlowId');
							dWorkFlowLevel = commonObj.dbDataRows.fieldByName('Level');
							sTmpNextFunctionName = commonObj.dbDataRows.fieldByName('NextFunctionName');
							commonObj.dbDataRows.next();
						}
						commonObj.dbDataRows.close();
						if (dCnt == 1) {
							Ti.App.sWorkFlowID = sWorkFlowID;
							Ti.App.WorkFlowLevel = dWorkFlowLevel;
							commonObj._dt = new Date();
							commonObj._dt = Ti.App.DATEFORMAT.dbDateFormatSQLite(commonObj._dt);
							Ti.App.configDBConn.execute("Update WorkFlowConfig Set Status = 1, CompletedOn = " + Ti.App.SQL.safeSQL(commonObj._dt) + " WHERE FunctionName = " + Ti.App.SQL.safeSQL(sFunctionName) + " and Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel) + " and NextFunctionName = ''");
							commonObj.db.execute("DELETE FROM WorkFlowStatus WHERE FlowId = " + Ti.App.SQL.safeSQL(Ti.App.sWorkFlowID) + " and  FunctionName = " + Ti.App.SQL.safeSQL(sFunctionName) + " and Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel));
							commonObj.db.execute("INSERT INTO WorkFlowStatus (FlowId, FunctionName, Access, Status, CompletedOn, Uploaded) VALUES (" + Ti.App.SQL.safeSQL(Ti.App.sWorkFlowID) + ", " + Ti.App.SQL.safeSQL(sFunctionName) + ", " + Ti.App.SQL.safeSQL(Ti.App.accessLevel) + ",1," + Ti.App.SQL.safeSQL(commonObj._dt) + ",0)");
							NextFunctionName = sTmpNextFunctionName;
						}
					}
				}
				if (NextFunctionName != '') {
					/*Check WORKFLOW/FUNCITON
					if(WORKFLOW){
						OPEN WORKFLOW
					}ELSE{
						OPEN FUNCTION
					}
					*/
					commonObj.qry = "select * from WorkFlowConfig Where lower(FlowId) = lower(" + Ti.App.SQL.safeSQL(NextFunctionName) + ") and  Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel);
					commonObj.dbDataRows = Ti.App.configDBConn.execute(commonObj.qry);
					var sWorkFlowID = '', dWorkFlowLevel = 1;
					var sNextFunctionNameCode = NextFunctionName;//OpenOrderTaking
					if (commonObj.dbDataRows.isValidRow()) {
						var params = {};
						sWorkFlowID = commonObj.dbDataRows.fieldByName('FlowId');
						dWorkFlowLevel = commonObj.dbDataRows.fieldByName('Level');
						commonObj.dbDataRows.close();
						//commonObj.db.close();
						params.FlowId = sWorkFlowID;
						params.dWorkFlowLevel = dWorkFlowLevel;
						Ti.App.currentWin.currentRow = null;//Ti.App.currentRow;
						Ti.App.currentWin.activatedWindow = true;
						Ti.App.currentWin.lastSelectedRow = null;//lastSelectedRow;
						Ti.App.currentRow = null;
						Ti.App.currentScreenName = "WorkFlow";
						params.sFunctionName = NextFunctionName;
						//object = require('/Screens/WorkFlow/Controller');
						//new object('WorkFlow', params);
						//COMMON.Log('11871 workflow');
						var object = require('/Screens/WorkFlow/Controller');
						var sob = new object('WorkFlow', params);

						//Ti.App.sWorkFlowID = sWorkFlowID;//dbDataRows.fieldByName('FlowId');
						//Ti.App.WorkFlowLevel = dWorkFlowLevel;//dbDataRows.fieldByName('Level');
						Ti.App.bEnableAndroidBackButton = true;
						Ti.App.isDashboardScreen = false;
						return "";
					} else {
						commonObj._qry = "Select * from Functions WHERE lower(Code) = lower(" + Ti.App.SQL.safeSQL(NextFunctionName) + ") limit 0,1";
						commonObj._dbDataRows = Ti.App.configDBConn.execute(commonObj._qry);
						if (commonObj._dbDataRows.isValidRow()) {
							NextFunctionName = commonObj._dbDataRows.fieldByName('ScreenName');
						}
						commonObj._dbDataRows.close();
						NextFunctionName = (NextFunctionName == null || NextFunctionName == undefined || NextFunctionName == "") ? '' : NextFunctionName;
					}
				}
				//COMMON.Log(Ti.App.sWorkFlowID + ' : NextFunctionName1 ---> ' + NextFunctionName);
				NextFunctionName = (NextFunctionName == "Nothing") ? "" : NextFunctionName;
				//COMMON.Log(Ti.App.sWorkFlowID + ' : NextFunctionName1 ---> ' + NextFunctionName);
				if (NextFunctionName != "") {
					if (mView != null) {
						Ti.App.sScreenType = "";
						commonObj.tmpScreenType = "";
						var sInvNo = "";
						var arrVoidInvNo = [];
						if (NextFunctionName == "Sales") {
							try {

								Ti.App.sScreenType = "";
								var qry = "Select * from SystemList WHERE Code = 'SelectedScreenType'";
								//COMMON.Log(qry);
								dbDataRows = commonObj.db.execute(qry);

								while (dbDataRows.isValidRow()) {
									commonObj.tmpScreenType = dbDataRows.fieldByName('SystemValue');
									dbDataRows.next();
								}
								dbDataRows.close();

								if (commonObj.tmpScreenType != 'Sales') {
									commonObj.db.execute("DELETE FROM TempOrderdet");
									commonObj.db.execute("DELETE FROM TempOrder");
								}
								commonObj.db.execute("DELETE FROM SystemList WHERE Code in ('SelectedScreenType', 'SelectedCustNo')");
								commonObj.db.execute("INSERT INTO SystemList (Code, SystemValue, SystemDataType) VALUES ('SelectedScreenType', 'Sales', 'text')");
								commonObj.db.execute("INSERT INTO SystemList (Code, SystemValue, SystemDataType) VALUES ('SelectedCustNo', " + Ti.App.SQL.safeSQL(Ti.App.CustNo) + ", 'text')");
								//var qry = "Select * from InvDet Where InvNo in (Select InvNo from Invoices where CustNo  = " + Ti.App.SQL.safeSQL(Ti.App.CustNo) + "and Void = 1 and InvDt >= date('now','localtime','start of day') and InvDt >= ifnull((Select InvDt from Invoices where CustNo  = " + Ti.App.SQL.safeSQL(Ti.App.CustNo) + " and (Void is null or Void = 0) Order by InvDt Desc limit 0,1), date('now','localtime','start of day')))";
								var qry = "Select InvNo from Invoices where CustNo  = " + Ti.App.SQL.safeSQL(Ti.App.CustNo) + "and Void = 1 and InvDt >= date('now','localtime','start of day') and InvDt >= ifnull((Select InvDt from Invoices where CustNo  = " + Ti.App.SQL.safeSQL(Ti.App.CustNo) + " and (Void is null or Void = 0) Order by InvDt), date('now','localtime','start of day'))";
								//COMMON.Log("Qry---->"+qry);
								commonObj._dbDataRows1 = commonObj.db.execute(qry);
								while (commonObj._dbDataRows1.isValidRow()) {
									sInvNo = commonObj._dbDataRows1.fieldByName('InvNo');
									sInvNo = (sInvNo == null || sInvNo == undefined) ? "" : sInvNo;
									arrVoidInvNo.push(sInvNo);
									commonObj._dbDataRows1.next();
								}
								commonObj._dbDataRows1.close();
							} catch (e) {
								sInvNo = "";
							}
						}
						if (commonObj.tmpScreenType == 'Sales') {
							Ti.App.sScreenType = "Sales";
							sInvNo = '';
							arrVoidInvNo = [];
						}
						var params1 = {};
						params1.sFunctionName = NextFunctionName;
						params1.sInvNo = sInvNo;
						if (sInvNo != "") {
							params1.bType = "LoadLastInvoice";
							params1.type = "LoadLastInvoice";
							params1.controller = ArrayOperations.prototype;
							params1.sDashScreenName = NextFunctionName;
							params1.sFunctionName = NextFunctionName;
							params1.arrVoidInvNo = arrVoidInvNo;
							COMMON.showAlert("Do you want to load voided Invoice?", ["YES", "NO"], params1);
							Ti.App.bEnableAndroidBackButton = true;
							Ti.App.isDashboardScreen = false;
							COMMON.hideIndicator();
							return false;
						} else {

							Ti.App.currentWin.currentRow = null;//Ti.App.currentRow;
							Ti.App.currentWin.activatedWindow = true;
							Ti.App.currentWin.lastSelectedRow = null;//lastSelectedRow;
							Ti.App.currentRow = null;


							params1.sFunctionName = NextFunctionName;//this.functionName;
							if (sNextFunctionNameCode == 'OpenOrderTaking' || sNextFunctionNameCode == 'OPENORDERTAKING') {
								params1.sFunctionName = sNextFunctionNameCode;
							}
							mView.openWindow(NextFunctionName, params1);//you{});
							Ti.App.bEnableAndroidBackButton = true;
							Ti.App.isDashboardScreen = false;
						}
					}
				} else {
					try {
						//db = commonObj.dbConnectionObj.createDataBaseConnection();
						var sFunctionName = Ti.App.currentScreenName;
						commonObj._qry = "Select * from Functions WHERE lower(ScreenName) = lower(" + Ti.App.SQL.safeSQL(Ti.App.currentScreenName) + ") limit 0,1";
						commonObj._dbDataRows = Ti.App.configDBConn.execute(commonObj._qry);
						if (commonObj._dbDataRows.isValidRow()) {
							sFunctionName = commonObj._dbDataRows.fieldByName('Code');
						}
						commonObj._dbDataRows.close();
						//db.execute("Update WorkFlowConfig Set Status = 1 WHERE NextFunctionName = " + Ti.App.SQL.safeSQL(Ti.App.currentScreenName) + " and Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel) + " and FlowId = " + Ti.App.SQL.safeSQL(Ti.App.sWorkFlowID));
						commonObj._dt = new Date();
						commonObj._dt = Ti.App.DATEFORMAT.dbDateFormatSQLite(commonObj._dt);
						Ti.App.configDBConn.execute("Update WorkFlowConfig Set Status = 1, CompletedOn = " + Ti.App.SQL.safeSQL(commonObj._dt) + " WHERE FunctionName = " + Ti.App.SQL.safeSQL(sFunctionName) + " and Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel) + " and FlowId = " + Ti.App.SQL.safeSQL(Ti.App.sWorkFlowID));
						commonObj.db.execute("DELETE FROM WorkFlowStatus WHERE FlowId = " + Ti.App.SQL.safeSQL(Ti.App.sWorkFlowID) + " and  FunctionName = " + Ti.App.SQL.safeSQL(sFunctionName) + " and Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel));
						commonObj.db.execute("INSERT INTO WorkFlowStatus (FlowId, FunctionName, Access, Status, CompletedOn, Uploaded) VALUES (" + Ti.App.SQL.safeSQL(Ti.App.sWorkFlowID) + ", " + Ti.App.SQL.safeSQL(sFunctionName) + ", " + Ti.App.SQL.safeSQL(Ti.App.accessLevel) + ",1," + Ti.App.SQL.safeSQL(commonObj._dt) + ",0)");
						if (Ti.App.sWorkFlowID != "") {
							//db = commonObj.dbConnectionObj.createDataBaseConnection();
							commonObj._dt = new Date();
							commonObj._dt = Ti.App.DATEFORMAT.dbDateFormatSQLite(commonObj._dt);
							Ti.App.configDBConn.execute("Update WorkFlowConfig Set Status = 1, CompletedOn = " + Ti.App.SQL.safeSQL(commonObj._dt) + " WHERE FunctionName = " + Ti.App.SQL.safeSQL(sFunctionName) + " and Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel) + " and FlowId = " + Ti.App.SQL.safeSQL(Ti.App.sWorkFlowID));
							commonObj.db.execute("DELETE FROM WorkFlowStatus WHERE FlowId = " + Ti.App.SQL.safeSQL(Ti.App.sWorkFlowID) + " and  FunctionName = " + Ti.App.SQL.safeSQL(sFunctionName) + " and Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel));
							commonObj.db.execute("INSERT INTO WorkFlowStatus (FlowId, FunctionName, Access, Status, CompletedOn, Uploaded) VALUES (" + Ti.App.SQL.safeSQL(Ti.App.sWorkFlowID) + ", " + Ti.App.SQL.safeSQL(sFunctionName) + ", " + Ti.App.SQL.safeSQL(Ti.App.accessLevel) + ",1," + Ti.App.SQL.safeSQL(commonObj._dt) + ",0)");
							Ti.App.configDBConn.execute("Update WorkFlowConfig Set Status = 1, CompletedOn = " + Ti.App.SQL.safeSQL(commonObj._dt) + " WHERE FunctionName = " + Ti.App.SQL.safeSQL(Ti.App.sWorkFlowID) + " and Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel));
							//db.close();
						} else {
							commonObj._dt = new Date();
							commonObj._dt = Ti.App.DATEFORMAT.dbDateFormatSQLite(commonObj._dt);
							Ti.App.configDBConn.execute("Update WorkFlowConfig Set Status = 1, CompletedOn = " + Ti.App.SQL.safeSQL(commonObj._dt) + " WHERE FunctionName = " + Ti.App.SQL.safeSQL(sFunctionName) + " and Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel));
						}
						//db.close();
					} catch (e) { }

					Ti.App.bHomeButtonPressed = true;
					//e._controller.homeButtonPressed();
					var arr = Ti.App.winsStack;
					var length = (parseInt(Ti.App.winsStack.length));
					if (length > 0) {
						var _returnScrName = "";
						//db = commonObj.dbConnectionObj.createDataBaseConnection();
						commonObj.qry = "Select * from WorkFlowConfig WHERE lower(FlowId) = lower(" + Ti.App.SQL.safeSQL(Ti.App.sWorkFlowID) + ") and  Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel) + " Order By OrderNo limit 0,1";
						commonObj.dbDataRows = Ti.App.configDBConn.execute(commonObj.qry);
						if (commonObj.dbDataRows.isValidRow()) {
							//_returnScrName = dbDataRows.fieldByName('FunctionName');
							commonObj._qry = "Select * from Functions WHERE lower(Code) = lower(" + Ti.App.SQL.safeSQL(commonObj.dbDataRows.fieldByName('FunctionName')) + ") limit 0,1";
							commonObj._dbDataRows = Ti.App.configDBConn.execute(commonObj._qry);
							if (commonObj._dbDataRows.isValidRow()) {
								_returnScrName = commonObj._dbDataRows.fieldByName('ScreenName');
							}
							commonObj._dbDataRows.close();
							//return false;	
						}
						commonObj.dbDataRows.close();
						if (_returnScrName == "") {
							commonObj.qry = "Select * from WorkFlowConfig WHERE lower(FunctionName) = lower(" + Ti.App.SQL.safeSQL(Ti.App.currentScreenName) + ") and  Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel) + " Order By OrderNo limit 0,1";
							commonObj.dbDataRows = Ti.App.configDBConn.execute(commonObj.qry);
							if (commonObj.dbDataRows.isValidRow()) {
								//_returnScrName = dbDataRows.fieldByName('FunctionName');
								commonObj._qry = "Select * from Functions WHERE lower(Code) = lower(" + Ti.App.SQL.safeSQL(dbDataRows.fieldByName('FunctionName')) + ") limit 0,1";
								commonObj._dbDataRows = Ti.App.configDBConn.execute(commonObj._qry);
								if (commonObj._dbDataRows.isValidRow()) {
									_returnScrName = commonObj._dbDataRows.fieldByName('ScreenName');
								}
								commonObj._dbDataRows.close();
								//return false;	
							}
							commonObj.dbDataRows.close();
						}
						//db.close();
						var _dRowIndex = 1;
						_dRowIndex = (_returnScrName != "") ? 0 : _dRowIndex;
						var sParentWorkFlowId = '';
						//var db = commonObj.dbConnectionObj.createDataBaseConnection();
						commonObj.qry = "Select * from WorkFlowConfig WHERE  lower(FunctionName) = lower(" + Ti.App.SQL.safeSQL(Ti.App.currentScreenName) + ") and  Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel) + " Order By OrderNo";
						commonObj.dbDataRows = Ti.App.configDBConn.execute(commonObj.qry);
						while (commonObj.dbDataRows.isValidRow()) {
							sParentWorkFlowId = commonObj.dbDataRows.fieldByName('FlowId');
							commonObj.dbDataRows.next();
						}
						commonObj.dbDataRows.close();
						//db.close();
						//commonObj.db.close();
						//for (var ctr = 0; ctr < length; ctr++) {
						for (var ctr = length - 1; ctr > 0; ctr--) {
							var lastWin = arr[ctr];
							//COMMON.Log('Ti.App.sWorkFlowID  ---> ' + Ti.App.sWorkFlowID);
							//COMMON.Log('sParentWorkFlowId   ---> ' + sParentWorkFlowId);
							//COMMON.Log(ctr + '. ScreenName  ---> ' + lastWin.screenName);
							//COMMON.Log('_returnScrName      ---> ' + _returnScrName);
							//COMMON.Log('sFlowScreenName     ---> ' + lastWin.sFlowScreenName);
							if (Ti.App.sWorkFlowID == '') {
								_dRowIndex = ctr;
								ctr = -1;
							} else if (lastWin.screenName == Ti.App.dWorkFlowScreenName) {//} || Ti.App.sWorkFlowID == sParentWorkFlowId){	
								_dRowIndex = ctr + 1;
								ctr = -1;
							} else if (lastWin.screenName == "WorkFlow" && Ti.App.sWorkFlowID == '') {
								_dRowIndex += (ctr + 1);
								ctr = -1;
							} else if (Ti.App.sWorkFlowID != '' && Ti.App.sWorkFlowID != lastWin.sFlowScreenName) {// && lastWin.screenName != "WorkFlow"){	
								//COMMON.Log('lastWin.sFlowLevelID --> ' + lastWin.sFlowLevelID);	
								Ti.App.sWorkFlowID = lastWin.sFlowScreenName;
								Ti.App.WorkFlowLevel = lastWin.sFlowLevelID;
								_dRowIndex += (ctr + 1);
								ctr = -1;
							}

						}
						_dRowIndex = (_dRowIndex != null || _dRowIndex != undefined || _dRowIndex != 0) ? _dRowIndex : 1;
						//COMMON.Log('WIN length : ' + length + ' - _dRowIndex : ' + _dRowIndex);
						for (var ctr = _dRowIndex; ctr < length; ctr++) {
							//COMMON.Log('winsStack.length1 ----> ' + parseInt(Ti.App.winsStack.length));
							var lastWin = arr[_dRowIndex];//var lastWin = arr[1];
							//COMMON.Log('lastWin ScreenName ----> ' + lastWin.screenName);
							arr.splice(_dRowIndex, 1);//1, 1);
							Ti.App.winsStack = arr;
							if (lastWin.screenName != null && lastWin.screenName != undefined && lastWin.screenName != '') {
								lastWin.close();
							}
							//COMMON.Log('winsStack.length2 ----> ' + parseInt(Ti.App.winsStack.length));
						}
					};
					//Ti.App.CustNo = '';
					//Ti.App.CustName = '';
					//Titanium.App.Properties.setList('CUST_FIELDS', []);
					//Ti.App.sWorkFlowID = '';
					//Ti.App.WorkFlowLevel = 1;
					Ti.App.bEnableAndroidBackButton = true;
					Ti.App.dashBoardItemClicked = false;
					Ti.App.bHomeButtonPressed = false;
					//COMMON.Log('alert ' + Ti.App.bSalesCompleted + ' - ' + Ti.App.currentScreenName);

					if (Ti.App.bSalesCompleted == true && Ti.App.currentScreenName == 'Sales') {
						COMMON.showAlert('Invoice Created Successfully.', ["OK"], null);
					}
				}
			} catch (e) { }
		}, 100);
		//COMMON.Log('checkWorkFlow : END : ' + new Date().getTime());
	},
	SendAllDataEnd: function (falg) {
		Ti.App.SendAllDataObj = {};
		Ti.App.SendAllDataObj = "";
		Ti.App.bEnableAndroidBackButton = true;
		Ti.App.dashBoardItemClicked = false;
		COMMON.hideCustIndicator();
		if (falg == true) {
			COMMON.showAlert("Upload Successfully.", ["OK"], null);
		}
	},
	SyncDataEnd: function (sType, flag) {
		//COMMON.Log('SyncDataEnd --> sType : ' + sType + ' - flag : ' + flag);


		Ti.App.bActionConfigSync = false;
		ArrayOperations.prototype.setAllConfig();
		Ti.App.bEnableAndroidBackButton = true;
		//Ti.App.dashBoardItemClicked = false;
		COMMON.hideCustIndicator();
		try {
			Ti.App.SendAllDataObj = {};
			Ti.App.SendAllDataObj = "";
		} catch (e) { }
	},
	alertDialogClick: function (obj) {
		var sType = obj.type;
		sType = (sType == null || sType == undefined) ? '' : sType;
		if (sType.toUpperCase() == 'Synchronization'.toUpperCase()) {
			Ti.App.bActionConfigSync = false;
			Ti.App.bManualSync = false;
			if (obj.index == 0) {


				Ti.App.sDashboardPageName = Ti.App.ARRAYOPERATION.getSystemValue("sDashboardPageName");//'MAIN-100-100';

				//COMMON.Log('DisableExitApp --> ' + ArrayOperations.prototype.getSystemValue('DisableExitApp'));
				if (COMMON.CheckBooleanField(ArrayOperations.prototype.getSystemValue('DisableExitApp')) == true) {
					Ti.App.bActionConfigSync = true;
				}
				if (COMMON.CheckBooleanField(ArrayOperations.prototype.getSystemValue('DisableSendingData')) == false) {
					Ti.App.bSendingData = true;
				}
				//var _dt = new Date();
				//_dt = Ti.App.DATEFORMAT.dbDateFormatSQLite(_dt);
				//var sSyncMsg = sType+' START';
				//Ti.App.dbConn.execute("INSERT INTO CustVisit(CustNo,TransType, TransDate, AgentId,uploaded) VALUES ("+Ti.App.SQL.safeSQL(Ti.App.CustNo)+",  "+Ti.App.SQL.safeSQL(sSyncMsg)+"  ," + Ti.App.SQL.safeSQL(_dt) + ","+ Ti.App.SQL.safeSQL(Ti.App.agentID) + ",1)");

				COMMON.resetXML();
				/*************************************/
				try {
					var qry = "SELECT * FROM CustVisit WHERE TransType = 'GPS-LOC'";
					var database = Ti.App.dbConn;//new dbConnection().createDataBaseConnection();
					dbDataRows = database.execute(qry);
					var resultJSON = "";
					var sCustNo = "", AgentID = "", TransNo = "", TransType = "", TransDate = "", Longitude = "", Latitude = "";
					while (dbDataRows.isValidRow()) {
						sCustNo = (dbDataRows.fieldByName('CustNo') == null || dbDataRows.fieldByName('CustNo') == undefined) ? "" : dbDataRows.fieldByName('CustNo');
						AgentID = (dbDataRows.fieldByName('AgentID') == null || dbDataRows.fieldByName('AgentID') == undefined) ? "" : dbDataRows.fieldByName('AgentID');
						TransNo = (dbDataRows.fieldByName('TransNo') == null || dbDataRows.fieldByName('TransNo') == undefined) ? "" : dbDataRows.fieldByName('TransNo');
						TransType = (dbDataRows.fieldByName('TransType') == null || dbDataRows.fieldByName('TransType') == undefined) ? "" : dbDataRows.fieldByName('TransType');
						TransDate = (dbDataRows.fieldByName('TransDate') == null || dbDataRows.fieldByName('TransDate') == undefined) ? "" : dbDataRows.fieldByName('TransDate');
						Longitude = (dbDataRows.fieldByName('Longitude') == null || dbDataRows.fieldByName('Longitude') == undefined) ? "" : dbDataRows.fieldByName('Longitude');
						Latitude = (dbDataRows.fieldByName('Latitude') == null || dbDataRows.fieldByName('Latitude') == undefined) ? "" : dbDataRows.fieldByName('Latitude');
						if (resultJSON == "") {
							resultJSON = "{'sCustID' : '" + sCustNo + "', 'sAgentId': '" + AgentID + "', 'sTransNo' : '" + TransNo + "', 'sTransType' : '" + TransType + "', 'dtTransDate' : '" + TransDate + "', 'dLongitude' : '" + Longitude + "', 'dLatitude': '" + Latitude + "'}";
						} else {
							resultJSON = resultJSON + ", {'sCustID' : '" + sCustNo + "', 'sAgentId': '" + AgentID + "', 'sTransNo' : '" + TransNo + "', 'sTransType' : '" + TransType + "', 'dtTransDate' : '" + TransDate + "', 'dLongitude' : '" + Longitude + "', 'dLatitude': '" + Latitude + "'}";
						}
						dbDataRows.next();
					}
					dbDataRows.close();
					if (resultJSON != "" && resultJSON != null && resultJSON != undefined) {
						//var CustJSON = JSON.stringify(resultJSON);
						var file = null;
						var d = new Date();
						//var filename = 'CustVisit_' + Titanium.App.Properties.getString('MDT_NO') + d.getDate()+'_'+(d.getMonth()+1)+'_'+d.getFullYear()+'_'+d.getHours()+'_'+d.getMinutes()+'_'+d.getSeconds()+'.json';
						var filename = 'CustVisit_' + Titanium.App.Properties.getString('MDT_NO') + d.getDate() + '_' + (d.getMonth() + 1) + '_' + d.getFullYear() + '.json';
						if (Ti.Platform.name === 'android' && Ti.Filesystem.isExternalStoragePresent()) {
							//file = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, "LOG", filename);
							file = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, "Photo", filename);
							file.write('');
							file.write(resultJSON);//,true);
						} else {
							file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, filename);
							file.write('');//,true);
							file.write(resultJSON);//,true);
						}
						resultJSON = '';
						resultJSON = null;
						commonObj.db = Ti.App.dbConn;//commonObj.dbConnectionObj.createDataBaseConnection();
						commonObj.db.execute("DELETE FROM UploadFiles WHERE FileName = '" + filename + "'");
						commonObj.db.execute("INSERT INTO UploadFiles (FileName, Uploaded, Master) VALUES ('" + filename + "',0,0)");
						//commonObj.db.close();
						/********
						var sFile = '', sfileName = '';
						sfileName = filename;
						//COMMON.Log('http UploadPhoto : sfileName -> ' + sfileName);
						
						if (Ti.Platform.name === 'android'){
			                file = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory,"LOG", sfileName);
			                sFilePath = Ti.Filesystem.externalStorageDirectory+"LOG/";
			            } else {
			                file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, sfileName);
			                sFilePath = Ti.Filesystem.applicationDataDirectory;
			            }
			            if (file.exists()) {
							var xhrpost = Ti.Network.createHTTPClient();
							xhrpost.onload = function(e){
								//COMMON.Log('onload');
								var MDT = Titanium.App.Properties.getString('MDT_NO');//DETAILS.get('MDT_NO');
								Titanium.App.Properties.setString('SYNC_SCREEN', 'USER');
								
								COMMON.showIndicator('Loading Please Wait...');
								Ti.App.SendAllDataObj = {};
								//var obj = {};
								
								
								//COMMON.resetXML();
								Ti.App.isDashboardScreen = false;
								Ti.App.dashBoardItemClicked = false;
								//obj.controller = ArrayOperations.prototype;
								Ti.App.bEnableAndroidBackButton = false;
								Ti.App.SendAllDataObj = {};//obj;
								//sending all data to sever 
								var SendData = require('/utils/SendData');
								var SENDDATAOBJ = new SendData();
								SENDDATAOBJ.SendAllDatatoServer();
							};
							xhrpost.onerror = function(e){
								//COMMON.Log('onerror');
								var MDT = Titanium.App.Properties.getString('MDT_NO');//DETAILS.get('MDT_NO');
								Titanium.App.Properties.setString('SYNC_SCREEN', 'USER');
								
								COMMON.showIndicator('Loading Please Wait...');
								Ti.App.SendAllDataObj = {};
								//var obj = {};
								
								
								//COMMON.resetXML();
								Ti.App.isDashboardScreen = false;
								Ti.App.dashBoardItemClicked = false;
								//obj.controller = ArrayOperations.prototype;
								Ti.App.bEnableAndroidBackButton = false;
								Ti.App.SendAllDataObj = {};//obj;
								//sending all data to sever 
								var SendData = require('/utils/SendData');
								var SENDDATAOBJ = new SendData();
								SENDDATAOBJ.SendAllDatatoServer();
							};
							var posturl = Ti.App.URL_POSTWEBSERVICE;
							xhrpost.open('POST', posturl); 
							xhrpost.setRequestHeader("Content-Type", "text/xml");
							xhrpost.setRequestHeader('Cache-Control','no-cache');
							xhrpost.setRequestHeader('Cache-Control','no-store');
							xhrpost.setRequestHeader('SOAPAction', 'http://tempuri.org/InsertRecalculate');
							
							try {
				        		var Compression = require('ti.compression');
								var outputDirectory = sFilePath;
								var inputDirectory = sFilePath;
								var fileName = sfileName+".zip";
								var writeToZip = outputDirectory + fileName;
								var targetName = sfileName;
								var result = Compression.zip(writeToZip, [inputDirectory + targetName]);
								if (result == 'success') {
								} else {
								}
							} catch(e) {}
						
							
							if (Ti.Platform.name === 'android'){
				                file = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory,"LOG", fileName);
				            } else {
				                file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, fileName);
				            }
				            sFile = file.read();
							var params ="<?xml version='1.0' encoding='utf-8'?><soap:Envelope xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'><soap:Body><UploadCustVisit xmlns='http://tempuri.org/'><f>"+Ti.Utils.base64encode(sFile).toString()+"</f><fileName>"+sfileName+"</fileName><sMDTNo>"+Titanium.App.Properties.getString('MDT_NO')+"</sMDTNo></UploadCustVisit></soap:Body></soap:Envelope>";
			   				xhrpost.send(params);
							return "";
						}
						/********/
					}
				} catch (e) { }
				/************************************************************************************/
				//ADMIN SYNC
				var MDT = Titanium.App.Properties.getString('MDT_NO');//DETAILS.get('MDT_NO');
				Titanium.App.Properties.setString('SYNC_SCREEN', 'USER');
				COMMON.showIndicator('Loading Please Wait...');
				Ti.App.SendAllDataObj = {};
				//var obj = {};
				//COMMON.resetXML();
				Ti.App.isDashboardScreen = false;
				Ti.App.dashBoardItemClicked = false;
				//obj.controller = ArrayOperations.prototype;
				Ti.App.bEnableAndroidBackButton = false;
				Ti.App.SendAllDataObj = {};//obj;
				//sending all data to sever 

				/*var SendData = require('/utils/SendData');
				var SENDDATAOBJ = new SendData();
				SENDDATAOBJ.SendAllDatatoServer();*/

				//COMMON.Log('Ti.App.bSendingData --> ' + Ti.App.bSendingData);
				//COMMON.Log('DisableExitApp --> ' + ArrayOperations.prototype.getSystemValue('DisableExitApp'));
				//if(Ti.App.bSendingData == false){
				if (COMMON.CheckBooleanField(ArrayOperations.prototype.getSystemValue('DisableSendingData')) == false) {
					Ti.App.bSendingData = true;
				}
				Ti.App.SendAllDataObj = {};


				if (COMMON.CheckBooleanField(ArrayOperations.prototype.getSystemValue('DisableExitApp')) == true) {
					//Ti.App.bActionConfigSync = true;
					Titanium.App.Properties.setString('SYNC_SCREEN', 'USER');
					var _obj = {};
					Ti.App.bManualSync = true;
					_obj.controller = Ti.App.currentController;//ArrayOperations.prototype;
					_obj.fieldName = 'DashboardSync';
					Ti.App.bEnableAndroidBackButton = false;
					Ti.App.SendAllDataObj = _obj;
				}



				var SendData = require('/utils/SendData');
				var SENDDATAOBJ = new SendData();
				SENDDATAOBJ.SendAllDatatoServer();
				//}
				return true;
				/************************************************************************************/
				/*
				var Sync = require('/utils/SYNC');
				var SYNC = new Sync();
				SYNC.StartADMINSync();
				*/
			} else {
				Ti.App.bSendingData = false;
				Ti.App.dashBoardItemClicked = false;
				Ti.App.bEnableAndroidBackButton = true;
			}
		} else if (sType.toUpperCase() == "SendData".toUpperCase()) {
			if (obj.index == 0) {

				//var _dt = new Date();
				//_dt = Ti.App.DATEFORMAT.dbDateFormatSQLite(_dt);
				//var sSyncMsg = sType+' START';
				//Ti.App.dbConn.execute("INSERT INTO CustVisit(CustNo,TransType, TransDate, AgentId, uploaded) VALUES ("+Ti.App.SQL.safeSQL(Ti.App.CustNo)+",  "+Ti.App.SQL.safeSQL(sSyncMsg)+"  ," + Ti.App.SQL.safeSQL(_dt) + ","+ Ti.App.SQL.safeSQL(Ti.App.agentID) + ",1)");

				//USER SYNC
				//DETAILS.set('SYNC_SCREEN', "USER");
					if (COMMON.CheckBooleanField(ArrayOperations.prototype.getSystemValue('DisableSendingData')) == false) {
					Ti.App.bSendingData = true;
				}
				//Titanium.App.Properties.setString('SYNC_SCREEN', '');
				Titanium.App.Properties.setString('SYNC_SCREEN', 'SENDDATA');
				COMMON.showIndicator('Loading Please Wait...');
				Ti.App.SendAllDataObj = {};
				var obj = {};
				obj.controller = ArrayOperations.prototype;
				Ti.App.dashBoardItemClicked = false;
				Ti.App.isDashboardScreen = false;
				Ti.App.bEnableAndroidBackButton = false;
				Ti.App.SendAllDataObj = obj;
				//sending all data to sever 
				var SendData = require('/utils/SendData');
				var SENDDATAOBJ = new SendData();
				SENDDATAOBJ.SendAllDatatoServer();
				return true;
			} else {
				Ti.App.bSendingData = false;
				Ti.App.dashBoardItemClicked = false;
				Ti.App.bEnableAndroidBackButton = true;
			}
		} else if (sType.toUpperCase() == "LoadLastInvoice".toUpperCase()) {
			if (obj.index == 1) {
				obj.sInvNo = '';
			} else {
				if (obj.arrVoidInvNo != null && obj.arrVoidInvNo != undefined && obj.arrVoidInvNo != '') {
					if (obj.arrVoidInvNo.length > 1) {
						var optionsDialogOpts = {
							options: obj.arrVoidInvNo,
							title: 'Voided Invoices'
						};
						optionsDialogOpts.selectedIndex = -1;
						var dialog = Titanium.UI.createOptionDialog(optionsDialogOpts);
						dialog.title = 'Voided Invoices';
						dialog.addEventListener('click', function (e) {
							if (optionsDialogOpts.options != undefined && optionsDialogOpts.options != null) {
								if (e.index == -1 || optionsDialogOpts.options[e.index] == undefined) {//back key pressed
									Ti.App.currentWin.activatedWindow = true;
									Ti.App.bEnableAndroidBackButton = true;
									Ti.App.isDashboardScreen = false;
									return;
								}
							}
							obj.sInvNo = obj.arrVoidInvNo[e.index];
							commonObj.db = Ti.App.dbConn;//commonObj.dbConnectionObj.createDataBaseConnection();
							commonObj.db.execute("INSERT INTO TempOrderdet (OrderNo, itemid, itemname, uom, qty, price, amount, PromoID, Priority, PromoOffer, CustProdCode, DisPer, DisPr, Remarks, ReasonCode, LineNum, AutoNum, SalesType, SugQty, HistoryItem) Select 'temp' ,itemid, itemname, uom, qty, price, amount, PromoId, Priority, PromoOffer, CustProdCode, DisPer, DisPr, Remarks, ReasonCode, LineNum, LineNum, SalesType, 0, 1 from Invdet WHERE InvnO = '" + obj.sInvNo + "' order by LineNum");
							//commonObj.db.close();
							Ti.App.currentWin.currentRow = null;
							Ti.App.currentWin.activatedWindow = true;
							Ti.App.currentWin.lastSelectedRow = null;
							Ti.App.currentRow = null;
							mView.openWindow(obj.sFunctionName, obj);
							Ti.App.bEnableAndroidBackButton = true;
							Ti.App.isDashboardScreen = false;
						});
						dialog.show();
						return false;
					} else {
						obj.sInvNo = obj.arrVoidInvNo[0];
					}
				}
				if (obj.sInvNo != null && obj.sInvNo != undefined && obj.sInvNo != '') {
					commonObj.db = Ti.App.dbConn;//commonObj.dbConnectionObj.createDataBaseConnection();
					commonObj.db.execute("INSERT INTO TempOrderdet (OrderNo, itemid, itemname, uom, qty, price, amount, PromoID, Priority, PromoOffer, CustProdCode, DisPer, DisPr, Remarks, ReasonCode, LineNum, AutoNum, SalesType, SugQty, HistoryItem) Select 'temp' ,itemid, itemname, uom, qty, price, amount, PromoId, Priority, PromoOffer, CustProdCode, DisPer, DisPr, Remarks, ReasonCode, LineNum, LineNum, SalesType, 0, 1 from Invdet WHERE InvnO = '" + obj.sInvNo + "' order by LineNum");
					//commonObj.db.close();
				}
			}
			Ti.App.currentWin.currentRow = null;
			Ti.App.currentWin.activatedWindow = true;
			Ti.App.currentWin.lastSelectedRow = null;
			Ti.App.currentRow = null;
			mView.openWindow(obj.sFunctionName, obj);
			Ti.App.bEnableAndroidBackButton = true;
			Ti.App.isDashboardScreen = false;
		} else if (sType.toUpperCase() == "LocationPermission".toUpperCase()) {
			Ti.Android.requestPermissions('android.permission.ACCESS_FINE_LOCATION', function (e) {
				if (e.success) {
					//COMMON.Log("Enabled ");
					Ti.App.bEnableAndroidBackButton = true;
					Ti.App.isDashboardScreen = false;
					Ti.App.dashBoardItemClicked = false;
					Ti.App.COMMON.hideIndicator();
				} else {
					//COMMON.Log("CheckPremission ERROR: " + e.error);
					Ti.App.bEnableAndroidBackButton = true;
					Ti.App.isDashboardScreen = false;
					Ti.App.dashBoardItemClicked = false;
					Ti.App.COMMON.hideIndicator();
				}
			});
		}
	},
	handleFieldAction: function (sScreenName, sFieldName, sDataMember) {
	},
	checkColorConfigWithValidation: function () {
	},
	UpdateFrmTblData: function (tableView, screenName, fieldName) {
		var query = ArrayOperations.prototype.getQueryConfigByScreenNameWithOrderText(screenName + "_FORM_LISTVIEW_" + fieldName);
		if (query != null && query != undefined && query != '') {
			ArrayOperations.prototype.resetRowiIndex();
			//COMMON.Log('chart query ---> ' + query);
			var tmpArrFormValues = ArrayOperations.prototype.loadData(screenName + "_FORM_LISTVIEW_" + fieldName, query, 0, false);
			tableView.data = tmpArrFormValues;
		}
	},
	loadMultipleIMagewithQry: function (QryName, formdata) {

		//COMMON.Log("InsideUpdateMultipleIMG"+JSON.stringify(formdata));
		var query = ArrayOperations.prototype.getQueryConfigByScreenName(QryName);

		var dMultiplePhotoIndex = 0;
		//var db = commonObj.dbConnectionObj.createDataBaseConnection();
		//COMMON.Log('4805 '+query);
		dbDataRows = Ti.App.dbConn.execute(query);
		var bImgFound = false;
		while (dbDataRows.isValidRow()) {
			bImgFound = false;
			test = dbDataRows.fieldByName('ImgName');
			test = (test == null || test == undefined || test == '') ? '' : test;
			if (test != '') {
				var imgPath = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'MultiplePhoto_tmp', test);
				try {
					var file = (bIsAndroid) ? Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, 'MultiplePhoto_tmp', test) : Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'MultiplePhoto_tmp', test);
					if (file.exists()) {
						bImgFound = true;
						var imgPath = file.nativePath;
					} else {
						//test = test.replace('png', 'simg');
						//return '/images/' + fileName;
						file = (bIsAndroid) ? Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, 'Photo', test) : Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'Photo', test);
						if (file.exists()) {
							bImgFound = true;
							var imgPath = file.nativePath;
						} else {
							test = test.replace('png', 'simg');
							//return '/images/' + fileName;
							file = (bIsAndroid) ? Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, 'MultiplePhoto_tmp', test) : Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'MultiplePhoto_tmp', test);
							if (file.exists()) {
								bImgFound = true;
								var imgPath = file.nativePath;
							} else {
								file = (bIsAndroid) ? Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, 'Photo', test) : Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'Photo', test);
								if (file.exists()) {
									bImgFound = true;
									var imgPath = file.nativePath;
								} else {
									//COMMON.Log('5314 Multipleimage not found');
								}
							}
						}
						//else{
						//	file = null;
						//	bImgFound = false;
						//	var imgPath = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'camdisplay.simg');//'/images/camdisplay.simg';
						//}
					}
				} catch (e) {
					bImgFound = false;
					var imgPath = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'camdisplay.simg');//'/images/camdisplay.simg';
				}
			} else {
				bImgFound = false;
				var imgPath = Ti.App.ImageCacheObj.getImage('MobileSalesCache', 'camdisplay.simg');//'/images/camdisplay.simg';
			}
			var _ImgCtrlWidth = 80, _ImgCtrlHeight = 100;

			_ImgCtrlWidth = _ImgCtrlWidth * Ti.App.dHeightRatio;
			_ImgCtrlHeight = _ImgCtrlHeight * Ti.App.dHeightRatio;
			//var ImgCtrlView = TableViewBasicUIObj.createBasicView(null, 'transparent', formdata.ValueHeight, (formdata.ValueHeight * 0.8), 0, 0, 0, 0, '');
			//sMultiplePhotoView.ImgHeight = _ImgCtrlHeight;
			//sMultiplePhotoView.ImgWidth = _ImgCtrlWidth;
			var ImgCtrlView = TableViewBasicUIObj.createBasicView(null, 'transparent', _ImgCtrlHeight, _ImgCtrlWidth, 0, 0, 0, 0, '');
			var img = new BasicImageView().createImageView(null, imgPath, 'auto', 'auto');//formdata.dValueWidth * pWidth, formdata.ValueHeight);
			img.height = _ImgCtrlHeight;
			img.width = _ImgCtrlWidth;
			img.left = 0;//_ImgCtrlWidth;
			img.enableZoomControls = false;
			img.fieldControl = formdata.fieldControl.toUpperCase();
			img.fieldName = formdata.fieldName;
			img.dataMember = formdata.dataMember;
			img.DataMemberType = formdata.DataMemberType;
			img.index = dMultiplePhotoIndex;
			img.bMultiplePhoto = true;
			img.borderWidth = 1;
			img.borderColor = '#e8e8e8';
			img.bImgFound = bImgFound;
			img.imgPath = imgPath;
			img.imgName = test;
			img.screenName = formdata.screenName;
			img.sControlType = 'MULTIPLEPHOTO';
			try {
				var dOrientation = dbDataRows.fieldByName('Orientation');
				dOrientation = (dOrientation == null || dOrientation == undefined || dOrientation == '') ? 1 : dOrientation;
			} catch (e) {
				var dOrientation = 1;
			}
			img.dOrientation = dOrientation;
			img.addEventListener('click', function (e) {
				try {
					//mController.showCamera(this, e.source.fieldName);
					if (this.bImgFound == false) {

						var qry = "SELECT * FROM ActionConfig WHERE Actionname = 'CameraIconClicked' and ScreenName=" + Ti.App.SQL.safeSQL(e.source.screenName) + " and FieldName = " + Ti.App.SQL.safeSQL(e.source.fieldName) + " and (ifnull(Access,'') ='' OR Access = " + Ti.App.SQL.safeSQL(Ti.App.accessLevel) + ") ORDER By ActionName, DisplayNo";
						//COMMON.Log('6648 qry ---> ' + qry);
						var dbDataRows = Ti.App.configDBConn.execute(qry);
						if (dbDataRows.isValidRow()) {
							dbDataRows.close();
							//db.close();	
							mController.CameraIconClicked(this, e.source.fieldName);
							return false;
						}

						mController.showCamera(this, e.source.fieldName);
					} else {
						mController.showPreviewPopup(this, e.source.fieldName);
					}
				} catch (e) { }
			});
			formdata.add(img);
			dMultiplePhotoIndex = dMultiplePhotoIndex + 1;
			dbDataRows.next();
		}
	},
	CustOpenaction: function (qry) {
		//COMMON.Log("UpdateListConfig|updatequery->" + qry);
		var result = '';
		var qryarr = '';
		var _screenname = qry;
		var Updateqry = "Select * from Queryconfig WHERE lower(ScreenName) = lower(" + Ti.App.SQL.safeSQL(_screenname) + ") limit 0,1";
		var _dbDataRows = Ti.App.configDBConn.execute(Updateqry);
		if (_dbDataRows.isValidRow()) {
			result = _dbDataRows.fieldByName('QueryText');
			//COMMON.Log("UpdateListConfig|ResultQry->" + result);
			if (result != undefined && result != '') {
				qryarr = result.split('$$');
				Ti.App.DBCOMMON.BulkInsertQueries(qryarr);
			}

		}
	},
	UpdateListConfig: function (qry) {
		//COMMON.Log("UpdateListConfig|updatequery->" + qry);
		var result = '';
		var qryarr = '';
		var _screenname = qry;
		var Updateqry = "Select * from Queryconfig WHERE lower(ScreenName) = lower(" + Ti.App.SQL.safeSQL(_screenname) + ") limit 0,1";
		var _dbDataRows = Ti.App.configDBConn.execute(Updateqry);
		if (_dbDataRows.isValidRow()) {
			result = _dbDataRows.fieldByName('QueryText');
			//COMMON.Log("UpdateListConfig|ResultQry->" + result);
			if (result != undefined && result != '') {
				qryarr = result.split('$$');
				Ti.App.DBCOMMON.BulkInsertQueries(qryarr);
			}

		}
	},
	getDetailFooterView: function () {
		try {
			return mView.getDetailFooterView();
		} catch (e) { }
	},
	closeAllPrevWindows: function () {

		//alert('closeAllPrevWindows -->');
		var arr = Ti.App.winsStack;
		var length = (parseInt(Ti.App.winsStack.length));
		//alert(length);
		if (length < 0) {
			return;
		}
		if (Ti.App.winsStack.length > 0) {
			for (var ctr = 0; ctr < length; ctr++) {
				var lastWin = arr[0];
				arr.splice(0, 1);
				Ti.App.winsStack = arr;
				lastWin.close();
				//alert('Closed --> '+lastWin.title);
			}
		};
	},
	getUnreadMessageCount: function () {
		var tmpcnt = 0;
		try {
			var dbDataRows1 = Ti.App.dbConn.execute(Ti.App.ARRAYOPERATION.getQueryConfigByScreenName('UnreadMessageCount'));
			while (dbDataRows1.isValidRow()) {
				tmpcnt = dbDataRows1.fieldByName('cnt');
				dbDataRows1.next();
			}
			dbDataRows1.close();
			//COMMON.Log("tmpcnt " + tmpcnt);
		} catch (e) {
			return 0;
		}
		return tmpcnt;

	},
	getCurrentPosition: function () {
		try {
			var checkgps = require('com.simplr.gpscheck');
			//COMMON.Log("LINE checkgps " + checkgps.isLocationEnabled());
			if (checkgps.isLocationEnabled()) {
				return true;
			} else {
				COMMON.showAlert("GPS Location not enabled. Please enable", ["OK"], null);
				return false;
			}
		} catch (e) { 
			//COMMON.Log("Error " + e); 
		}

		if (!Ti.Android.hasPermission('android.permission.ACCESS_FINE_LOCATION')) {
			//COMMON.Log("getCurrentPosition false");

			var params1 = {};
			params1.bType = "LocationPermission";
			params1.type = "LocationPermission";
			params1.controller = ArrayOperations.prototype;
			COMMON.showAlert("Location permission not enabled. Please enable", ["OK"], params1);
			Ti.App.bEnableAndroidBackButton = true;
			Ti.App.isDashboardScreen = false;
			Ti.App.dashBoardItemClicked = false;
			Ti.App.COMMON.hideIndicator();

			COMMON.hideIndicator();
			return false;
		} else {
			//COMMON.Log("getCurrentPosition true");
			return true;
		}
	},
	dataSync: function () {
		if (Titanium.Network.networkType == Titanium.Network.NETWORK_NONE) {
			Ti.App.eventTriggered = false;
			Ti.App.dashBoardItemClicked = false;
			Ti.App.bEnableAndroidBackButton = true;
			Ti.App.isDashboardScreen = false;
			COMMON.showAlert("Please check your network connection.", ["OK"], null);
			return;
		} else {
			Ti.App.eventTriggered = false;
			Ti.App.bEnableAndroidBackButton = false;
			Ti.App.dashBoardItemClicked = true;
			Ti.App.isDashboardScreen = false;
			var obj = {};
			obj.cancel = 1;
			obj.controller = ArrayOperations.prototype;
			obj.type = 'Synchronization';
			COMMON.showAlert("Do you want to synchronize?", ["YES", "NO"], obj);
			return false;
		}
	}
};
module.exports = ArrayOperations;