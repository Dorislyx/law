window.law_detail=(function(){
	var server = '',
		type=126,
		params = {};
		$('.apply_statu>li').click(function(){
			$(this).addClass('this').siblings().removeClass('this');
			var _index=$(this).index();
			type=parseInt($(this).attr('name'));
			$('.article>div>ul').eq(_index).css('display','block').siblings().css('display','none');
			getlaw_detail();
		})
	function getlaw_detail(){
			server = 'index/falvzixun';
			var _key=getajax.getsessionStorage('_key');
			params = {
				'u_id':_key,
				'status':type
			};
			getajax.postAction(server,params,function(res){
				console.log('法律咨询',res);
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
						/*setTimeout(function(){
							$('.goanser').each(function(){
								var h=$(this).height();
								var H=$(this).parent().height();
								$(this).css('margin-top',(H-h)/2+'px');
							});
						},500)*/
						$('#submitted>li').click(function(){
							var oid=$(this).attr('ids');
							window.location.href='orderdetail.html?id='+oid;
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
						/*setTimeout(function(){
							$('.goanser').each(function(){
								var h=$(this).height();
								var H=$(this).parent().height();
								$(this).css('margin-top',(H-h)/2+'px');
							});
						},500)*/
						$('#accepted>li').click(function(){
							var oid=$(this).attr('ids');
							window.location.href='orderdetail.html?id='+oid;
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
							window.location.href='orderdetail.html?id='+oid;
						});
						/*setTimeout(function(){
							$('.goanser').each(function(){
								var h=$(this).height();
								var H=$(this).parent().height();
								$(this).css('margin-top',(H-h)/2+'px');
							});
						},500)*/
						
						$('#confirmed>li').click(function(){
							var oid=$(this).attr('ids');
							window.location.href='orderdetail.html?id='+oid;
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
							htm+='<a href="tel:4006626989" class="backtel">电话回访</a>';
							htm+='</div>'
							htm+='</li>';
						});
						$('#completed').empty().append(htm);
						$('#completed>li').click(function(){
							var oid=$(this).attr('ids');
							window.location.href='orderdetail.html?id='+oid;
						});
						$('.goeval').click(function(e){
							var oid=$(this).parents('li').attr('ids');
							e.stopPropagation();
							window.location.href='../shop/evaluate.html?id='+oid;
						});
						$('.backtel').click(function(e){
							e.stopPropagation();
							console.log(11111)
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
		myScroll = new iScroll('iScrolllaw_detail', {
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
		getlaw_detail();
	}
	return{
		start:start
	}
})();
window.law_detail.start();

