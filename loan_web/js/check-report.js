
















this.FinancialReports = function( element ){

	
  	var path = "./json/reports.asp";
	var json;
	
	var yearFigure;
	var buttonLeft;
	var buttonRight;

	var year;
	var maxYear;
	var minYear;
	

	var getJson = function(){

		$.getJSON(path, function(_json) { 
			json = _json;
			init();
		}).done(function() {
			console.log( "json get success " + path );
		})
		.fail(function() {
			console.log( "json fail " + path );
		})

	}

	var init = function(){

		setupItems();
		setStartYear();
		setupEventListeners();

	}

	var setupItems = function(){

		maxYear = json.max;
		minYear = json.min;	
		
		yearFigure = $(".unit-container .number", element);
		buttonLeft = $(".unit-control .button-left", element);
		buttonRight = $(".unit-control .button-right", element);
		buttonQuarterReport = $(".button-quarter-report", element);
		buttonYearReport = $(".button-year-report", element);		

	}

	var setStartYear = function(){

		year = maxYear;
		checkYear();
		setContent();

	}

	var setContent = function(){
		

		for (var i = 0; i < buttonQuarterReport.length; i++) {
			
			var button = $(buttonQuarterReport[i]);
			var url = json[ year ].quarters[i];
			
			if (url){
				button.attr( "href", url );
				button.removeClass("disabled");
			} else {
				button.addClass("disabled");
			}

		};

		if (json[ year ].year_report){
			buttonYearReport.attr( "href", json[ year ].year_report );
			buttonYearReport.removeClass("disabled");
		} else {
			buttonYearReport.addClass("disabled");
		}

		yearFigure.html( year );

	}


	

	var setupEventListeners = function(){
		
		buttonLeft.click( function(){
			year--
			checkYear();
			setContent();
		});

		buttonRight.click( function(){
			year++
			checkYear();
			setContent();
		});

	}

	var checkYear = function(){

		buttonRight.removeClass("disabled");
		buttonLeft.removeClass("disabled");

		if (year >= maxYear){
			year = maxYear;
			buttonRight.addClass("disabled");

		} else if (year <= minYear){
			year = minYear;
			buttonLeft.addClass("disabled");
		}

	}

	




	_document.ready(function() {
		if (element.length != 0){
			getJson();        
		}
	}); 

}


var financialReportsCtrl = new FinancialReports( $("article.check-report") );