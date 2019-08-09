/*
 * Find card
 * Question lightbox and result page
 * @version 20150720
 */
$(function(){
    var qIndex = 1,
        qTotal = 5,
        qOrder = [, 'gender', 'income', 'have', 'want', 'like'],
        qAnsw = [],
        resultCards = [], //結果卡別
        
        // 最常消費代號 (對應卡別)
        /*
            1: 大眾運輸 (2)
            2: 看電影 (2)
            3: 網路購物 (2)
            4: 百貨購物 (3,4)
            5: Costo購物 (5)
            6: 汽車停車加油 (6)
            7: 機車加油 (1)
            8: eTag儲值 (6)
            9: 出國旅遊 (7,8,9)
        */
        
        // 九張卡別資料
        allCards = { 
            1: {
                name: '拉拉熊i刷金融卡',
                cardimg: '/cathaybk/creditcard/img/card-rilakkuma.png',
                link: 'card.asp?id=1'
            },
            2: {
                name: 'PLAY(COMBO)悠遊聯名卡',
                cardimg: '/cathaybk/creditcard/img/card-play.png',
                link: 'card.asp?id=2'
            },
            3: {
                name: '太平洋SOGO(ETC/悠遊)聯名卡',
                cardimg: '/cathaybk/creditcard/img/card-sogo.png',
                link: 'card.asp?id=3'
            },
            4: {
                name: '鳳凰鈦金卡',
                cardimg: '/cathaybk/creditcard/img/card-lady.png',
                link: 'card.asp?id=4'
            },
            5: {
                name: 'COSTCO聯名卡',
                cardimg: '/cathaybk/creditcard/img/card-costco.png',
                link: 'card.asp?id=5'
            },
            6: {
                name: 'ETC聯名卡',
                cardimg: '/cathaybk/creditcard/img/card-etc.png',
                link: 'card.asp?id=6'
            },
            7: {
                name: '尊榮御璽卡',
                cardimg: '/cathaybk/creditcard/img/card-signature.png',
                link: 'card.asp?id=7'
            },
            8: {
                name: '鈦金商務卡',
                cardimg: '/cathaybk/creditcard/img/card-titanium.png',
                link: 'card.asp?id=8'
            },
            9: {
                name: '世界卡',
                cardimg: '/cathaybk/creditcard/img/card-world.png',
                link: 'card.asp?id=9'
            }
            // 未來新增
            /*10: {
                name: '',
                cardimg: '',
                link: ''
            }*/
        },
        
        lightboxSetting = {
            
            href: '#findCard',
            type: 'inline',
            padding: 0,
            scrolling: 'no',
            fitToView: false,
            closeSpeed: 0,
            helpers: {
                overlay: { speedOut:0, closeClick: false }
            },
            afterShow:function(){
            },
            afterClose: function() {
                _log('afterClose resultCards =>', resultCards);
                
                //未作答完畢即關閉 (作法1)，回上頁
                /*
                if(resultCards.length==0) {
                    history.back(); //若有上一頁紀錄，則作用
                    setTimeout(function(){ // 若無上一頁紀錄，防呆前往卡片單元首頁
                        location.href = 'index.asp'; 
                    }, 500);
                }
                */
                //未作答完畢即關閉 (作法2)，回首頁
                if(resultCards.length==0) {
                    location.href = 'intro.html';
                }
            }
        };
    
    $('body').on('click', '#btnStart', start);
    $('body').on('click', '#btnRestart', restart);
    $('body').on('click', '#btnPrev', prev);
    $('body').on('click', '#btnNext', next);
    $('body').on('click', '#btnSubmit', submit);
    
    
    $('body').on('change', '[name^="want"]', function(){
        var options = '';
        $('[name^="want"]').each(function(){
            var val = parseInt($(this).val());
            if(val > 0)
                options += '[value="'+ val +'"],';
        });
        options = options.slice(0, -1);
        
        $('[name^="want"] option').filter(options)./*prop('disabled',true).*/css('display','none');
        $('[name^="want"] option').not(options)./*prop('disabled',false).*/css('display','');
        
        $(this).prev('span').toggleClass('dim', $(this).val() == 0);
    });
    
    setTimeout(function(){ $('.selector > span').addClass('dim'); }, 2000);

    $('body').on('change', 'input, select', function() {
        $('#msg').hide().text('');
    });
    
    // 開啟lightbox
    setTimeout(open, 10);
    
    
    
    
    
    function _log() {
        if(!window.console || !window.console.log) return; // Avoid error on IE8,9
        console.log( arguments);
    }
    
    
    function open() {
        $.fancybox.open(lightboxSetting);
    }
    
    function start() {
        $('#rowStart').hide();
        $('#rowQuestion').show();
        goto(1);
    }
    
    //* 再測一次
    //*/
    function restart() {
        // reset layout
        $('#foundCard').hide();
        $('#rowStart').hide();
        $('#rowQuestion').show();
        
        // reset data
        qAnsw = [];
        resultCards = [];
        
        // reset form elements
        $('[name^="like"]').prop('checked', false);
        $('[name^="want"]').prop('selectedIndex',0);
        $('[name^="want"] option')./*prop('disabled',false).*/css('display','');
        $.uniform.update('[name^="like"], [name^="want"]');
        $('.selector > span').addClass('dim');
        
        goto(1);
        
        $.fancybox.open(lightboxSetting);
    }
    
    function next() {
        if( qIndex < qTotal ) goto(qIndex+1);
    }
    
    function prev() {
        if( qIndex > 1 ) goto(qIndex-1);
    }
    
    //* 前往第N題
    //*/
    function goto(index) {
        var id = qOrder[index],
            currQ = $('#q' + id.charAt(0).toUpperCase() + id.substr(1));
            

        if(index > 1) {
            var valid = validate(index - 1);
            //_log(id, index, currQ[0], '過關=>', checked);
            if(!valid) 
                return;
        }
        
        // Show question
        currQ.show().siblings('li').hide();
        
        
        // Button show/hide
        $('#btnPrev').toggle(index > 1);
            
        if(index == (qAnsw['have']==1?5:4)) {
            $('#btnNext').hide();
            $('#btnSubmit').css('display','inline-block');
        }
        else {
            $('#btnSubmit').hide();
            $('#btnNext').css('display','inline-block');
        }
        

        qIndex = index;


        // 隨著第N題 加上不同的 q-N class 讓裏面的容器更換樣式 by yuan 20150807
        var element = $("#rowQuestion");

    
        if(element.length>0 ){
            
            if(element.attr('class') != undefined){
                var classes = element.attr('class').split(/\s+/);

                var pattern = /^q-/;

                for(var i = 0; i < classes.length; i++){
                  var className = classes[i];

                  if(className.match(pattern)){
                    element.removeClass(className);
                  }
                }
            }
            //
            element.addClass("q-"+qIndex);
        }
        // 隨著第N題 加上不同的 q-N class 讓裏面的容器更換樣式 end
        $.fancybox.update();
    }   
    
    //* 逐題驗證選項
    //*/
    function validate(index) {
        if( index == 1) {
            if(!$('[name="gender"]:checked')[0])
                return false;
            qAnsw['gender'] = parseInt($('[name="gender"]:checked').val());
        }
        if( index == 2) {
            if(!$('[name="income"]:checked')[0])
                return false;
            qAnsw['income'] = parseInt($('[name="income"]:checked').val());
        }
        if( index == 3) {
            if(!$('[name="have"]:checked')[0])
                return false;
            qAnsw['have'] = parseInt($('[name="have"]:checked').val());
            // 若無信用卡則不需回答Q5
            if( qAnsw['have'] == 0 ) {
                $('[name^="like"]').prop('checked', false);
                $.uniform.update('[name^="like"]');
            }
        }
        if( index == 4) {
            var val = $('[name^="want"]').map(function() {
                return parseInt($(this).val());
            }).get();
            _log("qAnsw['want'] val =>", val);
            if(val.join().indexOf('0')==0) {
                $('#msg').text('第一項必填').show();
                return false;
            }
            qAnsw['want'] = val;
        }
        if( index == 5) {
            // 必填
            //if(!$('[name^="like"]:checked')[0])
            //    return false;
            
            // 非必填
            var val = $('[name^="like"]:checked').map(function() {
                return parseInt($(this).val());
            }).get();
            qAnsw['like'] = val;
            qAnsw.like.push(0,0,0,0); // 避免Q5選擇數量少於Q3
        }
        //_log('validate index=>', index, 'qAnsw =>', qAnsw);
        return true;
    }
    
    
    
    
    
    
    var youWant; // 最常消費(Q3-Q5之第一順位)
    var needCards;  // 最常消費對應卡別 (array)
    
    
    
                    // 最常消費代號與卡片對應
                    function getNeedCards(want) {
                        switch(want) {
                            case 1: return [2]; break;
                            case 2: return [2]; break;
                            case 3: return [2]; break;
                            case 4: return [3,4]; break;
                            case 5: return [5]; break;
                            case 6: return [6]; break;
                            case 7: return [1]; break;
                            case 8: return [6]; break;
                            case 9: return [7,8,9]; break;
                            //未來新增
                            //case 10: return [];break;
                        }
                    }
                    
                    function getFilteredResultCard(mapAry) {
                        var ary = [];
                        $.each(mapAry, function(key, val){
                            var index = needCards.indexOf(val);
                            if(index > -1) ary.push(val);
                        });
                        _log('getFilteredResultCard result array => ', ary, 'mapAray => ', mapAry);
                        // 若無交集則取Q3 第一順位回答
                        if( ary.length == 0 ){
                            return [getNeedCards(qAnsw.want[0])[0]];
                        }
                        return ary;
                    }
    
    
    //* 卡別分析邏輯
    //*/
    function submit() {
        
        // 若無信用卡則不需回答Q5
        if(qAnsw['have'] == 0) {
            //validate(5); // 仍需幕後執行Q5取得qAnsw.like
            qAnsw['like'] = [0,0,0,0];
            if(!validate(4)) return;
        } else {
            if(!validate(5)) return;
        }
       
        
        youWant = qAnsw.want.slice(); //copy array
                    // betBit 邏輯PDF 定義之"最常消費" 指的是Q3所回答扣除掉與Q5回答重複者,剩餘的答案中排序最高者
                    
        //http://stackoverflow.com/questions/5767325/remove-specific-element-from-an-array
        $.each(qAnsw.like, function(key, val){
            var index = youWant.indexOf(val);
            if(index > -1)  youWant.splice(index, 1);
        });
        if(youWant.length==0) {
            youWant = [qAnsw.want[0]];
        }
        
        _log('----submit-----');
        _log('qAnsw =>', qAnsw);
        _log('qAnsw.want =>', qAnsw.want);
        
        needCards = getNeedCards(youWant[0]);
        
        
        
        //var costco = !!(youWant.indexOf(5) > -1); 
        var costco = !!(qAnsw.want.indexOf(5) >-1); //是否包含Costco
        
        //_log('youWant[0] =>', youWant[0], 'youWant =>', youWant);
        _log('needCards =>', needCards, ' costco =>', costco);
        
        // beBit 邏輯判斷處理
        
        
        //無經驗
        if( qAnsw.have == 0) {
            //包含Costco
            if(costco) { 
                switch(qAnsw.income) { //依年收入建議卡別
                    case 1: resultCards = [2]; break;
                    case 2: resultCards = [5]; break;
                    case 3: resultCards = [5]; break;
                    case 4: resultCards = [5]; break;
                }
            }
            
            //不包含Costco
            else {
                switch(qAnsw.income) { //依年收入建議卡別
                    case 1: resultCards = [2]; break;
                    case 2: resultCards = [2]; break;
                    case 3: resultCards = getFilteredResultCard([1,2,3,4,5,6,7,8]); break;
                    case 4: {
                        //1,2,3,4,5,6,7,8,9與”Q3-Q5第一順位”交集，排除世界卡
                        resultCards = getFilteredResultCard([1,2,3,4,5,6,7,8]);
                        break;
                    }
                }
            }
        }
        
        //有經驗
        else {
            //包含Costco
            if(costco) { 
                switch(qAnsw.income) { //依年收入建議卡別
                    case 1: resultCards = getFilteredResultCard([1,2,3]); break;
                    case 2: resultCards = [5]; break;
                    case 3: resultCards = [5]; break;
                    case 4: resultCards = [5]; break;
                }
            }
            
            //不包含Costco
            else {
                switch(qAnsw.income) { //依年收入建議卡別
                    case 1: resultCards = getFilteredResultCard([1,2,3]); break;
                    case 2: resultCards = getFilteredResultCard([1,2,3,4,5,6]); break;
                    case 3: resultCards = getFilteredResultCard([1,2,3,4,5,6,7,8]); break;
                    case 4: {
                        //Q3有勾到出國旅遊推 "世界卡、尊榮御璽卡"
                        //Q3沒勾到出國旅遊推 1,2,3,4,5,6,7,8,9與”Q3-Q5第一 順位”交集
                        if(qAnsw.want.indexOf(9)>-1) {
                            resultCards = [7,9];
                        } else {
                            resultCards = getFilteredResultCard([1,2,3,4,5,6,7,8,9]);
                        }
                        break;
                    }
                }
            }
        }
        
        // 男性推薦邏輯於女性相同,僅是排除"鳳凰鈦金卡"
        if( qAnsw.gender == 1) {
            _log('男性');
            var index = resultCards.indexOf(4);
            if(index > -1) resultCards.splice(index, 1);
        }
        
        // 無符合卡片者,針對各收入級別推薦最主推卡片 ???
        _log( 'resultCards =>', resultCards);
        
        $.each(resultCards, function(key, val){
            _log('==>', allCards[val].name);
        });
        
    
        $.fancybox.close();
        
        $('html, body').animate({scrollTop:146},166);
        
        showFoundCard(resultCards);
    }
    
    //* 結果頁文案
    //*/
    function getPromoText(id) {
        var text = {}
        switch(id) {
            case 1: //拉拉熊i刷金融卡
                text.type1 = '騎車族群';
                text.type2 = '享有機車加油優惠';
                text.reason = '結合提款、簽帳功能拉拉熊卡i刷金融卡,<br>全國加油站機車<strong>加油每公升降3元</strong>!<br>讓經常騎機車的您加油省更多';
                break;
            
            case 2: //PLAY(COMBO)悠遊聯名卡
                
                //非大眾運輸之首次辦卡族
                if(qAnsw.have == 0 && qAnsw.income <= 2 && youWant[0] != 1) {
                    text.type1 = '首次辦卡族';
                    text.type2 = '用途較廣、消費性優惠多';
                    text.reason = '結合悠遊卡功能,<br>消費滿額享<strong>加值3%現金回饋</strong>,<br>能使用悠遊 卡付款的地方都節省;<br>另外還有<strong>國賓電影買1送1</strong>、<strong>KKBOX 6折</strong> ,<br>是最實用的入門卡片!';
                    return text;
                }
                //大眾運輸之首次辦卡通勤族
                if(qAnsw.have == 0 && qAnsw.income <= 2 && youWant[0] == 1) {
                    text.type1 = '首次辦卡通勤族';
                    text.type2 = '具悠遊卡功能、用悠遊卡消費同時累積累積回饋';
                    text.reason = '結合悠遊卡功能,<br>消費滿額享<strong>加值3%現金回饋</strong>,<br>刷車票、機 票還有<strong>3倍紅利</strong>,<br>是最實用的入門卡片!另外還有國賓電影買 一送一和KKBOX 6折喔!';
                    return text;
                }
                
                switch(youWant[0]) {
                    case 1:
                        text.type1 = '大眾運輸族群';
                        text.type2 = '具悠遊卡功能、用悠遊卡消費同時累積折扣';
                        text.reason = '結合悠遊卡功能,<br>消費滿額<strong>加值3%現金回饋</strong>,<br>刷車票、機票 還有<strong>3倍紅利</strong>!<br>另外還有國賓電影買一送一和KKBOX 6折喔!';
                        break;
                    case 2://看電影
                        text.type1 = '電影娛樂族群';
                        text.type2 = '享有電影等多種娛樂消費優惠';
                        text.reason = '<strong>國賓電影買1送1</strong>、<strong>KKBOX 6折</strong>優惠,<br>放大您的電影娛樂享受!';
                        break;
                    case 3://網路購物
                        text.type1 = '網路購物族群';
                        text.type2 = '在各大網路商城消費可累積三倍紅利';
                        text.reason = '網路購物<strong>紅利3倍</strong>送,<br>可輕鬆用紅利兌換各種實用商品/票券或折抵消費!<br>另外還有國賓電影買一送一、悠遊卡功能和KKBOX 6折喔!';
                        break;
                }
                break;
            
            case 3: //太平洋SOGO(ETC/悠遊)聯名卡
                text.type1 = '百貨購物族群';
                text.type2 = '於百貨公司消費優惠多';
                text.reason = '最多SOGO消費優惠!<br><strong>SOGO購物9折起</strong>、<strong>館內用餐</strong>、停車皆享優惠!';
                break;
            
            case 4: //鳳凰鈦金卡
                text.type1 = '百貨購物族群';
                text.type2 = '於百貨公司消費優惠多';
                text.reason = '百貨超市購物最高享<strong>1%現金回饋</strong>!<br>還有各大<strong>餐廳、下午茶</strong>優惠,<br>是您專屬的女性信用卡!';
                break;
            
            case 5: // Costco卡
                text.type1 = 'COSTCO會員';
                text.type2 = '可享Costco消費優惠';
                text.reason = '不論賣場內外消費,<br>最高<strong>1%現金回饋</strong>可折抵COSTCO賣場消費或會員年費;<br>2015/2/28日前首次申辦,還有機會獲得<strong>500元現金回饋</strong>,<br>可折抵COSTCO賣場消費或會員年費!';
                break;
            
            case 6: // ETC聯名卡
                text.type1 = '開車族群';
                text.type2 = '行車相關優惠多';
                switch(youWant[0]) {
                    case 6:
                        text.reason = 'eTag自動儲值享5%回饋,還享有<strong>免費市區停車</strong>優惠、<br><strong>中油0.5%現金回饋</strong>、行車傷害險等優惠,<br>幫您省下最多行車相關支出,最適合開車族的您!';
                        break;
                    case 8:
                        text.reason = '<strong>eTag自動儲值享5%回饋</strong>,<br>還享有<strong>免費市區停車</strong>優惠、中油 0.5%現金回饋、行車傷害險等優惠,<br>幫您省下最多行車相關支出,最適合開車族的您!';
                        break;
                }
                break;
            
            case 7: // 尊榮御璽卡
                if( qAnsw.income==4 ) { 
                    text.type1 = '高收入海外旅遊族';
                    text.type2 = '享頂級貴賓禮遇、海外消費優惠多';
                    text.reason = '國際<strong>機場接送NT$390起</strong>、<br>全球機場<strong>貴賓室免費使用</strong>、<br>且國內外消費不限時間地點,皆可享紅利點數加倍送!';
                } else {
                    text.type1 = '海外旅遊族群';
                    text.type2 = '機場服務完整、海外消費優惠多';
                    text.reason = '國際<strong>機場接送NT$390起</strong>、<br>全球機場<strong>貴賓室免費使用</strong>、<br>且國內外消費不限時間地點,皆可享紅利點數加倍送!';
                }
                break;
            
            case 8: // 鈦金商務卡
                text.type1 = '鈦金商務卡';
                text.type2 = '機場服務完整、海外消費優惠多';
                text.reason = '國際<strong>機場接送NT$288起</strong>、<br>全球機場<strong>貴賓室免費使用</strong>、<br>且國內外消費不限時間地點,皆可享紅利點數加倍送!';
                break;
            
            case 9: // 世界卡
                text.type1 = '世界卡';
                text.type2 = '享頂級貴賓禮遇、海外消費優惠多';
                text.reason = '滿額享<strong>免費機場接送</strong>、<br>全球機場<strong>貴賓室免費使用</strong>、頂級<strong>餐飲住房優惠</strong>,<br>且國內外消費不限時間地點,<br>皆可享紅利點數加倍送,讓您盡享尊榮禮遇!';
                break;
        }
        return text;
    }
    
    //* 結果頁呈現
    //*/
    function showFoundCard(card) {
        $('#foundCard').show();
        
        // Set result content
        var id = card[0],
            link = allCards[id].link;
        
        $('#foundCard .quote .type1').html(getPromoText(id).type1);
        $('#foundCard .quote .type2').html(getPromoText(id).type2);
        
        $('#foundCard #card1 .name').html('<a href="' + link + '">' + allCards[id].name + '</a>');
        $('#foundCard #card1 .cardimg').attr('href', link).html('<img src="' + allCards[id].cardimg + '">');
        $('#foundCard #card1 .more > a').attr('href', link);
        $('#foundCard #card1 .reason').html(getPromoText(id).reason);
        
        if(card.length > 1) {
            id = card[1],
            link = allCards[id].link;
            
            $('#foundCard #card2').show();
            $('#foundCard #card2 .name').html('<a href="' + link + '">' + allCards[id].name + '</a>');
            $('#foundCard #card2 .cardimg').attr('href', link).html('<img src="' + allCards[id].cardimg + '">');
            $('#foundCard #card2 .more > a').attr('href', link);
            $('#foundCard #card2 .reason').html(getPromoText(id).reason);
        }
        else {
            $('#foundCard #card2').hide();
        }
        
        
        if(resultCards.length>0) {
            var debug = 'Debug:'
                //+ '<br>最常消費(Q3-Q5第一順位, 交集)？' + youWant.toString()
                //+ '<br>最常消費(前者剩餘的答案中排序最高者)？' + youWant[0]
                + '<br>最常消費對應卡別：' + needCards.toString()
                + '<br>建議的卡別為：' + resultCards.toString();
            //$('#foundCard .debug').asp( debug );
        } 
    }
    
    
    // Array.prototype.indexOf() polyfill for IE8-
    // http://es5.github.io/#x15.4.4.14
    if(!Array.prototype.indexOf)Array.prototype.indexOf=function(searchElement,fromIndex){var k;if(this==null)throw new TypeError('"this" is null or not defined');var O=Object(this);var len=O.length>>>0;if(len===0)return-1;var n=+fromIndex||0;if(Math.abs(n)===Infinity)n=0;if(n>=len)return-1;k=Math.max(n>=0?n:len-Math.abs(n),0);while(k<len){if(k in O&&O[k]===searchElement)return k;k++}return-1};
});
