window.lawask_pic=(function(){
	var server = '',
		htm='',
		strid='',
		_classid=getajax.getsessionStorage('classid');
		n=112,
		params = {};	
	$('.info_tab>li').click(function(){
		$(this).addClass('this').siblings().removeClass('this');
		n=parseInt($(this).attr('name'));	
		
	});
	
	//法律咨询接口
	$('.find_btn').click(function(){
		var _classidtext=$('.select').text();
		var con=$('#askcon').val();
		var phonenum=$('.my_tel>input').val();
		var re=/^1\d{10}$/;
		$('#photo img').each(function(k,v){
			var serveid=$(this).attr('serverId');
			if(serveid){
				strid+=','+serveid;
			}
		});
		
		if(_classidtext==='选择分类(法律问题)'){
			getajax.showmsg('请选择分类');
		}else if(con==''){
			getajax.showmsg('请输入您所咨询的问题');
		}else if(phonenum==''){
			getajax.showmsg('手机号码不能为空');
		}else if(!re.test(phonenum)){
			getajax.showmsg('请输入正确的手机号');
		}else{
			server='index/normal';
			var _key=getajax.getsessionStorage('_key');
			params = {
				 'u_id':_key,
				 'type':n,
				 'content':con,
				 'classid':_classid,
				 'idlist':strid,
				 'usertel':phonenum
			};
			getajax.postAction(server,params,function(res){
				console.log('法律咨询',res);
				if(res['code']==='1000'){
					setTimeout(function(){
						window.location.href='law_detail.html';
					},500);
				}else{
					getajax.showmsg(res['message']);
				}
			},function(error){});
		}
	})
	
	
	var IstotalPage = false;
	var myScroll,
		pullDownEl, pullDownOffset,
		pullUpEl, pullUpOffset,
		generatedCount = 0;
	var bInitScorll = 0; //iscroll是否被初始化 0：未，1：有


	function loaded(index) {
		myScroll = new iScroll('iScrolllawask_pic', {
			useTransition: true,
			vScrollbar: false,
			checkDOMChanges: true,
			topOffset: pullDownOffset,
			onRefresh: function() {},
			onScrollMove: function() {},
			onScrollEnd: function() {}
		});
	}
	var loadScroll = null;
	var loadScrollRefresh = null;

	function reScroll(index) {
		if (bInitScorll === 0) {
			loadScroll = setTimeout(function() {
				loaded(index);
				bInitScorll = 1;
			}, 300)
		} else {
			loadScrollRefresh = setTimeout(function() {
				myScroll.refresh();
			}, 300);
		}
	}


		
	function start(){
		var _key=getajax.getsessionStorage('_key');
		if(!_key){
			getajax.showmsg('请先登录');
			setTimeout(function(){
				window.location.href='../login/login.html';
			},2000);
			
		}
		bInitScorll = 0;
		reScroll();
		var _text=getajax.getsessionStorage('classifytext');
		if(_text){
			$('.select').text(_text);
		}
		
	}
	return {
		start:start
	};
})();
window.lawask_pic.start();
