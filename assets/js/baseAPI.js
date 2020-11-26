// 每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，会先调用 ajaxPrefilter 这个函数
$.ajaxPrefilter(function(options){
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url

    //要权限的接口才需要加headers请求头
    if(options.url.indexOf('/my/') !== -1){
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 全局统一挂载complete回调函数
    // 无论成功或是失败皆会执行
    options.complete = function(res){
        if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
            localStorage.removeItem('token')
            location.href = 'login.html'
        }
    }
})