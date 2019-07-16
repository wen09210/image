$(function(){
    $('body').on('click', '[data-notice]', function(e){
        $('i', this).toggleClass('icn-open icn-close');
        $($(this).attr('data-notice')).slideToggle(500);
        e.preventDefault();
    });
});
