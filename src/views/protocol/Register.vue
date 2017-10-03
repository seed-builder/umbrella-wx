<template>
  <div v-html="content"> </div>
</template>

<script>
  import Request from '../../assets/js/request.js'
  export default {
    data: function () {
      return {
        content: "",
      }
    },
    created: async function(){
      const result = await Request.asyncGet('/api/sys-config/get-by-name/register_protocol',{});
//      console.log(result);
      const data = result.data;
      if(data) {
        this.content = data.value;
      }
    },
  }
</script>
