// 关闭提示
(function() {


    var closeTips = (function() {

        var tips = document.querySelector('.tips');
        var close = document.querySelector('#close');

        var cookie = getCookie('no');

        if (!!cookie) {
            tips.style.display = 'none';
        }

        close.addEventListener('click', function(event) {
            setCookie('no', 1, '5');
            tips.style.display = 'none';
        });
        
    })();


})();

function getCookie(c_name) {
    var arr = document.cookie.split(';');

    for (var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split('=');

        if (arr2[0] === c_name) {
            return arr2[1];
        }
    }

    return '';
}

function setCookie(c_name,value,expiredays) {
	var oDate=new Date();
	oDate.setDate(oDate.getDate()+expiredays);

	document.cookie=c_name+'='+value+';expires='+oDate;
	console.log(oDate);
}

// 轮播图
(function(){
    var carousel=document.getElementById('carousel');
    var oUl=carousel.getElementsByClassName('m-slider')[0];
    var aLi=oUl.getElementsByTagName('li');
    var order=document.getElementById('order');
    var index=0;
    var timer;
    for(var i=0;i<aLi.length;i++){
        var newLi=document.createElement('li');
        order.appendChild(newLi);
    }

    var orderLi=order.getElementsByTagName('li');
    orderLi[0].className='selected';

    function move(index){
        for(var i=0;i<aLi.length;i++){
            aLi[i].className='';
            orderLi[i].className='';
        }
        aLi[index].className='selected';
        orderLi[index].className='selected';
    }

    function automove(){
        timer=setInterval(function(){
            index++;
            if(index===aLi.length){
                index=0;
            }
            move(index);
        },5000);
    }

    automove();

    carousel.onmouseover=function(){
        clearInterval(timer);
    };

    carousel.onmouseout=function(){
        automove();
    };

    for(var i=0;i<aLi.length;i++){
        orderLi[i].index=i;
        orderLi[i].onmouseover=function(){
            index=this.index;
            move(index);
        };
    }
})();
