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

$(function(){

	// 时间两位数处理
	function timeTwo(n){
		if (n<10) {
			return '0' + n;
		}else{
			return n;
		}
	};

	// 倒计时
	function sTime(s){
		var h = parseInt(s/3600),
			m = parseInt(s%3600/60),
			s = parseInt(s%3600%60);
		h = timeTwo(h);
		m = timeTwo(m);
		s = timeTwo(s);
		var text = h + ':' + m + ':' + s;

		$('.ball .nowBall .l .h2 b').text(text);
	};

	// 滚动动画
	function animat(n,top){
		var ul = $('.ball .nowBall .l .round .roundBox ul');
		ul.eq(n).animate({'top':top},3000);
	};

	// 处理动画要的数据,并执行动画
	function round(codeString){
		// 108882
		var c = codeString;
		var n1 = Number(codeString[0]),
			n2 = Number(codeString[1]),
			n3 = Number(codeString[2]),
			n4 = Number(codeString[3]),
			n5 = Number(codeString[4]),
			n6 = Number(codeString[5]);

		var h = $('.ball .nowBall .l .round .roundBox li').height() * (-1);
		var t0 = h * n1,
			t1 = h * n2,
			t2 = h * n3,
			t3 = h * n4,
			t4 = h * n5,
			t5 = h * n6;

		animat(0,t0);
		animat(1,t1);
		animat(2,t2);
		animat(3,t3);
		animat(4,t4);
		animat(5,t5);
		console.log(h);
	};


	// 加载页面请求数据
	function getData(){
	    $.ajax({
		    url: "http://demo.wikcms.com/codes.php",
		    type: "POST",
		    success: function(data){
		    	var da = JSON.parse(data);
		    	console.log(da);
		        var t = da.surplusTime;	/*倒计时剩余时间*/

		        round(da.codeList[0].code);	/*动画*/

				var inter = setInterval(function(){
					t--;
					sTime(t);
					if (t<=0) {
						clearInterval(inter);
						getData();
					}
				},1000);

		    }
		});
	};
	getData();

	var a = {
		"codeList":[
			{"date":1516631700,"time":"01\/22 22:35","num":180122163,"code":"153372"},
			{"date":1516631400,"time":"01\/22 22:30","num":180122162,"code":"351209"},
			{"date":1516631100,"time":"01\/22 22:25","num":180122161,"code":"157419"},
			{"date":1516630800,"time":"01\/22 22:20","num":180122160,"code":"826857"},
			{"date":1516630500,"time":"01\/22 22:15","num":180122159,"code":"730027"},
			{"date":1516630200,"time":"01\/22 22:10","num":180122158,"code":"193765"},
			{"date":1516629900,"time":"01\/22 22:05","num":180122157,"code":"072358"},
			{"date":1516629600,"time":"01\/22 22:00","num":180122156,"code":"142960"},
			{"date":1516629300,"time":"01\/22 21:55","num":180122155,"code":"577839"},
			{"date":1516629000,"time":"01\/22 21:50","num":180122154,"code":"718572"}
		],
		"nextNum":180122164,
		"date":1516631821,
		"surplusTime":179
	};

})