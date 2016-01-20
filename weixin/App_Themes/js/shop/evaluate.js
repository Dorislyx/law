
window.evaluate=(function(){
	var server='',
		params={},
		eval_score='',
		eval_num=136,
		oid=getajax.getQueryString('id');
	 	$('.grade>li').click(function(){
			$(this).addClass('cur').siblings().removeClass('cur');
			eval_num=parseInt($(this).attr('name'));		
		});
	
	
		$('.xing>i').click(function(){
			$(this).prevAll('i').addClass('this');
			$(this).nextAll('i').removeClass('this');
			$(this).addClass('this');
			eval_score=$(this).index();		
		});
	//点击评价
	$('.submit').click(function(){
			var	_content=$('#eval_con').val();
			var	_key=getajax.getsessionStorage('_key');
			if(eval_score==''){
				getajax.showmsg('请评价满意度');
			}else{
				server='Index/pingjia';
				params={
					'u_id':_key,
					'orderid':oid,
					'ping':eval_num,
					'manyidu':eval_score,
					'content':_content
					};
				getajax.postAction(server,params,function(res){
					console.log(res)
					if(res['code']==1000){
						getajax.showmsg('评价成功');
						setTimeout(function(){
							history.back();
						},500);
						
					}else{
						getajax.showmsg(res['message']);
					}
				},function(error){});
			}
		
	});
	
		
		

	
	var IstotalPage = false;
	var myScroll,
		pullDownEl, pullDownOffset,
		pullUpEl, pullUpOffset,
		generatedCount = 0;
	var bInitScorll = 0; //iscroll是否被初始化 0：未，1：有


	function loaded(index) {
		myScroll = new iScroll('iScrollevaluate', {
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
window.evaluate.start();
