define(function(require, exports, module) {
    exports.map = function(){
        function _resize(){
            var wH = (document.documentElement.clientHeight || window.innerHeight || document.body.clientHeight) - 49;
            $('.m-index,.m-index .map').css({height: wH});
        }

        _resize();

        $(window).resize(function(){
            _resize();
        });
    }

    //手机倒计时方法
    exports.countDown = function (id, time) {
        var time = 59;
        $('#' + id).click(function () {
            var phone = $('#phone').val(),
                $btn = $(this);
            if (phone == undefined || phone == '') {
                layer.msg('请先填写手机号');
                return;
            }
            $btn.attr('disabled', 'disabled').val("发送中...");
            $.ajax({
                type: "get",
                url: '',
                data: {'phone': phone},
                dataType: 'json',
                success: function (data) {
                    if (data.code == '200') {
                        layer.msg('发送成功', function () {
                            var timer = setInterval(function () {
                                time--;
                                if (time < 0) {
                                    $btn.removeAttr('disabled').val("重新获取");
                                    clearInterval(timer);
                                    $('#' + id).attr('data-status', 0);
                                } else {
                                    $btn.val(time + "S");
                                }
                            }, 1000);
                        });
                    } else {
                        $('#reg-btn').removeAttr('disabled');
                        layer.msg(data.msg);
                    }
                }
            });
        })
    }

    // 手机验证登录
    exports.phoneLoginForm = function (form_id, btn) {
        require('validate');
        exports.phonecode('#phone', '#getSmsCode');
        var validator = $(form_id).validate({
            errorPlacement: function (error, element) {
                error.appendTo(element.parent());
            },
            errorElement: "em",
            success: 'valid',
            rules: {
                phone: {
                    required: true,
                    phone: true
                },
                valicode: {
                    required: true,
                    remote: {
                        url: '',  //验证码是否正确的请求地址   返回true与flase
                        type: "get",
                        dataType: 'json',
                        data: {
                            phone: function () {
                                return $("#phone").val();
                            },
                            valicode: function () {
                                return $("#valicode").val();
                            }
                        }
                    }
                }
            },
            messages: {
                phone: {
                    required: "手机号码不能为空",
                    phone: "手机格式错误"
                },
                valicode: {
                    required: "短信验证码不能为空",
                    remote: "短信验证码错误"
                }
            },
            submitHandler: function (form) {
                require("submitForm");
                $(btn).attr('disabled', 'disabled');
                $(form).ajaxSubmit({
                    type: "post",
                    dataType: 'json',
                    url:'',
                    success: function (data) {
                        if (data.code == 200) {
                            layer.msg('登录成功', function () {
                                window.location = "首页.html";
                            });
                        } else {
                            layer.msg(data.msg);
                        }
                        $(btn).removeAttr('disabled');
                    }
                });
                return false;
            }
        });
    }

    //手机验证码
    exports.phonecode = function (phoneId, getSmsId) {
        $(phoneId).blur(function () {
            var status = $(getSmsId).attr('data-status');
            if ($(this).hasClass('valid') && status == 0) {
                $(getSmsId).removeAttr('disabled');
            } else {
                $(getSmsId).attr('disabled', 'disabled');
            }
        })
    }

    //协议
    exports.showAgree = function(type,btn){
        var url,title;
        if (type=='reg') {
            url = 'file:///C:/Users/Administrator/Desktop/伞客新页面/伞客新/注册协议.html';
            title = '注册协议';
        }else if(type=='cashCharge'){
            url = 'file:///C:/Users/Administrator/Desktop/伞客新页面/伞客新/充值协议.html';
            title = '充值协议';
        }else if(type=='charge'){
            url = 'file:///C:/Users/Administrator/Desktop/伞客新页面/伞客新/押金充值协议.html';
            title = '押金充值协议';
        };
        $(btn).click(function(){
            layer.open({
                type: 2,
                title: title,
                shadeClose: true,
                shade: 0.8,
                area: ['90%', '80%'],
                content: url
            })
        })
        
    }

    // 保存用户信息
    exports.infoForm = function (form_id, btn) {
        require('validate');
        var validator = $(form_id).validate({
            errorPlacement: function (error, element) {
                error.appendTo(element.parent());
            },
            errorElement: "em",
            success: 'valid',
            rules: {
                birthday: {
                    required: true
                },
                address:{
                   required: true 
                }
            },
            messages: {
                birthday: {
                    required: "请选择生日"
                },
                address:{
                   required: "请填写地址"
                }
            },
            submitHandler: function (form) {
                require("submitForm");
                $(btn).attr('disabled', 'disabled');
                $(form).ajaxSubmit({
                    type: "post",
                    dataType: 'json',
                    url:'',
                    success: function (data) {
                        if (data.code == 200) {
                            layer.msg('保存成功');
                        } else {
                            layer.msg(data.msg);
                        }
                        $(btn).removeAttr('disabled');
                    }
                });
                return false;
            }
        });
    }

    // 现金充值
    exports.cashChargeForm = function (form_id, btn) {
        $(".money .item").click(function(){
            $(this).addClass("selected").siblings(".item").removeClass("selected");
        });

        $("input[name='money']").keyup(function () {
            $(this).val($(this).val().replace(/[^0-9.]/g, ''));
        });

        $(btn).click(function(){
            var price = $('.money .selected').attr('data-price');
            if(price=='' && $('[name=price]').val()==''){
                layer.msg('请输入充值金额');
                return;
            }

            if(price==''){
                price = $('[name=price]').val();
            }

            $.ajax({
                type: "post",
                url: "",
                data: {'price': price},
                dataType: 'json',
                success: function (data) {
                    if (data.code == '200') {
                        layer.msg('充值成功', function(){
                             window.location.href()
                        });
                    } else {
                        $btn.removeAttr('disabled');
                        layer.msg(data.msg);
                    }
                }
            })
        });
    }
})