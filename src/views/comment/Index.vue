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
              <div class="pic upload"><input type="file" multiple accept="image/jpg,image/jpeg,image/png,image/gif" @change="onFileChange" /></div>
              <div v-for="image in images">
                <img class="pic" :src="image" />
              </div>
            </div>
          </div>
        </div>
        <div class="form-btn">
          <input class="btn" type="button" value="提交反馈" id="feedBackForm-btn" @click="submit" />
        </div>
      </form>
  </div>
  </div>
</template>

<script>
  import Request from '../../assets/js/request.js'

  export default {
    data() {
      return {
        service_id: 0,
        content: '',
        address: "",
        images: [],
        max: 4,
      }
    },
    methods: {
      onFileChange(e) {
        var files = e.target.files || e.dataTransfer.files;

        if (!files.length || (files.length+this.images.length) > this.max) return;
        this.createImage(files);
      },
      createImage(file) {
        if (typeof FileReader === 'undefined') {
          alert('您的浏览器不支持图片上传，请升级您的浏览器');
          return false;
        }
        var image = new Image();
        var vm = this;
        var leng = file.length;
        for (var i = 0; i < leng; i++) {
          var reader = new FileReader();
          reader.readAsDataURL(file[i]);
          reader.onload = function (e) {
            vm.images.push(e.target.result);
          };
        }
      },
      async saveImage(image, res_id){
        //photos: this.images,
        const res = await Request.asyncPost('/api/resource', {
          content: image,
          ext: 'base64',
          mimetype: 'base64',
          res_type: 'comment',
          res_id: res_id,
        });
      },
      async submit () {
        const vm = this;
        const res = await Request.asyncPost('/api/comment', {
          service_id: vm.service_id,
          content: vm.content,
          address: vm.address,
        });
        if(res.success){
          for(var idx in vm.images){
            this.saveImage(vm.images[idx], res.data.id);
          }
          this.$layer.toast({
            icon: 'icon-check', // 图标clssName 如果为空 toast位置位于下方,否则居中
            content: '提交成功',
            time: 2000 // 自动消失时间 toast类型默认消失时间为2000毫秒
          })
          window.setTimeout(function () {
            vm.$router.push('/map')
          }, 2000);
        }
      }
    },
  }
</script>
<style scoped>

</style>
