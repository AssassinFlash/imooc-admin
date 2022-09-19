import { generateColors } from '@/utils/theme'
// import { getItem } from '@/utils/storage'
// import { MAIN_COLOR } from '@/constant'
import variables from '@/assets/styles/variables.module.scss'

const getters = {
  token (state) {
    return state.user.token
  },
  hasUserInfo (state) {
    return JSON.stringify(state.user.userInfo) !== '{}'
  },
  userInfo (state) {
    return state.user.userInfo
  },
  cssVar (state) {
    return {
      // ...state.theme.variables,
      ...variables,
      // 根据主题色生成的新的颜色menuBg和其他，会替换掉variables里的menuBg等值
      // 从而得到新的根据主题色生成的menuBg和其他，让侧边栏也可随主题色变化而变化
      // 这里会在初始化的时候获取主题色，从而生成menuBg颜色
      ...generateColors(state.theme.mainColor)
    }
  },
  sidebarOpened (state) {
    return state.app.sidebarOpened
  },
  language (state) {
    return state.app.language
  },
  mainColor (state) {
    return state.theme.mainColor
  }
}

export default getters
