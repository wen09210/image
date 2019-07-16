// Avoid `console` errors in browsers that lack a console.
(function () {
	var method;
	var noop = function () { };
	var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
	];
	var length = methods.length;
	var console = (window.console = window.console || {});

	while (length--) {
		method = methods[length];

		// Only stub undefined methods.
		if (!console[method]) {
			console[method] = noop;
		}
	}
}());
; (function ($) {
	var settings = {
		selector: ' > li > a > img',
		dataPC: 'img-pc',
		dataMobile: 'img-mobile'
	},
	methods = {
		init: function (options) {
			var $this = $(this);
			settings = $.extend({}, settings, options);
			methods.reset.apply($this);
			$(window).on('resize', function (e) {
				//clearTimeout($.data(this, 'resizeTimerSlider'));
				//$.data(this, 'resizeTimerSlider', setTimeout(function () {
				methods.reset.apply($this);
				//}, 100));
			});
			return this;
		},
		reset: function () {
			var $this = $(this);
			var toMode = Modernizr.mq('(max-width: 768px)') ? 'Mobile' : 'PC';
			var oeMode = $this.data('mode');
			if (toMode != oeMode) {
				var dataName = toMode == 'PC' ? settings.dataPC : settings.dataMobile;
				//$this.parents('.bx-viewport').css('overflow', 'visible');
				$(settings.selector, $this).each(function (i, el) {
					$(el).prop('src', $(el).data(dataName));
				});
				$this.data('mode', toMode);
			}
		}
	};

	$.fn.aplusRwdSlider = function (methodOrOptions) {
		if (methods[methodOrOptions]) {
			return methods[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + methodOrOptions + ' does not exist on jQuery.magicLine');
		}
	};
})(jQuery);
// Place any jQuery/helper plugins in here.

//progressBar
; (function ($) {
	$.fn.progressBar = function (options) {

		if (this.length == 0) return this;

		var el = this,
		steps = options.steps,
		length = options.steps.length,
		active = options.active,
		afterShow = options.afterShow ? options.afterShow : function () { return };

		var init = function () {
			var track = $('<div class="progressBar__track"></div>').appendTo(el);
			var UL = $('<ul class="progressBar__steps clearfix"></ul>').appendTo(el);
			for (i = 0; i < length; i++) {
				UL.append('<li class="progressBar__step"><div class="progressBar__number">' + (i + 1) + '</div><div class="progressBar__desc">' + steps[i] + '</div></li>');
			}
			var step = UL.children('li');

			//寬度計算
			step.css('width', 100 / (length - 1) + '%');
			step.first().css('width', 0);

			//如果太常加上樣式處理classname : tooLong
			if (length > 6) {
				$(el).addClass('tooLong');
			}

			//偷塞一個小網用的標題
			el.append('<div class="progressBar__mobileTitle">' + steps[active] + '</div>');
		};

		var run = function () {
			var UL = el.find('.progressBar__steps'),
				step = UL.children('li');
			step.each(function (i) {
				if (i < active) {
					$(this).addClass('prev');
				}
				if (i == active) {
					$(this).addClass('active');
				}
			});
			afterShow();
		};
		init();
		run();
		return this
	};

})(jQuery);


//fancyFilter
; (function ($) {
	$.fn.fancyFilter = function (options) {

		if (this.length == 0) return this;

		var $el = $(this),
			$unit = $el.find('li'),
			length = $unit.length,
			slider;
		var suspension = false;
		var width = 'pc';
		var adjustControl = function () {
			var ww = $(window).width();
			if (ww <= 960 && ww > 480) {
				$('.slider .bx-wrapper .bx-controls').css({ 'left': -420 + (960 - ww) / 2 + 'px' });
			} else if (ww <= 480) {
				$('.slider .bx-wrapper .bx-controls').css({ 'left': -435 + (960 - ww) / 2 + 'px' });
			}
		};
		var ww = $(window).width();
		var funcs = {
			init: function () {
				$unit.each(function (i, el) {
					$(this).attr('data-index', i);
				});
				window.onorientationchange = funcs.resize;
				$('slider').on('click', '.slider__ul > li', funcs.click);
				$(window).resize(function () {
					if (slider) {
						if (Modernizr.mq('(min-width: 960px)')) {
							if (width != 'pc') {
								funcs.resize(50);
								width = 'pc';
							}
						} else if (Modernizr.mq('(min-width: 768px) and (max-width: 959px)')) {
							if (width != 'pad') {
								funcs.resize(30);
								width = 'pad';
							}
						} else {
							if (width != 'mobile') {
								funcs.resize(20);
								width = 'mobile';
							}
						}
					} else {
						if (Modernizr.mq('(min-width: 960px)')) {
							funcs.bulid(50);
						} else if (Modernizr.mq('(min-width: 768px) and (max-width: 959px)')) {
							funcs.bulid(30);
						} else {
							funcs.bulid(20);
						}
					}
					adjustControl();
				}).trigger('resize');
			},
			click: function () {
				if (suspension) {
					return false;
				}
				var _active = $el.find('.active').eq(0).data('index'),
					_this = $(this).data('index'),
					_relative = _this - _active;
				if (_relative > 2) {
					_relative = _relative - length;
				}
				if (_relative < -2) {
					_relative = _relative + length;
				}

				switch (_relative) {
					case 0:
						break;
					case 1:
						slider.goToNextSlide();
						break;
					case 2:
						slider.goToNextSlide();
						setTimeout(function () {
							slider.goToNextSlide();
						}, 330)
						break;
					case -1:
						slider.goToPrevSlide();
						break;
					case -2:
						slider.goToPrevSlide();
						setTimeout(function () {
							slider.goToPrevSlide();
						}, 330)
						break;
				}
				suspension = true;
				setTimeout(function () {
					suspension = false;
				}, 300 * Math.abs(_relative));
			},
			resize: function (margin) {
				var option = {
					slideMargin: margin,
					moveSlides: 1,
					maxSlides: 2,
					maxSlides: 2,
					startSlide: 2,
					speed: 300,
					touchEnabled: false,
					swipeThreshold: 80,
					easing: 'linear',
					onSliderLoad: function () {
						$el.find('li').on('click', funcs.click)
					},
					onSlideBefore: function ($slideElement, oldIndex, newIndex) {
						$el.children().removeClass('active');
						var index = $slideElement.data('index');
						$('[data-index=' + index + ']').addClass('active');
						funcs.simulattion();
					}
				};
				slider.reloadSlider(option);
			},
			bulid: function (margin) {
				var option = {
					slideMargin: margin,
					moveSlides: 1,
					maxSlides: 2,
					maxSlides: 2,
					startSlide: 2,
					touchEnabled: false,
					swipeThreshold: 80,
					speed: 300,
					easing: 'linear',
					onSliderLoad: function () {
						$el.find('li').on('click', funcs.click);
						adjustControl();
					},
					onSlideBefore: function ($slideElement, oldIndex, newIndex) {
						$el.children().removeClass('active');
						var index = $slideElement.data('index');
						$('[data-index=' + index + ']').addClass('active');
						funcs.simulattion();
					}
				};
				slider = $el.bxSlider(option);
			},
			$listContainer: $('[data-id="list"]'),
			$items: $('[data-id="list"]').children().clone(),
			simulattion: function () {
				//模擬filter
				if (suspension) {
					return false;
				}
				funcs.$listContainer.empty();
				var items = random(funcs.$items);
				for (x in items) {
					$(items[x]).appendTo(funcs.$listContainer).hide().stop(true, false).fadeIn();
				}

				function random(array) {
					var r = Math.floor(Math.random() * funcs.$items.length),
						pitcher = new Array(),
						catcher = new Array();
					r++;
					for (i = 0; i < array.length; i++) {
						pitcher.push(array[i]);
					}
					pitcher = shuffle(pitcher);
					for (i = 0; i < r; i++) {
						catcher.push(pitcher.pop());
					}
					return catcher;
				}

				function shuffle(array) {
					var currentIndex = array.length, temporaryValue, randomIndex;

					// While there remain elements to shuffle...
					while (0 !== currentIndex) {

						// Pick a remaining element...
						randomIndex = Math.floor(Math.random() * currentIndex);
						currentIndex -= 1;

						// And swap it with the current element.
						temporaryValue = array[currentIndex];
						array[currentIndex] = array[randomIndex];
						array[randomIndex] = temporaryValue;
					}

					return array;
				}
			}
		}

		funcs.init();
		return this
	};

})(jQuery);