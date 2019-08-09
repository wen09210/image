/* 
 * Card Tabmenu
 * @version 20161110 by wan
 */
(function(window){
    var tab = new function () {
        var $container, tabBtnClass = '.tab-title', tabContentClass = '.tab-content', activeClass = 'active';
        
        var checkActive = function(tabClass) {
            return $container.find(tabClass + '.' + activeClass).length != 0;
        }

        var _goTo = function(id, $btn) {

            var $content = null, go = true;
            if (id == '__init__') {
                if (location.hash != '') {
                    id = location.hash;
                } else {
                    if (!checkActive(tabBtnClass)) {
                        $btn = $container.find('a').first();
                    }

                    if (!checkActive(tabContentClass)) {
                        $content = $container.find(tabContentClass).first();   
                    }
                } 
                
            } else if (id) {
                
            } else {
                go = false;
            }
            
            if (go) {
                var contentId = id.replace('#', '#tab-');

                if (!$btn || !$btn.length)
                    $btn = $container.find('a[href="' + id + '"]'); 

                if (!$content)
                    $content = $(contentId);

                $btn.parent().addClass(activeClass).siblings().removeClass(activeClass);
                $content.addClass(activeClass).siblings().removeClass(activeClass);
            }
        }, _init = function() {
            $container = $('.tab-container');
            
            if (!$container.length)
                return;
            
            //$('.tab-nav').on('click', 'a', function(){
            //    var _this = $(this);
            //    _goTo(_this.attr('href'), _this);
            //});
            $(window).on('popstate', function(e) {
                _goTo(location.hash);
            });

            _goTo('__init__');
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

