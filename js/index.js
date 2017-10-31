$(function(){
	//解决移动端点击300ms延迟
	 FastClick.attach(document.body);

    //取消默认滚动
    function isPassive() {
        var supportsPassiveOption = false;
        try {
            addEventListener("test", null, Object.defineProperty({}, 'passive', {
                get: function() {
                    supportsPassiveOption = true;
                }
            }));
        } catch (e) {}
        return supportsPassiveOption;
    }
    
   document.addEventListener('touchmove', function(e) { e.preventDefault(); }, isPassive() ? {
        capture: false,
        passive: false
    } : false);


	//首页轮播
	var mySwiper = new Swiper ('.swiper-container', {
	    loop: true,
	    autoplay: 3000,    
	    // 如果需要分页器
	    pagination: '.swiper-pagination'
  	});        

	//图片懒加载
    // echo.init();

	//公告滚动
	(function(){
		var noticeh=$(".notice-list li").height();

		function topScroll(){
		    $(".notice-list").css({
		         "transform":"translate3d(0px, "+(-noticeh)+"px, 0px)",
		         "transition":"all 1s"
		    })

			setTimeout(function(){
		    	$(".notice-list li:first").appendTo($(".notice-list"));
		    	$(".notice-list").css({"transform":"translate3d(0,0,0)","transition":"all 0s"});
	    	},1000);

	    }

	    setInterval(topScroll,3000)
		
	})();


	//下拉搜索条固定

    var  myScroll = new IScroll("#wrapper", {
        scrollbars: true,
        mouseWheel: true,
        interactiveScrollbars: true,
        fadeScrollbars: true,
        probeType: 3,// 像素级的触发scroll事件 
        preventDefault: false,
        preventDefaultException: {
            tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|A)$/
        }
    });


    var $swiper = $(".index-swiper")
    var swipeH = $swiper.height();

    myScroll.on("scroll", function() {
        if (Math.abs(this.y) >= swipeH) {
            $(".index-header").addClass("headfix");
            $(".index-header").insertBefore("#wrapper");
        }else{
            $(".index-header").removeClass("headfix");
            $(".index-header").insertBefore(".main");

        }

    });


    var uploading = true,
        downloading = true,
        page = 2,
        loadingStep = 0; //加载状态0默认，1显示加载状态，2执行加载数据，只有当为0时才能再次加载，这是防止过快拉动刷新  


    //下拉刷新和上拉加载
    myScroll.on("scroll",function() {
        if (this.y > 20 && loadingStep == 0) {
            if (!$(".pulldown-tips").length) {
                $('<div class="pulldown-tips"><i class="down-icon">↓</i>下拉可以刷新</div>').prependTo("#scroller");

            } else {
                $(".pulldown-tips").html("<i class='down-icon'>↓</i>下拉可以刷新");
            }
        }
        if (this.y >30 && loadingStep==0) { 
            //下拉刷新操作
            $(".pulldown-tips").html("<i class='up-icon'>↓</i>松开立即刷新").addClass("refresh");
                loadingStep=1;

        }else if(this.y < (this.maxScrollY + 30) && uploading){ //上拉加载
            
            $(".loadmoretip").html('<div class="loading"></div>加载中...');
            // beforePullUp();
        }
    });

    myScroll.on("scrollEnd",function() {
        //用户还没滑到显示松开立即刷新处时就松开手指,则应让滚动回到起始处 
        if(downloading && loadingStep==0 && $(".pulldown-tips").length){
            myScroll.scrollTo(0, 0, 0);
            $(".pulldown-tips").remove();
            loadingStep==1;
            return; 
        }
        if (downloading && loadingStep==1) {
            loadingStep = 2;  
            $(".pulldown-tips").html("<div class='loading'></div>正在刷新");
            setTimeout(function(){
                myScroll.scrollTo(0, -40, 300);
                // $(".pulldown-tips").remove();
                 $(".pulldown-tips").html('<i class="down-icon">↓</i>下拉可以刷新')
                 loadingStep = 0
            },1000);
            // beforePullDown();
        }
    });




    //服务广告
    new IScroll(".service-ad-wrap", {
        scrollX: true,
        scrollY: false,
        hScrollbar: false,
        vScrollbar: false,
        vScroll: false,
        scrollbars: false,
        mouseWheel: true,
        interactiveScrollbars: true,
        fadeScrollbars: true,
        preventDefault: false,
        preventDefaultException: {
            tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|A)$/
        }
});



    //自选服务编辑
    $("#edit").click(function(){
        var $this=$(this);
        if($this.text()=="编辑"){ 
        	$("#service-list li").not(":last-child").append("<i class='iconfont icon-cut'><i>");
            $(this).html('<i class="iconfont icon-edit"></i>完成');
            return;
        }
        $("#service-list li").find(".icon-cut").remove();
        $(this).html('<i class="iconfont icon-edit"></i>编辑');

    });

    $("#service-list").on("click","li",function(){
    	var $this = $(this);
    	if($this.find(".icon-cut").length){
    		$this.remove();
    		
    	}

    })

   //推荐服务下方的查看全部
   $(".view-all").click(function(){
        layer.open({
            content: "敬请期待",
            className: 'validate-popup',
            skin: 'msg',
            time: 2//2秒后自动关闭
        });
   });




});
