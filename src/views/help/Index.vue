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
  import Request from '../../assets/js/request.js'

  export default {
    data: function(){
      return {
        helps: []
      };
    },
    created: async function () {
      const result = await Request.asyncGet('/api/help?page=1&pageSize=10&sort=sort%20asc',{});
//      console.log(result);
      const data = result.data;
      if(data.count > 0) {
        this.helps = data.list;
      }
    },
  }
</script>
<style scoped>

</style>
