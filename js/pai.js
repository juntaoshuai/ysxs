$(function () {
    //解决移动端点击300ms延迟
    FastClick.attach(document.body);

    //toast使用jquery layer mobile 官网地址： http://layer.layui.com/mobile/
    //封装layer方法
    window.myLayer = function (con) {
        layer.open({
            content: con,
            skin: 'msg',
            time: 2//2秒后自动关闭
        });

    }

    var $desc = $("#desc"),
        $worktype = $(".works-type"),
        $wordNum = $("#word-num");

    //统计字数
    $desc.on('input propertychange', function () {
        $wordNum.html($desc.val().length);
    })

    //清空定位
    $(".pai-location").on('click', '.icon-del', function () {
        $(this).remove();
        $("#baidu_geo").html("定位地点");
    });



    //表单验证
    $(".publish-btn").click(function () {
        if ($desc.val() == "") {
            myLayer("文字描述不能为空");
            return;
        }
        if ($desc.val().length > 500) {
            myLayer("超过最大字数");
            return;
        }

        if ($worktype.val() == "请选择作品分类") {
            myLayer("请选择作品分类")
            return;
        }

    });



    //取消默认滚动
    function isPassive() {
        var supportsPassiveOption = false;
        try {
            addEventListener("test", null, Object.defineProperty({}, 'passive', {
                get: function () {
                    supportsPassiveOption = true;
                }
            }));
        } catch (e) { }
        return supportsPassiveOption;
    }

    document.addEventListener('touchmove', function (e) { e.preventDefault(); }, isPassive() ? {
        capture: false,
        passive: false
    } : false);


    var myScroll = new IScroll("#wrapper", {
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



    var uploading = true,
        downloading = true,
        page = 2,
        loadingStep = 0; //加载状态0默认，1显示加载状态，2执行加载数据，只有当为0时才能再次加载，这是防止过快拉动刷新  


    //下拉刷新和上拉加载
    myScroll.on("scroll", function () {
        if (this.y > 20 && loadingStep == 0) {
            if (!$(".pulldown-tips").length) {
                $('<div class="pulldown-tips"><i class="down-icon">↓</i>下拉可以刷新</div>').prependTo("#scroller");

            } else {
                $(".pulldown-tips").html("<i class='down-icon'>↓</i>下拉可以刷新");
            }
        }
        if (this.y > 30 && loadingStep == 0) {
            //下拉刷新操作
            $(".pulldown-tips").html("<i class='up-icon'>↓</i>松开立即刷新").addClass("refresh");
            loadingStep = 1;

        } else if (this.y < (this.maxScrollY + 30) && uploading) { //上拉加载

            $(".loadmoretip").html('<div class="loading"></div>加载中...');
            // beforePullUp();
        }
    });

    myScroll.on("scrollEnd", function () {
        //用户还没滑到显示松开立即刷新处时就松开手指,则应让滚动回到起始处 
        if (downloading && loadingStep == 0 && $(".pulldown-tips").length) {
            myScroll.scrollTo(0, 0, 0);
            $(".pulldown-tips").remove();
            loadingStep == 1;
            return;
        }
        if (downloading && loadingStep == 1) {
            loadingStep = 2;
            $(".pulldown-tips").html("<div class='loading'></div>正在刷新");
            setTimeout(function () {
                myScroll.scrollTo(0, -40, 300);
                // $(".pulldown-tips").remove();
                $(".pulldown-tips").html('<i class="down-icon">↓</i>下拉可以刷新')
                loadingStep = 0
            }, 1000);
            // beforePullDown();
        }
    });





});