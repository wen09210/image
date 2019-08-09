$(function(){

	var calcForm = $("#calcForm");
	var tbody = $('#equation-table tbody');
	//
 	 //讓數字三位數補逗點
    var formatNumber = function (str) {
        if(str.length <= 3){
            return str;
        } else {
            return formatNumber(str.substr(0,str.length-3))+','+str.substr(str.length-3);
        }
    }
    //
	var send = function(){
		calcForm.validationEngine("validate");
	}

	var sheet = function(){

		$('#equation-table').slideDown(200)
		tbody.html('');
		//貸款金額
		var DeMoney = $('#demoney').val();
		//期數
		var Term = $('#term').val();
		//每期(月)利率
		var MRate = $('#mrate').val();

		var totalPaid = 0;
	    var totalInt = 0;

		for(i=1;i<=Term;i++){

			if(i==Term){
	            //最後期應繳本金
	            var CurPaidTemp = DeMoney - totalPaid;
	        } else {
	        	//當期應繳本金
				var CurPaidTemp = Math.round(DeMoney/Term*10000/10000);
	        }
			
			//貸款餘額
			var BalMoney = DeMoney-CurPaidTemp*(i-1);
			//當期利息
			var Interest = Math.round(BalMoney*(MRate/100)*10000/10000);
			//當期應繳金額
			var CurPaid = CurPaidTemp+Interest
			//當期應繳本金小計
			totalPaid = totalPaid+CurPaidTemp;
			//當期利息小計
			totalInt = totalInt+Interest;

			var strCurPaidTemp = formatNumber(CurPaidTemp.toString());
			var strBalMoney = formatNumber(BalMoney.toString());
			var strInterest = formatNumber(Interest.toString());
			var strCurPaid = formatNumber(CurPaid.toString());
			tbody.append(
				'<tr><td class="green">'+ i +'</td><td>'+ strCurPaidTemp +'</td><td>'+ strBalMoney +'</td><td>'+ strInterest +'</td><td>'+ strCurPaid +'</td></tr>'
			)
		}

		var strTotalPaid = formatNumber(totalPaid.toString());
		var strtotalInt = formatNumber(totalInt.toString());
		$('#totalpaid').html(strTotalPaid)
		$('#totalint').html(strtotalInt)
	}

	var formFalseReturn = function(){
		// alert("formFalseHouseReturn");
	}


	var formSuccessReturn = function(){
		//alert("formSubmitHouseReturn");
		sheet();
	}

	jQuery(calcForm).validationEngine({
	    scroll: false,
	    focusFirstField: false,
	    promptPosition: 'bottomLeft',
	    maxErrorsPerField: 1,
	    addFailureCssClassToField: "error",
	    onFailure: formFalseReturn,
	    onSuccess: formSuccessReturn
	});



	$("#equation-start").bind("click",function(){
		send();
	})
})