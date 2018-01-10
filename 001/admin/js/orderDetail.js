// orderDetail.js 订单详情js
$(function(){
	// 侧边栏点击展开子菜单
	$('.sideBar .hasChildren1').click(function(){
		if ($(this).siblings('.children1').is(":hidden")) {
			$(this).siblings('.children1').show();
			$(this).addClass('noBottom');
		}else{
			$(this).siblings('.children1').hide();
			$(this).removeClass('noBottom');
		}
	})
})