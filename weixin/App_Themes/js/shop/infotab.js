
window.infotab=(function(){
	var n=3,
		server = '',
		htm='',
		htn='',
		params = {};	
	
	$('.mews_lst>li').click(function(){
		var title=$(this).find('p').eq(0).text();
		getajax.setsessionStorage('title',title);
		window.location.href='newsdetail.html';
	});
	$('.info_tab>li').click(function(){
		$(this).addClass('this').siblings().removeClass('this');
		var txt=$(this).text();
		$('header>.center').text(txt);
		n=parseInt($(this).attr('name'));
		getajax.setsessionStorage('newtype',n);
		var _index=$(this).index();
		$('.article>div>div').eq(_index).css('display','block').siblings().css('display','none');	
		infotab();
	});
	
		function infotab(){
			getajax.setsessionStorage('newtype',n);
			server='Index/serviceonline';
			params = {
				'type':n
			};
			getajax.postAction(server,params,function(res){
				
				if(res['code']==='1000'){
					//getajax.showmsg('修改成功');
					if(n==1){
						var newtitle=$('li[name="1"]').text();
						getajax.setsessionStorage('newheader',newtitle);
						console.log('新闻资讯',res);
						var data1=res['data'];
						var _data1=res['data'][0];
						htn='';
						htm='';
						$(data1).each(function(k,v){
							var datapic=v['picture'];
								if(datapic){
									htm+='<li ids="'+v['id']+'">';
									htm+='<div><img class="centerimg"  src="'+getajax.http+v['picture']+'" /></div>';
									htm+='<div>';
									htm+='<p>'+v['title']+'</p>';
									htm+='<p class="textcon">'+v['content']+'</p>';
									htm+='</div>';
									htm+='</li>';
								}else{
									htn+='<p>'+v['title']+'</p>';
									htn+='<p class="textcon">'+v['content']+'</p>';
								}
							});
						$('#mews_lst1').empty().append(htm);
						$('.news').empty().append(htn);
						aaaa();
						$('#mews_lst1>li').click(function(){
							var _src=$(this).find('img').attr('src');
							var oid=$(this).attr('ids');
							window.location.href='newsdetail.html?id='+oid;
						});
						setTimeout(function(){
							$('#mews_lst1>li').each(function(){
							var oimg=$(this).find('img');
							var h=$(oimg).height();
							var H=$(oimg).parent().height();
							$(oimg).css('margin-top',(H-h)/2+'px');
						});
						},500);
						
					}else if(n==2){
						var newtitle=$('li[name="2"]').text();
							getajax.setsessionStorage('newheader',newtitle);
						console.log('法律宣传',res);
						var data2=res['data'];
						htn='';
						htm='';
						$(data2).each(function(k,v){
							var datapic=v['picture'];
								if(datapic){
									htm+='<li ids="'+v['id']+'">';
									htm+='<div><img class="centerimg" src="'+getajax.http+v['picture']+'" /></div>';
									htm+='<div>';
									htm+='<p>'+v['title']+'</p>';
									htm+='<p class="textcon">'+v['content']+'</p>';
									htm+='</div>';
									htm+='</li>';
								}else{
									htn+='<p>'+v['title']+'</p>';
									htn+='<p class="textcon">'+v['content']+'</p>';
								}

						});
						$('#mews_lst2').empty().append(htm);
						$('.news').empty().append(htn);
						aaaa();
						$('#mews_lst2>li').click(function(){
							var _src=$(this).find('img').attr('src');
							var oid=$(this).attr('ids');
							window.location.href='newsdetail.html?id='+oid;
						});
						setTimeout(function(){
							$('#mews_lst2>li').each(function(){
							var oimg=$(this).find('img');
							var h=$(oimg).height();
							var H=$(oimg).parent().height();
							$(oimg).css('margin-top',(H-h)/2+'px');
						});
						},500);
					}else if(n==3){
						console.log('平台介绍',res);
						var data3=res['data'];
						htm='';
						$(data3).each(function(k,v){
							htm+=v['content'];
						});
						$('#Platform1').empty().append(htm);
						
					}else{
						console.log('服务流程',res);
						var data4=res['data'];
						htm='';
						$(data4).each(function(k,v){
							htm+=v['content'];
						});
						$('#Platform2').empty().append(htm);
					}
					console.log(n);
				}
				
			},function(error){});
		}
		
	function aaaa(){
		$('.textcon').each(function(k,v){
			var len=$(this).text().length;
			console.log(len)
			if(len>30){
				var str=$(this).text().substring(0, 30);
			$(this).text(str+"...");	
			}
		});
	}
	var IstotalPage = false;
	var myScroll,
		pullDownEl, pullDownOffset,
		pullUpEl, pullUpOffset,
		generatedCount = 0;
	var bInitScorll = 0; //iscroll是否被初始化 0：未，1：有


	function loaded(index) {
		myScroll = new iScroll('iScrollinfotab', {
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
		infotab();
		
	
	}
	return{
		start:start
	};
})();
window.infotab.start();
