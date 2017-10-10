<template>
  <div class="m-conbox m-order">
    <div v-if="!hasData">
      <div class="no-data">暂无数据</div>
    </div>
    <div v-else>
      <ul class="list">
        <li>
          <p class="time">租借费用：¥ {{formatMoney(entity.hire_amt)}} <span class="pull-right">{{entity.status_name}}</span></p>
          <p>借伞时间：{{entity.hire_at}}</p>
          <p>借伞网点：{{entity.hire_site.name}}</p>
          <p>还伞时间：{{entity.return_at}}</p>
          <p>还伞网点：{{entity.return_site.name}}</p>
          <p>最迟还伞时间：{{entity.expired_at}}</p>
          <p>押金：¥ {{formatMoney(entity.deposit_amt)}}</p>
        </li>
      </ul>
      <div class="m-form" v-if="entity.wait_pay">
        <div class="form-btn">
          <input class="btn" type="button" :value="'待支付'+formatMoney(entity.hire_amt)" @click="pay"/>
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
        entity:{},
        hasData: false,
      }
    },
    methods: {
      formatMoney(money){
        return parseInt(money);
      },
      pay(){
        s_layer.loading('请稍等...');
        Request.get('/api/customer-hire/pay/'+entity.id,{}
        ,function (data) {
          s_layer.closeLoading();
          if (data.data.js_params){
            WxPay.pay(data.data.js_params, function () {
              self.paySuccess(data.data.order_id)
            });
          }else {
            s_layer.alert('支付成功');
          }

        })
      }
    },
    async mounted() {
      var id = this.$route.params.id;
      var url = '/api/customer-hire/' + id;
      const res = await Request.asyncGet(url,null);
      if(res.success){
        this.entity = res.data;
        this.hasData = true;
      }
//      console.log('Component mounted.')
    }
  }
</script>
<style scoped>
  .pull-right{
    float:right;
  }

</style>
