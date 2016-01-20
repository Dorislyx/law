
window.wq_orderdetail=(function(){
	var server = '',
		oid=getajax.getQueryString('id'),
		params = {};
	$('.weixin_pay>i').click(function(){
		$(this).toggleClass('this');
	});
	
	$('.pay_btn').click(function() {
		$('.bighide').fadeIn(200);			
	});
	
		//获取订单信息
		function  orderinfo(){
			server = 'Index/weiquanfuwu_';
			var _key=getajax.getsessionStorage('_key');
			params = {
				'u_id':_key,
				'id':oid
			};
			getajax.postAction(server,params,function(res){
				console.log('获取订单详情',res);
				if(res['code']=='1000'){
					var data=res['data'];
					var typestatus=data['paystatus'];
					var _ordercode=data['ordercode'];
					var _money=parseFloat(data['money']);
					$('#zxcon').text(data['content']);
					$('#zxclassify').text(data['classname']);
					$('#zx_money').text(_money+'元');
					if(typestatus==126){
						$('#pay_box').css('display','block');
						if(_money>0){
							$('.pay_btn').css('background-color','#38b8fd');
							$('.pay_btn').click(function(){
								var selecked=$('.weixin_pay>i').hasClass('this');
								if(!selecked){
									window.location.href='http://weiq.bjqttd.com/index.php/api/Index/g_weixinzhifu?ordercode='+_ordercode+'&money='+_money+'';
								}else{
									getajax.showmsg('请勾选微信支付');
								}

							});
						}else{
							//console.log(12233)
							$('.pay_btn').css('background-color','#ddd');
						}
					}else{
						$('#pay_box').css('display','none');
						
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
		myScroll = new iScroll('iScrollwq_orderdetail', {
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
		orderinfo();
	}
	return{
		start:start
	};
})();
window.wq_orderdetail.start();
