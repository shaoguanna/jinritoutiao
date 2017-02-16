$(function(){
	//显示隐藏部分
	$('.header .left').tap(function(){
		$('#xinfeng').show();
	})
	$('#xinfeng .close-btn').tap(function(){
		$('#xinfeng').hide();
	})
	$('.fix2').tap(function(){
		$('#hongbao').show();
	})
	$('#hongbao .close-btn').tap(function(){
		$('#hongbao').hide();
	})
	$('.fix3 .close-btn').tap(function(){
		$('.fix3').hide();
	})
	
	/*刷新页面*/
		$('#rel').tap(function(){
			location.reload()
		})
		
	//导航拖拽
	var x=0;
	var y=0;	
	$('.nav2').on('touchstart',function(ev){
			var disX=ev.targetTouches[0].pageX-x;
			
			function fnMove(ev){
				x=ev.targetTouches[0].pageX-disX;
				if(x>0){x=0;}
				if(x<$('.nav1').width()-$('.nav2').width()){x=$('.nav1').width()-$('.nav2').width()-40}
				$('.nav2').css('-webkit-transform','translate('+x+'px)');
			}
			
			function fnEnd(){
				$('.nav2').off('touchmove',fnMove);
				$('.nav2').off('touchend',fnEnd);
			}
			
			$('.nav2').on('touchmove',fnMove);
			$('.nav2').on('touchend',fnEnd);
				
		})
	//选项卡
	var arr= ['__all__','video','news_hot','news_society','news_entertainment','news_military','news_tech','news_car'];
	$('#nav a').on('tap',function(){
		
			$('#nav a').removeClass('active');
			$('.cont .cont1').html('');
			
			$(this).addClass('active');	
			ajax(arr[$(this).index()],fnsucc)
		
	})
		
		//数据传输部分
		function ajax(tag,success) {
			$.ajax({
				url: 'http://m.toutiao.com/list/',
				dataType: 'jsonp',
				data: {
					'tag': tag,
					'ac':'wap',
					'count':20,
					'format':'json_raw',
					'as':'A1A528494D3D94A',
					'cp':'589DEDE9144ACE1',
					'min_behot_time':'1486828702'
				},
				success: success
			});
		}
		
		
		ajax('__all__',fnsucc)
		
		function fnsucc(str){
			var oOl=$('<ol class="list1 list" ></ol')
			oOl.prependTo('.cont1')
			
			 for(var i=0;i<8;i++){
				getLi(str.data[i]).prependTo('.list')
				
			 }
		}
		
		function getLi(str) {
			var oLi=''
			if(str.image_list.length){
				var oLi=$('<li> <a  href="'+str.display_url+'"><h3>1'+str.title+'</h3> <div class="img clearfix"><img src="'+str.image_list[0].url+'" alt=""/><img src="'+str.image_list[1].url+'" alt=""/><img src="'+str.image_list[0].url+'" alt=""/></div><div class="text"><span>'+str.source+'</span><span>   评论 '+str.comment_count+'</span><span>'+str.datetime+'</span></div></a></li>')	
			}else if(str.large_image_url){
				oLi=$('<li> <a class="clearfix" href="'+str.display_url+'"><div class="left"><h3>2'+str.title+'</h3><div class="text"><span>'+str.source+'</span><span>评论  '+str.comment_count+'</span><span>8分钟前</span></div></div> <div class="img1"> <img src="'+str.large_image_url+'" alt=""/> </div></a></li>')	
			}else if(str.image_url){
				oLi=$('<li> <a class="clearfix" href="'+str.display_url+'"><div class="left"><h3>3'+str.title+'</h3><div class="text"><span>'+str.source+'</span>  <span>评论  '+str.comment_count+'</span><span>8分钟前</span></div></div> <div class="img1"> <img src="'+str.image_url+'" alt=""/> </div></a></li>')
			}else{
				oLi=$('<li> <a  href="'+str.display_url+'"><h3>4'+str.title+'</h3> <div class="text"><span>头条回答</span>  <span>评论 '+str.comment_count+'</span><span>8分钟前</span></div></a></li>')	
			}
			if(str.video_style){
				oLi=$('<li> <a><div class="video"><img src="http://p3.pstatp.com/video1609/15b0000cdaff3fcf6f52" alt=""/><p>5'+str.title+'</p> <span class="video-btn"></span> </div> <div class="text"><span>'+str.source+'</span>  <span>评论 '+str.comment_count+'</span><span>8分钟前</span></div></a></li>')	
			}
			return oLi;
		}
		
		
		/*整体下拉*/
		$('.cont').on('touchstart',function(ev){
			var donwY=ev.targetTouches[0].pageY;
			var disY=ev.targetTouches[0].pageY-y;
			
			function fnMove(ev){
				var moveY=ev.targetTouches[0].pageY
				y=ev.targetTouches[0].pageY-disY;
				if(moveY-donwY>0){
					if(y>40){y=40}
					$('.cont').css('-webkit-transform','translate(0,'+y+'px)');
					$('.refresh').css('height','60px')
				}
			}
			
			function fnEnd(){
				$('.cont').off('touchmove',fnMove);
				$('.cont').off('touchend',fnEnd);
				$('.cont').css('-webkit-transform','translate(0,0px)');
				$('.refresh').css('height','0px');
				ajax('__all__',fnsucc)
			}
			
			$('.cont').on('touchmove',fnMove);
			$('.cont').on('touchend',fnEnd);
			
			return false;		
		})
	
})
