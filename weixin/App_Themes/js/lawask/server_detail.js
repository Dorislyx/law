
window.server_detail=(function(){
	var server = '',
		oid=getajax.getQueryString('id'),
		htm='',
		htn='',
		params = {};
		//对话
		$('#anser').click(function(){
			$('#bighide').css('display','block');
		});
		//取消对话
		$('#backmsg').click(function(){
			$('#bighide').fadeOut(100);
			$('#msgcon').val('');
		});
		//发送提问
		$('#sendmsg').click(function(){
			var _msgcon=$('#msgcon').val();
			if(_msgcon==''){
				getajax.showmsg('请输入提问的内容');
			}else{
				server ='Index/huifu';
				var _key=getajax.getsessionStorage('_key');
				params = {
					'u_id':_key,
				    'content':_msgcon,
					'id':oid
				};
				getajax.postAction(server,params,function(res){
					console.log('获取提问接口',res);
					if(res['code']=='1000'){
						$('#bighide').fadeOut(100);
						$('#msgcon').val('');
						getdialogue();
					}else{
						getajax.showmsg(res['message']);
					}
				},function(error){});
				
			}
		});
		//获取对话内容
		function getdialogue(){
			server = 'Index/duihua';
			var _key=getajax.getsessionStorage('_key');
			params = {
				'u_id':_key,
				'id':oid
			};
			getajax.postAction(server,params,function(res){
				console.log('获取对话接口',res);
				if(res['code']=='1000'){
					var data=res['data'];
					var duihualst=data['duihua'];
					$('.detail').text(data['content']);
					htm='';
					htn='';
					if(data['pic1']!=''){
						htm+='<li><img id="new_pic" src="'+getajax.http+data['pic1']+'" alt="" /></li>';
					}
					if(data['pic2']!=''){
						htm+='<li><img id="new_pic" src="'+getajax.http+data['pic2']+'" alt="" /></li>';
					}
					if(data['pic3']!=''){
						htm+='<li><img id="new_pic" src="'+getajax.http+data['pic3']+'" alt="" /></li>';
					}
					if(data['pic4']!=''){
						htm+='<li><img id="new_pic" src="'+getajax.http+data['pic4']+'" alt="" /></li>';
					}
					$('.new_pic').empty().append(htm);
					$(duihualst).each(function(k,v){
						var you_and_me=duihualst[k]['weiquserid'];
						if(you_and_me==0){
							htn+='<div class="left_he" ids="'+v['id']+'"><i></i>'+v['content']+'</div>';
						}else{
							htn+='<div class="right_me" ids="'+v['id']+'"><i></i>'+v['content']+'</div>';
						}
					});
					$('.dialog').empty().append(htn);
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
		myScroll = new iScroll('iScrollserver_detail', {
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
		getdialogue();
	}
	return{
		start:start
		
	};
})();
window.server_detail.start();
