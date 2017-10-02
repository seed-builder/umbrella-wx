<template>
  <div>
    <div class="m-conbox">
      <div class="m-form">
        <div class="m-package">
          <div class="form-item">
            <label class="form-label">微信昵称</label>
            <span class="form-val">{{nickname}}</span>
          </div>
          <div class="form-item">
            <label class="form-label">可用金额</label>
            <span class="form-val"><span class="unit">¥</span>{{account.balance_amt}}</span>
          </div>
          <div class="form-item" @click="routeTo('/account/deposit')">
            <a>
              <label class="form-label">总押金金额</label>
              <span class="form-val"><span class="unit">¥</span>{{account.total_deposit}}</span>
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
            <span class="item" :class="custom_amt==0&&recharge_amt==5?'selected':''" @click="amtItemSelect(5)">充5元</span>
            <span class="item" :class="custom_amt==0&&recharge_amt==10?'selected':''" @click="amtItemSelect(10)">充10元</span>
            <span class="item" :class="custom_amt==0&&recharge_amt==15?'selected':''" @click="amtItemSelect(15)">充15元</span>
            <span class="item" :class="custom_amt>0?'selected':''" >
              <input type="text" name="price" placeholder="其他金额" v-model="custom_amt">
            </span>
          </div>
          <div class="form-tip">点击充值，代表已接受<span class="agree">《充值协议》</span></div>
          <div class="form-btn">
            <input class="btn" type="submit" value="充值" id="chargeForm-btn"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Request from '../../assets/js/request.js'

  export default {
    mounted() {
      let self = this;
      Request.get('/api/customer-account/get', {}, function (data) {
        self.account = data;
      })
    },
    data() {
      return {
        account: {},
        recharge_amt: 5,
        custom_amt: 0
      }
    },
    watch: {
      custom_amt: function () {
        if (this.custom_amt <= 0)
          return

        this.recharge_amt = this.custom_amt;
      }
    },
    methods: {
      amtItemSelect: function (amt) {
        this.custom_amt = 0;
        this.recharge_amt = amt;
      },
      routeTo: function (url) {
        this.$router.push({path: url})
      },
    },
  }
</script>
<style scoped>

</style>
