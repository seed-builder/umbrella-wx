<template>
  <div>
    <div class="m-conbox m-login">
      <div class="logo"><img src="../../assets/images/logo.png" /></div>
      <div class="form">
        <form  name="phoneLoginForm" method="post" action="" id="phoneLoginForm">
          <div class="form-item">
            <i class="icon icon-phone"></i>
            <input class="form-input" type="tel" name="phone" placeholder="请输入手机号" id="phone" v-model="phone" />
          </div>
          <div class="form-item">
            <i class="icon icon-code"></i>
            <input class="form-input" type="text" name="valicode" placeholder="请输入验证码" id="valicode" v-model="valicode" />
            <input type="button" class="form-code" id="getSmsCode" :value="btnContent" :disabled="!smsEnabled" data-status="0" @click="getSmsCode">
          </div>
          <div class="form-btn">
            <input class="btn" type="button" value="注册" id="loginForm-btn" @click="doRegister" :disabled="!regEnabled"/>
          </div>
          <div class="form-tip">点击注册即同意<span class="agree" @click="gotoProtocol">《用户注册协议》</span></div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import Request from '../../assets/js/request.js'

  export default {
    data: function () {
      return {
        phone: '',
        valicode: '',
        smsEnabled: false,
        regEnabled: false,
        btnContent: '发送验证码',
      }
    },
    watch:{
      phone: function () {
        this.smsEnabled = /^[0-9]{11}$/.test(this.phone);
      },
      valicode: function () {
        this.regEnabled = this.valicode.length > 0;
      }
    },
    methods: {
      gotoProtocol(){
        this.$router.push({path: '/register-protocol'});
      },
      async getSmsCode(){
        ///api/utl/sms-verify
        var vm = this;
        var time = 59;
        const result = await Request.asyncPost('/api/utl/sms-verify', {phone: this.phone});
        if(result.success){
          this.toast('发送成功');
          vm.smsEnabled = false;
          var timer = setInterval(function () {
            time--;
            if (time < 0) {
              vm.smsEnabled = true;
              vm.btnContent = '重新获取';
              clearInterval(timer);
            } else {
              vm.btnContent = time + " s";
            }
          }, 1000);
        }else{
          this.toast('发送失败');
        }
      },
      async doRegister(){
        ///api/customer/
        const verify = await Request.asyncPost('/api/utl/check-verify', {phone: this.phone, code: this.valicode});
        if(verify.success) {
          const result = await Request.asyncPost('/api/customer/0', {mobile: this.phone});
          if (result.success) {
            this.$router.push({path: '/map'});
          }
        }else{
          this.toast('验证码错误');
        }
      },
      toast(msg){
        this.$layer.toast({
          icon: 'icon-check', // 图标clssName 如果为空 toast位置位于下方,否则居中
          content: msg,
          time: 2000 // 自动消失时间 toast类型默认消失时间为2000毫秒
        })
      },
    }
  }
</script>
