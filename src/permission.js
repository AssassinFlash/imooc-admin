// 路由前置守卫：做鉴权操作
import router from './router'
import store from './store'

// 白名单：用户未登录时允许进入的路由
const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  // 当用户未登录时，不允许进入白名单以外的页面
  // 当用户已登录(存在token)，不允许进入login页，同时要获取用户的信息
  if (store.getters.token) {
    if (!store.getters.hasUserInfo) {
      await store.dispatch('user/getUserInfo')
    }
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
