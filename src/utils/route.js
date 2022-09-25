import path from 'path'

// 返回所有子路由
const getChildrenRoutes = (routes) => {
  const result = []
  routes.forEach((route) => {
    if (route.children && route.children.length > 0) {
      result.push(...route.children)
    }
  })
  return result
}

// 1.处理重复出现的一级路由：若该一级路由为其他路由的子路由，则删除该一级路由
export const filterRoutes = (routes) => {
  const childrenRoutes = getChildrenRoutes(routes)
  return routes.filter((route) => {
    // 找到在其他子路由中出现且在一级路由又出现的一级路由，把它剔除
    const repeatRoute = childrenRoutes.find((childrenRoute) => {
      return childrenRoute.path === route.path
    })
    return !repeatRoute
  })
}

// 判断数据是否为空值
const isNull = (data) => {
  if (!data) return true
  if (JSON.stringify(data) === '{}') return true
  if (JSON.stringify(data) === '[]') return true
  return false
}

// 2.拿到处理后的路由，进行规则判断：不符合meta规则的就剔除
// export const generateMenus = (routes) => {
//   const results = []
//   routes.forEach((route) => {
//     // 1.不存在children不存在meta，直接return
//     if (isNull(route.children) && isNull(route.meta)) return
//     // 2.存在children不存在meta
//     if (!isNull(route.children) && isNull(route.meta)) {
//       route.children.forEach((childRoute) => {
//         if (!isNull(childRoute.meta)) {
//           if (childRoute.meta.icon && childRoute.meta.title) {
//             results.push(childRoute)
//           }
//         }
//       })
//     }
//     // 3.存在children且存在meta
//     if (!isNull(route.children) && !isNull(route.meta)) {
//       if (route.meta.icon && route.meta.title) {
//         route.children = route.children.filter((childRoute) => {
//           if (!isNull(childRoute.meta)) {
//             if (childRoute.meta.title && childRoute.meta.icon) {
//               return true
//             }
//           }
//           return false
//         })
//         results.push(route)
//       }
//     }
//   })
//   return results
// }

export function generateMenus(routes, basePath = '') {
  const result = []
  // 遍历路由表
  routes.forEach((item) => {
    // 不存在 children && 不存在 meta 直接 return
    if (isNull(item.meta) && isNull(item.children)) return
    // 存在 children 不存在 meta，进入迭代
    if (isNull(item.meta) && !isNull(item.children)) {
      result.push(...generateMenus(item.children))
      return
    }
    // 合并 path 作为跳转路径
    const routePath = path.resolve(basePath, item.path)
    // 路由分离之后，存在同名父路由的情况，需要单独处理
    let route = result.find((item) => item.path === routePath)
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: []
      }

      // icon 与 title 必须全部存在
      if (route.meta.icon && route.meta.title) {
        // meta 存在生成 route 对象，放入 arr
        result.push(route)
      }
    }

    // 存在 children 进入迭代到children
    if (item.children) {
      route.children.push(...generateMenus(item.children, route.path))
    }
  })
  return result
}
