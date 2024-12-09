GetGridHeaderDetails("../PriceGroup/GetPriceHeader", "../PriceGroup/GetPriceValue", "PriceHead", "PriceBody");
GetFormConfig("../PriceGroup/GetPriceFormList", "FormDivId");


function SavePriceGroup() {


    var dataList = '';
    for (var i = 0; i < FieldIdList.length; i++) {
        // dataList += "" + FieldIdList[i].split('$')[0] + "$=&" + $('#' + FieldIdList[i].split('$')[0]).val();
        dataList += "" + FieldIdList[i] + "$=&" + $('#' + FieldIdList[i]).val();
        if (i != (FieldIdList.length - 1))
            dataList += "$*&"
    }


    var dd = "AA=" + 1 + "$&";
    dd += "BB=" + 1 + "";

    $.ajax({
        url: url_save,
        //  url: POSTURL,
        type: 'POST',
        dataType: 'json',
        // data: { employees: dd },
        data: { data: dataList },
        // contentType: 'application/json; charset=utf-8',
        success: function (results) {
            alert(results);


        },
        error: function (results, q, a) {
            alert(results);
            //jQuery.error(String.format("Status Code: {0}, ", results.status, results.statusText));
        }

    });

}