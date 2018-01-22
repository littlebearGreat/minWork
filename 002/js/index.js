// index.js

// 判断是否是PC打开的
function IsPC() {
	var userAgentInfo = navigator.userAgent;
	var Agents = ["Android", "iPhone",
		"SymbianOS", "Windows Phone",
		"iPad", "iPod"
		];
	var flag = true;	/*true-PC端;false-移动端*/
	for (var v = 0; v < Agents.length; v++) {
		if (userAgentInfo.indexOf(Agents[v]) > 0) {
			flag = false;
			break;
		}
	}
	return flag;
};
function resize() {
    var b = document.documentElement,
    a = function () {
    	var a;
    	if (IsPC()) {
	        a = 766;
    	}else{
	        a = b.getBoundingClientRect().width - 80;
    	};
        b.style.fontSize = (a/764) * 100 + "px"
    }, c = null;
    window.addEventListener("resize", function () {
        clearTimeout(c);
        c = setTimeout(a, 300)
    });
    a()
};
resize();