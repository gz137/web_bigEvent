$(function(){
    var form = layui.form
    var layer = layui.layer

    form.verify({
        nickname:function(value){
            if(value.length > 6){
                return '昵称长度必须在1~6个字符之间！'
            }
        }
    })

    getUserInfo()

    //获取用户信息
    function getUserInfo(){
        $.ajax({
            type:'GET',
            url:'/my/userinfo',
            success:function(res){
                if(res.status === 0){
                    form.val('form_userinfo',res.data)
                }else{
                    layer.msg(res.message)
                }
            }
        })
    }

    // 重置
    $('#btnReset').on('click',function(e){
        e.preventDefault()
        getUserInfo()
    })

    //修改
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            type:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if(res.status === 0){
                    layer.msg(res.message)
                    window.parent.getUserInfo()
                }else{
                    layer.msg(res.message)
                }
            }
        })
    })
})





