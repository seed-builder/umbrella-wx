<template>
  <div>

  </div>
</template>

<script>
  import Request from '../../assets/js/request.js'

  export default {
//    mounted() {
//      console.log('Component mounted.')
//    },
    created: function () {
      let self = this;
      Request.get('/api/customer/login', {
        'code': self.$route.query.code
      }, function (data) {
        if(!data)
          return ;

        localStorage.token = data.token;
        localStorage.nickname = data.customer.nickname;
        localStorage.head_img_url = data.customer.head_img_url;
        localStorage.customer_id = data.customer.id;

        if (data.url){
          self.$router.push({path: data.url})
          return ;
        }

//        if (self.$route.query.state&&self.$route.query.state!='123') {
//          let state = self.$route.query.state;
//          let url = state.replace(/AA/g,'/');
//          self.$router.push({path: url})
//          return ;
//        }
        self.$router.push({path: '/map'})
      })
    },
  }
</script>
