window.chooseClassify=(function(){
	var server = '',
		htn='',
		htm='',
		params = {};
		//获取法律咨询文字介绍
		function lawtext(){
			server='Index/fazinfo';
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
		//获取法律咨询分类
		function chooseClassify(){
			server='Index/lawsclass';
			getajax.postAction(server,params,function(res){
			console.log('法律分类',res);
			if(res['code']==='1000'){
				var lst=res['data'];
				htm='',
				$(lst).each(function(k,v){
					htm +='<li ids="'+v['id']+'">';
					htm +='<div><img src="'+getajax.http+v['picture']+'" alt="" /></div>';
					htm +='<div>'+v['title']+'</div>';
					htm +='<div>';
					htm +='<span></span>';
					htm +='<span></span>';
					htm +='</div>';
					htm +='</li>';
				});
				$('.classify_lst').empty().append(htm);
				$('.classify_lst>li').click(function(){
					var otext=$(this).find('div').eq(1).text();
					var classid=$(this).attr('ids');
					$(this).toggleClass('this').siblings().removeClass('this');
					getajax.setsessionStorage('classifytext',otext);
					getajax.setsessionStorage('classid',classid);
					console.log(otext)
					setTimeout(function(){
						//history.back();
						window.location.href='../lawask/lawask_pic.html';
					},500)
					
				})
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
		myScroll = new iScroll('iScrollchooseClassify', {
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
		lawtext();
		chooseClassify();
	}
	return{
		start:start
	};
})();
window.chooseClassify.start();
