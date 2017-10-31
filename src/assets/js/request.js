import axios from 'axios'
import qs from 'qs';
import slayer from "./s_layer";

// axios.defaults.timeout = 60000;

export function qsdata(data) {
  return qs.stringify(data);
}

export default {
  post(url, data, success_call, fail_callback) {
    data.token = localStorage.token;

    return axios.post(url, qsdata(data))
      .then(function (response) {
        // if (!response.data.success) {
        //   slayer.alert(response.data.msg)
        //   if (fail_callback) {
        //     fail_callback();
        //   }
        // } else {
        //   if (success_call)
        //     success_call(response.data)
        // }

        if (response.data.success){
          if (success_call)
            success_call(response.data);
        }
        if (!response.data.success) {
          slayer.alert(response.data.msg)
          if (fail_callback)
            fail_callback(response.data);
        }

      })
      .catch(function (error) {
        slayer.closeLoading();
        slayer.alert('系统繁忙，请稍后再试')
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
  },
  async asyncGet(url, dataJson){
    if(!dataJson){
      dataJson = {};
    }
    dataJson.token = localStorage.token;
    try {
      const  response  = await axios.get(url, { params: dataJson });
      return response.data;
    } catch (error) {
      console.log(error)
    }
  },
  async asyncPost(url, dataJson){
    if(!dataJson){
      dataJson = {}
    }
    dataJson.token = localStorage.token;
    try {
      const  response  = await axios.post(url, dataJson);
      return response.data;
    } catch (error) {
      console.log(error)
    }
  },
  async asyncPut(url, dataJson){
    if(!dataJson){
      dataJson = {}
    }
    dataJson.token = localStorage.token;
    try {
      const  response  = await axios.put(url, dataJson);
      return response.data;
    } catch (error) {
      console.log(error)
    }
  }
}
