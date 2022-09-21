import request from '@/utils/request'

// 功能介绍
export const feature = () => {
  return request({
    url: '/user/feature',
    method: 'get'
  })
}

// 章节展示
export const chapter = () => {
  return request({
    url: '/user/chapter',
    method: 'get'
  })
}
