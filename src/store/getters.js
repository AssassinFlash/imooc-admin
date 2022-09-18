import variables from '@/assets/styles/variables.module.scss'

const getters = {
  token (state) {
    return state.user.token
  },
  hasUserInfo (state) {
    return JSON.stringify(state.user.userInfo) !== '{}'
  },
  userInfo(state) {
    return state.user.userInfo
  },
  cssVar(state) {
    return variables
  },
  sidebarOpened(state) {
    return state.app.sidebarOpened
  }
}

export default getters
