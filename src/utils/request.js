// 这里是对axios的二次封装
import axios from 'axios'
import store from '@/store/index.js'
// import store from '@/'

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net'
})

export default ({
  method,
  url,
  params,
  data,
  headers
}) => {
  return request({
    method,
    url,
    params,
    data,
    headers
  })
}
// 请求拦截器
// 添加请求拦截器
axios.interceptors.request.use(function(config) {
  if (store.state.token.length > 0 && config.headers.Authorization === undefined && config.isAuth) {
    config.headers.Authorization = `Bearer ${store.state.token}`
    console.log(config)
    return config
  }
}, function(error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function(response) {
  // 对响应数据做点什么
  return response
}, function(error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})
