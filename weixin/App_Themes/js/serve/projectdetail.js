
window.projectdetail=(function(){
	var server = '',
		htm='',
		oid=getajax.getQueryString('id');
		params = {};	
		$('.apply_btn').click(function(){
			window.location.href='apply.html';
		});
		function projectdetail(){
			server='index/rserviceinfo/id/1';
			params = {
				'id':oid
			};
			getajax.postAction(server,params,function(res){
			console.log('维权服务详情',res);
			if(res['code']==='1000'){
				var _data=res['data'];
			}
			$('#project_pic').attr('src',getajax.http+_data['picture']);
			$('.text>p').eq(0).text(_data['title']);
			$('.text>p').eq(1).text(_data['content']);
			},function(error){});
	}

	$('.apply_btn').click(function(){
		window.location.href='apply.html?id='+oid;
	});

		var IstotalPage = false;
	var myScroll,
		pullDownEl, pullDownOffset,
		pullUpEl, pullUpOffset,
		generatedCount = 0;
	var bInitScorll = 0; //iscroll是否被初始化 0：未，1：有


	function loaded(index) {
		myScroll = new iScroll('iScrollprojectdetail', {
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
		projectdetail();
	}
	return{
		start:start
	};
})();
window.projectdetail.start();
