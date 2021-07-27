// 这里是对axios二次封装
import axios from 'axios'

import store from '@/store'
import router from '@/router'
const ajax = axios.create({
  baseURL: 'http://toutiao.itheima.net' // 配置基地址
})
// 导出一个默认函数，参数是通过解构赋值获取，内部调用request发起网络请求
/*
  函数什么时候需要参数？ 应对 不同的场景 ，不同的数据完成一样的功能
  什么时候需要写return？ 外面需要结果，必须写return
*/
// isAuth是否携带请求头token
function request({
  method = 'GET',
  url,
  params,
  data,
  headers,
  isAuth = true // 默认带
}) {
  return ajax({
    method,
    url,
    params,
    data,
    headers,
    isAuth
  })
}
// 请求拦截器
// 1. 为什么? (统一携带内容)
// 统一携带请求头里的token
// 2. 使用
// 添加请求拦截器
// 对config(请求的配置对象处理)
// 可以把api里的headers的Authorization都删除了
ajax.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  //   console.log(config)
  //   const arr = ['/v1_0/articles', '/v1_0/authorization']
  //   if (store.state.token.length > 0 && config.headers.Authorization === undefined && arr.indexOf(config.url) === -1) {
  //     // vuex里有token, 请求头里没有Authorization, 再给他携带上
  //     config.headers.Authorization = `Bearer ${store.state.token}`
  //   }

  if (store.state.token.length > 0 && config.headers.Authorization === undefined && config.isAuth) {
    // vuex里有token, 请求头里没有Authorization, 再给他携带上
    config.headers.Authorization = `Bearer ${store.state.token}`
  }
  //   console.log(config)
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 响应拦截器
// 1. 拦截器(axios内置的一个函数)
// 2. 为什么要用响应拦截器? (统一拦截判断)
// 统一判断401(token过期) - 不要散落在各个的逻辑页面里
// 3. 使用拦截器
// (1): 如下 (成功/失败分别进入不同函数) - 代码框复制好
// (2): 逻辑 (失败时判断401问题)
// 前端要清空vuex和本地token, 强制踢回到登录页
ajax.interceptors.response.use(resp => { // 成功  http 状态码 以 2/3 开头
  // 每次服务器数据达到浏览器之前，必须经过这里
  // 公共处理
  // return resp.data
  return resp
}, err => { // 失败/错误  http 状态码 以 4/5 开头
  console.dir(err)
  // err是错误对象 它的response字段记录了错误信息  status  statusText
  if (err.response.status === 401) { // 身份过期/token无效
    // 1. 清空token （vuex + 本地）
    store.commit('setToken', '')
    store.commit('setRefreshToken', '')

    localStorage.removeItem('token')
    localStorage.removeItem('refresh_token')
    // 2. 跳转到登录页面登录
    router.push({
      path: '/login'
    })
  }
  console.dir(err)
  return Promise.reject(err)
})
export default request
