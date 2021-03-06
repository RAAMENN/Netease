function getCookie(c_name) {
    var arr = document.cookie.split('; ');

    for (var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split('=');

        if (arr2[0] === c_name) {
            return arr2[1];
        }
    }

    return '';
}

function setCookie(c_name, value, expiredays) {
    var oDate = new Date();
    oDate.setDate(oDate.getDate() + expiredays);

    document.cookie = c_name + '=' + value + ';expires=' + oDate;
}

//封装一个ajax函数
function ajax(options) {
    /**
     * 传入方式默认为对象
     * */
    options = options || {};
    /**
     * 默认为GET请求
     * */
    options.type = (options.type || "GET").toUpperCase();
    /**
     * 返回值类型默认为json
     * */
    options.dataType = options.dataType || 'json';
    /**
     * 默认为异步请求
     * */
    options.async = options.async || true;
    /**
     * 对需要传入的参数的处理
     * */
    var params = getParams(options.data);
    var xhr;
    /**
     * 创建一个 ajax请求
     * W3C标准和IE标准
     */
    if (window.XMLHttpRequest){
        /**
         * W3C标准
         * */
        xhr = new XMLHttpRequest();
    }else{
        /**
         * IE标准
         * @type {ActiveXObject}
         */
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4){
            var status = xhr.status;
            if (status >= 200 && status < 300 ){
                options.success && options.success(xhr.responseText,xhr.responseXML);
            }else{
                options.fail && options.fail(status);
            }
        }
    };
    if (options.type == 'GET'){
        xhr.open("GET",options.url + '?' + params ,options.async);
        xhr.send(null);
    }else if (options.type == 'POST'){
        /**
         *打开请求
         * */
        xhr.open('POST',options.url,options.async);
        /**
         * POST请求设置请求头
         * */
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        /**
         * 发送请求参数
         */
        xhr.send(params);
    }
}
/**
 * 对象参数的处理
 * @param data
 * @returns {string}
 */
function getParams(data) {
    var arr = [];
    for (var param in data){
        arr.push(encodeURIComponent(param) + '=' +encodeURIComponent(data[param]));
    }
    arr.push(('randomNumber=' + Math.random()).replace('.'));
    return arr.join('&');
}