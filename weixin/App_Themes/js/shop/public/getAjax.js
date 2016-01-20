window.getajax = (function() {
	//var sus = 'http://123.57.86.100:8080/XMQQWeb/service',
	var sus='http://weiq.bjqttd.com/index.php/api/',
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
	
	function puburl(){
		return sus;
	}
	/*ajax请求：
		 *server:请求地址
		 *params:请求参数
		 *fun1:请求成功后的回调方法
		 *fun2:请求失败后的回调方法
		 */

	function getAction(server, params, fun1, fun2) {
		$.ajax({
			type: "get",
			url: sus + server,
			dataType: 'json',
			//jsonp: "jsonCallback",
			data: params,
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

	function getQueryString(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			var r = window.location.search.substr(1).match(reg);
			if (r != null) {
				return unescape(r[2]);
			}
			return '';
		}
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


	function showmsg(msg) {
		console.log(msg);
		var timeout;
		var c = $(".showmsg").attr("class");
		if (c == 'showmsg') {
			$(".showmsg").fadeOut(1);
			$(".showmsg").replaceWith('');
			clearTimeout(timeout);
			htm = '<div class="showmsg"><span>' + msg + '</span></div>';
			$("body").append(htm);
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
		if (time.length == 10) {
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
	
	
	function start() {
		//setsessionStorage('token', '00000001');
		/*var _phonenumber=getsessionStorage('phonenumber');
		if(_phonenumber==''){
			getuserInfo();
		}*/
	/*	
		if(openid!=''){
			setsessionStorage('token',openid);
		}
		var _token=getsessionStorage('token');
		var _url=window.location.href;
		if(_token==''&&_url.indexOf('login')==-1&&_url.indexOf('regin')==-1){
			window.location.href='../my/login.html';
		}*/
	}
	return {
		http:'http://weiq.bjqttd.com',
		start: start,
		showmsg: showmsg,
		getTime: getTime,
		loadshow: loadshow,
		loadhide: loadhide,
		getAction: getAction,
		removesessionStorage: removesessionStorage,
		getQueryString: getQueryString,
		setsessionStorage: setsessionStorage,
		getsessionStorage: getsessionStorage,
		removelocalStorage: removelocalStorage,
		setlocalStorage: setlocalStorage,
		getlocalStorage: getlocalStorage
	};
})();
window.Alertpiugin = (function() {
	var normal = {}; //通用html代码
	var AlertRadio = {}; //单选弹框
	var AlertCheckbox = {}; //复选弹框
	var Page = {}; //分页
	normal = {
		bighide: '<ul class="bighide" id="bighide"><li class="hideone"></li><li id="thishide"></li></ul>'
	};
	AlertCheckbox = {
		hid: 'msgtxt',
		btnOK: 'btnOK',
		btnNO: 'btnNO',
		htm: '<li class="hidetwo"><div class="alertmsgcenter" id="msgtxt"></div><div class="alertmsgbtn"><span class="btnNO" id="btnNO">取消</span><span class="btnOK" id="btnOK">确认</span></div></li>',
		funcreat: function(msg) {
			$('body').append(normal.bighide);
			$('#thishide').replaceWith(this.htm);
			msg = msg.split('|');
			$('#msgtxt').empty().append(msg[0]);
			if (msg.length == 3) {
				$('#btnOK').empty().append(msg[1]);
				$('#btnNO').empty().append(msg[2]);
			} else if (msg.length == 2) {
				$('#btnOK').empty().append(msg[1]);
				$('#btnNO').empty().append('');
				$('#btnNO').addClass('this');
				$('#btnOK').addClass('this');
			}else if(msg.length==1){
				$('.alertmsgbtn').css('display','none');
			}
			$('#bighide').fadeIn(100);
		},
		funhideshow: function(msg) {
			msg = msg.split('|');
			$('#msgtxt').text(msg[0]);
			if (msg.length == 3) {
				$('#btnOK').text(msg[1]);
				$('#btnNO').text(msg[2]);
			} else if (msg.length == 2) {
				$('#btnOK').text(msg[1]);
				$('#btnNO').text('');
				$('#btnNO').addClass('this');
				$('#btnOK').addClass('this');
			}
			$('#bighide').fadeIn(100);
		},
		funbtn: function(msg, _attr, fun1, fun2) {
			if ($('#bighide').attr('class') == 'bighide') {
				this.funhideshow(msg);
			} else {
				this.funcreat(msg);
			}
			this.funOK(_attr, fun1);
			this.funNO(_attr, fun2);
			$('.hideone').click(function(){
				$('#bighide').fadeOut(100);
			});
		},
		funOK: function(_attr, fun) {
			$('#btnOK').one('click', function() {
				$('#bighide').fadeOut(100);
				if ($.isFunction(fun)) {
					fun(_attr);
				}
			});
		},
		funNO: function(_attr, fun) {
			$('#btnNO').one('click', function() {
				$('#bighide').fadeOut(100);
				if ($.isFunction(fun)) {
					fun(_attr);
				}
			});
		}
	};
	//分页
	Page = {
		pageNum:2,
		pagethis: false, //当前是否在加载数据状态,
		pagetomeout: null, //延时器
		pageIsScroll: false, //是否触发Scroll
		pageshow: function(ids, server, params, fun1, fun2) {
			if (!Page.pageIsScroll) {
				Page.pageIsScroll = true;
				$(ids).scroll(function() {
					Page.pageScroll($(this), server, params, fun1, fun2);
				});
			}
		},
		pageScroll: function(obj, server, params, fun1, fun2) {
			if (Page.pagethis) {
				return false;
			}
			if ($(obj)[0].scrollHeight < ($(obj).height() + $(obj).scrollTop() + 20)) {
				$('#autoload').fadeIn(10);
				$('#loadimg').addClass('load');
				if (Page.pagethis) {
					return false; //当前正在加载数据状态,禁止再次加载
				}
				Page.pagethis = true;
				setTimeout(function() {
					params['pageNum']=Page.pageNum;
					Page.pageload(server, params, function(res) {
						$('#loadimg').removeClass('load');
						$('#autoload').addClass('loadend');
						$('#loadtxt').text('加载完成');
						Page.pageNum+=1;
						Page.pagethis = false;
						clearTimeout(Page.pagetomeout);
						setTimeout(function() {
							Page.pagehide();
							fun1(res);
						}, 1000);
						
					}, function(error) {
						fun2(error);
						$('#loadimg').removeClass('load');
						$('#autoload').addClass('loadend');
						$('#loadtxt').text('加载失败');
						Page.pagethis = false;
						setTimeout(function() {
							Page.pagehide();
						}, 1000);
					});
				}, 500);


				Page.pagetomeout = setTimeout(function() {
					$('#loadimg').removeClass('load');
					$('#autoload').addClass('loadend');
					$('#loadtxt').text('加载失败');
					Page.pagethis = false;
					setTimeout(function() {
						Page.pagehide();
					}, 1000);
				}, 8000);
			}
		},
		pageload: function(servers, params, fun1, fun2) {
			getajax.getAction(servers, params, fun1, fun2);
		},
		pagehide: function() {
			$('#autoload').fadeOut(10);
			$('#autoload').removeClass('loadend');
			$('#loadtxt').text('加载中...');
		}
	};


	function start() {
		//AlertRadio.funcreat();
		/*window.Alertpiugin.AlertCheckbox.dfunbtn('确定删除收藏?|是|否',{'code':0,'msg':'ok'},function(res){
			console.log('ok',res);
		},function(res){
			console.log('no',res);
		});*/
		/*window.Alertpiugin.AlertCheckbox.funbtn('确定删除收藏?|是',{'code':0,'msg':'ok'},function(res){
			console.log('ok',res);
		},function(res){
			console.log('no',res);
		});*/
	}
	return {
		Page: Page,
		start: start,
		AlertCheckbox: AlertCheckbox
	}

})();
window.getajax.start();
window.Alertpiugin.start();