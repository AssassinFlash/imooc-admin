// 角色接口
import request from '@/utils/request'

// 获取所有角色
export const roleList = () => {
  return request({
    url: '/role/list',
    method: 'get'
  })
}

// 获取指定角色的权限
export const rolePermission = (roleId) => {
  return request({
    url: `/role/permission/${roleId}`,
    method: 'get'
  })
}

// 为角色分配权限
export const distributePermission = (permissions, roleId) => {
  return request({
    url: '/role/distribute-permission',
    method: 'post',
    data: {
      permissions,
      roleId
    }
  })
}
