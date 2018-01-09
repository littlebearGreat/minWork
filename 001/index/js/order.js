// order.js  一键下单页js

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

	// 顶部导航
	function topNav(clickClass,targetClass){
		$(clickClass).click(function(){
			var a = $(targetClass).offset().top - 80;
			// 兼容IE
			$('html').animate({scrollTop:a},600);

			// 兼容非IE
			$('body').animate({scrollTop:a},600);
			// $(this).addClass('active').siblings('a').removeClass('active');
		})
	};
	topNav('.navRepair','.repair');
	topNav('.navNewBuy','.newBuy');
	topNav('.navSoftwareBuy','.softwareBuy');

	$(window).scroll(function(){
		var a = $('.repair').offset().top - 80,
			b = $('.newBuy').offset().top - 80,
			c = $('.softwareBuy').offset().top - 80,
			x = $(this).scrollTop();  
	    var atBottom = $(document).height() - $(window).height() - 80;
		if (x>=a && x<b) {
			$('.navRepair').addClass('active').siblings('a').removeClass('active');
		}else if(x>=b && x<c && x<atBottom){
			$('.navNewBuy').addClass('active').siblings('a').removeClass('active');
		}else if(x>=c || x>atBottom){
			$('.navSoftwareBuy').addClass('active').siblings('a').removeClass('active');
		}else{
			$('.navRepair').removeClass('active').siblings('a').removeClass('active');
		}
	})

	// 新机购买点击高亮
	$('.newBuy .navT .pc').click(function(){
		$(this).addClass('active').siblings().removeClass('active');
	})

})