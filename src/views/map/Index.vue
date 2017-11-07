<template>
  <div>
    <div class="m-index">
      <div class="m-conbox">
        <div id="map" class="map"></div>
        <a @click="showSidebar()" class="account" title="我的个人信息"></a>
        <a @click="location()" class="location" title="定位"></a>
        <a @click="unlock()" class="scan" href="#" title="扫描"></a>
        <a @click="routeTo('/help')" class="kf" title="客服"></a>
      </div>
    </div>
    <div class="m-show">
      <div class="content" v-show="show_select">
        <div class="box">
          <a href="#">共享伞解锁</a>
          <a class="red" @click="scan()">扫码借伞</a>
        </div>
        <div class="box">
          <a class="blue" @click="input">手动输入</a>
        </div>
      </div>
      <div class="form" v-show="show_unlock">
        <input type="text" v-model="umbrella_number" placeholder="请输入伞柄上的数字">
        <input type="submit" value="立即用伞" @click="inputUnlock">
      </div>
    </div>
    <div class="m-menu" id="page-menu">
      <div class="logo"><img :src="head_img"></div>
      <div class="name">{{nickname}}</div>
      <ul>
        <li><a @click="routeTo('/customer')">个人资料<i class="icon icon-01"></i><i class="arrow"></i></a></li>
        <li><a @click="routeTo('/account')">我的钱包<i class="icon icon-02"></i><i class="arrow"></i></a></li>
        <li><a @click="routeTo('/payment')">资金记录<i class="icon icon-03"></i><i class="arrow"></i></a></li>
        <li><a @click="routeTo('/hire')">用伞记录<i class="icon icon-04"></i><i class="arrow"></i></a></li>
        <li><a @click="routeTo('/comment')">我要反馈<i class="icon icon-05"></i><i class="arrow"></i></a></li>
        <li><a @click="routeTo('/help')">帮助中心<i class="icon icon-06"></i><i class="arrow"></i></a></li>
      </ul>
    </div>
    <div class="mask" @click="hideMask()"></div>

    <div id="info-window" style="display: none">
      <div class="amap-ui-smp-ifwn-container info">
        <a class="amap-ui-infowindow-close amap-ui-smp-ifwn-def-tr-close">&#10006;</a>
        <div class="amap-ui-smp-ifwn-content-body">
          <div class="info-title">
            <i class="iconfont icon-house"></i> <%= site_name %>
          </div>
          <hr>
          <div class="info-text">
            <p><i class="iconfont icon-san"></i> 可用雨伞 <span class="have-count"><%= have %></span> 把 </p>
            <p><i class="iconfont icon-yusan"></i> 可还伞位 <span class="repay-count"><%= repay %></span> 把</p>
          </div>
          <hr>
          <div class="info-image">
            <img src="<%= photo %>"/>
          </div>
        </div>
        <div class="amap-ui-smp-ifwn-combo-sharp"></div>
      </div>
    </div>
  </div>
</template>


<script>
  import Request from '../../assets/js/request.js'
  import siteLogo from '../../assets/images/icon_site.png'
  import s_layer from "../../assets/js/s_layer";
  import goApi from "../../assets/js/golang_config";

  let loactionMarker;
  export default {
    mounted() {
      let self = this;
      this.map = new AMap.Map('map', {
        zoom: 10,
        resizeEnable: true
      });

      this.map.setMapStyle('amap://styles/479729a2d3aab261e939ebd11c35790b');

      wx.ready(function () {
        self.wxLocation();
      });

      this.checkNph();
      this.getSites();

      this.map.on('click', function (e) {
        self.map.clearInfoWindow();
        self.show_select = false;
        self.show_unlock = false;
      });
    },
    data() {
      return {
        map: new AMap.Map('map'),
        sidebar: {
          negwidth: '-70%',
          poswidth: '-70%',
          menuspeed: 400,
        },
        head_img: localStorage.head_img_url,
        nickname: localStorage.nickname,
        sites: [],
        show_select: false,
        show_unlock: false,
        umbrella_number: '',
      }
    },
    methods: {
      location: function () {
        loactionMarker.setMap(null);

        this.wxLocation();
      },
      //解锁选项卡
      unlock: function () {
        let self = this;
        Request.get('/api/umbrella/unlock-check', {}
          , function (data) {
            self.show_select = true;

          }, function (data) {
            if (data.msg == '当前押金不足，请先充值押金'){
              s_layer.alert(data.msg,function(){
                self.$router.push({path: '/account/deposit'})
              })
              return ;
            }

            s_layer.alert(data.msg)
          })
      },

      //微信定位
      wxLocation: function () {
        let self = this;

        wx.getLocation({
          type: 'gcj02',
          success: function (res) {
            let latitude = res.latitude;
            let longitude = res.longitude;

            self.map.setZoomAndCenter(16, [longitude, latitude]);

            loactionMarker = new AMap.Marker({
              position: [longitude, latitude]
            });

            loactionMarker.setMap(null);
            loactionMarker.setMap(self.map)
          },
          cancel: function (res) {
            s_layer.alert('您已拒绝了授权获取地理位置，要授权才能定位到您的位置哦');
          },
        });
      },

      // 侧边栏
      showSidebar: function () {
        if ($('body').hasClass('openmenu')) {
          this.jsAnimateMenu('close');
        } else {
          this.jsAnimateMenu('open');
        }
      },
      hideMask: function () {
        if ($('body').hasClass('openmenu')) {
          this.jsAnimateMenu('close');
        }
      },
      jsAnimateMenu: function (tog) {
        if (tog == 'open') {
          $('body').addClass('openmenu');
          $('#page-index').animate({
            marginRight: this.sidebar.poswidth,
            marginLeft: this.sidebar.negwidth
          }, this.sidebar.menuspeed);
          $('#page-menu').animate({right: '0'}, this.sidebar.menuspeed);
        }

        if (tog == 'close') {
          $('body').removeClass('openmenu');
          $('#page-index').animate({marginRight: "0", marginLeft: "0"}, this.sidebar.menuspeed);
          $('#page-menu').animate({right: '-70%'}, this.sidebar.menuspeed);
        }
      },

      //扫码借伞
      scan: function () {
        let self = this;
        wx.scanQRCode({
          desc: 'scanQRCode desc',
          needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
          success: function (res) {
            let sn = self.cutEquSn(res.resultStr);
            self.unlockGo(sn)
          },
          error: function (res) {
            if (res.errMsg.indexOf('function_not_exist') > 0) {
              alert('版本过低请升级')
            }
          }
        });
      },
      //调用golang接口 开始借伞流程
      unlockGo: function (sn) {
        let self = this;
        let url = goApi.host + 'customer/' + localStorage.customer_id + '/hire/' + sn + '?sign=' + md5(localStorage.customer_id + sn + goApi.sign_key);
        s_layer.loading('请根据指示灯指示，将伞移至扫描区');
        Request.post(url, {}
          , function (data) {
            self.unlockResult(data.hire_id, data.channel);

          }, function (data) {
            s_layer.alert('借伞失败')
          })
      },
      //解锁伞结果处理
      unlockResult: function (hire_id, channel) {
        let self = this;
        Request.get('/api/customer-hire/check/' + hire_id, {}, function (res) {
          //关闭解锁选项卡
          self.show_select = false;
          self.show_unlock = false;

          s_layer.closeLoading();
          s_layer.alert('出伞成功，请到机器上' + channel + '号通道领取您的伞')
        }, function (data) {
          s_layer.alert(data.msg)
        })
      },

      //手动输入框
      input: function () {
        this.show_select = false;
        this.show_unlock = true;
      },
      //手动输入解锁
      inputUnlock: function () {
        let self = this;
        if (self.umbrella_number == '') {
          s_layer.alert('请输入伞编号')
          return;
        }
        Request.get('/api/umbrella/unlock', {
          'number': self.umbrella_number
        }, function (data) {
          s_layer.alert(data.msg)
        }, function (data) {
          s_layer.alert(data.msg)
        })
      },

      //网点列表
      getSites: function () {
        let self = this;
        Request.get('/api/site', {}, function (data) {
          console.log(data)
          data.list.forEach(function (item) {
            let marker = self.createMarker([item.longitude, item.latitude])
            self.infoWindow(marker, item);
          })

        })
      },

      //创建标注
      createMarker: function (point) {
        if (!point) {
          return;
        }

        let marker = new AMap.Marker({
          icon: siteLogo,
          position: point,
        });
        marker.setMap(this.map);

        return marker;
      },

      //信息窗体
      infoWindow: function (marker, data) {
        let self = this;

        let infoWindow = new AMap.InfoWindow({
          isCustom: true,
          content: self.windowContent(data),
          offset: new AMap.Pixel(25, -35)
        });
        AMap.event.addListener(marker, 'click', function () {
          self.openInfoWin(infoWindow, marker);
        });
      },
      windowContent: function (data) {
        return '<div class="map-window amap-ui-smp-ifwn-container">' +
          '  <div class="window-title">' + data.name + '</div>' +
          '  <hr>' +
          '  <div class="window-content">' +
          '    <p class="window-content-item">可用雨伞：' + data.umbrella_hava + ' 把</p>' +
          '    <p class="window-content-item">可还伞位：' + data.umbrella_repay + ' 把</p>' +
          '  </div>' +
          '  <hr>' +
          '  <div class="window-footer">' +
          '    <img src="' + data.photo + '">' +
          '  </div>' +
          '</div>' +
          '<div class="info-bottom" style="position: relative; top: 0px; margin: 0px auto;width: 5vh;"><img src="http://webapi.amap.com/images/sharp.png"></div>'
      },
      openInfoWin: function (infoWindow, marker) {
        infoWindow.open(this.map, marker.getPosition());
      },

      //检查未完成租借单数量
      checkNph: function () {
        let self = this;
        Request.get('/api/customer-hire/customer/no-completes', {}, function () {

        }, function (data) {
          if (!data.msg)
            return;

          s_layer.options(data.msg, ['去支付', '先借伞'], function () {
            self.$router.push({path: '/hire'})
          });
        })

      },

      cutEquSn: function (str) {
        let state_index = str.indexOf('state')
        let end_index = str.indexOf('#wechat_redirect');
        let sn = str.substring(state_index + 20, end_index)  //state=mobileAAscanAA length = 20

        return sn;
      },
      routeTo: function (url) {
        this.jsAnimateMenu('close');
        this.$router.push({path: url})
      },
    }

  }
</script>

<style scoped>
  #map {
    height: 100vh;
  }

  @keyframes fade-in {
    0% {
      height: 0px;
    }
    20% {
      height: 26px;
    }
    40% {
      height: 72px;
    }
    80% {
      height: 144px;
    }
    100% {
      height: 180px;
    }
  }

  @-webkit-keyframes fade-in { /*针对webkit内核*/
    0% {
      height: 0%;
    }
    20% {
      height: 20%;
    }
    40% {
      height: 40%;
    }
    80% {
      height: 80%;
    }
    100% {
      height: 100%;
    }
  }

  .m-show {
    animation: fade-in; /*动画名称*/
    animation-duration: 0.1s; /*动画持续时间*/
    -webkit-animation: fade-in 0.1s; /*针对webkit内核*/
  }
</style>

