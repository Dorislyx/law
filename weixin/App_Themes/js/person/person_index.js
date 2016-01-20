
window.person_index=(function(){
	var server = '',
		htm='',
		params = {};	
	$('.update').click(function() {
		$('.bighide').fadeIn(200);
	});
	
	$('.blackhide').click(function() {
		$('.bighide').fadeOut(200);
	});
	
	$('.blackshow_two').click(function() {
		$('.bighide').fadeOut(200);
	});
	//维权服务
	$('.case').click(function(){
		window.location.href='../lawask/myapply.html'
	});
	//法律咨询
	$('.ask').click(function(){
		window.location.href='../lawask/law_detail.html'
	});
	//获取用户信息
	function userinfo(){
		var _userdata=getajax.getsessionStorage('userdata');
		console.log(_userdata)
		if(_userdata){
			if(_userdata['usersex']=='115'){
				$('#sexicon').css('background-image','url(../App_Themes/img/sex_girl.png)');
			}else{
				$('#sexicon').css('background-image','url(../App_Themes/img/sex_boy.png)');
			}
			
			$('#username').text(_userdata['username']);
			$('#userage').text(_userdata['userage']+'岁');
			$('#userphone').text(_userdata['usertel']);
		}
	}
	//退出程序
	$('.exit_btn').click(function(){
		getajax.removesessionStorage('_key');
		getajax.removesessionStorage('mobile');
		getajax.removesessionStorage();
		window.location.href='../login/login.html';
	});
	
	var IstotalPage = false;
	var myScroll,
		pullDownEl, pullDownOffset,
		pullUpEl, pullUpOffset,
		generatedCount = 0;
	var bInitScorll = 0; //iscroll是否被初始化 0：未，1：有


	function loaded(index) {
		myScroll = new iScroll('iScrollperson_index', {
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
		userinfo();
	}
	return{
		start:start
	};
})();
window.person_index.start();
