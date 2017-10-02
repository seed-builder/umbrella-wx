<template>
  <div>
    <div class="m-conbox">
      <div class="m-form">
        <div class="m-package">
          <div class="form-item">
            <label class="form-label">微信昵称</label>
            <span class="form-val">怡少爷</span>
          </div>
          <div class="form-item">
            <label class="form-label">可用金额</label>
            <span class="form-val"><span class="unit">¥</span>0.00</span>
          </div>
          <div class="form-item">
            <a href="">
              <label class="form-label">总押金金额</label>
              <span class="form-val"><span class="unit">¥</span>0.00</span>
              <label class="icon-arrow"></label>
            </a>
          </div>
          <div class="form-item">
            <a href="">
              <label class="form-label">优惠券</label>
              <span class="form-val"><span class="unit">¥</span>0.00</span>
              <label class="icon-arrow"></label>
            </a>
          </div>
        </div>
        <div class="m-charge">
          <h2>充值金额</h2>
          <div class="money">
            <span class="item selected" data-price="5">充5元</span>
            <span class="item" data-price="10">充10元</span>
            <span class="item" data-price="15">充15元</span>
            <span class="item" data-price=""><input type="text" name="price" placeholder="其他金额"></span>
          </div>
          <div class="form-tip">点击充值，代表已接受<span class="agree">《充值协议》</span></div>
          <div class="form-btn">
            <input class="btn" type="submit" value="充值" id="chargeForm-btn" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    methods: {},
    mounted() {
      console.log('Component mounted.')
    }
  }
</script>
<style scoped>

</style>
