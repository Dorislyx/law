
window.mygold=(function(){
	var server = '',
		n=1,
		params = {};	
	$('.tab>li').click(function(){
		$(this).addClass('this').siblings().removeClass('this');
		n=$(this).attr('name');
		getgold();
	})

	//获取金币
	function getgold(){
		server = 'user/gold';
		var _key=getajax.getsessionStorage('_key');
		params = {
			'u_id':_key
		};
		getajax.postAction(server,params,function(res){
				console.log('获取金币方式',res);
				if(res['code']==='1000'){
					var data=res['data'];
					if(n==1){
						$('#goldtext>p').empty().append(data['huodefangshi']);
					}else{
						$('#goldtext>p').empty().append(data['shuoming']);
					}
					$('#mygold').text(data['number']);
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
		myScroll = new iScroll('iScrollmygold', {
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
		getgold();
	}
	return{
		start:start
	};
})();
window.mygold.start();
