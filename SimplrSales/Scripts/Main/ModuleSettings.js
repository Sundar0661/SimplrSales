var ModuleNameArrayList = [];

var ModuleConfigList = '';
function GetModuleConfig(screenName) {
    $.ajax({
        type: 'POST',
        url: url_GetModuleConfig,
        data: { screenName: screenName },
        dataType: 'json',
        async: false,
        success: function (data) {
            ModuleConfigList = data;
            return data;
        }
    });
}

function ModuleConfig() {
    GetModuleConfig("Main");
    var mainModuleList = ModuleConfigList;
    var subModuleList = '';

    var htm = '';
    htm += '<ul class="tree">';
    for (var i = 0; i < mainModuleList.length; i++) {
        htm += '<li><input id="' + mainModuleList[i].MenuDisplayText + '" value="' + mainModuleList[i].MenuDisplayText + '" type="checkbox" /><a href="#">' + mainModuleList[i].MenuDisplayText + '</a>';
        htm += '<ul>';

        GetModuleConfig("Main_" + mainModuleList[i].MenuCode);
        subModuleList = ModuleConfigList;
        for (var j = 0; j < subModuleList.length; j++) {
            htm += '<li><input id="' + mainModuleList[i].MenuDisplayText + '_' + subModuleList[j].MenuDisplayText.replace(/ /g, '') + '"  value="' + mainModuleList[i].MenuDisplayText + '.' + subModuleList[j].MenuDisplayText + '" type="checkbox" /><a href="#">' + subModuleList[j].MenuDisplayText + '</a>';
            htm += '</li>';
        }
        htm += '</ul>';
        htm += '</li>';
    }
    htm += '</ul>';
    $(ModuleSettingsId).append(htm);

    TreeOpen();
    GetUserAccessList();
}

//ModuleConfig();


function TreeOpen() {
    var tree = document.querySelectorAll('ul.tree a:not(:last-child)');
    for (var i = 0; i < tree.length; i++) {
        tree[i].addEventListener('click', function (e) {
            var parent = e.target.parentElement;
            var classList = parent.classList;
            if (classList.contains("open")) {
                classList.remove('open');
                if (parent.querySelectorAll.arguments != null) {
                    var opensubs = parent.querySelectorAll(':scope .open');
                    for (var i = 0; i < opensubs.length; i++) {
                        opensubs[i].classList.remove('open');
                    }
                }
            } else {
                classList.add('open');
            }
        });
    }


    $(':checkbox').on('click', function (event) {
        event.stopPropagation();
        var clk_checkbox = $(this),
        chk_state = clk_checkbox.is(':checked'),
        parent_li = clk_checkbox.closest('li'),
        parent_uls = parent_li.parents('ul');
        parent_li.find(':checkbox').prop('checked', chk_state);
        parent_uls.each(function () {
            parent_ul = $(this);
            parent_state = (parent_ul.find(':checkbox').length == parent_ul.find(':checked').length);
            parent_ul.siblings(':checkbox').prop('checked', parent_state);
        });
    });
}




function GetUserAccessList() {
    $('#ModuleSettingsId').find('input[type=checkbox]:checked').removeAttr('checked');

    if ($('#SalesMan').val() != "")
        $.ajax({
            type: 'POST',
            url: url_GetUserAccessList,
            data: { UserId: $('#SalesMan').val() },
            dataType: 'json',
            async: false,
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    $('#' + data[i].ModuleName.replace('.', '_').replace(/ /g, '')).prop('checked', true);
                }

            }
        });
}


function saveModuleSettingsForm1() {
    var selected = new Array();
    //Reference the CheckBoxes and insert the checked CheckBox value in Array.
    $("#ModuleSettingsId input[type=checkbox]:checked").each(function (e) {
        selected.push(this.value);
        //selected.push(this.id);
    });
    var jsonData = JSON.stringify({ 'selected': selected, 'UserId': $('#SalesMan').val() })
    $.ajax({
        type: 'POST',
        url: url_SaveModuleSettingsForm,
        // data: JSON.stringify(selected),
        data: jsonData,
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (result) {
            alert(result);
        },
        error: function (result) {
            alert('Fail ');
        }
    });
}