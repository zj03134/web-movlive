import request from '@/utils/request.js'
// 拿到tonk
import store from '@/store/index'
// 频道-获取用户已选
const userChaneListAPI = () => {
  return request({
    url: '/v1_0/user/channels',
    headers: {
      Authorization: store.state.token
    }
  })
}
// 获取文章信息
const articleListAPI = ({
  channeId,
  timestamp
}) => {
  return request({
    method: 'GET',
    url: '/v1_0/articles',
    params: {
      channel_id: channeId,
      timestamp: timestamp || (new Date()).getTime()
      // 只有第一次传null,才会使用后面的默认值
    }
  })
}

// 按需导出
export {
  userChaneListAPI,
  articleListAPI
}
