<template>
  <div class="m-conbox">
    <div class="m-form">
      <div class="form-logo"><img :src="customer.head_img_url"></div>
      <form name="infoForm" method="post" action="" id="infoForm">
        <div class="m-info">
          <div class="form-item">
            <label class="form-label">微信昵称</label>
            <span class="form-val">{{customer.nickname}}</span>
          </div>
          <div class="form-item">
            <label class="form-label">手机号</label>
            <span class="form-val">{{customer.mobile}}</span>
          </div>
          <div class="form-item">
            <label class="form-label">性别</label>
            <div class="form-radio">
              <label>
                <input type="radio" value="1" name="sex" v-model="customer.gender"/>
                <i>男</i>
              </label>
              <label>
                <input type="radio" value="2" name="sex" v-model="customer.gender"/>
                <i>女</i>
              </label>
            </div>
          </div>
          <div class="form-item">
            <label class="form-label">生日</label>
            <input class="form-input" name="birthday" id="data" placeholder="请选择生日日期" v-model="customer.birth_day">
            <label class="icon-arrow"></label>
          </div>
          <div class="form-item">
            <label class="form-label">地址</label>
            <input type="text" class="form-input" name="address" placeholder="请选择填写地址" v-model="customer.address"/>
          </div>
        </div>
        <div class="form-btn">
          <input class="btn" type="button" value="保存" id="infoForm-btn" @click="submit"/>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import Request from '../../assets/js/request.js'
  import LCalendar from '../../assets/js/LCalendar'

  export default {
    data() {
      return {
        customer: {}
      }
    },
    methods: {
      init () {
        $("#data").focus(function(){
          document.activeElement.blur();
        });
        var calendar = new LCalendar();
        calendar.init({
          'trigger': '#data',//标签id
          'type': 'date'
        });
      },
      async getInfo(){
        const url = '/api/customer/info';
        const result = await Request.asyncGet(url, {});
        if(result.success){
          this.customer = result.data;
          this.customer.birth_day = this.customer.birth_day.replace(/ 00:00:00/gm,'')
        }
      },
      async submit(){
        const url = '/api/customer/' + this.customer.id;
        const result = await Request.asyncPost(url, this.customer);
        if(result.success){
          this.$layer.toast({
            icon: 'icon-check', // 图标clssName 如果为空 toast位置位于下方,否则居中
            content: '保存成功',
            time: 2000 // 自动消失时间 toast类型默认消失时间为2000毫秒
          })
        }
      }
    },
    mounted() {
      this.init();
      this.getInfo();
    }
  }
</script>
<style scoped>

</style>
