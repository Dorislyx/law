
window.regin=(function(){
	var server = '',
		htm='',
		str="",
		_code = 60,
		timer=0,
		params = {};	
	//调用发送验证码接口
	$('#getcode').click(function(){
			getcheckcode();		//点击获取验证码按钮时调用发送验证码接口
	});
	//发送验证码接口
	function getcheckcode(){
			var _mobile=$('#mobile').val();	//获取页面手机号input文本的值
			var re=/^1\d{10}$/;
			/*
			 对输入的文本值要做非空判断
			 手机号，邮箱，身份证等要做正则验证
			*/
			if(_mobile==''){
				getajax.showmsg('手机号不能为空');
			}else if(!re.test(_mobile)){
				getajax.showmsg('手机号格式不正确');
			}else{
				if(timer){			//判断如果倒计时正在进行点击按钮无效
						return false;
					}
				server='user/sendcode';		//接口地址非公共部分
				params = {					//请求所需要携带的参数
					 'u_tel':_mobile
				};
				getajax.postAction(server,params,function(res){
					console.log('获取验证码',res);
					if(res['code']=='1000'){
						timer=setInterval(countimecode, 1000);		//发送验证码接口请求成功时，倒计时开始
						getajax.showmsg(res['message']);			//请求成功时弹出对应的message
						
					}else{
						getajax.showmsg(res['message']);		//请求不成功时弹出对应的message
					}
				},function(error){});//请求失败的函数
			}
	};
	//倒计时
	function countimecode() {
		if (_code < 61 && _code >= 1) {
			_code -= 1;
			$("#getcode").text('' + _code + '秒');
			if (_code == 0) {
				$("#getcode").text('重新获取');
				clearInterval(timer);
				timer=0;
				_code = 60;
				//倒计时结束后还可以再次点击，获取验证码
				$('#getcode').click(function(){
					getcheckcode();
				});
			}
		}
	}
	
	//注册接口
	$('.find_btn').click(function(){
		var _mobile=$('#mobile').val();			//获取页面手机号input文本的值
		var _code=$('#code').val();				//获取页面验证码input文本的值
		var _password=$('#password').val();		//获取页面密码input文本的值
		var _password1=$('#password1').val();	//获取页面再次输入密码input文本的值
		var re=/^1\d{10}$/;
		if(_mobile==''){
			getajax.showmsg('手机号不能为空');
		}else if(_code==''){
			getajax.showmsg('验证码不能为空');
		}else if(_password==''){
			getajax.showmsg('密码不能为空');
		}else if(_password1==''){
			getajax.showmsg('确认密码不能为空');
		}else if(_password1!=_password){	//判断两次输入的密码是否一致
			getajax.showmsg('确认密码与密码不一致');
		}else if(!re.test(_mobile)){		//正则验证手机号
			getajax.showmsg('请输入正确的手机号');
		}else{
				server='User/register';	//接口地址非公共部分
				params = {					//请求所需要携带的参数
					 'u_tel':_mobile,
					 'u_pwd':_password,
					 'otherpwd':_password1,
					 'code':_code
				};
				getajax.postAction(server,params,function(res){
					console.log('注册',res);
					if(res['code']=='1000'){
						getajax.showmsg('注册成功');
						/*注册成功跳转到登录页面*/
						setTimeout(function() {
							window.location.href='login.html'
						}, 500);
					}else{
						/*注册不成功时弹出不成功的消息提示*/
						getajax.showmsg(res['message']);
					}
				},function(error){});//请求失败的函数
				}
		});

	function start(){
		
	}
	return{
		start:start
	};
})();
window.regin.start();
