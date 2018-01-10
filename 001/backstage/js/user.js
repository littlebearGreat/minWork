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

	/** 
	 * select模拟：
	 * clickClass:点击对象的class名称
	 * contClass:点击后要展现的内容的class名称
	 */
	function selectT(clickClass,contClass){

		var n = 0; /*定义n，来控制内容的展开与隐藏*/

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
			//'最近1小时': [moment().subtract('hours',1), moment()],
			'今日': [moment().startOf('day'), moment()],
			'昨日': [moment().subtract('days', 1).startOf('day'), moment().subtract('days', 1).endOf('day')],
			'最近7日': [moment().subtract('days', 6), moment()],
			'最近30日': [moment().subtract('days', 29), moment()],
			'本月': [moment().startOf("month"),moment().endOf("month")],
			'上个月': [moment().subtract(1,"month").startOf("month"),moment().subtract(1,"month").endOf("month")]
		},
		opens : 'left',	// 日期选择框的弹出位置(取值有：left/center/right)
		separator : ' 至 ',
		showWeekNumbers : true,		// 是否显示第几周


		// 是否显示时间（小时、分钟）
		timePicker: true,
		timePickerIncrement : 1,	// 时间的增量，单位为分钟
		timePicker12Hour : false,	// 是否使用12小时制来显示时间


		maxDate : moment(new Date()),	// 允许选择的最大日期(这里我设置的是不能选择未来日期)
		format: 'YYYY-MM-DD HH:mm'		/*日期格式*/

	}, function(start, end, label) { // 格式化日期显示框
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