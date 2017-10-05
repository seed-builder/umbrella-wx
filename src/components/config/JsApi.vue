<template>
  <div>

  </div>
</template>

<script>
  import Request from '../../assets/js/request.js'

  export default {
    data(){
      return{

      }
    },
    methods: {},
    mounted() {
      let self = this;
      Request.get('/api/wechat/js-api-config',{
        url : location.href
      },function (data) {
        let config = data;
        wx.config({
          debug: false,
          appId: config.appId,
          timestamp:config.timestamp ,
          nonceStr: config.nonceStr,
          signature: config.signature,
          jsApiList: [
            'openEnterpriseChat',
            'openEnterpriseContact',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone',
            'startRecord',
            'stopRecord',
            'onVoiceRecordEnd',
            'playVoice',
            'pauseVoice',
            'stopVoice',
            'onVoicePlayEnd',
            'uploadVoice',
            'downloadVoice',
            'chooseImage',
            'previewImage',
            'uploadImage',
            'downloadImage',
            'translateVoice',
            'getNetworkType',
            'openLocation',
            'getLocation',
            'hideOptionMenu',
            'showOptionMenu',
            'hideMenuItems',
            'showMenuItems',
            'hideAllNonBaseMenuItem',
            'showAllNonBaseMenuItem',
            'closeWindow',
            'scanQRCode',
          ]
        });
      })
    }
  }
</script>
<style scoped>

</style>
