<template>
  <div class="m-conbox m-order">
    <div v-if="!hasData">
      <div class="no-data">暂无数据</div>
    </div>
    <div v-else>
      <ul class="list" v-for="item in payments">
        <li @click="view(item.id)">
          <p class="time">{{item.created_at}}</p>
          <p>订单编号：{{item.sn}}</p>
          <p>交易金额：¥{{item.amt}}</p>
          <p>订单类别：{{item.type_name}}</p>
          <p>支付渠道：{{item.channel_name}}</p>
        </li>
      </ul>
      <div v-if="hasMore">
        <a class="m-more" @click="getMore">加载更多</a>
      </div>
    </div>
  </div>
</template>

<script>
  import Request from '../../assets/js/request.js'

  export default {
    data() {
      return {
        payments: [],
        curPage: 0,
        hasMore: false,
      }
    },
    computed: {
      hasData: function () {
        return this.payments.length > 0;
      }
    },
    methods: {
      getMore: async function () {
        var url = '/api/customer-payment';
        this.curPage ++;
        var data = {
          page: this.curPage,
          pageSize: 10,
          sort: 'id desc',
        };
        var result = await Request.asyncGet(url, data);
        if(result.data.list.length > 0){
          const list = result.data.list;
          for(var i = 0; i < list.length; i++){
            this.payments.push(list[i]);
          }
          this.hasMore = result.data.count - result.data.list.length;
        }else{
          this.hasMore = false;
        }
      },
      view(id){
        this.$router.push('/payment/view/' + id);
      }
    },

    mounted() {
      this.getMore();
    }
  }
</script>
<style scoped>

</style>
