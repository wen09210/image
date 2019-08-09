/*
 * userdock
 * @version 20150517
 */
$(function(){
    
    
    // 這裡是為了方便切版示意每一頁都有 userdock
    // 所以用 ajax 載入 userdock.html 取 #userDock片段 append 到 .mainbody
    // 當正式頁面串接時，
    // 請以server script include的方法，加入 #userDock HTML片段
    
    $('<div></div>').load('userdock.html #userDock', null, 
        function (res, staus) {
            if (staus == 'success') {
                $($(this).html()).appendTo('.container.creditcard > .content');
                
                
                !!userdock && userdock.init();
            }
        });
    
    // 示意加入比較表
    // 將html上所有 [data-userdock] element 綁上event
    // 展開 userdock 
    $('[data-userdock]').on('click', function(){
        userdock.switchModal('cards');
        userdock.addItem('cards');
    });
});

var userdock = (function(){
        
    return {
        currentModal: null,
        active: false,
        availHeight: 27,
        
        // 初始
        init: function() {
            if(!$('#userDock')[0])
                return;
            
            $('body').on('click','#btnMyCards, #btnMyEvents', function(){
                userdock.switchModal( this.id=='btnMyCards'?'cards':'events');
            });
            
            $('body').on('click', '.btn-trash', function() {
                userdock.removeItem($(this).parents('.item'));
            });
            
            $('body').on('click', '.userdock-head', userdock.close);
            
            $(window).on('resize orientationchange', userdock.position);
            
            userdock.position();
            
            //console.log(userdock);
        },
        
        // 展開 userdock
        open: function() {
            if(userdock.active)
                return;
            
            userdock.active = true;
            
            var h = userdock.availHeight;
            $('#userDock').addClass('on');
            $('#userDock').height(h);
            $('.userdock-head').show();
            $('.userdock-body').height(h - 27*2 - 10*2);
        },
        
        // 關閉 userdock
        close: function() {
            userdock.active = false;
            
            $('#userDock').removeClass('on');
            $('#userDock').height('');
            $('.userdock-body').height('');
            $('#btnMyEvents, #btnMyCards').removeClass('on');
        },
        
        // 切換 userdock-modal
        // modal {string}   cards => 我的卡片比較
        //                  events => 我的活動
        switchModal: function(modal) {
            
            if(!userdock.active)
                userdock.open();
            
            
            switch(modal) {
                case 'cards':
                    $('#modalMyEvents').hide();
                    $('#modalMyCards').show();
                   
                    $('#btnMyEvents').removeClass('on');
                    $('#btnMyCards').addClass('on');
                    
                    currentModal = $('#modalMyCards');
                    break;
                case 'events':
                    $('#modalMyEvents').show();
                    $('#modalMyCards').hide();
                    
                    $('#btnMyEvents').addClass('on');
                    $('#btnMyCards').removeClass('on');
                    
                    currentModal = $('#modalMyEvents');
                    break;
            }
        },
        
       
        
        // 更新高度
        position: function() {
            var h = Math.min(440, Math.round($(window).height()*.85));
            
            userdock.availHeight = h;
            
            if( $('#userDock').hasClass('on') ) {
                $('#userDock').height(h);
                $('.userdock-body').height(h - 27*2 - 10*2);
            }
        },
        
        
        // 增加一個項目到 userdock
        addItem: function(modal) {
            switch(modal) {
                case 'cards':
                    // 示意....非正式功能
                    var newCardItemContent = '<a href="card.html">'
                        +'<img class="cardimg" src="/cathaybk/img/creditcard/card-play-s.png">'
                        +'<span class="name">Play(Combo)悠遊聯名卡</span>'
                    +'</a>'
                    +'<div class="btn-trash" title="移除此項目"></div>';
                    
                    var nextAvailItem = $('#modalMyCards .item').not('.on').first();
                    if(nextAvailItem[0]) {
                        nextAvailItem.children().html( newCardItemContent );
                        nextAvailItem.addClass('on');
                        userdock.updateCountDisplay('cards');
                    }
                    
                    break;
                case 'events':
                    break;
            }
        },
        
        // 刪除一個項目
        removeItem: function(item) {
            var modal = item.parents('.userdock-modal')[0].id.toLowerCase().replace('modalmy','');
            console.log(modal);
            
            switch(modal) {
                case 'cards':
                    // 示意....非正式功能
                    var dummyItemContent  = '<div class="item-inner">'
                                        +'<img class="cardimg" src="/cathaybk/img/creditcard/card-addone-s.png">'
                                    +'</div>';
                                    
                    item.children().replaceWith(dummyItemContent);
                    item.removeClass('on');
                    userdock.updateCountDisplay('cards');
                    break;
                case 'events':
                    break;
            }
        },
        
        // 更新數量顯示
        updateCountDisplay: function(modal) {
             switch(modal) {
                case 'cards':
                    $('#btnMyCards, #modalMyCards').find('.count').text( $('#modalMyCards .item.on').length );
                    break;
                
                case 'events':
                    $('#btnMyEvents, #modalMyEvents').find('.count').text( $('#modalMyEvents .item.on').length );
                    break;
             }
        }
    }
})();