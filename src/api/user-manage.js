import request from '@/utils/request'

// 获取用户列表数据
export const getUserManageList = (data) => {
  return request({
    url: '/user-manage/list',
    method: 'get',
    params: data
  })
}

// 批量导入excel导入的员工数据
export const userBatchImport = (data) => {
  return request({
    url: '/user-manage/batch/import',
    method: 'post',
    data
  })
}

// 删除指定员工数据
export const deleteUser = (id) => {
  return request({
    url: `/user-manage/detele/${id}`,
    method: 'get'
  })
}

// 获取所有用户列表数据
export const getUserManageAllList = () => {
  return request({
    url: '/user-manage/all-list',
    method: 'get'
  })
}
