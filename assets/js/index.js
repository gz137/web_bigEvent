$(function(){
    var layer = layui.layer

    getUserInfo()

    $('#desc').on('click',function(){
        layer.confirm('确定要退出吗?', {icon: 3, title:'提示'}, function(index){
            // 清空本地存储中的token
            localStorage.removeItem('token')
            location.href = 'login.html'
            layer.close(index);
          });
    })
})

// 获取用户信息
function getUserInfo(){
    $.ajax({
        type:"GET",
        url:'/my/userinfo',
        success:function(res){
            if(res.status === 0){
                renderAvatar(res.data)
            }else{
                return layer.msg(res.message)
            }
        }
    })
}

// 渲染用户头像与名称
function renderAvatar(user){
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;'+name)

    if(user.user_pic === null){
        $('.layui-nav-img').hide()
        var regName = /[a-z]/
        if(regName.test(name[0])){
            var first = name[0].toUppercase()
        }else{
            var first = name[0]
        }
        $('.text-avatar').html(first).show()
    }else{
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avatar').hide()
    }
}