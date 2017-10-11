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
          <div class="form-tip">点击充值，代表已接受<a class="agree" href="/recharge-protocol">《充值协议》</a></div>
          <div class="form-btn">
            <input class="btn" type="submit" value="充值" id="chargeForm-btn" @click="submit"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Request from '../../assets/js/request.js'
  import WxPay from '../../assets/js/wechat_pay.js'
  import s_layer from "../../assets/js/s_layer";

  export default {
    mounted() {
      this.init();
    },
    data() {
      return {
        account: {},
        recharge_amt: 5,
        custom_amt: 0,
        nickname : localStorage.nickname,
        pay_params : '',
        order_id : 0
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
      init : function () {
        let self = this;
        Request.get('/api/customer-account/by-customer', {}, function (data) {
          self.account = data;
        })
      },
      amtItemSelect: function (amt) {
        this.custom_amt = 0;
        this.recharge_amt = amt;
      },
      routeTo: function (url) {
        this.$router.push({path: url})
      },
      submit : function () {
        let self = this;
        s_layer.loading('请稍等...');
        Request.post('/api/customer-payment',{
          amt : self.recharge_amt,
          payment_channel : 1,
          type : 1,
        },function (data) {
          s_layer.closeLoading();
          WxPay.pay(data.data.js_params, function () {
            self.paySuccess(data.data.order_id)
            self.init();
          });
        })
      },
      paySuccess : function (id) {
        Request.get('/api/wechat/return/'+id,{})
      }
    },
  }
</script>
<style scoped>
  .agree{
    color: #f4c527
  }
</style>
