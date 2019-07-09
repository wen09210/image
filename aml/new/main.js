var isIE = (navigator.userAgent.replace(/^.*MSIE\s+(\d+\.\d+).*$/ig, '$1') * 1) <= 10;
var ieVer = navigator.userAgent.replace(/^.*MSIE\s+(\d+\.\d+).*$/ig, '$1') * 1;
var str = navigator.appVersion;

var console = console || { "log": function () { } };

var ltIE9 = (navigator.userAgent.replace(/^.*MSIE\s+(\d+\.\d+).*$/ig, '$1') * 1) < 9;
var isIE = (navigator.userAgent.replace(/^.*MSIE\s+(\d+\.\d+).*$/ig, '$1') * 1) <= 10;
var ltIE8 = (navigator.userAgent.replace(/^.*MSIE\s+(\d+\.\d+).*$/ig, '$1') * 1) < 8;
var ie_version =  detectIE()
//

var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

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

$(function() {

    var resetLaptop = function(){
        $(".sf-mega").each(function(){
            var length = $(".float-left",$(this)).length;
            var padding = 30*2;
            var gap = 32*(length-1)
            var line = 1*2
            var navWidth = 0;
            $(this).css({ position: "absolute", visibility: "hidden", display: "block" });
            $(".float-left",$(this)).each(function(){
                navWidth += $(this).width();
            })
            $(this).width(navWidth + gap+ padding + line);
            $(this).css({ position: "absolute", visibility: "visible", display: "none" });
        })

        $("ul.first-level>li").each(function () {

            if ($(this).find('>a').length > 0) {

                var menu_w = $(this).outerWidth();

                var submenu_w = $(this).find(".sf-mega").outerWidth(true);

                var submenu_center_w = $("#sub-menu .center").width();
                var diff_menu_submenu_w = submenu_w - menu_w;
                var pos_x = $(this).offset().left - $(this).parent().offset().left;

                $(this).find(".sf-mega").css('left', -1);

                //console.log('sub-menu-center',submenu_center_w);
                //console.log('submenu_w+pos_x',submenu_w + pos_x);
                //

                //
                if (submenu_w + pos_x > submenu_center_w) {
                    $(this).find(".sf-mega").css('right', -2).css('left', 'auto');
                    if (diff_menu_submenu_w > pos_x) {
                        if (diff_menu_submenu_w / 2 + pos_x + menu_w > submenu_center_w) {
                            var add = diff_menu_submenu_w / 2 + pos_x + menu_w - submenu_center_w;
                            $(this).find(".sf-mega").css('left', menu_w / 2 - submenu_w / 2 - add);
                           // console.log("A",submenu_w,submenu_center_w);
                        } else if (pos_x - diff_menu_submenu_w / 2 < 0) {
                            var add = diff_menu_submenu_w - pos_x;
                            $(this).find(".sf-mega").css('left', -pos_x + 1);
                            //console.log("B");
                        } else {
                            $(this).find(".sf-mega").css('left', menu_w / 2 - submenu_w / 2);
                            //console.log("C");
                        }
                    }
                }else{
                   // console.log("align_left");
                }
               // console.log('-------------------');
            }
        })
    }
    var initLaptop = function(){
        
        //console.log('initLaptop');

        $("ul.first-level").addClass('column-' + $("ul.first-level>li").not('.border').length);
        //
        $("ul.sf-sub>li>ul").show();

        $("#site-menu").removeClass("fixed");
        $("#info-menu").removeClass("fixed");
        $("#sub-menu").removeClass("fixed");
        $("html").removeClass("mobile");
        
        resetLaptop();
        //
        $('#sub-menu').superfish({ 
            popUpSelector: '.sf-mega',
            speedOut: 0, 
            delay: 300, 
            speed: 'fast' 
        });

        var headerH = $("#header").height();
        var headerSubH = $("#sub-menu").height();

        var waypoints = $('body').waypoint(function(direction) {
            if(_mode != "laptop")
                return;
            switch(direction){
                case 'down':
                    $("#header").addClass("fixed");
                    $("#main-wrapper").css("padding-top",headerH)
                    resetLaptop();
                break;

                case 'up':
                    $("#header").removeClass("fixed");
                    $("#main-wrapper").css("padding-top",0)
                    resetLaptop();
                break;
            }
        }, {
          offset: -headerH+headerSubH
        });
    }

    var resetMode = function(){

       // console.log("resetMode");

        if($('#sub-menu').superfish){
            $('#sub-menu').superfish('destroy');
        }
        $(".sf-mega").removeAttr('style');
        $("li.border").show();
        $(".fa.fa-caret-right.mr_5").show();
        $(".first-level").show();
        $(".first-level .sf-mega").hide();
        $("ul.sf-sub").show();
        $("ul.sf-sub>li>ul").hide();
        $(".first-level>li>a").removeClass("active");
        $("ul.sf-sub > li > a").removeClass("active");
        $("#m-nav-ctrl").removeClass("active");
    }

    var viewport = function() {
        var e = window, a = 'inner';
        if (!('innerWidth' in window )) {
            a = 'client';
            e = document.documentElement || document.body;
        }
        return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
    }
    var initMobile = function(){

        //console.log('initMobile');

        $(".first-level").hide();
        $("li.border").hide();
        $(".fa.fa-caret-right.mr_5").hide();

        $("html").addClass("mobile");
        // $("#header").addClass("fixed");
        $("#site-menu").addClass("fixed");
        $("#info-menu").addClass("fixed");
        $("#sub-menu").addClass("fixed");


        $("#main-wrapper").removeAttr('style');

                    
        var prevA = undefined;
        $(".first-level>li>a").unbind("click").bind("click",function(e){
            e.preventDefault();

            if($(this).hasClass("active")){
                prevA.toggleClass("active");
                prevA.siblings().toggleClass("active").slideToggle(0);
                prevA = undefined;
               return false; 
            }
            if(prevA != undefined){
                prevA.toggleClass("active");
                prevA.siblings().toggleClass("active").slideToggle(0);
            }
            
            $(this).toggleClass("active");
            $(this).siblings().toggleClass("active").slideToggle(0);
            prevA = $(this);
        })

        $("ul.sf-sub > li > a").unbind("click").bind("click",function(e){
            e.preventDefault();
            $(this).toggleClass("active");
            $(this).siblings().toggleClass("active").slideToggle(0);
        })

        $("#m-nav-ctrl").unbind("click").bind("click",function(e){
            e.preventDefault();
            $(this).toggleClass("active");
            $("#sub-menu .first-level").slideToggle(0);
            $("html").toggleClass("nav-open");
        })

        /*
        var headerH = 59
        var waypoints = $('body').waypoint(function(direction) {
            switch(direction){
                case 'down':
                    $("#header").addClass("fixed");
                break;

                case 'up':
                    $("#header").removeClass("fixed");
                break;
            }
        }, {
          offset: -headerH
        })
        */
    }

    var _mode = "";

    var _windowW = viewport().width;

    $(window).bind("resize",function(e){

         _windowW = viewport().width;

         //console.log(_windowW,960);
        if(_windowW>959){
            var new_mode = "laptop";
        }else{
            var new_mode = "mobile";
        }
        if(new_mode != _mode){
            _mode = new_mode;
            if(_mode == "mobile"){
                resetMode();
                initMobile();
            }
            else{
                resetMode();
                initLaptop();
            }
        }else{
            if(_mode == "laptop"){
                resetLaptop();
            }
        }
    }).trigger("resize");

 
/*
    if(_windowW>960){
        _mode = "laptop";
    }

    if(_mode == "mobile"){
        initMobile();
    }
    else{
        initLaptop();
    }
*/

    // if(isMobile.any()){
    //     initMobile();
    // }
    // else{
    //     initLaptop();
    // }


});