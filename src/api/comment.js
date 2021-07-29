import request from '@/utils/request.js'

// 评论---获取列表
// 函数形参如果使用对象形式，可以不考虑顺序
const commitListAPI = ({
  artId,
  lastId,
  limit = 10
}) => {
  return request({
    // 地址
    url: '/v1_0/comments',
    // 参数 // params的参数会出现在url?后面
    params: {
      type: 'a',
      source: artId,
      offset: lastId,
      limit: limit
    }
  })
}
// // 评论-->点赞
// const getThumbsAPI = ({
//   comId
// }) => {
//   return request({
//     url: '/v1_0/comment/likings',
//     method: 'POST',
//     data: {
//       target: comId
//     }
//   })
// }
// // 评论----->取消点赞
// const cancelLikeAPI = ({
//   comId
// }) => {
//   return request({
//     url: `/v1_0/comment/likings/${comId}`,
//     method: 'DELETE'
//   })
// }

// 评论 - 喜欢
const commentLikeAPI = ({
  comId
}) => {
  return request({
    url: '/v1_0/comment/likings',
    method: 'POST',
    data: {
      target: comId
    }
  })
}
// 评论 - 取消喜欢 (RestFul API)
const commentUnLikeAPI = ({
  comId
}) => {
  return request({
    url: `/v1_0/comment/likings/${comId}`,
    method: 'DELETE'
  })
}
// 评论发布
const commentSendAPI = ({
  artId,
  sendText
}) => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data: {
      target: artId,
      content: sendText
    }
  })
}
export {
  commitListAPI,
  commentSendAPI,
  commentUnLikeAPI,
  commentLikeAPI
}
