<template>
  <div v-html="content">
  </div>
</template>

<script>
  //  import request from 'co-request';
  import Request from '../../assets/js/request.js'

  export default {
    data: function(){
      return {
        content: ''
      };
    },
    created: function () {
      var self = this;
      var id = this.$route.params.id;
      Request.get('/api/help/' + id, {}, function (data) {
        console.log(data);
        if (data){
          self.content = data.content;
        }
      });
    },
  }
</script>
<style scoped>

</style>
