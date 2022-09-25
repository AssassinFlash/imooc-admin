// 权限路由
// 员工管理
import Layout from '@/layout'

const UserManage = {
  // 先指定父路由
  path: '/user',
  component: Layout,
  redirect: '/user/manage',
  // name属性表示自己是什么路由，这一部分用于匹配权限的对应字段，权限里有这一个字段就把这个路由抽取出来添加到路由表中
  // 每一个name表示当前路由对应的用户的权限
  name: 'userManage',
  // 显示到菜单的属性
  meta: {
    title: 'user',
    icon: 'personnel'
  },
  children: [
    // 对于员工管理页来说，它有员工管理页、员工信息页和员工导入页三个页面
    {
      path: '/user/manage',
      component: () => import('@/views/user-manage'),
      meta: {
        title: 'userManage',
        icon: 'personnel-manage'
      }
    },
    {
      path: '/user/info/:id',
      component: () => import('@/views/user-info'),
      meta: {
        title: 'userInfo'
      }
    },
    {
      path: '/user/import',
      component: () => import('@/views/import'),
      meta: {
        title: 'excelImport'
      }
    }
  ]
}

export default UserManage
