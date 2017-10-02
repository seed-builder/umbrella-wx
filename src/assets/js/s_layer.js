import layer from 'vue-layer-mobile'
import 'vue-layer-mobile/need/layer.css'

export default {
  alert(msg, callback) {
    layer.dialog({
      title: ['提示', 'background:#f4c527;color:#fff'],
      content: msg,
      btn: ['我知道了']
    })
      .then((res) => {
        if (res === 0 && callback) {
          callback();
        }
      })
  },
  loading(msg) {
    layer.loading(msg)
  },
  confirm(msg, callback) {
    layer.dialog({
      title: ['提示', 'background:#f4c527;color:#fff'],
      content: msg,
      btn: ['确定', '取消']
    })
      .then((res) => {
        if (res === 0 && callback) {
          callback();
        }
      })
  },
  close(el) {
    layer.close(el)
  },
  closeLoading() {
    layer.close('loading');
  },
  options(msg, btns, call1, call2) {
    layer.dialog({
      title: ['提示', 'background:#f4c527;color:#fff'],
      content: msg,
      btn: btns
    })
      .then((res) => {
        if (res === 0 && call1) {
          call1();
        }else if(res !== 0&& call2) {
          call2()
        }
      })
  }

}
