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

this.CreditCountCredit = function(){
    var formCreditCountCredit = "#formCreditCountCredit";
    var formScope = $("#formMain");

    var moneyLoanMax;

    

    var initCountCredit = function(){
        setupEventListenerCountCredit();
    }

    var validateForm = function(){
        var salary = $('input[name="salary"]',formScope);
        var creditDebt = $('input[name="creditDebt"]',formScope);
        var creditLoan = $('input[name="creditLoan"]',formScope);
        var checkEmpty = [salary,creditDebt,creditLoan]

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


    var setupEventListenerCountCredit = function(){


        $("#creditDebt,#creditLoan,#salary").bind("change",function(){
            checkFormAllCountCredit();
        });

        
        $("#formSubmitBtn").click(function(e){                
            validateForm();
        })
    
    }

    var checkFormAllCountCredit = function(){
        formFalseCountCredit();
    }

    


    var formSubmit = function(){ 
        // 月收入
        var salary = parseInt(document.getElementById("salary").value);  
        // 信用卡負債
        var creditDebt = parseInt(document.getElementById("creditDebt").value);
        // 信用貸款
        var creditLoan = parseInt(document.getElementById("creditLoan").value);   

        // 試算結果
        var moneyLoanResult = salary*22 - creditDebt - creditLoan;
        
        // 結果值小於3000000 顯示結果，最大就3000000
        if( moneyLoanResult > 3000000 ){

            moneyLoanMax = formatNumber("3000000");
            $("#count_result_showCountCredit").show();
            $("#count_result_serviceCountCredit").hide();
            $("#group_need_more_CountCredit").hide();
            
        }else if ( moneyLoanResult > 0 ){

            moneyLoanMax = formatNumber(moneyLoanResult.toString());
            $("#count_result_showCountCredit").show();
            $("#count_result_serviceCountCredit").hide();
            $("#group_need_more_CountCredit").hide();

        }else{
            $("#count_result_showCountCredit").hide();
            $("#count_result_serviceCountCredit").show();
            $("#group_need_more_CountCredit").hide();
        }
        $(".form-calc-result").show();
        $("#textMoneyLoanMax").html(moneyLoanMax);
        
    }

    //讓數字三位數補逗點
    var formatNumber = function (str) {
        if(str.length <= 3){
            return str;
        } else {
            return formatNumber(str.substr(0,str.length-3))+','+str.substr(str.length-3);
        }
    }



    var formFalseCountCredit = function(){
        $("#count_result_showCountCredit, #count_result_serviceCountCredit").hide();
        $("#group_need_more_CountCredit").show();
    }

    

    $(document).ready(function(){
        initCountCredit();
    });
}
var creditCountCredit = new CreditCountCredit();