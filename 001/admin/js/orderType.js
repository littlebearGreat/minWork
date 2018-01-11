// orderType.js 商品分类管理
$(function(){

	// 下拉框
	function selectT(clickClass,contClass){

		var n = 0;

		$(clickClass).click(function(){
			$(contClass).slideDown(200);
		});

		function nOn(){
			n = 1;
		};

		function nOff(){
			n = 0;
			setTimeout(function(){
				if(n == 0){
					$(contClass).slideUp(200);
				};
			},300);
		};

		$(clickClass).hover(
			function(){nOn()},
			function(){nOff()}
		);

		$(contClass).hover(
			function(){nOn()},
			function(){nOff()}
		);

		// 如果是select，下面是文字替换，点击后消失，注意选择器
		$(contClass).children().click(function(){
			$(clickClass).children('p').text($(this).text());
			$(contClass).hide();
		});
	};

	selectT('.searchBar .type div','.searchBar .type ul');
	selectT('.searchBar .goodsName div','.searchBar .goodsName ul');

	// 搜索
	$('.searchBar .search').click(function(){
		var k = $('.searchBar .keyword').val(),
			t = $('.searchBar .type p').text(),
			g = $('.searchBar .goodsName p').text(),
			s = $('.searchBar .time input').val();

		if (t == '请选择') {
			t = '';
		};

		if (g == '请选择') {
			g == '';
		};

		var result  = '搜索信息是：' + '\n'
					+ '关键字：' + k + '\n'
					+ '类别：' + t + '\n'
					+ '产品名称：' + g + '\n'
					+ '下单时间：' + s;
		
		alert(result);
	})

	// 重置
	$('.searchBar .resize').click(function(){
		$('.searchBar .keyword').val(''),
		$('.searchBar .type p').text('请选择'),
		$('.searchBar .goodsName p').text('请选择'),
		$('.searchBar .time input').val('');
	})

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

	// 页码点击
	$('.page .sm').click(function(){
		$(this).addClass('active').siblings('.sm').removeClass('active');
	})

})