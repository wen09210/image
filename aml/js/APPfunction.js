<!-- Onload -->
$(window).load(function() {
	
	/*Slider*/
    $('.flexslider').flexslider({
      animation: "slide",
      directionNav: false
    });
    String.prototype.trim   =   function(){   
      return   this.replace(/(^\s*)|(\s*$)/g,"");   
    }	
});
$(document).ready(function() {
	/*Modal box*/
	$(".iframe").colorbox({iframe:true, width:"95%", height:"95%"});
    $(".inline").colorbox({inline:true, width:"95%", height:"95%"});
	$("#dialogBox").jqm({trigger: ".dialogTrigger",modal: true,toTop: true});
    $("#busyBox").jqm({trigger: ".busyTrigger",modal: true,toTop: true});
	$("#newsBox").jqm({trigger: ".newsTrigger",modal: true,toTop: true});
	$("#processingBox").jqm({ modal: true, trigger: false,toTop: true});
    $("#processingBox").jqmHide();
	$("#processingBox2").jqm({ modal: true, trigger: false,toTop: true,overlayClass:"processingBox2"});
    $("#processingBox2").jqmHide();
	$("#AppletBox").jqm({ modal: true, trigger: true,toTop: true});
    $("#AppletBox").jqmHide();
	$("#noteBox").jqm({trigger: ".noteTrigger",modal: true,toTop: true});
	$("#modalBox").jqm({trigger: ".modalTrigger",modal: true,toTop: true});
    });