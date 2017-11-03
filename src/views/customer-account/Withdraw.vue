<template>
  <div>
    <div class="m-conbox">
      <div class="tab">
        <a class="on">押金提现</a>
        <a @click="routeTo('/account/deposit')">押金充值</a>
      </div>
      <div class="m-form">
        <div class="m-wthdrawals">
          <div class="form-item">
            <label class="form-label">总押金金额</label>
            <span class="form-val"><span class="unit">¥</span>{{account.total_deposit}}</span>
          </div>
          <div class="form-item">
            <label class="form-label">可提现押金</label>
            <span class="form-val"><span class="unit">¥</span>{{account.deposit}}</span>
          </div>
          <div class="form-price">
            <div class="form-label">提现金额</div>
            <div class="form-control"><input type="number" placeholder="请输入您要提现的金额" v-model="amt"><span class="unit">¥</span></div>
          </div>
        </div>
        <div class="form-tip"><i class="icon"></i>每个用户每天最多有三次提现次数</div>
        <div class="form-btn">
          <input class="btn" type="button" value="押金提现" @click="submit"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Request from '../../assets/js/request.js'
  import s_layer from "../../assets/js/s_layer";
  export default {
    data() {
      return {
        account : {},
        amt : ''
      }
    },
    methods: {
      init : function () {
        let self = this;
        Request.get('/api/customer-account/by-customer', {}, function (data) {
          self.account = data;
        })
      },
      routeTo: function (url) {
        this.$router.push({path: url})
      },
      submit : function () {
        let self = this;
        Request.post('/api/customer-withdraw', {
          'amt' : self.amt
        }, function (data) {
          s_layer.alert(data.msg);
        })
      }
    },
    mounted() {
      this.init();
    }
  }
</script>
<style scoped>

</style>
