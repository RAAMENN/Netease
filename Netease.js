// 关闭提示
function tipsCookie() {

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
}


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

//生成主栏课程
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
            // 鼠标hover时改变li大小
        },
        fail: function(status) {
            console.log('状态码为' + status); // 此处为执行失败后的代码
        }
    });
}

// 鼠标hover时改变li大小
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

// 改变分页器样式
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

// 分页点击事件
function clickNav() {
    var oMain = document.getElementById('mainbody');
    var aDiv = oMain.getElementsByTagName('span');
    var pagenav = document.getElementsByClassName('pagenav')[0];
    var oPage = pagenav.getElementsByClassName('page');
    var oPrev = document.getElementById('prev');
    var oNext = document.getElementById('next');

    oPrev.onclick = function() {
        for (var i = 1; i < oPage.length; i++) {
            oPage[i].index = i;
            if (oPage[i].className === 'selected page') {
                if (aDiv[0].className === 'selected') {
                    createLi(oPage[i].index, 10);
                } else {
                    createLi(oPage[i].index, 20);
                }
                for (var j = 0; j < oPage.length; j++) {
                    oPage[j].className = 'page';
                }
                oPage[oPage[i].index - 1].className = 'selected page';
                changeNav();
            }
        }
    };

    oNext.onclick = function() {
        for (var i = 0; i < oPage.length - 1; i++) {
            oPage[i].index = i;
            console.log(oPage[i].className);

            if (oPage[i].className === 'selected page') {
                console.log('he');
                if (aDiv[0].className === 'selected') {
                    createLi(oPage[i].index + 2, 10);
                } else {
                    console.log('hi');
                    createLi(oPage[i].index + 2, 20);
                }
                for (var j = 0; j < oPage.length; j++) {
                    oPage[j].className = 'page';
                }
                oPage[parseInt(oPage[i].index + 1)].className = 'selected page';
                changeNav();
                return false;
            }
        }
    };
    changePage();
}

// 生成热门课程
function createHotList() {
    var oList = document.getElementById('hotlist');
    var oUl = oList.getElementsByTagName('ul')[0];
    var hotlist;

    ajax({
        url: "http://study.163.com/webDev/hotcouresByCategory.htm", //请求地址
        type: 'GET', //请求方式
        dataType: "json", // 返回值类型的设定
        async: true, //是否异步
        success: function(response) {
            hotlist = JSON.parse(response);
            for (var i = 0; i < hotlist.length; i++) {
                var smallPhoto = hotlist[i].smallPhotoUrl;
                var name = hotlist[i].name;
                var follow = hotlist[i].learnerCount;

                var hotlistLi = document.createElement('li');
                hotlistLi.innerHTML = '<p class="crop-technique"><img src="' + smallPhoto + '" alt="pic"></p><h4 class="hotTitle">' + name + '</h4><span class="study">' + follow + '</span>';
                oUl.appendChild(hotlistLi);
                oUl.style.height = (hotlistLi.offsetHeight * hotlist.length + 20 * hotlist.length) * 2 + 'px';
            }
            oUl.innerHTML += oUl.innerHTML;
        },
        fail: function(status) {
            console.log('状态码为' + status); // 此处为执行失败后的代码
        }
    });
}

// 播放视频
function playVideo() {
    var oMask = document.getElementsByClassName('m-mask')[0];
    var oBtn = oMask.getElementsByClassName('closed')[1];
    var mVideo = oMask.getElementsByClassName('m-video')[0];
    var mLogin = oMask.getElementsByClassName('m-login')[0];
    var oVideo = document.getElementsByClassName('video')[0];
    var oImg = oVideo.getElementsByTagName('img')[0];

    oImg.onclick = function() {
        oMask.style.display = 'block';
        mVideo.style.display = 'block';
        mLogin.style.display = 'none';
    };

    oBtn.onclick = function() {
        oMask.style.display = 'none';
        mLogin.style.display = 'none';
        mVideo.style.display = 'none';
    };
}

// 热门视频滚动
function moveHotList() {
    var oList = document.getElementById('hotlist');
    var oUl = oList.getElementsByTagName('ul')[0];

    function move() {
        if (oUl.style.top === '0px') {
            oUl.style.top = (-oUl.offsetHeight / 2 + 'px');
        }
        oUl.style.top = oUl.offsetTop + 1 + 'px';
    }
    setInterval(move, 30);
}

// 点击关注
function follow() {
    var followBtn = document.getElementById('follow');
    var oMask = document.getElementsByClassName('m-mask')[0];
    var oBtn = oMask.getElementsByClassName('closed')[0];
    var mLogin = oMask.getElementsByClassName('m-login')[0];
    var mVideo = oMask.getElementsByClassName('m-video')[0];


    followBtn.onclick = function() {
        oMask.style.display = 'block';
        mVideo.style.display = 'none';
        mLogin.style.display = 'block';
        login();
    };

    oBtn.onclick = function() {
        oMask.style.display = 'none';
        mLogin.style.display = 'none';
        mVideo.style.display = 'none';
    };
}

// 登陆
function login() {
    var loginBtn = document.getElementById('loginBtn');
    var followBtn = document.getElementById('follow');
    var oMask = document.getElementsByClassName('m-mask')[0];
    var mLogin = oMask.getElementsByClassName('m-login')[0];
    var followed = document.getElementById('followed');

    loginBtn.onclick = function() {
        var password = document.getElementById('password').value;
        var account = document.getElementById('account').value;

        ajax({
            url: "http://study.163.com/webDev/login.htm", //请求地址
            type: 'GET', //请求方式
            data: { userName: hex_md5(account), password: hex_md5(password) }, //请求参数
            dataType: 'boolean', // 返回值类型的设定
            async: true, //是否异步
            success: function(response) {
                var resToInt = parseInt(response);
                console.log(resToInt);
                if (resToInt === 1) {
                    oMask.style.display = 'none';
                    mLogin.style.display = 'none';
                    followBtn.style.display = 'none';
                    followed.style.display = 'inline-block';

                    setCookie('followSuc', 1, '5');

                } else {
                    alert('账号密码不匹配！');
                }
            },
            fail: function(status) {
                console.log('状态码为' + status); // 此处为执行失败后的代码
            }
        });
    };
}

// 关注后改变样式
function followApi(){
    var cookie = getCookie('followSuc');
    var followBtn = document.getElementById('follow');
    var followed = document.getElementById('followed');

    if (!!cookie) {
        followBtn.style.display = 'none';
        followed.style.display = 'inline-block';
    }
}

// 检查cookies
function checkCookies(){
    followApi();
    tipsCookie();
}


function initial() {
    clickNav();
    playVideo();
    createHotList();
    moveHotList();
    follow();
    checkCookies();
}

initial();
