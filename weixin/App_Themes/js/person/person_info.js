
window.person_info=(function(){
	var server = '',
		htm='',
		city_id='',
		sex='';
		params = {};	

	$('.sex>a').click(function(){
		$(this).addClass('cur').siblings().removeClass('cur');
	});

	
	

	//获取城市接口
	function getcity(){
		server='User/allcity';
		getajax.postAction(server,params,function(res){
			console.log('获取城市',res);
			if(res['code']==='1000'){
				var citylst=res['data'];
				getajax.setsessionStorage('citylst',citylst);
				$(citylst).each(function(k,v){
					htm+='<option value ="'+v['cityid']+'">'+v['cityname']+'</option>';
				});
				$('#selectcity').empty().append(htm);
				$('#selectcity').change(function(){
					city_id=this[this.selectedIndex].getAttribute("value");
					console.log(city_id)
				});
				getuserinfo();
			}else{
				getajax.showmsg(res['message']);
			}
			},function(error){});
		
	}
		$('.right').click(function(){
			person_info();
		});
	
	//修改个人信息
	function person_info(){
		var _username=$('#username').val();
		var _sex=$('.cur').text();
		var _age=$('#age').val();
		var _cityname=$('#cityname').val();
		var _email=$('#email').val();
		var _idcardnum=$('#idcardnum').val();
		//var re=/^1\d{10}$/;
		var re1=/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
		var re=/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;
		console.log(_sex)
		if(_sex=='男'){
			sex='114';
		} 
		if(_sex=='女'){
			sex='115';
		}
		if(!re.test(_idcardnum)){
			getajax.showmsg('请输入正确的身份证号');
		}else if(!re1.test(_email)){
			getajax.showmsg('请输入正确的邮箱');
		}else{
			var _key=getajax.getsessionStorage('_key');
			server='User/myupdate';
			console.log(city_id)
			params = {
				'u_id':_key,
				'u_name':_username,
				'u_sex':sex,
				'u_age':_age,
				'u_city':_cityname,
				'u_email':_email,
				'shenfenz':_idcardnum
			};
			getajax.postAction(server,params,function(res){
				console.log('修改个人信息',res);
				if(res['code']==='1000'){
					var data=res['data'];
					getajax.setsessionStorage('userdata',data);
					getuserinfo();
					getajax.showmsg(res['message']);
					setTimeout(function(){
						history.back();
					},500);
						
				}else{
					getajax.showmsg(res['message']);
				}
			
			},function(error){});
		}
		
	}
	//获取用户信息
	function getuserinfo(){
		var _data=getajax.getsessionStorage('userdata');
		if(_data){
			$('#username').val(_data['username']);
			if(_data['usersex']=='114'){
				$('.myinfo>li:nth-child(2)>.sex>a').eq(0).addClass('cur').siblings().removeClass('cur');
			}else{
				$('.myinfo>li:nth-child(2)>.sex>a').eq(1).addClass('cur').siblings().removeClass('cur');
			}
			$('#age').val(_data['userage']);
			$('#cityname').val(_data['cityname']);
			$('#email').val(_data['useremail']);
			$('#idcardnum').val(_data['shenfenz']);
		}
	}
	function start(){
		getuserinfo();
		//getcity();
	}
	return{
		start:start
	};
})();
window.person_info.start();
