
window.newsdetail=(function(){
	var server = '',
		oid=getajax.getQueryString('id'),
		_n=getajax.getsessionStorage('newtype'),
		_newheader=getajax.getsessionStorage('newheader'),
		params = {};
		//获取详情
		function detail(){
			if(_n==1){
				server='Index/newinfo';
				
			}else{
				server='Index/newinfo2';
			}
			params = {
				'id':oid
			};
			getajax.postAction(server,params,function(res){
				console.log('详情',res);
				if(res['code']=='1000'){
					var _data=res['data'];
					$('header>.center').text(_newheader);
					$('.newtitle').text(_data['title'])
					$('#mew_pic').attr('src',getajax.http+_data['picture']);
					$('.detail').empty().append(_data['content']);
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
		myScroll = new iScroll('iScrollnewsdetail', {
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
		detail();
	}
	return{
		start:start
	};
})();
window.newsdetail.start();
