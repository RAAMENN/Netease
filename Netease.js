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



// 轮播图
(function() {
    var carousel = document.getElementById('carousel');
    var oUl = carousel.getElementsByClassName('m-slider')[0];
    var aLi = oUl.getElementsByTagName('li');
    var order = document.getElementById('order');
    var index = 0;
    var timer;
    for (var i = 0; i < aLi.length; i++) {
        var newLi = document.createElement('li');
        order.appendChild(newLi);
    }

    var orderLi = order.getElementsByTagName('li');
    orderLi[0].className = 'selected';

    function move(index) {
        for (var i = 0; i < aLi.length; i++) {
            aLi[i].className = '';
            orderLi[i].className = '';
        }
        aLi[index].className = 'selected';
        orderLi[index].className = 'selected';
    }

    function automove() {
        timer = setInterval(function() {
            index++;
            if (index === aLi.length) {
                index = 0;
            }
            move(index);
        }, 5000);
    }

    automove();

    carousel.onmouseover = function() {
        clearInterval(timer);
    };

    carousel.onmouseout = function() {
        automove();
    };

    for (var i = 0; i < aLi.length; i++) {
        orderLi[i].index = i;
        orderLi[i].onmouseover = function() {
            index = this.index;
            move(index);
        };
    }
})();
// 产品列表标题
(function() {
    var oMain = document.getElementById('mainbody');
    var aDiv = oMain.getElementsByTagName('span');
    var pagenav = document.getElementsByClassName('pagenav')[0];
    var oPage = pagenav.getElementsByClassName('page');

    createLi('1', '10');

    for (var i = 0; i < aDiv.length; i++) {
        aDiv[i].index = i;
        aDiv[i].onclick = function() {
            for (var j = 0; j < aDiv.length; j++) {
                aDiv[j].className = '';
            }
            this.className = 'selected';

            if (this.index === 0) {
                createLi('1', '10');
                for (var i = 0; i < oPage.length; i++) {
                    oPage[i].className = 'page';
                    oPage[0].className = 'selected page';
                }
            } else {
                createLi('1', '20');
                for (var i = 0; i < oPage.length; i++) {
                    oPage[i].className = 'page';
                    oPage[0].className = 'selected page';
                }
            }
        };
    }

})();
//产品列表
function createLi(pageNo, type) {
    var oMain = document.getElementById('mainbody');
    var oTitle = oMain.getElementsByClassName('title');
    var oUl = oMain.getElementsByTagName('ul')[0];
    var aLi = oUl.getElementsByTagName('li');


    ajax({
        url: "http://study.163.com/webDev/couresByCategory.htm", //请求地址
        type: 'GET', //请求方式
        data: { pageNo: pageNo, psize: '20', type: type }, //请求参数
        dataType: "json", // 返回值类型的设定
        async: true, //是否异步
        success: function(response) {
            var got = JSON.parse(response).list; //   此处执行请求成功后的代码
            var url, title, provider, price, number;
            oUl.innerHTML = '';

            for (var i = 0; i < got.length; i++) {
                var oLi = document.createElement('li');
                oLi.className = 'lessonlist';
                oLi.innerHTML = '<img src="' + got[i].middlePhotoUrl + '" alt="pic" /><div class="content"><h4>' + got[i].name + '</h4><span class="provider"><span class="p">发布者：</span>' + got[i].provider + '</span><span class="number">' + got[i].learnerCount + '</span><span class="price">¥ ' + got[i].price + '.00</span></div><p class="des">' + got[i].description + '</p></li>';
                oUl.appendChild(oLi);
            }
            changeSize();
        },
        fail: function(status) {
            console.log('状态码为' + status); // 此处为执行失败后的代码
        }
    });
}


function changeSize() {
    var oMain = document.getElementById('mainbody');
    var oUl = oMain.getElementsByTagName('ul')[0];
    var aLi = oUl.getElementsByTagName('li');
    for (var i = 0; i < aLi.length; i++) {
        aLi[i].index = i;
        var holder;
        aLi[i].onmouseover = function() {
            aLi[this.index].className = 'special';
            if ((this.index + 1) % 4 === 0) {
                aLi[this.index].previousSibling.style.display = 'none';
            } else {
                aLi[this.index].nextSibling.style.display = 'none';
            }
        };

        aLi[i].onmouseout = function() {
            aLi[this.index].className = '';
            if ((this.index + 1) % 4 === 0) {
                aLi[this.index].previousSibling.style.display = 'inline-block';
            } else {
                aLi[this.index].nextSibling.style.display = 'inline-block';
            }
        };
    }
}
// 分页
function changePage() {
    var oMain = document.getElementById('mainbody');
    var aDiv = oMain.getElementsByTagName('span');
    var pagenav = document.getElementsByClassName('pagenav')[0];
    var oPage = pagenav.getElementsByClassName('page');

    for (var i = 0; i < oPage.length; i++) {
        oPage[i].index = i;
        oPage[i].onclick = function() {
            if (aDiv[0].className === 'selected') {
                createLi(this.index + 1, 10);
            } else {
                createLi(this.index + 1, 20);
            }
            for (var j = 0; j < oPage.length; j++) {
                oPage[j].className = 'page';
            }
            this.className = 'selected page';
            changeNav();
        };
    }
}

function changeNav() {
    var pagenav = document.getElementsByClassName('pagenav')[0];
    var oPage = pagenav.getElementsByClassName('page');
    var oPrev = document.getElementById('prev');
    var oNext = document.getElementById('next');

    if (oPage[2].className === 'selected page') {
        oNext.className = '';
        oPrev.className = 'active';
    } else if (oPage[0].className === 'selected page') {
        oPrev.className = '';
        oNext.className = 'active';

    } else {
        oNext.className = 'active';
        oPrev.className = 'active';

    }
}

function clickNav(){
    var oMain = document.getElementById('mainbody');
    var aDiv = oMain.getElementsByTagName('span');
    var pagenav = document.getElementsByClassName('pagenav')[0];
    var oPage = pagenav.getElementsByClassName('page');
    var oPrev = document.getElementById('prev');
    var oNext = document.getElementById('next');

    oPrev.onclick = function() {
        for (var i = 1; i < oPage.length; i++) {
            oPage[i].index=i;
            if (oPage[i].className === 'selected page') {
                if (aDiv[0].className === 'selected') {
                    createLi(oPage[i].index, 10);
                } else {
                    createLi(oPage[i].index, 20);
                }
                for(var j=0;j<oPage.length;j++){
                    oPage[j].className='page';
                }
                oPage[oPage[i].index-1].className='selected page';
                changeNav();
            }
        }
    };

    oNext.onclick=function(){
        for (var i = 0; i < oPage.length-1; i++) {
                oPage[i].index=i;
                console.log(oPage[i].className);

            if (oPage[i].className === 'selected page') {
                console.log('he');
                if (aDiv[0].className === 'selected') {
                    createLi(oPage[i].index+2, 10);
                } else {
                    console.log('hi');
                    createLi(oPage[i].index+2, 20);
                }
                for(var j=0;j<oPage.length;j++){
                    oPage[j].className='page';
                }
                oPage[parseInt(oPage[i].index+1)].className='selected page';
                changeNav();
                return false;
            }
        }
    };
    changePage();
}

function initial(){
    clickNav();
}

initial();
