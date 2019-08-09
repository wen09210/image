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

this.HouseCountHouse = function(){
    var formHouseCountHouse = "#formHouseCountHouse";
    var formScope = $("#formMain");

    var total = city.length;
    var cityLtv = $("#cityLtv").val();
    var areaLtv = $("#areaLtv").val();


    var initCountHouse = function(){
        setupEventListenerCountHouse();
    }

    var validateForm = function(){
        var cityLtv = $('select[name="cityLtv"]',formScope);
        var areaLtv = $('select[name="areaLtv"]',formScope);
        var checkEmpty = [cityLtv,areaLtv];

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
    var setupEventListenerCountHouse = function(){


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
            formFalseCountHouse();
        }); 

        $("#areaLtv").change(function(){ 
            var selectedTarget =  $("option:selected",$(this));
            var ltv = selectedTarget.attr('data-ltv');
            var id = selectedTarget.index();
            var val = selectedTarget.val();

        });
        $("#cityLtv,#areaLtv").bind("change",function(){

            checkFormAllCountHouse();

        });

        
        $("#formSubmitBtn").click(function(e){                
            validateForm();
        })    
    }   


    var formSubmit = function(){ 
        if($("#saveCityLtv").val()!=="" &&  $("#saveAreaLtv").val() !=="" ){
            var loanMaxValue = $("#areaLtv option:selected").attr("data-ltv");
            var loanMaxValueMost = $("#areaLtv option:selected").attr("data-ltv-most");
            if( loanMaxValueMost === "undefined"){
                $("#loanMax").html( loanMaxValue*10 +"成");
            }else{
                
                $("#loanMax").html( loanMaxValue*10 +"~" + loanMaxValueMost*10 +"成");
            }
            showResultCountHouse();
        }else{
            checkFormAllCountHouse();  
        }
        
    }


    var showResultCountHouse = function(){
        
        $(".form-calc-result").show();
        // $("#count_result_showCountHouse + .group_need_more").hide();
    }

    var checkFormAllCountHouse = function (){
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

        formFalseCountHouse();
    }

    var formFalseCountHouse = function(){
        $("#count_result_showCountHouse").hide();
        $("#count_result_showCountHouse + .group_need_more").show();
    }

    



    

    $(document).ready(function(){
        initCountHouse();
    });
}
var houseCountHouse = new HouseCountHouse();