'use strict';

(function ($) {
    $.fn.digits = function () {
        return this.each(function () {
            $(this).text($(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
        })
    }

    //calculator
    var Home = new function () {

        var calcRate = function () {
            var scope = $("#exchange-calc-wrap");
            var sc = $("#source_currency", scope);

            var sc_amount = $("#source_currency_amount", scope);
            var tc = $("#target_currency", scope);
            var tc_amount = $("#target_currency_amount", scope);
            var change_button = $("#changeCurrency");
            //
            //
            var formatState = function (state) {
                if (!state.id) { return state.text; }
                var $state = $(
                  '<span>' + state.text + '</span>'
                );
                return $state;
            };

            var calcCurrency = function (a_mode) {

                var sc_val = sc.val();
                var sc_option = $("option:selected", sc);
                var sc_amount_val = parseFloat($.trim(sc_amount.val()));
                var sc_option_sell = (sc_option.attr("data-sell"));
                var sc_option_buy = (sc_option.attr("data-buy"));
                var tc_val = tc.val();
                var tc_option = $("option:selected", tc);
                var tc_amount_val = parseFloat($.trim(tc_amount.val()));
                var tc_option_sell = (tc_option.attr("data-sell"));
                var tc_option_buy = (tc_option.attr("data-buy"));
                //
                // $(".warn-msg").hide();

                if (a_mode == undefined) {
                    if (sc_val == "TWD") {
                        var new_currency = Math.round((sc_amount_val / tc_option_sell) * 100) / 100;
                        $(".currency_rate", $(".source")).text(sc_option_sell);
                        $(".currency_rate", $(".target")).text(tc_option_sell);
                    } else if (tc_val == "TWD") {
                        var new_currency = Math.round((sc_amount_val * sc_option_buy) * 1) / 1;
                        $(".currency_rate", $(".source")).text(sc_option_buy);
                        $(".currency_rate", $(".target")).text(tc_option_buy);
                    } else {
                        $(".currency_rate", $(".source")).text(sc_option_buy);
                        $(".currency_rate", $(".target")).text(tc_option_sell);
                        if (sc_val == tc_val) {
                            var ratio = 1;
                        } else {
                            // $(".warn-msg").show();
                            var ratio = sc_option_buy / tc_option_sell;
                        }

                        var new_currency = Math.round((sc_amount_val * ratio) * 100) / 100;
                    }
                    if (isNaN(sc_amount_val)) {
                        new_currency = "";
                    }

                    // console.log('new_currency',new_currency,sc_amount_val,tc_amount_val);
                    $("#target_currency_amount").val(new_currency)
                } else {
                    if (tc_val == "TWD") {
                        var new_currency = Math.round((tc_amount_val / sc_option_buy) * 100) / 100;
                    } else if (sc_val == "TWD") {
                        var new_currency = Math.round((tc_amount_val * tc_option_sell) * 1) / 1;
                    } else {

                        if (sc_val == tc_val) {
                            var ratio = 1;
                        } else {
                            // $(".warn-msg").show();
                            //var ratio = tc_option_buy/sc_option_sell;
                            // var ratio = tc_option_buy/sc_option_buy;
                            var ratio = tc_option_sell / sc_option_buy;
                            // var ratio = tc_option_sell/sc_option_sell;
                        }

                        var new_currency = Math.round((tc_amount_val * ratio) * 100) / 100;
                    }
                    if (isNaN(tc_amount_val)) {
                        new_currency = "";
                    }
                    $("#source_currency_amount").val(new_currency)
                }

                //
            }

            var initSelect = function () {
                var w = "120px";
                sc.select2({
                    templateResult: formatState,
                    templateSelection: formatState,
                    width: w
                });

                tc.select2({
                    templateResult: formatState,
                    templateSelection: formatState,
                    width: w
                });
            }


            var updateSelect = function () {
                sc.select2("destroy");
                tc.select2("destroy");
                initSelect();
            }


            var checkIsNumeric = function (e) {
                if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57))
                    && (e.keyCode < 96 || e.keyCode > 105)
                    && e.keyCode != 190
                    && e.keyCode != 110
                    && e.keyCode != 37 //<
                    && e.keyCode != 39 //>
                    && e.keyCode != 46 //del
                    && e.keyCode != 8) {

                    return false;
                }

                return true;
            }

            var initEvent = function () {

                sc_amount.bind("keydown", function (e) {
                    // console.log(e.keyCode);

                    if (e.keyCode == 9) {
                        tc_amount.focus();
                        e.preventDefault();
                        return false;
                    }
                    if (e.keyCode == 190 && $(this).val().indexOf(".") != -1) {
                        e.preventDefault();
                        return false;
                    }
                    if (!checkIsNumeric(e)) {
                        e.preventDefault();
                    }
                })

                tc_amount.bind("keydown", function (e) {
                    if (e.keyCode == 9) {
                        sc_amount.focus();
                        e.preventDefault();
                        return false;
                    }
                    if (e.keyCode == 190 && $(this).val().indexOf(".") != -1) {
                        e.preventDefault();
                        return false;
                    }
                    if (!checkIsNumeric(e)) {
                        e.preventDefault();
                    }
                })
                sc_amount.bind("keyup", function (e) {
                    calcCurrency();
                    $(this).attr("maxlength", 10);
                    tc_amount.attr("maxlength", 100);
                })

                tc_amount.bind("keyup", function (e) {

                    calcCurrency("revert");
                    $(this).attr("maxlength", 10);
                    sc_amount.attr("maxlength", 100);
                })

                sc.bind("change", function () {
                    var sc_val = sc.val();
                    var tc_val = tc.val();
                    var sc_option = $("option:selected", sc);
                    var tc_option = $("option:selected", tc);
                    $("option", tc).show().removeAttr('disabled', 'disabled');
                    $("option[value='" + sc_val + "']", tc).hide().attr('disabled', 'disabled');
                    //
                    $("option", sc).show().removeAttr('disabled', 'disabled');
                    $("option[value='" + tc_val + "']", sc).hide().attr('disabled', 'disabled');
                    updateSelect();
                    //
                    calcCurrency();
                }).trigger("change");

                tc.bind("change", function () {
                    var sc_val = sc.val();
                    var tc_val = tc.val();
                    var sc_option = $("option:selected", sc);
                    var tc_option = $("option:selected", tc);
                    $("option", tc).show().removeAttr('disabled', 'disabled');
                    $("option[value='" + sc_val + "']", tc).hide().attr('disabled', 'disabled');
                    $("option", sc).show().removeAttr('disabled', 'disabled');
                    $("option[value='" + tc_val + "']", sc).hide().attr('disabled', 'disabled');

                    updateSelect();
                    calcCurrency();
                })

                change_button.bind("click", function (e) {
                    var sc_val = sc.val();
                    var tc_val = tc.val();

                    if (sc_val == null || tc_val == null)
                        return;

                    var sc_amount_val = parseFloat($.trim(sc_amount.val()));
                    var tc_amount_val = parseFloat($.trim(tc_amount.val()));
                    //
                    $("option", sc).show().removeAttr('disabled', 'disabled');
                    $("option", tc).show().removeAttr('disabled', 'disabled');
                    //
                    sc.val(tc_val);
                    tc.val(sc_val);
                    //
                    $("option[value='" + tc_val + "']", tc).hide().attr('disabled', 'disabled');
                    $("option[value='" + sc_val + "']", sc).hide().attr('disabled', 'disabled');
                    //
                    // console.log(tc_val,sc_val);
                    updateSelect();
                    //
                    if (isNaN(tc_amount_val)) {
                        tc_amount_val = "";
                    }
                    if (isNaN(sc_amount_val)) {
                        sc_amount_val = "";
                    }

                    sc_amount.val(tc_amount_val)
                    tc_amount.val(sc_amount_val)
                    //
                    calcCurrency();
                })
            }


            var init = function () {
                initSelect();
                initEvent();
            }
            //

            init();
        }
        return {
            //main function to initiate the module
            init: function () {
            },
            calcRate: function () {
                calcRate();
            }
        };
    };


    function loadPartial(id, callback, error) {
        var timeout_sec = 1000 * 5,
            showError = null,
            container = $(id),
            url = container.data('url');

        showError = setTimeout(error, timeout_sec);

        container.load(url + ' #data-container', function (response, status, xhr) {
            clearTimeout(showError);
            typeof callback === 'function' && callback();
        });
    }

    function loadExchangeListError() {
        console.log("即時匯率 載入失敗");
        errorhandler();
    }

    function loadExchangeCalcError() {
        console.log("外匯換算 載入失敗");
        errorhandler();
    }

    function checkError(container) {
        if ($('[id="data-container"]', container).length == 0) {
            errorhandler();
        }
    }

    var nothandler = true;
    function errorhandler() {
        if (nothandler) {
            var container = $('#exchange-loading-failed a');
            container.each(function () {
                var $this = $(this);
                $this.append('<img src="' + $this.data('img') + '">')
            });
            $('.exchange-panel').empty().append(container);
            nothandler = false;
        }
    }

    $(function () {

        var calcSevicePanelHeight = function () {

            $(".service-container").removeClass("active");

            //
            var break_w = 1500;
            //小於1500px時，2x3
            var small_rows = 3;
            //小於1500px時，3x2
            var large_rows = 2;
            //所有線上櫃檯服務間距
            var gap = 40;
            var window_w = $(window).width();
            var exchange_h = parseInt($(".exchange-panel-cell").height());
            var target = $(".service-container .brick")
            var max_h = 0;


            //先把所有Brick的height設回auto，抓原始值
            target.css("height", "auto");

            //算出最高brick的高
            target.each(function () {
                var h = parseInt($(this).height());
                if (max_h < h) {
                    max_h = h;
                }
            })

            //最高brick再加上間距，避免選單太齊邊線
            max_h += gap / 2;

            //小畫面時 <1500px
            if (window_w < break_w) {

                //計算匯率高還是服務高
                if (exchange_h > max_h * small_rows) {
                    max_h = (exchange_h - gap) / small_rows;
                    $("#main-conainer-wrap").css("height", exchange_h)
                    // console.log("L > R");
                } else {
                    $("#main-conainer-wrap").css("height", max_h * small_rows + gap)
                    // console.log("R > L");
                }

            }
            else {
                //計算匯率高還是服務高
                if (exchange_h > max_h * large_rows) {
                    max_h = (exchange_h - gap) / large_rows;
                    $("#main-conainer-wrap").css("height", exchange_h)
                    // console.log("L > R");
                } else {
                    $("#main-conainer-wrap").css("height", max_h * large_rows + gap)
                    // console.log("R > L");
                }
            }
            target.css("height", max_h);
            $(".service-container").addClass("active");
        }

        //banner
        $("#banner-btns a:first").addClass("active");

        var banner = $('#banner-container');
        var fakelink = $('<a>fake link</a>').hide().insertAfter(banner);
        var bannerurl = banner.find('a');

        banner.homeslick({
            btns: '#banner-btns a',
            autoplay: 1
        }).on('beforeChange', function (event, slick, currentSlide, nextSlide) {

            var $nextSlide = bannerurl.eq(nextSlide);
            fakelink.attr('href', $nextSlide.attr('href'));

            if ($nextSlide.attr('target') != undefined) {
                fakelink.attr('target', $nextSlide.attr('target'));
            }
            else {
                fakelink.removeAttr('target');
            }

            //add data-id
            if ($nextSlide.data('id') != '') {
                fakelink.attr('data-id', $nextSlide.data('id'));
                fakelink.attr('onclick', $nextSlide.attr('onclick'));
            }
        });
        var next = bannerurl.eq(0);
        fakelink.attr('href', next.attr('href'));

        if (next.attr('target') != undefined) {
            fakelink.attr('target', next.attr('target'));
        }

        //trigger fakelink click
        $('#login-container').click(function () {
            fakelink[0].click();
        });

        $('#login-panel-wrap').click(function (e) {
            e.stopPropagation();
        });

        //exchange list
        loadPartial('#exchange-list-wrap', function () {
            checkError('#exchange-list-wrap');
        }, loadExchangeListError);
        //exchange calc
        loadPartial('#exchange-calc-wrap', function () {
            checkError('#exchange-calc-wrap');
            Home.calcRate();
        }, loadExchangeCalcError);

        //calc news-container height
        var target = $(".news-container .section-content")
        target.css("height", Math.max(target.eq(0).height(), target.eq(1).height()) + 60);

        //calc services height
        $(window).on("resize", function () {
            calcSevicePanelHeight();
        }).trigger("resize");

        //set grid height
        $('#dynamic-grid').height($('#main-conainer-wrap').height() - 40).show();

    });
})($);
