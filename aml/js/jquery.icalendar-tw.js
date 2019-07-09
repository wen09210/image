jQuery(function($){
	$.fn.dp_calendar.regional[''] = {
		closeText: '關閉',
		prevText: '&#x3c;Ant',
		nextText: 'Sig&#x3e;',
		currentText: '今日',
		monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月','8月', '9月', '10月', '11月', '12月'],
		monthNamesShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月','8月', '9月', '10月', '11月', '12月'],
		dayNames: ['週日', '週一','週二', '週三', '週四', '週五', '週六'],
		dayNamesShort: ['週日', '週一','週二', '週三', '週四', '週五', '週六'],
		dayNamesMin: ['日', '一','二', '三', '四', '五', '六'],
		DP_LBL_EVENTS: '行事曆',
		DP_LBL_NO_ROWS: '當日並無任何內容',
		DP_LBL_SORT_BY: '排序依照:',
		DP_LBL_TIME: '時間',
		DP_LBL_TITLE: '標題',
		DP_LBL_PRIORITY: '重要性'};
	$.datepicker.regional[''] = $.fn.dp_calendar.regional[''];
});