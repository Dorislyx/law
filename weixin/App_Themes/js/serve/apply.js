
window.apply=(function(){
	var server = '',
		strid='',
		params = {};
	//申请维权接口
	$('.find_btn').click(function(){
		var con=$('#askcon').val();
		$('#photo img').each(function(k,v){
			var serveid=$(this).attr('serverId');
			if(serveid){
				strid+=','+serveid;
			}
		});
		if(con==''){
			getajax.showmsg('请输入您所咨询的问题');
		}else{
			server='Index/applyservice';
			var _key=getajax.getsessionStorage('_key');
			var oid=getajax.getQueryString('id');
			params = {
				 'u_id':_key,
				 'content':con,
				 'classid':oid,
				 'idlist':strid
				 //'file':,
			};
			getajax.postAction(server,params,function(res){
				console.log('申请维权',res);
				if(res['code']==='1000'){
					getajax.showmsg('申请成功');
					window.location.href='../lawask/myapply.html';
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
		myScroll = new iScroll('iScrollapply', {
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
		
	}
	return{
		start:start
	};
})();
window.apply.start();
