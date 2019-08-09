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

var CBNav = function(){

    var clearsubmenu_int;
    var prev_navItem;
    var prev_navItemIdx = -1;
    var submenu_event_img_w = 150;
    var submenu_event_img_gap = 45;
    var submenu_gap = 15;
    var close_submenu_speed = 300;
    var init = function(){
        function showSubmenu(a_target){
            closeSubmenu();
            prev_navItem = a_target;
            prev_navItem.addClass("active");
            var sub = prev_navItem.parent().find(".nav-inner-sub");//siblings();
            sub.addClass("active");
            prev_navItem.parent().bind("mouseleave",function(e){
               processCloseSubmenu(); 
            })
        }

        function processCloseSubmenu(){
            clearTimeout(clearsubmenu_int);
            clearsubmenu_int = setTimeout(function () {
                closeSubmenu();
            }, close_submenu_speed);
        }

        function closeSubmenu(){
            if(prev_navItem==undefined){
                return;
            }

            clearTimeout(clearsubmenu_int);
            prev_navItem.removeClass("active");
            var sub = prev_navItem.siblings();
            sub.removeClass("active");
        }

        $(".nav-inner>li>a").hover(function(){
            showSubmenu($(this));
        })

        $(".nav-inner-sub").each(function(e){
            // return;
            var scope = $(this);
            var w = 0;
            $(">ul",scope).each(function(e){
                var ul_w = parseInt($(this).width())+submenu_gap;
                w += ul_w;
            })

            var nav_w = w-submenu_gap;
            if($(".nav-inner-event",$(this)).length>0){
                nav_w +=submenu_event_img_w+submenu_event_img_gap
            }
            scope.width(nav_w);
            
            //caculate pos
            // $(this).css('position', 'absolute');

            var li = $(this).parents("li");
            var a = $(this).prev();
            var subnav_w = scope.outerWidth();
            var nav_container_w = $(".nav-inner").width();
            var border_left = $(".nav-inner").offset().left;
            var li_border_left = li.offset().left - border_left;
            var diff_menu_submenu_w = subnav_w + li_border_left - nav_container_w;
            //
            var tmp_pos_x = -1;
            if($(this).attr("data-left") == undefined){
                // console.log($.trim(a.text()),subnav_w,li_border_left,subnav_w+li_border_left,diff_menu_submenu_w);
                if(diff_menu_submenu_w>0){
                    
                    //往右超出版面
                    // console.log($.trim(a.text()));
                    // console.log(" - 往右會超出版面:",diff_menu_submenu_w);

                    //算置中
                    tmp_pos_x = -subnav_w/2+a.width();
                    // console.log(" -- 置中:",li_border_left,tmp_pos_x,li_border_left-tmp_pos_x,li_border_left+tmp_pos_x)
                    // console.log(" - 置中會不會超過右邊",subnav_w + li_border_left+tmp_pos_x,nav_container_w)
                    
                    //
                    if(li_border_left+tmp_pos_x<0){
                        // console.log(" - 置中會超過左邊",li_border_left,tmp_pos_x,border_left);
                        tmp_pos_x = -subnav_w + a.width()/2+3;
                        if(tmp_pos_x < -border_left){
                            // console.log(" - 往左會超出版面");
                            tmp_pos_x = -(li_border_left)
                        }
                        else{
                            // console.log(" - 往左OK");
                        }
                    }
                    else{
                        if(subnav_w + li_border_left+tmp_pos_x>nav_container_w){
                            // console.log(" -- 置中右邊超過")
                            tmp_pos_x = -(li_border_left)
                        }else{
                            // console.log(" - 置中OK",li_border_left,tmp_pos_x);
                        }
                    }
                }
                $(this).attr("data-left",tmp_pos_x)
            }

             $(this).css('left',tmp_pos_x);
        })
    }

    return{
        init:init
    }
}();


var CBMain = function() {

    var footerNum = 6;
    var updatePosition = function(){
        var scrollTop = $(document).scrollTop();
        var bodyH = $(document).height();
        var windowH = $(window).height();
        var breakHeaderStickyH = 104;
        var breakBackToTopStickyH = bodyH - 200 - windowH;
        var breakQStickyH = breakHeaderStickyH;
        //

        if(scrollTop>breakHeaderStickyH){
            $("html").addClass("fixed");
            $(".header_gap").remove();
            $(".header").after("<div class='header_gap' style='padding-top:143px;'></div>");
        }else{
            $(".header_gap").remove();
            $("html").removeClass("fixed");
        }
        //

        // console.log(scrollTop,bodyH,breakBackToTopStickyH,windowH)


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

    var addEventListener = function(){

        $(document).on("click",".footer-sitemap-toggle-ctrl",function(){
            $(this).toggleClass("active");
            var target = $('.footer-sitemap-wrap');
            if (target.is(':not(:visible)')) {
                target.slideDown();
            } else {
                target.slideUp();
            }
        });


        $(document).on("click",".back-to-top a",function(){
            TweenMax.to(window, .5, { scrollTo: { y: 0, ease: Sine.easeOut } });
        });

        $(window).bind("scroll",function(e){
            updatePosition();
        });
    }

    var initFancybox = function(){
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

        alert("YOLO!");
    }

    var initLegacy = function(){
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
    }

    var initUniform = function(){

        // uniform
        $(".form_style select, .form_style input, .form_style textarea").uniform();
    }

    var initFooter = function(){
        //如果footer數量超過6個時，加上justify自動計算寬度
        if($(".footer-sitemap-list ul").length>footerNum){
            $(".footer-sitemap-list").addClass("justify");
        }
    }
    var init = function(){
        initFooter();
        initLegacy();
        initUniform();
        initFancybox();
        addEventListener();
    }

    init();

    CBNav.init();
}();

// $(function() {

    
    

//     // function checkMenuOpen(){
//     //     pageId = $(".page-read-id").attr("data-submenu-id");
//     //     pageTypeId = $(".page-read-id").attr("data-type-id");

//     //     if(pageId !=""){
//     //         // 取得頁面id後，將相對應的側欄選單按鈕 加active

//     //         console.log("#btn_tab_side_menu_"+pageTypeId);
//     //         console.log("#btn_tab_side_menu_second_"+pageId);

//     //         $(".side-bar").find("#btn_tab_side_menu_"+pageTypeId).addClass("active");
//     //         $(".side-bar").find("#btn_tab_side_menu_second_"+pageId).addClass("active");

//     //         // 第二層展開
//     //         $(".side-bar").find("#btn_tab_side_menu_"+pageTypeId).next().show();

//     //         // 判斷側邊選單是否有第二層
//     //         $(".btn_tab_side_menu").each(function(){
//     //             if($(this).next().hasClass("side_menu_second")){
//     //                 $(this).addClass("btn_tab_side_menu_has_second");
//     //             }
//     //         });
//     //     }else if($(".container").hasClass("has_tag_btn")){
//     //         urlName = window.location.href.split("#")[1];
//     //         urlID = urlName.replace(/-/, "_");
//     //         $(".container").attr("id", pageTypeId + "_" + urlID);

//     //         // 取得頁面id後，將相對應的側欄選單按鈕加active
//     //         $(".side-bar").find("#btn_tab_side_menu_"+pageTypeId).addClass("active");
//     //         $(".btn_tab_side_menu_second").removeClass("active");
//     //         $(".btn_tab_side_menu_second" + "_" + pageTypeId + "_" + urlID ).addClass("active");

//     //         // 第二層展開
//     //         $(".side-bar").find("#btn_tab_side_menu_"+pageTypeId).next().show();


//     //         $(".btn_tab").click(function(){
//     //             var btnTabID = $(this).attr("id");
//     //             var btnTabName = btnTabID.substr(7,btnTabID.length);
//     //             $(".container").attr("id", pageTypeId + btnTabName);
//     //             $(".btn_tab_side_menu_second").removeClass("active");

//     //             checkMenuOpen();
//     //         });
//     //     }
        
//     // }
//     // checkMenuOpen();

// });

