// 角色列表
import Layout from '@/layout'

const RoleList = {
  // 指定父路由
  path: '/user',
  component: Layout,
  // name属性指定自己是什么路由，这个属性和后端返回的permission.menus属性对应，
  // menus里面的值就对应这里面的name属性值，二者互相匹配就说明该用户有访问这个路由的权限
  name: 'roleList',
  meta: {
    title: 'user',
    icon: 'personnel'
  },
  children: [
    {
      path: '/user/role',
      component: () => import('@/views/role-list'),
      meta: {
        title: 'roleList',
        icon: 'role'
      }
    }
  ]
}

export default RoleList
