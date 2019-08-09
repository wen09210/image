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

this.CreditCountSave = function(){
    var formCreditCountSave = "#formCreditCountSave";   
    var formScope = $("#formMain");

    var creditLoanMoney;        //目前信貸餘額
    var monthReturnMoney;       //目前每月還款支出
    var turnMonthLimit;         //轉貸後貸款期數
    var creditTurnRate;         //轉貸後利率
    



    var ir;     // 利率 / 100 / 12
    var np;     // 轉貸年限 x 12 (目前改成月份所以不用X12)
    var pv;     // 信貸餘額 (負的)
    var type;   // 寫0


    var initCreditSave = function(){
        setupEventListenerCreditSave();
    }

    var validateForm = function(){
        var creditLoanMoney = $('input[name="creditLoanMoney"]',formScope);

        var turnMonthLimit = $('input[name="turnMonthLimit"]',formScope);
        var houseLoanTerm = $('input[name="houseLoanTerm"]',formScope);
        var monthReturnMoney  = $('input[name="monthReturnMoney"]',formScope);
        var creditTurnRate  = $('input[name="creditTurnRate"]',formScope);
        var checkEmpty = [creditLoanMoney,turnMonthLimit,monthReturnMoney,creditTurnRate]

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

    var setupEventListenerCreditSave = function(){

        $("#creditLoanMoney, #monthReturnMoney, #turnMonthLimit, #creditTurnRate").change(function(){ 
            formFalseCreditSave();

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


        creditLoanMoney = $("#creditLoanMoney").val();      //目前信貸餘額
        monthReturnMoney = $("#monthReturnMoney").val();    //目前每月還款支出
        turnMonthLimit = $("#turnMonthLimit").val();        //轉貸後貸款期數
        creditTurnRate = $("#creditTurnRate").val();        //轉貸後利率

        ir = creditTurnRate /100 /12;   // 利率 / 100 / 12
        np = turnMonthLimit;            // 轉貸年限 x 12 (目前改成月份所以不用X12)
        pv = -creditLoanMoney;          // 信貸餘額 (負的)
        type = 0;                       // 寫0
        

        var resultMonthReturn = PMT(ir,np,pv,type);                   //每月還款金額
        var resultMonthSave = monthReturnMoney - resultMonthReturn;    //每月減少支出

        var textResultMonthReturn = formatNumber(resultMonthReturn.toString());     //每月還款金額轉字串
        var textResultMonthSave = formatNumber(resultMonthSave.toString());         //每月減少支出轉字串
        
        //alert(creditLoanMoney + "\n" + monthReturnMoney + "\n" + turnMonthLimit + "\n" + creditTurnRate + "\n" + resultMonthReturn   + "\n" + resultMonthSave);
        // alert("resultMonthSave = "+resultMonthSave)
        if( resultMonthSave <=0){
            //每月減少支出金額≦0
            $("#count_result_showCreditSave").hide();
            $("#count_result_serviceCountSave").show();
        }else{
            //每月減少支出金額＞0


            $("#showResultMonthReturn").html(textResultMonthReturn+"元");
            $("#showResultMonthSave").html(textResultMonthSave+"元");

            $("#count_result_showCreditSave").show();
            $("#count_result_serviceCountSave").hide();
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


    var formFalseCreditSave = function(){
        $("#count_result_showCreditSave").hide();
        $("#count_result_serviceCountSave").hide();
    }

    

    $(document).ready(function(){
        initCreditSave();
    });
}
var creditCountSave = new CreditCountSave();