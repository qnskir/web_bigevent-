$.ajaxPrefilter(function(options){
    //在发起真正的ajax请求之前统一拼接请求的根路径
    options.url = 'https://www.liulongbin.top:3007'+options.url
    
})