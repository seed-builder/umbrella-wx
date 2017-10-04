<template>
  <div class="m-conbox">
    <div class="m-form">
      <form name="infoForm" method="post" action="" id="infoForm">
        <div class="m-info">
          <div class="form-item">
            <label class="form-label">微信昵称</label>
            <span class="form-val">怡少爷</span>
          </div>
          <div class="form-item">
            <label class="form-label">手机号</label>
            <span class="form-val">13800000000</span>
          </div>
          <div class="form-item">
            <label class="form-label">性别</label>
            <div class="form-radio">
              <label>
                <input type="radio" value="2" name="sex" checked/>
                <i>男</i>
              </label>
              <label>
                <input type="radio" value="1" name="sex"/>
                <i>女</i>
              </label>
            </div>
          </div>
          <div class="form-item">
            <label class="form-label">生日</label>
            <input class="form-input" name="birthday" id="data" placeholder="请选择生日日期">
            <label class="icon-arrow"></label>
          </div>
          <div class="form-item">
            <label class="form-label">地址</label>
            <input type="text" class="form-input" name="address" placeholder="请选择填写地址" />
          </div>
        </div>
        <div class="form-btn">
          <input class="btn" type="submit" value="保存" id="infoForm-btn" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
    },
    methods: {},
    mounted() {
      console.log('Component mounted.')
    }
  }
</script>
<style scoped>

</style>
