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






});