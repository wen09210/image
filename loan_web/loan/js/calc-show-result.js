var renderCalc = function(){

	var form = $(".validationEngineContainer");
	var formSubmit = $(".form-submit");
	var formResult = $(".form-calc-result");

	var formError = $(".formError");
	var selectError = $('.select_style');
	var inputError = form.find('input.uniform-input');

	formError.removeClass('formError').hide();
	inputError.removeClass('error');
	selectError.removeClass('error');

	formSubmit.bind('click',function(){

		var $this = $(this);

		var targetForm = $this.closest(form);
		var target = targetForm.find(formResult);
		var targetFormError = targetForm.find(formError);
		var targetInput = targetForm.find(inputError);
		var targetSelect = targetForm.find(selectError);

		targetFormError.addClass('formError').show();
		targetInput.addClass('error');
		targetSelect.addClass('error');
		target.show();

		$this.unbind();
		
	})

}


renderCalc();


var returnClac = function(){

	$(".choose-rate .lebel_radio").bind('click',function(){

		var options = $(this).find('input');
		var optionValue = options.attr('value');

		var target = $("#list_rateChoose");
		var subTarget = $("#moreInput");

		if(optionValue == 1) {

			target.hide();
			subTarget.hide();

		}else if(optionValue == 2){

			target.show();
			subTarget.show();


		}

	})

    // 增加更多分段利率
    var n = 3;
    $("#moreInput").unbind("click").bind("click", function() {
        //n ++;
        var n = $("[id^='period']").length / 3 + 1;
        if (n < 6) {
            $("#list_rateChoose").append('<li class="clearfix mt_10 mb_10"><label for="" class="label_text">' + n + '.</label> <label for=""><input class="w_62 period" type="text" name="period' + n + '" id="period' + n + '"/></label> <label for="" class="label_text">~</label> <label for=""> <input class="w_62" type="text" name="period' + n + n + '" id="period' + n + n + '"/></label> <label for="" class="label_text">月</label> <label for=""><input class=" w_62" type="text" name="periodrate' + n + '" id="periodrate' + n + '"/></label> <label for="" class="label_text">%</label></li>');


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



}


returnClac();