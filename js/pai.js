$(function () {

    // 出现删除小图标
    $(".upload-list").on('click', 'img', function () {
        if (!$(this).next(".del-photo").length) {
            $(this).parent().append("<span class='del-photo'>×</span>")
        }
    })

    //删除图片
    $(".upload-list").on('click', '.del-photo', function () {
        var $this = $(this);
        //询问框
        layer.open({
            title: '提示信息'
            , content: '您确定删除该图片吗？'
            , btn: ['确定', '取消']
            , yes: function (index) {
                $this.parent().remove();
                $("#filePicker").show();
                layer.close(index);
            }
        });


    })

    //toast使用jquery layer mobile 官网地址： http://layer.layui.com/mobile/
    //封装layer方法
    window.myLayer = function(con) {
        layer.open({
            content: con,
            skin: 'msg',
            time: 2//2秒后自动关闭
        });

    }





    
    var $desc = $("#desc"),
        $worktype = $(".works-type"),
        $wordNum=$("#word-num");
    
    //统计字数
    $desc.on('input propertychange',function(){
        $wordNum.html($desc.val().length);
    })

    //表单验证
    $(".publish-btn").click(function(){
        if($desc.val() == "") {
            myLayer("文字描述不能为空");
            return;
        }
        if($desc.val().length > 500){
            myLayer("超过最大字数");
            return;
        }
        
        if($worktype.val() == "请选择作品分类"){
            myLayer("请选择作品分类")
            return;
        }
        


    });


    











});