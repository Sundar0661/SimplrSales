var decimalValue = 0;

//function Number() {

//}

function roundNumber(rnum, rlength) {// Arguments: number to round, number of decimal places

    var newnumber = 0;
    var decimalVal = 0;
    decimalVal = (rlength == null || rlength == undefined) ? 0 : rlength;
    /*if (rlength != -1) {
        decimalVal = DETAILS.get('QTY_DECIMAL_VALUE');
    } else {
        decimalVal = DETAILS.get('PRICE_DECIMAL_VALUE');
    }*/

    if (decimalVal == undefined || decimalVal == null || decimalVal == 'undefined' || decimalVal == 'null') {
        decimalVal = 0;
    }
    decimalVal = parseInt(decimalVal);

    newnumber = Math.round(rnum * Math.pow(10, decimalVal)) / Math.pow(10, decimalVal);
    if (decimalVal > 0) {
        return this.formatFloat(newnumber, decimalVal);
    } else {
        return newnumber;
    }
}

function parseDouble(value) {
    if (typeof value == "string") {
        value = value.match(/^-?\d*/)[0];
    }
    return !isNaN(parseInt(value)) ? value * 1 : NaN;
}
function formatFloat(val, decimalVal) {
    val = String(val);
    var num = val;

    if (val.indexOf('.') == -1) {
        for (var i = 0; i < decimalVal; i++) {
            if (i == 0) {
                num = val + ".0";
            } else {
                num = num + "0";
            }
        }
    } else {
        var arr = val.split(".");
        if (arr[1].length == decimalVal) {
            num = val;
        } else {
            for (var i = 0; i < (decimalVal - parseInt(arr[1].length)) ; i++) {
                if (i == 0) {
                    num = val + "0";
                } else {
                    num = num + "0";
                }
            }
        }
    }
    return String(num);
}
function CInt(Value) {
    return this.trim(Value + "") == '' ? 0 : parseInt(Value);
}
function validateInt(value) {
    value = value.replace(/[^0-9]+/, "");
    return value;
}
function isNumber(n) {
    if (n == '' || n == null) {
        return false;
    } else {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
}
function ceil(n) {
    return Math.ceil(n);
}
/* mathRound : function(number, decimal){
     decimal = (decimal == null || decimal == undefined || decimal == 'undefined' || decimal == '') ? 2 : decimal;
     try{
         number = parseFloat(number);
         return number.toFixed(decimal);	
     }catch(e){
         
         Ti.API.info(e);
         alert(e);
         return parseFloat(this.roundNumber(number,decimal));
     }
 },*/

function RoundAwayFromZero(startValue, digits) {
    decimalValue = 0;
    digits = digits || 0;

    startValue *= parseFloat(Math.pow(10, (digits + 1)));

    decimalValue = parseInt(Math.floor(startValue)) - (Math.floor(startValue / 10) * 10);

    startValue = Math.floor(startValue / 10);

    if (decimalValue >= 5) {
        startValue += 1;
    }
    startValue /= parseFloat(Math.pow(10, (digits)));
    return startValue;
}
function mathRound(number, decimal) {
    //decimal = (decimal == null || decimal == undefined || decimal == 'undefined' || decimal == '') ? 2 : decimal;
    if (number == null || number == undefined) {
        return 0;
    }

    try {
        if (number.toString() == '') {
            return 0;
        }
    } catch (e) {
    }

    decimal = (decimal == null || decimal == undefined || decimal == 'undefined' || decimal == '') ? 0 : parseInt(decimal);
    try {
        number = parseFloat(number);
        //return number.toFixed(decimal);
        //return this.RoundAwayFromZero(number,decimal);
        var newnumber = this.RoundAwayFromZero(number, decimal);
        if (decimal >= 0) {
            //return this.formatFloat(newnumber, decimal);
            return newnumber.toFixed(decimal);
        } else {
            return newnumber;
        }

    } catch (e) {
        Ti.API.info(e);
        //alert(e);
        return parseFloat(this.roundNumber(number, decimal));
    }

}

function formatNumber(dVal) {
    return dVal.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}




Number.prototype = {
    lpad: function (padString, length) {
        var str = padString;
        while (str.length < length)
            str = '' + padString + str;
        return str;
    },
    rpad: function (padString, length) {
        var str = padString;
        while (str.length < length)
            str = '' + str + padString;
        return str;
    },
    roundNumber: function (rnum, rlength) {// Arguments: number to round, number of decimal places

        var newnumber = 0;
        var decimalVal = 0;
        decimalVal = (rlength == null || rlength == undefined) ? 0 : rlength;
        /*if (rlength != -1) {
            decimalVal = DETAILS.get('QTY_DECIMAL_VALUE');
        } else {
            decimalVal = DETAILS.get('PRICE_DECIMAL_VALUE');
        }*/

        if (decimalVal == undefined || decimalVal == null || decimalVal == 'undefined' || decimalVal == 'null') {
            decimalVal = 0;
        }
        decimalVal = parseInt(decimalVal);

        newnumber = Math.round(rnum * Math.pow(10, decimalVal)) / Math.pow(10, decimalVal);
        if (decimalVal > 0) {
            return this.formatFloat(newnumber, decimalVal);
        } else {
            return newnumber;
        }
    },
    parseDouble: function (value) {
        if (typeof value == "string") {
            value = value.match(/^-?\d*/)[0];
        }
        return !isNaN(parseInt(value)) ? value * 1 : NaN;
    },
    formatFloat: function (val, decimalVal) {
        val = String(val);
        var num = val;

        if (val.indexOf('.') == -1) {
            for (var i = 0; i < decimalVal; i++) {
                if (i == 0) {
                    num = val + ".0";
                } else {
                    num = num + "0";
                }
            }
        } else {
            var arr = val.split(".");
            if (arr[1].length == decimalVal) {
                num = val;
            } else {
                for (var i = 0; i < (decimalVal - parseInt(arr[1].length)) ; i++) {
                    if (i == 0) {
                        num = val + "0";
                    } else {
                        num = num + "0";
                    }
                }
            }
        }
        return String(num);
    },
    CInt: function (Value) {
        return this.trim(Value + "") == '' ? 0 : parseInt(Value);
    },
    validateInt: function (value) {
        value = value.replace(/[^0-9]+/, "");
        return value;
    },
    isNumber: function (n) {
        if (n == '' || n == null) {
            return false;
        } else {
            return !isNaN(parseFloat(n)) && isFinite(n);
        }
    },
    ceil: function (n) {
        return Math.ceil(n);
    },
    /* mathRound : function(number, decimal){
         decimal = (decimal == null || decimal == undefined || decimal == 'undefined' || decimal == '') ? 2 : decimal;
         try{
             number = parseFloat(number);
             return number.toFixed(decimal);	
         }catch(e){
             
             Ti.API.info(e);
             alert(e);
             return parseFloat(this.roundNumber(number,decimal));
         }
     },*/

    RoundAwayFromZero: function (startValue, digits) {
        decimalValue = 0;
        digits = digits || 0;

        startValue *= parseFloat(Math.pow(10, (digits + 1)));

        decimalValue = parseInt(Math.floor(startValue)) - (Math.floor(startValue / 10) * 10);

        startValue = Math.floor(startValue / 10);

        if (decimalValue >= 5) {
            startValue += 1;
        }
        startValue /= parseFloat(Math.pow(10, (digits)));
        return startValue;
    },
    mathRound: function (number, decimal) {
        //decimal = (decimal == null || decimal == undefined || decimal == 'undefined' || decimal == '') ? 2 : decimal;
        if (number == null || number == undefined) {
            return 0;
        }

        try {
            if (number.toString() == '') {
                return 0;
            }
        } catch (e) {
        }

        decimal = (decimal == null || decimal == undefined || decimal == 'undefined' || decimal == '') ? 0 : parseInt(decimal);
        try {
            number = parseFloat(number);
            //return number.toFixed(decimal);
            //return this.RoundAwayFromZero(number,decimal);
            var newnumber = this.RoundAwayFromZero(number, decimal);
            if (decimal >= 0) {
                //return this.formatFloat(newnumber, decimal);
                return newnumber.toFixed(decimal);
            } else {
                return newnumber;
            }

        } catch (e) {
            Ti.API.info(e);
            //alert(e);
            return parseFloat(this.roundNumber(number, decimal));
        }

    },

    formatNumber: function (dVal) {
        return dVal.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }

};
//module.exports = Number;
