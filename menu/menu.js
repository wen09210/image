(function ($) {
  $.fn.menumaker = function (options) {
    var cssmenu = $(this),
      settings = $.extend({
        format: "dropdown",
        sticky: false
      }, options);
    return this.each(function () {
      $(this).find(".button").on('click', function () {
        $('.nav_bg').stop().fadeToggle();
        $(this).stop().toggleClass('menu-opened');
        var mainmenu = $(this).next('ul');
        if (mainmenu.hasClass('open')) {
          mainmenu.stop().slideUp().removeClass('open');
        } else {
          mainmenu.stop().slideDown().addClass('open');
          if (settings.format === "dropdown") {
            mainmenu.find('ul').show();
          }
        }
      });
      cssmenu.find('li ul').parent().addClass('has-sub');
      multiTg = function () {
        cssmenu.find(".has-sub").prepend('<span class="submenu-button"></span>');
        cssmenu.find('.submenu-button').on('click', function () {
          $('.sub_menu_list').stop().slideUp();
          $('.menu_dropdown').removeClass('active');
          $(this).siblings('.menu_dropdown').removeClass('active');
          if ($(this).siblings('ul').hasClass('open')) {
            $(this).siblings('ul').removeClass('open').stop().slideUp();
            $(this).siblings('.menu_dropdown').removeClass('active');
          } else {
            $(this).siblings('ul').addClass('open').stop().slideDown();
            $(this).siblings('.menu_dropdown').addClass('active');
          }
        });
      };
      if (settings.format === 'multitoggle') multiTg();
      else cssmenu.addClass('dropdown');
      if (settings.sticky === true) cssmenu.css('position', 'fixed');
      resizeFix = function () {
        var mediasize = 1200;
        if ($(window).width() > mediasize) {
          cssmenu.find('ul').show();
          $('.menu_dropdown').removeClass('active');
        }
        if ($(window).width() <= mediasize) {
          cssmenu.find('ul').hide();
          cssmenu.find('ul').hide().removeClass('open');
          $('.button').removeClass('menu-opened');
          $('.nav_bg').hide();
        }
      };
      resizeFix();
      return $(window).on('resize', resizeFix);
    });
  };
})(jQuery);

(function ($) {
  $(document).ready(function () {
    $("#g_nav").menumaker({
      format: "multitoggle"
    });
  });
})(jQuery);