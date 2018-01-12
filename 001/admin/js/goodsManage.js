// goodsManage.js 商品管理
// 窗口大小改变监测
(function($, h, c) {  
    var a = $([]), e = $.resize = $.extend($.resize, {}), i, k = "setTimeout", j = "resize", d = j  
            + "-special-event", b = "delay", f = "throttleWindow";  
    e[b] = 350;  
    e[f] = true;  
    $.event.special[j] = {  
        setup : function() {  
            if (!e[f] && this[k]) {  
                return false  
            }  
            var l = $(this);  
            a = a.add(l);  
            $.data(this, d, {  
                w : l.width(),  
                h : l.height()  
            });  
            if (a.length === 1) {  
                g()  
            }  
        },  
        teardown : function() {  
            if (!e[f] && this[k]) {  
                return false  
            }  
            var l = $(this);  
            a = a.not(l);  
            l.removeData(d);  
            if (!a.length) {  
                clearTimeout(i)  
            }  
        },  
        add : function(l) {  
            if (!e[f] && this[k]) {  
                return false  
            }  
            var n;  
            function m(s, o, p) {  
                var q = $(this), r = $.data(this, d);  
                r.w = o !== c ? o : q.width();  
                r.h = p !== c ? p : q.height();  
                n.apply(this, arguments)  
            }  
            if ($.isFunction(l)) {  
                n = l;  
                return m  
            } else {  
                n = l.handler;  
                l.handler = m  
            }  
        }  
    };  
    function g() {  
        i = h[k](function() {  
            a.each(function() {  
                var n = $(this), m = n.width(), l = n.height(), o = $  
                        .data(this, d);  
                if (m !== o.w || l !== o.h) {  
                    n.trigger(j, [ o.w = m, o.h = l ])  
                }  
            });  
            g()  
        }, e[b])  
    }  
})(jQuery, this);
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

	// 单选框
	$('table .check').click(function(){
		$(this).addClass('active').parent().siblings().children('.check').removeClass('active');
	})

	// 产品banner图---------start
	// 添加 参数说明：clickDom - 点击的dom，这个不用配置，只需要配置src即可； src - 图片的地址
	function addBanner(clickDom,src){
		var li 	  = $('<li>'),
			img   = $('<img>'),
			span  = $('<span>');
		img.attr('src',src);
		li.append(img,span);
		li.insertBefore(clickDom);
	};

	$('.bannerPicOwn .add').click(function(){
		addBanner($(this),'images/bannerPicAdd1.png');
	})

	// 删除
	$('.bannerPicOwn ul').on('click','span',function(){
		$(this).parent().remove();
	})

	// 产品banner图---------end

	// 产品图
	$('.goodsPic .add').click(function(){
		addBanner($(this),'images/goodsPicAdd1.png');
	})

	$('.goodsPic ul').on('click','span',function(){
		$(this).parent().remove();
	})


	$('.body').height($('.contArea').height());
	$('.contArea').resize(function(){
		$('.body').height($(this).height());
		console.log($(this).height());
	})


})