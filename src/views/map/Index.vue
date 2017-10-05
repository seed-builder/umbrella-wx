<template>
  <div>
    <div class="m-index" >
      <div class="m-conbox" >
        <div id="map" class="map" ></div>
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

      this.map.on('click', function(e) {
        self.map.clearInfoWindow();
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
      }
    },
    methods: {
      location: function () {
        loactionMarker.setMap(null);

        this.wxLocation();
      },
      unlock: function () {

      },

      routeTo: function (url) {
        this.jsAnimateMenu('close');
        this.$router.push({path: url})
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
        alert('扫码借伞')
      },
      input: function () {
        alert('手动输入')
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
            self.openInfoWin(infoWindow,marker);
          });
      },
      windowContent : function (data) {
        return '<div class="map-window amap-ui-smp-ifwn-container">' +
          '  <div class="window-title">'+data.name+'</div>' +
          '  <hr>' +
          '  <div class="window-content">' +
          '    <p class="window-content-item">可用雨伞：'+data.umbrella_hava+' 把</p>' +
          '    <p class="window-content-item">可还伞位：'+data.umbrella_repay+' 把</p>' +
          '  </div>' +
          '  <hr>' +
          '  <div class="window-footer">' +
          '    <img src="'+data.photo+'">' +
          '  </div>' +
          '</div>' +
          '<div class="info-bottom" style="position: relative; top: 0px; margin: 0px auto;width: 5vh;"><img src="http://webapi.amap.com/images/sharp.png"></div>'
      },
      openInfoWin : function (infoWindow,marker) {
        infoWindow.open(this.map, marker.getPosition());
      },

     //检查未完成租借单数量
     checkNph:function () {
       let self = this;
       Request.get('/api/customer-hire/customer/no-completes', {},function () {

       },function (data) {
         if (!data.msg)
           return ;

         s_layer.options(data.msg,['去支付','先借伞'],function () {
           self.$router.push({path: '/payment'})
         });
       })

     }
    }

  }
</script>

<style scoped>
  #map {
    height: 100vh;
  }

</style>

