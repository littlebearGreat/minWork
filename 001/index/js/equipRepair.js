// equipRepair.js 设备维修
$(function(){

	// banner
	function turnPic(imagesTag,signTag,previousTag,nextTag,boxTag,signHoverClass){
		// 定义当前显示的图片的序号
		var picI;
		// 初始化轮播图
		function init(){
			$(imagesTag).eq(0).show();
			$(signTag).eq(0).addClass(signHoverClass);
			picI = 0;
		};
		init();

		// 点击指示器切换
		$(signTag).click(function(){
			var n = $(this).index();
			picI = n;
			$(imagesTag).eq(n).fadeIn().siblings().fadeOut();
			$(this).addClass(signHoverClass).siblings().removeClass(signHoverClass);
		})

		// 点击左边按钮切换
		function previous(){
			if (picI == 0) {
				picI = $(signTag).length - 1;
			}else{
				picI --;
			};

			$(imagesTag).eq(picI).fadeIn().siblings().fadeOut();
			$(signTag).eq(picI).addClass(signHoverClass).siblings().removeClass(signHoverClass);
		};

		$(previousTag).click(function(){
			previous();
		});

		// 点击右边按钮切换
		function next(){
			if (picI == $(signTag).length - 1) {
				picI = 0;
			}else{
				picI ++;
			};

			$(imagesTag).eq(picI).fadeIn().siblings().fadeOut();
			$(signTag).eq(picI).addClass(signHoverClass).siblings().removeClass(signHoverClass);
		};

		$(nextTag).click(function(){
			next();
		});

		// 自动切换
		var bannerIv = setInterval(next,3000);
		$(boxTag).hover(function(){
			clearInterval(bannerIv);
		},function(){
			bannerIv = setInterval(next,3000);
		});

	};

	turnPic('.images li','.sign li','.banner .previous','.banner .next','.banner','active');

	// 页码点击
	$('.page .sm').click(function(){
		$(this).addClass('active').siblings('.sm').removeClass('active');
	})

})