;
(function () {

	// 時間模組
	$("#singleDate").datepicker({
		autoclose: true,
		todayHighlight: true,
	}).datepicker('update', new Date());
	$("#mutiDate").datepicker({
		autoclose: true,
		todayHighlight: true,
	}).datepicker('update', new Date());
	// 
	window.alert = function (text, yesCallback, noCallback) {
		//換行符號
		text = text.toString();

		// 自定義警告視窗
		var alertdiv = '<div class="outAlert"><div id="alertDiv"><div class = "alertHeader"> <button type = "button"	class = "close"> × </button></div><div class="alertContent">' + text + '</div><br /><input type="submit" name="button" class="btnBlue btnYes" id="btnYes" value="確定"/><input  type="submit" name="button" class="btnWhite  btnNo" id="btnNo" value=" 取消 "/></div></div>'
		$(document.body).append(alertdiv);
		// 打開
		$("#alertDiv").show();
		$('.btnYes').click(function () {
			$(".outAlert").remove()
			yesCallback();
		});
		$('.outAlert .close').click(function () {
			$(".outAlert").remove()
		});
		$('.btnNo').click(function () {
			$(".outAlert").remove()
			noCallback();
		});
	};
	// sortable
	$("#sortableA, #sortableB").sortable({
		connectWith: ".connectedSortable"
	}).disableSelection();
})();
//
// 表單
window.addEventListener('load', function () {
	// Fetch all the forms we want to apply custom Bootstrap validation styles to
	var forms = document.getElementsByClassName('needs-validation');
	// Loop over them and prevent submission
	var validation = Array.prototype.filter.call(forms, function (form) {
		form.addEventListener('submit', function (event) {
			if (form.checkValidity() === false) {
				event.preventDefault();
				event.stopPropagation();
			}
			form.classList.add('was-validated');
		}, false);
	});
}, false);
// 報表展開
$(".reportPaperList li:not(:has(>ul))").addClass('theLast')
$('.reportPaperList li').click(function () {
	$('ul', this).toggleClass('openUl');
	return false
})
// 重新綁定點擊事件
// $('.theLast').on('click', function () {
// 	$('#reportModal').modal('show')
// })

$('.openModalList li').append('<a href="javascript:void(0)"><i class="far fa-heart liFavorite"></i></a>')
$('.openModalList li .liFavorite').click(function () {
	$(this).toggleClass('loved');
})
// 拖動事件
$('#sortable > li').append('<a href="javascript:void(0)"><i class="far fa-trash-alt liDelete" onclick="deleteThis(this)"></i></a>')
$("#sortable").sortable();
$("#sortable li .liDelete").click(function (event) {
	//   $("#sortable").stop()
	deleteThis(event)
});
// 刪除事件
function deleteThis(el) {
	alert("確定要刪除嗎?", function () {
		$(el.target).parents("#sortable li").remove();
	});

}

//sideBar 切換按鈕
let sidebarBtn = document.querySelectorAll('.sidebarBtn');
sidebarBtn.forEach(x => x.addEventListener('click', sideActive))

function sideActive() {
	sidebarBtn.forEach(x => x.classList.remove('active'))
	this.classList.add('active')
}
//fileSelection 切換按鈕
let flieSelectionBtn = document.querySelectorAll('.modalFileSelection .modalContent li');
flieSelectionBtn.forEach(x => x.addEventListener('click', fileActive))

function fileActive() {
	flieSelectionBtn.forEach(x => x.classList.remove('active'))
	this.classList.add('active')
}

// Note
$('.note .close').on('click', function () {
	$(this).parents('.note').addClass('hidden')
})


//popover

$("#popOver").popover({
	html: true,
	content: function () {
		return $("#popOver-content").html();
	}
})

//upload
$('input[type=file]').change(function () {
	for (var i = 0; i < document.getElementById("ufile").files.length; i++) {


		var li = document.createElement("li");
		var kb = (document.getElementById("ufile").files[i].size / 1024).toFixed(2) + 'KB'
		li.innerHTML = " <span class='fileName'>" + document.getElementById("ufile").files[i].name + "</span> <span class='kbSize'>" +
			kb +
			'<a href="javascript:void(0)"><i class="far fa-trash-alt liDelete" onclick="deleteFileUp(this)"></i></a>' + "</span>";
		document.getElementById("uploadResult").appendChild(li);
	}
	return false;
})
// 刪除事件
function deleteFileUp(el) {
	$(el).parents("#uploadResult li").remove();

}
//左右穿梭框
let leftSelection;
let rightSelection;
$('select[name="leftBoxList"]').on('click', 'option', function () {
	leftSelection = $(this);
});

function leftClick() {
	$('select[name="rightBoxList"]').append(leftSelection)
}
$('select[name="rightBoxList"]').on('click', 'option', function () {
	rightSelection = $(this);
})

function rightClick() {
	$('select[name="leftBoxList"]').append(rightSelection);
}