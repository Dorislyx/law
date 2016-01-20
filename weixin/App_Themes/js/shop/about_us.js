
window.about_us=(function(){
	var server = '',
		htm='',
		params = {};	
		//获取关于我们
		function getabout_us(){
			server='user/aboutus';
			getajax.postAction(server,params,function(res){
				console.log('关于我们',res);
				if(res['code']==='1000'){
					var data=res['data'];
					$('.text').empty().append(data['content']);
				}else{
					getajax.showmsg(res['message']);
				}
			},function(error){});
		}
	var IstotalPage = false;
	var myScroll,
		pullDownEl, pullDownOffset,
		pullUpEl, pullUpOffset,
		generatedCount = 0;
	var bInitScorll = 0; //iscroll是否被初始化 0：未，1：有


	function loaded(index) {
		myScroll = new iScroll('iScrollaboutus', {
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
		bInitScorll = 0;
		reScroll();
		getabout_us();
		
	}
	return{
		start:start
	};
})();
window.about_us.start();
