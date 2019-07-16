var Fullscreen = function () {
    var isIE=navigator.appName.indexOf("Internet Explorer")!=-1;var ie_version;var ie_renderVersion;var ie_compatibilityMode=false;if(isIE){var ua=navigator.userAgent;var ieRegex=new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");if(ieRegex.exec(ua)==null)this.exception="The user agent detected does not contai Internet Explorer.";ie_renderVersion=parseFloat(RegExp.$1);ie_version=ie_renderVersion;if(ua.indexOf("Trident/7.0")>-1){if(ua.indexOf("MSIE 8.0")>-1){ie_compatibilityMode=true;ie_version=11}}else if(ua.indexOf("Trident/6.0")>-1){if(ua.indexOf("MSIE 7.0")>-1){ie_compatibilityMode=true;ie_version=10}}else if(ua.indexOf("Trident/5.0")>-1){if(ua.indexOf("MSIE 7.0")>-1){ie_compatibilityMode=true;ie_version=9}}else if(ua.indexOf("Trident/4.0")>-1){if(ua.indexOf("MSIE 7.0")>-1){ie_compatibilityMode=true;ie_version=8}}else if(ua.indexOf("MSIE 7.0")>-1)ie_version=7;else ie_version=6}
    if (!window.console) console = {log: function() {}};

    var animate = true;
    if($("html").hasClass("lt-ie9")){
        animate = false;
    }
    var background = function(){
        var scope = $(".container .bg-wrap");

        var headerH = 146;//
        var minH = parseInt($(scope).attr("data-minH"));
        var time = parseInt($(scope).attr("data-time"));
        var index = 0;
        var total = $('figure',scope).length;
        var bgSpeed = .6;
        var copySpeed = .7;
        var play = function(){
            display();
            scope.show();
            setTimeout(next,time);
        }

        var display = function(){

            resize();
            var target = $('figure',scope).eq(index);
            target.addClass("active").siblings().removeClass("active");

            var figure = $('figure',scope).eq(index);
            var img = $("img",target);
            var captionCathay = $("figcaption small",target);
            var captionSlogan = $("figcaption div",target);

            TweenMax.set($('figure',scope),{zIndex:9,width:$(window).width()});
            TweenMax.set(figure,{zIndex:10});

            if(!animate){
                TweenMax.set(img,{opacity:1});
                TweenMax.set(captionCathay,{opacity:1});
                TweenMax.set(captionSlogan,{opacity:1});
            }
            else{
                TweenMax.fromTo(img,bgSpeed,{opacity:0},{opacity:1});
                TweenMax.fromTo(captionCathay,copySpeed,{y:20,opacity:0},{y:0,opacity:1,delay:.7});
                TweenMax.fromTo(captionSlogan,copySpeed,{y:20,opacity:0},{y:0,opacity:1,delay:.9});
            }
        }
        var prev = function(){
            index -=1;
            if(index<0)
                index = total-1;
            play();
        }
        var next = function(){
            index +=1;
            if(index>total-1)
                index = 0;
            play();
        }

        var resize = function(){
            var windowW = $(window).width();
            var containerH = $(window).height() - headerH;
            if(containerH<minH){
                containerH = minH;
            }
            scope.css("height",containerH);

            $('img',scope).resizeToParent();
            
            $("figcaption").css("left",windowW/2-130);

            $("#footer").css("top",containerH);
        }

        var init = function(){
            resize();
            play();
        }
        
        $(window).resize(function(){
            resize();
        })

        init();
    } 

    var infoPanel = function(){
        var scope = $("#corp_index .info_panel");

        var addEvent = function(){
            $(".btn_live_rate",scope).bind("click",function(){
                var target = $(".live_rate",scope);

                if(!animate){
                    target.slideToggle(0);
                }
                else{
                    target.slideToggle();
                }
                $(this).find("i.icon").toggleClass("minus");
            })

        }
        var theme = function(){
            $(".form_style select, .form_style input, .form_style textarea").uniform();
        }
        var init = function(){
            theme();
            
            //addEvent();
            // ie8.9 表單要placeholder
            if(isIE && ie_version<=9){
                $("input, textarea").placeholder({customClass:'my-placeholder'});
            }
        }

        init();
    }
    return {
        //main function to initiate the module
        init: function () {
            background();
            infoPanel();
        }
    };
}();