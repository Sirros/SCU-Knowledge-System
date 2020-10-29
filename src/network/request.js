import axios from 'axios';

export function request(config) {
  // 1、创建实例
  const instance = axios.create({
    // baseURL: 'http://jiangjunyan.top:9901',
    baseURL: 'http://139.196.212.194:9901',
    timeout: 5000
    // param: {}
    // data: {}
    // withCredentials:  false
    // headers: { 'key', 'value' }
    // responseType: json
    // responseEncoding: 'utf-8'
    // maxContentLength: 2000
  })

  // 2、拦截器
  // 2.1 请求拦截
  instance.interceptors.request.use(config => {
    console.log('请求拦截，拦截请求数据：', config);
    // 拦截成功记得返回数据
    return config;
  }, err => {
    console.log('请求拦截失败', err);
  })

  // 2.2 响应拦截
  instance.interceptors.response.use(result => {
    console.log('响应拦截，拦截相应数据：', result);
    // 拦截成功记得返回数据
    return result;
  }, err => {
    console.log('响应拦截失败', err);
  })

  // 3、真正的网络请求
  // 返回一个 promise
  return instance(config);
}

// 调用方法 get
// request({
//   url: "",
//   methods: 'get/post',
//   params: {} // get参数
//   data: {} // post请求题
// })
// .then(res => {

// })
// .catch(err => {

// })
