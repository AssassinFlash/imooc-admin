// 处理由用户权限动态生成路由的模块
import { privateRoutes, publicRoutes } from '@/router'

const permission = {
  namespaced: true,
  state: () => {
    return {
      // 静态路由
      routes: publicRoutes
    }
  },
  mutations: {
    setRoutes(state, newRoutes) {
      // 新路由添加到静态路由的后面
      state.routes = [...publicRoutes, ...newRoutes]
    }
  },
  actions: {
    // 根据传来的用户权限从私有路由表中筛选出符合权限的路由
    filterRoutes(context, menus) {
      const routes = []
      menus.forEach((menu) => {
        const findRoute = privateRoutes.find((route) => route.name === menu)
        routes.push(findRoute)
      })
      // 最后添加不匹配路由进入404的路由对象，这个必须要在所有路由的最后面
      // 固定写法
      routes.push({
        path: '/:catchAll(.*)',
        redirect: '/404'
      })

      context.commit('setRoutes', routes)
      return routes
    }
  }
}

export default permission
