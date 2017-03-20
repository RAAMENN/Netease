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

function deleteCookie(c_name){
	setCookie(c_name,1,-1);
}
