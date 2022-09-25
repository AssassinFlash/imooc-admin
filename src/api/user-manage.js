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

// 获取用户详情
export const userDetail = (id) => {
  return request({
    url: `/user-manage/detail/${id}`,
    method: 'get'
  })
}

// 获取指定用户的角色
export const userRoles = (id) => {
  return request({
    url: `/user-manage/role/${id}`
  })
}

// 为用户分配角色
export const updateRole = (id, roles) => {
  return request({
    url: `/user-manage/update-role/${id}`,
    method: 'post',
    data: {
      roles: roles
    }
  })
}
