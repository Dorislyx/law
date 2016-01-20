
window.myapply=(function(){
	var server = '',
		htm='',
		type=126,
		params = {};
	$('.apply_statu>li').click(function(){
		$(this).addClass('this').siblings().removeClass('this');
		var _index=$(this).index();
		type=parseInt($(this).attr('name'));
		$('.article>div>ul').eq(_index).css('display','block').siblings().css('display','none');
		getzx_wq();
	})
	
	//获取信息
	
	function getzx_wq(){
			server = 'Index/weiquanfuwu';
			var _key=getajax.getsessionStorage('_key');
			params = {
				'u_id':_key,
				'status':type
			};
			getajax.postAction(server,params,function(res){
				console.log('维权服务',res);
				if(res['code']==='1000'){
					var lst=res['data'];
					if(type==126){
						console.log(type)
						htm='';
						$(lst).each(function(k,v){
							htm+='<li ids="'+v['id']+'">';
							htm+='<p>'+v['title']+'</p>';
							htm+='<div>';
							htm+='<p>'+v['content']+'</p>';
							htm+='<span class="goanser">去回复</span>';
							htm+='</div>';
							htm+='</li>';
						});
						$('#submitted').empty().append(htm);
						$('#submitted>li').click(function(){
							var oid=$(this).attr('ids');
							window.location.href='../serve/wq_orderdetail.html?id='+oid;
						});
						//点击去回复
						$('.goanser').click(function(e){
							var oid=$(this).parents('li').attr('ids');
							e.stopPropagation();
							window.location.href='server_detail.html?id='+oid;
						});
					}else if(type==127){
						console.log(type)
						htm='';
						$(lst).each(function(k,v){
							htm+='<li ids="'+v['id']+'">';
							htm+='<p>'+v['title']+'</p>';
							htm+='<div>';
							htm+='<p>'+v['content']+'</p>';
							htm+='<span class="goanser">去回复</span>';
							htm+='</div>';
							htm+='</li>';
						});
						$('#accepted').empty().append(htm);
						$('#accepted>li').click(function(){
							var oid=$(this).attr('ids');
							window.location.href='../serve/wq_orderdetail.html?id='+oid;
						});
						//点击去回复
						$('.goanser').click(function(e){
							var oid=$(this).parents('li').attr('ids');
							e.stopPropagation();
							window.location.href='server_detail.html?id='+oid;
						});
					}else if(type==128){
						console.log(type)
						htm='';
						$(lst).each(function(k,v){
							htm+='<li ids="'+v['id']+'">';
							htm+='<p>'+v['title']+'</p>';
							htm+='<div>';
							htm+='<p>'+v['content']+'</p>';
							htm+='<span class="goanser">去回复</span>';
							htm+='</div>';
							htm+='</li>';
						});
						$('#confirmed').empty().append(htm);
						$('#confirmed>li').click(function(){
							var oid=$(this).attr('ids');
							window.location.href='../serve/wq_orderdetail.html?id='+oid;
						});
						//点击去回复
						$('.goanser').click(function(e){
							var oid=$(this).parents('li').attr('ids');
							e.stopPropagation();
							window.location.href='server_detail.html?id='+oid;
						});
					}else{
						console.log(type)
						htm='';
						$(lst).each(function(k,v){
							htm+='<li ids="'+v['id']+'">';
							htm+='<div>';
							htm+='<p>'+v['title']+'</p>';
							htm+='<p>'+v['content']+'</p>';
							htm+='</div>';
							htm+='<div>';
							htm+='<span class="goeval">去评价</span>';
							htm+='<a href="tel:4006626989" class="bachtel">电话回访</a>';
							htm+='</div>';
							htm+='</li>';
						});
						$('#completed').empty().append(htm);
						$('#completed>li').click(function(){
							var oid=$(this).attr('ids');
							window.location.href='../serve/wq_orderdetail.html?id='+oid;
						});
						
						$('.goeval').click(function(e){
							var oid=$(this).parents('li').attr('ids');
							e.stopPropagation();
							window.location.href='../shop/evaluate.html?id='+oid;
						});
						$('.bachtel').click(function(e){
							e.stopPropagation();
						});
					}
					
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
		myScroll = new iScroll('iScrollmyapply', {
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
		getzx_wq();
		
	}
	return{
		start:start
	};
})();
window.myapply.start();
