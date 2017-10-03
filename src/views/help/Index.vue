<template>
  <div>
    <div class="m-help">
      <ul>
        <li v-for="item in helps">
          <a :href="'/help/'+ item.id" :title="item.name">{{item.name}}<i class="arrow"></i></a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
//  import request from 'co-request';
import Request from '../../assets/js/request.js'

  export default {
    data: function(){
      return {
        helps: []
      };
    },
    created: function () {
      var self = this;
      Request.get('/api/help?page=1&pageSize=100', {}, function (data) {
          console.log(data);
          if (data.count > 0){
            self.helps = data.list;
          }
      });
    },
  }
</script>
<style scoped>

</style>
