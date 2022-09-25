// 权限列表
import Layout from '@/layout'

const PermissionList = {
  // 指定父路由
  path: '/user',
  component: Layout,
  redirect: '/user/manage',
  // 指定自己是什么路由
  name: 'permissionList',
  meta: {
    title: 'user',
    icon: 'personnel'
  },
  children: [
    {
      path: '/user/permission',
      component: () => import('@/views/permission-list'),
      meta: {
        title: 'permissionList',
        icon: 'permission'
      }
    }
  ]
}

export default PermissionList
