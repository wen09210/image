//isTouch
var isTouch = function () {
	return 'ontouchstart' in window        // works on most browsers 
		|| navigator.maxTouchPoints;       // works on IE10/11 and Surface
};

$(function () {
	//e.preventDefault();
	//e.stopPropagation();

	//loading
	$(window).load(function () {
		$('body').removeClass('loading');
	});

	//fancyform
	$('select:not([multiple])').transformSelect({
		addDropdownToBody: true
	});
	$('select[multiple]').transformSelect({
		addDropdownToBody: true,
		showFirstItemInDrop: false
	});
	$('select[multiple]').change(function () {
		var val = $(this).val();
		val = val ? val.toString() : $(this).children('option:first').text();
		var $container = $(this).next('.transformSelect').children('li').children('span');
		if ($container.length > 0) {
			$container.text(val);
		} else {
			$(this).prev('span').text(val);
		}
	});
	$('input.transCheckbox').transformCheckbox({
		base: 'class',
		trigger: 'parent'
	});
	$('[data-id="telLink"]').click(function () {
		if (isTouch()) {
			location.href = $(this).data('href');
		} else {
			return false;
		}
	});

	//fancyradio
	var fancyradio = {
		init: function () {
			$('.fancyRadio').each(function () {
				var el = $(this);
				var id = el.find('.fancyRadio__input:checked').attr('id');
				var $content = $('[data-for="' + id + '"]');
				if ($content.length) {
					$('[data-for="' + id + '"]').show();
					$(this).closest('.fancyRadio').addClass('open');
				}
			})
		},
		binding: function () {
			$('.fancyRadio__label').click(function () {
				var $container = $(this).closest('.fancyRadio');
				var $target = $('[data-for="' + $(this).attr('for') + '"]');
				var ISchecked = $(this).prev().prop('checked');
				if (ISchecked) {
					return false;
				}
				$container.siblings('.fancyRadio__content').slideUp(300);
				$target.slideDown(300);
				if ($target.length) {
					$(this).closest('.fancyRadio').addClass('open');
				} else {
					$(this).closest('.fancyRadio').removeClass('open');
				}
			});
		}
	};
	fancyradio.init();
	fancyradio.binding();

	if (!isTouch()) {
		$('input[type="date"]').each(function () {
			var $input = $(this);
			$input.attr('type', 'text');
			$input.parent().append('<span class="input-group-addon"></span>').on('click', function () {
				$input.trigger('focus');
			});
			$input.datepicker({
				format: "twy/mm/dd",
				autoclose: true,
				language: "zh-TW"
			});
		})
	}

	//form submit
	$('[data-id="submit"]').click(function () {
		$(this).siblings('input[type="submit"]').trigger('click');
	});

	////�Ϥ��w��
	function fileUpload() {
		//Get count of selected files
		var imgPath = $(this)[0].value;
		var extn = imgPath.substring(imgPath.lastIndexOf('.') + 1).toLowerCase();
		var id = $(this).attr('id');
		var image_holder = $('label[for="' + id + '"] .image-holder');
		if (extn == "gif" || extn == "png" || extn == "jpg" || extn == "jpeg") {
			if (typeof (FileReader) != "undefined") {
				//loop for each file selected for uploaded.
				image_holder.empty();
				$(this).closest('.upload__item').removeClass('checked');
				image_holder.siblings().andSelf().hide();
				var reader = new FileReader();
				reader.onload = function (e) {
					$("<img />", {
						"src": e.target.result,
						"class": "thumb-image"
					}).appendTo(image_holder);
				}
				image_holder.fadeIn();
				reader.readAsDataURL($(this)[0].files[0]);
			} else {
				image_holder.prev('span').text(imgPath.split('\\').pop())
			}
		} else {
			alert("Pls select only images");
		}
	};

	$("body").on('change', '.fileUpload', fileUpload);

	//gotop
	$(window).scroll(function () {
		var scrollTop = $(this).scrollTop();
		if (scrollTop > 100) {
			$('.gotop').fadeIn();
		} else {
			$('.gotop').fadeOut();
		}
	}).trigger('scroll');

	$('.gotop').click(function () {
		$('body,html').animate({ 'scrollTop': 0 })
	});

	//ie hack
	function msieversion() {

		var ua = window.navigator.userAgent;
		var msie = ua.indexOf("MSIE ");
		var ie11 = ua.indexOf("Trident");


		if (msie > 0 || ie11 > 0) {
			$('.fancyRadio').css('border-radius', '0');
			$('.btn').css('filter', 0);
			$('.loadingBall').hide();
			$('body').addClass('ie');
		}
		return false;
	}
	msieversion();

	//mobile/pc images resize event
	$(window).resize(function () {
		$('[data-img-mobile]').each(function () {
			var el = $(this),
				mobileSrc = $(this).data('img-mobile'),
				PCSrc = $(this).data('img-pc');
			if (Modernizr.mq('(min-width:767px)')) {
				el.attr('src', PCSrc);
			} else {
				el.attr('src', mobileSrc);
			}
		})
	}).trigger('resize');

	//patchZero
	$('[data-id="patchZero"]').blur(function () {
		var val = $(this).val();
		if (val.length == 6) {
			$(this).val('0' + val);
		}
	});

	//toggle
	$('[data-toggle-title]').on('click', function () {
		var dataTitle = $(this).data("toggle-title");
		$(this).toggleClass('active');
		$(this).parent().siblings('').children('[data-toggle-title]').removeClass('active');
		$('[data-toggle-content="' + dataTitle + '"]').slideToggle();
		$('[data-toggle-content="' + dataTitle + '"]').parent().siblings('').children('[data-toggle-content]').slideUp();
	});

	//20179011
	$('[data-id="js-collapse"]').on('click', function () {
		var $this = $(this);
		var $container = $(this).closest('.collapse');
		$this.toggleClass('on');
		$this.next('[data-content="collapse"]').slideToggle(300).toggleClass('open');
		$container.siblings('.collapse').children('[data-content="collapse"]').slideUp(300).removeClass('open');
		$container.siblings('.collapse').children('[data-id="js-collapse"]').removeClass('on');
		if ($this.hasClass('on')) {
			setTimeout(function () {
				var offsetTop = $this.offset().top;
				$('body, html').animate({ scrollTop: offsetTop - $('header').outerHeight() });
			}, 350);
		}
	}).each(function () {
		if ($(this).hasClass('on')) {
			var $container = $(this).closest('.collapse');
			$(this).next('[data-content="collapse"]').show().addClass('open');
		}
	});


	$(window).on('resize', function () {
		var wh = $(window).height(),
			headerHeight = $('header').outerHeight(),
			footerHeight = $('footer').outerHeight(),
			progressBarHeight = $('.progressBar').length > 0 ? $('.progressBar').outerHeight() +
								Number($('.progressBar').css('margin-top').slice(0, -2)) +
								Number($('.progressBar').css('margin-bottom').slice(0, -2)) : 0,
			gobackHeight = $('.goback').length > 0 ? $('.goback').outerHeight() +
							Number($('.goback').css('margin-top').slice(0, -2)) +
							Number($('.goback').css('margin-bottom').slice(0, -2)) : 0,
			gradSection = $('.section--grad').length > 0 ? $('.section--grad').outerHeight() +
								Number($('.paymentResult').css('margin-top').slice(0, -2)) +
								Number($('.paymentResult').css('margin-bottom').slice(0, -2)) : 0;
							var height = wh - headerHeight - footerHeight - progressBarHeight - gobackHeight - gradSection;
							$('[data-id="minHeight"]').css({ 'min-height': height +1 });

	}).trigger('resize');

});