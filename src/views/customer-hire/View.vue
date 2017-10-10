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
    </div>
  </div>
</template>

<script>
  import Request from '../../assets/js/request.js'

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
    color:
  }

</style>
