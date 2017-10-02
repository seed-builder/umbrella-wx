<template>
  <div>
    <div class="m-conbox m-login">
      <div class="logo"><img src="../../assets/images/logo.png" /></div>
      <div class="form">
        <form  name="phoneLoginForm" method="post" action="" id="phoneLoginForm">
          <div class="form-item">
            <i class="icon icon-phone"></i>
            <input class="form-input" type="tel" name="phone" placeholder="请输入手机号" id="phone" />
          </div>
          <div class="form-item">
            <i class="icon icon-code"></i>
            <input class="form-input" type="text" name="valicode" placeholder="请输入验证码" id="valicode" />
            <input type="button" class="form-code" id="getSmsCode" value="发送验证码" disabled="disabled" data-status="0">
          </div>
          <div class="form-btn">
            <input class="btn" type="submit" value="注册" id="loginForm-btn" />
          </div>
          <div class="form-tip">点击注册即同意<span class="agree">《用户注册协议》</span></div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    mounted() {
      console.log('Component mounted.')
    }
  }
</script>
