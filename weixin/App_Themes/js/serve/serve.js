
window.serve=(function(){
	var server = '',
		htm='',
		params = {};	
		//获取维权服务文字介绍
		function lawtext(){
			server='Index/weiqinfo';
			getajax.postAction(server,params,function(res){
			console.log('获取法律咨询文字介绍',res);
			htn='';
			if(res['code']==='1000'){
				var _data=res['data'];
				$(_data).each(function(k,v){
					htn+=v['content'];
				});
				$('.flzxtext').empty().append(htn);
			}else{
				getajax.showmsg(res['message']);
			}
			
			},function(error){});
		};
		
		//获取维权服务接口
		function serve(){
			server='index/weiqclass';
			getajax.postAction(server,params,function(res){
				if(res['code']==='1000'){
					var lst=res['data'];
					htm='',
					$(lst).each(function(k,v){
						htm += '<li ids="'+v['id']+'">';
						htm += '<div><img src="'+getajax.http+v['picture']+'" alt="" /></div>';
						htm += '<div class="info">';
						htm += '<p>'+v['title']+'</p>';
						htm += '<p>'+v['content']+'</p>';
						htm += '</div>';
						htm += '<div class="rights">申请维权</div>';
						htm += '</li>';
					});
					$('.project_lst').empty().append(htm);
										
					$('.project_lst>li').click(function(){
						var oid=$(this).attr('ids');
						window.location.href='projectdetail.html?id='+oid;
					});
					$('.rights').click(function(e){
						e.stopPropagation();
						var oid=$(this).parent().attr('ids');
						window.location.href='apply.html?id='+oid;
					});
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
		myScroll = new iScroll('iScrollserve', {
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
			},15000);
		}
		bInitScorll = 0;
		reScroll();
		lawtext();
		serve();
	}
	return{
		start:start
	};
})();
window.serve.start();
