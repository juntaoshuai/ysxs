$(function(){
    
    // 出现删除小图标
    $(".upload-list").on('click','img',function(){
        if(!$(this).next(".del-photo").length){
            $(this).parent().append("<span class='del-photo'>×</span>")
        }
    })
    
    //删除图片
    $(".upload-list").on('click','.del-photo',function(){
        var $this = $(this);
        //询问框
        layer.open({
            title: '提示信息'
            ,content: '您确定删除该图片吗？'
            ,btn: ['确定','取消']
            ,yes: function(index){
                $this.parent().remove();
                layer.close(index);
            }
        });
        
        
    })

    //toast使用jquery layer mobile 官网地址： http://layer.layui.com/mobile/
    //封装layer方法
    function myLayer(con) {
        layer.open({
            content: con,
            skin: 'msg',
            time: 2//2秒后自动关闭
        });
    
    }
    


    













});