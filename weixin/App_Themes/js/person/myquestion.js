
window.myquestion=(function(){
	
	$('.ask').click(function() {
		$('.bighide').fadeIn(200);
	});
	
	$('.blackhide').click(function() {
		$('.bighide').fadeOut(200);
	});
	
	
	
	
	var IstotalPage = false;
	var myScroll,
		pullDownEl, pullDownOffset,
		pullUpEl, pullUpOffset,
		generatedCount = 0;
	var bInitScorll = 0; //iscroll是否被初始化 0：未，1：有


	function loaded(index) {
		myScroll = new iScroll('iScrollmyquestion', {
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
window.myquestion.start();
