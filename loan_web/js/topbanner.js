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