
window.login=(function(){
	var server = '',
		htm='',
		params = {};	
	
	//手机快速注册
	$('.find-back>span:first').click(function(){
		window.location.href='regin.html';
	});
	//找回密码
	$('.find-back>span:last').click(function(){
		window.location.href='findpwd.html';
	});
	//登录接口
	$('.login-btn').click(function(){
		var _mobile=$('#mobile').val();		//获取页面手机号input文本的值
		var _password=$('#password').val();	//获取页面密码input文本的值
		var re=/^1\d{10}$/;
		/*
			 对输入的文本值要做非空判断
			 手机号，邮箱，身份证等要做正则验证
			*/
		if(_mobile==''||_password==''){     //也可以像注册页面那样一个一个的判断
			getajax.showmsg('手机号或密码不能为空');
		}else if(!re.test(_mobile)){		//正则验证手机号
			getajax.showmsg('请输入正确的手机号');
		}else{
			server='User/userlogin';	//接口地址非公共部分
			params = {					//请求所需要携带的参数
				 'u_tel':_mobile,
				 'u_pwd':_password
			};
			getajax.postAction(server,params,function(res){
				console.log('登录',res);
				if(res['code']==='1000'){
					var _key=res['data']['token'];	//登录成功后要获取一下用来区分用户的token存在本地（下见）,其他接口会作为参数用到，用时在本地存储里取一下就行
					var mobile=res['data']['usertel'];	
					/*localStorage['mobile']=_mobile;
					localStorage['password']=_password;*/
					
					getajax.setsessionStorage('_key', _key);		//在本地存储一下用来区分用户的token
					getajax.setsessionStorage('userdata', res['data']);//在本地存储一下用户信息userdata，可能会用到
					getajax.setsessionStorage('mobile', mobile);//将用户手机号存在本地存储里
					getajax.showmsg(res['message']);
					/*登录成功后跳转到指定页面*/
					setTimeout(function(){
						window.location.href='../login/myindex.html';
					},500);
				}else{
					/*登录不成功弹出 原因消息提示*/
					getajax.showmsg(res['message']);
				}
				
			},function(error){});
				
		}
	});
	function start(){
		var _mobile=getajax.getsessionStorage('mobile');//在本地存储里获取用户手机号
		if(_mobile){	//如果_mobile存在就把手机号展示在出来，不用再次输入了
			$('#mobile').val(_mobile);
		}
	}
	return{
		start:start
	};
})();
window.login.start();
