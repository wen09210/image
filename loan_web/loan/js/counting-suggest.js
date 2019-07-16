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


this.HouseCountSuggest = function(){
    var formHouseCountSuggest = "#formHouseCountSuggest";
    var formScope = $("#formHouseCountSuggest");

    var total = city.length;
    var cityLtv = $("#cityLtv").val();
    var areaLtv = $("#areaLtv").val();

    

    var initHouseSuggest = function(){
        setupEventListenerHouseSuggest();
    }
 
    var validateForm = function(){
        var cityLtv = $('select[name="cityLtv"]',formScope);
        var areaLtv = $('select[name="areaLtv"]',formScope);
        var moneyMonthReturn = $('input[name="moneyMonthReturn"]',formScope);
        var termYear  = $('input[name="termYear"]',formScope);
        var rateLoan = $('input[name="rateLoan"]',formScope);
        var checkEmpty = [cityLtv,areaLtv,moneyMonthReturn,termYear,rateLoan]

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

    var setupEventListenerHouseSuggest = function(){

        
        $("#cityLtv").empty();
        $("#cityLtv").append($('<option value="">請選擇縣市</option>'));
        $("#cityLtv").prev("span").html("請選擇縣市");
        for(var i=0;i<total;i++){
            //var areaTotal = city[i].area.length;
            $("#cityLtv").append($("<option></option>").attr("value",city[i].name).text( city[i].name ));                
        }

        $("#cityLtv").change(function(){ 
            $("#areaLtv").empty();
            $("#areaLtv").append($('<option value="">請選擇區域</option>'));
            $("#areaLtv").prev("span").html("請選擇區域");
            var id = $("option:selected",$(this)).index();
            if(id < 1){
                return false;
            }
            var cityName = $(this).val();
            var obj = city[id-1].area;
            var areaTotal = obj.length;
            for(var j=0;j<areaTotal;j++){
                $("#areaLtv").append($("<option data-ltv='"+obj[j].ltv+"' data-ltv-most='"+obj[j].ltvMost+"'></option>").attr("value",obj[j].name).text( obj[j].name ));    
            }
            formFalseHouseSuggest();
        }); 

        $("#areaLtv").change(function(){ 
            var selectedTarget =  $("option:selected",$(this));
            var ltv = selectedTarget.attr('data-ltv');
            var id = selectedTarget.index();
            var val = selectedTarget.val();

        });
        $("#cityLtv,#areaLtv,#moneyMonthReturn,#termYear,#rateLoan").bind("change",function(){

            checkFormAllHouseSuggest();

        });

        
        $("#formSubmitBtn").click(function(e){                
            validateForm();
        })  
    }


    var countLoanMax = function(){ 
        if($("#saveCityLtv").val()!=="" &&  $("#saveAreaLtv").val() !=="" ){
            var loanMaxValue = $("#areaLtv option:selected").attr("data-ltv");
            var loanMaxValueMost = $("#areaLtv option:selected").attr("data-ltv-most");
            //
            //= parseFloat(loanMaxValue);
            if(loanMaxValueMost!="undefined"){
                var houseLoanPercent = parseFloat(loanMaxValueMost);
            }
            else{
                var houseLoanPercent = parseFloat(loanMaxValue);
            }
          
            //var monthPay = parseInt($("#moneyMonthReturn").val());
            var monthPay = parseFloat($("#moneyMonthReturn").val());
            var totalPeriod = parseInt($("#termYear").val())*12;
            //var yearRate = parseInt($("#rateLoan").val())/100;
            var yearRate = parseFloat($("#rateLoan").val())/100;
            if (yearRate ==0)
                yearRate = 0.0000001;

            var monthRate = yearRate/12;
            var x = Math.pow(1+monthRate,totalPeriod);
            var loanX = (x * monthRate ) / (x - 1);
            var userBorrowMaxMoney = Math.round(monthPay / loanX);

            var housePrice = Math.round(userBorrowMaxMoney/houseLoanPercent);
            var userPrepareMoney = housePrice - userBorrowMaxMoney
            // //
            console.log("houseLoanPercent",houseLoanPercent);
            console.log("userBorrowMaxMoney",userBorrowMaxMoney);
            console.log("housePrice",housePrice);
            console.log("userPrepareMoney",userPrepareMoney);

            //
            if( loanMaxValueMost === "undefined"){
                $("#loanMax").html( loanMaxValue*10 +"成");
            }else{
                
                $("#loanMax").html( loanMaxValue*10 +"~" + loanMaxValueMost*10 +"成");
            }

            // console.log("housePrice",housePrice);
            // console.log("userBorrowMaxMoney",userBorrowMaxMoney);
            // console.log("userPrepareMoney",userPrepareMoney);
            $("#housePrice").html(formatNumber(housePrice.toString())+"萬");
            $("#userBorrowMaxMoney").html(formatNumber(userBorrowMaxMoney.toString())+"萬");
            $("#userPrepareMoney").html(formatNumber(userPrepareMoney.toString())+"萬");
            $("#showCity").html(cityLtv);
            $("#showArea").html(areaLtv);
            showResultHouseSuggest();
        }else{
            checkFormAllHouseSuggest();  
        }
        
    }


    var showResultHouseSuggest = function(){

        // 小於0時顯示請洽服務專員
        //$("#count_result_serviceHouseSuggest").show();

        // 預計最高可貸成數顯示
        $(".form-calc-result").show();
        // $("#count_result_showHouseSuggest + .group_need_more").hide();
    }

    var checkFormAllHouseSuggest = function (){
        cityLtv = $("#cityLtv").val();
        areaLtv = $("#areaLtv").val();
        if( cityLtv != ""){
            
            $("#cityLtv").parents(".select_style").removeClass("error");
        }else{
            
            $("#cityLtv").parents(".select_style").addClass("error");
        }

        if( areaLtv != ""){
            $("#areaLtv").parents(".select_style").removeClass("error");
        }else{
            
            $("#areaLtv").parents(".select_style").addClass("error");
        }

        $("#saveCityLtv").val( cityLtv );
        $("#saveAreaLtv").val( areaLtv );
        
        $("#saveCityLtv").trigger("blur");
        $("#saveAreaLtv").trigger("blur");

        formFalseHouseSuggest();
    }

    var initHouseSuggestFormValidation = function () {
        jQuery(formHouseCountSuggest).validationEngine({
            //binded: false,
            scroll: false,
            focusFirstField: false,
            promptPosition: 'bottomLeft',
            maxErrorsPerField: 1,
            addFailureCssClassToField: "error",
            onFailure: formFalseHouseSuggest,
            onSuccess: formSubmit
        });
    }


    var formFalseHouseSuggest = function(){
        $("#count_result_showHouseSuggest,#count_result_serviceHouseSuggest").hide();
        $("#count_result_showHouseSuggest + .group_need_more").show();
    }


    var formSubmit = function () {
        countLoanMax();

        // var data = {};
        // data.cityLtv = $("#cityLtv").val();
        // data.areaLtv = $("#areaLtv").val();
        // data.moneyMonthReturn = $("#moneyMonthReturn").val();
        // data.termYear = $("#termYear").val();
        // data.rateLoan = $("#rateLoan").val();
        
    }


    /*UTILS*/

    //讓數字三位數補逗點
    var formatNumber = function (str) {

        if(str.length <= 3){
            return str;
        } else {
            return formatNumber(str.substr(0,str.length-3))+','+str.substr(str.length-3);
        }
    }

    $(document).ready(function(){
        initHouseSuggest();
    });
}
var houseCountSuggest = new HouseCountSuggest();