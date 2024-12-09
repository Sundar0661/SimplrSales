//var Details = require('/utils/Details');
//var DETAILS = new Details();
//var Exception = require('/utils/Exception');
//var EXCEPTION = new Exception();
/*var errorDetails = {};
errorDetails.classname = 'CustomerNewListModel';
errorDetails.methodname = '';
errorDetails.errorMessage = "Invalid Character Entered.";*/
function DataBaseConnection() {

}

DataBaseConnection.prototype.createDataBaseConnection = function () {
    try {
        //return Titanium.Database.open(DETAILS.get('DBNAME')); //Database Name assigned at app.js based on external card availability
        return Titanium.Database.open(Titanium.App.Properties.getString('DBNAME'));
    } catch (e) {
        //EXCEPTION.showWarnMessage(errorDetails, e);
        alert('DBCONNECTION : ' + e);
        return null;
    }
};
//module.exports = DataBaseConnection;