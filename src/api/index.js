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
// 文章-不感兴趣
const articleDisLikeAPI = ({
  artId
}) => {
  // 这里必须return,否则就是undefined，就拿不到数据了
  return request({
    method: 'POST',
    url: '/v1_0/article/dislikes',
    data: {
      target: artId
    },
    isAuth: false
  })
}
// 首页 - 获取 所有频道
const allChannelListAPI = () => {
  return request({
    url: '/v1_0/channels'
  })
}
// 频道 - 更新已选
const updateChannelAPI = ({
  channels
}) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PUT',
    data: {
      channels: channels
    }
  })
}
// 按需导出
export {
  allChannelListAPI,
  userChaneListAPI,
  articleListAPI,
  articleDisLikeAPI,
  updateChannelAPI
}
