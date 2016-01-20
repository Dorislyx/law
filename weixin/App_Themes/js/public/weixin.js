window.weixin = (function() {
	var temp = {};
	
	function getweixin() {
		var _url=window.location.href;
		temp.wxsv ='Index/wx_getparam';//'WcSignUrl';
		temp.wxps = {};
		temp.wxps['url'] = _url;
		getajax.getAction(temp.wxsv, temp.wxps, function(res) {
			console.log('11111',res);
			if(res['code']=='1000'){
				var response = res['data'];
				temp.signature = response['signature'];
				temp.nonceStr = response['nonceStr'];
				temp.timestamp = response['timestamp'];
				temp.appid = response['appId'];
				console.log(temp.appid)
				//temp.phonenumber=response.phoneNumber;
				start_weixin();
			}
		}, function(error) {});
	}

	function start_weixin() {
		wx.config({
			debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			appId: temp.appid, // 必填，公众号的唯一标识
			timestamp: temp.timestamp, // 必填，生成签名的时间戳
			nonceStr: temp.nonceStr, // 必填，生成签名的随机串
			signature: temp.signature, // 必填，签名，见附录1
			jsApiList: ['chooseImage', 'previewImage', 'uploadImage',
					'downloadImage', 'getLocation', 'openLocation',
					'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ',
					'onMenuShareWeibo', 'onMenuShareQZone'
				] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		});
		wx.ready(function() {});
		wx.error(function(res) {});
	}

	
	$('#photo>li').click(function() {
		var obj = $(this);
		//打开图片
		wx.chooseImage({
			count: 1, // 默认9
			sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
			success: function(res) {
				var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
				obj.find('img').attr('src', localIds);
				console.log(obj);
				//obj.find('img').attr('media_id',res.serverId);
				uploadImage(obj.find('img'));
			},
			fail: function(error) {}
		});
	});
	
	//上传图片到服务器
	function uploadImage(obj) {
		var _localId = $(obj).attr('src');
		wx.uploadImage({
			localId: _localId, // 需要上传的图片的本地ID，由chooseImage接口获得
			isShowProgressTips: 1, // 默认为1，显示进度提示
			success: function(res) {
				var serverId = res.serverId; // 返回图片的服务器端ID
				//idarry.push(serverId);
				//str+=","+serverId;
				$(obj).attr('serverId', serverId);
			}
		});
	}
	
	
	function start() {
		getweixin();
		
	}
	return {
		start: start,
		uploadImage: uploadImage,
		getweixin: getweixin
	};
})();
window.weixin.start();