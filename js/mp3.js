$(document).ready(function(){
	
//定义所有变量
	var $audio=$("#audio")
	var audio=$("#audio").get(0);
	var play=$("#div .play");

	var current=$("#div .current-time");
	var duration=$("#div .duration");

	var prev=$("#div .prev");
	var next=$("#div .next");

	var xinxi=$(".xinxi")[0];
	var lists=$("#lists");

	var pic=$(".pic");
	// console.log(pic)
	var music_name=$(".music_name")[0];
	var music_author=$(".music_author")[0];

	var progress=$("#div .progress");
	var pI=$(".p-i");
	var volume=$(".volume");
	var mute=$(" .mute");
	var vI=$(".v-i");
	
	// 选项卡
	xinxi.onclick=function(){
	        lists.toggleClass("xian")
	}

	// musics
	var musics=[{name:"Steerner",author:"aaa",src:"song/Steerner.mp3",img:"img/Steerner.jpg"},
	{name:"冬天的秘密",author:"bbb",src:"song/冬天的秘密.mp3",img:"img/dongtian.jpg"},
	{name:"惊鸿一面",author:"ccc",src:"song/惊鸿一面.mp3",img:"img/jinghong.jpg"},
	{name:"旋转黑白",author:"ddd",src:"song/旋转黑白.mp3",img:"img/xuanzhuan.jpg"}]
	
	var index=3;

	function render(){
		$("#lists").empty();
		$.each(musics,function(i,v){
			var c=(i===index)?"active":"";
			$('<li class=" ' +c+' "><span class="music_name">'+v.name+'</span><span class="music_author">'+v.author+'</span></li>').appendTo("#lists")
		})
	}

	//显示歌名+歌手+图片
	music_name.innerHTML = musics[index].name;
    	music_author.innerHTML = musics[index].author;
    	pic.css({
		background: 'url(' +musics[index].img+ ')',
		'background-size': 'cover'
	});
	
	$("#lists").on("click","li",function(){
		$("#lists").find("li").removeClass("active");
		$(this).addClass("active");
		index=$(this).index();
		audio.src=musics[index].src;
		music_name.innerHTML = musics[index].name;
        		music_author.innerHTML = musics[index].author;
        		pic.css({
			background: 'url(' +musics[index].img+ ')',
			'background-size': 'cover'
		});
        		
		audio.play();
	})
	//顺序循环
            $(audio).on('ended', function() {
                $('#lists').find('li').removeClass('active')
                index += 1
                if(index > musics.length - 1) {
                    index = 0
                }
                $('#lists li').eq(index).addClass('active')
                audio.src = musics[index].src;
                music_name.innerHTML = musics[index].name;
                music_author.innerHTML = musics[index].author;
		pic.css({
			background: 'url(' +musics[index].img+ ')',
			'background-size': 'cover'
		});
                audio.play()
            })
	
	render();

	


    	//所有事件
    	$audio.on("loadstart",function(){

    	})
    	$audio.on("progress",function(){
    		
    	})
    	$audio.on("canplay",function(){
    		
    	})
    	$audio.on("play",function(){
    		
    	})
    	$audio.on("pause",function(){
    		
    	})
    	$audio.on("ended",function(){
    		
    	})
    	$audio.on("timeupdate",function(){
    		
    	})
    	
    	//上一曲
	prev.on('click', function () {
	        index--;
	        if (index < 0) {
	            index = musics.length - 1;
	        }

	        $("#lists").find('li').removeClass('active');
	        $("#lists").find('li').eq(index).addClass('active');
			audio.src=musics[index].src;
	        music_name.innerHTML = musics[index].name;
	        music_author.innerHTML = musics[index].author;
	        pic.css({
			background: 'url(' +musics[index].img+ ')',
			'background-size': 'cover'
		});
	        audio.play();
	    })
	    //下一曲
	next.on('click', function () {
	        index++;
	        if (index >= musics.length) {
	            index = 0;
	        }

	        $("#lists").find('li').removeClass('active');
	        $("#lists").find('li').eq(index).addClass('active');
			audio.src=musics[index].src;
	        music_name.innerHTML = musics[index].name;
	        music_author.innerHTML = musics[index].author;
	        pic.css({
			background: 'url(' +musics[index].img+ ')',
			'background-size': 'cover'
		});
	        audio.play();
	    })

	//暂停+播放
	play.on("click",function(){
		if(audio.paused){
			audio.play();
			play.html("&#xe96b;");
		}else{
			audio.pause();
			play.html("&#xe609;");
		}
	})

	// 运行+总时间
	function format(v){
		v=Math.floor(v);
		var s=v%60;
		s=(s<10)?("0"+s):s;
		
		var m=Math.floor(v/60);
		return m+":"+s;
	}
	audio.oncanplay=function(){
		duration.html(format(audio.duration))
	}
	//运行时间
	$(audio).on("timeupdate",function(){

		current.html(format(audio.currentTime));
		var left=(progress.width()*audio.currentTime/audio.duration-pI.width()/2).toFixed(2)+"px";		

		pI.css("left",left);
	})
	// pl.on("click",false);
 

	progress.on("click",function(e){
		
		audio.currentTime=e.offsetX/progress.width()*audio.duration;

		// console.log(audio.currentTime)
	});
	// pI.on("click",function(e){
	// 	e.stopPropagation();
	// })
	//进度条拖拽
	
	pI.on("mousedown",function(e){
		
		e.preventDefault();
		var r=pI.width()/2;
		
		var start=r-e.offsetX;
		$(document).on("mousemove",function(e){
			var left=e.clientX-progress.position().left +start;
			var aa=left/progress.width()*audio.duration;
			// console.log(aa)
			
			if(aa>=audio.duration||aa<=0){
				return ;
			}
			audio.currentTime=aa;
		})
		return false;
	})


	$(document).on("mouseup",function(){
		$(document).off("mousemove")
	});

	//声音
	// vI.on("click",function(e){
	// 	e.stopPropagation();
	// })
	volume.on("click",function(e){
		audio.volume=e.offsetX/volume.width();
		mute.removeAttr("data-v");
	})
	// 静音
	mute.on("click",function(){
		if($(this).attr("data-v")){
			audio.volume=$(this).attr("data-v");
			$(this).removeAttr("data-v");
		}else{
			$(this).attr("data-v",audio.volume);
			audio.volume=0;
		}
	})
	$(audio).on("volumechange",function(){
		vI.css("left",volume.width()*audio.volume-vI.width()/2+"px");
	})
	   	// vl.on("touchend",false);


	//音量拖拽
	vI.on("mousedown",function(e){
		console.log(1)
		e.preventDefault();
		var r=vI.width()/2;
		
		var start=r-e.offsetX;
		$(document).on("mousemove",function(e){
			var left=e.clientX-volume.position().left +start;
			var a=left/volume.width();
			// console.log(a)
			if(a>1||a<0){
				return ;
			}
			audio.volume=a;
		})
		return false;
	})


	 
        
})