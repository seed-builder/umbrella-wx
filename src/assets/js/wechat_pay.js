import slayer from "./s_layer";

let params;

export function jsApiCall(callback) {
  WeixinJSBridge.invoke(
    'getBrandWCPayRequest',
    params,
    function (res) {
      if (res.err_msg == "get_brand_wcpay_request:ok") {
        slayer.alert('支付成功');
        if (callback) {
          callback();
        }
      } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
        slayer.alert('用户取消支付');
      }
    }
  );
}

export function callpay(callback) {
  if (typeof('WeixinJSBridge') == "undefined") {
    if (document.addEventListener) {
      document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
    } else if (document.attachEvent) {
      document.attachEvent('WeixinJSBridgeReady', jsApiCall);
      document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
    }
  } else {
    jsApiCall(callback);
  }
}


export default {
  pay(jsApiParams, callback) {
    params = jsApiParams;
    callpay(callback);
  }
}
