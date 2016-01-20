window.getajax = (function() {
	//var sus = 'http://123.57.86.100:8080/XMQQWeb/service',
	var sus='http://weiq.bjqttd.com/index.php/api/',//接口地址的公共部分
	    openid=getQueryString('openid'),
		htm = '',
		timer; //loadshow
	/*ajax请求：
	 *server:请求地址
	 *params:请求参数
	 *fun1:请求成功后的回调方法
	 *fun2:请求失败后的回调方法
	 */
	
	$('span[name=back]').click(function() {
		_back();
	});
	
	function puburl(){ //该方法使用闭包原理是为了能让你在其他js里面也能使用变量sus的
		return sus;
	}
	/*ajax请求：
		 *server:请求地址
		 *params:请求参数
		 *fun1:请求成功后的回调方法
		 *fun2:请求失败后的回调方法
		 */
		//为了使用方便，这里对jquery里的ajax进行了封装处理
		/*
		 	如需要发送请求：
		 	var sever='地址';
		 	var params={
		 		'键'：'值'
		 	};
		 	getajax.getAction(server, params, function(res){
		 		
		 	}, function(error){
		 		
		 	})
		 	就这样调用一下即可，
		 	注：第一个函数数请求成功时执行的函数，定义了一个res接收一下请求的数据
		 	第二个函数数请求失败时执行的函数，定义了一个error接收一下返回的状态
		 */
	function getAction(server, params, fun1, fun2) {
		$.ajax({
			type: "get",			
			url: sus + server,  //要求为String类型的参数，（默认为当前页地址）发送请求的地址。
			dataType: 'json',
			//jsonp: "jsonCallback",
			data: params,		//请求数据的参数
			success: function(result) {
				if ($.isFunction(fun1)) {
					log(result);
					fun1(result);
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				if ($.isFunction(fun2)) {
					fun2(XMLHttpRequest);
				}
			}
		});
	}

	function postAction(server, params, fun1, fun2) {
		var _params = '';
		for (var i in params) {
			_params += i + "=" + params[i] + "&";
		}
		var options = {
			url: sus + server,
			type: 'post',
			dataType: 'json',
			data: _params,
			success: function(result) {
				if ($.isFunction(fun1)) {
					log(result);
					fun1(result);
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				if ($.isFunction(fun2)) {
					fun2(XMLHttpRequest);
				}
			}

		};
		$.ajax(options);
	}
	$("#back").click(function() {
		_back();
	});
	
	function _back() {
		window.history.go(-1);
	}

	/*
	 *获取url参数信息
	 *name:参数名称
	 */
	/*
	 getQueryString方法是为了获取地址对象问号后面以“=”分开的值，如：http://weiq.bjqttd.com/weixin/serve/projectdetail.html?id=1 ； 如果要获取该地之中的id值可以这样做：
	var _id=getajax.getQueryString('id');
	*/
	function getQueryString(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			var r = window.location.search.substr(1).match(reg);
			if (r != null) {
				return unescape(r[2]);
			}
			return '';
		}
	/*
	 亲，本地存储包括 sessionStorage,localStorage;前者是会话级存储,关闭浏览器存储的数据就消失；后者是永久性存储，关闭浏览器存储的数据不会消失，具体用法基本一模一样，这两个本地存储都有三个相同的操作，
	 会话：
		 设置 setsessionStorage(keys, value)
		 删除 removesessionStorage(keys)
		 获取 var _key=getsessionStorage(keys)
	 永久：
		 设置 setlocalStorage(keys, value)
		 删除 removelocalStorage(keys)
		 获取 var _key=getlocalStorage(keys)
	 */
	/*设置储存的值*/
	function setsessionStorage(keys, value) {
			if (sessionStorage) {
				var jsom = sessionStorage['jsom'];
				var mp = {};
				if (jsom && jsom != '') {
					mp = JSON.parse(jsom);
				}
				mp[keys] = value;
				jsom = JSON.stringify(mp);
				sessionStorage['jsom'] = jsom;
			} else {
				/*不支持sessionStorage*/
			}
			return '';
		}
		/*删除储存的值*/

	function removesessionStorage(keys) {
		if (sessionStorage && sessionStorage['jsom'] != undefined) {
			var jsom = sessionStorage['jsom'];
			if (jsom && jsom != '') {
				var a = {};
				var mp = JSON.parse(jsom);
				for (var i in mp) {
					if (i != keys) {
						a[i] = mp[i];
					}
				}
				//mp[keys] = '';
				jsom = JSON.stringify(a);
				sessionStorage['jsom'] = jsom;
			}
		}
	}

	/*获取储存的值*/

	function getsessionStorage(keys) {

			if (sessionStorage && sessionStorage['jsom'] != undefined) {
				var jsom = sessionStorage['jsom'];
				if (jsom && jsom != '') {
					var mp = JSON.parse(jsom);
					if (mp[keys] && mp[keys] != '') {
						return mp[keys];
					} else {
						return "";
					}
				}
			} else {
				return "";
			}
		}
		/*设置储存的值*/

	function setlocalStorage(keys, value) {
			if (localStorage) {
				var jsom = localStorage['jsom'];
				var mp = {};
				if (jsom && jsom != '') {
					mp = JSON.parse(jsom);
				}
				mp[keys] = value;
				jsom = JSON.stringify(mp);
				localStorage['jsom'] = jsom;
			} else {
				/*不支持sessionStorage*/
			}
		}
		/*删除储存的值*/

	function removelocalStorage(keys) {
		if (localStorage && localStorage['jsom'] != undefined) {
			var jsom = localStorage['jsom'];
			if (jsom && jsom != '') {
				var a = {};
				var mp = JSON.parse(jsom);
				for (var i in mp) {
					if (i != keys) {
						a[i] = mp[i];
					}
				}
				//mp[keys] = '';
				jsom = JSON.stringify(a);
				localStorage['jsom'] = jsom;
			}
		}
	}

	/*获取储存的值*/

	function getlocalStorage(keys) {
		if (keys === 'uname') {
			var _uname = localStorage['uname'];
			if (_uname != undefined && _uname != '' && _uname != null) {
				return _uname;
			} else {
				return '';
			}
		} else if (keys === 'token') {
			var _token = localStorage['token'];
			if (_token != undefined && _token != '' && _token != null) {
				return _token;
			} else {
				return '';
			}
		} else if (keys === 'expire') {
			var _expiree = localStorage['expire'];
			if (_expiree != undefined && _expiree != '' && _expiree != null) {
				return _expiree;
			} else {
				return '';
			}
		} else {
			if (localStorage && localStorage['jsom'] != undefined) {
				var jsom = localStorage['jsom'];
				if (jsom && jsom != '') {
					var mp = JSON.parse(jsom);
					if (mp[keys] && mp[keys] != '') {
						return mp[keys];
					} else {
						return "";
					}
				}
			} else {
				return "";
			}
		}
	}
	
	function getuserInfo(){
		var user_server='QueryUserInfo';
		var user_params={};
		getajax.getAction(user_server,user_params, function(res) {
			var head = res['head'];
			var response = res['response'];
			if (head['resultCode'] == '000000') {
				var _phonenumber=response['phoneNumber'];
				setsessionStorage('phonenumber',_phonenumber);
			}
		});
	}

/*
 showms方法是弹出一个消息提示的，提示内容可以自定义，需要时调用就行，其样式在css/public/public.css里定义着
 */
	function showmsg(msg) {
		console.log(msg);
		var timeout;
		var c = $(".showmsg").attr("class");
		if (c == 'showmsg') {
			$(".showmsg").fadeOut(1);
			$(".showmsg").replaceWith('');
			clearTimeout(timeout);
			htm = '<div class="showmsg"><span>' + msg + '</span></div>';
			$("body").append(htm);		//动态创建一个div
			$(".showmsg").fadeIn(100);
		} else {
			htm = '<div class="showmsg"><span>' + msg + '</span></div>';
			$("body").append(htm);
			$(".showmsg").fadeIn(100);
		}
		 timeout=setTimeout(function() {
			$(".showmsg").fadeOut(100);
		}, 1500);
	}
	
	/*
	 loadshow方法 是调用_showload方法在发送ajax请求开始时在页面上显示一个旋转的gif图，该gif图在css/img里面，告诉用户页面正在加载；
	 loadhide方法 是在发送ajax请求成功或失败时时让页面上显示一个旋转的gif图隐藏的
	 以上这些样式都在css/public/public.css里定义着
	*/
	function loadshow(idx) {
		if ($(".aload").attr("class") == undefined) {
			aload(idx);
		} else {
			_showload(idx);
		}
	}

	function loadhide() {
		clearTimeout(timer);
		$(".aload").css("display", "none");
	}

	function _showload(idx) {
		$(".aload").css("display", "block");
		if (idx === undefined) {
			timer = setTimeout(function() {
				$(".aload>div").addClass("errormsg");
				$(".aload>div>span").attr("class", "aloads1").text("加载异常");
				setTimeout(function() {
					loadhide();
					$(".aload>div").removeClass("errormsg");
					$(".aload>div>span").attr("class", "aloads").text("");
				}, 1500);
			}, 7000);
		}

	}

	function aload(idx) {
		htm = '<div class="aload">';
		htm += '<div><span class="aloads"></span></div>';
		htm += '</div>';
		$("body").append(htm);
		_showload(idx);
	}

	/*11(13)位整形字符串转时间
	 * time:字符串
	 * sp:时间的拼接字符
	 * istrue:是否需要时/分/秒
	 */
	function getTime(time, sp, istrue) {
		var b;
		if (time.length == 10) {  //判断传进来的时间戳的长度是10还是13，是10的话后补3个0达到13
			time = time + "000";
		}
		var a = parseInt(time);
		if (time == '') {
			b = new Date();
		} else {
			b = new Date(a);
		}
		var year = b.getFullYear();
		var mouth = b.getMonth() + 1;
		var day = b.getDate();
		var h = b.getHours();
		var m = b.getMinutes();
		var s = b.getSeconds();
		var c = year + sp + mouth + sp + day;
		if (istrue) {
			c = c + " " + h + ":" + m + ":" + s;
			return c;
		} else {
			return c;
		}
	}

	function log(msg, msgtxt) {
		console.log(msg);
	}
	
	//判断是否加载图片
	function loadImg(){
		var _height=$(window).height();
		var imgs=$('img');
		$(imgs).each(function(k,v){
			var _top=$(v).offset().top;
			//console.log(_top);
			if(_top>0&&_top<_height){
				LoadingImg(v);
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

	function start() {
		
	}
	return {
		http:'http://weiq.bjqttd.com',
		start: start,
		showmsg: showmsg,
		getTime: getTime,
		loadshow: loadshow,
		loadhide: loadhide,
		loadImg:loadImg,
		LoadingImg:LoadingImg,
		getAction: getAction,
		postAction: postAction,
		removesessionStorage: removesessionStorage,
		getQueryString: getQueryString,
		setsessionStorage: setsessionStorage,
		getsessionStorage: getsessionStorage,
		removelocalStorage: removelocalStorage,
		setlocalStorage: setlocalStorage,
		getlocalStorage: getlocalStorage
	};
})();
window.getajax.start();
