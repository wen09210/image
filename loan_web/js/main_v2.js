var isIE = (navigator.userAgent.replace(/^.*MSIE\s+(\d+\.\d+).*$/ig, '$1') * 1) <= 10;
var ieVer = navigator.userAgent.replace(/^.*MSIE\s+(\d+\.\d+).*$/ig, '$1') * 1;
var str = navigator.appVersion;

var console = console || { "log": function () { } };

var ltIE9 = (navigator.userAgent.replace(/^.*MSIE\s+(\d+\.\d+).*$/ig, '$1') * 1) < 9;
var isIE = (navigator.userAgent.replace(/^.*MSIE\s+(\d+\.\d+).*$/ig, '$1') * 1) <= 10;
var ltIE8 = (navigator.userAgent.replace(/^.*MSIE\s+(\d+\.\d+).*$/ig, '$1') * 1) < 8;
var ie_version =  detectIE()
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

// 表單驗證時需要加class
function formFailure(){
    $("select.error").parents(".select_style").addClass("error");
}
$(function() {
    var pageId;
    var pageTypeId;
    
    var tabID;
    var targetTab;
    //var urlName = location.search;
    var urlName;
    var urlID;


    var ComponentCard_Resize = function(){
        if($(".component_card").length<=0){
            return;
        }

        $(".component_card").each(function(){
            var scope = $(this);
            var maxH = 0;
            var containerW = scope.width();
            var itemW = $("li",scope).eq(0).width();
            var row = Math.floor(containerW / itemW);
            var gap = 25;
            var length = $("li",scope).length;
            $("li",scope).each(function(index){
                var r = index%row;
                // console.log('idx',idx,'r',r);
                if(r == 0 && index > 0){
                    var _start = index-row;
                    var _end = index;
                    // console.log('maxH+gap',maxH+gap)
                    $("li",scope).slice(_start,_end).css("height",maxH+gap);
                    maxH = 0;
                }
                var _h = $(".card_content",$(this)).height()+180;
                if(maxH < _h){
                    maxH = _h;
                }

                if (index == (length - 1)) {
                    var _start = index-r;
                    var _end = index+1;
                    // console.log('maxH+gap',maxH+gap)
                    // console.log('end',_end,'_start',_start,'r',r,maxH)
                    $("li",scope).slice(_start,_end).css("height",maxH+gap);
                }
            })
        })
    }

    var updatePosition = function(){
        var scrollTop = $(document).scrollTop();
        var bodyH = $(document).height();
        var windowH = $(window).height();
        var breakHeaderStickyH = 104;
        var breakBackToTopStickyH = bodyH - 200 - windowH;
        var breakQStickyH = breakHeaderStickyH;
        //
        if(scrollTop>breakHeaderStickyH){
            $(".header").addClass("sticky");
            $(".header_gap").remove();
            $(".header").after("<div class='header_gap' style='padding-top:146px;'></div>");
        }else{
            $(".header").removeClass("sticky");
            $(".header_gap").remove();
        }
        //

        // console.log(scrollTop,bodyH,breakBackToTopStickyH,windowH)

        // if(scrollTop>100 && scrollTop<breakBackToTopStickyH){

        //     if(!$(".back-to-top").hasClass("sticky")){
        //         $(".back-to-top").hide().addClass("sticky").fadeIn("fast");
        //     }
        // }else if(scrollTop>breakBackToTopStickyH || scrollTop < windowH){

        //     if($(".back-to-top").hasClass("sticky")){
        //         $(".back-to-top").removeClass("sticky");
        //     }
        // }

        var a = 100;
        var b = bodyH - windowH - 130;
        var c = bodyH - (scrollTop+windowH);
        if(scrollTop>a && scrollTop < b){
            $(".back-to-top").show().addClass("sticky").css("bottom",15);
            // console.log('show1');
        }else if(scrollTop<a){
            $(".back-to-top").hide()
            // console.log('hide');
        }else if(scrollTop>b){
            $(".back-to-top").show().addClass("sticky").css("bottom",160-c);
            // console.log('show2');
        }


        if(scrollTop>breakQStickyH){
            if(!$("#EcpWebChatEntryButton").hasClass("sticky")){
                $("#EcpWebChatEntryButton").addClass("sticky");
            }
        }else{
            if($("#EcpWebChatEntryButton").hasClass("sticky")){
                $("#EcpWebChatEntryButton").removeClass("sticky");
            }
        }
    }
    function checkMenuOpen(){
        pageId = $(".page-read-id").attr("data-submenu-id");
        pageTypeId = $(".page-read-id").attr("data-type-id");

        if(pageId !=""){
            // 取得頁面id後，將相對應的側欄選單按鈕 加active

            console.log("#btn_tab_side_menu_"+pageTypeId);
            console.log("#btn_tab_side_menu_second_"+pageId);

            $(".side-bar").find("#btn_tab_side_menu_"+pageTypeId).addClass("active");
            $(".side-bar").find("#btn_tab_side_menu_second_"+pageId).addClass("active");

            // 第二層展開
            $(".side-bar").find("#btn_tab_side_menu_"+pageTypeId).next().show();

            // 判斷側邊選單是否有第二層
            $(".btn_tab_side_menu").each(function(){
                if($(this).next().hasClass("side_menu_second")){
                    $(this).addClass("btn_tab_side_menu_has_second");
                }
            });
        }else if($(".container").hasClass("has_tag_btn")){
            urlName = window.location.href.split("#")[1];
            urlID = urlName.replace(/-/, "_");
            $(".container").attr("id", pageTypeId + "_" + urlID);

            // 取得頁面id後，將相對應的側欄選單按鈕加active
            $(".side-bar").find("#btn_tab_side_menu_"+pageTypeId).addClass("active");
            $(".btn_tab_side_menu_second").removeClass("active");
            $(".btn_tab_side_menu_second" + "_" + pageTypeId + "_" + urlID ).addClass("active");

            // 第二層展開
            $(".side-bar").find("#btn_tab_side_menu_"+pageTypeId).next().show();


            $(".btn_tab").click(function(){
                var btnTabID = $(this).attr("id");
                var btnTabName = btnTabID.substr(7,btnTabID.length);
                $(".container").attr("id", pageTypeId + btnTabName);
                $(".btn_tab_side_menu_second").removeClass("active");

                checkMenuOpen();
            });
        }
        
    }
    checkMenuOpen();


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

    // lightbox 捲軸
    /*$(".body_lightbox").mCustomScrollbar({
        scrollButtons:{
            enable:true
        }
    });*/

    // lightbox
    $(".fancybox").fancybox({
        padding: 0,
        scrolling: 'no',
        fitToView: false,
        helpers : {
            overlay : {
                //locked : true 
            }
        }
    });
            
    $(".btn_fancybox_close").click(function(){
        $.fancybox.close(); 
        return false;
    });

    // uniform
    $(".form_style select, .form_style input, .form_style textarea").uniform();



    /************************/
    /* setup main menu
    /************************/

    $("ul.first-level").addClass('column-' + $("ul.first-level>li").not('.border').length);
    //
    //
    $("ul.first-level>li").each(function () {
        if (!$(this).hasClass('.border')) {

            var len = Math.ceil($(this).find(".sf-sub li").length / 3);

            $(this).find(".sf-mega").addClass('column-' + len);

            if ($(this).find('figure.menu-banner').length > 0) {
                $(this).find(".sf-mega").addClass('hasBanner');
            }

            if ($(this).find(".sf-sub").length > 0) {
                //
                var $ul = $(this).find(".sf-sub");
                var $lis = $(this).find(".sf-sub").find('li');
                var length = $lis.length;
                //pull them off

                //make your new ul, to put the dom elements in
                for (var i = 0; i < len - 1; i++) {
                    //console.log(i*3,3);
                    var $last6lis = $($lis.splice(0, 3)).remove();

                    // console.log($last6lis);
                    var $newUl = $('<ul class="sub column-' + i + '"></ul>');
                    $ul.before($newUl.html($last6lis));
                }
                $ul.addClass('column-' + len);
                $ul.removeClass('sf-sub');
                $ul.addClass('sub');
                //html+='</ul>';
                //
            }

        }

        if ($(this).find('>a').length > 0) {

            var menu_w = $(this).outerWidth();

            var submenu_w = $(this).find(".sf-mega").outerWidth(true);

            var diff_menu_submenu_w = submenu_w - menu_w;
            var pos_x = $(this).offset().left - $(this).parent().offset().left;

            $(this).find(".sf-mega").css('left', -1);
            if (submenu_w + pos_x > $(".sub-menu .container").width()) {
                $(this).find(".sf-mega").css('right', -2).css('left', 'auto');
                if (diff_menu_submenu_w > pos_x) {
                    if (diff_menu_submenu_w / 2 + pos_x + menu_w > $(".sub-menu .container").width()) {
                        var add = diff_menu_submenu_w / 2 + pos_x + menu_w - $(".sub-menu .container").width();
                        $(this).find(".sf-mega").css('left', menu_w / 2 - submenu_w / 2 - add);
                    } else if (pos_x - diff_menu_submenu_w / 2 < 0) {
                        var add = diff_menu_submenu_w - pos_x;
                        $(this).find(".sf-mega").css('left', -pos_x + 1);
                    } else {
                        $(this).find(".sf-mega").css('left', menu_w / 2 - submenu_w / 2);
                    }
                }
            }
        }
    })

    //
    $('.sub-menu').superfish({ speedOut: 0, delay: 300, speed: 'fast' });
    $('.sub-menu .first-level >li >a').click(function (event) {
        //event.stopPropagation();
        $(this).parent().siblings().removeClass("sfHover").find("a").each(function () {
            $(this).next().fadeOut(0);
        });
        $(this).parent().toggleClass("sfHover");
        if ($(this).parent().hasClass("sfHover")) {
            $(this).next().fadeIn(0);

        } else {
            $(this).next().slideUp(0);
        }
    });

    /************************/
    /* footer
    /************************/

    $(".back-to-top a").click(function () {
        TweenMax.to(window, .5, { scrollTo: { y: 0, ease: Sine.easeOut } });
    })

    $("#sitemap-open").click(function () {
        $(this).toggleClass('ed');
        if ($('.href-list').is(':not(:visible)')) {
            $('.href-list').slideDown(750);
        } else {
            $('.sitemap .href-list').slideUp(350);
        }

    });



    $(window).bind("scroll",function(e){
      updatePosition();
    })

    ComponentCard_Resize();

    $("html").addClass("laptop-ver");


    
    /* side menu open, add by wan */
    var _tempSideMenu = null;
    $('.side-box .btn_tab_side_menu_has_second').click(function (e) {
        var _link = $(this);
        var href = _link.attr('href');
        if (href == '' || href == '#') {
            e.preventDefault();

            if (_tempSideMenu) {
                _tempSideMenu.hide();
                _tempSideMenu = null;
            }
            
            _tempSideMenu = _link.siblings('ul.side_menu_second');
            _tempSideMenu.show();
        }
    });
});