$(function () {
    //点击'去注册账号'的链接
    $('#form_login a').on('click', function () {
        $('.reg-box').show();
        $('.log-box').hide();


    })
    $('#form_reg a').on('click', function () {
        $('.reg-box').hide();
        $('.log-box').show();

    })
    //从layui中获取form layer对象
    var form = layui.form;
    var layer = layui.layer;
    //通过layui.form函数自定义校验规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // 校验两次输入的密码是否一致
        repwd: function (value) {
            //通过形参拿到的是确认密码框的内容
            //需要拿到密码框的内容
            //然后进行一次等于的判断
            //如果判断失败则return一个错误的提示消息即可
            var pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return '两次密码不一致';
            }
        }

    })

    //监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        $.post('/api/reguser',
            {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            },
            function (res) {
                if (res.status !== 0) {
                   layer.msg(res.message);
                }else {
                    layer.msg(res.message);
                }
                
                
            })
        
    })

    // 监听登录表单的提交事件
    $('#form_login').submit(function(e){
        // 阻止默认提交事件
        e.preventDefault();
        $.ajax({
            url:'/api/login',
            method:'POST',
            //快速获取表单中的数据
            data:$(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                   layer.msg(res.message);
                }
                    layer.msg(res.message);
                
                
                //将登陆成功得到的token字符串保存到localStorage
                localStorage.setItem('token',res.token)

                //跳转到后台主页
                location.href = '/index.html';
            }
            

        })


    })
})