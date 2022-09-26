// 处理文章接口
import request from '@/utils/request'

// 获取列表数据
export const getArticleList = (params) => {
  return request({
    url: '/article/list',
    method: 'get',
    params
  })
}

// 修改排序
export const articleSort = (initRanking, finalRanking) => {
  return request({
    url: '/article/sort',
    method: 'post',
    data: {
      initRanking,
      finalRanking
    }
  })
}

// 删除文章
export const deleteArticle = (articleId) => {
  return request({
    url: `/article/delete/${articleId}`,
    method: 'get'
  })
}

// 获取文章详情
export const articleDetail = (articleId) => {
  return request({
    url: `/article/${articleId}`,
    method: 'get'
  })
}
