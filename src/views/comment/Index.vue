<template>
  <div class="m-conbox">
    <div class="m-form">
      <form name="feedBackForm" method="post" action="" id="feedBackForm">
        <div class="m-feedback">
          <div class="form-item">
            <div class="form-label">选择服务类型</div>
            <div class="form-control form-radio">
              <label>
                <input type="radio" value="1" name="type" v-model="service_id"/>
                <i>故障申报</i>
              </label>
              <label>
                <input type="radio" value="2" name="type" v-model="service_id"/>
                <i>损坏举报</i>
              </label>
              <label>
                <input type="radio" value="3" name="type" v-model="service_id"/>
                <i>疑问咨询</i>
              </label>
            </div>
          </div>
          <div class="form-item">
            <div class="form-label">反馈内容</div>
            <div class="form-control">
              <textarea class="form-textarea" placeholder="填请输入反馈内容" v-model="content"></textarea>
            </div>
          </div>
          <div class="form-item">
            <div class="form-label">事发地点</div>
            <div class="form-control"><input class="form-input" type="text" placeholder="请输入事发地点" v-model="address"></div>
          </div>
          <div class="form-item">
            <div class="form-label">上传图片</div>
            <div class="form-control ">
              <div class="pic upload"><input type="file" accept="image/jpg,image/jpeg,image/png,image/gif"></div>
              <div v-for="item in photos">
                <img class="pic" src="assets/images/logo.png" />
              </div>
            </div>
          </div>
        </div>
        <div class="form-btn">
          <input class="btn" type="submit" value="提交反馈" id="feedBackForm-btn" />
        </div>
      </form>
  </div>
    <!--<div class="album">-->
      <!--<label>上传照片</label>-->
      <!--<image-html5-upload ></image-html5-upload>-->
    <!--</div>-->
  </div>
</template>

<script>
  import Request from '../../assets/js/request.js'
//  import pic from './pic'

  export default {
//    components:{
//      'image-html5-upload': pic,
//    },
    data() {
      return {
        service_id: 0,
        content: '',
        address: "",
        photos: [],
        imgList: [],
      }
    },
    methods: {},
    mounted() {
      console.log('Component mounted.')
    }
  }
</script>
<style scoped>

</style>
