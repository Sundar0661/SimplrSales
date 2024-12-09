var DashNameArrayList = [];
var HeaderHeightList = [];
var HeaderWidthList = [];
var ValueHeightList = [];
var ValueWidthList = [];
var HFontSizeList = [];
var VFontSizeList = [];
var HForeColorList = [];
var HBackColorList = [];
var VForeColorList = [];
var VBackColorList = [];
var HFontList = [];
var VFontList = [];
var HFontStyle = [];
var VFontStyle = [];
var HAlignment = [];
var VAlignment = [];

function GetDashList() {
    $.ajax({
        type: 'GET',
        url: '../DashBoardIcons/GetDashList',
        dataType: 'json',
        success: function (data) {
            //  data = $.parseJSON(data);
            var htm = '';
            var maxColNo = 0;
            for (var j = 0; j < data.length; j++) {
                if (data[j].ColNo == 0 && j != 0) {
                    maxColNo = data[(j - 1)].ColNo;
                    maxColNo++;
                    j = data.length + 1;
                }
            }

            for (var i = 0; i < data.length; i++) {
                HeaderHeightList.push(data[i].HeaderHeight + "%");
                HeaderWidthList.push(data[i].HeaderWidth + "%");
                ValueHeightList.push(data[i].ValueHeight + "px");
                ValueWidthList.push(data[i].ValueWidth + "%");
                HFontSizeList.push(data[i].HFontSize + "px");
                VFontSizeList.push(data[i].VFontSize + "px");
                HForeColorList.push(argbToRGB(data[i].HForeColor));
                HBackColorList.push(argbToRGB(data[i].HBackColor));
                VForeColorList.push(argbToRGB(data[i].VForeColor));
                VBackColorList.push(argbToRGB(data[i].VBackColor));
                HFontList.push(data[i].HFont);
                VFontList.push(data[i].VFont);
                HFontStyle.push(data[i].HFontStyle);
                VFontStyle.push(data[i].VFontStyle);
                HAlignment.push(data[i].HAlignment);
                // VAlignment.push(data[i].VAlignment);
                DashNameArrayList.push(data[i].FunctionText);

                var colWidth = (data[i].ValueWidth - maxColNo) / maxColNo;
                colWidth = colWidth + "%";

                //htm += '<a href="#"  class="btn btn-success btn-lg" role="button" style="font-style:' + VFontList[i] + ';font-size:' + VFontSizeList[i] + ';background-color:' + VBackColorList[i] + ';color:' + VForeColorList[i] + ';font-family: ' + VFontList[i] + ';width:' + ValueWidthList[i] + ';height:' + ValueHeightList[i] + ';color:' + VForeColorList + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';>';
                htm += '<a href="#" onclick="FormConfig(\'' + data[i].FunctionText + '\');"  class="btn btn-default btn-lg" role="button" style="font-style:' + VFontList[i] + ';font-size:' + VFontSizeList[i] + ';background-color:' + VBackColorList[i] + ';color:' + VForeColorList[i] + ';font-family: ' + VFontList[i] + ';width:' + colWidth + ';height:' + ValueHeightList[i] + ';color:' + VForeColorList + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';">';
                //   htm += '<span class="fa fa-tachometer" style="margin-top: 25px;"></span>';
                htm += '<i style="margin-top: 40px;" class="' + data[i].IconImage + '"></i>';
               // htm += '<span class="glyphicon glyphicon-comment glyphiconmargintop"></span>';
                htm += '<br />';
                htm += data[i].FunctionText;
                htm += '</a>&nbsp;&nbsp;';

                //htm += '<a href="#" class="btn btn-primary btn-lg" role="button" style="font-style:' + VFontList[i] + ';font-size:' + VFontSizeList[i] + ';background-color:' + VBackColorList[i] + ';color:' + VForeColorList[i] + ';font-family: ' + VFontList[i] + ';width:' + colWidth + ';height:' + ValueHeightList[i] + ';color:' + VForeColorList + ';text-align:' + getAlignStyle(data[i].VAlignment) + ';">';
                //htm += '<span class="glyphicon glyphicon-comment glyphiconmargintop"></span>';
                //htm += '<br />';
                //htm += 'Comments</a>';


            }
            $(Menutext).append(htm);

        }

    });
}

function argbToRGB(color) {
    return '#' + ('000000' + (color & 0xFFFFFF).toString(16)).slice(-6);
}

var FontStyle = {
    font_stylenormal: 0,
    font_weightbold: 100,
}
var FontStylekeys = Object.keys(FontStyle).sort(function (a, b) {
    return FontStyle[a] - FontStyle[b];
});
function getFontStyle(value) {
    return FontStylekeys[value];
}

var AlignStyle = {
    Center: 0,
    Right: 1,
    Left: 2
}
var keys = Object.keys(AlignStyle).sort(function (a, b) {
    return AlignStyle[a] - AlignStyle[b];
});
function getAlignStyle(value) {
    return keys[value];
}
 