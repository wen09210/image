this.DataLoader = function() {
    var e;
    var t = function() {

        var html = '<div id="data-loader">';
            html +='<link href="/css/common/loader.css" rel="stylesheet" />';
            html +='<div class="wrapper">';
            html +='<div class="cloud-small-1"></div>';
            html +='<div class="cloud-small-2"></div>';
            html +='<div class="cloud-main">';
            html +='<div class="loader-bar">';
            html +='<span class="rectangle"><span class="white"></span></span>';
            html +='<span class="rectangle"><span class="white"></span></span>';
            html +='<span class="rectangle"><span class="white"></span></span>';
            html +='<span class="rectangle"><span class="white"></span></span>';
            html +='<span class="rectangle"><span class="white"></span></span>';
            html +='<span class="rectangle"><span class="white"></span></span>';
            html +='<span class="rectangle"><span class="white"></span></span>';
            html +='<span class="rectangle"><span class="white"></span></span>';
            html +='<span class="rectangle"><span class="white"></span></span>';
            html +='<span class="rectangle"><span class="white"></span></span>';
            html +='<span class="rectangle"><span class="white"></span></span>';
            html +='</div>';
            html +='</div>';
            html +='<div class="text text_18 bold">';
            html +='<div class="main">資料連線處理中</div>';
            html +='<div class="dot">.</div><div class="dot">.</div><div class="dot">.</div>';
            html +='</div>';
            html +='</div>';
            html +='</div>';

        $("#data-loader-container").html(html);
        
        e = $("#data-loader");
        if (e.length != -1) {
            n();
            r()
        }
    };


    var n = function() {
        var t = e.find(".rectangle .white");
        for (var n = 0; n < t.length; n++) {
            var r = $(t[n]);
            TweenMax.to(r, .4, {
                alpha: 1,
                ease: Quad.easeInOut,
                repeat: -1,
                yoyo: true,
                repeatDelay: .3,
                delay: n * .1
            })
        }
        var i = e.find(".cloud-small-1");
        TweenMax.to(i, 5, {
            y: 20,
            ease: Quad.easeInOut,
            repeat: -1,
            yoyo: true
        });
        var s = e.find(".cloud-small-2");
        TweenMax.to(s, 6, {
            y: 20,
            ease: Quad.easeInOut,
            repeat: -1,
            yoyo: true
        })
    };
    var r = function() {
        var t = e.find(".text .dot");
        for (var n = 0; n < t.length; n++) {
            var r = $(t[n]);
            TweenMax.to(r, .05, {
                alpha: 0,
                ease: Quad.easeInOut,
                repeat: -1,
                yoyo: true,
                repeatDelay: .3,
                delay: n * .1
            })
        }
    };
    $(document).ready(function() {
        t()
    })
};
var dataLoader = new DataLoader