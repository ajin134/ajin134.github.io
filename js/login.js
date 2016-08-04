/**
 * Created by jingying on 2016/7/17.
 */
$(function () {
    $('.codebtn').on('click', function () {
        var mobile = $('#exampleInputTel').val();
        var $btn=$(this);
        $.ajax({
            url:'getCode.php',
            data:{
                mobile:mobile
            },
            beforeSend: function () {
                if(!mobile){
                    $('.tips').html('请输入手机号码').fadeIn(300).delay(2000).fadeOut(300);
                    return false;
                }else if(!/1\d{10}/.test(mobile) || mobile.length > 11){
                    $('.tips').html('手机号码不正确').fadeIn(300).delay(2000).fadeOut(300);
                    return false;
                }
                if($btn.hasClass('disabled')){
                    return false;
                }
                $btn.val('正在发送中...').addClass('disabled');
            },
            success: function (data) {
                data.time=5;
                var time= parseInt(data.time);
                var timer = setInterval(function () {
                    time--;
                    $btn.val(time+'秒后再次获取').addClass('disabled');
                    if(time<=0){
                        clearInterval(timer);
                        $btn.val('获取验证码').removeClass('disabled');
                    }
                },1000);
            },
            error: function () {
                $('.tips').html('获取验证码失败').fadeIn(300).delay(2000).fadeOut(300);
                $btn.val('重新获取').removeClass('disabled');
            },
            complete: function () {
                console.log('complete');
            }
        });
    })
});