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

	// 页面倒计时显示
	function sTime(s){
		var h = parseInt(s/3600),
			m = parseInt(s%3600/60),
			s = parseInt(s%3600%60);
		h = timeTwo(h);
		m = timeTwo(m);
		s = timeTwo(s);
		var text = h + ':' + m + ':' + s;

		// 改变页面显示
		$('.ball .nowBall .l .h2 b').text(text);
	};

	// 滚动动画
	function animat(n,top){
		var ul = $('.ball .nowBall .l .round .roundBox ul');
		ul.eq(n).animate({'top':top},3000);
	};

	// 处理动画要的数据,并执行动画
	function round(codeString){	/*codeString：中奖码字符串*/
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

	// 显示历史中奖号码
	function history(array){	/*参数：传入codeList*/
		var li = $('.lastBall .line>li');
		for (var i = 0; i < array.length; i++) {
			var oL = li.eq(i+1),
				data = array[i];
			oL.children('span').eq(0).text(data.num);
			oL.children('span').eq(1).text(data.time);

			var rLi = oL.find('li'),
				code = data.code;
			for (var k = 0; k < rLi.length; k++) {
				var src = 'images/' + code[k] + '.gif';
				if (k == 5) {
					k = 6
				};
				rLi.eq(k).children('img').attr('src',src);
			}
		}
	};


	// 加载页面请求数据
	function getData(){
	    $.ajax({
		    url: "http://demo.wikcms.com/codes.php",
		    type: "POST",
		    success: function(data){
		    	var da = JSON.parse(data);
		    	console.log(da);

		    	// 显示最近一次的期数
		    	$('.ball .nowBall .l .round .tit p').eq(0).text(da.codeList[0].num);

		        var t = da.surplusTime;	/*倒计时剩余时间*/

		        round(da.codeList[0].code);	/*动画*/

		        // 延迟显示历史（动画完成后再显示）
		        setTimeout(function(){
			        history(da.codeList);
		        },3000);

		        // 定时器
				var inter = setInterval(function(){
					t--;
					sTime(t);
					if (t<=0) {
						clearInterval(inter);
						getData();
					};
				},1000);

		    }
		});
	};
	getData();

	// 日期选择框
	$("#date").mobiscroll({
        preset:'date',
        theme: 'android-ics light',
        lang: 'zh',
        display: 'bottom',
    });

    //	点击“查询更多”按钮
    $('#hist').click(function(){
    	$('#historyCont').show();
    })

    // 历史记录框关闭按钮
    $('#close').click(function(){
    	$('#historyCont').hide();
    	$('#historyCont tbody').children().remove();
    	$('#date').val('');

    })

    // 点击弹窗中的查询按钮
    $('#historyCont .btn').click(function(){
    	var time = $('#date').val();
    	console.log(time);
    	if (!time) {
    		layer.alert('请选择查询时间');
    		return false;
    	};

    	$.ajax({
    		url: 'http://demo.wikcms.com/codelist.php?date=' + time,
    		success: function(data){
    			var d = JSON.parse(data);
    			var list = d.codeList;
    			for (var i = 0; i < list.length; i++) {
    				var tr = $('<tr>'),
    					td1 = $('<td>'),
    					td2 = $('<td>'),
    					td3 = $('<td>');
    				td1.text(list[i].num);
    				td2.text(list[i].time);
    				td3.text(list[i].code);
    				tr.append(td1,td2,td3);
    				$('#historyCont tbody').append(tr);
    			};
    		},
    		error: function(){
    			layer.alert('查询失败')
    		}
    	})
    })

})