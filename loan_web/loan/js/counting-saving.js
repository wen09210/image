$.extend({
    isEmpty: function(a_str) {
        return ($.trim(a_str)=="");
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



this.HouseCountSave = function(){
    var formHouseCountSave = "#formHouseCountSave";
    var formScope = $("#formHouseCountSave");
    var houseLoanMoney;        //目前房貸餘額
    var houseReturnMonth;      //目前每月還款
    var houseLoanTerm;         //餘貸款年限或欲申請貸款年限
    var houseTurnRate;         //轉貸後利率

    var ir;     // 利率 / 100 / 12
    var np;     // 轉貸年限 x 12
    var pv;     // 房貸餘額 (負的)
    var type;   // 寫0


    var init = function(){
        setupEventListener();
    }

    var validateForm = function(){
        var houseLoanMoney = $('input[name="houseLoanMoney"]',formScope);

        var houseTurnRate = $('input[name="houseTurnRate"]',formScope);
        var houseLoanTerm = $('input[name="houseLoanTerm"]',formScope);
        var houseReturnMonth  = $('input[name="houseReturnMonth"]',formScope);
        var checkEmpty = [houseLoanMoney,houseTurnRate,houseLoanTerm,houseReturnMonth]

        var hasError = false;
       
        //validate
        for(var i in checkEmpty){
            if($.isEmpty(checkEmpty[i].val())){
                hasError = true;
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

    var setupEventListener = function(){

        $("#houseLoanMoney, #houseLoanTerm, #houseTurnRate, #houseReturnMonth").change(function(){ 
            formFalseHouseSave();
        });
        
        
        
        $("#formSubmitBtn").click(function(e){                
            validateForm();
        })
    }

    var PMT = function (ir, np, pv, fv, type){
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
            return -(pv + fv)/np;

        pvif = Math.pow(1 + ir, np);
        //pmt = - ir  pv  (pvif + fv) / (pvif - 1);
        pmt = - ir * pv * (pvif + fv) / (pvif - 1);
        if (type === 1)
            pmt /= (1 + ir);

        return Math.round(pmt);
    }

    var formSubmit = function(){


        houseLoanMoney = $("#houseLoanMoney").val();        //目前房貸餘額
        houseReturnMonth = $("#houseReturnMonth").val();    //目前每月還款
        houseLoanTerm = $("#houseLoanTerm").val();          //餘貸款年限或欲申請貸款年限
        houseTurnRate = $("#houseTurnRate").val();          //轉貸後利率

        ir = houseTurnRate /100 /12;   // 利率 / 100 / 12
        np = houseLoanTerm*12;         // 轉貸年限 x 12
        pv = -houseLoanMoney*10000;    // 房貸餘額 (負的)  欄位單位是萬，要X10000
        type = 0;                      // 寫0
        

        var resultMonthReturn = PMT(ir,np,pv,type);                   //每月還款金額
        var resultMonthSave = houseReturnMonth - resultMonthReturn;    //每月減少支出

        var textResultMonthReturn = formatNumber(resultMonthReturn.toString());     //每月還款金額轉字串
        var textResultMonthSave = formatNumber(resultMonthSave.toString());         //每月減少支出轉字串
        
        
        if( resultMonthSave <=0){
            //每月減少支出金額≦0
            $("#count_result_serviceHouseSave").show();
            // $("#group_need_more_HouseSave").hide();
        }else{
            //每月減少支出金額＞0

            $("#showResultMonthReturn").html(textResultMonthReturn+"元");
            $("#showResultMonthSave").html(textResultMonthSave+"元");

            $("#count_result_showHouseSave").show();
            // $("#group_need_more_HouseSave").hide();
        }
    }
    


    //讓數字三位數補逗點
    var formatNumber = function (str) {
        if(str.length <= 3){
            return str;
        } else {
            return formatNumber(str.substr(0,str.length-3))+','+str.substr(str.length-3);
        }
    }




    var formFalseHouseSave = function(){
        $("#count_result_showHouseSave").hide();
        $("#count_result_serviceHouseSave").hide();
        $("#group_need_more_HouseSave").show();
    }
  

    $(document).ready(function(){
        init();
    });
}
var houseCountSave = new HouseCountSave();