// equip.js
$(function(){

	// 搜索按钮点击出现搜索框，再点击隐藏
	$('header .search').click(function(){
		var dom = $('section .search');
		if (dom.css('display') === 'none') {
			// dom.show();
			dom.slideDown(400);
			$('.list').animate({'margin-top':'2.2rem'},400);
		}else{
			dom.slideUp();
			$('.list').animate({'margin-top':'1rem'},400);
		}
	});

	// 在线、流量值、创建时间   切换
	$('section .filter div span').click(function(){
		$(this).addClass('active').siblings().removeClass('active');
	});

	// 点击设备图片进行跳转
	$('.list .pic').click(function(){
		window.location.href = 'equipDetail.html'
	});

	// 点击设备信息进行跳转
	$('.list .info').click(function(){
		window.location.href = 'equipDetail.html'
	});


	// 点击侧边栏按钮出现侧边栏
	$('.sideIcon').click(function(){
		$('.slide').addClass('sildeShow');
		$('.slideBack').show();
	});

	// 点击侧边栏里面的“确定”、“取消”隐藏侧边栏
	$('.slide .btn span').click(function(){
		$('.slide').removeClass('sildeShow');
		$('.slideBack').hide();
	});

	// 点击侧边栏遮罩隐藏侧边栏
	$('.slideBack').click(function(){
		$('.slide').removeClass('sildeShow');
		$(this).hide();
	});
})