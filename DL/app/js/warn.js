// warn.js	告警
$(function(){
	$('.time div').click(function(){
		if ($(this).hasClass('active')) {
			$(this).removeClass('active').parent().siblings('.detail').slideUp();
		}else{
			$(this).addClass('active').parent().siblings('.detail').slideDown();
		};
	});
})