
window.myindex=(function(){
	var server = '',
		htm='',
		params = {};	
	 var _width = $(document).width();
	 $('.menulst>li').eq(0).click(function(){
	 	window.location.href='../shop/infotab.html';
	 });
	  $('.menulst>li').eq(1).click(function(){
	 	window.location.href='../lawask/chooseClassify.html';
	 });
	 $('.menulst>li').eq(2).click(function(){
	 	window.location.href='../serve/serve.html';
	 });
	 $('.menulst>li').eq(3).click(function(){
	 	window.location.href='../person/person_index.html';
	 });

	 
	 //获取banner列表
	 function bannerlst(){
	 	server='index/lunbotu';
		getajax.postAction(server,params,function(res){
				console.log('获取banner列表',res);
				if(res['code']==='1000'){
					var lst=res['data'];
					htm='';
					$(lst).each(function(k,v){
						htm+='<li ids="'+v['id']+'">';
						htm+='<a href="'+v['url']+'"><img src="'+getajax.http+v['pic']+'"/></a>';
						htm+='</li>';
						if(k==0){
							$('.runindex').empty().append('<a class="this"></a>');
						}else{
							$('.runindex').append('<a></a>');
						}
					});
					$('#runimg').empty().append(htm);
					$(".runimg").css('width', _width + "px");
					$(".runimg>ul").css("width", $('.runimg li').length+ "00%");
					$(".runimg>ul>li").css("width", 100 / $('.runimg li').length+ "%");
					runimg();
				}else{
					getajax.showmsg(res['message']);
				}
				
			},function(error){});	
	 }
	//判断是否加载图片
	function loadImg(){
		var _height=$(window).height();
		var imgs=$('#runimg img');
		$(imgs).each(function(k,v){
			var _top=$(this).offset().top;
			console.log(_top);
			
			if(_top>0&&_top<_height){
				LoadingImg($(this));
			}
		});
	}
	
	//加载图片
	function LoadingImg(obj){
		var imgUrl=$(obj).attr('_src');
		//console.log(imgUrl);
		var img=new Image();
		img.src=imgUrl;
		img.onload=function(event){
			$(obj).attr('src',img.src);
			if(event.complete){
				$(obj).attr('src',img.src);
				
			}
		}
	}
	//轮播
	function runimg() {
		var index = 0,
			maxlen = $('.runimg li').length,
			time = 5000,
			width = 100,
			runtime = 500;
		_timeInterval();
		function _timeInterval() {
			tm = setInterval(function() {
				if (index < maxlen - 1) {
					index += 1;
				} else {
					index = 0;
				}
				_mover();
			}, time);
		}

		touchs._right(".runimg", function() {
			window.clearInterval(tm);
			if (index == maxlen - 1) {
				index = 0;
			} else {
				index += 1;
			}
			_mover();
			_timeInterval();
		});
		touchs._left(".runimg", function() {
			window.clearInterval(tm);
			if (index == 0) {
				index = maxlen - 1;
			} else {
				index -= 1;
			}
			_mover();
			_timeInterval();

		});

		function _mover() {
			$(".runindex>a").removeClass("this");
			$(".runindex>a").eq(index).addClass("this");
			$(".runimg>ul").animate({
				'margin-left': -index *width + "%"
				
			}, runtime);
		}
	}
	var IstotalPage = false;
	var myScroll,
		pullDownEl, pullDownOffset,
		pullUpEl, pullUpOffset,
		generatedCount = 0;
	var bInitScorll = 0; //iscroll是否被初始化 0：未，1：有


	function loaded(index) {
		myScroll = new iScroll('iScrollmyindex', {
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
			},2000);
		}
		bInitScorll = 0;
		reScroll();
		bannerlst();
		
	}
	return{
		start:start
	};
})();
window.myindex.start();