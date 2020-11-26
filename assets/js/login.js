$(function(){
    // 点击去注册显示注册区
    $('#link_reg').on('click',function(){
        $('.login').hide()
        $('.reg').show()
        $('#form-login [name=username]').val('')
        $('#form-login [name=password]').val('')
    })
    // 点击去登录显示注册区
    $('#link_login').on('click',function(){
        $('.login').show()
        $('.reg').hide()
        $('#form-reg [name=username]').val('')
        $('#form-reg [name=password]').val('')
        $('#form-reg [name=repassword]').val('')
    })

    var form = layui.form
    var layer = layui.layer
    // 自定义验证规则
    form.verify({
        username: function(value, item){ //value：表单的值、item：表单的DOM对象
            if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
              return '用户名不能有特殊字符';
            }
            if(/(^\_)|(\__)|(\_+$)/.test(value)){
              return '用户名首尾不能出现下划线\'_\'';
            }
            if(/^\d+\d+\d$/.test(value)){
              return '用户名不能全为数字';
            }
        },
        pwd:[
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
        ],
        repwd:function(value){
            var pwd = $('.reg [name=password]').val()
            if(pwd !== value){
                return '两次密码输入不一致'
            }
        }
    })

    //监听注册事件
    $('#form-reg').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            type:'post',
            url:'/api/reguser',
            data:{
                username: $('#form-reg [name=username]').val(),
                password: $('#form-reg [name=password]').val()
            },
            success:function(res){
                if(res.status === 0){
                    layer.msg(res.message)
                    $('#link_login').click()
                    $('#form-reg [name=username]').val('')
                    $('#form-reg [name=password]').val('')
                    $('#form-reg [name=repassword]').val('')
                }else{
                    layer.msg(res.message)
                }
            }
        })
    })

    //监听登录事件
    $('#form-login').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            type:'POST',
            url:'/api/login',
            data:$(this).serialize(),
            success:function(res){
                if(res.status === 0){
                    layer.msg(res.message)
                    localStorage.setItem('token',res.token)
                    location.href = 'index.html'
                }else{
                    layer.msg(res.message)
                }
            }
        })
    })
})