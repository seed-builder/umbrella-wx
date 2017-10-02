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
  </div>
</template>


<script>
  import Request from '../../assets/js/request.js'
  import siteLogo from '../../assets/images/icon_site.png'

  export default {
    mounted() {
      this.map = new AMap.Map('map', {
        zoom: 12,
        resizeEnable: true
      });

      this.map.setMapStyle('amap://styles/479729a2d3aab261e939ebd11c35790b');

      this.getSites();
//      wx.ready(function () {
//        this.wechatLocation();
//      });
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
        sites : []
      }
    },
    methods: {
      location: function () {
        alert(1);
      },
      unlock: function () {
//        var self = this;
//        this.$layer.footer({
//          content: '共享伞解锁',
//          btn: ['手动输入', '扫码借伞']
//        }).then(function (index) {
//          if (index == 0)
//            self.input();
//          else
//            self.scan();
//
//        })
      },

      routeTo: function (url) {
        this.jsAnimateMenu('close');
        this.$router.push({path: url})
      },

      //微信定位
      wxLocation: function () {
        let loactionMarker;
        wx.getLocation({
          type: 'gcj02',
          success: function (res) {
            let latitude = res.latitude;
            let longitude = res.longitude;

            this.map.setZoomAndCenter(16, [longitude, latitude]);

            loactionMarker = new AMap.Marker({
              position: [longitude, latitude]
            });
            loactionMarker.setMap(map)
          },
          cancel: function (res) {
            layer.alert('您已拒绝了授权获取地理位置，要授权才能定位到您的位置哦');
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
      scan : function () {
        alert('扫码借伞')
      },
      input : function () {
        alert('手动输入')
      },

      //网点列表
      getSites : function () {
        let self = this;
        Request.get('/api/site/pagination', {}, function (data) {
          data.forEach(function (item) {
            let marker = self.createMarker([item.longitude, item.latitude])

//            infoWindow(marker, data[i]);
          })

        })
      },

      //创建标注
      createMarker : function (point) {
        if (!point) {
          return;
        }

        let marker = new AMap.Marker({
          // icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
          icon: siteLogo,
          position: point,
          visible: true,
        });
        marker.setMap(this.map);

        return marker;
      }

    }

  }
</script>
<style scoped>
  #map {
    height: 100vh;
  }

  .amap-icon{
    width: 56px !important;
    height: 90px !important;
  }
  .amap-icon img{
    width: 56px !important;
    height: 90px !important;
  }
</style>
