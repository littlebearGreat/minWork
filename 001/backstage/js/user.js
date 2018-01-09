// user.js
$(function(){
	// 给订单列表的每一列添加class
	(function(){
		var tags = $('.contArea .list tbody tr');
		for (var i = 0; i < tags.length; i++) {
			console.log(1%2)
			if (i%2 == 1) {
				tags.eq(i).addClass('even');
			}else{
				tags.eq(i).addClass('odd');
			}
		};
	})();

})