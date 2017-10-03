import axios from 'axios'
import qs from 'qs';
import slayer from "./s_layer";

export function qsdata(data) {
  return qs.stringify(data);
}

export default {
  post(url, data, success_call, fail_callback) {
    data.token = localStorage.token;

    return axios.post(url, qsdata(data))
      .then(function (response) {
        if (response.data.result_code != 0) {
          slayer.alert(response.data.result_msg)
          if (fail_callback) {
            fail_callback();
          }
        } else {
          if (success_call)
            success_call(response.data)
        }


      })
      .catch(function (error) {
        console.log(error);
      });
  },
  get (url, params, success_callback, fail_callback) {
    params['token'] = localStorage.token;
    return axios.get(url, {
      params: params
    })
      .then(function (response) {
        if (response.data.success){
          if (success_callback)
            success_callback(response.data.data);
        }
        if (!response.data.success) {
          if (fail_callback)
            fail_callback(response.data);
        }

      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
