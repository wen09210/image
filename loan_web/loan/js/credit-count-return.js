$.extend({
    isEmpty: function(a_str) {
        return ($.trim(a_str)=="");
    },
    isNaN: function(a_str) {
        return isNaN(a_str);
    },
    isEmail: function(a_str) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(a_str);
    },
    isChecked: function(a_elm) {
        return a_elm.prop("checked")
    },
    toggleDisable: function(a_elm,a_boolean){
        if(a_boolean){
            a_elm.prop("disabled", true);
            a_elm.addClass("disabled");
        }else{
            a_elm.prop("disabled", false);
            a_elm.removeClass("disabled");
        }
    },
    toggleError: function(a_elm,a_boolean){
        if(a_boolean){
            a_elm.parents(".input-field").addClass("formError");
        }else{
            a_elm.parents(".input-field").removeClass("formError");
        }
    }
});


(function( $ ){
    $.fn.returnPress = function(x) {
      return this.each(function() {
        $(this).change(function(e) {
            var val = $(this).val()
            if(isNaN(val)){
                $(this).val("");
            }
        });
        $(this).keypress(function(e) {


            if($(this).attr("data-format")=="numeric,dot"){
                if(e.keyCode==46 && $(this).val().split('.').length>=2){
                    return false;
                }
            }
            // Allow: backspace, delete, tab, escape, enter and .
            if ($.inArray(e.keyCode, [8, 9, 27, 13, 110, 190]) !== -1 ||
                 // Allow: Ctrl/cmd+A

                (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
                 // Allow: Ctrl/cmd+C
                (e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
                 // Allow: Ctrl/cmd+X
                (e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
                 // Allow: home, end, left, right
                (e.keyCode >= 35 && e.keyCode <= 39)) 
            {
                     // let it happen, don't do anything
                     return false;
            }
            // Ensure that it is a number and stop the keypress
            if (e.keyCode==46 || (e.keyCode>=48 && e.keyCode<=57)){

                if($(this).attr("data-format") !="numeric,dot" && e.keyCode==46){
                    e.preventDefault();
                    return false;
                }
            }else{
                e.preventDefault();
                return false;
            }
        });
      });
    };
})(jQuery);
this.CreditCountReturn = function() {
    var formCreditCountReturn = "#formHolder";
    var formScope = $("#formHolder");
    var formResultMsg = $(".result-msg",formScope);
    var formResultShort = $(".result-content-short",formScope);
    var formResultComplete = $(".result-content-complete",formScope);


    var IRRCalc = function (CArray, guest) {
        inc = 0.000001;
        do {
            guest += inc;
            NPV = 0;
            //console.log('CArray.length',CArray.length);
            for (var j=0; j < CArray.length; j++) {
                //console.log('CArray[j]',CArray[j]);
                NPV += CArray[j] / Math.pow((1 + guest), j);
                //console.log('NPV',NPV);
            }
        } while (NPV > 0);
        return guest * 100;
    }

    var ModifyFinanceIRR = function(cfs, guess, floatPrecision) {
        var currentNPV;
        var npv;
        var firstStep = true;
        //  Initial parameters
        rate = 0.01;
        if( guess == null )
            guess = 0.01;
        if( floatPrecision == null )
            floatPrecision = 100;
        do
        {
            // first step don't guess
            if( !firstStep  )
            {
                var burstguess = Math.ceil(Math.log(currentNPV));
                if(Math.log(currentNPV) > 1)
                    rate += guess * burstguess;
                else
                    rate += guess;
            }
            else
                firstStep = false;

            // base case
            npv = cfs[0];
            for (var i = 1; i < cfs.length; i++) {
                npv +=(cfs[i] / Math.pow((1 + rate / 100 ), i));
            }
            currentNPV = Math.round(npv * floatPrecision) / floatPrecision;
        }while(currentNPV > 0)

        // Return best guess
        return Math.round(rate * floatPrecision) / floatPrecision;
    };
    //試算公式
    var PMT = function(ir, np, pv, fv, type) {
        /*
         * ir   - interest rate per month
         * np   - number of periods (months)
         * pv   - present value
         * fv   - future value
         * type - when the payments are due:
         *        0: end of the period, e.g. end of month (default)
         *        1: beginning of period
         */
        var pmt, pvif;

        fv || (fv = 0);
        type || (type = 0);

        if (ir === 0)
            return -(pv + fv) / np;

        pvif = Math.pow(1 + ir, np);
        //pmt = - ir  pv  (pvif + fv) / (pvif - 1);
        pmt = -ir * pv * (pvif + fv) / (pvif - 1);
        if (type === 1)
            pmt /= (1 + ir);

        return Math.round(pmt);
    }

    var getTotalPeriod = function(a_ary) {
        var total = a_ary.length;
        var period = 0;
        for (var i = 0; i < total; i++) {
            period += parseInt(a_ary[i].period);
        }
        return period;
    }

    var getCurrentTerm = function(a_term, a_ary) {
        var idx = 0;
        var subPeriod = a_ary[idx].period;
        while (a_term > subPeriod) {
            idx++;
            subPeriod += a_ary[idx].period;
        }
        return idx;
    }

    var reorganizePeriod = function(a_ary) {
        var totalPeriod = getTotalPeriod(a_ary);
        var ary = [];
        ////console.log('reorganizePeriod',":",totalPeriod,a_ary);
        for (var i = 1; i <= totalPeriod; i++) {
            var _term = getCurrentTerm(i, a_ary);
            ary.push({
                period: i,
                rate: a_ary[_term].rate
            });
        }

        var obj = {};
        obj.total = totalPeriod;
        obj.ary = ary;
        return obj;
    }

    var calcReturn = function(a_obj, a_debugMode) {
        var formPeriodAry = a_obj.period;
        var fee = a_obj.fee;
        var periodInfo = reorganizePeriod(formPeriodAry);
        var totalPeriod = periodInfo.total;
        var periodAry = periodInfo.ary;
        var bill = a_obj.bill;
        var oriTotalBill = a_obj.bill;
        var totalBill = a_obj.bill; //新增一個貸款總額 dingdong
        var extenPeriodMonth = a_obj.extenPeriodMonth //新增寬限期月 dingdong

        //
        var ary = [];
        var currentPayBill = 0;
        var currentPayRate = 0;
        var subtotalRate = 0;
        var subtotalPayBill = 0;
        //寬限期總月數
        var oriExtePeriod = extenPeriodMonth;
        var extenPeriod = oriExtePeriod;
        var term = 0;


        ary.push({
            paymonth: 0,
            rate: 0,
            period: 0,
            bill: bill //貸款餘額
                ,
            totalBill: bill //貸款總額
                ,
            extenPeriodMonth: extenPeriodMonth //寬限期月 
                ,
            currentPayBill: currentPayBill //當期還本
                ,
            currentPayRate: currentPayRate //當期利息
                ,
            subtotalRate: subtotalRate //累計利息
                ,
            subtotalPayBill: subtotalPayBill //累計還本
        });

        for (i = totalPeriod; i > 0; i--) {

            //本息平均攤還

            /*
                本息平均攤還試算公式：
                每月應付本息金額之平均攤還率 = {[(1 + 月利率)^月數]×月利率} ÷ {[( 1 + 月利率)^月數] - 1}
                (公式中：月利率 = 年利率/12 ； 月數=貸款年期 x 12)

                每月應攤還本金與利息試算：
                平均每月應攤付本息金額 = 貸款本金×每月應付本息金額之平均攤還率 = 每月應還本金金額 + 每月應付利息金額
                每月應付利息金額 = 本金餘額 × 月利率
                每月應還本金金額 = 平均每月應攤付本息金額 - 每月應付利息金額

            */

            var p = totalPeriod - i;


            if (p > 1 && periodAry[p].rate != periodAry[p - 1].rate) {
                //分段改變
                totalBill = bill;
                extenPeriod = p;
            }

            //非寬限期總月數
            var nonExtenPeriod = totalPeriod - extenPeriod;
            //月利率
            //var rate = Math.round(periodAry[p].rate/100/12*10000)/10000;
            var rate = (periodAry[p].rate / 100 / 12);

            // //console.log(rate);
            var x = Math.pow(1 + rate, nonExtenPeriod);


            // 每月應付本息金額之平均攤還率
            var tmp = (x * rate) / (x - 1) * totalBill;
            var _currentPayTotal = Math.round(Math.round(tmp*10000)/10000) // 這裡要用   totalBill而非 bill 因為bill是貸款餘額

            //alert("bill"+ bill);
            //alert("_currentPayTotal" + _currentPayTotal)

            // 當期利息
            var _currentPayRate = Math.round(Math.round((bill * rate)*10000)/10000);
            //alert(_currentPayRate)

            // 當期還本
            var _currentPayBill;
            /*
            if(i>1){
                _currentPayBill =_currentPayTotal - _currentPayRate
                
            }else{
                //console.log( totalBill - _subtotalPayBill )
                _currentPayBill = totalBill - _subtotalPayBill
                
            //console.log('_currentPayBill0',_currentPayBill);
            }
             
            */

            //                    //console.log('extenPeriod',oriExtePeriod);
            if (p < oriExtePeriod) {

                _currentPayBill = 0
                _currentPayTotal = _currentPayBill + _currentPayRate;
            } else if (p == totalPeriod - 1) {
                // final period
                _currentPayBill = oriTotalBill - _subtotalPayBill; //正確版
                //_currentPayBill = _currentPayTotal - _currentPayRate; //為了顯示為 N 期
                _currentPayTotal = _currentPayBill + _currentPayRate;
            } else {

                _currentPayBill = _currentPayTotal - _currentPayRate;
            }

            /*
            if( i > nonExtenPeriod ){
                //寬期限
                _currentPayBill = 0
                _currentPayTotal = _currentPayBill + _currentPayRate;

            }else if(i==1){

                //final period
                _currentPayBill = oriTotalBill - _subtotalPayBill;
                _currentPayTotal = _currentPayBill + _currentPayRate;
            }else{
                //console.log('i',i);
                _currentPayBill = _currentPayTotal - _currentPayRate;
            }
            */
            //alert(_currentPayBill)

            // 累計利息
            var _subtotalRate = subtotalRate + _currentPayRate;

            // 累計還本
            var _subtotalPayBill = subtotalPayBill + _currentPayBill;

            // 餘額
            bill -= _currentPayBill;


            ary.push({
                paymonth: _currentPayTotal,
                rate: Math.round(rate * 10000) / 10000 * 100 + "%",
                period: totalPeriod - i + 1,
                bill: bill,
                currentPayBill: _currentPayBill,
                currentPayRate: _currentPayRate,
                subtotalRate: _subtotalRate,
                subtotalPayBill: _subtotalPayBill
            });
            //
            subtotalRate = _subtotalRate;
            subtotalPayBill = _subtotalPayBill;
            //
        }

        return ary;
    }

    var renderResult = function(a_ary, a_debugMode) {

            var ary = a_ary;
            var htmlDetail = "";
            var html="";

            var total = ary.length;

            var start = 1;
            var paymonth = ary[start].paymonth;

            var tmp = [];
            tmp.push({
                start: start,
                paymonth: ary[start].paymonth
            });

            var totalPayBill = 0;

            var totalCurrentPayBill = 0;
            var aprAry = [-(ary[total-1].subtotalPayBill)+parseInt($("input[name=Fee]").val())];
            for (var i = 1; i < total; i++) {
                htmlDetail += "<tr>";
                htmlDetail += "<td class='t_align_center'>" + ary[i].period + "</td>"


                htmlDetail += "<td>" + formatNumber(ary[i].currentPayBill.toString()) + "</td>"

                htmlDetail += "<td>" + formatNumber(ary[i].currentPayRate.toString()) + "</td>"
                totalCurrentPayBill += ary[i].currentPayRate;
                htmlDetail += "<td>" + formatNumber(ary[i].paymonth.toString()) + "</td>"
                //htmlDetail += "<td>"+ ary[i].rate +"</td>"
                htmlDetail += "<td>" + formatNumber(ary[i].bill.toString()) + "</td>"
                htmlDetail += "<td>" + formatNumber(ary[i].subtotalRate.toString()) + "</td>"
                //htmlDetail += "<td>"+ary[i].subtotalPayBill+"</td>"

                aprAry.push(ary[i].currentPayBill+ary[i].currentPayRate);
                htmlDetail += "</tr>";

                totalPayBill += ary[i].paymonth;

                var diff = Math.abs(ary[i].paymonth - ary[i - 1].paymonth);
                if (i > 1 && diff > 1) {
                    tmp[tmp.length - 1].end = i - 1
                    tmp.push({
                        start: i,
                        paymonth: ary[i].paymonth
                    });
                }
            }
            tmp[tmp.length - 1].end = ary.length - 1

            var total = tmp.length;
            html += '<tbody>';

            for (var i = 0; i < total; i++) {
                html += "<tr>";
                if (tmp[i].start == tmp[i].end) {
                    html += "<th>第" + tmp[i].start + "月</th>";
                } else if (i == total - 1) {
                    if (i > 1 && tmp[i].paymonth != tmp[i - 1].paymonth) {

                        html += "<th>第" + tmp[i].start + " ~ " + tmp[i].end + "月</th>";
                    } else {
                        html += "<th>第" + tmp[i].start + " ~ " + tmp[i].end + "月</th>";
                    }
                } else {
                    html += "<th>第" + tmp[i].start + " ~ " + tmp[i].end + "月</th>";
                }
                html += "<td><strong class='highlight'>" + formatNumber(tmp[i].paymonth.toString()) + "元</strong></td>";
                html += "</tr>";
            }
            html += '</tbody>';


            htmlDetail += "<tr>";
            htmlDetail += "<td>總計</td>"
            htmlDetail += "<td>" + formatNumber(ary[0].bill.toString()) + "</td>" //71000
            htmlDetail += "<td>" + formatNumber(totalCurrentPayBill.toString()) + "</td>" //71041
            htmlDetail += "<td>" + formatNumber(totalPayBill.toString()) + "</td>" //781041
            htmlDetail += "<td>" + formatNumber(ary[0].subtotalPayBill.toString()) + "</td>" //0

            htmlDetail += "<td>" + formatNumber(totalCurrentPayBill.toString()) +"</td>"
            htmlDetail += "</tr>";

            //var finance = new Finance();


           // console.log(aprAry);
          
            var apr = ModifyFinanceIRR(aprAry, 0.00001, 10000) * 12
            
            var aprHTML = '<p class="paragraph">您的貸款金額為<span class="highlight"><strong>'+$("#amount").val()
            aprHTML += '</strong></span>萬元，總費用年百分率為<span class="highlight"><strong>'+apr.toFixed(2)+'%</strong></span></p>';
 
         
            formResultMsg.html(aprHTML);
            formResultShort.html(html);
            formResultComplete.html(htmlDetail)

        }
        //試算公式 end /


    // 自動分段月份
    var termMonth; // 貸款期間月
    var termTotal; // 貸款期總月數
    var periodNumber = 1;
    var termAry = []
    var initCreditReturn = function() {

        moreInputCheck();
        setupEventListenerCreditReturn();
    }

    // 判斷分段利率是否展開
    var moreInputCheck = function() {

        if ($("#uniform-rateSegmentRadio span").hasClass("checked")) {
            $(".list_form_second").css("display", "block");
            $("#moreInput").css("display", "block");
        } else {
            $(".list_form_second").css("display", "none");
            $("#moreInput").css("display", "none");
        }

        if ($("#uniform-rateOnlyRadio span").hasClass("checked")) {
            $("#textRateOnly").attr("readonly", false).val("");
        } else {
            $("#textRateOnly").attr("readonly", true).val("");
        }

    }

    var saveTermInfo = function() {
        var validate = true;
        var errTarget = []
        var periodLength = $(".period").length;
        var tmpAry = [];
        for (var i = 1; i <= periodLength; i++) {
            var startName = "#period" + i;
            var startMonth = $(startName);
            var startMonthVal = parseInt(startMonth.val())
            var endName = "#period" + i + i;
            var endMonth = $(endName);
            var endMonthVal = parseInt(endMonth.val());

            if (isNaN(startMonthVal))
                startMonthVal = "";


            if (isNaN(endMonthVal))
                endMonthVal = "";

            tmpAry.push({
                start: startMonthVal,
                end: endMonthVal
            });
        }
        termAry = tmpAry;
        ////console.log('saveTermInfo',termAry);
    }

    var validateTerm = function() {
        var validate = true;
        var errTarget = []
        var periodLength = $(".period").length;
        var tmpAry = [];

        // //console.log('periodLength = ',periodLength);
        for (var i = 1; i <= periodLength; i++) {
            var startName = "#period" + i;
            var startMonth = $(startName);
            var startMonthVal = parseInt(startMonth.val())
            var endName = "#period" + i + i;
            var endMonth = $(endName);
            var endMonthVal = parseInt(endMonth.val());
            tmpAry.push({
                start: startMonthVal,
                end: endMonthVal
            });

            for (var k = i + 1; k <= periodLength; k++) {
                var nextEndMonth = $("#period" + k + k);
                var nextEndMonthVal = parseInt(nextEndMonth.val());

                if (!isNaN(nextEndMonthVal)) {


                    if (endMonthVal == nextEndMonthVal) {
                        validate = true;
                        while (k <= periodLength) {
                            $("#period" + k).val("");
                            $("#period" + k + k).val("");
                            k++;
                        }
                        i = periodLength + 1;

                    }

                    if (endMonthVal > nextEndMonthVal) {
                        validate = false;
                    }
                }
            }
        }

        ////console.log('validate',validate);
        if (validate) {
            //termAry = tmpAry;
        } else {
            var total = periodLength.length;
            for (var i = 1; i <= periodLength; i++) {
                var name = "#period" + i + i;
                var startMonth = $("period" + i);
                var endMonth = $(name);
                startMonth.val(termAry[i - 1].start);
                endMonth.val(termAry[i - 1].end);
            }
        }
        return validate;
    }


    var calcTerm = function() {
        var _termMonth = parseInt($("#term2").val());
        var _extendMonth = parseInt($("#extensionM").val());
        //
        var termTotal = _termMonth; // + _extendYear*12 + _extendMonth;
        return termTotal;
    }



    var addPeriod = function() {
        var periodLength = $(".period").length;
        var periodIdx = periodLength;

        //1
        for (var i = periodIdx; i <= periodLength; i++) {

            var currentStartName = "#period" + i;
            var currentStart = $(currentStartName);
            var currentStartVal = parseInt($(currentStartName).val());
            var currentEndName = "#period" + i + i;
            var currentEnd = $(currentEndName);
            var currentEndVal = parseInt($(currentEndName).val());
            //
            var preStartName = "#period" + (i - 1);
            var preStart = $(preStartName);
            var preStartVal = parseInt($(preStartName).val());
            var preEndName = "#period" + (i - 1) + (i - 1);
            var preEnd = $(preEndName);
            var preEndVal = parseInt($(preEndName).val());

            if (i == periodIdx && i != 1 && preEndVal < termTotal) {
                currentStart.val(preEndVal + 1);
                currentEnd.val(termTotal);
                currentEnd.attr({
                    "readonly": false
                });
            }
        }

        setupEventListenerCreditReturn();
    }


    var autoCountTerm = function(a_target) {

        termTotal = calcTerm();

        switch (a_target.attr('id')) {
            case "term2":
            case "#extensionM":
                var periodLength = $(".period").length;
                var periodIdx = 1
                    //1
                for (var i = periodIdx; i <= periodLength; i++) {
                    var currentStartName = "#period" + i;
                    var currentStart = $(currentStartName);
                    var currentStartVal = $(currentStartName).val();
                    var currentEndName = "#period" + i + i;
                    var currentEnd = $(currentEndName);
                    var currentEndVal = $(currentEndName).val();
                    var currentRateName = "#periodrate" + i;
                    var currentRate = $(currentRateName);
                    var currentRateVal = $(currentRate).val();
                    if (i == 1) {
                        currentStart.val(1);
                        currentEnd.val(termTotal);
                    } else {
                        currentStart.val("");
                        currentEnd.val("");
                        currentRate.val("");
                    }
                }
                break;

            default:

                var periodLength = $(".period").length;
                var periodIdx = parseInt(a_target.attr("id").substr(6, 1));
                //1
                for (var i = periodIdx; i <= periodLength; i++) {

                    var currentStartName = "#period" + i;
                    var currentStart = $(currentStartName);
                    var currentStartVal = parseInt($(currentStartName).val());
                    var currentEndName = "#period" + i + i;
                    var currentEnd = $(currentEndName);
                    var currentEndVal = parseInt($(currentEndName).val());
                    //
                    var preStartName = "#period" + (i - 1);
                    var preStart = $(preStartName);
                    var preStartVal = parseInt($(preStartName).val());
                    var preEndName = "#period" + (i - 1) + (i - 1);
                    var preEnd = $(preEndName);
                    var preEndVal = parseInt($(preEndName).val());

                    if (i == periodIdx) {
                        if (i != 1) {
                            ////console.log('preEndVal',preEndVal);
                            currentStart.val(preEndVal + 1);
                        }
                    } else if (i == (periodIdx + 1) && preEndVal < termTotal) {
                        currentStart.val(preEndVal + 1);
                        currentEnd.val(termTotal);
                        currentEnd.attr({
                            "readonly": false
                        });
                    } else {
                        currentStart.val("");
                        currentEnd.val("");
                    }
                }
                break;

        }

    }

    // 更改年限會重設
    var resetCountTerm = function() {
        termTotal = calcTerm()
        var periodLength = $(".period").length;
        $("#period" + 1 + 1).attr("value", termTotal);
        for (var i = 2; i <= periodLength; i++) {


            $("#period" + i).attr({
                "value": "",
                "readonly": true
            });
            $("#period" + i + i).attr({
                "value": "",
                "readonly": true
            });

        }
    }

     var validateForm = function(){
        var Amount = $('input[name="Amount"]',formScope);

        var ExtensionM = $('input[name="ExtensionM"]',formScope);
        var Term2 = $('input[name="Term2"]',formScope);
        var Fee  = $('input[name="Fee"]',formScope);
        var textRateOnly = $('input[name="textRateOnly"]',formScope);
        var checkEmpty = [Amount,Term2,ExtensionM,Fee]

        var hasError = false;
        //
        var rateChoose = parseInt($('input:radio[name=rateChoose]:checked').val());

        switch(rateChoose){
            case 1:
                
                var periodLength = $(".period").length;
                for (var i = 1; i <= periodLength; i++) {
                    var start = $("#period" + i);
                    var end = $("#period" + i + i);
                    var rate = $("#periodrate" + i);
                    $.toggleError(start,false);
                    $.toggleError(end,false);
                    $.toggleError(rate,false);
                }
                checkEmpty.push(textRateOnly);
            break;

            case 2:
                $.toggleError(textRateOnly,false);
                var periodLength = $(".period").length;

                for (var i = 1; i <= periodLength; i++) {
                    var start = $("#period" + i);
                    var end = $("#period" + i + i);
                    var rate = $("#periodrate" + i);
                    // //
                    if(i==1){
                        checkEmpty.push(start);
                            checkEmpty.push(end);
                            checkEmpty.push(rate);
                    }else{
                        if (!$.isEmpty(start.val()) || !$.isEmpty(end.val()) || !$.isEmpty(rate.val())) {
                            checkEmpty.push(start);
                            checkEmpty.push(end);
                            checkEmpty.push(rate);
                        }
                    }
                }
            break;

            default:
                return false;
            break;
        }
        //validate
        for(var i in checkEmpty){
            if($.isEmpty(checkEmpty[i].val()) || $.isNaN(checkEmpty[i].val())){
                hasError = true;
                // console.log(checkEmpty[i]);
                $.toggleError(checkEmpty[i],true);
            }else{
                $.toggleError(checkEmpty[i],false);
            }
        }

        //
        if(!hasError){
            formSubmit();
        }
        return false;
    }
    var setupEventListenerCreditReturn = function() {

        $(".result_view_group").bind("click",function(){
            $(this).addClass("active");
            $(".result_view_detail").removeClass("active");
            $("#count_result_showCreditReturn table.group").show();
            $("#count_result_showCreditReturn table.detail").hide();
        })


        $(".result_view_detail").bind("click",function(){
            $(this).addClass("active");
            $(".result_view_group").removeClass("active");
            $("#count_result_showCreditReturn table.detail").show();
            $("#count_result_showCreditReturn table.group").hide();  
        })
        $(".lebel_radio").unbind("click").bind("click", function() {
            moreInputCheck();
        });



        $("#term2").unbind("change").bind("change", function() {
            resetCountTerm();
        });


        $('input[type=radio][name=rateChoose]').unbind("change").bind("change", function() {
            formFalseCreditReturn();
        })
        $('#paymethod').bind("change", function() {
            paymethodValue = $("#paymethod").val();
            if (paymethodValue != "") {

                $("#paymethod").parents(".select_style").removeClass("error");
            } else {

                $("#paymethod").parents(".select_style").addClass("error");
            }
            formFalseCreditReturn();

            $("#savePaymethod").val(paymethodValue);
            $("#savePaymethod").trigger("blur");

        })



        $("#term2, #extensionM, [id^='period']").unbind("change").bind("change", function() {
            //$("#amount, #term, #term2, #extensionY, #extensionM, #paymethod, #textRateOnly, [id^='period']").bind("change",function(){
            if (validateTerm()) {
                autoCountTerm($(this));
                saveTermInfo();
            }

            formFalseCreditReturn();

        })

        // 增加更多分段利率
        var n = 3;
        $("#moreInput").unbind("click").bind("click", function() {
            //n ++;
            var n = $("[id^='period']").length / 3 + 1;
            if (n < 6) {
                $("#list_rateChoose").append('<li class="clearfix mt_10 mb_10"><label for="" class="label_text">' + n + '.</label> <label for=""><input class="w_80 period" type="text" readonly="readonly" name="period' + n + '" id="period' + n + '"/></label> <label for="" class="label_text">~</label> <label for=""> <input class="w_80" type="text" readonly="readonly" name="period' + n + n + '" id="period' + n + n + '"/></label> <label for="" class="label_text">月</label> <label for=""><input class=" w_80" type="text" name="periodrate' + n + '" id="periodrate' + n + '"/></label> <label for="" class="label_text">%</label></li>');


                if (n == 5) {
                    $("#moreInput").hide();
                }

                // uniform
                $(".form_style select, .form_style input, .form_style textarea").uniform();
                addPeriod();
                //autoCountTerm();


            }

            return false;

        });


        $("#formSubmitBtn").unbind("click").bind("click", function(e) {
            validateForm();
        })

        // $('input[data-format="numeric"]').returnPress();
        // $('input[data-format="numeric,dot"]').returnPress();
    }


    //讓數字三位數補逗點
    var formatNumber = function(str) {
        if (str.length <= 3) {
            return str;
        } else {
            return formatNumber(str.substr(0, str.length - 3)) + ',' + str.substr(str.length - 3);
        }
    }
   

    var formFalseCreditReturn = function() {
        $("#count_result_showCreditReturn").hide();
        $("#group_need_more_CreditReturn").show();
    }



    var formSubmit = function() {

        var data = {};
        data.bill = parseInt($("#amount").val()) * 10000; //萬元
        data.fee = parseInt($("input[name=Fee]").val()); //元
        data.periodMonth = parseInt($("#term2").val());
        data.extenPeriodMonth = parseInt($("#extensionM").val());
        data.paymethod = parseInt($("#paymethod").val());
        data.rateChoose = parseInt($('input:radio[name=rateChoose]:checked').val());
        data.textRateOnly = $("#textRateOnly").val();

        var periodLength = $(".period").length;
        var idx = 1;
        var periodAry = [];
        //var totalPeriod = data.periodYear*12 + data.periodMonth + data.extenPeriodYear*12 + data.extenPeriodMonth;
        var totalPeriod = data.periodMonth - data.extenPeriodMonth;
        if ($.trim(data.textRateOnly) == "") {
            //分段利率
            for (var i = 1; i <= periodLength; i++) {

                var start = $("#period" + i).val();
                var end = $("#period" + i + i).val();
                var rate = $("#periodrate" + i).val();
                if (rate == 0)
                    rate = 0.0000001;
                if (start != "" && end != "" && rate != "") {
                    /*
                    data['period'+idx] = start;
                    data['period'+idx+idx] = end;
                    data['periodrate'+idx] = rate;
                    idx++;
                    */
                    periodAry.push({
                        period: end - start + 1,
                        rate: rate
                    })
                }
            }
        } else {
            //單一利率
            if (data.textRateOnly == 0)
                data.textRateOnly = 0.0000001;
                periodAry.push({
                period: data.periodMonth,
                rate: data.textRateOnly
            })
        }
        var str = "";
        for (var i in data) {
            str += i + "  :  " + data[i] + "\n";
        }

        // $('#textRateOnly').validationEngine('hide')

        var hasError = false;
        for (var i = 1; i <= periodLength; i++) {
            // $('#periodrate' + i).validationEngine('hide');
        }

        if (data.rateChoose == 1) {
            var singleRateVal = parseFloat($.trim($("#textRateOnly").val()));

            if (isNaN(singleRateVal)) {
                // $('#textRateOnly').validationEngine('showPrompt', '請輸入利率', 'error');
                hasError = true;
            }
        } else {
            for (var i = 1; i <= periodLength; i++) {

                var start = $("#period" + i).val();
                var end = $("#period" + i + i).val();
                var rate = parseFloat($("#periodrate" + i).val());

                if (start != "" && end != "") {
                    if (isNaN(rate)) {
                        // $('#periodrate' + i).validationEngine('showPrompt', '請輸入利率', 'error');
                        hasError = true;
                    }
                }
            }
        }


        var totalExtendM = parseInt(data.extenPeriodMonth);
        if (isNaN(parseInt(data.extenPeriodMonth))) {
            // $('#extensionM').validationEngine('showPrompt', '請輸入數字', 'error');
            hasError = true;
        }

        /*else if(totalExtendM>50){
            $('#extensionY').validationEngine('showPrompt', '寬限期最長不可超過5年', 'error');
            hasError = true;
        }*/


        if (hasError)
            return false;


        data.period = periodAry;
        renderResult(calcReturn(data), false);
        showResultReturn();
    }

    
    var showResultReturn = function() {
        $(".form-calc-result").removeClass("hidden");
    }



    $(document).ready(function() {
        initCreditReturn();
    });
}
var creditCountReturn = new CreditCountReturn();