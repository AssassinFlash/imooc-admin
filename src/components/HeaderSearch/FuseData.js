import i18n from '@/i18n'

export const generateRoutes = (routes, prefixTitle = []) => {
  let result = []

  routes.forEach((route) => {
    // 要做成[{path: '/user/manage', title: ['用户', '用户管理']}]这样的数据结构
    const data = {
      path: route.path,
      title: [...prefixTitle] // 如果有父路由的title，先合并进去，如果没有，就为[]
    }
    // 让父路由的title和子路由的title合并，变成['用户', '用户管理']
    data.title = [...data.title, i18n.global.t(`msg.route.${route.meta.title}`)]
    result.push(data)

    // 如果有子路由，递归子路由，把父路由title传进去，作为递归的出口，让父路由对象和子路由对象合并
    if (route.children && route.children.length > 0) {
      // [{path:'/user',title:['用户']},{path:'/user/manage', title:['用户',['用户管理']]}...]
      result = [...result, ...generateRoutes(route.children, data.title)]
    }
  })

  return result
}
