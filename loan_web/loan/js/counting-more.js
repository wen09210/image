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

this.HouseCountMore = function(){
    var formCountMore = "#formCountMore";
    var formScope = $("#formCountMore");

    //手機號碼
    var phoneNumber;
    var codeNumber;
    // 年齡
    var ageYear;

    var industry;

    var workJob;
    var income;
    var credit;
    var totalc;
    var totalcash;


    

    var initMore = function(){
        setupEventListenerHouseMore();
    }

    var validateForm = function(){
        var ageYear = $('select[name="ageYear"]',formScope);
        var industry = $('select[name="industry"]',formScope);
        var income = $('select[name="income"]',formScope);
        var credit = $('select[name="credit"]',formScope);
        var totalc = $('select[name="totalc"]',formScope);
        var totalcash = $('select[name="totalcash"]',formScope);
        var workJob = $('select[name="workJob"]',formScope);
        var phoneNumber = $('input[name="phoneNumber"]',formScope);
        var codeNumber = $('input[name="codeNumber"]',formScope);

        var checkEmpty = [phoneNumber,codeNumber,ageYear,industry,workJob,income,credit,totalc,totalcash];

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

    var setupEventListenerHouseMore = function(){

        $("#formSubmitBtn").click(function(e){                
            validateForm();            
        })
    
    }
   

    $("#formSubmit_cancel").click(function(e){                
          $(".Newsletter_box").hide();
          $("tr.input_box_code").show();
          $("select").removeAttr('disabled');
          $(".form-steps__item.item2").removeClass('form-steps__item--active');
          $(".form-steps__item.item2 span.form-steps__item-icon").html('');
          $(".form-steps__item.item1 span.form-steps__item-icon").removeClass('active_on');
          $(".form_style div.selector").removeClass('disabled');
          $(".form_style div.selector span").removeClass('disabled');
          $("input#phoneNumber").removeAttr('disabled');       
    })
    


    var formSubmit = function (){
        $("select").parents(".select_style").removeClass("error");
        $("select").parents(".select_style").removeClass("error");
           showResultHouseMore();
       
    }

    //讓數字三位數補逗點
    var formatNumber = function (str) {
        if(str.length <= 3){
            return str;
        } else {
            return formatNumber(str.substr(0,str.length-3))+','+str.substr(str.length-3);
        }
    }

    var showResultHouseMore = function(){
          $(".Newsletter_box").show();
          $("tr.input_box_code").hide();
          $("select").attr('disabled', 'disabled');
          $(".form-steps__item.item2").addClass('form-steps__item--active');
          $(".form-steps__item.item2 span.form-steps__item-icon").html('2');
          $(".form-steps__item.item1 span.form-steps__item-icon").addClass('active_on');
          $(".form_style div.selector").addClass('disabled');
          $(".form_style div.selector span").addClass('disabled');
          $("input#phoneNumber").attr('disabled', 'disabled');

          $(function () {
                var countDown = function () {
                    var $el = $('#countDown'),
                        time = 600;
                    var interval = setInterval(function () {
                        time--;
                        var min = parseInt(time / 60),
                            sec = time % 60;
                        min = min < 10 ? '0' + min.toString() : min.toString();
                        sec = sec < 10 ? '0' + sec.toString() : sec.toString();
                        $el.text(min + ':' + sec);
                        if (time <= 0) {
                            clearInterval(interval);
                        }
                    }, 1000)
                };
                countDown();
            });
    }

    var checkFormAllHouseMore = function (){
        ageYear = $("#ageYear").val();
        industry = $("#industry").val();
        income = $("#income").val();
        credit = $("#credit").val();
        totalc = $("#totalc").val();
        totalcash = $("#totalcash").val();

        workJob = $("#workJob").val();
        areaLtv = $("#areaLtv").val();


        if( ageYear != ""){
            
            $("#ageYear").parents(".select_style").removeClass("error");
        }else{
            
            $("#ageYear").parents(".select_style").addClass("error");
        }

        if( industry != ""){
            
            $("#industry").parents(".select_style").removeClass("error");
        }else{
            
            $("#industry").parents(".select_style").addClass("error");
        }
        if( workJob != ""){
            
            $("#workJob").parents(".select_style").removeClass("error");
        }else{
            
            $("#workJob").parents(".select_style").addClass("error");
        }
        if( income != ""){
            
            $("#income").parents(".select_style").removeClass("error");
        }else{
            
            $("#income").parents(".select_style").addClass("error");
        }
        if( credit != ""){
            
            $("#credit").parents(".select_style").removeClass("error");
        }else{
            
            $("#credit").parents(".select_style").addClass("error");
        }
        if( totalc != ""){
            
            $("#totalc").parents(".select_style").removeClass("error");
        }else{
            
            $("#totalc").parents(".select_style").addClass("error");
        }
         if( totalcash != ""){
            
            $("#totalcash").parents(".select_style").removeClass("error");
        }else{
            
            $("#totalcash").parents(".select_style").addClass("error");
        }

        $("#saveageYear").val( ageYear );
        $("#saveindustry").val( industry );
        $("#saveworkJob").val( workJob );
        $("#saveincome").val( income );
        $("#savecredit").val( credit );
        $("#savetotalcash").val( totalcash );
        
     
        $("#saveageYear").trigger("blur");
        $("#saveindustry").trigger("blur" );
        $("#saveworkJob").trigger("blur" );
        $("#saveincome").trigger("blur" );
        $("#savecredit").trigger("blur" );
        $("#savetotalc").trigger("blur" );
        $("#savetotalcash").trigger("blur" );


        formFalseHouseMore();
    }


    

    $(document).ready(function(){
        initMore();
    });
}
var houseCountMore = new HouseCountMore();