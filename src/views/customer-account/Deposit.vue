<template>
  <div>
    <div class="m-conbox">
      <div class="tab">
        <a @click="routeTo('/account/withdraw')">押金提现</a>
        <a class="on" >押金充值</a>
      </div>
      <div class="m-form">
        <div class="m-wthdrawals">

          <div class="form-item" v-if="deposit_list.length==1">
            <label class="form-label">押金金额</label>
            <span class="form-val"><span class="unit">¥</span>{{deposit}}</span>
          </div>

          <div class="form-item" v-if="deposit_list.length>1" v-for="item in deposit_list">
            <label class="form-label">押金金额</label>
            <div class="form-radio">
              <label>
                <input type="radio" :value="item" name="deposit" v-model="deposit" />
                <i>{{item}}</i>
              </label>
            </div>
          </div>

        </div>
        <div class="form-tip"><i class="icon"></i>点击充值押金，代表已接受<span class="agree" @click="routeTo('/recharge-protocol')">《押金充值协议》</span></div>
        <div class="form-btn">
          <input class="btn" type="submit" value="充押金" id="chargeForm-btn" @click="submit"/>
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
    data() {
      return {
        entity : {},
        deposit : 29,
        deposit_list : []
      }
    },
    methods: {
      routeTo: function (url) {
        this.$router.push({path: url})
      },
      submit : function () {
        let self = this;
        s_layer.loading('请稍等...');
        Request.post('/api/customer-payment',{
//          amt : self.entity.deposit_cash,
          amt : self.deposit,
          payment_channel : 1,
          type : 2,
        },function (data) {
          s_layer.closeLoading();
          WxPay.pay(data.data.js_params, function () {
            self.paySuccess(data.data.order_id)
          });
        })
      },
      paySuccess : function (id) {
        let self = this;
        Request.get('/api/wechat/return/'+id,{},function () {
          self.routeTo('/map');
        })
      },
    },
    mounted() {
      let self = this;
      Request.get('/api/price',{},function (data) {
//        self.entity = data[0];
        self.deposit = data[0];
        self.deposit_list = data;
      })
    }
  }
</script>
<style scoped>

</style>
