/* 
 * Card Tabmenu
 * @version 20161110 by wan
 */
(function(window){
    var tab = new function () {
        var $container, tabNavClass = '.tab-nav', tabBtnClass = '.tab-title', tabContentClass = '.tab-content', activeClass = 'active';
        
        var checkActive = function (tabClass) {
            return $container.find(tabClass + '.' + activeClass).length != 0;
        }, replaceId = function (id) {
            return id.replace('/', '').replace('#', '#tab-');
        };


        var _goTo = function (id, $item, $btn) {
            var $content = null;
            if (id) {
                id = id.replace('/', '');
                console.log(id);
                $content = $item.find(replaceId(id));
                $btn = $item.find('a[href="' + id + '"]');
            }

            if (!$content || !$content.length) {
                $content = $item.find(tabContentClass).eq(0);
            }

            if (!$btn || !$btn.length) {
                $btn = $item.find(tabBtnClass + ' a').eq(0);
            }

            $btn.parent().addClass(activeClass).siblings().removeClass(activeClass);
            $content.addClass(activeClass).siblings().removeClass(activeClass);

        }, _init = function() {
            $container = $('.tab-container');
            
            if (!$container.length)
                return;
            
            $container.each(function (idx, item) {
                var $item = $(item),
                    $btn = null,
                    id = null;

                if (location.hash != '' && $item.find(replaceId(location.hash)).length != 0) {
                    id = location.hash;
                } else {
                    var defaultTab = $item.find('.tab-nav a[default-tab="true"]');
                    if (defaultTab.length) {
                        $btn = defaultTab;
                        id = defaultTab.attr('href');
                    } if (!checkActive(tabBtnClass)) {
                        $btn = $item.find(tabNavClass + ' a').first();
                    } else {
                        //console.log('else');
                    }
                }
                //console.log(id, )

                _goTo(id, $item, $btn);
            });

            //$('.tab-nav').on('click', 'a', function(){
            //    var _this = $(this);
            //    _goTo(_this.attr('href'), _this);
            //});

            var fireEvent = 'hashchange';
            if (window.history && window.history.pushState) {
                fireEvent = 'popstate';   
            }

            $(window).on(fireEvent, function (e) {
                _goTo(location.hash, $container);
            });
        }
        
        return {
            init: _init,
            goTo: _goTo
        }
    }

    window.cathaybk == null && (window.cathaybk = {});
    window.cathaybk.tab = tab;

    $(function(){
        tab.init();
    });

})(window);



// $(function(){
//     showCardTab(location.hash);
//     $(window).on('popstate', function(e) {
//         showCardTab(location.hash);
//     });
//     $('.tab-nav ~ .tab-nav').find('.tab-title').on('click', function(){
//         $('html,body').animate({scrollTop:146},0); 
//     });
// });


////ready to deprecated (11/30 wan)
// function showCardTab(id) {
//     if (!id || id.indexOf('#') != 0)
//     {
//         id = $('.tab-nav a').first().attr('href');
//     }
//     id = id.replace('/', '');
//     var tabcontId = id.replace('#', '#tab-'), //'#tab-'+id.charAt(1).toUpperCase()+id.substr(2),
//         tabcont = $(tabcontId);

//     if (!tabcont.length)
//         return;

//     tabcont.show();
//     tabcont.siblings('.tab-content').hide();

//     $('.tab-title a[href="' + id + '"]').parent().addClass('active').siblings('li.active').removeClass('active');
// }


/*
 * Top banner
 * @version 20161114 by wan
 */
(function (window) {

    var topbanner = new function () {
        var wrapClass = '.topbanner', slideClass = '.slides', onClass = 'on', speed = 300;
        
        var _goTo = function ($banner, idx) {
            
            if (!$banner.find(slideClass).length)
                return;

            var current = $banner.data();
            
            if (idx == 'next') {
                idx = current.idx + 1;
                if (idx >= current.count)
                    idx = 0;
            } else if (idx == 'prev') {
                idx = current.idx - 1;
                if (idx < 0)
                    idx = current.count - 1;
            }

            $banner.find('b').eq(idx).addClass(onClass).siblings('.' + onClass).removeClass(onClass);
            var slides = $(slideClass, $banner).find('li').eq(idx).removeClass().addClass(onClass)
                .stop().fadeIn(speed)
                .siblings('.' + onClass).removeClass(onClass).addClass('off')
                .stop().fadeOut(function () {
                    $(this).removeClass();
                });

            $banner.data('idx', idx);
        }, _each_init = function (idx, banner) {
            var $banner = $(banner),
                $slide = $banner.find('li'),
                _count = $slide.length;
            
            if (_count > 1) {
                //create menu
                var $menu = $('<div class="menu">').appendTo($banner);

                //next & prev btn
                var btnPrev = $('<div class="btn-prev"></div>').click(function () {
                    _goTo($banner, 'prev');
                }),
                    btnNext = $('<div class="btn-next"></div>').click(function () {
                        _goTo($banner, 'next');
                    });

                $banner.append(btnPrev, btnNext);

                for (var i = 0; i < _count; i++) {
                    var $b = $('<b />').click(function () {
                        _goTo($banner, $(this).index());
                    });
                    $menu.append($b);
                }

                _goTo($banner, 0);
                $banner.data('count', _count);
            }
            
        }, _init = function () {
            $(wrapClass).each(_each_init);
        };

        return {
            init: _init
        }
    };

    $(function () {
        var x = topbanner.init();
    });

})(window);
this.QaToggle = function() {

    var qaListToggle = function(){
        // QA展開收合
        $(".collapse-list > li:nth-child(odd)").addClass("odd");
        $(".collapse-list > li:nth-child(even)").addClass("even");


        $(".collapse-list li .list-header").click(function(){
            $(this).next(".list-content").slideToggle();
            $(this).find(".icon_qa_plus").toggleClass("icon_qa_minus");
            if( $("this").has("a") ){
                return;
            }
        });

        $("#btn_slide_list_qa").click(function(){
            $(this).parent().next(".content_special_talk").slideToggle();
            $(this).find(".icon_plus").toggleClass("icon_minus");
            return false;
        });

        $(".list_talk > li:odd > i").addClass("arrow_talk_right");
        $(".list_talk > li:even > i").addClass("arrow_talk_left");

    }
    $(document).ready(function() {
        qaListToggle();
    })
};

var qaToggle = new QaToggle();



/*
 * Notice toggle
 * @version 20150517
 */
$(function(){
    $('body').on('click', '[data-noticetoggle]', function(e){
        $('i', this).toggleClass('icn-minus-o icn-plus-o');
        $($(this).attr('data-noticetoggle')).slideToggle(500);
        e.preventDefault();
    });
});


//var __currentGroupItem = null;
var collapse = $('.collapse-list-inner');
collapse.on('click', '.item-title', function () {
    var item = $(this).parent();
    var $body = $('body');

    if (!item.hasClass('on')) {
        collapse.find('.item.on').find('.item-cont').slideToggle(400, 'swing', function () {
            var itemtop = item.offset().top;
            if (itemtop < $body.scrollTop()) {
                $body.stop().animate({ scrollTop: (itemtop - 100) }, '500', 'swing');
            }
        }).parent().toggleClass('on');
    }

    item.find('.item-cont').slideToggle(400, 'swing').parent().toggleClass('on');
});



/*Vertical-List learn more*/
this.LearnMore = function() {
    var learnmorelist = function(){
        
        //展開收合
        var collName = ".collapse-list";
        //var target = $(".learnmore-list .list-later");
        $(collName + " .list-seemore").click(function () {
            var btn = $(this);

            if (!btn.data('open-text'))
                btn.data('open-text', btn.text());

            if (!btn.hasClass('active')) {
                if (btn.data('close-text')) {
                    btn.text(btn.data('close-text'));
                }
            } else {
                btn.text(btn.data('open-text'));
            }


            var target = $(this).parents(collName).find('.list-later');
            
            target.slideToggle();
            target.toggleClass("active");
            $(this).toggleClass("active");

        });

    }

    $(document).ready(function() {
        learnmorelist();
    })

};

var LearnMore = new LearnMore();




/*Vertical-List learn more*/
this.TitleLearnMore = function() {

    var titlelearnmorelist = function(){

        $(".title-learnmore-list .list-seemore").click(function(){

            var $this = $(this);
            var target = $this.parent().find(".list-later");
            //展開收合
            target.slideToggle();
            target.toggleClass("active");

            $(this).toggleClass("see-active");

            console.log($(this));

        });

    }

    $(document).ready(function() {
        titlelearnmorelist();
    })

};

var TitleLearnMore = new TitleLearnMore();

var homejs = '1234654';

(function ($) {
    //update banner size

    $.fn.autoImageCenter = function (options) {
        var w = $(window).width();
        var ori_w = 2000;
        var ori_h = 400;
        var banner_h = 400;
        var banner_w = 2000;
        var ratio = w / ori_w;

        if (w > ori_w) {
            banner_w = ratio * ori_w;
            banner_h = ratio * ori_h;
        } else {
            banner_w = ori_w;
            banner_h = ori_h;
            banner_w = 2000;
            banner_h = 400;
        }

        this.height(banner_h);

        this.find('img').each(function (idx, elm) {

            $(elm).width(banner_w);
            $(elm).height(banner_h);
            var _w = banner_w;
            if (w > banner_w) {
                var diffW = 0;
            } else {
                var diffW = w - _w;
            }
            $(elm).css('margin-left', diffW / 2);
        });
    }

    $.fn.homeslick = function (options) {
        if (typeof $.fn.slick === 'undefined')
            return;

        var $container = this,
            $btns = null,
            slickOptions = {
                draggable: false
            };

        if (options.autoplay)
            slickOptions.autoplay = options.autoplay;

        if (options.dots) {
            slickOptions.dots = options.dots;
        }

        $container.on('init', function () {
            $container.autoImageCenter();
            $container.fadeTo(1000, 1);
        });

        $container.slick(slickOptions);

        if (options.btns) {
            $btns = $(options.btns);

            $container.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
                $btns.removeClass('active').eq(nextSlide).addClass('active');
            });

            //btns click event
            $btns.on('click', function (e) {
                e.stopPropagation();
                var idx = $btns.index(this);
                $container.slick('slickGoTo', idx);
            });
        }
        
        
        //resize event
        $(window).resize(function () {
            $container.autoImageCenter();
        });


        return this;
    }

})(jQuery);