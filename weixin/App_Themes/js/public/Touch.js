window.touchs = (function() {
	var istouch = false,
		startX = 0,
		startY = 0,
		thisindex = 0,
		endX = 0,
		endY = 0,
		cl={},//侧拉对象
		_this,
		touch_left,
		touch_right,
		touch_top,
		touch_bottom,
		chua;

	function touchSatrtFunc(evt) {
			try {
				//evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
				startCel();
				var touch = evt.touches[0]; //获取第一个触点
				var x = Number(touch.pageX); //页面触点X坐标
				var y = Number(touch.pageY); //页面触点Y坐标
				//记录触点初始位置
				startX = x;
				startY = y;
				_this=$(evt.currentTarget)[0];
				var width = $(window).width();
				var height = $(window).height();
			} catch (e) {

			}
		}
		//touchmove事件，这个事件无法获取坐标

	function touchMoveFunc(evt) {
		try {
			//evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
			var touch = evt.touches[0]; //获取第一个触点
			var x = Number(touch.pageX); //页面触点X坐标
			var y = Number(touch.pageY); //页面触点Y坐标
			endX = x;
			endY = y;
			moveCel();
			//判断滑动方向 上下
		} catch (e) {

		}
	}

	//touchend事件
	function touchEndFunc(evt) {
		try {
			endCel();//结束侧拉
			touchMover();
			
		} catch (e) {

		}
	}

	//绑定事件
	function bindEvent(b) {
		var k = $(b)[0];
		k.addEventListener('touchstart', touchSatrtFunc, false);
		k.addEventListener('touchmove', touchMoveFunc, false);
		k.addEventListener('touchend', touchEndFunc, false);
		$(b).click(function(event) {
			event.stopPropagation();
		});
	}

	//判断是否支持触摸事件
	function isTouchDevice() {
		try {
			document.createEvent("TouchEvent");
			istouch = true;

		} catch (e) {
			istouch = false;
		}
	}
	//刚刚开始拉
	function startCel(){
		$(cl.cid).css('left','0px');
		
		//$(_this).siblings().css('left','0px');
	}
	
	//侧拉过程中
	function moveCel() {
		var _left = $(_this).css('left');
		if (_left && _left != 'auto') {
			_left = _left.replace('px', '');
			if (parseInt(_left) < -90 && endX - startX < 0) {
				cl.left=true;
				return false;
			} else if (parseInt(_left) > -90 && endX - startX < 0) {
				cl.left=true;
				_left -= 10;
				$(_this).css('left', _left + 'px');
			} else if (endX - startX > 0) {
				cl.left=false;
				_left = parseInt(_left) + 10;
				if (_left >= 0) {
					_left = 0;
				}
				$(_this).css('left', _left + 'px');
				if (_left > 0) {
					return false;
				}
			}
		} else { //$(_this).css('left');
			if (endX - startX < -20) {
				cl.left=true;
				$(_this).css('left', (endX - startX) + 'px');
			}
		}
	}
	//侧拉结束
	function endCel(){
		if(cl.left){
			if(endX-startX>=-20){
				$(_this).css('left','0px');
			}else{
				$(_this).css('left','-90px');
			}
		}else if(cl.left!=undefined){
			if(endX-startX<-70){
				$(_this).css('left','90px');
			}else{
				$(_this).css('left','0px');
			}
		}
	}


	function touchMover() {
		if (endX - startX > 0) {
			//console.log("右滑动")
			touch_left();
		} else if (endX - startX < -1 && endX != 0) {
			//console.log("左滑动")
			touch_right();
		} else if (endY - startY > 0) {
			//console.log("左滑动")
			touch_top();
		} else if (endY - startY < 0 && endY != 0) {
			//console.log("左滑动")
			touch_bottom();
		} else if (1 == 1) {
			//侧划
			chua();
		}
		startX = 0;
		startY = 0;
		endX = 0;
		endY = 0;
	}

	function _left(a, fun) {
		if (istouch) {
			bindEvent(a); //绑定事件
			touch_left = fun;
		}

	}

	function _right(byobj, fun) {
		if (istouch) {
			bindEvent(byobj); //绑定事件
			touch_right = fun;
		}
	}

	function _top(byobj, fun) {
		if (istouch) {
			bindEvent(byobj); //绑定事件
			touch_top = fun;
		}
	}

	function _bottom(byobj, fun) {
		if (istouch) {
			bindEvent(byobj); //绑定事件
			touch_bottom = fun;
		}
	}

	function _chua(byobj, fun) {
		if (istouch) {
			cl.cid=byobj;
			if(byobj.length>1){
				$(byobj).each(function(){
					bindEvent($(this)); //绑定事件
					chua = fun;
				});
			}
			
		}
	}

	function start() {
		isTouchDevice();
	}
	return {
		start: start,
		_left: _left,
		_right: _right,
		_top: _top,
		_bottom: _bottom,
		_chua: _chua
	};
})();
window.touchs.start();