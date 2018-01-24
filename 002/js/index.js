// index.js
var sp = true;
var isFirst = true;
var animateTime = 6000;		/*改变动画时间长短的话就改变此参数，10000是10秒*/
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
			sp = false;
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
        c = setTimeout(a, 50)
    });
    a()
};
resize();

$(function(){

	// 设置球的高度为整数
	$('.ball .nowBall .l .round .roundBox li').height($('.ball .nowBall .l .round .roundBox li').height());
	$('.ball .nowBall .l .round .roundBox').height($('.ball .nowBall .l .round .roundBox li').height());
	$('.ball .nowBall .l .round').height($('.ball .nowBall .l .round .roundBox li').height());

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
		$('.ball .nowBall .l .h2 .b2').text(text);
	};

	// 滚动动画
	function animat(n,top,time){
		var ul = $('.ball .nowBall .l .round .roundBox ul');
		ul.eq(n).animate({'top':top},time,'easeOutCirc');
	};

	// 重置位置
	function resizeL(){
		var h = $('.ball .nowBall .l .round .roundBox li').height();
		var mH = -h * 10 * 6;
		var ul = $('.ball .nowBall .l .round .roundBox ul');
		var t0 = parseInt(ul.eq(0).css('top')),
			t1 = parseInt(ul.eq(1).css('top')),
			t2 = parseInt(ul.eq(2).css('top')),
			t3 = parseInt(ul.eq(3).css('top')),
			t4 = parseInt(ul.eq(4).css('top')),
			t5 = parseInt(ul.eq(5).css('top'));
		var T0 = t0 + mH,
			T1 = t1 + mH,
			T2 = t2 + mH,
			T3 = t3 + mH,
			T4 = t4 + mH,
			T5 = t5 + mH;
		ul.eq(0).css('top',T0);
		ul.eq(1).css('top',T1);
		ul.eq(2).css('top',T2);
		ul.eq(3).css('top',T3);
		ul.eq(4).css('top',T4);
		ul.eq(5).css('top',T5);
	};

	var setTimeO = 0;

	/*var ds = true;*/	/*控制滚球*/
	// 处理动画要的数据,并执行动画
	function round(codeString,time){	/*codeString：中奖码字符串*/
		var c = codeString;
		var n1 = Number(codeString[0]),
			n2 = Number(codeString[1]),
			n3 = Number(codeString[2]),
			n4 = Number(codeString[3]),
			n5 = Number(codeString[4]),
			n6 = Number(codeString[5]);

		var h = $('.ball .nowBall .l .round .roundBox li').height();
		var mH = -h * 10 * 6;
		var t0,t1,t2,t3,t4,t5;
		if (isFirst) {
			t0 = -(h * (9-n1)) + mH,
			t1 = -(h * (9-n2)) + mH,
			t2 = -(h * (9-n3)) + mH,
			t3 = -(h * (9-n4)) + mH,
			t4 = -(h * (9-n5)) + mH,
			t5 = -(h * (9-n6)) + mH;
		}else{
			t0 = -(h * (9-n1)),
			t1 = -(h * (9-n2)),
			t2 = -(h * (9-n3)),
			t3 = -(h * (9-n4)),
			t4 = -(h * (9-n5)),
			t5 = -(h * (9-n6));
		};

		// 时间随机数处理
		var time0 = time,
			time1 = time,
			time2 = time,
			time3 = time,
			time4 = time,
			time5 = time;

		if (isFirst) {
			animat(0,t0,time0);
			animat(1,t1,time1);
			animat(2,t2,time2);
			animat(3,t3,time3);
			animat(4,t4,time4);
			animat(5,t5,time5);
		}else{
			time0 = time0;
			time1 = time2 + 2500;
			time2 = time1 + 2500;
			time3 = time2 + 2500;
			time4 = time3 + 2500;
			time5 = time4 + 2500;

			setTimeO = time5 + 500;

			animat(0,t0,time0);
			animat(1,t1,time1);
			animat(2,t2,time2);
			animat(3,t3,time3);
			animat(4,t4,time4);
			animat(5,t5,time5);
		};
	};

	// 显示历史中奖号码
	function history(array){	/*参数：传入codeList*/
		var li = $('.lastBall .line>li');
		for (var i = 0; i < array.length; i++) {
			var oL = li.eq(i+1),
				data = array[i];
			oL.children('span').eq(1).text(data.num);
			oL.children('span').eq(0).text(data.time);

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
		    	$('.ball .nowBall .l .h2 div .b1').eq(0).text(da.codeList[0].num);

		        var t = da.surplusTime;	/*倒计时剩余时间*/

		        if (isFirst) {
		        	round(da.codeList[0].code,0);	/*动画*/
					history(da.codeList);
		        }else{
		        	$('.ball .nowBall .l .h2 div').show();
			        round(da.codeList[0].code,animateTime);	/*动画*/
			        // 延迟显示历史（动画完成后再显示）
			        setTimeout(function(){
			        	$('.ball .nowBall .l .h2 div').hide();
				        history(da.codeList);
				        resizeL();
			        },setTimeO);
		        };

		        // 定时器
				var inter = setInterval(function(){
					t--;
					sTime(t);
					if (t<=0) {
						isFirst = false;
						clearInterval(inter);
						getData();
					};
				},1000);

		    }
		});
	};
	getData();

	// 日期选择框
	if (sp) {
		var options = {dateInputNode:$("#date")};
		var instance = new BeatPicker(options)
	}else{
		$("#date").mobiscroll({
	        preset:'date',
	        theme: 'android-ics light',
	        lang: 'zh',
	        display: 'bottom',
	    });
	};

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
    				td1.text(list[i].time);
    				td2.text(list[i].num);
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

    // banner轮播图
	$("#scroller").simplyScroll({orientation:'vertical',customClass:'vert'});


})