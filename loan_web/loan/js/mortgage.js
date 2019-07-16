$.extend({
    isEmpty: function(a_str) {
        return !$.trim(a_str);
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

$(function(){


    var formScope = $("#formReserve");

    var formQualified = $('#form_qualified',formScope);
    //
    var CName = $('input[name="CName"]',formScope);
    var Email = $('input[name="Email"]',formScope);
    var Mobile = $('input[name="Mobile"]', formScope);
    var IDNumber = $('input[name="IDNumber"]', formScope);
    //
    var contactTimeFrom = $('select[name="contactTimeFrom"]',formScope);
    var contactTimeTo = $('select[name="contactTimeTo"]',formScope);
    //
    var bankCity = $('select[name="bankCity"]',formScope);
    var bankArea = $('select[name="bankArea"]',formScope);
    var bankName = $('select[name="bankName"]',formScope);
    var bankSpot = $('input[name="bankSpot"]',formScope);
    //
    var wanted_1 = $('input[name="wanted_1"]',formScope);
    var wanted_2 = $('input[name="wanted_2"]',formScope);
    var wanted_3 = $('input[name="wanted_3"]',formScope);
    var wanted_4 = $('input[name="wanted_4"]',formScope);
    var wanted_5 = $('input[name="wanted_5"]',formScope);
    var wanted_other = $('input[name="wanted_other"]',formScope);
    var wantedOtherContent = $("textarea[name='wantedOtherContent']",formScope);
    var wantedCheckedGroup = $(".wantedCheckedGroup",formScope);
    var wantedCheckedGroupVal = [];
    var ContactAuthNo = $('input[name="ContactAuthNo"]',formScope);
    var submitBtn = $("#formReserve_submit",formScope);
    var formResult = $(".formReserveResult",formScope); 
    var formMain = $(".formReserveMain",formScope);

    var onFormComplete = function(){
    	formResult.show();
    	formMain.hide();
    }

    var sendData = function(a_obj){
    	//ajax part
  		console.log('sendData',a_obj);
    	//ajax end

    	onFormComplete();
    }


    var addEventListener = function(){

    	//for test
        $("#form-result-test").bind("click",onFormComplete);
        //for test end

        $('input[type="checkbox"]',wantedCheckedGroup).change(function(){

			if($(this).val()=="其他"){
				if ($.isChecked($(this))) {
					wantedOtherContent.show();
				}else{
					wantedOtherContent.hide();
				}
			}

            if ($.isChecked($(this))) {
                wantedCheckedGroupVal.push($(this).val());
            }
        });

        submitBtn.bind("click",validateForm);

        formQualified.bind("click",function(){
            if($.isChecked($(this))){
            	$.toggleDisable(CName,false);
            	$.toggleDisable(Mobile,false);
            	$.toggleDisable(Email, false);
            	$.toggleDisable(IDNumber, false);
            	submitBtn.removeClass("btn-disabled");

            }else{
            	$.toggleDisable(CName,true);
            	$.toggleDisable(Mobile,true);
            	$.toggleDisable(Email, true);
            	$.toggleDisable(IDNumber, true);
            	submitBtn.addClass("btn-disabled");
            }
        });

    }

    var validateForm = function(){

        //validate
        if($.isEmpty(CName.val())){
            $.toggleError(CName,true);
        }else{
            $.toggleError(CName,false);
        }
        if($.isEmpty(Mobile.val())){
            $.toggleError(Mobile,true);
        }else{
            $.toggleError(Mobile,false);
        }
        if(!$.isEmail(Email.val())){
            $.toggleError(Email,true);
        }else{
            $.toggleError(Email,false);
        }
        if (!$.isEmail(IDNumber.val())) {
            $.toggleError(IDNumber, true);
        } else {
            $.toggleError(IDNumber, false);
        }

        if($.isEmpty(contactTimeFrom.val()) || $.isEmpty(contactTimeTo.val())){
            $.toggleError(contactTimeFrom,true);
            $.toggleError(contactTimeTo,true);
        }else{
            $.toggleError(contactTimeFrom,false);
            $.toggleError(contactTimeTo,false);
        }

        if($.isEmpty(bankSpot.val())){
            $.toggleError(bankCity,true);
            $.toggleError(bankArea,true);
            $.toggleError(bankName,true);

            //測試用
            bankSpot.val("test");
        }else{
            $.toggleError(bankCity,false);
            $.toggleError(bankArea,false);
            $.toggleError(bankName,false);
        }

        if(wantedCheckedGroupVal.length==0){
            $.toggleError(wantedCheckedGroup,true);

        }else{
            $.toggleError(wantedCheckedGroup,false);
        }

        //
        if($.isEmpty(ContactAuthNo.val())){
            $.toggleError(ContactAuthNo,true);
        }else{
            $.toggleError(ContactAuthNo,false);
        }

        if($(".formError",formScope).length>0){
        	return false;
		}else{
			var data = {};
			data.CName = CName.val();
			data.Email = Email.val();
			data.Mobile = Mobile.val();
			data.IDNumber = IDNumber.val();
			data.contactTimeFrom = contactTimeFrom.val();
			data.contactTimeTo = contactTimeTo.val();
			data.bankCity = bankCity.val();
			data.bankArea = bankArea.val();
			data.bankName = bankName.val();
			data.bankSpot = bankSpot.val();
			data.wantedCheckedGroupVal = wantedCheckedGroupVal.toString();
			data.wantedOther = wantedOtherContent.val();
        	sendData(data);
		}

    }

    var init = function(){
        addEventListener();

    	$.toggleDisable(CName,true);
    	$.toggleDisable(Mobile,true);
    	$.toggleDisable(Email, true);
    	$.toggleDisable(IDNumber, true);
    }

    init();
})