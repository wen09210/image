'use strict';

var isIE = (navigator.userAgent.replace(/^.*MSIE\s+(\d+\.\d+).*$/ig, '$1') * 1) <= 10;
var ieVer = navigator.userAgent.replace(/^.*MSIE\s+(\d+\.\d+).*$/ig, '$1') * 1;
var str = navigator.appVersion;

var console = console || { "log": function () { } };

var ltIE9 = (navigator.userAgent.replace(/^.*MSIE\s+(\d+\.\d+).*$/ig, '$1') * 1) < 9;
var isIE = (navigator.userAgent.replace(/^.*MSIE\s+(\d+\.\d+).*$/ig, '$1') * 1) <= 10;
var ltIE8 = (navigator.userAgent.replace(/^.*MSIE\s+(\d+\.\d+).*$/ig, '$1') * 1) < 8;
var ie_version = detectIE()
var vRandom = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
var bRandom = new Array("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z");
//
function detectIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
        // Edge (IE 12+) => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
}
//////////////



function GetRandValue(iDenominator, iExceptNum) {
    var iResult = Math.round(Math.random() * iDenominator) % iDenominator;
    if (iExceptNum == iResult)
        iResult = GetRandValue(iDenominator, iExceptNum);
    return iResult;

}

function RandomizeBoardEng() {
    //doloopfor 10 times;
    for (var i = 0; i <= 26; i++) {
        var iRan01 = GetRandValue(26, 0);
        var iRan02 = GetRandValue(26, iRan01);
        var iTemp = bRandom[iRan01];
        bRandom[iRan01] = bRandom[iRan02];
        bRandom[iRan02] = iTemp;
    }
}


function RandomizeBoard() {

    //doloopfor 10 times;
    for (var i = 0; i <= 10; i++) {
        var iRan01 = GetRandValue(10, 0);
        var iRan02 = GetRandValue(10, iRan01);
        var iTemp = vRandom[iRan01];
        vRandom[iRan01] = vRandom[iRan02];
        vRandom[iRan02] = iTemp;
    }
}


function pressKey(value, input_name) {
    // alert(value);
    var target = $("input[name='" + input_name + "']");

    //console.log(input_name);

    if (target.val().length < target.prop('maxlength')) {
        target.val(target.val() + value);
    }
}

function pressKeyboard(value, input_name) {
    // alert(value);
    var target = $("input[name='" + input_name + "']");

    if (target.val().length < target.prop('maxlength')) {
        target.val(target.val() + value);
    }
}

function toggleErrorMsg(error_msg, a_position) {
    if (error_msg) {
        $("#Errormsg .content").html(error_msg);
        var top = a_position.top
        var left = a_position.left;
        $("#Errormsg").css("left", left).css("top", top).fadeIn("fast");
    } else {
        $("#Errormsg").fadeOut("fast");
    }
}

function toggleKeypad(a_boolean, a_top, a_left, input_name) {
    //console.log(a_boolean);

    if (a_boolean) {
        $("#LoginKeyboard").hide();
        var wrap_offset_top = $("#login-panel-wrap").offset().top;
        a_top = a_top - wrap_offset_top;
        //動態產生鍵盤位置
        RandomizeBoard();
        //將鍵盤插入對應位置

        for (var i = 0; i < 10; i++) {
            //$('#key_' + i).html(vRandom[i]).click = pressKeyboard(vRandom[i], input_name);
            $('#key_' + i).html("<a class=\"p_5 block\" onclick=\"pressKey('" + vRandom[i] + "', '" + input_name + "')\">" + vRandom[i] + "</a>");
        }

        $("#LoginKeypad").css("left", a_left);
        $("#LoginKeypad").css("top", a_top);
        $("#LoginKeypad").show();

        $("#LoginKeypad a.close-panel").unbind().bind("click", function (e) {
            e.preventDefault();
            $("#LoginKeypad").hide();
        })
        $(".reset").unbind().bind("click", function (e) {
            e.preventDefault();
            var target = $("input[name='" + input_name + "']");
            target.val("");
            //console.log("target:", target);
        })
        //pauseCarosel(true);
    } else {
        $("#LoginKeypad").hide();
    }
}


function toggleKeyboard(a_boolean, a_top, a_left, input_name) {
    //console.log(a_boolean);
    //動態產生鍵盤位置
    RandomizeBoard();
    RandomizeBoardEng();
    //將鍵盤插入對應位置

    var wrap_offset_top = $("#login-panel-wrap").offset().top;
    a_top = a_top - wrap_offset_top;

    for (var i = 0; i < 10; i++) {
        $('#keyb_' + i).html("<a class=\"p_5 block\" onclick=\"pressKeyboard('" + vRandom[i] + "', '" + input_name + "')\">" + vRandom[i] + "</a>");
    }

    for (var i = 0; i < 26; i++) {
        $('#keyb_' + (i + 10)).html("<a class=\"p_5 block\" onclick=\"pressKeyboard('" + bRandom[i] + "', '" + input_name + "')\">" + bRandom[i] + "</a>");
    }

    if (a_boolean) {
        $("#LoginKeypad").hide();
        
        $("#LoginKeyboard").css("left", a_left);
        $("#LoginKeyboard").css("top", a_top);
        $("#LoginKeyboard").show();

        $("#LoginKeyboard a.close-panel").unbind().bind("click", function (e) {
            e.preventDefault();
            $("#LoginKeyboard").hide();
        })

        $(".reset").unbind().bind("click", function (e) {
            e.preventDefault();
            var target = $("input[name='" + input_name + "']");
            target.val("");
            //console.log("target:", target);
        })


    } else {
        $("#LoginKeyboard").hide();
    }
}


var errorMsg;

$(function () {
    $('input[type="checkbox"]').uniform();

    if (ie_version !== false) {
        if (ie_version < 10) {
            // ie8.9 表單要placeholder
            if (typeof $.fn.placeholder != 'undefined')
                $("input, textarea").placeholder();
            // ie8.9 文字text-shadow
            if (typeof $.fn.ieTextShadow != 'undefined')
                $(".text_shadow").ieTextShadow();
        }
    }
    var checkIsNumeric = function (e) {
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57))
            && (e.keyCode < 96 || e.keyCode > 105)
            && e.keyCode != 110
            && e.keyCode != 9 //tab
            && e.keyCode != 37 //<
            && e.keyCode != 39 //>
            && e.keyCode != 46 //del
            && e.keyCode != 8) {

            return false;
        }

        return true;
    }
    var createErrorMsg = function () {
        var html = '';
        html += '<div id="Errormsg" class="arrow-up-box errormsg-box">';
        html += '<div class="content">';
        html += '</div>';
        html += '<a class="close-panel hide-text" href="javascript:;">X</a>';
        html += '</div>';
        //errorMsg = $("#Errormsg");
        errorMsg = $(html);

        $("#login-panel-wrap").append(errorMsg);

        $("#Errormsg a.close-panel").bind("click", function (e) {
            e.preventDefault();
            toggleErrorMsg();
        });
        
    }

    $('input[name="passwordKeyin"]').bind("keydown", function (e) {
        if (!checkIsNumeric(e)) {
            e.preventDefault();
        }
    })
    $('input[name="ImageCheckCode"]').bind("keydown", function (e) {
        if (!checkIsNumeric(e)) {
            e.preventDefault();
        }
    })

    $("#signInButton").bind("click", function (e) {
        e.preventDefault();

        $(".form-control").removeClass("error");
        var CustID = $.trim($("input[name='CustID']").val());
        var UserIdKeyin = $.trim($("input[name='UserIdKeyin']").val());
        var passwordKeyin = $.trim($("input[name='passwordKeyin']").val());
        var ImageCheckExists = $("input[name='ImageCheckCode']").length != 0;
        var ImageCheckCode = $.trim($("input[name='ImageCheckCode']").val());
        //
        var error_msg = "";
        var error_target = [];
        var target;
        //
        if ($("input[name='EmployeeID']").length > 0) {
            var EmployeeID = $.trim($("input[name='EmployeeID']").val());
            var EmployeePassword = $.trim($("input[name='EmployeePassword']").val());

            if (EmployeeID == "") {
                target = $("input[name='EmployeeID']");
                error_target.push(target);
                error_msg += target.attr("errormsg") + "<br/>";

            }
            if (EmployeePassword == "") {
                target = $("input[name='EmployeePassword']");
                error_target.push(target);
                error_msg += target.attr("errormsg") + "<br/>";
            }
        }

        if (CustID == "") {
            target = $("input[name='CustID']");
            error_target.push(target);
            error_msg += target.attr("errormsg") + "<br/>";
        }

        if (passwordKeyin == "") {
            target = $("input[name='passwordKeyin']");
            error_target.push(target);
            error_msg += target.attr("errormsg") + "<br/>";
        }

        if (UserIdKeyin == "") {
            target = $("input[name='UserIdKeyin']");
            error_target.push(target);
            error_msg += target.attr("errormsg") + "<br/>";
        }

        if (ImageCheckExists && ImageCheckCode == "") {
            target = $("input[name='ImageCheckCode']");
            error_target.push(target);
            error_msg += target.attr("errormsg") + "<br/>";
        }


        var total = error_target.length;
        if (!$("html").hasClass("safari9")) {
            for (var j = 0; j < total; j++) {

                error_target[j].addClass("error"); //.parents(".form-group")
            }
        }
        if (error_msg != "") {
            $("#Errormsg .content").html(error_msg);
            var top = 0;//error_target[0].parent().offset().top - $("#Errormsg").height()/2 -3;
            var left = 0;//$(".CUB-login-panel").offset().left+295;
            var position = {};
            position.top = top;
            position.left = left;
        } else {

        }
        if (error_target.length) {
            var top = error_target[0].parent().position().top + 35;// - $("#Errormsg").height()/2 -3;
            var left = $(".login-panel").position().left + 20;//+295;
            var position = {};
            position.top = top;
            position.left = left;
            // updateParentDimension();
            toggleErrorMsg(error_msg, position);
        }
        
    })

    $(".show-keyboard.keypad").bind("click", function (e) {
        e.preventDefault();
        var top = $(this).offset().top + 25;
        var left = 45.5;//$(this).offset().left;
        var input_name = $(this).data('input-name');
        toggleKeypad(true, top, left, input_name);
        //console.log(input_name);
    })

    $(".show-keyboard.keyboard").bind("click", function (e) {
        e.preventDefault();
        var top = $(this).offset().top + 25;
        var left = 12.5;//$(this).offset().left;
        var input_name = $(this).data('input-name');
        toggleKeyboard(true, top, left, input_name);
        //console.log(input_name);

    })


    $("input[name='CustID']").bind("focus", function () {
        $("#LoginKeyboard").hide();
    })

    $("input[name='passwordKeyin']").bind("focus", function () {
        $("#LoginKeypad").hide();
    })

    $("input[name='UserIdKeyin']").bind("focus", function () {
        $("#LoginKeyboard").hide();
        $("#LoginKeypad").hide();
    })
    //
    $("input[name='ImageCheckCode']").bind("focus", function () {
        $("#LoginKeyboard").hide();
        $("#LoginKeypad").hide();
    })

    //$(".virtual-keyboard").hide();
    //
    $(".keypad-closed").bind("click", function (e) {
        e.preventDefault();
        $(this).parents(".virtual-keyboard").hide();
        return false;
    })


    $(".form_style input[type='checkbox']").uniform();
    createErrorMsg();
    toggleKeyboard(false);
});