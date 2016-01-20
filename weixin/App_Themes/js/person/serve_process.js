
window.serve_process=(function(){
	var server = '',
	htm='',
		params = {};	

	//获取金币
	function gettexts(){
		server = 'Index/serviceonline';		
		params = {
			'type':'4'
			
		};
		getajax.postAction(server,params,function(res){
				console.log('服务流程',res);
				
				if(res['code']==='1000'){	
					var data=res['data'];
						htm='';
					$(data).each(function(k,v){
						htm+=v['content'];
					});
					$('.texts').empty().append(htm);
					
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
		myScroll = new iScroll('iScrollserve_process', {
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
		gettexts();
	}
	return{
		start:start
	};
})();
window.serve_process.start();
