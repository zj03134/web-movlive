import request from '@/utils/request.js'

// 文章详情
const articleAPI = ({
  art_id
}) => {
  return request({
    url: `/v1_0/articles/${art_id}`
  })
}
// 文章·--- 关注作者
const authorFollwedAPI = ({
  aut_id
}) => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target: aut_id
    }
  })
}
// 文章----取消关注作者
const unFollowedUserAPI = ({
  aut_id
}) => {
  return request({
    url: `/v1_0/user/followings/${aut_id}`,
    method: 'DELETE'
  })
}
// 文章--->喜欢
const authorLikeAPI = ({
  target
}) => {
  return request({
    url: '/v1_0/article/likings',
    method: 'POST',
    data: {
      target
    }
  })
}
// 文章----取消喜欢
const articleDisLikeAPI = ({
  artId
}) => {
  return request({
    url: `/v1_0/article/likings/${artId}`,
    method: 'DELETE'
  })
}
export {
  articleAPI,
  authorFollwedAPI,
  authorLikeAPI,
  articleDisLikeAPI,
  unFollowedUserAPI
}
