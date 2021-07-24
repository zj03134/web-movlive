// 这里是对axios的二次封装
import axios from 'axios'

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
// export default request
