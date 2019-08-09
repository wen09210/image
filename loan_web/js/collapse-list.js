this.QaToggle = function() {
    var qaListToggle = function(){
        // QA展開收合
        $(".collapse-list > li:nth-child(odd)").addClass("odd");
        $(".collapse-list > li:nth-child(even)").addClass("even");
        $(".collapse-list li .list-header").click(function(){
            $(this).next(".list-content").slideToggle();
            $(this).find(".icon_qa_plus").toggleClass("icon_qa_minus");
            if( $("this").has("a") ){
                return;
            }
        });

        $("#btn_slide_list_qa").click(function(){
            $(this).parent().next(".content_special_talk").slideToggle();
            $(this).find(".icon_plus").toggleClass("icon_minus");
            return false;
        });

        $(".list_talk > li:odd > i").addClass("arrow_talk_right");
        $(".list_talk > li:even > i").addClass("arrow_talk_left");

    }
    $(document).ready(function() {
        qaListToggle();
    })
};
var qaToggle = new QaToggle();



/*
 * Notice toggle
 * @version 20150517
 */
$(function(){
    $('body').on('click', '[data-noticetoggle]', function(e){
        $('i', this).toggleClass('icn-minus-o icn-plus-o');
        $($(this).attr('data-noticetoggle')).slideToggle(500);
        e.preventDefault();
    });
});


//var __currentGroupItem = null;
var collapse = $('.collapse-list-inner');
collapse.on('click', '.item-title', function () {
    var item = $(this).parent();
    var $body = $('body');

    if (!item.hasClass('on')) {
        collapse.find('.item.on').find('.item-cont').slideToggle(400, 'swing', function () {
            var itemtop = item.offset().top;
            if (itemtop < $body.scrollTop()) {
                $body.stop().animate({ scrollTop: (itemtop - 100) }, '500', 'swing');
            }
        }).parent().toggleClass('on');
    }

    item.find('.item-cont').slideToggle(400, 'swing').parent().toggleClass('on');
});