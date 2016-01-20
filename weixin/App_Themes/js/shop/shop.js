
window.shop=(function(){
	var _width = $(document).width();
	function runimg() {
		var index = 0,
			maxlen = $('.shopindex_runimg li').length,
			time = 2000,
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

		touchs._right(".shopindex_runimg", function() {
			window.clearInterval(tm);
			if (index == maxlen - 1) {
				index = 0;
			} else {
				index += 1;
			}
			_mover();
			_timeInterval();

		});
		touchs._left(".shopindex_runimg", function() {
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
			$(".shopindex_runimg_index>span>a").removeClass("this");
			$(".shopindex_runimg_index>span>a").eq(index).addClass("this");
			$(".shopindex_runimg>ul").animate({
				'margin-left': -index * width + "%"
			}, runtime);
		}
	}
	
	
	function start(){
		runimg()
	}
	return{
		start:start
	};
})();
window.shop.start();
