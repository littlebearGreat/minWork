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

	// 日历
	$('.searchBar .time input').daterangepicker({
		applyClass : 'btn-sm btn-success',
		cancelClass : 'btn-sm btn-default',
		locale: {
			applyLabel: '确认',
			cancelLabel: '取消',
			fromLabel : '起始时间',
			toLabel : '结束时间',
			customRangeLabel : '自定义',
			firstDay : 1,
		},
		ranges : {
			'今日': [moment().startOf('day'), moment()],
			'昨日': [moment().subtract('days', 1).startOf('day'), moment().subtract('days', 1).endOf('day')],
			'最近7日': [moment().subtract('days', 6), moment()],
			'最近30日': [moment().subtract('days', 29), moment()],
			'本月': [moment().startOf("month"),moment().endOf("month")],
			'上个月': [moment().subtract(1,"month").startOf("month"),moment().subtract(1,"month").endOf("month")]
		},
		opens : 'left',
		separator : ' 至 ',
		showWeekNumbers : true,
		timePicker: true,
		timePickerIncrement : 1,
		timePicker12Hour : false,
		maxDate : moment(new Date()),
		format: 'YYYY-MM-DD HH:mm'
	}, function(start, end, label) {
		$('#beginTime').val(start.format('YYYY-MM-DD'));
		$('#endTime').val(end.format('YYYY-MM-DD'));
	})
	.next().on('click', function(){
		$(this).prev().focus();
	});

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

})