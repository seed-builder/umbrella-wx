<template>
  <div id="app">
    <wx-config></wx-config>

    <router-view keep-alive></router-view>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Request from './assets/js/request.js'

  import WxConfig from "./components/config/JsApi";
  Vue.component('wx-config', WxConfig);

  export default {
    name: 'app',
    mounted() {

    }
  }
</script>

<style lang="css">
  /*@import "./assets/js/layer/theme/layer.css";*/
  @import "./assets/css/style-1.css";
  .layui-m-layer2 .layui-m-layercont{
    line-height: 20px !important;
  }
</style>
