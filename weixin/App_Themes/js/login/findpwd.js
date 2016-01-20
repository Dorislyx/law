
window.findpwd=(function(){
	var server = '',
		params = {};	
	//获取验证码
	$('#getcode').click(function(){
		var _mobile=$('#mobile').val();
		var re=/^1\d{10}$/;
		if(_mobile==''){
			getajax.showmsg('手机号不能为空');
		}else if(!re.test(_mobile)){
			getajax.showmsg('手机号格式不正确');
		}else{
			server='user/sendcode';
			params = {
				 'u_tel':_mobile
			};
			getajax.postAction(server,params,function(res){
				console.log('获取验证码',res);
				if(res['code']=='1000'){
					getajax.showmsg(res['message']);
					console.log('验证码发送成功');
				}else{
					getajax.showmsg(res['message']);
				}
			},function(error){});
		}
	});
	
	$('.find_btn').click(function(){
		var _mobile=$('#mobile').val();
		var _code=$('#code').val();
		var _newpwd=$('#newpwd').val();
		var _newpwd1=$('#newpwd1').val();
		console.log(_mobile);
		console.log(_newpwd);
		console.log(_newpwd1);
		var re=/^1\d{10}$/;
		if(_mobile==''){
			getajax.showmsg('手机号不能为空');
		}else if(_code==''){
			getajax.showmsg('验证码不能为空');
		}else if(_newpwd==''){
			getajax.showmsg('密码不能为空');
		}else if(_newpwd1==''){
			getajax.showmsg('确认密码不能为空');
		}else if(_newpwd1!=_newpwd){
			getajax.showmsg('确认密码与密码不一致');
		}else if(!re.test(_mobile)){
			getajax.showmsg('请输入正确的手机号');
		}else{
				server='User/findpwd';
				params = {
					 'u_tel':_mobile,
					 'u_pwd':_newpwd,
					 'otherpwd':_newpwd1,
					 'code':_code
				};
				getajax.postAction(server,params,function(res){
					console.log('修改密码',res);
					if(res['code']==='1000'){
						getajax.showmsg('修改成功');
						console.log('注册成功');
					}else{
						getajax.showmsg(res['message']);
					}
					
				},function(error){});
				
		}
	});	
	
	
	function start(){
		
	}
	return{
		start:start
	};
})();
window.findpwd.start();
