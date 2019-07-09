//<!-- Onload -->
$(window).load(function () {
    /*Slider*/
    $('.flexslider').flexslider({
        animation: "slide",
        directionNav: false
    });
    String.prototype.trim = function () {
        return this.replace(/(^\s*)|(\s*$)/g, "");
    }
});

//<!-- Ready -->
$(document).ready(function () {
    /*Sliding panel*/
    $(".moreServices").hide();

    $(".triggerServices").toggle(function () {
        $(this).addClass("active");
    }, function () {
        $(this).removeClass("active");
    });
    $(".triggerServices").click(function () {
        $('.moreServices').slideToggle('fast');
    });

    $("#mobile-submenu").hide();
    $(".currentServices").toggle(function () {
        $(this).addClass("active");
        if ($(".moreServices").is(':hidden') == false) {
            $(".moreServices").slideUp();
            $(".triggerServices").removeClass("active");
        }
    }, function () { $(this).removeClass("active"); });
    $(".currentServices").click(function () { $('#mobile-submenu').slideToggle('fast'); });



    $("#messagePanel").hide();
    $(".message-trigger").toggle(function () { $(this).addClass("current"); $(".messages-count").hide(); }, function () { $(this).removeClass("current"); });
    $(".message-trigger").click(function () {
        if ($(this).hasClass('current')) {
            if ($.trim($('#mtabs').html()) == '') {
                $('#mtabs').load('../Home/Message_Tabs',
                    function () {
                        $('#messagePanel').slideToggle('fast');
                        $('#mtabs').tabs();
                    }
                 );
            }
            else {
                $('#mtabs').tabs("destroy");
                $('#mtabs').load('../Home/Message_Tabs',
                    function () {
                        $('#messagePanel').slideToggle('fast');
                        $('#mtabs').tabs();
                    }
                 );
            }
        }
        else {
            $('#messagePanel').slideToggle('fast');
        }
    });

    $("#mMessagePanel").hide();
    $(".mMessages").toggle(function () { $(this).addClass("current"); $(".mMessages-count").hide(); }, function () { $(this).removeClass("current"); });
    $(".mMessages").click(function () {

        if ($(this).hasClass('current')) {
            if ($.trim($('#ntabs').html()) == '') {
                $('#ntabs').load('../Home/Message_Tabs',
                    function () {
                        $('#mMessagePanel').slideToggle('fast');
                        $('#ntabs').tabs();
                    }
                 );
            }
            else {
                $('#ntabs').tabs("destroy");
                $('#ntabs').load('../Home/Message_Tabs',
                    function () {
                        $('#mMessagePanel').slideToggle('fast');
                        $('#ntabs').tabs();
                    }
                 );
            }
        }
        else {
            $('#mMessagePanel').slideToggle('fast');
        }
    });

    $("#recentActivity").hide();
    $(".raMaximize").toggle(function () { $(this).addClass("active"); }, function () { $(this).removeClass("active"); });
    $(".raMaximize").click(function () { $('#recentActivity').slideToggle('fast'); });

    $(".myFavorite").hide();
    $(".mfMaximize").toggle(function () { $(this).addClass("active"); }, function () { $(this).removeClass("active"); });
    $(".mfMaximize").click(function () { $('.myFavorite').slideToggle('fast'); });

    $(".tabPanel").hide();
    $(".tabSetting").toggle(function () { $(this).addClass("active"); }, function () { $(this).removeClass("active"); });
    $(".tabSetting").click(function () { $(this).next(".tabPanel").slideToggle(); });

    $(".functionContainer").hide();
    $(".functionExpandAll").toggle(function () { $(this).addClass("active"); }, function () { $(this).removeClass("active"); });
    $(".functionExpandAll").click(function () { $('.functionContainer').slideToggle('fast'); });
	
	$("#otp-inline").hide(); 
    $(".otp-inline-toggler").toggle(function(){ $(this).addClass("active"); }, function () { $(this).removeClass("active");});
    $(".otp-inline-toggler").click(function(){ $('#otp-inline').slideToggle('fast');});

    /*Modal box*/
    $(".iframe").colorbox({ iframe: true, width: "95%", height: "95%" });
    $(".inline").colorbox({ inline: true, width: "95%", height: "95%" });
    $("#dialogBox").jqm({ trigger: ".dialogTrigger", modal: true, toTop: true });
    $("#busyBox").jqm({ trigger: ".busyTrigger", modal: true, toTop: true });
    $("#newsBox").jqm({ trigger: ".newsTrigger", modal: true, toTop: true });
	$("#processingBox").jqm({trigger: ".processingTrigger",modal: true});
    $("#processingBox2").jqm({ modal: true, trigger: false, toTop: true, overlayClass: "processingBox2" });
    $("#processingBox2").jqmHide();
    $("#AppletBox").jqm({ modal: true, trigger: false, toTop: true });
    $("#AppletBox").jqmHide();
    $("#noteBox").jqm({ trigger: ".noteTrigger", modal: true, toTop: true });
    $("#modalBox").jqm({ trigger: ".modalTrigger", modal: true, toTop: true });

    /*Accordions*/
    $("#submenu .submenu").Accordion({
        openItems: [0],
        arrowUp: "action-expand.png",
        arrowDown: "action-collapse.png",
        expandAll: ".expand",
        collapseAll: ".collapse",
        accordionControl: ".accordionControl",
        toggle: false
    });
    $('.accordionControl .expand').click(function () {
        $('#expand_li').hide();
        $('#collapse_li').show();
    });
    $('.accordionControl .collapse').click(function () {
        $('#collapse_li').hide();
        $('#expand_li').show();
    });
    $("#mobileSubmenu .submenu").Accordion({
        openItems: "none",
        arrowUp: "action-expand.png",
        arrowDown: "action-collapse.png",
        toggle: false
    });
    $("#mobileSubmenu .vipcolor").Accordion({
        openItems: "none",
        arrowUp: "action-expand-vip.png",
        arrowDown: "action-collapse-vip.png",
        toggle: false
    });

});

//<!-- Initial -->
$(function () {

    /*Tipsy*/
    $('.tipS').tipsy({ gravity: 's' });
    $('.tipN').tipsy({ gravity: 'n' });




    /*Custom form*/
    $(".chzn-select").chosen();
    $("select, .check, .check :checkbox, input:radio, input:file").uniform();

    /*jQuery UI tab*/
    //$('#mtabs').tabs();
    //$('#ntabs').tabs();	
    $('#stabs').tabs();
    $('.wtabs').tabs({
        ajaxOptions: {
            type: 'post',
            beforeSend: function () {
                showMask();
            },
            complete: function () {
                hideMask();
            }
        }
    });




});
$(document).ready(function () {
    $('#sidebarTrigger').click(
            function () {
                if ($(this).hasClass("triggerSidebar")) {
                    $(".content-narrow").css("margin-right", "0");
                    $("#asidebar div.widget").hide();
                    $(this).removeClass("triggerSidebar").addClass("triggerSidebarExpand");
                    $("#asidebar div.bannersHolder").hide();
                } else {
                    $(".content-narrow").css("margin-right", "214px");
                    $("#asidebar div.widget").show();
                    $(this).removeClass("triggerSidebarExpand").addClass("triggerSidebar");
                    if ($.trim($("#asidebar div.bannersHolder slides").html()).length > 0) {
                    $("#asidebar div.bannersHolder").show();
                }
                }
            });
    $('#sidebarTriggerHome').click(
            function () {
                if ($(this).hasClass("triggerSidebar")) {
                    $(".content").css("margin-right", "0");
                    $("#sidebar div.widget").hide();
                    $(this).removeClass("triggerSidebar").addClass("triggerSidebarExpand");
                    $("#sidebar div.bannersHolder").hide();
                } else {
                    $(".content").css("margin-right", "214px");
                    $("#sidebar div.widget").show();
                    $(this).removeClass("triggerSidebarExpand").addClass("triggerSidebar");
                    if ($.trim($("#sidenav div.bannersHolder slides").html()).length > 0) {
                        $("#sidenav div.bannersHolder").show();
                    }
                }
            });
    $('#sidenavTrigger').click(
            function () {
                if ($(this).hasClass("triggerSidenav")) {
                    $(".content-narrow").css("margin-left", "0");
                    $("#sidenav div.widget").hide();
                    $(this).removeClass("triggerSidenav").addClass("triggerSidenavExpand");
                    $("#sidenav div.bannersHolder").hide();
                } else {
                    $(".content-narrow").css("margin-left", "214px");
                    $("#sidenav div.widget").show();
                    $(this).removeClass("triggerSidenavExpand").addClass("triggerSidenav");
                    if ($.trim($("#sidenav div.bannersHolder slides").html()).length > 0) {
                    $("#sidenav div.bannersHolder").show();
                }
                }
            });

});
//?�罩
$(function () {
    $("a[data-ajax=true]:not([data-ajax-init=true])").filter(function () {
        var _Link = $(this);
        _Link.attr("data-ajax-init", true);
        var _begin = _Link.attr("data-ajax-begin");
        var _update = _Link.attr("data-ajax-update");
        if (_begin == undefined || _begin == "") {
            _Link.attr("data-ajax-begin", 'showMask()');
        }
        else {
            if (_begin.indexOf("(") != -1) {
                _Link.attr("data-ajax-begin", 'return ' + _begin + ' && showMask();');
            } else {
                _Link.attr("data-ajax-begin", 'return ' + $.trim(_begin) + '() && showMask();');
            }
        }

        var _complete = _Link.prop("data-ajax-complete");
        if (_complete == undefined || _complete == "") {
            _Link.attr("data-ajax-complete", 'hideMask(\'' + _update + '\')');
        }
        else {
            if (_complete.indexOf("(") != -1) {
                _Link.attr("data-ajax-complete", 'return ' + _complete + ' && hideMask(\'' + _update + '\');');
            } else {
                _Link.attr("data-ajax-complete", 'return ' + $.trim(_complete) + '() && hideMask(\'' + _update + '\');');
            }
        }

            });
    $("form[data-ajax=true]:not([data-ajax-init=true])").filter(function () {
        var _form = $(this);
        _form.attr("data-ajax-init", true);
        var _begin = _form.attr("data-ajax-begin");
        var _update = _form.attr("data-ajax-update");
        if (_begin == undefined || _begin == "") {
            _form.attr("data-ajax-begin", 'showMask()');
        }
        else {
            if (_begin.indexOf("(") != -1) {
                _form.attr("data-ajax-begin", 'return ' + _begin + ' && showMask();');
            } else {
                _form.attr("data-ajax-begin", 'return ' + $.trim(_begin) + '() && showMask();');
            }
        }

        var _complete = _form.attr("data-ajax-complete");
        if (_complete == undefined || _complete == "") {
            _form.attr("data-ajax-complete", 'hideMask(\'' + _update + '\')');
        }
        else {
            if (_complete.indexOf("(") != -1) {
                _form.attr("data-ajax-complete", 'return ' + _complete + ' && hideMask(\'' + _update + '\');');
            } else {
                _form.attr("data-ajax-complete", 'return ' + $.trim(_complete) + '() && hideMask(\'' + _update + '\');');
            }
        }

    });
});