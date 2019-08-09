

var renderCalc = function(){

	var formSubmit = $(".form-submit");
	var formResult = $(".form-calc-result");

	formSubmit.bind('click',function(){

		var $this = $(this);

		formResult.show();
		$this.unbind();

	})


}


renderCalc();