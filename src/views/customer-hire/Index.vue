<template>
  <div class="m-conbox m-order">
    <div v-if="!hasData">
      <div class="no-data">暂无数据</div>
    </div>
    <div v-else>
      <ul class="list" v-for="item in hires">
        <li @click="view(item.id)">
          <p class="time">{{item.created_at}}</p>
          <p>雨伞编号：{{item.umbrella.number}}</p>
          <p>起始位置：{{item.hire_site.name}}</p>
          <p>终点位置：{{item.return_site.name}}</p>
          <p>使用时长：{{formatTime(item.hire_hours)}}</p>
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
        hires: [],
        curPage: 0,
        hasMore: false,
      }
    },
    computed: {
      hasData: function () {
        return this.hires.length > 0;
      }
    },
    methods: {
      async getMore () {
        var url = '/api/customer-hire';
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
            this.hires.push(list[i]);
          }
          this.hasMore = result.data.count - result.data.list.length;
        }else{
          this.hasMore = false;
        }
      },
      formatTime(hours){
        var floor = Math.floor(hours);
        var minutes = Math.floor((hours - floor) * 60);
        var str = '';
        if( floor > 0 ){
          str += floor + '时';
        }
        if(minutes >= 0){
          str += minutes + '分'
        }
        return str;
      },
      view(id){
        this.$router.push('/hire/view/' + id);
      }
    },
    mounted() {
      this.getMore();

    }
  }
</script>
<style scoped>

</style>
