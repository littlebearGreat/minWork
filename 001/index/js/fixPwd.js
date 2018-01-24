$(function(){
	//发送验证码
	$("#sendCodePwd").click(function(){ //启用定时器
		var code = new timerFun("#sendCodePwd");// 创建定时器对象 ,设置定时器显示位置
		code.startFun();//启用定时器
	})
})
//校验输入的密码
function checkPwd(obj){ //校验输入的密码是否一直
	var _this = $(obj);
	var pwd = _this.val().trim(); //获取密码输入内容
	var pwdForm = !(/^([A-Z]|[a-z]|[0-9]){6,16}$/.test(pwd));//校验密码是否为字母和数字组成
	var txt = _this.parent().find("label").text().trim();
	if(pwd == ""){
		_this.parent().find(".pwd-pro").addClass("error2").text(txt+"不能为空").show();
		return false;
	}else if(pwd == undefined || pwd == null || pwdForm){
		_this.parent().find(".pwd-pro").addClass("error2").text(txt+"格式错误").show();
		return false;
	}else{
		_this.parent().find(".pwd-pro").removeClass("error2").text("").hide()
	}
	
	var firstPwd = $("#first-pwd").val(); //获取第一次输入密码
	var secondPwd =  $("#second-pwd").val(); //获取第一次输入密码
	var secondId = $("#second-pwd");//
	if(firstPwd != secondPwd && secondPwd != "" && firstPwd != ""){
		$("#second-pwd").parent().find(".pwd-pro").addClass("error2").text("两次密码不一致").show();
	}else{
		$("#second-pwd").parent().find(".pwd-pro").removeClass("error2").text("").hide();
	}
}

//校验手机号码
function checkMobile(objId){ 
	var _this = $("#"+objId);
 	var mobile = _this.val().trim();//获取输入手机号码
 	var txt = _this.parent().find("label").text().trim();
 	if(mobile == ""){
 		_this.parent().find(".pwd-pro").removeClass("tick2").addClass("error2").text(txt+"不能为空").show()
 	}else if(!(/^1[3|4|5|7|8][0-9]\d{8}$/.test(mobile))){ 
  		_this.parent().find(".pwd-pro").removeClass("tick2").addClass("error2").text(txt+"格式错误").show()
 	}else if((/^1[3|4|5|7|8][0-9]\d{8}$/.test(mobile))){
 		_this.parent().find(".pwd-pro").removeClass("error2").addClass("tick2").text("").show();
 	}
} 

//验证码校验
function checkInpCode(obj){
	var _this = $(obj);
	var code = _this.val().trim();//获取输入手机号码
	var txt = _this.parent().find("label").text().trim();
	if(code == ""){
		_this.parent().find(".pwd-pro").addClass("error2").text(txt+"不能为空").show()
	}else{
		_this.parent().find(".pwd-pro").removeClass("error2").text("").hide();
	}
	
}
//忘记密码表单提交校验
function fixPwdCheck(){
	var result = true;
	$("#fixPwd .pwd-li").each(function(){
		var _this = $(this);
		var txt = _this.find(".input").val().trim();
		var errorpro = _this.find(".pwd-pro").hasClass("error2");
		var firstPwd = $("#first-pwd").val(); //获取第一次输入密码
		var secondPwd =  $("#second-pwd").val(); //获取第一次输入密码
		if(txt == "" ){
			var pro = _this.find("label").text().trim()+"不能为空!"
			_this.find(".pwd-pro").addClass("error2").text(pro).show(); //错误内容提示
			result = false;
			return false;
		}else if(firstPwd != secondPwd && secondPwd != "" && firstPwd != ""){
			var pro = "两次密码不一致!"
			$("#second-pwd").parent().find(".pwd-pro").addClass("error2").text(pro).show(); //错误内容提示
			result = false;
			return false;
			
		}else if(txt == undefined || txt == null || errorpro){
			var pro = _this.find("label").text().trim()+"格式错误!"
			_this.find(".pwd-pro").addClass("error2").text(pro).show(); //错误内容提示
			result = false;
			return false;
		}
	})
	if(result){
		alert("修改密码成功")
	}
	return result;
}

/*定时器*/
var timerFun = function(obj){
	var timer; //设置定时器变量
	var times = 60; //定时器时间，默认从0开始
	//调用定时器
	this.startFun = function(){
		$(obj).attr("disabled", true); //设置按钮不可用
		timerStart();
	}
	//停止定时器
	this.stopFun = function(){
		timerEnd();
	}
	//开始定时器
	var timerStart = function(){
		times--; //时间自动加1;
		if(times>0){
			$(obj).val(times+"秒后重新发送");//修改定时器显示内容
			timer = setTimeout(function(){
				timerStart();//执行开始定时器方法
			},1000);
		}else{
			timerEnd();
			$(obj).attr("disabled", false); //设置按钮可用
			$(obj).val("重新发送验证码");//修改定时器显示内容
		}
	}
	
	//结束定时器
	var timerEnd= function(){
		clearTimeout(timer); //清除定时器
		
	}
}