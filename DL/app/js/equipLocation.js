// location.js	设备位置
$(function(){
	// 百度地图API功能

	// 创建Map实例
	var map = new BMap.Map("allmap");    

	// 初始化地图,设置中心点坐标和地图级别
	map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  
	
	//添加地图类型控件
	map.addControl(new BMap.MapTypeControl({
		mapTypes:[
            BMAP_NORMAL_MAP,
            BMAP_HYBRID_MAP
        ]}));	  
	
	// 设置地图显示的城市 此项是必须设置的
	map.setCurrentCity("北京"); 

	//开启鼠标滚轮缩放         
	map.enableScrollWheelZoom(true);   



	// 页面操作

	// 自动手动切换
	$('.setBar span') .click(function(){
		$(this).addClass('active').parent().siblings().children('span').removeClass('active');
	});

	// 点击“设置”，显示设置栏
	$('.set').click(function(){
		if ($('.setBar').css('display') === 'none') {
			$('.setBar').show();
			$('.setBarBack').show();
		}else{
			$('.setBar').hide();
			$('.setBarBack').hide();
		};
	});

	// 点击弹窗遮罩隐藏设置栏
	$('.setBarBack').click(function(){
		$(this).hide();
		$('.setBar').hide();
	});
})