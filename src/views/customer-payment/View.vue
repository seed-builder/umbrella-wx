<template>
  <div class="m-conbox m-order">
    <div v-if="!hasData">
      <div class="no-data">暂无数据</div>
    </div>
    <div v-else>
      <ul class="list">
        <li>
          <p>时间：{{entity.created_at}}</p>
          <p>订单编号：{{entity.sn}}</p>
          <p>金额：{{entity.amt}}</p>
          <p>流水类型：{{entity.type_name}}</p>
          <p>备注：{{entity.remark}}</p>
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
      var url = '/api/customer-payment/' + id;
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
