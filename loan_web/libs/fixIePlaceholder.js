/*
處理 IE 不支援 HTML5 的 placeholder 屬性
2012.8.29 Maple 撰寫
http://www.dotblogs.com.tw/maplenote/archive/2012/08/29/html5-placeholder-on-ie.aspx
適用 jQuery 1.6 以上的版本，低於 1.6  需把 prop() 改為 attr()
*/

function fix_ie_placeholder()
{
	$("[placeholder]").each(function(){
		var el = $(this);
		var placeholder = el.attr("placeholder");
		if(el.prop("type")=="password")//處理密碼欄位
		{
			el.focus(function ()
			{
				$(this).prop("type","password");
				if($(this).val() == $(this).attr("placeholder"))
				{
					$(this).val('').removeClass("placeholderColor");
				}
			}).blur(function ()
			{
				if($(this).val()=='')
				{
					$(this).prop("type","text");
					$(this).val($(this).attr("placeholder")).addClass("placeholderColor");
				}
			});
			//不採用 el.blur(); 可能會改到預設 focus() 的輸入框
			//值相同時，也要修改文字顏色
			if(el.val()==''||el.val()==el.attr("placeholder"))
			{
				el.prop("type","text");
				el.val($(this).attr("placeholder")).addClass("placeholderColor");
			}
		}
		else //處理非密碼欄位
		{
			el.focus(function ()
			{
				if($(this).val() == $(this).attr("placeholder"))
				{
					$(this).val('').removeClass("placeholderColor");
				}
			}).blur(function ()
			{
				if($(this).val()=='')
				{
					$(this).val($(this).attr("placeholder")).addClass("placeholderColor");
				}
			});
			//不採用 el.blur(); 可能會改到預設 focus() 的輸入框
			//值相同時，也要修改文字顏色
			if(el.val()==''||el.val()==el.attr("placeholder"))
			{
				el.val($(this).attr("placeholder")).addClass("placeholderColor");
			}
		}
	});
}

//送出表單時呼叫，欄位值若等於 placeholder 的值就清空
function clearPlaceholderValue()
{
	$("[placeholder]").each(function(){
		if($(this).val()==$(this).attr("placeholder"))
		{
			$(this).val("");
		}
	});
}

$(function(){
	fix_ie_placeholder();
	//監聽 submit 事件，此動作會在 onsubmit 後，尚未轉頁前執行
	if(typeof window.addEventListener != "undefined") {
		window.addEventListener("submit",clearPlaceholderValue);
	} else {
		$("form").each(function(){
			this.attachEvent("onsubmit",clearPlaceholderValue);
		});
	}
});