import request from '@/utils/request.js'
// 搜索-联想菜单
const suggestAPI = ({
  q
}) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q: q
    }
  })
}
// 搜索-结果列表
const searchListAPI = ({
  q,
  page = 1
}) => {
  return request({
    url: '/v1_0/search',
    // params的参数会出现在url?后面
    params: {
      q: q,
      page: page
    }
  })
}
export {
  suggestAPI,
  searchListAPI
}
